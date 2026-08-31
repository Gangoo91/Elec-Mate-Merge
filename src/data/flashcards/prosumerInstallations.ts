/**
 * Prosumer's Electrical Installations — Part 8, Chapter 82.
 *
 * A genuinely NEW chapter in BS 7671, and completely absent from the rest of
 * the library. Every home with PV and a battery is now a prosumer installation,
 * so this stops being theory very quickly.
 *
 * Grounded in `bs7671_facets`, edition 41c1f30d-4f1a-432f-9e2d-61b91290149f =
 * 2018+A4:2026. Two things settled by counting rather than trusting a single
 * facet, because both had a contradicting source in the corpus:
 *
 *  - **Part 8 is "Functional Requirements"** — 282 facets carry that title,
 *    ZERO carry "Product-related requirements", which is how one stray facet
 *    under Reg 536.5 described it.
 *  - **PEI = Prosumer's Electrical Installation.** One facet expands it as
 *    "Protected Electrical Installation". That is wrong — the Chapter 82 scope
 *    facet and Reg 110.1.2 both say prosumer.
 */
import { FlashcardData } from './types';

export const prosumerInstallations: FlashcardData[] = [
  // ── What it is ──────────────────────────────────────────────────────────
  {
    id: 'pei1',
    question: 'What does PEI stand for in BS 7671?',
    answer:
      'Prosumer’s Electrical Installation — a low voltage installation that both consumes and locally produces and/or stores energy. A house with PV and a battery is a PEI.',
    category: 'Green Technology',
    difficulty: 'easy',
  },
  {
    id: 'pei2',
    question: 'Which Part and Chapter of BS 7671 covers prosumer installations?',
    answer:
      'Part 8 — Functional Requirements, Chapter 82. It is a new chapter giving requirements, measures and recommendations for the design, erection and verification of PEIs.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei3',
    question: 'What kinds of installation does Chapter 82 apply to?',
    answer:
      'All types of low voltage electrical installation that include local production and/or storage of energy — not just large or commercial ones.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei4',
    question: 'Are prosumer installations outside a building still in scope?',
    answer:
      'Yes. Reg 110.1.2 explicitly brings prosumer’s low voltage electrical installations within scope, including those located external to buildings.',
    category: 'Green Technology',
    difficulty: 'hard',
  },

  // ── Operating modes ─────────────────────────────────────────────────────
  {
    id: 'pei5',
    question: 'Name the two main operating modes of a PEI.',
    answer:
      'Connected mode — often direct feeding, where it remains connected to the public distribution network — and island mode, where it is intentionally operating electrically isolated from the DNO.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei6',
    question: 'Can a PEI switch between operating modes freely?',
    answer:
      'Yes — it may change mode at any time and return to the original mode at any time. For example direct feeding → island → direct feeding. The installation must cope with that.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei7',
    question: 'Where is "intended operating mode" defined?',
    answer:
      'Regulation 824.2. The intended modes for a given PEI must be determined and documented against that definition.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei8',
    question: 'In which operating modes must protection of persons and property be provided?',
    answer:
      'All of them. It is a general duty on the design — protection cannot be valid in one mode and absent in another.',
    category: 'Green Technology',
    difficulty: 'medium',
  },

  // ── Earthing per mode ───────────────────────────────────────────────────
  {
    id: 'pei9',
    question: 'In connected mode without galvanic separation, what earthing must the PEI use?',
    answer:
      'The same system earthing as the public distribution network. With no galvanic isolation it is electrically part of that network, so it cannot adopt a different arrangement.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei10',
    question: 'In island mode, may the PEI earthing differ from the public network’s?',
    answer:
      'Yes — being disconnected from the public distribution network, the PEI’s system earthing may differ, and the designer may adopt a different arrangement for island operation.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei11',
    question: 'Why is a PEI whose earthing changes between modes a design problem?',
    answer:
      'Because if ADS is the protective measure, the designer must account for the impact of the different earthing arrangements on ADS actually operating — a loop impedance valid in one mode may not be in the other.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei12',
    question: 'Which regulation must a PEI meet where ADS is the protective measure in island mode?',
    answer:
      'Regulation 551.4. Island operation with ADS is not assumed to work — it has to meet those specific requirements.',
    category: 'Green Technology',
    difficulty: 'hard',
  },

  // ── Neutral and switching ───────────────────────────────────────────────
  {
    id: 'pei13',
    question: 'When a PEI goes into island mode, what happens to the DNO connection?',
    answer:
      'All live conductors are disconnected from the DNO supply — every phase conductor and any switched live that would form a supply path back to the network.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei14',
    question: 'What is the timing rule for the neutral switch device in island mode (Reg 826.1.1.2.2)?',
    answer:
      'It must connect the PEI’s neutral and earth WITHOUT overlapping with any switching of the DNO neutral. The two actions must not happen at the same time.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei15',
    question: 'Why does the non-overlap rule for neutral switching matter so much?',
    answer:
      'Overlapping could create parallel neutral paths or transient conditions that defeat RCD operation — you would lose the protection exactly during the transfer.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei16',
    question: 'Describe a compliant transfer sequence into island mode.',
    answer:
      'The device first opens all live conductors to the DNO; then, after confirmation that the DNO supply is lost, the neutral switch device connects the PEI neutral to the PEI earth. Sequenced, never simultaneous.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei17',
    question: 'What must a switching device that disconnects a PEI from the public network be?',
    answer:
      'Suitable for isolation, as defined in Chapter 53 — its selection and installation must meet the Chapter 53 requirements for isolation devices.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei18',
    question: 'What should you test after making the neutral-to-earth connection in island mode?',
    answer:
      'RCD operation — test with an RCD tester to confirm correct operation and no nuisance tripping in that mode. The earthing has changed, so the protection has to be re-proved.',
    category: 'Green Technology',
    difficulty: 'hard',
  },

  // ── Verification and paperwork ──────────────────────────────────────────
  {
    id: 'pei19',
    question: 'How must Chapter 82 items be recorded during inspection?',
    answer:
      'The inspector lists all inspection items relating to Chapter 82 and records the results of those particular inspections SEPARATELY (Reg 559.41) — not folded into the general schedule.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei20',
    question: 'What evidence demonstrates the neutral switching sequence is compliant?',
    answer:
      'Sequence diagrams, control logic, or test logs showing the neutral switch connects PEI neutral and earth without overlapping the DNO neutral switching. A claim is not enough.',
    category: 'Green Technology',
    difficulty: 'hard',
  },

  // ── Joining it up ───────────────────────────────────────────────────────
  {
    id: 'pei21',
    question: 'Which A4:2026 EV section now has to consider prosumer installations?',
    answer:
      'Section 722. EV charging must be designed taking account of the prosumer’s electrical installation — the charger sits alongside generation and storage, not in isolation.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei22',
    question: 'Which regulation introduced by A3:2024 covers switching devices in prosumer installations?',
    answer:
      'Regulation 530.3.201 — requirements for bidirectional and unidirectional switching and isolation devices. It carries forward into A4:2026.',
    category: 'Green Technology',
    difficulty: 'hard',
  },
  {
    id: 'pei23',
    question: 'What is a bidirectional protective device?',
    answer:
      'One designed to operate correctly whichever way round the supply connections are made — no specific "line/load" or "in/out" orientation is required for it to work properly.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
  {
    id: 'pei24',
    question: 'Why does energy flowing both ways change how you select devices?',
    answer:
      'Because a device assuming a fixed supply direction may not clear a fault fed from the battery or inverter side. In a prosumer installation current can arrive from either direction, so orientation-dependent devices are not safe to assume.',
    category: 'Green Technology',
    difficulty: 'medium',
  },
];
