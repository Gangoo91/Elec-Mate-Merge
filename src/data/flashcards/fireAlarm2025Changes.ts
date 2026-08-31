/**
 * BS 5839-1:2025 — what changed for fire detection and alarm systems.
 *
 * Primary source: `~/Desktop/hav/FIA-Guide-BS5839-1-2025-changes.pdf` — the
 * Fire Industry Association's free, authoritative guide (Version 1, June 2025),
 * read from the PDF text. Supported by the folder's summary note.
 *
 * ⚠️ The standard itself is BSI copyright and NOT held. These cards therefore
 * teach the CHANGES and their reasoning as described by the FIA, and quote
 * clause numbers only where the FIA guide itself quotes them. Do not add
 * clause-level detail without the licensed standard.
 *
 * In force 30 April 2025, superseding BS 5839-1:2017. Non-domestic premises;
 * domestic is BS 5839-6.
 */
import { FlashcardData } from './types';

export const fireAlarm2025Changes: FlashcardData[] = [
  {
    id: 'fa25_1',
    question: 'When did BS 5839-1:2025 come into force, and what did it supersede?',
    answer:
      'In force 30 April 2025, superseding BS 5839-1:2017. It covers fire detection and alarm systems in NON-domestic premises — domestic is BS 5839-6.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'fa25_2',
    question: 'What is the headline change to heat detectors in BS 5839-1:2025?',
    answer:
      'Heat detectors are no longer permitted in rooms where people sleep. Category L2 now defines sleeping rooms as high-risk rooms requiring protection, so smoke or multi-sensor detection is needed instead.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'fa25_3',
    question: 'Does the heat detector ban in sleeping rooms apply to L3 systems too?',
    answer:
      'Yes — heat detectors should not be used in rooms where people sleep in a Category L3 system either, even though the objective of L3 is not to protect people in that room.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_4',
    question: 'What changed for stairway lobbies?',
    answer:
      'They are now designated as areas requiring automatic detection. Previously they could be excluded as low risk.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'fa25_5',
    question: 'Which annex covers selection and application of fire detectors in the 2025 edition?',
    answer:
      'Annex D — it was Annex E in the previous edition. More emphasis is placed on it now that heat detectors are excluded from sleeping rooms.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_6',
    question: 'What must the designer record when multi-sensor detectors have several response modes?',
    answer:
      'The selection of detector type and its configuration. That must be made available to the commissioning technician and recorded in the system’s operating and maintenance manual.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_7',
    question: 'How did the wording change for L3 systems and ceiling voids?',
    answer:
      'The 2017 requirement for "fire-resisting construction" separating the void from the escape route is replaced by a practical test — it should simply be of solid construction with no holes, since the aim is to stop smoke reaching the escape route.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_8',
    question: 'What changed for Category L4 systems and flue-like structures?',
    answer:
      'A detector is now recommended at the TOP of the flue-like structure. Unlike L1, L2, L3 and P1, L4 does not recommend a detector within approximately 1.5 m of the penetration on every floor.',
    category: 'Safety',
    difficulty: 'hard',
  },

  // ── Variations ──────────────────────────────────────────────────────────
  {
    id: 'fa25_9',
    question: 'BS 5839-1 is a code of practice — so are all variations still acceptable in 2025?',
    answer:
      'No. Two departures are now regarded as so detrimental to life safety that they should NOT be treated as acceptable variations. Previously anything could be an agreed variation.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'fa25_10',
    question: 'Which two departures are no longer acceptable variations?',
    answer:
      'Absence of a zone plan where there is more than one zone on any storey (particularly where people sleep); and absence of a facility to transmit alarm signals to an ARC in supported housing needing a Grade A system, or in a residential care home.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_11',
    question: 'Which agreed variations must now be recorded in the system logbook?',
    answer:
      'All of them. The 2017 edition only recommended recording "major" variations without defining major — now every agreed variation is recorded, and all need justification.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'fa25_12',
    question: 'What is the status of zone charts under BS 5839-1:2025?',
    answer:
      'Effectively mandatory — an up-to-date zone plan is expected as part of the installation, and its absence in a multi-zone building is no longer an acceptable variation.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Battery, cable, false alarms ────────────────────────────────────────
  {
    id: 'fa25_13',
    question: 'How did the standby battery calculation change in 2025?',
    answer:
      'It now uses T2 — the total battery alarm period in hours — replacing the previous "divide by 2" method. The RESULT of the calculation is unaffected; only the method is expressed differently.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_14',
    question: 'Trick question: does the new T2 battery method change the answer you get?',
    answer:
      'No. The FIA guide is explicit that the result of the calculation is not affected by the change — it is a restatement of the method, not a different capacity.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_15',
    question: 'What changed about fire alarm cable colour?',
    answer:
      'Cable colour is standardised — fire alarm and LV mains supply cables should be a single common colour, removing the previous confusion of mixed conventions.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'fa25_16',
    question: 'What new annex covers false alarm rate, and what does it provide?',
    answer:
      'A new Annex F, which gives the calculation for false alarm rate. It puts a defined method behind what was previously judged loosely.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_17',
    question: 'What is now recommended for sprinkler heads used as heat detectors?',
    answer:
      'Their use remains acknowledged, with an added recommendation that they be red in colour and checked for correct operation at the annual service visit.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'fa25_18',
    question: 'Why were the 2025 changes made?',
    answer:
      'The standard was tightened in the wake of lessons from recent fatal fires — which is why the changes concentrate on sleeping risk, zone plans and alarm transmission.',
    category: 'Safety',
    difficulty: 'medium',
  },
];
