import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";

const QuotesPage = () => {
  const { savedQuotes, deleteQuote, loading } = useQuoteStorage();

  const canonical = `${window.location.origin}/electrician/quotes`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>All Quotes | Professional Quote Management for Electricians</title>
        <meta
          name="description"
          content="View, manage and track all your electrical quotes. Professional quote management for UK electricians with BS 7671 compliant templates."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <Link to="/electrician/quote-builder" className="hover:text-foreground transition-colors">
              Quote Builder
            </Link>
            <span>/</span>
            <span>All Quotes</span>
          </nav>

          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Quotes
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and track all your electrical quotes
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link to="/electrician/quote-builder" className="flex-1 sm:flex-initial">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quote Builder
                </Button>
              </Link>
              <Link to="/electrician/quote-builder" className="flex-1 sm:flex-initial">
                <Button size="lg" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> New Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-8 space-y-8 animate-fade-in">
        <main className="space-y-8">
          {/* Quote Statistics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">{savedQuotes.length}</div>
              <div className="text-muted-foreground">Total Quotes</div>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-400">
                {savedQuotes.filter(q => q.status === 'approved').length}
              </div>
              <div className="text-muted-foreground">Approved</div>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {savedQuotes.filter(q => q.status === 'sent').length}
              </div>
              <div className="text-muted-foreground">Sent</div>
            </div>
          </section>

          {/* All Quotes List */}
          <section aria-labelledby="all-quotes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 id="all-quotes" className="text-2xl font-bold">Your Quotes</h2>
              <div className="text-sm text-muted-foreground">
                {savedQuotes.length} quote{savedQuotes.length !== 1 ? 's' : ''} total
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-2 text-muted-foreground">Loading quotes...</p>
              </div>
            ) : (
              <RecentQuotesList 
                quotes={savedQuotes}
                onDeleteQuote={deleteQuote}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default QuotesPage;