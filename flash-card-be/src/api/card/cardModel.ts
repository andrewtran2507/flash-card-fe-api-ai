import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";
import mongoose from "mongoose";

extendZodWithOpenApi(z);

export type TCard = z.infer<typeof CardSchema>;
export const CardSchema = z.object({
  text: z.string(),
  description: z.string(),
  image_base64: z.string(),
  created_by: z.string(),
  created_date: z.string(),
  updated_by: z.string(),
  updated_date: z.string(),
});

// Input Validation for 'GET cards/:id' endpoint
export const GetCardSchema = z.object({
  params: z.object({ user_name: commonValidations.user_name }),
});
// Input Validation for 'POST /cards' endpoint
export const PostCardSchema = z.object({
  body: z.object({
    user_name: commonValidations.user_name,
    text: z.string(),
  }),
});

const cardSchemaMongo = new mongoose.Schema({
  text: String,
  description: String,
  image_base64: String,
  created_by: String,
  created_date: String,
  updated_by: String,
  updated_date: String,
});

export const Card = mongoose.model("Card", cardSchemaMongo);
