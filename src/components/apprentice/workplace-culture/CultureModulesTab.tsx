
import { useState } from "react";
import { CultureModule } from "./types";
import { cultureModules } from "./cultureModulesData";
import CultureModuleCard from "./CultureModuleCard";
import LearningResourcesCard from "./LearningResourcesCard";
import ModuleDetailView from "./ModuleDetailView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, MessageSquare } from "lucide-react";

const CultureModulesTab = () => {
  const [activeModule, setActiveModule] = useState<CultureModule | null>(null);

  const handleModuleSelect = (module: CultureModule) => {
    setActiveModule(module);
  };

  const moduleStats = [
    { label: "Total Modules", value: cultureModules.length, icon: BookOpen },
    { label: "Learning Hours", value: "8-12", icon: Target },
    { label: "Skill Areas", value: "6", icon: Users },
    { label: "Interactive Scenarios", value: "25+", icon: MessageSquare }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
            </div>
            Interactive Learning Modules
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-white/70 mb-6">
            Comprehensive learning modules covering all aspects of workplace culture in the UK electrical industry.
            Each module includes practical examples, interactive content, and real-world scenarios.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moduleStats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/10 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all">
                <div className="p-3 rounded-xl bg-elec-yellow/10 w-fit mx-auto mb-2">
                  <stat.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl font-bold text-elec-yellow mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {!activeModule ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureModules.map(module => (
              <CultureModuleCard 
                key={module.id}
                module={module}
                onSelect={handleModuleSelect}
              />
            ))}
          </div>
          
          <LearningResourcesCard />
        </div>
      ) : (
        <ModuleDetailView 
          module={activeModule} 
          onBack={() => setActiveModule(null)}
        />
      )}
    </div>
  );
};

export default CultureModulesTab;
