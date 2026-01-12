import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, Volume2, X, Loader2, PhoneOff, AlertCircle, RefreshCw, Lightbulb, BookOpen, Package, PoundSterling, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { getSetting } from '@/services/settingsService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
interface VoiceAssistantV2Props {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

const SETTINGS_KEY = 'elevenlabs_agent_id';
const DEFAULT_EMPLOYER_AGENT_ID = 'agent_7301kdxbnshce7vv8mtah970y3g1';

type ConnectionStep = 'idle' | 'mic' | 'token' | 'connecting' | 'connected' | 'error';

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  'overview': 'Overview',
  'dashboard': 'Overview',
  'home': 'Overview',
  'peoplehub': 'People Hub',
  'people-hub': 'People Hub',
  'financehub': 'Finance Hub',
  'finance-hub': 'Finance Hub',
  'finance': 'Finance Hub',
  'jobshub': 'Jobs Hub',
  'jobs-hub': 'Jobs Hub',
  'safetyhub': 'Safety Hub',
  'safety-hub': 'Safety Hub',
  'safety': 'Safety Hub',
  'team': 'Employees',
  'employees': 'Employees',
  'workers': 'Employees',
  'staff': 'Employees',
  'elecid': 'Elec ID Cards',
  'elec-id': 'Elec ID Cards',
  'credentials': 'Elec ID Cards',
  'timesheets': 'Timesheets',
  'leave': 'Timesheets',
  'comms': 'Communications',
  'communications': 'Communications',
  'messages': 'Communications',
  'talentpool': 'Talent Pool',
  'talent-pool': 'Talent Pool',
  'candidates': 'Talent Pool',
  'vacancies': 'Job Vacancies',
  'job-vacancies': 'Job Vacancies',
  'recruitment': 'Job Vacancies',
  'quotes': 'Quotes & Invoices',
  'invoices': 'Quotes & Invoices',
  'quotes-invoices': 'Quotes & Invoices',
  'billing': 'Quotes & Invoices',
  'tenders': 'Tenders',
  'bids': 'Tenders',
  'expenses': 'Expenses',
  'receipts': 'Expenses',
  'procurement': 'Procurement',
  'materials': 'Procurement',
  'purchasing': 'Procurement',
  'financials': 'Job Financials',
  'job-financials': 'Job Financials',
  'reports': 'Reports',
  'analytics': 'Reports',
  'signatures': 'Signatures',
  'sign-offs': 'Signatures',
  'pricebook': 'Price Book',
  'price-book': 'Price Book',
  'pricing': 'Price Book',
  'jobpacks': 'Job Packs',
  'job-packs': 'Job Packs',
  'documentation': 'Job Packs',
  'jobs': 'Jobs',
  'projects': 'Jobs',
  'sites': 'Jobs',
  'jobboard': 'Job Board',
  'job-board': 'Job Board',
  'timeline': 'Timeline',
  'job-timeline': 'Timeline',
  'schedule': 'Timeline',
  'tracking': 'Worker Tracking',
  'worker-tracking': 'Worker Tracking',
  'location': 'Worker Tracking',
  'gps': 'Worker Tracking',
  'progresslogs': 'Progress Logs',
  'progress-logs': 'Progress Logs',
  'progress': 'Progress Logs',
  'diary': 'Progress Logs',
  'issues': 'Job Issues',
  'job-issues': 'Job Issues',
  'problems': 'Job Issues',
  'testing': 'Testing Workflow',
  'testing-workflow': 'Testing Workflow',
  'inspections': 'Testing Workflow',
  'quality': 'Quality',
  'snags': 'Quality',
  'defects': 'Quality',
  'clientportal': 'Client Portal',
  'client-portal': 'Client Portal',
  'fleet': 'Fleet',
  'vehicles': 'Fleet',
  'vans': 'Fleet',
  'transport': 'Fleet',
  'photogallery': 'Photo Gallery',
  'photo-gallery': 'Photo Gallery',
  'photos': 'Photo Gallery',
  'gallery': 'Photo Gallery',
  'rams': 'RAMS',
  'risk-assessments': 'RAMS',
  'method-statements': 'RAMS',
  'incidents': 'Incidents',
  'accidents': 'Incidents',
  'near-misses': 'Incidents',
  'policies': 'Policies',
  'procedures': 'Policies',
  'contracts': 'Contracts',
  'agreements': 'Contracts',
  'training': 'Training Records',
  'training-records': 'Training Records',
  'certifications': 'Training Records',
  'certs': 'Training Records',
  'briefings': 'Briefings',
  'toolbox-talks': 'Briefings',
  'compliance': 'Compliance',
  'regulations': 'Compliance',
  'audits': 'Compliance',
  'settings': 'Settings',
  'preferences': 'Settings',
  'configuration': 'Settings',
};

// Quick prompts for common voice commands
const QUICK_PROMPTS = [
  { label: "Today's schedule", message: "What's happening today?" },
  { label: "Overdue invoices", message: "Are there any overdue invoices?" },
  { label: "Where is everyone?", message: "Where is everyone working today?" },
  { label: "Pending timesheets", message: "Any pending timesheets to approve?" },
];

// Rotating tips to show range of capabilities
const ROTATING_TIPS = [
  "What's happening today?",
  "Go to quotes",
  "Who's on the Smith job?",
  "Any certifications expiring soon?",
  "Create a new quote for £500",
  "Show me pending expenses",
  "Navigate to timesheets",
  "What jobs are overdue?",
];

export const VoiceAssistantV2: React.FC<VoiceAssistantV2Props> = ({
  onNavigate,
  currentSection = 'overview',
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const formContext = useOptionalVoiceFormContext();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState<ConnectionStep>('idle');
  const [connectionError, setConnectionError] = useState<string>('');
  const [isMinimised, setIsMinimised] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [lastAgentMessage, setLastAgentMessage] = useState('');
  const [agentId, setAgentId] = useState<string>('');
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [priceResults, setPriceResults] = useState<any[]>([]);
  const [showPriceResults, setShowPriceResults] = useState(false);
  const lastFormContextRef = useRef<string>('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load agent ID
  useEffect(() => {
    const loadAgentId = async () => {
      try {
        const value = await getSetting(SETTINGS_KEY);
        setAgentId(value || DEFAULT_EMPLOYER_AGENT_ID);
      } catch (error) {
        console.error('Failed to load agent ID:', error);
        setAgentId(DEFAULT_EMPLOYER_AGENT_ID);
      } finally {
        setIsLoadingSettings(false);
      }
    };
    loadAgentId();
  }, []);

  // Execute server-side tool
  const executeServerTool = async (toolName: string, params: Record<string, unknown>) => {
    try {
      console.log('[VoiceAssistant] Server tool:', toolName, params);
      const { data, error } = await supabase.functions.invoke('voice-tools-employer', {
        body: { tool: toolName, params },
      });
      
      if (error) throw error;
      
      // Invalidate relevant queries based on action
      if (toolName.includes('quote') || toolName.includes('invoice')) {
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }
      if (toolName.includes('job')) {
        queryClient.invalidateQueries({ queryKey: ['jobs'] });
        queryClient.invalidateQueries({ queryKey: ['job-assignments'] });
      }
      if (toolName.includes('employee') || toolName.includes('timesheet') || toolName.includes('time_entry')) {
        queryClient.invalidateQueries({ queryKey: ['employees'] });
        queryClient.invalidateQueries({ queryKey: ['timesheets'] });
      }
      if (toolName.includes('leave')) {
        queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      }
      if (toolName.includes('expense')) {
        queryClient.invalidateQueries({ queryKey: ['expense-claims'] });
      }
      if (toolName.includes('incident')) {
        queryClient.invalidateQueries({ queryKey: ['incidents'] });
      }
      if (toolName.includes('vacancy')) {
        queryClient.invalidateQueries({ queryKey: ['vacancies'] });
      }
      
      return data?.result || data?.message || 'Done';
    } catch (error) {
      console.error('[VoiceAssistant] Server tool error:', error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  // Dispatch dialog open event
  const openDialog = (dialogName: string) => {
    console.log('[VoiceAssistant] Opening dialog:', dialogName);
    window.dispatchEvent(new CustomEvent('voice-open-dialog', { detail: { dialog: dialogName } }));
    return `Opening ${dialogName} form`;
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log('[VoiceAssistant] Connected successfully');
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('connected');
      setConnectionError('');
      toast({ title: 'ELEC-MATE Active', description: 'Speak now - I\'m listening!' });
    },
    onDisconnect: () => {
      console.log('[VoiceAssistant] Disconnected');
      setConnectionStep('idle');
      setTranscript('');
      setLastAgentMessage('');
      setIsConnecting(false);
    },
    onError: (error: unknown) => {
      console.error('[VoiceAssistant] Error:', error);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('error');
      const errorMsg = error && typeof error === 'object' && 'message' in error 
        ? String((error as { message: unknown }).message) 
        : 'Connection failed';
      setConnectionError(errorMsg);
      toast({
        title: 'Voice Error',
        description: errorMsg + '. Tap Retry to try again.',
        variant: 'destructive',
      });
    },
    onMessage: (message) => {
      console.log('[VoiceAssistant] Message:', message);
      const msg = message as unknown as Record<string, unknown>;
      if (msg.type === 'user_transcript') {
        const event = msg.user_transcription_event as { user_transcript?: string } | undefined;
        setTranscript(event?.user_transcript || '');
      }
      if (msg.type === 'agent_response') {
        const event = msg.agent_response_event as { agent_response?: string } | undefined;
        setLastAgentMessage(event?.agent_response || '');
      }
    },
    clientTools: {
      // ============================================
      // NAVIGATION & UI TOOLS
      // ============================================
      navigate_to: async ({ section }: { section: string }) => {
        const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
        const displayName = SECTION_DISPLAY_NAMES[sectionLower] || section;
        
        if (onNavigate) {
          onNavigate(sectionLower);
          toast({ title: 'Navigating', description: `Going to ${displayName}` });
        }
        return `Navigated to ${displayName}`;
      },
      
      go_back: async () => {
        window.history.back();
        return 'Going back';
      },
      
      open_dialog: async ({ dialog }: { dialog: string }) => {
        return openDialog(dialog);
      },
      
      close_dialog: async () => {
        window.dispatchEvent(new CustomEvent('voice-close-dialog'));
        return 'Closed dialog';
      },
      
      scroll_up: async () => {
        window.scrollBy({ top: -300, behavior: 'smooth' });
        return 'Scrolled up';
      },
      
      scroll_down: async () => {
        window.scrollBy({ top: 300, behavior: 'smooth' });
        return 'Scrolled down';
      },
      
      refresh_data: async () => {
        queryClient.invalidateQueries();
        toast({ title: 'Refreshing', description: 'Data is being refreshed' });
        return 'Refreshing all data';
      },
      
      toggle_view: async ({ mode }: { mode: string }) => {
        window.dispatchEvent(new CustomEvent('voice-toggle-view', { detail: { mode } }));
        return `Switched to ${mode} view`;
      },
      
      filter_by: async ({ filter }: { filter: string }) => {
        window.dispatchEvent(new CustomEvent('voice-filter', { detail: { filter } }));
        return `Applied filter: ${filter}`;
      },
      
      search_for: async ({ query }: { query: string }) => {
        window.dispatchEvent(new CustomEvent('voice-search', { detail: { query } }));
        return `Searching for: ${query}`;
      },

      // ============================================
      // FORM INTERACTION TOOLS
      // ============================================
      fill_field: async ({ field, value }: { field: string; value: string }) => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.fillField(field, value);
        if (success) {
          return `Set ${field} to "${value}"`;
        }
        return `Could not find field "${field}"`;
      },
      
      add_labour_item: async ({ description, hours, rate }: { description: string; hours: number; rate: number }) => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.executeAction('add_labour_item', { description, hours, rate });
        if (success) {
          const total = hours * rate;
          return `Added labour: ${description}, ${hours}h at £${rate}/hr = £${total}`;
        }
        return 'Cannot add labour item to this form';
      },
      
      add_material_item: async ({ description, quantity, unitPrice }: { description: string; quantity: number; unitPrice: number }) => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.executeAction('add_material_item', { description, quantity, unitPrice });
        if (success) {
          const total = quantity * unitPrice;
          return `Added material: ${description}, ${quantity} x £${unitPrice} = £${total}`;
        }
        return 'Cannot add material item to this form';
      },
      
      add_line_item: async ({ description, quantity, unitPrice, unit }: { description: string; quantity: number; unitPrice: number; unit?: string }) => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.executeAction('add_line_item', { description, quantity, unitPrice, unit: unit || 'each' });
        if (success) {
          const total = quantity * unitPrice;
          return `Added: ${description}, ${quantity} x £${unitPrice} = £${total}`;
        }
        return 'Cannot add line item to this form';
      },
      
      remove_last_item: async () => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.executeAction('remove_last_item', {});
        return success ? 'Removed last item' : 'No items to remove';
      },
      
      next_step: async () => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.executeAction('next_step', {});
        return success ? 'Moving to next step' : 'Cannot proceed to next step';
      },
      
      submit_form: async () => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.submitForm();
        return success ? 'Form submitted' : 'Could not submit form';
      },
      
      clear_form: async () => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.clearForm();
        return success ? 'Form cleared' : 'Could not clear form';
      },
      
      cancel_form: async () => {
        if (!formContext) return 'No form is currently open';
        
        const success = formContext.cancelForm();
        if (success) {
          window.dispatchEvent(new CustomEvent('voice-close-dialog'));
          return 'Form cancelled';
        }
        return 'Could not cancel form';
      },

      // ============================================
      // QUERY TOOLS - Server-side
      // ============================================
      get_dashboard_summary: async () => executeServerTool('get_dashboard_summary', {}),
      get_employee_info: async ({ name }: { name?: string }) => executeServerTool('get_employee_info', { name }),
      get_employee_certifications: async ({ name }: { name: string }) => executeServerTool('get_employee_certifications', { name }),
      get_pending_timesheets: async () => executeServerTool('get_pending_timesheets', {}),
      get_pending_leave: async () => executeServerTool('get_pending_leave', {}),
      get_employee_hours: async ({ name, days }: { name: string; days?: number }) => executeServerTool('get_employee_hours', { name, days }),
      get_expiring_certifications: async ({ days }: { days?: number }) => executeServerTool('get_expiring_certifications', { days: days || 30 }),
      get_job_info: async ({ title }: { title?: string }) => executeServerTool('get_job_info', { title }),
      get_job_workers: async ({ title }: { title: string }) => executeServerTool('get_job_workers', { title }),
      get_job_progress: async ({ title }: { title: string }) => executeServerTool('get_job_progress', { title }),
      get_upcoming_deadlines: async ({ days }: { days?: number }) => executeServerTool('get_upcoming_deadlines', { days }),
      get_worker_locations: async () => executeServerTool('get_worker_locations', {}),
      get_quote_info: async ({ client, status }: { client?: string; status?: string }) => executeServerTool('get_quote_info', { client, status }),
      get_invoice_info: async ({ client, status }: { client?: string; status?: string }) => executeServerTool('get_invoice_info', { client, status }),
      get_overdue_invoices: async () => executeServerTool('get_overdue_invoices', {}),
      get_pending_expenses: async () => executeServerTool('get_pending_expenses', {}),
      get_supplier_info: async ({ name }: { name?: string }) => executeServerTool('get_supplier_info', { name }),
      get_revenue_summary: async ({ days }: { days?: number }) => executeServerTool('get_revenue_summary', { days }),
      get_open_incidents: async () => executeServerTool('get_open_incidents', {}),
      get_rams_status: async ({ title }: { title?: string }) => executeServerTool('get_rams_status', { title }),
      get_training_due: async ({ days }: { days?: number }) => executeServerTool('get_training_due', { days }),

      // ============================================
      // PRICE BOOK LOOKUP - Server-side with visual display
      // ============================================
      lookup_price: async ({ searchTerm }: { searchTerm: string }) => {
        const result = await executeServerTool('lookup_price', { searchTerm });
        try {
          const parsed = JSON.parse(result);
          if (parsed.items && parsed.items.length > 0) {
            setPriceResults(parsed.items);
            setShowPriceResults(true);
          }
          return parsed.message;
        } catch {
          return result;
        }
      },
      search_price_book_category: async ({ category }: { category: string }) => {
        const result = await executeServerTool('search_price_book_category', { category });
        try {
          const parsed = JSON.parse(result);
          if (parsed.items && parsed.items.length > 0) {
            setPriceResults(parsed.items);
            setShowPriceResults(true);
          }
          return parsed.message;
        } catch {
          return result;
        }
      },
      get_low_stock_items: async () => executeServerTool('get_low_stock_items', {}),

      // ============================================
      // APPROVAL ACTIONS - Server-side
      // ============================================
      approve_timesheet: async ({ employeeName, approveAll }: { employeeName?: string; approveAll?: boolean }) => {
        const result = await executeServerTool('approve_timesheet', { employeeName, approveAll });
        toast({ title: 'Timesheet Approved', description: result });
        return result;
      },
      reject_timesheet: async ({ employeeName, reason }: { employeeName: string; reason?: string }) => {
        const result = await executeServerTool('reject_timesheet', { employeeName, reason });
        toast({ title: 'Timesheet Rejected', description: result });
        return result;
      },
      approve_leave: async ({ employeeName }: { employeeName: string }) => {
        const result = await executeServerTool('approve_leave', { employeeName });
        toast({ title: 'Leave Approved', description: result });
        return result;
      },
      reject_leave: async ({ employeeName, reason }: { employeeName: string; reason?: string }) => {
        const result = await executeServerTool('reject_leave', { employeeName, reason });
        toast({ title: 'Leave Rejected', description: result });
        return result;
      },
      approve_expense: async ({ employeeName, approveAll }: { employeeName?: string; approveAll?: boolean }) => {
        const result = await executeServerTool('approve_expense', { employeeName, approveAll });
        toast({ title: 'Expense Approved', description: result });
        return result;
      },
      reject_expense: async ({ employeeName, reason }: { employeeName: string; reason?: string }) => {
        const result = await executeServerTool('reject_expense', { employeeName, reason });
        toast({ title: 'Expense Rejected', description: result });
        return result;
      },

      // ============================================
      // CREATION ACTIONS - Server-side
      // ============================================
      create_quote: async ({ client, description, value, email }: { client: string; description?: string; value?: number; email?: string }) => {
        const result = await executeServerTool('create_quote', { client, description, value, email });
        toast({ title: 'Quote Created', description: result });
        if (onNavigate) onNavigate('quotes');
        return result;
      },
      create_and_send_quote: async ({ 
        client, 
        clientAddress, 
        clientEmail, 
        clientPhone,
        jobTitle, 
        labourHours, 
        labourRate,
        materialsTotal, 
        includeVat, 
        validDays,
        notes,
        sendNow 
      }: { 
        client: string; 
        clientAddress: string;
        clientEmail: string; 
        clientPhone?: string;
        jobTitle: string;
        labourHours?: number; 
        labourRate?: number;
        materialsTotal?: number;
        includeVat?: boolean;
        validDays?: number;
        notes?: string;
        sendNow?: boolean;
      }) => {
        const result = await executeServerTool('create_and_send_quote', { 
          client, 
          clientAddress,
          clientEmail, 
          clientPhone,
          jobTitle,
          labourHours, 
          labourRate,
          materialsTotal, 
          includeVat,
          validDays,
          notes,
          sendNow: sendNow ?? true
        });
        toast({ 
          title: sendNow !== false ? 'Quote Created & Sent' : 'Quote Created', 
          description: result 
        });
        if (onNavigate) onNavigate('quotes');
        return result;
      },
      create_job: async ({ title, client, location, description, value }: { title: string; client: string; location: string; description?: string; value?: number }) => {
        const result = await executeServerTool('create_job', { title, client, location, description, value });
        toast({ title: 'Job Created', description: result });
        if (onNavigate) onNavigate('jobs');
        return result;
      },
      create_employee: async ({ name, role, email, phone, hourlyRate }: { name: string; role?: string; email?: string; phone?: string; hourlyRate?: number }) => {
        const result = await executeServerTool('create_employee', { name, role, email, phone, hourlyRate });
        toast({ title: 'Employee Added', description: result });
        if (onNavigate) onNavigate('team');
        return result;
      },
      create_invoice: async ({ client, amount, project, quoteId }: { client: string; amount?: number; project?: string; quoteId?: string }) => {
        const result = await executeServerTool('create_invoice', { client, amount, project, quoteId });
        toast({ title: 'Invoice Created', description: result });
        if (onNavigate) onNavigate('quotes');
        return result;
      },
      create_expense: async ({ employeeName, amount, category, description }: { employeeName: string; amount: number; category?: string; description?: string }) => {
        const result = await executeServerTool('create_expense', { employeeName, amount, category, description });
        toast({ title: 'Expense Created', description: result });
        return result;
      },
      create_time_entry: async ({ employeeName, hours, jobTitle, date }: { employeeName: string; hours: number; jobTitle?: string; date?: string }) => {
        const result = await executeServerTool('create_time_entry', { employeeName, hours, jobTitle, date });
        toast({ title: 'Time Entry Added', description: result });
        return result;
      },
      create_incident: async ({ title, description, severity, location }: { title: string; description?: string; severity?: string; location?: string }) => {
        const result = await executeServerTool('create_incident', { title, description, severity, location });
        toast({ title: 'Incident Reported', description: result });
        if (onNavigate) onNavigate('incidents');
        return result;
      },
      post_vacancy: async ({ title, location, salaryMin, salaryMax, type }: { title: string; location: string; salaryMin?: number; salaryMax?: number; type?: string }) => {
        const result = await executeServerTool('post_vacancy', { title, location, salaryMin, salaryMax, type });
        toast({ title: 'Vacancy Posted', description: result });
        if (onNavigate) onNavigate('vacancies');
        return result;
      },

      // ============================================
      // UPDATE ACTIONS - Server-side
      // ============================================
      update_job_status: async ({ title, status }: { title: string; status: string }) => {
        const result = await executeServerTool('update_job_status', { title, status });
        toast({ title: 'Job Updated', description: result });
        return result;
      },
      update_job_progress: async ({ title, progress }: { title: string; progress: number }) => {
        const result = await executeServerTool('update_job_progress', { title, progress });
        toast({ title: 'Progress Updated', description: result });
        return result;
      },
      assign_to_job: async ({ employeeName, jobTitle }: { employeeName: string; jobTitle: string }) => {
        const result = await executeServerTool('assign_to_job', { employeeName, jobTitle });
        toast({ title: 'Worker Assigned', description: result });
        return result;
      },
      unassign_from_job: async ({ employeeName, jobTitle }: { employeeName: string; jobTitle: string }) => {
        const result = await executeServerTool('unassign_from_job', { employeeName, jobTitle });
        toast({ title: 'Worker Unassigned', description: result });
        return result;
      },
      mark_invoice_paid: async ({ invoiceNumber, client }: { invoiceNumber?: string; client?: string }) => {
        const result = await executeServerTool('mark_invoice_paid', { invoiceNumber, client });
        toast({ title: 'Invoice Marked Paid', description: result });
        return result;
      },
      close_incident: async ({ title, actionsTaken }: { title: string; actionsTaken?: string }) => {
        const result = await executeServerTool('close_incident', { title, actionsTaken });
        toast({ title: 'Incident Closed', description: result });
        return result;
      },

      // ============================================
      // SEND & COMMUNICATION ACTIONS - Server-side
      // ============================================
      send_quote: async ({ quoteNumber, email }: { quoteNumber?: string; email?: string }) => {
        const result = await executeServerTool('send_quote', { quoteNumber, email });
        toast({ title: 'Quote Sent', description: result });
        return result;
      },
      send_invoice: async ({ invoiceNumber, email }: { invoiceNumber?: string; email?: string }) => {
        const result = await executeServerTool('send_invoice', { invoiceNumber, email });
        toast({ title: 'Invoice Sent', description: result });
        return result;
      },
      send_reminder: async ({ invoiceNumber, client }: { invoiceNumber?: string; client?: string }) => {
        const result = await executeServerTool('send_reminder', { invoiceNumber, client });
        toast({ title: 'Reminder Sent', description: result });
        return result;
      },

      // ============================================
      // LOCATION & TRACKING - Server-side
      // ============================================
      get_worker_location: async ({ name }: { name: string }) => {
        return executeServerTool('get_worker_location', { name });
      },
      get_all_worker_locations: async () => {
        return executeServerTool('get_worker_locations', {});
      },
      get_nearest_worker: async ({ jobTitle, location }: { jobTitle?: string; location?: string }) => {
        return executeServerTool('get_nearest_worker', { jobTitle, location });
      },
      get_todays_schedule: async () => {
        return executeServerTool('get_todays_schedule', {});
      },

      // ============================================
      // MESSAGING - Server-side
      // ============================================
      send_worker_message: async ({ name, subject, message, priority }: { name: string; subject?: string; message: string; priority?: string }) => {
        const result = await executeServerTool('send_worker_message', { name, subject, message, priority });
        toast({ title: 'Message Sent', description: result });
        return result;
      },
      send_team_message: async ({ jobTitle, message, all }: { jobTitle?: string; message: string; all?: boolean }) => {
        const result = await executeServerTool('send_team_message', { jobTitle, message, all });
        toast({ title: 'Team Message Sent', description: result });
        return result;
      },
      send_job_update_to_client: async ({ jobTitle, message }: { jobTitle: string; message: string }) => {
        const result = await executeServerTool('send_job_update_to_client', { jobTitle, message });
        toast({ title: 'Client Update Sent', description: result });
        return result;
      },

      // ============================================
      // EMAIL - Server-side
      // ============================================
      email_worker: async ({ name, subject, message }: { name: string; subject?: string; message: string }) => {
        const result = await executeServerTool('email_worker', { name, subject, message });
        toast({ title: 'Email Sent', description: result });
        return result;
      },
      email_client: async ({ jobTitle, clientName, subject, message }: { jobTitle?: string; clientName?: string; subject?: string; message: string }) => {
        const result = await executeServerTool('email_client', { jobTitle, clientName, subject, message });
        toast({ title: 'Email Sent', description: result });
        return result;
      },
      send_job_pack: async ({ jobTitle }: { jobTitle: string }) => {
        const result = await executeServerTool('send_job_pack', { jobTitle });
        toast({ title: 'Job Pack Sent', description: result });
        return result;
      },

      // ============================================
      // PHONE - Server-side query + Client-side call
      // ============================================
      get_employee_phone: async ({ name }: { name: string }) => {
        return executeServerTool('get_employee_phone', { name });
      },
      get_client_phone: async ({ jobTitle, clientName }: { jobTitle?: string; clientName?: string }) => {
        return executeServerTool('get_client_phone', { jobTitle, clientName });
      },
      initiate_call: async ({ phoneNumber }: { phoneNumber: string }) => {
        // Clean phone number
        const cleaned = phoneNumber.replace(/\s+/g, '');
        window.open(`tel:${cleaned}`, '_self');
        toast({ title: 'Calling...', description: phoneNumber });
        return `Initiating call to ${phoneNumber}`;
      },

      // ============================================
      // ENHANCED QUERIES - Server-side
      // ============================================
      get_job_client_info: async ({ title }: { title: string }) => {
        return executeServerTool('get_job_client_info', { title });
      },
    },
  });

  // Send form context to agent when it changes
  useEffect(() => {
    if (conversation.status !== 'connected' || !formContext) return;
    
    const currentFormContext = formContext.getFormContext();
    if (currentFormContext !== lastFormContextRef.current) {
      lastFormContextRef.current = currentFormContext;
      console.log('[VoiceAssistant] Sending form context update:', currentFormContext);
      conversation.sendContextualUpdate(currentFormContext);
    }
  }, [formContext?.activeForm, conversation.status]);

  // Rotate tips every 4 seconds when connected and listening
  useEffect(() => {
    const connected = conversation.status === 'connected';
    if (!connected || conversation.isSpeaking) return;
    
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % ROTATING_TIPS.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [conversation.status, conversation.isSpeaking]);

  // Handle quick prompt click
  const handleQuickPrompt = useCallback((message: string) => {
    if (conversation.status === 'connected') {
      conversation.sendUserMessage(message);
      setTranscript(message);
    }
  }, [conversation]);

  const startConversation = useCallback(async () => {
    if (!agentId) {
      toast({
        title: 'Setup Required',
        description: 'Please configure your ElevenLabs Agent ID in Settings.',
        variant: 'destructive',
      });
      return;
    }

    // Reset state
    setIsConnecting(true);
    setIsMinimised(false);
    setConnectionStep('mic');
    setConnectionError('');

    try {
      // Step 1: Request microphone
      console.log('[VoiceAssistant] Requesting microphone...');
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('[VoiceAssistant] Microphone granted');
      } catch (micError) {
        console.error('[VoiceAssistant] Microphone error:', micError);
        throw new Error('Microphone access denied. Please allow microphone access and try again.');
      }

      // Step 2: Get token
      setConnectionStep('token');
      console.log('[VoiceAssistant] Getting token...');
      
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId },
      });

      if (error) {
        console.error('[VoiceAssistant] Token error:', error);
        throw new Error(error.message || 'Failed to get conversation token');
      }
      
      if (!data?.token) {
        console.error('[VoiceAssistant] No token in response:', data);
        throw new Error('No token received from server');
      }

      console.log('[VoiceAssistant] Token received, connecting...');

      // Step 3: Connect to ElevenLabs
      setConnectionStep('connecting');

      // Set connection timeout (15 seconds)
      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[VoiceAssistant] Connection timeout');
        setIsConnecting(false);
        setConnectionStep('error');
        setConnectionError('Connection timed out. Please try again.');
        conversation.endSession();
      }, 15000);

      // Build initial context
      let initialContext = `Current section: ${currentSection}`;
      if (formContext?.activeForm) {
        initialContext += `\n${formContext.getFormContext()}`;
      }

      // Start session without overrides - use agent's configured settings
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      // Send initial context after connection
      setTimeout(() => {
        if (conversation.status === 'connected') {
          conversation.sendContextualUpdate(initialContext);
        }
      }, 500);
    } catch (error) {
      console.error('[VoiceAssistant] Failed to start conversation:', error);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('error');
      const errorMsg = error instanceof Error ? error.message : 'Could not start voice assistant';
      setConnectionError(errorMsg);
      toast({
        title: 'Connection Failed',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  }, [agentId, conversation, toast, currentSection, formContext]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';

  if (isLoadingSettings) return null;

  // No agent ID configured
  if (!agentId) {
    return (
      <div className="fixed bottom-20 right-4 z-50 md:bottom-6">
        <Button
          onClick={() => onNavigate?.('settings')}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-muted hover:bg-muted/80"
        >
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-6">
      {/* Expanded Panel */}
      {!isMinimised && (
        <div className="absolute bottom-16 right-0 w-80 rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-border">
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                isConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
              )} />
              <span className="text-sm font-medium">ELEC-MATE</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimised(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 min-h-[120px] max-h-[300px] overflow-y-auto">
            {/* Connection progress */}
            {isConnecting && (
              <div className="flex flex-col items-center justify-center py-6 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {connectionStep === 'mic' && 'Requesting microphone...'}
                    {connectionStep === 'token' && 'Getting authorisation...'}
                    {connectionStep === 'connecting' && 'Connecting to ELEC-MATE...'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {connectionStep === 'mic' && 'Please allow microphone access'}
                    {connectionStep === 'token' && 'Authenticating with voice service'}
                    {connectionStep === 'connecting' && 'Almost ready...'}
                  </p>
                </div>
              </div>
            )}

            {/* Error state with retry */}
            {connectionStep === 'error' && !isConnecting && (
              <div className="flex flex-col items-center justify-center py-6 gap-3">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Connection Failed</p>
                  <p className="text-xs text-muted-foreground mt-1">{connectionError || 'Please try again'}</p>
                </div>
                <Button onClick={startConversation} size="sm" variant="outline" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Button>
              </div>
            )}

            {isConnected && (
              <>
                {/* Speaking/Listening indicator */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                    conversation.isSpeaking 
                      ? "bg-primary/10 text-primary" 
                      : "bg-green-500/10 text-green-600"
                  )}>
                    {conversation.isSpeaking ? (
                      <>
                        <Volume2 className="h-3 w-3 animate-pulse" />
                        Speaking...
                      </>
                    ) : (
                      <>
                        <Mic className="h-3 w-3" />
                        Listening...
                      </>
                    )}
                  </div>
                </div>

                {/* Rotating tip - show when listening and no transcript yet */}
                {!conversation.isSpeaking && !transcript && (
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-1">
                    <Lightbulb className="h-3 w-3 text-amber-500" />
                    <span>Try: "{ROTATING_TIPS[currentTipIndex]}"</span>
                  </div>
                )}

                {transcript && (
                  <div className="text-sm bg-muted/50 rounded-lg p-2">
                    <span className="text-xs text-muted-foreground block mb-1">You said:</span>
                    <p className="text-foreground">{transcript}</p>
                  </div>
                )}
                {lastAgentMessage && (
                  <div className="text-sm bg-primary/5 rounded-lg p-2">
                    <span className="text-xs text-primary block mb-1">ELEC-MATE:</span>
                    <p className="text-foreground">{lastAgentMessage}</p>
                  </div>
                )}

                {/* Price Results Panel */}
                {showPriceResults && priceResults.length > 0 && (
                  <div className="mt-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Package className="h-3 w-3 text-accent" />
                        <span className="text-xs font-medium text-accent">Price Results</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5" 
                        onClick={() => setShowPriceResults(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {priceResults.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded bg-background/50">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-muted-foreground">{item.category}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-semibold text-green-600">£{item.sellPrice?.toFixed(2)}</p>
                            <p className="text-muted-foreground">
                              {item.stockLevel !== null ? `${item.stockLevel} in stock` : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 h-7 text-xs gap-1"
                      onClick={() => {
                        if (onNavigate) onNavigate('pricebook');
                        setShowPriceResults(false);
                      }}
                    >
                      <PoundSterling className="h-3 w-3" />
                      View Price Book
                    </Button>
                  </div>
                )}

                {/* Quick prompts - show when listening and no recent activity */}
                {!conversation.isSpeaking && !lastAgentMessage && !showPriceResults && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground text-center">Quick prompts:</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt.label}
                          onClick={() => handleQuickPrompt(prompt.message)}
                          className="text-xs px-2 py-1.5 rounded-md bg-muted/50 hover:bg-muted text-foreground transition-colors text-left truncate"
                        >
                          {prompt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Form context indicator */}
                {formContext?.activeForm && (
                  <div className="mt-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-xs text-primary">
                      Form: {formContext.activeForm.formName}
                    </p>
                  </div>
                )}
              </>
            )}

            {!isConnected && !isConnecting && connectionStep !== 'error' && (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <Mic className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  Tap Start to begin
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-border bg-muted/30">
            {isConnected ? (
              <Button
                onClick={stopConversation}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <PhoneOff className="h-4 w-4" />
                End
              </Button>
            ) : (
              <Button
                onClick={startConversation}
                disabled={isConnecting}
                size="sm"
                className="gap-2"
              >
                <Mic className="h-4 w-4" />
                Start
              </Button>
            )}
          </div>
        </div>
      )}

      {/* FAB */}
      <Button
        onClick={() => {
          if (isMinimised) {
            setIsMinimised(false);
            if (!isConnected && !isConnecting) {
              startConversation();
            }
          } else {
            setIsMinimised(true);
          }
        }}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all",
          isConnected
            ? "bg-green-600 hover:bg-green-700"
            : "bg-primary hover:bg-primary/90",
          conversation.isSpeaking && "ring-4 ring-primary/30"
        )}
      >
        {isConnecting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isConnected ? (
          conversation.isSpeaking ? (
            <Volume2 className="h-6 w-6 animate-pulse" />
          ) : (
            <Mic className="h-6 w-6" />
          )
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default VoiceAssistantV2;
