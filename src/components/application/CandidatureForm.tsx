/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "@/configs/forms/formSchema.json";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createValidationSchema } from "@/utils/createValidation";
import File from "../dynamic-form/fields/File";
import CheckBox from "../dynamic-form/fields/CheckBox";
import TextInput from "../dynamic-form/fields/TextInput";

export function CandidatureForm() {
  const validationSchema = createValidationSchema(formSchema.fields);
  // 1. Define your form.
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof validationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  console.log("test test test ................");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formSchema.fields.map((field, index) => {
          if (field.dependsOn && !form.watch(field.dependsOn)) return null;

          if (field.type === "file") {
            return (
              <div key={index}>
                <File
                  control={form.control}
                  field={field}
                  setValue={form.setValue}
                />
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <div key={index}>
                <CheckBox control={form.control} field={field} />
              </div>
            );
          }

          return (
            <div key={index}>
              <TextInput control={form.control} field={field} />
            </div>
          );
        })}

        {/* <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
