import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  CloudLightning,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Phone,
  Zap,
  Droplets,
  Cable,
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Power,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-tips' },
  { label: 'Storm Damage Electrical Safety', href: '/guides/storm-damage-electrical-safety' },
];

const tocItems = [
  { id: 'overview', label: 'Storm Damage and Electrical Safety' },
  { id: 'downed-power-lines', label: 'Downed Power Lines — Call 105' },
  { id: 'water-ingress', label: 'Water Ingress in Consumer Units' },
  { id: 'emergency-isolation', label: 'Emergency Isolation Procedure' },
  { id: 'dno-vs-electrician', label: 'When to Call the DNO vs an Electrician' },
  { id: 'after-the-storm', label: 'After the Storm — What to Check' },
  { id: 'spd-protection', label: 'Surge Protection (SPDs)' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'If you see a downed power line, stay at least 10 metres away, keep others away, and call 105 (the national power cut and emergency number) or 999 if there is immediate danger to life. Never touch or approach a fallen power line — it may still be live.',
  'Water ingress into a consumer unit or distribution board is an emergency. Do not touch the board if there is visible water. Isolate the supply at the main switch only if it is safe to do so — otherwise wait for the DNO or a qualified electrician.',
  'After a storm, a full inspection of the electrical installation may be needed — especially if the property has suffered water ingress, structural damage, or a lightning strike. An EICR will identify any damage.',
  'The DNO (Distribution Network Operator) is responsible for the supply up to and including the meter. An electrician is responsible for everything after the meter — the consumer unit, circuits, and all fixed wiring.',
  'Surge protection devices (SPDs) protect electrical installations from transient overvoltages caused by lightning strikes and switching surges. BS 7671 Chapter 44 sets out the requirements for SPD installation.',
];

const faqs = [
  {
    question: 'What should I do if I see a downed power line after a storm?',
    answer:
      'Stay at least 10 metres away from the downed line and any objects it is touching (fences, vehicles, puddles). Assume the line is live — even if it appears dead, it may be automatically re-energised. Keep other people and animals away. Call 105 (the national power cut and emergency number) to report the downed line to your local Distribution Network Operator (DNO). If there is immediate danger to life — for example, a line has fallen on a vehicle with someone inside — call 999. Do not attempt to move the line or any debris in contact with it. The DNO will send an emergency team to make the line safe.',
  },
  {
    question: 'What is 105 and when should I call it?',
    answer:
      '105 is the national power cut and electricity emergency number. It connects you to your local Distribution Network Operator (DNO). Call 105 to report: downed power lines, damage to electricity poles or overhead lines, damage to substations or street-level cabinets, power cuts affecting your area, or any situation where the electricity network infrastructure appears damaged. The service is free from landlines and most mobiles and operates 24 hours a day, 7 days a week. For gas emergencies, call 0800 111 999 (the National Gas Emergency Service), not 105.',
  },
  {
    question: 'Can water damage a consumer unit?',
    answer:
      'Yes. Water ingress into a consumer unit is dangerous and can cause short circuits, earth faults, corrosion of bus bars and connections, and failure of protective devices (MCBs, RCDs, RCBOs). If water has entered the consumer unit — from a roof leak, flooding, or storm damage — do not open the cover and do not operate the switches. If you can safely reach the main switch without touching any wet surfaces, switch it off. Otherwise, call the DNO on 105 to request an emergency disconnection at the meter or cutout. A qualified electrician must inspect the consumer unit and all affected circuits before the supply is restored.',
  },
  {
    question: 'When should I call the DNO and when should I call an electrician?',
    answer:
      'Call the DNO (via 105) if the problem is with the supply infrastructure: downed overhead lines, damaged poles, damaged underground cables, a power cut affecting multiple properties, damage to the meter or cutout (the main fuse before your meter), or if you need an emergency disconnection. Call a qualified electrician if the problem is with your installation: damage to the consumer unit, damage to fixed wiring, circuits tripping after the storm, burning smells from sockets or switches, visible damage to the installation, or if you need an EICR after storm damage. If you are unsure, call 105 first — they will advise whether the issue is on the network side or the customer side.',
  },
  {
    question: 'Should I get an EICR after storm damage?',
    answer:
      'Yes, if the property has suffered significant water ingress, structural damage, or a lightning strike. An Electrical Installation Condition Report (EICR) will identify any damage to the installation that is not visible — for example, reduced insulation resistance due to moisture, damage to concealed wiring from structural movement, or surge damage to protective devices. The EICR should be carried out by a qualified electrician once the property is dried out and safe to inspect. This report is also valuable for insurance claims, as it provides an independent assessment of the electrical damage.',
  },
  {
    question: 'Do I need surge protection (SPDs) after a lightning strike?',
    answer:
      'If a lightning strike has damaged equipment in the property, installing SPDs (Surge Protection Devices) is strongly recommended to protect against future events. BS 7671 Chapter 44 requires a risk assessment to determine whether SPDs are needed. In practice, SPDs are required in most new installations and should be considered for any installation where the consequence of overvoltage would be significant — for example, properties with expensive electronic equipment, medical equipment, or fire and security systems. An SPD at the consumer unit (Type 1 or Type 2) provides whole-house protection against transient overvoltages.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/spd-surge-protection',
    title: 'SPD Surge Protection Guide',
    description: 'Complete guide to surge protection devices, BS 7671 Chapter 44 requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-emergency',
    title: 'Electrical Emergency Guide',
    description: 'What to do in an electrical emergency — shock, fire, and power failure.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description: 'TN-S, TN-C-S, and TT earthing systems explained.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical inspection condition reports on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Current regulations for consumer unit installation and replacement.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules.',
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
    heading: 'Storm Damage and Electrical Safety',
    content: (
      <>
        <p>
          Storms cause some of the most dangerous electrical situations homeowners and electricians
          encounter. High winds bring down overhead power lines, heavy rain forces water into
          consumer units and wiring enclosures, lightning strikes damage surge-sensitive equipment,
          and structural damage to buildings can sever or expose fixed wiring.
        </p>
        <p>
          Knowing what to do — and what not to do — in the immediate aftermath of a storm can
          prevent serious injury or death. This guide covers the essential safety steps: dealing
          with downed power lines, water ingress in consumer units, emergency isolation procedures,
          and when to call the DNO versus a qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'downed-power-lines',
    heading: 'Downed Power Lines — Call 105',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-lg mb-2">DANGER — Downed Power Lines</h3>
              <ul className="space-y-3 text-white text-sm leading-relaxed">
                <li>
                  <strong>Stay at least 10 metres away.</strong> Electricity can arc through the
                  ground — do not walk near a downed line, even if it appears dead.
                </li>
                <li>
                  <strong>Assume it is live.</strong> Overhead lines carry 11,000V or more. Even
                  low-voltage service cables carry 230V, which is lethal. Automatic re-closers on
                  the network can re-energise a line without warning.
                </li>
                <li>
                  <strong>Do not touch anything in contact with the line.</strong> Fences, vehicles,
                  puddles, and debris can all conduct electricity from a downed line.
                </li>
                <li>
                  <strong>Call 105</strong> to report the downed line to your DNO. If there is
                  immediate danger to life, call <strong>999</strong>.
                </li>
                <li>
                  <strong>Keep others away.</strong> If possible, stand at a safe distance and warn
                  people not to approach until the DNO arrives.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          If you are in a vehicle that has a power line on it or touching it, stay inside the
          vehicle. The tyres insulate you from the ground. Call 999 and wait for the DNO to
          de-energise the line. Only leave the vehicle if it is on fire — in that case, jump clear
          (do not step out) and shuffle away with small steps to avoid step potential.
        </p>
      </>
    ),
  },
  {
    id: 'water-ingress',
    heading: 'Water Ingress in Consumer Units',
    content: (
      <>
        <p>
          Water entering a consumer unit or distribution board is a serious electrical hazard. Storm
          damage to roofs, walls, or external enclosures can allow rainwater to reach the electrical
          installation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not open the consumer unit cover</strong> if water is visible on or
                around the board. Water on live bus bars creates a shock and short-circuit risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not operate switches</strong> if the board is wet. Switching under fault
                conditions can cause arcing and further damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the main switch is accessible and dry</strong>, switch it off to isolate
                the installation. If you cannot safely reach the main switch, call 105 and request
                an emergency disconnection at the cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call a qualified electrician</strong> to inspect the consumer unit and all
                affected circuits once the water source has been stopped and the area is dry enough
                to work safely.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A consumer unit that has been exposed to water will typically need to be replaced. Water
          causes corrosion of bus bars, terminals, and the contacts inside MCBs and RCDs, which
          may not be immediately visible but will cause failure over time.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-isolation',
    heading: 'Emergency Isolation Procedure',
    content: (
      <>
        <p>
          In a storm damage situation, you may need to isolate the electrical supply to make the
          property safe. The correct procedure depends on the nature of the emergency:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch isolation</strong> — the main switch on the consumer unit
                disconnects the installation from the supply. This is the first action if the
                consumer unit is accessible and safe to operate. Turn the main switch to OFF.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual circuit isolation</strong> — if only one circuit is affected (for
                example, a socket circuit with water damage), switch off the relevant MCB or RCBO.
                This preserves power to unaffected circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO disconnection</strong> — if the consumer unit is not safe to touch, or
                if the damage is to the supply side (meter, cutout, service cable), call 105 and
                request an emergency disconnection. The DNO will attend and pull the main fuse at
                the cutout.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Never touch electrical equipment while standing in water.</strong> If the
              property is flooded, do not enter it to access the consumer unit. Wait for the DNO to
              disconnect the supply at the cutout or the meter.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-vs-electrician',
    heading: 'When to Call the DNO vs an Electrician',
    content: (
      <>
        <p>
          Understanding the boundary between the DNO (Distribution Network Operator) responsibility
          and your installation is important. The boundary is at the meter:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Call the DNO (105)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Downed overhead power lines</li>
              <li>Damaged electricity poles or pylons</li>
              <li>Damage to the service cable (underground or overhead)</li>
              <li>Damage to the meter or cutout</li>
              <li>Power cut affecting multiple properties</li>
              <li>Emergency disconnection needed</li>
              <li>Damage to substations or street cabinets</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Call an Electrician</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Water damage to the consumer unit</li>
              <li>Circuits tripping after the storm</li>
              <li>Burning smell from sockets or switches</li>
              <li>Visible damage to fixed wiring</li>
              <li>Exposed cables from structural damage</li>
              <li>EICR required after storm damage</li>
              <li>Consumer unit replacement needed</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'after-the-storm',
    heading: 'After the Storm — What to Check',
    content: (
      <>
        <p>
          Once the storm has passed and the immediate dangers are addressed, a systematic check of
          the electrical installation is needed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Check the consumer unit for signs of water ingress, burn marks, or damage to the
                enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test the RCD by pressing the test button. If it does not trip, it has failed and
                must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Check for any circuits that have tripped and will not reset — this indicates a
                fault on the circuit that needs investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Inspect visible wiring, sockets, switches, and light fittings for damage, water
                staining, or discolouration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Check outdoor installations — garden lighting, external sockets, EV chargers — for
                physical damage from wind or debris.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If the property has suffered significant damage, arrange an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> to provide a
                formal assessment of the installation condition.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'spd-protection',
    heading: 'Surge Protection (SPDs)',
    content: (
      <>
        <p>
          Lightning strikes — even nearby strikes that do not directly hit the property — cause
          transient overvoltages that can damage electronic equipment, protective devices, and
          fixed wiring. Surge Protection Devices (SPDs) are designed to divert these transient
          overvoltages safely to earth.
        </p>
        <p>
          BS 7671 Chapter 44 requires a risk assessment to determine whether SPDs are needed. In
          practice, SPDs are now required in most new installations and are strongly recommended for
          existing installations, particularly:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Properties in areas with frequent thunderstorm activity</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Properties with overhead supply lines (more exposed to lightning-induced surges)</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Properties with expensive or sensitive electronic equipment</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Properties with fire alarm, intruder alarm, or telecare systems</span>
            </li>
          </ul>
        </div>
        <p>
          For a detailed guide to SPD selection and installation, see the{' '}
          <SEOInternalLink href="/guides/spd-surge-protection">SPD Surge Protection Guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Storm Damage Response',
    content: (
      <>
        <p>
          Storm damage creates urgent demand for qualified electricians. Being prepared to respond
          quickly and professionally — with the right tools, certificates, and processes — sets you
          apart.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete post-storm{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    EICR certificates
                  </SEOInternalLink>{' '}
                  on site. Document the damage, record observations, and send the report to the
                  customer and their insurance company immediately.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Emergency Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink>{' '}
                  to provide an itemised quote for repair work on site. Consumer unit replacement,
                  rewiring damaged sections, SPD installation — all priced and sent to the customer
                  within minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Respond to storm damage with confidence"
          description="Elec-Mate gives you EICR certificates, quoting, and cable sizing on your phone. Be the electrician that customers call when they need help most. 7-day free trial."
          icon={CloudLightning}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function StormDamageElectricalPage() {
  return (
    <GuideTemplate
      title="Storm Damage Electrical Safety | Emergency Guide UK"
      description="What to do about electrical damage after a storm. Downed power lines (call 105), water ingress in consumer units, emergency isolation, when to call the DNO vs an electrician, and surge protection. Essential safety advice."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emergency Safety Guide"
      badgeIcon={CloudLightning}
      heroTitle={
        <>
          Storm Damage Electrical Safety:{' '}
          <span className="text-yellow-400">What to Do and Who to Call</span>
        </>
      }
      heroSubtitle="Storms cause downed power lines, water ingress in consumer units, and surge damage to electrical installations. This guide covers the essential safety steps — who to call, how to isolate safely, and when you need a qualified electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Storm Damage and Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Be Ready for Storm Call-Outs"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICR certificates, quoting, and cable sizing. Respond to storm damage call-outs with professional tools on your phone. 7-day free trial."
    />
  );
}
