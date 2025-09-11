import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, ArrowLeft, XCircle } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import FinancialSnapshot from "@/components/electrician/quote-builder/FinancialSnapshot";
import React, { useState } from "react";

const QuoteBuilder = () => {
  const navigate = useNavigate();
  const [showFinancialSnapshot, setShowFinancialSnapshot] = useState(false);
  
  const { 
    savedQuotes, 
    deleteQuote, 
    updateQuoteStatus,
    sendPaymentReminder,
    getQuoteStats, 
    loading, 
    refreshQuotes 
  } = useQuoteStorage();
  
  const stats = getQuoteStats();

  const handleQuoteGenerated = () => {
    refreshQuotes();
  };

  const handleCardClick = (cardType: string) => {
    if (cardType === 'monthly') {
      setShowFinancialSnapshot(true);
    } else {
      navigate(`/electrician/quotes?filter=${cardType}`);
    }
  };

  const statCards = [
    {
      title: "Pending Quotes",
      value: stats.pending.toString(),
      icon: Clock,
      color: "text-elec-yellow",
      type: "pending"
    },
    {
      title: "Sent Quotes",
      value: stats.sent.toString(), 
      icon: FileText,
      color: "text-blue-400",
      type: "sent"
    },
    {
      title: "Completed Quotes",
      value: stats.completed.toString(),
      icon: CheckCircle,
      color: "text-green-400",
      type: "completed"
    },
    {
      title: "Rejected Quotes",
      value: stats.rejected.toString(),
      icon: XCircle,
      color: "text-red-400",
      type: "rejected"
    },
    {
      title: "This Month",
      value: `£${stats.monthlyTotal.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-elec-yellow",
      type: "monthly"
    },
  ];

  const quickActions = [
    {
      title: "New Quote",
      description: "Create a new electrical quote",
      icon: Plus,
      action: "primary",
    },
    {
      title: "Quote Templates",
      description: "Use pre-built quote templates",
      icon: FileText,
      action: "secondary",
    },
  ];

  const canonical = `${window.location.origin}/electrician/quote-builder`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>Quote Builder for Electricians | Create Professional Quotes</title>
        <meta
          name="description"
          content="Professional quote builder for UK electricians. Create, manage and track electrical quotes with BS 7671 compliant templates and pricing tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Enhanced Header */}
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <span>Quote Builder</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Quote Builder
              </h1>
              <p className="text-white text-lg">
                Create professional electrical quotes with ease
              </p>
            </div>
            <Link to="/electrician/business" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-lg">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Hub
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mobile-container mobile-safe-area space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">

        <main className="mobile-section-spacing">
          {/* Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="mobile-card-spacing">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <h2 id="stats-overview" className="mobile-heading">Dashboard Overview</h2>
              <div className="flex items-center gap-2 mobile-small-text text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
            
            <div className="mobile-grid-responsive">
              {statCards.map((stat, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl mobile-interactive mobile-tap-highlight bg-gradient-to-br from-card to-card/50 cursor-pointer touch-target"
                  onClick={() => handleCardClick(stat.type)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-3 sm:p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                        <p className="mobile-small-text font-medium text-muted-foreground truncate">{stat.title}</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{stat.value}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/[^\d]/g, '')) || 0) * 20)}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br flex-shrink-0 ml-2 sm:ml-3 ${index % 2 === 0 ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'}`}>
                        <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Quote Wizard Section */}
          <section className="mobile-card-spacing">
            <div className="text-center space-y-2 sm:space-y-3">
              <h2 className="mobile-heading">Create New Quote</h2>
              <p className="mobile-text text-muted-foreground max-w-2xl mx-auto">
                Follow our guided process to create professional electrical quotes
              </p>
            </div>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-3 sm:p-6 lg:p-8 bg-card">
                <QuoteWizard onQuoteGenerated={handleQuoteGenerated} />
              </CardContent>
            </Card>
          </section>

          {/* Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="mobile-card-spacing">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <h2 id="recent-quotes" className="mobile-heading">Recent Quotes</h2>
              <Link to="/electrician/quotes">
                <Button variant="outline" size="sm" className="w-full sm:w-auto mobile-focus touch-target">
                  View All
                </Button>
              </Link>
            </div>
            <RecentQuotesList 
              quotes={savedQuotes}
              onDeleteQuote={deleteQuote}
              onUpdateQuoteStatus={updateQuoteStatus}
              onSendPaymentReminder={sendPaymentReminder}
            />
          </section>
        </main>
      </div>
      
      <FinancialSnapshot 
        isOpen={showFinancialSnapshot}
        onClose={() => setShowFinancialSnapshot(false)}
        quotes={savedQuotes}
      />
    </div>
  );
};

export default QuoteBuilder;