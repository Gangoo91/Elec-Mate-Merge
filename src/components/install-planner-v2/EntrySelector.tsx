import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Factory, Zap, Wrench } from "lucide-react";
import { InstallPlanDataV2 } from "./types";

interface EntrySelectorProps {
  onModeSelect: (mode: 'express' | 'professional' | 'multi', presetData?: Partial<InstallPlanDataV2>) => void;
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
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all">
                  <type.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
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
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-elec-yellow flex items-center justify-center group-hover:scale-110 transition-transform">
                  <quick.icon className="h-6 w-6 text-elec-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{quick.title}</h4>
                  <p className="text-sm text-muted-foreground">{quick.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
