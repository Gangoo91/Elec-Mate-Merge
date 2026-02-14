import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  GraduationCap,
  BookOpen,
  Brain,
  ShieldCheck,
  Target,
  Award,
  FolderOpen,
  ClipboardCheck,
  Gauge,
  PoundSterling,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Toolbox Guide', href: '/guides/apprentice-toolbox-guide' },
];

const tocItems = [
  { id: 'why-tools-matter', label: 'Why Your Tools Matter' },
  { id: 'basic-hand-tools', label: 'Basic Hand Tools' },
  { id: 'vde-insulated-tools', label: 'VDE Insulated Tools' },
  { id: 'test-equipment', label: 'Test Equipment' },
  { id: 'tool-bag-vs-box', label: 'Tool Bag vs Tool Box' },
  { id: 'budget-guide', label: 'Budget Guide for Apprentices' },
  { id: 'looking-after-tools', label: 'Looking After Your Tools' },
  { id: 'elecmate-for-apprentices', label: 'Elec-Mate for Apprentices' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Start with essential hand tools and build your kit gradually. You do not need everything on day one. Your employer should provide specialist tools and test equipment for the job.',
  'VDE insulated tools (rated to 1000V AC) are essential for any work on or near live parts. GS38 probes and leads are mandatory for safe testing. Never use uninsulated tools near electrical installations.',
  'A multifunction tester (MFT) is the most important piece of test equipment you will use. Learn to use it properly during your apprenticeship and you will use it every day as a qualified electrician.',
  'Budget around £300 to £500 for a starter tool kit. Buy quality where it matters (side cutters, strippers, VDE screwdrivers) and save on items where the difference is minimal.',
  'Elec-Mate helps you learn how to use your tools correctly with 46+ structured courses covering installation, inspection, and testing. The AI tutor can answer questions about test equipment and procedures.',
];

const faqs = [
  {
    question: 'What tools do I need on my first day as an electrical apprentice?',
    answer:
      'On your first day, you probably need very little. Most employers will tell you what to bring, and many provide a basic tool kit or allow you to use company tools during the first few weeks. At a minimum, you should have a pair of safety boots (steel-toe or composite-toe, ankle height), a hard hat if you are going to a construction site, a hi-vis vest, and basic PPE. For hand tools, a good pair of side cutters, a flat-blade screwdriver, a Phillips screwdriver, a small adjustable spanner, and a tape measure will get you through the first week. Do not rush out and buy hundreds of pounds of tools before you know what your employer expects. Ask your employer and your training provider for a recommended tool list. Some employers provide an allowance or reimburse tool purchases.',
  },
  {
    question: 'Should I buy cheap tools or expensive branded ones?',
    answer:
      'The answer is somewhere in the middle. For tools you use every day — side cutters, wire strippers, VDE screwdrivers, and your multifunction tester — buy the best quality you can afford. Brands like Knipex, Wera, Wiha, CK, and Fluke are industry standard for a reason: they last longer, perform better, and feel more comfortable in your hand over a full day of use. Cheap side cutters that do not cut cleanly or screwdrivers that strip screw heads waste your time and money in the long run. For items you use occasionally — such as a spirit level, tape measure, or general-purpose screwdrivers — mid-range brands are perfectly adequate. There is no need to spend £40 on a tape measure when a £10 one does the same job. The key is to invest in quality for the tools that directly affect the quality of your work and your safety.',
  },
  {
    question: 'Do I need my own multifunction tester as an apprentice?',
    answer:
      'Usually not during the apprenticeship itself. Your employer should provide calibrated test equipment for use on site, and your college or training provider will have test equipment for workshop and practical sessions. However, having access to a multifunction tester for practice is extremely valuable, especially when preparing for your C&G 2391 inspection and testing qualification, the AM2, and the EPA. Some apprentices buy a second-hand MFT for practice purposes, which is a sensible investment. When you qualify and start working independently, you will need your own calibrated MFT. Budget £800 to £1,500 for a new multifunction tester from Megger, Fluke, or Metrel. Keep the calibration certificate current — test equipment must be calibrated annually.',
  },
  {
    question: 'What are GS38 probes and why do I need them?',
    answer:
      'GS38 refers to the HSE Guidance Note GS38, which sets out requirements for safe test leads, probes, and lamps used by electricians. GS38-compliant probes have shrouded tips that limit the exposed conductive area to 4mm or less, reducing the risk of accidental short circuits during testing. They also have fused leads, finger guards, and are designed to prevent inadvertent contact with live conductors. Using GS38-compliant probes and leads is mandatory for any testing work on electrical installations. Non-compliant probes (such as sharp-pointed multimeter probes or bare crocodile clips) must never be used for testing on or near live electrical installations. Your employer should provide GS38-compliant leads as standard, and your college will teach you about GS38 requirements as part of the inspection and testing modules.',
  },
  {
    question: 'Should I use a tool bag or a tool box?',
    answer:
      'Both have advantages, and many electricians end up with both. A tool bag (typically a heavy-duty electrician tool bag or backpack with multiple compartments) is better for carrying essential tools around a job site, going up and down ladders, and working in domestic properties where you move between rooms. Popular options include the Veto Pro Pac, Klein, and CK Magma ranges. A tool box (either a traditional box or a wheeled case) is better for storing and transporting a larger tool kit, particularly for van to site transfers. Many electricians use a tool box in the van and transfer their most-used tools into a smaller bag for working in the property. As an apprentice, start with a good-quality tool bag. A 20 to 30 pocket electrician bag with padded shoulder straps is ideal. You can add a tool box later as your collection grows.',
  },
  {
    question: 'What PPE does an electrical apprentice need?',
    answer:
      'Your employer is legally required to provide PPE under the Personal Protective Equipment at Work Regulations 1992 (as amended 2022). However, many apprentices buy their own safety boots and gloves for comfort and fit. Essential PPE for electrical work includes: safety boots with ankle support (steel-toe or composite-toe); safety glasses or goggles for drilling, chasing, and cable pulling; work gloves for general handling (leather or synthetic palm); insulating gloves for live working (if you are trained and authorised, which is unlikely as an apprentice); ear protection for noisy environments; a hard hat if working on construction sites; and a hi-vis vest if required on site. Your employer should provide site-specific PPE based on the risk assessment. Never start work without the correct PPE, and report any damaged or missing PPE immediately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete overview of the electrical apprenticeship from start to finish.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step guide to safe isolation using your voltage indicator and lock-off devices.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-procedures-apprentices',
    title: 'Testing Procedures for Apprentices',
    description:
      'Beginner-friendly guide to continuity, insulation resistance, polarity, and RCD testing.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/on-the-job-training-guide',
    title: 'On-the-Job Training Guide',
    description: 'Making every day on site count for your apprenticeship development.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Practical advice for the AM2, including what tools to bring.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Portfolio Building Guide',
    description: 'Document your tool skills as portfolio evidence for the EPA.',
    icon: FolderOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-tools-matter',
    heading: 'Why Your Tools Matter as an Apprentice',
    content: (
      <>
        <p>
          Your tools are an extension of your hands. A good electrician with good tools works
          faster, produces better results, and works more safely than the same electrician with poor
          tools. As an apprentice, learning to select, use, and maintain the right tools is a
          fundamental part of becoming a competent professional.
        </p>
        <p>
          The electrical trade requires a specific set of tools that differ from general
          construction or plumbing. You need tools designed for cable work (cutting, stripping,
          terminating), containment installation (drilling, fixing, bending), and testing (measuring
          resistance, impedance, and RCD operation). Many of these tools must meet safety standards,
          particularly VDE insulated tools and GS38-compliant test leads.
        </p>
        <p>
          This guide covers what you need as an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            electrical apprentice
          </SEOInternalLink>
          , when to buy it, what to spend, and how to look after it. You do not need to buy
          everything at once. Build your tool kit gradually, invest in quality where it matters, and
          learn to use each tool properly before adding the next.
        </p>
      </>
    ),
  },
  {
    id: 'basic-hand-tools',
    heading: 'Basic Hand Tools Every Apprentice Needs',
    content: (
      <>
        <p>
          These are the hand tools you will use every day as an electrical apprentice. Start with
          these and add specialist tools as your work requires them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Side cutters (diagonal cutting pliers)</strong> — your most-used tool. Cut
                cable, trim cores, and strip sheathing. Buy the best pair you can afford. Knipex 70
                06 160 or CK T3621 160 are industry favourites. Around £20 to £35.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire strippers</strong> — automatic strippers (like Knipex 12 62 180 or
                Jokari Super 4 Plus) save time and reduce core damage. Manual strippers work but are
                slower. Around £15 to £40.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Screwdrivers</strong> — flat-blade and Phillips in multiple sizes. You need
                at least a small flat-blade (for terminal screws), a medium flat-blade, a PZ1, and a
                PZ2 Pozi-drive. A terminal screwdriver (small flat-blade, 3mm tip) is essential for
                working in consumer units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long-nose pliers</strong> — for bending cable cores, holding small
                components, and working in tight spaces. Knipex 26 12 200 or similar. Around £15 to
                £25.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tape measure</strong> — 5m minimum, preferably 8m. Stanley FatMax or
                similar. Used constantly for containment runs, cable lengths, and mounting heights.
                Around £8 to £15.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable knife</strong> — for stripping cable sheathing safely without nicking
                conductors. CK or Knipex cable knives are designed specifically for this purpose.
                Around £10 to £20.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spirit level</strong> — small torpedo level for mounting accessories and a
                600mm level for containment. Around £5 to £15.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Torch / headlamp</strong> — you will frequently work in poorly lit spaces. A
                good headlamp keeps your hands free. LED Lenser or similar. Around £15 to £30.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vde-insulated-tools',
    heading: 'VDE Insulated Tools: Essential for Safety',
    content: (
      <>
        <p>
          VDE insulated tools are rated to withstand 1000V AC and are essential for any work on or
          near electrical installations. The VDE mark (issued by the German testing body VDE
          Prufstelle) confirms that the tool meets the IEC 60900 standard for insulated hand tools.
        </p>
        <p>As an apprentice, you need VDE insulated versions of the tools you use most:</p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VDE screwdriver set</strong> — flat-blade and Pozi-drive in the sizes you
                use most. Wera Kraftform, Wiha SoftFinish, or CK dextro VDE sets are excellent. A
                basic set of 5 to 7 screwdrivers costs around £30 to £50.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VDE side cutters</strong> — identical to standard side cutters but with VDE
                insulated handles. Knipex 70 06 160 VDE or similar. Around £25 to £40.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VDE long-nose pliers</strong> — insulated version of your standard long-nose
                pliers. Around £20 to £35.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VDE cable knife</strong> — insulated handle with a safety blade for
                stripping cable sheathing near live installations. Around £15 to £25.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Never use uninsulated tools on or near live parts. Even when the circuit is isolated, VDE
          tools provide an additional layer of protection in case of an error. As you progress
          through the apprenticeship and take on more responsibility, VDE tools become
          non-negotiable.
        </p>
        <p>
          Check your VDE tools regularly for damage. If the insulation is cracked, chipped, or worn
          through, replace the tool immediately. Damaged insulation defeats the purpose of VDE
          protection. Store VDE tools separately from general tools to prevent damage.
        </p>
      </>
    ),
  },
  {
    id: 'test-equipment',
    heading: 'Test Equipment for Apprentices',
    content: (
      <>
        <p>
          Test equipment is how you verify that an installation is safe and compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
          Understanding what each instrument does and how to use it is a core part of your
          apprenticeship.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction tester (MFT)</strong> — the most important piece of test
                equipment. Performs continuity, insulation resistance, loop impedance, RCD, and
                earth electrode testing. Brands: Megger MFT1741, Fluke 1664FC, Metrel MI 3152. Your
                employer provides this; learn to use it inside out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage indicator (proving unit)</strong> — used for{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>
                . A two-pole voltage indicator (not a non-contact voltage detector) tested with a
                proving unit before and after use. GS38-compliant leads are essential. Fluke T150,
                Megger TPT420, or Kewtech KT1780.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>GS38-compliant test leads and probes</strong> — mandatory for all testing
                work. Shrouded probe tips (4mm max exposed), fused leads, finger guards. Supplied
                with your MFT or purchased separately from Megger, Fluke, or Kewtech.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-contact voltage detector (NCVD)</strong> — useful for quick checks but
                must never be relied upon for safe isolation. Used for initial detection only. Fluke
                2AC, Megger VF1. Around £15 to £30.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket tester</strong> — a simple plug-in device that checks socket wiring
                (correct polarity, earth present, RCD trip). Not a substitute for proper testing but
                useful for quick visual checks. Around £10 to £25.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Your employer should provide all test equipment for use on site, and your training
          provider will have equipment for college sessions. Focus on learning to use each
          instrument correctly rather than buying your own at this stage.
        </p>
      </>
    ),
  },
  {
    id: 'tool-bag-vs-box',
    heading: 'Tool Bag vs Tool Box: Which Is Right for You?',
    content: (
      <>
        <p>
          The tool bag vs tool box debate is a rite of passage for every apprentice. In practice,
          most experienced electricians use both, but as an apprentice, your starting point depends
          on the type of work you do.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tool Bag</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Best for: domestic work, moving between rooms, carrying up ladders, site work where
              you are mobile.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Easy to carry with one hand or over a shoulder</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Multiple pockets keep tools organised and accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Fits in tight spaces (under consumer units, in loft hatches)</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>Popular options: Veto Pro Pac, CK Magma, Klein</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tool Box</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Best for: storing a full tool kit, van to site transfer, workshop use, keeping tools
              protected.
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Holds a larger collection of tools safely</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Better protection for expensive tools and test equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Can be locked for security in the van</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Popular options: DeWalt TSTAK, Stanley FatMax, Systainer</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          As an apprentice, start with a good tool bag. Budget £40 to £100 for a quality electrician
          bag with enough pockets to organise your growing tool collection. Add a tool box later
          when you have more tools to store and a van to put them in.
        </p>
      </>
    ),
  },
  {
    id: 'budget-guide',
    heading: 'Budget Guide: Building Your Kit on Apprentice Wages',
    content: (
      <>
        <p>
          Apprentice wages are tight, and a full electrician tool kit can cost well over £1,000 if
          you buy everything new. The good news is that you do not need everything at once. Here is
          a phased approach to building your tool kit within budget.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 1 starter kit (£150 to £250)</strong> — side cutters, wire strippers,
                screwdriver set (flat and Pozi), long-nose pliers, tape measure, cable knife, torch,
                tool bag. Focus on the essentials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 2 VDE upgrade (£100 to £200)</strong> — VDE screwdriver set, VDE side
                cutters, VDE long-nose pliers. Replace your standard tools with insulated versions
                as you start working on electrical installations more independently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Year 3 specialist additions (£50 to £150)</strong> — SDS drill bits, hole
                saws, crimping tool, conduit bender (if your work requires one), additional
                screwdrivers and spanners for specific tasks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification completion (£800 to £1,500)</strong> — your own multifunction
                tester once you qualify and need your own calibrated instrument. This is the big
                investment, but by this point you should be earning a qualified rate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Tips for saving money: buy second-hand tools from reputable sources (check for damage and
          wear); look for tool set bundles rather than buying individually; ask for tools as
          birthday or Christmas gifts; check whether your employer offers a tool allowance or
          reimburses purchases; and watch for trade sales at suppliers like CEF, Edmundson, and
          Screwfix.
        </p>
        <SEOAppBridge
          title="Learn to use your tools properly"
          description="Elec-Mate's 46+ courses include hands-on installation and testing modules that teach you the correct techniques for every tool in your kit. From cable stripping to multifunction tester operation, learn the right way from the start."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'looking-after-tools',
    heading: 'Looking After Your Tools',
    content: (
      <>
        <p>
          Good tools last for years if you look after them. Poor maintenance shortens tool life,
          reduces performance, and can compromise safety, particularly for VDE insulated tools.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean tools after each use</strong> — wipe down blades and handles. Remove
                plaster dust, cement residue, and cable sheathing debris. A dirty tool is harder to
                use and wears faster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect VDE insulation regularly</strong> — check for cracks, chips, cuts,
                or wear in the insulation. Damaged VDE insulation means the tool is no longer safe
                for use near live parts. Replace immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep cutting edges sharp</strong> — side cutters and cable knives work best
                when sharp. Dull blades require more force, increase the risk of slipping, and
                produce rough cuts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Store tools properly</strong> — return tools to their designated pocket in
                your tool bag. Do not throw them loose into a box or boot. Proper storage prevents
                damage, loss, and wasted time searching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep test equipment calibrated</strong> — multifunction testers must be
                calibrated annually. Keep the calibration certificate with the instrument. Using
                uncalibrated test equipment invalidates your test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-for-apprentices',
    heading: 'How Elec-Mate Supports Your Tool Skills',
    content: (
      <>
        <p>
          Having the right tools is only half the story. Knowing how to use them correctly is what
          separates a competent apprentice from one who struggles. Elec-Mate's apprentice hub
          provides structured learning that covers every tool and technique in the apprenticeship
          standard.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">46+ Structured Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Courses covering installation techniques, containment systems, cable selection,
                  and termination methods. Learn the theory and practice behind every tool you
                  carry.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Testing and Inspection Modules</h4>
                <p className="text-white text-sm leading-relaxed">
                  Detailed modules on using your MFT for{' '}
                  <SEOInternalLink href="/guides/testing-procedures-apprentices">
                    continuity, insulation resistance, loop impedance, and RCD testing
                  </SEOInternalLink>
                  . Understand what each test measures, how to connect the instrument, and how to
                  interpret the results.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AM2 and EPA Simulators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Practice the practical assessment tasks you will face in the{' '}
                  <SEOInternalLink href="/guides/am2-exam-tips">AM2</SEOInternalLink> and EPA,
                  including tool selection, installation techniques, and testing procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Master your tools with Elec-Mate"
          description="46+ courses covering every tool and technique in the apprenticeship standard. Flashcards, mock exams, EPA simulator, AM2 simulator, and AI tutor. Build competence and confidence. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeToolboxGuidePage() {
  return (
    <GuideTemplate
      title="Apprentice Toolbox Guide | Essential Tools List UK"
      description="Complete guide to essential tools for UK electrical apprentices. Hand tools, VDE insulated tools, test equipment, tool bag vs tool box, budget guide, and tool maintenance. Build your kit without breaking the bank."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Apprentice Toolbox Guide:{' '}
          <span className="text-yellow-400">Essential Tools for Every Stage</span>
        </>
      }
      heroSubtitle="Your tool kit is one of the biggest investments you make as an electrical apprentice. This guide covers every essential hand tool, VDE insulated tool, and piece of test equipment, plus budget advice for building your kit on apprentice wages."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Apprentice Tools"
      relatedPages={relatedPages}
      ctaHeading="Learn to Use Every Tool Like a Pro"
      ctaSubheading="Elec-Mate's apprentice hub covers every tool and technique in the apprenticeship standard. 46+ courses, flashcards, mock exams, EPA simulator, and AI tutor. Study on your phone, at your pace. 7-day free trial."
    />
  );
}
