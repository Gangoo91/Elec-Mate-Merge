
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { CircuitBoard, Shield, Zap, Star } from "lucide-react";
import TestEquipmentTab from "@/components/apprentice/tools-guide/TestEquipmentTab";

const TestEquipment = () => {
  const quickStats = [
    { label: "Basic Tools", value: "5+", icon: Zap, color: "text-elec-yellow", bg: "from-elec-yellow/10 to-elec-yellow/5", border: "border-elec-yellow/30" },
    { label: "Advanced Tools", value: "5+", icon: CircuitBoard, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/30" },
    { label: "UK Standards", value: "GS38", icon: Shield, color: "text-green-400", bg: "from-green-500/10 to-green-500/5", border: "border-green-500/30" },
    { label: "18th Edition", value: "BS7671", icon: Star, color: "text-purple-400", bg: "from-purple-500/10 to-purple-500/5", border: "border-purple-500/30" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-blue-500/20 rounded-2xl mb-4">
          <CircuitBoard className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Test Equipment Guide
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Quality test equipment is essential for safety and compliance. Learn about the testing tools you'll need throughout your apprenticeship and career.
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
              <p className="text-xs text-white/70">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Equipment Content */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <TestEquipmentTab />
      </Card>
    </div>
  );
};

export default TestEquipment;
