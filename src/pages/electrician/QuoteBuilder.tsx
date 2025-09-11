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
        <div className="relative px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-3 xs:py-4 sm:py-6 md:py-8 lg:py-10 space-y-3 xs:space-y-4 sm:space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1 xs:gap-2 text-xs xs:text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors truncate">
              Business Hub
            </Link>
            <span>/</span>
            <span className="truncate">Quote Builder</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-4">
            <div className="space-y-1 xs:space-y-2 flex-1 min-w-0">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight truncate">
                Quote Builder
              </h1>
              <p className="text-white text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed">
                Create professional electrical quotes with ease
              </p>
            </div>
            <Link to="/electrician/business" className="w-full xs:w-auto sm:w-auto flex-shrink-0">
              <Button variant="secondary" size="lg" className="w-full xs:w-auto sm:w-auto shadow-lg min-h-[44px] touch-manipulation">
                <ArrowLeft className="mr-1 xs:mr-2 h-3 w-3 xs:h-4 xs:w-4" /> 
                <span className="hidden xs:inline">Back to Business Hub</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 animate-fade-in">

        <main className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12">
          {/* Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
              <h2 id="stats-overview" className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold">Dashboard Overview</h2>
              <div className="flex items-center gap-1 xs:gap-2 text-xs xs:text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 xs:gap-3 sm:gap-4 md:gap-6">
              {statCards.map((stat, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-card to-card/50 cursor-pointer min-h-[100px] xs:min-h-[120px] sm:min-h-[140px] touch-manipulation"
                  onClick={() => handleCardClick(stat.type)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-2 xs:p-3 sm:p-4 md:p-6 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 xs:space-y-2 flex-1 min-w-0">
                        <p className="text-xs xs:text-sm font-medium text-muted-foreground truncate leading-tight">{stat.title}</p>
                        <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold leading-tight truncate">{stat.value}</p>
                      </div>
                      <div className={`p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl bg-gradient-to-br flex-shrink-0 ${index % 2 === 0 ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'}`}>
                        <stat.icon className={`h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                    <div className="mt-2 xs:mt-3">
                      <div className="w-full bg-muted rounded-full h-0.5 xs:h-1">
                        <div className="bg-primary h-0.5 xs:h-1 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/[^\d]/g, '')) || 0) * 20)}%` }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Quote Wizard Section */}
          <section className="space-y-3 xs:space-y-4 sm:space-y-6">
            <div className="text-center space-y-1 xs:space-y-2 sm:space-y-3">
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold">Create New Quote</h2>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                Follow our guided process to create professional electrical quotes
              </p>
            </div>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-1 xs:p-2 sm:p-4 md:p-6 lg:p-8 bg-card">
                <QuoteWizard onQuoteGenerated={handleQuoteGenerated} />
              </CardContent>
            </Card>
          </section>

          {/* Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="space-y-3 xs:space-y-4 sm:space-y-6">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3 sm:gap-4">
              <h2 id="recent-quotes" className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold">Recent Quotes</h2>
              <Link to="/electrician/quotes" className="w-full xs:w-auto">
                <Button variant="outline" size="sm" className="w-full xs:w-auto min-h-[44px] touch-manipulation">
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