// Types for editable project plan state

export interface ProjectPhase {
  id: string;
  phaseName: string;
  dayStart: number;
  dayEnd: number;
  tasks: ProjectTask[];
  materials?: ProjectMaterial[];
  holdPoints?: string[];
  tradeCoordination?: TradeCoordination[];
  completed: boolean;
}

export interface ProjectTask {
  id: string;
  text: string;
  completed: boolean;
  notes?: string;
}

export interface ProjectMaterial {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  orderBy?: string;
  ordered: boolean;
  orderedDate?: string;
  supplier?: string;
  supplierNotes?: string;
  unitCost?: number;
}

export interface TradeCoordination {
  id: string;
  trade: string;
  day: number;
  note: string;
  contacted: boolean;
  contactedDate?: string;
}

export interface ProjectRisk {
  id: string;
  description: string;
  mitigation: string;
  status: 'open' | 'mitigated' | 'accepted';
  severity: 'low' | 'medium' | 'high';
}

export interface ProjectMilestone {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface EditableProjectPlan {
  projectName: string;
  clientName: string;
  location: string;
  startDate: string;
  phases: ProjectPhase[];
  risks: ProjectRisk[];
  milestones: ProjectMilestone[];
  notes: string;
  metadata: {
    estimatedDuration: number;
    totalBudget?: number;
    projectType: string;
  };
}

export interface HistoryAction {
  type: 'phase' | 'task' | 'material' | 'risk' | 'milestone';
  action: 'add' | 'update' | 'delete' | 'reorder';
  before: any;
  after: any;
  timestamp: Date;
}

export interface SavedProjectPlan {
  id: string;
  projectName: string;
  clientName?: string;
  location?: string;
  startDate?: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  planData: EditableProjectPlan;
  createdAt: string;
  updatedAt: string;
}
