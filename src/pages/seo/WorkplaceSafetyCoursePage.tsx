import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Shield,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Flame,
  HeartPulse,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Workplace Safety Course | Electrical Industry Health & Safety';
const PAGE_DESCRIPTION =
  'Comprehensive workplace safety training for UK electricians. HASAWA, risk assessment, manual handling, COSHH, fire safety, first aid, PPE, and electrical safety on site. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Workplace Safety', href: '/training/workplace-safety-course' },
];

const tocItems = [
  { id: 'why-workplace-safety', label: 'Why Workplace Safety Matters' },
  { id: 'hasawa', label: 'Health and Safety at Work Act' },
  { id: 'risk-assessment', label: 'Risk Assessment' },
  { id: 'manual-handling', label: 'Manual Handling' },
  { id: 'coshh', label: 'COSHH: Hazardous Substances' },
  { id: 'fire-safety', label: 'Fire Safety' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Health and Safety at Work etc. Act 1974 (HASAWA) is the foundation of UK workplace safety law — it places duties on employers to ensure the health, safety, and welfare of employees, and on employees to take reasonable care of their own safety and the safety of others.',
  'Risk assessment is the most important practical safety tool for electricians — every task should be assessed for hazards, the risks evaluated, and appropriate control measures implemented before work begins.',
  'Manual handling injuries account for over 30% of all workplace injuries in the UK — electricians regularly lift cable drums, distribution boards, tools, and materials, making proper lifting technique essential.',
  'COSHH (Control of Substances Hazardous to Health) regulations apply to electricians who work with solvents, adhesives, sealants, cleaning chemicals, and who may encounter asbestos during installation work in older buildings.',
  'Elec-Mate includes AI-powered RAMS generation, interactive safety checklists, and toolbox talk templates that help electricians maintain professional safety standards on every project.',
];

const faqs = [
  {
    question: 'What are an employer duties under HASAWA?',
    answer:
      'Under Section 2 of the Health and Safety at Work etc. Act 1974, every employer has a duty, so far as is reasonably practicable, to ensure the health, safety, and welfare at work of all their employees. This includes: providing and maintaining plant and systems of work that are safe and without risk to health, making arrangements for the safe use, handling, storage, and transport of articles and substances, providing information, instruction, training, and supervision necessary to ensure health and safety, maintaining the workplace in a safe condition with safe access and egress, and providing a working environment that is safe and without risks to health with adequate welfare facilities. Employers with five or more employees must have a written health and safety policy. Employers must also consider the safety of non-employees (members of the public, visitors, other contractors) who may be affected by their work activities.',
  },
  {
    question: 'What are my duties as an employee under HASAWA?',
    answer:
      'Under Sections 7 and 8 of HASAWA, employees have a duty to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work. This means: following safe working procedures and using equipment as trained, wearing the PPE provided by your employer, reporting hazards, defects, and unsafe conditions to your employer or supervisor, not interfering with or misusing anything provided for health and safety (for example, not removing machine guards, disabling safety devices, or misusing fire extinguishers), cooperating with your employer on health and safety matters, and not undertaking work that you have not been trained and authorised to perform. These duties apply whether you are employed or self-employed — self-employed electricians have duties to themselves and to others affected by their work.',
  },
  {
    question: 'How do I carry out a risk assessment?',
    answer:
      'A risk assessment follows five steps: (1) Identify the hazards — walk the workplace and look for anything that could cause harm. For electrical work, common hazards include electric shock, burns, falls from height, manual handling injuries, exposure to asbestos, and fire. (2) Decide who might be harmed and how — consider your team, other trades, building occupants, and members of the public. (3) Evaluate the risks and decide on precautions — for each hazard, assess the likelihood and severity of harm and determine what control measures are needed. Use the hierarchy of controls: eliminate, substitute, engineering controls, administrative controls, and PPE. (4) Record your findings — document the hazards, who is at risk, and what control measures are in place. For significant findings, use a formal risk assessment form. (5) Review and update — risk assessments must be reviewed when circumstances change, when an incident occurs, or at regular intervals. Elec-Mate AI generates task-specific risk assessments for electrical work.',
  },
  {
    question: 'What PPE should electricians wear?',
    answer:
      'The PPE required depends on the specific task and the hazards present. Common PPE for electricians includes: safety boots with composite or steel toe caps and anti-penetration soles (required on most construction sites), safety glasses or goggles (when drilling, cutting, or working with chemicals), work gloves (for manual handling, cable pulling, and general protection — remove for precision electrical work), insulated gloves (rated to the appropriate voltage for live working or live testing), high-visibility clothing (required on construction sites and highways), hard hat (required on construction sites and wherever there is a risk of head injury from falling objects), hearing protection (when using power tools in enclosed spaces or working near noisy plant), and dust masks or respiratory protection (when drilling into masonry, cutting channels, or working in dusty environments). Your employer must assess the PPE requirements for each task, provide suitable PPE free of charge, train you in its use, and replace it when damaged or worn.',
  },
  {
    question: 'What should I do if I witness an accident on site?',
    answer:
      'If you witness an accident: (1) Make the area safe — do not put yourself at risk. If there is an electrical hazard, isolate the supply if you can do so safely. (2) Call for help — alert a first aider, call 999 if the injury is serious, and notify the site supervisor or manager. (3) Provide first aid if you are trained to do so — but only within your level of training. (4) Do not move the injured person unless they are in immediate danger (for example, from fire or further electrical contact). (5) Preserve the scene — do not disturb the accident scene as it may need to be investigated. (6) Report the accident — complete an accident report form as required by your employer. Certain injuries and incidents must be reported to the HSE under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013), including fatalities, specified injuries (fractures, amputations, loss of consciousness), injuries requiring hospital admission, and dangerous occurrences such as electrical short circuits causing fire or explosion.',
  },
  {
    question: 'Do I need a first aid qualification as an electrician?',
    answer:
      'There is no legal requirement for every electrician to hold a first aid qualification, but the Health and Safety (First-Aid) Regulations 1981 require employers to provide adequate first aid arrangements for their employees. On construction sites, the principal contractor must ensure adequate first aid cover is available. Many electrical contractors encourage or require their electricians to hold a basic first aid certificate — typically the 1-day Emergency First Aid at Work (EFAW) course. This covers basic life support (CPR), dealing with choking, management of bleeding, treatment for burns and scalds, and recognition of medical emergencies. For electricians, first aid knowledge is particularly relevant because of the risk of electric shock — knowing how to safely disconnect a casualty from a live source and administer CPR can save a life. A 3-day First Aid at Work (FAW) course provides more comprehensive training and is recommended for site supervisors and those working in remote locations.',
  },
];

const modules = [
  {
    title: 'The Legal Framework: HASAWA and Key Regulations',
    description:
      'Health and Safety at Work etc. Act 1974, Management of Health and Safety at Work Regulations 1999, employer and employee duties, the role of the HSE, and enforcement powers.',
  },
  {
    title: 'Risk Assessment for Electrical Work',
    description:
      'The five-step risk assessment process, hazard identification for electrical tasks, hierarchy of controls, recording and communicating findings, and review procedures. Task-specific vs generic assessments.',
  },
  {
    title: 'Manual Handling',
    description:
      'Manual Handling Operations Regulations 1992, TILE assessment (Task, Individual, Load, Environment), safe lifting techniques, cable drum handling, distribution board lifting, and avoiding musculoskeletal injuries.',
  },
  {
    title: 'COSHH: Control of Substances Hazardous to Health',
    description:
      'COSHH Regulations 2002, identifying hazardous substances in electrical work (solvents, adhesives, cable lubricants, asbestos), safety data sheets, exposure controls, and emergency procedures.',
  },
  {
    title: 'Fire Safety and Emergency Procedures',
    description:
      'Regulatory Reform (Fire Safety) Order 2005, fire risk assessment, fire extinguisher types and use, evacuation procedures, electrical causes of fire, and arc flash hazards.',
  },
  {
    title: 'Electrical Safety on Site',
    description:
      'Safe isolation procedures, lock-out/tag-out, reduced low voltage systems (110V), portable appliance safety, temporary electrical installations, and working near existing live equipment.',
  },
  {
    title: 'PPE and Welfare',
    description:
      'Personal Protective Equipment at Work Regulations 1992, PPE selection for electrical work, maintenance and replacement, welfare facilities requirements, and noise and vibration exposure.',
  },
  {
    title: 'First Aid and Incident Reporting',
    description:
      'Health and Safety (First-Aid) Regulations 1981, emergency first aid for electrical injuries, CPR for electric shock casualties, RIDDOR reporting requirements, and accident investigation.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any health and safety question in plain English. Get detailed answers on HASAWA duties, risk assessment procedures, COSHH requirements, and PPE selection.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of safe lifting techniques, fire extinguisher use, PPE selection, and safe isolation procedures — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge with scenario-based questions. Identify hazards, select control measures, apply COSHH procedures, and respond to workplace incidents.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Complete workplace safety training at your own pace.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering legislation, hazard types, control measures, PPE requirements, and reporting procedures.',
  },
  {
    icon: FileCheck2,
    title: 'AI RAMS Generator',
    description:
      'Generate professional risk assessments and method statements for every type of electrical work — CDM-compliant documentation from your phone in minutes.',
  },
];

const sections = [
  {
    id: 'why-workplace-safety',
    heading: 'Why Workplace Safety Training Matters for Electricians',
    content: (
      <>
        <p>
          Electrical work is one of the most hazardous occupations in the UK. Electricians face
          risks from electric shock, burns, falls from height, manual handling injuries, exposure to
          hazardous substances, and fire. The Health and Safety Executive (HSE) reports
          approximately 1,000 workplace electrical injuries per year, with an average of 4 to 5
          fatalities.
        </p>
        <p>
          Beyond the obvious electrical hazards, electricians work in environments that present
          additional risks: construction sites with multiple trades and heavy plant, domestic
          properties with unknown hazards (asbestos, defective wiring), industrial premises with
          chemical and mechanical hazards, and confined spaces such as ceiling voids, risers, and
          cable trenches.
        </p>
        <p>
          Comprehensive workplace safety training equips you to recognise these hazards, assess the
          risks, and implement effective control measures. It is not just about passing a course —
          it is about developing the safety awareness and practical skills that prevent injuries and
          save lives.
        </p>
        <p>
          For self-employed electricians, safety training is also a business requirement. Most
          principal contractors require evidence of health and safety training as a condition of
          site access, and competent person schemes (NICEIC, NAPIT, ELECSA) assess your safety
          management as part of their registration and renewal process.
        </p>
      </>
    ),
  },
  {
    id: 'hasawa',
    heading: 'The Health and Safety at Work etc. Act 1974',
    content: (
      <>
        <p>
          The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary piece of legislation
          governing workplace health and safety in the UK. It establishes the general duties of
          employers, employees, the self-employed, and others to ensure health, safety, and welfare
          at work.
        </p>
        <p>
          For electricians, the key sections are: Section 2 (employer duties to employees), Section
          3 (employer duties to non-employees), Section 7 (employee duties), and Section 8 (duty not
          to interfere with safety provisions). These sections create a framework of shared
          responsibility — your employer must provide a safe working environment, safe equipment,
          and adequate training, and you must follow safe working procedures, use equipment
          correctly, and report hazards.
        </p>
        <p>
          HASAWA is an enabling Act — it provides the framework under which more detailed
          regulations are made. Key regulations for electricians include the Management of Health
          and Safety at Work Regulations 1999, the Electricity at Work Regulations 1989, the{' '}
          <SEOInternalLink href="/training/cdm-regulations-course">
            Construction (Design and Management) Regulations 2015
          </SEOInternalLink>
          , the Work at Height Regulations 2005, and the Manual Handling Operations Regulations
          1992.
        </p>
        <SEOAppBridge
          title="Study health and safety law with AI explanations"
          description="Confused by the difference between HASAWA and the Management Regulations? Ask the Elec-Mate AI tutor any health and safety question and get clear, practical guidance."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Risk Assessment: The Foundation of Safe Working',
    content: (
      <>
        <p>
          Risk assessment is the practical application of health and safety law. Before starting any
          task, you should assess the hazards, evaluate the risks, and decide on the control
          measures needed to work safely. For routine tasks, this can be a mental assessment. For
          complex or high-risk tasks, a formal written risk assessment is required.
        </p>
        <p>
          The five-step approach recommended by the HSE is: identify the hazards, determine who
          might be harmed and how, evaluate the risks and decide on precautions, record your
          findings, and review and update the assessment as needed.
        </p>
        <p>
          For electricians, common hazards include: electric shock and burns from contact with live
          conductors, arc flash from short circuits in switchgear,{' '}
          <SEOInternalLink href="/training/working-at-height">falls from height</SEOInternalLink>{' '}
          when accessing cable routes and fittings, manual handling injuries from lifting heavy
          equipment, exposure to asbestos in older buildings, cuts and abrasions from sharp edges
          and power tools, and fire from overloaded circuits or faulty connections.
        </p>
        <p>
          The hierarchy of controls guides your choice of control measures: eliminate the hazard
          (redesign the task to remove the risk), substitute with something less hazardous,
          engineering controls (guards, barriers, ventilation), administrative controls (procedures,
          training, signage), and PPE as a last resort. Always work through the hierarchy from top
          to bottom — PPE should never be the first or only control measure.
        </p>
      </>
    ),
  },
  {
    id: 'manual-handling',
    heading: 'Manual Handling: Protecting Your Body',
    content: (
      <>
        <p>
          Manual handling injuries — sprains, strains, and musculoskeletal disorders — account for
          over 30% of all workplace injuries reported to the HSE. For electricians, common manual
          handling tasks include lifting cable drums, carrying distribution boards and consumer
          units up stairs, pulling cables through containment, lifting conduit and trunking, and
          manoeuvring heavy test equipment.
        </p>
        <p>
          The Manual Handling Operations Regulations 1992 require employers to avoid hazardous
          manual handling operations so far as reasonably practicable, assess any manual handling
          operations that cannot be avoided, and reduce the risk of injury so far as reasonably
          practicable. The TILE assessment framework helps you evaluate manual handling risks:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">T — Task</h3>
            <p className="text-white text-sm leading-relaxed">
              Does the task involve twisting, bending, reaching, pushing, pulling, or holding the
              load away from the body? Can the task be redesigned to reduce these demands?
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">I — Individual</h3>
            <p className="text-white text-sm leading-relaxed">
              Does the individual have any health conditions, injuries, or limitations that affect
              their ability to handle the load safely? Are they trained in safe lifting techniques?
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">L — Load</h3>
            <p className="text-white text-sm leading-relaxed">
              How heavy is the load? Is it bulky, unwieldy, or difficult to grip? Is the weight
              distributed unevenly? Can it be broken down into smaller loads?
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">E — Environment</h3>
            <p className="text-white text-sm leading-relaxed">
              Are there space constraints, uneven floors, stairs, slopes, poor lighting, or extreme
              temperatures that make handling more difficult or dangerous?
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'coshh',
    heading: 'COSHH: Working With Hazardous Substances',
    content: (
      <>
        <p>
          The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers
          to control exposure to hazardous substances in the workplace. For electricians, the most
          common hazardous substances encountered are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solvents and degreasers</strong> used for cleaning electrical contacts and
                equipment. Many contain volatile organic compounds (VOCs) that can cause headaches,
                dizziness, and respiratory irritation. Use in well-ventilated areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable lubricants and pulling compounds</strong> used during cable
                installation. Some contain skin sensitisers — wear gloves and wash hands thoroughly
                after use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Silicone sealants and adhesives</strong> used for sealing cable entries and
                fixing equipment. Some release acetic acid vapour during curing — ensure adequate
                ventilation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Asbestos</strong> — electricians working in buildings built before 2000 may
                encounter asbestos in insulation board, textured coatings, floor tiles, and pipe
                lagging. Never disturb suspected asbestos — stop work and report it. See the{' '}
                <SEOInternalLink href="/training/asbestos-awareness">
                  asbestos awareness course
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dust</strong> from drilling, chasing, and cutting. Construction dust
                (especially silica dust from masonry) can cause serious respiratory disease. Use
                dust extraction, wet cutting methods, and appropriate respiratory protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For every hazardous substance you use, your employer must provide a COSHH assessment and
          you should read the manufacturer safety data sheet (SDS). The SDS tells you what the
          hazards are, what PPE to use, what to do in case of exposure, and how to store and dispose
          of the substance safely.
        </p>
      </>
    ),
  },
  {
    id: 'fire-safety',
    heading: 'Fire Safety: Prevention and Emergency Response',
    content: (
      <>
        <p>
          Electrical faults are one of the leading causes of workplace fires in the UK. As an
          electrician, you have a dual responsibility: preventing electrical fires through quality
          installation work, and knowing how to respond if a fire breaks out.
        </p>
        <p>
          Fire prevention starts with your installation work. Properly rated cables, correctly sized
          protective devices, tight terminations, adequate ventilation for equipment that generates
          heat, and compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink> are
          all fire prevention measures. During construction, additional risks include hot work
          (soldering, brazing), use of flammable solvents, and temporary electrical installations
          with inadequate protection.
        </p>
        <p>
          Fire response requires knowing the location of fire exits, assembly points, fire
          extinguishers, and fire alarm call points on every site you work on. Familiarise yourself
          with the emergency procedures during your site induction. If you discover a fire: raise
          the alarm, call 999, evacuate via the nearest safe route, and do not attempt to fight the
          fire unless it is very small and you are trained in the use of the available extinguisher.
        </p>
        <p>
          Understanding fire extinguisher types is important: water (for solid materials), foam (for
          liquids), CO2 (for electrical fires and liquids), and dry powder (for all fire types but
          creates poor visibility). Never use water on an electrical fire — CO2 or dry powder
          extinguishers are the correct choice.
        </p>
        <SEOAppBridge
          title="Complete workplace safety training on your phone"
          description="Elec-Mate covers all essential workplace safety topics — HASAWA, risk assessment, manual handling, COSHH, fire safety, and first aid. Study at your own pace and earn CPD certificates."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation training — the essential electrical safety procedure.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
  {
    href: '/training/ppe-for-electricians',
    title: 'PPE Guide for Electricians',
    description: 'Complete guide to selecting and using PPE for electrical installation work.',
    icon: HardHat,
    category: 'Training' as const,
  },
  {
    href: '/training/site-safety',
    title: 'Site Safety Course',
    description:
      'Broader site safety training covering construction-specific hazards and procedures.',
    icon: AlertTriangle,
    category: 'Training' as const,
  },
  {
    href: '/training/first-aid-course',
    title: 'First Aid Course',
    description: 'Emergency first aid training including CPR for electric shock casualties.',
    icon: HeartPulse,
    category: 'Training' as const,
  },
  {
    href: '/tools/rams-generator',
    title: 'AI RAMS Generator',
    description: 'Generate professional risk assessments and method statements from your phone.',
    icon: FileCheck2,
    category: 'Tool' as const,
  },
  {
    href: '/training/asbestos-awareness',
    title: 'Asbestos Awareness Course',
    description:
      'Essential awareness training for electricians working in buildings built before 2000.',
    icon: AlertTriangle,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Workplace Safety Course for Electricians',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Beginner',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT10H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WorkplaceSafetyCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Health & Safety Training"
      badgeIcon={Shield}
      heroTitle={
        <>
          Workplace Safety:{' '}
          <span className="text-yellow-400">Health and Safety for Electricians</span>
        </>
      }
      heroSubtitle="Master the essential workplace safety knowledge every electrician needs. HASAWA, risk assessment, manual handling, COSHH, fire safety, first aid, PPE, and electrical safety. 8 modules with video content, interactive quizzes, and AI tutor."
      readingTime={14}
      courseDuration="10 hours"
      courseLevel="Beginner"
      coursePrerequisites="No prior health and safety training required — suitable for all electricians from apprentice to experienced"
      courseModules={8}
      courseCertification="CPD certificate on completion — evidence of health and safety awareness for site inductions and scheme assessments"
      courseWhoIsItFor="Apprentice electricians starting their career, qualified electricians refreshing their safety knowledge, self-employed electricians managing their own health and safety, and supervisors responsible for team safety"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Make safety second nature"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. Comprehensive safety modules, AI RAMS generator, and an AI tutor for any health and safety question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/workplace-safety-course"
    />
  );
}
