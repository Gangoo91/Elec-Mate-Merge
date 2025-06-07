
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Target, Plus, Edit2, Trash2, CheckCircle } from "lucide-react";

const CPDGoals = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "",
    targetHours: "",
    deadline: "",
    priority: "medium"
  });

  // Mock data - in real implementation this would come from the database
  const goals = [
    {
      id: 1,
      title: "Annual CPD Requirement",
      category: "General",
      targetHours: 35,
      completedHours: 28,
      deadline: "2024-12-31",
      priority: "high",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Regulations Update Training",
      category: "Regulations & Standards",
      targetHours: 8,
      completedHours: 4,
      deadline: "2024-06-30",
      priority: "high",
      status: "in-progress"
    },
    {
      id: 3,
      title: "Management Skills Development",
      category: "Management & Leadership",
      targetHours: 12,
      completedHours: 0,
      deadline: "2024-09-30",
      priority: "medium",
      status: "not-started"
    },
    {
      id: 4,
      title: "Health & Safety Certification",
      category: "Health & Safety",
      targetHours: 6,
      completedHours: 6,
      deadline: "2024-03-31",
      priority: "high",
      status: "completed"
    }
  ];

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

  const priorities = ["low", "medium", "high"];

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save to the database
    console.log("New Goal:", newGoal);
    setNewGoal({
      title: "",
      category: "",
      targetHours: "",
      deadline: "",
      priority: "medium"
    });
    setShowAddGoal(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "low": return "bg-green-500/10 text-green-400 border-green-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "in-progress": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "not-started": return "bg-gray-500/10 text-gray-400 border-gray-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "not-started": return "Not Started";
      default: return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">CPD Goals</h2>
          <p className="text-muted-foreground">Set and track your professional development goals</p>
        </div>
        <Button 
          onClick={() => setShowAddGoal(true)}
          className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      {showAddGoal && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Add New CPD Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goalTitle">Goal Title</Label>
                  <Input
                    id="goalTitle"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Complete Safety Training"
                    className="bg-elec-dark border-elec-yellow/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
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

                <div className="space-y-2">
                  <Label htmlFor="targetHours">Target Hours</Label>
                  <Input
                    id="targetHours"
                    type="number"
                    min="1"
                    value={newGoal.targetHours}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetHours: e.target.value }))}
                    placeholder="e.g., 10"
                    className="bg-elec-dark border-elec-yellow/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="bg-elec-dark border-elec-yellow/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
                  Add Goal
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddGoal(false)}
                  className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progressPercentage = Math.round((goal.completedHours / goal.targetHours) * 100);
          
          return (
            <Card key={goal.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        {goal.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {goal.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {goal.category}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority)}`}>
                          {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(goal.status)}`}>
                          {getStatusText(goal.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-500/30 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.completedHours} / {goal.targetHours} hours ({progressPercentage}%)</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Deadline: {goal.deadline}</span>
                    <span>{goal.targetHours - goal.completedHours} hours remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CPDGoals;
