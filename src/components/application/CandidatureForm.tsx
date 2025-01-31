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

            if (field.type === "object" && field.fields) {
              return (
                <fieldset
                  key={index}
                  className="col-span-1 md:col-span-2 border p-4 rounded-lg"
                >
                  <legend className="text-lg font-semibold mb-2">
                    {field.label}
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {field.fields.map((subField, subIndex) => (
                      <div key={subIndex} className="w-full">
                        {subField.type === "file" ? (
                          <FileInput
                            control={form.control}
                            field={subField}
                            setValue={form.setValue}
                          />
                        ) : subField.type === "checkbox" ? (
                          <CheckBox control={form.control} field={subField} />
                        ) : subField.type === "select" ? (
                          <SelectInput
                            control={form.control}
                            field={subField}
                            options={field.options}
                          />
                        ) : (
                          <TextInput control={form.control} field={subField} />
                        )}
                      </div>
                    ))}
                  </div>
                </fieldset>
              );
            }

            return (
              <div key={index} className="w-full">
                {field.type === "file" ? (
                  <FileInput
                    control={form.control}
                    field={field}
                    setValue={form.setValue}
                  />
                ) : field.type === "checkbox" ? (
                  <CheckBox control={form.control} field={field} />
                ) : field.type === "select" ? (
                  <SelectInput
                    field={field}
                    control={form.control}
                    options={field.options}
                  />
                ) : (
                  <TextInput control={form.control} field={field} />
                )}
              </div>
            );
          })}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
