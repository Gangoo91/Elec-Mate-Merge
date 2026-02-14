import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Power,
  Phone,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Home,
  Lightbulb,
  FileCheck2,
  Search,
  GraduationCap,
  ClipboardCheck,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Power Cut', href: '/guides/power-cut-what-to-do' },
];

const tocItems = [
  { id: 'what-is-power-cut', label: 'What Is a Power Cut?' },
  { id: 'first-steps', label: 'First Steps When the Power Goes Off' },
  { id: 'check-consumer-unit', label: 'Check Your Consumer Unit' },
  { id: 'call-105', label: 'Call 105 — the Power Cut Number' },
  { id: 'dno-vs-internal', label: 'DNO Responsibility vs Internal Faults' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'when-to-call-electrician', label: 'When to Call an Electrician' },
  { id: 'preparing-for-power-cuts', label: 'Preparing for Power Cuts' },
  { id: 'for-electricians', label: 'For Electricians: Power Cut Callouts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Check whether the power cut affects just your property or the whole street — if only yours, check the consumer unit (fuse box) for tripped MCBs or RCDs.',
  'Call 105 (free, 24/7) to report a power cut or get updates from your local Distribution Network Operator (DNO). This number works from any phone.',
  'If the DNO supply is fine and your consumer unit keeps tripping, the fault is internal — you need a qualified electrician, not the DNO.',
  'Never touch exposed wiring, open a damaged consumer unit, or attempt to bypass a tripped device. Electricity kills.',
  'Elec-Mate helps electricians diagnose and document faults on site — from tripped RCDs to full EICR inspections — with AI-powered defect classification and instant certificate delivery.',
];

const faqs = [
  {
    question: 'What number do I call for a power cut in the UK?',
    answer:
      'Call 105. This is the free national power cut number that connects you directly to your local Distribution Network Operator (DNO). It works from landlines and mobiles, 24 hours a day, 7 days a week. You do not need to know which DNO covers your area — the 105 service identifies your location and routes the call automatically. You can also report power cuts online through your DNO website. The main DNOs in England, Scotland, and Wales are UK Power Networks (South and East England), Western Power Distribution (now National Grid Electricity Distribution, covering Midlands, South West, and Wales), Northern Powergrid (North East and Yorkshire), Electricity North West, SP Energy Networks (Central and Southern Scotland, Merseyside, North Wales), and Scottish and Southern Electricity Networks (North Scotland and Central Southern England).',
  },
  {
    question: 'Why has only my house lost power?',
    answer:
      'If your neighbours still have power, the problem is almost certainly inside your property. The most common cause is a tripped MCB (Miniature Circuit Breaker) or RCD (Residual Current Device) in your consumer unit. Open the consumer unit cover and check whether any switches are in the down or off position. A tripped RCD will cut power to multiple circuits at once — which is why all the lights and sockets on one side of your board may be dead while the other side works fine. Common triggers include a faulty appliance, water ingress into a socket or junction box, a failed immersion heater element, or a deteriorated cable. If the RCD trips again immediately after you reset it, do not keep trying — there is a live fault on the circuit that needs professional investigation.',
  },
  {
    question: 'Is a power cut dangerous?',
    answer:
      'A power cut from the DNO network is not dangerous in itself, but there are secondary risks. Freezers and fridges will start warming up after about 4 hours. Electric heating and hot water will stop working. Security alarms, medical equipment, and stairlift systems that depend on mains power will stop functioning (unless they have battery backup). If you use a generator, never run it indoors or in an enclosed space — carbon monoxide from petrol and diesel generators kills quickly and silently. Do not use candles near curtains or flammable materials. If you have a gas hob, you can still use it during a power cut (the gas supply is independent of the electricity supply), but electric ignition may not work — you will need a match or lighter. Keep a torch and spare batteries in an accessible location. If you depend on electrically powered medical equipment, register with your DNO as a Priority Services customer — they will give you advance warning of planned outages and prioritise restoration during unplanned cuts.',
  },
  {
    question: 'How long can a power cut last?',
    answer:
      'Most power cuts caused by faults on the DNO network are resolved within 1 to 2 hours. Planned outages (where the DNO is carrying out maintenance or upgrade work) are typically 4 to 8 hours, and the DNO must give you advance notice — usually a letter or card through the door at least 2 working days before the work. In severe weather (storms, flooding, heavy snow), power cuts can last significantly longer — 24 to 48 hours or more in the worst cases. The DNO has a guaranteed standards scheme: if your power is not restored within 12 hours for a normal fault (or 24 hours in severe weather), you may be entitled to compensation. The amount is currently £70 for domestic customers, with an additional £70 for each further 12-hour period without supply. Contact your DNO to claim.',
  },
  {
    question: 'Should I turn off appliances during a power cut?',
    answer:
      'Yes. Turn off and unplug sensitive electrical equipment such as computers, televisions, and washing machines. When the power is restored, there can be a brief surge that may damage sensitive electronics. Leave one light switched on so you know when the power comes back. If you have a freezer, keep the door closed — a full freezer can maintain safe temperatures for about 24 hours if unopened. When the power returns, switch appliances back on one at a time rather than all at once. If the power cut was caused by a tripped RCD in your consumer unit, do not plug the faulty appliance back in — it will trip the RCD again. Identify which appliance caused the trip by unplugging everything and plugging items back in one at a time, resetting the RCD each time, until the faulty appliance trips it.',
  },
  {
    question: 'What is the difference between a power cut and a tripped RCD?',
    answer:
      'A power cut means the electricity supply from the DNO network has been interrupted — this is outside your property and outside your control. A tripped RCD means a protective device inside your consumer unit has detected a fault (typically an earth leakage current exceeding 30mA) and has disconnected the circuit to prevent electric shock. The key difference: a power cut affects the whole property (and usually your neighbours too), while a tripped RCD typically affects only the circuits protected by that RCD — you may still have power on other circuits. You can reset a tripped RCD yourself by pushing the switch back to the on position. If it trips again immediately, there is an active fault that needs investigation by a qualified electrician. Do not tape or wedge an RCD in the on position — it is a life-saving device.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/troubleshooting-electrical-problems',
    title: 'Troubleshooting Electrical Problems',
    description:
      'Step-by-step guide to diagnosing common electrical faults including tripped MCBs, flickering lights, and dead sockets.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations UK',
    description:
      'Current regulations for consumer units including amendment 3 requirements and metal enclosure rules.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Why your RCD keeps tripping and how to identify the faulty circuit or appliance causing it.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-tips',
    title: 'Electrical Safety Tips',
    description:
      '15 essential electrical safety tips every homeowner should know to protect their family.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-find-electrician-uk',
    title: 'How to Find a Good Electrician',
    description:
      'What qualifications to check, questions to ask, and red flags to watch for when hiring an electrician.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-power-cut',
    heading: 'What Is a Power Cut?',
    content: (
      <>
        <p>
          A power cut is any interruption to your electricity supply. It can last a few seconds or
          several days. It can affect a single property, a street, a neighbourhood, or an entire
          region. The cause can be external (a fault on the Distribution Network Operator's network,
          severe weather damage to overhead lines, planned maintenance) or internal (a tripped
          protective device in your own{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
            consumer unit
          </SEOInternalLink>
          , a failed main switch, a fault on your internal wiring).
        </p>
        <p>
          Understanding the difference between an external power cut and an internal fault is the
          single most important thing you can do when the lights go out. An external power cut is
          the DNO's responsibility. An internal fault is your responsibility — and you need a
          qualified electrician to investigate and fix it.
        </p>
        <p>
          This guide covers both scenarios. It tells you exactly what to do, step by step, when you
          lose power — whether the problem is on the network or inside your property.
        </p>
      </>
    ),
  },
  {
    id: 'first-steps',
    heading: 'First Steps When the Power Goes Off',
    content: (
      <>
        <p>When your power goes off unexpectedly, do not panic. Follow these steps in order:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check whether your neighbours have power.</strong> Look out the window. Are
              streetlights on? Do your neighbours have lights? If the whole street is dark, it is an
              external power cut — skip straight to the "Call 105" section below.
            </li>
            <li>
              <strong>Check your prepayment meter (if you have one).</strong> If you are on a
              prepayment meter, check that you have credit. Running out of credit is one of the most
              common reasons for losing power — and it is easily fixed.
            </li>
            <li>
              <strong>Check your consumer unit.</strong> Go to your consumer unit (fuse box) and
              check whether any switches are in the down or off position. This is the most common
              cause of a power loss that affects only your property.
            </li>
            <li>
              <strong>Do not touch anything you are unsure about.</strong> If you see scorch marks,
              smell burning, or see exposed wiring, do not touch the consumer unit. Leave the
              property if necessary and call an electrician.
            </li>
          </ol>
        </div>
        <p>
          These four steps take less than two minutes and will tell you whether the problem is
          external (DNO) or internal (your wiring). That distinction determines everything that
          follows.
        </p>
      </>
    ),
  },
  {
    id: 'check-consumer-unit',
    heading: 'Check Your Consumer Unit (Fuse Box)',
    content: (
      <>
        <p>
          Your consumer unit is the grey or white metal box — usually mounted near the front door,
          under the stairs, or in a cupboard — that contains the main switch, RCDs, and MCBs for
          your property. It is the central control point for your electrical installation.
        </p>
        <p>
          When you open the cover (it usually clips or screws off), you will see rows of switches.
          Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch in the off position.</strong> If the main switch (the big one,
                usually on the left or top) is off, all power to the property is disconnected. Push
                it to the on position. If it trips straight back off, there is a serious fault — do
                not keep trying. Call an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped RCD.</strong> An{' '}
                <SEOInternalLink href="/guides/rcd-keeps-tripping">RCD</SEOInternalLink> protects
                against electric shock by detecting earth leakage current. If an RCD has tripped, it
                will be in the middle or down position. Reset it by pushing it firmly to the on
                position. If it holds, the trip was likely caused by a transient fault. If it trips
                again immediately, there is an active fault on one of the circuits it protects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped MCB.</strong> MCBs (the smaller switches) protect individual
                circuits. A tripped MCB will be in the off or middle position. Reset it by pushing
                it to on. If it trips again, there is a fault on that specific circuit — an
                overload, short circuit, or earth fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old-style rewirable fuses.</strong> If your property has an older fuse box
                with rewirable fuses (ceramic holders with fuse wire), a blown fuse will have broken
                or melted wire. Do not attempt to replace the fuse wire yourself if you are not
                confident — call an electrician. If the fuse box is very old (pre-2000), consider
                having it upgraded to a modern{' '}
                <SEOInternalLink href="/guides/consumer-unit-change-cost-uk">
                  consumer unit
                </SEOInternalLink>{' '}
                with MCBs and RCD protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you have reset the tripped device and the power is restored, monitor it for the next
          few hours. If it trips again, the underlying fault has not been resolved and you need
          professional investigation.
        </p>
      </>
    ),
  },
  {
    id: 'call-105',
    heading: 'Call 105 — the Free Power Cut Number',
    content: (
      <>
        <p>
          <strong>105</strong> is the free, 24/7 power cut number for the UK. It connects you
          directly to your local Distribution Network Operator (DNO) — the company responsible for
          the electricity cables and infrastructure in your area.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">When to call 105</h4>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li>Your power is off and your neighbours are also affected</li>
                <li>You can see damaged electricity cables or equipment</li>
                <li>You want to check if there is a known power cut in your area</li>
                <li>You need an estimated restoration time</li>
                <li>
                  You want to report a dangerous situation involving electricity infrastructure
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          You do not need to know which DNO covers your area. The 105 service uses your phone
          location or postcode to route the call to the correct operator. You can also check for
          power cuts online at your DNO's website — most have live outage maps showing current and
          planned interruptions.
        </p>
        <p>
          The six main DNOs covering England, Scotland, and Wales are: UK Power Networks (South and
          East England), National Grid Electricity Distribution (Midlands, South West, Wales),
          Northern Powergrid (North East, Yorkshire), Electricity North West, SP Energy Networks
          (Central and Southern Scotland, Merseyside, North Wales), and Scottish and Southern
          Electricity Networks (North Scotland, Central Southern England).
        </p>
      </>
    ),
  },
  {
    id: 'dno-vs-internal',
    heading: 'DNO Responsibility vs Internal Faults',
    content: (
      <>
        <p>
          Understanding the boundary between the DNO's responsibility and yours is critical. The
          boundary point is your electricity meter and the main fuse (also called the service fuse
          or cut-out). Everything on the network side of the meter — the incoming cable, the service
          fuse, the overhead or underground supply — is the DNO's responsibility. Everything on your
          side of the meter — the meter tails, consumer unit, wiring, sockets, switches, and
          appliances — is your responsibility.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DNO Responsibility (Free)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Incoming supply cable to your property</li>
              <li>Service fuse (cut-out) and main fuse</li>
              <li>Overhead lines and underground cables</li>
              <li>Substations and transformers</li>
              <li>Network faults causing area-wide power cuts</li>
              <li>Damaged or dangerous DNO equipment</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Your Responsibility (Paid)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Meter tails (cables from meter to consumer unit)</li>
              <li>Consumer unit and all protective devices</li>
              <li>All internal wiring and circuits</li>
              <li>Sockets, switches, light fittings</li>
              <li>Appliances and equipment</li>
              <li>Garden, garage, and outbuilding electrics</li>
            </ul>
          </div>
        </div>
        <p>
          If you call the DNO and they confirm the network supply is healthy, the fault is on your
          side. You will need a qualified electrician to investigate. The DNO will not fix internal
          faults — that is not their job, and they are not qualified to work on your installation.
        </p>
        <p>
          If you are unsure whether the fault is on the DNO's side or yours, look at the main fuse
          (usually a black or brown unit near the meter). If the main fuse has blown, only the DNO
          can replace it — you must not open or tamper with the service fuse. Call 105 and report
          it.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-procedures',
    heading: 'Emergency Procedures: Burning Smell, Sparks, or Exposed Wiring',
    content: (
      <>
        <p>
          Some power-related situations are emergencies. If you encounter any of the following, act
          immediately:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell from a socket, switch, or consumer unit.</strong> Turn off the
                main switch at the consumer unit immediately (if safe to do so). Do not use the
                affected socket or switch. Call an electrician urgently. If the burning smell is
                accompanied by visible smoke or flames, call 999 and evacuate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sparking from a socket or switch.</strong> Stop using the socket or switch
                immediately. Unplug any connected appliance without touching metal parts. Turn off
                the circuit at the consumer unit. Call an electrician. Sparking can indicate loose
                connections, damaged wiring, or a failing device — all of which are fire risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exposed or damaged wiring.</strong> Do not touch it. Keep children and pets
                away. If the wiring is live (you may hear buzzing or see arcing), turn off the main
                switch at the consumer unit from a safe distance. Call an electrician immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock.</strong> If someone has received an electric shock, do not
                touch them if they are still in contact with the source. Turn off the power at the
                consumer unit or pull out the plug. Call 999. Begin CPR if the person is not
                breathing. Even a minor electric shock should be checked by a medical professional —
                internal injuries can be invisible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fallen power lines.</strong> Stay at least 10 metres away. Do not touch the
                line or anything in contact with it — including fences, vehicles, or puddles. Call
                105 and 999 immediately. Fallen overhead lines may still be live even if they appear
                dead.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In any electrical emergency, the priority is human safety first. Turn off the power if it
          is safe to do so, evacuate if necessary, and call for help. Do not attempt any electrical
          work yourself in an emergency situation.
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
          Not every power cut needs an electrician. But internal faults — problems with your own
          wiring, consumer unit, or appliances — require professional investigation. Call a
          qualified electrician if:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Your RCD or MCB keeps tripping after you reset it — there is an active fault that
                needs{' '}
                <SEOInternalLink href="/guides/troubleshooting-electrical-problems">
                  professional troubleshooting
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                You smell burning or see scorch marks on sockets, switches, or the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                You have an old fuse box with rewirable fuses and blown fuses are a recurring
                problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The power is off but no devices in the consumer unit appear to have tripped — the
                fault may be in the meter tails or main switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                You have partial power loss — some circuits work and others do not, with no obvious
                tripped devices.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When you call an electrician for a power cut callout, make sure they are registered with a
          competent person scheme (
          <SEOInternalLink href="/guides/how-to-find-electrician-uk">
            NICEIC, NAPIT, or ELECSA
          </SEOInternalLink>
          ) and hold an{' '}
          <SEOInternalLink href="/guides/city-guilds-2391-exam-guide">
            inspection and testing qualification
          </SEOInternalLink>
          . A general handyman is not qualified to diagnose electrical faults.
        </p>
      </>
    ),
  },
  {
    id: 'preparing-for-power-cuts',
    heading: 'Preparing for Power Cuts',
    content: (
      <>
        <p>
          Power cuts are inevitable — especially during winter storms. A few simple preparations can
          make a big difference:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep a torch and spare batteries</strong> in an accessible location. A head
                torch is ideal — it keeps your hands free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know where your consumer unit is</strong> and how to identify tripped MCBs
                and RCDs. Make sure the consumer unit is not blocked by furniture or stored items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep your phone charged</strong> — you may need it to call 105, your
                electrician, or emergency services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register for Priority Services</strong> if you are elderly, disabled, have
                young children, or rely on electrical medical equipment. Your DNO will prioritise
                your supply restoration and give you advance notice of planned outages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Have your installation inspected regularly.</strong> A periodic{' '}
                <SEOInternalLink href="/guides/eicr-certificate-explained">
                  EICR inspection
                </SEOInternalLink>{' '}
                every 5 to 10 years (or every 5 years for rented properties) identifies problems
                before they cause power failures.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Test your RCDs at least once every three months by pressing the test button on each RCD in
          your consumer unit. The RCD should trip immediately when you press the button, cutting
          power to the circuits it protects. If it does not trip, the RCD may be faulty and should
          be replaced by an electrician. This simple test takes 30 seconds and could save your life.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Handling Power Cut Callouts Efficiently',
    content: (
      <>
        <p>
          Power cut callouts are some of the most common jobs for domestic electricians. The
          customer is stressed, the house is dark, and they want the problem fixed fast. Efficiency
          is everything — diagnose the fault, fix it, document it, and invoice it, all in one visit.
        </p>
        <p>Elec-Mate streamlines the entire callout workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Power className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Fault Diagnosis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the symptoms and Elec-Mate's AI suggests likely causes — from nuisance
                  tripping to earth faults. It references the relevant{' '}
                  <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                    BS 7671
                  </SEOInternalLink>{' '}
                  regulations and testing sequences, so you can confirm the diagnosis with the right
                  tests.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the callout results in remedial work — replacing a faulty MCB, re-terminating a
                  connection, or fitting a new socket — generate the{' '}
                  <SEOInternalLink href="/guides/minor-works-certificate-explained">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  or <SEOInternalLink href="/guides/eic-certificate-explained">EIC</SEOInternalLink>{' '}
                  on site. Send it to the customer before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Handle callouts faster with Elec-Mate"
          description="Diagnose faults, record test results, generate certificates, and invoice the customer — all from your phone, all in one visit. Join 430+ UK electricians. 7-day free trial."
          icon={Power}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PowerCutWhatToDoPage() {
  return (
    <GuideTemplate
      title="Power Cut | What to Do & Who to Call UK"
      description="Complete guide to power cuts in the UK. What to check first, how to use your consumer unit, when to call 105, DNO vs internal faults, emergency procedures, and when you need a qualified electrician."
      datePublished="2026-01-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Homeowner Guide"
      badgeIcon={Power}
      heroTitle={
        <>
          Power Cut: <span className="text-yellow-400">What to Do and Who to Call</span>
        </>
      }
      heroSubtitle="The lights have gone out. Is it a power cut on the network or a fault inside your property? This guide walks you through exactly what to check, who to call, and when you need an electrician — step by step."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Power Cuts"
      relatedPages={relatedPages}
      ctaHeading="Electricians: Handle Power Cut Callouts Faster"
      ctaSubheading="Diagnose faults, generate certificates, and invoice customers from your phone. Elec-Mate streamlines every callout. 7-day free trial, cancel anytime."
    />
  );
}
