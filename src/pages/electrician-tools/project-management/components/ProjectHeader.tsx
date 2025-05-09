
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";

type ProjectHeaderProps = {
  onNewProject: () => void;
  onExport: () => void;
  hasProjects: boolean;
};

export const ProjectHeader = ({ onNewProject, onExport, hasProjects }: ProjectHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
        <p className="text-muted-foreground">
          Organise and manage your electrical projects from quotation to completion.
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={onNewProject}
          className="flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
        >
          <Plus className="h-4 w-4" /> New Project
        </Button>
        {hasProjects && (
          <Button 
            variant="outline" 
            onClick={onExport}
            className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40"
            title="Export projects as CSV"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
    </div>
  );
};
