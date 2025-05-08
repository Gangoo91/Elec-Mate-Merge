
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/types/project";

type ProjectDetailsHeaderProps = {
  project: Project;
  setEditDialogOpen: (open: boolean) => void;
  onDeleteProject: (id: string) => void;
};

export const ProjectDetailsHeader = ({ 
  project, 
  setEditDialogOpen, 
  onDeleteProject 
}: ProjectDetailsHeaderProps) => {
  const navigate = useNavigate();

  const handleDeleteProject = () => {
    onDeleteProject(project.id);
    navigate("/electrician-tools/project-management");
    toast({
      title: "Project Deleted",
      description: `${project.name} has been deleted.`,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={() => navigate("/electrician-tools/project-management")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Button>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={() => setEditDialogOpen(true)}
        >
          <Edit className="h-4 w-4" /> Edit Project
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this project? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
