import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  HardHat,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  BookOpen,
  Users,
  FileCheck2,
  Zap,
  GraduationCap,
  Shield,
  BadgeCheck,
  Megaphone,
  Wrench,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Construction Site Safety', href: '/guides/construction-site-safety' },
];

const tocItems = [
  { id: 'site-induction', label: 'Site Induction' },
  { id: 'cdm-duties', label: 'CDM 2015 Duties' },
  { id: 'cscs-requirements', label: 'CSCS Requirements' },
  { id: 'ppe-requirements', label: 'PPE Requirements' },
  { id: 'permit-systems', label: 'Permit to Work Systems' },
  { id: 'welfare-facilities', label: 'Welfare Facilities' },
  { id: 'electrical-hazards', label: 'Electrical Hazards on Site' },
  { id: 'toolbox-talks', label: 'Toolbox Talks' },
  { id: 'reporting-incidents', label: 'Reporting Incidents' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every electrician working on a construction site must complete a site-specific induction before starting work, covering hazards, emergency procedures, and site rules.',
  'Under CDM 2015, electricians are classified as "workers" or "contractors" with specific duties including cooperation with the principal contractor and reporting unsafe conditions.',
  'A valid CSCS card is required on virtually all UK construction sites — most electricians need the Gold (Skilled Worker) card with a current JIB or ECS registration.',
  'PPE requirements typically include hard hat, hi-vis vest, safety boots with steel toe caps, eye protection, and hearing protection depending on the task being performed.',
  'Elec-Mate includes a built-in RAMS generator and site safety toolbox talk library, letting electricians produce compliant documentation on site in minutes.',
];

const faqs = [
  {
    question: 'What CSCS card does an electrician need for construction sites?',
    answer:
      'Most qualified electricians need the Gold (Skilled Worker) CSCS card, which is obtained through the JIB or ECS (Electrotechnical Certification Scheme). To get the card, you need a relevant NVQ Level 3 or equivalent qualification, a current AM2 assessment, and you must pass the CITB Health, Safety and Environment (HS&E) test. Apprentices can hold a Red (Trainee) card. The card must be renewed every 5 years, and you must pass the HS&E test again at each renewal. Some sites accept ECS cards directly without a separate CSCS card, but many principal contractors require the actual CSCS-branded card. Always check the site requirements before your first day.',
  },
  {
    question: "What are an electrician's duties under CDM 2015?",
    answer:
      'Under the Construction (Design and Management) Regulations 2015, an electrician working on site has duties as a "worker" under Regulation 14. These include: cooperating with the principal contractor and other workers on health and safety matters; reporting anything likely to endanger health or safety; not interfering with or misusing anything provided for health, safety, or welfare; and complying with directions given by the principal contractor or principal designer. If you are self-employed and engaged directly by the client as a contractor, you also have duties under Regulation 15, including planning, managing, and monitoring your own work to ensure it is carried out without risk to health and safety. CDM applies to all construction work in the UK, not just large sites.',
  },
  {
    question: 'Do I need a permit to work for electrical tasks on a construction site?',
    answer:
      'Not all electrical tasks require a formal permit to work, but many do — particularly any work that involves isolation of existing supplies, work near live conductors, work at height, work in confined spaces, or hot work (such as using a blowtorch near cables). The principal contractor sets the permit system for the site, and it is your responsibility to check what permits are required before starting work. A permit to work is not just a piece of paper — it is a formal system that ensures hazards have been identified, precautions are in place, and the work is authorised. Never start work that requires a permit without one. On many large sites, a separate safe isolation permit is required for any electrical isolation, even if you hold a safe isolation qualification.',
  },
  {
    question: 'What should a site induction cover for electricians?',
    answer:
      'A site induction should cover: the site layout and access routes; the location of welfare facilities (toilets, canteen, drying room); emergency procedures including assembly points and first aiders; site-specific hazards (asbestos, underground services, overhead cables, confined spaces); the site rules on PPE, housekeeping, and working hours; the permit to work system; reporting procedures for near misses and accidents; the site management structure (who to report to); environmental requirements (waste segregation, spill procedures); and any site-specific restrictions (no photography, no mobile phones in certain areas). The induction must be completed before you start any work, and you should receive an induction record or sticker for your hard hat. If you leave the site for more than a specified period (often 2 to 4 weeks), you may need to complete a re-induction.',
  },
  {
    question: 'What PPE do electricians need on construction sites?',
    answer:
      'The minimum PPE requirement on most construction sites includes: a hard hat (EN 397) — increasingly bump caps are not accepted and some sites now require chin straps; high-visibility clothing (EN ISO 20471 Class 2 minimum, often Class 3); safety footwear with steel or composite toe caps and midsole protection (EN ISO 20345 S3 rating is standard); eye protection (EN 166) — required when drilling, chasing, or cutting; hearing protection (EN 352) — required in designated hearing protection zones or when using power tools; and gloves appropriate to the task (general handling, cut-resistant, or insulated depending on the work). For electrical work specifically, you may also need insulated tools rated to 1000V (BS EN 60900), a voltage indicator (GS 38 compliant), and arc flash rated clothing if working on high-energy systems. The principal contractor sets the site PPE requirements — always check and comply.',
  },
  {
    question: 'Are toolbox talks mandatory on construction sites?',
    answer:
      'Toolbox talks are not a specific legal requirement under UK legislation, but they are considered best practice and are effectively mandatory on most managed construction sites. The principal contractor is required under CDM 2015 to ensure workers are given suitable information, instruction, and training — toolbox talks are one of the standard methods of delivering this. Most large sites run daily or weekly toolbox talks covering topics relevant to the work being done that week. As an electrician, you should attend all general toolbox talks and may be asked to deliver toolbox talks on electrical safety topics such as safe isolation, cable avoidance, and temporary supplies. Records of toolbox talk attendance are typically maintained by the principal contractor and may be checked during site audits or HSE inspections.',
  },
  {
    question: 'What happens if I have an accident on a construction site?',
    answer:
      'If you have an accident on a construction site, the immediate priority is first aid and making the area safe. All construction sites with 5 or more workers must have a trained first aider on site. Report the accident to the site manager or principal contractor immediately — they are responsible for recording it in the site accident book. Under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), certain types of accident must be reported to the HSE, including: fatalities; specified injuries (fractures, amputations, loss of consciousness, chemical/hot metal burns, injuries requiring resuscitation); over-7-day incapacitation; and dangerous occurrences (near misses such as collapse of scaffolding, electrical short circuit causing fire, or contact with overhead power lines). The responsible person for RIDDOR reporting is usually the principal contractor, but if you are self-employed and working alone, it may be your responsibility.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation process with GS 38 instrument requirements and lock-off procedures.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/manual-handling-course',
    title: 'Manual Handling Course',
    description:
      'Manual handling training covering lifting techniques, risk assessment, and injury prevention.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/rams-generator',
    title: 'AI RAMS Generator',
    description:
      'Generate compliant Risk Assessments and Method Statements for electrical work on site in minutes.',
    icon: FileCheck2,
    category: 'Tool',
  },
  {
    href: '/guides/ipaf-training',
    title: 'IPAF Training Guide',
    description:
      'IPAF powered access licence categories, training requirements, and renewal guidance for electricians.',
    icon: BadgeCheck,
    category: 'Training',
  },
  {
    href: '/guides/pasma-training',
    title: 'PASMA Training Guide',
    description:
      'Mobile access tower training for electricians. Assembly, inspection, and safe use on construction sites.',
    icon: Building2,
    category: 'Training',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable electrical work, competent person schemes, and Building Control notification requirements.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'site-induction',
    heading: 'Site Induction: Your First Step on Any Construction Site',
    content: (
      <>
        <p>
          Before you lift a single cable tray on a construction site, you must complete a
          site-specific induction. This is not optional — it is a legal requirement under the
          Construction (Design and Management) Regulations 2015 (CDM 2015), and no principal
          contractor will allow you to start work without one. The induction is your introduction to
          the site, its hazards, its rules, and its emergency procedures.
        </p>
        <p>
          A thorough site induction covers the physical layout of the site, including access points,
          traffic routes, pedestrian walkways, and any areas with restricted access. You will be
          shown the location of welfare facilities — toilets, canteen, drying room, and drinking
          water. You will be told the emergency procedures: where the assembly points are, who the
          first aiders are, and how to raise the alarm in case of fire or serious injury.
        </p>
        <p>
          The induction will cover site-specific hazards. On a construction site, these typically
          include working at height, moving plant and vehicles, excavations, overhead power lines,
          underground services, asbestos (especially on refurbishment projects), noise, dust, and
          manual handling risks. As an electrician, you need to pay particular attention to hazards
          related to existing electrical supplies, temporary electrical installations, and any live
          systems that have not yet been isolated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site rules and PPE requirements</strong> — what PPE is mandatory at all
                times and what additional PPE is required for specific tasks. Some sites require
                full PPE including hard hat even in completed areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit to work system</strong> — which tasks require permits, how to apply
                for a permit, and who authorises permits on site. Electrical work frequently
                requires both a general permit and a specific{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                permit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reporting procedures</strong> — how to report near misses, unsafe
                conditions, and accidents. Most sites have a formal near-miss reporting system, and
                you are legally obliged to report anything that could endanger health and safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental requirements</strong> — waste segregation, spill procedures,
                and any restrictions on noise or dust. Electrical waste (cable offcuts, packaging,
                old fittings) must be disposed of correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After the induction, you will typically receive an induction record card or a sticker for
          your hard hat confirming you have been inducted. Keep your induction card with you at all
          times on site — you may be asked to produce it during spot checks.
        </p>
      </>
    ),
  },
  {
    id: 'cdm-duties',
    heading: 'CDM 2015: Your Duties as an Electrician on Site',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 apply to all construction work
          in the UK, from a single-person domestic rewire to a multi-billion-pound infrastructure
          project. As an electrician on a construction site, your duties depend on your role — you
          may be a "worker," a "contractor," or both.
        </p>
        <p>
          If you are employed by an electrical contractor and sent to work on a construction site,
          you are a "worker" under CDM Regulation 14. Your duties are to cooperate with the
          principal contractor and other workers, report anything that could endanger health and
          safety, and not interfere with anything provided for safety (such as barriers, signs, or
          fire equipment).
        </p>
        <p>
          If you are self-employed or running your own business and are engaged directly to carry
          out electrical work on a construction project, you are a "contractor" under Regulation 15
          with additional duties:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan, manage, and monitor your work</strong> — ensure all electrical work
                under your control is carried out without risk to health and safety. This includes
                risk assessments and method statements (RAMS) for every task.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide information and training</strong> — ensure your workers have the
                competence, knowledge, and training to carry out their tasks safely. For electrical
                work, this includes{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedures
                </SEOInternalLink>
                , working at height, and use of power tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Comply with directions from the principal contractor</strong> — follow the
                site rules, attend coordination meetings, and provide information about your work
                that could affect others.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide welfare facilities</strong> — if your workers are not using the
                principal contractor's facilities, you must provide your own.
              </span>
            </li>
          </ul>
        </div>
        <p>
          CDM also requires that a construction phase plan exists before work starts on any project
          with more than one contractor. The principal contractor prepares this plan, but you must
          cooperate with it and provide relevant information about your electrical work — for
          example, when you plan to carry out isolations that will affect other trades.
        </p>
        <SEOAppBridge
          title="Generate CDM-compliant RAMS in minutes"
          description="Elec-Mate's AI RAMS generator creates task-specific risk assessments and method statements for construction site electrical work. Covers isolation, cable installation, containment fixing, and testing sequences. Print or share as PDF directly from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'cscs-requirements',
    heading: 'CSCS Card Requirements for Electricians',
    content: (
      <>
        <p>
          The CSCS (Construction Skills Certification Scheme) card is the standard proof of
          competence and health and safety awareness on UK construction sites. While it is not
          technically a legal requirement, virtually every managed construction site requires one as
          a condition of entry. Without a valid CSCS card, you will not get past the gate on most
          sites.
        </p>
        <p>
          For qualified electricians, the standard CSCS card is the <strong>Gold card</strong>{' '}
          (Skilled Worker). To obtain it, you need:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A relevant NVQ Level 3</strong> — or equivalent qualification such as the
                City & Guilds 2357 (now 8202) or a completed apprenticeship with AM2 assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A pass in the CITB Health, Safety and Environment test</strong> — the
                specialist trade test for electrical occupations. This is a computer-based multiple
                choice test taken at a Pearson VUE centre. It must be passed within 2 years before
                your CSCS application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current JIB or ECS registration</strong> — the card is issued through the
                Electrotechnical Certification Scheme (ECS), which is administered by the JIB. Your
                ECS registration validates your qualifications and maps them to the correct CSCS
                card colour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Apprentices hold the <strong>Red card</strong> (Trainee), which requires enrolment on a
          recognised apprenticeship programme and a pass in the CITB HS&E test. The card is valid
          for the duration of training plus a short grace period.
        </p>
        <p>
          Cards expire after 5 years. Renewal requires passing the CITB HS&E test again and
          maintaining your ECS registration. Lapsed cards cannot be renewed — you must apply for a
          new card. Some sites will not accept cards that expire within 3 months, so plan your
          renewal in advance.
        </p>
        <p>
          Supervisors and managers have their own card colours — the <strong>Black card</strong>{' '}
          (Manager) requires an NVQ Level 6 or 7, while the{' '}
          <strong>Gold card with a supervisor endorsement</strong> requires an NVQ Level 3 plus a
          supervisory qualification.
        </p>
      </>
    ),
  },
  {
    id: 'ppe-requirements',
    heading: 'PPE Requirements for Electricians on Construction Sites',
    content: (
      <>
        <p>
          Personal protective equipment (PPE) is your last line of defence against hazards that
          cannot be eliminated or controlled by other means. On a construction site, the principal
          contractor sets the minimum PPE requirements, and they are non-negotiable — fail to wear
          the correct PPE and you will be removed from site.
        </p>
        <p>The standard minimum PPE on most UK construction sites includes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <HardHat className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hard hat (EN 397)</strong> — must be worn at all times in areas where there
                is a risk of falling objects or head injury. Replace after any significant impact
                and check the manufacture date — most have a 5-year life from manufacture.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-visibility clothing (EN ISO 20471)</strong> — Class 2 minimum is the
                standard requirement. Many sites require Class 3 (which has more reflective
                material) or mandate hi-vis at all times including inside buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety footwear (EN ISO 20345 S3)</strong> — steel or composite toe cap,
                midsole puncture protection, water resistant, and ankle support. S3 rated boots are
                the standard for construction sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eye protection (EN 166)</strong> — required when drilling, chasing walls,
                cutting cable tray, or using power tools. Safety glasses with side shields are the
                minimum; goggles may be required for dusty environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hearing protection (EN 352)</strong> — required in designated hearing
                protection zones or when using noisy power tools such as SDS drills, angle grinders,
                or chasing machines. Disposable foam plugs or ear defenders rated to at least SNR 25
                dB.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electrical work specifically, you may need additional PPE: insulated gloves (Class 00
          or Class 0 for low voltage work), arc flash rated clothing and face shield when working
          near high-energy systems, and respiratory protection (FFP2 or FFP3 masks) when chasing
          walls or drilling into materials that may contain silica dust.
        </p>
        <p>
          Under the Personal Protective Equipment at Work Regulations 2022, employers must provide
          PPE free of charge to all workers, including agency and self-employed workers who are
          under their direction. If you are self-employed and working for your own clients, you must
          provide your own PPE and ensure it is suitable for the task.
        </p>
      </>
    ),
  },
  {
    id: 'permit-systems',
    heading: 'Permit to Work Systems for Electrical Work',
    content: (
      <>
        <p>
          A permit to work (PTW) is a formal documented system that authorises specific work to take
          place under controlled conditions. It ensures that hazards have been identified, risk
          controls are in place, and the work is authorised by a competent person before it begins.
          On construction sites, electrical work frequently requires permits — particularly any work
          involving isolation of existing supplies or work near live conductors.
        </p>
        <p>
          The types of permit commonly required for electrical work on construction sites include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical isolation permit</strong> — required before isolating any supply
                on site. Specifies the circuit or system to be isolated, the method of isolation,
                the lock-off arrangements, and the person responsible. Must reference the{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                being followed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot work permit</strong> — required when using equipment that generates
                heat, sparks, or flame near combustible materials. This can include soldering,
                brazing, or using a heat gun near cable insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working at height permit</strong> — required when using scaffolding, mobile
                towers, or MEWPs (mobile elevating work platforms) to install cables at height,
                particularly in atriums, plant rooms, or on external facades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confined space permit</strong> — required when working in risers, ducts,
                ceiling voids, or underground chambers that meet the definition of a confined space
                under the Confined Spaces Regulations 1997.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A permit to work is not just paperwork. It is a system that includes: a risk assessment
          for the specific task; a method statement describing how the work will be done safely;
          identification of the hazards and the controls in place; authorisation by a competent
          person (usually the site manager or a designated permit issuer); communication with other
          trades who may be affected; and a formal sign-off process when the work is complete and
          the system is returned to service.
        </p>
        <p>
          Never start work that requires a permit without one. If you are unsure whether a permit is
          required, ask the site manager before proceeding. Working without a required permit is a
          serious site offence that can result in immediate removal from site and potential
          prosecution.
        </p>
      </>
    ),
  },
  {
    id: 'welfare-facilities',
    heading: 'Welfare Facilities on Construction Sites',
    content: (
      <>
        <p>
          The Construction (Design and Management) Regulations 2015 Schedule 2 sets out the minimum
          welfare facilities that must be provided on all construction sites. These are not optional
          — the principal contractor is legally required to provide them before work starts and
          maintain them throughout the project.
        </p>
        <p>The minimum requirements include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sanitary conveniences</strong> — flushing toilets wherever reasonably
                practicable, kept clean and adequately ventilated. Chemical toilets are acceptable
                where mains drainage is not available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Washing facilities</strong> — hot and cold (or warm) running water, soap,
                and towels or other drying facilities. Showers must be provided where the work is
                particularly dirty or involves exposure to hazardous substances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drinking water</strong> — a supply of wholesome drinking water, clearly
                marked, with cups or a drinking fountain. Water from welfare unit taps is acceptable
                if it is from a potable supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rest facilities</strong> — a rest room or rest area with seating and tables,
                a means of heating food and water (microwave and kettle as a minimum), and
                protection from the weather. Separate facilities must be provided for pregnant women
                and nursing mothers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Changing and drying facilities</strong> — a place to change and store
                personal clothing separately from work clothing, and facilities for drying wet
                clothing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you arrive on a construction site and find that adequate welfare facilities are not
          provided, you have the right to raise this with the principal contractor. If the issue is
          not resolved, you can report it to the HSE. Poor welfare facilities are one of the most
          common findings in HSE site inspections, and they affect morale, productivity, and health.
        </p>
      </>
    ),
  },
  {
    id: 'electrical-hazards',
    heading: 'Electrical Hazards Specific to Construction Sites',
    content: (
      <>
        <p>
          Construction sites present electrical hazards that you will not encounter on a typical
          domestic or commercial job. Understanding these hazards is essential for your safety and
          the safety of everyone on site.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temporary electrical supplies</strong> — construction sites use temporary
                distribution boards, often rated at 110V centre-tapped earth (CTE) for power tools.
                These temporary supplies must be properly installed with RCD protection, regular
                inspection, and clear labelling. BS 7671 Section 704 covers the specific
                requirements for construction site installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overhead power lines</strong> — one of the leading causes of fatal
                electrical accidents on construction sites. You must maintain safe distances from
                overhead lines (minimum 6 metres for lines up to 33kV, greater distances for higher
                voltages). If work near overhead lines is unavoidable, contact the distribution
                network operator (DNO) for advice and use goal posts, bunting, or banksmen.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cables</strong> — before any excavation or ground penetration
                (including driving earth rods), check cable plans, use a cable avoidance tool (CAT
                scanner), and use safe digging practices. Underground cable strikes can cause fatal
                injuries and major supply interruptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wet conditions</strong> — construction sites are often wet, increasing the
                risk of electric shock. Ensure all 230V equipment has 30mA RCD protection. Use 110V
                CTE tools wherever possible. Inspect cables and connections for damage before use.
                Keep distribution boards dry and protected from weather.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cables and equipment</strong> — the harsh construction site
                environment causes damage to cables, plugs, and tools. Inspect all portable
                equipment before each use. Remove damaged equipment from service immediately and tag
                it "Do not use."
              </span>
            </li>
          </ul>
        </div>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Section 704
          </SEOInternalLink>{' '}
          contains the specific requirements for construction and demolition site installations,
          including reduced voltage systems, RCD protection, IP ratings for equipment, and maximum
          disconnection times. Know this section thoroughly if you work on construction sites
          regularly.
        </p>
      </>
    ),
  },
  {
    id: 'toolbox-talks',
    heading: 'Toolbox Talks for Electricians',
    content: (
      <>
        <p>
          Toolbox talks are short, focused health and safety briefings delivered on site, typically
          lasting 10 to 15 minutes. They cover a specific topic relevant to the work being done and
          are designed to reinforce safe working practices. On managed construction sites, they are
          a standard part of the safety management system.
        </p>
        <p>
          As an electrician, you should be familiar with the following toolbox talk topics and may
          be asked to deliver them to your team or to other trades:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation</strong> — the procedure for safely isolating electrical
                supplies before work begins. Cover the prove-test-prove sequence, lock-off devices,
                and the requirements for GS 38 compliant instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable avoidance</strong> — how to avoid striking buried cables when
                drilling, fixing, or excavating. Use of cable plans, CAT scanners, and safe digging
                practices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portable appliance safety</strong> — visual inspection of 110V tools and
                leads before use, reporting damaged equipment, and PAT testing requirements for site
                equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Working at height</strong> — safe use of step ladders, mobile scaffold
                towers, and MEWPs for electrical installation work. Three points of contact, correct
                setup, and pre-use inspection checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual handling</strong> — safe lifting of heavy items such as cable drums,
                distribution boards, and cable tray bundles. Techniques for two-person lifts and
                mechanical aids.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each toolbox talk should have a sign-in sheet recording the date, topic, presenter, and
          attendees. These records demonstrate compliance with CDM 2015 requirements for worker
          information and training, and they are routinely checked during site audits.
        </p>
        <SEOAppBridge
          title="Ready-made toolbox talks in Elec-Mate"
          description="Access a library of electrical safety toolbox talks covering safe isolation, cable avoidance, temporary supplies, and more. Each talk includes key points, discussion prompts, and a digital sign-in sheet. Download as PDF or share with your team on site."
          icon={Megaphone}
        />
      </>
    ),
  },
  {
    id: 'reporting-incidents',
    heading: 'Reporting Incidents, Near Misses, and Unsafe Conditions',
    content: (
      <>
        <p>
          Reporting is not just a box-ticking exercise — it is how the construction industry learns
          from mistakes and prevents serious injuries. Every worker on a construction site has a
          legal duty under CDM 2015 to report anything that could endanger health and safety.
        </p>
        <p>There are three categories of reportable events:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accidents and injuries</strong> — any injury sustained on site, from minor
                cuts to serious incidents. All accidents must be recorded in the site accident book.
                Under RIDDOR, specified injuries (fractures, amputations, loss of consciousness,
                burns) must be reported to the HSE within 10 days. Fatalities and dangerous
                occurrences must be reported immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Near misses</strong> — events that could have caused injury but did not. For
                example, a cable falling from height, an unguarded excavation near a walkway, or a
                live conductor found exposed. Near misses are leading indicators — reporting them
                prevents the next one from being an actual accident.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsafe conditions</strong> — anything on site that poses a risk: damaged
                scaffolding, missing barriers around excavations, exposed live conductors, defective
                tools, or blocked fire exits. Report these to the site manager immediately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electrical near misses specifically, common examples include: electric shock from
          defective equipment, arcing from loose connections in temporary distribution boards,
          contact with underground cables during excavation, and failure of RCD protection. These
          should all be reported through the site reporting system and investigated to prevent
          recurrence.
        </p>
        <p>
          Many construction sites now use digital reporting systems where you can log a near miss
          from your phone with a photo and location. Elec-Mate's site safety features let you record
          incidents, attach photographs, and generate a report — all from your phone on site.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConstructionSiteSafetyPage() {
  return (
    <GuideTemplate
      title="Construction Site Safety for Electricians | Complete Guide"
      description="Comprehensive construction site safety guide for electricians. Covers site induction, CDM 2015 duties, CSCS card requirements, PPE, permit to work systems, welfare facilities, toolbox talks, and incident reporting."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Site Safety"
      badgeIcon={HardHat}
      heroTitle={
        <>
          Construction Site Safety:{' '}
          <span className="text-yellow-400">The Complete Guide for Electricians</span>
        </>
      }
      heroSubtitle="Every electrician working on a construction site needs to understand site inductions, CDM 2015 duties, CSCS card requirements, PPE standards, and permit to work systems. This guide covers everything you need to stay safe, stay compliant, and stay on site."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Construction Site Safety"
      relatedPages={relatedPages}
      ctaHeading="Generate Site Safety Documents on Your Phone"
      ctaSubheading="Elec-Mate includes AI-powered RAMS generation, toolbox talk templates, and site safety checklists. Produce compliant documentation on site in minutes. 7-day free trial, cancel anytime."
    />
  );
}
