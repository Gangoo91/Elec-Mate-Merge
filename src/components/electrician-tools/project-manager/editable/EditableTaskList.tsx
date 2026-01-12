import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { ProjectTask } from '@/types/projectPlan';

interface EditableTaskListProps {
  tasks: ProjectTask[];
  onAddTask: (taskText: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<ProjectTask>) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
}

export const EditableTaskList = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
}: EditableTaskListProps) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
      setIsAddingTask(false);
    }
  };

  const handleStartEdit = (task: ProjectTask) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = () => {
    if (editingTaskId && editedText.trim()) {
      onUpdateTask(editingTaskId, { text: editedText.trim() });
      setEditingTaskId(null);
      setEditedText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedText('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">Tasks</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="h-8 gap-1"
        >
          <Plus className="h-3 w-3" />
          Add Task
        </Button>
      </div>

      {/* Existing tasks */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-2 group">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              className="mt-1"
            />
            
            {editingTaskId === task.id ? (
              <div className="flex-1 flex gap-2">
                <MobileInput
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                />
                <Button size="sm" onClick={handleSaveEdit} className="h-12 w-12 shrink-0">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="h-12 w-12 shrink-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex items-start justify-between gap-2">
                <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.text}
                </span>
                <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStartEdit(task)}
                    className="h-7 w-7 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new task */}
      {isAddingTask && (
        <div className="flex gap-2 pt-2 border-t border-border/40">
          <MobileInput
            placeholder="Enter new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddTask();
              if (e.key === 'Escape') {
                setIsAddingTask(false);
                setNewTaskText('');
              }
            }}
            className="flex-1"
            autoFocus
          />
          <Button size="sm" onClick={handleAddTask} className="h-12 shrink-0">
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsAddingTask(false);
              setNewTaskText('');
            }}
            className="h-12 shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
