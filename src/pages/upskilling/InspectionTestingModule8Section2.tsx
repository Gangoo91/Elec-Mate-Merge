import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Target, CheckCircle2, AlertTriangle, ChevronDown, Zap, Tag, Hash, CircuitBoard, MapPin, FileText, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule8Section2 = () => {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useSEO({
    title: "Identification & Labelling | Module 8 Section 2 | Inspection & Testing",
    description: "Learn the requirements for correct circuit identification, conductor marking, warning labels, and documentation for electrical installations."
  });

  const learningOutcomes = [
    { icon: Tag, text: "Understand circuit identification requirements" },
    { icon: Hash, text: "Apply correct conductor colour coding" },
    { icon: CircuitBoard, text: "Label protective devices appropriately" },
    { icon: MapPin, text: "Identify isolation point labelling needs" },
    { icon: FileText, text: "Create clear circuit charts and schedules" },
    { icon: Palette, text: "Apply warning and safety labels correctly" }
  ];

  const quizQuestions = [
    {
      question: "What does Regulation 514.9.1 require regarding circuit identification?",
      options: [
        "Circuits may be identified verbally",
        "Every circuit should be identified at its origin",
        "Only main circuits need identification",
        "Identification is optional for domestic installations"
      ],
      correctAnswer: 1,
      explanation: "Regulation 514.9.1 requires every circuit to be identified at its origin by a suitable arrangement. This enables safe isolation and maintenance."
    },
    {
      question: "Which conductor colour identifies neutral in a single-phase installation?",
      options: [
        "Brown",
        "Black",
        "Blue",
        "Grey"
      ],
      correctAnswer: 2,
      explanation: "Under harmonised colours, blue identifies the neutral conductor. Brown is line, and green/yellow stripes identify the protective conductor."
    },
    {
      question: "In a three-phase installation, what colour identifies L2?",
      options: [
        "Brown",
        "Black",
        "Grey",
        "Blue"
      ],
      correctAnswer: 1,
      explanation: "Three-phase harmonised colours are: L1 = Brown, L2 = Black, L3 = Grey. Blue is neutral, green/yellow is protective conductor."
    },
    {
      question: "When must warning labels be provided at the origin of an installation?",
      options: [
        "Only for commercial installations",
        "For all installations - specifying type of earthing, nominal voltage, and for RCD test frequency",
        "Only when specifically requested",
        "Only for three-phase installations"
      ],
      correctAnswer: 1,
      explanation: "Regulations require labels at the origin showing earthing arrangement, nominal voltage/frequency, and RCD test button instructions. Additional labels required for specific situations."
    },
    {
      question: "What information should a circuit chart at the consumer unit include?",
      options: [
        "Just circuit numbers",
        "Circuit number, description, protective device type and rating",
        "Only the installation address",
        "Manufacturer warranty information"
      ],
      correctAnswer: 1,
      explanation: "Circuit charts should show circuit number, description of what it supplies, protective device type (MCB/RCBO/fuse), rating, and any associated RCD protection."
    },
    {
      question: "Where mixed cable colours exist (old and new), what labelling is required?",
      options: [
        "No labelling required",
        "A caution notice warning that old cable colours are present",
        "The old cables must be rewired",
        "Just note in paperwork"
      ],
      correctAnswer: 1,
      explanation: "Regulation 514.14.1 requires a warning notice where different cable colour systems are used in the same installation, alerting workers to the mixed colours."
    },
    {
      question: "What colour must a label warning of voltage be?",
      options: [
        "Any colour",
        "Blue text on white",
        "Black text on yellow background",
        "White text on red"
      ],
      correctAnswer: 2,
      explanation: "Safety labels warning of electrical danger should use black text/symbols on a yellow background, following safety sign standards (BS EN ISO 7010)."
    },
    {
      question: "Labels should be designed to last:",
      options: [
        "At least 1 year",
        "Until the next inspection",
        "For the expected life of the installation",
        "6 months minimum"
      ],
      correctAnswer: 2,
      explanation: "Regulation 514.1.1 requires labels to be durable and legible for the expected life of the installation. Handwritten labels that fade are not acceptable."
    },
    {
      question: "What label is required where an RCD is installed?",
      options: [
        "No label required",
        "A notice recommending quarterly test button operation",
        "A label showing RCD price",
        "Only manufacturer's label"
      ],
      correctAnswer: 1,
      explanation: "Regulation 514.12.2 requires a notice at or near the origin advising users to test RCDs quarterly (every 3 months) using the test button."
    },
    {
      question: "If equipment has more than one supply, what labelling is required?",
      options: [
        "Normal circuit labels only",
        "Warning labels indicating all supply sources at each point of isolation",
        "No special labelling needed",
        "Just a note in the log book"
      ],
      correctAnswer: 1,
      explanation: "Regulation 514.15.1 requires warning labels at points of isolation where equipment may be fed from more than one source. This prevents unsafe isolation attempts."
    }
  ];

  const faqData = [
    {
      question: "Can I use handwritten labels?",
      answer: "Handwritten labels are generally not acceptable as they fade and become illegible over time. Labels should be durable, legible, and designed to last the expected life of the installation. Printed labels, engraved labels, or proper label makers should be used."
    },
    {
      question: "What if old colour cables are present?",
      answer: "Where old and new cable colours are used in the same installation, a warning notice must be provided at the origin (Regulation 514.14.1). The notice should warn that different cable colour coding systems exist and care must be taken during work."
    },
    {
      question: "Do I need to label every circuit?",
      answer: "Yes. Regulation 514.9.1 requires every circuit to be identified at its origin. A circuit chart should clearly describe what each circuit supplies, not just 'Circuit 1', 'Circuit 2' etc."
    },
    {
      question: "What labels are required at an earth electrode?",
      answer: "The main earth terminal should be labelled, and earth electrode connections should be marked with a label warning 'Safety Electrical Connection - Do Not Remove' to prevent inadvertent disconnection during other work."
    },
    {
      question: "Are warning labels required for PV installations?",
      answer: "Yes. PV installations require specific warning labels including warnings that parts remain live when isolated from the mains, DC isolation point markings, and warning labels on both DC and AC sides of the inverter."
    },
    {
      question: "What if a circuit description changes?",
      answer: "Labels must be updated to reflect current use. An outdated label could lead to incorrect isolation. If circuit usage changes significantly, the circuit chart should be updated and re-signed by a competent person."
    }
  ];

  const pocketCardUnits = [
    { name: "Line (1ph)", symbol: "Brown", unit: "L" },
    { name: "Neutral", symbol: "Blue", unit: "N" },
    { name: "CPC", symbol: "Green/Yellow", unit: "⏚" },
    { name: "L1 (3ph)", symbol: "Brown", unit: "" },
    { name: "L2 (3ph)", symbol: "Black", unit: "" },
    { name: "L3 (3ph)", symbol: "Grey", unit: "" }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
            className="flex items-center gap-2 text-sky-400 active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 8</span>
          </button>
          <span className="text-white/60 text-sm">2 of 5</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe max-w-3xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 rounded-full mb-4">
            <span className="text-sky-400 text-sm font-medium">Module 8 • Visual Inspection & Documentation</span>
          </div>
          <h1 className="text-ios-title-large text-white font-bold mb-3">
            Identification & Labelling
          </h1>
          <p className="text-white/70 text-ios-body leading-relaxed">
            Ensure proper identification of circuits, conductors, and equipment with clear, durable labelling that enables safe isolation and maintenance.
          </p>
        </section>

        {/* In 30 Seconds Card */}
        <Card variant="ios-elevated" className="mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-sky-400" />
              <h2 className="text-white font-semibold text-lg">In 30 Seconds</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Every circuit must be identified at its origin (Reg 514.9.1)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Labels must be durable for the life of the installation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                <span className="text-white/80 text-base">Warning labels required for RCDs, mixed colours, multiple supplies</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-400" />
            Learning Outcomes
          </h2>
          <div className="grid gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} variant="ios" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center shrink-0">
                    <outcome.icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-white/90 text-base">{outcome.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">01</span>
            <h2 className="text-xl font-semibold text-white">Circuit Identification Requirements</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Regulation 514.9.1 requires every circuit to be arranged so it can be identified. Clear identification enables safe isolation and helps with maintenance and fault finding.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-2">Circuit Chart Requirements</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Unique circuit number or reference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Clear description (e.g., "Kitchen Sockets" not just "Circuit 3")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Protective device type and rating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Associated RCD protection if applicable</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">02</span>
            <h2 className="text-xl font-semibold text-white">Conductor Colour Identification</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                BS 7671 Table 51 specifies harmonised cable colours. These must be verified during inspection:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Single-Phase</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-700 border border-white/20" />
                      <span className="text-white/70">Brown - Line (L)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-600 border border-white/20" />
                      <span className="text-white/70">Blue - Neutral (N)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 border border-white/20" />
                      <span className="text-white/70">Green/Yellow - CPC (⏚)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Three-Phase</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-amber-700 border border-white/20" />
                      <span className="text-white/70">Brown - L1</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-900 border border-white/20" />
                      <span className="text-white/70">Black - L2</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-500 border border-white/20" />
                      <span className="text-white/70">Grey - L3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="An installation has red, yellow, and blue cables for three-phase circuits. Is this acceptable?"
            answer="These are old UK colours (pre-2004). If new and old systems are mixed, a warning label is required. If the whole installation uses old colours consistently, it's acceptable but should be noted. Any additions must use harmonised colours."
            color="sky"
          />
        </div>

        {/* Content Section 03 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">03</span>
            <h2 className="text-xl font-semibold text-white">Required Warning Labels</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                BS 7671 requires specific warning labels in various situations:
              </p>
              <div className="space-y-3">
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <h4 className="text-amber-400 font-semibold mb-2">At Origin (Reg 514.12.1)</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Type of earthing arrangement</li>
                    <li>• Nominal voltage and frequency</li>
                    <li>• RCD test button notice (quarterly testing)</li>
                  </ul>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <h4 className="text-amber-400 font-semibold mb-2">Mixed Colours (Reg 514.14.1)</h4>
                  <p className="text-white/70 text-sm">"CAUTION - This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration, or repair."</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                  <h4 className="text-amber-400 font-semibold mb-2">Multiple Supplies (Reg 514.15.1)</h4>
                  <p className="text-white/70 text-sm">"WARNING - This installation has more than one source of supply. Isolate all supplies before working."</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">04</span>
            <h2 className="text-xl font-semibold text-white">Earth Connection Labels</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Critical earthing connections must be permanently labelled to prevent accidental disconnection:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Locations Requiring Labels</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Main earthing terminal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Earth electrode connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Main equipotential bonding connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Supplementary bonding connections</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <p className="text-white/80 text-sm font-mono text-center">
                  "Safety Electrical Connection - Do Not Remove"
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="Why is the label 'Safety Electrical Connection - Do Not Remove' required at bonding connections?"
            answer="Bonding conductors provide vital shock protection. Without this label, someone (e.g., a plumber) might disconnect the bonding during work on the services, unknowingly removing electrical safety protection. The label prevents inadvertent disconnection."
            color="sky"
          />
        </div>

        {/* Content Section 05 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">05</span>
            <h2 className="text-xl font-semibold text-white">Label Durability Requirements</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                Regulation 514.1.1 requires labels to remain legible for the expected life of the installation. Consider:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                  <h4 className="text-sky-400 font-semibold mb-2">Acceptable Label Types</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Engraved labels on metal or plastic</li>
                    <li>• Industrial label printer output</li>
                    <li>• Properly secured adhesive labels (quality type)</li>
                    <li>• Traffic sign grade labels for outdoors</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <h4 className="text-red-400 font-semibold mb-2">Not Acceptable</h4>
                  <ul className="space-y-1 text-white/70 text-sm">
                    <li>• Handwritten labels</li>
                    <li>• Masking tape with pen</li>
                    <li>• Paper labels that will deteriorate</li>
                    <li>• Labels that can be easily removed</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-sky-400/30">06</span>
            <h2 className="text-xl font-semibold text-white">Verification During Inspection</h2>
          </div>
          <Card variant="ios" className="p-5">
            <div className="space-y-4 text-white/80 text-base leading-relaxed">
              <p>
                During inspection, verify all required labels are present and correct:
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-sky-500/20">
                <h4 className="text-sky-400 font-semibold mb-3">Inspection Checklist</h4>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Circuit chart present and accurate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>All circuits correctly identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Required warning labels fitted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Earth connection labels in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Labels are legible and durable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 text-sky-400 shrink-0" />
                    <span>Protective device ratings visible</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* InlineCheck */}
        <div className="mb-8">
          <InlineCheck
            question="A consumer unit has a circuit chart but some descriptions don't match current use (e.g., 'Spare' but supplies outdoor lighting). What should be done?"
            answer="This should be recorded as a defect (C3 improvement recommended). The circuit chart should be corrected to accurately describe current circuit usage. Inaccurate labelling could lead to incorrect isolation."
            color="sky"
          />
        </div>

        {/* Practical Tips */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" />
            Practical Tips
          </h2>
          <div className="space-y-3">
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Carry Label Stock</h4>
                  <p className="text-white/60 text-sm">Keep common warning labels in your kit for immediate replacement</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Use Label Makers</h4>
                  <p className="text-white/60 text-sm">Invest in a proper label printer for durable, professional results</p>
                </div>
              </div>
            </Card>
            <Card variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Verify Accuracy</h4>
                  <p className="text-white/60 text-sm">Don't assume existing labels are correct - verify each circuit</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <Card key={index} variant="ios" className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 active:bg-white/5 transition-colors touch-manipulation"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-white/40 transition-transform shrink-0",
                    expandedFaq === index && "rotate-180"
                  )} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <section className="mb-8">
          <UnitsPocketCard
            title="Cable Colours Reference"
            units={pocketCardUnits}
            color="sky"
          />
        </section>

        {/* Quiz */}
        <section className="mb-8">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            color="sky"
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 pt-4 pb-safe">
          <Button
            variant="ios-primary"
            size="lg"
            className="w-full touch-target bg-sky-500 hover:bg-sky-600"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8/section3')}
          >
            Continue to Section 3
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="ios-secondary"
            size="lg"
            className="w-full touch-target"
            onClick={() => navigate('/study-centre/apprentice/study/inspection-testing/module8')}
          >
            Back to Module 8
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule8Section2;
