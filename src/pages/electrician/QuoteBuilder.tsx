import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, FileText, Clock, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react";
import { QuoteWizard } from "@/components/electrician/quote-builder/QuoteWizard";
import React from "react";

const QuoteBuilder = () => {
  const stats = [
    {
      title: "Pending Quotes",
      value: "0",
      change: "+0%",
      icon: Clock,
      color: "text-amber-400",
      trend: "up",
    },
    {
      title: "Sent Quotes",
      value: "0", 
      change: "+0%",
      icon: FileText,
      color: "text-blue-400",
      trend: "up",
    },
    {
      title: "Approved Quotes",
      value: "0",
      change: "+0%",
      icon: CheckCircle,
      color: "text-emerald-400",
      trend: "up",
    },
    {
      title: "This Month",
      value: "£0",
      change: "+0%",
      icon: TrendingUp,
      color: "text-elec-yellow",
      trend: "up",
    },
  ];

  const canonical = `${window.location.origin}/electrician/quote-builder`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-grey via-elec-dark to-elec-grey">
      <Helmet>
        <title>Quote Builder for Electricians | Create Professional Quotes</title>
        <meta
          name="description"
          content="Professional quote builder for UK electricians. Create, manage and track electrical quotes with BS 7671 compliant templates and pricing tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mobile-container mobile-section-spacing animate-fade-in py-6">
        {/* Modern Header */}
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-elec-gray/80 via-elec-card/60 to-elec-gray/80 backdrop-blur-sm border border-elec-yellow/20 p-6 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/5 via-transparent to-elec-yellow/5" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="mobile-heading gradient-text mb-2">
                Quote Builder
              </h1>
              <p className="mobile-text text-muted-foreground">
                Create professional electrical quotes with BS 7671 compliance
              </p>
            </div>
            <Link to="/electrician/business" className="w-full sm:w-auto">
              <Button variant="outline" className="mobile-button-secondary border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" /> 
                Business Hub
              </Button>
            </Link>
          </div>
        </header>

        <main className="mobile-section-spacing">
          {/* Enhanced Stats Dashboard */}
          <section aria-labelledby="stats-overview" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 id="stats-overview" className="mobile-subheading">Quote Analytics</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-elec-yellow">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="mobile-grid-responsive">
              {stats.map((stat, index) => (
                <Card key={index} className="group mobile-card bg-gradient-to-br from-elec-gray/50 to-elec-card/50 border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <p className="mobile-small-text text-muted-foreground font-medium">{stat.title}</p>
                        <p className="mobile-subheading font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-gradient-to-br from-current/10 to-current/5 ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 text-xs font-medium ${
                        stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-red-400' : 'text-muted-foreground'
                      }`}>
                        <TrendingUp className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        {stat.change}
                      </div>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Enhanced Quote Wizard */}
          <QuoteWizard />

          {/* Enhanced Recent Quotes */}
          <section aria-labelledby="recent-quotes" className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 id="recent-quotes" className="mobile-subheading">Recent Quotes</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-elec-yellow">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-elec-yellow">
                  Export All
                </Button>
              </div>
            </div>
            <Card className="mobile-card bg-gradient-to-br from-elec-gray/50 to-elec-card/50 border-elec-yellow/20">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="mobile-subheading">No quotes created yet</h3>
                    <p className="mobile-text text-muted-foreground max-w-md mx-auto">
                      Start building your first professional electrical quote with our step-by-step wizard
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button className="mobile-button-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Quote
                    </Button>
                    <Button variant="outline" className="mobile-button-secondary border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10">
                      <FileText className="mr-2 h-4 w-4" />
                      Browse Templates
                    </Button>
                  </div>
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