import { TestTube } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'Before loop testing, what should be confirmed?', options: ['That all devices are addressed and wiring inspected', 'That all labels are removed', 'That the C&E is uploaded', 'That mains is isolated permanently'], correctAnswer: 0, explanation: 'Ensure addressing, polarity, continuity, and visual inspection are complete before energising and testing.' },
  { id: 2, question: 'What instrument is used to verify insulation resistance of the loop?', options: ['Multimeter only', 'Insulation resistance tester at appropriate voltage', 'Clamp meter', 'Sound level meter'], correctAnswer: 1, explanation: 'Use an insulation resistance tester per manufacturer guidance; protect equipment as required.' },
  { id: 3, question: 'Continuity testing validates:', options: ['Voltage drop only', 'Correct connections and no opens on loop or spurs', 'Sounder dB(A)', 'Wi-Fi coverage'], correctAnswer: 1, explanation: 'Continuity checks confirm intact circuits and correct terminations.' },
  { id: 4, question: 'Polarity errors on loops typically cause:', options: ['Improved signalling', 'Device communications faults and instability', 'Lower current draw', 'Brighter VADs'], correctAnswer: 1, explanation: 'Incorrect polarity can cause bus errors and unreliable operation.' },
  { id: 5, question: 'Loop verification includes:', options: ['Functional cause & effect only', 'Address scan, device type confirmation, and loop load checks', 'Painting devices', 'Cleaning only'], correctAnswer: 1, explanation: 'Scan and verify device inventory and electrical loading against CIE capability.' },
  { id: 6, question: 'What must be considered to protect equipment during IR tests?', options: ['Apply 1000 V indiscriminately', 'Follow manufacturer: disconnect electronics or use lower test voltage', 'Run full load', 'Short the loop intentionally'], correctAnswer: 1, explanation: 'Protect sensitive electronics per manufacturer instructions to avoid damage.' },
  { id: 7, question: 'What additional test ensures cable health?', options: ['Ping test', 'Voltage drop calculation/measurement under load', 'Smoke test', 'Light test'], correctAnswer: 1, explanation: 'Voltage drop should be within specification to ensure reliable operation.' },
  { id: 8, question: 'How should loop isolators be verified during testing?', options: ['Ignore them', 'Induce a downstream short and confirm isolation/restoration', 'Visual check only', 'Measure sound level'], correctAnswer: 1, explanation: 'Safely induce a controlled fault downstream to verify isolator opens and the rest of the loop remains operational, then restores.' },
];

const FireAlarmModule5Section3 = () => (
  <FireAlarmModule5SectionTemplate
    icon={TestTube}
    sectionNumber="3"
    title="Loop Testing and Verification"
    description="Testing procedures and verification methods"
    badges={["BS 5839-1", "Verification"]} blocksLayout="stack"
    intro="Loop testing and verification ensure the installed infrastructure supports reliable commissioning. We cover isolation and protection of electronics, continuity and IR tests, inventory scans, loop load and voltage drop assessment, defect logging and final documentation."
    learnings={[
      "Plan safe, sequential tests protecting sensitive electronics",
      "Execute insulation resistance at 250 V DC for SELV unless manufacturer specifies otherwise",
      "Carry out continuity and polarity checks with expected resistance based on length/CSA",
      "Run panel loop scans; reconcile addresses/types to the device schedule",
      "Verify isolators by inducing a safe short; confirm open and auto-restore",
      "Measure voltage drop at the furthest device under representative alarm load",
      "Compare loop current/load to CIE capability and channel/VAD limits",
      "Record calibrated results, instruments, locations, defects and retests for audit",
      "Apply acceptance criteria from BS 5839-1, BS 7671 and manufacturer data",
    ]}
    blocks={[
      { heading: "Safe Setup & Isolation (Step-by-step)", points: [
        "Step 1 – Notify stakeholders; obtain permits; place warning signage",
        "Step 2 – Review drawings and risk assessment; establish test sequence",
        "Step 3 – Isolate/disable outputs as needed; protect plant/interfaces",
        "Step 4 – Disconnect sensitive electronics per manufacturer prior to IR tests (use link plugs/terminators if specified)",
      ]},
      { heading: "Insulation Resistance (IR) Procedure", points: [
        "Step 1 – Set IR tester to 250 V DC for SELV fire alarm circuits unless manufacturer specifies otherwise",
        "Step 2 – Test core-to-core and each core-to-earth; record MΩ values and test locations",
        "Step 3 – Acceptance: per manufacturer/BS 7671 guidance (commonly ≥1 MΩ); investigate any lower readings",
        "Step 4 – If low IR is found, apply split‑half to locate the section; repair/dry and retest until values are acceptable",
      ]},
      { heading: "Continuity & Polarity Procedure", points: [
        "Step 1 – Reconnect as required; link conductors end‑to‑end and measure resistance to confirm loop integrity",
        "Step 2 – Calculate expected ohms from length and conductor CSA; compare to measured values",
        "Step 3 – Confirm correct polarity at devices and terminations; no opens, crosses, or shorts",
      ]},
      { heading: "Address Scan & Reconciliation", points: [
        "Step 1 – Reconnect loop to panel (use loop emulator where required); run address/device scan",
        "Step 2 – Export device list; reconcile addresses, types and locations to the device schedule/drawings",
        "Step 3 – Rectify duplicates, missing addresses or wrong device types and rescan",
      ]},
      { heading: "Isolator Functional Verification", points: [
        "Step 1 – Introduce a controlled short downstream of an isolator; confirm isolator opens and the remainder of loop stays healthy",
        "Step 2 – Clear the fault and confirm automatic restoration; record location and serial where available",
      ]},
      { heading: "Voltage Drop Measurement", points: [
        "Step 1 – Apply representative alarm load (e.g., active sounders/VADs per profile)",
        "Step 2 – Measure voltage at the furthest device in standby and in alarm; compare to manufacturer limits",
        "Step 3 – If volt drop is excessive, increase conductor size, reduce load, or re‑distribute devices",
      ]},
      { heading: "Acceptance Criteria (Evidence‑based)", points: [
        "IR values meet manufacturer/BS 7671 criteria; no trending low sections",
        "Continuity within calculated tolerance; polarity correct across all devices",
        "Device inventory matches schedule; no duplicates or wrong types",
        "Loop current within CIE channel limits; voltage drop within specification",
        "Isolators proven to open on downstream short and auto‑restore",
      ]},
      { heading: "Records & Handover Pack", points: [
        "Loop test sheets: instrument serials/calibration dates, measured results and locations",
        "Annotated drawings/photos of defects and remedials with references",
        "Retest evidence and engineer signatures; file with commissioning pack",
      ]},
    ]}
    summary={[
      "Protect sensitive devices during IR testing; follow manufacturer-specific methods and BS 7671.",
      "Verify continuity, polarity and address inventory then reconcile to the schedule before commissioning.",
      "Use segmentation and polling diagnostics to locate faults; confirm loads and voltage drops are within limits.",
      "Maintain calibrated, traceable records with annotated drawings, photos and retest evidence.",
      "Define acceptance criteria in advance and apply consistently to pass/fail decisions.",
    ]}
    quiz={quiz}
    prev="/fire-alarm-module-5-section-2"
    next="/fire-alarm-module-5-section-4"
  />
);

export default FireAlarmModule5Section3;
