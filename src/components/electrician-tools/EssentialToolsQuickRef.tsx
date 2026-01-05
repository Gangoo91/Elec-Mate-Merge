import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, ExternalLink, ShieldCheck } from "lucide-react";

const EssentialToolsQuickRef = () => {
  const essentialTools = [
    {
      name: "Insulated Screwdriver Set",
      purpose: "For safe work on live circuits",
      priceRange: "£35-50",
      supplier: "Screwfix",
      priority: "Critical",
      safety: "VDE tested to 1000V"
    },
    {
      name: "Wire Strippers",
      purpose: "For stripping cable insulation",
      priceRange: "£25-40",
      supplier: "Screwfix",
      priority: "Critical",
      safety: "Self-adjusting recommended"
    },
    {
      name: "Side Cutters",
      purpose: "For cutting cables cleanly",
      priceRange: "£20-35",
      supplier: "Screwfix",
      priority: "Critical",
      safety: "Insulated handles"
    },
    {
      name: "Voltage Tester",
      purpose: "For testing live circuits",
      priceRange: "£30-45",
      supplier: "Screwfix",
      priority: "Critical",
      safety: "GS38 compliant"
    },
    {
      name: "Long Nose Pliers",
      purpose: "For working in tight spaces",
      priceRange: "£15-25",
      supplier: "Screwfix",
      priority: "Essential",
      safety: "Insulated to 1000V"
    },
    {
      name: "Socket Tester",
      purpose: "For quick fault identification",
      priceRange: "£15-25",
      supplier: "Screwfix",
      priority: "Essential",
      safety: "BS7671 compliant"
    }
  ];

  const getPriorityColor = (priority: string) => {
    return priority === "Critical" 
      ? "bg-red-600/90 text-foreground border-red-400" 
      : "bg-orange-600/90 text-foreground border-orange-400";
  };

  return (
    <Card className="bg-gradient-to-br from-elec-yellow/5 via-transparent to-elec-yellow/10 border-elec-yellow/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/20">
              <Wrench className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-foreground">Must-Have Hand Tools</CardTitle>
              <p className="text-foreground/80 text-sm">Essential tools every electrician needs</p>
            </div>
          </div>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
            6 Tools • £140-220
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {essentialTools.map((tool, index) => (
            <Card key={index} className="bg-elec-card/50 border-white/10 hover:border-elec-yellow/30 transition-all">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-foreground leading-tight">{tool.name}</h4>
                    <Badge className={getPriorityColor(tool.priority)}>
                      {tool.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground/80">{tool.purpose}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <ShieldCheck className="h-3 w-3 text-green-400" />
                    {tool.safety}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <div className="text-elec-yellow font-semibold">{tool.priceRange}</div>
                      <div className="text-xs text-foreground/60">{tool.supplier}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8 border-elec-yellow/30 hover:bg-elec-yellow/10 text-foreground"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-elec-yellow mt-0.5" />
            <div>
              <h5 className="font-medium text-foreground mb-1">Safety First</h5>
              <p className="text-sm text-foreground/80">
                All tools must be VDE tested and BS7671 compliant for electrical work. 
                Always use insulated tools when working on live circuits.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EssentialToolsQuickRef;
