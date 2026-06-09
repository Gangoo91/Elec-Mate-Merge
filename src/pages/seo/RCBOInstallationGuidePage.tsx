import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  PoundSterling,
  Info,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'RCBO Installation Guide', href: '/rcbo-installation-guide' },
];

const tocItems = [
  { id: 'what-is-an-rcbo', label: 'What Is an RCBO?' },
  { id: 'rcbo-vs-rcd-mcb', label: 'RCBO vs RCD + MCB' },
  { id: 'rcbo-types', label: 'RCBO Types — A, B, and F' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping on LED Circuits' },
  { id: 'installation', label: 'Installing an RCBO in a Consumer Unit' },
  { id: 'compatible-brands', label: 'Compatible Brands and Board Compatibility' },
  { id: 'costs', label: 'Costs' },
  { id: 'bs7671', label: 'BS 7671 Regulation 531' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An RCBO (Residual Current Breaker with Overcurrent) combines the functions of an RCD and an MCB in a single device. It provides both overcurrent protection and 30mA residual current protection on a single circuit, meaning only that circuit trips when a fault occurs rather than a whole group of circuits.',
  'RCBOs eliminate the "half-dark house" problem caused by split-load consumer units, where a single RCD protects multiple circuits and a fault on one circuit disconnects all of them. With an RCBO board, each circuit has its own individual protection.',
  'RCBO types matter for LED lighting circuits: Type A RCBOs detect both sinusoidal and pulsating DC residual currents and are correct for most LED driver circuits. Type F RCBOs additionally detect higher-frequency currents and are suited to circuits supplying variable speed drives and modern inverter equipment.',
  'BS 7671 Section 531.3 covers the requirements for residual current devices. Regulation 531.3.3 determines the correct device type (AC, A, F or B) from the DC components and frequencies a load can produce, and Regulation 531.3.2(b) recognises RCBOs on individual final circuits in residential premises as a way to limit unwanted tripping.',
  'RCBO costs range from approximately £15 to £45 per device depending on the brand, type, and current rating. A full RCBO consumer unit replacement for a typical 3-bedroom domestic property costs between £400 and £900 fitted, including labour and certification.',
];

const faqs = [
  {
    question: 'What is the difference between an RCBO and an MCB?',
    answer:
      'An MCB (Miniature Circuit Breaker) provides overcurrent protection only — it trips when the circuit current exceeds its rated current or during a short circuit. An RCBO (Residual Current Breaker with Overcurrent) provides both overcurrent protection and residual current (earth fault) protection in a single device. A standard 30mA RCBO will trip if it detects a residual current of 30 milliamps or more — the threshold at which electric shock becomes potentially lethal. An MCB on its own will not detect an earth leakage fault unless the fault current is large enough to trip the overcurrent function.',
  },
  {
    question: 'Can I replace an MCB with an RCBO without changing the consumer unit?',
    answer:
      "In many cases, yes — provided the RCBO is compatible with your consumer unit's busbar system and there is sufficient space in the unit for the wider RCBO device. Most RCBOs are double the width of a standard MCB. You must also ensure the RCBO is from a brand or range that is approved for use with your specific consumer unit. Mixing incompatible brands in a consumer unit is not permitted — always check the manufacturer's documentation. The work must be certified with a Minor Electrical Installation Works Certificate.",
  },
  {
    question: 'Why does my RCBO keep tripping on a LED lighting circuit?',
    answer:
      'LED drivers (the electronic power supply units inside LED fittings and LED driver modules) can generate a small but measurable residual current due to electromagnetic filtering components within the driver. When many LED fittings are connected to the same circuit, the cumulative leakage current from all their drivers can exceed 30mA and cause nuisance tripping. Solutions include: using a Type A or Type F RCBO (which filter out high-frequency components that would cause nuisance trips on Type AC devices), reducing the number of LED fittings per circuit, or selecting LED drivers with lower inherent leakage current specifications.',
  },
  {
    question: 'What does Type A, Type B, and Type F RCBO mean?',
    answer:
      'These refer to the type of residual current the device can detect. Type AC RCBOs detect only sinusoidal (mains frequency) residual current — they are the oldest type and no longer recommended for new installations in many applications. Type A RCBOs detect both sinusoidal and pulsating DC residual currents and are the standard choice for domestic circuits. Type F RCBOs detect sinusoidal, pulsating DC, and higher-frequency residual currents, making them suitable for circuits supplying variable speed drives and modern inverter-driven equipment. Type B RCBOs additionally detect smooth DC residual current and are used in commercial and industrial contexts with equipment such as EV chargers, medical equipment, and certain solar inverters.',
  },
  {
    question: 'Are RCBOs required by BS 7671?',
    answer:
'BS 7671 does not mandate RCBOs specifically — an RCD protecting multiple circuits on a split-load board can remain compliant. However, Regulation 531.3.2(b) explicitly recognises the use of RCBOs on individual final circuits in residential premises as a means of limiting unwanted tripping, and dividing the installation so that one fault does not disconnect unrelated circuits is encouraged. RCBO boards are now widely regarded as best practice for new installations and consumer unit replacements, and many electricians specify them as standard.',
  },
  {
    question: 'How many RCBOs can I install in a consumer unit?',
    answer:
      "This depends on the physical size of the consumer unit (number of ways) and the busbar configuration. Most modern domestic consumer units are designed to accept between 6 and 20 ways. Because RCBOs are typically twice the width of a standard MCB, an RCBO board configured for 10 circuits requires a 20-way enclosure. Always check the consumer unit manufacturer's documentation for the maximum number of devices and the correct installation procedure for their specific products.",
  },
  {
    question: 'Do I need to notify Part P when replacing an MCB with an RCBO?',
    answer:
      'Replacing a single MCB with an RCBO in an existing consumer unit is a minor alteration to the installation and should be recorded with a Minor Electrical Installation Works Certificate. It is not ordinarily notifiable to building control as a new circuit is not being added. However, if you are replacing the entire consumer unit with an RCBO board, that work is notifiable under Part P of the Building Regulations and must be either carried out by a registered competent person (who self-certifies) or notified to building control before work begins.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/consumer-unit-types-guide',
    title: 'Consumer Unit Types Guide',
    description:
      'Metal clad, split-load, high-integrity, and RCBO boards explained with upgrade costs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/socket-outlet-installation',
    title: 'Socket Outlet Installation',
    description: 'Ring main vs radial, spur rules, USB sockets, outdoor requirements, and Part P.',
    icon: CheckCircle2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-an-rcbo',
    heading: 'What Is an RCBO?',
    content: (
      <>
        <p>
          An RCBO (Residual Current Breaker with Overcurrent) is a single device that combines the
          protection functions of both an RCD (Residual Current Device) and an MCB (Miniature
          Circuit Breaker). It provides overcurrent protection against both overloads and short
          circuits, and it also provides residual current protection against earth leakage faults.
        </p>
        <p>
          In a domestic consumer unit, an RCBO is fitted in place of a standard MCB. Because each
          RCBO is self-contained, a fault on one circuit — such as a faulty appliance causing an
          earth leakage — will trip only that circuit's RCBO, leaving all other circuits unaffected.
          This is one of the principal advantages over a split-load consumer unit, where a single
          RCD protects a group of circuits.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-in-one protection</strong> — the RCBO provides both overcurrent
                (overload and short circuit) and residual current (earth leakage) protection in a
                single device. No separate RCD is required for the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual circuit isolation</strong> — when an earth leakage fault occurs,
                only the affected circuit's RCBO trips. All other circuits continue to operate
                normally. This is the key operational advantage over shared RCD protection on a
                split-load board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard residual current sensitivity</strong> — domestic RCBOs are
                typically rated at 30mA residual current sensitivity. BS 7671 Regulation 415.1
                recognises a 30mA RCD as additional protection against electric shock, and
                Regulation 411.3.3 makes that 30mA protection a requirement for socket-outlets up to
                32A and for mobile equipment up to 32A used outdoors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcbo-vs-rcd-mcb',
    heading: 'RCBO vs RCD + MCB — Which Is Better?',
    content: (
      <>
        <p>
          The traditional approach in domestic consumer units was a split-load arrangement: a main
          switch, one or two RCDs each protecting a group of MCBs. The alternative — now widely
          adopted for new installations and replacements — is an RCBO board, where every circuit has
          its own RCBO and a main switch only (no shared RCDs). See our{' '}
          <SEOInternalLink href="/consumer-unit-types-guide">
            consumer unit types guide
          </SEOInternalLink>{' '}
          for how RCBO boards compare with split-load and high-integrity boards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split-load RCD board — advantage</strong>: lower initial cost. A split-load
                board with two RCDs and eight MCBs is cheaper to supply and fit than an eight-way
                RCBO board. The materials saving is typically £50 to £150 depending on board size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split-load RCD board — disadvantage</strong>: a single earth fault on any
                circuit protected by one RCD will disconnect all circuits on that RCD. In a property
                where the sockets, freezer, and fridge are all on the same RCD group, a faulty
                toaster can cause food spoilage and knock out multiple rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO board — advantage</strong>: individual circuit protection. Only the
                faulted circuit trips. The rest of the installation remains live. This is
                particularly valuable in properties where a fridge-freezer, security system, or
                medical equipment must stay powered even if another circuit faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO board — disadvantage</strong>: higher initial cost and more complex
                fault finding for the homeowner (though fault finding for the electrician is
                actually simpler — the tripped RCBO directly identifies the faulted circuit). Labour
                time for fitting an RCBO board is comparable to a split-load board.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate Electrical Installation Certificates for consumer"
          description="Elec-Mate produces EICs, Minor Works Certificates, and EICRs on your phone. PDF generation in seconds, stored securely in the cloud."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'rcbo-types',
    heading: 'RCBO Types — Type A, Type B, and Type F',
    content: (
      <>
        <p>
          RCBOs (and RCDs) are classified by the type of residual current they can detect. BS 7671
          Regulation 531.3.3 defines four device types according to their behaviour in the presence
          of DC components and frequencies. Selecting the wrong type for the load being protected can
          result in either nuisance tripping or, worse, failure to trip under a genuine fault
          condition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[auto_1fr_auto] gap-px bg-white/10 text-sm">
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">Type</div>
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">Detects</div>
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">Typical use</div>

            <div className="bg-blue-900/30 px-4 py-3 font-semibold text-blue-200">AC</div>
            <div className="bg-blue-900/20 px-4 py-3 text-white/90">
              Alternating sinusoidal residual current only
            </div>
            <div className="bg-blue-900/20 px-4 py-3 text-white/80">
              Fixed equipment with no DC content only — restricted by Reg 531.3.3
            </div>

            <div className="bg-yellow-900/30 px-4 py-3 font-semibold text-yellow-200">A</div>
            <div className="bg-yellow-900/20 px-4 py-3 text-white/90">
              Sinusoidal + pulsating DC residual current
            </div>
            <div className="bg-yellow-900/20 px-4 py-3 text-white/80">
              Standard domestic choice — sockets, lighting, appliances with electronic supplies
            </div>

            <div className="bg-green-900/30 px-4 py-3 font-semibold text-green-200">F</div>
            <div className="bg-green-900/20 px-4 py-3 text-white/90">
              Type A behaviour + composite and higher-frequency residual currents
            </div>
            <div className="bg-green-900/20 px-4 py-3 text-white/80">
              Variable speed drives, frequency inverters, modern heat pump controllers
            </div>

            <div className="bg-purple-900/30 px-4 py-3 font-semibold text-purple-200">B</div>
            <div className="bg-purple-900/20 px-4 py-3 text-white/90">
              Type F behaviour + smooth DC residual current, up to 1 kHz AC
            </div>
            <div className="bg-purple-900/20 px-4 py-3 text-white/80">
              Equipment with a DC leakage path — certain EV chargers, some solar inverters, medical
              equipment
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <p className="flex items-start gap-3 text-white m-0">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <span>
              Type AC devices are no longer a free choice. Regulation 531.3.3 restricts Type AC RCDs
              to serving fixed equipment where it is known the load current contains no DC components
              (for example, simple heating appliances or filament lighting with no electronic
              components). Almost all modern circuits draw current through electronics that generate
              pulsating DC, so Type A is now the practical minimum for domestic work.
            </span>
          </p>
        </div>
        <p>
          For most domestic circuits, Type A RCBOs are the correct choice. Specify Type F for
          circuits supplying air source heat pumps, variable speed drives, or any load where
          high-frequency leakage is a concern. Always check the equipment manufacturer's
          requirements before selecting the RCBO type.
        </p>
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'Nuisance Tripping on LED Lighting Circuits',
    content: (
      <>
        <p>
          One of the most common call-backs electricians receive after a consumer unit replacement
          or LED lighting installation is nuisance tripping on lighting circuits. This is caused by
          the cumulative leakage current from LED drivers (the electronic power supplies inside LED
          fittings and modules).
        </p>
        <p>
          Each LED driver contains electromagnetic interference (EMI) filtering capacitors. These
          capacitors create a small residual current path to earth. A single LED fitting might leak
          as little as 0.5 to 1mA. But connect 20, 30, or 40 downlights to a single circuit and the
          cumulative leakage can approach or exceed the 30mA trip threshold of the RCBO.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use Type A or Type F RCBOs</strong> — older Type AC devices are more
                susceptible to nuisance tripping from the high-frequency components in LED driver
                leakage currents. Type A and Type F devices include filtering that prevents these
                components from causing trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limit fittings per circuit</strong> — if cumulative leakage is the issue,
                split large lighting installations across multiple circuits, each protected by its
                own RCBO. This reduces the per-circuit leakage load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specify low-leakage LED drivers</strong> — premium LED downlight brands
                publish their driver leakage current figures. Selecting fittings with leakage below
                0.5mA per fitting significantly reduces the cumulative leakage on a circuit with
                many fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for wiring faults first</strong> — before blaming the LED drivers,
                verify that there are no genuine earth faults on the circuit. Insulation resistance
                testing (IR test, 500V DC between live and earth) should be carried out to confirm
                the circuit insulation is sound.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation',
    heading: 'Installing an RCBO in a Consumer Unit',
    content: (
      <>
        <p>
          Installing an RCBO requires safe isolation of the consumer unit and competence in working
          on distribution equipment. This is not a DIY task — it must be carried out by a qualified
          electrician and certified with the appropriate certificate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Safe isolation</strong>: isolate the consumer unit at the main
                switch. Prove dead using an approved voltage indicator at the incoming terminals and
                at the busbar where the RCBO will be fitted. Apply a lock-off device to the main
                switch and prove dead again. Note: the meter tails and service head remain live at
                all times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Verify compatibility</strong>: confirm the replacement RCBO is
                compatible with the consumer unit's busbar system. Many consumer unit manufacturers
                only warrant their units with their own branded protective devices. Fitting a
                third-party RCBO in an incompatible unit voids the manufacturer's warranty and may
                not be compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Remove the MCB and fit the RCBO</strong>: withdraw the existing MCB
                from the busbar. RCBOs are wider than MCBs — ensure there is adequate space. Connect
                the neutral conductor from the circuit to the RCBO's neutral terminal (a separate
                neutral bar is no longer used for this circuit). Clip the RCBO onto the busbar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Test and certify</strong>: verify the RCBO's effectiveness with a
                calibrated RCD tester to BS EN 61557-6. Under BS 7671, a general (non-delay) type RCD
                is deemed verified where it disconnects within 300ms maximum at its rated residual
                operating current (IΔn). Many electricians also record ramp and 5× results from the
                instrument as supporting evidence. Record the results and issue a Minor Electrical
                Installation Works Certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compatible-brands',
    heading: 'Compatible Brands and Board Compatibility',
    content: (
      <>
        <p>
          One of the most important — and most frequently overlooked — rules in consumer unit work
          is that protective devices must be compatible with the consumer unit in which they are
          installed. Consumer unit manufacturers design their busbars and enclosures around their
          own device ranges and do not generally warrant third-party devices fitted in their units.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[auto_1fr] gap-px bg-white/10 text-sm">
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">Manufacturer</div>
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">
              Board / RCBO ranges and notes
            </div>

            <div className="bg-white/[0.02] px-4 py-3 font-semibold text-white">Hager</div>
            <div className="bg-white/[0.02] px-4 py-3 text-white/85">
              Invicta, Klik and other ranges accept Hager RCBOs. Verify any third-party device
              against Hager's own compatibility documentation before fitting.
            </div>

            <div className="bg-white/[0.04] px-4 py-3 font-semibold text-white">
              Schneider Electric
            </div>
            <div className="bg-white/[0.04] px-4 py-3 text-white/85">
              Acti9, Resi9 and Domae. Resi9 is widely used in domestic work; Acti9 is
              commercial-grade. Do not mix ranges.
            </div>

            <div className="bg-white/[0.02] px-4 py-3 font-semibold text-white">Eaton</div>
            <div className="bg-white/[0.02] px-4 py-3 text-white/85">
              Memshield 3 boards accept Eaton RCBOs. Memshield 2 is older and may have a different
              busbar configuration.
            </div>

            <div className="bg-white/[0.04] px-4 py-3 font-semibold text-white">ABB</div>
            <div className="bg-white/[0.04] px-4 py-3 text-white/85">
              Mistral consumer units accept ABB RCBO ranges. ABB also produce the MK range under
              their brand.
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-6 my-4">
          <p className="flex items-start gap-3 text-white m-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span>
              <strong>Cross-brand mixing is a compliance issue, not just a warranty one.</strong> For
              a single-phase supply rated up to 100A under the control of ordinary persons, BS 7671
              requires the consumer unit to be a complete assembly to BS EN 61439-3 incorporating the
              components and protective devices specified by its manufacturer (Regulation 536.4.201,
              including the 16 kA conditional short-circuit test of Annex ZB). Regulation 536.4.5
              requires the assembly's declared characteristics to be respected. Fitting an
              unapproved third-party RCBO breaks the verified assembly — never do it without written
              confirmation from the board manufacturer.
            </span>
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'RCBO Costs',
    content: (
      <>
        <p>
          RCBO costs vary by brand, type, and current rating. The figures below are indicative
          market guidance for the UK trade only — not a quote. Always price from current supplier
          rates and your own labour:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <PoundSterling className="w-5 h-5 shrink-0" />
              <span className="text-2xl font-bold">£15–£22</span>
            </div>
            <p className="font-semibold text-white m-0">Entry-level Type A RCBO (6A–32A)</p>
            <p className="text-white/70 text-sm m-0 mt-1">
              Per device, trade price. Suitable for most standard domestic circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <PoundSterling className="w-5 h-5 shrink-0" />
              <span className="text-2xl font-bold">£22–£32</span>
            </div>
            <p className="font-semibold text-white m-0">Mid-range Type A RCBO (Hager, Resi9)</p>
            <p className="text-white/70 text-sm m-0 mt-1">
              Per device. Better build quality and manufacturer-backed board compatibility.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <PoundSterling className="w-5 h-5 shrink-0" />
              <span className="text-2xl font-bold">£28–£45</span>
            </div>
            <p className="font-semibold text-white m-0">Type F RCBO</p>
            <p className="text-white/70 text-sm m-0 mt-1">
              Per device. Specify for heat pump, EV charger supply, or variable speed drive circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-5">
            <div className="flex items-center gap-2 text-yellow-400 mb-1">
              <PoundSterling className="w-5 h-5 shrink-0" />
              <span className="text-2xl font-bold">£400–£900</span>
            </div>
            <p className="font-semibold text-white m-0">Full RCBO board replacement (domestic)</p>
            <p className="text-white/70 text-sm m-0 mt-1">
              Fitted, including labour, materials, certification and Building Regulations
              notification. Larger properties sit at the higher end.
            </p>
          </div>
        </div>
        <p>
          When quoting consumer unit replacement work, ensure you include the cost of the Building
          Regulations compliance certificate (issued through your competent person scheme) and the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          in your price. Elec-Mate lets you generate EICs and Minor Works Certificates directly on
          your phone at the job, with instant PDF and cloud storage.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671',
    heading: 'BS 7671 Regulation 531 — Residual Current Devices',
    content: (
      <>
        <p>
          The selection and installation of RCDs and RCBOs is governed by Section 531 of BS
          7671:2018+A4:2026 (the 18th Edition Wiring Regulations, as amended). The key regulations
          relevant to RCBO selection and installation are set out below.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[auto_1fr] gap-px bg-white/10 text-sm">
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">Regulation</div>
            <div className="bg-white/[0.06] px-4 py-3 font-semibold text-white">
              What it requires
            </div>

            <div className="bg-white/[0.02] px-4 py-3 font-semibold text-yellow-200">
              411.3.3
            </div>
            <div className="bg-white/[0.02] px-4 py-3 text-white/85">
              In AC systems, additional protection by a 30mA RCD is required for socket-outlets rated
              up to 32A and for mobile equipment up to 32A used outdoors. A 30mA RCBO satisfies this
              on an individual circuit.
            </div>

            <div className="bg-white/[0.04] px-4 py-3 font-semibold text-yellow-200">
              531.3.2(b)
            </div>
            <div className="bg-white/[0.04] px-4 py-3 text-white/85">
              Lists the use of RCBOs for individual final circuits in residential premises as a means
              of limiting the risk of unwanted tripping — the regulatory basis for choosing an RCBO
              board over a shared-RCD split-load board.
            </div>

            <div className="bg-white/[0.02] px-4 py-3 font-semibold text-yellow-200">
              531.3.3
            </div>
            <div className="bg-white/[0.02] px-4 py-3 text-white/85">
              Defines RCD Types AC, A, F and B by their response to DC components and frequencies, and
              restricts Type AC to fixed equipment with no DC load content. Determines which device
              type a circuit needs.
            </div>

            <div className="bg-white/[0.04] px-4 py-3 font-semibold text-yellow-200">
              531.3.6
            </div>
            <div className="bg-white/[0.04] px-4 py-3 text-white/85">
              Confirms a 30mA RCD is recognised as additional protection under Regulation 415.1 and
              must comply with 411.3.3. Where installed at the origin of a final circuit, it may
              provide fault protection and additional protection simultaneously.
            </div>
          </div>
        </div>
        <p>
          For a full analysis of your installation's RCD and RCBO requirements, an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR</SEOInternalLink>{' '}
          will identify any deficiencies in the existing RCD protection arrangement and recommend
          appropriate remediation.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RCBOInstallationGuidePage() {
  return (
    <GuideTemplate
      title="RCBO Installation Guide — Types, Costs, and BS 7671"
      description="Complete guide to RCBO installation for UK electricians. Covers Type A, B, and F RCBOs, nuisance tripping on LED circuits, consumer unit compatibility…"
      datePublished="2024-07-01"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          RCBO Installation Guide{' '}
          <span className="text-yellow-400">— Types, Costs, and BS 7671</span>
        </>
      }
      heroSubtitle="RCBOs provide individual circuit protection that split-load RCD boards cannot match. This guide covers the different RCBO types, how to resolve nuisance tripping on LED circuits, installation procedure, board compatibility, and how BS 7671 Regulation 531 applies."
      answerBox={{
        question: 'How do you install an RCBO in a consumer unit?',
        answer:
          'Safely isolate the consumer unit at the main switch and prove dead, confirm the RCBO is the device specified by the board manufacturer, withdraw the existing MCB and clip the RCBO onto the busbar, connect both the line and neutral of that circuit to the RCBO, then test the trip time and issue a Minor Electrical Installation Works Certificate. This is qualified-electrician work, not DIY.',
      }}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="RCBO Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Generate EICs and Minor Works Certificates at the job"
      ctaSubheading="Elec-Mate produces fully compliant electrical certificates on your phone. PDF in seconds, stored in the cloud."
    />
  );
}
