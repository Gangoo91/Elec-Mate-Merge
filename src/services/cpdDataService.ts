
export interface CPDEntry {
  id: string;
  date: string;
  activity: string;
  category: string;
  type: string;
  hours: number;
  provider: string;
  description?: string;
  learningOutcomes?: string;
  certificate?: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  isAutomatic?: boolean;
  evidenceFiles?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CPDGoal {
  id: string;
  title: string;
  targetHours: number;
  currentHours: number;
  deadline: string;
  category: string;
  status: 'Active' | 'Completed' | 'Paused';
  description?: string;
  createdAt: string;
}

export interface CPDStats {
  totalHours: number;
  targetHours: number;
  hoursThisYear: number;
  hoursThisMonth: number;
  completionPercentage: number;
  daysRemaining: number;
  averageHoursPerMonth: number;
  categoryBreakdown: Array<{
    category: string;
    hours: number;
    percentage: number;
  }>;
}

class CPDDataService {
  private readonly STORAGE_KEY = 'cpd_entries';
  private readonly GOALS_KEY = 'cpd_goals';
  private readonly SETTINGS_KEY = 'cpd_settings';

  // CPD Entries Management
  getEntries(): CPDEntry[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return this.getDefaultEntries();
    return JSON.parse(stored);
  }

  saveEntry(entry: Omit<CPDEntry, 'id' | 'createdAt' | 'updatedAt'>): CPDEntry {
    const entries = this.getEntries();
    const newEntry: CPDEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    entries.push(newEntry);
    this.saveEntries(entries);
    return newEntry;
  }

  updateEntry(id: string, updates: Partial<CPDEntry>): CPDEntry | null {
    const entries = this.getEntries();
    const index = entries.findIndex(entry => entry.id === id);
    if (index === -1) return null;
    
    entries[index] = {
      ...entries[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveEntries(entries);
    return entries[index];
  }

  deleteEntry(id: string): boolean {
    const entries = this.getEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    if (filteredEntries.length === entries.length) return false;
    this.saveEntries(filteredEntries);
    return true;
  }

  private saveEntries(entries: CPDEntry[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
  }

  // Goals Management
  getGoals(): CPDGoal[] {
    const stored = localStorage.getItem(this.GOALS_KEY);
    if (!stored) return this.getDefaultGoals();
    return JSON.parse(stored);
  }

  saveGoal(goal: Omit<CPDGoal, 'id' | 'createdAt'>): CPDGoal {
    const goals = this.getGoals();
    const newGoal: CPDGoal = {
      ...goal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    goals.push(newGoal);
    this.saveGoals(goals);
    return newGoal;
  }

  updateGoal(id: string, updates: Partial<CPDGoal>): CPDGoal | null {
    const goals = this.getGoals();
    const index = goals.findIndex(goal => goal.id === id);
    if (index === -1) return null;
    
    goals[index] = { ...goals[index], ...updates };
    this.saveGoals(goals);
    return goals[index];
  }

  deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const filteredGoals = goals.filter(goal => goal.id !== id);
    if (filteredGoals.length === goals.length) return false;
    this.saveGoals(filteredGoals);
    return true;
  }

  private saveGoals(goals: CPDGoal[]): void {
    localStorage.setItem(this.GOALS_KEY, JSON.stringify(goals));
  }

  // Statistics and Analytics
  getStats(): CPDStats {
    const entries = this.getEntries();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    const yearEntries = entries.filter(entry => 
      new Date(entry.date).getFullYear() === currentYear
    );
    
    const monthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === currentYear && 
             entryDate.getMonth() === currentMonth;
    });

    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
    const hoursThisYear = yearEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const hoursThisMonth = monthEntries.reduce((sum, entry) => sum + entry.hours, 0);
    
    const targetHours = 35; // Default annual target
    const completionPercentage = Math.round((hoursThisYear / targetHours) * 100);
    
    const now = new Date();
    const endOfYear = new Date(currentYear, 11, 31);
    const daysRemaining = Math.ceil((endOfYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    const averageHoursPerMonth = hoursThisYear / (currentMonth + 1);

    // Category breakdown
    const categoryMap = new Map<string, number>();
    yearEntries.forEach(entry => {
      const current = categoryMap.get(entry.category) || 0;
      categoryMap.set(entry.category, current + entry.hours);
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, hours]) => ({
      category,
      hours,
      percentage: Math.round((hours / hoursThisYear) * 100) || 0,
    }));

    return {
      totalHours,
      targetHours,
      hoursThisYear,
      hoursThisMonth,
      completionPercentage,
      daysRemaining,
      averageHoursPerMonth,
      categoryBreakdown,
    };
  }

  // Auto-tracking integration
  addAutoTrackedHours(activity: string, hours: number, source: string): CPDEntry {
    return this.saveEntry({
      date: new Date().toISOString().split('T')[0],
      activity: `${activity} (Auto-tracked)`,
      category: 'Self-directed Learning',
      type: 'Work-based Learning',
      hours,
      provider: source,
      description: `Automatically tracked learning activity`,
      status: 'Verified',
      isAutomatic: true,
    });
  }

  // Default data
  private getDefaultEntries(): CPDEntry[] {
    return [
      {
        id: '1',
        date: '2024-01-15',
        activity: 'BS 7671 18th Edition Update Seminar',
        category: 'Regulations & Standards',
        type: 'Formal Learning',
        hours: 4,
        provider: 'IET',
        description: 'Comprehensive update on the latest changes to BS 7671',
        learningOutcomes: 'Understanding of new requirements for EV charging and energy storage',
        certificate: 'IET-BS7671-2024-001',
        status: 'Verified',
        isAutomatic: false,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        date: '2024-01-10',
        activity: 'Cable Sizing and Selection Workshop',
        category: 'Technical Skills',
        type: 'Work-based Learning',
        hours: 3,
        provider: 'Company Training',
        description: 'Practical workshop on cable sizing calculations',
        learningOutcomes: 'Improved understanding of derating factors and installation methods',
        status: 'Pending',
        isAutomatic: false,
        createdAt: '2024-01-10T14:00:00Z',
        updatedAt: '2024-01-10T14:00:00Z',
      },
    ];
  }

  private getDefaultGoals(): CPDGoal[] {
    return [
      {
        id: '1',
        title: '2024 Annual CPD Target',
        targetHours: 35,
        currentHours: 28,
        deadline: '2024-12-31',
        category: 'General',
        status: 'Active',
        description: 'Meet the minimum annual CPD requirement',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        title: 'Advanced Testing Qualification',
        targetHours: 20,
        currentHours: 12,
        deadline: '2024-06-30',
        category: 'Technical Skills',
        status: 'Active',
        description: 'Complete advanced electrical testing course',
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];
  }
}

export const cpdDataService = new CPDDataService();
