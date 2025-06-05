
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EnhancedCableSizingInputs, EnhancedCableSizingErrors } from "./useEnhancedCableSizing";
import { industryTemplates } from "./enhancedCableSizeData";
import { Building, Factory, Hospital, School, Home, Zap, Thermometer, Users, Settings } from "lucide-react";

interface EnhancedCableSizingFormProps {
  inputs: EnhancedCableSizingInputs;
  errors: EnhancedCableSizingErrors;
  updateInput: (field: keyof EnhancedCableSizingInputs, value: string) => void;
  applyTemplate: (templateId: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
  currentProject: string;
  setCurrentProject: (name: string) => void;
}

const EnhancedCableSizingForm = ({
  inputs,
  errors,
  updateInput,
  applyTemplate,
  calculateCableSize,
  resetCalculator,
  currentProject,
  setCurrentProject
}: EnhancedCableSizingFormProps) => {

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'residential': return Home;
      case 'commercial': return Building;
      case 'industrial': return Factory;
      case 'healthcare': return Hospital;
      case 'education': return School;
      default: return Building;
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Project Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input 
              id="project-name" 
              placeholder="Enter project name" 
              className="bg-elec-dark border-elec-yellow/20"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Industry Templates */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Industry Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {industryTemplates.map((template) => {
              const Icon = getTemplateIcon(template.id);
              return (
                <Button
                  key={template.id}
                  variant={inputs.template === template.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyTemplate(template.id)}
                  className={`justify-start h-auto p-3 ${
                    inputs.template === template.id ? 'bg-elec-yellow text-black' : ''
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs opacity-75">{template.industry}</div>
                  </div>
                </Button>
              );
            })}
          </div>
          {inputs.template && (
            <div className="mt-3 p-3 bg-elec-dark rounded-md">
              <div className="text-sm text-muted-foreground">
                {industryTemplates.find(t => t.id === inputs.template)?.description}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {industryTemplates.find(t => t.id === inputs.template)?.complianceStandards.map(standard => (
                  <Badge key={standard} variant="outline" className="text-xs">
                    {standard}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Calculator Inputs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="environmental" className="flex items-center gap-1">
            <Thermometer className="h-3 w-3" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="installation" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            Installation
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current">Design Current (A)</Label>
              <Input 
                id="current" 
                type="number" 
                placeholder="Enter load current" 
                className="bg-elec-dark border-elec-yellow/20"
                value={inputs.current}
                onChange={(e) => updateInput('current', e.target.value)}
              />
              {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cable-length">Cable Length (m)</Label>
              <Input 
                id="cable-length" 
                type="number" 
                placeholder="Enter cable length" 
                className="bg-elec-dark border-elec-yellow/20"
                value={inputs.length}
                onChange={(e) => updateInput('length', e.target.value)}
              />
              {errors.length && <p className="text-xs text-destructive">{errors.length}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cable Type</Label>
            <Select 
              value={inputs.cableType} 
              onValueChange={(value) => updateInput('cableType', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select cable type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twin-and-earth">Twin and Earth</SelectItem>
                <SelectItem value="swa">Steel Wire Armored (SWA)</SelectItem>
                <SelectItem value="lsf">Low Smoke and Fume (LSF)</SelectItem>
                <SelectItem value="micc">Mineral Insulated (MICC)</SelectItem>
                <SelectItem value="fplsoh">FP LSoH</SelectItem>
                <SelectItem value="data">Data Cable</SelectItem>
                <SelectItem value="fire-alarm">Fire Alarm Cable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Select 
                value={inputs.voltage} 
                onValueChange={(value) => updateInput('voltage', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voltage-drop">Max Voltage Drop (%)</Label>
              <Select 
                value={inputs.voltageDrop} 
                onValueChange={(value) => updateInput('voltageDrop', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3% (Lighting)</SelectItem>
                  <SelectItem value="5">5% (Other Uses)</SelectItem>
                  <SelectItem value="2.5">2.5% (Critical Systems)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ambient-temperature">Ambient Temperature (°C)</Label>
              <Input 
                id="ambient-temperature" 
                type="number" 
                placeholder="30" 
                className="bg-elec-dark border-elec-yellow/20"
                value={inputs.ambientTemperature}
                onChange={(e) => updateInput('ambientTemperature', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grouping-factor">Grouping Factor</Label>
              <Select 
                value={inputs.groupingFactor} 
                onValueChange={(value) => updateInput('groupingFactor', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1.0 (Single circuit)</SelectItem>
                  <SelectItem value="0.8">0.8 (2-3 circuits)</SelectItem>
                  <SelectItem value="0.7">0.7 (4-6 circuits)</SelectItem>
                  <SelectItem value="0.65">0.65 (7-9 circuits)</SelectItem>
                  <SelectItem value="0.6">0.6 (10+ circuits)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Environment</Label>
            <Select 
              value={inputs.environment} 
              onValueChange={(value) => updateInput('environment', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indoor-dry">Indoor Dry</SelectItem>
                <SelectItem value="indoor-damp">Indoor Damp</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="underground">Underground</SelectItem>
                <SelectItem value="corrosive">Corrosive Environment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Installation Method</Label>
            <Select 
              value={inputs.installationMethod} 
              onValueChange={(value) => updateInput('installationMethod', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                <SelectItem value="in-conduit">In Conduit</SelectItem>
                <SelectItem value="in-trunking">In Trunking</SelectItem>
                <SelectItem value="on-tray">On Tray</SelectItem>
                <SelectItem value="direct-buried">Direct Buried</SelectItem>
                <SelectItem value="in-duct">In Duct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="installation" className="space-y-4">
          <div className="space-y-2">
            <Label>Cable Insulation Type</Label>
            <RadioGroup 
              value={inputs.installationType} 
              onValueChange={(value: "pvc" | "xlpe" | "epr") => updateInput('installationType', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pvc" id="pvc" />
                <Label htmlFor="pvc">PVC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xlpe" id="xlpe" />
                <Label htmlFor="xlpe">XLPE</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="epr" id="epr" />
                <Label htmlFor="epr">EPR</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Load Type</Label>
            <Select 
              value={inputs.loadType} 
              onValueChange={(value) => updateInput('loadType', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resistive">Resistive (Heating, Lighting)</SelectItem>
                <SelectItem value="inductive">Inductive (Motors, Transformers)</SelectItem>
                <SelectItem value="electronic">Electronic (IT Equipment)</SelectItem>
                <SelectItem value="mixed">Mixed Load</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="future-expansion">Future Expansion (%)</Label>
              <Input 
                id="future-expansion" 
                type="number" 
                placeholder="25" 
                className="bg-elec-dark border-elec-yellow/20"
                value={inputs.futureExpansion}
                onChange={(e) => updateInput('futureExpansion', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Additional capacity for future loads</p>
            </div>

            <div className="space-y-2">
              <Label>MCB Type</Label>
              <Select 
                value={inputs.mcbType} 
                onValueChange={(value) => updateInput('mcbType', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type-b">Type B (3-5 x In)</SelectItem>
                  <SelectItem value="type-c">Type C (5-10 x In)</SelectItem>
                  <SelectItem value="type-d">Type D (10-20 x In)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Earthing System</Label>
            <Select 
              value={inputs.earthingSystem} 
              onValueChange={(value) => updateInput('earthingSystem', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tn-s">TN-S</SelectItem>
                <SelectItem value="tn-c-s">TN-C-S</SelectItem>
                <SelectItem value="tt">TT</SelectItem>
                <SelectItem value="it">IT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Harmonics</Label>
            <Select 
              value={inputs.harmonics} 
              onValueChange={(value) => updateInput('harmonics', value)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None/Minimal</SelectItem>
                <SelectItem value="moderate">Moderate (Office equipment)</SelectItem>
                <SelectItem value="high">High (Data centres, LED lighting)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex space-x-3 pt-4">
        <Button onClick={calculateCableSize} className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Calculate Cable Size
        </Button>
        <Button variant="outline" onClick={resetCalculator} className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingForm;
