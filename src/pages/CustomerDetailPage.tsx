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
  Users,
  Edit,
  Trash2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  FileText,
  Home,
  StickyNote,
  Briefcase,
  ChevronRight,
  Calendar,
  Clock,
  Shield,
  Zap,
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

// Reusable action card matching BusinessCard pattern
function ActionCard({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  accentColor,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <motion.div variants={itemVariants}>
      <button
        onClick={onClick}
        className="group relative overflow-hidden card-surface-interactive w-full text-left min-h-[130px] active:scale-[0.98] transition-all duration-200 touch-manipulation"
      >
        {/* Top accent line */}
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity duration-200', accentColor)} />

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5">
          {/* Icon */}
          <div className="flex items-start justify-between mb-2.5">
            <div className={cn('p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110', iconBg)}>
              <Icon className={cn('h-5 w-5', iconColor)} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="mt-0.5 text-[12px] text-white leading-tight line-clamp-1">{subtitle}</p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Bottom action */}
          <div className="mt-2 flex items-center justify-between">
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
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
          </div>
          <p className="text-sm text-white">Loading customer...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-base font-semibold text-white">Not Found</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="card-surface p-8 max-w-sm text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-7 w-7 text-red-400" />
            </div>
            <p className="text-lg font-semibold mb-2 text-white">Customer not found</p>
            <p className="text-sm text-white mb-5">This customer may have been deleted.</p>
            <Button onClick={() => navigate('/customers')} className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl h-11 w-full touch-manipulation">
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
      {/* Sticky Header — Business Hub pattern */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-2.5">
              <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Users className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-white truncate max-w-[180px]">{customer.name}</h1>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowEditDialog(true)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] touch-manipulation transition-all">
                <Edit className="h-4 w-4 text-white" />
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-red-500/10 active:scale-[0.98] touch-manipulation transition-all">
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5">

        {/* Hero Section — Premium profile card */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow/[0.08] via-amber-500/[0.04] to-transparent border border-elec-yellow/[0.12]">
            {/* Gradient glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-elec-yellow/[0.06] blur-3xl" />

            <div className="relative z-10 p-5">
              {/* Avatar + Name + Since */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center shadow-xl shadow-elec-yellow/25 shrink-0 ring-2 ring-elec-yellow/20 ring-offset-2 ring-offset-background">
                  <span className="text-2xl font-bold text-black">{getInitials(customer.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[22px] font-bold text-white leading-tight">{customer.name}</h2>
                  <p className="text-[13px] text-white mt-1 flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-elec-yellow" />
                    Customer since {memberSince}
                  </p>
                </div>
              </div>

              {/* Contact pills — inline, tappable */}
              <div className="flex flex-wrap gap-2 mb-5">
                {customer.email && (
                  <a href={`mailto:${customer.email}`} className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:border-blue-400/30 hover:bg-blue-500/[0.06] touch-manipulation active:scale-[0.97] transition-all">
                    <Mail className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-[13px] text-white truncate max-w-[160px]">{customer.email}</span>
                  </a>
                )}
                {customer.phone && (
                  <a href={`tel:${customer.phone}`} className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:border-emerald-400/30 hover:bg-emerald-500/[0.06] touch-manipulation active:scale-[0.97] transition-all">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[13px] text-white">{customer.phone}</span>
                  </a>
                )}
                {customer.address && (
                  <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[13px] text-white truncate max-w-[200px]">{customer.address}{customer.postcode ? `, ${customer.postcode}` : ''}</span>
                  </div>
                )}
              </div>

              {/* Integrated KPIs */}
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <p className="text-xl font-bold text-emerald-400">{customer.certificateCount || 0}</p>
                  <p className="text-[10px] font-medium text-white mt-0.5">Certs</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <p className="text-xl font-bold text-blue-400">{customer.propertyCount || 0}</p>
                  <p className="text-[10px] font-medium text-white mt-0.5">Properties</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <p className="text-xl font-bold text-elec-yellow">{customer.quoteCount || 0}</p>
                  <p className="text-[10px] font-medium text-white mt-0.5">Quotes</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-center">
                  <p className="text-xl font-bold text-amber-400">{customer.invoiceCount || 0}</p>
                  <p className="text-[10px] font-medium text-white mt-0.5">Invoices</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS — Business Hub grid layout */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard
              title="New Certificate"
              subtitle="EICR, EIC, minor works & more"
              icon={FileText}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10 border border-emerald-500/20"
              accentColor="from-emerald-500 via-emerald-400 to-teal-400"
              onClick={() => setShowStartCertificate(true)}
            />
            <ActionCard
              title="New Quote"
              subtitle="Create & send a quote"
              icon={Briefcase}
              iconColor="text-elec-yellow"
              iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
              accentColor="from-elec-yellow via-amber-400 to-orange-400"
              onClick={() => navigate('/electrician/quotes')}
            />
            <ActionCard
              title="Add Note"
              subtitle="Quick note or reminder"
              icon={StickyNote}
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10 border border-blue-500/20"
              accentColor="from-blue-500 via-blue-400 to-cyan-400"
              onClick={() => setShowQuickNote(true)}
            />
            <ActionCard
              title="Properties"
              subtitle={`${customer.propertyCount || 0} saved addresses`}
              icon={Home}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10 border border-amber-500/20"
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
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Customer?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently remove "{customer.name}" and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px] bg-white/[0.02] border-white/10 rounded-xl touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 min-h-[44px] rounded-xl touch-manipulation">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <QuickNoteDialog open={showQuickNote} onOpenChange={setShowQuickNote} customerId={customer.id} />
      {customer && <StartCertificateDialog open={showStartCertificate} onOpenChange={setShowStartCertificate} customer={customer} />}
    </div>
  );
}
