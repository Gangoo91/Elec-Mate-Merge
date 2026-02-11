import { motion } from "framer-motion";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  AlertTriangle,
  FileText,
  Copy,
  Play,
  Eye,
  Share2,
  Download,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BriefingStatus = "scheduled" | "in_progress" | "completed" | "cancelled" | "draft";

interface BriefingTemplate {
  id: string;
  name: string;
  description?: string;
  hazardCount: number;
  usageCount: number;
  isAIPowered?: boolean;
  icon?: string;
}

interface BriefingHistory {
  id: string;
  name: string;
  location: string;
  date: string;
  time?: string;
  attendeeCount: number;
  status: BriefingStatus;
  signedCount?: number;
  icon?: string;
}

// Type icons mapping
const typeIcons: Record<string, string> = {
  "site-induction": "construction",
  "electrical": "zap",
  "toolbox-talk": "wrench",
  "hot-works": "flame",
  "height-work": "arrow-up",
  "custom": "settings",
};

// Status colors
const statusConfig: Record<BriefingStatus, { bg: string; text: string; border: string; label: string }> = {
  scheduled: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-400/20", label: "Scheduled" },
  in_progress: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-400/20", label: "In Progress" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-400/20", label: "Completed" },
  cancelled: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-400/20", label: "Cancelled" },
  draft: { bg: "bg-white/10", text: "text-white/60", border: "border-white/20", label: "Draft" },
};

// Template Card
interface TemplateCardProps {
  template: BriefingTemplate;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onStart?: () => void;
  index?: number;
}

export function TemplateCard({
  template,
  onEdit,
  onDuplicate,
  onStart,
  index = 0,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-[#1e1e1e] border border-white/10",
        "hover:border-elec-yellow/30 transition-all duration-300",
        "touch-manipulation active:scale-[0.995] transition-transform duration-150"
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
            <FileText className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{template.name}</h3>
              {template.isAIPowered && (
                <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 text-[10px] px-1.5 py-0">
                  <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                  AI
                </Badge>
              )}
            </div>
            {template.description && (
              <p className="text-sm text-white/50 line-clamp-1 mt-0.5">{template.description}</p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            <span>{template.hazardCount} hazards</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Used {template.usageCount} times</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="flex-1 h-11 text-yellow-400/80 hover:text-yellow-400 hover:bg-yellow-400/10 border border-yellow-400/20 touch-manipulation active:scale-[0.97] transition-all duration-150"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Edit
            </Button>
          )}
          {onDuplicate && (
            <Button
              variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
              className="flex-1 h-11 text-blue-400/80 hover:text-blue-400 hover:bg-blue-400/10 border border-blue-400/20 touch-manipulation active:scale-[0.97] transition-all duration-150"
            >
              <Copy className="h-4 w-4 mr-1.5" />
              Duplicate
            </Button>
          )}
          {onStart && (
            <Button
                            onClick={(e) => { e.stopPropagation(); onStart(); }}
              className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Play className="h-4 w-4 mr-1.5" />
              Start
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// History Card
interface HistoryCardProps {
  briefing: BriefingHistory;
  onView?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  index?: number;
}

export function HistoryCard({
  briefing,
  onView,
  onShare,
  onDownload,
  index = 0,
}: HistoryCardProps) {
  const status = statusConfig[briefing.status] || statusConfig.draft;
  const isComplete = briefing.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-[#1e1e1e] border",
        isComplete ? "border-emerald-500/20" : "border-white/10",
        "hover:border-elec-yellow/30 transition-all duration-300",
        "touch-manipulation active:scale-[0.995] transition-transform duration-150"
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className={cn(
            "p-2.5 rounded-xl border flex-shrink-0",
            isComplete
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-white/5 border-white/10"
          )}>
            {isComplete ? (
              <Check className="h-5 w-5 text-emerald-400" />
            ) : (
              <FileText className="h-5 w-5 text-white/50" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{briefing.name}</h3>
              <Badge className={cn(
                "border text-[10px] px-1.5 py-0",
                status.bg, status.text, status.border
              )}>
                {status.label}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/50 mt-0.5">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{briefing.location}</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{briefing.date}</span>
            {briefing.time && <span className="text-white/30">at {briefing.time}</span>}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>
              {briefing.signedCount !== undefined
                ? `${briefing.signedCount}/${briefing.attendeeCount} signed`
                : `${briefing.attendeeCount} attendees`
              }
            </span>
          </div>
        </div>

        {/* Signature progress bar */}
        {briefing.signedCount !== undefined && briefing.attendeeCount > 0 && (
          <div className="mb-4">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((briefing.signedCount || 0) / briefing.attendeeCount) * 100}%`,
                }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  briefing.signedCount === briefing.attendeeCount
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                )}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onView && (
            <Button
              variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onView(); }}
              className="flex-1 h-11 text-blue-400/80 hover:text-blue-400 hover:bg-blue-400/10 border border-blue-400/20 touch-manipulation active:scale-[0.97] transition-all duration-150"
            >
              <Eye className="h-4 w-4 mr-1.5" />
              View
            </Button>
          )}
          {onShare && (
            <Button
              variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onShare(); }}
              className="flex-1 h-11 text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-400/10 border border-emerald-400/20 touch-manipulation active:scale-[0.97] transition-all duration-150"
            >
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </Button>
          )}
          {onDownload && (
            <Button
              variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onDownload(); }}
              className="flex-1 h-11 text-purple-400/80 hover:text-purple-400 hover:bg-purple-400/10 border border-purple-400/20 touch-manipulation active:scale-[0.97] transition-all duration-150"
            >
              <Download className="h-4 w-4 mr-1.5" />
              PDF
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Pending Card (for briefings needing signatures)
interface PendingCardProps {
  briefing: BriefingHistory;
  onContinue?: () => void;
  index?: number;
}

export function PendingCard({
  briefing,
  onContinue,
  index = 0,
}: PendingCardProps) {
  const pendingCount = briefing.attendeeCount - (briefing.signedCount || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "bg-[#1e1e1e] border border-amber-500/20",
        "hover:border-elec-yellow/30 transition-all duration-300",
        "touch-manipulation active:scale-[0.995] transition-transform duration-150"
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
            <Clock className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{briefing.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-white/50 mt-0.5">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{briefing.location}</span>
            </div>
          </div>
          <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {pendingCount} pending
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-white/50">Signatures</span>
            <span className="text-white/70">
              {briefing.signedCount || 0} of {briefing.attendeeCount}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((briefing.signedCount || 0) / briefing.attendeeCount) * 100}%` }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-full bg-amber-400 rounded-full"
            />
          </div>
        </div>

        {/* CTA */}
        {onContinue && (
          <Button
            onClick={onContinue}
            className="w-full h-11 bg-emerald-500 text-black hover:bg-emerald-400 touch-manipulation active:scale-[0.97] transition-all duration-150"
          >
            <Play className="h-4 w-4 mr-1.5" />
            Continue Briefing
          </Button>
        )}
      </div>
    </motion.div>
  );
}
