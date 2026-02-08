import { ArrowLeft, Zap, Wrench, Shield, AlertTriangle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section2 = () => {
  useSEO(
    "Electrical Safety - MOET Module 1",
    "Electrical dangers, safe use of tools, PPE, approach distances and earthing"
  );

  const subsections = [
    {
      number: "1.2.1",
      title: "Dangers of Electricity",
      description: "Understanding shock, arc flash, burns, fire and electrical hazards",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2-1"
    },
    {
      number: "1.2.2", 
      title: "Safe Use of Tools and Test Equipment",
      description: "Proper selection, inspection and use of electrical tools",
      icon: Wrench,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2-2"
    },
    {
      number: "1.2.3",
      title: "Personal Protective Equipment (PPE)", 
      description: "Selection, use and maintenance of electrical PPE",
      icon: Shield,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2-3"
    },
    {
      number: "1.2.4",
      title: "Approach Distances and Live Working Restrictions",
      description: "Safe approach distances and live working limitations",
      icon: AlertTriangle,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2-4"
    },
    {
      number: "1.2.5",
      title: "Earthing and Bonding for Safety",
      description: "Protective earthing and equipotential bonding principles",
      icon: Activity,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.2 Electrical Safety
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Electrical dangers, safe use of tools, PPE, approach distances and earthing.
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

export default MOETModule1Section2;