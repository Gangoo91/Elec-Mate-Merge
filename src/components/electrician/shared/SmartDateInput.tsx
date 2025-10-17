import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { RequiredFieldTooltip } from "@/components/ui/required-field-tooltip";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SmartDateInputProps {
  id: string;
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  required?: boolean;
  helpText?: string;
  minDate?: Date;
  defaultOffset?: number; // Days from today
  placeholder?: string;
}

export const SmartDateInput: React.FC<SmartDateInputProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  helpText,
  minDate,
  defaultOffset,
  placeholder = "Select date"
}) => {
  // Auto-populate with default offset if provided and no value set
  React.useEffect(() => {
    if (defaultOffset !== undefined && !value) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + defaultOffset);
      onChange(defaultDate);
    }
  }, [defaultOffset, value, onChange]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-base font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {helpText && <RequiredFieldTooltip content={helpText} />}
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full h-14 justify-start text-left font-normal bg-elec-grey border-primary/30 hover:border-elec-yellow/40",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => minDate ? date < minDate : false}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
