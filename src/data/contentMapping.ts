/**
 * contentMapping.ts
 *
 * Cross-feature relationship map connecting flashcard sets
 * to quiz categories and study modules.
 */

export interface ContentRelation {
  flashcardSetId: string;
  quizCategory: string;
  studyModule?: string;
  relatedTopics: string[];
}

export const RELATED_CONTENT: ContentRelation[] = [
  {
    flashcardSetId: 'cable-colors',
    quizCategory: 'Wiring',
    studyModule: 'unit-201',
    relatedTopics: ['Cable identification', 'Colour coding', 'BS 7671 harmonised colours'],
  },
  {
    flashcardSetId: 'bs7671-regulations',
    quizCategory: 'Regulations',
    studyModule: 'unit-202',
    relatedTopics: ['18th Edition', 'Wiring regulations', 'Part P'],
  },
  {
    flashcardSetId: 'eicr-codes',
    quizCategory: 'Testing',
    studyModule: 'unit-203',
    relatedTopics: ['EICR coding', 'Condition reports', 'C1/C2/C3/FI codes'],
  },
  {
    flashcardSetId: 'safe-isolation',
    quizCategory: 'Safety',
    studyModule: 'unit-201',
    relatedTopics: ['Isolation procedures', 'Lock-off', 'GS38'],
  },
  {
    flashcardSetId: 'test-instruments',
    quizCategory: 'Testing',
    studyModule: 'unit-203',
    relatedTopics: ['MFT operation', 'Test equipment', 'Calibration'],
  },
  {
    flashcardSetId: 'fault-finding',
    quizCategory: 'Troubleshooting',
    studyModule: 'unit-203',
    relatedTopics: ['Fault diagnosis', 'Logical testing', 'Common faults'],
  },
  {
    flashcardSetId: 'earthing-bonding',
    quizCategory: 'Design',
    studyModule: 'unit-202',
    relatedTopics: ['Earthing systems', 'Bonding conductors', 'TN-S/TN-C-S/TT'],
  },
  {
    flashcardSetId: 'circuit-protection',
    quizCategory: 'Design',
    studyModule: 'unit-202',
    relatedTopics: ['MCBs', 'RCDs', 'Fuses', 'Discrimination'],
  },
  {
    flashcardSetId: 'wiring-systems',
    quizCategory: 'Wiring',
    studyModule: 'unit-201',
    relatedTopics: ['Cable types', 'Containment', 'Installation methods'],
  },
  {
    flashcardSetId: 'electrical-science',
    quizCategory: 'Theory',
    studyModule: 'unit-202',
    relatedTopics: ['Ohm\'s law', 'Power formulae', 'AC theory'],
  },
  {
    flashcardSetId: 'first-second-fix',
    quizCategory: 'Wiring',
    studyModule: 'unit-201',
    relatedTopics: ['First fix wiring', 'Second fix termination', 'Site sequence'],
  },
  {
    flashcardSetId: 'environmental-tech',
    quizCategory: 'Design',
    studyModule: 'unit-204',
    relatedTopics: ['Solar PV', 'Heat pumps', 'EV charging', 'Energy efficiency'],
  },
];

/** Look up related content for a flashcard set */
export function getRelatedContent(flashcardSetId: string): ContentRelation | undefined {
  return RELATED_CONTENT.find((r) => r.flashcardSetId === flashcardSetId);
}

/** Look up flashcard sets related to a quiz category */
export function getFlashcardsForCategory(quizCategory: string): ContentRelation[] {
  return RELATED_CONTENT.filter((r) => r.quizCategory === quizCategory);
}
