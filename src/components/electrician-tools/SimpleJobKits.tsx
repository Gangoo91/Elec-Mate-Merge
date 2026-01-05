import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Home, Briefcase, Zap, CheckCircle } from "lucide-react";

const SimpleJobKits = () => {
  const [openKit, setOpenKit] = useState<string | null>(null);

  const jobKits = [
    {
      id: "domestic",
      icon: Home,
      title: "Domestic Installation Kit",
      toolCount: 5,
      estCost: "£150-250",
      description: "For house rewiring, consumer units, socket installation",
      tools: [
        "Insulated Screwdriver Set",
        "Wire Strippers",
        "Side Cutters",
        "Voltage Tester",
        "Socket Tester"
      ]
    },
    {
      id: "emergency",
      icon: Zap,
      title: "Emergency Call-out Kit",
      toolCount: 3,
      estCost: "£60-100",
      description: "Essential tools for urgent repairs and fault finding",
      tools: [
        "Voltage Tester",
        "Socket Tester",
        "Torch/Headlamp"
      ]
    },
    {
      id: "apprentice",
      icon: Briefcase,
      title: "Apprentice Starter Set",
      toolCount: 6,
      estCost: "£140-220",
      description: "Budget-friendly essential tools to get started",
      tools: [
        "Basic Screwdriver Set",
        "Wire Strippers",
        "Side Cutters",
        "Long Nose Pliers",
        "Voltage Tester",
        "Socket Tester"
      ]
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 border-purple-500/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-foreground">Job-Specific Kits</CardTitle>
            <p className="text-foreground/80 text-sm">Ready-made tool lists for common jobs</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {jobKits.map((kit) => {
          const Icon = kit.icon;
          const isOpen = openKit === kit.id;
          
          return (
            <Collapsible
              key={kit.id}
              open={isOpen}
              onOpenChange={() => setOpenKit(isOpen ? null : kit.id)}
            >
              <Card className="bg-elec-card/30 border-white/10 hover:border-purple-500/30 transition-all">
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-lg bg-purple-600/20">
                          <Icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{kit.title}</h4>
                          <p className="text-sm text-foreground/70">{kit.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                          {kit.toolCount} tools • {kit.estCost}
                        </Badge>
                        <ChevronDown 
                          className={`h-5 w-5 text-foreground/60 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="pt-0 px-4 pb-4">
                    <div className="space-y-2 pl-14">
                      {kit.tools.map((tool, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 text-sm text-foreground/80 p-2 rounded bg-elec-dark/40"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          {tool}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}

        <div className="p-3 rounded-lg bg-purple-600/10 border border-purple-500/20">
          <p className="text-sm text-foreground/80">
            <span className="font-medium text-purple-400">Pro Tip:</span> Start with the essential kit for your main work type, then expand based on specific job requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleJobKits;
