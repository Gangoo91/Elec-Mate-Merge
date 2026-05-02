import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam5-s1-survey',
    question:
      'During a pre-installation site survey, the architect drawings show a 600 mm void above the suspended ceiling. On site you measure 280 mm. What do you do before quoting cable containment?',
    options: [
      'Trust the drawings — drawings are the authoritative source.',
      'Issue a Technical Query (TQ) or Request for Information (RFI) to the design team, record the measured void, photograph the area with a tape rule visible, and pause containment selection until the design is reviewed. Cable trays sized for 600 mm clearance will not fit; clipping direct to soffit may breach fire-resisting compartment lines; the design must change before procurement. The site reality always overrides the drawing once it is documented.',
      'Force the original cable tray in by bending it.',
      'Move the detectors to a different room.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 7 (Placement of interfaces) and CDM 2015 both expect designs to reflect site reality. A void measured at 280 mm cannot accept containment designed for 600 mm. The professional response is a written TQ/RFI with photographic evidence; the contract administrator coordinates the design change. Forcing the original spec creates non-compliant work and personal liability.',
  },
  {
    id: 'fam5-s1-rams',
    question:
      'Under CDM 2015, who is responsible for ensuring the fire alarm installer has a written Risk Assessment and Method Statement (RAMS) for the work?',
    options: [
      'The detector manufacturer.',
      'The Principal Contractor (PC) coordinates RAMS for all trades on a notifiable project, but the fire alarm contractor remains the duty-holder for producing their own RAMS that addresses the specific hazards of THEIR scope — working at height, hot works (if any), live-cabling near other services, dust from drilling, lone working out of hours, and disruption to the existing detection during phased installation. The PC reviews and accepts; the fire alarm contractor authors and signs.',
      'The building owner alone.',
      'No one — RAMS are optional.',
    ],
    correctIndex: 1,
    explanation:
      'CDM 2015 places duties on the client, principal designer, principal contractor and contractor. The contractor (fire alarm installer) is the duty-holder for the RAMS describing their specific work. The PC coordinates between trades. Both functions are required — the PC does not absolve the contractor of authoring their own RAMS.',
  },
  {
    id: 'fam5-s1-interface',
    question:
      'BS 5839-1:2025 clause 7 says interfaces (e.g. ancillary relay units that drive door retainers, AOV interfaces, lift homing interfaces) should be located such that they are accessible for maintenance. Which of these placements is NON-COMPLIANT?',
    options: [
      'Surface-mounted in a riser cupboard with full hinged door access.',
      "Inside an HV switchgear panel that requires power-down of an unrelated load and attendance by a different contractor before the interface enclosure can be opened. The point of clause 7 is to align with CDM 2015 — maintenance personnel must be able to reach the interface without exposing themselves to additional risks or relying on third-party attendance. Burying the interface inside another contractor's panel defeats both the maintainability and the safety intent of the clause.",
      'Above a permanent walkway with a fixed ladder providing safe access.',
      'In a clearly labelled enclosure adjacent to the CIE.',
    ],
    correctIndex: 1,
    explanation:
      'Clause 7 (new for 2025) explicitly aligns interface placement with CDM 2015 maintenance access. Locating an interface inside an HV switchgear cabinet that needs another contractor in attendance breaches both the clause and the broader CDM duty.',
  },
  {
    id: 'fam5-s1-phased',
    question:
      'Phased installation in an occupied office requires what BEFORE the new system can be switched into service for any zone?',
    options: [
      'Nothing — switch on whenever convenient.',
      'A documented changeover plan agreed with the Responsible Person under the RRO 2005, a permit-to-work for the cut-over window, the existing detection maintained as the primary system in the unconverted zones, the new system tested back-to-back with the existing in the converted zones, and a recorded changeover certificate. Occupants must not at any point be left without functioning detection covering their working area.',
      'Just disable the old panel and turn the new one on.',
      'Wait for an actual fire to test it.',
    ],
    correctIndex: 1,
    explanation:
      'Phased installation in occupied premises is a continuous-operation problem. The Regulatory Reform (Fire Safety) Order 2005 places a duty on the Responsible Person to maintain fire detection. Cut-over must be planned and documented, with both systems running until the new is verified. A permit-to-work formalises the brief outage during the changeover.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A pre-installation site survey for a fire alarm system on a refurbishment project should compare what TWO things in particular?',
    options: [
      'The cost of cable versus the cost of containment.',
      'The architect / M&E consultant drawings against the actual site reality — measured void depths, real ceiling heights, existing services routed through the same containment, fire-resisting compartments that are not on the drawings, structural beams that limit detector spacing, and access for future maintenance. Drawings are the design intent; the survey verifies what can actually be built.',
      'The colour of the panel against the colour of the wall.',
      'The lunch break times of two trades.',
    ],
    correctAnswer: 1,
    explanation:
      'The whole purpose of the pre-installation survey is to find the gaps between the design and the building. Voids smaller than drawn, services running where the design assumed clear space, fire compartments not shown on the drawings — these are the items that drive design changes, programme changes and additional cost. Catching them at survey is cheap; catching them at first-fix is expensive.',
  },
  {
    id: 2,
    question:
      'BS 5839-1:2025 clause 7 (placement of interfaces) is new emphasis aligned with which other UK regulation?',
    options: [
      'GDPR.',
      "The Construction (Design and Management) Regulations 2015 (CDM 2015) — the duty to design the work so that maintenance can be carried out safely, without exposing maintenance personnel to additional risks. An interface buried inside another trade's enclosure, or sited where attendance by a third party is needed before access, fails this duty. Interfaces must be accessible without disturbing unrelated systems.",
      'The Bribery Act.',
      'The Equality Act.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 7 in the 2025 revision pulls the placement of interfaces into alignment with CDM 2015. The intent is the same — maintenance safety. The interface is a long-life component; the maintainer needs to reach it for years to come.',
  },
  {
    id: 3,
    question: 'A material take-off (MTO) for a fire alarm installation should be produced from...?',
    options: [
      'The lump-sum price.',
      "The design drawings, specification and the verified site survey, NOT from the design alone. The MTO converts the design into a procurement list (cable lengths with allowance for routing wastage, detector quantities by type, MCPs by location, sounders, VADs, ancillaries, cable supports, fixings, glands, identification labels, tools and consumables). It feeds lead-time planning, phased delivery, and the buyer's purchase orders. An MTO produced from drawings alone, without site verification, will under- or over-order on every project.",
      'The previous job.',
      'A guess based on the contractor’s gut feeling.',
    ],
    correctAnswer: 1,
    explanation:
      'Material take-off is the bridge between design and procurement. It must be evidence-based: design drawings + specification + survey. Routing wastage and contingency are added on top, not used to mask poor measurement.',
  },
  {
    id: 4,
    question:
      'In an occupied premises, the existing fire detection must be maintained operational during a phased installation. The RESPONSIBLE PERSON for that detection during the project is...?',
    options: [
      'The fire alarm contractor.',
      'The Responsible Person (RP) under the Regulatory Reform (Fire Safety) Order 2005 — usually the building owner, occupier or employer — does not transfer to the contractor. The contractor has duties (CDM, contract, BS 5839-1) but the statutory RP duty stays with the dutyholder under the RRO. The contractor coordinates with the RP; the changeover plan is agreed jointly.',
      'The architect.',
      'No-one — the duty pauses during construction.',
    ],
    correctAnswer: 1,
    explanation:
      "The RRO 2005 places the duty on the Responsible Person and that duty is continuous. Construction does not suspend it. The contractor's job is to make sure the work supports — not breaks — the RP's ability to discharge that duty.",
  },
  {
    id: 5,
    question: 'Coordination with the structural team matters at survey because...?',
    options: [
      'They might want a coffee.',
      'Detector spacing rules under BS 5839-1:2025 21.2 are sensitive to ceiling geometry — closely-spaced beams (now defined as approximately 1 m or less centre-to-centre per the 2025 revision), ducts and obstructions deeper than 250 mm, and cell-style ceilings all change detector quantity and position. The structural drawings reveal beam depths and locations that may not be on the M&E layout. Catching this at survey lets you re-coordinate; catching it at install means moving fixed detectors.',
      'They need the panel address.',
      'They will install the cable.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 21.2.12 (treating obstructions as walls if depth exceeds 10% of ceiling height and gap above is less than 300 mm) and the new clarification of "closely-spaced beams" (approx. 1 m or less centre-to-centre) make structural geometry a detector-positioning issue. Coordinate at survey, not at install.',
  },
  {
    id: 6,
    question:
      'The Risk Assessment and Method Statement (RAMS) for a fire alarm installation must address...?',
    options: [
      'Only the detector type.',
      'The full set of hazards generated by the work: working at height (ladders, towers, MEWPs), drilling and dust (silica, asbestos awareness, control measures), hot works if any (permit, fire watch), working live or near live (isolation procedures, lock-off / tag-out), lone working out of hours (check-in regime, emergency contacts), and the impact on existing fire detection during phased work. Each hazard gets a method statement entry that the operatives sign back to confirm understanding before work starts.',
      'The cable colour.',
      'Just the price.',
    ],
    correctAnswer: 1,
    explanation:
      'RAMS is a risk-driven document. The hazards of fire alarm installation are well known and consistent; the controls must be specific to the site and signed back by the operatives. A generic RAMS pulled from a template without site-specific entries is a CDM compliance failure.',
  },
  {
    id: 7,
    question:
      'Asbestos awareness during a refurbishment fire alarm installation — the correct approach is to...?',
    options: [
      'Drill anywhere; it will be fine.',
      "Obtain and review the building's Asbestos Management Survey or, for refurbishment work, the Refurbishment & Demolition Survey (R&D survey) BEFORE any drilling, fixing or routing through ceilings, walls, voids or floors. Where ACMs are identified on the survey, the work either avoids them or proceeds under a licensed contractor with an HSE Notification of Notifiable Non-Licensed Work (NNLW) or licensed work. A pre-drill check against the survey is a non-negotiable RAMS item.",
      'Test the dust afterwards.',
      'Use a softer drill bit.',
    ],
    correctAnswer: 1,
    explanation:
      'CAR 2012 (Control of Asbestos Regulations) places a duty on the dutyholder to manage asbestos. Drilling without checking the survey is a personal criminal offence as well as a health risk. The survey is the gateway document; the RAMS records that the survey has been reviewed.',
  },
  {
    id: 8,
    question: 'Lead-time planning for a fire alarm installation matters because...?',
    options: [
      'It does not matter.',
      'Long-lead items — the CIE itself if it is a non-stocked addressable platform, voice-alarm amplifiers, beam detectors, aspirating systems, and any specials — drive the critical-path of the programme. Containment, cable, standard detectors and MCPs are typically stocked. The take-off and the lead-time list are produced together; the buyer issues purchase orders early enough that delivery aligns with the sequenced installation. A surprise four-week lead time on a panel discovered at week one of an eight-week programme is a project failure.',
      'Cable arrives quickly.',
      'Detectors are always the bottleneck.',
    ],
    correctAnswer: 1,
    explanation:
      "Programme failures on fire alarm installs are usually procurement failures. The take-off feeds the buyer; the buyer feeds the manufacturer; the manufacturer's lead time feeds the programme. Lead-time risk is identified at survey, not on the day of install.",
  },
  {
    id: 9,
    question:
      'A site survey for a sleeping-risk premises (Category L2 with sleeping rooms) under BS 5839-1:2025 needs to take into account a NEW 2025 detector restriction. That restriction is...?',
    options: [
      'Heat detectors are now mandatory in all sleeping rooms.',
      'Heat detectors should NOT be used in rooms in which people sleep, in either Category L2 or Category L3 systems for new installations. The 2025 revision recategorises sleeping rooms as high-risk and excludes heat from sleeping room protection. The change is not retrospective — existing systems continue — but new installations and system upgrades must use a smoke or multi-sensor detector in any sleeping room. The survey must record every sleeping room and the chosen detector type.',
      'Only optical smoke detectors are allowed anywhere.',
      'Heat detectors are mandatory only in kitchens.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 §14 and §15 (use and selection of detectors) reclassify sleeping rooms as high-risk. Heat detectors are not permitted in sleeping rooms in new L2/L3 work. Existing installations are not retrospective. Survey rooms by use, not by name on the drawing.',
  },
  {
    id: 10,
    question: 'The single most useful artefact to produce from a pre-installation survey is...?',
    options: [
      'A photograph of the front of the building.',
      'A marked-up site survey report with measured ceiling heights, void depths, identified obstructions, photographs cross-referenced to drawing locations, a list of design queries (TQs/RFIs) raised against the design team, the agreed phasing approach with the Responsible Person, and a confirmed material take-off and lead-time list. This single document is the bridge between design, procurement and installation; the project either runs from it or runs into trouble.',
      'A colour scheme.',
      'A list of detector model numbers only.',
    ],
    correctAnswer: 1,
    explanation:
      "A complete survey report is the only document that holds together design, procurement, programme and the Responsible Person's duty. Skip any of those threads and the install hits problems that are visible at first-fix and expensive at second-fix.",
  },
];

const FireAlarmModule5Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Pre-installation planning | Fire Alarm Module 5.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 pre-installation planning: site survey, coordination with structural / MEP / finishes / access control, material take-off, lead-time planning, RAMS under CDM 2015, interface accessibility (clause 7) and phased installation in occupied premises.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1"
            title="Pre-installation planning"
            description="Before any cable is pulled, the install is won or lost on the survey. BS 5839-1:2025 places explicit weight on the gap between design intent and site reality — and on the CDM 2015 duty to plan work for safe maintenance."
            tone="yellow"
          />

          <TLDR
            points={[
              'The pre-install survey compares architect / M&E drawings against site reality — measured void depths, ceiling heights, existing services, fire compartments, structural beams. Drawings are the intent; the survey verifies what can actually be built.',
              'BS 5839-1:2025 clause 7 (Placement of interfaces) is new emphasis: interfaces must be located so they are accessible for maintenance, aligned with CDM 2015. No interfaces buried inside HV panels or third-party enclosures.',
              'Coordination is multi-trade: structural (beam depths drive detector spacing under 21.2), MEP (containment routing), finishes (first-fix detector bases before ceiling tiles), access control (door retainers, magnetic holds, AOV interfaces, lift homing).',
              'Material take-off (MTO) is produced from drawings + specification + verified survey, never from drawings alone. Feeds procurement and the lead-time list.',
              'RAMS under CDM 2015: the contractor is the duty-holder for their own Risk Assessment and Method Statement. PC reviews and accepts; the contractor authors and signs.',
              'BS 5839-1:2025 §14/§15 exclude heat detectors from sleeping rooms in new L2/L3 work. Survey rooms by use, not by drawing label.',
              'Phased installation in occupied premises: the existing detection must remain operational. The Responsible Person (RRO 2005) duty is continuous; cut-over runs under a permit-to-work with both systems live until the new is verified.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Conduct a pre-installation site survey that compares design drawings against site reality and produces a measured, photographed, marked-up survey report',
              'Apply BS 5839-1:2025 clause 7 (Placement of interfaces) and align interface placement with CDM 2015 maintenance-access duties',
              'Coordinate fire alarm installation with structural, MEP, finishes and access control teams — identifying programme dependencies at survey, not at first-fix',
              'Produce a material take-off (MTO) and a lead-time list that drive procurement and the construction programme',
              'Author a Risk Assessment and Method Statement (RAMS) addressing the specific hazards of the work — working at height, drilling, hot works, lone working, asbestos awareness, working near existing live detection',
              'Recognise the BS 5839-1:2025 detector-selection changes (heat detectors not in sleeping rooms in new L2/L3 work) and reflect them in the survey output',
              'Plan a phased installation in occupied premises that maintains existing detection, runs under a permit-to-work cut-over, and respects the Responsible Person’s continuous RRO 2005 duty',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The site survey — drawings versus reality</ContentEyebrow>

          <ConceptBlock
            title="What the survey is for"
            plainEnglish="The pre-installation site survey is the bridge between the design and the build. The architect's general arrangement drawings and the M&E consultant's fire alarm layout describe the design intent — where detectors should go, what category of system, what containment route. The survey verifies whether that design can actually be installed in the building as it stands. Voids smaller than drawn. Services routed where the layout assumes clear space. Fire-resisting compartment lines that were never on the drawings. Structural beams that will force detector relocation under the BS 5839-1:2025 spacing rules. Every one of these issues is cheap to fix at survey and expensive at first-fix."
            onSite="Walk every room with the drawings, a tape, a torch, a borescope or endoscope camera for voids, a phone for photographs and a notebook. Mark up the drawing as you go. Photograph every measurement with the tape visible in shot — that is the evidence record."
          >
            <p>The headline survey items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Ceiling heights.</strong> Measured to the underside of the deck or suspended
                ceiling. BS 5839-1:2025 Table 3 sets the maximum ceiling height for each detector
                type; site-measured heights determine compliance, not the drawing.
              </li>
              <li>
                <strong>Void depths.</strong> Above suspended ceilings and under raised floors. A
                void up to and including 1.25 m deep accepts a detector in the top 125 mm; a void
                between 1.25 m and 1.5 m accepts a detector in the top 10 % of void depth; a void
                deeper than 1.5 m is treated as a normal-height room (detector mounted to ceiling
                with the standard 25-600 mm smoke / 25-150 mm heat below ceiling rule).
              </li>
              <li>
                <strong>Obstructions.</strong> Ducts, light fittings, beams, signs. Per 21.2.12, an
                obstruction is treated as a wall if (a) the gap between the top of the obstruction
                and the ceiling above is less than 300 mm AND (b) the obstruction is deeper than 10
                % of the overall ceiling height. Closely-spaced beams (approximately 1 m or less
                centre-to-centre per the 2025 clarification) need additional detectors.
              </li>
              <li>
                <strong>Fire-resisting compartments.</strong> Compartment walls and floors must not
                be breached without re-instatement of the fire resistance. Survey records the
                compartment lines so containment routing avoids them where practical and includes
                fire-stopping detail where penetration is unavoidable.
              </li>
              <li>
                <strong>Existing services.</strong> M&E containment, ductwork, sprinkler pipework,
                data and telecom routes that occupy the void or wall space the design assumes is
                clear. The fire alarm cable routes are re-coordinated against what is actually
                there.
              </li>
              <li>
                <strong>Structural geometry.</strong> Beam depths and spacing for detector
                positioning. Floor slab thickness for fixings. Wall construction (masonry, stud,
                demountable) for cable support and MCP fixing.
              </li>
              <li>
                <strong>Access for maintenance.</strong> Where will the maintainer reach this
                detector in five years? Permanent access, fixed ladder, MEWP, scaffold tower? If the
                answer is "we will figure it out" the survey has not done its job.
              </li>
            </ul>
            <p>
              The output is a marked-up survey report. Photographs cross-referenced to the drawing.
              Measured dimensions written on the drawing. A list of Technical Queries (TQs) or
              Requests for Information (RFIs) issued back to the design team where the design and
              the building disagree.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 7 (Placement of interfaces)"
            clause={
              <>
                For all systems and categories, the fire detection and fire alarm system interfaces
                should be located such that they are accessible for maintenance purposes. This is to
                keep in line with the requirements of The Construction (Design and Management)
                Regulations 2015, with its requirements to reduce risks to maintenance personnel.
              </>
            }
            meaning="Two phrases earn close reading. 'Accessible for maintenance' — the maintainer must reach the interface without disturbing unrelated systems or relying on a third-party attendance. 'In line with CDM 2015' — this is a design duty as well as an installation duty. Burying an ancillary relay inside an HV switchgear panel that needs power-down of an unrelated load to access is non-compliant under both BS 5839-1:2025 and CDM 2015."
          />

          <ConceptBlock
            title="Reading the building, not just the drawing"
            plainEnglish="A drawing is a model of the building. A model has gaps. The survey closes the gaps. Two patterns recur: (1) voids drawn at the design clearance the M&E consultant needed but smaller in reality because the structure has changed, lagging has been added or services have been retrofitted; (2) compartment walls not shown on the M&E layout because they are an architectural feature that was added late in design. Both make the design unbuildable as drawn. Both must be flagged before procurement."
          >
            <p>The survey discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>One drawing, one walk.</strong> Take the consultant’s fire alarm layout and
                walk the building room by room. Do not skip rooms because they look easy.
              </li>
              <li>
                <strong>Measure, do not estimate.</strong> A ceiling height that "looks about 3
                metres" is not a survey; a tape measurement of 2 870 mm with a photograph is a
                survey. The detector type may switch on that 130 mm difference.
              </li>
              <li>
                <strong>Record the void.</strong> Lift one tile per area, measure to the deck,
                photograph. Note services in the void. Note insulation depth. Note fire barriers.
              </li>
              <li>
                <strong>Mark up the drawing.</strong> Annotate measured heights and depths directly
                on the drawing. Highlight TQ items in colour. Date and sign the marked-up drawing.
              </li>
              <li>
                <strong>Photograph with reference.</strong> Every photograph cross-references to a
                location ID on the drawing. Tape rule visible in shot for measurement photographs.
              </li>
              <li>
                <strong>Issue TQs in writing.</strong> Verbal queries get lost. Issue numbered TQs
                or RFIs through the contract administrator; record the response in the survey
                report.
              </li>
            </ul>
            <p>
              At the end of the survey there is a single document — a marked-up drawing plus a
              report — that says: this is what the building actually looks like, this is the
              quantity and type of detectors we will install, these are the queries waiting on
              answers, this is the lead-time list. The project runs from this document.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Survey-and-coordination workflow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Pre-installation survey and coordination workflow
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Workflow showing the pre-installation survey feeding into coordination meetings with structural, MEP, finishes and access control teams, then producing the marked-up survey report, the material take-off, the lead-time list, the RAMS and the phasing plan."
            >
              {/* Title strip */}
              <rect
                x="20"
                y="10"
                width="780"
                height="34"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="32"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                DESIGN INTENT → SITE SURVEY → COORDINATED BUILD PACKAGE
              </text>

              {/* Design inputs (left column) */}
              <g>
                <rect
                  x="20"
                  y="70"
                  width="180"
                  height="60"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="110"
                  y="92"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Architect drawings
                </text>
                <text
                  x="110"
                  y="108"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  general arrangement
                </text>
                <text
                  x="110"
                  y="120"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  compartments, finishes
                </text>

                <rect
                  x="20"
                  y="140"
                  width="180"
                  height="60"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="110"
                  y="162"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  M&E consultant
                </text>
                <text
                  x="110"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  FA layout, category
                </text>
                <text
                  x="110"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  cause-and-effect
                </text>

                <rect
                  x="20"
                  y="210"
                  width="180"
                  height="60"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="110"
                  y="232"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Specification
                </text>
                <text
                  x="110"
                  y="248"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  products, standards
                </text>
                <text
                  x="110"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  BS 5839-1:2025
                </text>

                <rect
                  x="20"
                  y="280"
                  width="180"
                  height="60"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="110"
                  y="302"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Fire risk assessment
                </text>
                <text
                  x="110"
                  y="318"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  RP duty (RRO 2005)
                </text>
                <text
                  x="110"
                  y="330"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  phasing constraint
                </text>
              </g>

              {/* Site survey (centre) */}
              <g>
                <rect
                  x="280"
                  y="120"
                  width="240"
                  height="200"
                  rx="12"
                  fill="rgba(251,191,36,0.08)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text
                  x="400"
                  y="148"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  SITE SURVEY
                </text>
                <text
                  x="400"
                  y="164"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9.5"
                >
                  walk every room with drawings
                </text>

                <line
                  x1="296"
                  y1="180"
                  x2="504"
                  y2="180"
                  stroke="rgba(251,191,36,0.3)"
                  strokeWidth="1"
                />

                <text x="296" y="200" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • ceiling heights (tape + photo)
                </text>
                <text x="296" y="216" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • void depths (lift tile, measure)
                </text>
                <text x="296" y="232" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • obstructions per 21.2.12
                </text>
                <text x="296" y="248" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • fire-resisting compartments
                </text>
                <text x="296" y="264" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • existing services in void
                </text>
                <text x="296" y="280" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • interface accessibility (cl. 7)
                </text>
                <text x="296" y="296" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • access for maintenance
                </text>
                <text x="296" y="312" fill="rgba(255,255,255,0.85)" fontSize="10">
                  • photograph everything
                </text>
              </g>

              {/* Arrows from inputs into survey */}
              <line
                x1="200"
                y1="100"
                x2="280"
                y2="160"
                stroke="rgba(251,191,36,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="200"
                y1="170"
                x2="280"
                y2="200"
                stroke="rgba(251,191,36,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="200"
                y1="240"
                x2="280"
                y2="240"
                stroke="rgba(251,191,36,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="200"
                y1="310"
                x2="280"
                y2="280"
                stroke="rgba(251,191,36,0.45)"
                strokeWidth="1.6"
              />

              {/* Coordination teams (right top) */}
              <g>
                <rect
                  x="600"
                  y="70"
                  width="200"
                  height="60"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                />
                <text
                  x="700"
                  y="92"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Structural
                </text>
                <text
                  x="700"
                  y="108"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  beams, slab, fixings
                </text>
                <text
                  x="700"
                  y="120"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  21.2 spacing impact
                </text>

                <rect
                  x="600"
                  y="140"
                  width="200"
                  height="60"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                />
                <text
                  x="700"
                  y="162"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  MEP / containment
                </text>
                <text
                  x="700"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  routes, segregation
                </text>
                <text
                  x="700"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  interface enclosures
                </text>

                <rect
                  x="600"
                  y="210"
                  width="200"
                  height="60"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                />
                <text
                  x="700"
                  y="232"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Finishes / ceilings
                </text>
                <text
                  x="700"
                  y="248"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  first-fix base before tile
                </text>
                <text
                  x="700"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  access panels location
                </text>

                <rect
                  x="600"
                  y="280"
                  width="200"
                  height="60"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                />
                <text
                  x="700"
                  y="302"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Access control / AOV
                </text>
                <text
                  x="700"
                  y="318"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  door retainers, vents
                </text>
                <text
                  x="700"
                  y="330"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9.5"
                >
                  lift homing, c-and-e
                </text>
              </g>

              {/* Arrows from survey out to coordination */}
              <line
                x1="520"
                y1="170"
                x2="600"
                y2="100"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="520"
                y1="200"
                x2="600"
                y2="170"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="520"
                y1="240"
                x2="600"
                y2="240"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth="1.6"
              />
              <line
                x1="520"
                y1="280"
                x2="600"
                y2="310"
                stroke="rgba(168,85,247,0.45)"
                strokeWidth="1.6"
              />

              {/* Output package (bottom) */}
              <rect
                x="20"
                y="370"
                width="780"
                height="78"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="392"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                COORDINATED BUILD PACKAGE
              </text>
              <line
                x1="40"
                y1="400"
                x2="780"
                y2="400"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1"
              />
              <text x="40" y="418" fill="rgba(255,255,255,0.85)" fontSize="10">
                • marked-up survey drawing + photo log
              </text>
              <text x="40" y="434" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Material take-off (MTO) + lead-time list
              </text>
              <text x="280" y="418" fill="rgba(255,255,255,0.85)" fontSize="10">
                • RAMS (CDM 2015) — site-specific
              </text>
              <text x="280" y="434" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Phasing plan + permit-to-work
              </text>
              <text x="540" y="418" fill="rgba(255,255,255,0.85)" fontSize="10">
                • TQ / RFI register with responses
              </text>
              <text x="540" y="434" fill="rgba(255,255,255,0.85)" fontSize="10">
                • Interface placement schedule (cl. 7)
              </text>

              {/* Arrows from survey down to output */}
              <line
                x1="400"
                y1="320"
                x2="400"
                y2="370"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="2"
              />
              <polygon points="400,370 394,360 406,360" fill="#22C55E" />
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Coordination — multi-trade, multi-phase</ContentEyebrow>

          <ConceptBlock
            title="Why fire alarm coordination is different"
            plainEnglish="Most M&E trades coordinate on a containment-and-routing basis: where do my cables go, where do my pipes go, who clashes with whom. Fire alarm coordinates on those terms but adds two more axes. First, ceiling geometry directly drives detector quantity and position under BS 5839-1:2025 21.2 — a beam depth changes how many detectors you need in a room. Second, every other trade has a downstream dependency on the fire alarm: door retainers from access control, AOV interfaces from smoke ventilation, lift homing, plant shutdowns. Coordination is therefore continuous through the project, not a one-off design exercise."
          >
            <p>The four coordination interfaces:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Structural.</strong> Beam depths drive detector spacing under 21.2.12 (an
                obstruction is treated as a wall if the gap above is less than 300 mm AND the
                obstruction is deeper than 10 % of ceiling height) and the new 2025 "closely-spaced"
                definition (approximately 1 m centre-to-centre or less). Slab fixings drive cable
                support method. Coordinate at survey: catching a beam arrangement at first-fix means
                moving fitted detector bases.
              </li>
              <li>
                <strong>MEP / containment.</strong> Cable trays, ducts, sprinkler pipework,
                lighting, data cabling all compete for void space. Fire alarm cables prefer their
                own tray or basket where practical (segregation from LV power per BS 7671); in
                shared containment, segregation is by separation distance or barrier. Interface
                enclosure placement coordinated under clause 7 — accessible for maintenance, not
                inside another contractor’s panel.
              </li>
              <li>
                <strong>Finishes (ceilings, walls, floors).</strong> First-fix detector bases must
                be installed before suspended ceiling tiles. Access panels in plasterboard ceilings
                must be positioned over interfaces and junctions. Wall finishes must permit MCP
                fixing (and its 1.4 m mounting height +200 mm / -300 mm tolerance). Coordinate
                first-fix sequence with the ceiling subcontractor at programme stage.
              </li>
              <li>
                <strong>Access control, AOV, lift, plant shutdown.</strong> Each downstream system
                takes a fire signal as input; the fire alarm is the upstream provider. Cause-and-
                effect matrix is jointly developed. Interfaces are scheduled, addressed, sited per
                clause 7 and tested back-to-back at commissioning. The cause-and-effect output is
                handed over (mandatory under BS 5839-1:2025 §21 documentation).
              </li>
            </ul>
            <p>
              Programme-level coordination is run through the principal contractor’s sequencing
              meetings. Fire alarm contractor attends as a regular trade plus a special trade — the
              regular trade for our own work, the special trade for the cause-and-effect interfaces
              that everyone else depends on.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="The Construction (Design and Management) Regulations 2015 · Regulation 9 (Duties of designers)"
            clause={
              <>
                A designer must take into account the general principles of prevention, and any
                pre-construction information, to eliminate, so far as is reasonably practicable,
                foreseeable risks to the health or safety of any person carrying out construction
                work, maintaining or cleaning a structure, or using a structure designed as a
                workplace.
              </>
            }
            meaning="Note 'maintaining or cleaning' alongside 'carrying out construction work'. The duty extends to the maintenance phase. Interface placement that needs an unrelated power-down to access fails the maintenance limb of this duty even if it works fine for installation. BS 5839-1:2025 clause 7 codifies the duty for fire alarm interfaces specifically."
          />

          <CommonMistake
            title="Surveying from the drawing alone"
            whatHappens="A contractor produces a take-off and a programme straight from the consultant’s fire alarm layout without walking the building. On day one of first-fix, the team finds a 280 mm void where the drawing showed 600 mm, three structural downstand beams the layout did not show, and a fire-resisting compartment wall running through the middle of an open-plan area. The detector quantity is wrong, the cable tray is the wrong size, the containment route is unbuildable, and three weeks of fixed price work have already been promised at a price that assumed the design was correct. The contractor either eats the loss or issues a contractual claim that delays the programme."
            doInstead="Walk the building before pricing where contractually possible; walk it before procurement always. The survey is not optional. A small day-rate cost up front prevents a five-figure write-off at install. If the tender process did not allow a survey, build a TQ list at start of works and hold procurement on the long-lead items until the TQs are answered."
          />

          <CommonMistake
            title="Treating RAMS as a tick-box"
            whatHappens="A generic RAMS template is pulled from the company drive, the project name is changed, the document is signed and filed. None of the site-specific hazards are addressed: the asbestos register is not reviewed, the working-at-height plan has no mention of the actual ceiling height or the access equipment available, the lone-working procedure does not have the site security number for out-of-hours, and the operatives have not signed back to confirm understanding. An incident occurs and the HSE inspection finds the RAMS is generic. The contractor is prosecuted under CDM 2015 and the individual signatories under HSWA 1974."
            doInstead="RAMS is risk-driven and site-specific. Review the building’s asbestos survey BEFORE the RAMS is written; reflect findings in the method statement. Walk the work area; record the actual access equipment needed, the actual height, the actual hazards. Each operative signs back the RAMS before they start work — that signature is the legal record they understood the controls."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Material take-off, lead time and procurement</ContentEyebrow>

          <ConceptBlock
            title="From survey to procurement"
            plainEnglish="The material take-off (MTO) is the procurement-ready list of every item the install needs, generated from the verified survey. It is the buyer’s shopping list. It feeds lead-time planning. It feeds phased delivery. It is the bridge between what the survey found and what the warehouse will ship."
          >
            <p>The MTO content (typical):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CIE.</strong> Control and Indicating Equipment — the panel itself,
                addressable platform, repeater panels if any. Often a long-lead item; PO issued
                early.
              </li>
              <li>
                <strong>Detectors.</strong> By type (optical smoke, multi-sensor, heat, beam,
                aspirating, linear heat) and by quantity. Spare allowance per the specification.
                Detector heads ordered with bases as required by the platform.
              </li>
              <li>
                <strong>MCPs.</strong> Manual call points by location and by type (resettable,
                weatherproof, with addressable interface). Transparent protective covers per the
                2025 revision recommendation. Position-confirmation labels.
              </li>
              <li>
                <strong>Sounders, VADs and combined units.</strong> By coverage requirement (65
                dB(A) general / 75 dB(A) bed-head per BS 5839-1:2025) and visual coverage per BS EN
                54-23 where VAD is the primary signal.
              </li>
              <li>
                <strong>Interfaces.</strong> Ancillary relay units, AOV interfaces, lift homing
                interfaces, plant shutdown interfaces. Quantity from the cause-and-effect matrix.
                Enclosures per the clause 7 placement schedule.
              </li>
              <li>
                <strong>Cable.</strong> Fire-resisting cable to the standard category (typically
                fire-resistant power-limited (PH 30/PH 120) per BS EN 50200, sized per the loop
                load). Length from the routing take-off plus a wastage allowance (typically 10-15 %
                depending on routing complexity).
              </li>
              <li>
                <strong>Containment.</strong> Cable tray, basket, conduit, trunking, conduit
                fittings. Sized for the cable bundle and survey-verified void clearances.
              </li>
              <li>
                <strong>Cable supports.</strong> Fire-resistant supports (metallic, with adequate
                fire performance — a 2017+ point reinforced in 2025 cabling clause 16). No reliance
                on a single point that fails before the cable does in a fire.
              </li>
              <li>
                <strong>Fixings, glands, identification.</strong> Wall plugs, anchors, cable glands,
                identification labels (zone IDs, addresses), warning labels (false alarm notice for
                installation near the CIE per the 2025 alarm transmission section).
              </li>
              <li>
                <strong>Tools and consumables.</strong> Drilling bits (plus asbestos-aware bits if
                ACMs present), batteries, test equipment, sealant, fire-stopping materials.
              </li>
            </ul>
            <p>
              The lead-time list is a sub-set of the MTO sorted by lead time. Items longer than the
              programme drive PO timing. The buyer issues POs against the lead-time list; the
              warehouse books in deliveries against the phased install programme.
            </p>
          </ConceptBlock>

          <Scenario
            title="The four-week panel lead time"
            situation="A contractor has won a fire alarm refurbishment on an eight-week programme. Survey is complete on week one. Procurement starts on week two. The CIE specified is a non-stocked addressable platform with a manufacturer lead time of four weeks. By week six the panel arrives; first-fix containment is largely done but second-fix and commissioning are now compressed into two weeks for an install that needs three. Commissioning is rushed; the cause-and-effect matrix is not fully verified at handover; a category L2 system is signed off without documented evidence of the full cause-and-effect matrix that BS 5839-1:2025 §21 makes mandatory at handover."
            whatToDo="Run the lead-time list at survey, not at procurement. The CIE is identified at survey as a four-week lead item. The PO for the panel is issued on day one of week one (or pre-survey, if the design is contractually fixed). The programme is built around the panel arrival, not the other way around. Containment, cable, standard detectors and MCPs are stocked items with short lead times and can be procured second."
            whyItMatters="A rushed commissioning is a non-compliant handover. BS 5839-1:2025 mandates the cause-and-effect matrix as a handover document; rushing risks signing off a system that has not been fully verified. The Responsible Person inherits a partial system; the contractor inherits a defects liability that cannot be discharged because the original commissioning was incomplete."
          />

          <SectionRule />

          <ContentEyebrow>RAMS under CDM 2015</ContentEyebrow>

          <ConceptBlock
            title="What a RAMS for a fire alarm install must address"
            plainEnglish="The Construction (Design and Management) Regulations 2015 (CDM 2015) place duties on the contractor to plan, manage and monitor construction work in a way that ensures, so far as is reasonably practicable, the work is carried out without risks to health or safety. The Risk Assessment and Method Statement (RAMS) is the contractor’s primary documentary evidence of having done so. It is risk-driven (the assessment) and method-driven (the statement). One without the other is not RAMS."
          >
            <p>The hazards a fire alarm RAMS must address (typical):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Working at height.</strong> Ladders, towers, MEWPs, rope access. Selection
                criteria. Inspection regime. Operative training (PASMA / IPAF). Edge protection.
                Tools tethering. Drop-zone management.
              </li>
              <li>
                <strong>Drilling and dust.</strong> Silica dust controls (M-class extraction at
                source, RPE FFP3 minimum where extraction insufficient). Anchor selection by
                substrate. Asbestos awareness training; pre-drill check against the asbestos survey;
                halt-on-find procedure if suspected ACM is encountered.
              </li>
              <li>
                <strong>Hot works.</strong> Soldering, welding (rare on fire alarm, but possible on
                cable tray modifications). Hot work permit, fire watch, extinguisher within reach,
                no work in the last hour of shift.
              </li>
              <li>
                <strong>Working live or near live.</strong> Isolation procedures. Lock-off /
                tag-out. Safe isolation tested with a known-good two-pole instrument (proving unit /
                proving voltage / proving unit again). PPE for unavoidable live work (rare,
                discouraged).
              </li>
              <li>
                <strong>Lone working out of hours.</strong> Check-in regime. Site security contact.
                Emergency contact list. Mobile phone signal coverage on site. Buddy or escort for
                higher-risk tasks.
              </li>
              <li>
                <strong>Existing detection during phased work.</strong> Specific risk: disabling
                part of the existing system temporarily. Permit-to-work; written agreement with the
                Responsible Person; compensating measures (fire watch, temporary detection,
                evacuation drill if extended) for the disabled period.
              </li>
              <li>
                <strong>Manual handling.</strong> Cable drums (often heavy), panels, batteries.
                Lifting plan. Mechanical aids (drum stand, sack truck, two-person lift). Battery
                handling specifically — sealed lead-acid batteries are heavy and contain
                electrolyte.
              </li>
              <li>
                <strong>Public / occupant interface.</strong> Working in occupied premises adjacent
                to staff or public. Barriers, signage, reroute of pedestrian traffic. Out-of-hours
                working for high-disruption activities.
              </li>
            </ul>
            <p>
              For each hazard, the assessment scores risk (probability × severity), the method
              statement describes the controls, and the operatives sign back to confirm
              understanding before the work starts. The PC reviews the RAMS as part of the
              construction phase plan and accepts it for the site.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="The Regulatory Reform (Fire Safety) Order 2005 · Article 17 (Maintenance)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons the responsible
                person must ensure that the premises and any facilities, equipment and devices
                provided in respect of the premises by virtue of this Order are subject to a
                suitable system of maintenance and are maintained in an efficient state, in
                efficient working order and in good repair.
              </>
            }
            meaning="The RP duty to maintain fire detection is continuous. Construction does not pause it. A phased fire alarm install in occupied premises must therefore plan around that duty: existing system stays live until the new is verified for the same area; cut-over runs under a written changeover plan and a permit-to-work; both systems run in parallel during the cut-over window. The contractor supports the RP in discharging the duty; the duty itself stays with the RP."
          />

          <Scenario
            title="Phased install in an occupied office over four floors"
            situation="A four-storey office is being refurbished one floor at a time over a 16-week programme. The existing fire alarm is a Category L2 conventional system, end-of-life. The new system is an addressable Category L2. Each floor is decanted, refurbished and re-occupied in turn. The fire alarm contractor must install the new system per floor as it is refurbished, while the existing system remains live on the un-refurbished floors. The Responsible Person (the building owner) cannot accept any window where occupied floors are without detection."
            whatToDo="Develop a phased changeover plan with the RP. Existing system stays live across all four floors during installation. New system is installed in parallel on each refurbished floor — first-fix containment, second-fix devices, but new system NOT switched into service yet. When the new floor is ready and re-occupied, the new system is commissioned for that floor, tested back-to-back with the existing for that floor, and a documented changeover certificate signs the handover for that floor only. The existing system continues to cover the un-refurbished floors. At project end, the existing system is decommissioned floor-by-floor matching the new system’s phased acceptance. Permits-to-work cover each cut-over; both systems are live in parallel during the cut-over window."
            whyItMatters="The RP’s RRO 2005 duty does not pause for construction. A poorly-managed cut-over leaves a floor without operable detection — a regulatory breach by the RP and a contractual failure by the contractor. The phased plan with permits-to-work and parallel running is the standard discipline; ad hoc cut-over without a plan is a regulatory failure waiting to happen."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 5839-1:2025 — what changed for the planning stage</ContentEyebrow>

          <ConceptBlock
            title="The 2025 changes that bite at planning"
            plainEnglish="Most of the BS 5839-1:2025 revision is editorial — re-numbering and alignment with BS 4422:2024 Fire Vocabulary. Several substantive changes do bite at the planning stage, and the survey output must reflect them."
          >
            <p>The planning-stage 2025 changes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Heat detectors not in sleeping rooms (new L2/L3 work).</strong> §14 use of
                heat detectors and §15 selection and application of fire detectors recategorise
                sleeping rooms as high-risk. Heat detectors are not permitted in sleeping rooms in
                new L2 / L3 systems. Existing systems are not retrospective. Survey must record room
                use and chosen detector type.
              </li>
              <li>
                <strong>Stairway lobbies require automatic detection (Category L2 update).</strong>
                Previously could be excluded as low fire-risk; now require automatic detection.
                Survey must list every stairway lobby.
              </li>
              <li>
                <strong>Closely-spaced beams clarified.</strong> Approximately 1 m or less
                centre-to-centre. The 2017 revision left this undefined; 2025 fixes it. Survey must
                measure beam spacing and apply the rule.
              </li>
              <li>
                <strong>Obstruction-as-wall criteria.</strong> 21.2.12 — gap to ceiling above less
                than 300 mm AND obstruction depth more than 10 % of ceiling height. Both criteria
                must be met. Survey records both.
              </li>
              <li>
                <strong>Interface placement under clause 7.</strong> Aligned with CDM 2015. Survey
                output includes an interface placement schedule that accounts for maintenance
                access.
              </li>
              <li>
                <strong>Cause-and-effect matrix mandatory at handover (§21).</strong> The matrix is
                authored at design, programmed at commissioning, verified at acceptance and handed
                over. Planning must allocate time for cause-and-effect verification — not optional.
              </li>
              <li>
                <strong>Variations require justification.</strong> §6 — the absence of a zone plan
                in multi-zone premises (especially sleeping risk) and the absence of ARC
                transmission in supported housing / care homes are NO LONGER acceptable variations.
                Other variations require written justification. Survey identifies any required
                variation and starts the justification log.
              </li>
              <li>
                <strong>Cable colour preference.</strong> §16 — fire alarm cable AND the LV mains
                supply preferred to be a single, common colour, RED. Take-off colour matches.
                Functional earth conductor is now PINK (was cream) per BS 7671 Amendment 2 / IEC
                60445:2021.
              </li>
              <li>
                <strong>False alarm notice.</strong> §13 alarm transmission — a false alarm notice
                near the CIE is recommended. Take-off includes the label.
              </li>
            </ul>
            <p>
              The survey deliverable must reflect each of these. A 2017-style survey applied to a
              2025-spec install will under-deliver on detector type in sleeping rooms, stairway
              lobby coverage, interface placement, cause-and-effect documentation and labelling.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Specifying heat detectors in sleeping rooms on a new L2 install"
            whatHappens="The designer carries forward a 2017-era detail that placed heat detectors in bedrooms in an L2 system. The survey takes the layout at face value. First-fix follows the layout. At the design review with the FRA team it is flagged that BS 5839-1:2025 §14 / §15 do not permit heat detectors in sleeping rooms in new L2 / L3 work. The bases are already fitted; the heads are wrong; the design must be re-issued; the bases relocated or the heads swapped to multi-sensor; the cause-and-effect matrix updated; the detector schedule re-issued. Re-work cost runs into the thousands; programme slips by a week."
            doInstead="Survey records every sleeping room and confirms detector type against §14 / §15. Where the design carries 2017 thinking forward into a 2025 install, raise a TQ to the design team before procurement. Heat detectors specified for sleeping rooms in a new install are flagged at survey, corrected at design, and never reach first-fix."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Survey before procurement. Drawings are the design intent; the survey verifies what can actually be built. Voids, ceiling heights, services, fire compartments, structural beams — all measured and photographed.',
              'BS 5839-1:2025 clause 7 (Placement of interfaces) aligns interface placement with CDM 2015 — accessible for maintenance, not buried inside another contractor’s panel.',
              'Coordination is multi-trade: structural (beam depths drive detector spacing), MEP (containment routing), finishes (first-fix bases before tile fit), access control (cause-and-effect interfaces).',
              'Material take-off (MTO) and lead-time list are produced from the verified survey, not from drawings alone. Long-lead items (CIE, voice alarm amplifiers, beam detectors, aspirating systems) drive the critical path.',
              'RAMS under CDM 2015 is risk-driven and site-specific. Working at height, drilling and dust (asbestos awareness), hot works, working live, lone working, manual handling, public / occupant interface — all addressed with controls and signed back by operatives.',
              'BS 5839-1:2025 §14 / §15: heat detectors NOT in sleeping rooms in new L2 / L3 work. Existing systems are not retrospective. Survey records room use, not just room name.',
              'Phased install in occupied premises: existing detection stays live, new system commissioned and verified before cut-over, both systems run in parallel during the cut-over window. Responsible Person duty (RRO 2005) is continuous.',
              'BS 5839-1:2025 §6: zone plan in multi-zone premises and ARC transmission in supported housing / care homes are NOT acceptable variations. Other variations require written justification recorded in the logbook.',
              'BS 5839-1:2025 §16: fire alarm cable AND LV mains preferred RED, single common colour. Functional earth PINK per IEC 60445:2021.',
              'Cause-and-effect matrix is mandatory at handover under §21. Allocate time for verification at planning — not optional, not a paperwork afterthought.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is a pre-installation site survey contractually required, or just good practice?',
                answer:
                  'Both. Most fire alarm contracts (NEC, JCT) place implied or express obligations on the contractor to verify the design is buildable; failure to survey is a risk that sits with the contractor at first-fix. BS 5839-1:2025 implicitly requires survey-level information for clause 7 (interface placement) and for §21 documentation (as-built drawings cannot be produced without survey input). Skipping the survey is a contractual and regulatory risk, not just a "nice to have".',
              },
              {
                question: 'Who pays for the survey when there are findings that change the design?',
                answer:
                  'Depends on contract. Lump-sum fixed-price contracts typically include the survey within the contractor’s price; design changes arising from findings are dealt with as Variations (compensation events under NEC, change orders under JCT). If the design as issued was unbuildable, the contractor has a strong claim for the variation cost. The survey report is the evidence base for the claim — which is why it must be photographically documented and dated.',
              },
              {
                question:
                  'How is BS 5839-1:2025 clause 7 (interface placement) different from 2017?',
                answer:
                  'The 2017 revision did not have an explicit clause requiring interface accessibility for maintenance; 2025 introduces clause 7 specifically aligning interface placement with CDM 2015. The intent is the same — interfaces should be reachable for maintenance — but the explicit clause makes the design and installation duty clear. Inspectors and assessors now look for an interface placement schedule in the handover pack.',
              },
              {
                question:
                  'Do heat detectors removed from sleeping rooms apply to existing systems?',
                answer:
                  'No. The 2025 change is not retrospective. Existing systems with heat detectors in sleeping rooms continue to operate; they are not non-compliant by virtue of the 2025 revision. The change applies to new installations and to system upgrades / extensions where new detector positions are being established. Survey records existing detector positions as found and applies the new rule only to new positions.',
              },
              {
                question: 'How long should a pre-installation survey take?',
                answer:
                  'Depends on building size and complexity. A small commercial unit: half a day. A multi-storey office: 2-3 days. A hospital or large industrial site: a week or more. Surveying too quickly produces gaps; budget the time. The survey cost is recovered many times over in avoided first-fix rework.',
              },
              {
                question:
                  'Can a Refurbishment & Demolition asbestos survey replace the management survey?',
                answer:
                  'For refurbishment work, yes — an R&D survey is intrusive and identifies ACMs that a management survey would miss. The R&D survey is the appropriate gateway document for refurbishment fire alarm installs. For routine maintenance or minor extension, the management survey is normally sufficient. The RAMS must record which survey was reviewed.',
              },
              {
                question: 'What is the legal status of RAMS — is it required by law?',
                answer:
                  'Yes, indirectly. CDM 2015 requires the contractor to plan, manage and monitor work; the RAMS is the documentary evidence of having done so. The Health and Safety at Work etc. Act 1974 also requires safe systems of work; RAMS is the documented safe system. An incident with no RAMS, or with a generic RAMS that did not address the actual hazards, is a regulatory breach.',
              },
              {
                question: 'What is the role of the cause-and-effect matrix at planning stage?',
                answer:
                  'At planning stage the cause-and-effect matrix is authored by the designer and agreed with the Responsible Person and any downstream-system stakeholders (access control, AOV, lift, plant). The survey verifies that the interfaces called up in the matrix can be sited per clause 7. Procurement orders the interface count. The matrix is then programmed at commissioning, verified at acceptance and handed over (mandatory under §21 in the 2025 revision).',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Pre-installation planning — Module 5.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-5/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Control panel installation
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule5Section1;
