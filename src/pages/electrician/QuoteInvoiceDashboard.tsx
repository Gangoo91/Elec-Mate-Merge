import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { List, FileText } from "lucide-react";
import { QuoteInvoiceDashboard as Dashboard } from "@/components/electrician/invoice-builder/QuoteInvoiceDashboard";
import { SmartBackButton } from "@/components/ui/smart-back-button";

const QuoteInvoiceDashboard = () => {
  const canonical = `${window.location.origin}/electrician/quote-invoice-dashboard`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <Helmet>
        <title>Quote & Invoice Dashboard | Professional Business Management</title>
        <meta
          name="description"
          content="Manage your quotes and invoices seamlessly. Track quote-to-invoice conversion and monitor your business finances."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Quote & Invoice Dashboard
              </h1>
              <p className="text-sm text-white/60">Manage quotes and track invoices</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Quick Action */}
        <div className="flex flex-wrap gap-3">
          <Link to="/electrician/invoices">
            <Button
              variant="outline"
              className="border-white/20 text-white/80 hover:text-white hover:bg-white/10 gap-2 h-10 px-4 touch-manipulation"
            >
              <List className="h-4 w-4" />
              All Invoices
            </Button>
          </Link>
        </div>

        {/* Dashboard Content */}
        <Dashboard />
      </main>
    </div>
  );
};

export default QuoteInvoiceDashboard;
