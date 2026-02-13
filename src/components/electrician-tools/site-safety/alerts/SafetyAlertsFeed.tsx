import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSafetyAlerts, type SafetyAlert } from "@/hooks/useSafetyAlerts";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { SafetySkeletonLoader } from "../common/SafetySkeletonLoader";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";

interface SafetyAlertsFeedProps {
  onBack: () => void;
}

const SEVERITY_CONFIG: Record<
  string,
  { colour: string; bg: string; icon: React.ElementType }
> = {
  critical: {
    colour: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    icon: AlertTriangle,
  },
  high: {
    colour: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    icon: AlertTriangle,
  },
  medium: {
    colour: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    icon: Bell,
  },
  low: {
    colour: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: Shield,
  },
};

function AlertCard({ alert, index = 0 }: { alert: SafetyAlert; index?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.medium;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className={`rounded-xl border ${config.bg} overflow-hidden`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-start gap-3 touch-manipulation text-left active:scale-[0.98] transition-transform"
      >
        <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon className={`h-4 w-4 ${config.colour}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[13px] font-semibold text-white truncate">
              {alert.title}
            </h3>
            <Badge
              className={`${config.colour} bg-white/[0.06] border-none text-[9px] font-bold flex-shrink-0`}
            >
              {alert.severity.toUpperCase()}
            </Badge>
          </div>
          <p className="text-[11px] text-white line-clamp-2">{alert.summary}</p>
          <span className="text-[10px] text-white mt-1 block">
            {new Date(alert.date_published).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-white flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white flex-shrink-0 mt-1" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0">
              <div className="border-t border-white/[0.06] pt-3">
                <div
                  className="prose prose-invert prose-sm max-w-none text-white [&_p]:text-white [&_li]:text-white [&_h3]:text-white [&_h4]:text-white"
                  dangerouslySetInnerHTML={{ __html: alert.content }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SafetyAlertsFeed({ onBack }: SafetyAlertsFeedProps) {
  const { data: alerts, isLoading, refetch } = useSafetyAlerts();

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
        </div>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="px-4 space-y-4 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Safety Alerts</h2>
            <p className="text-sm text-white">
              Latest safety alerts and industry notices
            </p>
          </div>

          {isLoading ? (
            <SafetySkeletonLoader variant="list" />
          ) : !alerts || alerts.length === 0 ? (
            <SafetyEmptyState
              icon={Bell}
              heading="No Active Alerts"
              description="There are no safety alerts at the moment. Check back later for the latest industry notices."
            />
          ) : (
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} index={index} />
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>
    </motion.div>
  );
}

export default SafetyAlertsFeed;
