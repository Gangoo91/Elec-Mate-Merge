import { ArrowLeft, BookOpen, Wrench, FolderOpen, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule7 = () => {
  useSEO(
    "Module 7: End Point Assessment Preparation - MOET Course",
    "EPA preparation, knowledge tests, practical tasks, portfolio development and professional behaviours"
  );

  const sections = [
    {
      number: "7.1",
      title: "Knowledge Test Practice",
      description: "Multiple-choice questions, mock tests, feedback and exam techniques",
      icon: BookOpen,
      href: "../m-o-e-t-module7-section1"
    },
    {
      number: "7.2", 
      title: "Practical Task Preparation",
      description: "Safe isolation, fault diagnosis, repairs and control system troubleshooting",
      icon: Wrench,
      href: "../m-o-e-t-module7-section2"
    },
    {
      number: "7.3",
      title: "Portfolio Development and Evidence Gathering", 
      description: "Work-based portfolio, witness statements and evidence mapping",
      icon: FolderOpen,
      href: "../m-o-e-t-module7-section3"
    },
    {
      number: "7.4",
      title: "Professional Behaviours and Soft Skills",
      description: "Teamwork, communication, time management and professional conduct",
      icon: Users,
      href: "../m-o-e-t-module7-section4"
    },
    {
      number: "7.5",
      title: "EPA Readiness and Final Review",
      description: "Gateway requirements, final revision and EPA day preparation",
      icon: CheckCircle,
      href: "../m-o-e-t-module7-section5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MOET Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 7: End Point Assessment Preparation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            EPA preparation, knowledge tests, practical tasks, portfolio development and professional behaviours.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MOETModule7;