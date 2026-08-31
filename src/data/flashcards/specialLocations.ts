/**
 * Part 7 — Special Installations or Locations.
 *
 * The biggest gap in the flashcard library: 28 sets and nothing on Part 7,
 * which is heavily examined and is where most of the "why can't I put a socket
 * there" arguments on site come from.
 *
 * ⚠️ EVERY card here was written against `bs7671_facets`, edition
 * 41c1f30d-4f1a-432f-9e2d-61b91290149f = **BS 7671:2018+A4:2026** — the only
 * RAG table that is current. Nothing is from recall, and no regulation number
 * appears that was not read back from a coherent cluster of facets.
 *
 * Two traps worth recording for whoever extends this:
 *
 *  - Searching "zone 1" returns 701 (bathrooms), 702 (pools), 703 (saunas) and
 *    fountains all mixed together, because they all use the same zone
 *    vocabulary with DIFFERENT dimensions. Every fact below was attributed by
 *    its `Reg` breadcrumb, not by proximity.
 *  - The source text contains "IPXS" where it means **IPX5** — an OCR artefact.
 *    Do not propagate it.
 */
import { FlashcardData } from './types';

export const specialLocations: FlashcardData[] = [
  // ── 701 Locations containing a bath or shower ──────────────────────────
  {
    id: 'sl1',
    question:
      'In a room containing a bath or shower, which circuits need additional protection by a 30 mA RCD?',
    answer:
      'All low voltage circuits — both those serving the location AND those merely passing through its zones (Reg 701.411.3.3, RCD characteristics per 415.1.1). A circuit that only passes through still needs it.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl2',
    question: 'How far up does Zone 1 extend in a bathroom?',
    answer:
      'From finished floor level to the highest fixed shower head or water outlet, OR 2.25 m above finished floor level — whichever is HIGHER. A rain head at 2.4 m raises Zone 1 to 2.4 m.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl3',
    question: 'How far out does Zone 2 extend from Zone 1 in a bathroom?',
    answer:
      '0.60 m horizontally beyond the Zone 1 boundary, with the same vertical limit as Zone 1 (highest outlet or 2.25 m, whichever is higher).',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl4',
    question: 'Is the space under a bath tub inside a zone?',
    answer:
      'It is Zone 1 — UNLESS it is accessible only with a tool, in which case it is outside the zones altogether. A screwed-down access panel takes it out of the zones; a clip-off one does not.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl5',
    question: 'For a shower without a basin, how big is Zone 1 horizontally?',
    answer:
      '1.20 m measured from the centre point of the fixed water outlet on the wall or ceiling.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl6',
    question: 'For a shower without a basin, what is the height of Zone 0?',
    answer:
      '0.10 m, with the same horizontal extent as Zone 1. A very shallow zone at floor level.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl7',
    question: 'How close to a bathroom can you put a 230 V socket-outlet?',
    answer:
      'No closer than 2.50 m measured HORIZONTALLY from the boundary of Zone 1 (Reg 701.512.3). Two exceptions: SELV socket-outlets complying with Section 414, and shaver supply units to BS EN 61558-2-5.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl8',
    question: 'Which standard must a bathroom shaver supply unit comply with?',
    answer:
      'BS EN 61558-2-5. That compliance is what allows it in Zone 2 and exempts it from the 2.50 m socket-outlet prohibition.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl9',
    question: 'Can you install a switch or socket-outlet in bathroom Zone 2?',
    answer:
      'Not generally. The exceptions are SELV switches and socket-outlets (with the safety source outside zones 0, 1 and 2), and shaver supply units to BS EN 61558-2-5 sited where direct shower spray is unlikely.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl10',
    question: 'Is a junction box allowed in bathroom Zone 1?',
    answer:
      'Only if the circuit is SELV. A junction box in Zone 1 on any non-SELV circuit is non-compliant.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl11',
    question: 'What are the SELV voltage limits for equipment in bathroom Zone 0?',
    answer:
      'Not exceeding 12 V AC RMS or 30 V ripple-free DC, with the safety source installed OUTSIDE zones 0, 1 and 2 (Reg 701.55).',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl12',
    question: 'What are the SELV/PELV voltage limits for equipment in bathroom Zone 1?',
    answer:
      'Not exceeding 25 V AC RMS or 60 V ripple-free DC, safety source outside zones 0, 1 and 2. Note Zone 1 allows a higher limit than Zone 0 (12 V AC / 30 V DC).',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl13',
    question: 'What are the two conditions on ANY current-using equipment in bathroom Zone 0?',
    answer:
      'It must be fixed and permanently connected, and it must comply with the relevant standard and be suitable for Zone 0 per the manufacturer’s instructions. Nothing portable.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl14',
    question: 'Name equipment specifically permitted in bathroom Zone 1.',
    answer:
      'Whirlpool units, electric showers, shower pumps, ventilation equipment, towel rails and water heating appliances — each only if fixed, permanently connected and suitable for Zone 1 per the manufacturer’s instructions (Reg 701.55).',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl15',
    question:
      'What does supplementary protective equipotential bonding connect in a room with a bath or shower?',
    answer:
      'The protective conductor terminals of each circuit supplying Class I and Class II equipment, together with accessible extraneous-conductive-parts — metal pipes, heating, structural metal that can be touched (Reg 701.415.2).',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl16',
    question: 'When can supplementary bonding be omitted from a bathroom?',
    answer:
      'Only when all of the stated conditions are met — including condition (e), that ALL final circuits of the location have additional protection by an RCD to Reg 415.1.1. Miss one condition and the bonding stays.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl17',
    question: 'What is an extraneous-conductive-part in the bathroom bonding sense?',
    answer:
      'A metallic part in the room that can be touched and is NOT part of the electrical installation — pipework, heating systems, structural metal — capable of introducing a potential.',
    category: 'Special Locations',
    difficulty: 'medium',
  },

  // ── 703 Saunas ──────────────────────────────────────────────────────────
  {
    id: 'sl18',
    question: 'How is Zone 1 defined in a sauna?',
    answer:
      'The volume containing the heater, bounded by the floor, the cold side of the ceiling’s thermal insulation, and a vertical surface circumscribing the heater 0.5 m from its surface.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl19',
    question: 'What happens to sauna Zone 1 if the heater sits closer than 0.5 m to a wall?',
    answer:
      'Zone 1 is limited on that side by the cold side of that wall’s thermal insulation instead of the usual 0.5 m — and that applies for each wall the heater is close to.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl20',
    question: 'What separates sauna Zone 2 from Zone 3?',
    answer:
      'A horizontal surface 1.0 m above the floor. Zone 2 is outside Zone 1 up to that plane; Zone 3 is above it, up to the cold side of the ceiling and wall insulation.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl21',
    question: 'What minimum IP rating applies to equipment in a sauna?',
    answer:
      'At least IPX4 (Reg 703.512.2) — rising to at least IPX5 where cleaning by water jets may reasonably be expected.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl22',
    question: 'Does every sauna circuit need its own RCD?',
    answer:
      'No. A single 30 mA RCD conforming to Reg 415.1.1 may provide the additional protection for all the lighting and socket circuits in the sauna (Reg 703.411.3.3).',
    category: 'Special Locations',
    difficulty: 'medium',
  },

  // ── 702 Swimming pools ──────────────────────────────────────────────────
  {
    id: 'sl23',
    question: 'Where a swimming pool has no Zone 2, what lighting is allowed in Zone 1?',
    answer:
      'Lighting supplied by other than a SELV source may be installed on a wall or ceiling at 12 V AC RMS or 30 V ripple-free DC, provided the circuit has automatic disconnection of supply plus RCD protection.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl24',
    question: 'Can a SELV safety source ever be inside swimming pool Zone 2?',
    answer:
      'Yes — as an exception to the usual "outside zones 0, 1 and 2" rule, the SELV source may sit in Zone 2 if its supply circuit is protected by an RCD to Reg 415.1.1.',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl25',
    question:
      'For electrical separation supplying pool equipment, how many items may the source feed?',
    answer:
      'One item of current-using equipment only. The source is generally required outside zones 0, 1 and 2.',
    category: 'Special Locations',
    difficulty: 'hard',
  },

  // ── 709 Marinas ─────────────────────────────────────────────────────────
  {
    id: 'sl26',
    question:
      'What minimum IP rating applies to equipment on or above a marina jetty, pier or pontoon?',
    answer:
      'At least IPX4 where the external influence is water splashes (AD4) — Reg 709.512.2.1.1. Higher ratings apply where the influences are more severe.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl27',
    question: 'How must marina socket-outlets be protected, and what must the device disconnect?',
    answer:
      'Each socket-outlet is individually protected by an RCD to Reg 415.1.1, and the device must disconnect all live conductors INCLUDING the neutral (Reg 709.531.2).',
    category: 'Special Locations',
    difficulty: 'hard',
  },
  {
    id: 'sl28',
    question: 'What does the "X" mean in an IP rating such as IPX4?',
    answer:
      'That the first digit — protection against solid foreign objects — is not specified by that clause. Only the water ingress figure is being set; you still select for solids per the actual conditions.',
    category: 'Special Locations',
    difficulty: 'easy',
  },
  {
    id: 'sl29',
    question: 'What does external influence code AD4 describe?',
    answer:
      'Water splashes — the classification used in marinas to drive the IPX4 minimum for equipment on or above jetties, wharves, piers and pontoons.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
  {
    id: 'sl30',
    question:
      'Why is it a mistake to assume "Zone 1" means the same thing in a bathroom, a pool and a sauna?',
    answer:
      'The zone numbering is shared but the geometry is completely different — bathroom Zone 1 is set by the bath/shower and a 2.25 m plane, sauna Zone 1 is a 0.5 m volume around the heater. Always read the zone definition for that section.',
    category: 'Special Locations',
    difficulty: 'medium',
  },
];
