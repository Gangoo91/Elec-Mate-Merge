import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Wrench,
  ShieldCheck,
  Calculator,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Activity,
  Power,
  Cable,
  CircleDot,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'No Power to Sockets', href: '/guides/no-power-to-sockets' },
];

const tocItems = [
  { id: 'initial-checks', label: 'Initial Checks Before Calling an Electrician' },
  { id: 'tripped-mcb-rcd', label: 'Tripped MCB or RCD' },
  { id: 'broken-ring-circuit', label: 'Broken Ring Circuit' },
  { id: 'loose-connections', label: 'Loose Connections' },
  { id: 'spur-faults', label: 'Spur Faults' },
  { id: 'systematic-diagnosis', label: 'Systematic Diagnosis Approach' },
  { id: 'testing-dead-sockets', label: 'Testing Dead Sockets' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The most common cause of dead sockets is a tripped MCB or RCD at the consumer unit — always check the consumer unit first before investigating further.',
  'A broken ring circuit (cable damage, disconnected joint, or failed connection at a socket) can leave multiple sockets dead while others on the same circuit continue to work.',
  'Loose connections at socket terminals, junction boxes, or the distribution board are a frequent cause of intermittent or permanent power loss to individual sockets.',
  'Fused spurs protect equipment on a spur from the ring circuit — a blown fuse in a fused connection unit (FCU) will kill power to everything downstream of that spur, leaving the ring unaffected.',
  "Elec-Mate's AI fault diagnosis tool walks you through a structured dead-socket diagnosis, helping you identify whether the cause is a tripped protective device, a broken ring, a loose connection, or a spur fault.",
];

const faqs = [
  {
    question: 'Why have some of my sockets stopped working but others are fine?',
    answer:
      'If some sockets work and others do not — all on the same circuit — the most likely cause is a break in the ring circuit or a loose connection at one of the sockets. In a ring final circuit, the cable runs from the consumer unit to each socket in sequence and then returns to the consumer unit, forming a ring. If the ring is broken at any point (a damaged cable, a disconnected joint, or a pulled-out terminal), the sockets between the break and the return path will lose power. Sockets on the other side of the break, which can still reach the consumer unit through the unbroken leg of the ring, will continue to work. Another possibility is that the dead sockets are on a fused spur — if the fuse in the FCU (fused connection unit) has blown, everything on the spur loses power while the main ring continues to work. A third possibility is that the dead sockets are actually on a different circuit from the working ones — check the distribution board to see if a different MCB has tripped.',
  },
  {
    question: 'How do I check if my consumer unit has tripped?',
    answer:
      'Open the consumer unit cover (the plastic front panel — it usually unclips or unscrews; you do not need to access the live parts behind it). Look at the switches inside. MCBs (miniature circuit breakers) and RCBOs will be either up (on) or down (tripped). On some boards, tripped devices sit in a middle position between up and down. If any switch is in the down or middle position, that circuit has tripped. Before resetting, try to identify why it tripped. If it trips again immediately after resetting, there is a fault on the circuit and you should not keep resetting it — call a qualified electrician. If it holds after resetting, it may have been a one-off event (a momentary overload, a faulty appliance, or a transient fault). Monitor it and if it trips again, call an electrician. Also check the RCDs — these are the larger switches, usually at the top or side of the board. A tripped RCD will cut power to all circuits it protects, which can be half the board on a split-load consumer unit.',
  },
  {
    question: 'What is a ring final circuit and why does it break?',
    answer:
      'A ring final circuit is the standard method of wiring socket outlets in UK domestic installations. The cable runs from the consumer unit (MCB terminal) to each socket outlet in sequence, visiting every socket on the circuit, and then returns back to the same MCB terminal — forming a complete ring. The advantage of this arrangement is that current can flow to any socket through both legs of the ring simultaneously, reducing the current in each leg and allowing smaller cable to be used (2.5 mm squared twin and earth for a 32 A circuit). The ring can break for several reasons: a cable damaged by a nail or screw (common under floorboards); a connection pulled out at a socket terminal due to poor workmanship or thermal cycling; a joint in a junction box that has failed; or deliberate disconnection during previous work that was not properly reconnected. When the ring breaks, all sockets between the break and the end of the cable run lose their supply through one leg and may lose power entirely, or may be supplied through the remaining leg but at reduced capacity.',
  },
  {
    question: 'How do I know if a socket has a loose connection?',
    answer:
      'Signs of a loose connection at a socket include: the socket works intermittently (power comes and goes, especially when plugging in or unplugging); the socket sparks visibly when you plug something in; the faceplate feels warm or hot to the touch; there is a burning smell near the socket; the plastic around the socket pins shows discolouration or melting; or the socket has stopped working entirely. To check, isolate the circuit at the consumer unit, remove the socket faceplate, and visually inspect the terminal connections. Check that all conductors are firmly secured in their terminals and that no bare copper is exposed outside the terminals. Re-tighten all terminals using an appropriate screwdriver. If there is evidence of arcing (blackened terminals, melted insulation, burnt conductor ends), the socket should be replaced, not just re-tightened. Evidence of arcing should be recorded as a C1 or C2 observation on an EICR.',
  },
  {
    question: 'What is a fused spur and how do I check the fuse?',
    answer:
      'A fused spur is a branch circuit taken from a ring circuit or radial circuit via a fused connection unit (FCU). The FCU contains a BS 1362 cartridge fuse (typically 3 A or 13 A) that protects the spur cable and the equipment connected to it. Fused spurs are commonly used to supply permanently connected appliances such as extractor fans, towel rails, boiler controls, and outdoor lighting. If the fuse in the FCU blows, everything downstream of the FCU loses power — but the main ring circuit continues to work normally. To check the fuse, turn off the circuit at the consumer unit. On a switched FCU, check that the neon indicator (if present) is off. Prise open the fuse carrier on the front of the FCU — it usually has a small slot for a flat-blade screwdriver. Remove the cartridge fuse and test it with a continuity tester or replace it with a known good fuse of the same rating. If the new fuse blows immediately when the circuit is restored, there is a fault on the spur circuit (a short circuit or an overloaded appliance) that must be investigated.',
  },
  {
    question: 'Can I fix a dead socket myself or do I need an electrician?',
    answer:
      'If the cause is a tripped MCB or RCD, you can safely reset it yourself — just open the consumer unit cover and push the tripped switch back to the on position. If it stays on, no further action is needed unless it trips again. If the cause is a blown fuse in an FCU, you can replace the fuse yourself — this is a simple user-serviceable task, similar to changing a plug fuse. However, if the socket has stopped working due to a loose connection, a broken ring, a damaged cable, or any fault that requires opening the socket faceplate or working inside the consumer unit, you should call a qualified electrician. Work on the fixed electrical installation (anything behind the socket faceplate) is potentially dangerous and, depending on the scope, may be notifiable under Part P of the Building Regulations. A qualified electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) will diagnose the fault, carry out the repair safely, and issue the appropriate certificate if required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/nuisance-tripping',
    title: 'Nuisance Tripping',
    description:
      'If the MCB or RCD keeps tripping after you reset it, the cause may be cumulative leakage or an appliance fault.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/low-insulation-resistance',
    title: 'Low Insulation Resistance',
    description:
      'A cable fault causing dead sockets will often show as low insulation resistance on testing.',
    icon: Activity,
    category: 'Troubleshooting',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Document socket circuit faults on a digital EICR with AI defect code suggestions and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earth-loop-impedance-too-high',
    title: 'Earth Loop Impedance Too High',
    description: 'High Zs on a socket circuit can indicate a broken ring or loose CPC connection.',
    icon: Zap,
    category: 'Troubleshooting',
  },
  {
    href: '/tools/calculators',
    title: 'Ring Circuit Calculator',
    description:
      'Verify ring circuit continuity with R1, Rn, and R2 values to confirm the ring is intact.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training covering ring circuit testing and fault diagnosis.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'initial-checks',
    heading: 'Initial Checks Before Calling an Electrician',
    content: (
      <>
        <p>
          Before calling an electrician for dead sockets, there are a few simple checks that any
          homeowner or tenant can perform safely. These checks do not involve opening any socket
          faceplates or touching any live parts — they only require looking at the consumer unit and
          testing a few appliances.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check the consumer unit.</strong> Open the cover and look for any tripped
              switches. If an MCB or RCD is in the down or middle position, that circuit has
              tripped. Try resetting it (push it firmly to the up position). If it holds, the
              problem may be resolved. If it trips immediately, leave it off and call an
              electrician.
            </li>
            <li>
              <strong>Check whether other sockets in the property work.</strong> Test sockets in
              different rooms. If all sockets are dead, the RCD protecting the socket circuits may
              have tripped. If only sockets in one area are dead, the fault may be on one specific
              circuit.
            </li>
            <li>
              <strong>Check the appliance, not the socket.</strong> Try plugging a known-working
              appliance (a lamp, a phone charger) into the suspect socket. If the appliance works,
              the problem was with the original appliance, not the socket.
            </li>
            <li>
              <strong>Check for blown FCU fuses.</strong> If the dead socket is supplied via a fused
              connection unit (common for kitchen worktop sockets, extractor fans, and outdoor
              sockets), check whether the FCU fuse has blown. The FCU is the small rectangular unit
              with a fuse carrier on the front.
            </li>
            <li>
              <strong>Check whether neighbours are affected.</strong> If all power is off (not just
              sockets), check whether your neighbours have power. If they do not, the problem is
              with the supply — contact your electricity supplier, not an electrician.
            </li>
          </ol>
        </div>
        <p>
          If these checks do not resolve the issue, the fault is likely in the fixed wiring and you
          should call a qualified electrician. Do not attempt to open socket faceplates or work
          inside the consumer unit — these tasks require a competent person working to{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedures
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'tripped-mcb-rcd',
    heading: 'Tripped MCB or RCD',
    content: (
      <>
        <p>
          The most common cause of dead sockets is a tripped protective device at the consumer unit.
          This can be an MCB (miniature circuit breaker), an RCD (residual current device), or an
          RCBO (combined MCB and RCD). The device trips to protect the circuit from a fault — the
          socket itself is fine, it simply has no supply because the protective device has
          disconnected it.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  MCB Trip — Overcurrent or Short Circuit
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  An MCB trips when the current on the circuit exceeds the MCB rating (typically 32
                  A for a socket circuit). This can be caused by an overloaded circuit (too many
                  high-power appliances on one circuit), a short circuit in an appliance or the
                  wiring, or a fault in the cable. If the MCB trips immediately on reset, do not
                  keep resetting it — there is a fault that must be investigated. Disconnect all
                  appliances from the circuit and try resetting. If it holds with nothing plugged
                  in, reconnect appliances one at a time to find the faulty one.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RCD Trip — Earth Leakage</h4>
                <p className="text-white text-sm leading-relaxed">
                  An RCD trips when it detects earth leakage current exceeding its sensitivity
                  (typically 30 mA). On a split-load consumer unit, one RCD may protect half the
                  circuits — so a single RCD trip can kill power to multiple socket circuits and
                  lighting circuits simultaneously. Common causes include a faulty appliance leaking
                  to earth, moisture in an outdoor socket or connection, or{' '}
                  <SEOInternalLink href="/guides/nuisance-tripping">
                    cumulative earth leakage
                  </SEOInternalLink>{' '}
                  from multiple appliances. Reset the RCD after disconnecting suspect appliances.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Power className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  RCBO Trip — Circuit-Specific Protection
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  On a modern RCBO board, each circuit has its own combined overcurrent and earth
                  leakage protection. If an RCBO trips, only that one circuit loses power. This
                  makes diagnosis easier — you know exactly which circuit has the fault. The RCBO
                  may have tripped due to overcurrent, earth leakage, or both. The diagnostic
                  approach is the same: disconnect appliances, reset, and reconnect one at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'broken-ring-circuit',
    heading: 'Broken Ring Circuit',
    content: (
      <>
        <p>
          In UK domestic installations, socket outlets are typically wired as ring final circuits.
          The cable runs from the MCB at the consumer unit, visits each socket in turn, and returns
          to the same MCB terminal — forming a complete ring. If this ring is broken at any point,
          the consequences depend on where the break occurs and how many sockets are between the
          break and the return path.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete break:</strong> If the cable is completely severed (a nail through
                both conductors, a joint pulled apart), all sockets beyond the break — when measured
                from both directions around the ring — will lose power. The sockets before the break
                on each leg of the ring will continue to work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single conductor break:</strong> If only the line conductor is broken (but
                the neutral and CPC are intact), the affected sockets will be dead. If only the
                neutral is broken, the sockets may appear dead or may behave erratically (depending
                on the load conditions on the circuit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPC break only:</strong> If only the earth conductor (CPC) is broken, the
                sockets will still work (power is present) but the earth path is compromised. This
                is dangerous because the protective device cannot disconnect quickly enough in the
                event of an earth fault. An{' '}
                <SEOInternalLink href="/guides/earth-loop-impedance-too-high">
                  earth loop impedance test
                </SEOInternalLink>{' '}
                will reveal the high Zs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To identify a broken ring, perform the ring circuit continuity test at the distribution
          board. Disconnect both ends of the ring (line, neutral, and CPC at both legs). Measure R1
          (end-to-end line conductor resistance), Rn (end-to-end neutral conductor resistance), and
          R2 (end-to-end CPC resistance). If any of these reads open circuit, the ring is broken on
          that conductor. Cross-connect the conductors and measure at each socket around the ring to
          locate the break point — the readings will be inconsistent at the socket where the break
          occurs.
        </p>
        <SEOAppBridge
          title="Ring circuit calculator for fault diagnosis"
          description="Enter your R1, Rn, and R2 values into Elec-Mate's ring circuit calculator. The app validates the ring integrity, flags any anomalies, and calculates the expected r1+r2 at each socket position. A broken ring or incorrect routing shows up immediately."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections at Sockets and Junction Boxes',
    content: (
      <>
        <p>
          Loose connections are a common cause of both intermittent and permanent power loss to
          individual sockets. On a ring circuit, each socket has at least four terminal connections
          (line in, line out, neutral in, neutral out — plus two earth connections). Any one of
          these can loosen over time, and the consequences depend on which connection fails.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Line conductor loose at socket:</strong> If the line connection to the
                incoming cable is loose, that socket and all sockets downstream (on that leg of the
                ring) may lose power. If it is the outgoing cable that is loose, only downstream
                sockets are affected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral conductor loose:</strong> A loose neutral at a socket can cause
                intermittent operation — the socket may work with light loads but fail under heavy
                loads when the higher current causes the loose connection to open.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction box connections:</strong> Junction boxes under floors and in loft
                spaces can develop loose connections due to vibration, thermal cycling, and poor
                initial workmanship. A failed junction box connection has the same effect as a cable
                break at that point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board terminals:</strong> A loose connection at the MCB
                terminal will affect the entire circuit — all sockets on that circuit will be dead.
                Check both the line connection at the MCB and the neutral connection at the neutral
                bar.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Warning signs of a loose connection include intermittent power, sparking when plugging in
          appliances, a warm socket faceplate, discolouration around the socket pins, and a burning
          smell. Any of these signs should be investigated immediately — loose connections that arc
          are a significant fire risk. If you find evidence of arcing, the socket must be replaced
          and the finding recorded on the{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> as a C1 or C2
          observation.
        </p>
      </>
    ),
  },
  {
    id: 'spur-faults',
    heading: 'Spur Faults',
    content: (
      <>
        <p>
          A spur is a branch circuit taken from a ring circuit (or radial circuit) to supply one or
          more additional socket outlets or a specific piece of equipment. Spurs can be unfused (one
          socket connected directly to a socket on the ring) or fused (connected through a fused
          connection unit with a cartridge fuse). Faults on spurs can cause dead sockets while the
          main ring continues to work normally.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <CircleDot className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Blown Fuse in FCU</h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common spur fault. The cartridge fuse in the FCU (fused connection unit)
                  has blown, cutting power to everything downstream. Common causes include an
                  overloaded appliance, a short circuit in the equipment connected to the spur, or
                  simply a fuse that has reached end of life. Remove the fuse carrier, test or
                  replace the fuse, and restore power. If the new fuse blows immediately, there is a
                  fault on the spur that must be investigated.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <CircleDot className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Disconnected Spur at the Ring</h4>
                <p className="text-white text-sm leading-relaxed">
                  The spur cable connects to the ring at a socket or junction box. If this
                  connection has failed (loose terminal, pulled-out conductor), the spur socket
                  loses power while the ring continues to work. This is particularly common when
                  spurs are connected at sockets — the socket has three sets of cables (two ring
                  legs plus the spur), and the terminals can become overloaded.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <CircleDot className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Damage on the Spur</h4>
                <p className="text-white text-sm leading-relaxed">
                  The spur cable itself may be damaged — a nail through the cable under the
                  floorboard, rodent damage, or a crushed cable. This creates the same effect as a
                  broken ring but on the spur only. The spur socket is dead, the ring works. An
                  insulation resistance test on the spur cable will typically reveal the fault.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          To determine whether a dead socket is on a spur or on the ring, check the number of cables
          at the socket. A ring socket typically has two cables (one from each direction around the
          ring). A spur socket typically has one cable (from the ring connection point). A socket
          where the spur originates may have three cables (two ring legs plus the spur).
        </p>
      </>
    ),
  },
  {
    id: 'systematic-diagnosis',
    heading: 'Systematic Diagnosis Approach for Electricians',
    content: (
      <>
        <p>
          When called to diagnose dead sockets, follow this structured approach to identify the
          cause efficiently and avoid wasting time:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check the consumer unit.</strong> Is the MCB for the socket circuit in the on
              position? Is the RCD protecting that circuit in the on position? If either has
              tripped, investigate why before simply resetting.
            </li>
            <li>
              <strong>Determine the scope.</strong> How many sockets are dead? Which rooms? Use a
              socket tester or voltage indicator to test multiple sockets. Map the dead sockets
              against the circuit chart (if one exists) to understand which circuit is affected.
            </li>
            <li>
              <strong>Check for tripped FCUs.</strong> Walk around and check all fused connection
              units on the affected circuit. An FCU with a blown fuse will have no neon indicator
              (if fitted). Check the fuse with a continuity tester.
            </li>
            <li>
              <strong>
                Perform{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>
                .
              </strong>{' '}
              Isolate the circuit at the consumer unit. Lock off and prove dead at the point of
              work.
            </li>
            <li>
              <strong>Test the ring circuit continuity.</strong> At the distribution board,
              disconnect both ends of the ring. Test R1, Rn, and R2 end-to-end. An open circuit on
              any conductor confirms a broken ring.
            </li>
            <li>
              <strong>Cross-connect and test at each socket.</strong> If the ring is broken, perform
              the cross-connected (figure-of-eight) test, measuring at each socket around the ring.
              The readings will be anomalous at the socket where the break occurs — this locates the
              fault.
            </li>
            <li>
              <strong>Inspect connections.</strong> At the socket nearest to the identified fault
              location, open the faceplate and inspect the terminal connections. Look for loose
              conductors, evidence of arcing, heat damage, and pulled-out wires.
            </li>
            <li>
              <strong>Test insulation resistance.</strong> Perform an{' '}
              <SEOInternalLink href="/guides/low-insulation-resistance">
                insulation resistance test
              </SEOInternalLink>{' '}
              on the affected section to check for cable damage.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="AI-guided fault diagnosis"
          description="Describe the dead socket symptoms to Elec-Mate's AI fault diagnosis tool — how many sockets are affected, which rooms, whether the MCB has tripped — and the AI guides you through the most efficient diagnostic sequence. It prioritises the most likely causes based on the symptom pattern."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'testing-dead-sockets',
    heading: 'Testing Dead Sockets Safely',
    content: (
      <>
        <p>
          When investigating dead sockets, safety must come first. Even a socket that appears dead
          may have a live conductor present — a loose neutral can leave the line conductor energised
          with no apparent load. Always follow the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          before opening any socket faceplate or making any physical contact with conductors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a voltage indicator, not a neon screwdriver.</strong> A two-pole voltage
                indicator (GS38 compliant) is the only reliable way to test for the presence of
                voltage. Neon screwdrivers can give false readings and are not suitable for proving
                dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prove — test — prove.</strong> Before testing the dead socket, prove your
                voltage indicator on a known live source. Then test the dead socket. Then prove the
                indicator again on the known live source. This confirms the indicator was working
                correctly during the test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lock off at the consumer unit.</strong> Switch off the MCB, apply a lock-off
                device, and attach a warning tag. This prevents anyone from re-energising the
                circuit while you are working on it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Beware of back-fed circuits.</strong> On a ring circuit, isolating the MCB
                disconnects the supply from the consumer unit, but if the ring has a connection to
                another circuit (a{' '}
                <SEOInternalLink href="/guides/borrowed-neutral-explained">
                  borrowed neutral
                </SEOInternalLink>
                , for example), there may still be voltage present. Always prove dead at the point
                of work, not just at the consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After completing the diagnosis and repair, re-test the affected sockets with a socket
          tester to confirm correct wiring (polarity, earth present). Record test results on the
          schedule of test results and issue the appropriate certificate for the remedial work.
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR certificate app</SEOInternalLink>{' '}
          lets you capture all test results by voice, classify any observations with AI-suggested
          defect codes, and generate a professional PDF certificate from site.
        </p>
        <SEOAppBridge
          title="Complete certificates on site — send before you leave"
          description="Elec-Mate's digital EICR and Minor Works certificates capture test results by voice, suggest defect codes with AI, and export as professional PDFs. Send the certificate, remedial quote, and invoice to the customer by email or WhatsApp before you leave the property."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NoPowerToSocketsPage() {
  return (
    <GuideTemplate
      title="No Power to Sockets | Troubleshooting Guide"
      description="Complete guide to diagnosing dead sockets. Covers tripped MCBs and RCDs, broken ring circuits, loose connections, spur faults, and a systematic diagnosis approach for UK homeowners and electricians."
      datePublished="2025-07-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Power}
      heroTitle={
        <>
          No Power to Sockets?{' '}
          <span className="text-yellow-400">Systematic Troubleshooting Guide</span>
        </>
      }
      heroSubtitle="Dead sockets can be caused by a simple tripped MCB, a broken ring circuit, a loose connection, or a blown spur fuse. This guide covers every common cause, explains what homeowners can check safely, and provides a structured diagnostic approach for electricians."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Dead Sockets"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Socket Faults with Elec-Mate"
      ctaSubheading="AI fault diagnosis, ring circuit calculator, digital EICR certificates, and voice test entry. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
