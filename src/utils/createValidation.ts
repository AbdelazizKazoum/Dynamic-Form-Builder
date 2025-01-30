/* eslint-disable @typescript-eslint/no-explicit-any */
import formSchema from "@/configs/forms/formSchema.json";
import { z } from "zod";
export const createValidationSchema = (fields: typeof formSchema.fields) => {
  const shape = {} as any;

  fields.forEach((field) => {
    let validator;
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        validator = z.string();
        if (field.validation?.required)
          validator = validator.min(1, "Required");
        if (field.validation?.minLength)
          validator = validator.min(field.validation.minLength);
        if (field.validation?.maxLength)
          validator = validator.max(field.validation.maxLength);
        if (field.validation?.pattern)
          validator = validator.regex(new RegExp(field.validation.pattern));
        break;
      case "number":
        validator = z.string();
        if (field.validation?.required)
          validator = validator.min(1, "Required");
        if (field.validation?.min)
          validator = validator.min(field.validation.min);
        if (field.validation?.max)
          validator = validator.max(field.validation.max);
        break;
      case "file":
        validator = z
          .instanceof(File)
          .refine((file) => file, "File is required")
          .refine(
            (file) => file.size <= field.validation.maxSize,
            "File must be less than 5MB"
          )
          .refine(
            (file) => field.validation.fileType.includes(file?.type),
            "Invalid file type"
          );
        break;
      case "checkbox":
        validator = z.boolean();
        break;
      default:
        validator = z.any();
    }

    if (field.dependsOn) {
      shape[field.name] = z.optional(validator);
    } else {
      shape[field.name] = validator;
    }
  });

  return z.object(shape);
};
