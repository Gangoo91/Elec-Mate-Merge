import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { CheckCircle } from 'lucide-react';

interface ControlMeasuresGeneratorProps {
  onControlMeasuresAdded: (controlMeasures: string[]) => void;
}

const ControlMeasuresGenerator = ({ onControlMeasuresAdded }: ControlMeasuresGeneratorProps) => {
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);
  const [customMeasure, setCustomMeasure] = useState('');

  const controlMeasureCategories = [
    {
      category: 'Elimination',
      hierarchy: 1,
      description: 'Most effective - remove the hazard completely',
      measures: [
        'Remove the hazard completely',
        'Redesign the work process',
        'Use alternative methods',
        'Avoid the hazardous situation',
      ],
    },
    {
      category: 'Substitution',
      hierarchy: 2,
      description: 'Replace with safer alternative',
      measures: [
        'Replace with safer alternative',
        'Use less hazardous materials',
        'Lower voltage alternatives',
        'Safer work methods',
      ],
    },
    {
      category: 'Engineering controls',
      hierarchy: 3,
      description: 'Physical barriers and safety devices',
      measures: [
        'Install safety barriers',
        'Use lockout/tagout systems',
        'Improve ventilation',
        'Residual current devices (RCDs)',
        'Earth fault protection',
        'Physical guarding',
      ],
    },
    {
      category: 'Administrative controls',
      hierarchy: 4,
      description: 'Procedures and training',
      measures: [
        'Safety training and competency',
        'Safe work procedures',
        'Permit to work systems',
        'Regular safety inspections',
        'Supervision and monitoring',
        'Warning signs and labels',
      ],
    },
    {
      category: 'Personal protective equipment',
      hierarchy: 5,
      description: 'Last line of defence',
      measures: [
        'Insulated tools and equipment',
        'Arc flash protective clothing',
        'Safety helmets',
        'Safety footwear',
        'Eye and face protection',
        'Respiratory protection',
      ],
    },
  ];

  const toggleMeasure = (measure: string) => {
    setSelectedMeasures((prev) =>
      prev.includes(measure) ? prev.filter((m) => m !== measure) : [...prev, measure]
    );
  };

  const addCustomMeasure = () => {
    if (customMeasure.trim() && !selectedMeasures.includes(customMeasure.trim())) {
      setSelectedMeasures((prev) => [...prev, customMeasure.trim()]);
      setCustomMeasure('');
    }
  };

  const applyControlMeasures = () => {
    if (selectedMeasures.length > 0) {
      onControlMeasuresAdded(selectedMeasures);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Control measures generator
        </span>
        <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
          Select control measures
        </h3>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Hierarchy of controls
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Select control measures following the hierarchy of controls. Higher-level controls
          (elimination, substitution) are more effective.
        </p>
      </div>

      {controlMeasureCategories.map((category) => (
        <div
          key={category.category}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
        >
          <div className="space-y-1">
            <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              <span>Level {category.hierarchy}</span>
              <span className="text-white/25">·</span>
              <span>{category.category}</span>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {category.measures.map((measure) => {
              const isSelected = selectedMeasures.includes(measure);
              return (
                <button
                  key={measure}
                  onClick={() => toggleMeasure(measure)}
                  className={`
                    flex items-start gap-3 p-3 rounded-lg border transition-all
                    touch-manipulation active:scale-[0.99] min-h-[44px] text-left
                    ${
                      isSelected
                        ? 'bg-white/[0.04] border-white/10'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                    }
                  `}
                >
                  <div
                    className={`
                    w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                    ${isSelected ? 'bg-elec-yellow' : 'border-2 border-white/30'}
                  `}
                  >
                    {isSelected && <CheckCircle className="h-3.5 w-3.5 text-black" />}
                  </div>
                  <span
                    className={`text-[14px] leading-relaxed ${isSelected ? 'text-white' : 'text-white/85'}`}
                  >
                    {measure}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Custom control measure
        </span>
        <div className="flex gap-2 items-end">
          <MobileInput
            label=""
            placeholder="Add a specific control measure..."
            value={customMeasure}
            onChange={(e) => setCustomMeasure(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomMeasure()}
            className="flex-1"
          />
          <Button
            onClick={addCustomMeasure}
            disabled={!customMeasure.trim()}
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation disabled:opacity-30"
          >
            Add
          </Button>
        </div>
      </div>

      {selectedMeasures.length > 0 && (
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Selected measures
            </span>
            <span className="text-[12px] text-white/85 font-mono">{selectedMeasures.length}</span>
          </div>
          <ul className="space-y-1.5 max-h-32 overflow-y-auto">
            {selectedMeasures.map((measure, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
              >
                <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                <span>{measure}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={applyControlMeasures}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Apply control measures ({selectedMeasures.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ControlMeasuresGenerator;
