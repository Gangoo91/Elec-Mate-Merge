import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

const faultCtaHeading = 'Work through fault finding without losing the paperwork';
const faultCtaSubheading =
  'Capture the fault, record the readings, raise the remedials, and send the certificate or quote from one place.';

const certificateCtaHeading = 'Complete certificates on site and send them properly';
const certificateCtaSubheading =
  'Elec-Mate keeps test results, observations, signatures, PDFs, and client handover in one clean workflow.';

const pricingCtaHeading = 'Price the job clearly before you start work';
const pricingCtaSubheading =
  'Build faster electrical quotes with labour, materials, testing, and certificate time already accounted for.';

const propertyCtaHeading = 'Turn property-specific advice into a clean signed-up job';
const propertyCtaSubheading =
  'Survey, quote, certificate, and hand over the work from one mobile-first workflow.';

export const rcdKeepsTrippingCausesAndFixesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcd-keeps-tripping-causes-and-fixes',
  title: 'RCD Keeps Tripping Causes and Fixes | Electrician Fault Guide | Elec-Mate',
  description:
    'Common reasons an RCD keeps tripping, how to narrow the fault down, and what fixes electricians normally apply before issuing paperwork.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Fault Guide',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'RCD Causes and Fixes',
  heroPrefix: 'RCD Keeps Tripping',
  heroHighlight: 'Causes and Fixes',
  heroSubtitle:
    'A practical guide to the most common reasons an RCD trips, what the trip pattern tells you, and how to move from symptom to fix without guessing.',
  keyTakeaways: [
    'The trip pattern matters. Instant trips, random trips, and trips under load usually point to different fault types.',
    'The most common causes are borrowed neutrals, cumulative leakage, moisture ingress, damaged accessories, and faulty appliances on the protected side.',
    'Do not keep resetting an RCD without separating circuits first. Repeated energisation can hide the real fault and waste time on site.',
    'Good paperwork should match the actual fault found. Record the limitation, the remedial action, and the post-repair test result clearly.',
    'Elec-Mate helps you move from fault finding to quoting, certification, and client handover without re-keying the job twice.',
  ],
  sections: [
    {
      id: 'trip-pattern',
      heading: 'Start with the trip pattern',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An RCD that trips the moment you reset it is usually telling a different story from one that trips after ten minutes, only in wet weather, or only when a specific load is used. Before opening accessories or disconnecting circuits, work out whether the trip is immediate, load-related, random, or linked to one item of equipment.',
        },
        {
          type: 'paragraph',
          text:
            'That first read on the problem helps you avoid blind testing. If the whole bank drops when one outdoor circuit is energised, the likely causes are different from a board that trips overnight with no obvious demand on it.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not rely on repeated resets',
          text:
            'If the RCD keeps tripping, separate the downstream circuits and prove which circuit or item is actually involved. Repeated resetting without a plan only burns time and can make intermittent faults harder to pin down.',
        },
      ],
    },
    {
      id: 'common-causes',
      heading: 'Most common causes of nuisance or persistent tripping',
      blocks: [
        {
          type: 'list',
          items: [
            'Moisture ingress on outdoor lighting, garage circuits, garden sockets, or accessories exposed to condensation.',
            'Borrowed neutrals or shared neutral faults, especially on altered lighting circuits and older properties.',
            'Cumulative leakage from several appliances or circuits sitting on the same RCD.',
            'Damaged insulation, crushed flexes, and accessories with carbon tracking or heat damage.',
            'A faulty appliance or immersion, shower, or boiler component leaking to earth when energised.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you need to explain the protection side of the board to the client, [RCD types explained](/guides/rcd-types-explained) is a useful companion page.',
        },
      ],
    },
    {
      id: 'best-fixes',
      heading: 'How electricians usually solve it',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The best fixes are rarely glamorous. Dry and remake the outdoor joint. Replace the damaged fitting. Split a heavily loaded bank onto individual RCBOs. Correct the borrowed neutral. Replace the faulty accessory. Tighten the diagnosis first, then make the smallest sound fix that removes the fault and gives the client a safer installation.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Isolate and split the protected circuits so you know exactly which side of the board the fault is on.',
            'Carry out the dead tests that fit the suspected fault before forcing repeated live trips.',
            'Inspect the obvious high-risk points: outdoor accessories, damaged sockets, immersion and shower circuits, and recent alterations.',
            'Retest after the repair and record the result against the job, not on loose notes.',
          ],
        },
      ],
    },
    {
      id: 'paperwork',
      heading: 'Record the fault and the fix properly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the visit leads to remedial work, the paperwork should show the fault found, the work completed, and the test result after the repair. If the client declines further work or the fault could not be fully traced in the time available, say that clearly and record the limitation.',
        },
        {
          type: 'paragraph',
          text:
            'For certificate-driven jobs, link the remedial note back to the [EICR certificate workflow](/tools/eicr-certificate) or to a follow-on [consumer unit upgrade guide](/guides/consumer-unit-upgrade) if the fix is really about poor circuit separation rather than one defective accessory.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why does my RCD only trip sometimes?',
      answer:
        'Intermittent tripping usually points to moisture, a heat-related fault, or leakage that only appears when a certain load starts. That is why the trip pattern matters before you begin disconnecting circuits.',
    },
    {
      question: 'Can one faulty appliance trip the whole RCD?',
      answer:
        'Yes. One appliance leaking to earth can trip the whole RCD bank, which is why separating loads and identifying the exact circuit or item matters.',
    },
    {
      question: 'Is the answer always to fit RCBOs?',
      answer:
        'No. RCBOs can improve discrimination and reduce nuisance outages, but they are not a substitute for finding a genuine fault. Fix the fault first, then decide whether the board arrangement is still a weak point.',
    },
    {
      question: 'Should I issue a certificate after an RCD fault repair?',
      answer:
        'That depends on the work completed. Small remedials may fall under minor works, while larger board or circuit changes may need fuller certification. The key is that the paperwork should match the actual scope of work.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcd-keeps-tripping',
      title: 'RCD Keeps Tripping',
      description: 'The core RCD fault page for the same problem family.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping-test-sequence',
      title: 'RCD Test Sequence',
      description: 'A step-by-step test order for repeatable fault finding.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/guides/rcbo-keeps-tripping-guide',
      title: 'RCBO Keeps Tripping',
      description: 'When the fault sits on one circuit rather than the full RCD bank.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Record the fault, the result, and the handover in one flow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: faultCtaHeading,
  ctaSubheading: faultCtaSubheading,
};

export const rcdKeepsTrippingTestSequenceConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcd-keeps-tripping-test-sequence',
  title: 'RCD Keeps Tripping Test Sequence | Electrician Fault Guide | Elec-Mate',
  description:
    'A practical test sequence for RCD trips so electricians can narrow faults down quickly without jumping between random checks.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Fault Guide',
  badgeIcon: 'Gauge',
  breadcrumbLabel: 'RCD Test Sequence',
  heroPrefix: 'RCD Keeps Tripping',
  heroHighlight: 'Test Sequence',
  heroSubtitle:
    'A repeatable order for isolating circuits, proving the fault path, and retesting the installation after the repair.',
  keyTakeaways: [
    'Start by understanding the trip behaviour before lifting circuits off the board.',
    'Separate the downstream circuits early so you know whether the fault is on one way, one appliance, or the whole protected side.',
    'Dead testing and visual inspection should narrow the fault before you start relying on live resets.',
    'Retest after the repair and record the post-fix result against the same job.',
    'A clean sequence saves time, avoids missed steps, and makes your paperwork easier to defend later.',
  ],
  sections: [
    {
      id: 'before-you-test',
      heading: 'Before you start testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Ask what was running when the trip happened, whether it happens immediately on reset, and whether weather, heating, or one item of equipment seems to trigger it. Those simple questions often cut the fault tree in half before you touch the board.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Set the job up properly',
          text:
            'Label the circuits, note any existing limitations, and make sure you know whether you are dealing with one split-load bank, a full RCD main switch arrangement, or mixed RCBO and RCD protection.',
        },
      ],
    },
    {
      id: 'sequence',
      heading: 'A practical sequence that works on site',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Confirm the symptom and note when the trip occurs.',
            'Switch off or disconnect downstream circuits so you can reintroduce them in a controlled order.',
            'Reset the RCD with the downstream side cleared to see whether the problem is board-side or circuit-side.',
            'Re-energise circuits one at a time and watch for the trip to return.',
            'Once the faulted circuit is identified, inspect accessories, loads, and recent alterations before deeper testing.',
            'Carry out the dead tests that fit the suspected fault, then live test only where it is justified and safe.',
            'Retest after the repair and record the final outcome clearly.',
          ],
        },
      ],
    },
    {
      id: 'where-to-focus',
      heading: 'Where to focus once the bad circuit is found',
      blocks: [
        {
          type: 'list',
          items: [
            'Outdoor accessories, garage circuits, and damp fittings.',
            'Immersions, showers, and fixed appliances that leak to earth under load.',
            'Lighting alterations and two-way switching where borrowed neutrals can creep in.',
            'Accessories with signs of heat damage, loose terminations, or contamination.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If the issue turns out to be cumulative leakage rather than one clear defect, the next step may be better circuit separation or a move toward individual protection rather than repeated call-backs for the same bank.',
        },
      ],
    },
    {
      id: 'close-out',
      heading: 'Close the job out properly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The final step is not just restoring power. Record the cause, the repair, the final test result, and any remaining recommendation. If the client needs a wider solution such as a board upgrade, say so clearly instead of pretending the immediate repair solved the whole installation.',
        },
        {
          type: 'paragraph',
          text:
            'Use this alongside the wider [RCD causes and fixes page](/guides/rcd-keeps-tripping-causes-and-fixes) and the [digital certificate flow](/tools/eicr-certificate) when the fault ties into formal reporting.',
        },
      ],
    },
  ],
  howToSteps: [
    {
      name: 'Confirm the trip pattern',
      text: 'Establish whether the RCD trips instantly, under load, or intermittently before changing anything at the board.',
    },
    {
      name: 'Split the downstream circuits',
      text: 'Disconnect or isolate the protected ways so you can prove whether the fault sits on one circuit or across the bank.',
    },
    {
      name: 'Reintroduce circuits in order',
      text: 'Bring circuits back one at a time and watch for the exact point the RCD trips again.',
    },
    {
      name: 'Test the faulted circuit properly',
      text: 'Inspect accessories and loads, then carry out the dead and live tests that fit the suspected fault.',
    },
    {
      name: 'Retest and document',
      text: 'After the repair, confirm the installation is stable and record the result before leaving site.',
    },
  ],
  howToHeading: 'How to work through an RCD trip in order',
  howToDescription:
    'A simple sequence that keeps the diagnosis structured and the paperwork cleaner.',
  faqs: [
    {
      question: 'Should I start with insulation resistance every time?',
      answer:
        'Not automatically. The trip pattern and the circuit history should tell you whether IR testing is the right first move or whether a visual split-and-reintroduce approach will identify the fault faster.',
    },
    {
      question: 'What if the RCD holds with all circuits disconnected?',
      answer:
        'That strongly suggests the fault is on the downstream side rather than the device itself, so reintroducing the circuits one by one is usually the next clean step.',
    },
    {
      question: 'Can a neutral fault trip the RCD?',
      answer:
        'Yes. Borrowed neutrals and neutral-earth faults are common reasons for confusing RCD behaviour, particularly after alterations.',
    },
    {
      question: 'Do I need to note limitations if the client will not authorise more time?',
      answer:
        'Yes. If the diagnosis is incomplete because the client will not authorise further work, the limitation needs to be recorded clearly.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcd-keeps-tripping',
      title: 'RCD Keeps Tripping',
      description: 'The broader guide to the same fault family.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping-causes-and-fixes',
      title: 'RCD Causes and Fixes',
      description: 'The most common faults and what usually resolves them.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/earth-fault-loop-impedance-explained',
      title: 'Earth Fault Loop Impedance Explained',
      description: 'Useful background when fault paths and disconnection times matter.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Tie the fault finding and final paperwork together.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: faultCtaHeading,
  ctaSubheading: faultCtaSubheading,
};

export const rcboKeepsTrippingGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcbo-keeps-tripping-guide',
  title: 'RCBO Keeps Tripping Guide | Electrician Fault Guide | Elec-Mate',
  description:
    'Why an RCBO keeps tripping, how that differs from an RCD fault, and how electricians narrow the issue down to one circuit quickly.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Fault Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'RCBO Keeps Tripping',
  heroPrefix: 'RCBO Keeps Tripping',
  heroHighlight: 'Guide',
  heroSubtitle:
    'A practical guide to single-circuit trips, what the device is telling you, and how to move from one bad circuit to a defensible fix.',
  keyTakeaways: [
    'An RCBO trip is usually easier to localise because the problem sits on one protected circuit.',
    'The main causes are still familiar: overload, short circuit, earth leakage, damaged accessories, and appliance faults.',
    'The trip timing tells you a lot. Instant trips, load-related trips, and delayed trips point you in different directions.',
    'Because the fault is localised, the paperwork should also be localised. Describe the actual circuit, the actual defect, and the actual repair.',
    'If one troublesome circuit keeps coming back, the right answer may be a deeper condition check rather than repeated minor remedials.',
  ],
  sections: [
    {
      id: 'why-rcbo-different',
      heading: 'Why an RCBO trip is different from an RCD trip',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An RCBO protects one circuit rather than a whole bank, so when it trips you already know the problem is tied to that one circuit. That makes the diagnosis cleaner than a split-load RCD trip, because you are not trying to decide which of several circuits caused the outage.',
        },
        {
          type: 'paragraph',
          text:
            'The fault could still be overload, short circuit, or earth leakage, but the search area is smaller. That usually means quicker isolation, quicker repair, and better continuity for the rest of the installation.',
        },
      ],
    },
    {
      id: 'main-causes',
      heading: 'What usually makes an RCBO trip',
      blocks: [
        {
          type: 'list',
          items: [
            'Earth leakage from a damaged accessory, fixed load, or appliance on that circuit.',
            'Overload from too much connected demand or a load that starts heavily.',
            'A short circuit or line-neutral fault that causes an immediate trip.',
            'Moisture ingress on outdoor or high-condensation circuits.',
            'Poor terminations, damaged cables, or recent alteration work introducing a fault.',
          ],
        },
      ],
    },
    {
      id: 'how-to-read',
      heading: 'How to read the trip behaviour',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the RCBO trips immediately on reset, think hard fault or solid leakage. If it trips only when a shower, immersion, or outside circuit is used, that points to demand or load-linked leakage. If it trips after rain or at certain times of day, moisture and environment move up the list quickly.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Use the circuit history',
          text:
            'Recent kitchen work, a new outside light, a replaced socket, or a recently fitted appliance often matters more than broad theory. The last thing changed is worth checking early.',
        },
      ],
    },
    {
      id: 'documenting',
      heading: 'How to document an RCBO fault professionally',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Because the issue sits on one circuit, the close-out should be very clear: circuit description, defect found, remedial action, and test result after repair. If the client declines deeper investigation, note that limitation directly instead of leaving the job vague.',
        },
        {
          type: 'paragraph',
          text:
            'If the call-out develops into broader inspection work, move it into the [EICR certificate workflow](/tools/eicr-certificate) so the observation, recommendation, and sign-off stay together.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can an RCBO trip because of overload and not earth leakage?',
      answer:
        'Yes. An RCBO combines overcurrent and residual protection, so overload and short-circuit faults can trip it just as leakage faults can.',
    },
    {
      question: 'Is an RCBO trip always easier to find than an RCD trip?',
      answer:
        'Usually, yes, because the faulted circuit is already identified. The remaining job is working out whether the issue is with the wiring, an accessory, or connected equipment on that circuit.',
    },
    {
      question: 'Should I just replace the RCBO first?',
      answer:
        'Not unless the evidence points to the device itself. Most trips are caused by the circuit or connected load, not by the RCBO failing.',
    },
    {
      question: 'Can I still need an EICR after repeated RCBO trips?',
      answer:
        'Yes. If one circuit keeps failing or there are wider signs of age, damage, or poor alterations, a fuller condition report can be the better next step.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcbo-keeps-tripping-causes-and-fixes',
      title: 'RCBO Causes and Fixes',
      description: 'The most common single-circuit faults and how they are resolved.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping',
      title: 'RCD Keeps Tripping',
      description: 'Useful comparison when the outage affects a whole bank rather than one circuit.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'When the circuit arrangement itself needs improving.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Document faults and recommendations cleanly on site.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: faultCtaHeading,
  ctaSubheading: faultCtaSubheading,
};

export const rcboKeepsTrippingCausesAndFixesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcbo-keeps-tripping-causes-and-fixes',
  title: 'RCBO Keeps Tripping Causes and Fixes | Electrician Fault Guide | Elec-Mate',
  description:
    'Common reasons an RCBO trips and the fixes electricians normally apply once the fault has been narrowed down to one circuit.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Fault Guide',
  badgeIcon: 'Wrench',
  breadcrumbLabel: 'RCBO Causes and Fixes',
  heroPrefix: 'RCBO Keeps Tripping',
  heroHighlight: 'Causes and Fixes',
  heroSubtitle:
    'A focused guide to the common faults that trip an RCBO and the repairs electricians most often carry out once the bad circuit is identified.',
  keyTakeaways: [
    'Most RCBO faults come down to one circuit, one load, or one damaged point on the installation.',
    'Overload, short-circuit, and leakage faults can all trip an RCBO, so the trip pattern still matters.',
    'The best fixes are specific and traceable: remake the joint, replace the damaged accessory, repair the cable, or replace the faulty connected load.',
    'Do not hide repeated faults under repeated resets. If it keeps coming back, the recommendation should say so.',
    'Good records turn a one-off repair into a professional job the client can understand later.',
  ],
  sections: [
    {
      id: 'most-common',
      heading: 'The faults electricians see most often',
      blocks: [
        {
          type: 'list',
          items: [
            'Damaged socket outlets, switches, isolators, and fused spurs on the affected circuit.',
            'Fixed loads such as showers, immersions, heating controls, or extractor fans developing leakage to earth.',
            'Outdoor circuits with water ingress into accessories, glands, or junctions.',
            'Cables damaged by screws, nails, clipping, or later building work.',
            'Too much connected demand or the wrong assumptions about what the circuit was designed to carry.',
          ],
        },
      ],
    },
    {
      id: 'best-fixes',
      heading: 'What usually fixes the trip',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the fault is narrowed down properly, the fix is usually straightforward. Replace the failed outside socket. Dry and remake the light fitting. Repair the damaged flex. Replace the faulty appliance. Re-terminate the loose conductors. If the issue is overload, rework the circuit use or review the design rather than pretending the symptom is random.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Inspect the obvious failure points before dismantling half the property.',
            'Retest the circuit after the repair, not just the device operation.',
            'If the repair is temporary or partial, make that clear in writing.',
          ],
        },
      ],
    },
    {
      id: 'when-it-is-bigger',
      heading: 'When the trip is really a sign of a bigger issue',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Some RCBO faults are not really small-fix jobs. Repeated moisture problems, signs of age across the installation, or multiple questionable alterations may mean the client needs a broader inspection or a more substantial remedial plan.',
        },
        {
          type: 'paragraph',
          text:
            'That is when it is worth stepping back and moving from a quick reactive visit into a clearer recommendation, whether that is an [EICR](/tools/eicr-certificate) or a bigger [consumer unit upgrade](/guides/consumer-unit-upgrade).',
        },
      ],
    },
    {
      id: 'close-job',
      heading: 'Close the job with clear client language',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Explain the fix in plain English',
          text:
            'Clients do not need a lecture on device characteristics. They need to know which circuit failed, what was defective, what was repaired or replaced, and whether anything more is still recommended.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can a damp outside light trip an RCBO only at certain times?',
      answer:
        'Yes. Condensation, rain, and temperature changes can make an outside circuit trip intermittently rather than constantly.',
    },
    {
      question: 'If the RCBO resets after I unplug the appliance, is that enough proof?',
      answer:
        'It is a strong clue, but it is still worth checking the circuit and confirming the appliance fault properly before closing the job.',
    },
    {
      question: 'Should I recommend a board change for one RCBO trip?',
      answer:
        'Not usually. One circuit fault normally needs one circuit diagnosis. A board change is only relevant if the wider arrangement is part of the problem.',
    },
    {
      question: 'Does every RCBO repair need a certificate?',
      answer:
        'The paperwork depends on the work carried out, but the repair and the final test result should always be recorded clearly.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcbo-keeps-tripping-guide',
      title: 'RCBO Keeps Tripping Guide',
      description: 'The wider guide to diagnosing single-circuit trips.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping-causes-and-fixes',
      title: 'RCD Causes and Fixes',
      description: 'Useful when the problem affects a full bank rather than one way.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'Helpful when a client only authorises a partial investigation.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Capture the defect, the remedy, and the handover properly.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: faultCtaHeading,
  ctaSubheading: faultCtaSubheading,
};

export const eicrCommonMistakesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-common-mistakes',
  title: 'EICR Common Mistakes | Electrician Certificate Guide | Elec-Mate',
  description:
    'Common EICR mistakes that weaken the report, confuse the client, or create problems during assessment, handover, and remedial quoting.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EICR Common Mistakes',
  heroPrefix: 'EICR',
  heroHighlight: 'Common Mistakes',
  heroSubtitle:
    'The mistakes that make an Electrical Installation Condition Report look weak, how to avoid them, and how to hand over a cleaner report on site.',
  keyTakeaways: [
    'Weak circuit descriptions, vague observations, and missing limitations are some of the fastest ways to undermine an EICR.',
    'Observation codes need to match the actual risk, not the mood of the day.',
    'The schedule of inspections and test results need to support each other, not tell different stories.',
    'Clients lose confidence quickly when the report is unclear, rushed, or obviously copied forward.',
    'A digital workflow reduces missing fields, mismatched data, and last-minute PDF clean-up.',
  ],
  sections: [
    {
      id: 'weak-descriptions',
      heading: 'Weak descriptions and copied-forward data',
      blocks: [
        {
          type: 'paragraph',
          text:
            'One of the most common EICR problems is lazy circuit identification. If several circuits are just labelled "sockets" or "lights", the report becomes harder to trust and harder to use later when remedials are quoted.',
        },
        {
          type: 'paragraph',
          text:
            'The same applies to copied-forward readings. If the circuit details, observations, and measured values look like they came from an old report rather than today’s installation, the whole document loses weight quickly.',
        },
      ],
    },
    {
      id: 'bad-coding',
      heading: 'Poor observation coding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Observation codes need to reflect the actual risk and the actual limitation of the report. Over-coding weak defects and under-coding genuinely dangerous defects are both problems. The client needs a report they can act on, not one that feels theatrical or vague.',
        },
        {
          type: 'paragraph',
          text:
            'If coding is still a grey area on your reports, use the current [EICR limitations guide](/guides/eicr-limitations) and your scheme guidance so the wording and the code still make sense together.',
        },
      ],
    },
    {
      id: 'missing-limitations',
      heading: 'Missing limitations and missing context',
      blocks: [
        {
          type: 'list',
          items: [
            'No clear note where parts of the installation were inaccessible.',
            'Blank sections instead of an honest limitation statement.',
            'Observations raised without enough context for the client to understand the consequence.',
            'No clean separation between items that are dangerous now and items that are improvement recommendations.',
          ],
        },
      ],
    },
    {
      id: 'paperwork-finish',
      heading: 'The report should be usable the moment it lands',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A good EICR is not just technically sound. It is readable, traceable, and ready for client handover. The person reading it should understand what was inspected, what was found, what needs fixing first, and what the next step is.',
        },
        {
          type: 'paragraph',
          text:
            'That is why the [schedule of test results](/guides/schedule-of-test-results), the observations, and the handover wording all need to agree with each other.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is vague wording really that much of a problem on an EICR?',
      answer:
        'Yes. Vague wording makes the report harder to defend, harder to quote from, and harder for the client to understand. Clear wording protects both you and the client.',
    },
    {
      question: 'What is the biggest mistake on many EICRs?',
      answer:
        'Usually a combination of copied-forward data, weak circuit descriptions, and observation codes that do not quite match the actual defect or risk.',
    },
    {
      question: 'Should every missing test value become a code?',
      answer:
        'Not automatically. If a value is missing because of a genuine limitation, record the limitation clearly. The code should reflect the actual inspection outcome, not simply the fact a field is blank.',
    },
    {
      question: 'Does software really help with EICR quality?',
      answer:
        'Yes, provided the workflow is built properly. Good software reduces missing fields, keeps schedules aligned, and makes the final handover much cleaner.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-what-to-include',
      title: 'What to Include on an EICR',
      description: 'A cleaner checklist for the sections every report should cover.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-client-handover-guide',
      title: 'EICR Client Handover Guide',
      description: 'How to hand the report over so the client knows what happens next.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Keep the measured values aligned with the report.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete the report, observations, and PDF on one workflow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: certificateCtaHeading,
  ctaSubheading: certificateCtaSubheading,
};

export const eicrWhatToIncludeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-what-to-include',
  title: 'What to Include on an EICR | Electrician Certificate Guide | Elec-Mate',
  description:
    'A practical checklist for what an EICR should include so the report is complete, readable, and useful for both client handover and remedial work.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'EICR What to Include',
  heroPrefix: 'What to Include',
  heroHighlight: 'on an EICR',
  heroSubtitle:
    'A clean checklist for the sections, schedules, observations, and handover details that make an EICR usable and professional.',
  keyTakeaways: [
    'An EICR should clearly identify the installation, its extent, and any limitations before the findings begin.',
    'The schedules, observations, and overall outcome need to support each other.',
    'Good reports describe the actual condition of the installation, not just a pile of codes.',
    'The next step should be obvious to the client: satisfactory, unsatisfactory, remedial work, or further investigation.',
    'A digital workflow makes it easier to keep the report complete while still moving quickly on site.',
  ],
  sections: [
    {
      id: 'core-sections',
      heading: 'The core sections every EICR needs',
      blocks: [
        {
          type: 'list',
          items: [
            'Clear client, site, and installation details.',
            'The extent of the report and any agreed limitations.',
            'Supply characteristics, earthing and bonding details, and installation background.',
            'Schedules of inspection and test results that match the actual installation tested.',
            'Observation codes, comments, and the overall report outcome.',
          ],
        },
      ],
    },
    {
      id: 'observations',
      heading: 'Observations should help the client act',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A good EICR does more than raise codes. It tells the client what the issue is, where it is, how serious it is, and why it matters. That clarity makes remedial quoting much easier and reduces the back-and-forth after handover.',
        },
      ],
    },
    {
      id: 'schedules',
      heading: 'The schedules have to support the report',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the [schedule of test results](/guides/schedule-of-test-results) looks incomplete or mismatched, the whole report feels weak. The schedule should read like evidence for the conclusions, not like a separate document prepared by somebody else.',
        },
      ],
    },
    {
      id: 'handover',
      heading: 'Finish with a report the client can use',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The final PDF should be ready to hand over, not something that still needs cleaning up at night. If it is unsatisfactory, the client should understand what needs doing first and what you can quote next.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should an EICR include photographs?',
      answer:
        'Photos are not mandatory in every case, but they often improve clarity, especially for defects that need quoting or explanation after the visit.',
    },
    {
      question: 'Do limitations need to be agreed before the inspection?',
      answer:
        'Yes. Limitations should be agreed and recorded properly so the client understands what the report does and does not cover.',
    },
    {
      question: 'Can an EICR be unsatisfactory because of one serious defect?',
      answer:
        'Yes. One serious defect can make the report unsatisfactory if the risk justifies it.',
    },
    {
      question: 'What makes a report feel incomplete?',
      answer:
        'Usually weak descriptions, missing limitations, mismatched schedules, or observations that do not clearly explain the defect or consequence.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-common-mistakes',
      title: 'EICR Common Mistakes',
      description: 'The most frequent issues that weaken the report.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-client-handover-guide',
      title: 'EICR Client Handover Guide',
      description: 'How to present the finished report clearly to the client.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'How to handle inaccessible areas and agreed scope correctly.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete and export the report from one mobile flow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: certificateCtaHeading,
  ctaSubheading: certificateCtaSubheading,
};

export const eicrClientHandoverGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-client-handover-guide',
  title: 'EICR Client Handover Guide | Electrician Certificate Guide | Elec-Mate',
  description:
    'How to hand over an EICR so the client understands the result, the urgent actions, and the next step without confusion.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileText',
  breadcrumbLabel: 'EICR Client Handover',
  heroPrefix: 'EICR Client',
  heroHighlight: 'Handover Guide',
  heroSubtitle:
    'How to present the report, explain the outcome, and move smoothly into remedials, quotations, or sign-off.',
  keyTakeaways: [
    'The handover should explain the result first: satisfactory, unsatisfactory, or limited in scope.',
    'Clients need the urgent defects separated from improvement recommendations.',
    'A clean PDF and a clean verbal explanation reduce call-backs and confusion.',
    'The next step should be obvious: remedials, further investigation, or routine retention of the report.',
    'Software helps because the report, schedule, photos, and follow-on quote can stay together.',
  ],
  sections: [
    {
      id: 'start-with-outcome',
      heading: 'Start with the report outcome',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The first thing the client needs to understand is the overall result. If the report is unsatisfactory, say that plainly. If the inspection was limited, say what was excluded. If the installation is satisfactory, still explain the key notes so the handover does not feel rushed or careless.',
        },
      ],
    },
    {
      id: 'separate-actions',
      heading: 'Separate urgent actions from improvements',
      blocks: [
        {
          type: 'list',
          items: [
            'Defects that need urgent remedial work.',
            'Items that still need investigation before a full decision can be made.',
            'Non-urgent improvements or upgrades that are worth pricing separately.',
          ],
        },
      ],
    },
    {
      id: 'make-report-usable',
      heading: 'Make the report usable after you leave site',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A good handover means the client can re-open the report next week and still understand it. That is why the wording, the coding, and the schedule detail matter so much. If you expect a facilities manager, landlord, or homeowner to act on the report, the actions need to be obvious.',
        },
      ],
    },
    {
      id: 'link-to-next-step',
      heading: 'Use the handover to set the next step',
      blocks: [
        {
          type: 'paragraph',
          text:
            'When the report leads to more work, the cleanest move is to link the defects straight into a quote, snag list, or remedial certificate path while the job is still fresh. That keeps the client journey simple and reduces lost follow-up work.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should I explain every code line by line with the client?',
      answer:
        'Not always in extreme detail, but the client should clearly understand the serious items, the overall outcome, and the next step.',
    },
    {
      question: 'What is the biggest handover mistake?',
      answer:
        'Sending the PDF without context. Clients often need a short plain-English explanation of what the report means and what happens next.',
    },
    {
      question: 'Can the handover include a quote for remedials?',
      answer:
        'Yes, and in many cases it should. A clear report plus a clean remedial quote helps the client move faster.',
    },
    {
      question: 'Do landlords and commercial clients need a different style of handover?',
      answer:
        'The core principles stay the same, but the wording and emphasis should match the client. Commercial clients often care more about prioritisation and traceability.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-what-to-include',
      title: 'What to Include on an EICR',
      description: 'Build a report that is easier to hand over well.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-common-mistakes',
      title: 'EICR Common Mistakes',
      description: 'Avoid the errors that create confusion after handover.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-for-landlords',
      title: 'EICR for Landlords',
      description: 'Useful where the report feeds into rental compliance.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Report, export, and move into remedials without leaving the job.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: certificateCtaHeading,
  ctaSubheading: certificateCtaSubheading,
};

export const consumerUnitUpgradeCostGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/consumer-unit-upgrade-cost-guide',
  title: 'Consumer Unit Upgrade Cost Guide | UK Electrician Pricing | Elec-Mate',
  description:
    'How electricians and clients price consumer unit upgrades, what changes the cost, and how to keep the quote clear from the first visit.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Consumer Unit Upgrade Cost Guide',
  heroPrefix: 'Consumer Unit Upgrade',
  heroHighlight: 'Cost Guide',
  heroSubtitle:
    'A practical guide to what drives the price of a consumer unit upgrade and how to quote it cleanly without missing the real extras.',
  keyTakeaways: [
    'The headline board cost is only one part of the job. Labour, testing, tails, bonding work, and remedials often move the price more than the enclosure.',
    'Older properties often need more than a simple swap, which is why site survey detail matters.',
    'A clear quote separates the base board change from additional remedials and optional upgrades.',
    'Pricing gets easier when labour, materials, testing, and certification are all visible in one workflow.',
    'Elec-Mate helps turn the survey into a quote, certificate, and handover without rebuilding the job twice.',
  ],
  sections: [
    {
      id: 'what-drives-cost',
      heading: 'What actually drives the cost',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most clients think the board itself sets the whole price. In reality, the cost usually moves because of the installation around it: number of circuits, condition of existing conductors, need for SPDs or RCBOs, tail upgrades, bonding defects, and the amount of testing needed before the board can be safely re-energised.',
        },
      ],
    },
    {
      id: 'base-vs-extra',
      heading: 'Split the base scope from the extras',
      blocks: [
        {
          type: 'list',
          tone: 'pricing',
          items: [
            'Base board replacement or upgrade scope.',
            'Protective device choice, including RCBO and SPD setup.',
            'Main tails, meter tails, switches, glands, and sundries.',
            'Bonding upgrades, circuit remedials, and any discovered defects.',
            'Testing, certification, and notification where relevant.',
          ],
        },
      ],
    },
    {
      id: 'survey-matters',
      heading: 'Why the survey matters before the quote',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A fast survey saves arguments later. If the existing board is badly labelled, the tails are poor, or the main bonding is missing, that needs to be picked up early and reflected in the quote. Otherwise a tidy-looking price turns into a stressful on-site renegotiation.',
        },
      ],
    },
    {
      id: 'make-quote-clear',
      heading: 'Make the quote easy to say yes to',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Clients respond better when the quote is clear about what is included, what is optional, and what could be subject to condition on strip-out. That is better for trust and better for margin than hiding the detail inside one headline figure.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why do consumer unit upgrade quotes vary so much?',
      answer:
        'Because the surrounding installation varies. The board itself may be only part of the cost once remedials, testing, protective devices, and tail or bonding issues are included.',
    },
    {
      question: 'Should I price remedials separately?',
      answer:
        'In most cases, yes. Separating the base board work from discovered remedials gives the client a clearer decision and protects your margin.',
    },
    {
      question: 'Does an upgrade always mean a full board replacement?',
      answer:
        'Not always, but many practical upgrade jobs do involve a full board change because that is the cleanest route to a safer and more modern arrangement.',
    },
    {
      question: 'Should testing and certification be broken out on the quote?',
      answer:
        'They should at least be visible in the pricing logic, even if the client sees them bundled into the main scope.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-upgrade-price-breakdown',
      title: 'Consumer Unit Price Breakdown',
      description: 'A clearer split of board, devices, labour, and testing.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-labour-and-materials',
      title: 'Labour and Materials',
      description: 'How the quote normally divides between time and parts.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'Existing cost page for broader board replacement pricing.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build a cleaner quote and send it from the same job.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: pricingCtaHeading,
  ctaSubheading: pricingCtaSubheading,
};

export const consumerUnitUpgradePriceBreakdownConfig: GeneratedGuideConfig = {
  pagePath: '/guides/consumer-unit-upgrade-price-breakdown',
  title: 'Consumer Unit Upgrade Price Breakdown | UK Electrician Pricing | Elec-Mate',
  description:
    'A line-by-line breakdown of the cost areas that usually make up a consumer unit upgrade quote in the UK.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Pricing Guide',
  badgeIcon: 'Calculator',
  breadcrumbLabel: 'Consumer Unit Price Breakdown',
  heroPrefix: 'Consumer Unit Upgrade',
  heroHighlight: 'Price Breakdown',
  heroSubtitle:
    'The main pricing lines electricians need to account for when quoting a board upgrade properly.',
  keyTakeaways: [
    'A strong board-upgrade quote is usually built from materials, labour, testing, and conditional remedials.',
    'Protective devices and accessories can move the material price more than the enclosure alone.',
    'Time on the job includes isolation, strip-out, installation, testing, labelling, and paperwork.',
    'The clearest quotes show what is fixed scope and what depends on the condition of the installation.',
    'Breaking the price down well improves client trust and protects your margin.',
  ],
  sections: [
    {
      id: 'materials',
      heading: 'Materials usually include more than the board',
      blocks: [
        {
          type: 'list',
          tone: 'pricing',
          items: [
            'Consumer unit enclosure and main switch arrangement.',
            'RCBOs, MCBs, RCDs, SPD equipment, and blanks or accessories.',
            'Meter tails, glands, consumer unit tails, labels, ferrules, and sundries.',
            'Replacement connectors, enclosures, or accessory parts found necessary during the change.',
          ],
        },
      ],
    },
    {
      id: 'labour',
      heading: 'Labour includes the full working day, not just the swap',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A fair labour allowance covers safe isolation, removing the old board, re-terminating circuits, resolving reasonable issues found on change-over, testing, labelling, and producing the finished paperwork. Many under-priced jobs ignore the back half of the day and only think about fitting time.',
        },
      ],
    },
    {
      id: 'testing-paperwork',
      heading: 'Testing and paperwork are part of the price',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The job is not finished when the front cover goes on. Testing, certification, and where required notification are part of the deliverable. If they are not visible in your pricing logic, the quote is usually softer than it looks.',
        },
      ],
    },
    {
      id: 'conditional-lines',
      heading: 'Use conditional lines for unknowns',
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: 'Protect the quote without hiding it',
          text:
            'If the survey suggests likely extras such as bonding defects, damaged circuit conductors, or tail issues, show them as conditional lines or exclusions instead of hoping they disappear on the day.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should I show the client the materials separately?',
      answer:
        'Often yes, especially on larger or more premium board specifications. It helps explain why one quote is not the same as another.',
    },
    {
      question: 'Is paperwork a chargeable part of the board upgrade?',
      answer:
        'It should be. Testing, certificates, and notification are part of the job and take real time.',
    },
    {
      question: 'Do I need a contingency line for unknown defects?',
      answer:
        'Not always as a hidden contingency, but you should make conditional items or exclusions clear where the existing installation condition is uncertain.',
    },
    {
      question: 'Why do RCBO and SPD choices affect the quote so much?',
      answer:
        'Because device selection changes both material cost and sometimes installation time, especially on larger boards.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Cost Guide',
      description: 'The wider guide to how the full price is built.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-labour-and-materials',
      title: 'Labour and Materials',
      description: 'A closer look at where the time and parts sit.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'The practical reasons clients and electricians move ahead with the work.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn the price breakdown into a clean PDF quote.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: pricingCtaHeading,
  ctaSubheading: pricingCtaSubheading,
};

export const consumerUnitUpgradeLabourAndMaterialsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/consumer-unit-upgrade-labour-and-materials',
  title: 'Consumer Unit Upgrade Labour and Materials | UK Electrician Pricing | Elec-Mate',
  description:
    'How labour and materials usually split on a consumer unit upgrade and what experienced electricians make sure is visible before quoting.',
  datePublished: published,
  dateModified: modified,
  readingTime: 7,
  badge: 'Pricing Guide',
  badgeIcon: 'Wrench',
  breadcrumbLabel: 'Consumer Unit Labour and Materials',
  heroPrefix: 'Consumer Unit Upgrade',
  heroHighlight: 'Labour and Materials',
  heroSubtitle:
    'A practical look at where the time goes, what the material basket usually includes, and why both sides need to be visible in the quote.',
  keyTakeaways: [
    'Material cost is often only one slice of the final board-upgrade price.',
    'Labour has to cover the full installation, testing, and paperwork cycle.',
    'The existing condition of the installation can move both labour time and material use.',
    'Clear labour and materials logic helps you defend the quote when clients compare prices.',
    'Software makes it easier to keep that split consistent from quote to invoice.',
  ],
  sections: [
    {
      id: 'labour-side',
      heading: 'What the labour side actually covers',
      blocks: [
        {
          type: 'list',
          items: [
            'Survey and set-up time before isolation.',
            'Safe isolation, strip-out, board mounting, and re-termination.',
            'On-the-day correction of reasonable minor issues found at change-over.',
            'Testing, labelling, paperwork, and client handover.',
          ],
        },
      ],
    },
    {
      id: 'materials-side',
      heading: 'What usually sits in the materials basket',
      blocks: [
        {
          type: 'list',
          tone: 'pricing',
          items: [
            'Board and protective devices.',
            'SPD kit, tails, glands, labels, ferrules, and sundries.',
            'Replacement accessories or connectors required during the upgrade.',
            'Any clearly identified remedial items already picked up in the survey.',
          ],
        },
      ],
    },
    {
      id: 'why-split-matters',
      heading: 'Why this split matters on the quote',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the client only sees one headline figure, they often assume the board itself is most of the job. Showing labour and materials logic helps them understand why one quote is higher and why a tidy installation with proper testing cannot be priced like a fast swap-out.',
        },
      ],
    },
    {
      id: 'link-to-invoice',
      heading: 'Keep the same structure through to invoice',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The cleanest jobs use the same structure from quote to final invoice. That consistency reduces disputes and makes it easier to explain variations if extra remedials are approved later.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should labour and materials always be shown separately?',
      answer:
        'Not in every client-facing format, but the split should exist in your own pricing logic so you know where the margin really sits.',
    },
    {
      question: 'Do consumer unit jobs often overrun because labour was under-allowed?',
      answer:
        'Yes. Under-pricing often comes from forgetting the testing, paperwork, and fault-resolution time rather than the fitting itself.',
    },
    {
      question: 'Can one bad circuit change the job price?',
      answer:
        'Yes. Existing defects uncovered during the upgrade can add both labour and material lines, which is why survey notes and exclusions matter.',
    },
    {
      question: 'Why does this matter for invoicing?',
      answer:
        'Because the clearest invoices follow the same job logic as the quote, which makes approval and payment much smoother.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Cost Guide',
      description: 'The overall pricing logic for board upgrades.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-price-breakdown',
      title: 'Consumer Unit Price Breakdown',
      description: 'A clearer line-by-line view of the quote.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Keep the quote and the final job value aligned.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Carry the same job structure through to final invoice.',
      icon: 'FileText',
      category: 'Tool',
    },
  ],
  ctaHeading: pricingCtaHeading,
  ctaSubheading: pricingCtaSubheading,
};

export const victorianTerraceElectricalRequirementsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/victorian-terrace-electrical-requirements',
  title: 'Electrical Requirements for Victorian Terrace | Electrician Guide | Elec-Mate',
  description:
    'A practical guide to the electrical issues, survey points, and upgrade priorities electricians often find in Victorian terrace properties.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Property Guide',
  badgeIcon: 'Home',
  breadcrumbLabel: 'Victorian Terrace Requirements',
  heroPrefix: 'Electrical Requirements for',
  heroHighlight: 'Victorian Terrace',
  heroSubtitle:
    'What electricians look for in Victorian terrace properties, the common weak points, and how to turn the survey into a safer, clearer job scope.',
  keyTakeaways: [
    'Victorian terraces often combine old fabric with layers of later electrical alterations, so the survey matters more than assumptions.',
    'Common pressure points include limited circuit capacity, awkward cable routes, poor earthing or bonding, and accessory changes added over decades.',
    'The property layout often affects the labour plan as much as the electrical design.',
    'Quotes are stronger when they separate essential safety work from optional upgrades and finish items.',
    'A good property-specific workflow helps you survey, quote, certificate, and hand over without losing the thread of the job.',
  ],
  sections: [
    {
      id: 'what-makes-different',
      heading: 'Why Victorian terraces need a careful survey',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Victorian terraces rarely behave like blank-canvas installs. Many have been extended, divided, converted, or patched over time, which means the electrical installation can carry a mix of ages, materials, and circuit strategies in one small footprint.',
        },
      ],
    },
    {
      id: 'common-issues',
      heading: 'Common electrical issues in this type of property',
      blocks: [
        {
          type: 'list',
          items: [
            'Limited socket provision and later spur-heavy additions.',
            'Old or awkward cable routes through solid walls, floor voids, and tight stair cores.',
            'Mixed accessory ages and signs of repeated small alterations.',
            'Consumer units that no longer suit the current demand of the home.',
            'Earthing and bonding that needs bringing up to a modern standard.',
          ],
        },
      ],
    },
    {
      id: 'design-priority',
      heading: 'What to prioritise when designing the work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The priority is usually to create a safer, clearer installation without turning every job into a full rewire by default. Sometimes the right answer is a focused upgrade: better board arrangement, better circuit separation, and correction of the worst historic alterations. Sometimes the survey shows the property really does need far more extensive work.',
        },
      ],
    },
    {
      id: 'quote-and-scope',
      heading: 'How to scope and quote the work cleanly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Victorian terrace jobs benefit from a clear split between essential safety work, optional upgrades, and finish-related items. That makes the quote easier for the client to approve and reduces scope drift later.',
        },
        {
          type: 'paragraph',
          text:
            'If the survey points to a board change first, the [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) and the [electrical quoting app](/electrical-quoting-app) are the natural next steps.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Does every Victorian terrace need a full rewire?',
      answer:
        'No. Some need major work, but others need focused safety upgrades and a better circuit arrangement rather than a full strip-out. The survey should decide that, not the age of the property alone.',
    },
    {
      question: 'Why are these jobs often harder to price?',
      answer:
        'Because access, hidden alterations, and unknown cable routes can change the labour plan quickly if the survey has not been detailed enough.',
    },
    {
      question: 'Is a consumer unit upgrade common in Victorian terraces?',
      answer:
        'Yes. Many of these properties have grown in demand over time and benefit from a better board arrangement even where the whole installation is not being rewired.',
    },
    {
      question: 'Should I recommend an EICR first?',
      answer:
        'Often yes, especially if the property has a long history of changes and the condition is not clear from a visual survey alone.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/victorian-terrace-consumer-unit-upgrade',
      title: 'Victorian Terrace Consumer Unit Upgrade',
      description: 'How board upgrades usually play out in this property type.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost Guide',
      description: 'Pricing logic for one of the most common upgrade paths.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Useful when the survey points toward far more extensive work.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn the survey into a cleaner quote while still on the job.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: propertyCtaHeading,
  ctaSubheading: propertyCtaSubheading,
};

export const victorianTerraceConsumerUnitUpgradeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/victorian-terrace-consumer-unit-upgrade',
  title: 'Victorian Terrace Consumer Unit Upgrade | Electrician Guide | Elec-Mate',
  description:
    'How electricians approach consumer unit upgrades in Victorian terrace properties, what usually complicates the job, and how to quote it clearly.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Property Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Victorian Terrace CU Upgrade',
  heroPrefix: 'Victorian Terrace',
  heroHighlight: 'Consumer Unit Upgrade',
  heroSubtitle:
    'A practical guide to board upgrades in older terrace properties where access, older alterations, and hidden defects often shape the job.',
  keyTakeaways: [
    'Victorian terrace board upgrades are often straightforward on paper and more involved once the existing condition is exposed.',
    'Main tails, bonding, poor labelling, and legacy alterations often become part of the real scope.',
    'The cleanest quotes separate the base upgrade from conditional remedials.',
    'Property layout and access can affect labour just as much as the board specification.',
    'Good software helps keep the survey, quote, certificate, and handover tied to the same property record.',
  ],
  sections: [
    {
      id: 'why-this-job-changes',
      heading: 'Why this job changes in older terrace properties',
      blocks: [
        {
          type: 'paragraph',
          text:
            'In Victorian terraces, the consumer unit is often only one part of the story. You may find mixed circuit labelling, altered kitchen or loft supplies, bonding issues, or tails and accessories that no longer suit the demand of the property. That is why the survey detail matters so much before a price is promised.',
        },
      ],
    },
    {
      id: 'typical-scope',
      heading: 'Typical scope on these jobs',
      blocks: [
        {
          type: 'list',
          items: [
            'Board replacement or upgrade with revised protective devices.',
            'Review of tails, main switch arrangement, and bonding condition.',
            'Testing and relabelling of existing circuits.',
            'Conditional remedials for defects uncovered during the change-over.',
          ],
        },
      ],
    },
    {
      id: 'how-to-quote',
      heading: 'How to quote it without getting trapped later',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The cleanest way to quote is to define the upgrade scope clearly, note the likely unknowns, and show any conditional lines that may be needed if the existing condition is worse than the survey could confirm. That protects the relationship and protects the job value.',
        },
      ],
    },
    {
      id: 'close-out',
      heading: 'Finish with a clean certificate and handover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the upgrade is complete, the finish matters. Clear circuit descriptions, correct certification, and a readable client handover make the job feel complete instead of rushed.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is this basically the same as any other board change?',
      answer:
        'Not always. Victorian terrace properties often bring older alterations and access challenges that can make the real scope wider than a simple like-for-like board swap.',
    },
    {
      question: 'Should I price remedials into the headline figure?',
      answer:
        'Usually it is better to separate known base scope from conditional remedials so the client understands the difference.',
    },
    {
      question: 'Do these jobs often lead to wider recommendations?',
      answer:
        'Yes. Once the board is being upgraded, issues with bonding, circuit identification, or legacy alterations are often easier to see and easier to explain to the client.',
    },
    {
      question: 'Can I quote and certify this from one workflow?',
      answer:
        'Yes, and that is usually the cleanest route. It keeps the property detail, price, and final paperwork in the same place.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/victorian-terrace-electrical-requirements',
      title: 'Victorian Terrace Electrical Requirements',
      description: 'The wider guide to the property type and common electrical issues.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost Guide',
      description: 'The pricing logic behind a cleaner board-upgrade quote.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'A broader guide to when clients and electricians move ahead with the work.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build the quote and keep it tied to the same property.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: propertyCtaHeading,
  ctaSubheading: propertyCtaSubheading,
};
