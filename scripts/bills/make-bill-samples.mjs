// Gap #7: made-up wholesaler bills (fictional firms, no real people or
// customers) for the emailed-bills tests, written to e2e/fixtures/bills:
//   01  a wholesaler invoice PDF with product codes and the PO reference
//   02  the same wholesaler, a later invoice where one price has gone up
//   03  a photo of a trade-counter invoice (JPEG)
//   04  an e-invoice in the email body, no attachment (HTML)
// plus readings.json: what the read-receipt model returns for each, used as the
// AI fixture so the tests never call OpenAI.
// Run: node scripts/bills/make-bill-samples.mjs
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = new URL('../../e2e/fixtures/bills/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const invoice = (
  o
) => `<div style="width:760px;padding:40px;font:13.5px/1.45 Arial,sans-serif;background:#fff;color:#111">
<div style="display:flex;justify-content:space-between;align-items:flex-start">
  <div><div style="font-size:23px;font-weight:bold;color:#0b3d6b">${o.name}</div><div>${o.addr}</div><div>Tel 01632 960${o.tel} · accounts@${o.domain}</div><div>VAT Reg No. ${o.vatno}</div></div>
  <div style="text-align:right"><div style="font-size:22px;font-weight:bold">SALES INVOICE</div><div>Invoice no: <b>${o.inv}</b></div><div>Tax point: ${o.date}</div><div>Account: ${o.acct}</div><div>Branch: ${o.branch}</div><div>Terms: 30 days end of month</div></div>
</div>
<div style="display:flex;gap:40px;margin-top:22px">
  <div><b>Invoice to</b><br>Brightwire Electrical Ltd<br>Unit 4, Mill Lane<br>Oldham OL1 1AA</div>
  <div><b>Deliver to</b><br>${o.site}</div>
  <div><b>Your order</b><br>${o.po}<br><b>Delivery note</b><br>${o.dn}</div>
</div>
<table style="width:100%;margin-top:22px;border-collapse:collapse;font-size:13px">
<tr style="background:#e8eef5"><th style="text-align:left;padding:6px">Product code</th><th style="text-align:left">Description</th><th>Qty</th><th style="text-align:right">Unit price</th><th style="text-align:right">VAT</th><th style="text-align:right;padding:6px">Net</th></tr>
${o.lines.map(([c, d, q, u, n]) => `<tr><td style="padding:6px;border-bottom:1px solid #ddd;font-family:monospace">${c}</td><td style="border-bottom:1px solid #ddd">${d}</td><td style="text-align:center;border-bottom:1px solid #ddd">${q}</td><td style="text-align:right;border-bottom:1px solid #ddd">${u}</td><td style="text-align:right;border-bottom:1px solid #ddd">20%</td><td style="text-align:right;padding:6px;border-bottom:1px solid #ddd">${n}</td></tr>`).join('')}
</table>
<div style="margin-top:16px;margin-left:auto;width:280px">
<div style="display:flex;justify-content:space-between"><span>Goods net</span><span>£${o.net}</span></div>
<div style="display:flex;justify-content:space-between"><span>VAT @ 20%</span><span>£${o.vat}</span></div>
<div style="display:flex;justify-content:space-between;font-weight:bold;font-size:16px;border-top:2px solid #000;margin-top:4px;padding-top:4px"><span>Invoice total</span><span>£${o.gross}</span></div></div>
<div style="margin-top:30px;font-size:11.5px">Payment by BACS. Sort 00-00-00 Acc 00000000 (sample document, not a real account). Goods remain our property until paid for in full.</div></div>`;

const S = [
  {
    f: '01-pennine-invoice.pdf',
    html: invoice({
      name: 'Pennine Electrical Wholesale Ltd',
      addr: '18 Foundry Street, Halifax HX1 5QT',
      tel: '418',
      domain: 'pennine-wholesale.example',
      vatno: 'GB 118 6630 41',
      inv: 'PEW-40817',
      date: '08/10/2026',
      acct: 'BRI004',
      branch: 'Halifax',
      po: 'PO-T7001',
      dn: 'DN 551902',
      site: '14 Orchard Close<br>Sowerby Bridge HX6 2AB',
      lines: [
        ['TE25G100', '2.5mm Twin & Earth cable grey 100m', '2', '£68.40', '£136.80'],
        ['RCBO32B30', 'RCBO 32A B curve 30mA type A', '6', '£21.95', '£131.70'],
        ['WAGO221413', 'Wago 221-413 lever connector (box 50)', '1', '£16.80', '£16.80'],
      ],
      net: '285.30',
      vat: '57.06',
      gross: '342.36',
    }),
    reading: {
      kind: 'bill',
      supplier: 'Pennine Electrical Wholesale Ltd',
      supplier_vat_number: 'GB 118 6630 41',
      date: '2026-10-08',
      invoice_number: 'PEW-40817',
      order_ref: 'PO-T7001',
      lines: [
        {
          code: 'TE25G100',
          description: '2.5mm Twin & Earth cable grey 100m',
          quantity: 2,
          unit_price: 68.4,
          net: 136.8,
          vat_rate: 20,
        },
        {
          code: 'RCBO32B30',
          description: 'RCBO 32A B curve 30mA type A',
          quantity: 6,
          unit_price: 21.95,
          net: 131.7,
          vat_rate: 20,
        },
        {
          code: 'WAGO221413',
          description: 'Wago 221-413 lever connector (box 50)',
          quantity: 1,
          unit_price: 16.8,
          net: 16.8,
          vat_rate: 20,
        },
      ],
      net: 285.3,
      vat: 57.06,
      gross: 342.36,
      currency: 'GBP',
      category: 'materials',
      confidence: 0.95,
      notes: null,
    },
  },
  {
    f: '02-pennine-price-rise.pdf',
    html: invoice({
      name: 'Pennine Electrical Wholesale Ltd',
      addr: '18 Foundry Street, Halifax HX1 5QT',
      tel: '418',
      domain: 'pennine-wholesale.example',
      vatno: 'GB 118 6630 41',
      inv: 'PEW-40902',
      date: '09/10/2026',
      acct: 'BRI004',
      branch: 'Halifax',
      po: 'PO-T7002',
      dn: 'DN 552117',
      site: 'Unit 4, Mill Lane<br>Oldham OL1 1AA',
      lines: [
        ['TE25G100', '2.5mm Twin & Earth cable grey 100m', '1', '£74.20', '£74.20'],
        ['GL20SWA', 'SWA gland kit 20mm (pack 10)', '1', '£29.50', '£29.50'],
      ],
      net: '103.70',
      vat: '20.74',
      gross: '124.44',
    }),
    reading: {
      kind: 'bill',
      supplier: 'Pennine Electrical Wholesale Ltd',
      supplier_vat_number: 'GB118663041',
      date: '2026-10-09',
      invoice_number: 'PEW-40902',
      order_ref: 'PO-T7002',
      lines: [
        {
          code: 'TE25G100',
          description: '2.5mm Twin & Earth cable grey 100m',
          quantity: 1,
          unit_price: 74.2,
          net: 74.2,
          vat_rate: 20,
        },
        {
          code: 'GL20SWA',
          description: 'SWA gland kit 20mm (pack 10)',
          quantity: 1,
          unit_price: 29.5,
          net: 29.5,
          vat_rate: 20,
        },
      ],
      net: 103.7,
      vat: 20.74,
      gross: 124.44,
      currency: 'GBP',
      category: 'materials',
      confidence: 0.94,
      notes: null,
    },
  },
  {
    f: '03-counter-invoice-photo.jpg',
    html: invoice({
      name: 'Calder Trade Counter',
      addr: '2 Bridge End, Hebden Bridge HX7 8AD',
      tel: '077',
      domain: 'caldertrade.example',
      vatno: 'GB 640 1185 92',
      inv: 'CTC-11873',
      date: '07/10/2026',
      acct: 'CASH-BRI',
      branch: 'Hebden Bridge',
      po: 'Orchard Close',
      dn: 'Collected',
      site: 'Collected from counter',
      lines: [
        ['MT-20-3', '20mm conduit 3m length', '10', '£2.10', '£21.00'],
        ['MB47-1G', 'Metal box 47mm 1 gang', '8', '£1.35', '£10.80'],
      ],
      net: '31.80',
      vat: '6.36',
      gross: '38.16',
    }),
    reading: {
      kind: 'bill',
      supplier: 'Calder Trade Counter',
      supplier_vat_number: 'GB 640 1185 92',
      date: '07/10/2026',
      invoice_number: 'CTC-11873',
      order_ref: 'Orchard Close',
      lines: [
        {
          code: 'MT-20-3',
          description: '20mm conduit 3m length',
          quantity: 10,
          unit_price: 2.1,
          net: 21,
          vat_rate: 20,
        },
        {
          code: 'MB47-1G',
          description: 'Metal box 47mm 1 gang',
          quantity: 8,
          unit_price: 1.35,
          net: 10.8,
          vat_rate: 20,
        },
      ],
      net: 31.8,
      vat: 6.36,
      gross: 38.16,
      currency: 'GBP',
      category: 'materials',
      confidence: 0.82,
      notes: 'Photo slightly angled',
    },
  },
];

const bodyBill = `<html><body style="font-family:Arial,sans-serif">
<p>Dear Customer,</p>
<p>Thank you for your order. Your invoice is shown below.</p>
<table border="0" cellpadding="4">
<tr><td><b>Invoice number</b></td><td>RVE-2290114</td></tr>
<tr><td><b>Invoice date</b></td><td>06/10/2026</td></tr>
<tr><td><b>Your order</b></td><td>PO-T7003</td></tr>
<tr><td><b>Account</b></td><td>BRIGHT01</td></tr>
</table>
<table border="1" cellpadding="4" style="border-collapse:collapse">
<tr><th>Code</th><th>Description</th><th>Qty</th><th>Unit</th><th>Net</th></tr>
<tr><td>FA15-100</td><td>Fire alarm cable 1.5mm 100m red</td><td>1</td><td>&pound;54.00</td><td>&pound;54.00</td></tr>
</table>
<p>Net &pound;54.00<br>VAT 20% &pound;10.80<br><b>Total &pound;64.80</b></p>
<p>Ribble Valley Electrical Supplies Ltd, VAT GB 377 8120 66. This is a sample email, not a real invoice.</p>
</body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ deviceScaleFactor: 1.5 });
for (const s of S) {
  await page.setContent(`<html><body style="margin:0;background:#fff">${s.html}</body></html>`);
  if (s.f.endsWith('.pdf')) {
    await page.pdf({ path: OUT + s.f, format: 'A4', printBackground: true });
  } else {
    const el = await page.$('body > div');
    await el.screenshot({ path: OUT + s.f, type: 'jpeg', quality: 80 });
  }
}
await browser.close();
fs.writeFileSync(OUT + '04-email-body-bill.html', bodyBill);
const readings = Object.fromEntries(S.map((s) => [s.f, s.reading]));
readings['04-email-body-bill.html'] = {
  kind: 'bill',
  supplier: 'Ribble Valley Electrical Supplies Ltd',
  supplier_vat_number: 'GB 377 8120 66',
  date: '2026-10-06',
  invoice_number: 'RVE-2290114',
  order_ref: 'PO-T7003',
  lines: [
    {
      code: 'FA15-100',
      description: 'Fire alarm cable 1.5mm 100m red',
      quantity: 1,
      unit_price: 54,
      net: 54,
      vat_rate: 20,
    },
  ],
  net: 54,
  vat: 10.8,
  gross: 64.8,
  currency: 'GBP',
  category: 'materials',
  confidence: 0.9,
  notes: null,
};
fs.writeFileSync(OUT + 'readings.json', JSON.stringify(readings, null, 2));
console.log('wrote', S.length + 1, 'bills to', OUT);
