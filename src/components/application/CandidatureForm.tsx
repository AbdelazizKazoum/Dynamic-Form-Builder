/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "@/configs/forms/formSchema.json";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createValidationSchema } from "@/utils/createValidation";
import CheckBox from "../dynamic-form/fields/CheckBox";
import TextInput from "../dynamic-form/fields/TextInput";
import FileInput from "../dynamic-form/fields/FileInput";
import SelectInput from "../dynamic-form/fields/SelectInput";

export function CandidatureForm() {
  const validationSchema = createValidationSchema(formSchema.fields);

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof validationSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formSchema.fields.map((field, index) => {
            if (field.dependsOn && !form.watch(field.dependsOn)) return null;

            if (field.type === "file") {
              return (
                <div key={index} className="w-full">
                  <FileInput
                    control={form.control}
                    field={field}
                    setValue={form.setValue}
                  />
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={index} className="w-full">
                  <SelectInput
                    control={form.control}
                    field={field}
                    options={field.options}
                  />
                </div>
              );
            }

            if (field.type === "checkbox") {
              return (
                <div key={index} className="w-full">
                  <CheckBox control={form.control} field={field} />
                </div>
              );
            }

            return (
              <div key={index} className="w-full">
                <TextInput control={form.control} field={field} />
              </div>
            );
          })}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
