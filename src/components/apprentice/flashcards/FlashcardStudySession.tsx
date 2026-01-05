
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, CheckCircle, Trophy, Clock, Target } from "lucide-react";

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface FlashcardStudySessionProps {
  setId: string;
  studyMode: string;
  onExit: () => void;
}

const FlashcardStudySession = ({ setId, studyMode, onExit }: FlashcardStudySessionProps) => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Comprehensive flashcard data for UK electrical apprentices
  const flashcardSets = {
    "cable-colors": [
      { id: "cc1", question: "What colour is the live wire in a UK domestic installation?", answer: "Brown", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc2", question: "What colour is the neutral wire in a UK domestic installation?", answer: "Blue", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc3", question: "What colour is the earth wire in a UK domestic installation?", answer: "Green and Yellow (striped)", category: "Cable Colours", difficulty: "easy" as const },
      { id: "cc4", question: "In a three-phase system, what are the three line colours?", answer: "Brown (L1), Black (L2), Grey (L3)", category: "Cable Colours", difficulty: "medium" as const },
      { id: "cc5", question: "What colour was the old live wire before harmonisation?", answer: "Red", category: "Cable Colours", difficulty: "medium" as const }
    ],
    "bs7671-regulations": [
      { id: "bs1", question: "What is the current edition of BS 7671?", answer: "18th Edition (2018) with Amendment 2 (2022)", category: "BS 7671", difficulty: "easy" as const },
      { id: "bs2", question: "What does SELV stand for?", answer: "Separated Extra Low Voltage", category: "BS 7671", difficulty: "medium" as const },
      { id: "bs3", question: "What is the maximum disconnection time for a 32A circuit in a TN system?", answer: "0.4 seconds", category: "BS 7671", difficulty: "hard" as const },
      { id: "bs4", question: "What is the minimum cross-sectional area for a main earthing conductor in copper?", answer: "16mm²", category: "BS 7671", difficulty: "medium" as const },
      { id: "bs5", question: "What is the purpose of RCD protection?", answer: "Protection against electric shock and fire caused by earth faults", category: "BS 7671", difficulty: "easy" as const }
    ],
    "eicr-codes": [
      { id: "eicr1", question: "What does the EICR code C1 mean?", answer: "Danger present - Risk of injury. Immediate remedial action required.", category: "EICR Codes", difficulty: "easy" as const },
      { id: "eicr2", question: "What does the EICR code C2 mean?", answer: "Potentially dangerous - Urgent remedial action required.", category: "EICR Codes", difficulty: "easy" as const },
      { id: "eicr3", question: "What does the EICR code C3 mean?", answer: "Improvement recommended - Does not meet current standards but no immediate danger.", category: "EICR Codes", difficulty: "easy" as const },
      { id: "eicr4", question: "What does the EICR code FI mean?", answer: "Further Investigation required without delay.", category: "EICR Codes", difficulty: "easy" as const },
      { id: "eicr5", question: "If a C1 is recorded, what is the overall outcome of the EICR?", answer: "Unsatisfactory", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr6", question: "If only C3 codes are recorded, what is the overall outcome?", answer: "Satisfactory", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr7", question: "What maximum interval is recommended between EICRs for domestic properties?", answer: "10 years (or on change of occupancy)", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr8", question: "What maximum interval is recommended for commercial properties?", answer: "5 years", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr9", question: "What maximum interval is recommended for swimming pools?", answer: "1 year", category: "EICR Codes", difficulty: "hard" as const },
      { id: "eicr10", question: "When must a C2 be addressed?", answer: "Within 28 days or as agreed with the client - urgent action needed.", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr11", question: "What does 'LIM' mean on an EICR schedule?", answer: "Limitation - An item that couldn't be fully inspected or tested.", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr12", question: "Who is responsible for ensuring C1 defects are rectified?", answer: "The duty holder (usually the landlord/owner) must arrange immediate action.", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr13", question: "What is the difference between an EIC and an EICR?", answer: "EIC is for new installations; EICR is for existing installations being inspected.", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr14", question: "What does N/A mean in an EICR inspection schedule?", answer: "Not Applicable - The item does not exist or is not relevant to this installation.", category: "EICR Codes", difficulty: "easy" as const },
      { id: "eicr15", question: "What does N/V mean in an EICR inspection schedule?", answer: "Not Verified - Unable to confirm compliance during the inspection.", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr16", question: "If a C2 is recorded, what is the overall outcome?", answer: "Unsatisfactory", category: "EICR Codes", difficulty: "medium" as const },
      { id: "eicr17", question: "What maximum interval is recommended for agricultural/horticultural premises?", answer: "3 years", category: "EICR Codes", difficulty: "hard" as const },
      { id: "eicr18", question: "What form is used to record the EICR observations?", answer: "Schedule of Inspections and Schedule of Test Results (with condition report)", category: "EICR Codes", difficulty: "hard" as const }
    ],
    "safe-isolation": [
      { id: "si1", question: "What is the first step in safe isolation?", answer: "Identify the circuit to be isolated and inform all relevant persons.", category: "Safe Isolation", difficulty: "easy" as const },
      { id: "si2", question: "What must you do before using a voltage indicator?", answer: "Prove it works on a known live source (proving unit or known supply).", category: "Safe Isolation", difficulty: "easy" as const },
      { id: "si3", question: "What must you do after testing that a circuit is dead?", answer: "Re-prove the voltage indicator on a known live source.", category: "Safe Isolation", difficulty: "easy" as const },
      { id: "si4", question: "What does the acronym 'STOP' stand for in safe isolation?", answer: "Switch off, Tag/lock out, Open/isolate, Prove dead.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si5", question: "What type of lock should be used for isolation?", answer: "A unique personal lock with a single key held by the person working.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si6", question: "What must a warning notice include?", answer: "A clear warning that equipment is being worked on and who is doing the work.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si7", question: "Where should you test to confirm a circuit is dead?", answer: "At the point of work - as close as possible to where you'll be working.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si8", question: "What regulation covers safe isolation procedures?", answer: "Electricity at Work Regulations 1989, specifically Regulation 14.", category: "Safe Isolation", difficulty: "hard" as const },
      { id: "si9", question: "What is the minimum PPE required during isolation testing?", answer: "Insulated gloves, safety glasses, and appropriate clothing.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si10", question: "What should you do if you cannot achieve isolation?", answer: "Do not proceed - report to supervisor and follow live working procedures if authorised.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si11", question: "What is a 'proving unit' used for?", answer: "To provide a known voltage source to verify your voltage indicator is working correctly.", category: "Safe Isolation", difficulty: "easy" as const },
      { id: "si12", question: "Who can remove a personal lock from an isolation point?", answer: "Only the person who fitted it (or under strict permit-to-work procedures).", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si13", question: "What is 'primary injection testing' in isolation?", answer: "Testing directly on the circuit conductors rather than through measuring equipment.", category: "Safe Isolation", difficulty: "hard" as const },
      { id: "si14", question: "Why must you test between all conductors?", answer: "To confirm L-N, L-E, and N-E are all dead - a backfeed could energise any conductor.", category: "Safe Isolation", difficulty: "medium" as const },
      { id: "si15", question: "What is the GS38 guidance note about?", answer: "HSE guidance on electrical test equipment for use on low voltage systems.", category: "Safe Isolation", difficulty: "hard" as const }
    ],
    "test-instruments": [
      { id: "ti1", question: "What does a multifunction tester (MFT) measure?", answer: "Insulation resistance, continuity, earth fault loop impedance, RCD operation, and more.", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti2", question: "What voltage does an insulation resistance test use for a 230V circuit?", answer: "500V DC minimum.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti3", question: "What is the minimum acceptable insulation resistance reading?", answer: "1 MΩ (megohm) for circuits up to 500V.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti4", question: "What does a low reading on a continuity test indicate?", answer: "A good connection - lower resistance means better continuity.", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti5", question: "What is the purpose of an earth loop impedance test?", answer: "To verify the circuit can clear a fault quickly by checking the total impedance of the earth fault path.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti6", question: "What unit is earth loop impedance measured in?", answer: "Ohms (Ω).", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti7", question: "What does an RCD tester check?", answer: "That the RCD trips within the required time at various test currents.", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti8", question: "What is the maximum trip time for a 30mA RCD at rated current?", answer: "300ms (0.3 seconds).", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti9", question: "What is the maximum trip time for a 30mA RCD at 5x rated current (150mA)?", answer: "40ms (0.04 seconds).", category: "Test Instruments", difficulty: "hard" as const },
      { id: "ti10", question: "What does a clamp meter measure without breaking the circuit?", answer: "Current flow (by measuring the magnetic field around a conductor).", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti11", question: "What is a 'two-wire' test used for?", answer: "Testing continuity of protective conductors (R1+R2).", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti12", question: "What is the purpose of calibrating test instruments?", answer: "To ensure accurate readings - instruments should be calibrated annually.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti13", question: "What does CAT III rating mean on a meter?", answer: "Suitable for use on distribution level circuits (e.g., consumer units).", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti14", question: "What does CAT IV rating mean on a meter?", answer: "Suitable for use on origin of supply and utility connections.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti15", question: "What is a phase rotation meter used for?", answer: "To verify the correct sequence of phases in a three-phase supply.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti16", question: "What is 'prospective fault current' (PFC)?", answer: "The maximum current that would flow if a short circuit occurred.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti17", question: "Why must test leads comply with GS38?", answer: "For safety - fused, insulated, and with limited exposed probe tips.", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti18", question: "What does a PAT tester check?", answer: "Portable appliance safety - earth continuity, insulation, and leakage current.", category: "Test Instruments", difficulty: "easy" as const },
      { id: "ti19", question: "What is the difference between Zs and Ze?", answer: "Ze is external loop impedance (supply), Zs is total loop impedance (Ze + R1 + R2).", category: "Test Instruments", difficulty: "hard" as const },
      { id: "ti20", question: "What test current does a low-resistance ohmmeter use for continuity?", answer: "Minimum 200mA to check for high-resistance joints.", category: "Test Instruments", difficulty: "hard" as const },
      { id: "ti21", question: "What is a 'dead test' vs a 'live test'?", answer: "Dead tests are done with supply off (continuity, insulation). Live tests need supply on (loop impedance, RCD).", category: "Test Instruments", difficulty: "medium" as const },
      { id: "ti22", question: "What must you do before conducting insulation resistance tests?", answer: "Disconnect or isolate sensitive electronic equipment that could be damaged by 500V DC.", category: "Test Instruments", difficulty: "medium" as const }
    ],
    "fault-finding": [
      { id: "ff1", question: "What are the three main types of electrical faults?", answer: "Open circuit, short circuit, and earth fault.", category: "Fault Finding", difficulty: "easy" as const },
      { id: "ff2", question: "What symptom indicates an open circuit fault?", answer: "No current flow - the circuit is dead even when the supply is on.", category: "Fault Finding", difficulty: "easy" as const },
      { id: "ff3", question: "What symptom indicates a short circuit?", answer: "Excessive current flow causing protective devices to trip immediately.", category: "Fault Finding", difficulty: "easy" as const },
      { id: "ff4", question: "What is a 'high resistance joint'?", answer: "A poor connection that increases resistance, causing heat and voltage drop.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff5", question: "What visual signs indicate a high resistance joint?", answer: "Discolouration, burning, melted insulation, or blackening around the connection.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff6", question: "What is the 'half-split' method of fault finding?", answer: "Testing at the midpoint of a circuit to determine which half contains the fault.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff7", question: "What causes nuisance RCD tripping?", answer: "Cumulative leakage current, faulty appliances, moisture ingress, or shared neutrals.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff8", question: "How do you test for a neutral-earth fault?", answer: "Insulation resistance test between neutral and earth with circuits disconnected.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff9", question: "What is 'volt drop' and when is it a problem?", answer: "Voltage reduction along a cable. It's a problem when it exceeds 5% (3% lighting, 5% other).", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff10", question: "What could cause lights to flicker?", answer: "Loose connections, voltage fluctuations, faulty lamp, or overloaded neutral.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff11", question: "What is 'tracking' in electrical terms?", answer: "A conducting path on insulation surface caused by contamination and moisture.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff12", question: "What causes an MCB to trip but not an RCD?", answer: "Overcurrent or short circuit between live and neutral (not involving earth).", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff13", question: "What causes an RCD to trip but not an MCB?", answer: "Earth fault or leakage current below MCB rating but above RCD sensitivity.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff14", question: "What is a 'borrowed neutral' and why is it dangerous?", answer: "Using another circuit's neutral, causing imbalance and potential RCD issues.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff15", question: "How do you locate an intermittent fault?", answer: "Thermal imaging, monitoring equipment, or stress testing (flexing cables, vibration).", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff16", question: "What does a low insulation resistance reading indicate?", answer: "Damaged insulation, moisture ingress, or contamination in the circuit.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff17", question: "What is 'ring final circuit continuity' and why test it?", answer: "Verifying the ring is complete with no interconnections or breaks.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff18", question: "What would cause high Zs readings?", answer: "Poor earth connections, undersized cables, long cable runs, or corroded joints.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff19", question: "What is 'back-feeding' and why is it dangerous?", answer: "When a circuit is energised from an unexpected source, risking shock during isolation.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff20", question: "How do you identify which circuit is tripping an RCD?", answer: "Disconnect all circuits, reset RCD, reconnect one at a time until it trips.", category: "Fault Finding", difficulty: "easy" as const },
      { id: "ff21", question: "What could cause an electric shock from a metal appliance case?", answer: "Earth fault with inadequate protective conductor or failed earth connection.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff22", question: "What is 'thermal runaway' in electrical connections?", answer: "Heat from high resistance causing more resistance, creating a dangerous positive feedback loop.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff23", question: "How do you test for a crossed polarity fault?", answer: "Use a socket tester or verify with a multimeter that live and neutral are correct.", category: "Fault Finding", difficulty: "easy" as const },
      { id: "ff24", question: "What fault causes a 'tingle' from exposed metalwork?", answer: "Missing earth, high earth impedance, or neutral-earth fault.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff25", question: "What is the most common cause of electrical fires?", answer: "Loose connections creating high resistance joints and arcing.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff26", question: "How do you test for a break in a ring final circuit?", answer: "End-to-end continuity tests should give equal readings for L-L, N-N, and E-E.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff27", question: "What does 'single phasing' mean in a three-phase system?", answer: "Loss of one phase causing motors to run on two phases with reduced power and overheating.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff28", question: "What causes humming or buzzing from electrical equipment?", answer: "Loose laminations, overloaded transformers, or magnetic component vibration.", category: "Fault Finding", difficulty: "medium" as const },
      { id: "ff29", question: "How do you identify a fault in buried cables?", answer: "Cable locator/tracer, TDR (time domain reflectometer), or tone generator.", category: "Fault Finding", difficulty: "hard" as const },
      { id: "ff30", question: "What is the first step in any fault-finding procedure?", answer: "Gather information - ask the user, check for recent changes, review symptoms.", category: "Fault Finding", difficulty: "easy" as const }
    ]
  };

  useEffect(() => {
    const cards = flashcardSets[setId as keyof typeof flashcardSets] || [];
    let orderedCards = [...cards];
    
    // Apply study mode logic
    if (studyMode === 'random') {
      orderedCards = orderedCards.sort(() => Math.random() - 0.5);
    } else if (studyMode === 'spaced') {
      // For spaced repetition, we might want to show harder cards more often
      orderedCards = orderedCards.sort((a, b) => {
        const difficultyWeight = { easy: 1, medium: 2, hard: 3 };
        return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
      });
    }
    
    setFlashcards(orderedCards);
  }, [setId, studyMode]);

  const currentCard = flashcards[currentIndex];
  const progress = flashcards.length > 0 ? ((currentIndex + 1) / flashcards.length) * 100 : 0;

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleMarkCorrect = () => {
    if (currentCard) {
      setMasteredCards(prev => new Set([...prev, currentCard.id]));
      setCorrectAnswers(prev => prev + 1);
    }
    handleNextCard();
  };

  const handleMarkIncorrect = () => {
    handleNextCard();
  };

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      // Session completed
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setMasteredCards(new Set());
    setIsCompleted(false);
    setCorrectAnswers(0);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-elec-light/70">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    const successRate = Math.round((correctAnswers / flashcards.length) * 100);

    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="border-elec-yellow/20 bg-elec-gray text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-elec-yellow/20">
                <Trophy className="h-12 w-12 text-elec-yellow" />
              </div>
            </div>
            <CardTitle className="text-2xl text-elec-yellow">Session Complete!</CardTitle>
            <p className="text-elec-light/70">Well done on completing your flashcard session</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-elec-yellow">{flashcards.length}</div>
                <div className="text-sm text-elec-light/70">Cards Studied</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{successRate}%</div>
                <div className="text-sm text-elec-light/70">Success Rate</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{sessionDuration}m</div>
                <div className="text-sm text-elec-light/70">Time Spent</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Study Again
              </Button>
              <Button 
                variant="outline" 
                onClick={onExit}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sets
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg text-elec-light">Study Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-elec-light/80">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Review incorrect answers to reinforce learning</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Come back tomorrow for spaced repetition</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Try a different study mode for variety</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Study session interface
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onExit}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <div className="flex items-center gap-4 text-sm text-elec-light/70">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>{currentIndex + 1} of {flashcards.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>{masteredCards.size} mastered</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-elec-light/70">Progress</span>
          <span className="text-sm text-elec-yellow font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-elec-dark/50" />
      </div>

      {/* Flashcard */}
      <Card className="border-elec-yellow/20 bg-elec-gray min-h-[300px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-elec-light">
              {currentCard?.category || 'Flashcard'}
            </CardTitle>
            {currentCard?.difficulty && (
              <span className={`text-xs px-2 py-1 rounded border ${
                currentCard.difficulty === 'easy' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                currentCard.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                {currentCard.difficulty}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-lg text-elec-light font-medium">
              {currentCard?.question}
            </div>
            
            {showAnswer && (
              <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                <div className="text-elec-yellow font-medium mb-2">Answer:</div>
                <div className="text-elec-light">{currentCard?.answer}</div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            {!showAnswer ? (
              <Button 
                onClick={handleShowAnswer}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                size="lg"
              >
                Show Answer
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  onClick={handleMarkIncorrect}
                  variant="outline"
                  className="border-red-500/30 hover:bg-red-500/10 text-red-300"
                >
                  Need More Practice
                </Button>
                <Button 
                  onClick={handleMarkCorrect}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Got It Right
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardStudySession;
