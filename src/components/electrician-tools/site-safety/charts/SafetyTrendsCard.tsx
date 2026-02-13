import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { NearMissSparkline } from "./NearMissSparkline";
import { InspectionPassRate } from "./InspectionPassRate";
import { SafetyActivityChart } from "./SafetyActivityChart";
import type { SafetyTrends } from "@/hooks/useSafetyTrends";

interface SafetyTrendsCardProps {
  trends: SafetyTrends;
}

const TABS = [
  { key: "near-miss", label: "Near Misses" },
  { key: "inspections", label: "Inspections" },
  { key: "activity", label: "Activity" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function SafetyTrendsCard({ trends }: SafetyTrendsCardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("near-miss");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.15 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white">Trends & Insights</h3>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-2 h-11 rounded-lg text-[11px] font-semibold transition-all touch-manipulation ${
                activeTab === tab.key
                  ? "bg-white/[0.08] text-white"
                  : "text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart content */}
        {activeTab === "near-miss" && (
          <NearMissSparkline data={trends.nearMissWeekly} />
        )}
        {activeTab === "inspections" && (
          <InspectionPassRate data={trends.inspectionResults} />
        )}
        {activeTab === "activity" && (
          <SafetyActivityChart data={trends.toolUsage} />
        )}
      </div>
    </motion.div>
  );
}

export default SafetyTrendsCard;
