
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Calendar, CheckCircle, AlertCircle } from "lucide-react";
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
  priority: "low" | "medium" | "high";
  category: string;
  deadline: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const ComplianceDashboardTab = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
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
      
      // Map the data to ensure type safety
      const typedGoals: Goal[] = (data || []).map(goal => ({
        ...goal,
        priority: (goal.priority as "low" | "medium" | "high") || "medium"
      }));
      
      setGoals(typedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error",
        description: "Failed to load goals",
        variant: "destructive",
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
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('ojt_goals')
        .insert({
          user_id: user.id,
          ...goalData
        })
        .select()
        .single();

      if (error) throw error;

      const newGoal: Goal = {
        ...data,
        priority: (data.priority as "low" | "medium" | "high") || "medium"
      };

      setGoals(prev => [newGoal, ...prev]);
      setShowAddDialog(false);

      toast({
        title: "Success",
        description: "Goal added successfully",
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
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

      setGoals(prev => prev.map(goal => 
        goal.id === goalId 
          ? { 
              ...goal, 
              current_value: newValue,
              status: newValue >= goal.target_value ? 'completed' : 'in_progress'
            }
          : goal
      ));

      toast({
        title: "Success",
        description: "Goal progress updated",
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal progress",
        variant: "destructive",
      });
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Target className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
          <h2 className="text-2xl font-bold">Goals & Progress</h2>
          <p className="text-muted-foreground">
            Track your training objectives and apprenticeship milestones
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <Card className="bg-elec-gray/50">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-4">
              Set your first training goal to start tracking your progress
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {goals.map((goal) => {
            const progressPercentage = Math.min((goal.current_value / goal.target_value) * 100, 100);
            const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && goal.status !== 'completed';
            const daysToDeadline = goal.deadline ? Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

            return (
              <Card key={goal.id} className="bg-elec-gray/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {goal.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(isOverdue ? 'overdue' : goal.status)}
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">
                          {goal.current_value} / {goal.target_value} {goal.unit}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(progressPercentage)}% complete
                      </div>
                    </div>

                    {/* Deadline */}
                    {goal.deadline && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className={isOverdue ? 'text-red-500' : ''}>
                          {isOverdue 
                            ? `Overdue by ${Math.abs(daysToDeadline!)} days`
                            : daysToDeadline !== null
                              ? daysToDeadline > 0 
                                ? `${daysToDeadline} days remaining`
                                : 'Due today'
                              : 'No deadline'
                          }
                        </span>
                      </div>
                    )}

                    {/* Quick Update */}
                    {goal.status !== 'completed' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateGoalProgress(goal.id, goal.current_value + 1)}
                        >
                          +1 {goal.unit}
                        </Button>
                        {goal.current_value < goal.target_value && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateGoalProgress(goal.id, goal.target_value)}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AddGoalDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default ComplianceDashboardTab;
