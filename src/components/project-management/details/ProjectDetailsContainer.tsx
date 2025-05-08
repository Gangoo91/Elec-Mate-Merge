
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project, ProjectMaterial, ProjectTimeEntry } from "@/types/project";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "@/hooks/use-toast";
import { ProjectDialog } from "../ProjectDialog";
import { ProjectDetailsHeader } from "./ProjectDetailsHeader";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectDetailsTabs } from "./ProjectDetailsTabs";

export const ProjectDetailsContainer = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject } = useProjects();
  const [project, setProject] = useState<Project | undefined>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      const currentProject = getProject(projectId);
      if (currentProject) {
        setProject(currentProject);
      } else {
        navigate("/electrician-tools/project-management");
        toast({
          title: "Project Not Found",
          description: "The project you're looking for doesn't exist.",
          variant: "destructive",
        });
      }
    }
  }, [projectId, getProject, navigate]);

  if (!project) {
    return <div>Loading project...</div>;
  }

  const handleProjectUpdate = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (project) {
      updateProject(project.id, data);
      setProject({
        ...project,
        ...data,
        updatedAt: new Date().toISOString()
      });
    }
  };

  // Materials handlers
  const handleAddMaterial = (material: ProjectMaterial) => {
    const updatedMaterials = [...project.materials, material];
    updateProject(project.id, { materials: updatedMaterials });
    setProject({
      ...project,
      materials: updatedMaterials,
      updatedAt: new Date().toISOString()
    });
  };

  const handleDeleteMaterial = (id: string) => {
    const updatedMaterials = project.materials.filter(material => material.id !== id);
    updateProject(project.id, { materials: updatedMaterials });
    setProject({
      ...project,
      materials: updatedMaterials,
      updatedAt: new Date().toISOString()
    });

    toast({
      title: "Material Removed",
      description: "The material has been removed from the project.",
    });
  };

  // Time entry handlers
  const handleAddTimeEntry = (timeEntry: ProjectTimeEntry) => {
    const updatedTimeEntries = [...project.timeEntries, timeEntry];
    updateProject(project.id, { timeEntries: updatedTimeEntries });
    setProject({
      ...project,
      timeEntries: updatedTimeEntries,
      updatedAt: new Date().toISOString()
    });
  };

  const handleDeleteTimeEntry = (id: string) => {
    const updatedTimeEntries = project.timeEntries.filter(entry => entry.id !== id);
    updateProject(project.id, { timeEntries: updatedTimeEntries });
    setProject({
      ...project,
      timeEntries: updatedTimeEntries,
      updatedAt: new Date().toISOString()
    });

    toast({
      title: "Time Entry Removed",
      description: "The time entry has been removed from the project.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <ProjectDetailsHeader 
        project={project} 
        setEditDialogOpen={setEditDialogOpen} 
        onDeleteProject={deleteProject} 
      />
      
      <ProjectOverview project={project} />
      
      <ProjectDetailsTabs 
        project={project}
        onAddMaterial={handleAddMaterial}
        onDeleteMaterial={handleDeleteMaterial}
        onAddTimeEntry={handleAddTimeEntry}
        onDeleteTimeEntry={handleDeleteTimeEntry}
      />
      
      {/* Edit project dialog */}
      <ProjectDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        project={project}
        onSubmit={handleProjectUpdate}
      />
    </div>
  );
};
