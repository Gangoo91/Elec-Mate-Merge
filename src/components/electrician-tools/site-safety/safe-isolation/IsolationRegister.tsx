import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  MapPin,
  ChevronRight,
  ChevronDown,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
} from "lucide-react";
import {
  useSafeIsolationRecords,
} from "@/hooks/useSafeIsolationRecords";
import type { SafeIsolationRecord } from "@/hooks/useSafeIsolationRecords";
import { SafetyEmptyState } from "../common/SafetyEmptyState";

// ─── Status Config ───

const STATUS_CONFIG: Record<
  SafeIsolationRecord["status"],
  {
    label: string;
    colour: string;
    bg: string;
    borderColour: string;
    dotColour: string;
    icon: React.ElementType;
  }
> = {
  in_progress: {
    label: "In Progress",
    colour: "text-amber-400",
    bg: "bg-amber-500/15",
    borderColour: "border-amber-500/20",
    dotColour: "bg-amber-400",
    icon: Clock,
  },
  isolated: {
    label: "Isolated",
    colour: "text-red-400",
    bg: "bg-red-500/15",
    borderColour: "border-red-500/20",
    dotColour: "bg-red-400",
    icon: Shield,
  },
  re_energised: {
    label: "Re-energised",
    colour: "text-green-400",
    bg: "bg-green-500/15",
    borderColour: "border-green-500/20",
    dotColour: "bg-green-400",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    colour: "text-white",
    bg: "bg-white/10",
    borderColour: "border-white/10",
    dotColour: "bg-white",
    icon: AlertTriangle,
  },
};

// ─── Animation Variants ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

// ─── Helpers ───

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// ─── Site Group ───

function SiteGroup({
  siteAddress,
  records,
  onSelectRecord,
}: {
  siteAddress: string;
  records: SafeIsolationRecord[];
  onSelectRecord: (record: SafeIsolationRecord) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  const isolatedCount = records.filter((r) => r.status === "isolated").length;
  const inProgressCount = records.filter(
    (r) => r.status === "in_progress"
  ).length;
  const activeCount = isolatedCount + inProgressCount;

  // Determine site-level indicator colour
  const siteColour =
    isolatedCount > 0
      ? "border-red-500/30 bg-red-500/[0.04]"
      : inProgressCount > 0
        ? "border-amber-500/30 bg-amber-500/[0.04]"
        : "border-green-500/30 bg-green-500/[0.04]";

  const siteDotColour =
    isolatedCount > 0
      ? "bg-red-400"
      : inProgressCount > 0
        ? "bg-amber-400"
        : "bg-green-400";

  return (
    <motion.div variants={itemVariants} className={`rounded-xl border ${siteColour}`}>
      {/* Site header — expandable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 touch-manipulation active:opacity-80"
      >
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${siteDotColour}`} />
            <h3 className="text-sm font-bold text-white truncate">
              {siteAddress}
            </h3>
          </div>
          <p className="text-xs text-white mt-0.5">
            {records.length} record{records.length !== 1 ? "s" : ""}
            {activeCount > 0 && (
              <span className="text-red-400 font-semibold">
                {" "}
                ({activeCount} active)
              </span>
            )}
          </p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
        </motion.div>
      </button>

      {/* Records */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1.5">
              {records.map((record) => {
                const statusConf = STATUS_CONFIG[record.status];
                const StatusIcon = statusConf.icon;

                return (
                  <motion.button
                    key={record.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectRecord(record)}
                    className="w-full text-left rounded-lg border border-white/[0.06] bg-white/[0.02] active:bg-white/[0.05] p-3 touch-manipulation transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-full min-h-[32px] rounded-full ${statusConf.dotColour} flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-bold text-white truncate">
                          {record.circuit_description}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            className={`${statusConf.bg} ${statusConf.colour} border-none text-[10px]`}
                          >
                            <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                            {statusConf.label}
                          </Badge>
                          <span className="text-[10px] text-white">
                            {formatRelativeDate(record.created_at)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───

export function IsolationRegister() {
  const { data: records, isLoading } = useSafeIsolationRecords();
  const [selectedRecord, setSelectedRecord] =
    useState<SafeIsolationRecord | null>(null);

  // Group records by site address
  const groupedRecords = useMemo(() => {
    if (!records) return new Map<string, SafeIsolationRecord[]>();

    const map = new Map<string, SafeIsolationRecord[]>();
    for (const record of records) {
      const key = record.site_address;
      const existing = map.get(key) ?? [];
      existing.push(record);
      map.set(key, existing);
    }

    // Sort sites: those with isolated records first, then in_progress, then others
    const sorted = new Map(
      [...map.entries()].sort(([, a], [, b]) => {
        const aIsolated = a.some((r) => r.status === "isolated");
        const bIsolated = b.some((r) => r.status === "isolated");
        if (aIsolated && !bIsolated) return -1;
        if (!aIsolated && bIsolated) return 1;

        const aActive = a.some((r) => r.status === "in_progress");
        const bActive = b.some((r) => r.status === "in_progress");
        if (aActive && !bActive) return -1;
        if (!aActive && bActive) return 1;

        return 0;
      })
    );

    return sorted;
  }, [records]);

  // Summary stats
  const totalIsolated =
    records?.filter((r) => r.status === "isolated").length ?? 0;
  const totalInProgress =
    records?.filter((r) => r.status === "in_progress").length ?? 0;
  const totalReEnergised =
    records?.filter((r) => r.status === "re_energised").length ?? 0;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-white/[0.05] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <SafetyEmptyState
        icon={Zap}
        heading="No Isolation Records"
        description="Create your first safe isolation record to see it appear in the register."
      />
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Summary stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-3 gap-2"
      >
        <div className="p-3 rounded-xl border border-red-500/15 bg-gradient-to-br from-red-500/10 to-red-600/10 text-center">
          <span className="text-lg font-bold text-red-400 block">
            {totalIsolated}
          </span>
          <span className="text-[10px] text-white font-medium">Isolated</span>
        </div>
        <div className="p-3 rounded-xl border border-amber-500/15 bg-gradient-to-br from-amber-500/10 to-amber-600/10 text-center">
          <span className="text-lg font-bold text-amber-400 block">
            {totalInProgress}
          </span>
          <span className="text-[10px] text-white font-medium">
            In Progress
          </span>
        </div>
        <div className="p-3 rounded-xl border border-green-500/15 bg-gradient-to-br from-green-500/10 to-green-600/10 text-center">
          <span className="text-lg font-bold text-green-400 block">
            {totalReEnergised}
          </span>
          <span className="text-[10px] text-white font-medium">
            Re-energised
          </span>
        </div>
      </motion.div>

      {/* Site groups */}
      <div className="space-y-3 pb-20">
        {[...groupedRecords.entries()].map(([siteAddress, siteRecords]) => (
          <SiteGroup
            key={siteAddress}
            siteAddress={siteAddress}
            records={siteRecords}
            onSelectRecord={setSelectedRecord}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default IsolationRegister;
