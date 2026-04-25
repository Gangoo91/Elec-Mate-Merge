import React, { useState, useEffect, useMemo } from 'react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomers, Customer, SortField, SortDirection } from '@/hooks/inspection/useCustomers';
import { useDebounce } from '@/hooks/useDebounce';
import { supabase } from '@/integrations/supabase/client';
import { ReliabilityLevel } from '@/hooks/useCustomerPaymentStats';
import { CustomerListRow } from '@/components/customers/CustomerListRow';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerImportDialog } from '@/components/customers/customers/CustomerImportDialog';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Upload, Download, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

const sortTabs: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'lastActivityAt', label: 'Recent' },
  { value: 'createdAt', label: 'Newest' },
  { value: 'certificateCount', label: 'Certs' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');
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
    goToPage,
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    exportCustomers,
    refreshCustomers,
  } = useCustomers({ sortField, sortDirection, searchTerm: debouncedSearch });

  const [invoiceData, setInvoiceData] = useState<
    { customer_id: string; invoice_status: string | null; invoice_paid_at: string | null; invoice_due_date: string | null }[]
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

  const [showSearch, setShowSearch] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [quickNoteCustomer, setQuickNoteCustomer] = useState<Customer | null>(null);
  const [certificateCustomer, setCertificateCustomer] = useState<Customer | null>(null);

  const handleSaveCustomer = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.id, data);
    } else {
      await saveCustomer(data);
    }
    setShowAddDialog(false);
    setEditingCustomer(null);
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

  // KPI data
  const kpiData = useMemo(() => {
    const withCerts = customers.filter((c) => (c as any).certificateCount > 0).length;
    const thisMonth = customers.filter((c) => {
      const d = new Date(c.createdAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const reliable = Array.from(reliabilityMap.values()).filter((v) => v === 'good').length;
    return { withCerts, thisMonth, reliable };
  }, [customers, reliabilityMap]);

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          {showSearch ? (
            <div className="flex items-center h-11 gap-2">
              <div className="relative flex-1">
                {!searchTerm && (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                )}
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    'h-11 pr-9 text-base touch-manipulation rounded-xl bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30',
                    !searchTerm && 'pl-9'
                  )}
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white/[0.1] touch-manipulation"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
              <button onClick={() => { setShowSearch(false); setSearchTerm(''); }} className="text-xs font-medium text-elec-yellow px-2 touch-manipulation">
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 h-11">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 flex-shrink-0 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-sm font-bold text-white tracking-wide uppercase flex-1 min-w-0">
                Customers
                <span className="text-white/30 font-normal tracking-normal normal-case text-xs ml-1.5">{totalCount || customers.length}</span>
              </h1>
              <button onClick={() => setShowSearch(true)} className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-colors flex-shrink-0">
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => { setEditingCustomer(null); setShowAddDialog(true); }}
                className="w-9 h-9 rounded-full bg-elec-yellow flex items-center justify-center active:scale-[0.98] touch-manipulation flex-shrink-0"
              >
                <Plus className="h-4 w-4 text-black" />
              </button>
            </div>
          )}
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <PullToRefresh onRefresh={refreshCustomers} isRefreshing={isLoading}>
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-4 max-w-4xl mx-auto"
      >
        {/* KPI Cards — HubCard style */}
        {customers.length > 0 && (
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: totalCount || customers.length, accent: 'from-elec-yellow via-amber-400 to-orange-400', color: 'text-white' },
              { label: 'With Certs', value: kpiData.withCerts, accent: 'from-emerald-500 via-emerald-400 to-green-400', color: 'text-emerald-400' },
              { label: 'This Month', value: kpiData.thisMonth, accent: 'from-blue-500 via-blue-400 to-cyan-400', color: 'text-blue-400' },
              { label: 'Reliable', value: kpiData.reliable, accent: 'from-violet-500 via-purple-400 to-indigo-400', color: 'text-violet-400' },
            ].map((kpi) => (
              <div key={kpi.label} className="group relative overflow-hidden card-surface-interactive rounded-xl">
                <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40', kpi.accent)} />
                <div className="relative z-10 p-3">
                  <p className="text-[11px] font-medium text-white leading-tight">{kpi.label}</p>
                  <p className={cn('text-xl font-bold leading-tight mt-1', kpi.color)}>{kpi.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Sort tabs + actions */}
        {!showSearch && customers.length > 0 && (
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {sortTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleSortChange(tab.value)}
                  className={cn(
                    'shrink-0 h-8 px-3 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-[0.98]',
                    sortField === tab.value
                      ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                      : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.07]'
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
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button onClick={() => setShowImportDialog(true)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/[0.06] active:scale-[0.97] touch-manipulation text-white hover:text-white transition-colors" aria-label="Import">
                <Upload className="h-4 w-4" />
              </button>
              <button onClick={exportCustomers} disabled={customers.length === 0} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/[0.06] active:scale-[0.97] touch-manipulation text-white hover:text-white transition-colors disabled:opacity-40" aria-label="Export">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Customer List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          </div>
        ) : customers.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="max-w-sm mx-auto space-y-5">
              {searchTerm ? (
                <div className="card-surface-interactive p-6 text-center rounded-2xl">
                  <p className="text-base font-semibold text-white mb-1">No customers found</p>
                  <p className="text-sm text-white">Try a different name or postcode</p>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-3">
                    <p className="text-lg font-bold text-white">Build Your Customer Base</p>
                    <p className="text-sm text-white">Store clients, track jobs, and send quotes all in one place</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <Button onClick={() => setShowAddDialog(true)} className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation active:scale-[0.98]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Customer
                    </Button>
                    <Button onClick={() => setShowImportDialog(true)} variant="outline" className="w-full h-12 border-white/[0.08] bg-white/[0.04] text-white font-medium rounded-xl touch-manipulation active:scale-[0.98]">
                      <Upload className="w-4 h-4 mr-2" />
                      Import from Contacts
                    </Button>
                  </div>
                  <p className="text-center text-xs text-white">All customer data is stored securely and never shared</p>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
            <AnimatePresence mode="popLayout">
              {customers.map((customer) => (
                <motion.div key={customer.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.95 }}>
                  <CustomerListRow
                    customer={customer}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onStartCertificate={(c) => setCertificateCustomer(c)}
                    onQuickNote={(c) => setQuickNoteCustomer(c)}
                    paymentReliability={reliabilityMap.get(customer.id) || null}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && !searchTerm && (
              <div className="flex items-center justify-between pt-4 pb-2">
                <p className="text-xs text-white">
                  Showing {((currentPage - 1) * 50) + 1}–{Math.min(currentPage * 50, totalCount)} of {totalCount}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={prevPage} disabled={!hasPrevPage} className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center disabled:opacity-30 hover:bg-white/[0.07] transition-colors touch-manipulation">
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </button>
                  <span className="text-sm font-medium text-white min-w-[60px] text-center">{currentPage} / {totalPages}</span>
                  <button onClick={nextPage} disabled={!hasNextPage} className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center disabled:opacity-30 hover:bg-white/[0.07] transition-colors touch-manipulation">
                    <ChevronRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.main>
      </PullToRefresh>

      <CustomerForm open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); if (!open) setEditingCustomer(null); }} customer={editingCustomer} onSave={handleSaveCustomer} />
      <CustomerImportDialog open={showImportDialog} onOpenChange={setShowImportDialog} onImportComplete={refreshCustomers} />
      {quickNoteCustomer && <QuickNoteDialog open={!!quickNoteCustomer} onOpenChange={(open) => !open && setQuickNoteCustomer(null)} customerId={quickNoteCustomer.id} />}
      {certificateCustomer && <StartCertificateDialog open={!!certificateCustomer} onOpenChange={(open) => !open && setCertificateCustomer(null)} customer={certificateCustomer} />}

      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">This will permanently remove this customer and cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction onClick={handleDelete} className="w-full h-11 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 font-medium hover:bg-red-500/25 active:scale-[0.98] transition-all touch-manipulation">Delete</AlertDialogAction>
            <AlertDialogCancel className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
