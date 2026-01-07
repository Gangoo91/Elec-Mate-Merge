import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import {
  Target,
  Plus,
  CheckCircle2,
  Clock,
  Trophy,
  Star,
  Zap,
  BookOpen,
  Award,
  GraduationCap,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  description?: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  status: 'in_progress' | 'completed';
}

const CATEGORIES = [
  { value: 'training', label: 'Training', icon: BookOpen, color: 'text-blue-500' },
  { value: 'portfolio', label: 'Portfolio', icon: Target, color: 'text-elec-yellow' },
  { value: 'assessment', label: 'Assessment', icon: Award, color: 'text-green-500' },
  { value: 'skill', label: 'Skill', icon: Zap, color: 'text-purple-500' },
  { value: 'certification', label: 'Certification', icon: GraduationCap, color: 'text-amber-500' },
];

const SMART_GOAL_SUGGESTIONS = [
  { title: 'Complete 400 OJT hours', category: 'training', target: 400, unit: 'hours' },
  { title: 'Add 20 portfolio entries', category: 'portfolio', target: 20, unit: 'entries' },
  { title: 'Pass all Unit 201 assessments', category: 'assessment', target: 4, unit: 'assessments' },
  { title: 'Achieve 95% attendance', category: 'training', target: 95, unit: '%' },
  { title: 'Master safe isolation', category: 'skill', target: 100, unit: '%' },
];

/**
 * GoalsSection - Goal tracking for OJT Hub
 *
 * Features:
 * - Smart goal suggestions
 * - Progress tracking with slider
 * - Category-based organization
 * - Priority management
 * - Achievement celebration
 */
export function GoalsSection() {
  const { toast } = useToast();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'training',
    targetValue: 100,
    unit: '%',
    priority: 'medium' as const,
    deadline: '',
  });

  // Mock goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete 400 OJT hours',
      description: 'Achieve the 20% off-the-job training requirement',
      category: 'training',
      targetValue: 400,
      currentValue: 285,
      unit: 'hours',
      priority: 'high',
      deadline: '2024-08-31',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'Build portfolio entries',
      description: 'Add evidence across all assessment criteria',
      category: 'portfolio',
      targetValue: 20,
      currentValue: 12,
      unit: 'entries',
      priority: 'high',
      status: 'in_progress',
    },
    {
      id: '3',
      title: 'Achieve 95% attendance',
      description: 'Maintain excellent attendance record',
      category: 'training',
      targetValue: 95,
      currentValue: 92,
      unit: '%',
      priority: 'medium',
      status: 'in_progress',
    },
    {
      id: '4',
      title: 'Pass Unit 201',
      description: 'Complete all Unit 201 assessments',
      category: 'assessment',
      targetValue: 4,
      currentValue: 4,
      unit: 'assessments',
      priority: 'high',
      status: 'completed',
    },
    {
      id: '5',
      title: 'Obtain 18th Edition cert',
      description: 'Get BS7671 certification',
      category: 'certification',
      targetValue: 1,
      currentValue: 0,
      unit: 'cert',
      priority: 'low',
      deadline: '2024-06-30',
      status: 'in_progress',
    },
  ]);

  // Filter goals
  const filteredGoals = selectedCategory
    ? goals.filter((g) => g.category === selectedCategory)
    : goals;

  // Separate active and completed
  const activeGoals = filteredGoals.filter((g) => g.status === 'in_progress');
  const completedGoals = filteredGoals.filter((g) => g.status === 'completed');

  // Overall stats
  const stats = {
    total: goals.length,
    completed: completedGoals.length,
    inProgress: activeGoals.length,
    overallProgress: Math.round(
      goals.reduce((sum, g) => sum + (g.currentValue / g.targetValue) * 100, 0) / goals.length
    ),
  };

  const handleAddGoal = () => {
    if (!newGoal.title) {
      toast({
        title: 'Missing title',
        description: 'Please enter a goal title',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Goal added',
      description: `"${newGoal.title}" has been added`,
    });

    setNewGoal({
      title: '',
      description: '',
      category: 'training',
      targetValue: 100,
      unit: '%',
      priority: 'medium',
      deadline: '',
    });
    setShowAddGoal(false);
  };

  const handleUpdateProgress = (goalId: string, newValue: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              currentValue: newValue,
              status: newValue >= g.targetValue ? 'completed' : 'in_progress',
            }
          : g
      )
    );

    const goal = goals.find((g) => g.id === goalId);
    if (goal && newValue >= goal.targetValue) {
      toast({
        title: '🎉 Goal achieved!',
        description: `Congratulations on completing "${goal.title}"`,
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    return CATEGORIES.find((c) => c.value === category)?.icon || Target;
  };

  const getCategoryColor = (category: string) => {
    return CATEGORIES.find((c) => c.value === category)?.color || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30 text-[10px]">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-[10px]">
            Medium
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            Low
          </Badge>
        );
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Goals</h1>
            <p className="text-sm text-muted-foreground">Set and track your targets</p>
          </div>
          <Button
            onClick={() => setShowAddGoal(true)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Goal</span>
          </Button>
        </div>

        {/* Overall Progress */}
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/10 to-transparent overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-5 w-5 text-elec-yellow" />
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{stats.overallProgress}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.completed} of {stats.total} goals completed
                </p>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${stats.overallProgress * 2.51} 251`}
                    strokeLinecap="round"
                    className="text-elec-yellow transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95',
              !selectedCategory
                ? 'bg-elec-yellow text-black'
                : 'bg-muted text-muted-foreground'
            )}
          >
            All ({goals.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = goals.filter((g) => g.category === cat.value).length;
            const Icon = cat.icon;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95',
                  selectedCategory === cat.value
                    ? 'bg-elec-yellow text-black'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              In Progress ({activeGoals.length})
            </h3>
            {activeGoals.map((goal) => {
              const CategoryIcon = getCategoryIcon(goal.category);
              const percent = Math.round((goal.currentValue / goal.targetValue) * 100);

              return (
                <Card key={goal.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                          percent >= 75
                            ? "bg-green-500/10"
                            : percent >= 50
                            ? "bg-elec-yellow/10"
                            : "bg-muted"
                        )}
                      >
                        <CategoryIcon
                          className={cn(
                            "h-5 w-5",
                            getCategoryColor(goal.category)
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-foreground line-clamp-1">
                            {goal.title}
                          </p>
                          {getPriorityBadge(goal.priority)}
                        </div>
                        {goal.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                            {goal.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                          <span className="font-medium text-foreground">{percent}%</span>
                        </div>
                        <Slider
                          value={[goal.currentValue]}
                          max={goal.targetValue}
                          step={1}
                          onValueChange={([value]) => handleUpdateProgress(goal.id, value)}
                          className="w-full"
                        />
                        {goal.deadline && (
                          <p className="text-[10px] text-muted-foreground mt-2">
                            Due: {new Date(goal.deadline).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Completed ({completedGoals.length})
            </h3>
            {completedGoals.map((goal) => {
              const CategoryIcon = getCategoryIcon(goal.category);

              return (
                <Card
                  key={goal.id}
                  className="border-green-500/20 bg-green-500/5"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground line-clamp-1">
                          {goal.title}
                        </p>
                        <p className="text-xs text-green-500">
                          {goal.targetValue} {goal.unit} achieved
                        </p>
                      </div>
                      <Trophy className="h-5 w-5 text-elec-yellow shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredGoals.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-medium text-foreground">No goals yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Set your first goal to track progress
            </p>
          </div>
        )}
      </div>

      {/* Add Goal Sheet */}
      <Sheet open={showAddGoal} onOpenChange={setShowAddGoal}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Add Goal</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4 overflow-y-auto pb-safe">
            {/* Smart Suggestions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                Quick Add
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {SMART_GOAL_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setNewGoal({
                        ...newGoal,
                        title: suggestion.title,
                        category: suggestion.category,
                        targetValue: suggestion.target,
                        unit: suggestion.unit,
                      })
                    }
                    className="px-3 py-2 rounded-lg bg-muted text-xs whitespace-nowrap hover:bg-muted/80 active:scale-95 transition-all"
                  >
                    {suggestion.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal Title</label>
              <Input
                placeholder="e.g., Complete 400 OJT hours"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setNewGoal({ ...newGoal, category: cat.value })}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-xl border transition-all active:scale-95",
                        newGoal.category === cat.value
                          ? "border-elec-yellow bg-elec-yellow/10"
                          : "border-border"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", cat.color)} />
                      <span className="text-[10px] font-medium">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Value</label>
                <Input
                  type="number"
                  value={newGoal.targetValue}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, targetValue: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit</label>
                <Select
                  value={newGoal.unit}
                  onValueChange={(value) => setNewGoal({ ...newGoal, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="%">Percentage (%)</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="entries">Entries</SelectItem>
                    <SelectItem value="assessments">Assessments</SelectItem>
                    <SelectItem value="units">Units</SelectItem>
                    <SelectItem value="cert">Certificates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setNewGoal({ ...newGoal, priority })}
                    className={cn(
                      "py-2 px-4 rounded-xl border text-sm font-medium capitalize transition-all active:scale-95",
                      newGoal.priority === priority
                        ? priority === 'high'
                          ? "border-red-500 bg-red-500/10 text-red-500"
                          : priority === 'medium'
                          ? "border-amber-500 bg-amber-500/10 text-amber-500"
                          : "border-elec-yellow bg-elec-yellow/10"
                        : "border-border"
                    )}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline (optional)</label>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (optional)</label>
              <Textarea
                placeholder="Add more details..."
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                rows={2}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-8">
              <Button
                variant="outline"
                onClick={() => setShowAddGoal(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddGoal}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Add Goal
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default GoalsSection;
