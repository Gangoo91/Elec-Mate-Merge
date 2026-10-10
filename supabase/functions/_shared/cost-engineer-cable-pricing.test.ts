// Cable pricing guards — 10 Oct 2026. Real product names from
// marketplace_products. Run: deno test --no-check supabase/functions/_shared/cost-engineer-cable-pricing.test.ts
import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { parseContainerSize, lookupPriceRange, isCategoryMismatch, cableSizeOf } from './cost-engineer-core.ts';

const cases: Array<[string, number]> = [
  ['Prysmian 6242Y Grey 4mm²  Twin & Earth Cable 50m Drum', 50],
  ['6242Y 2.5mm Grey Twin &amp; Earth Cable, 24 Amps, 1m', 1],
  ['Refurb Prysmian 6242Y Grey 2.5mm²  Twin & Earth Cable 100m Drum', 100],
  ['Primes DIY Electric Socket wire cable 2.5mm Twin and Earth Flat Grey PVC Lighting Electric Cable 6242Y BASEC Approved (2 Meter)', 2],
  ['SHPELEC 1.5mm Twin and Earth Cable 6242Y Grey, 15m - Lighting Circuit Wire, BASEC Approved', 15],
  ['Prysmian 6242Y Grey 2.5mm²  Twin & Earth Cable 10m Coil', 10],
  ['TE1.5-50 Wiring House Twin &amp; Earth Cable 1.5mm² Grey 18 Amps 50M', 50],
  ['6242Y 16.0mm Grey Twin &amp; Earth Cable, 70 Amps, 50m', 50],
  ['Primes DIY Electric Socket wire cable 1mm Twin and Earth Flat Grey PVC Lighting Electric Cable 6242Y BASEC Approved (70 Metre)', 70],
  ['Twin & Earth Cable - 2.5mm2 x 50m', 50],
  ['Doncaster Cables Earthsure Flat Twin & Earth Cable 6.0mm2 3m Grey', 3],
  ['Pitacs Twin & Earth Cable (6242Y) Grey 2.5mm2 Drum', 50], // no length → default drum
];

Deno.test('container length is the real length, never the 5m inside 2.5mm', () => {
  for (const [name, want] of cases) assertEquals(parseContainerSize(name, 'metre'), want, name);
});

Deno.test('cable size comes from the text', () => {
  assertEquals(cableSizeOf('2.5mm² Twin and Earth Cable'), '2.5');
  assertEquals(cableSizeOf('Doncaster 6.0mm2 3m'), '6');
  assertEquals(cableSizeOf('1.0mm² Twin and Earth'), '1');
  assertEquals(cableSizeOf('Twin and earth'), null);
});

Deno.test('price band follows the item priced, not the matched product', () => {
  const c = { description: '2.5mm² Twin and Earth Cable', category: 'cables', unit: 'metre' } as never;
  const band = lookupPriceRange(c, 'Doncaster Cables Earthsure Flat Twin & Earth Cable 6.0mm2 3m Grey');
  assertEquals(band?.max, 3.5);
});

Deno.test('a different conductor size is rejected', () => {
  const c = { description: '2.5mm² Twin and Earth Cable', category: 'cables', unit: 'metre' } as never;
  assertEquals(isCategoryMismatch(c, { name: 'Doncaster Cables Earthsure Flat Twin & Earth Cable 6.0mm2 3m Grey' } as never), true);
  assertEquals(isCategoryMismatch(c, { name: 'Prysmian 6242Y Grey 2.5mm²  Twin & Earth Cable 100m Drum' } as never), false);
});

import { statedCableLength } from './cost-engineer-core.ts';
Deno.test('only stated lengths count for the cable picker', () => {
  assertEquals(statedCableLength('Doncaster Cables Twin & Earth Cable (6242Y) Grey 2.5mm2 Coil'), null);
  assertEquals(statedCableLength('Prysmian 6242Y Grey 2.5mm²  Twin & Earth Cable 100m Drum'), 100);
  assertEquals(statedCableLength('6242Y 2.5mm Grey Twin & Earth Cable, 24 Amps, 1m'), 1);
  assertEquals(statedCableLength('2.5mm T&E Cut To Length'), 1);
});

import { isNonProductLine, isPackLine, isEarthConductorLine } from './cost-engineer-core.ts';
Deno.test('fees and hire are not catalogue products; wastage still is', () => {
  assertEquals(isNonProductLine('Part P Building Regulations notification fee'), true);
  assertEquals(isNonProductLine('Wall Chaser Hire'), true);
  assertEquals(isNonProductLine('Cable wastage allowance (5%)'), false);
  assertEquals(isNonProductLine('Double socket'), false);
});
Deno.test('packs keep the pack price', () => {
  assertEquals(isPackLine('Cable ties pack'), true);
  assertEquals(isPackLine('WAGO lever connector assortment'), true);
  assertEquals(isPackLine('100A Service Tail Set'), false);
  assertEquals(isPackLine('Pendant Lamp Holder Set'), false);
  assertEquals(isPackLine('32A Type B MCB'), false);
});
Deno.test('earth conductors never match twin & earth', () => {
  const c = { description: '10mm² Main Earthing Conductor', category: 'earthing', unit: 'metre' } as never;
  assertEquals(isEarthConductorLine('10mm² Main Earthing Conductor'), true);
  assertEquals(isCategoryMismatch(c, { name: 'Doncaster Cables Twin & Earth Cable (6242Y) Grey 10.0mm2 Drum' } as never), true);
  assertEquals(isCategoryMismatch(c, { name: '10.0mm² Green Yellow 6491X Single Core Cable - Cut to length' } as never), false);
});

import { matchPriceBook } from './cost-engineer-core.ts';
Deno.test('price book: strict matches only', () => {
  const book = [
    { name: 'Lewdon RCBO', unit: 'each', cost: 14 },
    { name: '2.5mm twin & earth', unit: 'item', cost: 86.95 },                 // a drum with no length — unusable per metre
    { name: 'H6242Y 4mm² PVC T+E Twin and Earth Cable Grey (50m drum)', unit: 'item', cost: 95 },
    { name: 'labour for installation of the new circuit', unit: 'each', cost: 280 },
  ];
  const rcbo = matchPriceBook({ description: 'Lewdon 32A Type A RCBO', category: 'circuit-protection', unit: 'item', quantity: 6 } as never, book);
  assertEquals(rcbo?.unitPrice, 14);
  assertEquals(rcbo?.source.table, 'price_book');
  assertEquals(matchPriceBook({ description: '2.5mm² Twin and Earth Cable', category: 'cables', unit: 'metre', quantity: 100 } as never, book), null);
  assertEquals(matchPriceBook({ description: '4mm² Twin and Earth Cable', category: 'cables', unit: 'metre', quantity: 30 } as never, book)?.unitPrice, 1.9);
  assertEquals(matchPriceBook({ description: 'Wylex 32A RCBO', category: 'circuit-protection', unit: 'item', quantity: 1 } as never, book), null);
});

Deno.test('price book: a spec word the book item lacks blocks the match', () => {
  const book = [{ name: 'White Double Socket', unit: 'each', cost: 2.52 }, { name: 'Install Socket Outlet', unit: 'each', cost: 86.39 }];
  assertEquals(matchPriceBook({ description: '13A Double Socket Outlet, White Moulded, Switched', category: 'wiring-accessories', unit: 'item', quantity: 2 } as never, book)?.unitPrice, 2.52);
  assertEquals(matchPriceBook({ description: '13A Double Socket Outlet, White Moulded, IP66 Weatherproof', category: 'wiring-accessories', unit: 'item', quantity: 1 } as never, book), null);
  assertEquals(matchPriceBook({ description: 'MK 13A Single Socket Outlet White', category: 'wiring-accessories', unit: 'item', quantity: 4 } as never, book), null);
});

Deno.test('finish and label mismatches', () => {
  const pendant = { description: 'Pendant Lamp Holder Set', category: 'lighting', unit: 'item' } as never;
  assertEquals(isCategoryMismatch(pendant, { name: '4.4 ( 5 ) Vintage Antique Copper Pendant Cable Set Black Cable' } as never), true);
  const chrome = { description: '1 Gang 2 Way Light Switch Chrome', category: 'wiring-accessories', unit: 'item' } as never;
  assertEquals(isCategoryMismatch(chrome, { name: 'BG Nexus Polished Chrome 1 Gang 2 Way Switch' } as never), false);
  const labels = { description: 'Consumer Unit Label Set', category: 'consumer-units', unit: 'item' } as never;
  assertEquals(isCategoryMismatch(labels, { name: 'Blank for Consumer Unit' } as never), true);
});

Deno.test('review cases', () => {
  // back boxes are single items, priced per box from a 10-pack
  assertEquals(isPackLine('Metal back box 35mm'), false);
  assertEquals(isPackLine('Junction box'), false);
  assertEquals(isPackLine('Box of 100 cable ties'), true);
  // a size followed by "meter" is not a length
  assertEquals(statedCableLength('25mm2 meter tails 1m'), 1);
  assertEquals(parseContainerSize('25mm2 meter tails 1m', 'metre'), 1);
  assertEquals(parseContainerSize('6.0mm² Green Yellow 6491X Single Core Cable - Cut to length (Max. 100Mtrs)', 'metre'), 1);
  // price book ratings and types must agree; fuller products don't match
  const book = [
    { name: 'Consumer unit 6 way', unit: 'each', cost: 45 },
    { name: 'Type AC RCBO 32A', unit: 'each', cost: 9 },
    { name: 'Smoke alarm', unit: 'each', cost: 20 },
    { name: 'Cooker switch', unit: 'each', cost: 12 },
  ];
  const m = (description: string, category: string) => matchPriceBook({ description, category, unit: 'item', quantity: 1 } as never, book);
  assertEquals(m('Consumer unit 10 way', 'consumer-units'), null);
  assertEquals(m('Consumer unit 6 way', 'consumer-units')?.unitPrice, 45);
  assertEquals(m('Type A RCBO 32A', 'circuit-protection'), null);
  assertEquals(m('Smoke alarm mounting base', 'fire-security'), null);
  assertEquals(m('Cooker switch with socket', 'wiring-accessories'), null);
  assertEquals(m('Smoke alarm', 'fire-security')?.unitPrice, 20);
});
