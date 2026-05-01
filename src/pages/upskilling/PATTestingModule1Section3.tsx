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
    id: 'patm1-s3-categories',
    question:
      "The IET Code of Practice §3 splits in-service equipment into categories that drive the test methods. Which categorisation is the IET CoP's primary axis?",
    options: [
      'Voltage band only.',
      'Mobility (movable, portable, hand-held, stationary, fixed) AND construction class (Class I, Class II, Class III).',
      'Manufacturer.',
      'Cost.',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP §3 distinguishes equipment by mobility (which drives the formal-visual and frequency questions) and by construction class (which drives the test sequence). Both axes feed into Table 7.1 starting frequencies and into Chapter 14 test methods. Voltage and rating are inputs to acceptance values, not to scope.',
  },
  {
    id: 'patm1-s3-fixed',
    question:
      'A wall-mounted hand drier is hard-wired via a fused spur. Is it inside the IET CoP scope?',
    options: [
      'No — fixed equipment is BS 7671 territory only.',
      'Yes — IET CoP §3.1 covers fixed equipment in service. The test methods adapt (the unit is energised in situ rather than plugged into the tester), but PE-continuity and IR / leakage are still the duties under EAWR Reg 4(2). The "in-service" question is about use, not mobility.',
      'Only if it has a removable plate.',
      'Only on construction sites.',
    ],
    correctIndex: 1,
    explanation:
      'A common misconception is that PAT is only for plug-in items. The IET CoP scope includes fixed equipment whose in-service condition needs maintenance. Hand driers, fixed luminaires with on-board electronics, fixed display units — all routinely covered as part of a complete PAT regime.',
  },
  {
    id: 'patm1-s3-IT',
    question:
      'An IT desktop with an integrated SMPS, a C13 IEC connector, and a separate detachable IEC mains lead. How does the IET CoP §3 classification apply?',
    options: [
      'Treat as a single item.',
      'The IT unit is one item (Class I or Class II per its rating plate) AND the IEC mains lead is a separate item (a Class I lead) — IET CoP §3.4 expressly identifies detachable IEC leads as separately tested items, with their own ID, their own continuity and IR readings, their own record.',
      'Only the IEC lead needs testing.',
      'Only the desktop needs testing.',
    ],
    correctIndex: 1,
    explanation:
      'IEC leads (and any detachable mains lead) are separately testable items because they wear independently of the equipment they serve. IET CoP §3.4 names them specifically. Pairing them with one item ID is one of the most common record-keeping errors and one that obscures lead-specific defects in the trend data.',
  },
  {
    id: 'patm1-s3-110V',
    question:
      'A 110 V CTE site transformer feeds three 110 V hand tools and a temporary lighting set. How many "items" appear on the equipment register?',
    options: [
      '1 — the transformer covers all of them.',
      '5 — the transformer plus each of the three hand tools plus the lighting set, each with its own ID, class and test history. The 230 V supply lead to the transformer (and any 110 V extension leads) are additional items.',
      '4 — one per hand tool plus transformer.',
      '2 — supply side and load side.',
    ],
    correctIndex: 1,
    explanation:
      'Every separately-testable item gets its own register entry. The 110 V system is the canonical example because the transformer + tools + leads + lights are all independently tested at different acceptance values. IET CoP Chapter 9 and §3.5 set this out.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which category below is OUTSIDE the IET CoP scope of "in-service inspection and testing of electrical equipment"?',
    options: [
      'A 230 V kettle plugged into a socket-outlet.',
      'A 110 V site grinder plugged into a transformer outlet.',
      'The fixed wiring of the socket-outlet itself, including the cable from the consumer unit.',
      'A wall-mounted hand drier hard-wired via a fused spur.',
    ],
    correctAnswer: 2,
    explanation:
      'Fixed wiring up to and including the socket-outlet sits inside BS 7671 (initial verification, EICR). The IET CoP picks up at the equipment side: anything connected by plug and socket, by spur, or by direct connection where the equipment is in-service equipment as opposed to part of the fixed installation.',
  },
  {
    id: 2,
    question:
      'IET CoP §3.1 distinguishes "movable", "portable" and "hand-held" equipment. Which is correct?',
    options: [
      'They are interchangeable terms.',
      'Movable: 18 kg or more, intended to be moved while in operation or wheeled (e.g. floor cleaners). Portable: less than 18 kg and intended to be moved while connected. Hand-held: portable and intended to be held in the hand during normal use (drills, irons, soldering irons).',
      'Movable means stationary equipment.',
      'Hand-held only refers to phones.',
    ],
    correctAnswer: 1,
    explanation:
      'The IET CoP definitions matter because hand-held equipment has the tightest acceptance values for protective-conductor continuity and is at higher risk of flex damage. Mis-categorising a hand-held as portable can lead to applying the wrong acceptance value at the test step.',
  },
  {
    id: 3,
    question: 'How does the IET CoP treat extension leads, multiway adaptors and IEC mains leads?',
    options: [
      'They are not in scope.',
      'IET CoP §3.4 / §15.4 treat them as separately-testable items, each with its own ID and its own test record. Extension leads in particular have their own continuity acceptance value driven by lead length and conductor csa, and are recommended for shorter test intervals because of frequent mechanical handling.',
      'Only the equipment they connect needs testing.',
      'They are tested only on construction sites.',
    ],
    correctAnswer: 1,
    explanation:
      'Leads are independent failure points. IET CoP Table 15.1 gives PE-continuity values for varying lengths and conductor sizes. Extension leads are also one of the highest-defect-rate categories in HSE incident data, justifying their own register entry and short-cycle frequency.',
  },
  {
    id: 4,
    question: 'A 400 V three-phase mobile welder on wheels — is this in-scope for PAT (IET CoP)?',
    options: [
      'No — three-phase equipment is outside scope.',
      'Yes. IET CoP §3 and Chapter 9 cover three-phase mobile equipment. Test methods adapt to the supply (industrial connector, three-phase test instrument capability) but the duties under EAWR Reg 4(2) and PUWER Reg 5/6 are identical. The competence requirement under EAWR Reg 16 is heightened for the inspector.',
      'Only if rated below 7.5 kW.',
      'Only if used outdoors.',
    ],
    correctAnswer: 1,
    explanation:
      'The IET CoP explicitly covers three-phase mobile equipment. The decisive factor is whether the equipment is in service via a connector or detachable supply, not the voltage band. Most general-purpose multifunction PAT testers do not test three-phase equipment directly; specialist three-phase testers or alternative procedures are needed.',
  },
  {
    id: 5,
    question:
      'A purely battery-operated cordless drill (18 V dc, no charger connected during use) — what is its status?',
    options: [
      'Always in scope.',
      'During battery use, the drill is generally outside the EAWR scope (no mains connection, no significant electrical danger). The charger and any mains-powered docking station ARE in scope as separate items. Many duty-holders still apply IET CoP user-check / formal-visual hygiene to battery tools because the mechanical risks — flex damage on the charger lead, broken keyless chuck — are still PUWER duties.',
      'Always out of scope.',
      'Only in scope above 24 V dc.',
    ],
    correctAnswer: 1,
    explanation:
      'The EAWR scope turns on whether mains energy is involved. Cordless tools in battery use generally are not. Their chargers and any mains accessories are. Best practice is to bring battery tools into the formal-visual programme (PUWER Reg 6) even if the combined inspection-and-test does not apply.',
  },
  {
    id: 6,
    question: 'A landlord supplies a kettle to a holiday let. Is the kettle within a PAT scope?',
    options: [
      'No — it is residential.',
      'Yes. Landlords have safety duties under the Landlord and Tenant Act, the Homes (Fitness for Human Habitation) Act 2018 and HSWA s.3 for non-employees. Equipment supplied to tenants is within the scope of the maintenance regime. Frequency is risk-assessed; many landlords adopt an annual cycle for furnished short-let properties. The IET CoP §3.6 explicitly covers landlord-supplied equipment.',
      'Only if the property is over 5 storeys.',
      'Only with HMOs.',
    ],
    correctAnswer: 1,
    explanation:
      'Landlord-supplied equipment is the canonical "non-employee" PAT scope. The duty arises from the supply, not the workplace. The IET CoP §3.6 and Indg236 both confirm landlord-supplied equipment falls within the in-service maintenance framework.',
  },
  {
    id: 7,
    question:
      'A vending machine on a corridor in an office, owned by a third-party vending operator. Whose PAT duty?',
    options: [
      'The site occupier — they have the equipment on their premises.',
      'Primarily the vending operator (the duty-holder for their equipment), but the site occupier owes HSWA s.3 duties to non-employees and should verify proportionately that the vending operator has a programme. CDM 2015 / commercial leases often apportion responsibility contractually, but the statutory duties remain.',
      'Neither — vending machines are exempt.',
      'The local authority.',
    ],
    correctAnswer: 1,
    explanation:
      'Equipment ownership is the primary driver of the EAWR duty-holder identity. The site occupier still has s.3 obligations to anyone affected by the equipment, which is why most office leases address this in the schedule of services / conditions.',
  },
  {
    id: 8,
    question: 'IET CoP §3.5 covers RCDs and portable RCDs. How are they treated in the PAT regime?',
    options: [
      'Identically to extension leads.',
      'Plug-in / portable RCDs (BS 7071, BS 7288) are separately-testable items in their own right. The IET CoP requires a trip-time test (using the instrument RCD function) in addition to the standard continuity / IR. The RCD is part of the protective regime for the downstream equipment.',
      'They are not testable.',
      'Only fixed RCDs are testable.',
    ],
    correctAnswer: 1,
    explanation:
      'Portable RCDs are protective devices and need a trip-time check at I&Delta;n on every formal inspection. A failed portable RCD is invisible to the user but compromises the entire downstream protective strategy.',
  },
  {
    id: 9,
    question:
      'Equipment used outdoors that has been temporarily brought inside for testing. What does the IET CoP advise?',
    options: [
      'No special handling.',
      'IET CoP §14 advises testing equipment in conditions reasonably representative of its in-service environment. Equipment that lives outdoors should be tested clean and dry (you cannot meaningfully measure IR through a wet enclosure), but the ingress and external-condition formal-visual checks should be performed in or near its service environment so that the inspector can see how it is actually used.',
      'Test only outdoors.',
      'Test only in summer.',
    ],
    correctAnswer: 1,
    explanation:
      'The risk of "test bench / job site" disconnect is that the testing environment is artificially benign. Inspecting equipment in its service location, then performing the instrument tests in clean conditions, is the IET CoP-consistent approach.',
  },
  {
    id: 10,
    question:
      'A duty-holder decides to omit "fixed" equipment (hand driers, immersions, fixed display kits) from their PAT register because "BS 7671 covers them via EICR". What is the legal exposure?',
    options: [
      'No exposure — the EICR is sufficient.',
      "EAWR Reg 4(2) and PUWER Reg 5/6 are not satisfied for the in-service condition of those items by an EICR alone. The EICR confirms the fixed wiring up to the unit; it does not verify the unit's own protective-conductor continuity, IR, or condition. The IET CoP §3.1 and Chapter 14 explicitly cover the in-service inspection and testing of fixed equipment, and a duty-holder omitting them has a defendable gap to fill.",
      'PUWER does not apply to fixed equipment.',
      'Only mobile equipment is in scope of EAWR.',
    ],
    correctAnswer: 1,
    explanation:
      "The EICR / PAT split is one of the most common boundary errors. Fixed equipment is in-service equipment when in use; its in-service condition is the duty-holder's concern under EAWR / PUWER, separately from the wiring that supplies it. The IET CoP fills the gap.",
  },
];

const PATTestingModule1Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Equipment covered by PAT | PAT Module 1.3 | Elec-Mate',
    description:
      'IET Code of Practice §3 categories — movable, portable, hand-held, stationary and fixed equipment, plus extension leads, IEC leads, portable RCDs, 110 V site systems, three-phase mobile equipment, IT and landlord-supplied items.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3"
            title="Equipment covered by PAT"
            description="The scope question. The IET Code of Practice §3 splits in-service equipment by mobility and by construction class. The decisive question is not 'is it portable' but 'is it in-service equipment whose maintenance is the duty-holder concern under EAWR / PUWER'."
            tone="yellow"
          />

          <TLDR
            points={[
              'IET CoP §3 covers all in-service electrical equipment — fixed, stationary, movable, portable, hand-held — connected by plug and socket, by spur or by direct connection.',
              'BS 7671 stops at the socket-outlet (Reg 110.1.1). Everything plugged into it, hard-wired beyond it, or in service downstream is potentially in scope of the IET CoP and HSG107.',
              'Each separately-testable item is a separate register entry. IEC mains leads, extension leads, multi-gang adaptors, portable RCDs and 110 V tool-side leads each have their own ID and their own test history.',
              'Battery-only equipment is generally outside the EAWR while in battery use; the charger and mains accessories are in scope. Best practice is to bring battery tools into the formal-visual programme under PUWER Reg 6.',
              "Landlord-supplied equipment, vending machines on third-party premises, and contractor-brought tools all sit under the duty-holder of the equipment's OWNER, with HSWA s.3 duties on the site occupier in parallel.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the IET CoP §3 mobility categories — fixed, stationary, movable, portable, hand-held — to any item of equipment',
              'Distinguish equipment in-scope of the IET CoP from equipment in-scope of BS 7671, using the socket-outlet boundary and the in-service test',
              'Itemise the separately-testable elements of a workplace electrical setup (e.g. a 110 V site system, an IT desktop with detachable lead, an extension lead in daily use)',
              'Identify equipment categories that need bespoke handling — portable RCDs, three-phase mobile, fixed equipment, battery tools — and the test-method adaptations each implies',
              'Determine the duty-holder for shared / contracted / landlord-supplied / vending-machine equipment',
              'Build a defendable equipment register that captures the right level of granularity for HSG107 / IET CoP / PUWER Reg 6(3) compliance',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The scope question — what is in, what is out</ContentEyebrow>

          <ConceptBlock
            title="The IET CoP scope statement"
            plainEnglish="The IET Code of Practice covers in-service electrical equipment connected by means of a flexible cable and plug, by a permanent connection (spur), or by a connector / coupler — used in any work or non-domestic environment in which an electrical system supplies it. The boundary with BS 7671 is the socket-outlet pin: BS 7671 governs the wiring up to the socket; the IET CoP governs the equipment connected to it."
            onSite="When in doubt, ask: is this an item that the duty-holder uses in service, separately from the fixed wiring? If yes, it is IET CoP scope. If it IS the fixed wiring, it is BS 7671 scope. The hand drier is the IET CoP; the cable feeding the hand drier is BS 7671."
          >
            <p>The IET CoP is explicit that scope follows USE, not just construction:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Equipment connected via a 13 A, 16 A or 32 A plug — plainly in scope.</li>
              <li>
                Equipment connected by spur (a fused connection unit feeding a hand drier, a heater,
                a fixed luminaire with on-board electronics) — in scope.
              </li>
              <li>Equipment connected by industrial connector (BS EN 60309) — in scope.</li>
              <li>
                Equipment connected by IEC C13 / C19 cordsets — both the equipment AND the cordset
                are in scope as separate items.
              </li>
              <li>
                Hard-wired fixed equipment in service — in scope, with adapted test methods (the
                unit is energised in situ rather than via the tester).
              </li>
            </ul>
            <p>What is OUT of the IET CoP scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>The fixed wiring itself — BS 7671 / EICR territory.</li>
              <li>
                Switchgear and distribution boards as fixed installation — BS 7671. (A panel with
                in-service test ports may be in IET CoP scope for those ports.)
              </li>
              <li>Pure battery equipment, in battery-only use, with no mains connection.</li>
              <li>
                Equipment specifically excluded by the IET CoP foreword — generally type-tested
                production equipment on a manufacturer\'s line, where bespoke test regimes apply.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Ed, 2020) · §3.1"
            clause={
              <>
                This Code of Practice applies to electrical equipment from the point at which it is
                supplied through a plug and socket-outlet, a flexible cable and connector or a spur.
                It applies to single-phase and three-phase equipment, and to equipment that is
                movable, portable, hand-held, stationary or fixed.
              </>
            }
            meaning="One paragraph encloses the whole scope. 'From the point at which it is supplied' — the socket pin, the connector, the spur. 'Movable, portable, hand-held, stationary or fixed' — every mobility category. The duty-holder cannot legitimately exclude an entire mobility category from their programme."
          />

          <ConceptBlock
            title="The mobility classifications — and why they matter"
            plainEnglish="IET CoP §3.1 defines five mobility categories. The category determines (a) the formal-visual checklist, (b) the recommended starting frequency in Table 7.1, and (c) the acceptance values for protective-conductor continuity. Mis-categorising at register-entry time propagates through every later step."
          >
            <p>The five categories:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Category</th>
                    <th className="text-left text-white/80 py-2">Definition (per IET CoP §3.1)</th>
                    <th className="text-left text-white/80 py-2">Examples</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Fixed</strong>
                    </td>
                    <td>Fastened to a support or otherwise secured in a specific location.</td>
                    <td>Hand drier, fixed display, immersion, fixed luminaire, electric shower</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Stationary</strong>
                    </td>
                    <td>
                      Equipment having a mass exceeding 18 kg and not provided with a carrying
                      handle. Not intended to be moved.
                    </td>
                    <td>Domestic / commercial fridge, large photocopier, dishwasher</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Movable</strong>
                    </td>
                    <td>
                      Either 18 kg or less and not fixed (intended to be moved while connected) OR
                      provided with wheels for movement.
                    </td>
                    <td>Floor cleaner, mobile fan heater, transportable photocopier</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Portable</strong>
                    </td>
                    <td>
                      Less than 18 kg, intended to be moved while in operation or which can easily
                      be moved from one place to another while connected.
                    </td>
                    <td>Kettle, toaster, desktop PC, table lamp</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>Hand-held</strong>
                    </td>
                    <td>Portable equipment intended to be held in the hand during normal use.</td>
                    <td>Hair drier, drill, iron, soldering iron, hot-air gun</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Hand-held equipment carries the tightest acceptance values for PE continuity (§15.4)
              and the shortest recommended starting frequencies in Table 7.1 — because it has the
              most mechanical handling and the user is in direct contact with the casing during
              fault.
            </p>
          </ConceptBlock>

          <Scenario
            title="The 'fixed equipment is BS 7671' misreading"
            situation="An office facilities manager argues that hand driers, the staff-room dishwasher and the fixed display monitors in reception are 'fixed equipment' and therefore covered by the building EICR. They omit them from the PAT register. After a thermal incident with a hand drier, the HSE asks for the unit in-service test history."
            whatToDo="The EICR confirms the wiring up to and including the spur or connection to each unit. It does not measure the unit\'s own PE-continuity, IR, or in-service condition. IET CoP §3.1 and Chapter 14 are explicit: fixed equipment in service is in scope, with adapted test methods (the unit is tested energised in situ, or by removing the unit and testing on the bench, depending on construction). Add all fixed equipment to the register, set risk-based frequencies, perform formal visual + adapted combined inspection-and-test, record."
            whyItMatters="The fixed-equipment gap is one of the highest-frequency boundary errors in HSE incident files. Duty-holders genuinely believe they are covered; they are not, and the gap is one defect away from being load-bearing."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Leads, adaptors and protective devices</ContentEyebrow>

          <ConceptBlock
            title="IEC mains leads — separate items, separate records"
            plainEnglish="A detachable IEC mains lead (C13 to BS 1363, C19 for higher current, C5 'cloverleaf' for laptops) is a separate item under IET CoP §3.4. It has its own asset ID, its own continuity reading, its own IR reading, and its own re-test cycle. Pairing it with the equipment it serves is one of the most common record-keeping mistakes."
          >
            <p>Why IEC leads need their own register entry:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                They wear independently of the equipment — frequent connect / disconnect cycles,
                cable damage near the cord entry on both ends.
              </li>
              <li>
                They are interchangeable. The lead with desktop A on Monday may be plugged into
                desktop B on Tuesday. Pairing the lead-test record with the desktop is misleading.
              </li>
              <li>
                Polarity at the C13 plug end is a defect mode that is invisible without polarity
                testing — and a polarity-reversed C13 lead can defeat protection on equipment whose
                fuse is in the line conductor.
              </li>
              <li>
                The acceptance values for PE continuity differ from "kettle plus integrated lead"
                because the lead can be longer and made up of different cable than the equipment\'s
                permanently-attached lead would be.
              </li>
            </ul>
            <p>
              Practical rule: number every IEC lead, record it, test it, label it. Most modern PAT
              testers have a dedicated "IEC lead" mode that runs continuity, IR and polarity in one
              operation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Extension leads, multi-gang adaptors and reels"
            plainEnglish="Extension leads, multi-gang adaptors and cable reels are some of the highest-defect-rate items in HSE incident data. They earn their own register entry, their own test record, and (typically) shorter test intervals than the equipment they serve."
          >
            <p>The defect modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable damage</strong> — runs across walkways, gets crushed, gets twisted at
                the strain reliefs.
              </li>
              <li>
                <strong>Reel-overheating when not fully unwound</strong> — a 13 A / 25 m reel left
                wound up at 13 A load can melt the inner sheath. The label on most reels states the
                de-rated current when wound; users seldom read it.
              </li>
              <li>
                <strong>Daisy-chained leads</strong> — cumulative volt-drop, mass terminations under
                one fuse, sometimes mixing 13 A and BS 4343 connectors via informal adaptors. The
                IET CoP and HSG107 advise against daisy-chaining.
              </li>
              <li>
                <strong>Multi-gang adaptors with built-in surge / RCD</strong> — these are
                separately-testable items. The RCD function needs a trip test each cycle.
              </li>
            </ul>
            <p>
              IET CoP Chapter 9 covers extension leads and adaptors specifically. Many duty-holders
              place these on a 12-month or shorter cycle in offices and a 3-month or shorter cycle
              in construction / harsh environments — separately from the equipment they connect.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Portable RCDs (BS 7071, BS 7288, BS 7375)"
            plainEnglish="Portable RCDs — plug-in to a socket, with the protected outlet on the other side — are protective devices in their own right. They need a trip-time test on every formal inspection cycle, in addition to the standard continuity / IR. A failed portable RCD silently removes a layer of protection from the equipment plugged into it."
          >
            <p>IET CoP §3.5 / §15 describes the test method:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Visual inspection of the RCD body — cracks, signs of overheating, integrity of
                test/reset buttons.
              </li>
              <li>Push the test button manually — the RCD should trip.</li>
              <li>
                Reset, then perform the instrument trip-time test at I&Delta;n. Record the tripping
                time in milliseconds.
              </li>
              <li>
                For Type AC RCDs, accept ≤ 200 ms at I&Delta;n. For Type A / B, refer to BS EN 61008
                / BS EN 61009 acceptance values.
              </li>
              <li>Combined continuity / IR test on the through-path of the RCD.</li>
            </ol>
            <p>
              A portable RCD whose test button works but whose internal magnetic / electronic trip
              has failed will pass the user check and fail the instrument test — the value of
              including portable RCDs in the formal regime.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §3.4"
            clause={
              <>
                Detachable supply cords, extension leads, multiway adaptors and any other accessory
                that forms part of the supply path to a piece of equipment shall be regarded as
                separate items of equipment and tested as such.
              </>
            }
            meaning="The lead-as-separate-item rule. Pairing a lead with the equipment it currently serves obscures lead-specific defect history and creates retest-cycle confusion when leads are swapped. Each lead earns its own ID, its own test record, its own life-cycle."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Industrial systems and harsh environments</ContentEyebrow>

          <ConceptBlock
            title="110 V CTE construction-site systems"
            plainEnglish="Construction site distribution typically uses a 110 V centre-tapped-earth (CTE) system. The 230 V supply feeds a portable transformer; the secondary is 110 V centre-tapped, giving 55 V to earth at any pole. The whole system is in IET CoP scope, with each element separately registered and tested."
          >
            <p>The components of a 110 V system that each earn separate register entries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The 230 V supply lead</strong> to the transformer (BS 4343 16 A / 32 A blue,
                or BS 1363 13 A on smaller transformers).
              </li>
              <li>
                <strong>The transformer itself</strong> — typically Class I, with its own continuity
                / IR test against the secondary side.
              </li>
              <li>
                <strong>110 V extension leads</strong> (yellow BS 4343 connectors, 16 A / 32 A) —
                each lead a separate item.
              </li>
              <li>
                <strong>The 110 V hand tools</strong> connected to the system — drills, breakers,
                grinders, lights.
              </li>
              <li>
                <strong>110 V temporary lighting sets</strong> — strings of festoon, work-lights,
                area lights.
              </li>
            </ul>
            <p>
              IET CoP Chapter 9 prescribes the test method specific to 110 V CTE: PE-continuity is
              still measured at &le; 0.1 Ω + 1 mΩ/m of flex, IR at 500 V dc to &ge; 1 MΩ, and the
              transformer secondary is the reference earth for the load-side tools. Frequencies are
              short — IET CoP Table 7.1 starting points are typically 1 month for hand-held and 3
              months for transformers in active use.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase mobile equipment"
            plainEnglish="A 400 V three-phase mobile welder, mobile generator, or three-phase site distribution unit IS in IET CoP scope. The test methods adapt to three-phase: industrial connectors, three-phase tester capability, balanced PE-continuity testing across phases. Competence under EAWR Reg 16 is heightened — many general-purpose PAT engineers are not competent for three-phase mobile equipment without specific training and instrument."
          >
            <p>Specific considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Connector type</strong> — typically BS EN 60309 (Form 16 A / 32 A / 63 A
                three-phase + neutral + earth, red).
              </li>
              <li>
                <strong>PE-continuity</strong> — measured to the earth pin of the connector;
                acceptance values track the same logic as single-phase but the cable is generally
                heavier-section.
              </li>
              <li>
                <strong>IR</strong> — between each line and earth, between each pair of lines, at
                500 V dc.
              </li>
              <li>
                <strong>Functional / load test</strong> — typically requires a three-phase test load
                set or in-situ verification on the site supply.
              </li>
              <li>
                <strong>Phase-rotation check</strong> — needed for any equipment whose direction of
                operation depends on phase rotation (motors, pumps).
              </li>
            </ul>
            <p>
              The duty-holder\'s competence matrix needs to call out three-phase mobile competence
              explicitly. A 2377-22 alone is not the competence claim for this scope.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating fixed equipment as out-of-scope because it has no plug"
            whatHappens="Hand driers, kitchenette dishwashers, immersion heaters, fixed display kits, electric showers, and fixed luminaires with on-board electronics are omitted from the register because they are hard-wired. After a defect or incident, the duty-holder discovers there is no in-service test history for the unit and the EICR is the only evidence — which is incomplete for the unit itself."
            doInstead="Bring all fixed equipment into the register. Adapt test methods: energised-in-situ measurement of PE continuity to the unit\'s casing; IR by isolating the unit and testing across the supply terminals to earth; combined inspection-and-test recorded in the IET CoP scope. Some inspectors prefer to coincide the formal inspection of fixed equipment with the building\'s EICR cycle, but the records must be distinct."
          />

          <CommonMistake
            title="Daisy-chained extension leads as a single item"
            whatHappens="Three 4-gang adaptors are connected in series on the corner of a desk. The duty-holder logs them as 'extension lead, ID 142'. The PE-continuity test is taken on the assembly — and reads acceptable because there are three sets of strain reliefs and short cable lengths. A defect in the second adaptor socket (loose CPC terminal under finger-tight) is masked by parallel paths via the other two. The user is electrically protected only by the 13 A fuse, not by the CPC."
            doInstead="Separately-testable items get separately-recorded test results. Adaptor A, adaptor B, adaptor C each have an ID and an individual test history. Daisy-chains are flagged for the duty-holder as a use defect (HSG107 §40 and IET CoP §10), not a mode of test."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Edge cases — battery, landlord-supplied, contractor-brought
          </ContentEyebrow>

          <ConceptBlock
            title="Battery-powered equipment and integrated chargers"
            plainEnglish="Battery-only equipment in battery use is generally outside the EAWR (no mains energy involved). The charger is in scope because it is mains-powered. Best practice is to bring battery tools into the formal-visual programme under PUWER Reg 6 even if the combined inspection-and-test does not apply to the tool itself."
          >
            <p>Practical breakdown:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cordless drill / angle grinder / impact driver</strong> — pure battery use,
                charger separate. Drill: PUWER Reg 6 formal visual (mechanical, chuck, casing, signs
                of misuse). Charger: full PAT regime (Class I or Class II per the rating plate,
                lead, plug, IR / continuity).
              </li>
              <li>
                <strong>Cordless tools with integrated chargers</strong> (rare on professional
                tools, more common on consumer-grade) — full PAT regime applies because the unit is
                mains-connectable.
              </li>
              <li>
                <strong>Power-over-Ethernet IT equipment</strong> — the PoE injector / switch is a
                Class I or Class II mains-powered item, in scope. The PoE-fed phone / camera at the
                far end is generally LV / SELV-supplied and treated under SELV principles (Class III
                in BS EN 61140 sense), with formal visual but no combined test.
              </li>
              <li>
                <strong>USB-charged devices</strong> — the charger / power supply unit is in scope
                (PAT). The USB lead and the device are typically out of scope for combined test but
                should be in the formal-visual regime for damage / overheating.
              </li>
            </ul>
            <p>
              The reasoning is consistent: where mains energy crosses into the equipment, EAWR
              engages. Where it does not (purely battery / SELV), the duty is PUWER Reg 6 and
              user-checks under HSWA s.7.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Landlord-supplied equipment"
            plainEnglish="A landlord supplying furnished accommodation is supplying equipment to occupants who are not their employees. HSWA s.3, the Landlord and Tenant Act, the Homes (Fitness for Human Habitation) Act 2018, and the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 all apply. Landlord-supplied equipment in furnished short-lets / HMOs / holiday lets is in scope."
          >
            <p>
              The IET CoP §3.6 expressly covers landlord-supplied equipment. The frequency question
              is risk-assessed but typically the starting position is:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Holiday lets and serviced accommodation</strong> — annual cycle, before each
                changeover for high-use items.
              </li>
              <li>
                <strong>HMOs / furnished long-let</strong> — annual or two-year cycle, with formal
                visual at change of tenancy.
              </li>
              <li>
                <strong>Unfurnished long-let</strong> — fixed wiring under EICR (5-yearly under the
                2020 regulations); equipment supplied by the tenant is out of scope of the
                landlord\'s programme.
              </li>
            </ul>
            <p>
              Records remain the defendable artefact. A landlord-supplied kettle without a test
              record is the same compliance gap as a workplace kettle without one.
            </p>
          </ConceptBlock>

          <Scenario
            title="The vending machine in the corridor"
            situation="A vending machine sits in the corridor of an office building. The vending operator owns it and services it. The site occupier hosts it under a placement contract. After a fault on the vending machine causes it to be reported via building maintenance, the question of 'whose PAT' arises."
            whatToDo="The vending operator is the duty-holder for the equipment they own (EAWR Reg 4(2), PUWER Reg 5/6 for them and their employees). The site occupier owes HSWA s.3 to anyone in the building affected by the equipment — they should hold evidence (proportionate to risk) that the vending operator has a maintenance regime. The placement contract typically apportions practical responsibility but does not transfer the statutory duty. Both parties should retain their part of the documentation."
            whyItMatters="Multi-party equipment situations are common — vending, IT-as-a-service equipment, leased coffee machines, contractor-brought tools. The default rule is that the OWNER holds the EAWR duty; the site occupier holds parallel HSWA s.3 duties. Mapping responsibility correctly is the first step in any incident response."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building the equipment register</ContentEyebrow>

          <ConceptBlock
            title="What every register entry must contain"
            plainEnglish="The equipment register is the foundation of the programme. Every separately-testable item gets one entry. The fields below are the minimum needed to support PUWER Reg 6(3) records, IET CoP §7 test data, and HSG107 trend analysis over time."
          >
            <p>Mandatory register fields:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Unique asset ID</strong> — barcode, RFID or printed sticker.
              </li>
              <li>
                <strong>Description</strong> — make, model, serial / batch ID where present.
              </li>
              <li>
                <strong>Mobility category</strong> — fixed / stationary / movable / portable /
                hand-held.
              </li>
              <li>
                <strong>Construction class</strong> — Class I / Class II / Class III.
              </li>
              <li>
                <strong>Voltage and current rating</strong>.
              </li>
              <li>
                <strong>Location</strong> — building, room or zone.
              </li>
              <li>
                <strong>Owner / department</strong>.
              </li>
              <li>
                <strong>Risk-assessed frequency</strong> with effective date and reasoning
                reference.
              </li>
              <li>
                <strong>Date acquired / first registered</strong>.
              </li>
              <li>
                <strong>Test history</strong> — every formal visual and combined inspection-and-test
                result, with inspector ID, instrument calibration ref, and numerical readings.
              </li>
              <li>
                <strong>Defect / repair / disposal log</strong>.
              </li>
            </ul>
            <p>
              The register format (paper, spreadsheet, dedicated PAT software) does not matter to
              the regulator — what matters is that it exists, is current, and is retrievable. The
              IET CoP and HSG107 are agnostic on format; they are prescriptive on content.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'IET CoP §3 covers all in-service electrical equipment — fixed, stationary, movable, portable, hand-held — connected by plug, spur, connector or direct wiring.',
              'BS 7671 stops at the socket-outlet (Reg 110.1.1). Everything beyond it is potentially IET CoP scope. EICR ≠ in-service equipment evidence.',
              'Mobility classification matters. Hand-held has the tightest acceptance values and the shortest starting frequencies; fixed has adapted test methods.',
              'Every separately-testable item is its own register entry — IEC leads, extension leads, multi-gang adaptors, portable RCDs, 110 V transformers, individual hand tools.',
              'Pure battery equipment in battery use is generally outside EAWR. Chargers, mains-powered docks, and any mains-connectable interface ARE in scope.',
              'Landlord-supplied equipment, vending machines, contractor tools — duty rests with the OWNER (EAWR Reg 4(2)) plus parallel HSWA s.3 duties on the site occupier.',
              '110 V CTE site systems and three-phase mobile equipment are in scope but require adapted test methods and heightened EAWR Reg 16 competence.',
              'The register is the foundation. Without it there is no programme, no PUWER Reg 6(3) record, no defendable trend data, no HSG107 §22 evidence base.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is fixed equipment (hand driers, immersions) in PAT scope?',
                answer:
                  'Yes. IET CoP §3.1 covers fixed in-service equipment alongside portable, hand-held, movable and stationary. Test methods adapt — typically energised-in-situ PE-continuity and isolated IR — but the duty under EAWR Reg 4(2) is identical. An EICR alone does not discharge the duty for the in-service condition of the unit itself.',
              },
              {
                question: 'Do I need to test cordless tools?',
                answer:
                  'The tool itself in battery use is generally outside the EAWR. The charger is in scope (full PAT regime). Best practice is to bring the cordless tool into the formal-visual programme under PUWER Reg 6 — mechanical condition, chuck integrity, casing, signs of misuse — even though the combined inspection-and-test does not apply.',
              },
              {
                question:
                  'How do I handle IEC mains leads — are they part of the equipment they connect?',
                answer:
                  'They are separate items. IET CoP §3.4 is explicit: detachable supply cords, extension leads, multi-way adaptors and any other accessory in the supply path are separately-testable items, each with their own asset ID, test record and re-test cycle. Pairing them with a single equipment item creates record-keeping confusion when leads are swapped.',
              },
              {
                question: 'What about a 400 V three-phase mobile welder?',
                answer:
                  'In scope. IET CoP Chapter 9 covers three-phase mobile equipment. Test methods adapt: industrial connector, three-phase tester capability, balanced PE-continuity, line-to-line and line-to-earth IR, phase-rotation check where direction-of-operation matters. EAWR Reg 16 competence is heightened — a generic PAT qualification alone is not the competence claim for this scope.',
              },
              {
                question:
                  'Do landlords have to PAT-test equipment they supply with rented properties?',
                answer:
                  'Yes, as part of the broader maintenance duty. HSWA s.3, the Landlord and Tenant Act, the Homes (Fitness for Human Habitation) Act 2018 and the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 all apply. IET CoP §3.6 expressly covers landlord-supplied equipment. Frequency is risk-assessed (typically annual for furnished short-lets / holiday lets, change-of-tenancy formal visual for HMOs).',
              },
              {
                question: 'A vending machine in our office is owned by the supplier — whose PAT?',
                answer:
                  'Primarily the supplier (the equipment owner is the duty-holder under EAWR Reg 4(2) for that equipment). The site occupier owes parallel HSWA s.3 duties to anyone affected and should hold evidence (proportionate to risk) that the supplier has a programme. The placement contract typically apportions practical responsibility but does not transfer the statutory duty.',
              },
              {
                question:
                  'How granular should the equipment register be — itemise every kettle, or category-level?',
                answer:
                  'Item-level. Each separately-testable physical item gets its own asset ID and its own test history, because (a) PUWER Reg 6(3) requires identification of the equipment, (b) defects and re-tests are item-specific, and (c) trend analysis needs item-level data. Category-level registers ("kettles x 14") fail Reg 6(3) and lose the diagnostic value of the data.',
              },
              {
                question: 'Are USB chargers and PoE devices in PAT scope?',
                answer:
                  'The mains-powered side is. A USB charger is a Class II low-power power supply unit and is in scope (PAT regime). The USB lead and the device powered from it are typically SELV / out of scope for combined test, but should be in the formal-visual regime for damage. PoE injectors and switches are mains-powered (in scope); the PoE-fed device at the far end is SELV (formal visual only).',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Equipment covered by PAT — Module 1.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 Frequency of inspection and testing
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

export default PATTestingModule1Section3;
