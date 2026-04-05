import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, FileText, Lightbulb, ChevronDown, Home, Building2, Factory } from 'lucide-react';
import { InstallationProjectDetails as ProjectDetailsType } from '@/types/installation-method';
import { InstallationProjectDetails } from './InstallationProjectDetails';
import { InstallationTemplate } from '@/lib/installation-templates';
import { InstallationTemplateGrid } from './InstallationTemplateGrid';
import { cn } from '@/lib/utils';
import { StickySubmitButton } from '@/components/agents/shared/StickySubmitButton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface InstallationInputProps {
  onGenerate: (
    projectDetails: ProjectDetailsType,
    description: string,
    useFullMode: boolean
  ) => void;
  isProcessing: boolean;
  initialPrompt?: string;
  initialProjectName?: string;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const TYPE_CONFIG = [
  { value: 'domestic' as const, label: 'Domestic', description: 'Homes & flats', icon: Home },
  { value: 'commercial' as const, label: 'Commercial', description: 'Shops & offices', icon: Building2 },
  { value: 'industrial' as const, label: 'Industrial', description: 'Factories & warehouses', icon: Factory },
];

export const InstallationInput = ({
  onGenerate,
  isProcessing,
  initialPrompt,
  initialProjectName,
  customerId,
  onCustomerIdChange,
}: InstallationInputProps) => {
  const [description, setDescription] = useState(initialPrompt || '');
  const [generateFullMethodStatement] = useState(true);
  const [installationType, setInstallationType] = useState<
    'domestic' | 'commercial' | 'industrial'
  >('domestic');
  const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>({
    projectName: initialProjectName || '',
    location: '',
    installationType: 'domestic',
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showProjectInfo, setShowProjectInfo] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setProjectDetails((prev) => ({ ...prev, installationType }));
  }, [installationType]);

  useEffect(() => {
    if (initialPrompt) setDescription(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    if (initialProjectName) {
      setProjectDetails((prev) => ({ ...prev, projectName: initialProjectName }));
    }
  }, [initialProjectName]);

  const handleTemplateSelect = (template: InstallationTemplate) => {
    setDescription(template.prefilledPrompt);
    setInstallationType(template.category);
    setShowTemplates(false);
    toast.success('Template loaded', { description: 'Ready to generate' });
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();
    }, 150);
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    onGenerate(projectDetails, description, generateFullMethodStatement);
  };

  const isValid = description.trim().length > 0;
  const hasProjectDetails = projectDetails.projectName || projectDetails.location;

  return (
    <div className="space-y-5 pb-24 sm:pb-6">
      {/* ─── Installation Type ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Installation Type
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {TYPE_CONFIG.map((type, index) => {
            const isSelected = installationType === type.value;
            const Icon = type.icon;
            return (
              <motion.button
                key={type.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                onClick={() => !isProcessing && setInstallationType(type.value)}
                disabled={isProcessing}
                className={cn(
                  'relative glass-premium rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-h-[100px]',
                  'transition-all duration-200 touch-manipulation active:scale-[0.98] overflow-hidden',
                  isSelected && 'border-blue-500/40',
                  isProcessing && 'opacity-50 cursor-not-allowed'
                )}
                style={isSelected ? { boxShadow: '0 0 30px -10px rgba(96,165,250,0.3)' } : undefined}
              >
                {isSelected && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400" />
                )}
                <div className={cn(
                  'p-2.5 rounded-xl transition-all',
                  isSelected ? 'bg-blue-500/15 border border-blue-500/25' : 'bg-white/[0.05] border border-white/[0.08]'
                )}>
                  <Icon className={cn('h-5 w-5', isSelected ? 'text-blue-400' : 'text-white')} />
                </div>
                <div className="text-center">
                  <span className={cn('text-sm font-semibold block', isSelected ? 'text-blue-400' : 'text-white')}>{type.label}</span>
                  <span className="text-[10px] text-white mt-0.5 block">{type.description}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Quick Start Templates ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Collapsible open={showTemplates} onOpenChange={setShowTemplates}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 touch-manipulation">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Quick Start Templates</span>
                <span className="text-[10px] text-white uppercase tracking-wider">Templates</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showTemplates && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <InstallationTemplateGrid
                selectedCategory={installationType}
                onSelectTemplate={handleTemplateSelect}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* ─── Installation Description ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Installation Description
        </h2>
        <div className="relative glass-premium rounded-2xl p-5 space-y-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-40" />

          <Textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the electrical installation work required..."
            className="bg-transparent border-0 ring-0 shadow-none focus-visible:ring-0 focus:ring-0 text-base min-h-[140px] p-0 placeholder:text-white resize-none text-white"
            autoComplete="off"
            spellCheck={true}
            style={{ fontSize: '16px' }}
          />

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <p className="text-xs text-white flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3" />
              Be specific about work scope and location
            </p>
            <span className={cn(
              'text-xs font-medium tabular-nums',
              description.length >= 50 ? 'text-blue-400' : 'text-white'
            )}>
              {description.length} {description.length >= 50 && '✓'}
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Project Information (Collapsed) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Collapsible open={showProjectInfo} onOpenChange={setShowProjectInfo}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 touch-manipulation">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-sm font-medium text-white">Project Information</span>
                <span
                  className={cn(
                    'text-[10px] uppercase tracking-wider',
                    hasProjectDetails ? 'text-emerald-400' : 'text-white'
                  )}
                >
                  {hasProjectDetails ? '✓ Configured' : 'Optional'}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showProjectInfo && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pb-4 space-y-3 border-t border-white/[0.06]">
              <p className="text-xs text-white pt-3">Add for comprehensive method statements</p>
              <div className="mb-3">
                <ClientSelector
                  onSelectCustomer={(customer: Customer | null) => {
                    if (customer) {
                      setProjectDetails((prev) => ({
                        ...prev,
                        clientName: customer.name,
                        location: customer.address || prev.location,
                      }));
                      onCustomerIdChange?.(customer.id);
                    } else {
                      onCustomerIdChange?.(undefined);
                    }
                  }}
                  selectedCustomerId={customerId}
                />
              </div>
              <InstallationProjectDetails
                projectDetails={projectDetails}
                onChange={setProjectDetails}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="installation"
        onClick={handleSubmit}
        isDisabled={!isValid}
        isLoading={isProcessing}
      />
    </div>
  );
};
