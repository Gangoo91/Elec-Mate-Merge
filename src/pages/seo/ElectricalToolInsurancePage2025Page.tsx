import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Wrench,
  FileCheck2,
  Building2,
  ClipboardCheck,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/electrical-business-growth' },
  { label: 'Electrician Tool Insurance 2025', href: '/electrician-tool-insurance-2025' },
];

const tocItems = [
  { id: 'what-is-covered', label: 'What Tool Insurance Covers' },
  { id: 'exclusions', label: 'Common Exclusions' },
  { id: 'claim-process', label: 'The Claim Process' },
  { id: 'excess-amounts', label: 'Excess Amounts' },
  { id: 'specialist-vs-general', label: 'Specialist vs General Insurers' },
  { id: 'typical-premiums', label: 'Typical Premiums for 2025' },
  { id: 'choosing-policy', label: 'Choosing the Right Policy' },
  { id: 'for-electricians', label: 'Protecting Your Business' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrician tool insurance typically covers tools in a locked van, in use on site, and at your home address — but the specific conditions for van cover vary significantly between insurers and must be read carefully.',
  'The most common exclusion on van tool cover is theft from an unattended vehicle that shows no signs of forced entry. Many policies will not pay out for tools stolen from a van parked overnight without physical evidence of break-in.',
  'NICEIC, NAPIT, and other scheme bodies offer approved tool insurance schemes with rates and conditions specifically tailored to electrical contractors — these are often more suitable than general trade tool policies.',
  'Typical premiums for £5,000 of tools are £15 to £40 per month (£180 to £480 per year), depending on the insurer, tool value, excess level, and location.',
  'Always keep a current inventory of your tools with serial numbers, photographs, and receipts. Without this evidence, claims can be reduced or rejected entirely.',
];

const faqs = [
  {
    question: 'What does electrician tool insurance cover?',
    answer:
      "Electrician tool insurance typically covers theft and accidental damage to your tools and equipment in the following locations: (1) In a locked van — covers tools stolen from a locked van, usually subject to forced entry evidence and overnight parking restrictions. (2) On site — covers tools while in use or temporarily left at a customer's premises. (3) At home — covers tools stored at your home address, either in a locked garage, outbuilding, or within the house. Some policies also cover tools in transit and tools temporarily at a training venue or other location. The scope varies significantly between policies, so read the policy wording carefully.",
  },
  {
    question: 'Will insurance pay if tools are stolen from my van overnight?',
    answer:
      'This is the most contentious area of tool insurance. Most policies require evidence of forced entry (a damaged lock, broken window, or jemmied door) to pay a claim for theft from an unattended vehicle. If thieves use a relay device (common with modern van keyless entry), a bump key, or a lock pick — and the van shows no signs of forced entry — many standard policies will refuse the claim. Specialist trade tool insurers (including some NICEIC and NAPIT schemes) offer overnight van cover with less restrictive forced entry conditions. Always check this specific point before buying.',
  },
  {
    question: 'What is the claims excess on tool insurance?',
    answer:
      'The excess is the amount you pay towards each claim before the insurer pays the rest. For tool insurance, excess levels typically range from £100 to £500. A lower excess means higher premiums; a higher excess means lower premiums. For an electrician with £5,000 of tools, a £250 excess is common. On a claim for £600 of stolen tools, you receive £350 (£600 minus £250 excess). Some policies have a per-item excess in addition to the claim excess — read the policy schedule carefully.',
  },
  {
    question: 'Are power tools (drills, SDS hammers, cable pullers) covered?',
    answer:
      'Yes — most tool insurance policies cover both hand tools and power tools. Make sure you list all high-value items individually on the policy schedule if required. Items above a specified individual value threshold (often £250 to £500) may need to be scheduled separately to ensure full replacement. Under-insuring individual high-value items is a common mistake — if you claim for a £800 cable puller but it is not listed and your maximum single item limit is £500, you will only receive £500.',
  },
  {
    question: 'Do NICEIC or NAPIT offer their own tool insurance schemes?',
    answer:
      'Yes. The NICEIC Group offers an insurance scheme through approved brokers specifically for NICEIC-registered contractors, covering tools, plant, and equipment. NAPIT also partners with specialist insurers to offer scheme members preferential rates. These approved schemes are designed around the realities of electrical contracting — including van cover conditions that reflect how electricians actually work. Scheme-specific policies sometimes offer better cover or lower rates than open market alternatives, so always compare them as part of your research.',
  },
  {
    question: 'Does my public liability insurance cover my tools?',
    answer:
      "Public liability (PL) insurance covers your legal liability to third parties for injury or property damage caused by your business activities — it does not cover your own tools or equipment. You need a separate tool and equipment insurance policy (sometimes called plant and equipment insurance or contractors' all risks) to protect your own property. Some combined trade insurance packages (e.g., a tradesperson's policy) may include basic tool cover alongside PL, but the limits are typically low (£2,500 to £5,000) and the conditions may be more restrictive than a dedicated tool policy.",
  },
  {
    question: 'What happens if I do not have receipts for my tools?',
    answer:
      'Without receipts, settling a claim can be difficult. Most insurers will accept alternative evidence of ownership and value, including: bank or credit card statements showing the purchase, photographs of the tools with visible serial numbers, manufacturer warranty registrations, and a statutory declaration (sworn statement) of ownership and value. Serial numbers are particularly important — they allow stolen tools to be identified if recovered by police and support your claim that the items existed. Create a tool register now, before you need to make a claim.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-van-leasing',
    title: 'Electrician Van Leasing',
    description: 'Lease vs HP vs outright purchase, tax benefits, and typical monthly costs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/electrical-salary-benchmarking',
    title: 'Electrician Salary Benchmarking',
    description: 'JIB grade rates, London weighting, and how to benchmark pay in 2025.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-growth',
    title: 'Growing Your Electrical Business',
    description: 'Strategies for scaling from sole trader to employer.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Professional quotes sent from your phone directly to clients.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-covered',
    heading: 'What Electrician Tool Insurance Covers',
    content: (
      <>
        <p>
          Tool insurance (also called plant and equipment insurance or contractors' tools cover)
          protects your tools and equipment against theft and accidental damage. For an electrician,
          whose tools represent a significant capital investment, adequate cover is essential.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools in a locked van</strong> — the most commonly claimed scenario. Cover
                applies when tools are in a locked van and are stolen following a break-in. Most
                policies require evidence of forced entry and may impose overnight parking
                conditions (e.g., the van must be parked in a secure location or within sight of
                CCTV). Conditions vary significantly between insurers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools on site</strong> — covers tools while in use at a customer's property
                or while temporarily stored at an active work site. Some policies require that tools
                left on site overnight are locked in a secure container or within a locked building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools at home</strong> — covers tools stored at your home address. Some
                policies require tools to be in a locked outbuilding or garage rather than left in a
                vehicle on the driveway overnight. Check the overnight storage conditions carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accidental damage</strong> — covers accidental damage to tools while in use,
                in transit, or in storage. Dropped test instruments, cracked multimeter screens, and
                damaged power tool bodies are common accidental damage claims. Check whether there
                is a per-item limit for accidental damage claims.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test equipment</strong> — multifunction testers, earth loop impedance
                testers, RCD testers, and insulation resistance testers are expensive and essential.
                Confirm that test equipment is covered under your policy, as some insurers treat it
                separately from general hand and power tools.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'exclusions',
    heading: 'Common Exclusions to Watch For',
    content: (
      <>
        <p>
          Many electricians discover the limitations of their tool insurance only when making a
          claim. Understanding the common exclusions before you buy helps you choose a policy that
          actually protects you.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No signs of forced entry</strong> — the most common reason claims are
                rejected. If thieves break into a van without leaving obvious damage (relay attacks,
                lock picking, spare key theft), many policies refuse to pay. Specialist trade
                insurers increasingly offer policies that do not require forced entry evidence for
                van theft claims — these are worth seeking out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overnight parking restrictions</strong> — some policies exclude claims for
                tools stolen from a van parked overnight in a public road or unattended car park.
                The policy may require the van to be garaged, in a locked compound, or visible from
                CCTV overnight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unattended site</strong> — tools left on site overnight (outside of a locked
                secure container) may not be covered. Read the definition of "attended" in your
                policy — leaving tools at a site at the end of the day may be excluded unless
                specifically covered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wear and tear and mechanical breakdown</strong> — tool insurance covers
                theft and accidental damage, not gradual deterioration, mechanical failure, or tools
                that simply stop working. A cordless drill battery that reaches end of life or a
                power tool that burns out through overuse is not covered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual item limits</strong> — if a single tool (e.g., a multifunction
                tester costing £1,200) exceeds the policy's per-item limit (often £500), you will
                only receive the per-item limit in a claim. Schedule high-value items individually
                on the policy to ensure full replacement value.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'claim-process',
    heading: 'The Claim Process',
    content: (
      <>
        <p>
          Knowing what to do immediately after a theft or damage incident significantly improves
          your chances of a successful claim. The following steps are applicable to most tool
          insurance policies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Report to police</strong> — report the theft to the police
                immediately and get a crime reference number. This is almost universally required by
                insurers as proof that a crime has occurred. Without a crime reference number, most
                theft claims will be refused.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Photograph evidence</strong> — before any repair is carried out,
                photograph the damage (forced entry, damage to the lock, broken window). If
                possible, preserve the crime scene until the insurer can inspect or a loss adjuster
                is appointed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Notify your insurer promptly</strong> — most policies require
                notification within a specified period (often 24 to 72 hours). Late notification can
                give the insurer grounds to refuse or reduce the claim. Call the claims line
                immediately and follow up in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Provide evidence of ownership and value</strong> — compile your
                tool register with serial numbers, receipts, bank statements, or warranty
                registrations. Provide a full list of stolen or damaged items with their current
                replacement value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5 — Loss adjuster visit</strong> — for larger claims (typically above
                £2,500 to £5,000), the insurer may appoint a loss adjuster to inspect the scene and
                verify the claim. Co-operate fully and provide all documentation requested.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'excess-amounts',
    heading: 'Excess Amounts and How They Affect Your Premium',
    content: (
      <>
        <p>
          The excess is the amount you pay towards a claim before the insurer pays the balance. It
          directly affects both your premium and the minimum claim size at which making a claim is
          worthwhile.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard excess range</strong> — £100 to £500 per claim is typical for
                electrician tool insurance. A £100 excess gives you more claims flexibility but
                costs more in premium. A £500 excess gives you lower premiums but means small claims
                (e.g., a stolen £400 screwdriver set) are effectively uninsured after the excess.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voluntary excess</strong> — some insurers allow you to choose a higher
                voluntary excess in exchange for a lower premium. If you would not realistically
                claim for losses below £500 (to protect your no-claims record), opting for a higher
                voluntary excess can give meaningful premium savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No-claims discount</strong> — unlike motor insurance, tool insurance
                no-claims discounts are less standardised. Some policies offer a discount for
                claim-free years; others do not. Ask the insurer about their no-claims discount
                structure before choosing an excess level.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'specialist-vs-general',
    heading: 'Specialist vs General Insurers',
    content: (
      <>
        <p>
          Tool insurance is available from both general insurance brokers and specialist trade
          insurers who focus exclusively on the construction and electrical sectors. The difference
          in cover quality can be significant.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC and NAPIT approved schemes</strong> — scheme-specific insurance
                policies are designed around how electricians work. They typically have more
                realistic van theft conditions (some do not require forced entry evidence), cover
                test equipment as standard, and may include public liability as part of a combined
                package. Rates are often competitive and claims handling tends to be familiar with
                the realities of electrical contracting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist trade insurers</strong> — brokers such as Tradesman Saver,
                Kingsbridge, Simply Business, and the Federation of Master Builders offer
                trade-specific policies. Premiums are often lower than scheme insurance but
                conditions may be stricter. Always read the policy wording, not just the summary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General household or van insurance</strong> — some home and van insurance
                policies claim to include tool cover, but limits are typically very low (£500 to
                £1,000) and conditions are usually designed for private rather than commercial use.
                These are rarely adequate for a working electrician's tool inventory. Do not rely on
                them as your primary tool cover.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'typical-premiums',
    heading: 'Typical Premiums for 2025',
    content: (
      <>
        <p>
          Tool insurance premiums depend on the total insured value of your tools, your location,
          the excess level, the extent of cover (especially van overnight conditions), and your
          claims history.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>£2,500 of tools</strong> — approximately £100 to £180 per year (£8 to £15
                per month). Suitable for a newly qualified electrician with a basic tool kit. Excess
                typically £150 to £250.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>£5,000 of tools</strong> — approximately £180 to £480 per year (£15 to £40
                per month). The most common cover level for a qualified electrician including power
                tools, hand tools, and test equipment. Excess typically £200 to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>£10,000 of tools</strong> — approximately £350 to £700 per year (£29 to £58
                per month). For electricians with a full kit including specialist test equipment,
                cable drums, and specialist hand tools. Excess typically £250 to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>London premium</strong> — electricians based in London typically pay 15 to
                25% more than equivalent cover outside London, reflecting the higher frequency of
                van break-ins in urban areas. Overnight garage storage conditions may be required in
                some inner London postcodes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-policy',
    heading: 'Choosing the Right Tool Insurance Policy',
    content: (
      <>
        <p>
          With many policies available, comparing on price alone is a mistake. Focus on the
          conditions that are most likely to affect your claims.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check van theft conditions</strong> — does the policy require forced entry
                evidence? What are the overnight parking requirements? This single question
                eliminates many otherwise cheap policies for electricians who keep tools in their
                van overnight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check test equipment cover</strong> — confirm that your multifunction
                tester, loop tester, and RCD tester are included and that the per-item limit is
                sufficient to replace them at current market prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-for-old or indemnity basis?</strong> — new-for-old replaces stolen or
                damaged tools with equivalent new items. Indemnity basis deducts depreciation,
                meaning a five-year-old tool is only replaced at its current second-hand value.
                New-for-old is far better value for electricians with a mixed-age tool inventory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Claims handling reputation</strong> — read reviews and, if possible, ask
                other electricians in your area or your scheme body who they recommend. An insurer
                with low premiums but a reputation for disputed claims is not good value.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Protecting Your Electrical Business with Elec-Mate',
    content: (
      <>
        <p>
          Insurance protects you when things go wrong, but strong business systems reduce the
          likelihood of disputes and lost revenue in the first place. Elec-Mate's{' '}
          <SEOInternalLink href="/electrical-quoting-app">quoting</SEOInternalLink> and{' '}
          <SEOInternalLink href="/tools/eicr-certificate">certification tools</SEOInternalLink>{' '}
          create a professional record of every job, protecting you commercially as well as giving
          your clients the documentation they need.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build Your Tool Register in Elec-Mate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Keep a running list of your tools, serial numbers, and photos within Elec-Mate job
                  notes or the asset register. When you do need to make an insurance claim, your
                  evidence is already organised and accessible from your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates That Protect You</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every certificate issued through{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> is
                  stored in the cloud with the test results that support it. If a client or insurer
                  ever questions your work, you have complete documentary evidence on hand.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run a protected electrical business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for electrical certificates, job scheduling, quoting, and invoicing. Build the paper trail that protects your business. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalToolInsurancePage2025Page() {
  return (
    <GuideTemplate
      title="Electrician Tool Insurance UK 2025 | Van & Tool Cover Guide"
      description="Complete guide to electrician tool insurance in the UK for 2025. What's covered (tools in van, on site, at home), common exclusions (unattended vehicle, no forced entry), claim process, excess amounts, specialist vs general insurers, and typical premiums (£15–40/month for £5,000 of tools)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Insurance Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Electrician Tool Insurance UK 2025:{' '}
          <span className="text-yellow-400">Complete Van & Tool Cover Guide</span>
        </>
      }
      heroSubtitle="What tool insurance covers, the exclusions that catch electricians out (especially van theft without forced entry), how to make a successful claim, specialist vs general insurers, NICEIC and NAPIT approved schemes, and typical premiums for 2025."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Tool Insurance"
      relatedPages={relatedPages}
      ctaHeading="Protect your electrical business with the right tools and systems"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for electrical certificates, job scheduling, quoting, and invoicing. 7-day free trial, cancel anytime."
    />
  );
}
