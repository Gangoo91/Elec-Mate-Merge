
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CultureModule } from "./types";
import ModuleOverviewTab from "./ModuleOverviewTab";
import ModuleExamplesTab from "./ModuleExamplesTab";
import ModuleResourcesTab from "./ModuleResourcesTab";
import ModuleFAQTab from "./ModuleFAQTab";
import { useWorkplaceCultureProgress } from "@/hooks/workplace-culture/useWorkplaceCultureProgress";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleDetailViewProps {
  module: CultureModule;
  onBack: () => void;
}

const TABS = ["overview", "examples", "resources", "faq"];

const ModuleDetailView = ({ module, onBack }: ModuleDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCompleting, setIsCompleting] = useState(false);
  const { getModuleProgress, completeSection, completeModule } = useWorkplaceCultureProgress();
  const ModuleIcon = module.icon;

  const moduleProgress = getModuleProgress(module.id);
  const sectionsCompleted = moduleProgress?.sections_completed || [];
  const isModuleCompleted = moduleProgress?.completed || false;
  const progressPercent = moduleProgress?.progress_percent || 0;

  // Track section views as progress
  useEffect(() => {
    if (!sectionsCompleted.includes(activeTab)) {
      completeSection(module.id, activeTab, TABS.length);
    }
  }, [activeTab, module.id, sectionsCompleted, completeSection]);

  const handleCompleteModule = async () => {
    setIsCompleting(true);
    await completeModule(module.id);
    setIsCompleting(false);
  };

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl border",
              isModuleCompleted
                ? "bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30"
                : "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30"
            )}>
              {isModuleCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <ModuleIcon className="h-5 w-5 text-elec-yellow" />
              )}
            </div>
            <CardTitle className="text-white">{module.title}</CardTitle>
          </div>
          {isModuleCompleted && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Completed
            </Badge>
          )}
        </div>
        <CardDescription className="text-base text-white/70 mt-2">
          {module.description}
        </CardDescription>
        {!isModuleCompleted && progressPercent > 0 && (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Progress</span>
              <span className="text-elec-yellow font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6 relative">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6 bg-white/5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Overview</TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Examples</TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Resources</TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ModuleOverviewTab module={module} />
          </TabsContent>

          <TabsContent value="examples">
            <ModuleExamplesTab module={module} />
          </TabsContent>

          <TabsContent value="resources">
            <ModuleResourcesTab module={module} />
          </TabsContent>

          <TabsContent value="faq">
            <ModuleFAQTab module={module} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between gap-3 relative">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-11 border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 text-elec-yellow touch-manipulation active:scale-95 transition-all"
        >
          Back to Modules
        </Button>
        {!isModuleCompleted && (
          <Button
            onClick={handleCompleteModule}
            disabled={isCompleting}
            className="h-11 bg-green-500 hover:bg-green-600 text-white touch-manipulation active:scale-95 transition-all"
          >
            {isCompleting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark as Complete
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ModuleDetailView;
