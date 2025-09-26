import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  const titleInputRef = useRef<HTMLInputElement>(null);
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

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setNewTask(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setNewTask(prev => ({ ...prev, category: value }));
  }, []);

  const handleRiskLevelChange = useCallback((value: string) => {
    setNewTask(prev => ({ ...prev, riskLevel: value as 'low' | 'medium' | 'high' }));
  }, []);

  const handleDurationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(prev => ({ ...prev, estimatedDuration: e.target.value }));
  }, []);

  const handleResponsiblePersonChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(prev => ({ ...prev, responsiblePerson: e.target.value }));
  }, []);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'medium': return 'bg-gradient-to-r from-yellow-500 to-amber-500';
      case 'high': return 'bg-gradient-to-r from-red-500 to-red-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-slate-500 to-slate-600';
      case 'in-progress': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'completed': return 'bg-gradient-to-r from-green-500 to-emerald-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  // Focus management for title input
  useEffect(() => {
    if ((showAddTask || editingTask) && titleInputRef.current) {
      const timeoutId = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [showAddTask, editingTask]);

  const TaskForm = React.useMemo(() => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-white">Task Title *</Label>
          <Input
            ref={titleInputRef}
            key={`title-input-${editingTask || 'new'}`}
            value={newTask.title}
            onChange={handleTitleChange}
            onBlur={(e) => e.preventDefault()}
            onFocus={(e) => e.stopPropagation()}
            placeholder="Enter task title"
            className="bg-elec-dark/50 border-elec-yellow/20 text-white"
            autoComplete="off"
          />
        </div>
        <div>
          <Label className="text-white">Category *</Label>
          <Select value={newTask.category} onValueChange={handleCategoryChange}>
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
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
          className="bg-elec-dark/50 border-elec-yellow/20 text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-white">Risk Level</Label>
          <Select value={newTask.riskLevel} onValueChange={handleRiskLevelChange}>
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
            onChange={handleDurationChange}
            placeholder="e.g. 2 hours"
            className="bg-elec-dark/50 border-elec-yellow/20 text-white"
          />
        </div>
        <div>
          <Label className="text-white">Responsible Person</Label>
          <Input
            value={newTask.responsiblePerson}
            onChange={handleResponsiblePersonChange}
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
  ), [newTask, editingTask, handleTitleChange, handleDescriptionChange, handleCategoryChange, handleRiskLevelChange, handleDurationChange, handleResponsiblePersonChange, handleAddTask, handleSaveEdit, handleCancelEdit]);

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
        {(showAddTask || editingTask) && TaskForm}
        
        {tasks.length > 0 && (
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id} className="group border-elec-yellow/30 bg-elec-dark/20 hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10 animate-fade-in">
                <CardContent className="p-0">
                  {/* Header Section with Title and Actions */}
                  <div className="flex items-start justify-between p-4 pb-3 border-b border-elec-yellow/10">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-lg mb-1 truncate group-hover:text-elec-yellow transition-colors">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="secondary" 
                          className="bg-elec-yellow/15 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/25 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {task.category}
                        </Badge>
                        <Badge className={`${getRiskLevelColor(task.riskLevel)} text-white text-xs font-medium px-2 py-1 rounded-full border-0 shadow-sm`}>
                          {task.riskLevel}
                        </Badge>
                        <Badge 
                          className={`${getStatusColor(task.status)} text-white text-xs font-medium px-2 py-1 rounded-full border-0 shadow-sm capitalize`}
                        >
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {onLinkHazard && (
                        <Button
                          onClick={() => onLinkHazard(task.id)}
                          size="sm"
                          variant="outline"
                          className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50 hover:scale-105 transition-all duration-200"
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleEditTask(task)}
                        size="sm"
                        variant="outline"
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 hover:scale-105 transition-all duration-200"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => removeTask(task.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:scale-105 transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description Section */}
                  {task.description && (
                    <div className="px-4 py-3 border-b border-elec-yellow/10">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {task.description}
                      </p>
                    </div>
                  )}

                  {/* Metadata Section */}
                  <div className="px-4 py-3 bg-elec-dark/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {task.estimatedDuration && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span>Duration: {task.estimatedDuration}</span>
                          </div>
                        )}
                        {task.responsiblePerson && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-green-400" />
                            <span>{task.responsiblePerson}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Hazard Links Indicator */}
                      {task.linkedHazards.length > 0 && (
                        <Badge 
                          className="bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm"
                        >
                          <Link2 className="h-3 w-3 mr-1" />
                          {task.linkedHazards.length} linked
                        </Badge>
                      )}
                    </div>
                  </div>
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