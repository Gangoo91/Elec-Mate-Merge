import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Settings, FileText, Calendar, BarChart3, Users, CreditCard } from "lucide-react";

const BusinessAdmin = () => {
  const adminTools = [
    {
      id: 1,
      title: "Document Management",
      icon: FileText,
      description: "Manage contracts, invoices, and business documents",
      link: "#"
    },
    {
      id: 2,
      title: "Staff Management",
      icon: Users,
      description: "Employee records, payroll, and scheduling",
      link: "#"
    },
    {
      id: 3,
      title: "Financial Tracking",
      icon: CreditCard,
      description: "Expense tracking, profit/loss, and financial reports",
      link: "#"
    },
    {
      id: 4,
      title: "Business Analytics",
      icon: BarChart3,
      description: "Performance metrics and business insights",
      link: "#"
    },
    {
      id: 5,
      title: "Schedule Management",
      icon: Calendar,
      description: "Job scheduling and resource planning",
      link: "#"
    },
    {
      id: 6,
      title: "System Settings",
      icon: Settings,
      description: "Business settings and configuration",
      link: "#"
    }
  ];

  const canonical = `${window.location.origin}/electrician/business-admin`;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <Helmet>
        <title>Business Admin Tools for Electricians | Management Hub</title>
        <meta
          name="description"
          content="Essential business administration tools for UK electricians — manage staff, finances, documents, and operations from one central hub."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
          Business Admin
        </h1>
        <Link to="/electrician/business" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Business Hub
          </Button>
        </Link>
      </header>

      {/* Coming Soon Banner */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 max-w-4xl mx-auto">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">Coming Soon</h2>
            <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-muted-foreground text-sm">
            Advanced business administration tools are currently in development. 
            These comprehensive features will help you manage every aspect of your electrical business efficiently.
          </p>
        </CardContent>
      </Card>

      <main>
        <section aria-labelledby="admin-tools" className="space-y-4">
          <h2 id="admin-tools" className="text-lg sm:text-xl font-semibold text-center">
            Business Administration & Management
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto text-center">
            Preview of upcoming tools to run and manage your electrical business efficiently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mt-2">
            {adminTools.map((tool) => (
              <div key={tool.id} className="focus:outline-none hover-scale">
                <Card className="border-elec-yellow/20 bg-elec-gray/50 h-full opacity-60 transition-all duration-200 cursor-not-allowed">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-6 md:py-8">
                    <tool.icon className="h-10 w-10 sm:h-12 sm:w-12 mb-3 text-elec-yellow/60" />
                    <CardTitle className="text-base sm:text-lg leading-tight mb-2">{tool.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BusinessAdmin;