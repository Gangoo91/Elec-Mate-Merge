import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, Volume2, X, Loader2, PhoneOff, AlertCircle, RefreshCw, Lightbulb, Package, PoundSterling, GripVertical, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { getSetting } from '@/services/settingsService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { useQueryClient } from '@tanstack/react-query';

interface DraggableVoiceAssistantProps {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

const SETTINGS_KEY = 'elevenlabs_agent_id';

// Default agent ID - works out of the box
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
  'elecid': 'Elec ID Cards',
  'timesheets': 'Timesheets',
  'comms': 'Communications',
  'talentpool': 'Talent Pool',
  'vacancies': 'Job Vacancies',
  'quotes': 'Quotes & Invoices',
  'tenders': 'Tenders',
  'expenses': 'Expenses',
  'procurement': 'Procurement',
  'financials': 'Job Financials',
  'reports': 'Reports',
  'signatures': 'Signatures',
  'pricebook': 'Price Book',
  'jobpacks': 'Job Packs',
  'jobs': 'Jobs',
  'jobboard': 'Job Board',
  'timeline': 'Timeline',
  'tracking': 'Worker Tracking',
  'progresslogs': 'Progress Logs',
  'issues': 'Job Issues',
  'testing': 'Testing Workflow',
  'quality': 'Quality',
  'clientportal': 'Client Portal',
  'fleet': 'Fleet',
  'photogallery': 'Photo Gallery',
  'rams': 'RAMS',
  'incidents': 'Incidents',
  'policies': 'Policies',
  'contracts': 'Contracts',
  'training': 'Training Records',
  'briefings': 'Briefings',
  'compliance': 'Compliance',
  'settings': 'Settings',
};

const QUICK_PROMPTS = [
  { label: "Today's schedule", message: "What's happening today?" },
  { label: "Overdue invoices", message: "Are there any overdue invoices?" },
  { label: "Where is everyone?", message: "Where is everyone working today?" },
  { label: "Pending timesheets", message: "Any pending timesheets to approve?" },
];

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

// Dock zone at bottom center - larger for easier targeting
const DOCK_ZONE = {
  height: 100,
  width: 160,
};

// Dismiss zone at bottom left (X to close) - larger for easier targeting
const DISMISS_ZONE = {
  height: 100,
  width: 100,
};

export const DraggableVoiceAssistant: React.FC<DraggableVoiceAssistantProps> = ({
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
  const [isDocked, setIsDocked] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    // Check sessionStorage for dismiss state (resets on page refresh)
    return sessionStorage.getItem('voice-assistant-dismissed') === 'true';
  });
  const [transcript, setTranscript] = useState('');
  const [lastAgentMessage, setLastAgentMessage] = useState('');
  const [agentId, setAgentId] = useState<string>('');
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [priceResults, setPriceResults] = useState<any[]>([]);
  const [showPriceResults, setShowPriceResults] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [isInDockZone, setIsInDockZone] = useState(false);
  const [isInDismissZone, setIsInDismissZone] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const fabRef = useRef<HTMLButtonElement>(null);
  const lastFormContextRef = useRef<string>('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startConversationRef = useRef<(() => Promise<void>) | null>(null);

  // Initialize position on mount
  useEffect(() => {
    const savedPos = localStorage.getItem('voice-assistant-position');
    const wasDocked = localStorage.getItem('voice-assistant-docked') === 'true';

    if (wasDocked) {
      setIsDocked(true);
    } else if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        setPosition(pos);
      } catch {
        // Default position
      }
    }
  }, []);

  // Save position when it changes
  useEffect(() => {
    if (!isDocked && (position.x !== 0 || position.y !== 0)) {
      localStorage.setItem('voice-assistant-position', JSON.stringify(position));
    }
    localStorage.setItem('voice-assistant-docked', isDocked.toString());
  }, [position, isDocked]);

  // Load agent ID (falls back to default)
  useEffect(() => {
    const loadAgentId = async () => {
      try {
        const value = await getSetting(SETTINGS_KEY);
        // Use saved value or fall back to default
        setAgentId(value || DEFAULT_EMPLOYER_AGENT_ID);
      } catch (error) {
        console.error('Failed to load agent ID:', error);
        // Still use default on error
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
      const { data, error } = await supabase.functions.invoke('voice-tools', {
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

      fill_field: async ({ field, value }: { field: string; value: string }) => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.fillField(field, value);
        return success ? `Set ${field} to "${value}"` : `Could not find field "${field}"`;
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

      // Query tools
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

      // Approval actions
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

      // Creation actions
      create_quote: async ({ client, description, value, email }: { client: string; description?: string; value?: number; email?: string }) => {
        const result = await executeServerTool('create_quote', { client, description, value, email });
        toast({ title: 'Quote Created', description: result });
        if (onNavigate) onNavigate('quotes');
        return result;
      },
      create_and_send_quote: async (params: any) => {
        const result = await executeServerTool('create_and_send_quote', params);
        toast({ title: params.sendNow !== false ? 'Quote Created & Sent' : 'Quote Created', description: result });
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

      // Update actions
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

      // Send & Communication actions
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

      // Location & Tracking
      get_worker_location: async ({ name }: { name: string }) => executeServerTool('get_worker_location', { name }),
      get_all_worker_locations: async () => executeServerTool('get_worker_locations', {}),
      get_nearest_worker: async ({ jobTitle, location }: { jobTitle?: string; location?: string }) => executeServerTool('get_nearest_worker', { jobTitle, location }),
      get_todays_schedule: async () => executeServerTool('get_todays_schedule', {}),

      // Messaging
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

      // Email
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

      // Phone
      get_employee_phone: async ({ name }: { name: string }) => executeServerTool('get_employee_phone', { name }),
      get_client_phone: async ({ jobTitle, clientName }: { jobTitle?: string; clientName?: string }) => executeServerTool('get_client_phone', { jobTitle, clientName }),
      initiate_call: async ({ phoneNumber }: { phoneNumber: string }) => {
        const cleaned = phoneNumber.replace(/\s+/g, '');
        window.open(`tel:${cleaned}`, '_self');
        toast({ title: 'Calling...', description: phoneNumber });
        return `Initiating call to ${phoneNumber}`;
      },

      get_job_client_info: async ({ title }: { title: string }) => executeServerTool('get_job_client_info', { title }),
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

  // Drag handlers
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (isDocked) return;

    const fab = fabRef.current;
    if (!fab) return;

    const rect = fab.getBoundingClientRect();
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }, [isDocked]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;

    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check if in dock zone (bottom center of screen)
    const dockLeft = (screenWidth - DOCK_ZONE.width) / 2;
    const dockRight = dockLeft + DOCK_ZONE.width;
    const dockTop = screenHeight - DOCK_ZONE.height;

    // Check if in dismiss zone (bottom left of screen)
    const dismissRight = DISMISS_ZONE.width;
    const dismissTop = screenHeight - DISMISS_ZONE.height;

    const centerX = newX + 28; // Half of button width
    const centerY = newY + 28;

    const inDock = centerX >= dockLeft && centerX <= dockRight && centerY >= dockTop;
    const inDismiss = centerX <= dismissRight && centerY >= dismissTop;

    setIsInDockZone(inDock && !inDismiss);
    setIsInDismissZone(inDismiss);

    // Constrain to screen
    const maxX = screenWidth - 56;
    const maxY = screenHeight - 56;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (isInDismissZone) {
      // Dismiss the voice assistant
      setIsDismissed(true);
      sessionStorage.setItem('voice-assistant-dismissed', 'true');
      setIsInDismissZone(false);
      toast({
        title: 'Voice Assistant Hidden',
        description: 'Tap the mic icon in the header or refresh page to show again',
      });
    } else if (isInDockZone) {
      setIsDocked(true);
      setIsInDockZone(false);
    }
  }, [isDragging, isInDockZone, isInDismissZone, toast]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  }, [handleDragStart]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    // Touch events - added to document for reliable dragging across entire screen
    const handleDocTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Guard preventDefault with cancelable check to avoid Android intervention warnings
        if (e.cancelable) {
          e.preventDefault(); // Prevent scroll while dragging
        }
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleDocTouchEnd = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Use passive: true to avoid blocking main thread; preventDefault is guarded by cancelable check
      document.addEventListener('touchmove', handleDocTouchMove, { passive: true });
      document.addEventListener('touchend', handleDocTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleDocTouchMove);
      document.removeEventListener('touchend', handleDocTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const startConversation = useCallback(async () => {
    if (!agentId) {
      toast({
        title: 'Setup Required',
        description: 'Please configure your ElevenLabs Agent ID in Settings.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    setIsMinimised(false);
    setConnectionStep('mic');
    setConnectionError('');

    try {
      console.log('[VoiceAssistant] Requesting microphone...');
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('[VoiceAssistant] Microphone granted');
      } catch (micError) {
        console.error('[VoiceAssistant] Microphone error:', micError);
        throw new Error('Microphone access denied. Please allow microphone access and try again.');
      }

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

      setConnectionStep('connecting');

      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[VoiceAssistant] Connection timeout');
        setIsConnecting(false);
        setConnectionStep('error');
        setConnectionError('Connection timed out. Please try again.');
        conversation.endSession();
      }, 15000);

      let initialContext = `Current section: ${currentSection}`;
      if (formContext?.activeForm) {
        initialContext += `\n${formContext.getFormContext()}`;
      }

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

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

  // Keep startConversation ref updated for event listener
  startConversationRef.current = startConversation;

  // Listen for external voice activation events (from quote/invoice voice buttons)
  useEffect(() => {
    const handleActivateVoice = () => {
      if (!isConnected && !isConnecting) {
        setIsMinimised(false);
        startConversationRef.current?.();
      } else if (isConnected && isMinimised) {
        setIsMinimised(false);
      }
    };

    window.addEventListener('activate-voice-assistant', handleActivateVoice);
    return () => window.removeEventListener('activate-voice-assistant', handleActivateVoice);
  }, [isConnected, isConnecting, isMinimised]);

  if (isLoadingSettings) return null;

  // Voice assistant dismissed for this session
  if (isDismissed) return null;

  // Docked state - show minimal indicator at bottom
  if (isDocked) {
    return (
      <>
        {/* Drop zone indicators when dragging */}
        {isDragging && (
          <>
            {/* Dismiss zone - bottom left (X to close) */}
            <div className={cn(
              "fixed bottom-0 left-0 w-[80px] h-[80px] rounded-tr-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
              isInDismissZone
                ? "border-red-500 bg-red-500/20 scale-110"
                : "border-muted-foreground/30 bg-muted/20"
            )}>
              <X className={cn("h-6 w-6", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")} />
              <span className={cn("text-[10px] font-medium", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")}>Hide</span>
            </div>
            {/* Dock zone - bottom center */}
            <div className={cn(
              "fixed bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[80px] rounded-t-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
              isInDockZone
                ? "border-elec-yellow bg-elec-yellow/20 scale-110"
                : "border-muted-foreground/30 bg-muted/20"
            )}>
              <Minimize2 className={cn("h-6 w-6", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")} />
              <span className={cn("text-[10px] font-medium", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")}>Dock</span>
            </div>
          </>
        )}

        {/* Docked mini button */}
        <button
          onClick={() => {
            setIsDocked(false);
            setPosition({
              x: window.innerWidth - 70,
              y: window.innerHeight - 150,
            });
          }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "h-10 px-4 rounded-full",
            "flex items-center gap-2",
            "bg-elec-gray/90 backdrop-blur border border-elec-yellow/30",
            "shadow-lg hover:bg-elec-gray transition-all duration-200",
            "touch-feedback",
            isConnected && "border-green-500/50"
          )}
        >
          <div className={cn(
            "h-2 w-2 rounded-full",
            isConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          )} />
          <Mic className={cn(
            "h-4 w-4",
            isConnected ? "text-green-500" : "text-elec-yellow"
          )} />
          <span className="text-xs font-medium text-foreground">Voice</span>
        </button>
      </>
    );
  }

  // Calculate FAB style based on position
  const fabStyle: React.CSSProperties = isDragging || position.x !== 0 || position.y !== 0
    ? {
        position: 'fixed',
        left: position.x,
        top: position.y,
        right: 'auto',
        bottom: 'auto',
      }
    : {
        position: 'fixed',
        right: 16,
        bottom: 80, // Above mobile nav
      };

  return (
    <>
      {/* Drop zone indicators when dragging */}
      {isDragging && (
        <>
          {/* Dismiss zone - bottom left (X to close) */}
          <div className={cn(
            "fixed bottom-0 left-0 w-[80px] h-[80px] rounded-tr-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
            isInDismissZone
              ? "border-red-500 bg-red-500/20 scale-110"
              : "border-muted-foreground/30 bg-muted/20"
          )}>
            <X className={cn("h-6 w-6", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")} />
            <span className={cn("text-[10px] font-medium", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")}>Hide</span>
          </div>
          {/* Dock zone - bottom center */}
          <div className={cn(
            "fixed bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[80px] rounded-t-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
            isInDockZone
              ? "border-elec-yellow bg-elec-yellow/20 scale-110"
              : "border-muted-foreground/30 bg-muted/20"
          )}>
            <Minimize2 className={cn("h-6 w-6", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")} />
            <span className={cn("text-[10px] font-medium", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")}>Dock</span>
          </div>
        </>
      )}

      <div className="z-50" style={fabStyle}>
        {/* Expanded Panel - Glassmorphism Design */}
        {!isMinimised && (
          <div className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-32px)] rounded-2xl overflow-hidden animate-in slide-in-from-bottom-4 shadow-2xl">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-gradient-to-b from-elec-gray/95 via-background/95 to-background/98 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 via-transparent to-green-500/5" />
            <div className="relative border border-white/10 rounded-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-elec-yellow/10 via-transparent to-green-500/10 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "relative flex items-center justify-center",
                  isConnected && "animate-pulse"
                )}>
                  <div className={cn(
                    "h-3 w-3 rounded-full",
                    isConnected ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-muted-foreground"
                  )} />
                  {isConnected && (
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping opacity-50" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">ELEC-MATE Voice</span>
                  <p className="text-[10px] text-muted-foreground">
                    {isConnected ? 'Connected' : 'Ready to connect'}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setIsMinimised(true)}>
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
                  {/* Speaking/Listening indicator - Enhanced visual */}
                  <div className="flex flex-col items-center justify-center py-3">
                    {/* Animated orb */}
                    <div className={cn(
                      "relative w-16 h-16 rounded-full flex items-center justify-center mb-3",
                      conversation.isSpeaking
                        ? "bg-gradient-to-br from-elec-yellow/20 to-amber-500/10"
                        : "bg-gradient-to-br from-green-500/20 to-emerald-500/10"
                    )}>
                      {/* Pulsing ring */}
                      <div className={cn(
                        "absolute inset-0 rounded-full animate-ping opacity-30",
                        conversation.isSpeaking ? "bg-elec-yellow/20" : "bg-green-500/20"
                      )} style={{ animationDuration: '1.5s' }} />

                      {/* Center icon */}
                      <div className={cn(
                        "relative z-10 p-3 rounded-full",
                        conversation.isSpeaking
                          ? "bg-gradient-to-br from-elec-yellow to-amber-500 shadow-lg shadow-elec-yellow/30"
                          : "bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                      )}>
                        {conversation.isSpeaking ? (
                          <Volume2 className="h-5 w-5 text-elec-dark animate-pulse" />
                        ) : (
                          <Mic className="h-5 w-5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
                      conversation.isSpeaking
                        ? "bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                    )}>
                      {conversation.isSpeaking ? 'Speaking' : 'Listening'}
                    </div>
                  </div>

                  {/* Rotating tip */}
                  {!conversation.isSpeaking && !transcript && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-1 px-3">
                      <Lightbulb className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">Try: "{ROTATING_TIPS[currentTipIndex]}"</span>
                    </div>
                  )}

                  {/* Transcript bubbles */}
                  {transcript && (
                    <div className="text-sm bg-white/5 border border-white/10 rounded-xl p-3">
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide block mb-1">You said</span>
                      <p className="text-foreground">{transcript}</p>
                    </div>
                  )}
                  {lastAgentMessage && (
                    <div className="text-sm bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-3">
                      <span className="text-[10px] font-medium text-elec-yellow uppercase tracking-wide block mb-1">ELEC-MATE</span>
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

                  {/* Quick prompts */}
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
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <Mic className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Tap <span className="font-medium text-foreground">Start</span> to begin
                  </p>
                </div>
              )}
            </div>

            {/* Actions - Enhanced footer */}
            <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-white/10 bg-black/20">
              {isConnected ? (
                <Button
                  onClick={stopConversation}
                  variant="destructive"
                  size="sm"
                  className="gap-2 px-6 shadow-lg shadow-red-500/20"
                >
                  <PhoneOff className="h-4 w-4" />
                  End Call
                </Button>
              ) : (
                <Button
                  onClick={startConversation}
                  disabled={isConnecting}
                  size="sm"
                  className="gap-2 px-6 bg-gradient-to-r from-elec-yellow to-amber-500 text-elec-dark hover:from-elec-yellow/90 hover:to-amber-500/90 shadow-lg shadow-elec-yellow/20"
                >
                  <Mic className="h-4 w-4" />
                  Start
                </Button>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Draggable FAB - Enhanced Design */}
        <button
          ref={fabRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            // Only trigger click if not dragging
            const moveDistance = Math.abs(e.clientX - startPos.x) + Math.abs(e.clientY - startPos.y);
            if (moveDistance < 10) {
              if (isMinimised) {
                setIsMinimised(false);
                if (!isConnected && !isConnecting) {
                  startConversation();
                }
              } else {
                setIsMinimised(true);
              }
            }
          }}
          className={cn(
            "relative h-14 w-14 rounded-full transition-all duration-300 select-none",
            "flex items-center justify-center touch-none",
            "shadow-xl",
            isConnected
              ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30"
              : "bg-gradient-to-br from-elec-yellow to-amber-500 shadow-elec-yellow/30",
            conversation.isSpeaking && "ring-4 ring-elec-yellow/40 ring-offset-2 ring-offset-background",
            isDragging && "cursor-grabbing scale-110 opacity-90",
            !isDragging && "cursor-grab hover:scale-105 active:scale-95"
          )}
        >
          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 rounded-full blur-md -z-10 opacity-50",
            isConnected ? "bg-green-500" : "bg-elec-yellow"
          )} />

          {/* Icon */}
          {isDragging ? (
            <GripVertical className="h-6 w-6 text-elec-dark" />
          ) : isConnecting ? (
            <Loader2 className="h-6 w-6 animate-spin text-elec-dark" />
          ) : isConnected ? (
            conversation.isSpeaking ? (
              <Volume2 className="h-6 w-6 animate-pulse text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )
          ) : (
            <Mic className="h-6 w-6 text-elec-dark" />
          )}

          {/* Connection indicator dot */}
          {isConnected && !isDragging && (
            <div className="absolute -top-0.5 -right-0.5 h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 border-2 border-background" />
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default DraggableVoiceAssistant;
