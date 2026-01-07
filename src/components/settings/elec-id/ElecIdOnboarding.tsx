import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";
import { ECS_CARD_TYPES, UK_JOB_TITLES } from "@/data/uk-electrician-constants";

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
    color: "text-muted-foreground",
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

const ElecIdOnboarding = ({ onComplete, onSkip }: ElecIdOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    jobTitle: "",
    ecsCardType: "",
    ecsCardExpiry: "",
    ecsCardNumber: "",
  });

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
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-2">
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
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
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
              <p className="text-muted-foreground">
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
              <p className="text-muted-foreground">
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
                  Card Number <span className="text-muted-foreground">(optional)</span>
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
              <p className="text-sm sm:text-base text-muted-foreground px-2">
                Upload documents to verify your credentials and unlock higher tiers.
              </p>
            </div>

            {/* Tier progression */}
            <div className="space-y-2 sm:space-y-3 max-w-md mx-auto">
              {TIER_BENEFITS.map((tier, index) => (
                <div
                  key={tier.tier}
                  className={`p-3 sm:p-4 rounded-xl border ${
                    index === 0
                      ? "border-elec-yellow bg-elec-yellow/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${tier.bg} flex-shrink-0`}>
                      <tier.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${tier.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold text-sm sm:text-base ${tier.color}`}>
                          {tier.label}
                        </h4>
                        {index === 0 && (
                          <Badge className="bg-elec-yellow text-elec-dark text-[9px] sm:text-[10px] px-1.5 py-0">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                        {tier.benefits.slice(0, 3).map((benefit, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-xs text-muted-foreground"
                          >
                            {benefit}
                            {i < Math.min(tier.benefits.length, 3) - 1 && " •"}
                          </span>
                        ))}
                      </div>
                    </div>
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick upload prompt */}
            <div className="text-center pt-2 sm:pt-4">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 px-2">
                You can upload documents now or later from your Elec-ID settings.
              </p>
              <Button
                variant="outline"
                className="border-white/20 h-10 sm:h-11 text-sm"
                onClick={handleNext}
              >
                <Upload className="h-4 w-4 mr-2" />
                Skip for Now
              </Button>
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
              <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-2">
                You're now part of the UK's digital electrician verification network.
              </p>
            </div>

            {/* Generated Elec-ID */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-elec-yellow/30">
              <IdCard className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Your Elec-ID</p>
                <p className="font-mono font-bold text-base sm:text-xl text-foreground">
                  EM-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Next steps */}
            <div className="grid grid-cols-1 gap-1.5 sm:gap-2 max-w-xs mx-auto text-left px-2">
              <p className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1">Next steps:</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <FileCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow flex-shrink-0" />
                <span>Upload your ECS card for verification</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow flex-shrink-0" />
                <span>Add your qualifications</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
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

  return (
    <div className="min-h-[400px] sm:min-h-[500px] md:min-h-[550px] flex flex-col">
      {/* Progress bar */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          {onSkip && currentStep < STEPS.length - 1 && (
            <button
              onClick={onSkip}
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{step.subtitle}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">{renderStep()}</div>

      {/* Navigation - sticky on mobile */}
      <div className="flex gap-3 mt-6 sm:mt-8 md:mt-10 sticky bottom-0 bg-background pt-3 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <Button
            variant="outline"
            className="h-12 md:h-14 px-4 md:px-5 border-white/20"
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        <Button
          className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold h-12 md:h-14 text-sm sm:text-base md:text-lg"
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
