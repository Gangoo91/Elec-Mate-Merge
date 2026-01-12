import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CheckCircle, ArrowLeft, X } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
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

const QuoteBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshQuotes } = useQuoteStorage();
  const [costContext, setCostContext] = useState<any>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Load cost data from sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const costSessionId = params.get('costSessionId');

    if (costSessionId) {
      const storedContext = sessionStorage.getItem(costSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setCostContext(parsed.costData);
        sessionStorage.removeItem(costSessionId);
      }
    }
  }, [location]);

  const handleQuoteGenerated = () => {
    refreshQuotes();
    navigate('/electrician/quote-builder');
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    navigate('/electrician/quote-builder');
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
      <div className="min-h-screen bg-background pt-safe pb-safe animate-fade-in">
        <Helmet>
          <title>Create Quote | Elec-Mate</title>
          <meta
            name="description"
            content="Create professional electrical quotes with our guided quote builder."
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
            <h1 className="text-base font-semibold">New Quote</h1>

            {/* Spacer */}
            <div className="w-10" />
          </div>
        </header>

        {/* Cost Engineer Banner */}
        {costContext && (
          <div className="mx-4 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Cost Data Imported</p>
              <p className="text-xs text-muted-foreground">
                {costContext.materials?.length || 0} materials pre-filled
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="px-4 py-6 pb-32">
          <QuoteWizard
            onQuoteGenerated={handleQuoteGenerated}
            initialCostData={costContext}
          />
        </main>

        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard quote?</AlertDialogTitle>
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
          currentSection="quote-create"
        />
      </div>
    </VoiceFormProvider>
  );
};

export default QuoteBuilderCreate;
