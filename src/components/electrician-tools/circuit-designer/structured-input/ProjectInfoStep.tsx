import { IOSInput } from '@/components/ui/ios-input';
import { cn } from '@/lib/utils';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { Eyebrow } from '@/components/college/primitives';

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
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const INSTALLATION_TYPES = [
  {
    value: 'domestic',
    label: 'Domestic',
    description: 'Houses, flats, residential',
  },
  {
    value: 'commercial',
    label: 'Commercial',
    description: 'Offices, shops, restaurants',
  },
  {
    value: 'industrial',
    label: 'Industrial',
    description: 'Factories, warehouses',
  },
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
  setInstallationType,
  customerId,
  onCustomerIdChange,
}: ProjectInfoStepProps) => {
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>01 · PROJECT</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Project details.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          Give the designer enough context to ground the design — the property type drives default
          load assumptions, voltage and three-phase logic.
        </p>
      </div>

      {/* Installation Type Selection — editorial grid, no icons */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Installation type *
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {INSTALLATION_TYPES.length} options
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {INSTALLATION_TYPES.map((type, i) => {
            const isSelected = installationType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setInstallationType(type.value)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] border rounded-2xl px-4 py-5 sm:px-6 sm:py-6 flex flex-col text-left touch-manipulation transition-all min-h-[110px]',
                  'hover:bg-elec-yellow/[0.04] active:scale-[0.99]',
                  isSelected
                    ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                    : 'border-white/[0.10] hover:border-white/20'
                )}
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                      isSelected ? 'text-elec-yellow' : 'text-white/50'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div
                  className={cn(
                    'mt-2 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-[1.15]',
                    isSelected ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {type.label}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-white/70">
                  {type.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Client selector */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Existing client
        </span>
        <ClientSelector
          onSelectCustomer={(customer: Customer | null) => {
            if (customer) {
              setClientName(customer.name);
              if (customer.address) setLocation(customer.address);
              onCustomerIdChange?.(customer.id);
            } else {
              onCustomerIdChange?.(undefined);
            }
          }}
          selectedCustomerId={customerId}
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Project information
        </span>
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
            hint="Optional — for your records"
          />

          <IOSInput
            label="Company / Electrician"
            value={electricianName}
            onChange={(e) => setElectricianName(e.target.value)}
            placeholder="e.g., ABC Electrical Ltd"
            hint="Optional — appears on the design output"
          />
        </div>
      </div>
    </div>
  );
};
