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
    id: 'mod8-s4-three-signatures',
    question:
      'You designed, installed, inspected and tested a domestic alteration yourself as a single competent person. How is Section C of the EIC signed?',
    options: [
      'Sign once at the bottom — one person, one signature',
      'Sign all three blocks (FOR DESIGN, FOR CONSTRUCTION, FOR INSPECTION AND TESTING). Reg 644.4 requires the persons responsible for each role to sign for that role; where one competent person covers all three, they sign all three blocks',
      'Leave the design block blank because the customer ordered the work',
      'Only the inspection block matters',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.4 binds the EIC to the actual people who did the work. The single-signature EIC for a domestic installation is the everyday case — one signatory across all three roles, signing all three blocks. A blank block invalidates the certificate for that part of the work.',
  },
  {
    id: 'mod8-s4-pnb',
    question:
      'A4:2026 added a new earthing-arrangement option to Section F of the EIC. What is it, and what is the regulatory basis?',
    options: [
      'TN-S (X), Reg 411.5',
      'TN-C-S (PNB) — protective neutral bonding, where the consumer creates the N-PE bond at the cut-out rather than relying on a distributor PME bond. Reg 312.2.1.1 (A4 update) sets the PNB requirements',
      'IT-A, Reg 312.3',
      'PEN, Reg 543',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 amended Reg 312.2.1.1 to include a PNB figure and requirements. The Section F tick-list now reads TN-C, TN-S, TN-C-S (PME), TN-C-S (PNB), TT, IT. Inspectors must identify PME and PNB as separate arrangements rather than lumping them together as TN-C-S.',
  },
  {
    id: 'mod8-s4-cu-replacement',
    question:
      'You are replacing an existing consumer unit on a domestic installation. No new circuits are introduced — only the CU is replaced and existing circuits are reterminated. Which certificate is required?',
    options: [
      'Minor Works (MEIWC) — no new circuits',
      'EIC — case (c) of the EIC notes lists “replacement of a consumer unit / distribution board” as one of the four cases for EIC issuance. CU replacement requires an EIC, full stop',
      'EICR',
      'No certificate required for like-for-like replacement',
    ],
    correctIndex: 1,
    explanation:
      'The EIC notes are explicit on the four cases: initial certification, addition/alteration introducing new circuits, CU/DB replacement, or multi-alteration in lieu of multiple Minor Works. CU replacement is case 3. Issuing a MEIWC for a CU replacement is a Reg 644.4.201 non-compliance.',
  },
  {
    id: 'mod8-s4-section-i',
    question:
      'You are issuing an EIC for an addition (one new socket). The client says “the existing installation is fine, just leave Section I blank”. Can you?',
    options: [
      'Yes — Section I is optional',
      'No — Reg 644.1.2 requires the inspector to record any defects found, so far as is reasonably practicable, in the existing installation. If you found nothing, write that in Section I (“No defects observed in the existing installation during the course of the addition. Inspection limited to the parts made accessible by the works”). A blank Section I on an addition EIC is a Reg 644.1.2 non-compliance',
      'Only if the customer signs a waiver',
      'Section I only applies to EICRs',
    ],
    correctIndex: 1,
    explanation:
      'Section I is mandatory for additions and alterations — the heading itself reads “(in the case of an addition or alteration see Regulation 644.1.2)”. The phrasing “so far as is reasonably practicable” permits a limited-inspection statement, but does not permit a blank.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 644.4 requires that the EIC be issued by the person or persons responsible for three specific stages of the installation. What are those three stages?',
    options: [
      'Quotation, design, installation',
      'Design, construction, and verification (inspection and testing)',
      'Sales, installation, sign-off',
      'Design, installation, handover',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 644.4 reads: "The person or persons responsible for the design, construction and verification of the installation shall issue the Certificate, which takes account of their respective responsibilities". This is the three-signature requirement reflected in Section C of the EIC: FOR DESIGN, FOR CONSTRUCTION, FOR INSPECTION AND TESTING. Where one competent person did all three, they sign all three blocks; where the work was split, three different signatories sign.',
  },
  {
    id: 2,
    question:
      'On the A4:2026 EIC Section F, which earthing arrangement option was added or made explicit at the A4 amendment, alongside TN-S, TN-C, TN-C-S (PME), TT and IT?',
    options: ['TN-C-S (PNB) — protective neutral bonding', 'TN-S (X)', 'IT-A', 'PEN'],
    correctAnswer: 0,
    explanation:
      'A4:2026 amended Reg 312.2.1.1 to "now includes a protective neutral bonding (PNB) figure and requirements". The EIC Section F earthing-arrangements column was updated accordingly: the tick-list now reads TN-C, TN-S, TN-C-S (PME), TN-C-S (PNB), TT, IT. PNB is a TN-C-S variant where the consumer creates the N-PE bond at the cut-out rather than relying on the distributor PME bond.',
  },
  {
    id: 3,
    question:
      'Section D of the A4:2026 EIC ("NEXT INSPECTION") is short. What does it now require the designer(s) to record, and what is its regulatory basis?',
    options: [
      'A guarantee of installation life of at least 10 years',
      'A recommendation that this installation is further inspected and tested after an interval of not more than X years/months — derived from Reg 644.4 (interval to first periodic inspection) and Reg 651/652',
      "The installer's warranty",
      'The Building Regulations notification reference',
    ],
    correctAnswer: 1,
    explanation:
      'Section D records: "I/We, the designer(s), recommend that this installation is further inspected and tested after an interval of not more than ............ years/months". The recommendation is required by Reg 644.4 ("The recommendation for the interval between initial verification and the first periodic inspection shall be recorded on the Certificate"). The interval should consider the installation type, environment, and Reg 651/652 frequency guidance.',
  },
  {
    id: 4,
    question:
      'On the A4:2026 EIC Section H (Schedule of Inspections), which item number corresponds to AFDD operational confirmation, and which regulations does it cite?',
    options: [
      'Item 4.0 — Reg 411.1',
      'Item 4.23 — Reg 421.1.7, Reg 532.6, Reg 651.2(e)',
      'Item 5.12 — Reg 411.3.4',
      'Item 6.1 — Reg 701.411.3.3',
    ],
    correctAnswer: 1,
    explanation:
      'Item 4.23 reads: "Confirmation of indication that AFDD(s) are operational (421.1.7; 532.6; 651.2(e))". This was added at A4:2026 to align with the new Reg 421.1.7 AFDD recommendation. Item 4.0 is the parent "Consumer Unit / Distribution Board" group; item 5.12 is the new RCD-not-exceeding-30-mA item including its bullet for "Final circuits supplying luminaires within domestic (household) premises (411.3.4)" — also an A4 reorganisation.',
  },
  {
    id: 5,
    question:
      'Section I of the EIC is "COMMENTS ON EXISTING INSTALLATION". When does this section have to be completed?',
    options: [
      'Always, even on a new install',
      'Only on an EICR — never on an EIC',
      'In the case of an addition or alteration — see Reg 644.1.2 (which requires recording any defects found in the existing installation, so far as is reasonably practicable)',
      'When the customer asks',
    ],
    correctAnswer: 2,
    explanation:
      'Section I header reads: "SECTION I: COMMENTS ON EXISTING INSTALLATION (in the case of an addition or alteration see Regulation 644.1.2)". Reg 644.1.2 requires that defects revealed during inspection and testing of an addition or alteration that affect the safety of the addition shall be corrected before the Certificate is issued, AND that the person responsible "shall record on the Electrical Installation Certificate or the Minor Electrical Installation Works Certificate, any defects found, so far as is reasonably practicable, in the existing installation". This goes in Section I.',
  },
  {
    id: 6,
    question: 'When is an EIC the correct certificate (rather than a Minor Works or an EICR)?',
    options: [
      'Only for new installations',
      'For initial certification of a new installation; for additions / alterations introducing one or more new circuits; for replacement of a consumer unit or distribution board; or for multiple additions / alterations / remedial works as an alternative to multiple Minor Works',
      'Only for industrial installations',
      'Whenever the customer requests it',
    ],
    correctAnswer: 1,
    explanation:
      'The EIC notes for the producer list four cases: (a) initial certification of a new installation; (b) addition or alteration where one or more new circuits have been introduced; (c) replacement of a consumer unit / distribution board; (d) multiple additions / alterations / remedial works to existing as an alternative to multiple Minor Works. EIC is not used for periodic — that is the EICR. For an addition or alteration that does NOT extend to new circuits, a Minor Works (MEIWC) may be used.',
  },
  {
    id: 7,
    question:
      'What does "consumer\'s means of isolation" refer to on the A4:2026 inspection schedule, and where does it appear?',
    options: [
      'Item 1.2 of the residential SoI (Schedule of Inspection): "Consumer\'s means of isolation (where present)" — under Section 1.0 INTAKE EQUIPMENT (visual inspection only)',
      'It is the cooker switch',
      'It is the RCD test button',
      'A new product range',
    ],
    correctAnswer: 0,
    explanation:
      'Item 1.2 on the A4:2026 Condition Report Schedule of Inspection (the EICR Schedule, also referenced from EIC Section H) is "Consumer\'s means of isolation (where present)" — under section 1.0 INTAKE EQUIPMENT (visual inspection only). This is the customer-side isolator that allows the occupier to disconnect the consumer unit from the supply (Reg 462.1.201). A4 promoted this to its own item to match Reg 462.1.201 and the new requirement for a main linked switch at item 4.6.',
  },
  {
    id: 8,
    question:
      'Item 4.13 of the EIC Schedule of Inspection reads: "Compatibility of protective devices, bases and other components; correct type and rating (No signs of unacceptable thermal damage, arcing or overheating)". Which regulations does it cite?',
    options: [
      'Reg 411.1',
      'Regs 411.3.2, 411.4, 411.5, 411.6 and Sections 432, 433',
      'Reg 643.7 only',
      'Reg 132.1 only',
    ],
    correctAnswer: 1,
    explanation:
      'Item 4.13 cites "(411.3.2; 411.4; 411.5; 411.6; Sections 432, 433)" — covering ADS for fault and shock protection, fault current protection, overload protection (Section 433), and short-circuit protection (Section 432). The "no signs of thermal damage" check is the visual flag for an OCPD that has operated under stress and may not operate correctly next time.',
  },
  {
    id: 9,
    question:
      'Item 5.12 of the A4:2026 Schedule of Inspection lists circuits requiring 30 mA RCD additional protection. Which of the following is in the bullet list, and is new at A4?',
    options: [
      'All EV charge points (722.531)',
      'Final circuits supplying luminaires within domestic (household) premises (411.3.4) — added at A4:2026',
      'All medical equipment',
      'PV inverters only',
    ],
    correctAnswer: 1,
    explanation:
      'Item 5.12 bullets: all socket-outlets ≤ 32 A unless an exception applies (411.3.3); supply of mobile equipment ≤ 32 A for outdoor use (411.3.3); cables concealed in walls at depth < 50 mm (522.6.202; Table 52.1); cables in walls/partitions containing metal parts regardless of depth (Table 52.1); and "Final circuits supplying luminaires within domestic (household) premises (411.3.4)" — the lighting-circuit RCD requirement promoted at A4:2026.',
  },
  {
    id: 10,
    question:
      'Section J of the EIC ("SCHEDULES") is the attachments declaration. What does it state?',
    options: [
      'A list of customer assets',
      '"The schedule(s) and continuation sheet(s) listed are part of this document and this certificate is valid only when they are attached to it"',
      'A health and safety statement',
      'The fee schedule',
    ],
    correctAnswer: 1,
    explanation:
      'Section J reads: "Continuation sheet(s) for Section(s) ............. Schedule(s) of Inspection ............. Schedule(s) of Circuit Details and Schedule(s) of Test Results. The schedule(s) and continuation sheet(s) listed are part of this document and this certificate is valid only when they are attached to it." This is the formal attachments declaration that operationalises Reg 644.3. Without the schedules, the certificate is not valid.',
  },
];

const InspectionTestingModule8Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Electrical Installation Certificate (EIC) | I&T Module 8.4 | Elec-Mate',
    description:
      'Walking the A4:2026 Electrical Installation Certificate section by section: A (client), B (installation), C (signatories — design / construction / inspection), D (next inspection), E (signatory particulars), F (supply incl. TN-C-S PNB), G (installation), H (Schedule of Inspections), I (existing installation), J (schedules). Three-signature requirement, Reg 644.4 issuance, A4 changes.',
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
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 4"
            title="Electrical Installation Certificates"
            description="The A4:2026 EIC walked section by section — A through J — with the regulatory basis for each section, the three-signature requirement of Reg 644.4, and the new A4 additions (TN-C-S PNB, AFDD, lighting RCD)."
            tone="yellow"
          />

          <TLDR
            points={[
              'The EIC is the certificate for new work — initial certification, new circuits, consumer unit replacement, or multiple alterations as an alternative to multiple Minor Works. It is never used for periodic — that is the EICR.',
              'Reg 644.4 requires the EIC be issued by the person(s) responsible for design, construction, and verification — three signatures (or one signatory who covers all three roles). Section C of the EIC is structured around this.',
              'The form is laid out A through J: A (client), B (installation), C (three signatures), D (next inspection interval), E (signatory particulars), F (supply / earthing / nominal voltage), G (installation particulars), H (Schedule of Inspections), I (comments on existing installation, for additions / alterations only), J (schedules attached).',
              'A4:2026 added TN-C-S (PNB) as an explicit earthing-arrangement option in Section F (Reg 312.2.1.1 PNB requirements). It also added item 4.23 (AFDD operational confirmation, Reg 421.1.7) and amended item 5.12 to include "Final circuits supplying luminaires within domestic (household) premises (411.3.4)".',
              'Section H is the Schedule of Inspections — distinct from the Schedule of Inspection on the EICR. The EIC Section H is a 14-item check-list (1.0 to 14.0) of installation aspects to confirm; the EICR Schedule of Inspection is the much longer item-by-item list (1.0 to 8.0 with sub-items) used during periodic inspection.',
              'Reg 644.4 also requires a recommended interval to first periodic inspection — Section D. This is not optional.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State Reg 644.4 verbatim and explain the three-signature requirement (design, construction, verification) and how Section C operationalises it',
              'Walk the EIC sections A through J in order and explain what goes in each',
              'Identify the A4:2026 changes to the EIC: TN-C-S (PNB) in Section F, item 4.23 (AFDD) and item 5.12 (lighting RCD) on Section H',
              'Decide correctly when an EIC is the right certificate vs a Minor Works (MEIWC) vs an EICR',
              'Complete Section I correctly when issuing an EIC for an addition or alteration to an existing installation, per Reg 644.1.2',
              'Identify by item number every regulation cited on the Schedule of Inspections, and what each visual / functional check is verifying',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 644.4 — issuance, signatories and the next-inspection interval"
            plainEnglish="The persons responsible for the design, construction, and verification of the installation issue the Certificate. They take account of their respective responsibilities by signing the parts of Section C that match their role. The Certificate is issued to the person who ordered the work. The interval to the first periodic inspection must be recorded on the Certificate."
            onSite="If you designed, installed, and tested the work yourself as a competent person, you sign all three blocks. If the design was someone else (a designer for the client, for example), you do not sign FOR DESIGN — they do, or you obtain the design declaration separately and reference it. The signature is a legal declaration of responsibility, not a clerical formality."
          >
            <p>
              Reg 644.4 in BS 7671:2018+A4:2026 binds the EIC to the actual people who did the work.
              The three roles — design, construction, verification (inspection and testing) —
              correspond to the three sub-blocks of Section C. The certificate is invalid unless the
              persons responsible sign for the work they did. A blank signature block, or a
              signature in the wrong block, invalidates the certificate for that part of the work.
            </p>
            <p>
              The same regulation requires the recommendation for the interval to the first periodic
              inspection to be recorded — Section D. The recommendation is informed by the
              installation type, the environment, and the frequency guidance in Reg 651/652. Common
              defaults: domestic 10 years (or change of occupancy), commercial 5 years, industrial 3
              years, special locations (swimming pools, marinas) 1-3 years.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.4"
            clause={
              <>
                The person or persons responsible for the design, construction and verification of
                the installation shall issue the Certificate, which takes account of their
                respective responsibilities, to the person ordering the work, together with the
                records mentioned in Regulation 644.3. The recommendation for the interval between
                initial verification and the first periodic inspection shall be recorded on the
                Certificate.
              </>
            }
            meaning="Three roles, three signatures (or one signatory across all three). The certificate goes to the person who ordered the work, with the schedules attached. Section D (next inspection) is mandatory, not optional."
          />

          <SectionRule />

          <ContentEyebrow>The EIC, section by section</ContentEyebrow>

          <ConceptBlock
            title="Section A — Details of the Client"
            plainEnglish="Who ordered the work. Name and address of the person or company that commissioned the installation. This is the person to whom Reg 644.4 says the original Certificate must be issued."
          >
            <p>
              Section A is short — the client&rsquo;s details on a single line. Get this right first
              time: the EIC is issued to the person ordering the work (Reg 644.4), and that is the
              address that appears in any subsequent dispute, building-control submission, or
              insurance claim. If the client is a company, name the company and the named
              representative. If the client is a tenant, decide carefully whether the freeholder /
              landlord is the actual ordering party.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section B — Installation Details and Description / Extent"
            plainEnglish="The installation address (where the work was done — may differ from the client&rsquo;s address), a description of the installation, and the extent of work covered by this certificate."
          >
            <p>
              Section B is the &ldquo;what and where&rdquo;. The installation address is the
              physical location of the work. The description is the plain-English summary
              (&ldquo;Single-phase domestic installation, 23 kW supply, 100 A main switch, 18-way
              dual-RCD consumer unit&rdquo;). The extent is the scope statement: this is the section
              that fences in your liability — what is covered and what is not.
            </p>
            <p>
              Section B also has three tick-boxes: <strong>New installation</strong>,{' '}
              <strong>Adding to an existing installation</strong>, and{' '}
              <strong>Alteration to an existing installation</strong>. Tick the one that matches the
              work. If you ticked &ldquo;Adding to&rdquo; or &ldquo;Alteration to&rdquo;, Section I
              (Comments on existing installation) becomes mandatory under Reg 644.1.2.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section C — Certification Signatories (the three-signature block)"
            plainEnglish="Three sub-sections: FOR DESIGN, FOR CONSTRUCTION, FOR INSPECTION AND TESTING. Each has its own declaration text, departures-from-BS-7671 box, and signature line. The signatures are what make the certificate legally binding under Reg 644.4."
            onSite="Each block contains the same template clause: 'I/We, being the person(s) responsible for the [design/construction/inspection-and-testing] of the electrical installation (as indicated by my/our signatures below), particulars of which are described above, having exercised reasonable skill and care when carrying out the [role] hereby CERTIFY that the [work] for which I/we have been responsible is to the best of my/our knowledge and belief in accordance with BS 7671:2018, amended to ............ (date) except for the departures, if any, detailed as follows:'"
          >
            <p>The three signature blocks, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FOR DESIGN.</strong> Signed by the designer(s). The form supports up to two
                designers (Designer No 1 and Designer No 2 — the latter with the &ldquo;**Where
                there is mutual responsibility for the design&rdquo; note). The designer&rsquo;s
                departures-from-BS-7671 box explicitly cites Regs 120.3, 133.1.2, 133.1.3 and 133.5
                — the regulations that permit declared departures from the standard. Section C also
                has a &ldquo;Risk assessment attached&rdquo; tick-box for the permitted-exceptions
                case (Reg 411.3.3).
              </li>
              <li>
                <strong>FOR CONSTRUCTION.</strong> Signed by the constructor (the installer). Single
                signature. Departures box cites the same Regs 120.3, 133.1.2, 133.1.3, 133.5.
              </li>
              <li>
                <strong>FOR INSPECTION AND TESTING.</strong> Signed by the inspector. Single
                signature. The departures box covers any limit on the inspection (e.g. concealed
                cables not lifted) — not departures from the wiring regulation, but limits on the
                verification.
              </li>
            </ul>
            <p>
              Where one competent person did all three, they sign all three blocks. The form
              accommodates this: a single-signature EIC is the common domestic case, and is
              perfectly valid under Reg 644.4 provided the signatory is genuinely competent in all
              three roles.
            </p>
          </ConceptBlock>

          {/* Three-signature diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              EIC Section C — three signature blocks (Reg 644.4)
            </h4>
            <svg
              viewBox="0 0 800 320"
              className="w-full h-auto"
              role="img"
              aria-label="Section C of the EIC showing three sub-blocks: FOR DESIGN with one or two designer signatures, FOR CONSTRUCTION with the constructor signature, and FOR INSPECTION AND TESTING with the inspector signature, all under Reg 644.4."
            >
              <text
                x="400"
                y="24"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                SECTION C: CERTIFICATION SIGNATORIES
              </text>
              <text x="400" y="40" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                Reg 644.4 — three roles, three signatures (or one across all three)
              </text>

              <rect
                x="30"
                y="60"
                width="240"
                height="220"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="82"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                FOR DESIGN
              </text>
              <text x="150" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Reg 120.3, 133.1.2,
              </text>
              <text x="150" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                133.1.3, 133.5 (departures)
              </text>
              <text x="150" y="138" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Permitted exceptions:
              </text>
              <text x="150" y="152" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 411.3.3 (risk-assessed)
              </text>
              <line
                x1="50"
                y1="180"
                x2="250"
                y2="180"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <text x="150" y="198" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Designer No 1: Signature
              </text>
              <text x="150" y="220" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Designer No 2: Signature**
              </text>
              <text x="150" y="245" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">
                **where mutual
              </text>
              <text x="150" y="258" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">
                responsibility for design
              </text>

              <rect
                x="280"
                y="60"
                width="240"
                height="220"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="82"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                FOR CONSTRUCTION
              </text>
              <text x="400" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Reg 120.3, 133.1.2,
              </text>
              <text x="400" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                133.1.3, 133.5
              </text>
              <text x="400" y="148" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                The installer&rsquo;s
              </text>
              <text x="400" y="162" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                declaration
              </text>
              <line
                x1="300"
                y1="190"
                x2="500"
                y2="190"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <text x="400" y="208" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Constructor: Signature
              </text>
              <text x="400" y="244" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                "the construction work
              </text>
              <text x="400" y="258" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                complies with BS 7671"
              </text>

              <rect
                x="530"
                y="60"
                width="240"
                height="220"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="650"
                y="82"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                FOR INSPECTION
              </text>
              <text
                x="650"
                y="98"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                AND TESTING
              </text>
              <text x="650" y="120" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Reg 120.3, 133.1.2,
              </text>
              <text x="650" y="134" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                133.1.3, 133.5
              </text>
              <text x="650" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Inspector&rsquo;s declaration
              </text>
              <text x="650" y="172" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                + verification limits
              </text>
              <line
                x1="550"
                y1="200"
                x2="750"
                y2="200"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,2"
              />
              <text x="650" y="218" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Inspector: Signature
              </text>
              <text x="650" y="252" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                "the inspection &amp; testing
              </text>
              <text x="650" y="266" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                complies with BS 7671"
              </text>

              <rect
                x="30"
                y="290"
                width="740"
                height="22"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="306" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                One competent person across all three roles → all three blocks signed by the same
                name. Reg 644.4 satisfied.
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="Section D — Next Inspection"
            plainEnglish="One sentence: the designer(s) recommend that the installation is further inspected and tested after an interval of not more than X years/months. This is the satisfaction of Reg 644.4&rsquo;s next-inspection requirement."
          >
            <p>
              Section D reads: &ldquo;I/We, the designer(s), recommend that this installation is
              further inspected and tested after an interval of not more than ............
              years/months.&rdquo; The interval should reflect the installation type and environment
              per Reg 651/652 frequency guidance.
            </p>
            <p>Reasonable defaults — but always justify against the specific installation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Domestic dwelling — 10 years, or sooner on change of occupancy</li>
              <li>Commercial / office — 5 years</li>
              <li>Industrial — 3 years</li>
              <li>Caravans, marinas, swimming pools — 1 to 3 years</li>
              <li>Petrol stations, hazardous areas — 1 year</li>
              <li>Construction sites — 3 months</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section E — Particulars of Signatories in Section C"
            plainEnglish="Name, address, postcode, and telephone number of each signatory in Section C. This is the contact-detail repeat that allows a future EICR inspector to trace and consult the original team."
          >
            <p>
              Section E pairs with Section C — for each named signatory in Section C (Designer No 1,
              Designer No 2 if applicable, Constructor, Inspector), Section E records the
              accompanying particulars: Name, For/on behalf of (company), Address, Postcode, Tel No.
              The form supports four entries.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section F — Supply Characteristics and Earthing Arrangements"
            plainEnglish="Four columns: Earthing arrangements (TN-C / TN-S / TN-C-S PME / TN-C-S PNB / TT / IT), Number and Type of Live Conductors (AC or DC, 1-phase 2-wire / 1-phase 3-wire / 2-phase / 3-phase 3-wire / 3-phase 4-wire / 2-wire DC / 3-wire DC), Nature of Supply Parameters (U/U₀, frequency, prospective fault current Iₚf, external Zₑ), and Supply Protective Device (BS EN, type, rating, breaking capacity)."
            onSite="The A4:2026 amendment added TN-C-S (PNB) as an explicit option. PNB (protective neutral bonding) is a TN-C-S variant where the consumer creates the N-PE bond at the cut-out — used where the distributor does not provide PME but the consumer provides the equivalent at the origin. The new Reg 312.2.1.1 sets out the requirements."
          >
            <p>The Section F earthing-arrangements column, in full A4:2026 order:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Tick</th>
                    <th className="text-left text-white/80 py-2">Arrangement</th>
                    <th className="text-left text-white/80 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TN-C</td>
                    <td>TN-C</td>
                    <td>Combined PEN throughout — rare in modern UK</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TN-S</td>
                    <td>TN-S</td>
                    <td>Separate N and PE throughout — distributor provides PE</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TN-C-S (PME)</td>
                    <td>TN-C-S (PME)</td>
                    <td>
                      Distributor PEN combined upstream, separated at origin — PME bond at the
                      cut-out
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06] bg-elec-yellow/5">
                    <td className="py-2 text-elec-yellow font-bold">TN-C-S (PNB)</td>
                    <td className="text-elec-yellow font-bold">
                      TN-C-S (PNB) — NEW EXPLICIT AT A4:2026
                    </td>
                    <td className="text-elec-yellow">
                      Consumer provides the protective neutral bond at the origin; Reg 312.2.1.1 PNB
                      requirements
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">TT</td>
                    <td>TT</td>
                    <td>Independent earth electrode at the installation; RCD essential for ADS</td>
                  </tr>
                  <tr>
                    <td className="py-2">IT</td>
                    <td>IT</td>
                    <td>
                      No direct connection to earth (or via high impedance) — special installations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 312.2.1.1 (A4 update)"
            clause={
              <>
                Regulation 312.2.1.1 now includes a protective neutral bonding (PNB) figure and
                requirements.
              </>
            }
            meaning="A4:2026 made TN-C-S (PNB) a first-class earthing arrangement in BS 7671. The EIC Section F tick-list and the EICR Section I tick-list both list PNB explicitly. Inspectors must now identify PME and PNB as separate arrangements — not lump them together as 'TN-C-S'."
          />

          <ConceptBlock
            title="Section G — Particulars of Installation Referred to in the Certificate"
            plainEnglish="The downstream side: means of earthing (distributor&rsquo;s facility or installation earth electrode), maximum demand, earth electrode details (type, location, resistance Rₐ/Zₑ), main protective conductors (earthing conductor and main bonding conductors with material and csa), bonded services (water, gas, oil, structural steel, lightning protection), and the main switch / isolator details."
          >
            <p>Section G has five sub-blocks:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Means of Earthing.</strong> Tick-box: Distributor&rsquo;s facility OR
                Installation earth electrode. (TT only requires the installation electrode; TN
                systems use the distributor&rsquo;s facility.)
              </li>
              <li>
                <strong>Maximum Demand.</strong> Maximum demand (load) in kVA or A —
                designer&rsquo;s figure, used for cable and OCPD selection.
              </li>
              <li>
                <strong>Details of Installation Earth Electrode (where applicable).</strong> Type
                (rod(s), tape, etc.), Location, Electrode resistance/impedance Rₐ/Zₑ.
              </li>
              <li>
                <strong>Main Protective Conductors.</strong> Earthing conductor — material and csa.
                Main protective bonding conductors — material and csa. Both with a &ldquo;Connection
                / continuity verified&rdquo; tick-box. Then the bonded services check-list: water,
                gas, oil, structural steel, lightning protection, &ldquo;Other (Specify)&rdquo;.
              </li>
              <li>
                <strong>Main Switch.</strong> BS (EN), No of poles, Current rating, Voltage rating,
                Location, plus an &ldquo;If overcurrent protective device&rdquo; sub-block (device
                type, rating, breaking capacity) and an &ldquo;If RCD main switch&rdquo; sub-block
                (RCD Type, IΔn, time delay, measured operating time, breaking capacity).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Section H — Schedule of Inspections"
            plainEnglish="A 14-item top-level checklist (item 1.0 to 14.0) confirming that the installation has been visually and functionally inspected. Each row has an Outcome tick (✓ or N/A). This is NOT the same as the EICR&rsquo;s Schedule of Inspection — that one has many more items. Section H of the EIC is the short-form check-list specifically for new-work certification."
          >
            <p>The 14 items, by number and description:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Item No.</th>
                    <th className="text-left text-white/80 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.0</td>
                    <td>Condition of consumer&rsquo;s intake equipment (Visual inspection only)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2.0</td>
                    <td>Parallel or switched alternative sources of supply</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">3.0</td>
                    <td>Protective measure: Automatic Disconnection of Supply (ADS)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4.0</td>
                    <td>Basic protection</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">5.0</td>
                    <td>Protective measures other than ADS</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6.0</td>
                    <td>Additional protection</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">7.0</td>
                    <td>Distribution equipment</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">8.0</td>
                    <td>Circuits (Distribution and Final)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">9.0</td>
                    <td>Isolation and switching</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">10.0</td>
                    <td>Current-using equipment (permanently connected)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">11.0</td>
                    <td>Identification and notices</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">12.0</td>
                    <td>Location(s) containing a bath or shower</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">13.0</td>
                    <td>Other special installations or locations</td>
                  </tr>
                  <tr>
                    <td className="py-2">14.0</td>
                    <td>Prosumer&rsquo;s low voltage electrical installation(s)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Each row has an Outcome (✓ / N/A) column. Item 14.0 ties to Chapter 82 of BS 7671
              (prosumer installations — PV, battery, EV-V2G installations that export). For each
              item, there is no sub-list on the EIC Section H — the inspector confirms or N/As at
              the top level. The detailed item-by-item list (4.23 AFDD, 5.12 lighting RCD, etc.) is
              on the EICR&rsquo;s Schedule of Inspection, NOT here.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section I — Comments on Existing Installation"
            plainEnglish="Mandatory when the work was an addition or alteration. Records any defects found in the existing parts of the installation (i.e. parts not part of the new work) so far as is reasonably practicable. The regulatory hook is Reg 644.1.2."
            onSite="Section I is your defence in any subsequent dispute. If you found a degraded earthing conductor at the meter when adding a new circuit, write it here. If you did not find anything because the existing fabric was inaccessible, write that here too — describe the limit of your inspection."
          >
            <p>
              Section I header: &ldquo;COMMENTS ON EXISTING INSTALLATION (in the case of an addition
              or alteration see Regulation 644.1.2)&rdquo;. Reg 644.1.2 requires that any defect or
              omission revealed during inspection and testing of the addition or alteration that
              affects the safety of the addition shall be corrected before the Certificate is
              issued. It also requires the person responsible to record on the EIC or MEIWC any
              defects found, so far as is reasonably practicable, in the existing installation.
            </p>
            <p>
              The phrasing &ldquo;so far as is reasonably practicable&rdquo; matters. You are not
              expected to perform a full EICR on the existing installation just because someone
              wanted a new socket. You are expected to record what you found, and to flag what you
              could not safely or sensibly check.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.1.2"
            clause={
              <>
                For an addition and/or alteration to an existing installation, any defect or
                omission that will affect the safety of the addition or alteration that is revealed
                during inspection and testing shall be corrected before the Certificate is issued.
                The person responsible for the new work, or a person authorized to act on their
                behalf, shall record on the Electrical Installation Certificate or the Minor
                Electrical Installation Works Certificate, any defects found, so far as is
                reasonably practicable, in the existing installation.
              </>
            }
            meaning="Two duties: (1) correct anything that compromises the safety of YOUR work before issuing the Certificate; (2) record anything else you found in the existing installation so far as is reasonably practicable. Section I of the EIC is where (2) goes."
          />

          <ConceptBlock
            title="Section J — Schedules"
            plainEnglish="The attachments declaration: number of continuation sheets per section, number of Schedules of Inspection, number of Schedules of Circuit Details and Test Results. The closing line is the validity statement: 'The schedule(s) and continuation sheet(s) listed are part of this document and this certificate is valid only when they are attached to it.'"
          >
            <p>
              Section J operationalises Reg 644.3. The certificate is valid only when its schedules
              are attached. Section J counts the attachments and asserts the validity gate. An EIC
              page submitted without its schedules is, on the form&rsquo;s own face, invalid.
            </p>
          </ConceptBlock>

          {/* EIC sections map */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              EIC Sections A through J — what each one carries
            </h4>
            <svg
              viewBox="0 0 800 420"
              className="w-full h-auto"
              role="img"
              aria-label="Map of all ten sections of the A4:2026 Electrical Installation Certificate from Section A (client) through Section J (schedules attached), showing what each section records."
            >
              <text
                x="400"
                y="22"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                ELECTRICAL INSTALLATION CERTIFICATE — A4:2026
              </text>

              <g>
                <rect
                  x="20"
                  y="40"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="110"
                  y="58"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  A — Client
                </text>
                <text x="110" y="76" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Person ordering work
                </text>
                <text x="110" y="88" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  → Reg 644.4 recipient
                </text>
              </g>

              <g>
                <rect
                  x="210"
                  y="40"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="300"
                  y="58"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  B — Installation
                </text>
                <text x="300" y="76" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Address, description,
                </text>
                <text x="300" y="88" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  extent (new/add/alter)
                </text>
              </g>

              <g>
                <rect
                  x="400"
                  y="40"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="490"
                  y="58"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  C — 3 Signatures
                </text>
                <text x="490" y="76" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                  Design / Construction /
                </text>
                <text x="490" y="88" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                  Inspection · Reg 644.4
                </text>
              </g>

              <g>
                <rect
                  x="590"
                  y="40"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="680"
                  y="58"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  D — Next Inspection
                </text>
                <text x="680" y="76" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Recommended interval
                </text>
                <text x="680" y="88" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">
                  → Reg 644.4 / 651-652
                </text>
              </g>

              <g>
                <rect
                  x="20"
                  y="110"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="110"
                  y="128"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  E — Signatory details
                </text>
                <text x="110" y="146" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Names, addresses,
                </text>
                <text x="110" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  contact for each role
                </text>
              </g>

              <g>
                <rect
                  x="210"
                  y="110"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="300"
                  y="128"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  F — Supply / Earthing
                </text>
                <text
                  x="300"
                  y="146"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  TN-C-S (PNB) added
                </text>
                <text
                  x="300"
                  y="158"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  at A4:2026
                </text>
              </g>

              <g>
                <rect
                  x="400"
                  y="110"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text
                  x="490"
                  y="128"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  G — Installation
                </text>
                <text x="490" y="146" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Earthing, max demand,
                </text>
                <text x="490" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  main protective, switch
                </text>
              </g>

              <g>
                <rect
                  x="590"
                  y="110"
                  width="180"
                  height="55"
                  rx="8"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="680"
                  y="128"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  H — SoI (14 items)
                </text>
                <text
                  x="680"
                  y="146"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  Items 1.0 to 14.0
                </text>
                <text
                  x="680"
                  y="158"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  Tick / N/A per item
                </text>
              </g>

              <g>
                <rect
                  x="20"
                  y="180"
                  width="370"
                  height="55"
                  rx="8"
                  fill="rgba(239,68,68,0.06)"
                  stroke="rgba(239,68,68,0.4)"
                  strokeWidth="1.5"
                />
                <text
                  x="205"
                  y="200"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  I — Comments on existing installation (additions / alterations only)
                </text>
                <text
                  x="205"
                  y="218"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  Reg 644.1.2 — record defects in existing,
                </text>
                <text
                  x="205"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  so far as is reasonably practicable
                </text>
              </g>

              <g>
                <rect
                  x="400"
                  y="180"
                  width="370"
                  height="55"
                  rx="8"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.5"
                />
                <text
                  x="585"
                  y="200"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  J — Schedules attached (Reg 644.3)
                </text>
                <text
                  x="585"
                  y="218"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  SoI + Circuit Details + Test Results
                </text>
                <text
                  x="585"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                >
                  "valid only when attached"
                </text>
              </g>

              <rect
                x="20"
                y="260"
                width="750"
                height="50"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="395"
                y="282"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                A4:2026 ADDITIONS
              </text>
              <text x="395" y="300" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">
                TN-C-S (PNB) in Section F · item 4.23 (AFDD) on SoI · item 5.12 lighting-RCD bullet
                · item 1.2 consumer&rsquo;s means of isolation
              </text>

              <rect
                x="20"
                y="325"
                width="750"
                height="22"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="395" y="341" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                The whole certificate is valid only when Sections A–J are completed AND the
                schedules from Section J are attached.
              </text>
            </svg>
          </div>

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

          <ContentEyebrow>When is an EIC the right certificate?</ContentEyebrow>

          <ConceptBlock
            title="Decision rules — EIC vs Minor Works vs EICR"
            plainEnglish="The EIC is for new work that introduces new circuits, replaces consumer units, or constitutes the initial certification. Minor Works (MEIWC) is for additions / alterations that do NOT introduce a new circuit. EICR is for periodic inspection of existing installations."
          >
            <p>The EIC notes for the producer give four explicit cases for EIC use:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>The initial certification of a new installation</li>
              <li>
                For an addition or alteration to an existing installation where one or more new
                circuits have been introduced
              </li>
              <li>The replacement of a consumer unit / distribution board</li>
              <li>
                Certifying where there are multiple additions, or alterations or remedial works to
                the existing installation which do not extend to new circuits, as an alternative to
                the issue of multiple Minor Electrical Installation Works Certificates
              </li>
            </ol>
            <p>
              The fourth case is the practical convenience: rather than issuing a stack of MEIWCs
              for a programme of remedials, you may use a single EIC. Note &ldquo;may&rdquo; — it is
              not mandatory; multiple MEIWCs are still permitted.
            </p>
            <p>
              The notes also state explicitly: &ldquo;It is not to be used for periodic inspection
              and testing, for which an Electrical Installation Condition Report is to be used. For
              an addition or alteration which does not extend to the introduction of new circuits, a
              Minor Electrical Installation Works Certificate may be used.&rdquo;
            </p>
          </ConceptBlock>

          <Scenario
            title="A consumer unit replacement — which sections do I fill in?"
            situation="Domestic single-phase TN-C-S (PME) supply, 100 A. Replacing the existing CU with an 18-way dual-RCD unit with two AFDD/RCBOs on lighting circuits per the new Reg 421.1.7 / 411.3.4 recommendation. No new circuits introduced — only the CU is replaced and existing circuits reterminated."
            whatToDo={
              <>
                <span className="block">
                  Certificate: EIC (case 3 — replacement of a consumer unit). Not Minor Works — the
                  rules permit MEIWC only for changes that do not include CU replacement.
                </span>
                <span className="block">Section A: client name and address.</span>
                <span className="block">
                  Section B: installation address, description (&ldquo;Replacement of consumer unit
                  on an existing TN-C-S domestic installation&rdquo;), tick &ldquo;Alteration to an
                  existing installation&rdquo;.
                </span>
                <span className="block">
                  Section C: sign all three blocks (one competent electrician). Departures: none.
                  Risk assessment: not required (Reg 411.3.3 not invoked).
                </span>
                <span className="block">
                  Section D: 10 years next inspection (or sooner on change of occupancy).
                </span>
                <span className="block">
                  Section F: TN-C-S (PME) tick. 1-phase 2-wire AC. U/U₀ 230/230 V. Iₚf measured.
                </span>
                <span className="block">
                  Section H Schedule of Inspections: tick items 1.0 through 11.0 as appropriate.
                  Items 12.0 (bathroom) and 14.0 (prosumer) confirmed if applicable.
                </span>
                <span className="block">
                  Section I (Comments on existing): record any defects found in the existing
                  circuits during reterminate (e.g. degraded sheath at the back of the old CU, loose
                  neutrals) per Reg 644.1.2.
                </span>
                <span className="block">
                  Section J: 1 Schedule of Inspection, 1 Schedule of Circuit Details, 1 Schedule of
                  Test Results. Including column 30 entries for the new AFDD/RCBOs.
                </span>
              </>
            }
            whyItMatters="Consumer unit replacement is the single most common case where the wrong certificate is issued. Some installers default to Minor Works because they 'didn&rsquo;t add new circuits'. The EIC notes are explicit: CU replacement requires an EIC. Issuing a MEIWC for a CU replacement is a Reg 644.4.201 non-compliance."
          />

          <CommonMistake
            title="Issuing a Minor Works for a consumer unit replacement"
            whatHappens="The installer treats CU replacement as &lsquo;just changing a box&rsquo; and issues a MEIWC. The certificate is wrong on its face — the EIC notes explicitly list CU replacement as case 3 for EIC issuance. A subsequent EICR inspector will mark the certification as non-compliant; an insurance company may refuse to honour a claim because the certification is irregular."
            doInstead="Read the EIC notes once and remember the four cases for EIC issuance. CU replacement is case 3, full stop. Issue an EIC, complete Section H Schedule of Inspections, complete Sections I (existing comments) and J (schedules attached). The MEIWC is for additions and alterations that do NOT include CU replacement and do NOT introduce new circuits."
          />

          <CommonMistake
            title="Leaving Section D blank or filling in &lsquo;same as before&rsquo;"
            whatHappens="Section D is not optional — Reg 644.4 requires the recommended interval to first periodic inspection to be recorded. Leaving it blank invalidates the EIC for that requirement; writing &lsquo;same as before&rsquo; or &lsquo;5 years as last time&rsquo; on a new installation is meaningless because there is no &lsquo;before&rsquo;."
            doInstead="Pick an interval that matches the installation type and environment, and write it as &lsquo;X years&rsquo; or &lsquo;X months&rsquo; in the field. Domestic 10 years is the canonical default; commercial 5 years; industrial 3 years; special locations per Reg 651/652. The interval is the designer&rsquo;s recommendation — defend it if challenged."
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

          <ContentEyebrow>The A4:2026 changes to the EIC at a glance</ContentEyebrow>

          <ConceptBlock
            title="What A4:2026 actually changed on the EIC"
            plainEnglish="The form structure A through J is unchanged. The substantive changes are in Section F (TN-C-S PNB added), Section H Schedule of Inspections (item 4.23 AFDD added; item 5.12 lighting-RCD bullet expanded), and the cross-references to the model schedules (column 30 AFDD added on the Schedule of Test Results, see Module 8.3)."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Section F earthing arrangements:</strong> TN-C-S (PNB) added as an explicit
                tick option, per Reg 312.2.1.1 PNB requirements.
              </li>
              <li>
                <strong>Section H item 4.23:</strong> &ldquo;Confirmation of indication that AFDD(s)
                are operational (421.1.7; 532.6; 651.2(e))&rdquo; — added in support of the new Reg
                421.1.7 AFDD recommendation.
              </li>
              <li>
                <strong>Section H item 5.12:</strong> the bulleted list of circuits requiring 30 mA
                RCD additional protection now includes &ldquo;Final circuits supplying luminaires
                within domestic (household) premises (411.3.4)&rdquo; — promoting the lighting RCD
                requirement.
              </li>
              <li>
                <strong>Section H item 1.2 (residential SoI):</strong> &ldquo;Consumer&rsquo;s means
                of isolation (where present)&rdquo; promoted to its own item under Section 1.0
                INTAKE EQUIPMENT, aligning with Reg 462.1.201 main linked switch.
              </li>
              <li>
                <strong>Section H item 4.6:</strong> &ldquo;Presence of main linked switch (as
                required by 462.1.201)&rdquo; — A4 introduces this as an explicit check.
              </li>
              <li>
                <strong>Section J + Schedules:</strong> Schedule of Test Results column 30 (AFDD
                manual test) added, with the &ldquo;Not all AFDDs have a test button&rdquo;
                footnote.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'EIC is for new work: initial certification, new circuits, CU replacement, or multi-alteration in lieu of multiple Minor Works.',
              'Reg 644.4 → three signatures (design, construction, inspection). One competent person → all three blocks signed by them.',
              'Section D (next inspection interval) is mandatory — 10 yr domestic, 5 yr commercial, 3 yr industrial, special locations per Reg 651/652.',
              'Section F now includes TN-C-S (PNB) as an explicit option — Reg 312.2.1.1 (A4:2026 update).',
              'Section H Schedule of Inspections is the 14-item check-list (1.0 to 14.0). Item 4.23 (AFDD operational) and item 5.12 (lighting-RCD bullet) are A4 additions.',
              'Section I (Comments on existing) is mandatory for additions and alterations — Reg 644.1.2.',
              'Section J: schedules attached. Without them the certificate is invalid — Reg 644.3.',
              'Consumer unit replacement = EIC, not Minor Works. The four EIC use-cases are listed verbatim in the form notes.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do I need separate signatures for design, construction and inspection if I did all three myself?',
                answer:
                  'No — but you must sign all three blocks. Reg 644.4 requires the persons responsible for each role to sign for that role. Where one competent person covers all three roles, they sign all three blocks. The single-signature EIC for a domestic installation is the everyday case. What you must NOT do is leave a block blank because "it&rsquo;s the same person".',
              },
              {
                question:
                  'A client has asked me to issue an EIC for an existing installation that I did not install. They want it for an insurance valuation. Can I?',
                answer:
                  'No. The EIC notes are explicit: "It is not to be used for periodic inspection and testing, for which an Electrical Installation Condition Report is to be used." The client wants an EICR, even if they have called it the wrong thing. Issue an EICR with the appropriate Section E (Summary) and Section K (Observations) — that is the certificate for an existing installation valuation.',
              },
              {
                question:
                  'When the EIC notes say "the original Certificate is to be issued to the person ordering the work", what does "original" mean in the digital age?',
                answer:
                  'The EIC notes say: "The &lsquo;original&rsquo; Certificate is to be issued to the person ordering the work (Regulation 644.4). A duplicate should be retained by the person issuing the certificate." In digital practice, the signed PDF emailed to the client (with all schedules attached) is the original. You retain a copy. If the client subsequently asks for a hard copy, print and sign one — both copies are originals from the recipient&rsquo;s perspective.',
              },
              {
                question:
                  'On Section F, which voltage do I put in U/U₀ for a UK domestic installation?',
                answer:
                  'For a UK single-phase 230 V supply, U₀ = 230 V (line to neutral) and U = 230 V (between phase conductors — same on a single-phase supply). Write 230/230 V. For a 3-phase 4-wire supply, U₀ = 230 V (phase-to-neutral) and U = 400 V (phase-to-phase). Write 230/400 V. Note (1) on the form is "by enquiry" — the value can be obtained from the distributor if not measured.',
              },
              {
                question:
                  'A new EICR (not EIC) is being issued. Which form differs the most from the EIC?',
                answer:
                  'The EICR has Section E (SUMMARY OF THE CONDITION OF THE INSTALLATION — Satisfactory / Unsatisfactory verdict) and Section K (OBSERVATIONS with C1, C2, C3 and FI codes) instead of the EIC&rsquo;s declaration-style Section C / Section H. The EICR also uses a longer Schedule of Inspection (the residential one with items 1.0 through 8.0 plus sub-items, including 4.23 AFDD and 5.12 lighting RCD). Module 8.5 walks the EICR specifically.',
              },
              {
                question:
                  'For an addition that introduces one new circuit, do I issue an EIC or a Minor Works?',
                answer:
                  'EIC. The EIC notes case (b) is "for an addition or alteration to an existing installation where one or more new circuits have been introduced". Minor Works (MEIWC) is explicitly NOT for new circuits — the form&rsquo;s own subtitle reads "To be used only for minor electrical work which does not include the provision of a new circuit". Adding even one new circuit takes the work out of MEIWC scope into EIC scope.',
              },
              {
                question:
                  'I have a client who wants me to leave Section I blank on an alteration EIC because "the existing installation is fine". Can I?',
                answer:
                  'No. Reg 644.1.2 makes Section I mandatory for additions and alterations — the inspector must record any defects found, so far as is reasonably practicable, in the existing installation. If you genuinely found nothing, write that in Section I: "No defects observed in the existing installation during the course of carrying out the addition / alteration. Inspection limited to the parts of the existing installation made accessible by the works." That is a valid Section I entry. A blank Section I on an addition EIC is a Reg 644.1.2 non-compliance.',
              },
              {
                question: 'A Designer No 2 box exists on Section C. When is it used?',
                answer:
                  'The Designer No 2 line is footnoted "**Where there is mutual responsibility for the design". Use it where two parties hold joint design responsibility — for example, a consulting engineer who designed the distribution and an electrical contractor who designed the final circuits, with the client expecting joint responsibility. In a domestic installation where one electrician designs and installs, leave Designer No 2 blank — there is no second designer.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Electrical Installation Certificate — Module 8.4"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-8/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.5 Minor Works &amp; EICR
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

export default InspectionTestingModule8Section4;
