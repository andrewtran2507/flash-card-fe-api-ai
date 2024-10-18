import { StatusCodes } from "http-status-codes";

import { User, type TUser } from "@/api/user/userModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
/// import { MongoClient } from "mongodb";
import * as bcrypt from "bcrypt";
import { DB } from "@/common/constants";
import { hashPassword } from "@/common/utils/auth";

const connectionString = process.env.DB_URL || "";

// const client = new MongoClient(connectionString);

export class UserService {
  constructor() {}

  async insert(data: TUser): Promise<ServiceResponse<TUser | null>> {
    try {
      const existingData = await User.findOne({
        user_name: data.user_name,
      });
      if (existingData?._id) {
        return ServiceResponse.failure(
          "User name is taken!",
          null,
          StatusCodes.CONFLICT
        );
      }

      hashPassword(data.password, async (_e, hash) => {
        await User.create({ user_name: data.user_name, password: hash });
      });

      return ServiceResponse.success<TUser | null>("User created", null);
    } catch (ex) {
      const errorMessage = `Error creating user, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findUserByName(
    user_name: String
  ): Promise<ServiceResponse<TUser | null>> {
    try {
      let result = await User.findOne(
        {
          user_name,
        },
        { projection: { user_name: 1, password: 1 } }
      );
      if (!result) {
        return ServiceResponse.failure(
          "User not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<any>("User Found", result);
    } catch (ex) {
      const errorMessage = `Error creating user, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async checkUser(
    user_name: string,
    password: string
  ): Promise<ServiceResponse<null>> {
    try {
      let result = await User?.findOne({
        user_name,
      });
      const dbHashPassword = result?.password ?? "";
      const match = await bcrypt.compare(password, dbHashPassword);
      if (!match) {
        return ServiceResponse.failure(
          "User not Authorized",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<any>("User Authorized", null);
    } catch (ex) {
      const errorMessage = `Error checking user, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while checking user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<TUser[] | unknown>> {
    try {
      let result = await User?.find(
        {},
        { projection: { user_name: 1, password: 1 } }
      );

      if (!result) {
        return ServiceResponse.failure(
          "User not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<any>("User Found", result);
    } catch (ex) {
      const errorMessage = `Error creating user, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const userService = new UserService();
