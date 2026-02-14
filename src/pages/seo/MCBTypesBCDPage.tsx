import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Shield,
  Activity,
  Gauge,
  AlertTriangle,
  Calculator,
  FileCheck2,
  GraduationCap,
  Mic,
  ShieldCheck,
  Lightbulb,
  Cog,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/electrical-testing-guide' },
  { label: 'MCB Types', href: '/guides/mcb-types-b-c-d-explained' },
];

const tocItems = [
  { id: 'what-is-mcb', label: 'What Is an MCB?' },
  { id: 'trip-characteristics', label: 'Magnetic and Thermal Trip Mechanisms' },
  { id: 'type-b', label: 'Type B MCB (3-5x Rated Current)' },
  { id: 'type-c', label: 'Type C MCB (5-10x Rated Current)' },
  { id: 'type-d', label: 'Type D MCB (10-20x Rated Current)' },
  { id: 'choosing-the-right-type', label: 'Choosing the Right Type' },
  { id: 'zs-implications', label: 'How MCB Type Affects Maximum Zs' },
  { id: 'common-mistakes', label: 'Common Mistakes on Site' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Type B MCBs trip magnetically between 3 and 5 times rated current — suitable for resistive and lightly inductive loads including domestic socket outlets, lighting, and immersion heaters.',
  'Type C MCBs trip magnetically between 5 and 10 times rated current — designed for moderately inductive loads such as motors, discharge lighting, and fluorescent fittings with magnetic ballasts.',
  'Type D MCBs trip magnetically between 10 and 20 times rated current — reserved for highly inductive loads with very high inrush currents such as transformers, X-ray machines, and welding equipment.',
  'Using a higher-type MCB than necessary (e.g. Type C where Type B would suffice) reduces the maximum permitted Zs, making it harder to achieve compliant earth fault loop impedance readings.',
  'Elec-Mate includes 50+ calculators that automatically look up the correct maximum Zs for any MCB type and rating, and the AI board scanner identifies MCB types from a photograph of the consumer unit.',
];

const faqs = [
  {
    question: 'Can I use a Type C MCB for a domestic socket circuit?',
    answer:
      'Technically you can, but it is poor practice. Domestic socket circuits supply resistive or lightly inductive loads — kettles, lamps, phone chargers, vacuum cleaners — none of which produce significant inrush current. A Type B MCB is the correct choice because its lower magnetic trip threshold (3-5x) provides faster disconnection under fault conditions. Using a Type C MCB (5-10x) on a socket circuit halves the maximum permitted Zs — from 1.37 ohms (B32) to 0.68 ohms (C32) for a 32A device at 0.4-second disconnection. This dramatically reduces the margin for compliance and may cause the circuit to fail Zs testing, especially on installations with higher Ze values such as TN-S systems. Only use Type C where the load genuinely requires it.',
  },
  {
    question: 'What is the difference between the magnetic and thermal trip mechanisms?',
    answer:
      'An MCB has two independent trip mechanisms. The thermal mechanism uses a bimetallic strip that bends as it heats up from sustained overcurrent. It protects against overload — a moderate excess of current flowing for a prolonged period (for example, too many appliances on one circuit). The thermal trip is slow — it can take minutes or even hours to trip at currents just above the rated value. The magnetic mechanism uses an electromagnet or solenoid that trips instantly when the current exceeds a specified multiple of the rated current. It protects against short circuits — very high fault currents that could damage wiring or cause fire in milliseconds. The multiple at which the magnetic mechanism trips is what defines the MCB type: 3-5x for Type B, 5-10x for Type C, 10-20x for Type D.',
  },
  {
    question: 'Why does the MCB type affect the maximum Zs value?',
    answer:
      "The maximum Zs value is calculated from the minimum fault current required to trip the MCB within the permitted disconnection time (0.4 seconds for final circuits). For 0.4-second disconnection, the MCB must trip on its magnetic mechanism (instantaneous trip). The magnetic trip threshold is defined by the MCB type — 5x rated current for Type B, 10x for Type C, 20x for Type D. Using Ohm's law: maximum Zs = (0.95 × 230) divided by magnetic trip current, where 0.95 is the Cmin factor accounting for the lowest expected supply voltage. For a 32A MCB: Type B = 218.5/(5×32) = 1.37 ohms; Type C = 218.5/(10×32) = 0.68 ohms; Type D = 218.5/(20×32) = 0.34 ohms. A higher MCB type requires more fault current to trip, which requires a lower loop impedance, which means a lower maximum Zs.",
  },
  {
    question: 'When should I use a Type D MCB?',
    answer:
      'Type D MCBs are reserved for loads with extremely high inrush currents — typically 10 to 20 times the running current. Common applications include welding equipment, large transformers on initial energisation, X-ray machines, UPS systems with large capacitor banks, and some industrial motor starters. In domestic installations, Type D MCBs are almost never appropriate. The very high magnetic trip threshold (10-20x) means the maximum Zs is extremely low — just 0.34 ohms for a D32 at 0.4-second disconnection. Achieving such a low Zs is impossible in most domestic and many commercial installations. If you find a Type D MCB in a domestic consumer unit, it is almost certainly incorrect and should be flagged on the EICR.',
  },
  {
    question: 'How do I identify the MCB type on site?',
    answer:
      'The MCB type is printed on the front face of the device, typically as a letter immediately before the current rating. For example, "B32" means a Type B MCB rated at 32 amps, "C16" means a Type C rated at 16 amps, and "D63" means a Type D rated at 63 amps. The letter is usually the most prominent marking on the device. On older MCBs, the marking may be less clear — look for the type designation in the technical data printed on the side or on a label. All MCBs manufactured to BS EN 60898 must be clearly marked with their type. Elec-Mate\'s AI board scanner reads these markings from a photograph and automatically identifies the type and rating of every device in the consumer unit.',
  },
  {
    question: 'What MCB type should I use for LED lighting circuits?',
    answer:
      'Type B is the correct choice for LED lighting circuits in the vast majority of installations. Modern LED drivers are electronic and do not produce the high inrush currents associated with older magnetic ballast fluorescent fittings. The inrush current of a typical LED driver is brief (less than one half-cycle) and within the Type B threshold. Using Type C for an LED lighting circuit is unnecessary and reduces the available Zs margin. The exception is large commercial installations with many LED luminaires on a single circuit — the cumulative inrush from dozens of drivers switching on simultaneously could potentially trip a Type B MCB. In these cases, Type C may be appropriate, but it is better practice to split the lighting across multiple circuits with Type B MCBs to keep the inrush per circuit manageable.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Complete Table 41.3 and 41.4 reference for maximum Zs by protective device type and rating.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description: 'What Zs is, how to measure it, and how MCB type affects disconnection time.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/rcbo-vs-rcd-mcb',
    title: 'RCBO vs RCD + MCB',
    description: 'Cost comparison, nuisance tripping, and modern consumer unit design trends.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, A, B, F, and S — where each is required under BS 7671.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with AI board scanning and automatic Zs validation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-mcb',
    heading: 'What Is an MCB?',
    content: (
      <>
        <p>
          A Miniature Circuit Breaker (MCB) is an automatically operated electrical switch designed
          to protect a circuit against damage caused by overcurrent — both overloads and short
          circuits. MCBs are manufactured to BS EN 60898 and are the standard protective device in
          UK consumer units and distribution boards, having replaced rewireable fuses (BS 3036) and
          cartridge fuses (BS 1361) in all new installations.
        </p>
        <p>
          Unlike a fuse, which melts and must be replaced after operating, an MCB can be reset by
          flipping the toggle back to the ON position. This makes MCBs far more practical — a
          tripped MCB can be restored in seconds without needing replacement components. However, an
          MCB that trips repeatedly indicates a fault that must be investigated, not simply reset.
        </p>
        <p>
          MCBs come in three main types — B, C, and D — defined by their magnetic trip
          characteristics. The type determines how much instantaneous fault current is needed to
          trip the MCB within its fastest operating time. Choosing the correct type for the load is
          essential: too sensitive and the MCB will nuisance-trip on normal inrush currents; too
          insensitive and the MCB may not disconnect fast enough during a fault, compromising the{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            earth fault loop impedance
          </SEOInternalLink>{' '}
          compliance of the circuit.
        </p>
      </>
    ),
  },
  {
    id: 'trip-characteristics',
    heading: 'Magnetic and Thermal Trip Mechanisms',
    content: (
      <>
        <p>
          Every MCB contains two independent protection mechanisms that work together to protect the
          circuit against different types of overcurrent.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Thermal Trip (Overload)</h3>
            <p className="text-white text-sm leading-relaxed">
              A bimetallic strip inside the MCB heats up and bends when current exceeds the rated
              value for a sustained period. The bending eventually triggers the trip mechanism. This
              provides overload protection — it stops cables from overheating when too many
              appliances are drawing current simultaneously. The thermal trip is intentionally slow
              — it allows brief overcurrents (such as motor start-up) to pass without tripping, but
              will trip if the overload persists. Trip time decreases as the overcurrent increases:
              a 32A MCB carrying 40A might take several minutes to trip, but at 64A it would trip
              within seconds.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Magnetic Trip (Short Circuit)</h3>
            <p className="text-white text-sm leading-relaxed">
              An electromagnet (solenoid) inside the MCB pulls the trip mechanism open
              instantaneously when the current exceeds a specific threshold. This provides short
              circuit protection — it disconnects the circuit in milliseconds when a very high fault
              current flows (for example, a line-to-neutral or line-to-earth short circuit). The
              threshold at which the magnetic mechanism operates is what defines the MCB type: 3-5x
              rated current for Type B, 5-10x for Type C, and 10-20x for Type D. This is the
              mechanism that achieves the 0.4-second disconnection time required by BS 7671 for
              final circuits.
            </p>
          </div>
        </div>
        <p>
          The thermal and magnetic mechanisms are completely independent. A sustained 50A overload
          on a 32A MCB will trip the thermal element without involving the magnetic element. A 500A
          short circuit fault will trip the magnetic element in milliseconds without waiting for the
          thermal element to respond.
        </p>
      </>
    ),
  },
  {
    id: 'type-b',
    heading: 'Type B MCB — 3 to 5 Times Rated Current',
    content: (
      <>
        <p>
          Type B is the standard MCB type for domestic and light commercial installations. The
          magnetic trip mechanism operates between 3 and 5 times the rated current. For a B32 MCB,
          this means the magnetic trip activates between 96A and 160A. At currents below 96A, only
          the thermal mechanism provides protection (slow trip). At currents above 160A, the
          magnetic mechanism guarantees instantaneous disconnection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Type B MCB — Suitable Applications</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — LED, incandescent, and halogen lighting
                produces minimal inrush current. Type B handles this comfortably.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet circuits</strong> — Ring final circuits and radial circuits
                supplying general domestic and commercial socket outlets. The loads are
                predominantly resistive (kettles, heaters, chargers) or lightly inductive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heaters and storage heaters</strong> — Purely resistive loads with
                no inrush current. Type B is ideal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric showers and cookers</strong> — High-current resistive loads. Type B
                at the appropriate rating (40A or 50A for a shower, 32A or 40A for a cooker).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Type B should be the default choice unless there is a specific technical reason to use
          Type C or D. Using Type B wherever possible maximises the{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum permitted Zs
          </SEOInternalLink>{' '}
          for each circuit, giving the best chance of compliance during testing.
        </p>
      </>
    ),
  },
  {
    id: 'type-c',
    heading: 'Type C MCB — 5 to 10 Times Rated Current',
    content: (
      <>
        <p>
          Type C MCBs have a higher magnetic trip threshold — between 5 and 10 times the rated
          current. For a C32 MCB, the magnetic trip activates between 160A and 320A. This higher
          threshold allows the MCB to withstand the larger inrush currents produced by inductive
          loads without nuisance tripping.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Type C MCB — Suitable Applications</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motors and compressors</strong> — Induction motors draw 5 to 8 times their
                running current during start-up. A Type B MCB would trip on the inrush; Type C
                tolerates it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discharge lighting (HID/fluorescent with magnetic ballasts)</strong> — Older
                fluorescent fittings with magnetic ballasts produce significant inrush current on
                switch-on. Modern electronic ballasts have much lower inrush and are usually fine
                with Type B.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air conditioning units</strong> — Compressor motors in AC units produce high
                inrush. Type C is standard for dedicated AC circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cog className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small transformers</strong> — Transformers can draw 10 or more times their
                rated current during initial energisation (magnetising inrush). Type C handles most
                small to medium transformers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The trade-off with Type C is a lower maximum Zs. A C32 has a{' '}
          <SEOInternalLink href="/guides/maximum-zs-values-bs-7671">
            maximum Zs of 0.68 ohms
          </SEOInternalLink>{' '}
          compared to 1.37 ohms for a B32 — half the value. On installations with higher Ze values
          (TN-S systems, long supply cables), achieving a Zs below 0.54 ohms (corrected) on a Type C
          circuit can be challenging. Always verify that the loop impedance will be within limits
          before specifying Type C.
        </p>
        <SEOAppBridge
          title="AI board scanner identifies MCB types from a photo"
          description="Point your phone at the consumer unit and Elec-Mate reads every MCB and RCBO — type (B, C, D), rating, manufacturer. The schedule of test results auto-populates with the correct maximum Zs for each device. No manual lookups."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'type-d',
    heading: 'Type D MCB — 10 to 20 Times Rated Current',
    content: (
      <>
        <p>
          Type D MCBs have the highest magnetic trip threshold — between 10 and 20 times the rated
          current. For a D32 MCB, the magnetic trip activates between 320A and 640A. This extreme
          threshold is designed for loads with very high inrush currents that would trip even a Type
          C device.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Type D MCB — Specialist Applications</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welding equipment</strong> — Welding transformers and resistance welders
                produce enormous inrush currents on initial contact. Type D accommodates this
                without tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>X-ray machines</strong> — Medical and industrial X-ray equipment draws very
                high peak currents during exposure. Type D is standard for X-ray circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large transformers</strong> — Transformers above a few kVA can produce
                magnetising inrush currents exceeding 10 times their rated current. Type D prevents
                the MCB from tripping during energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS systems with large capacitor banks</strong> — The capacitor charging
                current on initial start-up can be extremely high. Type D is needed to ride through
                this inrush.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Type D MCBs are rarely appropriate for domestic installations. The maximum Zs for a D32 at
          0.4-second disconnection is just 0.34 ohms — achieving this requires an extremely low Ze
          and very short circuit runs with large conductors. In most domestic installations,
          particularly those with TN-S earthing, this Zs is impossible to achieve. If you find a
          Type D MCB in a domestic consumer unit during an EICR, it is almost certainly the wrong
          type and should be noted as an observation.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-the-right-type',
    heading: 'Choosing the Right MCB Type for the Load',
    content: (
      <>
        <p>
          The selection process is straightforward: identify the inrush current characteristic of
          the load and choose the MCB type that can tolerate it without nuisance tripping, while
          maintaining the lowest possible magnetic trip threshold to maximise the available Zs
          margin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start with Type B.</strong> It should be the default for every circuit
                unless the load characteristics specifically require a higher type. Domestic socket
                outlets, lighting (including LED), heating, cooking, and shower circuits should all
                use Type B.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Move to Type C only if the load has moderate inrush.</strong> If the
                connected equipment has an induction motor, magnetic ballast, or compressor that
                draws 5-10 times its running current on start-up, Type C is appropriate. Always
                check that the{' '}
                <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
                  Zs
                </SEOInternalLink>{' '}
                will be within limits with the lower maximum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use Type D only for specialist high-inrush equipment.</strong> Welding
                equipment, X-ray machines, large transformers. Verify the Zs requirement is
                achievable before specifying. If it is not, the circuit design may need a local
                distribution board with a shorter cable run.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A common rule of thumb: if you are not sure whether the load needs Type C, try Type B
          first. If the MCB trips on inrush when the load is switched on, then consider upgrading to
          Type C. But never jump to Type C (or Type D) "just in case" — the lower Zs margin makes
          compliance harder and reduces the safety of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'zs-implications',
    heading: 'How MCB Type Affects Maximum Zs',
    content: (
      <>
        <p>
          The MCB type has a direct and significant impact on the maximum permitted earth fault loop
          impedance. This is one of the most important practical considerations when selecting MCBs
          for an installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">
            Maximum Zs Comparison — 32A MCBs at 0.4s Disconnection
          </h4>
          <div className="space-y-2 text-white">
            <div className="flex justify-between border-b border-white/10 pb-2 font-bold text-yellow-400">
              <span>MCB Type</span>
              <span>Max Zs (Table)</span>
              <span>Max Zs (x 0.8)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>B32</span>
              <span className="font-mono">1.37 ohms</span>
              <span className="font-mono">1.10 ohms</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>C32</span>
              <span className="font-mono">0.68 ohms</span>
              <span className="font-mono">0.54 ohms</span>
            </div>
            <div className="flex justify-between">
              <span>D32</span>
              <span className="font-mono">0.34 ohms</span>
              <span className="font-mono">0.27 ohms</span>
            </div>
          </div>
        </div>
        <p>
          The difference is stark. A B32 gives you 1.10 ohms of headroom (corrected). A C32 cuts
          that in half to 0.54 ohms. A D32 reduces it further to just 0.27 ohms. On a TN-S
          installation where Ze might be 0.60 ohms, a B32 circuit with R1+R2 of 0.50 ohms would give
          a Zs of 1.10 ohms — comfortably within the B32 limit. But the same circuit with a C32
          would fail (1.10 ohms exceeds the 0.54 ohm limit). With a D32, it would fail dramatically.
        </p>
        <p>
          This is why MCB type selection is not just an academic exercise — it directly determines
          whether circuits will pass or fail during{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR testing</SEOInternalLink>.
          Specifying the correct (lowest appropriate) MCB type at the design stage avoids compliance
          problems at the testing stage.
        </p>
        <SEOAppBridge
          title="50+ calculators including Zs by MCB type"
          description="Elec-Mate has every BS 7671 maximum Zs value built in. Select the MCB type (B, C, or D) and rating, and the calculator shows the tabulated maximum and the 0.8-corrected value instantly. Plus cable sizing, voltage drop, PFC, adiabatic, and maximum demand calculators."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common MCB Selection Mistakes on Site',
    content: (
      <>
        <p>
          In practice, MCB type selection errors are common. Knowing what to look for during
          inspection work helps you identify defects and recommend the right remedial action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C on domestic socket circuits.</strong> This is the most common
                mistake. The circuit does not need the higher inrush tolerance of Type C, and the
                reduced maximum Zs causes unnecessary compliance problems. On an EICR, if the Zs
                passes for Type C, it is not a defect — but if the Zs fails for Type C but would
                pass for Type B, recommend changing to Type B as part of the remedial works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type D in a domestic consumer unit.</strong> Almost always wrong. Type D is
                for specialist industrial loads. A Type D MCB in a domestic installation is likely a
                stock error or a misunderstanding. Recommend replacement with the correct type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B on a motor circuit that keeps tripping.</strong> If a Type B MCB
                nuisance-trips every time a motor starts, the electrician may have used the wrong
                type. Check the motor's inrush characteristics and upgrade to Type C if the inrush
                exceeds 5x the MCB rating. Do not simply increase the MCB rating — this could result
                in inadequate overload protection for the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed types from different manufacturers.</strong> While not automatically a
                defect, mixing MCB brands in a consumer unit designed for a specific manufacturer's
                devices can cause compatibility issues. The devices may not fit correctly in the DIN
                rail, and the breaking capacity and coordination with the main switch may not be
                guaranteed. Best practice is to use a single manufacturer throughout.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Voice test entry records MCB details hands-free"
          description="As you inspect the consumer unit, speak the MCB details — 'Circuit 1, Type B, 32 amp, ring final' — and Elec-Mate fills in the schedule. Combined with the AI board scanner that reads MCB labels from photos, you capture every detail without writing anything down."
          icon={Mic}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MCBTypesBCDPage() {
  return (
    <GuideTemplate
      title="MCB Types B, C and D Explained | Trip Characteristics"
      description="Complete guide to MCB types B, C, and D for UK electricians. Magnetic trip characteristics (Type B 3-5x, Type C 5-10x, Type D 10-20x), when to use each type, how MCB type affects maximum Zs values, common selection mistakes, and practical guidance for inspection and testing."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Protection Devices"
      badgeIcon={Zap}
      heroTitle={
        <>
          MCB Types B, C and D:{' '}
          <span className="text-yellow-400">Trip Characteristics Explained</span>
        </>
      }
      heroSubtitle="Type B trips at 3-5 times rated current. Type C at 5-10 times. Type D at 10-20 times. Choosing the wrong MCB type means nuisance tripping or inadequate fault protection. This guide explains the magnetic trip characteristics, when to use each type, and how MCB type directly affects your maximum Zs values."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About MCB Types"
      relatedPages={relatedPages}
      ctaHeading="Look Up Maximum Zs by MCB Type Instantly"
      ctaSubheading="Elec-Mate has every BS 7671 Zs value for Type B, C, and D MCBs built in. AI board scanner reads MCB types from a photo. Voice entry records test results hands-free. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
