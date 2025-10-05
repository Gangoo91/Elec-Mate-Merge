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
      mode: 'express' as const,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Building2,
      title: "Commercial",
      description: "Multiple Options",
      type: 'commercial' as const,
      mode: 'professional' as const,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Factory,
      title: "Industrial",
      description: "Full System",
      type: 'industrial' as const,
      mode: 'multi' as const,
      gradient: "from-amber-500 to-amber-600"
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
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          What are you installing?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {installationTypes.map((type) => (
            <Card
              key={type.title}
              className="group cursor-pointer transition-all hover:scale-105 bg-slate-800/50 border-slate-700 hover:border-blue-500 backdrop-blur"
              onClick={() => onModeSelect(type.mode, { installationType: type.type })}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                <p className="text-slate-400">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Starts */}
      <div>
        <h3 className="text-lg font-semibold text-slate-300 mb-4 text-center">
          Or start with:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {quickStarts.map((quick) => (
            <Card
              key={quick.title}
              className="group cursor-pointer transition-all hover:scale-105 bg-slate-800/30 border-slate-700 hover:border-yellow-500 backdrop-blur"
              onClick={() => onModeSelect(quick.mode, { loadType: quick.loadType })}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <quick.icon className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{quick.title}</h4>
                  <p className="text-sm text-slate-400">{quick.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
