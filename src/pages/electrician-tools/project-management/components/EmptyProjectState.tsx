
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Plus } from "lucide-react";

type EmptyProjectStateProps = {
  onCreateProject: () => void;
};

export const EmptyProjectState = ({ onCreateProject }: EmptyProjectStateProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-0">
        <div className="bg-elec-dark py-16 px-8 rounded-lg flex flex-col items-center justify-center text-center">
          <FileSpreadsheet className="h-16 w-16 text-elec-yellow mb-4 opacity-80" />
          <h3 className="text-2xl font-medium mb-2">No Projects Yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Create your first project to start tracking time, materials, and client details for your electrical work.
          </p>
          <Button onClick={onCreateProject} size="lg" className="flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
            <Plus className="h-4 w-4" /> Create New Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
