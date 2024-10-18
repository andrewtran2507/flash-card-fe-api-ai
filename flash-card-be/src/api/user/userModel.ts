import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";
import mongoose from "mongoose";

extendZodWithOpenApi(z);

export type TUser = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  user_name: z.string(),
  password: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const PostUserSchema = z.object({
  body: z.object({
    user_name: commonValidations.user_name,
    password: commonValidations.password,
  }),
});

const userSchemaMongo = new mongoose.Schema({
  user_name: String,
  password: String,
});

export const User = mongoose.model("User", userSchemaMongo);
