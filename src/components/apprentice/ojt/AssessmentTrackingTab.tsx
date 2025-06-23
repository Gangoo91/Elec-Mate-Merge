
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Plus, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import AddAssessmentDialog from "./AddAssessmentDialog";

interface Assessment {
  id: string;
  title: string;
  type: string;
  due_date: string;
  status: string;
  grade?: string;
  feedback?: string;
  created_at: string;
}

const AssessmentTrackingTab = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  const fetchAssessments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ojt_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: "Error",
        description: "Failed to load assessments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleAddAssessment = async (assessmentData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('ojt_assessments')
        .insert({
          user_id: user.id,
          title: assessmentData.title,
          type: assessmentData.type,
          due_date: assessmentData.dueDate,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      setAssessments(prev => [...prev, data].sort((a, b) => 
        new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      ));
      setShowAddDialog(false);

      toast({
        title: "Success",
        description: "Assessment added successfully",
      });
    } catch (error) {
      console.error('Error adding assessment:', error);
      toast({
        title: "Error",
        description: "Failed to add assessment",
        variant: "destructive",
      });
    }
  };

  const updateAssessmentStatus = async (assessmentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('ojt_assessments')
        .update({ status: newStatus })
        .eq('id', assessmentId);

      if (error) throw error;

      setAssessments(prev => prev.map(assessment => 
        assessment.id === assessmentId 
          ? { ...assessment, status: newStatus }
          : assessment
      ));

      toast({
        title: "Success",
        description: "Assessment status updated",
      });
    } catch (error) {
      console.error('Error updating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to update assessment status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status !== 'completed';
    
    if (isOverdue) return 'bg-red-500';
    
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Written': return '📝';
      case 'Practical': return '🔧';
      case 'Oral': return '🗣️';
      case 'Portfolio': return '📁';
      case 'Observation': return '👁️';
      default: return '📋';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Assessments</h2>
          <p className="text-muted-foreground">
            Track your upcoming assessments and deadlines
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Assessment
        </Button>
      </div>

      {/* Assessments List */}
      {assessments.length === 0 ? (
        <Card className="bg-elec-gray/50">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No assessments scheduled</h3>
            <p className="text-muted-foreground mb-4">
              Add your upcoming assessments to track deadlines and progress
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Assessment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {assessments.map((assessment) => {
            const daysUntilDue = getDaysUntilDue(assessment.due_date);
            const isOverdue = daysUntilDue < 0 && assessment.status !== 'completed';
            const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

            return (
              <Card key={assessment.id} className="bg-elec-gray/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(assessment.type)}</span>
                        <div>
                          <h3 className="font-medium text-lg">{assessment.title}</h3>
                          <p className="text-sm text-muted-foreground">{assessment.type} Assessment</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(assessment.due_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span className={isOverdue ? 'text-red-500' : isDueSoon ? 'text-yellow-500' : ''}>
                            {isOverdue 
                              ? `Overdue by ${Math.abs(daysUntilDue)} days`
                              : daysUntilDue === 0
                                ? 'Due today'
                                : `${daysUntilDue} days remaining`
                            }
                          </span>
                        </div>
                      </div>

                      {assessment.grade && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">Grade: </span>
                          <span className="text-sm text-elec-yellow">{assessment.grade}</span>
                        </div>
                      )}

                      {assessment.feedback && (
                        <div className="mb-3">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Feedback: </span>
                            {assessment.feedback}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(assessment.status, assessment.due_date)}>
                        {isOverdue && assessment.status !== 'completed' ? 'Overdue' : assessment.status}
                      </Badge>

                      {assessment.status !== 'completed' && (
                        <div className="flex gap-2">
                          {assessment.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAssessmentStatus(assessment.id, 'in_progress')}
                            >
                              Start
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => updateAssessmentStatus(assessment.id, 'completed')}
                          >
                            Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AddAssessmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssessment={handleAddAssessment}
      />
    </div>
  );
};

export default AssessmentTrackingTab;
