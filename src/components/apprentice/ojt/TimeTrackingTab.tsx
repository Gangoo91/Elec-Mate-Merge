
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Target, TrendingUp, Award, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TimeEntryDialog from "@/components/apprentice/time-tracking/logbook/TimeEntryDialog";

interface TimeEntry {
  id: string;
  date: string;
  duration: number;
  activity: string;
  notes: string;
  is_automatic: boolean;
}

const TimeTrackingTab = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [weeklyTarget] = useState(7.5); // 20% of 37.5 hour working week
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const fetchTimeEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current week's entries
      const currentWeekStart = new Date();
      currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
      const weekStartStr = currentWeekStart.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', weekStartStr)
        .order('date', { ascending: false });

      if (error) throw error;

      const entries: TimeEntry[] = (data || []).map(entry => ({
        id: entry.id,
        date: entry.date,
        duration: entry.duration,
        activity: entry.activity,
        notes: entry.notes || '',
        is_automatic: entry.is_automatic || false
      }));

      setTimeEntries(entries);

      // Calculate total hours for the week
      const totalMinutes = entries.reduce((sum, entry) => sum + entry.duration, 0);
      setTotalHours(totalMinutes / 60);

    } catch (error) {
      console.error('Error fetching time entries:', error);
      toast({
        title: "Error",
        description: "Failed to load time entries",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTimeEntry = async (duration: number, activity: string, notes: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add time entries",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          duration: duration,
          activity: activity,
          notes: notes,
          is_automatic: false
        })
        .select('*')
        .single();

      if (error) throw error;

      // Add the new entry to the state
      const newEntry: TimeEntry = {
        id: data.id,
        date: data.date,
        duration: data.duration,
        activity: data.activity,
        notes: data.notes,
        is_automatic: data.is_automatic
      };

      setTimeEntries(prev => [newEntry, ...prev]);

      // Update weekly hours if the entry is from this week
      const currentWeekStart = new Date();
      currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
      if (new Date(newEntry.date) >= currentWeekStart) {
        setTotalHours(prev => prev + (duration / 60));
      }

      setIsDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Time entry added successfully",
      });
      
    } catch (error) {
      console.error('Error adding time entry:', error);
      toast({
        title: "Error",
        description: "Failed to add time entry",
        variant: "destructive"
      });
    }
  };

  const weeklyProgress = Math.min((totalHours / weeklyTarget) * 100, 100);
  const remainingHours = Math.max(weeklyTarget - totalHours, 0);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weekly Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              of {weeklyTarget}h target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(weeklyProgress)}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              to reach weekly target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge 
              variant={weeklyProgress >= 100 ? "default" : weeklyProgress >= 75 ? "secondary" : "outline"}
              className="text-sm"
            >
              {weeklyProgress >= 100 ? "Target Met" : weeklyProgress >= 75 ? "On Track" : "Behind"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Training Sessions
            </CardTitle>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Time Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No time entries for this week yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeEntries.map((entry) => (
                <div 
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{entry.activity}</h4>
                      {entry.is_automatic && (
                        <Badge variant="outline" className="text-xs">
                          Auto
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Hours Logged:</span>
              <span className="font-medium">{totalHours.toFixed(1)}h</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Weekly Target:</span>
              <span className="font-medium">{weeklyTarget}h</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Progress:</span>
              <span className="font-medium">{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="mt-2" />
            {weeklyProgress >= 100 ? (
              <p className="text-sm text-green-600">
                🎉 Congratulations! You've met your weekly off-the-job training target.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                You need {remainingHours.toFixed(1)} more hours to reach your weekly target.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time Entry Dialog */}
      <TimeEntryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddTimeEntry}
      />
    </div>
  );
};

export default TimeTrackingTab;
