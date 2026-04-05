import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, ChevronDown, Lightbulb, Info, Home, Building2, Factory } from 'lucide-react';
import { MaintenanceEquipmentDetails } from '@/types/maintenance-method';
import { MaintenanceTemplateGrid } from './MaintenanceTemplateGrid';
import { MaintenanceEquipmentDetailsForm } from './MaintenanceEquipmentDetails';
import { MaintenanceTemplate } from '@/lib/maintenance-templates';
import { cn } from '@/lib/utils';
import { StickySubmitButton } from '@/components/agents/shared/StickySubmitButton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MaintenanceInputProps {
  query: string;
  equipmentDetails: MaintenanceEquipmentDetails;
  onQueryChange: (query: string) => void;
  onEquipmentDetailsChange: (details: MaintenanceEquipmentDetails) => void;
  onGenerate: () => void;
  isProcessing: boolean;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const MAX_CHARS = 2000;

const TYPE_CONFIG = [
  { value: 'domestic' as const, label: 'Domestic', description: 'Homes & flats', icon: Home },
  { value: 'commercial' as const, label: 'Commercial', description: 'Shops & offices', icon: Building2 },
  { value: 'industrial' as const, label: 'Industrial', description: 'Factories & warehouses', icon: Factory },
];

export const MaintenanceInput = ({
  query,
  equipmentDetails,
  onQueryChange,
  onEquipmentDetailsChange,
  onGenerate,
  isProcessing,
  customerId,
  onCustomerIdChange,
}: MaintenanceInputProps) => {
  const [hasEquipmentDetails, setHasEquipmentDetails] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showEquipmentDetails, setShowEquipmentDetails] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = query.length;

  const handleTemplateSelect = (template: MaintenanceTemplate) => {
    onQueryChange(template.query);
    onEquipmentDetailsChange({
      equipmentType: template.equipmentType,
      location: template.location,
      installationType: template.installationType,
      knownIssues: template.knownIssues || '',
      additionalNotes: '',
      ageYears: undefined,
      lastInspectionDate: undefined,
    });
    setHasEquipmentDetails(true);
    setShowTemplates(false);
    toast.success('Template loaded', { description: 'Ready to generate' });
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();
    }, 150);
  };

  const canGenerate =
    query.trim().length >= 50 && equipmentDetails.equipmentType && equipmentDetails.location;

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
            const isSelected = equipmentDetails.installationType === type.value;
            const Icon = type.icon;
            return (
              <motion.button
                key={type.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                onClick={() =>
                  !isProcessing &&
                  onEquipmentDetailsChange({ ...equipmentDetails, installationType: type.value })
                }
                disabled={isProcessing}
                className={cn(
                  'relative glass-premium rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-h-[100px]',
                  'transition-all duration-200 touch-manipulation active:scale-[0.98] overflow-hidden',
                  isSelected && 'border-emerald-500/40',
                  isProcessing && 'opacity-50 cursor-not-allowed'
                )}
                style={isSelected ? { boxShadow: '0 0 30px -10px rgba(52,211,153,0.3)' } : undefined}
              >
                {isSelected && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
                )}
                <div className={cn(
                  'p-2.5 rounded-xl transition-all',
                  isSelected ? 'bg-emerald-500/15 border border-emerald-500/25' : 'bg-white/[0.05] border border-white/[0.08]'
                )}>
                  <Icon className={cn('h-5 w-5', isSelected ? 'text-emerald-400' : 'text-white')} />
                </div>
                <div className="text-center">
                  <span className={cn('text-sm font-semibold block', isSelected ? 'text-emerald-400' : 'text-white')}>{type.label}</span>
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
                <Lightbulb className="h-4 w-4 text-emerald-400" />
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
              <MaintenanceTemplateGrid
                selectedCategory={equipmentDetails.installationType}
                onSelectTemplate={handleTemplateSelect}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* ─── Equipment & Requirements ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Equipment & Requirements
        </h2>
        <div className="relative glass-premium rounded-2xl p-5 space-y-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-40" />

          <Textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Describe the equipment, its condition, and the type of maintenance required..."
            className="bg-transparent border-0 ring-0 shadow-none focus-visible:ring-0 focus:ring-0 text-base min-h-[140px] p-0 placeholder:text-white resize-none text-white"
            autoComplete="off"
            spellCheck={true}
            maxLength={MAX_CHARS}
            disabled={isProcessing}
            style={{ fontSize: '16px' }}
          />

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <p className="text-xs text-white flex items-center gap-1.5">
              <Lightbulb className="h-3 w-3" />
              50+ characters required for detailed instructions
            </p>
            <span className={cn(
              'text-xs font-medium tabular-nums',
              charCount >= 50 ? 'text-emerald-400' : 'text-white'
            )}>
              {charCount} {charCount >= 50 && '✓'}
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Equipment Details (Collapsed) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Collapsible open={showEquipmentDetails} onOpenChange={setShowEquipmentDetails}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 touch-manipulation">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-sm font-medium text-white">Equipment Details</span>
                <span
                  className={cn(
                    'text-[10px] uppercase tracking-wider',
                    hasEquipmentDetails ? 'text-emerald-400' : 'text-white'
                  )}
                >
                  {hasEquipmentDetails ? '✓ Configured' : 'Optional'}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showEquipmentDetails && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pb-4 space-y-3 border-t border-white/[0.06]">
              <p className="text-xs text-white pt-3">
                Additional equipment information for detailed instructions
              </p>
              <div className="mb-3">
                <ClientSelector
                  onSelectCustomer={(customer: Customer | null) => {
                    if (customer) {
                      if (customer.address) {
                        onEquipmentDetailsChange({
                          ...equipmentDetails,
                          location: customer.address,
                        });
                      }
                      onCustomerIdChange?.(customer.id);
                    } else {
                      onCustomerIdChange?.(undefined);
                    }
                  }}
                  selectedCustomerId={customerId}
                />
              </div>
              <MaintenanceEquipmentDetailsForm
                equipmentDetails={equipmentDetails}
                onChange={onEquipmentDetailsChange}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="maintenance"
        onClick={onGenerate}
        isDisabled={!canGenerate}
        isLoading={isProcessing}
      />
    </div>
  );
};
