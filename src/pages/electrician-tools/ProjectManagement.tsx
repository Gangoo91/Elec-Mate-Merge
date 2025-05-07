
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarClock, LayoutGrid, ClipboardList, LineChart, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ProjectManagement = () => {
  const handleStartProject = () => {
    toast({
      title: "Project Started",
      description: "Your new project has been created successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground">
            Organise and manage your electrical projects from quotation to completion.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Quick Start Project</CardTitle>
                <CardDescription>
                  Create a new electrical project with basic structure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Begin tracking time, materials and client details with our streamlined project template.
            </p>
            <Button className="w-full" onClick={handleStartProject}>Create New Project</Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-xl">Project Analytics</CardTitle>
            <CardDescription>
              Visualise your project performance and profitability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Track labour hours, materials costs and profit margins across all your electrical projects.
            </p>
            <Button variant="outline" className="w-full">View Analytics</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-4">Project Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Time Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Log time spent on different aspects of your electrical projects.
            </p>
            <Button variant="outline" className="w-full">Open Tracker</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Material Lists</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and manage materials lists for your electrical projects.
            </p>
            <Button variant="outline" className="w-full">View Lists</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Quote Builder</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create professional quotes for clients with accurate pricing.
            </p>
            <Button variant="outline" className="w-full">Create Quote</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <LineChart className="h-5 w-5 text-elec-yellow" />
            Project Timeline
          </CardTitle>
          <CardDescription>
            Visualise your upcoming electrical project schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-elec-dark rounded-md flex items-center justify-center p-4">
            <p className="text-muted-foreground">Connect your first project to view timeline data</p>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>The timeline shows all your scheduled projects, helping you plan resources efficiently and avoid scheduling conflicts. Perfect for electrical contractors juggling multiple job sites.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;
