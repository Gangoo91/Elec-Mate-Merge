
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
