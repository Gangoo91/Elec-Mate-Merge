
import { useState } from "react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import TimeEntryForm from "@/components/apprentice/time-tracking/TimeEntryForm";
import EntriesList from "@/components/apprentice/time-tracking/EntriesList";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const TimeTracker = () => {
  const { entries, addTimeEntry, isLoading } = useTimeEntries();
  const [showForm, setShowForm] = useState(false);
  const isMobile = useIsMobile();
  
  // Get recent entries - last 5 days
  const recentEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleAddEntry = (duration: number, activity: string, notes: string) => {
    addTimeEntry(duration, activity, notes);
    setShowForm(false);
  };

  // Mobile specific layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Recent Entries section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Recent</h3>
          <EntriesList entries={recentEntries} isLoading={isLoading} />
        </div>
        
        {/* Fixed button at the bottom */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-20 right-4 rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
              size="icon"
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Training Hours</DialogTitle>
            </DialogHeader>
            <TimeEntryForm onAddEntry={handleAddEntry} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="space-y-6">
      {!showForm ? (
        <div className="space-y-4">
          <Button 
            onClick={() => setShowForm(true)}
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
          <EntriesList entries={recentEntries} isLoading={isLoading} />
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add Training Hours</h3>
          <TimeEntryForm
            onAddEntry={handleAddEntry}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TimeTracker;
