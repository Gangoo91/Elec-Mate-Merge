import { ArrowLeft, ArrowRight, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const Module7Section2_3 = () => {
  useSEO(
    "Earth Faults and Leakage Currents - Level 2 Module 7 Section 2.3",
    "Understanding earth faults, leakage currents, and protective measures in electrical installations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is an earth fault?",
      options: [
        "When a live conductor makes contact with earth or exposed conductive parts",
        "When neutral and line conductors touch",
        "When current flows through the protective conductor normally",
        "When RCD operates correctly"
      ],
      correctAnswer: 0,
      explanation: "An earth fault occurs when a live conductor makes contact with earth or exposed conductive parts, creating a dangerous condition."
    },
    {
      id: 2,
      question: "What happens if a line conductor touches exposed earthed metalwork?",
      options: [
        "Nothing happens",
        "The metalwork becomes live and dangerous",
        "The circuit becomes more efficient",
        "Only the RCD will be affected"
      ],
      correctAnswer: 1,
      explanation: "When a line conductor touches exposed earthed metalwork, that metalwork becomes live, creating a serious shock risk."
    },
    {
      id: 3,
      question: "How is leakage current different from a full earth fault?",
      options: [
        "Leakage current is much larger",
        "Leakage current is a small, unintended flow to earth",
        "Leakage current only occurs in old installations",
        "There is no difference"
      ],
      correctAnswer: 1,
      explanation: "Leakage current is a small, unintended current that flows continuously through insulation or damp conditions, while earth faults usually involve higher currents."
    },
    {
      id: 4,
      question: "What risk do earth faults pose to people?",
      options: [
        "No risk if protective devices work",
        "Electric shock from exposed metalwork becoming live",
        "Only equipment damage",
        "Reduced energy efficiency"
      ],
      correctAnswer: 1,
      explanation: "Earth faults pose a serious risk of electric shock as exposed metalwork can become live and dangerous to touch."
    },
    {
      id: 5,
      question: "What risk do leakage currents pose to installations?",
      options: [
        "No risk at all",
        "Nuisance tripping of RCDs and potential overheating",
        "Improved safety",
        "Better energy efficiency"
      ],
      correctAnswer: 1,
      explanation: "Leakage currents can cause nuisance RCD tripping, loss of supply, and potential overheating over time."
    },
    {
      id: 6,
      question: "Which device detects current imbalance caused by leakage?",
      options: [
        "MCB",
        "Fuse",
        "RCD",
        "Isolator"
      ],
      correctAnswer: 2,
      explanation: "RCDs (Residual Current Devices) monitor current balance between live and neutral and trip if leakage to earth is detected."
    },
    {
      id: 7,
      question: "True or False: All earth faults cause high fault currents.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Some earth faults, particularly through high impedance paths, may not cause high currents but are still dangerous."
    },
    {
      id: 8,
      question: "What can cause leakage currents in electrical installations?",
      options: [
        "Perfect insulation",
        "Leakage currents from damp conditions or equipment filters",
        "Correct earthing",
        "Low resistance conductors"
      ],
      correctAnswer: 1,
      explanation: "Leakage currents from damp conditions, equipment filters, or deteriorating insulation can cause nuisance RCD tripping."
    },
    {
      id: 9,
      question: "Which tool directly measures leakage current to earth?",
      options: [
        "Standard multimeter",
        "Earth-leakage clamp meter",
        "Basic continuity tester",
        "Standard ammeter"
      ],
      correctAnswer: 1,
      explanation: "Earth-leakage clamp meters are specifically designed to measure small currents flowing to earth without breaking the circuit."
    },
    {
      id: 10,
      question: "Which BS 7671 part covers selection and erection of RCDs?",
      options: [
        "Part 411",
        "Part 531",
        "Part 514",
        "Part 522"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Part 531 covers the selection and erection of devices for protection against electric shock, including RCDs."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 2</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="p-2 rounded-lg self-start">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1">
            <Badge variant="outline" className="mb-2 sm:mb-3 border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.2.3
            </Badge>
            <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              2.3 Earth Faults and Leakage Currents
            </h1>
            <p className="text-sm sm:text-base text-white max-w-3xl">
              Understanding earth faults, leakage currents, and protective measures in electrical installations
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <ul className="list-disc pl-4 space-y-1 sm:space-y-2">
                  <li>An <strong>earth fault</strong> occurs when a live conductor makes contact with earth or exposed conductive parts</li>
                  <li>Creates serious risk of electric shock and equipment damage</li>
                  <li>Can cause protective devices to operate</li>
                  <li>Often involves current flowing through unintended paths</li>
                  <li>May result in exposed metalwork becoming live</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <h3 className="font-medium text-white mb-2">Spot / Use / Check</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> RCD operation, shock risk, equipment damage</li>
                  <li><strong>Use:</strong> RCD tester, insulation resistance tester</li>
                  <li><strong>Check:</strong> Earth continuity, IR values, protective bonding</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Identify the characteristics and symptoms of earth faults and leakage currents</li>
              <li>Understand the difference between earth faults and normal leakage currents</li>
              <li>Apply systematic testing methods to detect and locate earth faults</li>
              <li>Implement safe testing procedures when investigating earth faults</li>
              <li>Recognise the role of protective devices in earth fault protection</li>
              <li>Apply relevant BS 7671 requirements for earth fault protection and testing</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content</h2>
            
            {/* Section 1: Earth Faults and Leakage Current - Fundamentals */}
            <div className="border-l-4 border-l-elec-yellow p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Earth Faults and Leakage Current - Fundamentals</h3>
              </div>
              
              <div className="text-xs sm:text-sm text-white space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-elec-yellow dark:text-elec-yellow">Definitions and Key Differences</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium text-red-600 dark:text-elec-yellow mb-2">Earth Fault</h5>
                      <p className="text-xs mb-2">An electrical fault where a live conductor makes direct contact with earth or exposed conductive parts, creating an immediate dangerous condition.</p>
                      <ul className="text-xs space-y-1">
                        <li>• Typically involves higher currents (hundreds of mA to several amps)</li>
                        <li>• Creates immediate danger - exposed parts become live</li>
                        <li>• Usually causes immediate RCD operation</li>
                        <li>• Requires urgent investigation and rectification</li>
                      </ul>
                    </div>
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Leakage Current</h5>
                      <p className="text-xs mb-2">Small amounts of current that flow continuously to earth through insulation or designed paths (such as EMC filters).</p>
                      <ul className="text-xs space-y-1">
                        <li>• Much smaller currents (typically 1-10mA per circuit)</li>
                        <li>• Persistent but not immediately dangerous</li>
                        <li>• Can cause nuisance RCD tripping when cumulative</li>
                        <li>• Sometimes normal (in IT equipment with filters)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-elec-yellow dark:text-elec-yellow">Common Causes and Contributing Factors</h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                      <h5 className="font-medium text-red-700 dark:text-elec-yellow mb-2">Earth Fault Causes</h5>
                      <ul className="text-xs text-red-600 dark:text-elec-yellow space-y-1">
                        <li>• <strong>Mechanical damage:</strong> Nails, screws, or tools penetrating cable insulation</li>
                        <li>• <strong>Water ingress:</strong> Moisture entering electrical equipment or accessories</li>
                        <li>• <strong>Insulation failure:</strong> Age, heat, or chemical degradation of cable insulation</li>
                        <li>• <strong>Installation errors:</strong> Loose connections allowing conductors to touch metalwork</li>
                        <li>• <strong>Environmental factors:</strong> Rodent damage, UV degradation, or corrosive atmospheres</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
                      <h5 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Leakage Current Sources</h5>
                      <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                        <li>• <strong>EMC filters:</strong> Built-in capacitors in IT equipment (normal operation)</li>
                        <li>• <strong>Capacitive coupling:</strong> Long cable runs creating natural capacitance to earth</li>
                        <li>• <strong>Moisture ingress:</strong> Gradual water penetration reducing insulation resistance</li>
                        <li>• <strong>Deteriorating insulation:</strong> Gradual breakdown allowing small current paths</li>
                        <li>• <strong>Dirty surfaces:</strong> Contaminated insulators providing conductive paths</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-elec-yellow dark:text-elec-yellow">Safety Risks and Effects</h4>
                  <div className="bg-card border border-border/30 rounded-lg p-3">
                    <h5 className="font-medium text-red-600 dark:text-elec-yellow mb-2">Immediate Safety Risks</h5>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Electric shock:</strong> Exposed metalwork becomes live and dangerous to touch</li>
                      <li>• <strong>Fire risk:</strong> Arcing at fault points can ignite combustible materials</li>
                      <li>• <strong>Equipment damage:</strong> Fault currents can damage sensitive electronic equipment</li>
                      <li>• <strong>Loss of protection:</strong> Earth fault affecting protective conductor systems</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border/30 rounded-lg p-3 mt-3">
                    <h5 className="font-medium text-orange-600 dark:text-elec-yellow mb-2">Operational Problems</h5>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Nuisance tripping:</strong> RCDs operate unnecessarily, causing supply interruption</li>
                      <li>• <strong>Reduced availability:</strong> Frequent supply interruptions affect productivity and safety systems</li>
                      <li>• <strong>Cumulative effects:</strong> Multiple small leakage currents can sum to trip 30mA RCDs</li>
                      <li>• <strong>Heating effects:</strong> Persistent leakage can cause localised heating and further insulation degradation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="earth-fault-fundamentals"
              question="What is the key difference between an earth fault and leakage current?"
              options={[
                "There is no difference",
                "Earth faults involve higher currents and immediate danger; leakage currents are smaller but persistent",
                "Leakage currents are more dangerous",
                "Earth faults only occur in old installations"
              ]}
              correctIndex={1}
              explanation="Earth faults typically involve higher currents and create immediate danger, while leakage currents are smaller but persistent and can cause cumulative problems."
            />

            <Separator className="my-6" />

            {/* Section 2: Protection Systems and BS 7671 Requirements */}
            <div className="border-l-4 border-l-green-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Protection Systems and BS 7671 Requirements</h3>
              </div>
              
              <div className="text-xs sm:text-sm text-white space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-green-600 dark:text-green-400">Residual Current Device (RCD) Protection</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium mb-2">How RCDs Work</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Monitor current balance between live and neutral conductors</li>
                        <li>• Detect imbalance when current flows to earth</li>
                        <li>• Trip when imbalance exceeds rated sensitivity</li>
                        <li>• Provide protection against both earth faults and electric shock</li>
                        <li>• Must disconnect within specified time limits (typically 300ms)</li>
                      </ul>
                    </div>
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium mb-2">RCD Types and Applications</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>30mA:</strong> Personal protection, socket outlets, bathrooms</li>
                        <li>• <strong>100mA:</strong> Fire protection in older installations</li>
                        <li>• <strong>300mA:</strong> Large installations requiring discrimination</li>
                        <li>• <strong>RCBOs:</strong> Combined overcurrent and residual current protection</li>
                        <li>• <strong>Time-delayed:</strong> Upstream discrimination in series arrangements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-600 dark:text-green-400">BS 7671 Requirements and Standards</h4>
                  <div className="space-y-3">
                    <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Key BS 7671 Requirements</h5>
                      <ul className="text-xs text-elec-yellow dark:text-elec-yellow space-y-1">
                        <li>• <strong>Section 411:</strong> Protective measures - basic protection and fault protection</li>
                        <li>• <strong>Section 531:</strong> Selection and erection of RCDs and protective devices</li>
                        <li>• <strong>30mA additional protection:</strong> Required for socket outlets up to 20A and mobile equipment</li>
                        <li>• <strong>Maximum disconnection times:</strong> 0.4s for final circuits, 5s for distribution circuits</li>
                        <li>• <strong>Special locations:</strong> Enhanced protection requirements (bathrooms, swimming pools, etc.)</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-3 rounded-lg">
                      <h5 className="font-medium text-purple-700 dark:text-elec-yellow mb-2">Design Considerations</h5>
                      <ul className="text-xs text-purple-600 dark:text-elec-yellow space-y-1">
                        <li>• <strong>Discrimination and selectivity:</strong> Use time-delayed RCDs in series arrangements</li>
                        <li>• <strong>Split-load design:</strong> Separate circuits to prevent total loss of supply</li>
                        <li>• <strong>RCD sensitivity selection:</strong> Balance between protection and nuisance tripping</li>
                        <li>• <strong>Leakage assessment:</strong> Consider cumulative leakage when grouping circuits</li>
                        <li>• <strong>RCBO per circuit:</strong> Individual protection reduces nuisance tripping impact</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-green-600 dark:text-green-400">Installation Best Practices</h4>
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Design Strategies</h5>
                    <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                      <li>• <strong>Cable routing:</strong> Avoid areas prone to damage or moisture ingress</li>
                      <li>• <strong>IP rating selection:</strong> Choose appropriate enclosure protection for environment</li>
                      <li>• <strong>IT equipment isolation:</strong> Group high-leakage equipment on dedicated RCDs</li>
                      <li>• <strong>SMPS load management:</strong> Consider cumulative filter leakage from switch-mode supplies</li>
                      <li>• <strong>Documentation:</strong> Keep records of known leakage sources and RCD sensitivity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="protection-systems"
              question="Which BS 7671 section covers selection and erection of RCDs?"
              options={[
                "Section 411",
                "Section 531",
                "Section 514",
                "Section 522"
              ]}
              correctIndex={1}
              explanation="BS 7671 Section 531 covers the selection and erection of devices for protection against electric shock, including RCDs."
            />

            <Separator className="my-6" />

            {/* Section 3: Testing, Diagnosis and Troubleshooting */}
            <div className="border-l-4 border-l-purple-500 p-4 sm:p-6 rounded-r-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Testing, Diagnosis and Troubleshooting</h3>
              </div>
              
              <div className="text-xs sm:text-sm text-white space-y-4">
                <div>
                  <h4 className="font-medium mb-3 text-purple-600 dark:text-elec-yellow">Systematic Testing Process</h4>
                  <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                    <h5 className="font-medium mb-2">Step-by-Step Investigation</h5>
                    <ol className="list-decimal pl-4 space-y-2 text-xs">
                      <li><strong>Initial assessment:</strong> Review symptoms, check RCD operations, gather user reports</li>
                      <li><strong>Visual inspection:</strong> Check for obvious damage, water ingress, loose connections, or burning</li>
                      <li><strong>Safe isolation:</strong> Ensure circuits are safely isolated before detailed investigation</li>
                      <li><strong>CPC continuity testing:</strong> Verify earth paths are intact using low-resistance ohmmeter</li>
                      <li><strong>Insulation resistance tests:</strong> Test with sensitive equipment isolated to avoid damage</li>
                      <li><strong>RCD functional testing:</strong> Perform ramp test and time measurement using RCD tester</li>
                      <li><strong>Earth leakage measurement:</strong> Use clamp meter to measure actual leakage currents</li>
                      <li><strong>Load assessment:</strong> Evaluate individual circuit contributions to total leakage</li>
                      <li><strong>Documentation:</strong> Record findings and compare with acceptable limits</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-600 dark:text-elec-yellow">Testing Equipment and Techniques</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium mb-2">Essential Test Equipment</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Earth leakage clamp meter:</strong> Measures current to earth without circuit interruption</li>
                        <li>• <strong>Insulation resistance tester:</strong> 500V DC test for cable and equipment insulation</li>
                        <li>• <strong>RCD tester:</strong> Functional testing and trip time measurement</li>
                        <li>• <strong>Low resistance ohmmeter:</strong> CPC continuity and bonding verification</li>
                        <li>• <strong>PAT tester:</strong> Portable appliance earth leakage measurement</li>
                      </ul>
                    </div>
                    <div className="bg-[#121212]/50 p-3 rounded border border-white/10">
                      <h5 className="font-medium mb-2">Test Standards and Limits</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Insulation resistance:</strong> Minimum 1MΩ for final circuits</li>
                        <li>• <strong>RCD trip time:</strong> Maximum 300ms at rated current for 30mA devices</li>
                        <li>• <strong>Earth leakage per circuit:</strong> Typically &lt; 1mA for lighting, &lt; 3.5mA for other circuits</li>
                        <li>• <strong>Total installation leakage:</strong> Should not exceed 25% of RCD rating</li>
                        <li>• <strong>Class I appliances:</strong> Leakage typically &lt; 3.5mA</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-600 dark:text-elec-yellow">Troubleshooting Common Issues</h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                      <h5 className="font-medium text-red-700 dark:text-elec-yellow mb-2">Nuisance RCD Tripping</h5>
                      <ul className="text-xs text-red-600 dark:text-elec-yellow space-y-1">
                        <li>• <strong>Identify cumulative leakage:</strong> Test individual circuits to find high contributors</li>
                        <li>• <strong>Temporary disconnection:</strong> Isolate suspected circuits to confirm source</li>
                        <li>• <strong>Load redistribution:</strong> Move high-leakage equipment to separate RCD</li>
                        <li>• <strong>Equipment assessment:</strong> Check IT equipment, fluorescent lighting, motors</li>
                        <li>• <strong>Environmental factors:</strong> Consider moisture, temperature, and installation conditions</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-lg">
                      <h5 className="font-medium text-amber-700 dark:text-amber-300 mb-2">RCD Won't Reset</h5>
                      <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                        <li>• <strong>Earth fault present:</strong> High current flow preventing reset</li>
                        <li>• <strong>Damaged RCD:</strong> Internal mechanism failure requiring replacement</li>
                        <li>• <strong>Mechanical obstruction:</strong> Physical damage to reset mechanism</li>
                        <li>• <strong>Persistent fault:</strong> Ongoing earth fault maintaining trip condition</li>
                        <li>• <strong>Neutral-earth short:</strong> N-E fault in downstream circuits</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-purple-600 dark:text-elec-yellow">Verification and Documentation</h4>
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                    <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Post-Repair Verification</h5>
                    <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                      <li>• <strong>Retest insulation resistance:</strong> Confirm repair has resolved low insulation</li>
                      <li>• <strong>Measure total earth leakage:</strong> Verify levels are within acceptable limits</li>
                      <li>• <strong>RCD functional test:</strong> Confirm correct operation at rated sensitivity</li>
                      <li>• <strong>Load test:</strong> Re-energise with normal loads to confirm stable operation</li>
                      <li>• <strong>Documentation:</strong> Record test results, repairs made, and recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <InlineCheck
              id="testing-diagnosis"
              question="Which tool directly measures leakage current to earth without breaking the circuit?"
              options={[
                "Standard multimeter",
                "Earth-leakage clamp meter",
                "Basic continuity tester",
                "Standard ammeter"
              ]}
              correctIndex={1}
              explanation="Earth-leakage clamp meters are specifically designed to measure small currents flowing to earth without breaking the circuit."
            />
          </CardContent>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-elec-yellow" />
              <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Practical Guidance</h2>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card p-4 rounded-lg border border-white/10">
                  <h3 className="font-medium mb-3 text-white">Safe Investigation Procedure</h3>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>Isolate supply and confirm dead before investigation</li>
                    <li>Check for obvious visual signs of damage or water ingress</li>
                    <li>Test earth continuity to verify protective conductor integrity</li>
                    <li>Perform insulation resistance tests with sensitive equipment disconnected</li>
                    <li>Re-energise and test RCD operation at low current levels first</li>
                    <li>Use earth leakage clamp meter to identify problem circuits</li>
                  </ol>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/30">
                  <h3 className="font-medium mb-3 text-elec-yellow dark:text-elec-yellow">Testing Equipment Required</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>RCD tester:</strong> For trip time and sensitivity testing</li>
                    <li><strong>Insulation resistance tester:</strong> 500V minimum for circuits</li>
                    <li><strong>Earth leakage clamp meter:</strong> To measure actual leakage currents</li>
                    <li><strong>Low resistance ohmmeter:</strong> For earth continuity testing</li>
                    <li><strong>Proving unit:</strong> To verify test instrument operation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-world Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-card/20 to-transparent border-white/10">
          <CardContent className="p-0">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Real-world Example</h2>
            </div>
            <div className="bg-card p-4 rounded-lg border border-white/10">
              <h3 className="font-medium mb-3 text-white">Office Building RCD Nuisance Tripping</h3>
              <div className="space-y-3 text-xs sm:text-sm text-white">
                <p><strong>Problem:</strong> An office building experienced repeated RCD tripping on the ground floor lighting and power circuits, causing disruption to computer equipment and loss of productivity.</p>
                <p><strong>Investigation:</strong> Initial testing showed no obvious faults - insulation resistance values were acceptable and RCD sensitivity was correct. However, earth leakage clamp meter readings revealed 25mA of leakage current on the circuit.</p>
                <p><strong>Root Cause:</strong> Water had seeped into a floor-level socket outlet through damaged trunking, creating a leakage path to earth. The 30mA RCD was operating correctly but nuisance tripping occurred during peak load periods when the additional leakage pushed total current above the trip threshold.</p>
                <p><strong>Solution:</strong> The damaged socket was replaced, trunking was resealed, and the circuit was transferred to an RCBO to provide individual protection and prevent future nuisance tripping affecting other circuits.</p>
                <p><strong>Lesson:</strong> Even small amounts of leakage current can cause significant operational problems. Regular testing and use of appropriate test equipment is essential for identifying problems before they cause disruption.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
            <div className="grid gap-4 md:grid-cols-2 text-xs sm:text-sm text-white">
              <div>
                <h3 className="font-medium mb-2">Key Points:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Earth faults create immediate shock risks by making metalwork live</li>
                  <li>Leakage currents cause operational problems through nuisance RCD tripping</li>
                  <li>Both conditions require systematic testing and proper protective devices</li>
                  <li>RCDs provide essential protection but must be properly coordinated</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Best Practice:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Regular inspection and testing prevents problems developing</li>
                  <li>Proper cable routing and IP ratings reduce fault likelihood</li>
                  <li>RCBO-per-circuit design minimises disruption from faults</li>
                  <li>Documentation of leakage sources aids future troubleshooting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <CardContent className="p-0">
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-l-elec-yellow pl-4">
                <h3 className="font-medium text-white mb-2">Q: Why do RCDs trip when there's no fault?</h3>
                <p className="text-sm text-white">A: This is usually due to cumulative leakage currents from multiple sources exceeding the RCD sensitivity. Electronic equipment, damp conditions, and ageing insulation all contribute small leakage currents that can sum to trip 30mA RCDs.</p>
              </div>
              <div className="border-l-4 border-l-green-500 pl-4">
                <h3 className="font-medium text-white mb-2">Q: Is it safe to increase RCD sensitivity to prevent tripping?</h3>
                <p className="text-sm text-white">A: No. RCD sensitivity should not be increased as this reduces protection levels. Instead, identify and address the source of leakage or use RCBO design to limit the impact of tripping.</p>
              </div>
              <div className="border-l-4 border-l-orange-500 pl-4">
                <h3 className="font-medium text-white mb-2">Q: How often should RCDs be tested?</h3>
                <p className="text-sm text-white">A: RCDs should be tested using the integral test button monthly by the user, and comprehensively tested by a qualified electrician during periodic inspection and testing as required by BS 7671.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6 sm:my-8" />

        {/* Quiz Section */}
        <Quiz questions={quizQuestions} />

        <Separator className="my-6 sm:my-8" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link to="../2-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: </span>Short Circuit Faults
            </Link>
          </Button>
          
          <Button className="flex items-center gap-2" asChild>
            <Link to="../2-4">
              <span className="hidden sm:inline">Next: </span>Overload Conditions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module7Section2_3;