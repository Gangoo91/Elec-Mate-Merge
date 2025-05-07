
import React from "react";
import { Button } from "@/components/ui/button";
import { List, MapPin } from "lucide-react";

interface ViewModeSwitcherProps {
  viewMode: "list" | "map";
  setViewMode: (mode: "list" | "map") => void;
}

const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({ 
  viewMode, 
  setViewMode 
}) => {
  return (
    <div className="mt-3 flex justify-end">
      <div className="inline-flex rounded-md border border-elec-yellow/20 overflow-hidden">
        <Button 
          variant="ghost" 
          className={`px-3 py-1 ${viewMode === "list" ? "bg-elec-yellow/10" : ""}`}
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4 mr-2" />
          List View
        </Button>
        <Button 
          variant="ghost" 
          className={`px-3 py-1 ${viewMode === "map" ? "bg-elec-yellow/10" : ""}`}
          onClick={() => setViewMode("map")}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>
    </div>
  );
};

export default ViewModeSwitcher;
