/**
 * Module 4 · Section 6 · Subsection 5 — CDM Design Risk Register
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   CDM 2015 designer duties (Regulation 9), General Principles of Prevention, hierarchy
 *   of control (eliminate / reduce / inform), electrical lifecycle hazards (shock / arc
 *   flash / WAH / confined space), design risk register entries and Health & Safety File
 *   information for handover.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'CDM Design Risk Register - HNC Module 4 Section 6.5';
const DESCRIPTION =
  'Master CDM 2015 designer duties for building services: design risk registers, significant residual risks, risk communication and design risk assessments.';

const quickCheckQuestions = [
  {
    id: 'cdm-designer',
    question: "Under CDM 2015, who is considered a 'designer'?",
    options: [
      'Only the architect named on the building contract',
      'Anyone who prepares or modifies designs affecting H&S',
      'Only chartered engineers registered with a professional body',
      'Solely the principal contractor managing the site',
    ],
    correctIndex: 1,
    explanation:
      'Under CDM 2015, a designer is anyone who prepares or modifies designs for a building project, or who arranges for others to do so, where the design may affect health and safety.',
  },
  {
    id: 'eliminate-reduce',
    question: 'What is the hierarchy of risk control for designers?',
    options: [
      'Eliminate, reduce, inform',
      'Inform, protect, train',
      'Accept, mitigate, transfer',
      'Control, monitor, review',
    ],
    correctIndex: 0,
    explanation:
      'The hierarchy is: first eliminate hazards through design, then reduce risks that cannot be eliminated, then inform about significant residual risks that remain.',
  },
  {
    id: 'residual-risk',
    question: "What is a 'significant residual risk'?",
    options: [
      'Any obvious hazard that a competent contractor would expect',
      'A risk that has been fully eliminated at design stage',
      'A risk that cannot be eliminated and is not obvious to competent contractors',
      'A routine matter already covered by standard compliance',
    ],
    correctIndex: 2,
    explanation:
      'Significant residual risks are those that cannot be eliminated through design, are not obvious to a competent contractor, and could cause serious harm if not managed.',
  },
  {
    id: 'communication',
    question: 'How should design risks be communicated to contractors?',
    options: [
      'Verbally on site once construction has already started',
      'Only after practical completion of the works',
      'By relying on the contractor to identify them independently',
      'Through the design risk register and H&S file information',
    ],
    correctIndex: 3,
    explanation:
      'Design risks must be communicated through the design risk register, drawings annotations, and information for the H&S file, ensuring contractors can manage residual risks.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'When did CDM 2015 come into force?',
    options: [
      'April 2007',
      'April 2015',
      'January 2018',
      'October 2020',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction (Design and Management) Regulations 2015 came into force on 6 April 2015, replacing CDM 2007.',
  },
  {
    id: 2,
    question: 'What are the main duty holder categories under CDM 2015?',
    options: [
      'Client, Architect, Quantity Surveyor, Site Manager, Operative',
      'Employer, Employee, Self-employed, Visitor, Public',
      'Client, Principal Designer, Designer, Principal Contractor, Contractor',
      'Developer, Planner, Inspector, Installer, Maintainer',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 defines five duty holder categories: Client, Principal Designer, Designer, Principal Contractor, and Contractor, each with specific duties.',
  },
  {
    id: 3,
    question: 'What must designers consider when preparing designs?',
    options: [
      'Only the hazards present during the construction phase',
      'Only the cost and programme implications of the design',
      'Only the hazards faced by the principal contractor',
      'Hazards during construction, maintenance, use and demolition',
    ],
    correctAnswer: 3,
    explanation:
      'Designers must consider hazards throughout the lifecycle: construction, maintenance, use, and eventual demolition or dismantling of the building.',
  },
  {
    id: 4,
    question: 'Which of the following is an electrical design decision to eliminate risk?',
    options: [
      'Designing all maintenance to be done dead by using accessible isolation',
      'Self-supporting cable with messenger attached in figure-8 profile',
      'Dust-tight and protected against continuous immersion',
      'Variable load and supply voltage to keep secondary voltage near nominal',
    ],
    correctAnswer: 0,
    explanation:
      'Designing for all maintenance to be done with circuits dead (through accessible isolation and safe systems of work) eliminates the risk of live working.',
  },
  {
    id: 5,
    question: 'What should a design risk register include?',
    options: [
      'A full schedule of test results for every circuit',
      'Hazard, design decisions, residual risks, information for others',
      'The detailed method statements for each contractor task',
      'Only the hazards that are obvious to any competent person',
    ],
    correctAnswer: 1,
    explanation:
      'A design risk register should include: identified hazards, design decisions made to address them, residual risks that remain, and information needed by others.',
  },
  {
    id: 6,
    question: 'When should design risk assessment begin?',
    options: [
      'Once construction work has started on site',
      'At practical completion, for the H&S file',
      'From the earliest design stages',
      'Only after the principal contractor is appointed',
    ],
    correctAnswer: 2,
    explanation:
      'Design risk assessment should begin at the earliest design stages when there is most opportunity to influence the design and eliminate hazards.',
  },
  {
    id: 7,
    question: 'What electrical information might be needed for the H&S file?',
    options: [
      'The tender pricing breakdown for the electrical package',
      'The contractor’s internal labour allocation records',
      'The day-to-day site diary kept during installation',
      'As-built drawings, isolation procedures, residual risks, maintenance requirements',
    ],
    correctAnswer: 3,
    explanation:
      'H&S file information includes: as-built drawings, safe isolation procedures, residual risks requiring management, maintenance access requirements, and any unusual hazards.',
  },
  {
    id: 8,
    question: 'How should designers address confined space access for electrical equipment?',
    options: [
      'Design out confined space entry where possible, or ensure safe access provisions',
      'Resident on-site support and fine-tuning of building systems',
      'Continuity of protective conductors (Regulation 643.2.1), including main and supplementary bonding',
      'Emotional intelligence can be learned and developed throughout life with deliberate practice',
    ],
    correctAnswer: 0,
    explanation:
      'Designers should first try to eliminate confined space entry through equipment positioning. Where unavoidable, ensure adequate access, ventilation and rescue provisions.',
  },
  {
    id: 9,
    question: 'What is the purpose of drawing annotations for CDM?',
    options: [
      'To record the cost of each item shown on the drawing',
      'To highlight residual risks and required precautions on drawings',
      'To indicate the manufacturer of each piece of equipment',
      'To show the installation sequence for the contractor',
    ],
    correctAnswer: 1,
    explanation:
      "CDM annotations on drawings highlight residual risks (e.g., 'High voltage - permit to work required') and required precautions directly where the hazard exists.",
  },
  {
    id: 10,
    question: 'Which of these would NOT typically be a significant residual risk to communicate?',
    options: [
      'Hidden high voltage cables in a service void',
      'Heavy equipment requiring mechanical handling',
      'A socket outlet at standard height',
      'Presence of an uninterruptible power supply (UPS)',
    ],
    correctAnswer: 2,
    explanation:
      'A standard socket outlet is obvious and expected - not a significant residual risk. Hidden HV cables, UPS (batteries may remain live), and heavy equipment require communication.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a hazard and a risk?',
    answer:
      'A hazard is something with the potential to cause harm (e.g., electricity, working at height). A risk is the likelihood of that harm occurring combined with its severity. Designers address hazards through design to reduce the resulting risk.',
  },
  {
    question: 'Do I need to record every design decision?',
    answer:
      "No - focus on significant risks. Record design decisions that address notable hazards, particularly where you've made choices to eliminate or reduce risk. Routine compliance with standards does not need individual recording.",
  },
  {
    question: 'How detailed should the risk register be?',
    answer:
      'Proportionate to the risk. High-risk items need more detail. The register should communicate clearly what the hazard is, what design decisions were made, and what residual risks remain for others to manage.',
  },
  {
    question: 'What if a client asks me to design something I consider unsafe?',
    answer:
      'Designers must not prepare designs that could endanger health and safety. If a client request conflicts with this duty, explain the risks and propose alternatives. If the client insists on an unsafe design, you should decline the instruction.',
  },
  {
    question: 'How does the Principal Designer coordinate design risks?',
    answer:
      'The Principal Designer coordinates health and safety during the pre-construction phase, ensuring designers fulfil their duties and that design risks are identified and communicated. They compile information for the H&S file.',
  },
];

const HNCModule4Section6_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 5"
            title="CDM Design Risk Register"
            description="Understanding designer duties under CDM 2015 and communicating significant residual risks."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand designer duties under CDM 2015',
              'Apply the hierarchy of risk control in design',
              'Identify significant residual risks in electrical design',
              'Create and maintain design risk registers',
              'Communicate risks through drawings and documentation',
              'Provide appropriate information for the H&S file',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'CDM 2015 Reg 9 puts a designer duty on the HNC engineer: eliminate, reduce or control foreseeable risks at design stage — not pass them to the contractor.',
              'Hierarchy of control: Eliminate → Reduce → Inform. Designed-out risk is the only risk you can guarantee won’t hurt anyone.',
              'Risk register entries are project-specific (location, equipment, mitigation) — generic registers are noise. Focus on hidden, unusual or non-obvious risks.',
              'Reg 132.16 (BS 7671) ties into CDM: any addition or alteration must be verified for the existing supply, earthing and bonding adequacy — that’s a designer responsibility.',
              'The register feeds the Pre-Construction Information (PCI) and the Health &amp; Safety File at handover. It’s a living document, not a one-shot tick.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Reg 132.16 is the BS 7671 hook into CDM designer duty. Any project that touches an
                existing installation triggers an explicit verification — supply rating, fault
                level, earthing, bonding — before the alteration can be designed. The designer
                who skips that check has not only breached BS 7671 but also failed CDM Reg 9
                (designer duty to eliminate or reduce foreseeable risk). The register entry
                says: "Existing supply rating verified — see Survey Report SR-XXX dated YYYY-MM-DD"
                or "Risk: existing supply rating unverified at design stage — survey required
                before construction."
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 132.16."
          />

          <SectionRule />

          <ConceptBlock title="Designer Duties Under CDM 2015">
            <p>
              The Construction (Design and Management) Regulations 2015 place specific duties on
              designers to consider health and safety throughout the project lifecycle. Building
              services engineers are designers under these regulations.
            </p>
            <p>
              <strong>Key designer duties (Regulation 9):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Not commence work unless client is aware of their duties</li>
              <li>Take account of general principles of prevention</li>
              <li>Eliminate foreseeable risks so far as reasonably practicable</li>
              <li>Reduce risks that cannot be eliminated</li>
              <li>Provide information about remaining significant risks</li>
            </ul>
            <p>
              <strong>General Principles of Prevention:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Avoid risks</li>
              <li>Evaluate risks that cannot be avoided</li>
              <li>Combat risks at source</li>
              <li>Adapt work to the individual</li>
              <li>Adapt to technical progress</li>
              <li>Replace dangerous with non/less dangerous</li>
              <li>Develop coherent prevention policy</li>
              <li>Give priority to collective over individual protection</li>
              <li>Give appropriate instructions</li>
            </ul>
            <p>
              <strong>Designer hierarchy of control (level / action / electrical example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Eliminate — remove the hazard — use SELV instead of mains in wet areas</li>
              <li>
                2. Reduce — minimise the risk — locate equipment at low level not height
              </li>
              <li>3. Inform — communicate residual risk — note hidden cables on drawings/register</li>
            </ul>
            <p>
              <strong>Key point:</strong> Designers must consider risks during construction,
              maintenance, use, cleaning, repair, and demolition.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Electrical Design Risk Considerations">
            <p>
              Electrical designers must consider specific hazards associated with electrical
              installations and how design decisions can eliminate or reduce these risks throughout
              the building lifecycle.
            </p>
            <p>
              <strong>Key electrical hazards to consider:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electric shock:</strong> Contact with live parts during
                construction/maintenance
              </li>
              <li>
                <strong>Arc flash:</strong> High energy release from switchgear
              </li>
              <li>
                <strong>Fire:</strong> From electrical faults or overloading
              </li>
              <li>
                <strong>Working at height:</strong> Access to ceiling-mounted equipment
              </li>
              <li>
                <strong>Confined spaces:</strong> Electrical equipment in risers/plant rooms
              </li>
              <li>
                <strong>Manual handling:</strong> Heavy equipment installation
              </li>
            </ul>
            <p>
              <strong>Design decisions to eliminate/reduce risk (hazard / design decision):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Live working — design for all maintenance to be done dead</li>
              <li>Working at height — locate equipment at accessible heights</li>
              <li>Arc flash — use arc-resistant switchgear</li>
              <li>Manual handling — split into smaller components, ensure access</li>
              <li>Confined space — adequate space, access from outside riser</li>
              <li>Cable damage — protected routes, avoid areas of future work</li>
            </ul>
            <p>
              <strong>Lifecycle considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Construction:</strong> First fix cable routes, temporary supplies
              </li>
              <li>
                <strong>Operation:</strong> Safe access for switching and monitoring
              </li>
              <li>
                <strong>Maintenance:</strong> Lamp replacement, cleaning, testing
              </li>
              <li>
                <strong>Modification:</strong> Future alterations, additions
              </li>
              <li>
                <strong>Demolition:</strong> Isolation, de-energisation, removal
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Consider maintainability at design stage — can a
              competent technician safely maintain this installation?
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Creating the Design Risk Register">
            <p>
              The design risk register documents hazards identified during design, the decisions
              made to address them, and any significant residual risks that need to be communicated
              to others.
            </p>
            <p>
              <strong>Risk register structure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reference:</strong> Unique identifier linked to drawings
              </li>
              <li>
                <strong>Location:</strong> Where the hazard exists
              </li>
              <li>
                <strong>Hazard:</strong> Description of the hazard
              </li>
              <li>
                <strong>Risk:</strong> Who might be harmed and how
              </li>
              <li>
                <strong>Design decision:</strong> Actions taken to eliminate/reduce
              </li>
              <li>
                <strong>Residual risk:</strong> What remains after design decisions
              </li>
              <li>
                <strong>Information required:</strong> What others need to know
              </li>
            </ul>
            <p>
              <strong>Example risk register entry (field / content):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ref — DRR-E-001</li>
              <li>Location — LV switchroom, Level 00</li>
              <li>Hazard — high fault current at main switchboard (25kA)</li>
              <li>Risk — arc flash injury during maintenance</li>
              <li>Design decision — arc-resistant switchgear specified</li>
              <li>Residual risk — arc flash risk during internal maintenance</li>
              <li>Information — arc flash study required, PPE to be specified</li>
            </ul>
            <p>
              <strong>What to include:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Significant hazards addressed</li>
              <li>Non-obvious residual risks</li>
              <li>Unusual installation requirements</li>
              <li>Maintenance constraints</li>
            </ul>
            <p>
              <strong>What not to include:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard compliance matters</li>
              <li>Obvious hazards (mains voltage)</li>
              <li>Generic method statements</li>
              <li>Contractor-managed risks</li>
            </ul>
            <p>
              <strong>Focus:</strong> Communicate what is unusual, hidden, or requires specific
              management — not generic hazards.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Risk Communication and H&S File">
            <p>
              Effective communication of design risks ensures that contractors during construction
              and maintainers throughout the building life can manage residual risks appropriately.
            </p>
            <p>
              <strong>Methods of communicating design risks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design risk register:</strong> Formal schedule of risks and decisions
              </li>
              <li>
                <strong>Drawing annotations:</strong> Hazard notes on relevant drawings
              </li>
              <li>
                <strong>Specification clauses:</strong> Safety requirements in NBS sections
              </li>
              <li>
                <strong>H&S file information:</strong> Data for future works
              </li>
              <li>
                <strong>Design meetings:</strong> Verbal briefings with contractors
              </li>
            </ul>
            <p>
              <strong>Drawing annotation examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>"WARNING: 11kV cables in this service trench - DNO isolation required"</li>
              <li>"NOTE: UPS battery room - ventilation must be operational before entry"</li>
              <li>"Permit to work required for all work on this switchboard"</li>
              <li>"Luminaires in this area accessible from MEWP only"</li>
            </ul>
            <p>
              <strong>H&S file information from electrical designer (information type / examples):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As-built drawings — cable routes, hidden equipment locations</li>
              <li>Safe isolation — procedures for each distribution board</li>
              <li>Residual risks — high fault levels, dual supplies, UPS</li>
              <li>Maintenance access — equipment requiring special access equipment</li>
              <li>Emergency procedures — emergency switching, fire suppression</li>
            </ul>
            <p>
              <strong>Remember:</strong> H&S file information is for future use — write for someone
              who doesn't know the building.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Starting the risk assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Review project brief for unusual requirements</li>
              <li>Walk through design considering construction sequence</li>
              <li>Consider who will maintain each element</li>
              <li>Check for interfaces with other trades</li>
            </ul>
            <p>
              <strong>Coordination with Principal Designer:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Share risk register during design reviews</li>
              <li>Coordinate with other designers on interfaces</li>
              <li>Provide H&S file information promptly</li>
              <li>Attend design coordination meetings</li>
            </ul>
            <p>
              <strong>Designer hierarchy quick reference:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Eliminate hazards through design</li>
              <li>2. Reduce risks that remain</li>
              <li>3. Inform about residual risks</li>
            </ul>
            <p>
              <strong>Lifecycle stages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Construction</li>
              <li>Operation and use</li>
              <li>Maintenance and cleaning</li>
              <li>Modification and repair</li>
              <li>Demolition</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Listing obvious hazards</strong> — "Electricity can kill" is not useful
                </li>
                <li>
                  <strong>Generic risk assessments</strong> — must be project-specific
                </li>
                <li>
                  <strong>Late consideration</strong> — start at concept, not detailed design
                </li>
                <li>
                  <strong>No follow-through</strong> — risk register not updated or communicated
                </li>
              </ul>
            }
            doInstead="Focus the register on hidden / unusual / non-obvious risks and skip the obvious ones, write entries that name specific locations and equipment on this project, start risk thinking at concept stage, and treat the register as a living document that travels into the H&S File."
          />

          <SectionRule />

          <Scenario
            title="Live-floor refurb — building the design risk register"
            situation={
              <>
                The client wants a phased ground-floor refurbishment of an occupied 5-storey
                office. Floors 1-4 stay live and tenanted throughout. Existing 1990s installation,
                no recent EICR, partial supply records. You’re leading the design and the
                Principal Designer asks for the design risk register at Stage 3.
              </>
            }
            whatToDo={
              <>
                Don’t list the obvious (working at height, working with electricity). Focus on
                designed-in or designed-around risks specific to THIS project:
                <br />
                <br />
                Risk 1: Existing supply rating, fault level and earthing arrangement unverified.
                Mitigation: Specify pre-construction electrical survey under Reg 132.16; do not
                proceed to construction until survey complete.
                <br />
                Risk 2: Tenanted floors above remain live. Mitigation: design ground-floor sub-main
                isolation independently of floors 1-4; specify mechanical interlock and
                Reg 514.15.1 warning notices at every isolation point during construction phasing.
                <br />
                Risk 3: Existing CPC continuity unverified across legacy small-power circuits.
                Mitigation: schedule continuity testing in week 1 of construction, before any new
                circuits land on the existing earth bar.
                <br />
                Risk 4: Asbestos likely in 1990s ceiling void. Mitigation: cross-reference R&amp;D
                survey; PCI to flag containment lift restrictions. Each risk has owner, date,
                action and review date. Living document — updated through Stage 4, signed off
                into the H&amp;S File at handover.
              </>
            }
            whyItMatters={
              <>
                The risk register is what the Principal Designer relies on for the Pre-Construction
                Information. Skip Reg 132.16 verification and you’re putting the contractor (and
                tenants) at risk of an undersized supply tripping under the new load — and you’re
                breaching both BS 7671 and CDM 2015.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'CDM 2015 Reg 9 designer duty: eliminate, reduce or control foreseeable risk at design stage.',
              'Hierarchy of control: Eliminate → Reduce → Inform. Don’t skip to Inform — that’s passing the risk on.',
              'Project-specific entries only. Generic risk registers waste the contractor’s time and bury real issues.',
              'Reg 132.16 verification (rating, fault level, earthing, bonding adequacy) is a designer responsibility on every refurb.',
              'Tie risks to specific locations, equipment and design decisions — name them on drawings and schedules.',
              'Risk register feeds Pre-Construction Information (PCI) and Health &amp; Safety File — it’s a project-life document.',
              'Owner, date, action, review date for every entry. Living document, signed off at each stage gate.',
              'Designer’s verification of Reg 132.16 must be evidenced — survey report, calculation, signed sign-off — never assumed.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Design calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BIM and digital delivery
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section6_5;
