import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit3, X, Link2, Users } from 'lucide-react';
import { useRAMS } from '../rams/RAMSContext';
import { toast } from '@/hooks/use-toast';

interface TaskManagerProps {
  onTaskSelect?: (taskId: string) => void;
  onLinkHazard?: (taskId: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ onTaskSelect, onLinkHazard }) => {
  const { tasks, addTask, updateTask, removeTask } = useRAMS();
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    riskLevel: 'medium' as 'low' | 'medium' | 'high',
    estimatedDuration: '',
    responsiblePerson: '',
    linkedHazards: [] as string[],
    prerequisites: [] as string[],
    status: 'pending' as 'pending' | 'in-progress' | 'completed'
  });

  const handleAddTask = useCallback(() => {
    if (newTask.title.trim() && newTask.category.trim()) {
      addTask(newTask);
      setNewTask({
        title: '',
        description: '',
        category: '',
        riskLevel: 'medium',
        estimatedDuration: '',
        responsiblePerson: '',
        linkedHazards: [],
        prerequisites: [],
        status: 'pending'
      });
      setShowAddTask(false);
      toast({
        title: 'Task Added',
        description: 'Task has been added to the project.',
        variant: 'success'
      });
    }
  }, [newTask, addTask]);

  const handleEditTask = useCallback((task: any) => {
    setEditingTask(task.id);
    setNewTask(task);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingTask && newTask.title.trim()) {
      updateTask(editingTask, newTask);
      setEditingTask(null);
      setNewTask({
        title: '',
        description: '',
        category: '',
        riskLevel: 'medium',
        estimatedDuration: '',
        responsiblePerson: '',
        linkedHazards: [],
        prerequisites: [],
        status: 'pending'
      });
      toast({
        title: 'Task Updated',
        description: 'Task has been updated successfully.',
        variant: 'success'
      });
    }
  }, [editingTask, newTask, updateTask]);

  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
    setShowAddTask(false);
    setNewTask({
      title: '',
      description: '',
      category: '',
      riskLevel: 'medium',
      estimatedDuration: '',
      responsiblePerson: '',
      linkedHazards: [],
      prerequisites: [],
      status: 'pending'
    });
  }, []);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const TaskForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white">Task Title *</Label>
          <Input
            value={newTask.title}
            onChange={useCallback((e) => setNewTask(prev => ({ ...prev, title: e.target.value })), [])}
            placeholder="Enter task title"
            className="bg-elec-dark/50 border-elec-yellow/20 text-white"
          />
        </div>
        <div>
          <Label className="text-white">Category *</Label>
          <Select value={newTask.category} onValueChange={useCallback((value) => setNewTask(prev => ({ ...prev, category: value })), [])}>
            <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/20 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="installation">Installation</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
              <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="text-white">Description</Label>
        <Textarea
          value={newTask.description}
          onChange={useCallback((e) => setNewTask(prev => ({ ...prev, description: e.target.value })), [])}
          placeholder="Enter task description"
          className="bg-elec-dark/50 border-elec-yellow/20 text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-white">Risk Level</Label>
          <Select value={newTask.riskLevel} onValueChange={useCallback((value: any) => setNewTask(prev => ({ ...prev, riskLevel: value })), [])}>
            <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Duration</Label>
          <Input
            value={newTask.estimatedDuration}
            onChange={useCallback((e) => setNewTask(prev => ({ ...prev, estimatedDuration: e.target.value })), [])}
            placeholder="e.g. 2 hours"
            className="bg-elec-dark/50 border-elec-yellow/20 text-white"
          />
        </div>
        <div>
          <Label className="text-white">Responsible Person</Label>
          <Input
            value={newTask.responsiblePerson}
            onChange={useCallback((e) => setNewTask(prev => ({ ...prev, responsiblePerson: e.target.value })), [])}
            placeholder="Enter name"
            className="bg-elec-dark/50 border-elec-yellow/20 text-white"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={editingTask ? handleSaveEdit : handleAddTask}
          className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          disabled={!newTask.title.trim() || !newTask.category.trim()}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
        <Button
          onClick={handleCancelEdit}
          variant="outline"
          className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Tasks ({tasks.length})</CardTitle>
          {!showAddTask && !editingTask && (
            <Button
              onClick={() => setShowAddTask(true)}
              size="sm"
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {(showAddTask || editingTask) && <TaskForm />}
        
        {tasks.length > 0 && (
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="border-elec-yellow/30 bg-elec-dark/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-elec-yellow/30 text-muted-foreground text-xs">
                          {task.category}
                        </Badge>
                        <Badge className={`${getRiskLevelColor(task.riskLevel)} text-white text-xs`}>
                          {task.riskLevel} risk
                        </Badge>
                        <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                          {task.status}
                        </Badge>
                        {task.linkedHazards.length > 0 && (
                          <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                            {task.linkedHazards.length} hazard{task.linkedHazards.length !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 ml-3">
                      {onLinkHazard && (
                        <Button
                          onClick={() => onLinkHazard(task.id)}
                          size="sm"
                          variant="outline"
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleEditTask(task)}
                        size="sm"
                        variant="outline"
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeTask(task.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {(task.estimatedDuration || task.responsiblePerson) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {task.estimatedDuration && (
                        <div>Duration: {task.estimatedDuration}</div>
                      )}
                      {task.responsiblePerson && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {task.responsiblePerson}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {tasks.length === 0 && !showAddTask && (
          <div className="text-center py-6 text-muted-foreground">
            <p className="mb-2">No tasks added yet</p>
            <p className="text-sm">Tasks help organize work and link hazards systematically</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(TaskManager);