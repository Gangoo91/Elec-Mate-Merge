import { ArrowLeft, Zap, Battery, Activity, Radio, MapPin, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Differences Between AC and DC",
    description: "Understanding the fundamental differences between alternating and direct current",
    icon: Zap,
    href: "4-1"
  },
  {
    number: "4.2", 
    title: "Sources of AC and DC (Batteries, Mains, Transformers)",
    description: "Common sources of AC and DC power in electrical systems",
    icon: Battery,
    href: "4-2"
  },
  {
    number: "4.3",
    title: "Characteristics of AC (Alternating, Frequency, Waveform Basics)",
    description: "Understanding AC characteristics including frequency and waveforms",
    icon: Activity,
    href: "4-3"
  },
  {
    number: "4.4",
    title: "Frequency and Voltage of UK Mains Supply",
    description: "Specifications of the UK electrical supply system",
    icon: Radio,
    href: "4-4"
  },
  {
    number: "4.5",
    title: "Where AC and DC Are Used in Real Installations",
    description: "Practical applications of AC and DC in modern electrical installations",
    icon: MapPin,
    href: "4-5"
  },
  {
    number: "4.6",
    title: "Safety Considerations and Testing Differences",
    description: "Safety protocols and testing methods for AC and DC systems",
    icon: Shield,
    href: "4-6"
  },
];

const Module2Section2_4 = () => {
  return (
    <div className="min-h-screen bg-background">
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
            Section 2.4 – AC and DC Supply
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Understanding alternating and direct current characteristics, waveforms, and applications
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

export default Module2Section2_4;