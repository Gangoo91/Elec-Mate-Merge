import { Tag } from 'lucide-react';
import FireAlarmModule5SectionTemplate from './FireAlarmModule5SectionTemplate';
import type { QuizQuestion } from '@/types/quiz';

const quiz: QuizQuestion[] = [
  { id: 1, question: 'What standard primarily governs fire alarm device mounting heights and siting?', options: ['BS 7671', 'BS 5839-1', 'BS EN 54-4', 'BS 5306'], correctAnswer: 1, explanation: 'BS 5839-1 details siting for detectors, MCPs, sounders, and VADs.' },
  { id: 2, question: 'Manual call points (MCPs) should typically be mounted at what height to centre?', options: ['0.8–1.2 m', '1.4 m', '3.0 m', '500 mm'], correctAnswer: 1, explanation: 'BS 5839-1 recommends MCP centre at 1.4 m above finished floor level unless otherwise specified for accessibility.' },
  { id: 3, question: 'Labelling must:', options: ['Be optional', 'Be durable, legible, and match as-built documentation', 'Use pencil', 'Be hidden'], correctAnswer: 1, explanation: 'Durable labelling is essential for maintenance, traceability, and compliance.' },
  { id: 4, question: 'Detectors must be mounted to avoid:', options: ['Air stratification and obstructions where applicable', 'Level surfaces', 'Any ceilings', 'Power wiring'], correctAnswer: 0, explanation: 'Follow spacing/obstruction rules; avoid dead air spaces and ensure coverage per BS 5839-1.' },
  { id: 5, question: 'VADs require consideration of:', options: ['Paint colour only', 'Coverage category, lens orientation, and lux at floor plane', 'Battery size only', 'Loop address'], correctAnswer: 1, explanation: 'Visual alarm devices must meet coverage (CIE category), candela/lux, and orientation requirements.' },
  { id: 6, question: 'Labels on devices should include:', options: ['Nothing', 'Circuit/loop number and unique device ID', 'Installer’s name only', 'Date only'], correctAnswer: 1, explanation: 'Include loop/circuit and unique device ID to cross-reference drawings and cause & effect.' },
  { id: 7, question: 'Sounders must be sited to achieve:', options: ['As loud as possible', 'Required dB(A) levels above background with doors closed', 'Only visual coverage', 'No consideration of background noise'], correctAnswer: 1, explanation: 'Meet dB(A) targets per BS 5839-1 considering background noise and building usage.' },
  { id: 8, question: 'Fixing devices should use:', options: ['Any screws available', 'Fixings suitable for substrate and load with fire-rated anchors where required', 'Glue only', 'Timber screws for all'], correctAnswer: 1, explanation: 'Use appropriate fixings for structure type and rating.' },
  { id: 9, question: 'What document should be updated after device installation?', options: ['Marketing brochure', 'As-built drawings and device schedule', 'None', 'Site diary only'], correctAnswer: 1, explanation: 'Maintain accurate as-builts and device schedules for commissioning and maintenance.' },
  { id: 10, question: 'What is typical MCP siting distance from final exits?', options: ['>10 m', '<45 m travel distance between call points', 'No requirement', 'Exactly 1 m from floor'], correctAnswer: 1, explanation: 'Call points should be located on escape routes and near exits with maximum travel distances per BS 5839-1.' }
];

const FireAlarmModule5Section2 = () => (
  <FireAlarmModule5SectionTemplate
    icon={Tag}
    sectionNumber="2"
    title="Device Mounting and Labelling"
    description="Device installation and identification requirements"
    badges={["BS 5839-1", "Accessibility"]}
    intro="This section expands on siting and identification of detectors, MCPs, sounders and VADs, with substrate-specific fixings, accessibility, and robust labelling tied to records and maintenance."
    learnings={[
      "Apply BS 5839-1 siting principles for all device types",
      "Balance accessibility and compliance for MCPs and interfaces",
      "Select fixings for substrate, loading and fire rating",
      "Implement a consistent labelling scheme tied to drawings and C&E",
      "Verify acoustic and visual coverage against design intent",
      "Maintain tidy installation and future service access",
      "Consider inclusive design, reach ranges and DDA where applicable",
      "Verify VAD category, lens orientation, synchronisation and coverage",
      "Record device IDs with photos and update schedules promptly",
      "Confirm colour-contrast and signage for MCPs on escape routes",
      "Ensure fire-stopping of penetrations where required by design",
      "Record variations with justification and client approval",
    ]}
    blocks={[
      { heading: "General Siting Principles", points: [
        "Install per drawings and approved device schedule",
        "Avoid obstructions, dead air spaces and local airflow influences",
        "Maintain service access and avoid aesthetic clashes where practicable",
      ]},
      { heading: "Manual Call Points (MCPs)", points: [
        "Mount at appropriate height; ensure routes/exits coverage",
        "Provide protective covers where risk of accidental operation exists",
        "Label MCP ID and zone clearly and durably",
      ]},
      { heading: "Detectors", points: [
        "Follow manufacturer spacing and location guidance for the category",
        "Consider beams, high-level features, and environmental effects",
        "Use bases/adaptors as required; ensure correct orientation",
      ]},
      { heading: "Sounders & VADs", points: [
        "Site to achieve dB(A) targets above background with doors closed",
        "Orient VAD lenses correctly and confirm category/coverage",
        "Co-ordinate with acoustic/visual design verification tests",
      ]},
      { heading: "Fixings & Substrates", points: [
        "Use anchors appropriate to concrete, masonry, plasterboard or steel",
        "Avoid over-tightening; use fire-rated fixings where specified",
        "Seal penetrations where fire-stopping is required by design",
      ]},
      { heading: "Labelling & Records", points: [
        "Apply loop/circuit and unique device ID using durable media",
        "Update schedules and as-builts immediately after installation",
        "Photograph key devices and labels for the handover pack",
      ]},
      { heading: "Worked Examples", points: [
        "MCP at final exit: 1.4 m AFFL centre, within travel distance limits",
        "Open-plan VAD: confirm lux/candela and lens orientation to coverage",
        "Detector near beams: adjust spacing to avoid obstructions",
      ]},
      { heading: "Common Snags & Fixes", points: [
        "Incorrect height or reach: re-fix to correct range and re-label",
        "Loose/unsuitable fixings: replace with substrate-rated anchors",
        "Labels missing or smudged: reissue durable labels and photo-log",
      ]},
      { heading: "On-site Mounting & Labelling Checklist", points: [
        "Height/spacing checked; access maintained; surface integrity",
        "dB(A)/VAD coverage verified against design where practicable",
        "Device ID applied; schedule and photo updated; QA signature",
      ]},
      { heading: "Coordination & Aesthetics", points: [
        "Co-ordinate with ceilings/lighting to minimise visual impact",
        "Use back boxes/plates to correct surface irregularities",
        "Maintain consistent alignment across corridors and open areas",
      ]},
      { heading: "Regulatory References", points: [
        "BS 5839-1: siting, sound pressure levels, VAD coverage",
        "BS 7671: fixings, penetrations and electrical safety",
        "Equality Act/DDA: accessibility considerations for MCPs/VADs",
      ]},
      { heading: "FAQs", points: [
        "How close to a door can a detector be? Follow manufacturer and BS 5839-1 guidance, avoiding dead air spaces",
        "Do VADs need synchronisation? Yes where specified to avoid photosensitive risk and improve perception",
        "When to use protective MCP covers? Where accidental activation is likely or specified",
      ]},
      { heading: "Glossary", points: [
        "AFFL: Above Finished Floor Level",
        "VAD: Visual Alarm Device",
        "C&E: Cause and Effect logic implemented in the CIE",
      ]},
    ]}
    summary={[
      "Follow BS 5839-1 siting for detectors, MCPs, sounders and VADs with accessibility in mind.",
      "Achieve required acoustic/visual performance; verify lens orientation and synchronisation for VADs.",
      "Use fixings appropriate to the substrate and any fire rating; preserve service access and finish quality.",
      "Apply durable IDs tied to loop/circuit numbers and update schedules with photos the same day.",
      "Use worked examples, snag guidance and a checklist to deliver consistent, compliant installations.",
      "Document variations and fire-stopping; confirm signage and visibility of MCPs on escape routes.",
    ]}
    quiz={quiz}
    prev="/fire-alarm-module-5-section-1"
    next="/fire-alarm-module-5-section-3"
  />
);

export default FireAlarmModule5Section2;
