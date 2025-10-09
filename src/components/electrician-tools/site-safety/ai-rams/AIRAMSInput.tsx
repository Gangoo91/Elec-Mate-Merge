import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, HardHat, FileWarning } from 'lucide-react';

export interface AIRAMSInputProps {
  onGenerate: (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
    }
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

  const examplePrompts = [
    'Install new consumer unit with 10-way board',
    'Rewire 3-bedroom house including all circuits',
    'Install EV charging point in residential garage',
    'Emergency lighting installation in commercial unit'
  ];

  const handleSubmit = () => {
    if (jobDescription && projectInfo.projectName) {
      onGenerate(jobDescription, projectInfo);
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
      <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm md:text-base font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Job Description
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the electrical work in detail..."
              disabled={isProcessing}
              className="min-h-[160px] md:min-h-[180px] resize-none text-base bg-background/50 border-primary/20 focus:border-elec-yellow transition-colors"
            />
          </div>

          {/* Example Prompts */}
          <div className="space-y-2.5">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">
              Quick examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setJobDescription(prompt)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 text-xs md:text-sm rounded-full bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/20 hover:border-primary/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Info Card */}
      <Card className="border-none shadow-sm bg-card/60 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6 space-y-4">
          <h3 className="text-base md:text-lg font-semibold flex items-center gap-2">
            <FileWarning className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
            Project Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Project Name"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="e.g., Warehouse Lighting Upgrade"
              disabled={isProcessing}
            />
            
            <MobileInput
              label="Location"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Unit 5, Industrial Estate"
              disabled={isProcessing}
            />
            
            <MobileInput
              label="Assessor"
              value={projectInfo.assessor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Your name"
              disabled={isProcessing}
            />
            
            <MobileInput
              label="Contractor"
              value={projectInfo.contractor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, contractor: e.target.value }))}
              placeholder="Company name"
              disabled={isProcessing}
            />
            
            <MobileInput
              label="Supervisor (Optional)"
              value={projectInfo.supervisor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, supervisor: e.target.value }))}
              placeholder="Site supervisor"
              disabled={isProcessing}
              className="md:col-span-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <MobileButton
        onClick={handleSubmit}
        disabled={!isFormValid || isProcessing}
        loading={isProcessing}
        size="wide"
        variant="elec"
        icon={<HardHat className="h-5 w-5" />}
        className="text-base md:text-lg font-semibold shadow-lg"
      >
        {isProcessing ? 'Generating Documentation...' : 'Generate RAMS Documentation'}
      </MobileButton>

      {!isFormValid && (
        <p className="text-xs md:text-sm text-center text-muted-foreground">
          Please provide job description and project name to continue
        </p>
      )}
    </div>
  );
};
