import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// CDM 2015 statutory framework and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-17';

export const electricalMethodStatementTemplateConfig: GeneratedGuideConfig = {
  pagePath: '/guides/electrical-method-statement-template',
  title:
    'Electrical Method Statement Template (UK) — Free Guide + Generator | Elec-Mate',
  description:
    'The complete UK electrical method statement template — section-by-section structure, hazards table, safe isolation procedure, PPE list, sign-off lines, plus job-specific variants for EICR, consumer unit changes, EV chargers, full rewires, alterations and solar PV. BS 7671:2018+A4:2026, EAWR 1989 and CDM 2015 aligned.',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Method Statement Template',
  badgeIcon: 'FileText',
  breadcrumbLabel: 'Method Statement Template',
  heroPrefix: 'Electrical',
  heroHighlight: 'Method Statement Template',
  heroSuffix: '(UK)',
  heroSubtitle:
    'A reusable UK electrical method statement structure that satisfies CDM 2015, the Electricity at Work Regulations 1989 and BS 7671:2018+A4:2026 — with the exact sections principal contractors, clients and HSE inspectors expect to see. Includes job-specific variants for EICR, consumer unit replacements, EV charger installs, full rewires, single-circuit alterations and solar PV.',
  keyTakeaways: [
    'An electrical method statement is a written, site-specific document explaining how a defined piece of electrical work will be carried out safely — it sits alongside the risk assessment as the second half of a RAMS pack.',
    'Method statements are not optional for any non-trivial electrical work under CDM 2015. The principal contractor will request one before you set foot on site, and the HSE will ask for it if anything goes wrong.',
    'A compliant UK template covers: identifying information, scope, applicable regulations, team and responsibilities, sequence of work, hazards and controls, isolation procedure, PPE, emergency procedures and sign-off.',
    'The "sequence of work" and "safe isolation procedure" sections are where most generic Word-document templates fall down — they need to reflect the specific circuits, voltages, isolation points and lock-off devices on this job, not a generic blurb.',
    'Different electrical jobs warrant different method statement variants: an EICR method statement is mostly about test isolation and energisation, an EV charger method statement is about cable routing and Type B RCD provision, a full rewire is about live working avoidance during phased re-energisation.',
    'A generator-produced, regulation-aligned method statement signed digitally with an audit trail is materially stronger evidence of competent planning than a generic Word document filled in on the day.',
  ],
  sections: [
    {
      id: 'what-is-method-statement',
      heading: 'What an Electrical Method Statement Is (and Is Not)',
      tocLabel: 'What it is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An electrical method statement is a written, site-specific description of how a defined piece of electrical work will be carried out — step by step — with the control measures that keep workers, occupants and the installation safe. It is the second half of a RAMS pack: the risk assessment identifies the hazards and rates them; the method statement says what you will actually do, in what order, to keep those risks controlled.',
        },
        {
          type: 'paragraph',
          text:
            'Method statements are not a marketing document, not a generic safety policy, and not a copy-paste from the last job. The HSE publication INDG163 ("Risk assessment: A brief guide to controlling risks in the workplace") and the CDM 2015 Approved Code of Practice both make the same point: documentation must be specific to the work, the site and the people doing it.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The CDM 2015 link',
          text:
            'Under the Construction (Design and Management) Regulations 2015, contractors must plan, manage and monitor construction work so it can be carried out without risks to health and safety, so far as is reasonably practicable (Regulation 15). The method statement is the primary written evidence that you have done this planning. No method statement, no demonstrable compliance.',
        },
        {
          type: 'paragraph',
          text:
            'In practical terms, the UK electrical industry expects to see a method statement for: any work on a construction site, any work for a commercial client, any work involving live testing or temporary energisation, any work where more than one trade is on site simultaneously, and any work involving the supply intake, distribution boards or large equipment. Domestic single-circuit alterations sometimes get away without one — but most domestic landlords and managing agents now ask anyway, and the generator approach makes that trivial.',
        },
      ],
    },
    {
      id: 'template-structure',
      heading: 'The Template Structure — Section by Section',
      tocLabel: 'Template structure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A UK electrical method statement that will satisfy a principal contractor, a CDM client and (if it ever comes to it) an HSE inspector contains the following sections in this order. Each section is non-negotiable — leaving any out is the most common reason method statements get rejected and bounced back during pre-start checks.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cover / identifying information — document title, project name, site address, client name, principal contractor name, contractor (your) company name, document reference, version number, date of issue, document author, document approver, and the revision history table.',
            'Scope statement — exactly what electrical work this method statement covers (and, by exclusion, what it does not). For example: "Installation of one 7.4 kW EV charger on dedicated 32 A radial from existing consumer unit, Type B RCD protection, external mounting on rear elevation. Does not cover: consumer unit upgrade, supply uprate, or DNO liaison."',
            'Applicable regulations and standards — the specific clauses and documents that govern this work. As a minimum: BS 7671:2018+A4:2026, the Electricity at Work Regulations 1989, the Health and Safety at Work etc. Act 1974, CDM 2015, and any product or sector-specific standards (e.g. BS EN 61851 for EV charging, BS EN 62446 for solar PV, BS 5839 for fire alarm work).',
            'Team and responsibilities — names, roles, qualifications, registration numbers, and what each person is responsible for. Typically: site supervisor, qualified supervisor / lead electrician, approving electrician (for test results), apprentice (with explicit "shall not work unsupervised" line), and any sub-contractors.',
            'Sequence of work — the numbered, ordered steps. This is the longest and most job-specific section. Each step says what is done, by whom, with what tools, in what order, and what the safety controls are at that step.',
            'Hazards and control measures — a table mapping each significant hazard to the controls in place. Standard rows include: electric shock, arc flash and burns, working at height, manual handling, dust and debris, hot works (if applicable), trips and falls from trailing cables, working alongside other trades, working in occupied premises.',
            'Safe isolation procedure — the specific isolation point(s), the lock-off device used, the GS38-compliant voltage indicator and proving unit used, who carries out isolation, who retains the key, and how re-energisation will be controlled.',
            'PPE list — the personal protective equipment required for each stage of the work, with the relevant standards (e.g. arc-rated gloves to BS EN 60903, safety footwear to BS EN ISO 20345).',
            'Emergency procedures — what happens if someone is shocked or burned, the location of the on-site first aider, the route to the nearest A&E, the local hospital phone number, the contact name and number for the principal contractor out of hours, and the procedure for reporting under RIDDOR.',
            'Sign-off lines — the document is read, understood and signed by every person carrying out or supervising the work, with name, signature, date and time. This is the "competent persons briefed" evidence that closes the loop with CDM 2015 Regulation 15.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sign-off is not a formality',
          text:
            'The sign-off section is often treated as a tickbox. It is not. Under the Electricity at Work Regulations 1989, every person carrying out work on or near electrical equipment must be competent for that work. The sign-off lines are the written confirmation that the people listed have been briefed on this specific method statement for this specific job — not a generic toolbox talk from six months ago.',
        },
      ],
    },
    {
      id: 'hazards-controls-table',
      heading: 'The Hazards & Control Measures Table',
      tocLabel: 'Hazards & controls',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The hazards section is where method statements either earn their keep or descend into copy-paste. The structure is a simple table — hazard, who is at risk, the controls in place, the residual risk rating — but the contents must be specific to this job. Below are the rows that every UK electrical method statement should contain at minimum, plus the controls you would expect to see for each. Add or remove rows depending on the work.',
        },
        {
          type: 'list',
          items: [
            'Electric shock from live conductors — controls: safe isolation procedure followed in full, GS38 voltage indicator and proving unit used, lock-off device fitted, "Caution: Men at Work" notice posted, no work commenced until "dead" condition proved at point of work.',
            'Arc flash and burns from short circuit — controls: working dead is the default, arc-rated PPE worn for any task where energisation cannot be excluded, insulated tools used, only competent persons within the arc-flash boundary.',
            'Working at height (consumer unit at high level, attic cable runs, external EV charger above 2 m) — controls: appropriate access equipment (steps, platform, podium), three-points-of-contact rule, no overreaching, ladder Class EN 131.',
            'Manual handling of consumer units, batteries (solar PV), spool drums, ladders — controls: two-person lift for items over 25 kg, mechanical aid where available, no twisting under load, briefing per HSE INDG143.',
            'Dust and debris from chasing, drilling and lifting floorboards — controls: dust extraction at source, FFP3 mask, eye protection, dust sheets to contain spread in occupied premises.',
            'Hot works (soldering, brazing, MIG on tray) where applicable — controls: hot works permit issued by principal contractor, fire watch for 60 minutes after work ends, fire extinguisher within reach, combustible materials cleared to a 5 m radius.',
            'Trips and falls from trailing cables, tools, packaging — controls: cable routing planned to avoid walkways, off-cuts and packaging removed at end of each shift, walkways kept clear, lighting maintained.',
            'Other trades working in proximity — controls: site induction completed, work areas demarcated, communication via principal contractor daily brief, no concurrent work above or below where falling objects are a risk.',
            'Asbestos disturbance in pre-2000 buildings — controls: refurbishment & demolition survey reviewed before any drilling or chasing, no work commenced in areas with positive asbestos findings until removed by licensed contractor.',
            'Lone working (small alterations, EICR) — controls: lone worker register, scheduled check-in times with office, mobile signal verified on site, emergency procedure shared with named office contact.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Reference: HSE INDG163',
          text:
            'The HSE\'s INDG163 ("Risk assessment: A brief guide to controlling risks in the workplace") is the plain-English summary of how to identify hazards, decide who could be harmed, evaluate risk and record findings. It is freely downloadable from hse.gov.uk and is the framework most UK risk assessments and method statements implicitly follow.',
        },
      ],
    },
    {
      id: 'isolation-procedure',
      heading: 'The Safe Isolation Procedure Section',
      tocLabel: 'Isolation procedure',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Safe isolation is the single most important section in any electrical method statement — and the one most often written as a vague paragraph. A compliant section names the specific isolation point on this job, the device used to lock it off, the proving unit used to confirm dead, and the person responsible for re-energisation control. Anything less is non-compliant with EAWR 1989 Regulations 13 and 14.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identify the source of supply for the circuit(s) being worked on — by reference to the schedule of test results or the consumer unit / distribution board legend, not by guesswork.',
            'Notify the duty holder / occupant / principal contractor of the planned isolation and obtain agreement.',
            'Switch off the relevant device — MCB, RCBO, switch-fuse or main switch as appropriate.',
            'Lock off the device with a proprietary lock-off kit. The unique key is retained by the person carrying out the work. No master keys, no key shared between trades.',
            'Post a "Caution: Men at Work" notice at the point of isolation.',
            'Prove the voltage indicator on a known live source — a Drummond-style proving unit is industry standard for this.',
            'Test for absence of voltage at the point of work, between all relevant combinations (line-to-line, line-to-neutral, line-to-earth, neutral-to-earth on 3-phase).',
            'Re-prove the voltage indicator on the known live source to confirm it did not fail during the test.',
            'Work proceeds only after this sequence is complete.',
            'On completion, re-energisation is controlled by the same person who isolated — no one else re-energises a circuit they did not isolate.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'GS38 voltage indicator — not a multimeter',
          text:
            'The voltage indicator used to prove dead must comply with HSE Guidance Note GS38. A multimeter on AC volts is not a compliant proving instrument. The two are not interchangeable. Generic Word-document method statements that say "test with a multimeter to confirm dead" are wrong and will be flagged by any competent reviewer.',
        },
        {
          type: 'paragraph',
          text:
            'For a deeper breakdown of safe isolation including diagrams of two-pole proving and 3-phase isolation, see the [Method Statement: Safe Isolation](/guides/method-statement-safe-isolation) reference guide.',
        },
      ],
    },
    {
      id: 'job-specific-variants',
      heading: 'Job-Specific Method Statement Variants',
      tocLabel: 'Job variants',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The template structure is the same for every electrical job, but the contents of the scope, sequence and hazards sections differ materially. Below are the variants that cover the bulk of UK electrical work. Each links to a more detailed RAMS-specific guide.',
        },
        {
          type: 'list',
          items: [
            '[EICR (Electrical Installation Condition Report) method statement](/guides/rams-for-eicr-inspection) — focus on test isolation, live testing (insulation resistance, R1+R2, Zs), notifying occupants of brief power loss, controlling the boundary between live and dead conductors during the test sequence, and ensuring the inspector does not leave any C1 condition unisolated.',
            '[Consumer unit replacement method statement](/guides/rams-for-consumer-unit-replacement) — focus on whole-property isolation at the meter tails / cut-out, DNO seal awareness, supplier notification if the seal is to be broken, temporary supply provision for vulnerable occupants, sequence for re-terminating circuits one-by-one to limit time without power, and final IR / R1+R2 / RCD test sweep before re-energisation.',
            '[EV charger installation method statement](/guides/rams-for-ev-charger-installation) — focus on Type B RCD provision (or integrated Type A + 6 mA DC detection per BS 7671 722), load assessment per BS 7671 Section 311, cable route external to the dwelling, IP rating verification, separation from gas piping and metallic services, OZEV-compliant consumer unit space, smart functionality and load-management commissioning.',
            'Full rewire method statement — focus on phased isolation room-by-room, temporary lighting and power for occupants if any remain, removal vs disconnection of old wiring (no abandoned-in-place live conductors), labelling of new circuits as installed, initial verification on each circuit before energisation, and the schedule of test results to be issued with the new EIC.',
            'Single-circuit alteration method statement — for a kitchen rewire, an upstairs ring final addition, a garden socket, a shower replacement: focus on isolation at the specific MCB/RCBO, work confined to that circuit, Minor Works Certificate or EIC depending on whether a new circuit is added, and verification of the existing protective device suitability for any increased load.',
            'Solar PV installation method statement — focus on DC isolation as well as AC, MCS-aligned commissioning, BS EN 62446 documentation, working at height on pitched roofs (harness, anchor, roof ladder), DNO G98/G99 notification, battery storage if applicable (BS 7671 Section 712 / IET Code of Practice for Electrical Energy Storage Systems), and labelling of all isolation points.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For the underlying CDM 2015 framework that drives most of these variants, see [CDM 2015 for Electricians](/guides/cdm-2015-for-electricians).',
        },
      ],
    },
    {
      id: 'why-generator-over-word',
      heading: 'Why a Generator Beats a Generic Word Template',
      tocLabel: 'Generator vs Word doc',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every UK electrical firm has the same folder somewhere on a shared drive: a "RAMS template" Word document, last meaningfully updated five years ago, with the previous job\'s site address still in the header. It gets opened, find-and-replaced, and emailed off. It satisfies no one — not the contractor reading it, not the client receiving it, and definitely not the HSE if it ever has to be produced after an incident.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Site-specific by default — a generator asks for the actual site address, the actual scope, the actual circuits, the actual team. No leftover details from the previous job.',
            'Regulation-aligned automatically — references to BS 7671:2018+A4:2026 clauses, EAWR 1989 regulations and CDM 2015 Regulation 15 are written by the system, not by an engineer with a different priority that week.',
            'Hazards table populated for the work type — if you say "EV charger install", the generator pre-fills the working-at-height and Type B RCD hazards. If you say "EICR", it pre-fills live testing and brief power-loss notification. No more generic catch-all that misses what actually matters.',
            'Digitally signed with an audit trail — every signature is timestamped, attributable, and tamper-evident. The "I read it, I signed it" question is answered by the document itself, not by a paper signature page that may or may not still exist.',
            'Version-controlled — when the scope changes mid-job (it always does), the method statement is updated, re-signed and the previous version retained. No "which version did we work to?" arguments after the fact.',
            'Linked to the related certificate — the EIC, Minor Works Certificate or EICR that the work produces references back to the method statement that planned it, closing the loop between planning and delivery.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Time saved per job',
          text:
            'A site electrician producing a generic Word-document method statement for an EV charger install spends 45-90 minutes on it — and produces something a competent reviewer would mark as non-compliant. The Elec-Mate generator produces a site-specific, regulation-aligned, digitally-signed equivalent in 5-10 minutes. Across 50 jobs a year that is roughly 50 working hours recovered, and the documentation is materially stronger.',
        },
      ],
    },
    {
      id: 'legal-context',
      heading: 'The Legal Context — Why You Need This',
      tocLabel: 'Legal context',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A UK electrical method statement is not a marketing nice-to-have. It sits inside three statutory frameworks that determine your liability if anything goes wrong.',
        },
        {
          type: 'list',
          items: [
            'CDM 2015 Regulation 15 — contractors must plan, manage and monitor construction work so it is carried out without risks to health and safety, so far as is reasonably practicable. The method statement is the primary written evidence of "planned".',
            'Electricity at Work Regulations 1989 — Regulations 4 ("systems shall be of such construction and maintained as to prevent danger"), 13 ("precautions for work on equipment made dead") and 14 ("work on or near live conductors"). The method statement is how you demonstrate compliance with these regulations in advance of the work, not retrospectively.',
            'Health and Safety at Work etc. Act 1974 — the over-arching duty to ensure, so far as is reasonably practicable, the health, safety and welfare of employees at work, and of persons not in your employment but affected by your work. A written method statement is the standard mechanism for discharging this duty for electrical work.',
            'BS 7671:2018+A4:2026 — Part 1 (scope, object and fundamental principles) and Chapter 13 (fundamental principles) require that persons carrying out installation work shall be skilled or instructed for that work, and shall not engage in any activity for which they are not skilled or instructed. The briefing-and-sign-off section of the method statement is the written record of "instructed".',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'After an incident, the method statement is the first document requested',
          text:
            'If there is an injury, near-miss or RIDDOR-reportable incident on an electrical job, the HSE inspector\'s first question is "show me the method statement and risk assessment for that work". Absence of a site-specific method statement is itself evidence of failure to plan under CDM 2015 Regulation 15 — before the inspector has even considered what went physically wrong.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a method statement legally required for all UK electrical work?',
      answer:
        'For construction work under CDM 2015, yes — Regulation 15 requires contractors to plan, manage and monitor work, and the method statement is the standard written evidence of that planning. For domestic single-circuit alterations not on a construction site there is no specific statutory requirement to produce a written method statement, but the Health and Safety at Work etc. Act 1974 and the Electricity at Work Regulations 1989 still apply, and many landlords, managing agents and insurers now require RAMS as a matter of contract. In practice, every non-trivial electrical job should have one.',
    },
    {
      question: 'What is the difference between a risk assessment and a method statement?',
      answer:
        'The risk assessment identifies hazards, decides who could be harmed and how, evaluates the risk, and records the findings (per HSE INDG163). The method statement describes how the work will actually be done, step by step, with the control measures from the risk assessment built in. Together they form RAMS (Risk Assessment and Method Statement). One without the other is incomplete — the risk assessment without a method statement does not describe what you will do; the method statement without a risk assessment does not justify why you do it that way.',
    },
    {
      question: 'How long should an electrical method statement be?',
      answer:
        'Long enough to cover the work, short enough that the people carrying out the work will actually read it. A single-circuit alteration method statement typically runs 2-4 pages. An EV charger install runs 4-6 pages. A full rewire or consumer unit change runs 6-10 pages. A multi-week commercial fit-out runs 15-25 pages with appendices. The sign-off section is required regardless of length — the most important page is the one where the people doing the work confirm they have read and understood it.',
    },
    {
      question: 'Do apprentices need to sign the method statement?',
      answer:
        'Yes. Every person carrying out work covered by the method statement signs it, including apprentices. The apprentice signature confirms they have been briefed on the work, understand the hazards and controls, and know they are working under direct supervision. The method statement should explicitly name the supervising electrician and state that the apprentice will not work unsupervised on live or recently-isolated circuits. This is competence evidence under EAWR 1989 and BS 7671 Chapter 13.',
    },
    {
      question: 'Can I reuse a method statement for a similar job?',
      answer:
        'You can reuse the structure and the standard hazards table — that is the point of a template. What you cannot reuse is the scope, site address, isolation points, team list, sequence of work and sign-off. Those are site-specific. A method statement that has the previous job\'s site address in the header is the single most common reason method statements get rejected at pre-start. A generator that asks for the new details each time and produces a fresh document is the cleanest way to avoid this.',
    },
    {
      question: 'Who in the company signs off / approves the method statement before issue?',
      answer:
        'Typically the qualified supervisor (QS) or technical director — the person whose name and qualification is on the company\'s NICEIC, NAPIT or SELECT registration. They are the named "competent person" for the firm, and approving the method statement is part of that role. On larger projects, the principal contractor will also review and accept the method statement before work starts; that acceptance is separate from internal sign-off but does not replace it.',
    },
    {
      question: 'What if the scope changes mid-job — does the method statement need updating?',
      answer:
        'Yes. A material scope change (additional circuits, change of isolation strategy, additional trades on site, change of personnel) is a revision to the method statement. The revised version gets a new revision number, is re-signed by everyone working to it, and the previous version is retained in the project file. Generator-produced method statements with built-in version control make this five-minute work; Word-document method statements often result in the old version being silently overwritten and the audit trail lost.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description: 'Generate site-specific UK electrical RAMS in minutes — BS 7671:2018+A4:2026, EAWR 1989 and CDM 2015 aligned.',
      icon: 'Wrench',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description: 'The combined risk assessment + method statement template — what the principal contractor expects to see.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/how-to-write-electrical-method-statement',
      title: 'How to Write an Electrical Method Statement',
      description: 'A worked walkthrough of writing each section from a blank page, with do/don\'t examples.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-eicr-inspection',
      title: 'RAMS for EICR Inspection',
      description: 'The EICR-specific method statement — test isolation, live testing, occupant notification, sequence.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-consumer-unit-replacement',
      title: 'RAMS for Consumer Unit Replacement',
      description: 'Whole-property isolation, DNO seal awareness, phased re-energisation and final test sweep.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-ev-charger-installation',
      title: 'RAMS for EV Charger Installation',
      description: 'Type B RCD provision, load assessment, cable routing and BS EN 61851 commissioning.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement: Safe Isolation',
      description: 'The full safe isolation procedure — GS38 proving, lock-off, key control, re-energisation.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description: 'The CDM duties that drive RAMS — Regulation 15, principal contractor expectations, sub-contractor evidence.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a compliant method statement in minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator produces site-specific, regulation-aligned electrical method statements in 5-10 minutes — covering EICR, consumer unit changes, EV chargers, rewires, alterations and solar PV. Digitally signed with audit trail, version-controlled, linked to the resulting certificate. 7-day free trial, cancel anytime.',
};
