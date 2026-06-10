import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the BS 7671:2018+A4:2026 (18th Edition) Minor Electrical
// Installation Works Certificate model form (published 15 April 2026),
// plus IET Guidance Note 3 (Inspection & Testing, 9th Edition) and the
// IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-18';

export const a4MEIWCModelFormConfig: GeneratedGuideConfig = {
  pagePath: '/guides/bs-7671-a4-2026-meiwc-model-form',
  title:
    'BS 7671 A4:2026 — Minor Electrical Installation Works',
  description:
    'Amendment 4 (2026) added AFDD and SPD recording to the BS 7671 Minor Electrical Installation Works Certificate.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'A4:2026 MEIWC Model Form',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'A4 MEIWC Model Form',
  heroPrefix: 'BS 7671 A4:2026',
  heroHighlight: 'MEIWC',
  heroSuffix: 'Minor Works Certificate Changes',
  heroSubtitle:
    'The Minor Electrical Installation Works Certificate (MEIWC) used to be the simplest BS 7671 form. Amendment 4 made it more comprehensive — adding AFDD and SPD declarations, the new TN-C-S (PME) / (PNB) earthing split, reference method recording, and explicit test button verification. This guide walks every MEIWC change.',
  keyTakeaways: [
    'MEIWC is issued for minor electrical work that does NOT extend to providing a new circuit — adding socket-outlets to an existing circuit, replacing a consumer unit (with the same number of ways), relocating a light switch, replacing accessories.',
    'Section B earthing arrangement now lists TN-S, TN-C-S (PME), TN-C-S (PNB), TT, TN-C, IT — same split as the EICR/EIC.',
    'Section C circuit details now require AFDD, SPD and Reference method recording — previously these were either absent or implicit.',
    'Section D test results add "AFDD satisfactory test button operation" and "SPD functionality confirmed" tick-boxes — with explicit footnotes acknowledging "Not all AFDDs have a test button" and "Not all SPDs have visible functionality indication".',
    'The MEIWC remains a single-page document — it is intentionally lightweight compared to the EIC, but A4 brought it up-to-date with current protection-device practice.',
    'For replacement of a consumer unit, distribution board or similar items, the IET\'s explicit guidance is that "appropriate inspection and testing should always be carried out irrespective of the extent of the work undertaken" — i.e. an EIC may be more appropriate than an MEIWC for any work of meaningful scope.',
  ],
  sections: [
    {
      id: 'what-is-an-meiwc',
      heading: 'What an MEIWC Is and When You Issue One',
      tocLabel: 'What is an MEIWC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Minor Electrical Installation Works Certificate (MEIWC) is the BS 7671 certificate for additions and alterations to an existing installation that do NOT extend to providing a new circuit. It is intentionally simpler than the EIC — designed for genuinely minor work that nonetheless still needs proper certification.',
        },
        {
          type: 'list',
          items: [
            'Addition of socket-outlets or lighting points to an existing circuit.',
            'Relocation of a light switch or similar accessory.',
            'Replacement of accessories (sockets, switches, ceiling roses) on existing circuits.',
            'Replacement of a luminaire on its existing circuit.',
            'Replacement of a consumer unit, distribution board or similar item — though appropriate inspection and testing must always be carried out irrespective of the work\'s extent.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'MEIWC is not for new circuits',
          text:
            'If the work involves providing a new circuit — any new circuit at all — the appropriate certificate is the EIC, not the MEIWC. A new circuit means a separate final circuit served by its own overcurrent protective device. Adding a new circuit means the work is no longer "minor" for BS 7671 documentation purposes.',
        },
      ],
    },
    {
      id: 'section-b-earthing',
      heading: 'Section B — Earthing Arrangement (PME vs PNB)',
      tocLabel: 'Section B earthing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section B records the system earthing arrangement using the same tick-box list as the EIC and EICR under A4:2026:',
        },
        {
          type: 'list',
          items: [
            'TN-S — separate N and PE throughout.',
            'TN-C-S (PME) — distributor-side combined PEN, multiple earthing on the network.',
            'TN-C-S (PNB) — consumer-side combined PEN, downstream of a privately-owned transformer.',
            'TT — installation earth electrode, no distributor earth.',
            'TN-C — combined PEN throughout (rare).',
            'IT — isolated/IT system.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Section B also records the earth fault loop impedance at the distribution board (Zdb) supplying the final circuit, the presence of an adequate earthing conductor, and the main protective bonding conductor(s) destinations (Water, Gas, Oil, Structural steel, Other).',
        },
      ],
    },
    {
      id: 'section-c-circuit-details',
      heading: 'Section C — Circuit Details (Now With AFDD + SPD)',
      tocLabel: 'Section C circuit details',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section C records the specifics of the circuit that was altered or extended. The A4:2026 MEIWC expanded this section to include explicit AFDD and SPD recording — previously absent or implicit:',
        },
        {
          type: 'list',
          items: [
            '**DB Reference No.** and **DB Location and type** — the distribution board that supplies the affected circuit.',
            '**Circuit No.** and **Circuit description** — identifying the specific circuit being modified.',
            '**Reference method** — the BS 7671 Appendix 4 reference method letter (A-G). The form footnote points to "Table 4A2 of Appendix 4 of BS 7671:2018+A4:2026".',
            '**csa of conductors** — Live (mm²) and CPC (mm²).',
            '**Circuit overcurrent protective device** — BS (EN), Type, Rating (A), Breaking capacity (kA).',
            '**RCD** — BS (EN), Type, Rating (A), Rated residual operating current IΔn (mA), Rated time delay (ms).',
            '**AFDD** — BS (EN), Type, Rating (A). NEW under A4.',
            '**SPD** — BS (EN), Type. NEW under A4.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why AFDD + SPD recording was added to MEIWC',
          text:
            'Under A4:2026, AFDDs are required in named contexts (and prohibited in others — see medical locations). SPDs are required where the risk assessment per Regulation 443.4 indicates. Even a minor works on an existing circuit can require an AFDD or SPD assessment to be valid — recording both makes the certificate explicit and traceable.',
        },
      ],
    },
    {
      id: 'section-d-test-results',
      heading: 'Section D — Test Results for the Altered Circuit',
      tocLabel: 'Section D test results',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section D records the test results for the altered or extended circuit, where relevant and practicable. The A4:2026 MEIWC expanded this section with AFDD and SPD verification:',
        },
        {
          type: 'list',
          items: [
            '**Protective conductor continuity** — (R₁ + R₂) and R₂ in ohms.',
            '**Continuity of ring final circuit conductors** — r₁ (line - line), rₙ (neutral - neutral), r₂ (CPC - CPC) — for ring circuit alterations.',
            '**Insulation resistance** — test voltage (typically 500 V), Live-Live and Live-Earth in megohms.',
            '**Polarity satisfactory** — tick-box.',
            '**Maximum measured earth fault loop impedance** — Zs in ohms.',
            '**RCD disconnection time at rated residual operating current (IΔn)** — measured in ms, plus tick-box for satisfactory test button operation.',
            '**AFDD satisfactory test button operation** — tick-box. Form footnote: "Not all AFDDs have a test button".',
            '**SPD functionality confirmed** — tick-box. Form footnote: "Not all SPDs have visible functionality indication".',
          ],
        },
      ],
    },
    {
      id: 'guidance-for-recipients',
      heading: 'Guidance for Recipients (Appended to Every MEIWC)',
      tocLabel: 'Guidance for recipients',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The A4:2026 MEIWC includes standard "Guidance for Recipients" that should be appended to the certificate when issued to the client. The IET\'s wording emphasises:',
        },
        {
          type: 'list',
          items: [
            'The certificate confirms that the work has been designed, constructed, inspected and tested in accordance with BS 7671.',
            'The client should retain the certificate in a safe place — it must be shown to anyone inspecting or undertaking further work, and it demonstrates compliance if the property is sold.',
            'The installation should be inspected at appropriate intervals by a skilled, competent person.',
            'Where the installation includes an RCD, the device should be tested six-monthly by pressing the "T" or "Test" button — the device should switch off the supply and then be switched on to restore. If it does not, seek expert advice.',
            'Where the installation includes an AFDD with a manual test facility, it should be tested six-monthly by pressing the test button. For AFDDs with both manual and automatic test, manufacturer\'s instructions take precedence.',
            'Where the installation includes a Surge Protective Device (SPD), the status indicator should be checked. If it shows the device is non-operational, seek expert advice.',
            'Where the installation has alternative or additional sources of supply (e.g. solar PV, generator), warning notices should be present at the origin / meter, the consumer unit, and at all points of isolation.',
          ],
        },
      ],
    },
    {
      id: 'mw-vs-eic',
      heading: 'When to Issue an MEIWC vs an EIC',
      tocLabel: 'MEIWC vs EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The boundary between MEIWC and EIC is the new-circuit test. The IET\'s explicit guidance:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            '**Use MEIWC** — adding socket-outlets to an existing circuit, relocating a switch, replacing accessories, replacing a single luminaire, like-for-like accessory swap.',
            '**Use MEIWC (with caution)** — replacing a consumer unit with the same number of ways; the form permits this, but appropriate inspection and testing must be carried out as if it were an EIC.',
            '**Use EIC** — any new circuit (new final circuit served by its own overcurrent protective device), any meaningful addition to or alteration of the existing installation that extends beyond an existing circuit, a completely new installation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'When in doubt, use the EIC',
          text:
            'The MEIWC is intentionally lightweight and lacks the design-construction-inspection three-signature structure of the EIC. For any work where the design responsibility is non-trivial — even a consumer unit replacement — the EIC provides the more robust documentation and protects the installer if a future inspection questions the work.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can I issue an MEIWC for a consumer unit replacement?',
      answer:
        'The form technically permits this — the IET guidance explicitly states the MEIWC may be used "for the replacement of equipment such as accessories or luminaires, but not for the replacement of consumer units, distribution boards or similar items. Appropriate inspection and testing, however, should always be carried out irrespective of the extent of the work undertaken." In practice, most competent electricians issue an EIC for a consumer unit replacement — the work touches every circuit on the board and the EIC\'s three-signature design-construction-inspection structure is the appropriate documentation level.',
    },
    {
      question: 'Do I need to record AFDD and SPD on the MEIWC if the circuit doesn\'t have one?',
      answer:
        'If the circuit has no AFDD or SPD, leave the corresponding fields blank or write "N/A". The new A4:2026 fields are there to RECORD presence and verify operation — they\'re not a mandate that every minor works circuit must have an AFDD. The AFDD requirement is set by Regulation 421.1.7 (and prohibitions by 710.421.1.7 etc) based on the circuit\'s location and supply context, not by the MEIWC form itself.',
    },
    {
      question: 'What\'s the difference between TN-C-S (PME) and TN-C-S (PNB) on Section B?',
      answer:
        'TN-C-S (PME) is the distributor\'s combined PEN arrangement — most common in UK domestic and small commercial. TN-C-S (PNB) is a privately-owned combined PEN downstream of a customer\'s own HV/LV transformer — typical for large industrial, hospital and institutional sites. Most MEIWC work in domestic premises will tick TN-C-S (PME). See the dedicated A4 TN-C-S (PNB) guide for the full explanation.',
    },
    {
      question: 'Why does the form footnote say "Not all AFDDs have a test button"?',
      answer:
        'Modern AFDDs vary in their test mechanism. Some have a physical manual test button (the typical RCBO + AFDD combination device). Others rely on automatic internal self-test routines without a user-accessible button. A few have both. The form footnote acknowledges this variety so inspectors don\'t mark "AFDD satisfactory test button operation" as unsatisfactory simply because no physical button exists — instead, they verify the AFDD\'s status indication or rely on the manufacturer\'s declared self-test functionality.',
    },
    {
      question: 'Does the MEIWC need a Schedule of Test Results attached?',
      answer:
        'No — the MEIWC is a single-page certificate and the test results for the altered circuit are recorded directly in Section D of the certificate itself. There\'s no separate Schedule of Test Results. This is a key difference from the EIC, which has full Schedule of Inspections, Schedule of Circuit Details and Schedule of Test Results attached.',
    },
    {
      question: 'Is the MEIWC accepted by landlord agencies for PRS Regs 2020 compliance?',
      answer:
        'The PRS Regs 2020 (England) require the landlord to have an EICR every five years and to act on any C1, C2 or FI observations. An MEIWC issued for remedial work confirms that the work has been carried out — it does not itself satisfy the periodic-inspection requirement. A landlord with an unsatisfactory EICR commissions remedial work, receives an MEIWC (or EIC for larger work) to confirm completion, and provides that documentation to the tenant within 28 days of the work being done. The MEIWC + the original EICR + the remedial certificate together form the compliance record.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary — Every Change',
      description: 'Master index of every A4:2026 change across EIC, EICR and MEIWC.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-eic-model-form',
      title: 'A4:2026 EIC Model Form Changes',
      description: 'The full EIC form: three-signatory structure, Section H Schedule of Inspections items 1.0 to 14.0.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'A4:2026 TN-C-S (PNB) Earthing',
      description: 'The new PME vs PNB split on Section B of the MEIWC.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes',
      description: 'Where AFDDs are required, prohibited and tested — recorded on every MEIWC under A4.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/tools/minor-works-certificate',
      title: 'Minor Works Certificate Tool',
      description: 'Digital A4:2026 MEIWC with AFDD/SPD fields, test button verification, PDF export.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-a4-2026-schedule-of-tests',
      title: 'A4:2026 Schedule of Tests',
      description: 'How the EICR/EIC schedules relate to the MEIWC inline test fields.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue compliant A4:2026 Minor Works Certificates',
  ctaSubheading:
    'Elec-Mate\'s digital MEIWC has every A4:2026 field — AFDD/SPD recording, PME/PNB earthing options, test button verification — and exports a fully-branded PDF for the client. 7-day free trial.',
};
