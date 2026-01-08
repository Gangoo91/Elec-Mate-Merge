import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  Plus,
  Trash2,
  Users,
  Clock,
  PoundSterling,
  ChevronDown,
  CheckCircle,
  GraduationCap,
  Award,
  Briefcase,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export interface Worker {
  id: string;
  role: string;
  hours: number;
  hourlyRate: number;
  skillLevel: 'apprentice-1st' | 'apprentice-2nd' | 'apprentice-3rd' | 'apprentice-4th' | 'qualified' | 'senior' | 'supervisor' | 'specialist';
}

interface RoleOption {
  value: Worker['skillLevel'];
  label: string;
  shortLabel: string;
  rate: number;
  icon: typeof Users;
  color: string;
}

const workerRoleOptions: RoleOption[] = [
  { value: "apprentice-1st", label: "1st Year Apprentice", shortLabel: "1st Yr", rate: 15, icon: GraduationCap, color: "blue" },
  { value: "apprentice-2nd", label: "2nd Year Apprentice", shortLabel: "2nd Yr", rate: 18, icon: GraduationCap, color: "blue" },
  { value: "apprentice-3rd", label: "3rd Year Apprentice", shortLabel: "3rd Yr", rate: 22, icon: GraduationCap, color: "blue" },
  { value: "apprentice-4th", label: "4th Year Apprentice", shortLabel: "4th Yr", rate: 25, icon: GraduationCap, color: "blue" },
  { value: "qualified", label: "Qualified Electrician", shortLabel: "Qualified", rate: 45, icon: Award, color: "green" },
  { value: "senior", label: "Senior Electrician", shortLabel: "Senior", rate: 55, icon: Star, color: "amber" },
  { value: "supervisor", label: "Supervisor/Foreman", shortLabel: "Supervisor", rate: 65, icon: Briefcase, color: "purple" },
  { value: "specialist", label: "Specialist/Consultant", shortLabel: "Specialist", rate: 75, icon: Star, color: "red" },
];

interface WorkerManagerProps {
  workers: Worker[];
  onWorkersChange: (workers: Worker[]) => void;
  totalLabourHours: number;
  totalLabourCost: number;
  isVisible: boolean;
}

export const WorkerManager = ({
  workers,
  onWorkersChange,
  totalLabourHours,
  totalLabourCost,
  isVisible
}: WorkerManagerProps) => {
  const { toast } = useToast();
  const [expandedWorker, setExpandedWorker] = useState<string | null>(workers[0]?.id || null);

  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      role: "Qualified Electrician",
      hours: 8,
      hourlyRate: 45,
      skillLevel: 'qualified'
    };

    onWorkersChange([...workers, newWorker]);
    setExpandedWorker(newWorker.id);
    toast({
      title: "Worker Added",
      description: "New worker added to the team.",
      variant: "success"
    });
  };

  const removeWorker = (workerId: string) => {
    if (workers.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one worker is required.",
        variant: "destructive"
      });
      return;
    }

    onWorkersChange(workers.filter(w => w.id !== workerId));
    toast({
      title: "Worker Removed",
      description: "Worker removed from the team.",
      variant: "default"
    });
  };

  const updateWorker = (workerId: string, field: keyof Worker, value: any) => {
    onWorkersChange(workers.map(worker => {
      if (worker.id === workerId) {
        if (field === 'skillLevel') {
          const roleOption = workerRoleOptions.find(opt => opt.value === value);
          return {
            ...worker,
            [field]: value,
            role: roleOption?.label || worker.role,
            hourlyRate: roleOption?.rate || worker.hourlyRate
          };
        }
        return { ...worker, [field]: value };
      }
      return worker;
    }));
  };

  const blendedHourlyRate = totalLabourHours > 0 ? totalLabourCost / totalLabourHours : 0;

  if (!isVisible) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-elec-yellow/20 rounded-xl">
            <Users className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-ios-headline font-semibold text-white">Team</h3>
            <p className="text-ios-caption-1 text-white/50">{workers.length} worker{workers.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <Button
          onClick={addWorker}
          className="h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium text-ios-subhead active:scale-[0.98] touch-manipulation"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {/* Team Summary Stats */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        <div className="flex-shrink-0 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-3 min-w-[100px]">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-3 w-3 text-elec-yellow" />
            <span className="text-ios-caption-2 text-elec-yellow">Hours</span>
          </div>
          <p className="text-ios-title-3 font-semibold text-white tabular-nums">{totalLabourHours.toFixed(1)}h</p>
        </div>
        <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-xl p-3 min-w-[100px]">
          <div className="flex items-center gap-1 mb-1">
            <PoundSterling className="h-3 w-3 text-green-400" />
            <span className="text-ios-caption-2 text-green-400">Blended</span>
          </div>
          <p className="text-ios-title-3 font-semibold text-white tabular-nums">£{blendedHourlyRate.toFixed(0)}/hr</p>
        </div>
        <div className="flex-shrink-0 bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 min-w-[100px]">
          <div className="flex items-center gap-1 mb-1">
            <PoundSterling className="h-3 w-3 text-blue-400" />
            <span className="text-ios-caption-2 text-blue-400">Total</span>
          </div>
          <p className="text-ios-title-3 font-semibold text-white tabular-nums">£{totalLabourCost.toFixed(0)}</p>
        </div>
      </div>

      {/* Worker Cards */}
      <div className="space-y-2">
        <AnimatePresence>
          {workers.map((worker, index) => {
            const roleOption = workerRoleOptions.find(r => r.value === worker.skillLevel);
            const RoleIcon = roleOption?.icon || Users;
            const isExpanded = expandedWorker === worker.id;
            const workerCost = worker.hours * worker.hourlyRate;

            return (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Worker Header (always visible) */}
                <button
                  onClick={() => setExpandedWorker(isExpanded ? null : worker.id)}
                  className="w-full flex items-center justify-between p-4 touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-${roleOption?.color || 'white'}-500/20`}>
                      <RoleIcon className={`h-4 w-4 text-${roleOption?.color || 'white'}-400`} />
                    </div>
                    <div className="text-left">
                      <p className="text-ios-subhead font-medium text-white">
                        {roleOption?.shortLabel || worker.role}
                      </p>
                      <p className="text-ios-caption-2 text-white/50">
                        {worker.hours}h × £{worker.hourlyRate} = £{workerCost.toFixed(0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-ios-subhead font-semibold text-elec-yellow tabular-nums">
                      £{workerCost.toFixed(0)}
                    </span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                      <ChevronDown className="h-5 w-5 text-white/40" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-4 space-y-4">
                        {/* Role Selection */}
                        <div>
                          <p className="text-ios-caption-1 text-white/50 mb-2">Role & Rate</p>
                          <div className="grid grid-cols-2 gap-2">
                            {workerRoleOptions.map((option) => {
                              const isSelected = worker.skillLevel === option.value;
                              const Icon = option.icon;
                              return (
                                <button
                                  key={option.value}
                                  onClick={() => updateWorker(worker.id, 'skillLevel', option.value)}
                                  className={`p-2.5 rounded-xl border text-left transition-all touch-manipulation active:scale-[0.98] ${
                                    isSelected
                                      ? "bg-elec-yellow/20 border-elec-yellow/50"
                                      : "bg-white/5 border-white/10"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isSelected && <CheckCircle className="h-3 w-3 text-elec-yellow" />}
                                    <Icon className={`h-3 w-3 ${isSelected ? "text-elec-yellow" : "text-white/50"}`} />
                                    <span className={`text-ios-caption-1 font-medium ${isSelected ? "text-elec-yellow" : "text-white"}`}>
                                      {option.shortLabel}
                                    </span>
                                  </div>
                                  <p className="text-ios-caption-2 text-white/40 mt-0.5">£{option.rate}/hr</p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Hours & Rate Inputs */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <IOSInput
                              label="Hours"
                              icon={<Clock className="h-4 w-4" />}
                              type="number"
                              value={worker.hours || ""}
                              onChange={(e) => updateWorker(worker.id, 'hours', parseFloat(e.target.value) || 0)}
                              hint="Time on job"
                            />
                          </div>
                          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <IOSInput
                              label="Rate"
                              icon={<PoundSterling className="h-4 w-4" />}
                              type="number"
                              value={worker.hourlyRate || ""}
                              onChange={(e) => updateWorker(worker.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                              hint="Per hour"
                            />
                          </div>
                        </div>

                        {/* Remove Button */}
                        {workers.length > 1 && (
                          <Button
                            onClick={() => removeWorker(worker.id)}
                            variant="outline"
                            className="w-full h-11 border-red-500/30 text-red-400 hover:bg-red-500/10 active:scale-[0.98] touch-manipulation"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Worker
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Quick Add Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {[
          { level: "apprentice-1st" as const, label: "+Apprentice", rate: 15 },
          { level: "qualified" as const, label: "+Qualified", rate: 45 },
          { level: "senior" as const, label: "+Senior", rate: 55 }
        ].map((quick) => (
          <button
            key={quick.level}
            onClick={() => {
              const newWorker: Worker = {
                id: Date.now().toString(),
                role: workerRoleOptions.find(r => r.value === quick.level)?.label || "",
                hours: 8,
                hourlyRate: quick.rate,
                skillLevel: quick.level
              };
              onWorkersChange([...workers, newWorker]);
              setExpandedWorker(newWorker.id);
            }}
            className="flex-shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-ios-caption-1 text-white/70 hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            {quick.label}
          </button>
        ))}
      </div>
    </div>
  );
};
