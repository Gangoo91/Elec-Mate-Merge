
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Target, Edit, Trash2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useCPDData } from "@/hooks/cpd/useCPDData";
import { CPDGoal } from "@/services/cpdDataService";

const CPDGoals = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useCPDData();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<CPDGoal | null>(null);
  const [deadline, setDeadline] = useState<Date>();
  
  const [formData, setFormData] = useState({
    title: "",
    targetHours: "",
    category: "",
    description: "",
    status: "Active" as const,
  });

  const categories = [
    "General",
    "Technical Skills",
    "Regulations & Standards",
    "Health & Safety",
    "Management & Leadership",
    "Customer Service",
    "Environmental Awareness",
    "Quality Systems"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      targetHours: "",
      category: "",
      description: "",
      status: "Active",
    });
    setDeadline(undefined);
  };

  const handleCreateGoal = () => {
    if (!formData.title || !formData.targetHours || !deadline) return;

    addGoal({
      title: formData.title,
      targetHours: parseFloat(formData.targetHours),
      currentHours: 0,
      deadline: deadline.toISOString(),
      category: formData.category,
      status: formData.status,
      description: formData.description,
    });

    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleEditGoal = () => {
    if (!editingGoal || !formData.title || !formData.targetHours || !deadline) return;

    updateGoal(editingGoal.id, {
      title: formData.title,
      targetHours: parseFloat(formData.targetHours),
      deadline: deadline.toISOString(),
      category: formData.category,
      status: formData.status,
      description: formData.description,
    });

    resetForm();
    setIsEditDialogOpen(false);
    setEditingGoal(null);
  };

  const openEditDialog = (goal: CPDGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetHours: goal.targetHours.toString(),
      category: goal.category,
      description: goal.description || "",
      status: goal.status,
    });
    setDeadline(new Date(goal.deadline));
    setIsEditDialogOpen(true);
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'Active': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Paused': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30';
    }
  };

  const GoalForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal-title">Goal Title</Label>
        <Input
          id="goal-title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="e.g., Complete Advanced Testing Course"
          className="bg-elec-dark border-elec-yellow/20 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="target-hours">Target Hours</Label>
          <Input
            id="target-hours"
            type="number"
            min="1"
            value={formData.targetHours}
            onChange={(e) => handleInputChange("targetHours", e.target.value)}
            placeholder="20"
            className="bg-elec-dark border-elec-yellow/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-elec-dark border-elec-yellow/20",
                !deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : "Pick a deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={formData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe this goal and what you hope to achieve..."
          className="bg-elec-dark border-elec-yellow/20 text-white"
          rows={3}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">CPD Goals</h2>
          <p className="text-muted-foreground">Set and track your professional development objectives</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Plus className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-elec-yellow/20">
            <DialogHeader>
              <DialogTitle className="text-white">Create New CPD Goal</DialogTitle>
            </DialogHeader>
            <GoalForm />
            <div className="flex gap-3">
              <Button 
                onClick={handleCreateGoal}
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400"
              >
                Create Goal
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-elec-yellow/30"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progressPercentage = Math.round((goal.currentHours / goal.targetHours) * 100);
          const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== 'Completed';
          
          return (
            <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg text-white line-clamp-2">
                      {goal.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          Overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(goal)}
                      className="h-8 w-8 p-0 hover:bg-elec-yellow/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="h-8 w-8 p-0 hover:bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.currentHours} / {goal.targetHours} hours</span>
                  </div>
                  <Progress 
                    value={Math.min(progressPercentage, 100)} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage}% complete
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-elec-yellow" />
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-white">{goal.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-elec-yellow" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className={isOverdue ? "text-red-400" : "text-white"}>
                      {format(new Date(goal.deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                
                {goal.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {goal.description}
                  </p>
                )}
                
                {goal.status === 'Completed' && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Goal completed!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No CPD Goals Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first goal to start tracking your professional development progress
            </p>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-elec-gray border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit CPD Goal</DialogTitle>
          </DialogHeader>
          <GoalForm />
          <div className="flex gap-3">
            <Button 
              onClick={handleEditGoal}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-elec-yellow/30"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CPDGoals;
