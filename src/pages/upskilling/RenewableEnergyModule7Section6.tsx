import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety, Isolation, and Working Procedures - Renewable Energy Module 7";
const DESCRIPTION =
  "Essential safety procedures for working on renewable energy systems including isolation protocols, lockout/tagout, PPE requirements, and hazard assessment.";

const quickCheckQuestions = [
  {
    id: "safety-qc1",
    question: "What is the correct sequence for isolating a PV system?",
    options: [
      "DC first, then AC",
      "AC first, then DC",
      "Either order is acceptable",
      "Only AC isolation is required",
    ],
    correctIndex: 1,
    explanation:
      "Isolate AC first (to prevent export), then DC. This sequence prevents the inverter attempting to export during isolation and follows industry best practice.",
  },
  {
    id: "safety-qc2",
    question: "Why is DC particularly hazardous compared to AC?",
    options: [
      "DC has higher voltage",
      "DC arcs are harder to extinguish due to no zero crossing",
      "DC is always higher current",
      "DC equipment is less reliable",
    ],
    correctIndex: 1,
    explanation:
      "DC arcs can sustain indefinitely because there is no natural zero crossing point where current passes through zero, unlike AC which crosses zero 100 times per second (50Hz).",
  },
  {
    id: "safety-qc3",
    question: "What minimum waiting time is recommended after DC isolation before working on inverters?",
    options: ["1 minute", "5 minutes", "15 minutes", "30 minutes"],
    correctIndex: 1,
    explanation:
      "A minimum of 5 minutes is recommended for capacitor discharge, though manufacturer guidance should always be followed as some systems may require longer.",
  },
  {
    id: "safety-qc4",
    question: "What does LOTO stand for in electrical safety?",
    options: [
      "Lock Out Turn Off",
      "Lockout Tagout",
      "Limited Operation Technical Order",
      "Low Output Test Operation",
    ],
    correctIndex: 1,
    explanation:
      "LOTO stands for Lockout Tagout, a safety procedure ensuring equipment is properly isolated and cannot be accidentally re-energised during maintenance.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Can PV arrays be completely de-energised during daylight?",
    options: [
      "Yes, by opening all isolators",
      "No, they generate voltage whenever light is present",
      "Yes, by covering with opaque material",
      "Only during cloudy conditions",
    ],
    correctAnswer: 1,
    explanation:
      "PV arrays generate voltage whenever exposed to light - they cannot be fully de-energised during daylight. Covering panels helps but residual voltage may remain.",
  },
  {
    id: 2,
    question: "What PPE is required for working on energised PV systems?",
    options: [
      "Standard work gloves",
      "Arc-rated clothing and insulated gloves appropriate to voltage",
      "Hi-vis vest only",
      "No special PPE required",
    ],
    correctAnswer: 1,
    explanation:
      "Work on energised PV systems requires arc-rated clothing, voltage-rated insulated gloves, face protection, and appropriate footwear matching the hazard level.",
  },
  {
    id: 3,
    question: "What should be done after isolation but before starting work?",
    options: [
      "Begin work immediately",
      "Prove dead using approved voltage indicator",
      "Wait one minute",
      "Check monitoring system",
    ],
    correctAnswer: 1,
    explanation:
      "After isolation, always prove dead using an approved voltage indicator that has been proved on a known live source before and after testing.",
  },
  {
    id: 4,
    question: "How should battery systems be isolated?",
    options: [
      "AC isolation is sufficient",
      "Use BMS shutdown followed by physical disconnection",
      "Simply unplug the monitoring cable",
      "No isolation is possible",
    ],
    correctAnswer: 1,
    explanation:
      "Battery isolation requires controlled BMS shutdown followed by physical disconnection of battery terminals. Batteries remain energised and hazardous even when isolated from the system.",
  },
  {
    id: 5,
    question: "What is the purpose of a permit to work system?",
    options: [
      "To track working hours",
      "To formally control hazardous work with documented safety measures",
      "To record equipment serial numbers",
      "To schedule maintenance visits",
    ],
    correctAnswer: 1,
    explanation:
      "Permit to work systems formally document hazards, required precautions, isolation details, and authorisation for high-risk work, ensuring proper safety controls.",
  },
  {
    id: 6,
    question: "What should a risk assessment for renewable energy work include?",
    options: [
      "Cost estimates only",
      "Hazards, risks, control measures, and emergency procedures",
      "Equipment specifications only",
      "Customer contact details",
    ],
    correctAnswer: 1,
    explanation:
      "Risk assessments must identify hazards (electrical, working at height, etc.), assess risks, specify control measures, and include emergency procedures.",
  },
  {
    id: 7,
    question: "When should a toolbox talk be conducted?",
    options: [
      "Only for new employees",
      "Before starting work to review hazards and procedures",
      "After completing work",
      "Only when accidents occur",
    ],
    correctAnswer: 1,
    explanation:
      "Toolbox talks should be conducted before work begins to review specific hazards, safety procedures, and emergency arrangements for that particular job.",
  },
  {
    id: 8,
    question: "What is the safe approach to a suspected arc fault?",
    options: [
      "Reset and continue operating",
      "Isolate, investigate thoroughly, repair before re-energising",
      "Bypass the protection device",
      "Wait for the fault to clear itself",
    ],
    correctAnswer: 1,
    explanation:
      "Arc faults are serious fire hazards. Always isolate completely, investigate the cause thoroughly, and repair before re-energising. Never bypass arc fault protection.",
  },
  {
    id: 9,
    question: "What emergency information should be available at a PV installation?",
    options: [
      "Customer phone number only",
      "Isolation procedures, emergency contacts, and first aid arrangements",
      "Equipment warranty details",
      "Energy production data",
    ],
    correctAnswer: 1,
    explanation:
      "Emergency information should include system isolation procedures, emergency service contacts, first aid arrangements, and any site-specific hazards.",
  },
  {
    id: 10,
    question: "What is the minimum number of people recommended for high-risk electrical work?",
    options: [
      "One competent person",
      "Two people (one to monitor safety)",
      "Three people minimum",
      "No minimum specified",
    ],
    correctAnswer: 1,
    explanation:
      "High-risk electrical work should involve at least two people - one to perform the work and one to monitor safety and be able to summon help if needed.",
  },
];

const faqs = [
  {
    question: "Can I work on a PV system while it is generating power?",
    answer:
      "Live working on PV systems should only be undertaken when dead working is not reasonably practicable, by competent persons with appropriate training, using correct PPE and safe systems of work. Most maintenance and repair work should be performed with systems isolated.",
  },
  {
    question: "How do I isolate a battery storage system safely?",
    answer:
      "First use the BMS interface to initiate controlled shutdown. Wait for confirmation that contactors have opened. Then physically disconnect battery terminals, removing the negative terminal first. Verify zero voltage before starting work. Remember that individual battery modules remain energised.",
  },
  {
    question: "What should I do if someone receives an electric shock?",
    answer:
      "Do not touch the casualty if they are still in contact with the electrical source. Isolate the supply if safe to do so, or move the casualty using insulated material. Call emergency services immediately. Administer CPR if needed and trained to do so. All electrical shock casualties should receive medical assessment.",
  },
  {
    question: "How do I verify my isolation is effective?",
    answer:
      "Use an approved voltage indicator to test between all live conductors and earth at the point of work. The indicator must be proved working on a known live source before and after testing. Visual indication that isolators are open is not sufficient - always test.",
  },
  {
    question: "What training do I need for renewable energy system work?",
    answer:
      "Requirements include: electrical competence (appropriate qualifications), specific training on the equipment types, working at height training where relevant, manufacturer training for complex systems, and regular refresher training. Evidence of competence should be documented.",
  },
  {
    question: "What fire risks exist with renewable energy systems?",
    answer:
      "Key fire risks include: DC arc faults from loose connections, battery thermal runaway, inverter component failure, and cable damage. Mitigation includes proper installation, AFCI protection, regular inspection, and appropriate fire detection and suppression near battery systems.",
  },
];

const RenewableEnergyModule7Section6 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 7 • Section 6</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              Operation and Maintenance
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Safety, Isolation, and Working Procedures
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Essential procedures for working safely on renewable energy systems including isolation, LOTO, and PPE requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Isolation Procedures</h3>
              <p className="text-sm text-white">
                Systematic isolation following AC-first-then-DC sequence, with verification and lockout/tagout to prevent accidental re-energisation.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Hazard Awareness</h3>
              <p className="text-sm text-white">
                DC arc hazards, stored energy in batteries and capacitors, and working at height require specific safety measures and PPE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Apply correct isolation procedures",
                "Work safely around stored energy",
                "Follow lockout/tagout practices",
                "Select and use appropriate PPE",
                "Conduct effective risk assessments",
                "Respond appropriately to emergencies",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Safe Isolation Procedures</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Proper isolation is fundamental to safe working on renewable energy systems. The sequence and verification steps are critical.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Five-Step Isolation Sequence</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li><strong>Isolate AC supply:</strong> Main switch first, then inverter AC isolator</li>
                  <li><strong>Isolate DC sources:</strong> PV array disconnect, then string fuses/breakers</li>
                  <li><strong>Discharge stored energy:</strong> Wait minimum 5 minutes for capacitors</li>
                  <li><strong>Test for dead condition:</strong> Use approved proving unit on all circuits</li>
                  <li><strong>Secure isolation:</strong> Lock out isolators and apply warning tags</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">PV System Isolation</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">AC Side:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Turn off main AC isolator at distribution board</li>
                      <li>Switch inverter AC isolator to OFF position</li>
                      <li>Verify grid supply is isolated using voltage tester</li>
                      <li>Lock isolators in OFF position</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">DC Side:</p>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Open DC isolator at inverter</li>
                      <li>Open string fuses or DC breakers at combiner</li>
                      <li>Cover panels with opaque material if accessible</li>
                      <li>Test each string for zero voltage</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Battery Storage Isolation</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Access BMS interface (touchscreen or app)</li>
                  <li>Initiate controlled shutdown sequence</li>
                  <li>Wait for confirmation that contactors have opened</li>
                  <li>Remove negative terminal first using insulated tools</li>
                  <li>Store terminals safely to prevent reconnection</li>
                  <li>Test for zero voltage across battery terminals</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">DC Hazards and Arc Flash</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Direct current presents unique hazards that require specific understanding and precautions beyond standard AC electrical safety.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Why DC is More Dangerous</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>No zero crossing:</strong> AC crosses zero 100 times per second; DC never does</li>
                  <li><strong>Arc persistence:</strong> DC arcs can sustain indefinitely once established</li>
                  <li><strong>Energy release:</strong> Continuous rather than pulsed energy in faults</li>
                  <li><strong>Insulation stress:</strong> DC causes different insulation degradation patterns</li>
                  <li><strong>Muscle contraction:</strong> DC may cause sustained grip making release difficult</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Arc Flash Protection</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Arc-rated clothing:</strong> Minimum 8 cal/cm² for low voltage work</li>
                  <li><strong>Face protection:</strong> Arc-rated face shield or hood</li>
                  <li><strong>Gloves:</strong> Class 0 (1000V) electrical gloves with leather protectors</li>
                  <li><strong>Footwear:</strong> Electrical hazard rated safety boots</li>
                  <li><strong>Eye protection:</strong> Safety glasses under face shield</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">PV-Specific Considerations</h4>
                <p className="mb-2">
                  PV systems present unique challenges:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Arrays cannot be fully de-energised in daylight</li>
                  <li>String voltages can exceed 1000V DC</li>
                  <li>Fault currents limited but still hazardous</li>
                  <li>Arc faults can occur at any connection point</li>
                  <li>Fire risk from sustained arcs is significant</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Lockout/Tagout (LOTO) Procedures</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                LOTO procedures ensure equipment remains safely isolated during maintenance, preventing accidental re-energisation.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">LOTO Steps</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li><strong>Prepare:</strong> Identify all energy sources and isolation points</li>
                  <li><strong>Notify:</strong> Inform all affected personnel of the shutdown</li>
                  <li><strong>Shutdown:</strong> Follow proper sequence to de-energise equipment</li>
                  <li><strong>Isolate:</strong> Physically disconnect or block energy sources</li>
                  <li><strong>Lock:</strong> Apply locks to prevent re-energisation</li>
                  <li><strong>Tag:</strong> Attach warning tags with contact information</li>
                  <li><strong>Verify:</strong> Test equipment to confirm zero energy state</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Lock and Tag Requirements</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Personal locks:</strong> Each worker applies their own lock</li>
                  <li><strong>Unique keys:</strong> Only one key per lock, held by the worker</li>
                  <li><strong>Durable tags:</strong> Withstand environment, clearly identify worker</li>
                  <li><strong>Multi-lock hasps:</strong> Allow multiple workers to lock out same point</li>
                  <li><strong>Removal:</strong> Only the person who applied the lock may remove it</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Returning to Service</h4>
                <ol className="list-inside list-decimal space-y-1">
                  <li>Verify all work is complete and tools/materials removed</li>
                  <li>Ensure all guards and covers are replaced</li>
                  <li>Check all workers are clear of equipment</li>
                  <li>Remove locks and tags (by those who applied them)</li>
                  <li>Notify affected personnel of re-energisation</li>
                  <li>Re-energise following proper sequence</li>
                </ol>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Risk Assessment and Safe Systems</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective risk assessment underpins all safe working practices. Each job requires specific hazard identification and control measures.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Pre-Work Risk Assessment</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Hazard identification:</strong> Electrical, working at height, environmental</li>
                  <li><strong>Risk evaluation:</strong> Likelihood and severity of potential harm</li>
                  <li><strong>Control measures:</strong> Elimination, substitution, engineering controls, PPE</li>
                  <li><strong>Emergency procedures:</strong> First aid, rescue, evacuation routes</li>
                  <li><strong>Communication:</strong> How workers will stay in contact</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Pre-Work Safety Checklist</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Weather conditions assessment</li>
                    <li>Equipment condition verification</li>
                    <li>Personnel competency check</li>
                    <li>Emergency procedure review</li>
                  </ul>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Communication plan established</li>
                    <li>Isolation points identified</li>
                    <li>PPE requirements confirmed</li>
                    <li>First aid arrangements in place</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Toolbox Talk Content</h4>
                <p className="mb-2">
                  Brief all workers before starting on:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Specific hazards for this job</li>
                  <li>Control measures in place</li>
                  <li>Isolation arrangements</li>
                  <li>Emergency procedures and contacts</li>
                  <li>Individual responsibilities</li>
                  <li>Stop work authority - anyone can stop if unsafe</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Emergency Response</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Knowing how to respond to emergencies can save lives. Preparation and practice ensure effective response when needed.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Electric Shock Response</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Do not touch the casualty if still in contact with source</li>
                  <li>Isolate supply if safe to do so</li>
                  <li>If cannot isolate, use insulated material to separate</li>
                  <li>Call emergency services immediately</li>
                  <li>Administer CPR if needed and trained</li>
                  <li>All shock victims need medical assessment</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Fire Response</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Raise alarm:</strong> Alert others and call fire services</li>
                  <li><strong>Isolate:</strong> If safe, isolate electrical supply</li>
                  <li><strong>Evacuate:</strong> Do not attempt to fight unless trained and safe</li>
                  <li><strong>Extinguisher:</strong> CO2 for electrical fires - never water</li>
                  <li><strong>Battery fires:</strong> Do not use water; evacuate and contain</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Emergency Information</h4>
                <p className="mb-2">
                  Ensure the following is available at every site:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>System isolation procedures and locations</li>
                  <li>Emergency service contact numbers</li>
                  <li>Site address and access instructions</li>
                  <li>First aid kit location</li>
                  <li>Fire extinguisher locations</li>
                  <li>Names and contact details of qualified personnel</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Safety Culture</h4>
                  <p className="mt-1 text-sm">
                    Safety is everyone's responsibility. Encourage reporting of near-misses and unsafe conditions. Never take shortcuts with isolation or PPE. If something feels unsafe, stop and reassess.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Maintaining Competence</h4>
                  <p className="mt-1 text-sm">
                    Stay current with safety training and first aid certification. Review procedures after any incident or near-miss. Learn from others' experiences through safety alerts and industry publications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Leading by Example</h4>
                  <p className="mt-1 text-sm">
                    Experienced workers set the standard. Always follow procedures even when inconvenient. Support less experienced colleagues in developing safe habits. Challenge unsafe practices constructively.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Safety and Isolation Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-7/section-5">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-8/section-1">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Module
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section6;
