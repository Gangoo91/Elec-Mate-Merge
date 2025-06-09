
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, BookOpen, Award, Clock } from "lucide-react";
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
        description: "Assessment has been added to your tracker."
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'overdue': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
            <p className="text-xs text-muted-foreground">
              Total assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(item => item.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Finished assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(item => item.status === 'in_progress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently working on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(item => item.due_date && new Date(item.due_date) > new Date() && item.status === 'not_started').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Due soon
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
                    <SelectItem value="coursework">Coursework</SelectItem>
                    <SelectItem value="portfolio_review">Portfolio Review</SelectItem>
                    <SelectItem value="observation">Workplace Observation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="unit_code">Unit Code</Label>
                <Input
                  id="unit_code"
                  placeholder="e.g. EAL-8202-01"
                  value={assessment.unit_code}
                  onChange={(e) => setAssessment(prev => ({ ...prev, unit_code: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="unit_title">Unit Title</Label>
                <Input
                  id="unit_title"
                  placeholder="e.g. Understanding electrical principles"
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

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={assessment.status} onValueChange={(value) => setAssessment(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">Not Started</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
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
                  No assessments scheduled
                </p>
              ) : (
                assessments.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.unit_code}</h4>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">{item.unit_title}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.assessment_type?.replace('_', ' ')}
                    </p>
                    {item.due_date && (
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(item.due_date).toLocaleDateString()}
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
