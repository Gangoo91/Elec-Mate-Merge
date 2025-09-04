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
    <div className="space-y-6 md:space-y-8 animate-fade-in p-4">
      <Helmet>
        <title>Quote Builder for Electricians | Create Professional Quotes</title>
        <meta
          name="description"
          content="Professional quote builder for UK electricians. Create, manage and track electrical quotes with BS 7671 compliant templates and pricing tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Quote Builder
        </h1>
        <Link to="/electrician/business" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Hub
          </Button>
        </Link>
      </header>

      <main className="space-y-6">
        {/* Stats Overview */}
        <section aria-labelledby="stats-overview">
          <h2 id="stats-overview" className="text-lg font-semibold mb-4">Quote Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-elec-gray border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* New Quote Section */}
        <QuoteWizard />

        {/* Recent Quotes */}
        <section aria-labelledby="recent-quotes">
          <h2 id="recent-quotes" className="text-lg font-semibold mb-4">Recent Quotes</h2>
          <Card className="bg-elec-gray border-elec-yellow/20">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No quotes created yet</p>
                <Button className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default QuoteBuilder;