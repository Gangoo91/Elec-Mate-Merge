/**
 * Generates premium client handout PDFs using jsPDF.
 * Professionally designed documents with company branding.
 * These make electricians look like a premium contractor.
 */

import { jsPDF } from 'jspdf';

interface CompanyBranding {
  companyName: string;
  companyPhone?: string;
  companyEmail?: string;
  companyWebsite?: string;
}

// --- Design System ---

const NAVY = [15, 23, 42] as const;
const SLATE = [71, 85, 105] as const;
const DARK = [30, 41, 59] as const;
const LIGHT_GREY = [248, 250, 252] as const;
const YELLOW = [234, 179, 8] as const;
const WHITE = [255, 255, 255] as const;

function drawPremiumHeader(doc: jsPDF, title: string, subtitle: string, branding: CompanyBranding, accentRgb: readonly [number, number, number] = YELLOW) {
  // Full-width dark header
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(0, 0, 210, 28, 'F');

  // Accent bar
  doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
  doc.rect(0, 0, 210, 3, 'F');

  // Title
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 12, 16);

  // Subtitle
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(subtitle, 12, 23);

  // Company name on right
  if (branding.companyName) {
    doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(branding.companyName, 198, 14, { align: 'right' });
    const contact = [branding.companyPhone, branding.companyEmail].filter(Boolean).join(' | ');
    if (contact) {
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.setFont('helvetica', 'normal');
      doc.text(contact, 198, 20, { align: 'right' });
    }
  }
}

function drawSectionBar(doc: jsPDF, title: string, y: number, accentRgb: readonly [number, number, number] = YELLOW): number {
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.roundedRect(12, y, 186, 8, 1, 1, 'F');
  doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
  doc.rect(12, y, 3, 8, 'F');
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), 19, y + 5.5);
  return y + 12;
}

function drawBullet(doc: jsPDF, text: string, y: number, accentRgb: readonly [number, number, number] = YELLOW): number {
  doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
  doc.circle(16, y - 0.8, 1.2, 'F');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);

  const lines = doc.splitTextToSize(text, 175);
  doc.text(lines, 20, y);
  return y + (lines.length * 4.2) + 2;
}

function drawHighlightBox(doc: jsPDF, text: string, y: number, bgRgb: readonly [number, number, number], textRgb: readonly [number, number, number]): number {
  doc.setFontSize(8.5);
  const lines = doc.splitTextToSize(text, 176);
  const boxH = lines.length * 4.2 + 8;

  doc.setFillColor(bgRgb[0], bgRgb[1], bgRgb[2]);
  doc.roundedRect(12, y, 186, boxH, 2, 2, 'F');

  doc.setTextColor(textRgb[0], textRgb[1], textRgb[2]);
  doc.setFont('helvetica', 'normal');
  doc.text(lines, 17, y + 6);
  return y + boxH + 4;
}

function drawContactCard(doc: jsPDF, branding: CompanyBranding, y: number, accentRgb: readonly [number, number, number] = YELLOW): number {
  // Card background
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.roundedRect(12, y, 186, 20, 2, 2, 'F');
  doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
  doc.rect(12, y, 186, 3, 'F');

  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(branding.companyName || 'Your Electrician', 20, y + 10);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2]);
  const info = [branding.companyPhone, branding.companyEmail, branding.companyWebsite].filter(Boolean).join('  |  ');
  if (info) doc.text(info, 20, y + 16);

  return y + 24;
}

function drawFooter(doc: jsPDF, branding: CompanyBranding) {
  doc.setFillColor(accentLine[0] || 234, accentLine[1] || 179, accentLine[2] || 8);
  doc.rect(0, 286, 210, 0.5, 'F');

  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Powered by Elec-Mate', 105, 292, { align: 'center' });
}

// Workaround: store accent for footer
let accentLine: readonly [number, number, number] = YELLOW;

// ===== ELECTRICAL SAFETY GUIDE =====

export function generateElectricalSafetyGuide(branding: CompanyBranding): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const accent = [34, 197, 94] as const; // green
  accentLine = accent;

  drawPremiumHeader(doc, 'Electrical Safety Guide', 'Essential information for homeowners and tenants', branding, accent);

  let y = 36;

  // Intro
  y = drawHighlightBox(doc,
    'This guide provides essential safety information about your electrical installation. Following these simple steps will help protect your family, tenants, and property from electrical hazards.',
    y, [240, 253, 244], [22, 101, 52]
  );

  // RCD
  y = drawSectionBar(doc, 'Test Your RCD Protection — Every 3 Months', y, accent);
  y = drawBullet(doc, 'Your consumer unit (fuse board) has RCD switches — look for the button marked "T" or "Test"', y, accent);
  y = drawBullet(doc, 'Press the test button firmly. The RCD should trip immediately, cutting power to the circuits it protects', y, accent);
  y = drawBullet(doc, 'If it does NOT trip — contact a qualified electrician immediately. Your protection is not working', y, accent);
  y = drawBullet(doc, 'After testing, push the switch back up to restore power. This takes 30 seconds and could save a life', y, accent);
  y += 2;

  // Warning Signs
  y = drawSectionBar(doc, 'Warning Signs — Call an Electrician If You Notice', y, accent);
  y = drawBullet(doc, 'A burning smell or brown/black marks around sockets, switches, or the consumer unit', y, accent);
  y = drawBullet(doc, 'Lights that flicker, dim when appliances switch on, or buzz', y, accent);
  y = drawBullet(doc, 'Sockets or switches that feel warm or hot to the touch', y, accent);
  y = drawBullet(doc, 'Frequent tripping of circuit breakers or RCDs — this indicates a fault', y, accent);
  y = drawBullet(doc, 'Sparking when plugging in or unplugging appliances', y, accent);
  y = drawBullet(doc, 'Cracked, damaged, or loose-fitting sockets and switches', y, accent);
  y += 2;

  // Dos and Don'ts
  y = drawSectionBar(doc, 'Dos and Don\'ts', y, accent);
  y = drawBullet(doc, 'DO have your installation inspected regularly — every 5 years for rentals, 10 years for owner-occupied', y, accent);
  y = drawBullet(doc, 'DO use a registered electrician (NICEIC, NAPIT, ELECSA) for all electrical work', y, accent);
  y = drawBullet(doc, 'DON\'T overload sockets — one plug per socket. Avoid cheap multi-adapters', y, accent);
  y = drawBullet(doc, 'DON\'T use damaged cables, frayed leads, or cracked plugs — replace them', y, accent);
  y = drawBullet(doc, 'DON\'T attempt DIY electrical work beyond changing a plug or a light bulb', y, accent);
  y = drawBullet(doc, 'DON\'T run cables under carpets, through doorways, or near heat sources', y, accent);
  y += 2;

  // Emergency
  y = drawSectionBar(doc, 'In an Emergency', y, [220, 38, 38]);
  y = drawHighlightBox(doc,
    'Electric shock: Do NOT touch the person. Switch off at the consumer unit first, then call 999. If you cannot reach the switch, use a dry non-metallic object to separate them from the source.\n\nElectrical fire: Unplug the appliance if safe to do so. NEVER use water on an electrical fire. Use a CO2 or dry powder extinguisher. Call 999.',
    y, [254, 242, 242], [153, 27, 27]
  );

  // Contact
  drawContactCard(doc, branding, 256, accent);
  drawFooter(doc, branding);
  return doc.output('blob');
}

// ===== ENERGY SAVING TIPS =====

export function generateEnergySavingGuide(branding: CompanyBranding): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const accent = YELLOW;
  accentLine = accent;

  drawPremiumHeader(doc, 'Energy Saving Tips', 'Practical advice to reduce your electricity bills', branding, accent);

  let y = 36;

  y = drawHighlightBox(doc,
    'Small changes to your electrical usage can save hundreds of pounds a year. These tips are recommended by your electrician based on what we see in homes every day.',
    y, [255, 251, 235], [146, 64, 14]
  );

  // Lighting
  y = drawSectionBar(doc, 'Lighting — The Easiest Win', y, accent);
  y = drawBullet(doc, 'Switch to LED bulbs — 80% less energy than halogen, last 10 times longer. A 5W LED replaces a 50W halogen', y, accent);
  y = drawBullet(doc, 'Install PIR motion sensors in hallways, bathrooms, utility rooms, and outside areas', y, accent);
  y = drawBullet(doc, 'Use dimmer switches — even at 75% brightness you save energy and extend bulb life', y, accent);
  y += 2;

  // Heating
  y = drawSectionBar(doc, 'Heating & Hot Water', y, accent);
  y = drawBullet(doc, 'Set your thermostat to 18-21°C — every degree lower saves approximately £80 per year', y, accent);
  y = drawBullet(doc, 'Use a programmer so heating is only on when you need it — not 24/7', y, accent);
  y = drawBullet(doc, 'Smart thermostats (Hive, Nest, Tado) learn your routine and save 10-15% on heating', y, accent);
  y = drawBullet(doc, 'Set your hot water cylinder to 60°C — higher wastes energy, lower risks legionella', y, accent);
  y += 2;

  // Appliances
  y = drawSectionBar(doc, 'Appliances & Standby Power', y, accent);
  y = drawBullet(doc, 'Standby power costs the average UK home £60-80/year — switch off at the wall', y, accent);
  y = drawBullet(doc, 'Use smart plugs to schedule and monitor devices — some show live energy usage', y, accent);
  y = drawBullet(doc, 'Only boil the water you need. A full kettle uses 0.1kWh — a cup uses 0.03kWh', y, accent);
  y = drawBullet(doc, 'Run washing machines on 30°C — modern detergents work just as well', y, accent);
  y += 2;

  // Bigger Savings
  y = drawSectionBar(doc, 'Bigger Savings — Ask Your Electrician', y, accent);
  y = drawBullet(doc, 'Solar PV panels — generate free electricity during daylight, sell excess to the grid via Smart Export Guarantee', y, accent);
  y = drawBullet(doc, 'Battery storage — store cheap overnight electricity (Octopus Go: 7.5p/kWh) for daytime use (28p/kWh)', y, accent);
  y = drawBullet(doc, 'EV smart charging — charge overnight on cheap tariffs instead of peak rates', y, accent);
  y = drawBullet(doc, 'Energy monitors (Loop, Hildebrand) — see exactly what is using electricity in real-time', y, accent);

  // Contact
  drawContactCard(doc, branding, 256, accent);
  drawFooter(doc, branding);
  return doc.output('blob');
}

// ===== YOUR EICR EXPLAINED =====

export function generateEICRExplained(branding: CompanyBranding): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const accent = [59, 130, 246] as const; // blue
  accentLine = accent;

  drawPremiumHeader(doc, 'Your EICR Explained', 'What your Electrical Installation Condition Report means', branding, accent);

  let y = 36;

  y = drawHighlightBox(doc,
    'You have received an EICR (Electrical Installation Condition Report). This is a thorough inspection and test of your electrical installation. This guide explains what it means in plain English.',
    y, [219, 234, 254], [30, 64, 175]
  );

  // What is it
  y = drawSectionBar(doc, 'What Was Inspected?', y, accent);
  y = drawBullet(doc, 'All wiring, cables, and connections throughout the property', y, accent);
  y = drawBullet(doc, 'Every socket, switch, and light fitting', y, accent);
  y = drawBullet(doc, 'The consumer unit (fuse board) and all protective devices', y, accent);
  y = drawBullet(doc, 'Earthing and bonding connections — your main safety system', y, accent);
  y = drawBullet(doc, 'RCD protection — the devices that prevent electric shock', y, accent);
  y += 2;

  // Classification codes with coloured bars
  y = drawSectionBar(doc, 'What Do the Codes Mean?', y, accent);
  y += 1;

  // C1
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('C1 — DANGER PRESENT', 20, y + 6);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('An immediate risk of injury exists. Your electrician will have made this safe or isolated the danger.', 20, y + 11);
  y += 18;

  // C2
  doc.setFillColor(249, 115, 22);
  doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('C2 — POTENTIALLY DANGEROUS', 20, y + 6);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Not immediately dangerous but could become so. Remedial work should be carried out as soon as possible.', 20, y + 11);
  y += 18;

  // C3
  doc.setFillColor(234, 179, 8);
  doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('C3 — IMPROVEMENT RECOMMENDED', 20, y + 6);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Does not meet current standards but is not dangerous. Improvement is recommended but not required.', 20, y + 11);
  y += 18;

  // FI
  doc.setFillColor(59, 130, 246);
  doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FI — FURTHER INVESTIGATION REQUIRED', 20, y + 6);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Additional investigation is needed. This may require opening up areas or specialist testing.', 20, y + 11);
  y += 22;

  // What to do
  y = drawSectionBar(doc, 'What Do I Need to Do?', y, accent);
  y = drawBullet(doc, 'C1 — Your electrician should have already made this safe. Confirm the remedial work is booked', y, accent);
  y = drawBullet(doc, 'C2 — Arrange for the remedial work as soon as possible. Do not ignore these', y, accent);
  y = drawBullet(doc, 'C3 — Consider improvements, especially if selling, remortgaging, or renting the property', y, accent);
  y = drawBullet(doc, 'Landlords — you must complete all C1 and C2 work within 28 days (Electrical Safety Standards Regulations 2020)', y, accent);
  y = drawBullet(doc, 'Keep your EICR safe — you will need it for insurance claims, property sales, and letting agents', y, accent);

  // Contact
  drawContactCard(doc, branding, 256, accent);
  drawFooter(doc, branding);
  return doc.output('blob');
}
