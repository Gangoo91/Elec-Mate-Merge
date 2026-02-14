import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  FileCheck2,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Scale,
  ClipboardCheck,
  PoundSterling,
  GraduationCap,
  Send,
  Brain,
  HardHat,
  Receipt,
  Calculator,
  Flame,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Commercial EICR', href: '/guides/eicr-for-commercial-premises' },
];

const tocItems = [
  { id: 'what-is-commercial-eicr', label: 'What Is a Commercial EICR?' },
  { id: 'legal-framework', label: 'Legal Framework' },
  { id: 'employer-duties', label: 'Employer Duties' },
  { id: 'inspection-intervals', label: 'Inspection Intervals' },
  { id: 'insurance-requirements', label: 'Insurance Requirements' },
  { id: 'penalties-consequences', label: 'Penalties and Consequences' },
  { id: 'scope-complexity', label: 'Scope and Complexity' },
  { id: 'what-inspectors-check', label: 'What Inspectors Check' },
  { id: 'for-electricians', label: 'For Electricians Doing Commercial EICRs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989 require employers to maintain electrical systems in a safe condition — a valid EICR for commercial premises is the primary way to demonstrate compliance with these legal obligations.',
  'The standard inspection interval for commercial premises is every 5 years, as recommended by BS 7671 and IET Guidance Note 3. Higher-risk environments (industrial premises, construction sites, swimming pools) may require more frequent inspections.',
  'Employers who fail to maintain safe electrical installations can face criminal prosecution under the Health and Safety at Work Act, with unlimited fines and up to 2 years imprisonment for serious breaches. The Corporate Manslaughter and Corporate Homicide Act 2007 can apply if a death results.',
  'Insurance policies for commercial premises almost universally require a valid EICR. Failure to maintain one can invalidate the policy, leaving the business exposed to fire damage claims, personal injury claims, and business interruption losses.',
  'Elec-Mate handles commercial EICRs with multi-board support, unlimited circuits, AI board scanning for commercial distribution boards, voice test entry, remedial quoting, and instant certificate delivery to building managers and facility teams.',
];

const faqs = [
  {
    question: 'Is an EICR legally required for commercial premises?',
    answer:
      'While there is no single regulation that says "you must have an EICR for commercial premises" in the way that the 2020 Regulations explicitly require one for rented residential properties, the practical effect of the Health and Safety at Work Act 1974, the Electricity at Work Regulations 1989, and the Management of Health and Safety at Work Regulations 1999 is that employers must maintain their electrical installations in a safe condition and must be able to demonstrate this. An EICR carried out by a qualified and competent person at appropriate intervals is the recognised method of demonstrating compliance. The Health and Safety Executive (HSE) guidance (HSG85 — Electricity at Work: Safe Working Practices) and IET Guidance Note 3 both recommend periodic inspection and testing as the standard approach. In the event of an electrical incident, fire, or HSE investigation, the absence of a valid EICR would be strong evidence that the employer failed to meet their statutory duty to maintain the electrical installation.',
  },
  {
    question: 'How often should a commercial EICR be carried out?',
    answer:
      'IET Guidance Note 3 (9th Edition) provides recommended intervals for periodic inspection based on the type of premises. For commercial premises (offices, shops, retail), the recommended maximum interval is 5 years. For industrial premises, the recommended interval is 3 years. For special installations — swimming pools, construction site installations, petrol filling stations, agricultural premises, and caravan parks — intervals of 1 to 3 years are recommended. These are maximum intervals — the inspector may recommend a shorter interval based on the condition of the installation. The previous EICR should state the recommended date for the next inspection. If the installation is in poor condition or has a history of faults, more frequent inspection is appropriate. Many commercial insurers now require evidence of a valid EICR dated within the last 5 years as a condition of cover.',
  },
  {
    question: 'Who is responsible for the EICR in a leased commercial property?',
    answer:
      'The responsibility depends on the terms of the lease. In a full repairing and insuring (FRI) lease — the most common type of commercial lease — the tenant is typically responsible for maintaining the interior of the building, which includes the electrical installation. The landlord retains responsibility for the structure and common areas. In a standard lease, the landlord may retain responsibility for the electrical installation, particularly in multi-tenanted buildings where the main distribution is shared. In practice, the employer who occupies the premises has the overarching duty under the Health and Safety at Work Act to ensure the safety of their employees, regardless of lease terms. If the lease makes the landlord responsible for the installation but the installation is unsafe, the employer still has a duty to take action — by notifying the landlord and, if necessary, restricting use of the unsafe parts of the installation. The key is to read the lease, understand who is responsible for what, and ensure someone is commissioning the EICR at the appropriate interval.',
  },
  {
    question: 'Can an EICR shut down a business?',
    answer:
      'In extreme cases, yes. If an EICR reveals C1 (Danger Present) defects, the inspector has a duty to make the installation safe before leaving. This may involve isolating dangerous circuits, which could affect essential equipment. If the defects are widespread — for example, the main distribution board is in a dangerous condition, or the main earthing is defective — the inspector may need to isolate the entire supply until remedial work is carried out. In practice, experienced inspectors work with the business to manage the impact — isolating individual circuits rather than the whole supply where possible, and scheduling remedial work to minimise disruption. However, safety takes priority over convenience. If the installation is genuinely dangerous, it must be made safe immediately. This is another reason to maintain regular EICRs — catching deterioration early prevents the scenario where a long-overdue inspection reveals critical defects that require emergency action.',
  },
  {
    question: 'What is the difference between a domestic and commercial EICR?',
    answer:
      'The EICR form and testing procedures are the same — they follow the model forms in Appendix 6 of BS 7671 and the testing requirements of Chapter 6 (Inspection and Testing). The difference is in scale and complexity. A domestic EICR typically covers a single consumer unit with 6 to 20 circuits and takes 2 to 4 hours. A commercial EICR may cover multiple distribution boards, sub-distribution boards, and hundreds of circuits across a large building. Three-phase systems, busbar trunking, rising mains, motor circuits, fire alarm supplies, emergency lighting supplies, and UPS systems all add complexity. The testing is more involved — three-phase earth fault loop impedance measurements, prospective fault current at multiple points in the installation, and verification of discrimination between protective devices at different levels of the distribution hierarchy. A commercial EICR for a medium-sized office building might take 2 to 3 days. A large industrial site might take a week or more. The price reflects this complexity — commercial EICRs typically cost £500 to £5,000 depending on the size and complexity of the installation.',
  },
  {
    question: 'Do I need separate fire alarm and emergency lighting inspections?',
    answer:
      'Yes. The EICR covers the fixed electrical installation — the wiring, distribution boards, protective devices, socket outlets, light fittings, and fixed equipment. Fire alarm systems and emergency lighting systems are specialist installations that require their own inspections and certificates. Fire alarm systems must be inspected and serviced in accordance with BS 5839-1 (for non-domestic premises), typically every 6 months for a service visit and annually for a full inspection and test. Emergency lighting systems must be tested in accordance with BS 5266, with monthly function tests and annual full-duration tests. These inspections should be carried out by persons competent in fire alarm and emergency lighting systems — which may or may not be the same electrician carrying out the EICR. The EICR inspector should note the presence of fire alarm and emergency lighting systems and check that the supply circuits are satisfactory, but the detailed inspection and testing of these systems is covered by separate certificates.',
  },
  {
    question: 'What happens if we refuse to let the inspector test during business hours?',
    answer:
      'Some commercial EICRs can be carried out entirely during business hours with minimal disruption — particularly the visual inspection and live testing. However, dead testing (insulation resistance, continuity of protective conductors) requires circuits to be isolated, which may affect lighting, IT equipment, and other critical systems. If the business cannot tolerate disruption during working hours, the inspection can be scheduled for evenings, weekends, or planned shutdown periods. Many commercial electricians offer out-of-hours EICR services specifically for this reason. The cost is higher (reflecting out-of-hours labour rates), but the disruption to the business is eliminated. What you should not do is refuse to have the inspection carried out at all. The employer has a legal duty to maintain the installation, and avoiding the EICR does not remove the risk — it simply means the risk goes unidentified until something goes wrong.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/commercial-electrician-guide',
    title: 'Commercial Electrician Guide',
    description:
      'Complete guide to commercial electrical work — qualifications, pricing, CDM, and Elec-Mate tools.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Landlord EICR requirements under the Electrical Safety Standards 2020, penalties, and deadlines.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI classification codes with real-world examples and remedial guidance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839-1 compliance, system categories, design standards, and digital fire alarm certification.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing strategies for commercial and domestic work, with AI-powered cost engineering.',
    icon: PoundSterling,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-commercial-eicr',
    heading: 'What Is a Commercial EICR?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) for commercial premises is a formal
          document produced by a qualified electrician following a periodic inspection and testing
          of the fixed electrical installation in a non-domestic building. It covers offices, shops,
          restaurants, warehouses, factories, schools, hospitals, leisure centres, and any other
          premises used for commercial, industrial, or institutional purposes.
        </p>
        <p>
          The EICR follows the same model forms as domestic inspections (set out in Appendix 6 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          ), but commercial inspections are significantly more complex. They typically involve
          three-phase distribution systems, multiple distribution boards, sub-distribution boards,
          hundreds of circuits, motor control centres, and specialist systems such as fire alarm
          supplies and emergency lighting.
        </p>
        <p>
          The purpose is the same as a domestic EICR: to assess the condition of the electrical
          installation, identify any defects that could pose a risk of injury or fire, and provide a
          clear record of the installation's condition at the time of inspection. The difference is
          in the scale, the complexity, and the legal framework that drives the requirement.
        </p>
      </>
    ),
  },
  {
    id: 'legal-framework',
    heading: 'The Legal Framework for Commercial Electrical Safety',
    content: (
      <>
        <p>
          Unlike{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            rented residential properties
          </SEOInternalLink>{' '}
          (where the Electrical Safety Standards 2020 explicitly require an EICR), commercial
          premises are governed by a broader set of legislation. The key statutes are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — Section 2 places a general
                duty on employers to ensure, so far as is reasonably practicable, the health,
                safety, and welfare of all employees. Section 3 extends this duty to non-employees
                who may be affected by the employer's activities — visitors, customers, contractors,
                and members of the public. Maintaining the electrical installation in a safe
                condition is a fundamental part of this duty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Regulation 4(2) states that
                all systems shall be maintained so as to prevent danger, so far as is reasonably
                practicable. This is the regulation that most directly requires periodic inspection
                and testing of the electrical installation. The HSE's Memorandum of Guidance on the
                Electricity at Work Regulations (HSR25) confirms that regular inspection and testing
                is a key component of an electrical maintenance regime.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999</strong> —
                Regulation 3 requires employers to carry out suitable and sufficient risk
                assessments. The electrical installation is a significant hazard in any commercial
                premises, and the EICR is the primary means of assessing the risk from the fixed
                electrical system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — the responsible person
                (usually the employer or building owner) must carry out a fire risk assessment and
                take measures to reduce fire risk. Electrical faults are a leading cause of
                commercial fires, and the EICR directly addresses this risk by identifying
                electrical defects that could cause a fire.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combined effect of these regulations is clear: employers have a legal duty to maintain
          their electrical installation in a safe condition, and the EICR is the recognised standard
          method of demonstrating compliance. The absence of a valid EICR in a commercial premises
          is strong evidence of a failure to meet statutory obligations.
        </p>
      </>
    ),
  },
  {
    id: 'employer-duties',
    heading: 'Employer Duties Under the Electricity at Work Regulations',
    content: (
      <>
        <p>
          The Electricity at Work Regulations 1989 place specific duties on the "duty holder" —
          which in most commercial premises is the employer. The key regulations affecting
          electrical maintenance and inspection are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 4(2) — Maintenance</strong> — "As may be necessary to prevent
                danger, all systems shall be maintained so as to prevent, so far as is reasonably
                practicable, such danger." This means the electrical installation must be kept in a
                condition that prevents it from becoming a source of danger. The EICR is the tool
                for assessing whether this duty is being met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 16 — Competence</strong> — "No person shall be engaged in any
                work activity where technical knowledge or experience is necessary to prevent danger
                or, where appropriate, injury, unless he possesses such knowledge or experience, or
                is under such degree of supervision as may be appropriate." This means the EICR must
                be carried out by a competent person — a qualified electrician with the appropriate
                inspection and testing qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 12 — Safe working conditions</strong> — requires adequate working
                space, access, and lighting at electrical equipment. The EICR inspector may note
                deficiencies in access to distribution boards and switchgear as observations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The employer must also keep records of inspection and testing. While the Regulations do
          not explicitly mandate record-keeping, the HSE Memorandum of Guidance states that records
          should be kept throughout the life of the installation and should include the EICR, any
          certificates for remedial work, and records of maintenance activities. In the event of an
          HSE investigation, the inability to produce records of electrical maintenance is strong
          evidence of non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-intervals',
    heading: 'Inspection Intervals: The 5-Year Cycle',
    content: (
      <>
        <p>
          IET Guidance Note 3 (Inspection & Testing, 9th Edition) provides recommended maximum
          intervals for periodic inspection based on the type of installation. These are guidelines,
          not legally mandated intervals — but they represent the industry standard that courts, the
          HSE, and insurers will reference.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises (offices, shops, retail): 5 years</strong> — this is the
                standard interval for most commercial buildings with normal risk levels and typical
                use patterns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial premises (factories, workshops): 3 years</strong> — the shorter
                interval reflects the harsher environment, higher mechanical stress on the
                installation, and greater risk from equipment such as motors and drives.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leisure and entertainment venues: 3 years</strong> — theatres, cinemas,
                nightclubs, and similar venues with temporary wiring, decorative lighting, and high
                public occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swimming pools, saunas: 1 year</strong> — the combination of water and
                electricity creates extreme risk. Annual inspection is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction site installations: 3 months</strong> — temporary installations
                in harsh environments with constant change. Very frequent inspection is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agricultural and horticultural: 3 years</strong> — corrosive environments,
                outdoor equipment, and animal housing create accelerated deterioration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval based on the condition of the installation.
          If the installation is ageing, has had previous unsatisfactory reports, or is in a
          particularly harsh environment, a 3-year interval for a commercial building or a 1-year
          interval for an industrial site may be appropriate. The recommended next inspection date
          is recorded on the EICR.
        </p>
      </>
    ),
  },
  {
    id: 'insurance-requirements',
    heading: 'Insurance Requirements',
    content: (
      <>
        <p>
          Commercial insurance is one of the most powerful drivers of EICR compliance. Insurance
          policies for commercial premises almost universally include conditions relating to
          electrical safety, and failure to meet these conditions can invalidate the policy
          entirely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building and contents insurance</strong> — most policies require the
                electrical installation to be maintained in accordance with current standards and
                inspected at appropriate intervals. A fire caused by an electrical fault in a
                building without a valid EICR may result in the insurer declining the claim. For a
                commercial building, this could mean millions of pounds in uninsured losses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer's liability insurance</strong> — a legal requirement for any
                business with employees. If an employee is injured by an electrical fault and the
                employer cannot demonstrate that the installation was properly maintained and
                inspected, the insurer may seek to limit their liability or increase future
                premiums.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — covers injury to visitors, customers,
                and members of the public. An electrical injury in commercial premises without a
                valid EICR would significantly strengthen a compensation claim against the business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business interruption insurance</strong> — covers loss of income if the
                business cannot operate due to an insured event. If the cause is an electrical fire
                in a building without a valid EICR, the interruption claim may also be declined.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many commercial insurance brokers now ask specifically whether a valid EICR is in place
          when providing quotes. Some offer premium discounts for properties with a current
          Satisfactory EICR. The cost of the EICR is tiny compared to the potential loss of
          insurance cover — this is a powerful argument when discussing EICRs with commercial
          clients.
        </p>
        <SEOAppBridge
          title="Professional EICR for commercial clients"
          description="Elec-Mate produces professional commercial EICRs that satisfy insurers, the HSE, and building managers. Multi-board support, unlimited circuits, AI board scanning, and instant PDF delivery. The EICR the client needs, delivered on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'penalties-consequences',
    heading: 'Penalties and Consequences',
    content: (
      <>
        <p>
          The consequences of failing to maintain a commercial electrical installation can be
          severe. Unlike the civil penalty regime for residential properties (maximum £30,000), the
          penalties for commercial non-compliance operate primarily through criminal law.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act — unlimited fines</strong> — breaches of
                health and safety legislation tried in the Crown Court can result in unlimited
                fines. The Sentencing Council's Health and Safety Offences guidelines consider the
                level of culpability, the risk of harm, and the turnover of the organisation when
                determining the fine. For large organisations, fines of hundreds of thousands or
                millions of pounds are possible for serious failures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Imprisonment — up to 2 years</strong> — individuals (directors, managers,
                and others who consented to or connived at the offence) can be personally
                prosecuted. The maximum sentence for health and safety offences is 2 years
                imprisonment for serious breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corporate Manslaughter</strong> — if a death results from a gross breach of
                a duty of care by the organisation, the Corporate Manslaughter and Corporate
                Homicide Act 2007 can apply. Penalties include unlimited fines, publicity orders
                (requiring the organisation to publicise its conviction), and remedial orders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HSE enforcement notices</strong> — the HSE can issue Improvement Notices
                (requiring specific improvements within a set timescale) or Prohibition Notices
                (immediately stopping a dangerous activity or shutting down a dangerous
                installation). Failure to comply with a notice is a criminal offence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Beyond criminal penalties, the civil liability exposure is significant. An employee or
          member of the public injured by an electrical fault can bring a personal injury claim. A
          fire caused by an electrical defect can result in property damage claims, business
          interruption claims, and potential claims from neighbouring properties. Without a valid
          EICR demonstrating that the installation was properly maintained, the employer's position
          in any litigation is severely weakened.
        </p>
      </>
    ),
  },
  {
    id: 'scope-complexity',
    heading: 'Scope and Complexity of Commercial EICRs',
    content: (
      <>
        <p>
          Commercial EICRs are substantially more complex than{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">domestic inspections</SEOInternalLink>
          . The scope of the inspection depends on the size and type of the installation, but
          typically includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switchgear and incoming supply</strong> — verification of the incoming
                supply characteristics, main switchgear condition, main protective devices, main
                earthing conductor, main bonding conductors, and earth electrode (where applicable).
                Three-phase supplies require measurement of all three phases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution hierarchy</strong> — main distribution boards, sub-main cables,
                sub-distribution boards, and final circuit distribution. Each board must be
                inspected and all circuits tested. In a large building, this can involve dozens of
                boards and hundreds of circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase testing</strong> —{' '}
                <SEOInternalLink href="/guides/earth-fault-loop-explained">
                  earth fault loop impedance
                </SEOInternalLink>{' '}
                on all three phases at each board, prospective fault current measurements, phase
                rotation checks, and verification of phase sequence on three-phase equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist circuits</strong> — fire alarm supply circuits, emergency
                lighting supply circuits, UPS systems, server room power, motor circuits, external
                lighting, and any other specialist installations. These circuits have specific
                requirements that the inspector must check.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A commercial EICR for a medium-sized office building (20 to 50 circuits across 2 to 3
          distribution boards) typically takes 1 to 2 days. A larger installation with multiple
          floors, multiple boards, and specialist systems can take 3 to 5 days or more. The
          inspection should be carefully planned to minimise disruption — agreeing which circuits
          can be isolated during the working day and which need to be tested out of hours.
        </p>
      </>
    ),
  },
  {
    id: 'what-inspectors-check',
    heading: 'What the Inspector Checks',
    content: (
      <>
        <p>
          The inspection follows the same systematic approach as a domestic EICR, but the commercial
          context adds additional items. The inspector will check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — condition of all distribution boards, cables,
                containment, accessories, and fixed equipment. Checking for damage, deterioration,
                overheating, water ingress, and non-compliance with BS 7671. In a commercial
                building, visual inspection includes areas above suspended ceilings, cable routes
                through risers, external installations, plant rooms, and service ducts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> —{' '}
                <SEOInternalLink href="/guides/continuity-testing-r1r2">
                  continuity of protective conductors
                </SEOInternalLink>{' '}
                (R1+R2 and R2 for ring circuits),{' '}
                <SEOInternalLink href="/guides/insulation-resistance-test">
                  insulation resistance
                </SEOInternalLink>{' '}
                (phase-to-neutral, phase-to-earth, neutral-to-earth), and polarity. Dead testing
                requires circuits to be isolated, which is the primary source of disruption during a
                commercial EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance (Zs) at the most remote
                point of each circuit, prospective fault current (Ipf) at each distribution board
                and at the origin, and{' '}
                <SEOInternalLink href="/guides/rcd-testing-guide">RCD operation</SEOInternalLink>{' '}
                (trip time and trip current for all RCDs). Live testing can generally be carried out
                without disrupting the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observation codes</strong> — the inspector records any defects using the
                standard{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                  observation codes
                </SEOInternalLink>
                : C1 (Danger Present), C2 (Potentially Dangerous), C3 (Improvement Recommended), and
                FI (Further Investigation Required). Any C1 or C2 codes make the report
                Unsatisfactory.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians Doing Commercial EICRs',
    content: (
      <>
        <p>
          Commercial EICRs are one of the most profitable areas of electrical work. The 5-year cycle
          creates a predictable pipeline of repeat business, the fees reflect the complexity and
          time involved, and every Unsatisfactory report generates remedial work. Here is how
          Elec-Mate makes commercial EICRs more efficient and more profitable:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Multi-Board, Unlimited Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Add as many distribution boards as the installation has. Record hundreds of
                  circuit test results across the full distribution hierarchy. The EICR module
                  handles commercial-scale installations without limitations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Point your phone at any commercial distribution board. The AI reads MCB and RCBO
                  ratings, circuit descriptions, and board layout. Saves time on the board schedule
                  — especially valuable on large commercial installations with dozens of ways.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Remedial Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every defect observation feeds into the AI Cost Engineer. Price the remedial work
                  — materials, labour, and margin — and hand the building manager the EICR and a
                  quote for the remedials before you leave the building. Win the remedial work on
                  the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed EICR as a professional PDF by email or WhatsApp directly from
                  site. Attach the remedial quote. Send an invoice for the inspection. The building
                  manager has everything before you leave the car park.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Three-Phase Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Verify Zs values against BS 7671 maximum values for three-phase circuits, check
                  prospective fault current, and confirm cable sizes. All the calculation tools you
                  need for commercial inspections, on your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Commercial EICRs on your phone"
          description="Join 430+ UK electricians using Elec-Mate for commercial EICR certificates. Multi-board support, AI board scanning, voice entry, remedial quoting, and instant delivery. 7-day free trial."
          icon={Building}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRForCommercialPremisesPage() {
  return (
    <GuideTemplate
      title="EICR for Commercial Premises | Requirements UK"
      description="Complete guide to EICR requirements for commercial premises in the UK. Health and Safety at Work Act obligations, Electricity at Work Regulations 1989, employer duties, 5-year inspection cycle, insurance requirements, penalties, and what electricians need to know."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          EICR for Commercial Premises:{' '}
          <span className="text-yellow-400">Legal Requirements and Employer Duties UK</span>
        </>
      }
      heroSubtitle="The Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989 require employers to maintain safe electrical installations. The EICR is the recognised standard for demonstrating compliance. Unlimited fines, imprisonment, and insurance invalidation are the consequences of failure."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Commercial EICRs"
      relatedPages={relatedPages}
      ctaHeading="Commercial EICR Certificates on Your Phone"
      ctaSubheading="Multi-board support, unlimited circuits, AI board scanning, voice test entry, remedial quoting, and instant delivery. Professional commercial EICRs. 7-day free trial."
    />
  );
}
