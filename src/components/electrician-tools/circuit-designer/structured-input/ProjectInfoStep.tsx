import { IOSInput } from "@/components/ui/ios-input";
import { Building, Building2, Factory, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { value: 'domestic', label: 'Domestic', icon: Building, description: 'Houses, flats, residential' },
  { value: 'commercial', label: 'Commercial', icon: Building2, description: 'Offices, shops, restaurants' },
  { value: 'industrial', label: 'Industrial', icon: Factory, description: 'Factories, warehouses' }
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
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
          <FolderOpen className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Project Details</h2>
          <p className="text-sm text-white/50">Basic information about your installation</p>
        </div>
      </div>

      {/* Installation Type Selection */}
      <div className="space-y-3">
        <label className="block text-ios-subhead font-medium text-white/80">
          Installation Type *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INSTALLATION_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = installationType === type.value;
            return (
              <div
                key={type.value}
                className={cn(
                  "relative p-4 rounded-xl cursor-pointer",
                  "bg-white/[0.03] border-2",
                  "transition-all duration-ios-normal ease-ios-ease",
                  "touch-manipulation active:scale-[0.98]",
                  isSelected
                    ? "border-elec-yellow bg-elec-yellow/10 shadow-[0_0_0_4px_hsl(var(--elec-yellow)/0.1)]"
                    : "border-white/[0.08] hover:border-white/15 hover:bg-white/5"
                )}
                onClick={() => setInstallationType(type.value as any)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-colors duration-ios-fast",
                      isSelected
                        ? "bg-elec-yellow text-black"
                        : "bg-white/10 text-white/60"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "font-semibold transition-colors duration-ios-fast",
                        isSelected ? "text-elec-yellow" : "text-white"
                      )}
                    >
                      {type.label}
                    </div>
                    <div className="text-xs text-white/50 mt-0.5">
                      {type.description}
                    </div>
                  </div>
                </div>
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <IOSInput
          label="Project Name *"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g., 24 Maple Drive Rewire"
        />

        <IOSInput
          label="Location *"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Manchester, M1 1AA"
          hint="Property address or area"
        />

        <IOSInput
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g., John Smith"
          hint="Optional - for your records"
        />

        <IOSInput
          label="Company / Electrician"
          value={electricianName}
          onChange={(e) => setElectricianName(e.target.value)}
          placeholder="e.g., ABC Electrical Ltd"
          hint="Optional - appears on design output"
        />
      </div>
    </div>
  );
};
