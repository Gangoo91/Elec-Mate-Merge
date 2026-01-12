import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckCircle, X } from "lucide-react";
import { InvoiceWizard } from "@/components/electrician/invoice-builder/InvoiceWizard";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { useState, useEffect } from "react";
import { VoiceFormProvider } from "@/contexts/VoiceFormContext";
import { ElectricianVoiceAssistant } from "@/components/electrician/ElectricianVoiceAssistant";
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

const InvoiceBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchInvoices } = useInvoiceStorage();
  const [quoteContext, setQuoteContext] = useState<any>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Load quote data from sessionStorage if creating from quote
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quoteSessionId = params.get('quoteSessionId');

    if (quoteSessionId) {
      const storedContext = sessionStorage.getItem(quoteSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setQuoteContext(parsed.quoteData);
        sessionStorage.removeItem(quoteSessionId);
      }
    }
  }, [location]);

  const handleInvoiceGenerated = () => {
    fetchInvoices();
    navigate('/electrician/invoices');
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigate('/electrician/invoices');
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
      <div className="min-h-screen bg-background pt-safe pb-safe">
        <Helmet>
          <title>Create Invoice | Elec-Mate</title>
          <meta
            name="description"
            content="Create professional invoices with our guided invoice builder."
          />
          <link rel="canonical" href={canonical} />
        </Helmet>

        {/* Minimal Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between h-14 px-4">
            {/* Close Button */}
            <button
              onClick={handleBack}
              className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-elec-gray/50 active:scale-95 transition-all -ml-1"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title */}
            <h1 className="text-base font-semibold">New Invoice</h1>

            {/* Spacer */}
            <div className="w-10" />
          </div>
        </header>

        {/* Quote Import Banner */}
        {quoteContext && (
          <div className="mx-4 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Quote Data Imported</p>
              <p className="text-xs text-muted-foreground">
                Client and items pre-filled from quote
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="px-4 py-6 pb-32">
          <InvoiceWizard
            onInvoiceGenerated={handleInvoiceGenerated}
            sourceQuote={quoteContext}
          />
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
              <AlertDialogAction onClick={confirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Voice Assistant */}
        <ElectricianVoiceAssistant
          onNavigate={handleVoiceNavigate}
          currentSection="invoice-create"
        />
      </div>
    </VoiceFormProvider>
  );
};

export default InvoiceBuilderCreate;
