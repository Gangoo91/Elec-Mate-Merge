import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Lightbulb,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'Emergency Lighting Testing', href: '/emergency-lighting-testing' },
];

const tocItems = [
  { id: 'legal-requirement', label: 'Legal Requirement' },
  { id: 'monthly-test', label: 'Monthly Function Test' },
  { id: 'annual-test', label: 'Annual Full-Duration Test' },
  { id: 'six-monthly-test', label: 'Six-Monthly Intermediate Test' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'luminaire-failure', label: 'What to Do if a Luminaire Fails' },
  { id: 'competent-person', label: 'Competent Person Requirements' },
  { id: 'automatic-test-systems', label: 'Automatic Test Systems' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Emergency lighting testing is a legal requirement under BS 5266-1 and the Regulatory Reform (Fire Safety) Order 2005. The responsible person for any non-domestic premises with emergency lighting must ensure a structured testing programme is in place.',
  'Monthly function tests require simulating a mains failure (typically for 1 minute using a test key or inhibit switch) to confirm every luminaire illuminates. Results must be recorded immediately.',
  'Annual full-rated-duration tests require discharging batteries to their full rated duration — 1, 2, or 3 hours depending on the fitting. The test must be performed when the building is unoccupied.',
  'All test results — including the date, duration, luminaires tested, any failures, and the name of the person conducting the test — must be recorded in a BS 5266-1 compliant log book kept on the premises.',
  'Any luminaire that fails a test must be repaired or replaced promptly. A failed luminaire on an escape route constitutes a breach of fire safety obligations under the Fire Safety Order.',
];

const faqs = [
  {
    question: 'How often must emergency lighting be tested in the UK?',
    answer:
      'Under BS 5266-1, emergency lighting must be subject to a monthly function test and an annual full-rated-duration discharge test. The monthly test involves simulating mains failure for a short period (typically 1 minute) to confirm each luminaire illuminates. The annual test discharges the batteries to their full rated duration — 1 hour, 2 hours, or 3 hours depending on the fitting. All results must be recorded in a log book kept on the premises.',
  },
  {
    question: 'Who is responsible for testing emergency lighting?',
    answer:
      'The responsible person under the Regulatory Reform (Fire Safety) Order 2005 is legally responsible for ensuring emergency lighting is tested and maintained. In most cases this is the employer, building owner, or managing agent. Monthly function tests are often delegated to a member of staff who has been trained in the procedure. Annual full-duration tests should be carried out by a competent electrician familiar with BS 5266-1.',
  },
  {
    question: 'What is the "flick test" for emergency lighting?',
    answer:
      'The flick test (or monthly function test) is performed by operating the emergency lighting test key or inhibit switch to simulate a mains failure, then checking that every emergency luminaire illuminates. The test should last approximately 1 minute — long enough to confirm illumination but short enough not to significantly discharge the battery. Where a test key is not fitted, the supply circuit breaker can be operated, though this disrupts other circuits and is less ideal.',
  },
  {
    question: 'What happens during an annual emergency lighting test?',
    answer:
      'The annual test requires the emergency lighting system to be discharged for its full rated duration — typically 3 hours for most commercial premises. During this period, normal lighting in the area must be off to simulate actual emergency conditions, and every luminaire must remain fully illuminated throughout. After the test, the batteries must be given sufficient time to recharge (typically 24 hours) before the building is re-occupied overnight. Results, including any failures, must be logged.',
  },
  {
    question: 'What should I record in the emergency lighting log book?',
    answer:
      'The BS 5266-1 log book must record: the date of each test; the type of test (monthly function, annual duration, or intermediate); the names and reference numbers of all luminaires tested; the duration of the test; any luminaires that failed to illuminate or failed before the end of the duration; the name and signature of the person conducting the test; and any remedial action taken following a failure. The log book must be kept on the premises and be available for inspection.',
  },
  {
    question: 'What should I do if an emergency luminaire fails its test?',
    answer:
      'A failed luminaire must be reported immediately to the responsible person and recorded in the log book. If the failed luminaire is on an escape route or covers a mandatory emergency lighting location, it must be repaired or replaced as a matter of urgency — ideally the same day. Until the luminaire is replaced, the responsible person may need to implement compensatory measures such as portable lighting or restricted building occupancy. All remedial action taken must be recorded in the log book.',
  },
  {
    question: 'Can automatic test systems replace manual monthly and annual tests?',
    answer:
      'Yes. BS 5266-1 recognises automatic test systems as an acceptable means of satisfying the testing requirements. Addressable emergency luminaires with built-in test circuitry can perform function and duration tests automatically and report results to a central monitoring panel. The panel logs all test results electronically, which satisfies the record-keeping requirement. However, the results must still be reviewed by the responsible person and any failures must be actioned promptly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/emergency-lighting-installation',
    title: 'Emergency Lighting Installation',
    description: 'BS 5266 design requirements, lux levels, and system types for new installations.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/fire-alarm-installation',
    title: 'Fire Alarm Installation',
    description: 'BS 5839 fire alarm systems — categories, wiring, and certification.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'Electrical Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the IET Wiring Regulations 18th Edition.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'legal-requirement',
    heading: 'Legal Requirement for Emergency Lighting Testing',
    content: (
      <>
        <p>
          Emergency lighting testing is not optional — it is a legal requirement for every
          non-domestic premises with an emergency lighting installation. The legal obligations
          come from two sources:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — Article 17 requires
                the responsible person to ensure fire safety equipment, including emergency lighting,
                is maintained in efficient working order and good repair. Article 13 requires
                adequate emergency routes and exits to be equipped with emergency lighting. Failure
                to comply is a criminal offence carrying unlimited fines and up to two years'
                imprisonment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266-1:2016</strong> — defines the specific testing regime: monthly
                function tests, annual full-duration tests, and the record-keeping requirements.
                Compliance with BS 5266-1 is the accepted means of demonstrating compliance with
                the Fire Safety Order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations</strong> — Approved Document B (Fire Safety) requires
                emergency lighting in specified locations. The testing obligations under BS 5266-1
                apply from the date of commissioning.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The responsible person is typically the employer, building owner, managing agent, or
          the person who has control of the premises. In multi-occupancy buildings, responsibility
          for communal areas usually falls on the building owner or managing agent.
        </p>
      </>
    ),
  },
  {
    id: 'monthly-test',
    heading: 'Monthly Function Test (The "Flick Test")',
    content: (
      <>
        <p>
          The monthly function test — often called the flick test — must be performed every month
          without fail. Its purpose is to confirm that every emergency luminaire illuminates on
          simulated mains failure. The test is brief by design: long enough to confirm illumination
          but short enough not to significantly discharge the battery.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Use the test key or inhibit switch</strong> — most modern
                self-contained luminaires have a keyswitch or push-button that simulates mains
                failure without operating the main circuit breaker. This is the preferred method
                as it does not disrupt other equipment or normal lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Duration approximately 1 minute</strong> — hold the test for
                long enough to confirm every luminaire illuminates. Walk the escape route and
                check each fitting is lit. For large premises, a second person may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Restore normal supply</strong> — release the test key or inhibit
                switch to restore normal mains supply. The batteries will begin recharging
                immediately. Do not perform the test when the building is to be vacated overnight
                unless you are confident the batteries have adequate residual charge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Record results immediately</strong> — note the date, result
                (pass or fail for each luminaire), and your name in the BS 5266-1 log book.
                Any failed luminaires must be listed by reference number and location.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Monthly tests are commonly performed by a trained member of staff rather than an
          electrician. However, the responsible person must ensure the person conducting the test
          understands what to look for and knows how to record results correctly.
        </p>
      </>
    ),
  },
  {
    id: 'annual-test',
    heading: 'Annual Full-Duration Discharge Test',
    content: (
      <>
        <p>
          The annual test is the most thorough and demanding test in the BS 5266-1 testing
          programme. It requires the emergency lighting system to operate continuously under
          simulated emergency conditions for its full rated duration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test duration</strong> — the test must run for the full rated duration
                of the fittings: 1 hour, 2 hours, or 3 hours. Installations with mixed duration
                ratings require each group to be tested for its own rated duration. Most commercial
                premises specify 3-hour rated fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building must be unoccupied</strong> — the normal lighting must be
                switched off to simulate true emergency conditions. This makes the emergency
                lighting the only source of illumination. The test must be performed out of
                hours when the premises are empty. For 3-hour fittings, start no later than
                3 hours before any scheduled overnight occupation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All luminaires must remain illuminated</strong> — any luminaire that
                fails or extinguishes before the end of the rated duration fails the test.
                Walk the full escape route at regular intervals during the test to identify
                early failures. Note the time of any failure, not just that a failure occurred.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recharge time</strong> — after the full-duration test, batteries require
                a minimum recharge period before returning to full capacity. For most
                self-contained fittings this is 24 hours. Until fully recharged, the emergency
                lighting system is degraded. Do not perform the annual test the night before
                a period of extended overnight occupancy.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'six-monthly-test',
    heading: 'Six-Monthly Intermediate Tests',
    content: (
      <>
        <p>
          BS 5266-1 recognises that for some premises — particularly those with 24-hour occupancy
          such as hospitals, care homes, and hotels — performing an annual full-duration test is
          impractical or presents an unacceptable safety risk during the recharge period.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Half-duration test</strong> — where a full-duration test cannot be
                carried out, BS 5266-1 permits a test of half the rated duration every six
                months (e.g., 1.5 hours for a 3-hour system). This is not a substitute for
                the full-duration test — it is an interim measure where full testing is
                genuinely impractical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full test every three years minimum</strong> — even where six-monthly
                half-duration tests are performed, a full-duration test must be carried out
                at least every three years to confirm the batteries can genuinely sustain the
                full rated duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic test systems</strong> — addressable emergency lighting systems
                with built-in test functionality can perform full-duration tests during low-risk
                periods (e.g., 4 AM on a Sunday) automatically, removing the practical difficulty.
                For continuously occupied premises, automatic systems are strongly recommended.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording Results: The BS 5266-1 Log Book',
    content: (
      <>
        <p>
          The log book is the legal record of emergency lighting testing. It must be kept on the
          premises, be readily available for inspection by the fire authority, and be maintained
          for the life of the installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to record</strong> — date and time of test; type of test (monthly
                function / annual duration / intermediate); test duration; reference numbers and
                locations of all luminaires tested; pass/fail result for each luminaire; the time
                of any failure during a duration test; name and signature of the person conducting
                the test; any remedial action taken.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Log book format</strong> — BS 5266-1 does not prescribe a specific log
                book format, but pre-printed log books aligned with the standard are available
                from electrical wholesalers and industry bodies. Digital records are acceptable
                provided they are backed up and accessible on the premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning certificate</strong> — the BS 5266-1 Completion Certificate
                issued at installation must be stored alongside the log book. This confirms the
                system was installed in accordance with the standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire authority inspection</strong> — fire safety officers from the local
                fire and rescue service may inspect the premises at any time. The log book is one
                of the first documents they will request. An incomplete or missing log book is
                strong evidence of non-compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'luminaire-failure',
    heading: 'What to Do if a Luminaire Fails',
    content: (
      <>
        <p>
          Luminaire failures are not unusual — batteries degrade over 4–7 years, lamps fail, and
          electronic control gear develops faults. The important thing is how quickly failures are
          identified and rectified.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the failure immediately</strong> — note the luminaire reference,
                location, and the nature of the failure (failed to illuminate, illuminated briefly
                then failed, failed after X minutes during the duration test) in the log book.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assess the risk</strong> — a failed luminaire in a storeroom presents a
                different risk level to one above the main stairway exit. Escape route and exit
                luminaire failures are critical and must be treated as urgent. The responsible
                person must be notified immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Implement compensatory measures if needed</strong> — if the failed
                luminaire covers a mandatory escape route location and cannot be replaced
                immediately, the responsible person may need to restrict building occupancy
                in the affected area or provide temporary portable lighting as an interim
                measure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace and re-test</strong> — once the luminaire is replaced, perform
                a function test to confirm it operates correctly. Record the repair date, the
                nature of the repair, and the re-test result in the log book.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most self-contained LED luminaires have a battery life of 4–7 years. A system installed
          for more than 5 years should be assessed for battery replacement — increasing failure
          rates during annual tests are a clear indication that batteries are nearing end of life.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person',
    heading: 'Competent Person Requirements',
    content: (
      <>
        <p>
          BS 5266-1 requires that emergency lighting systems are tested and maintained by a
          competent person. The standard does not specify formal qualifications, but competence
          is assessed against knowledge of the standard, the specific installation, and the
          equipment in use.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly tests</strong> — may be carried out by a trained member of staff
                who understands the test procedure, knows how to identify failures, and can
                complete the log book correctly. The responsible person must ensure the person
                is properly trained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual tests and remedial work</strong> — should be carried out by a
                qualified electrician with knowledge of BS 5266-1. Registration with a competent
                person scheme (NICEIC, NAPIT, ELECSA) and familiarity with the{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  IET Wiring Regulations
                </SEOInternalLink>{' '}
                is recommended. The ECA and IET publish guidance on emergency lighting competency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning certificates</strong> — may only be issued by the person
                responsible for the installation — typically the installing electrician. The
                certificate must be signed and include the installer's competent person scheme
                registration details.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'automatic-test-systems',
    heading: 'Automatic Test Systems',
    content: (
      <>
        <p>
          Addressable emergency lighting systems with built-in automatic test functionality
          represent the modern approach to BS 5266-1 compliance in larger or more complex
          buildings. These systems perform all required tests automatically and log results
          electronically.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic function tests</strong> — the system performs monthly function
                tests at a programmed time, tests each luminaire individually, and logs the
                result. Failed luminaires are reported to the monitoring panel and can trigger
                an alert to the responsible person or facilities team.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic duration tests</strong> — the system can perform full or
                half-duration tests at programmed times (typically overnight or at weekends)
                without manual intervention. This removes the practical difficulty of performing
                3-hour tests in 24-hour premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic log book</strong> — results are stored in the system's memory
                and can be downloaded or printed on demand. This electronic log satisfies the
                BS 5266-1 record-keeping requirement provided the data is accessible on the
                premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced maintenance burden</strong> — automatic systems significantly
                reduce the time required for compliance management. The responsible person still
                needs to review reports and action failures promptly, but the testing itself
                is handled autonomously.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Emergency Lighting Testing Contracts',
    content: (
      <>
        <p>
          Annual emergency lighting testing and maintenance is recurring contracted revenue that
          pairs naturally with{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR work</SEOInternalLink>,
          fire alarm servicing, and PAT testing. Every non-domestic premises with emergency
          lighting requires annual attention — this is a large, stable market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue BS 5266-1 Emergency Lighting Certificates and annual test records on
                  site. Send the completed documentation to the client before you leave the
                  building — no evening admin, no lost paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Typical Testing Costs (2026)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Annual testing per luminaire: £5–£15 including log book entry. A 30-fitting
                  office installation typically generates £150–£450 per year in testing revenue.
                  Battery replacement (typically needed every 4–7 years): £8–£25 per unit plus
                  labour. A proactive battery replacement programme is an excellent upsell
                  opportunity during annual test visits.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage emergency lighting testing with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site electrical certification. Issue BS 5266-1 emergency lighting certificates, EICR reports, and minor works notices on your phone with instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EmergencyLightingTestingPage() {
  return (
    <GuideTemplate
      title="Emergency Lighting Testing Guide UK | Monthly & Annual Tests"
      description="Complete guide to emergency lighting testing in the UK. BS 5266-1 requirements — monthly function test (1 minute), annual full-duration test (1, 2, or 3 hours), log book requirements, what to do if a luminaire fails, and competent person obligations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Emergency Lighting Testing Guide UK:{' '}
          <span className="text-yellow-400">Monthly & Annual Tests</span>
        </>
      }
      heroSubtitle="Everything responsible persons and electricians need to know about emergency lighting testing — legal requirements under BS 5266-1, monthly function tests, annual full-duration discharge tests, log book records, and what to do when a luminaire fails."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Emergency Lighting Testing"
      relatedPages={relatedPages}
      ctaHeading="Issue Emergency Lighting Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site electrical certification. BS 5266-1 emergency lighting certificates with instant PDF export and automatic client delivery. 7-day free trial, cancel anytime."
    />
  );
}
