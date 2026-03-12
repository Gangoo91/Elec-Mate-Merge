import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { SparkTask, TaskPriority, TaskStatus } from '@/hooks/useSparkTasks';

export interface ProjectData {
  id: string;
  title: string;
  description?: string;
  project_type?: string;
  status: string;
  priority: string;
  customer_name?: string;
  location?: string;
  estimated_value?: number;
  start_date?: string;
  due_date?: string;
  created_at: string;
}

export interface ProjectQuote {
  id: string;
  status: string;
  total: number;
  quote_number?: string;
  client_data?: Record<string, unknown>;
  created_at: string;
}

export interface ProjectInvoice {
  id: string;
  payment_status: string;
  total: number;
  invoice_number?: string;
  client_data?: Record<string, unknown>;
  created_at: string;
}

export interface ProjectCertificate {
  id: string;
  report_type: string;
  status: string;
  client_name?: string;
  created_at: string;
}

export interface ProjectRams {
  id: string;
  status: string;
  job_description: string;
  created_at: string;
}

export interface ProjectSiteVisit {
  id: string;
  status: string;
  property_address?: string;
  property_postcode?: string;
  created_at: string;
}

export interface UnlinkedItem {
  id: string;
  label: string;
  sublabel?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const s = () => supabase as any;

export function useProjectEntities(projectId: string | undefined) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [tasks, setTasks] = useState<SparkTask[]>([]);
  const [quotes, setQuotes] = useState<ProjectQuote[]>([]);
  const [invoices, setInvoices] = useState<ProjectInvoice[]>([]);
  const [certificates, setCertificates] = useState<ProjectCertificate[]>([]);
  const [rams, setRams] = useState<ProjectRams[]>([]);
  const [siteVisits, setSiteVisits] = useState<ProjectSiteVisit[]>([]);

  const refresh = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: proj, error } = await s()
        .from('spark_projects')
        .select('*, customers(name)')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .single();

      if (error || !proj) throw error || new Error('Project not found');

      const [tasksRes, quotesRes, invoicesRes, certsRes, ramsRes, visitsRes] = await Promise.all([
        s()
          .from('spark_tasks')
          .select('*, customers(name)')
          .eq('project_id', projectId)
          .neq('status', 'cancelled')
          .order('due_at', { ascending: true }),
        s()
          .from('quotes')
          .select('id, status, total, quote_number, client_data, created_at')
          .eq('project_id', projectId)
          .eq('invoice_raised', false),
        s()
          .from('invoices')
          .select('id, status, total, invoice_number, client_data, created_at')
          .eq('project_id', projectId),
        s()
          .from('reports')
          .select('id, report_type, status, client_name, created_at')
          .eq('project_id', projectId),
        s()
          .from('rams_generation_jobs')
          .select('id, status, job_description, created_at')
          .eq('project_id', projectId),
        s()
          .from('site_visits')
          .select('id, status, property_address, property_postcode, created_at')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false }),
      ]);

      setProject({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        project_type: proj.project_type,
        status: proj.status,
        priority: proj.priority,
        customer_name: proj.customers?.name,
        location: proj.location,
        estimated_value: proj.estimated_value,
        start_date: proj.start_date,
        due_date: proj.due_date,
        created_at: proj.created_at,
      });

      setTasks(
        (tasksRes.data || []).map(
          (row: {
            id: string;
            user_id: string;
            title: string;
            details?: string | null;
            status: string;
            priority: string;
            due_at?: string | null;
            snoozed_until?: string | null;
            customer_id?: string | null;
            customers?: { name: string } | null;
            location?: string | null;
            tags?: string[] | null;
            project_id?: string | null;
            created_at: string;
            updated_at: string;
            completed_at?: string | null;
          }): SparkTask => ({
            id: row.id,
            userId: row.user_id,
            title: row.title,
            details: row.details || undefined,
            status: row.status as TaskStatus,
            priority: row.priority as TaskPriority,
            dueAt: row.due_at || undefined,
            snoozedUntil: row.snoozed_until || undefined,
            customerId: row.customer_id || undefined,
            customerName: row.customers?.name || undefined,
            location: row.location || undefined,
            tags: row.tags || [],
            projectId: row.project_id || undefined,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            completedAt: row.completed_at || undefined,
          })
        )
      );

      setQuotes(
        (quotesRes.data || []).map(
          (r: {
            id: string;
            status: string;
            total: number;
            quote_number?: string;
            client_data?: Record<string, unknown>;
            created_at: string;
          }) => ({
            id: r.id,
            status: r.status,
            total: Number(r.total) || 0,
            quote_number: r.quote_number,
            client_data: r.client_data,
            created_at: r.created_at,
          })
        )
      );

      setInvoices(
        (invoicesRes.data || []).map(
          (r: {
            id: string;
            status: string;
            total: number;
            invoice_number?: string;
            client_data?: Record<string, unknown>;
            created_at: string;
          }) => ({
            id: r.id,
            payment_status: r.status,
            total: Number(r.total) || 0,
            invoice_number: r.invoice_number,
            client_data: r.client_data,
            created_at: r.created_at,
          })
        )
      );

      setCertificates(certsRes.data || []);
      setRams(ramsRes.data || []);
      setSiteVisits(visitsRes.data || []);
    } catch (err) {
      console.error('Failed to load project entities:', err);
      toast({ title: 'Error', description: 'Could not load project.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, toast]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Computed values
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const quoteTotal = quotes.reduce((sum, q) => sum + q.total, 0);
  const invoiceTotal = invoices.reduce((sum, i) => sum + i.total, 0);
  const paidInvoices = invoices.filter((i) => i.payment_status === 'paid').length;

  // Link / unlink helpers
  async function linkEntity(table: string, entityId: string) {
    const { error } = await s().from(table).update({ project_id: projectId }).eq('id', entityId);
    if (error) {
      toast({ title: 'Link failed', description: error.message, variant: 'destructive' });
      return false;
    }
    await refresh();
    toast({ title: 'Linked', description: 'Entity linked to project.' });
    return true;
  }

  async function unlinkEntity(table: string, entityId: string) {
    const { error } = await s().from(table).update({ project_id: null }).eq('id', entityId);
    if (error) {
      toast({ title: 'Unlink failed', description: error.message, variant: 'destructive' });
      return false;
    }
    await refresh();
    toast({ title: 'Unlinked', description: 'Entity removed from project.' });
    return true;
  }

  const linkQuote = (id: string) => linkEntity('quotes', id);
  const unlinkQuote = (id: string) => unlinkEntity('quotes', id);
  const linkInvoice = (id: string) => linkEntity('invoices', id);
  const unlinkInvoice = (id: string) => unlinkEntity('invoices', id);
  const linkCertificate = (id: string) => linkEntity('reports', id);
  const unlinkCertificate = (id: string) => unlinkEntity('reports', id);
  const linkRams = (id: string) => linkEntity('rams_generation_jobs', id);
  const unlinkRams = (id: string) => unlinkEntity('rams_generation_jobs', id);
  const linkSiteVisit = (id: string) => linkEntity('site_visits', id);
  const unlinkSiteVisit = (id: string) => unlinkEntity('site_visits', id);

  // Fetch unlinked entities for the link sheet
  async function fetchUnlinked(
    table: string,
    selectCols: string,
    extraFilter?: (q: ReturnType<typeof s>) => ReturnType<typeof s>
  ): Promise<UnlinkedItem[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    let query = s()
      .from(table)
      .select(selectCols)
      .eq('user_id', user.id)
      .is('project_id', null)
      .order('created_at', { ascending: false })
      .limit(50);

    if (extraFilter) query = extraFilter(query);
    const { data } = await query;
    return data || [];
  }

  async function fetchUnlinkedQuotes(): Promise<UnlinkedItem[]> {
    const rows = await fetchUnlinked(
      'quotes',
      'id, quote_number, client_data, total, status, created_at',
      (q) => q.eq('invoice_raised', false)
    );
    return rows.map(
      (r: {
        id: string;
        quote_number?: string;
        client_data?: { name?: string };
        total?: number;
        status?: string;
      }) => ({
        id: r.id,
        label: r.quote_number
          ? `#${r.quote_number}`
          : (r.client_data?.name as string) || 'Unnamed quote',
        sublabel: r.total ? `£${Number(r.total).toLocaleString()} — ${r.status}` : r.status,
      })
    );
  }

  async function fetchUnlinkedInvoices(): Promise<UnlinkedItem[]> {
    const rows = await fetchUnlinked(
      'invoices',
      'id, invoice_number, client_data, total, status, created_at'
    );
    return rows.map(
      (r: {
        id: string;
        invoice_number?: string;
        client_data?: { name?: string };
        total?: number;
        status?: string;
      }) => ({
        id: r.id,
        label: r.invoice_number
          ? `#${r.invoice_number}`
          : (r.client_data?.name as string) || 'Unnamed invoice',
        sublabel: r.total ? `£${Number(r.total).toLocaleString()} — ${r.status}` : r.status,
      })
    );
  }

  async function fetchUnlinkedCertificates(): Promise<UnlinkedItem[]> {
    const rows = await fetchUnlinked('reports', 'id, report_type, status, client_name, created_at');
    return rows.map(
      (r: { id: string; report_type?: string; status?: string; client_name?: string }) => ({
        id: r.id,
        label: r.report_type?.toUpperCase().replace(/-/g, ' ') || 'Certificate',
        sublabel: [r.client_name, r.status].filter(Boolean).join(' — '),
      })
    );
  }

  async function fetchUnlinkedSiteVisits(): Promise<UnlinkedItem[]> {
    const rows = await fetchUnlinked(
      'site_visits',
      'id, property_address, property_postcode, status, created_at'
    );
    return rows.map(
      (r: {
        id: string;
        property_address?: string;
        property_postcode?: string;
        status?: string;
      }) => ({
        id: r.id,
        label: r.property_address || 'Site Visit',
        sublabel: [r.property_postcode, r.status].filter(Boolean).join(' — '),
      })
    );
  }

  async function fetchUnlinkedRams(): Promise<UnlinkedItem[]> {
    const rows = await fetchUnlinked(
      'rams_generation_jobs',
      'id, job_description, status, created_at',
      (q) => q.eq('status', 'complete')
    );
    return rows.map((r: { id: string; job_description?: string; status?: string }) => ({
      id: r.id,
      label: r.job_description || 'RAMS',
      sublabel: r.status,
    }));
  }

  async function completeProject() {
    if (!projectId) return;
    try {
      const { error } = await s()
        .from('spark_projects')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', projectId);
      if (error) throw error;
      toast({ title: 'Project completed', description: 'Nice one! Project marked as done.' });
      await refresh();
    } catch {
      toast({
        title: 'Failed',
        description: 'Could not complete project.',
        variant: 'destructive',
      });
    }
  }

  return {
    project,
    tasks,
    quotes,
    invoices,
    certificates,
    rams,
    siteVisits,
    isLoading,
    progress,
    totalTasks,
    doneTasks,
    quoteTotal,
    invoiceTotal,
    paidInvoices,
    linkQuote,
    unlinkQuote,
    linkInvoice,
    unlinkInvoice,
    linkCertificate,
    unlinkCertificate,
    linkRams,
    unlinkRams,
    linkSiteVisit,
    unlinkSiteVisit,
    fetchUnlinkedQuotes,
    fetchUnlinkedInvoices,
    fetchUnlinkedCertificates,
    fetchUnlinkedRams,
    fetchUnlinkedSiteVisits,
    completeProject,
    refresh,
  };
}
