
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Clock, Award, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddGoalDialog from "./AddGoalDialog";

interface Goal {
  id: string;
  title: string;
  description?: string;
  target_value: number;
  current_value: number;
  unit: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  deadline?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const ComplianceDashboardTab = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ojt_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error",
        description: "Failed to load goals",
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

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
      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGoals}</div>
            <p className="text-xs text-muted-foreground">
              Learning objectives set
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{overallProgress.toFixed(0)}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{completedGoals}</div>
            <p className="text-xs text-muted-foreground">
              Goals achieved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Goals & Progress
            </CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No goals set yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Set learning goals to track your apprenticeship progress
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = calculateProgress(goal.current_value, goal.target_value);
                return (
                  <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge variant={getStatusBadgeVariant(goal.status) as any}>
                            {goal.status.replace('_', ' ')}
                          </Badge>
                          <span className={`text-xs ${getPriorityColor(goal.priority)}`}>
                            {goal.priority} priority
                          </span>
                        </div>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {goal.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            Progress: {goal.current_value} / {goal.target_value} {goal.unit}
                          </span>
                          {goal.deadline && (
                            <span className="text-muted-foreground">
                              Due: {new Date(goal.deadline).toLocaleDateString('en-GB')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {goal.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : goal.status === 'overdue' ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-right text-sm text-muted-foreground">
                      {progress.toFixed(0)}% complete
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-5 w-5" />
            Apprenticeship Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Key Learning Areas</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Electrical theory and principles</li>
                <li>• Health and safety practices</li>
                <li>• Installation methods</li>
                <li>• Testing and inspection</li>
                <li>• Fault diagnosis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Portfolio Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Evidence of practical skills</li>
                <li>• Reflection on learning</li>
                <li>• Assessment outcomes</li>
                <li>• Professional development</li>
                <li>• Industry knowledge</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddGoalDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onGoalAdded={fetchGoals}
      />
    </div>
  );
};

export default ComplianceDashboardTab;
