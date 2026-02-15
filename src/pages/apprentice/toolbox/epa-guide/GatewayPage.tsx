import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const GatewayPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Gateway & Readiness
        </h1>
      </div>

      {/* What is Gateway */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            What is the Gateway?
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The Gateway is the formal readiness checkpoint before you can enter
            End Point Assessment. It is a structured meeting between you, your
            employer, and your training provider where all three parties must
            agree that you are ready to be assessed. You cannot start EPA until
            Gateway is passed — it exists to protect you from being entered for
            assessment before you are prepared.
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="text-white text-sm">
              <span className="text-purple-400 font-semibold">
                When does Gateway happen?
              </span>{' '}
              Typically in the final 3-6 months of your apprenticeship, once you
              have completed your learning programme, passed your AM2 practical
              assessment, and built a comprehensive portfolio. Your training
              provider will schedule it when they believe you are ready.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gateway Requirements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Gateway Requirements
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              You must meet ALL of the following requirements before you can pass
              Gateway:
            </p>

            {[
              {
                title: 'Completed learning programme',
                description:
                  'All mandatory training modules, college sessions, and on-the-job learning must be completed. Your training provider will sign this off.',
              },
              {
                title: 'Level 2 English and Maths (minimum)',
                description:
                  'You must hold a minimum of Level 2 English and Maths. This is typically GCSE grade 4 or above, or Functional Skills Level 2. If you started without these, you should have achieved them during your apprenticeship. Note: since August 2025, adults aged 19+ must study towards Functional Skills but are no longer required to pass the exams.',
              },
              {
                title: 'AM2 practical assessment passed',
                description:
                  'You must have passed the AM2 assessment at a NET (National Electrotechnical Training) centre before Gateway. This is a separate practical assessment from the EPA practical observation.',
              },
              {
                title: 'Portfolio of evidence',
                description:
                  'A comprehensive portfolio demonstrating evidence against all Knowledge, Skills, and Behaviours in the apprenticeship standard. This must be reviewed and confirmed as sufficient.',
              },
              {
                title: 'Employer confirmation of readiness',
                description:
                  'Your employer must confirm that you are competent and ready for assessment based on your workplace performance. They sign a gateway declaration form.',
              },
              {
                title: 'Training provider confirmation',
                description:
                  'Your training provider must confirm you have completed all required training and are ready for EPA. They review your portfolio, progress records, and assessment results.',
              },
              {
                title: 'Minimum duration met',
                description:
                  'You must have been on programme for at least 12 months. The typical duration for Level 3 electrical apprenticeships is 42-48 months (3.5-4 years).',
              },
              {
                title: '20% off-the-job training completed',
                description:
                  'Evidence that you have completed at least 20% of your working hours as off-the-job training throughout your apprenticeship.',
              },
            ].map((req) => (
              <div key={req.title} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">
                    {req.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {req.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* The AM2 Assessment */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            The AM2 Assessment
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              The AM2 (Achievement Measurement 2) is a practical assessment run
              by NET (National Electrotechnical Training) that tests your
              installation competence. It is separate from your EPA practical
              observation but is a prerequisite for Gateway.
            </p>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                AM2 Key Facts
              </h4>
              {[
                'Duration: Typically 2 days at a NET assessment centre',
                'Tasks: Multiple practical installation tasks under timed conditions',
                'Skills tested: installation, termination, testing, fault finding, safe working practices',
                'Graded: Pass or Fail (no Merit/Distinction)',
                'Cost: Funded within the £23,000 funding band — you should not be asked to pay',
                'Booking: Your training provider arranges your AM2 booking with NET',
                'Results: Typically available within 5 working days',
              ].map((fact) => (
                <div key={fact} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{fact}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <h4 className="text-amber-400 font-semibold text-sm mb-2">
                AM2 vs EPA Practical — What is the Difference?
              </h4>
              <div className="space-y-2 text-white text-sm">
                <p>
                  <span className="text-amber-400 font-semibold">AM2:</span>{' '}
                  Tests basic installation competence — can you wire circuits,
                  make connections, and test safely? Completed at a NET centre
                  under standardised conditions. Pass/Fail only.
                </p>
                <p>
                  <span className="text-amber-400 font-semibold">
                    EPA Practical:
                  </span>{' '}
                  Assesses overall competence as an electrician — covers
                  planning, installation, testing, quality, problem-solving,
                  and compliance. Graded Pass/Merit/Distinction. More
                  comprehensive and counts towards your final grade.
                </p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-red-400 font-semibold">
                  If you fail AM2:
                </span>{' '}
                You can re-sit, but it will delay your Gateway and EPA. Your
                training provider will arrange additional support and a re-sit
                date. Most apprentices pass first time with proper preparation.
                Use the AM2 Simulator in this app to practise.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* The Gateway Meeting */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            The Gateway Meeting
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              The Gateway meeting is a formal review where all evidence is
              checked and a decision is made about your readiness for EPA.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">
                What Happens at the Gateway Meeting
              </h4>
              {[
                {
                  step: '1',
                  title: 'Evidence review',
                  description:
                    'Your training provider reviews your portfolio, qualifications, and progress records to confirm everything is complete.',
                },
                {
                  step: '2',
                  title: 'Employer assessment',
                  description:
                    'Your employer confirms your workplace competence. They may describe your strengths, areas of development, and confirm you are performing at the expected level.',
                },
                {
                  step: '3',
                  title: 'Apprentice self-assessment',
                  description:
                    'You may be asked to reflect on your readiness. This is your opportunity to raise any concerns or request additional support if needed.',
                },
                {
                  step: '4',
                  title: 'Decision',
                  description:
                    'All three parties — you, your employer, and your training provider — must agree you are ready. If anyone has concerns, the Gateway can be postponed.',
                },
                {
                  step: '5',
                  title: 'Gateway declaration',
                  description:
                    'A formal declaration form is signed by all parties confirming Gateway is passed. This is sent to your EPAO.',
                },
                {
                  step: '6',
                  title: 'EPA scheduling',
                  description:
                    'Your training provider contacts the EPAO to schedule your EPA components within the 3-month assessment window.',
                },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                    <p className="text-white text-sm mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Readiness Checklist */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            Readiness Checklist
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              Use this checklist to assess your own readiness before Gateway:
            </p>
            {[
              'I have completed all required training modules and college sessions',
              'I have passed my AM2 practical assessment',
              'I have Level 2 English and Maths (or Functional Skills equivalent)',
              'My portfolio covers all KSBs in the apprenticeship standard',
              'My portfolio is well-organised with clear evidence mapping',
              'I can perform safe isolation confidently and correctly every time',
              'I can carry out the full testing sequence from memory',
              'I am confident using my test instruments and know they are calibrated',
              'I can work from technical drawings and specifications',
              'I have practised under timed conditions for the practical assessment',
              'I have completed mock knowledge tests and scored consistently well',
              'I have had at least one mock professional discussion',
              'My employer is happy with my workplace performance',
              'I feel ready to demonstrate my competence to an independent assessor',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* What if You Are Not Ready */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            What if You Are Not Ready?
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              It is better to delay Gateway than to enter EPA unprepared. You
              have the right to say you are not ready.
            </p>
            {[
              {
                title: 'You can delay Gateway',
                description:
                  'If you, your employer, or your training provider feel you are not ready, Gateway can be postponed. There is no penalty for delaying — it simply extends your end date.',
              },
              {
                title: 'Request additional support',
                description:
                  'If you have specific areas of weakness, ask your training provider for targeted support. This might include extra college sessions, additional practical time, or focused revision.',
              },
              {
                title: 'Do not feel pressured',
                description:
                  'Some employers or training providers may push for early Gateway to meet targets. You have the right to say you are not ready. It is in everyone\'s interest that you pass first time.',
              },
              {
                title: 'Use self-assessment tools',
                description:
                  'The EPA Readiness Simulator in this app can help you assess your readiness objectively. Use it to identify weak areas and focus your preparation.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold text-sm">
                    {item.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Structure Template */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Portfolio Structure Template
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              A well-structured portfolio makes Gateway easier and your
              professional discussion stronger. Here is a recommended structure:
            </p>

            {[
              {
                section: 'Section 1: Personal Details & Introduction',
                contents:
                  'Your name, employer, training provider, apprenticeship start date, expected end date, pathway (Installation or Maintenance), and a brief personal statement about your apprenticeship journey.',
              },
              {
                section: 'Section 2: KSB Mapping Grid',
                contents:
                  'A table listing every Knowledge, Skill, and Behaviour from the apprenticeship standard, with columns showing which evidence covers each KSB. This is essential — it shows the assessor everything is covered at a glance.',
              },
              {
                section: 'Section 3: Qualifications & Certificates',
                contents:
                  'Copies of your AM2 certificate, English and Maths qualifications, any additional certificates (PASMA, IPAF, asbestos awareness, first aid, ECS card), and your EAL/C&G qualification certificates.',
              },
              {
                section: 'Section 4: Work Evidence — Photographs',
                contents:
                  'Photographs of completed work with descriptions explaining what was done, the regulations followed, and any challenges overcome. Include before/during/after shots where possible.',
              },
              {
                section: 'Section 5: Test Results & Documentation',
                contents:
                  'Copies of completed test certificates (initial verification schedules, periodic inspection schedules, EIC/MEIWC forms), annotated to show which tests you personally carried out.',
              },
              {
                section: 'Section 6: Risk Assessments & Method Statements',
                contents:
                  'Examples of RAMS you created or contributed to. Annotate to show your understanding of hazard identification and control measures.',
              },
              {
                section: 'Section 7: Witness Testimonies',
                contents:
                  'Statements from your employer, supervisor, or colleagues confirming your competence in specific areas. Each testimony should reference specific KSBs.',
              },
              {
                section: 'Section 8: Reflective Accounts',
                contents:
                  'Written reflections on significant pieces of work, challenges overcome, mistakes learned from, and professional development. Use the STAR format.',
              },
              {
                section: 'Section 9: CPD Records',
                contents:
                  'Log of all training, courses, workshops, self-study, and professional development activities throughout your apprenticeship.',
              },
              {
                section: 'Section 10: Progress Reviews',
                contents:
                  'Copies of your 12-weekly progress review records showing your development over time.',
              },
            ].map((item) => (
              <div key={item.section}>
                <p className="text-amber-400 font-semibold text-sm">
                  {item.section}
                </p>
                <p className="text-white text-sm mt-0.5">{item.contents}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* EPAO Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Understanding Your EPAO
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Your End Point Assessment Organisation (EPAO) is the independent
              body that conducts your EPA. Understanding who they are and how
              they work helps you prepare.
            </p>

            {[
              {
                title: 'Who selects the EPAO?',
                description:
                  'Usually your training provider selects the EPAO based on existing contracts and relationships. Your employer may also have a preference. Common EPAOs for electrical apprenticeships include Smart Assessor, City & Guilds, EAL, and Highfield Assessment.',
              },
              {
                title: 'What does the EPAO do?',
                description:
                  'The EPAO appoints independent assessors, sets the assessment tasks, manages scheduling, conducts quality assurance, and determines your grade. They are completely independent from your training provider and employer.',
              },
              {
                title: 'Who is the assessor?',
                description:
                  'Your assessor is an experienced electrical professional employed or contracted by the EPAO. They hold relevant qualifications and are trained in assessment. They have no connection to your training provider or employer.',
              },
              {
                title: 'Assessor impartiality',
                description:
                  'EPAO assessors must be impartial. They cannot have previously taught or employed you. If there is any conflict of interest, a different assessor must be assigned.',
              },
              {
                title: 'Assessment materials',
                description:
                  'The EPAO provides the knowledge test papers, practical assessment briefs, and professional discussion question bank. These are standardised across all candidates using that EPAO.',
              },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-blue-400 font-semibold text-sm">
                  {item.title}
                </p>
                <p className="text-white text-sm mt-0.5">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Timeline: Gateway to Results */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Timeline: Gateway to Results
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              A typical timeline from Gateway to receiving your results:
            </p>
            {[
              { period: 'Day 0', event: 'Gateway meeting — all parties agree you are ready, declaration signed' },
              { period: 'Week 1-2', event: 'Training provider contacts EPAO to register you for EPA' },
              { period: 'Week 2-4', event: 'EPAO schedules your assessment components and assigns assessors' },
              { period: 'Week 3-6', event: 'Knowledge test (usually first)' },
              { period: 'Week 4-8', event: 'Practical observation (scheduled around your work and the assessment venue)' },
              { period: 'Week 6-10', event: 'Professional discussion (usually last)' },
              { period: 'Week 8-12', event: 'All components completed within the 3-month window' },
              { period: 'Week 10-14', event: 'Results available (10-15 working days after final component)' },
              { period: 'Week 14-22', event: 'Apprenticeship certificate issued by ESFA (4-8 weeks after results)' },
            ].map((item) => (
              <div key={item.period} className="flex items-start gap-3">
                <span className="text-green-400 font-mono font-bold text-sm min-w-[70px] flex-shrink-0">
                  {item.period}
                </span>
                <span className="text-white text-sm">{item.event}</span>
              </div>
            ))}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2">
              <p className="text-white text-sm">
                <span className="text-green-400 font-semibold">Note:</span>{' '}
                Timelines vary depending on EPAO availability, assessment venue
                scheduling, and your personal readiness. Your training provider
                will keep you updated on dates as they are confirmed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GatewayPage;
