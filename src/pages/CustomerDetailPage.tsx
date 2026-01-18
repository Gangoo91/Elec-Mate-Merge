import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomer } from '@/hooks/inspection/useCustomers';
import { useCustomers } from '@/hooks/inspection/useCustomers';
import { CustomerForm } from '@/components/inspection-app/customers/CustomerForm';
import { CustomerOverviewTab } from '@/components/inspection-app/customers/CustomerOverviewTab';
import { CustomerPropertiesTab } from '@/components/inspection-app/customers/CustomerPropertiesTab';
import { CustomerTimelineTab } from '@/components/inspection-app/customers/CustomerTimelineTab';
import { QuickNoteDialog } from '@/components/inspection-app/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/inspection-app/customers/StartCertificateDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  ArrowLeft,
  Loader2,
  User,
  Home,
  Clock,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export default function CustomerDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const { customer, isLoading, refetch } = useCustomer(customerId || '');
  const { deleteCustomer, updateCustomer } = useCustomers();

  const [activeTab, setActiveTab] = useState('overview');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [showStartCertificate, setShowStartCertificate] = useState(false);

  const handleDelete = async () => {
    if (customerId) {
      const success = await deleteCustomer(customerId);
      if (success) {
        navigate('/customers');
      }
    }
    setShowDeleteConfirm(false);
  };

  const handleUpdate = async (data: any) => {
    if (customerId) {
      await updateCustomer(customerId, data);
      refetch();
    }
    setShowEditDialog(false);
  };

  if (isLoading) {
    return (
      <div className="bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/customers')}
              className="h-11 w-11 touch-manipulation -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Customer Not Found</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Customer not found</p>
          <p className="text-muted-foreground text-sm mb-4">
            This customer may have been deleted.
          </p>
          <Button onClick={() => navigate('/customers')}>
            Back to Customers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/customers')}
              className="h-11 w-11 touch-manipulation -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold truncate max-w-[200px] sm:max-w-none">
                {customer.name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEditDialog(true)}
              className="h-10 w-10 touch-manipulation"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDeleteConfirm(true)}
              className="h-10 w-10 touch-manipulation text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="sticky top-14 z-40 bg-background border-b border-border">
          <TabsList className="w-full h-12 p-1 bg-transparent rounded-none justify-start gap-1 px-4">
            <TabsTrigger
              value="overview"
              className="flex-1 sm:flex-none data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow min-h-[40px] touch-manipulation"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="flex-1 sm:flex-none data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow min-h-[40px] touch-manipulation"
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Properties</span>
              {(customer.propertyCount || 0) > 0 && (
                <span className="ml-1 text-xs">({customer.propertyCount})</span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="flex-1 sm:flex-none data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow min-h-[40px] touch-manipulation"
            >
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <main className="p-4 pb-24 max-w-4xl mx-auto">
          <TabsContent value="overview" className="mt-0">
            <CustomerOverviewTab
              customer={customer}
              onAddNote={() => setShowQuickNote(true)}
              onStartCertificate={() => setShowStartCertificate(true)}
              onRefresh={refetch}
            />
          </TabsContent>

          <TabsContent value="properties" className="mt-0">
            <CustomerPropertiesTab
              customerId={customer.id}
              onRefresh={refetch}
            />
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <CustomerTimelineTab customerId={customer.id} />
          </TabsContent>
        </main>
      </Tabs>

      {/* Edit Dialog */}
      <CustomerForm
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        customer={customer}
        onSave={handleUpdate}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove "{customer.name}" and cannot be undone.
              Their certificates will remain but won't be linked to this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Quick Note Dialog */}
      <QuickNoteDialog
        open={showQuickNote}
        onOpenChange={setShowQuickNote}
        customerId={customer.id}
      />

      {/* Start Certificate Dialog */}
      <StartCertificateDialog
        open={showStartCertificate}
        onOpenChange={setShowStartCertificate}
        customer={customer}
      />
    </div>
  );
}
