import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const GradingPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Grading & Results
        </h1>
      </div>

      {/* How Grading Works */}
      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            How Your Grade is Determined
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your overall EPA grade is determined by your performance across all
            three assessment components. Each component is graded individually,
            and your overall grade reflects your combined performance. You must
            pass all three components — failing any single component means you
            do not achieve the apprenticeship, regardless of your performance
            in the other two.
          </p>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <p className="text-white text-sm">
              <span className="text-amber-400 font-semibold">
                Important:
              </span>{' '}
              The specific grade boundaries vary by EPAO. Your training provider
              will confirm the exact percentages and criteria used by your
              assessment organisation. The descriptions below are general
              guidance based on the apprenticeship standard.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pass Grade */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">Pass</h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="text-green-400 font-bold text-sm">Pass</span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Meets all the requirements of the apprenticeship standard. You have
              demonstrated competence across all Knowledge, Skills, and
              Behaviours and are ready to work as a qualified electrician.
            </p>
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                What a Pass Looks Like
              </h4>
              {[
                'Knowledge Test: Demonstrates solid understanding of electrical principles, regulations, and safety requirements across all question areas',
                'Practical Observation: Completes installation work safely and to an acceptable standard, follows safe isolation correctly, produces accurate test results',
                'Professional Discussion: Communicates effectively about your work, provides relevant portfolio evidence, demonstrates understanding of professional behaviours',
                'Overall: You can work competently and safely as an electrician, following regulations and industry standards',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Merit Grade */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Merit</h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
              <span className="text-blue-400 font-bold text-sm">Merit</span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Exceeds the requirements in several areas. You have demonstrated a
              deeper understanding of electrical work and show initiative,
              efficiency, and strong problem-solving skills.
            </p>
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                What a Merit Looks Like
              </h4>
              {[
                'Knowledge Test: Shows deeper understanding, can apply knowledge to complex scenarios, answers questions thoroughly with clear reasoning',
                'Practical Observation: Works efficiently and methodically, demonstrates high-quality workmanship, shows initiative in problem-solving',
                'Professional Discussion: Provides detailed, well-structured portfolio evidence, explains decision-making clearly, demonstrates strong professional behaviours',
                'Overall: You work to a high standard, understand why things are done (not just how), and show the qualities of an effective professional electrician',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distinction Grade */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">Distinction</h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
              <span className="text-amber-400 font-bold text-sm">
                Distinction
              </span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Exceeds the requirements in all areas. You have demonstrated
              exceptional understanding, outstanding practical skills, and the
              qualities of someone who will be a leader in the trade.
            </p>
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-sm">
                What a Distinction Looks Like
              </h4>
              {[
                'Knowledge Test: Exceptional understanding across all areas, provides comprehensive and accurate answers, applies knowledge to complex unfamiliar scenarios',
                'Practical Observation: Outstanding quality of work, excellent efficiency, demonstrates advanced skills and techniques, exemplary safe working practices',
                'Professional Discussion: Comprehensive portfolio with exemplary evidence, articulates complex ideas clearly, demonstrates leadership qualities and deep professional insight',
                'Overall: You stand out as an exceptional electrician who consistently exceeds expectations, shows leadership potential, and demonstrates a deep commitment to the profession',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fail & Re-sits */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            If You Do Not Pass
          </h2>
        </div>

        <Card className="border-red-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Do not panic if you do not pass an EPA component. It happens, and
              there is a clear process for re-sits. Here is what you need to
              know:
            </p>

            {[
              {
                title: 'You can re-sit individual components',
                description:
                  'If you fail one component but pass the others, you only need to re-sit the failed component. You do not have to redo the entire EPA.',
              },
              {
                title: 'One free re-sit per component',
                description:
                  'You are entitled to one free re-sit funded within the original £23,000 funding band. This means no additional cost to you or your employer.',
              },
              {
                title: 'Re-sit within 3 months',
                description:
                  'Your re-sit must typically be taken within 3 months of the original result. Your training provider will arrange additional support before the re-sit.',
              },
              {
                title: 'Maximum grade on re-sit',
                description:
                  'On a re-sit, the maximum grade achievable is typically Pass for that component. This means your overall grade may be capped. Check with your EPAO for their specific re-sit grading policy.',
              },
              {
                title: 'Additional support before re-sit',
                description:
                  'Your training provider must provide additional training and support to address the areas where you did not meet the standard. You should receive a clear action plan.',
              },
              {
                title: 'Second failure',
                description:
                  'If you fail a re-sit, a second re-sit may be possible but may require separate funding arrangements between your employer and training provider. This is uncommon — most apprentices pass on the re-sit.',
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

      {/* How Results are Communicated */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            Receiving Your Results
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {[
              {
                title: 'Timeline',
                description:
                  'Results are typically available within 10-15 working days of your final component. Your EPAO sends results to your training provider, who will share them with you.',
              },
              {
                title: 'Certificate',
                description:
                  'Once you pass all three components, your EPAO requests your apprenticeship certificate from the ESFA. This is your official qualification — Level 3 Installation Electrician or Maintenance Electrician.',
              },
              {
                title: 'Certificate delivery',
                description:
                  'The certificate is posted to your training provider, who passes it to you. This can take 4-8 weeks after your final result. If you have not received it after 8 weeks, contact your training provider.',
              },
              {
                title: 'What your certificate shows',
                description:
                  'Your certificate shows your name, the apprenticeship standard (Level 3 Installation Electrician / Maintenance Electrician), your overall grade (Pass, Merit, or Distinction), and the date of completion.',
              },
              {
                title: 'Digital records',
                description:
                  'Your apprenticeship completion is also recorded on the Apprenticeship Service (DAS). Your employer can verify your qualification through this system. You should also keep copies of all EPA documentation for your own records.',
              },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-purple-400 font-semibold text-sm">
                  {item.title}
                </p>
                <p className="text-white text-sm mt-0.5">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* After EPA */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            After You Pass
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              Passing your EPA is a significant achievement. Here is what comes
              next:
            </p>
            {[
              'You are now a qualified Level 3 Installation Electrician or Maintenance Electrician',
              'You can apply for your JIB Approved Electrician (Gold Card) — your employer or JIB can guide you through the process',
              'You are eligible to register with a competent person scheme (e.g. NICEIC, NAPIT, ELECSA) once you have the required experience',
              'Your employer should review your pay — you are now fully qualified and should be paid accordingly',
              'Consider your next steps: specialisation, further qualifications (Level 4 Design & Verification, 18th Edition update courses), or moving towards self-employment',
              'Keep your CPD up to date — regulations change, and staying current is essential for your career',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* How Each Component Contributes to Overall Grade */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            How Component Grades Combine
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Your overall EPA grade is not a simple average. The EPAO uses a
              grading matrix that considers performance across all three
              components, with the practical observation weighted most heavily
              at 50%.
            </p>

            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">
                Typical Grade Combinations
              </h4>
              {[
                {
                  components: 'Pass + Pass + Pass',
                  overall: 'Pass',
                  colour: 'text-green-400',
                },
                {
                  components: 'Merit + Pass + Merit',
                  overall: 'Pass or Merit',
                  colour: 'text-green-400',
                },
                {
                  components: 'Merit + Merit + Merit',
                  overall: 'Merit',
                  colour: 'text-blue-400',
                },
                {
                  components: 'Distinction + Merit + Distinction',
                  overall: 'Merit or Distinction',
                  colour: 'text-blue-400',
                },
                {
                  components: 'Distinction + Distinction + Distinction',
                  overall: 'Distinction',
                  colour: 'text-amber-400',
                },
                {
                  components: 'Any component: Fail',
                  overall: 'Not achieved (re-sit required)',
                  colour: 'text-red-400',
                },
              ].map((combo) => (
                <div
                  key={combo.components}
                  className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                >
                  <span className="text-white text-sm">
                    {combo.components}
                  </span>
                  <span className={`text-sm font-bold ${combo.colour}`}>
                    {combo.overall}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-blue-400 font-semibold">Note:</span>{' '}
                Exact grading matrices vary by EPAO. Some weight the practical
                more heavily in borderline cases. Your training provider can
                give you the specific grading criteria for your EPAO.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employer Perspective on Grades */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            What Your Grade Means for Your Career
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            {[
              {
                title: 'All grades are a qualification',
                description:
                  'A Pass, Merit, and Distinction are all the same Level 3 qualification. You are a qualified electrician regardless of grade. The grade reflects how well you demonstrated your competence during assessment.',
              },
              {
                title: 'Employers value the qualification most',
                description:
                  'Most employers care that you have passed, not whether you got a Merit or Distinction. Your practical skills, attitude, and work ethic matter more than the grade on your certificate in day-to-day work.',
              },
              {
                title: 'Higher grades can help with progression',
                description:
                  'A Merit or Distinction can be an advantage when applying for new jobs, promotions, or further training. It demonstrates you went above and beyond the minimum standard.',
              },
              {
                title: 'JIB card is the same for all grades',
                description:
                  'Your JIB Approved Electrician (Gold Card) is the same whether you achieved a Pass, Merit, or Distinction. The grade does not affect your JIB status or card colour.',
              },
              {
                title: 'Competent person scheme registration',
                description:
                  'Registration with NICEIC, NAPIT, or other competent person schemes is based on qualifications and experience, not EPA grade. A Pass is sufficient.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">
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

      {/* Appeal Process */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Appeals Process
          </h2>
        </div>

        <Card className="border-amber-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm leading-relaxed">
              If you believe your EPA result is unfair, you have the right to
              appeal. Here is how it works:
            </p>
            {[
              {
                step: '1',
                title: 'Informal review',
                description:
                  'First, discuss the result with your training provider. They can request a breakdown of your marks and identify if there are grounds for appeal.',
              },
              {
                step: '2',
                title: 'Formal appeal to EPAO',
                description:
                  'If you have grounds, your training provider submits a formal appeal to the EPAO within the specified timeframe (usually 10-20 working days of the result).',
              },
              {
                step: '3',
                title: 'EPAO review',
                description:
                  'The EPAO reviews the assessment evidence, assessor notes, and your appeal. They may re-mark your work or arrange a re-assessment with a different assessor.',
              },
              {
                step: '4',
                title: 'Outcome',
                description:
                  'You will receive a written response explaining the outcome. If upheld, your grade may be changed or a re-assessment arranged at no additional cost.',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-xs font-bold">
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
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <p className="text-white text-sm">
                <span className="text-amber-400 font-semibold">
                  Grounds for appeal:
                </span>{' '}
                Appeals are typically accepted for procedural errors (assessment
                not conducted properly), mitigating circumstances (illness,
                disruption during assessment), or evidence of assessor bias. You
                cannot appeal simply because you disagree with the grade — there
                must be specific grounds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradingPage;
