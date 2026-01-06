/**
 * CertificateActionsBar
 *
 * Sticky action bar for certificate generation, email, and save.
 * Fixed bottom on mobile, floating card on desktop.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  Mail,
  Save,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Code,
  Copy,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';

export interface CertificateActionsBarProps {
  canGenerate: boolean;
  isGenerating?: boolean;
  isComplete?: boolean;
  onGenerate: () => void;
  onEmail: () => void;
  onSaveDraft: () => void;
  onCopyJson?: () => void;
  disabledReason?: string;
  certificateType?: 'EICR' | 'EIC';
  showDevTools?: boolean;
  className?: string;
}

export const CertificateActionsBar: React.FC<CertificateActionsBarProps> = ({
  canGenerate,
  isGenerating = false,
  isComplete = false,
  onGenerate,
  onEmail,
  onSaveDraft,
  onCopyJson,
  disabledReason,
  certificateType = 'EICR',
  showDevTools = false,
  className,
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  const handleGenerate = () => {
    haptics.tap();
    onGenerate();
  };

  const handleEmail = () => {
    haptics.tap();
    onEmail();
  };

  const handleSave = () => {
    haptics.tap();
    onSaveDraft();
  };

  const handleCopyJson = () => {
    haptics.tap();
    onCopyJson?.();
  };

  // Success animation effect
  React.useEffect(() => {
    if (isComplete && !showSuccess) {
      setShowSuccess(true);
      haptics.success();
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, showSuccess, haptics]);

  // Mobile: Fixed bottom bar
  if (isMobile) {
    return (
      <>
        {/* Spacer to prevent content from being hidden behind fixed bar */}
        <div className="h-24" />

        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50',
            'bg-card/95 backdrop-blur-lg border-t border-border',
            'pb-[env(safe-area-inset-bottom)]',
            className
          )}
        >
          <div className="p-4 space-y-3">
            {/* Primary action */}
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={cn(
                'w-full h-14 text-base font-semibold gap-3',
                'bg-elec-yellow hover:bg-elec-yellow/90 text-black',
                'shadow-lg shadow-elec-yellow/20',
                'disabled:opacity-50 disabled:shadow-none',
                'touch-manipulation'
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Certificate Generated!
                </>
              ) : (
                <>
                  <FileDown className="h-5 w-5" />
                  Generate {certificateType}
                </>
              )}
            </Button>

            {/* Secondary actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleEmail}
                disabled={!canGenerate}
                className="flex-1 h-12 gap-2 touch-manipulation"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                className="flex-1 h-12 gap-2 touch-manipulation"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </div>

            {/* Disabled reason */}
            <AnimatePresence>
              {!canGenerate && disabledReason && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-xs text-amber-400 px-1"
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>{disabledReason}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </>
    );
  }

  // Desktop: Floating card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={className}
    >
      <Card className="p-6 border-2 border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
        {/* Header gradient */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-elec-yellow via-amber-500 to-elec-yellow rounded-t-lg" />

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                <FileDown className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Generate Certificate</h3>
                <p className="text-xs text-muted-foreground">
                  Create your professional {certificateType} certificate
                </p>
              </div>
            </div>

            {/* Success badge */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30"
                >
                  <Sparkles className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Success!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {/* Primary row */}
            <div className="flex gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex-1">
                      <Button
                        onClick={handleGenerate}
                        disabled={!canGenerate || isGenerating}
                        className={cn(
                          'w-full h-12 text-base font-semibold gap-2.5',
                          'bg-elec-yellow hover:bg-elec-yellow/90 text-black',
                          'shadow-lg shadow-elec-yellow/20 hover:shadow-elec-yellow/30',
                          'transition-all hover:scale-[1.02]',
                          'disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100'
                        )}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Generating...
                          </>
                        ) : showSuccess ? (
                          <>
                            <CheckCircle className="h-5 w-5" />
                            Generated!
                          </>
                        ) : (
                          <>
                            <FileDown className="h-5 w-5" />
                            Generate PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canGenerate && disabledReason && (
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-sm">{disabledReason}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="outline"
                onClick={handleSave}
                className="h-12 px-4 gap-2 border-border hover:bg-muted/50"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
            </div>

            {/* Secondary row */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleEmail}
                disabled={!canGenerate}
                className="flex-1 h-11 gap-2 border-border hover:bg-muted/50"
              >
                <Mail className="h-4 w-4" />
                Email to Client
              </Button>
            </div>
          </div>

          {/* Dev tools */}
          {showDevTools && onCopyJson && (
            <Collapsible open={isDevToolsOpen} onOpenChange={setIsDevToolsOpen}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code className="h-4 w-4" />
                    Developer Tools
                  </div>
                  <ChevronUp className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform',
                    !isDevToolsOpen && 'rotate-180'
                  )} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 p-3 rounded-lg bg-muted/10 border border-border/30"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyJson}
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" />
                    Copy JSON Data
                  </Button>
                </motion.div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Disabled reason on desktop */}
          <AnimatePresence>
            {!canGenerate && disabledReason && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm text-amber-400"
              >
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{disabledReason}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

export default CertificateActionsBar;
