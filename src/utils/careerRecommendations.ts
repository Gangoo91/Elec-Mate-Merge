/**
 * Career Recommendations Engine
 *
 * Provides intelligent career development suggestions based on user's:
 * - ECS card type
 * - Qualifications
 * - Skills and experience levels
 * - Work history
 */

import { ElecIdSkill, ElecIdQualification, ElecIdWorkHistory } from "@/services/elecIdService";

// ═══════════════════════════════════════════════════════════════════════════
// Type Definitions
// ═══════════════════════════════════════════════════════════════════════════

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  icon: 'zap' | 'sun' | 'flame' | 'cpu' | 'award' | 'trending-up' | 'shield' | 'book' | 'battery' | 'home';
  priority: 'high' | 'medium' | 'low';
  searchQuery: string; // For "Find Courses" button
  category: 'career_progression' | 'certification' | 'specialist' | 'trending';
}

export interface SkillGap {
  id: string;
  skillName: string;
  reason: string;
  icon: 'flame' | 'sun' | 'zap' | 'shield' | 'cpu' | 'network' | 'battery';
  importance: 'essential' | 'recommended' | 'beneficial';
  searchQuery: string;
}

export interface BrushUpSuggestion {
  id: string;
  skillName: string;
  currentLevel: string;
  yearsAtLevel: number;
  suggestion: string;
  suggestionType: 'skill_stagnant' | 'qualification_old' | 'ready_to_advance';
  searchQuery: string;
}

export interface TrendingSkill {
  id: string;
  name: string;
  description: string;
  icon: 'zap' | 'sun' | 'battery' | 'home' | 'network';
  demandLevel: 'high' | 'very_high' | 'growing';
  userHasSkill: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Career Progression Recommendations
// ═══════════════════════════════════════════════════════════════════════════

const CAREER_PROGRESSION_MAP: Record<string, CareerRecommendation[]> = {
  yellow: [ // Apprentice
    {
      id: 'yellow-nvq3',
      title: 'Complete NVQ Level 3',
      description: 'The foundation qualification for becoming a qualified electrician. Required for most ECS card upgrades.',
      reason: 'Essential for career progression from apprentice level',
      icon: 'award',
      priority: 'high',
      searchQuery: 'NVQ Level 3 Electrical Installation course UK',
      category: 'career_progression',
    },
    {
      id: 'yellow-am2',
      title: 'Book AM2 Assessment',
      description: 'Pass the AM2 practical assessment to prove your installation competence and unlock your Gold Card.',
      reason: 'Final step to becoming an approved electrician',
      icon: 'award',
      priority: 'high',
      searchQuery: 'AM2 assessment booking electrical UK',
      category: 'career_progression',
    },
    {
      id: 'yellow-18th',
      title: '18th Edition Wiring Regulations',
      description: 'BS 7671:2018+A2:2022 - the essential regulations qualification every electrician needs.',
      reason: 'Required for all qualified electricians',
      icon: 'book',
      priority: 'high',
      searchQuery: '18th Edition BS7671 course UK',
      category: 'certification',
    },
  ],
  green: [ // Electrician's Mate
    {
      id: 'green-nvq2',
      title: 'Start NVQ Level 2',
      description: 'Begin your formal electrical qualification journey with NVQ Level 2.',
      reason: 'First step towards becoming a qualified electrician',
      icon: 'book',
      priority: 'high',
      searchQuery: 'NVQ Level 2 Electrical Installation course UK',
      category: 'career_progression',
    },
    {
      id: 'green-apprenticeship',
      title: 'Consider Apprenticeship Route',
      description: 'A structured apprenticeship provides on-the-job training with college qualifications.',
      reason: 'Most comprehensive route to qualification',
      icon: 'trending-up',
      priority: 'high',
      searchQuery: 'electrical apprenticeship UK how to apply',
      category: 'career_progression',
    },
    {
      id: 'green-18th',
      title: '18th Edition Wiring Regulations',
      description: 'Get ahead by completing your 18th Edition before finishing your NVQ.',
      reason: 'Shows initiative and commitment to career',
      icon: 'book',
      priority: 'medium',
      searchQuery: '18th Edition BS7671 course UK',
      category: 'certification',
    },
  ],
  blue: [ // Qualified Electrician
    {
      id: 'blue-2391',
      title: 'Get 2391-52 Testing Qualification',
      description: 'Initial and Periodic Inspection & Testing qualification unlocks EICR work.',
      reason: 'Significantly increases your earning potential and job opportunities',
      icon: 'award',
      priority: 'high',
      searchQuery: '2391-52 inspection testing course UK',
      category: 'certification',
    },
    {
      id: 'blue-am2',
      title: 'Complete AM2 for Gold Card',
      description: 'The AM2 assessment demonstrates your practical competence at approved electrician level.',
      reason: 'Upgrade to Gold Card status',
      icon: 'award',
      priority: 'high',
      searchQuery: 'AM2 assessment booking electrical UK',
      category: 'career_progression',
    },
    {
      id: 'blue-ev',
      title: 'EV Charging Installation',
      description: 'With your Blue Card, adding EV certification opens up a rapidly growing market.',
      reason: 'EV installations are in high demand',
      icon: 'zap',
      priority: 'medium',
      searchQuery: 'EV charging installation course City Guilds 2919',
      category: 'specialist',
    },
  ],
  gold: [ // Approved Electrician
    {
      id: 'gold-2391',
      title: '2391-52 Inspection & Testing',
      description: 'If you haven\'t already, add testing to your skillset for complete installation work.',
      reason: 'Essential for signing off your own work',
      icon: 'award',
      priority: 'high',
      searchQuery: '2391-52 inspection testing course UK',
      category: 'certification',
    },
    {
      id: 'gold-ev',
      title: 'EV Charging Certification',
      description: 'The electric vehicle market is booming. Get OZEV-approved installer status.',
      reason: 'Could increase earnings by 15-20% with this specialist skill',
      icon: 'zap',
      priority: 'high',
      searchQuery: 'EV charging installation course City Guilds 2919 OZEV',
      category: 'specialist',
    },
    {
      id: 'gold-solar',
      title: 'Solar PV Installation',
      description: 'Renewable energy is the future. Add solar installation to your services.',
      reason: 'Green energy demand growing rapidly',
      icon: 'sun',
      priority: 'medium',
      searchQuery: 'Solar PV installation course MCS approved UK',
      category: 'specialist',
    },
    {
      id: 'gold-2396',
      title: '2396 Design & Verification',
      description: 'Move into electrical design work with this advanced qualification.',
      reason: 'Higher value work and consultancy opportunities',
      icon: 'trending-up',
      priority: 'medium',
      searchQuery: 'City Guilds 2396 electrical design course UK',
      category: 'career_progression',
    },
    {
      id: 'gold-fire',
      title: 'Fire Alarm Systems (BS 5839)',
      description: 'Commercial and industrial work often requires fire alarm competence.',
      reason: 'Essential for larger commercial contracts',
      icon: 'flame',
      priority: 'medium',
      searchQuery: 'Fire alarm systems BS 5839 course FIA',
      category: 'specialist',
    },
  ],
  black: [ // Manager/Supervisor
    {
      id: 'black-smsts',
      title: 'SMSTS/SSSTS if not held',
      description: 'Site Management Safety Training Scheme - required for most site supervisor roles.',
      reason: 'Industry standard for site management',
      icon: 'shield',
      priority: 'high',
      searchQuery: 'SMSTS course CITB UK',
      category: 'certification',
    },
    {
      id: 'black-contracts',
      title: 'Contracts Management Training',
      description: 'Develop your business and contracts management skills for senior roles.',
      reason: 'Essential for career progression to management',
      icon: 'trending-up',
      priority: 'medium',
      searchQuery: 'electrical contracts management course UK',
      category: 'career_progression',
    },
    {
      id: 'black-cdm',
      title: 'CDM Regulations Training',
      description: 'Understand Construction Design & Management regulations for project oversight.',
      reason: 'Required knowledge for managing larger projects',
      icon: 'book',
      priority: 'medium',
      searchQuery: 'CDM regulations training course UK construction',
      category: 'certification',
    },
  ],
  red: [ // Experienced Worker
    {
      id: 'red-nvq3',
      title: 'Get Formally Qualified - NVQ Level 3',
      description: 'Your experience is valuable. Formalise it with an NVQ based on your existing skills.',
      reason: 'Many providers offer fast-track NVQs for experienced workers',
      icon: 'award',
      priority: 'high',
      searchQuery: 'NVQ Level 3 experienced worker route electrical UK',
      category: 'career_progression',
    },
    {
      id: 'red-18th',
      title: '18th Edition Wiring Regulations',
      description: 'The essential regulations qualification - a must-have for any electrician.',
      reason: 'Foundation of all electrical work',
      icon: 'book',
      priority: 'high',
      searchQuery: '18th Edition BS7671 course UK',
      category: 'certification',
    },
  ],
  white: [ // Electrical Labourer
    {
      id: 'white-mate',
      title: 'Progress to Electrician\'s Mate',
      description: 'Build on your site experience and work towards a more technical role.',
      reason: 'First step on the electrical career ladder',
      icon: 'trending-up',
      priority: 'high',
      searchQuery: 'become electrician mate UK requirements',
      category: 'career_progression',
    },
    {
      id: 'white-safety',
      title: 'Health & Safety Certifications',
      description: 'PASMA, IPAF, and Working at Height certifications increase your value on site.',
      reason: 'More certifications = more opportunities',
      icon: 'shield',
      priority: 'medium',
      searchQuery: 'PASMA IPAF training course UK',
      category: 'certification',
    },
  ],
};

// Default recommendations for unknown or no card type
const DEFAULT_RECOMMENDATIONS: CareerRecommendation[] = [
  {
    id: 'default-18th',
    title: '18th Edition Wiring Regulations',
    description: 'The essential regulations qualification for any electrical work.',
    reason: 'Foundation qualification for all electricians',
    icon: 'book',
    priority: 'high',
    searchQuery: '18th Edition BS7671 course UK',
    category: 'certification',
  },
  {
    id: 'default-ev',
    title: 'EV Charging Installation',
    description: 'One of the fastest growing areas in electrical work.',
    reason: 'High demand skill with excellent earning potential',
    icon: 'zap',
    priority: 'medium',
    searchQuery: 'EV charging installation course UK',
    category: 'specialist',
  },
];

/**
 * Get career progression recommendations based on ECS card type
 */
export function getCareerProgressionRecommendations(
  ecsCardType: string | null,
  qualifications: ElecIdQualification[],
  skills: ElecIdSkill[]
): CareerRecommendation[] {
  const normalizedCardType = ecsCardType?.toLowerCase() || '';
  const qualNames = qualifications.map(q => q.qualification_name.toLowerCase());
  const skillNames = skills.map(s => s.skill_name.toLowerCase());

  // Get base recommendations for card type
  let recommendations = CAREER_PROGRESSION_MAP[normalizedCardType] || DEFAULT_RECOMMENDATIONS;

  // Filter out recommendations for qualifications they already have
  recommendations = recommendations.filter(rec => {
    // Check if user already has this qualification
    const hasQual = qualNames.some(q =>
      q.includes('2391') && rec.id.includes('2391') ||
      q.includes('am2') && rec.id.includes('am2') ||
      q.includes('18th') && rec.id.includes('18th') ||
      q.includes('nvq') && q.includes('level 3') && rec.id.includes('nvq3') ||
      q.includes('nvq') && q.includes('level 2') && rec.id.includes('nvq2') ||
      q.includes('ev') && rec.id.includes('ev') ||
      q.includes('solar') && rec.id.includes('solar') ||
      q.includes('smsts') && rec.id.includes('smsts') ||
      q.includes('fire alarm') && rec.id.includes('fire')
    );

    // Check if user already has this skill
    const hasSkill = skillNames.some(s =>
      s.includes('ev') && rec.id.includes('ev') ||
      s.includes('solar') && rec.id.includes('solar')
    );

    return !hasQual && !hasSkill;
  });

  return recommendations;
}

// ═══════════════════════════════════════════════════════════════════════════
// Skills Gap Analysis
// ═══════════════════════════════════════════════════════════════════════════

interface SkillGapRule {
  condition: (quals: string[], skills: string[], workHistory: ElecIdWorkHistory[]) => boolean;
  gap: SkillGap;
}

const SKILL_GAP_RULES: SkillGapRule[] = [
  // Gold Card without Testing
  {
    condition: (quals, skills) => {
      const hasGoldOrBlue = quals.some(q => q.includes('gold') || q.includes('approved'));
      const has2391 = quals.some(q => q.includes('2391') || q.includes('2394') || q.includes('2395'));
      return hasGoldOrBlue && !has2391;
    },
    gap: {
      id: 'gap-testing',
      skillName: '2391-52 Testing Qualification',
      reason: 'Testing qualification unlocks EICR work and lets you sign off your own installations.',
      icon: 'shield',
      importance: 'essential',
      searchQuery: '2391-52 initial periodic inspection testing course UK',
    },
  },
  // Commercial experience without Fire Alarm
  {
    condition: (quals, skills, workHistory) => {
      const hasCommercialExp = workHistory.some(w =>
        w.job_title?.toLowerCase().includes('commercial') ||
        w.description?.toLowerCase().includes('commercial')
      ) || skills.some(s => s.includes('commercial'));
      const hasFireAlarm = quals.some(q => q.includes('fire alarm') || q.includes('bs 5839'));
      return hasCommercialExp && !hasFireAlarm;
    },
    gap: {
      id: 'gap-fire',
      skillName: 'Fire Alarm Systems (BS 5839)',
      reason: 'Fire alarm competence is essential for commercial electrical work.',
      icon: 'flame',
      importance: 'essential',
      searchQuery: 'Fire alarm systems BS 5839 course FIA UK',
    },
  },
  // Any electrician without EV
  {
    condition: (quals, skills) => {
      const hasEV = quals.some(q => q.includes('ev') || q.includes('electric vehicle')) ||
                    skills.some(s => s.includes('ev') || s.includes('electric vehicle'));
      return !hasEV;
    },
    gap: {
      id: 'gap-ev',
      skillName: 'EV Charging Installation',
      reason: 'The EV market is growing rapidly. OZEV scheme is driving massive demand for installers.',
      icon: 'zap',
      importance: 'recommended',
      searchQuery: 'EV charging installation course City Guilds 2919 UK',
    },
  },
  // Without Solar PV
  {
    condition: (quals, skills) => {
      const hasSolar = quals.some(q => q.includes('solar') || q.includes('pv')) ||
                       skills.some(s => s.includes('solar') || s.includes('pv'));
      return !hasSolar;
    },
    gap: {
      id: 'gap-solar',
      skillName: 'Solar PV Installation',
      reason: 'Green energy demand is booming. Solar skills are increasingly valuable.',
      icon: 'sun',
      importance: 'recommended',
      searchQuery: 'Solar PV installation course MCS UK',
    },
  },
  // Site work without access equipment certs
  {
    condition: (quals, skills, workHistory) => {
      const doesSiteWork = workHistory.some(w =>
        w.job_title?.toLowerCase().includes('site') ||
        w.description?.toLowerCase().includes('site') ||
        w.description?.toLowerCase().includes('construction')
      );
      const hasAccessCerts = quals.some(q =>
        q.includes('ipaf') || q.includes('pasma') || q.includes('working at height')
      );
      return doesSiteWork && !hasAccessCerts;
    },
    gap: {
      id: 'gap-access',
      skillName: 'IPAF / PASMA Certification',
      reason: 'Access equipment certificates are often required for site work.',
      icon: 'shield',
      importance: 'recommended',
      searchQuery: 'IPAF PASMA training course UK',
    },
  },
  // Industrial skills without PLC
  {
    condition: (quals, skills, workHistory) => {
      const hasIndustrial = workHistory.some(w =>
        w.job_title?.toLowerCase().includes('industrial') ||
        w.description?.toLowerCase().includes('industrial') ||
        w.description?.toLowerCase().includes('factory')
      ) || skills.some(s => s.includes('industrial'));
      const hasPLC = quals.some(q => q.includes('plc')) ||
                     skills.some(s => s.includes('plc'));
      return hasIndustrial && !hasPLC;
    },
    gap: {
      id: 'gap-plc',
      skillName: 'PLC Programming',
      reason: 'PLC skills command premium rates in industrial electrical work.',
      icon: 'cpu',
      importance: 'beneficial',
      searchQuery: 'PLC programming course Siemens Allen Bradley UK',
    },
  },
  // Without Battery Storage
  {
    condition: (quals, skills) => {
      const hasBattery = quals.some(q => q.includes('battery') || q.includes('bess')) ||
                         skills.some(s => s.includes('battery') || s.includes('storage'));
      return !hasBattery;
    },
    gap: {
      id: 'gap-battery',
      skillName: 'Battery Storage Systems',
      reason: 'Battery storage is the next big growth area alongside solar and EV.',
      icon: 'battery',
      importance: 'beneficial',
      searchQuery: 'Battery energy storage systems BESS training course UK',
    },
  },
];

/**
 * Analyse skills gaps based on user's profile
 */
export function getSkillsGapRecommendations(
  ecsCardType: string | null,
  qualifications: ElecIdQualification[],
  skills: ElecIdSkill[],
  workHistory: ElecIdWorkHistory[]
): SkillGap[] {
  const qualNames = qualifications.map(q => q.qualification_name.toLowerCase());
  const skillNames = skills.map(s => s.skill_name.toLowerCase());

  const gaps: SkillGap[] = [];

  for (const rule of SKILL_GAP_RULES) {
    if (rule.condition(qualNames, skillNames, workHistory)) {
      gaps.push(rule.gap);
    }
  }

  // Sort by importance
  const importanceOrder = { essential: 0, recommended: 1, beneficial: 2 };
  gaps.sort((a, b) => importanceOrder[a.importance] - importanceOrder[b.importance]);

  // Return top 4 gaps
  return gaps.slice(0, 4);
}

// ═══════════════════════════════════════════════════════════════════════════
// Brush Up Suggestions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate years since a date
 */
function yearsSince(dateString: string | null): number {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const now = new Date();
  return (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365);
}

/**
 * Get brush-up suggestions for stale skills or old qualifications
 */
export function getBrushUpSuggestions(
  skills: ElecIdSkill[],
  qualifications: ElecIdQualification[]
): BrushUpSuggestion[] {
  const suggestions: BrushUpSuggestion[] = [];

  // Check skills at beginner level for 2+ years
  for (const skill of skills) {
    if (skill.skill_level === 'beginner' && skill.years_experience >= 2) {
      suggestions.push({
        id: `brushup-skill-${skill.id}`,
        skillName: skill.skill_name,
        currentLevel: 'Beginner',
        yearsAtLevel: skill.years_experience,
        suggestion: `You've been at beginner level for ${skill.years_experience} years. Consider intermediate training to progress.`,
        suggestionType: 'skill_stagnant',
        searchQuery: `${skill.skill_name} intermediate training course UK`,
      });
    }

    // Intermediate for 5+ years - ready for advanced
    if (skill.skill_level === 'intermediate' && skill.years_experience >= 5) {
      suggestions.push({
        id: `brushup-advance-${skill.id}`,
        skillName: skill.skill_name,
        currentLevel: 'Intermediate',
        yearsAtLevel: skill.years_experience,
        suggestion: `Ready for the next level? With ${skill.years_experience} years experience, consider advanced or specialist training.`,
        suggestionType: 'ready_to_advance',
        searchQuery: `${skill.skill_name} advanced specialist training course UK`,
      });
    }
  }

  // Check old qualifications
  for (const qual of qualifications) {
    const years = yearsSince(qual.date_achieved);
    const qualLower = qual.qualification_name.toLowerCase();

    // 18th Edition more than 3 years old - check for amendments
    if ((qualLower.includes('18th') || qualLower.includes('bs 7671')) && years > 3) {
      suggestions.push({
        id: `brushup-qual-${qual.id}`,
        skillName: qual.qualification_name,
        currentLevel: 'Qualified',
        yearsAtLevel: Math.floor(years),
        suggestion: `Obtained ${Math.floor(years)} years ago. Check you're current on Amendment 2 (2022) updates.`,
        suggestionType: 'qualification_old',
        searchQuery: '18th Edition Amendment 2 update course UK',
      });
    }

    // Any core qualification more than 5 years old
    if (years > 5 && !qualLower.includes('nvq') && !qualLower.includes('am2')) {
      if (qualLower.includes('testing') || qualLower.includes('2391') || qualLower.includes('inspection')) {
        suggestions.push({
          id: `brushup-refresh-${qual.id}`,
          skillName: qual.qualification_name,
          currentLevel: 'Qualified',
          yearsAtLevel: Math.floor(years),
          suggestion: `Obtained ${Math.floor(years)} years ago. A refresher course keeps your knowledge current with the latest standards.`,
          suggestionType: 'qualification_old',
          searchQuery: `${qual.qualification_name} refresher update course UK`,
        });
      }
    }
  }

  // Return top 3 suggestions
  return suggestions.slice(0, 3);
}

// ═══════════════════════════════════════════════════════════════════════════
// Trending Industry Skills
// ═══════════════════════════════════════════════════════════════════════════

const TRENDING_SKILLS: Omit<TrendingSkill, 'userHasSkill'>[] = [
  {
    id: 'trend-ev',
    name: 'EV Charging',
    description: 'OZEV scheme driving installations',
    icon: 'zap',
    demandLevel: 'very_high',
  },
  {
    id: 'trend-solar',
    name: 'Solar PV',
    description: 'Net zero push',
    icon: 'sun',
    demandLevel: 'very_high',
  },
  {
    id: 'trend-battery',
    name: 'Battery Storage',
    description: 'Growing with solar',
    icon: 'battery',
    demandLevel: 'high',
  },
  {
    id: 'trend-heat-pumps',
    name: 'Heat Pumps',
    description: 'Boiler phase-out',
    icon: 'home',
    demandLevel: 'growing',
  },
  {
    id: 'trend-smart-home',
    name: 'Smart Home / KNX',
    description: 'Home automation growth',
    icon: 'home',
    demandLevel: 'growing',
  },
];

/**
 * Get trending industry skills with user's current status
 */
export function getTrendingSkillsRecommendations(
  qualifications: ElecIdQualification[],
  skills: ElecIdSkill[]
): TrendingSkill[] {
  const qualNames = qualifications.map(q => q.qualification_name.toLowerCase());
  const skillNames = skills.map(s => s.skill_name.toLowerCase());

  const allUserSkills = [...qualNames, ...skillNames].join(' ');

  return TRENDING_SKILLS.map(trend => ({
    ...trend,
    userHasSkill: checkUserHasSkill(trend.id, allUserSkills),
  }));
}

function checkUserHasSkill(trendId: string, allSkills: string): boolean {
  switch (trendId) {
    case 'trend-ev':
      return allSkills.includes('ev') || allSkills.includes('electric vehicle') || allSkills.includes('charging');
    case 'trend-solar':
      return allSkills.includes('solar') || allSkills.includes('pv') || allSkills.includes('photovoltaic');
    case 'trend-battery':
      return allSkills.includes('battery') || allSkills.includes('bess') || allSkills.includes('storage');
    case 'trend-heat-pumps':
      return allSkills.includes('heat pump') || allSkills.includes('ashp') || allSkills.includes('gshp');
    case 'trend-smart-home':
      return allSkills.includes('smart home') || allSkills.includes('knx') || allSkills.includes('automation');
    default:
      return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Internal Course Route Mapping
// ═══════════════════════════════════════════════════════════════════════════

// Career Progression Hub routes (with course finder & booking)
const CAREER_HUB_COURSES = '/electrician/career-progression?section=courses';
const CAREER_HUB_EDUCATION = '/electrician/career-progression?section=education';

const INTERNAL_COURSE_ROUTES: Record<string, string> = {
  // 18th Edition / BS7671 - Study Centre has dedicated course
  '18th': '/study-centre/upskilling/bs7671-course',
  'bs7671': '/study-centre/upskilling/bs7671-course',
  'wiring regulations': '/study-centre/upskilling/bs7671-course',

  // Testing & Inspection - Study Centre has dedicated course
  '2391': '/study-centre/upskilling/inspection-testing',
  '2394': '/study-centre/upskilling/inspection-testing',
  '2395': '/study-centre/upskilling/inspection-testing',
  'testing': '/study-centre/upskilling/inspection-testing',
  'inspection': '/study-centre/upskilling/inspection-testing',
  'eicr': '/study-centre/upskilling/inspection-testing',

  // PAT Testing - Study Centre has dedicated course
  'pat': '/study-centre/upskilling/pat-testing-course',

  // Fire Alarm - Study Centre has dedicated course
  'fire alarm': '/study-centre/upskilling/fire-alarm-course',
  'fire detection': '/study-centre/upskilling/fire-alarm-course',
  'bs 5839': '/study-centre/upskilling/fire-alarm-course',

  // Emergency Lighting - Study Centre has dedicated course
  'emergency lighting': '/study-centre/upskilling/emergency-lighting-course',
  'bs 5266': '/study-centre/upskilling/emergency-lighting-course',

  // EV Charging - Study Centre has dedicated course
  'ev': '/study-centre/upskilling/ev-charging-course',
  'electric vehicle': '/study-centre/upskilling/ev-charging-course',
  'ev charging': '/study-centre/upskilling/ev-charging-course',
  'ozev': '/study-centre/upskilling/ev-charging-course',
  '2919': '/study-centre/upskilling/ev-charging-course',

  // Solar / Renewable - Study Centre has dedicated course
  'solar': '/study-centre/upskilling/renewable-energy-course',
  'pv': '/study-centre/upskilling/renewable-energy-course',
  'renewable': '/study-centre/upskilling/renewable-energy-course',
  'battery storage': '/study-centre/upskilling/renewable-energy-course',
  'bess': '/study-centre/upskilling/renewable-energy-course',

  // Smart Home - Study Centre has dedicated course
  'smart home': '/study-centre/upskilling/smart-home-course',
  'home automation': '/study-centre/upskilling/smart-home-course',
  'knx': '/study-centre/upskilling/smart-home-course',

  // Heat Pumps - route to career hub course finder (more options)
  'heat pump': CAREER_HUB_COURSES,
  'ashp': CAREER_HUB_COURSES,
  'gshp': CAREER_HUB_COURSES,

  // Industrial / BMS - Study Centre has dedicated courses
  'bms': '/study-centre/upskilling/bms-course',
  'building management': '/study-centre/upskilling/bms-course',
  'plc': '/study-centre/upskilling/industrial-electrical-course',
  'industrial': '/study-centre/upskilling/industrial-electrical-course',
  'motor control': '/study-centre/upskilling/industrial-electrical-course',

  // Data & Comms - Study Centre has dedicated courses
  'data cabling': '/study-centre/upskilling/data-cabling-course',
  'fibre': '/study-centre/upskilling/fiber-optics-course',
  'fiber': '/study-centre/upskilling/fiber-optics-course',
  'network': '/study-centre/upskilling/data-cabling-course',

  // Apprentice routes - Study Centre apprentice section
  'nvq': '/study-centre/apprentice',
  'am2': '/study-centre/apprentice',
  'apprentice': '/study-centre/apprentice',
  'level 2': '/study-centre/apprentice',
  'level 3': '/study-centre/apprentice',

  // Safety & site courses - Career Hub course finder (external providers)
  'smsts': CAREER_HUB_COURSES,
  'sssts': CAREER_HUB_COURSES,
  'ipaf': CAREER_HUB_COURSES,
  'pasma': CAREER_HUB_COURSES,
  'working at height': CAREER_HUB_COURSES,
  'first aid': CAREER_HUB_COURSES,
  'confined space': CAREER_HUB_COURSES,
  'asbestos': CAREER_HUB_COURSES,

  // Design & advanced qualifications - Career Hub for external courses
  '2396': CAREER_HUB_COURSES,
  'design': CAREER_HUB_COURSES,

  // Further education / degrees - Career Hub education section
  'degree': CAREER_HUB_EDUCATION,
  'hnd': CAREER_HUB_EDUCATION,
  'hnc': CAREER_HUB_EDUCATION,
  'university': CAREER_HUB_EDUCATION,
  'btec': CAREER_HUB_EDUCATION,
  'further education': CAREER_HUB_EDUCATION,

  // Management & contracts - Career Hub course finder
  'contracts management': CAREER_HUB_COURSES,
  'project management': CAREER_HUB_COURSES,
  'cdm': CAREER_HUB_COURSES,

  // Specialist certifications - Career Hub course finder
  'compex': CAREER_HUB_COURSES,
  'high voltage': CAREER_HUB_COURSES,
  'hv': CAREER_HUB_COURSES,

  // Default fallback - Career Hub has comprehensive course search
  'default': CAREER_HUB_COURSES,
};

/**
 * Get internal course URL based on search query keywords
 * Falls back to Career Hub course finder if no match found
 */
export function getCourseSearchUrl(searchQuery: string): string {
  const queryLower = searchQuery.toLowerCase();

  // Check for matching keywords in order of specificity
  for (const [keyword, route] of Object.entries(INTERNAL_COURSE_ROUTES)) {
    if (queryLower.includes(keyword)) {
      return route;
    }
  }

  // Default to Career Hub course finder (has comprehensive search)
  return CAREER_HUB_COURSES;
}

/**
 * Check if the URL is internal (starts with /)
 */
export function isInternalUrl(url: string): boolean {
  return url.startsWith('/');
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Export: Get All Recommendations
// ═══════════════════════════════════════════════════════════════════════════

export interface AllRecommendations {
  careerProgression: CareerRecommendation[];
  skillsGaps: SkillGap[];
  brushUp: BrushUpSuggestion[];
  trending: TrendingSkill[];
  hasAnyRecommendations: boolean;
}

export function getAllRecommendations(
  ecsCardType: string | null,
  qualifications: ElecIdQualification[],
  skills: ElecIdSkill[],
  workHistory: ElecIdWorkHistory[]
): AllRecommendations {
  const careerProgression = getCareerProgressionRecommendations(ecsCardType, qualifications, skills);
  const skillsGaps = getSkillsGapRecommendations(ecsCardType, qualifications, skills, workHistory);
  const brushUp = getBrushUpSuggestions(skills, qualifications);
  const trending = getTrendingSkillsRecommendations(qualifications, skills);

  const hasAnyRecommendations =
    careerProgression.length > 0 ||
    skillsGaps.length > 0 ||
    brushUp.length > 0 ||
    trending.some(t => !t.userHasSkill);

  return {
    careerProgression,
    skillsGaps,
    brushUp,
    trending,
    hasAnyRecommendations,
  };
}
