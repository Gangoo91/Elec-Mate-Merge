import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Power, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useUpdateIsolationRecord } from "@/hooks/useSafeIsolationRecords";
import { toast } from "sonner";

// ─── Checklist Items ───

const CHECKLIST_ITEMS = [
  {
    id: "work_complete",
    label: "All work is complete and tested",
  },
  {
    id: "tools_removed",
    label: "All tools and materials removed from work area",
  },
  {
    id: "covers_replaced",
    label: "All covers, guards, and barriers replaced",
  },
  {
    id: "lock_off_removed",
    label: "Lock-off device and warning notices removed",
  },
] as const;

// ─── Component ───

interface ReEnergisationSheetProps {
  recordId: string;
  open?: boolean;
  onComplete: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function ReEnergisationSheet({
  recordId,
  open,
  onComplete,
  onOpenChange,
}: ReEnergisationSheetProps) {
  const updateMutation = useUpdateIsolationRecord();

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    work_complete: false,
    tools_removed: false,
    covers_replaced: false,
    lock_off_removed: false,
  });
  const [name, setName] = useState("");

  const allChecked = CHECKLIST_ITEMS.every((item) => checklist[item.id]);
  const canConfirm = allChecked && name.trim().length > 0;

  const handleToggle = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirm = async () => {
    try {
      await updateMutation.mutateAsync({
        id: recordId,
        status: "re_energised",
        re_energisation_at: new Date().toISOString(),
        re_energisation_by: name.trim(),
      });
      toast.success("Circuit re-energised successfully");
      // Reset form
      setChecklist({
        work_complete: false,
        tools_removed: false,
        covers_replaced: false,
        lock_off_removed: false,
      });
      setName("");
      onComplete();
    } catch {
      toast.error("Failed to update record. Please try again.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 py-4 border-b border-white/10">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Power className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <SheetTitle className="text-base font-bold text-white">
                    Re-energise Circuit
                  </SheetTitle>
                  <SheetDescription className="text-sm text-white">
                    Complete all checks before restoring power
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5">
            {/* Warning banner */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-400">
                  Safety Warning
                </p>
                <p className="text-xs text-white mt-1 leading-relaxed">
                  Verify all personnel are clear of the circuit before
                  re-energising. Ensure all work has been completed and tested.
                </p>
              </div>
            </motion.div>

            {/* Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                Pre-energisation Checklist
              </h3>

              {CHECKLIST_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleToggle(item.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-colors ${
                    checklist[item.id]
                      ? "border-green-500/30 bg-green-500/[0.06]"
                      : "border-white/[0.08] bg-white/[0.03]"
                  }`}
                >
                  <Checkbox
                    checked={checklist[item.id]}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="pointer-events-none"
                  />
                  <span
                    className={`text-sm font-medium text-left ${
                      checklist[item.id] ? "text-green-400" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  {checklist[item.id] && (
                    <CheckCircle2 className="h-4 w-4 text-green-400 ml-auto flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Name / Signature */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                Re-energised By
              </h3>
              <div>
                <Label className="text-white text-sm">Full Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 mt-1"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Completion state */}
            {allChecked && name.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-green-500/20 bg-green-500/[0.06] p-3 flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <p className="text-xs text-green-400 font-medium">
                  All checks complete. Ready to re-energise.
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button
              onClick={handleConfirm}
              disabled={!canConfirm || updateMutation.isPending}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <Power className="h-5 w-5 mr-2" />
              {updateMutation.isPending
                ? "Updating..."
                : "Confirm Re-energisation"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ReEnergisationSheet;
