import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  Sparkles,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  useCreatePreUseCheck,
  type CheckItem,
} from "@/hooks/usePreUseChecks";

interface ChecklistFormProps {
  equipmentType: string;
  items: CheckItem[];
  onSubmit: () => void;
  onCancel: () => void;
}

type CheckResult = "pass" | "fail" | "na";

export function ChecklistForm({
  equipmentType,
  items: initialItems,
  onSubmit,
  onCancel,
}: ChecklistFormProps) {
  const [items, setItems] = useState<CheckItem[]>(initialItems);
  const [equipmentDescription, setEquipmentDescription] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const createCheck = useCreatePreUseCheck();

  const updateItemResult = (id: string, result: CheckResult) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, result } : item))
    );
  };

  const handleAllPass = () => {
    setItems((prev) => prev.map((item) => ({ ...item, result: "pass" as const })));
  };

  const computeOverallResult = (): CheckResult => {
    if (items.some((i) => i.result === "fail")) return "fail";
    if (items.every((i) => i.result === "pass" || i.result === "na"))
      return "pass";
    return "na";
  };

  const allAnswered = items.every((i) => i.result !== "na" || items.every((j) => j.result === "na") === false);
  const hasAtLeastOneResult = items.some((i) => i.result === "pass" || i.result === "fail");

  const handleSubmit = async () => {
    await createCheck.mutateAsync({
      equipment_type: equipmentType,
      equipment_description: equipmentDescription || undefined,
      site_address: siteAddress || undefined,
      items,
      overall_result: computeOverallResult(),
    });
    onSubmit();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onCancel}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-lg font-semibold text-white capitalize">
          {equipmentType.replace(/_/g, " ")} Check
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        {/* All Pass Shortcut */}
        <button
          onClick={handleAllPass}
          className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 font-semibold text-sm touch-manipulation active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-4 h-4" />
          All Pass
        </button>

        {/* Optional Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Equipment Description (optional)
            </label>
            <Input
              value={equipmentDescription}
              onChange={(e) => setEquipmentDescription(e.target.value)}
              placeholder="e.g. Fluke 1664 FC, serial #12345"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Site Address (optional)
            </label>
            <Input
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              placeholder="e.g. 14 King Street, London"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white">
            Inspection Items
          </h3>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="flex-1 text-sm text-white">{item.label}</span>
              <div className="flex items-center gap-1">
                {/* Pass */}
                <button
                  onClick={() => updateItemResult(item.id, "pass")}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === "pass"
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-white/5 border border-white/10"
                  }`}
                  aria-label={`Mark ${item.label} as pass`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      item.result === "pass"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  />
                </button>
                {/* Fail */}
                <button
                  onClick={() => updateItemResult(item.id, "fail")}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === "fail"
                      ? "bg-red-500/20 border border-red-500/50"
                      : "bg-white/5 border border-white/10"
                  }`}
                  aria-label={`Mark ${item.label} as fail`}
                >
                  <XCircle
                    className={`w-5 h-5 ${
                      item.result === "fail"
                        ? "text-red-400"
                        : "text-white"
                    }`}
                  />
                </button>
                {/* N/A */}
                <button
                  onClick={() => updateItemResult(item.id, "na")}
                  className={`h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:scale-90 transition-all ${
                    item.result === "na"
                      ? "bg-white/15 border border-white/30"
                      : "bg-white/5 border border-white/10"
                  }`}
                  aria-label={`Mark ${item.label} as not applicable`}
                >
                  <MinusCircle
                    className={`w-5 h-5 ${
                      item.result === "na"
                        ? "text-white"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spacer for fixed footer */}
        <div className="pb-20" />
      </div>

      {/* Fixed footer */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          onClick={handleSubmit}
          disabled={!hasAtLeastOneResult || createCheck.isPending}
          className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-base touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {createCheck.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Submit Check"
          )}
        </button>
      </div>
    </div>
  );
}

export default ChecklistForm;
