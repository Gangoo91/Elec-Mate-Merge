import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { storageGetJSONSync, storageRemoveSync } from '@/utils/storage';
import { ArrowLeft } from 'lucide-react';
import { QuoteWizard } from '@/components/electrician/quote-builder/QuoteWizard';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { useState, useEffect } from 'react';
import type { Quote } from '@/types/quote';
import { VoiceFormProvider } from '@/contexts/VoiceFormContext';
import { useHaptic } from '@/hooks/useHaptic';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
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

type CertificateContext = {
  client: { name: string; email?: string; phone?: string; address: string; postcode: string };
  jobDetails: { title: string; description: string; location: string };
  linkedCertificate?: {
    reportId: string;
    certificateType: string;
    certificateReference: string;
    pdfUrl?: string;
    pdfStoragePath?: string;
  };
};

type SiteVisitContext = {
  client: { name: string; email?: string; phone?: string; address: string; postcode: string };
  jobDetails: { title: string; description: string; location: string };
  materials?: Array<{
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    unit: string;
  }>;
  siteVisitId?: string;
};

type MaterialsContext = {
  source: 'materials_list' | 'procurement' | 'site_survey';
  sourceLabel: string;
  materials: Array<{
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    unit: string;
    notes?: string;
  }>;
  client?: { name: string; email?: string; phone?: string; address: string; postcode: string };
  jobDetails?: { title: string; description: string; location: string };
};

const QuoteBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const haptic = useHaptic();
  const { refreshQuotes } = useQuoteStorage();
  const [costContext, setCostContext] = useState<Record<string, unknown> | null>(null);
  const [certificateContext, setCertificateContext] = useState<CertificateContext | null>(null);
  const [siteVisitContext, setSiteVisitContext] = useState<SiteVisitContext | null>(null);
  const [materialsContext, setMaterialsContext] = useState<MaterialsContext | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(true);
  const [projectContext, setProjectContext] = useState<{
    client?: { name: string; email?: string; phone?: string; address: string; postcode: string };
    jobDetails?: { title: string; description: string; location: string };
  } | null>(null);

  // Read projectId from URL — when coming from a project page
  const projectId = new URLSearchParams(location.search).get('projectId') || undefined;

  // Duplicate source — passed via navigate state from QuoteBuilderEdit.
  // When present, the wizard starts pre-populated with the source quote's
  // content minus any identity/status fields (see ELE-776).
  const duplicateFrom = (location.state as { duplicateFrom?: Partial<Quote> } | null)
    ?.duplicateFrom;
  const duplicateSourceNumber = (location.state as { duplicateSourceNumber?: string } | null)
    ?.duplicateSourceNumber;

  // Load cost data, certificate data, or site visit data from sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const costSessionId = params.get('costSessionId');
    const certificateSessionId = params.get('certificateSessionId');
    const siteVisitSessionId = params.get('siteVisitSessionId');
    const materialsSessionId = params.get('materialsSessionId');

    if (costSessionId) {
      const parsed = storageGetJSONSync<any>(costSessionId, null);
      if (parsed) {
        setCostContext(parsed.costData);
        storageRemoveSync(costSessionId);
      }
    }

    if (certificateSessionId) {
      const parsed = storageGetJSONSync<any>(certificateSessionId, null);
      if (parsed) {
        setCertificateContext(parsed.certificateData);
        storageRemoveSync(certificateSessionId);
      }
    }

    if (siteVisitSessionId) {
      const parsed = storageGetJSONSync<any>(siteVisitSessionId, null);
      if (parsed) {
        setSiteVisitContext(parsed.siteVisitData);
        storageRemoveSync(siteVisitSessionId);
      }
    }

    if (materialsSessionId) {
      const parsed = storageGetJSONSync<any>(materialsSessionId, null);
      if (parsed) {
        setMaterialsContext(parsed.materialsData);
        storageRemoveSync(materialsSessionId);
      }
    }

    // If projectId is present and no other context was loaded, fetch project details
    if (
      projectId &&
      !costSessionId &&
      !certificateSessionId &&
      !siteVisitSessionId &&
      !materialsSessionId
    ) {
      (async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: project } = await (supabase as any)
            .from('spark_projects')
            .select(
              'title, description, location, customer_id, customers(name, email, phone, address)'
            )
            .eq('id', projectId)
            .single();

          if (project) {
            const customer = project.customers;
            setProjectContext({
              ...(customer && {
                client: {
                  name: customer.name || '',
                  email: customer.email || '',
                  phone: customer.phone || '',
                  address: customer.address || '',
                  postcode: '',
                },
              }),
              jobDetails: {
                title: project.title || '',
                description: project.description || '',
                location: project.location || '',
              },
            });
          }
        } catch (err) {
          // Project context fetch failed — continue without it
        } finally {
          setIsLoadingContext(false);
        }
      })();
      return; // defer setIsLoadingContext to the async block
    }

    // Mark context loading as complete
    setIsLoadingContext(false);
  }, [location]);

  const handleQuoteGenerated = () => {
    haptic.success();
    refreshQuotes();
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/quotes');
    }
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/quotes');
    }
  };

  // Voice navigation handler
  const handleVoiceNavigate = (section: string) => {
    const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
    switch (sectionLower) {
      case 'back':
      case 'quotes':
      case 'quote-builder':
        handleBack();
        break;
      case 'business':
        navigate('/electrician/business');
        break;
      default:
        navigate(`/electrician/${sectionLower}`);
    }
  };

  const canonical = `${window.location.origin}/electrician/quote-builder/create`;

  return (
    <VoiceFormProvider>
      <motion.div
        className="min-h-screen bg-background pb-8 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Helmet>
          <title>Create Quote | Elec-Mate</title>
          <meta
            name="description"
            content="Create professional electrical quotes with our guided quote builder."
          />
          <link rel="canonical" href={canonical} />
        </Helmet>

        {/* iOS-style Header */}
        <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-11 w-11 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white">New Quote</h1>
            </div>
          </div>
        </header>

        {/* Context banners — no icon circles, clean inline */}
        {costContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15"
          >
            <p className="text-[13px] font-semibold text-emerald-400">Cost Data Imported</p>
            <p className="text-[12px] text-white mt-0.5">{costContext.materials?.length || 0} materials pre-filled</p>
          </motion.div>
        )}
        {certificateContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/15"
          >
            <p className="text-[13px] font-semibold text-blue-400">Certificate Data Imported</p>
            <p className="text-[12px] text-white mt-0.5">Client details pre-filled from certificate</p>
          </motion.div>
        )}
        {siteVisitContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15"
          >
            <p className="text-[13px] font-semibold text-emerald-400">Imported from Site Visit</p>
            <p className="text-[12px] text-white mt-0.5">Client details and scope pre-filled</p>
          </motion.div>
        )}
        {projectContext?.client && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-purple-500/[0.06] border border-purple-500/15"
          >
            <p className="text-[13px] font-semibold text-purple-400">Imported from Project</p>
            <p className="text-[12px] text-white mt-0.5">Client &amp; job details pre-filled</p>
          </motion.div>
        )}
        {materialsContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/15"
          >
            <p className="text-[13px] font-semibold text-amber-400">Materials Imported from {materialsContext.sourceLabel}</p>
            <p className="text-[12px] text-white mt-0.5">{materialsContext.materials.length} {materialsContext.materials.length === 1 ? 'item' : 'items'} pre-filled</p>
          </motion.div>
        )}
        {duplicateFrom && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 px-4 py-3 rounded-xl bg-sky-500/[0.06] border border-sky-500/15"
          >
            <p className="text-[13px] font-semibold text-sky-400">
              Duplicated from {duplicateSourceNumber || 'existing quote'}
            </p>
            <p className="text-[12px] text-white mt-0.5">
              A new quote number will be generated on save.
            </p>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="px-0 sm:px-2 py-3">
          {isLoadingContext ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
            </div>
          ) : (
            <QuoteWizard
              onQuoteGenerated={handleQuoteGenerated}
              initialQuote={
                duplicateFrom
                  ? {
                      ...duplicateFrom,
                      ...(projectId && { project_id: projectId }),
                    }
                  : projectId
                    ? {
                        project_id: projectId,
                        ...(projectContext?.client && { client: projectContext.client }),
                        ...(projectContext?.jobDetails && {
                          jobDetails: projectContext.jobDetails,
                        }),
                      }
                    : undefined
              }
              initialCostData={costContext}
              initialCertificateData={certificateContext}
              initialSiteVisitData={siteVisitContext}
              initialMaterialsData={materialsContext}
            />
          )}
        </main>

        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard quote?</AlertDialogTitle>
              <AlertDialogDescription>
                Your progress will be lost. Are you sure you want to exit?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Keep Editing</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmExit}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
              >
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </VoiceFormProvider>
  );
};

export default QuoteBuilderCreate;
