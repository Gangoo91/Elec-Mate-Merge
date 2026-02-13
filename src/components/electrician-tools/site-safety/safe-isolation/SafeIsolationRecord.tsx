import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFieldValidation } from "@/hooks/useFieldValidation";
import { ValidatedField } from "../common/ValidatedField";
import { useLocalDraft } from "@/hooks/useLocalDraft";
import { DraftRecoveryBanner } from "../common/DraftRecoveryBanner";
import { DraftSaveIndicator } from "../common/DraftSaveIndicator";
import {
  ArrowLeft,
  Plus,
  Zap,
  Shield,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import {
  useSafeIsolationRecords,
  useCreateIsolationRecord,
  useUpdateIsolationRecord,
} from "@/hooks/useSafeIsolationRecords";
import type {
  SafeIsolationRecord as SafeIsolationRecordType,
} from "@/hooks/useSafeIsolationRecords";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { IsolationStepCard } from "./IsolationStepCard";
import { IsolationSummary } from "./IsolationSummary";

// ─── Status Config ───

const STATUS_CONFIG: Record<
  SafeIsolationRecordType["status"],
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  in_progress: {
    label: "In Progress",
    colour: "text-amber-400",
    bg: "bg-amber-500/15",
    icon: Clock,
  },
  isolated: {
    label: "Isolated",
    colour: "text-red-400",
    bg: "bg-red-500/15",
    icon: Shield,
  },
  re_energised: {
    label: "Re-energised",
    colour: "text-green-400",
    bg: "bg-green-500/15",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    colour: "text-white",
    bg: "bg-white/10",
    icon: AlertTriangle,
  },
};

// ─── Animation Variants ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
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

// ─── New Record Form ───

function NewRecordForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  onSubmit: (data: {
    site_address: string;
    circuit_description: string;
    distribution_board?: string;
    voltage_detector_serial?: string;
    voltage_detector_calibration_date?: string;
  }) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const validation = useFieldValidation({
    site_address: { required: true, message: "Site address is required" },
    circuit_description: {
      required: true,
      message: "Circuit description is required",
    },
    distribution_board: {},
    voltage_detector_serial: {},
    voltage_detector_calibration_date: {},
  });

  // Draft persistence
  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'safe-isolation',
    data: {
      site_address: validation.fields.site_address?.value ?? "",
      circuit_description: validation.fields.circuit_description?.value ?? "",
      distribution_board: validation.fields.distribution_board?.value ?? "",
      voltage_detector_serial: validation.fields.voltage_detector_serial?.value ?? "",
      voltage_detector_calibration_date: validation.fields.voltage_detector_calibration_date?.value ?? "",
    },
    enabled: true,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.site_address) validation.setValue("site_address", recoveredDraft.site_address);
    if (recoveredDraft.circuit_description) validation.setValue("circuit_description", recoveredDraft.circuit_description);
    if (recoveredDraft.distribution_board) validation.setValue("distribution_board", recoveredDraft.distribution_board);
    if (recoveredDraft.voltage_detector_serial) validation.setValue("voltage_detector_serial", recoveredDraft.voltage_detector_serial);
    if (recoveredDraft.voltage_detector_calibration_date) validation.setValue("voltage_detector_calibration_date", recoveredDraft.voltage_detector_calibration_date);
    dismissDraft();
  };

  const canSubmit = validation.isValid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => {
            clearDraft();
            onCancel();
          }}
          className="h-11 w-11 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white">New Isolation Record</h2>
          <DraftSaveIndicator status={draftStatus} />
        </div>
      </div>

      <AnimatePresence>
        {recoveredDraft && (
          <DraftRecoveryBanner
            onRestore={restoreDraft}
            onDismiss={dismissDraft}
          />
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <ValidatedField
          name="site_address"
          label="Site Address"
          required
          validation={validation}
          placeholder="e.g. 42 High Street, Manchester"
        />

        <ValidatedField
          name="circuit_description"
          label="Circuit Description"
          required
          validation={validation}
          placeholder="e.g. Ring final circuit — kitchen"
        />

        <ValidatedField
          name="distribution_board"
          label="Distribution Board"
          validation={validation}
          placeholder="e.g. DB1 — Main Board"
        />

        <ValidatedField
          name="voltage_detector_serial"
          label="Voltage Detector Serial No."
          validation={validation}
          placeholder="e.g. FLK-T150 / SN: 12345"
        />

        <ValidatedField
          name="voltage_detector_calibration_date"
          label="Voltage Detector Calibration Date"
          type="date"
          validation={validation}
        />
      </div>

      <div className="pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button
          onClick={() => {
            if (!validation.validateAll()) return;
            const payload: Parameters<typeof onSubmit>[0] = {
              site_address: validation.fields.site_address.value.trim(),
              circuit_description:
                validation.fields.circuit_description.value.trim(),
              ...(validation.fields.distribution_board.value.trim()
                ? {
                    distribution_board:
                      validation.fields.distribution_board.value.trim(),
                  }
                : {}),
              ...(validation.fields.voltage_detector_serial.value.trim()
                ? {
                    voltage_detector_serial:
                      validation.fields.voltage_detector_serial.value.trim(),
                  }
                : {}),
              ...(validation.fields.voltage_detector_calibration_date.value
                ? {
                    voltage_detector_calibration_date:
                      validation.fields.voltage_detector_calibration_date.value,
                  }
                : {}),
            };
            clearDraft();
            onSubmit(payload);
          }}
          disabled={!canSubmit || isSubmitting}
          className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Start GS38 Procedure"}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Step Workflow View ───

function StepWorkflow({
  record,
  onBack,
}: {
  record: SafeIsolationRecordType;
  onBack: () => void;
}) {
  const updateMutation = useUpdateIsolationRecord();
  const allCompleted = record.steps.every((s) => s.completed);

  const handleCompleteStep = async (stepNumber: number) => {
    const updatedSteps = record.steps.map((s) =>
      s.stepNumber === stepNumber
        ? { ...s, completed: true, completedAt: new Date().toISOString() }
        : s
    );

    const allDone = updatedSteps.every((s) => s.completed);

    await updateMutation.mutateAsync({
      id: record.id,
      steps: updatedSteps,
      ...(allDone
        ? {
            status: "isolated" as const,
            isolation_completed_at: new Date().toISOString(),
          }
        : {}),
    });
  };

  // Find the first incomplete step
  const activeStepNumber =
    record.steps.find((s) => !s.completed)?.stepNumber ?? -1;

  if (allCompleted || record.status === "isolated" || record.status === "re_energised") {
    return <IsolationSummary record={record} onBack={onBack} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={onBack}
          className="h-11 w-11 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-bold text-white truncate">
            {record.circuit_description}
          </h2>
          <p className="text-xs text-white">{record.site_address}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-elec-yellow rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${(record.steps.filter((s) => s.completed).length / record.steps.length) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-white">
        Step {record.steps.filter((s) => s.completed).length} of{" "}
        {record.steps.length} completed
      </p>

      <div className="space-y-2 pb-20">
        {record.steps.map((step) => (
          <motion.div key={step.stepNumber} variants={itemVariants}>
            <IsolationStepCard
              step={step}
              stepNumber={step.stepNumber}
              isActive={step.stepNumber === activeStepNumber}
              onComplete={() => handleCompleteStep(step.stepNumber)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───

interface SafeIsolationRecordProps {
  onBack: () => void;
}

export function SafeIsolationRecord({ onBack }: SafeIsolationRecordProps) {
  const { data: records, isLoading } = useSafeIsolationRecords();
  const createMutation = useCreateIsolationRecord();

  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<SafeIsolationRecordType | null>(null);

  // Keep selected record in sync with fresh data
  const activeRecord = selectedRecord
    ? records?.find((r) => r.id === selectedRecord.id) ?? selectedRecord
    : null;

  const handleCreate = async (data: Parameters<typeof createMutation.mutateAsync>[0]) => {
    const result = await createMutation.mutateAsync(data);
    setShowForm(false);
    setSelectedRecord(result);
  };

  // ─── Viewing a specific record ───
  if (activeRecord) {
    return (
      <div className="bg-background min-h-screen animate-fade-in">
        <div className="px-4 py-4">
          <StepWorkflow
            record={activeRecord}
            onBack={() => setSelectedRecord(null)}
          />
        </div>
      </div>
    );
  }

  // ─── Creating a new record ───
  if (showForm) {
    return (
      <div className="bg-background min-h-screen animate-fade-in">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
          <div className="px-4 py-2 flex items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Site Safety</span>
            </button>
          </div>
        </div>
        <div className="px-4 py-4">
          <NewRecordForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
            isSubmitting={createMutation.isPending}
          />
        </div>
      </div>
    );
  }

  // ─── List View ───

  const activeCount =
    records?.filter(
      (r) => r.status === "isolated" || r.status === "in_progress"
    ).length ?? 0;

  return (
    <div className="bg-background min-h-screen animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Site Safety</span>
          </button>
          {activeCount > 0 && (
            <Badge className="bg-red-500/15 text-red-400 border-red-500/20">
              {activeCount} Active
            </Badge>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <Zap className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Safe Isolation (GS38)
            </h1>
            <p className="text-sm text-white">
              Record and verify safe isolation procedures
            </p>
          </div>
        </div>

        {/* New Isolation Button */}
        <Button
          onClick={() => setShowForm(true)}
          className="w-full h-12 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Isolation
        </Button>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-white/[0.05] animate-pulse"
              />
            ))}
          </div>
        ) : !records || records.length === 0 ? (
          <SafetyEmptyState
            icon={Shield}
            heading="No Isolation Records"
            description="Start a GS38 safe isolation procedure to record your isolation steps, prove dead readings, and re-energisation."
            ctaLabel="New Isolation"
            onCta={() => setShowForm(true)}
            tip="GS38 compliance is a legal requirement for all electrical work"
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 pb-20"
          >
            {records.map((record) => {
              const statusConf = STATUS_CONFIG[record.status];
              const StatusIcon = statusConf.icon;
              const completedSteps = record.steps.filter(
                (s) => s.completed
              ).length;

              return (
                <motion.button
                  key={record.id}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRecord(record)}
                  className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.03] active:bg-white/[0.06] p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-red-500/20 to-amber-500/20 flex-shrink-0">
                      <Zap className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] font-bold text-white truncate">
                        {record.circuit_description}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-white">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{record.site_address}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={`${statusConf.bg} ${statusConf.colour} border-none text-[10px]`}
                        >
                          <StatusIcon className="h-2.5 w-2.5 mr-0.5" />
                          {statusConf.label}
                        </Badge>
                        {record.status === "in_progress" && (
                          <span className="text-[10px] text-white">
                            {completedSteps}/{record.steps.length} steps
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SafeIsolationRecord;
