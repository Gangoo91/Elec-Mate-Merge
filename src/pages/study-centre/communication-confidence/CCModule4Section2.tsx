import {
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  FileText,
  PenLine,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'site-diary-purpose',
    question:
      'A dispute arises over whether a verbal instruction was given on site three months ago. What document would provide the strongest contemporaneous evidence?',
    options: [
      'A text message sent to a colleague about the conversation',
      'A site diary entry written on the day the instruction was given',
      'An email written from memory two weeks after the event',
      'A witness statement prepared for the dispute hearing',
    ],
    correctIndex: 1,
    explanation:
      'A site diary entry written on the day of the event is the strongest form of contemporaneous evidence. Courts and adjudicators place significant weight on records made at or near the time of the event, as they are less likely to be affected by memory distortion. Under both JCT and NEC contracts, contemporaneous records are essential for supporting claims, variations, and dispute resolution.',
  },
  {
    id: 'factual-vs-opinion',
    question: 'Which of the following is a factual statement suitable for a site diary entry?',
    options: [
      'The plasterer did a terrible job on the first-floor walls',
      'Plastering to first-floor walls appeared uneven with visible trowel marks across approximately 4 m\u00B2',
      'I think the plastering might not be up to standard',
      'The plasterer clearly does not care about quality',
    ],
    correctIndex: 1,
    explanation:
      'A factual statement describes what you observed using measurable, specific language. It avoids subjective judgements such as "terrible" or assumptions about intent. In site diaries and technical reports, factual writing protects you legally and ensures your records can withstand scrutiny during disputes or adjudication.',
  },
  {
    id: 'eicr-observations',
    question:
      'When recording an observation on an EICR, which approach follows best practice for report writing?',
    options: [
      'Write "Dodgy wiring in the loft that needs sorting"',
      'Write "Cable installation in loft space does not comply with BS 7671 requirements"',
      'Write "Non-thermally suitable cable (flat twin 6242Y) routed through loft insulation without derating applied, contrary to Regulation 523.9"',
      'Write "Cables in the loft are a fire risk"',
    ],
    correctIndex: 2,
    explanation:
      'Best practice for EICR observations requires you to state the specific deficiency, identify the cable or component, describe its location, and reference the relevant regulation. This removes ambiguity, enables the next electrician to locate and rectify the issue, and demonstrates professional competence. Vague descriptions such as "dodgy wiring" or unsupported claims like "fire risk" undermine the credibility of the report.',
  },
];

const faqs = [
  {
    question: 'Do I legally need to keep a site diary?',
    answer:
      'There is no standalone UK law that mandates keeping a site diary. However, most standard-form construction contracts (JCT, NEC) impose record-keeping obligations on contractors. Under the NEC4 Engineering and Construction Contract, Clause 15.3 requires the Contractor to notify early warnings and keep records of events. Under JCT contracts, the Contractor is required to keep records to support claims for loss and expense. Beyond contractual obligations, RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires records of reportable incidents, and CDM 2015 requires records relating to health and safety. In practice, a well-maintained site diary is your strongest defence in any contractual dispute, insurance claim, or regulatory investigation.',
  },
  {
    question: 'What is the difference between an EIC and an EICR?',
    answer:
      'An Electrical Installation Certificate (EIC) is issued for new electrical installations or additions to existing installations. It confirms that the new work has been designed, constructed, inspected, and tested in accordance with BS 7671. An Electrical Installation Condition Report (EICR) is issued following the inspection and testing of an existing electrical installation. It reports on the condition of the installation at the time of the inspection and identifies any deficiencies against the current edition of BS 7671. The key difference is that an EIC certifies compliance of new work, whereas an EICR reports the condition of existing work. Both require detailed, factual, and professionally written observations and recommendations.',
  },
  {
    question: 'Should I write in the first person or third person in technical reports?',
    answer:
      'For site diaries, first person ("I observed...") is standard practice because you are recording your own direct observations. For formal technical reports and EICRs, third person or passive voice is more common ("It was observed that..." or "The installation was found to..."). However, active voice is generally clearer and more direct than passive voice. The IET Guidance Note 3 (GN3) recommends clear, unambiguous language in inspection reports. Whichever style you adopt, be consistent throughout the document. The most important principle is clarity: will someone reading your report in six months or six years understand exactly what you found and where?',
  },
  {
    question: 'How do I record a variation on site?',
    answer:
      'Record variations immediately in your site diary on the day they occur. Include: the date and time; who gave the instruction (name and role); what was instructed (the change to the original scope); the reason given for the change; any impact on programme or cost discussed at the time; and whether a formal variation order or compensation event notice has been issued. Under NEC contracts, variations are managed through the compensation event process (Clause 60 onwards) and the Project Manager must issue instructions. Under JCT contracts, variations are covered by Clause 3.14 (Architect Instructions). Always follow up a verbal instruction with a written confirmation email the same day. If the instruction is not confirmed in writing, your site diary entry becomes the primary evidence of the change.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under JCT contracts, what is the primary purpose of keeping a site diary?',
    options: [
      'To provide entertainment during tea breaks',
      'To create a contemporaneous record that supports claims, variations, and dispute resolution',
      'To replace the need for formal contract correspondence',
      "To satisfy the site manager's curiosity about daily activities",
    ],
    correctAnswer: 1,
    explanation:
      'The primary purpose of a site diary under JCT contracts is to create a contemporaneous factual record that can support claims for loss and expense, evidence variations, and provide documentary proof in the event of disputes or adjudication. It is a legal document, not a substitute for formal correspondence.',
  },
  {
    id: 2,
    question:
      'Under NEC4, which clause requires the Contractor to give an early warning of matters that could affect cost, time, or quality?',
    options: [
      'Clause 10.1 (Mutual trust and co-operation)',
      'Clause 15.1 (Early warning)',
      'Clause 60.1 (Compensation events)',
      'Clause 36.1 (Acceleration)',
    ],
    correctAnswer: 1,
    explanation:
      'NEC4 Clause 15.1 requires the Contractor (and the Project Manager) to give an early warning as soon as they become aware of any matter which could increase the total of the Prices, delay Completion, delay meeting a Key Date, or impair the performance of the works in use. Failing to give an early warning can reduce the assessment of a compensation event.',
  },
  {
    id: 3,
    question:
      'Which of the following is an example of opinion writing rather than factual writing?',
    options: [
      'Water ingress observed at the south-east corner of the roof, approximately 500 mm from the parapet wall',
      'The roofing contractor has done a shoddy job and clearly cut corners',
      'Three operatives from ABC Roofing were on site between 08:00 and 16:30',
      'Ambient temperature recorded at 4\u00B0C at 07:15; concrete pour postponed per method statement requirements',
    ],
    correctAnswer: 1,
    explanation:
      'The statement "shoddy job" and "clearly cut corners" are subjective opinions and value judgements. They would not withstand scrutiny in a dispute and could expose you to claims of defamation. Site diary entries must record facts: what you observed, measured, or were told, not your personal assessment of someone\'s workmanship or motivation.',
  },
  {
    id: 4,
    question:
      'When writing observations on an EICR, what information should be included for each deficiency?',
    options: [
      'Just the code (C1, C2, C3, or FI) and nothing else',
      'A vague description such as "wiring not great in places"',
      'The specific deficiency, its location, the affected component, and the relevant BS 7671 regulation',
      'Only the regulation number without any description of the actual deficiency',
    ],
    correctAnswer: 2,
    explanation:
      'IET Guidance Note 3 (GN3) recommends that each EICR observation should include a clear description of the deficiency, its specific location within the installation, identification of the affected component or circuit, and a reference to the relevant BS 7671 regulation. This enables the next electrician to locate the issue, understand what is wrong, and carry out the necessary remedial work without ambiguity.',
  },
  {
    id: 5,
    question:
      'You receive a verbal instruction on site to add three additional socket outlets to a kitchen circuit. What should you do first?',
    options: [
      'Start the work immediately to avoid delaying the programme',
      'Ignore the instruction because it was not in writing',
      'Record the instruction in your site diary and send a written confirmation email the same day',
      'Wait until the end of the week to record it in your weekly report',
    ],
    correctAnswer: 2,
    explanation:
      'When you receive a verbal instruction on site, record it immediately in your site diary with the date, time, who gave the instruction, what was instructed, and any discussion about cost or programme impact. Then send a written confirmation email the same day. This creates a contemporaneous record and a written trail. Under both JCT and NEC contracts, verbal instructions should be confirmed in writing. Your site diary provides evidence if the instruction is later disputed.',
  },
  {
    id: 6,
    question: 'What does "active voice" mean in the context of report writing?',
    options: [
      'Writing in capital letters to emphasise important points',
      'The subject of the sentence performs the action (e.g. "The electrician tested the circuit")',
      'Using exclamation marks to make the writing more engaging',
      'Writing reports while physically active on site',
    ],
    correctAnswer: 1,
    explanation:
      'Active voice means the subject of the sentence performs the action: "The electrician tested the circuit" (active) versus "The circuit was tested by the electrician" (passive). Active voice is generally clearer, more direct, and easier to understand. It also makes accountability explicit \u2014 it is clear who performed the action. The IET and most technical writing guides recommend active voice where possible, although passive voice is acceptable in formal reports where the focus is on the action rather than the person.',
  },
  {
    id: 7,
    question:
      'A site diary entry reads: "Arrived on site 07:30. Weather dry, 8\u00B0C. Met with PM to discuss programme. Instructed to bring forward second-fix electrical to Block B due to client request. Three electricians on task. No incidents." What is this an example of?',
    options: [
      'An overly detailed diary entry that wastes time',
      'A well-structured daily site diary entry covering key information categories',
      'An EICR observation requiring a classification code',
      'A variation order that should have been issued as a formal document',
    ],
    correctAnswer: 1,
    explanation:
      'This is a well-structured daily site diary entry. It covers the key information categories: arrival time, weather and conditions, meetings and discussions, instructions received, labour on site, and health and safety. It is factual, concise, and contemporaneous. While the instruction to bring forward work may also need a formal variation order or compensation event notice, recording it in the site diary creates immediate contemporaneous evidence.',
  },
  {
    id: 8,
    question:
      'An EICR observation states: "DB1 \u2014 30 mA RCD protecting socket-outlet circuits in the kitchen failed to trip within 300 ms during testing at 1\u00D7 I\u0394n. Measured trip time: 420 ms. Does not comply with Regulation 531.3.2." What classification code should this receive?',
    options: [
      'C3 \u2014 Improvement recommended',
      'FI \u2014 Further investigation required',
      'C2 \u2014 Potentially dangerous, urgent remedial action required',
      'C1 \u2014 Danger present, risk of injury, immediate action required',
    ],
    correctAnswer: 2,
    explanation:
      'An RCD protecting socket-outlet circuits in a kitchen that fails to disconnect within the required time is classified as C2 \u2014 Potentially dangerous. The RCD is present and partially functional but is not providing the required level of protection within the specified time. It is not C1 (danger present) because the RCD may still operate at a higher fault current, but it is not providing the intended 30 ms supplementary protection. Urgent remedial action is required to replace or repair the RCD.',
  },
];

export default function CCModule4Section2() {
  useSEO({
    title: 'Site Diaries & Technical Reports | Communication & Confidence Module 4.2',
    description:
      'JCT site diary requirements, NEC record-keeping obligations, EICR/EIC report writing, factual vs opinion writing, and active voice for construction professionals.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <ClipboardList className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Site Diaries &amp; Technical Reports
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            JCT site diary requirements, NEC record-keeping obligations, EICR/EIC report writing,
            and the difference between factual and opinion writing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Site diaries:</strong> Contemporaneous records that protect you in disputes
              </li>
              <li>
                <strong>Factual writing:</strong> Describe what you observed, not what you think
              </li>
              <li>
                <strong>EICR reports:</strong> Specific deficiency + location + regulation reference
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Principles</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Record daily:</strong> Write entries on the day, not from memory later
              </li>
              <li>
                <strong>Active voice:</strong> &ldquo;The electrician tested&rdquo; not &ldquo;was
                tested by&rdquo;
              </li>
              <li>
                <strong>Confirm verbally:</strong> Follow up every verbal instruction in writing
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the purpose and legal standing of a site diary under JCT and NEC contracts',
              'Distinguish between factual and opinion writing and apply factual language in site records',
              'Use active voice to write clear, unambiguous technical reports',
              'Write EICR observations that include deficiency, location, component, and regulation reference',
              'Record variations, verbal instructions, and site events in a structured daily diary format',
              'Understand the difference between an EIC and an EICR and the writing standards expected for each',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Site Diaries Matter */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Why Site Diaries Matter
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A site diary is a daily factual record of events, observations, instructions, and
                conditions on a construction site. It is one of the most important documents an
                electrician or contractor can maintain. In the event of a dispute, a delay claim, a
                variation disagreement, or an insurance investigation, your site diary may be the
                single most valuable piece of evidence you hold.
              </p>

              <p>
                Courts and adjudicators give significant weight to{' '}
                <strong>contemporaneous records</strong> &mdash; documents created at or near the
                time of the event. A diary entry written on the day of an event is far more credible
                than a statement prepared weeks or months later from memory. Memory fades and
                distorts; a diary entry does not.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Professional Reality:</strong> Many electricians
                  view site diaries as paperwork that gets in the way of &ldquo;real work.&rdquo;
                  This attitude changes the first time they face a disputed variation worth
                  thousands of pounds and have no written evidence to support their position. Five
                  minutes at the end of each day can save you tens of thousands in lost claims.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: JCT & NEC Record-Keeping Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            JCT &amp; NEC Record-Keeping Requirements
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The two most common standard-form construction contracts in the UK &mdash; JCT and
                NEC &mdash; both impose record-keeping obligations, although they approach them
                differently. Understanding these obligations helps you appreciate why your site
                diary is not optional.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">JCT Contracts</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Clause 3.14:</strong> The Architect/Contract
                        Administrator may issue instructions requiring a variation. Records of these
                        instructions are essential for claims
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Clause 4.23:</strong> Claims for loss and
                        expense must be supported by information and evidence &mdash; your site
                        diary provides this
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        The Contractor must keep records sufficient to substantiate any claim for
                        additional time or money
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>
                        Verbal instructions from the Architect should be confirmed in writing within
                        7 days
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">NEC4 Contracts</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Clause 15.1:</strong> Early warning
                        obligation &mdash; notify any matter that could affect cost, completion, or
                        quality
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Clause 61.4:</strong> Failure to notify a
                        compensation event can reduce the assessment of that event
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        The Contractor must keep records of actual costs, resources, and conditions
                        to support compensation event quotations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                      <span>
                        NEC places greater emphasis on proactive communication and early
                        notification than JCT
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Difference:</strong> JCT is more reactive
                  &mdash; you make claims when events occur. NEC is more proactive &mdash; you are
                  contractually required to notify potential issues before they become problems.
                  Both require robust records, but NEC&rsquo;s time-bar provisions (Clause 61.3)
                  mean that failing to notify a compensation event within 8 weeks can result in
                  losing the right to claim entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Factual vs Opinion Writing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Factual vs Opinion Writing
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most important writing skill for site records and technical reports is
                the ability to separate fact from opinion. Factual writing records what you
                observed, measured, or were told. Opinion writing inserts your personal judgement,
                interpretation, or emotional reaction. In professional documentation, facts are
                evidence; opinions are liabilities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Factual vs Opinion &mdash; Side by Side
                </p>
                <div className="space-y-3">
                  {/* Example 1 */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 font-bold text-xs">&times; OPINION</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;The plumber made a mess of the first fix and left the site in a
                        terrible state.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-green-400 font-bold text-xs">FACT</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;Plumbing first fix by XYZ Plumbing: three pipe clips missing from
                        hot-water run in bathroom 2. Copper swarf and offcuts left on floor of
                        en-suite. Photographs taken (refs 047&ndash;051).&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 font-bold text-xs">&times; OPINION</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;The client is being unreasonable about the programme and keeps
                        changing their mind.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-green-400 font-bold text-xs">FACT</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;Client instructed relocation of kitchen socket positions for the
                        third time (original brief 12/01, revised 19/01, further revised today
                        26/01). Impact on programme discussed with PM.&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Example 3 */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 font-bold text-xs">&times; OPINION</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;The wiring in the loft is dangerous and needs ripping out.&rdquo;
                      </p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                        <span className="text-green-400 font-bold text-xs">FACT</span>
                      </div>
                      <p className="text-sm text-white">
                        &ldquo;Flat twin &amp; earth cable (6242Y) routed through loft insulation
                        without derating applied. Cable warm to touch. No evidence of thermal
                        calculations. Contrary to Regulation 523.9.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PenLine className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Active Voice vs Passive Voice</p>
                </div>
                <div className="text-sm text-white space-y-3">
                  <p>
                    Active voice makes your writing clearer and assigns responsibility. Use it
                    wherever possible in site diaries and reports.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-white mb-1">Passive (less clear)</p>
                      <p className="text-sm text-white">
                        &ldquo;The circuit was tested and the results were recorded.&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">Active (preferred)</p>
                      <p className="text-sm text-white">
                        &ldquo;I tested the circuit and recorded the results in the schedule of test
                        results.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-white mb-1">Passive (less clear)</p>
                      <p className="text-sm text-white">
                        &ldquo;It was agreed that the work would be completed by Friday.&rdquo;
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-medium text-rose-400 mb-1">Active (preferred)</p>
                      <p className="text-sm text-white">
                        &ldquo;The project manager and I agreed to complete the work by
                        Friday.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: EICR/EIC Report Writing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            EICR/EIC Report Writing
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical Installation Condition Reports (EICRs) and Electrical Installation
                Certificates (EICs) are formal technical documents governed by BS 7671 and IET
                Guidance Note 3 (GN3). The quality of your written observations directly reflects
                your professional competence. A well-written report protects you, your client, and
                the next electrician who reads it. A poorly written report creates confusion,
                liability, and reputational damage.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    What Makes a Good EICR Observation?
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Specific deficiency:</strong> What exactly is
                      wrong? Describe the issue in precise technical language
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location:</strong> Where in the installation is
                      the deficiency? Be specific enough that another electrician can find it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Affected component:</strong> Which circuit,
                      cable, device, or accessory is affected?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regulation reference:</strong> Which BS 7671
                      regulation does the deficiency contravene?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Classification code:</strong> C1 (danger
                      present), C2 (potentially dangerous), C3 (improvement recommended), or FI
                      (further investigation required)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Example EICR Observation Box */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Example EICR Observations &mdash; Good vs Poor
                </p>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-400 font-bold text-xs">&times; POOR</span>
                    </div>
                    <p className="text-sm text-white">
                      &ldquo;C2 &mdash; Earthing not right in the kitchen.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      Problem: No specific deficiency, no component identified, no regulation
                      reference, no location detail
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                      <span className="text-green-400 font-bold text-xs">GOOD</span>
                    </div>
                    <p className="text-sm text-white">
                      &ldquo;C2 &mdash; DB1, Circuit 7 (kitchen sockets): CPC disconnected at
                      junction box located above kitchen ceiling void, approximately 1.2 m from
                      north wall. Socket outlets on this circuit have no earth continuity. Contrary
                      to Regulation 411.3.1.1.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-1">
                      Includes: classification, circuit reference, specific deficiency, precise
                      location, affected accessories, and regulation
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common EICR Writing Mistakes</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Vague descriptions:</strong> &ldquo;Wiring
                      poor&rdquo; or &ldquo;not to standard&rdquo; &mdash; what specifically is
                      wrong?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Missing regulation references:</strong>{' '}
                      &ldquo;Does not comply&rdquo; &mdash; with what regulation?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Emotional language:</strong> &ldquo;Shocking
                      workmanship&rdquo; or &ldquo;dangerous bodge job&rdquo; &mdash; unprofessional
                      and potentially defamatory
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5 flex-shrink-0">&times;</span>
                    <span>
                      <strong className="text-white">Incorrect classification:</strong> Applying C1
                      when C2 is appropriate, or using C3 for a genuinely dangerous deficiency
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Construction Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Construction Examples
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following examples demonstrate professional writing for three common scenarios
                you will encounter as an electrician: a daily site diary entry, an EICR observation,
                and recording a variation on site.
              </p>

              {/* Example 1: Site Diary Entry */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-semibold text-white">
                    Example 1: Daily Site Diary Entry
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 font-mono text-sm text-white space-y-2">
                  <p>
                    <strong className="text-rose-400">Date:</strong> Wednesday 15 January 2025
                  </p>
                  <p>
                    <strong className="text-rose-400">Project:</strong> 14 Oakfield Road &mdash;
                    Domestic Rewire
                  </p>
                  <p>
                    <strong className="text-rose-400">Weather:</strong> Dry, overcast, 6&deg;C
                  </p>
                  <p>
                    <strong className="text-rose-400">Arrived:</strong> 07:45 &nbsp;|&nbsp;{' '}
                    <strong className="text-rose-400">Left:</strong> 16:30
                  </p>
                  <p>
                    <strong className="text-rose-400">Labour:</strong> Self + 1 apprentice (JB)
                  </p>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Work Completed:</strong>
                  </p>
                  <ul className="list-disc list-inside text-white space-y-1 ml-2">
                    <li>
                      First-fix cabling to ground-floor lighting circuits (Circuits 1 &amp; 2)
                    </li>
                    <li>
                      Chased out and back-boxed 8&times; socket outlets to lounge and dining room
                    </li>
                    <li>Installed consumer unit back box in understairs cupboard</li>
                  </ul>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Instructions Received:</strong>
                  </p>
                  <p className="ml-2">
                    Client (Mrs Thompson) requested an additional double socket outlet on the
                    landing for a vacuum cleaner. Discussed additional cost (&pound;85 + VAT) and
                    impact on programme (nil &mdash; can incorporate into existing first-fix stage).
                    Client agreed verbally. Confirmation email sent at 17:15.
                  </p>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Issues/Observations:</strong>
                  </p>
                  <p className="ml-2">
                    Existing cable route behind kitchen units inaccessible due to fitted kitchen
                    installed tight to wall. Cable pull through from above not possible without
                    lifting kitchen worktop. Discussed with client &mdash; alternative route via
                    ceiling void to be assessed tomorrow.
                  </p>
                  <p>
                    <strong className="text-rose-400">H&amp;S:</strong> No incidents. Dust
                    suppression used during chasing. RPE worn.
                  </p>
                </div>
              </div>

              {/* Example 2: EICR Observation */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-semibold text-white">Example 2: EICR Observation</p>
                </div>
                <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 font-mono text-sm text-white space-y-2">
                  <p>
                    <strong className="text-rose-400">Observation 3 &mdash; Code C2</strong>
                  </p>
                  <p>
                    DB1, Circuit 4 (upstairs sockets): 30 mA RCD (Hager CD440U) protecting
                    socket-outlet circuits serving bedrooms 1, 2, and 3 failed to trip within 300 ms
                    during testing at 1&times; I&Delta;n. Measured trip time: 380 ms. RCD tripped at
                    1.5&times; I&Delta;n in 28 ms. RCD functional but response at rated residual
                    operating current exceeds maximum permitted disconnection time. Contrary to
                    Regulation 531.3.2. Recommend: Replace RCD.
                  </p>
                </div>
                <p className="text-xs text-white mt-2">
                  Note how the observation identifies the distribution board, circuit number,
                  device, specific test results, measured values, the regulation contravened, and a
                  recommended action. This is the standard you should aim for.
                </p>
              </div>

              {/* Example 3: Recording a Variation */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <PenLine className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-semibold text-white">
                    Example 3: Recording a Variation
                  </p>
                </div>
                <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 font-mono text-sm text-white space-y-2">
                  <p>
                    <strong className="text-rose-400">Date:</strong> Thursday 23 January 2025
                  </p>
                  <p>
                    <strong className="text-rose-400">Time:</strong> 10:15
                  </p>
                  <p>
                    <strong className="text-rose-400">Instruction From:</strong> Site Manager (Dave
                    Richards, ABC Construction)
                  </p>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Instruction:</strong>
                  </p>
                  <p className="ml-2">
                    Verbal instruction received to relocate the distribution board from the
                    understairs cupboard to the utility room. Reason given: client has requested a
                    wine storage unit be fitted in the understairs cupboard, which conflicts with
                    the DB position shown on drawing E-101 Rev C.
                  </p>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Impact Discussed:</strong>
                  </p>
                  <ul className="list-disc list-inside text-white space-y-1 ml-2">
                    <li>Additional 8 m of 25 mm&sup2; main tails required</li>
                    <li>
                      New cable route to be agreed with structural engineer (steel beam in utility
                      ceiling)
                    </li>
                    <li>Estimated additional cost: &pound;420 + VAT (materials and labour)</li>
                    <li>Programme impact: half-day delay to second-fix start</li>
                  </ul>
                  <hr className="border-white/10 my-2" />
                  <p>
                    <strong className="text-rose-400">Action:</strong>
                  </p>
                  <p className="ml-2">
                    Confirmation email sent to Dave Richards and PM at 10:45 requesting formal
                    variation order / architect&rsquo;s instruction. Work on hold pending written
                    confirmation. Ref: email subject &ldquo;Variation &mdash; DB Relocation &mdash;
                    23/01/25.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Top Tip:</strong> Notice how each example
                  records <strong>who</strong> gave the instruction, <strong>what</strong> was
                  instructed, <strong>why</strong> the change was needed, the{' '}
                  <strong>impact</strong> on cost and programme, and the{' '}
                  <strong>follow-up action</strong> taken. This five-point structure &mdash; who,
                  what, why, impact, action &mdash; works for any variation or instruction you need
                  to record.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-4-section-3">
              Next: Quotes, Proposals &amp; Written Agreements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
