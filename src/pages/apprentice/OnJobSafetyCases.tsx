
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HardHat, AlertTriangle, Check, Info, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
    title: "Circuit Energisation",
    description: "You're working on a commercial site with tight deadlines.",
    question: "You arrive on site and the supervisor asks you to energise a circuit before insulation resistance testing. What do you do?",
    options: [
      {
        id: "A",
        text: "Do it anyway to keep the project on schedule",
        isCorrect: false,
        feedback: "This creates a serious safety risk and violates regulations.",
        outcome: "The circuit has an undetected fault and causes a short circuit when energised, damaging equipment and creating a fire hazard.",
        regulation: "BS 7671 requires insulation resistance testing before energising any circuit to verify electrical safety."
      },
      {
        id: "B",
        text: "Tell the supervisor you'll test first as required by regulations",
        isCorrect: true,
        feedback: "This is the correct approach that prioritises safety over schedule.",
        outcome: "Your testing reveals a fault that could have caused serious issues. The supervisor appreciates your professionalism after the potential risk is explained.",
        regulation: "BS 7671 Section 643 requires insulation resistance testing before energising circuits."
      },
      {
        id: "C",
        text: "Ask your mentor for advice first",
        isCorrect: false,
        feedback: "While seeking advice is good, you should be confident in applying basic safety regulations yourself.",
        outcome: "Delay in decision-making causes project uncertainty. Your mentor advises testing first, but your hesitation affects the supervisor's confidence in you.",
        regulation: "As a responsible electrician, you should know that BS 7671 requires testing before energisation."
      },
      {
        id: "D",
        text: "Walk off site in protest",
        isCorrect: false,
        feedback: "This is an unprofessional reaction that fails to address the safety issue constructively.",
        outcome: "You damage your professional reputation. The supervisor gets someone else to do the work who might comply with the unsafe request.",
        regulation: "Instead of walking off, you should explain the requirements of BS 7671 regarding testing before energisation."
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
  },
  {
    id: 3,
    title: "Working at Height",
    description: "You need to install lighting in a stairwell with a 4-metre drop.",
    question: "The customer hasn't provided proper scaffolding, but offers a ladder and says 'the last electrician managed fine'. What's your response?",
    options: [
      {
        id: "A",
        text: "Use the ladder but work quickly to minimise risk",
        isCorrect: false,
        feedback: "Working quickly at height actually increases risk of accidents.",
        outcome: "While rushing, you lose balance and fall, resulting in serious injury and inability to work for months.",
        regulation: "The Work at Height Regulations 2005 require suitable equipment for working safely at height with proper risk assessment."
      },
      {
        id: "B",
        text: "Explain that proper scaffolding or tower access is required by law",
        isCorrect: true,
        feedback: "This correctly prioritises safety and compliance with regulations.",
        outcome: "The customer arranges proper access equipment, the job is completed safely, and you maintain your professional standards.",
        regulation: "The Work at Height Regulations 2005 require suitable access equipment and prohibit improper ladder use."
      },
      {
        id: "C",
        text: "Attempt to create a makeshift platform using available furniture",
        isCorrect: false,
        feedback: "Improvised platforms create serious safety hazards and violate regulations.",
        outcome: "The unstable platform collapses, damaging the property and risking serious injury.",
        regulation: "The Work at Height Regulations 2005 explicitly prohibit using improvised platforms."
      },
      {
        id: "D",
        text: "Do the work but charge extra for the dangerous conditions",
        isCorrect: false,
        feedback: "Charging extra doesn't make unsafe work acceptable or legal.",
        outcome: "If an accident occurs, you would still be liable regardless of extra payment, as you knowingly violated safety regulations.",
        regulation: "The Health and Safety at Work Act places personal responsibility on workers to refuse unsafe work practices."
      }
    ]
  },
  {
    id: 4,
    title: "Hazardous Materials",
    description: "You're renovating an older property built in the 1970s.",
    question: "While removing old ceiling panels, you discover what might be asbestos-containing materials. What should you do?",
    options: [
      {
        id: "A",
        text: "Continue carefully to avoid creating dust",
        isCorrect: false,
        feedback: "Even careful handling of potential asbestos materials is dangerous without proper equipment.",
        outcome: "You unknowingly release asbestos fibres, creating a serious health hazard for yourself and others on site.",
        regulation: "The Control of Asbestos Regulations 2012 prohibit unlicensed work with asbestos-containing materials."
      },
      {
        id: "B",
        text: "Stop work immediately and inform the property owner",
        isCorrect: true,
        feedback: "This is the correct approach to potential asbestos discovery.",
        outcome: "Work is safely paused, proper testing is arranged, and appropriate licensed contractors are brought in if needed.",
        regulation: "The Control of Asbestos Regulations 2012 require stopping work and proper assessment of suspected asbestos materials."
      },
      {
        id: "C",
        text: "Remove it yourself wearing a dust mask",
        isCorrect: false,
        feedback: "Regular dust masks offer inadequate protection against asbestos fibres.",
        outcome: "You're exposed to hazardous asbestos fibres that could cause serious lung disease later in life.",
        regulation: "The Control of Asbestos Regulations 2012 require special licensing, training and equipment for asbestos removal."
      },
      {
        id: "D",
        text: "Cover it with new materials and continue the job",
        isCorrect: false,
        feedback: "Concealing potential asbestos without proper assessment creates future hazards.",
        outcome: "Future workers or occupants may unknowingly disturb the material, creating serious health risks.",
        regulation: "The Control of Asbestos Regulations 2012 require proper assessment and management of asbestos-containing materials."
      }
    ]
  },
  {
    id: 5,
    title: "Live Working",
    description: "You're troubleshooting a fault in a commercial kitchen during business hours.",
    question: "The chef insists you can't shut off power as they're preparing for dinner service. How do you proceed?",
    options: [
      {
        id: "A",
        text: "Work live carefully to avoid disrupting the kitchen service",
        isCorrect: false,
        feedback: "Working live to avoid inconvenience is never justified and violates safety regulations.",
        outcome: "An accidental contact causes an electrical shock and possible injury, as well as regulatory violations.",
        regulation: "The Electricity at Work Regulations 1989 prohibit live working unless absolutely necessary and with proper precautions."
      },
      {
        id: "B",
        text: "Explain the legal requirement to isolate and arrange a suitable time",
        isCorrect: true,
        feedback: "This properly balances safety requirements with business needs.",
        outcome: "You arrange to return after service or schedule a proper shutdown with adequate notice, maintaining safety and professional standards.",
        regulation: "The Electricity at Work Regulations 1989 require circuits to be dead before work begins unless absolutely unavoidable."
      },
      {
        id: "C",
        text: "Convince the chef it will only take a minute to fix while live",
        isCorrect: false,
        feedback: "Rushing live electrical work greatly increases accident risks.",
        outcome: "Working hastily leads to mistakes that cause a short circuit, damaging equipment and potentially causing injury.",
        regulation: "The Electricity at Work Regulations 1989 never permit live working simply for convenience."
      },
      {
        id: "D",
        text: "Shut off power without further discussion as it's your legal right",
        isCorrect: false,
        feedback: "While safety is paramount, communication and cooperation are still essential.",
        outcome: "Your actions damage client relationships and could lead to complaints or loss of business.",
        regulation: "While the Electricity at Work Regulations 1989 require safe working, proper communication is also a professional requirement."
      }
    ]
  }
];

const OnJobSafetyCases = () => {
  const [selectedScenario, setSelectedScenario] = useState<SafetyScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    <div className="space-y-6 animate-fade-in pb-20">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  
                  {showFeedback && (option.isCorrect || selectedOption === option.id) && (
                    <div className="mt-3 pl-9 space-y-3">
                      <div className="flex items-start gap-2 text-amber-300">
                        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p>{option.feedback}</p>
                      </div>
                      {option.regulation && (
                        <div className="flex items-start gap-2 text-blue-300">
                          <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <p>{option.regulation}</p>
                        </div>
                      )}
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
          <CardFooter className={`flex ${isMobile ? "flex-col" : "justify-end"} gap-3`}>
            <Button variant="outline" onClick={handleReset} className={isMobile ? "w-full" : ""}>
              Back to Scenarios
            </Button>
            {!showFeedback ? (
              <Button onClick={handleSubmitAnswer} disabled={!selectedOption} className={isMobile ? "w-full" : ""}>
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
              }} className={isMobile ? "w-full" : ""}>
                {safetyScenarios.findIndex(s => s.id === selectedScenario.id) + 1 < safetyScenarios.length 
                  ? "Next Scenario" 
                  : "Complete All Scenarios"}
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
              <span>Situational judgement skills development</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Professional communication under pressure</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>UK regulatory framework compliance</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Risk assessment and hazard identification</span>
            </li>
          </ul>
        </div>
      )}

      {!selectedScenario && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              About These Safety Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              These interactive case studies are based on real situations encountered by UK electrical apprentices and electricians. 
              Each scenario is designed to help you apply your knowledge of UK electrical regulations, safety standards, and professional conduct.
            </p>
            <p>
              All references to regulations are specific to the UK electrical industry, including BS 7671 (IET Wiring Regulations), 
              the Electricity at Work Regulations 1989, and other relevant HSE guidelines. Practising these scenarios will help prepare 
              you for real-world decision making on the job.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OnJobSafetyCases;
