import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, Zap, HardHat, Glasses, Hand, BookOpen, Target, Lightbulb, XCircle, ChevronDown, ChevronUp, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const InspectionTestingModule2Section2 = () => {
  useSEO({
    title: "Isolation Equipment and PPE | Safe Isolation | Inspection & Testing Course",
    description: "Master the selection and use of isolation equipment and personal protective equipment for safe electrical work. Learn about approved voltage indicators, proving units, and PPE requirements."
  });

  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const defined_learningOutcomes = [
    { id: 1, text: "Select and verify appropriate voltage indicating devices for isolation work", icon: Zap },
    { id: 2, text: "Understand proving unit functionality and correct usage procedures", icon: Target },
    { id: 3, text: "Identify and use appropriate PPE for electrical isolation tasks", icon: HardHat },
    { id: 4, text: "Interpret GS38 requirements for test probes and leads", icon: FileText },
    { id: 5, text: "Maintain and inspect test equipment to required standards", icon: CheckCircle2 },
    { id: 6, text: "Select appropriate lock-off devices for different isolation scenarios", icon: Shield }
  ];

  const defined_defined_defined_defined_defined_defined_defined_faqs = [
    {
      question: "What is the difference between a voltage indicator and a multimeter?",
      answer: "A voltage indicator (or voltage detector) is specifically designed for presence/absence testing with clear LED/LCD indication and is typically more robust for site use. A multimeter provides numerical readings but requires more interpretation. GS38 recommends voltage indicators for proving dead as they're designed specifically for this safety-critical task, have fewer failure modes, and provide unambiguous indication. Multimeters have more functions that can introduce user error (wrong range selection, etc.)."
    },
    {
      question: "How often should proving units be replaced?",
      answer: "Proving units don't have a fixed replacement schedule but should be replaced when: battery is depleted (disposable types), they fail self-test, physical damage is evident, or according to manufacturer's recommendations. Rechargeable proving units should be maintained per manufacturer's instructions. Always verify the proving unit works correctly before and after each use, and never use a proving unit that shows any signs of damage or malfunction."
    },
    {
      question: "Why must test leads comply with GS38?",
      answer: "GS38-compliant test leads have specific safety features: fused leads (typically 500mA), shrouded probes with maximum 4mm exposed tip (2mm preferred for socket testing), finger guards, insulated throughout, and appropriate CAT rating. These features protect against arc flash if accidentally probing live conductors, prevent finger contact with live parts, and reduce the risk of short circuits. Non-compliant leads have caused serious injuries and fatalities."
    },
    {
      question: "What PPE is required for safe isolation procedures?",
      answer: "Minimum PPE for safe isolation typically includes: insulated gloves (tested to appropriate voltage class), safety glasses or face shield, non-conductive footwear, and flame-resistant clothing in some applications. The specific PPE depends on the voltage level, arc flash risk assessment, and company procedures. Some work may require arc flash suits with higher cal/cm² ratings. Always follow your employer's PPE policy and risk assessment."
    },
    {
      question: "Can I use any lock-off device for MCBs?",
      answer: "No - lock-off devices must be appropriate for the specific type of device being isolated. MCB lockouts differ from those for moulded case circuit breakers (MCCBs), isolators, and fuse carriers. Using incorrect lockout devices may allow the device to be operated despite the lock. Purpose-designed MCB lockouts grip the toggle securely and prevent operation. Always verify the lockout device completely prevents operation before leaving the work area."
    },
    {
      question: "How do I know if my voltage indicator needs calibration?",
      answer: "Most modern voltage indicators are self-checking and don't require regular calibration in the traditional sense. However, they should be: function-tested with a proving unit before and after use, visually inspected for damage, checked that batteries are adequate, and sent for manufacturer verification if there's any doubt about accuracy. Follow manufacturer's recommendations for service intervals. Some organisations require annual verification by a competent tester."
    },
    {
      question: "What is the CAT rating system for test equipment?",
      answer: "CAT (Category) ratings indicate where equipment can safely be used in the electrical system: CAT IV - Origin of installation (utility connection), CAT III - Distribution level (main panels, submains), CAT II - Local level (socket outlets, appliances), CAT I - Protected electronics. Higher CAT ratings mean equipment can withstand higher transient overvoltages. Using equipment below the required CAT rating risks equipment failure and user injury during voltage transients."
    },
    {
      question: "Why is two-pole testing preferred over single-pole?",
      answer: "Two-pole voltage indicators test between two points simultaneously, confirming both the voltage presence and the instrument's operation in one test. Single-pole/non-contact detectors can give false negatives due to: incorrect earth reference, induced voltages, capacitive effects, or instrument failure. GS38 recommends two-pole testing for proving dead. Non-contact detectors can supplement but should never replace two-pole testing for confirming dead."
    }
  ];

  const defined_defined_defined_defined_defined_quizQuestions = [
    {
      question: "According to GS38, what is the maximum recommended exposed probe tip length for general use?",
      options: ["2mm", "4mm", "6mm", "10mm"],
      correctAnswer: 1,
      explanation: "GS38 recommends a maximum of 4mm exposed probe tip for general use, with 2mm preferred for probing socket outlets. This limits penetration depth and reduces the risk of short circuits or contact with adjacent live conductors."
    },
    {
      question: "What is the primary purpose of a proving unit?",
      options: ["To provide a power source for the voltage indicator", "To verify the voltage indicator is working correctly before and after testing", "To increase the range of the voltage indicator", "To provide earth reference for single-pole detectors"],
      correctAnswer: 1,
      explanation: "A proving unit generates a known voltage to verify that the voltage indicator is functioning correctly. This must be done immediately before AND after testing to confirm the instrument was working throughout the proving dead procedure."
    },
    {
      question: "Which CAT rating is required for testing at a distribution board fed from the main supply?",
      options: ["CAT I", "CAT II", "CAT III", "CAT IV"],
      correctAnswer: 2,
      explanation: "CAT III is required for distribution-level testing including distribution boards, submains, and fixed wiring. CAT IV is for the origin (utility connection), CAT II for local level (socket outlets), and CAT I for protected electronics only."
    },
    {
      question: "What is the minimum fuse rating typically required in GS38-compliant test leads?",
      options: ["100mA", "500mA", "1A", "3A"],
      correctAnswer: 1,
      explanation: "GS38 recommends fused test leads with a rating of 500mA or less to limit energy in the event of accidental short circuit or arc. This fuse blows quickly if the probes accidentally bridge live conductors, protecting against arc flash."
    },
    {
      question: "Why should non-contact voltage detectors NOT be used as the sole method for proving dead?",
      options: ["They are too expensive", "They can give false negatives due to shielded cables or low voltage", "They are not accurate enough", "They require special training"],
      correctAnswer: 1,
      explanation: "Non-contact detectors can give false negatives due to: shielded/armoured cables, low voltage levels, poor earth reference, or instrument failure. They detect electric fields, not actual voltage, so metallic enclosures can block detection. Two-pole testing is required for proving dead."
    },
    {
      question: "What does IP2X rating mean for a voltage indicator?",
      options: ["It can withstand 2 bar water pressure", "It is protected against finger contact with live parts", "It has 2-year warranty", "It operates on 2 batteries"],
      correctAnswer: 1,
      explanation: "IP2X indicates protection against solid objects larger than 12.5mm (finger-safe). For voltage indicators, this means the enclosure and probe design prevent finger contact with live parts during use. The X indicates no specific water protection rating is claimed."
    },
    {
      question: "How should insulating gloves be tested before use?",
      options: ["By visual inspection only", "By electrical testing with a megger", "By air inflation and visual inspection for holes/damage", "By immersion in water"],
      correctAnswer: 2,
      explanation: "Before each use, insulating gloves should be air-tested by rolling from the cuff to trap air, then inspecting for air leaks, holes, tears, or signs of deterioration. Visual inspection should check for cuts, cracks, UV damage, chemical contamination, or swelling. Electrical testing is done periodically at approved test facilities."
    },
    {
      question: "What colour coding indicates Class 00 insulating gloves rated for maximum 500V AC?",
      options: ["Red", "Black", "Yellow", "Beige/Natural"],
      correctAnswer: 3,
      explanation: "Insulating gloves use colour coding: Beige/Natural = Class 00 (500V AC max), Red = Class 0 (1000V AC max), White = Class 1 (7500V AC max), Yellow = Class 2 (17000V AC max). Most LV work uses Class 0 (red) or Class 00 (beige) gloves. Always check the voltage rating label."
    },
    {
      question: "When selecting an MCB lock-off device, what must you verify?",
      options: ["It matches the colour of the distribution board", "It completely prevents the MCB from being switched ON", "It has a key rather than a combination", "It is made of metal for durability"],
      correctAnswer: 1,
      explanation: "The lock-off device must completely prevent the MCB from being operated (switched ON) when applied. Different MCB types (DIN rail, BS types, different manufacturers) need specific lockout devices. Always verify the lock physically prevents operation - test it after applying."
    },
    {
      question: "According to best practice, when should a voltage indicator be proved with a proving unit?",
      options: ["Only before testing", "Only after testing", "Before AND after testing", "Once per day at the start of work"],
      correctAnswer: 2,
      explanation: "The proving sequence is: Prove the indicator works (proving unit), test the circuit (indicator), prove the indicator still works (proving unit). This confirms the instrument was working throughout the test. Testing only before doesn't prove it worked during the critical proving dead test."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2')}
            className="flex items-center text-elec-yellow touch-target"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="text-sm font-medium">Module 2</span>
          </button>
          <span className="text-xs text-white/50 font-medium">Section 2 of 6</span>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <section className="px-4 pt-6 pb-8">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 mb-3">
            Module 2 • Safe Isolation
          </Badge>
          <h1 className="text-ios-title-large font-bold text-white mb-3">
            Isolation Equipment and PPE
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Master the selection, inspection, and use of approved test equipment and personal protective equipment for safe electrical isolation work.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <section className="px-4 mb-8">
          <Card variant="ios-elevated" className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-elec-yellow" />
                In 30 Seconds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Voltage indicators</strong> must be two-pole, GS38-compliant, and proved before AND after testing
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>Test leads</strong> require 500mA fuses, shrouded probes (4mm max tip), and correct CAT rating
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                • <strong>PPE selection</strong> based on voltage level and arc flash risk - minimum: insulated gloves, safety glasses
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Learning Outcomes */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 gap-3">
            {defined_learningOutcomes.map((outcome) => (
              <Card key={outcome.id} variant="ios" className="bg-white/5 border-white/10">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <outcome.icon className="w-4 h-4 text-elec-yellow" />
                  </div>
                  <span className="text-white/90 text-sm leading-relaxed">{outcome.text}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 01: Voltage Indicating Devices */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">Voltage Indicating Devices</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Voltage indicating devices (VIDs) are the primary instruments used to confirm the presence or absence of hazardous voltages. For safe isolation work, <strong>two-pole testers</strong> are essential because they simultaneously verify instrument operation while testing.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Two-Pole Voltage Indicator Features</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Clear indication:</strong> LED and/or LCD display with voltage range shown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Self-test function:</strong> Automatic or push-button self-check on power-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Phase rotation:</strong> Many indicate L1-L2-L3 sequence for 3-phase systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Continuity test:</strong> Some models include audible continuity for CPC verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Voltage ranges:</strong> Typically 12V to 690V AC/DC for LV applications</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">GS38 Requirement</h4>
                    <p className="text-white/80 text-sm">
                      Always use a <strong>proving unit</strong> to verify your voltage indicator works correctly BEFORE and AFTER testing. A voltage indicator that shows "dead" could have a flat battery, damaged leads, or internal fault.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Types NOT Suitable for Proving Dead</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Non-contact detectors:</strong> Can miss shielded cables, low voltages, or through enclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Neon screwdrivers:</strong> Unreliable, no proving capability, not GS38 compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Test lamps:</strong> Risk of bulb failure, no fused leads, can mask low voltage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Single-pole indicators:</strong> Require earth reference, can give false readings</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 02: Proving Units */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Proving Units</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                A <strong>proving unit</strong> generates a known voltage output (typically 50V, 100V, and 230V AC or DC) that allows you to verify your voltage indicator is functioning correctly. This verification must be performed immediately before AND after testing a circuit.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">The Proving Sequence</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold">1</span>
                    </div>
                    <span className="text-white/80 text-sm"><strong>PROVE</strong> - Test voltage indicator on proving unit (confirms it works)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold">2</span>
                    </div>
                    <span className="text-white/80 text-sm"><strong>TEST</strong> - Test the isolated circuit (should show dead)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-bold">3</span>
                    </div>
                    <span className="text-white/80 text-sm"><strong>PROVE</strong> - Test voltage indicator on proving unit again (confirms it still works)</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Why Both Proves?</h4>
                    <p className="text-white/80 text-sm">
                      The second prove confirms the instrument was working correctly during the circuit test. If your indicator fails the second prove, you cannot trust the "dead" reading - a fault may have developed during testing. Repeat the entire sequence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Proving Unit Types</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Battery Powered (Disposable)</h5>
                    <p className="text-white/70 text-sm">Self-contained units with limited life. Replace when output weakens or self-test fails. Compact and convenient for site use.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Rechargeable Units</h5>
                    <p className="text-white/70 text-sm">Longer term solution with USB or mains charging. Requires regular charging regime. More economical over time.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Built-In Self Test</h5>
                    <p className="text-white/70 text-sm">Some voltage indicators have integrated proving. Useful backup but separate proving unit still recommended.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 1 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="Why must the proving sequence include testing the voltage indicator AFTER testing the circuit?"
            correctAnswer="To confirm the voltage indicator was functioning correctly throughout the testing process - if it fails the second prove, the dead reading cannot be trusted"
            explanation="The second prove is crucial because an instrument fault could have developed during testing. Without this confirmation, a 'dead' reading might be due to instrument failure rather than the circuit actually being isolated."
          />
        </section>

        {/* Section 03: GS38 Test Lead Requirements */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">GS38 Test Lead Requirements</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                HSE Guidance Note GS38 specifies essential safety requirements for electrical test equipment. Non-compliant test leads have contributed to serious injuries and fatalities. All test probes and leads must meet these criteria:
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">GS38 Probe Requirements</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Shrouded probes:</strong> Probes must have insulated barriers preventing finger contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Exposed tip:</strong> Maximum 4mm for general use, 2mm recommended for socket testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Finger guards:</strong> Physical barrier preventing fingers sliding onto probe tip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Fused leads:</strong> Maximum 500mA fuse rating to limit arc energy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>CAT rated:</strong> Appropriate category for the installation type being tested</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">CAT Rating Categories</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-red-500/10 rounded-lg p-3">
                    <div className="w-12 h-6 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">IV</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Origin of Installation</p>
                      <p className="text-white/60 text-xs">Utility connection, main incoming, service heads</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-orange-500/10 rounded-lg p-3">
                    <div className="w-12 h-6 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">III</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Distribution Level</p>
                      <p className="text-white/60 text-xs">Main panels, submains, distribution boards, fixed wiring</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 rounded-lg p-3">
                    <div className="w-12 h-6 bg-yellow-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xs font-bold">II</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Local Level</p>
                      <p className="text-white/60 text-xs">Socket outlets, portable equipment, appliances</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-green-500/10 rounded-lg p-3">
                    <div className="w-12 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">I</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Protected Level</p>
                      <p className="text-white/60 text-xs">Signal level electronics, protected circuits only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">CAT Rating Safety</h4>
                    <p className="text-white/80 text-sm">
                      Using equipment rated below the required CAT level can result in equipment failure during transient overvoltages, potentially causing arc flash injury. <strong>Always use CAT III or CAT IV for distribution board work.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 04: Personal Protective Equipment */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Personal Protective Equipment</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                PPE for electrical work provides a last line of defence against arc flash, electric shock, and other hazards. The specific PPE required depends on the voltage level, prospective fault current, and arc flash risk assessment for the task.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Hand className="w-5 h-5 text-elec-yellow" />
                  Insulating Gloves
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  Rubber insulating gloves are classified by maximum working voltage. For LV work (up to 1000V AC), Class 0 or Class 00 gloves are typically used.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#e8d4b8]/20 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-[#e8d4b8] mx-auto mb-1"></div>
                    <p className="text-white/90 text-xs font-medium">Class 00</p>
                    <p className="text-white/60 text-xs">500V AC max</p>
                  </div>
                  <div className="bg-red-500/20 rounded-lg p-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-red-500 mx-auto mb-1"></div>
                    <p className="text-white/90 text-xs font-medium">Class 0</p>
                    <p className="text-white/60 text-xs">1000V AC max</p>
                  </div>
                </div>
                <div className="mt-3 bg-white/5 rounded-lg p-3">
                  <h5 className="text-white/90 font-medium text-sm mb-2">Before Each Use:</h5>
                  <ul className="space-y-1 text-white/70 text-xs">
                    <li>• Air test - roll from cuff to trap air, check for leaks</li>
                    <li>• Visual inspection - cuts, cracks, UV damage, contamination</li>
                    <li>• Check test date - must be within test validity period</li>
                    <li>• Verify voltage rating is appropriate for task</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Glasses className="w-5 h-5 text-elec-yellow" />
                  Eye and Face Protection
                </h4>
                <div className="space-y-2 text-white/80 text-sm">
                  <p><strong>Safety glasses:</strong> Minimum requirement - protect against debris and minor arc</p>
                  <p><strong>Safety goggles:</strong> Better seal, protect against molten metal splash</p>
                  <p><strong>Face shield:</strong> Required for higher arc flash risk, protects full face</p>
                  <p><strong>Arc-rated balaclava:</strong> For highest risk work, protects neck and ears</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-elec-yellow" />
                  Other Essential PPE
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <span className="text-elec-yellow">👟</span>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Non-Conductive Footwear</p>
                      <p className="text-white/60 text-xs">Insulated soles rated for electrical work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <span className="text-elec-yellow">👔</span>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Flame-Resistant Clothing</p>
                      <p className="text-white/60 text-xs">FR coveralls or shirt/trousers for arc flash protection</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <span className="text-elec-yellow">⛑️</span>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Safety Helmet</p>
                      <p className="text-white/60 text-xs">Class E rated for electrical work when head protection needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 2 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="What is the maximum recommended exposed probe tip length according to GS38 for general electrical testing?"
            correctAnswer="4mm maximum (2mm preferred for socket outlet testing)"
            explanation="GS38 specifies 4mm maximum exposed tip to limit penetration depth into terminals, reducing the risk of short circuits or contact with adjacent conductors. 2mm is preferred for socket testing due to the close spacing of contacts."
          />
        </section>

        {/* Section 05: Lock-Off Devices */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Lock-Off Devices</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Lock-off devices physically prevent isolated equipment from being re-energised. Different types of equipment require specific lockout devices to ensure they cannot be operated when applied.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Types of Lock-Off Devices</h4>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">MCB Lockouts</h5>
                    <p className="text-white/70 text-sm">Clip onto miniature circuit breakers to prevent toggle operation. Must match MCB type (DIN rail, BS 3871, etc.). Multiple designs for different manufacturers.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">MCCB/ACB Lockouts</h5>
                    <p className="text-white/70 text-sm">Larger devices for moulded case and air circuit breakers. Often fit around the operating handle or into dedicated lockout holes on the breaker.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Isolator Lockouts</h5>
                    <p className="text-white/70 text-sm">For rotary isolators and switch-disconnectors. Trap the handle in the OFF position. Ensure correct type for the isolator model.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Fuse Carrier Blanks</h5>
                    <p className="text-white/70 text-sm">Replace removed fuse carriers in fuse boards. Prevent incorrect fuse reinsertion. Should be clearly marked as ISOLATION BLANK.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <h5 className="text-elec-yellow font-medium mb-1">Plug Lockouts</h5>
                    <p className="text-white/70 text-sm">Enclose plug ends preventing reinsertion into sockets. Useful for portable equipment isolation.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Lock-Off Requirements</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Physical prevention:</strong> Must completely prevent operation when applied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Unique padlock:</strong> Each worker applies their personal padlock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Multi-hasp:</strong> Allows multiple padlocks when multiple people working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Verification:</strong> Always test the lockout prevents operation after applying</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Always Verify</h4>
                    <p className="text-white/80 text-sm">
                      After applying any lock-off device, attempt to operate the switch/breaker to confirm it is truly locked off. Some lockout devices can appear to be fitted but not actually prevent operation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 06: Equipment Inspection and Maintenance */}
        <section className="px-4 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Equipment Inspection and Maintenance</h2>
          </div>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="text-white/90 leading-relaxed">
                Regular inspection and maintenance of test equipment and PPE is essential for safety. Faulty equipment has contributed to many electrical accidents. Establish a routine for checking your equipment.
              </p>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Before Each Use (Daily Check)</h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Visual inspection of test leads for damage, cuts, exposed conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Check probe tips are secure and not damaged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Verify fuses are present in fused leads (visual indicator)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Battery check on voltage indicators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Air test insulating gloves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proving unit function test</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Periodic Maintenance</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-xs font-bold">6M</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Insulating Gloves</p>
                      <p className="text-white/60 text-xs">Dielectric test every 6 months at approved facility</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-xs font-bold">12M</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Voltage Indicators</p>
                      <p className="text-white/60 text-xs">Manufacturer verification/calibration annually (where recommended)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                    <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow text-xs font-bold">RPL</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Test Leads</p>
                      <p className="text-white/60 text-xs">Replace when damaged or showing wear - no repair</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-400 font-semibold mb-1">Remove from Service</h4>
                    <p className="text-white/80 text-sm">
                      Any equipment showing damage, failing tests, or of uncertain history must be removed from service immediately. Do not attempt repairs on safety-critical equipment - replace leads, return instruments to manufacturer.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Inline Check 3 */}
        <section className="px-4 mb-8">
          <InlineCheck
            question="Why should insulating gloves be air-tested before each use?"
            correctAnswer="To check for holes, punctures or tears that would allow current to pass through - roll from cuff to trap air and feel/look for escaping air"
            explanation="The air test is a quick field check that reveals holes too small to see visually. Any air leak indicates the glove is damaged and must not be used, as it could allow electric shock."
          />
        </section>

        {/* Practical Guidance */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Practical Guidance</h2>

          <Card variant="ios" className="bg-white/5 border-white/10 mb-4">
            <CardContent className="p-5 space-y-4">
              <div className="bg-green-500/10 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Top Tips
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Keep a complete isolation kit together - indicator, proving unit, lock-off devices, padlock, warning labels</li>
                  <li>• Write your name on your padlock and keep the only key</li>
                  <li>• Store insulating gloves in their bag away from UV light and sharp objects</li>
                  <li>• Replace test leads as a set - mixing old and new leads can cause issues</li>
                  <li>• Record proving unit battery replacement dates</li>
                </ul>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4">
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Common Mistakes
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• Using non-contact detectors alone to prove dead - always use two-pole tester</li>
                  <li>• Skipping the second prove after testing the circuit</li>
                  <li>• Using damaged or uncalibrated equipment "just this once"</li>
                  <li>• Borrowing someone else's padlock - defeats the purpose of LOTO</li>
                  <li>• Using lockout devices that don't properly fit the equipment</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 rounded-xl p-4">
                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Key Regulations
                </h4>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li>• <strong>GS38:</strong> Electrical test equipment for use on low voltage systems</li>
                  <li>• <strong>HSG85:</strong> Electricity at Work - Safe working practices</li>
                  <li>• <strong>EAW Reg 4(4):</strong> Equipment must be suitable for intended use</li>
                  <li>• <strong>BS EN 61243-3:</strong> Voltage detectors specification</li>
                  <li>• <strong>BS EN 60903:</strong> Specification for insulating gloves</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section className="px-4 mb-8">
          <h2 className="text-ios-headline font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {defined_defined_defined_defined_defined_defined_defined_faqs.map((faq, index) => (
              <Card key={index} variant="ios" className="bg-white/5 border-white/10">
                <button
                  className="w-full p-4 text-left flex items-center justify-between touch-target"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white/90 font-medium text-sm pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="px-4 mb-8">
          <UnitsPocketCard
            title="Isolation Equipment Quick Reference"
            items={[
              { term: "Voltage Indicator", definition: "Two-pole, GS38 compliant, proved before AND after testing" },
              { term: "Proving Unit", definition: "50V/100V/230V output to verify indicator function" },
              { term: "Test Lead Fuse", definition: "500mA max to limit arc flash energy" },
              { term: "Probe Tip Length", definition: "4mm max general, 2mm for sockets" },
              { term: "CAT III", definition: "Required rating for distribution board work" },
              { term: "Class 0 Gloves", definition: "1000V AC maximum, red colour, 6-month test" },
              { term: "Lock-Off Device", definition: "Must physically prevent operation, unique padlock per person" }
            ]}
          />
        </section>

        {/* Quiz */}
        <section className="px-4 mb-8">
          <Quiz
            title="Test Your Knowledge"
            questions={defined_defined_defined_defined_defined_quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="px-4 pb-safe">
          <div className="flex gap-3">
            <Button
              variant="ios-secondary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section1')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="ios-primary"
              className="flex-1 h-12"
              onClick={() => navigate('/study-centre/apprentice/upskilling/inspection-testing/module2/section3')}
            >
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule2Section2;
