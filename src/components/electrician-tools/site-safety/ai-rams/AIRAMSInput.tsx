import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, HardHat, FileWarning } from 'lucide-react';
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
    supervisor: ''
  });

  const [detectedScale, setDetectedScale] = useState<'domestic' | 'commercial' | 'industrial'>('commercial');
  const [manualScale, setManualScale] = useState<'domestic' | 'commercial' | 'industrial' | null>(null);
  const [scaleConfidence, setScaleConfidence] = useState<number>(0);

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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-br from-elec-yellow to-elec-yellow/70 flex items-center justify-center">
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              AI RAMS Generator
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-0.5">
              Describe your electrical work
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        {completionPercentage > 0 && completionPercentage < 100 && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Form completion</span>
              <span className="font-medium text-elec-yellow">{completionPercentage}%</span>
            </div>
            <div className="h-1.5 bg-card rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Job Description Card */}
      <Card className="border-elec-yellow/20 shadow-md bg-elec-grey">
        <CardContent className="p-5 md:p-6 space-y-5">
          <div className="space-y-3">
            <label className="text-base md:text-sm font-semibold text-elec-light tracking-wide flex items-center gap-2">
              <Zap className="h-5 w-5 md:h-4 md:w-4 text-elec-yellow" />
              Job Description
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the electrical work in detail..."
              disabled={isProcessing}
              className="resize-none"
            />
          </div>

          {/* Job Scale Detection */}
          {scaleConfidence > 0 && (
            <div className="space-y-3">
              <JobScaleBadge 
                scale={manualScale || detectedScale}
                confidence={scaleConfidence}
                onManualChange={setManualScale}
              />
            </div>
          )}

          {/* Example Prompts */}
          <div className="space-y-3">
            <p className="text-sm md:text-sm font-semibold text-elec-light/70 tracking-wide">
              Quick examples:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {examplePrompts[manualScale || detectedScale].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setJobDescription(prompt)}
                  disabled={isProcessing}
                  className="min-h-[44px] px-4 py-2.5 text-sm font-medium rounded-full bg-elec-grey border border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow text-elec-light transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Info Card */}
      <Card className="border-elec-yellow/20 shadow-md bg-elec-grey">
        <CardContent className="p-5 md:p-6 space-y-5">
          <h3 className="text-lg md:text-lg font-bold tracking-tight leading-tight flex items-center gap-2.5">
            <FileWarning className="h-5 w-5 md:h-5 md:w-5 text-elec-yellow" />
            Project Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-4">
            <MobileInput
              label="Project Name"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="e.g., Warehouse Lighting Upgrade"
              disabled={isProcessing}
              className="bg-elec-grey border-elec-yellow/20 h-14 text-base"
            />
            
            <MobileInput
              label="Location"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Unit 5, Industrial Estate"
              disabled={isProcessing}
              className="bg-elec-grey border-elec-yellow/20 h-14 text-base"
            />
            
            <MobileInput
              label="Assessor"
              value={projectInfo.assessor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Your name"
              disabled={isProcessing}
              className="bg-elec-grey border-elec-yellow/20 h-14 text-base"
            />
            
            <MobileInput
              label="Contractor"
              value={projectInfo.contractor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, contractor: e.target.value }))}
              placeholder="Company name"
              disabled={isProcessing}
              className="bg-elec-grey border-elec-yellow/20 h-14 text-base"
            />
            
            <MobileInput
              label="Supervisor (Optional)"
              value={projectInfo.supervisor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, supervisor: e.target.value }))}
              placeholder="Site supervisor"
              disabled={isProcessing}
              className="md:col-span-2 bg-elec-grey border-elec-yellow/20 h-14 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <MobileButton
        onClick={handleSubmit}
        disabled={!isFormValid || isProcessing}
        loading={isProcessing}
        size="lg"
        variant="elec"
        icon={<HardHat className="h-5 w-5" />}
        className="w-full text-lg font-bold tracking-wide shadow-lg"
      >
        {isProcessing ? 'Generating...' : 'Generate'}
      </MobileButton>

      {!isFormValid && (
        <p className="text-sm md:text-sm text-center text-elec-light/60 font-medium leading-relaxed">
          Please provide job description and project name to continue
        </p>
      )}
    </div>
  );
};
