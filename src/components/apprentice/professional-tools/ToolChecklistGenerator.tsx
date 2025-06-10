
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Download, FileText } from "lucide-react";
import { useState } from "react";

const ToolChecklistGenerator = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("first-year");
  const [selectedWorkType, setSelectedWorkType] = useState<string>("domestic");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toolLists = {
    "first-year": {
      essential: [
        "Insulation screwdrivers (set of 6)",
        "Side cutters/pliers",
        "Long nose pliers",
        "Wire strippers",
        "Adjustable spanner set",
        "Digital multimeter",
        "Non-contact voltage tester",
        "Torch/headlamp",
        "Cable knife",
        "Electrical tape",
        "Cable ties",
        "Spirit level",
        "Measuring tape",
        "Safety glasses",
        "Work gloves"
      ],
      recommended: [
        "Cordless drill/driver",
        "Junior hacksaw",
        "Adjustable wrench",
        "Socket set (metric)",
        "Crimping tool",
        "Cable detector",
        "First aid kit",
        "High-vis vest",
        "Safety boots",
        "Hard hat"
      ]
    },
    "second-year": {
      essential: [
        "Complete screwdriver set",
        "Professional pliers set",
        "Wire strippers (automatic)",
        "Spanner set (metric/imperial)",
        "Digital multimeter (CAT III)",
        "Voltage tester (proving unit)",
        "Insulation resistance tester",
        "Socket tester",
        "SDS drill",
        "Angle grinder",
        "Reciprocating saw",
        "Cable pulling system",
        "Conduit bender set",
        "Knockout set",
        "Full PPE kit"
      ],
      recommended: [
        "Clamp meter",
        "PAT tester (basic)",
        "Cable tracer",
        "Laser level",
        "Thermal imaging camera",
        "Impact driver",
        "Oscillating tool",
        "Van racking system",
        "Professional toolbox",
        "Test lead set"
      ]
    },
    "qualified": {
      essential: [
        "Professional tool kit (complete)",
        "Multifunction tester (MFT)",
        "Calibrated test equipment",
        "RCD tester",
        "Earth fault loop tester",
        "Phase rotation tester",
        "Professional power tools set",
        "Specialized hand tools",
        "Advanced PPE equipment",
        "Professional test leads",
        "Calibration certificates",
        "Tool testing equipment"
      ],
      recommended: [
        "Thermal imaging camera",
        "Power quality analyzer",
        "Cable fault locator",
        "Professional van fit-out",
        "Advanced safety equipment",
        "Specialized testing tools",
        "Professional documentation tools",
        "Advanced measuring equipment"
      ]
    }
  };

  const workTypeAdditions = {
    commercial: [
      "Larger conduit benders",
      "Cable pulling equipment",
      "Commercial socket testers",
      "Three-phase testing equipment"
    ],
    industrial: [
      "Heavy-duty power tools",
      "Industrial test equipment",
      "Specialized safety gear",
      "High-voltage rated tools",
      "Torque wrenches",
      "Bearing pullers"
    ],
    mixed: [
      "Versatile tool selection",
      "Portable equipment",
      "Multi-purpose testers",
      "Adaptable storage solutions"
    ]
  };

  const handleItemCheck = (item: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(item)) {
      newCheckedItems.delete(item);
    } else {
      newCheckedItems.add(item);
    }
    setCheckedItems(newCheckedItems);
  };

  const exportChecklist = () => {
    const selectedTools = toolLists[selectedLevel as keyof typeof toolLists];
    const additionalTools = workTypeAdditions[selectedWorkType as keyof typeof workTypeAdditions] || [];
    
    let checklist = `Professional Tool Checklist - ${selectedLevel} (${selectedWorkType})\n`;
    checklist += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    checklist += "ESSENTIAL TOOLS:\n";
    selectedTools.essential.forEach(tool => {
      const checked = checkedItems.has(tool) ? "✓" : "☐";
      checklist += `${checked} ${tool}\n`;
    });
    
    checklist += "\nRECOMMENDED TOOLS:\n";
    selectedTools.recommended.forEach(tool => {
      const checked = checkedItems.has(tool) ? "✓" : "☐";
      checklist += `${checked} ${tool}\n`;
    });
    
    if (additionalTools.length > 0) {
      checklist += `\n${selectedWorkType.toUpperCase()} SPECIFIC:\n`;
      additionalTools.forEach(tool => {
        const checked = checkedItems.has(tool) ? "✓" : "☐";
        checklist += `${checked} ${tool}\n`;
      });
    }
    
    const blob = new Blob([checklist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tool-checklist-${selectedLevel}-${selectedWorkType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedTools = toolLists[selectedLevel as keyof typeof toolLists];
  const additionalTools = workTypeAdditions[selectedWorkType as keyof typeof workTypeAdditions] || [];

  return (
    <Card className="border-blue-500/20 bg-blue-500/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-blue-400">Custom Tool Checklist Generator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Apprenticeship Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-year">First Year</SelectItem>
                  <SelectItem value="second-year">Second Year+</SelectItem>
                  <SelectItem value="qualified">Newly Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Work Type</label>
              <Select value={selectedWorkType} onValueChange={setSelectedWorkType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-3">Essential Tools</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedTools.essential.map((tool, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`essential-${index}`}
                      checked={checkedItems.has(tool)}
                      onCheckedChange={() => handleItemCheck(tool)}
                    />
                    <label htmlFor={`essential-${index}`} className="text-sm text-muted-foreground cursor-pointer">
                      {tool}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400 mb-3">Recommended Tools</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedTools.recommended.map((tool, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`recommended-${index}`}
                      checked={checkedItems.has(tool)}
                      onCheckedChange={() => handleItemCheck(tool)}
                    />
                    <label htmlFor={`recommended-${index}`} className="text-sm text-muted-foreground cursor-pointer">
                      {tool}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {additionalTools.length > 0 && (
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">{selectedWorkType} Specific Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {additionalTools.map((tool, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`additional-${index}`}
                      checked={checkedItems.has(tool)}
                      onCheckedChange={() => handleItemCheck(tool)}
                    />
                    <label htmlFor={`additional-${index}`} className="text-sm text-muted-foreground cursor-pointer">
                      {tool}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={exportChecklist} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export Checklist
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Print Version
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Progress: {checkedItems.size} / {selectedTools.essential.length + selectedTools.recommended.length + additionalTools.length} items selected
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolChecklistGenerator;
