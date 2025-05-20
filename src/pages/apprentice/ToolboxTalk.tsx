
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/common/BackButton";
import ToolboxCard from "@/components/apprentice/toolbox/ToolboxCard";
import { FileText, ShieldAlert, WrenchIcon, Users, Lightbulb } from "lucide-react";

const ToolboxTalk = () => {
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
