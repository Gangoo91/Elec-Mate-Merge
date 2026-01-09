import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Home, Building2, Factory, ChevronDown, Lightbulb, MapPin, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickySubmitButton } from "@/components/agents/shared/StickySubmitButton";
import { AGENT_CONFIG } from "@/components/agents/shared/AgentConfig";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
}

const MAX_CHARS = 2000;

const PROJECT_TYPES = [
  { value: 'domestic' as const, label: 'Domestic', icon: Home, color: '#3b82f6' },
  { value: 'commercial' as const, label: 'Commercial', icon: Building2, color: '#8b5cf6' },
  { value: 'industrial' as const, label: 'Industrial', icon: Factory, color: '#f97316' },
];

const EXAMPLE_PROJECTS = [
  // DOMESTIC (4 examples)
  {
    title: "Consumer Unit Replacement",
    description: "Replace existing consumer unit with 18-way dual RCD board, including AFDD protection for socket circuits. Install new earth bonding to water and gas, test all circuits, provide EIC certification. Property is a 3-bedroom semi-detached house with cavity walls.",
    type: 'domestic' as const,
    icon: "🏠"
  },
  {
    title: "Full House Rewire",
    description: "Complete rewire of 4-bedroom Victorian terraced house including new consumer unit, first and second fix wiring, LED downlights throughout, dimmer switches in living areas, USB sockets in bedrooms, outdoor socket for garden, smart doorbell installation, and full certification.",
    type: 'domestic' as const,
    icon: "⚡"
  },
  {
    title: "Kitchen & Utility Rewire",
    description: "Rewire kitchen and utility room for new appliances. Install dedicated circuits for oven, hob, dishwasher, washing machine, and tumble dryer. Add 6x double sockets, under-cabinet LED lighting, extractor fan, and update consumer unit with RCD protection.",
    type: 'domestic' as const,
    icon: "🔌"
  },
  {
    title: "EV Charger Installation",
    description: "Install 7kW home EV charger in garage with dedicated 32A supply from consumer unit. Run 10mm² armoured cable underground, install isolator, commission charger, provide EIC certification and OLEV grant application support.",
    type: 'domestic' as const,
    icon: "🚗"
  },
  // COMMERCIAL (4 examples)
  {
    title: "Office Space Fit-Out",
    description: "Full electrical installation for 200m² open-plan office including new distribution board, CAT6 data cabling to 20 workstations, LED panel lighting with daylight sensors, emergency lighting, fire alarm system, access control, and testing & certification.",
    type: 'commercial' as const,
    icon: "🏢"
  },
  {
    title: "Retail Shop Refurbishment",
    description: "Electrical refurbishment of 150m² retail unit. Install LED track lighting, display spotlights, till point power, security system pre-wiring, external shop sign illumination, emergency lighting, and 3-phase supply upgrade for air conditioning.",
    type: 'commercial' as const,
    icon: "🛍️"
  },
  {
    title: "Restaurant Kitchen Installation",
    description: "Commercial kitchen electrical installation including 3-phase distribution board, dedicated circuits for commercial ovens, fryers, dishwasher, extraction system, walk-in fridge, ambient lighting, emergency lighting, and full NICEIC certification.",
    type: 'commercial' as const,
    icon: "🍽️"
  },
  {
    title: "Office Block Lighting Upgrade",
    description: "Replace 200x fluorescent fittings with LED panels across 5 floors. Install presence detection, daylight harvesting, central lighting control system, emergency lighting upgrades, and provide energy savings report and EPC improvement documentation.",
    type: 'commercial' as const,
    icon: "💡"
  },
  // INDUSTRIAL (4 examples)
  {
    title: "Workshop 3-Phase Installation",
    description: "Install 3-phase supply to 500m² workshop including new 200A distribution board, 6x 32A commando sockets, overhead LED high-bay lighting, welding bay with 63A supply, air compressor circuit, machine tool power, and emergency stop system.",
    type: 'industrial' as const,
    icon: "🏭"
  },
  {
    title: "Warehouse Lighting & Power",
    description: "Complete electrical installation for 1000m² warehouse including LED high-bay lighting with PIR control, loading bay 3-phase sockets, forklift charging stations, roller shutter door controls, fire alarm system, and full testing & certification.",
    type: 'industrial' as const,
    icon: "📦"
  },
  {
    title: "Factory Machinery Installation",
    description: "Install power supplies for new CNC machinery including 125A 3-phase distribution board, armoured cable runs, machine isolators, emergency stop circuits, control panel wiring, and commissioning with machinery manufacturers.",
    type: 'industrial' as const,
    icon: "⚙️"
  },
  {
    title: "Cold Storage Unit Electrical",
    description: "Electrical installation for cold storage facility including 3-phase refrigeration supplies, LED cold store lighting, defrost controls, temperature monitoring system, backup generator changeover panel, and alarm system for temperature monitoring.",
    type: 'industrial' as const,
    icon: "❄️"
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
  isProcessing
}: CostEngineerInputProps) => {
  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const config = AGENT_CONFIG['cost-engineer'];
  const charCount = prompt.length;

  // Character count styling
  const getCharCountClass = () => {
    if (charCount < 100) return 'text-white/40';
    if (charCount < 500) return 'text-emerald-400';
    return 'text-amber-400';
  };

  const canGenerate = prompt.trim().length >= 100;

  const handleExampleSelect = (example: typeof EXAMPLE_PROJECTS[0]) => {
    onPromptChange(example.description);
    onProjectTypeChange(example.type);
    setShowExamples(false);
  };

  // Filter examples by selected project type
  const filteredExamples = EXAMPLE_PROJECTS.filter(ex => ex.type === projectType);

  return (
    <div className="space-y-4 pb-24 sm:pb-6">
      {/* Main Project Description */}
      <div
        className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg"
        style={{
          borderColor: `${config.gradientFrom}15`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base sm:text-lg font-bold flex items-center gap-2.5 text-white">
              <div
                className="p-2 rounded-xl shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${config.gradientFrom}30, ${config.gradientTo}30)`,
                  boxShadow: `0 4px 12px ${config.gradientFrom}20`
                }}
              >
                <Calculator className="h-5 w-5" style={{ color: config.gradientFrom }} />
              </div>
              Project Description
            </Label>
            <span className={cn(
              "text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200",
              getCharCountClass(),
              charCount >= 100 && "bg-emerald-500/20 shadow-md"
            )}>
              {charCount} {charCount >= 100 && '✓'}
            </span>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe the electrical work needed in detail. Include scope, specifications, and any special requirements..."
            className="min-h-[140px] text-base bg-white/5 border-2 border-white/20 rounded-xl focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 transition-all text-white placeholder:text-white/40 resize-none touch-manipulation"
            autoComplete="off"
            spellCheck={true}
            maxLength={MAX_CHARS}
            disabled={isProcessing}
          />

          <p className="text-sm text-white font-medium flex items-center gap-2">
            <span className="text-white/60">💡</span>
            100+ characters recommended for accurate pricing
          </p>
        </div>
      </div>

      {/* Project Type Selector - Mobile-First with Touch Targets */}
      <div
        className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg"
        style={{
          borderColor: `${config.gradientFrom}15`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }}
      >
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-bold text-white">Project Type</Label>
          <div className="grid grid-cols-3 gap-3">
            {PROJECT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = projectType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => onProjectTypeChange(type.value)}
                  disabled={isProcessing}
                  className={cn(
                    "flex flex-col items-center gap-2.5 py-4 px-3 rounded-xl border-2 transition-all duration-200 touch-manipulation min-h-[80px] sm:min-h-[90px]",
                    isSelected
                      ? "bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 border-elec-yellow shadow-lg scale-105"
                      : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 active:scale-95"
                  )}
                  style={isSelected ? {
                    borderColor: type.color,
                    boxShadow: `0 4px 16px ${type.color}40`
                  } : undefined}
                >
                  <Icon
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    style={{ color: isSelected ? type.color : '#ffffff80' }}
                  />
                  <span className={cn(
                    "text-sm sm:text-base font-bold",
                    isSelected ? "text-white" : "text-white/70"
                  )}>
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Start Examples - Now shows 4 per type */}
      <Collapsible open={showExamples} onOpenChange={setShowExamples}>
        <div
          className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg"
          style={{
            borderColor: `${config.gradientFrom}15`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          <CollapsibleTrigger className="w-full p-5 flex items-center justify-between touch-manipulation hover:bg-white/5 transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <Lightbulb className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-white">Example Projects</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow">
                  {filteredExamples.length}
                </span>
              </div>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-white/60 transition-transform duration-300",
              showExamples && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="px-5 pb-5">
            <div className="grid gap-3 pt-2">
              {filteredExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleSelect(example)}
                  disabled={isProcessing}
                  className="bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/20 hover:border-elec-yellow/40 rounded-xl p-4 transition-all duration-200 text-left touch-manipulation active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 flex items-center justify-center shadow-md text-xl">
                      {example.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                        {example.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-2">
                        {example.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Optional Project Details */}
      <Collapsible open={showOptionalDetails} onOpenChange={setShowOptionalDetails}>
        <div
          className="bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg"
          style={{
            borderColor: `${config.gradientFrom}15`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }}
        >
          <CollapsibleTrigger className="w-full p-5 flex items-center justify-between touch-manipulation hover:bg-white/5 transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <FileText className="h-5 w-5 text-white/70" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-white">Optional Details</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/50">
                  +15% Accuracy
                </span>
              </div>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-white/60 transition-transform duration-300",
              showOptionalDetails && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="px-5 pb-5">
            <div className="space-y-4 pt-2">
              {/* Project Name */}
              <div className="space-y-2.5">
                <Label className="text-sm font-bold flex items-center gap-2 text-white">
                  <FileText className="h-4 w-4 text-white/60" />
                  Project Name
                </Label>
                <Input
                  value={projectName}
                  onChange={(e) => onProjectNameChange(e.target.value)}
                  placeholder="e.g., Kitchen Rewire - 23 Oak Street"
                  className="h-12 text-base bg-white/5 border-2 border-white/20 rounded-xl focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 text-white placeholder:text-white/40 touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              {/* Client Info */}
              <div className="space-y-2.5">
                <Label className="text-sm font-bold flex items-center gap-2 text-white">
                  <User className="h-4 w-4 text-white/60" />
                  Client Information
                </Label>
                <Input
                  value={clientInfo}
                  onChange={(e) => onClientInfoChange(e.target.value)}
                  placeholder="e.g., John Smith - 07700 900000"
                  className="h-12 text-base bg-white/5 border-2 border-white/20 rounded-xl focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 text-white placeholder:text-white/40 touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              {/* Location */}
              <div className="space-y-2.5">
                <Label className="text-sm font-bold flex items-center gap-2 text-white">
                  <MapPin className="h-4 w-4 text-white/60" />
                  Location
                </Label>
                <Input
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  placeholder="e.g., London, Manchester, Birmingham..."
                  className="h-12 text-base bg-white/5 border-2 border-white/20 rounded-xl focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 text-white placeholder:text-white/40 touch-manipulation"
                  disabled={isProcessing}
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-2.5">
                <Label className="text-sm font-bold text-white">Additional Information</Label>
                <Textarea
                  value={additionalInfo}
                  onChange={(e) => onAdditionalInfoChange(e.target.value)}
                  placeholder="Any additional notes or requirements..."
                  className="min-h-[100px] text-base bg-white/5 border-2 border-white/20 rounded-xl focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 text-white placeholder:text-white/40 resize-none touch-manipulation"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Sticky Submit Button */}
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
