import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { useUnifiedCPD, type CPDGoal } from '@/hooks/cpd/useUnifiedCPD';

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal, loading } = useUnifiedCPD();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CPDGoal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    targetHours: '',
    deadline: '',
    category: '',
    description: '',
    status: 'Active' as CPDGoal['status'],
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.targetHours || !formData.deadline) return;

    const goalData = {
      title: formData.title,
      targetHours: parseInt(formData.targetHours),
      currentHours: editingGoal?.currentHours || 0,
      deadline: formData.deadline,
      category: formData.category || 'General',
      status: formData.status,
      description: formData.description,
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      addGoal(goalData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      targetHours: '',
      deadline: '',
      category: '',
      description: '',
      status: 'Active',
    });
    setEditingGoal(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (goal: CPDGoal) => {
    setFormData({
      title: goal.title,
      targetHours: goal.targetHours.toString(),
      deadline: goal.deadline,
      category: goal.category,
      description: goal.description || '',
      status: goal.status,
    });
    setEditingGoal(goal);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            CPD goals
          </span>
          <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
            CPD goals
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Set and track your professional development goals.
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-white/[0.06] max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingGoal ? 'Edit goal' : 'Add new CPD goal'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <div>
                <Label htmlFor="title" className="text-[12px] text-white/70">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Advanced Testing Qualification"
                  className="h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 touch-manipulation"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="targetHours" className="text-[12px] text-white/70">
                    Target hours
                  </Label>
                  <Input
                    id="targetHours"
                    type="number"
                    value={formData.targetHours}
                    onChange={(e) => setFormData({ ...formData, targetHours: e.target.value })}
                    placeholder="20"
                    className="h-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 touch-manipulation"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline" className="text-[12px] text-white/70">
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="category" className="text-[12px] text-white/70">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                      <SelectItem value="Regulations & Standards">
                        Regulations & Standards
                      </SelectItem>
                      <SelectItem value="Safety & Health">Safety & Health</SelectItem>
                      <SelectItem value="Business Skills">Business Skills</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-[12px] text-white/70">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: CPDGoal['status']) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="h-11 bg-white/[0.03] border-white/10 text-white touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-[12px] text-white/70">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description of this goal..."
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 min-h-[80px] touch-manipulation"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
                >
                  {editingGoal ? 'Update goal' : 'Create goal'}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center space-y-3">
          <h3 className="text-[16px] font-semibold text-white">No goals set yet</h3>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-md mx-auto">
            Create your first CPD goal to start tracking your professional development progress
            and stay on track with your career objectives.
          </p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add your first goal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    {goal.status} · {goal.category}
                  </span>
                  <h3 className="text-[16px] font-semibold text-white leading-tight">
                    {goal.title}
                  </h3>
                </div>

                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(goal)}
                    className="h-9 w-9 p-0 text-white hover:bg-white/[0.05] touch-manipulation"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-9 w-9 p-0 text-white/70 hover:bg-white/[0.05] touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/55">Progress</span>
                  <span className="text-white font-mono">
                    {goal.currentHours} / {goal.targetHours} hours
                  </span>
                </div>
                <Progress value={(goal.currentHours / goal.targetHours) * 100} className="h-2" />
                <p className="text-[12px] text-white/55">
                  {Math.round((goal.currentHours / goal.targetHours) * 100)}% complete
                </p>
              </div>

              <div className="space-y-1.5 text-[13px] text-white/85">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-white/55" />
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>

                {goal.description && (
                  <p className="text-white/70 line-clamp-2">{goal.description}</p>
                )}
              </div>

              {goal.targetHours - goal.currentHours > 0 && (
                <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] p-2.5 text-[12px] text-white/85">
                  <TrendingUp className="h-3.5 w-3.5 text-white/55" />
                  <span>{goal.targetHours - goal.currentHours} hours remaining</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CPDGoals;
