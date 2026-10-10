// ELE-2071: renders ten made-up receipts and supplier bills (fictional firms,
// no real people) to e2e/fixtures/receipts as PNG / PDF, plus expected.json,
// for scripts/receipts/run-receipt-samples.ts. Run: node scripts/receipts/make-receipt-samples.mjs
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = new URL('../../e2e/fixtures/receipts/', import.meta.url).pathname;

const till = (o) => `<div style="width:300px;padding:18px;font:13px/1.35 'Courier New',monospace;background:#fff;color:#111">
<div style="text-align:center;font-weight:bold;font-size:15px">${o.name}</div>
<div style="text-align:center">${o.addr}</div>
${o.vatno ? `<div style="text-align:center">VAT No: ${o.vatno}</div>` : ''}
<div style="margin:8px 0;border-top:1px dashed #000"></div>
<div>${o.when}</div>${o.ref ? `<div>${o.ref}</div>` : ''}
<div style="margin:8px 0;border-top:1px dashed #000"></div>
${o.lines.map(([d, p]) => `<div style="display:flex;justify-content:space-between"><span>${d}</span><span>${p}</span></div>`).join('')}
<div style="margin:8px 0;border-top:1px dashed #000"></div>
${o.foot.map(([d, p], i) => `<div style="display:flex;justify-content:space-between;${i === o.boldAt ? 'font-weight:bold;font-size:15px' : ''}"><span>${d}</span><span>${p}</span></div>`).join('')}
<div style="margin:10px 0 0;text-align:center">${o.thanks ?? 'THANK YOU'}</div></div>`;

const bill = (o) => `<div style="width:760px;padding:40px;font:14px/1.45 Arial,sans-serif;background:#fff;color:#111">
<div style="display:flex;justify-content:space-between"><div><div style="font-size:24px;font-weight:bold">${o.name}</div><div>${o.addr}</div><div>VAT Reg No. ${o.vatno}</div></div>
<div style="text-align:right"><div style="font-size:22px;font-weight:bold">INVOICE</div><div>Invoice no: ${o.inv}</div><div>Date: ${o.date}</div><div>Account: ${o.acct}</div><div>Terms: 30 days</div></div></div>
<div style="margin-top:24px"><b>Invoice to:</b><br>Brightwire Electrical Ltd<br>Unit 4, Mill Lane, Oldham OL1 1AA<br>Your order ref: ${o.po}</div>
<table style="width:100%;margin-top:24px;border-collapse:collapse"><tr style="background:#eee"><th style="text-align:left;padding:6px">Description</th><th>Qty</th><th style="text-align:right">Unit</th><th style="text-align:right;padding:6px">Net</th></tr>
${o.lines.map(([d, q, u, n]) => `<tr><td style="padding:6px;border-bottom:1px solid #ddd">${d}</td><td style="text-align:center">${q}</td><td style="text-align:right">${u}</td><td style="text-align:right;padding:6px">${n}</td></tr>`).join('')}</table>
<div style="margin-top:16px;margin-left:auto;width:280px">
<div style="display:flex;justify-content:space-between"><span>Net total</span><span>£${o.net}</span></div>
<div style="display:flex;justify-content:space-between"><span>VAT @ 20%</span><span>£${o.vat}</span></div>
<div style="display:flex;justify-content:space-between;font-weight:bold;font-size:17px;border-top:2px solid #000;margin-top:4px;padding-top:4px"><span>Total due</span><span>£${o.gross}</span></div></div>
<div style="margin-top:30px;font-size:12px">Bank: Sort 00-00-00 Acc 00000000 (sample document, not a real account)</div></div>`;

const S = [
  { f: '01-wholesaler-till.png', html: till({ name: 'NORTHGATE ELECTRICAL WHOLESALE', addr: '12 Canal St, Rochdale OL16 1AB', vatno: 'GB 284 1937 52', when: '09/10/2026 07:42', ref: 'Till 2  Trans 18841', lines: [['2.5MM T&E 50M', '62.50'], ['WAGO 221-413 X50', '18.20'], ['30MA RCBO 32A B', '24.10']], foot: [['SUBTOTAL', '104.80'], ['VAT 20% INCL', '17.47'], ['TOTAL', '104.80'], ['CARD', '104.80']], boldAt: 2 }), exp: { supplier: 'Northgate', date: '2026-10-09', gross: 104.80, vat: 17.47, vat_number: 'GB284193752', kind: 'receipt' } },
  { f: '02-fuel.png', html: till({ name: 'MOORSIDE SERVICE STATION', addr: 'Ripponden Rd, Oldham OL4 2JX', vatno: 'GB 731 0042 18', when: '08/10/2026 17:05', ref: 'Pump 4', lines: [['DIESEL 42.18L @ 149.9', '63.23']], foot: [['TOTAL', '63.23'], ['VAT @20%', '10.54'], ['NET', '52.69'], ['CONTACTLESS', '63.23']], boldAt: 0 }), exp: { supplier: 'Moorside', date: '2026-10-08', gross: 63.23, vat: 10.54, vat_number: 'GB731004218', kind: 'receipt' } },
  { f: '03-diy-discount.png', html: till({ name: 'HOMEFIX DIY', addr: 'Retail Park, Bury BL9 0SN', vatno: 'GB 556 2210 07', when: '07/10/2026 12:19', lines: [['GRIPFILL 350ML', '6.98'], ['PLASTERBOARD SCREWS', '4.50'], ['DUST SHEET X2', '9.00'], ['TRADE DISC 10%', '-2.05']], foot: [['TOTAL', '18.43'], ['VAT INCLUDED', '3.07'], ['VISA', '18.43']], boldAt: 0 }), exp: { supplier: 'HomeFix', date: '2026-10-07', gross: 18.43, vat: 3.07, vat_number: 'GB556221007', kind: 'receipt' } },
  { f: '04-parking.png', html: till({ name: 'CITY CENTRE PARKING', addr: 'Tib St Car Park, Manchester', vatno: 'GB 902 4471 30', when: '06/10/2026', ref: 'IN 08:10  OUT 13:45', lines: [['STAY 5H35M', '6.50']], foot: [['PAID', '6.50'], ['INCL VAT', '1.08']], boldAt: 0, thanks: 'KEEP THIS TICKET' }), exp: { supplier: 'City Centre Parking', date: '2026-10-06', gross: 6.50, vat: 1.08, vat_number: 'GB902447130', kind: 'receipt' } },
  { f: '05-supplier-bill.pdf', html: bill({ name: 'Pennine Cable Supplies Ltd', addr: '3 Wharf Road, Halifax HX1 2PL', vatno: 'GB 118 6630 41', inv: 'PCS-20419', date: '05/10/2026', acct: 'BRI004', po: 'PO-0007', lines: [['SWA 3C 4mm cable', '50 m', '£4.95', '£247.50'], ['SWA glands 20mm (pack 10)', '2', '£32.50', '£65.00'], ['Delivery', '1', '£100.00', '£100.00']], net: '412.50', vat: '82.50', gross: '495.00' }), exp: { supplier: 'Pennine Cable', date: '2026-10-05', gross: 495.00, vat: 82.50, invoice_number: 'PCS-20419', vat_number: 'GB118663041', kind: 'bill' } },
  { f: '06-cafe-no-vat.png', html: till({ name: "THE BRIDGE CAFE", addr: 'Market St, Todmorden', when: '05/10/2026 10:02', lines: [['BACON BAP', '3.90'], ['TEA X2', '4.50']], foot: [['TOTAL', '8.40'], ['CASH', '10.00'], ['CHANGE', '1.60']], boldAt: 0, thanks: 'NOT VAT REGISTERED' }), exp: { supplier: 'Bridge Cafe', date: '2026-10-05', gross: 8.40, vat: 0, kind: 'receipt' } },
  { f: '07-skip-hire.png', html: bill({ name: 'Valley Skips', addr: 'Yard 2, Hebden Road, Halifax HX7 5AA', vatno: 'GB 640 1185 92', inv: 'VS-8812', date: '02/10/2026', acct: 'BRIGHT', po: 'Job 14 Orchard Close', lines: [['6 yard skip, 7 days', '1', '£180.00', '£180.00']], net: '180.00', vat: '36.00', gross: '216.00' }), exp: { supplier: 'Valley Skips', date: '2026-10-02', gross: 216.00, vat: 36.00, invoice_number: 'VS-8812', vat_number: 'GB640118592', kind: 'bill' } },
  { f: '08-tool-hire.png', html: till({ name: 'QUICKHIRE TOOLS', addr: 'Park Rd, Stockport SK1 3BN', vatno: 'GB 377 8120 66', when: '01/10/2026 08:30', ref: 'Contract H-55120', lines: [['SDS DRILL 2 DAYS', '40.00'], ['DAMAGE WAIVER', '0.00']], foot: [['NET', '40.00'], ['VAT 20%', '8.00'], ['TOTAL', '48.00'], ['CARD', '48.00']], boldAt: 2 }), exp: { supplier: 'QuickHire', date: '2026-10-01', gross: 48.00, vat: 8.00, vat_number: 'GB377812066', kind: 'receipt' } },
  { f: '09-wholesale-bill-delivery.pdf', html: bill({ name: 'Northgate Electrical Wholesale', addr: '12 Canal St, Rochdale OL16 1AB', vatno: 'GB 284 1937 52', inv: 'NEW-771045', date: '30/09/2026', acct: 'BRI221', po: 'PO-0009', lines: [['LED panel 600x600 40W', '12', '£21.00', '£252.00'], ['Emergency conversion kit', '4', '£18.75', '£75.00'], ['Carriage', '1', '£12.00', '£12.00']], net: '339.00', vat: '67.80', gross: '406.80' }), exp: { supplier: 'Northgate', date: '2026-09-30', gross: 406.80, vat: 67.80, invoice_number: 'NEW-771045', vat_number: 'GB284193752', kind: 'bill' } },
  { f: '10-long-till.png', html: till({ name: 'SPARKS TRADE COUNTER', addr: 'Unit 9, Heywood OL10 2TT', vatno: 'GB 815 0093 24', when: '29/09/2026 15:51', ref: 'Op 7  Rcpt 004412', lines: [['20MM CONDUIT 3M X4', '7.96'], ['20MM COUPLER X10', '2.40'], ['SADDLE 20MM X20', '3.20'], ['BOX 47MM 1G X5', '4.25'], ['FIRE ALARM CABLE 1.5 X10M', '9.80'], ['INSULATION TAPE X3', '2.97'], ['CABLE TIES 300MM', '2.36']], foot: [['ITEMS 7', ''], ['TOTAL', '32.94'], ['VAT 20% INCL', '5.49'], ['CASH', '40.00'], ['CHANGE', '7.06']], boldAt: 1 }), exp: { supplier: 'Sparks Trade', date: '2026-09-29', gross: 32.94, vat: 5.49, vat_number: 'GB815009324', kind: 'receipt' } },
];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const s of S) {
  await page.setContent(`<html><body style="margin:0;background:#ddd;display:inline-block;padding:20px">${s.html}</body></html>`);
  if (s.f.endsWith('.pdf')) {
    await page.pdf({ path: OUT + s.f, format: 'A4', printBackground: true });
  } else {
    const el = await page.$('body > div');
    await el.screenshot({ path: OUT + s.f, type: 'png' });
  }
}
await browser.close();
fs.writeFileSync(OUT + 'expected.json', JSON.stringify(S.map((s) => ({ file: s.f, ...s.exp })), null, 2));
console.log('wrote', S.length, 'samples to', OUT);
