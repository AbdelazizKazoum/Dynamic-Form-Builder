/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React from "react";

const CheckBox = ({ control, field }: { control: any; field: any }) => {
  return (
    <div>
      <FormField
        control={control}
        name={field.name}
        render={({ field: el }) => (
          <FormItem style={{ marginTop: "15px", marginBottom: "15px" }}>
            <div
              className={cn(
                "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4  "
              )}
            >
              <FormControl>
                <Checkbox
                  // checked={el.value}
                  onCheckedChange={el.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{field.label}</FormLabel>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CheckBox;
