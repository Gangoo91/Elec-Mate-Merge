import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  BookOpen,
  Zap,
  FileCheck2,
  Award,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'C&G 2365', href: '/guides/city-guilds-2365-electrical' },
  { label: 'Unit 201', href: '/guides/city-guilds-2365-unit-201' },
];

const tocItems = [
  { id: 'overview', label: 'What is Unit 201?' },
  { id: 'hasawa', label: 'HASAWA 1974: The Foundation' },
  { id: 'coshh', label: 'COSHH Regulations' },
  { id: 'riddor', label: 'RIDDOR: Reporting Injuries' },
  { id: 'risk-assessment', label: 'Risk Assessment Process' },
  { id: 'ppe', label: 'Personal Protective Equipment' },
  { id: 'exam-structure', label: 'Exam Structure and Revision Tips' },
  { id: 'for-apprentices', label: 'Elec-Mate Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Unit 201 — Health and Safety in Building Services Engineering — is a mandatory knowledge unit within the City & Guilds 2365 Level 2 and Level 3 Diploma in Electrical Installations.',
  'The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary UK health and safety legislation. It places duties on employers, employees, the self-employed, and manufacturers of equipment and substances.',
  'COSHH (Control of Substances Hazardous to Health Regulations 2002) requires employers to assess the risk from hazardous substances (chemicals, dusts, fumes) and implement controls to protect workers.',
  'RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires certain workplace injuries, work-related ill health, and dangerous occurrences to be reported to the Health and Safety Executive (HSE).',
  'A five-step risk assessment process — identify hazards, identify who could be harmed, evaluate risk and controls, record findings, review — is central to Unit 201 and all practical site safety work.',
];

const faqs = [
  {
    question: 'What legislation does Unit 201 cover?',
    answer:
      'Unit 201 covers the main health and safety legislation relevant to building services engineering work. The primary legislation is the Health and Safety at Work etc. Act 1974 (HASAWA). Key regulations made under HASAWA that Unit 201 covers include: the Management of Health and Safety at Work Regulations 1999 (MHSWR) — which establish the duty to carry out risk assessments; the Control of Substances Hazardous to Health Regulations 2002 (COSHH); the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR); the Provision and Use of Work Equipment Regulations 1998 (PUWER) — covering tools and machinery; the Manual Handling Operations Regulations 1992; the Personal Protective Equipment at Work Regulations 1992; and the Electricity at Work Regulations 1989 (EWR 1989), which are of particular relevance to electrical apprentices. Understanding how these regulations relate to each other — HASAWA as the parent Act, regulations as more detailed subsidiary requirements — is important for the Unit 201 exam.',
  },
  {
    question: 'What are an employer\'s duties under HASAWA 1974?',
    answer:
      'Section 2 of HASAWA places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This includes: providing and maintaining safe plant and systems of work; making arrangements for ensuring the safe use, handling, storage, and transport of articles and substances; providing necessary information, instruction, training, and supervision; maintaining the workplace in a safe condition with safe means of access and egress; and providing and maintaining a safe working environment with adequate welfare facilities. The phrase "so far as is reasonably practicable" is a key qualification — it means balancing the risk against the cost and effort of controlling it. Employers are not required to eliminate all risk, but must reduce risk to a level that is proportionate. Employees also have duties under Section 7 of HASAWA: to take reasonable care of themselves and others, and to cooperate with the employer on health and safety matters.',
  },
  {
    question: 'What does COSHH require electricians to do?',
    answer:
      'COSHH requires employers to assess the health risks from exposure to hazardous substances in the workplace and to implement appropriate controls. For electricians, hazardous substances commonly encountered include: asbestos (in older buildings — requires specific Asbestos at Work Regulations compliance); silica dust from drilling concrete and brick; chemical solvents in cable jointing compounds, adhesives, and cleaning agents; and lead in older soldering and cable sheathing. The COSHH hierarchy of controls mirrors the general risk assessment hierarchy: eliminate the substance (use a safer alternative), substitute with a less hazardous substance, control by engineering measures (local exhaust ventilation, enclosed systems), administrative controls (limiting exposure time, safe working procedures), and finally PPE as the last resort. In Unit 201 exams, questions frequently ask students to identify the COSHH hierarchy and apply it to a specific scenario involving a hazardous substance on a building site.',
  },
  {
    question: 'What injuries and occurrences must be reported under RIDDOR?',
    answer:
      'RIDDOR 2013 requires the responsible person (employer, self-employed person, or person in control of premises) to report specified categories of work-related incidents to the HSE. These include: deaths — all work-related deaths must be reported; specified injuries — broken bones (other than fingers, thumbs, or toes), amputations, injuries resulting in permanent loss of sight or reduction of sight, crush injuries, scalding, chemical burns, head injuries, and any injuries requiring hospital treatment; dangerous occurrences — near misses with serious potential consequences, including electrical flash and arc events, explosions, and structural collapses; and occupational diseases — certain conditions diagnosed by a doctor and related to work activities, including occupational asthma, tendonitis, carpal tunnel syndrome, and skin diseases. For apprentices, the most relevant RIDDOR scenarios are electrical accidents, falls from height (ladders, platforms), and musculoskeletal injuries from manual handling.',
  },
  {
    question: 'What is the five-step risk assessment process?',
    answer:
      'The HSE five-step risk assessment process is the standard approach in UK health and safety management, required by the Management of Health and Safety at Work Regulations 1999. The five steps are: Step 1 — Identify the hazards (what could cause harm? Look at activities, equipment, substances, and the working environment). Step 2 — Decide who might be harmed and how (employees, apprentices, contractors, members of the public, vulnerable persons). Step 3 — Evaluate the risks and decide on precautions (what is the likelihood and severity of harm? What controls are already in place? What additional controls are needed?). Step 4 — Record your findings and implement them (for employers with five or more employees, the risk assessment must be written down). Step 5 — Review your risk assessment and update if necessary (when working conditions change, after an accident or near miss, or at regular intervals). In Unit 201 exams, students are expected to apply this process to specific scenarios and identify appropriate control measures.',
  },
  {
    question: 'What PPE is required for electrical installation work?',
    answer:
      'Personal Protective Equipment (PPE) for electrical installation work varies with the specific task. PPE is always the last resort in the hierarchy of controls — engineering and administrative controls should be used first. PPE commonly required for electrical installation work includes: safety footwear (steel toe cap, and mid-sole protection for sites with penetration hazards); hard hat (on construction sites and where overhead work is in progress); high-visibility vest or jacket (near vehicle movements); safety glasses or goggles (drilling, chasing, cutting, cable routing); work gloves (handling cables, sharp edges, and rough materials — note: standard work gloves do not provide electrical insulation); ear protection (sustained use of SDS drills and angle grinders); and dust masks (FFP2 minimum for concrete and silica dust, FFP3 for asbestos awareness situations). Electrical insulating gloves (rated to IEC 60903) are required for live working by approved personnel — apprentices must NEVER work live.',
  },
  {
    question: 'How is Unit 201 assessed?',
    answer:
      'Unit 201 in the City & Guilds 2365 Diploma is assessed by a written online examination. The exam consists of multiple choice and short-answer questions covering the legislation, regulations, risk assessment process, and PPE requirements covered in the unit. Typical exam duration is 1 hour for the Level 2 version and approximately 1.5 hours for Level 3. Questions often present a scenario (for example, a description of a work activity on a construction site) and ask students to identify the legislation that applies, the risks present, or the appropriate controls. Revision should focus on: understanding the purpose and key requirements of each piece of legislation, knowing the hierarchy of risk controls, being able to apply the five-step risk assessment to practical scenarios, and understanding when RIDDOR reporting is required and to whom.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/city-guilds-2365-unit-202',
    title: 'C&G 2365 Unit 202 — Principles of Building Services Engineering',
    description: 'Ohm\'s law, electrical principles, AC/DC, and SI units for the Unit 202 exam.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-electrical',
    title: 'City & Guilds 2365 Complete Overview',
    description: 'Full qualification structure, units, assessment, and progression routes.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/am2-assessment-preparation',
    title: 'AM2 Assessment Preparation',
    description: 'What the AM2 practical assessment covers and how to prepare.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/apprentice-hub',
    title: 'Apprentice Training Hub',
    description: 'Full Level 2 and Level 3 training modules with AI study support.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/apprentice-portfolio-building-tips',
    title: 'Apprentice Portfolio Building Tips',
    description: 'NVQ evidence requirements, observation records, and portfolio organisation.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/supervising-electrical-apprentices',
    title: 'Supervising Electrical Apprentices',
    description: 'Employer obligations, supervision ratios, and AM2 support guidance.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is City & Guilds 2365 Unit 201?',
    content: (
      <>
        <p>
          Unit 201 — Health and Safety in Building Services Engineering — is one of the mandatory
          knowledge units within the City & Guilds 2365 Diploma in Electrical Installations. It
          appears at both Level 2 (the foundation diploma completed in the first two years of an
          apprenticeship) and in expanded form at Level 3 (the advanced technical certificate
          completed in years three and four).
        </p>
        <p>
          The unit establishes the legislative and practical framework for working safely in the
          building services engineering sector. Health and safety knowledge is not just an exam
          requirement — it directly underpins every practical task an electrician carries out on
          site, from safe isolation before testing to COSHH assessments for hazardous materials
          encountered in older buildings.
        </p>
        <p>
          Understanding Unit 201 thoroughly benefits apprentices in three ways: it provides the
          knowledge needed to pass the written examination, it supports the health and safety
          observations required for the NVQ practical portfolio, and it builds the instincts that
          keep electricians safe throughout a career.
        </p>
      </>
    ),
  },
  {
    id: 'hasawa',
    heading: 'HASAWA 1974: The Foundation of UK Health and Safety Law',
    content: (
      <>
        <p>
          The Health and Safety at Work etc. Act 1974 (HASAWA) is the primary legislation that
          governs health and safety in the workplace in Great Britain. All subsequent health and
          safety regulations are made under the authority of HASAWA. Understanding its structure
          is essential for Unit 201.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2">Section 2 — Duties of Employers to Employees</h3>
            <p className="text-white text-sm leading-relaxed">
              Employers must ensure, so far as is reasonably practicable, the health, safety, and
              welfare of all employees. This includes safe systems of work, safe plant and equipment,
              safe use of substances, adequate training and supervision, and a safe working environment.
              Employers with five or more employees must have a written health and safety policy.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Section 3 — Duties to Non-Employees</h3>
            <p className="text-white text-sm leading-relaxed">
              Employers and self-employed persons have a duty to ensure their work activities do not
              expose people who are not their employees to health and safety risks. This covers members
              of the public, customers, and contractors who may be affected by the work.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Section 7 — Duties of Employees</h3>
            <p className="text-white text-sm leading-relaxed">
              Employees must take reasonable care of their own health and safety and that of others
              who may be affected by their acts or omissions. They must also cooperate with their
              employer on health and safety matters. This section is frequently tested in Unit 201
              exams — apprentices have legal duties, not just employers.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Section 8 — Duty Not to Interfere</h3>
            <p className="text-white text-sm leading-relaxed">
              Nobody may intentionally or recklessly interfere with or misuse anything provided in
              the interests of health and safety. Removing safety guards, disabling isolation
              mechanisms, or interfering with PPE provided by an employer is a criminal offence
              under this section.
            </p>
          </div>
        </div>
        <p>
          The phrase "so far as is reasonably practicable" appears throughout HASAWA and its
          regulations. It means that the time, trouble, and cost of implementing a control measure
          must be proportionate to the risk it addresses. Very high risks require control regardless
          of cost; very low risks may justify less stringent controls.
        </p>
      </>
    ),
  },
  {
    id: 'coshh',
    heading: 'COSHH: Controlling Hazardous Substances',
    content: (
      <>
        <p>
          The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers
          to assess the health risks from hazardous substances encountered in the workplace and
          implement controls to prevent ill health. In electrical installation, the most commonly
          encountered hazardous substances are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Silica dust</strong> — from drilling and cutting concrete, brick, and stone. Prolonged exposure causes silicosis, an irreversible lung disease. FFP2 dust masks and water suppression or LEV (local exhaust ventilation) are required.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Asbestos</strong> — found in older buildings (pre-2000) in insulation, ceiling tiles, artex, pipe lagging, and some electrical equipment. Disturbing asbestos is the single most serious occupational health hazard for electricians working in older buildings. Licensed removal is required for high-risk asbestos types.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Chemical solvents</strong> — in cable jointing compounds, pipe adhesives, and cleaning solvents. May be flammable (fire risk in enclosed spaces) and harmful by inhalation or skin contact. Use in ventilated areas with appropriate gloves and eye protection.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Biological hazards</strong> — sewage contamination in underground cable routes and drainage trenches. Appropriate PPE and hygiene controls are required when working in contaminated environments.</span>
            </li>
          </ul>
        </div>
        <p>
          The COSHH hierarchy of control — eliminate, substitute, engineering controls, administrative
          controls, PPE — is a key exam topic. Students should be able to apply the hierarchy to a
          given scenario and identify the most appropriate control measure at each level.
        </p>
      </>
    ),
  },
  {
    id: 'riddor',
    heading: 'RIDDOR: Reporting Requirements for Electricians',
    content: (
      <>
        <p>
          RIDDOR 2013 (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations)
          requires the responsible person to report certain categories of workplace incidents to
          the Health and Safety Executive. Reports are submitted via the HSE website (hse.gov.uk)
          within specified timeframes:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Deaths:</strong> Report immediately by telephone to HSE and follow up with a written report within 10 days.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Specified injuries:</strong> (broken bones, amputations, burns, head injuries, loss of consciousness) — report within 10 days. Include injuries to members of the public that require hospital treatment.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Over-7-day incapacitation:</strong> If an employee cannot perform their normal work duties for more than 7 consecutive days (not counting the day of the accident), report within 15 days of the accident.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Dangerous occurrences:</strong> Near misses that could have caused death or serious injury. For electricians, relevant examples include electrical flashover events, explosions from energised equipment, and collapses of excavations.</span>
            </li>
          </ul>
        </div>
        <p>
          Note that all workplace accidents must be recorded in the employer's accident book regardless
          of whether RIDDOR reporting is required. The accident book entry is distinct from the RIDDOR
          report and covers all workplace accidents, however minor.
        </p>
      </>
    ),
  },
  {
    id: 'risk-assessment',
    heading: 'Risk Assessment: The Five-Step Process',
    content: (
      <>
        <p>
          The Management of Health and Safety at Work Regulations 1999 require employers to carry
          out a suitable and sufficient risk assessment of the risks to employees and others arising
          from their work activities. The HSE five-step approach is the accepted method:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div>
                <strong>Identify the hazards</strong>
                <p className="text-white text-sm leading-relaxed mt-1">Walk the work area and identify everything that could cause harm. Consider the task, materials, equipment, environment, and the people involved. A hazard is anything with the potential to cause harm (not the same as a risk — risk considers the likelihood of harm occurring).</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div>
                <strong>Decide who might be harmed and how</strong>
                <p className="text-white text-sm leading-relaxed mt-1">Identify all persons who could be affected — not just employees but also contractors, visitors, members of the public, and vulnerable groups such as young persons (including apprentices under 18), pregnant workers, and those with disabilities.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div>
                <strong>Evaluate the risks and decide on precautions</strong>
                <p className="text-white text-sm leading-relaxed mt-1">Assess the likelihood and severity of harm for each hazard. Identify existing controls and determine whether they are adequate. Apply the hierarchy of control: eliminate, substitute, engineering controls, administrative controls, PPE.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <div>
                <strong>Record your findings and implement them</strong>
                <p className="text-white text-sm leading-relaxed mt-1">Employers with five or more employees must record the significant findings. The record must show the hazards, the people at risk, and the controls in place. Implement the controls identified in step 3.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <div>
                <strong>Review your risk assessment and update if necessary</strong>
                <p className="text-white text-sm leading-relaxed mt-1">Review when work conditions change, new hazards are identified, following an accident or near miss, or at regular intervals (annually for most operations). Update the risk assessment to reflect any changes.</p>
              </div>
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Generate risk assessments with AI on site"
          description="Elec-Mate's AI creates site-specific method statements and risk assessments for electrical installation work. COSHH, manual handling, working at height, and electrical hazards covered. Professional PDF output."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'ppe',
    heading: 'Personal Protective Equipment (PPE)',
    content: (
      <>
        <p>
          PPE is always the last resort in the hierarchy of controls. It protects only the wearer
          and provides no protection if it fails, is removed, or is worn incorrectly. However, where
          other controls cannot eliminate or adequately reduce risk, appropriate PPE is a legal
          requirement under the Personal Protective Equipment at Work Regulations 1992.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Head protection:</strong> Hard hat (EN 397 or EN 14052 high-performance helmet) — required on construction sites and where overhead work or materials at height create impact risk.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Eye protection:</strong> Safety glasses (EN 166) for general use; goggles for chemical splash or grinding. Essential during drilling, chasing, cutting, and cable pulling through conduit.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Foot protection:</strong> Safety footwear with steel toecap (EN ISO 20345). Mid-sole protection (M rating) where ground penetration hazard exists. Standard for all site work.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Hearing protection:</strong> Ear defenders or ear plugs (EN 352) — required when noise exposure exceeds 80dB(A) action level. SDS drilling and angle grinding regularly exceed this level.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>Respiratory protection:</strong> Dust masks — FFP2 for general construction dust, FFP3 for higher-hazard dusts (silica-heavy operations). Fit-tested for effective protection. Vital when drilling concrete or working in dusty environments.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span><strong>High-visibility clothing:</strong> Required near vehicle movements — EN 471 or EN ISO 20471 rated. Mandatory on most construction sites.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'exam-structure',
    heading: 'Unit 201 Exam Structure and Revision Tips',
    content: (
      <>
        <p>
          The Unit 201 written examination tests knowledge of health and safety legislation,
          regulations, risk assessment, COSHH, RIDDOR, and PPE. Here is how to approach the exam:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Exam Format</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Multiple choice questions (select the correct answer from four options)</li>
              <li>Short-answer questions (one or two sentences per answer)</li>
              <li>Scenario-based questions (describe a situation and ask for legislation, risks, or controls)</li>
              <li>Duration: approximately 1 hour (Level 2) to 1.5 hours (Level 3)</li>
              <li>Minimum pass mark: typically 70%</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Common Exam Topics</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Which legislation applies to a given scenario (HASAWA, COSHH, RIDDOR, MHSWR)</li>
              <li>Employer and employee duties under HASAWA Sections 2, 3, 7</li>
              <li>The COSHH hierarchy of controls in order</li>
              <li>Which injuries and occurrences require RIDDOR reporting</li>
              <li>The five steps of risk assessment in the correct order</li>
              <li>PPE selection for specific tasks (drilling, working at height, chemical handling)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Revision Tips</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Learn the full title and date of each piece of legislation — examiners test whether you know the correct name</li>
              <li>Memorise the five-step risk assessment process — it appears in almost every Unit 201 exam</li>
              <li>Practice applying COSHH controls to specific scenarios (silica dust, asbestos, solvents)</li>
              <li>Know the RIDDOR reporting timeframes: immediate for deaths, 10 days for specified injuries, 15 days for over-7-day incapacitation</li>
              <li>Use the Elec-Mate apprentice study flashcard tool to drill key legislation and regulations</li>
            </ul>
          </div>
        </div>
        <SEOAppBridge
          title="Study Unit 201 with AI-powered flashcards and practice questions"
          description="Elec-Mate's apprentice training hub includes Unit 201 study materials, AI-generated practice questions, and flashcards for HASAWA, COSHH, RIDDOR, and risk assessment. Study on your phone between jobs."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2365Unit201Page() {
  return (
    <GuideTemplate
      title="City & Guilds 2365 Unit 201 — Health and Safety | Revision Guide UK"
      description="Complete revision guide for City & Guilds 2365 Unit 201 — Health and Safety in Building Services Engineering. HASAWA 1974, COSHH, RIDDOR, five-step risk assessment, PPE, exam structure, and revision tips for electrical apprentices."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          C&G 2365 Unit 201:{' '}
          <span className="text-yellow-400">Health and Safety Revision Guide for Electrical Apprentices</span>
        </>
      }
      heroSubtitle="Comprehensive revision guide for City & Guilds 2365 Unit 201 — Health and Safety in Building Services Engineering. Covering HASAWA 1974, COSHH, RIDDOR, risk assessment, PPE, and exam technique for electrical apprentices."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About C&G 2365 Unit 201"
      relatedPages={relatedPages}
      ctaHeading="Study for C&G 2365 with AI-Powered Practice Questions"
      ctaSubheading="Join thousands of UK electrical apprentices using Elec-Mate for Unit 201, Unit 202, and all 2365 units — flashcards, practice exams, and AI study support. 7-day free trial."
    />
  );
}
