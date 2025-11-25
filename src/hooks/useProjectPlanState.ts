import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  EditableProjectPlan,
  ProjectPhase,
  ProjectTask,
  ProjectMaterial,
  ProjectRisk,
  HistoryAction,
} from '@/types/projectPlan';

const MAX_HISTORY = 10;

interface UseProjectPlanStateProps {
  initialPlan?: Partial<EditableProjectPlan>;
  autoSaveToLocalStorage?: boolean;
}

export const useProjectPlanState = ({
  initialPlan,
  autoSaveToLocalStorage = true,
}: UseProjectPlanStateProps = {}) => {
  const [plan, setPlan] = useState<EditableProjectPlan>(() => {
    // Try to load from localStorage first
    if (autoSaveToLocalStorage) {
      const saved = localStorage.getItem('draft-project-plan');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved plan', e);
        }
      }
    }

    // Otherwise use initial plan or defaults
    return {
      projectName: initialPlan?.projectName || '',
      clientName: initialPlan?.clientName || '',
      location: initialPlan?.location || '',
      startDate: initialPlan?.startDate || new Date().toISOString().split('T')[0],
      phases: initialPlan?.phases || [],
      risks: initialPlan?.risks || [],
      milestones: initialPlan?.milestones || [],
      notes: initialPlan?.notes || '',
      metadata: initialPlan?.metadata || {
        estimatedDuration: 0,
        projectType: 'domestic',
      },
    };
  });

  const [history, setHistory] = useState<HistoryAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    if (autoSaveToLocalStorage && plan) {
      localStorage.setItem('draft-project-plan', JSON.stringify(plan));
    }
  }, [plan, autoSaveToLocalStorage]);

  const addToHistory = useCallback((action: HistoryAction) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), action];
      return newHistory.slice(-MAX_HISTORY); // Keep only last 10 actions
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
    setIsDirty(true);
  }, [historyIndex]);

  // Phase operations
  const addPhase = useCallback((phase: Omit<ProjectPhase, 'id' | 'tasks' | 'completed'>) => {
    const newPhase: ProjectPhase = {
      ...phase,
      id: uuidv4(),
      tasks: [],
      completed: false,
    };

    setPlan(prev => ({
      ...prev,
      phases: [...prev.phases, newPhase],
    }));

    addToHistory({
      type: 'phase',
      action: 'add',
      before: null,
      after: newPhase,
      timestamp: new Date(),
    });
  }, [addToHistory]);

  const updatePhase = useCallback((phaseId: string, updates: Partial<ProjectPhase>) => {
    setPlan(prev => {
      const phaseIndex = prev.phases.findIndex(p => p.id === phaseId);
      if (phaseIndex === -1) return prev;

      const before = prev.phases[phaseIndex];
      const updated = { ...before, ...updates };

      const newPhases = [...prev.phases];
      newPhases[phaseIndex] = updated;

      addToHistory({
        type: 'phase',
        action: 'update',
        before,
        after: updated,
        timestamp: new Date(),
      });

      return { ...prev, phases: newPhases };
    });
  }, [addToHistory]);

  const deletePhase = useCallback((phaseId: string) => {
    setPlan(prev => {
      const phase = prev.phases.find(p => p.id === phaseId);
      if (!phase) return prev;

      addToHistory({
        type: 'phase',
        action: 'delete',
        before: phase,
        after: null,
        timestamp: new Date(),
      });

      return {
        ...prev,
        phases: prev.phases.filter(p => p.id !== phaseId),
      };
    });
  }, [addToHistory]);

  const reorderPhases = useCallback((fromIndex: number, toIndex: number) => {
    setPlan(prev => {
      const newPhases = Array.from(prev.phases);
      const [removed] = newPhases.splice(fromIndex, 1);
      newPhases.splice(toIndex, 0, removed);

      // Recalculate day ranges
      let currentDay = 1;
      const recalculated = newPhases.map(phase => {
        const duration = phase.dayEnd - phase.dayStart + 1;
        const updated = {
          ...phase,
          dayStart: currentDay,
          dayEnd: currentDay + duration - 1,
        };
        currentDay = updated.dayEnd + 1;
        return updated;
      });

      return { ...prev, phases: recalculated };
    });
    setIsDirty(true);
  }, []);

  // Task operations
  const addTask = useCallback((phaseId: string, taskText: string) => {
    const newTask: ProjectTask = {
      id: uuidv4(),
      text: taskText,
      completed: false,
    };

    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? { ...phase, tasks: [...phase.tasks, newTask] }
          : phase
      ),
    }));

    addToHistory({
      type: 'task',
      action: 'add',
      before: { phaseId, task: null },
      after: { phaseId, task: newTask },
      timestamp: new Date(),
    });
  }, [addToHistory]);

  const updateTask = useCallback((phaseId: string, taskId: string, updates: Partial<ProjectTask>) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  const deleteTask = useCallback((phaseId: string, taskId: string) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.filter(task => task.id !== taskId),
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  const toggleTaskComplete = useCallback((phaseId: string, taskId: string) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  // Material operations
  const addMaterial = useCallback((phaseId: string, material: Omit<ProjectMaterial, 'id' | 'ordered'>) => {
    const newMaterial: ProjectMaterial = {
      ...material,
      id: uuidv4(),
      ordered: false,
    };

    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              materials: [...(phase.materials || []), newMaterial],
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  const updateMaterial = useCallback((phaseId: string, materialId: string, updates: Partial<ProjectMaterial>) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              materials: (phase.materials || []).map(material =>
                material.id === materialId ? { ...material, ...updates } : material
              ),
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  const deleteMaterial = useCallback((phaseId: string, materialId: string) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              materials: (phase.materials || []).filter(m => m.id !== materialId),
            }
          : phase
      ),
    }));
    setIsDirty(true);
  }, []);

  // Risk operations
  const addRisk = useCallback((risk: Omit<ProjectRisk, 'id' | 'status'>) => {
    const newRisk: ProjectRisk = {
      ...risk,
      id: uuidv4(),
      status: 'open',
    };

    setPlan(prev => ({
      ...prev,
      risks: [...prev.risks, newRisk],
    }));
    setIsDirty(true);
  }, []);

  const updateRisk = useCallback((riskId: string, updates: Partial<ProjectRisk>) => {
    setPlan(prev => ({
      ...prev,
      risks: prev.risks.map(risk =>
        risk.id === riskId ? { ...risk, ...updates } : risk
      ),
    }));
    setIsDirty(true);
  }, []);

  const deleteRisk = useCallback((riskId: string) => {
    setPlan(prev => ({
      ...prev,
      risks: prev.risks.filter(r => r.id !== riskId),
    }));
    setIsDirty(true);
  }, []);

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      // Implement undo logic based on history[historyIndex - 1]
    }
  }, [historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      // Implement redo logic based on history[historyIndex + 1]
    }
  }, [historyIndex, history.length]);

  // Export state as JSON
  const exportState = useCallback(() => {
    return JSON.stringify(plan, null, 2);
  }, [plan]);

  // Load state from JSON
  const loadState = useCallback((jsonString: string) => {
    try {
      const loaded = JSON.parse(jsonString);
      setPlan(loaded);
      setIsDirty(false);
    } catch (e) {
      console.error('Failed to load state', e);
      throw new Error('Invalid JSON format');
    }
  }, []);

  // Clear draft
  const clearDraft = useCallback(() => {
    if (autoSaveToLocalStorage) {
      localStorage.removeItem('draft-project-plan');
    }
    setIsDirty(false);
  }, [autoSaveToLocalStorage]);

  // Update project metadata
  const updateMetadata = useCallback((updates: Partial<EditableProjectPlan>) => {
    setPlan(prev => ({
      ...prev,
      ...updates,
    }));
    setIsDirty(true);
  }, []);

  return {
    plan,
    setPlan,
    isDirty,
    setIsDirty,
    
    // Phase operations
    addPhase,
    updatePhase,
    deletePhase,
    reorderPhases,
    
    // Task operations
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    
    // Material operations
    addMaterial,
    updateMaterial,
    deleteMaterial,
    
    // Risk operations
    addRisk,
    updateRisk,
    deleteRisk,
    
    // History
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    undo,
    redo,
    
    // Export/Import
    exportState,
    loadState,
    clearDraft,
    
    // Metadata
    updateMetadata,
  };
};
