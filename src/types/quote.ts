export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category: 'labour' | 'materials' | 'equipment';
}

export interface QuoteClient {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export interface QuoteSettings {
  labourRate: number;
  overheadPercentage: number;
  profitMargin: number;
  vatRate: number;
  vatRegistered: boolean;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  client: QuoteClient;
  items: QuoteItem[];
  settings: QuoteSettings;
  subtotal: number;
  overhead: number;
  profit: number;
  vatAmount: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  expiryDate: Date;
  notes?: string;
}

export interface JobTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  items: Omit<QuoteItem, 'id' | 'totalPrice'>[];
  estimatedHours: number;
}