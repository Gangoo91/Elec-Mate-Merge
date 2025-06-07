
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target, Calendar, Edit2, Trash2, CheckCircle } from "lucide-react";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { CPDGoal } from "@/services/cpdDataService";

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal, loading } = useCPDData();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CPDGoal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    targetHours: 0,
    deadline: "",
    category: "",
    description: "",
    status: "Active" as const,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      targetHours: 0,
      deadline: "",
      category: "",
      description: "",
      status: "Active",
    });
    setEditingGoal(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGoal) {
      updateGoal(editingGoal.id, {
        ...formData,
        status: formData.status as "Active" | "Completed" | "Paused",
      });
    } else {
      addGoal({
        ...formData,
        currentHours: 0,
        status: formData.status as "Active" | "Completed" | "Paused",
      });
    }
    
    resetForm();
  };

  const handleEdit = (goal: CPDGoal) => {
    setFormData({
      title: goal.title,
      targetHours: goal.targetHours,
      deadline: goal.deadline,
      category: goal.category,
      description: goal.description || "",
      status: goal.status,
    });
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Completed": return "bg-blue-500";
      case "Paused": return "bg-amber-500";
      default: return "bg-gray-500";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-amber-500";
    return "bg-red-500";
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-elec-yellow" />
          <h2 className="text-2xl font-bold text-white">CPD Goals</h2>
        </div>
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-elec-yellow/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingGoal ? "Edit Goal" : "Create New Goal"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Goal Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Complete Advanced Testing Course"
                  required
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="targetHours" className="text-white">Target Hours</Label>
                <Input
                  id="targetHours"
                  type="number"
                  value={formData.targetHours}
                  onChange={(e) => setFormData({ ...formData, targetHours: parseInt(e.target.value) || 0 })}
                  min="1"
                  required
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="deadline" className="text-white">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-white">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-yellow/20">
                    <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                    <SelectItem value="Regulations & Standards">Regulations & Standards</SelectItem>
                    <SelectItem value="Health & Safety">Health & Safety</SelectItem>
                    <SelectItem value="Professional Development">Professional Development</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-white">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your goal and why it's important..."
                  className="bg-elec-dark border-elec-yellow/30 text-white resize-none"
                  rows={3}
                />
              </div>
              
              {editingGoal && (
                <div>
                  <Label htmlFor="status" className="text-white">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Completed" | "Paused" })}>
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
              )}
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  {editingGoal ? "Update Goal" : "Create Goal"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="border-elec-yellow/30">
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-12 text-center">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Goals Set</h3>
            <p className="text-muted-foreground mb-6">
              Create your first CPD goal to track your professional development progress.
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Plus className="mr-2 h-4 w-4" />
              Create First Goal
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {goals.map((goal) => {
            const progressPercentage = (goal.currentHours / goal.targetHours) * 100;
            const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== "Completed";
            const daysUntilDeadline = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-white">{goal.title}</CardTitle>
                        <Badge className={`${getStatusColor(goal.status)} text-white`}>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {goal.category}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                        className="border-elec-yellow/30"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
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
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-white">
                        {goal.currentHours} / {goal.targetHours} hours ({Math.round(progressPercentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-elec-dark rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progressPercentage)}`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Deadline Info */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className={`font-medium ${
                      isOverdue ? 'text-red-400' : 
                      daysUntilDeadline <= 30 ? 'text-amber-400' : 
                      'text-white'
                    }`}>
                      {new Date(goal.deadline).toLocaleDateString()}
                      {!isOverdue && goal.status !== "Completed" && (
                        <span className="ml-2 text-xs">
                          ({daysUntilDeadline} days remaining)
                        </span>
                      )}
                      {isOverdue && (
                        <span className="ml-2 text-xs">
                          (Overdue)
                        </span>
                      )}
                    </span>
                  </div>
                  
                  {/* Quick Complete Button */}
                  {goal.status === "Active" && progressPercentage >= 100 && (
                    <Button
                      onClick={() => updateGoal(goal.id, { status: "Completed" as const })}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CPDGoals;
