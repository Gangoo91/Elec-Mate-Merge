
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PoundSterling, Zap, Home, PlugZap } from "lucide-react";

// Template data that would ideally come from a database
const QUOTE_TEMPLATES = [
  {
    id: "rewire",
    title: "Full House Rewire",
    description: "Complete electrical rewiring for residential properties",
    icon: Home,
    inputs: ["bedrooms", "floors", "consumer_unit", "sockets_per_room"]
  },
  {
    id: "eicr",
    title: "Electrical Installation Condition Report (EICR)",
    description: "Thorough inspection and testing of electrical installations",
    icon: FileText,
    inputs: ["property_size", "age", "circuits"]
  },
  {
    id: "consumer_unit",
    title: "Consumer Unit Replacement",
    description: "Upgrade or replace consumer unit/fuse box",
    icon: PoundSterling,
    inputs: ["circuits", "rcds", "mcbs"]
  },
  {
    id: "ev_charger",
    title: "Electric Vehicle Charger Installation",
    description: "EV charging point installation for residential properties",
    icon: PlugZap,
    inputs: ["charger_type", "cable_run", "earthing_requirements"]
  }
];

interface QuoteTemplateListProps {
  onSelectTemplate: (templateId: string) => void;
}

const QuoteTemplateList = ({ onSelectTemplate }: QuoteTemplateListProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUOTE_TEMPLATES.map(template => {
          const Icon = template.icon;
          
          return (
            <Card key={template.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors cursor-pointer" 
              onClick={() => onSelectTemplate(template.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon className="h-5 w-5 text-elec-yellow" />
                    {template.title}
                  </CardTitle>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Use Template</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="border-dashed border-2 border-elec-yellow/30 bg-transparent hover:bg-elec-dark/20 transition-colors cursor-pointer">
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <PlusCircle className="h-8 w-8 text-elec-yellow/60 mb-2" />
          <p className="font-medium">Create Custom Template</p>
          <p className="text-sm text-muted-foreground mt-1">Build your own quote template from scratch</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteTemplateList;
