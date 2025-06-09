
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Plus, Calendar, Target, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AssessmentTrackingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [assessment, setAssessment] = useState({
    assessment_type: "",
    unit_code: "",
    unit_title: "",
    due_date: "",
    status: "not_started"
  });

  // Fetch assessments
  const { data: assessments = [] } = useQuery({
    queryKey: ['assessment-tracking', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('assessment_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Add assessment mutation
  const addAssessmentMutation = useMutation({
    mutationFn: async (item: typeof assessment) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('assessment_tracking')
        .insert({
          user_id: user.id,
          assessment_type: item.assessment_type,
          unit_code: item.unit_code,
          unit_title: item.unit_title,
          due_date: item.due_date,
          status: item.status
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment-tracking'] });
      setAssessment({
        assessment_type: "",
        unit_code: "",
        unit_title: "",
        due_date: "",
        status: "not_started"
      });
      setDialogOpen(false);
      toast({
        title: "Assessment Added",
        description: "Assessment has been added to your tracking list."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessment.unit_code || !assessment.unit_title) {
      toast({
        title: "Missing Information",
        description: "Please fill in unit code and title.",
        variant: "destructive"
      });
      return;
    }
    addAssessmentMutation.mutate(assessment);
  };

  const assessmentTypes = [
    "Written Assignment",
    "Practical Assessment",
    "Oral Examination",
    "Portfolio Review",
    "Workplace Assessment",
    "Project Submission"
  ];

  const statusOptions = [
    { value: "not_started", label: "Not Started", color: "text-gray-500", icon: Clock },
    { value: "in_progress", label: "In Progress", color: "text-blue-500", icon: Clock },
    { value: "submitted", label: "Submitted", color: "text-green-500", icon: CheckCircle },
    { value: "completed", label: "Completed", color: "text-green-600", icon: CheckCircle },
    { value: "overdue", label: "Overdue", color: "text-red-500", icon: AlertTriangle }
  ];

  const getStatusInfo = (status: string) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  // Calculate progress statistics
  const totalAssessments = assessments.length;
  const completedAssessments = assessments.filter(a => a.status === 'completed').length;
  const progressPercentage = totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0;

  // Upcoming assessments (next 30 days)
  const upcomingAssessments = assessments.filter(a => {
    if (!a.due_date || a.status === 'completed') return false;
    const dueDate = new Date(a.due_date);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return dueDate <= thirtyDaysFromNow;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Tracked assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssessments}</div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {progressPercentage.toFixed(0)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAssessments.length}</div>
            <p className="text-xs text-muted-foreground">
              Due within 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Assessment Tracking</h3>
          <p className="text-muted-foreground">
            Track your assessment deadlines, progress, and results
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Assessment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Assessment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit_code">Unit Code</Label>
                  <Input
                    id="unit_code"
                    placeholder="e.g. Unit 301"
                    value={assessment.unit_code}
                    onChange={(e) => setAssessment(prev => ({ ...prev, unit_code: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="assessment_type">Assessment Type</Label>
                  <Select value={assessment.assessment_type} onValueChange={(value) => setAssessment(prev => ({ ...prev, assessment_type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="unit_title">Unit Title</Label>
                <Input
                  id="unit_title"
                  placeholder="e.g. Understanding Electrical Installation Work"
                  value={assessment.unit_title}
                  onChange={(e) => setAssessment(prev => ({ ...prev, unit_title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={assessment.due_date}
                  onChange={(e) => setAssessment(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={addAssessmentMutation.isPending} className="flex-1">
                  {addAssessmentMutation.isPending ? "Adding..." : "Add Assessment"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {assessments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Assessments Tracked Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start tracking your assessments to stay organised and meet your deadlines
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          assessments.map((assessment) => {
            const statusInfo = getStatusInfo(assessment.status);
            const StatusIcon = statusInfo.icon;
            const isOverdue = assessment.due_date && new Date(assessment.due_date) < new Date() && assessment.status !== 'completed';
            
            return (
              <Card key={assessment.id} className={isOverdue ? "border-red-300" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {assessment.unit_code}: {assessment.unit_title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{assessment.assessment_type}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{statusInfo.label}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    {assessment.due_date && (
                      <div className="text-sm">
                        <span className="font-medium">Due: </span>
                        <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                          {new Date(assessment.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {assessment.grade && (
                      <div className="text-sm">
                        <span className="font-medium">Grade: </span>
                        <span>{assessment.grade}</span>
                      </div>
                    )}
                  </div>
                  {assessment.feedback && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium">Feedback: </span>
                      {assessment.feedback}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AssessmentTrackingTab;
