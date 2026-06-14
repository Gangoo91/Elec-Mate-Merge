import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const InteractivePracticeTab = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<number[]>([]);

  const practiceScenarios = [
    {
      id: 1,
      title: 'Client meeting: explaining electrical issues',
      difficulty: 'Beginner',
      situation:
        "A homeowner is concerned about their electrical installation after a power cut. They're asking technical questions but seem worried about costs.",
      objectives: [
        'Explain the issue in simple terms',
        'Reassure the client about safety',
        'Provide clear next steps',
        'Be transparent about potential costs',
      ],
      tips: [
        'Use analogies to explain technical concepts',
        'Show empathy for their concerns',
        'Break down the process into steps',
        'Offer different solution options',
      ],
    },
    {
      id: 2,
      title: 'Site communication: coordinating with team',
      difficulty: 'Intermediate',
      situation:
        "You're working on a commercial site with multiple trades. The plumber needs to know when you'll finish your first fix so they can start their work.",
      objectives: [
        'Give accurate time estimates',
        'Coordinate work schedules',
        'Share safety information',
        'Maintain professional relationships',
      ],
      tips: [
        'Be realistic with timelines',
        'Communicate any delays immediately',
        'Share relevant safety considerations',
        'Use clear, jargon-free language',
      ],
    },
    {
      id: 3,
      title: 'Difficult client: managing complaints',
      difficulty: 'Advanced',
      situation:
        "A client is unhappy with the time a job is taking and is questioning your competence. They're demanding immediate solutions and threatening to leave negative reviews.",
      objectives: [
        'De-escalate the situation',
        'Address their concerns professionally',
        'Find a mutually acceptable solution',
        'Maintain your professional reputation',
      ],
      tips: [
        'Listen actively without defending immediately',
        'Acknowledge their frustration',
        'Explain the reasons for delays',
        'Offer concrete solutions with timelines',
      ],
    },
  ];

  const communicationExercises = [
    {
      exercise: 'Technical explanation practice',
      description: 'Practise explaining RCD operation to someone with no electrical knowledge',
      timeRequired: '10 minutes',
      materials: ['Mirror or recording device', 'Notebook for feedback'],
    },
    {
      exercise: 'Active listening drill',
      description: 'Practise summarising and clarifying what someone has told you',
      timeRequired: '15 minutes',
      materials: ['Study partner or family member', 'Sample scenarios'],
    },
    {
      exercise: 'Difficult conversation role-play',
      description: 'Practise handling challenging client interactions',
      timeRequired: '20 minutes',
      materials: ['Role-play partner', 'Scenario cards'],
    },
  ];

  const handleScenarioComplete = (scenarioId: number) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios([...completedScenarios, scenarioId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Interactive communication scenarios
        </span>
        <div className="space-y-3">
          {practiceScenarios.map((scenario) => {
            const isOpen = selectedScenario === scenario.id;
            const isComplete = completedScenarios.includes(scenario.id);
            return (
              <div
                key={scenario.id}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {scenario.difficulty}
                      {isComplete && ' · completed'}
                    </span>
                    <h3 className="text-[15px] font-semibold text-white leading-tight">
                      {scenario.title}
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                    onClick={() => setSelectedScenario(isOpen ? null : scenario.id)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    {isOpen ? 'Hide' : 'Start'}
                  </Button>
                </div>

                <p className="text-[13px] text-white/85 leading-relaxed">{scenario.situation}</p>

                {isOpen && (
                  <div className="space-y-3 mt-3 pt-3 border-t border-white/[0.06]">
                    <div className="space-y-2">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Your objectives
                      </span>
                      <ul className="space-y-1">
                        {scenario.objectives.map((objective, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-[13px] text-white/85"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Communication tips
                      </span>
                      <ul className="space-y-1">
                        {scenario.tips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-[13px] text-white/85"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScenarioComplete(scenario.id)}
                        className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark complete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Communication skills exercises
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {communicationExercises.map((exercise, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[14px] font-semibold text-white leading-tight">
                {exercise.exercise}
              </h3>
              <p className="text-[13px] text-white/85 leading-relaxed">{exercise.description}</p>

              <div className="space-y-2 text-[12px] text-white/85">
                <div>
                  <span className="text-white/55">Time: </span>
                  {exercise.timeRequired}
                </div>
                <div className="space-y-1">
                  <span className="text-white/55">Materials needed:</span>
                  <ul className="space-y-0.5">
                    {exercise.materials.map((material, materialIndex) => (
                      <li key={materialIndex} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-1.5 flex-shrink-0" />
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Practice tips
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'Regular practice',
              body: 'Set aside 15-20 minutes daily to practise communication scenarios. Consistency builds confidence and natural responses.',
            },
            {
              title: 'Record yourself',
              body: 'Use your phone to record practice sessions. Listen back to identify areas for improvement in tone and clarity.',
            },
            {
              title: 'Get feedback',
              body: 'Practise with colleagues, friends or family. Ask for honest feedback on your communication style and effectiveness.',
            },
            {
              title: 'Real-world application',
              body: "Apply what you've practised in real situations. Start with low-stakes conversations and build up to more complex interactions.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <h4 className="text-[13px] text-white">{item.title}</h4>
              <p className="text-[12px] text-white/70 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractivePracticeTab;
