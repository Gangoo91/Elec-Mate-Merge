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
  Edit,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

const getInitials = (name: string) =>
  name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);

// Action card — no icons, just text + accent line
function ActionCard({
  title,
  subtitle,
  accentColor,
  onClick,
}: {
  title: string;
  subtitle: string;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <motion.div variants={itemVariants}>
      <button
        onClick={onClick}
        className="group relative overflow-hidden card-surface-interactive w-full text-left active:scale-[0.98] transition-all duration-200 touch-manipulation"
      >
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-200', accentColor)} />
        <div className="relative z-10 flex flex-col p-4">
          <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-[12px] text-white leading-tight line-clamp-1">{subtitle}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function CustomerDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const { customer, isLoading, refetch } = useCustomer(customerId || '');
  const { deleteCustomer, updateCustomer } = useCustomers();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQuickNote, setShowQuickNote] = useState(false);
  const [showStartCertificate, setShowStartCertificate] = useState(false);
  const [activeSection, setActiveSection] = useState<'work' | 'properties' | 'timeline'>('work');

  const handleDelete = async () => {
    if (customerId) {
      const success = await deleteCustomer(customerId);
      if (success) navigate('/customers');
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
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          <p className="text-sm text-white">Loading customer...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-sm font-bold text-white tracking-wide uppercase">Not Found</h1>
            </div>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="card-surface-interactive p-8 max-w-sm text-center rounded-2xl">
            <p className="text-lg font-semibold mb-2 text-white">Customer not found</p>
            <p className="text-sm text-white mb-5">This customer may have been deleted.</p>
            <Button onClick={() => navigate('/customers')} className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl h-11 w-full touch-manipulation active:scale-[0.98]">
              Back to Customers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const memberSince = new Date(customer.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="text-white hover:text-white hover:bg-white/10 rounded-lg w-9 h-9 flex-shrink-0 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-bold text-white tracking-wide uppercase flex-1 min-w-0 truncate">{customer.name}</h1>
            <button onClick={() => setShowEditDialog(true)} className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation transition-colors flex-shrink-0">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => setShowDeleteConfirm(true)} className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-red-500/10 active:scale-[0.98] touch-manipulation transition-colors flex-shrink-0">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5">

        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden card-surface-interactive rounded-2xl">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/60 via-elec-yellow/30 to-transparent" />
            <div className="relative z-10 p-5">
              {/* Name + Since */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                  <span className="font-bold text-sm text-white">{getInitials(customer.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white leading-tight">{customer.name}</h2>
                  <p className="text-[12px] text-white mt-0.5">Customer since {memberSince}</p>
                </div>
              </div>

              {/* Contact info — no icons, tappable pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {customer.email && (
                  <a href={`mailto:${customer.email}`} className="h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] touch-manipulation active:scale-[0.97] transition-all flex items-center">
                    <span className="text-[12px] text-white truncate max-w-[180px]">{customer.email}</span>
                  </a>
                )}
                {customer.phone && (
                  <a href={`tel:${customer.phone}`} className="h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] touch-manipulation active:scale-[0.97] transition-all flex items-center">
                    <span className="text-[12px] text-white">{customer.phone}</span>
                  </a>
                )}
                {customer.address && (
                  <div className="h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center">
                    <span className="text-[12px] text-white truncate max-w-[220px]">{customer.address}{customer.postcode ? `, ${customer.postcode}` : ''}</span>
                  </div>
                )}
              </div>

              {/* KPI Cards with accent lines */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Certs', value: customer.certificateCount || 0, accent: 'from-emerald-500/40 to-emerald-500/10', color: 'text-emerald-400' },
                  { label: 'Properties', value: customer.propertyCount || 0, accent: 'from-blue-500/40 to-blue-500/10', color: 'text-blue-400' },
                  { label: 'Quotes', value: customer.quoteCount || 0, accent: 'from-elec-yellow/40 to-elec-yellow/10', color: 'text-elec-yellow' },
                  { label: 'Invoices', value: customer.invoiceCount || 0, accent: 'from-amber-500/40 to-amber-500/10', color: 'text-amber-400' },
                ].map((kpi) => (
                  <div key={kpi.label} className="relative overflow-hidden rounded-xl bg-white/[0.04] border border-white/[0.06] text-center p-2.5">
                    <div className={cn('absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r rounded-full', kpi.accent)} />
                    <p className={cn('text-xl font-bold', kpi.color)}>{kpi.value}</p>
                    <p className="text-[10px] font-medium text-white mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS — Business Hub grid layout */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="border-b border-white/[0.06] pb-1">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard
              title="New Certificate"
              subtitle="EICR, EIC, minor works & more"
              accentColor="from-emerald-500 via-emerald-400 to-teal-400"
              onClick={() => setShowStartCertificate(true)}
            />
            <ActionCard
              title="New Quote"
              subtitle="Create & send a quote"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              onClick={() => navigate('/electrician/quotes')}
            />
            <ActionCard
              title="Add Note"
              subtitle="Quick note or reminder"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              onClick={() => setShowQuickNote(true)}
            />
            <ActionCard
              title="Properties"
              subtitle={`${customer.propertyCount || 0} saved addresses`}
              accentColor="from-amber-500 via-orange-400 to-orange-500"
              onClick={() => setActiveSection('properties')}
            />
          </div>
        </motion.section>

        {/* WORK HISTORY section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {([
              { key: 'work' as const, label: 'Work History' },
              { key: 'properties' as const, label: `Properties (${customer.propertyCount || 0})` },
              { key: 'timeline' as const, label: 'Timeline' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={cn(
                  'shrink-0 h-9 px-4 rounded-full text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                  activeSection === tab.key
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Section content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === 'work' && (
            <CustomerOverviewTab
              customer={customer}
              onAddNote={() => setShowQuickNote(true)}
              onStartCertificate={() => setShowStartCertificate(true)}
              onRefresh={refetch}
            />
          )}
          {activeSection === 'properties' && (
            <CustomerPropertiesTab customerId={customer.id} onRefresh={refetch} />
          )}
          {activeSection === 'timeline' && (
            <CustomerTimelineTab customerId={customer.id} />
          )}
        </motion.div>
      </motion.main>

      {/* Edit Dialog */}
      <CustomerForm open={showEditDialog} onOpenChange={setShowEditDialog} customer={customer} onSave={handleUpdate} />

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              This will permanently remove "{customer.name}" and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction onClick={handleDelete} className="w-full h-11 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 font-medium hover:bg-red-500/25 active:scale-[0.98] transition-all touch-manipulation">Delete</AlertDialogAction>
            <AlertDialogCancel className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <QuickNoteDialog open={showQuickNote} onOpenChange={setShowQuickNote} customerId={customer.id} />
      {customer && <StartCertificateDialog open={showStartCertificate} onOpenChange={setShowStartCertificate} customer={customer} />}
    </div>
  );
}
