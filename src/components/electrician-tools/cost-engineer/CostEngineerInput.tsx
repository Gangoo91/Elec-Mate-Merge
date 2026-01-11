import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Lightbulb, MapPin, User, FileText, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickySubmitButton } from "@/components/agents/shared/StickySubmitButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CostEngineerHero } from "./premium/CostEngineerHero";
import { ProjectTypeSelector } from "./premium/ProjectTypeSelector";
import { BusinessSettings } from "./BusinessSettingsDialog";

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
}

const MAX_CHARS = 2000;

const EXAMPLE_PROJECTS = [
  // DOMESTIC
  {
    title: "Consumer Unit Replacement",
    description: "Replace existing consumer unit with 18-way dual RCD board, including AFDD protection for socket circuits. Install new earth bonding to water and gas, test all circuits, provide EIC certification. Property is a 3-bedroom semi-detached house with cavity walls.",
    type: 'domestic' as const,
  },
  {
    title: "Full House Rewire",
    description: "Complete rewire of 4-bedroom Victorian terraced house including new consumer unit, first and second fix wiring, LED downlights throughout, dimmer switches in living areas, USB sockets in bedrooms, outdoor socket for garden, smart doorbell installation, and full certification.",
    type: 'domestic' as const,
  },
  {
    title: "Kitchen & Utility Rewire",
    description: "Rewire kitchen and utility room for new appliances. Install dedicated circuits for oven, hob, dishwasher, washing machine, and tumble dryer. Add 6x double sockets, under-cabinet LED lighting, extractor fan, and update consumer unit with RCD protection.",
    type: 'domestic' as const,
  },
  {
    title: "EV Charger Installation",
    description: "Install 7kW home EV charger in garage with dedicated 32A supply from consumer unit. Run 10mm² armoured cable underground, install isolator, commission charger, provide EIC certification and OLEV grant application support.",
    type: 'domestic' as const,
  },
  // COMMERCIAL
  {
    title: "Office Space Fit-Out",
    description: "Full electrical installation for 200m² open-plan office including new distribution board, CAT6 data cabling to 20 workstations, LED panel lighting with daylight sensors, emergency lighting, fire alarm system, access control, and testing & certification.",
    type: 'commercial' as const,
  },
  {
    title: "Retail Shop Refurbishment",
    description: "Electrical refurbishment of 150m² retail unit. Install LED track lighting, display spotlights, till point power, security system pre-wiring, external shop sign illumination, emergency lighting, and 3-phase supply upgrade for air conditioning.",
    type: 'commercial' as const,
  },
  {
    title: "Restaurant Kitchen Installation",
    description: "Commercial kitchen electrical installation including 3-phase distribution board, dedicated circuits for commercial ovens, fryers, dishwasher, extraction system, walk-in fridge, ambient lighting, emergency lighting, and full NICEIC certification.",
    type: 'commercial' as const,
  },
  {
    title: "Office Block Lighting Upgrade",
    description: "Replace 200x fluorescent fittings with LED panels across 5 floors. Install presence detection, daylight harvesting, central lighting control system, emergency lighting upgrades, and provide energy savings report and EPC improvement documentation.",
    type: 'commercial' as const,
  },
  // INDUSTRIAL
  {
    title: "Workshop 3-Phase Installation",
    description: "Install 3-phase supply to 500m² workshop including new 200A distribution board, 6x 32A commando sockets, overhead LED high-bay lighting, welding bay with 63A supply, air compressor circuit, machine tool power, and emergency stop system.",
    type: 'industrial' as const,
  },
  {
    title: "Warehouse Lighting & Power",
    description: "Complete electrical installation for 1000m² warehouse including LED high-bay lighting with PIR control, loading bay 3-phase sockets, forklift charging stations, roller shutter door controls, fire alarm system, and full testing & certification.",
    type: 'industrial' as const,
  },
  {
    title: "Factory Machinery Installation",
    description: "Install power supplies for new CNC machinery including 125A 3-phase distribution board, armoured cable runs, machine isolators, emergency stop circuits, control panel wiring, and commissioning with machinery manufacturers.",
    type: 'industrial' as const,
  },
  {
    title: "Cold Storage Unit Electrical",
    description: "Electrical installation for cold storage facility including 3-phase refrigeration supplies, LED cold store lighting, defrost controls, temperature monitoring system, backup generator changeover panel, and alarm system for temperature monitoring.",
    type: 'industrial' as const,
  }
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
  hasConfiguredSettings
}: CostEngineerInputProps) => {
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const charCount = prompt.length;

  const getCharCountColor = () => {
    if (charCount < 100) return 'text-white/40';
    return 'text-emerald-400';
  };

  const canGenerate = prompt.trim().length >= 100;

  const handleExampleSelect = (example: typeof EXAMPLE_PROJECTS[0]) => {
    onPromptChange(example.description);
    onProjectTypeChange(example.type);
    setShowExamples(false);
  };

  const filteredExamples = EXAMPLE_PROJECTS.filter(ex => ex.type === projectType);

  return (
    <div className="space-y-3 pb-24 sm:pb-6">
      {/* Hero Section */}
      <CostEngineerHero
        businessSettings={businessSettings}
        onOpenSettings={onOpenSettings}
        hasConfiguredSettings={hasConfiguredSettings}
      />

      {/* Main Card - Description + Project Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 space-y-4"
      >
        {/* Project Type Selector */}
        <ProjectTypeSelector
          value={projectType}
          onChange={onProjectTypeChange}
          disabled={isProcessing}
        />

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Description Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-white/70">
              Job Description
            </Label>
            <span className={cn(
              "text-xs font-medium tabular-nums",
              getCharCountColor()
            )}>
              {charCount}{charCount >= 100 ? ' ✓' : '/100'}
            </span>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe the electrical work needed in detail. Include scope, specifications, and any special requirements..."
            className="min-h-[120px] text-sm bg-white/[0.03] border border-white/10 rounded-xl focus:border-elec-yellow/50 focus:ring-1 focus:ring-elec-yellow/20 transition-all text-white placeholder:text-white/30 resize-none touch-manipulation"
            autoComplete="off"
            spellCheck={true}
            maxLength={MAX_CHARS}
            disabled={isProcessing}
          />

          <p className="text-xs text-white/40">
            100+ characters for accurate pricing
          </p>
        </div>
      </motion.div>

      {/* Examples - Collapsible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Collapsible open={showExamples} onOpenChange={setShowExamples}>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between touch-manipulation hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-elec-yellow/15">
                  <Lightbulb className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-sm font-medium text-white/80">Example Projects</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  {filteredExamples.length}
                </span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showExamples && "rotate-180"
              )} />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-2">
                {filteredExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleSelect(example)}
                    disabled={isProcessing}
                    className="w-full p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-elec-yellow/30 rounded-xl transition-all text-left touch-manipulation"
                  >
                    <h4 className="text-sm font-medium text-white mb-1">
                      {example.title}
                    </h4>
                    <p className="text-xs text-white/40 line-clamp-2">
                      {example.description}
                    </p>
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Optional Details - Collapsible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Collapsible open={showOptionalDetails} onOpenChange={setShowOptionalDetails}>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
            <CollapsibleTrigger className="w-full p-4 flex items-center justify-between touch-manipulation hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/10">
                  <FileText className="h-4 w-4 text-white/60" />
                </div>
                <span className="text-sm font-medium text-white/80">Optional Details</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40">
                  +Accuracy
                </span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showOptionalDetails && "rotate-180"
              )} />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-3">
                {/* Project Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/50 flex items-center gap-1.5">
                    <FileText className="h-3 w-3" />
                    Project Name
                  </Label>
                  <Input
                    value={projectName}
                    onChange={(e) => onProjectNameChange(e.target.value)}
                    placeholder="e.g., Kitchen Rewire - 23 Oak Street"
                    className="h-10 text-sm bg-white/[0.03] border border-white/10 rounded-lg focus:border-elec-yellow/50 text-white placeholder:text-white/30 touch-manipulation"
                    disabled={isProcessing}
                  />
                </div>

                {/* Client Info */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/50 flex items-center gap-1.5">
                    <User className="h-3 w-3" />
                    Client Information
                  </Label>
                  <Input
                    value={clientInfo}
                    onChange={(e) => onClientInfoChange(e.target.value)}
                    placeholder="e.g., John Smith - 07700 900000"
                    className="h-10 text-sm bg-white/[0.03] border border-white/10 rounded-lg focus:border-elec-yellow/50 text-white placeholder:text-white/30 touch-manipulation"
                    disabled={isProcessing}
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/50 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    Location
                  </Label>
                  <Input
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                    placeholder="e.g., London, Manchester..."
                    className="h-10 text-sm bg-white/[0.03] border border-white/10 rounded-lg focus:border-elec-yellow/50 text-white placeholder:text-white/30 touch-manipulation"
                    disabled={isProcessing}
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/50">
                    Additional Notes
                  </Label>
                  <Textarea
                    value={additionalInfo}
                    onChange={(e) => onAdditionalInfoChange(e.target.value)}
                    placeholder="Any other details..."
                    className="min-h-[80px] text-sm bg-white/[0.03] border border-white/10 rounded-lg focus:border-elec-yellow/50 text-white placeholder:text-white/30 resize-none touch-manipulation"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </motion.div>

      {/* Submit Button */}
      <StickySubmitButton
        onClick={onGenerate}
        disabled={!canGenerate || isProcessing}
        isLoading={isProcessing}
        agentType="cost-engineer"
      >
        {isProcessing ? 'Generating Cost Analysis...' : 'Generate Cost Analysis'}
      </StickySubmitButton>
    </div>
  );
};
