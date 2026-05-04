import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface CommunicationSimulatorProps {
  onBack: () => void;
}

interface Scenario {
  id: string;
  title: string;
  context: string;
  situation: string;
  responses: {
    text: string;
    feedback: string;
    rating: 'excellent' | 'good' | 'poor';
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 'help-senior',
    title: 'Asking for help from a senior electrician',
    context:
      "You're working on a complex three-phase installation and have encountered a problem you're not sure how to solve.",
    situation:
      'You approach your supervisor, Dave, who is known for being direct and sometimes impatient. How do you ask for help?',
    responses: [
      {
        text: "Dave, I'm completely lost with this three-phase setup. Can you just do it for me?",
        feedback:
          "This approach makes you sound incompetent and puts the burden entirely on Dave. It doesn't show initiative or learning mindset.",
        rating: 'poor',
      },
      {
        text: "Hi Dave, I'm working on the three-phase installation and I've checked the diagrams, but I'm unsure about the neutral connections. Could you spare a few minutes to guide me through it?",
        feedback:
          "Excellent! You've shown you've attempted the work, identified the specific issue, and asked for guidance rather than someone to do it for you.",
        rating: 'excellent',
      },
      {
        text: "Dave, this three-phase thing is really confusing. I don't get any of it.",
        feedback:
          "While honest, this is too vague and doesn't show you've made any effort to understand or solve the problem yourself.",
        rating: 'poor',
      },
    ],
  },
  {
    id: 'impatient-client',
    title: 'Dealing with an impatient client',
    context:
      "You're rewiring a kitchen and the job is taking longer than initially estimated due to discovering old wiring that needs replacing.",
    situation:
      "Mrs. Johnson is frustrated and says: 'This is taking forever! You said it would be done yesterday. I have family coming over this weekend!'",
    responses: [
      {
        text: "Look, these things take time. You can't rush electrical work.",
        feedback:
          "Too dismissive and doesn't acknowledge the client's concerns or explain why the delay occurred.",
        rating: 'poor',
      },
      {
        text: "I completely understand your frustration, Mrs. Johnson. We discovered some old wiring that wasn't up to current safety standards, which we need to replace for your safety. I should have communicated this better when we found it. Let me give you a realistic timeline for completion.",
        feedback:
          "Perfect! You've acknowledged her feelings, explained the reason for the delay, taken responsibility for poor communication, and offered a solution.",
        rating: 'excellent',
      },
      {
        text: "Sorry, but we found problems with the old wiring. It'll be done when it's done.",
        feedback:
          "While you've explained the issue, the tone is unprofessional and doesn't show empathy for the client's situation.",
        rating: 'poor',
      },
    ],
  },
];

const CommunicationSimulator = ({ onBack }: CommunicationSimulatorProps) => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const handleResponseSelect = (index: number) => {
    setSelectedResponse(index);
    setShowFeedback(true);
  };

  if (!currentScenario) {
    return (
      <div className="space-y-6 animate-fade-in text-left">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to tools
        </Button>

        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Communication simulator
          </span>
          <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            Practice scenarios
          </h2>
          <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Practice workplace conversations in realistic scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => handleScenarioSelect(scenario)}
              className="text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 touch-manipulation active:scale-[0.98] transition-all"
            >
              <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
                {scenario.title}
              </h3>
              <p className="text-[14px] text-white/85 leading-relaxed">{scenario.context}</p>
              <div className="h-11 inline-flex items-center px-4 rounded-lg bg-elec-yellow text-black font-semibold text-[14px]">
                Start scenario
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <Button
        variant="ghost"
        onClick={() => setCurrentScenario(null)}
        className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to scenarios
      </Button>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Scenario
        </span>
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
          {currentScenario.title}
        </h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Context
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{currentScenario.context}</p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          The situation
        </span>
        <p className="text-[14px] text-white/85 italic leading-relaxed">
          &ldquo;{currentScenario.situation}&rdquo;
        </p>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Responses
        </span>
        {currentScenario.responses.map((response, index) => {
          const isSelected = selectedResponse === index;
          let optionStyle = 'bg-white/[0.02] border-white/[0.06]';
          if (showFeedback && isSelected) {
            if (response.rating === 'excellent') {
              optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/30';
            } else if (response.rating === 'good') {
              optionStyle = 'bg-white/[0.04] border-white/15';
            } else {
              optionStyle = 'bg-red-500/[0.04] border-red-500/30';
            }
          } else if (isSelected) {
            optionStyle = 'bg-elec-yellow/[0.04] border-elec-yellow/40';
          }

          return (
            <div key={index} className="space-y-2">
              <button
                onClick={() => handleResponseSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.99] ${optionStyle}`}
              >
                <p className="text-[14px] text-white/85 leading-relaxed">{response.text}</p>
              </button>

              {showFeedback && isSelected && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    {response.rating === 'poor' ? (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-elec-yellow" />
                    )}
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      {response.rating}
                    </span>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{response.feedback}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/[0.06]">
          <Button
            onClick={() => setCurrentScenario(null)}
            className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            Try another scenario
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedResponse(null);
              setShowFeedback(false);
            }}
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            Try again
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunicationSimulator;
