/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const FileInput = ({
  field,
  control,
}: {
  field: any;
  control: any;
  setValue: any;
}) => {
  return (
    <FormField
      control={control}
      name={field.name}
      defaultValue=""
      render={({ field: el }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              placeholder={field.placeholder}
              onChange={(e) => {
                // setValue(field.name, e.target.files);
                el.onChange(e.target.files[0]);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInput;
