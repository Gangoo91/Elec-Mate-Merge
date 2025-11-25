import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Edit2, Trash2, Check, Plus, GripVertical } from 'lucide-react';
import { ProjectPhase } from '@/types/projectPlan';
import { EditableTaskList } from './EditableTaskList';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EditablePhaseCardProps {
  phase: ProjectPhase;
  onUpdate: (updates: Partial<ProjectPhase>) => void;
  onDelete: () => void;
  onAddTask: (taskText: string) => void;
  onUpdateTask: (taskId: string, updates: any) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export const EditablePhaseCard = ({
  phase,
  onUpdate,
  onDelete,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  isDragging,
  dragHandleProps,
}: EditablePhaseCardProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(phase.phaseName);
  const [isEditingDays, setIsEditingDays] = useState(false);
  const [dayStart, setDayStart] = useState(phase.dayStart);
  const [dayEnd, setDayEnd] = useState(phase.dayEnd);

  const handleSaveName = () => {
    onUpdate({ phaseName: editedName });
    setIsEditingName(false);
  };

  const handleSaveDays = () => {
    onUpdate({ dayStart, dayEnd });
    setIsEditingDays(false);
  };

  const completedTasks = phase.tasks.filter(t => t.completed).length;
  const totalTasks = phase.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className={`${isDragging ? 'opacity-50' : ''} transition-opacity`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-2 flex-1">
            {dragHandleProps && (
              <button {...dragHandleProps} className="cursor-grab mt-1 text-muted-foreground hover:text-foreground touch-manipulation">
                <GripVertical className="h-5 w-5" />
              </button>
            )}
            
            <div className="flex-1 space-y-2">
              {isEditingName ? (
                <div className="flex gap-2">
                  <MobileInput
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSaveName} className="shrink-0">
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{phase.phaseName}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingName(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {isEditingDays ? (
                <div className="flex gap-2 items-center">
                  <MobileInput
                    type="number"
                    value={dayStart}
                    onChange={(e) => setDayStart(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">to</span>
                  <MobileInput
                    type="number"
                    value={dayEnd}
                    onChange={(e) => setDayEnd(Number(e.target.value))}
                    className="w-20"
                  />
                  <Button size="sm" onClick={handleSaveDays}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Day {phase.dayStart} - {phase.dayEnd} ({phase.dayEnd - phase.dayStart + 1} days)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingDays(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* Progress bar */}
              {totalTasks > 0 && (
                <div className="space-y-1">
                  <div className="h-2 bg-elec-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {completedTasks} of {totalTasks} tasks completed
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Phase</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{phase.phaseName}"? This will remove all tasks and materials associated with this phase.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tasks */}
        <EditableTaskList
          tasks={phase.tasks}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />

        {/* Hold Points */}
        {phase.holdPoints && phase.holdPoints.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Hold Points</h4>
            <div className="space-y-1">
              {phase.holdPoints.map((point, idx) => (
                <div key={idx} className="text-sm bg-orange-500/10 border border-orange-500/20 rounded-md p-2">
                  ⚠️ {point}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trade Coordination */}
        {phase.tradeCoordination && phase.tradeCoordination.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Trade Coordination</h4>
            <div className="space-y-1">
              {phase.tradeCoordination.map((coord) => (
                <div key={coord.id} className="text-sm bg-blue-500/10 border border-blue-500/20 rounded-md p-2">
                  <strong>{coord.trade}</strong> - Day {coord.day}: {coord.note}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {phase.materials && phase.materials.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Materials</h4>
            <div className="space-y-1">
              {phase.materials.map((material) => (
                <div key={material.id} className="text-sm bg-muted/30 rounded-md p-2">
                  {material.name} - {material.quantity}{material.unit || ''}
                  {material.orderBy && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (Order by: {material.orderBy})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
