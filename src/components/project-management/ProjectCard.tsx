
import { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Edit, Trash2, FileText, ClipboardCheck } from "lucide-react";
import { format } from "date-fns";

type ProjectCardProps = {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

export const ProjectCard = ({ project, onEdit, onDelete, onView }: ProjectCardProps) => {
  // Format dates
  const startDate = project.startDate ? format(new Date(project.startDate), "dd MMM yyyy") : "Not set";
  const dueDate = project.dueDate ? format(new Date(project.dueDate), "dd MMM yyyy") : "Not set";
  
  // Calculate project statistics
  const totalMaterialsCost = project.materials.reduce((sum, item) => sum + item.total, 0);
  const totalHours = project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

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

  // Get priority badge
  const getPriorityBadge = () => {
    if (!project.priority) return null;
    
    const priorityColors = {
      low: "bg-blue-200 text-blue-800",
      medium: "bg-green-200 text-green-800",
      high: "bg-amber-200 text-amber-800",
      urgent: "bg-red-200 text-red-800"
    };
    
    return (
      <Badge className={priorityColors[project.priority]}>
        {project.priority}
      </Badge>
    );
  };

  return (
    <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/30 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(project.id)} title="Edit Project">
              <Edit className="h-4 w-4 text-elec-yellow" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(project.id)} title="Delete Project">
              <Trash2 className="h-4 w-4 text-red-400" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription>
          Client: {project.clientName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-4 w-4 text-elec-yellow" />
            <span>Start: {startDate}</span>
          </div>
          {project.dueDate && (
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-elec-yellow" />
              <span>Due: {dueDate}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {getPriorityBadge()}
            
            {project.certificateType && project.certificateType !== "none" && (
              <Badge variant={project.certificateIssued ? "default" : "outline"} className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {project.certificateType}
              </Badge>
            )}
            
            {project.invoiceIssued && (
              <Badge variant={project.invoicePaid ? "gold" : "outline"} className="flex items-center gap-1">
                <ClipboardCheck className="h-3 w-3" />
                {project.invoicePaid ? "Paid" : "Invoiced"}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-elec-dark p-2 rounded">
              <p className="text-xs text-muted-foreground">Materials</p>
              <p className="font-medium">£{totalMaterialsCost.toFixed(2)}</p>
            </div>
            <div className="bg-elec-dark p-2 rounded">
              <p className="text-xs text-muted-foreground">Labour</p>
              <p className="font-medium">{totalHours.toFixed(1)} hrs</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button className="w-full" onClick={() => onView(project.id)}>
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};
