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

const TextInput = ({ field, control }: { field: any; control: any }) => {
  return (
    <FormField
      control={control}
      name={field.name}
      defaultValue=""
      render={({ field: el }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input type={field.type} placeholder={field.placeholder} {...el} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInput;
