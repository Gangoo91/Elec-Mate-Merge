
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TimeEntryForm from "../TimeEntryForm";

interface LogbookEmptyStateProps {
  onAddEntry: (duration: number, activity: string, notes: string) => void;
}

const LogbookEmptyState = ({ onAddEntry }: LogbookEmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-elec-yellow/20 bg-elec-dark">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <h3 className="text-xl font-medium mb-2">No entries found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          No training entries found for the selected period. Start by adding your first training activity.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Log Your First Training Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log Training Hours</DialogTitle>
            </DialogHeader>
            <TimeEntryForm onAddEntry={onAddEntry} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default LogbookEmptyState;
