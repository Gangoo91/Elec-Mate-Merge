// Task Creation Dialog Component
// Provides comprehensive task creation with hazard linking

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  X, 
  Plus,
  AlertTriangle,
  Clock,
  User
} from 'lucide-react';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';
import { Task } from '@/types/enhanced-rams';

interface TaskCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Common task categories for electrical work
const taskCategories = [
  'Installation',
  'Maintenance', 
  'Testing & Inspection',
  'Repair',
  'Commissioning',
  'Design',
  'Safety Assessment',
  'Documentation'
];

// Risk level options
const riskLevels: Array<{ value: Task['risk_level']; label: string; color: string }> = [
  { value: 'low', label: 'Low Risk', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High Risk', color: 'bg-red-100 text-red-800' }
];

const TaskCreateDialog: React.FC<TaskCreateDialogProps> = React.memo(({ open, onOpenChange }) => {
  const { createTask, hazards, getHazardSuggestions } = useEnhancedRAMS();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    estimated_duration: '',
    risk_level: 'medium' as Task['risk_level'],
    responsible_person: '',
    linked_hazards: [] as string[],
    prerequisites: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get hazard suggestions based on current form data
  const suggestions = React.useMemo(() => {
    if (!formData.category) return [];
    
    const mockTask: Partial<Task> = {
      category: formData.category,
      risk_level: formData.risk_level
    };
    
    return getHazardSuggestions(mockTask as Task);
  }, [formData.category, formData.risk_level, getHazardSuggestions]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        estimated_duration: formData.estimated_duration,
        risk_level: formData.risk_level,
        responsible_person: formData.responsible_person.trim(),
        linked_hazards: formData.linked_hazards,
        linked_method_steps: [],
        prerequisites: formData.prerequisites,
        status: 'pending'
      });

      // Reset form and close dialog
      setFormData({
        title: '',
        description: '',
        category: '',
        estimated_duration: '',
        risk_level: 'medium',
        responsible_person: '',
        linked_hazards: [],
        prerequisites: []
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [createTask, formData, onOpenChange]);

  // Handle hazard selection
  const handleHazardToggle = useCallback((hazardId: string) => {
    setFormData(prev => ({
      ...prev,
      linked_hazards: prev.linked_hazards.includes(hazardId)
        ? prev.linked_hazards.filter(id => id !== hazardId)
        : [...prev.linked_hazards, hazardId]
    }));
  }, []);

  // Get hazard name by ID
  const getHazardName = useCallback((hazardId: string) => {
    const hazard = hazards.find(h => h.hazard_id === hazardId);
    return hazard?.hazard_name || hazardId;
  }, [hazards]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, title: e.target.value })), [])}
                placeholder="Enter task title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value })), [])}
                placeholder="Describe the task in detail..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={useCallback((value: string) => {
                    setFormData(prev => ({ ...prev, category: value }));
                    setShowSuggestions(true);
                  }, [])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {taskCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="risk_level">Risk Level</Label>
                <Select
                  value={formData.risk_level}
                  onValueChange={useCallback((value: Task['risk_level']) => 
                    setFormData(prev => ({ ...prev, risk_level: value }))
                  , [])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {riskLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${level.color}`} />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  value={formData.estimated_duration}
                  onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, estimated_duration: e.target.value })), [])}
                  placeholder="e.g., 2 hours, 1 day"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsible">Responsible Person</Label>
                <Input
                  id="responsible"
                  value={formData.responsible_person}
                  onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, responsible_person: e.target.value })), [])}
                  placeholder="Enter name..."
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Hazard Linking */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Linked Hazards</h3>
              <Badge variant="outline">
                {formData.linked_hazards.length} selected
              </Badge>
            </div>

            {/* Currently selected hazards */}
            {formData.linked_hazards.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Hazards:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.linked_hazards.map(hazardId => (
                    <Badge 
                      key={hazardId} 
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => handleHazardToggle(hazardId)}
                    >
                      {getHazardName(hazardId)}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Hazard suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Suggested Hazards for {formData.category}:
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestions.slice(0, 6).map(suggestion => {
                    const isSelected = formData.linked_hazards.includes(suggestion.id);
                    return (
                      <Button
                        key={suggestion.id}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className="justify-start text-left h-auto p-3"
                        onClick={() => handleHazardToggle(suggestion.id)}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.reason}
                          </div>
                        </div>
                        {isSelected && <X className="w-4 h-4 ml-2" />}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={useCallback(() => onOpenChange(false), [onOpenChange])}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.category}
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default TaskCreateDialog;