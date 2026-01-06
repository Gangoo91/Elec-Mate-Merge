import { ArrowLeft, Stethoscope, Eye, AlertTriangle, TestTube, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Tripping MCBs or RCDs",
    description: "Understanding protective device operation as fault indicators",
    icon: Stethoscope,
    href: "3-1"
  },
  {
    number: "Subsection 2", 
    title: "Understanding the Sequence of Operation",
    description: "Trace how a circuit functions to locate faults logically",
    icon: Eye,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Testing One Component or Section at a Time",
    description: "Isolate and confirm faults efficiently with step-by-step testing",
    icon: AlertTriangle,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Buzzing Sounds, Arcing, or Sparking",
    description: "Recognising audible and visible signs of electrical problems",
    icon: TestTube,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Complaints from Occupants or Users",
    description: "Understanding user-reported symptoms of electrical faults",
    icon: Zap,
    href: "3-5"
  }
];

const Section3 = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 3: Signs and Symptoms of Fault Conditions
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Recognising indicators of electrical fault conditions
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

export default Section3;