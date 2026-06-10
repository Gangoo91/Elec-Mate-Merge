import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the Reporting of Injuries, Diseases and Dangerous
// Occurrences Regulations 2013 (RIDDOR), HSE guidance INDG453, the
// Management of Health and Safety at Work Regulations 1999 and the
// Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const nearMissReportingElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/near-miss-reporting-electricians',
  title:
    'Near-Miss Reporting for Electricians (UK HSE Framework)',
  description:
    'Near-miss reporting for UK electricians: what counts, why under-reporting is dangerous, the HSE framework, RIDDOR dangerous-occurrence scope…',
  datePublished: published,
  dateModified: modified,
  readingTime: 11,
  badge: 'Site Safety Guide',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'Near-Miss Reporting',
  heroPrefix: 'Near-Miss Reporting for',
  heroHighlight: 'Electricians',
  heroSuffix: '(UK HSE Framework)',
  heroSubtitle:
    'A near-miss is an incident where damage, injury or worse could have happened, but didn\'t. Under-reporting them masks emerging hazards on site. This guide explains what counts as a near-miss for electricians, the UK HSE framework, the RIDDOR dangerous-occurrence scope and how to embed reporting in a working day without it becoming paperwork theatre.',
  keyTakeaways: [
    'A near-miss is any unplanned event that could have caused injury, ill health or damage but did not — the hazard was present and exposure occurred, only the outcome was lucky.',
    'HSE evidence is consistent that serious incidents do not appear in isolation: a fatality is preceded by hundreds of unreported near-misses pointing to the same underlying weakness in controls.',
    'Reporting a near-miss is not, on its own, a stand-alone legal requirement — but the duty to identify and control risk under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999 makes near-miss data part of effective risk management.',
    'Certain dangerous occurrences listed in Schedule 2 of RIDDOR 2013 are reportable to HSE even where no one was injured — for electricians this can include electrical short circuit attended by fire or explosion that stops the affected plant for more than 24 hours.',
    'The HSE framework summarised in INDG453 expects employers to record incidents, investigate root cause, share lessons and update risk assessments — not simply file the report and move on.',
    'A near-miss without a documented corrective action is a near-miss that will happen again. The corrective action is the point of the exercise.',
  ],
  sections: [
    {
      id: 'what-is-a-near-miss',
      heading: 'What a Near-Miss Is (and What It Isn\'t)',
      tocLabel: 'What a near-miss is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE guidance defines a near-miss as any unplanned event that did not result in injury, illness or damage, but had the potential to do so. The hazard was real, the exposure happened, the outcome could have been bad — it simply wasn\'t. The hazard and the failure in controls are identical to those that produce an accident; only luck or timing prevented the harm.',
        },
        {
          type: 'paragraph',
          text:
            'On electrical work, near-misses are everywhere if you look for them. You touch a conductor expecting it to be dead and get a tingle. You drill into a wall and miss a buried cable by a few millimetres. A ladder slips while you are working at a board. A tool falls from height and lands where someone was standing thirty seconds ago. None of these caused an injury this time — but each one is a free warning that something in the system needs fixing.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The only difference between a near-miss and an accident is',
          text:
            'The hazard, the failure in controls and the root cause are the same. This is why HSE places such weight on near-miss data: it reveals the same weaknesses as an accident report, without the human cost. Treat near-misses as leading indicators, not as paperwork.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      heading: 'Why Under-Reporting Is the Real Hazard',
      tocLabel: 'Why it matters',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The instinct after a near-miss is relief. "Nothing happened, no harm done." That instinct is the problem. Every unreported near-miss is a missed chance to catch a failing control before it produces an injury.',
        },
        {
          type: 'paragraph',
          text:
            'HSE\'s position, reinforced through INDG453 and decades of investigation work, is straightforward: serious incidents are preceded by a long tail of smaller events pointing at the same underlying weakness. The well-known accident-triangle research has changed shape over the years, but the principle has not — a single fatal accident sits on top of roughly 300 near-misses that, taken seriously, would have closed the gap long before the fatality occurred.',
        },
        {
          type: 'list',
          items: [
            'Near-misses reveal hidden hazards that the original risk assessment did not pick up — a mislabelled circuit, an unsurveyed cable run, a missing safe zone.',
            'They identify failing controls — a proving unit that gave a misleading indication, an isolation that was assumed but not verified, a permit that was not issued because the work was "only quick".',
            'They drive better procedures — every report should change something, even if it is only a [toolbox talk](/guides/site-induction-electrical-contractors) or an updated method statement.',
            'They demonstrate active safety management to clients, principal contractors and HSE. A high near-miss reporting rate with a low injury rate is the profile of a contractor who is in control. A low reporting rate with regular injuries is the opposite.',
          ],
        },
      ],
    },
    {
      id: 'common-electrical-near-misses',
      heading: 'Common Electrical Near-Misses',
      tocLabel: 'Common electrical near-misses',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The following are among the most commonly reported near-misses on UK electrical work. None of them ended in injury this time. Every one of them could have.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Brief contact with a believed-dead conductor — typically a result of proving-unit failure, a wrong circuit isolated at the board, a borrowed neutral, or a failure to prove dead at the point of work after a delay.',
            'Live cable cut accidentally while drilling, chasing or fixing — the cable was outside a safe zone, no cable-route survey was carried out, or the existing installation drawings were out of date.',
            'Arc-flash flash-over while racking out a switchgear unit — PPE prevented injury, but the underlying lack of an approach distance, a faulty interlock or an out-of-date risk assessment is the same condition that produces serious arc-flash burns.',
            'Object falling from height during ladder work near a distribution board — a hand tool, a fitting, or an offcut that lands close to someone below. Toe boards, tool lanyards and exclusion zones are the controls that go missing first.',
            'Slip on a damp basement floor near low-voltage gear — water ingress is the obvious risk; the near-miss is also a warning about the floor surface, lighting and access route to the gear.',
            '"Tested as dead but wasn\'t" — proving unit was not proved against a known live source before and after the test, leading to a confident but incorrect isolation. This is the single most dangerous near-miss in the trade.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Treat "tested as dead but wasn\'t" as a top-priority report',
          text:
            'If proving-unit behaviour was abnormal, or a circuit gave a different reading on second testing, that event needs to be recorded, investigated and shared. Replace the proving unit, audit the safe isolation procedure, and treat any contractor who normalises this as carrying a serious safety problem. See our [method statement for safe isolation](/guides/method-statement-safe-isolation) for the procedural baseline.',
        },
      ],
    },
    {
      id: 'reporting-framework',
      heading: 'The HSE Reporting Framework in Practice',
      tocLabel: 'Reporting framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The framework set out in HSE guidance INDG453 ("Investigating accidents and incidents") and supported by the Management of Health and Safety at Work Regulations 1999 sits on five stages. Every credible reporting system maps to these:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Stop and make safe. Before anything else, remove the continuing hazard — isolate the circuit, cordon the area, withdraw the damaged equipment from use. A near-miss report on a hazard that is still live is not a report; it is a hazard waiting for its second chance.',
            'Document the incident. Capture what happened, where, when, who was involved, and crucially why it could have been worse. A photograph is worth more than a paragraph and travels with the report.',
            'Report to the right people. Site supervisor first, then principal contractor under CDM 2015 if applicable, then HSE if the event falls within the RIDDOR scope below.',
            'Investigate root cause. The "five whys" or equivalent technique is enough for most cases. The objective is to identify the systemic failure — not to identify a person to blame.',
            'Share the lesson. A near-miss that stays in a folder is wasted data. Update the risk assessment, brief the team via a [site induction or toolbox talk](/guides/site-induction-electrical-contractors), revise the relevant [RAMS](/guides/electrical-rams-template-uk) and verify the change has stuck on the next job.',
          ],
        },
      ],
    },
    {
      id: 'riddor-scope',
      heading: 'When a Near-Miss Becomes a RIDDOR Report',
      tocLabel: 'RIDDOR scope',
      blocks: [
        {
          type: 'paragraph',
          text:
            'RIDDOR 2013 — the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations — imposes a specific duty on the "responsible person" to report certain events to HSE. Most people associate RIDDOR with injuries, but Schedule 2 of the Regulations lists "dangerous occurrences" that are reportable even where no one was hurt. For electricians, this is where serious near-misses cross into legally reportable territory.',
        },
        {
          type: 'list',
          items: [
            'Electrical short circuit or overload attended by fire or explosion which results in the stoppage of the plant involved for more than 24 hours, or which has the potential to cause death — this is the dangerous-occurrence category most relevant to electrical contractors.',
            'Collapse, overturning or failure of load-bearing parts of lifts, hoists and lifting equipment used on site — common where temporary supplies feed site lifts.',
            'Failure of any closed vessel, pressure system or pipeline.',
            'Unintended collapse of any building or structure under construction, or any false-work — relevant where electrical works are being installed within the structure.',
            'Any explosion or fire causing suspension of normal work for more than 24 hours, where caused by the ignition of process materials, by-products or finished products.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'How to report a RIDDOR dangerous occurrence',
          text:
            'Dangerous occurrences must be reported to HSE without delay using the online RIDDOR reporting service. A written record must also be kept for at least three years. The duty falls on the "responsible person" — usually the employer, or in the case of self-employed work the person in control of the premises. Treat any uncertainty about whether an event is reportable as a reason to report — HSE will not penalise an over-cautious report.',
        },
      ],
    },
    {
      id: 'legal-context',
      heading: 'Legal Context Beyond RIDDOR',
      tocLabel: 'Legal context',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Even where an incident is not a RIDDOR dangerous occurrence, near-miss reporting sits inside several overlapping duties under UK law. An employer who knows about a hazard and fails to act on it cannot rely on the absence of a RIDDOR threshold to defend that inaction.',
        },
        {
          type: 'list',
          items: [
            'Health and Safety at Work Act 1974 — Section 2 places a duty on employers to ensure, so far as is reasonably practicable, the health and safety of employees. A pattern of unreported or unactioned near-misses is evidence that the duty has not been discharged.',
            'Management of Health and Safety at Work Regulations 1999 — Regulation 3 requires a suitable and sufficient risk assessment. Near-miss data is the most direct source of real-world evidence to test whether that assessment is, in fact, sufficient.',
            'Electricity at Work Regulations 1989 — Regulation 4 requires electrical systems to be constructed, maintained and used so as to prevent danger. Near-misses involving electrical contact, fault current or insulation failure go directly to whether this duty is being met.',
            'Construction (Design and Management) Regulations 2015 — on construction projects, the principal contractor is required to plan, manage and monitor health and safety. A near-miss reporting system that runs back into the project safety file is part of that monitoring obligation. See our [CDM 2015 guide for electricians](/guides/cdm-2015-for-electricians).',
            'Working alone, with permits or near live mains — these scenarios elevate the consequence of a control failure, which is why near-miss reporting is doubly important. See [lone-working guidance](/guides/lone-working-electricians), the [permit-to-work for electrical isolation](/guides/permit-to-work-electrical-isolation) guide and our note on [working near live mains](/guides/working-near-live-mains-hazard-control).',
          ],
        },
      ],
    },
    {
      id: 'making-it-work',
      heading: 'Making Near-Miss Reporting Actually Work on Site',
      tocLabel: 'Making it work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most near-miss systems fail not because the form is wrong but because the culture is wrong. Workers will not report if they fear blame, ridicule or being labelled as "the one who keeps moaning". A reporting system that produces three reports a year on a busy site is broken, regardless of how polished the form looks.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Make it explicit, in writing, at induction and in every toolbox talk that near-miss reporting is expected and will never be used as grounds for disciplinary action against the reporter.',
            'Acknowledge every report. Thank the reporter, share the corrective action, and where appropriate brief the wider team. Workers who see their reports lead to real change keep reporting.',
            'Make the reporting itself fast. A two-minute form on a phone is the realistic ceiling. A 20-minute paper form on the office desk produces zero reports from the actual workforce.',
            'Lead by example — supervisors and managers should be reporting their own near-misses. It signals that the system is for everyone.',
            'Treat the corrective action as the deliverable, not the report. Every report should result in a change to the risk assessment, RAMS, induction content or kit on site.',
            'Use the data. Aggregate near-misses by type, location and root cause. Patterns that are invisible from a single report jump out of three months of aggregated data.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Build the reporting system into your paperwork',
          text:
            'Near-miss reporting works best when it sits inside the same toolkit as your risk assessment and method statement. Elec-Mate\'s [RAMS Generator](/tools/rams-generator) lets you spin up site-specific RAMS, embed your near-miss reporting procedure as a control, and update the document the next time the procedure changes. 7-day free trial, no charge until day 8.',
        },
      ],
    },
  ],
  howToHeading: 'How to handle a near-miss on site',
  howToDescription:
    'Five practical steps that map to the HSE framework. Use them as a mental checklist before the event fades from memory.',
  howToSteps: [
    {
      name: 'Stop and make safe',
      text:
        'Remove the continuing hazard before doing anything else. Isolate the circuit, cordon the area, withdraw the damaged equipment from use. A near-miss with the hazard still live is not a report — it is the next accident waiting to happen.',
    },
    {
      name: 'Document while it is fresh',
      text:
        'Within minutes, capture what happened, where, when, who was involved and what could have happened. Photograph the hazard. Note the immediate cause (the proximate event) and your first read of the underlying cause (the systemic failure).',
    },
    {
      name: 'Report to the right people',
      text:
        'Inform the site supervisor immediately. On a CDM project, the principal contractor needs to know. If the event falls within a RIDDOR Schedule 2 dangerous-occurrence category, report it to HSE via the online RIDDOR service without delay.',
    },
    {
      name: 'Investigate root cause, not blame',
      text:
        'Use the five-whys technique or an equivalent root-cause method. The objective is to identify the systemic failure — the missing procedure, the out-of-date drawing, the assumed isolation that was never verified — not to identify a person to blame.',
    },
    {
      name: 'Close the loop with a corrective action',
      text:
        'Update the risk assessment, revise the RAMS, brief the team via a toolbox talk, replace the proving unit or change the cable-route survey procedure. Share the outcome with the reporter and the wider workforce. Verify the change holds on the next job of the same type.',
    },
  ],
  faqs: [
    {
      question: 'Is near-miss reporting a legal requirement in itself?',
      answer:
        'Near-miss reporting as a stand-alone activity is not mandated by a single regulation. However, the duties it supports are. Section 2 of the Health and Safety at Work Act 1974, Regulation 3 of the Management of Health and Safety at Work Regulations 1999 and Regulation 4 of the Electricity at Work Regulations 1989 all require active identification and control of risk. Near-miss data is one of the strongest sources of evidence that those duties are being discharged. Separately, certain dangerous occurrences listed in Schedule 2 of RIDDOR 2013 must be reported to HSE even where no one was injured — those are legally required reports, not optional ones.',
    },
    {
      question: 'What counts as a "dangerous occurrence" for electricians under RIDDOR?',
      answer:
        'The category most relevant to electrical contractors is an electrical short circuit or overload attended by fire or explosion which results in the stoppage of the plant involved for more than 24 hours, or which has the potential to cause death. Other RIDDOR Schedule 2 categories that can apply on electrical projects include the failure of lifting equipment supplied by a temporary electrical installation, the unintended collapse of a structure under construction, and certain explosions or fires that suspend normal work for more than 24 hours. If you are unsure, report — HSE does not penalise over-cautious reporting.',
    },
    {
      question: 'Who is the "responsible person" who has to report to HSE under RIDDOR?',
      answer:
        'Under RIDDOR 2013, the responsible person is normally the employer of an injured worker, the self-employed person where they are working alone, or the person in control of the premises where the incident occurred. On a construction project, this is often the principal contractor. For a sub-contracted electrical crew working under a principal contractor, the duty to report a RIDDOR-reportable event typically falls on the principal contractor, but your own employer also has obligations under the Regulations and should not be cut out of the chain. The practical rule: report up to your own employer immediately, and confirm in writing who is filing the HSE report.',
    },
    {
      question: 'What should a near-miss report actually contain?',
      answer:
        'At minimum: the date, time and exact location; the name of the reporter (or "anonymous" if the system supports it); a factual description of what happened, what the person was doing and what could have happened; the immediate cause (the proximate event or condition); the underlying cause (the systemic failure); any photos or evidence; what immediate action was taken to remove the hazard; and the recommended corrective action to prevent recurrence. The HSE guidance in INDG453 is essentially the long form of this checklist.',
    },
    {
      question: 'Should near-miss reporting be anonymous?',
      answer:
        'It can be, and in many cases anonymous reporting is encouraged when first building a reporting culture. Workers who fear reprisal or embarrassment are more likely to report if they can do so without putting their name to it. The downside is that anonymous reports cannot be followed up for additional detail and the reporter cannot be acknowledged. A dual system — named reporting for day-to-day events and an anonymous route for sensitive issues — works well in practice. The long-term goal is a culture where named reporting is the norm because workers trust that reports will be received positively.',
    },
    {
      question: 'How is a near-miss different from an "accident"?',
      answer:
        'The only difference is the outcome. A near-miss is an event that had the potential to cause injury, illness or damage but did not. An accident is the same event with a different outcome — someone was hurt or something was damaged. The hazard, the failure in controls and the root cause are identical. That is why HSE places such weight on near-miss data: it reveals the same weaknesses in your safety systems as an accident report, but without the human cost. Treat near-misses as leading indicators, not as relief.',
    },
    {
      question: 'Can a contractor be prosecuted for failing to act on a known near-miss?',
      answer:
        'Yes. The Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989 place active duties to manage and prevent risk. HSE investigators routinely review near-miss registers when investigating a serious accident. A documented near-miss that pointed at the failure leading to the accident, with no corrective action recorded, is the kind of evidence that supports enforcement action. The flip side is also true: a well-maintained near-miss register with clear corrective actions is strong defensive evidence that the duty was being discharged.',
    },
  ],
  faqHeading: 'Frequently Asked Questions About Near-Miss Reporting',
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Build site-specific RAMS that embed near-miss reporting as a control measure. AI-assisted, BS 7671 aligned, edit and export to PDF.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description:
        'A worked RAMS template with the right structure for near-miss capture, corrective actions and review cycles.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/cdm-2015-for-electricians',
      title: 'CDM 2015 for Electricians',
      description:
        'How CDM duties shape principal-contractor notification, near-miss reporting flow and the project safety file.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/site-induction-electrical-contractors',
      title: 'Site Induction for Electrical Contractors',
      description:
        'Set near-miss expectations from day one — the induction is where reporting culture is made or broken.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement for Safe Isolation',
      description:
        'The procedural baseline behind "tested as dead but wasn\'t" near-misses. Prove dead at the point of work, every time.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit-to-Work for Electrical Isolation',
      description:
        'When isolation must run through a formal permit — the controls that turn a high-consequence near-miss back into a non-event.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/lone-working-electricians',
      title: 'Lone-Working Electricians',
      description:
        'Why near-miss reporting matters more, not less, when there is no second pair of eyes on the job.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains — Hazard Control',
      description:
        'Approach distances, barriers and the near-misses that precede arc-flash injuries on live or partially-isolated gear.',
      icon: 'Zap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Turn near-miss reports into corrective actions',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator builds site-specific RAMS that embed near-miss reporting as a live control — capture the event on your phone, update the document, and brief the team without ever opening a paper form. 7-day free trial, no charge until day 8, cancel anytime.',
};
