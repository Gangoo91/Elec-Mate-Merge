
export type Project = {
  id: string;
  name: string;
  clientName: string;
  clientContact: string;
  startDate: string;
  dueDate: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  budget: number;
  description: string;
  materials: ProjectMaterial[];
  timeEntries: ProjectTimeEntry[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  certificateType?: "minor-works" | "eicr" | "installation" | "none";
  certificateIssued?: boolean;
  invoiceIssued?: boolean;
  invoiceAmount?: number;
  invoicePaid?: boolean;
  priority?: "low" | "medium" | "high" | "urgent";
  location?: string;
};

export type ProjectMaterial = {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
  total: number;
};

export type ProjectTimeEntry = {
  id: string;
  date: string;
  hours: number;
  description: string;
};
