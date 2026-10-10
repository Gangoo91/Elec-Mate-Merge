import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { StepHeader, Section, ChipChoice, TextField } from './wizardUi';

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
    <div className="space-y-8">
      <StepHeader
        title="Project details"
        description="Give the designer enough context to ground the design. The property type drives default load assumptions, voltage and three-phase logic."
      />

      <Section title="Installation type">
        <ChipChoice
          ariaLabel="Installation type"
          options={INSTALLATION_TYPES}
          value={installationType}
          onSelect={(v) => setInstallationType(v as ProjectInfoStepProps['installationType'])}
        />
      </Section>

      <Section title="Existing client">
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
      </Section>

      <Section title="Project information">
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6">
          <TextField
            label="Project name *"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., 24 Maple Drive Rewire"
          />

          <TextField
            label="Location *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Manchester, M1 1AA"
            hint="Property address or area"
          />

          <TextField
            label="Client name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., John Smith"
            hint="Optional, for your records"
          />

          <TextField
            label="Company or electrician"
            value={electricianName}
            onChange={(e) => setElectricianName(e.target.value)}
            placeholder="e.g., ABC Electrical Ltd"
            hint="Optional, appears on the design output"
          />
        </div>
      </Section>
    </div>
  );
};
