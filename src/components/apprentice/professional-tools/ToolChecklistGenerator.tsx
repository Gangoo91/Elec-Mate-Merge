import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ToolChecklistGenerator = () => {
  const [projectType, setProjectType] = useState<string>('domestic');
  const [projectName, setProjectName] = useState<string>('');
  const [checklist, setChecklist] = useState<
    Array<{ id: string; tool: string; checked: boolean; essential: boolean }>
  >([]);

  const toolSuggestions = {
    domestic: [
      { tool: 'Voltage tester', essential: true },
      { tool: 'Screwdriver set', essential: true },
      { tool: 'Wire strippers', essential: true },
      { tool: 'Pliers set', essential: true },
      { tool: 'Multimeter', essential: true },
      { tool: 'Drill', essential: false },
      { tool: 'Cable detector', essential: false },
    ],
    commercial: [
      { tool: 'MFT (Multifunction tester)', essential: true },
      { tool: 'Insulation tester', essential: true },
      { tool: 'Cable puller', essential: true },
      { tool: 'SDS drill', essential: true },
      { tool: 'Angle grinder', essential: false },
      { tool: 'Conduit bender', essential: false },
    ],
    industrial: [
      { tool: 'High voltage detector', essential: true },
      { tool: 'Torque wrench', essential: true },
      { tool: 'Cable fault locator', essential: true },
      { tool: 'Thermal imaging camera', essential: false },
      { tool: 'Oscilloscope', essential: false },
    ],
  };

  const generateChecklist = () => {
    const suggestions = toolSuggestions[projectType as keyof typeof toolSuggestions] || [];
    const newChecklist = suggestions.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      tool: item.tool,
      checked: false,
      essential: item.essential,
    }));
    setChecklist(newChecklist);
  };

  const addCustomTool = () => {
    const newTool = {
      id: `custom-${Date.now()}`,
      tool: 'Custom tool',
      checked: false,
      essential: false,
    };
    setChecklist([...checklist, newTool]);
  };

  const updateTool = (id: string, field: string, value: any) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeTool = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const downloadChecklist = () => {
    const content =
      `${projectName || 'Tool Checklist'}\n\nProject Type: ${projectType}\n\n` +
      checklist
        .map(
          (item) =>
            `${item.checked ? '✓' : '☐'} ${item.tool}${item.essential ? ' (Essential)' : ''}`
        )
        .join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || 'tool-checklist'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Tool checklist generator
        </span>
        <p className="text-[13px] text-white/55">
          Create customised tool lists for any type of project
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-[13px] text-white/85">
              Project name
            </Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Kitchen rewire, Office lighting"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-type" className="text-[13px] text-white/85">
              Project type
            </Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                <SelectItem value="domestic">Domestic</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={generateChecklist}
            className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            Generate checklist
          </Button>
          <Button
            onClick={addCustomTool}
            variant="outline"
            className="h-11 w-11 p-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {checklist.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-white/[0.06]">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Your tool checklist
              </span>
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow transition-all"
                    style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] text-white/85 font-mono">
                  {completedCount}/{checklist.length}
                </span>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={(checked) => updateTool(item.id, 'checked', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Input
                    value={item.tool}
                    onChange={(e) => updateTool(item.id, 'tool', e.target.value)}
                    className={`flex-1 text-[14px] bg-transparent border-0 focus-visible:ring-0 ${
                      item.checked ? 'text-white/55 line-through' : 'text-white/85'
                    }`}
                  />
                  {item.essential && (
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      Essential
                    </span>
                  )}
                  <Button
                    onClick={() => removeTool(item.id)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white/55 hover:text-white hover:bg-white/[0.05]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              onClick={downloadChecklist}
              variant="outline"
              className="w-full h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Download className="h-4 w-4 mr-2" />
              Download checklist
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolChecklistGenerator;
