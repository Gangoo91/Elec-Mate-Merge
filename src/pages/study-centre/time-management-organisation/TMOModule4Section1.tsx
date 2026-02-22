import { ArrowLeft, FileCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'Within what time frame must a Part P notification be submitted to Building Control after completing notifiable electrical work?',
    options: ['7 days', '14 days', '30 days', '90 days'],
    correctAnswer: 2,
    explanation:
      'Part P of the Building Regulations requires that notifiable electrical work is reported to Building Control within 30 days of completion. For registered competent persons (e.g. NICEIC, NAPIT), the scheme operator handles the notification, but it must still happen within that 30-day window.',
  },
  {
    id: 2,
    question: 'What is the key difference between an EIC and a Minor Works Certificate?',
    options: [
      'An EIC is for commercial work; a MWC is for domestic work only',
      'An EIC covers a new installation or addition to an installation; a MWC covers minor work that does not include a new circuit',
      'A MWC is legally required; an EIC is optional',
      'An EIC must be completed on-site; a MWC can be completed at home',
    ],
    correctAnswer: 1,
    explanation:
      'An Electrical Installation Certificate (EIC) is required for new installations, additions, and alterations that include new circuits. A Minor Works Certificate (MWC) covers work that does not extend to the provision of a new circuit &mdash; for example, adding a spur from an existing socket circuit or replacing a consumer unit on a like-for-like basis.',
  },
  {
    id: 3,
    question: 'What is the recommended EICR frequency for a domestic rental property?',
    options: [
      'Every year',
      'Every 3 years',
      'Every 5 years (legally required since 2020)',
      'Every 10 years',
    ],
    correctAnswer: 2,
    explanation:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 made 5-yearly EICR inspections a legal requirement for rental properties. The landlord must ensure the inspection is carried out at least every 5 years and supply a copy to the tenant within 28 days.',
  },
  {
    id: 4,
    question: 'What is the "do it at the job" principle for certification?',
    options: [
      'Always complete and issue certificates while still on-site, or as close to completion as possible',
      'Only perform paperwork during working hours, never at home',
      'Complete certificates within 30 days of the work',
      'Have the client sign all paperwork before you begin work',
    ],
    correctAnswer: 0,
    explanation:
      'The "do it at the job" principle means completing certificates on-site while the information is fresh &mdash; test results are in front of you, circuit details are visible, and the installation is accessible for clarification. Leaving paperwork until later leads to errors, omissions, and forgotten details that undermine the certificate\u2019s accuracy.',
  },
  {
    id: 5,
    question:
      'Which filing structure is recommended for organising electrical certificates digitally?',
    options: [
      'Client Name \u2192 Job Type \u2192 Date',
      'Year \u2192 Client \u2192 Job (e.g. 2025/Smith/Kitchen-Rewire)',
      'Certificate Type \u2192 Date \u2192 Client',
      'Random numbering with a separate spreadsheet index',
    ],
    correctAnswer: 1,
    explanation:
      'A Year \u2192 Client \u2192 Job folder structure (e.g. 2025/Smith/Kitchen-Rewire) is recommended because it naturally organises work chronologically, makes tax-year filing straightforward, and allows quick retrieval by client name. Each job folder contains the certificate PDF, photos, and any relevant correspondence.',
  },
  {
    id: 6,
    question:
      'What is the primary risk of leaving certificate completion until you return to the office?',
    options: [
      'You may run out of paper',
      'The client may refuse to pay',
      'You lose context &mdash; details blur, test values may be misremembered, and errors increase significantly',
      'It is illegal to complete certificates off-site',
    ],
    correctAnswer: 2,
    explanation:
      'When you leave the site, you lose direct access to the installation. Test results that seemed clear at the time become ambiguous. Circuit descriptions written in shorthand make less sense. The risk of transposing values, forgetting observations, or omitting circuits increases dramatically. Completing certificates on-site eliminates these risks.',
  },
  {
    id: 7,
    question: 'What information must a properly completed EIC include?',
    options: [
      'Only the test results and the electrician\u2019s signature',
      'Details of the installation, design, construction, and inspection/testing with signatures from the designer, constructor, and inspector',
      'A brief description of the work and the total cost',
      'Only the client\u2019s name and the date of completion',
    ],
    correctAnswer: 1,
    explanation:
      'A complete EIC requires details of the installation (address, description, extent), the design basis, construction details, and full inspection and test results. It must be signed by the designer, constructor, and inspector (which may all be the same person for smaller jobs). Incomplete certificates are not compliant with BS 7671.',
  },
  {
    id: 8,
    question: 'How long should electrical certificates and associated records be retained?',
    options: [
      '1 year',
      '3 years',
      '6 years minimum, with the recommendation to keep them indefinitely where practical',
      'Only until the next EICR is carried out',
    ],
    correctAnswer: 2,
    explanation:
      'The limitation period for most civil claims in England and Wales is 6 years (12 years for claims under deed). Keeping records for at least 6 years provides legal protection. Many electricians keep certificates indefinitely as digital storage costs are negligible and the records may be needed for future EICRs or if disputes arise years later.',
  },
];

export default function TMOModule4Section1() {
  useSEO({
    title:
      'Paperwork, Certificates & Compliance | Module 4 Section 1 | Time Management & Organisation',
    description:
      'EICRs, EICs, MWCs, Part P notifications, filing systems, templates, and the do-it-at-the-job principle for electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <FileCheck className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 1</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Paperwork, Certificates &amp; Compliance
            </h1>
            <p className="text-white text-sm sm:text-base">
              The admin that keeps you legal, protects your reputation, and prevents costly
              call-backs &mdash; done right, done on time, done at the job
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                Every electrical job requires documentation &mdash; EICs, MWCs, EICRs, or Part P
                notifications depending on the scope. Completing certificates on-site while details
                are fresh eliminates errors and saves hours of retrospective admin. A simple digital
                filing system means any certificate can be retrieved in under 60 seconds.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                Incomplete or late paperwork is the number one admin failure for electrical
                contractors. It creates legal liability, delays payment (clients often withhold
                until certificates are received), and undermines professional credibility. The
                electrician who issues certificates promptly gets paid faster and builds a
                reputation for professionalism.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Identify which certificate type (EIC, MWC, EICR) applies to different categories of electrical work',
                'Explain the Part P notification process and the 30-day compliance window for notifiable work',
                'Implement the do-it-at-the-job principle to eliminate retrospective paperwork errors',
                'Design a digital filing system using the Year/Client/Job folder structure for instant retrieval',
                'Create templates and pre-fill workflows that reduce certificate completion time by 50% or more',
                'Establish a compliance calendar to track recurring obligations such as EICR intervals and insurance renewals',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: The Admin Reality */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">1. The Admin Reality</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                There is a persistent myth in the electrical trade that &ldquo;the real work&rdquo;
                is the physical installation and testing, while paperwork is an inconvenient
                afterthought. This mindset is both wrong and expensive. Paperwork is not separate
                from the job &mdash; it is part of the job. An installation without a properly
                completed certificate is, in regulatory terms, incomplete. The certificate is the
                legal proof that the work was designed, installed, inspected, and tested to the
                standard required by BS 7671. Without it, you have no defence if something goes
                wrong.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The financial reality reinforces this point. Many clients &mdash; particularly
                landlords, property managers, and commercial clients &mdash; will not release final
                payment until they receive the certificate. Every day the certificate is delayed is
                a day the invoice remains unpaid. For a sole trader managing cash flow, issuing a
                certificate 3 weeks late can mean the difference between paying suppliers on time
                and falling behind. The admin is not just compliance; it is cash flow management.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Beyond payment, there is the reputational dimension. Electricians who consistently
                issue certificates promptly &mdash; ideally on the same day the work is completed
                &mdash; build a reputation for professionalism that generates repeat business and
                referrals. Conversely, the electrician who has to be chased for paperwork, who
                promises certificates &ldquo;next week&rdquo; and delivers them next month, erodes
                trust. In a trade where personal reputation is everything, admin competence is a
                competitive advantage.
              </p>
            </div>
          </div>

          {/* Section 2: Electrical Certificates Explained */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. Electrical Certificates &mdash; Which One, When
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                BS 7671 specifies three primary certificate types, and choosing the correct one
                depends on the nature and scope of the work. The{' '}
                <strong className="text-white">Electrical Installation Certificate (EIC)</strong> is
                required for all new installations, additions to existing installations, and
                alterations that include the provision of a new circuit. This covers rewires, new
                consumer unit installations with additional circuits, extensions, new-build
                installations, and any work where a new circuit originates from the distribution
                board.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The <strong className="text-white">Minor Works Certificate (MWC)</strong> covers
                work that does not extend to the provision of a new circuit. This includes adding a
                spur to an existing ring final circuit, replacing a consumer unit on a like-for-like
                basis (same number of ways, no new circuits), replacing damaged accessories, and
                adding a new point to an existing circuit. The MWC is a simpler document than the
                EIC but still requires a schedule of test results for the circuit affected by the
                minor works.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The{' '}
                <strong className="text-white">
                  Electrical Installation Condition Report (EICR)
                </strong>{' '}
                is an inspection and testing report on an existing installation. It does not certify
                new work but rather reports on the condition of the existing installation,
                identifying any defects and coding them by severity (C1 &mdash; danger present, C2
                &mdash; potentially dangerous, C3 &mdash; improvement recommended, FI &mdash;
                further investigation required). The EICR includes a recommendation for the maximum
                interval before the next inspection.
              </p>
            </div>
          </div>

          {/* Framework box: Certificate Decision Matrix */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">Certificate Decision Matrix</h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">New circuit being installed?</strong> &rarr; EIC
                required
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">
                  Work on existing circuit, no new circuit added?
                </strong>{' '}
                &rarr; MWC required
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Inspecting/testing an existing installation?</strong>{' '}
                &rarr; EICR required
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">
                  Like-for-like replacement (e.g. socket for socket)?
                </strong>{' '}
                &rarr; MWC required
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Consumer unit change with no new circuits?</strong>{' '}
                &rarr; MWC required (but Part P notification still required)
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-4-1-cert-type"
            question="A customer asks you to add a new dedicated cooker circuit to their kitchen. Which certificate type is required?"
            options={[
              'Minor Works Certificate because it is a single circuit',
              'Electrical Installation Certificate because a new circuit is being installed',
              'EICR because you are working on an existing installation',
              'No certificate is required for a single domestic circuit',
            ]}
            correctIndex={1}
            explanation="Any work that involves the provision of a new circuit requires an Electrical Installation Certificate (EIC), regardless of how many circuits are being added. The key question is whether a new circuit originates from the distribution board."
          />

          {/* Section 3: Compliance Schedule */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                3. Compliance Schedule &amp; Part P
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Part P of the Building Regulations (England and Wales) requires that certain types
                of electrical work in dwellings are either carried out by a registered competent
                person or notified to Building Control. Notifiable work includes new circuits,
                consumer unit replacements, work in bathrooms and kitchens (where it involves new
                circuits or special locations), and work in gardens or outbuildings. If you are
                registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.), the scheme
                operator handles the Building Control notification on your behalf. However, the work
                must be notified within 30 days of completion.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Missing the 30-day Part P notification window creates complications. The local
                authority may require a retrospective Building Regulations application, which can
                involve re-inspection at your cost. More critically, if the property is subsequently
                sold, the absence of a Part P completion certificate can delay or even jeopardise
                the sale, leading to the homeowner chasing you for retrospective documentation. By
                building Part P notification into your job completion checklist, you eliminate this
                risk entirely.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Beyond Part P, a robust compliance schedule tracks recurring obligations. EICRs for
                rental properties are legally required every 5 years. Your own competent person
                scheme registration requires annual renewal. Public liability insurance, PAT testing
                of your own equipment, and calibration certificates for test instruments all have
                expiry dates. A simple calendar system with reminders set 30 days before each
                deadline ensures nothing slips. The cost of a lapsed insurance policy or expired
                scheme registration is orders of magnitude higher than the cost of a calendar
                reminder.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">EICR Inspection Frequencies</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Domestic (owner-occupied):</strong> Every 10 years or
              at change of occupancy. <strong className="text-white">Domestic rental:</strong> Every
              5 years (legally required since 2020 in England).{' '}
              <strong className="text-white">Commercial:</strong> Every 5 years (or as specified in
              the previous EICR). <strong className="text-white">Industrial:</strong> Every 3 years.{' '}
              <strong className="text-white">Swimming pools/saunas:</strong> Every year.{' '}
              <strong className="text-white">Construction sites:</strong> Every 3 months. These
              frequencies are guidance from BS 7671 and GN3, and the inspector may recommend a
              shorter interval based on the installation&rsquo;s condition.
            </p>
          </div>

          {/* Section 4: Filing Systems */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Filing Systems That Actually Work
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The most common filing &ldquo;system&rdquo; among electricians is no system at all
                &mdash; certificates scattered across email inboxes, van gloveboxes, desk drawers,
                and half-filled lever arch files. When a client calls 18 months later asking for a
                copy of their EIC, this electrician spends 30 minutes searching and may never find
                it. A proper filing system means any document can be retrieved within 60 seconds,
                regardless of when the work was completed.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The recommended structure is{' '}
                <strong className="text-white">Year &rarr; Client &rarr; Job</strong>. For example:{' '}
                <strong className="text-white">2025/Smith/Kitchen-Rewire</strong>. Within each job
                folder, store the certificate PDF, site photographs, any correspondence (emails,
                WhatsApp screenshots saved as PDF), the quote or estimate, and a copy of the
                invoice. This structure works because it naturally organises by time (making
                tax-year filtering straightforward), groups all documents for a single client
                together, and creates a complete audit trail for each job.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Cloud storage is essential for this system. Services like Google Drive, Dropbox, or
                iCloud mean your files are accessible from your phone on-site, your tablet at the
                kitchen table, and your computer in the office. They also provide automatic backup
                &mdash; if your phone is stolen or your laptop fails, your certificates are safe.
                The cost of 100GB of cloud storage (typically &pound;2&ndash;3/month) is negligible
                compared to the cost of losing years of certification records. Name files
                consistently:{' '}
                <strong className="text-white">EIC-Smith-Kitchen-2025-06-15.pdf</strong> is
                instantly identifiable; <strong className="text-white">Scan_0047.pdf</strong> is
                not.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-4-1-filing"
            question="A letting agent calls asking for a copy of an EICR you completed 14 months ago for a property on Oak Street. Using the Year/Client/Job system, how quickly should you find it?"
            options={[
              'It will take at least an hour of searching through old emails',
              'Within 60 seconds by navigating to the year folder, then the client or agent name, then the job folder',
              'You will need to redo the EICR because records that old cannot be retrieved',
              'You need to call your accountant to find it',
            ]}
            correctIndex={1}
            explanation="With a proper Year/Client/Job filing system in cloud storage, you simply navigate to the correct year, find the client or letting agent folder, open the job folder, and the EICR PDF is right there. Total retrieval time: under 60 seconds. This speed of retrieval builds enormous trust with commercial clients and letting agents."
          />

          {/* Section 5: Templates and Pre-Fills */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                5. Templates &amp; Pre-Fill Workflows
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                If you complete similar types of work regularly, creating templates saves enormous
                time. A sole trader who primarily does domestic rewires, consumer unit changes, and
                EICRs can create a template for each with recurring information pre-filled: your
                company details, scheme registration numbers, instrument serial numbers, and
                standard observations. Only the job-specific details &mdash; client name, address,
                test results &mdash; need to be entered fresh each time.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Digital certification platforms like Certsure, iCertifi, and Voltimum offer pre-fill
                functionality where your business details, instrument details, and common circuit
                descriptions are stored and automatically populated. Some platforms allow you to
                create job templates for standard work types. A domestic rewire template, for
                example, might pre-populate the schedule of circuits with typical domestic circuits
                (lighting, ring finals, cooker, shower, smoke detection) so you only need to modify
                rather than create from scratch.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Even without dedicated software, simple templates in a notes app or spreadsheet can
                halve your documentation time. A standard observation list for EICRs (common
                findings you see repeatedly, such as lack of RCD protection on older installations
                or absence of fire barriers at consumer unit) can be copy-pasted and edited rather
                than typed from memory each time. The principle is the same as any efficiency
                technique: do not recreate what can be reused.
              </p>
            </div>
          </div>

          {/* Section 6: The Do-It-At-The-Job Principle */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. The &ldquo;Do It at the Job&rdquo; Principle
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The single most impactful change any electrician can make to their admin workflow is
                committing to completing certificates on-site, before leaving the job. This
                principle eliminates the most common source of certificate errors: memory gaps. When
                you are standing in front of the installation, you can verify every circuit
                description, check every test result against the physical installation, and confirm
                every observation by looking at the relevant component. Two weeks later, sitting at
                a kitchen table with scribbled notes, you cannot.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The practical implementation requires planning. Bring your certification device
                (phone, tablet, or paper forms) to every job. Allow time in your schedule for
                documentation &mdash; a typical EIC on a domestic rewire takes 30&ndash;45 minutes
                to complete properly. Build this time into your quote and your day plan. If you
                schedule a rewire to finish at 16:00, that means the physical work finishes at 15:15
                and you spend 45 minutes on documentation. The certificate is issued before you
                drive away.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Construction site work provides a compelling example. An electrician completing a
                first fix inspection on a new-build can walk the installation with the EIC form,
                recording observations and test results in real time. The cable types, lengths, and
                routing are visible. The DB schedule is right there. Every circuit can be traced and
                verified. Contrast this with attempting the same task from memory two weeks later
                when the plasterers have boarded over all the cables. The on-site version is not
                just faster &mdash; it is dramatically more accurate, and accuracy in electrical
                certification is a legal and safety obligation.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              The &ldquo;Do It at the Job&rdquo; Checklist
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Before the job:</strong> Charge your device, ensure
                the certification app is working, load any templates for the job type
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">During testing:</strong> Record results directly into
                the certificate as you go &mdash; not on a separate sheet for later transfer
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">At completion:</strong> Walk the installation one
                final time with the certificate open, verifying every entry against the physical
                work
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Before leaving:</strong> Issue the certificate to the
                client (email, print, or digital handover), file your copy in the Year/Client/Job
                folder, submit the Part P notification if applicable
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-4-1-onsite"
            question="Why is completing an EIC two weeks after the work is finished significantly riskier than completing it on-site?"
            options={[
              'Because the client may have already sold the property',
              'Because the certificate software licence may have expired',
              'Because memory fades, cables are covered by plasterboard, and you cannot verify details against the physical installation',
              'Because the test instrument calibration may have changed',
            ]}
            correctIndex={2}
            explanation="Two weeks after completion, your memory of specific details has faded, the installation may have been covered by other trades (plasterboard, screed, ceilings), and you cannot physically verify circuit routes, cable types, or observation details. Errors on retrospective certificates are far more common than on certificates completed at the job."
          />

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Paperwork is part of the job, not separate from it &mdash; an uncertified installation is an incomplete installation',
                'EICs cover new circuits; MWCs cover work on existing circuits without new circuits; EICRs inspect existing installations',
                'Part P notifications must be submitted within 30 days of completing notifiable work in dwellings',
                'The Year/Client/Job folder structure enables 60-second document retrieval with cloud backup',
                'Templates and pre-fill workflows can reduce certificate completion time by 50% or more',
                'The do-it-at-the-job principle eliminates memory-based errors and ensures certificates are issued on the day of completion',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Do I need to issue a certificate for every job, even small ones?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  BS 7671 requires certification for all electrical installation work. Even a simple
                  socket replacement should have a Minor Works Certificate. In practice, some
                  electricians skip this for very minor work, but doing so creates legal exposure.
                  If a fault subsequently occurs at that socket and causes damage, the absence of a
                  certificate leaves you without evidence that the work was tested and compliant.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if the client does not want to pay for the time it takes to complete
                  paperwork?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Documentation time should always be included in your quote. It is not an
                  &ldquo;extra&rdquo; &mdash; it is part of the job. A rewire quote includes the
                  cable, the labour, the testing, and the certification. If you itemise your quotes,
                  include a line for &ldquo;testing, commissioning and certification&rdquo; to make
                  it transparent. Clients who understand that certification is a legal requirement
                  rarely object.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Can I use paper certificates or must they be digital?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Both paper and digital certificates are legally valid. However, digital
                  certificates offer significant advantages: automatic backup, instant email
                  delivery, searchable records, and integration with Part P notification systems. If
                  you use paper, you should still scan and file a digital copy as backup. The
                  industry trend is firmly towards digital, and most competent person schemes now
                  expect or require digital submissions.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How do I handle corrections to a certificate after it has been issued?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  If you discover an error on an issued certificate, the proper approach is to issue
                  an amended certificate clearly marked as a replacement, with the original
                  certificate number referenced. Do not alter the original document. Inform the
                  client and any third parties (e.g. the competent person scheme, Building Control)
                  who received the original. Some digital platforms have formal amendment workflows
                  for this purpose.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz
            questions={quizQuestions}
            title="Section 1 Quiz: Paperwork, Certificates & Compliance"
          />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4-section-2">
                Next: Digital Tools &amp; Systems
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
