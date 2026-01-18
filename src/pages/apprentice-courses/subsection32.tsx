import { ArrowLeft, GitBranch, Zap, Split, Calculator, CheckCircle, MapPin } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "What is a Circuit? Series vs Parallel Explained",
    description: "Understanding basic circuit types and their fundamental differences",
    icon: GitBranch,
    href: "3-1"
  },
  {
    number: "3.2", 
    title: "Current and Voltage in Series Circuits",
    description: "How current and voltage behave in series connected components",
    icon: Zap,
    href: "3-2"
  },
  {
    number: "3.3",
    title: "Current and Voltage in Parallel Circuits",
    description: "Understanding current and voltage distribution in parallel connections",
    icon: Split,
    href: "3-3"
  },
  {
    number: "3.4",
    title: "Total Resistance in Series and Parallel (Basic Calculations)",
    description: "Calculating combined resistance values in different circuit configurations",
    icon: Calculator,
    href: "3-4"
  },
  {
    number: "3.5",
    title: "Advantages and Disadvantages of Each Type",
    description: "Comparing the benefits and drawbacks of series and parallel circuits",
    icon: CheckCircle,
    href: "3-5"
  },
  {
    number: "3.6",
    title: "Recognising Circuit Types on Site (Practical Relevance)",
    description: "Identifying circuit configurations in real electrical installations",
    icon: MapPin,
    href: "3-6"
  },
];

const Module2Section2_3 = () => {
  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 2.3 – Series and Parallel Circuits
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Analysis and calculation of electrical parameters in series and parallel circuit configurations
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

export default Module2Section2_3;