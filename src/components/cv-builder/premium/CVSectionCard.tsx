/**
 * CVSectionCard - Collapsible section card for CV editing
 * Expandable with AI assist button and completion indicator
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Check,
  Sparkles,
  GripVertical,
  AlertCircle,
} from "lucide-react";
import { cardExpandVariants, cardPressVariants } from "./animations/variants";
import { MiniProgressRing } from "./CVProgressRing";

interface CVSectionCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  completionCount?: number;
  totalCount?: number;
  progress?: number;
  isRequired?: boolean;
  defaultExpanded?: boolean;
  onAIAssist?: () => void;
  isAILoading?: boolean;
  children: React.ReactNode;
  className?: string;
  dragHandleProps?: object;
}

const CVSectionCard = ({
  title,
  description,
  icon,
  isCompleted = false,
  completionCount,
  totalCount,
  progress,
  isRequired = false,
  defaultExpanded = false,
  onAIAssist,
  isAILoading = false,
  children,
  className,
  dragHandleProps,
}: CVSectionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Calculate display values
  const hasCount = completionCount !== undefined && totalCount !== undefined;
  const displayProgress = progress ?? (hasCount ? (completionCount / totalCount) * 100 : 0);
  const showComplete = isCompleted || displayProgress >= 100;

  return (
    <motion.div
      variants={cardPressVariants}
      whileTap={isExpanded ? undefined : "tap"}
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-300",
        showComplete
          ? "border-emerald-500/30 bg-emerald-500/5"
          : isExpanded
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-white/10 bg-white/[0.03] hover:border-white/20",
        className
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {/* Drag Handle */}
        {dragHandleProps && (
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing p-1 -ml-2 touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4 text-white/30" />
          </div>
        )}

        {/* Icon with status */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              showComplete
                ? "bg-emerald-500/20"
                : isExpanded
                ? "bg-blue-500/20"
                : "bg-white/10"
            )}
          >
            <div
              className={cn(
                showComplete
                  ? "text-emerald-400"
                  : isExpanded
                  ? "text-blue-400"
                  : "text-white/60"
              )}
            >
              {icon}
            </div>
          </div>
          {showComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <Check className="h-3 w-3 text-black" />
            </motion.div>
          )}
        </div>

        {/* Title & Description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">{title}</h3>
            {isRequired && !showComplete && (
              <Badge className="bg-amber-500/20 border-amber-500/30 text-amber-300 text-[8px] px-1.5">
                Required
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-white/50 truncate">{description}</p>
          )}
        </div>

        {/* Progress/Count */}
        <div className="flex items-center gap-3">
          {hasCount && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">
                {completionCount}/{totalCount}
              </span>
              <MiniProgressRing progress={displayProgress} size={24} />
            </div>
          )}

          {/* AI Assist Button */}
          {onAIAssist && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onAIAssist();
              }}
              disabled={isAILoading}
              className={cn(
                "h-8 w-8 rounded-lg",
                isAILoading
                  ? "bg-purple-500/20"
                  : "bg-white/5 hover:bg-purple-500/20"
              )}
            >
              <Sparkles
                className={cn(
                  "h-4 w-4",
                  isAILoading ? "text-purple-400 animate-pulse" : "text-purple-400"
                )}
              />
            </Button>
          )}

          {/* Expand Arrow */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            variants={cardExpandVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Entry card for experience/education items
interface CVEntryCardProps {
  title: string;
  subtitle: string;
  date?: string;
  isCurrent?: boolean;
  isValid?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const CVEntryCard = ({
  title,
  subtitle,
  date,
  isCurrent = false,
  isValid = true,
  onEdit,
  onDelete,
  className,
}: CVEntryCardProps) => (
  <div
    className={cn(
      "p-3 rounded-xl border transition-all",
      isValid
        ? "border-white/10 bg-white/[0.02] hover:border-white/20"
        : "border-amber-500/30 bg-amber-500/5",
      className
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate">{title}</h4>
        <p className="text-sm text-white/60 truncate">{subtitle}</p>
        {date && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-white/40">{date}</span>
            {isCurrent && (
              <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300 text-[8px] px-1.5">
                Current
              </Badge>
            )}
          </div>
        )}
      </div>

      {!isValid && (
        <div className="flex-shrink-0">
          <AlertCircle className="h-4 w-4 text-amber-400" />
        </div>
      )}

      <div className="flex gap-1">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-7 px-2 text-xs text-white/60 hover:text-white"
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-7 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  </div>
);

// Add button for sections
interface CVAddButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export const CVAddButton = ({ label, onClick, className }: CVAddButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full py-3 px-4 rounded-xl border-2 border-dashed",
      "border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5",
      "text-white/50 hover:text-blue-400",
      "transition-all duration-200",
      "flex items-center justify-center gap-2",
      className
    )}
  >
    <span className="text-lg">+</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default CVSectionCard;
