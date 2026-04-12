import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Bell,
  Wrench,
  Zap,
  Battery,
  Cable,
  ClipboardCheck,
  DoorOpen,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Doorbell Not Working', href: '/guides/doorbell-not-working' },
];

const tocItems = [
  { id: 'overview', label: 'Why Has My Doorbell Stopped Working?' },
  { id: 'types', label: 'Types of Doorbells' },
  { id: 'wired-faults', label: 'Wired Doorbell Faults' },
  { id: 'wireless-faults', label: 'Wireless Doorbell Faults' },
  { id: 'smart-doorbells', label: 'Smart Doorbell Issues' },
  { id: 'what-to-check', label: 'What to Check Yourself' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Wired doorbells typically operate on extra-low voltage (8-24V AC) from a bell transformer. The most common faults are transformer failure, broken bell wire, a sticking or corroded push button, and a failed chime unit.',
  'Wireless doorbells are battery-powered and the most common fault is simply flat batteries — either in the push button, the chime unit, or both. Range issues and interference can also cause problems.',
  'Smart doorbells (Ring, Nest, etc.) require a stable Wi-Fi connection and adequate power supply. Low voltage from an undersized or failing transformer is the most common cause of smart doorbell problems.',
  'Wired doorbell transformers must comply with BS 7671 requirements for separation from the mains supply. The transformer provides SELV (Separated Extra-Low Voltage) isolation.',
  'If your wired doorbell has stopped working and you have a traditional bell transformer, check the transformer first — they do fail, and a failed transformer means no power to the bell circuit.',
  'For any work involving mains wiring (transformer replacement, new wired doorbell installation), call a qualified electrician. The bell wire itself is extra-low voltage and safe to handle.',
];

const faqs = [
  {
    question: 'Why has my wired doorbell stopped working?',
    answer:
      'The most common causes in order of likelihood are: the bell transformer has failed (no power to the circuit); the push button contacts are corroded or stuck (especially if exposed to weather); the bell wire is broken (often at the point where it passes through the door frame); or the chime unit has failed. Check the transformer first — if there is no voltage across the secondary terminals, the transformer is the problem.',
  },
  {
    question: 'How do I know if my doorbell transformer is faulty?',
    answer:
      'Use a multimeter set to AC voltage on the secondary (output) side of the transformer. You should read between 8V and 24V AC depending on the transformer rating. If you read zero volts, the transformer has failed or is not receiving mains power. Check the mains supply to the transformer — it may be fed from a lighting circuit or a fused connection unit. If the mains supply is present but there is no output, the transformer needs replacing.',
  },
  {
    question: 'Can I replace a doorbell transformer myself?',
    answer:
      'The transformer is connected to the mains supply on its primary side, so replacing it involves working with mains voltage. This should be carried out by a qualified electrician. The bell wire side (secondary) is extra-low voltage and safe to handle, but the mains connection is not a DIY job.',
  },
  {
    question: 'Why does my wireless doorbell not work in the rain?',
    answer:
      'Water ingress into the push button unit is a common cause. Although wireless doorbell push buttons are designed for outdoor use, seals degrade over time and water can reach the battery contacts or the circuit board. Try removing the push button, drying it thoroughly, cleaning the battery contacts, and resealing or replacing it. Some wireless doorbells also experience reduced range in wet weather as moisture attenuates the radio signal.',
  },
  {
    question: 'My Ring doorbell keeps going offline. What is wrong?',
    answer:
      'The most common cause is low voltage from the transformer. Ring doorbells require a minimum of 16V AC (some models 24V AC). If the existing bell transformer is rated at only 8V, the doorbell cannot charge its battery and eventually goes offline. Other causes include weak Wi-Fi signal at the front door, a faulty doorbell, or the doorbell being too far from the router. Check the voltage at the doorbell terminals first — if it is below the minimum requirement, a transformer upgrade is needed.',
  },
  {
    question: 'Do I need an electrician to install a video doorbell?',
    answer:
      'If you are replacing an existing wired doorbell with a video doorbell and the existing transformer provides sufficient voltage, the swap is straightforward and can be done without an electrician — you are only working with the extra-low voltage bell wire. However, if the transformer needs upgrading (common — smart doorbells often need more power than traditional chimes), an electrician is required for the mains-side work. Battery-powered video doorbells require no electrical work at all.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/dimmer-switch-buzzing',
    title: 'Dimmer Switch Buzzing',
    description: 'Buzzing from electrical components — causes and when to call an electrician.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/pir-sensor-not-working',
    title: 'PIR Sensor Not Working',
    description: 'Troubleshooting outdoor PIR sensors and security lighting problems.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR inspection covers including extra-low voltage circuits.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding',
    description: 'Systematic fault finding for electricians investigating doorbell circuit issues.',
    icon: Search,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Has My Doorbell Stopped Working?',
    content: (
      <>
        <p>
          A doorbell that stops working is rarely dangerous, but it is surprisingly difficult to
          diagnose without understanding how the different types work. The fix could be as simple as
          a flat battery or as involved as replacing a mains-fed transformer.
        </p>
        <p>
          This guide covers all three main types of doorbell — wired, wireless, and smart — explains
          the most common faults for each, tells you what you can safely check yourself, and
          explains when you need an electrician.
        </p>
      </>
    ),
  },
  {
    id: 'types',
    heading: 'Types of Doorbells',
    content: (
      <>
        <p>
          Understanding which type of doorbell you have is the first step in diagnosing the fault:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Wired doorbells</h4>
            <p className="text-white text-sm leading-relaxed">
              Connected by bell wire to a transformer (usually mounted near or inside the consumer
              unit). The transformer steps down mains 230V to extra-low voltage (typically 8V, 12V,
              or 24V AC). Pressing the button completes the circuit and the chime sounds. Reliable
              but dependent on the transformer and wiring.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Wireless doorbells</h4>
            <p className="text-white text-sm leading-relaxed">
              A battery-powered push button transmits a radio signal to a plug-in or battery-powered
              receiver (chime unit). No wiring between the two. Simple to install but dependent on
              batteries and radio range.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-2">Smart doorbells</h4>
            <p className="text-white text-sm leading-relaxed">
              Video doorbells (Ring, Nest, Eufy, etc.) that connect to Wi-Fi and send notifications
              to your phone. Can be wired (using existing bell wire and transformer) or
              battery-powered. Wired versions charge from the bell transformer; battery versions
              need periodic recharging.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'wired-faults',
    heading: 'Wired Doorbell Faults',
    content: (
      <>
        <p>
          Wired doorbells have four components that can fail: the transformer, the push button, the
          bell wire, and the chime unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer failure</strong> — the most common cause. Bell transformers
                eventually fail (winding breakdown, thermal fuse blowing). With no transformer
                output, the entire bell circuit is dead. Check for voltage at the transformer
                secondary terminals with a multimeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <DoorOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Push button failure</strong> — the button is exposed to weather and the
                contacts corrode over time. Remove the button and touch the two bell wires together
                briefly. If the chime sounds, the button is faulty and needs replacing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Broken bell wire</strong> — bell wire is thin (typically 0.5mm) and can
                break where it passes through door frames, walls, or where it has been painted over
                and pulled. Test continuity with a multimeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chime unit failure</strong> — mechanical chimes can jam (the striker gets
                stuck), and electronic chimes can fail. If the transformer has output and the wiring
                is intact, the chime unit is the problem.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wireless-faults',
    heading: 'Wireless Doorbell Faults',
    content: (
      <>
        <p>Wireless doorbells are simpler but have their own set of common problems:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flat batteries</strong> — the number one cause. Check and replace batteries
                in both the push button and the chime unit. Push button batteries in particular
                drain faster in cold weather.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Range issues</strong> — thick walls, metal doors, and distance reduce radio
                range. The advertised range assumes open air — real-world range through building
                materials is significantly less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interference</strong> — other wireless devices operating on the same
                frequency can interfere. Try re-pairing the push button and chime unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water damage</strong> — even weather-resistant push buttons can fail when
                seals degrade. Moisture on the circuit board or battery contacts causes corrosion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-doorbells',
    heading: 'Smart Doorbell Issues',
    content: (
      <>
        <p>
          Smart doorbells add Wi-Fi connectivity and video to the mix, which means additional points
          of failure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient transformer voltage</strong> — the most common issue with wired
                smart doorbells. Older bell transformers output 8V, but most smart doorbells need
                16V or 24V. Low voltage means the doorbell cannot charge and eventually goes
                offline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weak Wi-Fi</strong> — the doorbell is typically at the front of the house,
                which may be far from the router. A weak signal causes disconnections, delayed
                notifications, and poor video quality. A Wi-Fi extender or mesh system may be
                needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery drain (battery models)</strong> — cold weather, frequent motion
                detection, and live view usage all drain the battery faster. In winter, a battery
                doorbell may need recharging every few weeks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check Yourself',
    content: (
      <>
        <p>Before calling an electrician, there are several things you can safely check:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">For wireless doorbells</h4>
            <p className="text-white text-sm leading-relaxed">
              Replace batteries in both units. Re-pair the push button and chime. Move the chime
              closer to the push button to test range. Check for water damage on the push button.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              For wired doorbells (extra-low voltage side only)
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Remove the push button and briefly touch the two bell wires together. If the chime
              sounds, the push button is faulty — replace it. Check that the chime unit is connected
              and switched on. Bell wire is extra-low voltage and safe to touch.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">For smart doorbells</h4>
            <p className="text-white text-sm leading-relaxed">
              Check Wi-Fi signal strength in the app. Reboot the doorbell (remove from mount and
              hold reset button). Check the transformer voltage if wired — you need a multimeter for
              this. Recharge or replace the battery if battery-powered.
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
        <p>Call an electrician in these situations:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer needs replacing</strong> — the transformer is connected to the
                mains supply. Replacing it involves working with 230V and should only be carried out
                by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer upgrade for smart doorbell</strong> — if you are installing a
                smart doorbell that requires more voltage than your existing transformer provides,
                an electrician needs to fit a suitable replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>New wired doorbell installation</strong> — running new bell wire and fitting
                a transformer requires access to the consumer unit area and mains connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell from transformer</strong> — if you can smell burning near the
                consumer unit or transformer, isolate the circuit and call an electrician as an
                emergency. A failing transformer can overheat.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Doorbell Circuit Installation and Repair',
    content: (
      <>
        <p>
          Doorbell work is bread-and-butter domestic electrical work. Here are the key technical
          considerations:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Transformer Selection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bell transformers must provide SELV (Separated Extra-Low Voltage) — double or
                  reinforced insulation between primary and secondary windings. Standard ratings: 8V
                  (traditional chimes), 16V (some electronic chimes and smart doorbells), 24V (Ring
                  Pro and similar). Check the doorbell manufacturer specifications before selecting.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Wiring</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bell wire is typically 0.5mm twin flat. It is extra-low voltage so does not
                  require the same cable management as mains wiring, but should still be routed
                  neatly and protected from damage. Where bell wire runs alongside mains cables, BS
                  7671 Chapter 52 requirements for separation apply.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  A transformer replacement involves work on the mains side — issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>
                  . A new doorbell installation with transformer may be covered under a Minor Works
                  Certificate if it is an addition to an existing circuit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete Minor Works Certificates on your phone"
          description="Elec-Mate's certificate apps let you document doorbell installations and repairs with test results and instant PDF export. Join 1,000+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DoorbellNotWorkingPage() {
  return (
    <GuideTemplate
      title="Doorbell Not Working | Causes & Fixes"
      description="Why has your doorbell stopped working? Covers wired, wireless, and smart doorbells — transformer failure, dead batteries, Wi-Fi issues, and corroded buttons. Step-by-step diagnosis for UK homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Bell}
      heroTitle={
        <>
          Doorbell Not Working: <span className="text-yellow-400">Causes and Fixes</span>
        </>
      }
      heroSubtitle="Whether it is a wired, wireless, or smart doorbell, this guide covers every common fault — transformer failure, flat batteries, Wi-Fi problems, corroded contacts — and tells you what to check and when to call an electrician."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Doorbells Not Working"
      relatedPages={relatedPages}
      ctaHeading="Document Electrical Repairs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional certificates, AI fault diagnosis, and job documentation. 7-day free trial, cancel anytime."
    />
  );
}
