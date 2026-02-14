import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Cable,
  BookOpen,
  Activity,
  Gauge,
  ClipboardCheck,
  Calculator,
  Mountain,
  Droplets,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'High Earth Resistance', href: '/guides/high-earth-resistance' },
];

const tocItems = [
  { id: 'what-is-earth-resistance', label: 'What Is Earth Resistance?' },
  { id: 'why-it-matters', label: 'Why High Earth Resistance Is Dangerous' },
  { id: 'causes', label: 'Causes of High Earth Resistance' },
  { id: 'soil-conditions', label: 'Soil Conditions and Resistivity' },
  { id: 'electrode-types', label: 'Earth Electrode Types' },
  { id: 'improving-resistance', label: 'How to Improve Earth Resistance' },
  { id: 'testing-methods', label: 'Testing Methods' },
  { id: 'recording-values', label: 'Recording Earth Resistance Values' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Earth electrode resistance (RA) must be low enough to ensure that the RCD protecting the circuit can disconnect within the required time. For a 30mA RCD, RA must not exceed 1667 ohms (RA x IΔn must not exceed 50V). In practice, values below 200 ohms are preferred for TT installations.',
  'High earth resistance is most commonly caused by dry, sandy, or rocky soil with high resistivity. Soil moisture content, mineral composition, temperature, and compaction all affect earth electrode resistance significantly.',
  'The three main electrode types used in UK installations are driven rods (most common), earth plates (for areas where rods cannot be driven), and earth mats or tapes (for shallow soil over rock). Each has specific advantages depending on soil conditions.',
  'Methods to improve earth resistance include driving rods deeper, using multiple rods in parallel, using chemical earth enhancement compounds, selecting a better soil location, and using earth plates or mats where rod driving is impractical.',
  'Elec-Mate includes an earth rod resistance calculator and captures RA values on all certificates. The app validates the RA x IΔn product against BS 7671 requirements and flags non-compliant values automatically.',
];

const faqs = [
  {
    question: 'What is an acceptable earth electrode resistance value?',
    answer:
      'BS 7671 does not specify a single maximum earth electrode resistance value — instead, it requires that RA x IΔn does not exceed 50V, where RA is the earth electrode resistance and IΔn is the rated residual operating current of the RCD. For a 30mA (0.03A) RCD, the maximum RA is 50 / 0.03 = 1667 ohms. For a 100mA RCD, the maximum is 500 ohms. For a 300mA RCD, the maximum is 167 ohms. However, in practice, many competent person scheme providers and local authority building control departments prefer RA values below 200 ohms for TT installations, and some specify maximum values of 100 ohms. Lower RA values provide a greater margin of safety and reduce touch voltages under fault conditions.',
  },
  {
    question: 'Why is my earth resistance reading too high?',
    answer:
      'The most common cause of high earth resistance is dry or sandy soil, which has high resistivity. Other causes include insufficient rod depth (the rod has not reached moist soil or a low-resistivity layer), poor contact between the rod and the surrounding soil (air gaps caused by loose backfill or soil shrinkage), corroded or damaged earth electrodes, loose connections between the earth electrode and the earthing conductor, and seasonal variations (soil moisture reduces in summer, increasing resistance). If your reading is unexpectedly high, first check all connections for tightness and corrosion, then consider soil conditions and rod depth.',
  },
  {
    question: 'How do I measure earth electrode resistance?',
    answer:
      'Earth electrode resistance is measured using the fall-of-potential method (also called the 3-point method). You drive two temporary test spikes into the ground at measured distances from the earth electrode under test. The instrument passes a current between the electrode and the furthest spike (current spike) and measures the voltage between the electrode and the nearer spike (potential spike). From the current and voltage, it calculates the resistance. The potential spike should be positioned at 61.8% of the distance between the electrode and the current spike for the most accurate result. Most modern multifunction testers include an earth electrode resistance function that automates this calculation.',
  },
  {
    question: 'Can I use multiple earth rods to reduce resistance?',
    answer:
      'Yes. Connecting multiple earth rods in parallel reduces the overall earth electrode resistance. The rods must be spaced at least 2.5 times their driven depth apart to be effective — if placed too close together, their resistance zones overlap and the reduction is minimal. As a rough guide, two rods spaced correctly will reduce resistance to approximately 60% of a single rod (not 50%, because the rods influence each other). Three rods will reduce to approximately 40% of a single rod. In practice, this means that if a single 1.2-metre rod gives 200 ohms, two rods correctly spaced should give approximately 120 ohms, and three rods approximately 80 ohms.',
  },
  {
    question: 'How deep should an earth rod be driven?',
    answer:
      'The deeper the earth rod, the lower the resistance — because the rod reaches more moist and compacted soil layers. Standard earth rods in the UK are available in 1.2-metre lengths that can be coupled together. A single 1.2-metre rod may be sufficient in moist, clay-rich soil. In dry or sandy soil, 2.4 metres (two coupled rods) or 3.6 metres (three coupled rods) may be needed. The rod should ideally reach permanently moist soil below the water table or seasonal variation zone. Typical resistance values range from 10 to 50 ohms in wet clay, 50 to 200 ohms in damp loam, 200 to 500 ohms in dry sandy soil, and 500 to 5000+ ohms in rock or gravel.',
  },
  {
    question: 'Does earth resistance change with the seasons?',
    answer:
      'Yes, significantly. Earth electrode resistance varies with soil moisture content, which changes seasonally. During wet winter months, soil moisture is high and earth resistance is at its lowest. During dry summer months, soil moisture reduces and earth resistance increases — sometimes by a factor of two or more. BS 7671 requires that the earth electrode resistance is adequate under the worst-case conditions (typically late summer). If you measure earth resistance during a wet period and obtain a marginal reading, it will almost certainly exceed the limit during dry weather. This is why building a margin of safety into your earth resistance values is important — a reading of 100 ohms in winter might rise to 300 ohms or more in summer depending on soil type and rod depth.',
  },
];

const relatedPages = [
  {
    href: '/guides/earth-electrode-test',
    title: 'Earth Electrode Test Guide',
    description: 'Fall-of-potential method step-by-step procedure.',
    icon: Gauge,
    category: 'Guide' as const,
  },
  {
    href: '/tools/earth-rod-resistance-calculator',
    title: 'Earth Rod Resistance Calculator',
    description: 'Calculate expected earth rod resistance based on soil type and rod dimensions.',
    icon: Calculator,
    category: 'Calculator' as const,
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements Guide',
    description: 'TN-S, TN-C-S, and TT earthing systems explained.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/ze-values-uk',
    title: 'Ze Values UK',
    description: 'External earth fault loop impedance values for UK supply types.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, A, B, F — essential for TT installation protection.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs7671-eighteenth-edition',
    title: 'BS 7671 18th Edition',
    description: 'Complete guide to the current Wiring Regulations.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-earth-resistance',
    heading: 'What Is Earth Electrode Resistance?',
    content: (
      <>
        <p>
          Earth electrode resistance (RA) is the resistance between an earth electrode (such as a
          driven rod) and the general mass of earth. It determines how effectively fault current can
          flow from the installation into the ground and back to the supply transformer, which is
          essential for the operation of protective devices.
        </p>
        <p>
          In a TT earthing system — where the installation has its own earth electrode rather than
          using the supply company's earth — the earth electrode resistance is the critical factor
          in determining whether RCD protection will operate within the required disconnection time.
          The lower the RA value, the more effective the earth path and the faster the RCD will trip
          under fault conditions.
        </p>
        <p>
          Earth electrode resistance is not the same as earth fault loop impedance (Zs). Zs is the
          total impedance of the earth fault loop, which includes the supply transformer impedance,
          the line conductor impedance, and the earth return path impedance. For TT installations,
          the earth electrode resistance is typically the dominant component of the earth fault loop
          impedance because the earth return path through the ground has much higher resistance than
          a metallic conductor.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangement
          </SEOInternalLink>{' '}
          of an installation directly determines the significance of earth electrode resistance. For
          TN-S and TN-C-S systems, the supply company provides the earth path and RA is not
          relevant. For TT systems, RA is a critical measurement that must be tested and verified.
        </p>
      </>
    ),
  },
  {
    id: 'why-it-matters',
    heading: 'Why High Earth Resistance Is Dangerous',
    content: (
      <>
        <p>
          High earth electrode resistance is dangerous because it limits the fault current that can
          flow under earth fault conditions. If the fault current is too low, the protective device
          (typically an RCD in a TT system) may not operate, or may operate too slowly, leaving the
          user exposed to electric shock for an extended period.
        </p>
        <p>
          BS 7671 Regulation 411.5.3 requires that for TT systems, the product of the earth
          electrode resistance and the rated residual operating current of the RCD must not exceed
          50V:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-yellow-400 text-xl mb-2">RA x IΔn ≤ 50V</h3>
          <p className="text-white leading-relaxed">
            Where RA is the earth electrode resistance (ohms) and IΔn is the rated residual
            operating current of the RCD (amps). For a 30mA RCD: RA must not exceed 50 / 0.03 = 1667
            ohms. For a 100mA RCD: RA must not exceed 500 ohms.
          </p>
        </div>
        <p>
          The 50V limit ensures that the touch voltage across the earth electrode does not exceed
          50V — the maximum extra-low voltage considered safe for prolonged contact. If the earth
          resistance is too high, the touch voltage under fault conditions exceeds this limit, and
          the RCD may not trip quickly enough to prevent a dangerous shock.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">High RA Means Higher Touch Voltages</h4>
              <p className="text-white text-sm leading-relaxed">
                If a line-to-earth fault occurs on a TT installation with high earth resistance, the
                voltage appearing on the exposed metalwork of the faulty equipment can be
                dangerously high. The higher the RA, the higher the touch voltage and the greater
                the risk of fatal electric shock — especially in wet or outdoor locations where body
                resistance is reduced.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Causes of High Earth Resistance',
    content: (
      <>
        <p>
          High earth electrode resistance can be caused by a range of factors, most of which relate
          to the soil conditions at the electrode location or the physical condition of the
          electrode itself.
        </p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Dry soil</strong> — soil moisture is the single
              most significant factor affecting earth resistance. Dry soil has high resistivity
              because water provides the conductive ionic path between the electrode and the general
              mass of earth. During drought or extended dry periods, earth resistance can increase
              dramatically.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Sandy or gravelly soil</strong> — sand and gravel
              have poor moisture retention and high resistivity compared to clay or loam.
              Installations in coastal areas, heathland, or sandy subsoil regions often have
              challenging earth resistance conditions.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Rocky ground</strong> — rock has extremely high
              resistivity. In areas with shallow soil over rock (common in parts of Wales, Scotland,
              and the West Country), driving rods deep enough to reach low-resistivity layers may be
              impossible.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Insufficient rod depth</strong> — a rod that has
              not been driven deep enough will be in the zone of seasonal moisture variation. Deeper
              rods reach permanently moist soil and give more stable, lower readings.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Corroded electrodes</strong> — over time, earth
              rods can corrode, particularly in acidic or chemically aggressive soils. Corrosion
              reduces the effective surface area and increases contact resistance. Copper-clad steel
              rods resist corrosion better than bare steel.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">
              <strong className="text-yellow-400">Poor connections</strong> — loose, corroded, or
              inadequate connections between the earth electrode and the earthing conductor increase
              the total resistance. All connections must be tight, clean, and protected from
              corrosion. Clamp connections should be inspected during every periodic inspection.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'soil-conditions',
    heading: 'Soil Conditions and Resistivity',
    content: (
      <>
        <p>
          Soil resistivity is the primary factor determining earth electrode resistance. Different
          soil types have vastly different resistivity values, which directly affect how easy or
          difficult it is to achieve an acceptable earth resistance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Typical Soil Resistivity Values</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold">Wet clay or marshy ground</span>
              <span className="text-yellow-400 font-bold">5 to 40 ohm-metres</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold">Garden soil / loam</span>
              <span className="text-yellow-400 font-bold">10 to 150 ohm-metres</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold">Chalk</span>
              <span className="text-yellow-400 font-bold">60 to 400 ohm-metres</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold">Dry sand / gravel</span>
              <span className="text-yellow-400 font-bold">200 to 3000 ohm-metres</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-white font-bold">Rock (granite, sandstone)</span>
              <span className="text-yellow-400 font-bold">1000 to 100,000+ ohm-metres</span>
            </div>
          </div>
        </div>
        <p>
          Understanding the soil type at the installation site helps you plan the earthing strategy
          before arriving on site. If the property is on sand, gravel, or chalk, you may need to
          budget for multiple rods, longer rods, or alternative electrode types. Use the{' '}
          <SEOInternalLink href="/tools/earth-rod-resistance-calculator">
            earth rod resistance calculator
          </SEOInternalLink>{' '}
          to estimate the expected resistance based on soil type and rod dimensions.
        </p>
      </>
    ),
  },
  {
    id: 'electrode-types',
    heading: 'Earth Electrode Types',
    content: (
      <>
        <p>
          BS 7671 recognises several types of earth electrode, each suited to different installation
          conditions. The choice of electrode type depends on the soil conditions, available space,
          and the required earth resistance value.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <Wrench className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Driven Rods</h3>
            <p className="text-white text-sm leading-relaxed">
              The most common electrode type for UK domestic installations. Copper-clad steel rods
              (typically 15.8mm or 19mm diameter) are driven vertically into the ground using a rod
              driving tool or SDS hammer. Available in 1.2m lengths that couple together for deeper
              installation. Cost-effective and efficient in most soil types except rock.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Mountain className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Earth Plates</h3>
            <p className="text-white text-sm leading-relaxed">
              Copper or galvanised steel plates buried horizontally in the ground. Used where rods
              cannot be driven due to rock or other obstructions. The plate provides a larger
              surface area in contact with the soil. Requires excavation and is more
              labour-intensive to install. Typically buried at least 600mm deep.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <Cable className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-lg mb-2">Earth Tapes / Mats</h3>
            <p className="text-white text-sm leading-relaxed">
              Bare copper tape or strip buried horizontally in a trench. Suitable for areas with
              shallow soil over rock. The tape is laid in a trench at least 500mm deep and covered
              with low-resistivity backfill material. Provides good contact area in shallow soil
              conditions. Can be arranged in radial or ring configurations.
            </p>
          </div>
        </div>
        <p>
          In addition to purpose-built electrodes, BS 7671 also recognises the use of structural
          metalwork (such as building foundations), metallic water pipes (where the water company
          permits), and the lead sheath of underground cables as supplementary earth electrodes.
          However, these should not be relied upon as the sole means of earthing.
        </p>
      </>
    ),
  },
  {
    id: 'improving-resistance',
    heading: 'How to Improve Earth Electrode Resistance',
    content: (
      <>
        <p>
          If your earth electrode resistance measurement exceeds the acceptable limit for the
          installation, several methods are available to reduce it. The most effective approach
          depends on the specific cause of the high reading.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Methods to Reduce Earth Resistance</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Drive the rod deeper</strong> — the most
                effective single action. Each additional 1.2m section coupled onto the rod reduces
                resistance by approximately 30 to 40 percent as the rod reaches moister, more
                compacted soil layers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Use multiple rods in parallel</strong> — connect
                two or more rods together with a bare copper bonding conductor. Space the rods at
                least 2.5 times their driven depth apart. Two rods will reduce resistance to
                approximately 60% of a single rod value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Use earth enhancement compound</strong> —
                proprietary low-resistivity compounds (such as bentonite or Marconite) can be packed
                around the earth rod to reduce contact resistance. The compound absorbs and retains
                moisture, providing a consistent low-resistivity zone around the rod.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Relocate the electrode</strong> — if the soil at
                the current location is unsuitable (rock, gravel, building rubble), moving the
                electrode to an area with better soil conditions (garden soil, clay, near a water
                course) can significantly reduce resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Switch electrode type</strong> — if rods cannot
                be driven deep enough, switch to an earth plate or earth tape configuration that
                provides a larger surface area in the available soil depth.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Earth Rod Resistance Calculator"
          description="Elec-Mate's earth rod resistance calculator estimates the expected RA value based on soil type, rod dimensions, and number of rods. Use it before installation to plan your earthing strategy, and after installation to verify that measured values match expectations."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'testing-methods',
    heading: 'Earth Resistance Testing Methods',
    content: (
      <>
        <p>
          Earth electrode resistance is measured using specific test methods that determine the
          resistance of the electrode to the general mass of earth. The standard method is the
          fall-of-potential (3-point) method.
        </p>
        <p>
          For a detailed step-by-step procedure, see the{' '}
          <SEOInternalLink href="/guides/earth-electrode-test">
            earth electrode test guide
          </SEOInternalLink>
          . The key principles are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Fall-of-Potential Method</h3>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Disconnect the earth electrode</strong> from the installation earthing
              conductor (to ensure you are measuring only the electrode resistance, not the parallel
              path through the supply earth).
            </li>
            <li>
              <strong>Drive two temporary test spikes</strong> into the ground in a straight line
              from the electrode under test. The current spike (C) is placed at a distance of at
              least 10 times the electrode depth (typically 20 to 30 metres). The potential spike
              (P) is placed at 61.8% of the distance from the electrode to the current spike.
            </li>
            <li>
              <strong>Connect the instrument</strong> — connect the earth electrode to the E
              terminal, the potential spike to the P terminal, and the current spike to the C
              terminal.
            </li>
            <li>
              <strong>Take the reading</strong> — the instrument injects a test current and measures
              the voltage, calculating the resistance in ohms.
            </li>
            <li>
              <strong>Verify the reading</strong> — move the potential spike 10% closer and 10%
              further from the electrode and repeat the measurement. If all three readings are
              within 5% of each other, the result is valid. If not, increase the distance to the
              current spike and repeat.
            </li>
          </ol>
        </div>
        <p>
          Most modern{' '}
          <SEOInternalLink href="/guides/multifunction-tester-guide">
            multifunction testers
          </SEOInternalLink>{' '}
          include an earth electrode resistance function, and dedicated earth resistance testers are
          available from manufacturers such as Megger and Fluke. The instrument must comply with BS
          EN 61557-5.
        </p>
      </>
    ),
  },
  {
    id: 'recording-values',
    heading: 'Recording Earth Resistance Values',
    content: (
      <>
        <p>
          Earth electrode resistance values are recorded on the electrical installation certificate
          (EIC) or the electrical installation condition report (EICR) in the section for supply
          characteristics and earthing arrangements.
        </p>
        <p>For TT installations, the following information should be recorded:</p>
        <ul className="space-y-2 my-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">Earth electrode type (rod, plate, tape, etc.)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">Earth electrode location</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">Measured earth electrode resistance (RA) in ohms</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">RCD rating (IΔn) in mA</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span className="text-white">Confirmation that RA x IΔn does not exceed 50V</span>
          </li>
        </ul>
        <p>
          The <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> should also
          note any seasonal factors that may affect the reading. If the test was performed during a
          wet period, note that the reading may increase during dry weather and that periodic
          retesting during summer is recommended.
        </p>
        <SEOAppBridge
          title="Earth Resistance on Every Certificate"
          description="Elec-Mate captures RA values on all certificates for TT installations. The app automatically calculates RA x IΔn and validates the result against the 50V limit in BS 7671. Non-compliant values are flagged immediately with guidance on improving the earth electrode resistance."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HighEarthResistancePage() {
  return (
    <GuideTemplate
      title="High Earth Resistance | Causes and Solutions for UK Electricians"
      description="Complete guide to high earth resistance for UK electricians. Causes, soil conditions, electrode types (rods, plates, tapes), how to improve earth resistance, testing methods, and recording RA values on certificates. BS 7671 requirements for TT installations."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Essential Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          High Earth Resistance
          <br />
          <span className="text-yellow-400">Causes and Solutions</span>
        </>
      }
      heroSubtitle="High earth electrode resistance compromises protective device operation and increases touch voltages. This guide covers why high readings occur, how soil conditions affect resistance, electrode types, practical methods to reduce RA values, and how to record results on certificates."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Calculate and Validate Earth Resistance On Site"
      ctaSubheading="Elec-Mate includes an earth rod calculator, validates RA x IΔn against BS 7671, and captures earth resistance on every certificate. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
