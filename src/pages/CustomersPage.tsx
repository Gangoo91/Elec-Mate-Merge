import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers, Customer } from '@/hooks/useCustomers';
import { useCustomerReports } from '@/hooks/useCustomerReports';
import { CustomerCard } from '@/components/customers/customers/CustomerCard';
import { CustomerForm } from '@/components/customers/customers/CustomerForm';
import { CustomerImportDialog } from '@/components/customers/customers/CustomerImportDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Upload,
  Download,
  Users,
  ArrowLeft,
  FileText,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Calendar
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

export default function CustomersPage() {
  const navigate = useNavigate();
  const { customers, isLoading, saveCustomer, updateCustomer, deleteCustomer, exportCustomers } = useCustomers();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Load reports for viewing customer
  const { reports: customerReports, isLoading: reportsLoading } = useCustomerReports(viewingCustomer?.id || '');

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
      // Close detail sheet if viewing deleted customer
      if (viewingCustomer?.id === deleteConfirmId) {
        setViewingCustomer(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-11 w-11 touch-manipulation -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Users className="h-6 w-6 text-elec-yellow" />
            <h1 className="text-xl font-bold">Customers</h1>
          </div>
          <Badge variant="outline">
            {customers.length}
          </Badge>
        </div>
      </header>

      <main className="p-4 pb-24 space-y-4 max-w-4xl mx-auto">

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 touch-manipulation"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowImportDialog(true)}
              className="h-11 w-11 touch-manipulation"
              title="Import CSV"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={exportCustomers}
              disabled={customers.length === 0}
              className="h-11 w-11 touch-manipulation"
              title="Export CSV"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setEditingCustomer(null);
                setShowAddDialog(true);
              }}
              className="h-11 gap-2 touch-manipulation"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Customer</span>
            </Button>
          </div>
        </div>

      {/* Customer List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <p className="text-lg font-medium">
              {searchTerm ? 'No customers found' : 'No customers yet'}
            </p>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? 'Try a different search term'
                : 'Add your first customer to get started'}
            </p>
          </div>
          {!searchTerm && (
            <Button
              variant="accent"
              onClick={() => setShowAddDialog(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onView={(id) => setViewingCustomer(customers.find(c => c.id === id) || null)}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteConfirmId(id)}
            />
          ))}
        </div>
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this customer and cannot be undone.
              Their certificates will remain but won't be linked to this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Customer Detail Sheet */}
      <Sheet open={!!viewingCustomer} onOpenChange={(open) => !open && setViewingCustomer(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl overflow-hidden">
          {viewingCustomer && (
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-left text-xl">{viewingCustomer.name}</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">Contact Details</h3>
                  <div className="space-y-2">
                    {viewingCustomer.email && (
                      <a
                        href={`mailto:${viewingCustomer.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                      >
                        <Mail className="h-5 w-5 text-elec-yellow" />
                        <span>{viewingCustomer.email}</span>
                      </a>
                    )}
                    {viewingCustomer.phone && (
                      <a
                        href={`tel:${viewingCustomer.phone}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                      >
                        <Phone className="h-5 w-5 text-elec-yellow" />
                        <span>{viewingCustomer.phone}</span>
                      </a>
                    )}
                    {viewingCustomer.address && (
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-card">
                        <MapPin className="h-5 w-5 text-elec-yellow mt-0.5" />
                        <span className="whitespace-pre-wrap">{viewingCustomer.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {viewingCustomer.notes && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm uppercase text-muted-foreground">Notes</h3>
                    <p className="text-sm p-3 rounded-lg bg-card whitespace-pre-wrap">
                      {viewingCustomer.notes}
                    </p>
                  </div>
                )}

                {/* Certificates */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                    Certificates ({customerReports?.length || 0})
                  </h3>
                  {reportsLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : customerReports && customerReports.length > 0 ? (
                    <div className="space-y-2">
                      {customerReports.map((report: any) => (
                        <div
                          key={report.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-card"
                        >
                          <FileText className="h-5 w-5 text-elec-yellow" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {report.certificate_number || report.report_type?.toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {report.installation_address || 'No address'}
                            </p>
                          </div>
                          <div className="text-right text-sm">
                            <Badge variant={
                              report.status === 'completed' ? 'default' :
                              report.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {report.status}
                            </Badge>
                            {report.inspection_date && (
                              <p className="text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {formatDate(report.inspection_date)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground p-3 rounded-lg bg-card text-center">
                      No certificates linked to this customer
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation"
                  onClick={() => {
                    handleEdit(viewingCustomer);
                    setViewingCustomer(null);
                  }}
                >
                  Edit Customer
                </Button>
                <Button
                  variant="destructive"
                  className="h-11 touch-manipulation"
                  onClick={() => {
                    setDeleteConfirmId(viewingCustomer.id);
                    setViewingCustomer(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
