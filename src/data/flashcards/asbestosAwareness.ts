/**
 * Asbestos awareness for electricians.
 *
 * Source: `~/Desktop/hav/HSE-HSG264-Asbestos-survey-guide.pdf` (HSE, free,
 * Crown copyright), read from the PDF text, together with the duty-to-manage
 * material it sets out from CAR 2012.
 *
 * Why it belongs in this library: electricians drill, chase and lift more
 * ceiling tiles than almost any other trade, and the duty to manage sits with
 * the dutyholder — but the person who disturbs the material is the one who
 * breathes it. The Study Centre has an asbestos course; this is the recall
 * layer for it.
 *
 * ⚠️ Awareness only. Nothing here qualifies anyone to work with, sample or
 * remove ACMs — HSG264 is a SURVEY guide, and licensed work is a separate
 * regime entirely.
 */
import { FlashcardData } from './types';

export const asbestosAwareness: FlashcardData[] = [
  // ── The law ─────────────────────────────────────────────────────────────
  {
    id: 'asb1',
    question: 'Which regulation contains the explicit "duty to manage" asbestos?',
    answer:
      'Regulation 4 of the Control of Asbestos Regulations 2012 (CAR 2012). It places a duty on owners and occupiers of NON-domestic premises who have maintenance and repair responsibilities.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb2',
    question: 'What two sets of regulations govern asbestos, and how do they differ?',
    answer:
      'REACH prohibits the importation, supply and use of asbestos. CAR 2012 covers WORK with asbestos and the licensing of asbestos-removal activities.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb3',
    question: 'How is asbestos classified as a health hazard?',
    answer:
      'As a category 1 human carcinogen. There is no argument to be had about whether exposure matters.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'asb4',
    question: 'What must a dutyholder do about materials that MIGHT contain asbestos?',
    answer:
      'Take reasonable steps to determine their location, and PRESUME materials contain asbestos unless there are good reasons not to. The presumption runs in favour of safety.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb5',
    question: 'What must the dutyholder produce from the asbestos risk assessment?',
    answer:
      'A management plan detailing and recording what actions will be taken to manage and reduce the risks — plus a written record of the location of the ACMs.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Domestic vs non-domestic ────────────────────────────────────────────
  {
    id: 'asb6',
    question: 'Does the duty to manage apply to domestic premises?',
    answer:
      'Not normally. But it DOES apply to the common parts of premises, including housing developments and blocks of flats.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb7',
    question: 'Give examples of "common parts" where the duty to manage applies.',
    answer:
      'Foyers, corridors, lifts and lift shafts, staircases, boilerhouses, vertical risers, gardens, yards and outhouses — exactly the places cables and containment tend to run.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb8',
    question: 'Do shared kitchens and bathrooms in an HMO count as common parts?',
    answer:
      'No. The requirements do not apply to rooms within a private residence shared by more than one household — shared bathrooms and kitchens, or communal lounges in sheltered accommodation.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb9',
    question:
      'A housing association employs you to work in its domestic properties. Do asbestos duties bite?',
    answer:
      'Yes. As employers they have duties under CAR 2012 to identify asbestos, risk-assess work liable to expose employees, and prepare a suitable written plan of work — a domestic property used as a place of work is still a workplace.',
    category: 'Safety',
    difficulty: 'hard',
  },

  // ── Surveys ─────────────────────────────────────────────────────────────
  {
    id: 'asb10',
    question: 'What are the two types of asbestos survey in HSG264?',
    answer:
      'A management survey, and a refurbishment and demolition survey.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb11',
    question: 'What is the purpose of a management survey?',
    answer:
      'It is the standard survey — to locate, so far as reasonably practicable, suspect ACMs that could be damaged or disturbed during normal occupancy INCLUDING foreseeable maintenance and installation, and to assess their condition.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb12',
    question: 'Why does "foreseeable maintenance and installation" matter to an electrician?',
    answer:
      'Because it is the phrase that puts your work inside the scope of a management survey — running new circuits or replacing a board is exactly the foreseeable installation work the survey is meant to anticipate.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb13',
    question: 'When is a refurbishment and demolition survey needed?',
    answer:
      'When the building, or part of it, is to be upgraded, refurbished or demolished.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb14',
    question: 'Can one building need both types of survey?',
    answer:
      'Yes — at larger premises a mixture is likely. A boiler house due for demolition needs a refurbishment/demolition survey while the offices on the same site have a management survey.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb15',
    question: 'Does a management survey involve intrusive work?',
    answer:
      'Often minor intrusive work and some disturbance. How far it goes depends on what is reasonably practicable for that property — building type, construction and accessibility.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb16',
    question: 'What must be agreed and recorded before a survey starts?',
    answer:
      'A clear statement and record of the type of survey, the reasons for selecting it, and exactly where it is to be carried out. Client and surveyor must both know the specification.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Construction work ───────────────────────────────────────────────────
  {
    id: 'asb17',
    question: 'What must a CDM client provide to designers and contractors about asbestos?',
    answer:
      'Project-specific information about the presence of asbestos, given to those bidding for or being engaged on the work, so design and construction risks can be addressed.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb18',
    question: 'Is "there may be asbestos on site" an acceptable CDM disclosure?',
    answer:
      'No. HSG264 is explicit that a general reference to hazards that may be present is not acceptable — the information must be project-specific.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'asb19',
    question: 'You are about to chase a wall in a 1970s commercial unit. What should exist already?',
    answer:
      'An asbestos management plan and a written record of ACM locations held by the dutyholder. Ask for it before you start — the duty to produce it is theirs, but the exposure is yours.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'asb20',
    question: 'What does HSG264 itself actually cover?',
    answer:
      'It is a SURVEY guide — how asbestos surveys are planned, carried out and reported. It does not authorise anyone to work with, sample or remove asbestos.',
    category: 'Safety',
    difficulty: 'medium',
  },
];
