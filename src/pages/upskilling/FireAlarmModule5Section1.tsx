import { Wrench } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'What is the primary UK standard governing fire alarm system installation practices?', options: ['BS 7671', 'BS 5839-1', 'BS EN 54-2', 'BS 5266-1'], correctAnswer: 1, explanation: 'BS 5839-1 covers design, installation, commissioning and maintenance of fire detection and fire alarm systems in non-domestic premises.' },
  { id: 2, question: 'When terminating MICC cables, what is essential to maintain IP rating at entry points?', options: ['Heatshrink over conductor', 'Correct pot and seal with approved gland kit', 'Twisting conductors together', 'Filling with silicone'], correctAnswer: 1, explanation: 'Mineral insulated copper cable requires correctly fitted pot, seal, and certified gland to maintain integrity and IP rating.' },
  { id: 3, question: 'Gland selection should primarily be based on:', options: ['Colour of cable sheath', 'Enclosure colour', 'Cable construction and entry type (thread/IP/armour)', 'Proximity to detectors'], correctAnswer: 2, explanation: 'Select glands based on cable type (e.g., LSF, SWA, MICC), thread type, enclosure material, and required IP/ingress protection.' },
  { id: 4, question: 'What must be fitted on steel wire armoured (SWA) terminations to ensure continuity?', options: ['Shroud only', 'Banjo or earth tag with fly-lead', 'Plastic spacer', 'Heatshrink label'], correctAnswer: 1, explanation: 'A banjo/earth tag and fly-lead ensure the armour is bonded to earth in compliance with BS 7671.' },
  { id: 5, question: 'For detector bases, terminations should:', options: ['Double up two conductors in one terminal', 'Maintain loop polarity and segregation of I/O where applicable', 'Be left untightened until final fix', 'Use random colours'], correctAnswer: 1, explanation: 'Maintain correct polarity and segregate communications, power, and I/O per manufacturer’s instructions.' },
  { id: 6, question: 'IP66 external manual call point requires what at cable entry?', options: ['Open grommet', 'Unsealed hole', 'Appropriate IP-rated gland with drip loop', 'No gland if vertical'], correctAnswer: 2, explanation: 'An IP-rated gland and drip loop reduce water ingress risk.' },
  { id: 7, question: 'LSF/LSZH cable sheath preparation should:', options: ['Be burnt off', 'Avoid nicking conductors and preserve twist as specified', 'Remove all insulation back to copper', 'Use knife against conductor'], correctAnswer: 1, explanation: 'Avoid damage to conductors; use proper stripping tools and methods.' },
  { id: 8, question: 'What documentation should be referenced before finalising gland types on a project?', options: ['Client brochure', 'Manufacturer social media', 'Specification, drawings, and schedule of materials', 'Old job photos'], correctAnswer: 2, explanation: 'Use the contract specification, drawings, and BOM to select compliant materials.' },
  { id: 9, question: 'How should screened cable terminations be treated at devices?', options: ['Always cut back screen', 'Bond screen both ends regardless', 'Follow manufacturer and system design (e.g., drain at one end)', 'Insulate with PVC tape only'], correctAnswer: 2, explanation: 'Screen/drain wire termination depends on the system’s EMC design; often bonded at one end to prevent loops.' },
  { id: 10, question: 'What is best practice for labelling at terminations?', options: ['No labels needed', 'Handwritten pen on sheath', 'Heatshrink or ferrules with circuit/loop ID and destination', 'Random colours for cores'], correctAnswer: 2, explanation: 'Durable, legible labels matching drawings/supporting documentation are required.' }
];

const FireAlarmModule5Section1 = () => {
  return (
    <FireAlarmModule5SectionTemplate
      icon={Wrench}
      sectionNumber="1"
      title="Cable Termination and Gland Selection"
      description="Proper cable termination techniques and gland selection"
      badges={["BS 5839-1", "BS 7671"]}
      intro="This in-depth guide covers materials, preparation, stripping and dressing, SWA/MICC specifics, EMC/screen management, IP sealing, QA, and records aligned to BS 5839-1 and BS 7671."
      learnings={[
        "Select compliant glands by cable construction, thread, and IP rating",
        "Strip and terminate LSF/LSZH, SWA, and MICC without damaging conductors",
        "Maintain polarity, segregation and torque per manufacturer instructions",
        "Implement EMC strategy for screens/drain wires without creating earth loops",
        "Bond armour correctly and verify earth continuity to BS 7671",
        "Achieve weatherproof entries with drip loops and suitable sealing",
        "Apply durable, consistent labelling linked to drawings and schedules",
        "Capture photo evidence and update records for QA and handover",
        "Calculate and verify torque values; re-check after settling to avoid loosening",
        "Select corrosion-resistant materials and avoid dissimilar-metal corrosion outdoors",
      ]}
      blocks={[
        { heading: "Materials & Tools", points: [
          "Glands matched to cable (LSF/LSZH, SWA, MICC) and enclosure thread",
          "Earth tags/banjos, shrouds, IP washers, pot & seal kits for MICC",
          "Calibrated torque screwdriver, correct strippers, continuity tester",
        ]},
        { heading: "Preparation & Strip", points: [
          "Confirm specification and drawings; check environmental IP requirements",
          "Measure twice, cut once; avoid sheath damage and conductor nicks",
          "Dress conductors with adequate service loop without overcrowding",
        ]},
        { heading: "LSF/LSZH Terminations", points: [
          "Maintain polarity and segregate power/comms/I-O terminals",
          "Tighten to specified torque; tug-test each conductor",
          "Use grommets/glands; never pass through open knockouts",
        ]},
        { heading: "SWA Earthing & Bonding", points: [
          "Fit gland, earth tag/banjo and fly-lead; remove paint under tag",
          "Verify armour continuity end-to-end and to CPC",
          "Insulate and shroud to prevent moisture ingress and corrosion",
        ]},
        { heading: "MICC (Mineral) Technique", points: [
          "Strip, pot, seal and gland using approved kit and method statement",
          "Avoid moisture ingress; heat-dry if required before potting",
          "Form tails neatly; protect with sleeving and avoid sharp bends",
        ]},
        { heading: "EMC & Screening", points: [
          "Follow design: bond screen at one end unless specified otherwise",
          "Terminate drain wire cleanly; insulate unused screen ends",
          "Document screen strategy on as-builts for maintainers",
        ]},
        { heading: "External Entries & IP", points: [
          "Use IP-rated glands; create drip loop; avoid top entries outdoors",
          "Seal threads/washers per manufacturer to maintain IP rating",
          "Check enclosure breathers/pressure equalisation if fitted",
        ]},
        { heading: "Quality Assurance & Records", points: [
          "Photograph terminations and label positions for the record pack",
          "Complete termination checklist; sign and date",
          "Update device schedule/as-builts with gland types and locations",
        ]},
        { heading: "Worked Example: SWA to IP66 Enclosure", points: [
          "Select CW-type gland with correct thread and IP seal; fit earth tag",
          "Dress armour, fit gland, torque locknut; bond via fly-lead to earth bar",
          "Apply shroud; verify continuity and record measurement on sheet",
        ]},
        { heading: "Worked Example: MICC to Manual Call Point", points: [
          "Cut square; strip sheath; fit and heat-dry pot; add seal and gland",
          "Form copper tails with sleeving; maintain polarity at MCP terminals",
          "Waterproof entry with IP washer; photo record and sign off",
        ]},
        { heading: "Common Faults & Remedies", points: [
          "Loose strands or nicks: re-strip and re-terminate; apply correct torque",
          "Incorrect gland type: replace with certified, IP-rated gland per cable",
          "Poor earthing on SWA: clean paint, refit banjo/tag, retest continuity",
        ]},
        { heading: "On-site Termination Checklist", points: [
          "Correct gland type, thread and sealing method confirmed",
          "Polarity, segregation, torque and tug-test completed",
          "Photos, labels and records updated; QA signature captured",
        ]},
      ]}
      summary={[
        "Select certified glands to match cable construction, entry type and IP requirement; verify bonding to BS 7671.",
        "Prepare, strip and terminate LSF/LSZH, SWA and MICC using manufacturer tools and torques; tug-test every core.",
        "Implement an EMC plan for screens/drain wires to prevent earth loops and intermittent faults.",
        "Maintain ingress protection with correct washers, sealing compounds and drip loops, especially externally.",
        "Label consistently, capture photos and update as-builts and schedules for commissioning and maintenance.",
        "Use worked examples and checklists on site to drive consistent, compliant outcomes.",
      ]}
      quiz={quiz}
      prev={undefined}
      next="/fire-alarm-module-5-section-2"
    />
  );
};

export default FireAlarmModule5Section1;
