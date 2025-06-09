
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AssessmentTrackingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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
          ...item
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
      toast({
        title: "Assessment Added",
        description: "Assessment has been added to your tracking list."
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessment.unit_code || !assessment.unit_title || !assessment.assessment_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields.",
        variant: "destructive"
      });
      return;
    }
    addAssessmentMutation.mutate(assessment);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in_progress':
        return 'text-blue-500';
      case 'overdue':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Calculate progress
  const totalAssessments = assessments.length;
  const completedAssessments = assessments.filter(a => a.status === 'completed').length;
  const progressPercentage = totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssessments}</div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedAssessments} completed
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
            <p className="text-xs text-muted-foreground">
              Assessments passed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(a => a.status === 'in_progress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(a => {
                if (!a.due_date) return false;
                const dueDate = new Date(a.due_date);
                const today = new Date();
                const twoWeeks = new Date();
                twoWeeks.setDate(today.getDate() + 14);
                return dueDate >= today && dueDate <= twoWeeks && a.status !== 'completed';
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Due within 2 weeks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Add Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="assessment_type">Assessment Type</Label>
                <Select value={assessment.assessment_type} onValueChange={(value) => setAssessment(prev => ({ ...prev, assessment_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="written_exam">Written Exam</SelectItem>
                    <SelectItem value="practical_assessment">Practical Assessment</SelectItem>
                    <SelectItem value="portfolio_review">Portfolio Review</SelectItem>
                    <SelectItem value="professional_discussion">Professional Discussion</SelectItem>
                    <SelectItem value="observation">Workplace Observation</SelectItem>
                    <SelectItem value="end_point_assessment">End Point Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
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
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={assessment.due_date}
                    onChange={(e) => setAssessment(prev => ({ ...prev, due_date: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="unit_title">Unit Title</Label>
                <Input
                  id="unit_title"
                  placeholder="e.g. Understanding Health and Safety in Construction"
                  value={assessment.unit_title}
                  onChange={(e) => setAssessment(prev => ({ ...prev, unit_title: e.target.value }))}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={addAssessmentMutation.isPending}>
                {addAssessmentMutation.isPending ? "Adding..." : "Add Assessment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Assessment Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {assessments.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No assessments scheduled yet
                </p>
              ) : (
                assessments.map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{assessment.unit_code}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(assessment.status)}
                        <span className={`text-sm capitalize ${getStatusColor(assessment.status)}`}>
                          {assessment.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">{assessment.unit_title}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {assessment.assessment_type.replace('_', ' ')}
                    </p>
                    {assessment.due_date && (
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(assessment.due_date).toLocaleDateString()}
                      </p>
                    )}
                    {assessment.grade && (
                      <p className="text-sm font-medium text-green-600 mt-1">
                        Grade: {assessment.grade}
                      </p>
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

export default AssessmentTrackingTab;
