import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm3s1-tn-s-vs-c-s',
    question: "What's the practical difference between TN-S and TN-C-S?",
    options: [
      'TN-S has no earth; TN-C-S does',
      'TN-S has separate N and PE conductors throughout the supply network. TN-C-S combines N and PE as a single PEN conductor in PART of the system (typically the supply network) and splits them at or near the cut-out',
      'TN-S is for three-phase only',
      'TN-C-S has higher Ze',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 Definitions: TN-S — separate N and PE throughout. TN-C-S — combined PEN in part of the system (the supply network from transformer to cut-out), then split into separate N and PE inside the consumer's installation. TN-C-S is also called PME (Protective Multiple Earthing). It's the dominant UK arrangement because it's economical for the DNO — fewer conductors in the supply cable.",
  },
  {
    id: 'm3s1-pnb-meaning',
    question: "BS 7671:2018+A4:2026 introduces 'PNB' as a cert-form option. What does it mean?",
    options: [
      'Plug-Neutral-Bus',
      "Protective Neutral Bonding — a TN-C-S supply arrangement where there is only ONE connection point between the PEN conductor and the installation's earthing system (typically at the meter / cut-out), as opposed to multiple PME earth electrodes upstream",
      'Power Network Backup',
      'Phase-Neutral-Bonding',
    ],
    correctIndex: 1,
    explanation:
      "PNB (Protective Neutral Bonding) is a TN-C-S arrangement variant — the supply system has the PEN combined, but there's only one point of connection from PEN to the installation's earthing system (at the cut-out / meter position). The conventional PME has multiple earth electrodes along the DNO's network. PNB is more common in newer / rural supplies. A4:2026 makes 'TN-C-S (PNB)' an explicit cert-form option so the inspector can record exactly what the supply arrangement is.",
  },
  {
    id: 'm3s1-tt-when',
    question: 'In which scenarios would you typically encounter a TT supply?',
    options: [
      'All UK domestic',
      'Caravans, agricultural buildings, properties without DNO-provided earth, some rural / remote supplies, marinas',
      'Hospitals only',
      'Industrial three-phase only',
    ],
    correctIndex: 1,
    explanation:
      "TT — Terra-Terra — means the installation has its own earth electrode, with NO protective conductor coming from the supply. Common in: caravans (own earth electrode required), agricultural buildings (long supply runs make DNO earth unreliable), properties where the DNO doesn't or won't provide an earth, marinas (water + EV charging risk), some rural / remote supplies. Designs on TT differ significantly from TN — RCD-led ADS (Reg 411.5.3), tighter disconnection times for distribution circuits, electrode-resistance considerations.",
  },
  {
    id: 'm3s1-it-system',
    question:
      'IT systems have a specific characteristic that distinguishes them from TN and TT. What is it?',
    options: [
      'IT systems are higher voltage',
      "IT — Isolated Terra — has the supply ISOLATED from earth (or earthed via a high impedance like an isolation monitor); the first earth fault doesn't disconnect the supply, allowing operation to continue, with a second fault then triggering disconnection",
      'IT systems have no neutral',
      'IT systems are only single-phase',
    ],
    correctIndex: 1,
    explanation:
      'IT (Isolated Terra): supply is isolated from earth or earthed via a high-impedance device. A single earth fault produces only a small current (limited by the high impedance), allowing the installation to continue operating while an alarm signals the fault — critical for continuity-essential applications like hospital operating theatres, IT data centres on UPS, and industrial safety circuits where unplanned disconnection is dangerous. A second fault on a different live conductor then triggers normal ADS via Reg 411.6.',
  },
  {
    id: 'm3s1-pen-prohibition',
    question:
      'Reg 461.2 prohibits a specific action with the PEN conductor in TN-C and TN-C-S systems. What?',
    options: [
      'Connecting it to anything',
      "Isolating or switching the PEN conductor — it must remain continuous from the DNO transformer through to the consumer's MET",
      'Sizing it below 16 mm²',
      'Painting it green-and-yellow',
    ],
    correctIndex: 1,
    explanation:
      'Reg 461.2: in TN-C and TN-C-S systems, the PEN conductor SHALL NOT be isolated or switched. The reason is the open-PEN failure mode — a switch / isolator that opens the PEN under load drives the local earth potential toward line voltage; every Class I exposed metal part in the installation rises with it. Touching a kettle and a tap simultaneously becomes a fault path. The PEN must be continuous; switching is permitted only on line conductors and (where required) the post-MET neutral.',
  },
  {
    id: 'm3s1-evcp-ts',
    question:
      'On a TN-C-S supply, what does Reg 722.312.2.1 (A4:2026) require for EV charging circuits?',
    options: [
      'No specific requirement',
      'A circuit supplying EV charging equipment in a TN system shall NOT include a PEN conductor — provide TN-S configuration to the EV (split N and PE upstream of the EV) or apply alternative protective measures (open-PEN detection device)',
      'Only Type B RCDs allowed',
      'Cable size minimum 6 mm²',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (A4): EV charging circuit on a TN system shall not include a PEN conductor. Reasoning: an open-PEN failure on a vehicle (large conductive body the user is touching) is potentially fatal. Compliance routes: (1) Configure TN-S to the EV — split PEN at consumer unit, run L+N+PE separately; or (2) Use an open-PEN detection device (Matt:e, Eaton ASW or charger-integrated) that disconnects the EV on PEN failure. Most modern UK EV chargers integrate open-PEN protection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Standard UK suburban domestic supply: which earthing arrangement is most likely?',
    options: [
      'TN-S (separate N + PE throughout the network)',
      'TN-C-S (PEN in supply network, split at the cut-out — also known as PME)',
      'TT (own earth electrode)',
      'IT (isolated source)',
    ],
    correctAnswer: 1,
    explanation:
      "TN-C-S is the dominant UK domestic arrangement. The DNO provides combined PEN in the supply cable from the transformer to the property cut-out (economical — fewer conductors). At the cut-out / consumer unit boundary, the PEN splits into separate N and PE. The customer's installation is effectively TN-S downstream of the MET. Per BS 7671 / DNO terminology, this is a TN-C-S system.",
  },
  {
    id: 2,
    question: 'Why does BS 7671 forbid isolating or switching the PEN in TN-C-S systems?',
    options: [
      'To save cabling cost',
      "Because an open PEN under load drives the local earth potential toward line voltage — every CPC-bonded Class I exposed metal part rises with it, creating a fatal-shock risk that doesn't show on basic IR testing",
      'Because the regulations are arbitrary',
      "Because PEN conductors don't carry current",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 461.2 has a real safety basis. In TN-C-S the PEN carries normal load current (it's also the neutral). If the PEN opens upstream of the cut-out under load, the local earth potential isn't held at zero anymore — it rises toward line voltage as load current is forced to find a return path through earth via every bonded Class I exposed metal part. Touching two such parts simultaneously is then a fault path. The risk is invisible to a standard insulation-resistance test and only manifests under load.",
  },
  {
    id: 3,
    question:
      "The cert-form drop-down for system earthing arrangement now includes 'TN-C-S (PME)' AND 'TN-C-S (PNB)' as separate options under A4:2026. Why?",
    options: [
      "They're the same — duplicate option",
      "PME has multiple earth electrodes along the DNO's network (the more common arrangement). PNB has only one connection between PEN and the installation's earthing system (at the cut-out / meter). Different fault-current behaviours; A4 makes the distinction explicit on certs so inspectors record what's actually present",
      'PME is single-phase only',
      'PNB is for industrial only',
    ],
    correctAnswer: 1,
    explanation:
      "PME (Protective Multiple Earthing) — the conventional UK TN-C-S — has multiple bonded earth electrodes along the DNO's distribution network (typically at every transformer, every street pillar, every property cut-out), reducing the impact of any single open-PEN failure. PNB (Protective Neutral Bonding) — newer / rural variant — has only ONE point of connection between PEN and the installation's earthing system. Fault-current behaviour differs because PNB lacks the multiple-electrode parallel paths. A4:2026 added the explicit cert option so this is recorded.",
  },
  {
    id: 4,
    question:
      'A property has its own earth electrode (e.g. a 1.2 m long copper-clad steel rod 600 mm into the ground) because the DNO has stated they will not provide an earth. What system arrangement applies?',
    options: [
      'TN-C-S',
      'TT — Terra-Terra: own earth electrode, no protective conductor from supply',
      'TN-S',
      'IT',
    ],
    correctAnswer: 1,
    explanation:
      "TT is the arrangement where the installation provides its own earth via a local electrode. Common reasons the DNO doesn't / won't provide an earth: long supply runs where DNO earth integrity can't be guaranteed, agricultural buildings where stock-touch hazard with elevated earth is unacceptable, retro-fitted PV / EV installations on supplies where TN-C-S exclusion criteria apply. Design implications: RCD-led fault protection (Reg 411.5.3 — earth-electrode resistance is too high for OPD-led ADS to clear in time).",
  },
  {
    id: 5,
    question:
      'On a TT installation, what is the second design check Reg 411.5.3 requires alongside the disconnection-time check?',
    options: [
      'Cable size',
      'Ra × IΔn ≤ 50 V — limiting touch voltage during a residual fault to band I',
      'Voltage drop',
      'PSCC',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.5.3(b): Ra × IΔn ≤ 50 V. Ra is the sum of the earth-electrode resistance plus the protective-conductor resistance back to exposed metal. Multiplying by IΔn gives the touch voltage that appears on exposed-conductive-parts during a residual fault before the RCD operates. Capping it at 50 V keeps within band I (low-shock-risk threshold). Practical implication: at higher IΔn (100 / 300 / 500 mA), the maximum permissible Ra drops sharply — high-IΔn devices on TT need a low-resistance earth electrode.',
  },
  {
    id: 6,
    question:
      'An IT system protects against a single earth fault by NOT disconnecting the supply on that fault. What does it use to monitor for the first fault?',
    options: [
      'An RCD',
      'An Insulation Monitoring Device (IMD) per Reg 411.6.3 — continuously measures the insulation resistance between the system and earth and alarms when the first fault appears',
      'Visual inspection',
      'The MCB',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 411.6.3 lists permitted devices for IT systems: (a) IMDs, (b) RCMs (residual current monitoring devices), (c) IFLS (insulation fault location systems), (d) OPDs, (e) RCDs. The IMD is the typical primary monitor — alarms on first fault but doesn't disconnect, allowing the installation to continue while the fault is located and corrected. A second fault on a different live conductor THEN triggers normal disconnection per Reg 411.6.5. IT is used where supply continuity is more critical than fault-clearing speed (operating theatres, ICUs, certain industrial safety circuits).",
  },
  {
    id: 7,
    question:
      "A 7 kW EV charging point is to be added to an existing TN-C-S property. The existing CU has no provision for splitting PEN. What's the most common compliant solution?",
    options: [
      'Refuse the install',
      'Use an EV charger with INTEGRATED open-PEN protection (a built-in voltage detection circuit that disconnects the EV if the local PEN voltage rises above ~50-70 V relative to a reference). Most modern UK EV chargers (Pod Point, Wallbox, EO, Andersen, Zappi) have this built in. Confirms compliance with Reg 722.312.2.1 without rewiring the consumer unit',
      'Only TN-S supplies are allowed',
      'Add a second earth electrode at the EV',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 722.312.2.1 (A4) bans PEN in TN-supply EV circuits. The most common practical solution is an EV charger with integrated open-PEN protection — the device monitors voltage between the local PEN and a reference, disconnects the EV on detected PEN failure. This is widely available in domestic chargers and obviates the need to retrofit TN-S configuration in existing CUs. Alternative: external open-PEN detection device (Matt:e, Eaton ASW) installed close to the EV. Document the compliance route on the EIC.',
  },
  {
    id: 8,
    question:
      'A new commercial unit on TT supply uses a 100 mA Type S RCD as the main switch + 30 mA RCBOs on each final circuit. Earth electrode resistance Ra is measured at 180 Ω. Does the design satisfy Reg 411.5.3?',
    options: [
      'No — Ra is too high',
      'Yes — for the main switch: 180 × 0.1 = 18 V ≤ 50 V ✓ (Reg 411.5.3 limb b satisfied). Disconnection time per Reg 411.3.2.4 needs verification but with 30 mA RCBOs downstream the TT distribution time of 1 s is comfortably met. Selectivity: 100/30 = 3.33 ratio ✓',
      'Yes but only for single-phase',
      'Cannot be determined without PSCC',
    ],
    correctAnswer: 1,
    explanation:
      'Standard TT design checks. (1) Reg 411.5.3 limb (b): Ra × IΔn ≤ 50 V. 180 × 0.1 = 18 V — well under 50 V ✓. (2) Disconnection time: 100 mA Type S delays operation by up to 500 ms but trips reliably at 5×IΔn = 500 mA in ≤ 150 ms — comfortably under the 1 s TT distribution requirement. (3) Selectivity: 3:1 IΔn ratio, upstream Type S — satisfied. Design works. If Ra had been over 500 Ω, the limb (b) check would have failed and the design would need either lower IΔn (which then creates selectivity issues with downstream 30 mA) or earth-electrode improvement.',
  },
];

const faqItems = [
  {
    question: 'How do I tell which earthing arrangement a property is on?',
    answer:
      "Look at the cut-out / meter position. Two conductors leaving the cut-out (line + combined PEN, with the earth taken from the cut-out terminal block / meter) = TN-C-S. Three conductors (line + neutral + separate earth, often a metal sheath / armour) = TN-S. No earth coming from the cut-out — local electrode visible — = TT. The DNO will confirm via a maximum-Ze quote on request, and modern bills sometimes state the supply type. Recording the system arrangement on the EIC is mandatory; getting it wrong means the disconnection-time tables you used don't apply.",
  },
  {
    question: 'Why is TN-C-S more common than TN-S in UK new-build?',
    answer:
      'Economics. TN-C-S uses one combined PEN conductor in the supply cable from transformer to cut-out — 3 conductors instead of 4 for a single-phase supply, 4 instead of 5 for three-phase. Cable cost, jointing, and laying are all reduced. Distribution Network Operators have used TN-C-S as the default UK domestic arrangement since the 1960s. The trade-off is the open-PEN risk handled by Reg 461.2 (no isolation), Reg 722.312.2.1 (no PEN in EV circuits), and the multiple-electrode bonding of PME / PNB.',
  },
  {
    question: "What's the difference between PME and PNB in everyday terms?",
    answer:
      "PME = multiple bonded earth electrodes throughout the DNO's network (transformer earth + intermediate earths + property earths all bonded together via the PEN). Open-PEN at one location is partially mitigated by parallel paths through other electrodes. PNB = single bonding point between PEN and earth, typically at the property's meter / cut-out. No parallel paths — open-PEN consequences are sharper. PNB is more common in newer / rural supplies. A4 added the explicit cert distinction so the inspector records what's actually present rather than defaulting to 'TN-C-S' generic.",
  },
  {
    question: 'Can a property have a mix of supply arrangements?',
    answer:
      'Generally no — the supply arrangement is determined at the cut-out and applies to the whole installation. But within the installation, certain circuits can be DESIGNED to act as TN-S even if the supply is TN-C-S — e.g. EV charging circuits that split N and PE before the EV, or sub-installations with local TN-S configuration. The cert records the OVERALL system arrangement (the supply type) plus any per-circuit deviations (e.g. EV circuit configured as TN-S despite TN-C-S supply).',
  },
  {
    question: "What's the typical Ze for each arrangement?",
    answer:
      "Indicative DNO max values: TN-S — typically 0.8 Ω. TN-C-S — typically 0.35 Ω (lower because of multiple PME electrodes). TT — typically 21-200 Ω depending on local soil conditions and electrode quality. These are MAXIMA — measured values are usually significantly better. Designers use the DNO max for worst-case calculations; measured Ze is recorded on the cert for actual conditions. The Ze cascades into every circuit's Zs calculation — high Ze on TT is why RCD-led ADS is needed.",
  },
  {
    question: 'How does the supply arrangement affect EV charging design?',
    answer:
      "Significantly. TN-C-S (the UK domestic majority) is where Reg 722.312.2.1 (A4) bites — EV circuit must not include a PEN, requiring TN-S configuration to the EV or open-PEN detection. TN-S — no special action needed; the supply is already split. TT — the EV charging circuit inherits the TT system protection; RCD-led ADS, Ra × IΔn check still applies; open-PEN issue doesn't arise. IT — EV charging on IT supplies is rare and requires specialist design per the location's specific protective scheme.",
  },
  {
    question: 'Are there situations where TT is preferred over TN-C-S?',
    answer:
      'Yes. Caravans (own electrode required by Section 708). Marinas (Section 709). Agricultural buildings where stock-touch hazard with elevated PEN voltage is unacceptable (Section 705). Retro-fitted PV installations where TN-C-S exclusion criteria apply. Some EV charging installations where the Reg 722.312.2.1 PEN ban is more easily satisfied via deliberate TT configuration. The trade-off: TT requires RCD-led fault protection (Reg 411.5.3) and electrode-resistance management; designs are more sensitive to soil conditions and electrode quality.',
  },
  {
    question: "What's the practical effect of Reg 411.6.3 on IT system design?",
    answer:
      'Reg 411.6.3 lists the recognised devices for IT-system protection: IMDs (continuous monitoring of insulation resistance to earth), RCMs (residual-current monitoring), IFLS (locate the actual fault), OPDs and RCDs (for the second-fault disconnection). Practical IT designs combine these: IMD as primary first-fault detector with audible/visual alarm; OPDs or RCDs for second-fault disconnection per Reg 411.6.5 (the second fault behaves like a TN or TT fault depending on the system topology). IT is uncommon in UK general installations but mandatory in some medical Group 2 locations and continuity-essential industrial safety circuits.',
  },
  {
    question: 'What about three-phase domestic supplies?',
    answer:
      'Increasing in UK new-builds (typically associated with EV charging, heat pumps and solar PV producing more demand than single-phase supplies can comfortably handle). Three-phase TN-C-S is the dominant arrangement; the same PEN principles apply. The cut-out has 4 incoming conductors (L1 + L2 + L3 + combined PEN) which split into 5 (3 phases + N + PE) at the meter. Reg 461.2 still applies — no PEN switching anywhere. Reg 722.312.2.1 still applies for any EV charging on the supply.',
  },
  {
    question: 'Are PEN faults common?',
    answer:
      "Rare but consequential. The DNO's PEN is well-designed and well-maintained — failures typically result from physical damage (dig-ups, corrosion at joints) or aged installations where the PEN cable insulation has deteriorated. Statistics from the IET / DNOs suggest a few hundred PEN-fault incidents per year across the UK supply network — out of tens of millions of properties. The reason BS 7671 takes such a strict line on PEN safety (Reg 461.2, Reg 722.312.2.1, the bonding requirements) is that when PEN fails, the consequences can be fatal — and the failure mode doesn't show on standard pre-emptive testing.",
  },
  {
    question: 'Where do I record the system earthing arrangement on the cert?',
    answer:
      "EIC — Section A 'Particulars of installation' has a system earthing arrangement field with options TN-S / TN-C-S (PME) / TN-C-S (PNB) / TT / IT (the A4 model form added the explicit PME/PNB distinction under TN-C-S). EICR — Section A similarly. Schedule of test results captures Ze (origin earth-fault loop impedance) which corroborates the declared arrangement. Get the recording right; it determines which Reg 411.x sub-clauses, which Table 41.x disconnection times, and which protective-measure design rules apply to every subsequent line on the cert.",
  },
];

const BS7671Module3Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Supply Systems — TN-S, TN-C-S, TT, IT | BS 7671:2018+A4:2026 | Module 3.1',
    description:
      'How BS 7671:2018+A4:2026 classifies supply earthing arrangements (TN-S, TN-C-S with PME / PNB variants, TT, IT), why the choice cascades into every protection-design decision, the new A4 cert-form distinction between PME and PNB, the Reg 461.2 PEN-isolation prohibition, and the Reg 722.312.2.1 EV-circuit PEN ban.',
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
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Updated for A4:2026"
            title="Supply systems — TN-S, TN-C-S, TT, IT"
            description="The earthing arrangement is the single most-load-bearing decision in any installation design — it dictates which Reg 411 sub-clauses apply, which disconnection times, which protective-measure routes, and how Section 7 special locations interact. A4:2026 added the explicit TN-C-S (PNB) cert option and the EV-circuit PEN ban (Reg 722.312.2.1)."
            actions={
              <>
                <RegBadge>312.1</RegBadge>
                <RegBadge>411.4.4</RegBadge>
                <RegBadge>411.5.3</RegBadge>
                <RegBadge>461.2</RegBadge>
                <AmendmentBadge regs={['722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'The four arrangements: TN-S (separate N + PE throughout), TN-C-S (combined PEN in supply network, split at cut-out — also known as PME, with PNB variant), TT (own earth electrode), IT (isolated source).',
              "TN-C-S is the UK domestic majority. A4:2026 added 'TN-C-S (PNB)' as an explicit cert option to distinguish single-bonding-point PNB from multi-electrode PME.",
              'Reg 461.2 prohibits isolating / switching the PEN. Reg 722.312.2.1 (A4) prohibits PEN conductors in EV charging circuits on TN supplies. Both rules exist because of open-PEN failure consequences.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the four BS 7671 system earthing arrangements (TN-S, TN-C-S with PME / PNB variants, TT, IT) and identify which is present on a typical UK supply.',
              'Identify the A4:2026 cert-form changes — particularly the PME / PNB distinction under TN-C-S — and complete EIC entries correctly.',
              'Apply Reg 461.2 (no PEN isolation) and Reg 722.312.2.1 (no PEN in EV circuits) to consumer-unit and EV-charging design.',
              'Match the system earthing arrangement to the appropriate Reg 411 sub-clause for ADS verification — Reg 411.4 / 411.5 / 411.6 — and apply the right disconnection-time table.',
              'Recognise where TT or IT is the right arrangement (caravans, agricultural, marinas; medical Group 2, continuity-essential industrial) and design accordingly.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The four arrangements in plain English</ContentEyebrow>

          <ConceptBlock
            title="TN-S — separate N and PE throughout"
            plainEnglish="The supply network has separate Neutral and Protective-Earth conductors all the way from the source transformer to the property. Three live conductors arrive at the cut-out on a single-phase install (L + N + PE); four on three-phase (L1 + L2 + L3 + N + PE)."
            onSite="Look for a separate earth conductor at the cut-out — often a metal sheath or armour, or a dedicated separate cable. TN-S is becoming rarer in new UK domestic installs (TN-C-S is more economical for the DNO) but is common in older properties, in some commercial work, and where the DNO's network design predates the move to PME."
          >
            <p>
              In TN-S, the protective conductor (PE) carries no current under normal operation —
              it's purely a fault path. Earth-fault loop impedance Ze tends to be moderate (typical
              DNO max 0.8 Ω). All Class I exposed-conductive-parts in the installation are connected
              to the supply PE via the consumer's MET. ADS is verified per Reg 411.4 with the
              standard Table 41.1 disconnection times.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · TN-C-S system definition"
            clause="A TN-C-S system has the neutral and protective functions combined in a single conductor (PEN) in a part of the system. The supply system PEN conductor is earthed at two or more points. All exposed-conductive-parts of an installation are connected to the PEN conductor via the main earthing terminal and the neutral terminal, with these terminals linked together."
            meaning="TN-C-S compromises between the safety of TN-S and the economy of TN-C. The supply network uses a single PEN (combining N and PE — fewer conductors, lower cost) earthed at multiple points; the property splits PEN into separate N and PE at the cut-out. The 'multiple earthing' is what makes it PME — Protective Multiple Earthing — and what reduces (but doesn't eliminate) the open-PEN risk."
            cite="BS 7671:2018+A4:2026"
          />

          <ConceptBlock
            title="TN-C-S — combined PEN in supply, split at cut-out"
            plainEnglish="The DNO's network from transformer to cut-out uses a combined PEN conductor — neutral and protective-earth in one cable. At the cut-out / meter position, the PEN splits: neutral goes to the consumer's neutral bar, earth goes to the consumer's MET. The CONSUMER'S installation is then effectively TN-S downstream of the MET."
            onSite="The dominant UK domestic arrangement. Look for the cut-out's earth terminal connected to the same conductor as the neutral — typically a single earth terminal block at the meter / cut-out where the PE for the installation is taken. Two variants: PME (multiple earth bonding points along the DNO network) or PNB (single bonding point at the meter)."
          >
            <p>
              TN-C-S characteristics: low Ze (typical DNO max 0.35 Ω due to multiple parallel earth
              paths via PME electrodes), economical for the DNO (fewer conductors), and the dominant
              UK arrangement. Risks: open-PEN failure (the PEN conductor breaking upstream of the
              property under load drives local earth potential toward line voltage). Mitigations:
              Reg 461.2 (no PEN isolation), Reg 722.312.2.1 (no PEN in EV circuits — A4), and the
              bonding requirements that link MET to all extraneous-conductive-parts.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="TT — own earth electrode"
            plainEnglish="The installation provides its own earth via a local electrode (rod, mat, plate). NO protective conductor comes from the supply. The supply provides only line and neutral; the consumer's installation creates its own earth path entirely separately."
            onSite="Common in: caravans (BS 7671 Section 708 mandates own electrode), agricultural buildings (Section 705), marinas (Section 709), some rural properties where the DNO will not provide an earth, retro-fitted PV / EV installations where TN-C-S exclusion criteria apply. Earth-electrode resistance Ra dominates Ze — typically 21-200 Ω depending on soil conditions and electrode quality."
          >
            <p>
              Design implications of TT: ADS via OPD alone (Reg 411.5.4) requires very low Ra which
              is rarely achievable with a single rod electrode — typical TT designs use RCD-led ADS
              per Reg 411.5.3, with the additional limb (b) check Ra × IΔn ≤ 50 V limiting the touch
              voltage during a residual fault. Disconnection times per Reg 411.3.2.4 (1 s for
              distribution circuits in TT, vs 5 s for TN). Special-location regs (caravans,
              agricultural, marinas) often impose tighter earth-electrode requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Watch · Ze measurement at the cut-out"
            caption="Craig Wiltshire walks through a Ze test on a single-phase supply — the practical measurement that proves which earthing arrangement is in place. The Ze value you read at the cut-out is what cascades into every subsequent Zs / disconnection-time / Reg 411 check on the cert, so getting it right (and matching it to the declared TN-S / TN-C-S / TT system) is the qualifying-spark task that turns the theory in this section into evidence on the EIC."
          />

          <SectionRule />

          <VideoCard
            url={videos.transformerStepUpDown.url}
            title={videos.transformerStepUpDown.title}
            channel={videos.transformerStepUpDown.channel}
            duration={videos.transformerStepUpDown.duration}
            topic="Watch · The supply transformer that defines the system arrangement"
            caption="The Engineering Mindset walks the distribution transformer secondary that sits at the heart of every TN, TT or IT supply. Whether the secondary star point is solidly earthed (TN), unearthed and you provide your own electrode (TT) or earthed via a high impedance (IT) is the single decision upstream that cascades into every Reg 411 design choice in the property's installation."
          />

          <SectionRule />

          <ContentEyebrow>The A4 PME / PNB distinction</ContentEyebrow>

          <ConceptBlock
            title="What changed in the cert form for TN-C-S"
            plainEnglish="Under earlier BS 7671 editions, the cert dropped down 'TN-C-S' as a single option. A4:2026 added the explicit sub-distinction: 'TN-C-S (PME)' for the conventional multi-electrode arrangement, and 'TN-C-S (PNB)' for the single-bonding-point variant. Same TN-C-S system family, different earthing topology, different cert recording."
            onSite="The DNO supplies the property — they know which variant. Modern DNO documentation states the supply type explicitly; some bills mention it. If unsure, request a maximum-Ze quote from the DNO; the response often clarifies the arrangement. PNB is more common in newer / rural supplies; PME is the conventional UK majority. Recording the right variant on the cert is part of A4 compliance."
          >
            <p>
              Why does the distinction matter? Because the open-PEN behaviour differs. PME's
              multiple electrodes provide parallel paths that partially mitigate a single upstream
              PEN break — the local installation's earth potential rises but is held down by other
              electrodes' parallel connection to true earth. PNB has a single bonding point —
              open-PEN consequences are sharper, with no parallel mitigation. Designers and
              inspectors need to know which they're working with so the protective measures (in
              particular Reg 722.312.2.1 EV charging compliance) are appropriately specified.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>
            IT systems — when continuity matters more than disconnection
          </ContentEyebrow>

          <ConceptBlock
            title="The fundamental IT principle"
            plainEnglish="In TN and TT, an earth fault triggers immediate ADS — the supply disconnects to limit touch-voltage exposure. In IT, the supply is isolated from earth (or earthed via a high-impedance device); a single earth fault produces only a small current, the supply continues, an alarm signals the fault, and only a SECOND fault on a different live conductor triggers normal disconnection."
            onSite="IT is rare in UK general installations but mandatory in some medical Group 2 locations (operating theatres, ICU isolation transformers) and used in continuity-essential industrial safety circuits. Recognition: an isolation transformer in the supply path with an Insulation Monitoring Device (IMD) wired to alarm panels. Local rules at the site dictate the maintenance and fault-response procedures."
          >
            <p>
              Reg 411.6 governs IT system protection. Reg 411.6.1 covers the first-fault behaviour
              (continuous monitoring, alarm, no automatic disconnection). Reg 411.6.5 covers the
              second-fault disconnection — the second fault makes the system behave like a TN or TT
              depending on topology, and standard ADS applies. Reg 411.6.3 lists the recognised
              monitoring / protective devices: IMDs, RCMs, IFLS, OPDs, RCDs. In practice the IMD is
              the primary first-fault detector; the OPDs / RCDs handle the second fault. Maintenance
              staff must understand the alarm response procedure — leaving the first fault
              unaddressed and waiting for the second is the path to a failed installation.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />
          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>The PEN — why two regulations protect it</ContentEyebrow>

          <ConceptBlock
            title="Reg 461.2 and Reg 722.312.2.1 — same hazard, different angles"
            plainEnglish="Reg 461.2 prohibits isolating or switching the PEN anywhere in TN-C / TN-C-S. Reg 722.312.2.1 (A4:2026) goes further for EV charging — no PEN at all in the EV circuit on TN supplies. Both regulations exist because of the open-PEN failure mode."
            onSite="Open-PEN happens when the PEN conductor breaks upstream of the property under load. Without a PEN, load current can't return to the source via neutral — it's forced to find a return path through earth via every CPC-connected exposed metal part in the installation. Local earth potential rises toward line voltage; every exposed metal part rises with it. Touching two such parts simultaneously becomes the fault path. The risk is invisible to a basic insulation test and only manifests under load."
          >
            <p>
              Reg 461.2's general prohibition has been BS 7671 doctrine since 16th edition. The new
              A4 Reg 722.312.2.1 takes the rule one step further for EV charging because the
              vehicle's body is a large conductive surface the user is in direct, prolonged contact
              with. An open-PEN drives the vehicle body toward line voltage; touching the vehicle
              and any other bonded item (a kerb-side metal handrail, a metallic gate, a building
              bonded to the same earthing system) is potentially fatal. Compliance routes: TN-S
              configuration to the EV (split N and PE before the EV circuit) or open-PEN detection
              device.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />
          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Choosing the right design for an unfamiliar supply</ContentEyebrow>

          <ConceptBlock
            title="What to do when you arrive at a job and don't know the arrangement"
            plainEnglish="Most domestic and small commercial work in the UK is TN-C-S. But assumptions are dangerous — verify before you design. The five-minute checklist saves the half-day of redesign that comes from getting the arrangement wrong."
            onSite="(1) Look at the cut-out. Two conductors out + earth from a terminal block = TN-C-S. Three conductors out (with separate earth) = TN-S. No earth from cut-out = TT. (2) Ask the customer if they have any DNO documentation — supply contract, max-Ze quote, recent supply alteration paperwork. (3) Measure Ze. TN-S typical 0.5-0.8 Ω, TN-C-S typical 0.15-0.35 Ω, TT typical 21-200 Ω. (4) If unsure, contact the DNO via their network operator helpline; modern DNOs respond same-day to supply-arrangement queries. (5) Document the verified arrangement on the cert / design sheet before any further design work."
          >
            <p>
              The cost of getting the arrangement wrong is real. Cable sizing assumes specific
              fault-current behaviours that differ between TN and TT. Disconnection-time tables
              differ between TN final / TN distribution / TT distribution. The Reg 722.312.2.1
              EV-circuit ban applies only to TN supplies. Cert-form entries are
              system-arrangement-specific. Five minutes' verification at the start of a job prevents
              hours of redesign or — worse — a non-compliant install that needs reworking after
              building control inspection.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>How fault current actually flows in each arrangement</ContentEyebrow>

          <ConceptBlock
            title="The fault loop in TN-S"
            plainEnglish="Source transformer secondary → line conductor → fault → CPC back through the installation → MET → separate PE conductor in the supply cable → back to the transformer star point. Two distinct conductors carry the fault current, line and PE — they don't share with the neutral."
            onSite="TN-S earth-fault loops are the cleanest. The protective conductor is dedicated to fault-protection only; it carries no current under normal operation. Loop impedance is moderate (typical Ze ~0.5-0.8 Ω), Zs is dominated by the circuit's own R1 + R2. Compatible with both OPD-led and RCD-led ADS strategies."
          >
            <p>
              The TN-S advantage is conceptual cleanliness — line and earth are functionally
              separate throughout the system. The disadvantage is supply-network cost (more
              conductors). For commercial / industrial work where the supply is being installed
              fresh, TN-S is sometimes specified deliberately for the cleaner fault behaviour; for
              retrofit / domestic work, the supply arrangement is what the DNO provides.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The fault loop in TN-C-S"
            plainEnglish="Source transformer secondary → line conductor → fault → CPC back through the installation → MET → bonded to the neutral terminal at the cut-out → combined PEN conductor in the supply cable → back to the transformer star point. The PEN carries BOTH normal neutral current AND fault current — the protective and neutral functions are physically combined upstream of the cut-out."
            onSite="The combined PEN means the protective path and the neutral path share a conductor. Under normal operation the PEN carries the neutral current of every property on the supply network. An open-PEN failure at any point upstream interrupts ALL connected properties' neutral return paths simultaneously — which is why the multiple-electrode bonding (PME) exists, providing parallel paths to mitigate. Typical TN-C-S Ze is low (~0.15-0.35 Ω) because of the parallel earth paths."
          >
            <p>
              This is also why Reg 461.2 is so absolute about not switching the PEN — switching one
              property's PEN would inadvertently interrupt every other property on the same supply
              branch's earth-fault path. The bonding to the MET is permanent, the PEN continuous.
              Modern UK consumer units are designed so the main switch never interrupts the PEN —
              only line and post-MET neutral are switched.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The fault loop in TT"
            plainEnglish="Source transformer secondary → line conductor → fault → CPC back through the installation → MET → local earth electrode → through the GROUND ITSELF → back to the transformer's earth electrode → back to the transformer star point. The fault path goes through soil, not through a conductor."
            onSite="TT's fault loop is dominated by the earth-electrode resistances (Ra at the property + the source's earth resistance). Typical Ra of a single rod electrode in average UK soil: 50-200 Ω. Compared to TN's milliohm-scale loop impedance, TT's is two orders of magnitude higher. That's why OPD-led ADS rarely works on TT — the fault current is too low for the OPD's magnetic threshold to clip in the required time. RCD-led ADS is the standard answer."
          >
            <p>
              The seasonal variation in soil resistance is real. A TT installation that meets Reg
              411.5.3 in winter (wet ground, low Ra) may struggle in summer (dry ground, high Ra).
              The maximum permitted Ra under Reg 411.5.3(b) is determined by the IΔn of the RCD: at
              30 mA, Ra ≤ 1666 Ω; at 100 mA, Ra ≤ 500 Ω; at 300 mA, Ra ≤ 166 Ω. Designers should aim
              well below these limits to provide seasonal headroom — typical targets of Ra ≤ 200 Ω
              for 30 mA RCD-led TT, with one or two rod electrodes plus bonding to any available
              metallic underground services.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Identifying the system on site</ContentEyebrow>

          <ConceptBlock
            title="What to look for at the cut-out"
            plainEnglish="The cut-out (the DNO-installed sealed unit at the property's incoming supply) is where the supply arrangement is identifiable. Most have a label or stamp; if not, the conductor configuration tells you."
            onSite="Single-phase supply: 3 conductors leaving the cut-out (line + neutral + earth) usually means TN-S. 2 conductors leaving (line + combined PEN) with the earth taken from a terminal block at the meter usually means TN-C-S. No earth from the cut-out — local electrode visible — means TT. Three-phase: same logic with extra phases. Where unsure, request the supply type from the DNO; modern DNOs respond to maximum-Ze queries with explicit arrangement information."
          >
            <p>
              The cert recording is mandatory and load-bearing. EIC Section A captures the system
              arrangement; getting it wrong invalidates every Zs / Reg 411.x check against the cert.
              Schedule of test results' measured Ze should corroborate — TN-S typically 0.5-0.8 Ω,
              TN-C-S typically 0.15-0.35 Ω, TT typically 21-200 Ω. Significant disagreement between
              declared system and measured Ze is a flag for investigation — possibly a DNO supply
              change since the last cert.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Recording 'TN-C-S' on the cert without specifying PME or PNB"
            whatHappens="Inspector ticks 'TN-C-S' on the EIC, doesn't fill the PME / PNB sub-distinction. The cert is technically incomplete under A4:2026 — building control or future inspector flags the missing detail. The actual supply type is genuinely PNB but the cert doesn't reflect it."
            doInstead="A4:2026 added the PME / PNB cert-form distinction precisely because the two TN-C-S variants have different fault behaviours. Confirm with the DNO if unsure (a maximum-Ze quote response usually states the arrangement). Tick the right box. The five-second admin step keeps the cert defensible."
          />

          <CommonMistake
            title="Treating the supply arrangement as fixed forever"
            whatHappens="EICR on a property the engineer last visited five years ago. The engineer assumes the system arrangement on the previous cert is still correct, doesn't verify Ze independently, signs off the EICR. Two years later a fault investigation finds the DNO upgraded the supply network in the interim — the property is now on a different arrangement, the cert is wrong, and disconnection times that were pass under the old arrangement are fail under the new."
            doInstead="Always remeasure Ze on every EICR. Always verify the system arrangement matches the previous cert (or update if not). DNO network reconfigurations happen — supply upgrades, transformer changes, network unbalancing fixes. The cert reflects conditions AT THE TIME of inspection; assuming nothing's changed without verification is a defensible cause for a future complaint when the assumption turns out to have been wrong."
          />

          <CommonMistake
            title="Switching the PEN at a 'main switch' inside the consumer unit"
            whatHappens="Installer replaces a CU on a TN-C-S property. The new CU's main switch breaks all incoming conductors — line, neutral AND the incoming PEN before it splits at the MET. Under load with a fault, opening the switch interrupts the PEN, driving the local earth potential up and creating an open-PEN hazard."
            doInstead="Reg 461.2: PEN shall NOT be isolated or switched. The main switch may break line and (post-MET) neutral but never the incoming PEN. Modern UK consumer units are designed with this in mind — the PEN-to-MET connection is not interruptible by the main switch. Check the wiring carefully on retrofits and CU upgrades; the wrong wiring scheme is a serious fault that may not show on standard tests."
          />

          <CommonMistake
            title="Adding an EV charger on TN-C-S without addressing the PEN ban"
            whatHappens="Installer fits a 7 kW EV charger to a TN-C-S property by running L+N+CPC from the consumer unit. The CPC is bonded to the MET, which is bonded to the incoming PEN. The EV circuit therefore (effectively) includes a PEN — Reg 722.312.2.1 (A4) violation."
            doInstead="Two compliant routes. (1) Configure TN-S to the EV: split PEN into separate N and PE at the consumer unit, run L+N+PE separately to the EV circuit, no PEN in the EV charging circuit. (2) Use an EV charger with integrated open-PEN protection (most modern UK chargers have this — Pod Point, Wallbox, EO, Andersen, Zappi etc.). Document the chosen route on the EIC."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Agricultural barn with a TT supply — seasonal Ra issue"
            situation="A small farm has a 100 A TT supply to its main barn. Earth electrode is a 1.2 m copper-clad rod outside the barn, installed 20 years ago. EICR in February: Ra measured at 75 Ω, all 30 mA RCBOs pass timing tests, cert clean. EICR in August: Ra measured at 290 Ω. Reg 411.5.3 limb (b) check: 290 × 0.03 = 8.7 V — still under 50 V. But the seasonal swing is a flag."
            whatToDo="The Ra has nearly quadrupled between winter and summer. Soil resistivity rises sharply when dry — a single-rod electrode in clay soil can swing by 4-5× across seasons. The August reading is technically still compliant under Reg 411.5.3(b), but the trend suggests the electrode is approaching the limits of its design service. Recommendations: (1) install a second earth electrode (parallel rods reduce Ra significantly via geometric averaging), (2) bond to any available metallic underground services if present, (3) flag the property for more frequent EICR until the trend stabilises. Document the seasonal reading on the EICR observations."
            whyItMatters="TT installations have a season-dependent Ra that TN systems don't. Designers and inspectors who treat Ra as a one-time measurement miss the dynamic — a system that's compliant at install can drift out of compliance over years as the electrode ages or as the local water table drops. Document baseline at install, remeasure at every EICR, watch the trend. The Reg 411.5.3 limb (b) check has built-in margin (50 V vs the 25 V band I lower limit) but that margin shouldn't be relied upon as a substitute for proper electrode design."
          />

          <Scenario
            title="EICR on a 1980s property — system arrangement disagreement"
            situation="EICR on a 1980s detached house. Original EIC (issued at install) ticks 'TN-S'. Current measured Ze: 0.18 Ω. Modern installer notes the cut-out has two conductors leaving (no separate earth visible) and the earth is taken from a terminal block at the meter — characteristic of TN-C-S. The system arrangement on the previous cert appears to be wrong."
            whatToDo="Investigate: contact the DNO and request the supply arrangement plus maximum Ze. Likely answer: the supply was upgraded from TN-S to TN-C-S during a network reconfiguration sometime in the past 40 years, and the original cert reflects the install-time arrangement, not the current one. Update the EICR with the correct current arrangement (TN-C-S, with PME/PNB sub-detail), record measured Ze, and note the change from the historical cert as an observation. The installation's protection design needs reviewing — a TN-C-S supply has different open-PEN risks than the TN-S the original cert assumed."
            whyItMatters="Supply arrangements can change over the lifetime of a property — DNO network reconfigurations, supply upgrades, local distribution rearrangements all happen. The cert at install reflects install-time conditions; EICRs must verify CURRENT conditions and update the recording. A property assumed to be TN-S that's actually TN-C-S has different consumer-unit design rules, different EV-charging compliance, different open-PEN risks. Get the current state right; update; document the change for future inspectors."
          />

          <Scenario
            title="New EV charger on a TN-C-S domestic — design choice"
            situation="Customer wants a 7 kW Zappi EV charger added to their TN-C-S property. Existing modern (2022) consumer unit with RCBOs throughout. Installer is choosing between TN-S configuration vs charger-integrated open-PEN protection."
            whatToDo="The Zappi has integrated open-PEN protection (sells under the 'No earth-rod required' marketing). This is BS 7671 compliant per Reg 722.312.2.1 — the integrated detection circuit handles the PEN risk, and the EV circuit can run L+N+CPC from the consumer unit without separate TN-S configuration. Spec Type A 30 mA RCBO upstream (charger integrates 6 mA DC fault detection, so Type A is sufficient per the manual). Document on the EIC: 'EV charging circuit complies with Reg 722.312.2.1 via integrated open-PEN detection per charger specification.' Cert is clean."
            whyItMatters="Modern EV chargers have done significant compliance work to make Reg 722.312.2.1 a non-issue for the installer. The simple route — let the charger handle it — is increasingly the default in UK domestic. Where the charger DOESN'T have integrated open-PEN protection (older models, some commercial-grade chargers), the installer falls back to TN-S configuration or external open-PEN detection device. Reading the charger's installation manual is the binding step; the design follows from what the manual allows."
          />

          <FAQ items={faqItems} />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="System earthing decision points"
            plainEnglish="Three questions answer most system-arrangement design choices. (1) What's the supply? (Determined by the DNO.) (2) Are there special-location overrides? (Caravans, marinas, agricultural, medical Group 2 may force a different arrangement.) (3) What design rules apply downstream?"
            onSite="(1) DNO-provided: confirm the arrangement at install / EICR. (2) Special locations may force TT (caravans, marinas), or IT (medical Group 2). (3) Design rules: Reg 411.4 for TN, 411.5 for TT, 411.6 for IT — different disconnection times, different protective measures, different cert entries."
          >
            <p>
              For typical UK domestic: TN-C-S supply confirmed via DNO, no special-location
              overrides, design per Reg 411.4 (and within that, Reg 411.4.4 for OPD-led ADS or Reg
              411.4.x for RCD-led where applicable). For typical UK rural / agricultural: TT supply
              (own electrode), Section 705 special-location requirements, design per Reg 411.5 with
              particular attention to electrode resistance and the Ra × IΔn limit. For typical UK
              industrial: TN-C-S or TN-S, occasional IT for safety circuits, design per Reg 411.4 /
              411.6 as appropriate.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="When the customer asks 'what's wrong with my supply?'"
            plainEnglish="Customers don't usually know — or care — what TN-C-S means. They notice when the supply behaves oddly: lights dimming under load, occasional brief outages, an EV charger refusing to start. Most are explained by supply-arrangement-related issues that the customer can't diagnose."
            onSite="Common symptoms and likely causes. (1) Dimming lights under heavy load: Ze may be high (loose / corroded supply terminations, or the DNO's supply impedance is high). Measure Ze at the cut-out; flag to the DNO if outside their stated max. (2) EV charger 'no earth' errors: open-PEN protection in the charger detecting a real or false PEN issue; check actual PEN integrity, the charger's reference earth, and any local bonding changes. (3) RCD trips on damp days: TT-supply electrode resistance rising in wet conditions can shift leakage currents past the RCD trip threshold; check Ra and consider electrode improvement."
          >
            <p>
              The qualified electrician's value is in connecting customer-visible symptoms to
              supply-arrangement realities. Most customer complaints have a 'this is normal for
              TN-C-S' or 'this needs a call to the DNO' answer that requires understanding the
              system arrangement first. The cert recording and the periodic Ze measurement are the
              data trail that supports those diagnostic conversations.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'Four BS 7671 system earthing arrangements: TN-S, TN-C-S (with PME / PNB variants — A4 distinction), TT, IT. The choice cascades into every subsequent protection-design decision.',
              'TN-C-S is the UK domestic majority. Look at the cut-out: combined PEN with earth from a terminal block at the meter = TN-C-S.',
              'A4:2026 added the explicit TN-C-S (PNB) cert-form option to distinguish single-bonding-point PNB from multi-electrode PME. Get it right on the cert — affects open-PEN risk modelling.',
              "Reg 461.2: no isolating or switching of the PEN in TN-C / TN-C-S. The PEN must be continuous from the DNO transformer to the consumer's MET.",
              'Reg 722.312.2.1 (A4): no PEN conductor in EV charging circuits on TN supplies. Compliance via TN-S configuration to the EV or charger-integrated open-PEN protection.',
              'TT is for caravans, marinas, agricultural, properties without DNO earth. RCD-led ADS (Reg 411.5.3); Ra × IΔn ≤ 50 V is the second design check.',
              'IT is rare — used in medical Group 2, continuity-essential industrial. First fault alarms (Reg 411.6.3 monitoring devices); second fault disconnects per Reg 411.6.5.',
              'Identify the system at the cut-out: 3 conductors with separate earth = TN-S; 2 conductors with earth from terminal block = TN-C-S; no earth from cut-out, local electrode = TT.',
              'TT systems have a season-dependent Ra. Single-rod electrodes can swing 4-5× between winter (wet) and summer (dry). Design for the dry-season Ra, monitor on EICR.',
              "Always remeasure Ze on EICR — DNO network reconfigurations can change the supply arrangement or its characteristics over a property's lifetime.",
              'Verify the supply arrangement before any design work. Five minutes at the cut-out + a Ze measurement saves hours of redesign or non-compliance later.',
              "PEN faults are rare but consequential. Reg 461.2's strict prohibition on isolating the PEN exists because the failure mode is invisible to standard testing yet potentially fatal.",
              'Three-phase domestic supplies are increasing — typically associated with EV / heat pump / solar PV demand. Same TN-C-S principles apply; same Reg 722.312.2.1 EV rules.',
              'TT design check: Reg 411.5.3(b) — Ra × IΔn ≤ 50 V. At 30 mA, max Ra = 1666 Ω; at 100 mA, max Ra = 500 Ω. Aim well below for seasonal headroom.',
              "Customer-facing diagnostic: dimming under load = high Ze; EV 'no earth' errors = open-PEN protection triggering; RCD trips on damp = TT seasonal Ra. Each connects to system-arrangement physics.",
              "Fault loop in TT goes through SOIL — Ra dominates, not conductor resistance. That's why RCD-led ADS is the standard TT answer.",
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-3-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Maximum demand &amp; diversity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module3Section1;
