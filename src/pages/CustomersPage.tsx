import React, { useState, useMemo } from 'react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomers, Customer, SortField, SortDirection } from '@/hooks/inspection/useCustomers';
import { CustomerListRow } from '@/components/customers/CustomerListRow';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerImportDialog } from '@/components/customers/customers/CustomerImportDialog';
import { CustomerAnalyticsPanel } from '@/components/customers/CustomerAnalyticsPanel';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Upload, Download, Users, ArrowLeft, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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
  } = useCustomers({ sortField, sortDirection });

  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [quickNoteCustomer, setQuickNoteCustomer] = useState<Customer | null>(null);
  const [certificateCustomer, setCertificateCustomer] = useState<Customer | null>(null);

  // Filter customers by search
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.includes(term) ||
        c.address?.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur-xl border-b border-white/10">
        {showSearch ? (
          /* Search mode */
          <div className="flex items-center h-14 px-4 gap-2">
            <div className="relative flex-1">
              {!searchTerm && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
              )}
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  'h-11 pr-9 text-base touch-manipulation rounded-xl bg-white/[0.05] border-white/[0.06] focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20',
                  !searchTerm && 'pl-9'
                )}
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white/[0.1] hover:bg-white/[0.15] touch-manipulation"
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
              className="text-sm text-blue-400 font-medium px-2 touch-manipulation"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* Normal header */
          <>
            <div className="flex items-center h-14 px-4 gap-2">
              <button
                onClick={() => navigate('/electrician/business')}
                className="h-10 w-10 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="flex-1 text-xl font-bold">Customers</h1>
              <span className="text-xs text-muted-foreground bg-white/[0.06] px-2.5 py-1 rounded-full font-medium">
                {totalCount || customers.length}
              </span>
              <button
                onClick={() => setShowSearch(true)}
                className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] transition-all touch-manipulation"
              >
                <Search className="h-5 w-5 text-white/80" />
              </button>
              <button
                onClick={() => {
                  setEditingCustomer(null);
                  setShowAddDialog(true);
                }}
                className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center active:scale-[0.98] touch-manipulation shadow-lg shadow-blue-500/25"
              >
                <Plus className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Action pills row */}
            <div className="flex items-center gap-3 px-4 pb-3">
              <button
                onClick={() => setShowImportDialog(true)}
                className="flex items-center gap-1.5 text-blue-400 active:opacity-70 touch-manipulation"
              >
                <Upload className="h-3.5 w-3.5" />
                <span className="text-[13px] font-medium">Import</span>
              </button>
              <button
                onClick={exportCustomers}
                disabled={customers.length === 0}
                className="flex items-center gap-1.5 text-blue-400 active:opacity-70 touch-manipulation disabled:opacity-40"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="text-[13px] font-medium">Export</span>
              </button>
            </div>
          </>
        )}

        {/* Sort pills — always visible */}
        {!showSearch && (
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {sortTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleSortChange(tab.value)}
                className={cn(
                  'shrink-0 h-8 px-3.5 rounded-full text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                  sortField === tab.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/[0.06] text-white/70'
                )}
              >
                {tab.label}
                {sortField === tab.value && (
                  <span className="ml-1 text-[11px] opacity-80">
                    {sortDirection === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      <PullToRefresh onRefresh={refreshCustomers} isRefreshing={isLoading}>
      <main className="px-4 py-3 pb-24 space-y-3 max-w-4xl mx-auto">
        {/* Analytics Panel */}
        {customers.length > 0 && <CustomerAnalyticsPanel />}

        {/* Customer List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredCustomers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="text-center py-12"
          >
            <div className="max-w-sm mx-auto space-y-5">
              {searchTerm ? (
                /* Search empty state */
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                  <Search className="h-10 w-10 text-white/30 mx-auto mb-3" />
                  <p className="text-base font-semibold text-white mb-1">No customers found</p>
                  <p className="text-sm text-white/50">Try a different name or postcode</p>
                </div>
              ) : (
                /* First-time empty state */
                <>
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 border border-elec-yellow/30 mx-auto">
                      <Users className="h-8 w-8 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">Build Your Customer Base</p>
                      <p className="text-sm text-white/50 mt-1">
                        Store clients, track jobs, and send quotes all in one place
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => setShowAddDialog(true)}
                      className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl shadow-lg shadow-elec-yellow/20 touch-manipulation"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Customer
                    </Button>
                    <Button
                      onClick={() => setShowImportDialog(true)}
                      variant="outline"
                      className="w-full h-12 border-white/10 bg-white/5 text-white font-medium rounded-xl touch-manipulation"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Import from Contacts
                    </Button>
                  </div>

                  <p className="text-center text-xs text-white/30">
                    All customer data is stored securely and never shared
                  </p>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredCustomers.map((customer) => (
                <motion.div
                  key={customer.id}
                  variants={cardVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <CustomerListRow
                    customer={customer}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteConfirmId(id)}
                    onStartCertificate={(c) => setCertificateCustomer(c)}
                    onQuickNote={(c) => setQuickNoteCustomer(c)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && !searchTerm && (
              <div className="flex items-center justify-between pt-4 pb-2">
                <p className="text-xs text-muted-foreground">
                  Showing {((currentPage - 1) * 50) + 1}–{Math.min(currentPage * 50, totalCount)} of {totalCount} customers
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={!hasPrevPage}
                    className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors touch-manipulation"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-center">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={!hasNextPage}
                    className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors touch-manipulation"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>
      </PullToRefresh>

      {/* Add/Edit Customer Dialog */}
      <CustomerForm
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) setEditingCustomer(null);
        }}
        customer={editingCustomer}
        onSave={handleSaveCustomer}
      />

      {/* Import Dialog */}
      <CustomerImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImportComplete={refreshCustomers}
      />

      {/* Quick Note Dialog */}
      {quickNoteCustomer && (
        <QuickNoteDialog
          open={!!quickNoteCustomer}
          onOpenChange={(open) => !open && setQuickNoteCustomer(null)}
          customerId={quickNoteCustomer.id}
        />
      )}

      {/* Start Certificate Dialog */}
      {certificateCustomer && (
        <StartCertificateDialog
          open={!!certificateCustomer}
          onOpenChange={(open) => !open && setCertificateCustomer(null)}
          customer={certificateCustomer}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this customer and cannot be undone. Their certificates
              will remain but won't be linked to this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px] bg-white/[0.02] border-white/10 rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px] rounded-xl"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
