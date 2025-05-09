
import { Button } from "@/components/ui/button";

type ProjectFiltersProps = {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
};

export const ProjectFilters = ({ filterStatus, setFilterStatus }: ProjectFiltersProps) => {
  return (
    <div className="bg-elec-gray/50 p-4 rounded-lg border border-elec-yellow/10 overflow-x-auto">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Button 
          variant={filterStatus === "all" ? "default" : "outline"}
          size="sm" 
          onClick={() => setFilterStatus("all")}
          className={filterStatus === "all" ? "bg-elec-yellow text-black hover:bg-elec-yellow/90" : ""}
        >
          All Projects
        </Button>
        <Button 
          variant={filterStatus === "planning" ? "default" : "outline"}
          size="sm" 
          onClick={() => setFilterStatus("planning")}
          className={filterStatus === "planning" ? "bg-blue-500 hover:bg-blue-600" : ""}
        >
          Planning
        </Button>
        <Button 
          variant={filterStatus === "in-progress" ? "default" : "outline"}
          size="sm" 
          onClick={() => setFilterStatus("in-progress")}
          className={filterStatus === "in-progress" ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          In Progress
        </Button>
        <Button 
          variant={filterStatus === "completed" ? "default" : "outline"}
          size="sm" 
          onClick={() => setFilterStatus("completed")}
          className={filterStatus === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
        >
          Completed
        </Button>
        <Button 
          variant={filterStatus === "on-hold" ? "default" : "outline"}
          size="sm" 
          onClick={() => setFilterStatus("on-hold")}
          className={filterStatus === "on-hold" ? "bg-red-500 hover:bg-red-600" : ""}
        >
          On Hold
        </Button>
      </div>
    </div>
  );
};
