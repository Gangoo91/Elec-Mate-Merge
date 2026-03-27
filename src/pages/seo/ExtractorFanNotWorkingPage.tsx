import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Fan,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Droplets,
  Timer,
  ToggleRight,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Extractor Fan Not Working', href: '/guides/extractor-fan-not-working' },
];

const tocItems = [
  { id: 'overview', label: 'Why Has My Extractor Fan Stopped Working?' },
  { id: 'quick-checks', label: 'Quick Checks You Can Do Yourself' },
  { id: 'common-causes', label: 'Common Causes' },
  { id: 'bathroom-vs-kitchen', label: 'Bathroom vs Kitchen Fans' },
  { id: 'pull-cord-vs-isolator', label: 'Pull Cord vs Isolator Switch Types' },
  { id: 'building-regs', label: 'Building Regulations Part F' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The most common reason an extractor fan stops working is the isolator switch being turned off accidentally. Always check the isolator first before assuming a fault.',
  'Timer relay failure is extremely common in bathroom fans — the fan may stop running on after the light is switched off, or may not come on at all. The relay is a cheap part but replacement usually requires an electrician.',
  'Humidity sensor failure causes intermittent or no operation in humidistat fans. The sensor can be cleaned or the fan unit replaced.',
  'A wiring fault between the switch and the fan, or a failed permanent live feed, will prevent operation entirely. This requires an electrician to diagnose and repair.',
  'Motor burnout occurs in older fans, especially where the bearings have worn. A seized or humming fan that does not spin needs replacing.',
  'Building Regulations Approved Document F requires mechanical ventilation in bathrooms, kitchens, and utility rooms. A non-working extractor fan means your property may not meet ventilation requirements.',
];

const faqs = [
  {
    question: 'Why has my bathroom extractor fan stopped working?',
    answer:
      'The most common cause is the isolator switch being off — check the pull cord or ceiling switch near the fan. If the switch is on, the next most likely cause is a failed timer relay (the fan no longer runs on after the light is switched off). Other causes include a blown fuse at the consumer unit, a wiring fault, or motor burnout. If the fan hums but does not spin, the motor bearings have likely seized and the fan needs replacing.',
  },
  {
    question: 'Can I replace an extractor fan myself?',
    answer:
      'If you are replacing a fan with a like-for-like unit in the same location, using the same wiring, this is generally considered non-notifiable minor works. However, if the replacement involves any new wiring, a change of circuit, or installation in a bathroom (a special location under BS 7671), it should be carried out by a qualified electrician. Bathroom installations involve IP ratings and zone requirements that must be correct for safety.',
  },
  {
    question: 'Why does my extractor fan run all the time?',
    answer:
      'A fan that runs continuously usually has a faulty timer relay that has failed in the "on" position, a humidity sensor stuck in the activated state, or a wiring fault where the switched live and permanent live feeds have been connected incorrectly. In some cases, the fan has been deliberately wired to the permanent live only (no timer or switch control), which means it runs whenever the isolator is on. An electrician can diagnose which scenario applies and correct it.',
  },
  {
    question: 'How long should a bathroom extractor fan run after I leave?',
    answer:
      'Most timer fans are adjustable, typically from 1 to 30 minutes overrun. Building Regulations Approved Document F recommends a minimum of 15 minutes overrun for intermittent fans in bathrooms. The timer is usually adjustable on the fan unit itself — there is a small dial or potentiometer on the fan body. If the overrun time has changed, the timer relay may be failing.',
  },
  {
    question: 'My extractor fan is very noisy — is it about to fail?',
    answer:
      'Increased noise from an extractor fan is a strong indicator of bearing wear. As the bearings deteriorate, the fan vibrates more and produces a grinding, rattling, or high-pitched whining sound. A fan in this condition will eventually seize completely. Replacing the fan before it seizes prevents potential overheating of the motor. Noise can also come from a loose back-draught shutter rattling in the airflow — this is less serious but still worth investigating.',
  },
  {
    question: 'Do I need an extractor fan in my kitchen?',
    answer:
      'Building Regulations Approved Document F requires mechanical extract ventilation in kitchens where there is no openable window providing adequate background ventilation. Even where windows are present, a cooker hood extracting to outside or a mechanical extract fan is strongly recommended. The minimum extract rate for a kitchen is 60 litres per second (intermittent) or 13 litres per second (continuous). A non-working kitchen extractor increases condensation, cooking odours, and moisture levels.',
  },
  {
    question: 'What IP rating does a bathroom extractor fan need?',
    answer:
      'The required IP rating depends on the bathroom zone. In Zone 1 (directly above the bath or shower up to 2.25m height), the fan must be at least IPX4 (splash-proof). In Zone 2 (within 0.6m of Zone 1 boundary), IPX4 is also required. Outside the zones, IPX1 is technically sufficient but IPX4 is recommended. Most bathroom extractor fans sold in the UK are rated IPX4 or higher. Check the rating on the fan label before installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for diagnosing non-working circuits and equipment.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bathroom-electrics',
    title: 'Bathroom Electrics Guide',
    description: 'Zone requirements, IP ratings, and regulations for electrical installations in bathrooms.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Understanding MCBs, RCDs, and circuit protection in your consumer unit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and how it identifies wiring faults and non-compliant installations.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Documentation required when replacing or repairing an extractor fan installation.',
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
    heading: 'Why Has My Extractor Fan Stopped Working?',
    content: (
      <>
        <p>
          You switch on the bathroom light, wait for the familiar hum of the extractor fan, and nothing
          happens. Or the fan in the kitchen has gone silent. A non-working extractor fan is one of the
          most common electrical issues in UK homes — and while it might seem minor, it affects
          ventilation, condensation, and can indicate a wiring fault.
        </p>
        <p>
          The good news is that many extractor fan problems have simple causes. The isolator switch may
          have been turned off accidentally, the timer relay may have failed, or the humidity sensor may
          need cleaning. Some causes are more serious — wiring faults, motor burnout, or a tripped
          circuit breaker can all stop a fan from working.
        </p>
        <p>
          This guide covers every common cause, explains the difference between bathroom and kitchen fan
          types, tells you what you can check yourself, and explains when you need a qualified
          electrician. If you are an electrician, the later sections cover{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding">
            fault finding techniques
          </SEOInternalLink>{' '}
          specific to extractor fan circuits.
        </p>
      </>
    ),
  },
  {
    id: 'quick-checks',
    heading: 'Quick Checks You Can Do Yourself',
    content: (
      <>
        <p>
          Before calling an electrician, run through these checks. They catch the most common causes and
          could save you a call-out fee:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Check the isolator switch</h4>
            <p className="text-white text-sm leading-relaxed">
              Every extractor fan should have an isolator switch. In bathrooms, this is usually a pull
              cord on the ceiling or a switched fused connection unit outside the bathroom. Check that it
              is in the "on" position. Pull cords can be accidentally turned off, and family members may
              have switched off the isolator without realising it controls the fan.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Check the consumer unit</h4>
            <p className="text-white text-sm leading-relaxed">
              Look at the consumer unit (fuse board) and check whether any circuit breakers have tripped.
              The fan circuit may share a breaker with the lighting circuit. If a breaker is in the
              middle or "off" position, try resetting it. If it trips again immediately, there is a
              fault — do not keep resetting it.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Check the fused connection unit</h4>
            <p className="text-white text-sm leading-relaxed">
              If the fan is supplied through a fused connection unit (FCU), check the fuse inside it.
              Pull out the fuse carrier and inspect the fuse — replace with a 3A fuse if blown. The FCU
              is usually mounted on the wall near the fan or just outside the bathroom door.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">4. Listen for a hum</h4>
            <p className="text-white text-sm leading-relaxed">
              With the fan switched on, listen carefully at the fan grille. If you can hear a faint hum
              but the fan is not spinning, the motor is receiving power but the bearings have seized or
              the impeller is jammed. This means the fan unit needs replacing — a humming, non-spinning
              motor will overheat if left connected.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of Extractor Fan Failure',
    content: (
      <>
        <p>
          If the quick checks above have not identified the problem, one of these faults is likely
          responsible:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolator switch fault</strong> — the switch itself may have failed internally.
                Pull cord switches are mechanical and wear out over thousands of operations. The switch
                may feel like it is toggling but the internal contacts are no longer making connection.
                A simple voltage test at the fan terminals confirms whether power is reaching the fan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer relay failure</strong> — in fans wired to run on after the light is
                switched off, the internal timer relay controls the overrun period. When this relay
                fails, the fan either stops running on (but works while the light is on), or does not
                operate at all if the timer controls the main power path. This is very common in fans
                over 5 years old.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humidity sensor failure</strong> — humidistat fans have an internal sensor that
                activates the fan when moisture levels rise. These sensors degrade over time,
                particularly in high-moisture environments. The fan may stop responding to humidity
                changes or may not activate at all. Some models allow you to clean the sensor; others
                require full unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring fault</strong> — a broken conductor in the cable between the switch and
                the fan, or a loose connection at a junction box in the ceiling void, will prevent power
                reaching the fan. This is invisible from outside and requires an electrician with test
                equipment to locate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor burnout</strong> — extractor fan motors have a limited lifespan,
                typically 8 to 15 years depending on usage and quality. Signs of motor failure include
                humming without spinning, intermittent operation, burning smell, or complete silence.
                A burned-out motor cannot be repaired — the fan unit must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped RCD</strong> — if the fan has developed an earth fault (often from
                moisture ingress), it may trip the RCD in the consumer unit. Under Regulation 411.3.3
                of BS 7671, RCD protection with a rated residual operating current not exceeding 30mA
                is required for circuits in locations containing a bath or shower. An RCD that trips
                when the fan circuit is energised indicates an earth fault that must be found and
                repaired before the fan is used.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bathroom-vs-kitchen',
    heading: 'Bathroom Fans vs Kitchen Fans',
    content: (
      <>
        <p>
          Bathroom and kitchen extractor fans serve different purposes and have different technical
          requirements. Understanding the differences helps you identify problems and communicate
          effectively with your electrician:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Bathroom Extractor Fans</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              Bathroom fans extract moisture-laden air to prevent condensation and mould. They are
              typically axial fans (100mm or 150mm diameter) mounted in the ceiling or external wall.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Must be rated at least IPX4 for splash protection in Zones 1 and 2</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Usually wired with a timer for overrun after the light is switched off</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Require both a permanent live (for the timer) and a switched live (from the light circuit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Minimum extract rate: 15 litres per second (intermittent) per Approved Document F</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Pull cord isolators are common because standard plate switches are not permitted in bathrooms</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Kitchen Extractor Fans</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              Kitchen fans extract cooking fumes, steam, and grease-laden air. They range from simple
              wall-mounted axial fans to integrated cooker hoods with centrifugal fans.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Do not require elevated IP ratings (kitchens are not special locations under BS 7671)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Often controlled by a standard wall switch or the cooker hood controls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Minimum extract rate: 60 litres per second (intermittent) or 13 l/s (continuous)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Grease filters require regular cleaning — blocked filters reduce airflow and strain the motor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Cooker hoods plugged into a socket are simple to diagnose — wall-mounted fans wired in may need an electrician</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pull-cord-vs-isolator',
    heading: 'Pull Cord vs Isolator Switch Types',
    content: (
      <>
        <p>
          The type of switch controlling your fan affects both the possible faults and how the fan is
          wired. Understanding which type you have helps narrow down the problem:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling pull cord switch</strong> — the most common type in bathrooms. The pull
                cord mechanically toggles an internal switch. These wear out over time — the internal
                spring weakens and the contacts corrode, particularly in humid bathroom environments.
                If pulling the cord does not produce a definite click, the switch mechanism has likely
                failed. Replacement is straightforward for an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused connection unit (FCU) with switch</strong> — a switched FCU outside the
                bathroom provides both isolation and fuse protection. The internal 3A fuse can blow,
                cutting power to the fan. Check the fuse before suspecting a wiring fault. The switch
                on the FCU may also be turned off accidentally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Linked to light switch</strong> — many bathroom fans are wired so that the
                light switch provides the switched live to trigger the fan. The fan has a separate
                permanent live for the timer overrun. If only the overrun has stopped working but the
                fan runs while the light is on, the permanent live feed may be interrupted (check FCU
                or dedicated breaker). If the fan does not work at all, the switched live connection may
                be faulty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ToggleRight className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humidistat/PIR automatic control</strong> — some fans have built-in humidity
                sensors or PIR motion detectors that activate the fan automatically. These have no
                manual switch (other than the isolator). If the fan stops activating, the sensor may
                have failed. Some models have a manual override — check the fan body for a small
                switch or button.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations Part F: Ventilation Requirements',
    content: (
      <>
        <p>
          A non-working extractor fan is not just an inconvenience — it may mean your property does not
          comply with{' '}
          <strong>Building Regulations Approved Document F (Ventilation)</strong>. This matters for
          your health, your property, and if you are selling or renting.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key Part F Requirements</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathrooms and shower rooms</strong> — must have mechanical extract ventilation
                if there is no openable window. Even with a window, mechanical extract is strongly
                recommended. Minimum rate: 15 l/s intermittent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchens</strong> — must have extract ventilation. Minimum rate: 60 l/s
                intermittent (cooker hood) or 30 l/s (elsewhere in kitchen), or 13 l/s continuous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Utility rooms</strong> — must have extract ventilation. Minimum rate: 30 l/s
                intermittent or 8 l/s continuous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overrun timers</strong> — Part F recommends a minimum 15-minute overrun for
                intermittent fans in rooms without openable windows. This is why the timer relay is so
                important.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For landlords, a non-working extractor fan in a bathroom or kitchen can be flagged during an
          EICR or a local authority inspection. It may also contribute to condensation and mould
          issues, which fall under the Homes (Fitness for Human Habitation) Act 2018.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          If the quick checks (isolator, consumer unit, fuse) have not resolved the problem, you need
          an electrician. Here is the urgency scale:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent (same day)</strong> — the fan is humming but not spinning (motor
                overheating risk), there is a burning smell from the fan, or the RCD keeps tripping
                when the fan circuit is energised. Isolate the fan at the consumer unit and call an
                electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soon (within a few days)</strong> — the fan has stopped working completely
                (no hum, no smell, just silent). The fan is not dangerous in this state, but the lack
                of ventilation will cause condensation and potentially mould growth, especially in
                bathrooms used daily.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine (within a week or two)</strong> — the fan works but the timer overrun
                has stopped, or the fan is noisier than usual. The fan is still providing some
                ventilation but is not operating correctly and may fail completely soon.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When the electrician visits, they should test for voltage at the fan terminals, check the
          switch and wiring continuity, inspect the fan motor condition, and verify the timer and
          sensor functions. If the fan needs replacing, they should ensure the new fan meets the IP
          rating requirements for the location and the extract rate requirements of Part F.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagnosing Extractor Fan Faults',
    content: (
      <>
        <p>
          Extractor fan call-outs are bread-and-butter work. A systematic approach saves time and
          ensures you catch the actual fault first time:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Test Voltage at Fan Terminals</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate at the consumer unit, remove the fan cover, and identify the terminals.
                  Re-energise and test for 230V between L and N with the switch on. Test both the
                  permanent live (should be live whenever the isolator is on) and the switched live
                  (should be live when the light/switch is on). No voltage on permanent live? Check the
                  FCU fuse and wiring back to the junction box. No voltage on switched live? Check the
                  light switch connections and the switch wire.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Check the Timer and Sensor</h4>
                <p className="text-white text-sm leading-relaxed">
                  If voltage is present but the fan does not operate, the internal timer relay or
                  humidity sensor has likely failed. Test by bridging the switched live to the permanent
                  live briefly — if the fan runs, the timer/sensor circuit is the fault. Many fans have
                  replaceable timer modules; others require full unit replacement. Check the timer
                  adjustment potentiometer has not been turned to minimum.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Insulation Resistance and Earth</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the fan trips the RCD, disconnect the fan and test insulation resistance on the
                  cable (500V DC, L-E and N-E). Minimum 1 megohm. If the cable passes, the fault is in
                  the fan unit itself — moisture ingress into the motor is common, particularly in
                  ceiling-mounted bathroom fans where condensation can track along the duct. Replace
                  the fan and check the duct for condensation traps. Under Regulation 411.3.3,
                  additional protection by an RCD with a rated residual operating current not exceeding
                  30mA is required for circuits in locations containing a bath or shower.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Replace and Certify</h4>
                <p className="text-white text-sm leading-relaxed">
                  When replacing a fan, ensure the new unit meets the IP rating for the zone, matches
                  or exceeds the Part F extract rate, and is compatible with the existing wiring
                  configuration (2-wire, 3-wire, or 4-wire). Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  for the replacement. Test RCD operation after installation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete fan replacement certificates on your phone"
          description="Elec-Mate lets you issue Minor Works Certificates on site with pre-filled templates for fan replacements. Add test results, observations, and export professional PDFs instantly."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExtractorFanNotWorkingPage() {
  return (
    <GuideTemplate
      title="Extractor Fan Not Working | Troubleshooting Guide"
      description="Extractor fan not working? Learn the common causes — isolator switch, timer relay failure, humidity sensor fault, motor burnout — and when to call an electrician. Covers bathroom and kitchen fans, Building Regs Part F, and pull cord vs isolator types."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Fan}
      heroTitle={
        <>
          Extractor Fan Not Working:{' '}
          <span className="text-yellow-400">Troubleshooting Guide</span>
        </>
      }
      heroSubtitle="Your extractor fan has stopped working. This guide covers every common cause — from a switched-off isolator to motor burnout — tells you what to check yourself, and explains when you need an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Extractor Fan Problems"
      relatedPages={relatedPages}
      ctaHeading="Certify Fan Replacements on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for Minor Works Certificates, EICR reports, and AI-powered fault diagnosis. 7-day free trial, cancel anytime."
    />
  );
}
