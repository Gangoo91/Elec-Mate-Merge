
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
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Interactive Learning Modules</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive learning modules covering all aspects of workplace culture in the UK electrical industry. 
            Each module includes practical examples, interactive content, and real-world scenarios.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moduleStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
                <div className="text-2xl font-bold text-elec-yellow mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
