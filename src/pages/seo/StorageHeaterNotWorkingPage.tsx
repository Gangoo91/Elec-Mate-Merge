import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Wrench,
  Zap,
  Cable,
  ClipboardCheck,
  Thermometer,
  Timer,
  Flame,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Storage Heater Not Working', href: '/guides/storage-heater-not-working' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Storage Heater Not Working?' },
  { id: 'how-it-works', label: 'How Storage Heaters Work' },
  { id: 'common-causes', label: 'Common Causes of Failure' },
  { id: 'controls', label: 'Understanding the Controls' },
  { id: 'economy-7', label: 'Economy 7 and Off-Peak Supply' },
  { id: 'what-to-check', label: 'What to Check Yourself' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Storage heaters charge overnight using off-peak electricity (Economy 7 or Economy 10) and release stored heat during the day. If your storage heater is cold, the first thing to check is whether it charged overnight — the input control must be turned up before bedtime.',
  'The most common cause of a cold storage heater is the input dial being set to zero or too low. The input control must be set high enough for the heater to store sufficient heat overnight. The output control regulates how quickly stored heat is released during the day.',
  'Storage heaters require a dedicated off-peak circuit, separate from the normal power circuits. This circuit is controlled by a time switch or teleswitch that only provides power during off-peak hours.',
  'Element failure is common in older storage heaters. Elements are embedded in thermal bricks and cannot be easily replaced on most models — a failed element usually means replacing the entire heater.',
  'If none of your storage heaters are working, the most likely cause is a fault with the off-peak supply — the time switch, teleswitch, or the off-peak meter may have failed. Check whether the off-peak circuit MCB has tripped.',
  'Regulation 411.3.3 of BS 7671 requires RCD protection where the risk of electric shock is increased. Storage heater circuits should have appropriate overcurrent protection matched to the cable rating and heater load.',
];

const faqs = [
  {
    question: 'Why is my storage heater cold in the morning?',
    answer:
      'A cold storage heater in the morning means it did not charge overnight. Check the input dial — it needs to be turned up (typically to 3-5 out of 5 in winter) before the off-peak period starts (usually around midnight). If the input was set correctly, check the consumer unit — the off-peak circuit MCB may have tripped. If the MCB is on and the input was set, the off-peak supply may not be working — the time switch or teleswitch may have failed.',
  },
  {
    question: 'What is the difference between the input and output controls?',
    answer:
      'The input control determines how much heat the heater stores overnight — set it higher in cold weather, lower in mild weather. It only affects charging during the off-peak period. The output control (usually a flap or valve on the front) regulates how quickly the stored heat is released into the room during the day. Keep the output low in the morning and increase it later in the day to make the stored heat last. Some modern storage heaters have automatic controls that manage both based on room temperature.',
  },
  {
    question: 'Why does my storage heater run out of heat by the afternoon?',
    answer:
      'This usually means the input was not set high enough to store sufficient heat for the full day, or the output was set too high, releasing the heat too quickly. In cold weather, set the input higher (4 or 5) and keep the output low. If the input is already at maximum and the heater still does not last the day, the heater may be undersized for the room, an element may have partially failed (reducing capacity), or the room may have poor insulation.',
  },
  {
    question: 'Can I use a storage heater on a normal socket?',
    answer:
      'No. Storage heaters must be on a dedicated off-peak circuit that only receives power during off-peak hours. Plugging a storage heater into a normal socket would charge it on peak-rate electricity, which is significantly more expensive and defeats the entire purpose. Storage heaters are hardwired — permanently connected to the off-peak circuit via a fused connection unit or direct connection.',
  },
  {
    question: 'How long do storage heaters last?',
    answer:
      'Storage heaters typically last 15 to 20 years. The thermal bricks retain their heat storage capacity for a very long time, but the elements embedded within them eventually fail. Once an element fails, the heater stores less heat. When multiple elements fail, the heater becomes ineffective. Modern storage heaters are significantly more efficient than older models, so replacing an old unit often provides noticeably better performance and lower running costs.',
  },
  {
    question: 'Why are all my storage heaters cold?',
    answer:
      'If every storage heater in the property is cold, the fault is almost certainly with the off-peak supply rather than individual heaters. Check the off-peak MCB in the consumer unit. Check the time switch or teleswitch — it may have failed, lost its programming, or the clock may be wrong. In some areas, the off-peak supply is controlled by a radio teleswitch that receives a signal from the energy supplier — if the teleswitch has failed, no off-peak power is delivered. Call your electricity supplier or an electrician.',
  },
  {
    question: 'Are storage heaters expensive to run?',
    answer:
      'Storage heaters use off-peak electricity, which is cheaper than standard rate — typically 40-50% cheaper depending on your tariff. A typical storage heater uses 1.7kW to 3.4kW and charges for approximately 7 hours overnight. On Economy 7, the daily charging cost for a 2kW heater is approximately one pound to one pound fifty at current rates. Modern fan-assisted storage heaters with automatic controls are significantly more efficient, using less electricity to achieve the same comfort level.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/immersion-heater-not-working',
    title: 'Immersion Heater Not Working',
    description: 'Troubleshooting immersion heaters — another common off-peak circuit application.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/fuse-keeps-blowing',
    title: 'Fuse Keeps Blowing',
    description: 'Why fuses blow — relevant if your storage heater circuit keeps tripping.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-keeps-tripping',
    title: "Tripped MCB Won't Reset",
    description: 'What to do when the MCB for your off-peak circuit will not stay on.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR inspects dedicated heating circuits and off-peak supplies.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Is My Storage Heater Not Working?',
    content: (
      <>
        <p>
          Storage heaters are the primary heating system in many UK homes, particularly flats and
          properties without gas. When they stop working — especially in winter — it is urgent.
        </p>
        <p>
          The good news is that storage heaters are mechanically simple. The bad news is that
          diagnosing faults requires understanding how they charge, how the off-peak electricity
          supply works, and what the controls do. This guide covers all of it.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How Storage Heaters Work',
    content: (
      <>
        <p>
          A storage heater is fundamentally a box of thermal bricks with electric heating elements
          embedded inside them. During the off-peak period (typically midnight to 7am on Economy 7),
          the elements heat the bricks to a high temperature. During the day, the stored heat
          radiates out into the room.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal bricks</strong> — dense clay or ceramic bricks that can store a
                large amount of heat energy. They are heated overnight and slowly release that heat
                during the day through natural radiation and convection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating elements</strong> — resistive elements embedded in or between the
                thermal bricks. Typically rated at 1.7kW to 3.4kW depending on the heater size.
                Multiple elements may be fitted, controlled individually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Input control</strong> — determines how much heat is stored. A higher
                setting allows more current to the elements during the off-peak period, storing more
                heat. Adjusted based on the weather forecast.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Output control</strong> — a damper flap or, on modern units, a fan that
                controls how quickly the stored heat is released into the room. A lower output makes
                the heat last longer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of Failure',
    content: (
      <>
        <p>
          Storage heater faults fall into two categories: problems with the heater itself and
          problems with the off-peak supply.
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Input dial set to zero</h4>
            <p className="text-white text-sm leading-relaxed">
              The single most common cause of a cold storage heater. If the input is at zero, no
              charging occurs overnight. Turn it up to 3-5 (out of 5) in cold weather before
              bedtime.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Off-peak circuit MCB tripped</h4>
            <p className="text-white text-sm leading-relaxed">
              The circuit breaker for the off-peak supply may have tripped. Check the consumer unit
              — there will be a separate MCB (or pair of MCBs) for the off-peak circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Time switch or teleswitch fault</h4>
            <p className="text-white text-sm leading-relaxed">
              The off-peak supply is controlled by a time switch or radio teleswitch. If this device
              fails, no power reaches the heaters during the off-peak period. This requires an
              electrician or your energy supplier.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Element failure</h4>
            <p className="text-white text-sm leading-relaxed">
              Elements are embedded in the thermal bricks and fail over time. A heater with one
              failed element out of two will still produce some heat but noticeably less. When all
              elements fail, the heater is dead.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Thermostat failure</h4>
            <p className="text-white text-sm leading-relaxed">
              The charge thermostat limits the maximum temperature of the bricks. If it fails open,
              the heater does not charge. If it fails closed, the heater could overheat — though a
              thermal cutout provides secondary protection.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'controls',
    heading: 'Understanding the Controls',
    content: (
      <>
        <p>
          Many storage heater problems are caused by misunderstanding the controls. Here is a clear
          explanation:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Input (charge) control</h4>
                <p className="text-white text-sm leading-relaxed">
                  Usually a dial numbered 1 to 5 (or 1 to 6). This must be set BEFORE the off-peak
                  period starts. In cold weather, set to 4 or 5. In mild weather, 1 or 2. Setting it
                  to zero means no heat is stored. Changing the input during the day has no
                  immediate effect — it only affects the next overnight charge.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Output (release) control</h4>
                <p className="text-white text-sm leading-relaxed">
                  A flap or damper that controls heat release. Keep it closed (or on low) in the
                  morning and open it gradually through the day. This makes the stored heat last.
                  Opening the output fully in the morning will release all the heat quickly, leaving
                  you cold by the afternoon.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Boost (some models)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Some modern storage heaters have a convector boost element that uses peak-rate
                  electricity for immediate top-up heat. This is expensive to run but useful for
                  occasional cold snaps. It is separate from the main storage elements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'economy-7',
    heading: 'Economy 7 and Off-Peak Supply',
    content: (
      <>
        <p>
          Storage heaters depend on off-peak electricity — a cheaper tariff available during
          designated hours (typically midnight to 7am on Economy 7, or split hours on Economy 10).
        </p>
        <p>The off-peak supply is typically controlled by one of these methods:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time switch</strong> — a clock-operated switch in or near the consumer unit
                that connects the off-peak circuit during the programmed hours. If the clock is
                wrong or the switch has failed, the off-peak circuit does not receive power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radio teleswitch</strong> — receives a signal from the energy supplier
                (broadcast via BBC Radio 4 long wave) to switch the off-peak circuit on and off.
                Older technology that is being phased out. If the teleswitch fails, contact your
                energy supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter</strong> — modern smart meters can control off-peak switching
                directly. If you have a smart meter and your off-peak supply is not working, contact
                your energy supplier.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If all your storage heaters are cold but the rest of your electricity works, the off-peak
          supply control is the first thing to investigate.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check Yourself',
    content: (
      <>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Input dial setting</h4>
            <p className="text-white text-sm leading-relaxed">
              Check that the input is turned up. In winter, set it to 4 or 5. Wait for the next
              overnight charge period before concluding there is a fault.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Consumer unit</h4>
            <p className="text-white text-sm leading-relaxed">
              Check the off-peak circuit MCB. It may be labelled "off-peak", "storage heaters", or
              "Economy 7". If it has tripped, reset it. If it trips again, call an electrician.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Time switch</h4>
            <p className="text-white text-sm leading-relaxed">
              If visible, check that the time switch clock shows the correct time. After power cuts,
              the clock may need resetting. Some time switches have a manual override — try it.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">4. Individual heater check</h4>
            <p className="text-white text-sm leading-relaxed">
              If some heaters work but one does not, the fault is with that individual heater
              (element or thermostat failure) rather than the supply.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>Call an electrician if:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak MCB keeps tripping</strong> — indicates a fault on the off-peak
                circuit. Could be element insulation breakdown, wiring fault, or overloaded circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell from a storage heater</strong> — isolate the circuit and call
                an electrician. Overheating connections or failed elements can be a fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>None of the storage heaters are charging</strong> — if all heaters are cold
                despite correct settings, the off-peak supply or time switch has failed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>One heater is not working</strong> — likely an element or thermostat
                failure. An electrician can test the element resistance and insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New storage heater installation</strong> — storage heaters must be hardwired
                to the off-peak circuit. This is electrical installation work requiring a qualified
                electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Storage Heater Circuits and Diagnosis',
    content: (
      <>
        <p>
          Storage heater work requires understanding of off-peak metering and dual-tariff
          installations:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Off-Peak Supply Diagnosis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Check the time switch or teleswitch for correct operation. Verify the off-peak
                  contactor (if fitted) is engaging. Check voltage at the off-peak distribution
                  board during the off-peak period. If the supply is controlled by a radio
                  teleswitch and it has failed, the supplier needs to replace it.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Element Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the circuit. Disconnect the element wires. Test element resistance —
                  should match the rated wattage (R = V squared / P). Test insulation resistance at
                  500V between element and earth — minimum 1 megohm. Low IR readings confirm
                  insulation breakdown.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Replacement and Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Modern storage heaters (Dimplex Quantum, Elnur, etc.) are significantly more
                  efficient with fan-assisted heat release and automatic controls. When replacing,
                  check the circuit capacity — modern high-output heaters may require a larger cable
                  and MCB. Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for the replacement.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document storage heater installations on your phone"
          description="Elec-Mate's certificate apps let you record test results and issue certificates for storage heater work with instant PDF export. Join 1,000+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function StorageHeaterNotWorkingPage() {
  return (
    <GuideTemplate
      title="Storage Heater Not Working | Causes & Fixes"
      description="Why is your storage heater not heating? Covers input/output controls, Economy 7 off-peak supply faults, element failure, and time switch problems. UK guide for homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Storage Heater Not Working: <span className="text-yellow-400">Causes and Fixes</span>
        </>
      }
      heroSubtitle="Cold storage heaters? This guide explains how they work, what the input and output controls do, why your off-peak supply might have failed, and when you need an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Storage Heater Problems"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document Heating Circuit Faults on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI fault diagnosis, test recording, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
