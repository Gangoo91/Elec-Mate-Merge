/**
 * ingest-qualification-pdfs.ts
 *
 * Extracts C&G and EAL qualification PDF content into the
 * qualification_requirements table for RAG-based portfolio/diary coaching.
 *
 * Usage:
 *   npm install pdf-parse --save-dev
 *   npx tsx scripts/ingest-qualification-pdfs.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 * (or set them inline below for one-off runs).
 */

import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';

// --------------- Config ---------------
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY env var');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DOWNLOADS = path.join(process.env.HOME || '/Users/andrewmoore', 'Downloads');

// Stop words to strip from keywords
const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'shall',
  'can',
  'need',
  'must',
  'it',
  'its',
  'this',
  'that',
  'these',
  'those',
  'they',
  'them',
  'their',
  'he',
  'she',
  'his',
  'her',
  'we',
  'our',
  'you',
  'your',
  'my',
  'me',
  'who',
  'which',
  'what',
  'when',
  'where',
  'how',
  'why',
  'all',
  'each',
  'every',
  'both',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'not',
  'only',
  'same',
  'so',
  'than',
  'too',
  'very',
  'just',
  'because',
  'as',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'between',
  'out',
  'off',
  'over',
  'under',
  'again',
  'then',
  'once',
  'here',
  'there',
  'about',
  'up',
  'if',
  'also',
  'any',
  'etc',
]);

// Domain-specific terms to always include when found
const DOMAIN_TERMS = new Set([
  'rcd',
  'rcbo',
  'mcb',
  'mccb',
  'acb',
  'fuse',
  'earth',
  'earthing',
  'bonding',
  'containment',
  'trunking',
  'conduit',
  'swa',
  'cable',
  'inspection',
  'testing',
  'bs7671',
  'pat',
  'eicr',
  'eic',
  'minor',
  'wiring',
  'circuit',
  'voltage',
  'current',
  'resistance',
  'impedance',
  'insulation',
  'continuity',
  'polarity',
  'zs',
  'ze',
  'r1r2',
  'installation',
  'maintenance',
  'fault',
  'protection',
  'overload',
  'short-circuit',
  'discrimination',
  'selectivity',
  'regulation',
  'consumer',
  'distribution',
  'board',
  'panel',
  'switchgear',
  'transformer',
  'motor',
  'lighting',
  'emergency',
  'fire',
  'alarm',
  'socket',
  'accessory',
  'luminaire',
  'lamp',
  'led',
  'fluorescent',
  'three-phase',
  'single-phase',
  'neutral',
  'live',
  'cpc',
  'pvc',
  'xlpe',
  'lsf',
  'swa',
  'micc',
  'flex',
  'rigid',
  'tray',
  'ladder',
  'basket',
  'dado',
  'mini',
  'maxi',
  'ip',
  'ingress',
  'hazardous',
  'zone',
  'atex',
  'explosive',
  'safe',
  'safety',
  'isolation',
  'lockout',
  'permit',
  'coshh',
  'ppe',
  'risk',
  'assessment',
  'method',
  'statement',
  'rams',
  'commissioning',
  'handover',
  'certificate',
  'compliance',
  'design',
  'specification',
  'drawing',
  'schematic',
  'diagram',
  'load',
  'demand',
  'diversity',
  'volt-drop',
  'cable-size',
  'adiabatic',
  'correction',
  'factor',
  'grouping',
  'derating',
  'thermoplastic',
  'thermosetting',
  'armoured',
  'unarmoured',
  'domestic',
  'commercial',
  'industrial',
  'agricultural',
  'special',
  'location',
  'bathroom',
  'swimming',
  'construction',
  'temporary',
  'outdoor',
  'caravan',
  'marina',
  'solar',
  'pv',
  'ev',
  'charger',
  'battery',
  'storage',
  'inverter',
  'generation',
  'renewable',
  'smart',
  'meter',
  'tariff',
  'supply',
  'dni',
  'dno',
]);

interface QualificationRow {
  qualification_code: string;
  qualification_name: string;
  unit_code: string;
  unit_title: string;
  learning_outcome_number: string | null;
  learning_outcome: string;
  assessment_criteria: string[];
  topic_area: string | null;
  keywords: string[];
  content_text: string;
  level: number | null;
}

// --------------- Keyword extraction ---------------
function extractKeywords(texts: string[]): string[] {
  const combined = texts.join(' ').toLowerCase();
  const words = combined.match(/[a-z][a-z0-9-]+/g) || [];
  const unique = new Set<string>();

  for (const w of words) {
    if (w.length < 3) continue;
    if (STOP_WORDS.has(w)) continue;
    unique.add(w);
  }

  // Always add domain terms found in text
  for (const term of DOMAIN_TERMS) {
    if (combined.includes(term)) {
      unique.add(term);
    }
  }

  return Array.from(unique);
}

// --------------- Classify topic area ---------------
function classifyTopic(text: string): string | null {
  const lower = text.toLowerCase();
  const topics: [string, string[]][] = [
    [
      'Health & Safety',
      [
        'health',
        'safety',
        'ppe',
        'risk',
        'hazard',
        'coshh',
        'isolation',
        'permit',
        'first aid',
        'accident',
      ],
    ],
    [
      'Wiring & Containment',
      [
        'wiring',
        'cable',
        'containment',
        'trunking',
        'conduit',
        'tray',
        'swa',
        'termination',
        'jointing',
      ],
    ],
    [
      'Testing & Inspection',
      [
        'testing',
        'inspection',
        'continuity',
        'insulation',
        'polarity',
        'impedance',
        'rcd',
        'eicr',
        'commissioning',
      ],
    ],
    [
      'Regulations',
      [
        'regulation',
        'bs7671',
        'standard',
        'building',
        'wiring regulations',
        'compliance',
        'amendment',
      ],
    ],
    [
      'Design',
      [
        'design',
        'calculation',
        'cable sizing',
        'volt drop',
        'load',
        'diversity',
        'schematic',
        'drawing',
      ],
    ],
    [
      'Protection',
      ['protection', 'overcurrent', 'overload', 'fault', 'mcb', 'rcbo', 'fuse', 'discrimination'],
    ],
    [
      'Earthing & Bonding',
      ['earthing', 'bonding', 'earth', 'cpc', 'electrode', 'tn-s', 'tn-c-s', 'tt'],
    ],
    [
      'Environmental',
      ['environment', 'energy', 'efficiency', 'renewable', 'solar', 'sustainability'],
    ],
    ['Communication', ['communication', 'customer', 'client', 'teamwork', 'supervision', 'report']],
    [
      'Science & Principles',
      [
        'science',
        'ohm',
        'kirchhoff',
        'resistance',
        'capacitance',
        'inductance',
        'magnetism',
        'electron',
        'atom',
      ],
    ],
  ];

  for (const [topic, terms] of topics) {
    if (terms.some((t) => lower.includes(t))) {
      return topic;
    }
  }
  return null;
}

// --------------- PDF Parsers ---------------

/**
 * Generic parser for C&G qualification handbooks.
 * These follow a pattern of "Unit XXX:" → Learning outcomes → Assessment criteria.
 */
function parseCGHandbook(
  text: string,
  qualCode: string,
  qualName: string,
  level: number
): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Split into unit sections
  // C&G handbooks typically have "Unit XXX" or "Unit XXX:" headings
  const unitPattern = /(?:^|\n)(?:Unit\s+)(\d{3})\s*[-:]\s*([^\n]+)/gi;
  const unitMatches: { code: string; title: string; startIndex: number }[] = [];

  let match;
  while ((match = unitPattern.exec(text)) !== null) {
    unitMatches.push({
      code: match[1],
      title: match[2].trim(),
      startIndex: match.index,
    });
  }

  if (unitMatches.length === 0) {
    // Fallback: try to find learning outcomes without unit headers
    console.warn(`  No unit headers found for ${qualCode}, attempting flat LO parse`);
    return parseFlatLOs(text, qualCode, qualName, 'GENERAL', 'General Content', level);
  }

  for (let i = 0; i < unitMatches.length; i++) {
    const unit = unitMatches[i];
    const nextStart = i + 1 < unitMatches.length ? unitMatches[i + 1].startIndex : text.length;
    const unitText = text.substring(unit.startIndex, nextStart);

    const loRows = parseFlatLOs(unitText, qualCode, qualName, unit.code, unit.title, level);
    rows.push(...loRows);
  }

  return rows;
}

/**
 * Parse learning outcomes and assessment criteria from a text block.
 */
function parseFlatLOs(
  text: string,
  qualCode: string,
  qualName: string,
  unitCode: string,
  unitTitle: string,
  level: number
): QualificationRow[] {
  const rows: QualificationRow[] = [];

  // Pattern for learning outcomes
  // Common patterns: "Learning outcome 1", "LO1", "The learner will: 1."
  const loPattern =
    /(?:Learning\s+outcome\s+(\d+(?:\.\d+)?)\s*[-:]?\s*([^\n]+)|(?:The\s+learner\s+will[:\s]+)(\d+)\.\s*([^\n]+))/gi;

  const loMatches: { number: string; text: string; startIndex: number }[] = [];
  let loMatch;
  while ((loMatch = loPattern.exec(text)) !== null) {
    loMatches.push({
      number: (loMatch[1] || loMatch[3]).trim(),
      text: (loMatch[2] || loMatch[4]).trim(),
      startIndex: loMatch.index,
    });
  }

  if (loMatches.length === 0) {
    // Create a single row for the whole unit if no LOs found
    const acList = extractACsFromText(text);
    const contentText = `${unitTitle} | ${acList.join(' | ')}`;
    rows.push({
      qualification_code: qualCode,
      qualification_name: qualName,
      unit_code: unitCode,
      unit_title: unitTitle,
      learning_outcome_number: null,
      learning_outcome: unitTitle,
      assessment_criteria: acList,
      topic_area: classifyTopic(contentText),
      keywords: extractKeywords([unitTitle, ...acList]),
      content_text: contentText,
      level,
    });
    return rows;
  }

  for (let i = 0; i < loMatches.length; i++) {
    const lo = loMatches[i];
    const nextStart = i + 1 < loMatches.length ? loMatches[i + 1].startIndex : text.length;
    const loSection = text.substring(lo.startIndex, nextStart);

    const acList = extractACsFromText(loSection);
    const contentText = `${lo.text} | ${acList.join(' | ')}`;

    rows.push({
      qualification_code: qualCode,
      qualification_name: qualName,
      unit_code: unitCode,
      unit_title: unitTitle,
      learning_outcome_number: lo.number,
      learning_outcome: lo.text,
      assessment_criteria: acList,
      topic_area: classifyTopic(contentText),
      keywords: extractKeywords([unitTitle, lo.text, ...acList]),
      content_text: contentText,
      level,
    });
  }

  return rows;
}

/**
 * Extract assessment criteria text lines from a section.
 */
function extractACsFromText(text: string): string[] {
  const acs: string[] = [];

  // Pattern: "1.1", "2.3", "AC 1.1" etc. followed by text
  const acPattern = /(?:^|\n)\s*(?:AC\s*)?(\d+\.\d+)\s*[-:.]\s*([^\n]+)/gi;
  let acMatch;
  while ((acMatch = acPattern.exec(text)) !== null) {
    const acText = `${acMatch[1]} ${acMatch[2].trim()}`;
    if (acText.length > 5) {
      acs.push(acText);
    }
  }

  return acs;
}

/**
 * Parse EAL unit PDFs (NETP3, N18ED3).
 * EAL format tends to be: Unit Title → Learning Outcomes → Assessment Criteria
 */
function parseEALUnit(
  text: string,
  qualCode: string,
  qualName: string,
  unitCode: string,
  level: number
): QualificationRow[] {
  // Try to extract unit title from first few lines
  const lines = text.split('\n').filter((l) => l.trim().length > 3);
  let unitTitle =
    lines.slice(0, 5).find((l) => l.length > 10 && !l.match(/^(EAL|Issue|Page|www)/i)) ||
    `${qualCode} ${unitCode}`;
  unitTitle = unitTitle.trim();

  return parseFlatLOs(text, qualCode, qualName, unitCode, unitTitle, level);
}

// --------------- PDF Definitions ---------------
interface PDFSource {
  file: string;
  qualCode: string;
  qualName: string;
  level: number;
  parser: 'cg' | 'eal';
  unitCode?: string; // For single-unit EAL PDFs
}

const PDF_SOURCES: PDFSource[] = [
  // C&G Level 2
  {
    file: '2365-02_l2_electrical_installation_qualification_handbook_v1-11-pdf-pdf.pdf',
    qualCode: '2365-02',
    qualName: 'C&G 2365-02 Level 2 Diploma in Electrical Installations',
    level: 2,
    parser: 'cg',
  },
  // C&G Level 3
  {
    file: '2365-03_l3_diploma_qualification_handbook_v1-12-pdf.pdf',
    qualCode: '2365-03',
    qualName: 'C&G 2365-03 Level 3 Diploma in Electrical Installations',
    level: 3,
    parser: 'cg',
  },
  // C&G NVQ Level 3
  {
    file: '2366-03_qualification_handbook_v1,-d-,5-pdf.pdf',
    qualCode: '2366-03',
    qualName: 'C&G 2366-03 Level 3 NVQ Diploma in Electrotechnical Technology',
    level: 3,
    parser: 'cg',
  },
  // EAL NETP3 units — qualCode matches '603/3929/9' in qualifications table
  {
    file: 'EAL-NETP3-01-ISSUE-1.2-0220.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-01',
  },
  {
    file: 'EAL-NETP3-03-ISSUE-1.1-1115.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-03',
  },
  {
    file: 'EAL-NETP3-04-ISSUE-1.2-0220.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-04',
  },
  {
    file: 'EAL-NETP3-05-ISSUE-1.2-0220.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-05',
  },
  {
    file: 'EAL-NETP3-06-ISSUE-1.5-0822.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-06',
  },
  {
    file: 'EAL-NETP3-07-ISSUE-1.2-0220.pdf',
    qualCode: '603/3929/9',
    qualName: 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment',
    level: 3,
    parser: 'eal',
    unitCode: 'NETP3-07',
  },
  // EAL 18th Edition — qualCode matches 'EAL-600/4341/5' in qualifications table
  {
    file: 'EAL-N18ED3-1-DP-ISSUE 1.1-0120.pdf',
    qualCode: 'EAL-600/4341/5',
    qualName: 'EAL Level 3 Award in the Requirements for Electrical Installations',
    level: 3,
    parser: 'eal',
    unitCode: 'N18ED3-01',
  },
];

// --------------- Main ---------------
async function main() {
  console.log('=== Qualification PDF Ingestion ===\n');

  // Clear existing data
  console.log('Clearing existing qualification_requirements data...');
  const { error: deleteError } = await supabase
    .from('qualification_requirements')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all

  if (deleteError) {
    console.error('Delete error:', deleteError);
    // Table might not exist yet — continue anyway
  }

  let totalRows = 0;

  for (const source of PDF_SOURCES) {
    const filePath = path.join(DOWNLOADS, source.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP: ${source.file} not found`);
      continue;
    }

    console.log(`\nProcessing: ${source.file}`);
    const buffer = fs.readFileSync(filePath);
    const pdf = await pdfParse(buffer);
    const text = pdf.text;
    console.log(`  Pages: ${pdf.numpages}, Characters: ${text.length}`);

    let rows: QualificationRow[];
    if (source.parser === 'cg') {
      rows = parseCGHandbook(text, source.qualCode, source.qualName, source.level);
    } else {
      rows = parseEALUnit(text, source.qualCode, source.qualName, source.unitCode!, source.level);
    }

    console.log(`  Extracted ${rows.length} rows`);

    if (rows.length === 0) {
      console.warn(`  WARNING: No rows extracted from ${source.file}`);
      continue;
    }

    // Insert in batches of 50
    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50);
      const { error: insertError } = await supabase
        .from('qualification_requirements')
        .insert(batch);

      if (insertError) {
        console.error(`  Insert error (batch ${i / 50 + 1}):`, insertError);
      }
    }

    totalRows += rows.length;
  }

  console.log(`\n=== Done! Inserted ${totalRows} rows total ===`);

  // Verify with a test search
  console.log('\nTest search: ["wiring", "containment"] with 2365-03...');
  const { data: testData, error: testError } = await supabase.rpc(
    'search_qualification_requirements',
    {
      p_keywords: ['wiring', 'containment'],
      p_qualification_code: '2365-03',
      p_limit: 5,
    }
  );

  if (testError) {
    console.error('Test search error:', testError);
  } else {
    console.log(`Found ${testData?.length || 0} results:`);
    for (const row of (testData || []).slice(0, 3)) {
      console.log(`  - ${row.unit_code}: ${row.learning_outcome?.substring(0, 80)}`);
    }
  }
}

main().catch(console.error);
