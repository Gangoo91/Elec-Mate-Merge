import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Wrench, GraduationCap, PoundSterling, ShieldCheck, Users } from 'lucide-react';

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/starting-electrical-apprenticeship' },
  { label: 'Apprentice Tool List', href: '/guides/apprentice-electrician-tool-list' },
];

const tocItems = [
  { id: 'before-you-buy', label: 'Before You Buy Anything' },
  { id: 'day-one-kit', label: 'The Day-One Kit' },
  { id: 'buy-later', label: 'Buy Later, Not Now' },
  { id: 'dont-buy', label: 'What Not to Buy' },
  { id: 'quality', label: 'Quality: Where It Matters' },
  { id: 'allowance', label: 'Tool Allowances & Looking After Kit' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ask your employer for their apprentice tool list before buying anything — many firms specify exactly what they want, and some supply part of it.',
  'A sensible day-one kit is 12 to 15 hand tools costing roughly £150 to £250 — not the £600 "electrician van set" that YouTube suggests.',
  'Buy insulated (VDE) versions of the tools that go near conductors: screwdrivers, side cutters, pliers, strippers. Everything else can be standard.',
  'Test instruments are not a first-year purchase. Your employer provides calibrated testers, and you will learn on theirs — a multifunction tester is a qualified-electrician purchase.',
  'JIB-registered employers pay an annual tool allowance under the National Working Rules, and most firms replace tools that wear out through work — keep receipts and label everything.',
];

const faqs = [
  {
    question: 'How much should an apprentice spend on tools?',
    answer:
      'Around £150 to £250 covers a quality day-one kit of hand tools — insulated screwdrivers, side cutters, combination and long-nose pliers, strippers, a knife, tape, level, and a tool bag. Spending more in week one is almost always wasted: you do not yet know which tools suit your hands, your employer may supply some items, and expensive kit walks off site. Build up gradually — most electricians accumulate their full kit over the whole apprenticeship.',
  },
  {
    question: 'Do apprentices need to buy their own power tools?',
    answer:
      'Usually not in year one. Most employers supply power tools — drills, SDS drills, saws — because they are the employer\'s responsibility to provide and PAT-test as work equipment. Some apprentices buy their own combi drill in year two or three once they know which platform (battery system) their firm uses. Ask before buying: turning up with the wrong battery platform is an expensive mistake.',
  },
  {
    question: 'Do I need a multifunction tester as an apprentice?',
    answer:
      'No. Multifunction testers (MFTs) cost £600 to £1,000+, need annual calibration, and are provided by your employer for any testing you do under supervision. You will learn inspection and testing on your firm\'s calibrated instruments, and buy your own when you qualify — often when going self-employed. The only test equipment worth owning early is a decent two-pole voltage indicator, and even that is usually supplied.',
  },
  {
    question: 'What tool brands should an apprentice buy?',
    answer:
      'For insulated hand tools, the names you will see on site are Wera, Knipex, Bahco, CK and Wiha — all make VDE-rated tools that survive an apprenticeship. You do not need the most expensive line of any of them. A sensible approach: mid-range versions of the tools you use constantly (screwdrivers, side cutters), budget versions of things you use occasionally, upgrade individual tools as they wear or as you discover preferences.',
  },
  {
    question: 'Does the employer have to provide tools for an apprentice?',
    answer:
      'Employers must provide the equipment needed to work safely — PPE, power tools, test instruments, and access equipment. Personal hand tools are traditionally the electrician\'s own, and apprentices are usually expected to build a basic kit. JIB-registered employers pay an annual tool allowance to graded operatives and apprentices under the National Working Rules, which offsets the cost. If you are asked to buy something unusual or expensive, ask whether the firm supplies it first — most do.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/starting-electrical-apprenticeship',
    title: 'Starting Your Electrical Apprenticeship',
    description: 'The complete guide: routes in, pay, year-by-year, and the AM2.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrical-apprenticeship-interview-questions',
    title: 'Apprenticeship Interview Questions',
    description: 'What employers actually ask, with strong example answers.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: '2026 pay by year and JIB stage — including the tool allowance context.',
    icon: PoundSterling,
    category: 'Pay',
  },
  {
    href: '/guides/electrician-tool-list-uk',
    title: 'Electrician Tool List UK',
    description: 'The full qualified-electrician kit guide, brand by brand.',
    icon: Wrench,
    category: 'Tools',
  },
  {
    href: '/guides/gs-38-proving-dead',
    title: 'GS 38 & Proving Dead',
    description: 'What makes a voltage indicator and leads compliant — worth knowing early.',
    icon: ShieldCheck,
    category: 'Safety',
  },
];

const sections = [
  {
    id: 'before-you-buy',
    heading: 'Before You Buy Anything',
    content: (
      <>
        <p>
          One email saves you £200: <strong>ask your employer for their apprentice tool list.</strong>{' '}
          Most established firms have one. Some specify brands, some supply the first kit
          themselves, some run accounts with wholesalers where you get trade prices. Training
          providers often issue their own list for college workshop days too — and the college
          list and the site list are not always the same.
        </p>
        <p>
          The advice below is the honest baseline for a first-year apprentice on domestic and
          commercial installation work. It deliberately ignores the "complete electrician's kit"
          videos — those are aimed at qualified electricians with a van, not someone carrying
          everything in one bag onto someone else's site.
        </p>
      </>
    ),
  },
  {
    id: 'day-one-kit',
    heading: 'The Day-One Kit (roughly £150–£250)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Insulated (VDE) screwdriver set</strong> — slotted and Pozi/Phillips, the tools you will use most every day</li>
            <li>• <strong>VDE side cutters (160–180mm)</strong> — the single most-used tool in the bag</li>
            <li>• <strong>VDE combination pliers</strong> and <strong>VDE long-nose pliers</strong></li>
            <li>• <strong>Wire strippers</strong> — automatic or manual, your preference will develop</li>
            <li>• <strong>Electrician's knife</strong> or sheath knife for cable sheathing</li>
            <li>• <strong>Junior hacksaw</strong> + spare blades</li>
            <li>• <strong>Claw hammer</strong> and a <strong>bolster/chisel</strong> for chasing and lifting boards</li>
            <li>• <strong>Tape measure (5m/8m)</strong> and a <strong>torpedo level</strong></li>
            <li>• <strong>Flat and round files</strong>, <strong>adjustable spanner</strong></li>
            <li>• <strong>Head torch</strong> — lofts and risers are dark; this one you will thank yourself for</li>
            <li>• <strong>Tool bag or tote</strong> — a bag, not a box; you carry it up ladders</li>
            <li>• <strong>Pencils, marker pens, electrical tape</strong> — the things everyone forgets</li>
          </ul>
        </div>
        <p>
          That list covers first fix, second fix, and college workshop days. PPE — boots, gloves,
          eye protection, hard hat — should come from your employer; confirm before day one rather
          than assuming.
        </p>
      </>
    ),
  },
  {
    id: 'buy-later',
    heading: 'Buy Later, Not Now',
    content: (
      <>
        <p>These earn their place in year two and beyond, once the basics are second nature:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Combi drill</strong> — after you know which battery platform your firm runs</li>
            <li>• <strong>Crimping tool and lug sets</strong> — when your work needs them, not before</li>
            <li>• <strong>Conduit tools</strong> (bending spring, stocks and dies) — commercial-work dependent, often supplied</li>
            <li>• <strong>Socket tester / two-pole voltage indicator</strong> — useful once you are doing second fix regularly; check what your employer issues first</li>
            <li>• <strong>Steel fish tape / draw tape</strong> and <strong>cable rods</strong> — firms usually have these; buy your own when you are sick of hunting for them</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dont-buy',
    heading: 'What Not to Buy',
    content: (
      <>
        <div className="rounded-2xl bg-orange-500/[0.05] border border-orange-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>✘ <strong>A multifunction tester</strong> — £600+ and your employer provides calibrated instruments; this is a qualification-day purchase, not a day-one one</li>
            <li>✘ <strong>The 90-piece "electrician's kit" box sets</strong> — half the tools are filler you will never use, and the good half is better bought individually</li>
            <li>✘ <strong>Power tools before asking</strong> — wrong battery platform, and most firms supply them anyway</li>
            <li>✘ <strong>A van's worth of consumables</strong> — glands, fixings and connectors are the job's materials, not your tools</li>
            <li>✘ <strong>Premium versions of rarely-used tools</strong> — spend where your hands live daily, save everywhere else</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'quality',
    heading: 'Quality: Where It Actually Matters',
    content: (
      <>
        <p>
          The one non-negotiable: anything that goes near conductors should be{' '}
          <strong>VDE-rated insulated</strong> — screwdrivers, side cutters, pliers, strippers.
          Insulated tools are tested to 10,000 V and rated for work at 1,000 V, and they are the
          difference between a slip being a scratch on the tool or something much worse. As an
          apprentice you should never be working live — safe isolation is drilled from week one —
          but insulated tools are the belt to go with those braces, and every employer will expect
          them.
        </p>
        <p>
          Beyond that, buy mid-range from the site-standard brands (Wera, Knipex, Bahco, CK, Wiha)
          for daily tools and be as cheap as you like on the rest. When you eventually look at
          test equipment, the standards that matter are covered in our{' '}
          <SEOInternalLink href="/guides/gs-38-proving-dead">
            GS 38 guide to test instruments and leads
          </SEOInternalLink>{' '}
          — worth reading long before you buy, because it is also what your college will teach for
          safe isolation.
        </p>
      </>
    ),
  },
  {
    id: 'allowance',
    heading: 'Tool Allowances & Looking After Your Kit',
    content: (
      <>
        <p>
          If your employer is JIB-registered, the National Working Rules include an annual{' '}
          <strong>tool allowance</strong> paid to operatives and apprentices — it will not cover a
          whole kit, but it meaningfully offsets the build-up cost. Non-JIB firms vary: many still
          contribute or replace work-worn tools. Two habits worth starting on day one:{' '}
          <strong>mark every tool</strong> (paint pen or engraving — site tools migrate), and{' '}
          <strong>keep receipts</strong> — for allowance claims, insurance, and because tools used
          for work can matter at tax time once you are qualified and self-employed.
        </p>
        <p>
          Where pay and allowances fit into the bigger picture — including the JIB stage rates your
          wage should follow — is covered in the{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            apprentice salary guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

export default function ApprenticeToolListPage() {
  return (
    <GuideTemplate
      title="Apprentice Electrician Tool List 2026: Full Kit"
      description="What tools an apprentice electrician needs: the £150–£250 day-one kit, what to buy later, what to skip, and how tool allowances work."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Apprentice Electrician Tool List:{' '}
          <span className="text-yellow-400">What You Actually Need</span>
        </>
      }
      heroSubtitle="The honest first-year kit — 12 to 15 hand tools around £150 to £250 — plus what to buy later, what to skip entirely, where quality matters, and how tool allowances work. Written for people starting their apprenticeship this September."
      answerBox={{
        question: 'What tools does an apprentice electrician need?',
        answer:
          'A first-year apprentice needs a compact kit of hand tools — insulated (VDE) screwdrivers, side cutters, combination and long-nose pliers, wire strippers, a knife, junior hacksaw, hammer, tape measure, level and a tool bag — costing roughly £150 to £250. Employers provide power tools, PPE and test instruments. Ask your employer for their tool list before buying anything, and skip the multifunction tester until you qualify.',
      }}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Apprentice Tools: FAQ"
      relatedPages={relatedPages}
    />
  );
}
