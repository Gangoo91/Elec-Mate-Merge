import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IET Guidance Note 8 (Earthing & Bonding), IET Guidance Note 3 (Inspection &
// Testing, 9th Edition), and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-18';

export const tnCBannedNewInstallsA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/tn-c-banned-new-installations-a4-2026',
  title:
    'TN-C Earthing Banned in New Installations — BS',
  description:
    'Amendment 4 to BS 7671:2018 (published 15 April 2026) prohibits TN-C earthing arrangements in new low-voltage installations.',
  datePublished: published,
  dateModified: modified,
  readingTime: 16,
  badge: 'A4:2026 Change',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'TN-C Banned in New Installations',
  heroPrefix: 'TN-C Earthing',
  heroHighlight: 'Banned in New Installations',
  heroSuffix: '— BS 7671:2018+A4:2026',
  heroSubtitle:
    'Amendment 4:2026 prohibits TN-C earthing within new low-voltage installations. The combined protective-and-neutral (PEN) conductor is no longer permitted to run throughout an installation. This guide explains the regulation, the safety reasoning, the distinction from TN-C-S (PME and PNB), how to code existing TN-C on an EICR, and the implications for EV charging and DNO supplies.',
  keyTakeaways: [
    'BS 7671:2018+A4:2026 prohibits the use of TN-C earthing arrangements within new low-voltage consumer installations. The combined PEN conductor may not be run throughout an installation downstream of the origin.',
    'TN-C is the system where a single conductor performs both the neutral function and the protective function from the source to every point of use. The PEN runs all the way through the installation.',
    'TN-C-S — the system in which the supply is TN-C up to a defined point (the supply terminals or a privately-owned transformer) and is then split into separate neutral and protective conductors for the rest of the installation — is NOT prohibited. PME and PNB are both arrangements of TN-C-S, not TN-C.',
    'TT (separate consumer earth electrode) and TN-S (separate distributor protective conductor) remain fully compliant alternatives where TN-C-S is not available or not appropriate.',
    'Existing TN-C installations are not automatically unsafe — they are coded against the standard in force at the time of installation. On an EICR they typically attract a C3 (improvement recommended) or, where there is observable danger, a C2 (potentially dangerous).',
    'The change codifies long-standing industry practice and aligns the UK Wiring Regulations with CENELEC HD 60364-1 and the IET Guidance Note 8 (Earthing & Bonding) recommendation that the PEN conductor should not extend beyond the supply terminals of an installation.',
    'EV charger installations on TN-C-S (PME) supplies remain subject to the existing open-PEN risk mitigations under Section 722 — A4:2026 does not change those rules, but it makes the TN-C / TN-C-S distinction more important to record correctly on the EIC and EICR.',
  ],
  sections: [
    {
      id: 'what-is-tn-c',
      heading: 'What a TN-C System Actually Is',
      tocLabel: 'What is TN-C?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A TN-C system is a low-voltage earthing arrangement in which the neutral and protective functions are combined into a single conductor — the protective-earthed-neutral or PEN conductor — for the whole of the distribution and the consumer\'s installation. The same metallic conductor carries return load current and is also the conductor to which exposed-conductive-parts of the installation are connected for automatic disconnection of supply.',
        },
        {
          type: 'paragraph',
          text:
            'Read against the system definitions in [Section 312 of BS 7671](/guides/bs-7671-a4-2026-summary), the "T" in TN-C means that one point of the source is connected directly to earth (the supply neutral is earthed at the source), the "N" means that exposed-conductive-parts of the installation are connected to that earthed point via protective conductors, and the "C" means that the neutral and protective functions are combined throughout — the PEN runs from the source, through the supply, through the consumer unit, and out to every accessory.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'TN-C vs TN-C-S — the critical distinction',
          text:
            'In TN-C the combined PEN conductor runs throughout the installation. In TN-C-S the combined PEN runs only up to a defined point (the supply terminals for PME, or a privately-owned transformer for PNB), and is then separated into independent N and PE conductors for the rest of the installation. A4:2026 prohibits TN-C in new installations. TN-C-S — both PME and PNB — is fully permitted. See our [TN-S vs TN-C-S vs TT comparison](/guides/tns-vs-tncs-vs-tt) for a side-by-side breakdown.',
        },
        {
          type: 'paragraph',
          text:
            'In a TN-C arrangement, every socket, every accessory, every fixed appliance has its earth terminal connected to the same conductor that carries the return load current. There is no separate circuit protective conductor (cpc) running alongside the neutral — they are physically the same wire. That is the configuration the 2026 amendment prohibits inside the installation. For a wider primer on what earthing means and why it matters, see our [what is earthing guide](/guides/what-is-earthing).',
        },
      ],
    },
    {
      id: 'why-prohibited',
      heading: 'Why A4:2026 Prohibits TN-C in New Installations',
      tocLabel: 'Why prohibited',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The prohibition codifies a position that BS 7671 and CENELEC HD 60364-1 have been moving towards for decades. The combined PEN conductor presents three categories of hazard when run throughout a consumer\'s installation:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Open-PEN risk — if the combined PEN is broken anywhere between source and load, the neutral path and the protective path are lost simultaneously. Exposed-conductive-parts rise towards line voltage with respect to true earth, and there is no functional cpc to operate the overcurrent device.',
            'Load-current on protective conductors — in TN-C the protective conductor carries load current at all times. It sits at a non-trivial voltage above true earth, proportional to load current and conductor impedance. This is incompatible with the modern expectation that protective conductors sit at earth potential.',
            'Inability to use RCDs effectively — RCDs sense the imbalance between line and neutral. If the protective function shares the same conductor as the neutral function, earth fault current returns via the conductor the RCD treats as neutral; the RCD cannot distinguish a fault and will not operate. Section 411 increasingly requires RCDs as the primary means of automatic disconnection; TN-C is structurally incompatible.',
            'Inconsistency with bonding strategy — Chapter 54 requires equipotential bonding to extraneous-conductive-parts. In TN-C the bonded metalwork connects to a conductor carrying load current, so touch-voltage becomes load-dependent — the opposite of what bonding is supposed to achieve.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Open-PEN is the headline failure mode',
          text:
            'A break in the PEN between source and installation removes the neutral and protective return paths simultaneously. The earthed metalwork rises towards line voltage with no automatic disconnection. This is the single biggest reason the regulation has been written.',
        },
        {
          type: 'paragraph',
          text:
            'The open-PEN risk does NOT disappear by switching to TN-C-S — the PEN still exists, but only up to the splitting point. Section 722 (EV charging) addresses open-PEN mitigations for PME supplies. A4:2026 narrows the problem to the supply side, but does not eliminate the need for open-PEN protection on PME EV installations.',
        },
      ],
    },
    {
      id: 'tn-c-s-distinct',
      heading: 'TN-C-S Is Not TN-C — PME and PNB Are Still Permitted',
      tocLabel: 'TN-C-S still permitted',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A common point of confusion when the A4:2026 prohibition is reported is the assumption that TN-C-S is also banned. It is not. TN-C-S is the dominant earthing arrangement in UK distribution and remains fully compliant. The "C" in TN-C-S refers only to the portion of the system upstream of a defined splitting point.',
        },
        {
          type: 'list',
          items: [
            'TN-C-S (PME) — Protective Multiple Earthing. The combined PEN runs from the distributor\'s source up to the supply terminals at the property. From that point, the installation has a separate N and PE arrangement and behaves as TN-S downstream. The DNO is responsible for the integrity of the PEN up to the supply terminals. This is the standard arrangement for most UK domestic and small commercial properties.',
            'TN-C-S (PNB) — Protective Neutral Bonding. The combined PEN runs from a privately-owned HV/LV transformer to the consumer\'s switchgear and is bonded to a local earth electrode at the transformer or main switch position. From that point the installation has separate N and PE. PNB is common on large industrial sites and some institutional campuses with their own substation. The installation owner — not the DNO — is responsible for the integrity of the PEN up to the splitting point.',
            'The A4:2026 model form change separated these two arrangements explicitly. See our [TN-C-S (PNB) earthing arrangement guide](/guides/bs-7671-a4-2026-tn-cs-pnb-earthing) for the model-form tick-box change and how to record the correct arrangement on an EIC or EICR Section I.',
            'In both PME and PNB, the consumer installation downstream of the splitting point uses separate N and PE conductors — i.e. it is NOT a TN-C arrangement inside the installation. That is why TN-C-S is unaffected by the A4:2026 prohibition.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The simple test',
          text:
            'Look at where the neutral and protective conductors split into two separate conductors. If they remain combined as a single conductor throughout the installation — that is TN-C, and A4:2026 prohibits it in new work. If they split at the supply terminals or at a privately-owned transformer and run as two separate conductors thereafter — that is TN-C-S, fully compliant.',
        },
      ],
    },
    {
      id: 'alternatives',
      heading: 'Compliant Alternatives — TN-C-S, TN-S and TT',
      tocLabel: 'Compliant alternatives',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For a new installation, the designer chooses the earthing arrangement based on the supply provided by the DNO (or the privately-owned source in the case of PNB) and the suitability of that arrangement for the loads to be served. The three compliant arrangements are TN-C-S, TN-S and TT.',
        },
        {
          type: 'list',
          items: [
            'TN-C-S (PME) — the default for most UK domestic and small commercial new builds. The DNO provides a combined PEN up to the supply terminals; the installation runs separate N and PE downstream. The installer\'s duties under Section 411 and Chapter 54 cover the bonding requirements within the installation.',
            'TN-C-S (PNB) — used on sites with a privately-owned HV/LV transformer. The owner of the transformer is responsible for the integrity of the PEN from the transformer to the splitting point. Beyond the split, the installation runs separate N and PE.',
            'TN-S — the DNO provides a separate metallic protective conductor (typically the lead sheath of an old paper-insulated cable, or an explicit PE conductor in modern cables) from the source. Less common in new urban supplies but still found, particularly in older areas. Fully compliant; no PEN inside the installation.',
            'TT — the DNO supplies only line and neutral; the consumer provides their own earth electrode at the installation. Common where TN-C-S is not available (rural overhead supplies, certain caravan and marina installations, some agricultural premises). Requires RCD protection at the origin for automatic disconnection, because the earth fault loop impedance through soil is too high for the overcurrent device alone.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For a deeper walk-through of when each arrangement is appropriate, including the design choice criteria and the recording of the arrangement on the EIC and EICR Section I, see the [TN-S vs TN-C-S vs TT comparison](/guides/tns-vs-tncs-vs-tt).',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'You almost never choose TN-C-S vs TN-S vs TT',
          text:
            'In practice, the arrangement is determined by the DNO supply at the property — you cannot unilaterally convert a PME supply to a TN-S supply. The designer\'s job is to identify the arrangement provided, record it correctly on the certificate, and design the installation\'s bonding, RCD strategy and earth electrode requirements to suit. TT is the exception — it is a design choice made by the installer when the DNO supply is not suitable or not available.',
        },
      ],
    },
    {
      id: 'existing-tn-c-eicr',
      heading: 'Existing TN-C Installations on an EICR',
      tocLabel: 'Existing TN-C on EICR',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 prohibits TN-C in NEW installations. It does not retrospectively make existing TN-C unlawful. EICR coding follows the usual principle: code against the standard in force at installation, and record any departure from current standards as an improvement recommendation, with safety implications driving the code.',
        },
        {
          type: 'list',
          items: [
            'C1 (danger present) — an actively dangerous condition. An intact TN-C installation without observable open-PEN or load-on-cpc symptoms would not normally be C1. C1 applies where there is a present hazard such as a broken PEN with metalwork at line potential.',
            'C2 (potentially dangerous) — TN-C exhibiting symptoms suggesting a fault could become dangerous: signs of intermittent PEN, missing equipotential bonding, no overcurrent protection that would clear an earth fault.',
            'C3 (improvement recommended) — the default for an intact, functioning TN-C installation no longer aligned with current BS 7671. Recommend conversion to TN-C-S, TN-S or TT at the next opportunity.',
            'FI (further investigation required) — where the inspector cannot positively identify whether the installation is TN-C or TN-C-S. Resolve the arrangement before issuing a final code.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No main bonding on a TN-C installation = potential C2',
          text:
            'TN-C without main protective bonding to extraneous-conductive-parts is serious because the bonded metalwork is connected to a conductor that carries load current. Touch-voltage becomes uncontrolled. See our guide on [EICR coding of missing main protective bonding](/guides/eicr-no-main-protective-bonding).',
        },
        {
          type: 'paragraph',
          text:
            'When an existing TN-C installation undergoes new work — consumer unit change, rewire, extension, EV charger — the new work falls under A4:2026 and must not extend the TN-C arrangement. The CU change becomes the natural opportunity to convert to TN-C-S (via a DNO PME terminal request) or to a TT system with a local earth electrode.',
        },
      ],
    },
    {
      id: 'pnb-codification',
      heading: 'PNB Codification Under A4:2026',
      tocLabel: 'PNB codification',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Alongside the TN-C prohibition, A4:2026 codified the distinction between PME and PNB on the model forms. Before A4, the Section I tick-box was a single "TN-C-S" option that did not distinguish distributor PME from consumer PNB. From A4 onwards, two separate tick-boxes appear and the inspector must record which arrangement is in use.',
        },
        {
          type: 'list',
          items: [
            'The distinction matters because PME places the duty for PEN integrity on the DNO, while PNB places it on the installation owner. Downstream consequences for bonding, RCD selection and earth electrode requirements differ accordingly.',
            'Privately-owned HV/LV transformer sites (large industrial, hospital, university campuses) are PNB. IET Guidance Note 8 (Earthing & Bonding) covers the design requirements.',
            'DNO supply with a PME terminal (typical domestic) is PME. The IET On-Site Guide is the practical reference.',
            'Where a previous EICR recorded "TN-C-S" without distinguishing PME from PNB, the next periodic inspection under the A4:2026 form is the natural opportunity to record the correct arrangement.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the model form change and how to record PNB correctly, see our [A4 TN-C-S (PNB) earthing guide](/guides/bs-7671-a4-2026-tn-cs-pnb-earthing).',
        },
      ],
    },
    {
      id: 'open-pen-dno',
      heading: 'Open-PEN Risk and the DNO Boundary',
      tocLabel: 'Open-PEN and DNO',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The open-PEN failure mode is the engineering reason TN-C is prohibited inside an installation. It is also why TN-C-S (PME) installations require additional measures for higher-risk loads such as EV chargers. The regulatory boundary sits between the DNO (distribution network operator) and the installer.',
        },
        {
          type: 'list',
          items: [
            'The DNO is responsible for the supply network up to the supply terminals — for a PME supply this includes the combined PEN in the cut-out and the service cable back to the substation. The Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR) impose duties on the DNO accordingly.',
            'The installer (under BS 7671 and the Electricity at Work Regulations 1989) is responsible from the supply terminals onwards. In TN-C-S that means working with separate N and PE downstream of the meter, not with a PEN.',
            'Open-PEN on a PME supply is primarily a DNO-side concern. The installer cannot directly prevent it; they can only mitigate the consequences. Section 722 prescribes the EV-specific mitigations.',
            'On a TT supply there is no PEN — the consumer provides their own earth electrode. This is one reason TT is preferred for some outdoor and remote installations.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why the A4:2026 change is conservative, not radical',
          text:
            'TN-C inside an installation was already poor practice — the prohibition formalises the consensus view. The change does not alter open-PEN risk on PME (which sits at the DNO boundary), nor the Section 722 EV mitigations. It removes one structural hazard from the universe of compliant new designs.',
        },
      ],
    },
    {
      id: 'ev-implications',
      heading: 'EV Charger Implications',
      tocLabel: 'EV charger implications',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 does not change the Section 722 rules for EV chargers, but it rules out TN-C as an earthing arrangement for any new EV installation and makes the PME / PNB / TT distinction more important when assessing open-PEN risk.',
        },
        {
          type: 'list',
          items: [
            'TN-C-S (PME) — open-PEN risk is the dominant Section 722 design issue. Mitigations (open-PEN detection, additional electrodes, dedicated isolating measures, or TT for the EV final circuit) remain in force unchanged.',
            'TN-C-S (PNB) — same open-PEN considerations, but responsibility sits with the installation owner. Risk assessment, monitoring and maintenance of the private supply network become directly relevant.',
            'TN-S — no PEN in the supply, so open-PEN risk does not arise in the same way; Section 722 mitigations are less onerous.',
            'TT — no PEN, so no open-PEN risk. Requires RCD protection and earth electrode; often the simplest design for outdoor charge points.',
            'TN-C was never a sensible arrangement for an EV charger. A4:2026 closes off any residual question. See our [cable size for EV charger guide](/guides/cable-size-for-ev-charger).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'PME-related cases were a driver',
          text:
            'Investigations into deaths involving EV chargers on PME supplies with broken PEN conductors drove much of the pressure behind the tightening of Section 722 and the A4:2026 PME/PNB split. The TN-C prohibition is part of the same direction of travel — narrow the universe of installations where load current can appear on a protective conductor.',
        },
      ],
    },
    {
      id: 'retrofit-obligations',
      heading: 'Retrofit Obligations and When Work Triggers Conversion',
      tocLabel: 'Retrofit obligations',
      blocks: [
        {
          type: 'paragraph',
          text:
            'There is no statutory requirement to retrofit an existing TN-C installation solely because A4:2026 has been published. The trigger is one of: the installation is being altered, extended or significantly added to; an EICR has identified a coded observation requiring remedial action; or the owner elects to upgrade voluntarily.',
        },
        {
          type: 'list',
          items: [
            'New work must not extend or replicate the TN-C arrangement. A consumer unit change is the natural conversion opportunity — request a DNO PME terminal, or design as TT with a local earth electrode.',
            'EICR-driven remedial work follows the code. C2 = urgent action; C3 = recommendation; FI = further investigation. Remedial scope must at minimum meet A4:2026.',
            'Voluntary upgrades follow the same principle: new work must comply with A4:2026; retained existing work continues to be coded against the standard in force at original installation.',
            'For a wider overview, see our [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary).',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Conversion is typically a DNO conversation, not a rewire',
          text:
            'Converting a TN-C installation to TN-C-S usually just requires a DNO PME terminal at the cut-out — a routine request in most areas. Where PME is unavailable, TT with a local electrode is the alternative and is often simpler. Full re-cabling is rarely needed if the existing cpc is part of the cable (T&E, SWA, etc.).',
        },
      ],
    },
    {
      id: 'recording-on-certificates',
      heading: 'Recording the Earthing Arrangement on the Certificate',
      tocLabel: 'Recording on certificates',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For any new installation, alteration or addition under A4:2026, the earthing arrangement is recorded on the relevant model form — the EIC, MEIWC, or EICR. Each form\'s Section I provides tick-boxes for the earthing arrangement.',
        },
        {
          type: 'list',
          items: [
            'EIC — for a new installation or significant addition. The arrangement recorded should be one of TN-C-S (PME), TN-C-S (PNB), TN-S or TT. TN-C is not a compliant choice and should not be ticked.',
            'MEIWC — for a minor alteration. The arrangement of the installation as a whole is recorded; minor works should not extend a TN-C arrangement.',
            'EICR — the arrangement actually present is recorded, including TN-C if present. The observation against TN-C generates a C3 (or higher) recording the departure from A4:2026.',
            'Across all three forms, the A4:2026 model form makes the PME / PNB distinction explicit. Do not record "TN-C-S" without specifying which sub-arrangement is present.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For broader context on the A4:2026 certificate model form changes, see the [A4:2026 summary](/guides/bs-7671-a4-2026-summary).',
        },
      ],
    },
    {
      id: 'elec-mate-tools',
      heading: 'How Elec-Mate Handles A4:2026 Earthing Decisions',
      tocLabel: 'In-app tooling',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Elec-Mate certificate suite is aligned to BS 7671:2018+A4:2026 from publication. The EIC and EICR tools present the Section I earthing arrangement as a structured choice rather than free text, with TN-C disabled for new installations and flagged for observation on EICR.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'EIC tool — Section I earthing arrangement is a structured selector; TN-C is not offered for new installations.',
            'EICR tool — TN-C automatically prompts a coded observation (configurable C2/C3 with reasoning) and a recommendation to convert at the next remedial opportunity.',
            'MEIWC tool — minor works on a TN-C installation flagged so the installer considers whether the alteration triggers conversion.',
            'EV charger workflow — the Section 722 design tool branches on PME / PNB / TN-S / TT and applies the correct open-PEN mitigations automatically.',
            'Bonding calculator — Chapter 54 sizing pulls the supply arrangement from the EIC; TN-C installations are flagged for manual bonding review.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'The full A4:2026-aligned EIC, EICR and MEIWC certificate suite is included with the Elec-Mate Electrician subscription. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Handle the A4:2026 TN-C Prohibition on a Job',
  howToDescription:
    'The practical decision-tree from "what supply do I have?" through to "what do I record on the certificate?" — for new installations, alterations, and existing TN-C installations encountered on an EICR.',
  howToSteps: [
    {
      name: 'Identify the actual earthing arrangement on site',
      text:
        'Open the cut-out (if permitted) and the consumer unit and locate the splitting point of the combined PEN. PEN splits at the supply terminals = TN-C-S (PME). PEN splits at a privately-owned transformer = TN-C-S (PNB). Separate distributor protective conductor = TN-S. No DNO earth, consumer electrode present = TT. Combined PEN runs throughout with no splitting point = TN-C, and A4:2026 prohibits any new work extending it.',
    },
    {
      name: 'For new work, confirm the supply meets A4:2026',
      text:
        'For a new build, significant addition or alteration, confirm the supply is TN-C-S (PME or PNB), TN-S or TT. If the existing supply is TN-C, do not extend it — convert the supply, or design the new work as TT with a local earth electrode and an isolating barrier from the legacy TN-C portion.',
    },
    {
      name: 'For an EICR on an existing TN-C installation, code the observation',
      text:
        'Record the arrangement actually present and code against safety implications: C3 for an intact TN-C arrangement with no observable danger; C2 where there is a present hazard such as missing main bonding; C1 only where there is an active observable danger such as a broken PEN with metalwork at line potential. Use FI where the arrangement cannot be positively identified.',
    },
    {
      name: 'For new work on an existing TN-C installation, plan the conversion',
      text:
        'A consumer unit change, rewire or significant alteration is the natural conversion opportunity. Liaise with the DNO about a PME terminal if available. If PME is not available, design as TT with a local earth electrode and 30 mA RCD protection at the origin under Section 411. Do not extend the TN-C arrangement into any new work.',
    },
    {
      name: 'Record the correct Section I tick-box on the certificate',
      text:
        'For a new installation, tick the correct arrangement on the EIC Section I: TN-C-S (PME), TN-C-S (PNB), TN-S or TT. Do not tick TN-C. For an EICR, tick the arrangement actually present and record the observation appropriately. Avoid ticking "TN-C-S" without specifying PME or PNB.',
    },
    {
      name: 'Brief the client on the implications',
      text:
        'For an EICR with a TN-C observation, explain that the installation is not inherently unsafe but the regulation has moved on, and any future significant work will need to convert. Provide a written quotation for the conversion (PME terminal request to the DNO, or TT design with electrode and RCD) so the client can plan and budget.',
    },
  ],
  faqs: [
    {
      question: 'Does A4:2026 mean my existing TN-C installation is now illegal?',
      answer:
        'No. A4:2026 prohibits TN-C in NEW installations from the date the amendment came into force. Existing TN-C installations are coded against the standard in force at the time they were installed — they are not retrospectively unlawful. An EICR will typically record a C3 (improvement recommended), or higher where there are observable safety implications.',
    },
    {
      question: 'Is TN-C-S (PME) banned by A4:2026?',
      answer:
        'No. TN-C-S — including both the PME (distributor-side) and PNB (consumer-side) variants — is fully permitted under A4:2026. The prohibition applies only to TN-C, where the combined PEN runs throughout the installation. In TN-C-S the combined PEN runs only up to a defined splitting point, and is then split into separate N and PE for the rest of the installation.',
    },
    {
      question: 'What is the difference between TN-C and TN-C-S?',
      answer:
        'TN-C has a combined protective-and-neutral (PEN) conductor running throughout the installation, with no separate cpc. TN-C-S has a combined PEN only up to a defined splitting point (typically the supply terminals, or a privately-owned transformer), after which N and PE run as two separate conductors. A4:2026 prohibits TN-C; TN-C-S in both PME and PNB variants remains fully compliant.',
    },
    {
      question: 'What code should I give a TN-C installation on an EICR?',
      answer:
        'The default is C3 (improvement recommended) for an intact, functioning TN-C installation that is no longer aligned with A4:2026. Escalate to C2 where there is a present hazard such as missing main protective bonding. Use C1 only where there is an active observable danger such as a broken PEN with metalwork at line potential. Use FI where the arrangement cannot be positively identified.',
    },
    {
      question: 'Does the A4:2026 TN-C prohibition affect EV charger installations?',
      answer:
        'It does not change the Section 722 rules for EV chargers. It does mean that a new EV charge point cannot be installed on a TN-C arrangement — but TN-C was already a poor choice for EV charging. The PME and PNB open-PEN mitigations in Section 722 continue to apply unchanged, and TT remains the simplest alternative where open-PEN risk on a PME supply is a concern.',
    },
    {
      question: 'If I do a consumer unit change on a TN-C installation, do I have to convert the earthing?',
      answer:
        'Yes — any new work falls under A4:2026, and a consumer unit change is new work. The replacement consumer unit must not extend the TN-C arrangement. In practice this means converting the supply to TN-C-S (talk to the DNO about a PME terminal) or designing the installation as TT with a local earth electrode and origin RCD protection.',
    },
    {
      question: 'What is PNB and how is it different from PME?',
      answer:
        'PNB stands for Protective Neutral Bonding — the consumer-side variant of TN-C-S in which the combined PEN runs from a privately-owned HV/LV transformer to the consumer\'s switchgear. PME is the distributor-side variant, in which the DNO provides the combined PEN up to the supply terminals. A4:2026 introduced separate tick-boxes for PME and PNB on the EIC and EICR Section I.',
    },
    {
      question: 'What about TN-S — is it still allowed?',
      answer:
        'Yes. TN-S, in which the distributor provides a separate metallic protective conductor from source, is fully compliant under A4:2026. It is less common in new urban supplies, where PME is the default, but it remains an entirely valid arrangement where the DNO supply provides it.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'The complete overview of Amendment 4:2026 — AFDD requirements, TN-C-S (PME/PNB) split, new schedule columns, model form changes and the TN-C prohibition.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
      title: 'A4:2026 TN-C-S (PNB) Earthing Arrangement',
      description: 'The new Section I tick-box that distinguishes Protective Neutral Bonding from Protective Multiple Earthing…',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/tns-vs-tncs-vs-tt',
      title: 'TN-S vs TN-C-S vs TT Compared',
      description: 'Side-by-side comparison of the three compliant UK earthing arrangements — what each looks like, when each applies, and how the design decisions differ.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/what-is-earthing',
      title: 'What Is Earthing?',
      description: 'A primer on earthing, bonding, protective conductors, the role of the earth electrode and why automatic disconnection of supply needs a low-impedance…',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-no-main-protective-bonding',
      title: 'EICR — No Main Protective Bonding',
      description: 'How to code an EICR observation where main protective bonding to extraneous-conductive-parts is missing — and why the implications are more serious on a…',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for EV Charger',
      description: 'Practical cable sizing for a 7 kW or 22 kW EV charger — including the supply earthing arrangement (PME, PNB, TN-S…',
      icon: 'Calculator',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Get the A4:2026 earthing decision right, first time',
  ctaSubheading:
    'The Elec-Mate certificate suite is fully aligned to BS 7671:2018+A4:2026 — Section I structured selectors for PME, PNB, TN-S and TT, automatic flagging of TN-C observations on EICR, and the Section 722 EV charger workflow built into the EIC. 7-day free trial, cancel anytime.',
};
