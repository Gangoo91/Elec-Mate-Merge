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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Project Information</h2>
        <p className="text-muted-foreground">Start by telling us about your installation project</p>
      </div>

      <div className="grid gap-4">
        {/* Installation Type - Primary Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Installation Type *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INSTALLATION_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = installationType === type.value;
              return (
                <Card
                  key={type.value}
                  className={`p-4 cursor-pointer transition-all touch-manipulation ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onClick={() => setInstallationType(type.value as any)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{type.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-base font-semibold">Project Name *</Label>
          <MobileInput
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., 24 Maple Drive Rewire"
            className="text-base"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-semibold">Location *</Label>
          <MobileInput
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Manchester, M1 1AA"
            className="text-base"
          />
        </div>

        {/* Client Name */}
        <div className="space-y-2">
          <Label htmlFor="client-name" className="text-base">Client Name (Optional)</Label>
          <MobileInput
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., John Smith"
            className="text-base"
          />
        </div>

        {/* Electrician Name */}
        <div className="space-y-2">
          <Label htmlFor="electrician-name" className="text-base">Electrician/Company Name (Optional)</Label>
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
