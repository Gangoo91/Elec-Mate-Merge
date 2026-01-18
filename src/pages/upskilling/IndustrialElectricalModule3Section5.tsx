import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Workflow,
  Shield,
  FolderOpen,
  Building,
  BookOpen,
  CheckCircle,
  Info,
  AlertTriangle,
  Users,
} from 'lucide-react';

const IndustrialElectricalModule3Section5: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Functional Testing and Documentation | Industrial Electrical Module 3 Section 5 | Elec-Mate',
    description:
      'Master Factory Acceptance Testing (FAT), Site Acceptance Testing (SAT), BS EN 61439 routine verification, point-to-point wiring verification, functional sequence testing, and technical documentation packages for industrial switchgear assemblies.',
    keywords:
      'FAT testing, SAT testing, BS EN 61439, routine verification, Declaration of Conformity, O&M manuals, witness testing, test certificates, functional testing, industrial electrical documentation',
    canonical: '/upskilling/industrial-electrical/module-3/section-5',
  });

  const quickCheckQuestions = [
    {
      id: 'qc-fat-purpose',
      question: 'What is the primary purpose of Factory Acceptance Testing (FAT)?',
      options: [
        'To test the installation at the final site location',
        'To verify the assembly meets specifications before dispatch from the manufacturer',
        'To check electrical continuity only',
        'To satisfy insurance requirements',
      ],
      correctIndex: 1,
      explanation:
        'Factory Acceptance Testing (FAT) is performed at the manufacturer\'s premises before dispatch to verify that the switchgear assembly meets all design specifications, customer requirements, and relevant standards. This allows issues to be identified and resolved before shipping, reducing costly on-site modifications.',
    },
    {
      id: 'qc-61439-verification',
      question: 'Under BS EN 61439, which type of verification must be performed on every manufactured assembly?',
      options: [
        'Type testing only',
        'Design verification only',
        'Routine verification',
        'Environmental testing',
      ],
      correctIndex: 2,
      explanation:
        'BS EN 61439 requires routine verification on every manufactured assembly. This includes inspection and testing to confirm the assembly has been correctly constructed according to the design. Type testing and design verification establish the design\'s compliance, but routine verification ensures each individual unit meets requirements.',
    },
    {
      id: 'qc-declaration-conformity',
      question: 'What document confirms that a switchgear assembly meets the essential requirements of the Low Voltage Directive?',
      options: [
        'Test certificate',
        'O&M manual',
        'Declaration of Conformity',
        'Functional specification',
      ],
      correctIndex: 2,
      explanation:
        'The Declaration of Conformity (DoC) is a legal document in which the manufacturer declares that the assembly meets all applicable EU directives, including the Low Voltage Directive (LVD) 2014/35/EU. It must reference BS EN 61439 and be signed by an authorised representative. This enables CE marking of the product.',
    },
  ];

  const quizQuestions = [
    {
      question: 'What percentage of circuits should typically be tested during point-to-point wiring verification?',
      options: ['25% sample', '50% sample', '75% sample', '100% of all circuits'],
      correctAnswer: '100% of all circuits',
    },
    {
      question: 'Which BS EN 61439 routine verification test checks for correct polarity and phase sequence?',
      options: [
        'Insulation resistance test',
        'Wiring verification including phase rotation',
        'Dielectric withstand test',
        'Temperature rise test',
      ],
      correctAnswer: 'Wiring verification including phase rotation',
    },
    {
      question: 'What is the minimum insulation resistance value required between live conductors and exposed conductive parts under BS EN 61439?',
      options: ['0.5 megohms', '1 megohm', '2 megohms', '5 megohms'],
      correctAnswer: '1 megohm',
    },
    {
      question: 'During functional sequence testing of a motor starter, what should be verified first?',
      options: [
        'Motor full-load current',
        'Correct operation of control circuit interlocks',
        'Power factor correction',
        'Harmonic distortion levels',
      ],
      correctAnswer: 'Correct operation of control circuit interlocks',
    },
    {
      question: 'What document must accompany the assembly as part of the technical file under BS EN 61439?',
      options: [
        'Marketing materials',
        'Single-line diagram and circuit diagrams',
        'Company annual report',
        'Staff training records',
      ],
      correctAnswer: 'Single-line diagram and circuit diagrams',
    },
    {
      question: 'When should Site Acceptance Testing (SAT) be performed?',
      options: [
        'Before the assembly leaves the factory',
        'During manufacture only',
        'After installation at the final location',
        'Only when requested by insurance',
      ],
      correctAnswer: 'After installation at the final location',
    },
    {
      question: 'What is the purpose of customer witness testing during FAT?',
      options: [
        'To reduce manufacturer liability',
        'To allow the customer to verify compliance before accepting delivery',
        'To train customer maintenance staff',
        'To satisfy warranty requirements only',
      ],
      correctAnswer: 'To allow the customer to verify compliance before accepting delivery',
    },
    {
      question: 'Which routine verification test confirms the protective circuit integrity in a switchgear assembly?',
      options: [
        'Insulation resistance test',
        'Protective circuit continuity test',
        'Dielectric strength test',
        'Functional operation test',
      ],
      correctAnswer: 'Protective circuit continuity test',
    },
    {
      question: 'What must be included in the Operation and Maintenance (O&M) manual for a switchgear assembly?',
      options: [
        'Only the warranty terms',
        'Maintenance schedules, operating instructions, and safety information',
        'Staff contact details only',
        'Project timeline',
      ],
      correctAnswer: 'Maintenance schedules, operating instructions, and safety information',
    },
    {
      question: 'Under BS EN 61439, what is the purpose of the technical file?',
      options: [
        'Marketing documentation for sales',
        'To demonstrate conformity with design verification requirements',
        'Employee training records',
        'Financial project records',
      ],
      correctAnswer: 'To demonstrate conformity with design verification requirements',
    },
  ];

  const faqItems = [
    {
      question: 'What is the difference between type testing and routine verification under BS EN 61439?',
      answer:
        'Type testing (or design verification) is performed on representative samples of an assembly design to prove it meets all standard requirements - this includes temperature rise, short-circuit withstand, and dielectric properties. These tests only need to be done once per design. Routine verification is performed on every manufactured assembly to confirm correct construction, including visual inspection, wiring checks, insulation resistance, and operational tests. Routine verification ensures each individual unit meets the proven design.',
    },
    {
      question: 'Who is responsible for issuing the Declaration of Conformity?',
      answer:
        'The Declaration of Conformity must be issued by the assembly manufacturer (the organisation that takes responsibility for the final assembled product). This may be the original manufacturer, a panel builder assembling from certified components, or a system integrator. The DoC must be signed by an authorised representative of the manufacturer. When using third-party components, the manufacturer must ensure all parts have appropriate certification and the assembled product has undergone routine verification.',
    },
    {
      question: 'Can FAT replace SAT testing?',
      answer:
        'No, FAT and SAT serve different purposes and both are typically required. FAT verifies the assembly at the factory before dispatch, allowing corrections in controlled conditions. SAT verifies the assembly after installation at site, checking that transportation hasn\'t caused damage, site connections are correct, and the system integrates properly with other site equipment. SAT also verifies environmental conditions (ventilation, cable routes) and tests under actual site supply conditions.',
    },
    {
      question: 'What documentation should be provided to the customer at project completion?',
      answer:
        'The complete documentation package should include: Declaration of Conformity with CE marking, all test certificates (FAT and SAT results), as-built drawings including single-line diagrams, schematic diagrams, and layout drawings, cable schedules and termination details, equipment datasheets and manuals for all components, Operation and Maintenance manual with maintenance schedules, spare parts recommendations, setting schedules for protection devices, and any marked-up changes from original design. This forms part of the O&M manual package.',
    },
    {
      question: 'How long must the technical file be retained?',
      answer:
        'Under EU regulations and UK equivalent (UKCA marking), the technical file must be retained for 10 years after the last unit of that design was manufactured. The file must be available for inspection by market surveillance authorities. It should include design calculations, verification records, test results, component certificates, and any design modifications. Many manufacturers retain files indefinitely as they may be needed for maintenance, modifications, or liability purposes throughout the equipment\'s service life.',
    },
    {
      question: 'What happens if a routine verification test fails?',
      answer:
        'If any routine verification test fails, the assembly cannot be released or CE/UKCA marked until the fault is corrected and the test is passed. The failure must be documented, investigated, and the root cause identified. Corrective actions must be implemented and verified. If the failure indicates a design issue rather than manufacturing defect, the design verification may need to be reviewed. A non-conformance report should be raised, and quality management procedures followed. The assembly must pass all routine verification tests before the Declaration of Conformity can be issued.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link to="/electrician/upskilling/industrial-electrical-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">Module 3 &gt; Section 5</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10">
            <ClipboardCheck className="w-8 h-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Functional Testing and Documentation</h1>
          <p className="text-muted-foreground">BS EN 61439 verification requirements, FAT/SAT procedures, test certificates, and technical documentation packages for industrial switchgear assemblies</p>
        </div>

        {/* Section Overview */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-foreground mb-2">Section Overview</h2>
              <p className="text-sm text-muted-foreground">
                This section covers the essential testing and documentation requirements for industrial switchgear assemblies. You will learn about Factory Acceptance Testing (FAT), Site Acceptance Testing (SAT), BS EN 61439 routine verification procedures, point-to-point wiring verification, functional sequence testing, and the technical documentation packages required for compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Factory Acceptance Testing (FAT) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Factory Acceptance Testing (FAT) Procedures
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Factory Acceptance Testing (FAT) is performed at the manufacturer's premises before the switchgear assembly is dispatched to site. It provides the opportunity to verify compliance with specifications and identify issues while corrections can still be made cost-effectively in controlled factory conditions.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">FAT Preparation Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Documentation Review</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Technical specification compliance matrix</li>
                    <li>- Single-line diagrams and schematics</li>
                    <li>- Component datasheets and certificates</li>
                    <li>- Test procedure document</li>
                    <li>- Inspection and Test Plan (ITP)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Physical Preparation</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Assembly fully constructed and wired</li>
                    <li>- All labels and markings applied</li>
                    <li>- Test equipment calibrated and certified</li>
                    <li>- Temporary supplies available</li>
                    <li>- Witness area prepared if required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Typical FAT Test Sequence</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <div>
                    <p className="font-medium text-foreground">Visual Inspection</p>
                    <p className="text-sm text-muted-foreground">Verify construction quality, component installation, labelling, and general workmanship against drawings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <div>
                    <p className="font-medium text-foreground">Mechanical Operation</p>
                    <p className="text-sm text-muted-foreground">Check door operation, interlocks, withdrawable units, and earthing provisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <div>
                    <p className="font-medium text-foreground">Electrical Tests</p>
                    <p className="text-sm text-muted-foreground">Insulation resistance, protective circuit continuity, dielectric withstand (if required)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <div>
                    <p className="font-medium text-foreground">Functional Testing</p>
                    <p className="text-sm text-muted-foreground">Control circuit operation, protection relay settings, metering accuracy, sequence testing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-background flex items-center justify-center flex-shrink-0 font-bold text-sm">5</span>
                  <div>
                    <p className="font-medium text-foreground">Documentation Review</p>
                    <p className="text-sm text-muted-foreground">Verify all certificates, test records, and O&M documentation complete and correct</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Users className="text-elec-yellow mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm">Customer Witness Testing</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Many contracts require customer witness of FAT. The customer or their representative attends to observe testing, review results, and formally accept the equipment. A witness point schedule should be agreed in advance, and the customer must be given adequate notice (typically 5-10 working days) before each witness hold point. The customer signs off each witnessed test on the ITP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Point-to-Point Wiring Verification */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Point-to-Point Wiring Verification
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Point-to-point (P2P) testing verifies that every wire connection in the assembly matches the schematic drawings. This is a critical quality check that must be performed on 100% of circuits, not by sampling. Modern methods combine manual verification with continuity testing.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">P2P Verification Methods</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Visual Trace Method</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Trace each wire from origin to destination</li>
                    <li>- Verify wire number/label matches drawing</li>
                    <li>- Check terminal identification</li>
                    <li>- Confirm correct cable size and colour</li>
                    <li>- Mark off on checked drawing</li>
                  </ul>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Continuity Testing</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Use low-resistance ohmmeter</li>
                    <li>- Test from terminal to terminal</li>
                    <li>- Verify expected continuity paths</li>
                    <li>- Check for unintended shorts</li>
                    <li>- Record all readings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Verification Requirements</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Every power circuit connection verified against single-line diagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">All control circuit wiring checked against schematic drawings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Phase rotation and polarity confirmed (L1, L2, L3 sequence)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Neutral and protective earth connections traced and verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">External interface terminals correctly identified and labelled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">Ferrule/sleeve identification matches drawing references</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-amber-400 mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-amber-400 font-medium text-sm">Common Wiring Errors to Check</h4>
                  <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
                    <li>- Transposed phases (L1/L2 or L2/L3 swapped)</li>
                    <li>- Wrong terminal connection on multi-terminal devices</li>
                    <li>- Crossed neutral and earth connections</li>
                    <li>- Incorrect CT polarity (S1/S2 reversed)</li>
                    <li>- Missing earth bonds between sections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 3: Functional Sequence Testing */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Functional Sequence Testing
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Functional sequence testing verifies that control circuits operate in the correct sequence and all interlocks function as designed. This goes beyond simple continuity testing to prove the system logic works correctly under simulated operating conditions.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Motor Starter Sequence Test Example</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Step 1: Pre-conditions</p>
                  <p className="text-muted-foreground">Verify isolator closed, control supply on, no fault conditions active, door closed (if interlocked)</p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Step 2: Start Command</p>
                  <p className="text-muted-foreground">Apply start signal - verify contactor energises, run indication activates, ammeter shows current flow (if motor connected)</p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Step 3: Stop Command</p>
                  <p className="text-muted-foreground">Apply stop signal - verify contactor de-energises, run indication clears, circuit ready for restart</p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Step 4: Overload Trip</p>
                  <p className="text-muted-foreground">Simulate overload (test button) - verify trip, fault indication active, restart blocked until reset</p>
                </div>
                <div className="border-l-2 border-elec-yellow/50 pl-4">
                  <p className="font-medium text-foreground">Step 5: Emergency Stop</p>
                  <p className="text-muted-foreground">Test E-stop function - verify immediate de-energisation, latched until manually reset</p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Interlock Testing Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Mechanical Interlocks</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Withdrawable unit racking mechanism</li>
                    <li>- Door/cover interlocks with isolators</li>
                    <li>- Key exchange systems</li>
                    <li>- Padlock provisions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Electrical Interlocks</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Bus section changeover schemes</li>
                    <li>- Auto/manual selection logic</li>
                    <li>- Sequence start/stop schemes</li>
                    <li>- Protection trip interlocking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="text-elec-yellow mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-elec-yellow font-medium text-sm">Simulation Methods</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    During FAT, external signals are typically simulated using temporary links, signal generators, or dedicated test panels. PLC inputs can be forced for testing (with appropriate safety measures). Document all temporary modifications and ensure complete removal before dispatch. Some tests may require actual motor connection or load banks for full verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 4: BS EN 61439 Routine Verification */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS EN 61439 Routine Verification
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              BS EN 61439 defines mandatory routine verification tests that must be performed on every manufactured assembly before it can be CE/UKCA marked. These tests confirm that the individual unit has been constructed correctly according to the verified design.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Mandatory Routine Verification Tests</h3>
              <div className="space-y-4">
                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">1. Degree of Protection (IP Rating)</h4>
                  <p className="text-sm text-muted-foreground">
                    Visual inspection to verify that the enclosure construction provides the declared IP rating. Check seals, gaskets, cable entries, ventilation openings, and access covers.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">2. Clearances and Creepage Distances</h4>
                  <p className="text-sm text-muted-foreground">
                    Verify adequate spacing between live parts and between live parts and earth. Compare with values established during design verification for the rated voltage and pollution degree.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">3. Protection Against Electric Shock</h4>
                  <p className="text-sm text-muted-foreground">
                    Check barriers, enclosures, and insulation providing protection against direct contact. Verify all exposed conductive parts are connected to protective circuit.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">4. Installation of Switching Devices and Components</h4>
                  <p className="text-sm text-muted-foreground">
                    Verify correct installation, ratings, settings, and condition of all devices. Check position indicators, rating labels, and operating mechanisms.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">5. Internal Electrical Circuits and Connections</h4>
                  <p className="text-sm text-muted-foreground">
                    Point-to-point verification of all wiring against drawings. Confirm conductor sizes, routing, and termination quality.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">6. Terminals for External Conductors</h4>
                  <p className="text-sm text-muted-foreground">
                    Check terminal suitability for declared conductor size range. Verify marking, accessibility, and tightening torque capability.
                  </p>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">7. Mechanical Operation</h4>
                  <p className="text-sm text-muted-foreground">
                    Test operation of all moving parts - doors, covers, drawout mechanisms, interlocks, padlock provisions, and indicating devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Electrical Routine Tests</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium text-sm">Insulation Resistance</h4>
                  <p className="text-2xl font-bold text-foreground">≥1 MΩ</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tested at 500V DC between each live circuit and exposed conductive parts
                  </p>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium text-sm">Protective Circuit Continuity</h4>
                  <p className="text-2xl font-bold text-foreground">Verified</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check all earth connections provide effective bonding to main earth terminal
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-green-400 font-medium text-sm">Dielectric Test (Optional)</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    A dielectric withstand test may be performed instead of design verification. Test voltage is 2Un + 1000V for circuits rated ≤690V (minimum 1500V). Applied for 1 second between live parts and earth, and between separate circuits. This test is typically only required for power frequency withstand verification on assemblies using non-type-tested arrangements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Technical File and Documentation Package */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Technical File and Documentation Package
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              The technical file is a legal requirement that demonstrates compliance with BS EN 61439 and enables the manufacturer to affix CE/UKCA marking. It must be retained for 10 years and made available to enforcement authorities on request.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Technical File Contents</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Design Documentation</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- General arrangement drawings</li>
                    <li>- Single-line diagrams</li>
                    <li>- Schematic/circuit diagrams</li>
                    <li>- Wiring diagrams and schedules</li>
                    <li>- Bill of materials</li>
                    <li>- Design calculations (thermal, short-circuit)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Verification Evidence</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Design verification records</li>
                    <li>- Type test reports (if applicable)</li>
                    <li>- Component certificates</li>
                    <li>- Routine verification test results</li>
                    <li>- Non-conformance records (if any)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">Declaration of Conformity Requirements</h3>
              <p className="text-sm mb-3 text-muted-foreground">
                The Declaration of Conformity (DoC) is the manufacturer's formal statement that the product meets all applicable requirements. It must contain:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Manufacturer name and address</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Product identification (type, serial number, description)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Reference to BS EN 61439 and applicable parts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Reference to applicable EU Directives (LVD 2014/35/EU, EMC 2014/30/EU)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Signature of authorised representative with date and place</span>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">O&M Manual Contents</h3>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2">Safety Information</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>- Hazard warnings</li>
                    <li>- Safe isolation procedures</li>
                    <li>- PPE requirements</li>
                    <li>- Emergency procedures</li>
                  </ul>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2">Operating Instructions</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>- Normal operation</li>
                    <li>- Switching procedures</li>
                    <li>- Indicator explanations</li>
                    <li>- Alarm response</li>
                  </ul>
                </div>
                <div className="bg-background/70 p-3 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2">Maintenance</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>- Inspection schedule</li>
                    <li>- Preventive maintenance</li>
                    <li>- Spare parts list</li>
                    <li>- Torque settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 6: Site Acceptance Testing (SAT) */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Site Acceptance Testing (SAT) Requirements
          </h2>

          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Site Acceptance Testing (SAT) is performed after installation at the final location to verify the assembly has not been damaged during transport, site connections are correct, and the system integrates properly with other site equipment and services.
            </p>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">SAT Test Categories</h3>
              <div className="space-y-4">
                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Pre-Energisation Checks</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Visual inspection for transport damage</li>
                    <li>- Verify all transit locks and packing removed</li>
                    <li>- Check cable entries and glands correctly installed</li>
                    <li>- Confirm earth connections to building earth system</li>
                    <li>- Insulation resistance test (may repeat FAT test)</li>
                    <li>- Check ventilation/cooling systems operational</li>
                  </ul>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Energisation Sequence</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Verify supply voltage and phase sequence</li>
                    <li>- Energise control circuits first (if separate supply)</li>
                    <li>- Close main incomer with load circuits isolated</li>
                    <li>- Check voltage on all busbars</li>
                    <li>- Progressively energise outgoing circuits</li>
                    <li>- Monitor for abnormal heating or noise</li>
                  </ul>
                </div>

                <div className="bg-background/70 p-4 rounded border border-white/5">
                  <h4 className="text-elec-yellow font-medium mb-2 text-sm">Functional Verification</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- Test all control circuits with actual field devices</li>
                    <li>- Verify communication links to BMS/SCADA</li>
                    <li>- Check metering accuracy against reference</li>
                    <li>- Test protection relay operation (secondary injection)</li>
                    <li>- Verify auto-changeover schemes (if fitted)</li>
                    <li>- Load test where specified in contract</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/10">
              <h3 className="font-medium text-foreground mb-3">SAT Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Test Records Required</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- Insulation resistance values</li>
                    <li>- Earth continuity measurements</li>
                    <li>- Phase rotation confirmation</li>
                    <li>- Voltage readings all circuits</li>
                    <li>- Protection relay test results</li>
                    <li>- Functional test sign-off</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-elec-yellow font-medium mb-2">Handover Documents</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>- SAT completion certificate</li>
                    <li>- As-installed drawings (marked up if changed)</li>
                    <li>- Updated setting schedules</li>
                    <li>- Training records (if provided)</li>
                    <li>- Warranty documentation</li>
                    <li>- Emergency contact information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-amber-400 mt-1 flex-shrink-0 w-4 h-4" />
                <div>
                  <h4 className="text-amber-400 font-medium text-sm">SAT Hold Points</h4>
                  <p className="text-sm mt-1 text-muted-foreground">
                    Define hold points in the commissioning plan where work stops until witness/approval is given. Typical SAT hold points include: completion of visual inspection, pre-energisation sign-off, first energisation, protection testing completion, and final acceptance. Proceeding past a hold point without proper authorization may void warranties or contractual obligations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-elec-yellow" />
            Quick Reference Card
          </h2>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">FAT vs SAT Comparison</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-elec-yellow">
                      <th className="text-left py-1">Aspect</th>
                      <th className="text-left py-1">FAT</th>
                      <th className="text-left py-1">SAT</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-white/10">
                      <td className="py-1">Location</td>
                      <td className="py-1">Factory</td>
                      <td className="py-1">Site</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Timing</td>
                      <td className="py-1">Before dispatch</td>
                      <td className="py-1">After installation</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-1">Connections</td>
                      <td className="py-1">Simulated</td>
                      <td className="py-1">Actual</td>
                    </tr>
                    <tr>
                      <td className="py-1">Purpose</td>
                      <td className="py-1">Design verification</td>
                      <td className="py-1">Installation check</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">BS EN 61439 Routine Tests</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">1.</span> Visual inspection of construction</li>
                  <li><span className="text-elec-yellow">2.</span> IP rating verification</li>
                  <li><span className="text-elec-yellow">3.</span> Clearances and creepage</li>
                  <li><span className="text-elec-yellow">4.</span> Wiring and connections</li>
                  <li><span className="text-elec-yellow">5.</span> Insulation resistance (≥1MΩ)</li>
                  <li><span className="text-elec-yellow">6.</span> Protective circuit continuity</li>
                  <li><span className="text-elec-yellow">7.</span> Mechanical operation</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Documentation Checklist</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-green-400">✓</span> Declaration of Conformity</li>
                  <li><span className="text-green-400">✓</span> Test certificates (FAT/SAT)</li>
                  <li><span className="text-green-400">✓</span> As-built drawings</li>
                  <li><span className="text-green-400">✓</span> O&M manual</li>
                  <li><span className="text-green-400">✓</span> Setting schedules</li>
                  <li><span className="text-green-400">✓</span> Component datasheets</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-foreground mb-3">Key Standards</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><span className="text-elec-yellow">BS EN 61439-1:</span> General rules</li>
                  <li><span className="text-elec-yellow">BS EN 61439-2:</span> Power switchgear</li>
                  <li><span className="text-elec-yellow">LVD 2014/35/EU:</span> Safety directive</li>
                  <li><span className="text-elec-yellow">EMC 2014/30/EU:</span> EMC directive</li>
                  <li><span className="text-elec-yellow font-medium">Retention:</span> 10 years minimum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Static bordered list */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Section Quiz</h2>
          <p className="text-sm text-muted-foreground">
            Test your knowledge of functional testing and documentation requirements. You need 70% to pass.
          </p>
          <Button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-elec-yellow text-background hover:bg-elec-yellow/90"
          >
            {showQuiz ? 'Hide Quiz' : 'Start Quiz'}
          </Button>
          {showQuiz && (
            <div className="mt-4">
              <Quiz questions={quizQuestions} />
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/5"
            asChild
          >
            <Link to="/study-centre/upskilling/industrial-electrical/module-3/section-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: Panel Cooling
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-background hover:bg-elec-yellow/90"
            asChild
          >
            <Link to="/study-centre/upskilling/industrial-electrical/module-4">
              Next: Module 4
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrialElectricalModule3Section5;
