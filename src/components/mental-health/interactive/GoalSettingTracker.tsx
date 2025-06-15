
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, CheckCircle, Calendar, TrendingUp, Trash2 } from "lucide-react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'wellbeing' | 'work' | 'learning' | 'personal';
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  milestones: string[];
}

const GoalSettingTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "wellbeing" as const,
    targetDate: "",
    milestones: [""]
  });

  const categories = [
    { value: 'wellbeing', label: 'Mental Wellbeing', color: 'bg-green-500/20 text-green-400' },
    { value: 'work', label: 'Work/Career', color: 'bg-blue-500/20 text-blue-400' },
    { value: 'learning', label: 'Learning & Skills', color: 'bg-purple-500/20 text-purple-400' },
    { value: 'personal', label: 'Personal Growth', color: 'bg-orange-500/20 text-orange-400' }
  ];

  const addGoal = () => {
    if (newGoal.title.trim() && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title.trim(),
        description: newGoal.description.trim(),
        category: newGoal.category,
        targetDate: newGoal.targetDate,
        progress: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        milestones: newGoal.milestones.filter(m => m.trim())
      };
      
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: "", description: "", category: "wellbeing", targetDate: "", milestones: [""] });
      setShowAddForm(false);
    }
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id 
          ? { 
              ...goal, 
              progress,
              status: progress >= 100 ? 'completed' : goal.status
            }
          : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addMilestone = () => {
    setNewGoal(prev => ({ ...prev, milestones: [...prev.milestones, ""] }));
  };

  const updateMilestone = (index: number, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => i === index ? value : m)
    }));
  };

  const getDaysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="border-purple-500/50 bg-purple-500/10">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Goal Setting & Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.length === 0 && !showAddForm ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Set personal mental health goals and track your progress over time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Set Goals</div>
                <div className="text-xs text-muted-foreground">Define your targets</div>
              </div>
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Track Progress</div>
                <div className="text-xs text-muted-foreground">Monitor improvements</div>
              </div>
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <CheckCircle className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">Get Insights</div>
                <div className="text-xs text-muted-foreground">Understand patterns</div>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const categoryInfo = categories.find(c => c.value === goal.category);
              const daysRemaining = getDaysRemaining(goal.targetDate);
              
              return (
                <div key={goal.id} className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-white">{goal.title}</h4>
                        <Badge className={categoryInfo?.color}>
                          {categoryInfo?.label}
                        </Badge>
                        {goal.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                        <span className={daysRemaining < 0 ? 'text-red-400' : daysRemaining < 7 ? 'text-orange-400' : ''}>
                          {daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days remaining`}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        
                        {goal.status !== 'completed' && (
                          <div className="flex gap-2 mt-2">
                            {[25, 50, 75, 100].map(value => (
                              <Button
                                key={value}
                                size="sm"
                                variant="outline"
                                onClick={() => updateProgress(goal.id, value)}
                                className="text-xs"
                                disabled={goal.progress >= value}
                              >
                                {value}%
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
            
            {!showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            )}
          </div>
        )}

        {showAddForm && (
          <div className="space-y-4 p-4 border border-purple-500/20 rounded-lg bg-purple-500/5">
            <h4 className="font-medium text-purple-300">Create New Goal</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Goal Title *</Label>
                <Input
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Practice daily mindfulness"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">Category</Label>
                <Select value={newGoal.category} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Description</Label>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your goal and why it's important to you"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div>
              <Label className="text-sm">Target Date *</Label>
              <Input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <Label className="text-sm">Milestones (optional)</Label>
              {newGoal.milestones.map((milestone, index) => (
                <Input
                  key={index}
                  value={milestone}
                  onChange={(e) => updateMilestone(index, e.target.value)}
                  placeholder={`Milestone ${index + 1}`}
                  className="mt-1"
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMilestone}
                className="mt-2"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Milestone
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={addGoal} disabled={!newGoal.title || !newGoal.targetDate}>
                Create Goal
              </Button>
              <Button onClick={() => setShowAddForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalSettingTracker;
