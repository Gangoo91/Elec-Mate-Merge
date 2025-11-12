import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Sparkles, Clipboard } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface MethodStatementInputProps {
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

export const MethodStatementInput: React.FC<MethodStatementInputProps> = ({
  onGenerate,
  isProcessing
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [assessor, setAssessor] = useState('');
  const [contractor, setContractor] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [jobScale, setJobScale] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');

  const handleSubmit = () => {
    if (!jobDescription.trim() || !projectName.trim()) return;
    
    onGenerate(
      jobDescription,
      {
        projectName,
        location,
        assessor,
        contractor,
        supervisor
      },
      jobScale
    );
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 bg-elec-card border-emerald-500/20">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clipboard className="h-5 w-5 text-emerald-400" />
          <h2 className="text-xl font-semibold">Job Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the electrical work to be carried out, including scope, location, and any special considerations..."
              className="min-h-[120px] bg-elec-dark/50 border-emerald-500/20 focus:border-emerald-500/50"
              disabled={isProcessing}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Kitchen Rewire"
                className="bg-elec-dark/50 border-emerald-500/20 focus:border-emerald-500/50"
                disabled={isProcessing}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., 123 Main Street, London"
                className="bg-elec-dark/50 border-emerald-500/20 focus:border-emerald-500/50"
                disabled={isProcessing}
              />
            </div>

            <div>
              <Label htmlFor="contractor">Contractor</Label>
              <Input
                id="contractor"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                placeholder="e.g., ABC Electrical Ltd"
                className="bg-elec-dark/50 border-emerald-500/20 focus:border-emerald-500/50"
                disabled={isProcessing}
              />
            </div>

            <div>
              <Label htmlFor="supervisor">Supervisor</Label>
              <Input
                id="supervisor"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="e.g., John Smith"
                className="bg-elec-dark/50 border-emerald-500/20 focus:border-emerald-500/50"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div>
            <Label>Job Scale</Label>
            <RadioGroup value={jobScale} onValueChange={(value: any) => setJobScale(value)} className="flex gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="domestic" id="domestic" disabled={isProcessing} />
                <Label htmlFor="domestic" className="cursor-pointer">Domestic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" disabled={isProcessing} />
                <Label htmlFor="commercial" className="cursor-pointer">Commercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="industrial" id="industrial" disabled={isProcessing} />
                <Label htmlFor="industrial" className="cursor-pointer">Industrial</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!jobDescription.trim() || !projectName.trim() || isProcessing}
          className="w-full h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isProcessing ? 'Generating...' : 'Generate Method Statement'}
        </Button>
      </div>
    </Card>
  );
};
