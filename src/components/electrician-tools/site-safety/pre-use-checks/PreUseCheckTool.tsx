import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ClipboardCheck,
  ArrowUpFromLine,
  Hammer,
  Gauge,
  Construction,
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Loader2,
} from "lucide-react";
import {
  usePreUseChecks,
  CHECK_TEMPLATES,
  type CheckItem,
  type PreUseCheck,
} from "@/hooks/usePreUseChecks";
import { ChecklistForm } from "./ChecklistForm";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { SafetySkeletonLoader } from "../common/SafetySkeletonLoader";
import { useHaptic } from '@/hooks/useHaptic';
import { useSafetyPDFExport } from "@/hooks/useSafetyPDFExport";

interface PreUseCheckToolProps {
  onBack: () => void;
}

const CATEGORIES = [
  { key: "ladder", label: "Ladder", icon: ArrowUpFromLine },
  { key: "scaffold", label: "Scaffold", icon: Construction },
  { key: "power_tool", label: "Power Tool", icon: Hammer },
  { key: "test_instrument", label: "Test Instrument", icon: Gauge },
  { key: "access_equipment", label: "Access Equipment", icon: Wrench },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

function resultBadge(result: string) {
  if (result === "pass")
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
        Pass
      </Badge>
    );
  if (result === "fail")
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
        Fail
      </Badge>
    );
  return (
    <Badge className="bg-white/10 text-white border-white/20">N/A</Badge>
  );
}

export function PreUseCheckTool({ onBack }: PreUseCheckToolProps) {
  const haptic = useHaptic();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: checks = [], isLoading } = usePreUseChecks();

  const handleCategorySelect = (key: CategoryKey) => {
    setSelectedCategory(key);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  const handleFormSubmit = () => {
    haptic.success();
    setShowForm(false);
    setSelectedCategory(null);
  };

  const templateItems: CheckItem[] = selectedCategory
    ? CHECK_TEMPLATES[selectedCategory].map((t) => ({
        ...t,
        result: "na" as const,
      }))
    : [];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onBack}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">
            Pre-Use Equipment Checks
          </h1>
          <p className="text-sm text-white">
            Record inspections before use
          </p>
        </div>
        <ClipboardCheck className="w-5 h-5 text-elec-yellow" />
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {showForm && selectedCategory ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChecklistForm
                equipmentType={selectedCategory}
                items={templateItems}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category Selector */}
              <div className="px-4 pt-4 pb-2">
                <h2 className="text-sm font-semibold text-white mb-3">
                  Select Equipment Type
                </h2>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => handleCategorySelect(cat.key)}
                        className={`h-11 px-4 rounded-full flex items-center gap-2 text-sm font-medium touch-manipulation active:scale-95 transition-all border ${
                          isSelected
                            ? "bg-elec-yellow text-black border-elec-yellow"
                            : "bg-white/5 text-white border-white/10 active:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Checks */}
              <div className="px-4 pt-4">
                <h2 className="text-sm font-semibold text-white mb-3">
                  Recent Checks
                </h2>

                {isLoading ? (
                  <SafetySkeletonLoader variant="list" />
                ) : checks.length === 0 ? (
                  <SafetyEmptyState
                    icon={ClipboardCheck}
                    heading="No Checks Recorded"
                    description="Select an equipment type above to start your first pre-use inspection check."
                    tip="Pre-use checks help keep you safe on site"
                  />
                ) : (
                  <div className="space-y-3">
                    {checks.map((check: PreUseCheck) => (
                      <motion.div
                        key={check.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {check.overall_result === "pass" ? (
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : check.overall_result === "fail" ? (
                              <XCircle className="w-5 h-5 text-red-400" />
                            ) : (
                              <ClipboardCheck className="w-5 h-5 text-white" />
                            )}
                            <span className="text-sm font-semibold text-white capitalize">
                              {check.equipment_type.replace(/_/g, " ")}
                            </span>
                          </div>
                          {resultBadge(check.overall_result)}
                        </div>
                        {check.equipment_description && (
                          <p className="text-sm text-white mb-1">
                            {check.equipment_description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm text-white">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(check.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </div>
                            {check.site_address && (
                              <span className="truncate max-w-[180px]">
                                {check.site_address}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => exportPDF("pre-use-check", check.id)}
                            disabled={isExporting && exportingId === check.id}
                            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
                          >
                            {isExporting && exportingId === check.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                            Export PDF
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PreUseCheckTool;
