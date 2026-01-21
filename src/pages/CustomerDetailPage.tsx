import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCustomer } from '@/hooks/inspection/useCustomers';
import { useCustomers } from '@/hooks/inspection/useCustomers';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerOverviewTab } from '@/components/customers/CustomerOverviewTab';
import { CustomerPropertiesTab } from '@/components/customers/CustomerPropertiesTab';
import { CustomerTimelineTab } from '@/components/customers/CustomerTimelineTab';
import { QuickNoteDialog } from '@/components/customers/QuickNoteDialog';
import { StartCertificateDialog } from '@/components/customers/StartCertificateDialog';
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
import { cn } from '@/lib/utils';

// Get initials from customer name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-sm text-muted-foreground">Loading customer...</p>
        </motion.div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3 px-4 h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/customers')}
              className="h-11 w-11 touch-manipulation active:scale-[0.98] -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Customer Not Found</h1>
          </div>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-4"
        >
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <p className="text-lg font-medium mb-2">Customer not found</p>
            <p className="text-muted-foreground text-sm mb-5">
              This customer may have been deleted.
            </p>
            <Button
              onClick={() => navigate('/customers')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 shadow-lg shadow-purple-500/20"
            >
              Back to Customers
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-50 w-full bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/customers')}
              className="h-11 w-11 touch-manipulation active:scale-[0.98] -ml-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            {/* Gradient Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-sm font-bold text-white">{getInitials(customer.name)}</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold truncate max-w-[180px] sm:max-w-none">
                {customer.name}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEditDialog(true)}
              className="h-10 w-10 touch-manipulation active:scale-[0.98] bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-xl"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDeleteConfirm(true)}
              className="h-10 w-10 touch-manipulation active:scale-[0.98] bg-white/[0.02] border-white/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-400 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Styled Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="sticky top-16 z-40 bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
          <TabsList className="w-full h-14 p-1.5 bg-transparent rounded-none justify-start gap-2 px-4">
            <TabsTrigger
              value="overview"
              className={cn(
                "flex-1 sm:flex-none min-h-[44px] touch-manipulation rounded-xl transition-all",
                "data-[state=inactive]:bg-white/[0.02] data-[state=inactive]:border data-[state=inactive]:border-white/10",
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-600/20",
                "data-[state=active]:border data-[state=active]:border-purple-500/30",
                "data-[state=active]:text-purple-300"
              )}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className={cn(
                "flex-1 sm:flex-none min-h-[44px] touch-manipulation rounded-xl transition-all",
                "data-[state=inactive]:bg-white/[0.02] data-[state=inactive]:border data-[state=inactive]:border-white/10",
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-600/20",
                "data-[state=active]:border data-[state=active]:border-purple-500/30",
                "data-[state=active]:text-purple-300"
              )}
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Properties</span>
              {(customer.propertyCount || 0) > 0 && (
                <span className="ml-1 text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                  {customer.propertyCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className={cn(
                "flex-1 sm:flex-none min-h-[44px] touch-manipulation rounded-xl transition-all",
                "data-[state=inactive]:bg-white/[0.02] data-[state=inactive]:border data-[state=inactive]:border-white/10",
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-600/20",
                "data-[state=active]:border data-[state=active]:border-purple-500/30",
                "data-[state=active]:text-purple-300"
              )}
            >
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <main className="p-4 pb-24 max-w-4xl mx-auto">
          <TabsContent value="overview" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CustomerOverviewTab
                customer={customer}
                onAddNote={() => setShowQuickNote(true)}
                onStartCertificate={() => setShowStartCertificate(true)}
                onRefresh={refetch}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="properties" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CustomerPropertiesTab
                customerId={customer.id}
                onRefresh={refetch}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CustomerTimelineTab customerId={customer.id} />
            </motion.div>
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
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove "{customer.name}" and cannot be undone.
              Their certificates will remain but won't be linked to this customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px] bg-white/[0.02] border-white/10 rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px] rounded-xl"
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
