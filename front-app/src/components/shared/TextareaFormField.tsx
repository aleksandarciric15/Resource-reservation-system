import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type InputFormFieldProps = {
  control: any;
  name: string;
  label: string;
  display?: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

function TextareaFormField(props: InputFormFieldProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", props.className)}>
          <FormLabel className="">{props.label}</FormLabel>

          <FormControl>
            <Textarea
              className="w-full resize-none p-2 border border-gray-300 rounded-md overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-hidden"
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
            />
          </FormControl>
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

export default TextareaFormField;
