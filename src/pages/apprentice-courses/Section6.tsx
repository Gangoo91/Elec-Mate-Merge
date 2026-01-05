import { ArrowLeft, AlertTriangle, ClipboardList, Heart, Shield, Eye, Crown } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Types of Workplace Accidents",
    description: "Understanding common accident types in electrical work environments",
    icon: AlertTriangle,
    href: "6-1"
  },
  {
    number: "Subsection 2", 
    title: "RIDDOR: What Must Be Reported",
    description: "Legal requirements for reporting workplace incidents and injuries",
    icon: ClipboardList,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "First Aid Requirements on Site",
    description: "Understanding legal first aid provision and emergency response procedures",
    icon: Heart,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Emergency Procedures and Evacuation Plans",
    description: "Learning emergency responses and evacuation requirements for electrical sites",
    icon: Shield,
    href: "6-4"
  },
  {
    number: "Subsection 5",
    title: "The Importance of Near Miss Reporting",
    description: "Understanding how near miss reporting prevents serious incidents and improves workplace safety",
    icon: Eye,
    href: "6-5"
  },
  {
    number: "Subsection 6",
    title: "Final Summary and Key Safety Principles",
    description: "Reinforcing core safety concepts and building lifelong safe working habits",
    icon: Crown,
    href: "6-6"
  }
];

const Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 6: Health and Safety Incidents
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Understanding workplace accidents and legal reporting requirements
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

export default Section6;