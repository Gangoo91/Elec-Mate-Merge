import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IET Guidance Note 3 (Inspection & Testing, 9th Edition), the IET On-Site Guide,
// plus relevant statutory frameworks (CDM 2015, Housing Act 2004 for HMO licensing).

const published = '2026-05-17';
const modified = '2026-05-18';

export const afddMandatoryHmoCareHomeA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/afdd-mandatory-hmo-care-home-a4-2026',
  title:
    'AFDD Mandatory in HMOs, Care Homes & Student Accommodation',
  description:
    'AFDDs mandatory in HMOs, care homes and student accommodation under BS 7671:2018+A4:2026. Expanded scope of Regulation 421.1.7 and 421.1.7.101…',
  datePublished: published,
  dateModified: modified,
  readingTime: 14,
  badge: 'A4:2026 Mandatory Scope',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'AFDD Mandatory — HMO & Care Home',
  heroPrefix: 'AFDD Mandatory in HMOs, Care Homes &',
  heroHighlight: 'Student Accommodation',
  heroSuffix: '— BS 7671:2018+A4:2026',
  heroSubtitle:
    'Amendment 4 (published 15 April 2026) expanded the list of premises in which Arc Fault Detection Devices are mandatory rather than recommended. HMOs, care homes, student accommodation, sheltered housing and other higher-risk residential premises now sit firmly inside Regulation 421.1.7. This guide explains which categories are caught, the retrofit obligations on landlords and operators, EICR coding for missing AFDDs, who enforces compliance, and how to design AFDD protection that works rather than nuisance-trips.',
  keyTakeaways: [
    'A4:2026 expanded the mandatory AFDD scope under Regulation 421.1.7 — HMOs, care homes, student accommodation and other higher-risk premises are now firmly inside the requirement, not a discretionary "recommended" call.',
    'Regulation 421.1.7 sets the general AFDD requirement; Regulation 421.1.7.101 specifies the higher-risk premises and circuits where AFDDs are mandatory rather than a recommendation.',
    'Retrofit is triggered by EICR findings, consumer unit replacement, partial rewires affecting protected circuits, fault investigation after an arc-fault incident, and HMO licence renewal conditions.',
    'On a within-scope premises, an absent AFDD on a relevant final circuit is typically coded C2 (potentially dangerous), with FI used where the inspector cannot determine on the day whether protection is present.',
    'Enforcement is layered — Housing Act 2004 for licensable HMOs, Regulatory Reform (Fire Safety) Order 2005 for the responsible person, and the Care Quality Commission for registered care providers.',
    'False-tripping on LED drivers and SMPS is overwhelmingly a product-selection and circuit-segregation issue, not a fault with the AFDD concept — manufacturer training and compatibility data matter.',
  ],
  sections: [
    {
      id: 'what-changed-in-a4',
      heading: 'What A4:2026 Changed for AFDD Scope',
      tocLabel: 'What A4 changed',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Amendment 2 (2022) was the moment AFDD first became mandatory in BS 7671 for a defined list of higher-risk premises — care homes, HMOs, certain residential high-rise buildings and student accommodation, with a presumption that designers would specify AFDD on socket-outlet final circuits up to 32 A. Outside that list AFDDs remained a recommended measure.',
        },
        {
          type: 'paragraph',
          text:
            'A4:2026 did three things. First, it sharpened the controlling regulation numbers — Regulation 421.1.7 now sets the general requirement, with Regulation 421.1.7.101 specifying the higher-risk premises where AFDDs are mandatory. Second, it widened the mandatory list so the boundary between recommended and mandatory is no longer a judgement call for sleeping accommodation in higher-risk residential occupancies. Third, it cross-referenced the EICR model forms — item 4.23 and schedule-of-test-results column 30 — so the presence, type and operational status of every AFDD now appears on the standard certificate.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'A4 did not invent AFDD requirements — it tightened them',
          text:
            'If you treated A2:2022 AFDD requirements as a serious mandatory list already, A4:2026 will feel like a clarification. If you treated A2 as advisory, A4:2026 closes that door. See our [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary) for the full amendment overview, and the companion [A4 AFDD changes guide](/guides/bs-7671-a4-2026-afdd-changes) for item 4.23 and column 30 in detail.',
        },
      ],
    },
    {
      id: 'mandatory-categories',
      heading: 'Premises Categories Now Mandatory Under A4:2026',
      tocLabel: 'Mandatory categories',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The categories below sit squarely inside the mandatory AFDD scope under Regulation 421.1.7 and Regulation 421.1.7.101 following A4:2026. They share three defining features: people sleep on the premises, occupants may have reduced ability to self-evacuate, and arc-fault initiated fires have a disproportionate consequence.',
        },
        {
          type: 'list',
          items: [
            'Houses in Multiple Occupation (HMOs) as defined by the Housing Act 2004 — including mandatory licensable HMOs (five or more occupiers forming more than one household sharing facilities) and additional/selective licensing schemes set locally.',
            'Care homes registered with the Care Quality Commission (CQC) under the Health and Social Care Act 2008 — residential homes, nursing homes and homes for people with learning disabilities, dementia or physical disabilities.',
            'Purpose-built student accommodation (PBSA) and university halls of residence, including cluster flats sharing kitchens and bathrooms.',
            'Sheltered housing and extra-care schemes where occupants share an element of the building, have on-site management, or have characteristics that justify enhanced fire protection.',
            'Supported living and assisted living accommodation where occupants have learning disabilities, mental health needs or physical impairments affecting self-evacuation.',
            'Residential high-rise buildings within the scope of A4:2026 higher-risk residential occupancy provisions, including buildings inside the Building Safety Act 2022 higher-risk building regime.',
            'Hostels, refuges and similar sleeping accommodation with shared circulation and shared escape routes.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mixed-use buildings: scope follows the use, not the postcode',
          text:
            'A residential block above a high-street retail unit is residential for the AFDD scope question. A care home occupying a converted Victorian villa is a care home, not a "house". Classification follows actual occupancy and fire-risk profile, not historic building type. If in doubt, treat as in-scope and document the reasoning.',
        },
        {
          type: 'paragraph',
          text:
            'Single-family owner-occupier dwellings and standard PRS flats that are not HMOs remain outside the mandatory list — AFDDs there are recommended but not mandatory under Regulation 421.1.7.101. Several local authority licensing schemes already require AFDDs as a condition of HMO licence renewal regardless.',
        },
      ],
    },
    {
      id: 'reg-421-distinction',
      heading: 'Regulation 421.1.7 vs 421.1.7.101 — The Two Layers',
      tocLabel: 'Reg 421.1.7 vs 421.1.7.101',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A frequent source of confusion is the relationship between Regulation 421.1.7 and Regulation 421.1.7.101. They are not duplicates — they sit in a two-layer structure.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Regulation 421.1.7 — the general requirement. It introduces AFDD as a recognised protective measure against arc-fault fire, sets the device standard (BS EN 62606), the location options (origin of circuit or specific final circuit positions), and the operational requirements (status indication, functional test).',
            'Regulation 421.1.7.101 — the higher-risk premises requirement. It promotes AFDD from recommended to mandatory for the specific list of higher-risk premises identified in A4:2026 — HMOs, care homes, student accommodation, sheltered housing and similar occupancies.',
            'Supporting sub-clauses — A4:2026 added clarifying sub-clauses specifying which final circuits are caught (typically socket-outlet final circuits up to 32 A and final circuits supplying fixed sleeping-room equipment) and which are exempt (EV charging under Regulation 722.421.1.7.201, certain medical locations under Regulation 710.421.1.7).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Device location: origin or final circuit',
          text:
            'Regulation 421.1.7 allows AFDDs at the origin of the circuit (typically a combined RCBO+AFDD device in the consumer unit) or at a downstream point. The all-in-one device at the consumer unit dominates new HMO and care home installations because it simplifies the schedule of test results and the EICR inspection.',
        },
      ],
    },
    {
      id: 'retrofit-triggers',
      heading: 'Retrofit Triggers — When Existing Installations Must Comply',
      tocLabel: 'Retrofit triggers',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 does not, by itself, require every existing HMO or care home to be rewired. BS 7671 is not retrospective in that sense. What A4:2026 does is reset the benchmark against which new or revised electrical work in a within-scope premises is judged — with five recognisable triggers that bring an existing installation into the mandatory requirement.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'EICR finding — when an EICR under A4:2026 identifies that mandatory AFDD protection is absent on relevant final circuits, the absence is coded (typically C2) and the duty holder is obliged to remedy within the timescale set.',
            'Consumer unit replacement — replacing the consumer unit in a within-scope premises is new installation work and triggers full A4:2026 compliance for the circuits served. In practice this means AFDDs (typically combined RCBO+AFDD devices) on socket-outlet final circuits up to 32 A and relevant sleeping-room circuits.',
            'Partial rewire affecting protected circuits — replacing or significantly altering a final circuit within the mandatory scope means that circuit must be brought up to A4:2026 on energisation. Untouched circuits are not retrospectively caught.',
            'Fault investigation after an arc-fault or fire incident — where investigation traces the cause to an arc fault in a socket-outlet circuit, remedial work is full A4:2026 compliance on that circuit. Insurers increasingly require this as a condition of cover renewal.',
            'Licensable HMO renewal — local authority licensing officers can (and increasingly do) attach AFDD installation as a condition of HMO licence grant or renewal under the Housing Act 2004.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No "predates A4" defence on consumer unit changes',
          text:
            'It is not acceptable to argue "the original installation predates A4 so I do not need to install AFDDs on the new consumer unit". Once a consumer unit is replaced, the new installation must comply with the current edition — and on a within-scope premises that means AFDDs on the relevant circuits. The contractor signing the EIC is signing for current-edition compliance. For the wider EICR retrofit picture see the [EICR for HMO guide](/guides/eicr-for-hmo).',
        },
      ],
    },
    {
      id: 'eicr-coding',
      heading: 'EICR Coding When AFDDs Are Absent',
      tocLabel: 'EICR coding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Coding the absence of an AFDD on a within-scope premises is one of the most consequential decisions an inspector makes under A4:2026 — the code drives the remediation timescale (28 days for C1/C2 findings under the Electrical Safety Standards in the Private Rented Sector Regulations 2020).',
        },
        {
          type: 'list',
          items: [
            'C1 (Danger present) — not the default code for a missing AFDD. C1 is reserved for present and immediate risk of injury. Mere absence of AFDD protection on a within-scope circuit does not, on its own, justify C1 unless paired with additional findings (evidence of arcing, scorched terminals, an active fault).',
            'C2 (Potentially dangerous) — the standard code where AFDD protection is mandatory under Regulation 421.1.7.101 and absent on the relevant final circuit(s). The framing reflects the increased fire risk in higher-risk residential occupancies.',
            'C3 (Improvement recommended) — appropriate where AFDD protection is recommended under Regulation 421.1.7 but the premises is outside the Regulation 421.1.7.101 mandatory scope. C3 is not appropriate for HMOs, care homes or similar within-scope premises.',
            'FI (Further investigation) — appropriate when the inspector cannot determine on the day whether the relevant circuits are protected (sealed consumer unit, missing schedule of test results, illegible device markings). FI obliges the duty holder to facilitate investigation within an agreed timescale.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Defensive coding under-protects occupants',
          text:
            'Inspectors sometimes default to C3 to avoid a confrontational conversation. On a within-scope premises that under-codes the risk and shifts liability to the inspector. If the regulations make AFDD mandatory, absence is C2 — see the detailed [C2 coding guide](/guides/eicr-code-c2).',
        },
        {
          type: 'paragraph',
          text:
            'The other coding pitfall is treating "AFDD fitted but indicator absent" as C3. A4:2026 made the operational indicator a routine inspection check under item 4.23 — an AFDD with no status indication, no test button function, or visible damage is recorded as defective. Most inspectors will code this C2 (the protective function is not demonstrably working).',
        },
      ],
    },
    {
      id: 'enforcement',
      heading: 'Who Enforces — The Multi-Layered Regulatory Picture',
      tocLabel: 'Enforcement',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 is non-statutory — it does not have direct legal force the way the Electricity at Work Regulations 1989 do. Enforcement comes through the patchwork of statutory regimes that adopt it as the benchmark. On a within-scope HMO or care home, that patchwork is dense and overlapping.',
        },
        {
          type: 'list',
          items: [
            'Housing Act 2004 — local authority housing officers enforce HMO licensing conditions. Most schemes require a current satisfactory EICR and increasingly attach AFDD compliance as a specific licence condition.',
            'Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 — apply to most PRS tenancies in England including HMOs; require five-yearly EICRs and remediation of C1/C2/FI findings within 28 days; penalties up to £30,000 per breach.',
            'Regulatory Reform (Fire Safety) Order 2005 — places duties on the "responsible person" in non-domestic premises and the common parts of multi-occupied residential buildings; the Fire and Rescue Service is the principal enforcer; arc-fault initiated fires are increasingly cited as preventable in enforcement notices.',
            'Care Quality Commission (CQC) — regulates registered care providers under the Health and Social Care Act 2008. Regulation 12 (safe care and treatment) covers premises safety; CQC inspectors expect a current EICR and evidence of compliance with current BS 7671.',
            'Building Safety Regulator — under the Building Safety Act 2022, oversees higher-risk residential buildings; AFDD installation is increasingly cited as a relevant control measure in HRB safety case reports.',
            'Insurers — not statutory enforcers, but non-compliance with current BS 7671 on a within-scope premises is a near-universal grounds for cover review and increased premiums or refusal.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For HMO landlords specifically the practical sequence is established: the licensing officer requests the EICR at application or renewal; the EICR codes AFDD absence as C2; the landlord remediates within the licence timescale; failure is a breach of licence and a Housing Act 2004 offence. See the [HMO electrical requirements guide](/guides/hmo-electrical-requirements) for the full landlord-side picture.',
        },
      ],
    },
    {
      id: 'design-installation',
      heading: 'Designing and Installing AFDD Protection That Works',
      tocLabel: 'Design & installation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'AFDDs have a reputation in some circles for nuisance tripping. That reputation is largely a product of three avoidable factors: poor product selection, badly segregated circuits, and installers without manufacturer training. None are inherent flaws in the concept.',
        },
        {
          type: 'list',
          items: [
            'Specify combined RCBO+AFDD devices at the consumer unit rather than separate modules where possible — this simplifies the schedule of test results and the EICR record and reduces consumer unit width.',
            'Match the AFDD to the load profile — mainstream manufacturers publish compatibility data for common LED drivers, switched-mode power supplies and motor loads; check this before specifying.',
            'Avoid mixing loads with very different switching signatures on the same AFDD final circuit — segregating bedroom socket circuits from kitchen circuits with high-inrush appliances reduces nuisance tripping.',
            'Mind cable runs — long runs (over about 50 m) with high background capacitance can confuse some AFDD algorithms; refer to manufacturer guidance and consider an AFDD at the final-circuit position rather than at the origin where this is a concern.',
            'Insist on manufacturer training for installation operatives — most major AFDD manufacturers run product-specific training, and several insurers and HMO licensing schemes are starting to require evidence of it.',
            'Document the AFDD on schedule of test results column 30 properly — device type, BS EN 62606 declaration, status indication confirmed, functional test result. Sloppy documentation creates avoidable FI codes on the next EICR.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common false-trip cause: cheap LED drivers',
          text:
            'The single most-reported AFDD false-trip cause in HMO and student accommodation installations is low-cost LED drivers with poor EMC performance from non-mainstream brands. The first step in any false-trip investigation is to identify and replace the LED driver, not to remove the AFDD.',
        },
        {
          type: 'paragraph',
          text:
            'On a within-scope premises with TN-C-S (PNB) earthing the combined RCBO+AFDD at the origin is the dominant solution — see the [A4 TN-C-S (PNB) earthing guide](/guides/bs-7671-a4-2026-tn-c-s-pnb-earthing) for the wider context.',
        },
      ],
    },
    {
      id: 'exemptions',
      heading: 'Exemptions and Edge Cases',
      tocLabel: 'Exemptions',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026 retained the exemptions that had developed under A2:2022 and added clarifying language for several edge cases. The practical exemptions an HMO or care home designer needs to know about are:',
        },
        {
          type: 'list',
          items: [
            'EV charging equipment conforming to BS EN 61851 series — exempt under Regulation 722.421.1.7.201. The exemption applies to the dedicated EV charging final circuit only, not to other final circuits in the same installation.',
            'Medical locations of group 0 and group 2 — AFDDs are explicitly prohibited under Regulation 710.421.1.7. Care homes with nursing or treatment rooms classified as medical locations must respect this prohibition for those rooms.',
            'Circuits supplied by a medical IT system — AFDDs are prohibited under Regulation 710.421.1.7.101.',
            'Final circuits supplying safety services where the AFDD function could conflict with the safety service requirements — document on the EIC departures with rationale.',
            'Specialist commercial loads where the product standard explicitly addresses arc-fault risk by other means — rare in residential settings but applicable in some mixed-use buildings.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Exemption claims must be documented',
          text:
            'Where a designer claims an exemption, the claim should be recorded on the EIC departures section with the regulation reference and the reason — not buried in a verbal handover. The next EICR inspector will see only the certificate.',
        },
      ],
    },
    {
      id: 'elec-mate-toolkit',
      heading: 'How the Elec-Mate Toolkit Handles AFDD Compliance',
      tocLabel: 'Elec-Mate toolkit',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A BS 7671:2018+A4:2026 compliant EICR or EIC on an HMO or care home with AFDD protection involves more paperwork than the pre-A4 equivalent — item 4.23, column 30, exemption notes on the EIC departures section, and documentation of every AFDD\'s type, manufacturer and operational status. The Elec-Mate certification suite handles this in the standard form workflow.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'The Elec-Mate EICR tool prompts item 4.23 inspection automatically when the premises type is recorded as HMO, care home, student accommodation or similar within-scope category.',
            'The schedule of test results includes column 30 as a standard column on A4-compliant forms, with device-type dropdowns aligned to common UK AFDD manufacturers.',
            'The EIC tool surfaces the AFDD specification at the protective devices stage and produces the BS 7671 declaration accordingly.',
            'C2 and FI coding for missing AFDDs is suggested in the EICR coding helper when the premises is recorded as within-scope and a relevant final circuit is identified as not AFDD-protected.',
            'The certificate PDFs produced are A4:2026 compliant — current model forms, current inspection schedule, current schedule of test results columns.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'The Elec-Mate EICR tool, EIC tool, Minor Works Certificate tool and the wider BS 7671:2018+A4:2026 compliant certification suite are included on the Electrician subscription tier. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Design and Install AFDD Protection in a Within-Scope Premises',
  howToDescription:
    'A six-step sequence for designers and installers working on HMOs, care homes, student accommodation and other A4:2026 within-scope premises — from initial scope confirmation to handover.',
  howToSteps: [
    {
      name: 'Confirm the premises is within the A4:2026 mandatory scope',
      text:
        'Identify the premises type against the Regulation 421.1.7.101 list — HMO under the Housing Act 2004, CQC-registered care home, student accommodation, sheltered housing, supported living, residential high-rise or similar. Document the classification on the design record so the AFDD specification is anchored to the regulatory position, not a verbal request.',
    },
    {
      name: 'Identify the final circuits that require AFDD protection',
      text:
        'Walk the circuits and identify the socket-outlet final circuits up to 32 A and sleeping-room equipment final circuits inside the mandatory scope. Cross-check the exemption list (EV charging under Regulation 722.421.1.7.201, medical locations under Regulation 710.421.1.7) and record any exempted circuits with the rationale.',
    },
    {
      name: 'Specify the AFDD product family',
      text:
        'Choose a BS EN 62606 compliant AFDD product family from a mainstream manufacturer. Prefer combined RCBO+AFDD devices at the consumer unit for simplicity. Check compatibility data against the expected load profile and ensure manufacturer training is available for the installing operatives.',
    },
    {
      name: 'Detail the consumer unit and segregation',
      text:
        'Size the consumer unit to accommodate the AFDD devices. Segregate circuits with materially different switching signatures (sleeping-room sockets vs kitchen sockets with high-inrush appliances) to minimise nuisance tripping. Confirm cable run lengths are within manufacturer guidance for AFDDs at the origin.',
    },
    {
      name: 'Install, test and complete the documentation',
      text:
        'Install per manufacturer instructions, energise, confirm status indication on every AFDD, perform the functional test, and complete the schedule of test results with column 30 properly populated. Issue the EIC with the AFDD specification recorded in the protective devices section and any exemptions noted in the departures section.',
    },
    {
      name: 'Produce the handover pack and signpost the next EICR',
      text:
        'Provide the building manager or landlord with the AFDD information card, the reset and re-test procedure, the maintenance plan reference, and a copy of the schedule of test results for the licensing pack. Note the AFDD installation date and manufacturer reference for the next EICR inspector.',
    },
  ],
  faqs: [
    {
      question: 'When did AFDDs become mandatory in HMOs and care homes?',
      answer:
        'AFDDs first became mandatory in a defined list of higher-risk premises (including care homes, HMOs and student accommodation) under BS 7671 Amendment 2 in 2022. Amendment 4, published 15 April 2026, sharpened the controlling regulation numbers (Regulation 421.1.7 and Regulation 421.1.7.101), widened the list to remove ambiguity for sleeping accommodation in higher-risk residential occupancies, and integrated AFDD inspection into the standard EICR model forms (item 4.23 and schedule-of-test-results column 30). The result is that the mandatory scope is now unambiguous for HMOs, CQC-registered care homes, purpose-built student accommodation, sheltered housing, supported living and similar premises.',
    },
    {
      question: 'Do existing HMOs and care homes have to be retrofitted with AFDDs?',
      answer:
        'BS 7671 is not retrospective — A4:2026 does not, by itself, require every existing HMO or care home to be rewired. However, retrofit is triggered by five recognisable events: an EICR finding coded as C2 with a 28-day remediation clock; a consumer unit replacement (the new installation must comply with the current edition); a partial rewire affecting protected circuits; fault investigation after an arc-fault or fire incident; and HMO licence renewal where the local authority attaches AFDD installation as a licence condition under the Housing Act 2004. Most within-scope premises will be brought into compliance through the normal EICR and consumer unit refresh cycle rather than as a single retrofit project.',
    },
    {
      question: 'What EICR code should an inspector use when AFDDs are absent from a within-scope premises?',
      answer:
        'The standard code is C2 — potentially dangerous. Regulation 421.1.7.101 makes AFDD protection mandatory in higher-risk residential occupancies because of the disproportionate consequence of an arc-fault initiated fire in sleeping accommodation; absence of the mandatory measure constitutes a potentially dangerous condition. C3 (improvement recommended) is not appropriate for within-scope premises — that is the code for non-mandatory installations. FI (further investigation) is appropriate where the inspector cannot determine on the day whether the relevant circuits are protected.',
    },
    {
      question: 'How much does it cost to add AFDD protection to an HMO consumer unit?',
      answer:
        'For a typical single-board HMO consumer unit replacement the AFDD-related materials uplift is £400-£700 over an equivalent RCBO-only specification. Combined RCBO+AFDD devices are typically four to six times the cost of equivalent RCBOs, and the consumer unit may need a larger model. Labour uplift is small — AFDDs install in the same DIN-rail position; the additional work is documentation and the functional test. For a mid-sized care home the AFDD uplift across distribution boards is typically £3,000-£8,000 in materials.',
    },
    {
      question: 'Who actually enforces the AFDD requirement in a care home or HMO?',
      answer:
        'Enforcement is layered. For licensable HMOs the local authority housing officer enforces licence conditions under the Housing Act 2004. For PRS HMOs in England the Electrical Safety Standards in the Private Rented Sector Regulations 2020 add a five-yearly EICR obligation and a 28-day remediation clock for C1/C2/FI findings, with penalties up to £30,000 per breach. For CQC-registered care homes the Care Quality Commission inspects against Regulation 12. The Fire and Rescue Service enforces the Regulatory Reform (Fire Safety) Order 2005. The Building Safety Regulator oversees higher-risk residential buildings under the Building Safety Act 2022. Insurers also exert significant practical pressure.',
    },
    {
      question: 'Are there any exemptions from the mandatory AFDD requirement on within-scope premises?',
      answer:
        'Yes. Dedicated EV charging final circuits conforming to BS EN 61851 are exempt under Regulation 722.421.1.7.201. Medical locations of group 0 and group 2 are explicitly prohibited from AFDD installation under Regulation 710.421.1.7. Circuits supplied by a medical IT system are prohibited under Regulation 710.421.1.7.101. Final circuits supplying safety services where the AFDD function would conflict with safety service requirements can be exempted. All exemption claims must be recorded on the EIC departures section with the regulation reference and the rationale.',
    },
    {
      question: 'Do AFDDs really nuisance-trip on LED drivers?',
      answer:
        'They can, but the cause is almost always avoidable. The single most-reported nuisance-trip cause in HMO and student accommodation installations is low-cost LED drivers with poor EMC performance, typically from non-mainstream brands. The first step in any false-trip investigation is to identify and replace the offending LED driver, not to remove the AFDD. Mainstream AFDD manufacturers publish compatibility data; designers should check this before specifying and should avoid mixing loads with very different switching signatures on the same AFDD final circuit.',
    },
    {
      question: 'Does the AFDD requirement apply to standard private rented flats as well?',
      answer:
        'Not under the mandatory scope of Regulation 421.1.7.101 as it currently stands. Standard PRS flats and houses that are not HMOs, care homes, student accommodation or similar higher-risk residential occupancies remain outside the A4:2026 mandatory list — AFDDs there are recommended under Regulation 421.1.7 but not mandatory. However, the position is under active review and several local authority licensing schemes already require AFDDs as a condition of licence grant or renewal regardless of national BS 7671 status. Designers and landlords in actively licensed boroughs should check local licensing conditions.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 Amendment 4 (2026) — Summary',
      description:
        'The full A4:2026 amendment overview — AFDD scope expansion, TN-C-S (PNB) earthing, new schedule columns, EIC and Minor Works model form updates.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'A4:2026 AFDD Changes (Item 4.23 + Column 30)',
      description:
        'Detailed walk-through of the AFDD inspection item 4.23, schedule-of-test-results column 30, and the operational test inspectors must perform.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-for-hmo',
      title: 'EICR for HMO — Landlord Duties and Common Findings',
      description:
        'Five-yearly EICR obligation in HMOs, licence-condition timing, plastic consumer unit findings, AFDD coding and the interaction with HMO licensing.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/hmo-electrical-requirements',
      title: 'HMO Electrical Requirements (UK)',
      description:
        'The full HMO landlord electrical compliance picture — licensing, EICRs, AFDD scope, fire alarm interaction, periodic testing and remediation timescales.',
      icon: 'Building2',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-plastic-consumer-unit-hmo',
      title: 'EICR — Plastic Consumer Unit in an HMO',
      description:
        'How inspectors should code a non-metallic consumer unit on an HMO EICR, the C2 reasoning…',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/care-home-electrical-cost',
      title: 'Care Home Electrical Cost Guide',
      description:
        'Cost picture for care home EICRs, consumer unit upgrades, AFDD specification, fire alarm interaction and phased compliance programmes.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c2',
      title: 'EICR Code C2 — Potentially Dangerous',
      description:
        'When C2 is the right code, when C1 or C3 are right instead, and the standard C2 reasoning for absent AFDD protection on within-scope premises.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-tn-c-s-pnb-earthing',
      title: 'A4:2026 TN-C-S (PNB) Earthing',
      description:
        'How A4 changed the recognised earthing arrangements for domestic-style installations and how the AFDD specification interacts with TN-C-S (PNB) at the…',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description:
        'Produce an A4:2026 compliant EICR — item 4.23 prompts, column 30 in the schedule of test results…',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Stop second-guessing the AFDD scope on HMO and care home EICRs',
  ctaSubheading:
    'The Elec-Mate certification suite produces BS 7671:2018+A4:2026 compliant EICRs and EICs with item 4.23 and column 30 baked in, suggested C2 / FI coding for within-scope premises with absent AFDDs, and the supporting documentation landlords and care home operators need.',
};
