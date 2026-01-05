
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Brain, GraduationCap, Briefcase, ArrowLeft, Calculator, Zap, Shield, PoundSterling, Sparkles, FileText, ArrowRight, ChevronRight } from "lucide-react";

const ElectricalHub = () => {
  // Main 4-card grid - Core daily tools
  const mainResources = [
    {
      id: 1,
      title: "Inspection & Testing",
      description: "EICR, EIC & Minor Works",
      icon: Zap,
      link: "/electrician/inspection-testing",
      gradient: "from-amber-500/20 to-orange-500/10"
    },
    {
      id: 2,
      title: "AI Tooling",
      description: "Smart analysis tools",
      icon: Brain,
      link: "/electrician-tools/ai-tooling",
      gradient: "from-purple-500/20 to-indigo-500/10"
    },
    {
      id: 3,
      title: "Site Safety & RAMS",
      description: "Risk assessments",
      icon: Shield,
      link: "/electrician/site-safety",
      gradient: "from-emerald-500/20 to-green-500/10"
    },
    {
      id: 4,
      title: "Electrical Calculations",
      description: "Cable sizing & more",
      icon: Calculator,
      link: "/electrician/calculations",
      gradient: "from-blue-500/20 to-cyan-500/10"
    }
  ];

  // Additional tools - business, development, and reference resources
  const additionalResources = [
    {
      id: 5,
      title: "Quote Builder",
      icon: FileText,
      link: "/electrician/quote-builder"
    },
    {
      id: 6,
      title: "Invoices",
      icon: PoundSterling,
      link: "/electrician/invoices"
    },
    {
      id: 7,
      title: "Business Hub",
      icon: Briefcase,
      link: "/electrician/business"
    },
    {
      id: 8,
      title: "Live Pricing",
      icon: PoundSterling,
      link: "/electrician/live-pricing"
    },
    {
      id: 9,
      title: "Industry Updates",
      icon: Wrench,
      link: "/electrician/safety-shares/news"
    },
    {
      id: 10,
      title: "Career Progression",
      icon: GraduationCap,
      link: "/electrician/career-progression"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Electrical Hub
              </h1>
              <p className="text-sm text-white/60">Professional tools & resources</p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </header>
        {/* Featured AI Design Consultation - Premium Card */}
        <section>
          <Link
            to="/electrician/agent-selector"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
          >
            <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-gray/90 to-elec-gray/70 group active:scale-[0.99] transition-transform duration-150">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-elec-yellow/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-elec-yellow/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Icon */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 group-hover:from-elec-yellow/30 group-hover:to-elec-yellow/10 transition-colors">
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-elec-yellow/20 text-elec-yellow rounded-full">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      AI Design Consultation
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                      8 specialist agents for circuit design, costing, installation methods, safety documentation, testing & project management
                    </p>
                  </div>

                  {/* CTA - Always visible on mobile */}
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-sm font-semibold text-elec-yellow sm:hidden">Choose Agent</span>
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/30 transition-colors">
                      <ArrowRight className="h-5 w-5 text-elec-yellow group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Core Daily Tools */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Core Daily Tools</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mainResources.map((resource) => (
              <Link
                to={resource.link}
                key={resource.id}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
              >
                <Card className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${resource.gradient} backdrop-blur-sm hover:border-elec-yellow/30 active:scale-[0.97] transition-all duration-200 h-full`}>
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

                  <CardHeader className="relative flex flex-col items-center justify-center text-center p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                      <resource.icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <div className="space-y-0.5">
                      <CardTitle className="text-sm sm:text-base font-semibold text-white leading-tight">
                        {resource.title}
                      </CardTitle>
                      <p className="text-[11px] sm:text-xs text-white/50 hidden sm:block">
                        {resource.description}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Business & Development Resources */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Business & Development</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {additionalResources.map((resource) => (
              <Link
                to={resource.link}
                key={resource.id}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
              >
                <Card className="relative overflow-hidden border-white/10 bg-elec-gray/50 backdrop-blur-sm hover:bg-elec-gray/70 hover:border-white/20 active:scale-[0.97] transition-all duration-200 h-full group">
                  <CardHeader className="flex flex-col items-center justify-center text-center p-3 sm:p-4 space-y-2">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-elec-yellow/10 group-hover:border-elec-yellow/20 transition-colors">
                      <resource.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white/70 group-hover:text-elec-yellow transition-colors" />
                    </div>
                    <CardTitle className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white leading-tight transition-colors">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>

                  {/* Mobile tap indicator */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-active:opacity-100 sm:hidden transition-opacity">
                    <ChevronRight className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ElectricalHub;
