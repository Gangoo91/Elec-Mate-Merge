
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
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ModuleIcon className="h-6 w-6 text-elec-yellow" />
          <CardTitle>{module.title}</CardTitle>
        </div>
        <CardDescription className="text-base text-elec-light/80 mt-2">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
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
      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={onBack}>
          Back to Modules
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleDetailView;
