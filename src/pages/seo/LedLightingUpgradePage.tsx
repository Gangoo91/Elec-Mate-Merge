import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Lightbulb,
  Zap,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'LED Lighting Upgrade', href: '/led-lighting-upgrade' },
];

const tocItems = [
  { id: 'why-upgrade', label: 'Why Upgrade to LED?' },
  { id: 'fluorescent-to-led', label: 'Fluorescent to LED Conversion' },
  { id: 'halogen-to-led', label: 'Halogen to LED Replacement' },
  { id: 'retrofit-vs-luminaire', label: 'Retrofit vs Luminaire Replacement' },
  { id: 'driver-transformer', label: 'Driver & Transformer Compatibility' },
  { id: 'dimmer-compatibility', label: 'Dimmer Compatibility' },
  { id: 'payback-calculation', label: 'Payback Calculation' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'LED lighting uses 70–80% less energy than equivalent fluorescent or halogen sources. A 58W T8 fluorescent tube is replaced by an 18–22W LED tube delivering comparable or better light output.',
  'T8 fluorescent-to-LED conversions offer three approaches: Type A (plug-and-play with existing ballast), Type B (ballast bypass, direct mains), and Type C (LED tube plus external LED driver). Type B and C offer the best long-term reliability.',
  'GU10 halogen lamps (typically 50W) are replaced by GU10 LEDs (typically 4.5–7W), achieving a 90% energy saving. No fitting modification is required for direct replacement, but dimmer compatibility must be checked.',
  'Low-voltage halogen systems (12V MR16 lamps) require the existing transformer to be replaced with an LED-compatible constant-voltage driver, or the entire luminaire must be replaced.',
  'LED payback periods in commercial premises are typically 1–3 years based on energy savings alone, with additional maintenance savings from the extended LED lifespan (typically 30,000–50,000 hours).',
];

const faqs = [
  {
    question: 'Can I replace fluorescent tubes with LED without rewiring?',
    answer:
      "Yes — Type A (plug-and-play) LED tubes are designed to work with existing magnetic or electronic ballasts without any rewiring. However, compatibility between the LED tube and the existing ballast must be verified against the manufacturer's compatibility list. Type A tubes are convenient but their performance depends on the ballast, which will eventually need replacing anyway. Type B (ballast bypass) LED tubes require a simple rewire to connect the tube holders directly to mains — this is the most reliable long-term solution and is the approach most professional electricians recommend.",
  },
  {
    question: 'How much energy does LED lighting save compared to fluorescent?',
    answer:
      'A standard 58W T8 fluorescent tube (including ballast losses) consumes approximately 67–70W. An equivalent LED tube typically consumes 18–22W, representing an energy saving of approximately 68–74%. For a typical 20-tube office running 10 hours per day, 250 days per year, switching to LED saves approximately 990–1,000 kWh per year. At a commercial electricity rate of 25p per kWh, this represents a saving of approximately £250 per year — before accounting for reduced maintenance costs from the longer LED lifespan.',
  },
  {
    question: 'Do I need planning permission or Part P notification to upgrade to LED?',
    answer:
      'Like-for-like lamp replacements (replacing a GU10 halogen with a GU10 LED, or a T8 fluorescent tube with a T8 LED) are not notifiable work and do not require planning permission. Replacing luminaires (the fittings themselves) in a domestic property on a new circuit, or adding new circuits, is notifiable under Building Regulations Part P. In commercial premises, any electrical work must comply with BS 7671 and may require Local Authority notification depending on the scope. An Electrical Installation Certificate or Minor Works Certificate should be issued for any work that involves circuit modification.',
  },
  {
    question: 'Will my existing dimmer work with LED lights?',
    answer:
      'Not necessarily. Most older dimmers (particularly leading-edge TRIAC dimmers designed for incandescent or halogen lamps) are not compatible with LED drivers. Incompatibility manifests as flickering, buzzing, failure to dim smoothly, or lamps switching off at low dim levels. LED-compatible dimmers (trailing-edge or MOSFET dimmers) must be specified. Equally important is the minimum load requirement — LED lamps have a very low wattage, and older dimmers have a minimum load (typically 40W or 60W) that may not be met by a small number of LED lamps.',
  },
  {
    question: 'What LED replacement is available for 12V MR16 halogen lamps?',
    answer:
      'MR16 LED lamps (GU5.3 base, 12V) are available as direct replacements, but the existing 12V transformer must be compatible with LED loads. Most magnetic transformers and many older electronic transformers are not suitable for LED MR16 lamps and must be replaced with an LED-compatible constant voltage driver rated for the total LED load. The simplest solution for 12V halogen replacement is often to replace the entire luminaire with a mains-voltage GU10 LED fitting, eliminating the transformer entirely.',
  },
  {
    question: 'How long do LED lamps last?',
    answer:
      'Quality LED lamps and luminaires have an L70 lifespan of 25,000–50,000 hours. L70 means the point at which lumen output has depreciated to 70% of initial output — which is the standard measure for LED life. At 10 hours per day (a typical commercial operation), 25,000 hours equates to approximately 6.8 years before replacement is needed. This compares to approximately 8,000–15,000 hours for T8 fluorescent tubes and just 1,000–2,000 hours for halogen lamps, meaning LED lamps require replacement 5–20 times less frequently.',
  },
  {
    question: 'What colour temperature should I specify for LED replacements?',
    answer:
      'Colour temperature (measured in Kelvin) significantly affects the perceived quality of light. For offices and retail, 4,000K (cool white) is the most common specification — it replicates the cool, neutral light of the fluorescent tubes being replaced and promotes alertness. For hospitality, residential, and areas requiring a warm ambience, 2,700–3,000K (warm white) is more appropriate. For industrial and task areas where colour accuracy is important, specify LEDs with a Colour Rendering Index (CRI) of 80 or above.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/external-lighting-installation',
    title: 'External Lighting Installation',
    description: 'Outdoor lighting — cable requirements, IP ratings, RCD protection, and controls.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/emergency-lighting-installation',
    title: 'Emergency Lighting Installation',
    description: 'BS 5266 emergency lighting design requirements and certification.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'Electrical Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the IET Wiring Regulations 18th Edition.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-upgrade',
    heading: 'Why Upgrade to LED Lighting?',
    content: (
      <>
        <p>
          LED (Light Emitting Diode) lighting has transformed the economics of artificial lighting.
          Modern LED technology delivers equivalent or superior light output to fluorescent,
          halogen, and high-intensity discharge sources at a fraction of the energy consumption. For
          electricians, LED upgrade projects represent a consistently strong revenue stream with
          clear, calculable client benefits.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy saving of 70–80%</strong> — replacing a 58W T8 fluorescent tube
                (67–70W including ballast losses) with an 18–22W LED tube saves approximately 68–74%
                of the lighting energy consumption. For a commercial premises with significant
                lighting loads, this translates to thousands of pounds in annual electricity
                savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extended lifespan</strong> — quality LED lamps last 25,000–50,000 hours
                (L70), compared to 8,000–15,000 hours for fluorescent tubes and just 1,000–2,000
                hours for halogen lamps. Reduced maintenance and lamp replacement costs are a
                significant secondary benefit, particularly for difficult-to-access fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instant-on operation</strong> — LED lamps reach full brightness immediately
                with no warm-up period. This is a significant advantage over metal halide and some
                fluorescent sources, and makes LED ideal for areas with frequent switching such as
                corridors, storerooms, and toilets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No UV or infra-red</strong> — LEDs produce minimal UV radiation and very
                little heat in the beam direction (heat is generated at the driver, not the lamp).
                This makes them suitable for displays, artwork, food retail, and heat-sensitive
                applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fluorescent-to-led',
    heading: 'T8 Fluorescent to LED Conversion',
    content: (
      <>
        <p>
          T8 fluorescent tubes (26mm diameter, 600mm, 1200mm, or 1500mm length, G13 bi-pin base) are
          the most common commercial and industrial light source being upgraded to LED. Three
          conversion approaches are available, each with different installation requirements and
          performance characteristics.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A — plug-and-play (ballast compatible)</strong> — the LED tube works
                with the existing magnetic or electronic ballast. No rewiring is required. The tube
                simply replaces the existing fluorescent. Limitations: performance depends on
                ballast quality; the ballast continues to consume energy and will eventually fail;
                compatibility must be verified for each specific ballast/tube combination. Suitable
                for temporary or low-priority upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B — ballast bypass (direct mains)</strong> — the ballast and starter
                are removed, and the tube holders are rewired to connect directly to the mains
                supply. The LED tube contains its own driver. This is the most reliable and
                efficient long-term solution — no ballast losses, no ballast failure, and consistent
                performance throughout the LED lifespan. The preferred approach for most
                professional installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type C — LED tube plus external driver</strong> — a dedicated LED driver
                replaces the existing ballast and powers the LED tube via the existing tube holders.
                This approach is used where the luminaire housing is retained but a high-quality,
                separately replaceable driver is required. Common in specification-grade commercial
                installations. The driver is field-replaceable, which can extend luminaire life
                beyond the LED module lifespan.
              </span>
            </li>
          </ul>
        </div>
        <p>
          T5 fluorescent tubes (16mm diameter, typically 549mm or 1149mm) require a different LED
          replacement (T5 LED tubes or new luminaires) as they are not interchangeable with T8
          products. T5 fixtures often use electronic high-frequency ballasts; Type C conversions
          with an LED driver are usually the most practical approach.
        </p>
      </>
    ),
  },
  {
    id: 'halogen-to-led',
    heading: 'Halogen to LED Replacement',
    content: (
      <>
        <p>
          Halogen lamps — including GU10 mains voltage spotlights, GU5.3 (MR16) 12V low-voltage
          spotlights, and R7s linear halogens — have been progressively phased out of sale in the UK
          and EU. LED replacements are available for all common halogen types, though some require
          additional changes beyond simple lamp replacement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GU10 (mains voltage, 240V)</strong> — the simplest halogen replacement. A
                50W GU10 halogen is replaced by a 4.5–7W GU10 LED, achieving approximately 90%
                energy saving. The LED fits directly into the existing downlight fitting without
                modification. Check lumens (not watts): a quality GU10 LED rated 350–450lm at 5W
                replaces a 50W halogen rated 400–500lm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GU5.3 / MR16 (12V, low voltage)</strong> — LED MR16 lamps are available but
                the 12V transformer in the existing fitting must be compatible with LED loads. Most
                magnetic transformers and many older electronic transformers are not compatible and
                must be replaced with an LED constant voltage driver. The simplest solution is often
                to replace the entire fitting with a mains-voltage GU10 LED downlight, eliminating
                the transformer entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>R7s linear halogen</strong> — common in floodlights and some architectural
                fittings. LED R7s replacements are available (typically 10–20W replacing 100–150W
                halogen), but heat dissipation in an enclosed fitting can reduce LED lifespan.
                Verify that the luminaire is suitable for LED R7s lamps before fitting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'retrofit-vs-luminaire',
    heading: 'Retrofit Lamp vs Luminaire Replacement',
    content: (
      <>
        <p>
          LED upgrades can be achieved either by retrofitting LED lamps into existing luminaires or
          by replacing the entire luminaire with a purpose-built LED fitting. Each approach has
          advantages and limitations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit lamp advantages</strong> — lower upfront cost; no ceiling patching
                or redecoration required; faster installation (particularly for large numbers of
                fittings); retains existing luminaire aesthetic. Best suited to newer fittings in
                good condition where the housing is worth retaining.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire replacement advantages</strong> — purpose-built LED luminaires
                deliver optimal thermal management and driver quality, maximising LED lifespan. They
                typically offer better optical efficiency (more useful lumens per watt) than
                retrofit lamps in legacy housings. Modern LED panels, troffers, and surface-mount
                fittings are also substantially lighter and thinner than fluorescent equivalents.
                Best suited to large-scale commercial refurbishments where ceiling access is
                available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key consideration</strong> — verify that any retrofit lamp is listed on the
                luminaire manufacturer's approved lamp list, particularly for fire-rated downlights.
                Fitting an unapproved LED lamp into a fire-rated downlight may void the fire rating,
                which has significant building regulations and insurance implications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'driver-transformer',
    heading: 'Driver & Transformer Compatibility',
    content: (
      <>
        <p>
          LED drivers and transformers are a critical and often misunderstood aspect of LED
          upgrades. Unlike fluorescent ballasts, which can sometimes be reused with Type A LED
          tubes, transformers for 12V halogen systems must be replaced when upgrading to LED MR16
          lamps.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Magnetic transformers</strong> — not compatible with LED MR16 lamps. The
                minimum load requirement of a magnetic transformer (typically 20–60W) cannot be met
                by low-wattage LED lamps (typically 5–7W each). The transformer must be replaced
                with an LED-compatible constant voltage 12V driver.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic transformers</strong> — compatibility varies by manufacturer and
                model. Some electronic transformers work with LED MR16 lamps; many do not. Symptoms
                of incompatibility include flickering, buzzing, or failure to illuminate. Always
                test with a single lamp before committing to a full upgrade. Where in doubt, replace
                with an LED driver.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED drivers</strong> — constant voltage 12V DC drivers are the correct
                replacement for halogen transformers. Size the driver based on the total LED load
                plus a 20% headroom margin. For example, 6 × 5W MR16 LEDs = 30W load; specify a 36W
                minimum driver. Quality drivers from Meanwell, Tridonic, or Inventronics are
                recommended for long-term reliability.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dimmer-compatibility',
    heading: 'Dimmer Compatibility with LED Lighting',
    content: (
      <>
        <p>
          Dimmer compatibility is one of the most common problems encountered in LED upgrade
          projects. The electrical characteristics of LED drivers differ significantly from
          incandescent and halogen lamps, making most older dimmers incompatible.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leading-edge dimmers</strong> — the most common type in UK homes. Designed
                for resistive (incandescent) and inductive (halogen transformer) loads. Generally
                not compatible with LED lamps. Symptoms of incompatibility: flickering at low dim
                levels, buzzing (in the lamp, driver, or dimmer), inability to dim below a certain
                level, or complete failure to operate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trailing-edge (MOSFET) dimmers</strong> — the correct type for LED lamps.
                Trailing-edge dimmers have a very low minimum load (often 0W for modern versions)
                and provide a smooth, flicker-free dim curve with quality LED drivers. When
                upgrading to LED in a dimmed circuit, always recommend trailing-edge dimmer
                replacement alongside the lamp upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum load</strong> — even LED-compatible dimmers have a minimum load
                requirement. If the total LED wattage falls below this threshold (e.g., 2 × 5W GU10
                LEDs = 10W on a dimmer requiring 25W minimum), the circuit may not function
                correctly. Add more LED lamps to the circuit or specify a dimmer with a lower
                minimum load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the compatibility list</strong> — both Lutron and Varilight publish
                compatibility lists pairing their dimmers with specific LED lamp brands. Always
                verify compatibility before installing. Where compatibility is uncertain, conduct a
                site test with representative equipment before ordering the full upgrade.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payback-calculation',
    heading: 'LED Upgrade Payback Calculation',
    content: (
      <>
        <p>
          A clear payback calculation is the most persuasive tool when presenting an LED upgrade to
          a commercial client. The calculation combines energy savings, maintenance savings, and
          installation cost to give a simple payback period.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example: 40-tube office</strong> — existing 58W T8 fluorescent (67W each
                including ballast) × 40 tubes = 2,680W total load. LED replacement (20W each) × 40 =
                800W. Energy saving = 1,880W = 1.88kW. Running 10 hours/day, 250 days/year = 4,700
                kWh/year saved. At 25p/kWh = £1,175/year energy saving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance saving</strong> — fluorescent tubes replaced every 5 years on
                average at £3–5 per tube plus labour: 40 tubes × £8 all-in = £320 every 5 years =
                £64/year. LED tubes (30,000+ hour lifespan) will not require replacement for 12
                years at the same usage. Maintenance saving approximately £64/year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total annual saving</strong> — £1,175 + £64 = £1,239/year. Installation cost
                (Type B bypass conversion): 40 fittings × £25 per fitting all-in = £1,000. Payback
                period: £1,000 ÷ £1,239 = 0.8 years. This is a typical result for a straightforward
                commercial fluorescent upgrade — under 12 months payback.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical LED Upgrade Costs (2026)',
    content: (
      <>
        <p>
          LED upgrade costs vary by lamp type, access difficulty, circuit complexity, and whether
          dimmers or controls require replacement. The following ranges are typical for a
          professional UK electrical contractor in 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GU10 halogen to LED (domestic downlight)</strong> — £10–£20 per fitting
                including the LED lamp. No wiring changes required for direct GU10 replacement. A
                typical 8-downlight kitchen or living room: £80–£160.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MR16 halogen to LED including transformer replacement</strong> — £25–£50 per
                fitting including LED lamp and LED-compatible driver. A 6-lamp bathroom or kitchen
                spotlight circuit: £150–£300.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>T8 fluorescent to LED (Type B bypass)</strong> — £15–£30 per tube including
                labour for rewiring the fitting. Commercial 2-tube batten fitting: £30–£60. Large
                industrial bay with 4-tube fitting: £60–£100 per fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED panel replacement (600×600 recessed)</strong> — £50–£120 per fitting
                supply and install including new LED panel and driver. Replaces a 4-tube recessed
                fluorescent module. High-bay LED replacement (industrial, replacing metal halide):
                £120–£300 per fitting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: LED Upgrade Projects',
    content: (
      <>
        <p>
          LED upgrades are excellent commercial work — straightforward to price, quick to complete,
          and easy to justify to clients with a payback calculation. Electricians who systematically
          survey their commercial client base and present LED upgrade proposals can generate
          significant recurring revenue.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to generate a professional LED upgrade quote on site, including energy saving
                  calculations. Issue a{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  on completion. The whole process — from site survey to signed quote to certificate
                  — without leaving the premises.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">LED Upgrade as a Loss Leader</h4>
                <p className="text-white text-sm leading-relaxed">
                  LED survey visits open conversations about the wider electrical installation.
                  Older fluorescent fittings are often found in premises with ageing wiring,
                  inadequate RCD protection, and overdue{' '}
                  <SEOInternalLink href="/guides/eicr-for-landlords">EICRs</SEOInternalLink>. The
                  LED upgrade visit is an opportunity to identify and quote additional essential
                  work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote LED upgrades and issue certificates with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to quote jobs, issue electrical certificates, and manage their business on site. LED upgrade quotes with energy saving calculations, Minor Works Certificates, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LedLightingUpgradePage() {
  return (
    <GuideTemplate
      title="LED Lighting Upgrade UK | Replacing Fluorescent & Halogen Lights"
      description="Complete guide to LED lighting upgrades in the UK. T8 fluorescent to LED (Type A/B/C), GU10 halogen replacement, MR16 transformer compatibility, dimmer compatibility, payback calculations, and typical costs from £10–£120 per fitting."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Upgrade Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          LED Lighting Upgrade UK:{' '}
          <span className="text-yellow-400">Replacing Fluorescent & Halogen Lights</span>
        </>
      }
      heroSubtitle="Everything electricians and building managers need to know about upgrading to LED — T8 fluorescent conversion options, halogen replacement, driver compatibility, dimmer issues, payback calculations, and typical 2026 costs."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About LED Lighting Upgrades"
      relatedPages={relatedPages}
      ctaHeading="Quote LED Upgrades and Issue Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to quote LED upgrade projects with energy saving calculations and issue Minor Works Certificates on site. 7-day free trial, cancel anytime."
    />
  );
}
