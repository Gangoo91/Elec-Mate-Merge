
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Eye, Zap, FileText, Shield, Settings, Search, BookOpen, Wrench, AlertTriangle } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Link } from "react-router-dom";

const OnJobBS7671RunThrough = () => {
  const bs7671Sections = [
    {
      id: 1,
      title: "Overview",
      icon: CheckCircle,
      description: "Why we test and compliance requirements",
      link: "/apprentice/bs7671-inspection-testing/overview"
    },
    {
      id: 2,
      title: "Visual Inspection",
      icon: Eye,
      description: "Pre-testing visual checks and procedures"
    },
    {
      id: 3,
      title: "Electrical Testing",
      icon: Zap,
      description: "Complete testing sequence and procedures"
    },
    {
      id: 4,
      title: "Documentation",
      icon: FileText,
      description: "Certificates and required paperwork"
    },
    {
      id: 5,
      title: "Safe Isolation",
      icon: Shield,
      description: "Isolation procedures and proving dead"
    },
    {
      id: 6,
      title: "Test Equipment",
      icon: Settings,
      description: "MFT setup and equipment guidance"
    },
    {
      id: 7,
      title: "Fault Finding",
      icon: Search,
      description: "Troubleshooting and fault diagnosis"
    },
    {
      id: 8,
      title: "Regulations Reference",
      icon: BookOpen,
      description: "BS7671 regulations and guidance notes"
    },
    {
      id: 9,
      title: "Practical Exercises",
      icon: Wrench,
      description: "Hands-on testing practice scenarios"
    },
    {
      id: 10,
      title: "Safety Procedures",
      icon: AlertTriangle,
      description: "Risk assessments and safety protocols"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">BS7671 Inspection & Testing</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete step-by-step inspection and testing procedures, guides, and documentation requirements for apprentices
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      {/* Clean Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bs7671Sections.map((section) => {
          const CardComponent = section.link ? Link : 'div';
          return (
            <CardComponent 
              key={section.id}
              to={section.link || '#'}
              className={`block ${section.link ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <Card 
                className={`border-elec-yellow/20 bg-elec-gray transition-colors group h-full ${
                  section.link ? 'hover:bg-elec-gray/80 hover:border-elec-yellow/40' : 'hover:bg-elec-gray/80'
                }`}
              >
                <CardContent className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <section.icon className={`h-12 w-12 text-elec-yellow transition-transform ${
                    section.link ? 'group-hover:scale-110' : 'group-hover:scale-105'
                  }`} />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                    {section.link && (
                      <p className="text-xs text-elec-yellow mt-2">Click to explore →</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardComponent>
          );
        })}
      </div>

      {/* Compliance Reminder Card */}
      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">BS7671 Compliance Reminder</h3>
              <p className="text-muted-foreground">
                All electrical installation work must comply with BS 7671 (18th Edition) requirements. 
                Follow the correct testing sequence, document all results accurately, and ensure safety 
                procedures are followed at all times. As an apprentice, always work under supervision 
                and never attempt testing procedures without proper training and competency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobBS7671RunThrough;
