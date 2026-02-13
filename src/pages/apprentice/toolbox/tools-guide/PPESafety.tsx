
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, HardHat, Eye, Star } from "lucide-react";
import PPETab from "@/components/apprentice/tools-guide/PPETab";

const PPESafety = () => {
  const quickStats = [
    { label: "Basic PPE Items", value: "5+", icon: Shield, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Specialist PPE", value: "5+", icon: HardHat, color: "text-orange-400", bg: "from-orange-500/10 to-orange-500/5", border: "border-orange-500/30" },
    { label: "BS Standards", value: "6+", icon: Eye, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "Safety Priority", value: "#1", icon: Star, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          PPE & Safety Equipment
        </h1>
        <p className="text-white max-w-2xl mb-4 text-sm sm:text-base">
          Personal Protective Equipment is essential for every UK electrical apprentice. Your safety is paramount - never compromise on PPE quality.
        </p>
        <SmartBackButton />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.border} bg-gradient-to-br ${stat.bg}`}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PPE Content */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <PPETab />
      </Card>
    </div>
  );
};

export default PPESafety;
