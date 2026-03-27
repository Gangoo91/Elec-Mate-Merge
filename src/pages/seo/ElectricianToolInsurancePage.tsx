import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  PoundSterling,
  Wrench,
  Camera,
  Lock,
  AlertTriangle,
  Briefcase,
  FileCheck2,
  TrendingUp,
  Users,
  Car,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Tool Insurance', href: '/guides/electrician-tool-insurance' },
];

const tocItems = [
  { id: 'overview', label: 'Why Tool Insurance Matters' },
  { id: 'tool-values', label: 'Average Tool Values' },
  { id: 'types-of-cover', label: 'Types of Cover' },
  { id: 'providers', label: 'Provider Comparison' },
  { id: 'exclusions', label: 'What Is Typically Excluded' },
  { id: 'van-security', label: 'Van Security Discounts' },
  { id: 'documentation', label: 'Inventory and Documentation' },
  { id: 'claims', label: 'Making a Claim' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most electricians carry £5,000 to £15,000 worth of tools and test equipment in their van. A single theft could cost you weeks of income while you replace essential kit.',
  'Standard van insurance does NOT cover tools and equipment. You need a separate tool insurance policy or a specific tools-in-transit/tools-on-site extension.',
  'Cover types to look for: accidental damage, theft from a locked vehicle, theft from site, tool breakdown/mechanical failure, and new-for-old replacement.',
  'Van security measures (deadlocks, slam locks, GPS trackers, tool vaults) can reduce your premium by 10-25% and some insurers require them for cover above £5,000.',
  'Keep a photographic inventory of every tool with serial numbers, purchase receipts, and estimated replacement values. Without evidence, insurers will reduce or reject your claim.',
];

const faqs = [
  {
    question: 'Does my van insurance cover tools stolen from the van?',
    answer:
      'Almost certainly not by default. Standard van insurance covers the vehicle itself — bodywork, engine, and third-party liability. Tools and equipment left in the van are NOT covered unless you have specifically added a "tools-in-transit" or "goods-in-transit" extension to your van policy, or you have a separate standalone tool insurance policy. Even with an extension, there are usually limits (often £500 to £2,000 on a standard van policy) which would not come close to replacing an electrician\'s full kit. Always check your van policy wording and consider dedicated tool cover.',
  },
  {
    question: 'How much does electrician tool insurance cost?',
    answer:
      'For a sole trader electrician with £5,000 to £10,000 of tools and test equipment, standalone tool insurance typically costs £100 to £300 per year. Policies covering higher values (£10,000 to £15,000+) or including additional cover such as tool breakdown and accidental damage will be towards the higher end — typically £200 to £400 per year. The cost depends on your postcode (theft risk area), van security measures, claims history, and the level of cover. This is a tax-deductible business expense.',
  },
  {
    question: 'What is the difference between new-for-old and indemnity cover?',
    answer:
      'New-for-old (also called "replacement as new") means the insurer pays the full cost of replacing your stolen or damaged tool with a brand new equivalent, regardless of how old the original tool was. Indemnity cover means the insurer pays the current market value of the tool at the time of loss, accounting for age and wear. A 5-year-old Fluke multifunction tester that cost £1,200 new might only be valued at £400 on an indemnity basis. New-for-old is more expensive but significantly better — always choose it if you can afford the premium difference.',
  },
  {
    question: 'Are test instruments like Fluke and Megger covered?',
    answer:
      'Yes, but you must declare them specifically. Most tool insurance policies distinguish between hand tools and powered tools/test equipment. High-value items such as multifunction testers (Fluke 1664FC, Megger MFT1741), thermal imaging cameras, and power tools often need to be listed individually on the policy with their serial numbers and replacement values. Some policies have per-item limits (for example, £1,000 per item) — if your multifunction tester costs £1,200, you need a policy with a higher per-item limit or the ability to specify individual items.',
  },
  {
    question: 'Will the insurer pay out if tools are stolen from an unlocked van?',
    answer:
      'No. Every tool insurance policy requires that your vehicle is locked and secured when unattended. If tools are stolen from an unlocked van, the claim will be rejected. Most policies also require that tools are stored out of sight — if a thief can see tools through the van window, the insurer may argue you did not take reasonable precautions. Some policies go further and require specific security measures (deadlocks, slam locks) for claims above certain values. Always read the security requirements in your policy and comply with them.',
  },
  {
    question: 'Can I claim tool insurance as a business expense?',
    answer:
      'Yes. Tool insurance premiums are a wholly and exclusively business expense and are fully tax-deductible against your self-employed profits. Include the annual premium in your self-assessment tax return under business expenses. If you pay monthly, the total of all monthly payments in the tax year is the deductible amount. Keep the policy document and payment confirmation as evidence.',
  },
  {
    question: 'What van security do I need for tool insurance?',
    answer:
      'Requirements vary by insurer and cover level. At minimum, your van must be locked when unattended. For cover above £5,000, most insurers require or recommend: deadlocks on all doors (factory or aftermarket), a slam lock on the rear/side loading door, tools stored in a locked vault or racking system within the van, and ideally a GPS tracker or alarm system. Fitting approved security can reduce your premium by 10-25%. Some insurers will not cover tools above £7,500 without deadlocks and a slam lock fitted. Ask your insurer for their specific requirements before fitting security.',
  },
  {
    question: 'How do I prove what tools I had if they are stolen?',
    answer:
      'You need a tool inventory — and you need it BEFORE the theft happens. Photograph every tool individually, capturing brand, model, and serial number. Keep purchase receipts (physical or digital). Create a spreadsheet listing each tool, its purchase date, purchase price, and estimated replacement value. Update it whenever you buy or replace a tool. Store this inventory in the cloud (Google Drive, iCloud, or a tool tracking app) so it is not lost with the tools. Without an inventory, the insurer will challenge every item on your claim and the payout will be significantly lower.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-business-insurance',
    title: 'Business Insurance Guide',
    description:
      'Public liability, professional indemnity, and employers liability — the full insurance picture.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-van-setup-guide',
    title: 'Electrician Van Setup Guide',
    description:
      'Van racking, security, and organisation — protect your tools and work efficiently.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — insurance, registration, pricing, and finding customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'HMRC mileage rates, van vs car rules, and what travel counts as a business expense.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Professional PDF quotes with itemised pricing — include insurance overhead in your rates.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Compare lead generation platforms — costs, lead quality, and the right choice for your business.',
    icon: TrendingUp,
    category: 'Comparison',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Tool Insurance Matters for Electricians',
    content: (
      <>
        <p>
          Your tools are your livelihood. Without a multifunction tester, a set of hand tools, and
          your power tools, you cannot work — and you cannot earn. Tool theft from vans is one of
          the most common crimes affecting tradespeople in the UK, with an estimated 23,000 van
          break-ins per year targeting tools.
        </p>
        <p>
          A single theft can cost you £5,000 to £15,000 in replacement tools, plus days or weeks of
          lost income while you source replacements. Many electricians assume their van insurance
          covers tools — it does not. Standard motor insurance covers the vehicle, not its contents.
        </p>
        <p>
          Tool insurance is a separate policy (or a specific add-on) that covers your tools and
          equipment against theft, accidental damage, and sometimes breakdown. For most electricians,
          it costs £100 to £400 per year — a fraction of what a single theft would cost you.
        </p>
      </>
    ),
  },
  {
    id: 'tool-values',
    heading: 'Average Tool Values for Electricians',
    content: (
      <>
        <p>
          Most electricians significantly underestimate the total replacement value of their kit. When
          you add up every hand tool, power tool, test instrument, and consumable, the numbers are
          higher than you think.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-400" /> Test Equipment
              </h4>
              <ul className="space-y-2">
                <li>Multifunction tester (Fluke/Megger): <strong className="text-yellow-400">£800–£1,500</strong></li>
                <li>PAT tester: <strong className="text-yellow-400">£200–£600</strong></li>
                <li>Thermal imaging camera: <strong className="text-yellow-400">£200–£1,000</strong></li>
                <li>Voltage indicators, proving units: <strong className="text-yellow-400">£100–£300</strong></li>
                <li>Clamp meter, multimeter: <strong className="text-yellow-400">£50–£300</strong></li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-green-400" /> Power Tools and Hand Tools
              </h4>
              <ul className="space-y-2">
                <li>Cordless drill set (DeWalt/Makita): <strong className="text-yellow-400">£200–£600</strong></li>
                <li>SDS drill: <strong className="text-yellow-400">£150–£400</strong></li>
                <li>Full hand tool set: <strong className="text-yellow-400">£500–£1,500</strong></li>
                <li>Cable rods, fish tapes: <strong className="text-yellow-400">£100–£300</strong></li>
                <li>Access equipment (steps, ladders): <strong className="text-yellow-400">£100–£400</strong></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-2">Typical Total Replacement Values</h4>
          <div className="grid gap-3 sm:grid-cols-3 text-white text-sm">
            <div>
              <p className="font-bold text-yellow-400">Newly Qualified</p>
              <p>Basic kit: £3,000–£5,000</p>
            </div>
            <div>
              <p className="font-bold text-yellow-400">Experienced Sole Trader</p>
              <p>Full kit: £7,000–£12,000</p>
            </div>
            <div>
              <p className="font-bold text-yellow-400">Specialist / Commercial</p>
              <p>Advanced kit: £10,000–£15,000+</p>
            </div>
          </div>
        </div>
        <p>
          When calculating your cover level, add up the new-for-old replacement cost of every item —
          not what you paid for it years ago. A multifunction tester bought for £900 five years ago
          might cost £1,300 to replace today.
        </p>
      </>
    ),
  },
  {
    id: 'types-of-cover',
    heading: 'Types of Tool Insurance Cover',
    content: (
      <>
        <p>
          Not all tool insurance policies are equal. Make sure yours covers the risks that actually
          affect electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Theft from a Locked Vehicle</h4>
                <p className="text-white text-sm leading-relaxed">
                  The most common claim type for electricians. Covers tools stolen from your van
                  overnight or while parked at a job site, provided the vehicle was locked and any
                  required security measures were in place. Check the policy for time restrictions —
                  some policies limit overnight cover or require tools to be removed from the van
                  overnight.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Theft from Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Covers tools stolen from a customer's property or a building site while you are
                  working. This is important for first and second fix work where tools are left on
                  site between visits. Some policies require tools to be in a locked room or container
                  when you are not present.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Accidental Damage</h4>
                <p className="text-white text-sm leading-relaxed">
                  Covers tools that are accidentally broken or damaged — dropped from height, driven
                  over, or damaged by water or impact. This is particularly valuable for expensive
                  test equipment that can be damaged by a single drop. Not all policies include
                  accidental damage as standard — check or add it as an option.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Tool Breakdown / Mechanical Failure</h4>
                <p className="text-white text-sm leading-relaxed">
                  Some policies cover the cost of repairing or replacing tools that fail mechanically
                  outside of the manufacturer's warranty period. This is useful for expensive power
                  tools and test instruments. Not all policies offer this — it is typically an add-on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'providers',
    heading: 'Provider Comparison',
    content: (
      <>
        <p>
          Several insurers specialise in tool cover for tradespeople. Here is an overview of what to
          expect from the market in 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Specialist Trade Tool Insurers</h4>
              <p className="text-white leading-relaxed">
                Providers such as Protector Insurance, ToolSure, and MyToolCover specialise in tool
                insurance for tradespeople. They understand the specific risks, offer new-for-old
                replacement, and have straightforward claims processes. Typical cost: £150–£350/year
                for £10,000 cover. Excess: £100–£250.
              </p>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Van Insurance Add-Ons</h4>
              <p className="text-white leading-relaxed">
                Your van insurer may offer a "tools-in-transit" extension. This is convenient but
                often has lower cover limits (£500–£2,000), higher excesses, and may only cover
                tools while in the van (not on site). Fine as a top-up, but rarely sufficient as
                your only tool cover.
              </p>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-2">Business Insurance Bundles</h4>
              <p className="text-white leading-relaxed">
                Some business insurance providers (Hiscox, Simply Business, PolicyBee) bundle tool
                cover with public liability and professional indemnity. This can be cost-effective if
                you need all three. Check the tool cover limits and per-item limits carefully — they
                may be lower than a specialist policy.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-2">Key Comparison Points</h4>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>New-for-old vs indemnity</strong> — always choose new-for-old if available</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Excess amount</strong> — typically £100 to £250, lower is better</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Per-item limit</strong> — must be high enough for your most expensive test instrument</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cover location</strong> — van only, or van + site + home workshop</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Overnight cover</strong> — some policies exclude overnight theft from van</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'exclusions',
    heading: 'What Is Typically Excluded',
    content: (
      <>
        <p>
          Read your policy wording carefully. These are the most common exclusions that catch
          electricians out.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Theft from an unlocked vehicle</strong> — if the van was not locked, no
                claim. This includes leaving the van unlocked while "just popping back to the
                customer's door" or leaving a window open.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wear and tear</strong> — gradual deterioration is not covered. If your drill
                stops working after 5 years of heavy use, that is wear and tear, not insurable
                damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools left unattended in the open</strong> — tools left on the pavement,
                in an open van, or in an unlocked room on site are not covered. They must be in a
                locked vehicle or locked container.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumables and materials</strong> — cable, trunking, switches, sockets, and
                other materials are usually excluded. Tool insurance covers tools and equipment, not
                stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failure to meet security requirements</strong> — if your policy requires
                deadlocks and you do not have them fitted, the insurer can void the entire claim.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'van-security',
    heading: 'Van Security Measures and Insurance Discounts',
    content: (
      <>
        <p>
          Fitting proper security to your van does two things: it deters thieves and it reduces your
          insurance premium. Most specialist tool insurers offer discounts of 10-25% for specific
          security measures.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Essential Security</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Deadlocks</strong> on all doors — £80–£200 per door, fitted</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Slam lock</strong> on rear/side loading door — £150–£300 fitted</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Steel bulkhead</strong> between cab and load area — often factory fitted</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span><strong>Blank windows</strong> or window guards on load area — prevents visibility</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Advanced Security</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span><strong>Tool vault / safe</strong> bolted to van floor — £200–£500</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span><strong>GPS tracker</strong> (Thatcham approved) — £100–£300 + subscription</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span><strong>Alarm system</strong> with movement sensors — £150–£400 fitted</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span><strong>CCTV / dashcam</strong> covering load area — £50–£200</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The cost of fitting deadlocks and a slam lock (£300–£500 total) is typically recouped
          within 2 years through premium savings alone — and the peace of mind is worth far more.
          Many insurers now require at least deadlocks for cover above £5,000.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Inventory and Photo Documentation',
    content: (
      <>
        <p>
          The single biggest reason tool insurance claims are reduced or rejected is lack of evidence.
          If you cannot prove what you had, the insurer will not pay for it. Build your tool inventory
          now — before you need it.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Photograph Every Tool</h4>
                <p className="text-white text-sm leading-relaxed">
                  Take individual photos of each tool showing the brand, model, and serial number.
                  For hand tool sets, photograph the complete set laid out. For test equipment,
                  photograph the instrument, its case, and any accessories. Store these photos in the
                  cloud — Google Photos, iCloud, or Dropbox — so they are not lost if your phone is
                  stolen with your tools.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Purchase Receipts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Save every receipt — physical or digital. Wholesaler receipts, Amazon order
                  confirmations, eBay purchase records. If you buy tools with cash at a car boot
                  sale, you will struggle to prove you owned them. For high-value items, register
                  them with the manufacturer for warranty and proof of ownership.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Create a Tool Register</h4>
                <p className="text-white text-sm leading-relaxed">
                  Maintain a spreadsheet or use a tool tracking app listing: tool name, brand, model,
                  serial number, purchase date, purchase price, and estimated replacement value.
                  Update it whenever you buy, sell, or replace a tool. This is your primary evidence
                  for any insurance claim and also useful for calculating the correct cover level.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Track your tools and protect your business"
          description="Elec-Mate helps you manage your electrical business — quoting, certification, job management, and more. 7-day free trial."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'claims',
    heading: 'Making a Claim: Step by Step',
    content: (
      <>
        <p>
          If the worst happens, follow this process to maximise your chances of a successful claim.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Report to the police immediately.</strong> Call 101 or report online. You
                need a crime reference number — without it, your insurer will not process the claim.
                Report within 24 hours of discovering the theft.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Photograph the damage.</strong> Take photos of forced entry (broken locks,
                damaged doors, smashed windows). This proves the theft was forcible and your van was
                secured.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Contact your insurer.</strong> Most policies require notification within
                48 hours. Have your policy number, crime reference number, and tool inventory ready.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Provide your tool register.</strong> Submit your inventory spreadsheet,
                photos, serial numbers, and purchase receipts. The more evidence you provide, the
                faster and larger your settlement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Get replacement quotes.</strong> The insurer may ask for quotes for
                replacement tools. Provide like-for-like replacements at current retail prices.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianToolInsurancePage() {
  return (
    <GuideTemplate
      title="Electrician Tool Insurance UK 2026 | Cover Your Kit"
      description="Complete guide to tool insurance for UK electricians. Cover types, provider comparison, van security discounts, inventory documentation, exclusions, and how to make a claim. Protect £5,000-£15,000 of essential kit."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Insurance Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Electrician Tool Insurance UK 2026:{' '}
          <span className="text-yellow-400">Cover Your Kit, Protect Your Income</span>
        </>
      }
      heroSubtitle="Most electricians carry £5,000 to £15,000 of tools and test equipment. Standard van insurance does NOT cover them. This guide explains the types of cover, compares providers, details van security discounts, and shows you how to document your kit for a successful claim."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Tool Insurance"
      relatedPages={relatedPages}
      ctaHeading="Protect Your Business With the Right Tools"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Manage your business professionally from your phone. 7-day free trial, cancel anytime."
    />
  );
}
