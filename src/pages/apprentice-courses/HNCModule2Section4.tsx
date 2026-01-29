import { ArrowLeft, Eye, Calculator, Lightbulb, Volume2, VolumeX, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule2Section4 = () => {
  useSEO(
    "Lighting and Acoustics - HNC Module 2 Section 4 | Building Services Engineering",
    "Master lighting and acoustics: visual perception, illumination calculations, lamp types, sound fundamentals, noise control and building acoustics compliance."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Light and Vision",
      description: "EM spectrum, visual perception, colour temperature, CRI",
      icon: Eye,
      href: "../h-n-c-module2-section4-1"
    },
    {
      number: "4.2",
      title: "Illumination Calculations",
      description: "Lumen method, point-by-point, maintained illuminance",
      icon: Calculator,
      href: "../h-n-c-module2-section4-2"
    },
    {
      number: "4.3",
      title: "Lamp Types and Efficacy",
      description: "LED, fluorescent, discharge, efficiency comparison",
      icon: Lightbulb,
      href: "../h-n-c-module2-section4-3"
    },
    {
      number: "4.4",
      title: "Sound Fundamentals",
      description: "Frequency, wavelength, decibels, sound pressure levels",
      icon: Volume2,
      href: "../h-n-c-module2-section4-4"
    },
    {
      number: "4.5",
      title: "Noise Control Methods",
      description: "Source, path, receiver, attenuation, barriers",
      icon: VolumeX,
      href: "../h-n-c-module2-section4-5"
    },
    {
      number: "4.6",
      title: "Building Acoustics and Compliance",
      description: "Reverberation, Part E requirements, noise ratings",
      icon: Building,
      href: "../h-n-c-module2-section4-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
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
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 4: Lighting and Acoustics
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Apply the principles of lighting design and acoustic engineering to create comfortable building environments
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the physics of light and sound, calculation methods for illumination levels, lamp selection, noise control strategies, and compliance with Part E and CIBSE guidance - essential for designing comfortable and compliant building services.
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

export default HNCModule2Section4;
