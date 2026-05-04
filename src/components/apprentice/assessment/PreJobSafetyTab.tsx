import { MobileInput } from '@/components/ui/mobile-input';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const PreJobSafetyTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const safetyChecklist = [
    {
      category: 'Personal protective equipment',
      items: [
        'Hard hat - BS EN 397 compliant with electrical protection',
        'Safety glasses - BS EN 166 impact resistant',
        'Insulated gloves - voltage rated for the task',
        'Safety boots - BS EN ISO 20345 with electrical protection',
        'High-visibility clothing - appropriate to site requirements',
        'Hearing protection if required for noisy environments',
        'Respiratory protection for dusty conditions',
      ],
    },
    {
      category: 'Electrical safety equipment',
      items: [
        'Voltage indicator/tester calibrated and functioning',
        'Lock-off devices available and in good condition',
        'Prove dead device tested before and after use',
        'GS38 compliant test leads and probes',
        'Insulated tools rated for working voltage',
        'Emergency contact numbers readily available',
        'First aid kit with electrical injury procedures',
      ],
    },
    {
      category: 'Work environment assessment',
      items: [
        'Adequate lighting for the work area',
        'Weather conditions suitable for electrical work',
        'Work area clear of water and moisture',
        'Access routes safe and unobstructed',
        'Emergency evacuation route identified',
        'Fire extinguisher location noted',
        'Ventilation adequate for the work being undertaken',
      ],
    },
    {
      category: 'Documentation & communication',
      items: [
        'Method statement reviewed and understood',
        'Risk assessment completed and communicated',
        'Permit to work obtained if required',
        'All team members briefed on safety procedures',
        'Supervisor contact details confirmed',
        'Site induction completed',
        'Insurance and certification documents available',
      ],
    },
    {
      category: 'Tool and equipment check',
      items: [
        'All tools PAT tested and in date',
        'Extension leads and portable equipment checked',
        'Ladder inspection completed if required',
        'Scaffolding certification checked',
        'Vehicle safety check completed',
        'Material handling equipment inspected',
        'Communication devices tested and charged',
      ],
    },
  ];

  const safetyTips = [
    {
      title: 'Safe isolation procedure',
      content:
        'Always follow the 7-step safe isolation procedure: 1) Identify 2) Isolate 3) Secure 4) Test dead 5) Re-test tester 6) Issue permit 7) Begin work',
    },
    {
      title: 'Emergency procedures',
      content:
        'Know the emergency contact numbers, location of first aid equipment, and evacuation procedures. Report any incidents immediately.',
    },
    {
      title: 'Weather considerations',
      content:
        'Do not work on outdoor electrical installations during wet weather, high winds, or electrical storms. Monitor weather conditions throughout the day.',
    },
  ];

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const totalItems = safetyChecklist.reduce((total, cat) => total + cat.items.length, 0);
  const completionRate = (checkedItems.length / totalItems) * 100;
  const allDone = completionRate === 100;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Pre-job safety assessment
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          Electricity at Work Regulations 1989 & CDM 2015
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Complete this comprehensive safety checklist before starting any electrical work. Each
          item must be verified to ensure a safe working environment.
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
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[14px] font-medium text-white font-mono">{checkedItems.length}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">
              Checked
            </div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[14px] font-medium text-white font-mono">{totalItems}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">Total</div>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 text-center">
            <div className="text-[14px] font-medium text-white font-mono">15-20</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-0.5">Mins</div>
          </div>
        </div>
      </div>

      {safetyChecklist.map((category, index) => {
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
          Essential safety tips
        </span>
        <div className="space-y-3">
          {safetyTips.map((tip, index) => (
            <div key={index} className="space-y-1">
              <p className="text-[14px] text-white">{tip.title}</p>
              <p className="text-[13px] text-white/85 leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Notes & observations
        </span>
        <MobileInput
          label="Safety notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record any specific site conditions, hazards identified, or additional safety measures required..."
          multiline
          rows={4}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]">
            <Download className="mr-2 h-4 w-4" />
            Export assessment
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Save progress
          </Button>
        </div>
      </div>

      {!allDone && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Assessment incomplete
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            You must complete all safety checks before proceeding with electrical work.{' '}
            {totalItems - checkedItems.length} items remaining.
          </p>
        </div>
      )}

      {allDone && (
        <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Assessment complete
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            All safety checks have been verified. You may proceed with work while maintaining
            continuous vigilance.
          </p>
        </div>
      )}
    </div>
  );
};

export default PreJobSafetyTab;
