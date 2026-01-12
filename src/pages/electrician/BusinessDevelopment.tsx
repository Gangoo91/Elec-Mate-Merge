import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  TrendingUp,
  Briefcase,
  GraduationCap,
  UserCheck,
  HandHelping,
  Calculator,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/business-hub";

const BusinessDevelopment = () => {
  const navigate = useNavigate();

  const businessSections = [
    {
      id: 1,
      title: "Starting a Business",
      description: "Essential guidance for establishing your electrical contracting business",
      icon: Briefcase,
      link: "/electrician/business-development/startup",
    },
    {
      id: 2,
      title: "Onboarding Apprentices",
      description: "Best practices for recruiting, mentoring and developing apprentices",
      icon: GraduationCap,
      link: "/electrician/business-development/apprentices",
    },
    {
      id: 3,
      title: "Onboarding Electricians",
      description: "Strategies for recruiting, integrating and retaining qualified electricians",
      icon: UserCheck,
      link: "/electrician/business-development/electricians",
    },
    {
      id: 4,
      title: "Growing Your Business",
      description: "Strategies for expanding, from marketing to diversifying services",
      icon: TrendingUp,
      link: "/electrician/business-development/growth",
    },
    {
      id: 5,
      title: "Customer Acquisition",
      description: "Effective methods to attract and retain clients for your services",
      icon: HandHelping,
      link: "/electrician/business-development/customers",
    },
    {
      id: 6,
      title: "Tax & Finances",
      description: "Financial management, tax obligations, and accounting best practices",
      icon: Calculator,
      link: "/electrician/business-development/tax-finances",
    },
    {
      id: 7,
      title: "Debt Recovery",
      description: "Strategies for managing late payments and protecting your cash flow",
      icon: CreditCard,
      link: "/electrician/business-development/debt-recovery",
    },
    {
      id: 8,
      title: "Business Calculators",
      description: "Professional calculators for job costing and business planning",
      icon: Calculator,
      link: "/electrician/business-development/tools",
    },
  ];

  const canonical = `${window.location.origin}/electrician/business-development`;

  return (
    <div className="min-h-screen bg-[#1a1a1a] pb-safe">
      <Helmet>
        <title>Business Development for Electricians | Elec-Mate</title>
        <meta
          name="description"
          content="Comprehensive business development resources for UK electricians. Learn to start, grow and manage your electrical contracting business."
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
              onClick={() => navigate("/electrician/business")}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl mr-3 h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl font-bold text-white">Start & Grow</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-gradient-to-b from-yellow-500/5 to-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-yellow-400/10 rounded-2xl border border-yellow-400/20">
              <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-400" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Business Development
              </h2>
              <p className="mt-2 text-base sm:text-lg text-white/60 max-w-2xl">
                Resources and guidance to establish and grow your electrical contracting business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-safe">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {businessSections.map((section) => (
            <BusinessCard
              key={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.link}
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

export default BusinessDevelopment;
