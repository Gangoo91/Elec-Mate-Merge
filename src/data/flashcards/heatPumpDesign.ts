/**
 * Heat pump design — MCS MIS 3005-D.
 *
 * Source: `~/Desktop/hav/MCS-MIS3005-D-2025-Issue2.0-HeatPumpDesign.pdf`
 * (Issue 2.0, 05/12/2025), read from the PDF text. Pairs with the Renewable
 * Energy course in the Study Centre.
 *
 * ⚠️ MCS documents are copyright The MCS Charitable Foundation and are
 * revised regularly — this set is written against **Issue 2.0**. Check the
 * issue number before relying on a figure, because MCS changes thresholds
 * between issues more often than BSI changes BS 7671.
 *
 * ⚠️ MIS 3005-**D** is the DESIGN standard. Installation is MIS 3005-I, a
 * separate document also held in that folder. Cards say design where the
 * distinction matters.
 */
import { FlashcardData } from './types';

export const heatPumpDesign: FlashcardData[] = [
  // ── Scope ───────────────────────────────────────────────────────────────
  {
    id: 'hp1',
    question: 'What thermal output defines a "microgeneration" heat pump under MCS?',
    answer:
      'Not exceeding 45 kWth, as defined by the MCS Product Certification scheme document MCS 007.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp2',
    question: 'Can you use multiple heat pumps on one installation, and what are the limits?',
    answer:
      'Yes — a total design heat load not exceeding 70 kWth (determined per BS EN 12831-1:2017), provided no SINGLE heat pump exceeds 45 kWth.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp3',
    question: 'Are reversible heat pumps that also cool within scope?',
    answer:
      'Yes, they are included — but they shall be designed and optimised for HEATING, not for cooling.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp4',
    question: 'What may a hot water heat pump system installed to this standard be used for?',
    answer:
      'The provision of domestic hot water only.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp5',
    question: 'Which standard governs the heat load calculation?',
    answer:
      'BS EN 12831-1:2017. Heat load calculations must comply with it, and the 70 kWth multiple-heat-pump limit is determined in accordance with it.',
    category: 'Green Technology',
    difficulty: 'medium',
  },

  // ── Sizing ──────────────────────────────────────────────────────────────
  {
    id: 'hp6',
    question: 'What proportion of the calculated heat load must the heat pump itself provide?',
    answer:
      'A minimum of 55% of the building’s calculated heat load. The heat pump is not allowed to be a token contributor propped up by immersion heating.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp7',
    question: 'What must the COMBINED output of all heat sources be?',
    answer:
      'Not less than 100% of the calculated heat load. The heat pump covers at least 55% of that; the rest can come from other sources.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp8',
    question: 'At what flow temperature must the heat pump’s power output be rated for selection?',
    answer:
      '55 °C, taken from the MCS database, at the design external temperature for the location — EVEN IF the emitter design is based on a different flow temperature.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp9',
    question: 'Why does the 55 °C rating rule catch people out?',
    answer:
      'Because a designer sizing emitters at 45 °C might expect to rate the pump at 45 °C too. The standard fixes the SELECTION rating at 55 °C regardless, so the comparison between products is like-for-like.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp10',
    question: 'What evidence should support the heat pump selection?',
    answer:
      'Performance data from both the heat pump manufacturer AND the emitter system designer.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp11',
    question: 'What temperature difference is used in the heat load calculation?',
    answer:
      'The internal design room temperature minus the design external air temperature, taken from the standard’s tables.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp12',
    question: 'Where do the UK outside design temperatures come from?',
    answer:
      'CIBSE Guide A, Table 2.5 — reproduced in the standard, which also points to guidance on how to adapt and use that data.',
    category: 'Green Technology',
    difficulty: 'hard',
  },

  // ── Flow temperature ────────────────────────────────────────────────────
  {
    id: 'hp13',
    question: 'What is the position on High Temperature Heat Pumps (HTHPs)?',
    answer:
      'Their selection should be AVOIDED unless the application genuinely requires a flow temperature higher than 55 °C.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp14',
    question: 'You propose a design at 60 °C flow. What else must you provide?',
    answer:
      'An alternative design using a flow temperature of 55 °C or lower, with the differences in efficiency and energy consumption explained to the customer so they can choose.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp15',
    question: 'What legitimate reasons might prevent using larger emitters and lower flow temps?',
    answer:
      'Listed buildings or other design limitations — the standard acknowledges these explicitly rather than pretending bigger radiators are always possible.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp16',
    question: 'Why does a lower flow temperature matter so much for a heat pump?',
    answer:
      'Efficiency. The lower the flow temperature the heat pump has to achieve, the better it performs — which is why the standard pushes designs towards 55 °C or below and makes you justify going higher.',
    category: 'Green Technology',
    difficulty: 'medium',
  },

  // ── Controls and specials ───────────────────────────────────────────────
  {
    id: 'hp17',
    question: 'What must the control philosophy be capable of?',
    answer:
      'Prioritising utilisation of the heat pump — so the system leans on the heat pump rather than defaulting to the supplementary heat source.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp18',
    question: 'What is special about calculating heat loss through a solid floor in contact with the ground?',
    answer:
      'It is treated differently from other elements, with its own rule in the standard — as is a suspended floor, where the temperature assumption differs again.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'hp19',
    question: 'Which MCS document is the DESIGN standard, and which is installation?',
    answer:
      'MIS 3005-D is design; MIS 3005-I is installation. They are separate documents and it matters which one you are quoting.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'hp20',
    question: 'Why should you always check the MCS issue number?',
    answer:
      'Because MCS revises its standards frequently and thresholds move between issues. This set is written against MIS 3005-D Issue 2.0 (05/12/2025) — verify before quoting a figure.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
];
