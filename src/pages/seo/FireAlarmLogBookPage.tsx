/**
 * SEO guide: Fire Alarm Log Book (BS 5839-1:2025).
 *
 * Targets "fire alarm log book" / "fire alarm log book template PDF" /
 * "digital fire alarm log book" searches. Every regulatory claim on this page
 * is grounded in BS 5839-1:2025 via the FIA guide to the 2025 changes —
 * clause 48.2 digital log books, Annex H model format, Annex F false alarm
 * rate, the 5-7 month service window, and recording of ALL variations.
 */
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { BookOpen } from 'lucide-react';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Fire Alarm Log Book', href: '/guides/fire-alarm-log-book' },
];

const tocItems = [
  { id: 'what-is-it', label: 'What Is a Fire Alarm Log Book?' },
  { id: 'digital-2025', label: 'Digital Log Books Under the 2025 Standard' },
  { id: 'what-to-record', label: 'What Must Be Recorded' },
  { id: 'weekly-test', label: 'The Weekly Call Point Test' },
  { id: 'false-alarms', label: 'False Alarms and the Annex F Rate' },
  { id: 'servicing', label: 'Service Visits and Intervals' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every fire detection and alarm system under BS 5839-1 needs a log book — the ongoing record of tests, faults, false alarms, services and variations, kept where the fire authority or a risk assessor can inspect it.',
  'BS 5839-1:2025 clause 48.2 explicitly permits the log book to be kept digitally, and Annex H gives the model format the record should follow.',
  'A different manual call point must be tested each week, rotating so every call point is tested at least once every 12 months.',
  'The 2025 edition adds a false alarm rate calculation (Annex F): more than 4 false alarms per 100 automatic detectors per year triggers a preliminary investigation.',
  'Service visits should happen at intervals of approximately 6 months — the 2025 edition allows a 5 to 7 month window, measured from the date of acceptance.',
];

const sections = [
  {
    id: 'what-is-it',
    heading: 'What Is a Fire Alarm Log Book?',
    content: (
      <>
        <p>
          The fire alarm log book is the living record of a fire detection and alarm system — the
          document that proves the system is being tested weekly, serviced on schedule, and that
          faults and false alarms are being dealt with. BS 5839-1 expects one to be kept for every
          system, maintained by a responsible person at the premises, and available to the fire and
          rescue authority, fire risk assessors, and the servicing contractor.
        </p>
        <p>
          Traditionally it's the dog-eared A4 book hanging by the panel: pages of handwritten weekly
          tests, gaps where somebody forgot, and no way of knowing whether the call point rotation
          actually covered the whole building. When a fire risk assessor asks for the record, the
          gaps become findings.
        </p>
        <p>
          The log book is separate from fire alarm certificates. A certificate (design,
          installation, commissioning, or periodic inspection) is issued once by a competent person
          to record a specific piece of work. The log book is continuous — it carries on between
          certificates and ties them together.
        </p>
      </>
    ),
  },
  {
    id: 'digital-2025',
    heading: 'Digital Log Books Under BS 5839-1:2025',
    content: (
      <>
        <p>
          The 2025 edition of BS 5839-1 settled the question of whether the log book has to be
          paper: clause 48.2 explicitly permits the record to be kept digitally. Annex H — the model
          format for the log book — was updated in the same revision to reflect the information
          clause 48 requires.
        </p>
        <p>
          The 2025 edition also tightened what goes in it. Under the 2017 edition only "major"
          agreed variations needed recording, with no definition of major. The 2025 edition requires{' '}
          <strong>all agreed variations</strong> to be recorded in the system log book.
        </p>
        <p>
          A digital log book that follows the Annex H model is acceptable to fire risk assessors and
          the fire authority in the same way the paper book is — and it can do things paper cannot:
          suggest the next call point in the rotation, chase the weekly test when it's missed,
          calculate the false alarm rate automatically, and export the whole record as a PDF when
          someone asks for it.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-record',
    heading: 'What Must Be Recorded in the Log Book',
    content: (
      <>
        <p>
          Following the Annex H model, the log book should carry the system particulars up front —
          premises, system category, control panel details, the responsible person, the servicing
          organisation and contract details, and references to the installation and commissioning
          certificates. The ongoing record then covers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2 text-white">
            <li>Weekly call point tests — date, call point tested, result, who tested it</li>
            <li>Faults — description, cause, remedial action, and when they were resolved</li>
            <li>False alarms — date, zone, cause and category, action taken</li>
            <li>Fires the system responded to, and fire drills</li>
            <li>Service and maintenance visits — who, what was done, next visit due</li>
            <li>Battery replacements and panel events</li>
            <li>All agreed variations from the standard (a 2025 requirement)</li>
          </ul>
        </div>
        <p>
          The record needs to be honest and continuous. An assessor reading it should be able to see
          at a glance whether the weekly test happens, whether every call point gets covered across
          the year, and whether faults get fixed or linger.
        </p>
      </>
    ),
  },
  {
    id: 'weekly-test',
    heading: 'The Weekly Call Point Test',
    content: (
      <>
        <p>
          BS 5839-1 requires the system to be tested weekly by operating a manual call point —
          during normal working hours, at roughly the same time each week, so occupants learn what
          the alarm sounds like and know when a test is a test.
        </p>
        <p>
          Crucially, it should be a <strong>different call point each week</strong>, rotating
          through the building so that every call point is tested at least once every 12 months. On
          paper, keeping that rotation straight is the part everyone gets wrong — which call point
          was last week? Was CP 7 done this quarter? A digital log tracks the rotation for you and
          simply names the next one.
        </p>
        <p>
          The test itself: operate the call point with the test key, confirm the sounders operate
          and the panel shows the correct zone, then reset. If the premises has an alarm receiving
          centre (ARC) connection, notify them before and after so the test doesn't summon the fire
          service.
        </p>
      </>
    ),
  },
  {
    id: 'false-alarms',
    heading: 'False Alarms and the Annex F Rate',
    content: (
      <>
        <p>
          Every false alarm should be recorded with its cause and category, and the 2025 edition
          recommends every false alarm is investigated. The recognised categories are unwanted
          alarms (equipment), good intent, malicious, and accidental damage.
        </p>
        <p>
          New in the 2025 edition, Annex F provides the false alarm rate calculation: the number of
          false alarms per 100 automatic detectors per year. If the rate over the previous 12 months
          exceeds <strong>4 per 100 detectors</strong>, a preliminary investigation should be
          arranged; for systems with more than 40 detectors, an average above 5 per 100 calls for an
          in-depth investigation.
        </p>
        <p>
          That calculation only works if false alarms are actually logged — another reason the log
          book matters. A digital log with the detector count recorded can compute the rate
          continuously and flag the moment the trigger is crossed.
        </p>
      </>
    ),
  },
  {
    id: 'servicing',
    heading: 'Service Visits and Intervals',
    content: (
      <>
        <p>
          The system should be inspected and serviced by a competent person at intervals of
          approximately six months. The 2025 edition aligned this with real-world practice: a visit
          any time between <strong>5 and 7 months</strong> after the previous one is acceptable,
          with the date of acceptance as the datum for the schedule.
        </p>
        <p>
          Each visit goes in the log book — who attended, what was done, the outcome, and when the
          next visit falls due. The service history in the log book is also what a periodic
          inspection certificate (the G6) should reference: what maintenance has been carried out
          since the last inspection.
        </p>
        <p>
          Elec-Mate connects the two automatically: if a building's log book is kept in the app, the
          G6 periodic certificate pulls the false alarm history and service visits straight into the
          certificate, and the completed inspection writes itself back into the log book as a
          service entry.
        </p>
      </>
    ),
  },
];

const faqs = [
  {
    question: 'Is a digital fire alarm log book legal in the UK?',
    answer:
      'Yes. BS 5839-1:2025 clause 48.2 explicitly permits the log book to be kept digitally, and Annex H provides the model format the record should follow. A digital log presented in that format is acceptable to fire risk assessors and the fire and rescue authority in the same way as the paper book.',
  },
  {
    question: 'Who is responsible for keeping the fire alarm log book?',
    answer:
      'A responsible person at the premises — usually a member of premises management — should maintain the log book and ensure every entry is properly recorded. The servicing contractor records their visits in it, but the weekly testing record is the premises’ responsibility under the Regulatory Reform (Fire Safety) Order 2005.',
  },
  {
    question: 'How often should a fire alarm be tested?',
    answer:
      'Weekly, by operating a manual call point — a different one each week so every call point is tested at least once every 12 months. The system should also be inspected and serviced by a competent person approximately every six months (a 5 to 7 month window under BS 5839-1:2025).',
  },
  {
    question: 'What counts as too many false alarms?',
    answer:
      'BS 5839-1:2025 Annex F sets the trigger at more than 4 false alarms per 100 automatic detectors per year, at which point a preliminary investigation should be arranged. Systems with over 40 detectors averaging more than 5 per 100 warrant an in-depth investigation.',
  },
  {
    question: 'What happens if the log book has gaps?',
    answer:
      'Gaps in the weekly testing record are one of the most common findings in fire risk assessments, and they undermine the responsible person’s evidence of compliance under the Fire Safety Order. A digital log book helps close the gaps with reminders on test day and a rotation that tracks itself.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    title: 'BS 5839 Fire Alarm Standard',
    description: 'Parts 1 and 6, system categories and grades explained',
    href: '/guides/bs-5839-fire-alarm-standard',
  },
  {
    title: 'Smoke Alarm Regulations',
    description: 'Domestic smoke and CO alarm requirements across the UK',
    href: '/guides/smoke-alarm-regulations-uk',
  },
  {
    title: 'Fire Alarm Certificates',
    description: 'Design, commissioning, periodic inspection and modification certificates',
    href: '/electrician/inspection-testing',
  },
];

export default function FireAlarmLogBookPage() {
  return (
    <GuideTemplate
      title="Fire Alarm Log Book — BS 5839-1:2025 Requirements & Digital Logs"
      description="What the fire alarm log book must record under BS 5839-1:2025: weekly call point tests, false alarms, service visits and variations — and why clause 48.2 now permits keeping it digitally."
      datePublished="2026-07-27"
      dateModified="2026-07-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fire Safety"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Fire Alarm Log Book: <span className="text-yellow-400">BS 5839-1:2025</span> Requirements
        </>
      }
      heroSubtitle="The log book is the living proof a fire alarm system is tested and maintained — and since the 2025 edition, it no longer has to be a paper book by the panel."
      readingTime={8}
      answerBox={{
        question: 'Can a fire alarm log book be kept digitally?',
        answer:
          'Yes — BS 5839-1:2025 clause 48.2 explicitly permits a digital log book, following the Annex H model format. It must record weekly call point tests, faults, false alarms with causes, service visits, fire events and drills, and all agreed variations.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Keep the log book that keeps itself"
      ctaSubheading="Elec-Mate's digital fire alarm log book tracks the weekly rotation, computes the Annex F false alarm rate, reminds you on test day, and exports the Annex H PDF in one tap."
    />
  );
}
