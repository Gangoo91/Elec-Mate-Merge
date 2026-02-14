import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  Zap,
  Calculator,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Gauge,
  Activity,
  Cable,
  Layers,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Prospective Fault Current Explained | PFC Guide BS 7671';
const PAGE_DESCRIPTION =
  'Complete guide to prospective fault current (PFC/Ipf) under BS 7671. What PFC is, why it matters, how to measure it, typical domestic and commercial values, relationship to Ze, breaking capacity of MCBs, and regulatory requirements under Regulation 434.5.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Prospective Fault Current', href: '/guides/prospective-fault-current-explained' },
];

const tocItems = [
  { id: 'what-is-pfc', label: 'What Is Prospective Fault Current?' },
  { id: 'why-pfc-matters', label: 'Why PFC Matters' },
  { id: 'how-to-measure', label: 'How to Measure PFC' },
  { id: 'typical-values', label: 'Typical PFC Values' },
  { id: 'breaking-capacity', label: 'Breaking Capacity of Protective Devices' },
  { id: 'pfc-and-ze', label: 'PFC and Ze — The Relationship' },
  { id: 'when-pfc-too-high', label: 'When PFC Is Too High' },
  { id: 'regulatory-requirements', label: 'Regulatory Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Prospective fault current (PFC or Ipf) is the maximum current that would flow under a short-circuit or earth fault condition — every protective device must be capable of safely interrupting this current.',
  'PFC must be measured or determined at the origin of every installation and at every distribution board. The highest value (typically the line-to-neutral short circuit) is the one that matters.',
  'Typical domestic PFC values range from 1kA to 6kA. Standard domestic MCBs to BS EN 60898 have a minimum breaking capacity of 6kA — but installations close to transformers can exceed this.',
  'PFC is directly related to Ze: the lower the Ze (earth fault loop impedance at the origin), the higher the prospective fault current. TN-C-S supplies with low Ze can have high PFC values.',
  "Elec-Mate's PFC calculator and adiabatic calculator verify that protective devices and cables can handle the fault current. Schedule of tests validates PFC values against device ratings automatically.",
];

const faqs = [
  {
    question: 'What is prospective fault current and why do I need to measure it?',
    answer:
      'Prospective fault current (PFC), also called Ipf or prospective short-circuit current, is the maximum current that would flow at a given point in an electrical installation if a fault of negligible impedance occurred. There are two types: prospective short-circuit current (line-to-neutral or line-to-line fault) and prospective earth fault current (line-to-earth fault). You need to measure PFC because BS 7671 Regulation 434.5.1 requires that every protective device (MCB, RCBO, fuse) has a rated breaking capacity that is not less than the prospective fault current at the point where it is installed. If the PFC exceeds the device breaking capacity, the device may not be able to safely interrupt the fault, potentially causing the device to explode, arc, or catch fire. PFC must be measured at the origin of the installation (at the consumer unit or main distribution board) and recorded on the Electrical Installation Certificate (EIC) or Electrical Installation Condition Report (EICR).',
  },
  {
    question: 'How is prospective fault current calculated?',
    answer:
      "Prospective fault current is calculated from Ohm's law: I = V / Z, where I is the fault current, V is the supply voltage, and Z is the impedance of the fault loop. For a line-to-neutral short circuit (which typically gives the highest PFC), the relevant impedance is the supply impedance between line and neutral at the point of measurement. For a line-to-earth fault, the impedance is Ze (the earth fault loop impedance at the origin). The prospective short-circuit current (line-to-neutral) is usually higher than the prospective earth fault current because the neutral impedance is typically lower than the earth fault loop impedance. Most modern multifunction testers (MFTs) calculate PFC automatically when performing a loop impedance test — the instrument measures the impedance and divides the voltage by the impedance to give the PFC value directly. Some instruments display both the phase-to-neutral PFC and the phase-to-earth PFC, and the higher of the two is the value that must be compared against the device breaking capacity.",
  },
  {
    question: 'What is a typical PFC value for a domestic installation?',
    answer:
      'For a typical domestic installation in the UK, the prospective fault current at the consumer unit ranges from about 1kA to 6kA, depending on the distance from the supply transformer, the size of the supply cable, the type of supply (single-phase or three-phase), and the earthing arrangement. Properties close to a ground-mounted transformer or on a short supply cable can have PFC values of 4kA to 6kA or even higher. Properties on long supply runs, at the end of an overhead line, or in rural areas typically have lower PFC values of 1kA to 3kA. TN-C-S (PME) supplies tend to have lower impedance and therefore higher PFC values than TN-S supplies. For commercial and industrial installations, PFC values can be significantly higher — 10kA, 16kA, or even 25kA or more, depending on the size of the supply transformer and the impedance of the supply network. These values require protective devices with correspondingly higher breaking capacities.',
  },
  {
    question: 'What happens if PFC exceeds the breaking capacity of my MCBs?',
    answer:
      'If the prospective fault current exceeds the rated breaking capacity of a protective device, the device may not be able to safely interrupt a fault. The possible consequences include: the device contacts may weld together, preventing disconnection; the device may explode due to the energy of the arc exceeding its containment capability; the arc may escape the device enclosure, causing fire or electric shock; or the device may partially interrupt the fault but sustain internal damage that renders it unreliable for future faults. Standard domestic MCBs to BS EN 60898 have a minimum breaking capacity of 6kA (6,000 amperes). This is adequate for the vast majority of domestic installations. However, installations close to the transformer may exceed 6kA, particularly on TN-C-S supplies with very low impedance. In these cases, MCBs with a higher breaking capacity (10kA or 15kA) must be installed. On an EICR, if the measured PFC exceeds the breaking capacity of the installed devices, this is a C1 (danger present) or C2 (potentially dangerous) observation that requires immediate action.',
  },
  {
    question: 'Do I need to measure PFC at every distribution board?',
    answer:
      'BS 7671 Regulation 434.5.1 requires that the prospective fault current is determined at every relevant point in the installation. In practice, this means PFC should be measured at the origin (the main consumer unit or main distribution board) and at every sub-distribution board. The PFC at a sub-distribution board is always lower than at the origin because the impedance of the submain cable between the main board and the sub-board reduces the fault current. However, the protective devices at the sub-board must still have a breaking capacity that exceeds the PFC at that point. Recording PFC at each distribution board also allows verification that the protective devices are correctly rated for their location. For domestic installations with a single consumer unit, PFC is typically measured only at the origin. For commercial installations with multiple distribution boards, PFC should be measured at each board.',
  },
  {
    question: 'What is the difference between PFC and breaking capacity?',
    answer:
      'Prospective fault current (PFC) is a characteristic of the installation — it is the maximum current that the supply can deliver into a fault at a given point. Breaking capacity (also called rated short-circuit capacity or Ics/Icu) is a characteristic of the protective device — it is the maximum fault current that the device has been tested and certified to safely interrupt. The safety requirement is simple: the breaking capacity must be equal to or greater than the prospective fault current at the point where the device is installed. A standard domestic MCB to BS EN 60898 has a breaking capacity of at least 6kA. Industrial MCBs to BS EN 60947-2 are available with breaking capacities of 10kA, 16kA, 25kA, 36kA, 50kA, and higher. MCCB (moulded case circuit breakers) can have breaking capacities up to 150kA. HRC fuses to BS 88 typically have very high breaking capacities of 80kA or more, which is why they are often used at the origin of commercial and industrial installations where PFC values are high.',
  },
  {
    question: 'How does Elec-Mate help with PFC verification?',
    answer:
      'Elec-Mate provides several tools for PFC verification. The PFC calculator allows you to calculate the prospective fault current from the supply impedance or from the Ze and conductor impedance values. The adiabatic equation calculator verifies that the cable can withstand the fault current for the duration of the disconnection time (k squared S squared must be greater than or equal to I squared t). The schedule of test results in the EICR and EIC forms includes fields for PFC at the origin and validates the measured value against the breaking capacity of the installed protective devices. If the PFC exceeds the device rating, the app highlights this as a potential observation code. All calculations are based on BS 7671:2018+A3:2024 and work offline on site.',
  },
];

const sections = [
  {
    id: 'what-is-pfc',
    heading: 'What Is Prospective Fault Current?',
    content: (
      <>
        <p>
          Prospective fault current (PFC), also written as Ipf or PSCC (prospective short-circuit
          current), is the maximum current that would flow at a given point in an electrical
          installation if a fault of negligible impedance occurred at that point. It represents the
          worst-case scenario — the absolute maximum current the supply can deliver into a dead
          short circuit or a solid earth fault.
        </p>
        <p>
          There are two types of prospective fault current to consider. The first is the prospective
          short-circuit current — the current that would flow if the line and neutral conductors
          were connected directly together (a dead short). This is typically the higher value. The
          second is the prospective earth fault current — the current that would flow if the line
          conductor made direct contact with the earth conductor or an earthed metallic part. This
          is related to the earth fault loop impedance (Ze).
        </p>
        <p>
          PFC is determined by the supply impedance — the impedance of the path from the supply
          transformer to the point of measurement. The lower the impedance, the higher the
          prospective fault current. A property close to the transformer with a large supply cable
          has low impedance and therefore high PFC. A property at the end of a long supply run has
          high impedance and therefore lower PFC.
        </p>
      </>
    ),
  },
  {
    id: 'why-pfc-matters',
    heading: 'Why PFC Matters',
    content: (
      <>
        <p>
          PFC matters for one critical reason: every protective device in the installation must be
          capable of safely interrupting the maximum fault current that could flow at the point
          where it is installed. This is a fundamental safety requirement set out in BS 7671
          Regulation 434.5.1.
        </p>
        <p>
          When a short circuit or earth fault occurs, an enormous current flows — potentially
          thousands of amperes. The protective device (MCB, RCBO, fuse) must interrupt this current
          safely, containing the arc within the device enclosure and disconnecting the circuit
          without fire, explosion, or danger to persons. If the fault current exceeds the device's
          rated breaking capacity, the device may fail catastrophically.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white mb-1">
                What happens when PFC exceeds breaking capacity
              </h3>
              <p className="text-white text-sm leading-relaxed">
                If the prospective fault current exceeds the breaking capacity of a protective
                device, the consequences can include: device contacts welding together (failing to
                disconnect), the device exploding and ejecting fragments of plastic and metal,
                sustained arcing that ignites the consumer unit or surrounding materials, and
                cascading failure of adjacent devices. This is not a theoretical risk — it is the
                reason PFC must be measured and verified on every installation.
              </p>
            </div>
          </div>
        </div>
        <p>
          PFC also matters for cable protection. The{' '}
          <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
            adiabatic equation
          </SEOInternalLink>{' '}
          (k&sup2;S&sup2; &ge; I&sup2;t) verifies that the cable conductor can withstand the heating
          effect of the fault current for the duration of the disconnection time. If the PFC is very
          high and the disconnection time is not short enough, the cable can be damaged by the fault
          current — the conductor can overheat, melting the insulation and creating a fire risk.
        </p>
        <SEOAppBridge
          title="PFC calculator and adiabatic verification"
          description="Elec-Mate's PFC calculator determines the fault current from supply impedance. The adiabatic calculator then verifies the cable can withstand it. Both work offline on site."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'how-to-measure',
    heading: 'How to Measure PFC',
    content: (
      <>
        <p>
          PFC is measured using a multifunction tester (MFT) or a dedicated loop impedance tester.
          Most modern MFTs have a PFC function that measures the supply impedance and calculates the
          maximum fault current automatically.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">At the Origin</h3>
            <p className="text-white text-sm leading-relaxed">
              PFC is measured at the origin of the installation — typically at the consumer unit or
              main distribution board. Connect the test instrument to the line, neutral, and earth
              terminals at the main switch (incoming side). The instrument measures both the
              line-to-neutral impedance and the line-to-earth impedance (Ze), then calculates the
              PFC from each. The higher of the two values is the prospective fault current that must
              be recorded on the certificate. Most instruments display the PFC value directly in kA
              (kiloamperes).
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">At Sub-Distribution Boards</h3>
            <p className="text-white text-sm leading-relaxed">
              PFC should also be measured at each sub-distribution board in the installation. The
              PFC at a sub-board is always lower than at the origin because the impedance of the
              submain cable between the main board and the sub-board adds to the total fault loop
              impedance, reducing the fault current. Connect the instrument to the incoming
              terminals of the sub-board and measure in the same way. The PFC at each board must not
              exceed the breaking capacity of the protective devices installed at that board.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Recording on Certificates</h3>
            <p className="text-white text-sm leading-relaxed">
              The measured PFC is recorded in the "Prospective fault current Ipf" field on the EIC
              or <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink>. Record
              the highest value (typically the line-to-neutral PFC). On the EICR, the PFC at the
              origin is recorded in the Supply Characteristics section. If the PFC exceeds the
              breaking capacity of any installed device, this must be recorded as an observation
              with the appropriate classification code.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'typical-values',
    heading: 'Typical PFC Values',
    content: (
      <>
        <p>
          PFC values vary widely depending on the supply characteristics, the distance from the
          transformer, and the type of installation. Here are typical ranges for UK installations.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Typical PFC ranges by installation type
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-bold">Domestic (end of long run)</p>
                <p className="text-yellow-400 font-bold">0.5 — 2 kA</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-bold">Domestic (typical urban)</p>
                <p className="text-yellow-400 font-bold">2 — 4 kA</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-bold">Domestic (near transformer)</p>
                <p className="text-yellow-400 font-bold">4 — 8 kA</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-bold">Commercial (small)</p>
                <p className="text-yellow-400 font-bold">6 — 16 kA</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <div className="flex justify-between items-center">
                <p className="text-white font-bold">Commercial/industrial (large)</p>
                <p className="text-yellow-400 font-bold">16 — 50+ kA</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Properties immediately adjacent to a ground-mounted transformer (pad-mount or mini-pillar)
          on a TN-C-S supply can have PFC values that exceed the 6kA breaking capacity of standard
          domestic MCBs. This is not unusual — it is simply a consequence of the very low supply
          impedance at close range. In these cases, higher-rated devices must be installed.
        </p>
      </>
    ),
  },
  {
    id: 'breaking-capacity',
    heading: 'Breaking Capacity of Protective Devices',
    content: (
      <>
        <p>
          Breaking capacity (also called rated short-circuit capacity) is the maximum fault current
          that a protective device has been tested and certified to safely interrupt. The device
          must be able to contain the arc, extinguish it, and open the circuit without fire,
          explosion, or danger. Different device types and standards specify different breaking
          capacities.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Common device breaking capacities</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">MCB (BS EN 60898)</p>
                <p className="text-white text-sm">
                  6kA minimum (standard domestic), 10kA, 15kA available
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">MCB (BS EN 60947-2)</p>
                <p className="text-white text-sm">10kA, 16kA, 25kA, 36kA, 50kA (industrial)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">RCBO (BS EN 61009)</p>
                <p className="text-white text-sm">6kA minimum (domestic), 10kA available</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">HRC fuse (BS 88)</p>
                <p className="text-white text-sm">80kA typical — very high breaking capacity</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">BS 3036 rewirable fuse</p>
                <p className="text-white text-sm">1kA to 4kA — very low breaking capacity</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
                <p className="text-white font-bold">MCCB (moulded case)</p>
                <p className="text-white text-sm">16kA to 150kA depending on frame size</p>
              </div>
            </div>
          </div>
        </div>
        <p>
          A critical point: BS 3036 rewirable fuses have very low breaking capacities, typically 1kA
          to 4kA. On many modern supplies with PFC values of 3kA or more, the BS 3036 fuse may not
          have adequate breaking capacity. This is one of the reasons why BS 3036 fuse boards are
          often identified as requiring upgrade during periodic inspection.
        </p>
      </>
    ),
  },
  {
    id: 'pfc-and-ze',
    heading: 'PFC and Ze — The Relationship',
    content: (
      <>
        <p>
          Prospective fault current and Ze (external earth fault loop impedance) are directly
          related through Ohm's law. The prospective earth fault current is:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            I<sub>pf(earth)</sub> = U<sub>o</sub> &divide; Z<sub>e</sub>
          </p>
          <p className="text-white text-xs mt-2">
            U<sub>o</sub> = nominal phase voltage (230V) | Z<sub>e</sub> = external earth fault loop
            impedance
          </p>
        </div>
        <p>
          The lower the Ze, the higher the earth fault current. For a TN-C-S supply with a typical
          Ze of 0.20 ohms: Ipf = 230 / 0.20 = 1,150A (1.15kA) for the earth fault path. The
          prospective short-circuit current (line-to-neutral) is typically higher still because the
          neutral impedance is lower than the earth fault loop impedance.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Ze and corresponding earth fault PFC
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Ze = 0.10&Omega;</p>
              <p className="text-yellow-400 text-lg font-bold">2.3 kA</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Ze = 0.20&Omega;</p>
              <p className="text-yellow-400 text-lg font-bold">1.15 kA</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Ze = 0.35&Omega;</p>
              <p className="text-yellow-400 text-lg font-bold">657 A</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Ze = 0.80&Omega;</p>
              <p className="text-yellow-400 text-lg font-bold">288 A</p>
            </div>
          </div>
        </div>
        <p>
          Remember that the earth fault PFC is usually lower than the short-circuit PFC
          (line-to-neutral). The overall PFC recorded on the certificate should be the higher of the
          two values — typically the line-to-neutral short circuit current. The Ze is recorded
          separately in the supply characteristics section of the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangements
          </SEOInternalLink>{' '}
          data.
        </p>
        <SEOAppBridge
          title="PFC calculator and Ze verification"
          description="Enter your Ze value and Elec-Mate calculates the prospective earth fault current. The EICR form validates PFC against device breaking capacities automatically. Works offline."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'when-pfc-too-high',
    heading: 'When PFC Is Too High',
    content: (
      <>
        <p>
          PFC being "too high" means that the prospective fault current exceeds the rated breaking
          capacity of the installed protective devices. This is a serious safety defect that
          requires immediate action.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Replace devices with higher-rated ones
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  The most straightforward solution is to replace the protective devices with ones
                  that have a breaking capacity exceeding the measured PFC. For example, replacing
                  standard 6kA MCBs with 10kA MCBs. This may require a consumer unit upgrade if the
                  existing consumer unit cannot accept higher-rated devices.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Install a current-limiting device upstream
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  An HRC fuse (BS 88) installed upstream of the consumer unit can limit the fault
                  current that reaches the downstream MCBs. BS 88 fuses have very high breaking
                  capacities (typically 80kA) and can current-limit, reducing the peak fault
                  current. This "back-up protection" arrangement allows standard 6kA MCBs to be used
                  downstream of a suitable HRC fuse, provided the let-through energy of the fuse
                  does not exceed the MCB's capacity.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Observation codes on EICR</h3>
                <p className="text-white text-sm leading-relaxed">
                  If PFC exceeds device breaking capacity, this should typically be classified as C2
                  (potentially dangerous) on the EICR. In extreme cases where the margin is
                  significant, C1 (danger present) may be appropriate. The observation should
                  specify the measured PFC, the device breaking capacity, and the recommended
                  remedial action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulatory-requirements',
    heading: 'Regulatory Requirements for PFC',
    content: (
      <>
        <p>
          BS 7671 has several regulations that address prospective fault current. The key
          regulations are:
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Regulation 434.5.1</h3>
            <p className="text-white text-sm leading-relaxed">
              The rated short-circuit capacity of each protective device shall be not less than the
              prospective fault current at the point at which the device is installed. This is the
              fundamental requirement — every device must be able to safely interrupt the maximum
              fault current it could face. There is an exception under Regulation 434.5.2 for
              back-up protection.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 434.5.2 — Back-up Protection
            </h3>
            <p className="text-white text-sm leading-relaxed">
              A device with a rated breaking capacity less than the prospective fault current may be
              used if a device with adequate breaking capacity is installed upstream and the
              characteristics of the two devices are coordinated so that the energy let-through of
              the upstream device does not exceed the energy that the downstream device and the
              cables it protects can withstand. This is the basis for using HRC fuses upstream of
              standard MCBs.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 313.1 — Supply Characteristics
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The prospective fault current at the origin of the installation shall be determined.
              This is part of the assessment of general characteristics (Part 3 of BS 7671) that
              must be carried out before the design of the installation begins. The PFC influences
              the selection of protective devices, consumer unit specification, and cable sizing.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Chapter 43 — Protection Against Overcurrent
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Chapter 43 sets out the general principles of protection against overcurrent,
              including short-circuit current. The protective device must disconnect the circuit
              before the short-circuit current causes damage to the cable insulation or connections.
              The{' '}
              <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
                adiabatic equation
              </SEOInternalLink>{' '}
              (k&sup2;S&sup2; &ge; I&sup2;t) is the tool used to verify this requirement.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="EICR records PFC and validates against device ratings"
          description="Elec-Mate's digital EICR records the PFC at the origin and checks it against the breaking capacity of every installed protective device. Observations are auto-suggested if PFC exceeds capacity."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/prospective-fault-current-calculator',
    title: 'PFC Calculator',
    description:
      'Calculate prospective fault current from supply impedance. Verify against device breaking capacities.',
    icon: Calculator,
    category: 'Tool' as const,
  },
  {
    href: '/tools/adiabatic-equation-calculator',
    title: 'Adiabatic Equation Calculator',
    description:
      'Verify cable can withstand fault current using k squared S squared vs I squared t.',
    icon: Zap,
    category: 'Tool' as const,
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements Guide',
    description: 'TN-S, TN-C-S, TT systems explained. Ze values and their relationship to PFC.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct testing order from GN3 — including where PFC measurement fits in the sequence.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/how-to-size-cables-bs-7671',
    title: 'How to Size Cables to BS 7671',
    description: 'Cable sizing includes fault current verification using the adiabatic equation.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to BS 7671:2018 including Regulation 434.5 on prospective fault current.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ProspectiveFaultCurrentGuidePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-01"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Testing"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Prospective Fault Current <span className="text-yellow-400">PFC Guide for BS 7671</span>
        </>
      }
      heroSubtitle="The complete guide to prospective fault current (PFC/Ipf). What it is, why it matters, how to measure it on site, typical values for domestic and commercial installations, breaking capacity of MCBs and fuses, and the BS 7671 regulatory requirements under Regulation 434.5."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="PFC verification, built into every certificate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. PFC calculator, adiabatic verification, and automatic validation on every EICR. 7-day free trial, cancel anytime."
    />
  );
}
