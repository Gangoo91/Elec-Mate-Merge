import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Shield,
  AlertTriangle,
  Zap,
  Search,
  FileCheck2,
  ShieldCheck,
  Flame,
  Phone,
  ClipboardCheck,
  GraduationCap,
  PoundSterling,
  Lightbulb,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Safety at Home', href: '/guides/electrical-safety-at-home' },
];

const tocItems = [
  { id: 'why-electrical-safety-matters', label: 'Why Electrical Safety Matters' },
  { id: 'danger-signs', label: 'Warning Signs of Electrical Problems' },
  { id: 'diy-limits', label: 'What You Can and Cannot Do Yourself' },
  { id: 'when-to-call-electrician', label: 'When to Call an Electrician' },
  { id: 'eicr-for-homeowners', label: 'EICR for Homeowners' },
  { id: 'smoke-alarms', label: 'Smoke Alarms and Fire Safety' },
  { id: 'consumer-unit', label: 'Understanding Your Consumer Unit' },
  { id: 'outdoor-electrics', label: 'Outdoor Electrics and Garden Safety' },
  { id: 'for-electricians', label: 'For Electricians: Homeowner Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical faults cause around 14,000 house fires each year in the UK — early warning signs include flickering lights, burning smells, warm sockets, and frequently tripping circuit breakers.',
  'Homeowners can change light bulbs, replace fuse wire, and swap like-for-like socket faceplates, but anything involving fixed wiring or new circuits requires a qualified electrician.',
  'An EICR is not legally required for owner-occupied homes, but it is strongly recommended every 10 years (or 5 years for properties over 25 years old) to identify hidden defects.',
  'All smoke alarms should be tested monthly and replaced every 10 years — the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 now require alarms in all rented properties.',
  'Elec-Mate helps electricians complete homeowner EICRs, minor works certificates, and remedial quotes on site — so homeowners get a professional report before the electrician leaves.',
];

const faqs = [
  {
    question: 'How often should a homeowner have their electrics checked?',
    answer:
      'There is no legal requirement for owner-occupiers to have their electrics inspected, but the IET Wiring Regulations (BS 7671) recommend a periodic inspection every 10 years for domestic properties. If your home is over 25 years old, or you have recently bought a property and do not have a recent EICR, a 5-year interval is more appropriate. The inspection covers the entire fixed installation — from the meter to every socket, switch, and light fitting — and identifies any deterioration, damage, or non-compliance. It is particularly important before major renovation work, after a flood or fire, or if you notice any warning signs such as flickering lights, burning smells, or frequently tripping circuit breakers.',
  },
  {
    question: 'Can I change a light switch or socket myself?',
    answer:
      'You can replace a like-for-like socket faceplate or light switch faceplate (same type, same location, no change to the circuit wiring) as a minor maintenance task. However, adding a new socket, moving a socket to a different location, or changing the circuit (for example, adding a dimmer switch that requires a neutral conductor) is notifiable electrical work under Part P of the Building Regulations in England and Wales. Notifiable work must either be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) or inspected by Building Control. The key distinction is between replacing an accessory on an existing circuit (generally permitted) and altering or extending the fixed wiring (notifiable).',
  },
  {
    question: 'What are the signs of dangerous wiring in a house?',
    answer:
      'The most common warning signs include: sockets or switches that feel warm to the touch; a burning smell with no obvious source; scorch marks or discolouration around sockets or the consumer unit; lights that flicker or dim unexpectedly; circuit breakers or RCDs that trip repeatedly; fuses that blow frequently; electric shocks when touching appliances or switches; sparking when plugging in or unplugging devices; and a buzzing or humming sound from the consumer unit. Any of these signs should prompt an immediate call to a qualified electrician. Do not attempt to investigate the wiring yourself — isolate the affected circuit at the consumer unit if you can identify it, and leave it off until a professional has inspected the installation.',
  },
  {
    question: 'Do I need an EICR when buying a house?',
    answer:
      'An EICR is not a legal requirement when buying a house in England or Wales, but it is strongly recommended. A standard home survey or mortgage valuation does not include an electrical inspection — the surveyor will note visible defects but will not test the wiring. An EICR carried out by a qualified electrician will reveal hidden problems such as deteriorated insulation, missing earthing, lack of RCD protection, or overloaded circuits. If the EICR identifies C1 or C2 defects, you can use this information to negotiate the purchase price or require the seller to complete remedial work before completion. Many conveyancing solicitors now recommend an EICR as part of the due diligence process, particularly for older properties.',
  },
  {
    question: 'How do I know if my consumer unit needs upgrading?',
    answer:
      'Your consumer unit (fuse box) may need upgrading if: it still uses rewirable fuses instead of MCBs (miniature circuit breakers); it is a plastic unit rather than a metal unit with a non-combustible enclosure (required by Amendment 3 to BS 7671); it does not have RCD protection on all circuits; the unit is showing signs of overheating, discolouration, or damage; or the installation has been extended with additional circuits that exceed the capacity of the existing unit. A consumer unit upgrade is notifiable work under Part P and must be carried out by a registered electrician who will issue an Electrical Installation Certificate (EIC) on completion.',
  },
  {
    question: 'Are plug-in electrical safety devices worth buying?',
    answer:
      'Plug-in RCDs (residual current devices) can provide additional protection for specific appliances, particularly in older homes without RCD protection on all circuits. They are a sensible precaution for power tools, outdoor equipment, and appliances used in wet areas. However, they are not a substitute for proper RCD protection at the consumer unit — a plug-in RCD only protects the single socket it is plugged into. Plug-in surge protectors are useful for sensitive electronics (computers, TVs, routers) but do not protect against electrical faults in the fixed wiring. The best protection is a properly installed and tested consumer unit with RCBOs or split-load RCD protection, combined with a current EICR confirming the installation is in satisfactory condition.',
  },
  {
    question: 'What should I do if I get an electric shock from an appliance?',
    answer:
      'If you receive an electric shock from an appliance, stop using the appliance immediately and unplug it. Do not use the appliance again until it has been tested. If the shock was from the fixed installation (a socket, switch, or light fitting), isolate the circuit at the consumer unit and call a qualified electrician. If anyone has received a significant electric shock — especially if they lost consciousness, have burns, or feel unwell — call 999 immediately. Electric shocks can cause internal injuries that are not immediately apparent, including cardiac arrhythmia, and medical assessment is essential. After the immediate situation is dealt with, arrange for a qualified electrician to inspect the installation and identify the cause of the shock, which could be a fault in the earthing, a failed RCD, or deteriorated insulation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements under the 2020 Regulations, penalties up to £30,000, and 5-year inspection cycle.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When to upgrade, metal vs plastic, AFDD and SPD requirements, and cost guide.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-emergency-what-to-do',
    title: 'Electrical Emergency Guide',
    description:
      'What to do in a power cut, burning smell, electric shock, or flooding — and who to call.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/why-choose-niceic-electrician',
    title: 'Why Choose a NICEIC Electrician',
    description:
      'What NICEIC registration means, quality guarantees, and how to find a registered electrician.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-electrical-safety-matters',
    heading: 'Why Electrical Safety Matters in Your Home',
    content: (
      <>
        <p>
          Electricity is so reliable that most homeowners never think about the wiring behind their
          walls — until something goes wrong. According to Electrical Safety First, faulty electrics
          cause around 14,000 house fires in the UK every year. Electrical faults are also
          responsible for approximately 70 deaths and 350,000 serious injuries annually. Many of
          these incidents are preventable.
        </p>
        <p>
          The fixed electrical installation in your home — the wiring, sockets, switches, light
          fittings, consumer unit, and earthing arrangement — deteriorates over time. Insulation
          breaks down, connections loosen, and cables that were installed decades ago may no longer
          meet modern safety standards. Add to that the increased electrical load of modern living
          (electric showers, induction hobs, EV chargers, heat pumps) and it becomes clear why
          periodic inspection is essential.
        </p>
        <p>
          This guide explains the warning signs of electrical problems, what you can safely do
          yourself, when you must call a qualified electrician, and how to protect your home and
          family from electrical hazards.
        </p>
      </>
    ),
  },
  {
    id: 'danger-signs',
    heading: 'Warning Signs of Electrical Problems',
    content: (
      <>
        <p>
          Electrical faults often give warning signs before they become dangerous. Knowing what to
          look for can help you act before a fault causes a fire or injury.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell with no obvious source.</strong> This could indicate
                overheating wiring, a loose connection, or an arcing fault behind the wall. Turn off
                the circuit immediately and call an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm or hot sockets and switches.</strong> A socket that feels warm to the
                touch is a sign of a high-resistance connection, overloading, or a fault in the
                accessory. Stop using it immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flickering or dimming lights.</strong> Occasional flickering can be caused
                by a loose lamp, but persistent flickering across multiple fittings may indicate a
                loose neutral connection or deteriorating wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequently tripping circuit breakers or RCDs.</strong> An{' '}
                <SEOInternalLink href="/guides/rcd-keeps-tripping">
                  RCD that keeps tripping
                </SEOInternalLink>{' '}
                is doing its job — detecting a fault and disconnecting the circuit. But the
                underlying fault needs to be found and fixed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks or discolouration around sockets.</strong> Brown or black marks
                around a socket or switch indicate arcing or overheating — a serious fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shocks when touching switches or appliances.</strong> Even a mild
                tingling sensation indicates a fault in the earthing or insulation that needs
                immediate investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buzzing or humming from the consumer unit.</strong> A persistent buzzing
                noise from the fuse box can indicate a loose connection, an overloaded circuit, or
                an arcing fault inside the enclosure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you notice any of these signs, do not ignore them. Isolate the affected circuit at the
          consumer unit if you can safely identify which one it is, and contact a{' '}
          <SEOInternalLink href="/guides/why-choose-niceic-electrician">
            qualified electrician
          </SEOInternalLink>{' '}
          as soon as possible.
        </p>
      </>
    ),
  },
  {
    id: 'diy-limits',
    heading: 'What You Can and Cannot Do Yourself',
    content: (
      <>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (England and Wales), most electrical work in a domestic property is classed as
          "notifiable" — meaning it must either be carried out by an electrician registered with a
          competent person scheme or inspected by Building Control. There are, however, a few minor
          tasks that homeowners can safely do themselves.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What You Can Do</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Replace a blown fuse in a plug (use the correct rating)</li>
              <li>Change light bulbs and starter switches</li>
              <li>Replace a damaged plug on an appliance</li>
              <li>Replace a like-for-like socket faceplate or light switch faceplate</li>
              <li>Replace a damaged pendant lampholder</li>
              <li>Replace a fuse in a fused spur (with the correct rating)</li>
              <li>Test your RCD using the test button (monthly)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What Requires an Electrician</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Adding a new socket or light point</li>
              <li>Installing a new circuit (e.g., for an electric shower)</li>
              <li>Consumer unit replacement or upgrade</li>
              <li>Any work in a bathroom or kitchen (special location)</li>
              <li>Any work in a garden building, shed, or garage</li>
              <li>Installing an EV charger</li>
              <li>Any changes to the earthing or bonding</li>
            </ul>
          </div>
        </div>
        <p>
          The penalties for carrying out notifiable work without proper certification can include
          enforcement action from Building Control, difficulty selling your home (the buyer's
          conveyancer will ask for electrical certificates), and invalidation of your home insurance
          if an uncertified installation causes a fire or injury.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call-electrician',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Beyond the DIY limits set by Part P, there are specific situations where you should call a
          qualified electrician without delay:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You notice any of the danger signs listed above</strong> — burning smells,
                warm sockets, persistent tripping, electric shocks, or scorch marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You are buying or selling a property</strong> — arrange an EICR to confirm
                the installation is safe before exchange or completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your home has not been inspected in over 10 years</strong> — or you have no
                record of the last inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>You are planning a renovation or extension</strong> — any changes to the
                electrical installation need to be designed and certified by a qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a flood, fire, or lightning strike</strong> — the installation must be
                inspected and tested before the supply is restored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Your consumer unit still has rewirable fuses</strong> — these provide much
                less protection than modern MCBs and RCDs. An upgrade is overdue.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When choosing an electrician, look for registration with a competent person scheme such as
          NICEIC, NAPIT, or ELECSA. Ask for proof of qualifications (18th Edition and C&G 2391 for
          inspection work) and public liability insurance.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-for-homeowners',
    heading: 'EICR for Homeowners: Not Required, but Essential',
    content: (
      <>
        <p>
          Unlike{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            landlords, who must have a valid EICR by law
          </SEOInternalLink>
          , owner-occupiers have no legal obligation to arrange a periodic inspection. However, the
          IET Wiring Regulations (BS 7671) recommend an inspection every 10 years for domestic
          properties — and more frequently for older installations.
        </p>
        <p>An EICR for a homeowner typically covers:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> of the consumer unit, accessories, wiring,
                earthing, and bonding for signs of damage, deterioration, or non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — continuity of protective conductors, insulation
                resistance, and polarity with the supply isolated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance, prospective fault
                current, and RCD operation with the supply restored.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results</strong> — every circuit is tested and the results
                recorded on the EICR form.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of a homeowner EICR typically ranges from £150 to £300 depending on property size
          and location. It is a small price for the peace of mind that your family is safe from
          hidden electrical defects.
        </p>
        <SEOAppBridge
          title="Complete homeowner EICRs on site"
          description="Elec-Mate's EICR app lets you complete the inspection, record test results by voice, classify observations with AI, and send the professional PDF report to the homeowner before you leave the property."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'smoke-alarms',
    heading: 'Smoke Alarms and Fire Safety',
    content: (
      <>
        <p>
          Smoke alarms are your first line of defence against fire. The Smoke and Carbon Monoxide
          Alarm (Amendment) Regulations 2022 require smoke alarms on every floor of rented
          properties — but even if you own your home, the advice is the same.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fit smoke alarms on every floor</strong> — at minimum, one on each storey in
                the circulation area (hallway or landing). Ideally, also fit them in bedrooms and
                living rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test monthly</strong> — press the test button on each alarm every month. If
                the alarm does not sound, replace the battery or the entire unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace every 10 years</strong> — smoke alarms have a limited lifespan.
                Check the manufacture date on the unit and replace it after 10 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider mains-wired, interlinked alarms</strong> — these are more reliable
                than battery-only units and will sound all alarms when any one detects smoke.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fit a carbon monoxide alarm</strong> — in any room with a gas appliance,
                solid fuel appliance, or flue. The 2022 Regulations require this in rented
                properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Installing mains-wired smoke alarms is electrical work that should be carried out by a
          qualified electrician. The electrician will issue a{' '}
          <SEOInternalLink href="/guides/minor-works-certificate">
            Minor Electrical Installation Works Certificate
          </SEOInternalLink>{' '}
          for the installation.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Understanding Your Consumer Unit',
    content: (
      <>
        <p>
          The consumer unit (often still called the fuse box) is the heart of your home's electrical
          installation. It distributes power to every circuit in the house and provides protection
          against overloads, short circuits, and earth faults.
        </p>
        <p>
          Modern consumer units contain MCBs (miniature circuit breakers) that trip automatically
          when they detect a fault, and RCDs (residual current devices) or RCBOs that detect earth
          leakage and disconnect the circuit in milliseconds to prevent electric shock.
        </p>
        <p>
          If your consumer unit still has rewirable fuses (wire fuse carriers), a wooden back board,
          or no RCD protection, it is seriously outdated. A{' '}
          <SEOInternalLink href="/guides/consumer-unit-upgrade">
            consumer unit upgrade
          </SEOInternalLink>{' '}
          is one of the most important electrical safety improvements you can make to your home.
          Since Amendment 3 to BS 7671, all new consumer units must be in a non-combustible (metal)
          enclosure and have RCD protection on all circuits.
        </p>
        <p>
          You should know the location of your consumer unit, how to identify which circuit breaker
          controls which circuit, and how to reset a tripped breaker. Label the circuits clearly —
          your electrician should do this as part of any inspection or installation work.
        </p>
      </>
    ),
  },
  {
    id: 'outdoor-electrics',
    heading: 'Outdoor Electrics and Garden Safety',
    content: (
      <>
        <p>
          Outdoor electrical installations — garden lighting, power supplies to sheds and
          outbuildings, hot tubs, and EV chargers — require particular attention to safety. Water
          and electricity are a dangerous combination, and outdoor installations are exposed to
          weather, physical damage, and moisture ingress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All outdoor circuits must have 30mA RCD protection</strong> — this is a
                non-negotiable requirement of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP-rated enclosures and accessories</strong> — outdoor sockets, junction
                boxes, and light fittings must have an appropriate IP rating (typically IP65 or
                IP66) to prevent water ingress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable or protected conduit</strong> — buried cables must be steel wire
                armoured (SWA) or run in suitable protective conduit at a minimum depth of 500mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separate circuit for outbuildings</strong> — a supply to a shed, garage, or
                summerhouse should be on its own dedicated circuit from the consumer unit with its
                own overcurrent and RCD protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Installing outdoor electrics is always notifiable work under Part P. Do not attempt to run
          a cable from the house to the garden yourself — a qualified electrician will design the
          circuit correctly and issue the appropriate certificate.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Homeowner Work Made Efficient',
    content: (
      <>
        <p>
          Domestic work for homeowners — EICRs, consumer unit upgrades, additional circuits, outdoor
          supplies, smoke alarm installations — is steady, reliable work. Homeowners increasingly
          understand the importance of electrical safety, and many are proactively booking periodic
          inspections.
        </p>
        <p>
          The key to profitability in homeowner work is completing the job end-to-end on site:
          inspection, report, certificate, quote for any follow-up work, and invoice — all before
          you leave. This is exactly what Elec-Mate is designed to do.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit and let the AI read the MCB ratings, circuit
                  descriptions, and board layout. The EICR schedule is half-completed before you
                  pick up the test leads.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Remedial Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Found a missing earth bond or an outdated consumer unit? The remedial works
                  estimator prices the fix — materials, labour, and margin — and generates a
                  professional quote the homeowner can approve on the spot.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete homeowner jobs faster with Elec-Mate"
          description="Join 430+ UK electricians completing EICR certificates, minor works, and remedial quotes on their phones. AI board scanner, voice test entry, and instant PDF delivery. 7-day free trial."
          icon={Camera}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSafetyAtHomePage() {
  return (
    <GuideTemplate
      title="Electrical Safety at Home | Consumer Guide UK"
      description="Complete guide to electrical safety at home. Warning signs of dangerous wiring, DIY limits under Part P, when to call an electrician, EICR for homeowners, smoke alarms, and consumer unit safety."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Consumer Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Electrical Safety at Home:{' '}
          <span className="text-yellow-400">The Complete Consumer Guide</span>
        </>
      }
      heroSubtitle="Electrical faults cause around 14,000 house fires in the UK every year. This guide explains the warning signs you should never ignore, what you can safely do yourself, when you must call a qualified electrician, and how to protect your home and family."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Safety at Home"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional EICR certificates, minor works, and remedial quotes with AI-powered tools. 7-day free trial, cancel anytime."
    />
  );
}
