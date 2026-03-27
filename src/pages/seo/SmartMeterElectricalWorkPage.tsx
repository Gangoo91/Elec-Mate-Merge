import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Work Around Smart Meters', href: '/smart-meter-electrical-work' },
];

const tocItems = [
  { id: 'smets2-overview', label: 'SMETS2 Meter Overview' },
  { id: 'what-is-allowed', label: 'What Electricians Can & Cannot Do' },
  { id: 'consumer-unit-upgrade', label: 'Consumer Unit Upgrades' },
  { id: 'meter-tails', label: 'Meter Tails & Safe Isolation' },
  { id: 'ihd-devices', label: 'In-Home Display (IHD) Devices' },
  { id: 'part-p', label: 'Part P Compliance' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Smart meters (SMETS2) belong to the energy supplier and are installed and maintained by them. Electricians must not open, alter, or remove smart meters without specific written authorisation from the energy supplier.',
  'Meter tails — the cables between the meter and the consumer unit — are the responsibility of the property owner (in most cases), not the DNO or energy supplier. An electrician can replace or upgrade meter tails, but must safely isolate at the cut-out fuse first.',
  'Consumer unit replacements with a smart meter already installed are common and straightforward. The electrician works on the consumer unit side (load side) of the meter. The meter itself is not affected.',
  'The main fuse (cut-out fuse) in the service head belongs to the DNO and must not be removed without the DNO\'s authorisation. If the fuse needs to be removed for safe isolation during consumer unit work, the DNO must be contacted in advance.',
  'SMETS2 meters support remote reading, remote switching, and load limiting by the energy supplier via the Smart Metering Wide Area Network (WAN). An electrician working near the meter must not inadvertently interfere with the communications module.',
  'All new circuits installed in a property with a smart meter must still be notified under Part P Building Regulations and certified with the appropriate electrical certificate, exactly as for a property without a smart meter.',
];

const howToSteps = [
  {
    name: 'Confirm the meter type and supply arrangement',
    text: 'Before starting work, identify whether the property has a SMETS1 or SMETS2 meter (check for a communications module or HAN hub attached to or near the meter). Note the supply arrangement: single-phase or three-phase; overhead or underground supply; TN-S, TN-C-S, or TT earthing system. Confirm who is responsible for the cut-out fuse — this is always the DNO.',
  },
  {
    name: 'Notify the DNO if cut-out fuse removal is required',
    text: "If your work requires safe isolation at the cut-out fuse (for example, replacing meter tails or the main switch), contact the DNO in advance. UK Power Networks, National Grid ED, and other DNOs have a process for authorised fuse removal. They will either send an engineer or issue a formal permit. Never remove a DNO cut-out fuse without authorisation — it is an offence under the Electricity Act 1989.",
  },
  {
    name: 'Isolate the consumer unit circuit you are working on',
    text: "For most electrical work in the property (adding circuits, replacing socket outlets, installing new lighting), you only need to isolate the relevant circuit MCB at the consumer unit. You do not need to touch the meter or the cut-out fuse. Prove dead with an approved voltage indicator before proceeding.",
  },
  {
    name: 'Complete the consumer unit upgrade or new circuit installation',
    text: 'For a consumer unit replacement, connect the new CU to the existing meter tails (line, neutral, earth). Ensure the main switch in the new consumer unit is rated for the supply current (typically 100A for domestic). Test all circuits per BS 7671: insulation resistance, continuity, polarity, RCD trip times, and loop impedance.',
  },
  {
    name: 'Check smart meter communication is not affected',
    text: "After completing work, check that the smart meter's in-home display (IHD) is still communicating. If the IHD has lost connection, this may simply require it to reconnect to the home WAN (HAN) network — typically within a few minutes. If the meter itself has lost comms, contact the energy supplier's smart meter support team. Do not attempt to reconnect the meter communications module yourself.",
  },
  {
    name: 'Issue the correct certificate',
    text: 'Issue a Minor Works Certificate for additions to existing circuits, or an Electrical Installation Certificate for a new consumer unit or new circuits. The presence of a smart meter does not change the certification requirements. Use the Elec-Mate app to generate and share the certificate instantly.',
  },
];

const faqs = [
  {
    question: 'Can an electrician replace meter tails with a smart meter installed?',
    answer:
      "Yes — meter tails are the cables between the service head (cut-out fuse) and the consumer unit main switch. These are the property owner's responsibility in most installations (not the DNO's or energy supplier's). An electrician can replace meter tails, but to do so safely requires isolation at the cut-out fuse. Since the cut-out fuse belongs to the DNO, the electrician must contact the DNO before starting work and follow the authorised isolation procedure. The smart meter itself (between the cut-out and the consumer unit in most installations) must not be touched — the new meter tails are connected to the load side of the meter, which is accessible.",
  },
  {
    question: 'Will a consumer unit replacement affect my SMETS2 smart meter?',
    answer:
      "A consumer unit replacement does not affect the smart meter in most cases. The meter sits between the cut-out fuse and the consumer unit. During a consumer unit replacement, the electrician works on the consumer unit side (load side) of the meter — the meter and its communications module are not involved. After the work is complete, the smart meter should continue to record consumption and communicate with the energy supplier normally. Check that the in-home display (IHD) is still showing live consumption data after the work is finished. If it has lost connection, it typically reconnects automatically within a few minutes.",
  },
  {
    question: 'What is the difference between SMETS1 and SMETS2 meters?',
    answer:
      "SMETS1 (Smart Metering Equipment Technical Specifications 1) meters were the first generation, installed mainly between 2012 and 2019. They communicated via a proprietary network linked to the specific energy supplier that installed them. If you switched supplier, the smart functions often stopped working and the meter reverted to 'dumb' meter operation. SMETS2 meters use the national Smart Metering Wide Area Network (WAN) operated by the Data Communications Company (DCC), and can retain smart functions when you switch supplier. SMETS2 rollout began in earnest from 2019. You can identify a SMETS2 meter by looking for a DCC-compatible communications hub (typically a separate unit near the meter).",
  },
  {
    question: 'Can an electrician remove a smart meter?',
    answer:
      "No. Smart meters belong to the energy supplier (not the property owner). An electrician cannot remove or relocate a smart meter without written authorisation from the energy supplier. If a smart meter needs to be relocated (for example, because a consumer unit is being moved), the electrician should agree the new position with the energy supplier and arrange for the energy supplier's engineer to move the meter. Attempting to move a smart meter without authorisation constitutes tampering with energy supplier equipment, which is an offence.",
  },
  {
    question: 'Do I need to notify my energy supplier before doing electrical work near my smart meter?',
    answer:
      "For most electrical work (replacing socket outlets, adding circuits, changing light fittings), there is no need to notify your energy supplier, as the work does not affect the meter. If the work involves the meter tails, the main switch, or the cut-out fuse — or if there is any risk of interrupting the supply to the meter — you should inform your energy supplier in advance and arrange for DNO authorisation to access the cut-out fuse if needed. If the smart meter loses power during works, it will typically restore comms automatically when re-energised. However, if the meter data logging is interrupted, you may wish to notify your supplier so they can note the gap in readings.",
  },
  {
    question: 'What is an in-home display (IHD) device and can I relocate it?',
    answer:
      "An in-home display (IHD) is a small handheld or table-top device provided by your energy supplier that shows real-time electricity and gas consumption data from the smart meter via a Home Area Network (HAN). The IHD communicates wirelessly with the smart meter's communications hub. You can move the IHD to any location within wireless range of the communications hub (typically 30m inside the home). If the IHD loses its connection, it can usually be re-paired by following the supplier's instructions (typically holding a button for a few seconds). The IHD does not require any electrical connection other than its own USB or mains power adapter.",
  },
  {
    question: 'What Part P requirements apply to electrical work in a property with a smart meter?',
    answer:
      'Part P of the Building Regulations applies exactly the same way whether a property has a smart meter or not. New circuits, consumer unit replacements, and electrical work in kitchens, bathrooms, and outside must be either notified to local authority building control or self-certified by a registered competent person (NICEIC, ELECSA, or NAPIT). An Electrical Installation Certificate must be issued for new circuits and consumer unit replacements; a Minor Works Certificate for additions to existing circuits. The smart meter does not affect these requirements in any way.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/consumer-unit-replacement',
    title: 'Consumer Unit Replacement Guide',
    description: 'Full guide to replacing a consumer unit — what to expect, cost, and certification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic approach to finding earth faults, open circuits, and high resistance faults.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate Electrical Installation Certificates on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works',
    title: 'Minor Works Certificate App',
    description: 'Issue compliant MWCs instantly on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'smets2-overview',
    heading: 'SMETS2 Smart Meter Overview',
    content: (
      <>
        <p>
          Second-generation smart meters (SMETS2) are now the standard installation across
          Great Britain. Understanding the SMETS2 architecture helps electricians know which
          parts of the metering system they can and cannot interact with.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service head (cut-out)</strong> — owned by the DNO. Contains the
                main fuse (typically 60A or 100A). Cannot be accessed without DNO
                authorisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter</strong> — owned by the energy supplier. Measures
                consumption and communicates with the DCC via the Wide Area Network
                (WAN) using GPRS or mesh radio. Electricians must not open or alter the
                meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter tails</strong> — the cables from the service head to the
                meter and from the meter to the consumer unit main switch. Typically 16mm\u00b2
                or 25mm\u00b2 singles. Owned by the property owner (in most cases). Can be
                replaced by an electrician with DNO authorisation for cut-out isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit (distribution board)</strong> — owned by the property
                owner. Electricians work on this side. Not affected by the smart meter.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-is-allowed',
    heading: 'What Electricians Can & Cannot Do Near a Smart Meter',
    content: (
      <>
        <p>
          The boundary between energy supplier/DNO equipment and the customer installation
          is critical. Crossing it without authorisation is illegal and dangerous.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted:</strong> All work on the consumer unit and all circuits
                downstream of the main switch. Replacing meter tails (with DNO authorisation
                for cut-out isolation). Installing new circuits, adding socket outlets, and
                replacing accessories throughout the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not permitted without authorisation:</strong> Opening, altering, or
                removing the smart meter. Removing the cut-out fuse. Interfering with the
                communications hub or Home Area Network (HAN) equipment. Relocating the meter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For guidance on safe isolation procedures, see our{' '}
          <SEOInternalLink href="/electrical-fault-finding-guide">electrical fault finding guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit-upgrade',
    heading: 'Consumer Unit Upgrades with Smart Meters Installed',
    content: (
      <>
        <p>
          A consumer unit replacement is one of the most common electrical jobs in properties
          with smart meters. The presence of a smart meter does not significantly change the
          procedure, but there are a few important considerations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation at the main switch</strong> — in most consumer unit
                replacements, isolation is achieved at the consumer unit main switch,
                which is on the load side of the meter. The smart meter remains energised
                throughout — only the consumer unit and circuits beyond the main switch
                are de-energised.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When the cut-out fuse must be removed</strong> — if the meter tails
                need to be replaced, or if access to the back of the consumer unit requires
                removal of the tails, contact the DNO in advance to arrange authorised
                removal of the cut-out fuse. Do not remove the cut-out fuse unilaterally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IHD reconnection</strong> — after restoring the supply, check that
                the in-home display (IHD) is showing live data. If it has lost connection,
                follow the energy supplier&apos;s reconnection procedure. This is typically
                automatic within a few minutes.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Consumer Unit Replacement Certificates on Elec-Mate"
          description="Generate Electrical Installation Certificates for consumer unit replacements on your phone. Full test schedule included, PDF shared with the client instantly."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
  {
    id: 'meter-tails',
    heading: 'Meter Tails & Safe Isolation',
    content: (
      <>
        <p>
          Meter tails are the large-section cables that carry the full supply current
          between the service head, the meter, and the consumer unit. They require careful
          handling and DNO coordination.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical specification</strong> — meter tails for a 100A domestic
                supply are typically 25mm\u00b2 singles (line and neutral) with a 16mm\u00b2 earth.
                For supplies up to 60A (less common), 16mm\u00b2 tails may be adequate. Check
                the supply current rating and calculate the appropriate cable size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO authorisation for cut-out removal</strong> — before replacing
                meter tails, contact the local DNO (UK Power Networks, National Grid ED,
                SP Energy Networks, etc.) to request authorised removal of the cut-out
                fuse. They will provide a specific time and procedure. Lead times vary —
                allow at least 5 to 10 working days for the appointment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colour-coding of meter tails</strong> — meter tails in the UK
                use the current harmonised colour code: brown for line, blue for neutral,
                green-yellow for earth. Where old red/black tails are found, re-identification
                with correct colour sleeving is required under BS 7671 Regulation 514.4.2
                when the tails are replaced.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ihd-devices',
    heading: 'In-Home Display (IHD) Devices',
    content: (
      <>
        <p>
          The in-home display (IHD) is a wireless device supplied by the energy supplier
          that shows real-time gas and electricity consumption data. It communicates with
          the smart meter via the Home Area Network (HAN).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relocating the IHD</strong> — the IHD can be moved anywhere within
                the wireless range of the communications hub (typically up to 30m inside a
                building). No electrical work is required — the IHD is battery-powered or
                uses a small USB/mains adapter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IHD lost connection after electrical work</strong> — if the supply
                was interrupted during electrical work, the IHD may need time to reconnect
                to the HAN. Allow 10 to 15 minutes after restoring supply before concluding
                that there is a fault. If the IHD does not reconnect, contact the energy
                supplier&apos;s smart meter support line.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Compliance for Work Near Smart Meters',
    content: (
      <>
        <p>
          The presence of a smart meter has no effect on Part P Building Regulations
          requirements. All notifiable electrical work must still be certified in the
          usual way.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — required for
                new circuits and consumer unit replacements. Must include test results from
                all circuits: insulation resistance, continuity, polarity, RCD times, and
                loop impedance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minor Works Certificate (MWC)</strong> — for additions to existing
                circuits. Issued after testing the addition and confirming compliance of the
                existing circuit it is added to.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate Certificates Instantly with Elec-Mate"
          description="Issue EICs and MWCs for smart meter property electrical work from your phone. Share with clients by PDF — no desktop required."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
];

export default function SmartMeterElectricalWorkPage() {
  return (
    <GuideTemplate
      title="Electrical Work Around Smart Meters — UK Electrician Guide 2024"
      description="Guide for electricians working near SMETS2 smart meters — what is and is not allowed, consumer unit upgrades, meter tails, safe isolation, IHD devices, and Part P compliance."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Electrical Work Around Smart Meters{' '}
          <span className="text-yellow-400">— UK Electrician Guide</span>
        </>
      }
      heroSubtitle="A complete guide to electrical work in properties with SMETS2 smart meters — consumer unit upgrades, meter tails, safe isolation, IHD devices, DNO responsibilities, and Part P certification."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Safely Work Near a Smart Meter — Step by Step"
      howToDescription="Follow this procedure when carrying out electrical work in a property with a SMETS2 smart meter."
      faqs={faqs}
      faqHeading="Smart Meter Electrical Work — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certify Smart Meter Property Work with Elec-Mate"
      ctaSubheading="Generate Electrical Installation Certificates and Minor Works Certificates for consumer unit upgrades and new circuits. Share with clients instantly."
    />
  );
}
