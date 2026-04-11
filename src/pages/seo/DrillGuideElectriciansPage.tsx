import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  FileCheck2,
  GraduationCap,
  Gauge,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Drill Guide for Electricians', href: '/guides/drill-guide-electricians-sds-cordless' },
];

const tocItems = [
  { id: 'overview', label: 'Choosing the Right Drill for Electrical Work' },
  { id: 'sds-types', label: 'SDS Plus vs SDS Max vs Standard Hammer' },
  { id: 'cordless-voltage', label: 'Cordless Voltage Ratings: 18V vs 54V Brushless' },
  { id: 'hole-saws', label: 'Hole Saws for Back Boxes and Core Drills' },
  { id: 'containment', label: 'Core Drilling for Cable Containment' },
  { id: 'best-drills', label: 'Best Drills for Electricians 2026' },
  { id: 'for-electricians', label: 'Drilling Safety and Site Practice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electricians need three drilling tool types: a compact cordless combi drill for general work, an SDS Plus hammer drill for masonry and concrete, and a hole saw kit for back boxes and cable entry points.',
  'SDS Plus is the correct chuck system for domestic and light commercial electrical drilling. SDS Max is for heavy-duty core drilling and demolition. Standard keyless chuck combi drills suit timber, plasterboard, and light masonry.',
  '18V cordless platforms provide all the power needed for typical domestic electrical work. 54V (XR FLEXVOLT or equivalent) platforms suit heavy-duty SDS drilling, continuous core drilling, and high-current SDS Max work.',
  'For back box installation, a 25mm (1-gang) or 35mm (2-gang) holesaw in plasterboard, combined with a chisel for the brick plaster key, is the standard approach. Bi-metal or carbide hole saw sets are the most versatile.',
  'The Makita DHR171, DeWalt DCH273, and Milwaukee M18FHX are the leading cordless SDS Plus drills for UK electricians in 2026. All three use 18V platforms with extensive compatible tool ecosystems.',
];

const faqs = [
  {
    question: 'What is the difference between SDS Plus and SDS Max?',
    answer:
      'SDS (Slotted Drive System) is a chuck system that allows hammer drill bits to slide in and out within the chuck, enabling the hammering action without transmitting rotational shock to the chuck mechanism. SDS Plus is the smaller format — bits have a 10mm shank diameter with two open grooves and two closed grooves for retention. SDS Plus is the standard for domestic and commercial electrical drilling: cables passes through masonry and brick, back box recesses, and light core drilling up to approximately 100mm diameter. SDS Max is the larger, heavier format — bits have an 18mm shank diameter with three open grooves and two closed grooves. SDS Max delivers significantly higher impact energy and is used for heavy-duty core drilling through thick reinforced concrete (150mm+), large-diameter anchoring, and breaking work with a demolition chisel attachment. An electrician working on domestic and light commercial projects will find SDS Plus covers the vast majority of jobs. SDS Max is only needed for specialist core drilling into reinforced concrete structures.',
  },
  {
    question: 'Is 18V enough for SDS drilling through brick and block?',
    answer:
      'Yes, for the vast majority of domestic and commercial electrical work. A modern 18V brushless SDS Plus drill (such as the Makita DHR171, DeWalt DCH273, or Milwaukee M18FHX) has sufficient impact energy to drill through dense brick, lightweight block, medium-density concrete block, and un-reinforced concrete for cable passes, back box chases, and containment penetrations. The key variable is battery capacity — a 5Ah or 6Ah battery provides sustained power for extended drilling runs without voltage sag. Where drilling becomes slow on dense concrete or involves core bits above 82mm diameter through thick sections, a 54V (XR FLEXVOLT, Multi-Volt) tool will maintain drilling speed better and reduce battery drain per hole. For specialist work involving reinforced concrete slabs, structural walls, or large-diameter through-wall cores, hire a professional core drilling rig rather than overloading a standard cordless SDS Plus.',
  },
  {
    question: 'What hole saw do I need for surface back boxes?',
    answer:
      'For flush-mounted back boxes in plasterboard, a 68mm hole saw cuts the aperture for a standard single or double gang surface back box in plasterboard — but practice varies by manufacturer. Check the back box dimensions first: most 1-gang flush boxes require a 60–68mm cut; 2-gang flush boxes require a different aperture or two overlapping cuts. For plasterboard and MDF, a standard bi-metal hole saw works well. For brick or dense plaster, use a carbide-tipped or diamond hole saw. The most versatile general-purpose hole saw sets for electricians cover 16mm to 82mm (for cable conduit entries, armoured cable glands, and back box apertures). Arbor sets with quick-release bits speed up changing between sizes on site.',
  },
  {
    question: 'What drill do I need for SWA cable entry through masonry walls?',
    answer:
      'For steel wire armoured (SWA) cable entry through a masonry external wall, the required hole diameter depends on the cable diameter plus the fitting (weatherproof gland or conduit entry bushing). Typical 2.5mm² 3-core SWA requires a 25–32mm hole. A 6mm² or 10mm² 3-core SWA cable entry requires 40–50mm minimum. For holes up to 50mm, an SDS Plus drill with a core drill bit and depth stop is appropriate. For holes above 50mm through solid brick or block, a dedicated core drill (diamond or TCT bit on a rotary-only core drilling machine, or a high-powered SDS Plus rotary core bit) produces a cleaner, straight hole with less effort. Always use a cable detector before drilling through external walls to check for hidden services.',
  },
  {
    question: 'How do I drill cleanly through ceramic tiles for electrical work?',
    answer:
      'Ceramic and porcelain tiles require a diamond or carbide spear-point tile drill bit — never use a standard twist drill or masonry bit, which will crack the tile glaze. For small holes (up to 12mm) for switch or socket fixings, a diamond-tipped pilot hole bit followed by a carbide spear-point bit at low speed (no hammer) with water cooling produces a clean hole. For larger holes for conduit or flush boxes in tiled areas, use a diamond core drill bit with a guide template to prevent the bit wandering on the smooth tile surface. Speed — use slow rotary speed with no hammer action on the drill. Pressure — moderate, constant pressure; excessive force shatters tiles. Water cooling — essential for diamond bits to prevent overheating and bit failure.',
  },
  {
    question: 'Do I need a separate combi drill and SDS drill, or can one do both?',
    answer:
      'In theory, some SDS Plus drills have a chuck adapter that accepts standard round-shank bits, and some combi drills have a hammer function. In practice, the hybrid approach has limitations. SDS drills with chuck adapters are heavier and bulkier than a dedicated combi drill — not ideal for driving screws or drilling timber all day. Combi drills with hammer function have much lower impact energy than a dedicated SDS drill — adequate for occasional light masonry work but not for sustained drilling through brick or concrete. For professional electrical work, two tools is the correct answer: a compact cordless combi drill (18V, around 1.5kg) for general screwdriving, timber, and plasterboard, plus a dedicated SDS Plus hammer drill for masonry and concrete. The combined cost of two quality 18V tools on the same battery platform is justified by the difference in comfort and productivity over a full working day.',
  },
  {
    question: 'What is a brushless motor and why does it matter?',
    answer:
      'A brushless DC motor eliminates the carbon brushes used in traditional commutated motors. Brushes create friction and wear — they need periodic replacement and generate heat. Brushless motors use permanent magnets and electronic commutation, eliminating brush friction and making the motor significantly more efficient (less heat, less energy wasted). For cordless power tools, brushless motors deliver more power per amp-hour of battery, run cooler in sustained use, and last longer. The practical benefits for electricians are longer battery runtime per charge, sustained torque and speed in heavy drilling without overheating, and longer tool service life before motor wear requires attention. Modern 18V brushless SDS Plus drills deliver performance that matches older 24V brushed tools. All the recommended drills in this guide (Makita DHR171, DeWalt DCH273, Milwaukee M18FHX) use brushless motors.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/cable-detector-buying-guide',
    title: 'Cable Detector Buying Guide',
    description: 'CAT & Genny systems for locating buried services before drilling.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/multimeter-guide-electricians',
    title: 'Multimeter Guide for Electricians',
    description: 'CAT ratings, True RMS, and the best digital multimeters for professional use.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Correct isolation procedure before drilling near electrical services.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates on site from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for the circuits you are wiring on site.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/apprentice-hub',
    title: 'Apprentice Training Hub',
    description: 'Practical tool use, installation techniques, and theory modules.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Choosing the Right Drill for Electrical Installation Work',
    content: (
      <>
        <p>
          Drilling is one of the highest-frequency physical tasks in electrical installation. Back
          boxes, cable routes through joists, masonry, concrete, containment penetrations, and SWA
          cable entries through external walls — each requires a different combination of bit type,
          chuck system, and tool power.
        </p>
        <p>
          Using the wrong drill or bit for the material slows the job, damages materials (cracked
          tiles, torn plasterboard), and shortens tool life. Understanding the strengths and limits
          of each drill type allows you to build a kit that covers all common electrical
          installation scenarios efficiently.
        </p>
        <p>
          This guide covers the three chuck systems used in electrical work (standard keyless, SDS
          Plus, SDS Max), the difference between 18V and 54V cordless platforms, hole saws for back
          boxes and cable entries, core drilling for containment penetrations, and the best drills
          available for UK electricians in 2026.
        </p>
      </>
    ),
  },
  {
    id: 'sds-types',
    heading: 'SDS Plus vs SDS Max vs Standard Hammer Drill',
    content: (
      <>
        <p>
          The chuck system determines the types of bits the drill accepts and the level of impact
          energy it can deliver:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-5">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-yellow-400" />
              Standard Keyless Chuck (Combi Drill)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Accepts standard round-shank and hex-shank bits: wood, metal, and light masonry twist
              drills, screwdriver bits, and small hole saws. The keyless chuck grips the bit
              concentrically. Best for timber frame work, plasterboard, light masonry, and
              screwdriving. The hammer function on a combi drill provides limited percussive action
              — adequate for occasional light brick drilling but not sustained masonry work. Weight:
              typically 1.3–1.8kg. The everyday tool for most electrical first-fix and second-fix
              work.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400" />
              SDS Plus
            </h3>
            <p className="text-white text-sm leading-relaxed">
              10mm shank with two open slots and two closed retention grooves. The bit slides
              axially in the chuck, allowing the hammer mechanism to drive the bit directly without
              transmitting shock to the chuck bearing — enabling sustained high-frequency hammering
              without premature bearing wear. SDS Plus drills deliver 1.5–3.5J of impact energy per
              blow at up to 4,500 blows per minute. Suitable for: dense brick and block, light
              concrete, back box chases, cable route drilling through masonry, and core bits up to
              100mm through un-reinforced masonry. The correct choice for most electrical
              installation masonry drilling.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-red-400" />
              SDS Max
            </h3>
            <p className="text-white text-sm leading-relaxed">
              18mm shank with three open slots and two closed retention grooves. Delivers 5–20J of
              impact energy per blow. Used for demolition chiselling, large-diameter core drilling
              through reinforced concrete, and anchor boring in structural concrete. Not a tool most
              domestic electricians carry — typically hired for specific heavy-duty tasks. Core
              drilling rigs (rotary-only, no hammer, with water cooling) are the preferred approach
              for large- diameter structural core drilling in most electrical installation
              scenarios.
            </p>
          </div>
        </div>
        <p>
          The practical kit for a domestic or commercial electrician is a standard combi drill plus
          an SDS Plus hammer drill, both on the same 18V battery platform. This covers all common
          drilling tasks without the weight and cost of SDS Max equipment.
        </p>
      </>
    ),
  },
  {
    id: 'cordless-voltage',
    heading: 'Cordless Voltage Ratings: 18V vs 54V Brushless',
    content: (
      <>
        <p>
          Cordless power tool platforms have converged on 18V as the standard for most professional
          hand-held tools, with 54V (XR FLEXVOLT by DeWalt, Multi-Volt by Hikoki/Hitachi, and 18V×2
          parallel systems by Makita and others) available for high-power applications:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">18V Brushless</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Sufficient for all domestic electrical work, the majority of commercial first-fix and
              second-fix, and light to medium masonry drilling. Modern 18V brushless SDS Plus drills
              (1.5–3.0J impact energy) handle standard brick, dense block, and un-reinforced
              concrete without difficulty.
            </p>
            <ul className="space-y-1 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">+</span>
                <span>Lighter tool weight</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">+</span>
                <span>Larger ecosystem of compatible tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">+</span>
                <span>Lower battery and charger cost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">–</span>
                <span>May slow on sustained dense concrete drilling</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">54V / High-Power</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Maintains drilling speed and torque under sustained heavy load. Advantages emerge in:
              continuous large-diameter core drilling (68mm+ through dense masonry), sustained SDS
              drilling in reinforced concrete, and high-demand environments (commercial, industrial
              sites with long daily drill runs).
            </p>
            <ul className="space-y-1 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">+</span>
                <span>Higher sustained power output</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">+</span>
                <span>Less battery sag on heavy sustained loads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">–</span>
                <span>Heavier tool and battery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">–</span>
                <span>Higher initial cost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">–</span>
                <span>Smaller compatible tool range</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          For most electricians, an 18V brushless SDS Plus drill with a 5Ah battery is the optimal
          balance. The 54V platform makes sense if you regularly do heavy structural drilling or
          large-diameter core work as a core part of your business.
        </p>
      </>
    ),
  },
  {
    id: 'hole-saws',
    heading: 'Hole Saw Sets for Back Boxes and Cable Entries',
    content: (
      <>
        <p>
          Hole saw sets are indispensable for electrical installation. The key applications and
          recommended sizes are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back box apertures in plasterboard:</strong> 68mm for single gang, variable
                for double gang (check back box manufacturer dimensions). Bi-metal hole saws cut
                plasterboard, MDF, and timber cleanly. Use a guide template for accurate
                positioning. A sharp pilot drill centres the hole saw correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit entries (20mm and 25mm):</strong> Standard electrical conduit
                diameters. 25mm hole saw cuts through timber, plasterboard, and light sheet metal
                for conduit pass-throughs. A step drill (Unibit) also cuts clean conduit entry holes
                in thin sheet materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable gland entries through metal enclosures:</strong> 20mm, 25mm, 32mm, and
                40mm for standard metric cable glands. Bi-metal or carbide hole saws cut steel
                enclosure knockouts cleanly. Always de-burr the cut edge before fitting the gland.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA external wall entries:</strong> 32mm to 68mm depending on cable size.
                Diamond or carbide TCT core drill bits for masonry wall penetrations at these
                diameters — standard bi-metal hole saws are not suitable for sustained masonry
                drilling.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A comprehensive electrician's hole saw set covering 16mm–83mm in bi-metal with
          quick-change arbors costs approximately £40–£80 and covers the majority of installation
          scenarios. Keep masonry core bits separate from wood/metal bi-metal sets — contaminating
          bi-metal bits with masonry dust significantly reduces their life.
        </p>
      </>
    ),
  },
  {
    id: 'containment',
    heading: 'Core Drilling for Cable Containment',
    content: (
      <>
        <p>
          Core drilling for cable containment — running conduit, trunking, or armoured cable through
          walls, floors, and ceilings — requires larger diameter holes (50–150mm) than standard hole
          saws can practically produce through masonry. The approach depends on the material:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brick and block walls (un-reinforced):</strong> Tungsten carbide tipped
                (TCT) core bits in an SDS Plus drill handle brick and block from 50mm to 100mm.
                Slower than diamond but no water cooling required. Suitable for the majority of
                domestic external wall cable entries and internal wall containment penetrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concrete and reinforced floors:</strong> Diamond core bits with water
                cooling on a rotary-only core drilling machine (no hammer). The diamond segments cut
                smoothly through aggregate and rebar without the percussion that would shatter the
                concrete around the hole. For one-off penetrations, hire a core drilling rig with a
                vacuum anchor and water supply rather than attempting to hand-hold a large core bit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timber floors and joists:</strong> Standard bi-metal hole saws on a combi
                drill. Note structural rules — notches and holes in joists must comply with Approved
                Document A and the Building Regulations. Consult the engineer or building control
                for structural members. Fire stopping of any penetration through a compartment floor
                or fire-resistant wall is required under Building Regulations.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Always detect before drilling</h4>
              <p className="text-white text-sm leading-relaxed">
                Use a cable detector before any drilling through walls, floors, or ceilings —
                including internal partitions. Hidden cables and pipes behind plasterboard are a
                common cause of electrical accidents during building alteration work.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'best-drills',
    heading: 'Best Drills for Electricians 2026',
    content: (
      <>
        <p>
          These are the leading recommendations across the three tool categories for UK electricians
          in 2026:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Makita DHR171 (18V SDS Plus)</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best SDS Plus for Electricians — ~£160 (body only)
            </p>
            <p className="text-white text-sm leading-relaxed">
              18V LXT brushless SDS Plus. 1.5J impact energy. XPT (Extreme Protection Technology)
              sealing for dust and rain resistance. Anti-vibration AVT mechanism reduces operator
              fatigue during sustained drilling. Compact and lightweight (1.9kg without battery) —
              important for overhead work and confined spaces typical in electrical installation.
              Makita LXT is the largest 18V platform with the widest range of compatible tools.
              Excellent build quality and extensive UK service network.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">DeWalt DCH273 (18V SDS Plus)</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best for Heavy Masonry Work — ~£150 (body only)
            </p>
            <p className="text-white text-sm leading-relaxed">
              18V XR brushless SDS Plus. 2.1J impact energy — higher than the DHR171, giving faster
              drilling through dense brick and concrete. SHOCKS Active Vibration Control reduces
              vibration at the handle. 3 modes: hammer drill, drill only, chisel. DeWalt XR 18V is
              the most widely adopted platform in UK professional construction. Compatible with XR
              FLEXVOLT 54V batteries for increased performance on heavy sustained drilling.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-1">Milwaukee M18FHX (18V SDS Plus)</h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              Best Build Quality — ~£180 (body only)
            </p>
            <p className="text-white text-sm leading-relaxed">
              18V M18 FUEL brushless SDS Plus. Powerstate brushless motor, REDLINK PLUS intelligence
              (electronic overload protection). Extremely robust construction — Milwaukee is known
              for tool durability in harsh site conditions. 2.0J impact energy. The M18 FUEL
              platform includes arguably the best-in-class combi drill (M18FPD2) and impact driver
              (M18FID2) making it an excellent single-platform choice for an electrician wanting
              consistent quality across all cordless tools.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-1">
              Cordless Combi Drill Recommendations
            </h3>
            <p className="text-white text-xs mb-3 uppercase tracking-wide">
              For Timber, Plasterboard, and Screwdriving
            </p>
            <p className="text-white text-sm leading-relaxed">
              Buy your combi drill on the same platform as your SDS drill to share batteries. Top
              choices: Makita DHP484 (LXT), DeWalt DCD796 (XR 18V), or Milwaukee M18FPD2 (M18 FUEL).
              All are compact 18V brushless combi drills — under 1.5kg, high-speed mode for driving,
              low-speed high-torque mode for drilling. Brushless motor gives significantly more
              runtime and torque than equivalent brushed models.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Quote accurately for installation labour and materials"
          description="Use Elec-Mate's AI to generate accurate quotes for first-fix and second-fix electrical work — including labour for drilling, chasing, containment installation, and wiring. Professional PDF quotes from your phone."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Drilling Safety and Site Practice',
    content: (
      <>
        <p>
          Power tools in electrical installation work carry specific risks. Applying correct safe
          working practices reduces the risk of injury to you and damage to the installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detect before drilling:</strong> Always use a cable detector before drilling
                into walls, floors, or ceilings. Use safe isolation before any work that could
                contact existing wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection for power tools:</strong> All portable power tools used on
                site must be protected by a 30mA RCD at the supply point, or fed from a 110V CTE
                (Centre-Tapped Earth) transformer. Never plug a 230V power tool directly into a site
                supply socket without RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE for drilling and chasing:</strong> Safety glasses or goggles (masonry
                chips and drill break fragments), dust mask (FFP2 minimum for concrete and silica-
                bearing materials), hearing protection for SDS drilling, and gloves. Silica dust
                from concrete and brick is a serious long-term lung hazard — respiratory protection
                is not optional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping:</strong> Any penetration of a fire compartment boundary
                (fire- rated wall, floor, or ceiling) must be sealed with appropriate intumescent
                fire stopping after cable installation. This is a Building Regulations requirement —
                not optional and not to be left to other trades.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document drilling locations and cable routes on site"
          description="Use Elec-Mate's AI to photograph and record cable route photographs, containment penetration locations, and fire stopping evidence for your EIC documentation package."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DrillGuideElectriciansPage() {
  return (
    <GuideTemplate
      title="Drill Guide for Electricians 2026 | SDS Plus, Cordless, Hole Saws UK"
      description="Complete drill guide for UK electricians. SDS Plus vs SDS Max vs standard combi drills, 18V vs 54V cordless platforms, hole saw sets for back boxes and cable entries, core drilling, and the best drills in 2026 — Makita DHR171, DeWalt DCH273, Milwaukee M18FHX."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Tools & Equipment Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Drill Guide for Electricians:{' '}
          <span className="text-yellow-400">
            SDS, Cordless, and Hole Saws for UK Electrical Work 2026
          </span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about drills — SDS Plus vs SDS Max, 18V vs 54V cordless platforms, hole saw sets for back boxes and cable entries, core drilling for containment, and the best drills for electrical installation in 2026."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Drills for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Quote, Install, and Certify Electrical Work on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional quoting, EIC and EICR certification, and AI site support. 7-day free trial, cancel anytime."
    />
  );
}
