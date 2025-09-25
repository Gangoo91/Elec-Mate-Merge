// Enhanced Task Manager Component
// Provides comprehensive task management with hazard linking capabilities

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Link, 
  MoreVertical,
  Trash2,
  Edit3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';
import { Task } from '@/types/enhanced-rams';
import TaskCreateDialog from './TaskCreateDialog';
import TaskEditDialog from './TaskEditDialog';
import HazardLinkingPanel from './HazardLinkingPanel';

const TaskManager: React.FC = () => {
  const {
    tasks,
    hazards,
    loading,
    updateTask,
    deleteTask,
    linkHazardToTask,
    validateTask,
    getHazardSuggestions
  } = useEnhancedRAMS();

  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [linkingTask, setLinkingTask] = useState<Task | null>(null);

  // Memoized search handler to prevent focus loss
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchTerm(e.target.value);
  }, []);

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tasks, searchTerm, selectedCategory, selectedStatus]);

  // Get unique categories and statuses for filters
  const categories = useMemo(() => {
    return Array.from(new Set(tasks.map(task => task.category)));
  }, [tasks]);

  const statuses = ['pending', 'in-progress', 'completed'] as const;

  // Get risk level color
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Handle task status update
  const handleStatusUpdate = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  // Group tasks by status for Kanban view
  const tasksByStatus = useMemo(() => {
    return {
      pending: filteredTasks.filter(task => task.status === 'pending'),
      'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
      completed: filteredTasks.filter(task => task.status === 'completed')
    };
  }, [filteredTasks]);

  const TaskCard: React.FC<{ task: Task; showActions?: boolean }> = ({ task, showActions = true }) => {
    const validation = validateTask(task);
    const suggestions = getHazardSuggestions(task);

    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(task.status)}
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <Badge className={getRiskLevelColor(task.risk_level)}>
                  {task.risk_level}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
            
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditingTask(task)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLinkingTask(task)}>
                    <Link className="w-4 h-4 mr-2" />
                    Link Hazards
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Task metadata */}
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Category: {task.category}</span>
              {task.estimated_duration && (
                <span>• Duration: {task.estimated_duration}</span>
              )}
              {task.responsible_person && (
                <span>• Responsible: {task.responsible_person}</span>
              )}
            </div>

            {/* Linked hazards */}
            {task.linked_hazards.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Linked Hazards:</p>
                <div className="flex flex-wrap gap-1">
                  {task.linked_hazards.map(hazardId => {
                    const hazard = hazards.find(h => h.hazard_id === hazardId);
                    return (
                      <Badge key={hazardId} variant="outline" className="text-xs">
                        {hazard?.hazard_name || hazardId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Validation warnings */}
            {!validation.is_valid && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>{validation.errors[0]}</span>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && task.linked_hazards.length < 3 && (
              <div className="text-sm">
                <p className="font-medium text-blue-600 mb-1">Suggested Hazards:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestions.slice(0, 2).map(suggestion => (
                    <Button
                      key={suggestion.id}
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs border border-blue-200 hover:bg-blue-50"
                      onClick={() => linkHazardToTask(task.id, suggestion.id)}
                    >
                      + {suggestion.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick status actions */}
            {showActions && task.status !== 'completed' && (
              <div className="flex gap-2">
                {task.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate(task.id, 'in-progress')}
                  >
                    Start Task
                  </Button>
                )}
                {task.status === 'in-progress' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate(task.id, 'completed')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Management</h2>
          <p className="text-muted-foreground">
            Manage your work tasks with integrated hazard assessment
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  key="task-search-input"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={(e) => e.preventDefault()}
                  onFocus={(e) => e.stopPropagation()}
                  className="pl-10"
                  autoComplete="off"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task views */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground">
                    {tasks.length === 0 
                      ? "Create your first task to get started"
                      : "Try adjusting your filters or search term"
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="kanban" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending Tasks */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-gray-600" />
                Pending ({tasksByStatus.pending.length})
              </h3>
              <div className="space-y-4">
                {tasksByStatus.pending.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* In Progress Tasks */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                In Progress ({tasksByStatus['in-progress'].length})
              </h3>
              <div className="space-y-4">
                {tasksByStatus['in-progress'].map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Completed Tasks */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Completed ({tasksByStatus.completed.length})
              </h3>
              <div className="space-y-4">
                {tasksByStatus.completed.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TaskCreateDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
      
      {editingTask && (
        <TaskEditDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        />
      )}
      
      {linkingTask && (
        <HazardLinkingPanel
          task={linkingTask}
          open={!!linkingTask}
          onOpenChange={(open) => !open && setLinkingTask(null)}
        />
      )}
    </div>
  );
};

export default React.memo(TaskManager);