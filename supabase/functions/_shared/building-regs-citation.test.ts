// Guards the Building Regulations sources added to the RAG on 30 Sep 2026.
// Run: deno test supabase/functions/_shared/building-regs-citation.test.ts
//
// The failure these catch is silent and serious: a formatter that renders an
// Approved Document paragraph as "Reg 2.5" hands the model a BS 7671
// regulation that does not exist, and it repeats it to the user.
import { assertEquals, assert } from 'https://deno.land/std@0.190.0/testing/asserts.ts';
import { buildingRegsCitation, legislationProvision } from './building-regs-citation.ts';
import { understandBS7671Query } from './bs7671-query-understanding.ts';
import { formatFacetsForPrompt } from './bs7671-facets-rag.ts';

const ADP = 'Approved Document P (England) 2013';
const BR = 'Building Regulations 2010 (revised to 30 Sep 2026)';

Deno.test('Approved Document citations name the document', () => {
  assertEquals(buildingRegsCitation('approved_doc', ADP, '2.5'), `${ADP} para 2.5`);
  assertEquals(buildingRegsCitation('approved_doc', ADP, 'P1'), `${ADP}, requirement P1`);
  assertEquals(buildingRegsCitation('approved_doc', 'AD B', 'B24'), 'AD B para B24');
  assertEquals(buildingRegsCitation('approved_doc', ADP, 'AppA'), `${ADP}, Appendix A`);
});

Deno.test('legislation provisions read like the law cites them', () => {
  assertEquals(legislationProvision('reg12'), 'reg 12');
  assertEquals(legislationProvision('reg12-W'), 'reg 12 (Wales)');
  assertEquals(legislationProvision('reg44ZA-W'), 'reg 44ZA (Wales)');
  assertEquals(legislationProvision('reg11W'), 'reg 11W'); // a real regulation number, not Wales
  assertEquals(legislationProvision('Sch1-P'), 'Schedule 1 Part P');
  assertEquals(legislationProvision('Sch3-W'), 'Schedule 3 (Wales)'); // not "Part W"
  assertEquals(legislationProvision('Sch4'), 'Schedule 4');
  assertEquals(buildingRegsCitation('legislation', BR, 'reg12'), `${BR} reg 12`);
});

Deno.test('prompt formatter never cites Building Regs as "Reg N"', () => {
  const out = formatFacetsForPrompt([
    {
      facetId: 'x', regNumber: '2.5', regTitle: null, part: null, chapter: null, section: null,
      documentType: 'approved_doc', editionCode: ADP, pageNumber: 14, facetType: 'requirement',
      primaryTopic: 'notifiable work', content: 'Replacing a consumer unit is notifiable.',
      contextPrefix: null, systemTypes: null, zones: null, equipmentCategory: null,
      protectionMethod: null, score: 1, retrievalSource: 'hybrid',
    },
  ]);
  assert(out.includes(`${ADP} para 2.5`), out);
  assert(!/\bReg 2\.5\b/.test(out), out);
});

Deno.test('Building Regs questions route to the building-regs topic', () => {
  const yes = [
    'Is replacing a consumer unit notifiable under Part P?',
    'do I need to notify building control for a new socket in a kitchen',
    'what height should sockets be under part M',
    'how often must a landlord get an EICR',
    'AD S charge point requirements for new homes',
    'what does approved document F say about extractor fans',
  ];
  const no = ['part protection of the cable', 'max zs for a 32A type B', 'ring final r1+r2 test'];
  for (const q of yes) assert(understandBS7671Query(q).topic_tags.includes('building-regs'), q);
  for (const q of no) assert(!understandBS7671Query(q).topic_tags.includes('building-regs'), q);
});
