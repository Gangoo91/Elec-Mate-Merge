/**
 * JobTypeAttributeFields - Renders dynamic attribute fields based on job type
 *
 * Supports three field types:
 * - select: Dropdown with predefined options
 * - number: Numeric input with min/max/unit
 * - text: Free-form text input
 */

import React from "react";
import { JobTypeConfig, JobAttribute } from "@/hooks/useJobTypes";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";

interface JobTypeAttributeFieldsProps {
  config: JobTypeConfig;
  values: Record<string, string | number>;
  onChange: (values: Record<string, string | number>) => void;
  className?: string;
}

const JobTypeAttributeFields: React.FC<JobTypeAttributeFieldsProps> = ({
  config,
  values,
  onChange,
  className,
}) => {
  const attributes = config.attributes || [];

  if (attributes.length === 0) return null;

  const handleFieldChange = (key: string, value: string | number) => {
    onChange({ ...values, [key]: value });
  };

  const renderField = (attr: JobAttribute) => {
    const fieldValue = values[attr.key] ?? "";

    switch (attr.type) {
      case "select":
        return (
          <Select
            value={String(fieldValue)}
            onValueChange={(v) => handleFieldChange(attr.key, v)}
          >
            <SelectTrigger
              className={cn(
                "h-12 bg-neutral-800 border-2 border-white/10 rounded-xl",
                "text-white focus:border-yellow-400/50 focus:ring-0",
                "data-[state=open]:border-yellow-400/50"
              )}
            >
              <SelectValue placeholder={`Select ${attr.label.toLowerCase()}...`} />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-white/10">
              {attr.options?.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-white hover:bg-white/5 focus:bg-white/5"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <div className="relative">
            <Input
              type="number"
              value={fieldValue}
              onChange={(e) => handleFieldChange(attr.key, e.target.value)}
              placeholder={`Enter ${attr.label.toLowerCase()}`}
              min={attr.min}
              max={attr.max}
              className={cn(
                "h-12 bg-neutral-800 border-2 border-white/10 rounded-xl",
                "text-white text-base placeholder:text-white/30",
                "focus:border-yellow-400/50 focus:ring-0",
                attr.unit && "pr-16"
              )}
            />
            {attr.unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
                {attr.unit}
              </span>
            )}
          </div>
        );

      case "text":
      default:
        return (
          <Input
            type="text"
            value={fieldValue}
            onChange={(e) => handleFieldChange(attr.key, e.target.value)}
            placeholder={`Enter ${attr.label.toLowerCase()}`}
            className={cn(
              "h-12 bg-neutral-800 border-2 border-white/10 rounded-xl",
              "text-white text-base placeholder:text-white/30",
              "focus:border-yellow-400/50 focus:ring-0"
            )}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Settings2 className="h-4 w-4 text-yellow-400" />
        <span className="font-medium">Job Details</span>
        <span className="text-white/40">(Optional but helps pricing accuracy)</span>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {attributes.map((attr) => (
          <div key={attr.key}>
            <label className="text-sm font-medium text-white mb-2 block">
              {attr.label}
              {attr.required && <span className="text-yellow-400 ml-1">*</span>}
            </label>
            {renderField(attr)}
            {attr.type === "number" && (attr.min !== undefined || attr.max !== undefined) && (
              <p className="text-xs text-white/40 mt-1">
                {attr.min !== undefined && attr.max !== undefined
                  ? `Between ${attr.min} and ${attr.max}`
                  : attr.min !== undefined
                  ? `Minimum: ${attr.min}`
                  : `Maximum: ${attr.max}`}
                {attr.unit && ` ${attr.unit}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTypeAttributeFields;
