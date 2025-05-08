
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ProjectTimeEntry } from "@/types/project";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

type TimeEntryFormProps = {
  onAddTimeEntry: (entry: ProjectTimeEntry) => void;
};

export const TimeEntryForm = ({ onAddTimeEntry }: TimeEntryFormProps) => {
  const [newTimeEntry, setNewTimeEntry] = useState<Omit<ProjectTimeEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    hours: 1,
    description: ''
  });

  const handleAddTimeEntry = () => {
    if (!newTimeEntry.description) {
      toast({
        title: "Description Required",
        description: "Please provide a description for the time entry.",
        variant: "destructive",
      });
      return;
    }

    const timeEntry: ProjectTimeEntry = {
      id: uuidv4(),
      date: newTimeEntry.date,
      hours: newTimeEntry.hours,
      description: newTimeEntry.description
    };

    onAddTimeEntry(timeEntry);

    // Reset form
    setNewTimeEntry({
      date: new Date().toISOString().split('T')[0],
      hours: 1,
      description: ''
    });

    toast({
      title: "Time Entry Added",
      description: "Your time entry has been added to the project.",
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-lg">Add Time Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryDate">Date</Label>
            <Input 
              id="entryDate" 
              type="date" 
              value={newTimeEntry.date} 
              onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: e.target.value })} 
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input 
              id="hours" 
              type="number" 
              min="0.5"
              step="0.5"
              value={newTimeEntry.hours} 
              onChange={(e) => setNewTimeEntry({ ...newTimeEntry, hours: parseFloat(e.target.value) || 0 })} 
              className="w-full"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="flex gap-2">
              <Input 
                id="description" 
                value={newTimeEntry.description} 
                onChange={(e) => setNewTimeEntry({ ...newTimeEntry, description: e.target.value })} 
                placeholder="What work did you do?"
                className="flex-grow"
              />
              <Button 
                onClick={handleAddTimeEntry} 
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
