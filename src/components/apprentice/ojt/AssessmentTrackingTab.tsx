
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Award, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
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
  tutor_notes?: string;
  created_at: string;
}

const AssessmentTrackingTab = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      
      // Update overdue status
      const now = new Date();
      const updatedAssessments = (data || []).map(assessment => {
        const dueDate = new Date(assessment.due_date);
        if (dueDate < now && assessment.status === 'pending') {
          return { ...assessment, status: 'overdue' };
        }
        return assessment;
      });

      setAssessments(updatedAssessments);
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast({
        title: "Error",
        description: "Failed to load assessments",
        variant: "destructive"
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
      if (!user) return;

      const { error } = await supabase
        .from('ojt_assessments')
        .insert({
          ...assessmentData,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Assessment Added",
        description: "Your assessment has been scheduled successfully"
      });

      setShowAddDialog(false);
      fetchAssessments();
    } catch (error) {
      console.error('Error adding assessment:', error);
      toast({
        title: "Error",
        description: "Failed to add assessment",
        variant: "destructive"
      });
    }
  };

  const updateAssessmentStatus = async (assessmentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('ojt_assessments')
        .update({ status })
        .eq('id', assessmentId);

      if (error) throw error;
      fetchAssessments();
      
      toast({
        title: "Status Updated",
        description: `Assessment marked as ${status}`
      });
    } catch (error) {
      console.error('Error updating assessment:', error);
      toast({
        title: "Error",
        description: "Failed to update assessment status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Written': return 'text-blue-600 bg-blue-100';
      case 'Practical': return 'text-green-600 bg-green-100';
      case 'Oral': return 'text-purple-600 bg-purple-100';
      case 'Portfolio': return 'text-orange-600 bg-orange-100';
      case 'Observation': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingAssessments = assessments.filter(a => a.status === 'pending').length;
  const overdueAssessments = assessments.filter(a => a.status === 'overdue').length;
  const completedAssessments = assessments.filter(a => a.status === 'completed').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-elec-gray/50">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray/50 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingAssessments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold">{overdueAssessments}</p>
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
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedAssessments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <Card className="bg-elec-gray/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-elec-yellow" />
              Assessment Schedule
            </CardTitle>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assessments scheduled yet. Add your first assessment to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => {
                const daysUntilDue = getDaysUntilDue(assessment.due_date);
                const isUrgent = daysUntilDue <= 7 && daysUntilDue > 0;
                
                return (
                  <div key={assessment.id} className="p-4 border border-elec-gray/40 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2">
                          {assessment.title}
                          <Badge className={getTypeColor(assessment.type)}>
                            {assessment.type}
                          </Badge>
                          <Badge className={getStatusColor(assessment.status)}>
                            {assessment.status.replace('_', ' ')}
                          </Badge>
                          {isUrgent && (
                            <Badge className="bg-orange-500 text-white">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Due Soon
                            </Badge>
                          )}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(assessment.due_date).toLocaleDateString()}
                        </span>
                        <span className={`font-medium ${
                          daysUntilDue < 0 ? 'text-red-500' : 
                          daysUntilDue <= 7 ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                           daysUntilDue === 0 ? 'Due today' :
                           `${daysUntilDue} days remaining`}
                        </span>
                      </div>

                      {assessment.grade && (
                        <div className="text-sm">
                          <span className="font-medium">Grade: </span>
                          <span className="text-green-600">{assessment.grade}</span>
                        </div>
                      )}

                      {assessment.feedback && (
                        <div className="text-sm">
                          <span className="font-medium">Feedback: </span>
                          <span className="text-muted-foreground">{assessment.feedback}</span>
                        </div>
                      )}

                      {assessment.tutor_notes && (
                        <div className="text-sm">
                          <span className="font-medium">Tutor Notes: </span>
                          <span className="text-muted-foreground">{assessment.tutor_notes}</span>
                        </div>
                      )}
                      
                      {assessment.status !== 'completed' && (
                        <div className="flex gap-2 mt-3">
                          {assessment.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAssessmentStatus(assessment.id, 'in_progress')}
                            >
                              Start Assessment
                            </Button>
                          )}
                          {assessment.status === 'in_progress' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAssessmentStatus(assessment.id, 'completed')}
                              className="bg-green-500 text-white hover:bg-green-600"
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AddAssessmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssessment={handleAddAssessment}
      />
    </div>
  );
};

export default AssessmentTrackingTab;
