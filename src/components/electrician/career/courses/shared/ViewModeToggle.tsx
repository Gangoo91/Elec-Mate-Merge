import React from "react";
import { Button } from "@/components/ui/button";
import { Map, LayoutGrid } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "grid" | "map";
  setViewMode: (mode: "grid" | "map") => void;
  className?: string;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ 
  viewMode, 
  setViewMode,
  className = ""
}) => {
  return (
    <div className={`inline-flex rounded-md border border-elec-yellow/20 overflow-hidden ${className}`}>
      <Button 
        variant="ghost" 
        className={`px-3 py-1 ${viewMode === "grid" ? "bg-elec-yellow/10 text-elec-yellow" : "text-muted-foreground"}`}
        onClick={() => setViewMode("grid")}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Courses
      </Button>
      <Button 
        variant="ghost" 
        className={`px-3 py-1 ${viewMode === "map" ? "bg-elec-yellow/10 text-elec-yellow" : "text-muted-foreground"}`}
        onClick={() => setViewMode("map")}
      >
        <Map className="h-4 w-4 mr-2" />
        Providers
      </Button>
    </div>
  );
};

export default ViewModeToggle;