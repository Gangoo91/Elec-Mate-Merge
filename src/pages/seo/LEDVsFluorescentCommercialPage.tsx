import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  FileCheck2,
  ShieldCheck,
  Lightbulb,
  Wrench,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'LED vs Fluorescent Lighting', href: '/guides/led-vs-fluorescent-commercial-lighting' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'efficiency', label: 'Efficiency and Energy Savings' },
  { id: 'maintenance', label: 'Maintenance and Lifespan' },
  { id: 'dimming-controls', label: 'Dimming and Controls' },
  { id: 'power-factor', label: 'Power Factor and Harmonics' },
  { id: 'replacement-options', label: 'Replacement Options for Fluorescent Fittings' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'LED (light-emitting diode) luminaires are 50–80% more energy-efficient than T8 fluorescent tubes. A 20W LED linear luminaire typically replaces a 58W T8 fluorescent fitting — the same lumen output for one-third of the energy.',
  'Commercial fluorescent lamps (T8, T5) have an average rated life of 10,000–16,000 hours. High-quality LED luminaires are rated at 50,000+ hours — reducing lamp replacement labour and materials costs significantly.',
  'LED luminaires are compatible with a wider range of dimming controls than fluorescent. Fluorescent dimming requires DALI or 0-10V ballasts, and dimming below 10% causes flicker and instability. LEDs can dim smoothly to 1% with compatible drivers.',
  'Fluorescent lamps contain mercury — they are classified as hazardous waste and must be disposed of under the Waste Electrical and Electronic Equipment (WEEE) Directive. LED luminaires do not contain mercury.',
  'For commercial LED retrofit projects, electricians must verify the existing circuit wiring and protection can support the changed load characteristics — particularly regarding power factor and harmonic distortion from LED drivers.',
];

const faqs = [
  {
    question: 'What is the energy saving of LED compared to fluorescent lighting?',
    answer:
      'The energy saving depends on the specific lamp types being compared. For the most common commercial comparison — T8 fluorescent (58W including ballast losses) replaced by LED linear (20W): the saving is 38W per fitting, or 66%. For T5 fluorescent (28W or 35W including high-frequency ballast) replaced by LED: the saving is typically 40–55%. For high-bay metal halide (400W) replaced by LED high-bay (150W): saving of 250W per fitting, or 62.5%. At a commercial electricity rate of 25p/kWh, a 38W saving per fitting operating 12 hours per day saves £42 per year per fitting. A warehouse with 100 fittings saves £4,200 per year in electricity alone — typically a 1–3 year payback on the capital cost of the LED upgrade.',
  },
  {
    question: 'What happens to existing wiring when replacing fluorescent fittings with LED?',
    answer:
      'The existing wiring can usually be retained for LED retrofit projects, but several checks are required. First, verify the wiring is suitable for the circuit — the change from high-power fluorescent to low-power LED does not typically affect cable sizing (the load has reduced), but the circuit may now have many more fittings per MCB if the load has dropped significantly, which could create issues if circuits are extended. Second, check the MCB rating — a 32A circuit with 20 × 58W fittings (total 1,160W) could have additional fittings added if the MCB is now heavily underloaded. This is generally acceptable but must be assessed. Third, assess the wiring condition — if the wiring is old (pre-1970s rubber-insulated), the LED retrofit is an opportunity to identify wiring that needs replacement.',
  },
  {
    question: 'Can fluorescent ballasts be reused with LED tubes?',
    answer:
      'Whether fluorescent ballasts can be reused depends on the type of LED replacement tube. LED tubes are available in three types: Type A (ballast-compatible) — the LED tube works with the existing electronic ballast, no rewiring needed; Type B (bypass/direct wire) — the ballast is bypassed and the LED tube is wired directly to mains voltage; Type C (with external driver) — the ballast is removed and replaced with a dedicated LED driver unit. Type A is the easiest to install but relies on compatibility between the LED tube and the specific ballast brand and wattage. Type B requires rewiring but eliminates ballast compatibility issues. Type C provides the best performance and control but is more labour-intensive. For commercial projects, Type B or C is recommended for reliability.',
  },
  {
    question: 'Do LED luminaires require RCD protection in commercial installations?',
    answer:
      'LED luminaire circuits in commercial installations should be RCD protected in accordance with BS 7671 requirements for the specific location. In domestic installations, Regulation 411.3.4 requires 30mA RCD protection for all circuits. In commercial installations, the requirement for RCD protection depends on the circuit type, location, and whether it meets the conditions of Regulation 411.3.3 (where disconnection by an overcurrent device alone is adequate). For circuits in locations where automatic disconnection using an overcurrent device alone cannot achieve the required disconnection time, or for circuits in bathrooms, swimming pools, temporary electrical installations, and construction sites, 30mA RCD protection is required. For general commercial lighting circuits with adequate Zs for MCB disconnection within 5 seconds (non-residential), RCD protection is not mandatory but is strongly recommended as best practice.',
  },
  {
    question: 'What is the correct disposal method for fluorescent lamps being replaced?',
    answer:
      'Fluorescent lamps (T8 and T5 tubes, compact fluorescent lamps) contain mercury and are classified as hazardous waste under the Waste Electrical and Electronic Equipment (WEEE) Regulations 2013. They must not be disposed of in general waste. Correct disposal routes include: returning to a licensed fluorescent lamp recycler (large volumes); depositing at a local authority household hazardous waste facility (small volumes); returning to an electrical wholesaler participating in a take-back scheme. During commercial LED upgrade projects, the electrician is responsible for ensuring the removed fluorescent lamps are disposed of correctly. Provide the client with a waste transfer note (WTN) if you are removing and disposing of significant quantities of fluorescent lamps. Failure to dispose of fluorescent lamps correctly is an offence under the Environmental Protection Act 1990.',
  },
  {
    question: 'What is DALI lighting control and is it compatible with LED?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is a standardised digital communication protocol for lighting control, defined by IEC 62386. DALI allows individual luminaires (or groups of luminaires) to be addressed, dimmed, switched, and monitored independently over a two-wire bus. DALI is compatible with LED luminaires fitted with DALI-compatible drivers (Type D, as defined by IEC 62386 Part 207 for LED modules). DALI provides smooth, flicker-free dimming across the full range (typically 0.1% to 100%), fault reporting (lamp failure, driver failure, power failure), and scene memory. For commercial LED upgrade projects where the existing installation has DALI control, specify DALI-compatible LED drivers (IEC 62386-207 compliant) to maintain full control system functionality. DALI is the preferred control protocol for commercial LED installations in offices, schools, healthcare facilities, and retail environments.',
  },
  {
    question: 'How does power factor affect LED commercial installations?',
    answer:
      'LED luminaires use switch-mode power supply drivers that can have poor power factor (PF) if not designed carefully. Standard residential LED lamps may have PF as low as 0.5 — meaning they draw twice the current from the supply for the same real power as a unity PF load. For commercial installations, this has two consequences: (1) The supply current (and therefore cable sizing requirements) must be based on apparent power (VA), not real power (W). A 1,000W LED installation with PF of 0.5 draws 2,000VA from the supply — equivalent to a 2,000W resistive load in terms of cable sizing. (2) Low PF causes reactive current that increases distribution losses and may attract reactive power charges from the energy supplier for larger installations. Specify LED luminaires with a power factor of 0.9 or above for commercial installations. High-quality commercial LED luminaires and drivers typically achieve PF &gt;0.95.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for LED lighting circuits using actual VA load including power factor.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC and Minor Works certificates for commercial LED retrofit projects.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A3:2024 including lighting circuit requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study lighting circuit testing and inspection for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'LED vs Fluorescent Commercial Lighting: A Technical Comparison',
    content: (
      <>
        <p>
          Commercial fluorescent lighting — T8 and T5 tubes, high-bay metal halide, and
          compact fluorescent — is being rapidly replaced by LED. The energy savings are
          substantial: LED luminaires typically use 50–70% less energy than the fluorescent
          fittings they replace, and their lifespan is three to five times longer.
        </p>
        <p>
          For UK electricians, commercial LED retrofit projects are a significant and growing
          revenue stream. However, they require an understanding of the technical differences
          between LED and fluorescent technologies — particularly regarding driver compatibility,
          power factor, dimming controls, and the disposal of mercury-containing fluorescent
          lamps. This guide covers everything needed to design, install, and certify a commercial
          LED upgrade under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'efficiency',
    heading: 'Efficiency and Energy Savings: LED vs Fluorescent',
    content: (
      <>
        <p>
          The efficiency of a light source is measured in lumens per watt (lm/W) — how much
          visible light output is produced per watt of electrical input. Higher is better.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 font-bold">Light Source</th>
                <th className="text-left py-2 pr-4 font-bold">Typical Efficacy</th>
                <th className="text-left py-2 font-bold">Power (per fitting)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">T8 Fluorescent (inc. ballast)</td>
                <td className="py-2 pr-4">55–75 lm/W</td>
                <td className="py-2">58W (36W tube + losses)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">T5 Fluorescent (HF ballast)</td>
                <td className="py-2 pr-4">85–100 lm/W</td>
                <td className="py-2">28–35W</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Metal Halide High-Bay</td>
                <td className="py-2 pr-4">70–100 lm/W</td>
                <td className="py-2">400W</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">LED Linear (T8 replacement)</td>
                <td className="py-2 pr-4">100–160 lm/W</td>
                <td className="py-2">15–22W</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">LED High-Bay</td>
                <td className="py-2 pr-4">120–180 lm/W</td>
                <td className="py-2">100–200W</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The energy saving from T8 fluorescent to LED linear is typically 60–70% per fitting.
          At 25p/kWh commercial electricity rate and 4,000 operating hours per year, a 38W
          saving per fitting equates to £38 per fitting per year in electricity savings.
        </p>
        <SEOAppBridge
          title="Calculate LED upgrade savings and payback with AI"
          description="Elec-Mate's AI can calculate the energy savings, carbon reduction, and financial payback period for a commercial LED lighting upgrade. Help clients make the business case for LED installation."
          icon={Lightbulb}
        />
      </>
    ),
  },
  {
    id: 'maintenance',
    heading: 'Maintenance and Lifespan: LED vs Fluorescent',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Fluorescent Maintenance</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• T8 lamp life: 10,000–16,000 hours</li>
              <li>• Ballast life: 15,000–20,000 hours</li>
              <li>• Lamp replacement: every 2–3 years (typical commercial)</li>
              <li>• Contains mercury — WEEE hazardous waste disposal required</li>
              <li>• Flicker increases as lamps age — can cause complaints</li>
              <li>• Warm-up time: 1–3 minutes for full output</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">LED Maintenance</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>• LED module life: 50,000+ hours (L70 rating)</li>
              <li>• Driver life: 30,000–50,000 hours</li>
              <li>• Replacement interval: 8–12 years (typical commercial)</li>
              <li>• No mercury — standard WEEE disposal</li>
              <li>• No flicker degradation over life</li>
              <li>• Instant-on: full output immediately</li>
            </ul>
          </div>
        </div>
        <p>
          The L70 rating of an LED luminaire indicates the hours at which the lumen output has
          degraded to 70% of the initial value. At 50,000 hours (L70), the luminaire is still
          producing 70% of its original light output — still adequate for most applications.
          Specify LED luminaires with L70 &gt;50,000 hours for commercial applications.
        </p>
      </>
    ),
  },
  {
    id: 'dimming-controls',
    heading: 'Dimming and Controls: LED vs Fluorescent',
    content: (
      <>
        <p>
          LED luminaires offer superior dimming performance compared to fluorescent. Fluorescent
          dimming requires high-frequency dimmable ballasts (DALI or 1-10V/0-10V) and typically
          cannot dim below 10% without instability. LED can dim smoothly to 1% or below with
          compatible drivers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI (IEC 62386):</strong> Digital addressable protocol. Each luminaire
                has an individual DALI address — can be controlled, dimmed, and monitored
                individually. Fault reporting built in. Best choice for office, healthcare, and
                educational facilities. Compatible with Building Management Systems (BMS).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>0-10V / 1-10V:</strong> Analogue dimming signal from 0V (off/minimum)
                to 10V (full output). Simple wiring, low cost, compatible with most dimming
                controllers. Cannot address individual luminaires. Suitable for zones, not
                individual control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase-cut dimming (leading or trailing edge):</strong> Standard
                dimmer switch compatible. Trailing edge (electronic) dimmers work best with
                LED drivers. Leading edge (TRIAC) dimmers can cause flicker or hum with some
                LED drivers — always check driver compatibility with the specific dimmer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-factor',
    heading: 'Power Factor and Harmonics in LED Installations',
    content: (
      <>
        <p>
          LED drivers are switching power supplies that can introduce power factor issues and
          harmonic distortion into the supply network. For commercial installations:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">Commercial LED Specification Requirements</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Power factor: specify PF &gt;0.9 for all luminaires above 25W</li>
                <li>• Total harmonic distortion (THD): specify THD &lt;20% for commercial applications</li>
                <li>• Size cables based on apparent power (VA), not real power (W): VA = W ÷ PF</li>
                <li>• For large LED installations (&gt;50kW), consider harmonic analysis and power factor correction</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          with the actual VA load (apparent power, including the effect of power factor) when
          sizing cable for commercial LED lighting circuits. A 2,000W LED installation with
          PF 0.9 draws 2,222VA — size the cable for 2,222VA, not 2,000W.
        </p>
      </>
    ),
  },
  {
    id: 'replacement-options',
    heading: 'Replacement Options for Fluorescent Fittings',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Option 1: LED Tube (Type A — Ballast Compatible)</h3>
            <p className="text-white text-sm">Replace fluorescent tube only. Existing ballast remains. Quick installation, minimal labour. Risk: ballast compatibility must be verified. Ballast still consumes power and will eventually fail.</p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Option 2: LED Tube (Type B — Ballast Bypass)</h3>
            <p className="text-white text-sm">Ballast is bypassed; LED tube wired directly to mains. Eliminates ballast losses and compatibility issues. Requires rewiring of the fitting. Best long-term reliability. Must label fitting as mains voltage.</p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Option 3: Full LED Luminaire Replacement</h3>
            <p className="text-white text-sm">Replace the entire fitting with a new LED luminaire. Higher capital cost but best performance, controls compatibility, and warranty. Recommended for large commercial projects and installations with DALI or BMS control.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards for Commercial LED Lighting',
    content: (
      <>
        <p>
          Commercial LED lighting installations must comply with several regulations and
          standards:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>BS 7671:2018+A3:2024</strong> — governs the electrical installation. Lighting circuits must comply with all relevant sections including overcurrent protection, RCD requirements, and inspection and testing requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Building Regulations Part L</strong> — energy efficiency requirements for lighting in commercial buildings. Minimum efficacy thresholds for installed luminaires. LED luminaires typically exceed these requirements easily.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>CIBSE SLL Code for Lighting</strong> — guidance on maintained illuminance levels for different task areas. Lux levels must be maintained throughout the luminaire service life (accounting for L70 degradation).</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>WEEE Regulations 2013</strong> — fluorescent lamps and LED luminaires are WEEE. Mercury-containing fluorescent lamps are hazardous WEEE and must be disposed of separately from other WEEE.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Commercial LED Projects',
    content: (
      <>
        <p>
          Commercial LED retrofit projects typically range from £5,000 (small office) to
          £200,000+ (large warehouse or factory). Electricians who can design, supply, install,
          and certify LED upgrades — including energy savings calculations, proper power factor
          analysis, and WEEE disposal — can command premium margins over those who only install.
        </p>
        <SEOAppBridge
          title="Quote and certify commercial LED projects on your phone"
          description="Elec-Mate's quoting app generates professional LED upgrade proposals with energy savings calculations. The EIC and Minor Works certificate apps handle the certification after installation. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LEDVsFluorescentCommercialPage() {
  return (
    <GuideTemplate
      title="LED vs Fluorescent Commercial Lighting | UK Electrician's Guide"
      description="Complete guide to LED vs fluorescent commercial lighting for UK electricians. Energy savings (50–70%), lifespan comparisons, dimming and DALI controls, power factor, and replacing T8 fluorescent with LED — including WEEE disposal requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Lighting Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          LED vs Fluorescent Commercial Lighting:{' '}
          <span className="text-yellow-400">Energy Savings, Controls and Installation Guide</span>
        </>
      }
      heroSubtitle="LED luminaires use 50–70% less energy than the fluorescent fittings they replace, last three to five times longer, and eliminate mercury-containing lamps. This guide covers the technical differences, replacement options, dimming controls, power factor, and the regulations that apply to commercial LED projects."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: LED vs Fluorescent Lighting"
      relatedPages={relatedPages}
      ctaHeading="Quote, Install and Certify Commercial LED Projects"
      ctaSubheading="Elec-Mate helps UK electricians win and deliver commercial LED upgrade projects — from energy saving proposals to on-site EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
