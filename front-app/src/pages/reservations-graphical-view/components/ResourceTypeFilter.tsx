import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { ResourceType } from "@/api/models/resource";

interface ResourceTypeFilterProps {
  resourceTypes: ResourceType[];
  selectedType: ResourceType | undefined;
  onSelectType: (type: ResourceType | undefined) => void;
}

export function ResourceTypeFilter({
  resourceTypes,
  selectedType,
  onSelectType,
}: ResourceTypeFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedType?.name || "Select resource type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search resource type..." />
          <CommandList>
            <CommandEmpty>No resource types found.</CommandEmpty>
            <CommandGroup>
              {resourceTypes.map((type) => (
                <CommandItem
                  key={type.id}
                  onSelect={() => {
                    onSelectType(
                      type.id === selectedType?.id ? undefined : type
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedType === type ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {type.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
