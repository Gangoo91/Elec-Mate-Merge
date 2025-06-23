
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Award, AlertCircle, Plus, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddAssessmentDialog from "./AddAssessmentDialog";

interface Assessment {
  id: string;
  title: string;
  type: string;
  due_date: string;
  status: string;
  electrical_unit?: string;
  assessment_method?: string;
  marks_achieved?: number;
  marks_total?: number;
  apprentice_level?: string;
  workplace_assessment?: boolean;
  grade?: string;
  feedback?: string;
}

const AssessmentTrackingTab = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAssessments();
  }, []);

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
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAssessment = async (assessmentData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ojt_assessments')
        .insert([{
          user_id: user.id,
          title: assessmentData.title,
          type: assessmentData.type,
          due_date: assessmentData.dueDate,
          status: 'pending',
          electrical_unit: `Unit ${Math.floor(Math.random() * 300) + 200}`,
          assessment_method: assessmentData.type === 'Practical' ? 'Practical Assessment' : 'Written Exam',
          marks_total: assessmentData.type === 'Practical' ? 100 : 50,
          apprentice_level: 'Level 3',
          workplace_assessment: assessmentData.type === 'Practical'
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Assessment added successfully"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-700 border-green-500/20';
      case 'in_progress': return 'bg-blue-500/20 text-blue-700 border-blue-500/20';
      case 'overdue': return 'bg-red-500/20 text-red-700 border-red-500/20';
      default: return 'bg-orange-500/20 text-orange-700 border-orange-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Award className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const completedCount = assessments.filter(a => a.status === 'completed').length;
  const pendingCount = assessments.filter(a => a.status === 'pending').length;
  const overdueCount = assessments.filter(a => {
    const dueDate = new Date(a.due_date);
    const today = new Date();
    return dueDate < today && a.status !== 'completed';
  }).length;

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
      {/* Assessment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Assessment Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Upcoming Assessments</h3>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Assessment
        </Button>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {assessments.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assessments scheduled</p>
              <Button 
                onClick={() => setShowAddDialog(true)} 
                className="mt-4"
                variant="outline"
              >
                Add Your First Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          assessments.map((assessment) => (
            <Card key={assessment.id} className="border-l-4 border-l-elec-yellow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{assessment.title}</h4>
                      <Badge className={getStatusColor(assessment.status)}>
                        {getStatusIcon(assessment.status)}
                        <span className="ml-1">{assessment.status.replace('_', ' ')}</span>
                      </Badge>
                      {assessment.workplace_assessment && (
                        <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                          Workplace
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{assessment.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium">{new Date(assessment.due_date).toLocaleDateString('en-GB')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Unit:</span>
                        <p className="font-medium">{assessment.electrical_unit || 'Not specified'}</p>
                      </div>
                    </div>

                    {assessment.assessment_method && (
                      <div className="mt-3">
                        <span className="text-muted-foreground text-sm">Assessment Method:</span>
                        <p className="font-medium">{assessment.assessment_method}</p>
                      </div>
                    )}

                    {assessment.marks_total && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm">
                            {assessment.marks_achieved || 0} / {assessment.marks_total} marks
                          </span>
                        </div>
                        <Progress 
                          value={assessment.marks_achieved ? (assessment.marks_achieved / assessment.marks_total) * 100 : 0} 
                          className="h-2"
                        />
                      </div>
                    )}

                    {assessment.feedback && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <span className="text-sm font-medium">Feedback:</span>
                        <p className="text-sm text-muted-foreground mt-1">{assessment.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AddAssessmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddAssessment={addAssessment}
      />
    </div>
  );
};

export default AssessmentTrackingTab;
