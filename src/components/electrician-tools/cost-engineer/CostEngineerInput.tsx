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

  const handleExampleSelect = (example: string) => {
    onPromptChange(example);
    setShowExamples(false);
  };

  const EXAMPLE_PROJECTS = [
    {
      title: "Consumer Unit Replacement",
      description: "Replace existing consumer unit with 18-way dual RCD board, including AFDD protection for socket circuits",
      type: 'domestic' as const
    },
    {
      title: "Office Rewire",
      description: "Full rewire of 200m² office space including new distribution board, LED lighting throughout, CAT6 data cabling to 20 points, and emergency lighting",
      type: 'commercial' as const
    },
    {
      title: "Workshop Power Installation",
      description: "Install 3-phase supply to workshop with 6x 32A commando sockets, overhead lighting, and sub-distribution board",
      type: 'industrial' as const
    }
  ];

  return (
    <div className="space-y-4 pb-24 sm:pb-6">
      {/* Main Project Description */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: `${config.gradientFrom}20` }}
              >
                <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
              </div>
              Project Description
            </Label>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-lg transition-colors",
              getCharCountClass(),
              charCount >= 100 && "bg-white/5"
            )}>
              {charCount} {charCount >= 100 && '✓'}
            </span>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe the electrical work needed in detail. Include scope, specifications, and any special requirements..."
            className="agent-input"
            rows={5}
            autoComplete="off"
            spellCheck={true}
            maxLength={MAX_CHARS}
            disabled={isProcessing}
          />

          <p className="text-xs sm:text-sm text-white/50">
            100+ characters recommended for accurate pricing
          </p>
        </div>
      </div>

      {/* Project Type Selector */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold">Project Type</Label>
          <div className="grid grid-cols-3 gap-2">
            {PROJECT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = projectType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => onProjectTypeChange(type.value)}
                  disabled={isProcessing}
                  className={cn(
                    "agent-type-button flex flex-col items-center gap-2 py-3",
                    isSelected
                      ? "bg-elec-yellow/20 border-elec-yellow text-white"
                      : "agent-type-button-inactive"
                  )}
                  style={isSelected ? { borderColor: type.color } : undefined}
                >
                  <Icon className="h-5 w-5" style={isSelected ? { color: type.color } : undefined} />
                  <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Start Examples */}
      <Collapsible open={showExamples} onOpenChange={setShowExamples}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Example Projects</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Quick Start
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showExamples && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid gap-2">
              {EXAMPLE_PROJECTS.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleExampleSelect(example.description);
                    onProjectTypeChange(example.type);
                  }}
                  disabled={isProcessing}
                  className="agent-template-card text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1">{example.title}</h4>
                      <p className="text-xs text-white/60 line-clamp-2">{example.description}</p>
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
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Optional Details</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Optional
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showOptionalDetails && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0 space-y-4">
            {/* Project Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2 text-white/80">
                <FileText className="h-3.5 w-3.5" />
                Project Name
              </Label>
              <Input
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                placeholder="e.g., Kitchen Rewire - 23 Oak Street"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 bg-white/5"
                disabled={isProcessing}
              />
            </div>

            {/* Client Info */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2 text-white/80">
                <User className="h-3.5 w-3.5" />
                Client Information
              </Label>
              <Input
                value={clientInfo}
                onChange={(e) => onClientInfoChange(e.target.value)}
                placeholder="e.g., John Smith - 07700 900000"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 bg-white/5"
                disabled={isProcessing}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2 text-white/80">
                <MapPin className="h-3.5 w-3.5" />
                Location
              </Label>
              <Input
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="e.g., London, Manchester, Birmingham..."
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 bg-white/5"
                disabled={isProcessing}
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white/80">Additional Information</Label>
              <Textarea
                value={additionalInfo}
                onChange={(e) => onAdditionalInfoChange(e.target.value)}
                placeholder="Any additional notes or requirements..."
                className="agent-input"
                rows={3}
                disabled={isProcessing}
              />
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
