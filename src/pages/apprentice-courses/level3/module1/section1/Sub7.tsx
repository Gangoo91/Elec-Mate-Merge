/**
 * Module 1 · Section 1 · Subsection 7 — Building Safety Act 2022: the new framework
 * Maps to City & Guilds 2365-03 / Unit 201 / LO1 / AC 1.1
 *   AC 1.1 — "identify roles and responsibilities with regard to current relevant
 *            Health and Safety legislation"
 *
 * Layered depth (supplementary):
 *   - 2357 Unit 601 ELTK01 / AC 1.1 + 1.2 — own/others responsibilities + risks
 *
 * Post-Grenfell BSA 2022 introduced HRRB dutyholders, the Building Safety
 * Regulator and a much harder accountability regime. L3 needs to understand
 * the framework even if not directly working on HRRBs yet.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Building Safety Act 2022 — the new framework (1.1) | Level 3 Module 1.1.7 | Elec-Mate';
const DESCRIPTION =
  'L3 introduction to the Building Safety Act 2022 — Higher-Risk Building dutyholders, the Building Safety Regulator, golden thread of information, and competence requirements that affect electrical work in HRRBs.';

const checks = [
  {
    id: 'l3-m1-s1-sub7-hrrb',
    question:
      "What's a 'Higher-Risk Building' (HRRB) under the Building Safety Act 2022?",
    options: [
      "Any building containing flammable cladding, regardless of its height or the number of storeys or residential units it has.",
      "A building of at least 18 metres in height OR at least 7 storeys, AND containing at least 2 residential units.",
      "Any commercial premises over three storeys, irrespective of whether anyone lives in the building.",
      "A building of at least 30 metres in height OR at least 12 storeys, containing any mix of residential and commercial units.",
    ],
    correctIndex: 1,
    explanation:
      "The 18m / 7-storey + 2 residential threshold is the post-Grenfell HRRB definition, set in the Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023. Hospitals and care homes are also covered for the design/construction phase. Below the threshold, BSA 2022 still has effect (competence framework, Building Regs amendments, the role of Building Safety Regulator) but the in-occupation Accountable Person / Principal Accountable Person regime applies only to HRRBs.",
  },
  {
    id: 'l3-m1-s1-sub7-bsr',
    question:
      "What's the Building Safety Regulator (BSR) and where does it sit?",
    options: [
      "A trade body that represents building owners and lobbies government on building-safety policy, with no statutory enforcement powers of its own.",
      "An independent agency separate from the HSE that certifies individual electricians as competent to work on higher-risk buildings.",
      "A regulator established under BSA 2022 as a function within the HSE, overseeing building safety and standards, driving industry competence, and leading the HRRB gateway regime.",
      "A part of the local authority building control team that signs off Building Regulations applications for dwellings of any height.",
    ],
    correctIndex: 2,
    explanation:
      "BSR is hosted within the HSE and led by a Chief Inspector of Buildings. Its three statutory functions are overseeing the safety and standards of all buildings, helping the industry and building control improve competence, and leading the new HRRB regime. It has prosecution powers, can serve compliance notices, and runs the gateway regime (Gateway 1 at planning, Gateway 2 before construction, Gateway 3 before occupation). Failure at any gateway stops the project.",
  },
  {
    id: 'l3-m1-s1-sub7-golden-thread',
    question:
      "What's the 'golden thread' of information under BSA 2022?",
    options: [
      "A continuous earth conductor that must run unbroken through every floor of a higher-risk building to provide a single protective path.",
      "A digital, accurate, accessible, secure information set covering the design, construction and ongoing management of an HRRB.",
      "A dedicated fire-rated cable colour reserved for life-safety circuits in higher-risk buildings under the Building Safety Act.",
      "A continuous chain of supervision from the apprentice up to the principal contractor that must be documented on every higher-risk building.",
    ],
    correctIndex: 1,
    explanation:
      "The golden thread is held by the Accountable Person during occupation and includes design drawings, specifications, materials and product information, fire-safety strategy, evacuation arrangements and changes through the building's life — traceability of who designed, installed or changed what. It is a direct response to the Grenfell finding that nobody had a complete picture of what had been built and subsequently changed. For electrical contractors on HRRBs, the EIC and EICR records become part of the golden thread and must be transferred in a digital, accessible format.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Why was the Building Safety Act 2022 enacted?",
    options: [
      "To bring the wiring regulations into statute for the first time, replacing BS 7671 with a legally binding electrical code.",
      "As a direct response to the Grenfell Tower fire (2017) and the Hackitt Review (2018) on safety and accountability gaps in higher-risk buildings.",
      "To merge the HSE and local-authority building control into a single national inspectorate for all workplaces.",
      "To set energy-efficiency targets for new buildings as part of the UK's net-zero commitment under the Climate Change Act.",
    ],
    correctAnswer: 1,
    explanation:
      "Grenfell + Hackitt is the L3-essential context. The Hackitt Review's central finding was that the regulatory regime was fragmented, accountability was unclear, and competence was inconsistent. BSA 2022 addresses all three — introducing the new regulatory regime, the Building Safety Regulator, the dutyholder framework, the gateways and the golden thread of information.",
  },
  {
    id: 2,
    question: "What does the BSA 2022 dutyholder framework introduce for HRRBs?",
    options: [
      "A single named 'building owner' who carries sole legal responsibility for everything that happens in the building throughout its life.",
      "A requirement that every resident of a higher-risk building hold personal liability for fire safety in their own flat.",
      "Three in-occupation duty holders — Principal Accountable Person, Accountable Persons, and Responsible Person (fire) — with the PAP holding the building-safety lead.",
      "A duty on the local authority alone to manage all building-safety risks, with no obligations placed on private owners or managers.",
    ],
    correctAnswer: 2,
    explanation:
      "The dutyholder cascade: the Principal Accountable Person owns or is responsible for the structure / external walls; Accountable Persons are responsible for repair of any part of the common parts; the Responsible Person sits under the Regulatory Reform (Fire Safety) Order. The PAP must register the building, prepare a safety case, appoint a Building Safety Manager where appropriate, and engage residents. For a contractor on an HRRB, identifying the PAP is part of due diligence — they approve significant changes and hold the golden thread.",
  },
  {
    id: 3,
    question: "What are the three BSA 2022 'gateways' for HRRB construction?",
    options: [
      "Gateway 1 — at first fix; Gateway 2 — at second fix; Gateway 3 — at final test, mirroring the stages of the electrical install on site.",
      "Gateway 1 — design sign-off by the architect; Gateway 2 — sign-off by the structural engineer; Gateway 3 — sign-off by the fire engineer.",
      "Gateway 1 — planning permission; Gateway 2 — Building Regulations approval; Gateway 3 — the EICR at handover, each issued by the local authority.",
      "Gateway 1 — at planning; Gateway 2 — before construction, BSR reviews the design; Gateway 3 — before occupation, BSR signs off the as-built building.",
    ],
    correctAnswer: 3,
    explanation:
      "The gateways are BSR-held project stage-gates. Gateway 1 at planning considers fire safety and access. Gateway 2 before construction reviews the design and construction control plan — no construction can start without approval. Gateway 3 before occupation signs off the as-built building against the approved design and golden thread — no occupation without approval. Gateway 2 is a major change: building control approval used to be 'Building Regs sign-off'; now BSR holds the gate.",
  },
  {
    id: 4,
    question: "How does BSA 2022 affect the competence framework for the construction industry?",
    options: [
      "Section 2 places a competence-improvement duty on the BSR, and sector competence frameworks are driving mandatory competence for specified roles, especially on HRRBs.",
      "It abolishes apprenticeships for the construction trades and replaces them with a single university-level building-safety degree.",
      "It requires every worker on any building site to re-sit their qualifications every two years to retain a valid card.",
      "It removes the need for competence checks altogether, on the basis that the gateway regime catches any unsafe work later.",
    ],
    correctAnswer: 0,
    explanation:
      "The industry-led Competence Steering Group has produced sector competence frameworks (engineers, fire engineers, principal designers, principal contractors, electrical installers). Mandatory competence is being introduced gradually for specified roles on HRRBs and moving towards being mandatory more broadly. It affects electrical work via JIB Approved Electrician / Electrotechnical Apprenticeship grading and the IET / NICEIC / NAPIT schemes — L3 + JIB grading is the apprentice route into that.",
  },
  {
    id: 5,
    question: "What's an 'Accountable Person' under BSA 2022 for an HRRB?",
    options: [
      "The site supervisor responsible for day-to-day health and safety during the construction phase only.",
      "The person or persons holding responsibility for the structure and exterior of an HRRB during occupation.",
      "The individual resident elected by the other leaseholders to liaise with the fire service on the building's behalf.",
      "The HSE inspector assigned to monitor the building once it is occupied and to carry out annual fire inspections.",
    ],
    correctAnswer: 1,
    explanation:
      "Where there are multiple APs (e.g. structure owned by one entity and external walls by another), the Principal Accountable Person is the one with the most significant responsibility for the structure. AP and PAP are the new statutory roles with ongoing duties: register the building, prepare and revise the safety case, engage residents, manage building safety risks, maintain the golden thread.",
  },
  {
    id: 6,
    question: "How does BSA 2022 affect the standard liability period for defects?",
    options: [
      "It shortens the limitation period for residential defect claims from 6 years to 2 years, to give contractors earlier certainty.",
      "It leaves the standard 6-year limitation period unchanged, since the Act deals only with higher-risk buildings.",
      "It extends the Defective Premises Act limitation period for dwellings to 30 years for retrospective claims and 15 years for prospective claims.",
      "It removes time limits entirely, allowing a claim for a residential defect to be brought at any point in the future.",
    ],
    correctAnswer: 2,
    explanation:
      "Section 135 amends the Defective Premises Act 1972 — 30 years for work completed before BSA commencement, 15 years for work after. The 30-year retrospective liability is one of the most commercially significant changes: contractors who installed work on residential buildings up to 30 years ago can now be sued for defects. PI insurance, document retention and historical records all become much more important.",
  },
  {
    id: 7,
    question: "What's the 'safety case' the Principal Accountable Person must prepare?",
    options: [
      "A costing document that sets out the budget for managing the building's safety systems over its lifetime, submitted to the leaseholders.",
      "A one-off fire risk assessment carried out at handover and then filed, with no requirement to keep it under review.",
      "An insurance policy the owner must hold to cover the cost of any future safety remediation works on the building.",
      "A document setting out how building safety risks for the HRRB are identified, mitigated and managed, kept under review and submitted to the BSR.",
    ],
    correctAnswer: 3,
    explanation:
      "The safety case includes the fire and structural risks, the strategies for managing them, the residents' engagement strategy, and the golden thread links — submitted to the BSR with the building registration and kept under review. It proves the PAP understands the building's risks and is managing them. Electrical installation conditions, EICR currency, fire-detection-and-alarm design and EV charging infrastructure all sit inside it.",
  },
  {
    id: 8,
    question:
      "How does BSA 2022 affect electrical contractors working on non-HRRB residential buildings?",
    options: [
      "Indirectly but significantly — through extended liability, the competence framework, Building Regs amendments and a wider emphasis on traceability.",
      "Not at all — the Act is confined entirely to buildings over 18 metres, so ordinary houses and low-rise flats are wholly unaffected.",
      "It bans electrical contractors from working on any residential building unless they are registered with the Building Safety Regulator.",
      "It requires every dwelling to have a full EICR before it can be sold, replacing the existing EPC requirement.",
    ],
    correctAnswer: 0,
    explanation:
      "The 30-year extended limitation period applies to all residential defect claims; the competence framework drives certification body requirements upwards; Building Regs amendments (especially Approved Doc B fire safety) tighten requirements affecting electrical installations; and the regulatory direction emphasises traceability — EIC, EICR, designer competence, signed certificates — for all residential work. The HRRB regime is the headline, but the wider effect touches every residential job.",
  },
];

const faqs = [
  {
    question: "I'm an L3 apprentice — am I likely to work on a HRRB?",
    answer:
      "Probably not directly during L3, but increasingly during your post-qualification career. HRRBs are a small fraction of buildings, but they include many social housing blocks, hotels, hospitals (during construction), and central-city residential towers. The competence requirements are tightening, so working on HRRBs in future requires demonstrable competence — your L3 + Approved Electrician status is the foundation.",
  },
  {
    question: "Does BSA 2022 replace the Building Regulations?",
    answer:
      "No — it amends them and adds an enforcement layer for HRRBs. Building Regulations 2010 still apply; Approved Documents A-Q still set the technical standards. BSA 2022 added new Part 4 to the BRA 1984 covering HRRB construction, plus the Building Safety Regulator with cross-cutting powers. For non-HRRB work, normal building control still applies.",
  },
  {
    question: "How does the 'golden thread' work for electrical records?",
    answer:
      "The PAP holds the building's golden thread. For electrical work, this includes EIC at original installation, EICRs on each cycle, design records, alteration certificates, commissioning records of fire-detection and alarm systems, EV charging installations and any safety-critical electrical equipment. Records must be digital, accurate, accessible and secure. Paper-only records don't satisfy the golden thread for HRRBs.",
  },
  {
    question: "What's the Hackitt Review and why does it matter?",
    answer:
      "Independent Review of Building Regulations and Fire Safety, led by Dame Judith Hackitt, published 2018 after Grenfell. Its central findings — fragmented regulation, unclear accountability, weak competence, weak product control — drove the BSA 2022 design. At L3 you should be able to name the Review and its central thrust; the legal apparatus you're learning is the Review's policy answer.",
  },
  {
    question: "Are Approved Documents B, L and P still authoritative under BSA 2022?",
    answer:
      "Yes. Approved Document B (fire safety), L (energy efficiency) and P (electrical safety in dwellings) remain the primary technical guidance under the Building Regulations. BSA 2022 amends some specifics (particularly fire safety), and they are reviewed regularly. Compliance with Approved Documents is treated as evidence of compliance with the Building Regulations — same 'safe-harbour' relationship as BS 7671 to EAWR.",
  },
  {
    question: "Does Approved Document P still apply to all residential electrical work?",
    answer:
      "Yes. Approved Document P 'Electrical safety - dwellings' remains in force for all dwellings in England (Wales has separate equivalent provisions). Notifiable work (consumer unit changes, new circuits, work in special locations) must be done by a Competent Person Scheme registered installer or notified to building control. BSA 2022 didn't remove this; it added the HRRB layer on top for buildings meeting the HRRB definition.",
  },
];

export default function Sub7() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1 · Subsection 7"
            title="Building Safety Act 2022 — the new framework"
            description="L2 didn't cover BSA 2022 in any depth — it's post-Grenfell, post-Hackitt, post-2022. At L3 you need the framework even if not directly working on HRRBs yet, because the wider effect (competence, documentation, 30-year liability) reaches every residential job."
            tone="emerald"
          />

          <TLDR
            points={[
              "BSA 2022 is the post-Grenfell regulatory framework. Defines Higher-Risk Buildings (18m / 7+ storeys / 2+ residential units), creates the Building Safety Regulator (within HSE), introduces three gateways and a golden thread of information.",
              "Three in-occupation duty holders: Principal Accountable Person, Accountable Persons, Responsible Person (fire). PAP must register, prepare a safety case, engage residents, hold the golden thread.",
              "Indirect effect on all residential work: 30-year retrospective limitation period for defect claims (DPA 1972 amendments), competence framework, Building Regs amendments. Document retention, design records and certified competence become much more important.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the policy origin of BSA 2022 — Grenfell + Hackitt Review.",
              "Identify the definition of a Higher-Risk Building (18m / 7+ storeys / 2+ residential units).",
              "Identify the three BSA 2022 gateways (planning, pre-construction, pre-occupation) and the role of the Building Safety Regulator.",
              "Describe the in-occupation duty holders — Principal Accountable Person, Accountable Persons, Responsible Person — and the safety case obligation.",
              "Explain the 'golden thread' of information and its impact on electrical records (EIC, EICR, alteration certs).",
              "Recognise the indirect effect on non-HRRB residential work — 30-year liability, competence framework, Building Regs amendments.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why BSA 2022 exists — Grenfell and Hackitt</ContentEyebrow>

          <ConceptBlock
            title="The 2017 fire that reshaped UK building safety law"
            plainEnglish="The Grenfell Tower fire (June 2017) killed 72 people. The subsequent Independent Review of Building Regulations and Fire Safety, led by Dame Judith Hackitt, published in 2018, found a 'broken' regulatory system — fragmented oversight, unclear accountability, race to the bottom on standards, weak competence, and ambiguous responsibilities. The Building Safety Act 2022 is the legislative response."
            onSite="Even if you'll never work on an HRRB, knowing the policy story is L3-essential. It tells you why competence frameworks are tightening, why documentation matters more than it used to, and why a domestic EIC is now treated as a longer-life record than it once was. The legal direction of travel started in 2017 and isn't reversing."
          >
            <p>Hackitt's central diagnoses (paraphrased):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Regulation fragmented — too many overlapping bodies, none truly accountable.</li>
              <li>Competence inconsistent — no single industry framework for who can do what.</li>
              <li>Product testing and approval weak — fraudulent or misleading product claims went unchallenged.</li>
              <li>Accountability unclear — when something went wrong, no individual or body was clearly responsible.</li>
              <li>Resident voice absent — occupants had no formal route to raise safety concerns.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Building Safety Act 2022 — s.2"
            clause={
              <>
                &quot;The regulator&apos;s general functions are — (a) the building function, which
                is to secure the safety of people in or about buildings in relation to risks
                arising from buildings, and to improve the standard of buildings; (b) the
                competence function, which is to facilitate the improvement of the competence
                of industry, including in particular the competence of registered building
                inspectors and registered building control approvers, and the competence of
                persons working on or in connection with buildings.&quot;
              </>
            }
            meaning={
              <>
                BSA 2022 s.2 establishes the Building Safety Regulator&apos;s remit. Two
                functions cited here — building safety and competence — apply across all
                buildings, not just HRRBs. The competence function is what reshapes the
                construction-industry training landscape over the next decade.
              </>
            }
            cite="Source: Building Safety Act 2022 (2022 c.30), s.2."
          />

          <SectionRule />

          <ContentEyebrow>Higher-Risk Buildings and the dutyholder framework</ContentEyebrow>

          <ConceptBlock
            title="The 18m / 7-storey + 2 residential threshold"
            plainEnglish="The Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 set the HRRB definition: at least 18 metres in height OR at least 7 storeys, AND containing at least 2 residential units. Care homes and hospitals are also covered for the design and construction phase. Below the threshold, BSA 2022 still has effect (competence, gateway approach being mainstreamed) but the in-occupation regime focuses on the residential definition."
            onSite="Practical L3 awareness: most apprentices won\'t work on an HRRB during training. But you may work on the construction phase of one (a tower block being built), and the rules during construction differ. Subcontractor competence is checked, design records are demanded, and the Building Safety Regulator can serve compliance notices that stop work."
          >
            <p>The duty-holder cascade for an HRRB during occupation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Principal Accountable Person (PAP)</strong> — single PAP per HRRB.
                Person responsible for the structure and exterior. Registers the building,
                prepares safety case, engages residents, holds the golden thread.
              </li>
              <li>
                <strong>Accountable Persons (AP)</strong> — any person responsible for repair
                of any part of the common parts including the structure. Multiple APs possible.
              </li>
              <li>
                <strong>Responsible Person (RP)</strong> — under the Regulatory Reform (Fire
                Safety) Order 2005. May or may not be the same person as the PAP.
              </li>
              <li>
                <strong>Building Safety Manager (BSM)</strong> — can be appointed by the PAP
                to discharge day-to-day safety management. Initial requirement was withdrawn
                from being mandatory but role still appropriate where the PAP doesn&apos;t
                have direct competence.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The gateways and BSR oversight</ContentEyebrow>

          <ConceptBlock
            title="Three gates the Building Safety Regulator holds"
            plainEnglish="HRRB construction goes through three gateways. Gateway 1 at planning — fire safety and access considered before planning approval. Gateway 2 before construction — BSR reviews the design and construction control plan; no construction can start without approval. Gateway 3 before occupation — BSR signs off the as-built building against the approved design and the golden thread; no occupation without approval."
            onSite="For an electrical contractor on an HRRB project, the gateway regime means design records (calculations, design drawings, product specifications) become non-negotiable. A late design change can trigger a re-review at Gateway 2 with significant programme impact. The contractor\'s electrical competence needs to be evidenced; the firm\'s certifications, the operatives' qualifications and the supervisors' grading all feed in."
          >
            <p>Practical operative-level effects of the gateway regime:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design changes are formal — verbal &quot;just move it 200mm&quot; doesn&apos;t fly.</li>
              <li>Product substitutions need design-team approval; product traceability matters.</li>
              <li>Operative competence is checked; cards and certifications carried on site.</li>
              <li>Records of who did what, when and to what specification become part of the golden thread.</li>
              <li>Site induction includes BSA 2022 specifics — golden-thread input procedure, change-control protocol.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The golden thread of information</ContentEyebrow>

          <ConceptBlock
            title="Digital, accurate, accessible, secure"
            plainEnglish="The golden thread is the building\'s information record — design, construction, materials, products, fire strategy, evacuation, changes through the building\'s life. Held digitally by the Accountable Person during occupation. For electrical contractors, the EIC at original install, every EICR cycle, every alteration cert and every commissioning record becomes part of the golden thread."
            onSite="Practical L3 takeaway: paper-only certificates are increasingly unacceptable for major work. Firms working on HRRBs increasingly use cloud-based certification platforms (NICEIC online, NAPIT online, NetWorking) that produce digitally-signed records suitable for golden-thread integration."
          >
            <p>Golden thread requirements at a high level:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Digital — not paper-only.</li>
              <li>Accurate — reflects the as-built reality, not the original intent if it changed.</li>
              <li>Accessible — available to those with a duty or right to see it (residents, fire service, BSR, future contractors).</li>
              <li>Secure — protected against unauthorised access or modification.</li>
              <li>Continuous — updated as changes happen, not at end-of-project.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Defective Premises Act 1972 — s.1, as amended by Building Safety Act 2022 s.135"
            clause={
              <>
                &quot;A person taking on work for or in connection with the provision of a
                dwelling (whether the dwelling is provided by the erection or by the conversion
                or enlargement of a building) owes a duty — (a) if the dwelling is provided to
                the order of any person, to that person; and (b) without prejudice to paragraph
                (a) above, to every person who acquires an interest (whether legal or
                equitable) in the dwelling; to see that the work which he takes on is done in a
                workmanlike or, as the case may be, professional manner, with proper materials
                and so that as regards that work the dwelling will be fit for habitation when
                completed.&quot; And BSA 2022 s.135 amended the Limitation Act 1980 to extend
                the limitation period to 30 years for retrospective claims and 15 years for
                prospective claims under the Defective Premises Act.
              </>
            }
            meaning={
              <>
                The 30-year retrospective limitation is the most commercially significant
                indirect effect of BSA 2022 on electrical contractors. Work installed up to 30
                years ago can now generate claims if it&apos;s found to be defective in a way
                that makes the dwelling unfit for habitation. PI insurance, document retention
                and historical records become essential — even for firms that have never
                worked on an HRRB.
              </>
            }
            cite="Source: Defective Premises Act 1972 (1972 c.35), s.1 as amended by Building Safety Act 2022 (2022 c.30), s.135."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Indirect effects on every residential job</ContentEyebrow>

          <ConceptBlock
            title="Why BSA 2022 reaches further than HRRBs"
            plainEnglish="BSA 2022\'s HRRB regime is the headline, but its wider effects touch every residential and a great deal of commercial work. The 30-year liability, the competence framework, the Building Regs amendments and the regulatory direction-of-travel all apply broadly. L3 awareness of the framework helps you understand why your firm is tightening procedures, demanding more paperwork and asking for evidence of competence."
            onSite="If you\'re an L3 apprentice on a domestic CU change, BSA 2022 isn\'t directly in play. But the EIC you produce now might be examined in 25 years' time as part of a Defective Premises Act claim. The competence framework that\'s emerging will determine which firms can bid for major residential frameworks. Knowing the legal direction lets you make informed career choices."
          >
            <p>How BSA 2022 indirectly reaches your day-to-day at L3:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EIC and EICR record retention extended in practice — keep digital copies indefinitely.</li>
              <li>Design records (cable calcs, fault-loop calcs) now treated as part of the audit trail.</li>
              <li>Competence frameworks from Industry Competence Steering Group affect JIB grading and CPD requirements.</li>
              <li>Product traceability — where did the cable / breaker / accessory come from? — matters more for forensic claims.</li>
              <li>Building Regs Approved Document B (fire safety) tightening affects fire-rated cable, smoke detection and emergency lighting design.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <RegsCallout
            source="Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 — Reg 8(1)"
            clause={
              <>
                &quot;A building is a higher-risk building for the purposes of Part 4 of the
                Building Safety Act 2022 if it (a) is at least 18 metres in height or has at
                least 7 storeys; and (b) contains at least 2 residential units.&quot;
              </>
            }
            meaning={
              <>
                The legal HRRB definition for the in-occupation regime. The 18m / 7-storey
                threshold AND the 2-residential-unit threshold both have to be met. Hospitals
                and care homes are also covered for design and construction (Reg 7) but the
                in-occupation Accountable Person regime applies to the Reg 8 residential
                category. As a contractor, you decide whether BSA 2022 in-occupation duties
                are in play by measuring height and counting residential units —
                straightforward but easy to overlook on mixed-use buildings.
              </>
            }
            cite="Source: Higher-Risk Buildings (Descriptions and Supplementary Provisions) Regulations 2023 (SI 2023/275), Reg 8."
          />

          <SectionRule />

          <ContentEyebrow>Mandatory occurrence reporting — the Reg 6 BSA regime</ContentEyebrow>

          <ConceptBlock
            title="Like RIDDOR but for building safety in occupation"
            plainEnglish="The Building Safety Act and supporting regulations (Higher-Risk Buildings (Management of Safety Risks etc) (England) Regulations 2023) create a mandatory occurrence reporting (MOR) regime for HRRBs in occupation. Accountable Persons must report &apos;safety occurrences&apos; — events relating to fire spread, structural failure, or anything else that could present a significant risk of death or serious injury — to the Building Safety Regulator. Reporting is via an online portal; tight timescales apply (notification within 10 days; full report within deadlines set by the BSR)."
            onSite="For electrical contractors working on HRRBs, MOR awareness matters because some electrical events (a fault that compromised the building&apos;s fire compartmentation, a missing or defective fire-stopping around a cable penetration, a circuit failure that disabled a life-safety system) can be MOR-reportable. The contractor identifies and informs the Accountable Person; the AP makes the formal MOR submission."
          >
            <p>Examples of electrical events that may trigger MOR consideration:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Fire-stopping around a service penetration found to be missing or compromised
                during electrical alteration.
              </li>
              <li>
                Smoke detection / fire alarm system failure or unplanned isolation.
              </li>
              <li>
                Loss of power to a life-safety system (firefighting lift, smoke ventilation,
                emergency lighting) that wasn&apos;t a planned isolation.
              </li>
              <li>
                Discovery during work of an installation defect that compromises fire
                compartmentation or structural integrity.
              </li>
              <li>
                Unintended fire or significant smoke event resulting from electrical work.
              </li>
              <li>
                Failure of a safety-critical alarm or monitoring system in occupied common
                parts.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The competence framework — what&apos;s tightening for installers</ContentEyebrow>

          <ConceptBlock
            title="From scheme registration to demonstrable competence"
            plainEnglish="BSA 2022 s.2 places a competence-improvement duty on the Building Safety Regulator. The Industry Competence Steering Group (now the Industry Competence Committee under BSA structures) has produced sector competence frameworks for engineers, fire engineers, principal designers, principal contractors and electrical installers among others. The direction of travel is towards demonstrable, certified competence for specified roles — particularly on HRRBs, but increasingly across all building work."
            onSite="What this means for an L3 apprentice over the next decade: the qualification stack matters more than ever. L3 + AM2/AM2S + ECS / JIB grading + scheme registration + CPD records become the evidence portfolio that opens doors to HRRB and major-framework work. The pre-2022 model of &apos;the firm is registered, that&apos;s enough&apos; is being layered with individual competence requirements."
          >
            <p>Competence components likely to matter for L3 career progression:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>L3 Diploma in Electrotechnical Services</strong> — the technical
                foundation. Plus the End Point Assessment for the Installation and Maintenance
                Electrician apprenticeship (in England).
              </li>
              <li>
                <strong>AM2 / AM2S</strong> — practical assessment confirming readiness for
                independent work.
              </li>
              <li>
                <strong>ECS card</strong> (Electrotechnical Certification Scheme) — JIB-graded
                proof of identity, qualifications and H&amp;S knowledge. Required on most major
                sites.
              </li>
              <li>
                <strong>Scheme registration</strong> (NICEIC / NAPIT / Stroma / ELECSA) at the
                firm level; Qualified Supervisor at the individual level.
              </li>
              <li>
                <strong>Specialist competence</strong> where applicable — CompEx (hazardous
                area), F-Gas (refrigerant), BS 7671:2018+A4:2026 (current amendment).
              </li>
              <li>
                <strong>CPD</strong> — ongoing continuing professional development records,
                increasingly demanded by clients, frameworks and competence schemes.
              </li>
              <li>
                <strong>Building Safety Act competence (HRRB)</strong> — emerging additional
                requirements for installers working on HRRBs; expect role-specific accreditation
                over the next 5 years.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Residents&apos; engagement and the resident voice</ContentEyebrow>

          <ConceptBlock
            title="Why occupant feedback became a statutory duty"
            plainEnglish="One of Hackitt&apos;s central findings was that residents&apos; safety concerns at Grenfell were dismissed or unheard. BSA 2022 makes the resident voice a statutory part of HRRB safety management. The Principal Accountable Person must produce a Resident Engagement Strategy (BSA s.91), provide prescribed information to residents, and operate a complaints procedure. Residents have a parallel right to escalate to the Building Safety Regulator if the PAP&apos;s response is inadequate."
            onSite="For electrical contractors working in occupied HRRBs, the resident engagement framework reaches you in practical ways: residents may ask questions about the work being done; residents may raise complaints about disruption or method; residents have a right to safety-relevant information about works in their building. Cooperate with the PAP&apos;s resident-engagement process — what you say in the corridor can become part of the building&apos;s safety case correspondence."
          >
            <p>What the resident engagement strategy must cover:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Information that residents are entitled to about the building, the safety case
                and material changes.
              </li>
              <li>
                How safety-relevant information will be provided (format, timing, accessibility).
              </li>
              <li>
                Procedure for residents to raise concerns or complaints.
              </li>
              <li>
                Timescales for responding to concerns and the escalation route to the BSR.
              </li>
              <li>
                Arrangements for consulting residents on significant changes to safety
                arrangements.
              </li>
              <li>
                Periodic review and update of the strategy.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Assuming BSA 2022 only applies to towers"
            whatHappens={
              <>
                Apprentice on a domestic alteration job dismisses BSA 2022 as &quot;tower
                block stuff that doesn&apos;t apply to me&quot;. They produce a paper EIC,
                hand it to the customer, take no copy. Twelve years later the property is
                sold; new owner discovers a defect; sues under Defective Premises Act
                (now extended to 15 years prospective). The original firm has no record
                of the work. Defence is essentially impossible.
              </>
            }
            doInstead={
              <>
                Treat all residential records as long-life. Keep digital copies of every
                EIC, EICR and alteration cert indefinitely. Use online certification
                platforms that retain records on your behalf. Design records and cable
                calcs are part of the package. The cost of digital record-keeping is
                trivial; the cost of an unwinnable Defective Premises Act claim is
                significant.
              </>
            }
          />

          <CommonMistake
            title="Ignoring the gateway regime when subcontracting on an HRRB"
            whatHappens={
              <>
                Firm gets a small subcontract on an HRRB development. Doesn&apos;t
                realise gateway 2 has been approved with specific design assumptions.
                Apprentice substitutes a different brand of MCB on site to save a
                day&apos;s wait. Substitution isn&apos;t fed back to the design team.
                Gateway 3 review picks up the discrepancy; building can&apos;t be
                occupied until either the substitution is justified in writing or the
                originally-specified MCBs are installed. Project programme blown by 3
                weeks; subcontractor blamed and back-charged.
              </>
            }
            doInstead={
              <>
                On HRRB work, no design substitution without the design team&apos;s
                written approval — even for &quot;equivalent&quot; products. The
                gateway regime treats deviations from approved design as significant.
                Site induction will cover the change-control protocol; follow it.
              </>
            }
          />

          <Scenario
            title="Asked to work on a residential block at the HRRB threshold"
            situation={
              <>
                Your firm has been engaged for a small electrical alteration on a
                residential block. Walking the site, you count 7 storeys above ground
                with a ground floor of commercial use; the residential parts are floors
                1–7. The building is around 22m to top occupied storey. You&apos;re
                being asked to add three new sockets in a ground-floor service
                cupboard that supports landlord-side equipment. Your supervisor says
                &quot;just a quick socket job, get it done&quot;.
              </>
            }
            whatToDo={
              <>
                Pause. The building looks like an HRRB (over 18m / 7+ storeys + 2+
                residential units). Confirm with the client / building managing agent.
                If it&apos;s an HRRB, a Principal Accountable Person exists and they
                must approve significant work to common parts and structure-affecting
                work. Even a small alteration to landlord-side electrical infrastructure
                may need to feed into the safety case and golden thread. Brief your
                supervisor: &quot;this is an HRRB; we need to confirm with the PAP
                what their approval process is for landlord-side electrical work
                before we proceed&quot;. The job may still go ahead but with proper
                design records, change-control documentation and digital cert
                integration. Refusing to do it without checking is the right call.
              </>
            }
            whyItMatters={
              <>
                BSA 2022 doesn&apos;t prohibit small electrical work on HRRBs — it
                requires that the work fits inside the building&apos;s safety
                management system. The PAP needs to know about changes; the golden
                thread needs to be updated; the certification needs to be digitally
                integrated. Doing the work without checking is the kind of incident
                that ends up in BSR enforcement after a future fire investigation.
                Your firm&apos;s commercial relationship with that managing agent
                depends on getting this right.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "BSA 2022 is the post-Grenfell, post-Hackitt regulatory framework. Higher-Risk Building = 18m / 7+ storeys + 2+ residential units.",
              "L2 didn't cover BSA 2022. L3 needs the framework knowledge — even if not directly working on HRRBs yet, the indirect effects (30-year liability, competence framework, Building Regs amendments) reach every residential job.",
              "Building Safety Regulator sits within HSE; runs the gateway regime (1 planning / 2 pre-construction / 3 pre-occupation) and has prosecution powers.",
              "In-occupation duty holders: Principal Accountable Person, Accountable Persons, Responsible Person (fire). PAP holds the safety case and the golden thread.",
              "Golden thread = digital, accurate, accessible, secure information set covering design, construction and ongoing management. EIC and EICR records become part of it.",
              "Defective Premises Act limitation extended to 30 years retrospective / 15 years prospective for residential work — significant impact on document retention and PI insurance.",
              "Competence framework (Industry Competence Steering Group) is reshaping JIB grading, CPD requirements and bid eligibility on major frameworks.",
              "Approved Documents B (fire safety), L (energy) and P (electrical safety) remain authoritative; BSA 2022 amends specifics and adds the HRRB layer on top.",
            ]}
          />

          <Quiz title="Building Safety Act 2022 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section1-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.6 HSE, FFI and enforcement
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module1-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Procedures for H&S situations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
