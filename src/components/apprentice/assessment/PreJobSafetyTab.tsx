
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Shield, AlertTriangle, Download, Clock, User, FileText } from "lucide-react";
import { useState } from "react";

const PreJobSafetyTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const safetyChecklist = [
    {
      category: "Personal Protective Equipment",
      icon: Shield,
      items: [
        "Hard hat - BS EN 397 compliant with electrical protection",
        "Safety glasses - BS EN 166 impact resistant",
        "Insulated gloves - voltage rated for the task",
        "Safety boots - BS EN ISO 20345 with electrical protection",
        "High-visibility clothing - appropriate to site requirements",
        "Hearing protection if required for noisy environments",
        "Respiratory protection for dusty conditions"
      ]
    },
    {
      category: "Electrical Safety Equipment",
      icon: Shield,
      items: [
        "Voltage indicator/tester calibrated and functioning",
        "Lock-off devices available and in good condition",
        "Prove dead device tested before and after use",
        "GS38 compliant test leads and probes",
        "Insulated tools rated for working voltage",
        "Emergency contact numbers readily available",
        "First aid kit with electrical injury procedures"
      ]
    },
    {
      category: "Work Environment Assessment",
      icon: AlertTriangle,
      items: [
        "Adequate lighting for the work area",
        "Weather conditions suitable for electrical work",
        "Work area clear of water and moisture",
        "Access routes safe and unobstructed",
        "Emergency evacuation route identified",
        "Fire extinguisher location noted",
        "Ventilation adequate for the work being undertaken"
      ]
    },
    {
      category: "Documentation & Communication",
      icon: FileText,
      items: [
        "Method statement reviewed and understood",
        "Risk assessment completed and communicated",
        "Permit to work obtained if required",
        "All team members briefed on safety procedures",
        "Supervisor contact details confirmed",
        "Site induction completed",
        "Insurance and certification documents available"
      ]
    },
    {
      category: "Tool and Equipment Check",
      icon: CheckSquare,
      items: [
        "All tools PAT tested and in date",
        "Extension leads and portable equipment checked",
        "Ladder inspection completed if required",
        "Scaffolding certification checked",
        "Vehicle safety check completed",
        "Material handling equipment inspected",
        "Communication devices tested and charged"
      ]
    }
  ];

  const safetyTips = [
    {
      title: "Safe Isolation Procedure",
      content: "Always follow the 7-step safe isolation procedure: 1) Identify 2) Isolate 3) Secure 4) Test dead 5) Re-test tester 6) Issue permit 7) Begin work"
    },
    {
      title: "Emergency Procedures",
      content: "Know the emergency contact numbers, location of first aid equipment, and evacuation procedures. Report any incidents immediately."
    },
    {
      title: "Weather Considerations",
      content: "Do not work on outdoor electrical installations during wet weather, high winds, or electrical storms. Monitor weather conditions throughout the day."
    }
  ];

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const completionRate = (checkedItems.length / safetyChecklist.reduce((total, cat) => total + cat.items.length, 0)) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Pre-Job Safety Assessment</CardTitle>
            </div>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
              {Math.round(completionRate)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Complete this comprehensive safety checklist before starting any electrical work. 
            Each item must be verified to ensure a safe working environment. This assessment helps ensure compliance with the Electricity at Work Regulations 1989 and CDM Regulations 2015.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-elec-yellow mb-1">
                {checkedItems.length}
              </div>
              <div className="text-sm text-muted-foreground">Items Checked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {safetyChecklist.reduce((total, cat) => total + cat.items.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                <Clock className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">Est. 15-20 mins</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {safetyChecklist.map((category, index) => (
        <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <category.icon className="h-5 w-5 text-elec-yellow" />
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
                  <span className={`text-sm ${checkedItems.includes(item) ? 'text-green-400 line-through' : 'text-muted-foreground'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Essential Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safetyTips.map((tip, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Additional Notes & Observations</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record any specific site conditions, hazards identified, or additional safety measures required..."
            className="min-h-24 mb-4"
          />
          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export Assessment
            </Button>
            <Button variant="outline" className="flex-1">
              Save Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {completionRate < 100 && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Assessment Incomplete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You must complete all safety checks before proceeding with electrical work. 
              {safetyChecklist.reduce((total, cat) => total + cat.items.length, 0) - checkedItems.length} items remaining.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PreJobSafetyTab;
