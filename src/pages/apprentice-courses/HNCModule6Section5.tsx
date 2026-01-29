import { ArrowLeft, Search, Gauge, BarChart3, Award, LineChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule6Section5 = () => {
  useSEO(
    "Energy Management - HNC Module 6 Section 5 | Sustainability",
    "Master energy management: energy auditing, metering strategies, monitoring and targeting, ISO 50001 and building energy performance optimisation."
  );

  const subsections = [
    {
      number: "5.1",
      title: "Energy Auditing",
      description: "Audit types, data collection, site surveys, measurement protocols and reporting standards",
      icon: Search,
      href: "../h-n-c-module6-section5-1"
    },
    {
      number: "5.2",
      title: "Metering Strategies",
      description: "Main metering, sub-metering, automatic meter reading, data loggers and metering hierarchies",
      icon: Gauge,
      href: "../h-n-c-module6-section5-2"
    },
    {
      number: "5.3",
      title: "Monitoring and Targeting",
      description: "M&T principles, degree day analysis, cusum charts, exception reporting and performance tracking",
      icon: BarChart3,
      href: "../h-n-c-module6-section5-3"
    },
    {
      number: "5.4",
      title: "ISO 50001",
      description: "Energy management systems, Plan-Do-Check-Act, certification requirements and continual improvement",
      icon: Award,
      href: "../h-n-c-module6-section5-4"
    },
    {
      number: "5.5",
      title: "Building Performance",
      description: "Display Energy Certificates, benchmarking, performance gaps and operational rating improvement",
      icon: LineChart,
      href: "../h-n-c-module6-section5-5"
    },
    {
      number: "5.6",
      title: "Energy Efficiency Measures",
      description: "ECM identification, payback analysis, implementation priorities and verification of savings",
      icon: Settings,
      href: "../h-n-c-module6-section5-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 5: Energy Management
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Implement effective energy management systems to optimise building energy performance
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers energy management principles and practices for commercial buildings. You'll learn about energy auditing, metering strategies, monitoring and targeting techniques, ISO 50001 energy management systems and how to identify and implement energy efficiency measures.
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

export default HNCModule6Section5;
