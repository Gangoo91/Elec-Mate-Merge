import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { QuoteInvoiceDashboard as Dashboard } from "@/components/electrician/invoice-builder/QuoteInvoiceDashboard";

const QuoteInvoiceDashboard = () => {
  const canonical = `${window.location.origin}/electrician/quote-invoice-dashboard`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>Quote & Invoice Dashboard | Professional Business Management</title>
        <meta
          name="description"
          content="Manage your quotes and invoices seamlessly. Track quote-to-invoice conversion and monitor your business finances."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 py-6 space-y-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <span>Quote & Invoice Dashboard</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Quote & Invoice Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage quotes ready for invoicing and track your invoices
              </p>
            </div>
            <Link to="/electrician/business">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Hub
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="px-4 md:px-6 py-6 md:py-8">
        <Dashboard />
      </div>
    </div>
  );
};

export default QuoteInvoiceDashboard;
