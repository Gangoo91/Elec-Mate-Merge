import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Briefcase, Settings as Cog, Calculator, Package, Wrench } from "lucide-react";

const BusinessHub = () => {
  const cards = [
    {
      id: 1,
      title: "Start & Grow",
      description: "Business development guides",
      icon: Briefcase,
      link: "/electrician/business-development",
      gradient: "from-emerald-500/20 to-green-500/10"
    },
    {
      id: 2,
      title: "Business Calculators",
      description: "Financial planning tools",
      icon: Calculator,
      link: "/electrician/business-development/tools",
      gradient: "from-blue-500/20 to-cyan-500/10"
    },
    {
      id: 3,
      title: "Materials",
      description: "Stock & inventory",
      icon: Package,
      link: "/electrician/materials",
      gradient: "from-purple-500/20 to-indigo-500/10"
    },
    {
      id: 4,
      title: "Tools",
      description: "Equipment management",
      icon: Wrench,
      link: "/electrician/tools",
      gradient: "from-orange-500/20 to-amber-500/10"
    },
    {
      id: 5,
      title: "Business Admin",
      description: "Coming soon",
      icon: Cog,
      link: "/electrician/business-admin",
      comingSoon: true,
      gradient: "from-gray-500/20 to-slate-500/10"
    },
  ];

  const canonical = `${window.location.origin}/electrician/business`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <Helmet>
        <title>Business Hub for Electricians | Start & Run</title>
        <meta
          name="description"
          content="All business tools for UK electricians in one place — start, run and grow your electrical business. Access development guides, calculators, materials, tools and admin features."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Business Hub
              </h1>
              <p className="text-sm text-white/60">Start, run and grow your business</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Section Title */}
        <div className="text-center space-y-2">
          <p className="text-white/60 max-w-2xl mx-auto">
            Practical, BS 7671-aware guidance for the UK market. Choose where you want to focus today.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {cards.map((c) => (
            <Link
              to={c.link}
              key={c.id}
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
            >
              <Card className={`relative overflow-hidden border-white/10 bg-white/5 hover:bg-white/10 hover:border-elec-yellow/40 active:scale-[0.97] h-full transition-all duration-200 ${c.comingSoon ? 'opacity-60' : ''}`}>
                {c.comingSoon && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-lg z-10">
                    Soon
                  </div>
                )}
                <CardHeader className="flex flex-col items-center justify-center text-center p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                    <c.icon className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
                  </div>
                  <div className="space-y-0.5">
                    <CardTitle className="text-sm sm:text-base font-semibold text-white leading-tight">
                      {c.title}
                    </CardTitle>
                    <p className="text-[11px] sm:text-xs text-white/50 hidden sm:block">
                      {c.description}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessHub;
