import { MobileInput } from '@/components/ui/mobile-input';
import { Button } from '@/components/ui/button';
import { CheckSquare, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const ElectricalInstallationTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [findings, setFindings] = useState('');

  const electricalChecklist = [
    {
      category: 'Consumer unit & distribution',
      items: [
        'Consumer unit condition and accessibility',
        'Adequate space for additional circuits if required',
        'Main switch operation and labelling',
        'RCD protection appropriate and functioning',
        'Circuit breaker ratings and condition',
        'Busbar connections tight and secure',
        'IP rating appropriate for location',
        'Isolation and switching arrangements adequate',
      ],
    },
    {
      category: 'Existing wiring',
      items: [
        'Cable types and conditions throughout installation',
        'Cable supports and fixing methods adequate',
        'No signs of overheating or damage',
        'Appropriate cable sizes for circuit loading',
        'Junction boxes and connections accessible',
        'Cable identification and labelling present',
        'Segregation of different voltage systems',
        'Cable entry methods and sealing adequate',
      ],
    },
    {
      category: 'Earthing & bonding',
      items: [
        'Main earthing terminal condition and connection',
        'Earthing conductor size and condition',
        'Equipotential bonding to services complete',
        'Supplementary bonding where required',
        'Earth electrode system (if applicable)',
        'Continuity of protective conductors',
        'Bonding conductor sizes comply with BS 7671',
        'Earth fault loop impedance within limits',
      ],
    },
    {
      category: 'Safety systems',
      items: [
        'RCD testing and operation within limits',
        'Emergency lighting systems functional',
        'Fire alarm systems unaffected by work',
        'Security systems consideration',
        'Smoke detection systems operational',
        'Emergency stop systems accessible',
        'Intruder alarm system compatibility',
        'Communication systems operational',
      ],
    },
    {
      category: 'Testing & documentation',
      items: [
        'Previous test certificates available',
        'Installation complies with current edition of BS 7671',
        'Test results within acceptable limits',
        'Periodic inspection due dates noted',
        'Any departures from BS 7671 recorded',
        'Installation changes properly documented',
        'As-built drawings available and accurate',
        'Operation and maintenance manuals present',
      ],
    },
  ];

  const complianceRequirements = [
    {
      standard: 'BS 7671:2018+A4:2026',
      description: 'Requirements for Electrical Installations (IET Wiring Regulations)',
      keyPoints: [
        'Chapter 64: Initial verification',
        'Chapter 65: Periodic inspection',
        'Appendix 6: Model forms',
      ],
    },
    {
      standard: 'Part P Building Regulations',
      description: 'Electrical safety in dwellings',
      keyPoints: [
        'Notification requirements',
        'Self-certification schemes',
        'Competent person schemes',
      ],
    },
    {
      standard: 'Electricity at Work Regulations 1989',
      description: 'Legal requirements for electrical work',
      keyPoints: [
        'Regulation 4: Systems and equipment',
        'Regulation 13: Working dead',
        'Regulation 16: Persons',
      ],
    },
  ];

  const testingPriorities = [
    {
      test: 'Continuity',
      priority: 'High',
      reason: 'Ensures protective conductor integrity',
    },
    {
      test: 'Insulation Resistance',
      priority: 'High',
      reason: 'Prevents dangerous leakage currents',
    },
    {
      test: 'Polarity',
      priority: 'Medium',
      reason: 'Ensures correct connection of conductors',
    },
    {
      test: 'Earth Fault Loop Impedance',
      priority: 'High',
      reason: 'Ensures protective device operation',
    },
    {
      test: 'RCD Operation',
      priority: 'High',
      reason: 'Ensures personal protection from electric shock',
    },
  ];

  const toggleItem = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const totalItems = electricalChecklist.reduce((total, cat) => total + cat.items.length, 0);
  const completionRate = (checkedItems.length / totalItems) * 100;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Electrical installation assessment
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          BS 7671 compliance & safety evaluation
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Evaluate existing electrical installations to ensure compatibility and safety before
          commencing new work.
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

      {electricalChecklist.map((category, index) => {
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
          Key standards & regulations
        </span>
        <div className="space-y-3">
          {complianceRequirements.map((req, index) => (
            <div key={index} className="space-y-1.5">
              <p className="text-[14px] text-white">{req.standard}</p>
              <p className="text-[13px] text-white/70 leading-relaxed">{req.description}</p>
              <ul className="space-y-1">
                {req.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Testing priorities
        </span>
        <div className="space-y-2">
          {testingPriorities.map((test, index) => (
            <div key={index} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[14px] text-white">{test.test}</p>
                <p className="text-[13px] text-white/70 leading-relaxed">{test.reason}</p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {test.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Findings & recommendations
        </span>
        <MobileInput
          label="Findings notes"
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          placeholder="Record any defects found, upgrade requirements, compliance issues, or recommendations..."
          multiline
          rows={4}
        />
        <Button className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]">
          <CheckSquare className="mr-2 h-4 w-4" />
          Complete electrical assessment
        </Button>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Important reminder
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          If any defects or safety concerns are identified during this assessment, they must be
          reported immediately and rectified before proceeding with new installation work. All work
          must comply with the current edition of BS 7671 and relevant building regulations.
        </p>
      </div>
    </div>
  );
};

export default ElectricalInstallationTab;
