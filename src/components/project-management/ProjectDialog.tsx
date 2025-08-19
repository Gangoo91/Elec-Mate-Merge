
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import { Project } from "@/types/project";
import { toast } from "@/hooks/use-toast";

type ProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
};

export const ProjectDialog = ({
  open,
  onOpenChange,
  project,
  onSubmit
}: ProjectDialogProps) => {
  const handleSubmit = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    onSubmit(data);
    toast({
      title: project ? "Project Updated" : "Project Created",
      description: `${data.name} has been ${project ? "updated" : "created"} successfully.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
