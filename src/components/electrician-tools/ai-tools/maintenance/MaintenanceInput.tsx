import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Loader2, Sparkles, FileText } from "lucide-react";
import { MaintenanceInput as MaintenanceInputType } from "./useMaintenanceAdvisor";
import { MobileInput } from "@/components/ui/mobile-input";
import { cn } from "@/lib/utils";
import { FormSection } from "./FormSection";
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { QuickFillExamplesGrid } from "./QuickFillExamplesGrid";

interface MaintenanceInputProps {
  input: MaintenanceInputType;
  onInputChange: (updates: Partial<MaintenanceInputType>) => void;
  onGenerate: () => void;
  isProcessing: boolean;
}

const EQUIPMENT_TYPES = [
  { value: 'consumer-unit', label: 'Consumer Unit' },
  { value: 'distribution-board', label: 'Distribution Board' },
  { value: 'lighting-circuit', label: 'Lighting Circuit' },
  { value: 'power-circuit', label: 'Power Circuit' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'fire-alarm', label: 'Fire Alarm System' },
  { value: 'ev-charger', label: 'EV Charger' },
  { value: 'solar-pv', label: 'Solar PV System' },
  { value: 'other', label: 'Other' }
];

const QUICK_FILL_DATA = {
  domestic: {
    equipmentType: 'consumer-unit',
    equipmentDescription: '18th Edition RCBO consumer unit with 10 circuits, metal enclosure, dual RCD protection',
    location: 'Main entrance hallway',
    ageYears: 5,
    buildingType: 'domestic' as const,
    environment: 'indoor' as const,
    criticality: 'standard' as const,
    manufacturer: 'Hager',
    modelNumber: 'VML910CU'
  },
  commercial: {
    equipmentType: 'distribution-board',
    equipmentDescription: '3-phase distribution board, 125A TPN incomer, MCCB protection, 16 outgoing ways',
    location: 'Main electrical room, ground floor',
    ageYears: 8,
    buildingType: 'commercial' as const,
    environment: 'indoor' as const,
    criticality: 'critical' as const,
    manufacturer: 'Schneider Electric',
    modelNumber: 'KQ125A'
  },
  industrial: {
    equipmentType: 'distribution-board',
    equipmentDescription: 'Industrial distribution board with motor protection, 400V 3-phase supply, IP65 rated enclosure',
    location: 'Factory floor, Zone 2',
    ageYears: 12,
    buildingType: 'industrial' as const,
    environment: 'outdoor' as const,
    criticality: 'life-safety' as const,
    manufacturer: 'ABB',
    modelNumber: 'MNS-iS'
  }
};

export const MaintenanceInput = ({
  input,
  onInputChange,
  onGenerate,
  isProcessing
}: MaintenanceInputProps) => {
  const handleQuickFill = (type: 'domestic' | 'commercial' | 'industrial') => {
    onInputChange(QUICK_FILL_DATA[type]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  const isFormValid = input.equipmentType && input.equipmentDescription && input.location;

  return (
    <form className="space-y-0" onSubmit={handleSubmit}>
      {/* Equipment Information - Primary Section */}
      <FormSection>
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Equipment Information
            <span className="text-muted-foreground ml-1">(required fields marked *)</span>
          </Label>
          
          {/* Equipment Type */}
          <div className="space-y-2">
            <Label htmlFor="equipment-type" className="text-sm font-medium">
              Equipment Type <span className="text-red-400">*</span>
            </Label>
            <Select value={input.equipmentType} onValueChange={(val) => onInputChange({ equipmentType: val })}>
              <SelectTrigger id="equipment-type" className="h-14 text-base" style={{ fontSize: '16px' }}>
                <SelectValue placeholder="Select equipment type" />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Equipment Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Equipment Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="E.g., 18th Edition RCBO consumer unit with 10 circuits, metal enclosure..."
              value={input.equipmentDescription}
              onChange={(e) => onInputChange({ equipmentDescription: e.target.value })}
              className="min-h-[120px] text-base resize-none"
              style={{ fontSize: '16px' }}
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-xs">
              <p className="text-muted-foreground">
                Include make, model, key specifications
              </p>
              <p className={cn(
                "font-medium",
                input.equipmentDescription.length > 100 
                  ? "text-yellow-400" 
                  : "text-muted-foreground"
              )}>
                {input.equipmentDescription.length} chars
              </p>
            </div>
          </div>
          
          {/* Location & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-red-400">*</span>
              </Label>
              <MobileInput
                id="location"
                placeholder="E.g., Main entrance hall"
                value={input.location}
                onChange={(e) => onInputChange({ location: e.target.value })}
                hint="Where equipment is installed"
              />
            </div>
            <MobileInput
              label="Age (Years)"
              type="number"
              min="0"
              placeholder="0"
              value={input.ageYears?.toString() || ''}
              onChange={(e) => onInputChange({ ageYears: parseInt(e.target.value) || 0 })}
            />
          </div>
          
          {/* Building Context - 3 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="building-type" className="text-sm font-medium">Building Type</Label>
              <Select value={input.buildingType} onValueChange={(val: any) => onInputChange({ buildingType: val })}>
                <SelectTrigger id="building-type" className="h-14 text-base" style={{ fontSize: '16px' }}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="environment" className="text-sm font-medium">Environment</Label>
              <Select value={input.environment} onValueChange={(val: any) => onInputChange({ environment: val })}>
                <SelectTrigger id="environment" className="h-14 text-base" style={{ fontSize: '16px' }}>
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
              <Label htmlFor="criticality" className="text-sm font-medium">Criticality</Label>
              <Select value={input.criticality} onValueChange={(val: any) => onInputChange({ criticality: val })}>
                <SelectTrigger id="criticality" className="h-14 text-base" style={{ fontSize: '16px' }}>
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
        </div>
      </FormSection>
      
      {/* Quick Fill Examples - Collapsed */}
      <CollapsibleFormSection 
        title="Quick Fill Examples" 
        subtitle="Load sample data for common scenarios"
        badge="optional"
        icon={<Sparkles className="h-5 w-5" />}
        defaultOpen={false}
      >
        <QuickFillExamplesGrid 
          onSelect={handleQuickFill}
        />
      </CollapsibleFormSection>
      
      {/* Additional Details - Collapsed */}
      <CollapsibleFormSection 
        title="Additional Details" 
        subtitle="Manufacturer, model, inspection history"
        badge="optional"
        icon={<FileText className="h-5 w-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MobileInput
              label="Manufacturer"
              placeholder="E.g., Hager, Schneider"
              value={input.manufacturer || ''}
              onChange={(e) => onInputChange({ manufacturer: e.target.value })}
            />
            <MobileInput
              label="Model Number"
              placeholder="E.g., VML910CU"
              value={input.modelNumber || ''}
              onChange={(e) => onInputChange({ modelNumber: e.target.value })}
            />
          </div>
          
          <MobileInput
            label="Last Inspection Date"
            type="date"
            value={input.lastInspectionDate || ''}
            onChange={(e) => onInputChange({ lastInspectionDate: e.target.value })}
          />
          
          <div className="space-y-2">
            <Label htmlFor="issues" className="text-sm font-medium">Known Issues</Label>
            <Textarea
              id="issues"
              placeholder="Any known problems or concerns..."
              value={input.currentIssues || ''}
              onChange={(e) => onInputChange({ currentIssues: e.target.value })}
              className="min-h-[100px] text-base resize-none"
              style={{ fontSize: '16px' }}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MobileInput
              label="Client Name"
              placeholder="Client name"
              value={input.clientName || ''}
              onChange={(e) => onInputChange({ clientName: e.target.value })}
            />
            <MobileInput
              label="Assessor Name"
              placeholder="Your name"
              value={input.assessorName || ''}
              onChange={(e) => onInputChange({ assessorName: e.target.value })}
            />
          </div>
          
          <MobileInput
            label="Site Address"
            placeholder="Full site address"
            value={input.siteAddress || ''}
            onChange={(e) => onInputChange({ siteAddress: e.target.value })}
          />
        </div>
      </CollapsibleFormSection>
      
      {/* Generate Button - Inline */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!isFormValid || isProcessing}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-elec-dark h-12 sm:h-14 touch-manipulation text-base sm:text-lg font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5 mr-2" />
              Generate Maintenance Plan
            </>
          )}
        </Button>
      </FormSection>
    </form>
  );
};
