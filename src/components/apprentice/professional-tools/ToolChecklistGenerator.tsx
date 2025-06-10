
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Download, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const ToolChecklistGenerator = () => {
  const [projectType, setProjectType] = useState<string>("domestic");
  const [projectName, setProjectName] = useState<string>("");
  const [checklist, setChecklist] = useState<Array<{id: string, tool: string, checked: boolean, essential: boolean}>>([]);

  const toolSuggestions = {
    domestic: [
      { tool: "Voltage tester", essential: true },
      { tool: "Screwdriver set", essential: true },
      { tool: "Wire strippers", essential: true },
      { tool: "Pliers set", essential: true },
      { tool: "Multimeter", essential: true },
      { tool: "Drill", essential: false },
      { tool: "Cable detector", essential: false }
    ],
    commercial: [
      { tool: "MFT (Multifunction tester)", essential: true },
      { tool: "Insulation tester", essential: true },
      { tool: "Cable puller", essential: true },
      { tool: "SDS drill", essential: true },
      { tool: "Angle grinder", essential: false },
      { tool: "Conduit bender", essential: false }
    ],
    industrial: [
      { tool: "High voltage detector", essential: true },
      { tool: "Torque wrench", essential: true },
      { tool: "Cable fault locator", essential: true },
      { tool: "Thermal imaging camera", essential: false },
      { tool: "Oscilloscope", essential: false }
    ]
  };

  const generateChecklist = () => {
    const suggestions = toolSuggestions[projectType as keyof typeof toolSuggestions] || [];
    const newChecklist = suggestions.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      tool: item.tool,
      checked: false,
      essential: item.essential
    }));
    setChecklist(newChecklist);
  };

  const addCustomTool = () => {
    const newTool = {
      id: `custom-${Date.now()}`,
      tool: "Custom tool",
      checked: false,
      essential: false
    };
    setChecklist([...checklist, newTool]);
  };

  const updateTool = (id: string, field: string, value: any) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeTool = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const downloadChecklist = () => {
    const content = `${projectName || 'Tool Checklist'}\n\nProject Type: ${projectType}\n\n` +
      checklist.map(item => `${item.checked ? '✓' : '☐'} ${item.tool}${item.essential ? ' (Essential)' : ''}`).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || 'tool-checklist'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-blue-500/20 bg-blue-500/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-blue-400">Tool Checklist Generator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Kitchen rewire, Office lighting"
              />
            </div>
            
            <div>
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={generateChecklist} className="flex-1">
              Generate Checklist
            </Button>
            <Button onClick={addCustomTool} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {checklist.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-white">Your Tool Checklist</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-blue-500/5 rounded-lg">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) => updateTool(item.id, 'checked', checked)}
                    />
                    <Input
                      value={item.tool}
                      onChange={(e) => updateTool(item.id, 'tool', e.target.value)}
                      className="flex-1 text-sm"
                    />
                    {item.essential && (
                      <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded">
                        Essential
                      </span>
                    )}
                    <Button
                      onClick={() => removeTool(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button onClick={downloadChecklist} className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Checklist
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolChecklistGenerator;
