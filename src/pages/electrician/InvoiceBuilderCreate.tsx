import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { InvoiceWizard } from "@/components/electrician/invoice-builder/InvoiceWizard";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";

const InvoiceBuilderCreate = () => {
  const navigate = useNavigate();
  const { fetchInvoices } = useInvoiceStorage();

  const handleInvoiceGenerated = () => {
    fetchInvoices();
    navigate('/electrician/invoices');
  };

  const canonical = `${window.location.origin}/electrician/invoice-builder/create`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>Create New Invoice | Professional Invoice Builder</title>
        <meta
          name="description"
          content="Create professional invoices directly with our guided invoice builder. BS 7671 compliant templates and pricing tools for UK electricians."
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
              onClick={() => navigate('/electrician/invoices')} 
              className="hover:text-foreground transition-colors"
            >
              Invoices
            </button>
            <span>/</span>
            <span>Create Invoice</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Create New Invoice
              </h1>
              <p className="text-white text-lg">
                Follow our guided process to create professional invoices
              </p>
            </div>
            <Button 
              onClick={() => navigate('/electrician/invoices')}
              variant="secondary" 
              size="lg" 
              className="w-full sm:w-auto shadow-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
            </Button>
          </div>
        </div>
      </header>

      {/* Invoice Wizard Content */}
      <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <InvoiceWizard onInvoiceGenerated={handleInvoiceGenerated} />
      </div>
    </div>
  );
};

export default InvoiceBuilderCreate;
