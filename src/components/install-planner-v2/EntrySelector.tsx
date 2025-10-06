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
      icon: Sparkles,
      title: "AI Guided Design",
      description: "Chat with AI to design your installation",
      mode: 'ai-guided' as const,
      loadType: '',
      featured: true
    },
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
      {/* Main Selection */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          What are you installing?
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
                <p className="text-sm md:text-base text-muted-foreground">{type.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {quickStarts.map((quick) => (
            <Card
              key={quick.title}
              className={`group cursor-pointer transition-all hover:scale-105 ${
                quick.featured 
                  ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/50 hover:border-primary md:col-span-3' 
                  : 'bg-elec-grey border-border hover:border-primary'
              }`}
              onClick={() => onModeSelect(quick.mode, { loadType: quick.loadType })}
            >
              <CardContent className={`${quick.featured ? 'p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left' : 'p-4 md:p-6 flex items-center gap-3 md:gap-4'}`}>
                <div className={`${quick.featured ? 'w-14 h-14 md:w-16 md:h-16' : 'w-10 h-10 md:w-12 md:h-12'} rounded-lg ${quick.featured ? 'bg-primary' : 'bg-elec-yellow'} flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <quick.icon className={`${quick.featured ? 'h-7 w-7 md:h-8 md:w-8 text-primary-foreground' : 'h-5 w-5 md:h-6 md:w-6 text-elec-dark'}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={`${quick.featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'} font-semibold text-foreground mb-1`}>
                    {quick.title}
                  </h4>
                  <p className={`${quick.featured ? 'text-sm md:text-base' : 'text-xs md:text-sm'} text-muted-foreground`}>
                    {quick.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
