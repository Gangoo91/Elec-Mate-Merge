
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const DigitalLogbook = () => {
  const { entries, totalTime } = useTimeEntries();
  const { toast } = useToast();
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editedDuration, setEditedDuration] = useState<number>(0);
  const [editedActivity, setEditedActivity] = useState<string>("");
  const [editedNotes, setEditedNotes] = useState<string>("");
  const [filterMonth, setFilterMonth] = useState<string>("all");
  
  // Get unique months from entries
  const months = [...new Set(entries.map(entry => {
    const date = new Date(entry.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }))];

  // Filter entries based on selected month
  const filteredEntries = filterMonth === "all" 
    ? entries 
    : entries.filter(entry => {
        const date = new Date(entry.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}` === filterMonth;
      });

  // Group entries by date for the logbook view
  const groupedEntries = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const handleEdit = (entry: any) => {
    setEditingEntryId(entry.id);
    setEditedDuration(entry.duration);
    setEditedActivity(entry.activity);
    setEditedNotes(entry.notes);
  };

  const handleSave = (entryId: string) => {
    // In a real implementation, this would update the entry in the database
    toast({
      title: "Entry updated",
      description: "Your time entry has been updated successfully.",
    });
    setEditingEntryId(null);
  };

  const handleDelete = (entryId: string) => {
    // In a real implementation, this would delete the entry from the database
    toast({
      title: "Entry deleted",
      description: "Your time entry has been deleted.",
      variant: "destructive"
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Digital Logbook</h3>
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

      {Object.keys(groupedEntries).length === 0 ? (
        <div className="text-center p-10">
          <p className="text-muted-foreground">No entries found for the selected period.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEntries)
            .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
            .map(([date, dayEntries]) => (
              <div key={date} className="space-y-2">
                <h4 className="font-medium text-elec-yellow">{formatDate(date)}</h4>
                <Card className="border-elec-yellow/10 bg-elec-dark">
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-elec-yellow/10 text-xs text-muted-foreground">
                          <th className="text-left p-3">Activity</th>
                          <th className="text-center p-3">Duration</th>
                          <th className="text-left hidden md:table-cell p-3">Notes</th>
                          <th className="text-right p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-elec-yellow/10">
                        {dayEntries.map((entry) => (
                          <tr key={entry.id} className={entry.isAutomatic ? "bg-elec-yellow/5" : ""}>
                            {editingEntryId === entry.id ? (
                              <>
                                <td className="p-3">
                                  <Input 
                                    value={editedActivity}
                                    onChange={(e) => setEditedActivity(e.target.value)}
                                    className="w-full bg-elec-gray"
                                    disabled={entry.isAutomatic}
                                  />
                                </td>
                                <td className="p-3 text-center">
                                  <Input 
                                    type="number"
                                    value={editedDuration}
                                    onChange={(e) => setEditedDuration(parseInt(e.target.value) || 0)}
                                    className="w-full bg-elec-gray text-center"
                                    disabled={entry.isAutomatic}
                                  />
                                </td>
                                <td className="p-3 hidden md:table-cell">
                                  <Input 
                                    value={editedNotes}
                                    onChange={(e) => setEditedNotes(e.target.value)}
                                    className="w-full bg-elec-gray"
                                    disabled={entry.isAutomatic}
                                  />
                                </td>
                                <td className="p-3 text-right">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleSave(entry.id)}
                                    disabled={entry.isAutomatic}
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="p-3">
                                  {entry.activity}
                                </td>
                                <td className="p-3 text-center">
                                  {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                                </td>
                                <td className="p-3 hidden md:table-cell">
                                  <div className="line-clamp-1">{entry.notes}</div>
                                </td>
                                <td className="p-3 text-right">
                                  {!entry.isAutomatic && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleEdit(entry)}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleDelete(entry.id)}
                                        className="text-red-400 hover:text-red-300"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DigitalLogbook;
