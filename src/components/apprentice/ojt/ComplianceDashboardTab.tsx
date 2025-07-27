
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, TrendingUp, Calendar, CheckCircle } from "lucide-react";
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
  priority: 'low' | 'medium' | 'high';
  category: string;
  deadline: string;
  status: string;
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
        .order('deadline', { ascending: true });

      if (error) throw error;

      const typedGoals: Goal[] = (data || []).map(goal => ({
        ...goal,
        priority: (goal.priority as 'low' | 'medium' | 'high') || 'medium'
      }));

      setGoals(typedGoals);
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

  const handleAddGoal = async (goalData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ojt_goals')
        .insert({
          user_id: user.id,
          title: goalData.title,
          description: goalData.description,
          target_value: goalData.targetValue,
          unit: goalData.unit,
          priority: goalData.priority,
          category: goalData.category,
          deadline: goalData.deadline,
          current_value: 0,
          status: 'in_progress'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Goal added successfully"
      });

      setIsAddDialogOpen(false);
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

      toast({
        title: "Success",
        description: "Goal progress updated"
      });

      fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update goal progress",
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const overallProgress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-base font-semibold">Goals & Progress</h3>
        <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-elec-gray/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-elec-light">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">{overallProgress.toFixed(0)}%</div>
            <Progress value={overallProgress} className="mt-2 bg-elec-card" />
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-elec-gray/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-elec-light">Completed Goals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{completedGoals}</div>
            <p className="text-xs text-elec-light/70">out of {goals.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-elec-gray/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-elec-light">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {goals.filter(g => g.status === 'in_progress').length}
            </div>
            <p className="text-xs text-elec-light/70">in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card className="bg-elec-gray border-elec-gray/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Target className="h-5 w-5 text-elec-yellow" />
            Your Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No goals set yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Set your first goal to start tracking your progress
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {goals.map((goal) => {
                const progressPercentage = Math.min((goal.current_value / goal.target_value) * 100, 100);
                
                return (
                  <div key={goal.id} className="p-4 bg-elec-gray border border-elec-gray/40 rounded-xl space-y-4">
                    {/* Mobile-optimized badges - centered at top */}
                    <div className="flex justify-center gap-2">
                      <Badge className={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status.replace('_', ' ')}
                      </Badge>
                    </div>

                    {/* Title and description */}
                    <div className="space-y-2 text-center sm:text-left">
                      <h4 className="font-semibold text-lg text-elec-light leading-tight">{goal.title}</h4>
                      <p className="text-sm text-elec-light/70 leading-relaxed">{goal.description}</p>
                    </div>

                    {/* Progress section */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-elec-light">
                        <span className="font-medium">Progress: {goal.current_value} / {goal.target_value} {goal.unit}</span>
                        <span className="font-semibold text-elec-yellow">{progressPercentage.toFixed(0)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2 bg-elec-card" />
                    </div>

                    {/* Footer with deadline and category */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center pt-3 border-t border-elec-gray/30">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-elec-light/70">
                        <Calendar className="h-4 w-4 text-elec-yellow" />
                        <span>Due: {new Date(goal.deadline).toLocaleDateString('en-GB')}</span>
                      </div>
                      <Badge variant="outline" className="w-fit mx-auto sm:mx-0 border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10">{goal.category}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AddGoalDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
};

export default ComplianceDashboardTab;
