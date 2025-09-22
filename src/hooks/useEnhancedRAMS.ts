// Enhanced RAMS Hook with integrated task and hazard management
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Task,
  EnhancedHazard,
  RAMSMethodLink,
  CustomHazard,
  UsageAnalytics,
  ValidationResult,
  LinkingSuggestion
} from '@/types/enhanced-rams';

export const useEnhancedRAMS = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hazards, setHazards] = useState<EnhancedHazard[]>([]);
  const [customHazards, setCustomHazards] = useState<CustomHazard[]>([]);
  const [ramsMethodLinks, setRamsMethodLinks] = useState<RAMSMethodLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all enhanced hazards from database
  const fetchHazards = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('enhanced_hazards')
        .select('*')
        .order('frequency', { ascending: false });

      if (error) throw error;
      setHazards(data || []);
    } catch (err) {
      console.error('Error fetching hazards:', err);
      setError('Failed to fetch hazards');
    }
  }, []);

  // Fetch user's tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks((data || []) as Task[]);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's custom hazards
  const fetchCustomHazards = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('custom_hazards')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomHazards((data || []) as CustomHazard[]);
    } catch (err) {
      console.error('Error fetching custom hazards:', err);
    }
  }, []);

  // Fetch RAMS-Method Statement links
  const fetchRamsMethodLinks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('rams_method_links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRamsMethodLinks((data || []) as RAMSMethodLink[]);
    } catch (err) {
      console.error('Error fetching RAMS-Method links:', err);
    }
  }, []);

  // Create a new task
  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => [data as Task, ...prev]);
      
      // Track usage analytics
      await trackUsage('task', data.id, 'create', { category: taskData.category });
      
      toast({
        title: 'Task Created',
        description: `Task "${taskData.title}" has been created successfully.`,
      });

      return data;
    } catch (err) {
      console.error('Error creating task:', err);
      toast({
        title: 'Error',
        description: 'Failed to create task',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Update a task
  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => task.id === taskId ? data as Task : task));
      
      // Track usage analytics
      await trackUsage('task', taskId, 'update', updates);
      
      toast({
        title: 'Task Updated',
        description: 'Task has been updated successfully.',
      });

      return data;
    } catch (err) {
      console.error('Error updating task:', err);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Delete a task
  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      toast({
        title: 'Task Deleted',
        description: 'Task has been deleted successfully.',
      });
    } catch (err) {
      console.error('Error deleting task:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Create a custom hazard
  const createCustomHazard = useCallback(async (hazardData: Omit<CustomHazard, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('custom_hazards')
        .insert({
          ...hazardData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setCustomHazards(prev => [data as CustomHazard, ...prev]);
      
      toast({
        title: 'Custom Hazard Created',
        description: `Hazard "${hazardData.name}" has been created successfully.`,
      });

      return data;
    } catch (err) {
      console.error('Error creating custom hazard:', err);
      toast({
        title: 'Error',
        description: 'Failed to create custom hazard',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Link hazards to tasks
  const linkHazardToTask = useCallback(async (taskId: string, hazardId: string) => {
    try {
      // Update task with linked hazard
      const task = tasks.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');

      const updatedHazards = [...task.linked_hazards];
      if (!updatedHazards.includes(hazardId)) {
        updatedHazards.push(hazardId);
      }

      await updateTask(taskId, { linked_hazards: updatedHazards });

      // Update hazard usage frequency
      const { data: currentHazard } = await supabase
        .from('enhanced_hazards')
        .select('frequency')
        .eq('hazard_id', hazardId)
        .single();
      
      await supabase
        .from('enhanced_hazards')
        .update({ 
          frequency: (currentHazard?.frequency || 0) + 1,
          last_used: new Date().toISOString()
        })
        .eq('hazard_id', hazardId);

      // Track usage analytics
      await trackUsage('hazard', hazardId, 'link_to_task', { task_id: taskId });

      toast({
        title: 'Hazard Linked',
        description: 'Hazard has been linked to the task successfully.',
      });
    } catch (err) {
      console.error('Error linking hazard to task:', err);
      toast({
        title: 'Error',
        description: 'Failed to link hazard to task',
        variant: 'destructive',
      });
    }
  }, [tasks, updateTask, toast]);

  // Create RAMS-Method Statement link
  const createRamsMethodLink = useCallback(async (linkData: Omit<RAMSMethodLink, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('rams_method_links')
        .insert({
          ...linkData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      setRamsMethodLinks(prev => [data as RAMSMethodLink, ...prev]);
      
      toast({
        title: 'Documents Linked',
        description: 'RAMS and Method Statement have been linked successfully.',
      });

      return data;
    } catch (err) {
      console.error('Error creating RAMS-Method link:', err);
      toast({
        title: 'Error',
        description: 'Failed to link documents',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Get hazard suggestions for a task
  const getHazardSuggestions = useCallback((task: Task): LinkingSuggestion[] => {
    const suggestions: LinkingSuggestion[] = [];
    
    // Get hazards from the same category
    const categoryHazards = hazards.filter(h => 
      h.category.toLowerCase().includes(task.category.toLowerCase()) ||
      task.category.toLowerCase().includes(h.category.toLowerCase())
    );

    categoryHazards.forEach(hazard => {
      suggestions.push({
        type: 'hazard',
        id: hazard.hazard_id,
        name: hazard.hazard_name,
        confidence: 0.8,
        reason: `Common in ${task.category} work`
      });
    });

    // Get frequently used hazards
    const frequentHazards = hazards
      .filter(h => h.frequency > 5)
      .slice(0, 3);

    frequentHazards.forEach(hazard => {
      if (!suggestions.find(s => s.id === hazard.hazard_id)) {
        suggestions.push({
          type: 'hazard',
          id: hazard.hazard_id,
          name: hazard.hazard_name,
          confidence: 0.6,
          reason: 'Frequently used hazard'
        });
      }
    });

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }, [hazards]);

  // Validate task completeness
  const validateTask = useCallback((task: Task): ValidationResult => {
    const warnings: string[] = [];
    const errors: string[] = [];
    const suggestions = getHazardSuggestions(task);

    // Check for missing required fields
    if (!task.title.trim()) errors.push('Task title is required');
    if (!task.category.trim()) errors.push('Task category is required');
    if (!task.risk_level) errors.push('Risk level must be specified');

    // Check for missing hazard links
    if (task.linked_hazards.length === 0) {
      warnings.push('No hazards linked to this task');
    }

    // Check for missing method step links
    if (task.linked_method_steps.length === 0) {
      warnings.push('No method steps linked to this task');
    }

    // Check for high-risk tasks without adequate controls
    if (task.risk_level === 'high' && task.linked_hazards.length < 2) {
      warnings.push('High-risk tasks should have multiple hazard assessments');
    }

    return {
      is_valid: errors.length === 0,
      warnings,
      errors,
      suggestions: suggestions.slice(0, 5) // Limit to 5 suggestions
    };
  }, [getHazardSuggestions]);

  // Track usage analytics
  const trackUsage = useCallback(async (
    entityType: string,
    entityId: string,
    actionType: string,
    contextData: Record<string, any> = {}
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('usage_analytics')
        .insert({
          user_id: user?.id,
          entity_type: entityType,
          entity_id: entityId,
          action_type: actionType,
          context_data: contextData
        });
    } catch (err) {
      console.error('Error tracking usage:', err);
      // Don't throw error for analytics failures
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    fetchHazards();
    fetchTasks();
    fetchCustomHazards();
    fetchRamsMethodLinks();
  }, [fetchHazards, fetchTasks, fetchCustomHazards, fetchRamsMethodLinks]);

  return {
    // Data
    tasks,
    hazards,
    customHazards,
    ramsMethodLinks,
    loading,
    error,

    // Task operations
    createTask,
    updateTask,
    deleteTask,

    // Hazard operations
    createCustomHazard,
    linkHazardToTask,

    // Linking operations
    createRamsMethodLink,

    // Utility functions
    getHazardSuggestions,
    validateTask,
    trackUsage,

    // Refresh functions
    refetch: {
      tasks: fetchTasks,
      hazards: fetchHazards,
      customHazards: fetchCustomHazards,
      ramsMethodLinks: fetchRamsMethodLinks
    }
  };
};