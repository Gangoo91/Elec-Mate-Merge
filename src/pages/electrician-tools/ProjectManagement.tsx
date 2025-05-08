
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck, LayoutGrid, ClipboardList, LineChart, FileSpreadsheet, Plus, Download } from "lucide-react";
import { Link, Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "@/components/project-management/ProjectCard";
import { ProjectDialog } from "@/components/project-management/ProjectDialog";
import { ProjectDetails } from "@/components/project-management/ProjectDetails";
import { ProjectAnalytics } from "@/components/project-management/ProjectAnalytics";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading, createProject, deleteProject } = useProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
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
  
  const filteredProjects = filterStatus === "all" 
    ? projects 
    : projects.filter(p => p.status === filterStatus);
  
  const exportProjectsAsCsv = () => {
    // Create CSV content
    const headers = ["Project Name", "Client", "Status", "Start Date", "Due Date", "Budget", "Location"];
    const rows = projects.map(p => [
      p.name,
      p.clientName,
      p.status,
      p.startDate,
      p.dueDate || "",
      p.budget.toString(),
      p.location || ""
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `electrical-projects-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Projects Exported",
      description: "Your projects have been exported as a CSV file.",
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
          {projects.length > 0 && (
            <Button 
              variant="outline" 
              onClick={exportProjectsAsCsv}
              className="flex items-center gap-2"
              title="Export projects as CSV"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
          <Link to="/electrician-tools">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Analytics Section */}
      <ProjectAnalytics />

      {/* Filters */}
      {projects.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm" 
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === "planning" ? "default" : "outline"}
            size="sm" 
            onClick={() => setFilterStatus("planning")}
          >
            Planning
          </Button>
          <Button 
            variant={filterStatus === "in-progress" ? "default" : "outline"}
            size="sm" 
            onClick={() => setFilterStatus("in-progress")}
          >
            In Progress
          </Button>
          <Button 
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm" 
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </Button>
          <Button 
            variant={filterStatus === "on-hold" ? "default" : "outline"}
            size="sm" 
            onClick={() => setFilterStatus("on-hold")}
          >
            On Hold
          </Button>
        </div>
      )}

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
        <>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No projects match the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
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
        </>
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
              <CardTitle className="text-base">Certificate Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate electrical certificates for your completed projects.
            </p>
            <Button variant="outline" className="w-full">Create Certificate</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectManagement;
