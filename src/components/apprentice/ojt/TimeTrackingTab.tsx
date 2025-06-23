
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, AlertCircle, Clock4, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TimeEntry } from "@/types/time-tracking";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import TimeEntryForm from "../time-tracking/TimeEntryForm";
import EntriesList from "../time-tracking/EntriesList";

interface TimeEntryApproval {
  id: string;
  time_entry_id: string;
  status: 'pending' | 'approved' | 'rejected';
  tutor_comments?: string;
  submitted_at: string;
  reviewed_at?: string;
}

const TimeTrackingTab = () => {
  const { entries, totalTime, addTimeEntry, isLoading } = useTimeEntries();
  const [approvals, setApprovals] = useState<TimeEntryApproval[]>([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const { toast } = useToast();

  const fetchApprovals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('time_entry_approvals')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setApprovals(data || []);
    } catch (error) {
      console.error('Error fetching approvals:', error);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAddEntry = async (duration: number, activity: string, notes: string) => {
    await addTimeEntry(duration, activity, notes);
    setShowEntryForm(false);
    toast({
      title: "Entry Added",
      description: "Your time entry has been recorded and is pending approval"
    });
  };

  const submitForApproval = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('time_entry_approvals')
        .insert({
          time_entry_id: entryId,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Submitted for Approval",
        description: "Your time entry has been submitted to your tutor for approval"
      });

      fetchApprovals();
    } catch (error) {
      console.error('Error submitting for approval:', error);
      toast({
        title: "Error",
        description: "Failed to submit for approval",
        variant: "destructive"
      });
    }
  };

  // Calculate statistics
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  
  const approvedEntries = entries.filter(entry => {
    const approval = approvals.find(a => a.time_entry_id === entry.id);
    return approval?.status === 'approved';
  });
  
  const pendingEntries = entries.filter(entry => {
    const approval = approvals.find(a => a.time_entry_id === entry.id);
    return approval?.status === 'pending';
  });

  const approvedMinutes = approvedEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const approvedHours = Math.floor(approvedMinutes / 60);

  // Calculate weekly target (20% of 37.5 hours = 7.5 hours = 450 minutes)
  const weeklyTargetMinutes = 450;
  const weeklyProgress = Math.min((approvedMinutes / weeklyTargetMinutes) * 100, 100);

  const getApprovalStatus = (entryId: string) => {
    const approval = approvals.find(a => a.time_entry_id === entryId);
    return approval?.status || 'not_submitted';
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <Clock className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Logged</p>
                <p className="text-2xl font-bold">{totalHours}h {remainingMinutes}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedHours}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Clock4 className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingEntries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Progress</p>
                <p className="text-2xl font-bold">{Math.round(weeklyProgress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entries" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entries">Time Entries</TabsTrigger>
          <TabsTrigger value="approvals">Approval Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="entries">
          <Card className="bg-elec-gray/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  Time Tracking
                </CardTitle>
                <Button 
                  onClick={() => setShowEntryForm(!showEntryForm)}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                >
                  {showEntryForm ? 'Cancel' : 'Add Entry'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showEntryForm && (
                <div className="mb-6 p-4 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
                  <TimeEntryForm 
                    onAddEntry={handleAddEntry}
                    onCancel={() => setShowEntryForm(false)}
                  />
                </div>
              )}
              
              <EntriesList entries={entries} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card className="bg-elec-gray/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Approval Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.map((entry) => {
                  const approvalStatus = getApprovalStatus(entry.id);
                  const approval = approvals.find(a => a.time_entry_id === entry.id);
                  
                  return (
                    <div key={entry.id} className="p-4 border border-elec-gray/40 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{entry.activity}</h4>
                          <p className="text-sm text-muted-foreground">
                            {entry.duration} minutes • {entry.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getApprovalColor(approvalStatus)}>
                            {approvalStatus.replace('_', ' ')}
                          </Badge>
                          {approvalStatus === 'not_submitted' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => submitForApproval(entry.id)}
                            >
                              Submit for Approval
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {entry.notes && (
                        <p className="text-sm text-muted-foreground mb-2">{entry.notes}</p>
                      )}
                      
                      {approval?.tutor_comments && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                          <p className="text-sm">
                            <span className="font-medium">Tutor Feedback: </span>
                            {approval.tutor_comments}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-elec-gray/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-elec-yellow" />
                Analytics & Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Weekly Progress Tracking</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Approved Hours This Week</span>
                      <span>{approvedHours}h / 7.5h</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
                        style={{ width: `${weeklyProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You need 7.5 hours per week (20% of working time)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Activity Breakdown</h3>
                  <div className="space-y-2">
                    {/* Add activity breakdown here */}
                    <div className="text-sm text-muted-foreground">
                      Activity breakdown will be calculated based on your entries
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeTrackingTab;
