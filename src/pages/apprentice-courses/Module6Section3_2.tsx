import { ArrowLeft, Zap, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_2 = () => {
  useSEO(
    "GS38 compliance and tester safety - Level 2 Electrical Testing & Inspection",
    "Understanding and implementing GS38 safety requirements for electrical test instruments"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does GS38 relate to?",
      options: ["Building regulations", "Test equipment safety", "Fire alarms", "Electrical theory"],
      correctAnswer: 1,
      explanation: "GS38 is HSE guidance specifically for test equipment safety in electrical work."
    },
    {
      id: 2,
      question: "What is the maximum exposed length of a GS38 probe tip?",
      options: ["10 mm", "6 mm", "4 mm", "2 mm"],
      correctAnswer: 2,
      explanation: "GS38 specifies that probe tips must not have more than 4 mm of exposed metal."
    },
    {
      id: 3,
      question: "Why must test leads be fused?",
      options: ["To protect against short circuits", "To make readings faster", "To improve accuracy", "To save battery"],
      correctAnswer: 0,
      explanation: "Fused leads protect the user and instrument from dangerous fault currents."
    },
    {
      id: 4,
      question: "Which rating indicates a tester's suitability for different environments?",
      options: ["CAT rating", "IP rating", "Voltage scale", "Battery rating"],
      correctAnswer: 0,
      explanation: "CAT (Category) ratings indicate the maximum transient voltage the instrument can safely handle."
    },
    {
      id: 5,
      question: "What should you always do before and after using a voltage tester?",
      options: ["Shake it", "Prove it on a proving unit", "Turn it off and on", "Check the leads"],
      correctAnswer: 1,
      explanation: "Proving the tester ensures it's working correctly before and after use."
    },
    {
      id: 6,
      question: "True or False: Neon screwdrivers are GS38 compliant.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "Neon screwdrivers are not considered safe or reliable for proving dead according to GS38."
    },
    {
      id: 7,
      question: "Which of these is not a GS38 requirement?",
      options: ["Insulated leads", "Exposed 12 mm probes", "Fused leads", "Shrouded probes"],
      correctAnswer: 1,
      explanation: "GS38 specifically prohibits exposed probe tips greater than 4 mm."
    },
    {
      id: 8,
      question: "What could happen if cracked insulation is ignored?",
      options: ["Slightly inaccurate readings", "Electric shock or arcing", "No effect", "Better conductivity"],
      correctAnswer: 1,
      explanation: "Damaged insulation can expose the user to dangerous voltages and cause arcing."
    },
    {
      id: 9,
      question: "Which category rating is typically required for distribution board testing?",
      options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
      correctAnswer: 2,
      explanation: "CAT III is typically required for distribution board testing due to higher transient voltages."
    },
    {
      id: 10,
      question: "Why is GS38 compliance essential?",
      options: ["To pass exams", "To ensure safe live testing", "To avoid paperwork", "To save money"],
      correctAnswer: 1,
      explanation: "GS38 compliance is essential for ensuring the safety of electricians during live testing work."
    }
  ];

  const faqs = [
    {
      question: "Can I still use my old multimeter if the leads are not shrouded?",
      answer: "No, GS38 requires properly shrouded probes for safe testing. Replace the leads immediately with GS38-compliant alternatives."
    },
    {
      question: "Why do I need fused leads?",
      answer: "Fused leads protect both you and the instrument if the circuit suddenly faults, limiting dangerous current flow and preventing equipment damage."
    },
    {
      question: "Are cheap testers safe if they work?",
      answer: "Not necessarily. If they are not GS38-compliant, they are unsafe and should not be used. Quality and compliance are more important than cost."
    },
    {
      question: "What's the difference between CAT II and CAT III ratings?",
      answer: "CAT II is for local level circuits (up to 600V), while CAT III is for distribution level with higher transient voltages (up to 1000V). Use the appropriate rating for your application."
    },
    {
      question: "How often should I replace test leads?",
      answer: "Replace immediately if damaged, or as recommended by the manufacturer - typically every 2-3 years with regular use. Keep spare sets available."
    },
    {
      question: "What should I do if my instrument fails the proving unit test?",
      answer: "Stop work immediately and remove the instrument from service. Do not attempt testing until the instrument is repaired or replaced with a known working unit."
    },
    {
      question: "Can I repair damaged test leads myself?",
      answer: "No, never attempt to repair test leads with tape or other temporary fixes. This compromises safety and violates GS38 requirements. Replace with compliant leads only."
    },
    {
      question: "Is it safe to use voltage indicators in wet conditions?",
      answer: "Only if the equipment has appropriate IP rating for wet conditions and you follow proper safety procedures. When in doubt, isolate the circuit first."
    },
    {
      question: "What's the minimum CAT rating I need for testing 230V socket outlets?",
      answer: "CAT II 600V is the minimum requirement for testing 230V socket outlets and local level circuits in domestic and commercial installations."
    },
    {
      question: "How do I know if my test equipment needs calibration?",
      answer: "Check the calibration certificate date - most instruments require annual calibration. Also, if readings seem inconsistent or the proving unit test fails, calibration may be needed."
    },
    {
      question: "Can I use automotive test equipment for electrical installation work?",
      answer: "Generally no - automotive equipment is typically not GS38-compliant and lacks appropriate CAT ratings for mains voltage testing. Use purpose-built electrical test equipment only."
    },
    {
      question: "What PPE should I wear when using test equipment?",
      answer: "Minimum: safety glasses and insulated gloves rated for the voltage being tested. Additional PPE may be required based on risk assessment and environment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.3.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            GS38 compliance and tester safety
          </h1>
          <p className="text-muted-foreground">
            Understanding and implementing GS38 safety requirements for electrical test instruments
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>GS38 compliance check: shrouded probes, fused leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Visual inspection: cracked insulation, damaged leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>CAT rating verification: matches installation type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Proving unit test: before and after voltage testing</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-emerald-950/30 border border-emerald-700/40">
              <p className="font-medium mb-3">Spot it / Use it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Non-compliant equipment, exposed probes, missing fuses, damaged insulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> GS38-compliant testers only; proving units for verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Probe shrouding ≤4mm; lead integrity; CAT ratings; calibration dates</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Electrical testing instruments are critical tools for ensuring safety and compliance in electrical installations. However, test instruments themselves can pose significant safety risks if they are not compliant with recognised safety standards.
          </p>
          <p className="text-base text-foreground">
            GS38 is a guidance document published by the Health and Safety Executive (HSE) that specifies the safety requirements for electrical test equipment used in hazardous live environments. Understanding and implementing GS38 compliance is essential for protecting electricians and ensuring accurate, safe testing procedures.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain what GS38 is and why it is important for electrical testing safety.</li>
            <li>Identify the key features of GS38-compliant test equipment.</li>
            <li>Recognise the dangers associated with non-compliant test equipment.</li>
            <li>Describe safe testing practices and procedures.</li>
            <li>Apply GS38 principles to instrument selection and use.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. What is GS38? */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. What is GS38?</h3>
            <p className="text-base text-foreground mb-4">
              GS38 (Guidance on the Use of Electrical Test Equipment) is a Health and Safety Executive (HSE) document that provides essential safety guidance for electrical test equipment used in potentially hazardous environments.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">What is GS38?</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Primary Purpose:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Provides HSE safety guidance for electrical test equipment design</li>
                          <li>Prevents accidents and injuries from unsafe test instruments</li>
                          <li>Establishes minimum safety requirements for probe and lead construction</li>
                          <li>Reduces risk of electric shock and arc flash incidents</li>
                          <li>Ensures test equipment is suitable for live working environments</li>
                          <li>Protects operators from electrical hazards during testing</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Key Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Maximum 4mm exposed probe tip to minimise contact risk</li>
                          <li>Shrouded probe design to prevent accidental contact</li>
                          <li>Fused test leads to limit fault current</li>
                          <li>Appropriate CAT rating for installation voltage and environment</li>
                          <li>Robust construction to withstand industrial use</li>
                          <li>Clear markings and identification on all components</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="gs38-check"
            question="Who publishes GS38 guidance?"
            options={["IET", "HSE", "NICEIC", "BSI"]}
            correctIndex={1}
            explanation="GS38 is published by the Health and Safety Executive (HSE) to provide safety guidance for electrical test equipment."
          />
          <Separator className="my-6" />

          {/* 2. GS38 Safety Features */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. GS38 Safety Features</h3>
            <p className="text-base text-foreground mb-4">
              GS38-compliant test equipment incorporates specific design features to minimise the risk of electric shock and ensure safe operation in live electrical environments.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">GS38 Safety Features</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Essential Safety Features:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Shrouded probes with maximum 4mm exposed tip to prevent accidental contact</li>
                          <li>Fused test leads providing current limiting protection during faults</li>
                          <li>Robust construction capable of withstanding industrial environments</li>
                          <li>Appropriate CAT ratings matching the electrical environment being tested</li>
                          <li>Clear marking of voltage ratings and safety information</li>
                          <li>Double insulation on leads to prevent shock through damaged cables</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Probe Design Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Maximum 4mm exposed metal tip to reduce contact area</li>
                          <li>Spring-loaded shrouds that retract under pressure</li>
                          <li>Insulated probe body with finger guards</li>
                          <li>Secure connection to test leads without exposed metal</li>
                          <li>Clear identification markings and colour coding</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="probe-tip-check"
            question="What is the maximum exposed probe tip length for GS38 compliance?"
            options={["2mm", "4mm", "6mm", "10mm"]}
            correctIndex={1}
            explanation="GS38 specifies a maximum of 4mm exposed probe tip to minimise the risk of accidental contact."
          />
          <Separator className="my-6" />

          {/* 3. Dangers of Non-Compliant Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Dangers of Non-Compliant Equipment</h3>
            <p className="text-base text-foreground mb-4">
              Using non-compliant test equipment poses serious safety risks and can result in severe injury or death. Understanding these dangers is critical for making informed equipment choices.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-3">Dangers of Non-Compliant Equipment</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Serious Safety Risks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Electric shock from direct contact through exposed probes or damaged insulation</li>
                          <li>Arc flash incidents causing severe burns and blast injuries</li>
                          <li>Equipment damage from unfused leads during fault conditions</li>
                          <li>Inaccurate readings due to poor construction and inadequate design</li>
                          <li>Fire risk from overheating due to inadequate current protection</li>
                          <li>Legal liability for non-compliance with health and safety regulations</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Common Non-Compliant Features:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Excessive exposed probe tips (&gt;4mm) increasing contact risk</li>
                          <li>Unfused test leads allowing dangerous fault currents</li>
                          <li>Poor insulation quality leading to breakdown under stress</li>
                          <li>Inadequate CAT ratings for the intended application</li>
                          <li>Cheap construction using substandard materials</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Safe Testing Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Safe Testing Practices</h3>
            <p className="text-base text-foreground mb-4">
              Beyond using GS38-compliant equipment, safe testing requires following established procedures and best practices to minimise risk during electrical testing operations.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Safe Testing Practices</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Essential Testing Procedures:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Prove before and after: Test instruments on known live source before and after use</li>
                          <li>Visual inspection: Check test equipment for damage before each use</li>
                          <li>Appropriate PPE: Use insulated gloves and safety glasses as required</li>
                          <li>Proper procedure: Follow manufacturer's instructions and safe working practices</li>
                          <li>Environmental awareness: Consider conditions that may affect safety</li>
                          <li>Regular calibration: Ensure instruments are calibrated and within specification</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Pre-Use Safety Checks:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Inspect leads for cuts, nicks, or damaged insulation</li>
                          <li>Check probe shrouds are intact and functioning properly</li>
                          <li>Verify CAT rating is appropriate for the installation</li>
                          <li>Confirm calibration is current and within validity period</li>
                          <li>Test proving unit functionality before use</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safe-practices-check"
            question="What should you do before and after using test instruments?"
            options={["Clean the probes", "Prove on known live source", "Check the battery", "Read the manual"]}
            correctIndex={1}
            explanation="You should always prove test instruments on a known live source before and after use to ensure they are working correctly."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <p className="text-base text-foreground mb-6">
            Implementing GS38 compliance requires practical knowledge of equipment selection, inspection procedures, and safe working practices. This comprehensive guidance covers all aspects of safe test equipment management.
          </p>
          
          <div className="space-y-6">
            {/* Equipment Selection Guide */}
            <div className="bg-emerald-50/50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Equipment Selection Criteria
              </h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">CAT Rating Selection</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>CAT I:</strong> Electronic equipment, domestic appliances (300V max)</li>
                    <li><strong>CAT II:</strong> Local level circuits, socket outlets (600V max)</li>
                    <li><strong>CAT III:</strong> Distribution boards, fixed installations (1000V max)</li>
                    <li><strong>CAT IV:</strong> Origin of supply, overhead lines (1500V max)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Compliance Verification</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li>Look for GS38 compliance markings on equipment</li>
                    <li>Check manufacturer's certification documents</li>
                    <li>Verify CE marking and safety standards compliance</li>
                    <li>Ensure equipment meets BS EN 61010 standards</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Daily Inspection Procedures */}
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-5 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Daily Inspection Procedures
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Visual Inspection</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Check leads for cuts, nicks, or compression damage</li>
                    <li>Inspect probe shrouds for cracks or damage</li>
                    <li>Verify probe tips are not bent or worn</li>
                    <li>Check connection integrity at probe and meter</li>
                    <li>Look for signs of overheating or burning</li>
                    <li>Ensure all markings are clearly visible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Functional Testing</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Test on proving unit before use</li>
                    <li>Check continuity function operates correctly</li>
                    <li>Verify voltage measurement accuracy</li>
                    <li>Test probe shroud spring action</li>
                    <li>Check display clarity and stability</li>
                    <li>Confirm battery level is adequate</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Documentation</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                    <li>Record inspection results in logbook</li>
                    <li>Note any defects or concerns</li>
                    <li>Check calibration certificate validity</li>
                    <li>Verify PAT testing is current</li>
                    <li>Update equipment maintenance records</li>
                    <li>Tag equipment if removed from service</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testing Environment Considerations */}
            <div className="bg-green-50/50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200/50 dark:border-green-800/50">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Environmental Safety Considerations
              </h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3">Environmental Hazards</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>Moisture/Humidity:</strong> Can reduce insulation effectiveness and cause tracking</li>
                    <li><strong>Temperature Extremes:</strong> Affects equipment accuracy and safety margins</li>
                    <li><strong>Contamination:</strong> Dust, chemicals, or conductive particles increase risks</li>
                    <li><strong>Confined Spaces:</strong> Limited escape routes and restricted movement</li>
                    <li><strong>Vibration:</strong> Can affect probe contact and measurement stability</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-3">Risk Mitigation</h4>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li>Use appropriate IP-rated equipment for wet conditions</li>
                    <li>Allow equipment to acclimatise to temperature changes</li>
                    <li>Clean equipment before use in contaminated areas</li>
                    <li>Ensure adequate lighting and working space</li>
                    <li>Use remote testing methods where possible</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Maintenance Schedule */}
            <div className="bg-purple-50/50 dark:bg-purple-900/20 p-5 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Maintenance and Calibration Schedule
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 px-3 font-medium text-foreground">Frequency</th>
                      <th className="text-left py-2 px-3 font-medium text-foreground">Activity</th>
                      <th className="text-left py-2 px-3 font-medium text-foreground">Responsibility</th>
                      <th className="text-left py-2 px-3 font-medium text-foreground">Records Required</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/20">
                      <td className="py-2 px-3">Daily</td>
                      <td className="py-2 px-3">Visual inspection, functional check</td>
                      <td className="py-2 px-3">User</td>
                      <td className="py-2 px-3">Inspection checklist</td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="py-2 px-3">Weekly</td>
                      <td className="py-2 px-3">Proving unit verification</td>
                      <td className="py-2 px-3">User</td>
                      <td className="py-2 px-3">Test log</td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="py-2 px-3">Monthly</td>
                      <td className="py-2 px-3">PAT testing, detailed inspection</td>
                      <td className="py-2 px-3">Qualified person</td>
                      <td className="py-2 px-3">PAT certificate</td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="py-2 px-3">Annually</td>
                      <td className="py-2 px-3">Calibration verification</td>
                      <td className="py-2 px-3">Calibration lab</td>
                      <td className="py-2 px-3">Calibration certificate</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">As required</td>
                      <td className="py-2 px-3">Repair, replacement</td>
                      <td className="py-2 px-3">Competent person</td>
                      <td className="py-2 px-3">Work order, test certificate</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-3">Case Study: Non-Compliant Equipment Incident</h4>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              An electrician was testing a commercial three-phase distribution board using non-GS38 compliant test probes. The probes had excessive exposed tips (10mm) and no finger guards. During voltage testing, the electrician accidentally contacted both probes simultaneously while reaching across the panel.
            </p>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              The result was an immediate short circuit between phases, causing an arc flash that resulted in second-degree burns to the electrician's hands and face, damaged equipment, and a site shutdown lasting several days.
            </p>
            
            <div className="space-y-4 mt-4">
              <div className="rounded-lg p-4 border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10">
                <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">What Went Wrong:</p>
                <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                  <li>Non-compliant probes with excessive exposed tips</li>
                  <li>No finger guards or shrouding</li>
                  <li>Poor working practice (reaching across live parts)</li>
                  <li>Inadequate risk assessment</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4 border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-900/10">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Prevention with GS38:</p>
                <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                  <li>Shrouded probes would have prevented simultaneous contact</li>
                  <li>4mm tip limit would have reduced arc energy</li>
                  <li>Proper training would have improved working practices</li>
                  <li>Fused leads would have limited fault current</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 mt-4">
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Professional Insight</p>
              <p className="text-xs sm:text-sm text-foreground">
                This incident demonstrates why GS38 compliance is not optional - it's a critical safety requirement that can prevent serious injury and save lives. The cost of compliant equipment is insignificant compared to the potential consequences of an accident.
              </p>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-emerald-400 pl-4">
                <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Pocket Guide: GS38 Essentials
          </h2>
          <div className="space-y-3 text-base">
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Check probe shrouds: max 4mm exposed tip</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Verify fused leads: current limiting protection</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Confirm CAT rating: matches installation voltage</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Visual inspection: check for damage before use</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Prove before/after: test on known live source</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Calibration check: within validity period</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Never use: neon screwdrivers for proving dead</span>
            </p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border/30">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-3">
                <Zap className="w-6 h-6 text-emerald-400 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">GS38 Purpose</h4>
              <p className="text-xs text-muted-foreground">HSE safety guidance for test equipment</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border/30">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-3">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Safety Features</h4>
              <p className="text-xs text-muted-foreground">Shrouded probes, fused leads</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border/30">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-3">
                <FileText className="w-6 h-6 text-purple-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Compliance</h4>
              <p className="text-xs text-muted-foreground">4mm max tip, CAT ratings</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border/30">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-emerald-400" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Risks</h4>
              <p className="text-xs text-muted-foreground">Shock, arc flash, damage</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background border border-border/30">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-3">
                <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Best Practice</h4>
              <p className="text-xs text-muted-foreground">Prove, inspect, comply</p>
            </div>
          </div>
          
          <p className="text-base text-foreground">
            GS38 compliance is not optional - it's a legal and professional requirement that protects electricians and ensures safe testing practices. Always use compliant equipment and follow proper procedures to prevent accidents and maintain professional standards.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz questions={quizQuestions} title="Section 6.3.2 Knowledge Check" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" asChild>
            <Link to="../3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Introduction to Test Instruments
            </Link>
          </Button>
          
          <Button variant="outline" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" asChild>
            <Link to="..">
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section3_2;