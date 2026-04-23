import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface ExtractedField {
  key: string;
  label: string;
  value: string | null;
  confidence: number; // 0-1
  validated: boolean;
}

interface OCRPreviewProps {
  documentType: string;
  isProcessing: boolean;
  extractedFields: ExtractedField[];
  overallConfidence: number;
  className?: string;
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return 'text-emerald-400';
  if (confidence >= 0.7) return 'text-amber-400';
  return 'text-red-400';
}

function getConfidenceBg(confidence: number): string {
  if (confidence >= 0.9) return 'bg-emerald-500/10 border-emerald-500/20';
  if (confidence >= 0.7) return 'bg-amber-500/10 border-amber-500/20';
  return 'bg-red-500/10 border-red-500/20';
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
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden p-4 space-y-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Document analysis
          </div>
          <div className="mt-1 text-sm font-medium text-white capitalize">
            {documentType.replace(/_/g, ' ')}
          </div>
        </div>
        {isProcessing ? (
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20">
            Scanning
          </span>
        ) : overallConfidence > 0 ? (
          <span
            className={cn(
              'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border',
              overallConfidence >= 0.8
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : overallConfidence >= 0.6
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
            )}
          >
            {Math.round(overallConfidence * 100)}% match
          </span>
        ) : null}
      </div>

      {/* Processing */}
      {isProcessing && (
        <div className="space-y-3">
          <div className="relative h-32 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-scan" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="h-6 w-6 mx-auto rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
                <p className="text-sm text-white mt-2">Extracting text…</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-white/[0.04] animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Extracted fields */}
      {!isProcessing && extractedFields.length > 0 && (
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white">Confidence</span>
              <span className={getConfidenceColor(overallConfidence)}>
                {Math.round(animatedConfidence)}%
              </span>
            </div>
            <Progress value={animatedConfidence} className="h-2" />
          </div>

          <div className="flex items-center gap-2 text-sm text-white">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"
            />
            <span>
              {validatedCount} of {extractedFields.length} fields validated
            </span>
          </div>

          <div className="space-y-2">
            {extractedFields.map((field, index) => {
              const isVisible = index < visibleFields;
              return (
                <div
                  key={field.key}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-all duration-300',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                    field.value ? getConfidenceBg(field.confidence) : 'bg-white/[0.04] border-white/[0.06]'
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white">{field.label}</p>
                    {field.value ? (
                      <p className="font-medium text-white truncate">{field.value}</p>
                    ) : (
                      <p className="text-white italic">Not detected</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {field.value && (
                      <span
                        className={cn(
                          'text-xs font-medium',
                          getConfidenceColor(field.confidence)
                        )}
                      >
                        {Math.round(field.confidence * 100)}%
                      </span>
                    )}
                    {field.validated ? (
                      <span className="text-[11px] font-medium text-emerald-400">OK</span>
                    ) : field.value ? (
                      <span className="text-[11px] font-medium text-amber-400">Check</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {overallConfidence < 0.7 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm font-medium text-amber-400">Low confidence detected</p>
              <p className="text-xs text-white mt-1">
                Try retaking the photo with better lighting and ensure the document is flat and in
                focus.
              </p>
            </div>
          )}
        </div>
      )}

      {!isProcessing && extractedFields.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-white">Capture a document to analyse</p>
        </div>
      )}
    </div>
  );
}

export default OCRPreview;
