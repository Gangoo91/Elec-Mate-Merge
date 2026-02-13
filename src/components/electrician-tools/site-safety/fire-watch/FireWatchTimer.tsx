import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Flame,
  Play,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SafetyEmptyState } from "../common/SafetyEmptyState";
import { useHaptic } from '@/hooks/useHaptic';
import { useFireWatchRecords } from "@/hooks/useFireWatchRecords";
import { FireWatchHistory } from "./FireWatchHistory";

interface FireWatchTimerProps {
  onBack: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: "fw1",
    label: "Area clear of combustible materials",
    checked: false,
  },
  {
    id: "fw2",
    label: "Fire extinguisher present and accessible",
    checked: false,
  },
  {
    id: "fw3",
    label: "Combustible materials removed or protected",
    checked: false,
  },
  {
    id: "fw4",
    label: "Smoke detector not isolated",
    checked: false,
  },
  {
    id: "fw5",
    label: "Fire exit routes clear and unobstructed",
    checked: false,
  },
];

type TabKey = "timer" | "history";

const FIRE_WATCH_DURATION_MINS = 60;
const FIRE_WATCH_DURATION_SECS = FIRE_WATCH_DURATION_MINS * 60;

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function FireWatchTimer({ onBack }: FireWatchTimerProps) {
  const haptic = useHaptic();
  const [activeTab, setActiveTab] = useState<TabKey>("timer");
  const { data: historyRecords = [], isLoading: historyLoading, refetch: refetchHistory } = useFireWatchRecords();
  const [isActive, setIsActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  const [isSaving, setIsSaving] = useState(false);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { toast } = useToast();

  const remainingSeconds = Math.max(
    FIRE_WATCH_DURATION_SECS - elapsedSeconds,
    0
  );
  const progress = Math.min(elapsedSeconds / FIRE_WATCH_DURATION_SECS, 1);
  const allChecked = checklist.every((item) => item.checked);
  const timerComplete = elapsedSeconds >= FIRE_WATCH_DURATION_SECS;
  const canComplete = allChecked && timerComplete;

  // Timer tick
  useEffect(() => {
    if (isActive && !timerComplete) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timerComplete]);

  const handleStart = () => {
    haptic.medium();
    setIsActive(true);
    setStartedAt(new Date());
    setElapsedSeconds(0);
    setChecklist(DEFAULT_CHECKLIST);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleComplete = useCallback(async () => {
    if (!canComplete || !startedAt) return;
    setIsSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("fire_watch_records")
        .insert({
          user_id: user.id,
          start_time: startedAt.toISOString(),
          end_time: new Date().toISOString(),
          duration_minutes: FIRE_WATCH_DURATION_MINS,
          checklist: checklist.map((c) => ({
            id: c.id,
            label: c.label,
            checked: c.checked,
          })),
          status: "completed",
        });

      if (error) throw error;

      haptic.success();
      toast({
        title: "Fire Watch Complete",
        description: "Fire watch record has been saved successfully.",
      });

      refetchHistory();
      setIsActive(false);
      setElapsedSeconds(0);
      setStartedAt(null);
      setChecklist(DEFAULT_CHECKLIST);
    } catch {
      haptic.error();
      toast({
        title: "Error",
        description: "Could not save fire watch record.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [canComplete, startedAt, checklist, toast, haptic, refetchHistory]);

  // Circular progress calculations
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

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
          <h1 className="text-lg font-semibold text-white">Fire Watch</h1>
          <p className="text-sm text-white">
            Post hot-works fire watch timer
          </p>
        </div>
        <Flame className="w-5 h-5 text-orange-400" />
      </div>

      {/* Tab Bar */}
      <div className="flex px-4 pt-3 gap-2">
        {([
          { key: "timer" as TabKey, label: "Timer" },
          { key: "history" as TabKey, label: "History" },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`h-11 flex-1 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all ${
              activeTab === tab.key
                ? "bg-elec-yellow text-black"
                : "bg-white/5 text-white border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {activeTab === "timer" ? (
            <motion.div
              key="timer-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {!isActive ? (
                  <motion.div
                    key="inactive"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pt-6"
                  >
                    {/* Info Card */}
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-semibold text-white mb-1">
                            When is a fire watch required?
                          </h3>
                          <p className="text-sm text-white leading-relaxed">
                            A fire watch must be maintained for a minimum of 60
                            minutes after completion of hot works such as soldering,
                            brazing, welding, grinding, or using blow torches. The
                            watch person must remain in the area and check for signs
                            of smouldering or fire.
                          </p>
                        </div>
                      </div>
                    </div>

                    <SafetyEmptyState
                      icon={Flame}
                      heading="No Active Fire Watch"
                      description="Start a fire watch after completing hot works. The timer will run for 60 minutes whilst you monitor the area."
                      ctaLabel="Start Fire Watch"
                      onCta={handleStart}
                      tip="Required by most site safety policies"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pt-6"
                  >
                    {/* Circular Timer */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-52 h-52">
                        <svg
                          className="w-full h-full -rotate-90"
                          viewBox="0 0 200 200"
                        >
                          {/* Background circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="8"
                          />
                          {/* Progress circle */}
                          <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke={timerComplete ? "#22c55e" : "#f59e0b"}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-linear"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {timerComplete ? (
                            <>
                              <CheckCircle2 className="w-8 h-8 text-green-400 mb-1" />
                              <span className="text-sm font-semibold text-green-400">
                                Time Complete
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-3xl font-bold text-white font-mono">
                                {formatTime(remainingSeconds)}
                              </span>
                              <span className="text-sm text-white mt-1">
                                remaining
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Time Info */}
                    <div className="flex justify-center gap-6 mb-6">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Clock className="w-4 h-4 text-elec-yellow" />
                        Elapsed: {formatTime(elapsedSeconds)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Shield className="w-4 h-4 text-elec-yellow" />
                        {FIRE_WATCH_DURATION_MINS} min watch
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2 mb-6">
                      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        Fire Watch Checklist
                      </h3>
                      {checklist.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleChecklistItem(item.id)}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border touch-manipulation active:scale-[0.99] transition-all ${
                            item.checked
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              item.checked
                                ? "bg-green-500 border-green-500"
                                : "border-white/30 bg-transparent"
                            }`}
                          >
                            {item.checked && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <span className="text-sm text-white text-left flex-1">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Complete Button */}
                    <div className="pb-8">
                      <button
                        onClick={handleComplete}
                        disabled={!canComplete || isSaving}
                        className="w-full h-12 rounded-xl bg-green-500 text-white font-semibold text-base touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : !timerComplete ? (
                          <>
                            <Clock className="w-5 h-5" />
                            Waiting for Timer...
                          </>
                        ) : !allChecked ? (
                          <>
                            <AlertTriangle className="w-5 h-5" />
                            Complete All Checks
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Complete Fire Watch
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="px-4 pt-4"
            >
              <FireWatchHistory records={historyRecords} isLoading={historyLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FireWatchTimer;
