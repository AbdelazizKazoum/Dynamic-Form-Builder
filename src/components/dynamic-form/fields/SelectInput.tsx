/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

const SelectInput = ({
  field,
  control,
  options,
}: {
  field: any;
  control: any;
  options: any;
}) => {
  const [items, setItems] = useState(options ?? []);

  useEffect(() => {
    if (field.apiUrl) {
      console.log("🚀 ~ useEffect ~ field.apiUrl:", field.apiUrl);
      (async () => {
        try {
          const res = await api.get(`/${field.apiUrl}`);
          setItems(res.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [field.apiUrl]);

  return (
    <FormField
      control={control}
      name={field.name}
      defaultValue=""
      render={({ field: el }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <Select onValueChange={el.onChange} defaultValue={el.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((item: any, index: any) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
