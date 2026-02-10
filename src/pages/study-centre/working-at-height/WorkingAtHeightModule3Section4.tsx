import {
  ArrowLeft,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  Search,
  BookOpen,
  Shield,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ─── Quick-check questions (InlineCheck) ─── */
const quickCheckQuestions = [
  {
    id: "qc1",
    question:
      "During a pre-use visual inspection, you notice that some stitching on a shoulder strap has come loose. What should you do?",
    options: [
      "Continue using the harness — minor stitching damage is normal",
      "Apply tape to reinforce the damaged area",
      "Remove the harness from service immediately and report it for inspection by a competent person",
      "Use the harness but avoid attaching a lanyard to the affected side",
    ],
    correctIndex: 2,
    explanation:
      "Any visible damage to load-bearing stitching is a reason to immediately remove the harness from service. Stitching integrity is critical — it holds the webbing together under the forces of a fall arrest event. The harness must be inspected by a competent person who will decide whether it can be repaired or must be discarded.",
  },
  {
    id: "qc2",
    question:
      "A harness has been used to arrest a fall. The worker was recovered safely and the harness appears undamaged. Can the harness be returned to service?",
    options: [
      "Yes — if it looks fine, it is fine",
      "Yes — but only after a 24-hour rest period",
      "No — the harness must be removed from service immediately after any fall arrest event",
      "No — unless a supervisor approves it",
    ],
    correctIndex: 2,
    explanation:
      "After any fall arrest event, the harness MUST be removed from service immediately — even if there is no visible damage. The forces involved in a fall can cause hidden damage to webbing, stitching, and D-rings that is not visible externally. The harness must undergo thorough examination by a competent person and will almost certainly be condemned.",
  },
  {
    id: "qc3",
    question:
      "What information must be recorded for each piece of personal fall protection equipment?",
    options: [
      "Just the date it was purchased",
      "Only the date of the last thorough examination",
      "Unique identification number, inspection log, thorough examination certificates, and service history",
      "The user's name only",
    ],
    correctIndex: 2,
    explanation:
      "A comprehensive record must be maintained for every piece of PPE including: unique ID number, date of manufacture, date of first use, pre-use inspection records, thorough examination certificates, any repairs or modifications, and date of withdrawal from service.",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    question:
      "Who can carry out the 6-monthly thorough examination?",
    answer:
      "The thorough examination must be carried out by a 'competent person' — someone with the training, knowledge, and experience to identify defects in fall protection equipment. This is usually a specialist inspector trained by the equipment manufacturer or an independent inspection body. It is NOT normally the user or their supervisor, as they may lack the detailed technical knowledge required. Many companies use third-party inspection services who maintain the register and issue certificates.",
  },
  {
    question:
      "What is the typical service life of a harness?",
    answer:
      "Most manufacturers recommend a maximum service life of 5 to 10 years from the date of first use, depending on the model, materials, and conditions of use. Some manufacturers specify a maximum shelf life from the date of manufacture (even if the harness has never been used). UV exposure, chemical contamination, and heavy use can all shorten the effective life. Always check the manufacturer's guidance — this information is usually on the label or in the product documentation.",
  },
  {
    question:
      "Can I repair a damaged harness myself?",
    answer:
      "No. You must never repair fall protection equipment yourself. Any repair must be carried out by the manufacturer or an authorised repair centre using genuine components and tested methods. In practice, most damaged harnesses are condemned and replaced — the cost of a new harness is negligible compared to the consequence of equipment failure during a fall.",
  },
  {
    question:
      "How should lanyards and SRLs be stored when not in use?",
    answer:
      "Lanyards should be hung up on a peg or stored flat in a dry, clean location away from direct sunlight, heat sources, chemicals, and sharp edges. They should never be stored wet — dry them at room temperature first. SRLs should be stored with the line fully retracted. If a webbing SRL has been exposed to rain, it should be dried with the line extended before retraction. All equipment should be stored in a designated location where it is protected from accidental damage.",
  },
];

/* ─── End-of-section quiz (8 questions) ─── */
const quizQuestions = [
  {
    id: 1,
    question:
      "How frequently must personal fall protection equipment receive a thorough examination under LOLER?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Only when damage is suspected",
    ],
    correctAnswer: 1,
    explanation:
      "The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) require thorough examination at intervals not exceeding 6 months for equipment used to arrest a fall from height.",
  },
  {
    id: 2,
    question:
      "During a pre-use inspection, which of the following would NOT require the harness to be immediately removed from service?",
    options: [
      "Frayed webbing on a leg strap",
      "A small scuff mark on a non-load-bearing label holder",
      "A bent D-ring",
      "Partially deployed shock absorber indicator",
    ],
    correctAnswer: 1,
    explanation:
      "A small scuff on a non-load-bearing label holder does not affect the harness's ability to arrest a fall. However, frayed webbing, bent D-rings, and deployed shock absorbers are all defects affecting load-bearing components and require immediate removal from service.",
  },
  {
    id: 3,
    question:
      "What should you check on the shock absorber indicator during a pre-use inspection?",
    options: [
      "That it is the correct colour",
      "That it has not been torn or deployed",
      "That it has a date stamp for this year",
      "That it is wet-weather rated",
    ],
    correctAnswer: 1,
    explanation:
      "The shock absorber indicator (often a flag or window of tear webbing) shows whether the energy absorber has been activated in a fall. If it is torn, separated, or shows signs of deployment, the entire lanyard/absorber must be removed from service immediately.",
  },
  {
    id: 4,
    question:
      "Which of the following is the correct way to store a fall arrest harness?",
    options: [
      "Folded in a toolbox at the bottom of the van",
      "Hung up in a dry, UV-free location away from chemicals and sharp edges",
      "Kept on the scaffold tower between uses",
      "Stored in a sealed plastic bag to keep it dry",
    ],
    correctAnswer: 1,
    explanation:
      "Harnesses should be hung up (to maintain shape and allow air circulation) in a dry location away from UV light, chemicals, heat, and sharp edges. Sealed bags can trap moisture and promote mould growth; toolboxes can cause abrasion damage.",
  },
  {
    id: 5,
    question:
      "A harness label shows the manufacture date as 2016 and the first-use date as 2018. The manufacturer states a maximum service life of 5 years from first use. In which year must this harness be withdrawn from service at the latest?",
    options: ["2021", "2023", "2026", "2028"],
    correctAnswer: 1,
    explanation:
      "5 years from first use (2018) = 2023. The harness must be withdrawn from service by 2023 at the latest, even if it passes thorough examinations. Some manufacturers also set a maximum calendar life from manufacture date — always check both limits.",
  },
  {
    id: 6,
    question:
      "When inspecting a lanyard, which of the following signs of damage would you look for?",
    options: [
      "Fraying, kinking, corrosion, chemical staining, and heat damage",
      "Only visible cuts longer than 50 mm",
      "Only rust on the karabiners",
      "Only whether the label is present",
    ],
    correctAnswer: 0,
    explanation:
      "A thorough lanyard inspection covers all potential damage: fraying or broken strands (webbing or cable), kinking (especially wire rope), corrosion on metalwork, chemical staining or stiffness in webbing, heat damage (melting, discolouration), and correct function of the karabiner gates.",
  },
  {
    id: 7,
    question:
      "What must happen to a thorough examination finding that reveals a dangerous defect?",
    options: [
      "The finding is recorded but the equipment can continue in use",
      "The equipment must be withdrawn from service immediately and the defect report sent to the employer",
      "The user must be retrained before using the equipment again",
      "The employer has 28 days to arrange a repair",
    ],
    correctAnswer: 1,
    explanation:
      "If a thorough examination reveals a defect that poses an immediate danger, the equipment must be taken out of service on the spot. The competent person must issue a report to the employer detailing the defect, and if the risk is imminent, must also notify the HSE.",
  },
  {
    id: 8,
    question:
      "Which document provides the legal basis for the 6-monthly thorough examination requirement for personal fall protection equipment?",
    options: [
      "The Personal Protective Equipment at Work Regulations (PPER)",
      "The Lifting Operations and Lifting Equipment Regulations (LOLER)",
      "The Work at Height Regulations (WAHR)",
      "The Construction (Design and Management) Regulations (CDM)",
    ],
    correctAnswer: 1,
    explanation:
      "LOLER 1998 is the legislation that specifically requires thorough examination of lifting equipment — which includes personal fall protection equipment used to arrest a fall (harnesses, lanyards, SRLs, anchor devices). The Work at Height Regulations reference LOLER for this requirement.",
  },
];

/* ─── FAQ accordion item ─── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full min-h-[52px] flex items-center justify-between gap-3 px-4 py-3.5 text-left text-white hover:bg-white/5 transition-colors touch-manipulation active:scale-[0.99]"
      >
        <span className="text-sm sm:text-base font-medium leading-relaxed flex-1">
          {question}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-amber-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/40 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-white/70 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/*  MAIN COMPONENT                                                              */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function WorkingAtHeightModule3Section4() {
  useSEO({
    title:
      "Harness Inspection & Equipment Checks | Module 3 Section 4 | Working at Height",
    description:
      "Pre-use visual inspection, 6-monthly thorough examination, when to discard equipment, storage requirements, and record keeping for personal fall protection.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky nav bar ── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article body ── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <ClipboardCheck className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Harness Inspection & Equipment Checks
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Pre-use visual inspections, 6-monthly thorough examinations, when
            to immediately discard equipment, correct storage, and the
            record-keeping requirements that keep you safe and legal.
          </p>
        </header>

        {/* ── Quick Summary Boxes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Every Single Use
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              The user must carry out a visual pre-use inspection every
              time before donning the harness.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Every 6 Months
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              LOLER requires thorough examination by a competent person at
              intervals not exceeding 6 months.
            </p>
          </div>
          <div className="rounded-xl bg-red-500/5 border-l-2 border-red-500/50 p-4">
            <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Immediate Discard
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              After any fall arrest event, visible damage to load-bearing
              components, or illegible label — remove from service at once.
            </p>
          </div>
          <div className="rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50 p-4">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Service Life
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              Typically 5–10 years from first use (check manufacturer
              guidance). Withdraw when past recommended life.
            </p>
          </div>
        </div>

        {/* ── Learning Outcomes ── */}
        <div className="mb-12 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-amber-500" />
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Carry out a systematic pre-use visual inspection of a full body harness",
              "Identify the defects that require immediate removal from service",
              "Explain the LOLER requirement for 6-monthly thorough examination",
              "Describe the correct storage conditions for harnesses, lanyards, and SRLs",
              "Inspect lanyards and self-retracting lifelines for common defects",
              "Maintain proper records: unique ID, inspection log, examination certificates, and service history",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-white/70 text-sm leading-relaxed">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 01 — Pre-Use Visual Inspection                         */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              01
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Pre-Use Visual Inspection
              </h2>
              <p className="text-white/50 text-sm">
                Every use, by the user — before donning the harness
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Before putting on your harness at the start of every shift (or
              whenever the harness has been out of your sight), you must
              carry out a systematic visual and tactile inspection. This
              takes only 2–3 minutes and is your first line of defence
              against equipment failure.
            </p>

            <h3 className="text-white font-semibold text-base mt-4 mb-3">
              Webbing Inspection
            </h3>
            <div className="space-y-2">
              {[
                "Run every strap through your hands, feeling for cuts, nicks, abrasion, and fraying",
                "Look for chemical damage — discolouration, stiffness, or softening of the material (contact with solvents, acids, or alkalis can weaken synthetic fibres)",
                "Check for UV degradation — fading, chalky surface, or brittleness (especially on harnesses used outdoors regularly)",
                "Look for heat or burn damage — melted fibres, scorch marks, or glossy patches from welding spatter",
                "Inspect for mould or mildew — indicates improper storage while wet",
                "Check that no webbing has been knotted, twisted, or modified in any way",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Stitching Inspection
            </h3>
            <div className="space-y-2">
              {[
                "Examine all stitched joints — particularly where webbing connects to D-rings and buckles",
                "Look for broken threads, pulled stitching, or loose loops",
                "Check bartack stitching (the dense reinforcement stitching at high-load points) for completeness",
                "Compare both sides of the harness — uneven wear may indicate a twisted or improperly adjusted harness",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Hardware Inspection
            </h3>
            <div className="space-y-2">
              {[
                "D-rings: check for cracks, deformation, corrosion, and sharp edges — the D-ring must sit flat and straight in its web keeper",
                "Buckles: ensure they engage and disengage correctly — pass-through buckles must thread smoothly; quick-connect buckles must click securely and release cleanly",
                "Karabiners (if integral): check the gate opens and closes freely, the locking mechanism functions correctly, and there is no corrosion or deformation",
                "Adjustment slides: confirm they grip the webbing firmly and do not slip under load",
                "Metal-to-metal contact: look for wear marks where metal components rub against each other — excessive wear thins the material",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Labels & Markings
            </h3>
            <div className="space-y-2">
              {[
                "Check the manufacturer's label is present and legible — it must show the model number, standard reference (EN 361), serial number, and date of manufacture",
                "Check the date of first use if recorded on the label or a separate tag",
                "Verify the harness is within its recommended service life",
                "If the label is missing or illegible, the harness MUST be removed from service — without identification, it cannot be traced to inspection records",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Shock Absorber Indicator
            </h3>
            <div className="space-y-2">
              {[
                "If the harness has an integral lanyard with a shock absorber, check the deployment indicator",
                "The indicator is typically a flag, tag, or window that shows whether the tear webbing has been activated",
                "If the indicator shows any signs of deployment (torn, separated, extended), remove the entire assembly from service",
                "Even partial deployment means the energy absorption capacity has been compromised",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 02 — 6-Monthly Thorough Examination                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-blue-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              02
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                6-Monthly Thorough Examination
              </h2>
              <p className="text-white/50 text-sm">
                LOLER requirement — by a competent person
              </p>
            </div>
          </div>
          <div className="border-l-2 border-blue-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The Lifting Operations and Lifting Equipment Regulations 1998
              (LOLER) require that all equipment used for arresting falls
              from height receives a{" "}
              <strong className="text-white">thorough examination</strong> by
              a <strong className="text-white">competent person</strong> at
              intervals not exceeding 6 months. This is a legal obligation
              on the employer — non-compliance is a criminal offence.
            </p>

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <h4 className="text-blue-400 text-sm font-semibold mb-3">
                What the Thorough Examination Involves
              </h4>
              <div className="space-y-2">
                {[
                  "Detailed visual inspection of all components — more rigorous than a pre-use check",
                  "Functional testing of all hardware — buckles, karabiners, D-rings, adjustment mechanisms",
                  "Assessment of webbing condition using specialised knowledge — identifying early signs of degradation that a user might miss",
                  "Verification that the equipment is within its manufacturer's recommended service life",
                  "Comparison with previous examination records to identify progressive deterioration",
                  "The examiner may partially disassemble some components to inspect hidden areas",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
              <h4 className="text-blue-400 text-sm font-semibold mb-3">
                Competent Person Requirements
              </h4>
              <div className="space-y-2">
                {[
                  "Must have specific training in the inspection of fall protection equipment — not just general PPE knowledge",
                  "Should be independent of the user and preferably of the employer — to avoid conflicts of interest",
                  "Many employers use third-party inspection companies who specialise in height safety equipment",
                  "The competent person must issue a written report/certificate for each item examined",
                  "If a defect is found that poses an immediate danger, the examiner must notify the employer and may need to notify the HSE",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-400 text-sm font-semibold">
                  Timing
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                &ldquo;Not exceeding 6 months&rdquo; means the examination
                must be completed before 6 months have elapsed since the
                previous one. Most employers schedule examinations at 5-month
                intervals to allow for diary conflicts and holidays. If a
                piece of equipment misses its examination date, it must not
                be used until the examination has been completed.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 03 — When to Discard / Remove from Service             */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-red-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              03
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                When to Immediately Discard
              </h2>
              <p className="text-white/50 text-sm">
                Non-negotiable reasons to remove equipment from service
              </p>
            </div>
          </div>
          <div className="border-l-2 border-red-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The following conditions require{" "}
              <strong className="text-white">
                immediate removal from service
              </strong>{" "}
              — no exceptions, no temporary fixes, no &ldquo;just for
              today&rdquo;. Equipment removed from service should be clearly
              marked &ldquo;DO NOT USE&rdquo; or physically destroyed to
              prevent anyone else from using it.
            </p>

            <div className="space-y-3">
              {[
                {
                  reason: "After any fall arrest event",
                  detail:
                    "Even if the harness looks undamaged, the forces of a fall can cause internal damage to webbing fibres, D-ring welds, and stitching that is not visible externally. The harness, lanyard, shock absorber, and any connected equipment must all be removed.",
                },
                {
                  reason: "Visible damage to load-bearing components",
                  detail:
                    "Cuts, tears, or fraying in webbing; cracked, bent, or corroded D-rings; broken or pulled stitching; deformed buckles that do not engage correctly.",
                },
                {
                  reason: "Chemical contamination",
                  detail:
                    "Contact with acids, alkalis, solvents, paints, or other chemicals that may weaken synthetic fibres. If in doubt, remove from service — chemical damage may not be visible.",
                },
                {
                  reason: "Heat or fire damage",
                  detail:
                    "Melted fibres, scorch marks, discolouration from heat exposure, or contact with welding spatter.",
                },
                {
                  reason: "Shock absorber deployed",
                  detail:
                    "If the tear webbing has been even partially activated, the energy absorption capacity is compromised. The entire lanyard/absorber assembly must be replaced.",
                },
                {
                  reason: "Label illegible or missing",
                  detail:
                    "Without a legible label, the equipment cannot be identified, traced to inspection records, or verified as within its service life. It is effectively unidentifiable PPE.",
                },
                {
                  reason: "Past recommended service life",
                  detail:
                    "Typically 5–10 years from date of first use (check manufacturer's guidance). Some manufacturers also set a maximum calendar life from date of manufacture.",
                },
                {
                  reason: "Unknown history",
                  detail:
                    "If you find a harness with no records, no known owner, or no inspection history, it must not be used. You cannot verify its condition, age, or whether it has been subject to a fall.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-red-400 text-sm font-semibold">
                      {item.reason}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed pl-6">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 04 — Storage                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-green-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              04
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Correct Storage
              </h2>
              <p className="text-white/50 text-sm">
                Protecting equipment between uses
              </p>
            </div>
          </div>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              How you store your fall protection equipment between uses has a
              direct impact on its lifespan and reliability. Improper storage
              is one of the most common causes of premature equipment
              degradation.
            </p>

            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
              <h4 className="text-green-400 text-sm font-semibold mb-3">
                Storage Requirements
              </h4>
              <div className="space-y-2">
                {[
                  "Hang the harness on a wide peg or dedicated storage hook — never fold or compress it into a toolbox or bag for extended periods",
                  "Store in a dry, well-ventilated area — moisture promotes mould and mildew growth on webbing",
                  "Away from direct sunlight and UV sources — UV radiation degrades nylon and polyester fibres over time",
                  "Away from chemicals — solvents, paints, fuels, cleaning agents, battery acid, and cement dust can all damage synthetic webbing",
                  "Away from sharp edges — do not hang near tools, wire, or sheet metal that could cut or abrade the webbing",
                  "Away from heat sources — radiators, heaters, hot pipes, and direct engine heat all weaken synthetic fibres",
                  "If the harness is wet, dry it naturally at room temperature before storage — never use a heat source to accelerate drying",
                  "Store SRLs with the line fully retracted to prevent the spring from fatiguing",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <Info className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-400 text-sm font-semibold">
                  Van Storage
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Many electricians keep their harness in their van. This is
                acceptable for transport, but be aware that vans can get
                very hot in summer (UV through windows, engine heat) and
                damp in winter. Use a breathable storage bag or dedicated
                compartment. Do not leave the harness loose on the van floor
                where it can be contaminated by oils, tools, or cable
                offcuts.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 05 — Lanyard & SRL Inspection                          */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-purple-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              05
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Lanyard & SRL Inspection
              </h2>
              <p className="text-white/50 text-sm">
                Checking connecting equipment for defects
              </p>
            </div>
          </div>
          <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6 space-y-4">
            <h3 className="text-white font-semibold text-base mb-3">
              Webbing Lanyard Inspection
            </h3>
            <div className="space-y-2">
              {[
                "Run the full length through your hands — feel for cuts, abrasion, and stiffness",
                "Check for fraying, broken fibres, and pulled threads",
                "Inspect the shock absorber pack — look for tears, rips, or signs of deployment in the indicator",
                "Check both karabiner connections — gates must open smoothly and lock correctly",
                "Look for chemical staining, UV bleaching, and heat damage",
                "Verify the label is legible with the correct standard reference (EN 354 / EN 355)",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-white font-semibold text-base mt-6 mb-3">
              Wire Rope Lanyard / SRL Inspection
            </h3>
            <div className="space-y-2">
              {[
                "Check the cable for kinking — a kinked wire rope has significantly reduced strength",
                "Look for broken wires (bird-caging) — even a single broken wire is cause for concern",
                "Check for corrosion — surface rust on galvanised cable, pitting on stainless",
                "Pull the line out fully — it should extend smoothly without jerking or sticking",
                "Release the line — it should retract fully and evenly under spring tension",
                "Test the braking mechanism — a sharp pull should lock the drum immediately",
                "Check the housing for cracks, dents, and signs of impact damage",
                "Inspect the swivel connection — it must rotate freely without excessive play",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 06 — Anchor Point Inspection                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-cyan-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              06
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Anchor Point Inspection
              </h2>
              <p className="text-white/50 text-sm">
                Structural integrity and certification
              </p>
            </div>
          </div>
          <div className="border-l-2 border-cyan-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              The anchor point is only as good as the structure it is
              attached to. Before connecting to any anchor, check:
            </p>

            <div className="space-y-2">
              {[
                "The anchor is certified for fall arrest use — look for a label or plate showing EN 795 class and rated load",
                "Fixings are secure — bolts are present, tight, and not corroded; welds are intact with no visible cracking",
                "The supporting structure is sound — no corrosion, cracking, or deterioration of the beam/column/wall to which the anchor is fixed",
                "The anchor is correctly positioned for your task — ideally directly above your working position to minimise pendulum swing",
                "Deadweight anchors (Class E) are sitting on a clean, flat surface with all ballast in place",
                "Flexible lifelines (Class C) are properly tensioned and the end anchors are secure",
                "Anchor points undergo their own thorough examination regime — check the inspection tag/certificate before use",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Never Use Uncertified Anchor Points
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Pipe brackets, cable tray supports, handrails, conduit
                fittings, and structural steelwork that has not been
                assessed for fall arrest loading are{" "}
                <strong className="text-white">not</strong> suitable anchor
                points. They may fail under the dynamic forces of a fall
                arrest event (up to 6 kN or more). Only connect to purpose-
                installed, tested, and certified anchor devices.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  SECTION 07 — Record Keeping                                    */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-500/40 text-4xl sm:text-5xl font-black leading-none select-none">
              07
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Record Keeping
              </h2>
              <p className="text-white/50 text-sm">
                Unique identification, inspection logs, and certificates
              </p>
            </div>
          </div>
          <div className="border-l-2 border-amber-500/30 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Proper record keeping is both a legal requirement and a
              practical necessity. Without records, you cannot prove your
              equipment has been inspected, you cannot track its service
              history, and you cannot identify when it is due for
              examination or replacement.
            </p>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <h4 className="text-amber-400 text-sm font-semibold mb-3">
                What Must Be Recorded
              </h4>
              <div className="space-y-2">
                {[
                  "Unique identification number — every harness, lanyard, SRL, and anchor device must have a unique serial or asset number",
                  "Manufacturer details — make, model, standard reference (EN 361, EN 355, etc.)",
                  "Date of manufacture — from the manufacturer's label",
                  "Date of first use — when the equipment was first put into service",
                  "Pre-use inspection records — date, inspector's name, pass/fail, notes on condition",
                  "Thorough examination certificates — date, examiner's name and qualifications, findings, next due date",
                  "Any repairs or modifications — what was done, by whom, and under what authority",
                  "Date of withdrawal from service — when and why the equipment was removed",
                  "Disposal method — confirmation the equipment was destroyed to prevent reuse",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-start gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-amber-400 text-sm font-semibold">
                  Practical Tip
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Many companies now use digital asset management systems or
                apps to track their fall protection equipment. The harness
                has a unique barcode or QR code; scanning it brings up the
                full service history on a mobile device. This makes pre-use
                checks faster and eliminates the risk of paper records being
                lost. If your employer uses such a system, make sure you
                know how to use it.
              </p>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Harness Inspection Checklist Diagram                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-white/10 bg-[#111] p-5 sm:p-6">
            <h3 className="text-amber-400 text-sm font-semibold mb-5 text-center">
              Harness Inspection Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {[
                {
                  item: "Shoulder Strap Webbing",
                  checks: "Cuts, fraying, UV damage, chemical staining",
                },
                {
                  item: "Leg Loop Webbing",
                  checks: "Abrasion, heat damage, broken fibres",
                },
                {
                  item: "Chest Strap & Buckle",
                  checks: "Buckle engages correctly, webbing intact",
                },
                {
                  item: "Rear (Dorsal) D-Ring",
                  checks: "No cracks, deformation, or corrosion",
                },
                {
                  item: "Front (Sternal) D-Ring",
                  checks: "Sits flat, no sharp edges, moves freely",
                },
                {
                  item: "All Stitching",
                  checks: "No broken threads, loose loops, or pulled bartacks",
                },
                {
                  item: "Adjustment Buckles",
                  checks: "Grip webbing firmly, slide smoothly",
                },
                {
                  item: "Label / Markings",
                  checks: "Legible, correct standard reference, within service life",
                },
                {
                  item: "Shock Absorber Indicator",
                  checks: "Not deployed, not torn, flag/window intact",
                },
                {
                  item: "Karabiner Gates",
                  checks: "Open/close freely, lock mechanism functions, no corrosion",
                },
                {
                  item: "Sub-Pelvic Strap",
                  checks: "Present, stitching intact, no twisting",
                },
                {
                  item: "General Condition",
                  checks: "No mould, contamination, or unknown modifications",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                    <Search className="h-3 w-3 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {row.item}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {row.checks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-white/40 text-xs mt-4">
              Complete all check points before every use. Any defect found =
              remove from service immediately.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Key Takeaways                                                  */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12">
          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-400/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              Key Takeaways
            </h2>
            <div className="space-y-3">
              {[
                "Pre-use visual inspection: every use, by the user. Check webbing, stitching, buckles, D-rings, labels, and shock absorber indicator.",
                "Thorough examination: every 6 months by a competent person (LOLER requirement). Recorded, certificated, legally enforceable.",
                "Immediate discard: after any fall arrest event, visible damage to load-bearing components, illegible label, past service life, or unknown history.",
                "Storage: hang up, dry, away from UV, chemicals, sharp edges, and heat. Never fold into a toolbox for extended periods.",
                "Lanyards and SRLs need the same inspection regime — check for fraying, kinking, corrosion, and correct retraction.",
                "Anchor points must be certified, structurally sound, and within their inspection schedule before you connect to them.",
                "Record everything: unique ID, inspection log, thorough exam certificates, service history, withdrawal date.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  Quiz                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-12 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <Quiz
            questions={quizQuestions}
            title="Section 4 Quiz — Harness Inspection & Equipment Checks"
          />
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/*  FAQs                                                           */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-amber-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
