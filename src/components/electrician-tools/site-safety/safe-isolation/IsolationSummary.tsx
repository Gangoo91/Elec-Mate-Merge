import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Zap,
  CheckCircle2,
  Circle,
  Shield,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  Power,
  User,
  ClipboardCheck,
  Download,
  Loader2,
} from "lucide-react";
import type { SafeIsolationRecord } from "@/hooks/useSafeIsolationRecords";
import { ReEnergisationSheet } from "./ReEnergisationSheet";
import { useSafetyPDFExport } from "@/hooks/useSafetyPDFExport";

// ─── Status Config ───

const STATUS_BADGES: Record<
  SafeIsolationRecord["status"],
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  in_progress: {
    label: "In Progress",
    colour: "text-amber-400",
    bg: "bg-amber-500/15 border-amber-500/20",
    icon: Clock,
  },
  isolated: {
    label: "Isolated — LIVE DANGER",
    colour: "text-red-400",
    bg: "bg-red-500/15 border-red-500/20",
    icon: Shield,
  },
  re_energised: {
    label: "Re-energised",
    colour: "text-green-400",
    bg: "bg-green-500/15 border-green-500/20",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    colour: "text-white",
    bg: "bg-white/10 border-white/10",
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

// ─── Component ───

interface IsolationSummaryProps {
  record: SafeIsolationRecord;
  onBack?: () => void;
}

export function IsolationSummary({ record, onBack }: IsolationSummaryProps) {
  const [showReEnergise, setShowReEnergise] = useState(false);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const statusConf = STATUS_BADGES[record.status];
  const StatusIcon = statusConf.icon;
  const completedCount = record.steps.filter((s) => s.completed).length;

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {/* Header */}
        {onBack && (
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className="h-11 w-11 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation active:scale-[0.95]"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white truncate">
                Isolation Summary
              </h2>
            </div>
          </div>
        )}

        {/* Status banner */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl border p-4 ${statusConf.bg}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                record.status === "isolated"
                  ? "bg-red-500/20"
                  : record.status === "re_energised"
                    ? "bg-green-500/20"
                    : "bg-amber-500/20"
              }`}
            >
              <StatusIcon className={`h-5 w-5 ${statusConf.colour}`} />
            </div>
            <div className="flex-1">
              <Badge
                className={`${statusConf.bg} ${statusConf.colour} border-none text-xs font-bold`}
              >
                {statusConf.label}
              </Badge>
              <p className="text-xs text-white mt-1">
                {completedCount} of {record.steps.length} steps completed
              </p>
            </div>
          </div>
        </motion.div>

        {/* Circuit details */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-3"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-elec-yellow" />
            Circuit Details
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-white flex-shrink-0" />
              <span className="text-white">{record.site_address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-white flex-shrink-0" />
              <span className="text-white">{record.circuit_description}</span>
            </div>
            {record.distribution_board && (
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-white">{record.distribution_board}</span>
              </div>
            )}
            {record.created_at && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-white">
                  Started:{" "}
                  {new Date(record.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Voltage detector info */}
        {(record.voltage_detector_serial ||
          record.voltage_detector_calibration_date) && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-2"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              Voltage Detector
            </h3>
            {record.voltage_detector_serial && (
              <p className="text-sm text-white">
                Serial: {record.voltage_detector_serial}
              </p>
            )}
            {record.voltage_detector_calibration_date && (
              <p className="text-sm text-white">
                Calibration:{" "}
                {new Date(
                  record.voltage_detector_calibration_date
                ).toLocaleDateString("en-GB")}
              </p>
            )}
          </motion.div>
        )}

        {/* Steps */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="text-sm font-bold text-white px-1">
            GS38 Steps
          </h3>
          {record.steps.map((step) => (
            <div
              key={step.stepNumber}
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                step.completed
                  ? "border-green-500/20 bg-green-500/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : "bg-white/[0.08] text-white"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  step.stepNumber
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-sm font-semibold ${
                    step.completed ? "text-green-400" : "text-white"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-white">{step.description}</p>
                {step.completedAt && (
                  <p className="text-[10px] text-white mt-1">
                    Completed:{" "}
                    {new Date(step.completedAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
              {!step.completed && (
                <Circle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Signatures */}
        {(record.isolator_name || record.verifier_name) && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3"
          >
            {record.isolator_name && (
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[10px] text-white mb-1 font-semibold">
                  ISOLATOR
                </p>
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-white" />
                  <p className="text-sm text-white font-medium">
                    {record.isolator_name}
                  </p>
                </div>
                {record.isolator_signature && (
                  <img
                    src={record.isolator_signature}
                    alt="Isolator signature"
                    className="h-12 mt-2 opacity-80"
                  />
                )}
              </div>
            )}
            {record.verifier_name && (
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-[10px] text-white mb-1 font-semibold">
                  VERIFIER
                </p>
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-white" />
                  <p className="text-sm text-white font-medium">
                    {record.verifier_name}
                  </p>
                </div>
                {record.verifier_signature && (
                  <img
                    src={record.verifier_signature}
                    alt="Verifier signature"
                    className="h-12 mt-2 opacity-80"
                  />
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Re-energisation info */}
        {record.status === "re_energised" && record.re_energisation_at && (
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-green-500/20 bg-green-500/[0.06] p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Power className="h-4 w-4 text-green-400" />
              <h3 className="text-sm font-bold text-green-400">
                Re-energised
              </h3>
            </div>
            <p className="text-sm text-white">
              By: {record.re_energisation_by ?? "Unknown"}
            </p>
            <p className="text-xs text-white mt-1">
              {new Date(record.re_energisation_at).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </motion.div>
        )}

        {/* Export PDF */}
        <motion.div variants={itemVariants}>
          <button
            onClick={() => exportPDF("safe-isolation", record.id)}
            disabled={isExporting && exportingId === record.id}
            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isExporting && exportingId === record.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Export PDF
          </button>
        </motion.div>

        {/* Re-energise button */}
        {record.status === "isolated" && (
          <motion.div
            variants={itemVariants}
            className="pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <Button
              onClick={() => setShowReEnergise(true)}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98]"
            >
              <Power className="h-5 w-5 mr-2" />
              Re-energise Circuit
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Re-energisation bottom sheet */}
      <ReEnergisationSheet
        recordId={record.id}
        open={showReEnergise}
        onComplete={() => setShowReEnergise(false)}
        onOpenChange={setShowReEnergise}
      />
    </>
  );
}

export default IsolationSummary;
