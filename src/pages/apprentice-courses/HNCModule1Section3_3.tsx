/**
 * Module 1 · Section 3 · Subsection 3 — Permit to Work Systems
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Formal high-risk work authorisation — live electrical, hot work, confined space, HV.
 *   Engineer-in-training perspective: how an HNC supervisor specifies, issues and closes
 *   out a permit and links it back to the SSOW and risk assessment.
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

const TITLE = 'Permit to Work Systems - HNC Module 1 Section 3.3';
const DESCRIPTION =
  'Master permit to work systems for high-risk activities including hot work, confined spaces, electrical isolation, and lockout/tagout (LOTO) procedures in building services.';

const quickCheckQuestions = [
  {
    id: 'permit-purpose',
    question: 'What is the primary purpose of a permit to work system?',
    options: [
      'Replacing suspect components with known good ones',
      'To ensure a formal check is made that a safe system is in place',
      'They are unpredictable and likely to be drilled into',
      'Solvents, chemicals, dusts, fumes, and biological agents',
    ],
    correctIndex: 1,
    explanation:
      'A permit to work ensures a formal check is made that a safe system of work is in place before high-risk activities begin. It provides authorisation and documents the precautions required.',
  },
  {
    id: 'loto-first',
    question: 'What is the first step in a Lockout/Tagout (LOTO) procedure?',
    options: [
      'Environmental Impact Assessment',
      'The business owner/last holder',
      'Identify all energy sources',
      'Domestic (household) premises only.',
    ],
    correctIndex: 2,
    explanation:
      'The first step is always to identify all energy sources that could affect the work. This includes electrical, mechanical, hydraulic, pneumatic, thermal, and stored energy.',
  },
  {
    id: 'hot-work',
    question: 'How long should fire watch continue after hot work is completed?',
    options: [
      '30 minutes',
      'No fire watch needed',
      'At least 60 minutes',
      'Only during work',
    ],
    correctIndex: 2,
    explanation:
      'Fire watch should continue for at least 60 minutes after hot work is completed, as many fires start from smouldering materials after the work has finished.',
  },
  {
    id: 'permit-cancel',
    question: 'Who can cancel or close a permit to work?',
    options: [
      'The value compared to BS 7671 maximum limits',
      'Those working towards qualification with basic competence',
      'Chest compressions without rescue breaths',
      'The authorising person or competent designated person',
    ],
    correctIndex: 3,
    explanation:
      'Only the authorising person or a competent person designated to do so can cancel a permit. This ensures proper handback procedures are followed and the system is not bypassed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'When is a permit to work system required?',
    options: [
      'They present complex control systems as easy-to-read graphics and summaries',
      'For high-risk activities where normal controls are insufficient',
      'Enforcement notices, prohibition notices, or prosecution',
      'Smart building systems including BMS and integrated controls',
    ],
    correctAnswer: 1,
    explanation:
      'Permits are required for high-risk activities where normal safe systems of work are insufficient, such as work on live electrical systems, hot work, confined space entry, and work on pressurised systems.',
  },
  {
    id: 2,
    question: 'What are the key elements of an effective permit to work?',
    options: [
      'Location, nature of work, fire precautions, fire watch requirements',
      'A competent person with knowledge of the plant and authority to issue permits',
      'Hazard identification, precautions, authorisation, time limits, and handback',
      'To formally document that systems are isolated and safe for work',
    ],
    correctAnswer: 2,
    explanation:
      'An effective permit includes: work description, hazards identified, precautions required, who authorises and accepts, time validity, cross-references to other permits, and formal handback procedure.',
  },
  {
    id: 3,
    question: 'What does LOTO stand for?',
    options: [
      'Limited Operation, Technical Override',
      'Lock On, Tag Off',
      'Lock Out, Transfer Ownership',
      'Lockout/Tagout',
    ],
    correctAnswer: 3,
    explanation:
      'LOTO stands for Lockout/Tagout - a safety procedure ensuring that dangerous machines or energy sources are properly shut off and cannot be restarted until work is complete.',
  },
  {
    id: 4,
    question: "Who is the 'Authorising Person' in a permit system?",
    options: [
      'A competent person with knowledge of the plant and authority to issue permits',
      'To formally document that systems are isolated and safe for work',
      'Testing that no voltage is present using an approved voltage indicator',
      'To ensure their personal safety - no one else can remove it',
    ],
    correctAnswer: 0,
    explanation:
      'The Authorising Person (AP) must have detailed knowledge of the plant/system, understand the hazards, and have authority to issue permits. They take responsibility for ensuring precautions are adequate.',
  },
  {
    id: 5,
    question: 'What should happen if work cannot be completed within the permit validity period?',
    options: [
      'Continue working until finished',
      'Cancel the permit and reapply for a new one',
      'Leave the work area open and return tomorrow',
      'Have another worker take over',
    ],
    correctAnswer: 1,
    explanation:
      'If work overruns, the permit must be cancelled and a new permit issued. The worksite must be left in a safe state. Never extend permit validity without proper reauthorisation.',
  },
  {
    id: 6,
    question: "What is 'proving dead' in electrical isolation?",
    options: [
      'Remains outside to maintain communication and initiate rescue',
      'To formally document that systems are isolated and safe for work',
      'Testing that no voltage is present using an approved voltage indicator',
      'Location, nature of work, fire precautions, fire watch requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Proving dead means testing with an approved voltage indicator (that has been proved on a known live source) to confirm no voltage is present. Visual inspection of isolator position is not sufficient.',
  },
  {
    id: 7,
    question: 'What information must a hot work permit include?',
    options: [
      'Hazard identification, precautions, authorisation, time limits, and handback',
      'To control entry to dangerous areas during maintenance',
      'Remains outside to maintain communication and initiate rescue',
      'Location, nature of work, fire precautions, fire watch requirements',
    ],
    correctAnswer: 3,
    explanation:
      'Hot work permits must specify the exact location, type of hot work, fire precautions (extinguishers, clearance of combustibles), fire watch requirements, and duration of post-work monitoring.',
  },
  {
    id: 8,
    question: "What is the purpose of a 'Limitation of Access' permit?",
    options: [
      'To control entry to dangerous areas during maintenance',
      'Location, nature of work, fire precautions, fire watch requirements',
      'Remains outside to maintain communication and initiate rescue',
      'Cancel the existing permit and raise a new one',
    ],
    correctAnswer: 0,
    explanation:
      'A Limitation of Access permit restricts entry to areas where work is in progress that creates additional hazards. It ensures only authorised personnel enter and are aware of the hazards.',
  },
  {
    id: 9,
    question: "In confined space entry, what does the 'Top Man' or 'Standby Person' do?",
    options: [
      'Testing that no voltage is present using an approved voltage indicator',
      'Remains outside to maintain communication and initiate rescue',
      'Cancel the permit and reapply for a new one',
      'To formally document that systems are isolated and safe for work',
    ],
    correctAnswer: 1,
    explanation:
      'The Standby Person remains outside the confined space at all times, maintains communication with those inside, monitors conditions, and is trained to initiate emergency rescue procedures.',
  },
  {
    id: 10,
    question: 'What should happen to a permit if the scope of work changes significantly?',
    options: [
      'Amend it by crossing out and initialling',
      'Get verbal approval and continue',
      'Cancel the existing permit and raise a new one',
      'Continue as the permit covers general work',
    ],
    correctAnswer: 2,
    explanation:
      'Significant changes in scope require cancelling the existing permit and raising a new one. The new permit ensures all hazards from the changed work are reassessed and appropriate precautions identified.',
  },
  {
    id: 11,
    question: "What is an 'isolation certificate' used for?",
    options: [
      'Hazard identification, precautions, authorisation, time limits, and handback',
      'Testing that no voltage is present using an approved voltage indicator',
      'Remains outside to maintain communication and initiate rescue',
      'To formally document that systems are isolated and safe for work',
    ],
    correctAnswer: 3,
    explanation:
      "An isolation certificate formally documents that an electrical or mechanical system has been isolated, locked off, tested, and is safe for work. It's often a supporting document to a permit to work.",
  },
  {
    id: 12,
    question: 'Why must each worker apply their own personal lock during LOTO?',
    options: [
      'To ensure their personal safety - no one else can remove it',
      'Location, nature of work, fire precautions, fire watch requirements',
      'Remains outside to maintain communication and initiate rescue',
      'To control entry to dangerous areas during maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'Each worker applies their own lock so that the system cannot be re-energised while they are working on it. Only the worker who applied the lock should remove it, ensuring personal protection.',
  },
];

const faqs = [
  {
    question: 'Can a permit to work be issued remotely?',
    answer:
      'Generally no. The Authorising Person should visit the worksite to verify conditions and discuss the work with those who will perform it. Remote authorisation bypasses essential physical checks and face-to-face communication. Some low-risk permits may allow remote authorisation with robust verification procedures.',
  },
  {
    question: "What if there's an emergency during permitted work?",
    answer:
      'Stop work immediately and make the area safe if possible. Follow site emergency procedures. The permit is suspended during emergencies. After the emergency, the permit must be reassessed before work resumes - conditions may have changed. Never assume previous precautions are still adequate.',
  },
  {
    question: 'How many locks should be on an isolation point?',
    answer:
      'As many as required - one from each person who may be at risk. Multi-lock hasps allow multiple padlocks on a single isolation point. Only when all workers have removed their personal locks can the system be re-energised.',
  },
  {
    question: 'Can a supervisor apply locks on behalf of their team?',
    answer:
      'No. Each individual must apply and remove their own lock. This is fundamental to LOTO - the person at risk controls their own safety. Group lockout procedures exist but still require individual lock application within the group.',
  },
  {
    question: 'What training is needed to issue permits?',
    answer:
      'Authorising Persons need formal training covering: the specific permit system, relevant hazards and precautions, isolation procedures, their responsibilities and authority limits, and ongoing competence assessment. This should be refreshed periodically.',
  },
  {
    question: 'Should permits be used for routine maintenance?',
    answer:
      'If the maintenance involves high-risk activities (live working, confined spaces, hot work, working on pressurised systems), permits are required regardless of how routine the work is. The decision is based on hazard level, not frequency of the task.',
  },
];

const HNCModule1Section3_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1.3.3"
            title="Permit to Work Systems"
            description="Formal systems for controlling high-risk work activities in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You will issue permits-to-work for the recognised high-risk activities — live electrical, hot work, confined space, work at height in atypical locations, HV, excavation.',
              'You can break the permit cycle into seven steps — preparation, issue, acceptance, execution, suspension/extension, return-to-service, close-out.',
              'You apply HSG250 (HSE permit-to-work guidance) as the recognised UK reference.',
              'You separate the permit issuer (the authoriser) from the permit holder (the doer) — and from the authorised person doing the isolation.',
            ]}
          />

          <RegsCallout
            source="EAWR 1989 — Regulation 14"
            clause="No person shall be engaged in any work activity on or so near any live conductor (other than one suitably covered with insulating material so as to prevent danger) that danger may arise unless—(a) it is unreasonable in all the circumstances for it to be dead; and (b) it is reasonable in all the circumstances for him to be at work on or near it while it is live; and (c) suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury."
            meaning={
              <>
                The live-working permit is the documented evidence that all three Reg 14 limbs
                were considered before the work started. As the permit issuer you are
                personally accountable.
              </>
            }
            cite="Source: Electricity at Work Regulations 1989, Reg 14 — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain when permit to work systems are required",
              "Describe the key elements of an effective permit",
              "Apply Lockout/Tagout (LOTO) procedures correctly",
              "Identify requirements for hot work and confined space permits",
              "Understand roles: Authorising Person, Performing Authority, Competent Person",
              "Implement permit procedures for electrical isolation",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Permit to Work Fundamentals</ContentEyebrow>

          <ConceptBlock title="Permit to Work Fundamentals">
            <p>
            A permit to work (PTW) is a formal documented system that authorises certain work to
            be carried out at a specific time and place. It sets out the precautions required to
            complete the work safely and provides a clear record of the authorization.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            When permits to work are required:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Electrical work:</strong> Isolation of systems, live working, work near
            live conductors
            </li>
            <li>
            <strong>Hot work:</strong> Welding, cutting, brazing, grinding where fire risk
            exists
            </li>
            <li>
            <strong>Confined spaces:</strong> Entry to tanks, vessels, ducts, risers, ceiling
            voids
            </li>
            <li>
            <strong>Working at height:</strong> Complex access requirements, fragile roofs
            </li>
            <li>
            <strong>Excavations:</strong> Breaking ground, especially near services
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Key Roles in Permit Systems
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Authorising Person (AP)</strong> — Responsibilities: Knows the plant, identifies hazards, specifies precautions, authorises work</li>
            <li><strong>Competent Person (CP)</strong> — Responsibilities: Carries out or supervises the work, implements precautions, accepts permit</li>
            <li><strong>Performing Authority</strong> — Responsibilities: The person or team physically doing the work under the permit</li>
            <li><strong>Permit Coordinator</strong> — Responsibilities: Oversees the permit system, manages conflicts, maintains records</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Key principle:</strong> A permit is not just paperwork - it's a formal check
            that safe conditions exist. Work must not proceed until all parties have signed to
            confirm precautions are in place.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Lockout/Tagout (LOTO) Procedures</ContentEyebrow>

          <ConceptBlock title="Lockout/Tagout (LOTO) Procedures">
            <p>
            LOTO is a safety procedure ensuring that dangerous machines or energy sources are
            properly shut off and cannot be restarted until maintenance or service work is
            complete. It protects workers from unexpected energisation.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">The LOTO Process</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1. Preparation</strong> — Action: Identify all energy sources. Purpose: Know what needs isolating</li>
            <li><strong>2. Notification</strong> — Action: Inform affected personnel. Purpose: Prevent unauthorised start-up</li>
            <li><strong>3. Shutdown</strong> — Action: Turn off equipment normally. Purpose: Controlled de-energisation</li>
            <li><strong>4. Isolation</strong> — Action: Operate isolation devices. Purpose: Disconnect from energy source</li>
            <li><strong>5. Lockout</strong> — Action: Apply personal locks and tags. Purpose: Prevent re-energisation</li>
            <li><strong>6. Stored Energy</strong> — Action: Release/restrain residual energy. Purpose: Eliminate hidden hazards</li>
            <li><strong>7. Verification</strong> — Action: Test that system is dead. Purpose: Confirm safe to work</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Energy Sources to Consider
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Electrical:</strong> Mains, UPS, generators, batteries
            </li>
            <li>
            <strong>Mechanical:</strong> Moving parts, gravity, springs
            </li>
            <li>
            <strong>Hydraulic:</strong> Pressurised fluid systems
            </li>
            <li>
            <strong>Pneumatic:</strong> Compressed air systems
            </li>
            <li>
            <strong>Thermal:</strong> Steam, hot water, heated surfaces
            </li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Lock and Tag Requirements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Each worker applies their own personal lock</li>
            <li>Locks should be substantial and standardised</li>
            <li>Tags identify who applied the lock and when</li>
            <li>Multi-lock hasps for multiple workers</li>
            <li>Only lock owner can remove their lock</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Electrical isolation:</strong> Must be proved dead using an approved voltage
            indicator that has been tested immediately before and after on a known live source
            (proving unit or supply).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Hot Work Permits</ContentEyebrow>

          <ConceptBlock title="Hot Work Permits">
            <p>
            Hot work includes any activity that produces flames, sparks, or heat that could ignite
            combustible materials. In building services, this commonly includes welding, brazing,
            soldering, and grinding near combustible materials.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Hot work permit requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Location:</strong> Exact area where hot work will occur
            </li>
            <li>
            <strong>Duration:</strong> Start and finish times, fire watch period
            </li>
            <li>
            <strong>Fire precautions:</strong> Extinguishers, blankets, removal of
            combustibles
            </li>
            <li>
            <strong>Fire watch:</strong> Named person to monitor during and after work
            </li>
            <li>
            <strong>Detector isolation:</strong> Which detectors isolated (with notification
            to fire panel)
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Fire Prevention Checklist
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Remove combustibles within 11m</strong> — During Work: Continuous fire watch. After Work: Fire watch for 60+ minutes</li>
            <li><strong>Cover non-removable materials</strong> — During Work: Monitor adjacent areas. After Work: Check hidden voids and spaces</li>
            <li><strong>Seal wall/floor openings</strong> — During Work: Keep extinguisher to hand. After Work: Reinstate fire detection</li>
            <li><strong>Position fire extinguishers</strong> — During Work: Check for smouldering. After Work: Formal permit handback</li>
            </ul>
            
            

            <CommonMistake
            title="Fire Watch - Critical Requirements"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Fire watch person must be trained and remain at the location
            </li>
            <li>Must continue for minimum 60 minutes after hot work ceases</li>
            <li>Must have means to raise the alarm and tackle small fires</li>
            <li>In high-risk buildings, extend fire watch to 4+ hours</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Insurance note:</strong> Many insurance policies require formal hot work
            permits. Failure to follow permit procedures may invalidate fire insurance claims.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Confined Space and Electrical Permits</ContentEyebrow>

          <ConceptBlock title="Confined Space and Electrical Permits">
            <p>
            Confined spaces in building services include tanks, risers, ceiling voids, ductwork,
            and any enclosed space with limited access where dangerous conditions may exist.
            Electrical permits control work on live systems or in high-risk electrical
            environments.
            </p>

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Confined Space Permit Elements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Atmospheric testing before and during entry</li>
            <li>Ventilation requirements</li>
            <li>Standby person stationed at entry</li>
            <li>Communication system specified</li>
            <li>Rescue plan and equipment</li>
            <li>Entry log maintained</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Electrical Sanction Permit Elements
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Equipment/circuits to be worked on</li>
            <li>Points of isolation identified</li>
            <li>Proof of isolation documented</li>
            <li>Safety earthing if required</li>
            <li>Adjacent live parts identified</li>
            <li>Barriers and warning notices</li>
            </ul>
            </div>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Permit Handback Process
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1</strong> — Action: Work completed or area left in safe state</li>
            <li><strong>2</strong> — Action: All workers and tools removed from area</li>
            <li><strong>3</strong> — Action: All personal locks removed by their owners</li>
            <li><strong>4</strong> — Action: Competent Person signs handback section</li>
            <li><strong>5</strong> — Action: Authorising Person accepts handback and cancels permit</li>
            <li><strong>6</strong> — Action: System returned to normal operation (if applicable)</li>
            </ul>
            
            

            <p className="text-sm text-white italic">
            <strong>Record keeping:</strong> All permits should be retained for a minimum period
            (often 3 years) as they provide evidence of the safe system of work applied. Some
            permits may be required for longer in case of future investigations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Electrical Isolation for Switchboard Work</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Task:</strong> Replace MCCB in live switchboard in commercial building.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Permit Process:</strong>
            </p>
            <p className="ml-4">
            1. Identify all incoming supplies (including standby generator)
            </p>
            <p className="ml-4">2. Authorising Person issues Electrical Permit to Work</p>
            <p className="ml-4">3. Controlled shutdown coordinated with building management</p>
            <p className="ml-4">4. Main incomer isolated and locked off</p>
            <p className="ml-4">5. Generator changeover isolated and locked off</p>
            <p className="ml-4">6. Each electrician applies personal lock to multi-lock hasp</p>
            <p className="ml-4">7. Voltage indicator tested on proving unit</p>
            <p className="ml-4">8. All busbars proved dead</p>
            <p className="ml-4">9. Voltage indicator retested on proving unit</p>
            <p className="ml-4">10. Barriers and warning notices in place</p>
            <p className="mt-2 text-green-400">Only then does work proceed under the permit</p>
            </div>
            

            
            <p><strong>Example 2: Hot Work in Plant Room</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Task:</strong> Welding pipework modification near thermal insulation
            materials.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Hot Work Permit Requirements:</strong>
            </p>
            <p className="ml-4">
            - Fire detection in plant room isolated (notified to fire panel)
            </p>
            <p className="ml-4">- Combustible insulation protected with fire blankets</p>
            <p className="ml-4">- Oil drums and flammable stores removed from area</p>
            <p className="ml-4">- Two CO2 extinguishers positioned within reach</p>
            <p className="ml-4">- Fire watch person named: John Smith, Tel: 07xxx</p>
            <p className="ml-4">- Work duration: 09:00-12:00</p>
            <p className="ml-4">- Fire watch until: 13:00 minimum</p>
            <p className="ml-4">- Detection to be reinstated after fire watch confirms safe</p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Permit Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Permits are not just paperwork - they ensure precautions are in place
            </li>
            <li>All parties must sign before work proceeds</li>
            <li>
            Permits have time limits - do not exceed without reauthorisation
            </li>
            <li>Scope changes require new permits, not amendments</li>
            <li>Formal handback is essential - don't skip this step</li>
            </ul>
            </div>

            <div>
            <p><strong>LOTO Key Principles</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Identify ALL energy sources before starting</li>
            <li>Each worker applies their own personal lock</li>
            <li>Only the lock owner can remove their lock</li>
            <li>Always prove dead with tested equipment</li>
            <li>Don't forget stored energy (capacitors, pressure, gravity)</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Permit Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Rubber stamping:</strong> Issuing without physical checks
            </li>
            <li>
            <strong>Over-running:</strong> Work continuing beyond permit validity
            </li>
            <li>
            <strong>Scope creep:</strong> Doing more than the permit covers
            </li>
            <li>
            <strong>No handback:</strong> Permit left open, system unsafe
            </li>
            <li>
            <strong>Key removal:</strong> Taking out locks before work complete
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Hot work permit for tray-cutting in a sprinklered server room"
            situation={
              <>
                You need to cut new openings in steel cable tray inside a sprinklered server
                room. The room is alarmed via VESDA aspirating smoke detection and the
                sprinkler is on a wet pipe.
              </>
            }
            whatToDo={
              <>
                Issue a hot work permit. Pre-task: isolate the smoke head (with the alarm
                contractor, recorded on the permit), keep sprinkler live but bag the local
                head, fire watcher posted, water/CO₂ extinguisher in arm&rsquo;s reach,
                combustibles within 10 m removed, fire blanket beneath cut. During: continuous
                fire watch. Post-task: 60-minute fire watch, smoke head re-instated, alarm
                test back to ARC, permit closed by the issuer (not the holder), site log
                updated.
              </>
            }
            whyItMatters={
              <>
                Hot work in a sprinklered, alarmed environment combines RRO 2005, EAWR, BS
                5839 and insurer requirements. The permit is the single document that ties
                them together and proves due diligence.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Permits-to-work formalise the highest-risk SSOWs — live electrical, hot work, confined space, HV, excavation, atypical work-at-height.',
              'Seven-step cycle: preparation → issue → acceptance → execution → suspension/extension → return-to-service → close-out.',
              'Separation of duties: issuer (authoriser), holder (doer), authorised person (isolator) — no single person does all three.',
              'HSG250 is the HSE-recognised reference for UK permit systems.',
              'Permit must be specific to the task, location, time and personnel — generic permits fail in court.',
              'Record competence of every named person on the permit — issuer, holder, isolator, fire watcher.',
              'Suspension and extension protocols must be documented — overrunning permits silently is a major audit failing.',
              'Close-out is mandatory — equipment returned to service, area inspected, paperwork archived.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Audits and Inspections
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_3;
