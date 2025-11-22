import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Building2, Factory } from "lucide-react";

interface ProjectInfoStepProps {
  projectName: string;
  setProjectName: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  clientName: string;
  setClientName: (value: string) => void;
  electricianName: string;
  setElectricianName: (value: string) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  setInstallationType: (value: 'domestic' | 'commercial' | 'industrial') => void;
}

const INSTALLATION_TYPES = [
  { value: 'domestic', label: 'Domestic', icon: Building, description: 'Houses, flats, small residential' },
  { value: 'commercial', label: 'Commercial', icon: Building2, description: 'Offices, shops, restaurants' },
  { value: 'industrial', label: 'Industrial', icon: Factory, description: 'Factories, warehouses, manufacturing' }
] as const;

export const ProjectInfoStep = ({
  projectName,
  setProjectName,
  location,
  setLocation,
  clientName,
  setClientName,
  electricianName,
  setElectricianName,
  installationType,
  setInstallationType
}: ProjectInfoStepProps) => {
  return (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      <div className="grid gap-2.5 sm:gap-3 md:gap-4">
        {/* Installation Type - Primary Selection */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-sm sm:text-base font-medium sm:font-semibold">Installation Type *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {INSTALLATION_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = installationType === type.value;
              return (
                <Card
                  key={type.value}
                  className={`p-3 sm:p-4 md:p-5 cursor-pointer transition-all touch-manipulation active:scale-98 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onClick={() => setInstallationType(type.value as any)}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium sm:font-semibold text-foreground text-sm sm:text-base">{type.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Project Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="project-name" className="text-sm sm:text-base font-medium sm:font-semibold">
            <span className="sm:hidden">Name *</span>
            <span className="hidden sm:inline">Project Name *</span>
          </Label>
          <MobileInput
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., 24 Maple Drive Rewire"
            className="text-base"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="location" className="text-sm sm:text-base font-medium sm:font-semibold">Location *</Label>
          <MobileInput
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Manchester, M1 1AA"
            className="text-base"
          />
        </div>

        {/* Client Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="client-name" className="text-sm sm:text-base font-medium sm:font-semibold">
            <span className="sm:hidden">Client (Optional)</span>
            <span className="hidden sm:inline">Client Name (Optional)</span>
          </Label>
          <MobileInput
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., John Smith"
            className="text-base"
          />
        </div>

        {/* Electrician Name */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="electrician-name" className="text-sm sm:text-base font-medium sm:font-semibold">
            <span className="sm:hidden">Company (Optional)</span>
            <span className="hidden sm:inline">Electrician/Company Name (Optional)</span>
          </Label>
          <MobileInput
            id="electrician-name"
            value={electricianName}
            onChange={(e) => setElectricianName(e.target.value)}
            placeholder="e.g., ABC Electrical Ltd"
            className="text-base"
          />
        </div>
      </div>
    </div>
  );
};
