import { ArrowLeft, FileText, Scale, Briefcase, Calculator, Star, PoundSterling } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Writing CVs and Preparing for Interviews",
    description: "Creating effective CVs and developing interview skills for electrical industry roles",
    icon: FileText,
    href: "../level3-module7-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Understanding Employment Law and Workers' Rights",
    description: "Knowledge of employment legislation and understanding workers' rights and protections",
    icon: Scale,
    href: "../level3-module7-section5-5-2",
  },
  {
    number: "5.3",
    title: "Setting up as a Self-employed Electrician (insurance, UTR, HMRC)",
    description: "Requirements and procedures for establishing a self-employed electrical business",
    icon: Briefcase,
    href: "../level3-module7-section5-5-3",
  },
  {
    number: "5.4",
    title: "Quoting, Tendering, and Estimating Jobs",
    description: "Skills for accurate job estimation, competitive quoting and tender preparation",
    icon: Calculator,
    href: "../level3-module7-section5-5-4",
  },
  {
    number: "5.5",
    title: "Customer Service and Building Reputation",
    description: "Developing excellent customer service skills and building professional reputation",
    icon: Star,
    href: "../level3-module7-section5-5-5",
  },
  {
    number: "5.6",
    title: "Financial Awareness (tax, bookkeeping, pricing strategies)",
    description: "Understanding business finances, tax obligations and effective pricing strategies",
    icon: PoundSterling,
    href: "../level3-module7-section5-5-6",
  },
];

const Level3Module7Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 5 - Employment and Business Awareness
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Employment skills, self-employment options and business development
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Level3Module7Section5;