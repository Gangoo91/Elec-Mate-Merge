
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Award, TrendingUp, Plus, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AddGoalDialog from "./AddGoalDialog";

interface Goal {
  id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  priority: string;
  category: string;
  status: string;
  deadline: string;
  electrical_competency?: string;
  milestone_type?: string;
}

const ComplianceDashboardTab = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
        .order('deadline', { ascending: true });

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

  const addGoal = async (goalData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ojt_goals')
        .insert([{
          user_id: user.id,
          title: goalData.title,
          description: goalData.description,
          target_value: goalData.targetValue,
          current_value: 0,
          unit: goalData.unit,
          priority: goalData.priority,
          category: goalData.category,
          status: 'in_progress',
          deadline: goalData.deadline,
          electrical_competency: getElectricalCompetency(goalData.category),
          milestone_type: getMilestoneType(goalData.category)
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal added successfully"
      });

      setShowAddDialog(false);
      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive"
      });
    }
  };

  const getElectricalCompetency = (category: string) => {
    switch (category) {
      case 'training': return 'Installation';
      case 'skill': return 'Testing & Inspection';
      case 'assessment': return 'Theory Knowledge';
      case 'portfolio': return 'Documentation';
      default: return 'General';
    }
  };

  const getMilestoneType = (category: string) => {
    switch (category) {
      case 'training': return 'unit_completion';
      case 'skill': return 'practical_skill';
      case 'assessment': return 'assessment';
      case 'portfolio': return 'workplace_project';
      default: return 'theory_knowledge';
    }
  };

  const updateGoalProgress = async (goalId: string, newValue: number) => {
    try {
      const goal = goals.find(g => g.id === goalId);
      if (!goal) return;

      const { error } = await supabase
        .from('ojt_goals')
        .update({ 
          current_value: newValue,
          status: newValue >= goal.target_value ? 'completed' : 'in_progress'
        })
        .eq('id', goalId);

      if (error) throw error;

      fetchGoals();
      toast({
        title: "Progress Updated",
        description: "Goal progress has been updated"
      });
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'in_progress').length;
  const overallProgress = goals.length > 0 
    ? (goals.reduce((sum, goal) => sum + (goal.current_value / goal.target_value * 100), 0) / goals.length)
    : 0;

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
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{goals.length}</div>
            <p className="text-xs text-blue-600">
              {inProgressGoals} in progress
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/20 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{completedGoals}</div>
            <p className="text-xs text-green-600">
              Goals achieved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{overallProgress.toFixed(0)}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Learning Goals & Milestones</h3>
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No goals set yet</p>
              <Button 
                onClick={() => setShowAddDialog(true)} 
                className="mt-4"
                variant="outline"
              >
                Set Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => {
            const progress = (goal.current_value / goal.target_value) * 100;
            const isCompleted = goal.status === 'completed';
            
            return (
              <Card key={goal.id} className={`border-l-4 ${isCompleted ? 'border-l-green-500' : 'border-l-elec-yellow'}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{goal.title}</h4>
                        <Badge className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                        {isCompleted && (
                          <Badge className="bg-green-500/20 text-green-700 border-green-500/20">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{goal.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <p className="font-medium capitalize">{goal.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <p className="font-medium">{new Date(goal.deadline).toLocaleDateString('en-GB')}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Competency:</span>
                          <p className="font-medium">{goal.electrical_competency || 'General'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">
                            {goal.current_value} / {goal.target_value} {goal.unit}
                          </span>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{progress.toFixed(1)}% complete</span>
                          {!isCompleted && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateGoalProgress(goal.id, goal.current_value + 1)}
                            >
                              Mark Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <AddGoalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddGoal={addGoal}
      />
    </div>
  );
};

export default ComplianceDashboardTab;
