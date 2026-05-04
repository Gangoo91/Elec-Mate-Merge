import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

const CaseStudiesTab = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  const caseStudies = [
    {
      id: 1,
      title: 'The Wrong Circuit Breaker',
      category: 'Technical error',
      severity: 'Moderate',
      scenario:
        'Jamie, a second-year apprentice, was tasked with replacing a faulty 20A MCB in a domestic consumer unit. In a rush to finish before lunch, Jamie grabbed what looked like the right breaker from the van and installed it without checking the rating. It was actually a 32A MCB.',
      discovery:
        'During testing, the electrician noticed the wrong rating and questioned Jamie about it. The error was caught before the installation was energised.',
      consequences: [
        'Circuit would have been under-protected — 32A MCB allows more current than a 20A-rated cable can safely carry',
        'Potential fire risk from cable overload',
        'Non-compliance with BS 7671',
        'Time lost replacing the correct MCB',
      ],
      lessons: [
        'Always verify component ratings before installation',
        'Rushing leads to mistakes - plan time properly',
        'Double-check work before calling for inspection',
        'Keep different ratings clearly separated in van stock',
      ],
      outcome:
        'Jamie implemented a labelling system in the van and created a pre-installation checklist. No similar errors occurred in the following 6 months.',
      prevention: 'Use proper lighting in van, organise stock clearly, and always verify ratings',
    },
    {
      id: 2,
      title: 'The Live Working Incident',
      category: 'Safety violation',
      severity: 'Serious',
      isSafety: true,
      scenario:
        'Alex was changing a faulty socket outlet in an office. The socket appeared dead (no power to a plugged-in device), so Alex assumed it was safe to work on without proper isolation. Unknown to Alex, the socket was on a different circuit that was still live.',
      discovery:
        "When Alex touched the live terminal while unscrewing the faceplate, there was an arc flash. Fortunately, Alex was wearing safety glasses and wasn't seriously injured, but it was a close call.",
      consequences: [
        'Risk of electrocution or serious burns',
        'Arc flash could have caused eye injury',
        'Potential for fire in the workplace',
        'Regulatory investigation possible',
      ],
      lessons: [
        'Never assume a circuit is dead without proper testing',
        'Use approved voltage indicators and test them',
        'Follow the isolation procedure completely',
        'PPE can prevent serious injury',
      ],
      outcome:
        'Alex attended additional safety training and now uses proper isolation procedures religiously. This experience reinforced the importance of safety protocols.',
      prevention:
        'Always test for dead, use proper PPE, follow isolation procedures without exception',
    },
    {
      id: 3,
      title: 'The Communication Breakdown',
      category: 'Communication',
      severity: 'Minor',
      scenario:
        "Morgan was working on a lighting circuit and needed to isolate the supply. Morgan told the site supervisor 'I'm turning off the lights for a bit' but didn't specify which lights or for how long. The supervisor assumed it was just for 10 minutes.",
      discovery:
        "After 45 minutes, office workers complained they couldn't work in the dark. The supervisor came looking for Morgan, frustrated about the lack of communication.",
      consequences: [
        'Disrupted office productivity',
        'Frustrated building occupants',
        'Strained relationship with client',
        'Poor reflection on the company',
      ],
      lessons: [
        'Be specific when communicating about work impacts',
        'Provide time estimates and regular updates',
        "Consider the client's business needs",
        'Establish clear communication protocols',
      ],
      outcome:
        'Morgan learned to provide detailed work schedules and regular updates. Client relationships improved significantly.',
      prevention:
        'Clear communication plans, regular updates, and consideration for building users',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Real apprentice case studies
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {caseStudies.map((caseStudy) => {
            const isSelected = selectedCase === caseStudy.id;
            const containerClass = caseStudy.isSafety
              ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 cursor-pointer transition-all touch-manipulation space-y-2'
              : `rounded-xl border bg-white/[0.02] p-4 cursor-pointer transition-all touch-manipulation space-y-2 ${
                  isSelected ? 'border-elec-yellow' : 'border-white/[0.06] hover:border-white/15'
                }`;

            return (
              <div
                key={caseStudy.id}
                className={containerClass}
                onClick={() =>
                  setSelectedCase(selectedCase === caseStudy.id ? null : caseStudy.id)
                }
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-semibold text-white">{caseStudy.title}</h3>
                  <span
                    className={
                      caseStudy.isSafety
                        ? 'text-[10px] font-medium uppercase tracking-[0.18em] text-red-300 flex-shrink-0'
                        : 'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 flex-shrink-0'
                    }
                  >
                    {caseStudy.severity}
                  </span>
                </div>

                <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {caseStudy.category}
                </span>

                <p className="text-[13px] text-white/85 leading-relaxed line-clamp-3">
                  {caseStudy.scenario}
                </p>

                {isSelected && (
                  <Button
                    size="sm"
                    className="mt-2 w-full h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View full case
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedCase && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
          {(() => {
            const currentCase = caseStudies.find((c) => c.id === selectedCase);
            if (!currentCase) return null;

            return (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Case study
                  </span>
                  <h2 className="text-[20px] font-semibold text-white leading-tight">
                    {currentCase.title}
                  </h2>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    The scenario
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {currentCase.scenario}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    How it was discovered
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {currentCase.discovery}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Consequences
                    </span>
                    <ul className="space-y-1.5">
                      {currentCase.consequences.map((consequence, index) => (
                        <li
                          key={index}
                          className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{consequence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Lessons learned
                    </span>
                    <ul className="space-y-1.5">
                      {currentCase.lessons.map((lesson, index) => (
                        <li
                          key={index}
                          className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Final outcome
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {currentCase.outcome}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Prevention strategy
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {currentCase.prevention}
                  </p>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default CaseStudiesTab;
