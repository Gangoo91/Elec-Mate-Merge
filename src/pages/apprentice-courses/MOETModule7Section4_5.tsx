import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Professional Conduct and Attitude - MOET Module 7 Section 4.5';
const DESCRIPTION =
  'Developing and demonstrating professional conduct, work ethic and attitude for the engineering workplace and EPA: reliability, integrity, accountability, continuous development and representing the profession positively under ST1426.';

const quickCheckQuestions = [
  {
    id: 'conduct-meaning',
    question: "What does 'professional conduct' mean in engineering maintenance?",
    options: [
      'Holding the highest level of technical qualification available, since competence alone defines professionalism',
      'Consistently behaving in a way that upholds the standards of the engineering profession',
      'Behaving correctly only while being directly observed by a supervisor or assessor',
      'Completing tasks as quickly as possible, even if some procedural steps have to be skipped',
    ],
    correctIndex: 1,
    explanation:
      'Professional conduct is about how you behave consistently, not just your technical ability. It encompasses reliability (turning up, meeting commitments), integrity (being honest, doing quality work even when no one is watching), accountability (owning your actions and mistakes), respect (treating everyone appropriately), and a positive, constructive attitude to work and learning.',
  },
  {
    id: 'conduct-safety',
    question: 'How does professional conduct relate to safety in engineering maintenance?',
    options: [
      'Professional conduct treats safety as non-negotiable, with no shortcuts regardless of time pressure',
      'Safety procedures can be relaxed by an experienced technician, as professionalism brings the judgement to know when shortcuts are acceptable',
      'Safety is the responsibility of the supervisor alone, so a professional technician simply follows whatever instructions they are given',
      'Professional conduct and safety are separate matters — conduct is about behaviour towards people, while safety is purely a technical concern',
    ],
    correctIndex: 0,
    explanation:
      'Safety is the foundation of professional engineering conduct. A professional technician follows safe working practices every time — not just when being observed. This means consistent use of safe isolation, correct PPE, adherence to permits, and the willingness to stop work or challenge others when safety is compromised.',
  },
  {
    id: 'conduct-development',
    question:
      'Why is commitment to continuous professional development (CPD) part of professional conduct?',
    options: [
      'Once you have passed your apprenticeship your competence is fixed, so CPD is only relevant to those seeking promotion',
      'CPD is purely an employer responsibility, so technicians need only attend whatever mandatory training is arranged for them',
      'CPD is about collecting certificates to impress clients rather than maintaining genuine competence',
      'Technology and regulations evolve, so maintaining your competence through ongoing learning is a professional obligation',
    ],
    correctIndex: 3,
    explanation:
      'Professional engineers have a duty to maintain their competence. Regulations change (BS 7671 is updated regularly), technology evolves (new control systems, renewable energy systems), and best practices improve. CPD ensures you remain competent and safe. Taking ownership of your own development — not just waiting for employer-provided training — demonstrates professional maturity.',
  },
  {
    id: 'conduct-mistakes',
    question: 'When you make a genuine mistake at work, what does professional conduct require?',
    options: [
      'Quietly correct it yourself and avoid mentioning it, so that your reputation for reliable work is not damaged',
      'Wait to see whether anyone notices before deciding whether the mistake needs to be reported at all',
      'Move on to the next task immediately, since dwelling on errors slows the team down and lowers morale',
      'Acknowledge the mistake promptly and honestly, correct it, and inform your supervisor if needed',
    ],
    correctIndex: 3,
    explanation:
      'Everyone makes mistakes — what defines a professional is how they handle them. Take corrective action where possible and learn from the experience to prevent recurrence. Prompt acknowledgement prevents the consequences from worsening. Corrective action demonstrates responsibility. Informing your supervisor ensures safety is maintained. Learning from the experience shows growth. The EPA assessor values honest, accountable behaviour far more than a pretence of perfection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Professional reliability in the workplace means:',
    options: [
      'Taking on as many tasks as possible at once to show willingness, even if some are left unfinished',
      'Consistently meeting commitments so colleagues and supervisors can trust you to deliver',
      'Always agreeing to whatever you are asked, regardless of whether you can realistically deliver it',
      'Only committing to tasks you are certain to enjoy, so your motivation never drops below a high level',
    ],
    correctAnswer: 1,
    explanation:
      'Reliability is about consistency and trust: doing what you say you will do, when you say you will do it, to the standard expected. It is one of the most valued professional attributes because it enables effective teamwork and planning. The assessor looks for evidence of reliable behaviour throughout your apprenticeship.',
  },
  {
    id: 2,
    question: 'Integrity in engineering maintenance includes:',
    options: [
      'Following procedures only when a supervisor is present, and relaxing standards once you are working unsupervised',
      'Recording a test result as satisfactory based on experience of similar equipment, even when you did not actually take the measurement',
      'Doing quality work when unobserved, recording results accurately, and never signing off substandard work',
      'Signing off work that is almost finished as complete, on the basis that the remaining steps are minor and unlikely to matter',
    ],
    correctAnswer: 2,
    explanation:
      'Integrity means doing the right thing regardless of who is watching. In maintenance, this includes: recording genuine test results (not fabricating readings), completing all steps of a procedure even if some seem unnecessary, being honest about errors, and never certifying work that does not meet standards. This is both a professional and safety obligation.',
  },
  {
    id: 3,
    question: 'When you make a mistake at work, professional conduct requires:',
    options: [
      'Quietly correcting the mistake yourself and saying nothing, so that your reputation for reliable work is not damaged',
      'Waiting to see whether anyone notices before deciding whether the mistake needs to be reported at all',
      'Looking for a way to attribute the error to faulty equipment or unclear instructions so that the blame does not fall on you',
      'Acknowledging the mistake promptly, taking steps to correct it, informing your supervisor if there are safety or quality implications, and learning from the experience to prevent recurrence',
    ],
    correctAnswer: 3,
    explanation:
      'Everyone makes mistakes. What distinguishes a professional is how they handle them: acknowledge promptly (before the consequences worsen), take corrective action, inform those who need to know (especially if safety is affected), and learn from the experience. Hiding mistakes creates safety risks and destroys trust.',
  },
  {
    id: 4,
    question: 'Respecting diversity in the workplace means:',
    options: [
      'Treating colleagues with dignity, valuing different perspectives, and challenging discrimination appropriately',
      'Expecting everyone to adapt to a single way of communicating and working, since consistency matters more than accommodating differences',
      'Treating colleagues respectfully only while a manager is watching, and ignoring inappropriate behaviour the rest of the time',
      'Avoiding working with anyone whose background or communication style differs from your own, to reduce the chance of misunderstandings',
    ],
    correctAnswer: 0,
    explanation:
      'Engineering teams include people from diverse backgrounds, with different experiences, perspectives and communication styles. Professional conduct means treating everyone with respect, recognising that diversity brings different strengths, adapting your communication appropriately, and having the courage to challenge inappropriate behaviour. This creates a safer, more productive workplace.',
  },
  {
    id: 5,
    question: 'Professional appearance and presentation in engineering includes:',
    options: [
      'Wearing whatever is most comfortable on site, since appearance has no bearing on how your work or your employer is judged',
      'Wearing PPE correctly, keeping clothing and work areas presentable, and representing your employer positively',
      'Putting on the correct PPE only for client visits, and working without it when no customer is present',
      'Keeping your work area tidy only at the end of the apprenticeship when the assessor is due to observe you',
    ],
    correctAnswer: 1,
    explanation:
      'Professional presentation includes correct PPE use (safety and professionalism), clean and appropriate work clothing, tidy work areas (safety and efficiency), and generally presenting yourself as a competent, organised professional. This matters whether you are on a client site, in a plant room, or working alongside production staff.',
  },
  {
    id: 6,
    question: 'Accountability as a professional behaviour means:',
    options: [
      'Accepting responsibility only for the parts of a job that went well, while distancing yourself from anything that went wrong',
      'Pointing to your supervisor or the instructions you were given whenever the outcome of your work is questioned',
      'Taking ownership of your work, decisions and their outcomes — accepting responsibility for both successes and problems, and not deflecting blame onto others',
      'Only being answerable for your work during a formal review or audit, rather than from day to day',
    ],
    correctAnswer: 2,
    explanation:
      'Accountability means owning your work: if you complete a task, you are responsible for its quality. If something goes wrong as a result, you acknowledge your role and work to fix it. If something goes well, you can rightfully take credit. The assessor looks for evidence that you take ownership of your work throughout the apprenticeship.',
  },
  {
    id: 7,
    question: 'A positive attitude to work in engineering maintenance is demonstrated by:',
    options: [
      'Appearing constantly cheerful and never raising any concerns, even about genuine safety or workload problems',
      'Taking on only the interesting jobs willingly while avoiding or complaining about routine and unpopular tasks',
      'Pushing yourself to work flat out at all times, treating tiredness or routine work as signs of a poor attitude',
      'Approaching tasks willingly, learning from challenges, and staying motivated even when work is routine',
    ],
    correctAnswer: 3,
    explanation:
      'A positive attitude is not about being unrealistically cheerful — it is about approaching work constructively. This means: being willing to tackle tasks (including unpopular ones), viewing challenges as learning opportunities, supporting rather than undermining colleagues, and maintaining professional motivation. This attitude is noticed and valued by employers and assessors alike.',
  },
  {
    id: 8,
    question: 'Environmental responsibility as part of professional conduct includes:',
    options: [
      'Disposing of waste correctly, minimising energy use, and considering the environmental impact of decisions',
      'Disposing of used oils and fluorescent tubes with general waste, since separating hazardous materials slows the job down',
      'Treating environmental rules as the employer’s concern alone, so a technician need only act on them when specifically instructed',
      'Leaving any spill or contamination for the cleaning team to deal with rather than containing it yourself',
    ],
    correctAnswer: 0,
    explanation:
      'Engineering maintenance has significant environmental responsibilities: correct disposal of oils, solvents, fluorescent tubes and electronic waste; minimising energy consumption during maintenance activities; preventing spills and contamination; and considering environmental impact when selecting replacement components or materials. These are legal obligations and professional responsibilities.',
  },
  {
    id: 9,
    question: 'Continuous professional development (CPD) as an apprentice might include:',
    options: [
      'Waiting until you have qualified before doing any CPD, since development is only relevant once your apprenticeship is complete',
      'Actively seeking learning, reading industry publications, and setting personal improvement goals',
      'Collecting as many training certificates as possible to impress clients, regardless of whether you actually learned anything',
      'Attending only the mandatory training your employer arranges, and never reading or researching anything beyond the set curriculum',
    ],
    correctAnswer: 1,
    explanation:
      'CPD starts during the apprenticeship and continues throughout your career. As an apprentice, this includes: reading industry publications (e.g., IET Wiring Matters), attending additional training when available, researching topics that interest you, setting personal development goals, and reflecting on your learning in your portfolio. Taking ownership of your development demonstrates professional maturity.',
  },
  {
    id: 10,
    question: 'Professional conduct during the EPA itself includes:',
    options: [
      'Bending safe-working rules to finish practical tasks faster, since speed is what the assessor is mainly looking for',
      'Guessing confidently at any question you are unsure of rather than admitting you do not know the answer',
      'Being punctual and prepared, communicating respectfully, working safely, and answering questions honestly',
      'Behaving formally only at the start, then relaxing your professional standards once the assessment is under way',
    ],
    correctAnswer: 2,
    explanation:
      'Your professional conduct during the EPA is directly observed and assessed: punctuality, preparation, appearance, communication, safety behaviour, honesty, and attitude. The assessor notes how you interact with them and others, how you handle the pressure of assessment, and whether your professional behaviours are genuine and consistent — not just performed for the assessment.',
  },
  {
    id: 11,
    question: 'If you witness a colleague behaving unsafely, professional conduct requires:',
    options: [
      'Saying nothing, since challenging a more experienced colleague is not an apprentice’s place',
      'Ignoring it unless the colleague is in your own team, as other teams’ safety is not your responsibility',
      'Waiting until an accident actually happens before raising the matter, so you have firm proof of the risk',
      'Raising the concern appropriately — speaking to the colleague directly, or reporting it to a supervisor',
    ],
    correctAnswer: 3,
    explanation:
      "Challenging unsafe behaviour is a professional obligation, not optional. If safe to do so, speak to the colleague directly and constructively ('I noticed you did not lock off — shall we do that before continuing?'). If the situation is immediately dangerous, intervene to prevent harm. If direct intervention is not appropriate, report to a supervisor. This demonstrates the professional courage the EPA assessor looks for.",
  },
  {
    id: 12,
    question:
      'Professional registration (such as EngTech with the IET) after completing your apprenticeship:',
    options: [
      'Gives formal recognition of your competence, requires ongoing CPD, and enhances your career prospects',
      'Is a legal requirement for any maintenance technician, and you cannot work unsupervised without it',
      'Is awarded automatically on completion of the EPA, with no further application or evidence of CPD needed',
      'Is a one-off qualification that, once gained, never needs to be maintained or supported by ongoing development',
    ],
    correctAnswer: 0,
    explanation:
      'EngTech registration with the IET or IMechE is a valuable next step after completing your apprenticeship. It provides formal professional recognition, requires you to maintain CPD records (reinforcing good habits), enhances your credibility with employers and clients, and demonstrates your commitment to professional standards. Many employers actively support registration for their technicians.',
  },
];

const faqs = [
  {
    question: 'How is professional conduct assessed in the EPA if it is not a separate test?',
    answer:
      'Professional conduct is assessed holistically across all EPA components. During the practical observation, the assessor notes your safety behaviour, communication, organisation and attitude. In the professional discussion, they explore situations where you demonstrated (or struggled with) professional behaviours. Your portfolio evidence should include examples of professional conduct in various situations. It is woven through the entire assessment, not tested separately.',
  },
  {
    question: 'What if I disagree with my supervisor about the right approach to a task?',
    answer:
      'Professional disagreement is handled through respectful communication: explain your reasoning, listen to their perspective, and discuss the options. If it is a safety concern, you have a professional obligation to raise it clearly. If it is a technical preference, be open to learning from their experience. Documenting this type of professional interaction — and its resolution — can be excellent EPA evidence of communication and professional conduct.',
  },
  {
    question: 'Does professional conduct matter as much as technical skills for the EPA grade?',
    answer:
      'Yes. The EPA assessment plan weights professional behaviours alongside technical skills. A technically competent apprentice who demonstrates poor safety habits, unreliable attendance, or unprofessional communication will not achieve the highest grades. Conversely, strong professional behaviours can compensate for minor technical weaknesses. The ideal candidate demonstrates both strong technical skills and exemplary professional conduct.',
  },
  {
    question: 'How do I evidence professional conduct in my portfolio?',
    answer:
      'Include specific examples: witness statements commenting on your professionalism, activity log entries describing how you handled a difficult situation professionally, reflective accounts about times you demonstrated integrity or accountability, and evidence of CPD activities you undertook voluntarily. The key is specific, concrete examples rather than general statements about your character.',
  },
  {
    question: 'What if my workplace has a poor professional culture — how does that affect me?',
    answer:
      'You are responsible for your own professional conduct regardless of your workplace culture. If others cut corners, you still follow procedures. If communication is poor, you still communicate professionally. Maintaining your professional standards in a challenging environment is actually stronger evidence of genuine professional conduct than being professional in an already excellent workplace. Discuss any concerns with your training provider.',
  },
];

const MOETModule7Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Conduct and Attitude
          </h1>
          <p className="text-white">
            Demonstrating reliability, integrity and professionalism as a competent engineering
            maintenance technician
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Reliability:</strong> Consistent, dependable performance
              </li>
              <li className="pl-1">
                <strong>Integrity:</strong> Quality work, honesty, doing right unseen
              </li>
              <li className="pl-1">
                <strong>Accountability:</strong> Owning your work and its outcomes
              </li>
              <li className="pl-1">
                <strong>Development:</strong> Commitment to continuous learning
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              EPA Assessment Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Holistic:</strong> Assessed across all three EPA components
              </li>
              <li className="pl-1">
                <strong>Observation:</strong> Safety, communication, attitude noted
              </li>
              <li className="pl-1">
                <strong>Discussion:</strong> Explore situations requiring professionalism
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Core behaviour throughout the standard
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Understand the components of professional conduct in engineering maintenance',
              'Demonstrate reliability, integrity and accountability in your daily work',
              'Maintain professional safety standards regardless of external pressure',
              'Show commitment to continuous professional development from the start',
              'Evidence professional conduct effectively in your EPA portfolio',
              'Handle challenging professional situations with maturity and appropriate action',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Professional Conduct Means
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional conduct is not a separate skill you switch on for assessments — it is how
              you behave every day. It encompasses your attitude to work, your treatment of others,
              your commitment to standards, and your approach to your own development. The best
              technicians demonstrate professional conduct so consistently that it becomes invisible
              — it is simply how they work.
            </p>

            <p>
              In engineering maintenance, professional conduct has particular weight because of the
              safety implications of the work. A technician who cuts corners, fabricates test
              results, or works beyond their competence is not just behaving unprofessionally — they
              are creating genuine danger for themselves, their colleagues, and the public.
              Professional conduct in engineering is, at its core, a safety behaviour.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Pillars of Professional Conduct
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Reliability:</strong> Being dependable — arriving on time, meeting
                  commitments, completing work to standard, being consistent
                </li>
                <li className="pl-1">
                  <strong>Integrity:</strong> Being honest and ethical — accurate reporting, quality
                  work regardless of supervision, admitting errors
                </li>
                <li className="pl-1">
                  <strong>Accountability:</strong> Owning your work — taking responsibility for
                  outcomes, not deflecting blame, learning from mistakes
                </li>
                <li className="pl-1">
                  <strong>Respect:</strong> Treating everyone with dignity — colleagues, clients,
                  supervisors, contractors, the public
                </li>
                <li className="pl-1">
                  <strong>Safety commitment:</strong> Making safety non-negotiable — consistent safe
                  practices, challenging unsafe behaviour
                </li>
                <li className="pl-1">
                  <strong>Continuous improvement:</strong> Always learning — seeking development,
                  reflecting on practice, improving your skills
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Professional Conduct vs Compliance
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Compliance (Minimum)
                      </th>
                      <th className="border border-white/10 px-3 py-2 text-left">
                        Professional Conduct (Standard)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Follows rules when observed
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Follows rules consistently, observed or not
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Does what is required</td>
                      <td className="border border-white/10 px-3 py-2">
                        Actively seeks to do work well
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Reports only what is asked for
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Proactively reports hazards and issues
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Attends mandatory training
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Actively seeks development opportunities
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        Admits mistakes when caught
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Acknowledges mistakes promptly and learns
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Professional conduct is about character, not performance.
              The assessor is looking for genuine, embedded professional behaviour — not someone who
              is on their best behaviour for the assessment and different the rest of the time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety as Professional Conduct
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In engineering maintenance, safety is not just a set of rules — it is a professional
              obligation. A professional technician treats safe working practices as non-negotiable,
              regardless of time pressure, convenience, or what others around them are doing. This
              is perhaps the most important aspect of professional conduct in our industry.
            </p>

            <p>
              The test of genuine safety commitment is what you do when nobody is watching. If you
              follow the same procedures whether your supervisor is present or not, your safety
              behaviour is genuine professional conduct. If it changes when you are unsupervised, it
              is mere compliance — and compliance fails when pressure mounts.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Safety as Professional Behaviour
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Consistent practice:</strong> Follow safe isolation, PPE requirements and
                  permit procedures every time, without exception
                </li>
                <li className="pl-1">
                  <strong>Challenge unsafe acts:</strong> Speak up when you see unsafe behaviour —
                  this requires professional courage
                </li>
                <li className="pl-1">
                  <strong>Report hazards:</strong> Proactively identify and report safety concerns,
                  even if they are not your direct responsibility
                </li>
                <li className="pl-1">
                  <strong>Resist pressure:</strong> Never compromise safety to meet deadlines, save
                  time, or please others
                </li>
                <li className="pl-1">
                  <strong>Lead by example:</strong> Your safe behaviour influences those around you,
                  especially less experienced workers
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">
                Integrity in Testing and Recording
              </p>
              <p className="text-sm text-white">
                Fabricating test results, signing off work you have not fully completed, or
                recording readings you did not take are serious professional misconduct with real
                safety consequences. If an insulation resistance reading is recorded as satisfactory
                when it was not actually measured, a dangerous fault could remain undetected.
                Professional integrity in testing and recording is not just about honesty — it is
                about protecting lives.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The test of professional safety conduct is what you do
              when no one is watching. If you follow the same safe procedures whether the supervisor
              is present or not, your safety behaviour is genuine. If it changes, it is compliance
              rather than conduct.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Continuous Professional Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional development is not something that ends when you pass the EPA — it
              continues throughout your career. Starting your CPD habits during the apprenticeship
              demonstrates professional maturity and ensures you are well prepared for the
              expectations of a qualified technician.
            </p>

            <p>
              The engineering industry evolves continuously. Regulations are updated (BS 7671 has
              regular amendments), new technologies emerge (renewable energy systems, smart building
              controls, battery storage), and best practices improve as the industry learns from
              incidents and research. A professional technician stays current — not just through
              employer-provided training, but through their own initiative.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                CPD Activities During Your Apprenticeship
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Industry publications:</strong> Read IET Wiring Matters, trade magazines,
                  and relevant technical content
                </li>
                <li className="pl-1">
                  <strong>Regulation updates:</strong> Stay informed about changes to BS 7671,
                  health and safety regulations, and industry standards
                </li>
                <li className="pl-1">
                  <strong>Additional training:</strong> Attend voluntary training courses,
                  manufacturer training, webinars or seminars
                </li>
                <li className="pl-1">
                  <strong>Technical research:</strong> Investigate topics beyond the minimum
                  curriculum — new technologies, alternative approaches
                </li>
                <li className="pl-1">
                  <strong>Professional registration:</strong> Consider EngTech registration with the
                  IET or IMechE after completing your apprenticeship
                </li>
                <li className="pl-1">
                  <strong>Reflective practice:</strong> Regularly reflect on your development — what
                  have you learned? What do you need to learn next?
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> CPD is a shared responsibility between you and your
              employer, but you should take ownership. Do not wait for training to be offered — seek
              it out. The apprentice who reads a technical article, watches a manufacturer's video,
              or practises a new skill in their own time demonstrates the professional commitment
              the assessor is looking for.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling Mistakes and Accountability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              How you handle mistakes reveals more about your professional character than how you
              handle success. Everyone makes errors — especially when learning. The defining factor
              is your response: do you own it, fix it, learn from it, and prevent it recurring? Or
              do you hide it, blame others, and risk it happening again?
            </p>

            <p>
              In engineering maintenance, accountability has particular significance because of the
              safety implications. A mistake that is acknowledged and corrected is a learning
              opportunity. A mistake that is hidden can become a safety hazard. The culture of
              honest reporting that the industry strives for depends on individuals being willing to
              acknowledge errors without fear of disproportionate punishment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Professional Response to a Mistake
              </p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">
                  <strong>Acknowledge immediately:</strong> Do not wait — the longer you leave it,
                  the worse the consequences
                </li>
                <li className="pl-1">
                  <strong>Assess the impact:</strong> Is there a safety risk? Does someone need to
                  know urgently?
                </li>
                <li className="pl-1">
                  <strong>Take corrective action:</strong> Fix what you can, safely and within your
                  competence
                </li>
                <li className="pl-1">
                  <strong>Inform your supervisor:</strong> Especially if there are safety or quality
                  implications
                </li>
                <li className="pl-1">
                  <strong>Learn from it:</strong> What caused the error? How can you prevent it
                  recurring?
                </li>
                <li className="pl-1">
                  <strong>Document the learning:</strong> A reflective account about a mistake is
                  excellent EPA evidence
                </li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">
                Mistakes as Portfolio Evidence
              </p>
              <p className="text-sm text-white">
                A well-written reflective account about a mistake — what happened, why, what you did
                about it, and what you learned — is actually some of the strongest EPA evidence you
                can provide. It demonstrates self-awareness, accountability, learning orientation,
                and professional maturity. The assessor is not looking for perfection — they are
                looking for professionals who can handle imperfection with integrity and growth.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Accountability is not about self-punishment — it is about
              professional ownership. "I made an error, I have corrected it, I have informed those
              who need to know, and I have taken steps to prevent it happening again." That is the
              professional response.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Evidencing Professional Conduct in Your EPA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional conduct evidence should be woven throughout your portfolio, not presented
              as a separate section. The most powerful evidence comes from specific situations where
              your conduct made a difference — times when you were honest about a mistake,
              challenged unsafe behaviour, supported a colleague, or went beyond the minimum
              expectation.
            </p>

            <p>
              The assessor forms their impression of your professionalism from your entire
              portfolio, your behaviour during the practical observation, and your responses during
              the professional discussion. Consistency across all three is what distinguishes
              genuine professional conduct from a performance put on for the assessment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Building Your Professional Conduct Evidence
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Witness statements:</strong> Ask supervisors to comment on your
                  professionalism, reliability and attitude specifically
                </li>
                <li className="pl-1">
                  <strong>Activity logs:</strong> Include descriptions of professional behaviours in
                  your log entries — communication, safety, teamwork
                </li>
                <li className="pl-1">
                  <strong>Reflective accounts:</strong> Write about situations that tested your
                  professional conduct and what you learned
                </li>
                <li className="pl-1">
                  <strong>CPD records:</strong> Document voluntary learning activities, courses
                  attended, publications read
                </li>
                <li className="pl-1">
                  <strong>Feedback:</strong> Include any positive feedback received from
                  supervisors, clients or colleagues
                </li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Professional conduct is assessed holistically — it is
              not a tick-box exercise. The assessor forms an impression of your professionalism from
              your entire portfolio, your behaviour during the practical observation, and your
              responses during the professional discussion. Consistency is key: your evidence,
              behaviour and responses should all tell the same story of a developing professional.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Reference</h2>
          <div className="p-4 rounded-lg bg-white/5">
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">
                Professional conduct is how you behave every day, not just during assessments
              </li>
              <li className="pl-1">
                Safety is the most critical aspect of professional conduct in engineering
              </li>
              <li className="pl-1">
                Integrity means doing the right thing even when nobody is watching
              </li>
              <li className="pl-1">
                Acknowledge mistakes promptly — hiding them creates safety risks
              </li>
              <li className="pl-1">
                Take ownership of your CPD — do not wait for training to be provided
              </li>
              <li className="pl-1">
                Challenge unsafe behaviour constructively — it is a professional obligation
              </li>
              <li className="pl-1">
                Consider EngTech registration after completing your apprenticeship
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Professional Conduct" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Initiative and Problem-Solving
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section4">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule7Section4_5;
