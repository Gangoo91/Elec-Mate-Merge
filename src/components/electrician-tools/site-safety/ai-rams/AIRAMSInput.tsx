import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, Zap, HardHat, FileWarning, ChevronDown, Shield } from 'lucide-react';
import { JobScaleBadge } from './JobScaleBadge';

export interface AIRAMSInputProps {
  onGenerate: (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
      siteManagerName?: string;
      siteManagerPhone?: string;
      firstAiderName?: string;
      firstAiderPhone?: string;
      safetyOfficerName?: string;
      safetyOfficerPhone?: string;
      assemblyPoint?: string;
    },
    jobScale: 'domestic' | 'commercial' | 'industrial'
  ) => void;
  isProcessing: boolean;
}

export const AIRAMSInput: React.FC<AIRAMSInputProps> = ({
  onGenerate,
  isProcessing
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    location: '',
    assessor: '',
    contractor: '',
    supervisor: '',
    siteManagerName: '',
    siteManagerPhone: '',
    firstAiderName: '',
    firstAiderPhone: '',
    safetyOfficerName: '',
    safetyOfficerPhone: '',
    assemblyPoint: ''
  });

  const [detectedScale, setDetectedScale] = useState<'domestic' | 'commercial' | 'industrial'>('commercial');
  const [manualScale, setManualScale] = useState<'domestic' | 'commercial' | 'industrial' | null>(null);
  const [scaleConfidence, setScaleConfidence] = useState<number>(0);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  const examplePrompts: Record<'domestic' | 'commercial' | 'industrial', string[]> = {
    domestic: [
      'Install new consumer unit in 3-bed house',
      'Rewire kitchen and add socket circuit',
      'Install EV charging point in residential garage',
      'Add shower circuit in bathroom'
    ],
    commercial: [
      'Emergency lighting installation in office building',
      'Distribution board upgrade in retail unit',
      'Fire alarm panel replacement in school',
      'Install socket circuits in new restaurant'
    ],
    industrial: [
      'Install 3-phase motor circuit in factory',
      '400V distribution upgrade in warehouse',
      'Switchgear replacement in manufacturing plant',
      'Cable tray installation for production line'
    ]
  };

  const detectJobScale = (description: string, location: string): { scale: 'domestic' | 'commercial' | 'industrial'; confidence: number } => {
    const text = `${description} ${location}`.toLowerCase();
    
    // Industrial indicators (highest priority)
    const industrialKeywords = ['factory', 'plant', 'industrial estate', 'warehouse', 'manufacturing', 'substation', '3-phase motor', 'hv', '400v', 'switchgear', 'production line'];
    const industrialScore = industrialKeywords.filter(k => text.includes(k)).length;
    
    // Commercial indicators
    const commercialKeywords = ['office', 'shop', 'retail', 'restaurant', 'hotel', 'school', 'hospital', 'commercial', 'business premises', 'surgery'];
    const commercialScore = commercialKeywords.filter(k => text.includes(k)).length;
    
    // Domestic indicators
    const domesticKeywords = ['house', 'home', 'flat', 'apartment', 'bungalow', 'kitchen', 'bedroom', 'domestic', 'residential', 'consumer unit'];
    const domesticScore = domesticKeywords.filter(k => text.includes(k)).length;
    
    // Determine scale with confidence
    if (industrialScore >= 2 || text.includes('factory')) {
      return { scale: 'industrial', confidence: Math.min(industrialScore * 30 + 40, 95) };
    } else if (commercialScore >= 2 || (commercialScore === 1 && industrialScore === 0)) {
      return { scale: 'commercial', confidence: Math.min(commercialScore * 25 + 50, 90) };
    } else if (domesticScore >= 1) {
      return { scale: 'domestic', confidence: Math.min(domesticScore * 20 + 60, 85) };
    }
    
    return { scale: 'commercial', confidence: 40 }; // Default fallback
  };

  useEffect(() => {
    if (jobDescription || projectInfo.location) {
      const { scale, confidence } = detectJobScale(jobDescription, projectInfo.location);
      setDetectedScale(scale);
      setScaleConfidence(confidence);
    }
  }, [jobDescription, projectInfo.location]);

  const handleSubmit = () => {
    if (jobDescription && projectInfo.projectName) {
      const finalScale = manualScale || detectedScale;
      onGenerate(jobDescription, projectInfo, finalScale);
    }
  };

  const isFormValid = jobDescription.trim() && projectInfo.projectName.trim();
  const completionPercentage = Math.round(
    ([jobDescription, projectInfo.projectName, projectInfo.location, projectInfo.assessor].filter(Boolean).length / 4) * 100
  );

  return (
    <div className="space-y-6 md:space-y-8 px-3 sm:px-0">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br from-elec-yellow via-yellow-400 to-elec-yellow/70 flex items-center justify-center shadow-lg shadow-elec-yellow/30 animate-pulse-glow">
            <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-elec-dark animate-float" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-transparent blur-xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight bg-gradient-to-r from-elec-light via-foreground to-elec-light bg-clip-text text-transparent">
              Job Details
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-1">
              Describe your electrical work in detail
            </p>
          </div>
        </div>
        
        {/* Enhanced Progress indicator */}
        {completionPercentage > 0 && completionPercentage < 100 && (
          <div className="space-y-2 p-4 rounded-xl bg-elec-card/50 border border-elec-yellow/20">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Form Completion</span>
              <span className="text-lg font-bold text-elec-yellow tabular-nums">{completionPercentage}%</span>
            </div>
            <div className="h-2.5 md:h-3 bg-elec-grey rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-elec-yellow via-yellow-400 to-elec-yellow transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${completionPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Job Description Card */}
      <Card className="border-0 md:border md:border-elec-yellow/30 shadow-none md:shadow-xl bg-transparent md:bg-elec-card/80 md:backdrop-blur-sm hover:border-elec-yellow/50 transition-all duration-300 rounded-none md:rounded-2xl">
        <CardContent className="p-4 md:p-6 lg:p-8 space-y-6">
          <div className="space-y-4">
            <label className="text-lg md:text-base font-bold text-foreground tracking-wide flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 flex items-center justify-center border border-elec-yellow/30">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <span>Job Description</span>
            </label>
            <div className="relative">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the electrical work in detail... e.g., Install new consumer unit in 3-bed house with full rewire of kitchen and additional circuits"
                disabled={isProcessing}
                className="resize-none min-h-[140px] md:min-h-[120px] text-base bg-elec-grey/80 border-elec-yellow/30 focus-visible:border-elec-yellow focus-visible:ring-elec-yellow/30 transition-all pr-20"
                maxLength={1000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground font-medium">
                {jobDescription.length}/1000
              </div>
            </div>
          </div>

          {/* Enhanced Job Scale Detection */}
          {scaleConfidence > 0 && (
            <div className="space-y-4 p-4 rounded-xl bg-elec-grey/50 border border-elec-yellow/20">
              <JobScaleBadge 
                scale={manualScale || detectedScale}
                confidence={scaleConfidence}
                onManualChange={setManualScale}
              />
            </div>
          )}

          {/* Enhanced Example Prompts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HardHat className="h-4 w-4 text-elec-yellow" />
              <p className="text-sm font-bold text-foreground tracking-wide">
                Quick Examples:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {examplePrompts[manualScale || detectedScale].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setJobDescription(prompt)}
                  disabled={isProcessing}
                  className="group min-h-[56px] px-5 py-3 text-sm font-medium rounded-xl bg-gradient-to-br from-elec-grey to-elec-grey/80 border border-elec-yellow/30 hover:border-elec-yellow hover:shadow-lg hover:shadow-elec-yellow/20 text-foreground transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-left"
                >
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5 group-hover:animate-pulse" />
                    <span className="line-clamp-2">{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Project Info Card */}
      <Card className="border-0 md:border md:border-elec-yellow/30 shadow-none md:shadow-xl bg-transparent md:bg-elec-card/80 md:backdrop-blur-sm hover:border-elec-yellow/50 transition-all duration-300 rounded-none md:rounded-2xl">
        <CardContent className="p-4 md:p-6 lg:p-8 space-y-6">
          <h3 className="text-xl md:text-lg font-bold tracking-tight leading-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 flex items-center justify-center border border-elec-yellow/30">
              <FileWarning className="h-5 w-5 text-elec-yellow" />
            </div>
            <span>Project Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <MobileInput
              label="Project Name"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="e.g., Warehouse Lighting Upgrade"
              disabled={isProcessing}
              className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base focus-visible:border-elec-yellow"
            />
            
            <MobileInput
              label="Location"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Unit 5, Industrial Estate"
              disabled={isProcessing}
              className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base focus-visible:border-elec-yellow"
            />
            
            <MobileInput
              label="Assessor"
              value={projectInfo.assessor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Your name"
              disabled={isProcessing}
              className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base focus-visible:border-elec-yellow"
            />
            
            <MobileInput
              label="Contractor"
              value={projectInfo.contractor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, contractor: e.target.value }))}
              placeholder="Company name"
              disabled={isProcessing}
              className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base focus-visible:border-elec-yellow"
            />
            
            <MobileInput
              label="Supervisor (Optional)"
              value={projectInfo.supervisor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, supervisor: e.target.value }))}
              placeholder="Site supervisor"
              disabled={isProcessing}
              className="md:col-span-2 bg-elec-grey/80 border-elec-yellow/30 h-14 text-base focus-visible:border-elec-yellow"
            />
          </div>

          {/* Enhanced Emergency Contacts Section */}
          <Collapsible open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-elec-grey/80 to-elec-grey/60 hover:from-elec-yellow/10 hover:to-elec-yellow/5 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all min-h-[56px] touch-manipulation group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-elec-yellow group-hover:animate-pulse" />
                  <span className="text-base font-semibold text-foreground">Emergency Contacts & Site Personnel</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 font-medium">
                    Optional - Recommended
                  </span>
                </div>
                <ChevronDown className={`h-5 w-5 text-elec-yellow transition-transform duration-300 ${showEmergencyContacts ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <MobileInput
                  label="Site Manager Name"
                  value={projectInfo.siteManagerName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, siteManagerName: e.target.value }))}
                  placeholder="John Smith"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="Site Manager Phone"
                  value={projectInfo.siteManagerPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, siteManagerPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="First Aider Name"
                  value={projectInfo.firstAiderName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, firstAiderName: e.target.value }))}
                  placeholder="Jane Doe"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="First Aider Phone"
                  value={projectInfo.firstAiderPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, firstAiderPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="H&S Officer Name"
                  value={projectInfo.safetyOfficerName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, safetyOfficerName: e.target.value }))}
                  placeholder="Safety Officer"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="H&S Officer Phone"
                  value={projectInfo.safetyOfficerPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, safetyOfficerPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
                <MobileInput
                  label="Emergency Assembly Point"
                  value={projectInfo.assemblyPoint}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, assemblyPoint: e.target.value }))}
                  placeholder="e.g., Main car park, Site entrance"
                  disabled={isProcessing}
                  className="md:col-span-2 bg-elec-grey/80 border-elec-yellow/30 h-14 text-base"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Enhanced Generate Button */}
      <div className="mt-6">
        <MobileButton
          onClick={handleSubmit}
          disabled={!isFormValid || isProcessing}
          loading={isProcessing}
          size="lg"
          variant="elec"
          icon={<HardHat className="h-6 w-6" />}
          className="w-full text-xl sm:text-lg font-bold tracking-wide shadow-2xl shadow-elec-yellow/30 hover:shadow-elec-yellow/50 hover:scale-[1.02] transition-all duration-200 h-16 sm:h-14 rounded-xl"
        >
          {isProcessing ? 'Generating RAMS...' : 'Generate Professional RAMS'}
        </MobileButton>
      </div>

      {!isFormValid && (
        <div className="text-center p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
          <p className="text-sm font-semibold text-elec-yellow leading-relaxed">
            Please provide job description and project name to continue
          </p>
        </div>
      )}
    </div>
  );
};
