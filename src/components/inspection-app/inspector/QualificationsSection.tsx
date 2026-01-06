
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

interface QualificationsSectionProps {
  selectedQualifications: string[];
  onToggleQualification: (qualification: string) => void;
}

const qualificationOptions = [
  'C&G 2391-50 (Inspection & Testing)',
  'C&G 2391-52 (Inspection & Testing)', 
  '18th Edition BS7671',
  'C&G 2394/2395 (Design & Verification)',
  'AM2 (Achievement Measurement)',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 4 Inspection & Testing'
];

const QualificationsSection = ({ 
  selectedQualifications, 
  onToggleQualification 
}: QualificationsSectionProps) => {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2 text-sm font-medium text-white/80">
        <Award className="h-4 w-4 text-elec-yellow" />
        Qualifications *
      </Label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border border-border/50 rounded-md bg-background/50">
        {qualificationOptions.map((qual) => (
          <div key={qual} className="flex items-center space-x-2">
            <Checkbox
              id={qual}
              checked={selectedQualifications.includes(qual)}
              onCheckedChange={() => onToggleQualification(qual)}
              className="border-white/60 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
            />
            <Label htmlFor={qual} className="text-sm text-foreground cursor-pointer leading-tight">
              {qual}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualificationsSection;
