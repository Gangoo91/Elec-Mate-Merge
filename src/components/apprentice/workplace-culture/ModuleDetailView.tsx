
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CultureModule } from "./types";
import ModuleOverviewTab from "./ModuleOverviewTab";
import ModuleExamplesTab from "./ModuleExamplesTab";
import ModuleResourcesTab from "./ModuleResourcesTab";
import ModuleFAQTab from "./ModuleFAQTab";

interface ModuleDetailViewProps {
  module: CultureModule;
  onBack: () => void;
}

const ModuleDetailView = ({ module, onBack }: ModuleDetailViewProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const ModuleIcon = module.icon;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <ModuleIcon className="h-5 w-5 text-elec-yellow" />
          </div>
          <CardTitle className="text-white">{module.title}</CardTitle>
        </div>
        <CardDescription className="text-base text-white/70 mt-2">
          {module.description}
        </CardDescription>
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
      <CardFooter className="flex justify-end relative">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-11 border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 text-elec-yellow touch-manipulation active:scale-95 transition-all"
        >
          Back to Modules
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleDetailView;
