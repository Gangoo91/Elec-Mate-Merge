import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Factory, Zap, Wrench, Sparkles } from "lucide-react";
import { InstallPlanDataV2 } from "./types";

interface EntrySelectorProps {
  onModeSelect: (mode: 'express' | 'professional' | 'multi' | 'ai-guided', presetData?: Partial<InstallPlanDataV2>) => void;
}

export const EntrySelector = ({ onModeSelect }: EntrySelectorProps) => {
  const installationTypes = [
    {
      icon: Home,
      title: "Home Circuit",
      description: "Quick & Simple",
      type: 'domestic' as const,
      mode: 'express' as const
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Multiple Options",
      type: 'commercial' as const,
      mode: 'professional' as const
    },
    {
      icon: Factory,
      title: "Industrial",
      description: "Full System",
      type: 'industrial' as const,
      mode: 'multi' as const
    }
  ];

  const quickStarts = [
    {
      icon: Zap,
      title: "Common Circuits",
      description: "Ring Main, Lighting, Cooker",
      mode: 'express' as const,
      loadType: 'ring-main'
    },
    {
      icon: Wrench,
      title: "Custom Design",
      description: "Full Control & Options",
      mode: 'professional' as const,
      loadType: ''
    }
  ];

  return (
    <div className="space-y-8">
      {/* AI Guided Design - Featured at Top */}
      <div>
        <Card
          className="group cursor-pointer transition-all hover:scale-[1.02] bg-gradient-to-br from-primary/20 to-primary/5 border-primary/50 hover:border-primary"
          onClick={() => onModeSelect('ai-guided')}
        >
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                AI Guided Installation Designer
              </h3>
              <p className="text-base md:text-lg text-foreground/70">
                Chat with our AI to design your installation - just describe what you need and we'll guide you through the process
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Main Selection */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Or do it manually
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {installationTypes.map((type) => (
            <Card
              key={type.title}
              className="group cursor-pointer transition-all hover:scale-105 bg-elec-grey border-border hover:border-primary/50"
              onClick={() => onModeSelect(type.mode, { installationType: type.type })}
            >
              <CardContent className="p-4 md:p-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all">
                  <type.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">{type.title}</h3>
                <p className="text-sm md:text-base text-foreground/70">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Starts */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Or start with:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {quickStarts.map((quick) => (
            <Card
              key={quick.title}
              className="group cursor-pointer transition-all hover:scale-105 bg-elec-grey border-border hover:border-primary"
              onClick={() => onModeSelect(quick.mode, { loadType: quick.loadType })}
            >
              <CardContent className="p-4 md:p-6 flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-elec-yellow flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <quick.icon className="h-5 w-5 md:h-6 md:w-6 text-elec-dark" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-foreground mb-0.5 md:mb-1">{quick.title}</h4>
                  <p className="text-xs md:text-sm text-foreground/70">{quick.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
