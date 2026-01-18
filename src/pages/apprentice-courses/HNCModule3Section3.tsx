import { ArrowLeft, Waves, Clock, RotateCcw, TrendingUp, Radio, Zap, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section3 = () => {
  useSEO(
    "Alternating Current Theory and Waveforms - HNC Module 3 Section 3",
    "Understanding AC waveform characteristics, harmonics, power relationships and efficiency in alternating current systems"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "AC waveform characteristics (RMS, average, peak values)",
      description: "Understanding different AC measurement values and their mathematical relationships",
      icon: Waves,
      href: "../h-n-c-module3-section3-3-1"
    },
    {
      number: "Subsection 2",
      title: "Frequency, period and amplitude relationships",
      description: "Time-domain characteristics of AC waveforms and their frequency components",
      icon: Clock,
      href: "../h-n-c-module3-section3-3-2"
    },
    {
      number: "Subsection 3", 
      title: "Phase difference and vector representation",
      description: "Vector methods for analysing phase relationships in AC circuits",
      icon: RotateCcw,
      href: "../h-n-c-module3-section3-3-3"
    },
    {
      number: "Subsection 4",
      title: "Sinusoidal, non-sinusoidal and distorted waveforms",
      description: "Analysis of different waveform types and distortion effects in electrical systems",
      icon: TrendingUp,
      href: "../h-n-c-module3-section3-3-4"
    },
    {
      number: "Subsection 5",
      title: "Harmonics – sources, effects and mitigation",
      description: "Understanding harmonic distortion, sources and methods for harmonic control",
      icon: Radio,
      href: "../h-n-c-module3-section3-3-5"
    },
    {
      number: "Subsection 6",
      title: "True, reactive and apparent power in AC systems",
      description: "Power relationships in AC circuits and their measurement techniques",
      icon: Zap,
      href: "../h-n-c-module3-section3-3-6"
    },
    {
      number: "Subsection 7",
      title: "Power triangle and efficiency",
      description: "Graphical representation of power relationships and system efficiency calculations",
      icon: Triangle,
      href: "../h-n-c-module3-section3-3-7"
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
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.3 Alternating Current Theory and Waveforms
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master AC waveform analysis, power relationships and harmonic theory for electrical systems
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

export default HNCModule3Section3;