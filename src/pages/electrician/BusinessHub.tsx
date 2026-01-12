import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Briefcase, Calculator, Package, Wrench, Settings as Cog, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/business-hub";

const BusinessHub = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Start & Grow",
      description: "Business development guides and strategies",
      icon: TrendingUp,
      link: "/electrician/business-development",
      accentColor: "emerald" as const,
    },
    {
      id: 2,
      title: "Business Calculators",
      description: "Financial planning and costing tools",
      icon: Calculator,
      link: "/electrician/business-development/tools",
      accentColor: "blue" as const,
    },
    {
      id: 3,
      title: "Materials",
      description: "Stock and inventory management",
      icon: Package,
      link: "/electrician/materials",
      accentColor: "purple" as const,
    },
    {
      id: 4,
      title: "Tools",
      description: "Equipment tracking and management",
      icon: Wrench,
      link: "/electrician/tools",
      accentColor: "orange" as const,
    },
    {
      id: 5,
      title: "Business Admin",
      description: "Documents, staff and analytics",
      icon: Cog,
      link: "/electrician/business-admin",
      accentColor: "gray" as const,
      comingSoon: true,
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-safe">
      <Helmet>
        <title>Business Hub for Electricians | Start & Run</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — start, run and grow your electrical business. Access development guides, calculators, materials, tools and admin features."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 pt-safe">
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
      <section className="border-b border-white/10 bg-gradient-to-b from-emerald-500/10 to-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
              <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-base sm:text-lg text-white/70 max-w-2xl">
                Start, run and grow your electrical business with practical, BS 7671-aware guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-safe">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {cards.map((card) => (
            <BusinessCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              href={card.link}
              accentColor={card.accentColor}
              comingSoon={card.comingSoon}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
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
