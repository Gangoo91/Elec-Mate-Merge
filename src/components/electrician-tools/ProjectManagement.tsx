
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, LayoutGrid, Wrench } from "lucide-react";

const ProjectManagement = () => {
  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workstation</CardTitle>
              <CardDescription>
                Manage projects, tools, AI assistants, and administration in one place.
              </CardDescription>
            </div>
            <Button>+ New Project</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-elec-yellow/20 overflow-hidden">
            <div className="bg-elec-dark p-4 text-center">
              <p className="text-muted-foreground">
                No active projects found. Create a new project to get started.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Project Dashboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get a visual overview of all your project statuses and timelines.
            </p>
            <Button variant="outline" className="w-full">View Dashboard</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Material Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track materials used across different projects and estimate needs.
            </p>
            <Button variant="outline" className="w-full">Open Tracker</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Project Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Calculate project costs, timelines, and resource requirements.
            </p>
            <Button variant="outline" className="w-full">Use Calculator</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagement;
