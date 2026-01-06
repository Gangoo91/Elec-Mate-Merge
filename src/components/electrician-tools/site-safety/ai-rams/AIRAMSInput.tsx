import React, { useState, useEffect } from 'react';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sparkles, Zap, ChevronDown, Shield, TestTube2 } from 'lucide-react';
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
      'Consumer unit in 3-bed house',
      'Rewire kitchen + sockets',
      'EV charger in garage',
      'Bathroom shower circuit'
    ],
    commercial: [
      'Emergency lighting in office',
      'DB upgrade in retail unit',
      'Fire alarm in school',
      'Socket circuits in restaurant'
    ],
    industrial: [
      '3-phase motor in factory',
      '400V distribution upgrade',
      'Switchgear replacement',
      'Cable tray for production'
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

  const loadMockData = () => {
    setJobDescription('Install new 3-phase distribution board in warehouse with additional socket circuits, emergency lighting, and fire alarm panel upgrade. Work includes cable containment, trunking installation, and testing of existing circuits.');
    setProjectInfo({
      projectName: 'Industrial Warehouse Electrical Upgrade',
      location: 'Unit 12, Riverside Industrial Estate, Manchester',
      assessor: 'John Smith',
      contractor: 'Elite Electrical Solutions Ltd',
      supervisor: 'Sarah Johnson',
      siteManagerName: 'Michael Brown',
      siteManagerPhone: '07892 123456',
      firstAiderName: 'Emma Wilson',
      firstAiderPhone: '07891 234567',
      safetyOfficerName: 'David Taylor',
      safetyOfficerPhone: '07890 345678',
      assemblyPoint: 'Main car park near site entrance'
    });
    setManualScale('industrial');
    setShowEmergencyContacts(true);
  };

  const isFormValid = jobDescription.trim() && projectInfo.projectName.trim();
  const completionPercentage = Math.round(
    ([jobDescription, projectInfo.projectName, projectInfo.location, projectInfo.assessor].filter(Boolean).length / 4) * 100
  );

  return (
    <div className="max-w-3xl mx-auto pb-32 md:pb-8">
      {/* Enhanced Header */}
      <div
        className="flex items-center justify-between mb-8 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        style={{ animationDelay: '0ms' }}
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
            <Sparkles className="h-7 w-7 md:h-8 md:w-8 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              AI RAMS Generator
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-1">
              Generate professional documentation
            </p>
          </div>
        </div>

        {/* Enhanced Progress indicator */}
        {completionPercentage > 0 && completionPercentage < 100 && (
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Form Completion</span>
              <span className="text-lg font-bold text-elec-yellow tabular-nums">{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Job Description Section */}
      <div
        className="space-y-3 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        style={{ animationDelay: '50ms' }}
      >
        <label className="text-sm font-medium text-white/70 flex items-center gap-2">
          <Zap className="h-4 w-4 text-elec-yellow" />
          Describe your job <span className="text-elec-yellow">*</span>
        </label>
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="e.g., Install new consumer unit in 3-bed house with full rewire of kitchen..."
          disabled={isProcessing}
          className="resize-none min-h-[120px] text-base bg-white/[0.03] border-white/10 focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/20 transition-all placeholder:text-white/30 rounded-xl"
          maxLength={1000}
        />

        {/* Horizontal Scrolling Example Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {examplePrompts[manualScale || detectedScale].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setJobDescription(prompt)}
              disabled={isProcessing}
              className="flex-shrink-0 px-3 py-2 text-xs rounded-lg bg-white/[0.03] border border-white/10 hover:border-elec-yellow/30 hover:bg-elec-yellow/5 text-white/70 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Job Scale Badge */}
      {scaleConfidence > 0 && (
        <div
          className="mt-4 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
          style={{ animationDelay: '100ms' }}
        >
          <JobScaleBadge
            scale={manualScale || detectedScale}
            confidence={scaleConfidence}
            onManualChange={setManualScale}
          />
        </div>
      )}

      {/* Divider */}
      <div className="h-px bg-white/5 my-6" />

      {/* Project Details Section */}
      <div
        className="space-y-4 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        style={{ animationDelay: '150ms' }}
      >
        <h3 className="text-sm font-medium text-white/70">Project Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MobileInput
              label="Project Name"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="e.g., Warehouse Lighting Upgrade"
              disabled={isProcessing}
              className="bg-white/[0.03] border-white/10 h-12 text-base focus-visible:border-elec-yellow/50"
            />

            <MobileInput
              label="Location"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Unit 5, Industrial Estate"
              disabled={isProcessing}
              className="bg-white/[0.03] border-white/10 h-12 text-base focus-visible:border-elec-yellow/50"
            />

            <MobileInput
              label="Assessor"
              value={projectInfo.assessor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Your name"
              disabled={isProcessing}
              className="bg-white/[0.03] border-white/10 h-12 text-base focus-visible:border-elec-yellow/50"
            />

            <MobileInput
              label="Contractor"
              value={projectInfo.contractor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, contractor: e.target.value }))}
              placeholder="Company name"
              disabled={isProcessing}
              className="bg-white/[0.03] border-white/10 h-12 text-base focus-visible:border-elec-yellow/50"
            />

            <MobileInput
              label="Supervisor (Optional)"
              value={projectInfo.supervisor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, supervisor: e.target.value }))}
              placeholder="Site supervisor"
              disabled={isProcessing}
              className="sm:col-span-2 bg-white/[0.03] border-white/10 h-12 text-base focus-visible:border-elec-yellow/50"
            />
          </div>

          {/* Enhanced Emergency Contacts Section */}
          <Collapsible open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-elec-yellow/30 transition-all touch-manipulation group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <span className="text-sm font-medium text-white">Emergency Contacts</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/70 font-medium">
                    Optional
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-white/70 transition-transform duration-300 ${showEmergencyContacts ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MobileInput
                  label="Site Manager Name"
                  value={projectInfo.siteManagerName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, siteManagerName: e.target.value }))}
                  placeholder="John Smith"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="Site Manager Phone"
                  value={projectInfo.siteManagerPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, siteManagerPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="First Aider Name"
                  value={projectInfo.firstAiderName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, firstAiderName: e.target.value }))}
                  placeholder="Jane Doe"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="First Aider Phone"
                  value={projectInfo.firstAiderPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, firstAiderPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="H&S Officer Name"
                  value={projectInfo.safetyOfficerName}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, safetyOfficerName: e.target.value }))}
                  placeholder="Safety Officer"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="H&S Officer Phone"
                  value={projectInfo.safetyOfficerPhone}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, safetyOfficerPhone: e.target.value }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  className="bg-white/[0.03] border-white/10 h-12 text-base"
                />
                <MobileInput
                  label="Emergency Assembly Point"
                  value={projectInfo.assemblyPoint}
                  onChange={(e) => setProjectInfo(prev => ({ ...prev, assemblyPoint: e.target.value }))}
                  placeholder="e.g., Main car park, Site entrance"
                  disabled={isProcessing}
                  className="sm:col-span-2 bg-white/[0.03] border-white/10 h-12 text-base"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 my-6" />

      {/* Test Data Button */}
      <div
        className="mt-6 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        style={{ animationDelay: '250ms' }}
      >
        <button
          onClick={loadMockData}
          disabled={isProcessing}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white/60 transition-colors disabled:opacity-50"
        >
          <TestTube2 className="h-4 w-4" />
          <span>Load test data</span>
        </button>
      </div>

      {/* Sticky Bottom CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-elec-dark via-elec-dark to-transparent md:hidden z-50">
        <MobileButton
          onClick={handleSubmit}
          disabled={!isFormValid || isProcessing}
          loading={isProcessing}
          size="lg"
          variant="elec"
          icon={<Sparkles className="h-5 w-5" />}
          className="w-full text-base font-bold h-14 rounded-xl shadow-lg shadow-elec-yellow/20"
        >
          {isProcessing ? 'Generating RAMS...' : 'Generate RAMS'}
        </MobileButton>
      </div>

      {/* Desktop CTA */}
      <div
        className="hidden md:block mt-8 opacity-0 animate-[fadeInUp_0.4s_ease-out_forwards]"
        style={{ animationDelay: '350ms' }}
      >
        <MobileButton
          onClick={handleSubmit}
          disabled={!isFormValid || isProcessing}
          loading={isProcessing}
          size="lg"
          variant="elec"
          icon={<Sparkles className="h-5 w-5" />}
          className="w-full text-base font-bold h-14 rounded-xl shadow-lg shadow-elec-yellow/20"
        >
          {isProcessing ? 'Generating RAMS...' : 'Generate RAMS'}
        </MobileButton>
      </div>

      {!isFormValid && (
        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-white/70">
            Please provide job description and project name to continue
          </p>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
