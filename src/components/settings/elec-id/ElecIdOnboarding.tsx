import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IdCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Camera,
  Sparkles,
  Shield,
  Award,
  Crown,
  Users,
  Zap,
  FileCheck,
  GraduationCap,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { ECS_CARD_TYPES, UK_JOB_TITLES } from "@/data/uk-electrician-constants";
import { supabase } from "@/integrations/supabase/client";

// Exported form data type for parent component
export interface OnboardingFormData {
  jobTitle: string;
  ecsCardType: string;
  ecsCardExpiry: string;
  ecsCardNumber: string;
}

interface ElecIdOnboardingProps {
  onComplete: (data: OnboardingFormData) => void;
  onSkip?: () => void;
  elecIdNumber?: string; // Pass actual Elec-ID from parent
  needsRecovery?: boolean; // User opted in but doesn't have Elec-ID
  userId?: string; // For generating Elec-ID
  ecsCardType?: string; // Current ECS card type from profile
  onRecoveryComplete?: (elecIdNumber: string) => void; // Called after successful recovery
}

const STEPS = [
  {
    id: "welcome",
    title: "Welcome to Elec-ID",
    subtitle: "Your portable professional identity",
  },
  {
    id: "basics",
    title: "Basic Information",
    subtitle: "Tell us about yourself",
  },
  {
    id: "ecs",
    title: "ECS Card Details",
    subtitle: "Your industry credentials",
  },
  {
    id: "verify",
    title: "Verify Your Credentials",
    subtitle: "Upload documents to unlock benefits",
  },
  {
    id: "complete",
    title: "You're All Set!",
    subtitle: "Your Elec-ID is ready",
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Verified Credentials",
    description: "AI-powered verification of your qualifications",
  },
  {
    icon: Users,
    title: "Talent Pool Access",
    description: "Get discovered by top employers",
  },
  {
    icon: Zap,
    title: "Portable Identity",
    description: "Your credentials follow you, not your employer",
  },
];

const TIER_BENEFITS = [
  {
    tier: "basic",
    icon: Shield,
    label: "Basic",
    color: "text-foreground/70",
    bg: "bg-white/10",
    benefits: ["Profile creation", "Basic visibility"],
  },
  {
    tier: "verified",
    icon: CheckCircle2,
    label: "Verified",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    benefits: ["Verified badge", "Priority in search", "Employer notifications"],
  },
  {
    tier: "premium",
    icon: Crown,
    label: "Premium",
    color: "text-elec-yellow",
    bg: "bg-elec-yellow/20",
    benefits: ["Premium badge", "Top listing", "Direct employer access", "QR verification"],
  },
];

const ElecIdOnboarding = ({
  onComplete,
  onSkip,
  elecIdNumber,
  needsRecovery = false,
  userId,
  ecsCardType: initialEcsCardType,
  onRecoveryComplete
}: ElecIdOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    ecsCardType: "",
    ecsCardExpiry: "",
    ecsCardNumber: "",
  });

  // Recovery state
  const [isGenerating, setIsGenerating] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  // Handle Elec-ID generation for recovery
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
          ecs_card_type: initialEcsCardType || null
        }
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

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (step.id) {
      case "basics":
        return formData.jobTitle !== "";
      case "ecs":
        return formData.ecsCardType !== "" && formData.ecsCardExpiry !== "";
      default:
        return true;
    }
  };

  // Group job titles by category
  const jobTitlesByCategory = UK_JOB_TITLES.reduce((acc, title) => {
    if (!acc[title.category]) acc[title.category] = [];
    acc[title.category].push(title);
    return acc;
  }, {} as Record<string, typeof UK_JOB_TITLES>);

  const renderStep = () => {
    switch (step.id) {
      case "welcome":
        return (
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Hero Icon */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center">
              <IdCard className="h-8 w-8 sm:h-12 sm:w-12 text-elec-dark" />
            </div>

            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                Your Digital Professional Identity
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 max-w-md mx-auto px-2">
                Own and control your professional credentials. Share verified qualifications with employers instantly.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3 max-w-sm mx-auto">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-white/5 border border-white/10 text-left"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
                    <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-xs sm:text-sm">
                      {benefit.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-foreground/70 truncate">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "basics":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-foreground/70">
                This helps employers understand your role and expertise.
              </p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="space-y-2">
                <Label className="text-foreground">Job Title</Label>
                <Select
                  value={formData.jobTitle}
                  onValueChange={(value) =>
                    setFormData({ ...formData, jobTitle: value })
                  }
                >
                  <SelectTrigger className="bg-white/5 border-white/20 h-12">
                    <SelectValue placeholder="Select your job title" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/20 max-h-60">
                    {Object.entries(jobTitlesByCategory).map(
                      ([category, titles]) => (
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
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case "ecs":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-foreground/70">
                Your ECS card proves your competence to work in the electrical industry.
              </p>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="space-y-2">
                <Label className="text-foreground">ECS Card Type</Label>
                <Select
                  value={formData.ecsCardType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, ecsCardType: value })
                  }
                >
                  <SelectTrigger className="bg-white/5 border-white/20 h-12">
                    <SelectValue placeholder="Select card type" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/20">
                    {ECS_CARD_TYPES.map((card) => (
                      <SelectItem key={card.value} value={card.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: card.color }}
                          />
                          {card.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Card Expiry Date</Label>
                <Input
                  type="date"
                  value={formData.ecsCardExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, ecsCardExpiry: e.target.value })
                  }
                  className="bg-white/5 border-white/20 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">
                  Card Number <span className="text-foreground/70">(optional)</span>
                </Label>
                <Input
                  value={formData.ecsCardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, ecsCardNumber: e.target.value })
                  }
                  placeholder="Enter card number"
                  className="bg-white/5 border-white/20 h-12"
                />
              </div>
            </div>
          </div>
        );

      case "verify":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-foreground/70 px-2">
                You can verify your credentials later to unlock extra features.
              </p>
            </div>

            {/* Simple verification info */}
            <div className="max-w-sm mx-auto space-y-3">
              <div className="p-4 rounded-xl border border-elec-yellow/30 bg-elec-yellow/10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Your Elec-ID is ready!</p>
                    <p className="text-xs text-foreground/70">Basic profile created</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <p className="text-sm text-foreground/70 mb-2">Optional next steps:</p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Upload your ECS/CSCS card for verification</li>
                  <li>• Add qualifications & training</li>
                  <li>• Build your work history</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Success animation */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 sm:h-12 sm:w-12 text-green-400" />
            </div>

            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                Your Elec-ID is Ready!
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 max-w-md mx-auto px-2">
                You're now part of the UK's digital electrician verification network.
              </p>
            </div>

            {/* Generated Elec-ID */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-elec-yellow/30">
              <IdCard className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-foreground/70">Your Elec-ID</p>
                <p className="font-mono font-bold text-base sm:text-xl text-foreground">
                  {elecIdNumber || 'Generating...'}
                </p>
              </div>
            </div>

            {/* Next steps */}
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2 max-w-xs mx-auto text-left px-2">
              <p className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1">Next steps:</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow flex-shrink-0" />
                <span>Upload your ECS card for verification</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow flex-shrink-0" />
                <span>Add your qualifications</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground/70">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow flex-shrink-0" />
                <span>Enable Talent Pool to get discovered</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show recovery UI if user opted in but doesn't have Elec-ID
  if (needsRecovery && !generatedId) {
    return (
      <div className="min-h-[300px] sm:min-h-[350px] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-elec-yellow/20 flex items-center justify-center mb-4 sm:mb-6">
          <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          Your Elec-ID Wasn't Created
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 max-w-sm mx-auto mb-6">
          It looks like you opted for an Elec-ID during signup but it wasn't generated.
          This can happen if you confirmed your email on a different device.
        </p>

        {recoveryError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 mb-4 max-w-sm">
            <p className="text-sm text-red-400">{recoveryError}</p>
          </div>
        )}

        <Button
          onClick={handleGenerateElecId}
          disabled={isGenerating}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base touch-manipulation active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Generate My Elec-ID Now
            </>
          )}
        </Button>

        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-4 text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    );
  }

  // Show success after recovery
  if (generatedId) {
    return (
      <div className="min-h-[300px] sm:min-h-[350px] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4 sm:mb-6">
          <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          Your Elec-ID is Ready!
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 max-w-sm mx-auto mb-4">
          Your digital credential has been created successfully.
        </p>

        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-elec-yellow/30 mb-6">
          <IdCard className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs text-foreground/70">Your Elec-ID</p>
            <p className="font-mono font-bold text-base sm:text-xl text-foreground">
              {generatedId}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onComplete(formData)}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base touch-manipulation active:scale-[0.98]"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Go to My Elec-ID
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[550px] flex flex-col">
      {/* Progress bar */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm text-foreground/70">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          {onSkip && currentStep < STEPS.length - 1 && (
            <button
              onClick={onSkip}
              className="text-xs md:text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Skip setup
            </button>
          )}
        </div>
        <Progress value={progress} className="h-1.5 md:h-2" />
      </div>

      {/* Step header */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{step.title}</h1>
        <p className="text-xs sm:text-sm md:text-base text-foreground/70">{step.subtitle}</p>
      </div>

      {/* Step content */}
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

      {/* Navigation - sticky on mobile */}
      <div className="flex gap-3 mt-6 sm:mt-8 md:mt-10 sticky bottom-0 bg-background pt-3 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <Button
            variant="outline"
            className="h-12 md:h-14 px-4 md:px-5 border-white/20 touch-manipulation active:scale-[0.97]"
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        <Button
          className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold h-12 md:h-14 text-sm sm:text-base md:text-lg touch-manipulation active:scale-[0.98]"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === STEPS.length - 1 ? (
            <>
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Go to My Elec-ID
            </>
          ) : currentStep === 0 ? (
            <>
              Get Started
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 ml-1" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ElecIdOnboarding;
