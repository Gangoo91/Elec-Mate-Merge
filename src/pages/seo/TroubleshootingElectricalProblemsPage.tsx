import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Search,
  Zap,
  Lightbulb,
  Plug,
  AlertTriangle,
  ShieldCheck,
  Wrench,
  FileCheck2,
  Home,
  Power,
  ClipboardCheck,
  GraduationCap,
  Brain,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Troubleshooting', href: '/guides/troubleshooting-electrical-problems' },
];

const tocItems = [
  { id: 'when-to-diy', label: 'DIY vs Call an Electrician' },
  { id: 'tripped-mcb', label: 'Tripped MCB' },
  { id: 'tripped-rcd', label: 'Tripped RCD' },
  { id: 'flickering-lights', label: 'Flickering Lights' },
  { id: 'dead-socket', label: 'Socket Not Working' },
  { id: 'burning-smell', label: 'Burning Smell' },
  { id: 'buzzing-noise', label: 'Buzzing or Humming' },
  { id: 'partial-power-loss', label: 'Partial Power Loss' },
  { id: 'for-electricians', label: 'For Electricians: Fault-Finding Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A tripped MCB usually indicates an overloaded circuit or a short circuit. Reset it once — if it trips again immediately, there is an active fault. Call an electrician.',
  'An RCD that keeps tripping is detecting an earth leakage fault. Unplug all appliances on the affected circuits and plug them back in one at a time to identify the faulty one.',
  'Flickering lights can be caused by loose connections, a faulty switch, a failing LED driver, or a supply voltage issue. Persistent flickering needs professional investigation.',
  'A burning smell from any socket, switch, or the consumer unit is a potential fire risk. Turn off the power immediately and call an electrician.',
  'Elec-Mate helps electricians diagnose faults faster with AI-powered fault analysis, test result recording, and instant certificate generation for remedial work.',
];

const faqs = [
  {
    question: 'Why does my trip switch keep tripping?',
    answer:
      'A trip switch (MCB or RCD) trips because it has detected a fault condition. For an MCB, the most common causes are circuit overload (too many appliances on one circuit), a short circuit (live conductor touching neutral or earth), or a faulty appliance. For an RCD, the cause is typically an earth leakage fault — current is flowing to earth through an unintended path, often through moisture, damaged insulation, or a failing appliance. To identify the cause: turn off all appliances on the affected circuit, reset the trip switch, and then switch appliances back on one at a time. If the switch trips when you plug in a specific appliance, that appliance is faulty. If the switch trips with nothing plugged in, the fault is in the fixed wiring — you need an electrician to test the circuit. Never hold a trip switch in the on position or bypass it with tape or wire — these devices save lives.',
  },
  {
    question: 'Can I fix a tripped MCB myself?',
    answer:
      'Yes, you can safely reset a tripped MCB yourself. Open the consumer unit cover and find the MCB that is in the off or middle position. Push it firmly to the on position. If it stays on, the trip was probably caused by a temporary overload (too many appliances running simultaneously) or a transient fault. If it trips again immediately, there is a persistent fault — either a short circuit in the wiring, a faulty appliance, or damaged cable insulation. Do not keep resetting it repeatedly. Unplug everything on that circuit and try again. If it trips with nothing connected, the fault is in the fixed wiring and you need a qualified electrician. If it only trips when a specific appliance is plugged in, that appliance is faulty — replace it or have it repaired. If your consumer unit has old-style rewirable fuses instead of MCBs, do not attempt to replace the fuse wire unless you know the correct rating. Incorrect fuse wire can create a serious fire risk.',
  },
  {
    question: 'Why are my lights flickering?',
    answer:
      'Flickering lights have several possible causes, ranging from minor to serious. A single flickering light is usually a loose bulb (tighten it), a failing LED bulb or driver (replace it), or a loose connection at the ceiling rose or light switch. If the flickering only happens when you switch on a high-power appliance (kettle, washing machine, electric shower), it may be caused by voltage drop on a shared circuit — this is common in older properties with undersized cables. If multiple lights or all lights in the house flicker, the cause could be a loose connection at the consumer unit, a problem with the main switch, or a supply voltage issue from the DNO. Persistent flickering across multiple circuits is a sign of a potentially serious fault and should be investigated by a qualified electrician. In rare cases, a neighbour neutral fault can cause voltage fluctuations that make lights flicker or glow brightly — this is dangerous and requires urgent investigation by the DNO.',
  },
  {
    question: 'What should I do if a socket stops working?',
    answer:
      'First, check whether the appliance itself is the problem by plugging it into a different socket. If the appliance works elsewhere, the socket is the issue. Next, check your consumer unit — a tripped MCB or RCD may have cut power to that circuit. If all the protective devices are in the on position but the socket is still dead, check whether any other sockets on the same circuit are also dead. If multiple sockets have failed, the fault may be at a junction box, a spurred connection, or a break in the ring circuit. If only one socket is dead, the fault is likely at that socket — possibly a loose terminal, a damaged cable, or a broken socket mechanism. Do not attempt to remove the socket faceplate and investigate yourself unless you are a qualified electrician. Internal wiring faults require testing with proper instruments (insulation resistance tester, continuity tester) and should be diagnosed by a professional.',
  },
  {
    question: 'Is a buzzing sound from a socket dangerous?',
    answer:
      'A buzzing or humming sound from a socket, switch, or consumer unit can indicate a problem. The most common causes are: a loose terminal connection (the conductor is not properly tightened, causing arcing and resistance heating), a failing MCB or RCD (the internal mechanism is vibrating), a faulty dimmer switch (some dimmers buzz when the load is incompatible), or an overloaded circuit (conductors heating up under excessive current). A loose connection is the most dangerous — it causes localised heating that can melt insulation and start a fire. If you hear buzzing from a socket and the faceplate feels warm to the touch, turn off the circuit at the consumer unit immediately and call an electrician. A buzzing dimmer switch is usually less serious — it often just needs replacing with a trailing-edge dimmer compatible with LED lamps — but should still be checked. Any unusual sound from a consumer unit should be investigated promptly.',
  },
  {
    question: 'When is it safe to do electrical work myself?',
    answer:
      'In the UK, homeowners are legally allowed to carry out some electrical work themselves, but significant work is restricted. You can safely change a light bulb, replace a plug, change a fuse, replace a like-for-like socket faceplate or switch faceplate (without altering the wiring), and replace a pendant lampsholder. You should NOT carry out any work that involves adding new circuits, installing sockets or lights in a kitchen or bathroom, outdoor electrical work, work in the vicinity of a bath or shower, consumer unit changes, or any work that requires notification to Building Control under Part P of the Building Regulations. Even for permitted work, you must isolate the circuit at the consumer unit first, use a voltage tester to confirm the circuit is dead, and work in accordance with BS 7671. If you are in any doubt, call a qualified electrician. The penalties for non-compliant DIY electrical work include having to pay a qualified electrician to inspect and correct the work, invalidated home insurance, and difficulty selling the property.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Detailed guide to why your RCD keeps tripping and how to identify the circuit or appliance causing it.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/power-cut-what-to-do',
    title: 'Power Cut: What to Do',
    description:
      'Step-by-step guide for when you lose power — checking the consumer unit, calling 105, and knowing when to call an electrician.',
    icon: Power,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-keeps-tripping',
    title: 'Circuit Breaker Keeps Tripping',
    description:
      'Why your MCB keeps tripping and how to identify overloads, short circuits, and earth faults.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-tips',
    title: 'Electrical Safety Tips',
    description:
      '15 essential electrical safety tips every homeowner should know to keep their home safe.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-find-electrician-uk',
    title: 'Finding a Good Electrician',
    description:
      'What to check, what to ask, and what red flags to watch for when hiring an electrician.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'when-to-diy',
    heading: 'DIY vs Call an Electrician: Know the Boundary',
    content: (
      <>
        <p>
          Not every electrical problem requires a professional. But knowing where the boundary lies
          between a simple check you can do yourself and a fault that needs a qualified electrician
          is critical — both for your safety and for legal compliance.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Safe to Do Yourself</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Reset a tripped MCB or RCD (once)</li>
              <li>Identify a faulty appliance by unplugging and retesting</li>
              <li>Check the consumer unit for tripped switches</li>
              <li>Replace a light bulb or fuse in a plug</li>
              <li>Turn off the mains in an emergency</li>
              <li>Test RCDs using the test button</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Call an Electrician</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>MCB or RCD trips repeatedly after reset</li>
              <li>Burning smell from any electrical point</li>
              <li>Sparking at sockets or switches</li>
              <li>Exposed or damaged wiring</li>
              <li>Persistent flickering on multiple lights</li>
              <li>Partial power loss with no tripped devices</li>
            </ul>
          </div>
        </div>
        <p>
          The key rule: if you have reset a protective device once and it trips again, stop. There
          is an active fault that requires testing with professional instruments —{' '}
          <SEOInternalLink href="/guides/insulation-resistance-test-guide">
            insulation resistance testing
          </SEOInternalLink>
          , continuity testing, and earth fault loop impedance testing. These tests identify the
          exact location and nature of the fault.
        </p>
      </>
    ),
  },
  {
    id: 'tripped-mcb',
    heading: 'Tripped MCB (Circuit Breaker)',
    content: (
      <>
        <p>
          An MCB (Miniature Circuit Breaker) protects a single circuit against overcurrent — either
          an overload (too much current for too long) or a short circuit (a sudden massive current
          flow). When an MCB trips, it disconnects the circuit to prevent the cable from overheating
          and potentially causing a fire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Identify the tripped MCB.</strong> Open the consumer unit cover and
                look for the switch in the off or middle position. The MCB label or a circuit chart
                inside the cover may tell you which circuit it protects (for example, "Kitchen
                Sockets" or "Upstairs Lights").
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Reduce the load.</strong> Unplug high-power appliances on that
                circuit — kettles, heaters, washing machines. If the trip was caused by an overload,
                reducing the load will allow the MCB to stay on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Reset the MCB.</strong> Push the switch firmly to the on position.
                If it stays on, the problem was likely a temporary overload.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: If it trips again immediately.</strong> There is a short circuit or
                earth fault on the circuit. Unplug everything and try resetting. If it still trips
                with nothing connected, the fault is in the fixed wiring. Call an electrician.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common causes of MCB tripping include overloaded socket circuits (too many high-power
          appliances), faulty appliances with internal short circuits, water ingress into sockets or
          junction boxes, and deteriorated cable insulation in older properties. An electrician will
          use an{' '}
          <SEOInternalLink href="/guides/insulation-resistance-test-guide">
            insulation resistance test
          </SEOInternalLink>{' '}
          to identify exactly where the breakdown is.
        </p>
      </>
    ),
  },
  {
    id: 'tripped-rcd',
    heading: 'Tripped RCD (Residual Current Device)',
    content: (
      <>
        <p>
          An <SEOInternalLink href="/guides/rcd-keeps-tripping">RCD</SEOInternalLink> is a
          life-saving device that detects earth leakage current — current flowing through an
          unintended path to earth. It trips when the difference between the live and neutral
          currents exceeds 30mA (for a 30mA RCD), disconnecting the circuit within 40 milliseconds
          to prevent electric shock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: Identify which circuits are affected.</strong> An RCD typically
                protects multiple circuits. When it trips, everything on those circuits loses power.
                This is why a split-load or RCBO board is better — a fault on one circuit does not
                affect the others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Unplug all appliances</strong> on the affected circuits. This
                includes anything plugged into sockets protected by that RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Reset the RCD.</strong> Push the switch to the on position. If it
                holds with nothing plugged in, the fault is in an appliance, not the wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Plug appliances back in one at a time.</strong> When the RCD trips,
                the last appliance you plugged in is the faulty one. Unplug it and reset the RCD.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the RCD trips with nothing plugged in, the fault is in the fixed wiring — possibly
          water in a junction box, a cable with damaged insulation, or a deteriorated heating
          element. This requires professional diagnosis with an insulation resistance tester and a
          methodical process of isolating circuits to find the fault.
        </p>
      </>
    ),
  },
  {
    id: 'flickering-lights',
    heading: 'Flickering Lights',
    content: (
      <>
        <p>
          Flickering lights are one of the most common electrical complaints — and one of the
          hardest to diagnose without proper testing equipment, because the causes range from
          trivial to dangerous.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single light flickering:</strong> Most likely a loose bulb, a failing LED
                bulb or driver, an incompatible dimmer switch, or a loose connection at the ceiling
                rose. Try tightening the bulb first. If that does not fix it, replace the bulb. If
                it still flickers with a new bulb, the issue is at the connection or switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lights flicker when appliance switches on:</strong> A brief, momentary
                flicker when a high-power appliance starts (kettle, washing machine, electric
                shower) is normal — caused by a brief voltage dip on the circuit. If the flickering
                is severe or prolonged, the circuit may be undersized or the connections may be
                loose.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple lights flickering:</strong> If several lights on the same circuit
                flicker together, the fault is likely at the consumer unit — a loose neutral
                terminal, a deteriorating MCB, or a poor connection on the circuit cable. If lights
                on different circuits flicker, the issue may be the main switch, the incoming
                supply, or (rarely) a neutral fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All lights in the house flicker or surge:</strong> This can indicate a
                supply voltage problem from the DNO or, more seriously, a broken or high-resistance
                neutral on the incoming supply. This is dangerous — appliances may receive higher
                than normal voltage and fail. Contact your DNO immediately on 105.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Never ignore persistent flickering. A loose connection generates heat through resistance,
          and resistance heating is one of the leading causes of electrical fires in UK homes. If
          tightening the bulb and replacing it does not resolve the issue, call an electrician.
        </p>
      </>
    ),
  },
  {
    id: 'dead-socket',
    heading: 'Socket Not Working',
    content: (
      <>
        <p>
          A dead socket — one that provides no power to anything plugged into it — is a common
          fault. The cause can be simple (a tripped MCB) or more complex (a broken ring circuit).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the appliance.</strong> Plug it into a different socket. If it works,
                the original socket is faulty. If it does not work anywhere, the appliance is the
                problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the consumer unit.</strong> A tripped MCB or RCD may have cut power to
                that circuit. Reset it and test the socket again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check other sockets on the same circuit.</strong> If multiple sockets are
                dead, the fault may be at a junction point — a spurred connection, a damaged cable,
                or a{' '}
                <SEOInternalLink href="/guides/continuity-testing-r1-r2-guide">
                  broken ring circuit
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not open the socket.</strong> If the problem is not the appliance or a
                tripped device, do not remove the socket faceplate. The fault needs testing with
                professional instruments — a socket tester alone is not sufficient to diagnose ring
                circuit faults.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A single dead socket on an otherwise working ring circuit often indicates a loose or
          disconnected terminal at that socket or at the socket before it in the ring. An
          electrician will test continuity around the ring and identify where the break is.
        </p>
      </>
    ),
  },
  {
    id: 'burning-smell',
    heading: 'Burning Smell from Electrical Points',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">This Is an Emergency</h4>
              <p className="text-white text-sm leading-relaxed">
                A burning smell from any socket, switch, light fitting, or the consumer unit is a
                potential fire risk. Act immediately — do not wait to see if it gets worse.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Turn off the circuit</strong> at the consumer unit immediately. If you cannot
              identify which circuit it is, turn off the main switch.
            </li>
            <li>
              <strong>Unplug any appliances</strong> connected to the affected socket or switched
              point.
            </li>
            <li>
              <strong>Check for visible damage.</strong> Look for discolouration, melting, or scorch
              marks on the socket faceplate, switch plate, or consumer unit. Do not touch if it
              appears damaged.
            </li>
            <li>
              <strong>If there is smoke or flame</strong>, call 999 and evacuate the property. Do
              not try to fight an electrical fire with water.
            </li>
            <li>
              <strong>Call an electrician.</strong> A burning smell from an electrical point always
              requires professional investigation. The most common cause is a loose terminal
              connection causing arcing and resistance heating — which can escalate to a fire.
            </li>
          </ol>
        </div>
        <p>
          Loose connections are the most common cause of electrical fires in UK homes. Over time,
          vibration, thermal cycling, and poor initial workmanship can cause terminal screws to work
          loose. The resistance at a loose joint generates heat, which melts insulation, which can
          ignite nearby materials. This is why regular{' '}
          <SEOInternalLink href="/guides/eicr-certificate-explained">
            periodic inspection and testing
          </SEOInternalLink>{' '}
          is so important — it identifies loose connections and deteriorated terminations before
          they become dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'buzzing-noise',
    heading: 'Buzzing or Humming from Electrical Points',
    content: (
      <>
        <p>
          Electrical buzzing or humming can come from several sources. The severity depends on the
          cause:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buzzing dimmer switch:</strong> Often caused by a leading-edge dimmer
                driving LED bulbs. LED lamps require a trailing-edge dimmer for smooth, silent
                operation. Replace the dimmer with an LED-compatible model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buzzing socket or switch:</strong> A loose connection inside the fitting
                causing arcing. This is dangerous — turn off the circuit and call an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humming from the consumer unit:</strong> May indicate a loose connection, a
                vibrating MCB or RCBO, or a failing contactor (if fitted). Any unusual noise from
                the consumer unit warrants investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buzzing from a transformer:</strong> Doorbell transformers, low-voltage
                lighting transformers, and LED drivers can hum due to magnetostriction in the core.
                This is usually harmless but annoying. Replacing with a higher-quality transformer
                often resolves it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The rule of thumb: if a socket or switch buzzes and feels warm, it is dangerous. If a
          dimmer switch buzzes but the faceplate is cool, it is an incompatibility issue. If the
          consumer unit hums, get it checked — it could be a loose connection or a failing device.
        </p>
      </>
    ),
  },
  {
    id: 'partial-power-loss',
    heading: 'Partial Power Loss: Some Circuits Work, Others Do Not',
    content: (
      <>
        <p>
          Partial power loss — where some circuits work and others do not, with no visibly tripped
          devices in the consumer unit — can be one of the trickiest faults to diagnose. Common
          causes include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed MCB or RCBO.</strong> The device may appear to be in the on position
                but has failed internally. An electrician can test the output voltage to confirm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose busbar connection.</strong> Inside the consumer unit, the busbars
                distribute power to each MCB. A loose connection on a busbar can cause intermittent
                or permanent loss of power to the affected devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken neutral.</strong> If the neutral conductor on a circuit has broken or
                disconnected (at a junction box, consumer unit terminal, or cable damage), the
                circuit will appear dead. The live conductor may still be energised, making this a
                dangerous fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply phase loss (three-phase installations).</strong> In three-phase
                properties, a lost phase will cut power to all circuits on that phase while the
                other two phases continue working. Contact your DNO if you suspect a phase loss.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Partial power loss almost always requires professional diagnosis. The fault could be
          anywhere from the consumer unit to a junction box buried in a wall cavity. An electrician
          will use voltage testing, continuity testing, and systematic isolation to pinpoint the
          fault.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Faster Fault-Finding with Elec-Mate',
    content: (
      <>
        <p>
          Fault-finding callouts need to be efficient. The customer wants the problem solved, and
          you want to diagnose the fault, fix it, certify it, and invoice it — all in one visit.
          Elec-Mate gives you the tools to do exactly that:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Fault Diagnosis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the symptoms — "RCD trips on kitchen circuit when immersion heater runs"
                  — and the AI suggests the most likely causes, the{' '}
                  <SEOInternalLink href="/guides/testing-sequence-guide">
                    tests to run
                  </SEOInternalLink>
                  , and the relevant BS 7671 regulation numbers. Faster diagnosis, fewer return
                  visits.
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
                  Fixed the fault? Generate a{' '}
                  <SEOInternalLink href="/guides/minor-works-certificate-explained">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  on site with voice-dictated test results. Send it to the customer by email or
                  WhatsApp before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Diagnose and certify faults in one visit"
          description="AI-powered fault diagnosis, voice test result entry, and instant certificate generation. Join 430+ UK electricians using Elec-Mate on every callout. 7-day free trial."
          icon={Search}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function TroubleshootingElectricalProblemsPage() {
  return (
    <GuideTemplate
      title="Troubleshooting Electrical Problems | Homeowner Guide"
      description="Step-by-step guide to troubleshooting common electrical problems at home. Tripped MCBs, flickering lights, dead sockets, burning smells, buzzing sounds — when to DIY and when to call an electrician."
      datePublished="2026-01-18"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Homeowner Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Troubleshooting Electrical Problems:{' '}
          <span className="text-yellow-400">When to Fix It and When to Call a Professional</span>
        </>
      }
      heroSubtitle="Tripped circuit breaker? Flickering lights? Socket not working? This guide walks you through the most common electrical problems, what you can safely check yourself, and when you need a qualified electrician."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Troubleshooting"
      relatedPages={relatedPages}
      ctaHeading="Electricians: Diagnose Faults Faster with AI"
      ctaSubheading="Elec-Mate's AI fault diagnosis, voice test entry, and instant certification make every callout more efficient. 7-day free trial, cancel anytime."
    />
  );
}
