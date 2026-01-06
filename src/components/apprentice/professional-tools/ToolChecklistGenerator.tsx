
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Download, Plus, Trash2, Sparkles, ListChecks } from "lucide-react";
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

  const completedCount = checklist.filter(item => item.checked).length;

  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <CheckSquare className="h-5 w-5 text-blue-400" />
          </div>
          Tool Checklist Generator
        </CardTitle>
        <p className="text-sm text-white/60">
          Create customised tool lists for any type of project
        </p>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-white/70">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Kitchen rewire, Office lighting"
                className="bg-white/10 border-white/20 focus:border-blue-500/50 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-type" className="text-white/70">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="bg-white/10 border-white/20 h-11">
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
            <Button
              onClick={generateChecklist}
              className="flex-1 h-11 bg-blue-500 hover:bg-blue-500/90 text-white touch-manipulation active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Checklist
            </Button>
            <Button
              onClick={addCustomTool}
              variant="outline"
              className="h-11 w-11 border-white/20 hover:border-blue-500/50 hover:bg-blue-500/10 touch-manipulation active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {checklist.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-blue-400" />
                  <h4 className="font-semibold text-white">Your Tool Checklist</h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                    />
                  </div>
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                    {completedCount}/{checklist.length}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      item.checked
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-white/10 border-white/10 hover:border-blue-500/30'
                    }`}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={(checked) => updateTool(item.id, 'checked', checked)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Input
                      value={item.tool}
                      onChange={(e) => updateTool(item.id, 'tool', e.target.value)}
                      className={`flex-1 text-sm bg-transparent border-0 focus-visible:ring-0 ${
                        item.checked ? 'text-white/80 line-through' : 'text-white'
                      }`}
                    />
                    {item.essential && (
                      <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400 text-xs">
                        Essential
                      </Badge>
                    )}
                    <Button
                      onClick={() => removeTool(item.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                onClick={downloadChecklist}
                className="w-full h-11 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 touch-manipulation active:scale-95 transition-all"
                variant="outline"
              >
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
