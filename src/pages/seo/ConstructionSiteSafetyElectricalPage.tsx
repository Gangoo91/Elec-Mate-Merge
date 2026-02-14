import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  FileCheck2,
  Calculator,
  GraduationCap,
  Cable,
  Settings,
  ClipboardCheck,
  Users,
  Activity,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Construction Site Electrical Safety',
    href: '/guides/construction-site-electrical-safety',
  },
];

const tocItems = [
  { id: 'construction-electrical', label: 'Electrical Safety on Construction Sites' },
  { id: 'cdm-duties', label: 'CDM Duties' },
  { id: '110v-systems', label: '110V Reduced Voltage Systems' },
  { id: 'temporary-distribution', label: 'Temporary Distribution' },
  { id: 'cable-protection', label: 'Cable Protection' },
  { id: 'inspection-testing-temp', label: 'Inspection and Testing' },
  { id: 'emergency-procedures', label: 'Emergency Procedures' },
  { id: 'portable-equipment', label: 'Portable Equipment on Site' },
  { id: 'elec-mate-site', label: 'Site Safety with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Construction sites must use 110V reduced voltage (centre-tapped earth) for all portable hand tools and most temporary lighting. This limits the maximum voltage to earth to 55V, significantly reducing the risk of fatal electric shock.',
  'The Construction (Design and Management) Regulations 2015 (CDM 2015) define specific duties for clients, principal designers, principal contractors, contractors, and workers — including responsibilities for electrical safety on site.',
  'Temporary electrical installations on construction sites must comply with BS 7671 Section 704 (Construction and Demolition Site Installations) and be inspected at intervals not exceeding 3 months.',
  'All portable electrical equipment on construction sites should be visually inspected daily by the user and formally inspected and tested (PAT tested) at intervals determined by risk assessment — typically weekly for 110V equipment in harsh environments.',
  'Elec-Mate generates RAMS (Risk Assessment and Method Statements) for electrical work on construction sites and provides digital certificates for temporary installation inspections.',
];

const faqs = [
  {
    question: 'Why do construction sites use 110V instead of 230V?',
    answer:
      'Construction sites use 110V reduced voltage systems because of the significantly increased risk of electric shock in the construction environment. Workers are often in wet or damp conditions, in contact with earthed metalwork (steel frames, scaffolding, piling), wearing damaged or wet clothing, and using equipment that is subject to rough handling and accidental damage. At 230V, contact with a live conductor in these conditions can cause ventricular fibrillation (cardiac arrest) and death. The 110V system uses a centre-tapped earth transformer (CTE), which means the voltage to earth on either line conductor is only 55V — well below the level that is likely to cause a fatal shock in most conditions. The 55V level is not "safe" — it can still cause injury, particularly in very wet conditions — but the risk of death is dramatically reduced. This is why the HSE expects 110V to be used for all portable hand tools on construction sites, and it is an industry standard across the UK.',
  },
  {
    question: 'What are the CDM 2015 duties for electrical safety?',
    answer:
      'The Construction (Design and Management) Regulations 2015 assign duties to several duty holders. The client must ensure suitable welfare facilities including safe electrical supplies. The principal designer must consider electrical safety in the design process — for example, ensuring cable routes avoid areas of future excavation. The principal contractor must plan, manage, and monitor electrical safety on site, ensure a site electrical installation is designed and installed by a competent person, and maintain a construction phase plan that addresses electrical hazards. Contractors carrying out electrical work must ensure their workers are competent, have appropriate equipment, and follow safe systems of work. All workers have a duty to report unsafe conditions including damaged cables, exposed conductors, or faulty equipment. The CDM regulations work alongside the Electricity at Work Regulations 1989, which specifically require all electrical systems to be constructed, maintained, and operated to prevent danger.',
  },
  {
    question: 'How often must temporary electrical installations be inspected?',
    answer:
      'BS 7671 Section 704 (Construction and Demolition Site Installations) requires periodic inspection and testing of temporary electrical installations at intervals not exceeding 3 months. In practice, many sites carry out monthly inspections, particularly for the main temporary distribution system (generator, transformer, main distribution board, sub-distribution boards, and fixed cables). Daily visual inspections by users are expected for all electrical equipment. The 3-month interval applies to the full periodic inspection and testing of the temporary installation — continuity, insulation resistance, earth fault loop impedance, RCD operation, and prospective fault current. An EICR or equivalent inspection report should be produced after each periodic inspection.',
  },
  {
    question: 'What type of distribution board should be used on a construction site?',
    answer:
      'Construction site distribution boards must be purpose-built for the environment. They should be weatherproof (minimum IP44 rating for outdoor use), robustly constructed to withstand rough handling and impact, fitted with 30 mA RCD protection on all socket outlet circuits, and clearly labelled with circuit details and voltage (110V or 230V). For 110V systems, the distribution board is typically supplied from a 110V centre-tapped earth (CTE) transformer. The transformer and distribution board should be positioned to minimise cable run lengths and protected from vehicle movements and falling materials. For the 230V supply to the temporary installation (if used for fixed equipment, lighting, or the site office), standard industrial distribution boards with Type B MCBs and 30 mA RCD protection are appropriate. All temporary distribution boards should be securely mounted, not placed on the ground, and protected from water ingress.',
  },
  {
    question: 'Can 230V be used anywhere on a construction site?',
    answer:
      'Yes, but only for specific applications where 110V is not practical. BS 7671 Section 704 and HSE guidance allow 230V on construction sites for: fixed lighting installations that are out of reach (above 2.4 metres); site office equipment (computers, printers, kettles) within a fixed site cabin; equipment that is only available at 230V and cannot reasonably be replaced with a 110V alternative. When 230V is used, additional precautions are required: 30 mA RCD protection on all 230V circuits, earth fault loop impedance values that ensure disconnection within the reduced times required by BS 7671 Section 704, and a risk assessment documenting why 230V is necessary and what additional safety measures are in place. Portable hand tools must always be 110V — there is no justification for using 230V portable tools on a UK construction site.',
  },
  {
    question: 'What are the cable protection requirements on construction sites?',
    answer:
      'Cables on construction sites are exposed to hazards that do not exist in permanent installations: vehicle traffic, falling materials, sharp edges, digging, and accidental damage from other trades. BS 7671 Section 704 and HSE guidance require cables to be protected against mechanical damage. For cables at ground level, this means: using armoured cable (SWA) where possible; running cables through rigid conduit or trunking where they cross traffic routes; using cable ramps or bridges where cables must cross pedestrian or vehicle routes; burying cables at a minimum depth of 500 mm with marker tape above if they must cross the site underground. For overhead cables, the minimum height is 5.8 metres above areas accessible to vehicles and 3.5 metres above pedestrian-only areas. Trailing leads from 110V tools should be kept as short as possible and should not lie in puddles, across walkways, or where they could be snagged by passing workers or equipment.',
  },
  {
    question: 'What should be in a RAMS for electrical work on a construction site?',
    answer:
      'A Risk Assessment and Method Statement (RAMS) for electrical work on a construction site should cover: identification of electrical hazards (live working, cable strikes, overhead lines, temporary supplies); risk assessment with likelihood and severity ratings for each hazard; control measures including safe isolation procedures, permit-to-work requirements, use of 110V systems, PPE requirements, and competence of workers; the method statement describing the step-by-step procedure for the work including isolations, testing, and energisation; emergency procedures including the location of emergency stop buttons, first aid arrangements, and the procedure for reporting electrical incidents. The RAMS should be reviewed and updated whenever site conditions change — for example, when a new phase of construction begins or when the temporary electrical installation is modified. Elec-Mate can generate RAMS for electrical work on construction sites using the AI RAMS generator.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator',
    description:
      'AI-powered Risk Assessment and Method Statement generator for electrical work on construction sites.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step guide to safe isolation with GS38 compliance and proving dead procedures.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide UK',
    description:
      'Complete guide to portable appliance testing including construction site equipment.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work',
    title: 'Permit to Work',
    description:
      'Electrical permit-to-work systems for construction sites and high-risk environments.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete reference to BS 7671 including Section 704: Construction and Demolition Site Installations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/manual-handling',
    title: 'Manual Handling Course',
    description:
      'Online training for manual handling on construction sites — a common requirement for site induction.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'construction-electrical',
    heading: 'Electrical Safety on Construction Sites',
    content: (
      <>
        <p>
          Construction sites are one of the most hazardous environments for electrical work. The
          combination of temporary installations, wet and dirty conditions, incomplete buildings,
          heavy plant machinery, and multiple trades working in close proximity creates risks that
          are significantly higher than in permanent installations. Electrical incidents on
          construction sites can be fatal — and they remain one of the leading causes of workplace
          death in the UK construction industry.
        </p>
        <p>
          The regulatory framework for construction site electrical safety involves several
          overlapping pieces of legislation: the Construction (Design and Management) Regulations
          2015 (CDM 2015), the Electricity at Work Regulations 1989, the Health and Safety at Work
          Act 1974, and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 704 (Construction and Demolition Site Installations). Together, these require that
          construction site electrical installations are designed, installed, inspected, and
          maintained by competent persons using appropriate equipment and safe systems of work.
        </p>
        <p>
          The key principles of construction site electrical safety are: use reduced voltage (110V)
          for all portable equipment; protect cables against mechanical damage; inspect and test
          temporary installations at regular intervals; ensure all workers are competent for the
          electrical tasks they are carrying out; and have clear emergency procedures in place for
          electrical incidents.
        </p>
      </>
    ),
  },
  {
    id: 'cdm-duties',
    heading: 'CDM 2015: Duties for Electrical Safety',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 assign specific duties to each
          party involved in a construction project. Understanding these duties is essential for
          electrical contractors working on site:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Client:</strong> must ensure suitable arrangements are in place for managing
                the project, including the provision of safe electrical supplies for welfare
                facilities and site operations. Must provide pre-construction information including
                details of existing services (underground cables, overhead lines).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal Designer:</strong> must consider electrical safety in the design —
                for example, routing cable runs to avoid areas of future excavation, specifying
                clearances from overhead lines, and designing the permanent installation to minimise
                risk during construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Principal Contractor:</strong> must plan, manage, and monitor electrical
                safety on site. This includes ensuring the temporary electrical installation is
                designed and installed by a competent person, maintaining it in safe condition,
                arranging regular inspections, and including electrical hazards in the construction
                phase plan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractors (including electrical contractors):</strong> must ensure their
                workers are competent, have appropriate equipment (including 110V tools and
                calibrated test instruments), follow{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedures
                </SEOInternalLink>
                , and report unsafe conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workers:</strong> must report damaged cables, exposed conductors, faulty
                equipment, and any other electrical hazards. Must not use equipment they know or
                suspect to be defective.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to comply with CDM 2015 can result in enforcement action by the HSE, including
          improvement notices, prohibition notices (stopping work on site), and prosecution. In
          serious cases, individuals can face personal criminal liability.
        </p>
      </>
    ),
  },
  {
    id: '110v-systems',
    heading: '110V Reduced Voltage Systems',
    content: (
      <>
        <p>
          The 110V centre-tapped earth (CTE) system is the standard for portable equipment on UK
          construction sites. The system uses a step-down transformer that converts the 230V single-
          phase supply to 110V, with the secondary winding centre-tapped to earth. This means each
          line conductor is at 55V to earth — if a worker touches a live conductor while in contact
          with earth, the maximum shock voltage is 55V rather than 230V.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">How the CTE System Works</h4>
              <p className="text-white text-sm leading-relaxed">
                The transformer has a 230V primary and a 110V secondary. The centre point of the
                secondary winding is connected to earth. This creates two 55V sections — one on each
                side of the earth point. The voltage between the two line conductors is 110V (for
                the tool to operate), but the voltage from either line conductor to earth is only
                55V (the shock risk). The distinctive yellow plugs and sockets (BS EN 60309, 110V)
                prevent accidental connection to 230V supplies.
              </p>
            </div>
          </div>
        </div>
        <p>
          All portable hand tools on construction sites must be 110V. This includes drills, angle
          grinders, circular saws, jigsaw, reciprocating saws, SDS hammers, heat guns, and portable
          lighting below 2.4 metres height. Battery-powered cordless tools are also acceptable (and
          increasingly common) as they present no mains shock risk at all.
        </p>
        <p>
          The 110V transformer should be positioned close to the work area to minimise trailing lead
          lengths. It must be securely positioned (not balanced on scaffolding), protected from
          water ingress, and connected to a 30 mA RCD-protected 230V supply. The transformer should
          be inspected visually before each use and formally inspected and tested at regular
          intervals.
        </p>
      </>
    ),
  },
  {
    id: 'temporary-distribution',
    heading: 'Temporary Electrical Distribution on Site',
    content: (
      <>
        <p>
          The temporary electrical distribution system on a construction site is the backbone of all
          electrical power on site. It typically consists of:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary supply point:</strong> either a temporary builder's supply from
                the DNO or a generator. For large sites, a temporary three-phase supply is common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main distribution board:</strong> weatherproof, lockable, clearly labelled.
                Contains the main isolator, protective devices for outgoing circuits, and 30 mA RCD
                protection on all socket outlet circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards:</strong> positioned around the site to provide
                power to specific work areas. Connected to the main board by armoured cable (SWA) or
                appropriately protected cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>110V transformers:</strong> connected to the 230V distribution system and
                providing 110V socket outlets for portable tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary lighting:</strong> festoon lighting, floodlights, and task
                lighting. Fixed lighting above 2.4 m can be 230V; temporary lighting at lower levels
                should be 110V or battery-powered.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Section 704 specifies additional requirements for construction site installations
          beyond the general requirements. These include shorter disconnection times (0.2 seconds
          for 230V TN systems, compared to 0.4 seconds for general installations), lower earth fault
          loop impedance values, and the requirement for periodic inspection at maximum 3-month
          intervals.
        </p>
        <p>
          The temporary distribution system must be designed by a competent person and documented. A
          schematic showing the layout of all distribution boards, transformer locations, cable
          routes, and supply details should be available on site.
        </p>
        <SEOAppBridge
          title="Generate site electrical RAMS instantly"
          description="Elec-Mate's AI RAMS generator creates comprehensive Risk Assessment and Method Statements for construction site electrical work. CDM-compliant, site-specific, and ready to submit to the principal contractor."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'cable-protection',
    heading: 'Cable Protection on Construction Sites',
    content: (
      <>
        <p>
          Cable damage is one of the most common causes of electrical incidents on construction
          sites. Cables are exposed to vehicle traffic, excavation, falling materials, sharp edges,
          and accidental damage from other trades. Protecting cables is a fundamental safety
          requirement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Cable Protection Methods</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armoured cable (SWA):</strong> the preferred cable type for permanent and
                semi-permanent runs on construction sites. The steel wire armour provides mechanical
                protection against crushing, impact, and accidental spade damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable ramps and bridges:</strong> where cables must cross pedestrian or
                vehicle routes, use purpose-built cable ramps that are high-visibility, robust, and
                designed to distribute vehicle weight without crushing the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead routing:</strong> cables routed overhead on catenary wires or along
                scaffolding must be at least 5.8 m above vehicle areas and 3.5 m above pedestrian
                areas. Cables must be secured and not hanging loosely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buried cables:</strong> if cables must be buried on site, they should be at
                a minimum depth of 500 mm, laid on a bed of sand, with marker tape placed 150 mm
                above the cable. The route should be recorded on the site plan.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Cable Strike Risk</h4>
              <p className="text-white text-sm leading-relaxed">
                Before any excavation work, check for buried services using plans, a cable avoidance
                tool (CAT), and signal generator (Genny). Cable strikes during excavation are a
                major cause of injury and death on construction sites. HSE Guidance Note HSG47
                (Avoiding Danger from Underground Services) must be followed.
              </p>
            </div>
          </div>
        </div>
        <SEOInternalLink href="/guides/how-to-do-safe-isolation">
          See also: Safe Isolation Procedure — essential for working on construction site circuits
        </SEOInternalLink>
      </>
    ),
  },
  {
    id: 'inspection-testing-temp',
    heading: 'Inspection and Testing of Temporary Installations',
    content: (
      <>
        <p>
          BS 7671 Section 704 requires construction site temporary electrical installations to be
          periodically inspected and tested at intervals not exceeding 3 months. This is shorter
          than the typical 5-year interval for permanent domestic and commercial installations,
          reflecting the harsher environment and higher risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Inspection Schedule</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily:</strong> visual inspection of cables, plugs, sockets, and equipment
                by users before each shift. Report any damage immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly:</strong> more detailed visual inspection of the distribution system,
                transformers, and all cables. Check RCD test buttons.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly:</strong> formal visual inspection with records. Check all
                connections, labels, enclosure integrity, and earthing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-monthly (maximum):</strong> full periodic inspection and testing by a
                competent person. Continuity, insulation resistance, earth fault loop impedance, RCD
                operation, and prospective fault current. Issue an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or equivalent
                inspection report.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The 3-monthly inspection should cover the entire temporary installation from the supply
          point to the furthest socket outlet. Pay particular attention to earthing and bonding
          connections (which can loosen due to vibration), insulation resistance (which can degrade
          in damp conditions), and RCD operation (which can be affected by dust and moisture
          ingress).
        </p>
      </>
    ),
  },
  {
    id: 'emergency-procedures',
    heading: 'Emergency Procedures for Electrical Incidents',
    content: (
      <>
        <p>
          Every construction site must have documented emergency procedures for electrical
          incidents. These should be communicated to all workers during site induction and displayed
          at prominent locations around the site.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Electrical Emergency Response</h4>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>
              <strong>Do not touch the casualty</strong> if they are still in contact with the
              electrical source. You could become a second casualty.
            </li>
            <li>
              <strong>Isolate the supply</strong> at the nearest accessible isolator, distribution
              board, or emergency stop. If you cannot isolate safely, call for help.
            </li>
            <li>
              <strong>Call emergency services (999)</strong> — specify "electrocution" so the
              ambulance crew brings appropriate equipment.
            </li>
            <li>
              <strong>Administer first aid</strong> once the casualty is clear of the electrical
              source. Check breathing, start CPR if needed, and treat any burns. Use an AED
              (automated external defibrillator) if available.
            </li>
            <li>
              <strong>Report the incident</strong> to the site manager, principal contractor, and
              HSE (if it is a RIDDOR-reportable incident — any electrical injury that results in
              hospitalisation, incapacitation for more than 7 days, or death must be reported).
            </li>
            <li>
              <strong>Preserve the scene</strong> for investigation. Do not re-energise the circuit
              until the cause has been identified and the installation confirmed safe.
            </li>
          </ol>
        </div>
        <p>
          Emergency isolation points should be clearly labelled and accessible to all workers. The
          location of the nearest AED and first aiders should be communicated during site induction.
          Regular emergency drills help ensure all workers know the correct response.
        </p>
      </>
    ),
  },
  {
    id: 'portable-equipment',
    heading: 'Portable Electrical Equipment on Site',
    content: (
      <>
        <p>
          Portable electrical equipment on construction sites is subject to harsher conditions than
          in office or domestic environments. Equipment is exposed to dust, moisture, impact, rough
          handling, and cable abrasion. The failure rate is higher, and the consequences of failure
          are more severe.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily user check:</strong> before each use, the user should visually inspect
                the tool, cable, and plug for damage. Check for exposed conductors, cracked casings,
                loose connections, and damaged switches. Do not use if defective.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal inspection (PAT):</strong> portable equipment on construction sites
                should be formally inspected and tested at intervals determined by risk assessment.
                The IET Code of Practice for In-Service Inspection and Testing suggests weekly for
                110V equipment in harsh environments, though many sites use monthly intervals. See
                our{' '}
                <SEOInternalLink href="/guides/pat-testing-guide-uk">
                  PAT Testing Guide
                </SEOInternalLink>{' '}
                for full details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labelling:</strong> each item of equipment should be labelled with a unique
                asset number and the date of the last formal inspection. A traffic-light system
                (green = in date, red = overdue) is commonly used on construction sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extension leads and adapters:</strong> these are high-failure items on
                construction sites due to rough handling. Inspect regularly. Do not daisy-chain
                extension leads. Use the shortest practical length.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Battery-powered (cordless) tools are increasingly popular on construction sites because
          they eliminate the mains shock risk entirely. Where the task allows, cordless tools are
          the safest option. For tasks that require mains-powered tools, 110V is mandatory.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-site',
    heading: 'Construction Site Safety with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate provides several tools specifically designed for construction site electrical
          work:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI RAMS Generator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate comprehensive Risk Assessment and Method Statements for electrical work
                  on construction sites. CDM-compliant, site-specific, and covering all electrical
                  hazards. Ready to submit to the principal contractor in minutes, not hours.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Temporary Installation Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete EIC and EICR certificates for temporary site installations on your phone.
                  Record all test results with voice entry, capture board photos with AI scanning,
                  and export professional PDFs for the site file.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Stay safe and compliant on site"
          description="Elec-Mate generates RAMS, certificates, and safety documentation for construction site electrical work. AI-powered, mobile-first, and designed for the realities of site work. 7-day free trial."
          icon={HardHat}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConstructionSiteSafetyElectricalPage() {
  return (
    <GuideTemplate
      title="Construction Site Electrical Safety | CDM Guide"
      description="Complete guide to construction site electrical safety for UK electricians. CDM 2015 duties, 110V reduced voltage systems, temporary distribution, cable protection, 3-monthly inspection requirements, emergency procedures, and RAMS for electrical work."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Site Safety Guide"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Construction Site Electrical Safety:{' '}
          <span className="text-yellow-400">The CDM Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about electrical safety on construction sites. CDM 2015 duties, 110V reduced voltage systems, temporary distribution boards, cable protection, 3-monthly inspection requirements, emergency procedures, and how to produce compliant RAMS."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Construction Site Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Generate Site Safety Documentation in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for RAMS, certificates, and safety documentation on construction sites. AI-powered, mobile-first, and CDM-compliant. 7-day free trial, cancel anytime."
    />
  );
}
