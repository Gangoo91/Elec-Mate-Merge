
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, Plus, Calendar, BookOpen, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TimeTrackingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  
  const [timeEntry, setTimeEntry] = useState({
    duration: "",
    activity: "",
    notes: "",
    date: new Date().toISOString().split('T')[0]
  });

  // Fetch time entries
  const { data: timeEntries = [] } = useQuery({
    queryKey: ['time-entries', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Add time entry mutation
  const addTimeEntryMutation = useMutation({
    mutationFn: async (entry: typeof timeEntry) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          user_id: user.id,
          duration: parseInt(entry.duration) * 60, // Convert hours to minutes
          activity: entry.activity,
          notes: entry.notes,
          date: entry.date,
          is_automatic: false
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
      setTimeEntry({
        duration: "",
        activity: "",
        notes: "",
        date: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Time Entry Added",
        description: "Your training time has been logged successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add time entry. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeEntry.duration || !timeEntry.activity) {
      toast({
        title: "Missing Information",
        description: "Please fill in duration and activity.",
        variant: "destructive"
      });
      return;
    }
    addTimeEntryMutation.mutate(timeEntry);
  };

  // Calculate weekly hours (last 7 days)
  const weeklyHours = timeEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    })
    .reduce((total, entry) => total + (entry.duration / 60), 0);

  const targetWeeklyHours = 8; // 20% of 40 hours
  const weeklyProgress = Math.min((weeklyHours / targetWeeklyHours) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              Target: {targetWeeklyHours}h
            </p>
            <Progress value={weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logged</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeEntries.reduce((total, entry) => total + (entry.duration / 60), 0).toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              All time entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entries</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.length}</div>
            <p className="text-xs text-muted-foreground">
              Total logged sessions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Log Training Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={timeEntry.date}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="e.g. 2.5"
                    value={timeEntry.duration}
                    onChange={(e) => setTimeEntry(prev => ({ ...prev, duration: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="activity">Training Activity</Label>
                <Input
                  id="activity"
                  placeholder="e.g. Online learning module, Workshop attendance"
                  value={timeEntry.activity}
                  onChange={(e) => setTimeEntry(prev => ({ ...prev, activity: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details about the training session..."
                  value={timeEntry.notes}
                  onChange={(e) => setTimeEntry(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={addTimeEntryMutation.isPending}>
                {addTimeEntryMutation.isPending ? "Adding..." : "Log Time Entry"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {timeEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No time entries recorded yet
                </p>
              ) : (
                timeEntries.slice(0, 10).map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{entry.activity}</h4>
                      <span className="text-sm text-muted-foreground">
                        {(entry.duration / 60).toFixed(1)}h
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeTrackingTab;
