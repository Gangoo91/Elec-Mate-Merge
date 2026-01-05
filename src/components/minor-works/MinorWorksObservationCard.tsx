import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Info, Minus, Search, Trash2 } from 'lucide-react';

export interface MinorWorksObservation {
  id: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A';
  description: string;
  recommendation: string;
}

interface MinorWorksObservationCardProps {
  observation: MinorWorksObservation;
  index: number;
  onUpdate: (id: string, field: keyof MinorWorksObservation, value: any) => void;
  onRemove: (id: string) => void;
}

const commonObservations = {
  'C1': [
    'No defects found requiring immediate attention',
    'Live parts exposed',
    'Missing earth connection',
    'Inadequate protection against electric shock',
    'Damaged protective conductor'
  ],
  'C2': [
    'No defects requiring urgent attention',
    'Loose connections observed',
    'Missing RCD protection',
    'Inadequate earthing arrangements',
    'Overloaded circuit'
  ],
  'C3': [
    'No improvements recommended',
    'Cable support could be improved',
    'Additional socket outlets recommended',
    'Consider upgrading consumer unit',
    'Improve cable management'
  ],
  'FI': [
    'No further investigation required',
    'Zs values require further investigation',
    'Bonding arrangements need verification',
    'Circuit loading requires assessment',
    'Installation age warrants further inspection'
  ],
  'N/A': [
    'Not applicable to this installation',
    'No observations for this category'
  ]
};

const getSeverityIcon = (code: string) => {
  switch (code) {
    case 'C1': return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'C2': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'C3': return <Info className="h-4 w-4 text-blue-500" />;
    case 'FI': return <Search className="h-4 w-4 text-purple-500" />;
    case 'N/A': return <Minus className="h-4 w-4 text-gray-500" />;
    default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  }
};

const getBorderColor = (code: string) => {
  switch (code) {
    case 'C1': return 'border-l-red-500';
    case 'C2': return 'border-l-orange-500';
    case 'C3': return 'border-l-blue-500';
    case 'FI': return 'border-l-purple-500';
    case 'N/A': return 'border-l-gray-500';
    default: return 'border-l-yellow-500';
  }
};

const getDefectDescription = (code: string) => {
  switch (code) {
    case 'C1': return 'Danger Present - Immediate action required';
    case 'C2': return 'Potentially Dangerous - Urgent action required';
    case 'C3': return 'Improvement Recommended';
    case 'FI': return 'Further Investigation Required';
    case 'N/A': return 'Not Applicable';
    default: return '';
  }
};

const MinorWorksObservationCard: React.FC<MinorWorksObservationCardProps> = ({
  observation,
  index,
  onUpdate,
  onRemove
}) => {
  const borderColor = getBorderColor(observation.defectCode);
  
  const handleQuickSelect = (selectedText: string) => {
    onUpdate(observation.id, 'description', selectedText);
    
    // Auto-suggest recommendation based on defect
    if (selectedText.includes('No defects') || selectedText.includes('Not applicable')) {
      onUpdate(observation.id, 'recommendation', 'None required');
    } else if (observation.defectCode === 'C1') {
      onUpdate(observation.id, 'recommendation', 'Immediate rectification required before energising');
    } else if (observation.defectCode === 'C2') {
      onUpdate(observation.id, 'recommendation', 'Urgent remedial action required');
    } else if (observation.defectCode === 'C3') {
      onUpdate(observation.id, 'recommendation', 'Improvement recommended at next convenient opportunity');
    } else if (observation.defectCode === 'FI') {
      onUpdate(observation.id, 'recommendation', 'Further investigation and testing required');
    }
  };

  return (
    <Card className={`p-5 sm:p-6 border-l-4 ${borderColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h4 className="font-semibold flex items-center gap-2 text-base">
          {getSeverityIcon(observation.defectCode)}
          Observation {index + 1} - {observation.defectCode}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(observation.id)}
          className="text-red-500 hover:text-red-700 h-9 w-9 p-0 self-end sm:self-auto"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Classification</Label>
          <Select
            value={observation.defectCode}
            onValueChange={(value: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A') => 
              onUpdate(observation.id, 'defectCode', value)
            }
          >
            <SelectTrigger className="h-12 min-h-[48px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C1">C1 - {getDefectDescription('C1')}</SelectItem>
              <SelectItem value="C2">C2 - {getDefectDescription('C2')}</SelectItem>
              <SelectItem value="C3">C3 - {getDefectDescription('C3')}</SelectItem>
              <SelectItem value="FI">FI - {getDefectDescription('FI')}</SelectItem>
              <SelectItem value="N/A">N/A - {getDefectDescription('N/A')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Quick Select Common Observations</Label>
          <Select onValueChange={handleQuickSelect}>
            <SelectTrigger className="h-12 min-h-[48px]">
              <SelectValue placeholder="Select a common observation or type custom below" />
            </SelectTrigger>
            <SelectContent>
              {commonObservations[observation.defectCode].map((text, idx) => (
                <SelectItem key={idx} value={text}>
                  {text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Description</Label>
          <Textarea
            placeholder="Describe the observation or defect found..."
            value={observation.description}
            onChange={(e) => onUpdate(observation.id, 'description', e.target.value)}
            rows={5}
            className="resize-none text-base"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold mb-1.5 block">Recommendation</Label>
          <Textarea
            placeholder="Recommended action to address this observation..."
            value={observation.recommendation}
            onChange={(e) => onUpdate(observation.id, 'recommendation', e.target.value)}
            rows={3}
            className="resize-none text-base"
          />
        </div>
      </div>
    </Card>
  );
};

export default MinorWorksObservationCard;