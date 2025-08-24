
import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock, DollarSign, Edit, FileCheck, FileText, MapPin, PieChart, Trash2 } from "lucide-react";
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
  const progress = project.status === "completed" ? 100 : project.status === "in-progress" ? 
    Math.min(65, Math.floor(Math.random() * 65)) : project.status === "planning" ? 0 : 0;

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
    <Card className="min-h-[400px] flex flex-col border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 hover:shadow-md transition-all relative overflow-hidden">
      {/* Progress bar */}
      <div 
        className={`absolute top-0 left-0 h-1 ${progress === 100 ? 'bg-green-500' : 'bg-elec-yellow'}`} 
        style={{ width: `${progress}%` }}
      ></div>
      
      <CardHeader className="pb-2 space-y-3 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <Badge className={getStatusColor(project.status)}>
            {project.status.replace("-", " ")}
          </Badge>
          <div className="flex gap-1 sm:gap-1">
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(project.id); }} title="Edit Project" className="h-8 w-8 sm:h-9 sm:w-9">
              <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-elec-yellow" />
            </Button>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(project.id); }} title="Delete Project" className="h-8 w-8 sm:h-9 sm:w-9">
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg sm:text-xl leading-tight break-words">{project.name}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1 text-elec-yellow/80 flex-shrink-0" />
          <span className="truncate">{project.clientName}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 min-w-0">
            <CalendarCheck className="h-3.5 w-3.5 text-elec-yellow/80 flex-shrink-0" />
            <span className="text-muted-foreground flex-shrink-0">Start:</span>
            <span className="ml-1 truncate text-xs sm:text-sm">{startDate}</span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <CalendarCheck className="h-3.5 w-3.5 text-elec-yellow/80 flex-shrink-0" />
            <span className="text-muted-foreground flex-shrink-0">Due:</span>
            <span className="ml-1 truncate text-xs sm:text-sm">{dueDate}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
          <div className="bg-elec-dark rounded-md p-2 text-center min-w-0">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-elec-yellow" />
            </div>
            <span className="block text-xs text-muted-foreground">Budget</span>
            <span className="font-medium text-xs sm:text-sm">£{project.budget.toLocaleString()}</span>
          </div>
          
          <div className="bg-elec-dark rounded-md p-2 text-center min-w-0">
            <div className="flex items-center justify-center mb-1">
              <PieChart className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-elec-yellow" />
            </div>
            <span className="block text-xs text-muted-foreground">Materials</span>
            <span className="font-medium text-xs sm:text-sm">£{totalMaterialsCost.toLocaleString()}</span>
          </div>
          
          <div className="bg-elec-dark rounded-md p-2 text-center min-w-0 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-elec-yellow" />
            </div>
            <span className="block text-xs text-muted-foreground">Labour</span>
            <span className="font-medium text-xs sm:text-sm">{totalHours.toFixed(1)}h</span>
          </div>
        </div>
        
        {/* Certificate & Invoice Indicators */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
          {project.certificateType && project.certificateType !== "none" && (
            <Badge variant={project.certificateIssued ? "default" : "outline"} className="flex items-center gap-1 text-xs">
              <FileCheck className="h-3 w-3" />
              <span className="truncate">{project.certificateType}</span>
            </Badge>
          )}
          
          {project.invoiceIssued && (
            <Badge variant={project.invoicePaid ? "default" : "outline"} className="flex items-center gap-1 text-xs">
              <FileText className="h-3 w-3" />
              {project.invoicePaid ? "Paid" : "Invoiced"}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex-shrink-0">
        <Button 
          className="w-full bg-elec-gray border border-elec-yellow/40 hover:bg-elec-yellow hover:text-black transition-all min-h-[44px]" 
          onClick={() => onView(project.id)}
        >
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};
