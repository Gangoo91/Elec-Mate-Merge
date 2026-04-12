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
  Droplets,
  Timer,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Immersion Heater Not Working', href: '/guides/immersion-heater-not-working' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Immersion Heater Not Working?' },
  { id: 'how-it-works', label: 'How an Immersion Heater Works' },
  { id: 'common-causes', label: 'Common Causes of Failure' },
  { id: 'thermostat-issues', label: 'Thermostat Problems' },
  { id: 'element-failure', label: 'Element Failure' },
  { id: 'what-to-check', label: 'What to Check Yourself' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An immersion heater that produces no hot water is usually caused by a tripped MCB or RCD, a blown element, a faulty thermostat, or a failed timer. Check your consumer unit first — the immersion heater circuit breaker may have tripped.',
  'Immersion heaters require a dedicated circuit, typically a 16A radial circuit using 2.5mm twin and earth cable, fed from a 20A double-pole switch with a neon indicator (to show when the circuit is live).',
  'The element is submerged in water and eventually corrodes. Hard water areas experience faster element failure due to limescale buildup, which insulates the element, causes it to overheat, and eventually fail.',
  'Regulation 411.3.3 of BS 7671 requires RCD protection for circuits where the risk of electric shock is increased. The immersion heater circuit should have RCD protection — either from the main switch RCD, an RCBO, or a dedicated RCD.',
  'A tripping RCD or MCB on the immersion circuit is a warning sign. It indicates either element insulation breakdown (current leaking to earth through the water) or a wiring fault. Do not keep resetting — call an electrician.',
  'The thermal cutout (overheat protection) on the thermostat may have tripped. This is a safety device that prevents the water from boiling. It can be manually reset with a small tool, but if it keeps tripping, the thermostat is faulty.',
];

const faqs = [
  {
    question: 'Why is my immersion heater not heating the water?',
    answer:
      'Check the consumer unit first — the MCB for the immersion circuit may have tripped. If not, check the double-pole isolator switch near the hot water cylinder — it should be switched on with the neon indicator lit. If both are on and there is still no hot water, the element has likely failed, the thermostat is faulty, or the timer (if fitted) is not calling for heat. An electrician can test the element and thermostat quickly with a multimeter.',
  },
  {
    question: 'How long should an immersion heater take to heat water?',
    answer:
      'A standard 3kW immersion heater takes approximately 1 to 2 hours to heat a full cylinder (120-180 litres) from cold. If you have a dual-element cylinder, the top element heats just the top portion (enough for a quick sink wash) in about 20-30 minutes. If your heater is taking significantly longer than usual, the element may be partially failed, limescale buildup may be insulating the element, or the thermostat may be set too low.',
  },
  {
    question: 'Can a faulty immersion heater increase my electricity bill?',
    answer:
      'Yes, significantly. A thermostat that sticks in the on position keeps heating the water continuously — a 3kW element running 24 hours costs approximately twelve pounds per day at current electricity rates. If your electricity bill has suddenly increased and you have an immersion heater, check that it switches off when the water reaches temperature. A faulty thermostat that does not cut out is one of the most expensive domestic electrical faults.',
  },
  {
    question: 'Why does my immersion heater keep tripping the RCD?',
    answer:
      'An immersion heater that trips the RCD almost always indicates element insulation breakdown. The heating element is submerged in water, and when the insulation between the element and its outer sheath deteriorates, current leaks through the water to the cylinder (which is earthed). This earth fault current trips the RCD. The element needs replacing — do not keep resetting the RCD as the fault will only worsen.',
  },
  {
    question: 'What is the red button on my immersion heater thermostat?',
    answer:
      'The red button is the thermal cutout (overheat protection). It trips when the water temperature exceeds a safe limit (typically 85-90 degrees Celsius), disconnecting the element to prevent the water from boiling. You can reset it by pressing it firmly with a small screwdriver. If it keeps tripping, the thermostat is failing to cut out at the set temperature and needs replacing.',
  },
  {
    question: 'Should I leave my immersion heater on all the time?',
    answer:
      'Generally no — it is more economical to heat water when you need it, either manually or with a timer. A well-insulated cylinder loses heat slowly, so heating water for an hour before you need it is usually sufficient. Leaving the immersion on continuously wastes energy maintaining the temperature against heat losses, even with good insulation. The exception is if you are on an Economy 7 tariff with a dual-element cylinder — the bottom element can heat overnight on cheap-rate electricity.',
  },
  {
    question: 'Can I replace the immersion heater element myself?',
    answer:
      'Replacing an immersion heater element involves draining the cylinder, removing the old element (which requires a large immersion heater spanner), fitting the new element with a gasket, refilling and checking for leaks, then reconnecting the wiring. While not notifiable under Part P (it is a like-for-like replacement on an existing circuit), the electrical connections should be made correctly and the circuit tested. If you are not confident with electrical connections, call an electrician.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/storage-heater-not-working',
    title: 'Storage Heater Not Working',
    description: 'Troubleshooting storage heaters — another common domestic heating circuit issue.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/fuse-keeps-blowing',
    title: 'Fuse Keeps Blowing',
    description: 'Why fuses blow — relevant if your immersion heater circuit fuse keeps going.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-keeps-tripping',
    title: "Tripped MCB Won't Reset",
    description: 'What to do when the MCB for your immersion heater will not stay on.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR checks dedicated circuits including immersion heater supplies.',
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
    heading: 'Why Is My Immersion Heater Not Working?',
    content: (
      <>
        <p>
          No hot water is one of the most disruptive household problems, and if your home relies on
          an immersion heater — either as the primary water heating method or as a backup to a
          boiler — a failure needs diagnosing quickly.
        </p>
        <p>
          Immersion heaters are electrically simple devices: a heating element, a thermostat, a
          dedicated electrical circuit, and a switch. When one of these components fails, the hot
          water stops. This guide covers every common fault, what you can safely check, and when to
          call an electrician.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How an Immersion Heater Works',
    content: (
      <>
        <p>
          An immersion heater is an electric heating element fitted directly into the hot water
          cylinder. It works like a large kettle element — current flows through a resistive
          element, generating heat that transfers directly to the water.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element</strong> — typically 3kW (13A at 230V), made of a resistive wire
                inside a copper or incoloy sheath. Submerged in the water inside the cylinder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat</strong> — controls the water temperature, typically set between
                60-65 degrees Celsius. When the water reaches the set temperature, the thermostat
                disconnects the element. Has a thermal cutout for overheat protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — immersion heaters must be on their own circuit,
                typically 2.5mm twin and earth on a 16A or 20A breaker. Fed via a double-pole
                isolator switch with neon indicator near the cylinder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer (optional)</strong> — many installations include a time clock to heat
                water at specific times, often linked to Economy 7 off-peak electricity tariffs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Some cylinders have dual elements — a short element at the top for quick heating of a
          small volume, and a long element at the bottom for heating the full cylinder.
        </p>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of Failure',
    content: (
      <>
        <p>
          Here are the most common reasons an immersion heater stops working, in order of
          likelihood:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Tripped circuit breaker or RCD</h4>
            <p className="text-white text-sm leading-relaxed">
              The most common and easiest to fix. Check your consumer unit. If the MCB for the
              immersion circuit is in the off position, switch it back on. If it trips again
              immediately, there is a fault — do not keep resetting it.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Faulty thermostat</h4>
            <p className="text-white text-sm leading-relaxed">
              The thermostat may have failed in the open position (no power to element) or the
              thermal cutout may have tripped. Check for the red reset button on the thermostat —
              press it firmly. If the heater works briefly then stops, the thermostat is faulty.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Failed element</h4>
            <p className="text-white text-sm leading-relaxed">
              The element itself has failed — either open circuit (broken element wire, no
              continuity) or short circuit to earth (insulation breakdown). An electrician can test
              this with a multimeter in minutes. Elements have a typical lifespan of 5 to 15 years
              depending on water hardness.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Timer fault</h4>
            <p className="text-white text-sm leading-relaxed">
              If the immersion is on a timer, the timer may have failed or the settings may be
              wrong. Try switching to manual (override/boost) to bypass the timer. If the heater
              works on manual, the timer needs replacing or reprogramming.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Isolator switch off</h4>
            <p className="text-white text-sm leading-relaxed">
              The double-pole switch near the cylinder may have been turned off accidentally. Check
              that it is in the on position and the neon indicator is lit.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-issues',
    heading: 'Thermostat Problems',
    content: (
      <>
        <p>The thermostat is the brain of the immersion heater, and it fails in several ways:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stuck open</strong> — the thermostat contacts do not close, so no power
                reaches the element. No hot water at all. The thermostat needs replacing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stuck closed</strong> — the thermostat contacts do not open, so the element
                runs continuously. The thermal cutout eventually trips to prevent overheating. This
                is the scenario that causes massive electricity bills. Replace urgently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal cutout tripped</strong> — the red reset button has popped out,
                disconnecting the element. Press to reset. If it keeps tripping, the thermostat is
                not cutting out at the set temperature and needs replacing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Set too low</strong> — if the thermostat is set below 60 degrees Celsius,
                the water may not feel hot enough. However, do not set it above 65 degrees — there
                is a scalding risk. The recommended range is 60-65 degrees Celsius, which also
                prevents Legionella bacteria growth.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'element-failure',
    heading: 'Element Failure',
    content: (
      <>
        <p>
          Immersion heater elements operate in a hostile environment — submerged in water, heated to
          high temperatures, and subject to limescale buildup. Eventually, they fail.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Types of Element Failure</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold shrink-0">1.</span>
              <span>
                <strong>Open circuit</strong> — the element wire has broken. No current flows, no
                heat. The MCB stays on but there is no hot water. Confirmed by a multimeter reading
                infinite resistance across the element terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold shrink-0">2.</span>
              <span>
                <strong>Short to earth</strong> — the insulation between the element wire and the
                outer sheath has broken down. Current leaks to earth through the water, tripping the
                RCD. This is the most common failure mode and is caused by corrosion and limescale.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold shrink-0">3.</span>
              <span>
                <strong>Partial failure</strong> — the element still works but at reduced output.
                Heating takes much longer than usual. May be caused by limescale insulating part of
                the element surface.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Hard water areas (much of southern and eastern England) experience faster element failure
          due to limescale. The scale insulates the element, causing it to run hotter than designed,
          which accelerates corrosion and insulation breakdown.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check Yourself',
    content: (
      <>
        <p>Before calling an electrician, safely check these things:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Consumer unit</h4>
            <p className="text-white text-sm leading-relaxed">
              Check that the MCB or fuse for the immersion heater circuit is in the on position. If
              it has tripped, reset it once. If it trips again, do not reset — call an electrician.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Isolator switch</h4>
            <p className="text-white text-sm leading-relaxed">
              Check the double-pole switch near the hot water cylinder. It should be on with the
              neon indicator lit. If the neon is off but the switch is on, either the neon has
              failed or there is no power at the switch.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Timer</h4>
            <p className="text-white text-sm leading-relaxed">
              If the heater is on a timer, try switching to manual/boost to bypass the timer. If hot
              water arrives on manual, the timer is the problem.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">4. Thermal cutout</h4>
            <p className="text-white text-sm leading-relaxed">
              If safe to access, remove the cover on the immersion heater thermostat (this does not
              involve live electrical parts if the isolator is off) and press the red reset button
              firmly. Restore power and wait an hour.
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
        <p>Call an electrician if any of the following apply:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB or RCD keeps tripping</strong> — this indicates element insulation
                breakdown or a wiring fault. The fault will not fix itself and will worsen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell from the immersion heater area</strong> — overheating wiring
                connections are a fire risk. Isolate the circuit immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>No hot water after checking the basics</strong> — if the MCB is on, the
                isolator is on, the timer is set correctly, and the thermal cutout is not tripped,
                the element or thermostat has failed and needs testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water leaking from the immersion boss</strong> — water around electrical
                connections is extremely dangerous. Isolate the circuit and call an electrician and
                a plumber.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity bill has suddenly increased</strong> — a stuck thermostat
                running the element continuously can add hundreds of pounds to your bill. An
                electrician can diagnose this in minutes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Immersion Heater Diagnosis and Replacement',
    content: (
      <>
        <p>Immersion heater work is common and straightforward. Here is the systematic approach:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Initial Tests</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate at the double-pole switch. Disconnect the element wires. Test element
                  resistance (should be approximately 17.5 ohms for a 3kW element: R = V squared /
                  P). Test insulation resistance at 500V between each terminal and earth — minimum 1
                  megohm. Low IR readings confirm element insulation breakdown.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Element Replacement</h4>
                <p className="text-white text-sm leading-relaxed">
                  Drain the cylinder (or at least below the immersion boss level). Use an immersion
                  heater spanner to remove the old element. Clean the boss thread. Fit the new
                  element with a fibre washer, torqued to manufacturer specification. Refill, check
                  for leaks, then reconnect wiring.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Test and Commission</h4>
                <p className="text-white text-sm leading-relaxed">
                  After replacement: verify element resistance, IR test, continuity of protective
                  conductor, RCD trip test. Set thermostat to 60-65 degrees Celsius. Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  if the circuit was modified, or document the like-for-like replacement.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document immersion heater work on your phone"
          description="Elec-Mate's certificate apps let you record test results, issue Minor Works Certificates, and export professional PDFs on site. Join 1,000+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ImmersionHeaterNotWorkingPage() {
  return (
    <GuideTemplate
      title="Immersion Heater Not Working | Causes & Fixes"
      description="Why is your immersion heater not heating water? Covers tripped MCBs, faulty thermostats, failed elements, and timer problems. Step-by-step diagnosis for UK homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Immersion Heater Not Working: <span className="text-yellow-400">Causes and Fixes</span>
        </>
      }
      heroSubtitle="No hot water from your immersion heater? This guide covers every common cause — tripped breakers, faulty thermostats, failed elements, and timer problems — what to check yourself, and when to call an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Immersion Heater Problems"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document Heating Circuit Faults on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI fault diagnosis, test result recording, and professional certificates. 7-day free trial, cancel anytime."
    />
  );
}
