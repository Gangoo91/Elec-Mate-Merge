
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HardHat, AlertTriangle, Check, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SafetyScenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    outcome: string;
    regulation?: string;
  }[];
}

const safetyScenarios: SafetyScenario[] = [
  {
    id: 1,
    title: "Circuit Energization",
    description: "You're working on a commercial site with tight deadlines.",
    question: "You arrive on site and the supervisor asks you to energise a circuit before insulation resistance testing. What do you do?",
    options: [
      {
        id: "A",
        text: "Do it anyway to keep the project on schedule",
        isCorrect: false,
        feedback: "This creates a serious safety risk and violates regulations.",
        outcome: "The circuit has an undetected fault and causes a short circuit when energized, damaging equipment and creating a fire hazard.",
        regulation: "BS 7671 requires insulation resistance testing before energizing any circuit to verify electrical safety."
      },
      {
        id: "B",
        text: "Tell the supervisor you'll test first as required by regulations",
        isCorrect: true,
        feedback: "This is the correct approach that prioritizes safety over schedule.",
        outcome: "Your testing reveals a fault that could have caused serious issues. The supervisor appreciates your professionalism after the potential risk is explained.",
        regulation: "BS 7671 Section 643 requires insulation resistance testing before energizing circuits."
      },
      {
        id: "C",
        text: "Ask your mentor for advice first",
        isCorrect: false,
        feedback: "While seeking advice is good, you should be confident in applying basic safety regulations yourself.",
        outcome: "Delay in decision-making causes project uncertainty. Your mentor advises testing first, but your hesitation affects the supervisor's confidence in you.",
        regulation: "As a responsible electrician, you should know that BS 7671 requires testing before energization."
      },
      {
        id: "D",
        text: "Walk off site in protest",
        isCorrect: false,
        feedback: "This is an unprofessional reaction that fails to address the safety issue constructively.",
        outcome: "You damage your professional reputation. The supervisor gets someone else to do the work who might comply with the unsafe request.",
        regulation: "Instead of walking off, you should explain the requirements of BS 7671 regarding testing before energization."
      }
    ]
  },
  {
    id: 2,
    title: "Untested Equipment",
    description: "You're on a residential job with a homeowner watching your work.",
    question: "The homeowner hands you an expensive light fitting they purchased online and asks you to install it. It has no visible CE/UKCA marking. What do you do?",
    options: [
      {
        id: "A",
        text: "Install it since the customer insists it's high quality",
        isCorrect: false,
        feedback: "Installing non-compliant equipment is dangerous and could invalidate your work certification.",
        outcome: "The fitting later develops a fault causing damage to the property. You're held professionally responsible for installing non-compliant equipment.",
        regulation: "The Electrical Equipment (Safety) Regulations require equipment to meet safety standards and carry proper certification markings."
      },
      {
        id: "B",
        text: "Explain you can't install uncertified equipment and offer alternatives",
        isCorrect: true,
        feedback: "This maintains professional standards while providing good customer service.",
        outcome: "The customer initially resists but understands when you explain the safety and insurance implications. They appreciate your professionalism.",
        regulation: "Part P of Building Regulations and BS 7671 require all installed equipment to meet relevant safety standards."
      },
      {
        id: "C",
        text: "Install it but have the customer sign a waiver",
        isCorrect: false,
        feedback: "Waivers don't protect you from regulatory obligations or potential harm.",
        outcome: "When the installation causes problems, your waiver doesn't protect you from regulatory action or liability for known unsafe work.",
        regulation: "No waiver can override the Electricity at Work Regulations requirement to ensure safety."
      },
      {
        id: "D",
        text: "Tell them to find another electrician",
        isCorrect: false,
        feedback: "This avoids the immediate problem but misses a customer education opportunity.",
        outcome: "The customer finds another electrician who may not enforce safety standards, potentially creating hazards.",
        regulation: "A better approach is to explain the requirements of the Electrical Equipment (Safety) Regulations."
      }
    ]
  }
];

const OnJobSafetyCases = () => {
  const [selectedScenario, setSelectedScenario] = useState<SafetyScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleSelectScenario = (scenario: SafetyScenario) => {
    setSelectedScenario(scenario);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      toast({
        title: "No option selected",
        description: "Please select an option to continue",
        variant: "destructive"
      });
      return;
    }
    
    setShowFeedback(true);
    
    const correctOption = selectedScenario?.options.find(option => option.isCorrect);
    const isCorrect = selectedScenario?.options.find(option => option.id === selectedOption)?.isCorrect;
    
    if (isCorrect) {
      toast({
        title: "Correct choice!",
        description: "You've made the safe and professional decision",
        variant: "default"
      });
    } else {
      toast({
        title: "Consider a different approach",
        description: `The safer option would be: ${correctOption?.text}`,
        variant: "destructive"
      });
    }
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interactive Safety Case Studies</h1>
          <p className="text-muted-foreground">Learn from real-world scenarios with decision-based learning</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyScenarios.map(scenario => (
            <Card 
              key={scenario.id} 
              className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors"
              onClick={() => handleSelectScenario(scenario)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-elec-yellow/10">
                    <HardHat className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-elec-light/80">
                  {scenario.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Scenario</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HardHat className="h-6 w-6 text-elec-yellow" />
              <CardTitle>{selectedScenario.title}</CardTitle>
            </div>
            <CardDescription className="text-base text-elec-light/80 mt-2">
              {selectedScenario.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
              <p className="font-medium text-lg">{selectedScenario.question}</p>
            </div>

            <div className="space-y-3">
              {selectedScenario.options.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`
                    p-4 rounded-md border cursor-pointer transition-colors
                    ${selectedOption === option.id 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-elec-gray/30 hover:border-elec-yellow/30'}
                    ${showFeedback && option.isCorrect ? 'bg-green-900/20 border-green-500/40' : ''}
                    ${showFeedback && selectedOption === option.id && !option.isCorrect ? 'bg-red-900/20 border-red-500/40' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium
                      ${selectedOption === option.id ? 'bg-elec-yellow text-elec-dark' : 'bg-elec-gray/40'}
                      ${showFeedback && option.isCorrect ? 'bg-green-500' : ''}
                      ${showFeedback && selectedOption === option.id && !option.isCorrect ? 'bg-red-500' : ''}
                    `}>
                      {option.id}
                    </div>
                    <p>{option.text}</p>
                  </div>
                  
                  {showFeedback && selectedOption === option.id && (
                    <div className="mt-3 pl-9 space-y-3">
                      <div className="flex items-start gap-2 text-amber-300">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p>{option.feedback}</p>
                      </div>
                      <div className="flex items-start gap-2 text-blue-300">
                        <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p>{option.regulation}</p>
                      </div>
                      <div className="flex items-start gap-2 text-white">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p><strong>Outcome:</strong> {option.outcome}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleReset}>
              Back to Scenarios
            </Button>
            {!showFeedback ? (
              <Button onClick={handleSubmitAnswer} disabled={!selectedOption}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={() => {
                const nextScenarioIndex = safetyScenarios.findIndex(s => s.id === selectedScenario.id) + 1;
                if (nextScenarioIndex < safetyScenarios.length) {
                  handleSelectScenario(safetyScenarios[nextScenarioIndex]);
                } else {
                  handleReset();
                }
              }}>
                Next Scenario
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {!selectedScenario && (
        <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20 mt-6">
          <h3 className="text-lg font-medium mb-2 text-elec-yellow">Learning Outcomes</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Critical thinking in high-pressure situations</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Regulations awareness and application</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Situational judgment skills development</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Professional communication under pressure</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OnJobSafetyCases;
