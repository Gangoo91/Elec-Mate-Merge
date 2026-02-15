import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const knowledgeCards = [
  {
    title: 'Electrical Science & Theory',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    desc: 'Classroom theory, online modules, and practical demonstrations that build fundamental understanding tested in knowledge assessments.',
  },
  {
    title: 'Regulations & Standards',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    desc: 'Structured study of BS 7671:2018+A3:2024, building regulations, and safety standards through guided reading and interpretation exercises.',
  },
  {
    title: 'Design & Planning',
    colour: 'text-purple-400',
    border: 'border-purple-500/20',
    desc: 'Project-based learning covering circuit design, load calculations, and installation planning methodologies.',
  },
];

const skillsCards = [
  {
    title: 'Practical Competencies',
    colour: 'text-orange-400',
    border: 'border-orange-500/20',
    desc: 'Workshop-based skill development that directly maps to practical assessment criteria and workplace observations.',
  },
  {
    title: 'Testing & Inspection',
    colour: 'text-cyan-400',
    border: 'border-cyan-500/20',
    desc: 'Hands-on training with test equipment, measurement techniques, and certification procedures required for professional practice.',
  },
  {
    title: 'Problem Solving',
    colour: 'text-pink-400',
    border: 'border-pink-500/20',
    desc: 'Scenario-based learning that develops diagnostic skills and systematic fault-finding approaches tested in EPA activities.',
  },
];

const epaComponents = [
  {
    title: 'Knowledge Test',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    format: 'Multiple choice and short answer',
    duration: '2 hours',
    desc: 'Tests your understanding of electrical science, regulations, health and safety, and installation principles. Covers the full knowledge component of ST0152 v1.2.',
    ojtLink: 'Theory lessons, online modules, structured reading of BS 7671, and revision sessions all directly prepare you for the knowledge test.',
  },
  {
    title: 'Practical Assessment',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    format: 'Observed practical task under controlled conditions',
    duration: '6 hours (typical)',
    desc: 'You will complete an electrical installation task, including wiring, termination, testing, and fault diagnosis. Similar in format to the AM2 assessment.',
    ojtLink: 'Workshop practice, practical exercises at college, and structured site activities build the hands-on skills assessed here.',
  },
  {
    title: 'Professional Discussion',
    colour: 'text-purple-400',
    border: 'border-purple-500/20',
    format: 'Structured interview with an independent assessor',
    duration: '60 minutes',
    desc: 'A discussion underpinned by your portfolio. The assessor will ask you about your experience, decision-making, and how you apply knowledge and skills in the workplace.',
    ojtLink: 'Every OJT activity contributes evidence for your portfolio. Reflective logs, evidence mapping, and progress reviews all prepare you to discuss your learning confidently.',
  },
];

const gatewayRequirements = [
  'Completed the required fixed training hours (as defined in your training plan)',
  'Achieved Level 2 English and Maths (or equivalents)',
  'Compiled a portfolio of evidence demonstrating KSB coverage',
  'Employer, training provider, and apprentice all agree readiness',
  'All mandatory qualifications completed (e.g. EAL Level 3 Diploma)',
  'AM2 assessment passed (if required by your pathway)',
  'Training provider has confirmed all OJT hours are logged and verified',
];

const referralReasons = [
  {
    reason: 'Insufficient portfolio evidence',
    detail: 'Portfolio does not demonstrate coverage across all KSBs. Gaps in knowledge or skills areas.',
    prevention: 'Map your evidence to KSBs throughout your apprenticeship, not just at the end. Use the KSB mapping sheet from your provider.',
  },
  {
    reason: 'Weak professional discussion',
    detail: 'Apprentice cannot articulate their learning or relate it to the standard.',
    prevention: 'Practise talking about your work and learning with your mentor. Do mock professional discussions with your training provider.',
  },
  {
    reason: 'Practical skills gaps',
    detail: 'Unable to complete practical tasks to the required standard within the time allowed.',
    prevention: 'Maximise your workshop time. Practise timed tasks. Do not skip college practical sessions even when you feel confident.',
  },
  {
    reason: 'Knowledge test failure',
    detail: 'Score below the pass mark on the theory assessment.',
    prevention: 'Regular revision throughout your apprenticeship. Use flashcards, mock exams, and study groups. Do not leave revision until the last month.',
  },
  {
    reason: 'Incomplete training hours',
    detail: 'Training logs show you have not completed the required fixed hours of OJT.',
    prevention: 'Track your hours from day one. Raise shortfalls early. Do not assume your provider is tracking them for you.',
  },
];

const timeline = [
  {
    phase: '12+ months before EPA',
    colour: 'text-blue-400',
    actions: [
      'Ensure your training plan is up to date and you understand your total OJT hours',
      'Start building your portfolio — do not wait until the end',
      'Ask your provider for the KSB mapping sheet and begin cross-referencing evidence',
    ],
  },
  {
    phase: '6 months before EPA',
    colour: 'text-green-400',
    actions: [
      'Conduct a gap analysis — which KSBs are you missing evidence for?',
      'Schedule catch-up OJT for any hours shortfall',
      'Begin mock exams and timed practical exercises',
      'Start practising professional discussion questions',
    ],
  },
  {
    phase: '3 months before EPA',
    colour: 'text-amber-400',
    actions: [
      'Complete and organise your portfolio — have your provider review it',
      'Confirm you have all required qualifications (English, Maths, Diploma)',
      'Book your AM2 if required',
      'Intensive revision for the knowledge test',
    ],
  },
  {
    phase: 'Gateway (4-6 weeks before EPA)',
    colour: 'text-orange-400',
    actions: [
      'Gateway meeting with employer, provider, and you — formal agreement that you are ready',
      'Final portfolio review and submission',
      'Confirm EPA dates with your assessment organisation',
      'Final mock professional discussion and knowledge test',
    ],
  },
  {
    phase: 'EPA week',
    colour: 'text-red-400',
    actions: [
      'Knowledge test, practical assessment, and professional discussion (over 1-2 days typically)',
      'Bring your portfolio, ID, and any required tools or PPE',
      'Stay calm — your OJT has prepared you for this',
    ],
  },
];

const portfolioCards = [
  {
    title: 'Continuous Documentation',
    desc: 'Record learning outcomes from each training session with reflection on how it applies to your apprenticeship standard. Aim for quality over quantity — one detailed entry is worth more than ten vague ones.',
  },
  {
    title: 'Evidence Mapping',
    desc: 'Cross-reference every training activity to specific EPA criteria and KSBs. Use a spreadsheet or your provider\'s tracking tool to ensure comprehensive coverage with no gaps.',
  },
  {
    title: 'Progress Monitoring',
    desc: 'Review your portfolio coverage at every progress review (minimum 12-weekly). Identify gaps early and plan targeted OJT activities to fill them before gateway.',
  },
];

const AssessmentPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Assessment & EPA</h1>
      </div>

      {/* OJT & EPA Connection */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardContent className="p-4">
          <h2 className="text-blue-400 font-semibold text-sm mb-2">OJT & EPA Connection</h2>
          <p className="text-white text-sm leading-relaxed">
            Your off-the-job training directly prepares you for the End Point Assessment
            (EPA). Every learning activity should contribute towards demonstrating the
            knowledge, skills, and behaviours required by ST0152 v1.2. The EPA is the
            final assessment that determines your grade — Pass, Merit, or Distinction.
          </p>
        </CardContent>
      </Card>

      {/* EPA Component Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">EPA Components</h2>
        </div>

        <p className="text-white text-sm">
          The EPA for ST0152 v1.2 has three components. Each is graded separately:
        </p>

        {epaComponents.map((comp) => (
          <Card key={comp.title} className={`${comp.border} bg-white/5`}>
            <CardContent className="p-4 space-y-2">
              <h3 className={`font-medium text-sm ${comp.colour}`}>{comp.title}</h3>
              <div className="flex gap-4 text-xs text-white">
                <span>Format: {comp.format}</span>
                <span>Duration: {comp.duration}</span>
              </div>
              <p className="text-white text-sm">{comp.desc}</p>
              <div className="bg-white/5 rounded p-2 mt-1">
                <p className="text-white text-xs">
                  <span className="text-elec-yellow font-medium">How OJT prepares you: </span>
                  {comp.ojtLink}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gateway Requirements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">Gateway Requirements</h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              Before you can sit your EPA, you must pass through "gateway" — a formal check
              that you are ready:
            </p>
            <ul className="space-y-2">
              {gatewayRequirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Common Referral Reasons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Common Reasons for EPA Referral</h2>
        </div>

        <p className="text-white text-sm">
          These are the pitfalls that most commonly cause apprentices to fail. Avoid them:
        </p>

        {referralReasons.map((item) => (
          <Card key={item.reason} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <h3 className="font-medium text-red-400 text-sm">{item.reason}</h3>
              </div>
              <p className="text-white text-sm ml-7">{item.detail}</p>
              <div className="flex items-start gap-2 ml-7">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="text-green-400 font-medium">Prevention: </span>
                  {item.prevention}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline to EPA */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">Timeline to EPA</h2>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-4 w-4 text-amber-400" />
          <p className="text-white text-sm font-medium">Key milestones and preparation</p>
        </div>

        {timeline.map((phase) => (
          <Card key={phase.phase} className="border-white/10 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className={`font-medium text-sm ${phase.colour}`}>{phase.phase}</h3>
              <ul className="space-y-1">
                {phase.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2 text-sm text-white">
                    <span className={`${phase.colour} mt-0.5`}>•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Knowledge Alignment */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Knowledge Alignment</h2>
        </div>

        {knowledgeCards.map((card) => (
          <Card key={card.title} className={`${card.border} bg-white/5`}>
            <CardContent className="p-4">
              <h3 className={`font-medium text-sm ${card.colour}`}>{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skills Development */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Skills Development</h2>
        </div>

        {skillsCards.map((card) => (
          <Card key={card.title} className={`${card.border} bg-white/5`}>
            <CardContent className="p-4">
              <h3 className={`font-medium text-sm ${card.colour}`}>{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Strategy */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">Portfolio Strategy</h2>
        </div>

        {portfolioCards.map((card) => (
          <Card key={card.title} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4">
              <h3 className="font-medium text-amber-400 text-sm">{card.title}</h3>
              <p className="text-white text-sm mt-1">{card.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssessmentPage;
