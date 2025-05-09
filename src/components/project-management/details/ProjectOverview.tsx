
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { CalendarCheck, Clock, MapPin, User } from "lucide-react";
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

  // Calculate total materials cost and hours
  const totalMaterialsCost = project.materials.reduce((sum, item) => sum + item.total, 0);
  const totalHours = project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  // Format dates
  const startDate = project.startDate ? format(new Date(project.startDate), "dd MMMM yyyy") : "Not set";
  const dueDate = project.dueDate ? format(new Date(project.dueDate), "dd MMMM yyyy") : "Not set";

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-4 border-b border-elec-yellow/10">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace("-", " ")}
              </Badge>
              {project.priority && (
                <Badge variant={project.priority === "urgent" ? "destructive" : "outline"}>
                  {project.priority}
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
            <div className="flex items-center gap-4 text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-elec-yellow" />
                <p>{project.clientName}</p>
              </div>
              {project.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <p>{project.location}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="bg-elec-dark p-3 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Project Budget</p>
              <p className="text-2xl font-bold">£{project.budget.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-elec-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Start Date</span>
            </div>
            <p className="text-lg">{startDate}</p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Due Date</span>
            </div>
            <p className="text-lg">{dueDate}</p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Materials</span>
            </div>
            <p className="text-lg">£{totalMaterialsCost.toLocaleString()}</p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <span className="font-medium">Labour</span>
            </div>
            <p className="text-lg">{totalHours.toLocaleString()} hrs</p>
          </div>
        </div>
        
        {project.description && (
          <div className="mb-6 bg-elec-dark p-4 rounded-md">
            <h3 className="text-md font-medium mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
          </div>
        )}
        
        {project.notes && (
          <div className="bg-elec-dark p-4 rounded-md">
            <h3 className="text-md font-medium mb-2">Notes</h3>
            <p className="text-muted-foreground whitespace-pre-line">{project.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
