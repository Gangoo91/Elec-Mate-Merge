/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { Helmet } from 'react-helmet';
import { X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { InvoiceWizard } from '@/components/electrician/invoice-builder/InvoiceWizard';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useState, useEffect } from 'react';
import { VoiceFormProvider } from '@/contexts/VoiceFormContext';
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

const InvoiceBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchInvoices } = useInvoiceStorage();
  const [quoteContext, setQuoteContext] = useState<any>(null);
  const [certificateContext, setCertificateContext] = useState<any>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(true);

  // Read projectId and timeSessionId from URL
  const projectId = new URLSearchParams(location.search).get('projectId') || undefined;
  const timeSessionId = new URLSearchParams(location.search).get('timeSessionId') || undefined;

  // Load quote data or certificate data from sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quoteSessionId = params.get('quoteSessionId');
    const certificateSessionId = params.get('certificateSessionId');

    if (quoteSessionId) {
      const storedContext = sessionStorage.getItem(quoteSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setQuoteContext(parsed.quoteData);
        sessionStorage.removeItem(quoteSessionId);
      }
    }

    if (certificateSessionId) {
      const storedContext = sessionStorage.getItem(certificateSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setCertificateContext(parsed.certificateData);
        sessionStorage.removeItem(certificateSessionId);
      }
    }

    // Mark context loading as complete
    setIsLoadingContext(false);
  }, [location]);

  const handleInvoiceGenerated = async (invoiceId: string) => {
    fetchInvoices();
    toast({ title: 'Invoice created', description: 'Your invoice has been saved.' });
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'invoice_created', {});
    });
    // If launched from Time Tracker, mark the session as invoiced
    if (timeSessionId && invoiceId) {
      await supabase
        .from('time_sessions')
        .update({ invoice_id: invoiceId })
        .eq('id', timeSessionId);
    }
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/invoices');
    }
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/invoices');
    }
  };

  // Voice navigation handler
  const handleVoiceNavigate = (section: string) => {
    const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
    switch (sectionLower) {
      case 'back':
      case 'invoices':
      case 'invoice-builder':
        handleBack();
        break;
      case 'business':
        navigate('/electrician/business');
        break;
      default:
        navigate(`/electrician/${sectionLower}`);
    }
  };

  const canonical = `${window.location.origin}/electrician/invoice-builder/create`;

  return (
    <VoiceFormProvider>
      <div className="min-h-screen bg-background animate-fade-in">
        <Helmet>
          <title>Create Invoice | Elec-Mate</title>
          <meta name="description" content="Create professional invoices with our guided invoice builder." />
          <link rel="canonical" href={canonical} />
        </Helmet>

        {/* Header — matching QuoteBuilderCreate */}
        <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={handleBack}
              className="h-11 w-11 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white">New Invoice</h1>
            </div>
          </div>
        </header>

        {/* Context banners */}
        {quoteContext && (
          <div className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-emerald-400">Quote data imported</p>
              <p className="text-[11px] text-white mt-0.5">Client and items pre-filled</p>
            </div>
          </div>
        )}

        {certificateContext && (
          <div className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-blue-400">Certificate data imported</p>
              <p className="text-[11px] text-white mt-0.5">Client details pre-filled</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="px-0 sm:px-2 py-3">
          {isLoadingContext ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : (
            <InvoiceWizard
              onInvoiceGenerated={handleInvoiceGenerated}
              sourceQuote={quoteContext}
              initialCertificateData={certificateContext}
              existingInvoice={projectId ? { project_id: projectId } : undefined}
            />
          )}
        </main>

        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard invoice?</AlertDialogTitle>
              <AlertDialogDescription>
                Your progress will be lost. Are you sure you want to exit?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Editing</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmExit}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </VoiceFormProvider>
  );
};

export default InvoiceBuilderCreate;
