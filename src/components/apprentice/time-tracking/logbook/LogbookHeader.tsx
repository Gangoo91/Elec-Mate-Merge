
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
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
import { useState } from "react";

interface LogbookHeaderProps {
  filterMonth: string;
  setFilterMonth: (month: string) => void;
  months: string[];
  onAddEntry: (duration: number, activity: string, notes: string) => void;
  onClearAllEntries?: () => void;
}

const LogbookHeader = ({ 
  filterMonth, 
  setFilterMonth, 
  months,
  onAddEntry,
  onClearAllEntries
}: LogbookHeaderProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  
  const formatMonthLabel = (monthStr: string) => {
    if (monthStr === "all") return "All Time";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return format(date, "MMMM yyyy");
  };

  const handleClearAll = () => {
    if (onClearAllEntries) {
      onClearAllEntries();
    }
    setAlertOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">Digital Logbook</h3>
        <div className="flex items-center">
          <span className="text-muted-foreground mr-2">View:</span>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-[180px] bg-elec-dark">
              <SelectValue>
                {filterMonth === "all" ? "All Time" : formatMonthLabel(filterMonth)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-elec-dark">
              <SelectItem value="all">All Time</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {formatMonthLabel(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button 
          onClick={() => onAddEntry(60, "Manual Entry", "")}
          className="flex-1 sm:flex-auto"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
        
        {onClearAllEntries && (
          <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                size="icon"
                className="flex-none"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-elec-dark border-elec-yellow/20">
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all entries?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all time entries 
                  {filterMonth !== "all" ? ` for ${formatMonthLabel(filterMonth)}` : ""}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-elec-gray text-white hover:bg-elec-gray/80">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleClearAll} 
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default LogbookHeader;
