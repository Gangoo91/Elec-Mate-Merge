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
    icon: Search
  },
  {
    mode: 'wiring_instruction' as AnalysisMode,
    title: 'Wiring Instructions',
    description: 'Step-by-step UK wiring guide with terminal diagrams',
    icon: Wrench
  },
  {
    mode: 'fault_diagnosis' as AnalysisMode,
    title: 'Fault Diagnosis',
    description: 'Identify issues, EICR codes & rectification steps',
    icon: AlertTriangle
  },
  {
    mode: 'installation_verify' as AnalysisMode,
    title: 'Installation Verification',
    description: 'BS 7671 compliance check with pass/fail assessment',
    icon: CheckCircle
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
              className="group relative cursor-pointer border-elec-yellow/20 bg-elec-card overflow-hidden transition-all duration-300 hover:border-elec-yellow/40"
            >
              <CardHeader className="relative p-6 md:p-8 space-y-4">
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-elec-yellow/10 border border-elec-yellow/20 rounded-2xl">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-elec-yellow" />
                </div>

                {/* Title */}
                <CardTitle className="text-lg md:text-xl text-elec-light font-semibold leading-tight">
                  {option.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-sm md:text-base text-elec-light/60 leading-relaxed">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
