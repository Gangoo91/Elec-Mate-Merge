import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Zap } from 'lucide-react';

interface AIRAMSInputProps {
  onGenerate: (jobDescription: string, projectInfo: {
    projectName: string;
    location: string;
    assessor: string;
    contractor: string;
    supervisor: string;
  }) => void;
  isProcessing: boolean;
}

export const AIRAMSInput: React.FC<AIRAMSInputProps> = ({ onGenerate, isProcessing }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    location: '',
    assessor: '',
    contractor: '',
    supervisor: ''
  });

  const examplePrompts = [
    "Installing a 10.5kW electric shower circuit in a domestic bathroom",
    "Complete rewire of a 3-bedroom house including consumer unit upgrade",
    "Installing outdoor socket for EV charger in domestic garage",
    "Commercial kitchen electrical installation with 3-phase cooker circuits"
  ];

  const handleSubmit = () => {
    if (jobDescription.trim() && projectInfo.projectName && projectInfo.assessor) {
      onGenerate(jobDescription, projectInfo);
    }
  };

  const canGenerate = jobDescription.trim().length > 10 && 
                       projectInfo.projectName.trim().length > 0 &&
                       projectInfo.assessor.trim().length > 0;

  return (
    <Card className="border-primary/30 bg-card/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          AI-Powered RAMS Generator
        </CardTitle>
        <CardDescription>
          Describe your electrical work and let our AI agents create comprehensive RAMS documentation for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Description */}
        <div>
          <Label htmlFor="jobDescription" className="text-foreground">
            Describe the Electrical Work *
          </Label>
          <Textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g., Installing a 10.5kW shower circuit in a domestic bathroom..."
            className="mt-2 min-h-[120px] bg-background/50 border-primary/30 text-foreground"
            disabled={isProcessing}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Be specific about the type of work, location, and any special requirements
          </p>
        </div>

        {/* Example Prompts */}
        <div>
          <Label className="text-foreground text-sm mb-2 block">Example Prompts:</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examplePrompts.map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setJobDescription(example)}
                disabled={isProcessing}
                className="text-xs text-left justify-start h-auto py-2 px-3 hover:bg-primary/10"
              >
                <Zap className="h-3 w-3 mr-2 flex-shrink-0 text-elec-yellow" />
                <span className="line-clamp-2">{example}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/40">
          <div>
            <Label htmlFor="projectName" className="text-foreground">
              Project Name *
            </Label>
            <Input
              id="projectName"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))}
              placeholder="Enter project name"
              className="mt-1 bg-background/50 border-primary/30 text-foreground"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-foreground">
              Location
            </Label>
            <Input
              id="location"
              value={projectInfo.location}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter location"
              className="mt-1 bg-background/50 border-primary/30 text-foreground"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="assessor" className="text-foreground">
              Assessor Name *
            </Label>
            <Input
              id="assessor"
              value={projectInfo.assessor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Your name"
              className="mt-1 bg-background/50 border-primary/30 text-foreground"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="contractor" className="text-foreground">
              Contractor
            </Label>
            <Input
              id="contractor"
              value={projectInfo.contractor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, contractor: e.target.value }))}
              placeholder="Contractor name"
              className="mt-1 bg-background/50 border-primary/30 text-foreground"
              disabled={isProcessing}
            />
          </div>

          <div>
            <Label htmlFor="supervisor" className="text-foreground">
              Supervisor
            </Label>
            <Input
              id="supervisor"
              value={projectInfo.supervisor}
              onChange={(e) => setProjectInfo(prev => ({ ...prev, supervisor: e.target.value }))}
              placeholder="Supervisor name"
              className="mt-1 bg-background/50 border-primary/30 text-foreground"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleSubmit}
          disabled={!canGenerate || isProcessing}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          {isProcessing ? 'Generating...' : 'Generate RAMS Documentation'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Our AI will analyze your job and create professional RAMS documentation in seconds
        </p>
      </CardContent>
    </Card>
  );
};
