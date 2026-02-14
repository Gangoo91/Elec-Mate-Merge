import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Phone,
  Shield,
  ShieldCheck,
  FileCheck2,
  Search,
  Home,
  Droplets,
  Flame,
  Power,
  ClipboardCheck,
  GraduationCap,
  Send,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Electrical Emergency', href: '/guides/electrical-emergency-what-to-do' },
];

const tocItems = [
  { id: 'recognise-emergency', label: 'Recognising an Electrical Emergency' },
  { id: 'power-cut', label: 'Power Cut: What to Do' },
  { id: 'burning-smell', label: 'Burning Smell or Sparking' },
  { id: 'electric-shock', label: 'Electric Shock' },
  { id: 'flooding', label: 'Flooding and Electrics' },
  { id: 'who-to-call', label: 'Who to Call: 999, DNO, or Electrician' },
  { id: 'safe-isolation', label: 'How to Isolate at the Consumer Unit' },
  { id: 'after-emergency', label: 'After the Emergency' },
  { id: 'for-electricians', label: 'For Electricians: Emergency Call-Outs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'In a life-threatening electrical emergency — electric shock with a casualty, fire, or imminent danger to life — always call 999 first.',
  'For a power cut affecting your area, contact your local Distribution Network Operator (DNO) on 105 — this is a free national number that routes to your local DNO automatically.',
  'If you smell burning with no obvious source, or see sparking from a socket or the consumer unit, isolate the circuit at the consumer unit (or the main switch if unsure) and call a qualified electrician.',
  'Never touch a person receiving an electric shock until the supply is disconnected — use a non-conductive object (wooden broom handle, dry towel) to separate them from the source if you cannot reach the isolator.',
  'Elec-Mate helps electricians document emergency call-out work with on-site certificates, photo evidence capture, and instant delivery of reports to the customer.',
];

const faqs = [
  {
    question: 'What number do I call for a power cut?',
    answer:
      "Call 105. This is a free national number that automatically routes you to your local Distribution Network Operator (DNO). The DNO is responsible for the electricity network in your area — the cables, substations, and infrastructure that deliver power to your meter. They will be able to tell you if there is a known fault in your area, give you an estimated restoration time, and dispatch an engineer if necessary. You can also report a power cut online through your DNO's website. The main DNOs in the UK are: UK Power Networks (South East, East, and London), Western Power Distribution (South West, Midlands, and Wales), Northern Powergrid (North East and Yorkshire), Scottish Power Energy Networks (Central and Southern Scotland and North Wales), and SSE Networks (Northern Scotland). If the power cut is only affecting your property (your neighbours still have power), the fault is likely on your side of the meter and you need to call a qualified electrician rather than the DNO.",
  },
  {
    question: 'What should I do if I smell burning from a socket or switch?',
    answer:
      'A burning smell from a socket, switch, or the consumer unit is a serious warning sign that should not be ignored. Stop using the affected accessory immediately. If you can identify which circuit it is on, switch off the relevant circuit breaker at the consumer unit. If you are not sure which circuit to isolate, turn off the main switch to disconnect the entire installation. Do not attempt to remove the socket faceplate or investigate the source of the smell yourself — there may be an arcing fault behind the wall that could be dangerous. Open windows to ventilate the room. If you see smoke, flames, or the smell is intense, call 999 and evacuate the property. If there is no fire and the smell subsides once the circuit is isolated, call a qualified electrician to attend as soon as possible. The electrician will carry out fault finding to identify the cause — which could be a loose connection, overloaded circuit, damaged cable, or an arcing fault.',
  },
  {
    question: 'Can I use water to put out an electrical fire?',
    answer:
      'No. Never use water on an electrical fire. Water conducts electricity, and using water on a fire involving live electrical equipment could give you a fatal electric shock. If the fire is small and you have access to a suitable fire extinguisher, use a CO2 (carbon dioxide) extinguisher or a dry powder extinguisher — both are safe for use on electrical fires. Do not use foam or water extinguishers. If you do not have a suitable extinguisher, or if the fire is spreading, evacuate the property immediately, close doors behind you to slow the fire, and call 999. Only attempt to tackle the fire if you can do so safely without putting yourself at risk. If possible, isolate the electricity supply at the main switch or consumer unit before attempting to fight the fire — but only if you can reach the consumer unit safely without passing through the fire.',
  },
  {
    question: 'How do I know if someone has had an electric shock?',
    answer:
      'Signs of electric shock include: the person being thrown or knocked back from the electrical source; visible burns on the skin (particularly at the entry and exit points of the current); muscle spasms or rigidity; loss of consciousness; difficulty breathing or stopped breathing; irregular heartbeat or cardiac arrest; confusion or disorientation; and in severe cases, no pulse. Even a mild electric shock that produces only a tingling sensation should be taken seriously, as internal injuries may not be immediately apparent. Electric current can cause cardiac arrhythmia that may not manifest until hours after the shock. Anyone who has received an electric shock — particularly from the mains supply (230V) — should seek medical assessment, even if they feel fine immediately afterwards. Call 999 for any shock involving loss of consciousness, burns, difficulty breathing, or where the person does not feel well.',
  },
  {
    question: 'What should I do if my house floods and the electrics are affected?',
    answer:
      'If your house floods and water is in contact with or close to electrical equipment, sockets, or the consumer unit, do not wade through the water or touch any electrical equipment. If you can safely reach the consumer unit without touching water, turn off the main switch to isolate the entire installation. If you cannot safely reach the consumer unit, contact your DNO on 105 and ask them to disconnect the supply at the meter or cut-out. Once the supply is disconnected and the floodwater has receded, do not attempt to restore the supply yourself. A qualified electrician must inspect and test the entire installation before the supply can be safely reconnected. Water damage can compromise cable insulation, cause corrosion in connections, and create dangerous earth fault paths. The electrician will carry out insulation resistance testing, continuity testing, and a full visual inspection. Depending on the extent of the water damage, some or all of the installation may need to be replaced. An EICR will be issued once the installation is confirmed safe.',
  },
  {
    question: 'Should I turn off the main switch if I hear buzzing from the consumer unit?',
    answer:
      'A persistent buzzing or humming noise from the consumer unit can indicate a loose connection, an overloaded circuit, or an arcing fault — all of which are potentially dangerous. If the buzzing is accompanied by a burning smell, warmth on the consumer unit enclosure, or any visible signs of damage (scorch marks, melting, discolouration), turn off the main switch immediately and call a qualified electrician. If the buzzing is faint and there are no other warning signs, it is less urgent but should still be investigated promptly. In the meantime, avoid switching circuits on and off at the consumer unit as this could exacerbate a loose connection. Do not remove the consumer unit cover — the internal busbars and connections are live and dangerous. A qualified electrician will isolate the supply, remove the cover safely, and inspect the internal connections, busbars, and terminal screws. Common causes include loose terminal connections that have not been torqued correctly, a failing MCB or RCD, or a high-resistance connection on a busbar.',
  },
  {
    question: 'Is it safe to use candles during a power cut?',
    answer:
      "Candles can be used during a power cut, but they present a fire risk and should be used with care. Place candles on a stable, heat-resistant surface away from curtains, furniture, paper, and other combustible materials. Never leave a candle unattended, and keep them out of reach of children and pets. Safer alternatives include battery-operated LED torches, head torches, and LED lanterns. Keep a torch with fresh batteries in an accessible location so you can find it easily during a power cut. Avoid using gas camping stoves or barbecues indoors — these produce carbon monoxide and are a serious risk of poisoning in an enclosed space. If you have a battery-powered radio, use it to listen for updates from your DNO or local news. Most power cuts are resolved within a few hours, but if you depend on electricity for medical equipment, register with your DNO's Priority Services Register so they can prioritise your restoration.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description: 'When to call an electrician, DIY limits, danger signs, and EICR for homeowners.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure for electricians — GS38, proving units, and lock-off.',
    icon: Shield,
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
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Why your RCD trips, how to identify the faulty circuit, and when to call an electrician.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Guide',
    description:
      'Systematic fault finding methods — half-split technique, logical process, and test equipment.',
    icon: Search,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'recognise-emergency',
    heading: 'How to Recognise an Electrical Emergency',
    content: (
      <>
        <p>
          An electrical emergency is any situation involving electricity that poses an immediate
          risk to life, property, or safety. Knowing how to recognise one — and what to do in the
          first few seconds — can prevent injury, death, or a house fire.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Someone is receiving an electric shock</strong> — they may be unable to let
                go of the source. This is a life-threatening emergency requiring immediate action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire or smoke from electrical equipment</strong> — a burning smell, visible
                flames, or smoke from a socket, switch, consumer unit, or appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fallen power lines or damaged overhead cables</strong> — stay at least 30
                metres away. Do not approach, do not touch, and do not attempt to move the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flooding in contact with electrical equipment</strong> — water and
                electricity are a lethal combination. Do not enter flooded areas where electrics may
                be affected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arcing, sparking, or explosion from the consumer unit</strong> — this
                indicates a serious fault such as a short circuit, failed busbar, or arc flash.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In any of these situations, your first priority is personal safety. Do not put yourself at
          risk to help someone else — you cannot help if you become a second casualty.
        </p>
      </>
    ),
  },
  {
    id: 'power-cut',
    heading: 'Power Cut: What to Do Step by Step',
    content: (
      <>
        <p>
          A power cut can be alarming, but in most cases it is not dangerous. The key is to
          determine whether the power cut affects your area (a network fault) or just your property
          (an internal fault).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check your neighbours.</strong> Can you see lights in neighbouring properties?
              If the whole street is dark, it is a network fault — call your DNO on 105.
            </li>
            <li>
              <strong>Check your consumer unit.</strong> Has the main switch, an MCB, or the RCD
              tripped? If so, try resetting it once. If it trips again immediately, there is a fault
              — do not keep resetting it.
            </li>
            <li>
              <strong>Check your prepayment meter.</strong> If you have a prepayment meter, check
              you have credit. A depleted meter will cut off the supply.
            </li>
            <li>
              <strong>Call 105 for a network fault.</strong> The 105 number is free and routes
              automatically to your local DNO. They will tell you if there is a known fault and give
              an estimated restoration time.
            </li>
            <li>
              <strong>Call an electrician for an internal fault.</strong> If the power cut only
              affects your property and you cannot restore the supply by resetting the consumer
              unit, call a qualified electrician.
            </li>
          </ol>
        </div>
        <p>
          During a power cut, unplug sensitive equipment (computers, TVs) to protect them from
          voltage surges when the power is restored. Keep fridge and freezer doors closed to
          preserve the cold — a full freezer will stay frozen for approximately 24 hours.
        </p>
      </>
    ),
  },
  {
    id: 'burning-smell',
    heading: 'Burning Smell or Sparking: Immediate Actions',
    content: (
      <>
        <p>
          A burning smell, sparking, or scorch marks associated with the electrical installation are
          serious warning signs. These indicate an active fault — typically an arcing connection,
          overloaded circuit, or damaged cable — that can cause a fire.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stop using the affected equipment immediately.</strong> Unplug any appliance
                that is sparking or producing a burning smell.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolate the circuit at the consumer unit.</strong> If you can identify which
                circuit breaker controls the affected circuit, switch it off. If you are not sure,
                turn off the main switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not touch anything that appears damaged.</strong> Melted plastic, scorch
                marks, or exposed conductors are all signs of a serious fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ventilate the room.</strong> Open windows and doors to clear any smoke or
                fumes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>If there is fire — call 999 and evacuate.</strong> Do not attempt to fight
                an electrical fire with water. Use a CO2 or dry powder extinguisher only if it is
                safe to do so.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Once the immediate danger is past, call a qualified electrician. Do not restore the supply
          until the fault has been found and repaired. The electrician will carry out{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding-guide">
            systematic fault finding
          </SEOInternalLink>{' '}
          to identify the root cause.
        </p>
      </>
    ),
  },
  {
    id: 'electric-shock',
    heading: 'Electric Shock: What to Do',
    content: (
      <>
        <p>
          Electric shock occurs when a person becomes part of an electrical circuit — current flows
          through their body. The severity depends on the voltage, the current, the duration of
          contact, and the path the current takes through the body. Mains voltage (230V) can kill.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">If Someone Is Receiving a Shock</h3>
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Do NOT touch the person.</strong> You will become a second casualty. The
              person may be gripping the source and unable to let go.
            </li>
            <li>
              <strong>Disconnect the supply.</strong> Switch off at the socket, pull the plug, or
              turn off the circuit breaker or main switch at the consumer unit — whichever is
              quickest and safest.
            </li>
            <li>
              <strong>If you cannot disconnect the supply,</strong> use a dry, non-conductive object
              (wooden broom handle, rolled-up newspaper, dry towel) to push or pull the person away
              from the source. Stand on dry, insulating material if possible.
            </li>
            <li>
              <strong>Call 999 immediately.</strong> Electric shock is a medical emergency.
            </li>
            <li>
              <strong>If the person is unconscious, not breathing, or has no pulse,</strong> start
              CPR immediately while waiting for the ambulance.
            </li>
            <li>
              <strong>Even if the person seems fine,</strong> they should be assessed at hospital.
              Internal injuries and cardiac arrhythmia may not be immediately apparent.
            </li>
          </ol>
        </div>
        <p>
          After any electric shock incident, the electrical installation must be inspected and
          tested by a qualified electrician before the supply is restored. The cause of the shock —
          which could be a faulty appliance, failed earthing, damaged insulation, or a missing RCD —
          must be identified and rectified.
        </p>
      </>
    ),
  },
  {
    id: 'flooding',
    heading: 'Flooding and Electrics: Critical Safety Steps',
    content: (
      <>
        <p>
          Flooding creates an extremely dangerous situation with electrical installations. Water is
          a conductor, and floodwater in contact with sockets, cables, or the consumer unit can
          create a lethal shock hazard and fire risk.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not enter a flooded room if electrics may be affected.</strong> Water on
                the floor near sockets or cables could be live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  If you can safely reach the consumer unit, turn off the main switch.
                </strong>{' '}
                Only do this if the consumer unit is above the water level and you can reach it
                without standing in water.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you cannot safely isolate, call 105.</strong> Ask your DNO to disconnect
                the supply at the meter or cut-out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not restore the supply yourself after flooding.</strong> A qualified
                electrician must inspect and test the entire installation before reconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Expect the installation to need significant work.</strong> Floodwater
                damages cable insulation, corrodes connections, and contaminates accessories. Some
                or all of the installation may need replacing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After a flood, the electrician will carry out comprehensive{' '}
          <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
            insulation resistance testing
          </SEOInternalLink>{' '}
          on every circuit, inspect all accessories and junction boxes for water damage, and verify
          the earthing and bonding. An{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> will be issued
          once the installation is confirmed safe.
        </p>
      </>
    ),
  },
  {
    id: 'who-to-call',
    heading: 'Who to Call: 999, DNO, or Electrician',
    content: (
      <>
        <p>
          In an electrical emergency, knowing who to call — and in what order — saves time and can
          save lives.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Call 999 — Life-Threatening Emergency</h4>
                <p className="text-white text-sm leading-relaxed">
                  Electric shock casualty, fire, fallen power lines, explosion, or any situation
                  where someone is in immediate danger. The fire service can also isolate the
                  electricity supply in an emergency.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Power className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Call 105 — Power Cut or Network Fault</h4>
                <p className="text-white text-sm leading-relaxed">
                  Area-wide power cut, damaged street furniture (substations, lamp columns, junction
                  pillboxes), exposed underground cables, or any fault on the electricity network.
                  Free call, routes to your local DNO automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Call a Qualified Electrician — Internal Fault
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Tripping RCDs or circuit breakers, burning smell with no fire, warm sockets,
                  flickering lights, isolated power loss to your property only, post-flood
                  inspection. Look for a{' '}
                  <SEOInternalLink href="/guides/why-choose-niceic-electrician">
                    NICEIC or NAPIT registered
                  </SEOInternalLink>{' '}
                  electrician for emergency call-outs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          If you are unsure, err on the side of caution. It is always better to call 999 and find
          out it was not necessary than to delay and risk someone's life.
        </p>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'How to Isolate at the Consumer Unit',
    content: (
      <>
        <p>
          In many electrical emergencies, the most important thing a homeowner can do — before
          calling for help — is isolate the supply at the consumer unit (fuse box). This removes the
          power and makes the situation safe until a professional arrives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know where your consumer unit is.</strong> It is typically in the hallway,
                under the stairs, in a cupboard, or in the garage. Find it now, before you need it
                in an emergency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The main switch</strong> is the large switch (usually red or labelled
                "MAIN") at the top or side of the consumer unit. Switching this off disconnects the
                entire installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual circuit breakers (MCBs)</strong> control individual circuits. If
                you know which circuit is affected, you can switch off just that MCB without losing
                power to the rest of the house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>If the RCD has tripped,</strong> try resetting it once. If it trips again
                immediately, there is a fault on one of the circuits it protects. Do not keep
                resetting it — call an electrician.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Important: the consumer unit does not disconnect the supply between the meter and the
          consumer unit itself. The meter tails remain live even when the main switch is off. Only
          the DNO can disconnect the supply at the meter or cut-out.
        </p>
      </>
    ),
  },
  {
    id: 'after-emergency',
    heading: 'After the Emergency: What Happens Next',
    content: (
      <>
        <p>
          Once the immediate emergency is resolved, you need a qualified electrician to inspect the
          installation, identify and repair the fault, and certify that the installation is safe
          before the full supply is restored.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding and repair</strong> — the electrician will systematically test
                the installation to locate the fault. This may involve insulation resistance
                testing, continuity testing, and visual inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificate issued</strong> — the electrician will issue a Minor Works
                Certificate or Electrical Installation Certificate for the repair work. If a full
                inspection is needed, an{' '}
                <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> will be
                produced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance claim</strong> — if the emergency caused damage, contact your home
                insurance provider. Keep the electrician's report, photographs, and any receipts as
                evidence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep all certificates and reports from the emergency and subsequent repair work. These are
          important for your records, for insurance claims, and for future reference when selling or
          letting the property.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Handling Emergency Call-Outs',
    content: (
      <>
        <p>
          Emergency call-outs are high-pressure situations where speed, competence, and
          professionalism matter most. The homeowner is stressed, the fault may be dangerous, and
          you need to diagnose, repair, certify, and invoice — often in a single visit.
        </p>
        <p>Elec-Mate streamlines the entire emergency call-out workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document the Fault</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the fault, the consumer unit, and the affected area. Elec-Mate stores
                  all photos with the job record — ready for the certificate, the customer, and any
                  insurance claim.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate and Invoice on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Minor Works Certificate or EIC on your phone, send the professional
                  PDF to the customer by email or WhatsApp, and generate the invoice — all before
                  you leave. No desk time, no chasing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Handle emergency call-outs professionally"
          description="Join 430+ UK electricians using Elec-Mate for on-site certificates, fault documentation, and instant invoicing. Complete the job from fault to certificate in a single visit. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalEmergencyPage() {
  return (
    <GuideTemplate
      title="Electrical Emergency | What to Do & Who to Call UK"
      description="Complete guide to electrical emergencies in the UK. What to do during a power cut, burning smell, electric shock, or flooding. When to call 999, your DNO on 105, or a qualified electrician."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emergency Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Electrical Emergency: <span className="text-yellow-400">What to Do and Who to Call</span>
        </>
      }
      heroSubtitle="Power cut, burning smell, electric shock, flooding — electrical emergencies require fast, correct action. This guide explains exactly what to do in each situation, who to call, and how to keep yourself and your family safe until help arrives."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Emergencies"
      relatedPages={relatedPages}
      ctaHeading="Professional Emergency Certificates on Site"
      ctaSubheading="Join 430+ UK electricians completing certificates, fault documentation, and invoices on their phones — even on emergency call-outs. 7-day free trial, cancel anytime."
    />
  );
}
