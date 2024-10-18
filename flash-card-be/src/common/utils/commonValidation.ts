import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  // ... other common validations
  user_name: z.string(),
  password: z.string(),
  created_by: z.string(),
  created_date: z.string(),
  updated_by: z.string(),
  updated_date: z.string()
};
