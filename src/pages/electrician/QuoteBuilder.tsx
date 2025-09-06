import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import RecentQuotesList from "@/components/electrician/quote-builder/RecentQuotesList";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import React from "react";

const QuoteBuilder = () => {
  const { savedQuotes, deleteQuote, getQuoteStats, loading, refreshQuotes } = useQuoteStorage();
  const quoteStats = getQuoteStats();

  const stats = [
    {
      title: "Pending Quotes",
      value: quoteStats.pending.toString(),
      icon: Clock,
      color: "text-elec-yellow",
    },
    {
      title: "Sent Quotes",
      value: quoteStats.sent.toString(), 
      icon: FileText,
      color: "text-blue-400",
    },
    {
      title: "Approved Quotes",
      value: quoteStats.approved.toString(),
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "This Month",
      value: `£${quoteStats.monthlyTotal.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-elec-yellow",
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

      <div className="px-4 py-8 space-y-8 animate-fade-in">

        <main className="space-y-8">
          {/* Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 id="stats-overview" className="text-2xl font-bold">Dashboard Overview</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="relative p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${index % 2 === 0 ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Quote Wizard Section */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Create New Quote</h2>
              <p className="text-muted-foreground">
                Follow our guided process to create professional electrical quotes
              </p>
            </div>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-6 lg:p-8 bg-card">
                <QuoteWizard onQuoteGenerated={refreshQuotes} />
              </CardContent>
            </Card>
          </section>

          {/* Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 id="recent-quotes" className="text-2xl font-bold">Recent Quotes</h2>
              <Link to="/electrician/quotes">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <RecentQuotesList 
              quotes={savedQuotes}
              onDeleteQuote={deleteQuote}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default QuoteBuilder;