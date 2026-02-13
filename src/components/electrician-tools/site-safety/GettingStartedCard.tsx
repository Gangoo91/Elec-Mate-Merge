import { Shield, FileText, Camera, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface GettingStartedCardProps {
  onAction: (section: string) => void;
}

const quickStartActions = [
  {
    id: "ai-rams",
    label: "Create RAMS",
    icon: FileText,
    gradient: "from-orange-500/20 to-red-500/20",
    iconColour: "text-orange-400",
  },
  {
    id: "photo-docs",
    label: "Take Photo",
    icon: Camera,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColour: "text-emerald-400",
  },
  {
    id: "team-briefing",
    label: "Log Briefing",
    icon: Users,
    gradient: "from-purple-500/20 to-purple-600/20",
    iconColour: "text-purple-400",
  },
];

const checklist = [
  "Create your first RAMS document",
  "Take a safety photo on site",
  "Log a team briefing",
  "Add equipment to the tracker",
];

export function GettingStartedCard({ onAction }: GettingStartedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
    >
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none bg-elec-yellow" />

      <div className="relative p-5 space-y-5">
        {/* Welcome heading */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Welcome to Site Safety
            </h3>
            <p className="text-sm text-white">
              Get started with your safety toolkit
            </p>
          </div>
        </div>

        {/* Quick start buttons */}
        <div className="grid grid-cols-3 gap-2">
          {quickStartActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onAction(action.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${action.gradient} border border-white/[0.06] touch-manipulation active:scale-[0.96] active:opacity-80 transition-all min-h-[80px] justify-center`}
              >
                <Icon className={`h-5 w-5 ${action.iconColour}`} />
                <span className="text-xs font-semibold text-white">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Setup checklist */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Setup Checklist
          </h4>
          <div className="space-y-1.5">
            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02]"
              >
                <div className="w-4 h-4 rounded-full border border-white/[0.15] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GettingStartedCard;
