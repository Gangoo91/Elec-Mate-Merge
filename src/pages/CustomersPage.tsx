import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomers, Customer, SortField, SortDirection } from '@/hooks/inspection/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';
import { supabase } from '@/integrations/supabase/client';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';
import { CustomerListRow } from '@/components/customers/CustomerListRow';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { MergeDuplicatesSheet } from '@/components/customers/MergeDuplicatesSheet';
import { CustomerImportDialog } from '@/components/customers/customers/CustomerImportDialog';
import DeviceContactsImportSheet from '@/components/customers/DeviceContactsImportSheet';
import { Capacitor } from '@capacitor/core';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  Upload,
  Download,
  ArrowLeft,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Eyebrow, StatStrip, Pill, Dot } from '@/components/college/primitives';
import { CustomerMap } from '@/components/customers/CustomerMap';
import { useUpcomingReminders } from '@/hooks/useUpcomingReminders';

const sortTabs: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'lastActivityAt', label: 'Recent' },
  { value: 'createdAt', label: 'Newest' },
  { value: 'certificateCount', label: 'Certs' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

// Best-effort vCard parser — pulls name, email, phone, address from clipboard.
const parseVCard = (raw: string): Partial<Customer> => {
  const out: Partial<Customer> = {};
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const [keyPart, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (!value) continue;
    const key = keyPart.split(';')[0].toUpperCase();
    if (key === 'FN' && !out.name) out.name = value;
    if (key === 'N' && !out.name) {
      const parts = value.split(';').filter(Boolean);
      out.name = [parts[1], parts[0]].filter(Boolean).join(' ');
    }
    if (key === 'EMAIL' && !out.email) out.email = value;
    if (key === 'TEL' && !out.phone) out.phone = value.replace(/[^\d+]/g, '');
    if (key === 'ADR' && !out.address) {
      const adr = value.split(';').filter(Boolean).join(', ');
      out.address = adr;
    }
  }
  return out;
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFollowUpOnly, setShowFollowUpOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'lead' | 'active' | 'inactive' | null>(null);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [mapSelectedId, setMapSelectedId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const {
    customers,
    isLoading,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    exportCustomers,
    refreshCustomers,
    mergeCustomers,
  } = useCustomers({ sortField, sortDirection, searchTerm: debouncedSearch });

  const [invoiceData, setInvoiceData] = useState<
    {
      customer_id: string;
      invoice_status: string | null;
      invoice_paid_at: string | null;
      invoice_due_date: string | null;
    }[]
  >([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const { data } = await supabase
        .from('quotes')
        .select('customer_id, invoice_status, invoice_paid_at, invoice_due_date')
        .eq('invoice_raised', true)
        .not('customer_id', 'is', null);
      if (data) setInvoiceData(data);
    };
    fetchInvoiceData();
  }, [customers]);

  const reliabilityMap = useMemo(() => {
    const map = new Map<string, ReliabilityLevel>();
    const grouped = new Map<string, typeof invoiceData>();
    for (const inv of invoiceData) {
      if (!inv.customer_id) continue;
      const arr = grouped.get(inv.customer_id) || [];
      arr.push(inv);
      grouped.set(inv.customer_id, arr);
    }
    for (const [custId, invs] of grouped) {
      const paid = invs.filter((i) => i.invoice_status === 'paid');
      if (paid.length < 2) {
        map.set(custId, 'none');
        continue;
      }
      const paidOnTime = paid.filter((i) => {
        if (!i.invoice_paid_at || !i.invoice_due_date) return true;
        return new Date(i.invoice_paid_at) <= new Date(i.invoice_due_date);
      });
      const rate = (paidOnTime.length / paid.length) * 100;
      if (rate > 80) map.set(custId, 'good');
      else if (rate >= 50) map.set(custId, 'fair');
      else map.set(custId, 'poor');
    }
    return map;
  }, [invoiceData]);

  // Who owes money right now — any unpaid invoice past its due date (24h grace)
  const overdueMap = useMemo(() => {
    const map = new Map<string, boolean>();
    const graceCutoff = Date.now() - 24 * 60 * 60 * 1000;
    for (const inv of invoiceData) {
      if (!inv.customer_id || inv.invoice_status === 'paid') continue;
      if (inv.invoice_due_date && new Date(inv.invoice_due_date).getTime() < graceCutoff) {
        map.set(inv.customer_id, true);
      }
    }
    return map;
  }, [invoiceData]);

  const [showSearch, setShowSearch] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeviceImport, setShowDeviceImport] = useState(false);
  // ELE-1332 — on the native app "Import from contacts" opens the device
  // address book; the CSV dialog stays as the web path. Feature-detect the
  // plugin rather than the platform: binaries installed before the Contacts
  // plugin shipped must keep the CSV path or import is a dead-end for them.
  const openContactsImport = () => {
    if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('Contacts')) {
      setShowDeviceImport(true);
    } else {
      setShowImportDialog(true);
    }
  };
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [quickNoteCustomer, setQuickNoteCustomer] = useState<Customer | null>(null);
  const [certificateCustomer, setCertificateCustomer] = useState<Customer | null>(null);
  const [showQuickCreateMenu, setShowQuickCreateMenu] = useState(false);
  const [vCardSeed, setVCardSeed] = useState<Partial<Customer> | null>(null);
  const quickCreateRef = useRef<HTMLDivElement | null>(null);

  // Selection mode
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [showBulkTagDialog, setShowBulkTagDialog] = useState(false);
  const [bulkTagDraft, setBulkTagDraft] = useState('');
  const [isBulkTagging, setIsBulkTagging] = useState(false);

  // Duplicate detection — banner visibility
  const [duplicatesDismissed, setDuplicatesDismissed] = useState(false);
  const [remindersDismissed, setRemindersDismissed] = useState(false);

  const { reminders: upcomingReminders } = useUpcomingReminders();

  // Close quick-create menu on outside click.
  useEffect(() => {
    if (!showQuickCreateMenu) return;
    const handler = (e: MouseEvent) => {
      if (!quickCreateRef.current?.contains(e.target as Node)) {
        setShowQuickCreateMenu(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [showQuickCreateMenu]);

  const handleSaveCustomer = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, data);
    } else {
      await saveCustomer(data);
    }
    setShowAddDialog(false);
    setEditingCustomer(null);
    setVCardSeed(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowAddDialog(true);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteCustomer(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePasteVCard = async () => {
    setShowQuickCreateMenu(false);
    try {
      const text = await navigator.clipboard.readText();
      const seed = parseVCard(text);
      if (!seed.name && !seed.email && !seed.phone) {
        // Fall through to blank form
        setVCardSeed(null);
      } else {
        setVCardSeed(seed);
      }
    } catch {
      setVCardSeed(null);
    }
    setEditingCustomer(null);
    setShowAddDialog(true);
  };

  // Client-side filters: needs-follow-up + active tag.
  const filteredCustomers = useMemo(() => {
    const ninetyDaysAgo = Date.now() - 90 * 86_400_000;
    return customers.filter((c) => {
      if (showFollowUpOnly) {
        if (c.lastActivityAt && new Date(c.lastActivityAt).getTime() >= ninetyDaysAgo) {
          return false;
        }
      }
      if (activeTagFilter) {
        if (!c.tags || !c.tags.includes(activeTagFilter)) return false;
      }
      if (statusFilter && (c.status || 'active') !== statusFilter) return false;
      return true;
    });
  }, [customers, showFollowUpOnly, activeTagFilter, statusFilter]);

  // Tag aggregation — collect all tags + counts across loaded customers.
  const tagCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of customers) {
      if (!c.tags) continue;
      for (const t of c.tags) map.set(t, (map.get(t) || 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [customers]);

  // KPI data for the StatStrip.
  const kpis = useMemo(() => {
    const withCerts = customers.filter((c) => (c.certificateCount || 0) > 0).length;
    const now = new Date();
    const thisMonth = customers.filter((c) => {
      const d = new Date(c.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const reliable = Array.from(reliabilityMap.values()).filter((v) => v === 'good').length;
    return { withCerts, thisMonth, reliable };
  }, [customers, reliabilityMap]);

  const followUpCount = useMemo(() => {
    const ninetyDaysAgo = Date.now() - 90 * 86_400_000;
    return customers.filter((c) => {
      if (!c.lastActivityAt) return true;
      return new Date(c.lastActivityAt).getTime() < ninetyDaysAgo;
    }).length;
  }, [customers]);

  // Duplicate detection — group customers by normalised phone or email.
  const duplicateIds = useMemo(() => {
    const phoneMap = new Map<string, string[]>();
    const emailMap = new Map<string, string[]>();
    for (const c of customers) {
      if (c.phone) {
        const key = c.phone.replace(/[^\d]/g, '').replace(/^44/, '0').slice(-10);
        if (key.length >= 9) {
          const arr = phoneMap.get(key) || [];
          arr.push(c.id);
          phoneMap.set(key, arr);
        }
      }
      if (c.email) {
        const key = c.email.trim().toLowerCase();
        const arr = emailMap.get(key) || [];
        arr.push(c.id);
        emailMap.set(key, arr);
      }
    }
    const dupes = new Set<string>();
    for (const arr of phoneMap.values()) if (arr.length > 1) arr.forEach((id) => dupes.add(id));
    for (const arr of emailMap.values()) if (arr.length > 1) arr.forEach((id) => dupes.add(id));
    return dupes;
  }, [customers]);

  // Duplicate groups with the customers attached — feeds the merge sheet
  const duplicateGroups = useMemo(() => {
    const byId = new Map(customers.map((c) => [c.id, c]));
    const groupMap = new Map<string, Set<string>>();
    for (const c of customers) {
      if (c.phone) {
        const key = c.phone.replace(/[^\d]/g, '').replace(/^44/, '0').slice(-10);
        if (key.length >= 9) {
          const set = groupMap.get(key) || new Set<string>();
          set.add(c.id);
          groupMap.set(key, set);
        }
      }
      if (c.email) {
        const key = c.email.trim().toLowerCase();
        const set = groupMap.get(key) || new Set<string>();
        set.add(c.id);
        groupMap.set(key, set);
      }
    }
    return Array.from(groupMap.entries())
      .filter(([, ids]) => ids.size > 1)
      .map(([matchedOn, ids]) => ({
        matchedOn,
        customers: Array.from(ids)
          .map((id) => byId.get(id))
          .filter((c): c is Customer => !!c)
          .sort((a, b) => (b.certificateCount || 0) - (a.certificateCount || 0)),
      }));
  }, [customers]);
  const [showMergeSheet, setShowMergeSheet] = useState(false);

  // Bulk select handlers
  const enterSelectionMode = (seedId?: string) => {
    setSelectionMode(true);
    setSelectedIds(seedId ? new Set([seedId]) : new Set());
  };
  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds(new Set());
  };
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const selectAllVisible = () => {
    setSelectedIds(new Set(filteredCustomers.map((c) => c.id)));
  };
  const handleBulkDelete = async () => {
    setIsBulkDeleting(true);
    for (const id of selectedIds) {
      await deleteCustomer(id);
    }
    setIsBulkDeleting(false);
    setShowBulkDeleteConfirm(false);
    exitSelectionMode();
  };
  const handleBulkExport = () => {
    if (selectedIds.size === 0) {
      exportCustomers();
      return;
    }
    exportCustomers(Array.from(selectedIds));
  };

  const handleBulkEmail = () => {
    const emails = customers
      .filter((c) => selectedIds.has(c.id) && c.email)
      .map((c) => c.email)
      .filter(Boolean) as string[];
    if (emails.length === 0) return;
    // Open user's mail client with BCC list (BCC keeps recipients private).
    window.location.href = `mailto:?bcc=${emails.join(',')}`;
  };

  const handleBulkTag = async () => {
    const tag = bulkTagDraft.trim();
    if (!tag || selectedIds.size === 0) return;
    setIsBulkTagging(true);
    for (const id of selectedIds) {
      const c = customers.find((x) => x.id === id);
      const existing = c?.tags || [];
      if (!existing.some((t) => t.toLowerCase() === tag.toLowerCase())) {
        await updateCustomer(id, { tags: [...existing, tag] });
      }
    }
    setIsBulkTagging(false);
    setShowBulkTagDialog(false);
    setBulkTagDraft('');
    refreshCustomers();
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          {showSearch ? (
            <div className="flex h-11 items-center gap-2">
              <div className="relative flex-1">
                {!searchTerm && (
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                )}
                <Input
                  placeholder="Search customers…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    'h-11 touch-manipulation rounded-xl border-white/[0.08] bg-white/[0.06] pr-9 text-base text-white placeholder:text-white/30',
                    !searchTerm && 'pl-9'
                  )}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.1] touch-manipulation"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm('');
                }}
                className="px-2 text-xs font-medium text-elec-yellow touch-manipulation"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex h-11 items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="h-9 w-9 shrink-0 rounded-lg text-white hover:bg-white/10 hover:text-white touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="min-w-0 flex-1 truncate text-sm font-bold uppercase tracking-wide text-white">
                Customers
                <span className="ml-1.5 text-xs font-normal normal-case tracking-normal text-white/30">
                  {totalCount || customers.length}
                </span>
              </h1>
              <button
                onClick={() => setShowSearch(true)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-white touch-manipulation active:scale-[0.98]"
              >
                <Search className="h-4 w-4" />
              </button>
              {/* Quick-create dropdown */}
              <div ref={quickCreateRef} className="relative">
                <button
                  onClick={() => setShowQuickCreateMenu((v) => !v)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-elec-yellow touch-manipulation active:scale-[0.98]"
                  aria-label="Add customer"
                >
                  <Plus className="h-4 w-4 text-black" />
                </button>
                <AnimatePresence>
                  {showQuickCreateMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] shadow-xl"
                    >
                      <button
                        onClick={() => {
                          setShowQuickCreateMenu(false);
                          setEditingCustomer(null);
                          setVCardSeed(null);
                          setShowAddDialog(true);
                        }}
                        className="block w-full px-4 py-3 text-left text-[13px] text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
                      >
                        Add customer
                      </button>
                      <button
                        onClick={() => {
                          setShowQuickCreateMenu(false);
                          openContactsImport();
                        }}
                        className="block w-full border-t border-white/[0.06] px-4 py-3 text-left text-[13px] text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
                      >
                        Import from contacts
                      </button>
                      <button
                        onClick={handlePasteVCard}
                        className="block w-full border-t border-white/[0.06] px-4 py-3 text-left text-[13px] text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
                      >
                        Paste vCard
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <PullToRefresh onRefresh={refreshCustomers} isRefreshing={isLoading}>
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:space-y-8 sm:py-6"
        >
          {/* Editorial hero strip */}
          {customers.length > 0 && (
            <motion.div variants={itemVariants}>
              <Eyebrow>BUSINESS HUB · CUSTOMERS</Eyebrow>
              <h2 className="mt-1.5 text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[34px]">
                Every customer. Every job.
              </h2>
              <p className="mt-2 max-w-[42rem] text-[13px] leading-relaxed text-white/65 sm:text-[14px]">
                Tap to call, email or open the full file. Filter by who needs a follow-up.
              </p>
            </motion.div>
          )}

          {/* StatStrip */}
          {customers.length > 0 && (
            <motion.div variants={itemVariants}>
              <StatStrip
                columns={4}
                stats={[
                  { label: 'Total', value: totalCount || customers.length, accent: true },
                  { label: 'With certs', value: kpis.withCerts, tone: 'emerald' },
                  { label: 'This month', value: kpis.thisMonth, tone: 'blue' },
                  { label: 'Reliable', value: kpis.reliable, tone: 'purple' },
                ]}
              />
            </motion.div>
          )}

          {/* FilterBar: sort tabs + follow-up + export */}
          {!showSearch && customers.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-[hsl(0_0%_12%)] p-1">
                  {sortTabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => handleSortChange(tab.value)}
                      className={cn(
                        'h-8 whitespace-nowrap rounded-full px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
                        sortField === tab.value
                          ? 'bg-elec-yellow text-black'
                          : 'text-white hover:bg-white/[0.04]'
                      )}
                    >
                      {tab.label}
                      {sortField === tab.value && (
                        <span className="ml-1 text-[10px]">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {/* Status filter */}
                <div className="flex h-9 items-center gap-0.5 rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] p-0.5">
                  {(
                    [
                      { value: null, label: 'All' },
                      { value: 'lead', label: 'Leads' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setStatusFilter(opt.value)}
                      className={cn(
                        'h-8 rounded-full px-3 text-[12px] font-medium transition-colors touch-manipulation',
                        statusFilter === opt.value
                          ? 'bg-elec-yellow text-black'
                          : 'text-white/65 hover:text-white'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowFollowUpOnly((v) => !v)}
                  className={cn(
                    'inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium transition-colors touch-manipulation',
                    showFollowUpOnly
                      ? 'border-amber-500/40 bg-amber-500/[0.12] text-amber-400'
                      : 'border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.07]'
                  )}
                >
                  <Dot tone={showFollowUpOnly ? 'amber' : 'yellow'} />
                  Needs follow-up
                  {followUpCount > 0 && (
                    <span
                      className={cn(
                        'ml-1 tabular-nums',
                        showFollowUpOnly ? 'text-amber-400/80' : 'text-white/55'
                      )}
                    >
                      {followUpCount}
                    </span>
                  )}
                </button>
                <div className="ml-auto flex items-center gap-2">
                  {/* View toggle */}
                  <div className="flex h-9 items-center gap-0.5 rounded-full border border-white/[0.08] bg-[hsl(0_0%_12%)] p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'h-8 rounded-full px-3 text-[12px] font-medium transition-colors touch-manipulation',
                        viewMode === 'grid'
                          ? 'bg-elec-yellow text-black'
                          : 'text-white/65 hover:text-white'
                      )}
                    >
                      List
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={cn(
                        'h-8 rounded-full px-3 text-[12px] font-medium transition-colors touch-manipulation',
                        viewMode === 'map'
                          ? 'bg-elec-yellow text-black'
                          : 'text-white/65 hover:text-white'
                      )}
                    >
                      Map
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={openContactsImport}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.06] touch-manipulation active:scale-[0.97]"
                      aria-label="Import customers"
                    >
                      <Upload className="h-4 w-4" />
                    </button>
                    <button
                      onClick={exportCustomers}
                      disabled={customers.length === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.06] disabled:opacity-40 touch-manipulation active:scale-[0.97]"
                      aria-label="Export customers"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Tag filter chips */}
              {tagCounts.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Tags
                  </span>
                  {tagCounts.slice(0, 10).map(([tag, count]) => {
                    const active = activeTagFilter === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTagFilter(active ? null : tag)}
                        className={cn(
                          'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-medium transition-colors touch-manipulation',
                          active
                            ? 'border-elec-yellow/40 bg-elec-yellow/[0.12] text-elec-yellow'
                            : 'border-white/[0.08] bg-white/[0.04] text-white/75 hover:border-elec-yellow/30 hover:bg-white/[0.08] hover:text-elec-yellow'
                        )}
                      >
                        {tag}
                        <span
                          className={cn(
                            'tabular-nums',
                            active ? 'text-elec-yellow/70' : 'text-white/45'
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                  {activeTagFilter && (
                    <button
                      onClick={() => setActiveTagFilter(null)}
                      className="text-[11.5px] font-medium text-white/55 transition-colors hover:text-white touch-manipulation"
                    >
                      Clear ✕
                    </button>
                  )}
                </div>
              )}
              {showFollowUpOnly && filteredCustomers.length < customers.length && (
                <p className="text-[12px] text-white/55">
                  Showing {filteredCustomers.length} of {customers.length} — no activity in 90+
                  days.
                </p>
              )}
              {/* Secondary action row */}
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                {!selectionMode ? (
                  <button
                    onClick={() => enterSelectionMode()}
                    className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Select multiple →
                  </button>
                ) : (
                  <>
                    <button
                      onClick={selectAllVisible}
                      className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                    >
                      Select all ({filteredCustomers.length})
                    </button>
                    <span className="text-white/30">·</span>
                    <button
                      onClick={exitSelectionMode}
                      className="text-white/65 hover:text-white transition-colors touch-manipulation"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* Upcoming reminders banner */}
          {!selectionMode && !remindersDismissed && upcomingReminders.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Dot tone="yellow" className="mt-[7px] !h-2 !w-2" />
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                      Follow-ups due
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-white">
                      {upcomingReminders.filter((r) => r.isOverdue).length > 0 && (
                        <>
                          {upcomingReminders.filter((r) => r.isOverdue).length} overdue
                          {upcomingReminders.length >
                            upcomingReminders.filter((r) => r.isOverdue).length && ' · '}
                        </>
                      )}
                      {upcomingReminders.filter((r) => !r.isOverdue).length > 0 && (
                        <>
                          {upcomingReminders.filter((r) => !r.isOverdue).length} due in the next 7
                          days
                        </>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-[12.5px] text-white/65">
                      {upcomingReminders.slice(0, 2).map((r, i) => (
                        <span key={r.id}>
                          {i > 0 && ' · '}
                          {r.customerName}: {r.title}
                        </span>
                      ))}
                      {upcomingReminders.length > 2 && (
                        <span> +{upcomingReminders.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/customers/${upcomingReminders[0].customerId}`)}
                    className="flex h-9 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                  >
                    Open first →
                  </button>
                  <button
                    onClick={() => setRemindersDismissed(true)}
                    className="flex h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Duplicate detection banner */}
          {!selectionMode && !duplicatesDismissed && duplicateIds.size > 1 && (
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/[0.08] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Dot tone="amber" className="mt-[7px] !h-2 !w-2" />
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400">
                      Possible duplicates
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-white">
                      {duplicateIds.size} customers share a phone or email
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-white/65">
                      Review each pair and merge them — certs, quotes and properties move across.
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMergeSheet(true)}
                    className="flex h-8 items-center rounded-full bg-elec-yellow px-3.5 text-[12px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
                  >
                    Review &amp; merge
                  </button>
                  <button
                    onClick={() => setDuplicatesDismissed(true)}
                    className="flex h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Customer grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : customers.length === 0 ? (
            <motion.div variants={itemVariants} className="py-12 text-center">
              <div className="mx-auto max-w-sm space-y-5">
                {searchTerm ? (
                  <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-center">
                    <p className="mb-1 text-base font-semibold text-white">No customers found</p>
                    <p className="text-sm text-white/65">Try a different name or postcode</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 text-center">
                      <p className="text-lg font-bold text-white">Build your customer base</p>
                      <p className="text-sm text-white/65">
                        Store clients, track jobs, send quotes — all in one place.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Button
                        onClick={() => setShowAddDialog(true)}
                        className="h-12 w-full rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add first customer
                      </Button>
                      <Button
                        onClick={openContactsImport}
                        variant="outline"
                        className="h-12 w-full rounded-xl border-white/[0.08] bg-white/[0.04] font-medium text-white touch-manipulation active:scale-[0.98]"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Import from contacts
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {viewMode === 'map' ? (
                <CustomerMap
                  customers={filteredCustomers}
                  selectedId={mapSelectedId}
                  onSelect={setMapSelectedId}
                />
              ) : filteredCustomers.length === 0 ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-6 py-10 text-center">
                  <p className="text-[15px] font-medium text-white">Nobody to follow up with.</p>
                  <p className="mt-1 text-[12.5px] text-white/55">
                    Every customer has activity in the last 90 days.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredCustomers.map((customer) => (
                      <motion.div
                        key={customer.id}
                        variants={itemVariants}
                        layout
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full"
                      >
                        <CustomerListRow
                          customer={customer}
                          onEdit={handleEdit}
                          onDelete={(id) => setDeleteConfirmId(id)}
                          onStartCertificate={(c) => setCertificateCustomer(c)}
                          onQuickNote={(c) => setQuickNoteCustomer(c)}
                          paymentReliability={reliabilityMap.get(customer.id) || null}
                          hasOverdue={overdueMap.get(customer.id) || false}
                          selectionMode={selectionMode}
                          selected={selectedIds.has(customer.id)}
                          onToggleSelect={toggleSelect}
                          onLongPress={(id) => enterSelectionMode(id)}
                          isDuplicate={duplicateIds.has(customer.id)}
                          onTagClick={(tag) => setActiveTagFilter(tag)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !searchTerm && (
                <div className="flex items-center justify-between pb-2 pt-4">
                  <p className="text-xs text-white/55">
                    Showing {(currentPage - 1) * 50 + 1}–{Math.min(currentPage * 50, totalCount)} of{' '}
                    {totalCount}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevPage}
                      disabled={!hasPrevPage}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-colors hover:bg-white/[0.07] disabled:opacity-30 touch-manipulation"
                    >
                      <ChevronLeft className="h-4 w-4 text-white" />
                    </button>
                    <span className="min-w-[60px] text-center text-sm font-medium text-white">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={!hasNextPage}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-colors hover:bg-white/[0.07] disabled:opacity-30 touch-manipulation"
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.main>
      </PullToRefresh>

      <CustomerForm
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) {
            setEditingCustomer(null);
            setVCardSeed(null);
          }
        }}
        customer={editingCustomer ?? (vCardSeed as Customer | null)}
        onSave={handleSaveCustomer}
      />
      <MergeDuplicatesSheet
        open={showMergeSheet}
        onOpenChange={setShowMergeSheet}
        groups={duplicateGroups}
        onMerge={mergeCustomers}
      />
      <CustomerImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportComplete={refreshCustomers}
      />
      {/* ELE-1332 — native device address book import (iOS + Android) */}
      <DeviceContactsImportSheet
        open={showDeviceImport}
        onOpenChange={setShowDeviceImport}
        onImportComplete={refreshCustomers}
      />
      {quickNoteCustomer && (
        <QuickNoteDialog
          open={!!quickNoteCustomer}
          onOpenChange={(open) => !open && setQuickNoteCustomer(null)}
          customerId={quickNoteCustomer.id}
        />
      )}
      {certificateCustomer && (
        <StartCertificateDialog
          open={!!certificateCustomer}
          onOpenChange={(open) => !open && setCertificateCustomer(null)}
          customer={certificateCustomer}
        />
      )}

      {/* Bulk action floating bar */}
      <AnimatePresence>
        {selectionMode && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
          >
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <Pill tone="yellow">
                  <Dot tone="yellow" className="mr-1.5" />
                  {selectedIds.size} selected
                </Pill>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setShowBulkTagDialog(true)}
                  disabled={selectedIds.size === 0}
                  className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation"
                >
                  Tag
                </button>
                <button
                  onClick={handleBulkEmail}
                  disabled={
                    selectedIds.size === 0 ||
                    !customers.some((c) => selectedIds.has(c.id) && c.email)
                  }
                  className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation"
                  title="Open email client with selected customers as BCC"
                >
                  Email
                </button>
                <button
                  onClick={handleBulkExport}
                  disabled={selectedIds.size === 0}
                  className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3 text-[12px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation"
                >
                  Export
                </button>
                <button
                  onClick={() => setShowBulkDeleteConfirm(true)}
                  disabled={selectedIds.size === 0}
                  className="flex h-9 items-center rounded-full border border-red-500/25 bg-red-500/[0.12] px-3 text-[12px] font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-40 touch-manipulation"
                >
                  Delete
                </button>
                <button
                  onClick={exitSelectionMode}
                  className="flex h-9 items-center rounded-full bg-elec-yellow px-4 text-[12px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk tag dialog */}
      <AlertDialog open={showBulkTagDialog} onOpenChange={setShowBulkTagDialog}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Tag {selectedIds.size} customer{selectedIds.size === 1 ? '' : 's'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white/65">
              Add a tag to every selected customer. Existing tags are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3">
            <input
              autoFocus
              value={bulkTagDraft}
              onChange={(e) => setBulkTagDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleBulkTag();
              }}
              placeholder="e.g. Landlord, Commercial, High-value…"
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] px-4 text-[14px] text-white placeholder:text-white/35 focus:border-elec-yellow/40 focus:outline-none"
            />
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                Quick pick
              </span>
              {['Residential', 'Commercial', 'Landlord', 'Letting Agent', 'Repeat'].map((t) => (
                <button
                  key={t}
                  onClick={() => setBulkTagDraft(t)}
                  className="inline-flex h-7 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 text-[11.5px] font-medium text-white/65 transition-colors hover:border-elec-yellow/30 hover:bg-white/[0.08] hover:text-elec-yellow touch-manipulation"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleBulkTag}
              disabled={isBulkTagging || !bulkTagDraft.trim()}
              className="h-11 w-full touch-manipulation rounded-xl bg-elec-yellow font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50"
            >
              {isBulkTagging ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                `Apply tag to ${selectedIds.size}`
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirm */}
      <AlertDialog open={showBulkDeleteConfirm} onOpenChange={setShowBulkDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Delete {selectedIds.size} customer{selectedIds.size === 1 ? '' : 's'}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white/65">
              This will permanently remove the selected customers and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isBulkDeleting}
              className="h-11 w-full touch-manipulation rounded-xl border border-red-500/25 bg-red-500/15 font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98] disabled:opacity-50"
            >
              {isBulkDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                `Delete ${selectedIds.size}`
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] rounded-2xl border border-white/[0.08] bg-[#111114] shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-white">
              Delete customer?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-white/65">
              This will permanently remove this customer and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleDelete}
              className="h-11 w-full touch-manipulation rounded-xl border border-red-500/25 bg-red-500/15 font-medium text-red-400 transition-all hover:bg-red-500/25 active:scale-[0.98]"
            >
              Delete
            </AlertDialogAction>
            <AlertDialogCancel className="mt-0 h-11 w-full touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
