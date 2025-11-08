import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { transformCostOutputToQuoteItems } from "@/utils/cost-to-quote-transformer";

const QuoteBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshQuotes } = useQuoteStorage();
  const [costContext, setCostContext] = useState<any>(null);

  // PHASE 1: Load cost data from sessionStorage
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

  const canonical = `${window.location.origin}/electrician/quote-builder/create`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>Create New Quote | Professional Electrical Quote Builder</title>
        <meta
          name="description"
          content="Create professional electrical quotes with our guided quote builder. BS 7671 compliant templates and pricing tools for UK electricians."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <button 
              onClick={() => navigate('/electrician/business')} 
              className="hover:text-foreground transition-colors"
            >
              Business Hub
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate('/electrician/quote-builder')} 
              className="hover:text-foreground transition-colors"
            >
              Quote Builder
            </button>
            <span>/</span>
            <span>Create Quote</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Create New Quote
              </h1>
              <p className="text-white text-lg">
                Follow our guided process to create professional electrical quotes
              </p>
            </div>
            <Button 
              onClick={() => navigate('/electrician/quote-builder')}
              variant="secondary" 
              size="lg" 
              className="w-full sm:w-auto shadow-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quote Builder
            </Button>
          </div>
        </div>
      </header>

      {/* Quote Wizard Content */}
      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-4">
        {/* PHASE 1: Show cost context indicator */}
        {costContext && (
          <Alert className="bg-emerald-500/10 border-emerald-500/30">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <AlertTitle>Cost Engineer Data Loaded</AlertTitle>
            <AlertDescription>
              {costContext.materials?.length || 0} materials and labour estimate pre-filled from AI Cost Engineer
            </AlertDescription>
          </Alert>
        )}
        
        <QuoteWizard 
          onQuoteGenerated={handleQuoteGenerated}
          initialCostData={costContext}
        />
      </div>
    </div>
  );
};

export default QuoteBuilderCreate;