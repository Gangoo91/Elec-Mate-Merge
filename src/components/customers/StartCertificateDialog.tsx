import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useCustomerProperties } from '@/hooks/inspection/useCustomerProperties';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import {
  FileText,
  ClipboardCheck,
  Wrench,
  MapPin,
  ArrowRight,
  PoundSterling,
  Receipt,
  Flame,
  Lightbulb,
  Zap,
  Sun,
  ClipboardList,
  Shield,
  Cpu,
  CheckCircle2,
  Settings,
  FolderKanban,
  ChevronRight,
  Sparkles,
  Loader2,
} from 'lucide-react';
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
  icon: React.ElementType;
  color: string;
  selectedBg: string;
  group: 'certificate' | 'business' | 'job' | 'ai';
}[] = [
  {
    value: 'site-visit',
    label: 'Site Visit',
    description: 'Pre-site survey & scope',
    icon: ClipboardList,
    color: 'text-emerald-400',
    selectedBg: 'bg-emerald-500/20 border-emerald-500/40',
    group: 'job',
  },
  {
    value: 'rams',
    label: 'RAMS',
    description: 'Risk assessment & method statement',
    icon: Shield,
    color: 'text-orange-400',
    selectedBg: 'bg-orange-500/20 border-orange-500/40',
    group: 'job',
  },
  {
    value: 'quote',
    label: 'New Quote',
    description: 'Create a quote',
    icon: FileText,
    color: 'text-yellow-400',
    selectedBg: 'bg-yellow-500/20 border-yellow-500/40',
    group: 'business',
  },
  {
    value: 'invoice',
    label: 'New Invoice',
    description: 'Create an invoice',
    icon: PoundSterling,
    color: 'text-green-400',
    selectedBg: 'bg-green-500/20 border-green-500/40',
    group: 'business',
  },
  {
    value: 'cost-engineer',
    label: 'Cost Engineer',
    description: 'AI cost analysis',
    icon: PoundSterling,
    color: 'text-emerald-400',
    selectedBg: 'bg-emerald-500/20 border-emerald-500/40',
    group: 'ai',
  },
  {
    value: 'circuit-designer',
    label: 'Circuit Designer',
    description: 'AI circuit design',
    icon: Cpu,
    color: 'text-blue-400',
    selectedBg: 'bg-blue-500/20 border-blue-500/40',
    group: 'ai',
  },
  {
    value: 'installation-specialist',
    label: 'Installation',
    description: 'AI method statement',
    icon: Wrench,
    color: 'text-purple-400',
    selectedBg: 'bg-purple-500/20 border-purple-500/40',
    group: 'ai',
  },
  {
    value: 'commissioning',
    label: 'Commissioning',
    description: 'AI testing & commissioning',
    icon: CheckCircle2,
    color: 'text-cyan-400',
    selectedBg: 'bg-cyan-500/20 border-cyan-500/40',
    group: 'ai',
  },
  {
    value: 'maintenance',
    label: 'Maintenance',
    description: 'AI maintenance instructions',
    icon: Settings,
    color: 'text-amber-400',
    selectedBg: 'bg-amber-500/20 border-amber-500/40',
    group: 'ai',
  },
  {
    value: 'eicr',
    label: 'EICR',
    description: 'Electrical Installation Condition Report',
    icon: ClipboardCheck,
    color: 'text-blue-400',
    selectedBg: 'bg-blue-500/20 border-blue-500/40',
    group: 'certificate',
  },
  {
    value: 'eic',
    label: 'EIC',
    description: 'Electrical Installation Certificate',
    icon: Receipt,
    color: 'text-cyan-400',
    selectedBg: 'bg-cyan-500/20 border-cyan-500/40',
    group: 'certificate',
  },
  {
    value: 'minor-works',
    label: 'Minor Works',
    description: 'Minor Electrical Installation Works Certificate',
    icon: Wrench,
    color: 'text-purple-400',
    selectedBg: 'bg-purple-500/20 border-purple-500/40',
    group: 'certificate',
  },
  {
    value: 'fire-alarm',
    label: 'Fire Alarm',
    description: 'BS 5839 Fire Detection & Alarm',
    icon: Flame,
    color: 'text-red-400',
    selectedBg: 'bg-red-500/20 border-red-500/40',
    group: 'certificate',
  },
  {
    value: 'emergency-lighting',
    label: 'Emergency Lighting',
    description: 'BS 5266 Emergency Lighting',
    icon: Lightbulb,
    color: 'text-amber-400',
    selectedBg: 'bg-amber-500/20 border-amber-500/40',
    group: 'certificate',
  },
  {
    value: 'ev-charging',
    label: 'EV Charging',
    description: 'IET Code of Practice EV Charging',
    icon: Zap,
    color: 'text-emerald-400',
    selectedBg: 'bg-emerald-500/20 border-emerald-500/40',
    group: 'certificate',
  },
  {
    value: 'solar-pv',
    label: 'Solar PV',
    description: 'MCS Compliant Solar PV Installation',
    icon: Sun,
    color: 'text-orange-400',
    selectedBg: 'bg-orange-500/20 border-orange-500/40',
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
      const projectId = await createProject({
        title: projectTitle.trim(),
        projectType: projectType || undefined,
        customerId: customer.id,
        customerName: customer.name,
        location: customer.address || undefined,
      });
      onOpenChange(false);
      navigate(`/electrician/projects/${projectId}`);
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

  const selectedAction = actionTypes.find((a) => a.value === selectedType);

  // Derive a solid button colour from the selected action's colour class
  const startButtonClass = (() => {
    if (!selectedAction) return 'bg-white text-black hover:bg-white/90';
    const c = selectedAction.color;
    if (c.includes('emerald')) return 'bg-emerald-500 hover:bg-emerald-400 text-black';
    if (c.includes('orange')) return 'bg-orange-500 hover:bg-orange-400 text-black';
    if (c.includes('yellow')) return 'bg-yellow-400 hover:bg-yellow-300 text-black';
    if (c.includes('green')) return 'bg-green-500 hover:bg-green-400 text-black';
    if (c.includes('blue')) return 'bg-blue-500 hover:bg-blue-400 text-white';
    if (c.includes('purple')) return 'bg-purple-500 hover:bg-purple-400 text-white';
    if (c.includes('cyan')) return 'bg-cyan-500 hover:bg-cyan-400 text-black';
    if (c.includes('red')) return 'bg-red-500 hover:bg-red-400 text-white';
    if (c.includes('amber')) return 'bg-amber-500 hover:bg-amber-400 text-black';
    return 'bg-white text-black hover:bg-white/90';
  })();

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
          <p className="text-sm text-white/60 mt-0.5">Start a project or jump straight into a quick action</p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6">

          {/* ── NEW PROJECT HERO ── */}
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#0d2010] to-[#071508] overflow-hidden">
            <button
              type="button"
              onClick={() => setProjectExpanded((v) => !v)}
              className="w-full flex items-center gap-4 p-4 touch-manipulation text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <FolderKanban className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-base">New Project</p>
                <p className="text-sm text-white/60 mt-0.5">Track all tasks, certs, quotes &amp; docs in one place</p>
              </div>
              <ChevronRight
                className={cn(
                  'h-5 w-5 text-white flex-shrink-0 transition-transform duration-200',
                  projectExpanded && 'rotate-90'
                )}
              />
            </button>

            {/* Inline expanded form */}
            {projectExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-4">
                {/* Title input */}
                <div>
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Project Name</p>
                  <Input
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. Full Rewire — Smith House"
                    className="bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white rounded-xl h-11 text-sm"
                  />
                </div>

                {/* Job type pills */}
                <div>
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Job Type</p>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(projectType === type ? '' : type)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all touch-manipulation',
                          projectType === type
                            ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300'
                            : 'bg-white/[0.05] border-white/[0.08] text-white/70 hover:bg-white/[0.09]'
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
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl mt-1 text-base"
                >
                  {creatingProject ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      <FolderKanban className="h-4 w-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* ── DIVIDER ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-xs text-white font-medium uppercase tracking-widest">Or quick action</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* ── JOBS ── */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Jobs</p>
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
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Certificates</p>
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
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">Business</p>
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
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">AI Agents</p>
              <Sparkles className="h-3 w-3 text-white" />
            </div>
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
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Property
              </p>
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
              <p className="text-xs text-white/50 flex items-center gap-1.5 mb-1">
                <MapPin className="h-3 w-3" /> Address
              </p>
              <p className="text-sm text-white whitespace-pre-wrap">{customer.address}</p>
            </div>
          )}

          {/* ── START BUTTON (inline, no sticky) ── */}
          <div className="space-y-2 pt-1">
            <Button
              onClick={handleStart}
              className={cn(
                'w-full h-12 rounded-2xl font-bold text-base touch-manipulation',
                startButtonClass
              )}
            >
              {getStartLabel()}
              <ArrowRight className="h-4 w-4 ml-2" />
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
  const Icon = action.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 p-3.5 rounded-2xl border transition-all touch-manipulation text-left',
        fullWidth ? 'w-full' : '',
        selected
          ? action.selectedBg
          : 'bg-white/[0.05] border-white/[0.07] hover:bg-white/[0.09]'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
          selected ? 'bg-white/10' : 'bg-white/[0.07]'
        )}
      >
        <Icon className={cn('h-4 w-4', selected ? action.color : 'text-white/60')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('font-medium text-sm', selected ? 'text-white' : 'text-white/80')}>
          {action.label}
        </p>
        {fullWidth && (
          <p className={cn('text-xs mt-0.5', selected ? 'text-white/70' : 'text-white')}>
            {action.description}
          </p>
        )}
      </div>
      {selected && fullWidth && (
        <div className={cn('w-2 h-2 rounded-full flex-shrink-0', action.color.replace('text-', 'bg-'))} />
      )}
    </button>
  );
};
