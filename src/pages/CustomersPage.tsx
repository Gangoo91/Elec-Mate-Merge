import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomers, Customer, SortField, SortDirection } from '@/hooks/inspection/useCustomers';
import { CustomerListRow } from '@/components/customers/CustomerListRow';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerImportDialog } from '@/components/customers/customers/CustomerImportDialog';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Search,
  Plus,
  Upload,
  Download,
  Users,
  ArrowLeft,
  Loader2,
  ArrowUp,
  ArrowDown,
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

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'lastActivityAt', label: 'Last Activity' },
  { value: 'createdAt', label: 'Date Added' },
  { value: 'certificateCount', label: 'Certificates' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const emptyStateVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

export default function CustomersPage() {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const {
    customers,
    isLoading,
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    exportCustomers,
  } = useCustomers({ sortField, sortDirection });

  const [searchTerm, setSearchTerm] = useState('');
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
    return customers.filter(c =>
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

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-50 w-full bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 px-4 h-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-11 w-11 touch-manipulation active:scale-[0.98] -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold flex-1">Customers</h1>
          <Badge className="bg-white/10 border-white/20 text-foreground px-3 py-1">
            {customers.length}
          </Badge>
        </div>
      </header>

      <main className="p-4 pb-24 space-y-4 max-w-4xl mx-auto">
        {/* Search and Actions - Glassmorphic */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 !pl-12 touch-manipulation bg-white/[0.02] border-white/10 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowImportDialog(true)}
              className="h-12 w-12 touch-manipulation active:scale-[0.98] bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-xl"
              title="Import CSV"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={exportCustomers}
              disabled={customers.length === 0}
              className="h-12 w-12 touch-manipulation active:scale-[0.98] bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-xl"
              title="Export CSV"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setEditingCustomer(null);
                setShowAddDialog(true);
              }}
              className="h-12 gap-2 touch-manipulation active:scale-[0.98] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 rounded-xl shadow-lg shadow-blue-500/20"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Customer</span>
            </Button>
          </div>
        </div>

        {/* Sort Controls - Glassmorphic */}
        <div className="flex items-center gap-2 text-sm p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <span className="text-muted-foreground">Sort by:</span>
          <MobileSelectPicker
            value={sortField}
            onValueChange={(value) => setSortField(value as SortField)}
            options={sortOptions}
            placeholder="Sort by..."
            title="Sort Customers"
            triggerClassName="w-[140px] h-9 bg-white/[0.04] border-white/10 rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSortDirection}
            className="h-9 w-9 touch-manipulation active:scale-[0.98] bg-white/[0.04] border border-white/10 rounded-lg hover:bg-white/[0.08]"
            title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Customer List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredCustomers.length === 0 ? (
          <motion.div
            variants={emptyStateVariants}
            initial="hidden"
            animate="show"
            className="text-center py-12"
          >
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-sm mx-auto">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Users className="h-10 w-10 text-white/40" />
              </motion.div>
              <p className="text-lg font-medium mb-1">
                {searchTerm ? 'No customers found' : 'No customers yet'}
              </p>
              <p className="text-sm text-muted-foreground mb-5">
                {searchTerm
                  ? 'Try a different search term'
                  : 'Add your first customer to get started'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowAddDialog(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 shadow-lg shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
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
          </motion.div>
        )}
      </main>

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
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this customer and cannot be undone.
              Their certificates will remain but won't be linked to this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px] bg-white/[0.02] border-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
