import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Camera, FileText, Mic, X, Image, Video, File } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type CaptureType = 'photo' | 'video' | 'document' | 'voice' | 'text';

interface QuickCaptureButtonProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture?: (type: CaptureType) => void;
  className?: string;
}

/**
 * QuickCaptureButton - Floating Action Button for quick evidence capture
 *
 * Mobile: Floating button above bottom nav, opens full-screen capture modal
 * Desktop: Inline button in sidebar
 *
 * Capture types:
 * - Photo: Camera capture or gallery upload
 * - Video: Short video recording
 * - Document: PDF/file upload
 * - Voice: Voice note with transcription
 * - Text: Quick text reflection
 */
export function QuickCaptureButton({
  isOpen,
  onOpenChange,
  onCapture,
  className,
}: QuickCaptureButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const captureOptions: { type: CaptureType; label: string; icon: typeof Camera; color: string; description: string }[] = [
    {
      type: 'photo',
      label: 'Photo',
      icon: Image,
      color: 'bg-blue-500',
      description: 'Take a photo or upload from gallery',
    },
    {
      type: 'video',
      label: 'Video',
      icon: Video,
      color: 'bg-red-500',
      description: 'Record a short video clip',
    },
    {
      type: 'document',
      label: 'Document',
      icon: File,
      color: 'bg-green-500',
      description: 'Upload PDF, Word, or other files',
    },
    {
      type: 'voice',
      label: 'Voice Note',
      icon: Mic,
      color: 'bg-purple-500',
      description: 'Record audio with auto-transcription',
    },
    {
      type: 'text',
      label: 'Quick Note',
      icon: FileText,
      color: 'bg-amber-500',
      description: 'Write a text reflection',
    },
  ];

  const handleCaptureSelect = (type: CaptureType) => {
    onCapture?.(type);
    onOpenChange(false);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Action Button - Mobile only */}
      <div className={cn("fixed z-50", className)}>
        {/* FAB Position: Above bottom nav, right side */}
        <div className="fixed bottom-20 right-4">
          {/* Expanded Options - Radial menu */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 flex flex-col-reverse gap-3 items-end">
              {captureOptions.map((option, index) => (
                <button
                  key={option.type}
                  onClick={() => handleCaptureSelect(option.type)}
                  className={cn(
                    "flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-full shadow-lg",
                    "bg-card border border-border",
                    "animate-in slide-in-from-bottom-2 fade-in duration-200",
                    "hover:scale-105 active:scale-95 transition-transform touch-manipulation"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {option.label}
                  </span>
                  <span className={cn("h-10 w-10 rounded-full flex items-center justify-center", option.color)}>
                    <option.icon className="h-5 w-5 text-white" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Main FAB Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "h-14 w-14 rounded-full shadow-lg flex items-center justify-center",
              "transition-all duration-300 ease-out",
              "active:scale-95 touch-manipulation",
              isExpanded
                ? "bg-muted rotate-45"
                : "bg-elec-yellow hover:bg-elec-yellow/90"
            )}
            aria-label={isExpanded ? "Close capture menu" : "Quick capture"}
          >
            {isExpanded ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Plus className="h-7 w-7 text-black" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Backdrop when expanded */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>

      {/* Full-screen Capture Modal - For actual capture flow */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg sm:max-w-xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                <Camera className="h-4 w-4 text-elec-yellow" />
              </span>
              Quick Capture
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Choose how you want to capture evidence for your portfolio:
            </p>

            <div className="grid gap-3">
              {captureOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleCaptureSelect(option.type)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-muted/50 border border-border",
                    "hover:border-elec-yellow/50 hover:bg-elec-yellow/5",
                    "transition-all duration-200",
                    "text-left touch-manipulation active:scale-[0.98]"
                  )}
                >
                  <span className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", option.color)}>
                    <option.icon className="h-6 w-6 text-white" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuickCaptureButton;
