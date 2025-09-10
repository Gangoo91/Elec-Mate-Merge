export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: 'labour' | 'materials' | 'equipment';
  subcategory?: string;
  workerType?: string;
  hours?: number;
  hourlyRate?: number;
  materialCode?: string;
  equipmentCode?: string;
  notes?: string;
}

export interface WorkerType {
  id: string;
  name: string;
  category: string;
  defaultHourlyRate: number;
  description: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  defaultPrice: number;
  supplier?: string;
  code?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  description: string;
}

export interface QuoteClient {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export interface JobDetails {
  title: string;
  description: string;
  location?: string;
  estimatedDuration?: string;
  customDuration?: string;
  workStartDate?: string;
  specialRequirements?: string;
}

export interface QuoteSettings {
  labourRate: number;
  overheadPercentage: number;
  profitMargin: number;
  vatRate: number;
  vatRegistered: boolean;
  aiEnhancedPDF?: boolean;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  client: QuoteClient;
  jobDetails?: JobDetails;
  items: QuoteItem[];
  settings: QuoteSettings;
  subtotal: number;
  overhead: number;
  profit: number;
  vatAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'pending' | 'completed' | 'rejected';
  tags?: QuoteTag[];
  lastReminderSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  expiryDate: Date;
  notes?: string;
  acceptance_status?: 'pending' | 'accepted' | 'rejected';
  acceptance_method?: 'in_app_signature' | 'docusign';
  accepted_at?: Date;
  accepted_by_name?: string;
  accepted_by_email?: string;
  accepted_ip?: string;
  accepted_user_agent?: string;
  signature_url?: string;
  docusign_envelope_id?: string;
  docusign_status?: string;
  public_token?: string;
}

export type QuoteTag = 'awaiting_payment' | 'job_not_complete' | 'on_hold' | 'disputed';

export interface JobTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  items: Omit<QuoteItem, 'id' | 'totalPrice'>[];
  estimatedHours: number;
}