import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  Briefcase,
  Calculator,
  FileText,
  Package,
  PoundSterling,
  Settings as Cog,
  TrendingUp,
  Users,
  Wrench,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/business-hub";

const BusinessHub = () => {
  const navigate = useNavigate();

  // Primary business tools — daily use
  const dailyTools = [
    {
      id: 1,
      title: "Quotes",
      description: "Create & manage quotes",
      icon: FileText,
      link: "/electrician/quotes",
    },
    {
      id: 2,
      title: "Invoices",
      description: "Billing & payments",
      icon: PoundSterling,
      link: "/electrician/invoices",
    },
    {
      id: 3,
      title: "Customers",
      description: "Client management",
      icon: Users,
      link: "/customers",
    },
    {
      id: 4,
      title: "Expenses",
      description: "Receipts & mileage",
      icon: Receipt,
      link: "/electrician/expenses",
    },
    {
      id: 5,
      title: "Live Pricing",
      description: "Market rates & pricing",
      icon: PoundSterling,
      link: "/electrician/live-pricing",
    },
  ];

  // Business growth & management tools
  const growthTools = [
    {
      id: 6,
      title: "Start & Grow",
      description: "Business development guides and strategies",
      icon: TrendingUp,
      link: "/electrician/business-development",
    },
    {
      id: 7,
      title: "Business Calculators",
      description: "Financial planning and costing tools",
      icon: Calculator,
      link: "/electrician/business-development/tools",
    },
    {
      id: 8,
      title: "Materials",
      description: "Stock and inventory management",
      icon: Package,
      link: "/electrician/materials",
    },
    {
      id: 9,
      title: "Tools",
      description: "Equipment tracking and management",
      icon: Wrench,
      link: "/electrician/tools",
    },
    {
      id: 10,
      title: "Business Admin",
      description: "Documents, staff and analytics",
      icon: Cog,
      link: "/electrician/business-admin",
      comingSoon: true,
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="bg-[#1a1a1a] animate-fade-in">
      <Helmet>
        <title>Business Hub for Electricians | Quotes, Invoices & More</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — quotes, invoices, customers, expenses, live pricing and growth tools."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/electrician")}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl mr-3 h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white">Business Hub</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-gradient-to-b from-elec-yellow/10 to-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="p-4 bg-elec-yellow/15 rounded-2xl border border-elec-yellow/20">
              <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                Quotes, invoices, customers, expenses and everything you need to run your electrical business
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Daily Business Tools */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Daily Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
              />
            ))}
          </div>
        </section>

        {/* Growth & Management */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Grow Your Business</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {growthTools.map((card) => (
              <BusinessCard
                key={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.link}
                comingSoon={card.comingSoon}
              />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/50 leading-relaxed">
            The information provided is for general guidance only and does not constitute financial, legal, or business advice.
            Always consult with qualified professionals regarding your specific business circumstances.
          </p>
        </div>
      </main>
    </div>
  );
};

export default BusinessHub;
