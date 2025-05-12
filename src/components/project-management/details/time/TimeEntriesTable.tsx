
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProjectTimeEntry } from "@/types/project";
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

type TimeEntriesTableProps = {
  timeEntries: ProjectTimeEntry[];
  onDeleteTimeEntry: (id: string) => void;
  onDeleteAllTimeEntries?: () => void;
};

export const TimeEntriesTable = ({ 
  timeEntries, 
  onDeleteTimeEntry,
  onDeleteAllTimeEntries 
}: TimeEntriesTableProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

  const handleDeleteAll = () => {
    if (onDeleteAllTimeEntries) {
      onDeleteAllTimeEntries();
      setAlertOpen(false);
    }
  };

  if (timeEntries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No time entries added yet.</p>
      </div>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                className="text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Delete All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-elec-dark border-elec-yellow/20">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all time entries?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All time entries for this project will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-elec-gray text-white hover:bg-elec-gray/80">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAll} 
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-elec-yellow/20">
              <tr>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-right pb-2">Hours</th>
                <th className="text-right pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {timeEntries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((entry) => (
                  <tr key={entry.id} className="border-b border-elec-yellow/10">
                    <td className="py-3">{format(new Date(entry.date), "dd MMM yyyy")}</td>
                    <td className="py-3">{entry.description}</td>
                    <td className="py-3 text-right">{entry.hours.toFixed(1)}</td>
                    <td className="py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onDeleteTimeEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr className="border-t border-elec-yellow/20">
                <td colSpan={2} className="py-3 text-right font-medium">Total Hours:</td>
                <td className="py-3 text-right font-bold">{totalHours.toFixed(1)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
