
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck, LayoutGrid, ClipboardList, LineChart, FileSpreadsheet, Plus } from "lucide-react";
import { Link, Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/project-management/ProjectCard";
import { ProjectDialog } from "@/components/project-management/ProjectDialog";
import { ProjectDetails } from "@/components/project-management/ProjectDetails";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading, createProject, deleteProject } = useProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // If we're viewing a specific project, render the ProjectDetails component
  if (location.pathname.match(/\/electrician-tools\/project-management\/project\/[^/]+$/)) {
    return <ProjectDetails />;
  }

  const handleStartProject = (projectData: any) => {
    const newProject = createProject(projectData);
    navigate(`/electrician-tools/project-management/project/${newProject.id}`);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    toast({
      title: "Project Deleted",
      description: "The project has been deleted successfully.",
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
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> New Project
          </Button>
          <Link to="/electrician-tools">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Project Management</CardTitle>
                <CardDescription>
                  Create and manage your electrical projects
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-elec-dark rounded-md flex flex-col items-center justify-center p-10 text-center">
              <FileSpreadsheet className="h-16 w-16 text-elec-yellow mb-4" />
              <h3 className="text-xl font-medium mb-2">No Projects Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first project to start tracking time, materials and client details.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create New Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={(id) => navigate(`/electrician-tools/project-management/project/${id}`)}
              onEdit={(id) => navigate(`/electrician-tools/project-management/project/${id}`)}
              onDelete={(id) => handleDeleteProject(id)}
            />
          ))}
        </div>
      )}

      <ProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleStartProject}
      />

      <h2 className="text-2xl font-semibold mt-4">Project Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-elec-yellow" />
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
    </div>
  );
};

export default ProjectManagement;
