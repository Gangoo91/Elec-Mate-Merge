import { Button } from "@/components/ui/button";
import { Save, FolderOpen } from "lucide-react";
import { InstallPlanDataV2 } from "./types";
import { useToast } from "@/hooks/use-toast";

interface SaveManagerProps {
  planData: InstallPlanDataV2;
  onLoad: (data: InstallPlanDataV2) => void;
}

export const SaveManager = ({ planData, onLoad }: SaveManagerProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    try {
      const dataToSave = {
        ...planData,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('install-planner-v2', JSON.stringify(dataToSave));
      toast({
        title: "Saved",
        description: "Your plan has been saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save plan",
        variant: "destructive"
      });
    }
  };

  const handleLoad = () => {
    try {
      const saved = localStorage.getItem('install-planner-v2');
      if (saved) {
        const data = JSON.parse(saved);
        onLoad(data);
        toast({
          title: "Loaded",
          description: "Your saved plan has been loaded"
        });
      } else {
        toast({
          title: "No saved data",
          description: "No previously saved plan found"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load plan",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleSave} className="gap-2">
        <Save className="h-4 w-4" /> Save
      </Button>
      <Button variant="outline" size="sm" onClick={handleLoad} className="gap-2">
        <FolderOpen className="h-4 w-4" /> Load
      </Button>
    </div>
  );
};
