import { Quote, QuoteItem, QuoteSettings } from './quote';

export interface InvoiceItem extends QuoteItem {
  completionStatus?: 'completed' | 'partial' | 'not_done';
  actualQuantity?: number;
}

export interface InvoiceSettings extends QuoteSettings {
  paymentTerms: string;
  dueDate: Date;
  paymentMethod?: string;
  bankDetails?: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    sortCode: string;
  };
}

export interface Invoice extends Omit<Quote, 'items' | 'settings'> {
  invoice_raised: boolean;
  invoice_number: string;
  invoice_date: Date;
  invoice_due_date: Date;
  invoice_status: 'draft' | 'sent' | 'paid' | 'overdue';
  additional_invoice_items: InvoiceItem[];
  invoice_notes?: string;
  work_completion_date: Date;
  items: InvoiceItem[];
  settings: InvoiceSettings;
  originalQuoteId: string;
  purchase_order?: string;
  pdf_document_id?: string;
  pdf_url?: string;
  pdf_generated_at?: Date;
  pdf_version?: number;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
