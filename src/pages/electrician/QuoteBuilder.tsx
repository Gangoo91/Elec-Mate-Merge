import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, ArrowLeft, XCircle } from "lucide-react";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import FinancialSnapshot from "@/components/electrician/quote-builder/FinancialSnapshot";
import { EmptyStateGuide } from "@/components/electrician/shared/EmptyStateGuide";
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
      title: "Approved Quotes",
      value: stats.approved.toString(),
      icon: CheckCircle,
      color: "text-green-400",
      type: "approved"
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
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-background to-elec-card">
      <Helmet>
        <title>Quote Builder for Electricians | Create Professional Quotes</title>
        <meta
          name="description"
          content="Professional quote builder for UK electricians. Create, manage and track electrical quotes with BS 7671 compliant templates and pricing tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Floating Mobile Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-elec-card/90 backdrop-blur-sm border border-elec-yellow/20 shadow-lg h-10 w-10"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/electrician/business');
          }
        }}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Enhanced Header */}
      <header className="relative bg-elec-card/90 backdrop-blur-sm border-b border-primary/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative px-4 py-4 md:py-8 space-y-3 md:space-y-6">
          {/* Breadcrumb Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <span>Quote Builder</span>
          </nav>

          {/* Title and Back Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Quote Builder
              </h1>
              <p className="text-white/80 md:text-white text-sm md:text-lg">
                Create professional electrical quotes with ease
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg" 
              className="hidden md:flex shadow-lg"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/electrician/business');
                }
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Hub
            </Button>
          </div>
        </div>
      </header>

      <div className="p-0 md:px-6 md:py-8 space-y-4 md:space-y-8 animate-fade-in">
        <div className="max-w-[1400px] mx-auto px-3 md:px-4">
          {/* Prominent Create Quote Section */}
          <section className="text-center space-y-2 md:space-y-4">
          <Button 
            onClick={() => navigate('/electrician/quote-builder/create')}
            size="lg"
            className="mobile-button-primary w-full md:w-auto px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold bg-gradient-to-r from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow/80 text-elec-dark shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
          >
            <Plus className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:rotate-90 transition-transform duration-300" />
            Create New Quote
          </Button>
          <p className="text-sm md:text-lg text-muted-foreground">
            Professional electrical quotes in minutes
          </p>
        </section>

        <main className="space-y-4 md:space-y-8">
          {/* Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="space-y-3 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-3">
              <h2 id="stats-overview" className="text-lg md:text-2xl font-bold">Dashboard Overview</h2>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6">
              {statCards.map((stat, index) => (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-elec-card/80 to-elec-dark/50 cursor-pointer backdrop-blur-sm"
                  onClick={() => handleCardClick(stat.type)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-3 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                        <p className="text-[10px] md:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                        <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (parseInt(stat.value.replace(/[^\d]/g, '')) || 0) * 20)}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-1.5 md:p-3 rounded-xl bg-gradient-to-br flex-shrink-0 ml-2 md:ml-3 ${index % 2 === 0 ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'}`}>
                        <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>


          {/* Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="space-y-3 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-3">
              <h2 id="recent-quotes" className="text-lg md:text-2xl font-bold">Recent Quotes</h2>
              <Link to="/electrician/quotes">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  View All
                </Button>
              </Link>
            </div>
            {savedQuotes.length === 0 && !loading ? (
              <div className="mt-8">
                <EmptyStateGuide 
                  type="quote" 
                  onCreateClick={() => navigate('/electrician/quote-builder/create')} 
                />
              </div>
            ) : (
              <RecentQuotesList 
                quotes={savedQuotes}
                onDeleteQuote={deleteQuote}
                onUpdateQuoteStatus={updateQuoteStatus}
                onSendPaymentReminder={sendPaymentReminder}
              />
            )}
          </section>
        </main>
        </div>
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