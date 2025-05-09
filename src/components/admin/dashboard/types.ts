
export interface MockUser {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActive: string;
}

export interface ContentItem {
  id: number;
  title: string;
  type: string;
  author: string;
  lastUpdated: string;
  status: string;
}

export interface SystemEvent {
  id: number;
  event: string;
  date: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}
