import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm3-s5-fixed-vs-risk',
    question:
      'A duty-holder asks why the previous “annual PAT” schedule was wrong and what risk-based means in practice. Best one-line answer?',
    options: [
      'Annual PAT is fixed in law and applies to every appliance.',
      'Risk-based means frequency is set per equipment, environment, use and user awareness — not a single interval.',
      'PAT is no longer required for any portable equipment.',
      'Frequency is fixed solely by the manufacturer’s warranty terms.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 from the HSE moved the regime from a fixed-interval (one-size-fits-all annual) approach to a risk-based one. The IET CoP 5th Edition adopts the same framing — frequency is decided by environment, equipment type, use frequency, and user awareness, not by a default annual rule. No specific interval, and no PAT exemption, is written into law.',
  },
  {
    id: 'patm3-s5-table-71',
    question:
      'IET CoP Table 7.1 gives indicative inspection frequencies. What is the correct way for a duty-holder to use it?',
    options: [
      'Apply the numbers directly as the fixed schedule for every site.',
      'Use it as a starting point, then adjust for the actual site and document the decision.',
      'Ignore it entirely — Table 7.1 is advisory and carries no weight.',
      'Apply it only to low-risk office environments and nowhere else.',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Table 7.1 is explicitly indicative. The duty-holder’s risk assessment takes the table as the starting point and adjusts up or down for this site’s actual environment, history and equipment, then records the reasoning. Failing to adjust is as poor as ignoring the table.',
  },
  {
    id: 'patm3-s5-shorten',
    question:
      'A workshop’s annual PAT cycle finds 8 % of items failing the formal visual inspection — most for damaged flexes and cracked plug bodies. What does HSG107 risk-based principle suggest the duty-holder should do?',
    options: [
      'Keep the annual cycle unchanged — the regime is already finding the defects.',
      'Shorten the cycle, using the failure-trend data to drive the change.',
      'Keep the cycle but replace the inspectors carrying out the work.',
      'Extend to a 5-yearly cycle to reduce the inspection cost.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 expects the duty-holder to use failure-rate data to adjust frequency. A high (or rising) fail rate means defects are developing faster than the cycle catches them safely; the response is a shorter formal-inspection interval, equipment changes, or both. A static schedule that ignores its own findings is not a risk-based regime, and extending the cycle would make the problem worse.',
  },
  {
    id: 'patm3-s5-user-checks',
    question:
      'On a construction site, a 110 V transformer-fed drill is used daily by site crews. The site has weekly toolbox checks but the formal PAT inspection is monthly. Where do user checks fit?',
    options: [
      'User checks have no formal place in the inspection regime.',
      'User checks before each use are the daily layer that catches the most recent damage.',
      'User checks replace formal visual inspection entirely on construction sites.',
      'User checks are logged as combined inspection-and-test on the PAT register.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 puts user checks at the front of the inspection regime — the user looks at the lead, plug and appliance before every use and is the most frequent inspector. Formal visual inspection (by a competent person) is layered on top at lower frequency, and combined inspection-and-test below that at the lowest. They supplement, not replace, the formal layers and are not recorded as a PAT inspection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'HSG107 introduced the “risk-based” approach to portable appliance inspection. What does this replace?',
    options: [
      'The requirement to carry out any form of visual inspection.',
      'The legal responsibility that sits with the duty-holder.',
      'A one-size-fits-all fixed-interval (typically annual) regime.',
      'The need for electrical testing, replacing it with documentation.',
    ],
    correctAnswer: 2,
    explanation:
      'HSG107 explicitly moved the HSE position away from “annual PAT for everything” to a risk-based frequency set by equipment type, environment, frequency of use and user awareness. The IET CoP 5th Edition follows the same framing. Annual remains correct for some equipment in some environments — but as the result of a risk assessment, not as a default. Visual inspection, testing and the duty-holder’s legal responsibility all remain.',
  },
  {
    id: 2,
    question:
      'IET CoP 5th Edition Table 7.1 gives indicative frequencies. Which of the following best describes the typical office-environment frequency for Class I IT equipment that is rarely moved?',
    options: [
      'A daily user check with a weekly formal inspection of every item.',
      'Formal visual inspection on year-scale intervals, with combined inspection-and-test on a longer cycle still.',
      'A formal inspection before every single use of the equipment.',
      'No inspection of any kind is required for static IT equipment.',
    ],
    correctAnswer: 1,
    explanation:
      'Static Class I IT equipment in low-risk offices is at the longest end of the Table 7.1 scale — formal visual inspection on year-scale cycles and combined inspection-and-test on a longer cycle still. Many duty-holders rely heavily on user checks plus formal visual inspection, with electrical testing on a longer cycle.',
  },
  {
    id: 3,
    question: 'Risk-based frequency setting takes account of which set of factors per HSG107?',
    options: [
      'The age of the equipment, taken in isolation from everything else.',
      'The cost of carrying out each individual inspection.',
      'The total number of staff employed across the workplace.',
      'Equipment type, environment, use, manufacturer instructions, user awareness and history.',
    ],
    correctAnswer: 3,
    explanation:
      'HSG107 names a multi-factor list: equipment type, environment, manufacturer recommendations, soundness, age, frequency of use, user awareness, defect history and duty cycle. The IET CoP 5th Edition Ch 7 carries the same list. Risk-based means using all of these factors, documented, to set frequency — not age, cost or headcount on their own.',
  },
  {
    id: 4,
    question:
      'A duty-holder has used a fixed annual PAT regime for 10 years. The records show consistently low fail rates (under 1 %) and no defects in service between cycles. HSG107-style risk-based response?',
    options: [
      'Extend the cycle for the appropriate equipment classes and document the decision.',
      'Keep the annual cycle unchanged, since the regime is finding no defects.',
      'Stop inspecting the equipment altogether to save inspection cost.',
      'Switch to a 6-monthly cycle as a precaution despite the low fail rate.',
    ],
    correctAnswer: 0,
    explanation:
      'Risk-based works in both directions. A persistently low fail rate is data the duty-holder uses to extend cycles where appropriate — the regime is responsive, not static. The change is documented and only applies to equipment classes / environments where the data supports it. A low fail rate shows the cycle is comfortably ahead of the failure curve.',
  },
  {
    id: 5,
    question: 'Which of the following is NOT a layer in the HSG107 inspection hierarchy?',
    options: [
      'User check before each use',
      'Formal visual inspection by a competent person',
      'Combined inspection-and-test (PAT) by a competent person',
      'Annual self-certification by the user with no record',
    ],
    correctAnswer: 3,
    explanation:
      'HSG107 names three layers: user check (every use), formal visual inspection (competent person, at appropriate frequency), and combined inspection-and-test (competent person, less frequent). Self-certification with no record is not part of the framework — at minimum the user check is implicit and informal, and the formal inspection produces a recorded result.',
  },
  {
    id: 6,
    question:
      'A new piece of office equipment is brought in. When is the first inspection per IET CoP / HSG107?',
    options: [
      'After 12 months, on the same cycle as the rest of the office.',
      'At the next scheduled maintenance window for the building.',
      'On receipt — a formal visual inspection confirms it arrived in compliant condition, then it joins the cycle for its class.',
      'New equipment is exempt and needs no first inspection.',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP and HSG107 expect a receipt-inspection of new equipment to confirm BS 1363 plug compliance, fuse rating, sheath integrity and labelling. New does not mean compliant — counterfeit BS 1363 plugs and incorrect fuses are common findings on new equipment. After receipt, the cycle aligns with the equipment class.',
  },
  {
    id: 7,
    question:
      'On a construction site, the appropriate user-check frequency for hand-held 110 V power-tools is:',
    options: [
      'Once a year, aligned with the combined inspection-and-test cycle.',
      'Before every use — the user checks the lead, plug and tool, reports defects and quarantines the tool.',
      'Once only, as part of the site induction process.',
      'Never, because checking the tool is solely the inspector’s job.',
    ],
    correctAnswer: 1,
    explanation:
      'Construction-site hand tools are at the most-frequent user-check end of the scale. Every use means every use — before plugging in. The user check is the daily layer; formal visual inspection is the weekly / monthly layer; combined inspection-and-test is the periodic layer.',
  },
  {
    id: 8,
    question: 'A duty-holder sets the inspection regime; who carries it out per IET CoP / HSG107?',
    options: [
      'A competent person with the knowledge, experience and access to the right test instruments for the work.',
      'Any member of staff in the workplace, with no particular requirement.',
      'Only a chartered electrical engineer registered with a professional body.',
      'The HSE, as part of its statutory inspection duties.',
    ],
    correctAnswer: 0,
    explanation:
      'Both IET CoP and HSG107 use “competent person” to describe who does the inspection and testing. Competence covers knowledge of the regulations, of the equipment, of the test instruments, and of the diagnostic interpretation of results. The duty-holder appoints; the competent person carries out.',
  },
  {
    id: 9,
    question:
      'A regular IT-room PAT cycle has not produced a single failure in five years. The IT room is climate-controlled, the equipment is static, the users are office staff. Risk-based regime change?',
    options: [
      'Keep the cycle exactly as it is, since the environment is unchanged.',
      'Stop inspecting the IT-room equipment entirely, as it has never failed.',
      'Extend the formal visual and combined inspection-and-test intervals, documenting the basis.',
      'Move to a weekly inspection cycle to be on the safe side.',
    ],
    correctAnswer: 2,
    explanation:
      'Persistently zero-failure data over multiple cycles in a low-risk environment is exactly the case HSG107 expects to drive cycle extension. The change is documented; the lower-frequency layers (user check, incident-driven inspections) continue and are not affected.',
  },
  {
    id: 10,
    question:
      'A risk-based inspection regime that ignores its own data and never adjusts intervals is:',
    options: [
      'Best practice, because consistency of intervals is the key principle.',
      'Not actually risk-based — it is fixed-interval inspection in disguise.',
      'Acceptable, provided the equipment is all Class II.',
      'Acceptable, provided the workplace is a low-risk office.',
    ],
    correctAnswer: 1,
    explanation:
      'A regime that does not change in response to its own findings is fixed-interval by another name. HSG107 expects the regime to respond to recorded data and adjust — its risk-based principle is iterative (observe, record, adjust). A duty-holder who never adjusts has not embraced the principle, regardless of paperwork.',
  },
];

const PATTestingModule3Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Risk-based approaches to test intervals | PAT Testing Module 3.5 | Elec-Mate',
    description:
      'HSG107 + IET CoP Ch 7 Table 7.1: how to set inspection frequency from environment, equipment type, frequency of use and user awareness, and how to use recorded data to adjust the regime.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="PAT M3 · Section 5"
            title="Risk-based approaches to test intervals"
            description="HSG107 replaced fixed-interval PAT with a risk-based regime. Use IET CoP Table 7.1 as the starting point, adjust for environment, equipment type, frequency of use and user awareness, and let the data drive the cycle."
            tone="yellow"
          />

          <TLDR
            points={[
              'HSG107 replaced “annual PAT for everything” with a risk-based regime. Frequency depends on environment, equipment type, frequency of use and user awareness — not on a single calendar interval.',
              'IET CoP Ch 7 Table 7.1 gives indicative starting frequencies by equipment / environment combination. Duty-holder’s risk assessment adjusts up or down and documents the reasoning.',
              'Three inspection layers: user check (every use), formal visual inspection (competent person, periodic), combined inspection-and-test (competent person, longer cycle). Each layer catches different defects.',
              'Risk-based is iterative. Failure-rate data and incident records feed back into the cycle — high fail rates shorten cycles; persistently zero failures justify extending them. Documented in both directions.',
              'New equipment is inspected on receipt. New does not mean compliant — counterfeit BS 1363 plugs, wrong-rating fuses and incorrect labelling all turn up on new kit.',
              'A regime that never changes in response to its own findings is fixed-interval inspection in disguise — not the risk-based principle HSG107 set out.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain to a duty-holder how HSG107 changed the inspection regime from fixed annual PAT to risk-based frequency setting',
              'Use IET CoP Table 7.1 as the starting point and adjust the indicative frequencies for the actual workplace environment, equipment, use pattern and user awareness',
              'Distinguish the three inspection layers — user check, formal visual inspection, combined inspection-and-test — and place each at the right frequency for a given workplace',
              'Use recorded failure-rate data and incident reports to adjust the inspection cycle in either direction, and document the basis for the change',
              'Place new equipment, hire equipment, and after-repair equipment correctly into the regime — receipt inspection, per-hire inspection, post-repair re-inspection',
              'Recognise when a fixed-interval regime is failing the risk-based principle and recommend the changes the duty-holder needs to make',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why HSG107 moved away from fixed-interval PAT</ContentEyebrow>

          <ConceptBlock
            title="The end of one-size-fits-all"
            plainEnglish="HSG107 (HSE) was a deliberate move away from the perception that ‘PAT means annual testing of everything’. The HSE’s position is that the workplace risk assessment is the source of frequency, not a calendar default."
            onSite="Two consequences. First, some equipment can be inspected less often than annually if the data supports it — reducing wasted cost. Second, some equipment must be inspected far more often than annually — and the duty-holder does not get to skip that for cost reasons."
          >
            <p>
              The fixed-interval PAT regime — annual PAT, every appliance, regardless of context —
              had three problems:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Over-inspection of low-risk equipment.</strong> A static PC in a clean
                office does not benefit much from annual electrical testing. The equipment’s defect
                rate is far below an annual cycle.
              </li>
              <li>
                <strong>Under-inspection of high-risk equipment.</strong> A site-tool that is
                dragged through dust, dropped, used in the wet, and passed between users every day
                will develop defects in weeks — not waiting for the next annual cycle.
              </li>
              <li>
                <strong>Tick-box culture.</strong> A fixed annual cycle becomes a paperwork exercise
                rather than a safety control. Inspection happens because it is on the calendar, not
                because the equipment needs it.
              </li>
            </ul>
            <p>
              HSG107 reframed the duty: the duty-holder runs a risk assessment, sets frequency on
              that basis, and adjusts the regime in response to recorded data. The IET CoP 5th
              Edition aligns with this framing throughout Ch 7.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                There is no single answer to the question “how often should equipment be inspected
                or tested?”. The frequency must be determined on the basis of a risk assessment that
                takes account of the type of equipment, the environment in which it is used, the
                frequency of use, the soundness of the equipment, the manufacturer&rsquo;s
                instructions, and the awareness and competence of the user. Equipment in low-risk
                environments may need less frequent formal inspection than is sometimes assumed;
                equipment in higher-risk environments may need much more frequent inspection.
              </>
            }
            meaning="HSG107 is explicit that the answer to ‘how often’ is ‘it depends’ — and lists what it depends on. Risk-based means using those factors, not a calendar default. The regime can be both more relaxed and more strict than ‘annual PAT’."
          />

          <SectionRule />

          <ContentEyebrow>IET CoP Table 7.1 — the starting-point matrix</ContentEyebrow>

          <ConceptBlock
            title="What Table 7.1 actually gives you"
            plainEnglish="IET CoP Ch 7 Table 7.1 cross-references equipment type (Class I / Class II / movable / hand-held / stationary) against environment category (low-risk office, school / college, public-access, industrial, construction, hire) and gives indicative starting frequencies for both formal visual inspection and combined inspection-and-test."
            onSite="The table is the starting point, not the answer. It tells you where to start; the workplace’s risk assessment decides where to land."
          >
            <p>The structure of Table 7.1 broadly:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Environment</th>
                    <th className="text-left text-white/80 py-2">User check</th>
                    <th className="text-left text-white/80 py-2">Formal visual inspection</th>
                    <th className="text-left text-elec-yellow py-2">
                      Combined inspection &amp; test
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Low-risk office (static IT, lamps, kettles)</td>
                    <td>Implicit / occasional</td>
                    <td>Annual to 2-yearly</td>
                    <td className="text-elec-yellow">Up to 4-yearly (per risk assessment)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">School / college</td>
                    <td>Before use (some equipment)</td>
                    <td>Annual to 2-yearly</td>
                    <td className="text-elec-yellow">Annual to 2-yearly</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Public-access (hotel, shop)</td>
                    <td>Before use</td>
                    <td>6-monthly to annual</td>
                    <td className="text-elec-yellow">Annual to 2-yearly</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Industrial / commercial workshop</td>
                    <td>Before use</td>
                    <td>Quarterly to 6-monthly</td>
                    <td className="text-elec-yellow">Annual</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Construction site</td>
                    <td>Every use</td>
                    <td>Weekly to monthly</td>
                    <td className="text-elec-yellow">Quarterly to monthly</td>
                  </tr>
                  <tr>
                    <td className="py-2">Hire / event</td>
                    <td>Every use (hirer)</td>
                    <td>Before each hire</td>
                    <td className="text-elec-yellow">Before each hire (or per cycle)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The numbers above are the typical placement of equipment in those environments. The
              actual numbers in the IET CoP table give bands and conditions; the starting-point
              principle is the takeaway. A duty-holder applies the row appropriate to the
              environment, then adjusts for equipment age, condition, recorded fail rate, and the
              other HSG107 factors.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020), Ch 7"
            clause={
              <>
                The frequency of inspection and testing of equipment depends on the type of
                equipment, the manufacturer&rsquo;s recommendations, the initial integrity and
                soundness of the equipment, the working environment, the frequency of use, and the
                duty cycle of the equipment. Table 7.1 provides initial frequencies of inspection
                and combined inspection and testing as a guide; these initial frequencies should be
                reviewed by the duty-holder on a regular basis on the basis of the maintenance
                history and any failures of the equipment in service.
              </>
            }
            meaning="Table 7.1 is named as a guide. The duty-holder reviews the frequencies based on history and incidents. The CoP makes explicit that risk-based is iterative — it is not a one-off setting."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The three inspection layers</ContentEyebrow>

          <ConceptBlock
            title="User check, formal visual inspection, combined inspection-and-test"
            plainEnglish="HSG107 frames the regime as three layers, each with a different frequency, scope and competent-person requirement. They are not alternatives — they sit on top of each other."
          >
            <p>The three layers and what they do:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>User check.</strong> Carried out by the user before each use (in higher-risk
                environments) or occasionally / on incident (in lower-risk environments). Scope:
                external visual — flex, plug, appliance body. No tools, no records typically; the
                user reports problems and quarantines the item. Catches recent damage and
                obvious-on-day defects.
              </li>
              <li>
                <strong>Formal visual inspection.</strong> Carried out by a competent person at
                periodic intervals (per Table 7.1). Scope: the full IET CoP Ch 15 visual inspection
                — sheath, plug, terminations (where accessible), pin condition, fuse rating, signs
                of overheating, modifications, environment suitability. Recorded on the PAT
                register. Catches defects the user check would not pick up — fuse mis-rating,
                construction defects, wear inside moulded plugs.
              </li>
              <li>
                <strong>Combined inspection and test.</strong> Carried out by a competent person
                with PAT instrument at less frequent intervals (per Table 7.1). Scope: formal visual
                inspection plus the electrical tests appropriate to the equipment class — earth
                continuity (Class I), insulation resistance, polarity, load / earth-leakage (where
                applicable). Recorded on the PAT register with numerical results. Catches internal
                degradation that visual inspection cannot reveal.
              </li>
            </ol>
            <p>
              Each layer catches different defects. Skipping a layer means the defects that layer
              would have caught are caught later — typically by failure in service rather than by
              inspection.
            </p>
          </ConceptBlock>

          {/* Risk-based interval flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Risk-based interval flow — HSG107 / IET CoP Ch 7
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Flow diagram showing the risk-based PAT cycle. Step 1: identify equipment, environment and use pattern. Step 2: take starting frequency from IET CoP Table 7.1. Step 3: adjust for site factors — manufacturer recommendations, equipment age, soundness, history. Step 4: implement three layers — user check, formal visual inspection, combined inspection-and-test. Step 5: record results on the PAT register. Step 6: review failure rates and adjust frequencies — extending where data supports, shortening where defects are appearing."
            >
              {/* Step boxes */}
              <rect
                x="40"
                y="30"
                width="140"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="110"
                y="52"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                1. Identify
              </text>
              <text x="110" y="68" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Equipment · environment
              </text>
              <text x="110" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                · use pattern
              </text>

              <rect
                x="200"
                y="30"
                width="140"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="270"
                y="52"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                2. Starting freq
              </text>
              <text x="270" y="68" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                IET CoP Table 7.1
              </text>
              <text x="270" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                indicative
              </text>

              <rect
                x="360"
                y="30"
                width="140"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="430"
                y="52"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                3. Adjust
              </text>
              <text x="430" y="68" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Age · soundness ·
              </text>
              <text x="430" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                history · OEM
              </text>

              <rect
                x="520"
                y="30"
                width="240"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="52"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                4. Implement three layers
              </text>
              <text x="640" y="68" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                User check · formal visual ·
              </text>
              <text x="640" y="80" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                combined inspection &amp; test
              </text>

              {/* Arrows row 1 */}
              <line
                x1="180"
                y1="60"
                x2="200"
                y2="60"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="200,60 192,56 192,64" fill="rgba(255,255,255,0.5)" />
              <line
                x1="340"
                y1="60"
                x2="360"
                y2="60"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="360,60 352,56 352,64" fill="rgba(255,255,255,0.5)" />
              <line
                x1="500"
                y1="60"
                x2="520"
                y2="60"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="520,60 512,56 512,64" fill="rgba(255,255,255,0.5)" />

              {/* Three layers */}
              <rect
                x="50"
                y="140"
                width="220"
                height="86"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="160"
                y="160"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Layer A: User check
              </text>
              <text x="160" y="178" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Every use (high-risk)
              </text>
              <text x="160" y="192" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Visual external · informal
              </text>
              <text x="160" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Catches recent damage
              </text>

              <rect
                x="290"
                y="140"
                width="220"
                height="86"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="160"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Layer B: Formal visual
              </text>
              <text x="400" y="178" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Periodic · competent person
              </text>
              <text x="400" y="192" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                IET CoP Ch 15 checklist
              </text>
              <text x="400" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Recorded on PAT register
              </text>

              <rect
                x="530"
                y="140"
                width="220"
                height="86"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="640"
                y="160"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Layer C: Combined I &amp; T
              </text>
              <text x="640" y="178" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Less frequent · with tester
              </text>
              <text x="640" y="192" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Visual + electrical tests
              </text>
              <text x="640" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Numerical results recorded
              </text>

              {/* Step 5 — Record */}
              <rect
                x="280"
                y="270"
                width="240"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="292"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                5. Record on PAT register
              </text>
              <text x="400" y="308" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Defects · actions · trends
              </text>
              <text x="400" y="320" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                duty-holder feedback
              </text>

              {/* Step 6 — Review */}
              <rect
                x="280"
                y="350"
                width="240"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="372"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                6. Review &amp; adjust
              </text>
              <text x="400" y="388" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                High fail rate → shorten
              </text>
              <text x="400" y="400" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Zero fail history → may extend
              </text>

              {/* Loop arrow back to step 3 */}
              <path
                d="M280,380 C160,380 130,200 360,90"
                fill="none"
                stroke="rgba(34,197,94,0.6)"
                strokeWidth="1.4"
                strokeDasharray="6,4"
              />
              <polygon points="360,90 354,98 362,100" fill="#22C55E" />
              <text
                x="160"
                y="380"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                iterate
              </text>

              <rect
                x="40"
                y="424"
                width="720"
                height="28"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="442"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                HSG107 / IET CoP Ch 7 — risk-based is iterative, not a one-off setting
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Adjusting from the starting point — the factors</ContentEyebrow>

          <ConceptBlock
            title="What moves the cycle up or down"
            plainEnglish="The Table 7.1 starting frequency is adjusted by site-specific factors. Some factors shorten the cycle (more frequent inspection); others extend it (less frequent). Both directions need data and documentation."
          >
            <p>
              <strong>Factors that shorten the cycle:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Recorded fail rate above the historic norm for the equipment class.</li>
              <li>
                Recent incidents — RCD trips, smell of burning, user-reported damage between
                inspection cycles.
              </li>
              <li>
                Environment change — equipment moved from a low-risk area to a higher-risk one;
                building works changing the dust / movement profile.
              </li>
              <li>Equipment age approaching or beyond manufacturer service life.</li>
              <li>
                Equipment passing through the hire / lend / public-access loop where supervision
                continuity is broken.
              </li>
            </ul>
            <p>
              <strong>Factors that may justify extending the cycle:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Persistent zero-fail data over multiple cycles in a controlled environment with
                stable equipment population.
              </li>
              <li>
                Robust user-check culture with reliable reporting — defects caught quickly between
                formal cycles.
              </li>
              <li>
                Stable equipment — no recent changes to the inventory, environment, or use pattern.
              </li>
              <li>
                Manufacturer recommendation supporting longer cycles for the specific equipment
                class.
              </li>
            </ul>
            <p>
              The change is documented on the duty-holder’s risk assessment with the basis. The
              cycle is reviewed at the next assessment with the data from the new cycle.
            </p>
          </ConceptBlock>

          <Scenario
            title="A regional office using a flat 1-yearly PAT cycle for everything"
            situation="A regional office runs a 1-yearly PAT cycle for all its equipment. The cycle includes: 50 PCs and monitors (low-risk static IT), 20 kettles / fridges in kitchens (low-risk but movable), 5 site-survey power-tools that travel between offices and outdoor sites (high-risk). Annual fail rate: < 1 % on IT, ~3 % on kitchen, ~12 % on site-tools."
            whatToDo="Recommend three different cycles, each driven by Table 7.1 and the recorded data. Static IT: extend to 2-yearly combined inspection-and-test (or longer if the data continues to support it), with annual formal visual inspection. Kitchen: keep at annual combined inspection-and-test; reasonable. Site-tools: shorten to monthly formal visual + quarterly combined inspection-and-test, plus user-check before every use. Differentiating the cycles makes the regime more effective and cheaper at the same time."
            whyItMatters="A flat regime over-inspects the IT (wasted cost) and under-inspects the site-tools (risk gap). The data the duty-holder already has — the 12 % fail rate on site-tools — is exactly the signal HSG107 expects to drive a cycle change. A risk-based regime uses its own data."
          />

          <RegsCallout
            source="HSG107 — Maintaining portable electrical equipment (HSE, 4th Edition 2013, reissued)"
            clause={
              <>
                The duty-holder should record the results of inspections and tests, monitor the
                results to identify trends in equipment performance, and use those results to adjust
                the inspection and testing regime so that intervals are appropriate to the actual
                rate at which faults are developing in the equipment under the conditions of its
                use. A high failure rate is an indication that the inspection interval is too long
                or that the conditions of use are unsuitable.
              </>
            }
            meaning="HSG107 makes the data-driven adjustment explicit. The register is a tool, not just a record. A high failure rate is information — it changes the regime, not just the next inspection."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Special cases — receipt, post-repair, hire, after-incident
          </ContentEyebrow>

          <ConceptBlock
            title="When inspection happens outside the routine cycle"
            plainEnglish="Some events trigger an inspection regardless of the cycle: new equipment arriving on site, equipment returning from repair, equipment going out on hire / coming back, and any incident that suggests damage."
          >
            <p>The four off-cycle inspection triggers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Receipt of new equipment.</strong> Formal visual inspection on receipt to
                confirm BS 1363 plug compliance, fuse rating, sheath integrity and labelling.
                Counterfeit BS 1363 plugs are surprisingly common; the receipt inspection catches
                them before the equipment enters service. Adds the equipment to the asset register
                and the cycle.
              </li>
              <li>
                <strong>Return from repair.</strong> A repaired item is re-inspected and
                re-electrically-tested before returning to service. Visible signs of overheating
                that triggered the original fail must be confirmed cleared; new-fitted plugs / fuses
                must be confirmed correct.
              </li>
              <li>
                <strong>Hire issue and return.</strong> Hire equipment is inspected before issue and
                on return; HSG107 puts hire kit at this maximum-frequency end. The
                quarantine-and-test process between hires is the per-hire regime.
              </li>
              <li>
                <strong>After incident.</strong> Any incident — RCD trip, user-reported smell of
                burning, equipment dropped, water spillage on equipment — triggers an out-of-cycle
                inspection of the affected equipment. The user check is the alarm; the formal
                inspection is the response.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating user checks as not part of the regime"
            whatHappens="A site has a yearly PAT cycle. Between cycles, no one inspects anything because ‘inspection is the inspector’s job’. Damage that develops in week two of the cycle is in service for 50 weeks before being caught. By then the damaged item has either failed in service or done a year’s worth of degraded service."
            doInstead="HSG107 explicitly puts user checks at the front of the regime. Not every check is formal — a user looking at the lead before plugging in is the user check. In high-risk environments it is mandatory and documented; in low-risk environments it is implicit but still expected. The duty-holder makes user awareness part of the regime and the inspector reinforces it."
          />

          <CommonMistake
            title="Setting frequencies and never reviewing them"
            whatHappens="A regime is set at the start of a service contract — 1-yearly for everything — and runs unchanged for five years. The fail rate drifts upward as equipment ages; new high-risk items are bought; the building works change the dust profile. The cycle does not change because no one is reviewing the data."
            doInstead="Risk-based requires periodic review of the cycle. At minimum, the duty-holder reviews fail rates and incident data annually and considers whether cycles need to change. The IET CoP and HSG107 both expect this; a static unchanged regime is fixed-interval inspection with extra paperwork."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The duty-holder, the competent person, and the legal frame
          </ContentEyebrow>

          <ConceptBlock
            title="Roles and responsibilities under PUWER and the Electricity at Work Regs"
            plainEnglish="The duty-holder (employer / business owner / building manager) is responsible for the regime existing and being run; the competent person carries it out. The legal frame is PUWER 1998 (maintenance) and the Electricity at Work Regulations 1989 (safety of electrical systems and equipment)."
          >
            <p>The split:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Duty-holder.</strong> Decides the inspection regime, sets the frequencies in
                line with HSG107 and IET CoP, appoints competent persons, holds the register, and
                reviews / adjusts the regime based on data. Cannot delegate the legal responsibility
                — only the practical work.
              </li>
              <li>
                <strong>Competent person.</strong> Carries out formal visual inspection and combined
                inspection-and-test. Has the knowledge, experience, training and access to test
                instruments to do the work safely and accurately. Reports results, defects and
                trends back to the duty-holder.
              </li>
              <li>
                <strong>User.</strong> Carries out user checks before use (in higher-risk
                environments). Reports defects between cycles and quarantines damaged equipment.
                Awareness and training is the duty-holder’s responsibility.
              </li>
            </ul>
            <p>The legal frame:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Electricity at Work Regulations 1989, Reg 4(2):</strong> &ldquo;As may be
                necessary to prevent danger, all systems shall be maintained so as to prevent, so
                far as is reasonably practicable, such danger.&rdquo; The PAT regime is one of the
                ways the maintenance duty is discharged for portable electrical equipment.
              </li>
              <li>
                <strong>PUWER 1998, Reg 5:</strong> work equipment maintained in efficient working
                order. Reg 6: inspection at intervals appropriate to the conditions and as otherwise
                prescribed.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989, Reg 4(2)"
            clause={
              <>
                As may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger.
              </>
            }
            meaning="The duty is on the duty-holder; the standard is ‘so far as reasonably practicable’. PAT inspection at appropriate frequency is one of the ways the duty is discharged for portable electrical equipment. ‘As may be necessary’ ties the duty to actual conditions — the same risk-based principle HSG107 puts into practice."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'HSG107 replaced fixed-interval PAT with a risk-based regime. Frequency depends on equipment type, environment, frequency of use, soundness, age, and user awareness — not a calendar default.',
              'IET CoP Table 7.1 is the starting-point matrix: indicative frequencies by environment / equipment class. Adjust for site-specific factors and document the basis.',
              'Three inspection layers — user check, formal visual inspection, combined inspection-and-test. Each catches different defects; none replaces the others.',
              'Risk-based is iterative. The duty-holder reviews failure-rate data and adjusts the cycle in either direction. A static regime is fixed-interval inspection in disguise.',
              'New equipment, returned hire, post-repair, and after-incident are off-cycle inspection triggers. The cycle is the routine; these are the exceptions.',
              'The duty-holder is legally responsible (Electricity at Work Regs Reg 4(2), PUWER Reg 5/6). The competent person carries out the work. Users do the daily layer.',
              'Differentiate cycles across the same workplace where conditions warrant. Office and site-tools on the same cycle is rarely defensible.',
              'High fail rates are data, not noise. They mean the cycle is catching defects too late and the regime needs to change.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is annual PAT still required by law?',
                answer:
                  'No specific frequency is required by law. The Electricity at Work Regs 1989 require systems to be maintained so as to prevent danger; PUWER 1998 requires work equipment to be maintained in good repair. HSG107 (HSE guidance) and IET CoP Ch 7 set out how that duty is met for portable electrical equipment — and explicitly via a risk-based frequency, not a calendar default.',
              },
              {
                question: 'Who decides the inspection frequency for a workplace?',
                answer:
                  'The duty-holder, on the basis of a risk assessment that considers the HSG107 factors. The competent person (PAT inspector or contractor) advises and carries out the work; the legal responsibility for the regime sits with the duty-holder. The duty-holder cannot delegate the legal duty, only the practical execution.',
              },
              {
                question: 'How do I justify extending an inspection interval?',
                answer:
                  'With recorded data: persistently low fail rates over multiple cycles, no incidents in service, stable environment and equipment, manufacturer recommendation supporting longer cycles. The change is documented on the risk assessment with the basis. The new interval is reviewed at the next cycle.',
              },
              {
                question: 'Are user checks really part of the inspection regime?',
                answer:
                  'Yes. HSG107 names them as the daily / per-use layer of the regime, alongside formal visual inspection and combined inspection-and-test. They are particularly important in high-risk environments where defects can develop within hours. The duty-holder is responsible for user awareness — training, signage, the culture that says “if it looks wrong, don’t plug it in”.',
              },
              {
                question:
                  'A new piece of equipment arrives in a sealed box from the manufacturer. Do I have to inspect it before use?',
                answer:
                  'Yes — IET CoP and HSG107 both expect a receipt inspection. Counterfeit BS 1363 plugs, wrong-rating fuses, and labelling errors are common findings on new equipment, particularly imports. The receipt inspection is a formal visual inspection that confirms the equipment is compliant before it enters service. After receipt, the equipment is added to the cycle.',
              },
              {
                question:
                  'Can I skip combined inspection-and-test if every formal visual inspection passes?',
                answer:
                  'For some equipment in some environments, the combined inspection-and-test cycle can be longer than the formal visual cycle — IET CoP Table 7.1 reflects this. But it is not skipped entirely; it is at a lower frequency. Internal degradation (insulation breakdown, earth-conductor damage at terminations) is often invisible to visual inspection and only revealed by the electrical tests.',
              },
              {
                question: 'What does “competent person” mean for PAT inspection?',
                answer:
                  'IET CoP defines competent person as someone with sufficient knowledge of the regulations, the equipment, the test instruments, and the diagnostic interpretation of results to carry out the work safely and accurately. Formal qualifications (City &amp; Guilds 2377 / EAL PAT) are common evidence of competence but the principle is broader — knowledge, experience, training, access to the right instruments, and ongoing CPD.',
              },
              {
                question: 'How do I record a risk-based regime so it is auditable?',
                answer:
                  'Three documents: (1) the workplace risk assessment, including the inspection frequency decisions and their basis; (2) the asset register / PAT register, with each item, its location, its inspection results, and any defects; (3) the periodic review of the regime, with any frequency adjustments documented. Together these show the regime is risk-based, iterative, and responsive to data — which is exactly what HSG107 and the IET CoP expect.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Risk-based approaches to test intervals — PAT M3.5"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4 — Electrical testing
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule3Section5;
