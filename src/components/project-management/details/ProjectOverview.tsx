
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { CalendarCheck, Clock } from "lucide-react";
import { format } from "date-fns";

type ProjectOverviewProps = {
  project: Project;
};

export const ProjectOverview = ({ project }: ProjectOverviewProps) => {
  // Get status badge color
  const getStatusColor = (status: Project["status"]) => {
    switch(status) {
      case "planning": return "bg-blue-500 hover:bg-blue-600";
      case "in-progress": return "bg-amber-500 hover:bg-amber-600";
      case "completed": return "bg-green-500 hover:bg-green-600";
      case "on-hold": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace("-", " ")}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{project.name}</CardTitle>
            <p className="text-muted-foreground">Client: {project.clientName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-xl font-bold">£{project.budget.toFixed(2)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-muted-foreground">Start Date:</span>
            </div>
            <p>{project.startDate ? format(new Date(project.startDate), "dd MMMM yyyy") : "Not set"}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-muted-foreground">Due Date:</span>
            </div>
            <p>{project.dueDate ? format(new Date(project.dueDate), "dd MMMM yyyy") : "Not set"}</p>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm text-muted-foreground">Last Updated:</span>
            </div>
            <p>{format(new Date(project.updatedAt), "dd MMM yyyy HH:mm")}</p>
          </div>
        </div>
        
        {project.description && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Description</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        )}
        
        {project.notes && (
          <div>
            <h3 className="text-sm font-medium mb-1">Notes</h3>
            <p className="text-muted-foreground">{project.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
