import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  BookOpen,
  Brain,
  Cable,
  Zap,
  Building2,
  ClipboardCheck,
} from 'lucide-react';

export default function AFDDGuidePage() {
  return (
    <GuideTemplate
      title="AFDD Guide | Arc Fault Detection Devices BS 7671"
      description="Complete guide to Arc Fault Detection Devices (AFDDs). BS 7671 Regulation 421.1.7, where AFDDs are required (HMOs, buildings over 4 storeys, care homes, student accommodation), how they work, AFDD vs RCBO, installation requirements, manufacturers, and Amendment 2 changes."
      datePublished="2025-05-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'AFDD Arc Fault Detection', href: '/guides/afdd-arc-fault-detection' },
      ]}
      tocItems={[
        { id: 'what-are-afdds', label: 'What Are AFDDs?' },
        { id: 'how-afdds-work', label: 'How AFDDs Work' },
        { id: 'where-required', label: 'Where AFDDs Are Required' },
        { id: 'afdd-vs-rcbo', label: 'AFDD vs RCBO' },
        { id: 'installation-requirements', label: 'Installation Requirements' },
        { id: 'manufacturers', label: 'Manufacturers & Cost' },
        { id: 'practical-considerations', label: 'Practical Considerations' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="BS 7671 Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          AFDD Arc Fault Detection
          <br />
          <span className="text-yellow-400">BS 7671 Requirements Explained</span>
        </>
      }
      heroSubtitle="Arc Fault Detection Devices (AFDDs) are becoming increasingly important in UK electrical installations. This guide explains what AFDDs are, how they work, where BS 7671 requires them, the difference between AFDDs and RCBOs, installation requirements, and the practical considerations for electricians specifying them."
      readingTime={15}
      keyTakeaways={[
        'AFDDs detect dangerous arc faults (both series and parallel) that cannot be detected by MCBs, RCDs, or RCBOs. They protect against electrical fires caused by damaged cables, loose connections, and deteriorated insulation.',
        'BS 7671 Regulation 421.1.7 recommends AFDDs in locations with sleeping accommodation in higher-risk premises — HMOs, buildings over 4 storeys, care homes, student accommodation, and premises with combustible construction.',
        'AFDDs are not a replacement for MCBs or RCDs — they provide an additional layer of protection. Most AFDD units combine arc detection with RCBO functionality (30mA RCD + MCB + AFDD in one device).',
        'Major manufacturers include Siemens, Schneider Electric, and Hager. Typical cost is £80 to £150 per device — significantly more than a standard RCBO at £25 to £50.',
        'Elec-Mate certificate forms include AFDD fields, and the AI regulations lookup explains exactly where AFDDs are recommended under BS 7671.',
      ]}
      sections={[
        {
          id: 'what-are-afdds',
          heading: 'What Are Arc Fault Detection Devices?',
          content: (
            <>
              <p>
                An Arc Fault Detection Device (AFDD) is a protective device designed to detect
                dangerous electrical arc faults and disconnect the circuit before the arc can start
                a fire. Arc faults occur when electricity jumps across a gap between conductors —
                for example, through damaged cable insulation, at a loose terminal connection, at a
                cracked conductor, or through carbonised material in an aged accessory.
              </p>
              <p>
                Arc faults are particularly dangerous because they can generate temperatures
                exceeding 6,000 degrees Celsius at the point of arcing — hot enough to ignite
                surrounding materials including cable insulation, timber, plasterboard, and soft
                furnishings. Yet the current flowing through an arc fault may be too small to trip a
                conventional MCB or fuse, and the fault does not produce the earth leakage that an
                RCD detects. This means a dangerous arc can persist for extended periods, gradually
                heating surrounding materials until a fire starts.
              </p>
              <p>There are two types of arc fault that AFDDs protect against:</p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Series Arc Faults</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Occur when a conductor breaks or a connection loosens within the circuit,
                    creating a gap that current arcs across. The current is limited by the load
                    impedance, so it is always less than the normal load current — an MCB will never
                    trip. The arc generates intense heat at the fault point. Common causes include
                    nails or screws driven through cables, rodent damage, cables crushed during
                    building work, and aged connections that have loosened over time.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Parallel Arc Faults</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Occur when insulation between line and neutral (or line and earth) deteriorates
                    to the point where current arcs between the conductors. The current is limited
                    by the arc impedance, which can vary from near-short-circuit to just a few amps.
                    Small parallel arcs may not draw enough current to trip an MCB. If the arc is
                    between line and earth, an RCD should detect it — but line-to-neutral arcs
                    produce no earth leakage and will not trip an RCD.
                  </p>
                </div>
              </div>
              <p>
                Electrical Safety First estimates that electrical faults cause around 14,000 house
                fires per year in the UK, with faulty wiring, cables, and connections being among
                the leading causes. AFDDs address a critical gap in protection that conventional
                devices cannot fill.
              </p>
            </>
          ),
        },
        {
          id: 'how-afdds-work',
          heading: 'How AFDDs Work',
          content: (
            <>
              <p>
                AFDDs use sophisticated electronic analysis to distinguish between dangerous arc
                faults and the normal arcing that occurs during everyday electrical operation. This
                distinction is critical — a light switch produces a brief arc every time it is
                operated, a motor produces arcing at its commutator brushes, and many electronic
                devices produce switching transients that look superficially like arcs. An AFDD must
                detect genuinely dangerous arcs without nuisance tripping on these normal events.
              </p>
              <p>
                The detection method relies on analysing the high-frequency noise signature
                superimposed on the 50Hz power waveform. When an arc occurs, it produces a
                characteristic pattern of high-frequency current fluctuations (typically in the
                kilohertz to megahertz range) that differ from normal switching transients. The AFDD
                contains a microprocessor that continuously samples the current waveform and applies
                algorithmic analysis to identify these arc fault signatures.
              </p>
              <p>The AFDD analyses several characteristics of the current waveform:</p>
              <ul className="space-y-3 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">High-frequency noise content</strong> — Arcs
                    produce broadband high-frequency noise that normal loads do not. The AFDD
                    monitors the frequency spectrum of the current for patterns consistent with
                    arcing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Current irregularities at zero-crossing</strong>{' '}
                    — Arcs tend to extinguish momentarily as the AC waveform passes through zero and
                    re-ignite as the voltage rises, creating characteristic discontinuities in the
                    current waveform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Duration and persistence</strong> — Normal
                    switching events are brief (milliseconds). Dangerous arc faults persist for
                    multiple cycles and show repeating patterns. The AFDD requires the signature to
                    persist for a minimum number of half-cycles before tripping.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Current amplitude changes</strong> — The AFDD
                    monitors for the random amplitude variations characteristic of an unstable arc,
                    as opposed to the stable, predictable current drawn by a normal load.
                  </span>
                </li>
              </ul>
              <p>
                AFDDs are manufactured to BS EN 62606, which sets out the performance requirements
                and test methods. The standard defines specific arc fault test scenarios that the
                device must detect, and specific non-arc scenarios that must not cause tripping.
                This standardisation ensures consistent performance across manufacturers.
              </p>
            </>
          ),
        },
        {
          id: 'where-required',
          heading: 'Where AFDDs Are Required by BS 7671',
          content: (
            <>
              <p>
                BS 7671 Regulation 421.1.7 was introduced in Amendment 2 to the 18th Edition and
                provides a recommendation (not a mandatory requirement) for the use of AFDDs. The
                regulation states that arc fault detection devices conforming to BS EN 62606 are
                recommended to provide additional protection against fire caused by arc faults in AC
                final circuits.
              </p>
              <p>
                The regulation specifically recommends AFDDs for circuits in the following
                locations:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
                <h3 className="font-bold text-white text-lg mb-4">
                  Locations Where AFDDs Are Recommended
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Houses in Multiple Occupation (HMOs)
                      </strong>{' '}
                      — HMOs present a higher fire risk due to multiple independent households
                      sharing a building, often with modified wiring, high occupancy, and limited
                      means of escape. AFDDs add fire protection to circuits serving individual
                      lettings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Buildings with sleeping accommodation above the fourth floor
                      </strong>{' '}
                      — In buildings over four storeys, escape in the event of fire takes longer and
                      is more dangerous. AFDDs provide earlier detection of electrical faults that
                      could start fires.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Care homes and residential homes</strong>{' '}
                      — Occupants may have limited mobility or awareness, making them more
                      vulnerable in a fire. Electrical fire prevention is critical in these
                      settings.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Student accommodation</strong> — High
                      occupancy, high use of electrical equipment, and sleeping accommodation create
                      a combination of risk factors that AFDDs help to mitigate.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Premises with combustible construction
                      </strong>{' '}
                      — Timber-framed buildings, buildings with thatched roofs, and properties with
                      significant combustible materials in the structure are at higher risk from
                      electrical fires. AFDDs provide an additional layer of protection for cables
                      running through combustible materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Locations with a risk of fire due to stored materials
                      </strong>{' '}
                      — Premises where combustible materials, goods, or products are stored close to
                      electrical circuits — including some commercial and retail premises.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                It is important to note that the regulation uses the word "recommended" rather than
                "shall" — AFDDs are not currently a mandatory requirement under BS 7671. However,
                the trend in the industry is clear: AFDDs are increasingly being specified by
                designers and clients, and it is likely that future amendments will strengthen the
                recommendation towards a requirement, as has happened previously with RCDs and SPDs.
              </p>
              <p>
                Some local authority building control departments and fire officers are already
                requiring AFDDs for specific applications, particularly in HMOs and care homes. When
                working on these types of premises, check the specific requirements with the local
                authority before finalising the design.
              </p>
            </>
          ),
        },
        {
          id: 'afdd-vs-rcbo',
          heading: 'AFDD vs RCBO — What Is the Difference?',
          content: (
            <>
              <p>
                An AFDD and an RCBO protect against completely different types of fault, and one is
                not a substitute for the other. In practice, most modern AFDD devices combine all
                three functions — arc fault detection, RCD, and MCB — into a single unit, but
                understanding the distinction is important.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">MCB</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Protects against overcurrent — short circuits and sustained overloads. Trips
                    when current exceeds the device rating. Does not detect arc faults or earth
                    leakage.
                  </p>
                  <div className="text-white text-sm">
                    <strong className="text-yellow-400">Detects:</strong> Overcurrent only
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">RCBO</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Combines MCB and RCD in one device. Protects against overcurrent AND earth
                    leakage (residual current). Does not detect arc faults — particularly series
                    arcs and line-to-neutral parallel arcs.
                  </p>
                  <div className="text-white text-sm">
                    <strong className="text-yellow-400">Detects:</strong> Overcurrent + earth
                    leakage
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">AFDD/RCBO</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Combines all three functions — arc fault detection, RCD, and MCB. Protects
                    against overcurrent, earth leakage, AND arc faults. Provides the most
                    comprehensive circuit protection currently available.
                  </p>
                  <div className="text-white text-sm">
                    <strong className="text-yellow-400">Detects:</strong> Overcurrent + earth
                    leakage + arc faults
                  </div>
                </div>
              </div>
              <p>
                The key point is that an AFDD addresses a protection gap that RCBOs cannot fill. A
                series arc fault produces current that is always less than the normal load current
                (so the MCB element will not trip) and creates no earth leakage (so the RCD element
                will not trip). Only the arc fault detection function can identify the
                characteristic signature of the arc and disconnect the circuit. For this reason,
                AFDDs are specified in addition to existing protection, not as a replacement.
              </p>
              <p>
                When specifying AFDDs, most electricians choose combined AFDD/RCBO devices that
                replace the standard RCBO in the{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit
                </SEOInternalLink>
                . This provides all three levels of protection from a single device, occupying a
                single (wider) module position in the distribution board.
              </p>
            </>
          ),
        },
        {
          id: 'installation-requirements',
          heading: 'AFDD Installation Requirements',
          content: (
            <>
              <p>
                Installing AFDDs is straightforward from a wiring perspective — the device replaces
                a standard RCBO in the distribution board. However, there are several practical
                considerations that affect the design and specification.
              </p>
              <ul className="space-y-3 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Board compatibility</strong> — AFDD/RCBO devices
                    are wider than standard RCBOs (typically 2 modules instead of 1). The consumer
                    unit or distribution board must have sufficient space. Some manufacturers
                    produce boards specifically designed to accommodate AFDDs with the correct
                    bus-bar configuration.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Wiring method</strong> — Both the line and
                    neutral conductors for the protected circuit must pass through the AFDD. This is
                    similar to an RCBO installation — the neutral is connected to the device, not to
                    the common neutral bar.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">One AFDD per circuit</strong> — Each final
                    circuit that requires AFDD protection must have its own device. AFDDs cannot
                    protect multiple circuits through a single unit because the arc detection
                    algorithm needs to analyse the current signature of an individual circuit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Circuit length and cable type</strong> — Some
                    AFDD manufacturers specify maximum circuit lengths or restrictions on cable
                    types. Long circuits with high capacitance (such as lengthy runs of SWA cable)
                    can affect the high-frequency analysis. Check manufacturer guidance for specific
                    limitations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Testing</strong> — AFDDs have a built-in test
                    button that simulates an arc fault to verify the trip mechanism. This should be
                    tested at commissioning and during periodic inspection. There is currently no
                    standardised instrument test for AFDDs — the built-in test is the primary
                    verification method.
                  </span>
                </li>
              </ul>
              <SEOAppBridge
                title="Certificate Forms Include AFDD Fields"
                description="Elec-Mate's EIC and EICR forms include dedicated fields for recording AFDD protection on each circuit. The schedule of circuit details captures the device manufacturer, type, and rating, and the schedule of test results records the AFDD test button operation."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'manufacturers',
          heading: 'AFDD Manufacturers and Cost',
          content: (
            <>
              <p>
                The UK market for AFDDs has grown significantly since their introduction to BS 7671.
                The main manufacturers offering AFDD devices compatible with UK consumer units and
                distribution boards are:
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Siemens (5SV6 series)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Siemens was one of the first manufacturers to bring AFDDs to the UK market.
                    Their 5SV6 series combines AFDD, 30mA RCD, and MCB in a single 2-module-wide
                    device. Available in ratings from 6A to 40A with Type B or Type C curve.
                    Compatible with Siemens consumer units and some other manufacturers' boards via
                    adaptors. Typical trade price £90 to £130.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">
                    Schneider Electric (iC60 AFDD series)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Schneider offers AFDD/RCBO combination devices in their iC60 range. Available in
                    ratings from 6A to 40A. The devices are 3 modules wide in the Schneider format.
                    Compatible with Schneider Acti 9 distribution boards. Schneider also offers
                    standalone AFDD modules that can be added upstream of an existing RCBO. Typical
                    trade price £100 to £150.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-2">Hager (AFDD series)</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Hager offers combined AFDD/RCBO devices compatible with their consumer unit and
                    distribution board ranges. Available in common domestic ratings. Hager has also
                    developed consumer units with AFDD-ready bus-bar configurations, making
                    retrofitting easier. Typical trade price £85 to £120.
                  </p>
                </div>
              </div>
              <p>
                The cost differential between a standard RCBO (typically £25 to £50) and an
                AFDD/RCBO (typically £80 to £150) is significant — roughly doubling or tripling the
                cost per circuit. For a typical 10-way domestic consumer unit, using AFDDs on every
                circuit would add approximately £500 to £1,000 to the installation cost. This is the
                main barrier to wider adoption and the reason the regulation currently recommends
                rather than requires AFDDs.
              </p>
              <p>
                Many electricians take a pragmatic approach, installing AFDDs on the highest-risk
                circuits — bedrooms, living rooms, and circuits running through combustible building
                elements — while using standard RCBOs on lower-risk circuits such as the cooker and
                immersion heater.
              </p>
            </>
          ),
        },
        {
          id: 'practical-considerations',
          heading: 'Practical Considerations for Electricians',
          content: (
            <>
              <p>
                Before specifying AFDDs on a job, there are several practical factors to consider
                beyond the regulatory recommendation.
              </p>
              <div className="space-y-4 my-4">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Nuisance tripping</h3>
                      <p className="text-white text-sm leading-relaxed">
                        Early AFDD devices had a reputation for nuisance tripping, particularly on
                        circuits supplying equipment with electronic switching (LED drivers,
                        switch-mode power supplies, motor speed controllers). Newer generations have
                        significantly improved algorithms that better distinguish between dangerous
                        arcs and normal switching signatures. Always use the latest hardware
                        revision from the manufacturer and check for compatibility with the specific
                        loads on the circuit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Board space</h3>
                      <p className="text-white text-sm leading-relaxed">
                        AFDD/RCBO devices are wider than standard RCBOs. A consumer unit that
                        accommodates 12 standard RCBOs may only fit 6 to 8 AFDD devices. When
                        specifying a new installation with AFDDs, you may need a larger board or a
                        dedicated AFDD-ready board. When retrofitting AFDDs into an existing
                        installation, board replacement may be necessary.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-1">Client cost expectations</h3>
                      <p className="text-white text-sm leading-relaxed">
                        The additional cost of AFDDs needs to be discussed with the client. Explain
                        the fire protection benefit clearly and let the client make an informed
                        decision. For HMOs, care homes, and other high-risk premises where AFDDs are
                        recommended by BS 7671, include them in the specification as standard and
                        quote accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p>
                As the technology matures and costs reduce — a trend that has already begun — AFDDs
                will likely become as standard as RCDs are today. Forward-thinking electricians are
                already gaining experience with AFDDs and discussing them with clients as part of
                the design process. The{' '}
                <SEOInternalLink href="/guides/rcd-types-explained">
                  RCD types guide
                </SEOInternalLink>{' '}
                covers the complementary protection provided by different RCD types alongside AFDDs.
              </p>
              <SEOAppBridge
                title="AI Regulations Lookup for AFDD Requirements"
                description="Not sure if AFDDs are needed on your current job? Ask Elec-Mate's AI regulations agent. Describe the premises type and the AI will explain exactly which regulations apply, whether AFDDs are recommended, and which circuits should be protected. Get regulation-referenced answers in seconds."
                icon={Brain}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Are AFDDs mandatory in the UK under BS 7671?',
          answer:
            'No, AFDDs are not currently mandatory under BS 7671. Regulation 421.1.7, introduced in Amendment 2 to the 18th Edition, uses the word "recommended" rather than "shall." This means AFDDs are formally recommended for specific locations (HMOs, buildings over four storeys with sleeping accommodation, care homes, student accommodation, premises with combustible construction) but are not a mandatory requirement. However, the trend in BS 7671 is for recommendations to become requirements in subsequent amendments — this happened with RCDs and SPDs, and it is widely expected that AFDDs will follow the same path in a future edition or amendment. Some local authority building control departments and fire officers are already requiring AFDDs for specific applications, particularly in HMO conversions and care home refurbishments, so it is important to check local requirements on each job.',
        },
        {
          question: 'Can I use a standard consumer unit with AFDDs?',
          answer:
            'It depends on the consumer unit. AFDD/RCBO combination devices are wider than standard RCBOs — typically 2 modules compared to 1 module for a standard RCBO. This means a consumer unit designed for single-module RCBOs may not physically accommodate AFDD devices, or may have a significantly reduced number of available ways. Some consumer unit manufacturers (Siemens, Hager, Schneider) produce boards specifically designed for AFDD devices with appropriate bus-bar configurations and module spacing. If you are planning to fit AFDDs on a new installation, specify an AFDD-compatible board from the outset. If you are retrofitting AFDDs into an existing installation, you may need to replace the consumer unit with a larger board. Always check the specific AFDD manufacturer compatibility with the board manufacturer before ordering.',
        },
        {
          question: 'Do AFDDs cause nuisance tripping?',
          answer:
            'Early generations of AFDD devices did have issues with nuisance tripping, particularly on circuits supplying equipment with electronic switching characteristics — LED dimmers, variable-speed drives, some types of power tool, and certain appliances with switch-mode power supplies. The arc detection algorithms in these early devices sometimes interpreted the switching transients from this equipment as arc faults. Current-generation AFDDs from major manufacturers (Siemens, Schneider, Hager) have significantly improved algorithms that are much better at distinguishing between dangerous arcs and normal electrical noise. Nuisance tripping is now rare with modern devices, though it can still occur with specific combinations of equipment. If nuisance tripping does occur, try a different AFDD manufacturer (each uses different algorithms) or check with the manufacturer for firmware updates. It is important not to simply remove the AFDD — instead, investigate the cause.',
        },
        {
          question: 'What is the difference between an AFDD and a smoke detector?',
          answer:
            'An AFDD and a smoke detector protect against fire in fundamentally different ways, and one does not replace the other. An AFDD detects the electrical fault that could cause a fire and disconnects the circuit before a fire starts. It is a preventive device — it stops the ignition source. A smoke detector detects the products of combustion (smoke, heat) after a fire has already started. It is a reactive device — it alerts occupants to evacuate. The ideal installation has both: AFDDs to prevent electrical fires from starting, and smoke detectors to alert occupants if a fire starts from any cause (not just electrical). AFDDs only protect against fires caused by arc faults on the circuits they protect — they do not protect against fires from other electrical causes (such as overheating due to overloaded sockets or faulty appliances) or non-electrical causes.',
        },
        {
          question: 'Which circuits should I fit AFDDs to in a domestic installation?',
          answer:
            'If you are fitting AFDDs selectively (rather than on every circuit), prioritise the circuits with the highest fire risk. Bedroom socket circuits are the highest priority because people are asleep and least able to respond to a fire. Living room and lounge circuits are next, as they often supply high numbers of plugged-in devices with flexible leads that are prone to damage. Circuits running through timber-framed walls or loft spaces should also be prioritised, as arc faults in these locations can ignite combustible structural materials before being detected. Circuits such as cookers, immersion heaters, and outdoor supplies are lower priority for AFDD protection because they are either continuously monitored (cooker), have simple wiring with minimal risk of damage, or are already well-protected by other means. In an HMO, care home, or student accommodation, consider fitting AFDDs on all circuits supplying the sleeping areas as a minimum.',
        },
        {
          question: 'How does Elec-Mate help with AFDD specification and certification?',
          answer:
            'Elec-Mate supports AFDD specification and documentation in several ways. The certificate forms (EIC and EICR) include dedicated fields for recording AFDD protection on each circuit — device manufacturer, model, type, and rating — ensuring the protection is properly documented. The consumer unit regulations section of the app cross-references AFDD requirements with BS 7671 Regulation 421.1.7 and lists the locations where AFDDs are recommended. The AI regulations lookup agent can answer specific questions about whether AFDDs are needed for a particular premises type and provide the relevant regulation references. For the schedule of test results, the AFDD test button operation is recorded alongside the standard MCB and RCD test data. This comprehensive digital documentation ensures nothing is missed when specifying and certifying installations with AFDDs.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Metal CU requirements, RCD protection, and Amendment 3.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/rcd-types-explained',
          title: 'RCD Types Explained',
          description: 'Type AC, A, B, F — which type for which application.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/spd-surge-protection',
          title: 'SPD Surge Protection',
          description: 'Type 1, 2, 3 SPDs and BS 7671 requirements.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate Guide',
          description: 'How to complete a condition report with AFDD observations.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/landlord-electrical-safety',
          title: 'Landlord Electrical Safety',
          description: 'EICR requirements for HMOs and rented properties.',
          icon: Building2,
          category: 'Regulations',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 18th Edition',
          description: 'Complete guide to the current Wiring Regulations.',
          icon: BookOpen,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Certify AFDD Installations Digitally"
      ctaSubheading="Elec-Mate's certificate forms include AFDD fields, AI regulations lookup, and consumer unit design guidance. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
