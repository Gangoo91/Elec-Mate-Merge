/**
 * Avoiding danger from underground services.
 *
 * Source: `~/Desktop/hav/HSE-HSG47-Avoiding-danger-underground-services.pdf`
 * (HSE, free, Crown copyright), read from the PDF text.
 *
 * Why an electrician needs this: SWA to an outbuilding, an EV charge point
 * across a drive, a new supply to a workshop — all of it involves breaking
 * ground, and striking a cable underground is one of the few things on a
 * domestic job that reliably kills people. Pairs with the construction
 * awareness and multi-trade courses.
 */
import { FlashcardData } from './types';

export const undergroundServices: FlashcardData[] = [
  // ── The system of work ──────────────────────────────────────────────────
  {
    id: 'ug1',
    question: 'What are the three basic elements of a safe system of work near buried services?',
    answer:
      'Planning the work; detecting, identifying and marking the services; and safe excavation/safe digging practices. All three are essential — they complement each other, they are not alternatives.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug2',
    question: 'Before disturbing ground, who must you contact and why?',
    answer:
      'The owners and operators of the services, for information about their location and status. They should provide relevant information for the work area, and should be prepared to help locate and identify services — including sending a representative to site.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug3',
    question: 'Are plans on their own enough to dig safely?',
    answer:
      'No. Plans are one input — HSG47 devotes a whole section to their use AND their limitations. They are combined with detection on site, then confirmed by trial holes.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug4',
    question: 'What is the correct sequence once a locator has been used?',
    answer:
      'Excavation may proceed, with trial holes dug using suitable hand tools or vacuum excavation as necessary, to CONFIRM the position of any detected service. Detection tells you roughly where; the trial hole proves it.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug5',
    question: 'Where should you take special care when digging?',
    answer:
      'Above or close to the assumed line of a detected service — the place you already believe something is buried.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Mechanical excavation ───────────────────────────────────────────────
  {
    id: 'ug6',
    question: 'Why does mechanical excavation need particular management?',
    answer:
      'It is a common source of damage to services. It must be carefully planned and managed, not just handed to a driver.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug7',
    question: 'What role should a second person play during mechanical excavation?',
    answer:
      'Assist the driver from a position where they can safely see into the excavation and warn of services or obstacles — while remaining OUTSIDE the operating radius of the arm and bucket.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug8',
    question: 'A cable is struck while an excavator is working. What must the driver do?',
    answer:
      'Stay in the cab. If they climb down they may be electrocuted — the machine and the ground around it can be at different potentials.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug9',
    question: 'After a cable strike, when can people approach?',
    answer:
      'Not until the cable owner has made the damaged cable safe. The area is isolated and secured, and nobody enters the excavation or approaches the excavator or cable before then.',
    category: 'Safety',
    difficulty: 'hard',
  },

  // ── Risk by service type and tool ───────────────────────────────────────
  {
    id: 'ug10',
    question: 'Is an excavator or a hand-held power tool more dangerous near a GAS pipe?',
    answer:
      'The excavator — damaging a gas pipe with an excavator creates a much greater danger than doing it with a hand-held power tool.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug11',
    question: 'And near an ELECTRICITY cable — which is worse?',
    answer:
      'The opposite: for electricity cables the hand-held power tool is the greater danger, because the operator is in direct contact with the tool at the point of the strike.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug12',
    question: 'Why is the gas/electricity tool comparison worth remembering?',
    answer:
      'Because the intuition is backwards. People assume the big machine is always worse — for cables it is the breaker in your hands that is most likely to kill you.',
    category: 'Safety',
    difficulty: 'medium',
  },

  // ── Consequences beyond the strike ──────────────────────────────────────
  {
    id: 'ug13',
    question: 'Why can the effects of damage extend beyond the point of impact?',
    answer:
      'Damage to a service connection can cause unseen damage to the connection INSIDE the building, and gas from a damaged pipe can travel along the line of a service pipe into a building and build up dangerously there.',
    category: 'Safety',
    difficulty: 'hard',
  },
  {
    id: 'ug14',
    question: 'You nick a service connection but everything still works. Is that the end of it?',
    answer:
      'No. The damage may have propagated unseen to the connection inside the building. It must be reported to the service owner rather than backfilled and forgotten.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug15',
    question: 'Which services does HSG47 cover?',
    answer:
      'Buried services generally — electricity, gas, water including piped sewage, and telecommunications, plus others.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'ug16',
    question: 'Why does damage to telecoms and TV cables still matter if nobody is hurt?',
    answer:
      'Because repairs can be expensive — and the cost lands on whoever caused it. Not every consequence of a strike is a safety one.',
    category: 'Safety',
    difficulty: 'easy',
  },
  {
    id: 'ug17',
    question: 'What should happen to plans after work is complete?',
    answer:
      'They should be updated — HSG47 covers updating plans, because the next person to dig relies on what you recorded.',
    category: 'Safety',
    difficulty: 'medium',
  },
  {
    id: 'ug18',
    question: 'You are laying SWA to a garden office. What does HSG47 expect before the spade goes in?',
    answer:
      'Contact the service owners for information, obtain and read the plans knowing their limitations, use a locator to detect and mark, then confirm with hand-dug trial holes before any mechanical excavation.',
    category: 'Safety',
    difficulty: 'medium',
  },
];
