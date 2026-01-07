/**
 * CVBuilderHero - Premium hero section with progress ring
 * Shows completion status, step indicators, and quick actions
 */

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FileText,
  Sparkles,
  Download,
  Eye,
  Wand2,
  Check,
  ChevronRight,
} from "lucide-react";
import CVProgressRing from "./CVProgressRing";
import { heroCardVariants, stepIndicatorVariants } from "./animations/variants";

interface CVBuilderHeroProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  hasDraft?: boolean;
  onPreview?: () => void;
  onDownload?: () => void;
  onContinue?: () => void;
  className?: string;
}

const CVBuilderHero = ({
  progress,
  currentStep,
  totalSteps,
  steps,
  hasDraft = false,
  onPreview,
  onDownload,
  onContinue,
  className,
}: CVBuilderHeroProps) => {
  const isComplete = progress >= 100;

  return (
    <motion.div
      variants={heroCardVariants}
      initial="initial"
      animate="animate"
      className={cn("space-y-4", className)}
    >
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 via-background to-background border border-blue-500/20">
        {/* Animated gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse" />

        {/* Decorative gradient blobs */}
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8">
          {/* Header row */}
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Progress Ring */}
            <CVProgressRing
              progress={progress}
              size={100}
              strokeWidth={6}
              className="flex-shrink-0"
            >
              <span className="text-[10px] text-white/50">of CV</span>
            </CVProgressRing>

            {/* Title & Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Smart{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    CV Builder
                  </span>
                </h1>
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300 text-[10px]">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
              </div>

              <p className="text-sm text-white/60 mb-4">
                {isComplete
                  ? "Your professional CV is ready!"
                  : hasDraft
                  ? "Continue where you left off"
                  : "Create a professional electrician CV in minutes"}
              </p>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-white/60">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-white/60">
                    {steps.filter((s) => s.completed).length} completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 -mx-2 px-2">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={stepIndicatorVariants}
                initial="inactive"
                animate={
                  step.completed
                    ? "completed"
                    : index === currentStep - 1
                    ? "active"
                    : "inactive"
                }
                className={cn(
                  "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all",
                  step.completed
                    ? "bg-emerald-500/20 border-emerald-500/30"
                    : index === currentStep - 1
                    ? "bg-blue-500/20 border-blue-500/30"
                    : "bg-white/5 border-white/10"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium",
                    step.completed
                      ? "bg-emerald-500 text-black"
                      : index === currentStep - 1
                      ? "bg-blue-500 text-black"
                      : "bg-white/10 text-white/50"
                  )}
                >
                  {step.completed ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    step.completed
                      ? "text-emerald-300"
                      : index === currentStep - 1
                      ? "text-blue-300"
                      : "text-white/50"
                  )}
                >
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {isComplete ? (
              <>
                {onPreview && (
                  <Button
                    onClick={onPreview}
                    className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:from-blue-400 hover:to-cyan-400 gap-2 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                    Preview CV
                  </Button>
                )}
                {onDownload && (
                  <Button
                    onClick={onDownload}
                    variant="outline"
                    className="flex-1 sm:flex-none h-11 border-white/20 text-white hover:text-white hover:bg-white/10 gap-2 font-semibold rounded-xl backdrop-blur-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </>
            ) : (
              <>
                {hasDraft && onContinue && (
                  <Button
                    onClick={onContinue}
                    className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:from-blue-400 hover:to-cyan-400 gap-2 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
                  >
                    <ChevronRight className="h-4 w-4" />
                    Continue Building
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none h-11 border-white/20 text-white hover:text-white hover:bg-white/10 gap-2 font-semibold rounded-xl backdrop-blur-sm"
                >
                  <Wand2 className="h-4 w-4" />
                  AI Assist
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Draft notification */}
      {hasDraft && !isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Draft Saved</p>
              <p className="text-xs text-white/50">
                Your progress has been saved. Continue anytime.
              </p>
            </div>
            <Badge className="bg-amber-500/20 border-amber-500/30 text-amber-300 text-xs">
              Auto-saved
            </Badge>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CVBuilderHero;
