
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { TimeEntryDialog } from "./TimeEntryDialog";
import { useToast } from "@/components/ui/use-toast";

interface LogbookHeaderProps {
  filterMonth: string;
  months: string[];
  setFilterMonth: (month: string) => void;
  onAddEntry: (duration: number, activity: string, notes: string) => void;
  onClearAllEntries?: () => void;
}

const LogbookHeader = ({ 
  filterMonth, 
  months, 
  setFilterMonth, 
  onAddEntry,
  onClearAllEntries 
}: LogbookHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleAdd = (duration: number, activity: string, notes: string) => {
    onAddEntry(duration, activity, notes);
    setIsDialogOpen(false);
    
    toast({
      title: "Entry Added",
      description: "Your training entry has been logged.",
    });
  };
  
  const handleClearEntries = () => {
    if (onClearAllEntries) {
      onClearAllEntries(); // This will now properly clear entries and set a flag
      setIsAlertOpen(false);
      
      toast({
        title: "Entries Cleared",
        description: filterMonth === "all" 
          ? "All entries have been deleted from your logbook." 
          : `All entries for ${formatMonthDisplay(filterMonth)} have been deleted.`,
        variant: "destructive"
      });
      
      // After deleting, store in localStorage that we've deleted the entries
      localStorage.setItem('entries_cleared', 'true');
      localStorage.setItem('entries_cleared_timestamp', Date.now().toString());
    }
  };
  
  const formatMonthDisplay = (monthStr: string) => {
    if (monthStr === "all") return "All Time";
    
    try {
      const [year, month] = monthStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      return monthStr;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Training Logbook</h2>
      </div>
      
      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
        <Select value={filterMonth} onValueChange={setFilterMonth}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            {months.map(month => (
              <SelectItem key={month} value={month}>
                {formatMonthDisplay(month)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            onClick={() => setIsDialogOpen(true)}
            className="flex-1 sm:flex-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Entry
          </Button>
          
          {onClearAllEntries && (
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  className="flex-1 sm:flex-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {filterMonth === "all" 
                      ? "This will permanently delete all entries from your training logbook." 
                      : `This will permanently delete all entries for ${formatMonthDisplay(filterMonth)}.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearEntries}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      
      <TimeEntryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default LogbookHeader;
