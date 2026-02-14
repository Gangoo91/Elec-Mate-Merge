import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Lightbulb,
  CheckCircle2,
  Zap,
  Calculator,
  AlertTriangle,
  FileText,
  Cable,
  Brain,
  ShieldCheck,
  Gauge,
  Palette,
  Sun,
} from 'lucide-react';

export default function LEDLightingGuidePage() {
  return (
    <GuideTemplate
      title="LED Lighting Guide | Choosing, Installing & Dimming"
      description="Complete guide to LED lighting for electricians and homeowners. Covers LED technology, colour temperature, lumens vs watts, dimmable drivers, transformer compatibility, common dimming problems, and installation best practice for domestic and commercial projects."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Installation', href: '/guides' },
        { label: 'LED Lighting', href: '/guides/led-lighting-guide' },
      ]}
      tocItems={[
        { id: 'led-technology', label: 'How LEDs Work' },
        { id: 'colour-temperature', label: 'Colour Temperature Explained' },
        { id: 'lumens-vs-watts', label: 'Lumens vs Watts' },
        { id: 'dimmable-leds', label: 'Dimmable LEDs & Drivers' },
        { id: 'transformer-compatibility', label: 'Transformer Compatibility' },
        { id: 'common-problems', label: 'Common LED Problems' },
        { id: 'installation-best-practice', label: 'Installation Best Practice' },
        { id: 'commercial-led', label: 'Commercial LED Installations' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          LED Lighting Guide
          <br />
          <span className="text-yellow-400">Choosing, Installing & Dimming</span>
        </>
      }
      heroSubtitle="LED lighting has transformed the electrical industry, but it has also introduced new challenges — dimming compatibility, driver selection, colour temperature consistency, and transformer loading. This guide covers everything an electrician needs to know about LED technology, from selecting the right lamp to troubleshooting flickering and buzzing."
      readingTime={14}
      keyTakeaways={[
        'LEDs produce light through electroluminescence in a semiconductor, consuming 80-90% less energy than incandescent lamps and lasting 25,000-50,000 hours compared to 1,000 hours for a traditional bulb.',
        'Colour temperature is measured in Kelvin (K) — 2700K is warm white (similar to incandescent), 4000K is cool white (office/commercial), and 6500K is daylight. Consistency across fittings in the same room is critical.',
        'Lumens measure brightness, not watts. A 60W incandescent equivalent is approximately 800 lumens. Always specify by lumens, not by the old wattage equivalent.',
        'Not all LEDs are dimmable, and not all dimmers work with LEDs. Leading-edge dimmers (designed for incandescent loads) often cause flickering, buzzing, or limited dimming range with LEDs. Use trailing-edge dimmers rated for LED loads.',
        'When replacing halogen transformers with LED drivers, the transformer minimum load requirement is critical. Most electronic transformers need a minimum load of 20-50W, but a few LED downlights may only draw 15-30W total — below the transformer minimum.',
      ]}
      sections={[
        {
          id: 'led-technology',
          heading: 'How LEDs Work',
          content: (
            <>
              <p>
                An LED (Light Emitting Diode) is a semiconductor device that produces light when an
                electric current passes through it. Unlike incandescent lamps that heat a filament
                until it glows, or fluorescent lamps that excite a phosphor coating with ultraviolet
                radiation from a gas discharge, LEDs generate light through electroluminescence —
                the emission of photons when electrons recombine with holes in the semiconductor
                material.
              </p>
              <p>
                This fundamental difference in light generation is why LEDs are so efficient. An
                incandescent lamp converts roughly 5% of its electrical input into visible light,
                with the remaining 95% lost as heat. A modern LED converts 40-50% of its input into
                visible light. This efficiency advantage translates directly into lower running
                costs, reduced heat output, and smaller cable sizes for lighting circuits.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  LED vs Traditional Lamp Comparison
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Incandescent</h4>
                      <p className="text-white text-sm">60W for 800 lumens</p>
                    </div>
                    <span className="font-bold text-white text-lg">1,000 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Halogen</h4>
                      <p className="text-white text-sm">42W for 800 lumens</p>
                    </div>
                    <span className="font-bold text-white text-lg">2,000 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">CFL</h4>
                      <p className="text-white text-sm">14W for 800 lumens</p>
                    </div>
                    <span className="font-bold text-white text-lg">8,000 hrs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">LED</h4>
                      <p className="text-white text-sm">8-10W for 800 lumens</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">25,000+ hrs</span>
                  </div>
                </div>
              </div>
              <p>
                For electricians, the shift to LED has practical implications. Lighting circuits now
                draw significantly less current — a typical domestic lighting circuit with 10 LED
                downlights might draw only 50-70W total, compared to 500-600W with the halogen
                equivalents. This affects transformer sizing, dimmer compatibility, and even earth
                fault loop impedance readings during testing.
              </p>
            </>
          ),
        },
        {
          id: 'colour-temperature',
          heading: 'Colour Temperature Explained',
          content: (
            <>
              <p>
                Colour temperature describes the appearance of the white light produced by a lamp,
                measured in Kelvin (K). It does not describe the brightness — a 2700K lamp and a
                6500K lamp can both be equally bright, but they produce very different shades of
                white light.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Warm White (2700K - 3000K)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Similar to the warm, yellowish light of a traditional incandescent bulb. This is
                    the standard choice for living rooms, bedrooms, dining rooms, and any space
                    where a cosy, inviting atmosphere is desired. 2700K is the closest match to a
                    60W incandescent. Most domestic LED lamps sold in the UK default to 2700K or
                    3000K.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Cool White (4000K - 4500K)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A neutral, clean white light commonly used in kitchens, bathrooms, garages,
                    offices, and commercial spaces. 4000K provides good colour rendering for task
                    lighting without the harshness of daylight-equivalent lamps. This is the default
                    for most commercial LED panels and battens.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Daylight (5000K - 6500K)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    A bright, bluish-white light that simulates natural daylight. Used in workshops,
                    inspection areas, retail displays, and any application where accurate colour
                    rendering is essential. Not generally recommended for domestic living spaces as
                    it can feel cold and clinical, but increasingly popular in home offices.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                Consistency of colour temperature across all fittings in the same space is
                essential. Mixing 2700K and 4000K lamps in the same room is immediately noticeable
                and looks unprofessional. When specifying LED fittings, always confirm the colour
                temperature and ensure all lamps are from the same batch or manufacturer where
                possible.
              </p>
            </>
          ),
        },
        {
          id: 'lumens-vs-watts',
          heading: 'Lumens vs Watts',
          content: (
            <>
              <p>
                One of the most common sources of confusion when specifying LED lighting is the
                shift from watts to lumens. For decades, consumers and electricians specified lamp
                brightness by wattage — "a 60W bulb" or "a 100W bulb." With incandescent lamps,
                wattage was a reliable proxy for brightness because all incandescent lamps had
                roughly the same efficacy (lumens per watt).
              </p>
              <p>
                With LEDs, wattage no longer correlates consistently with brightness. A 10W LED from
                one manufacturer might produce 800 lumens, while a 10W LED from another might
                produce 1,000 lumens. The correct measure of brightness is lumens — the total amount
                of visible light emitted by the source.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Lumen Equivalence Guide</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">25W incandescent</span>
                    <span className="text-yellow-400 font-bold">250 lumens</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">40W incandescent</span>
                    <span className="text-yellow-400 font-bold">470 lumens</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">60W incandescent</span>
                    <span className="text-yellow-400 font-bold">800 lumens</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">100W incandescent</span>
                    <span className="text-yellow-400 font-bold">1,500 lumens</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="text-white font-bold">150W incandescent</span>
                    <span className="text-yellow-400 font-bold">2,600 lumens</span>
                  </div>
                </div>
              </div>
              <p>
                When specifying lighting for a domestic installation, a good rule of thumb is
                300-400 lumens per square metre for general living areas and 500-700 lumens per
                square metre for task areas (kitchens, workshops). For a typical 4m x 4m living room
                (16 sq m), that is approximately 4,800-6,400 lumens total — which could be achieved
                with six to eight 800-lumen downlights.
              </p>
            </>
          ),
        },
        {
          id: 'dimmable-leds',
          heading: 'Dimmable LEDs and LED Drivers',
          content: (
            <>
              <p>
                Dimming LEDs is one of the most common sources of complaints and callbacks for
                electricians. The root cause is almost always a mismatch between the dimmer switch
                and the LED lamp or driver.
              </p>
              <p>
                Not all LED lamps are dimmable. A non-dimmable LED connected to a dimmer switch will
                typically flicker, buzz, or fail to dim at all. Always check the lamp packaging for
                the "dimmable" symbol before connecting to a dimmer circuit.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Leading-Edge Dimmers (TRIAC)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Traditional leading-edge dimmers were designed for resistive and inductive loads
                    (incandescent and halogen lamps). They work by switching the mains waveform on
                    partway through each half-cycle. They typically have a minimum load of 40-60W —
                    which may be higher than the total LED load on the circuit. Using a leading-edge
                    dimmer with LEDs often causes flickering at low dim levels, audible buzzing from
                    the dimmer or the lamps, and a limited dimming range (e.g., only dimming from
                    100% to 40%).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Trailing-Edge Dimmers</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Trailing-edge dimmers are specifically designed for LED and electronic
                    transformer loads. They switch the waveform off partway through each half-cycle,
                    which is gentler on the LED driver electronics. They typically have a much lower
                    minimum load (5-10W) and provide smooth, flicker-free dimming down to 5-10%
                    brightness. Always specify trailing-edge dimmers for LED installations.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">DALI and 0-10V Dimming</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    For commercial installations, DALI (Digital Addressable Lighting Interface) and
                    0-10V dimming systems provide precise, flicker-free control. DALI uses a
                    dedicated two-wire control bus that allows individual addressing of each
                    luminaire. 0-10V uses a simple analogue signal. Both require compatible LED
                    drivers and control gear but deliver superior dimming performance compared to
                    mains dimming.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="AI Circuit Designer for Lighting Layouts"
                description="Elec-Mate's AI Circuit Designer helps plan lighting circuits with the correct dimmer type, cable sizing, and circuit protection for LED installations. Specify the luminaires and the app recommends compatible dimmers and driver configurations."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'transformer-compatibility',
          heading: 'Transformer Compatibility',
          content: (
            <>
              <p>
                One of the most common LED retrofit problems occurs when replacing 12V halogen
                downlights with 12V LED equivalents. The existing halogen transformer may not be
                compatible with the much lower LED load.
              </p>
              <p>
                A typical halogen downlight circuit might have six 50W MR16 halogen lamps on a 300VA
                electronic transformer. When these are replaced with six 5W LED MR16 lamps, the
                total load drops from 300W to 30W. Most electronic transformers have a minimum load
                rating of 20-60VA — if the LED load falls below this minimum, the transformer may
                not start, may flicker, or may buzz audibly.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Transformer Replacement Decision
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Check the minimum load</strong> — Read the
                      transformer's data plate. If the minimum VA rating is higher than the total
                      LED load, the transformer must be replaced with an LED-compatible driver.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Use LED-specific drivers</strong> — LED
                      drivers are designed for the low-power, constant-current or constant-voltage
                      requirements of LED lamps. They have no minimum load issue and provide stable
                      output.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Consider mains-voltage LEDs</strong> — An
                      alternative to replacing transformers is to use mains-voltage (GU10) LED
                      downlights instead of 12V MR16 lamps. This eliminates the transformer
                      entirely. New cable may be needed if the existing circuit runs to the
                      transformer rather than to each fitting individually.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Magnetic vs electronic</strong> — Old
                      wound magnetic transformers (heavy, humming) are generally more tolerant of
                      low LED loads than electronic transformers. But both types should be tested
                      with the actual LED load before declaring the retrofit complete.
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ),
        },
        {
          id: 'common-problems',
          heading: 'Common LED Problems and Solutions',
          content: (
            <>
              <p>
                Electricians encounter a range of LED-related problems on site. Most are caused by
                compatibility issues rather than faulty LEDs. Here are the most common problems and
                their solutions.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Flickering</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    The most common LED complaint. Usually caused by an incompatible dimmer
                    (leading-edge with LED), a transformer below its minimum load, or a poor-quality
                    LED driver. Solution: replace the dimmer with a trailing-edge type rated for
                    LED, replace the transformer with an LED driver, or try a different LED brand.
                    In some cases, adding a "dummy load" or "LED load correction module" to the
                    circuit can resolve the flickering.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Buzzing or Humming</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Audible noise from the LED lamp or the dimmer switch. This is caused by
                    vibration in the dimmer's internal components or the LED driver coil when using
                    mains dimming. Trailing-edge dimmers are quieter than leading-edge. If the
                    dimmer is buzzing, replace it with a quality trailing-edge model. If the LED
                    lamp itself is buzzing, try a different lamp brand — some LED drivers are
                    noisier than others.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Ghosting (Faint Glow When Off)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    LEDs that glow faintly when the switch is off. This is caused by small leakage
                    currents through the switch or wiring — enough to light an LED (which needs only
                    milliamps) but not enough to light an incandescent lamp. Common with
                    neon-indicator switches, smart switches, and two-way switching circuits with
                    long cable runs. Solutions include fitting a bypass capacitor across the lamp,
                    using a neutral-switched circuit, or replacing the switch with one without a
                    neon indicator.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Colour Inconsistency</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Different lamps in the same room producing noticeably different colour
                    temperatures. This occurs when lamps are from different batches or
                    manufacturers, even when they are all labelled as the same colour temperature.
                    Buy all lamps for a room from the same batch. Check the MacAdam step rating — a
                    lower number (e.g., 2-step or 3-step) means tighter colour consistency between
                    individual lamps.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'installation-best-practice',
          heading: 'Installation Best Practice',
          content: (
            <>
              <p>
                Correct installation of LED lighting goes beyond simply swapping a lamp. There are
                specific considerations that affect safety, performance, and longevity.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Thermal management</strong> — LEDs are
                      sensitive to heat. Recessed downlights in insulated ceilings must be
                      fire-rated and IC-rated (insulation contact) to prevent overheating. Never
                      cover LED drivers with insulation unless the fitting is rated for it.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Fire-rated downlights</strong> — BS 7671
                      and Building Regulations require fire-rated downlights where they penetrate a
                      fire-resisting ceiling. The fire rating must match or exceed the ceiling's
                      fire resistance — typically 30 or 60 minutes. Non-fire-rated LED downlights in
                      fire compartment ceilings are a serious safety issue.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">IP ratings for bathrooms</strong> — LED
                      fittings in bathrooms must have the correct IP rating for their zone. Zone 0
                      requires IPX7, Zone 1 requires IPX4 minimum, and Zone 2 requires IPX4 if there
                      is a likelihood of water jets. See{' '}
                      <SEOInternalLink href="/guides/bs7671-eighteenth-edition">
                        BS 7671
                      </SEOInternalLink>{' '}
                      Section 701 for full requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable derating</strong> — While LED
                      circuits draw less current, the{' '}
                      <SEOInternalLink href="/guides/cable-sizing-guide">
                        cable sizing
                      </SEOInternalLink>{' '}
                      must still account for installation method, grouping, and insulation. In
                      insulated ceilings, cable derating factors can be significant.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Emergency lighting</strong> — In
                      commercial installations, LED{' '}
                      <SEOInternalLink href="/guides/emergency-lighting-certificate">
                        emergency lighting
                      </SEOInternalLink>{' '}
                      must comply with BS 5266 and provide the required lux levels for the specified
                      duration (typically 3 hours). Battery-backed LED emergency fittings are now
                      standard.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Cable Sizing for LED Circuits"
                description="Elec-Mate's cable sizing calculator applies all derating factors for LED lighting circuits, including grouping in insulated ceilings, ambient temperature corrections, and voltage drop calculations for long cable runs."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'commercial-led',
          heading: 'Commercial LED Installations',
          content: (
            <>
              <p>
                Commercial LED installations introduce additional considerations beyond domestic
                work. Lighting design standards (CIBSE LG7 for offices, BS EN 12464-1 for
                workplaces) specify minimum maintained illuminance levels, uniformity ratios, glare
                ratings, and colour rendering indices that must be met.
              </p>
              <p>Key considerations for commercial LED projects include:</p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Lighting Design Calculations</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Professional lighting design software (Dialux, Relux) is used to calculate
                      luminaire spacing, maintained illuminance, uniformity, and glare rating. The
                      design must demonstrate compliance with the relevant lighting standard before
                      installation begins.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">DALI Control Systems</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Most modern commercial LED installations use DALI for dimming and control.
                      Each luminaire has a unique address, allowing individual or group control,
                      scene setting, daylight linking, and occupancy-based switching. DALI requires
                      a dedicated two-core control cable alongside the mains supply.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Lumen Depreciation</h4>
                    <p className="text-white text-sm leading-relaxed">
                      LED output decreases over time (lumen depreciation). Commercial lighting
                      designs use a maintenance factor (typically 0.8-0.9) to account for this,
                      ensuring the installation still meets the minimum illuminance requirement at
                      the end of the LED's rated life. This affects the initial number of luminaires
                      specified.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I replace halogen downlights with LED without rewiring?',
          answer:
            'In many cases, yes. If the existing halogen downlights are mains-voltage GU10, you can simply swap the halogen GU10 lamp for an LED GU10 — no rewiring needed. If they are 12V MR16 lamps with a transformer, you can replace the MR16 halogen with an MR16 LED, but you must check that the existing transformer is compatible with the low LED load. If the transformer minimum load is higher than the total LED wattage, you need to either replace the transformer with an LED driver or switch to mains-voltage GU10 fittings (which does require rewiring). The fitting cutout size for GU10 and MR16 is the same, so conversion kits are available.',
        },
        {
          question: 'Why do my LED lights flicker when dimmed?',
          answer:
            'Flickering when dimming is almost always caused by an incompatible dimmer switch. Most existing dimmers are leading-edge (TRIAC) types designed for incandescent loads, with a minimum load of 40-60W. A few LED downlights may only draw 20-30W total — below the dimmer minimum. Replace the dimmer with a trailing-edge type rated for LED loads (look for the LED symbol on the packaging) with a minimum load of 5-10W. Ensure the LED lamps are specifically listed as "dimmable" on the packaging.',
        },
        {
          question: 'What is the best colour temperature for a kitchen?',
          answer:
            'For kitchens, 4000K (cool white) is generally the best choice. It provides a clean, neutral white light that is ideal for food preparation and cooking without the harsh, clinical feel of 6500K daylight. However, many homeowners prefer the warmth of 3000K in kitchens that double as dining spaces. Some LED downlights now offer "tuneable white" (adjustable from 2700K to 6500K) which lets the homeowner switch between warm and cool depending on the activity. If in doubt, 3000K-4000K is a safe middle ground.',
        },
        {
          question: 'Do LED downlights need to be fire rated?',
          answer:
            'Yes, if the downlight penetrates a fire-resisting ceiling (which includes most ceilings between floors in domestic and commercial buildings). Fire-rated LED downlights are designed to reinstate the fire resistance of the ceiling after the hole has been cut. The fire rating must match the ceiling — typically 30 or 60 minutes. Non-fire-rated downlights in fire compartment ceilings are a common observation on EICRs and building inspections. The fitting itself must be tested and certified to the relevant standard, not just the lamp inside it.',
        },
        {
          question: 'How many LED downlights do I need per room?',
          answer:
            'A common rule of thumb for domestic installations is one downlight per 1.2 to 1.5 square metres of floor area for general lighting. For a 4m x 4m room (16 sq m), that is approximately 10-13 downlights. However, this depends on the lumen output of each downlight, the ceiling height, the room colours (dark walls absorb more light), and the desired illuminance level. For kitchens and work areas, you may need more; for bedrooms and living rooms, fewer may be acceptable. A quick calculation: target 300-400 lumens per sq m, divide by the lumen output per downlight.',
        },
        {
          question: 'Why do my LED lights glow faintly when switched off?',
          answer:
            'This "ghosting" effect is caused by small leakage currents flowing through the circuit even when the switch is open. Unlike incandescent lamps (which need substantial current to produce any light), LEDs can produce visible light from just a few milliamps. Common causes include neon-indicator switches, smart switches that draw standby current through the lamp, long cable runs acting as capacitors, and two-way switching circuits. Solutions include removing neon indicators, fitting a bypass capacitor across the lamp, using a neutral-switched circuit, or adding a small resistive load in parallel with the LED.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/emergency-lighting-certificate',
          title: 'Emergency Lighting Certificate',
          description: 'Guide to emergency lighting testing and certification.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate cable sizes for lighting circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 Guide',
          description: 'Full guide to the 18th Edition Wiring Regulations.',
          icon: ShieldCheck,
          category: 'Regulation',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change',
          description: 'Complete guide to consumer unit replacement.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of electrical tests.',
          icon: ClipboardCheck,
          category: 'Guide',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Check voltage drop on long lighting cable runs.',
          icon: Gauge,
          category: 'Calculator',
        },
      ]}
      ctaHeading="Plan LED Installations With Elec-Mate"
      ctaSubheading="Cable sizing, circuit design, voltage drop calculations, and digital certificates for every lighting project. AI-powered tools built for electricians. 7-day free trial, cancel anytime."
    />
  );
}
