import {
  FormControl,
  FormDescription,
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
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SelectFormFieldProps = {
  control: any;
  name: string;
  label: string;
  display?: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
  options: { label: string; value: string }[];
  className?: string;
  triggerName?: string;
};

function SelectFormField(props: SelectFormFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full space-y-0.5 min-w-[200px]",
            props.className,
            props.disabled && "cursor-not-allowed"
          )}
        >
          <FormLabel>{props.label}</FormLabel>

          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
            disabled={props.disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                {props.options.find((option) => option.value === field.value)
                  ?.label || (
                  <span className="text-muted-foreground">
                    {props.placeholder}
                  </span>
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {props.description && (
            <FormDescription className="text-xs ml-0.5">
              {props.description}
            </FormDescription>
          )}
          <FormMessage className="text-xs ml-0.5" />
        </FormItem>
      )}
    />
  );
}

export default SelectFormField;
