/**
 * BS 7671:2018+A4:2026 Appendix 4 current-carrying capacities (Iz, amperes).
 *
 * Every value in this file was transcribed from the standard itself
 * (Tables 4D2A, 4D4A, 4D5, 4E1A, 4E2A, 4E4A — Appendix 4), read page-by-page
 * from the scanned document on 2026-07-02 for ELE-1256. Do NOT edit values
 * here without re-verifying against the printed standard — previous inline
 * tables in the calculator carried unsourced (wrong) figures.
 *
 * Coverage notes:
 * - Single-core 70 °C PVC (Table 4D1A): the scan is missing its pages, so
 *   1–95 mm² comes from OSG Table F4(i) and 120–400 mm² from four agreeing
 *   independent publications (see the pvc-single block comment).
 * - Mineral-insulated (Table 4G1A) included as light/heavy duty variants;
 *   bare-not-exposed (Table 4G2A) is not.
 * - LSF/LSZH cables: per Table 4A3, BS 7211 (non-armoured LSZH) is rated from
 *   Tables 4E1/4E2 (90 °C), and BS 6724 (armoured LSZH) from 4E3/4E4 — so the
 *   LSF options below intentionally share the thermosetting tables.
 * - Sizes are capped at 400 mm² (columns above that were not transcribed).
 */

export type CableTypeKey =
  | 'pvc-single'
  | 'pvc-multicore'
  | 'twin-earth'
  | 'xlpe-single'
  | 'xlpe-multicore'
  | 'lsf-single'
  | 'lsf-multicore'
  | 'swa-pvc'
  | 'swa-xlpe'
  | 'mineral-light'
  | 'mineral-heavy';

export interface MethodColumn {
  /** 2 cables / 1 two-core cable, single-phase AC or DC */
  singlePhase?: Record<string, number>;
  /** 3–4 cables / 1 three-or-four-core cable, three-phase AC */
  threePhase?: Record<string, number>;
}

export interface CableTypeCapacityTable {
  label: string;
  sourceTable: string;
  /** Drives the Table 4B1 ambient column — mineral has its own column */
  insulation: '70C' | '90C' | '70C-mineral';
  note?: string;
  methods: Record<string, MethodColumn>;
}

export const METHOD_LABELS: Record<string, string> = {
  'method-a': 'Method A - Enclosed in conduit in a thermally insulating wall',
  'method-b': 'Method B - Enclosed in conduit or trunking on a wall',
  'method-c': 'Method C - Clipped direct',
  'method-d1': 'Method D1 - In ducting in the ground',
  'method-d2': 'Method D2 - Buried direct in the ground',
  'method-e': 'Method E - In free air or on a perforated cable tray',
  'method-f': 'Method F - Single-core, touching, in free air or on tray',
  'method-g-h': 'Method G - Single-core, spaced, in free air (horizontal)',
  'method-g-v': 'Method G - Single-core, spaced, in free air (vertical)',
  'method-100': 'Method 100 - T&E above plasterboard ceiling, insulation ≤ 100mm',
  'method-101': 'Method 101 - T&E above plasterboard ceiling, insulation > 100mm',
  'method-102': 'Method 102 - T&E in insulated stud wall, touching inner wall surface',
  'method-103': 'Method 103 - T&E in insulated stud wall, not touching inner surface',
};

export const capacityTables: Record<CableTypeKey, CableTypeCapacityTable> = {
  // ── Table 4D1A — Single-core 70 °C thermoplastic (PVC) non-armoured ──
  // The standard's scan is missing Table 4D1A's pages, so this table is built
  // from two verified sources: 1–95 mm² transcribed from On-Site Guide Table
  // F4(i) (IET, explicitly cross-referenced to 4D1A; OnSiteGuide_ocr.pdf
  // pp.187–188), and 120–400 mm² cross-confirmed cell-for-cell across four
  // independent publications incl. a BSI-licensed verbatim 4D1A extract
  // (UK Cables 6491X) + Cleveland/Eland 18th-ed datasheets + CSE tables.
  // All 25–95 mm² anchor values agreed across every source.
  'pvc-single': {
    label: 'Single Core PVC 70°C',
    sourceTable: 'Table 4D1A',
    insulation: '70C',
    methods: {
      'method-a': {
        singlePhase: {
          '1.0': 11, '1.5': 14.5, '2.5': 20, '4.0': 26, '6.0': 34, '10.0': 46,
          '16.0': 61, '25.0': 80, '35.0': 99, '50.0': 119, '70.0': 151,
          '95.0': 182, '120.0': 210, '150.0': 240, '185.0': 273, '240.0': 321,
          '300.0': 367,
        },
        threePhase: {
          '1.0': 10.5, '1.5': 13.5, '2.5': 18, '4.0': 24, '6.0': 31, '10.0': 42,
          '16.0': 56, '25.0': 73, '35.0': 89, '50.0': 108, '70.0': 136,
          '95.0': 164, '120.0': 188, '150.0': 216, '185.0': 245, '240.0': 286,
          '300.0': 328,
        },
      },
      'method-b': {
        singlePhase: {
          '1.0': 13.5, '1.5': 17.5, '2.5': 24, '4.0': 32, '6.0': 41, '10.0': 57,
          '16.0': 76, '25.0': 101, '35.0': 125, '50.0': 151, '70.0': 192,
          '95.0': 232, '120.0': 269, '150.0': 300, '185.0': 341, '240.0': 400,
          '300.0': 458, '400.0': 546,
        },
        threePhase: {
          '1.0': 12, '1.5': 15.5, '2.5': 21, '4.0': 28, '6.0': 36, '10.0': 50,
          '16.0': 68, '25.0': 89, '35.0': 110, '50.0': 134, '70.0': 171,
          '95.0': 207, '120.0': 239, '150.0': 262, '185.0': 296, '240.0': 346,
          '300.0': 394, '400.0': 467,
        },
      },
      'method-c': {
        singlePhase: {
          '1.0': 15.5, '1.5': 20, '2.5': 27, '4.0': 37, '6.0': 47, '10.0': 65,
          '16.0': 87, '25.0': 114, '35.0': 141, '50.0': 182, '70.0': 234,
          '95.0': 284, '120.0': 330, '150.0': 381, '185.0': 436, '240.0': 515,
          '300.0': 594, '400.0': 694,
        },
        threePhase: {
          '1.0': 14, '1.5': 18, '2.5': 25, '4.0': 33, '6.0': 43, '10.0': 59,
          '16.0': 79, '25.0': 104, '35.0': 129, '50.0': 167, '70.0': 214,
          '95.0': 261, '120.0': 303, '150.0': 349, '185.0': 400, '240.0': 472,
          '300.0': 545, '400.0': 634,
        },
      },
      'method-f': {
        singlePhase: {
          '25.0': 131, '35.0': 162, '50.0': 196, '70.0': 251, '95.0': 304,
          '120.0': 352, '150.0': 406, '185.0': 463, '240.0': 546, '300.0': 629,
          '400.0': 754,
        },
        threePhase: {
          '25.0': 114, '35.0': 143, '50.0': 174, '70.0': 225, '95.0': 275,
          '120.0': 321, '150.0': 372, '185.0': 427, '240.0': 507, '300.0': 587,
          '400.0': 689,
        },
      },
      'method-g-h': {
        singlePhase: {
          '25.0': 146, '35.0': 181, '50.0': 219, '70.0': 281, '95.0': 341,
          '120.0': 396, '150.0': 456, '185.0': 521, '240.0': 615, '300.0': 709,
          '400.0': 852,
        },
        threePhase: {
          '25.0': 146, '35.0': 181, '50.0': 219, '70.0': 281, '95.0': 341,
          '120.0': 396, '150.0': 456, '185.0': 521, '240.0': 615, '300.0': 709,
          '400.0': 852,
        },
      },
      'method-g-v': {
        singlePhase: {
          '25.0': 130, '35.0': 162, '50.0': 197, '70.0': 254, '95.0': 311,
          '120.0': 362, '150.0': 419, '185.0': 480, '240.0': 569, '300.0': 659,
          '400.0': 795,
        },
        threePhase: {
          '25.0': 130, '35.0': 162, '50.0': 197, '70.0': 254, '95.0': 311,
          '120.0': 362, '150.0': 419, '185.0': 480, '240.0': 569, '300.0': 659,
          '400.0': 795,
        },
      },
    },
  },

  // ── Table 4D2A — Multicore 70 °C thermoplastic (PVC) non-armoured ──
  'pvc-multicore': {
    label: 'Multicore PVC 70°C',
    sourceTable: 'Table 4D2A',
    insulation: '70C',
    methods: {
      'method-a': {
        singlePhase: {
          '1.0': 11, '1.5': 14, '2.5': 18.5, '4.0': 25, '6.0': 32, '10.0': 43,
          '16.0': 57, '25.0': 75, '35.0': 92, '50.0': 110, '70.0': 139,
          '95.0': 167, '120.0': 192, '150.0': 219, '185.0': 248, '240.0': 291,
          '300.0': 334,
        },
        threePhase: {
          '1.0': 10, '1.5': 13, '2.5': 17.5, '4.0': 23, '6.0': 29, '10.0': 39,
          '16.0': 52, '25.0': 68, '35.0': 83, '50.0': 99, '70.0': 125,
          '95.0': 150, '120.0': 172, '150.0': 196, '185.0': 223, '240.0': 261,
          '300.0': 298,
        },
      },
      'method-b': {
        singlePhase: {
          '1.0': 13, '1.5': 16.5, '2.5': 23, '4.0': 30, '6.0': 38, '10.0': 52,
          '16.0': 69, '25.0': 90, '35.0': 111, '50.0': 133, '70.0': 168,
          '95.0': 201, '120.0': 232, '150.0': 258, '185.0': 294, '240.0': 344,
          '300.0': 394, '400.0': 470,
        },
        threePhase: {
          '1.0': 11.5, '1.5': 15, '2.5': 20, '4.0': 27, '6.0': 34, '10.0': 46,
          '16.0': 62, '25.0': 80, '35.0': 99, '50.0': 118, '70.0': 149,
          '95.0': 179, '120.0': 206, '150.0': 225, '185.0': 255, '240.0': 297,
          '300.0': 339, '400.0': 402,
        },
      },
      'method-c': {
        singlePhase: {
          '1.0': 15, '1.5': 19.5, '2.5': 27, '4.0': 36, '6.0': 46, '10.0': 63,
          '16.0': 85, '25.0': 112, '35.0': 138, '50.0': 168, '70.0': 213,
          '95.0': 258, '120.0': 299, '150.0': 344, '185.0': 392, '240.0': 461,
          '300.0': 530, '400.0': 634,
        },
        threePhase: {
          '1.0': 13.5, '1.5': 17.5, '2.5': 24, '4.0': 32, '6.0': 41, '10.0': 57,
          '16.0': 76, '25.0': 96, '35.0': 119, '50.0': 144, '70.0': 184,
          '95.0': 223, '120.0': 259, '150.0': 299, '185.0': 341, '240.0': 403,
          '300.0': 464, '400.0': 557,
        },
      },
      'method-e': {
        singlePhase: {
          '1.0': 17, '1.5': 22, '2.5': 30, '4.0': 40, '6.0': 51, '10.0': 70,
          '16.0': 94, '25.0': 119, '35.0': 148, '50.0': 180, '70.0': 232,
          '95.0': 282, '120.0': 328, '150.0': 379, '185.0': 434, '240.0': 514,
          '300.0': 593, '400.0': 715,
        },
        threePhase: {
          '1.0': 14.5, '1.5': 18.5, '2.5': 25, '4.0': 34, '6.0': 43, '10.0': 60,
          '16.0': 80, '25.0': 101, '35.0': 126, '50.0': 153, '70.0': 196,
          '95.0': 238, '120.0': 276, '150.0': 319, '185.0': 364, '240.0': 430,
          '300.0': 497, '400.0': 597,
        },
      },
    },
  },

  // ── Table 4D5 — 70 °C thermoplastic flat cable with protective conductor ──
  'twin-earth': {
    label: 'Twin & Earth (flat) PVC 70°C',
    sourceTable: 'Table 4D5',
    insulation: '70C',
    note: 'Flat T&E is single-phase only; Table 4D5 has no Method D or E.',
    methods: {
      'method-c': {
        singlePhase: {
          '1.0': 16, '1.5': 20, '2.5': 27, '4.0': 37, '6.0': 47, '10.0': 64,
          '16.0': 85,
        },
      },
      'method-b': {
        singlePhase: {
          '1.0': 13, '1.5': 16.5, '2.5': 23, '4.0': 30, '6.0': 38, '10.0': 52,
          '16.0': 69,
        },
      },
      'method-a': {
        singlePhase: {
          '1.0': 11.5, '1.5': 14.5, '2.5': 20, '4.0': 26, '6.0': 32, '10.0': 44,
          '16.0': 57,
        },
      },
      'method-100': {
        singlePhase: {
          '1.0': 13, '1.5': 16, '2.5': 21, '4.0': 27, '6.0': 34, '10.0': 45,
          '16.0': 57,
        },
      },
      'method-101': {
        singlePhase: {
          '1.0': 10.5, '1.5': 13, '2.5': 17, '4.0': 22, '6.0': 27, '10.0': 36,
          '16.0': 46,
        },
      },
      'method-102': {
        singlePhase: {
          '1.0': 13, '1.5': 16, '2.5': 21, '4.0': 27, '6.0': 35, '10.0': 47,
          '16.0': 63,
        },
      },
      'method-103': {
        singlePhase: {
          '1.0': 8, '1.5': 10, '2.5': 13.5, '4.0': 18.5, '6.0': 23.5,
          '10.0': 32, '16.0': 42.5,
        },
      },
    },
  },

  // ── Table 4E1A — Single-core 90 °C thermosetting non-armoured ──
  'xlpe-single': {
    label: 'Single Core XLPE 90°C',
    sourceTable: 'Table 4E1A',
    insulation: '90C',
    methods: {
      'method-a': {
        singlePhase: {
          '1.0': 14, '1.5': 19, '2.5': 26, '4.0': 35, '6.0': 45, '10.0': 61,
          '16.0': 81, '25.0': 106, '35.0': 131, '50.0': 158, '70.0': 200,
          '95.0': 241, '120.0': 278, '150.0': 318, '185.0': 362, '240.0': 424,
          '300.0': 486,
        },
        threePhase: {
          '1.0': 13, '1.5': 17, '2.5': 23, '4.0': 31, '6.0': 40, '10.0': 54,
          '16.0': 73, '25.0': 95, '35.0': 117, '50.0': 141, '70.0': 179,
          '95.0': 216, '120.0': 249, '150.0': 285, '185.0': 324, '240.0': 380,
          '300.0': 435,
        },
      },
      'method-b': {
        singlePhase: {
          '1.0': 17, '1.5': 23, '2.5': 31, '4.0': 42, '6.0': 54, '10.0': 75,
          '16.0': 100, '25.0': 133, '35.0': 164, '50.0': 198, '70.0': 253,
          '95.0': 306, '120.0': 354, '150.0': 393, '185.0': 449, '240.0': 528,
          '300.0': 603, '400.0': 683,
        },
        threePhase: {
          '1.0': 15, '1.5': 20, '2.5': 28, '4.0': 37, '6.0': 48, '10.0': 66,
          '16.0': 88, '25.0': 117, '35.0': 144, '50.0': 175, '70.0': 222,
          '95.0': 269, '120.0': 312, '150.0': 342, '185.0': 384, '240.0': 450,
          '300.0': 514, '400.0': 584,
        },
      },
      'method-c': {
        singlePhase: {
          '1.0': 19, '1.5': 25, '2.5': 34, '4.0': 46, '6.0': 59, '10.0': 81,
          '16.0': 109, '25.0': 143, '35.0': 176, '50.0': 228, '70.0': 293,
          '95.0': 355, '120.0': 413, '150.0': 476, '185.0': 545, '240.0': 644,
          '300.0': 743, '400.0': 868,
        },
        threePhase: {
          '1.0': 17.5, '1.5': 23, '2.5': 31, '4.0': 41, '6.0': 54, '10.0': 74,
          '16.0': 99, '25.0': 130, '35.0': 161, '50.0': 209, '70.0': 268,
          '95.0': 326, '120.0': 379, '150.0': 436, '185.0': 500, '240.0': 590,
          '300.0': 681, '400.0': 793,
        },
      },
      'method-f': {
        singlePhase: {
          '25.0': 161, '35.0': 200, '50.0': 242, '70.0': 310, '95.0': 377,
          '120.0': 437, '150.0': 504, '185.0': 575, '240.0': 679, '300.0': 783,
          '400.0': 940,
        },
        threePhase: {
          '25.0': 141, '35.0': 176, '50.0': 216, '70.0': 279, '95.0': 342,
          '120.0': 400, '150.0': 464, '185.0': 533, '240.0': 634, '300.0': 736,
          '400.0': 868,
        },
      },
      'method-g-h': {
        singlePhase: {
          '25.0': 182, '35.0': 226, '50.0': 275, '70.0': 353, '95.0': 430,
          '120.0': 500, '150.0': 577, '185.0': 661, '240.0': 781, '300.0': 902,
          '400.0': 1085,
        },
        threePhase: {
          '25.0': 182, '35.0': 226, '50.0': 275, '70.0': 353, '95.0': 430,
          '120.0': 500, '150.0': 577, '185.0': 661, '240.0': 781, '300.0': 902,
          '400.0': 1085,
        },
      },
      'method-g-v': {
        singlePhase: {
          '25.0': 161, '35.0': 201, '50.0': 246, '70.0': 318, '95.0': 389,
          '120.0': 454, '150.0': 527, '185.0': 605, '240.0': 719, '300.0': 833,
          '400.0': 1008,
        },
        threePhase: {
          '25.0': 161, '35.0': 201, '50.0': 246, '70.0': 318, '95.0': 389,
          '120.0': 454, '150.0': 527, '185.0': 605, '240.0': 719, '300.0': 833,
          '400.0': 1008,
        },
      },
    },
  },

  // ── Table 4E2A — Multicore 90 °C thermosetting non-armoured ──
  'xlpe-multicore': {
    label: 'Multicore XLPE 90°C',
    sourceTable: 'Table 4E2A',
    insulation: '90C',
    methods: {
      'method-a': {
        singlePhase: {
          '1.0': 14.5, '1.5': 18.5, '2.5': 25, '4.0': 33, '6.0': 42, '10.0': 57,
          '16.0': 76, '25.0': 99, '35.0': 121, '50.0': 145, '70.0': 183,
          '95.0': 220, '120.0': 253, '150.0': 290, '185.0': 329, '240.0': 386,
          '300.0': 442,
        },
        threePhase: {
          '1.0': 13, '1.5': 16.5, '2.5': 22, '4.0': 30, '6.0': 38, '10.0': 51,
          '16.0': 68, '25.0': 89, '35.0': 109, '50.0': 130, '70.0': 164,
          '95.0': 197, '120.0': 227, '150.0': 259, '185.0': 295, '240.0': 346,
          '300.0': 396,
        },
      },
      'method-b': {
        singlePhase: {
          '1.0': 17, '1.5': 22, '2.5': 30, '4.0': 40, '6.0': 51, '10.0': 69,
          '16.0': 91, '25.0': 119, '35.0': 146, '50.0': 175, '70.0': 221,
          '95.0': 265, '120.0': 305, '150.0': 334, '185.0': 384, '240.0': 459,
          '300.0': 532, '400.0': 625,
        },
        threePhase: {
          '1.0': 15, '1.5': 19.5, '2.5': 26, '4.0': 35, '6.0': 44, '10.0': 60,
          '16.0': 80, '25.0': 105, '35.0': 128, '50.0': 154, '70.0': 194,
          '95.0': 233, '120.0': 268, '150.0': 300, '185.0': 340, '240.0': 398,
          '300.0': 455, '400.0': 536,
        },
      },
      'method-c': {
        singlePhase: {
          '1.0': 19, '1.5': 24, '2.5': 33, '4.0': 45, '6.0': 58, '10.0': 80,
          '16.0': 107, '25.0': 138, '35.0': 171, '50.0': 209, '70.0': 269,
          '95.0': 328, '120.0': 382, '150.0': 441, '185.0': 506, '240.0': 599,
          '300.0': 693, '400.0': 803,
        },
        threePhase: {
          '1.0': 17, '1.5': 22, '2.5': 30, '4.0': 40, '6.0': 52, '10.0': 71,
          '16.0': 96, '25.0': 119, '35.0': 147, '50.0': 179, '70.0': 229,
          '95.0': 278, '120.0': 322, '150.0': 371, '185.0': 424, '240.0': 500,
          '300.0': 576, '400.0': 667,
        },
      },
      'method-e': {
        singlePhase: {
          '1.0': 21, '1.5': 26, '2.5': 36, '4.0': 49, '6.0': 63, '10.0': 86,
          '16.0': 115, '25.0': 149, '35.0': 185, '50.0': 225, '70.0': 289,
          '95.0': 352, '120.0': 410, '150.0': 473, '185.0': 542, '240.0': 641,
          '300.0': 741, '400.0': 865,
        },
        threePhase: {
          '1.0': 18, '1.5': 23, '2.5': 32, '4.0': 42, '6.0': 54, '10.0': 75,
          '16.0': 100, '25.0': 127, '35.0': 158, '50.0': 192, '70.0': 246,
          '95.0': 298, '120.0': 346, '150.0': 399, '185.0': 456, '240.0': 538,
          '300.0': 621, '400.0': 741,
        },
      },
    },
  },

  // ── LSF/LSZH — BS 7211 rates from Tables 4E1/4E2 per Table 4A3 ──
  'lsf-single': {
    label: 'LSF/LSZH Single Core 90°C (BS 7211)',
    sourceTable: 'Table 4E1A (via Table 4A3)',
    insulation: '90C',
    note: 'BS 7211 LSZH non-armoured cables are rated from the 90°C thermosetting tables.',
    methods: {}, // populated below — shares xlpe-single data
  },
  'lsf-multicore': {
    label: 'LSF/LSZH Multicore 90°C (BS 7211)',
    sourceTable: 'Table 4E2A (via Table 4A3)',
    insulation: '90C',
    note: 'BS 7211 LSZH non-armoured cables are rated from the 90°C thermosetting tables.',
    methods: {}, // populated below — shares xlpe-multicore data
  },

  // ── Table 4D4A — Multicore armoured 70 °C thermoplastic (SWA PVC) ──
  'swa-pvc': {
    label: 'SWA PVC 70°C',
    sourceTable: 'Table 4D4A',
    insulation: '70C',
    methods: {
      'method-c': {
        singlePhase: {
          '1.5': 21, '2.5': 28, '4.0': 38, '6.0': 49, '10.0': 67, '16.0': 89,
          '25.0': 118, '35.0': 145, '50.0': 175, '70.0': 222, '95.0': 269,
          '120.0': 310, '150.0': 356, '185.0': 405, '240.0': 476, '300.0': 547,
          '400.0': 621,
        },
        threePhase: {
          '1.5': 18, '2.5': 25, '4.0': 33, '6.0': 42, '10.0': 58, '16.0': 77,
          '25.0': 102, '35.0': 125, '50.0': 151, '70.0': 192, '95.0': 231,
          '120.0': 267, '150.0': 306, '185.0': 348, '240.0': 409, '300.0': 469,
          '400.0': 540,
        },
      },
      'method-e': {
        singlePhase: {
          '1.5': 22, '2.5': 31, '4.0': 41, '6.0': 53, '10.0': 72, '16.0': 97,
          '25.0': 128, '35.0': 157, '50.0': 190, '70.0': 241, '95.0': 291,
          '120.0': 336, '150.0': 386, '185.0': 439, '240.0': 516, '300.0': 592,
          '400.0': 683,
        },
        threePhase: {
          '1.5': 19, '2.5': 26, '4.0': 35, '6.0': 45, '10.0': 62, '16.0': 83,
          '25.0': 110, '35.0': 135, '50.0': 163, '70.0': 207, '95.0': 251,
          '120.0': 290, '150.0': 332, '185.0': 378, '240.0': 445, '300.0': 510,
          '400.0': 590,
        },
      },
      'method-d1': {
        singlePhase: {
          '1.5': 22, '2.5': 29, '4.0': 37, '6.0': 46, '10.0': 60, '16.0': 78,
          '25.0': 99, '35.0': 119, '50.0': 140, '70.0': 173, '95.0': 204,
          '120.0': 231, '150.0': 261, '185.0': 292, '240.0': 336, '300.0': 379,
        },
        threePhase: {
          '1.5': 18, '2.5': 24, '4.0': 30, '6.0': 38, '10.0': 50, '16.0': 64,
          '25.0': 82, '35.0': 98, '50.0': 116, '70.0': 143, '95.0': 169,
          '120.0': 192, '150.0': 217, '185.0': 243, '240.0': 280, '300.0': 316,
        },
      },
      'method-d2': {
        singlePhase: {
          '1.5': 22, '2.5': 28, '4.0': 38, '6.0': 48, '10.0': 64, '16.0': 83,
          '25.0': 110, '35.0': 132, '50.0': 156, '70.0': 192, '95.0': 230,
          '120.0': 261, '150.0': 293, '185.0': 331, '240.0': 382, '300.0': 427,
        },
        threePhase: {
          '1.5': 19, '2.5': 24, '4.0': 33, '6.0': 41, '10.0': 54, '16.0': 70,
          '25.0': 92, '35.0': 110, '50.0': 130, '70.0': 162, '95.0': 193,
          '120.0': 220, '150.0': 246, '185.0': 278, '240.0': 320, '300.0': 359,
        },
      },
    },
  },

  // ── Table 4E4A — Multicore armoured 90 °C thermosetting (SWA XLPE) ──
  'swa-xlpe': {
    label: 'SWA XLPE 90°C',
    sourceTable: 'Table 4E4A',
    insulation: '90C',
    methods: {
      'method-c': {
        singlePhase: {
          '1.5': 27, '2.5': 36, '4.0': 49, '6.0': 62, '10.0': 85, '16.0': 110,
          '25.0': 146, '35.0': 180, '50.0': 219, '70.0': 279, '95.0': 338,
          '120.0': 392, '150.0': 451, '185.0': 515, '240.0': 607, '300.0': 698,
          '400.0': 787,
        },
        threePhase: {
          '1.5': 23, '2.5': 31, '4.0': 42, '6.0': 53, '10.0': 73, '16.0': 94,
          '25.0': 124, '35.0': 154, '50.0': 187, '70.0': 238, '95.0': 289,
          '120.0': 335, '150.0': 386, '185.0': 441, '240.0': 520, '300.0': 599,
          '400.0': 673,
        },
      },
      'method-e': {
        singlePhase: {
          '1.5': 29, '2.5': 39, '4.0': 52, '6.0': 66, '10.0': 90, '16.0': 115,
          '25.0': 152, '35.0': 188, '50.0': 228, '70.0': 291, '95.0': 354,
          '120.0': 410, '150.0': 472, '185.0': 539, '240.0': 636, '300.0': 732,
          '400.0': 847,
        },
        threePhase: {
          '1.5': 25, '2.5': 33, '4.0': 44, '6.0': 56, '10.0': 78, '16.0': 99,
          '25.0': 131, '35.0': 162, '50.0': 197, '70.0': 251, '95.0': 304,
          '120.0': 353, '150.0': 406, '185.0': 463, '240.0': 546, '300.0': 628,
          '400.0': 728,
        },
      },
      'method-d1': {
        singlePhase: {
          '1.5': 25, '2.5': 33, '4.0': 43, '6.0': 53, '10.0': 71, '16.0': 91,
          '25.0': 116, '35.0': 139, '50.0': 164, '70.0': 203, '95.0': 239,
          '120.0': 271, '150.0': 306, '185.0': 343, '240.0': 395, '300.0': 446,
        },
        threePhase: {
          '1.5': 21, '2.5': 28, '4.0': 36, '6.0': 44, '10.0': 58, '16.0': 75,
          '25.0': 96, '35.0': 115, '50.0': 135, '70.0': 167, '95.0': 197,
          '120.0': 223, '150.0': 251, '185.0': 281, '240.0': 324, '300.0': 365,
        },
      },
      'method-d2': {
        singlePhase: {
          '1.5': 27, '2.5': 35, '4.0': 46, '6.0': 58, '10.0': 77, '16.0': 100,
          '25.0': 129, '35.0': 155, '50.0': 183, '70.0': 225, '95.0': 270,
          '120.0': 306, '150.0': 343, '185.0': 387, '240.0': 448, '300.0': 502,
        },
        threePhase: {
          '1.5': 23, '2.5': 30, '4.0': 39, '6.0': 49, '10.0': 65, '16.0': 84,
          '25.0': 107, '35.0': 129, '50.0': 153, '70.0': 188, '95.0': 226,
          '120.0': 257, '150.0': 287, '185.0': 324, '240.0': 375, '300.0': 419,
        },
      },
    },
  },
  // ── Table 4G1A — Mineral insulated, thermoplastic covered or bare and
  // exposed to touch (70 °C sheath). Single-phase = "2 single-core touching or
  // 1 two-core"; three-phase = the TREFOIL column (conservative — the flat
  // touching column is slightly higher). Spaced Method G columns are
  // three-phase only in this table. Bare-not-exposed (105 °C, Table 4G2A) not
  // included; bare-exposed values = tabulated × 0.9 per table note 2.
  'mineral-light': {
    label: 'Mineral (MICC) Light Duty 500V',
    sourceTable: 'Table 4G1A',
    insulation: '70C-mineral',
    methods: {
      'method-c': {
        singlePhase: { '1.0': 18.5, '1.5': 23, '2.5': 31, '4.0': 40 },
        threePhase: { '1.0': 15, '1.5': 19, '2.5': 26, '4.0': 35 },
      },
      'method-e': {
        singlePhase: { '1.0': 19.5, '1.5': 25, '2.5': 33, '4.0': 44 },
        threePhase: { '1.0': 16.5, '1.5': 21, '2.5': 28, '4.0': 37 },
      },
      'method-g-v': {
        threePhase: { '1.0': 20, '1.5': 26, '2.5': 34, '4.0': 45 },
      },
      'method-g-h': {
        threePhase: { '1.0': 23, '1.5': 29, '2.5': 39, '4.0': 51 },
      },
    },
  },
  'mineral-heavy': {
    label: 'Mineral (MICC) Heavy Duty 750V',
    sourceTable: 'Table 4G1A',
    insulation: '70C-mineral',
    methods: {
      'method-c': {
        singlePhase: {
          '1.0': 19.5, '1.5': 25, '2.5': 34, '4.0': 45, '6.0': 57, '10.0': 77,
          '16.0': 102, '25.0': 133, '35.0': 163, '50.0': 202, '70.0': 247,
          '95.0': 296, '120.0': 340, '150.0': 388, '185.0': 440, '240.0': 514,
        },
        threePhase: {
          '1.0': 16, '1.5': 21, '2.5': 28, '4.0': 37, '6.0': 48, '10.0': 65,
          '16.0': 86, '25.0': 112, '35.0': 137, '50.0': 169, '70.0': 207,
          '95.0': 249, '120.0': 286, '150.0': 327, '185.0': 371, '240.0': 434,
        },
      },
      'method-e': {
        singlePhase: {
          '1.0': 21, '1.5': 26, '2.5': 36, '4.0': 47, '6.0': 60, '10.0': 82,
          '16.0': 109, '25.0': 142, '35.0': 174, '50.0': 215, '70.0': 264,
          '95.0': 317, '120.0': 364, '150.0': 416, '185.0': 472, '240.0': 552,
        },
        threePhase: {
          '1.0': 17.5, '1.5': 22, '2.5': 30, '4.0': 40, '6.0': 51, '10.0': 69,
          '16.0': 92, '25.0': 120, '35.0': 147, '50.0': 182, '70.0': 223,
          '95.0': 267, '120.0': 308, '150.0': 352, '185.0': 399, '240.0': 466,
        },
      },
      'method-g-v': {
        threePhase: {
          '1.0': 22, '1.5': 28, '2.5': 37, '4.0': 49, '6.0': 62, '10.0': 84,
          '16.0': 110, '25.0': 142, '35.0': 173, '50.0': 213, '70.0': 259,
          '95.0': 309, '120.0': 353, '150.0': 400, '185.0': 446, '240.0': 497,
        },
      },
      'method-g-h': {
        threePhase: {
          '1.0': 25, '1.5': 32, '2.5': 43, '4.0': 56, '6.0': 71, '10.0': 95,
          '16.0': 125, '25.0': 162, '35.0': 197, '50.0': 242, '70.0': 294,
          '95.0': 351, '120.0': 402, '150.0': 454, '185.0': 507, '240.0': 565,
        },
      },
    },
  },
};

// LSF shares the 90 °C thermosetting data (Table 4A3 mapping) — aliased at
// module load so the values live in exactly one place.
capacityTables['lsf-single'].methods = capacityTables['xlpe-single'].methods;
capacityTables['lsf-multicore'].methods = capacityTables['xlpe-multicore'].methods;

/**
 * Table 4B3 — rating factors for soil thermal resistivities other than
 * 2.5 K·m/W, applied to Reference Method D capacities.
 * D1 row = cables in buried ducts; D2 row = direct buried.
 * All cells (including 2.0 K·m/W direct-buried = 1.12) verified against the
 * rendered table page on 2026-07-02.
 */
export const soilResistivityFactors: {
  resistivity: number;
  buriedDucts: number;
  directBuried: number;
}[] = [
  { resistivity: 0.5, buriedDucts: 1.28, directBuried: 1.88 },
  { resistivity: 0.8, buriedDucts: 1.2, directBuried: 1.62 },
  { resistivity: 1.0, buriedDucts: 1.18, directBuried: 1.5 },
  { resistivity: 1.2, buriedDucts: 1.13, directBuried: 1.4 },
  { resistivity: 1.5, buriedDucts: 1.1, directBuried: 1.28 },
  { resistivity: 2.0, buriedDucts: 1.05, directBuried: 1.12 },
  { resistivity: 2.5, buriedDucts: 1.0, directBuried: 1.0 },
  { resistivity: 3.0, buriedDucts: 0.96, directBuried: 0.9 },
];

export function getSoilResistivityFactor(
  resistivity: number,
  method: 'method-d1' | 'method-d2'
): number {
  const key = method === 'method-d1' ? 'buriedDucts' : 'directBuried';
  const exact = soilResistivityFactors.find((f) => f.resistivity === resistivity);
  if (exact) return exact[key];
  // Between table points, take the next-higher resistivity's factor (conservative).
  const higher = soilResistivityFactors
    .filter((f) => f.resistivity > resistivity)
    .sort((a, b) => a.resistivity - b.resistivity)[0];
  if (higher) return higher[key];
  return soilResistivityFactors[soilResistivityFactors.length - 1][key];
}

export type PhaseKey = 'singlePhase' | 'threePhase';

/** Sizes (as '6.0'-style keys) available for a cable type, optionally narrowed by method+phase. */
export function getAvailableSizes(
  cableType: CableTypeKey,
  method?: string,
  phase: PhaseKey = 'singlePhase'
): string[] {
  const table = capacityTables[cableType];
  if (!table) return [];
  const sizeSet = new Set<string>();
  const methodEntries = method ? [table.methods[method]] : Object.values(table.methods);
  for (const m of methodEntries) {
    const col = m?.[phase];
    if (col) Object.keys(col).forEach((s) => sizeSet.add(s));
  }
  return [...sizeSet].sort((a, b) => parseFloat(a) - parseFloat(b));
}

/** Methods available for a cable type (and phase). */
export function getAvailableMethods(
  cableType: CableTypeKey,
  phase: PhaseKey = 'singlePhase'
): string[] {
  const table = capacityTables[cableType];
  if (!table) return [];
  return Object.keys(table.methods).filter((m) => !!table.methods[m][phase]);
}

/** Tabulated It for a type/size/method/phase, or null when the standard has no value. */
export function lookupCapacity(
  cableType: CableTypeKey,
  size: string,
  method: string,
  phase: PhaseKey = 'singlePhase'
): number | null {
  const value = capacityTables[cableType]?.methods[method]?.[phase]?.[size];
  return typeof value === 'number' ? value : null;
}
