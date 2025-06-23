
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, Clock, FileText, Target, TrendingUp, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  updated_at: string;
}

const AssessmentTrackingTab = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'overdue': return 'destructive';
      case 'in_progress': return 'yellow';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'overdue': return 'text-red-600';
      case 'in_progress': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const completedAssessments = assessments.filter(a => a.status === 'completed').length;
  const totalAssessments = assessments.length;
  const progressPercentage = totalAssessments > 0 ? (completedAssessments / totalAssessments) * 100 : 0;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Award className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Across all units
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{completedAssessments}</div>
            <Progress value={progressPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {progressPercentage.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Assessment completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assessment List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assessment Schedule
            </CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assessments scheduled</p>
              <p className="text-sm text-muted-foreground mt-2">
                Add your upcoming assessments to track your progress
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{assessment.title}</h4>
                      <Badge variant={getStatusBadgeVariant(assessment.status) as any}>
                        {assessment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {assessment.type} • Due: {new Date(assessment.due_date).toLocaleDateString('en-GB')}
                    </p>
                    {assessment.grade && (
                      <p className="text-sm font-medium text-green-600 mt-1">
                        Grade: {assessment.grade}
                      </p>
                    )}
                    {assessment.feedback && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Feedback: {assessment.feedback}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getStatusColor(assessment.status)}`}>
                      {assessment.status === 'completed' ? (
                        <Award className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment Types Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Types & Preparation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Written Assessments</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multiple choice questions</li>
                <li>• Short answer responses</li>
                <li>• Calculation problems</li>
                <li>• Regulation knowledge</li>
                <li>• Safety procedures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Practical Assessments</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Installation techniques</li>
                <li>• Testing procedures</li>
                <li>• Fault finding</li>
                <li>• Tool usage</li>
                <li>• Safety demonstrations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddAssessmentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAssessmentAdded={fetchAssessments}
      />
    </div>
  );
};

export default AssessmentTrackingTab;
