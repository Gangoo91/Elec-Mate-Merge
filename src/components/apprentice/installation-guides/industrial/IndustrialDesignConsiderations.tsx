
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Factory, Zap } from "lucide-react";

const IndustrialDesignConsiderations = () => {
  const designConsiderations = [
    {
      category: "Motor Control Systems",
      considerations: [
        "Soft-start requirements for large motors",
        "Variable frequency drive integration",
        "Motor protection and overload settings",
        "Emergency stop circuit design",
        "Control voltage selection (24V/110V/240V)"
      ]
    },
    {
      category: "Hazardous Areas",
      considerations: [
        "ATEX zone classifications (Zone 0, 1, 2)",
        "Temperature class requirements",
        "Gas group classifications",
        "Ingress protection ratings",
        "Explosive atmosphere protection methods"
      ]
    },
    {
      category: "Heavy Machinery",
      considerations: [
        "Load calculations for large motors",
        "Starting current and diversity factors",
        "Mechanical protection requirements",
        "Maintenance access provisions",
        "Lifting and handling considerations"
      ]
    }
  ];

  return (
    <Card className="border-purple-500/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-purple-400" />
          <CardTitle className="text-purple-300">Critical Design Considerations</CardTitle>
        </div>
        <p className="text-muted-foreground">Key factors for industrial electrical design</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {designConsiderations.map((item, index) => (
          <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Factory className="h-4 w-4" />
              {item.category}
            </h3>
            <div className="space-y-2">
              {item.considerations.map((consideration, conIndex) => (
                <div key={conIndex} className="flex items-start gap-2 text-sm">
                  <Zap className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{consideration}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IndustrialDesignConsiderations;
