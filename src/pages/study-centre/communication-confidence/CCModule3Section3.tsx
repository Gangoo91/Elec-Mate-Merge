import {
  ArrowLeft,
  HardHat,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
  Users,
  Clock,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'toolbox-talk-duration',
    question: 'What is the recommended duration for a toolbox talk according to HSE guidance?',
    options: [
      '1&ndash;2 minutes',
      '5&ndash;10 minutes',
      '20&ndash;30 minutes',
      '45&ndash;60 minutes',
    ],
    correctIndex: 1,
    explanation:
      'The HSE recommends that toolbox talks last between 5 and 10 minutes. This is long enough to cover a single topic in meaningful detail, but short enough to hold attention and fit into the working day without disrupting productivity. Talks that run longer than 10 minutes tend to lose the audience and cover too many topics at once, reducing retention.',
  },
  {
    id: 'toolbox-talk-structure',
    question: 'Which of the following best describes the recommended structure for a toolbox talk?',
    options: [
      'Read the entire risk assessment aloud, then ask if there are questions',
      'Opening hook, single topic body, close with an action point or check question',
      'Cover as many hazards as possible in the time available',
      'Show a safety video and hand out a sign-off sheet',
    ],
    correctIndex: 1,
    explanation:
      'An effective toolbox talk follows a clear three-part structure: an opening hook to grab attention (a recent incident, a question, or a statistic), a single-topic body that covers the key points in practical detail, and a close that includes either an action point the team can take away or a check question to confirm understanding. Covering multiple topics dilutes the message and reduces retention.',
  },
  {
    id: 'cdm-2015-instruction',
    question:
      'Under CDM 2015, which regulation places a duty on contractors to provide suitable site inductions and information to workers?',
    options: [
      'Regulation 4 &mdash; Client duties',
      'Regulation 8 &mdash; General duties',
      'Regulation 13 &mdash; Duties of contractors',
      'Regulation 22 &mdash; Welfare facilities',
    ],
    correctIndex: 2,
    explanation:
      'CDM 2015 Regulation 13 requires contractors to provide suitable site inductions, information, and instruction to workers. This includes ensuring that workers are aware of the hazards they may encounter and the control measures in place. Toolbox talks are one of the most effective and widely-used methods for fulfilling this duty on construction sites.',
  },
];

const faqs = [
  {
    question: 'Do toolbox talks need to be documented?',
    answer:
      'Yes. You should record the date, topic, presenter, key points covered, and obtain signatures or initials from all attendees. This documentation serves as evidence that you have fulfilled your legal duty to provide information and instruction under CDM 2015 Regulation 13 and the Health and Safety at Work etc. Act 1974 Section 2. It also provides a record for audits, inspections, and incident investigations. Many contractors use a standard toolbox talk record sheet or a digital app to capture this information.',
  },
  {
    question: 'How often should toolbox talks be delivered?',
    answer:
      'There is no fixed legal frequency, but best practice on construction sites is to deliver toolbox talks at least weekly, with additional talks when new hazards arise, new workers join the team, work methods change, or following an incident or near miss. The HSE recommends that toolbox talks should be a routine part of site safety management, not a one-off event. Consistency is key &mdash; regular short talks are far more effective than occasional lengthy ones.',
  },
  {
    question: 'What if workers do not speak English as their first language?',
    answer:
      'CDM 2015 Regulation 13 requires that information and instruction be provided in a form that workers can understand. This means you may need to use visual aids, demonstrations, translated materials, or an interpreter. Simple language, diagrams, photographs of the actual site conditions, and live demonstrations are all effective strategies. You should check understanding by asking questions rather than simply asking "Does everyone understand?" &mdash; a check question that requires a specific answer is much more reliable.',
  },
  {
    question: 'Can apprentices or junior workers deliver toolbox talks?',
    answer:
      'Yes, and it is actually excellent practice to involve apprentices and junior workers in delivering toolbox talks. It builds their confidence, reinforces their own learning, and develops their communication skills. However, the content should be reviewed by a competent person before delivery to ensure accuracy, and a supervisor should be present to support the presenter and answer questions that go beyond their experience. Starting with a well-structured template makes this much easier for less experienced presenters.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under CDM 2015 Regulation 13, what duty is placed on contractors regarding worker instruction?',
    options: [
      'Contractors must provide workers with a written copy of the construction phase plan',
      'Contractors must provide suitable site inductions, information, and instruction to workers',
      'Contractors must ensure all workers hold a valid CSCS card',
      'Contractors must appoint a dedicated safety officer for every 10 workers',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Regulation 13 requires contractors to provide each worker under their control with appropriate supervision, instructions, and information. This includes suitable site inductions and ongoing instruction about the hazards they may encounter and the control measures in place. Toolbox talks are one of the principal methods for meeting this obligation in practice.',
  },
  {
    id: 2,
    question: 'What is the recommended maximum number of topics for a single toolbox talk?',
    options: [
      'One &mdash; a single, focused topic per talk',
      'Two to three related topics',
      'As many as time allows',
      'There is no recommendation &mdash; cover whatever is relevant',
    ],
    correctAnswer: 0,
    explanation:
      'Each toolbox talk should focus on a single topic. Covering multiple topics dilutes the message, reduces retention, and makes it harder for workers to take away a clear action point. If you need to cover multiple hazards, deliver separate talks on separate occasions. A focused five-minute talk on one topic is far more effective than a rambling fifteen-minute talk covering three.',
  },
  {
    id: 3,
    question:
      'Which of the following is the most effective opening for a toolbox talk on electrical isolation?',
    options: [
      'Reading the first three paragraphs of BS 7671 Regulation 537.2',
      'Describing a real incident where a worker was injured because isolation was not verified',
      'Asking attendees to read the risk assessment before you begin',
      'Stating "This talk is about electrical isolation" and moving straight to the content',
    ],
    correctAnswer: 1,
    explanation:
      'An effective opening hook grabs attention immediately and makes the topic feel relevant and urgent. Describing a real incident (anonymised where necessary) creates an emotional connection and demonstrates why the topic matters. It is far more engaging than reading regulations, distributing paperwork, or making a bland opening statement. The hook should take no more than 30 to 60 seconds before you move into the body of the talk.',
  },
  {
    id: 4,
    question: 'Why is two-way communication important during a toolbox talk?',
    options: [
      'It allows the presenter to finish the talk more quickly',
      'It is a legal requirement under CDM 2015 Regulation 13',
      'It increases engagement, checks understanding, and allows workers to share their own knowledge and concerns',
      'It reduces the amount of preparation the presenter needs to do',
    ],
    correctAnswer: 2,
    explanation:
      'Two-way communication transforms a toolbox talk from a lecture into a conversation. When workers contribute their own experiences, ask questions, and respond to check questions, they are actively engaged rather than passively listening. This significantly improves retention and also allows the presenter to identify misunderstandings, gather feedback on site conditions, and learn from the practical experience of the team.',
  },
  {
    id: 5,
    question: 'A toolbox talk on working at height should close with which of the following?',
    options: [
      'A summary of the Health and Safety at Work etc. Act 1974',
      'A specific action point the team can implement that day, and a check question to confirm understanding',
      'A request for attendees to read the full risk assessment in their own time',
      'A reminder that non-compliance will result in disciplinary action',
    ],
    correctAnswer: 1,
    explanation:
      'Every toolbox talk should close with a specific, practical action point that the team can put into practice immediately, and a check question to confirm that the key message has been understood. For example: "Before using any ladder today, check that the stiles extend at least 1 metre above the landing point. Quick question &mdash; what is the correct angle for a leaning ladder?" This ensures the talk leads to a real change in behaviour, not just a signature on a sheet.',
  },
  {
    id: 6,
    question:
      'Which of the following is the best visual aid for a toolbox talk on manual handling?',
    options: [
      'A 20-slide PowerPoint presentation with detailed text',
      'A live demonstration of the correct lifting technique using an actual load from the site',
      'A printed copy of the Manual Handling Operations Regulations 1992',
      'A poster from the HSE website displayed on a laptop screen',
    ],
    correctAnswer: 1,
    explanation:
      'A live demonstration using an actual load from the site is the most effective visual aid because it is directly relevant to the workers\u2019 daily tasks, it shows the technique in context, and it allows workers to practise the technique themselves under supervision. PowerPoint presentations are generally ineffective on site because they require equipment, are hard to see in daylight, and encourage passive listening rather than active engagement.',
  },
  {
    id: 7,
    question: 'What documentation should be recorded after delivering a toolbox talk?',
    options: [
      'Only the topic and the date',
      'Date, topic, presenter name, key points covered, and attendee signatures or initials',
      'A full written transcript of everything that was said',
      'No documentation is required &mdash; toolbox talks are informal',
    ],
    correctAnswer: 1,
    explanation:
      'A complete toolbox talk record should include the date, the topic, the presenter\u2019s name, the key points covered, any actions agreed, and the signatures or initials of all attendees. This provides evidence that workers received appropriate instruction (CDM 2015 Regulation 13), supports audit and inspection requirements, and creates a useful record for incident investigation if something goes wrong later.',
  },
  {
    id: 8,
    question:
      'Which of the following scenarios would be the most appropriate trigger for an unplanned toolbox talk?',
    options: [
      'It is Monday morning and the team has not had a talk for a week',
      'A near miss occurred yesterday when a cable was struck during excavation works',
      'A new apprentice asks what a toolbox talk is',
      'The site manager wants to discuss next month\u2019s programme',
    ],
    correctAnswer: 1,
    explanation:
      'A near miss is one of the strongest triggers for an unplanned toolbox talk. The incident is fresh, relevant, and provides a real example that the team can learn from. Delivering a talk immediately after a near miss reinforces the message while the event is still in everyone\u2019s mind and can prevent a recurrence. Other appropriate triggers include new hazards on site, changes in work methods, new workers joining the team, or following a serious incident elsewhere in the industry.',
  },
];

export default function CCModule3Section3() {
  useSEO({
    title: 'Delivering Effective Toolbox Talks | Communication & Confidence Module 3.3',
    description:
      'HSE toolbox talk guidance, CDM 2015 Regulation 13, talk structure, documentation requirements, and three complete toolbox talk templates for construction sites.',
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
            <Link to="../cc-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <HardHat className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Delivering Effective Toolbox Talks
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            HSE guidance on toolbox talks, CDM 2015 Regulation 13, structuring talks for maximum
            impact, documentation requirements, and complete templates for construction sites
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Duration:</strong> 5&ndash;10 minutes, one topic per talk
              </li>
              <li>
                <strong>Structure:</strong> Hook &rarr; single topic body &rarr; action/check
              </li>
              <li>
                <strong>Legal basis:</strong> CDM 2015 Regulation 13 &mdash; duty to instruct
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Principles</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Two-way:</strong> Encourage questions and contributions from the team
              </li>
              <li>
                <strong>Visual:</strong> Demonstrate, show photos, use the actual equipment
              </li>
              <li>
                <strong>Document:</strong> Date, topic, presenter, key points, attendee signatures
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the legal basis for toolbox talks under CDM 2015 Regulation 13 and HSE guidance',
              'Structure a toolbox talk using the opening hook, single topic body, and action/check close',
              'Deliver a talk within 5&ndash;10 minutes using two-way communication and visual aids',
              'Document toolbox talks with the required information for compliance and audit',
              'Identify appropriate triggers for planned and unplanned toolbox talks',
              'Use the three provided templates to deliver talks on electrical isolation, working at height, and manual handling',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Toolbox Talk? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            What Is a Toolbox Talk?
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A toolbox talk is a short, focused safety briefing delivered to a work team at or
                near the workplace. The HSE describes toolbox talks as one of the most effective
                methods of communicating health and safety information to workers on construction
                sites. Unlike formal training courses, toolbox talks are informal, practical, and
                directly relevant to the work being carried out that day or that week.
              </p>

              <p>
                The term &ldquo;toolbox talk&rdquo; comes from the idea of workers gathering around
                the toolbox before starting work. In practice, they are delivered in site cabins,
                welfare areas, or directly at the point of work. The key characteristic is that they
                are <strong>short</strong> (5&ndash;10 minutes),{' '}
                <strong>focused on a single topic</strong>, and <strong>interactive</strong> rather
                than a one-way lecture.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    CDM 2015 Regulation 13 &mdash; Duties of Contractors
                  </p>
                </div>
                <div className="text-sm text-white space-y-2">
                  <p>
                    The Construction (Design and Management) Regulations 2015 (CDM 2015) place a
                    specific duty on contractors regarding worker instruction. Regulation 13
                    requires that contractors must provide each worker under their control with
                    appropriate:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>
                        <strong>Supervision</strong> &mdash; proportionate to the risk and the
                        worker&rsquo;s competence
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>
                        <strong>Instructions</strong> &mdash; clear, specific, and in a form the
                        worker can understand
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>
                        <strong>Information</strong> &mdash; about the risks they face and the
                        control measures in place
                      </span>
                    </li>
                  </ul>
                  <p>
                    Toolbox talks are one of the principal methods contractors use to demonstrate
                    compliance with Regulation 13 in practice. A well-documented toolbox talk
                    programme provides strong evidence that workers have received appropriate
                    instruction.
                  </p>
                </div>
              </div>

              <p>
                In addition to CDM 2015, the Health and Safety at Work etc. Act 1974 Section 2
                places a general duty on employers to provide information, instruction, training,
                and supervision to ensure the health and safety of their employees. Toolbox talks
                contribute to meeting this duty as well.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Structure of an Effective Toolbox Talk */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Structure of an Effective Toolbox Talk
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most effective toolbox talks follow a simple three-part structure. This
                structure keeps the talk focused, engaging, and practical. It also makes preparation
                much easier &mdash; once you know the structure, you can plan a talk in 10 to 15
                minutes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">The Three-Part Structure</p>
                <div className="space-y-4">
                  {/* Opening Hook */}
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">
                        Part 1: Opening Hook (30&ndash;60 Seconds)
                      </p>
                    </div>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        The opening hook grabs attention and makes the topic feel relevant and
                        urgent. It should take no more than 30 to 60 seconds.
                      </p>
                      <p className="font-medium">Effective hooks include:</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>A real incident or near miss (anonymised where necessary)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            A surprising statistic (&ldquo;Last year, 40 construction workers died
                            from falls from height&rdquo;)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            A question to the group (&ldquo;Has anyone here ever had a near miss
                            with isolation?&rdquo;)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>A photograph of a relevant hazard from the actual site</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Single Topic Body */}
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardList className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">
                        Part 2: Single Topic Body (3&ndash;7 Minutes)
                      </p>
                    </div>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        The body of the talk covers one topic in practical detail. Resist the
                        temptation to cover multiple topics &mdash; a focused message is far more
                        memorable than a scattered one.
                      </p>
                      <p className="font-medium">Effective body content includes:</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>What the hazard is and why it matters on this particular site</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>What the control measures are and how to implement them</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>A live demonstration or visual aid where possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            Questions to the team &mdash; &ldquo;What would you do
                            if&hellip;?&rdquo;
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>Common mistakes and how to avoid them</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Close with Action/Check */}
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-medium text-rose-400">
                        Part 3: Close with Action/Check (1&ndash;2 Minutes)
                      </p>
                    </div>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        The close is the most important part of the talk. It gives the team
                        something concrete to take away and checks that the key message has landed.
                      </p>
                      <p className="font-medium">Every close should include:</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            <strong>Action point:</strong> A specific, practical thing the team
                            should do today (&ldquo;Before using any ladder today, check that the
                            stiles extend at least 1 metre above the landing point&rdquo;)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            <strong>Check question:</strong> A question that requires a specific
                            answer, not just &ldquo;yes&rdquo; or &ldquo;no&rdquo; (&ldquo;What is
                            the correct angle for a leaning ladder?&rdquo;)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                          <span>
                            <strong>Invitation:</strong> &ldquo;If you see anything that does not
                            look right, speak up immediately&rdquo;
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Duration:</strong> The HSE recommends keeping
                  toolbox talks to <strong>5&ndash;10 minutes</strong>. This is long enough to cover
                  a single topic in meaningful detail, but short enough to maintain attention and
                  fit into the working day. If you find yourself going beyond 10 minutes, you are
                  probably trying to cover too much &mdash; split it into two separate talks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Two-Way Communication & Visual Aids */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Two-Way Communication &amp; Visual Aids
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A toolbox talk should be a conversation, not a lecture. The HSE emphasises that
                two-way communication is essential for effective safety briefings. When workers
                actively participate, they are more engaged, more likely to remember the content,
                and more likely to raise concerns or share their own experience.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Two-Way Communication</p>
                  </div>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Ask open questions: &ldquo;What hazards can you see?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Invite contributions: &ldquo;Has anyone experienced this?&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Use check questions to verify understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Acknowledge contributions and thank people for speaking up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Allow time for questions at the end</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Visual Aids</p>
                  </div>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Live demonstrations with actual site equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Photographs of site-specific hazards or good practice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>The actual PPE, tools, or materials being discussed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Simple diagrams or laminated cards (not lengthy slide decks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>A damaged or defective item as a real-world example</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Language &amp; Accessibility</p>
                </div>
                <p className="text-sm text-white">
                  CDM 2015 Regulation 13 requires that information and instruction be provided in a
                  form that workers can understand. Use simple, clear language. Avoid jargon unless
                  you explain it. If workers do not speak English as their first language, use
                  visual aids, demonstrations, translated materials, or an interpreter. Check
                  understanding with specific questions rather than &ldquo;Does everyone
                  understand?&rdquo; &mdash; a question that requires a factual answer is far more
                  reliable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Documentation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Documentation Requirements
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Documenting toolbox talks is essential for legal compliance, audit evidence, and
                incident investigation. A well-maintained record demonstrates that your organisation
                takes worker instruction seriously and provides strong evidence of compliance with
                CDM 2015 Regulation 13.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">What to Record</p>
                </div>
                <div className="space-y-2">
                  {[
                    'Date and time of the talk',
                    'Topic covered (one per record)',
                    'Presenter\u2019s name and role',
                    'Key points covered during the talk',
                    'Any questions raised and answers given',
                    'Actions agreed (what, who, by when)',
                    'Attendee names and signatures or initials',
                    'Site name and location',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Record Retention:</strong> Keep toolbox talk
                  records for the duration of the project and for a reasonable period afterwards.
                  Many organisations retain records for at least six years (the standard limitation
                  period for civil claims). In practice, keeping them indefinitely in digital format
                  is simple and costs nothing. These records can be invaluable if an incident occurs
                  months or years later and you need to demonstrate what instruction was provided.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">When to Deliver (Planned)</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Weekly as part of the site safety programme</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>Before starting a new phase of work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>When seasonal hazards change (heat, cold, dark mornings)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">When to Deliver (Reactive)</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>After a near miss or incident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>When new workers join the team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                      <span>When work methods, equipment, or site conditions change</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Toolbox Talk Templates */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Toolbox Talk Templates
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following three complete toolbox talk templates demonstrate the three-part
                structure in practice. Each template covers a common construction site topic and can
                be delivered in 5&ndash;10 minutes. You can use these templates as provided or adapt
                them to your specific site conditions.
              </p>

              {/* Template 1: Electrical Isolation */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30">
                    <span className="text-rose-400 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Electrical Isolation</p>
                    <p className="text-xs text-white">Duration: approximately 7 minutes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Opening Hook
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;Last month, a worker on another site received a serious electric shock
                      because a circuit they believed was dead had been switched back on by another
                      trade. They were in hospital for three days. This is not unusual &mdash; the
                      HSE reports that contact with live electrical parts is one of the leading
                      causes of fatal and serious injury on construction sites. Today, we are going
                      to talk about how to isolate properly so that this does not happen to any of
                      us.&rdquo;
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                      Single Topic Body
                    </p>
                    <ul className="text-sm text-white space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Step 1:</strong> Identify the circuit to be worked on. Check the
                          distribution board schedule and trace the circuit if there is any doubt.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Step 2:</strong> Switch off and isolate at the distribution board
                          or consumer unit. Use the correct isolator &mdash; not just the MCB.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Step 3:</strong> Lock off with a personal lock and tag. Your lock,
                          your key, your life. Never rely on someone else&rsquo;s lock.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Step 4:</strong> Prove dead at the point of work using a voltage
                          indicator that has been proved immediately before and after testing (the
                          &ldquo;prove &ndash; test &ndash; prove&rdquo; method).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Key message:</strong> Never assume a circuit is dead. Always prove
                          it yourself. Never rely on someone else telling you it is isolated.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Close &mdash; Action &amp; Check
                    </p>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        <strong>Action:</strong> &ldquo;Before working on any circuit today, I want
                        every one of you to prove dead at the point of work &mdash; even if someone
                        has already told you it is isolated.&rdquo;
                      </p>
                      <p>
                        <strong>Check question:</strong> &ldquo;What three steps make up the
                        prove&ndash;test&ndash;prove method?&rdquo; (Answer: prove the voltage
                        indicator works on a known live source, test the circuit to confirm it is
                        dead, prove the voltage indicator still works on the known live source.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template 2: Working at Height */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30">
                    <span className="text-rose-400 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Working at Height</p>
                    <p className="text-xs text-white">Duration: approximately 8 minutes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Opening Hook
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;Falls from height are the single biggest killer of construction workers
                      in the UK. Last year, 40 workers died from falls on construction sites. Many
                      more suffered life-changing injuries &mdash; broken spines, fractured skulls,
                      permanent disability. And in most cases, the fall was preventable. Today we
                      are going to talk about the simple checks that can stop you becoming a
                      statistic.&rdquo;
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                      Single Topic Body
                    </p>
                    <ul className="text-sm text-white space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Hierarchy:</strong> Avoid work at height wherever possible. If you
                          cannot avoid it, use collective protection (scaffolding, edge protection)
                          before personal protection (harness). Ladders are a last resort for
                          short-duration work only.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Ladders:</strong> Set at 75 degrees (1 out for every 4 up). Stiles
                          must extend at least 1 metre above the landing point. Secure at the top,
                          bottom, or have someone foot the ladder. Three points of contact at all
                          times.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Stepladders:</strong> Use on firm, level ground only. Do not work
                          off the top two steps. Do not overreach &mdash; your belt buckle should
                          stay within the stiles.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Inspection:</strong> Check every ladder and platform before use.
                          Look for bent or cracked stiles, missing rungs, damaged feet, and worn
                          locking mechanisms. If it is damaged, take it out of service immediately
                          &mdash; tie a &ldquo;DO NOT USE&rdquo; tag to it.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Fragile surfaces:</strong> Never step on a surface you have not
                          confirmed can take your weight. Roof lights, ceiling tiles, corrugated
                          sheeting, and asbestos cement can all give way without warning.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Close &mdash; Action &amp; Check
                    </p>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        <strong>Action:</strong> &ldquo;Before using any ladder today, check that
                        the stiles extend at least 1 metre above the landing point and that the
                        ladder is secured or footed. If it is not right, do not use it &mdash;
                        report it.&rdquo;
                      </p>
                      <p>
                        <strong>Check question:</strong> &ldquo;What is the correct angle for
                        setting up a leaning ladder?&rdquo; (Answer: 75 degrees &mdash; 1 out for
                        every 4 up.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template 3: Manual Handling */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30">
                    <span className="text-rose-400 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Manual Handling</p>
                    <p className="text-xs text-white">Duration: approximately 6 minutes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Opening Hook
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;Musculoskeletal disorders &mdash; back injuries, shoulder injuries,
                      knee problems &mdash; are the single biggest cause of work-related ill health
                      in the construction industry. Over a third of all construction injuries are
                      caused by manual handling. And unlike a broken bone, a back injury can become
                      a chronic condition that affects you for the rest of your working life. Today
                      we are going to look at how to protect your back when lifting and carrying on
                      site.&rdquo;
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                      Single Topic Body
                    </p>
                    <ul className="text-sm text-white space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>TILE assessment:</strong> Before lifting, think: Task (what am I
                          lifting, how far?), Individual (am I fit to lift this?), Load (how heavy,
                          what shape, any sharp edges?), Environment (slippery floor, steps,
                          restricted space?).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Avoid first:</strong> Can you eliminate the lift? Use a trolley,
                          sack truck, mechanical aid, or get the delivery driver to place it closer
                          to where it is needed.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Correct technique:</strong> Feet shoulder-width apart, bend at the
                          knees (not the waist), get a firm grip, keep the load close to your body,
                          lift smoothly using your legs, avoid twisting &mdash; move your feet to
                          turn.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Team lifts:</strong> If the load is too heavy for one person, use
                          a two-person lift. Agree who gives the commands before you start. Use
                          &ldquo;Ready, steady, lift&rdquo; &mdash; the same command every time.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white flex-shrink-0" />
                        <span>
                          <strong>Cable drums:</strong> A common electrical hazard &mdash; cable
                          drums are heavy and awkward. Never try to lift a full drum alone. Use a
                          drum stand, trolley, or ask for help. Roll drums rather than carrying them
                          where possible.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">
                      Close &mdash; Action &amp; Check
                    </p>
                    <div className="text-sm text-white space-y-2">
                      <p>
                        <strong>Action:</strong> &ldquo;Before lifting anything heavy today, take
                        five seconds to run through TILE in your head. If you cannot lift it safely
                        alone, ask for help &mdash; there is no shame in that.&rdquo;
                      </p>
                      <p>
                        <strong>Check question:</strong> &ldquo;What do the four letters in TILE
                        stand for?&rdquo; (Answer: Task, Individual, Load, Environment.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Common Mistakes to Avoid
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even experienced supervisors and managers can fall into habits that undermine the
                effectiveness of their toolbox talks. Avoiding these common mistakes will
                significantly improve the impact of your safety briefings.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-base font-semibold text-red-400">What NOT to Do</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      action: 'Do NOT cover multiple topics in one talk',
                      reason:
                        'Covering three topics in 10 minutes means each one gets three minutes and none of them land. One topic, one message, one action point.',
                    },
                    {
                      action: 'Do NOT just read from a script',
                      reason:
                        'Reading a pre-written script in a monotone voice kills engagement. Use bullet points as prompts and talk naturally. Make eye contact.',
                    },
                    {
                      action: 'Do NOT deliver talks as a tick-box exercise',
                      reason:
                        'If the team can see you are just getting signatures to keep the auditor happy, they will switch off. Make every talk genuinely useful.',
                    },
                    {
                      action: 'Do NOT skip the close',
                      reason:
                        'A talk without an action point and a check question is just information. The close is what turns information into behaviour change.',
                    },
                    {
                      action: 'Do NOT ignore questions or feedback',
                      reason:
                        'If a worker raises a concern during a toolbox talk and nothing happens, they will not speak up again. Follow up on every action.',
                    },
                    {
                      action: 'Do NOT deliver talks in noisy or distracting locations',
                      reason:
                        'If the team cannot hear you or is distracted by other work, the talk is wasted. Find a quiet area or wait for a natural break.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-red-300 mb-1">{item.action}</p>
                      <p className="text-xs text-white">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Preparation Time</p>
                </div>
                <p className="text-sm text-white">
                  A good toolbox talk takes only <strong>10 to 15 minutes to prepare</strong>. Know
                  your topic, write down 3&ndash;5 bullet points for the body, plan your opening
                  hook and your closing action/check, and gather any visual aids. You do not need a
                  polished presentation &mdash; authenticity and practical relevance are far more
                  important than polish.
                </p>
              </div>
            </div>
          </div>
        </section>

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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
