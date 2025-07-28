
import { useState } from "react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import TimeEntryForm from "@/components/apprentice/time-tracking/TimeEntryForm";
import EntriesList from "@/components/apprentice/time-tracking/EntriesList";
import LiveTrackingPanel from "@/components/apprentice/time-tracking/LiveTrackingPanel";
import ComplianceTracker from "@/components/apprentice/time-tracking/ComplianceTracker";
import CollapsibleRecentSessions from "@/components/apprentice/time-tracking/CollapsibleRecentSessions";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { PlusCircle, FolderPlus } from "lucide-react";
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

  const handleAddToPortfolio = (sessionId: string) => {
    // This would navigate to portfolio creation with pre-filled session data
    console.log('Add session to portfolio:', sessionId);
    // Could implement navigation to portfolio with session data
  };

  // Mobile specific layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Live Tracking Panel */}
        <LiveTrackingPanel />
        
        {/* Compliance Tracker */}
        <ComplianceTracker />
        
        {/* Recent Sessions - Collapsible */}
        <CollapsibleRecentSessions onAddToPortfolio={handleAddToPortfolio} />
        
        {/* Recent Entries - Traditional time entries */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-elec-light mb-2">Manual Time Entries</h3>
          <EntriesList entries={recentEntries} isLoading={isLoading} />
        </div>
        
        {/* Fixed button at the bottom */}
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
              size="icon"
            >
              <PlusCircle className="h-8 w-8" />
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
      {/* Live Tracking Panel */}
      <LiveTrackingPanel />
      
      {/* Compliance Tracker */}
      <ComplianceTracker />
      
      {/* Recent Sessions - Collapsible */}
      <CollapsibleRecentSessions onAddToPortfolio={handleAddToPortfolio} />
      
      {!showForm ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowForm(true)}
              className="flex-1"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Manual Entry
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAddToPortfolio("manual")}
              className="px-3"
            >
              <FolderPlus className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-elec-light mb-3">Manual Time Entries</h3>
            <EntriesList entries={recentEntries} isLoading={isLoading} />
          </div>
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
