import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  Zap,
  ShieldCheck,
  Calculator,
  ClipboardCheck,
  Brain,
  FileCheck2,
  AlertTriangle,
  Building2,
  Home,
  BookOpen,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides' },
  { label: 'Smart Meters', href: '/guides/smart-meter-installation' },
];

const tocItems = [
  { id: 'smart-meter-overview', label: 'Smart Meter Overview' },
  { id: 'smets1-vs-smets2', label: 'SMETS1 vs SMETS2' },
  { id: 'who-can-install', label: 'Who Can Install Smart Meters' },
  { id: 'impact-on-consumer-units', label: 'Impact on Consumer Units' },
  { id: 'customer-questions', label: 'Answering Customer Questions' },
  { id: 'smart-meters-and-testing', label: 'Smart Meters and Testing' },
  { id: 'electrician-opportunities', label: 'Opportunities for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SMETS2 meters are the current standard, using the national DCC network to communicate — unlike SMETS1 meters which used proprietary networks and often lost smart functionality when customers switched supplier.',
  'Smart meters are installed by energy suppliers (or their contractors), not by independent electricians — but electricians need to understand them because they affect consumer units, earthing, and testing.',
  'A smart meter installation may require changes to the consumer unit, main earthing, and bonding — electricians are often called in to address issues discovered during or after smart meter installation.',
  'Electricians should be prepared to answer customer questions about smart meters, especially around safety, data privacy, and whether they affect the electrical installation.',
  'Elec-Mate helps electricians manage smart meter-related work with EICR certificates, consumer unit change documentation, and AI-powered regulation guidance.',
];

const faqs = [
  {
    question: 'What is the difference between SMETS1 and SMETS2 smart meters?',
    answer:
      'SMETS1 (Smart Metering Equipment Technical Specifications 1) meters were the first generation, installed from 2011 to 2018. They used proprietary communication networks run by individual energy suppliers, which meant they often lost smart functionality when the customer switched to a different supplier — reverting to "dumb" meters that required manual readings. SMETS2 meters are the current standard, installed from 2018 onwards. They use the national Data Communications Company (DCC) network, which is supplier-independent. This means SMETS2 meters retain their smart functionality regardless of which energy supplier the customer uses. The DCC network uses a combination of cellular, mesh radio, and long-range radio to communicate with the meter. All smart meter installations now use SMETS2, and SMETS1 meters are being upgraded to communicate through the DCC network.',
  },
  {
    question: 'Can an electrician install a smart meter?',
    answer:
      'No, not in the normal course of work. Smart meters are installed by the energy supplier or their authorised contractor — typically a specialist smart meter installer employed by companies such as Calisen, SMS, or the energy supplier directly. These installers are trained to the MCoS (Meter Operator Code of Practice) standard and are authorised to work on metering equipment. As an independent electrician, you are not permitted to install, remove, or tamper with a smart meter or any metering equipment. However, you are likely to encounter smart meters on every domestic installation, inspection, and testing job. You need to understand how they work, where they fit in the installation, and how they affect the consumer unit, earthing, and supply characteristics.',
  },
  {
    question: 'How does a smart meter installation affect the consumer unit?',
    answer:
      'A smart meter replaces the existing meter, but the installation process can reveal or cause issues with the consumer unit and wider electrical installation. Common situations include: the meter tail connections being disturbed, requiring re-tightening or replacement; the earthing conductor being disconnected or re-routed, particularly if the DNO changes the earthing arrangement (for example, from TN-C-S to TT); the main switch in the consumer unit being found to be inadequate or damaged; and the existing installation being found to have defects that the smart meter installer is obliged to report. In some cases, the smart meter installer will refuse to complete the installation if they identify a dangerous condition (such as a damaged consumer unit, exposed live parts, or inadequate earthing) and will advise the customer to call an electrician first.',
  },
  {
    question: 'Do smart meters affect EICR testing?',
    answer:
      'Smart meters do not fundamentally change the EICR testing procedure, but there are practical considerations. The supply characteristics (Ze, PSCC, PFC) are measured at the origin, which is downstream of the meter. If the smart meter has a built-in isolator, this is the main switch for the supply — not the main switch in the consumer unit. Some SMETS2 meters have a supply disconnect feature that the energy supplier can operate remotely, which could theoretically disconnect the supply during testing (though this is unlikely). When recording supply details on the EICR, note the meter type (SMETS2) and any relevant details. If the smart meter has replaced an older meter and the earthing arrangement has changed, this must be reflected in the EICR.',
  },
  {
    question: 'Do smart meters emit harmful radiation?',
    answer:
      'No. This is one of the most common customer concerns, but it is not supported by evidence. Smart meters use radio frequencies similar to mobile phones, Wi-Fi routers, and baby monitors. The radio transmissions are low-power and intermittent — the meter sends data for a few seconds a few times per day, far less than a mobile phone which transmits continuously during calls. Public Health England (now UKHSA) has stated that smart meters do not pose a health risk. The radio frequency exposure from a smart meter is many times below the international safety guidelines set by ICNIRP. As an electrician, you may need to reassure customers on this point.',
  },
  {
    question: 'What happens if the smart meter installer finds a defect in the installation?',
    answer:
      'If the smart meter installer identifies a dangerous condition during the meter exchange, they are required to make the situation safe (if possible) and report the defect to the energy supplier. In practice, they may refuse to complete the installation until the defect is resolved. Common defects found during smart meter installations include: damaged or overheating meter tails, inadequate main earthing, broken or missing consumer unit covers, exposed live parts, and evidence of tampering or illegal connections. The customer is then advised to contact a qualified electrician to carry out the remedial work before the smart meter installation can proceed. This creates work for electricians — and Elec-Mate makes it easy to document the remedial work with a Minor Works Certificate or EIC.',
  },
  {
    question: 'How does Elec-Mate help with smart meter-related electrical work?',
    answer:
      'Elec-Mate helps electricians manage the work that arises from smart meter installations — consumer unit changes, earthing upgrades, remedial work on defects found during meter exchanges, and EICR inspections that include smart-metered properties. The 8 digital certificate types cover every documentation need, the 70 calculators handle Zs verification, prospective fault current, and cable sizing, and the 8 Elec-AI agents can answer questions about earthing arrangements, supply characteristics, and BS 7671 requirements in real time on site.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including Amendment 3 and AFDD requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change',
    title: 'Consumer Unit Change Guide',
    description:
      'How to change a consumer unit — regulations, procedure, testing, and certification.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements Guide',
    description: 'TN-S, TN-C-S, and TT earthing systems explained with testing requirements.',
    icon: Zap,
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
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description:
      'Complete guide to EV charger installation — regulations, cable sizing, protection, and certification.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-testing-cost-uk',
    title: 'Electrical Testing Cost UK',
    description: 'How much to charge for EICRs, PAT testing, and periodic inspections in 2026.',
    icon: Calculator,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'smart-meter-overview',
    heading: 'Smart Meters: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Smart meters are now installed in over 30 million UK homes and businesses, replacing
          traditional gas and electricity meters with digital devices that send readings
          automatically to the energy supplier. As an electrician, you will not install smart meters
          yourself — that is done by the energy supplier — but you need to understand them because
          they affect every domestic installation you work on.
        </p>
        <p>
          Smart meters sit at the origin of the electrical installation, between the DNO cutout and
          the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>.
          They replace the traditional credit or prepayment meter and include an in-home display
          (IHD) that shows the customer their energy usage in real time. The meter communicates with
          the energy supplier via a wireless network — either a proprietary network (SMETS1) or the
          national DCC network (SMETS2).
        </p>
        <p>
          This guide covers the differences between SMETS1 and SMETS2, who can install smart meters,
          how they affect the consumer unit and wider installation, and how to answer the customer
          questions you will inevitably receive.
        </p>
      </>
    ),
  },
  {
    id: 'smets1-vs-smets2',
    heading: 'SMETS1 vs SMETS2: What Changed',
    content: (
      <>
        <p>
          The smart meter rollout has gone through two distinct phases, each with a different
          technical standard. Understanding the difference is important because you will encounter
          both types on site.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wifi className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">SMETS1 (First Generation)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Installed</div>
                <div className="text-xl font-bold text-white">2011 — 2018</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Communication</div>
                <div className="text-xl font-bold text-white">Proprietary network</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Used supplier-specific communication networks. Often lost smart functionality when
              customers switched energy supplier — reverting to manual readings. Different suppliers
              used different SMETS1 meters, creating compatibility issues. Now being enrolled onto
              the DCC network to restore smart functionality.
            </p>
          </div>

          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wifi className="w-6 h-6 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">SMETS2 (Current Standard)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-white mb-1">Installed</div>
                <div className="text-xl font-bold text-yellow-400">2018 onwards</div>
              </div>
              <div>
                <div className="text-sm text-white mb-1">Communication</div>
                <div className="text-xl font-bold text-yellow-400">DCC national network</div>
              </div>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Uses the national Data Communications Company (DCC) network, which is
              supplier-independent. Smart functionality is retained regardless of which energy
              supplier the customer uses. Standardised across all suppliers. Supports both credit
              and prepayment modes. All new installations now use SMETS2.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'who-can-install',
    heading: 'Who Can Install Smart Meters?',
    content: (
      <>
        <p>
          Smart meters are installed by the energy supplier or their authorised contractor. This is
          not work that independent electricians carry out. The installers are trained to the MCoS
          (Meter Operator Code of Practice) standard and are specifically authorised to work on
          metering equipment, which sits upstream of the consumer unit in the supply chain.
        </p>
        <p>The main organisations involved in smart meter installation include:</p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Energy suppliers',
              description:
                'British Gas, EDF, E.ON, Octopus Energy, and other suppliers have their own in-house smart meter installation teams or use contracted installers.',
            },
            {
              title: 'Specialist metering companies',
              description:
                'Companies such as Calisen, SMS (Smart Metering Systems), and Morrison Energy Services employ large numbers of smart meter installers who work on behalf of multiple energy suppliers.',
            },
            {
              title: 'The Data Communications Company (DCC)',
              description:
                'The DCC operates the national communication network that SMETS2 meters use. While the DCC does not install meters, it provides the infrastructure that makes SMETS2 work.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>
          Although you cannot install smart meters yourself, the work they generate — consumer unit
          upgrades, earthing remedials, and EICR inspections — is all within the scope of a
          qualified electrician. Many smart meter installations uncover defects that need fixing by
          an electrician before the meter exchange can be completed.
        </p>
      </>
    ),
  },
  {
    id: 'impact-on-consumer-units',
    heading: 'How Smart Meters Affect Consumer Units and Earthing',
    content: (
      <>
        <p>
          The smart meter installation process can reveal or create issues with the consumer unit,
          earthing, and wider electrical installation. As an electrician, you may be called to site
          to resolve issues found during a meter exchange.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Meter tail connections',
              description:
                'The meter tails are disconnected and reconnected during the meter exchange. This can reveal corroded, damaged, or undersized tails that need replacing. If the tails are disturbed, the connections at the consumer unit end should also be checked.',
            },
            {
              title: 'Earthing changes',
              description:
                'Some smart meter installations involve changes to the earthing arrangement — particularly when the DNO upgrades the supply at the same time. A property that was TN-C-S may be changed to TT, requiring an earth electrode and different RCD protection. An electrician must verify the earthing and update the installation accordingly.',
            },
            {
              title: 'Consumer unit condition',
              description:
                'Smart meter installers are trained to identify dangerous conditions. If they find a damaged consumer unit, exposed live parts, or a board that does not meet current standards, they may refuse to complete the installation until an electrician resolves the issue.',
            },
            {
              title: 'Supply characteristics',
              description:
                'A new smart meter may alter the measured supply impedance slightly due to different internal connections. When carrying out an EICR on a property with a recently installed smart meter, measure Ze fresh rather than relying on previous records.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Document consumer unit changes on site"
          description="When a smart meter installation leads to consumer unit work, use Elec-Mate to complete the EIC or Minor Works Certificate on your phone. AI board scanner, voice test entry, and instant PDF delivery — no post-site paperwork."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'customer-questions',
    heading: 'Answering Customer Questions About Smart Meters',
    content: (
      <>
        <p>
          Customers frequently ask electricians about smart meters — even though you did not install
          them. Being able to answer these questions confidently builds trust and positions you as a
          knowledgeable professional.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: '"Are smart meters safe?"',
              description:
                'Yes. Smart meters meet all UK safety standards. They are tested and approved by Ofgem and installed by trained, authorised installers. The radio frequency emissions are far below international safety limits — comparable to a Wi-Fi router but with much less transmission time.',
            },
            {
              title: '"Will the smart meter affect my electrics?"',
              description:
                'The smart meter replaces the existing meter and does not change the rest of the installation. However, the installation process may reveal existing defects (corroded tails, poor earthing, damaged consumer unit) that need attention. This is a good thing — it identifies problems that were already there.',
            },
            {
              title: '"Can the energy company switch off my supply remotely?"',
              description:
                'SMETS2 meters have a remote disconnect function, but it is heavily regulated by Ofgem. It can only be used in specific circumstances (for example, when a property is empty and the supply needs to be made safe). It cannot be used to disconnect a customer for non-payment without following strict legal procedures, including an in-person visit.',
            },
            {
              title: '"My smart meter has gone dumb — can you fix it?"',
              description:
                'This typically affects SMETS1 meters that lost smart functionality after a supplier switch. The fix is to contact the energy supplier and request enrolment onto the DCC network (for SMETS1) or a SMETS2 meter upgrade. This is not something an electrician can fix — it is a communications issue between the meter and the supplier.',
            },
            {
              title: '"Do I have to have a smart meter?"',
              description:
                'No. Smart meter installation is voluntary. Customers can decline a smart meter from their energy supplier. However, they may miss out on smart tariffs and accurate billing. As an electrician, remain neutral — your job is to inform, not to persuade.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'smart-meters-and-testing',
    heading: 'Smart Meters and EICR Testing',
    content: (
      <>
        <p>
          When carrying out an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> on a property with
          a smart meter, be aware of the following practical considerations:
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Record the meter type',
              description:
                'Note whether the meter is SMETS1 or SMETS2 in the supply details section of the EICR. This helps future inspectors understand the installation.',
            },
            {
              title: 'Measure Ze at the origin',
              description:
                'The external earth fault loop impedance (Ze) is measured between the incoming phase and earth at the origin. With a smart meter, ensure you are measuring downstream of the meter. The meter itself should not affect Ze, but measure fresh rather than relying on previous records.',
            },
            {
              title: 'Check the meter tails',
              description:
                'Inspect the condition of the meter tails as part of the visual inspection. Look for signs of overheating, corrosion, or damage — particularly if the smart meter was recently installed and the tails were disturbed.',
            },
            {
              title: 'Note the earthing arrangement',
              description:
                'Confirm the earthing arrangement (TN-S, TN-C-S, or TT) and whether it has changed since the last inspection. A smart meter installation may have triggered an earthing change by the DNO.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'electrician-opportunities',
    heading: 'Opportunities for Electricians from Smart Meter Rollout',
    content: (
      <>
        <p>
          The smart meter rollout is generating significant work for electricians. Every meter
          exchange has the potential to uncover defects that need remedying, and the growing
          electrification of homes (heat pumps, EV chargers, battery storage) means consumer units
          are being upgraded more frequently.
        </p>
        <div className="space-y-4 my-4">
          {[
            {
              title: 'Pre-installation remedials',
              description:
                'Smart meter installers refuse to complete the exchange if they find dangerous conditions. The customer then needs an electrician to fix the problem. Common jobs include consumer unit replacements, earthing upgrades, and meter tail replacements.',
            },
            {
              title: 'Consumer unit upgrades',
              description:
                'Many properties getting smart meters have older consumer units that do not meet current standards. The smart meter installation prompts the customer to think about their electrics, creating an upsell opportunity for a full consumer unit upgrade.',
            },
            {
              title: 'EICR inspections',
              description:
                'Landlords scheduling smart meter installations for their rental properties often need an EICR at the same time. Offering both services in a single visit saves the landlord time and earns you more per trip.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-white text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SEOAppBridge
          title="Manage all your electrical certification in one app"
          description="EICR, EIC, Minor Works, and 5 more certificate types — all completed on your phone with AI assistance. Turn smart meter-related call-outs into fully documented, professionally delivered jobs."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartMeterInstallationPage() {
  return (
    <GuideTemplate
      title="Smart Meter Installation | What Electricians Need to Know"
      description="What electricians need to know about smart meter installation. SMETS1 vs SMETS2 explained, who can install smart meters, impact on consumer units and earthing, customer FAQ answers, and work opportunities from the smart meter rollout."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Smart Meter Installation:{' '}
          <span className="text-yellow-400">What Electricians Need to Know</span>
        </>
      }
      heroSubtitle="Smart meters are now in over 30 million UK homes. Electricians do not install them, but you need to understand SMETS1 vs SMETS2, their impact on consumer units and earthing, how they affect EICR testing, and how to answer the customer questions you will inevitably be asked."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart Meters"
      relatedPages={relatedPages}
      ctaHeading="Handle smart meter-related work with Elec-Mate"
      ctaSubheading="Consumer unit changes, earthing upgrades, EICR inspections — document everything on your phone with Elec-Mate. 8 certificate types, 70 calculators, 8 AI agents. 7-day free trial, cancel anytime."
    />
  );
}
