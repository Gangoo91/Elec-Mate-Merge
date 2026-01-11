
import { useState } from "react";
import { CultureModule } from "./types";
import { cultureModules } from "./cultureModulesData";
import CultureModuleCard from "./CultureModuleCard";
import LearningResourcesCard from "./LearningResourcesCard";
import ModuleDetailView from "./ModuleDetailView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Users, MessageSquare, Trophy, Loader2 } from "lucide-react";
import { useWorkplaceCultureProgress } from "@/hooks/workplace-culture/useWorkplaceCultureProgress";

const CultureModulesTab = () => {
  const [activeModule, setActiveModule] = useState<CultureModule | null>(null);
  const { progress, isLoading, stats, getModuleProgress } = useWorkplaceCultureProgress();

  const handleModuleSelect = (module: CultureModule) => {
    setActiveModule(module);
  };

  const moduleStats = [
    { label: "Completed", value: `${stats.completedModules}/${stats.totalModules}`, icon: Trophy },
    { label: "Overall", value: `${stats.overallProgress}%`, icon: Target },
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

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      ) : !activeModule ? (
        <div className="space-y-6">
          {/* Overall Progress Bar */}
          {stats.overallProgress > 0 && (
            <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Your Progress</span>
                <span className="text-sm text-elec-yellow font-bold">{stats.overallProgress}%</span>
              </div>
              <Progress value={stats.overallProgress} className="h-2" />
              <p className="text-xs text-white/60 mt-2">
                {stats.completedModules} of {stats.totalModules} modules completed
              </p>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureModules.map(module => {
              const moduleProgress = getModuleProgress(module.id);
              return (
                <CultureModuleCard
                  key={module.id}
                  module={module}
                  onSelect={handleModuleSelect}
                  progress={moduleProgress?.progress_percent || 0}
                  isCompleted={moduleProgress?.completed || false}
                />
              );
            })}
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
