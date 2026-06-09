import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide. The HMO
// classification context references the Housing Act 2004 + The Management
// of Houses in Multiple Occupation (England) Regulations 2006.

const published = '2026-05-17';
const modified = '2026-05-18';

export const eicrPlasticConsumerUnitHmoConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-plastic-consumer-unit-hmo',
  title: 'EICR: Plastic Consumer Unit in an HMO — C2 or C3?',
  description:
    "When a plastic consumer unit in an HMO is a C2 (potentially dangerous, makes the EICR unsatisfactory) and when it's a C3 (improvement recommended). BS 7671 Regulation 421.1.201, escape route considerations, and the remedial pathway for landlords.",
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'EICR Common Defect',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'Plastic CU in HMO',
  heroPrefix: 'Plastic Consumer Unit',
  heroHighlight: 'in an HMO',
  heroSuffix: '— C2 or C3?',
  heroSubtitle:
    'Plastic consumer units are everywhere in older UK installations. In an HMO escape route the same fitting can be a C2 ("potentially dangerous", makes the EICR unsatisfactory, 28-day remedial deadline under PRS Regs 2020). Elsewhere it might be a C3. This guide explains the decision boundary, the regulation context, and what every HMO landlord needs to know.',
  answerBox: {
    question: 'Is a plastic consumer unit in an HMO a C2 or C3 on an EICR?',
    answer:
      'It depends on the fire-spread context, not on the HMO label alone. A plastic consumer unit in an HMO escape route — under a wooden staircase, in a shared corridor near combustibles, or in a fire-resisting compartment wall — is typically a C2 ("potentially dangerous"), which makes the EICR unsatisfactory. Away from any escape route with no combustible surroundings it is usually a C3. Visible heat damage or arcing pushes it to C1.',
  },
  keyTakeaways: [
    'Regulation 421.1.201 of BS 7671 (introduced January 2016 in BS 7671:2008+A3 and retained through A4:2026) requires consumer units and similar switchgear assemblies in domestic premises to comply with BS EN 61439-3 and to have a non-combustible enclosure.',
    'For consumer units installed before January 2016: the original installation was compliant at the time. A plastic CU in a normal domestic setting is typically a C3 ("Improvement recommended").',
    'In an HMO escape route, under wooden staircases, in a roof void with combustible storage, in a fire-resisting compartment wall — the same plastic CU becomes a C2 because the combustibility creates potential danger in that specific context.',
    'HMO classification under the Housing Act 2004 + Management of HMOs (England) Regs 2006 makes the property subject to additional fire-safety duties on the landlord — a plastic CU in a designated escape route or near a fire-resisting partition is materially different from a domestic dwelling.',
    "Remedial options: full consumer unit replacement to a metal-enclosed all-RCBO unit (most common); retrofit a metal enclosure around the existing CU (rare, manufacturer-specific); upgrade to RCBOs in a metal-clad replacement (best practice combining 421.1.201 + 411.3.4 A4 compliance). Any replacement CU must comply with BS EN 61439-3 — verify the manufacturer's declaration before supply.",
    'For HMOs under PRS Regs 2020 (England), a C2 on the EICR triggers a 28-day remedial deadline with mandatory written confirmation to tenants + local authority on request.',
    'Under Regulation 421.1.7 of BS 7671:2018+A4:2026, arc fault detection devices (AFDDs) conforming to BS EN 62606 are now MANDATORY for single-phase AC final circuits supplying socket-outlets not exceeding 32 A in houses in multiple occupation (HMOs) — alongside high rise residential buildings, purpose-built student accommodation and care homes. A consumer unit replacement in an HMO is the moment this requirement is engaged.',
  ],
  sections: [
    {
      id: 'the-regulation',
      heading: 'Regulation 421.1.201 — The Underlying Requirement',
      tocLabel: 'The regulation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Regulation 421.1.201 of BS 7671 requires that, in domestic (household) premises, consumer units and similar switchgear assemblies be enclosed in a non-combustible enclosure or otherwise have measures to ensure that any fire originating within the assembly cannot spread to combustible surrounding materials.',
        },
        {
          type: 'list',
          items: [
            '**Date introduced** — Regulation 421.1.201 was added in BS 7671:2008+A3 (effective January 2016).',
            '**Retained in A4:2026** — the regulation is unchanged in current edition.',
            "**BS EN 61439-3 compliance** — Regulation 421.1.201 also requires consumer units and similar switchgear assemblies to comply with BS EN 61439-3 (low-voltage switchgear and controlgear assemblies — distribution boards intended to be operated by ordinary persons). This obligation applies irrespective of which enclosure option is chosen. A competent electrician selecting a replacement unit must verify the manufacturer's BS EN 61439-3 declaration before installation.",
            "**Non-combustible** — the standard practical implementation is a steel / metal enclosure. Some manufacturers offer composite materials that meet the non-combustibility requirement; verify against the manufacturer's declaration.",
            '**"Or otherwise" caveat** — the regulation permits alternative measures, but in practice almost all UK installers now fit metal-enclosed consumer units rather than rely on alternative containment.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why the change happened',
          text: 'Prior to 2016, plastic consumer units were the UK domestic norm. The London Fire Brigade and trade bodies raised concerns that fires originating in consumer units (often from loose terminals or arcing) had spread through the plastic enclosure to surrounding combustible materials. Regulation 421.1.201 was introduced to break that fire-spread path at source.',
        },
      ],
    },
    {
      id: 'classification-context',
      heading: 'The C2 vs C3 Decision in HMO Context',
      tocLabel: 'C2 vs C3 in HMO',
      blocks: [
        {
          type: 'paragraph',
          text: 'For a plastic consumer unit installed pre-2016, the classification on the EICR depends on the physical context — particularly the fire-spread implications. The same physical fitting can earn a [C2](/guides/eicr-code-c2-potentially-dangerous) or a [C3](/guides/eicr-code-c3-improvement-recommended) depending on where it sits. Three typical scenarios:',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'C3 — Improvement recommended',
          text: '**Standard domestic, owner-occupied, not in an escape route.** The plastic CU does not meet the current non-combustible-enclosure standard, but its location does not create a heightened potential-danger scenario. A C3 does not, on its own, make the EICR unsatisfactory — but it should still be acted on at the next reasonable opportunity.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'C2 — Potentially dangerous (makes the EICR unsatisfactory)',
          text: '**HMO escape route — under a wooden staircase, in a shared corridor near combustibles, or in a fire-resisting compartment wall.** A fire originating in the CU could spread to escape-route materials and impede tenant evacuation. The combustibility creates the potential danger that the non-combustible-enclosure requirement was specifically introduced to prevent. A C2 makes the overall EICR unsatisfactory.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'C1 — Danger present (immediate action required)',
          text: '**Plastic CU with visible heat damage, signs of arcing, scorching, or a melted enclosure.** The CU is actively failing and the inspector cannot leave it in service. A C1 is recorded regardless of HMO status and warrants immediate remedial action or making-safe before the inspector leaves site.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The HMO escape-route context matters',
          text: "A plastic CU in a top-floor flat's consumer unit cupboard, with its own self-contained electrical installation and no escape-route adjacency, is materially different from a plastic CU under the wooden staircase of a 6-bed HMO's primary escape route. The same physical object gets different classifications because the consequence of fire spread is different.",
        },
      ],
    },
    {
      id: 'hmo-definition',
      heading: 'What Counts as an HMO',
      tocLabel: 'HMO definition',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Housing Act 2004 (England and Wales) and equivalent legislation in Scotland and Northern Ireland define an HMO (House in Multiple Occupation). For the purposes of EICR classification, two definitions matter:',
        },
        {
          type: 'list',
          items: [
            '**Standard HMO** — a property occupied by 3 or more people from 2 or more separate households who share a kitchen, bathroom or toilet. Includes most shared houses, student accommodation, and bedsits.',
            '**Licensable HMO** — a larger HMO (typically 5+ people from 2+ households) subject to mandatory licensing by the local authority. Licensing typically requires periodic electrical inspection and additional fire safety measures.',
            "**Additional HMO licensing** — some local authorities operate Article 4 directions or additional licensing schemes that bring smaller HMOs into the licensing regime. Check the local authority website for the specific property's requirements.",
          ],
        },
        {
          type: 'paragraph',
          text: 'For a property classified as an HMO under any of these definitions, the landlord has additional fire-safety duties under the Regulatory Reform (Fire Safety) Order 2005 and the Management of Houses in Multiple Occupation (England) Regulations 2006. These duties combine with the BS 7671 / EICR framework to make plastic CU classification more conservative.',
        },
      ],
    },
    {
      id: 'remedial-options',
      heading: 'Remedial Options for an HMO Plastic CU',
      tocLabel: 'Remedial options',
      blocks: [
        {
          type: 'paragraph',
          text: 'When the EICR comes back with a C2 on a plastic consumer unit in an HMO, the landlord typically has three viable remedial paths:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Full consumer unit replacement to metal-enclosed all-RCBO unit** — the most thorough option. The new CU must comply with BS EN 61439-3 (Regulation 421.1.201). It also engages A4:2026 requirements: Regulation 411.3.4 luminaire RCD protection — additional protection by an RCD not exceeding 30 mA shall be provided for AC final circuits supplying luminaires in domestic premises — achieved by fitting each lighting circuit on its own 30 mA RCBO. Because the property is an HMO, Regulation 421.1.7 also makes AFDDs mandatory on the single-phase socket-outlet final circuits (≤ 32 A) — best delivered as combined AFDD/RCBO devices at the board. Add an SPD where the risk assessment indicates. Indicative UK trade figures are given below.',
            '**Replacement to metal-enclosed unit retaining existing MCB protection** — cheaper than full RCBO replacement but loses the A4 luminaire-RCD benefit. Some inspectors flag this as inadequate where the EICR also has C2/C3 observations on missing luminaire RCD protection (Regulation 411.3.4 — additional protection by an RCD not exceeding 30 mA for AC luminaire circuits in domestic premises). The replacement unit must still comply with BS EN 61439-3.',
            "**Metal-enclosing retrofit (rare)** — some manufacturers offer steel retrofit cabinets that go around an existing plastic CU. Under Regulation 421.1.201, the cabinet or enclosure must comply with Regulation 132.12 (adequate working space and accessibility) in addition to satisfying the non-combustibility requirement. Verify against the manufacturer's installation instructions and the BS EN 61439-3 declaration for the original unit. Less common than full replacement.",
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Indicative cost — not a quote',
          text: 'As a rough market guide only, full replacement to a metal-enclosed all-RCBO unit in a typical 4–6 bed HMO sits around £900–£1,800 at trade prices, with the EIC usually included. Adding combined AFDD/RCBO devices on the socket circuits (now mandatory in HMOs) increases the per-way device cost over plain RCBOs. Larger HMOs or boards needing associated remedial work — main bonding, supplementary bonding, recabling — can run to £2,500+. Always price the specific installation.',
        },
      ],
    },
    {
      id: 'afdd-hmo',
      heading: 'AFDDs Are Now Mandatory in HMOs (A4:2026)',
      tocLabel: 'AFDDs in HMOs',
      blocks: [
        {
          type: 'paragraph',
          text: 'This is the change most often missed on HMO consumer unit replacements. Under Regulation 421.1.7 of BS 7671:2018+A4:2026, arc fault detection devices are no longer merely "recommended" in HMOs — they are required. When you replace the plastic CU, the new arrangement has to satisfy this.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Regulation 421.1.7 — the HMO requirement',
          text: 'Arc fault detection devices (AFDDs) conforming to BS EN 62606 SHALL be provided for single-phase AC final circuits supplying socket-outlets with a rated current not exceeding 32 A in houses in multiple occupation (HMOs). The same mandatory requirement applies to high rise residential buildings, purpose-built student accommodation and care homes. For all other premises the use of AFDDs is recommended, not required.',
        },
        {
          type: 'list',
          items: [
            '**Scope is the socket-outlet final circuits** — the mandatory requirement targets single-phase AC final circuits supplying socket-outlets rated not more than 32 A. It is the socket circuits, not every circuit in the board, that trigger the obligation.',
            '**Placement** — where AFDDs are used they shall be placed at the origin of the circuit to be protected. In a consumer unit replacement that means an AFDD (or combined AFDD/RCBO device) at the board for each affected socket circuit.',
            '**High rise definition** — for the HRRB category, BS 7671 treats a high rise residential building as one over 18 m in height or in excess of six storeys, whichever is met first. HMOs qualify on the building-type basis regardless of height.',
            '**It does not replace other measures** — fitting an AFDD does not remove the need for the other protective measures in BS 7671, including RCD additional protection. An AFDD/RCBO device covers both where specified.',
          ],
        },
        {
          type: 'paragraph',
          text: 'In practice this means a plastic-CU replacement in an HMO should be specified as a metal-enclosed unit with AFDD protection on the socket-outlet final circuits and 30 mA RCD additional protection across the board. See the [A4:2026 luminaire RCD requirement](/guides/bs-7671-a4-2026-luminaire-rcd-protection) for the parallel obligation on lighting circuits.',
        },
      ],
    },
    {
      id: 'landlord-timeline',
      heading: 'The Landlord Timeline (PRS Regs 2020 England)',
      tocLabel: 'Landlord timeline',
      blocks: [
        {
          type: 'paragraph',
          text: 'For private rented HMOs in England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 set a strict timeline once an EICR with a C2 is issued:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Day 0 — EICR issued with C2 ("plastic consumer unit in HMO escape route") observation.',
            'Within 28 days — remedial work completed by a competent electrician.',
            'Within 28 days of completion — written confirmation (typically EIC for a consumer unit replacement) provided to each tenant.',
            'On request — copy of the EICR + remedial certificate provided to the local authority.',
            'Failure to comply — financial penalty of up to £30,000 per breach.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mandatory HMO licensing implications',
          text: 'For a licensable HMO, an unsatisfactory EICR with unremedied C2 observations can also trigger licensing-condition breaches. Local authorities increasingly require EICR copies as part of HMO licence applications and renewals — an outstanding C2 can delay licensing or trigger enforcement action.',
        },
      ],
    },
    {
      id: 'evidence-and-documentation',
      heading: 'Evidence and Documentation',
      tocLabel: 'Evidence',
      blocks: [
        {
          type: 'paragraph',
          text: 'For both the inspecting electrician and the landlord, the documentation around a plastic-CU C2 matters as much as the classification itself:',
        },
        {
          type: 'list',
          items: [
            '**Photograph of the plastic CU in its actual location** — shows the surrounding combustibles, the escape-route context, any heat damage or arcing signs.',
            '**Floor plan annotation** — marks the CU location relative to fire-resisting compartment walls and escape routes (HMO landlords typically already have these for fire-risk assessment).',
            '**Regulation cite in Section K observation** — "Plastic consumer unit in HMO escape route. Non-compliant with BS 7671:2018+A4:2026 Regulation 421.1.201 for non-combustible enclosure. C2 classification: potentially dangerous in escape-route context."',
            '**Remedial quote** — itemised: replacement CU, RCBOs, labour, certification. Most landlords appreciate the breakdown so they can compare against any second quote.',
            '**EIC after remedial completion** — confirms the new metal-enclosed unit, the new RCBO selection, and BS 7671:2018+A4:2026 compliance including the new luminaire-RCD requirement on every circuit.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question:
        "My HMO consumer unit is plastic but it's in a locked meter cupboard outside the escape route. Is that still a C2?",
      answer:
        'It depends on the inspector\'s judgement of fire-spread risk. A plastic CU in a locked external meter cupboard with no combustible surroundings, no escape-route adjacency and no fire-resisting compartment wall implications is materially different from one under the staircase of the main escape route. Many inspectors classify the external-cupboard scenario as C3 ("Improvement recommended"). Document the rationale clearly either way — the photograph and floor-plan context become the evidence base.',
    },
    {
      question: 'What does Regulation 421.1.201 actually say?',
      answer:
        'Regulation 421.1.201 of BS 7671:2018+A4:2026 requires consumer units and similar switchgear assemblies in domestic (household) premises to: (a) comply with BS EN 61439-3; and (b) either be enclosed in a non-combustible enclosure, or have measures to ensure that any fire originating within the assembly cannot spread to combustible surrounding materials. In practice this means a steel-enclosed consumer unit that carries a BS EN 61439-3 declaration from the manufacturer — both requirements apply regardless of which enclosure route is chosen. The regulation was introduced in BS 7671:2008+A3 (effective January 2016) and is retained in A4:2026.',
    },
    {
      question: 'Do I have to fit AFDDs when I replace a consumer unit in an HMO?',
      answer:
        'Yes, for the socket circuits. Under Regulation 421.1.7 of BS 7671:2018+A4:2026, arc fault detection devices conforming to BS EN 62606 shall be provided for single-phase AC final circuits supplying socket-outlets not exceeding 32 A in houses in multiple occupation — the requirement is mandatory for HMOs (as well as high rise residential buildings, purpose-built student accommodation and care homes). Where AFDDs are used they must sit at the origin of the circuit, so they are fitted at the board, commonly as combined AFDD/RCBO devices. For all other premises types AFDDs are recommended rather than required.',
    },
    {
      question: "Is my plastic CU automatically dangerous if it's in any HMO?",
      answer:
        "No — automatic classification rules aren't how BS 7671 / GN3 works. The inspector evaluates each plastic CU in context: location relative to escape routes, fire-resisting compartmentation, combustibility of surroundings, condition of the unit, and the property's HMO classification. A plastic CU in a 3-bed shared house with the CU in a non-escape-route utility room may be C3. The same unit in a 6-bed licensable HMO under the wooden staircase of the only escape route is C2.",
    },
    {
      question: 'How much does a consumer unit replacement cost in a typical HMO?',
      answer:
        'For a UK HMO of 4-6 bed size, full replacement to a metal-enclosed all-RCBO consumer unit typically costs £900-£1,800 at trade prices, depending on existing circuit count, board complexity, any associated remedial work (missing main bonding, supplementary bonding in bathrooms), and the local labour rate. The EIC for the replacement is included in that price for most electricians. For larger HMOs or where the existing wiring needs significant remediation alongside the CU change, costs can rise to £2,500+.',
    },
    {
      question: 'Do I need to upgrade ALL the circuits to A4:2026 standard when replacing the CU?',
      answer:
        "Strictly, the existing downstream circuits are not retrospectively upgraded — but the new CU and the work done IN it must comply with current A4 standards, and in an HMO that now includes AFDDs. The new board must address Regulation 411.3.3 socket-outlet RCD protection, Regulation 411.3.4 luminaire RCD protection (additional protection by an RCD not exceeding 30 mA for AC final circuits supplying luminaires in domestic premises), and Regulation 421.1.7 AFDD protection — mandatory on the single-phase socket-outlet final circuits not exceeding 32 A in an HMO. In practice electricians fit combined AFDD/RCBO devices on the socket ways and RCBOs elsewhere. Every existing circuit is tested and an EIC issued for the alteration; where circuits fail current testing (e.g. high Zs, low insulation resistance) separate remedial work is needed.",
    },
    {
      question: "What if the tenant won't agree to consumer unit replacement access?",
      answer:
        'For a private rented property in England, the landlord has a legal obligation under PRS Regs 2020 to complete remedial work within 28 days of an EICR with C1/C2/FI observations. Reasonable notice for access is part of that obligation. If a tenant refuses access, the landlord should: document the refusal in writing, send a notice requesting access, and (if refusal persists) seek legal advice on lawful entry. The local authority should be informed if compliance is being prevented — failure to act is on the tenant, but the landlord still has a duty to take reasonable steps.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description:
        'How C2 observations affect the overall EICR assessment and PRS Regs 2020 timeline.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c3-improvement-recommended',
      title: 'EICR Code C3 — Improvement Recommended',
      description: 'When a plastic CU is C3 rather than C2 — the decision boundary explained.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-no-main-protective-bonding',
      title: 'EICR: No Main Protective Bonding',
      description:
        'The other classic UK domestic C2 — often found alongside plastic CU on HMO inspections.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
      title: 'A4:2026 Luminaire RCD Protection',
      description:
        'Why a CU replacement is the right time to add 30 mA RCD on every luminaire circuit (Regulation 411.3.4).',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description:
        'Digital A4:2026 EICR with HMO-aware C2/C3 observation library for plastic consumer units.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/eic-certificate',
      title: 'EIC Certificate Tool',
      description:
        'Issue the EIC for the consumer unit replacement — three-signatory model form, A4:2026 compliant.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Convert plastic CU C2 observations into priced quotes',
  ctaSubheading:
    "Elec-Mate's EICR tool flags plastic consumer units in HMO context, suggests the C2 wording, and converts directly to a priced consumer unit replacement quote with current UK trade prices. 7-day free trial.",
};
