import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  Shield,
  Zap,
  AlertTriangle,
  FileCheck2,
  Lock,
  Brain,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surfaces — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 my-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const NOTE =
  '-mx-4 rounded-none border-y border-orange-500/30 bg-orange-500/10 p-4 my-5 ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const TH = 'whitespace-nowrap py-3 pr-4 text-left text-[12px] font-semibold text-white';
const TD = 'py-3 pr-4 align-top text-[13.5px] text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/ppe-for-electricians' },
  { label: 'PPE Guide', href: '/guides/ppe-for-electricians' },
];

const tocItems = [
  { id: 'ppe-kit', label: 'The Core PPE Kit' },
  { id: 'why-ppe-matters', label: 'Why PPE Matters' },
  { id: 'insulated-gloves', label: 'Insulated Gloves' },
  { id: 'live-working', label: 'PPE for Live Working' },
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
  'The core kit: safety boots to BS EN ISO 20345, eye protection to BS EN 166, insulating gloves to BS EN 60903, insulated hand tools to BS EN 60900, and GS 38-compliant test equipment.',
  'PPE is the last line of defence. It sits below elimination, substitution and engineering controls — use it alongside safe isolation and lock off, never instead of them.',
  'Insulating gloves to BS EN 60903 are classed by maximum working voltage: Class 00 = 500 V, Class 0 = 1,000 V, Class 1 = 7,500 V, Class 2 = 17,000 V, Class 3 = 26,500 V, Class 4 = 36,000 V (AC).',
  'Arc flash PPE is rated by incident energy in cal/cm². The NFPA 70E categories are 4, 8, 25 and 40 cal/cm²; in the UK, arc-rated clothing itself is tested to the BS EN IEC 61482 series.',
  'Insulated hand tools to BS EN 60900 are rated 1,000 V AC / 1,500 V DC and routine-tested at 10,000 V. Standard chrome vanadium tools with dipped grips are not insulated.',
  'Employers must provide suitable PPE free of charge under the Personal Protective Equipment at Work Regulations 1992, as amended in 2022 — the amendment extended those duties to limb (b) workers.',
  'On solar PV, BS 7671 Regulation 712.410.101 requires DC-side equipment to be considered energised even when the AC side is disconnected from the grid or the inverter is disconnected from the DC side.',
  'The Electricity at Work Regulations 1989 (Reg 14) prohibit live working unless it is unreasonable to work dead, reasonable to work live, and suitable precautions — including PPE — are taken.',
];

const faqs = [
  {
    question: 'What class of insulated gloves do I need for 230V mains work?',
    answer:
      'For work at 230 V AC (the standard UK mains voltage), Class 00 insulating gloves to BS EN 60903 are the minimum, as they are rated for a maximum working voltage of 500 V AC. Many electricians and employers choose Class 0 gloves (1,000 V AC) instead, because the same pair then covers 400 V three-phase distribution boards. Gloves must be inspected and air-tested before every use by rolling the cuff to trap air inside and checking for pinholes, tears or other damage. Leather over-gloves should be worn over insulating gloves during heavy manual work to protect them from mechanical damage. Replace insulating gloves if they show any sign of deterioration, are beyond their stated life, or have been exposed to oils, solvents or other chemicals that degrade the rubber.',
  },
  {
    question: 'Are safety boots required for all electrical work?',
    answer:
      'Safety boots with toe protection are required for most electrical work, particularly on construction sites, commercial premises and industrial installations where there is a risk of foot injury from dropped tools, heavy equipment or standing on sharp objects. The practical minimum is S1P to BS EN ISO 20345 — a 200 joule toe cap, antistatic sole, energy-absorbing seat region and midsole penetration protection. Note that in EN ISO 20345 the letter E denotes energy absorption of the seat region, not electrical protection; EH-rated soles are a separate ASTM (American) marking. Neither is a substitute for safe isolation. For domestic work in occupied homes some electricians switch to lighter safety footwear, but toe protection is still worth having when handling heavy items such as consumer units.',
  },
  {
    question: 'Do I need arc flash PPE for domestic work?',
    answer:
      'The risk of arc flash in domestic installations is generally lower than in commercial or industrial settings because the available fault energy is lower. It is not zero — an arc can be sustained at any board where the prospective fault current is high enough. For domestic consumer unit work the practical minimum is a face shield or safety glasses with side protection, flame-resistant clothing (natural fibres rather than synthetics, which can melt), and insulating gloves. Fuller arc flash protection — arc-rated coverall, balaclava and face shield — is appropriate for work on or near energised distribution boards, particularly three-phase boards, commercial switchgear, or any installation with a high prospective fault current. The category is set by an arc flash risk assessment that calculates incident energy at the working distance, not by guesswork.',
  },
  {
    question: 'How often should insulated gloves be tested?',
    answer:
      'Insulating gloves should be visually inspected and air-tested for leaks before every use. In addition they should be electrically retested at intervals not exceeding six months, whatever the class, by an accredited laboratory working to BS EN 60903. Many employers keep a glove register recording the date of each test, the result and the next test due date. Between formal tests, check for physical damage (cuts, tears, punctures, abrasion), chemical contamination, UV degradation and ozone cracking — store gloves flat or in a glove bag, out of sunlight. Replace immediately if any damage is found, and never use expired or untested gloves for work on or near live conductors.',
  },
  {
    question: 'What is the difference between VDE 1000V tools and standard insulated tools?',
    answer:
      'Insulated hand tools sold as "VDE 1000V" are designed and tested for work on or near live conductors up to 1,000 V AC (1,500 V DC). They comply with BS EN 60900, the British adoption of the international standard IEC 60900, and every tool is routine-tested at 10,000 V before sale. The insulation is a multi-layer construction: a hard inner insulating layer and a softer outer layer in a contrasting colour, so damage to the outer layer immediately exposes the inner colour as a warning. Tools are marked with the double-triangle symbol, the 1,000 V rating and the standard. Standard tools with dipped or sprayed plastic handles are not insulated — the grip is there for comfort, has not been tested to any voltage, and must never be relied on for protection against electric shock.',
  },
  {
    question: 'Who pays for PPE — the employer or the employee?',
    answer:
      'Under the Personal Protective Equipment at Work Regulations 1992, as amended by the Personal Protective Equipment at Work (Amendment) Regulations 2022 which came into force on 6 April 2022, employers must provide suitable PPE free of charge. That covers everything the risk assessment identifies as necessary — insulating gloves, safety boots, eye protection, arc-rated clothing, head protection, high-visibility clothing and anything else. The employer must also maintain, repair and replace PPE, and train workers in its correct use, storage and limitations. The 2022 amendment extended those duties from employees to limb (b) workers — people who are not employees but work under a contract personally to do work — which brings many agency and casual workers into scope. Self-employed electricians provide their own PPE and can claim the cost as a business expense.',
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
    id: 'ppe-kit',
    heading: 'The Core PPE Kit for Electricians',
    content: (
      <>
        <p>
          Every electrician needs the same eight items. The standard in the middle column is what to
          look for on the product marking — if it is not marked, it has not been tested.
        </p>
        <div className={CARD}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Item</th>
                  <th className={TH}>Standard</th>
                  <th className={TH}>When you need it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold`}>Safety boots</td>
                  <td className={TD}>BS EN ISO 20345 (S1P or S3)</td>
                  <td className={TD}>Every site. S3 for outdoor and wet work</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Eye protection</td>
                  <td className={TD}>BS EN 166</td>
                  <td className={TD}>Drilling, chasing, cutting, and any work near live parts</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Insulating gloves</td>
                  <td className={TD}>BS EN 60903, class matched to the voltage</td>
                  <td className={TD}>Whenever contact with a live conductor is foreseeable</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Insulated hand tools</td>
                  <td className={TD}>BS EN 60900 — 1,000 V AC / 1,500 V DC</td>
                  <td className={TD}>All work on or near live conductors</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Voltage indicator and proving unit</td>
                  <td className={TD}>HSE Guidance Note GS 38</td>
                  <td className={TD}>Every safe isolation, on every job</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Arc-rated clothing and face shield</td>
                  <td className={TD}>BS EN IEC 61482 series</td>
                  <td className={TD}>Work on or near energised switchgear and boards</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Head protection</td>
                  <td className={TD}>BS EN 397 helmet, or BS EN 812 bump cap</td>
                  <td className={TD}>Construction sites, plant rooms, lofts and floor voids</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>High-visibility clothing</td>
                  <td className={TD}>BS EN ISO 20471</td>
                  <td className={TD}>Site, roadside and traffic-managed areas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Two separate pieces of law sit behind that list. The Personal Protective Equipment at Work
          Regulations 1992, as amended in 2022, govern who provides PPE and how it is maintained.
          The Electricity at Work Regulations 1989 govern whether you may work live at all. Both
          apply at the same time, and neither one lets PPE stand in for{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'why-ppe-matters',
    heading: 'Why PPE Matters for Electricians',
    content: (
      <>
        <p>
          Personal Protective Equipment is the last line of defence in the hierarchy of control. It
          does not eliminate or reduce the hazard itself — it protects the individual from the
          consequences of exposure to a hazard that has not been fully controlled by other means.
          For electricians, that means PPE protects you when safe isolation, lock off procedures,
          engineered barriers and safe systems of work are either not possible or have failed.
        </p>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Where PPE sits in the hierarchy
        </h3>
        <p>
          Schedule 1 of the Management of Health and Safety at Work Regulations 1999 sets out the
          general principles of prevention: avoid the risk, combat it at source, replace the
          dangerous with the less dangerous, and give collective protective measures priority over
          individual protective measures. In everyday practice that is applied as eliminate,
          substitute, engineering controls, administrative controls, then PPE. The primary control
          for electric shock is{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          — making the circuit dead and proving it dead. Insulating gloves and face protection are
          the backup for when something goes wrong.
        </p>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Where PPE is unavoidable
        </h3>
        <p>
          There are situations where PPE cannot be designed out. Working near energised equipment
          even when the circuit in front of you is isolated, live testing, fault response, and work
          in environments with other hazards present all require it. BS 7671 Regulation 641.4
          requires that precautions be taken to avoid danger to persons and livestock, and damage to
          property and installed equipment, during inspection and testing. The{' '}
          <SEOInternalLink href="/guides/risk-assessment-electricians">
            risk assessment
          </SEOInternalLink>{' '}
          for each job should name exactly which PPE those precautions amount to.
        </p>
      </>
    ),
  },
  {
    id: 'insulated-gloves',
    heading: 'Insulating Gloves: Classes and Voltages',
    content: (
      <>
        <p>
          Insulating gloves are the most critical piece of PPE an electrician carries. BS EN 60903
          classes them by maximum working voltage — pick the class that covers the highest voltage
          you could contact, not the one that covers the job you think you are doing.
        </p>
        <div className={CARD}>
          <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
            Glove classes to BS EN 60903
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Class</th>
                  <th className={TH}>Max working voltage (AC)</th>
                  <th className={TH}>Typical use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>Class 00</td>
                  <td className={TD}>500 V</td>
                  <td className={TD}>
                    Minimum for 230 V single-phase work. Thinner and more dexterous than the higher
                    classes — suitable for domestic and light commercial work
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>Class 0</td>
                  <td className={TD}>1,000 V</td>
                  <td className={TD}>
                    Covers 400 V three-phase as well as 230 V, so one pair does distribution board
                    work. The usual choice for UK installation work
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Class 1</td>
                  <td className={TD}>7,500 V</td>
                  <td className={TD}>Medium-voltage equipment; HV authorised persons</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Class 2</td>
                  <td className={TD}>17,000 V</td>
                  <td className={TD}>
                    HV substation work. Thicker and less dexterous — leather over-gloves essential
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Class 3</td>
                  <td className={TD}>26,500 V</td>
                  <td className={TD}>Specialist HV distribution network work</td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Class 4</td>
                  <td className={TD}>36,000 V</td>
                  <td className={TD}>Specialist HV transmission and distribution network work</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Inspection, testing and storage
        </h3>
        <p>
          Before each use, inspect gloves for cuts, tears, punctures, chemical contamination and UV
          degradation, then air-test them by rolling the cuff to trap air inside and listening and
          feeling for leaks. Never use a damaged pair. Store them flat or in a glove bag, in a cool
          dark place away from sharp objects, oils and solvents — not folded into a tool bag.
          Electrical retesting by an accredited laboratory should be carried out at intervals not
          exceeding six months, whatever the class.
        </p>
      </>
    ),
  },
  {
    id: 'live-working',
    heading: 'PPE for Live Electrical Work',
    content: (
      <>
        <p>
          PPE does not make live work lawful. Regulation 14 of the Electricity at Work Regulations
          1989 permits work on or near a live conductor only where all three of the following hold:
          it is unreasonable in all the circumstances for the conductor to be dead; it is reasonable
          in all the circumstances to work on or near it while live; and suitable precautions —
          including, where necessary, the provision of suitable protective equipment — are taken to
          prevent injury. All three, not any one.
        </p>
        <p>
          Regulation 16 then requires that no person is engaged in a work activity where technical
          knowledge or experience is needed to prevent danger unless they possess it, or are under
          an appropriate degree of supervision. BS 7671 refers to the same regulation, and to HSE
          publication HSR25 for guidance on it.
        </p>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          What the live-work kit actually is
        </h3>
        <div className={CARD}>
          <ul className="space-y-3 text-[14px] leading-relaxed text-white">
            <li>
              <strong>Insulating gloves</strong> — BS EN 60903, Class 0 (1,000 V) for LV
              installation work, with leather over-gloves where there is any mechanical risk.
            </li>
            <li>
              <strong>Insulated hand tools</strong> — BS EN 60900, 1,000 V AC / 1,500 V DC. No
              exceptions, and no dipped-handle substitutes.
            </li>
            <li>
              <strong>GS 38-compliant test equipment</strong> — voltage indicator, proving unit,
              fused leads and shrouded probes with finger barriers. See the{' '}
              <SEOInternalLink href="/guides/gs-38-proving-dead">GS 38 guide</SEOInternalLink>.
            </li>
            <li>
              <strong>Face and eye protection</strong> — an arc-rated face shield where an arc is
              credible; safety glasses with side protection as the floor.
            </li>
            <li>
              <strong>Flame-resistant or arc-rated clothing</strong> — natural fibres or arc-rated
              fabric. Synthetic workwear melts onto skin in an arc event.
            </li>
            <li>
              <strong>Insulating matting</strong> — BS EN 61111, to stand on where the floor could
              form part of a shock path.
            </li>
          </ul>
        </div>
        <p>
          Live testing is the common case: you cannot measure a supply voltage or take a live
          impedance reading on a dead circuit. That is exactly the situation Regulation 14
          contemplates — and exactly why the test leads themselves have to meet GS 38 rather than
          being an afterthought.
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
          Safety boots protect your feet from dropped tools, heavy equipment and standing on cable
          clips and screws. The markings on the tongue label are what tell you what a pair actually
          does.
        </p>
        <div className={CARD}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Marking</th>
                  <th className={TH}>What it gives you</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>S1P</td>
                  <td className={TD}>
                    The practical minimum for electrical work: 200 joule toe cap, antistatic sole,
                    energy-absorbing seat region and midsole penetration protection
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>S3</td>
                  <td className={TD}>
                    Adds water resistance and a cleated outsole — the all-round choice if you work
                    across domestic, commercial and construction sites
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Composite vs steel toe cap</td>
                  <td className={TD}>
                    Both meet the 200 joule requirement. Composite is lighter and non-conductive,
                    which is why most electricians prefer it
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>EH-rated soles</td>
                  <td className={TD}>
                    An ASTM (American) marking, not a BS EN one: tested to withstand 18,000 V under
                    dry conditions as secondary protection only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={NOTE}>
          <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-white">
            &ldquo;E&rdquo; does not mean electrical
          </h3>
          <p className="text-[14px] leading-relaxed text-white">
            In BS EN ISO 20345 the letter E stands for energy absorption of the seat region — the
            heel — and the letter A for antistatic. Neither is electrical shock protection. The
            antistatic property is there to dissipate static charge, and it deliberately does not
            give you a high-resistance path to earth. No boot marking is a substitute for safe
            isolation.
          </p>
        </div>
        <p>
          Replace boots when the sole is worn, the toe cap is exposed or the waterproofing has
          failed. Daily site use typically gets you six to twelve months out of a pair.
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
          Eye injuries are among the most common workplace injuries for electricians. Flying debris
          from drilling, chasing and cutting; dust from lofts and floor voids; chemical splashes;
          and the intense light and molten metal of an arc flash all cause serious eye damage.
        </p>
        <div className={CARD}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Type</th>
                  <th className={TH}>Standard</th>
                  <th className={TH}>Use it for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>Safety glasses</td>
                  <td className={TD}>BS EN 166</td>
                  <td className={TD}>
                    General electrical work. Must have side shields. Anti-fog coating matters in
                    warm or humid spaces — glasses pushed onto a forehead protect nothing
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Safety goggles</td>
                  <td className={TD}>BS EN 166</td>
                  <td className={TD}>
                    Angle grinders, chop saws and dusty environments — the sealed fit keeps out fine
                    particles and liquid splash
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Arc-rated face shield</td>
                  <td className={TD}>BS EN IEC 61482 series</td>
                  <td className={TD}>
                    Work on or near energised switchgear and distribution boards, rated to the value
                    the arc flash risk assessment calls for
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          An arc-rated shield is rated by arc thermal performance value (ATPV) or, in the newer
          European test reporting, by ELIM. Match it to the incident energy from the{' '}
          <SEOInternalLink href="/guides/arc-flash-protection">
            arc flash risk assessment
          </SEOInternalLink>{' '}
          rather than buying by category label alone. Clean lenses daily and replace them once
          scratched or pitted — scratched lenses cause the eye strain that makes people take them
          off. Keep a spare pair in the bag.
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
          Arc flash PPE is rated by the incident energy it can withstand, in calories per square
          centimetre (cal/cm²). The four numbered categories come from NFPA 70E, a US standard with
          no statutory force in Great Britain, but they are widely used here as shorthand for
          specifying kit. In the UK and Europe the garments themselves are tested to the BS EN IEC
          61482 series.
        </p>
        <div className={CARD}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Category</th>
                  <th className={TH}>Minimum arc rating</th>
                  <th className={TH}>Clothing and equipment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold`}>1</td>
                  <td className={`${TD} whitespace-nowrap`}>4 cal/cm²</td>
                  <td className={TD}>
                    Arc-rated long-sleeve shirt and trousers or coverall, arc-rated face shield or
                    hood, hard hat, safety glasses, hearing protection, heavy-duty leather gloves
                    and leather footwear
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>2</td>
                  <td className={`${TD} whitespace-nowrap`}>8 cal/cm²</td>
                  <td className={TD}>
                    As Category 1, plus an arc-rated balaclava with the face shield (or an arc flash
                    hood), and insulating gloves with leather protectors where shock is also a risk
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>3</td>
                  <td className={`${TD} whitespace-nowrap`}>25 cal/cm²</td>
                  <td className={TD}>
                    Arc flash suit and arc-rated hood, arc-rated gloves, hard hat, safety glasses,
                    hearing protection and leather footwear
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>4</td>
                  <td className={`${TD} whitespace-nowrap`}>40 cal/cm²</td>
                  <td className={TD}>
                    Multi-layer arc flash suit and hood, arc-rated gloves, hard hat, safety glasses,
                    hearing protection and leather footwear
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          As a working rule for UK installation work, Category 2 is a sensible floor for anything on
          or near an energised distribution board, and Category 3 or above for main switchboards and
          switchgear with high available fault energy. That is practice guidance, not a legal
          threshold: the correct category is whatever the{' '}
          <SEOInternalLink href="/guides/arc-flash-protection">
            arc flash risk assessment
          </SEOInternalLink>{' '}
          gives for the incident energy at the working distance for that specific equipment. Do not
          guess — the gap between Category 1 and Category 4 is the gap between a survivable injury
          and a fatal one.
        </p>
        <div className={NOTE}>
          <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-white">
            Solar PV: the DC side is always live
          </h3>
          <p className="text-[14px] leading-relaxed text-white">
            BS 7671:2018+A4:2026 Regulation 712.410.101 requires that electrical equipment on the DC
            side shall be considered to be energised, even when the AC side is disconnected from the
            grid or when the inverter is disconnected from the DC side. Strings generate voltage in
            daylight regardless of what you have switched on the AC side, so there is no safe
            isolation equivalent for DC-side conductors, combiner boxes or string connections during
            daylight. BS 7671 does not itself specify PPE — but because the DC side must be treated
            as live, Regulation 14 of the Electricity at Work Regulations 1989 applies, which in
            practice means insulating gloves rated for the string voltage and insulated hand tools.
            See the{' '}
            <SEOInternalLink href="/solar-pv-certificate">
              Solar PV installation certificate
            </SEOInternalLink>{' '}
            for the related documentation.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'voltage-rated-tools',
    heading: 'Insulated Hand Tools (VDE 1000V)',
    content: (
      <>
        <p>
          Insulated hand tools are designed and tested for work on or near live conductors. They are
          marked with the double-triangle symbol and rated 1,000 V AC (1,500 V DC). Every
          electrician should own a full set and reach for it whenever there is energised equipment
          in front of them.
        </p>
        <div className={CARD}>
          <ul className="space-y-4 text-[14px] leading-relaxed text-white">
            <li>
              <strong className="block">BS EN 60900 compliance</strong>
              This is the British adoption of the international standard IEC 60900. Every tool is
              routine-tested at 10,000 V AC before sale to prove the insulation.
            </li>
            <li>
              <strong className="block">Multi-layer insulation, not a plastic dip</strong>A hard
              inner insulating layer under a softer outer layer in a contrasting colour. If the
              outer layer is cut or worn through, the inner colour shows immediately — that is your
              signal to stop using the tool.
            </li>
            <li>
              <strong className="block">The set worth owning</strong>
              Flat and Pozi/Phillips screwdrivers in several sizes, side cutters, long-nose pliers,
              combination pliers, cable strippers, an adjustable spanner and a cable knife.
            </li>
            <li>
              <strong className="block">Inspect before every use</strong>
              Check for cracked, peeling or gouged insulation. If the contrasting inner layer is
              visible, replace the tool. Never tape over, modify or repair the insulation.
            </li>
          </ul>
        </div>
        <p>
          Standard chrome vanadium tools with plain plastic or rubber grips are not insulated and
          must never stand in for insulated tools when working on or near live conductors. The grip
          on a standard tool is there for comfort, not for electrical protection.
        </p>
        <div className={CARD}>
          <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-white">
            GS 38: test leads and voltage indicators
          </h3>
          <p className="text-[14px] leading-relaxed text-white">
            HSE Guidance Note{' '}
            <SEOInternalLink href="/guides/gs-38-proving-dead">GS 38</SEOInternalLink> sets the
            requirements for the test equipment you use to prove dead — finger barriers, shrouded
            connectors, minimal exposed probe tip and fused leads where the instrument manufacturer
            advises. Insulated tools protect you during work on live conductors; GS 38-compliant
            test equipment protects you during the proving-dead step that comes first. Both belong
            in the same safe system of work.
          </p>
        </div>
        <SEOAppBridge
          title="Track PPE and tool inspection dates"
          description="Elec-Mate's site safety tools keep your PPE inspection records, tool and instrument calibration dates, and training certificates in one place, so nothing expires unnoticed."
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
          Head protection depends on the environment. Construction sites, industrial premises and
          commercial refurbishment projects normally require a helmet. Domestic work in an occupied
          property usually does not, unless there is a specific risk of head injury.
        </p>
        <div className={CARD}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className={TH}>Type</th>
                  <th className={TH}>Standard</th>
                  <th className={TH}>Protects against</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className={`${TD} font-semibold text-elec-yellow`}>
                    Industrial safety helmet
                  </td>
                  <td className={TD}>BS EN 397</td>
                  <td className={TD}>
                    Falling objects and collision with fixed structures. 440 V AC electrical
                    insulation is an optional marking under EN 397 — check the shell, do not assume
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Electrically insulating helmet</td>
                  <td className={TD}>BS EN 50365</td>
                  <td className={TD}>
                    The dedicated standard for helmets used on low-voltage installations, where
                    contact with a live conductor is foreseeable
                  </td>
                </tr>
                <tr>
                  <td className={`${TD} font-semibold`}>Bump cap</td>
                  <td className={TD}>BS EN 812</td>
                  <td className={TD}>
                    Knocking your head on beams, pipes and joists. Lighter than a helmet, but it is
                    not falling-object protection — useful in lofts and floor voids
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Helmets carry a moulded manufacture date inside the shell. Replace in line with the
          manufacturer&rsquo;s stated service life — it varies by material and by maker, so read the
          user instructions rather than working to a rule of thumb. Replace immediately, whatever
          the date, after any impact, or if the shell is cracked, crazed, chalky, or has been
          exposed to solvents or prolonged sunlight.
        </p>
      </>
    ),
  },
  {
    id: 'ppe-inspection',
    heading: 'PPE Inspection and Maintenance',
    content: (
      <>
        <p>
          PPE only protects you if it is in good condition and correctly fitted. Maintaining it is
          not optional — it is a duty under the Personal Protective Equipment at Work Regulations
          1992, as amended in 2022.
        </p>
        <div className={CARD}>
          <ul className="space-y-4 text-[14px] leading-relaxed text-white">
            <li>
              <strong className="block">Before each use</strong>
              Visually inspect everything before you put it on. Air-test insulating gloves. Check
              glasses for scratches, tool insulation for damage, and boots for sole wear and an
              exposed toe cap.
            </li>
            <li>
              <strong className="block">Formal recorded inspections</strong>
              Run recorded inspections at a set interval — monthly or quarterly suits most firms —
              using a checklist, and keep the records available for as long as the equipment remains
              in service.
            </li>
            <li>
              <strong className="block">Storage</strong>
              Clean, dry, cool, out of direct sunlight and away from chemicals, sharp objects and
              extreme temperatures. Insulating gloves go flat or in a glove bag, never folded or
              compressed.
            </li>
            <li>
              <strong className="block">Replacement</strong>
              Replace immediately if damaged, expired or contaminated. Never repair insulating
              gloves, insulated tools or arc-rated garments — replace them with new certified items.
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
          The Personal Protective Equipment at Work Regulations 1992 set out who must provide,
          maintain and use PPE. They were amended by the Personal Protective Equipment at Work
          (Amendment) Regulations 2022, in force from 6 April 2022 — the amendment extended the
          duties to limb (b) workers rather than replacing the 1992 Regulations.
        </p>
        <div className={CARD}>
          <ul className="space-y-4 text-[14px] leading-relaxed text-white">
            <li>
              <strong className="block">Employer duties</strong>
              Provide suitable PPE free of charge to employees and limb (b) workers. Assess its
              suitability for the task and the individual. Keep it maintained, clean and replaced
              when needed. Train people in its correct use, storage and limitations.
            </li>
            <li>
              <strong className="block">Employee duties</strong>
              Use PPE as instructed and in line with the training given. Report defects, damage or
              loss. Take reasonable care of it and return it to proper storage after use.
            </li>
            <li>
              <strong className="block">Self-employed duties</strong>
              Provide and maintain your own PPE, and claim the cost as a business expense. The duty
              of care to yourself and to anyone affected by your work is the same.
            </li>
          </ul>
        </div>
        <div className={NOTE}>
          <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-white">
            The Electricity at Work Regulations 1989 sit alongside
          </h3>
          <p className="text-[14px] leading-relaxed text-white">
            The statutory basis for electrical PPE is not the PPE Regulations alone. Regulation 14
            of the Electricity at Work Regulations 1989 prohibits work on or near live conductors
            unless it is unreasonable to work dead, reasonable to work live, and suitable
            precautions — including suitable protective equipment — are taken. Regulation 16
            requires the person doing the work to have the necessary technical knowledge or
            experience, or to be under an appropriate degree of supervision. The PPE Regulations
            govern provision, maintenance and training; the Electricity at Work Regulations govern
            whether live work is permissible at all. HSE publication HSR25 is the guidance on
            applying them, and BS 7671 itself points readers to it.
          </p>
        </div>
        <p>
          Limb (b) workers are people who are not employees but work under a contract to personally
          perform work — many agency workers, freelance electricians and subcontractors fall into
          this group. If you engage them, you provide their PPE on the same basis as for employees.
        </p>
        <p>
          Elec-Mate training courses including{' '}
          <SEOInternalLink href="/manual-handling-course">manual handling</SEOInternalLink>,{' '}
          <SEOInternalLink href="/pasma-training">PASMA</SEOInternalLink>,{' '}
          <SEOInternalLink href="/ipaf-training">IPAF</SEOInternalLink> and{' '}
          <SEOInternalLink href="/training/working-at-height">working at height</SEOInternalLink>{' '}
          cover when and how to use each type of PPE correctly.
        </p>
        <SEOAppBridge
          title="AI-generated RAMS list the PPE for the task"
          description="Generate a risk assessment and method statement with Elec-Mate's AI Health and Safety agent and the PPE for each activity is set out alongside the hazards and controls, ready to sign and send."
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
      title="PPE for Electricians: Gloves, Arc Flash, Boots"
      description="PPE for UK electricians: insulating glove classes to BS EN 60903, arc flash categories, BS EN 60900 tools, boots, eye and head protection, legal duties."
      datePublished="2025-04-20"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          PPE for Electricians: <span className="text-elec-yellow">What You Need on Site</span>
        </>
      }
      heroSubtitle="Insulating gloves, safety boots, arc flash PPE, insulated hand tools, eye protection and head protection — the standards each must meet, when each is required, and where the legal duties sit."
      readingTime={12}
      answerBox={{
        question: 'What PPE do electricians need?',
        answer:
          'The core PPE for an electrician is: safety boots to BS EN ISO 20345 (S1P or S3), safety glasses or an arc-rated face shield, flame-resistant or arc-rated clothing, insulating gloves to BS EN 60903 rated for the working voltage wherever contact with a live conductor is foreseeable, insulated hand tools to BS EN 60900, and head protection on site. Test instruments and leads must meet HSE Guidance Note GS 38. PPE is the last line of defence: under the Electricity at Work Regulations 1989 you must work dead wherever reasonably practicable, and under the PPE at Work Regulations 1992 (as amended in 2022) the employer provides suitable PPE free of charge.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About PPE for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Stay Safe and Compliant on Every Job"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI risk assessments, RAMS generation, site safety tools, and training courses. PPE requirements are built into every assessment. 7-day free trial, cancel anytime."
    />
  );
}
