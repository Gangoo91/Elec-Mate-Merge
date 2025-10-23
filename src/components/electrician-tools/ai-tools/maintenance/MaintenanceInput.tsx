import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Lightbulb, Sparkles } from "lucide-react";
import { MaintenanceInput as MaintenanceInputType } from "./useMaintenanceAdvisor";

interface MaintenanceInputProps {
  input: MaintenanceInputType;
  onInputChange: (updates: Partial<MaintenanceInputType>) => void;
  onGenerate: () => void;
  isProcessing: boolean;
}

export const MaintenanceInput = ({
  input,
  onInputChange,
  onGenerate,
  isProcessing,
}: MaintenanceInputProps) => {
  const handleQuickFill = (type: 'domestic' | 'commercial' | 'industrial') => {
    const examples = {
      domestic: {
        equipmentType: 'consumer-unit',
        equipmentDescription: '18th Edition RCBO consumer unit with 10 circuits, metal enclosure, surge protection included',
        location: 'Main entrance hall',
        ageYears: 3,
        buildingType: 'domestic' as const,
        environment: 'indoor' as const,
        criticality: 'standard' as const,
      },
      commercial: {
        equipmentType: 'distribution-board',
        equipmentDescription: '3-phase distribution board, 24-way, with metering and residual current protection',
        location: 'Ground floor electrical room',
        ageYears: 7,
        buildingType: 'commercial' as const,
        environment: 'indoor' as const,
        criticality: 'critical' as const,
      },
      industrial: {
        equipmentType: 'distribution-board',
        equipmentDescription: 'Industrial distribution board with contactors, isolators, and motor protection',
        location: 'Factory production area',
        ageYears: 12,
        buildingType: 'industrial' as const,
        environment: 'damp' as const,
        criticality: 'critical' as const,
      },
    };
    
    onInputChange(examples[type]);
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="border-elec-yellow/20 bg-elec-card/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-elec-yellow/10 rounded-lg shrink-0">
              <Lightbulb className="h-6 w-6 text-elec-yellow" />
            </div>
            <div className="flex-1 space-y-3">
              <h4 className="font-semibold text-elec-light">How this works</h4>
              <p className="text-sm text-elec-light/70">
                Provide detailed equipment information and we'll generate a comprehensive maintenance schedule 
                based on BS 7671:2018+A3:2024 and GN3 guidance, including risk assessment, cost estimates, 
                and compliance checklist.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleQuickFill('domestic')}
                  variant="outline"
                  size="sm"
                  className="border-elec-gray/30 text-elec-light/80 hover:bg-elec-dark/50 hover:text-elec-yellow"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Domestic Example
                </Button>
                <Button
                  onClick={() => handleQuickFill('commercial')}
                  variant="outline"
                  size="sm"
                  className="border-elec-gray/30 text-elec-light/80 hover:bg-elec-dark/50 hover:text-elec-yellow"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Commercial Example
                </Button>
                <Button
                  onClick={() => handleQuickFill('industrial')}
                  variant="outline"
                  size="sm"
                  className="border-elec-gray/30 text-elec-light/80 hover:bg-elec-dark/50 hover:text-elec-yellow"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  Industrial Example
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Input Form */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-elec-light">Equipment Details</CardTitle>
          <CardDescription className="text-elec-light/60">
            The more information you provide, the better the maintenance plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Equipment Type */}
          <div className="space-y-2">
            <Label htmlFor="equipment-type" className="text-elec-light font-medium">
              Equipment Type <span className="text-red-400">*</span>
            </Label>
            <Select value={input.equipmentType} onValueChange={(val) => onInputChange({ equipmentType: val })}>
              <SelectTrigger 
                id="equipment-type" 
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
              >
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consumer-unit">Consumer Unit</SelectItem>
                <SelectItem value="distribution-board">Distribution Board</SelectItem>
                <SelectItem value="lighting-circuit">Lighting Circuit</SelectItem>
                <SelectItem value="power-circuit">Power Circuit</SelectItem>
                <SelectItem value="emergency-lighting">Emergency Lighting</SelectItem>
                <SelectItem value="fire-alarm">Fire Alarm System</SelectItem>
                <SelectItem value="ev-charger">EV Charger</SelectItem>
                <SelectItem value="solar-pv">Solar PV System</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Equipment Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-elec-light font-medium">
              Equipment Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="E.g., 18th Edition RCBO consumer unit with 10 circuits, metal enclosure, surge protection included"
              value={input.equipmentDescription}
              onChange={(e) => onInputChange({ equipmentDescription: e.target.value })}
              className="min-h-[100px] bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40 resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-elec-light/50">{input.equipmentDescription.length}/1000 characters</p>
          </div>

          {/* Location & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-elec-light font-medium">
                Location <span className="text-red-400">*</span>
              </Label>
              <Input
                id="location"
                placeholder="E.g., Main entrance hall"
                value={input.location}
                onChange={(e) => onInputChange({ location: e.target.value })}
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-elec-light font-medium">Age (Years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                placeholder="0"
                value={input.ageYears || ''}
                onChange={(e) => onInputChange({ ageYears: parseInt(e.target.value) || 0 })}
                className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40"
              />
            </div>
          </div>

          {/* Building Context */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="building-type" className="text-elec-light font-medium">Building Type</Label>
              <Select value={input.buildingType} onValueChange={(val: any) => onInputChange({ buildingType: val })}>
                <SelectTrigger id="building-type" className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="environment" className="text-elec-light font-medium">Environment</Label>
              <Select value={input.environment} onValueChange={(val: any) => onInputChange({ environment: val })}>
                <SelectTrigger id="environment" className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="damp">Damp</SelectItem>
                  <SelectItem value="corrosive">Corrosive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="criticality" className="text-elec-light font-medium">Criticality</Label>
              <Select value={input.criticality} onValueChange={(val: any) => onInputChange({ criticality: val })}>
                <SelectTrigger id="criticality" className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="life-safety">Life Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optional Details - Collapsible */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-elec-yellow hover:text-elec-yellow/80 list-none flex items-center gap-2">
              <span className="group-open:rotate-90 transition-transform">▶</span>
              Additional Details (Optional)
            </summary>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer" className="text-elec-light font-medium">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    placeholder="E.g., Hager, Schneider"
                    value={input.manufacturer || ''}
                    onChange={(e) => onInputChange({ manufacturer: e.target.value })}
                    className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model" className="text-elec-light font-medium">Model Number</Label>
                  <Input
                    id="model"
                    placeholder="E.g., VML910CU"
                    value={input.modelNumber || ''}
                    onChange={(e) => onInputChange({ modelNumber: e.target.value })}
                    className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-inspection" className="text-elec-light font-medium">Last Inspection Date</Label>
                  <Input
                    id="last-inspection"
                    type="date"
                    value={input.lastInspectionDate || ''}
                    onChange={(e) => onInputChange({ lastInspectionDate: e.target.value })}
                    className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issues" className="text-elec-light font-medium">Known Issues</Label>
                <Textarea
                  id="issues"
                  placeholder="Any known problems or concerns..."
                  value={input.currentIssues || ''}
                  onChange={(e) => onInputChange({ currentIssues: e.target.value })}
                  className="min-h-[80px] bg-elec-dark border-elec-gray/30 text-elec-light placeholder:text-elec-light/40 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client" className="text-elec-light font-medium">Client Name</Label>
                  <Input
                    id="client"
                    placeholder="Client name"
                    value={input.clientName || ''}
                    onChange={(e) => onInputChange({ clientName: e.target.value })}
                    className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assessor" className="text-elec-light font-medium">Assessor Name</Label>
                  <Input
                    id="assessor"
                    placeholder="Your name"
                    value={input.assessorName || ''}
                    onChange={(e) => onInputChange({ assessorName: e.target.value })}
                    className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-address" className="text-elec-light font-medium">Site Address</Label>
                <Input
                  id="site-address"
                  placeholder="Full site address"
                  value={input.siteAddress || ''}
                  onChange={(e) => onInputChange({ siteAddress: e.target.value })}
                  className="h-11 bg-elec-dark border-elec-gray/30 text-elec-light"
                />
              </div>
            </div>
          </details>

          {/* Generate Button */}
          <Button
            onClick={onGenerate}
            disabled={isProcessing || !input.equipmentType || !input.equipmentDescription || !input.location}
            className="w-full h-12 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 hover:from-elec-yellow/90 hover:to-elec-yellow/70 text-elec-dark font-semibold text-base"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Generate Maintenance Plan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
