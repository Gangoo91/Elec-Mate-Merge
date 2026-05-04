import { MobileInput } from '@/components/ui/mobile-input';
import { Button } from '@/components/ui/button';
import { CheckSquare, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const SiteConditionTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [environmentalNotes, setEnvironmentalNotes] = useState('');

  const conditionChecklist = [
    {
      category: 'Access & working space',
      items: [
        'Adequate working space around electrical equipment (minimum 600mm)',
        'Clear access routes to and from work area',
        'Stable working platform or surface',
        'No obstructions in emergency escape routes',
        'Vehicle access available if required',
        'Suitable parking arrangements for work vehicles',
        'Pedestrian walkways clearly marked and safe',
      ],
    },
    {
      category: 'Environmental conditions',
      items: [
        'Dry conditions - no risk of water ingress',
        'Adequate ventilation in enclosed spaces',
        'Temperature suitable for equipment and materials',
        'Wind conditions safe for overhead work',
        'No flammable vapours or gases present',
        'Humidity levels within acceptable ranges',
        'Air quality suitable for respiratory health',
      ],
    },
    {
      category: 'Lighting & visibility',
      items: [
        'Adequate natural or artificial lighting',
        'Emergency lighting available if required',
        'All warning signs and labels clearly visible',
        'Colour identification possible in lighting conditions',
        'Additional portable lighting available if needed',
        'No glare or shadow issues affecting work',
        'Backup lighting arrangements in place',
      ],
    },
    {
      category: 'Structural considerations',
      items: [
        'Building structure suitable for proposed work',
        'No signs of structural damage or instability',
        'Cable routes and fixing points accessible',
        'Load-bearing capacity adequate for equipment',
        'Fire stopping and compartmentation maintained',
        'Building materials compatible with electrical work',
        'Structural modifications approved if required',
      ],
    },
    {
      category: 'Weather & seasonal factors',
      items: [
        'Current weather conditions suitable for work',
        'Weather forecast checked for duration of work',
        'Seasonal considerations (frost, ice, heat)',
        'Protection from rain and moisture available',
        'Wind speed within safe working limits',
        'Temperature effects on materials considered',
        'Contingency plans for weather changes',
      ],
    },
  ];

  const environmentalFactors = [
    {
      factor: 'Temperature',
      considerations: [
        'Cable installation temperature ratings',
        'Thermal expansion effects',
        'Worker comfort and safety',
      ],
      optimalRange: '5°C to 30°C for most electrical work',
    },
    {
      factor: 'Humidity',
      considerations: ['Condensation risk', 'Insulation resistance', 'Equipment protection'],
      optimalRange: '30% to 70% relative humidity',
    },
    {
      factor: 'Air quality',
      considerations: ['Dust levels', 'Chemical vapours', 'Respiratory protection needs'],
      optimalRange: 'Clean, well-ventilated air',
    },
  ];

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const totalItems = conditionChecklist.reduce((total, cat) => total + cat.items.length, 0);
  const completionRate = (checkedItems.length / totalItems) * 100;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Site condition evaluation
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          Environmental & working conditions assessment
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Assess environmental and working conditions to ensure safe and effective electrical
          installation work.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Progress
          </span>
          <span className="text-[12px] text-white/85 font-mono">
            {checkedItems.length}/{totalItems} · {Math.round(completionRate)}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {conditionChecklist.map((category, index) => {
        const categoryChecked = category.items.filter((item) => checkedItems.includes(item)).length;

        return (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {category.category}
              </span>
              <span className="text-[12px] text-white/85 font-mono">
                {categoryChecked}/{category.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => {
                const isChecked = checkedItems.includes(item);
                return (
                  <button
                    key={itemIndex}
                    onClick={() => toggleItem(item)}
                    className={`
                      w-full flex items-start gap-3 p-3 rounded-lg
                      border transition-all duration-200
                      touch-manipulation active:scale-[0.99] min-h-[44px]
                      ${
                        isChecked
                          ? 'bg-white/[0.04] border-white/10'
                          : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                      }
                    `}
                  >
                    <div
                      className={`
                      flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all
                      ${isChecked ? 'bg-elec-yellow' : 'border-2 border-white/30'}
                    `}
                    >
                      {isChecked && <CheckCircle className="h-4 w-4 text-black" />}
                    </div>
                    <span
                      className={`text-[14px] text-left leading-relaxed ${isChecked ? 'text-white' : 'text-white/85'}`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Environmental factors guide
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {environmentalFactors.map((factor, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
            >
              <p className="text-[14px] text-white">{factor.factor}</p>
              <p className="text-[12px] text-white/70 leading-relaxed">
                <span className="text-white/55">Optimal: </span>
                {factor.optimalRange}
              </p>
              <ul className="space-y-1">
                {factor.considerations.map((consideration, idx) => (
                  <li
                    key={idx}
                    className="text-[12px] text-white/85 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="w-1 h-1 bg-white/55 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Environmental notes
        </span>
        <MobileInput
          label="Environmental notes"
          value={environmentalNotes}
          onChange={(e) => setEnvironmentalNotes(e.target.value)}
          placeholder="Record specific environmental conditions, weather factors, seasonal considerations, or site-specific environmental challenges..."
          multiline
          rows={4}
        />
        <Button className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]">
          <CheckSquare className="mr-2 h-4 w-4" />
          Complete site condition assessment
        </Button>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Weather considerations
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Always check weather conditions before starting outdoor electrical work.
        </p>
        <ul className="space-y-1.5 pt-1">
          <li className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
            <span>Do not work in wet conditions or during electrical storms</span>
          </li>
          <li className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
            <span>Wind speeds above 15 mph may affect ladder work</span>
          </li>
          <li className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
            <span>Temperature below 0°C may affect cable flexibility</span>
          </li>
          <li className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
            <span>High humidity can affect insulation resistance readings</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SiteConditionTab;
