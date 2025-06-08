
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Zap, CheckSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

const ElectricalInstallationTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [findings, setFindings] = useState("");

  const electricalChecklist = [
    {
      category: "Consumer Unit & Distribution",
      items: [
        "Consumer unit condition and accessibility",
        "Adequate space for additional circuits if required",
        "Main switch operation and labelling",
        "RCD protection appropriate and functioning",
        "Circuit breaker ratings and condition",
        "Busbar connections tight and secure"
      ]
    },
    {
      category: "Existing Wiring",
      items: [
        "Cable types and conditions throughout installation",
        "Cable supports and fixing methods adequate",
        "No signs of overheating or damage",
        "Appropriate cable sizes for circuit loading",
        "Junction boxes and connections accessible",
        "Cable identification and labelling present"
      ]
    },
    {
      category: "Earthing & Bonding",
      items: [
        "Main earthing terminal condition and connection",
        "Earthing conductor size and condition",
        "Equipotential bonding to services complete",
        "Supplementary bonding where required",
        "Earth electrode system (if applicable)",
        "Continuity of protective conductors"
      ]
    },
    {
      category: "Safety Systems",
      items: [
        "RCD testing and operation within limits",
        "Emergency lighting systems functional",
        "Fire alarm systems unaffected by work",
        "Security systems consideration",
        "Smoke detection systems operational",
        "Emergency stop systems accessible"
      ]
    }
  ];

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Electrical Installation Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Evaluate existing electrical installations to ensure compatibility and safety before commencing new work.
          </p>
        </CardContent>
      </Card>

      {electricalChecklist.map((category, index) => (
        <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3 p-3 border border-elec-yellow/20 rounded-lg hover:bg-elec-yellow/5 transition-colors">
                  <button
                    onClick={() => toggleItem(item)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      checkedItems.includes(item)
                        ? 'bg-green-500 border-green-500'
                        : 'border-elec-yellow/40 hover:border-elec-yellow'
                    }`}
                  >
                    {checkedItems.includes(item) && (
                      <CheckSquare className="h-3 w-3 text-white" />
                    )}
                  </button>
                  <span className={`text-sm ${checkedItems.includes(item) ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Installation Findings & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            placeholder="Record any defects found, upgrade requirements, or recommendations for the existing installation..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Electrical Assessment
          </Button>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            If any defects or safety concerns are identified during this assessment, 
            they must be reported immediately and rectified before proceeding with new installation work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricalInstallationTab;
