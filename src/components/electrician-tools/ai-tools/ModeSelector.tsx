import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Wrench, AlertTriangle, CheckCircle } from "lucide-react";

export type AnalysisMode = 'fault_diagnosis' | 'component_identify' | 'wiring_instruction' | 'installation_verify';

interface ModeSelectorProps {
  onSelectMode: (mode: AnalysisMode) => void;
}

const MODE_OPTIONS = [
  {
    mode: 'component_identify' as AnalysisMode,
    title: 'Component Identification',
    description: 'Identify components, specs & BS 7671 requirements',
    icon: Search,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'hover:border-blue-500/60',
    iconColor: 'text-blue-400',
    shadowColor: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]'
  },
  {
    mode: 'wiring_instruction' as AnalysisMode,
    title: 'Wiring Instructions',
    description: 'Step-by-step UK wiring guide with terminal diagrams',
    icon: Wrench,
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'hover:border-green-500/60',
    iconColor: 'text-green-400',
    shadowColor: 'hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)]'
  },
  {
    mode: 'fault_diagnosis' as AnalysisMode,
    title: 'Fault Diagnosis',
    description: 'Identify issues, EICR codes & rectification steps',
    icon: AlertTriangle,
    gradient: 'from-red-500/10 to-orange-500/10',
    borderColor: 'hover:border-red-500/60',
    iconColor: 'text-red-400',
    shadowColor: 'hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)]'
  },
  {
    mode: 'installation_verify' as AnalysisMode,
    title: 'Installation Verification',
    description: 'BS 7671 compliance check with pass/fail assessment',
    icon: CheckCircle,
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'hover:border-purple-500/60',
    iconColor: 'text-purple-400',
    shadowColor: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]'
  }
];

const ModeSelector = ({ onSelectMode }: ModeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-light">
          What would you like to analyse?
        </h2>
        <p className="text-elec-light/60">
          Select an analysis mode to get started with AI-powered electrical insights
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
        {MODE_OPTIONS.map((option) => {
          const IconComponent = option.icon;
          return (
            <Card
              key={option.mode}
              onClick={() => onSelectMode(option.mode)}
              className={`group relative cursor-pointer border-elec-yellow/20 bg-gradient-to-br ${option.gradient} overflow-hidden transition-all duration-300 ${option.borderColor} ${option.shadowColor} hover:scale-[1.02]`}
            >
              <CardHeader className="relative p-6 space-y-4">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-elec-card to-elec-gray/80 border border-elec-yellow/20 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <IconComponent className={`h-8 w-8 ${option.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                </div>

                {/* Title */}
                <CardTitle className="text-xl text-elec-light font-semibold leading-tight transition-colors duration-300 group-hover:text-elec-yellow">
                  {option.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-sm text-elec-light/60 leading-relaxed transition-all duration-300 group-hover:text-elec-light/80">
                  {option.description}
                </CardDescription>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 via-elec-yellow/0 to-elec-yellow/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
