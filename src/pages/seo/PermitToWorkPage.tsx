import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldAlert,
  Zap,
  Lock,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  Brain,
  FileCheck2,
  HardHat,
  Flame,
  Scale,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Permit to Work for Electricians | Electrical Safety';
const PAGE_DESCRIPTION =
  'Complete guide to permit-to-work systems for electrical work. When a PTW is required, types of permits, the permit process, safe isolation, Electricity at Work Regulations 1989, who issues permits, PTW templates, and common mistakes. For UK electricians.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Permit to Work for Electricians', href: '/guides/permit-to-work-electrician' },
];

const tocItems = [
  { id: 'what-is-ptw', label: 'What Is a Permit to Work?' },
  { id: 'when-required', label: 'When Is a PTW Required?' },
  { id: 'types-of-ptw', label: 'Types of Permit to Work' },
  { id: 'the-permit-process', label: 'The Permit Process' },
  { id: 'safe-isolation-and-ptw', label: 'Safe Isolation and PTW' },
  { id: 'legal-framework', label: 'Legal Framework' },
  { id: 'who-issues-permits', label: 'Who Issues Permits?' },
  { id: 'ptw-templates', label: 'PTW Templates' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A permit to work is a formal written document that authorises specific high-risk work to be carried out under controlled conditions — it is not a general permission to be on site.',
  'Electrical permits to work are required for live working (Regulation 14 of the Electricity at Work Regulations 1989), high-voltage switching, work in confined spaces near electrical equipment, and any work where the risk of electric shock or arc flash is significant.',
  'The permit process follows a strict sequence: request, risk assessment, issue, work execution, close-out, and cancellation — each stage requires sign-off by a competent person.',
  'Permits to work and safe isolation procedures work together: the PTW authorises the work, while safe isolation (prove-test-prove per GS 38) confirms the circuit is dead before work begins.',
  'Elec-Mate generates permit-to-work templates through its RAMS Generator and AI Health and Safety agent, complete with risk assessments, method statements, and safe isolation checklists.',
];

const faqs = [
  {
    question: 'What is a permit to work in electrical work?',
    answer:
      'A permit to work (PTW) is a formal written document that sets out the specific work to be done, the hazards involved, and the precautions that must be in place before the work starts. It is not a general permission to work on site — it is a safety document that controls a specific piece of high-risk work for a defined period. The permit describes exactly what work is authorised, where it will take place, who will carry it out, what safety precautions are required (including isolation, lock-off, and testing), and when the permit expires. It must be signed by a competent person who authorises the work (the permit issuer) and by the person carrying out the work (the permit holder). The purpose is to ensure that all parties understand the hazards and that all necessary precautions are in place before any work begins. For electrical work, permits to work are most commonly associated with live working, high-voltage switching, and work near or on high-voltage systems, but they are also used for any electrical work where the consequences of an error could be severe.',
  },
  {
    question: 'Is a permit to work a legal requirement for electricians?',
    answer:
      'There is no single regulation that says "you must have a permit to work." However, the Electricity at Work Regulations 1989 require that work on electrical systems is carried out safely, and the Management of Health and Safety at Work Regulations 1999 require suitable and sufficient risk assessments. Where the risk assessment identifies that a particular task is high-risk — such as live working, high-voltage switching, or work in confined spaces — a permit to work is the accepted method of implementing the control measures identified in the risk assessment. In practice, most commercial and industrial sites require permits to work for any electrical work that involves switching, isolation, or live working. The HSE considers permit-to-work systems to be an essential element of a safe system of work for high-risk activities. The Construction (Design and Management) Regulations 2015 also require contractors to plan, manage, and monitor work to ensure safety, which on many sites is implemented through permit systems.',
  },
  {
    question: 'Who can issue a permit to work for electrical work?',
    answer:
      'A permit to work must be issued by a person who is competent to assess the risks and authorise the work. For electrical permits, this means someone who understands the electrical system being worked on, the hazards involved, and the precautions required. On commercial and industrial sites, the permit issuer is typically the site electrical engineer, the authorised person (AP) for the electrical system, or a senior authorised person (SAP) for high-voltage work. On construction sites managed under CDM 2015, the principal contractor or their appointed competent person may control the permit system. The permit issuer must physically visit the work location, verify that the safety precautions described in the permit are in place (including isolation, lock-off, earthing where applicable, and barriers), and only then sign the permit to authorise the work. The permit issuer must not issue a permit for work they do not fully understand — if there is any uncertainty, the work must not proceed until the situation is resolved.',
  },
  {
    question: 'What is the difference between a permit to work and a method statement?',
    answer:
      'A method statement describes how a piece of work will be carried out safely — it is a step-by-step description of the work sequence, the resources required, and the safety precautions at each stage. A permit to work is a formal authorisation document that controls when and where a specific high-risk activity may take place. The two documents serve different purposes but work together. The method statement explains the "how" of the work, while the permit to work controls the "when" and "under what conditions." On most sites, the method statement (as part of the RAMS pack) is submitted in advance for review and approval, and the permit to work is issued on the day when the work is about to start, after the permit issuer has verified that all precautions are in place. A permit to work is typically required only for high-risk activities, whereas a method statement is expected for all significant work. Together with the risk assessment, these documents form a comprehensive safe system of work.',
  },
  {
    question: 'What happens if I work without a permit to work?',
    answer:
      'Working without a required permit to work is a serious breach of site safety rules and potentially a criminal offence under health and safety legislation. On commercial and industrial sites, working without a valid permit will result in immediate removal from site, and the contractor may be banned from future work with that client or principal contractor. If an accident occurs while working without a permit, the HSE investigation will examine why the permit system was bypassed, and both the individual electrician and their employer may face criminal prosecution. Insurance claims may also be affected — if your public liability or employer liability insurer determines that you were working outside the terms of a valid safe system of work, they may refuse to pay out on a claim. Beyond the legal and commercial consequences, working without a permit means working without the safety checks that the permit system provides. The permit process exists to catch errors and omissions before they lead to accidents — bypassing it removes that safety net.',
  },
  {
    question: 'How does Elec-Mate help with permits to work?',
    answer:
      'Elec-Mate supports the permit-to-work process through several integrated features. The AI Health and Safety agent generates complete RAMS packs (Risk Assessment and Method Statement) from a plain-English job description, and these RAMS packs include permit-to-work considerations where the risk assessment identifies high-risk activities such as live working or confined space entry. The RAMS Generator tool creates permit-to-work template documents that can be customised for your specific site and job. The safe isolation checklist built into the testing workflow guides you through the GS 38 prove-test-prove procedure, which is a core requirement of any electrical permit to work. All documents can be exported as professional PDFs ready to submit to principal contractors and site safety teams. The AI generates site-specific content rather than generic templates, which is exactly what permit issuers and safety teams expect to see.',
  },
];

const howToSteps = [
  {
    name: 'Request the permit',
    text: 'The person who will carry out the work (the permit applicant) submits a request describing the work to be done, the location, the expected duration, and the safety precautions they intend to implement. This is typically supported by RAMS (Risk Assessment and Method Statement) that have been reviewed and approved by the site safety team. The request must be specific — "electrical work in plant room" is not sufficient; "isolation and replacement of MCCB on DB3, Panel 2, 400 A three-phase supply" is.',
  },
  {
    name: 'Assess and authorise',
    text: 'The permit issuer (an authorised person competent to assess the risks) reviews the request and RAMS, visits the work location to verify conditions, and confirms that all safety precautions can be implemented. They verify the isolation points, check that lock-off devices and test equipment are available, and confirm that the person requesting the permit is competent to carry out the work. Only when satisfied that the work can proceed safely does the permit issuer sign and issue the permit.',
  },
  {
    name: 'Implement safety precautions',
    text: 'Before work begins, all safety precautions specified in the permit must be implemented. For electrical work, this typically includes safe isolation (prove-test-prove per GS 38), lock-off with personal padlocks, warning labels, barriers and signage to exclude other people from the work area, and provision of emergency equipment (first aid, fire extinguisher). The permit holder confirms that all precautions are in place and signs the permit to accept responsibility for the work.',
  },
  {
    name: 'Carry out the work',
    text: 'The work proceeds as described in the method statement and within the scope of the permit. The permit holder must not exceed the scope of the permit — if additional work is needed or conditions change, work must stop and a new or amended permit must be issued. The permit has a defined duration (typically one shift or one working day), and work must stop when the permit expires even if the job is not complete. A new permit is required for each subsequent shift or day.',
  },
  {
    name: 'Close out and cancel the permit',
    text: 'When the work is complete (or when the permit expires), the permit holder signs the permit to confirm that all work has been completed, all persons are clear of the equipment, all temporary safety measures have been removed, and the installation is safe to be returned to service. The permit issuer then inspects the work area, confirms it is safe, removes lock-off devices, and cancels the permit. Only after the permit is formally cancelled may the equipment be re-energised. Cancelled permits must be retained as a permanent record.',
  },
];

const sections = [
  {
    id: 'what-is-ptw',
    heading: 'What Is a Permit to Work?',
    content: (
      <>
        <p>
          A permit to work (PTW) is a formal written document that authorises a specific person or
          team to carry out a specific piece of high-risk work at a specific location, under
          controlled conditions, for a defined period of time. It is one of the most important
          safety documents in electrical work, particularly on commercial and industrial sites where
          the consequences of an uncontrolled incident could be severe.
        </p>
        <p>
          The permit to work is not a generic site access document or an induction record. It is a
          detailed safety document that describes the exact work to be done, the exact location, the
          hazards identified, the control measures required, the competence of the person carrying
          out the work, and the emergency procedures in the event of an incident. It must be signed
          by both the person authorising the work (the permit issuer) and the person carrying it out
          (the permit holder).
        </p>
        <p>
          The concept originates from the oil, gas, and chemical industries, where working on
          pressurised vessels and pipework without a formal safety system led to catastrophic
          accidents. In electrical work, permits to work serve the same purpose: they provide a
          systematic, documented check that all necessary safety precautions are in place before
          high-risk work begins. They ensure that nothing is left to chance, nothing is assumed, and
          every safety measure is verified and signed for.
        </p>
        <p>
          For electricians, a permit to work is most commonly required for live working under
          Regulation 14 of the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            Electricity at Work Regulations 1989
          </SEOInternalLink>
          , high-voltage switching operations, work in confined spaces containing electrical
          equipment, and any electrical work where the principal contractor's site rules require a
          permit.
        </p>
      </>
    ),
  },
  {
    id: 'when-required',
    heading: 'When Is a Permit to Work Required?',
    content: (
      <>
        <p>
          A permit to work is required whenever the risk assessment identifies that the work is
          high-risk and that a formal authorisation system is needed to control it. The decision to
          require a permit is based on the nature and severity of the hazards, not on the complexity
          of the work itself. A simple task can require a permit if the consequences of an error are
          severe.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Live Working</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Any work on or near live conductors that is justified under Regulation 14 of the
              Electricity at Work Regulations 1989 requires a written permit to work. The permit
              must document the justification for why the work cannot be done dead, the specific
              precautions in place (insulated tools to BS EN 60900, insulated mats, barriers,
              competent accompaniment), and the emergency procedures including the location of the
              nearest defibrillator and the name of the designated first aider. Live working should
              be rare — the default position is always dead working.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">High-Voltage Work</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              All work on high-voltage systems (above 1000 V AC or 1500 V DC) requires a permit to
              work. HV permits are typically controlled by a Senior Authorised Person (SAP) and
              follow a rigorous process including HV safety rules, circuit identification, phasing
              checks, earthing, and sequential switching procedures. HV permits are never issued
              verbally — they are always formal written documents with multiple sign-off stages.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Confined Spaces</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Electrical work in confined spaces (risers, cable tunnels, switch rooms below ground
              level, transformer chambers) requires a confined space entry permit in addition to any
              electrical permit. The confined space permit covers atmospheric monitoring,
              ventilation, rescue arrangements, and communication procedures. The Confined Spaces
              Regulations 1997 apply to any space that is substantially enclosed and where there is
              a reasonably foreseeable risk of serious injury from hazardous conditions.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Hot Works</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Soldering, brazing, heat-shrinking, and using angle grinders near combustible
              materials may require a hot works permit, particularly on managed commercial and
              industrial sites. The hot works permit specifies fire precautions (fire extinguisher,
              fire blanket, fire watch period after completion), the removal or protection of nearby
              combustibles, and the notification of the building fire alarm system to prevent false
              alarms from triggering evacuations.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <HardHat className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Working at Height</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              On some sites, a working at height permit is required when using ladders, tower
              scaffolds, or mobile elevating work platforms (MEWPs) to access electrical equipment.
              The permit specifies the type of access equipment authorised, the maximum working
              height, the fall protection measures in place, and the training and competence
              requirements for the operative. The Work at Height Regulations 2005 apply.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'types-of-ptw',
    heading: 'Types of Permit to Work',
    content: (
      <>
        <p>
          Different types of permit to work exist for different categories of hazard. On a complex
          commercial or industrial site, an electrician may need multiple permits for a single job —
          for example, an electrical permit to work for the isolation and switching, a confined
          space permit for entry into a cable basement, and a hot works permit for soldering cable
          terminations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Common Permit Types for Electricians
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Electrical Permit to Work</strong> — Covers
                isolation, switching, testing, and work on electrical systems. Specifies the exact
                circuit or equipment to be worked on, the isolation points, the method of proving
                dead, and the lock-off arrangements. This is the core permit type for electricians
                and is mandatory for any live working or HV switching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Hot Works Permit</strong> — Required for any
                work that produces heat, sparks, or flame in areas where combustible materials are
                present. For electricians, this includes soldering, brazing, heat-shrinking, and
                using angle grinders. Specifies fire precautions, fire watch periods, and emergency
                procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Confined Space Entry Permit</strong> — Required
                for entry into any substantially enclosed space where there is a foreseeable risk of
                serious injury. Cable tunnels, transformer chambers, underground switch rooms, and
                vertical risers may all qualify. Covers atmospheric monitoring, ventilation, rescue
                plans, and communication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Working at Height Permit</strong> — Required on
                some sites for any work above ground level using access equipment. Specifies the
                type of access (ladder, tower scaffold, MEWP), maximum height, and fall protection
                measures. Particularly relevant for electricians working on lighting installations,
                cable tray at high level, and ceiling void work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Excavation Permit</strong> — Required if
                electrical work involves excavation near underground cables or services. Covers
                cable avoidance tool (CAT) scanning, hand-digging proximity requirements, and the
                identification and protection of existing underground services.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each permit type serves a specific purpose and controls a specific category of risk.
          Permits should not be combined or abbreviated — if a job involves multiple hazard
          categories, separate permits are required for each. This ensures that the safety
          precautions for each hazard type are properly assessed, documented, and verified.
        </p>
      </>
    ),
  },
  {
    id: 'the-permit-process',
    heading: 'The Permit Process: Request to Close-Out',
    content: (
      <>
        <p>
          The permit-to-work process follows a strict sequence that must not be shortcut or
          abbreviated. Each stage has a specific purpose and requires sign-off by the appropriate
          person. The discipline of the process is what makes it effective — a permit system that is
          treated as a rubber-stamping exercise provides no safety benefit.
        </p>
        <p>
          The sequence is: request, assessment and issue, implementation of precautions, work
          execution, close-out, and cancellation. Each stage builds on the previous one, and work
          must not proceed to the next stage until the current stage is complete and signed off.
        </p>
        <p>
          During the request stage, the permit applicant (the electrician or their supervisor)
          describes the work to be done and submits supporting documentation including{' '}
          <SEOInternalLink href="/guides/risk-assessment-electrical-work">
            risk assessments
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/guides/method-statement-electrical">
            method statements
          </SEOInternalLink>
          . The permit issuer reviews these documents, visits the work location, and satisfies
          themselves that the work can be carried out safely with the proposed precautions. Only
          then is the permit issued.
        </p>
        <SEOAppBridge
          title="AI generates permit-to-work supporting documents"
          description="Elec-Mate's RAMS Generator creates the risk assessments and method statements you need to support your permit-to-work application. Site-specific, professionally formatted, ready to submit to the permit issuer."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'safe-isolation-and-ptw',
    heading: 'Safe Isolation and Permits to Work',
    content: (
      <>
        <p>
          Safe isolation and permits to work are closely linked but serve different functions in the
          safety system. The permit to work is the administrative control — it authorises the work
          and specifies the conditions under which it may proceed. Safe isolation is the physical
          control — it disconnects the circuit from the supply and confirms it is dead.
        </p>
        <p>
          In a properly managed permit system, the safe isolation procedure is specified within the
          permit. The permit identifies the isolation points to be used, the method of proving dead
          (GS 38 compliant prove-test-prove using a two-pole voltage indicator), the lock-off
          arrangements (personal padlocks, multi-lock hasps for multi-person jobs), and the warning
          labels to be applied.
        </p>
        <p>
          The relationship works as follows: the permit authorises the isolation to take place; the
          electrician carries out the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          as specified in the permit; the permit issuer verifies that isolation is complete and
          correct; and only then does the permit authorise the work to begin. At close-out, the
          reverse occurs: the electrician confirms the work is complete and all persons are clear;
          the permit issuer verifies the work area is safe; the lock-off is removed; and the circuit
          is re-energised under the permit issuer's authority.
        </p>
        <p>
          On high-voltage systems, the safe isolation process is even more rigorous, involving HV
          safety rules, circuit main earths, phasing checks, and sequential switching procedures,
          all documented within the HV permit to work.
        </p>
        <SEOAppBridge
          title="Safe isolation built into every testing workflow"
          description="Elec-Mate's testing tools guide you through the GS 38 prove-test-prove safe isolation procedure before every test. The AI Health and Safety agent includes safe isolation in every RAMS pack it generates."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'legal-framework',
    heading: 'Legal Framework for Permits to Work',
    content: (
      <>
        <p>
          While no single UK regulation mandates a permit-to-work system by name, the legal
          framework creates a clear expectation that formal safety systems are in place for
          high-risk work. The duty to implement a permit system arises from the requirement to have
          a safe system of work proportionate to the level of risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Key Legislation</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Electricity at Work Regulations 1989</strong> —
                Regulation 12 requires suitable means of isolation. Regulation 13 requires adequate
                precautions to prevent re-energisation. Regulation 14 controls live working and
                requires written justification, specific precautions, and competent personnel. A
                permit to work is the accepted method of demonstrating compliance with these
                requirements for high-risk electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  Management of Health and Safety at Work Regulations 1999
                </strong>{' '}
                — Regulation 3 requires suitable and sufficient risk assessments. Where the risk
                assessment identifies high-risk activities, the control measures must be
                proportionate to the risk — and for high-risk electrical work, a permit-to-work
                system is the proportionate control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">CDM Regulations 2015</strong> — Regulation 15
                requires contractors to plan, manage, and monitor construction work to ensure it is
                carried out safely. On managed construction sites, the principal contractor's safety
                management system typically includes a permit-to-work requirement for all high-risk
                activities including electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Health and Safety at Work etc. Act 1974</strong>
                — Sections 2 and 3 impose general duties on employers to ensure, so far as is
                reasonably practicable, the health, safety, and welfare of employees and others. A
                permit-to-work system is a recognised means of discharging these duties for
                high-risk work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HSE publication HSG250 "Guidance on Permit-to-Work Systems" provides detailed guidance
          on implementing effective permit systems. BS 7671:2018+A3:2024 Regulation 462 specifies
          requirements for isolation and switching that directly feed into the electrical
          permit-to-work process.
        </p>
      </>
    ),
  },
  {
    id: 'who-issues-permits',
    heading: 'Who Issues Permits to Work?',
    content: (
      <>
        <p>
          The permit issuer must be a competent person who has sufficient knowledge and experience
          to assess the risks of the work being authorised and to verify that the safety precautions
          specified in the permit are adequate and in place. The level of competence required
          depends on the nature of the work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Low-Voltage Electrical Work</h3>
            <p className="text-white text-sm leading-relaxed">
              For LV electrical permits, the issuer is typically the site electrical supervisor, the
              facilities manager with appropriate electrical competence, or the principal
              contractor's appointed competent person. They must understand LV electrical hazards,
              safe isolation procedures, and the specific installation being worked on. On smaller
              sites, the senior electrician may issue permits to their team, provided the site
              safety management system authorises this.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">High-Voltage Electrical Work</h3>
            <p className="text-white text-sm leading-relaxed">
              For HV work, the permit must be issued by a Senior Authorised Person (SAP) or
              Authorised Person (AP) who has been formally appointed and trained in HV safety rules.
              HV authorisation is a formal appointment documented in a safety rules document, not
              just an informal recognition of experience. The SAP/AP must hold appropriate
              qualifications and receive regular refresher training. HV permits follow more
              stringent procedures including phasing checks, earthing, and sequential switching.
            </p>
          </div>
        </div>
        <p className="mt-6">
          The permit issuer has a personal responsibility for the safety of the work they authorise.
          They must never issue a permit for work they do not understand, for precautions they have
          not verified, or under pressure to "get on with it." If the conditions are not right, the
          permit must not be issued. This personal accountability is what gives the permit system
          its strength.
        </p>
      </>
    ),
  },
  {
    id: 'ptw-templates',
    heading: 'Permit to Work Templates',
    content: (
      <>
        <p>
          A well-designed PTW template captures all the essential information in a structured format
          that guides both the permit issuer and the permit holder through the process. While
          different organisations use different template formats, all effective electrical PTW
          templates include the same core elements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Essential PTW Template Sections</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Permit reference number and date of issue</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Description of the work to be carried out (specific, not vague)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Exact location of the work (building, floor, room, equipment ID)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Duration of the permit (start time, expiry time)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Hazards identified and risk rating</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Safety precautions required (isolation, lock-off, barriers, PPE)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Emergency procedures and contact details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Signatures: permit issuer, permit holder, and close-out/cancellation</span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's RAMS Generator creates permit-to-work supporting documentation including risk
          assessments, method statements, and safe isolation checklists that align with standard PTW
          templates. The AI generates site-specific content based on your job description, so the
          documentation is relevant and detailed rather than generic and vague.
        </p>
        <SEOAppBridge
          title="RAMS Generator creates PTW supporting documents"
          description="Describe your job in plain English and the AI generates risk assessments, method statements, and permit-to-work templates in under 60 seconds. Site-specific, CDM 2015 compliant, ready for the permit issuer."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Permit to Work Mistakes',
    content: (
      <>
        <p>
          Permit-to-work systems fail when they are treated as bureaucratic exercises rather than
          genuine safety controls. The following mistakes undermine the effectiveness of the permit
          system and have been identified as contributing factors in serious incidents.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Issuing permits without visiting the work area
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A permit issued from an office without the issuer physically verifying the
                  conditions at the work location is worthless. The permit issuer must see the
                  isolation points, confirm the lock-off is in place, check that barriers and
                  signage are erected, and verify that conditions match what is described in the
                  permit. Remote or desk-based permit issuing bypasses the physical verification
                  that is the whole point of the system.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Working outside the scope of the permit
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  If the work changes or expands beyond what was originally described in the permit,
                  a new permit is required. "While I'm here, I'll just..." is a dangerous phrase.
                  The additional work has not been risk-assessed, the precautions may not be
                  adequate, and the permit issuer has not authorised it. Any change in scope
                  requires stopping work, reporting the change, and obtaining a new or amended
                  permit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not closing out permits properly</h3>
                <p className="text-white text-sm leading-relaxed">
                  A permit that is not formally closed out remains active. This means the equipment
                  is still considered under the control of the permit holder, which can cause
                  confusion about whether the circuit is safe to re-energise. Proper close-out
                  requires the permit holder to confirm all work is complete and all persons are
                  clear, and the permit issuer to inspect and cancel the permit before the circuit
                  is returned to service.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Using generic or vague descriptions</h3>
                <p className="text-white text-sm leading-relaxed">
                  "Electrical work in Building A" is not a valid permit description. The permit must
                  specify the exact work, the exact location, and the exact equipment involved.
                  "Isolation and replacement of 63 A MCCB on DB-3A, Panel 2, Ground Floor Plant
                  Room, Building A" is what a permit description should look like. Vague
                  descriptions lead to misunderstandings about what is authorised and what
                  precautions are required.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">
                  Treating the permit as a tick-box exercise
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  When permit systems become routine, there is a tendency to rush through the
                  process without genuine engagement. The permit issuer signs without reading, the
                  permit holder signs without understanding, and neither party has actually verified
                  the precautions. This normalised deviation erodes the safety culture and
                  eventually leads to an incident. Every permit must be treated as a fresh safety
                  assessment, regardless of how many times similar work has been done before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Complete GS 38 prove-test-prove method, lock-off, and LOTO procedures.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electrical-work',
    title: 'Risk Assessment for Electrical Work',
    description: 'Five-step risk assessment process, hazard identification, and control measures.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/method-statement-electrical',
    title: 'Method Statement for Electrical Work',
    description: 'Writing effective method statements for electrical installations.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'Personal protective equipment requirements for electrical work on site.',
    icon: HardHat,
    category: 'Guide',
  },
  {
    href: '/guides/gs38-proving-dead',
    title: 'GS 38 Proving Dead',
    description: 'Voltage indicator requirements and the prove-test-prove procedure.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate risk assessments, method statements, and PTW templates with AI.',
    icon: Brain,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PermitToWorkPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-01-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Hub"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Permit to Work for Electricians:{' '}
          <span className="text-yellow-400">Complete Safety Guide</span>
        </>
      }
      heroSubtitle="The complete guide to permit-to-work systems for electrical work in the UK. When a PTW is required, types of permits, the permit process from request to close-out, safe isolation integration, legal requirements under the Electricity at Work Regulations 1989, and common mistakes that compromise safety."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="The Permit to Work Process: Step by Step"
      howToDescription="The formal permit-to-work process from initial request through to close-out and cancellation, following HSE guidance."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Generate PTW templates and RAMS with AI"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI-powered RAMS generation, safe isolation checklists, and professional safety documentation. 7-day free trial, cancel anytime."
    />
  );
}
