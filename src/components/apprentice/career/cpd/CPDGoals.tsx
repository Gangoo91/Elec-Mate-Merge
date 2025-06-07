
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Target, Calendar, Edit2, Trash2 } from "lucide-react";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { CPDGoal } from "@/services/cpdDataService";

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal, loading } = useCPDData();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CPDGoal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    targetHours: "",
    deadline: "",
    category: "",
    description: "",
    status: "Active" as const
  });

  const resetForm = () => {
    setFormData({
      title: "",
      targetHours: "",
      deadline: "",
      category: "",
      description: "",
      status: "Active"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.targetHours || !formData.deadline) {
      return;
    }

    const goalData = {
      title: formData.title,
      targetHours: parseInt(formData.targetHours),
      currentHours: editingGoal?.currentHours || 0,
      deadline: formData.deadline,
      category: formData.category || "General",
      description: formData.description,
      status: formData.status
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
      setEditingGoal(null);
    } else {
      addGoal(goalData);
      setIsAddDialogOpen(false);
    }
    
    resetForm();
  };

  const handleEdit = (goal: CPDGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetHours: goal.targetHours.toString(),
      deadline: goal.deadline,
      category: goal.category,
      description: goal.description || "",
      status: goal.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(id);
    }
  };

  const getStatusColor = (status: CPDGoal['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Completed': return 'bg-blue-500';
      case 'Paused': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-elec-dark rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">CPD Goals</h2>
          <p className="text-muted-foreground">Set and track your professional development objectives</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-elec-yellow/20">
            <DialogHeader>
              <DialogTitle className="text-white">Add New CPD Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Goal Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Complete Advanced Testing Course"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetHours" className="text-white">Target Hours</Label>
                  <Input
                    id="targetHours"
                    type="number"
                    value={formData.targetHours}
                    onChange={(e) => setFormData({ ...formData, targetHours: e.target.value })}
                    placeholder="20"
                    className="bg-elec-dark border-elec-yellow/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deadline" className="text-white">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="bg-elec-dark border-elec-yellow/30 text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category" className="text-white">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Technical Skills"
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your goal and expected outcomes..."
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-elec-yellow text-elec-dark hover:bg-amber-400">
                Create Goal
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Goals Set</h3>
              <p className="text-muted-foreground mb-4">
                Set your first CPD goal to start tracking your professional development progress.
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => {
            const progress = (goal.currentHours / goal.targetHours) * 100;
            const isOverdue = new Date(goal.deadline) < new Date() && goal.status === 'Active';
            
            return (
              <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-white">{goal.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(goal.status)} text-white`}>
                          {goal.status}
                        </Badge>
                        <Badge variant="outline" className="border-elec-yellow/30">
                          {goal.category}
                        </Badge>
                        {isOverdue && (
                          <Badge variant="destructive">Overdue</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                        className="text-elec-yellow hover:bg-elec-yellow/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                        className="text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goal.description && (
                    <p className="text-muted-foreground text-sm">{goal.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.currentHours} / {goal.targetHours} hours ({Math.round(progress)}%)</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingGoal} onOpenChange={() => setEditingGoal(null)}>
        <DialogContent className="bg-elec-gray border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit CPD Goal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-title" className="text-white">Goal Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-elec-dark border-elec-yellow/30 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-targetHours" className="text-white">Target Hours</Label>
                <Input
                  id="edit-targetHours"
                  type="number"
                  value={formData.targetHours}
                  onChange={(e) => setFormData({ ...formData, targetHours: e.target.value })}
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-deadline" className="text-white">Deadline</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-status" className="text-white">Status</Label>
              <Select value={formData.status} onValueChange={(value: "Active" | "Completed" | "Paused") => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-yellow/20">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-category" className="text-white">Category</Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-elec-dark border-elec-yellow/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="text-white">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-elec-dark border-elec-yellow/30 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400">
                Update Goal
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setEditingGoal(null)}
                className="border-elec-yellow/30"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CPDGoals;
