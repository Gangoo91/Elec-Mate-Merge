import { useState, useEffect, useCallback, useMemo } from 'react';

export interface SavedRiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  timestamp: string;
  location: string;
}

interface AssessmentProgressState {
  checklists: Record<string, { checked: boolean; note: string; timestamp: string }>;
  riskAssessments: SavedRiskAssessment[];
  lastUpdated: string;
}

const STORAGE_KEY = 'elec-mate-assessment-progress';

const getInitialState = (): AssessmentProgressState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load assessment progress:', error);
  }
  return {
    checklists: {},
    riskAssessments: [],
    lastUpdated: new Date().toISOString(),
  };
};

export const useAssessmentProgress = () => {
  const [state, setState] = useState<AssessmentProgressState>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save assessment progress:', error);
    }
  }, [state]);

  const toggleCheckItem = useCallback((id: string) => {
    setState(prev => {
      const existing = prev.checklists[id];
      const now = new Date().toISOString();
      if (existing?.checked) {
        const { [id]: _, ...rest } = prev.checklists;
        return { ...prev, checklists: rest, lastUpdated: now };
      }
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [id]: { checked: true, note: existing?.note || '', timestamp: now },
        },
        lastUpdated: now,
      };
    });
  }, []);

  const addNote = useCallback((id: string, note: string) => {
    setState(prev => {
      const existing = prev.checklists[id];
      const now = new Date().toISOString();
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [id]: {
            checked: existing?.checked || false,
            note,
            timestamp: now,
          },
        },
        lastUpdated: now,
      };
    });
  }, []);

  const saveRiskAssessment = useCallback((data: Omit<SavedRiskAssessment, 'id' | 'timestamp'>) => {
    const assessment: SavedRiskAssessment = {
      ...data,
      id: `RA-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setState(prev => ({
      ...prev,
      riskAssessments: [...prev.riskAssessments, assessment],
      lastUpdated: new Date().toISOString(),
    }));
    return assessment;
  }, []);

  const clearProgress = useCallback(() => {
    const fresh: AssessmentProgressState = {
      checklists: {},
      riskAssessments: [],
      lastUpdated: new Date().toISOString(),
    };
    setState(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear assessment progress:', error);
    }
  }, []);

  const isChecked = useCallback((id: string) => {
    return state.checklists[id]?.checked || false;
  }, [state.checklists]);

  const getNote = useCallback((id: string) => {
    return state.checklists[id]?.note || '';
  }, [state.checklists]);

  const completedCount = useMemo(() => {
    return Object.values(state.checklists).filter(v => v.checked).length;
  }, [state.checklists]);

  const getCategoryProgress = useCallback((categoryItemIds: string[]) => {
    const checked = categoryItemIds.filter(id => state.checklists[id]?.checked).length;
    return { checked, total: categoryItemIds.length };
  }, [state.checklists]);

  const exportAsText = useCallback((totalCount: number, categories: { name: string; items: { id: string; text: string }[] }[]) => {
    const lines: string[] = [
      'SITE ASSESSMENT CHECKLIST REPORT',
      '='.repeat(40),
      `Date: ${new Date().toLocaleDateString('en-GB')}`,
      `Completed: ${completedCount}/${totalCount}`,
      '',
    ];

    for (const cat of categories) {
      const catProgress = getCategoryProgress(cat.items.map(i => i.id));
      lines.push(`--- ${cat.name} (${catProgress.checked}/${catProgress.total}) ---`);
      for (const item of cat.items) {
        const checked = state.checklists[item.id]?.checked ? '[x]' : '[ ]';
        const note = state.checklists[item.id]?.note;
        lines.push(`  ${checked} ${item.text}`);
        if (note) lines.push(`       Note: ${note}`);
      }
      lines.push('');
    }

    if (state.riskAssessments.length > 0) {
      lines.push('RISK ASSESSMENTS');
      lines.push('='.repeat(40));
      for (const ra of state.riskAssessments) {
        lines.push(`Hazard: ${ra.hazard}`);
        lines.push(`Risk Score: ${ra.riskScore} (${ra.riskLevel})`);
        lines.push(`Likelihood: ${ra.likelihood}/5 | Severity: ${ra.severity}/5`);
        if (ra.controlMeasures.length > 0) {
          lines.push('Control Measures:');
          ra.controlMeasures.forEach((m, i) => lines.push(`  ${i + 1}. ${m}`));
        }
        lines.push('');
      }
    }

    lines.push('Generated by Elec-Mate Site Assessment Tools');
    return lines.join('\n');
  }, [completedCount, getCategoryProgress, state.checklists, state.riskAssessments]);

  return {
    toggleCheckItem,
    addNote,
    saveRiskAssessment,
    clearProgress,
    isChecked,
    getNote,
    completedCount,
    getCategoryProgress,
    exportAsText,
    riskAssessments: state.riskAssessments,
    lastUpdated: state.lastUpdated,
  };
};
