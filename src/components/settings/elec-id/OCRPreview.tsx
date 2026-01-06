import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ScanLine,
  CreditCard,
  Calendar,
  Hash,
  User,
  FileText,
  Shield,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExtractedField {
  key: string;
  label: string;
  value: string | null;
  confidence: number; // 0-1
  validated: boolean;
  icon?: typeof FileText;
}

interface OCRPreviewProps {
  documentType: string;
  isProcessing: boolean;
  extractedFields: ExtractedField[];
  overallConfidence: number;
  className?: string;
}

const FIELD_ICONS: Record<string, typeof FileText> = {
  cardNumber: Hash,
  expiryDate: Calendar,
  holderName: User,
  cardType: CreditCard,
  qualificationName: FileText,
  issuer: Shield,
  grade: Sparkles,
};

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return "text-green-500";
  if (confidence >= 0.7) return "text-amber-500";
  return "text-red-500";
}

function getConfidenceBg(confidence: number): string {
  if (confidence >= 0.9) return "bg-green-500/10 border-green-500/20";
  if (confidence >= 0.7) return "bg-amber-500/10 border-amber-500/20";
  return "bg-red-500/10 border-red-500/20";
}

export function OCRPreview({
  documentType,
  isProcessing,
  extractedFields,
  overallConfidence,
  className,
}: OCRPreviewProps) {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const [visibleFields, setVisibleFields] = useState<number>(0);

  // Animate confidence bar
  useEffect(() => {
    if (!isProcessing && overallConfidence > 0) {
      const timer = setTimeout(() => {
        setAnimatedConfidence(overallConfidence * 100);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedConfidence(0);
    }
  }, [isProcessing, overallConfidence]);

  // Animate fields appearing one by one
  useEffect(() => {
    if (!isProcessing && extractedFields.length > 0) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setVisibleFields(count);
        if (count >= extractedFields.length) {
          clearInterval(interval);
        }
      }, 150);
      return () => clearInterval(interval);
    } else {
      setVisibleFields(0);
    }
  }, [isProcessing, extractedFields.length]);

  const validatedCount = extractedFields.filter((f) => f.validated).length;

  return (
    <Card className={cn("border-border overflow-hidden", className)}>
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <ScanLine className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium">Document Analysis</p>
              <p className="text-xs text-muted-foreground capitalize">
                {documentType.replace(/_/g, " ")}
              </p>
            </div>
          </div>
          {isProcessing ? (
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-0">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Scanning
            </Badge>
          ) : overallConfidence > 0 ? (
            <Badge
              variant="outline"
              className={cn(
                "border-0",
                overallConfidence >= 0.8
                  ? "bg-green-500/20 text-green-400"
                  : overallConfidence >= 0.6
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              {Math.round(overallConfidence * 100)}% Match
            </Badge>
          ) : null}
        </div>

        {/* Processing animation */}
        {isProcessing && (
          <div className="space-y-3">
            <div className="relative h-32 rounded-lg overflow-hidden bg-white/5 border border-white/10">
              {/* Scanning line animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 text-purple-400 mx-auto animate-spin" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Extracting text...
                  </p>
                </div>
              </div>
            </div>

            {/* Skeleton loaders for fields */}
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-14 rounded-lg bg-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Extracted fields */}
        {!isProcessing && extractedFields.length > 0 && (
          <div className="space-y-3">
            {/* Confidence bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence</span>
                <span className={getConfidenceColor(overallConfidence)}>
                  {Math.round(animatedConfidence)}%
                </span>
              </div>
              <Progress
                value={animatedConfidence}
                className={cn(
                  "h-2",
                  overallConfidence >= 0.8
                    ? "[&>div]:bg-green-500"
                    : overallConfidence >= 0.6
                    ? "[&>div]:bg-amber-500"
                    : "[&>div]:bg-red-500"
                )}
              />
            </div>

            {/* Validation summary */}
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>
                {validatedCount} of {extractedFields.length} fields validated
              </span>
            </div>

            {/* Field list */}
            <div className="space-y-2">
              {extractedFields.map((field, index) => {
                const FieldIcon = FIELD_ICONS[field.key] || field.icon || FileText;
                const isVisible = index < visibleFields;

                return (
                  <div
                    key={field.key}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                      field.value ? getConfidenceBg(field.confidence) : "bg-white/5 border-white/10"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="p-1.5 rounded bg-white/10">
                      <FieldIcon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      {field.value ? (
                        <p className="font-medium truncate">{field.value}</p>
                      ) : (
                        <p className="text-muted-foreground italic">Not detected</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {field.value && (
                        <span
                          className={cn(
                            "text-xs font-medium",
                            getConfidenceColor(field.confidence)
                          )}
                        >
                          {Math.round(field.confidence * 100)}%
                        </span>
                      )}
                      {field.validated ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : field.value ? (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Low confidence warning */}
            {overallConfidence < 0.7 && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-500">
                    Low confidence detected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Try retaking the photo with better lighting and ensure the
                    document is flat and in focus.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!isProcessing && extractedFields.length === 0 && (
          <div className="text-center py-8">
            <ScanLine className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Capture a document to analyze
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OCRPreview;
