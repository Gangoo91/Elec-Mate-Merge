
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Download, FileText, Shield, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { DocumentTemplate, DocumentTemplateService } from "@/services/documentTemplateService";

interface DocumentGeneratorProps {
  template: DocumentTemplate;
  onClose: () => void;
}

const DocumentGenerator = ({ template, onClose }: DocumentGeneratorProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateField = (field: any, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === "")) {
      return `${field.label} is required`;
    }

    if (value && field.validation) {
      const regex = new RegExp(field.validation);
      if (!regex.test(value.toString())) {
        return `${field.label} format is invalid`;
      }
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (field.type === "postcode" && value) {
      const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i;
      if (!postcodeRegex.test(value)) {
        return "Please enter a valid UK postcode";
      }
    }

    if (field.type === "phone" && value) {
      const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
      if (!phoneRegex.test(value)) {
        return "Please enter a valid UK phone number";
      }
    }

    return null;
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      
      // Validate all fields
      const errors: Record<string, string> = {};
      template.fields?.forEach(field => {
        const error = validateField(field, formData[field.name]);
        if (error) {
          errors[field.name] = error;
        }
      });

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast({
          title: "Validation Errors",
          description: `Please fix ${Object.keys(errors).length} field(s) before generating the document.`,
          variant: "destructive"
        });
        return;
      }

      const generatedDoc = await DocumentTemplateService.generateDocument(template.id, formData);
      
      toast({
        title: "Document Generated Successfully",
        description: `${generatedDoc.fileName} has been created and is ready for download.`,
      });

      // In a real app, you would download the actual generated document
      console.log("Generated document:", generatedDoc);
      
    } catch (error) {
      toast({
        title: "Generation Failed", 
        description: "Failed to generate document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderField = (field: any) => {
    const hasError = validationErrors[field.name];
    
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text"}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={hasError ? "border-destructive" : ""}
            />
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={hasError ? "border-destructive" : ""}
              rows={3}
            />
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      case "number":
      case "currency":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <div className="relative">
              {field.type === "currency" && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
              )}
              <Input
                id={field.id}
                type="number"
                step={field.type === "currency" ? "0.01" : "1"}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={cn(hasError ? "border-destructive" : "", field.type === "currency" && "pl-8")}
              />
            </div>
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      case "postcode":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={field.id}
              type="text"
              placeholder={field.placeholder || "SW1A 1AA"}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value.toUpperCase())}
              className={hasError ? "border-destructive" : ""}
              maxLength={8}
            />
            <p className="text-xs text-muted-foreground">UK postcode format required</p>
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      case "date":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData[field.name] && "text-muted-foreground",
                    hasError && "border-destructive"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData[field.name] ? format(formData[field.name], "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData[field.name]}
                  onSelect={(date) => handleInputChange(field.name, date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? "text-destructive" : ""}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Select onValueChange={(value) => handleInputChange(field.name, value)}>
              <SelectTrigger className={hasError ? "border-destructive" : ""}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
            {hasError && (
              <p className="text-xs text-destructive">{hasError}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <FileText className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">Generate {template.name}</h2>
              {template.ukSpecific && (
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  UK Specific
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-3">{template.description}</p>
            
            {/* Regulation Compliance Info */}
            {template.regulationCompliant && template.regulationCompliant.length > 0 && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-400">Regulation Compliant</p>
                    <p className="text-xs text-green-300">
                      This template complies with: {template.regulationCompliant.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {template.fields?.map(renderField)}
        </div>

        <div className="flex gap-3 pt-6 border-t border-elec-yellow/20">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Document"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
