import { ArrowLeft, Calculator, Wallet, TrendingUp, FileWarning, Receipt, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section3 = () => {
  useSEO(
    "Cost Management - HNC Module 5 Section 3 | Building Services",
    "Master cost management: estimating methods, budget development, cost control, variations and claims, final accounts and value engineering for building services."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Estimating Methods",
      description: "First principles estimating, benchmarking, parametric methods and building services pricing techniques",
      icon: Calculator,
      href: "../h-n-c-module5-section3-1"
    },
    {
      number: "3.2",
      title: "Budget Development",
      description: "Cost plans, contingency allowances, risk allowances, preliminaries and overhead calculations for MEP works",
      icon: Wallet,
      href: "../h-n-c-module5-section3-2"
    },
    {
      number: "3.3",
      title: "Cost Control",
      description: "Cost monitoring, progress reporting, forecasting techniques, cost value reconciliation and earned value analysis",
      icon: TrendingUp,
      href: "../h-n-c-module5-section3-3"
    },
    {
      number: "3.4",
      title: "Variations and Claims",
      description: "Variation valuation methods, entitlement assessment, notice requirements and claims substantiation",
      icon: FileWarning,
      href: "../h-n-c-module5-section3-4"
    },
    {
      number: "3.5",
      title: "Final Account",
      description: "Final measurement, account agreement, retention release, defects liability period and financial close-out",
      icon: Receipt,
      href: "../h-n-c-module5-section3-5"
    },
    {
      number: "3.6",
      title: "Value Engineering",
      description: "Options analysis, life cycle costing, whole life value assessment and cost-benefit evaluation for building services",
      icon: Scale,
      href: "../h-n-c-module5-section3-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 3: Cost Management
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Apply financial management principles to building services projects from estimate to final account
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the complete cost management cycle for building services projects - from initial estimating and budget development through to cost control, variations management and final account agreement.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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

export default HNCModule5Section3;
