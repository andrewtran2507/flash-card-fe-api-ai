import { StatusCodes } from "http-status-codes";
import { Card, type TCard } from "./cardModel";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { MongoClient, ObjectId } from "mongodb";
import { DB } from "@/common/constants";
import { getDescription, getImage } from "@/common/utils/openai";

const connectionString = process.env.DB_URL || "";

const client = new MongoClient(connectionString);

export class CardService {
  async insert(
    text: string,
    user_name: string
  ): Promise<ServiceResponse<TCard | null>> {
    try {
      const description = await getDescription(text);
      const imageData = await getImage(text);
      const saveData: TCard = {
        text,
        description: description ?? "No Description for this text!",
        image_base64: imageData ?? "",
        created_by: user_name,
        created_date: new Date().toISOString(),
        updated_by: user_name,
        updated_date: new Date().toISOString(),
      };
      let result = await Card?.create(saveData);
      if (!result?.id) {
        return ServiceResponse.failure(
          "Card was not added!",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<TCard | null>("Card created", null);
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

  async update(
    text: string,
    user_name: string,
    id: string
  ): Promise<ServiceResponse<TCard | null>> {
    try {
      const filters = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const description = await getDescription(text);
      const imageData = await getImage(text);
      const updateDoc = {
        $set: {
          text,
          description: description ?? "No Description for this text!",
          image_base64: imageData ?? "",
          updated_by: user_name,
          updated_date: new Date().toISOString(),
        },
      };
      let result = await Card?.updateOne(filters, updateDoc, options);
      if (!result.acknowledged) {
        return ServiceResponse.failure(
          "Card not update",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<TCard | null>("Card created", null);
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

  async delete(id: ObjectId): Promise<ServiceResponse<TCard | null>> {
    try {
      let result = await Card?.deleteOne({ _id: id });
      if (!result.acknowledged) {
        return ServiceResponse.failure(
          "Card was not deleted!",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<TCard | null>("Card deleted", null);
    } catch (ex) {
      const errorMessage = `Error Deleting user, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while Deleting user.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAllByUserName(
    user_name: string
  ): Promise<ServiceResponse<TCard | null>> {
    try {
      const result = await Card?.find({
        created_by: user_name,
      });
      if (result.length < 0) {
        return ServiceResponse.failure(
          "Cards not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      return ServiceResponse.success<any>("Cards found!", result);
    } catch (ex) {
      const errorMessage = `Error Finding Cards, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while Finding Cards.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const cardService = new CardService();
