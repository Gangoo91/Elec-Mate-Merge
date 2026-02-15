import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, HelpCircle, Clock } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const activitiesThatCount = [
  {
    title: 'Theory lessons and lectures',
    desc: 'Classroom-based learning covering electrical theory, regulations, and principles',
  },
  {
    title: 'Practical workshops',
    desc: 'Hands-on training in controlled environments away from live projects',
  },
  {
    title: 'Shadowing and mentoring',
    desc: 'Structured observation and guidance from experienced professionals',
  },
  {
    title: 'Online learning modules',
    desc: 'Digital courses, webinars, and educational resources during paid hours',
  },
  {
    title: 'Industry visits',
    desc: 'Educational trips to suppliers, manufacturers, or exemplar installations',
  },
  {
    title: 'Research and assignments',
    desc: 'Independent study projects and coursework during paid time',
  },
  {
    title: 'Mock exams and revision',
    desc: 'Structured exam preparation sessions and practice assessments during paid hours',
  },
  {
    title: 'Manufacturer training days',
    desc: 'Product-specific training run by manufacturers (e.g. consumer unit training, EV charger installation)',
  },
];

const activitiesThatDont = [
  {
    title: 'Regular work duties',
    desc: 'Normal installation, maintenance, or repair work on live projects',
  },
  {
    title: 'Tea breaks and lunch',
    desc: 'General break times do not constitute learning activity',
  },
  {
    title: 'Travel time',
    desc: 'Journey time between sites (unless structured learning occurs during travel)',
  },
  {
    title: 'Unpaid study time',
    desc: 'Learning outside contracted working hours, including unpaid evening classes, does not qualify',
  },
  {
    title: 'Induction periods',
    desc: 'General workplace orientation and standard safety briefings',
  },
  {
    title: 'Progress reviews',
    desc: 'Routine meetings with your assessor to discuss progress (unless they include actual teaching)',
  },
];

const greyAreaScenarios = [
  {
    scenario: 'Your employer sends you to a manufacturer training day on a new consumer unit range',
    verdict: true,
    explanation:
      'Yes — this counts. It is structured learning away from normal duties, directly relevant to your standard, and within paid hours.',
  },
  {
    scenario: 'You watch YouTube tutorials about wiring at home in the evening',
    verdict: false,
    explanation:
      'No — this does not count. It is outside your contracted working hours and is not directed by your training provider.',
  },
  {
    scenario: 'Your supervisor explains BS 7671 regulations while you wire a board together on site',
    verdict: false,
    explanation:
      'No — learning that happens during normal productive work does not count. The teaching must be separate from your work duties.',
  },
  {
    scenario: 'You attend a structured team session where your supervisor teaches cable sizing calculations',
    verdict: true,
    explanation:
      'Yes — a structured teaching session separate from productive work counts, even if it happens on site, provided it is planned and logged.',
  },
  {
    scenario: 'You study for your AM2 exam at college during a scheduled revision day',
    verdict: true,
    explanation:
      'Yes — scheduled revision at college counts. It is structured, within paid hours, and directly relevant to your apprenticeship.',
  },
  {
    scenario: 'You help a qualified electrician on a domestic rewire, learning as you go',
    verdict: false,
    explanation:
      'No — this is on-the-job learning (valuable, but different). OJT must be separate from productive work, even if you are learning.',
  },
];

const trackingTips = [
  'Log every OJT activity on the same day — do not leave it until the end of the week',
  'Record the date, start time, end time, and total hours for each session',
  'Write a brief description of what you learned, not just "college" or "online"',
  'Note which KSBs (knowledge, skills, behaviours) the session covered',
  'Get your trainer or supervisor to sign off weekly if your provider requires it',
  'Keep a running total so you always know how many hours you have left',
  'Use your training provider\'s official log template — ESFA auditors expect a specific format',
  'If a session is cancelled, log that too — it helps if you need to claim catch-up time',
];

const WhatCountsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">What Counts as OJT</h1>
      </div>

      {/* Activities That Count */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">Activities That Count</h2>
        </div>

        {activitiesThatCount.map((item) => (
          <Card key={item.title} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activities That Don't Count */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">What Does NOT Count</h2>
        </div>

        {activitiesThatDont.map((item) => (
          <Card key={item.title} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-white text-sm">{item.title}</h3>
                <p className="text-white text-sm mt-1">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grey Area Scenarios */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">Grey Area Scenarios</h2>
        </div>

        <p className="text-white text-sm">
          Not sure if something counts? Here are real-world examples with verdicts:
        </p>

        {greyAreaScenarios.map((item) => (
          <Card
            key={item.scenario}
            className={`${item.verdict ? 'border-green-500/20' : 'border-red-500/20'} bg-white/5`}
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm font-medium">{item.scenario}</p>
              </div>
              <div className="flex items-start gap-2 ml-7">
                {item.verdict ? (
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-white text-sm">{item.explanation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hours Tracking Tips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">Hours Tracking Tips</h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <p className="text-white text-sm font-medium">
                Keep accurate records from day one
              </p>
            </div>
            <ul className="space-y-2">
              {trackingTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ST0152 Note */}
      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            All off-the-job training must be directly relevant to apprenticeship standard
            ST0152 v1.2. Your training provider should map each activity to specific
            knowledge, skills, and behaviours (KSBs) in the standard. If you are unsure
            whether an activity qualifies, ask your training provider before logging it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatCountsPage;
