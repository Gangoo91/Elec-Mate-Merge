
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useProjects } from "@/hooks/useProjects";
import { ProjectDialog } from "@/components/project-management/ProjectDialog";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectAnalytics } from "@/components/project-management/ProjectAnalytics";
import { ProjectFilters } from "./components/ProjectFilters";
import { ProjectList } from "./components/ProjectList";
import { ProjectTools } from "./components/ProjectTools";
import { EmptyProjectState } from "./components/EmptyProjectState";
import { LoadingState } from "./components/LoadingState";

const ProjectManagementPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, loading, createProject, deleteProject } = useProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  // If we're viewing a specific project, render the ProjectDetails component
  if (location.pathname.match(/\/electrician-tools\/project-management\/project\/[^/]+$/)) {
    // This is handled in MainRoutes.tsx now
    return null;
  }

  const handleStartProject = (projectData: any) => {
    const newProject = createProject(projectData);
    navigate(`/electrician-tools/project-management/project/${newProject.id}`);
    toast({
      title: "Project Created",
      description: "Your new project has been created successfully.",
    });
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
      <ProjectHeader 
        onNewProject={() => setIsCreateDialogOpen(true)}
        onExport={exportProjectsAsCsv}
        hasProjects={projects.length > 0}
      />
      
      {projects.length > 0 && <ProjectAnalytics />}

      {projects.length > 0 && (
        <ProjectFilters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      )}

      {loading ? (
        <LoadingState />
      ) : projects.length === 0 ? (
        <EmptyProjectState onCreateProject={() => setIsCreateDialogOpen(true)} />
      ) : (
        <>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-elec-gray/50 rounded-lg border border-elec-yellow/10">
              <p className="text-xl mb-2">No matching projects found</p>
              <p className="text-muted-foreground">Try selecting a different status filter</p>
            </div>
          ) : (
            <ProjectList 
              projects={filteredProjects} 
              onView={(id) => navigate(`/electrician-tools/project-management/project/${id}`)}
              onEdit={(id) => navigate(`/electrician-tools/project-management/project/${id}`)}
              onDelete={handleDeleteProject}
            />
          )}
        </>
      )}

      <ProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleStartProject}
      />

      <ProjectTools />
    </div>
  );
};

export default ProjectManagementPage;
