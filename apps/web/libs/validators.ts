import { z, ZodSchema } from "zod";

export function validateWithSchema(schema: ZodSchema) {
  return async function validationFn(_: any, value: any) {
    const response = await schema.safeParseAsync(value);
    if (!response.success) {
      return Promise.reject(response.error.errors[0]);
    }
  };
}

export const emailSchema = z.string().email("A valid email is required");

export const fullNameSchema = z.string().min(3, "Name is too short");
