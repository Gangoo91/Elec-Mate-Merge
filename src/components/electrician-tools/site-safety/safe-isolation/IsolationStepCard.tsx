import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Camera } from "lucide-react";
import type { IsolationStep } from "@/hooks/useSafeIsolationRecords";

interface IsolationStepCardProps {
  step: IsolationStep;
  stepNumber: number;
  isActive: boolean;
  onComplete: () => void;
  onPhotoCapture?: () => void;
}

export function IsolationStepCard({
  step,
  stepNumber,
  isActive,
  onComplete,
  onPhotoCapture,
}: IsolationStepCardProps) {
  const isCompleted = step.completed;
  const isPending = !isCompleted && !isActive;

  // Determine card styling based on state
  const borderColour = isCompleted
    ? "border-green-500/30"
    : isActive
      ? "border-amber-500/40"
      : "border-white/[0.06]";

  const bgColour = isCompleted
    ? "bg-green-500/[0.06]"
    : isActive
      ? "bg-amber-500/[0.06]"
      : "bg-white/[0.02]";

  const numberBg = isCompleted
    ? "bg-green-500 text-white"
    : isActive
      ? "bg-amber-500 text-black"
      : "bg-white/[0.08] text-white";

  return (
    <motion.div
      layout
      className={`rounded-xl border ${borderColour} ${bgColour} p-4 transition-colors duration-200`}
      animate={
        isActive
          ? { scale: [1, 1.005, 1] }
          : {}
      }
      transition={
        isActive
          ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          : {}
      }
    >
      <div className="flex items-start gap-3">
        {/* Step number / check */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${numberBg}`}
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            stepNumber
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`text-sm font-bold ${
                isCompleted
                  ? "text-green-400"
                  : isActive
                    ? "text-amber-400"
                    : "text-white"
              }`}
            >
              {step.title}
            </h4>
            {isCompleted && step.completedAt && (
              <span className="text-[10px] text-white">
                {new Date(step.completedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            className={`text-xs leading-relaxed ${
              isPending ? "text-white" : "text-white"
            }`}
          >
            {step.description}
          </p>

          {/* Notes */}
          {step.notes && (
            <p className="text-xs text-white mt-1 italic">
              Note: {step.notes}
            </p>
          )}

          {/* Photo indicator */}
          {step.photoUrl && (
            <div className="flex items-center gap-1.5 mt-2">
              <Camera className="h-3 w-3 text-elec-yellow" />
              <span className="text-[10px] text-white">
                Photo attached
              </span>
            </div>
          )}

          {/* Actions */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mt-3"
            >
              <Button
                onClick={onComplete}
                className="h-11 flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl touch-manipulation active:scale-[0.97]"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Step
              </Button>

              {onPhotoCapture && (
                <Button
                  onClick={onPhotoCapture}
                  variant="outline"
                  className="h-11 w-11 p-0 border-white/20 rounded-xl touch-manipulation active:scale-[0.97]"
                >
                  <Camera className="h-4 w-4 text-white" />
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* Right side status indicator */}
        {isPending && (
          <Circle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
        )}
      </div>
    </motion.div>
  );
}

export default IsolationStepCard;
