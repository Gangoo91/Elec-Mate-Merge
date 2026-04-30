/**
 * Module 5 · Section 6 — AM2 fault diagnosis & rectification quick reference
 * AM2 day-prep — AM2 Phase D (fault diagnosis + rectification)
 * One-page revision: fault types, symptoms, rectification steps and the re-tests required after each.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Search,
  Settings,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  RegsCallout,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fault Diagnosis & Rectification Quick Reference | AM2 Module 5.6 | Elec-Mate';
const DESCRIPTION =
  'One-page AM2 revision: fault types, symptoms, rectification steps and the re-tests you have to repeat after each fix.';

const AM2Module5Section6 = () => {
  useSEO(TITLE, DESCRIPTION);

  const faultTypes = [
    {
      type: 'Open Circuit',
      symptom: 'Dead socket, dead light, no continuity',
      rectification: 'Reconnect conductor at CU/socket/rose',
      reTest: 'Continuity test of conductors',
    },
    {
      type: 'Short Circuit (L-N)',
      symptom: 'MCB trips instantly, IR test ~0 MOhms',
      rectification: 'Locate and re-terminate damaged conductor at point of fault',
      reTest: 'Insulation resistance (L-N, L-E)',
    },
    {
      type: 'Earth Fault (L-E)',
      symptom: 'RCD trips, low IR between line and earth',
      rectification: 'Remove line contact with earth (e.g. re-terminate in DB)',
      reTest: 'IR test (L-E) + RCD test',
    },
    {
      type: 'High Resistance Joint',
      symptom: 'Circuit works but Zs too high, heating at accessory',
      rectification: 'Remake/retighten loose termination at accessory/socket',
      reTest: 'Earth fault loop impedance (Zs)',
    },
    {
      type: 'Polarity Reversed',
      symptom: 'Light permanently on, socket polarity reversed',
      rectification: 'Swap line and neutral into correct terminals (at socket or switch)',
      reTest: 'Polarity test at point of use',
    },
    {
      type: 'Faulty Accessory',
      symptom: "One outlet doesn't work, visual damage",
      rectification: 'Replace faulty accessory with new one',
      reTest: 'Functional test + polarity',
    },
    {
      type: 'Open CPC',
      symptom: 'CPC continuity failed, no earth at accessory',
      rectification: 'Reconnect CPC in earth bar/socket back box',
      reTest: 'Continuity test CPC + Zs',
    },
    {
      type: 'Motor Circuit Fault',
      symptom: 'Starter not working, no overload protection',
      rectification: 'Correct start/stop wiring / set overload correctly / re-terminate SWA',
      reTest: 'Functional start/stop test + continuity',
    },
  ];

  const goldenRules = [
    'Never guess - always test logically and record type + location + rectification',
    'Phrase properly: Action + Location + Re-Test',
    'Example: "Reconnect CPC at socket outlet and re-test continuity and Zs"',
    'Always state re-testing - forgetting this is one of the top reasons candidates lose marks',
    'Work safe - prove dead before fault-finding, even in assessment conditions',
    'Aim for 3 out of 4 faults correct - this is usually the pass requirement',
  ];

  const quickTestingGuide = [
    { fault: 'Open circuits', test: 'Continuity' },
    { fault: 'Short circuits / Earth faults', test: 'Insulation resistance' },
    { fault: 'Polarity errors', test: 'Polarity test at accessories' },
    { fault: 'High resistance', test: 'Zs test (compare to BS 7671 limits)' },
    { fault: 'Functional errors', test: 'Switch, RCD, or motor control tests' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module5"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </Link>

          <PageHero
            eyebrow="Quick Reference Sheet"
            title="AM2 Fault Diagnosis & Rectification"
            description="Essential reference guide for AM2 fault-finding procedures. Keep this handy during your preparation and assessment."
            tone="yellow"
          />

          <TLDR
            points={[
              'On AM2 day: 2 deliberate faults, ~1.5–2 hours, prove-test-prove every time, target 3 of 4 if there are extra rig anomalies (typical pass requirement).',
              'Format every fault answer as Type + Location + Rectification + Re-test. Skip any of those four and you cap your marks.',
              'Aim for full marks not by speed but by clarity: name the BS 7671 reg, name the maximum value, name the test settings. Detail wins.',
            ]}
          />

          <div className="space-y-6">
            {/* Fault Types Table */}
            <ConceptBlock title="Fault Types, Rectification & Re-Test">
              {faultTypes.map((fault, index) => (
                <div key={index}>
                  <p>
                    <strong className="text-elec-yellow">
                      {index + 1}. {fault.type}
                    </strong>
                  </p>
                  <p>
                    <strong>Typical Symptom:</strong> {fault.symptom}
                  </p>
                  <p>
                    <strong>Rectification:</strong> {fault.rectification}
                  </p>
                  <p>
                    <strong>Re-Test Required:</strong> {fault.reTest}
                  </p>
                </div>
              ))}
            </ConceptBlock>

            <RegsCallout
              source="BS 7671 — Regulation 134.1.1 + 643.1 (workmanship + verification)"
              clause="Good workmanship by competent persons or persons under their proper supervision and proper materials shall be used. Inspection and testing shall be carried out to verify that the requirements of the Regulations have been met."
              meaning={
                <>
                  These two regs are the spine of fault-finding on AM2. Workmanship faults (loose
                  terminations, missing CPCs, wrong polarity) are deliberately set under Reg 134,
                  and verification (initial + after alteration) is what your testing proves under
                  Reg 643. When you write your answer, frame it in this language: identify the
                  workmanship defect, describe the workmanship-quality fix, name the verification
                  test that confirms compliance.
                </>
              }
              cite="Reference: BS 7671 Part 1 — Reg 134; Part 6 — Reg 643"
            />

            {/* Golden Rules */}
            <ConceptBlock title="Golden Rules">
              <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
                {goldenRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ol>
            </ConceptBlock>

            {/* Essential Test Equipment */}
            <ConceptBlock title="Essential Test Equipment">
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Continuity Tester:</strong> 200mA test current for conductor continuity
                </li>
                <li>
                  <strong>Insulation Tester:</strong> 500V DC for IR between conductors
                </li>
                <li>
                  <strong>Loop Tester:</strong> Zs measurements for earth faults
                </li>
                <li>
                  <strong>RCD Tester:</strong> Verify RCD operation after earth faults
                </li>
              </ul>
            </ConceptBlock>

            {/* Time Management */}
            <ConceptBlock title="AM2 Time Management">
              <p>
                <strong className="text-elec-yellow">Typical Time Allocation:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Initial circuit inspection: 5-10 minutes</li>
                <li>Fault diagnosis per circuit: 15-20 minutes</li>
                <li>Rectification: 10-15 minutes</li>
                <li>Re-testing and documentation: 5-10 minutes</li>
              </ul>

              <p>
                <strong className="text-elec-yellow">Pro Tips:</strong>
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Start with obvious visual checks</li>
                <li>Use logical sequence: dead tests first</li>
                <li>Document as you work, not at the end</li>
                <li>Don't spend too long on one fault</li>
              </ul>
            </ConceptBlock>

            <Scenario
              title="The day arrives — what do you do in the first 5 minutes?"
              situation={
                <>
                  Assessor's briefed you. You're at the AM2 fault rig. The board's set up with two
                  deliberate faults somewhere in the circuits. Test instruments on the bench, paper
                  for recording, your kit ready. The clock starts now.
                </>
              }
              whatToDo={
                <>
                  <strong>Don't touch anything yet.</strong> First 5 minutes: visual walkaround.
                  Look at the consumer unit, look at every accessory, note circuit names, identify
                  the isolation point. Then put the kettle on (figuratively). When you start
                  testing, your very first action is safe isolation: prove voltage indicator on a
                  known live source, isolate at the CU, prove dead, re-prove the indicator. Only
                  THEN start dead testing. Methodical opening sets the tone for everything that
                  follows.
                </>
              }
              whyItMatters={
                <>
                  The most common AM2 failure isn't getting the fault wrong — it's rushing the
                  start. Candidates skip safe isolation under time pressure and either (a) get
                  marked instant fail or (b) trip a live RCD when they shouldn't and confuse
                  themselves. 5 minutes of methodical observation saves 30 minutes of chaos.
                </>
              }
            />

            {/* Quick Testing Guide */}
            <ConceptBlock title="Quick Testing Guide">
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                {quickTestingGuide.map((item, index) => (
                  <li key={index}>
                    <strong>{item.fault}:</strong> → {item.test}
                  </li>
                ))}
              </ul>
            </ConceptBlock>

            {/* Safety Reminders */}
            <CommonMistake
              title="Safety First - Always Remember"
              whatHappens={
                <>
                  <p>
                    <strong>Before Any Work:</strong>
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Prove circuit is dead</li>
                    <li>Lock off and tag supply</li>
                    <li>Use appropriate PPE</li>
                    <li>Check test equipment works</li>
                  </ul>
                  <p>
                    <strong>During Testing:</strong>
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Use GS38 compliant leads</li>
                    <li>Keep one hand in pocket when possible</li>
                    <li>Never assume - always verify</li>
                    <li>Report any unsafe conditions</li>
                  </ul>
                </>
              }
              doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
            />

            {/* Success Formula */}
            <ConceptBlock title="Success Formula">
              <p>
                If apprentices memorise this sheet, they'll walk into fault-finding with a clear
                plan:
              </p>
              <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Diagnose</strong>
                </li>
                <li>
                  <strong>State Rectification</strong>
                </li>
                <li>
                  <strong>State Re-Test</strong>
                </li>
                <li>
                  <strong className="text-elec-yellow">Done</strong>
                </li>
              </ol>
            </ConceptBlock>

            <CommonMistake
              title="Treating fault diagnosis like 'find the answer' instead of 'follow the method'"
              whatHappens={
                <>
                  You walk in determined to identify what the fault is. You jab around with the
                  meter, spot something wrong, write "earth fault at SO2 — fix it" and feel
                  relieved. Assessor marks you partial because there's no methodology shown, no test
                  sequence, no rectification format, no re-test. Even though you found the fault,
                  you didn't prove competence.
                </>
              }
              doInstead={
                <>
                  AM2 marks the JOURNEY, not just the destination. Talk through your symptom
                  analysis, name your test choices, record actual values, format rectification
                  properly, name the re-test. Even if you misidentify the exact fault location,
                  demonstrating method earns method marks. Random guessing earns nothing.
                </>
              }
            />

            <FAQ
              items={[
                {
                  question: 'How long do I get on AM2 fault diagnosis?',
                  answer:
                    'Around 1.5–2 hours. Typically 2 deliberate faults in the rig. Budget ~45–60 minutes per fault including diagnosis, recording, and stating re-test. Build in 5 minutes at the start for visual inspection and safe isolation.',
                },
                {
                  question: 'Do I have to find ALL the faults to pass?',
                  answer:
                    "Pass mark is usually 3 out of 4 if extra rig anomalies are present, or both deliberate faults found correctly. Even if you don't find every fault, complete and correct method on what you DO find scores well — partial method is what fails most candidates.",
                },
                {
                  question: "What's the most common reason candidates fail this section?",
                  answer:
                    'Forgetting the re-test. Diagnosis correct, location correct, rectification stated — but no re-test mentioned. Caps your marks even with everything else right. Always: Type + Location + Rectification + Re-test. Four parts, every fault, every time.',
                },
                {
                  question: 'Should I work on both faults at the same time or one at a time?',
                  answer:
                    "One at a time. Diagnose, document, state rectification + re-test for fault 1. Then re-isolate, restart, work on fault 2. Trying to test both simultaneously gets you confused readings (one fault affects another circuit's IR or Zs) and confused recording.",
                },
                {
                  question: 'Can I ask the assessor for help?',
                  answer:
                    "You can ask clarifying questions about the rig setup or instrumentation, but not for hints about where the fault is. Assessors observe silently and only intervene if you do something dangerous. Treat them like a customer who's hired you — they want professional service, not a quiz partner.",
                },
                {
                  question:
                    'What if I find what looks like an unsafe install (not a deliberate fault)?',
                  answer:
                    'Stop and flag it to the assessor. Genuine safety issues take priority over the AM2 task. Continuing past a real hazard is exactly what BS 7671 + EAWR + HASAWA say not to do — and the assessor would rather see safety judgement than ignored risk.',
                },
              ]}
            />

            <KeyTakeaways
              points={[
                'AM2 fault day: 2 deliberate faults, ~1.5–2 hours, target 3-of-4 method completeness for pass.',
                'Every answer needs four parts: Type + Location + Rectification + Re-test. Miss any one and your marks cap.',
                "Match the test to the symptom (Module 5 Section 1–3 reference table). Don't randomly try every test on every fault.",
                "Re-test isn't optional — BS 7671 Reg 643.1 makes it a regulation. Earth faults need IR + RCD; everything else needs the matching specific test.",
                "Workmanship language earns marks. 'Reconnect', 'remake', 're-terminate', 'replace' are the verbs the regs use. 'Fix', 'sort', 'have a go' are not.",
                "If you spot a real (non-deliberate) safety issue, stop and tell the assessor. That's competence, not a distraction from the test.",
              ]}
            />

            {/* Module Summary */}
            <ConceptBlock title="Module 5 Complete">
              <p className="text-ios-body text-white leading-relaxed">
                You've completed Module 5: Fault Diagnosis and Rectification. This quick reference
                sheet summarises all the key concepts from the module. Use it as a study aid and
                refer back to it before your assessment.
              </p>
            </ConceptBlock>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/study-centre/apprentice/am2/module5/section5"
                className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 text-[14px] font-semibold text-white truncate">
                  Re-testing Procedures
                </div>
              </Link>
              <Link
                to="/study-centre/apprentice/am2/module6"
                className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 text-[14px] font-semibold text-black truncate">
                  Module 6: Documentation
                </div>
              </Link>
            </div>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module5Section6;
