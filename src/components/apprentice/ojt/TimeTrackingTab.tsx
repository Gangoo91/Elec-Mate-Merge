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
  notes?: string;
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

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(20);

      if (error) throw error;

      const entries: TimeEntry[] = (data || []).map(entry => ({
        id: entry.id,
        date: entry.date,
        duration: entry.duration,
        activity: entry.activity,
        notes: entry.notes,
        is_automatic: entry.is_automatic
      }));

      setTimeEntries(entries);
      
      // Calculate total hours for current week
      const currentWeekStart = new Date();
      currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
      const weekEntries = entries.filter(entry => 
        new Date(entry.date) >= currentWeekStart
      );
      const weeklyHours = weekEntries.reduce((sum, entry) => sum + (entry.duration / 60), 0);
      setTotalHours(weeklyHours);
      
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-8 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weekly Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{totalHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              Target: {weeklyTarget}h per week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{weeklyProgress.toFixed(0)}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Hours</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{remainingHours.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              To reach weekly target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Time Entries */}
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Training Sessions
            </CardTitle>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/80 w-full md:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Time Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No time entries yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start logging your off-the-job training hours to track your progress
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{entry.activity}</h4>
                      {entry.is_automatic && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Auto-tracked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-GB')} • {(entry.duration / 60).toFixed(1)} hours
                    </p>
                    {entry.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{entry.duration}m</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            20% Off-the-Job Training Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">What Counts as Off-the-Job Training?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• College/training provider sessions</li>
                <li>• Online learning modules</li>
                <li>• Mentoring and coaching</li>
                <li>• Skills workshops</li>
                <li>• Assessment preparation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Weekly Target Breakdown</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full-time (37.5h): 7.5h per week</li>
                <li>• Part-time (30h): 6h per week</li>
                <li>• Document all training activities</li>
                <li>• Include reflection notes</li>
              </ul>
            </div>
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
