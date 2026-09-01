/**
 * What a plug-in solar kit must tell you — cluster spoke 5 (ELE-1661)
 *
 * The most differentiated page in the set: the specification puts heavy
 * information duties on the product, the plug and the supplied documentation,
 * and every one of those surfaces is reached AFTER purchase. The shop listing
 * is not regulated at all.
 *
 * 🔴 Two rules for anything on this page:
 *   1. NEVER name the manufacturer whose datasheets were audited. The finding
 *      is about a pattern, not a company, and naming one is the class of claim
 *      that has already cost this business a cease and desist.
 *   2. ALWAYS carry the fair caveat: §8.3 governs the SUPPLIED MANUAL, not the
 *      datasheet or the website. A gap in pre-purchase material is a gap in
 *      pre-purchase material — it is not evidence of non-compliance.
 */

import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInlineLeadMagnet } from '@/components/seo/SEOInlineLeadMagnet';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { PLUG_IN_SOLAR_FACTS as F } from '@/lib/plugInSolarAssessment';
import { PackageOpen, Sun, ShieldCheck, Building2, FileCheck2 } from 'lucide-react';

const breadcrumbs = [
  { label: 'Plug-in Solar UK', href: '/plug-in-solar-uk' },
  { label: 'What You Must Be Told', href: '/what-plug-in-solar-must-tell-you' },
];

const tocItems = [
  { id: 'short-answer', label: 'The Short Answer' },
  { id: 'on-the-product', label: 'What Must Be on the Product' },
  { id: 'on-the-plug', label: 'What Must Be on the Plug' },
  { id: 'in-the-box', label: 'What Must Be in the Documentation' },
  { id: 'the-label', label: 'The Label for Your Consumer Unit' },
  { id: 'when-you-read-it', label: 'When You Actually Get to Read It' },
  { id: 'what-to-check', label: 'What to Check Before You Buy' },
  { id: 'not-a-device', label: 'And What Is Not a Plug-in Solar Device' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The specification puts information duties on three separate surfaces: the product itself, the plug, and the documentation supplied in the box.',
  'The product must be permanently marked with a statement that notification to the distribution network operator about connection and disconnection is mandatory, including a link to how to do it.',
  'The plug must carry a warning that the device must not be connected to an extension cable, multi-way adaptor or RCD adaptor.',
  'The documentation must contain around forty items, including a QR code to DNO registration, the cladding and remediation warnings, the battery prohibition, and how to identify which sockets share a circuit.',
  'The product ships with a durable label to fix at or near the consumer unit, recording that a plug-in PV device is present — and a fresh one if the board is ever changed or moved.',
  'None of those surfaces is the shop listing, the datasheet or the website. All of it is reached after you have paid, and usually after you have chosen where the panel is going.',
  'The specification requires the product to state that it complies with the specification. Electrical Safety First tell buyers to look for exactly that before purchase.',
];

const faqs = [
  {
    question: 'What information must a plug-in solar kit come with?',
    answer: `A great deal, and it is specified in detail. The product itself must be permanently marked with the manufacturer's details, a model and serial number, rated values, IP rating, protective class, a statement that a maximum of one inverter up to ${F.maxApparentPowerVA} VA may be plugged in per household circuit, a statement that notification to the distribution network operator about connection and disconnection is mandatory with a link to how, and a statement that the product complies with the specification. The plug must be separately marked. The documentation must cover roughly forty further items, from mounting restrictions to insurance to how to identify a circuit.`,
  },
  {
    question: 'Should the box tell me about DNO notification?',
    answer:
      'Yes. It is one of the items the product must be permanently marked with — a statement that notification about connection and disconnection is mandatory, including a link to instructions. The documentation must go further and provide clear information on current registration and deregistration obligations with the DNO, including a QR code directing you to the relevant guidance and registration process. If a kit tells you none of this, that is worth raising with the retailer.',
  },
  {
    question: 'How do I know a plug-in solar kit is compliant before I buy it?',
    answer:
      'The specification requires the product to carry a statement that it complies with the specification, and Electrical Safety First tell buyers the product they intend to purchase must clearly state this. Separately, compliant devices are listed on the ENA Connect Direct Type Test Register, which you can search by manufacturer or model. Note that the specification is explicit that a device merely submitted for registration does not in itself demonstrate compliance — you are looking for an entry assessed and identified as compliant, not just an entry.',
  },
  {
    question: 'Why does the shop listing not mention any of this?',
    answer:
      'Because the rules do not reach it. The obligations sit on the product, the plug and the supplied documentation — the physical things inside the carton. A retail listing, a datasheet or a marketing page is not a regulated surface, so a seller can be entirely compliant while telling you almost nothing before you pay. That is not a loophole anyone is exploiting; it is simply where product law operates. It does mean the responsibility to ask the questions early sits with you.',
  },
  {
    question: 'Is there anything the manufacturer must tell me about my fusebox?',
    answer: `Yes, two things. The documentation must advise you to check that the electrical installation has modern residual current protection and is in good condition, and say that where it uses older fuse protection without RCBOs it should be checked and, where necessary, upgraded by a professional electrician. And where the total PV module power is above ${F.professionalAssessmentThresholdW} W, the manufacturer must advise you to consider a professional assessment of your installation before installing. There is also a recurring one: you must be told to press the RCD test button periodically while the device is generating, and to call an electrician if it does not trip immediately.`,
  },
  {
    question: 'Does the kit come with a label for my consumer unit?',
    answer:
      'It should. The product must be supplied with a durable label intended to be affixed at or near the consumer unit, indicating that a plug-in PV device is present on the installation. The instructions must tell you to fix it somewhere clearly visible, and to produce and fit a new one if the consumer unit is ever replaced or relocated. It matters because the next person to work on that board needs to know there is a source of energy on one of the final circuits.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'Plug-in Solar UK: The Rules From 27 August 2026',
    description: 'The limits, the prohibitions, notification and where an electrician is needed.',
    href: '/plug-in-solar-uk',
    icon: Sun,
    category: 'Plug-in Solar',
  },
  {
    title: 'Plug-in Solar and RCDs',
    description: 'What is recommended, what is required, and why they differ.',
    href: '/plug-in-solar-rcd-requirements',
    icon: ShieldCheck,
    category: 'Plug-in Solar',
  },
  {
    title: 'Plug-in Solar for Landlords and Managing Agents',
    description: 'Answering a tenant request in writing, and what the building decides.',
    href: '/plug-in-solar-landlords-managing-agents',
    icon: Building2,
    category: 'Plug-in Solar',
  },
  {
    title: 'EICR Certificate',
    description: 'Condition reporting on the existing installation.',
    href: '/tools/eicr-certificate',
    icon: FileCheck2,
    category: 'Certificates',
  },
];

const sections = [
  {
    id: 'short-answer',
    heading: 'The Short Answer',
    content: (
      <>
        <p>
          A plug-in solar kit is required to tell you a great deal — considerably more than most
          buyers realise. The specification puts information duties on{' '}
          <strong>three separate surfaces</strong>: the product itself, the plug on the end of the
          lead, and the documentation supplied in the box.
        </p>
        <p>
          What none of those surfaces is, is the <strong>shop listing</strong>. Or the datasheet, or
          the manufacturer’s website. The rules govern the physical things inside the carton, which
          means almost everything you are entitled to know arrives{' '}
          <em>after you have paid</em> — and usually after you have decided where the panel is going
          and what it is being plugged into.
        </p>
        <p>
          That is not a loophole anyone is exploiting. It is simply where product law operates. But
          it does mean the questions worth asking are the ones you have to ask early, and this page
          sets out what the answers are supposed to be.
        </p>
      </>
    ),
  },
  {
    id: 'on-the-product',
    heading: 'What Must Be Permanently Marked on the Product',
    content: (
      <>
        <p>Specification §8.2.3.1. The product as a whole must carry, indelibly:</p>
        <ul>
          <li>The manufacturer’s name, postal address and email address.</li>
          <li>A model number and a serial number, so the device can be identified.</li>
          <li>
            Rated values — mains voltage, mains frequency, highest continuous current, rated power.
          </li>
          <li>IP degree of protection, and the protective class.</li>
          <li>
            A statement that <strong>a maximum of one inverter of up to {F.maxApparentPowerVA} VA
            may be plugged in per household circuit</strong>.
          </li>
          <li>
            A statement that <strong>notification to the distribution network operator about
            connection and disconnection is mandatory</strong>, including a link to instructions on
            how to do so.
          </li>
          <li>
            A statement that <strong>the product complies with the specification</strong>.
          </li>
        </ul>
        <p>
          That last one is the single most useful thing on the list for a buyer, and Electrical
          Safety First say so directly: the product you intend to purchase must clearly state that it
          conforms to the Interim Product Specification.
        </p>
      </>
    ),
  },
  {
    id: 'on-the-plug',
    heading: 'What Must Be Marked on the Plug Itself',
    content: (
      <>
        <p>
          Specification §8.2.3.2 treats the plug as its own surface, which makes sense — it is the
          part someone is holding at the moment they decide where to put it. It must carry:
        </p>
        <ul>
          <li>That only one plug-in solar device may be connected per household circuit.</li>
          <li>The rated current of the device.</li>
          <li>The ISO 7010-M002 mandatory sign — “observe the instructions for use”.</li>
          <li>
            <strong>A warning that the device must not be connected to an extension cable, multi-way
            adaptor or RCD adaptor.</strong>
          </li>
        </ul>
        <p>
          This may be a durable label or band positioned close to the plug. If you are holding a kit
          and there is nothing of the sort near the plug, that is a reasonable thing to query before
          it goes anywhere near a socket.
        </p>
      </>
    ),
  },
  {
    id: 'in-the-box',
    heading: 'What Must Be in the Documentation',
    content: (
      <>
        <p>
          Specification §8.3.1 to §8.3.5 run to roughly forty distinct items. The ones most likely to
          change what a household actually does:
        </p>
        <ul>
          <li>
            <strong>DNO registration and deregistration</strong>, with a QR code directing you to the
            guidance and registration process.
          </li>
          <li>
            <strong>The {F.professionalAssessmentThresholdW} W referral</strong> — above that total
            module power, you must be advised to consider a professional assessment of your
            installation before installing.
          </li>
          <li>
            <strong>Check your protective devices</strong> — that the installation has modern
            residual current protection and is in good condition, and that older fuse protection
            without RCBOs should be checked and, where necessary, upgraded by a professional
            electrician.
          </li>
          <li>
            <strong>How to identify which sockets share a circuit</strong>, with advice to consult a
            professional electrician if you are unsure how to do it safely.
          </li>
          <li>
            <strong>A prominent warning against ACM and MCM cladding, HPL cladding, timber cladding
            and timber balconies</strong>, and against buildings subject to external wall remediation
            works.
          </li>
          <li>
            <strong>A prominent warning that the device is not intended for use with a battery energy
            storage system.</strong>
          </li>
          <li>
            That you are responsible for obtaining permission from the owner, landlord, freeholder or
            managing agent, and for any planning permission or Listed Building Consent.
          </li>
          <li>
            That you are responsible for checking whether the product affects your insurance — your
            own, and where applicable the building’s.
          </li>
          <li>
            That you must not fix the panel to a wall forming a property boundary between dwellings,
            and must keep escape routes clear.
          </li>
          <li>
            <strong>The test button routine</strong> (§8.3.4) — press it periodically while the
            device is generating, and contact a competent professional electrician if it does not
            trip immediately.
          </li>
          <li>Decommissioning and disposal information, compliant with the WEEE Regulations.</li>
        </ul>
        <p>
          The instructions must also state plainly that any testing or modification of the building’s
          electrical system is work for professional electricians, in accordance with the
          distribution code, G98 and BS 7671 — and that where connection requires modifying the final
          circuit, such as replacing the circuit’s overcurrent protective device, that is work only a
          qualified electrician does.
        </p>
      </>
    ),
  },
  {
    id: 'the-label',
    heading: 'The Label for Your Consumer Unit',
    content: (
      <>
        <p>
          Easy to miss in the packaging, and worth digging out. The product must be supplied with a{' '}
          <strong>durable label intended to be affixed at or near the consumer unit</strong>,
          indicating that a plug-in PV device is present on the installation. The instructions must
          tell you to fix it somewhere clearly visible — and to produce and fit a new one if the
          consumer unit is ever replaced or relocated.
        </p>
        <p>
          It matters more than it looks. The next person to open that board needs to know there is a
          source of energy sitting on one of the final circuits, and they will not necessarily be
          told by the householder.
        </p>
      </>
    ),
  },
  {
    id: 'when-you-read-it',
    heading: 'When You Actually Get to Read It',
    content: (
      <>
        <p>
          Here is the practical problem. Every one of those surfaces — product, plug, paperwork — is
          inside the box. The specification regulates what you are told <em>after</em> the money has
          gone, and typically after you have already decided where the panel is going and which
          socket it is destined for.
        </p>
        <p>
          It shows in the material buyers actually see. Reviewing the pre-purchase material for a
          compliant British range — three kits, datasheets revised August 2026, from the first
          provider listed on the ENA register — exactly <strong>one</strong> of those obligations
          appears anywhere a buyer would encounter before purchase. No mention of G98, the network
          operator, notification, RCDs, extension leads, one-per-circuit, the{' '}
          {F.professionalAssessmentThresholdW} W threshold, or conformity with the specification.
        </p>
        <p>
          What is there, in small print beneath the warranty disclaimer, is a line saying the kit is
          designed for connection to a suitable outdoor socket{' '}
          <strong>installed and certified by a qualified electrician</strong> — on the same sheet
          whose step three of four reads “plug into a standard socket and start generating clean
          energy instantly”.
        </p>
        <p>
          <strong>To be fair about what that does and does not show:</strong> §8.3 governs the manual
          supplied with the product, not the datasheet or the website. A gap in pre-purchase material
          is a gap in pre-purchase material — it is not evidence that anybody has failed to comply.
          The manuals themselves may well carry all of it. The point is only that you will not see it
          until the box is open.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-check',
    heading: 'What to Check Before You Buy',
    content: (
      <>
        <ul>
          <li>
            <strong>Does the listing or product state that it conforms to the Interim Product
            Specification?</strong> ESF tell buyers it must clearly say so.
          </li>
          <li>
            <strong>Is the exact model on the ENA Connect Direct register, shown as compliant?</strong>{' '}
            Not merely present — assessed and identified as compliant.
          </li>
          <li>
            <strong>What is the total PV module power?</strong> Above{' '}
            {F.professionalAssessmentThresholdW} W and the manufacturer is obliged to point you at a
            professional assessment.
          </li>
          <li>
            <strong>Is there a battery in it, or marketed with it?</strong> Battery-integrated
            plug-in solar sits outside this route entirely.
          </li>
          <li>
            <strong>Where is it going, and what is that wall made of?</strong> The cladding and
            balcony restrictions decide whole buildings at once.
          </li>
          <li>
            <strong>Is there a suitable fixed outdoor socket?</strong> No extension leads are
            permitted, so if there is not, that is electrical work you will need before the kit
            arrives, not after.
          </li>
        </ul>
        <p>
          ESF also publish a straightforward buyer’s checklist, and their headline advice is to have
          the installation assessed by a competent electrician registered with a competent person
          scheme <em>before</em> purchasing — particularly in older properties, or where the
          condition of the installation and the type of protective devices is unknown.
        </p>
      </>
    ),
  },
  {
    id: 'not-a-device',
    heading: 'And What Is Not a Plug-in Solar Device At All',
    content: (
      <>
        <p>
          One category gets none of this, because it is not covered. Loose panels and a micro-inverter
          bought separately are <strong>not</strong> a plug-in solar device, however the listing
          describes them. The specification requires a complete product including “a factory
          assembled connection line fitted <strong>by the manufacturer</strong> with a plug designed
          to BS 1363”.
        </p>
        <p>
          A self-assembled build cannot meet that definition, cannot be registered on the ENA register
          as a device, and comes with none of the information duties above. Panels sold loose through
          national merchants routinely carry manuals with no mention of plugs, sockets, inverters, BS
          1363, RCDs or the network operator anywhere in them — and which state that installation
          requires professional skills and is to be carried out by qualified personnel. Those are
          documents for a designed installation under BS 7671 Section 712.
        </p>
        <p>
          <SEOInternalLink href="/plug-in-solar-uk">
            The wider rules, and the limits that apply, are on the plug-in solar hub page
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

export default function PlugInSolarWhatYoureToldPage() {
  return (
    <GuideTemplate
      title="What a Plug-in Solar Kit Must Tell You — and When You Read It"
      description="Plug-in solar kits must be marked with DNO notification duties, one-per-circuit limits and a conformity statement, and ship with ~40 documented items plus a consumer unit label. None of it is on the shop listing. What to check before you buy."
      datePublished="2026-09-01"
      dateModified="2026-09-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Plug-in Solar"
      badgeIcon={PackageOpen}
      heroTitle={
        <>
          What a Plug-in Solar Kit Must Tell You —{' '}
          <span className="text-yellow-400">and When You Get to Read It</span>
        </>
      }
      heroSubtitle="The specification puts heavy information duties on the product, the plug and the documentation in the box: network notification, one device per circuit, the cladding warnings, a label for your consumer unit and a conformity statement. What it does not reach is the shop listing — so nearly all of it arrives after you have paid."
      readingTime={9}
      answerBox={{
        question: 'What information must a plug-in solar kit come with?',
        answer:
          'The product must be permanently marked with rated values, a one-device-per-circuit statement, a statement that DNO notification of connection and disconnection is mandatory with a link, and a statement that it complies with the specification. The plug carries its own warnings, and the documentation must cover around forty further items.',
        detail:
          'All three of those surfaces are inside the box. The shop listing, the datasheet and the website are not regulated, so most of what you are entitled to know arrives after purchase.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      leadMagnet={
        <SEOInlineLeadMagnet
          headline="Plug-in Solar — What Actually Changed. Free 8-page guide"
          description="What it is, how it works, the full checklist of what has to be in place, the RCD question answered from the source, and what the box is legally required to tell your customer. Written for electricians and apprentices."
          bullets={[
            'Every mandated marking, with the section number',
            'Recommended vs required, cited to the source',
            'Free PDF — print it, share it, pin it up',
          ]}
          source="lead_magnet_plug_in_solar"
          analyticsLabel="plug_in_solar_guide_seo_told"
        />
      }
      faqs={faqs}
      faqHeading="What You Must Be Told — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Answering This for a Customer in Writing"
      ctaSubheading="Elec-Mate's Plug-in Solar Suitability & Commissioning Certificate assesses the installation, marks every finding as a requirement or as advice with the source against each, and produces a plain-English decision sheet for a landlord or managing agent. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
