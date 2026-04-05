import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Lightbulb, MapPin, User, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StickySubmitButton } from '@/components/agents/shared/StickySubmitButton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CostEngineerHero } from './premium/CostEngineerHero';
import { ProjectTypeSelector } from './premium/ProjectTypeSelector';
import { BusinessSettings } from './BusinessSettingsDialog';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { toast } from '@/hooks/use-toast';

interface CostEngineerInputProps {
  prompt: string;
  projectType: 'domestic' | 'commercial' | 'industrial';
  projectName: string;
  clientInfo: string;
  location: string;
  additionalInfo: string;
  onPromptChange: (value: string) => void;
  onProjectTypeChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
  onProjectNameChange: (value: string) => void;
  onClientInfoChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onAdditionalInfoChange: (value: string) => void;
  onGenerate: () => void;
  isProcessing: boolean;
  businessSettings: BusinessSettings;
  onOpenSettings: () => void;
  hasConfiguredSettings: boolean;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const MAX_CHARS = 2000;

const EXAMPLE_PROJECTS = [
  { title: 'Consumer Unit Replacement', description: 'Replace existing consumer unit with 18-way dual RCD board, including AFDD protection for socket circuits. Install new earth bonding to water and gas, test all circuits, provide EIC certification. Property is a 3-bedroom semi-detached house with cavity walls.', type: 'domestic' as const },
  { title: 'Full House Rewire', description: 'Complete rewire of 4-bedroom Victorian terraced house including new consumer unit, first and second fix wiring, LED downlights throughout, dimmer switches in living areas, USB sockets in bedrooms, outdoor socket for garden, smart doorbell installation, and full certification.', type: 'domestic' as const },
  { title: 'Kitchen & Utility Rewire', description: 'Rewire kitchen and utility room for new appliances. Install dedicated circuits for oven, hob, dishwasher, washing machine, and tumble dryer. Add 6x double sockets, under-cabinet LED lighting, extractor fan, and update consumer unit with RCD protection.', type: 'domestic' as const },
  { title: 'EV Charger Installation', description: 'Install 7kW home EV charger in garage with dedicated 32A supply from consumer unit. Run 10mm² armoured cable underground, install isolator, commission charger, provide EIC certification and OLEV grant application support.', type: 'domestic' as const },
  { title: 'Office Space Fit-Out', description: 'Full electrical installation for 200m² open-plan office including new distribution board, CAT6 data cabling to 20 workstations, LED panel lighting with daylight sensors, emergency lighting, fire alarm system, access control, and testing & certification.', type: 'commercial' as const },
  { title: 'Retail Shop Refurbishment', description: 'Electrical refurbishment of 150m² retail unit. Install LED track lighting, display spotlights, till point power, security system pre-wiring, external shop sign illumination, emergency lighting, and 3-phase supply upgrade for air conditioning.', type: 'commercial' as const },
  { title: 'Restaurant Kitchen Installation', description: 'Commercial kitchen electrical installation including 3-phase distribution board, dedicated circuits for commercial ovens, fryers, dishwasher, extraction system, walk-in fridge, ambient lighting, emergency lighting, and full NICEIC certification.', type: 'commercial' as const },
  { title: 'Office Lighting Upgrade', description: 'Replace 200x fluorescent fittings with LED panels across 5 floors. Install presence detection, daylight harvesting, central lighting control system, emergency lighting upgrades, and provide energy savings report and EPC improvement documentation.', type: 'commercial' as const },
  { title: 'Workshop 3-Phase', description: 'Install 3-phase supply to 500m² workshop including new 200A distribution board, 6x 32A commando sockets, overhead LED high-bay lighting, welding bay with 63A supply, air compressor circuit, machine tool power, and emergency stop system.', type: 'industrial' as const },
  { title: 'Warehouse Lighting & Power', description: 'Complete electrical installation for 1000m² warehouse including LED high-bay lighting with PIR control, loading bay 3-phase sockets, forklift charging stations, roller shutter door controls, fire alarm system, and full testing & certification.', type: 'industrial' as const },
  { title: 'Factory Machinery', description: 'Install power supplies for new CNC machinery including 125A 3-phase distribution board, armoured cable runs, machine isolators, emergency stop circuits, control panel wiring, and commissioning with machinery manufacturers.', type: 'industrial' as const },
  { title: 'Cold Storage Electrical', description: 'Electrical installation for cold storage facility including 3-phase refrigeration supplies, LED cold store lighting, defrost controls, temperature monitoring system, backup generator changeover panel, and alarm system for temperature monitoring.', type: 'industrial' as const },
];

export const CostEngineerInput = ({
  prompt,
  projectType,
  projectName,
  clientInfo,
  location,
  additionalInfo,
  onPromptChange,
  onProjectTypeChange,
  onProjectNameChange,
  onClientInfoChange,
  onLocationChange,
  onAdditionalInfoChange,
  onGenerate,
  isProcessing,
  businessSettings,
  onOpenSettings,
  hasConfiguredSettings,
  customerId,
  onCustomerIdChange,
}: CostEngineerInputProps) => {
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const charCount = prompt.length;
  const canGenerate = prompt.trim().length >= 100;

  const handleExampleSelect = (example: (typeof EXAMPLE_PROJECTS)[0]) => {
    onPromptChange(example.description);
    onProjectTypeChange(example.type);
    setShowExamples(false);
    toast({ title: 'Template loaded', description: 'Ready to generate' });
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();
    }, 150);
  };

  const filteredExamples = EXAMPLE_PROJECTS.filter((ex) => ex.type === projectType);

  return (
    <div className="space-y-5 pb-24 sm:pb-6">
      {/* Hero */}
      <CostEngineerHero
        businessSettings={businessSettings}
        onOpenSettings={onOpenSettings}
        hasConfiguredSettings={hasConfiguredSettings}
      />

      {/* ─── Project Type ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <ProjectTypeSelector
          value={projectType}
          onChange={onProjectTypeChange}
          disabled={isProcessing}
        />
      </motion.section>

      {/* ─── Quick Start Examples ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Quick Start
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {filteredExamples.slice(0, 4).map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleExampleSelect(example)}
              disabled={isProcessing}
              className="relative glass-premium rounded-2xl p-4 text-left group hover:border-elec-yellow/30 transition-all duration-200 touch-manipulation active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <Zap className="h-4 w-4 text-elec-yellow mb-2" />
              <span className="text-sm font-medium text-white leading-tight block">
                {example.title}
              </span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ─── Job Description ─── */}
      <motion.section
        className="space-y-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Job Description
        </h2>
        <div className="relative glass-premium rounded-2xl p-5 space-y-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow opacity-40" />

          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe the electrical work needed in detail. Include scope, specifications, and any special requirements..."
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
              100+ characters recommended for accurate pricing
            </p>
            <span
              className={cn(
                'text-xs font-medium tabular-nums',
                charCount >= 100 ? 'text-elec-yellow/60' : 'text-white'
              )}
            >
              {charCount.toLocaleString()}/{MAX_CHARS.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.section>

      {/* ─── Optional Details (Collapsed) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, type: 'spring', stiffness: 300, damping: 24 }}
      >
        <Collapsible open={showOptionalDetails} onOpenChange={setShowOptionalDetails}>
          <div className="glass-premium rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 touch-manipulation">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                <span className="text-sm font-medium text-white">Project Details</span>
                <span className="text-[10px] text-white uppercase tracking-wider">
                  Optional
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showOptionalDetails && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pb-4 space-y-3 border-t border-white/[0.06]">
              <p className="text-xs text-white pt-3">Add for more accurate quotes</p>

              {/* Customer Selector */}
              <ClientSelector
                onSelectCustomer={(customer: Customer | null) => {
                  if (customer) {
                    onClientInfoChange(
                      [customer.name, customer.phone].filter(Boolean).join(' - ')
                    );
                    if (customer.address) onLocationChange(customer.address);
                    onCustomerIdChange?.(customer.id);
                  } else {
                    onCustomerIdChange?.(undefined);
                  }
                }}
                selectedCustomerId={customerId}
              />

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/70 flex items-center gap-1.5">
                  <FileText className="h-3 w-3" />
                  Project Name
                </Label>
                <Input
                  value={projectName}
                  onChange={(e) => onProjectNameChange(e.target.value)}
                  placeholder="e.g., Kitchen Rewire - 23 Oak Street"
                  className="h-10 text-sm bg-transparent border border-white/[0.08] rounded-xl focus:border-elec-yellow/50 text-white placeholder:text-white touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/70 flex items-center gap-1.5">
                  <User className="h-3 w-3" />
                  Client Information
                </Label>
                <Input
                  value={clientInfo}
                  onChange={(e) => onClientInfoChange(e.target.value)}
                  placeholder="e.g., John Smith - 07700 900000"
                  className="h-10 text-sm bg-transparent border border-white/[0.08] rounded-xl focus:border-elec-yellow/50 text-white placeholder:text-white touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/70 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  Location
                </Label>
                <Input
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  placeholder="e.g., London, Manchester..."
                  className="h-10 text-sm bg-transparent border border-white/[0.08] rounded-xl focus:border-elec-yellow/50 text-white placeholder:text-white touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/70">Additional Notes</Label>
                <Textarea
                  value={additionalInfo}
                  onChange={(e) => onAdditionalInfoChange(e.target.value)}
                  placeholder="Any other details..."
                  className="min-h-[80px] text-sm bg-transparent border border-white/[0.08] rounded-xl focus:border-elec-yellow/50 text-white placeholder:text-white resize-none touch-manipulation"
                  disabled={isProcessing}
                />
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="cost-engineer"
        onClick={onGenerate}
        isDisabled={!canGenerate}
        isLoading={isProcessing}
      />
    </div>
  );
};
