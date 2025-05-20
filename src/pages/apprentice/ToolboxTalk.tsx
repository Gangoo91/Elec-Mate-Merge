
import React from 'react';
import BackButton from "@/components/common/BackButton";
import ToolboxCard from "@/components/apprentice/toolbox/ToolboxCard";
import { FileText, ShieldAlert, WrenchIcon, Users, Lightbulb, Book, Shield, HardHat } from "lucide-react";
import { useTrainingActivityMonitor } from "@/hooks/useTrainingActivityMonitor";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const ToolboxTalk = () => {
  const { toast } = useToast();
  
  // Monitor training activity
  useTrainingActivityMonitor();

  // Show welcome toast on first load
  useEffect(() => {
    toast({
      title: "Toolbox Talk Resources",
      description: "Access important electrical work guidance, safety information, and best practices.",
    });
  }, [toast]);

  const toolboxItems = [
    {
      title: "Safety Procedures",
      icon: <ShieldAlert className="h-5 w-5 text-elec-yellow" />,
      description: "Essential safety protocols and procedures for electrical work",
      link: "/apprentice/toolbox/safety"
    },
    {
      title: "Tools Guide",
      icon: <WrenchIcon className="h-5 w-5 text-elec-yellow" />,
      description: "Proper use and maintenance of electrical tools",
      link: "/apprentice/toolbox/tools"
    },
    {
      title: "Team Communication",
      icon: <Users className="h-5 w-5 text-elec-yellow" />,
      description: "Effective communication on electrical job sites",
      link: "/apprentice/toolbox/communication"
    },
    {
      title: "Best Practices",
      icon: <Lightbulb className="h-5 w-5 text-elec-yellow" />,
      description: "Industry standard best practices for electrical work",
      link: "/apprentice/toolbox/best-practices"
    },
    {
      title: "Documentation",
      icon: <FileText className="h-5 w-5 text-elec-yellow" />,
      description: "Proper documentation procedures for electrical jobs",
      link: "/apprentice/toolbox/documentation"
    },
    {
      title: "Regulations",
      icon: <Book className="h-5 w-5 text-elec-yellow" />,
      description: "Key electrical regulations and standards",
      link: "/apprentice/toolbox/regulations"
    },
    {
      title: "PPE Requirements",
      icon: <Shield className="h-5 w-5 text-elec-yellow" />,
      description: "Personal protective equipment guidance for electrical work",
      link: "/apprentice/toolbox/ppe"
    },
    {
      title: "Site Management",
      icon: <HardHat className="h-5 w-5 text-elec-yellow" />,
      description: "Managing electrical work sites safely and efficiently",
      link: "/apprentice/toolbox/site-management"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-6">
      <div className="mb-6">
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
        <h1 className="text-3xl font-bold mt-4 mb-2">Toolbox Talk</h1>
        <p className="text-muted-foreground">Quick access to important electrical work guidance and procedures</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {toolboxItems.map((item, index) => (
          <ToolboxCard
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolboxTalk;
