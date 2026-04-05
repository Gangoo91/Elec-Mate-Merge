/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  AlertTriangle,
  HardHat,
  Lightbulb,
  ChevronDown,
  Home,
  Building2,
  Factory,
  Users,
  Check,
  X,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';
import { MobileInput } from '@/components/ui/mobile-input';
import { cn } from '@/lib/utils';
import { StickySubmitButton } from '@/components/agents/shared/StickySubmitButton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

interface ExampleScenario {
  title: string;
  icon: typeof Shield;
  prompt: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    title: 'Domestic Rewire',
    icon: Shield,
    prompt:
      'Create a comprehensive risk assessment for a full rewire of a 3-bedroom house with occupants remaining in situ during works',
  },
  {
    title: 'Live Environment',
    icon: AlertTriangle,
    prompt:
      'Risk assessment for working on live distribution board in hospital critical care unit - isolation not possible, identify hazards and control measures',
  },
  {
    title: 'Working at Height',
    icon: HardHat,
    prompt:
      'Risk assessment for installing external lighting 4 metres high on commercial building, including scaffold access and fall prevention',
  },
  {
    title: 'Confined Space',
    icon: Shield,
    prompt:
      'Risk assessment for cable pulling through underground ducting and inspection pit entry, including rescue procedures and atmosphere testing',
  },
];

const TYPE_CONFIG = {
  domestic: { label: 'Domestic', icon: Home },
  commercial: { label: 'Commercial', icon: Building2 },
  industrial: { label: 'Industrial', icon: Factory },
} as const;

interface HealthSafetyInputProps {
  onGenerate: (
    query: string,
    projectInfo: any,
    workType: 'domestic' | 'commercial' | 'industrial'
  ) => void;
  isProcessing: boolean;
  initialPrompt?: string;
  initialProjectName?: string;
}

export const HealthSafetyInput = ({
  onGenerate,
  isProcessing,
  initialPrompt,
  initialProjectName,
}: HealthSafetyInputProps) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [selectedType, setSelectedType] = useState<'domestic' | 'commercial' | 'industrial'>(
    'domestic'
  );
  const [projectName, setProjectName] = useState(initialProjectName || '');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [customerId, setCustomerId] = useState<string | undefined>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    if (initialProjectName) setProjectName(initialProjectName);
  }, [initialProjectName]);

  const handleCustomerSelect = (customer: Customer | null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setCustomerId(customer.id);
      setClientName(customer.name);
      if (!showProjectDetails) setShowProjectDetails(true);
    } else {
      setSelectedCustomer(null);
      setCustomerId(undefined);
    }
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setCustomerId(undefined);
    setClientName('');
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      try {
        const voltages = contextData.circuits?.map((c: any) => c.voltage).join(', ') || '230V';
        const workType = contextData.workType || contextData.installationType || 'installation';
        setPrompt(
          instruction ||
            `Risk assessment for ${workType}: ${voltages} system, ${contextData.location || 'site'}`
        );
        if (contextData.projectName) setProjectName(contextData.projectName);
        if (contextData.location) setLocation(contextData.location);
        if (contextData.clientName) setClientName(contextData.clientName);
        toast.success('Context loaded', { description: 'Work forwarded from another agent' });
      } catch {
        setPrompt(instruction || 'Safety assessment for forwarded work');
        toast.success('Context loaded');
      }
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    toast.success('Template loaded', { description: 'Ready to generate' });
    // Scroll to textarea
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();
    }, 150);
  };

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error('Please describe what safety documentation you need');
      return;
    }
    onGenerate(prompt, { projectName, location, clientName, customerId }, selectedType);
  };

  const isValid = prompt.trim().length > 0;

  return (
    <div className="space-y-5 pb-24 sm:pb-6">
      <AgentInbox currentAgent="health-safety" onTaskAccept={handleTaskAccept} />

      {/* ─── Quick Start Templates ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Quick Start
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {EXAMPLE_SCENARIOS.map((scenario, idx) => {
            const ScenarioIcon = scenario.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(scenario.prompt)}
                className="relative glass-premium rounded-2xl p-4 text-left group hover:border-orange-500/30 transition-all duration-200 touch-manipulation active:scale-[0.98] overflow-hidden"
              >
                {/* Hover accent */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <ScenarioIcon className="h-5 w-5 text-orange-400 mb-2.5" />
                <span className="text-sm font-medium text-white leading-tight block">
                  {scenario.title}
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Safety Requirements ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Safety Requirements
        </h2>
        <div className="relative glass-premium rounded-2xl p-5 space-y-4 overflow-hidden">
          {/* Gradient top accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 opacity-40" />

          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe site conditions, hazards, and safety requirements..."
            className="bg-transparent border-0 ring-0 shadow-none focus-visible:ring-0 focus:ring-0 text-base min-h-[140px] p-0 placeholder:text-white resize-none text-white"
            autoComplete="off"
            spellCheck={true}
            maxLength={500}
            style={{ fontSize: '16px' }}
          />

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <p className="text-xs text-white flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3" />
              Include specific hazards for accurate assessment
            </p>
            <span className={cn('text-xs font-medium', prompt.length >= 50 ? 'text-orange-400/60' : 'text-white')}>
              {prompt.length}/500
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Project Type ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Project Type
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {(
            Object.entries(TYPE_CONFIG) as [
              keyof typeof TYPE_CONFIG,
              (typeof TYPE_CONFIG)[keyof typeof TYPE_CONFIG],
            ][]
          ).map(([key, typeConfig]) => {
            const Icon = typeConfig.icon;
            const isSelected = selectedType === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedType(key)}
                className={cn(
                  'relative glass-premium rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-h-[100px]',
                  'transition-all duration-200 touch-manipulation active:scale-[0.98] overflow-hidden',
                  isSelected && 'border-orange-500/40'
                )}
                style={isSelected ? { boxShadow: '0 0 30px -10px rgba(251,146,60,0.3)' } : undefined}
              >
                {/* Selected accent line */}
                {isSelected && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-red-500" />
                )}

                <div
                  className={cn(
                    'p-2.5 rounded-xl transition-all',
                    isSelected
                      ? 'bg-orange-500/15 border border-orange-500/25'
                      : 'bg-white/[0.05] border border-white/[0.08]'
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5', isSelected ? 'text-orange-400' : 'text-white')}
                  />
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-orange-400' : 'text-white'
                  )}
                >
                  {typeConfig.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Project Details (Collapsed) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Collapsible open={showProjectDetails} onOpenChange={setShowProjectDetails}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 touch-manipulation">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-sm font-medium text-white">Project Details</span>
                <span className="text-[10px] text-white uppercase tracking-wider">
                  Optional
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showProjectDetails && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pb-4 space-y-4 border-t border-white/[0.06]">
              <p className="text-xs text-white pt-3">
                Add project info for comprehensive documentation
              </p>

              {/* Customer Selector */}
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-white/70 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" />
                  Select Customer
                </label>
                {selectedCustomer ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-400">
                        {selectedCustomer.name}
                      </p>
                      <p className="text-xs text-white truncate">
                        {selectedCustomer.email || selectedCustomer.phone || ''}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearCustomer}
                      className="p-2 rounded-lg hover:bg-white/5 touch-manipulation"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <ClientSelector
                    onSelectCustomer={handleCustomerSelect}
                    selectedCustomerId={customerId}
                  />
                )}
              </div>

              <MobileInput
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Office Block Rewire"
              />
              <MobileInput
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., London, UK"
              />
              <MobileInput
                label="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., ABC Construction Ltd"
              />
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="health-safety"
        onClick={handleSubmit}
        isDisabled={!isValid}
        isLoading={isProcessing}
      />
    </div>
  );
};
