import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, FileText, ClipboardCheck } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useState, useEffect } from "react";
import { VoiceFormProvider } from "@/contexts/VoiceFormContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuoteBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshQuotes } = useQuoteStorage();
  const [costContext, setCostContext] = useState<any>(null);
  const [certificateContext, setCertificateContext] = useState<any>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(true);

  // Load cost data or certificate data from sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const costSessionId = params.get('costSessionId');
    const certificateSessionId = params.get('certificateSessionId');

    if (costSessionId) {
      const storedContext = sessionStorage.getItem(costSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setCostContext(parsed.costData);
        sessionStorage.removeItem(costSessionId);
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

  const handleQuoteGenerated = () => {
    refreshQuotes();
    navigate('/electrician/quotes');
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigate('/electrician/quotes');
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
        className="min-h-screen bg-background pb-8"
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
              className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-9 h-9 rounded-xl bg-elec-yellow flex items-center justify-center">
              <FileText className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white truncate">New Quote</h1>
              <p className="text-[11px] text-white/50">Create a professional quote</p>
            </div>
          </div>
        </header>

        {/* Cost Engineer Banner */}
        {costContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-emerald-400">Cost Data Imported</p>
              <p className="text-[13px] text-white/50">
                {costContext.materials?.length || 0} materials pre-filled
              </p>
            </div>
          </motion.div>
        )}

        {/* Certificate Data Banner */}
        {certificateContext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-blue-400">Certificate Data Imported</p>
              <p className="text-[13px] text-white/50">
                Client details pre-filled from certificate
              </p>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="px-4 py-4">
          {isLoadingContext ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
            </div>
          ) : (
            <QuoteWizard
              onQuoteGenerated={handleQuoteGenerated}
              initialCostData={costContext}
              initialCertificateData={certificateContext}
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
              <AlertDialogAction onClick={confirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl">
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
