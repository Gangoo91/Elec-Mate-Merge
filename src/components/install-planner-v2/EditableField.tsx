import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Check, X, Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface EditableFieldProps {
  label: string;
  value: string | number;
  fieldType: "cable" | "protection" | "number";
  options?: Array<{ value: string | number; label: string }>;
  context: {
    planData: any;
    currentSpec: any;
  };
  onValidated?: (newValue: string | number, validation: any) => void;
}

export const EditableField = ({
  label,
  value,
  fieldType,
  options,
  context,
  onValidated,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setValidationResult(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value);
    setValidationResult(null);
  };

  const handleValidate = async () => {
    if (tempValue === value) {
      setIsEditing(false);
      return;
    }

    setIsValidating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('validate-spec-change', {
        body: {
          field: label,
          currentValue: value,
          newValue: tempValue,
          fieldType,
          planData: context.planData,
          currentSpec: context.currentSpec,
        }
      });

      if (error) throw error;

      setValidationResult(data);
      
      if (data.valid) {
        toast({
          title: "✓ Change Validated",
          description: data.message || `${label} updated successfully`,
        });
        onValidated?.(tempValue, data);
        setIsEditing(false);
      } else {
        toast({
          title: "⚠ Validation Warning",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast({
        title: "Validation Failed",
        description: "Could not validate change. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  // Get cable size options
  const cableSizeOptions = [
    { value: 1.5, label: "1.5mm²" },
    { value: 2.5, label: "2.5mm²" },
    { value: 4, label: "4mm²" },
    { value: 6, label: "6mm²" },
    { value: 10, label: "10mm²" },
    { value: 16, label: "16mm²" },
    { value: 25, label: "25mm²" },
    { value: 35, label: "35mm²" },
    { value: 50, label: "50mm²" },
    { value: 70, label: "70mm²" },
    { value: 95, label: "95mm²" },
  ];

  const protectionOptions = [
    { value: "6A Type B MCB", label: "6A Type B" },
    { value: "10A Type B MCB", label: "10A Type B" },
    { value: "16A Type B MCB", label: "16A Type B" },
    { value: "20A Type B MCB", label: "20A Type B" },
    { value: "32A Type B MCB", label: "32A Type B" },
    { value: "40A Type B MCB", label: "40A Type B" },
    { value: "50A Type B MCB", label: "50A Type B" },
    { value: "6A Type C MCB", label: "6A Type C" },
    { value: "10A Type C MCB", label: "10A Type C" },
    { value: "16A Type C MCB", label: "16A Type C" },
    { value: "20A Type C MCB", label: "20A Type C" },
    { value: "32A Type C MCB", label: "32A Type C" },
    { value: "40A Type C MCB", label: "40A Type C" },
  ];

  const selectOptions = fieldType === "cable" ? cableSizeOptions : 
                       fieldType === "protection" ? protectionOptions : 
                       options || [];

  if (!isEditing) {
    return (
      <button
        onClick={handleEdit}
        className="inline-flex items-center gap-1 hover:bg-muted/50 rounded px-2 py-1 transition-colors group cursor-pointer"
      >
        <span className="font-bold text-foreground group-hover:text-elec-yellow">
          {typeof value === 'number' && fieldType === "cable" ? `${value}mm²` : value}
        </span>
        <span className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground">
          (click to edit)
        </span>
      </button>
    );
  }

  return (
    <div className="space-y-2 border border-elec-yellow/30 rounded p-3 bg-muted/20">
      <p className="text-xs text-muted-foreground">{label}</p>
      
      {fieldType === "number" ? (
        <Input
          type="number"
          value={tempValue}
          onChange={(e) => setTempValue(parseFloat(e.target.value))}
          className="h-8"
          autoFocus
        />
      ) : (
        <Select
          value={String(tempValue)}
          onValueChange={(val) => setTempValue(fieldType === "cable" ? parseFloat(val) : val)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleValidate}
          disabled={isValidating}
          className="h-7 gap-1"
        >
          {isValidating ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Check className="h-3 w-3" />
          )}
          Validate
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={isValidating}
          className="h-7"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      {validationResult && !validationResult.valid && (
        <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/30 rounded text-xs">
          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-destructive">{validationResult.message}</p>
            {validationResult.details && (
              <ul className="space-y-0.5 text-muted-foreground">
                {validationResult.details.map((detail: string, idx: number) => (
                  <li key={idx}>• {detail}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
