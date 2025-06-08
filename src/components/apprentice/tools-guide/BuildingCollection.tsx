
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, PoundSterling, Wrench } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const BuildingCollection = () => {
  const isMobile = useIsMobile();
  
  const phases = [
    {
      phase: "Phase 1",
      title: "Essential Safety & Basic Hand Tools",
      timeframe: "Months 1-6",
      budget: "£300-500",
      priority: "Critical",
      items: [
        "Safety boots & hard hat",
        "Basic multimeter",
        "Screwdriver set (insulated)", 
        "Wire strippers & side cutters",
        "Voltage tester (two-pole)"
      ]
    },
    {
      phase: "Phase 2", 
      title: "Testing Equipment & Power Tools",
      timeframe: "Months 6-12",
      budget: "£400-700",
      priority: "High",
      items: [
        "Insulation resistance tester",
        "Cordless drill & bits",
        "Spirit level (torpedo)",
        "Cable detector",
        "RCD tester"
      ]
    },
    {
      phase: "Phase 3",
      title: "Advanced Testing & Installation Tools",
      timeframe: "Months 12-24",
      budget: "£600-1000",
      priority: "Medium",
      items: [
        "Loop impedance tester",
        "Angle grinder (115mm)",
        "SDS drill & bits",
        "Cable pulling system",
        "Advanced multimeter"
      ]
    },
    {
      phase: "Phase 4",
      title: "Professional Specialisation Tools",
      timeframe: "Months 24+",
      budget: "£500-800",
      priority: "Future",
      items: [
        "Advanced PAT tester",
        "Thermal imaging camera",
        "Specialised test equipment",
        "Professional tool storage",
        "Vehicle tool setup"
      ]
    }
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "High": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Future": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-2 flex items-center justify-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Tool Collection Strategy
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          A strategic approach to building your electrical tool collection. Prioritise safety and testing tools first, 
          then expand to power tools as your career progresses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {phases.map((phase, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-dark/50 hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                      {phase.phase}
                    </Badge>
                    <Badge className={getPriorityColor(phase.priority)}>
                      {phase.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-elec-yellow">
                    {phase.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="font-medium">{phase.timeframe}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium text-green-400">{phase.budget}</span>
                </div>
              </div>
              
              <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3">
                <h4 className="font-medium text-sm text-elec-yellow mb-2 flex items-center gap-1.5">
                  <Wrench className="h-4 w-4" />
                  Essential Tools
                </h4>
                <ul className="space-y-1.5">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-elec-yellow/5 to-green-500/5 border border-elec-yellow/20 rounded-lg">
          <h3 className="font-medium text-elec-yellow mb-2">💡 Smart Tool Purchasing</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Invest in quality tools that will last your career</li>
            <li>• Check if your employer provides tool allowances</li>
            <li>• Consider tool insurance for expensive equipment</li>
            <li>• Look for apprentice trade discounts</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-blue-500/5 to-elec-yellow/5 border border-blue-500/20 rounded-lg">
          <h3 className="font-medium text-blue-400 mb-2">🎯 Funding Your Tools</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Apprenticeship training provider schemes</li>
            <li>• Government grants for apprentices</li>
            <li>• Employer tool purchase programmes</li>
            <li>• Hire tools for one-off requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BuildingCollection;
