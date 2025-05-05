
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TimeEntryForm from "../TimeEntryForm";

interface LogbookHeaderProps {
  filterMonth: string;
  setFilterMonth: (value: string) => void;
  months: string[];
  onAddEntry: (duration: number, activity: string, notes: string) => void;
}

const LogbookHeader = ({ filterMonth, setFilterMonth, months, onAddEntry }: LogbookHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-lg font-semibold">Digital Logbook</h3>
        <p className="text-sm text-muted-foreground">
          View, edit and manage all your training activities
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1 mb-2 sm:mb-0">
              <Plus className="h-4 w-4" />
              Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Log Training Hours</DialogTitle>
            </DialogHeader>
            <TimeEntryForm onAddEntry={onAddEntry} />
          </DialogContent>
        </Dialog>
        
        <div className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap">Filter by month:</span>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All entries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All entries</SelectItem>
              {months.map((month) => {
                const [year, monthNum] = month.split('-');
                const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' });
                return (
                  <SelectItem key={month} value={month}>
                    {monthName} {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LogbookHeader;
