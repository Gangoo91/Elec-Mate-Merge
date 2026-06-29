/**
 * Module 5 · Section 1 · Subsection 5 — Risk Management
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Identification, assessment, mitigation and contingency for the technical, commercial and programme risks that sit on every building services project.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Risk Management - HNC Module 5 Section 1.5';
const DESCRIPTION =
  'Master risk management for building services projects: risk identification, qualitative and quantitative assessment, mitigation strategies, contingency planning, and MEP-specific project risks.';

const quickCheckQuestions = [
  {
    id: 'risk-register-def',
    question: 'What is the primary purpose of a risk register in project management?',
    options: [
      'To record the names and qualifications of all site operatives',
      'To list every material delivery expected during the project',
      'To document identified risks, their assessment, and planned responses',
      'To track the daily progress of each activity against the programme',
    ],
    correctIndex: 2,
    explanation:
      'A risk register is a living document that records all identified risks, their probability and impact assessment, assigned owners, and planned mitigation or response actions throughout the project lifecycle.',
  },
  {
    id: 'qualitative-vs-quantitative',
    question: 'What distinguishes qualitative from quantitative risk analysis?',
    options: [
      'Qualitative uses subjective ratings, quantitative uses numerical data',
      'Qualitative applies only to safety risks, quantitative only to cost risks',
      'Qualitative is carried out by the client, quantitative by the contractor',
      'Qualitative is used after construction, quantitative during design',
    ],
    correctIndex: 0,
    explanation:
      'Qualitative analysis uses subjective ratings (High/Medium/Low) to prioritise risks quickly, while quantitative analysis uses numerical data and statistical techniques to calculate precise probability and cost impact values.',
  },
  {
    id: 'mitigation-transfer',
    question: 'Risk transfer as a mitigation strategy typically involves:',
    options: [
      'Redesigning the works to remove the risk source entirely',
      'Accepting the risk and setting aside a contingency for it',
      'Shifting risk to another party through insurance or contracts',
      'Reducing the probability of the risk through early procurement',
    ],
    correctIndex: 2,
    explanation:
      'Risk transfer involves shifting the financial or operational impact of a risk to another party, commonly through insurance policies, performance bonds, or contractual clauses with subcontractors.',
  },
  {
    id: 'contingency-allowance',
    question: 'What is a typical contingency allowance for a complex MEP project?',
    options: [
      '5-10%',
      '1-2%',
      '25-30%',
      '10-15%',
    ],
    correctIndex: 3,
    explanation:
      'Complex MEP projects typically include 10-15% contingency allowance to cover unforeseen risks. Simpler projects may use 5-10%, while highly uncertain projects may require up to 20%.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which document should be updated throughout the project lifecycle as new risks emerge?',
    options: [
      'The original tender documents',
      'The risk register',
      'The building regulations approval',
      'The client brief',
    ],
    correctAnswer: 1,
    explanation:
      'The risk register is a living document that must be regularly reviewed and updated as new risks are identified, existing risks change, or risks are closed out during the project.',
  },
  {
    id: 2,
    question:
      "In a probability/impact matrix, where would you place a risk with 'High' probability and 'High' impact?",
    options: [
      'Green zone - accept and monitor only',
      'Amber zone - review at the next monthly meeting',
      'Red zone - requires immediate action',
      'Blue zone - record but take no further action',
    ],
    correctAnswer: 2,
    explanation:
      'High probability and high impact risks fall in the red zone of the matrix, indicating they require immediate mitigation action and close monitoring throughout the project.',
  },
  {
    id: 3,
    question:
      'What is the Expected Monetary Value (EMV) of a risk with 30% probability and £50,000 potential impact?',
    options: [
      '£35,000',
      '£50,000',
      '£150,000',
      '£15,000',
    ],
    correctAnswer: 3,
    explanation:
      'EMV = Probability × Impact = 0.30 × £50,000 = £15,000. This value represents the weighted average cost of the risk and helps prioritise risk response investment.',
  },
  {
    id: 4,
    question:
      'Which risk response strategy involves redesigning a system to eliminate the risk source entirely?',
    options: [
      'Avoid',
      'Transfer',
      'Mitigate',
      'Accept',
    ],
    correctAnswer: 0,
    explanation:
      'Risk avoidance involves changing the project plan to eliminate the risk or its impact entirely, such as redesigning a system to remove the hazardous element.',
  },
  {
    id: 5,
    question: 'Late delivery of specialist MEP equipment is an example of which risk category?',
    options: [
      'Commercial risk',
      'Programme risk',
      'Safety risk',
      'Technical risk',
    ],
    correctAnswer: 1,
    explanation:
      'Late delivery of equipment directly impacts the project schedule, making it a programme risk. It may also have commercial implications, but the primary effect is on timing.',
  },
  {
    id: 6,
    question:
      'What percentage contingency is typically appropriate for a straightforward electrical installation with well-defined scope?',
    options: [
      '1-2%',
      '10-15%',
      '5-8%',
      '20-25%',
    ],
    correctAnswer: 2,
    explanation:
      'For straightforward, well-defined installations, 5-8% contingency is typically adequate. Higher allowances are needed for complex, refurbishment, or unclear scope projects.',
  },
  {
    id: 7,
    question: 'A SWOT analysis as part of risk management identifies:',
    options: [
      'Safety, welfare, operations, and training requirements',
      'Schedule, workforce, output, and tolerance measures',
      'Scope, work, ownership, and timing for each activity',
      'Strengths, weaknesses, opportunities, and threats',
    ],
    correctAnswer: 3,
    explanation:
      'SWOT analysis identifies internal Strengths and Weaknesses alongside external Opportunities and Threats, providing a comprehensive view of factors affecting project success.',
  },
  {
    id: 8,
    question: 'In risk management, "trigger conditions" refer to:',
    options: [
      'Early warning signs that indicate a risk is materialising',
      'The contractual events that release retention payments',
      'The thresholds at which a risk is removed from the register',
      'The point at which contingency funds are formally approved',
    ],
    correctAnswer: 0,
    explanation:
      'Trigger conditions are early warning signs or events that indicate a risk is becoming reality, allowing project managers to implement contingency plans proactively.',
  },
  {
    id: 9,
    question:
      'A Monte Carlo simulation in risk analysis is used to:',
    options: [
      'Produce a single fixed estimate of the final project cost',
      'Generate probability distributions for cost and schedule outcomes',
      'Identify which subcontractor is responsible for each risk',
      'Rank risks using a simple High, Medium and Low scale',
    ],
    correctAnswer: 1,
    explanation:
      'Monte Carlo simulation runs thousands of iterations using probability distributions to generate realistic ranges for project cost and duration, accounting for risk uncertainty.',
  },
  {
    id: 10,
    question: 'Which type of risk is most characteristic of building services compared to general construction?',
    options: [
      'Adverse weather delaying external groundworks',
      'Late payment of invoices by the main contractor',
      'Coordination clashes between MEP services',
      'Theft of materials from an unsecured site compound',
    ],
    correctAnswer: 2,
    explanation:
      'Coordination clashes between mechanical, electrical, and plumbing services in confined ceiling voids are particularly characteristic of building services projects, requiring specific mitigation through BIM coordination.',
  },
  {
    id: 11,
    question: 'Risk acceptance as a strategy is most appropriate when:',
    options: [
      'The risk has a high probability and a severe safety impact',
      'The risk can be passed to an insurer at low premium cost',
      'The risk can be removed entirely by redesigning the works',
      'The risk impact is low and probability is low',
    ],
    correctAnswer: 3,
    explanation:
      'Risk acceptance is appropriate for low-probability, low-impact risks where the cost of mitigation exceeds the potential impact. Active monitoring should still be maintained.',
  },
  {
    id: 12,
    question: 'Which documents should reference the risk register?',
    options: [
      'Project execution plan, monthly reports, and project close-out report',
      'Only the original tender submission, once at the outset',
      'Only the final account, after the works are complete',
      'Only the building control completion certificate',
    ],
    correctAnswer: 0,
    explanation:
      'The risk register should be referenced in the project execution plan, regular progress reports, and project close-out documentation to ensure continuous visibility and learning.',
  },
];

const faqs = [
  {
    question: 'How often should the risk register be reviewed and updated?',
    answer:
      'For active projects, the risk register should be reviewed weekly during high-risk phases and at minimum monthly during normal operations. New risks should be added immediately when identified, and risk status should be updated whenever circumstances change. A static risk register provides no value - it must be a living document.',
  },
  {
    question:
      'What is the difference between contingency and management reserve?',
    answer:
      'Contingency covers identified risks within the project scope and is managed by the project manager. Management reserve covers unforeseen "unknown unknowns" and is typically controlled by senior management. For MEP projects, contingency is usually 5-15% while management reserve adds another 3-5%.',
  },
  {
    question:
      'How do I quantify risks when I have limited historical data?',
    answer:
      'Use expert judgement workshops with experienced project managers and trade specialists. Apply structured techniques like Delphi method (anonymous expert input), 3-point estimating (best/most likely/worst case), or analogous estimation from similar projects. Document assumptions clearly and update estimates as more data becomes available.',
  },
  {
    question: 'When should risk transfer through insurance be considered?',
    answer:
      'Insurance is appropriate for low-probability, high-impact risks that could significantly damage the business if they occurred. Common construction insurances include professional indemnity (£2-10m typical), public liability (£5-10m), employer liability (£10m statutory minimum), and contract works (full project value). Cost-benefit analysis should compare premium costs against potential exposure.',
  },
  {
    question:
      'How do I manage risks that emerge from subcontractors?',
    answer:
      'Pre-qualify subcontractors thoroughly (financial, technical, safety records). Use back-to-back contracts to flow down obligations. Require performance bonds for critical packages. Monitor subcontractor performance through KPIs. Maintain regular communication and joint risk reviews. Have contingency plans for subcontractor failure including alternative suppliers.',
  },
  {
    question:
      'What is opportunity management in the context of project risk?',
    answer:
      'Opportunity management identifies positive risks (opportunities) that could benefit the project. Strategies include: Exploit (ensure opportunity occurs), Enhance (increase probability or impact), Share (partner to maximise benefit), or Accept (take advantage if it occurs). Examples in MEP: early completion bonuses, value engineering savings, or new technology benefits.',
  },
];

const HNCModule5Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 5"
            title="Risk Management"
            description="Risk identification, assessment, mitigation strategies and contingency planning for building services projects."
            tone="purple"
          />

          <TLDR
            points={[
              "Risk = probability × impact. Quantify both, otherwise you are gut-feeling your contingency.",
              "Build a live risk register from day one — design risk, programme risk, commercial risk, operational risk and HSE risk all tracked together.",
              "Each risk needs an owner, a mitigation plan, a residual rating and a review date — unowned risks crystallise into issues.",
              "Contingency (cost and time) should be proportional to the post-mitigation residual exposure, not to a \"10% always\" rule of thumb.",
              "Review weekly at project meetings; promote risks to issues when they crystallise; close them out formally with audit trail.",
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 9(2) (Duties of designers)"
            clause="A designer must take into account the general principles of prevention and any pre-construction information to eliminate, so far as is reasonably practicable, foreseeable risks to the health or safety of any person carrying out or liable to be affected by construction work, maintaining or cleaning a structure, or using a structure designed as a workplace."
            meaning={
              <>
                Risk management on a construction project starts at design — Reg 9(2) places a hierarchical duty on designers to eliminate, then reduce, then control. As project manager you inherit the residual risks the designer could not eliminate; your risk register is the bridge between Reg 9(2) (design) and Reg 13 (construction) compliance.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Identify and document risks using a structured risk register',
              'Apply qualitative and quantitative risk assessment techniques',
              'Select appropriate risk response strategies',
              'Calculate contingency allowances using EMV techniques',
              'Identify and manage MEP-specific project risks',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Risk Identification and the Risk Register">
            <p>
              Effective risk management begins with systematic identification of potential threats
              and opportunities that could affect project objectives. For MEP projects, this
              requires input from designers, project managers, site supervisors, and specialist
              subcontractors.
            </p>
            <p>
              <strong>Risk Identification Techniques:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Brainstorming workshops:</strong> Structured sessions with project team and
                stakeholders
              </li>
              <li>
                <strong>Checklist analysis:</strong> Review against standard MEP risk categories
              </li>
              <li>
                <strong>Lessons learned:</strong> Review of similar past projects and their issues
              </li>
              <li>
                <strong>Expert judgement:</strong> Input from experienced engineers and installers
              </li>
              <li>
                <strong>SWOT analysis:</strong> Identifying internal and external factors
              </li>
            </ul>
            <p>
              <strong>Risk Register Structure (Field — Description — Example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Risk ID:</strong> Unique identifier — R-MEP-012
              </li>
              <li>
                <strong>Risk Description:</strong> Clear statement of risk event — Switchgear
                delivery delayed beyond programme date
              </li>
              <li>
                <strong>Category:</strong> Risk type classification — Programme / Procurement
              </li>
              <li>
                <strong>Probability:</strong> Likelihood of occurrence — Medium (40%)
              </li>
              <li>
                <strong>Impact:</strong> Consequence if risk occurs — High - 4 week delay, £25,000
              </li>
              <li>
                <strong>Risk Score:</strong> Combined rating — 12 (Medium × High)
              </li>
              <li>
                <strong>Response Strategy:</strong> Planned action — Mitigate - early order,
                alternative supplier
              </li>
              <li>
                <strong>Risk Owner:</strong> Responsible person — Procurement Manager
              </li>
              <li>
                <strong>Status:</strong> Current state — Open / Monitoring
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> Review and update the risk register at every project
              meeting. A static risk register provides no value.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Risk Assessment - Qualitative and Quantitative">
            <p>
              Once risks are identified, they must be assessed to determine priority for response.
              Two complementary approaches exist: qualitative assessment for rapid prioritisation
              and quantitative analysis for precise cost and schedule impact calculation.
            </p>
            <p>
              <strong>Qualitative Analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Uses subjective High/Medium/Low ratings</li>
              <li>Quick to apply across all risks</li>
              <li>Enables rapid prioritisation</li>
              <li>Suitable for initial screening</li>
              <li>Based on expert judgement</li>
            </ul>
            <p>
              <strong>Quantitative Analysis:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Uses numerical probability values</li>
              <li>Calculates Expected Monetary Value (EMV)</li>
              <li>Enables precise contingency calculation</li>
              <li>Used for high-priority risks</li>
              <li>Supports Monte Carlo simulation</li>
            </ul>
            <p>
              <strong>Probability/Impact Matrix (5×5) — Risk Score = Probability × Impact:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Very High (5) probability:</strong> 5 / 10 / 15 / 20 / 25 across impact 1-5
              </li>
              <li>
                <strong>High (4) probability:</strong> 4 / 8 / 12 / 16 / 20 across impact 1-5
              </li>
              <li>
                <strong>Medium (3) probability:</strong> 3 / 6 / 9 / 12 / 15 across impact 1-5
              </li>
              <li>
                <strong>Low (2) probability:</strong> 2 / 4 / 6 / 8 / 10 across impact 1-5
              </li>
              <li>
                <strong>Very Low (1) probability:</strong> 1 / 2 / 3 / 4 / 5 across impact 1-5
              </li>
              <li>
                <strong>Zones:</strong> Green (1-4) Accept/Monitor | Yellow (5-9) Mitigate | Orange
                (10-14) Action required | Red (15-25) Immediate action
              </li>
            </ul>
            <p>
              <strong>Expected Monetary Value (EMV) Calculation:</strong> EMV = Probability × Impact
              (£). Sum of all risk EMVs provides quantified contingency requirement.
            </p>
            <p>
              <strong>Application:</strong> Use qualitative analysis for all risks, then apply
              quantitative analysis to the top 10-15 highest-rated risks.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Risk Response Strategies">
            <p>
              For each significant risk, a response strategy must be selected. The four standard
              strategies for negative risks (threats) each have appropriate applications depending
              on the risk characteristics and project context.
            </p>
            <p>
              <strong>The Four Response Strategies (Strategy — Description — MEP Example):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Avoid:</strong> Eliminate the risk by changing the plan — Redesign routing
                to avoid complex coordination area
              </li>
              <li>
                <strong>Transfer:</strong> Shift impact to a third party — Insurance, performance
                bonds, subcontract clauses
              </li>
              <li>
                <strong>Mitigate:</strong> Reduce probability or impact — Early procurement of
                long-lead items
              </li>
              <li>
                <strong>Accept:</strong> Acknowledge and prepare contingency — Minor coordination
                clashes resolved on site
              </li>
            </ul>
            <p>
              <strong>Risk Transfer Mechanisms in Construction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Professional indemnity insurance:</strong> Covers design errors and
                omissions
              </li>
              <li>
                <strong>Contractor's all-risks insurance:</strong> Physical damage to works
              </li>
              <li>
                <strong>Performance bonds:</strong> Financial guarantee of completion
              </li>
              <li>
                <strong>Retention:</strong> Withheld funds as completion incentive
              </li>
              <li>
                <strong>Back-to-back subcontracts:</strong> Pass risk down supply chain
              </li>
            </ul>
            <p>
              <strong>Mitigation Actions for MEP Risks:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BIM clash detection during design</li>
              <li>Mock-ups for complex installations</li>
              <li>Pre-qualification of subcontractors</li>
              <li>Factory acceptance testing</li>
              <li>Phased commissioning</li>
              <li>Trained supervision on site</li>
            </ul>
            <p>
              <strong>When to Accept Risk:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Low probability and low impact</li>
              <li>Mitigation cost exceeds EMV</li>
              <li>Risk outside project control</li>
              <li>Contingency covers potential impact</li>
              <li>Quick response possible if triggered</li>
            </ul>
            <p>
              <strong>Remember:</strong> Every response strategy has a cost. The cost of mitigation
              should not exceed the risk's EMV unless safety is involved.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Contingency Planning and MEP-Specific Risks">
            <p>
              Contingency allowances provide financial and schedule reserves to address risks that
              materialise during project delivery. For MEP projects, understanding common risk
              categories helps ensure contingencies are appropriately sized.
            </p>
            <p>
              <strong>Contingency Calculation Approaches (Method — Description — When to Use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Percentage of cost:</strong> Fixed % based on project type — Early
                estimates, simple projects
              </li>
              <li>
                <strong>Sum of EMVs:</strong> Total of all risk EMV values — Detailed risk analysis
                completed
              </li>
              <li>
                <strong>Monte Carlo:</strong> Statistical simulation — Large, complex projects
              </li>
              <li>
                <strong>Expert judgement:</strong> Based on similar project experience — Limited
                data available
              </li>
            </ul>
            <p>
              <strong>Typical Contingency Allowances (Project Type — Range — Key Risks):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New build (well-defined):</strong> 5-8% — Coordination, procurement
              </li>
              <li>
                <strong>New build (complex):</strong> 8-12% — Design changes, specialist systems
              </li>
              <li>
                <strong>Refurbishment:</strong> 12-18% — Unknown conditions, asbestos
              </li>
              <li>
                <strong>Live environment:</strong> 15-20% — Access restrictions, disruption
              </li>
            </ul>
            <p>
              <strong>Common MEP-Specific Project Risks — Technical:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Coordination clashes in ceiling voids</li>
              <li>Insufficient builders' work openings</li>
              <li>Design changes during construction</li>
              <li>Equipment performance below specification</li>
              <li>Commissioning failures</li>
            </ul>
            <p>
              <strong>Programme:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Long lead equipment delays</li>
              <li>DNO/utility connection delays</li>
              <li>Building fabric not ready for fit-out</li>
              <li>Labour availability shortages</li>
              <li>Weather impact on external works</li>
            </ul>
            <p>
              <strong>Commercial:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Subcontractor insolvency</li>
              <li>Material price escalation</li>
              <li>Scope creep from client changes</li>
              <li>Disputed variations</li>
              <li>Late payment from main contractor</li>
            </ul>
            <p>
              <strong>Site:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Asbestos discovery</li>
              <li>Existing services not as surveyed</li>
              <li>Access constraints</li>
              <li>Security and theft</li>
              <li>Damage by other trades</li>
            </ul>
            <p>
              <strong>Contingency management:</strong> Track drawdown against contingency throughout
              the project. Unspent contingency at completion indicates conservative risk assessment;
              frequent overruns indicate inadequate assessment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — EMV Calculation for Risk Register:</strong> Calculate contingency
              for three identified risks on a £500,000 MEP package.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk 1: Switchgear delay — Probability 25%, Impact £40,000</li>
              <li>
                EMV = 0.25 × £40,000 = <strong>£10,000</strong>
              </li>
              <li>Risk 2: Coordination redesign required — Probability 40%, Impact £15,000</li>
              <li>
                EMV = 0.40 × £15,000 = <strong>£6,000</strong>
              </li>
              <li>Risk 3: Asbestos discovery (refurb area) — Probability 20%, Impact £25,000</li>
              <li>
                EMV = 0.20 × £25,000 = <strong>£5,000</strong>
              </li>
              <li>
                Total risk-based contingency = £10,000 + £6,000 + £5,000 ={' '}
                <strong>£21,000 (4.2%)</strong>
              </li>
              <li>Add management reserve for unknown unknowns: +3% = £15,000</li>
              <li>
                <strong>Total contingency: £36,000 (7.2%)</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2 — Risk Response Selection:</strong> Main LV switchboard has 16-week
              lead time; programme allows only 12 weeks.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk score: High probability × High impact = Red zone</li>
              <li>Avoid: Change switchboard specification - Not viable, client requirement</li>
              <li>
                Transfer: Liquidated damages to supplier - Doesn't solve programme issue
              </li>
              <li>Mitigate: Place order immediately with advance payment</li>
              <li>Accept: Not appropriate for red-zone risk</li>
              <li>
                <strong>Selected: Mitigate.</strong> Action: Expedite design completion, place order
                week 1
              </li>
              <li>Mitigation cost: £2,000 advance payment fee</li>
              <li>Residual risk: 4-week buffer remains if minor delay</li>
            </ul>
            <p>
              <strong>Example 3 — Risk Register Entry:</strong> Complete a risk register entry for
              coordination clash risk.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ID:</strong> R-MEP-007
              </li>
              <li>
                <strong>Risk:</strong> Services coordination clashes requiring rework in Level 2
                plantroom
              </li>
              <li>
                <strong>Category:</strong> Technical / Design
              </li>
              <li>
                <strong>Cause:</strong> Compressed design programme, multiple design consultants
              </li>
              <li>
                <strong>Impact:</strong> Abortive work, programme delay, additional costs
              </li>
              <li>
                <strong>Probability:</strong> Medium (3) - 40%
              </li>
              <li>
                <strong>Impact rating:</strong> High (4) - £20,000 / 2 weeks
              </li>
              <li>
                <strong>Score:</strong> 12 (Orange - action required)
              </li>
              <li>
                <strong>Response:</strong> Mitigate
              </li>
              <li>
                <strong>Actions:</strong> Weekly BIM coordination meetings, 3D clash detection
                before installation
              </li>
              <li>
                <strong>Owner:</strong> MEP Design Manager
              </li>
              <li>
                <strong>EMV:</strong> £8,000
              </li>
              <li>
                <strong>Status:</strong> Open - Monitoring
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Risk management process checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish risk register at project inception</li>
              <li>Conduct initial risk identification workshop</li>
              <li>Assess all risks using probability/impact matrix</li>
              <li>Quantify high-priority risks (EMV calculation)</li>
              <li>Select response strategy for each significant risk</li>
              <li>Assign risk owners with clear responsibilities</li>
              <li>Calculate contingency from EMV sum plus management reserve</li>
              <li>Review and update register at every project meeting</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Risk score = Probability × Impact (1-25 scale)</li>
              <li>EMV = Probability % × Impact £</li>
              <li>
                Typical MEP contingency: <strong>10-15%</strong>
              </li>
              <li>
                Refurbishment contingency: <strong>12-18%</strong>
              </li>
              <li>
                Review frequency: <strong>Weekly to fortnightly</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Static risk register</strong> — Must be reviewed and updated regularly
                </li>
                <li>
                  <strong>No risk owner</strong> — Unassigned risks are never managed
                </li>
                <li>
                  <strong>Percentage-only contingency</strong> — Should be justified by risk
                  analysis
                </li>
                <li>
                  <strong>Ignoring residual risk</strong> — Mitigation rarely eliminates risk
                  entirely
                </li>
                <li>
                  <strong>No trigger monitoring</strong> — Early warning signs must be tracked
                </li>
              </ul>
            }
            doInstead="Treat the risk register as a living document with regular reviews, assign every risk to an accountable owner, justify contingency through structured EMV analysis, manage residual risk after mitigation, and define and monitor trigger conditions for each risk."
          />

          <SectionRule />

          <Scenario
            title="Asbestos discovery during MEP strip-out"
            situation={
              <>
                During strip-out for a refurbishment, the electrical sub finds suspected asbestos lagging behind a riser bulkhead. The pre-construction information showed the floor as "asbestos-free post-2008 refurb". Work in the riser stops immediately. The principal designer's risk register did not flag legacy AIB risk in concealed locations.
              </>
            }
            whatToDo={
              <>
                Halt all riser works. Quarantine the area with signage. Notify the principal designer, principal contractor and client the same day. Engage a UKAS-accredited asbestos surveyor for an R&D survey in the riser, not just the visible areas. Update the risk register: probability raised to "occurred", impact assessed against schedule and cost, mitigation = HSE-licensed removal contractor. Issue early warning under the contract. Update the construction phase plan. Resume only after clearance certificate.
              </>
            }
            whyItMatters={
              <>
                An incomplete pre-construction information package transfers risk silently to the contractor. Your risk register is how you protect the project: when something foreseeable was not flagged by the PD, you have evidence that the residual risk was not in your scope. Without that audit trail, you absorb the cost.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Risk = probability × impact, quantified — not a colour on a heat map.",
              "Risk register kept live from project start, updated weekly, with owner, mitigation, residual rating, review date.",
              "Five risk categories: design, programme, commercial, operational, HSE — track all together for pattern visibility.",
              "Mitigation hierarchy: avoid → transfer → reduce → accept. Acceptance is a deliberate decision, not laziness.",
              "Contingency proportional to residual exposure after mitigation, not a flat percentage.",
              "Review weekly; promote crystallised risks to the issue log; close out formally with audit trail.",
              "Pre-construction information completeness is critical — gaps in PCI are the silent risk transfer to the contractor.",
              "CDM Reg 9(2) places elimination duty on designers; your risk register manages what they could not eliminate.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Resource planning
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building services coordination
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section1_5;
