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
import { Target, Plus, Calendar, TrendingUp, Edit, Trash2 } from "lucide-react";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { CPDGoal } from "@/services/cpdDataService";

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useCPDData();
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
        return "bg-green-500";
      case "Paused":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="h-6 w-6 text-elec-yellow" />
            CPD Goals
          </h2>
          <p className="text-muted-foreground">Set and track your professional development goals</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-elec-yellow/20">
            <DialogHeader>
              <DialogTitle className="text-white">
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
                  className="bg-elec-dark border-elec-yellow/30 text-white"
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
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-yellow/20">
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
              </div>
              
              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description of this goal..."
                  className="bg-elec-dark border-elec-yellow/30 text-white"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSubmit} className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
                <Button variant="outline" onClick={resetForm} className="border-elec-yellow/30">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No goals set yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first CPD goal to start tracking your professional development progress.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-white">{goal.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(goal.status)} text-white`}>
                        {goal.status}
                      </Badge>
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                        {goal.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(goal)}
                      className="h-8 w-8 p-0 hover:bg-elec-yellow/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteGoal(goal.id)}
                      className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-elec-yellow">
                      {goal.currentHours} / {goal.targetHours} hours
                    </span>
                  </div>
                  <Progress 
                    value={(goal.currentHours / goal.targetHours) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((goal.currentHours / goal.targetHours) * 100)}% complete
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  {goal.description && (
                    <p className="text-muted-foreground text-xs">
                      {goal.description}
                    </p>
                  )}
                </div>
                
                {/* Time Remaining */}
                <div className="text-xs text-muted-foreground">
                  {goal.targetHours - goal.currentHours > 0 && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{goal.targetHours - goal.currentHours} hours remaining</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CPDGoals;
