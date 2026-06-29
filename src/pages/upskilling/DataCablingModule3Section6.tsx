import { ArrowLeft, ChevronRight } from 'lucide-react';
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m3s6-laser-safety',
    question:
      'A junior wants to "just have a quick look" into a fibre patch lead to check if it is the live one before unplugging. The transceiver at the far end is rated Class 1M per BS EN 60825-2. What is the safety-critical answer?',
    options: [
      'Never look into a possibly-active fibre with the naked eye — Class 1M is dangerous under magnification.',
      'A quick naked-eye look is fine because Class 1M is eye-safe to the unaided eye.',
      'A naked-eye look is fine provided the fibre is multimode rather than single-mode.',
      'A naked-eye look is fine provided the exposure is kept under about five seconds.',
    ],
    correctIndex: 0,
    explanation:
      'BS EN 60825-2 (safety of optical fibre communication systems) is the governing standard. Class 1 is generally safe to unintentional exposure. Class 1M is generally safe to the naked eye but DANGEROUS under magnification — exactly the scenario of looking into a connector with a microscope or video probe. Class 3R can be dangerous to the naked eye. The infrared wavelengths used (850, 1310, 1550 nm) are invisible — there is no blink reflex, no heat warning at low power. The rule is simple: never visually inspect a fibre that may be active. Transceive the link down, OR use a fibre microscope / video probe (which is opto-electronically protected) — never the naked eye.',
  },
  {
    id: 'datacabling-m3s6-vfl-use',
    question:
      'A 200 m fibre link is reporting "no link" at the far end. You have a Visible Fault Locator (VFL) — a 650 nm red laser pen that injects visible light into the fibre. What can a VFL diagnose, and what can it NOT?',
    options: [
      'A VFL can diagnose every fibre fault, including high-loss and contaminated connectors.',
      'A VFL is usable only on single-mode fibre, never on multimode.',
      'A VFL finds continuity, breaks and macrobends but cannot measure loss or characterise splices.',
      'A VFL fully replaces the OTDR for link characterisation.',
    ],
    correctIndex: 2,
    explanation:
      'A VFL is a 650 nm red laser pen (typically Class 2 or Class 3R per BS EN 60825-1) that injects visible light into a fibre. Visible light is much shorter wavelength than telecoms IR, so any macrobend or fibre damage that lets visible light leak out of the jacket is also leaking IR. VFL strengths: continuity (does the light come out of the far end?), break location (where does the visible light stop?), macrobend location (where does the red glow appear on the jacket?). VFL limitations: cannot measure loss, cannot characterise splices, cannot see anything beyond the visible-light reach. Different tool for a different job.',
  },
  {
    id: 'datacabling-m3s6-cleaning',
    question:
      'A connector fails IEC 61300-3-35 inspection due to oil-residue contamination. Which cleaning method is appropriate, and what should NEVER be done?',
    options: [
      'Wipe the ferrule on a shirt-tail and re-inspect the endface.',
      'Wipe the ferrule with a regular paper towel and re-seat it.',
      'Blow the ferrule clean with compressed air from a can.',
      'Use an IBC click cleaner or a lint-free wipe with 99 % IPA, then re-inspect.',
    ],
    correctIndex: 3,
    explanation:
      'Cleaning protocol is fixed: IBC click cleaners or lint-free wipe with 99 % IPA, both inspected after. Blowing on a connector adds moisture and droplets. Compressed air can drive contaminants further into the ferrule and is generally not the right tool for ferrule cleaning (it has applications elsewhere in fibre work). Cloth, paper towel and tissue all leave lint. Water and most solvents are NOT used — IPA evaporates cleanly. After two failed cleaning attempts the connector should be re-terminated rather than further attempts at cleaning.',
  },
  {
    id: 'datacabling-m3s6-handover-pack',
    question:
      'Building handover: what minimum package should be presented to the client / facilities manager so the fibre infrastructure is properly handed over and maintainable?',
    options: [
      'A simple one-page pass / fail summary for the project file.',
      'Tier 1 + Tier 2 results, endface inspection, as-built records, a maintenance schedule and warranty registration.',
      'Just the Tier 2 OTDR baseline traces for each channel.',
      'A verbal walkthrough of the comms room with the FM team.',
    ],
    correctIndex: 1,
    explanation:
      'Handover is the moment the project transitions from build to operate. The client / FM team needs the COMPLETE package so they can maintain the system without re-engaging the original contractor for every routine query. Tier 1 + Tier 2 + endface inspection + as-built + maintenance schedule + calibration evidence + warranty + escalation contacts is the standard minimum. This is the same package the manufacturer warranty requires; presenting it well at handover earns the warranty AND sets the FM team up to manage the asset.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which standard governs laser safety for optical fibre communication systems, and what is the most important rule for the installer?',
    options: [
      'BS EN 60825-2 — and the rule is never to view a possibly-active fibre with the naked eye.',
      'BS 7671 Section 716, the wiring-regulations clause covering laser safety.',
      'Local fire regulations applied by the building control body for the site.',
      'There is no specific standard governing fibre laser safety in the UK.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 60825-2 is the governing standard for OFCS laser safety in the UK / EU. Class 1 (generally safe to unintentional exposure), Class 1M (safe to naked eye, NOT safe under magnification), Class 3R (potentially harmful direct viewing). The combination of invisible wavelength (no blink reflex), focusing optics in fibre microscopes (concentrates beam), and the fact that "off" links are routinely active during commissioning makes the never-look discipline the single most important on-site safety rule for fibre work.',
  },
  {
    id: 2,
    question: 'What is a VFL (Visible Fault Locator) and what does it do that an OTDR does not?',
    options: [
      'A VFL is simply another name for the same instrument as an OTDR.',
      'A VFL replaces all other fibre test instruments on the kit list.',
      'A red-light pen for continuity, break location and macrobend spotting — but it cannot measure loss.',
      'A VFL is a tool for copper twisted-pair testing only.',
    ],
    correctAnswer: 2,
    explanation:
      'A VFL is a fast diagnostic tool for the simplest fibre questions: is there continuity, where does the cable break, where is the macrobend? Visible 650 nm light leaks out of macrobends and breaks visibly on the cable jacket — you see the red glow, you find the fault. For loss budget, splice characterisation, return loss, etc., the OTDR and OLTS are the right tools. Most fibre installer kits carry a VFL as a quick-check tool alongside the OTDR / OLTS / fibre microscope.',
  },
  {
    id: 3,
    question:
      'What are the three most common fibre faults found in service, in rough order of frequency?',
    options: [
      'Broken cores, broken cores and more broken cores in roughly equal measure.',
      'Lightning strike damage followed by rodent attack on the cable jacket.',
      'Manufacturing defects in the fibre, splices and connectors.',
      'Endface contamination, then bad splices, then macrobends — all install / handling issues.',
    ],
    correctAnswer: 3,
    explanation:
      'Manufacturing defects are extraordinarily rare in modern fibre. The three dominant in-service fault classes are install / handling issues: contamination (~70 % of all fibre faults reported), bad splices (~15-20 %), macrobends (~10-15 %). The discipline that prevents all three: inspect-clean-inspect every connector before mating, fusion-splice with proper cleaver maintenance, route to manufacturer bend-radius limits with steel containment per BS 7671 §521.10.202.',
  },
  {
    id: 4,
    question: 'How do you clean a fibre connector that has failed IEC 61300-3-35 inspection?',
    options: [
      'Use an IBC click cleaner or lint-free wipe with 99 % IPA, re-inspect, and re-terminate if it still fails.',
      'Wipe the ferrule with a tissue and re-inspect the endface.',
      'Soak the connector in water to lift the contamination.',
      'Use compressed air only to blow the ferrule clean.',
    ],
    correctAnswer: 0,
    explanation:
      'IBC click cleaner or lint-free wipe + IPA — those are the two correct methods. Click cleaners are clean, fast and consistent — a single click advances a fresh section of cleaning tape across the ferrule end. IPA evaporates cleanly. After cleaning, re-inspect; if still fails, repeat once more; if still fails, the connector is damaged and needs re-termination. Wipes with cloth, paper or non-IPA solvents are wrong because they leave lint, residue or solvent traces.',
  },
  {
    id: 5,
    question: 'Why is a maintenance schedule provided at handover for a fibre infrastructure?',
    options: [
      'It is a sales upsell tacked onto the handover package.',
      'It is required for the building owner\u2019s tax records.',
      'Fibre is stable but not maintenance-free; a schedule gives the FM team a known inspection cadence.',
      'Maintenance is automated by the cabling itself, so the schedule is informational only.',
    ],
    correctAnswer: 2,
    explanation:
      'A fibre infrastructure is a 15-25 year asset. A maintenance schedule keeps it healthy — typically: monthly visual inspection of accessible cable routes and high-traffic panels; per-patch connector cleaning at any port disturbance; annual environmental check of comms rooms and splice closures; baseline OTDR re-test before any major upgrade; and full re-certification at 10-15 years or service-class change. The handover schedule lets the FM team plan work and ensures continuity when contractors change.',
  },
  {
    id: 6,
    question:
      'A live channel reports intermittent errors after a tradesman drilled a wall route nearby. First diagnostic action?',
    options: [
      'Replace all transceivers at both ends of the channel.',
      'Re-test every patch lead in the affected rack.',
      'Re-cable the entire link from end to end.',
      'Run an OTDR and compare against the day-one baseline to locate any new event near the works.',
    ],
    correctAnswer: 3,
    explanation:
      'OTDR baseline-comparison is the most powerful fault-localisation technique available for in-service fibre. The day-one trace is the reference; any new event in a current trace is a candidate fault. The wavelength axis (test at both 1310 and 1550) tells you whether the new event is bend-induced (long-wavelength dependent) or mechanical (wavelength-independent loss). The location axis tells you where on the cable to look. Replacing transceivers without an OTDR comparison would be guesswork.',
  },
  {
    id: 7,
    question:
      'Which BS 7671 clause governs cable support on a fibre cable run, and why is it relevant even though fibre carries no current?',
    options: [
      'Regulation 521.10.202 — fire-collapse support applies to fibre as a wiring system, so plastic-only support fails.',
      'No clause applies — fibre is exempt from cable support rules because it carries no current.',
      'Regulation 444.4.9, which covers signal cabling between separate buildings.',
      'Regulation 411.3.1, which covers protective earthing and automatic disconnection.',
    ],
    correctAnswer: 0,
    explanation:
      '§521.10.202 (verbatim from the A4:2026 RAG) is medium-agnostic — it applies to all wiring systems, fibre included. The compliance routes: steel cable containment (basket, tray, trunking) is deemed-to-comply (NOTE 2); steel or copper clips / saddles / ties are compliant (NOTE 4). Non-metallic clips / ties as the SOLE means of support are non-compliant (NOTE 3). On an escape route, this matters specifically — premature collapse hinders evacuation. For fibre, which is bend-radius sensitive, the chosen support method must also respect manufacturer bend-radius limits per BS EN 50174-2.',
  },
  {
    id: 8,
    question:
      'A planned service upgrade will move the link from 10GBASE-LR to 25GBASE-LR (single-mode). What pre-upgrade verification should be performed?',
    options: [
      'Just swap the transceivers and bring the link into service.',
      'No verification is required because the cabling has not changed.',
      'Re-verify Tier 1 insertion loss against the tighter 25G budget; locate any excess with OTDR.',
      'Re-cable everything to be sure the new service is supported.',
    ],
    correctAnswer: 2,
    explanation:
      'Service upgrades change the optical budget. 25 G transceivers typically have ~1 dB less budget than 10 G transceivers at the same wavelength — so a link that comfortably passed 10 G may not pass 25 G. The pre-upgrade discipline: re-verify Tier 1 against the new budget, locate any excess loss with Tier 2, remediate. The day-one OTDR baseline is invaluable here as the reference. Document the re-verification — the upgraded link is now warrantied (or self-certified) for the new service.',
  },
  {
    id: 9,
    question:
      'What BS EN 60825-2 laser-class is typical for a 10GBASE-LR (1310 nm SM Ethernet) transceiver, and what does that mean in practice?',
    options: [
      'Class 4 — the highest hazard class, harmful even from diffuse reflection.',
      'Class 3B — hazardous on direct beam viewing.',
      'Class 5 — a special-hazard designation for telecoms sources.',
      'Typically Class 1 or 1M — eye-safe unaided, but treat as dangerous under microscope magnification.',
    ],
    correctAnswer: 3,
    explanation:
      'Most in-building telecoms transceivers (1G / 10G / 25G short / long reach) are Class 1 or Class 1M per BS EN 60825-2. Long-haul DWDM, EDFA / Raman amplifier outputs, and some specialty test sources are Class 3R or higher. The default safe-discipline assumption is Class 1M — safe to the naked eye but DANGEROUS under magnification — because routine inspection uses fibre microscopes / video probes. The rule: confirm de-energisation before any optical inspection.',
  },
  {
    id: 10,
    question:
      'At handover of a fibre infrastructure, what minimum maintenance information should the contractor leave with the FM team?',
    options: [
      'A maintenance schedule, cleaning protocol, spares list, bend-radius limits, escalation contacts, warranty details and the day-one baselines.',
      'Just the contractor\u2019s contact details for any future queries.',
      'A copy of the Tier 2 OTDR baseline trace and nothing else.',
      'A verbal handover walkthrough with the FM team only.',
    ],
    correctAnswer: 0,
    explanation:
      'A fibre infrastructure is a long-life asset that the FM team will manage for 15-25 years. Maintenance schedule + cleaning protocol + spares list + inspection guidance + bend-radius limits + escalation + warranty + day-one baselines is the minimum set. Without it, the team manages by re-engaging the original contractor for every query — expensive and slow. With it, the team is self-sufficient and the cabling lives its design life. This is the professional handover — the asset transitions cleanly from build to operate.',
  },
];

const faqs = [
  {
    question: 'Why is "never look into an active fibre" the headline laser-safety rule?',
    answer: (
      <>
        Telecoms wavelengths (850, 1310, 1550 nm) are entirely invisible — they sit beyond the
        visible spectrum. The eye has no blink reflex, no heat sensation, no warning. A Class 1M
        source is safe to the naked eye but DANGEROUS under magnification — exactly the scenario of
        looking into a connector with a fibre microscope or video probe. A Class 3R source is
        potentially harmful direct. Routine OFCS work assumes magnification, so the safe-discipline
        rule is: never inspect a fibre that may be active. Transceive the link down, OR use a fibre
        microscope / video probe (opto-electronically protected), OR confirm de-energisation by
        lock-out / tag-out at the active equipment. BS EN 60825-2 is the governing standard.
      </>
    ),
  },
  {
    question: 'Cleaning seems excessive — is it really needed every time, or only after problems?',
    answer: (
      <>
        Every time. Endface contamination is by a wide margin the most common fibre fault — a single
        fingerprint, dust particle, or oil residue dominates loss at one connector. The discipline
        is: inspect, clean, re-inspect, mate. Modern fibre microscopes implement IEC 61300-3-35 in
        firmware: capture image, segment into zones, count and size defects, report pass / fail. The
        five minutes per connector is part of the loss budget, not extra work. Skipping it is the
        most expensive five minutes a fibre installer can save.
      </>
    ),
  },
  {
    question: 'Can I use compressed air to clean fibre?',
    answer: (
      <>
        Generally no, particularly for ferrule endface cleaning. Compressed air can drive
        contaminants further into the ferrule cavity and the propellant in some canister-style air
        products leaves residue. The two correct cleaning methods are: IBC click cleaners (one-shot
        mechanical wipe via internal tape — the modern default) and lint-free wipes with 99 % IPA.
        There are specialty applications where compressed-air-style tools are used (cleaning the
        inside of a port adapter where wipes cannot reach), but ferrule endface cleaning is the
        click cleaner / IPA wipe domain.
      </>
    ),
  },
  {
    question: 'How often should an in-service fibre infrastructure be re-tested?',
    answer: (
      <>
        Permanent fibre infrastructure does not require routine re-testing — the links are stable.
        Re-test triggers: any patching change at the panel; any building works in the cable route
        (drilling, partition changes, ceiling work); any reported intermittent error or
        service-quality issue; any planned service upgrade (e.g. 10G → 25G transceiver change); and
        a baseline OTDR re-test on a 5-year cadence as part of the maintenance schedule. Every
        re-test should compare against the day-one baseline as the reference. The baseline is the
        as-built record, kept in the cabling administration system per BS EN 50174-1 § 6 /
        TIA-606-D.
      </>
    ),
  },
  {
    question: 'What spares should an FM team hold for a fibre infrastructure?',
    answer: (
      <>
        At minimum: patch leads of each connector type, polish grade and fibre type used in the
        building (typical mix: LC duplex UPC SM, LC duplex APC SM if present, LC duplex MM, with 1
        m, 2 m, 5 m lengths); cleaning consumables (IBC click cleaners or compatible cleaning tape,
        lint-free wipes, 99 % IPA in small bottles); spare patch panel adapters (LC duplex UPC and
        APC); a fibre microscope or video probe if not centrally held; ESD-safe handling materials.
        Quantities scale with port count — typical rule of thumb ~10 % of port count for patch lead
        spares, plus consumable resupply on quarterly cadence.
      </>
    ),
  },
  {
    question: 'Are there UK regulatory rules specifically for fibre handover documentation?',
    answer: (
      <>
        Not for fibre specifically — the cabling-installation standards (BS EN 50174-1 §6 for
        labelling and administration, TIA-606-D as the international counterpart) define the
        documentation discipline; BS EN 50346 / IEC 61280 series cover testing; manufacturer
        warranty programmes lay specific evidence requirements on top. BS 7671:2018+A4:2026 applies
        indirectly: §444.4.9 (verbatim — metal-free fibre between buildings preferred), §521.10.202
        (verbatim — fire-collapse cable support including fibre containment), and §545 (entirely new
        in A4:2026 — ICT functional earthing, applies to active equipment connected to the fibre).
        The fibre cabling installation itself sits primarily under the BS EN 50173 / 50174 standards
        stack.
      </>
    ),
  },
];

const DataCablingModule3Section6 = () => {
  const navigate = useNavigate();

  useSEO(
    'Fault Finding, Handover and Maintenance | Data Cabling Module 3.6 | Elec-Mate',
    'Fibre fault diagnostics — VFL continuity / break / macrobend, OTDR baseline comparison, IBC / lint-free cleaning protocols, IEC 61300-3-35 endface inspection, BS EN 60825-2 laser safety, and the handover package + maintenance schedule that lets the FM team manage the asset for 15-25 years.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6"
            title="Fault Finding, Handover and Maintenance"
            description="The diagnostic stack — Visible Fault Locator, OTDR baseline comparison, IEC 61300-3-35 endface inspection — the cleaning protocols (IBC click cleaners, lint-free + IPA), BS EN 60825-2 laser safety discipline, the complete handover package, and the maintenance schedule that lets the FM team manage a fibre infrastructure across its 15-25 year design life."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 60825-2 governs OFCS laser safety. Telecoms wavelengths (850, 1310, 1550 nm) are invisible — no blink reflex. Class 1 / 1M sources are routine; Class 1M is dangerous under magnification (i.e. fibre microscope). Never look into an active fibre with the naked eye, ever.',
              'Three most common fibre faults: endface contamination (~70 % of all reported), bad splice, macrobend. Cleaning protocol: IBC click cleaner or lint-free wipe + 99 % IPA — never blow, never wipe with cloth. Re-inspect per IEC 61300-3-35; re-terminate after two failed cleans.',
              'Diagnostic toolkit: VFL (650 nm red pen for continuity / break / macrobend localisation), OTDR (baseline-comparison for any cabling-change-induced fault), Tier 1 OLTS (loss against budget), fibre microscope (endface inspection per IEC 61300-3-35). Each tool, each job.',
              'Handover package: Tier 1 + Tier 2 + IEC 61300-3-35 + BS EN 50174-1 / TIA-606-D as-built records + maintenance schedule + spares list + escalation contacts + manufacturer warranty registration. Plus day-one OTDR baseline. The FM team needs this to manage the 15-25 year asset.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS EN 60825-2 laser-safety discipline — Class 1 / 1M / 3R awareness, never-look-naked-eye rule, fibre microscope and video probe safe practice',
              'Use a Visible Fault Locator (VFL) for continuity, break-location and macrobend diagnostics on multimode and short single-mode runs',
              'Use OTDR baseline-comparison as the primary fault-localisation method for in-service fibre changes — comparing current trace against day-one baseline',
              'Apply the cleaning protocol — IBC click cleaner or lint-free wipe + 99 % IPA, IEC 61300-3-35 inspection before / after — and avoid the never-do techniques (blowing, cloth wipe, water, paper towel)',
              'Identify the three most common fibre faults (contamination, splice, macrobend) by signature on a trace and by visual / handling clues',
              'Compile a complete handover package — Tier 1 + Tier 2 + endface inspection + as-built records + maintenance schedule + spares + escalation + warranty registration',
              'Plan a maintenance schedule with appropriate cadences (visual / cleaning / environmental / re-test) for a 15-25 year fibre infrastructure',
              'Apply BS 7671 §521.10.202 fire-collapse support rules and §444.4.9 separate-buildings preferences as ongoing maintenance considerations alongside the cabling-standard install rules',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Laser safety — BS EN 60825-2</ContentEyebrow>

          <ConceptBlock
            title="Class 1 / 1M / 3R, invisible IR, and the never-look discipline"
            plainEnglish="Optical fibre communication systems use infrared wavelengths (850, 1310, 1550 nm) that are entirely invisible — beyond the visible spectrum. There is no blink reflex, no heat sensation at low power, no warning. BS EN 60825-2 (Safety of optical fibre communication systems) classifies sources by hazard: Class 1 (generally safe to unintentional exposure), Class 1M (safe to naked eye but DANGEROUS under magnification), Class 3R (potentially harmful direct viewing). Routine telecoms transceivers are Class 1 or 1M; long-haul amplifiers can be 3R. The never-look rule applies to ALL OFCS work because Class 1M is dangerous under the fibre microscope or video probe routinely used for inspection."
            onSite="The discipline is fixed: never look into an active fibre, an active connector, or an active patch lead with the naked eye. Use a fibre microscope or video probe (opto-electronically protected) for endface inspection, AFTER confirming the link is de-energised — transceiver off, link down. Lock-out / tag-out at the active equipment for any extended work. Treat every connector face you cannot account for as live."
          >
            <p>BS EN 60825-2 hazard classes for OFCS:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Class 1.</strong> Safe under all reasonably foreseeable conditions of use,
                including with magnifying optics. Most in-building short-reach LR transceivers fall
                here. No specific access restriction.
              </li>
              <li>
                <strong>Class 1M.</strong> Safe to the naked eye but DANGEROUS under magnification
                (fibre microscopes, video probes, magnifying optics generally concentrate the beam).
                Many telecoms transceivers in the LR / ER range. Access restriction: no magnified
                inspection while the source is active.
              </li>
              <li>
                <strong>Class 3R.</strong> Potentially harmful direct viewing of the beam. Long-haul
                amplifiers (EDFA, Raman), some specialty test sources. Access restriction: no direct
                viewing, no magnified viewing, lockout protocol.
              </li>
              <li>
                <strong>Higher classes (3B, 4).</strong> Rare in commercial telecoms. Specialty /
                industrial / metrological applications. Strict access restriction; specialised
                training and PPE required.
              </li>
            </ul>
            <p>
              The default safe-discipline assumption for any work where the laser class is not
              positively confirmed: assume Class 1M and treat accordingly. Confirm de-energisation
              before any optical inspection. Use the fibre microscope or video probe in its
              protected mode (most modern devices include filtering / protection automatically).
              Never override the protection.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60825-2 (Safety of optical fibre communication systems — paraphrased)"
            clause={
              <>
                Optical fibre communication systems shall be classified by hazard class according to
                the accessible emission limit at any reasonable point of access along the cabling.
                The classification depends on the source power, the wavelength and the accessibility
                of the optical signal. Class 1 systems are inherently safe under normal use; Class
                1M systems are safe to the naked eye but require precautions where magnifying optics
                may be used; Class 3R systems require restricted access and trained-operator
                protocols. Warning labels and access markings shall be applied where required by the
                classification.
              </>
            }
            meaning="The classification is the hazard rating; the install discipline is the safe-work rule. For a UK fibre installer the rule is consistent: never look into an active fibre with the naked eye, never use a fibre microscope on a connector that may be active, transceive the link down before any inspection, treat every connector you cannot account for as live. Most OFCS transceivers are Class 1 or 1M; long-haul amplified systems can escalate to Class 3R."
            cite="Paraphrased from BS EN 60825-2 — Safety of laser products, Part 2: Safety of optical fibre communication systems"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The diagnostic toolkit</ContentEyebrow>

          <ConceptBlock
            title="VFL, OTDR, OLTS, fibre microscope — each tool, each job"
            plainEnglish="Fibre fault-finding uses a small toolkit, each instrument doing one specific job. A Visible Fault Locator (VFL) is the fast continuity / break / macrobend tool. An OTDR is the per-event characterisation and baseline-comparison tool. An OLTS / power meter is the loss-against-budget tool. A fibre microscope or video probe is the endface inspection tool per IEC 61300-3-35. The skill is knowing which tool answers which question — using a microscope to find a break is wrong, using a VFL to measure loss is wrong, using an OTDR alone for certification is wrong."
            onSite="On a fault call, the workflow is: ask what changed (was there building work? a patch change? a service upgrade?); inspect the obvious things (port lights, transceiver power, patch-lead colour-coding); pick the right diagnostic tool. A reported break = VFL first (fast, visual). An intermittent error after recent works = OTDR baseline-comparison. A new service refusing to link = Tier 1 OLTS against the new budget. A connector-level issue = fibre microscope. Sequence the work by tool."
          >
            <p>The diagnostic toolkit, in functional order:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Visible Fault Locator (VFL).</strong> 650 nm red laser pen, typically Class
                2 or Class 3R per BS EN 60825-1. Inject visible light into the fibre. See where it
                leaks (macrobend, break, near-end fault). Reach: ~5-10 km on MM, similar on SM.
                Cannot measure loss; cannot characterise splices. Fast pass / fail tool for
                continuity / break / bend questions.
              </li>
              <li>
                <strong>Optical Time Domain Reflectometer (OTDR).</strong> Pulsed time-domain
                backscatter instrument. Run a current trace, compare against the day-one baseline,
                identify any new event. Bidirectional + dual-wavelength is the gold standard. The
                primary fault-localisation tool for any in-service cabling change.
              </li>
              <li>
                <strong>Optical Loss Test Set (OLTS / LSPM).</strong> Calibrated source + meter,
                bidirectional dual-wavelength insertion-loss measurement. Tier 1 certification tool.
                Use for service-readiness verification (any service upgrade) and for
                budget-vs-measurement comparison.
              </li>
              <li>
                <strong>Fibre microscope / video probe.</strong> Endface inspection per IEC
                61300-3-35. Image-segmentation firmware in modern instruments classifies defects by
                zone and reports pass / fail automatically. Used before EVERY mate, after every
                cleaning, and as part of any fault investigation.
              </li>
              <li>
                <strong>Cable identifier / clip-on tester.</strong> Optional. Identifies a specific
                fibre on a multi-fibre patch panel without disturbing the link. Useful for FM-team
                work where the as-built records are incomplete.
              </li>
            </ul>
            <p>
              The discipline of "the right tool for the right question" matters. Spending an hour
              running OTDR traces when a 30-second VFL test would have answered the question is
              wasted time. Equally, declaring a link working from a VFL pass without an OLTS loss
              test is sloppy commissioning.
            </p>
          </ConceptBlock>

          {/* Diagnostic decision tree diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fault-finding decision tree — symptom routes to the right diagnostic tool
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A vertical decision tree. At the top, the root box asks what the reported fibre symptom is. A horizontal bus runs below the root and splits into four parallel branches, each on its own column. Column 1: break or no-light leads down to the Visible Fault Locator. Column 2: intermittent or post-works fault leads down to OTDR baseline comparison. Column 3: a new service that will not link leads down to a Tier 1 OLTS test. Column 4: a connector-level issue leads down to fibre-microscope inspection per IEC 61300-3-35. All connectors between levels are vertical and horizontal only — no diagonals. A legend at the bottom records safety, cleaning protocol, regulations, recording and re-certification rules."
            >
              {/* ===== Level 1: Root ===== */}
              <rect
                x="320"
                y="20"
                width="260"
                height="60"
                rx="10"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="44"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                REPORTED FIBRE SYMPTOM
              </text>
              <text
                x="450"
                y="64"
                textAnchor="middle"
                fill="#FAF5FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                what changed? what is the complaint?
              </text>

              {/* Vertical drop from root */}
              <line x1="450" y1="80" x2="450" y2="110" stroke="#9CA3AF" strokeWidth="1.4" />

              {/* Horizontal bus */}
              <line x1="115" y1="110" x2="785" y2="110" stroke="#9CA3AF" strokeWidth="1.4" />

              {/* Four vertical drops to symptom row */}
              <line x1="115" y1="110" x2="115" y2="150" stroke="#9CA3AF" strokeWidth="1.4" />
              <line x1="338" y1="110" x2="338" y2="150" stroke="#9CA3AF" strokeWidth="1.4" />
              <line x1="562" y1="110" x2="562" y2="150" stroke="#9CA3AF" strokeWidth="1.4" />
              <line x1="785" y1="110" x2="785" y2="150" stroke="#9CA3AF" strokeWidth="1.4" />

              {/* ===== Level 2: Symptom row ===== */}
              {[
                {
                  cx: 115,
                  fill: 'rgba(239,68,68,0.16)',
                  stroke: '#EF4444',
                  strong: '#FCA5A5',
                  light: '#FECACA',
                  a: 'Break / no-light',
                  b: 'continuity check needed',
                },
                {
                  cx: 338,
                  fill: 'rgba(34,211,238,0.14)',
                  stroke: '#22D3EE',
                  strong: '#A5F3FC',
                  light: '#CFFAFE',
                  a: 'Intermittent / post-works',
                  b: 'compare against day-one',
                },
                {
                  cx: 562,
                  fill: 'rgba(34,197,94,0.14)',
                  stroke: '#22C55E',
                  strong: '#BBF7D0',
                  light: '#DCFCE7',
                  a: 'Service won\u2019t link',
                  b: 'new transceiver, no light',
                },
                {
                  cx: 785,
                  fill: 'rgba(234,179,8,0.14)',
                  stroke: '#EAB308',
                  strong: '#FDE68A',
                  light: '#FEF3C7',
                  a: 'Connector-level issue',
                  b: 'one mating point degraded',
                },
              ].map((c, i) => (
                <g key={'sym-' + i}>
                  <rect
                    x={c.cx - 100}
                    y="150"
                    width="200"
                    height="64"
                    rx="8"
                    fill={c.fill}
                    stroke={c.stroke}
                    strokeWidth="1.6"
                  />
                  <text
                    x={c.cx}
                    y="178"
                    textAnchor="middle"
                    fill={c.strong}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="system-ui"
                  >
                    {c.a}
                  </text>
                  <text
                    x={c.cx}
                    y="196"
                    textAnchor="middle"
                    fill={c.light}
                    fontSize="10"
                    fontFamily="system-ui"
                  >
                    {c.b}
                  </text>
                </g>
              ))}

              {/* Vertical connectors with answer labels in clear gaps */}
              {[115, 338, 562, 785].map((cx, i) => (
                <g key={'conn-' + i}>
                  <line x1={cx} y1="214" x2={cx} y2="240" stroke="#9CA3AF" strokeWidth="1.4" />
                  {/* "match symptom" answer label sits in the empty zone — no shape behind */}
                  <text
                    x={cx + 14}
                    y="232"
                    fill="#FDE68A"
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="system-ui"
                    letterSpacing="0.06em"
                  >
                    MATCH
                  </text>
                  <line x1={cx} y1="240" x2={cx} y2="266" stroke="#9CA3AF" strokeWidth="1.4" />
                </g>
              ))}

              {/* ===== Level 3: Tool / action row ===== */}
              {[
                {
                  cx: 115,
                  fill: 'rgba(239,68,68,0.22)',
                  stroke: '#EF4444',
                  strong: '#FCA5A5',
                  light: '#FECACA',
                  t: 'VFL',
                  a: '650 nm red pen',
                  b: 'continuity · break · macrobend',
                },
                {
                  cx: 338,
                  fill: 'rgba(34,211,238,0.22)',
                  stroke: '#22D3EE',
                  strong: '#A5F3FC',
                  light: '#CFFAFE',
                  t: 'OTDR',
                  a: 'Tier 2 baseline-compare',
                  b: 'bidirectional dual-λ',
                },
                {
                  cx: 562,
                  fill: 'rgba(34,197,94,0.22)',
                  stroke: '#22C55E',
                  strong: '#BBF7D0',
                  light: '#DCFCE7',
                  t: 'OLTS',
                  a: 'Tier 1 vs link budget',
                  b: 're-verify new transceiver λ',
                },
                {
                  cx: 785,
                  fill: 'rgba(234,179,8,0.22)',
                  stroke: '#EAB308',
                  strong: '#FDE68A',
                  light: '#FEF3C7',
                  t: 'MICROSCOPE',
                  a: 'fibre microscope / video probe',
                  b: 'IEC 61300-3-35 endface',
                },
              ].map((c, i) => (
                <g key={'tool-' + i}>
                  <rect
                    x={c.cx - 100}
                    y="266"
                    width="200"
                    height="84"
                    rx="8"
                    fill={c.fill}
                    stroke={c.stroke}
                    strokeWidth="1.8"
                  />
                  <text
                    x={c.cx}
                    y="290"
                    textAnchor="middle"
                    fill={c.strong}
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="system-ui"
                    letterSpacing="0.06em"
                  >
                    {c.t}
                  </text>
                  <text
                    x={c.cx}
                    y="312"
                    textAnchor="middle"
                    fill={c.light}
                    fontSize="10"
                    fontFamily="system-ui"
                  >
                    {c.a}
                  </text>
                  <text
                    x={c.cx}
                    y="328"
                    textAnchor="middle"
                    fill={c.light}
                    fontSize="10"
                    fontFamily="system-ui"
                  >
                    {c.b}
                  </text>
                </g>
              ))}

              {/* ===== Legend / footer band ===== */}
              <rect
                x="30"
                y="392"
                width="840"
                height="304"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="50"
                y="418"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                SUPPORTING DISCIPLINES
              </text>

              <text
                x="50"
                y="446"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                SAFETY
              </text>
              <text x="150" y="446" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BS EN 60825-2 — never look into an active fibre with the naked eye
              </text>

              <text
                x="50"
                y="476"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CLEAN
              </text>
              <text x="150" y="476" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                IBC click cleaner or lint-free wipe + 99 % IPA · re-inspect after
              </text>

              <text
                x="50"
                y="506"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                REGS
              </text>
              <text x="150" y="506" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BS 7671 §521.10.202 fire-collapse support · §444.4.9 metal-free between buildings
              </text>

              <text
                x="50"
                y="536"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RECORD
              </text>
              <text x="150" y="536" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Compare against day-one baseline · update as-built per BS EN 50174-1 / TIA-606-D
              </text>

              <text
                x="50"
                y="566"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RE-CERT
              </text>
              <text x="150" y="566" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Service upgrade or major intervention → re-run Tier 1 + Tier 2 against new spec
              </text>

              <line
                x1="50"
                y1="592"
                x2="850"
                y2="592"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <text
                x="50"
                y="616"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                PROCEDURE — APPLY IN ORDER
              </text>
              <text x="50" y="640" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                1. Identify the symptom (what changed since the link last worked).
              </text>
              <text x="50" y="660" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                2. Pick the matching column above and apply the listed tool.
              </text>
              <text x="50" y="680" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                3. Compare results against the day-one baseline before declaring a fault.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cleaning protocols and the most common faults</ContentEyebrow>

          <ConceptBlock
            title="What gets contaminated, what cleans it, what to never do"
            plainEnglish="Endface contamination is by a wide margin the most common fibre fault — single fingerprint, dust particle, oil residue. The cleaning protocol is fixed and standardised: IBC (in-bulkhead cleaner) click cleaners are the modern default — one-shot mechanical wipe via internal cleaning tape; lint-free wipes with 99 % isopropyl alcohol (IPA) are the alternative. Re-inspect with a fibre microscope or video probe per IEC 61300-3-35 after cleaning. If still failing after two cleaning attempts, re-terminate."
            onSite="Cleaning is process-driven. Click cleaners come in formats matched to connector type (LC, SC, ST, FC, MTP/MPO) — buy the right ones for the cabling type on site. Lint-free wipes and IPA in small dropper bottles are the lab-style alternative. The discipline: inspect, clean, re-inspect, mate. Every connector. Every time."
          >
            <p>The cleaning toolkit, briefly:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>IBC click cleaner.</strong> One-shot mechanical wipe via internal cleaning
                tape. Format-matched to connector type. ~525 cleans per cleaner typical. The modern
                default for routine and emergency cleaning of patch panel and field connectors.
              </li>
              <li>
                <strong>Lint-free wipes + 99 % IPA.</strong> Low-residue medical / industrial wipes
                (NOT cloth, NOT paper towel, NOT tissue), wetted with 99 % IPA in a small dropper
                bottle. Wipe in a single direction across the ferrule end. Allow IPA to evaporate.
                Re-inspect.
              </li>
              <li>
                <strong>Fibre microscope / video probe.</strong> IEC 61300-3-35 firmware. Capture,
                segment, classify, pass / fail. Used before AND after any cleaning operation.
              </li>
              <li>
                <strong>Click cleaners for ports.</strong> A separate format for cleaning the inside
                of patch-panel adapters, where the wipe-on-ferrule technique cannot reach.
              </li>
            </ul>
            <p>What NEVER to do:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Never blow on a connector.</strong> Saliva droplets and exhaled moisture are
                worse contamination than what you started with.
              </li>
              <li>
                <strong>Never wipe with cloth, paper towel, tissue or shirt-tail.</strong> All leave
                lint and may scratch the polished surface.
              </li>
              <li>
                <strong>Never use water or unknown solvents.</strong> 99 % IPA is the
                evaporation-clean alternative; other solvents leave residue.
              </li>
              <li>
                <strong>Never use compressed air on the ferrule endface.</strong> Drives
                contaminants further into the cavity. (Compressed air does have valid applications
                elsewhere in fibre work — port adapters, outer cable surfaces.)
              </li>
              <li>
                <strong>Never accept a connector that fails inspection without cleaning.</strong>{' '}
                The five minutes are the loss budget.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Common fibre faults — signature, diagnostic, recovery"
            source="Industry composite — IEC 61280, IEC 61300-3-35, manufacturer guidance"
            headers={['Fault', 'Frequency', 'Signature', 'Diagnostic', 'Recovery']}
            rows={[
              [
                'Endface contamination',
                '~70 % of all reports',
                'IEC 61300-3-35 fail · elevated insertion loss at one connector',
                'Fibre microscope · OLTS or OTDR pinpoint',
                'IBC click cleaner / lint-free + IPA · re-inspect · re-terminate after 2 fails',
              ],
              [
                'Bad splice (drift)',
                '~15-20 %',
                'Elevated splice loss on OTDR · wavelength-asymmetric',
                'OTDR per-event · bidirectional dual-wavelength',
                'Re-splice · check cleaver maintenance · update as-built',
              ],
              [
                'Macrobend',
                '~10-15 %',
                'Wavelength-dependent loss step (worse at 1550) · visible red leak under VFL',
                'Dual-wavelength OTDR · VFL visual',
                'Re-route to respect bend radius · check containment edges',
              ],
              [
                'Cable damage post-install',
                'Project-specific',
                'New OTDR event vs day-one baseline at known location',
                'OTDR baseline-comparison',
                'Splice out damaged section · or replace length',
              ],
              [
                'Polish-grade mismatch',
                'Rare (avoidable)',
                'Spike in insertion / return loss · scratched ferrules',
                'Visual housing colour check · IEC 61300-3-35 inspection',
                'Replace damaged connectors · re-train on colour code',
              ],
              [
                'Water ingress (OPS)',
                'OPS-specific',
                'Slow attenuation rise · localised OTDR loss step',
                'OTDR baseline-comparison · visual closure inspection',
                'Replace splice closure · re-splice · re-document',
              ],
            ]}
            notes="Frequency percentages are approximate industry composites — vary by environment. The discipline that prevents most faults: inspect before mate, clean every time, respect bend radius, fusion-splice correctly, document the as-built. Cabling does not fail randomly — installation choices made years ago are what shows up in the fault report today."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Handover and the maintenance schedule</ContentEyebrow>

          <ConceptBlock
            title="The package the FM team needs · the cadence that keeps the asset alive"
            plainEnglish="A fibre infrastructure is a 15-25 year asset. Handover is the moment that asset transitions from the contractor\u2019s build phase to the FM team\u2019s operate phase. A complete handover package + a documented maintenance schedule is what lets the FM team manage the system without re-engaging the original contractor for every routine query — and what keeps the manufacturer warranty valid."
            onSite="The handover meeting at practical completion is a real working session, not a formality. The FM team should leave with: the complete commissioning package, a printed and digital maintenance schedule, a spares list, fault-escalation contacts, the manufacturer warranty registration evidence, and a walk-through of every comms room. Day-zero of operate phase = day-of-handover. Anything missing on day zero is a future cost."
          >
            <p>The handover package, item by item:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Tier 1 OLTS test reports.</strong> Per channel, bidirectional, dual-
                wavelength, against the calculated link budget. Reference method stated.
              </li>
              <li>
                <strong>Tier 2 OTDR baseline traces.</strong> Per channel, bidirectional, dual-
                wavelength. THIS is the day-one baseline used for all future fault-localisation.
              </li>
              <li>
                <strong>IEC 61300-3-35 endface inspection records.</strong> Per connector, with pass
                / fail and image evidence.
              </li>
              <li>
                <strong>As-built records.</strong> BS EN 50174-1 §6 / TIA-606-D — labels,
                identifiers, panel layouts, splice tray layouts, drawings, administration data.
              </li>
              <li>
                <strong>Maintenance schedule.</strong> Cadence (visual / cleaning / environmental /
                re-test), instructions, equipment list, consumable list.
              </li>
              <li>
                <strong>Spares list.</strong> Patch leads of each polish grade and connector type,
                cleaning consumables, adapter spares, spare pigtails for re-termination.
              </li>
              <li>
                <strong>Manufacturer warranty registration.</strong> Confirmation that the warranty
                is registered against the as-built and the commissioning package.
              </li>
              <li>
                <strong>Fault escalation contacts.</strong> Original contractor, manufacturer
                support, specialist sub-contractors (e.g. fibre splicing).
              </li>
              <li>
                <strong>Calibration evidence.</strong> UKAS / ISO 17025 calibration certificates for
                the test instruments used at commissioning.
              </li>
              <li>
                <strong>Conformance declaration.</strong> Signed contractor statement of
                installation conformance to manufacturer guidelines.
              </li>
            </ul>
            <p>The recommended maintenance cadence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Per patch change (event-driven).</strong> IEC 61300-3-35 inspect / clean /
                inspect / mate. Update administration record.
              </li>
              <li>
                <strong>Monthly visual inspection.</strong> Comms rooms, accessible cable routes,
                splice closures (OPS). Look for environmental issues, mechanical damage, tampering.
              </li>
              <li>
                <strong>Annual environmental check.</strong> Comms-room temperature / humidity logs,
                water ingress on OPS closures, support condition (per BS 7671 §521.10.202). BS EN
                50174-2 cable management compliance check.
              </li>
              <li>
                <strong>5-year baseline OTDR re-test.</strong> Every channel, bidirectional, dual-
                wavelength. Compare to day-one baseline. Document any drift; investigate any new
                events. Maintains warranty confidence.
              </li>
              <li>
                <strong>Pre-upgrade Tier 1 re-verification.</strong> Before any service-class
                upgrade (e.g. 10G to 25G), re-test against the new transceiver budget. Remediate any
                excess loss before the new service goes live.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §521.10.202 (verbatim — applies to fibre containment too)"
            clause={
              <>
                Wiring systems shall be supported such that they will not be liable to premature
                collapse in the event of a fire. NOTE 1: Wiring systems hanging across access or
                egress routes may hinder evacuation and firefighting activities. NOTE 2: Cables
                installed in or on steel cable containment systems are deemed to meet the
                requirements of this regulation. NOTE 3: This regulation precludes, for example, the
                use of non-metallic cable clips or cable ties as the sole means of support where
                cables are clipped direct to exposed surfaces or suspended under cable tray, and the
                use of non-metallic cable trunking as the sole means of support of the cables
                therein. NOTE 4: Suitably spaced steel or copper clips, saddles or ties are examples
                that will meet the requirements of this regulation.
              </>
            }
            meaning="Maintenance of fibre containment is in scope of §521.10.202. The FM team\u2019s annual environmental check should confirm: steel containment systems remain intact (basket / tray / trunking deemed-to-comply); steel or copper clips / saddles / ties are still in place where used; no plastic ties have been added as sole means of support during repairs or modifications. Plastic-tied fibre on an escape route is non-compliant in the same way as plastic-tied copper. Document the inspection result in the maintenance log."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Inheriting an undocumented fibre infrastructure and trying to maintain it without a baseline"
            whatHappens={
              <>
                FM team inherits a fibre infrastructure with no day-one OTDR baseline, no IEC
                61300-3-35 endface records, partial as-built drawings, and no maintenance schedule.
                Three years later, an intermittent error develops on a single channel. There is
                nothing to compare against — no baseline, no inspection record, no drawings showing
                splice locations. The fault investigation takes weeks instead of hours; the eventual
                fix is a full re-cable of the affected channel because the team cannot find the
                suspected fault location.
              </>
            }
            doInstead={
              <>
                Where you inherit an undocumented infrastructure, FUND a re-baselining at first
                opportunity: full Tier 1 + Tier 2 + IEC 61300-3-35 across the whole system, with a
                re-built as-built record per BS EN 50174-1 §6 / TIA-606-D. Treat it as the day-one
                baseline going forward. The cost is meaningful but small relative to the cost of
                fault-fighting an undocumented system for the rest of its life. For new
                installations, NEVER accept a fibre handover without the complete commissioning
                package — earn the asset by demanding the documentation.
              </>
            }
          />

          <Scenario
            title="Six months in: an FM team reports intermittent errors on the riser fibre"
            situation={
              <>
                A 12-storey commercial fit-out completed six months ago with a manufacturer 25-year
                cabling-system warranty. The FM team reports intermittent errors on one of the riser
                fibres feeding the 8th floor. The errors started shortly after a partition
                refurbishment on the 8th floor that involved drilling into a wall close to the riser
                route. You are the original contractor; the FM team has called you in.
              </>
            }
            whatToDo={
              <>
                Pull the day-one OTDR baseline for the affected channel from the commissioning
                package. Run a current OTDR trace bidirectional dual-wavelength with appropriate
                launch / tail cords. Compare events against the baseline — look for any new event at
                a position consistent with the 8th-floor refurbishment. If found, walk the cable
                route to that position and visually inspect for damage. Likely scenarios: a screw or
                fixing has penetrated the cable, a cable tie has been re-tightened too aggressively
                (macrobend), or a partition support has been added that flexes the cable. Remediate
                by splicing out the damaged section or replacing the affected length. Re-test
                bidirectional dual-wavelength; confirm the new trace matches the baseline (or a new
                baseline if the topology has changed). Document the fault, the cause, the
                remediation, and the new baseline in the as-built record. Brief the FM team on the
                building-works coordination procedure that should have been followed (notification
                of any work near cabling routes), to prevent recurrence.
              </>
            }
            whyItMatters={
              <>
                The day-one baseline is what makes this fault tractable. Without it, the
                investigation is forensic — walking 100 m of riser route with a torch looking for
                damage. With it, the OTDR pinpoints the fault to within a metre, the visual
                inspection confirms, and remediation is a one-day splice job. The 25-year warranty
                remains intact because the fault was caused by third-party damage (post-handover
                building works), not by the original install — but only if the documentation
                supports that conclusion. The full commissioning package is the evidence base.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'BS EN 60825-2 governs OFCS laser safety. Telecoms wavelengths are invisible — no blink reflex. Class 1 / 1M / 3R; assume 1M (dangerous under magnification) by default. NEVER look into an active fibre with the naked eye, ever.',
              'Diagnostic toolkit: VFL (continuity / break / macrobend), OTDR (baseline-comparison, per-event), OLTS (loss vs budget), fibre microscope (endface inspection per IEC 61300-3-35). Each tool, each job.',
              'Cleaning protocol: IBC click cleaner or lint-free wipe + 99 % IPA · re-inspect · re-terminate after two failures. NEVER blow / wipe with cloth / use water or unknown solvents / compressed air on a ferrule endface.',
              'Three most common fibre faults: contamination (~70 %), bad splice (~15-20 %), macrobend (~10-15 %). All install / handling issues. The discipline that prevents them: inspect before mate, splice with proper cleaver, respect bend radius.',
              'Handover: complete commissioning package + maintenance schedule + spares + escalation + warranty registration. Plus day-one OTDR baseline. Without it, the FM team cannot manage the asset; with it, the cabling lives 15-25 years.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-3-section-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Fibre testing and certification
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Continue to Module 4
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule3Section6;
