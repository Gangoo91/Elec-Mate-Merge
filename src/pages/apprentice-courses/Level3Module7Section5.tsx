import { ArrowLeft, FileText, Scale, Briefcase, Calculator, Star, PoundSterling, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Writing CVs and Preparing for Interviews",
    description: "Creating effective CVs and developing interview skills for electrical industry roles",
    icon: FileText,
    href: "../level3-module7-section5-1",
  },
  {
    number: "5.2",
    title: "Understanding Employment Law and Workers' Rights",
    description: "Knowledge of employment legislation and understanding workers' rights and protections",
    icon: Scale,
    href: "../level3-module7-section5-2",
  },
  {
    number: "5.3",
    title: "Setting up as a Self-employed Electrician (insurance, UTR, HMRC)",
    description: "Requirements and procedures for establishing a self-employed electrical business",
    icon: Briefcase,
    href: "../level3-module7-section5-3",
  },
  {
    number: "5.4",
    title: "Quoting, Tendering, and Estimating Jobs",
    description: "Skills for accurate job estimation, competitive quoting and tender preparation",
    icon: Calculator,
    href: "../level3-module7-section5-4",
  },
  {
    number: "5.5",
    title: "Customer Service and Building Reputation",
    description: "Developing excellent customer service skills and building professional reputation",
    icon: Star,
    href: "../level3-module7-section5-5",
  },
  {
    number: "5.6",
    title: "Financial Awareness (tax, bookkeeping, pricing strategies)",
    description: "Understanding business finances, tax obligations and effective pricing strategies",
    icon: PoundSterling,
    href: "../level3-module7-section5-6",
  },
];

const Level3Module7Section5 = () => {
  useSEO(
    "Section 5: Employment and Business Awareness - Level 3 Module 7",
    "Employment skills, self-employment options and business development"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
            {subsections.map((subsection, index) => (
              <ModuleCard
                key={index}
                number={subsection.number}
                title={subsection.title}
                description={subsection.description}
                icon={subsection.icon}
                href={subsection.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module7Section5;
