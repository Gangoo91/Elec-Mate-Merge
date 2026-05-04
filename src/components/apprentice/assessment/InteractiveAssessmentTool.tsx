import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import {
  CheckCircle,
  AlertTriangle,
  Camera,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AssessmentItem {
  id: string;
  text: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  guidance?: string;
  required: boolean;
}

interface AssessmentTool {
  id: string;
  title: string;
  description: string;
  items: string[];
}

interface InteractiveAssessmentToolProps {
  tool: AssessmentTool;
  onComplete: () => void;
  isCompleted: boolean;
}

const InteractiveAssessmentTool = ({
  tool,
  onComplete,
}: InteractiveAssessmentToolProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, { status?: string; details?: string } | string>>({});
  const [notes, setNotes] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const assessmentItems: AssessmentItem[] = tool.items.map((item, index) => ({
    id: `item-${index}`,
    text: item,
    category: getItemCategory(item),
    riskLevel: getRiskLevel(item),
    guidance: getGuidanceForItem(item),
    required: true,
  }));

  function getItemCategory(item: string): string {
    if (item.toLowerCase().includes('ppe')) return 'Personal Protective Equipment';
    if (item.toLowerCase().includes('hazard')) return 'Hazard Identification';
    if (item.toLowerCase().includes('electrical')) return 'Electrical Safety';
    if (item.toLowerCase().includes('emergency')) return 'Emergency Procedures';
    if (item.toLowerCase().includes('lighting')) return 'Environmental Conditions';
    if (item.toLowerCase().includes('access')) return 'Site Access';
    return 'General Safety';
  }

  function getRiskLevel(item: string): 'low' | 'medium' | 'high' {
    if (item.toLowerCase().includes('electrical') || item.toLowerCase().includes('hazard'))
      return 'high';
    if (item.toLowerCase().includes('emergency') || item.toLowerCase().includes('isolation'))
      return 'medium';
    return 'low';
  }

  function getGuidanceForItem(item: string): string {
    const guidanceMap: Record<string, string> = {
      'ppe requirement assessment':
        'Ensure all required PPE is available, in good condition, and appropriate for the task. Check for hard hat, safety glasses, insulated gloves, and appropriate footwear.',
      'electrical hazard identification':
        'Look for exposed conductors, damaged equipment, water ingress, overhead power lines, and underground cables. Use appropriate detection equipment.',
      'safe isolation verification':
        'Follow the 5-step safe isolation procedure: identify, isolate, secure, test, and retest. Use approved voltage indicators and proving units.',
      'emergency procedure review':
        'Confirm location of emergency stops, first aid kits, fire extinguishers, and emergency contact numbers. Ensure all team members know evacuation routes.',
      'working space adequacy':
        'Verify minimum working distances as per BS 7671. Ensure adequate space for safe movement and equipment operation.',
      'lighting conditions':
        'Assess natural and artificial lighting. Minimum 500 lux for electrical work. Consider portable lighting for confined spaces.',
      'weather considerations':
        'Check for rain, wind, temperature extremes. Electrical work should not be performed in wet conditions unless specifically protected.',
      'access route safety':
        'Ensure clear, stable access routes. Check for trip hazards, adequate lighting, and secure barriers where needed.',
    };

    return (
      guidanceMap[item.toLowerCase()] ||
      'Follow relevant safety procedures and regulations for this assessment item.'
    );
  }

  const currentItem = assessmentItems[currentStep];
  const progress = ((currentStep + 1) / assessmentItems.length) * 100;

  const handleResponse = (response: { status?: string; details?: string } | string) => {
    setResponses({
      ...responses,
      [currentItem.id]: response,
    });
  };

  const nextStep = () => {
    if (currentStep < assessmentItems.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setAssessmentComplete(true);
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (assessmentComplete) {
    const completedItems = Object.keys(responses).length;
    const successRate = (completedItems / assessmentItems.length) * 100;

    return (
      <div className="space-y-5 animate-fade-in">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Complete
          </span>
          <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
            Assessment complete
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed">
            You've successfully completed the {tool.title}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center space-y-1">
            <div className="text-[24px] font-semibold text-white font-mono">{completedItems}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
              Items assessed
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center space-y-1">
            <div className="text-[24px] font-semibold text-white font-mono">
              {successRate.toFixed(0)}%
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
              Completion rate
            </div>
          </div>
        </div>

        {notes && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Your notes
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{notes}</p>
          </div>
        )}

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Key points summary
          </span>
          <div className="space-y-2">
            {assessmentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
              >
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isHighRisk = currentItem.riskLevel === 'high';

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {tool.title}
        </span>
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-white/85 font-mono">
            {currentStep + 1}/{assessmentItems.length}
          </span>
          <span className="text-[12px] text-white/85 font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            <span className={isHighRisk ? 'text-red-300' : 'text-white/55'}>
              {currentItem.riskLevel} risk
            </span>
            <span className="text-white/25">·</span>
            <span>{currentItem.category}</span>
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
            {currentItem.text}
          </h3>
        </div>

        {currentItem.guidance && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Guidance
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">{currentItem.guidance}</p>
          </div>
        )}

        <div className="space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Assessment status
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleResponse('compliant')}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-lg border transition-all
                touch-manipulation active:scale-[0.98] min-h-[44px] text-[14px]
                ${
                  responses[currentItem.id] === 'compliant'
                    ? 'bg-elec-yellow/[0.08] border-elec-yellow/30 text-elec-yellow'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10 text-white/85'
                }
              `}
            >
              <CheckCircle className="h-4 w-4" />
              Compliant
            </button>
            <button
              onClick={() => handleResponse('non-compliant')}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-lg border transition-all
                touch-manipulation active:scale-[0.98] min-h-[44px] text-[14px]
                ${
                  responses[currentItem.id] === 'non-compliant'
                    ? 'bg-red-500/[0.08] border-red-500/30 text-red-300'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10 text-white/85'
                }
              `}
            >
              <AlertTriangle className="h-4 w-4" />
              Non-compliant
            </button>
            <button
              onClick={() => handleResponse('not-applicable')}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-lg border transition-all
                touch-manipulation active:scale-[0.98] min-h-[44px] text-[14px]
                ${
                  responses[currentItem.id] === 'not-applicable'
                    ? 'bg-white/[0.04] border-white/15 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10 text-white/85'
                }
              `}
            >
              <FileText className="h-4 w-4" />
              N/A
            </button>
          </div>
        </div>

        {responses[currentItem.id] && (
          <div className="space-y-3">
            <MobileInput
              label="Additional details (optional)"
              placeholder="Enter specific observations, measurements, or notes..."
              value={responses[currentItem.id]?.details || ''}
              onChange={(e) =>
                handleResponse({
                  ...responses[currentItem.id],
                  details: e.target.value,
                })
              }
            />

            <Button
              variant="outline"
              className="border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <Camera className="h-4 w-4 mr-2" />
              Add photo evidence
            </Button>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={nextStep}
            disabled={!responses[currentItem.id]}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-30"
          >
            {currentStep === assessmentItems.length - 1 ? 'Complete assessment' : 'Next'}
            {currentStep === assessmentItems.length - 1 ? (
              <CheckCircle className="ml-2 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Assessment notes
        </span>
        <MobileInput
          label="General notes"
          placeholder="Add general notes about the site conditions, any concerns, or recommendations..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
        />
      </div>
    </div>
  );
};

export default InteractiveAssessmentTool;
