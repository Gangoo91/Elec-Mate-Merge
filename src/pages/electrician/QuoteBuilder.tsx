import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import React from "react";

const QuoteBuilder = () => {
  const { isMobile, isTablet } = useMobileEnhanced();
  
  const stats = [
    {
      title: "Pending Quotes",
      value: "0",
      icon: Clock,
      color: "text-elec-yellow",
    },
    {
      title: "Sent Quotes",
      value: "0", 
      icon: FileText,
      color: "text-blue-400",
    },
    {
      title: "Approved Quotes",
      value: "0",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "This Month",
      value: "£0",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Mobile-Enhanced Header with Gradient Background */}
      <header className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="relative mobile-padding mobile-safe-area space-y-4 sm:space-y-6">
          {/* Breadcrumb Navigation - Hidden on mobile to save space */}
          {!isMobile && (
            <nav className="flex items-center gap-2 mobile-small-text opacity-90">
              <Link to="/electrician/business" className="hover:text-accent-foreground transition-colors">
                Business Hub
              </Link>
              <span>/</span>
              <span>Quote Builder</span>
            </nav>
          )}

          {/* Mobile-Optimized Title and Back Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="space-y-2">
              <h1 className={`font-bold tracking-tight ${isMobile ? 'mobile-heading text-2xl' : 'text-3xl sm:text-4xl'}`}>
                Quote Builder
              </h1>
              <p className={`text-primary-foreground/80 ${isMobile ? 'mobile-text' : 'text-lg'}`}>
                Create professional electrical quotes with ease
              </p>
            </div>
            <Link to="/electrician/business" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size={isMobile ? "default" : "lg"}
                className="w-full sm:w-auto shadow-lg touch-target"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> 
                {isMobile ? 'Back' : 'Back to Business Hub'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mobile-container mobile-padding mobile-section-spacing animate-fade-in">

        <main className="mobile-section-spacing">
          {/* Mobile-Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="stats-overview" className={`font-bold ${isMobile ? 'mobile-subheading' : 'text-2xl'}`}>
                Dashboard Overview
              </h2>
              <div className="flex items-center gap-2 mobile-small-text text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live data
              </div>
            </div>
            
            <div className={`mobile-grid-responsive gap-3 sm:gap-4 lg:gap-6`}>
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className={`mobile-card mobile-interactive group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/50`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="mobile-card-spacing relative">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1 min-w-0">
                        <p className={`font-medium text-muted-foreground truncate ${isMobile ? 'mobile-small-text' : 'text-sm'}`}>
                          {stat.title}
                        </p>
                        <p className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                          {stat.value}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-1">
                            <div className="bg-primary h-1 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br flex-shrink-0 ${index % 2 === 0 ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'}`}>
                        <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Mobile-Enhanced Quote Wizard Section */}
          <section className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2">
              <h2 className={`font-bold ${isMobile ? 'mobile-subheading' : 'text-2xl'}`}>
                Create New Quote
              </h2>
              <p className={`text-muted-foreground ${isMobile ? 'mobile-text' : ''}`}>
                Follow our guided process to create professional electrical quotes
              </p>
            </div>
            <Card className="mobile-card border-0 shadow-2xl bg-gradient-to-br from-card to-card/80">
              <CardContent className={`bg-card ${isMobile ? 'mobile-card-spacing' : 'p-6 lg:p-8'}`}>
                <QuoteWizard />
              </CardContent>
            </Card>
          </section>

          {/* Mobile-Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 id="recent-quotes" className={`font-bold ${isMobile ? 'mobile-subheading' : 'text-2xl'}`}>
                Recent Quotes
              </h2>
              <Button 
                variant="outline" 
                size={isMobile ? "default" : "sm"}
                className={isMobile ? "touch-target w-full sm:w-auto" : ""}
              >
                View All
              </Button>
            </div>
            <Card className="mobile-card border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardContent className={isMobile ? 'mobile-card-spacing' : 'p-8'}>
                <div className={`text-center space-y-4 sm:space-y-6 ${isMobile ? 'py-8' : 'py-12'}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl"></div>
                    <FileText className={`relative text-muted-foreground mx-auto ${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-semibold ${isMobile ? 'mobile-subheading' : 'text-xl'}`}>
                      No quotes created yet
                    </h3>
                    <p className={`text-muted-foreground max-w-md mx-auto ${isMobile ? 'mobile-text' : ''}`}>
                      Start building professional quotes for your electrical projects. Our wizard makes it quick and easy.
                    </p>
                  </div>
                  <Button 
                    size={isMobile ? "default" : "lg"}
                    className={`bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg ${isMobile ? 'touch-target w-full sm:w-auto' : ''}`}
                  >
                    <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Create Your First Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default QuoteBuilder;