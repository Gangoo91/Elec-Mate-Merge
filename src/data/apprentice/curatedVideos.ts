/**
 * Curated YouTube Videos
 *
 * Hand-picked electrical training videos from approved channels only.
 * Only add videos from creators who have given permission.
 *
 * Current approved creators:
 * - Craig Wiltshire (@craigwiltshire9628) - NVQ assessment & apprentice training
 */

export type VideoCategory =
  | 'wiring'
  | 'testing-inspection'
  | 'bs7671'
  | 'am2-prep'
  | 'domestic'
  | 'commercial'
  | 'solar-ev'
  | 'safety'
  | 'tools-equipment'
  | 'career';

export interface CuratedVideo {
  id: string;
  title: string;
  channel: string;
  duration: string;
  category: VideoCategory;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export const categoryLabels: Record<VideoCategory, string> = {
  'wiring': 'Wiring',
  'testing-inspection': 'Testing & Inspection',
  'bs7671': 'BS 7671',
  'am2-prep': 'AM2 Prep',
  'domestic': 'Domestic',
  'commercial': 'Commercial',
  'solar-ev': 'Solar/EV',
  'safety': 'Safety',
  'tools-equipment': 'Tools & Equipment',
  'career': 'Career',
};

export const curatedVideos: CuratedVideo[] = [
  // ── Testing & Inspection ──────────────────────────────────────────
  {
    id: 'K7-FxWD87Kg',
    title: 'NVQ 3 Electrotechnical Ring Final Testing Explained',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['NVQ', 'ring final', 'testing', 'Level 3'],
    level: 'intermediate',
    description: 'Ring final circuit testing explained for NVQ Level 3 electrotechnical learners.',
  },
  {
    id: 'NNfyTU1QoYI',
    title: 'Ring Final Test Explanation - As Simple as I Can Make It',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'testing-inspection',
    tags: ['ring final', 'testing', 'simple explanation'],
    level: 'beginner',
    description: 'A straightforward walkthrough of ring final circuit testing.',
  },
  {
    id: 'sWvtpLZsAEE',
    title: 'Insulation Resistance Testing as per AMD 2 BS 7671',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'testing-inspection',
    tags: ['insulation resistance', 'IR testing', 'BS 7671', 'AMD 2'],
    level: 'intermediate',
    description: 'How to carry out insulation resistance testing in line with the latest BS 7671 amendment.',
  },
  {
    id: 'CSMpfjSQK-g',
    title: 'Ze Test Single Phase',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'testing-inspection',
    tags: ['Ze', 'earth fault loop', 'single phase', 'testing'],
    level: 'beginner',
    description: 'How to carry out a Ze (external earth fault loop impedance) test on a single phase supply.',
  },
  {
    id: 'DJn8KIQkApo',
    title: 'Schedule of Inspections',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['inspection', 'schedule', 'certification', 'paperwork'],
    level: 'intermediate',
    description: 'How to complete a schedule of inspections for your assessment.',
  },

  // ── BS 7671 / Regulations ─────────────────────────────────────────
  {
    id: 'V1dUdzUszdo',
    title: '17th and 18th Edition Reg Changes - Fire Supports',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'bs7671',
    tags: ['18th edition', '17th edition', 'regulation changes', 'fire'],
    level: 'intermediate',
    description: 'Key regulation changes between 17th and 18th edition regarding fire supports.',
  },

  // ── NVQ / Assessment / Career ─────────────────────────────────────
  {
    id: 'HqkVPC9LYxw',
    title: 'Top 7 Rejected Evidence for NVQ',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'career',
    tags: ['NVQ', 'evidence', 'portfolio', 'common mistakes'],
    level: 'beginner',
    description: 'The most common reasons NVQ evidence gets rejected and how to avoid them.',
  },
  {
    id: 'Ft_UdvFOvts',
    title: 'How to Prep for a Successful Assessment - Interview with George',
    channel: 'Craig Wiltshire',
    duration: '15:00',
    category: 'career',
    tags: ['NVQ', 'assessment', 'preparation', 'interview'],
    level: 'beginner',
    description: 'Tips and advice on preparing for your NVQ assessment, with insights from a learner.',
  },
  {
    id: 'wJ-ePLirRgE',
    title: 'What Is the EWA - Experienced Worker Assessment',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'career',
    tags: ['EWA', 'experienced worker', 'assessment', 'qualification'],
    level: 'beginner',
    description: 'An overview of the Experienced Worker Assessment route and what to expect.',
  },
  {
    id: 'L9mRkaaRmwM',
    title: 'Getting Over Anxiety - Adam and Craig',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'career',
    tags: ['anxiety', 'wellbeing', 'support', 'apprentice'],
    level: 'beginner',
    description: 'An honest chat about dealing with anxiety as an apprentice and how to overcome it.',
  },
  {
    id: 'asG-Bkv2_vc',
    title: 'Risk Assessment for NVQ',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'safety',
    tags: ['risk assessment', 'NVQ', 'health and safety'],
    level: 'beginner',
    description: 'How to complete a risk assessment as part of your NVQ portfolio evidence.',
  },

  // ── AM2 Prep ──────────────────────────────────────────────────────
  {
    id: 'iTYYdLGZ-WA',
    title: 'AM2 and AM2E - When Can You Book It?',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'am2-prep',
    tags: ['AM2', 'AM2E', 'booking', 'exam'],
    level: 'beginner',
    description: 'When you can book your AM2 or AM2E assessment and what the requirements are.',
  },

  // ── Faults & Problem Solving ──────────────────────────────────────
  {
    id: '4_YaoRGUB5Y',
    title: 'Fault Finding and How to Describe a Fault in Assessment',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'testing-inspection',
    tags: ['fault finding', 'assessment', 'NVQ', 'diagnosis'],
    level: 'intermediate',
    description: 'How to approach fault finding and describe faults properly in your NVQ assessment.',
  },
  {
    id: '28ZEFkvkDMc',
    title: 'GN3 Error Detected by a Sharp Learner',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'testing-inspection',
    tags: ['GN3', 'error', 'guidance note', 'learning'],
    level: 'intermediate',
    description: 'A learner spots an important error in GN3 - a lesson in paying attention to detail.',
  },
  {
    id: '9p0_OqPdLLo',
    title: '2357 Faults Presentation - Absolute Gold',
    channel: 'Craig Wiltshire',
    duration: '15:00',
    category: 'testing-inspection',
    tags: ['2357', 'faults', 'City and Guilds', 'presentation'],
    level: 'intermediate',
    description: 'Essential fault presentation for City and Guilds 2357 learners.',
  },

  // ── Wiring & Installation ─────────────────────────────────────────
  {
    id: '5DdY6PzOznQ',
    title: 'Containment vs Clipping - Top Rant',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'wiring',
    tags: ['containment', 'clipping', 'cable management', 'installation'],
    level: 'beginner',
    description: 'The differences between containment and clipping methods for cable installation.',
  },
  {
    id: '5k13SbwbiKU',
    title: 'How to Calculate How Long a Cable Is - Easy',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'wiring',
    tags: ['cable', 'calculation', 'measuring', 'basic skills'],
    level: 'beginner',
    description: 'A simple method for calculating cable length on site.',
  },

  // ── Domestic ──────────────────────────────────────────────────────
  {
    id: 'MM2mbr6mkGE',
    title: 'NVQ Assessment Set Up for Domestic',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'domestic',
    tags: ['NVQ', 'domestic', 'assessment', 'set up'],
    level: 'intermediate',
    description: 'How to set up your NVQ assessment for domestic electrical work.',
  },

  // ── Safety ────────────────────────────────────────────────────────
  {
    id: 'YMJzWC_e_Uw',
    title: 'Safe Isolation Info - Where to Test',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'safety',
    tags: ['safe isolation', 'testing', 'procedure', 'safety'],
    level: 'beginner',
    description: 'Useful safe isolation information including where to test - essential for every apprentice.',
  },
  {
    id: 'Hu2uCcYElzQ',
    title: 'Ladder Ratio',
    channel: 'Craig Wiltshire',
    duration: '4:00',
    category: 'safety',
    tags: ['ladder', 'ratio', 'health and safety', 'site'],
    level: 'beginner',
    description: 'The correct ladder ratio and why it matters for site safety.',
  },
  {
    id: 'oHOoq3hV2NA',
    title: 'Ze Hi Trip Current',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'testing-inspection',
    tags: ['Ze', 'trip current', 'testing', 'fault finding'],
    level: 'intermediate',
  },

  // ── Solar / Renewable ─────────────────────────────────────────────
  {
    id: 'Rt-nomGnC40',
    title: 'Solar Thermal Hot Water - How It Works (Units 312/002 NVQ 3)',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'solar-ev',
    tags: ['solar thermal', 'hot water', 'NVQ 3', 'renewable'],
    level: 'intermediate',
    description: 'How solar thermal hot water systems work, covering NVQ 3 units 312 and 002.',
  },

  // ── NVQ Units / Study ─────────────────────────────────────────────
  {
    id: '5L-_aO1-Yaw',
    title: 'Unit 312 (2357) or 002 (1605)',
    channel: 'Craig Wiltshire',
    duration: '12:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', '2357', '1605', 'NVQ'],
    level: 'intermediate',
    description: 'Guidance on NVQ unit 312 from 2357 or unit 002 from 1605.',
  },
  {
    id: 'CTEqzeP297s',
    title: 'Unit 312/002 from 2357 and 1605',
    channel: 'Craig Wiltshire',
    duration: '10:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', '2357', '1605', 'NVQ'],
    level: 'intermediate',
    description: 'Further guidance on completing units 312 and 002 for your NVQ.',
  },
  {
    id: 'mg7i4sM52dk',
    title: '312/002 Video - Easy as 1 2 3',
    channel: 'Craig Wiltshire',
    duration: '8:00',
    category: 'career',
    tags: ['unit 312', 'unit 002', 'easy guide', 'NVQ'],
    level: 'beginner',
    description: 'A simplified walkthrough of units 312 and 002 for your NVQ.',
  },

  // ── Portfolio / Evidence Tips ──────────────────────────────────────
  {
    id: 'A_g9ghHxcz0',
    title: 'How to Use Photo Guides',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'career',
    tags: ['photo guides', 'evidence', 'NVQ', 'portfolio'],
    level: 'beginner',
    description: 'How to use photo guides effectively for your NVQ portfolio evidence.',
  },
  {
    id: 'kgUk6kCS5II',
    title: 'New Photo Upload and Label Guide',
    channel: 'Craig Wiltshire',
    duration: '5:00',
    category: 'career',
    tags: ['photo upload', 'labelling', 'OneFile', 'NVQ'],
    level: 'beginner',
    description: 'Updated guide on uploading and labelling photos for your NVQ evidence.',
  },
  {
    id: 'aWTlt8gao2s',
    title: 'How to Easily Create What You Need',
    channel: 'Craig Wiltshire',
    duration: '6:00',
    category: 'career',
    tags: ['evidence', 'creation', 'NVQ', 'tips'],
    level: 'beginner',
    description: 'Quick tips on creating the evidence you need for your NVQ portfolio.',
  },
  {
    id: 'jb93zSeew3o',
    title: 'OneFile "Show Thumbnails" Simple View Feature',
    channel: 'Craig Wiltshire',
    duration: '3:00',
    category: 'career',
    tags: ['OneFile', 'platform', 'tips', 'NVQ'],
    level: 'beginner',
    description: 'How to use the thumbnail view feature in OneFile for easier navigation.',
  },
];

/** Get videos by category */
export function getVideosByCategory(category: VideoCategory): CuratedVideo[] {
  return curatedVideos.filter(v => v.category === category);
}

/** Get all unique categories that have videos */
export function getAvailableCategories(): VideoCategory[] {
  return Array.from(new Set(curatedVideos.map(v => v.category)));
}
