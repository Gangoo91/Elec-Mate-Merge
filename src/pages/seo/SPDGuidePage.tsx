import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'SPD Guide', href: '/guides/spd-surge-protection-guide' },
];

const tocItems = [
  { id: 'what-are-spds', label: 'What Are SPDs?' },
  { id: 'spd-types', label: 'Type 1, Type 2, and Type 3' },
  { id: 'when-required', label: 'When Are SPDs Required?' },
  { id: 'bs7671-requirements', label: 'BS 7671 Requirements' },
  { id: 'installation-methods', label: 'Installation Methods' },
  { id: 'coordination', label: 'SPD Coordination' },
  { id: 'testing-spds', label: 'Testing and Maintenance' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SPDs (Surge Protective Devices) protect electrical installations against transient overvoltages caused by lightning strikes, switching surges, and supply disturbances.',
  'Under BS 7671:2018+A2:2022, Regulation 443.4 requires a risk assessment to determine whether SPDs are needed — and in most domestic installations the answer is yes.',
  'Type 1 SPDs protect against direct lightning current, Type 2 against indirect surges, and Type 3 provides fine protection at the point of use.',
  'SPDs must be coordinated: Type 2 at the consumer unit is the most common domestic arrangement, with Type 3 added at sensitive equipment if needed.',
  'Elec-Mate includes an AI regulations lookup that can instantly confirm SPD requirements for any installation scenario under BS 7671.',
];

const faqs = [
  {
    question: 'Are SPDs a legal requirement in the UK?',
    answer:
      'SPDs are not universally mandatory under UK law, but BS 7671:2018+A2:2022 Regulation 443.4 requires a risk assessment for every new or rewired installation. If the risk assessment determines that transient overvoltages could cause serious injury, loss of life, or disruption to critical equipment (such as medical devices, fire alarm systems, or IT infrastructure), then SPDs must be fitted. In practice, the risk assessment almost always concludes that SPDs are required for domestic installations, because the cost of fitting an SPD is low compared to the consequence of a surge damaging the installation. The IET Guidance Note 8 (Earthing and Bonding) and the IET Commentary on BS 7671 both support this interpretation. For existing installations, there is no retrospective requirement to fit SPDs, but they should be recommended as an improvement (C3 observation) during an EICR if they are absent.',
  },
  {
    question: 'What is the difference between Type 1, Type 2, and Type 3 SPDs?',
    answer:
      'Type 1 SPDs (also called Class I or Category I) are designed to handle direct lightning current — they are installed at the origin of the installation, typically between the meter and the main distribution board, where there is an external lightning protection system (LPS) or the building is supplied by an overhead line. They can handle very high energy surges (up to 25 kA or more per pole). Type 2 SPDs (Class II) are the most common in domestic installations. They are installed at the main distribution board and protect against indirect surges — overvoltages caused by lightning striking nearby, switching events on the supply network, or load switching within the building. Type 3 SPDs (Class III) provide fine protection at the point of use — they are installed near sensitive equipment (computers, medical devices, audio-visual systems) and limit residual surges that pass through the Type 2 device. A coordinated approach uses Type 2 at the board and Type 3 at the equipment.',
  },
  {
    question: 'Where should an SPD be installed in a consumer unit?',
    answer:
      'A Type 2 SPD should be installed at the main consumer unit, connected between the live conductors (line and neutral) and the main earthing terminal. The SPD must be protected by its own dedicated overcurrent protective device (typically a 32A MCB for most domestic SPDs, but always check the manufacturer instructions for the specific device). The SPD should be installed as close to the origin of the supply as possible — ideally on the supply side of the main switch or on a dedicated way in the consumer unit. The protective conductor connecting the SPD to the main earthing terminal should be as short and straight as possible — long, coiled cable runs reduce the effectiveness of the SPD. Many modern consumer units now have built-in SPD modules that simplify installation and ensure correct coordination with the board layout.',
  },
  {
    question: 'Do I need an SPD if I already have an RCD?',
    answer:
      'Yes. An RCD (Residual Current Device) and an SPD serve completely different purposes. An RCD detects earth fault current and disconnects the supply to prevent electric shock. An SPD detects transient overvoltages (surges) and diverts the surge energy to earth before it can damage equipment or wiring. They are complementary protections, not alternatives. In fact, transient overvoltages can cause nuisance tripping of RCDs — fitting an SPD can actually reduce unwanted RCD tripping by absorbing the surge before it reaches the RCD. BS 7671 requires both where the risk assessment determines SPDs are needed. A modern consumer unit should have RCD protection (via RCBOs or split-load RCDs) and SPD protection working together.',
  },
  {
    question: 'How do I know when an SPD has failed and needs replacing?',
    answer:
      'Most SPDs have a visual status indicator — typically a green window or LED when the device is functioning correctly, and a red indicator when the SPD has reached end of life and needs replacing. SPDs are sacrificial devices: each time they absorb a surge, their internal metal oxide varistors (MOVs) degrade slightly. After absorbing enough surge energy, the MOV can no longer clamp the voltage effectively and the SPD must be replaced. Some SPDs also include a remote signalling contact that can trigger an alarm or notification when the device fails. During periodic inspection, the electrician should check the SPD status indicator and record it on the EICR. A failed SPD should be recorded as a C2 (Potentially Dangerous) observation if it is the only surge protection in the installation, or C3 (Improvement Recommended) if there is redundant protection.',
  },
  {
    question: 'Can I retrofit an SPD into an existing consumer unit?',
    answer:
      'It depends on the consumer unit. If the existing consumer unit has a spare way, you can fit an SPD module into it (subject to manufacturer compatibility and space). Many SPD manufacturers produce DIN-rail-mounted units that fit standard consumer unit enclosures. However, if the consumer unit is old, full, or does not have a suitable mounting arrangement, a separate enclosure may be needed. The SPD must still be installed as close to the origin as possible, with short protective conductor runs. If the consumer unit is being replaced (for example, as part of a consumer unit upgrade to meet current BS 7671 requirements for AFDDs), fitting an SPD at the same time is the most cost-effective approach. When retrofitting, ensure the SPD is compatible with the supply system (TN-S, TN-C-S, or TT) and that the earth fault loop impedance is within the SPD manufacturer specified limits.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Requirements for consumer unit specification, installation, and compliance with BS 7671.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-arc-fault-detection-guide',
    title: 'AFDD Arc Fault Detection Guide',
    description: 'When AFDDs are required, how they work, and coordination with SPDs and RCDs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations including amendments and key changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/protective-earthing-bonding',
    title: 'Protective Earthing and Bonding',
    description:
      'Main earthing terminal, bonding conductors, and extraneous-conductive-part identification.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for any circuit with correction factors and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured training modules covering all BS 7671 requirements.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-spds',
    heading: 'What Are SPDs and Why Do They Matter?',
    content: (
      <>
        <p>
          A Surge Protective Device (SPD) is a component installed within an electrical installation
          to limit transient overvoltages and divert surge currents safely to earth. Transient
          overvoltages are brief, high-voltage spikes that last microseconds but can reach thousands
          of volts — far exceeding the normal 230V supply voltage.
        </p>
        <p>
          These surges come from three main sources: lightning strikes (either direct hits or nearby
          strikes that induce voltages in the supply network), switching events on the utility
          network (such as capacitor bank switching or fault clearance), and load switching within
          the building itself (motors starting, large inductive loads being disconnected).
        </p>
        <p>
          Without SPD protection, these surges travel through the wiring and can damage or destroy
          sensitive electronic equipment — computers, smart home systems, LED drivers, boiler
          controls, fire alarm panels, and medical devices. They can also degrade wiring insulation
          over time, increasing the risk of insulation breakdown and electrical fires. The cost of
          fitting an SPD is typically £50 to £150 for the device plus installation — far less than
          replacing a damaged boiler control board or a house full of smart home equipment.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>
          , SPDs are no longer optional extras. Regulation 443.4 requires a risk assessment for
          every new installation, and the outcome almost always mandates SPD protection.
        </p>
      </>
    ),
  },
  {
    id: 'spd-types',
    heading: 'Type 1, Type 2, and Type 3 SPDs Explained',
    content: (
      <>
        <p>
          SPDs are classified into three types based on the level of surge energy they are designed
          to handle and where they should be installed in the protection chain.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Type 1 — Lightning Current Arrestor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Type 1 SPDs are installed at the origin of the installation — between the meter
                  and the main distribution board. They are required where the building has an
                  external lightning protection system (LPS) or is supplied by an overhead line that
                  could conduct a direct lightning strike into the installation. Type 1 devices can
                  handle very high energy (10/350 microsecond waveform, up to 25 kA or more per
                  pole). They are less common in standard domestic installations unless the property
                  has a lightning conductor.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Type 2 — Main Distribution Board Protection
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Type 2 SPDs are the most common in domestic and small commercial installations.
                  They are installed at the main consumer unit or distribution board and protect
                  against indirect surges — overvoltages from nearby lightning, supply network
                  switching, and internal load switching. They handle the 8/20 microsecond waveform,
                  typically rated at 10 kA to 40 kA per pole. This is the standard SPD you will fit
                  in the vast majority of domestic consumer unit installations and upgrades.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Type 3 — Point of Use Protection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Type 3 SPDs are installed close to the equipment they protect — at socket outlets,
                  data points, or dedicated equipment supplies. They provide fine protection by
                  clamping any residual voltage that passes through the Type 2 device. Type 3 SPDs
                  have lower surge handling capacity and must always be used in conjunction with a
                  Type 2 device upstream. They are used for sensitive electronics: server rooms,
                  medical equipment, recording studios, and high-value smart home systems.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The key principle is <strong>coordinated protection</strong>: Type 1 handles the biggest
          hits at the origin, Type 2 catches what gets through at the distribution board, and Type 3
          cleans up at the equipment. For most domestic installations, a Type 2 SPD at the consumer
          unit is sufficient. Type 3 is added where high-value or life-critical equipment demands
          extra protection.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Are SPDs Required Under the 18th Edition?',
    content: (
      <>
        <p>
          Regulation 443.4 of BS 7671:2018+A2:2022 sets out the conditions under which SPDs must be
          installed. The regulation requires a risk assessment to be carried out for every new
          installation, and the result of that assessment determines whether SPDs are needed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overvoltage could cause serious injury or loss of life</strong> — for
                example, installations in medical locations, care homes, or buildings with fire
                alarm systems or emergency lighting that could fail due to a surge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overvoltage could cause significant financial loss or disruption</strong> —
                for example, installations with valuable electronic equipment, IT systems, building
                management systems, or smart home automation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installations supplied by or in proximity to overhead lines</strong> — the
                supply cabling acts as an antenna for lightning-induced surges, making SPD
                protection essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buildings with external lightning protection systems</strong> — if a
                lightning conductor is present, a Type 1 SPD is needed at the origin to handle the
                direct lightning current path.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, the risk assessment for a typical domestic installation almost always
          concludes that SPDs should be fitted. The IET Guidance Note 8 makes clear that the low
          cost of an SPD versus the potential consequence of a surge makes protection cost-effective
          in nearly all cases. The only common exception is where the installation contains no
          sensitive equipment and the consequence of a surge would be limited to minor inconvenience
          — which is rare in modern homes with boiler controls, LED lighting, and smart devices.
        </p>
        <p>
          If the risk assessment concludes that SPDs are not required, the designer must document
          the reasoning. Simply omitting SPDs without a documented risk assessment is a
          non-compliance with Regulation 443.4.
        </p>
        <SEOAppBridge
          title="Check SPD requirements with AI regulations lookup"
          description="Not sure whether the installation needs an SPD? Use Elec-Mate's AI regulations assistant to look up the exact BS 7671 requirements for any scenario — supply type, building use, lightning exposure, and equipment sensitivity."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Regulations for SPD Installation',
    content: (
      <>
        <p>
          Several regulations within BS 7671:2018+A2:2022 govern the selection, installation, and
          testing of SPDs. The key regulations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 443.4</strong> — requires a risk assessment to determine whether
                protection against transient overvoltages is necessary. Where the consequence of
                overvoltage could result in serious injury, loss of life, or interruption of
                critical services, SPDs must be provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 534</strong> — contains the detailed requirements for selection and
                erection of SPDs, including connection methods, protective conductor sizing, backup
                protection, and coordination between SPD types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 534.2.1</strong> — SPDs must comply with BS EN 61643-11 (low
                voltage surge protective devices). The device must be suitable for the nominal
                voltage, earthing arrangement (TN-S, TN-C-S, or TT), and maximum continuous
                operating voltage of the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 534.2.3</strong> — the connecting conductors between the SPD and
                the earth terminal must be as short as possible. The total length of the line
                conductor and protective conductor connecting the SPD should not exceed 0.5 m where
                practicable, to minimise inductance and ensure effective clamping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 534.2.4</strong> — the SPD must be protected by an overcurrent
                protective device (backup fuse or MCB) as specified by the SPD manufacturer. This
                device disconnects the SPD if it fails short-circuit, preventing a sustained fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Amendment 3 (A3:2024) added Regulation 530.3.201 dealing with bidirectional and
          unidirectional devices, which has implications for SPD installations in properties with
          solar PV or battery storage where current can flow in both directions.
        </p>
        <p>
          For electricians studying for the{' '}
          <SEOInternalLink href="/training/18th-edition-course">
            18th Edition qualification
          </SEOInternalLink>
          , Section 534 and Regulation 443.4 are commonly examined topics. Understanding the risk
          assessment process, SPD selection criteria, and the 0.5 m conductor length rule are
          essential for both the exam and practical installation work.
        </p>
      </>
    ),
  },
  {
    id: 'installation-methods',
    heading: 'How to Install an SPD: Step by Step',
    content: (
      <>
        <p>
          Installing a Type 2 SPD at a domestic consumer unit is straightforward, but attention to
          detail is critical. Poor installation — particularly excessive conductor lengths or
          incorrect earthing — can render the SPD ineffective.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Select the correct SPD.</strong> Choose a Type 2 device rated for the supply
              system (TN-S, TN-C-S, or TT). Check the maximum continuous operating voltage (Uc) is
              suitable — it must be at least 253V for single-phase 230V supplies. Check the nominal
              discharge current (In) — 10 kA minimum for domestic, 20 kA for exposed locations.
            </li>
            <li>
              <strong>Position the SPD at the main board.</strong> The SPD should be installed at
              the consumer unit, as close to the incoming supply as possible. If the consumer unit
              has a built-in SPD module bay, use it. Otherwise, mount the SPD on a DIN rail within
              the enclosure or in an adjacent enclosure immediately next to the consumer unit.
            </li>
            <li>
              <strong>Connect to a dedicated MCB.</strong> The SPD requires its own backup
              overcurrent protection — typically a 32A Type B MCB (but always follow the
              manufacturer data sheet). This MCB disconnects the SPD if it fails short-circuit.
            </li>
            <li>
              <strong>Keep conductor lengths short.</strong> The total combined length of the line
              conductor and protective conductor connecting the SPD should not exceed 0.5 m. This is
              not 0.5 m each — it is 0.5 m total for both conductors combined. Excess length adds
              inductance, which reduces the SPD clamping effectiveness.
            </li>
            <li>
              <strong>Connect the protective conductor.</strong> Run the shortest possible conductor
              from the SPD earth terminal to the main earthing terminal. Use 4 mm minimum
              cross-section for the protective conductor. Route it directly — no coiling, no routing
              around the consumer unit.
            </li>
            <li>
              <strong>Test and verify.</strong> After installation, check the SPD status indicator
              shows healthy (green). Verify the backup MCB is correctly rated and functioning.
              Record the SPD installation on the{' '}
              <SEOInternalLink href="/tools/eic-certificate">
                Electrical Installation Certificate
              </SEOInternalLink>
              .
            </li>
          </ol>
        </div>
        <p>
          For TT earthing systems, additional care is needed. The SPD protective conductor connects
          to the main earthing terminal, and the earth electrode resistance must be low enough to
          allow effective surge diversion. Some SPD manufacturers specify a maximum earth electrode
          resistance for TT installations — check the data sheet.
        </p>
      </>
    ),
  },
  {
    id: 'coordination',
    heading: 'SPD Coordination: Getting Multiple Stages Right',
    content: (
      <>
        <p>
          Coordination means ensuring that multiple SPDs installed in the same installation work
          together correctly, with each stage handling the appropriate level of surge energy without
          the downstream device being overwhelmed.
        </p>
        <p>
          The principle is simple: the first stage (Type 1 or Type 2 at the origin) absorbs the bulk
          of the surge energy. The second stage (Type 2 at a sub-distribution board or Type 3 at
          equipment) handles the residual voltage that passes through. For this to work, there must
          be sufficient cable length (impedance) between the stages — typically at least 10 metres
          of cable between a Type 2 and a Type 3 device.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-stage (Type 2 only)</strong> — suitable for most domestic
                installations. The Type 2 SPD at the consumer unit handles all surge protection.
                This is the standard arrangement for a typical house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-stage (Type 2 + Type 3)</strong> — used where sensitive equipment needs
                additional protection. The Type 2 at the board handles the main surge, and a Type 3
                device at the socket or equipment connection clamps the residual voltage. Ensure at
                least 10 m of cable between the two devices for correct decoupling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-stage (Type 1 + Type 2 + Type 3)</strong> — used in buildings with
                external lightning protection, overhead supply lines, or critical infrastructure.
                Type 1 at the origin handles direct lightning current, Type 2 at the main board
                handles residual surges, and Type 3 at equipment provides fine protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the cable length between stages is less than 10 m, some manufacturers offer combined
          Type 1+2 or Type 2+3 devices that handle both stages in a single unit, eliminating the
          coordination distance requirement. Always check manufacturer documentation for the
          specific coordination requirements of the SPDs you are installing.
        </p>
        <SEOAppBridge
          title="Design circuits with SPD coordination built in"
          description="Elec-Mate's AI Circuit Designer helps you specify SPD type, location, and coordination for any installation. Input the supply type, building use, and lightning exposure — get the correct SPD specification and cable routing."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'testing-spds',
    heading: 'Testing and Maintaining SPDs',
    content: (
      <>
        <p>
          SPDs are sacrificial devices — they degrade each time they absorb a surge. Regular
          inspection and testing ensures they remain functional and are replaced before they fail
          completely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — check the SPD status indicator at every
                periodic inspection. Green (or the manufacturer specified healthy colour) means
                functional. Red or no indicator means the SPD has failed and must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup protection check</strong> — verify the backup MCB or fuse is intact
                and correctly rated. If the backup device has tripped, the SPD may have failed
                short-circuit — investigate before resetting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor condition</strong> — check that the connecting conductors are
                secure, undamaged, and still within the 0.5 m total length requirement. Check for
                signs of overheating at the terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR recording</strong> — record the SPD status on the{' '}
                <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>. If the
                SPD indicator shows failure, record it as a C2 observation. If an SPD is absent
                where the risk assessment would require one, record it as C3.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SPDs do not require routine electrical testing beyond visual inspection. There is no
          standard field test to measure the remaining surge capacity of an SPD — the status
          indicator is the primary means of checking device health. If the installation is in a
          lightning-prone area or has experienced known surge events, more frequent visual checks
          are advisable.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common SPD Installation Mistakes to Avoid',
    content: (
      <>
        <p>
          Even experienced electricians make mistakes with SPD installations. Here are the most
          common errors and how to avoid them:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Excessive conductor length.</strong> The most common mistake. If the
                combined line and earth conductor length exceeds 0.5 m, the SPD cannot clamp the
                voltage effectively. The inductance of the excess cable allows the surge voltage to
                rise before the SPD can react. Keep conductors short, straight, and direct.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong SPD for the earthing system.</strong> An SPD designed for TN-S will
                not work correctly on a TT system (and vice versa). Always check the SPD mode of
                protection matches the supply earthing arrangement. Some SPDs are configurable for
                multiple earthing systems — set the correct mode before installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No backup protection.</strong> Every SPD needs a dedicated overcurrent
                protective device (MCB or fuse) to disconnect it if it fails short-circuit. Without
                this, a failed SPD can cause a sustained short-circuit fault. Use the manufacturer
                specified backup device rating — do not assume.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing risk assessment documentation.</strong> Even if you fit an SPD, you
                need to document the risk assessment under Regulation 443.4. Record why the SPD was
                deemed necessary, the type selected, and the protection mode. Without this
                documentation, the installation is technically non-compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring coordination distances.</strong> If fitting Type 2 and Type 3 SPDs,
                ensure at least 10 m of cable between them. Without this separation, the Type 3
                device may absorb surge energy intended for the Type 2, leading to premature failure
                of the downstream device.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/electrical-testing-calculators">
            Elec-Mate calculators
          </SEOInternalLink>{' '}
          to verify conductor sizes, earth fault loop impedance, and{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">cable sizing</SEOInternalLink> for
          SPD installations. Getting the basics right prevents callbacks and ensures the SPD
          performs when it is needed most.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SPDGuidePage() {
  return (
    <GuideTemplate
      title="SPD Surge Protection Guide | BS 7671 Requirements"
      description="Complete guide to SPD surge protection devices for UK electricians. Type 1, Type 2, and Type 3 SPDs explained, BS 7671 Regulation 443.4 risk assessment, installation methods, coordination, and common mistakes."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          SPD Surge Protection:{' '}
          <span className="text-yellow-400">BS 7671 Requirements and Installation Guide</span>
        </>
      }
      heroSubtitle="Surge Protective Devices are required in almost every new domestic installation under BS 7671. This guide covers Type 1, 2, and 3 SPDs, the Regulation 443.4 risk assessment, installation methods, coordination, and the common mistakes that catch electricians out."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SPD Surge Protection"
      relatedPages={relatedPages}
      ctaHeading="Look Up SPD Requirements Instantly"
      ctaSubheading="Elec-Mate's AI regulations assistant gives you instant answers on SPD requirements, BS 7671 compliance, and circuit design. Plus calculators, certificates, and training courses. 7-day free trial."
    />
  );
}
