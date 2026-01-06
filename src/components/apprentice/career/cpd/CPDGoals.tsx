import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Plus, Calendar, TrendingUp, Edit, Trash2, Clock } from "lucide-react";
import { useUnifiedCPD, type CPDGoal } from "@/hooks/cpd/useUnifiedCPD";

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal, loading } = useUnifiedCPD();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CPDGoal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    targetHours: "",
    deadline: "",
    category: "",
    description: "",
    status: "Active" as CPDGoal['status'],
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.targetHours || !formData.deadline) return;

    const goalData = {
      title: formData.title,
      targetHours: parseInt(formData.targetHours),
      currentHours: editingGoal?.currentHours || 0,
      deadline: formData.deadline,
      category: formData.category || "General",
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
      title: "",
      targetHours: "",
      deadline: "",
      category: "",
      description: "",
      status: "Active",
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
      description: goal.description || "",
      status: goal.status,
    });
    setEditingGoal(goal);
    setIsAddDialogOpen(true);
  };

  const getStatusColor = (status: CPDGoal['status']) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Paused":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Target className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">CPD Goals</h2>
            <p className="text-white/70 text-sm">Set and track your professional development goals</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => resetForm()}
              className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                {editingGoal ? 'Edit Goal' : 'Add New CPD Goal'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Testing Qualification"
                  className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetHours" className="text-white flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-elec-yellow" />
                    Target Hours
                  </Label>
                  <Input
                    id="targetHours"
                    type="number"
                    value={formData.targetHours}
                    onChange={(e) => setFormData({ ...formData, targetHours: e.target.value })}
                    placeholder="20"
                    className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div>
                  <Label htmlFor="deadline" className="text-white flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-elec-yellow" />
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="h-11 bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/20">
                      <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                      <SelectItem value="Regulations & Standards">Regulations & Standards</SelectItem>
                      <SelectItem value="Safety & Health">Safety & Health</SelectItem>
                      <SelectItem value="Business Skills">Business Skills</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status" className="text-white">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: CPDGoal['status']) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/20">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description of this goal..."
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[80px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
                >
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="h-11 border-white/20 hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 text-center relative">
            <div className="p-4 rounded-full bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 w-fit mx-auto mb-4">
              <Target className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No goals set yet</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Create your first CPD goal to start tracking your professional development progress and stay on track with your career objectives.
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 touch-manipulation active:scale-95 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-all overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-3 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1 min-w-0">
                    <CardTitle className="text-white text-lg leading-tight">{goal.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                      <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(goal)}
                      className="h-9 w-9 p-0 hover:bg-elec-yellow/20 touch-manipulation"
                    >
                      <Edit className="h-4 w-4 text-white/70" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteGoal(goal.id)}
                      className="h-9 w-9 p-0 hover:bg-red-500/20 text-red-400 touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative">
                {/* Progress */}
                <div className="space-y-2 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Progress</span>
                    <span className="text-elec-yellow font-medium">
                      {goal.currentHours} / {goal.targetHours} hours
                    </span>
                  </div>
                  <Progress
                    value={(goal.currentHours / goal.targetHours) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-white/60">
                    {Math.round((goal.currentHours / goal.targetHours) * 100)}% complete
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Calendar className="h-4 w-4 text-elec-yellow" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>

                  {goal.description && (
                    <p className="text-white/60 text-sm line-clamp-2">
                      {goal.description}
                    </p>
                  )}
                </div>

                {/* Time Remaining */}
                {goal.targetHours - goal.currentHours > 0 && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-amber-400">{goal.targetHours - goal.currentHours} hours remaining</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CPDGoals;
