import { ArrowLeft, Power, Battery, TrendingUp, Zap, TrendingDown, Smartphone } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "6.1",
    title: "What is Electrical Power? (Watts Explained)",
    description: "Understanding electrical power and the unit of measurement",
    icon: Power,
    href: "6-1"
  },
  {
    number: "6.2", 
    title: "Energy Consumption – Calculating kWh and Costing",
    description: "Understanding energy usage calculations and cost implications",
    icon: Battery,
    href: "6-2"
  },
  {
    number: "6.3",
    title: "Efficiency – What It Means and Why It Matters",
    description: "Understanding electrical efficiency and its importance in systems",
    icon: TrendingUp,
    href: "6-3"
  },
  {
    number: "6.4",
    title: "Losses in Electrical Systems (Heat, Load)",
    description: "Identifying and understanding energy losses in electrical circuits",
    icon: Zap,
    href: "6-4"
  },
  {
    number: "6.5",
    title: "Reducing Energy Waste (Smart Design and Load Control)",
    description: "Methods and strategies for improving electrical system efficiency",
    icon: TrendingDown,
    href: "6-5"
  },
  {
    number: "6.6",
    title: "Real-Life Applications (Energy Bills, Load Monitoring, Smart Tech)",
    description: "Practical applications of power and energy concepts in everyday situations",
    icon: Smartphone,
    href: "6-6"
  },
];

const Section2_6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            Section 2.6 – Power, Energy, and Efficiency
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Calculating electrical power consumption, energy usage, and system efficiency
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

export default Section2_6;