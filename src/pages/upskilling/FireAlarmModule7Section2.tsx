import { ArrowLeft, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
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
    id: 'fam7-s2-funcreq',
    question:
      'Approved Document B (Fire Safety) is the route to compliance with which functional requirements of the Building Regulations 2010?',
    options: [
      'Part L (energy) and Part M (accessibility).',
      'Part B requirements B1 to B5: B1 Means of warning and escape, B2 Internal fire spread (linings), B3 Internal fire spread (structure), B4 External fire spread, B5 Access and facilities for the fire service. ADB Volume 1 covers dwellings; ADB Volume 2 covers buildings other than dwellings. Compliance with ADB is one route to satisfy the functional requirements; alternative fire-engineering routes per BS 7974 are also permitted but require demonstration of equivalence. The functional requirements are law (Schedule 1 Building Regulations 2010); ADB is guidance.',
      'Schedule 4 of BS 5839-1.',
      'Part P (electrical safety).',
    ],
    correctIndex: 1,
    explanation:
      'B1-B5 are the functional requirements. ADB is THE guidance document showing the prescriptive route to compliance. Alternative fire-engineering routes are permitted but the responsible person / designer must demonstrate equivalence — ADB is the path of least resistance.',
  },
  {
    id: 'fam7-s2-b1-detection',
    question:
      'Where in Approved Document B does the requirement for an automatic fire detection and alarm system originate?',
    options: [
      'In B5 (FRS access).',
      'In B1 (Means of warning and escape). B1 is the functional requirement that "the building shall be designed and constructed so that there are appropriate provisions for the early warning of fire, and appropriate means of escape in case of fire from the building to a place of safety outside the building capable of being safely and effectively used at all material times". ADB then references BS 5839-1 (non-domestic) and BS 5839-6 (domestic) as the codes of practice that satisfy the early-warning element. The system category and design follows BS 5839-1 / -6; the legal hook is B1.',
      'In Approved Document M.',
      'In Approved Document Q.',
    ],
    correctIndex: 1,
    explanation:
      'B1 is the legal source. ADB references BS 5839-1 / -6 as the technical route. The contractor providing a BS 5839-1 Cat L2 design is providing the technical route to B1 compliance — the regulatory chain is: B1 (law) → ADB (guidance) → BS 5839-1 (code of practice) → contractor design.',
  },
  {
    id: 'fam7-s2-vad',
    question:
      'A new-build commercial premises must include accessibility for hearing-impaired occupants. Which Approved Document drives visual alarm device (VAD) provision in fire alarm design?',
    options: [
      'ADB alone.',
      'Approved Document M (Access to and use of buildings) — for the underlying accessibility requirement that buildings be accessible to disabled persons including the hearing-impaired. The fire alarm consequence is that visual alarm devices (VADs) compliant with BS EN 54-23 are needed in areas where audible-only would not give a hearing-impaired user adequate warning. BS 5839-1 §16 deals with the technical specification of VADs (light intensity, mounting position, coverage volume). The interaction is: ADM drives the policy requirement (accessibility); BS 5839-1 drives the engineering specification (which devices, where, what coverage).',
      'Approved Document Q only.',
      'Building Safety Act regulations.',
    ],
    correctIndex: 1,
    explanation:
      'ADM is the accessibility hook. BS 5839-1 §16 + BS EN 54-23 are the engineering route to satisfying it within the fire alarm system. VAD coverage is volume-based (cubic metres covered by the C-3-15 / C-6-15 / W-2.4-15 etc category rating).',
  },
  {
    id: 'fam7-s2-gateway',
    question:
      'A new HRB is in design stage. What is "Gateway 2" under the Building Safety Act regime?',
    options: [
      'A planning permission step.',
      'The pre-construction Building Safety Regulator design check. Before construction can start, the BSR must approve the building safety case for the HRB design. This is a substantial process — far more rigorous than pre-BSA building control — and includes review of the fire strategy, structural design, fire stopping strategy, evacuation strategy, and the management plan for the golden thread. Gateway 1 is at planning stage; Gateway 2 is pre-construction; Gateway 3 is at completion before occupation. All three apply to HRBs. Building Safety Regulator (a function of the HSE) is the Building Control authority for HRBs — replaces the LABC / approved inspector route for HRB work.',
      'A final occupation sign-off only.',
      'A fire risk assessment.',
    ],
    correctIndex: 1,
    explanation:
      'Gateway 2 = pre-construction BSR design approval. The BSR replaces normal building control for HRBs. Fire alarm designers working on an HRB feed into the Gateway 2 submission via the fire strategy and the cause-and-effect — the BSR will scrutinise these.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In the regulatory chain Building Regulations → Approved Document B → BS 5839-1, which is law and which is guidance?',
    options: [
      'All three are law.',
      'The Building Regulations 2010 (Schedule 1, functional requirements B1-B5) are law — they are statutory instruments. Approved Document B is statutory guidance: it is the route to compliance authorised by the Secretary of State, but it is not the only route. Alternative fire-engineering routes per BS 7974 are permitted if equivalence is demonstrated. BS 5839-1 is a code of practice published by BSI — also not law, but referenced by ADB and treated by AHJs / insurers / courts as the de facto specification for non-domestic fire detection / alarm systems. Departures from BS 5839-1 are "variations" that must be justified and recorded.',
      'BS 5839-1 is law and ADB is guidance.',
      'ADB is law and BS 5839-1 is guidance.',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regs = law. ADB = statutory guidance (route to compliance). BS 5839-1 = code of practice (referenced by ADB, treated as de facto specification). Departures from BS 5839-1 are not illegal in themselves but require justification — the FRA, AHJ and insurer expect BS 5839-1 compliance.',
  },
  {
    id: 2,
    question: 'Approved Document B is published in two volumes. What is the split?',
    options: [
      'Old build vs new build.',
      'Volume 1 — Dwellinghouses. Volume 2 — Buildings other than dwellinghouses. The split mirrors the BS 5839 split (BS 5839-6 domestic / BS 5839-1 non-domestic). Volume 1 covers single-family dwellings, two-storey houses, three-storey houses, lofts, garages — the domestic stock. Volume 2 covers offices, retail, hospitality, healthcare, education, places of assembly, residential institutions other than family dwellings, blocks of flats (the common parts; the flats themselves are dwellings under Vol 1). The volumes are coordinated; some clauses appear in both.',
      'England vs Wales.',
      'Single storey vs multi-storey.',
    ],
    correctAnswer: 1,
    explanation:
      'Vol 1 dwellings, Vol 2 non-dwellings. Common parts of blocks of flats are Vol 2 (the common parts are not dwellings). Flat entrances and the flat interiors are Vol 1. The split is consistent with the BS 5839-1 / -6 boundary.',
  },
  {
    id: 3,
    question:
      'A 4-storey block of flats is being built. The flat entrance doors are dwellings (Vol 1) and the common parts are non-dwellings (Vol 2). Which fire detection / alarm regime applies in the common parts?',
    options: [
      'BS 5839-6 only.',
      'BS 5839-1 (non-domestic premises). The common parts of multi-occupied residential buildings are non-domestic — they are not dwellings. The fire alarm provision in the common parts (typically a Cat L5 or no system depending on the FRA / fire strategy) follows BS 5839-1. Inside each flat, BS 5839-6 applies (Grade D1 / LD2 for new build typically). The two regimes meet at the flat entrance door — which is itself within RRO scope post-Fire Safety Act 2021.',
      'No system is required.',
      'Both BS 5839-1 and BS 5839-6 throughout.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1 in the common parts (non-domestic). BS 5839-6 inside each flat (domestic). The boundary is the flat entrance door. The Fire Safety Act 2021 confirmed flat entrance doors are within RRO scope — relevant to maintenance and to the duty on responsible persons to ensure they perform their fire-resistance function.',
  },
  {
    id: 4,
    question: 'What is "competent person scheme" registration in the building control context?',
    options: [
      'A trade association membership.',
      "A scheme authorised by government under which registered installers can self-certify that their work complies with the Building Regulations, removing the need for separate building control approval for the work concerned. For fire alarm work, BAFE SP203-1 (fire detection and fire alarm systems) is the principal industry scheme. NICEIC, NAPIT and others run competent person schemes covering electrical / fire safety work. The contractor must be registered with a recognised scheme to use the self-certification route. The benefits: no separate building control charge; faster project delivery; certificates issued on completion. The obligations: the scheme audits the installer; defective work is the installer's liability.",
      'A general qualification.',
      'A planning permission.',
    ],
    correctAnswer: 1,
    explanation:
      'Competent person schemes (BAFE SP203-1 for fire detection / alarm) authorise self-certification. Registration is itself evidence of competence — important post-Hackitt where competence is a recurring theme in fire safety reform. AHJs / insurers / FRS expect to see scheme registration on contractor invoices and certificates.',
  },
  {
    id: 5,
    question: 'How does the Building Safety Act 2022 change the Building Control regime for HRBs?',
    options: [
      'It does not change building control.',
      'It replaces the normal Building Control authority (LABC or approved inspector) with the Building Safety Regulator (BSR) — a function of the HSE — for HRB work. The BSR is the Building Control authority for design (Gateway 2) and completion (Gateway 3) of HRBs. The process is materially more demanding than pre-BSA building control: a comprehensive design submission, a building safety case, evidence of competence of the principal designer and principal contractor, and BSR sign-off before construction can start (Gateway 2) and before occupation can start (Gateway 3). Mandatory occurrence reporting also bites during construction. For non-HRBs, normal building control continues — LABC or approved inspector.',
      'It abolished building control.',
      'It applied only to existing buildings.',
    ],
    correctAnswer: 1,
    explanation:
      'BSR = Building Control authority for HRBs. Two-step gateway approval (Gateway 2 design, Gateway 3 completion). The principal designer and principal contractor must demonstrate competence. The fire strategy and fire alarm cause-and-effect feed into the Gateway 2 submission.',
  },
  {
    id: 6,
    question:
      'Approved Document M imposes accessibility requirements. What is the primary fire alarm design consequence?',
    options: [
      'No design consequence.',
      'Visual alarm devices (VADs) per BS EN 54-23 in areas where hearing-impaired persons may be present and audible-only would not provide adequate warning. The technical specification of VADs (light intensity rating C-3-15 / C-6-15 etc, mounting position, coverage volume) is in BS 5839-1 §16. Vibrating-pad pillow alarms for sleeping risk where appropriate. Refuge points with two-way communication (BS 5588-8 / BS 9999) for evacuation of mobility-impaired persons. PEEPs (Personal Emergency Evacuation Plans) on the operational side. The fire alarm contribution is the VAD network and the refuge communication system.',
      'Only audible alarms.',
      'Only signage.',
    ],
    correctAnswer: 1,
    explanation:
      'ADM accessibility → BS EN 54-23 VADs → BS 5839-1 §16 specification. Refuge two-way comms link to a constantly-staffed point (typically the fire panel area). The combination satisfies ADM accessibility for fire scenarios.',
  },
  {
    id: 7,
    question:
      'Approved Document B references BS 9999 and BS 9991 as alternative compliance routes. What is the difference?',
    options: [
      'They are identical.',
      'BS 9991 — Fire safety in the design, management and use of residential buildings (code of practice; an alternative to ADB Volume 1 for residential). BS 9999 — Fire safety in the design, management and use of non-residential buildings (an alternative to ADB Volume 2 for non-residential). Both are more flexible and engineering-led than the prescriptive ADB approach. BS 9999 in particular allows risk-profiling of occupants (mobility, alertness, familiarity) to scale fire safety provisions. ADB references both as recognised alternatives. Use of BS 9991 / BS 9999 instead of ADB requires the designer to demonstrate that the equivalent level of safety is achieved.',
      'BS 9999 is law and BS 9991 is guidance.',
      'BS 9999 is for new build only.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 9991 residential, BS 9999 non-residential. Alternative compliance routes to ADB. Both engineering-led; ADB is more prescriptive. The choice between ADB and BS 9999 / 9991 is a fire strategy decision made at design stage — most schemes still use ADB as default.',
  },
  {
    id: 8,
    question:
      'A B5 (FRS access) provision common to many building types is the "fire mains". What is a fire main and where does the fire alarm system interact with it?',
    options: [
      'A pipe carrying water for cooling.',
      "A pipe installed in a building used to convey water to outlet valves for use by the FRS in firefighting. Two types: dry rising mains (charged by FRS pumping appliance on arrival) and wet rising mains (permanently charged by an electric pump). ADB sets the trigger heights — typically dry rising mains for buildings with a floor more than 18 m above ground; wet rising mains for buildings with a floor more than 50 m. The fire alarm interaction: in a Cat L1/L2 system serving a building with rising mains, the fire alarm cause-and-effect typically initiates the wet riser pump (where present) and provides indication of pump status to the firefighters' control point.",
      'A telephone line.',
      'A backup electrical supply.',
    ],
    correctAnswer: 1,
    explanation:
      'Fire mains = firefighter water supply. Dry < 18 m / 50 m thresholds vary; wet for higher buildings. The fire alarm cause-and-effect should integrate with the wet-riser pump start and provide status indication. B5 of ADB sets the requirement; BS 9990 details the engineering.',
  },
  {
    id: 9,
    question:
      'For fire alarm work in a non-HRB office refurbishment, who issues the building control completion certificate that captures the fire alarm installation?',
    options: [
      'The fire alarm contractor only.',
      'Either the Local Authority Building Control (LABC) or an Approved Inspector engaged by the project, depending on the route taken at project start. If the fire alarm contractor is registered with a competent person scheme (BAFE SP203-1 for fire detection / alarm), the contractor can self-certify their portion of the work and the certificate from the scheme is accepted by building control as evidence of compliance — no separate building control inspection of the fire alarm element required. The completion certificate from LABC / Approved Inspector covers the building project as a whole; the BAFE certificate (or equivalent) covers the fire alarm work specifically.',
      'The fire and rescue service.',
      'The HSE.',
    ],
    correctAnswer: 1,
    explanation:
      'LABC or AI for the building. Competent person scheme (BAFE SP203-1) for the fire alarm element where the contractor is scheme-registered. Two certificates, both retained by the responsible person — the building completion certificate and the fire alarm scheme certificate. Both are wanted by the FRS at audit.',
  },
  {
    id: 10,
    question:
      "Why is Approved Document B regularly revised, and what is the contractor's obligation when ADB is updated mid-project?",
    options: [
      'Cosmetic changes only.',
      "Revisions reflect lessons learned from fires, technological advances, and post-disaster reviews — Lakanal House (2009), Grenfell (2017), and the Hackitt review have all driven major changes. The 2019 amendments banned combustible materials in external walls of high-rise residential. The 2022 amendments lowered the threshold to 11 m for some provisions and added staircase / sprinkler requirements. The contractor's obligation: design must comply with the version of ADB in force at the time of building control submission (or relevant equivalent for HRBs). Where a project straddles a revision, transitional provisions in the revising instrument set out the cut-off — usually based on date of building control application or contract date. New work after a revision must comply with the new version unless transitional provisions explicitly allow the old.",
      'Always optional.',
      'Apply only to new buildings.',
    ],
    correctAnswer: 1,
    explanation:
      'ADB is dynamic — revisions absorb lessons. Transitional provisions handle mid-project revisions. The contractor must know the version in force at the relevant cut-off and design to that. Applying an out-of-date version is a building control failure that can derail handover.',
  },
];

const FireAlarmModule7Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Building Regulations | Fire Alarm Module 7.2 | Elec-Mate',
    description:
      'The Building Regulations 2010 functional requirements B1-B5, Approved Document B Volumes 1 and 2, the BS 5839-1 / -6 referencing route, accessibility (ADM), and the Building Safety Act gateway regime for HRBs.',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 2"
            title="Building Regulations"
            description="Building Regulations Schedule 1 functional requirements B1-B5 are the construction-stage law for fire safety. Approved Document B is the prescriptive route to compliance. ADB Volume 1 (dwellings) and Volume 2 (other) reference BS 5839-1 / -6 for fire detection and alarm. Approved Documents M (accessibility) and Q (security) interact. The Building Safety Act 2022 created a parallel HRB Gateway regime overseen by the BSR."
            tone="yellow"
          />

          <TLDR
            points={[
              'Building Regulations 2010 Schedule 1 — functional requirements B1-B5 are the law: B1 warning/escape, B2 internal lining spread, B3 internal structure spread, B4 external spread, B5 FRS access.',
              'Approved Document B (ADB) — statutory guidance: Volume 1 (dwellings), Volume 2 (other buildings). The prescriptive route to satisfying B1-B5.',
              'B1 references BS 5839-1 (non-domestic) and BS 5839-6 (domestic) for fire detection and alarm — that is where the FA system requirement legally originates.',
              'Approved Document M — accessibility — drives VAD (BS EN 54-23) and refuge two-way comms in the FA design.',
              'Approved Document Q — security — interacts with FA in residential entrance arrangements.',
              'Competent person schemes (BAFE SP203-1 for fire alarm) — registered installers self-certify their work, removing separate building-control inspection of the FA element.',
              'BS 9991 (residential) and BS 9999 (non-residential) — alternative engineered routes to ADB for fire strategy. ADB references them as recognised alternatives.',
              'Building Safety Act 2022 — HRB regime: Gateway 1 / 2 / 3 with the BSR as Building Control authority. Replaces normal LABC / AI for HRBs. Gateway 2 design check is substantial.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Place Building Regulations 2010 Schedule 1 (functional requirements) and Approved Document B (statutory guidance) in their correct legal positions',
              'Identify the five Part B functional requirements (B1-B5) and explain B1 as the source of the fire detection and alarm requirement',
              'Distinguish ADB Volume 1 (dwellings) and Volume 2 (other) and the BS 5839-6 / -1 referencing pattern',
              'Identify Approved Document M as the source of VAD accessibility provision and locate the technical specification in BS 5839-1 §16 + BS EN 54-23',
              'Recognise BS 9991 and BS 9999 as alternative engineered compliance routes to ADB and explain when they are used',
              'Apply the competent person scheme architecture (BAFE SP203-1) to building control compliance for fire alarm work',
              'Identify the Building Safety Act 2022 HRB threshold and the Gateway 1 / 2 / 3 regime with the BSR as Building Control authority',
              'Explain why ADB is regularly revised and how transitional provisions handle mid-project revisions',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The Building Regulations architecture</ContentEyebrow>

          <ConceptBlock
            title="From statute to specification"
            plainEnglish="UK construction law is layered. The Building Act 1984 is the parent statute that empowers the Building Regulations. The Building Regulations 2010 are a statutory instrument made under the Building Act — they are law. Schedule 1 to the Building Regulations sets out the functional requirements: high-level performance criteria across all aspects of construction, organised into Parts A through R. Part B is fire safety. Each functional requirement (B1, B2, B3, B4, B5) is a paragraph or two of statutory text. To satisfy them, the designer can follow Approved Document B (the government-published statutory guidance — prescriptive but not the only route), or follow an alternative such as BS 9999 / BS 9991 (engineered compliance), or develop a fire engineering case under BS 7974 with demonstration of equivalence."
            onSite="When a client says 'we want to comply with Building Regs', the question is which route — ADB prescriptive, or BS 9999 / 9991 engineered, or a bespoke BS 7974 fire engineering case. The route choice is a fire strategy decision made at design stage. Most schemes default to ADB because it is the cheapest and best-trodden path."
          >
            <p>The legal hierarchy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Building Act 1984.</strong> Parent statute. Empowers the Secretary of State
                to make the Building Regulations.
              </li>
              <li>
                <strong>Building Regulations 2010.</strong> Statutory instrument. Schedule 1
                contains the functional requirements (Parts A-R).
              </li>
              <li>
                <strong>Approved Document B (Fire Safety).</strong> Statutory guidance issued by the
                Secretary of State. Two volumes (Vol 1 dwellings, Vol 2 other). The prescriptive
                route to satisfying B1-B5. Following ADB is presumed compliant — but a designer is
                free to follow an alternative where they can demonstrate equivalence.
              </li>
              <li>
                <strong>BS 5839-1 (non-domestic), BS 5839-6 (domestic).</strong> Codes of practice
                referenced by ADB. Treated as the de facto specification for fire detection and
                alarm. Variations from BS 5839 are not unlawful in themselves but require
                justification; the FRA, AHJ and insurer expect compliance.
              </li>
              <li>
                <strong>BS 9999 (non-residential), BS 9991 (residential).</strong> Alternative codes
                of practice that take an engineered approach to fire strategy. ADB references both
                as recognised alternatives. More flexible than ADB but require more design
                justification.
              </li>
              <li>
                <strong>BS 7974.</strong> The fire engineering framework. Used where neither ADB nor
                BS 9999 / 9991 fits — bespoke buildings (atria, shopping centres, sports stadia).
                Requires a Qualified Fire Engineer.
              </li>
            </ul>
            <p>
              The contractor working on a normal scheme will encounter ADB plus BS 5839-1 / -6.
              Larger or more complex schemes may use BS 9999 or BS 9991. Bespoke buildings may use
              BS 7974. The contractor must be able to read across — the language of ADB and the
              language of BS 5839-1 are not identical, and the fire strategy document is the
              translation between them.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="The Building Regulations 2010 · Schedule 1 · Part B · Requirement B1 (Means of warning and escape)"
            clause={
              <>
                The building shall be designed and constructed so that there are appropriate
                provisions for the early warning of fire, and appropriate means of escape in case of
                fire from the building to a place of safety outside the building capable of being
                safely and effectively used at all material times.
              </>
            }
            meaning="Two operative phrases. 'Early warning of fire' — the legal hook for fire detection / alarm systems. ADB and BS 5839-1 / -6 are the technical route to satisfying this. 'Capable of being safely and effectively used at all material times' — escape routes must work whenever needed, not just on the day of occupation. This is the functional requirement that sits behind every BS 5839 sounder location and every ADM / BS 5588 / BS 9999 escape route design."
          />

          <ConceptBlock
            title="The five Part B functional requirements"
            plainEnglish="Part B is structured around the lifecycle of a fire. B1 deals with the moment of fire detection and the escape that follows. B2 deals with how the fire grows internally — the flammability of linings (walls, ceilings) that controls early flame-spread. B3 deals with the structural collapse and internal compartment failure as the fire develops. B4 deals with external fire spread to neighbouring buildings or to other parts of the same building. B5 deals with the firefighters arriving and what they need to do their job. Each functional requirement has its own technical chapter in ADB."
          >
            <p>The five requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>B1 Means of warning and escape.</strong> Early warning + safe escape.
                Detection / alarm system, escape route design, travel distances, exit widths,
                lighting, signage. ADB references BS 5839-1 / -6 for fire alarm; BS 5266 for
                emergency lighting; BS 5499 for safety signs.
              </li>
              <li>
                <strong>B2 Internal fire spread (linings).</strong> Walls, ceilings, exposed
                surfaces must not contribute to early flame-spread. Class A1, A2, B, C, D rating per
                BS EN 13501-1 (fire reaction). ADB sets minimum class by use and area.
              </li>
              <li>
                <strong>B3 Internal fire spread (structure).</strong> Structural elements (walls,
                floors, columns) must maintain stability for a specified period in fire.
                Compartmentation prevents fire and smoke moving between parts of the building. ADB
                sets minimum periods by building type and height.
              </li>
              <li>
                <strong>B4 External fire spread.</strong> External walls and roofs must resist fire
                spread. Combustible cladding restrictions (post-Grenfell amendments to ADB tightened
                this materially). Boundary distances. Roof coverings.
              </li>
              <li>
                <strong>B5 Access and facilities for the fire service.</strong> Vehicle access to
                the building. Firefighting shafts. Fire mains. Smoke ventilation. Firefighters'
                lifts in tall buildings. The fire alarm cause-and-effect typically integrates with
                B5 systems (smoke vent, wet riser pump start, lift call-down).
              </li>
            </ul>
            <p>
              For the fire alarm contractor, B1 is the primary hook — that is where the detection /
              alarm requirement legally originates. But B5 matters because the cause-and-effect
              typically interacts with B5 systems. A correctly programmed cause-and-effect is part
              of the technical route to B5 compliance.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document B (Fire Safety) Volume 2 · §1 (Fire detection and fire alarm systems)"
            clause={
              <>
                A fire detection and fire alarm system in accordance with BS 5839-1 should be
                provided in all buildings other than dwellinghouses except in those buildings where
                a manual system in accordance with category M of BS 5839-1 is sufficient. The
                category of system installed should be in accordance with the recommendations of BS
                5839-1.
              </>
            }
            meaning="ADB Vol 2 §1 routes the fire alarm requirement to BS 5839-1 explicitly. The category (M, L1-L5, P1-P2) is a BS 5839-1 question, but the legal authority is ADB Vol 2. Following BS 5839-1 satisfies B1 by way of ADB."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Diagram — Approved Document B compliance route</ContentEyebrow>

          {/* ADB compliance route diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              ADB compliance route map — fire alarm system
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Approved Document B compliance route map. Building Regulations Schedule 1 functional requirements B1-B5 are the law. ADB Volumes 1 and 2 provide the prescriptive route. Volume 1 references BS 5839-6 for dwellings. Volume 2 references BS 5839-1 for non-domestic. ADM drives accessibility / VAD. ADQ drives security interactions. Alternative routes via BS 9991 / 9999 / 7974 are permitted with demonstration of equivalence."
            >
              {/* Top — Building Regulations 2010 Schedule 1 Part B */}
              <g>
                <rect
                  x="220"
                  y="20"
                  width="440"
                  height="60"
                  rx="10"
                  fill="rgba(251,191,36,0.12)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text
                  x="440"
                  y="44"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="12"
                  fontWeight="bold"
                >
                  LAW: Building Regulations 2010, Schedule 1, Part B
                </text>
                <text x="440" y="62" textAnchor="middle" fill="white" fontSize="10">
                  B1 warning/escape · B2 linings · B3 structure · B4 external · B5 FRS access
                </text>
              </g>

              {/* Down arrow */}
              <line
                x1="440"
                y1="85"
                x2="440"
                y2="115"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="440,115 436,107 444,107" fill="rgba(255,255,255,0.4)" />

              {/* Middle — ADB / alternatives row */}
              <g>
                <rect
                  x="20"
                  y="125"
                  width="260"
                  height="80"
                  rx="10"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <text
                  x="150"
                  y="148"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  STATUTORY GUIDANCE
                </text>
                <text
                  x="150"
                  y="166"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Approved Document B
                </text>
                <text x="150" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Vol 1 dwellings · Vol 2 other
                </text>
                <text
                  x="150"
                  y="194"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  prescriptive route
                </text>
              </g>

              <g>
                <rect
                  x="290"
                  y="125"
                  width="300"
                  height="80"
                  rx="10"
                  fill="rgba(34,211,238,0.08)"
                  stroke="#22D3EE"
                  strokeWidth="2"
                />
                <text
                  x="440"
                  y="148"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ALTERNATIVE GUIDANCE
                </text>
                <text
                  x="440"
                  y="166"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS 9991 (residential) · BS 9999 (other)
                </text>
                <text x="440" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  engineered routes — referenced by ADB
                </text>
                <text
                  x="440"
                  y="194"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  must demonstrate equivalence
                </text>
              </g>

              <g>
                <rect
                  x="600"
                  y="125"
                  width="260"
                  height="80"
                  rx="10"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="2"
                />
                <text
                  x="730"
                  y="148"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  BESPOKE
                </text>
                <text
                  x="730"
                  y="166"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS 7974 fire engineering
                </text>
                <text x="730" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  atria, stadia, complex bldgs
                </text>
                <text
                  x="730"
                  y="194"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  Qualified Fire Engineer
                </text>
              </g>

              {/* Down arrow from ADB */}
              <line
                x1="150"
                y1="210"
                x2="150"
                y2="245"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="150,245 146,237 154,237" fill="rgba(255,255,255,0.4)" />

              {/* ADB references — left column BS 5839-6 */}
              <g>
                <rect
                  x="20"
                  y="255"
                  width="260"
                  height="100"
                  rx="10"
                  fill="rgba(16,185,129,0.10)"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text
                  x="150"
                  y="278"
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ADB Vol 1 → DWELLINGS
                </text>
                <text
                  x="150"
                  y="297"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS 5839-6:2019+A1:2020
                </text>
                <text x="150" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Grade A / C / D1 / D2 / F1 / F2
                </text>
                <text x="150" y="326" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  LD1 / LD2 / LD3 coverage
                </text>
                <text x="150" y="342" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  domestic CoP — covered §7.4
                </text>
              </g>

              {/* ADB references — middle column ADM */}
              <g>
                <rect
                  x="290"
                  y="255"
                  width="300"
                  height="100"
                  rx="10"
                  fill="rgba(59,130,246,0.10)"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <text
                  x="440"
                  y="278"
                  textAnchor="middle"
                  fill="#3B82F6"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ADJACENT REQUIREMENTS
                </text>
                <text
                  x="440"
                  y="297"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  ADM (accessibility) → VAD provision
                </text>
                <text x="440" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  BS EN 54-23 + BS 5839-1 §16
                </text>
                <text
                  x="440"
                  y="326"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  ADQ (security) → entrance / locking
                </text>
                <text x="440" y="342" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  resilient against forced entry
                </text>
              </g>

              {/* ADB references — right column BS 5839-1 */}
              <g>
                <rect
                  x="600"
                  y="255"
                  width="260"
                  height="100"
                  rx="10"
                  fill="rgba(16,185,129,0.10)"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text
                  x="730"
                  y="278"
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ADB Vol 2 → NON-DOMESTIC
                </text>
                <text
                  x="730"
                  y="297"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS 5839-1:2025
                </text>
                <text x="730" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Cat M · L1-L5 · P1-P2
                </text>
                <text x="730" y="326" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  zoning, MCPs, AFD, sounders
                </text>
                <text x="730" y="342" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  non-domestic CoP — covered §7.3
                </text>
              </g>

              {/* Down arrow */}
              <line
                x1="440"
                y1="365"
                x2="440"
                y2="395"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <polygon points="440,395 436,387 444,387" fill="rgba(255,255,255,0.4)" />

              {/* Building Control row */}
              <g>
                <rect
                  x="20"
                  y="405"
                  width="400"
                  height="80"
                  rx="10"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <text
                  x="220"
                  y="428"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  BUILDING CONTROL — non-HRB
                </text>
                <text x="220" y="446" textAnchor="middle" fill="white" fontSize="10">
                  LABC or Approved Inspector
                </text>
                <text x="220" y="460" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  + competent person scheme self-cert
                </text>
                <text x="220" y="474" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  (BAFE SP203-1 for fire alarm)
                </text>
              </g>

              <g>
                <rect
                  x="440"
                  y="405"
                  width="420"
                  height="80"
                  rx="10"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.5)"
                  strokeWidth="2"
                />
                <text
                  x="650"
                  y="428"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  BUILDING CONTROL — HRB (BSA 2022)
                </text>
                <text
                  x="650"
                  y="446"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Building Safety Regulator (BSR)
                </text>
                <text x="650" y="460" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Gateway 1 (planning) · 2 (pre-construction) · 3 (completion)
                </text>
                <text x="650" y="474" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  BSR replaces normal BC — substantial design check
                </text>
              </g>

              {/* Caption strip */}
              <g>
                <rect
                  x="20"
                  y="500"
                  width="840"
                  height="30"
                  rx="6"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <text
                  x="440"
                  y="520"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontSize="9.5"
                >
                  HRB threshold (BSA 2022): ≥ 18 m height OR ≥ 7 storeys, AND ≥ 2 residential units
                </text>
              </g>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Approved Document M and Q — adjacent requirements</ContentEyebrow>

          <ConceptBlock
            title="ADM accessibility — VADs and refuges"
            plainEnglish="Approved Document M (Access to and use of buildings) is the accessibility instrument. M1 requires reasonable provision for people to gain access to and use the building and its facilities. This includes the means of escape in fire, where it interacts with B1. The fire alarm consequences fall in two areas: visual alarm devices (VADs) for hearing-impaired occupants, and refuge points for mobility-impaired occupants who cannot evacuate via stairs at the same pace as others."
          >
            <p>VAD provision — the technical route:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Where required.</strong> Areas where hearing-impaired persons may be present
                AND where audible-only alarms would not provide adequate warning (e.g. WCs, bedroom
                accommodation in hotels and care, isolated work areas, areas with high ambient
                noise).
              </li>
              <li>
                <strong>Standard.</strong> BS EN 54-23 — fire detection and fire alarm systems —
                fire alarm devices — visual alarm devices.
              </li>
              <li>
                <strong>Coverage rating.</strong> VAD category C (ceiling-mounted), W
                (wall-mounted), or O (open class). Numerical rating gives the cubic-volume coverage.
                e.g. C-3-15 covers a cylinder of 3 m radius × 15 candela; W-2.4-15 covers a square
                2.4 m × 2.4 m wall area at 15 cd.
              </li>
              <li>
                <strong>Specification in BS 5839-1.</strong> §16 covers VAD design. Coverage must
                ensure that, in the area of intended use, illuminance from a VAD reaches 0.4 lumen /
                m² at all points likely to be observed.
              </li>
            </ul>
            <p>Refuge two-way comms — the technical route:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Where required.</strong> Buildings with vertical evacuation routes used by
                mobility-impaired occupants — typically multi-storey commercial buildings, public
                buildings, large stores. Refuge area on each storey at the protected stairway head.
              </li>
              <li>
                <strong>Function.</strong> Two-way voice communication between the refuge and a
                constantly-staffed location (typically the fire panel area or a security control
                room), allowing the refuge user to confirm presence and receive instructions during
                evacuation.
              </li>
              <li>
                <strong>Standard.</strong> BS 5839-9 (2021) is the specific code of practice for
                emergency voice communication systems. BS 5588-8 (now superseded by BS 9999) covers
                refuge design.
              </li>
            </ul>
            <p>
              For the contractor, the ADM reach into fire alarm design is operationally significant.
              VAD coverage volume calculations are non-trivial — under-specifying VADs is a common
              defect that surfaces only when an FRA reviewer or AHJ asks for the coverage
              calculation. Refuge two-way comms is a separate system class but typically integrates
              with the fire alarm at a system level (panel indication of refuge call).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ADQ security — entrance arrangements"
            plainEnglish="Approved Document Q (Security — dwellings) covers reasonable resistance against forced entry, principally for new dwellings. The fire alarm interaction is indirect but real: the secure entrance arrangements (lock specifications, glazing, door composition) must not impede emergency egress. The fire alarm system frequently interacts with electronic access control — fail-safe / fail-secure relays, override on fire alarm, magnetic lock release. The interaction is governed by BS 7273-4 (actuation of release mechanisms for doors)."
          >
            <p>Where ADQ touches fire alarm work:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maglock release on fire alarm.</strong> BS 7273-4 specifies the categories
                of actuation: A (fail-unlocked on fire signal, automatic re-lock not allowed without
                manual reset), B (fail-unlocked on fire signal, automatic re-lock allowed after
                fault recovery), C (fail-unlocked on fire OR power failure). Category A is used
                where life safety is paramount; Category C where power resilience is the concern.
              </li>
              <li>
                <strong>Final exit doors.</strong> Must release on fire alarm regardless of access
                control state. Manual override (green break-glass call point releasing the lock) is
                a common ADQ-compatible solution.
              </li>
              <li>
                <strong>Lift call-down on fire.</strong> Lifts not designated as firefighting lifts
                must return to the designated floor and park with doors open on receipt of fire
                signal. BS EN 81-73 governs the function; BS 9999 governs the strategy.
              </li>
              <li>
                <strong>Smoke vent open on fire.</strong> Smoke ventilation in protected stairways
                opens on fire signal to the appropriate zone. Cause-and-effect must capture this.
              </li>
            </ul>
            <p>
              The fire alarm cause-and-effect is the central document tying these interactions
              together. A defective cause-and-effect — one that fails to release a maglock, or fails
              to call a lift down, or fails to open a smoke vent — translates an apparent fire alarm
              "fault" into a B5 / B1 / ADQ compliance failure. The 2025 revision of BS 5839-1 makes
              the cause-and-effect (or equivalent text description) mandatory at handover. This is
              the legal teeth.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="The Building Regulations 2010 · Schedule 1 · Part B · Requirement B5 (Access and facilities for the fire service)"
            clause={
              <>
                (1) The building shall be designed and constructed so as to provide reasonable
                facilities to assist firefighters in the protection of life. (2) Reasonable
                provision shall be made within the site of the building to enable fire appliances to
                gain access to the building.
              </>
            }
            meaning="B5 sits behind firefighting lifts, fire mains, smoke vents, FRS access route. The fire alarm cause-and-effect is the technical mechanism by which the fire alarm system supports these on activation — pump start, smoke vent open, lift call-down, panel indication for the FRS arriving. A fire alarm cause-and-effect that does not address B5 systems is incomplete."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building control routes</ContentEyebrow>

          <ConceptBlock
            title="LABC, Approved Inspector and Competent Person Schemes"
            plainEnglish="Building control is the regulatory function that checks construction work for compliance with the Building Regulations. There are two routes for normal (non-HRB) work: Local Authority Building Control (LABC), the local council's building control department; or an Approved Inspector (AI), a private-sector building control body authorised by the Building Safety Regulator. Either issues a completion certificate at end. Below the project-level certificate, individual trades can use Competent Person Schemes — government-authorised registration schemes whose registered installers can self-certify their work, reducing the volume of inspection by LABC / AI. BAFE SP203-1 is the principal CPS for fire detection / alarm work."
            onSite="Ask which route the project is using. The LABC vs AI choice is usually made at project start. The CPS membership is asked of each trade separately. For fire alarm work, ask: 'Is the contractor BAFE SP203-1 registered? If yes, the certificate they issue is accepted by building control. If no, building control will need to inspect the FA installation directly.'"
          >
            <p>The building control architecture, post-Grenfell:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>LABC.</strong> Local Authority Building Control. Statutory function of the
                local council. Available everywhere. Slower in some areas; cheaper in many.
              </li>
              <li>
                <strong>Approved Inspector.</strong> Private-sector building control. Authorised by
                the BSR (post-BSA the registration regime tightened). Available across England;
                often faster and more proactive. Charges by project.
              </li>
              <li>
                <strong>Competent Person Schemes (CPS).</strong> Government-authorised schemes whose
                registered installers can self-certify. Removes the need for separate building
                control inspection of the work covered by the CPS. Examples: Part P (electrical) —
                NICEIC, NAPIT, ELECSA; fire detection / alarm — BAFE SP203-1; emergency lighting —
                BAFE SP203-4; gas — Gas Safe.
              </li>
              <li>
                <strong>BSR (HRB only).</strong> Building Safety Regulator. Replaces LABC / AI for
                HRB work. Substantial Gateway 2 / Gateway 3 process. Detailed in next subsection.
              </li>
            </ul>
            <p>
              The CPS approach has a regulatory effect beyond cost saving. Scheme registration is
              evidence of competence. The scheme audits the installer (typically annual surveillance
              visits), checks the management system, requires defined training. Post-Hackitt, where
              competence is a recurring theme, scheme registration is increasingly the minimum
              market expectation. Insurance, public sector contracts, and AHJ acceptance frequently
              require it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The BSA 2022 HRB Gateway regime"
            plainEnglish="For Higher Risk Buildings, the Building Safety Act 2022 created an entirely separate building control regime overseen by the Building Safety Regulator. The regime imposes three Gateways: Gateway 1 at planning (fire safety considered at planning), Gateway 2 before construction can start (BSR design approval), Gateway 3 before occupation can start (BSR completion approval). Gateway 2 in particular is a substantial process — far more rigorous than pre-BSA building control."
          >
            <p>The Gateway regime, in working order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Gateway 1 (planning stage).</strong> Where the development is for an HRB or
                contains one, the planning application must include a fire statement addressing site
                access for FRS, location of fire mains, water supply, etc. Planning consent is
                conditional on the fire statement being acceptable.
              </li>
              <li>
                <strong>Gateway 2 (pre-construction).</strong> Before construction can start, a full
                application is made to the BSR. The submission includes: full design drawings; fire
                strategy; structural design; competence evidence for the principal designer and
                principal contractor; the building safety case strategy; the management plan for the
                golden thread. The BSR reviews and approves, refuses, or requests changes.
                Construction cannot start until Gateway 2 is approved.
              </li>
              <li>
                <strong>Gateway 3 (completion).</strong> Before occupation can start, the BSR
                inspects and reviews the as-built information. Fire alarm cause-and-effect, fire
                strategy compliance, golden thread completeness, building safety case, occupier
                resident strategy. Approval triggers the issue of a building completion certificate;
                building cannot be occupied without it.
              </li>
              <li>
                <strong>In-occupation.</strong> The HRB must be registered with the BSR before
                occupation begins. The Principal Accountable Person submits a building safety case
                and keeps it current. Mandatory occurrence reporting bites continuously.
              </li>
            </ul>
            <p>
              For the fire alarm contractor working on an HRB, the practical consequence is that the
              design and the cause-and-effect feed directly into the Gateway 2 submission. The BSR
              will scrutinise. Variations from BS 5839-1 must be justified in writing. The quality
              of documentation is no longer a contractor's internal matter — it is part of the legal
              compliance record. Modifications during construction may require further BSR approval
              (Change Control). Modifications post-occupation feed the golden thread and may require
              BSR notification.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating ADB as the only compliance route"
            whatHappens="The fire alarm contractor encounters a complex building (an atrium, an open-plan retail, a sports stadium) and tries to design BS 5839-1 against ADB Vol 2 prescriptive provisions. The result is over-detection in some areas and under-detection in others — ADB Vol 2 does not deal cleanly with the geometry. The fire strategy author uses BS 7974 fire engineering and the contractor's BS 5839-1 design conflicts with the strategy."
            doInstead="Read the fire strategy first. The strategy tells you whether ADB, BS 9999, BS 9991 or BS 7974 is in force for this building. The fire alarm category, location of detection, sounder distribution and cause-and-effect all flow from the fire strategy. BS 5839-1 is the engineering language inside the strategy, not a parallel route. If the fire strategy is BS 7974, the BS 5839-1 design must support the engineered solution; the contractor may need a fire-engineer-author dialogue to align."
          />

          <CommonMistake
            title="Issuing a fire alarm completion certificate without checking competent person scheme registration is current"
            whatHappens="A contractor lapses BAFE SP203-1 registration (administrative oversight, missed surveillance audit) but continues to issue certificates carrying the BAFE logo. Building control accepts the certificate. Years later, an FRA review picks up the lapse — the certificates issued during the lapsed period do not have valid scheme cover. Insurance position is uncertain. Building completion certificate now has a hole."
            doInstead="Treat scheme registration as a permission to operate, not a one-off achievement. The scheme will indicate when audits are due and when a registration period ends. Diary the renewals. Do not issue scheme-marked certificates outside the registration period. If a registration lapses and is reinstated, the certificates issued in the gap may need re-issue under the renewed registration — get scheme guidance."
          />

          <Scenario
            title="The 22 m mixed-use scheme — HRB design coordination"
            situation="A mixed-use scheme: 22 m, 8 storeys. Ground and first floor are commercial (retail and offices). Second to eighth are residential (24 flats). Total of 24 residential units; the building is over 18 m. The fire alarm contractor is engaged to design (a) the BS 5839-1 system for the commercial floors plus the common parts of the residential floors, and (b) the BS 5839-6 systems within the individual flats. The project is a new build."
            whatToDo="The building is an HRB under the BSA 2022 (≥ 18 m AND ≥ 2 residential units). Building control is by the BSR via Gateway 1, 2 and 3. The fire alarm design is a Gateway 2 submission element via the fire strategy. The contractor's design must be coordinated with the principal designer and feed into the building safety case. BS 5839-1 design (Vol 2 / common parts) and BS 5839-6 design (Vol 1 / individual flats) must be coordinated at the flat-entrance-door interface (cause-and-effect — no 'flat alarm in flat' should false-trigger the common parts; common parts alarm should not flood the flats unnecessarily). The cause-and-effect document is the central artefact and must be ironclad before Gateway 2."
            whyItMatters="HRB regimes are unforgiving. A defective cause-and-effect at Gateway 2 delays the project. A defective cause-and-effect at Gateway 3 stops occupation. A defective cause-and-effect post-occupation is a mandatory occurrence reportable event and an Accountable Person breach. The contractor who treats the cause-and-effect as a back-of-the-handover-pack afterthought will fail in an HRB; the contractor who builds it as a primary deliverable from concept stage will succeed."
          />

          <SectionRule />

          <ContentEyebrow>BS 9991 / BS 9999 — engineered alternatives</ContentEyebrow>

          <ConceptBlock
            title="When the engineered route makes sense"
            plainEnglish="ADB is prescriptive — it gives specific provisions (travel distances, exit widths, compartment sizes, fire alarm categories) calibrated to typical buildings. For atypical buildings (open-plan, complex geometry, large spans, mixed use, very tall, very deep), the prescriptive provisions can be over- or under-conservative. BS 9999 (non-residential) and BS 9991 (residential) take an engineered approach: they categorise the building by use, occupant familiarity, alertness, mobility, and let the designer scale fire safety provisions accordingly. Both are referenced by ADB as recognised alternatives. BS 9991 in particular has become an increasingly common route for residential schemes post-Grenfell as the design profession has shifted toward demonstrable engineered cases."
          >
            <p>BS 9999 — key features:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Risk profiles A-C / 1-3.</strong> A-C captures occupant characteristics: A
                awake and familiar; B awake and unfamiliar; C asleep. 1-3 captures fire growth rate:
                1 slow; 2 medium; 3 fast. Combinations (A1, A2, A3, B1, B2, B3, C1, C2, C3) drive
                the level of fire precaution required.
              </li>
              <li>
                <strong>Travel distance scaling.</strong> Permissible travel distances vary by risk
                profile — more permissive for low-risk profiles than ADB; more restrictive for
                high-risk profiles.
              </li>
              <li>
                <strong>Fire alarm system selection.</strong> BS 9999 references BS 5839-1 for the
                engineering but provides additional guidance on category selection for specific
                building uses.
              </li>
              <li>
                <strong>Management of fire safety.</strong> BS 9999 explicitly addresses ongoing
                fire safety management as part of the design — recognising that the as-designed
                safety case requires active management to be sustained.
              </li>
            </ul>
            <p>BS 9991 — key features:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Single source for residential fire safety.</strong> Covers fire alarm
                systems, escape route design, compartmentation, structural fire resistance, external
                wall systems — all in one document.
              </li>
              <li>
                <strong>Post-Grenfell amendments.</strong> Updated 2024 edition addresses external
                wall systems explicitly, mirrors the regulatory tightening on combustible cladding.
              </li>
              <li>
                <strong>Fire alarm category tables.</strong> Specific guidance by building type —
                blocks of flats, supported housing, sheltered housing, HMO categories.
              </li>
            </ul>
            <p>
              The contractor encountering BS 9999 / 9991 in a fire strategy should expect more
              dialogue with the fire strategy author than under ADB. The engineered approach makes
              specific assumptions about occupant management, evacuation strategy, and ongoing
              maintenance — the fire alarm design must be coherent with those assumptions. A BS
              9999-derived Cat L4 may sit alongside an active management regime that an ADB-derived
              Cat L4 would not.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Building Regulations 2010 Sched 1 Part B (B1-B5) is the construction-stage law for fire safety. ADB Volumes 1 and 2 are statutory guidance — the prescriptive route to compliance.',
              'B1 (warning and escape) is the source of the fire alarm requirement. ADB Vol 1 references BS 5839-6 for dwellings; ADB Vol 2 references BS 5839-1 for non-domestic.',
              'ADM (accessibility) drives VAD (BS EN 54-23 / BS 5839-1 §16) provision and refuge two-way comms.',
              'ADQ (security) interacts at maglock release on fire alarm (BS 7273-4 categories A/B/C), final exit door release, lift call-down, smoke vent activation.',
              'Competent Person Schemes — BAFE SP203-1 for fire alarm — allow registered installers to self-certify, removing separate building control inspection of the FA element.',
              'BS 9999 (non-residential) and BS 9991 (residential) are alternative engineered compliance routes referenced by ADB. Used for complex / atypical buildings.',
              'BS 7974 — fire engineering framework — used for bespoke buildings (atria, stadia). Requires Qualified Fire Engineer.',
              'Building Safety Act 2022 — HRBs (≥ 18 m OR ≥ 7 storeys, AND ≥ 2 residential units): Gateway 1 / 2 / 3 with the BSR replacing normal building control. Substantial design check.',
              'Read the fire strategy first. It tells you whether ADB / BS 9999 / BS 9991 / BS 7974 is in force. The fire alarm design serves the strategy.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My client says the project is "Building Regs compliant" — is that the same as BS 5839-1 compliant?',
                answer:
                  'Not exactly the same, but closely linked. Building Regs compliance is a legal requirement (B1-B5 satisfaction). Most projects achieve it via ADB; ADB references BS 5839-1 for fire detection / alarm. So a typical project is Building Regs compliant via ADB via BS 5839-1. But a project on the BS 9999 engineered route may be Building Regs compliant without being strictly BS 5839-1 prescriptively-compliant — the engineered route allows departures provided equivalence is demonstrated. Read the fire strategy to know which route applies.',
              },
              {
                question: 'For a small office refurbishment, do I need a fire alarm at all?',
                answer:
                  'Depends on scale and use. ADB Vol 2 provides for Cat M (manual only — break glass call points and sounders, no automatic detection) as the minimum for many small premises. The trigger for AFD beyond Cat M is the FRA outcome and ADB-specific provisions (e.g. open-plan exceeding certain area, premises with sleeping risk, premises with specific hazards). Ask: what does the FRA say, and what does ADB Vol 2 §1 say for this premises type? If the answer is Cat M, then break-glass call points and sounders are sufficient. If the answer is L3 / L2 / L1 / L4 / L5 / P1 / P2, the corresponding BS 5839-1 design applies.',
              },
              {
                question: 'What does "fire strategy" mean and who writes it?',
                answer:
                  'A fire strategy is a project-level document that states how the building will achieve compliance with the Building Regulations Part B and any other relevant fire safety law (RRO, BSA). It states the route (ADB, BS 9999, BS 9991, BS 7974), the design provisions taken from each (compartmentation, escape routes, fire alarm category, smoke control, FRS facilities), and the assumptions on which the design rests (occupancy, management regime, evacuation strategy). It is written by a fire engineer or fire safety designer — typically a chartered IFE / IFSM member. The fire alarm contractor designs to the fire strategy; the fire strategy is the controlling document.',
              },
              {
                question: 'A "deemed-to-satisfy" provision in ADB — what does that mean?',
                answer:
                  'A deemed-to-satisfy (DtS) provision is a specific design solution that, if followed, is presumed to satisfy the underlying functional requirement without further demonstration. ADB is structured largely as DtS provisions. e.g. "compartment walls of 60 minutes fire resistance achieve the relevant compartmentation requirement of B3" — follow the DtS, the requirement is met. The alternative is to demonstrate equivalence by analysis, calculation or test, which is the engineered route under BS 9999 / 9991 / 7974. DtS = path of least resistance; engineered route = more flexibility, more proof.',
              },
              {
                question: 'Why was ADB significantly amended after Grenfell?',
                answer:
                  'Grenfell exposed multiple failures, prominent among them external wall combustibility. The 2018 Hackitt Review found the regulatory regime systemically inadequate. Subsequent ADB amendments banned combustible materials in external walls of high-rise residential (initially > 18 m, later extended to > 11 m for some provisions); tightened sprinkler requirements in residential buildings; required second staircases in tall residential buildings; tightened cavity barrier provisions. Each amendment captured a specific Grenfell or Hackitt finding. Further amendments are anticipated as the Building Safety Act regime beds in.',
              },
              {
                question: 'How does a Competent Person Scheme audit actually work in practice?',
                answer:
                  "BAFE SP203-1, like other CPSs, runs a registration process plus periodic surveillance audits. Registration: technical assessment of the firm's competence (qualifications of staff, design / install / commission process), management system review (ISO 9001 or equivalent), insurance and resource. Surveillance: typically annual visit by the certification body, check of recent jobs, paperwork audit, witness of an installation or commissioning, follow-up on any non-conformities. Failure can result in suspension or removal of registration. Maintaining registration is non-trivial — it requires the firm to actually run a competent management system, not merely claim one.",
              },
              {
                question:
                  'For a project that was designed under the old ADB and is being completed after a revision, which version applies?',
                answer:
                  "The transitional provisions in the revising statutory instrument are decisive. They typically set a cut-off based on date of building control application or contract date. Where the project's relevant cut-off pre-dates the revision, the old version applies. Where the cut-off post-dates, the new version applies. Mid-cycle projects can fall in awkward gaps. Ask building control which version applies; do not assume. The contractor designing to the wrong version produces a building control rejection risk.",
              },
              {
                question:
                  'Is a domestic loft conversion subject to Building Regs Part B for fire alarm?',
                answer:
                  'Yes. Loft conversions are notifiable work under the Building Regulations and Part B applies. ADB Vol 1 Section 2 deals specifically with loft conversions in single-family dwellings; the principal fire alarm requirement is interlinked smoke alarms on every storey including the new converted storey, with grade and category per BS 5839-6. New build typically requires Grade D1 LD2 or LD3 (mains-powered with non-removable rechargeable battery, escape routes plus high-risk rooms). The CPS route applies — registered fire alarm installers can self-certify the smoke alarm work.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Building Regulations — Module 7.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-7/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.3 BS 5839-1 requirements
              </div>
            </button>
          </div>

          <div className="hidden">
            <Building2 />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule7Section2;
