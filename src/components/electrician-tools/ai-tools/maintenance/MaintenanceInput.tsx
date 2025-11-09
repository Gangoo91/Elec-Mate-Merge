import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Lightbulb, Sparkles, Zap, FileText } from "lucide-react";
import { MaintenanceInput as MaintenanceInputType } from "./useMaintenanceAdvisor";
import { Badge } from "@/components/ui/badge";

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
        <CardContent className="pt-6 px-4 sm:px-6">
          <div className="flex items-start gap-4 w-full">
            <div className="p-4 bg-elec-yellow/10 rounded-lg shrink-0">
              <Lightbulb className="h-8 w-8 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0 space-y-4">
              <h4 className="font-semibold text-white text-lg">How this works</h4>
              <p className="text-base text-white leading-relaxed break-words">
                Provide detailed equipment information and we'll generate a comprehensive maintenance schedule 
                based on BS 7671:2018+A3:2024 and GN3 guidance, including risk assessment, cost estimates, 
                and compliance checklist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => handleQuickFill('domestic')}
                  variant="outline"
                  className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:text-elec-yellow h-12 touch-manipulation w-full sm:w-auto"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Domestic Example
                </Button>
                <Button
                  onClick={() => handleQuickFill('commercial')}
                  variant="outline"
                  className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:text-elec-yellow h-12 touch-manipulation w-full sm:w-auto"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Commercial Example
                </Button>
                <Button
                  onClick={() => handleQuickFill('industrial')}
                  variant="outline"
                  className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:text-elec-yellow h-12 touch-manipulation w-full sm:w-auto"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
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
          <CardTitle className="text-white text-xl sm:text-2xl">Equipment Details</CardTitle>
          <CardDescription className="text-white text-base">
            The more information you provide, the better the maintenance plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Detail Level Toggle */}
          <div className="space-y-4 pb-5 border-b border-elec-gray/20">
            <Label className="text-white font-semibold text-base">Detail Level</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onInputChange({ detailLevel: 'quick' })}
                className={`p-5 rounded-xl border-2 transition-all touch-manipulation min-h-[88px] ${
                  input.detailLevel === 'quick'
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-elec-gray/30 hover:border-elec-yellow/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Zap className={`h-6 w-6 mt-0.5 ${input.detailLevel === 'quick' ? 'text-elec-yellow' : 'text-white'}`} />
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className={`font-semibold text-base ${input.detailLevel === 'quick' ? 'text-elec-yellow' : 'text-white'}`}>
                        Quick
                      </p>
                      <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">
                        20-45s
                      </Badge>
                    </div>
                    <p className="text-sm text-white">
                      Essential tasks, concise regulations, core failures
                    </p>
                  </div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => onInputChange({ detailLevel: 'full' })}
                className={`p-5 rounded-xl border-2 transition-all touch-manipulation min-h-[88px] ${
                  input.detailLevel === 'full'
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-elec-gray/30 hover:border-elec-yellow/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className={`h-6 w-6 mt-0.5 ${input.detailLevel === 'full' ? 'text-elec-yellow' : 'text-white'}`} />
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className={`font-semibold text-base ${input.detailLevel === 'full' ? 'text-elec-yellow' : 'text-white'}`}>
                        Full Detail
                      </p>
                      <Badge variant="outline" className="border-blue-400/30 text-blue-400 text-xs">
                        1-3m
                      </Badge>
                    </div>
                    <p className="text-sm text-white">
                      Detailed procedures, full regulations, comprehensive analysis
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Equipment Type */}
          <div className="space-y-3">
            <Label htmlFor="equipment-type" className="text-white font-semibold text-base">
              Equipment Type <span className="text-red-400">*</span>
            </Label>
            <Select value={input.equipmentType} onValueChange={(val) => onInputChange({ equipmentType: val })}>
              <SelectTrigger 
                id="equipment-type" 
                className="h-14 bg-elec-dark border-elec-gray/30 text-white text-base touch-manipulation"
                style={{ fontSize: '16px' }}
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
          <div className="space-y-3">
            <Label htmlFor="description" className="text-white font-semibold text-base">
              Equipment Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="E.g., 18th Edition RCBO consumer unit with 10 circuits, metal enclosure, surge protection included"
              value={input.equipmentDescription}
              onChange={(e) => onInputChange({ equipmentDescription: e.target.value })}
              className="min-h-[140px] bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 resize-none touch-manipulation text-base"
              style={{ fontSize: '16px' }}
              maxLength={1000}
            />
            <p className="text-sm text-white/70">{input.equipmentDescription.length}/1000 characters</p>
          </div>

          {/* Location & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="location" className="text-white font-semibold text-base">
                Location <span className="text-red-400">*</span>
              </Label>
              <Input
                id="location"
                placeholder="E.g., Main entrance hall"
                value={input.location}
                onChange={(e) => onInputChange({ location: e.target.value })}
                className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                style={{ fontSize: '16px' }}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="age" className="text-white font-semibold text-base">Age (Years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                placeholder="0"
                value={input.ageYears || ''}
                onChange={(e) => onInputChange({ ageYears: parseInt(e.target.value) || 0 })}
                className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Building Context */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-3">
              <Label htmlFor="building-type" className="text-white font-semibold text-base">Building Type</Label>
              <Select value={input.buildingType} onValueChange={(val: any) => onInputChange({ buildingType: val })}>
                <SelectTrigger id="building-type" className="h-14 bg-elec-dark border-elec-gray/30 text-white text-base touch-manipulation" style={{ fontSize: '16px' }}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="environment" className="text-white font-semibold text-base">Environment</Label>
              <Select value={input.environment} onValueChange={(val: any) => onInputChange({ environment: val })}>
                <SelectTrigger id="environment" className="h-14 bg-elec-dark border-elec-gray/30 text-white text-base touch-manipulation" style={{ fontSize: '16px' }}>
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

            <div className="space-y-3">
              <Label htmlFor="criticality" className="text-white font-semibold text-base">Criticality</Label>
              <Select value={input.criticality} onValueChange={(val: any) => onInputChange({ criticality: val })}>
                <SelectTrigger id="criticality" className="h-14 bg-elec-dark border-elec-gray/30 text-white text-base touch-manipulation" style={{ fontSize: '16px' }}>
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
            <summary className="cursor-pointer text-base font-semibold text-elec-yellow hover:text-elec-yellow/80 list-none flex items-center gap-2 touch-manipulation py-2">
              <span className="group-open:rotate-90 transition-transform">▶</span>
              Additional Details (Optional)
            </summary>
            <div className="mt-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="manufacturer" className="text-white font-semibold text-base">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    placeholder="E.g., Hager, Schneider"
                    value={input.manufacturer || ''}
                    onChange={(e) => onInputChange({ manufacturer: e.target.value })}
                    className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="model" className="text-white font-semibold text-base">Model Number</Label>
                  <Input
                    id="model"
                    placeholder="E.g., VML910CU"
                    value={input.modelNumber || ''}
                    onChange={(e) => onInputChange({ modelNumber: e.target.value })}
                    className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="last-inspection" className="text-white font-semibold text-base">Last Inspection Date</Label>
                  <Input
                    id="last-inspection"
                    type="date"
                    value={input.lastInspectionDate || ''}
                    onChange={(e) => onInputChange({ lastInspectionDate: e.target.value })}
                    className="h-14 bg-elec-dark border-elec-gray/30 text-white text-base touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="issues" className="text-white font-semibold text-base">Known Issues</Label>
                <Textarea
                  id="issues"
                  placeholder="Any known problems or concerns..."
                  value={input.currentIssues || ''}
                  onChange={(e) => onInputChange({ currentIssues: e.target.value })}
                  className="min-h-[100px] bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 resize-none touch-manipulation text-base"
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="client" className="text-white font-semibold text-base">Client Name</Label>
                  <Input
                    id="client"
                    placeholder="Client name"
                    value={input.clientName || ''}
                    onChange={(e) => onInputChange({ clientName: e.target.value })}
                    className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="assessor" className="text-white font-semibold text-base">Assessor Name</Label>
                  <Input
                    id="assessor"
                    placeholder="Your name"
                    value={input.assessorName || ''}
                    onChange={(e) => onInputChange({ assessorName: e.target.value })}
                    className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="site-address" className="text-white font-semibold text-base">Site Address</Label>
                <Input
                  id="site-address"
                  placeholder="Full site address"
                  value={input.siteAddress || ''}
                  onChange={(e) => onInputChange({ siteAddress: e.target.value })}
                  className="h-14 bg-elec-dark border-elec-gray/30 text-white placeholder:text-white/60 text-base touch-manipulation"
                  style={{ fontSize: '16px' }}
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
