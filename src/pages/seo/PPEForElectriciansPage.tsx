import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  Shield,
  Zap,
  Eye,
  AlertTriangle,
  FileCheck2,
  Lock,
  Brain,
  CheckCircle2,
  ShieldCheck,
  Hand,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/ppe-for-electricians' },
  { label: 'PPE Guide', href: '/guides/ppe-for-electricians' },
];

const tocItems = [
  { id: 'why-ppe-matters', label: 'Why PPE Matters' },
  { id: 'insulated-gloves', label: 'Insulated Gloves' },
  { id: 'safety-boots', label: 'Safety Boots' },
  { id: 'eye-protection', label: 'Eye Protection' },
  { id: 'arc-flash-ppe', label: 'Arc Flash PPE Categories' },
  { id: 'voltage-rated-tools', label: 'Voltage-Rated Tools' },
  { id: 'head-protection', label: 'Head Protection' },
  { id: 'ppe-inspection', label: 'PPE Inspection and Maintenance' },
  { id: 'legal-duties', label: 'Legal Duties' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'PPE is the last line of defence in the hierarchy of control — it should be used alongside safe isolation, lock off procedures, and engineered controls, not as a substitute.',
  'Insulated gloves for electrical work must comply with BS EN 60903 and be rated for the voltage being worked on. Class 00 (500V AC) is the minimum for UK mains voltage work.',
  'Arc flash PPE is categorised into 4 levels based on incident energy (cal/cm squared). Category 2 (8 cal/cm squared) is the minimum recommended for work on or near energised distribution boards.',
  'Voltage-rated tools (VDE 1000V) compliant with BS EN 60900 are required for any work on or near live conductors. Standard chrome vanadium tools are not insulated.',
  'Employers have a legal duty under the Personal Protective Equipment at Work Regulations 2022 to provide suitable PPE free of charge, maintain it, and train workers in its correct use.',
];

const faqs = [
  {
    question: 'What class of insulated gloves do I need for 230V mains work?',
    answer:
      'For work at 230V AC (the standard UK mains voltage), you need a minimum of Class 00 insulated gloves, which are rated for up to 500V AC. However, many electricians and employers opt for Class 0 gloves (rated up to 1,000V AC) for additional safety margin, particularly when working near distribution boards where prospective fault currents could cause arc flash. The gloves must comply with BS EN 60903 and should be tested before each use by inflating them to check for pinholes, tears, or other damage. Leather over-gloves should be worn over insulated gloves during heavy manual work to protect them from physical damage. Replace insulated gloves if they show any signs of deterioration, are beyond their expiry date, or have been exposed to chemicals, oils, or solvents that could degrade the rubber.',
  },
  {
    question: 'Are safety boots required for all electrical work?',
    answer:
      'Safety boots with toe protection are required for most electrical work, particularly on construction sites, commercial premises, and industrial installations where there is a risk of foot injury from dropped tools, heavy equipment, or stepping on sharp objects. The minimum standard is S1P (with steel or composite toe cap and midsole penetration protection). For electrical work, consider boots with electrical hazard (EH) rated soles that provide secondary protection against electric shock through the feet — although EH-rated soles are not a substitute for safe isolation and should not be relied upon as a primary control measure. For domestic work in occupied homes, some electricians switch to lighter safety footwear, but toe protection is still recommended when handling heavy items like consumer units.',
  },
  {
    question: 'Do I need arc flash PPE for domestic work?',
    answer:
      'The risk of arc flash in domestic installations is generally lower than in commercial or industrial settings because the available fault energy is lower. However, the risk is not zero — an arc flash can occur at any distribution board where the prospective fault current is sufficient to sustain an arc. For domestic consumer unit work, the practical minimum recommendation is a face shield or safety glasses with side protection, flame-resistant clothing (cotton is better than synthetic fabrics, which can melt), and insulated gloves. Full arc flash PPE (Category 2 rated coveralls, balaclava, and face shield) is strongly recommended when working on or near energised distribution boards, particularly three-phase boards, commercial switchgear, or any installation with high prospective fault current.',
  },
  {
    question: 'How often should insulated gloves be tested?',
    answer:
      'Insulated gloves should be visually inspected and air-tested (inflated to check for leaks) before every use. In addition, they should be electrically tested at regular intervals — the standard recommendation is every 6 months for Class 00 and Class 0 gloves, and every 6 months for all higher classes. The electrical test must be carried out by an accredited testing laboratory in accordance with BS EN 60903. Many employers keep a glove testing register showing the date of each test, the test results, and the next test due date. Between formal tests, check gloves for signs of physical damage (cuts, tears, punctures, abrasion), chemical contamination, UV degradation (store away from sunlight), and ozone cracking. Replace immediately if any damage is found. Never use expired or untested gloves for live work.',
  },
  {
    question: 'What is the difference between VDE 1000V tools and standard insulated tools?',
    answer:
      'VDE 1000V tools are specifically designed and tested for electrical work on or near live conductors up to 1,000V AC. They comply with BS EN 60900 (previously IEC 60900) and are individually tested to 10,000V before sale. The insulation is a multi-layer construction — typically a hard inner insulating layer and a softer outer layer in a contrasting colour so that damage to the outer layer immediately reveals the inner layer. The tools are marked with the VDE triangle symbol, the voltage rating (1000V), and the relevant standard. Standard insulated tools (often with dipped or sprayed plastic handles) are NOT rated for live work — they may provide some protection against incidental contact, but they have not been tested to a specific voltage and should never be relied upon for protection against electric shock. Always use genuine VDE 1000V tools when working on or near live conductors.',
  },
  {
    question: 'Who pays for PPE — the employer or the employee?',
    answer:
      'Under the Personal Protective Equipment at Work Regulations 2022 (which replaced the 1992 regulations from 6 April 2022), employers must provide suitable PPE free of charge to employees. This includes all PPE identified as necessary by the risk assessment — insulated gloves, safety boots, eye protection, arc flash PPE, hard hats, high-visibility clothing, and any other protective equipment. The employer must also maintain, repair, and replace PPE as needed, and provide training on its correct use, storage, and limitations. Self-employed electricians must provide their own PPE but can claim the cost as a business expense for tax purposes. Limb (b) workers (those who are not employees but work under a contract personally to do work) were brought within the scope of the 2022 regulations, extending PPE duties to cover agency workers and other non-employee workers.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/arc-flash-protection',
    title: 'Arc Flash Protection',
    description:
      'What causes arc flash, incident energy levels, PPE categories, boundary distances, and UK standards.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment Guide',
    description:
      'HSE 5-step risk assessment process for electricians. Electrical hazards, template structure, and legal requirements.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/gs-38-proving-dead',
    title: 'GS 38 Proving Dead',
    description:
      'HSE Guidance Note GS 38 requirements for test equipment, proving units, fused probes, and voltage indicators.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock Off / LOTO Procedure',
    description:
      'Lockout/tagout steps, lock off devices, MCB locks, distribution board isolation, and legal requirements.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation procedure for electricians. Voltage indicator, proving unit, and lock off steps.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/method-statement-electricians',
    title: 'Method Statement Guide',
    description:
      'How to write a method statement for electrical work. Template structure, common tasks, and examples.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-ppe-matters',
    heading: 'Why PPE Matters for Electricians',
    content: (
      <>
        <p>
          Personal Protective Equipment (PPE) is the last line of defence in the hierarchy of
          control. It does not eliminate or reduce the hazard itself — it protects the individual
          from the consequences of exposure to a hazard that has not been fully controlled by other
          means. For electricians, this means PPE protects you when safe isolation, lock off
          procedures, engineered barriers, and safe systems of work are either not possible or have
          failed.
        </p>
        <p>
          The hierarchy of control, as set out in the Management of Health and Safety at Work
          Regulations 1999, is: eliminate, substitute, engineer, administrate, then PPE. You should
          always work through this hierarchy before relying on PPE. For example, the primary control
          for electric shock is{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          — making the circuit dead and proving it dead. PPE (insulated gloves, face protection) is
          the backup in case something goes wrong.
        </p>
        <p>
          That said, there are situations where PPE is essential and cannot be avoided. Working near
          energised equipment (even if the specific circuit being worked on is isolated), carrying
          out live testing, responding to electrical faults, and working in environments where other
          hazards are present (construction sites, industrial premises) all require appropriate PPE.
          The{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          for each job should identify exactly which PPE is required.
        </p>
      </>
    ),
  },
  {
    id: 'insulated-gloves',
    heading: 'Insulated Gloves: Your Most Important PPE',
    content: (
      <>
        <p>
          Insulated gloves are the most critical piece of PPE for an electrician. They provide
          protection against electric shock from direct contact with live conductors and are
          essential whenever you are working on or near energised electrical equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Insulated Glove Classes (BS EN 60903)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Hand className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 00 — 500V AC</strong> — minimum for UK 230V mains voltage work.
                Thinner and more dexterous than higher classes. Suitable for domestic and light
                commercial work at single-phase voltages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hand className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 0 — 1,000V AC</strong> — recommended for most UK electrical work
                including three-phase systems (400V). Provides a greater safety margin and is the
                standard choice for distribution board work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hand className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 1 — 7,500V AC</strong> — for work on medium-voltage equipment.
                Required by high-voltage authorised persons.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hand className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 2 — 17,000V AC</strong> — for high-voltage substation work. Thicker
                and less dexterous — leather over-gloves essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Hand className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Class 3 and 4 — up to 36,000V and 36,000V+ AC</strong> — for specialist
                high-voltage work on transmission and distribution networks.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before each use, inspect gloves for cuts, tears, punctures, chemical contamination, and UV
          degradation. Inflate by rolling the cuff and trapping air inside — hold to check for
          leaks. Never use damaged gloves. Store in a cool, dark place away from sharp objects and
          chemicals. Electrical testing should be carried out every 6 months by an accredited
          laboratory.
        </p>
      </>
    ),
  },
  {
    id: 'safety-boots',
    heading: 'Safety Boots for Electricians',
    content: (
      <>
        <p>
          Safety boots protect your feet from dropped tools, heavy equipment, stepping on sharp
          objects like cable clips and screws, and in some cases, electrical hazards. The right
          boots can also reduce fatigue over a long working day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S1P rating</strong> — the minimum standard for most electrical work.
                Includes a toe cap (200 joule impact protection), antistatic sole, energy-absorbing
                heel, and midsole penetration protection. The toe cap can be steel or composite —
                composite is lighter and does not conduct electricity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S3 rating</strong> — adds water resistance, making them suitable for outdoor
                work and wet conditions. A good all-round choice for electricians working across
                domestic, commercial, and construction sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Hazard (EH) rated soles</strong> — provide secondary insulation
                against electric shock through the soles. These are tested to withstand a specified
                voltage (typically 18kV) under dry conditions. They are not a substitute for safe
                isolation but provide an additional layer of protection. Note: EH ratings are an
                ASTM (American) standard — look for boots specifically marketed for electrical
                workers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Composite vs steel toe caps</strong> — composite toe caps do not conduct
                electricity and are lighter. They are increasingly preferred by electricians over
                steel toe caps for this reason.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Replace safety boots when the sole is worn, the toe cap is exposed, or the waterproofing
          has failed. Most safety boots last 6 to 12 months with daily use on site. Invest in
          quality boots — your feet carry you through every job, and good boots reduce fatigue and
          injury risk.
        </p>
      </>
    ),
  },
  {
    id: 'eye-protection',
    heading: 'Eye Protection: Safety Glasses and Face Shields',
    content: (
      <>
        <p>
          Eye injuries are one of the most common workplace injuries for electricians. Flying debris
          from drilling, chasing, and cutting; dust and particles from working in loft spaces and
          underfloor voids; chemical splashes from cleaning agents; and the intense light and molten
          metal from arc flash events can all cause serious eye damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety glasses (BS EN 166)</strong> — the minimum eye protection for general
                electrical work. Must have side shields for protection from lateral debris. Clear
                lenses for indoor work, tinted for outdoor work. Anti-fog coating is essential in
                warm or humid environments. Choose a comfortable, snug fit that does not slip — you
                need them to stay on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety goggles</strong> — provide a sealed fit around the eyes, offering
                better protection against dust, fine particles, and liquid splashes. Required when
                using angle grinders, chop saws, or working in dusty environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc-rated face shields</strong> — required for work on or near energised
                switchgear and distribution boards where arc flash is a risk. Must be rated to the
                appropriate arc thermal performance value (ATPV) based on the{' '}
                <SEOInternalLink href="/guides/arc-flash-protection">
                  arc flash risk assessment
                </SEOInternalLink>
                . Typically rated at 8 cal/cm squared minimum (Category 2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Clean safety glasses daily and replace them when the lenses are scratched, pitted, or
          cracked. Scratched lenses reduce visibility and can cause eye strain. Keep a spare pair in
          your tool bag.
        </p>
      </>
    ),
  },
  {
    id: 'arc-flash-ppe',
    heading: 'Arc Flash PPE Categories',
    content: (
      <>
        <p>
          Arc flash PPE is categorised based on the incident energy that the garments and equipment
          can withstand, measured in calories per centimetre squared (cal/cm squared). The
          categories are defined in NFPA 70E (the primary standard, originating from the US) and are
          increasingly referenced in UK practice, particularly for commercial and industrial
          electrical work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Category 1 — 4 cal/cm squared</h4>
                <p className="text-white text-sm leading-relaxed">
                  Single-layer arc-rated shirt and trousers, safety glasses, hard hat, leather
                  gloves, and leather footwear. Suitable for low-energy tasks such as operating
                  circuit breakers, opening and closing disconnects, and voltage testing on
                  low-energy circuits where the incident energy has been calculated as below 4
                  cal/cm squared.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Category 2 — 8 cal/cm squared</h4>
                <p className="text-white text-sm leading-relaxed">
                  Arc-rated shirt and trousers (or coverall), arc-rated face shield, hard hat,
                  insulated gloves with leather protectors, and leather footwear. The minimum
                  recommended category for work on or near energised UK distribution boards.
                  Suitable for most domestic consumer unit work, commercial distribution boards, and
                  general fault-finding near live equipment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Category 3 — 25 cal/cm squared</h4>
                <p className="text-white text-sm leading-relaxed">
                  Arc-rated coverall plus arc flash suit (jacket and trousers or full coverall),
                  arc-rated balaclava, arc-rated face shield, hard hat, insulated gloves with
                  leather protectors, and leather footwear. Required for work on or near energised
                  switchgear with higher available fault energy — typically commercial and
                  industrial main switchboards.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Category 4 — 40 cal/cm squared</h4>
                <p className="text-white text-sm leading-relaxed">
                  Multi-layer arc flash suit, arc-rated balaclava, full arc-rated face shield and
                  hard hat, insulated gloves with leather protectors, and leather footwear. Reserved
                  for the highest-energy tasks — work on or near energised high-voltage switchgear,
                  transformer compartments, and utility distribution equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The correct PPE category is determined by an{' '}
          <SEOInternalLink href="/guides/arc-flash-protection">
            arc flash risk assessment
          </SEOInternalLink>{' '}
          that calculates the incident energy at the working distance for the specific equipment. Do
          not guess — the difference between Category 1 and Category 4 can be the difference between
          minor injury and fatal burns.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-rated-tools',
    heading: 'Voltage-Rated (VDE 1000V) Tools',
    content: (
      <>
        <p>
          Voltage-rated tools are specifically designed and tested for work on or near live
          electrical conductors. They are marked with the VDE triangle symbol and rated to 1,000V AC
          (1,500V DC). Every electrician should have a complete set of VDE tools and use them
          whenever working on or near energised equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 60900 compliance</strong> — all VDE 1000V tools must comply with this
                standard (the international equivalent is IEC 60900). Each tool is individually
                tested to 10,000V AC before sale to ensure the insulation integrity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-layer insulation</strong> — the insulation is not just a plastic dip.
                VDE tools have a hard inner insulating layer and a softer outer layer in a
                contrasting colour (usually red over yellow or orange over yellow). If the outer
                layer is damaged, the contrasting inner layer is immediately visible, warning you to
                stop using the tool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential VDE tool set</strong> — screwdrivers (flat and Phillips/Pozi in
                multiple sizes), side cutters, long-nose pliers, combination pliers, cable
                strippers, adjustable spanner, and cable knife. Major brands include Knipex, Wera,
                Wiha, and CK Tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection before use</strong> — check VDE tools before each use for
                damaged, cracked, or peeling insulation. If the contrasting inner layer is visible,
                the tool must be replaced immediately. Never modify, tape over, or repair VDE
                insulation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Standard chrome vanadium tools with plain plastic or rubber grips are NOT insulated and
          must never be used as a substitute for VDE tools when working on or near live conductors.
          The grip on a standard tool is for comfort, not electrical protection.
        </p>
        <SEOAppBridge
          title="Track PPE and tool inspection dates"
          description="Elec-Mate's site safety tools help you manage PPE inspection records, tool calibration dates, and training certificates. Never miss an expiry date. Stay compliant with NICEIC and NAPIT scheme requirements."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'head-protection',
    heading: 'Head Protection: Hard Hats and Bump Caps',
    content: (
      <>
        <p>
          Head protection requirements depend on the work environment. Construction sites,
          industrial premises, and commercial refurbishment projects typically require a hard hat.
          Domestic work in occupied properties may not, unless there is a specific risk of head
          injury.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial safety helmets (BS EN 397)</strong> — required on construction
                sites and any workplace where there is a risk of head injury from falling objects,
                collision with fixed structures, or contact with live electrical conductors
                overhead. Choose a helmet with an electrical insulation rating (440V AC class) for
                additional protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bump caps (BS EN 812)</strong> — lighter than hard hats and suitable for
                environments where the risk is bumping your head on low beams, pipes, or underfloor
                joists rather than falling objects. Useful for work in loft spaces and underfloor
                voids.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement schedule</strong> — hard hats should be replaced every 5 years
                from manufacture date (check the moulded date on the inside), or sooner if they have
                sustained an impact, are cracked or damaged, or have been exposed to excessive UV
                light or chemicals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ppe-inspection',
    heading: 'PPE Inspection and Maintenance',
    content: (
      <>
        <p>
          PPE only protects you if it is in good condition and correctly fitted. Regular inspection
          and maintenance are essential — and are a legal requirement under the Personal Protective
          Equipment at Work Regulations 2022.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before each use</strong> — visually inspect all PPE before putting it on.
                Check insulated gloves for tears and punctures (air test). Check safety glasses for
                scratches. Check tool insulation for damage. Check boots for sole wear and toe cap
                exposure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal inspections</strong> — carry out recorded inspections at regular
                intervals (monthly or quarterly). Use a PPE inspection checklist and record the
                findings. Keep records for at least 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Storage</strong> — store PPE in a clean, dry, cool location away from direct
                sunlight, chemicals, sharp objects, and extreme temperatures. Insulated gloves
                should be stored flat or in a glove bag — never folded or compressed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacement</strong> — replace PPE immediately if damaged, expired, or
                contaminated. Never repair insulated gloves, VDE tools, or arc flash garments —
                replace them with new, certified items.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'legal-duties',
    heading: 'Legal Duties: Who Provides and Maintains PPE?',
    content: (
      <>
        <p>
          The Personal Protective Equipment at Work Regulations 2022 (which replaced the 1992
          regulations from 6 April 2022) set out the legal duties for providing, maintaining, and
          using PPE in the workplace.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer duties</strong> — provide suitable PPE free of charge to all
                employees and limb (b) workers. Assess the suitability of PPE for the task and the
                individual. Ensure PPE is properly maintained, cleaned, and replaced when necessary.
                Provide training on correct use, storage, and limitations of each item of PPE.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employee duties</strong> — use PPE as instructed and in accordance with
                training. Report any defects, damage, or loss of PPE to the employer. Take
                reasonable care of PPE and return it to proper storage after use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed duties</strong> — provide and maintain your own PPE. The cost
                can be claimed as a business expense. You have the same duty of care to yourself and
                others affected by your work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 2022 regulations extended PPE duties to cover limb (b) workers — those who are not
          employees but work under a contract to personally perform work. This includes many agency
          workers, freelance electricians, and subcontractors. If you engage limb (b) workers, you
          must provide them with PPE on the same basis as employees.
        </p>
        <p>
          Elec-Mate training courses including{' '}
          <SEOInternalLink href="/training/manual-handling">manual handling</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/pasma">PASMA</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/ipaf">IPAF</SEOInternalLink>, and{' '}
          <SEOInternalLink href="/training/working-at-height">working at height</SEOInternalLink>{' '}
          ensure your team understands when and how to use each type of PPE correctly.
        </p>
        <SEOAppBridge
          title="AI-powered RAMS include PPE requirements"
          description="When you generate a risk assessment with Elec-Mate's AI Health and Safety agent, the PPE requirements are automatically included based on the hazards identified. Every risk assessment specifies exactly which PPE is needed, to which standard, and why."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PPEForElectriciansPage() {
  return (
    <GuideTemplate
      title="PPE for Electricians | What You Need on Site"
      description="Complete guide to PPE for electricians. Insulated gloves (BS EN 60903), safety boots, eye protection, arc flash PPE categories, voltage-rated VDE tools, head protection, and legal duties under the Personal Protective Equipment at Work Regulations 2022."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          PPE for Electricians: <span className="text-yellow-400">What You Need on Site</span>
        </>
      }
      heroSubtitle="Insulated gloves, safety boots, arc flash PPE, voltage-rated tools, eye protection, and head protection. This guide covers every piece of PPE an electrician needs, the standards they must meet, and your legal duties under the 2022 Regulations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About PPE for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Stay Safe and Compliant on Every Job"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI risk assessments, RAMS generation, site safety tools, and training courses. PPE requirements are built into every assessment. 7-day free trial, cancel anytime."
    />
  );
}
