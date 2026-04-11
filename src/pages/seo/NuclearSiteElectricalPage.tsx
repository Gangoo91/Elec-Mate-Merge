import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  ClipboardCheck,
  Zap,
  Users,
  FileCheck2,
  Building2,
  Lock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Nuclear Site Electrical', href: '/nuclear-site-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Nuclear Electrical Overview' },
  { id: 'nuclear-vs-conventional-island', label: 'Nuclear Island vs Conventional Island' },
  { id: 'uk-nuclear-sites', label: 'UK Nuclear Sites' },
  { id: 'qa-nuclear-baseline', label: 'QA & Nuclear Baseline' },
  { id: 'security-clearance', label: 'Security Clearance Requirements' },
  { id: 'radiation-protection', label: 'Radiation Protection Awareness' },
  { id: 'qualifications', label: 'ECS Nuclear Card & Qualifications' },
  { id: 'pay-rates', label: 'Pay Rates & Day Rates' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Nuclear site electrical work in the UK is divided into nuclear island (safety-critical, highly controlled) and conventional island (balance-of-plant, similar to heavy industrial) scopes — the distinction determines which QA regime applies to your work.',
  'All contractors on nuclear licensed sites must hold Baseline Personnel Security Standard (BPSS) clearance as a minimum; many roles require Security Check (SC) level clearance, which takes several months to obtain.',
  'The ECS Nuclear Electrical Operative card is the industry-recognised qualification for electricians working on UK nuclear sites — it requires trade qualifications plus site-specific nuclear awareness training.',
  'Nuclear Quality Assurance (QA) requirements — including the Nuclear Baseline — mean that every piece of work must be documented, inspected, and traceable. Non-conformances are formally raised and closed, not quietly corrected.',
  'Radiation Protection Awareness (RPA) training is mandatory before entering controlled or supervised areas. Dosimetry is worn and recorded. Dose limits under the Ionising Radiations Regulations 2017 are strictly enforced.',
  'Premium pay rates of £60–£100+ per hour reflect the security requirements, QA burden, restricted working conditions, and specialist training investment required for nuclear site electrical work.',
];

const faqs = [
  {
    question: 'What qualifications do I need to work as an electrician on a UK nuclear site?',
    answer:
      'At minimum you need a recognised trade qualification (NVQ Level 3 or equivalent), 18th Edition (BS 7671) certification, and the ECS Nuclear Electrical Operative card. The ECS nuclear card requires completing nuclear-specific training including Nuclear Safety Awareness (sometimes called Nuclear Awareness or Nuclear Licence Training) and site induction. Most principal contractors also require 17th or 18th Edition AM2 or equivalent competency evidence. Some roles require additional qualifications such as CompEx for hazardous areas within plant.',
  },
  {
    question: 'What is BPSS clearance and how long does it take?',
    answer:
      'Baseline Personnel Security Standard (BPSS) is the minimum security vetting level for all contractors working on UK nuclear licensed sites. It involves identity verification, employment history checks covering three years, a basic criminal records check, and nationality/immigration status verification. BPSS typically takes two to four weeks to complete if all documentation is in order. Security Check (SC) clearance — required for many roles — takes considerably longer, typically three to six months, and involves a more detailed background investigation.',
  },
  {
    question: 'What is the Nuclear Baseline and why does it matter?',
    answer:
      'The Nuclear Baseline is the overarching Quality Assurance framework applied to safety-related work on UK nuclear licensed sites. It requires that all work affecting nuclear safety be carried out to documented procedures, inspected by qualified personnel, and fully traceable through records. Every task has a work instruction or procedure, every test result is formally recorded, and every non-conformance is formally raised and managed through a corrective action programme. This is significantly more rigorous than industrial QA and represents one of the biggest cultural adjustments for electricians moving from commercial or industrial backgrounds.',
  },
  {
    question:
      'What is the difference between nuclear island and conventional island electrical work?',
    answer:
      'The nuclear island comprises the reactor and its directly associated safety systems — the reactor pressure vessel, primary circuit, emergency core cooling systems, and nuclear safety-classified electrical systems. Work here is subject to the full Nuclear Baseline QA regime and is classified by nuclear safety importance. The conventional island is the balance-of-plant — turbines, generators, transformers, switchgear, and auxiliary systems that are not directly involved in nuclear safety. Conventional island work more closely resembles heavy industrial electrical work, though site security and general nuclear awareness requirements still apply.',
  },
  {
    question: 'What are typical pay rates for nuclear site electricians in the UK?',
    answer:
      'Nuclear site electrical work commands significant pay premiums. Employed rates for experienced nuclear electricians typically range from £45,000 to £70,000 per year. Self-employed contractors and those engaged through umbrella companies typically earn £60 to £100+ per hour depending on experience, clearance level, and the specific site and scope. Major construction projects such as Hinkley Point C often attract higher rates during peak construction periods. These premiums reflect security clearance requirements, QA obligations, specialist training, and the restricted nature of nuclear site working.',
  },
  {
    question: 'Which UK nuclear sites currently have the most electrical contractor demand?',
    answer:
      'Hinkley Point C in Somerset is currently the largest source of nuclear electrical contractor demand in the UK, with thousands of workers on site during peak construction. Sellafield in Cumbria provides sustained long-term demand for electrical contractors due to its ongoing decommissioning programme, which is expected to continue for decades. Sizewell B in Suffolk requires ongoing maintenance contractor support. The NDA (Nuclear Decommissioning Authority) portfolio — which includes Dounreay, Capenhurst, and the Magnox sites — also provides ongoing opportunities.',
  },
  {
    question: 'Do I need radiation protection training before working on a nuclear site?',
    answer:
      'Yes. Before entering controlled or supervised areas on a nuclear licensed site, you must complete Radiation Protection Awareness (RPA) training. This covers the basics of ionising radiation, dose limits under the Ionising Radiations Regulations 2017, the ALARP (As Low As Reasonably Practicable) principle, how to use dosimetry, and what to do in a radiological emergency. This training is typically provided as part of site induction. Your personal dose records are maintained by the site licence holder and you will be issued with a dosimeter when working in designated areas.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/offshore-electrical',
    title: 'Offshore Electrical Engineering',
    description:
      'ATEX hazardous area electrical work on oil and gas platforms — BOSIET, day rates, and rotation patterns.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/petrochemical-electrical',
    title: 'Petrochemical Electrical Installation',
    description:
      'ATEX zone classification, DSEAR compliance, CompEx qualification, and Ex equipment inspection.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/pharmaceutical-electrical',
    title: 'Pharmaceutical Electrical Installation',
    description: 'GMP cleanroom wiring, validation (IQ/OQ/PQ), and FDA 21 CFR compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the Wiring Regulations — amendments, key changes, and compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Nuclear Site Electrical Engineering in the UK',
    content: (
      <>
        <p>
          Nuclear site electrical engineering is among the most demanding and rewarding specialisms
          in the UK electrical industry. The combination of safety-critical systems, rigorous
          Quality Assurance regimes, mandatory security vetting, and specialist training
          requirements creates a significant barrier to entry — and correspondingly premium pay
          rates for those who qualify.
        </p>
        <p>
          The UK civil nuclear sector is managed under a licensing regime administered by the Office
          for Nuclear Regulation (ONR). Nuclear licensed sites must comply with conditions set out
          in their site licence, and contractors working on those sites are subject to site rules
          that go well beyond standard industrial requirements. Electrical work is no exception.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulated by the ONR</strong> — the Office for Nuclear Regulation is
                responsible for nuclear safety and security regulation in the UK. Site licence
                conditions govern how work is planned, executed, and recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NDA portfolio</strong> — the Nuclear Decommissioning Authority (NDA) owns
                and manages 17 nuclear sites across the UK, including Sellafield, Dounreay, and the
                Magnox stations. Many sites are in long-term decommissioning, providing sustained
                contractor demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New build opportunity</strong> — Hinkley Point C in Somerset is the UK's
                first new nuclear power station in a generation. The project employs thousands of
                electrical workers and is expected to be in peak electrical construction through the
                late 2020s.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nuclear-vs-conventional-island',
    heading: 'Nuclear Island vs Conventional Island Electrical Work',
    content: (
      <>
        <p>
          Understanding the distinction between nuclear island and conventional island is
          fundamental to nuclear site electrical work. The two areas have different QA requirements,
          different documentation burdens, and often different pay rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear island</strong> — the reactor building and all systems directly
                associated with nuclear safety: the reactor pressure vessel, primary circuit,
                emergency core cooling systems, post-accident monitoring, safety-classified
                electrical distribution, and associated instrumentation and control. Work in the
                nuclear island is subject to the full Nuclear Baseline QA regime. Every task
                requires a formal work instruction, formal inspection, and complete traceability.
                Nuclear safety classifications (Category A, B, C in UK terminology) determine the
                level of QA rigour applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conventional island</strong> — the balance-of-plant: turbine hall, generator
                transformers, main switchgear, station auxiliary transformers, cooling water
                systems, and other non-safety plant. Conventional island electrical work is closer
                in character to heavy industrial electrical work. While site security and nuclear
                awareness requirements still apply, the QA burden is lower and the work environment
                more familiar to experienced industrial electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety-classified electrical systems</strong> — electrical systems in the
                nuclear island are classified by their importance to nuclear safety. Class 1 systems
                (essential safety systems) typically have requirements for seismic qualification,
                independence from non-safety systems, redundancy, and diversity. Class 2 and Class 3
                systems have progressively lower requirements. Classification drives cable routing,
                separation, fire protection, and testing requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'uk-nuclear-sites',
    heading: 'Major UK Nuclear Sites for Electrical Contractors',
    content: (
      <>
        <p>
          The UK has nuclear sites at various stages of operation, construction, and
          decommissioning, each offering distinct opportunities for electrical contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hinkley Point C, Somerset</strong> — EDF Energy's new-build project, the
                first new nuclear power station in the UK for over 30 years. Two EPR reactors under
                construction. Employs thousands of electrical contractors and is the largest current
                source of nuclear electrical work in the UK. The project is expected to sustain
                significant electrical contractor demand through the late 2020s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sellafield, Cumbria</strong> — the UK's most complex nuclear site, operated
                by Sellafield Ltd on behalf of the NDA. Processing, storage, and decommissioning
                operations across hundreds of facilities. Sustained long-term electrical contractor
                demand — the decommissioning programme is expected to continue well into the second
                half of this century. Access requires security clearance and site-specific vetting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sizewell B, Suffolk</strong> — the UK's only currently operating pressurised
                water reactor, operated by EDF Energy. Requires ongoing maintenance electrical
                contractor support. Planning permission for Sizewell C (two additional EPR units)
                was granted, which would create a major new source of electrical construction demand
                in the future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NDA estate</strong> — the wider NDA portfolio includes Dounreay in
                Caithness, Capenhurst in Cheshire, Winfrith in Dorset, and the Magnox stations at
                Berkeley, Bradwell, Dungeness, Hinkley Point A, Hunterston, Oldbury, Trawsfynydd,
                and Wylfa. All are in various stages of decommissioning and require ongoing
                electrical contractor support.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qa-nuclear-baseline',
    heading: 'Quality Assurance & the Nuclear Baseline',
    content: (
      <>
        <p>
          The Nuclear Baseline is the most significant cultural and procedural difference between
          nuclear site electrical work and conventional electrical contracting. Understanding and
          embracing the QA culture is essential to working effectively on nuclear sites.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work to procedure</strong> — every task is governed by a formal work
                instruction or procedure. Deviations from the procedure must be formally authorised.
                Workers are expected to stop and raise a query if they cannot follow the procedure
                as written, rather than improvise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independent verification</strong> — safety-classified electrical
                connections, terminations, and installations are independently verified (checked by
                a second qualified person who was not involved in the original work). This is
                mandatory for nuclear safety-classified systems and is formally documented.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formal non-conformance management</strong> — if a defect or deviation from
                specification is discovered, it must be formally raised as a non-conformance report
                (NCR) or equivalent. The non-conformance is then investigated, dispositioned (by
                authorised engineers), and formally closed. Covering up a defect or correcting it
                without raising a formal non-conformance is a serious disciplinary matter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Traceability</strong> — all materials and components used on nuclear
                safety-classified systems must be traceable to their origin. Cable drum numbers,
                equipment batch numbers, and calibration certificates for test equipment are all
                formally recorded. This traceability supports the site's ability to investigate any
                future issues and demonstrate compliance to the ONR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians transitioning from commercial or industrial backgrounds often find the
          Nuclear Baseline QA culture the most challenging aspect of nuclear site work. The
          paperwork burden is significant, but it exists for good reason — and with experience,
          working to formal procedures becomes second nature.
        </p>
      </>
    ),
  },
  {
    id: 'security-clearance',
    heading: 'Security Clearance: BPSS and SC Level',
    content: (
      <>
        <p>
          All contractors working on UK nuclear licensed sites require security clearance. The level
          required depends on the site, the area of work, and the specific role.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BPSS (Baseline Personnel Security Standard)</strong> — the minimum clearance
                level required for all contractors on nuclear licensed sites. Covers identity
                verification, three-year employment history check, basic criminal records check, and
                nationality/immigration status. Typically takes two to four weeks. Sponsored by the
                principal contractor or site operator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SC (Security Check)</strong> — required for many roles on nuclear sites,
                particularly those with access to sensitive areas or information. SC involves a more
                thorough background investigation including financial checks and interviews. Takes
                three to six months and requires sponsorship. SC clearance is recognised across
                government and is portable between sponsors within its validity period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CNI (Civil Nuclear Industry) vetting</strong> — some roles at nuclear
                licensed sites, particularly those involving sensitive nuclear material or
                information, may require Civil Nuclear Industry vetting in addition to BPSS or SC.
                This is administered by the Civil Nuclear Constabulary (CNC) and the site licence
                holder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planning ahead</strong> — security clearance takes time and cannot be
                rushed. Electricians intending to move into nuclear work should begin the BPSS or SC
                process as early as possible — ideally before their first nuclear contract is in
                place. Some principal contractors and nuclear labour agencies can sponsor clearance
                in advance of a specific placement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'radiation-protection',
    heading: 'Radiation Protection Awareness',
    content: (
      <>
        <p>
          Working on a nuclear licensed site does not necessarily mean being exposed to ionising
          radiation — much of the conventional island and support infrastructure involves no
          radiological hazard whatsoever. However, electricians may encounter controlled and
          supervised areas where radiation protection requirements apply, and all site personnel
          must complete Radiation Protection Awareness (RPA) training before site access.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ionising Radiations Regulations 2017 (IRR17)</strong> — the primary UK
                legislation governing radiation protection at work. Sets dose limits: 20mSv/year for
                classified workers (averaged over five years, with 50mSv in any single year) and
                1mSv/year for members of the public. Most nuclear site electrical contractors
                receive doses well below these limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ALARP principle</strong> — doses must be kept As Low As Reasonably
                Practicable. This means work planning takes account of dose implications, time in
                radiation areas is minimised, shielding is used where appropriate, and alternatives
                to working in higher-dose areas are considered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dosimetry</strong> — when working in designated areas, contractors wear
                personal dosimeters. Thermoluminescent dosimeters (TLDs) measure cumulative dose
                over time. Electronic Personal Dosimeters (EPDs) provide real-time dose rate
                monitoring. Doses are recorded and retained by the site licence holder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RPA training content</strong> — basics of ionising radiation, types of
                radiation and their penetrating power, dose units (Sievert, Gray), dose limits,
                ALARP, controlled and supervised area rules, dosimetry use, contamination control,
                emergency procedures, and the role of the Radiation Protection Adviser.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'ECS Nuclear Card & Specialist Qualifications',
    content: (
      <>
        <p>
          The Electrotechnical Certification Scheme (ECS) Nuclear Electrical Operative card is the
          industry-recognised qualification for electricians working on UK nuclear sites. It is
          required by most principal contractors as a condition of employment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS Nuclear Electrical Operative card</strong> — requires a recognised trade
                qualification (NVQ Level 3 / SVQ Level 3 or equivalent), current 18th Edition (BS
                7671) certification, and completion of nuclear-specific training. The card
                demonstrates both electrical competence and nuclear awareness to site operators and
                principal contractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuclear Safety Awareness training</strong> — typically a one to two day
                course covering the nuclear licensing regime, nuclear safety principles, the Nuclear
                Baseline, radiation protection awareness, and site-specific requirements.
                Certificates are typically valid for three to five years and must be renewed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>City & Guilds 2391 / 2394/2395</strong> — inspection and testing
                qualifications are valued on nuclear sites where periodic testing of safety systems
                and emergency equipment is part of the maintenance programme. The ability to carry
                out formal inspection and testing to BS 7671 Section 631 is an asset for nuclear
                site electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx</strong> — some areas of nuclear sites, particularly fuel handling
                areas and chemical storage areas, may be classified as hazardous areas under
                ATEX/DSEAR. The{' '}
                <SEOInternalLink href="/petrochemical-electrical">
                  CompEx qualification
                </SEOInternalLink>{' '}
                is required for electrical work in these zones, and broadens the nuclear
                electrician's scope significantly.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pay-rates',
    heading: 'Pay Rates for Nuclear Site Electricians (2026)',
    content: (
      <>
        <p>
          Nuclear site electrical work commands some of the highest rates in the UK electrical
          industry, reflecting the security requirements, QA obligations, specialist training
          investment, and restricted working conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employed nuclear electrician</strong> — £45,000 to £70,000 per year
                depending on experience, site, and specific role. Senior positions such as lead
                electrical engineer or commissioning engineer command £65,000 to £90,000+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-employed / Ltd company contractor</strong> — £60 to £100+ per hour.
                Major new-build projects such as Hinkley Point C have historically attracted rates
                of £70 to £90/hr for experienced nuclear electrical contractors during peak
                construction phases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overtime and shift premiums</strong> — nuclear sites frequently operate
                shift patterns and overtime, with shift allowances and overtime premiums on top of
                basic rates. A 10-hour day rate plus shift premium can effectively increase the
                equivalent hourly rate significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accommodation and travel</strong> — many UK nuclear sites are in remote
                locations (Sellafield in west Cumbria, Hinkley Point on the Somerset coast, Dounreay
                in Caithness). Principal contractors typically pay accommodation allowances or
                provide site accommodation, in addition to travel allowances.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The investment in security clearance, specialist training, and the time required to
          develop familiarity with nuclear QA culture is significant. However, for experienced
          electricians willing to make that investment, nuclear site work offers some of the most
          financially rewarding and professionally interesting opportunities in the UK electrical
          sector.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Breaking Into Nuclear Site Work',
    content: (
      <>
        <p>
          Moving into nuclear site electrical work requires planning and patience. The security
          clearance process, specialist training, and QA culture adjustment all take time — but the
          rewards are substantial for those who commit to it.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Route to Your First Nuclear Contract</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ensure your ECS card is current, obtain your 18th Edition certification, and
                  identify a nuclear-specialist labour agency or principal contractor willing to
                  sponsor your BPSS clearance. Hinkley Point C is the most accessible entry point
                  for electricians new to the nuclear sector due to the volume of work and the
                  number of principal contractors operating on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Your Certifications Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  Nuclear sites require evidence of current qualifications at all times. Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate</SEOInternalLink> to
                  keep all your certificates, test records, and qualifications organised and
                  accessible — site access can be refused if you cannot demonstrate current
                  certification when required.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your nuclear site qualifications with Elec-Mate"
          description="Keep your ECS card, 18th Edition certification, nuclear awareness certificates, and test records organised in one place. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NuclearSiteElectricalPage() {
  return (
    <GuideTemplate
      title="Nuclear Site Electrical Engineering UK | Nuclear Industry Guide"
      description="Complete guide to nuclear site electrical engineering in the UK — nuclear island vs conventional island, QA Nuclear Baseline, BPSS/SC security clearance, ECS nuclear card, radiation protection, and pay rates of £60–£100+/hr."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Nuclear Site Electrical Engineering UK:{' '}
          <span className="text-yellow-400">The Complete Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about nuclear site electrical work — nuclear island vs conventional island, the Nuclear Baseline QA regime, BPSS and SC security clearance, ECS nuclear card, radiation protection awareness, UK nuclear sites, and premium pay rates of £60–£100+ per hour."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Nuclear Site Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Nuclear Site Qualifications with Elec-Mate"
      ctaSubheading="Keep your ECS card, nuclear awareness certificates, 18th Edition certification, and test records organised and accessible. 7-day free trial, cancel anytime."
    />
  );
}
