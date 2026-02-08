import { ArrowLeft, Search, CheckCircle, AlertTriangle, ClipboardList, Tag, Shield, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-postuse-purpose",
    question: "What is the PRIMARY purpose of a post-use inspection?",
    options: [
      "To count the number of components for the hire company",
      "To identify damage before components enter storage and to create an audit trail",
      "To determine how long the tower was in use",
      "To check if the tower needs repainting"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of a post-use inspection is to identify damage before defective components are placed into storage where they could later be re-used. It also creates an audit trail linking any damage to the specific job, which supports investigation and accountability."
  },
  {
    id: "pasma-postuse-green-tag",
    question: "What does a GREEN tag on a tower component indicate?",
    options: [
      "The component is new and unused",
      "The component is inspected, passed, and fit for use",
      "The component needs cleaning before storage",
      "The component is reserved for a specific project"
    ],
    correctIndex: 1,
    explanation: "A green tag indicates that the component has been inspected, has passed the inspection, and is fit for use. It is the opposite of a red tag, which indicates a defective item. Only competent persons should apply green tags after completing a thorough inspection."
  },
  {
    id: "pasma-postuse-cycle",
    question: "What is the correct continuous inspection cycle for tower components?",
    options: [
      "Annual inspection only",
      "Pre-use, in-use, post-use, storage, pre-use (continuous cycle)",
      "Inspection only when damage is visible",
      "Monthly inspection regardless of use"
    ],
    correctIndex: 1,
    explanation: "Tower components follow a continuous inspection cycle: pre-use inspection before each use, in-use monitoring during the shift, post-use inspection after dismantling, inspection during storage, and then pre-use inspection again before the next use. This cycle ensures no defect goes undetected."
  }
];

const faqs = [
  {
    question: "Is a post-use inspection legally required?",
    answer: "Yes. The Work at Height Regulations 2005 require that work equipment used at height is maintained in a condition that is safe for use. A post-use inspection is the practical mechanism for verifying this. Additionally, PUWER 1998 (Provision and Use of Work Equipment Regulations) requires that work equipment is maintained in an efficient state. Failing to carry out post-use inspections means you cannot demonstrate compliance with these requirements."
  },
  {
    question: "Who should carry out the post-use inspection?",
    answer: "The post-use inspection should be carried out by a competent person — someone who has sufficient training and experience to identify defects in mobile scaffold tower components. In practice, this is usually a PASMA-trained operative who was involved in the dismantling process, as they are best placed to spot damage as each component comes down."
  },
  {
    question: "What if I find damage but I am not sure if it is serious enough to quarantine?",
    answer: "If you are in any doubt about whether a defect is serious, quarantine the component. It is always safer to remove a suspect component from service and have it assessed by a competent person or the manufacturer than to put it back into storage where it might be used. The rule is: if in doubt, take it out."
  },
  {
    question: "Can digital tools replace paper inspection records?",
    answer: "Yes, digital records are fully acceptable under the Work at Height Regulations and PUWER. Many companies now use tablet-based or smartphone-based inspection apps that allow photographs, timestamps, and digital signatures. The key requirement is that the records are accessible when needed, cannot be easily tampered with, and are retained for the required period."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When should a post-use inspection be carried out?",
    options: [
      "The following day, after the components have dried",
      "As each component is dismantled and lowered to the ground",
      "Only when damage is suspected",
      "At the end of the month"
    ],
    correctAnswer: 1,
    explanation: "The post-use inspection should be carried out during the dismantling process, as each component is removed and lowered to the ground. This is the best time to inspect because every component is handled individually and any damage is fresh and visible."
  },
  {
    id: 2,
    question: "Which of the following should be checked during a post-use inspection?",
    options: [
      "Only the castors and brakes",
      "Only components that were at the top of the tower",
      "Every component: frame straightness, weld integrity, lock function, platform condition, castors, braces",
      "Only components that are visibly damaged"
    ],
    correctAnswer: 2,
    explanation: "Every component must be checked during the post-use inspection. This includes frame straightness, weld integrity, lock and latch function, platform surface condition, castor wheels and brakes, and brace clips and pins. Defects are not always obvious at a glance."
  },
  {
    id: 3,
    question: "What information must be included on a defect report?",
    options: [
      "Only the name of the person who found the defect",
      "Date, description of defect, severity, component identification, and reporter name",
      "Only the date and a photograph",
      "The hire company's reference number"
    ],
    correctAnswer: 1,
    explanation: "A defect report must include the date the defect was found, a clear description of the defect, an assessment of severity, the component type and identification (serial number if available), and the name of the person who found and reported it."
  },
  {
    id: 4,
    question: "What does a RED tag on a component mean?",
    options: [
      "The component is new and has not been used",
      "The component has been cleaned and is ready for storage",
      "The component is defective, quarantined, and must not be used",
      "The component belongs to the hire company"
    ],
    correctAnswer: 2,
    explanation: "A red tag means the component is defective, has been quarantined, and must not be used under any circumstances. It must remain in the quarantine area until repaired by the manufacturer or disposed of. Using a red-tagged component is a serious safety breach."
  },
  {
    id: 5,
    question: "How long must inspection records be retained under Schedule 5?",
    options: [
      "1 month after the work is completed",
      "3 months after the work is completed",
      "1 year after the work is completed",
      "5 years after the work is completed"
    ],
    correctAnswer: 1,
    explanation: "Under Schedule 5 of the Work at Height Regulations 2005, inspection records must be kept on site until the work is completed and then retained for a minimum of 3 months afterwards. The HSE can request to see these records at any time."
  },
  {
    id: 6,
    question: "If a tower has been stored between uses, what is required before the next use?",
    options: [
      "Nothing — the post-use inspection covers it",
      "A pre-use inspection is still required even if it passed the post-use inspection",
      "Only a visual check from a distance",
      "The supervisor signs a form"
    ],
    correctAnswer: 1,
    explanation: "A pre-use inspection is always required before each use, even if the components passed the post-use inspection. Components can deteriorate in storage (corrosion, mechanism seizing) and may have been damaged by other activities in the storage area."
  },
  {
    id: 7,
    question: "What is the scaffold tagging system used for on tower components?",
    options: [
      "To identify the owner of the equipment",
      "To visually indicate whether a component is fit for use (green) or defective (red)",
      "To record the date of manufacture",
      "To show the weight rating of each component"
    ],
    correctAnswer: 1,
    explanation: "The tagging system provides a quick visual indication of a component's status: green means inspected and fit for use, red means defective and quarantined. It is similar to the scaffold tagging system used on fixed scaffolding and prevents defective items being used."
  },
  {
    id: 8,
    question: "What does 'creating a tower inspection culture' mean in practice?",
    options: [
      "Hiring a dedicated inspector for every tower",
      "Making inspection routine rather than an afterthought, with leadership commitment and near-miss reporting",
      "Painting towers in bright colours so defects are easier to see",
      "Replacing all towers with new ones every year"
    ],
    correctAnswer: 1,
    explanation: "An inspection culture means that checking equipment is embedded in daily routines, not treated as a chore or an afterthought. It requires leadership commitment, consistent training reinforcement, open near-miss reporting, and learning from incidents so that inspection becomes second nature."
  }
];

export default function PasmaModule4Section4() {
  useSEO({
    title: "Post-Use Inspection | PASMA Module 4.4",
    description: "Post-use inspection procedures for mobile scaffold tower components including defect reporting, tagging systems, record keeping, and continuous inspection culture.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Search className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Post-Use Inspection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Inspecting every component after dismantling, reporting defects, applying the tagging system, and building a continuous inspection culture
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Inspect every component</strong> as it comes down during dismantling</li>
              <li><strong>Green tag:</strong> fit for use; <strong>Red tag:</strong> defective, quarantine</li>
              <li><strong>Record everything:</strong> date, findings, actions, inspector name</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>During dismantling:</strong> Check each component as it is lowered</li>
              <li><strong>Defects found:</strong> Verbal report, written record, tag component</li>
              <li><strong>After:</strong> Complete inspection record, file for retention</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why post-use inspection is essential",
              "List what to check on every component type",
              "Describe the defect reporting process",
              "Explain the green and red tagging system",
              "State the record-keeping requirements",
              "Understand the continuous inspection cycle"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Post-Use Inspection Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Post-Use Inspection Matters
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A post-use inspection is the critical checkpoint between dismantling and storage.
                Its purpose is to identify any damage sustained during use before the component
                goes back into stock. Without this step, a cracked weld, a bent frame, or a
                seized castor brake could sit in storage undetected and be issued to the next
                job &mdash; where it could contribute to a tower failure.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> The post-use inspection
                  is not a formality. It is the last opportunity to catch a defect before the
                  component enters storage and potentially re-enters service. It also creates the
                  audit trail that links any damage to the specific site and usage period, which
                  is essential for accountability and learning.
                </p>
              </div>

              <p>
                Post-use inspections also feed directly into the next pre-use check. If the
                post-use inspection is thorough and accurately recorded, the pre-use check can
                be completed with confidence. If post-use inspections are skipped or superficial,
                the pre-use check carries the entire burden of defect detection &mdash; and some
                defects are harder to spot when a tower is assembled than when individual
                components are examined.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Benefits of Thorough Post-Use Inspection</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Catches defects at the earliest opportunity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Prevents defective components from entering storage and future use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Creates a documented audit trail for compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Links damage to specific jobs, improving accountability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Supports the pre-use check on the next deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Identifies patterns of recurring damage that indicate misuse</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: What to Check During Post-Use Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What to Check During Post-Use Inspection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every component must be inspected as it comes down from the tower during
                dismantling. The operative lowering each component is in the best position to
                give it a close visual and tactile inspection before passing it to the ground
                team for sorting and storage.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Component-by-Component Checklist</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Frame straightness:</strong> Sight along each frame tube. Any bowing, kinking, or deviation from straight indicates impact damage. Even slight bends reduce the frame&rsquo;s load-bearing capacity.</p>
                  <p><strong className="text-white">Weld integrity:</strong> Examine all weld joints for cracks, corrosion at the weld, or separation. Weld failures can lead to catastrophic structural collapse.</p>
                  <p><strong className="text-white">Lock function:</strong> Test every gravity lock, spigot pin, and latch mechanism. They must engage and disengage positively. Stiff or unreliable locks must be reported.</p>
                  <p><strong className="text-white">Platform condition:</strong> Check the walking surface for cracks, delamination, holes, or excessive wear. Check trapdoor hinges and latches for free operation.</p>
                  <p><strong className="text-white">Castor wheels and brakes:</strong> Spin each wheel to check for free rotation. Engage and release each brake to verify positive function. Check for flat spots, cracked wheels, or seized bearings.</p>
                  <p><strong className="text-white">Brace clips and pins:</strong> Verify that all clips, pins, and connectors are present, undamaged, and operating correctly. Missing or bent clips are a common post-use defect.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Do not assume that because the tower was working fine during use, all components
                  are undamaged. Damage can occur during the use period without being immediately
                  obvious &mdash; a platform impact, a component struck by a tool, gradual
                  corrosion at a joint. The post-use inspection is specifically designed to catch
                  these less-obvious issues.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Defect Reporting Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Defect Reporting Process
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a defect is found during a post-use inspection, it must be reported through
                a clear, structured process. This ensures the defect is communicated, recorded,
                and acted upon &mdash; and that the defective component is prevented from
                re-entering service.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Three-Step Reporting Process</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">Verbal Report to Supervisor</p>
                      <p className="text-sm text-white/80">Immediately tell your supervisor or the tower coordinator about the defect. Do not wait until the end of the day. The verbal report triggers immediate action to quarantine the component.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Written Record</p>
                      <p className="text-sm text-white/80">Complete a written defect report or enter the defect in the equipment register. This must include the date, component description, nature and severity of the defect, and your name.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">Defect Tag on Component</p>
                      <p className="text-sm text-white/80">Attach a red defect tag to the component itself. The tag should include the date, a brief description of the defect, and the reporter&rsquo;s name. This physically marks the item so no one else uses it.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Information Required on a Defect Report</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Date</strong> the defect was discovered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Component type</strong> (frame, brace, platform, castor, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Component identification</strong> (serial number, asset tag, or description)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Description of defect</strong> (what is wrong, where on the component)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Severity assessment</strong> (minor cosmetic, functional impairment, structural failure risk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Name of reporter</strong> and their role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong>Action taken</strong> (quarantined, tagged, reported to supervisor)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Tagging System — Green and Red */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Tagging System &mdash; Green and Red
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The tower component tagging system works on the same principle as the scaffold
                tagging system used on fixed scaffolding across the UK construction industry.
                It provides an instant visual indication of whether a component has been
                inspected and is safe to use.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">GREEN Tag</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li><strong>Meaning:</strong> Inspected, passed, fit for use</li>
                    <li><strong>Applied by:</strong> Competent person after thorough inspection</li>
                    <li><strong>Includes:</strong> Inspection date, inspector name, next inspection due</li>
                    <li><strong>Action:</strong> Component can be stored as serviceable stock and issued for use</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">RED Tag</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li><strong>Meaning:</strong> Defective, quarantined, DO NOT USE</li>
                    <li><strong>Applied by:</strong> Any person who identifies a defect</li>
                    <li><strong>Includes:</strong> Date, defect description, reporter name</li>
                    <li><strong>Action:</strong> Component must be quarantined immediately and not used until repaired and re-certified</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Point:</strong> Anyone can apply a red
                  tag &mdash; you do not need to be a supervisor or the tower coordinator. If you
                  find a defect, you have the right and the duty to red-tag that component
                  immediately. However, only a competent person who has carried out a full
                  inspection may apply a green tag, because a green tag certifies the component
                  as fit for use.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Happens to Red-Tagged Items?</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Moved to a designated quarantine area, separate from serviceable stock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Assessed by a competent person to determine if repair is possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If repairable: sent to the manufacturer or approved repair centre</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If beyond repair: disposed of safely to prevent any future use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>If repaired: re-inspected and re-certified before returning to service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Record Keeping Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Record Keeping Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Accurate record keeping is both a legal requirement and a practical necessity.
                Records demonstrate compliance with the Work at Height Regulations and PUWER,
                provide evidence in the event of an incident investigation, and help track the
                condition and service history of individual components.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">What Records to Keep</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Inspection date and time:</strong> When was the inspection carried out? This creates a chronological record.</p>
                  <p><strong className="text-white">Inspector name and competence:</strong> Who carried out the inspection? What qualification or training do they hold?</p>
                  <p><strong className="text-white">Findings:</strong> What was the outcome for each component or group of components? Pass, fail, or observation?</p>
                  <p><strong className="text-white">Actions taken:</strong> For any defect found, what action was taken? Quarantined, tagged, reported, disposed of?</p>
                  <p><strong className="text-white">Component identification:</strong> Where possible, record asset numbers or serial numbers to create an individual component history.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Retention Periods</p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Schedule 5 records:</strong> Must be kept on site until the work is completed, then retained for a minimum of 3 months. HSE can request these at any time.</p>
                  <p><strong className="text-white">Maintenance records:</strong> PUWER does not specify a retention period, but best practice is to retain records for the life of the equipment. This protects you in the event of a future incident.</p>
                  <p><strong className="text-white">Defect reports:</strong> Should be retained permanently or for the life of the component. They form part of the component&rsquo;s service history.</p>
                </div>
              </div>

              <p>
                Digital record-keeping systems (apps, spreadsheets, cloud-based platforms) are
                fully acceptable and are often more practical than paper on busy sites. The key
                is that records are accessible, accurate, tamper-resistant, and retained for the
                required period.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Linking to Next-Use Pre-Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Linking to Next-Use Pre-Checks
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The post-use inspection is not the end of the inspection process &mdash; it is
                one stage in a continuous cycle. Understanding how each stage feeds into the next
                is essential for maintaining tower safety throughout the equipment&rsquo;s life.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">The Continuous Inspection Cycle</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Pre-use inspection:</strong> Before each use, every component is checked during assembly. The tower is inspected before anyone works from it.</p>
                  <p><strong className="text-white">2. In-use monitoring:</strong> During the work shift, the tower is monitored for any changes &mdash; loosening, damage from impacts, weather changes, ground settlement.</p>
                  <p><strong className="text-white">3. Post-use inspection:</strong> After dismantling, every component is inspected before being placed into storage. Defects are reported and quarantined.</p>
                  <p><strong className="text-white">4. Storage inspection:</strong> While in storage, components are inspected at regular intervals to check for deterioration (corrosion, mechanism seizing).</p>
                  <p><strong className="text-white">5. Back to pre-use:</strong> When the components are issued for the next job, the cycle begins again with a fresh pre-use inspection.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Even if a component passed the post-use inspection, it must still be
                  inspected before the next use. Storage conditions can cause deterioration:
                  corrosion from damp, seized mechanisms from lack of use, or damage from
                  other activities in the storage area. The pre-use check is always required,
                  regardless of how recently the post-use inspection was completed.
                </p>
              </div>

              <p>
                Thorough post-use records make the next pre-use check more effective. If the
                inspector knows that all components were checked and passed three weeks ago,
                they can focus their pre-use inspection on changes since storage &mdash;
                corrosion, mechanism function, and any new damage &mdash; rather than starting
                from scratch.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Creating a Tower Inspection Culture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Creating a Tower Inspection Culture
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rules and procedures are only effective if they are followed consistently. The
                best organisations do not rely on enforcement alone &mdash; they build a
                culture where inspection is routine, expected, and valued. This means every
                person on site understands why inspections matter and takes ownership of the
                process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Leadership Commitment</p>
                </div>
                <p className="text-sm text-white/80">
                  Inspection culture starts at the top. When supervisors and managers visibly
                  prioritise inspections &mdash; by allocating time for them, providing proper
                  tools and forms, and never pressuring operatives to skip checks &mdash;
                  the message is clear: inspection is not optional. When leaders cut corners
                  on inspection, everyone else follows.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Building the Culture</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">Training reinforcement:</strong> Initial PASMA training establishes knowledge, but it must be reinforced through toolbox talks, refresher sessions, and on-site coaching. Knowledge fades without reinforcement.</p>
                  <p><strong className="text-white">Near-miss reporting:</strong> Create an environment where near-misses are reported without blame. Every near-miss is a lesson that could prevent a serious incident. If people fear punishment for reporting, they stay silent.</p>
                  <p><strong className="text-white">Learning from incidents:</strong> When an incident or near-miss occurs, share the lessons with the entire team. Explain what happened, why it happened, and what changes have been made. Transparency builds trust and understanding.</p>
                  <p><strong className="text-white">Recognition:</strong> Recognise and praise good inspection practice. When someone finds and reports a defect, that is a success &mdash; they may have prevented a serious incident. Celebrate the catch, not just the absence of accidents.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Making Inspection Routine</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Build inspection into the daily programme as a timed activity, not an afterthought</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Provide dedicated inspection checklists that prompt thorough checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Assign inspection responsibilities to named individuals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Review inspection records regularly to identify patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Act on findings promptly &mdash; if reports lead to no action, people stop reporting</span>
                  </li>
                </ul>
              </div>

              <p>
                An effective inspection culture reduces incidents, improves equipment lifespan,
                builds team confidence, and demonstrates due diligence to regulators. It is one
                of the most cost-effective safety investments any organisation can make.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 4 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-4-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Storage &amp; Maintenance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-5">
              Next: Module 5 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
