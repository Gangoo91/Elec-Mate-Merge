import { ArrowLeft, Shield, TestTube, Eye, Wrench, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Purpose of Insulation Resistance Testing",
    description: "Understanding why insulation resistance testing is essential",
    icon: Shield,
    href: "5-1"
  },
  {
    number: "Subsection 2", 
    title: "Test Equipment and Safety Considerations",
    description: "Understanding the correct equipment and safety precautions for IR testing",
    icon: TestTube,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "Performing the Insulation Resistance Test",
    description: "Step-by-step procedures for conducting accurate IR tests",
    icon: Eye,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "Interpreting Results Against Standards",
    description: "Understanding BS 7671 requirements and making professional judgements",
    icon: Wrench,
    href: "5-4"
  }
];

const Section5 = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 5: Insulation Resistance Testing (Introduction Only)
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Basic introduction to insulation resistance testing principles
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

export default Section5;