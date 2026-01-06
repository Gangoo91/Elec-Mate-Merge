/**
 * QuickSignatureFlow
 *
 * Streamlined signature capture flow for mobile devices.
 * Step-through process for collecting required signatures.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Shield,
  Trash2
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';
import SignatureInput from '@/components/signature/SignatureInput';

export interface SignatureData {
  name: string;
  signature: string;
  company?: string;
  position?: string;
  date?: string;
}

export interface QuickSignatureFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspectedBy?: SignatureData;
  authorisedBy?: SignatureData;
  savedSignature?: string;
  onComplete: (inspectedBy: SignatureData, authorisedBy: SignatureData) => void;
  inspectorName?: string;
  companyName?: string;
}

type Step = 'inspected' | 'authorised';

export const QuickSignatureFlow: React.FC<QuickSignatureFlowProps> = ({
  open,
  onOpenChange,
  inspectedBy: initialInspectedBy,
  authorisedBy: initialAuthorisedBy,
  savedSignature,
  onComplete,
  inspectorName,
  companyName,
}) => {
  const haptics = useHaptics();

  // Current step
  const [currentStep, setCurrentStep] = useState<Step>('inspected');

  // Form data
  const [inspectedBy, setInspectedBy] = useState<SignatureData>(
    initialInspectedBy || {
      name: inspectorName?.toUpperCase() || '',
      signature: savedSignature || '',
      company: companyName || '',
      position: 'Inspector',
    }
  );

  const [authorisedBy, setAuthorisedBy] = useState<SignatureData>(
    initialAuthorisedBy || {
      name: '',
      signature: '',
      company: '',
      position: '',
      date: new Date().toISOString().split('T')[0],
    }
  );

  const [sameAsInspected, setSameAsInspected] = useState(false);

  // Reset when opening
  React.useEffect(() => {
    if (open) {
      setCurrentStep('inspected');
      setInspectedBy(initialInspectedBy || {
        name: inspectorName?.toUpperCase() || '',
        signature: savedSignature || '',
        company: companyName || '',
        position: 'Inspector',
      });
      setAuthorisedBy(initialAuthorisedBy || {
        name: '',
        signature: '',
        company: '',
        position: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSameAsInspected(false);
    }
  }, [open, initialInspectedBy, initialAuthorisedBy, inspectorName, companyName, savedSignature]);

  // Validation
  const isInspectedValid = inspectedBy.name.trim() && inspectedBy.signature;
  const isAuthorisedValid = authorisedBy.name.trim() && authorisedBy.signature;

  // Handle next step
  const handleNext = useCallback(() => {
    if (currentStep === 'inspected' && isInspectedValid) {
      haptics.tap();
      setCurrentStep('authorised');

      // Auto-fill authorised if same as inspected is checked
      if (sameAsInspected) {
        setAuthorisedBy({
          ...inspectedBy,
          date: new Date().toISOString().split('T')[0],
        });
      }
    }
  }, [currentStep, isInspectedValid, sameAsInspected, inspectedBy, haptics]);

  // Handle back
  const handleBack = useCallback(() => {
    haptics.tap();
    setCurrentStep('inspected');
  }, [haptics]);

  // Handle complete
  const handleComplete = useCallback(() => {
    if (isInspectedValid && isAuthorisedValid) {
      haptics.success();
      onComplete(inspectedBy, authorisedBy);
      onOpenChange(false);
    }
  }, [isInspectedValid, isAuthorisedValid, inspectedBy, authorisedBy, onComplete, onOpenChange, haptics]);

  // Handle same as inspected
  const handleSameAsInspected = useCallback((checked: boolean) => {
    setSameAsInspected(checked);
    if (checked) {
      haptics.tap();
      setAuthorisedBy({
        ...inspectedBy,
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [inspectedBy, haptics]);

  // Use saved signature
  const handleUseSavedSignature = useCallback(() => {
    if (savedSignature) {
      haptics.tap();
      if (currentStep === 'inspected') {
        setInspectedBy(prev => ({ ...prev, signature: savedSignature }));
      } else {
        setAuthorisedBy(prev => ({ ...prev, signature: savedSignature }));
      }
    }
  }, [savedSignature, currentStep, haptics]);

  // Clear signature
  const handleClearSignature = useCallback(() => {
    haptics.tap();
    if (currentStep === 'inspected') {
      setInspectedBy(prev => ({ ...prev, signature: '' }));
    } else {
      setAuthorisedBy(prev => ({ ...prev, signature: '' }));
    }
  }, [currentStep, haptics]);

  const steps = [
    { id: 'inspected', label: 'Inspected By', icon: User },
    { id: 'authorised', label: 'Authorised By', icon: Shield },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] sm:h-[90vh] flex flex-col p-0">
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">
              Sign Certificate
            </SheetTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Step {currentStep === 'inspected' ? '1' : '2'} of 2
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = step.id === 'inspected' && currentStep === 'authorised';

              return (
                <React.Fragment key={step.id}>
                  <div className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors',
                    isActive && 'bg-elec-yellow/10 text-elec-yellow',
                    isComplete && 'bg-green-500/10 text-green-400',
                    !isActive && !isComplete && 'text-muted-foreground'
                  )}>
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 h-0.5 rounded-full',
                      isComplete ? 'bg-green-500/50' : 'bg-border'
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {currentStep === 'inspected' ? (
              <motion.div
                key="inspected"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-elec-yellow">INSPECTED BY</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Person who carried out the inspection
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Name (Capitals) *</Label>
                    <Input
                      value={inspectedBy.name}
                      onChange={(e) => setInspectedBy(prev => ({
                        ...prev,
                        name: e.target.value.toUpperCase()
                      }))}
                      placeholder="FULL NAME"
                      className="uppercase h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label>Company</Label>
                    <Input
                      value={inspectedBy.company || ''}
                      onChange={(e) => setInspectedBy(prev => ({
                        ...prev,
                        company: e.target.value
                      }))}
                      placeholder="Company name"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Signature *</Label>
                      <div className="flex gap-2">
                        {savedSignature && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUseSavedSignature}
                            className="text-xs h-7"
                          >
                            Use Saved
                          </Button>
                        )}
                        {inspectedBy.signature && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearSignature}
                            className="text-xs h-7 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-xl p-2 bg-card/50">
                      <SignatureInput
                        value={inspectedBy.signature}
                        onChange={(value) => setInspectedBy(prev => ({
                          ...prev,
                          signature: value || ''
                        }))}
                        placeholder="Draw or type signature"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Same as inspected checkbox */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <Checkbox
                    id="sameAsInspected"
                    checked={sameAsInspected}
                    onCheckedChange={handleSameAsInspected}
                  />
                  <Label htmlFor="sameAsInspected" className="cursor-pointer text-sm">
                    Same person will authorise the report
                  </Label>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="authorised"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-elec-yellow">REPORT AUTHORISED BY</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Person authorising the report for issue
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Name (Capitals) *</Label>
                    <Input
                      value={authorisedBy.name}
                      onChange={(e) => setAuthorisedBy(prev => ({
                        ...prev,
                        name: e.target.value.toUpperCase()
                      }))}
                      placeholder="FULL NAME"
                      className="uppercase h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={authorisedBy.date || ''}
                      onChange={(e) => setAuthorisedBy(prev => ({
                        ...prev,
                        date: e.target.value
                      }))}
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <Label>Company</Label>
                    <Input
                      value={authorisedBy.company || ''}
                      onChange={(e) => setAuthorisedBy(prev => ({
                        ...prev,
                        company: e.target.value
                      }))}
                      placeholder="Company name"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Signature *</Label>
                      <div className="flex gap-2">
                        {savedSignature && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleUseSavedSignature}
                            className="text-xs h-7"
                          >
                            Use Saved
                          </Button>
                        )}
                        {authorisedBy.signature && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearSignature}
                            className="text-xs h-7 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-xl p-2 bg-card/50">
                      <SignatureInput
                        value={authorisedBy.signature}
                        onChange={(value) => setAuthorisedBy(prev => ({
                          ...prev,
                          signature: value || ''
                        }))}
                        placeholder="Draw or type signature"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 bg-card/50 pb-[env(safe-area-inset-bottom)]">
          <div className="flex gap-3">
            {currentStep === 'authorised' && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}

            {currentStep === 'inspected' ? (
              <Button
                onClick={handleNext}
                disabled={!isInspectedValid}
                className="flex-1 h-12 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!isAuthorisedValid}
                className="flex-1 h-12 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                <Check className="h-4 w-4" />
                Complete Signatures
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuickSignatureFlow;
