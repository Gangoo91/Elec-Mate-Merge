export interface StatusHistoryEntry {
  from: string;
  to: string;
  changed_at: string;
  changed_by?: string;
}

export interface ExpiryReminder {
  id: string;
  user_id: string;
  report_id: string;
  certificate_number: string;
  client_name?: string;
  installation_address?: string;
  inspection_date?: string;
  expiry_date: string;
  reminder_status: string;
  contacted_at?: string;
  booked_for_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  status_history?: StatusHistoryEntry[];
  tags?: string[];
  response_time_hours?: number;
}

export interface ClientGroup {
  clientName: string;
  reminders: ExpiryReminder[];
  totalRevenue: number;
  propertyCount: number;
  urgency: 'expired' | 'urgent' | 'warning' | 'safe';
  earliestExpiry: string;
}

export const QUICK_TAGS = [
  'Needs Quote',
  'Price Sensitive',
  'Loyal Client',
  'VIP',
  'Follow Up',
  'High Priority',
] as const;
