import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ECS_CARD_TYPES, UK_JOB_TITLES } from '@/data/uk-electrician-constants';
import { supabase } from '@/integrations/supabase/client';

export interface OnboardingFormData {
  jobTitle: string;
  ecsCardType: string;
  ecsCardExpiry: string;
  ecsCardNumber: string;
}

interface ElecIdOnboardingProps {
  onComplete: (data: OnboardingFormData, preGeneratedElecId?: string) => void;
  onSkip?: () => void;
  elecIdNumber?: string;
  needsRecovery?: boolean;
  userId?: string;
  ecsCardType?: string;
  onRecoveryComplete?: (elecIdNumber: string) => void;
}

const STEPS = [
  { id: 'welcome', title: 'Welcome to Elec-ID', subtitle: 'Your portable professional identity' },
  { id: 'basics', title: 'Basic information', subtitle: 'Tell us about yourself' },
  { id: 'ecs', title: 'ECS card details', subtitle: 'Your industry credentials' },
  { id: 'verify', title: 'Verify your credentials', subtitle: 'Upload documents to unlock benefits' },
  { id: 'complete', title: "You're all set!", subtitle: 'Your Elec-ID is ready' },
];

const BENEFITS = [
  { title: 'Verified credentials', description: 'AI-powered verification of your qualifications' },
  { title: 'Talent Pool access', description: 'Get discovered by top employers' },
  { title: 'Portable identity', description: 'Your credentials follow you, not your employer' },
];

const ElecIdOnboarding = ({
  onComplete,
  onSkip,
  elecIdNumber,
  needsRecovery = false,
  userId,
  ecsCardType: initialEcsCardType,
  onRecoveryComplete,
}: ElecIdOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: '',
    ecsCardType: '',
    ecsCardExpiry: '',
    ecsCardNumber: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const [localElecId, setLocalElecId] = useState<string | null>(elecIdNumber || null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleGenerateElecId = async () => {
    if (!userId) {
      setRecoveryError('Unable to generate Elec-ID. Please try logging out and back in.');
      return;
    }

    setIsGenerating(true);
    setRecoveryError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-elec-id', {
        body: {
          user_id: userId,
          ecs_card_type: initialEcsCardType || null,
        },
      });

      if (error) {
        console.error('Elec-ID generation failed:', error);
        setRecoveryError('Failed to generate Elec-ID. Please try again.');
        return;
      }

      if (data?.elec_id_number) {
        setGeneratedId(data.elec_id_number);
        onRecoveryComplete?.(data.elec_id_number);
      } else {
        setRecoveryError('Unexpected response. Please try again.');
      }
    } catch (err) {
      console.error('Elec-ID generation exception:', err);
      setRecoveryError('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const step = STEPS[currentStep];

  const handleNext = async () => {
    if (currentStep === STEPS.length - 2 && !localElecId && !elecIdNumber && userId) {
      setIsGenerating(true);
      setGenerationError(null);

      try {
        const { data, error } = await supabase.functions.invoke('generate-elec-id', {
          body: {
            user_id: userId,
            ecs_card_type: formData.ecsCardType || initialEcsCardType || null,
          },
        });

        if (error) {
          console.error('Elec-ID generation failed:', error);
          setGenerationError('Failed to generate Elec-ID. Please try again.');
          setIsGenerating(false);
          return;
        }

        if (data?.elec_id_number) {
          setLocalElecId(data.elec_id_number);
        } else {
          setGenerationError('Unexpected response. Please try again.');
          setIsGenerating(false);
          return;
        }
      } catch (err) {
        console.error('Elec-ID generation exception:', err);
        setGenerationError('An error occurred. Please try again.');
        setIsGenerating(false);
        return;
      } finally {
        setIsGenerating(false);
      }
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData, localElecId || elecIdNumber || undefined);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (step.id) {
      case 'basics':
        return formData.jobTitle !== '';
      case 'ecs':
        return formData.ecsCardType !== '' && formData.ecsCardExpiry !== '';
      default:
        return true;
    }
  };

  const jobTitlesByCategory = UK_JOB_TITLES.reduce(
    (acc, title) => {
      if (!acc[title.category]) acc[title.category] = [];
      acc[title.category].push(title);
      return acc;
    },
    {} as Record<string, typeof UK_JOB_TITLES>
  );

  const renderStep = () => {
    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-elec-yellow flex items-center justify-center">
              <span className="text-3xl font-semibold text-black">ID</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Your digital professional identity
              </h2>
              <p className="text-sm text-white max-w-md mx-auto">
                Own and control your professional credentials. Share verified qualifications with
                employers instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-left"
                >
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 mt-2 rounded-full bg-elec-yellow shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm">{benefit.title}</p>
                    <p className="text-xs text-white truncate">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'basics':
        return (
          <div className="space-y-5">
            <div className="text-center">
              <p className="text-sm text-white">
                This helps employers understand your role and expertise.
              </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
              <Label className="text-white text-sm">Job title</Label>
              <Select
                value={formData.jobTitle}
                onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
              >
                <SelectTrigger className="bg-white/[0.04] border-white/[0.06] h-11 rounded-xl text-white">
                  <SelectValue placeholder="Select your job title" />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] max-h-60">
                  {Object.entries(jobTitlesByCategory).map(([category, titles]) => (
                    <React.Fragment key={category}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow">
                        {category}
                      </div>
                      {titles.map((title) => (
                        <SelectItem key={title.value} value={title.value}>
                          {title.label}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'ecs':
        return (
          <div className="space-y-5">
            <div className="text-center">
              <p className="text-sm text-white">
                Your ECS card proves your competence to work in the electrical industry.
              </p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="space-y-2">
                <Label className="text-white text-sm">ECS card type</Label>
                <Select
                  value={formData.ecsCardType}
                  onValueChange={(value) => setFormData({ ...formData, ecsCardType: value })}
                >
                  <SelectTrigger className="bg-white/[0.04] border-white/[0.06] h-11 rounded-xl text-white">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
                    {ECS_CARD_TYPES.map((card) => (
                      <SelectItem key={card.value} value={card.value}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: card.color }} />
                          {card.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">Card expiry date</Label>
                <Input
                  type="date"
                  value={formData.ecsCardExpiry}
                  onChange={(e) => setFormData({ ...formData, ecsCardExpiry: e.target.value })}
                  className="bg-white/[0.04] border-white/[0.06] h-11 rounded-xl text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white text-sm">
                  Card number <span className="text-white">(optional)</span>
                </Label>
                <Input
                  value={formData.ecsCardNumber}
                  onChange={(e) => setFormData({ ...formData, ecsCardNumber: e.target.value })}
                  placeholder="Enter card number"
                  className="bg-white/[0.04] border-white/[0.06] h-11 rounded-xl text-white placeholder:text-white"
                />
              </div>
            </div>
          </div>
        );

      case 'verify':
        return (
          <div className="space-y-5">
            <div className="text-center">
              <p className="text-sm text-white">
                You can verify your credentials later to unlock extra features.
              </p>
            </div>

            {generationError && (
              <div className="max-w-sm mx-auto p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{generationError}</p>
              </div>
            )}

            <div className="max-w-sm mx-auto space-y-3">
              <div className="p-4 rounded-xl border border-elec-yellow/20 bg-elec-yellow/10">
                <p className="font-semibold text-white">Your Elec-ID is ready!</p>
                <p className="text-xs text-white mt-1">Basic profile created</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.04]">
                <p className="text-sm text-white mb-2">Optional next steps</p>
                <ul className="text-xs text-white space-y-1">
                  <li>· Upload your ECS / CSCS card for verification</li>
                  <li>· Add qualifications &amp; training</li>
                  <li>· Build your work history</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'complete': {
        const displayElecId = localElecId || elecIdNumber || 'EM-XXXXXX';
        return (
          <div className="text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-3xl font-semibold text-emerald-400">✓</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Your Elec-ID is ready!
              </h2>
              <p className="text-sm text-white max-w-md mx-auto">
                You're now part of the UK's digital electrician verification network.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.04] border border-elec-yellow/20">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white">Your Elec-ID</p>
                <p className="font-mono font-semibold text-xl text-white">{displayElecId}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 max-w-xs mx-auto text-left">
              <p className="text-sm font-medium text-white">Next steps</p>
              <p className="text-sm text-white">· Upload your ECS card for verification</p>
              <p className="text-sm text-white">· Add your qualifications</p>
              <p className="text-sm text-white">· Enable Talent Pool to get discovered</p>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (needsRecovery && !generatedId) {
    return (
      <div className="min-h-[320px] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center mb-5">
          <span className="text-3xl font-semibold text-elec-yellow">!</span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Your Elec-ID wasn't created
        </h2>
        <p className="text-sm text-white max-w-sm mx-auto mb-6">
          It looks like you opted for an Elec-ID during signup but it wasn't generated. This can
          happen if you confirmed your email on a different device.
        </p>

        {recoveryError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4 max-w-sm">
            <p className="text-sm text-red-400">{recoveryError}</p>
          </div>
        )}

        <Button
          onClick={handleGenerateElecId}
          disabled={isGenerating}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-11 px-6 rounded-xl touch-manipulation active:scale-[0.98]"
        >
          {isGenerating ? 'Generating…' : 'Generate my Elec-ID now'}
        </Button>

        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-4 text-sm text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Skip for now
          </button>
        )}
      </div>
    );
  }

  if (generatedId) {
    return (
      <div className="min-h-[320px] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5">
          <span className="text-3xl font-semibold text-emerald-400">✓</span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">Your Elec-ID is ready!</h2>
        <p className="text-sm text-white max-w-sm mx-auto mb-4">
          Your digital credential has been created successfully.
        </p>

        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.04] border border-elec-yellow/20 mb-6">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white">Your Elec-ID</p>
            <p className="font-mono font-semibold text-xl text-white">{generatedId}</p>
          </div>
        </div>

        <Button
          onClick={() => onComplete(formData)}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-11 px-6 rounded-xl touch-manipulation active:scale-[0.98]"
        >
          Go to my Elec-ID →
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] sm:min-h-[500px] flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          {onSkip && currentStep < STEPS.length - 1 && (
            <button
              onClick={onSkip}
              className="text-xs text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Skip setup
            </button>
          )}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">{step.title}</h1>
        <p className="text-sm text-white mt-1">{step.subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-6 sticky bottom-0 bg-[hsl(0_0%_12%)] pt-3 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <Button
            variant="outline"
            className="h-11 px-5 border-white/[0.06] bg-transparent text-white rounded-xl touch-manipulation active:scale-[0.97]"
            onClick={handleBack}
            disabled={isGenerating}
          >
            ←
          </Button>
        )}
        <Button
          className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold h-11 rounded-xl touch-manipulation active:scale-[0.98]"
          onClick={handleNext}
          disabled={!canProceed() || isGenerating}
        >
          {isGenerating
            ? 'Generating ID…'
            : currentStep === STEPS.length - 1
              ? 'Go to my Elec-ID →'
              : currentStep === 0
                ? 'Get started →'
                : 'Continue →'}
        </Button>
      </div>
    </div>
  );
};

export default ElecIdOnboarding;
