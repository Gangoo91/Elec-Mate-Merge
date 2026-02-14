import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  Search,
  Calculator,
  GraduationCap,
  FileCheck2,
  Plug,
  ToggleRight,
  Wrench,
  Brain,
  Activity,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Power Going Off', href: '/guides/power-going-off-randomly' },
];

const tocItems = [
  { id: 'why-power-goes-off', label: 'Why Power Goes Off Randomly' },
  { id: 'loose-connections', label: 'Loose Connections and Main Fuse' },
  { id: 'mcb-rcd-tripping', label: 'MCB and RCD Tripping' },
  { id: 'overloaded-circuits', label: 'Overloaded Circuits' },
  { id: 'dno-supply-faults', label: 'DNO Supply Faults' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'diagnosis-for-electricians', label: 'Diagnosis for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Random power loss is most commonly caused by MCB or RCD tripping due to a fault on one circuit — not a total supply failure.',
  'A loose main fuse or cut-out connection can cause intermittent total power loss, especially in older properties with rewirable fuses.',
  'If the entire street has lost power, the fault is with the Distribution Network Operator (DNO), not the property installation.',
  'Overloaded circuits trip MCBs repeatedly — the fix is to redistribute loads or add a new circuit, not to uprate the MCB.',
  'Elec-Mate AI fault diagnosis helps electricians identify the root cause from symptoms, test results, and photographs — reducing diagnostic time on site.',
];

const faqs = [
  {
    question: 'Why does my power keep going off for no reason?',
    answer:
      'Power going off "randomly" almost always has a cause — it is just not immediately obvious. The most common reasons are: an RCD tripping due to earth leakage on an appliance or circuit, an MCB tripping because of an overload or short circuit, a loose connection at the main cut-out or meter tails, or an intermittent supply fault from the DNO. Start by checking your consumer unit. If an MCB or RCD has tripped, that tells you the fault is inside the property on a specific circuit. If nothing has tripped and you have no power at all, the fault may be at the supply side — check whether your neighbours also have no power. If they do, contact your DNO. If only your property is affected, the issue is likely at the main fuse (cut-out) or the meter tails.',
  },
  {
    question: 'What should I do if my electricity keeps tripping off?',
    answer:
      'First, go to your consumer unit (fuse box) and identify which device has tripped. If it is an MCB (miniature circuit breaker), it protects a single circuit — switch off all appliances on that circuit, reset the MCB, and reconnect appliances one at a time to find the faulty one. If it is the RCD (residual current device) that has tripped, it could be any circuit on that RCD side. Try switching off all MCBs on the RCD side, reset the RCD, then switch MCBs back on one at a time. When the RCD trips again, you have found the faulty circuit. If the tripping is intermittent and you cannot identify a pattern, call a qualified electrician who can carry out insulation resistance testing and earth leakage measurement to find the fault.',
  },
  {
    question: 'Can a loose connection cause power to go off intermittently?',
    answer:
      'Yes. A loose connection — particularly at the main cut-out, meter tails, or main switch — is one of the most common causes of intermittent total power loss. The connection may be just tight enough to carry current under light load, but when the load increases (for example, when the oven and kettle are both on), the resistance at the loose joint increases, the voltage drops, and the supply may disconnect entirely. Loose connections also generate heat, which can cause arcing and is a serious fire risk. If you suspect a loose main connection, do not attempt to tighten it yourself — the main cut-out and meter tails are the responsibility of the DNO (up to the meter) and must be worked on by the DNO or a qualified electrician. The connections from the meter to the consumer unit are the responsibility of a qualified electrician.',
  },
  {
    question: 'How do I know if the power cut is the electricity company fault?',
    answer:
      'Check three things: (1) Are your neighbours also without power? If the whole street is dark, the fault is on the DNO network — contact your DNO. (2) Check your consumer unit — if no MCBs or RCDs have tripped, the fault is upstream of your installation. (3) Check the main fuse (cut-out) — if the fuse has blown or the supply is dead at the cut-out, the fault is on the DNO side. In England, Scotland, and Wales, you can call 105 (the national power cut number) to report a power cut and get updates. Your DNO is responsible for the supply up to and including the cut-out (main fuse). Everything from the meter tails onwards is the property owner responsibility.',
  },
  {
    question: 'Is it dangerous if the power keeps going off?',
    answer:
      'It depends on the cause. If an RCD or MCB is tripping, the protective device is doing its job — it is disconnecting a faulty circuit before it can cause harm. The danger lies in ignoring the problem. A circuit that keeps tripping has a fault that needs investigation. If the fault is earth leakage, there is a risk of electric shock. If the fault is a short circuit or overload, there is a risk of fire. If the cause is a loose connection at the main cut-out or meter tails, this is particularly dangerous because loose connections cause arcing and overheating — a significant fire risk. Never bypass a tripping MCB or RCD by replacing it with a higher-rated device or by jamming it in the on position. Call a qualified electrician to diagnose and fix the underlying fault.',
  },
  {
    question: 'Why does my power go off when I turn on certain appliances?',
    answer:
      'If the power goes off when you plug in or switch on a specific appliance, the appliance is almost certainly faulty. The most common causes are: an internal earth fault in the appliance (causing the RCD to trip), a short circuit within the appliance (causing the MCB to trip), or an overloaded circuit where the appliance draws too much current for the MCB rating. Unplug the suspect appliance and see if the problem stops. If it does, have the appliance PAT tested or replaced. If the circuit trips even without the suspect appliance, the fault may be in the fixed wiring — a socket, spur, or junction box on that circuit. A qualified electrician can carry out insulation resistance testing to locate the fault.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'In-depth guide to RCD tripping causes including earth leakage, moisture ingress, and nuisance tripping.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-fault-diagnosis',
    title: 'Earthing Fault Diagnosis',
    description:
      'How to find earth faults using insulation resistance testing, half-split method, and clamp meters.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-2026',
    title: 'Consumer Unit Regulations',
    description:
      'Current requirements for consumer units including AMD3 changes, RCD protection, and metal enclosures.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation following GS38 requirements before working on any circuit.',
    icon: AlertTriangle,
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
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-power-goes-off',
    heading: 'Why Does the Power Keep Going Off Randomly?',
    content: (
      <>
        <p>
          When the power goes off without warning, the first reaction is usually confusion — there
          was no storm, no obvious fault, and no warning. But random power loss is rarely random. It
          has a cause, and understanding the most likely causes helps you work out what to do next.
        </p>
        <p>
          The power supply to a UK property follows a chain: the Distribution Network Operator (DNO)
          supplies electricity to the cut-out (main fuse) at the meter position. From there, meter
          tails connect to the electricity meter, and then to the consumer unit (fuse box). The
          consumer unit distributes power through individual circuits, each protected by an MCB
          (miniature circuit breaker) and usually an RCD (residual current device).
        </p>
        <p>
          A fault at any point in this chain can cause power loss. The key diagnostic question is:
          has the <strong>entire property</strong> lost power, or just{' '}
          <strong>some circuits</strong>? This immediately narrows down where the fault lies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total power loss (everything off)</strong> — fault is upstream: DNO supply,
                main fuse, meter tails, or main switch. Check if neighbours are also affected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partial power loss (some circuits off)</strong> — an MCB or RCD has tripped.
                Go to the consumer unit and look for the device in the off or tripped position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intermittent flickering or brownout</strong> — loose connection, failing
                neutral, or{' '}
                <SEOInternalLink href="/guides/voltage-too-high-or-low">
                  voltage supply issues
                </SEOInternalLink>{' '}
                from the DNO.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections and Main Fuse Failures',
    content: (
      <>
        <p>
          A loose connection at the main cut-out, meter tails, or main switch of the consumer unit
          is one of the most dangerous causes of intermittent power loss. The joint may carry enough
          current under light load, but when demand increases — the oven switches on, the immersion
          heater fires up, or several high-draw appliances run simultaneously — the increased
          current through the loose joint causes voltage drop, arcing, and eventually a complete
          disconnection.
        </p>
        <p>The signs of a loose connection include:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell near the consumer unit or meter.</strong> This indicates
                overheating at a connection point and is an emergency — isolate and call an
                electrician immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discolouration or melting on cables or terminals.</strong> Visual evidence
                of sustained overheating. The affected cable and terminal must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lights dimming or flickering when high-load appliances switch on.</strong> A
                brief dip is normal, but sustained dimming or flickering points to a poor connection
                or undersized supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The main fuse (cut-out) has blown.</strong> Rewirable cut-out fuses can blow
                due to age, overload, or a fault. Only the DNO can replace the main fuse — do not
                attempt to rewire it yourself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The main cut-out and service cable are the DNO's property. If you suspect a fault at the
          cut-out or on the supply side of the meter, contact your DNO directly. In England,
          Scotland, and Wales, call <strong>105</strong> to be connected to your local DNO.
          Everything from the meter tails to the consumer unit and beyond is the property owner's
          responsibility and should be inspected by a qualified electrician.
        </p>
      </>
    ),
  },
  {
    id: 'mcb-rcd-tripping',
    heading: 'MCB and RCD Tripping: The Most Common Cause',
    content: (
      <>
        <p>
          The most frequent reason for power going off in a UK property is a tripped MCB or RCD in
          the consumer unit. These are protective devices — they are designed to disconnect a
          circuit when they detect a fault. An MCB trips when it detects overcurrent (overload or
          short circuit). An{' '}
          <SEOInternalLink href="/guides/rcd-keeps-tripping">
            RCD trips when it detects earth leakage
          </SEOInternalLink>{' '}
          (current flowing to earth through a fault path).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">MCB Tripping</h3>
            <p className="text-white text-sm leading-relaxed">
              An MCB protects a single circuit. If it trips, only that circuit loses power — for
              example, the downstairs sockets or the kitchen ring. The causes are: overload (too
              many appliances drawing too much current), short circuit (live touching neutral or
              earth), or a faulty appliance. Switch off everything on the circuit, reset the MCB,
              and reconnect appliances one at a time to find the culprit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCD Tripping</h3>
            <p className="text-white text-sm leading-relaxed">
              An RCD protects multiple circuits (in a split-load board, typically half the
              circuits). When it trips, everything on that RCD side goes off. The cause is earth
              leakage — current escaping to earth through insulation breakdown, a faulty appliance,
              moisture in a junction box, or a damaged cable. Use the half-split method: switch off
              all MCBs on the RCD side, reset the RCD, then switch MCBs on one at a time.
            </p>
          </div>
        </div>
        <p>
          If the MCB or RCD trips again immediately after resetting, there is an active fault that
          needs professional diagnosis. Do not keep resetting it — the protective device is doing
          its job. Repeatedly forcing a tripped device back on without fixing the underlying fault
          risks fire or electric shock.
        </p>
        <SEOAppBridge
          title="AI fault diagnosis for tripping circuits"
          description="Describe the symptoms — which device trips, when it happens, what appliances are connected — and Elec-Mate AI identifies the most likely cause and recommended tests. Faster diagnosis, fewer wasted hours on site."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'overloaded-circuits',
    heading: 'Overloaded Circuits: Why Uprating the MCB Is Never the Answer',
    content: (
      <>
        <p>
          Circuit overload is a common cause of MCB tripping, particularly on socket circuits in
          kitchens and utility rooms where multiple high-draw appliances share the same circuit. A
          typical domestic ring final circuit is protected by a 32A MCB and wired in 2.5mm² cable,
          rated to carry approximately 7.4kW. If the combined load exceeds this, the MCB trips.
        </p>
        <p>Common high-draw appliances and their typical current draw:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric oven:</strong> 10-13A (2.4-3kW)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kettle:</strong> 10-13A (2.2-3kW)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Washing machine:</strong> 8-10A (1.8-2.2kW)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tumble dryer:</strong> 10-13A (2.4-3kW)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fan heater:</strong> 8-13A (2-3kW)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Running a kettle, washing machine, and tumble dryer simultaneously on the same ring
          circuit could draw 28-36A — enough to trip a 32A MCB. The solution is never to uprate the
          MCB to a higher rating. The MCB rating is matched to the cable size for fire protection —
          fitting a 40A MCB on a 2.5mm² circuit means the cable can overheat before the MCB trips.
          The correct solution is to redistribute loads across circuits or install an additional
          circuit (for example, a dedicated radial for the kitchen appliances).
        </p>
        <p>
          Electricians can use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">
            maximum demand calculator
          </SEOInternalLink>{' '}
          to assess the total load on each circuit and the overall installation, identifying where
          circuits need to be added or loads redistributed.
        </p>
      </>
    ),
  },
  {
    id: 'dno-supply-faults',
    heading: 'DNO Supply Faults: When It Is Not Your Installation',
    content: (
      <>
        <p>
          Not every power cut is caused by a fault inside the property. The Distribution Network
          Operator (DNO) is responsible for the electricity supply from the substation to the meter
          position, including the service cable, cut-out, and main fuse. Faults on the DNO network
          include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned maintenance or upgrades.</strong> DNOs schedule outages for network
                maintenance. You should receive advance notice — check your DNO's website for
                planned work in your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable fault on the distribution network.</strong> Underground cables can
                fail due to age, water ingress, or third-party damage (someone digging through a
                cable). This typically affects multiple properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Substation fault.</strong> A transformer or switchgear failure at the local
                substation can cause widespread outages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose or corroded service cable connection.</strong> The DNO's service cable
                connects to the cut-out — corrosion or a loose connection here can cause
                intermittent supply loss to a single property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To report a power cut or check for known outages, call <strong>105</strong> from any
          phone. This is the national power cut number and will connect you to your local DNO
          regardless of your supplier. You can also check your DNO's website for live outage maps.
          The main DNOs in the UK are: UK Power Networks (London, South East, East), Western Power
          Distribution (Midlands, South West, Wales), Northern Powergrid (North East, Yorkshire),
          Electricity North West, Scottish Power Energy Networks, and Scottish and Southern
          Electricity Networks.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-procedures',
    heading: 'Emergency Procedures: What to Do Right Now',
    content: (
      <>
        <p>If the power has gone off and you are unsure why, follow these steps in order:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Check the consumer unit.</strong> Open the consumer unit door and look for any
              MCBs or RCDs in the off or tripped position. If one has tripped, you have identified
              the general area of the fault.
            </li>
            <li>
              <strong>Check if neighbours are affected.</strong> If the whole street is dark, the
              fault is on the DNO network. Call 105 to report it.
            </li>
            <li>
              <strong>Do not touch anything that smells of burning or looks damaged.</strong> If you
              see scorch marks, melted plastic, or smell burning at the consumer unit or meter
              position, do not touch it. Call an emergency electrician.
            </li>
            <li>
              <strong>If an MCB has tripped:</strong> switch off all appliances on that circuit,
              reset the MCB, and reconnect appliances one at a time. If the MCB trips again
              immediately, leave it off and call an electrician.
            </li>
            <li>
              <strong>If an RCD has tripped:</strong> switch off all MCBs on the RCD side, reset the
              RCD, then switch MCBs on one at a time. When the RCD trips again, that MCB identifies
              the faulty circuit. Leave that circuit off and call an electrician.
            </li>
            <li>
              <strong>If nothing has tripped and you have no power:</strong> the fault is likely at
              the main fuse (cut-out) or the DNO supply. Call 105 to check for outages, and if there
              are none, call an electrician to inspect the meter tails and main connections.
            </li>
          </ol>
        </div>
        <p>
          Never attempt to open the main cut-out (the sealed unit where the DNO's service cable
          enters). This is DNO property and contains a fuse rated at 60A, 80A, or 100A. Only the DNO
          or a qualified person authorised by the DNO should open it.
        </p>
        <p>
          If you have vulnerable people in the property (elderly, young children, or anyone relying
          on electrically powered medical equipment), contact your DNO's Priority Services Register.
          They provide additional support during power cuts, including alternative heating and
          updates on restoration times.
        </p>
      </>
    ),
  },
  {
    id: 'diagnosis-for-electricians',
    heading: 'For Electricians: Systematic Diagnosis of Random Power Loss',
    content: (
      <>
        <p>
          When a customer calls about power going off randomly, the diagnostic approach depends on
          whether the loss is total or partial, and whether it is intermittent or sustained.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 1: Visual Inspection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Inspect the consumer unit, meter tails, and main switch for signs of overheating,
                  discolouration, or loose connections. Check the main cut-out for visible damage.
                  Use a non-contact voltage tester to confirm whether the supply is live at the
                  cut-out, meter, and main switch.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 2: Supply Voltage Check</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measure the supply voltage at the main switch. It should be between{' '}
                  <SEOInternalLink href="/guides/voltage-too-high-or-low">
                    216V and 253V (230V +10%/-6%)
                  </SEOInternalLink>
                  . A reading significantly below 216V indicates a supply problem — possibly a loose
                  neutral or a DNO network fault.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 3: Insulation Resistance Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the fault is on a specific circuit (MCB or RCD tripping), carry out{' '}
                  <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                    insulation resistance testing
                  </SEOInternalLink>{' '}
                  on the affected circuit. A reading below 1M ohm indicates insulation breakdown.
                  Use the half-split method to narrow down the fault location.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 4: AI-Assisted Diagnosis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate AI fault diagnosis takes the symptoms, test results, and photographs and
                  identifies the most likely root cause. It cross-references BS 7671 regulation
                  numbers, suggests the next test to perform, and generates the correct observation
                  code if you are completing an EICR. It turns a 30-minute head-scratch into a
                  2-minute answer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For intermittent faults that are not present when you arrive, consider leaving a data
          logger on the supply to record voltage over 24-48 hours. This can capture voltage dips,
          transients, and supply interruptions that only occur under specific load conditions or at
          specific times of day (for example, when the DNO network is under peak demand).
        </p>
        <SEOAppBridge
          title="Complete fault diagnosis on your phone"
          description="Elec-Mate gives you AI fault diagnosis, all BS 7671 calculators, and digital certificates in one app. Diagnose the fault, calculate the fix, issue the certificate — all from site. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PowerGoingOffPage() {
  return (
    <GuideTemplate
      title="Power Going Off Randomly | Electrical Causes & Fixes"
      description="Why does your power keep going off? Expert guide covering loose main fuse connections, MCB and RCD tripping, overloaded circuits, DNO supply faults, and emergency procedures. Includes diagnosis steps for electricians."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Power Going Off Randomly?{' '}
          <span className="text-yellow-400">Electrical Causes and How to Fix Them</span>
        </>
      }
      heroSubtitle="Random power loss is almost never random. Whether it is a tripping MCB, a loose main fuse, an overloaded circuit, or a DNO supply fault — this guide walks you through every cause, what to check, and when to call a qualified electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Power Going Off"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Electrical Faults Faster with AI"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, BS 7671 calculators, and digital certificates. 7-day free trial, cancel anytime."
    />
  );
}
