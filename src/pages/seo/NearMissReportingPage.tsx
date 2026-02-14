import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Shield,
  ShieldCheck,
  FileText,
  GraduationCap,
  ClipboardCheck,
  HardHat,
  Heart,
  Eye,
  TrendingUp,
  Zap,
  BookOpen,
  Megaphone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-on-site' },
  { label: 'Near Miss Reporting', href: '/guides/near-miss-reporting' },
];

const tocItems = [
  { id: 'what-is-near-miss', label: 'What Is a Near Miss?' },
  { id: 'why-report', label: 'Why Report Near Misses?' },
  { id: 'reporting-process', label: 'The Reporting Process' },
  { id: 'learning-from-near-misses', label: 'Learning from Near Misses' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'building-reporting-culture', label: 'Building a Reporting Culture' },
  { id: 'common-near-misses', label: 'Common Near Misses for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A near miss is any unplanned event that did not result in injury, illness, or damage but had the potential to do so — it is a free warning that something needs to change.',
  'For every serious workplace injury, research shows there are approximately 300 near misses — capturing and acting on these near misses prevents the serious incident from happening.',
  'Near miss reporting is not a legal requirement in itself, but failing to act on known hazards is a breach of the Health and Safety at Work Act 1974 and can result in prosecution.',
  'A no-blame reporting culture is essential — if workers fear punishment for reporting, they will stop reporting and the hazards will remain hidden until someone gets hurt.',
  'Elec-Mate lets you report near misses directly from your phone on site, with photos, location data, and AI-assisted hazard classification.',
];

const faqs = [
  {
    question: 'What counts as a near miss in electrical work?',
    answer:
      'A near miss in electrical work is any unplanned event that could have resulted in injury or damage but did not. Common examples include: receiving a minor electric shock from a circuit that should have been isolated; discovering that a circuit was still live after lock-off (indicating a labelling or identification error); a cable being struck by a nail gun or screw during installation; a ladder slipping while working at a distribution board; dropping a tool from height that narrowly misses someone below; discovering damaged cable insulation that could have caused a fault; an RCD tripping during testing indicating an underlying fault; and noticing exposed live conductors that have not been made safe. The defining characteristic is that the event had the potential to cause harm — it was only luck, timing, or circumstance that prevented an actual injury.',
  },
  {
    question: 'Is near miss reporting a legal requirement?',
    answer:
      'Near miss reporting itself is not a standalone legal requirement, but the duty to manage risks is. Under the Health and Safety at Work Act 1974 (Section 2), employers have a duty to ensure, so far as is reasonably practicable, the health and safety of their employees. Under the Management of Health and Safety at Work Regulations 1999 (Regulation 3), employers must carry out a suitable and sufficient risk assessment. If a near miss event reveals a hazard that was not addressed in the risk assessment, the employer must update the assessment and implement additional controls. Certain dangerous occurrences (which are effectively near misses with high potential consequences) must be reported to the HSE under RIDDOR — for example, electrical short circuits attended by fire or explosion, even if no one was injured. In practical terms, a robust near miss reporting system is one of the strongest indicators that a contractor is managing health and safety proactively rather than reactively.',
  },
  {
    question: 'How do I encourage workers to report near misses?',
    answer:
      'The single most important factor is a no-blame culture. If workers believe they will be disciplined, ridiculed, or penalised for reporting a near miss, they will not report. To build a reporting culture: (1) Make it clear from day one (during site induction) that near miss reporting is expected and valued. (2) Respond positively to every report — thank the person, investigate the hazard, and take visible action. (3) Share the outcomes — let everyone see that near miss reports lead to real changes (new controls, additional training, equipment replacement). (4) Lead by example — supervisors and managers should report their own near misses. (5) Make it easy — use a simple form, an app on their phone, or even a verbal report to the supervisor. (6) Recognise and reward active reporters — not with cash incentives (which can lead to frivolous reports) but with genuine acknowledgement. (7) Never, under any circumstances, use a near miss report as grounds for disciplinary action against the reporter.',
  },
  {
    question: 'What is the difference between a near miss and an accident?',
    answer:
      'The only difference is the outcome. A near miss is an event that had the potential to cause injury, illness, or damage but did not — the hazard was present, the exposure occurred, but luck or circumstance meant no harm resulted. An accident is the same event but with a different outcome — someone was injured or something was damaged. The underlying hazard, the failure in controls, and the root cause are identical. This is why near misses are so valuable — they reveal the same weaknesses in your safety systems as accidents do, but without the human cost. The Heinrich Triangle (or Bird Triangle) model suggests that for every 1 serious injury, there are 10 minor injuries, 30 property damage incidents, and 300 near misses. By capturing and acting on the 300 near misses, you prevent the 1 serious injury.',
  },
  {
    question: 'What should a near miss report include?',
    answer:
      'A near miss report should include: the date, time, and exact location of the event; the name of the person reporting (or "anonymous" if the system allows this); a description of what happened — what was the person doing, what went wrong, what could have happened; the immediate cause (the direct event or condition that created the hazard — for example, "circuit not isolated" or "cable damaged by screw"); the underlying cause (the systemic failure — for example, "circuit labelling incorrect on DB" or "no cable route survey carried out"); any photos or evidence; what immediate action was taken (for example, "circuit isolated and labelled" or "damaged cable replaced"); and recommendations for preventing a recurrence. The report should be reviewed by the site supervisor or safety manager, and the findings should be shared with the team — ideally through a toolbox talk.',
  },
  {
    question: 'Can a near miss be reported anonymously?',
    answer:
      'Yes, and in many cases anonymous reporting is encouraged, especially when first establishing a near miss reporting culture. Workers who are reluctant to put their name to a report for fear of reprisal or embarrassment are more likely to report if they can do so anonymously. However, anonymous reporting has limitations — you cannot follow up with the reporter for additional details, and you cannot acknowledge them publicly. The goal should be to create a culture where anonymous reporting is available but rarely needed because workers trust that reports will be received positively. Some companies use a dual system: a named reporting route for day-to-day events and an anonymous route (such as a dedicated email address, a physical suggestion box, or an anonymous form) for sensitive issues.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/first-aid-electrical-shock',
    title: 'First Aid for Electrical Shock',
    description:
      'Emergency response when a near miss becomes an actual incident — know what to do.',
    icon: Heart,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'Near miss data feeds directly into your risk assessments — improving them with real-world evidence.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/toolbox-talks-electrical',
    title: 'Toolbox Talks for Electricians',
    description:
      'Near miss incidents are excellent material for toolbox talks — share lessons learned with the team.',
    icon: Megaphone,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'The most common near miss for electricians is a failed isolation — get the procedure right every time.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-on-site',
    title: 'Electrical Safety on Site',
    description: 'Complete guide to managing electrical risks on construction sites.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/construction-site-electrical-safety',
    title: 'Construction Site Electrical Safety',
    description:
      'CDM duties, cable avoidance, overhead lines, and construction-specific electrical risks.',
    icon: HardHat,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-near-miss',
    heading: 'What Is a Near Miss?',
    content: (
      <>
        <p>
          A near miss is any unplanned event that did not result in injury, illness, or damage but
          had the potential to do so. The hazard was present, the exposure happened, but the outcome
          was fortunate — this time.
        </p>
        <p>
          For electricians, near misses happen more often than most people admit. You reach into a
          junction box and get a tingle from a conductor that should have been dead. A cable you
          installed yesterday gets a screw through it during the plasterboarding. Your ladder slips
          while you are reaching up to a distribution board. A tool falls off a scaffold and lands
          where someone was standing 30 seconds ago.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A near miss is a free warning.</strong> It tells you that a hazard exists,
                that your controls failed (or were not in place), and that the next time the outcome
                might be different.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The only difference between a near miss and an accident is luck.</strong>{' '}
                The hazard, the failure, and the root cause are the same. Only the outcome is
                different.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Near misses vastly outnumber actual incidents.</strong> Research
                consistently shows that for every serious injury, there are hundreds of near misses.
                Capturing and acting on these near misses is how you prevent the serious injury.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'why-report',
    heading: 'Why Report Near Misses? The Safety Case',
    content: (
      <>
        <p>
          The instinct after a near miss is to feel relieved, shrug it off, and get back to work.
          "Nothing happened, no harm done." This is exactly the wrong response. Every unreported
          near miss is a missed opportunity to prevent a future injury.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The Heinrich Triangle:</strong> Herbert Heinrich's research (later refined
                by Frank Bird) found that for every 1 serious injury, there are approximately 10
                minor injuries, 30 property damage incidents, and 300 near misses. The near misses
                are the base of the pyramid — they are the early warning signals that, if acted
                upon, prevent the serious injury at the top.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identifies hidden hazards:</strong> Near misses reveal hazards that were not
                identified in the original{' '}
                <SEOInternalLink href="/guides/risk-assessment-electricians">
                  risk assessment
                </SEOInternalLink>
                . A near miss involving a mislabelled circuit tells you the labelling system needs
                improving. A near miss with a damaged cable tells you the cable route protection
                needs reviewing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Improves controls:</strong> Every near miss report should lead to an action
                — additional signage, a revised procedure, better PPE, additional training, a{' '}
                <SEOInternalLink href="/guides/toolbox-talks-electrical">
                  toolbox talk
                </SEOInternalLink>
                . These incremental improvements compound over time to create a genuinely safer
                working environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demonstrates proactive safety management:</strong> A high near miss
                reporting rate is a positive indicator — it means your team is actively looking for
                and reporting hazards. A low near miss reporting rate with a high accident rate is a
                red flag that suggests hazards are being ignored.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reporting-process',
    heading: 'The Near Miss Reporting Process',
    content: (
      <>
        <p>
          The reporting process should be simple enough that workers will actually use it. If it
          takes 20 minutes to fill in a form, people will not bother. If it takes 2 minutes on their
          phone, they will.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Capture the event immediately.</strong> As soon as a near miss occurs, record
              what happened while the details are fresh. Use your phone — take a photo of the
              hazard, note the location, and describe what happened in a few sentences.
            </li>
            <li>
              <strong>Take immediate action.</strong> If the hazard poses a continuing risk, make it
              safe before writing the report. Isolate the circuit, cordon the area, remove the
              damaged equipment — whatever is needed to prevent the near miss from becoming an
              actual incident.
            </li>
            <li>
              <strong>Submit the report.</strong> Use the site's near miss reporting system — this
              could be a paper form, an online portal, or an app. Include: what happened, where,
              when, what could have happened, and what immediate action was taken.
            </li>
            <li>
              <strong>Investigation.</strong> The supervisor or safety manager reviews the report,
              investigates the root cause, and determines what corrective action is needed. This
              should happen within 24 to 48 hours.
            </li>
            <li>
              <strong>Corrective action.</strong> Implement the corrective action — update the risk
              assessment, issue new procedures, provide additional training, replace equipment, or
              modify the work method.
            </li>
            <li>
              <strong>Feedback.</strong> Tell the reporter (and the wider team) what action was
              taken. This closes the loop and demonstrates that reporting leads to real change.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Report near misses from your phone in seconds"
          description="Elec-Mate lets you report near misses directly from the site — capture a photo, describe what happened, and the AI Health and Safety agent classifies the hazard and suggests corrective actions. No paper forms, no waiting until you get back to the office."
          icon={AlertTriangle}
        />
      </>
    ),
  },
  {
    id: 'learning-from-near-misses',
    heading: 'Learning from Near Misses: Root Cause Analysis',
    content: (
      <>
        <p>
          The value of a near miss report lies not in the report itself but in what you learn from
          it. A superficial investigation that concludes "worker error" misses the point entirely.
          Root cause analysis asks "why" until you reach the systemic failure that allowed the event
          to occur.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4 text-white">
            <p className="font-bold">Example: Near miss — shock from "isolated" circuit</p>
            <ul className="space-y-2 ml-4">
              <li>
                <strong>What happened?</strong> Electrician received a minor shock from a conductor
                in a junction box that should have been isolated.
              </li>
              <li>
                <strong>Why?</strong> The circuit was still live.
              </li>
              <li>
                <strong>Why?</strong> The wrong circuit breaker was switched off at the distribution
                board.
              </li>
              <li>
                <strong>Why?</strong> The circuit labelling on the DB schedule was incorrect —
                circuit 5 was labelled as "Kitchen sockets" but actually supplied the utility room
                where the work was being done.
              </li>
              <li>
                <strong>Why?</strong> The DB schedule had not been updated after a modification was
                made 3 years ago.
              </li>
              <li>
                <strong>Root cause:</strong> No procedure for updating DB schedules after
                modifications. The{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                was not fully followed — the electrician did not prove dead at the point of work.
              </li>
            </ul>
          </div>
        </div>
        <p>
          Two corrective actions emerge from this analysis: (1) implement a procedure requiring DB
          schedules to be updated after every modification, and (2) reinforce the safe isolation
          procedure through a{' '}
          <SEOInternalLink href="/guides/toolbox-talks-electrical">toolbox talk</SEOInternalLink>,
          emphasising the requirement to prove dead at the point of work, not just at the DB.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements Around Near Miss Reporting',
    content: (
      <>
        <p>
          While near miss reporting itself is not a standalone legal requirement, the duties it
          supports are embedded in UK health and safety law:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974:</strong> Section 2 requires employers to
                ensure, so far as is reasonably practicable, the health and safety of their
                employees. If a near miss reveals a known hazard that is not being managed, the
                employer has a duty to act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Management of Health and Safety at Work Regulations 1999:</strong>{' '}
                Regulation 3 requires employers to carry out a suitable and sufficient risk
                assessment. Near miss data provides real-world evidence that should be used to
                update and improve risk assessments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RIDDOR 2013:</strong> Certain dangerous occurrences — which are effectively
                serious near misses — must be reported to the HSE. These include electrical short
                circuits attended by fire or explosion, collapse of scaffolding, and structural
                collapses. See our{' '}
                <SEOInternalLink href="/guides/first-aid-electrical-shock">
                  first aid guide
                </SEOInternalLink>{' '}
                for full RIDDOR details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CDM 2015:</strong> The principal contractor must ensure that health and
                safety risks are managed throughout the project. A robust near miss reporting system
                is evidence of effective risk management.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In an HSE investigation, the absence of a near miss reporting system — or evidence that
          near misses were reported but not acted upon — can be used as evidence of a failure to
          manage risks. Conversely, a well-maintained near miss register with documented corrective
          actions is strong evidence of proactive safety management.
        </p>
      </>
    ),
  },
  {
    id: 'building-reporting-culture',
    heading: 'Building a Near Miss Reporting Culture',
    content: (
      <>
        <p>
          The biggest barrier to near miss reporting is not the process — it is the culture. If
          workers believe that reporting a near miss will lead to blame, discipline, or ridicule,
          they will not report. The near misses will continue to happen, unrecorded and unaddressed,
          until one of them results in a serious injury.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No-blame policy:</strong> Make it explicit — in writing, during inductions,
                and in every toolbox talk — that near miss reporting is expected and will never
                result in disciplinary action against the reporter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond to every report:</strong> Acknowledge the report promptly, thank the
                reporter, investigate the hazard, and take visible action. If the team sees that
                reporting leads to real improvements, they will keep reporting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Share the outcomes:</strong> Use{' '}
                <SEOInternalLink href="/guides/toolbox-talks-electrical">
                  toolbox talks
                </SEOInternalLink>{' '}
                to share near miss reports (anonymised if preferred) and the corrective actions
                taken. This demonstrates the value of reporting and reminds the team that safety is
                everyone's responsibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead by example:</strong> Supervisors and managers should report their own
                near misses. This sends a powerful message that near miss reporting is not just for
                apprentices and labourers — it is for everyone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Make it easy:</strong> The reporting process should take less than 2
                minutes. A phone app, a simple form, or even a verbal report to the supervisor is
                better than a complex multi-page document that nobody fills in.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Digital near miss reporting and risk assessment tools"
          description="Elec-Mate's AI Health and Safety agent helps you capture near misses, generate risk assessments, and create RAMS documents — all from your phone. Build a culture of safety reporting without the paperwork burden."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'common-near-misses',
    heading: 'Common Near Misses for Electricians',
    content: (
      <>
        <p>
          The following near miss scenarios are among the most commonly reported by electricians on
          UK construction sites. Each one represents a genuine hazard that, under slightly different
          circumstances, could result in serious injury:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Electric Shock from "Isolated" Circuit
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The most dangerous near miss. An electrician receives a tingle or minor shock from
                  a circuit that was believed to be dead. Causes include incorrect DB labelling,
                  wrong circuit isolated, borrowed neutrals, and failure to prove dead at the point
                  of work. Every one of these near misses is a potential fatality.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Damage by Other Trades</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables installed by the electrician are damaged by screws, nails, or fixings
                  driven in by plumbers, plasterers, or carpenters who are unaware of the cable
                  route. This can create a live exposed conductor hidden behind a wall. Prevention:
                  cable route marking, safe zones, and communication between trades.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <HardHat className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Falls from Ladders and Steps</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working on distribution boards, pulling cable at height, and accessing ceiling
                  voids all involve working at height. Ladder slips, stepladder collapses, and
                  overreaching from platforms are common near misses. Prevention: proper ladder
                  inspections, three points of contact, and using appropriate access equipment for
                  the task.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Dropped Tools and Materials</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tools, cable offcuts, and fittings dropped from height are a constant near miss on
                  construction sites. A 500g pair of pliers dropped from 3 metres can cause a
                  serious head injury. Prevention: tool lanyards, toe boards on scaffolds, exclusion
                  zones below work areas, and tidy working practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NearMissReportingPage() {
  return (
    <GuideTemplate
      title="Near Miss Reporting | Why It Matters for Electricians"
      description="Complete guide to near miss reporting for UK electricians. What counts as a near miss, the reporting process, learning from near misses, legal requirements, and how to build a reporting culture on site."
      datePublished="2025-08-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Near Miss Reporting:{' '}
          <span className="text-yellow-400">Why Every Unreported Near Miss Is a Ticking Clock</span>
        </>
      }
      heroSubtitle="For every serious workplace injury, there are 300 near misses that nobody reported. Each one is a free warning — a chance to fix the hazard before someone gets hurt. This guide explains what counts as a near miss, how to report effectively, and how to build a culture where reporting is the norm."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Near Miss Reporting"
      relatedPages={relatedPages}
      ctaHeading="Safety Reporting Tools for Site Electricians"
      ctaSubheading="Report near misses, generate risk assessments, create RAMS and method statements with AI. Access training courses for first aid, manual handling, and working at height. 7-day free trial."
    />
  );
}
