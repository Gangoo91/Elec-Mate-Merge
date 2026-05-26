/**
 * Module 1 · Section 2 · Subsection 3 — Hierarchy of Control
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Eliminate, substitute, engineer, administer, PPE — the order matters. Engineer-in-training
 *   perspective: how an HNC designer designs controls into the building services solution from
 *   day one, rather than bolting PPE on at the end.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Hierarchy of Control - HNC Module 1 Section 2.3';
const DESCRIPTION =
  'Master the hierarchy of control for building services: elimination, substitution, engineering controls, administrative controls and PPE with practical electrical examples.';

const quickCheckQuestions = [
  {
    id: 'most-effective-control',
    question: 'Which control measure is considered the MOST effective in the hierarchy?',
    options: [
      'PPE',
      'Administrative controls',
      'Elimination',
      'Engineering controls',
    ],
    correctIndex: 2,
    explanation:
      'Elimination is the most effective control as it completely removes the hazard. This should always be considered first before moving down the hierarchy to less effective controls.',
  },
  {
    id: 'substitution-example',
    question: 'Which is an example of substitution in building services?',
    options: [
      'Transmitter cannot source enough voltage, signal drops',
      'Mistakes and unsafe working practices',
      'To level the tower on slightly uneven ground',
      'Replacing solvent-based adhesive with water-based',
    ],
    correctIndex: 3,
    explanation:
      'Substitution replaces a hazardous substance or process with a less hazardous alternative. Replacing solvent-based adhesive with water-based reduces exposure to harmful fumes.',
  },
  {
    id: 'engineering-control',
    question: 'Which of the following is an engineering control?',
    options: [
      'Local exhaust ventilation',
      'Link budget or power budget',
      'DC voltage at a specified level',
      'To prevent strand separation',
    ],
    correctIndex: 0,
    explanation:
      "Local exhaust ventilation (LEV) is an engineering control that physically removes hazardous fumes at source. It doesn't rely on worker behaviour or PPE.",
  },
  {
    id: 'ppe-position',
    question: "Why is PPE considered the 'last resort' in the hierarchy of control?",
    options: [
      'It relies on correct usage and only protects the wearer',
      'Faults introduce abnormal conditions and safety risks',
      'Selecting efficient equipment and optimising circuit arrangements',
      'Stay calm, reassure them, and help them focus on slow breathing',
    ],
    correctIndex: 0,
    explanation:
      "PPE is the least effective control because it relies entirely on correct selection, fitting and consistent use. It only protects the individual wearer and doesn't eliminate or reduce the hazard itself.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the correct order of the hierarchy of control, from most to least effective?',
    options: [
      'PPE, Administrative, Engineering, Substitution, Elimination',
      'Elimination, Substitution, Engineering, Administrative, PPE',
      'Engineering, Elimination, Substitution, Administrative, PPE',
      'Substitution, Elimination, Engineering, PPE, Administrative',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy runs from most effective (Elimination) to least effective (PPE). Remember: ESEA-P - Eliminate, Substitute, Engineer, Administrate, Protect.',
  },
  {
    id: 2,
    question:
      'A contractor is planning to install cables in a ceiling void containing asbestos. What is the BEST control measure?',
    options: [
      'Provide asbestos awareness training',
      'Provide RPE and protective clothing',
      'Use an alternative cable route that avoids the asbestos',
      'Install warning signs at access points',
    ],
    correctAnswer: 2,
    explanation:
      'Using an alternative route eliminates the asbestos exposure risk entirely. This is the most effective control and should be considered before relying on PPE or administrative controls.',
  },
  {
    id: 3,
    question: "Which control measure would be classified as 'administrative'?",
    options: [
      'Using battery-powered tools instead of mains',
      'Installing interlocked guards on machinery',
      'Providing hearing protection in plant rooms',
      'Implementing a permit to work system',
    ],
    correctAnswer: 3,
    explanation:
      'Permit to work systems are administrative controls - they rely on procedures and human behaviour rather than physical barriers. They manage how work is done rather than eliminating the hazard.',
  },
  {
    id: 4,
    question:
      'An electrician needs to work on a live distribution board. What combination of controls should be applied?',
    options: [
      'Elimination (isolate if possible), engineering (barriers), administrative (permit), PPE',
      'Internal air movement is lower, reducing convective heat transfer',
      'A legal requirement imposed by an Act of Parliament or Regulations',
      'To provide legal evidence of compliance and demonstrate ongoing maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'Live working requires multiple layers of control. First consider if isolation is possible (elimination), use barriers (engineering), follow permit systems (administrative), and use appropriate PPE as additional protection.',
  },
  {
    id: 5,
    question:
      'Installing acoustic enclosures around noisy plant equipment is an example of which control type?',
    options: [
      'Substitution',
      'Engineering control',
      'Administrative control',
      'Elimination',
    ],
    correctAnswer: 1,
    explanation:
      "Acoustic enclosures are engineering controls - they physically contain the noise at source. The hazard isn't eliminated but is controlled through physical measures that don't rely on worker behaviour.",
  },
  {
    id: 6,
    question: 'Why should controls higher in the hierarchy be prioritised?',
    options: [
      'They are always cheaper to implement',
      'They are required by law for all hazards',
      "They are more reliable and don't depend on human behaviour",
      'They are easier to monitor and maintain',
    ],
    correctAnswer: 2,
    explanation:
      "Controls higher in the hierarchy (elimination, substitution, engineering) are more reliable because they don't depend on people remembering to follow procedures or wear PPE correctly. They provide consistent protection.",
  },
  {
    id: 7,
    question:
      'A building services contractor replaces 110V power tools with battery-powered alternatives for site work. This is an example of:',
    options: [
      'Elimination - removing the electrical shock hazard',
      'Substitution - replacing mains power with battery',
      'Engineering control - using lower voltage',
      'Both A and B are correct',
    ],
    correctAnswer: 3,
    explanation:
      "This could be viewed as elimination (no trailing cables, no shock from mains) or substitution (replacing mains with battery). Both interpretations are valid - the key point is it's high in the hierarchy.",
  },
  {
    id: 8,
    question: 'What is the main limitation of administrative controls?',
    options: [
      'They rely on people following procedures correctly',
      'They cannot be used for electrical hazards',
      'They are expensive to implement',
      'They require specialist equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Administrative controls depend entirely on human behaviour - people must follow procedures, read signs, and comply with rules. Human error, complacency or shortcuts can render them ineffective.',
  },
  {
    id: 9,
    question: 'When specifying PPE for electrical work, which factor is MOST important?',
    options: [
      'The PPE should be the cheapest option available',
      'PPE must be correctly rated for the hazard level',
      'All workers should use identical PPE',
      'PPE should match the company colours',
    ],
    correctAnswer: 1,
    explanation:
      'PPE must be correctly rated for the specific hazard - for example, insulating gloves must be rated for the voltage being worked on. Using incorrectly rated PPE provides false confidence and inadequate protection.',
  },
  {
    id: 10,
    question: 'Under the Management of Health and Safety at Work Regulations, employers must:',
    options: [
      'Always provide PPE regardless of other controls',
      'Provide administrative controls before engineering controls',
      'Apply the hierarchy of control when assessing risks',
      'Use elimination for every identified hazard',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control is a legal requirement under MHSWR. Employers must consider controls in order of effectiveness, though the most reasonably practicable option for each specific situation should be selected.',
  },
  {
    id: 11,
    question: 'Providing toolbox talks on manual handling techniques is an example of:',
    options: [
      'Elimination',
      'Substitution',
      'Engineering control',
      'Administrative control',
    ],
    correctAnswer: 3,
    explanation:
      "Training and toolbox talks are administrative controls. They aim to change behaviour and improve awareness but rely on workers applying what they've learned consistently.",
  },
  {
    id: 12,
    question: 'Which combination represents applying multiple levels of the hierarchy correctly?',
    options: [
      'Eliminate where possible, guard remaining hazards, train staff, provide PPE',
      'They are more reliable and don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t depend on human behaviour',
      'Elimination (isolate if possible), engineering (barriers), administrative (permit), PPE',
      'Use an alternative cable route that avoids the asbestos',
    ],
    correctAnswer: 0,
    explanation:
      'The best approach is layered: eliminate what you can, engineer controls for remaining hazards, implement administrative procedures, and provide PPE as additional protection. This provides defence in depth.',
  },
];

const faqs = [
  {
    question: "Can I just use PPE if it's easier than implementing other controls?",
    answer:
      "No. The hierarchy of control is a legal requirement under the Management of Health and Safety at Work Regulations 1999. Employers must consider controls in order of effectiveness - elimination first, PPE last. While 'reasonably practicable' allows flexibility, you must be able to demonstrate why higher-level controls weren't implemented. PPE should never be the first choice simply for convenience.",
  },
  {
    question: "What if complete elimination isn't possible?",
    answer:
      "If elimination isn't reasonably practicable, move down the hierarchy. Consider substitution (can you use something less hazardous?), then engineering controls (can you isolate or contain the hazard?), then administrative controls (procedures, training, supervision), and finally PPE. Often the best approach combines multiple levels - for example, engineering controls plus PPE for additional protection.",
  },
  {
    question: 'How does the hierarchy apply to electrical hazards specifically?',
    answer:
      'For electrical work: Elimination means designing out the need for electrical work, or isolating supplies. Substitution might mean using battery tools or SELV circuits. Engineering controls include RCDs, insulated tools, and physical barriers. Administrative controls are permits to work, safe isolation procedures, and competency requirements. PPE includes insulating gloves, arc flash suits, and safety footwear.',
  },
  {
    question: 'Who is responsible for applying the hierarchy of control?',
    answer:
      "Primary responsibility lies with the employer under HSWA 1974 and MHSWR 1999. However, designers have duties under CDM 2015 to eliminate hazards through design. Contractors must plan work using the hierarchy. Self-employed persons have the same duties for their own and others' safety. Everyone in the supply chain has a role in applying appropriate controls.",
  },
  {
    question: "What's the difference between isolation and guarding?",
    answer:
      'Both are engineering controls but work differently. Isolation separates the hazard from people - such as acoustic enclosures or remote operation. Guarding prevents access to the hazard - such as interlocked machine guards or fixed barriers around live equipment. Isolation is generally preferred as it provides more reliable protection, but guarding is appropriate when access is occasionally needed.',
  },
  {
    question: 'How do I document the hierarchy of control in a risk assessment?',
    answer:
      "Your risk assessment should show the thought process: identify the hazard, consider elimination, explain why it can or can't be eliminated, then work through substitution, engineering, administrative and PPE options. Document what controls are selected and why higher-level controls weren't reasonably practicable. This demonstrates legal compliance and provides an audit trail.",
  },
];

const HNCModule1Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1.2.3"
            title="Hierarchy of Control"
            description="The systematic approach to managing workplace hazards from most to least effective controls"
            tone="purple"
          />

          <TLDR
            points={[
              'You will apply the hierarchy in order — eliminate, substitute, engineer, administer, PPE — and reject any solution that defaults to PPE because it is the cheapest.',
              'You design out hazards at concept stage (cable routes, switchroom layout, plant access) instead of relying on permits and PPE downstream.',
              'You use Schedule 1 of MHSWR 1999 (general principles of prevention) as the legal anchor for hierarchy-of-control decisions.',
              'You document the rationale at each level so the design risk register tells the audit trail story.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Schedule 1, General Principles of Prevention"
            clause="(a) avoiding risks; (b) evaluating the risks which cannot be avoided; (c) combating the risks at source; (d) adapting the work to the individual…; (e) adapting to technical progress; (f) replacing the dangerous by the non-dangerous or the less dangerous; (g) developing a coherent overall prevention policy…; (h) giving collective protective measures priority over individual protective measures; and (i) giving appropriate instructions to employees."
            meaning={
              <>
                Schedule 1 is the legal expression of the hierarchy. (h) explicitly puts
                collective measures (engineering controls, ventilation, isolation) ahead of
                individual ones (PPE). Cite this clause when a contractor wants to skip straight
                to face-fit-tested respirators instead of installing LEV.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Schedule 1 — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the five levels of the hierarchy of control in order",
              "Apply elimination and substitution principles to building services",
              "Identify appropriate engineering controls for electrical hazards",
              "Understand the role and limitations of administrative controls",
              "Select and specify PPE as a last line of defence",
              "Combine multiple control levels for effective risk management",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Elimination - Removing the Hazard Completely</ContentEyebrow>

          <ConceptBlock title="Elimination - Removing the Hazard Completely">
            <p>
            Elimination is the most effective control measure because it completely removes the
            hazard from the workplace. When a hazard is eliminated, there is no possibility of
            harm from that source - no reliance on barriers, procedures or protective equipment.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Principles of elimination:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Consider elimination at the design stage - it's easier and cheaper
            </li>
            <li>
            Question whether the hazardous activity is actually necessary
            </li>
            <li>Design out the need for hazardous work where possible</li>
            <li>
            Elimination provides 100% protection with zero ongoing cost
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Elimination Examples
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Working at height</strong> — Elimination Method: Pre-fabricate at ground level. Notes: Assemble cable trays, containment on floor</li>
            <li><strong>Electrical shock</strong> — Elimination Method: Isolate supply before work. Notes: Safe isolation removes the hazard entirely</li>
            <li><strong>Asbestos exposure</strong> — Elimination Method: Route cables around asbestos. Notes: Alternative route avoids any disturbance</li>
            <li><strong>Confined space entry</strong> — Elimination Method: External installation point. Notes: Design allows work from outside the space</li>
            <li><strong>Manual handling</strong> — Elimination Method: Specify smaller, lighter equipment. Notes: Multiple smaller units instead of one heavy one</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>CDM 2015 Duty:</strong> Designers must eliminate hazards where reasonably
            practicable. This includes electrical designers specifying systems that minimise
            hazardous installation and maintenance work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Substitution - Replacing with Less Hazardous Alternatives</ContentEyebrow>

          <ConceptBlock title="Substitution - Replacing with Less Hazardous Alternatives">
            <p>
            When elimination isn't possible, substitution replaces a hazardous substance, process
            or equipment with something less hazardous. The hazard still exists but in a reduced
            form that presents less risk to workers.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Principles of substitution:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Consider less hazardous alternatives for every specified material
            </li>
            <li>Evaluate whether the substitute creates different hazards</li>
            <li>
            Balance reduced risk against technical performance requirements
            </li>
            <li>Document the substitution decision in risk assessments</li>
            </ul>
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Substance Substitution
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Water-based instead of solvent-based products</li>
            <li>Pre-formed gaskets instead of poured sealants</li>
            <li>Mechanical fixings instead of chemical anchors</li>
            <li>LED instead of fluorescent (eliminates mercury)</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Equipment Substitution
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Battery tools instead of mains-powered</li>
            <li>110V CTE instead of 230V on site</li>
            <li>SELV (12/24V) for wet locations</li>
            <li>Quieter plant to reduce noise exposure</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Substitution Assessment Checklist
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Is the substitute genuinely less hazardous overall?</li>
            <li>Does it introduce new or different hazards?</li>
            <li>Will it perform the required function adequately?</li>
            <li>Is the cost increase proportionate to risk reduction?</li>
            <li>Are workers trained on the substitute material/equipment?</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> Substitution must reduce overall risk, not just transfer
            it. Always assess the full hazard profile of any substitute.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Engineering Controls - Isolation, Guarding and Ventilation</ContentEyebrow>

          <ConceptBlock title="Engineering Controls - Isolation, Guarding and Ventilation">
            <p>
            Engineering controls use physical means to prevent or reduce exposure to hazards.
            Unlike administrative controls or PPE, they don't rely on human behaviour - once
            installed, they provide consistent protection regardless of worker actions.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Types of engineering controls:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Isolation:</strong> Physically separating the hazard from workers
            </li>
            <li>
            <strong>Guarding:</strong> Barriers preventing access to hazardous areas
            </li>
            <li>
            <strong>Ventilation:</strong> Removing hazardous substances from the air
            </li>
            <li>
            <strong>Enclosure:</strong> Containing hazards within sealed systems
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Engineering Controls
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical shock</strong> — Engineering Control: RCD protection. Application: 30mA RCD on socket circuits</li>
            <li><strong>Arc flash</strong> — Engineering Control: Enclosed switchgear. Application: IP-rated enclosures, arc-resistant panels</li>
            <li><strong>Contact with live parts</strong> — Engineering Control: Insulation and barriers. Application: Finger-safe terminals, shrouded busbars</li>
            <li><strong>Noise</strong> — Engineering Control: Acoustic enclosures. Application: Plant rooms, generator housing</li>
            <li><strong>Fumes/dust</strong> — Engineering Control: Local exhaust ventilation. Application: Extraction at soldering stations</li>
            <li><strong>Rotating machinery</strong> — Engineering Control: Interlocked guards. Application: Motor couplings, fan drives</li>
            <li><strong>Falls from height</strong> — Engineering Control: Permanent edge protection. Application: Roof-mounted plant access routes</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Advantages of Engineering Controls
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Work automatically - don't require active worker participation
            </li>
            <li>Provide consistent, reliable protection 24/7</li>
            <li>Cannot be bypassed as easily as administrative controls</li>
            <li>Protect everyone in the area, not just individuals</li>
            <li>Once installed, have relatively low ongoing costs</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>PUWER requirement:</strong> The Provision and Use of Work Equipment
            Regulations require that guards and protection devices are suitable, maintained in
            efficient working order, and not easily bypassed or disabled.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Administrative Controls and PPE - The Lower Hierarchy</ContentEyebrow>

          <ConceptBlock title="Administrative Controls and PPE - The Lower Hierarchy">
            <p>
            Administrative controls and PPE are the lower levels of the hierarchy. They are often
            necessary but should supplement, not replace, higher-level controls. Both depend on
            human behaviour for effectiveness, which makes them inherently less reliable.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Administrative Controls
            </p>
            <p className="text-sm text-white mb-3">
            These are procedures, policies and practices that control how work is performed.
            They reduce exposure by changing the way people work rather than eliminating or
            engineering out the hazard.
            </p>
            
            
            <p className="text-xs font-medium text-white mb-2">
            Types of Administrative Controls
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Permit to work systems</li>
            <li>Safe systems of work (method statements)</li>
            <li>Training and competency assessment</li>
            <li>Warning signs and labels</li>
            <li>Job rotation to limit exposure time</li>
            <li>Supervision and monitoring</li>
            </ul>
            
            
            <p className="text-xs font-medium text-white mb-2">Building Services Examples</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Electrical isolation permits</li>
            <li>Hot work permits</li>
            <li>Confined space entry procedures</li>
            <li>Toolbox talks and briefings</li>
            <li>Site inductions</li>
            <li>Daily safety inspections</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Personal Protective Equipment (PPE)
            </p>
            <p className="text-sm text-white mb-3">
            PPE is the last line of defence. It protects only the individual wearing it and only
            when correctly selected, fitted, worn and maintained. It should never be the sole
            control measure for significant hazards.
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical shock</strong> — PPE Required: Insulating gloves. Standard/Rating: Class 00-4 per BS EN 60903</li>
            <li><strong>Arc flash</strong> — PPE Required: Arc-rated clothing, face shield. Standard/Rating: Arc rating (cal/cm²) to match risk</li>
            <li><strong>Head injury</strong> — PPE Required: Safety helmet. Standard/Rating: BS EN 397 industrial helmet</li>
            <li><strong>Eye injury</strong> — PPE Required: Safety glasses/goggles. Standard/Rating: BS EN 166 eye protection</li>
            <li><strong>Noise (85+ dB)</strong> — PPE Required: Hearing protection. Standard/Rating: SNR rating adequate for exposure</li>
            <li><strong>Foot injury</strong> — PPE Required: Safety footwear. Standard/Rating: S3 for construction sites</li>
            </ul>
            
            

            <div className="my-6 p-4 rounded-lg bg-red-900/20 border border-red-500/30">
            <p className="text-sm font-medium text-red-400 mb-2">Limitations of PPE</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Only protects the wearer - doesn't remove the hazard</li>
            <li>Relies on correct selection for the specific hazard</li>
            <li>Must be correctly fitted to each individual</li>
            <li>Effectiveness depends on consistent, correct use</li>
            <li>Can be uncomfortable, leading to non-compliance</li>
            <li>Requires regular inspection, maintenance and replacement</li>
            <li>
            May create additional hazards (reduced visibility, hearing, dexterity)
            </li>
            </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
            <strong>PPE Regulations:</strong> The Personal Protective Equipment at Work
            Regulations 1992 require employers to provide suitable PPE free of charge, ensure it
            is properly maintained, and provide training on its use.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Applying the Hierarchy - Worked Example">
            <p><strong>Scenario: Working on a Live Distribution Board</strong></p>
            <p className="text-sm text-white mb-4">
            An electrician needs to add a new circuit to an occupied commercial building where
            complete isolation would cause unacceptable disruption. Apply the hierarchy of
            control.
            </p>

            
            <div className="bg-black/30 p-3 rounded">
            <p className="text-xs font-medium text-green-400 mb-1">1. ELIMINATION</p>
            <p className="text-sm text-white">
            Can we avoid live working? Consider: partial isolation of sections, out-of-hours
            work when building is unoccupied, temporary supply from generator. If none
            viable, proceed to next level.
            </p>
            </div>

            <div className="bg-black/30 p-3 rounded">
            <p className="text-xs font-medium text-blue-400 mb-1">2. SUBSTITUTION</p>
            <p className="text-sm text-white">
            Can we reduce severity? Consider: pre-fabricate components to minimise live work
            time, use plug-in devices where possible. Limited substitution options for this
            scenario.
            </p>
            </div>

            <div className="bg-black/30 p-3 rounded">
            <p className="text-xs font-medium text-purple-400 mb-1">
            3. ENGINEERING CONTROLS
            </p>
            <p className="text-sm text-white">
            Install temporary barriers around work area. Use insulated shrouds on adjacent
            live parts. Ensure RCD protection is functional. Use insulated tools rated for
            voltage.
            </p>
            </div>

            <div className="bg-black/30 p-3 rounded">
            <p className="text-xs font-medium text-orange-400 mb-1">
            4. ADMINISTRATIVE CONTROLS
            </p>
            <p className="text-sm text-white">
            Implement permit to work system. Conduct risk assessment and method statement
            review. Ensure only competent person (as per HSE GS38) undertakes work. Brief
            accompanying persons on emergency procedures. Limit access to immediate work
            area.
            </p>
            </div>

            <div className="bg-black/30 p-3 rounded">
            <p className="text-xs font-medium text-red-400 mb-1">5. PPE (Last Resort)</p>
            <p className="text-sm text-white">
            Insulating gloves rated for voltage (Class 0 minimum for 230V). Arc-rated face
            shield. Arc-rated long-sleeved clothing. Safety footwear. Non-conductive matting
            if available.
            </p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <div>
            <p><strong>Remember: ESEA-P</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>E</strong>liminate - Remove the hazard completely
            </li>
            <li>
            <strong>S</strong>ubstitute - Replace with less hazardous alternative
            </li>
            <li>
            <strong>E</strong>ngineer - Isolate, guard, ventilate
            </li>
            <li>
            <strong>A</strong>dministrate - Procedures, training, signs
            </li>
            <li>
            <strong>P</strong>rotect - PPE as last line of defence
            </li>
            </ul>
            </div>

            <div>
            <p><strong>Documentation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Risk assessments must show hierarchy consideration</li>
            <li>Document why higher controls aren't reasonably practicable</li>
            <li>Record control measures selected and implemented</li>
            <li>Review and update when circumstances change</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Mistakes to Avoid</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Jumping to PPE</strong> - Always consider higher controls first
            </li>
            <li>
            <strong>Single control reliance</strong> - Layer multiple controls for serious
            hazards
            </li>
            <li>
            <strong>Ignoring maintenance</strong> - Engineering controls need regular checking
            </li>
            <li>
            <strong>Generic PPE</strong> - Select PPE specific to the hazard rating
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Reducing arc-flash risk on a new switchroom design"
            situation={
              <>
                You are reviewing a 2,000 A LV switchroom design for a new data centre. The
                fault level is 50 kA and the proposed maintenance plan involves regular live
                inspection through transparent escutcheons.
              </>
            }
            whatToDo={
              <>
                Walk down the hierarchy in writing. Eliminate live work where possible —
                arc-resistant switchgear (BS EN 61439-1 with arc-fault tested cubicles), remote
                racking, remote operation via the BMS. Substitute — current-limiting fuses to
                cap incident energy. Engineer — short-circuit protection coordination, defined
                approach distances, infrared windows for thermal scanning without door-opening.
                Administer — permits for any door-open work, two-person rule. PPE — arc-rated
                clothing per IEC 61482-2 sized to the calculated incident energy as the last
                line, not the first.
              </>
            }
            whyItMatters={
              <>
                Arc-flash incidents are routinely under-controlled because the design defaults
                to PPE. Moving controls up the hierarchy at design stage is the only durable
                fix.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Hierarchy of control: eliminate → substitute → engineer → administer → PPE. Order matters.',
              'MHSWR Schedule 1 places collective measures ahead of individual measures — this is legal, not advisory.',
              'Elimination at design stage costs less and works longer than PPE at install stage.',
              'Substitution: lower-toxicity solvent, cordless tool over corded, sealed battery over flooded — small product choices, large risk reduction.',
              'Engineering controls (guards, interlocks, ventilation, isolation) are passive — they work without operator action.',
              'Administrative controls (permits, training, signage, rotation) rely on human compliance — always weaker than engineering.',
              'PPE is the last line of defence and the most failure-prone — fit, wear, training and replacement all matter.',
              'Document each level you considered — the risk register tells the story of why the chosen control sits where it does.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Risk Control Systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section2_3;
