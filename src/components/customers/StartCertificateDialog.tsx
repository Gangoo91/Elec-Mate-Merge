import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useCustomerProperties } from '@/hooks/inspection/useCustomerProperties';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StartCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
}

type ActionType =
  | 'eicr'
  | 'eic'
  | 'minor-works'
  | 'fire-alarm'
  | 'emergency-lighting'
  | 'ev-charging'
  | 'solar-pv'
  | 'quote'
  | 'invoice'
  | 'site-visit'
  | 'rams'
  | 'cost-engineer'
  | 'circuit-designer'
  | 'installation-specialist'
  | 'commissioning'
  | 'maintenance';

const STANDALONE_CERT_TYPES: ActionType[] = [
  'fire-alarm',
  'emergency-lighting',
  'ev-charging',
  'solar-pv',
];

const PROJECT_TYPES = [
  'Rewire',
  'EICR',
  'New Build',
  'Consumer Unit',
  'Maintenance',
  'EV Charging',
  'Fire Alarm',
  'Lighting',
  'Commercial',
  'Other',
];

const actionTypes: {
  value: ActionType;
  label: string;
  description: string;
  group: 'certificate' | 'business' | 'job' | 'ai';
}[] = [
  {
    value: 'site-visit',
    label: 'Site Visit',
    description: 'Pre-site survey & scope',
    group: 'job',
  },
  {
    value: 'rams',
    label: 'RAMS',
    description: 'Risk assessment & method statement',
    group: 'job',
  },
  {
    value: 'quote',
    label: 'New Quote',
    description: 'Create a quote',
    group: 'business',
  },
  {
    value: 'invoice',
    label: 'New Invoice',
    description: 'Create an invoice',
    group: 'business',
  },
  {
    value: 'cost-engineer',
    label: 'Cost Engineer',
    description: 'AI cost analysis',
    group: 'ai',
  },
  {
    value: 'circuit-designer',
    label: 'Circuit Designer',
    description: 'AI circuit design',
    group: 'ai',
  },
  {
    value: 'installation-specialist',
    label: 'Installation',
    description: 'AI method statement',
    group: 'ai',
  },
  {
    value: 'commissioning',
    label: 'Commissioning',
    description: 'AI testing & commissioning',
    group: 'ai',
  },
  {
    value: 'maintenance',
    label: 'Maintenance',
    description: 'AI maintenance instructions',
    group: 'ai',
  },
  {
    value: 'eicr',
    label: 'EICR',
    description: 'Electrical Installation Condition Report',
    group: 'certificate',
  },
  {
    value: 'eic',
    label: 'EIC',
    description: 'Electrical Installation Certificate',
    group: 'certificate',
  },
  {
    value: 'minor-works',
    label: 'Minor Works',
    description: 'Minor Electrical Installation Works Certificate',
    group: 'certificate',
  },
  {
    value: 'fire-alarm',
    label: 'Fire Alarm',
    description: 'BS 5839 Fire Detection & Alarm',
    group: 'certificate',
  },
  {
    value: 'emergency-lighting',
    label: 'Emergency Lighting',
    description: 'BS 5266 Emergency Lighting',
    group: 'certificate',
  },
  {
    value: 'ev-charging',
    label: 'EV Charging',
    description: 'IET Code of Practice EV Charging',
    group: 'certificate',
  },
  {
    value: 'solar-pv',
    label: 'Solar PV',
    description: 'MCS Compliant Solar PV Installation',
    group: 'certificate',
  },
];

export const StartCertificateDialog = ({
  open,
  onOpenChange,
  customer,
}: StartCertificateDialogProps) => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties(customer.id);
  const { createProject } = useSparkProjects();

  const [selectedType, setSelectedType] = useState<ActionType>('site-visit');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  // New Project state
  const [projectExpanded, setProjectExpanded] = useState(false);
  const [projectTitle, setProjectTitle] = useState(`${customer.name} — Job`);
  const [projectType, setProjectType] = useState<string>('');
  const [creatingProject, setCreatingProject] = useState(false);

  const AI_AGENT_TYPES: ActionType[] = [
    'cost-engineer',
    'circuit-designer',
    'installation-specialist',
    'commissioning',
    'maintenance',
  ];
  const isStandalone = STANDALONE_CERT_TYPES.includes(selectedType);
  const isAIAgent = AI_AGENT_TYPES.includes(selectedType);

  const defaultProperty = properties.find((p) => p.isPrimary) || properties[0];

  const getAddress = () =>
    selectedPropertyId
      ? properties.find((p) => p.id === selectedPropertyId)?.address || customer.address
      : customer.address;

  const handleCreateProject = async () => {
    if (!projectTitle.trim()) return;
    setCreatingProject(true);
    try {
      const createdProject = await createProject({
        title: projectTitle.trim(),
        projectType: projectType || undefined,
        customerId: customer.id,
        location: customer.address || undefined,
      });
      onOpenChange(false);
      if (createdProject) navigate(`/electrician/projects/${createdProject.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setCreatingProject(false);
    }
  };

  const handleStart = () => {
    const address = getAddress();

    if (selectedType === 'site-visit') {
      navigate('/electrician/site-visits', {
        state: {
          prefillCustomerId: customer.id,
          prefillCustomerName: customer.name,
          prefillCustomerEmail: customer.email,
          prefillCustomerPhone: customer.phone,
          prefillAddress: address,
        },
      });
      onOpenChange(false);
      return;
    }

    if (selectedType === 'rams') {
      navigate('/electrician/health-safety', {
        state: {
          prefillCustomerId: customer.id,
          prefillClientName: customer.name,
        },
      });
      onOpenChange(false);
      return;
    }

    if (isAIAgent) {
      const agentSectionMap: Record<string, string> = {
        'cost-engineer': 'cost-engineer',
        'circuit-designer': 'circuit-designer',
        'installation-specialist': 'installation-specialist',
        commissioning: 'commissioning',
        maintenance: 'maintenance',
      };
      navigate(`/electrician/design-consultation`, {
        state: {
          section: agentSectionMap[selectedType],
          prefillCustomerId: customer.id,
          prefillClientName: customer.name,
          prefillAddress: address,
        },
      });
      onOpenChange(false);
      return;
    }

    if (selectedType === 'quote' || selectedType === 'invoice') {
      const sessionId = `customer-${selectedType}-${Date.now()}`;
      sessionStorage.setItem(
        sessionId,
        JSON.stringify({
          certificateData: {
            client: {
              name: customer.name,
              email: customer.email || '',
              phone: customer.phone || '',
              address: address || '',
            },
          },
        })
      );
      const builderPath =
        selectedType === 'quote'
          ? '/electrician/quote-builder/create'
          : '/electrician/invoice-builder/create';
      navigate(`${builderPath}?certificateSessionId=${sessionId}`);
      onOpenChange(false);
      return;
    }

    if (isStandalone) {
      navigate(`/electrician/inspection-testing/${selectedType}/new`, {
        state: {
          customerId: customer.id,
          customerData: customer,
          propertyId: selectedPropertyId || undefined,
          address,
        },
      });
    } else {
      navigate(`/electrician/inspection-testing?section=${selectedType}`, {
        state: {
          section: selectedType,
          customerId: customer.id,
          customerData: customer,
          propertyId: selectedPropertyId || undefined,
          address,
        },
      });
    }
    onOpenChange(false);
  };

  const getStartLabel = () => {
    switch (selectedType) {
      case 'site-visit': return 'Start Site Visit';
      case 'rams': return 'Create RAMS';
      case 'quote': return 'Create Quote';
      case 'invoice': return 'Create Invoice';
      default: return isAIAgent ? 'Open AI Agent' : 'Start Certificate';
    }
  };

  const jobActions = actionTypes.filter((a) => a.group === 'job');
  const businessActions = actionTypes.filter((a) => a.group === 'business');
  const aiActions = actionTypes.filter((a) => a.group === 'ai');
  const certificateActions = actionTypes.filter((a) => a.group === 'certificate');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] md:max-h-[90vh] rounded-t-3xl bg-[#0f0f0f] border-white/[0.08] p-0 flex flex-col overflow-hidden [&>button:first-of-type]:hidden"
      >
        {/* Accessibility title (visually hidden) */}
        <SheetTitle className="sr-only">New Job for {customer.name}</SheetTitle>

        {/* Drag handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 flex-shrink-0" />

        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">New Job for {customer.name}</h2>
          <p className="text-sm text-white mt-0.5">Start a project or jump straight into a quick action</p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6">

          {/* ── NEW PROJECT HERO ── */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]">
            <button
              type="button"
              onClick={() => setProjectExpanded((v) => !v)}
              className="flex w-full items-center gap-4 p-4 text-left touch-manipulation"
            >
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold tracking-tight text-white">New project</p>
                <p className="mt-0.5 text-[12.5px] text-white/60">
                  Track all tasks, certs, quotes &amp; docs in one place
                </p>
              </div>
              <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">
                {projectExpanded ? 'Close' : 'Open'}
              </span>
            </button>

            {/* Inline expanded form */}
            {projectExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-4">
                {/* Title input */}
                <div>
                  <p className="text-[13px] font-semibold text-white mb-2">Project Name</p>
                  <Input
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Full Rewire — Smith House"
                    className="bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white rounded-xl h-11 text-sm"
                  />
                </div>

                {/* Job type pills */}
                <div>
                  <p className="text-[13px] font-semibold text-white mb-2">Job Type</p>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(projectType === type ? '' : type)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all touch-manipulation',
                          projectType === type
                            ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                            : 'bg-white/[0.05] border-white/[0.08] text-white hover:bg-white/[0.09]'
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Create button */}
                <Button
                  onClick={handleCreateProject}
                  disabled={creatingProject || !projectTitle.trim()}
                  className="mt-1 h-12 w-full rounded-xl bg-elec-yellow text-base font-bold text-black hover:bg-elec-yellow/90"
                >
                  {creatingProject ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    'Create project'
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* ── DIVIDER ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[12px] font-medium text-white/55">Or quick action</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* ── JOBS ── */}
          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-white">Jobs</p>
            <div className="grid grid-cols-2 gap-2">
              {jobActions.map((type) => (
                <ActionCard
                  key={type.value}
                  action={type}
                  selected={selectedType === type.value}
                  onSelect={() => setSelectedType(type.value)}
                />
              ))}
            </div>
          </div>

          {/* ── CERTIFICATES ── */}
          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-white">Certificates</p>
            <div className="space-y-2">
              {certificateActions.map((type) => (
                <ActionCard
                  key={type.value}
                  action={type}
                  selected={selectedType === type.value}
                  onSelect={() => setSelectedType(type.value)}
                  fullWidth
                />
              ))}
            </div>
          </div>

          {/* ── BUSINESS ── */}
          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-white">Business</p>
            <div className="grid grid-cols-2 gap-2">
              {businessActions.map((type) => (
                <ActionCard
                  key={type.value}
                  action={type}
                  selected={selectedType === type.value}
                  onSelect={() => setSelectedType(type.value)}
                />
              ))}
            </div>
          </div>

          {/* ── AI AGENTS ── */}
          <div className="space-y-2">
            <p className="text-[13px] font-semibold text-white">AI Agents</p>
            <div className="grid grid-cols-2 gap-2">
              {aiActions.map((type) => (
                <ActionCard
                  key={type.value}
                  action={type}
                  selected={selectedType === type.value}
                  onSelect={() => setSelectedType(type.value)}
                />
              ))}
            </div>
          </div>

          {/* ── PROPERTY (if available) ── */}
          {properties.length > 0 && (
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-white">Property</p>
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl overflow-hidden">
                <MobileSelectPicker
                  value={selectedPropertyId || defaultProperty?.id || ''}
                  onValueChange={setSelectedPropertyId}
                  options={properties.map((p) => ({
                    value: p.id,
                    label: p.address + (p.isPrimary ? ' (Primary)' : ''),
                  }))}
                  placeholder="Select property"
                  title="Select Property"
                  triggerClassName="h-11 bg-transparent border-0 text-white"
                />
              </div>
            </div>
          )}

          {/* ── NO PROPERTIES fallback address ── */}
          {properties.length === 0 && customer.address && (
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
              <p className="mb-1 text-xs text-white/50">Address</p>
              <p className="text-sm text-white whitespace-pre-wrap">{customer.address}</p>
            </div>
          )}

          {/* ── START BUTTON (inline, no sticky) ── */}
          <div className="space-y-2 pt-1">
            <Button
              onClick={handleStart}
              className="h-12 w-full rounded-2xl bg-elec-yellow text-base font-bold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              {getStartLabel()}
            </Button>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full h-11 text-white/50 hover:text-white hover:bg-white/[0.05] rounded-2xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/* ── ActionCard sub-component ── */
interface ActionCardProps {
  action: (typeof actionTypes)[number];
  selected: boolean;
  onSelect: () => void;
  fullWidth?: boolean;
}

const ActionCard = ({ action, selected, onSelect, fullWidth }: ActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex min-h-[52px] items-center gap-3 rounded-2xl border p-3.5 text-left transition-all touch-manipulation',
        fullWidth ? 'w-full' : '',
        selected
          ? 'border-elec-yellow bg-elec-yellow'
          : 'border-white/[0.1] bg-white/[0.05] hover:border-white/[0.22]'
      )}
    >
      <div className="min-w-0 flex-1">
        <p className={cn('text-sm font-semibold', selected ? 'text-black' : 'text-white')}>
          {action.label}
        </p>
        {fullWidth && (
          <p className={cn('mt-0.5 text-xs', selected ? 'text-black/70' : 'text-white/55')}>
            {action.description}
          </p>
        )}
      </div>
    </button>
  );
};
