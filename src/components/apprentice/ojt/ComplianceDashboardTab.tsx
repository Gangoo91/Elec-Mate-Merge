
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calendar, AlertCircle, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import AddGoalDialog from "./AddGoalDialog";

interface Goal {
  id: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  deadline: string;
  status: string;
  created_at: string;
}

const ComplianceDashboardTab = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoalDialog, setShowAddGoalDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (goalData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ojt_goals')
        .insert({
          ...goalData,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Goal Added",
        description: "Your new goal has been created successfully"
      });

      setShowAddGoalDialog(false);
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

  const updateGoalProgress = async (goalId: string, newValue: number) => {
    try {
      const { error } = await supabase
        .from('ojt_goals')
        .update({ 
          current_value: newValue,
          status: newValue >= goals.find(g => g.id === goalId)?.target_value ? 'completed' : 'in_progress'
        })
        .eq('id', goalId);

      if (error) throw error;
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => {
      return sum + (goal.current_value / goal.target_value) * 100;
    }, 0);
    return Math.min(totalProgress / goals.length, 100);
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const overallProgress = calculateOverallProgress();

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
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <Target className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <p className="text-2xl font-bold">{goals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedGoals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray/50 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress towards all goals</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <Card className="bg-elec-gray/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Your Goals
            </CardTitle>
            <Button 
              onClick={() => setShowAddGoalDialog(true)}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No goals set yet. Create your first goal to start tracking your progress!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => {
                const progress = Math.min((goal.current_value / goal.target_value) * 100, 100);
                const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== 'completed';
                
                return (
                  <div key={goal.id} className="p-4 border border-elec-gray/40 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2">
                          {goal.title}
                          <Badge className={`${getPriorityColor(goal.priority)} text-white text-xs`}>
                            {goal.priority}
                          </Badge>
                          <Badge className={getStatusColor(goal.status)}>
                            {goal.status.replace('_', ' ')}
                          </Badge>
                          {isOverdue && (
                            <Badge className="bg-red-500 text-white">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {goal.current_value} / {goal.target_value} {goal.unit}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Category: {goal.category}</span>
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      
                      {goal.status !== 'completed' && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateGoalProgress(goal.id, Math.min(goal.current_value + 1, goal.target_value))}
                          >
                            +1
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateGoalProgress(goal.id, Math.min(goal.current_value + 5, goal.target_value))}
                          >
                            +5
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateGoalProgress(goal.id, goal.target_value)}
                          >
                            Complete
                          </Button>
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

      <AddGoalDialog
        open={showAddGoalDialog}
        onOpenChange={setShowAddGoalDialog}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default ComplianceDashboardTab;
