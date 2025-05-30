
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PoundSterling, Zap, Home, PlugZap, PlusCircle, Lightbulb, WifiIcon, Shield, Wrench } from "lucide-react";

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
  },
  {
    id: "lighting",
    title: "Lighting Installation",
    description: "Indoor and outdoor lighting systems for residential and commercial properties",
    icon: Lightbulb,
    inputs: ["light_points", "dimmer_switches", "led_fixtures", "outdoor_lights"]
  },
  {
    id: "smart_home",
    title: "Smart Home Installation",
    description: "Smart electrical systems and home automation setup",
    icon: WifiIcon,
    inputs: ["smart_devices", "hub_type", "zones", "wifi_coverage"]
  },
  {
    id: "fire_alarm",
    title: "Fire Alarm System",
    description: "Design and installation of fire detection and alarm systems",
    icon: Shield,
    inputs: ["detection_points", "panel_type", "property_type", "certification_required"]
  },
  {
    id: "maintenance",
    title: "Electrical Maintenance Contract",
    description: "Ongoing electrical system maintenance for businesses",
    icon: Wrench,
    inputs: ["property_size", "visit_frequency", "equipment_types", "emergency_response"]
  }
];

interface QuoteTemplateListProps {
  onSelectTemplate: (templateId: string) => void;
}

const QuoteTemplateList = ({ onSelectTemplate }: QuoteTemplateListProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Choose a Quote Template</h2>
        <p className="text-muted-foreground">
          Select from our professional templates to quickly generate accurate quotes
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUOTE_TEMPLATES.map(template => {
          const Icon = template.icon;
          
          return (
            <Card 
              key={template.id} 
              className="border-elec-yellow/20 bg-elec-dark/30 hover:border-elec-yellow/40 transition-all duration-200 cursor-pointer group h-full" 
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors flex-shrink-0">
                      <Icon className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base sm:text-lg text-white leading-tight">
                        {template.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template.id);
                  }}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card className="border-dashed border-2 border-elec-yellow/30 bg-elec-dark/20 hover:bg-elec-dark/30 transition-colors cursor-pointer">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <PlusCircle className="h-8 w-8 text-elec-yellow/60 mb-3" />
          <h3 className="font-semibold text-white mb-1">Create Custom Template</h3>
          <p className="text-sm text-muted-foreground">
            Build your own quote template from scratch
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteTemplateList;
