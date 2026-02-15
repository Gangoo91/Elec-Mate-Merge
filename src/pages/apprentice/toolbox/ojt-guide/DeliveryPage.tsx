import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const traditionalMethods = [
  {
    title: 'College Block Release',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    desc: 'Full-time attendance at college for concentrated periods (typically 1-2 weeks). Intensive learning with dedicated facilities and expert instructors.',
    pros: [
      'Deep focus without work distractions',
      'Access to full workshop facilities and equipment',
      'Build relationships with other apprentices',
      'Intensive progress in a short period',
    ],
    cons: [
      'Long gap between blocks — easy to forget material',
      'Employer loses you for full weeks at a time',
      'May require travel or accommodation if college is distant',
      'Harder to apply learning immediately on site',
    ],
  },
  {
    title: 'Day Release',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    desc: 'Regular weekly attendance (usually one day per week). Consistent progress with immediate workplace application opportunities.',
    pros: [
      'Consistent weekly routine and momentum',
      'Apply what you learn on site the next day',
      'Employer only loses one day per week',
      'Regular contact with college tutors',
    ],
    cons: [
      'Only one day means slower overall progress',
      'Missed days are harder to make up',
      'Can feel rushed — tight schedule each week',
      'Disruption if the same day clashes with site deadlines',
    ],
  },
  {
    title: 'Evening Classes',
    colour: 'text-orange-400',
    border: 'border-orange-500/20',
    desc: 'After-hours study sessions arranged by some providers. Important: unpaid evening classes outside contracted hours do not count towards your OJT requirement. Only evening sessions within paid, contracted time qualify.',
    pros: [
      'No disruption to daytime work',
      'Can supplement other delivery methods',
      'Smaller class sizes in some cases',
    ],
    cons: [
      'Unpaid sessions do NOT count as OJT',
      'Fatigue after a full day of physical work',
      'Limited access to practical workshops in the evening',
      'Work-life balance impact — less personal time',
    ],
  },
];

const modernApproaches = [
  {
    title: 'Blended Learning',
    colour: 'text-purple-400',
    border: 'border-purple-500/20',
    desc: 'Combination of face-to-face and digital learning. Interactive online modules complemented by practical workshops and assessments.',
    pros: [
      'Flexible — learn theory online, practise in workshops',
      'Can revisit online content as many times as needed',
      'Reduces travel to college for theory sessions',
      'Good preparation for digital assessment formats',
    ],
    cons: [
      'Requires self-discipline for the online portion',
      'Need reliable internet and a quiet place to study',
      'Less face-to-face interaction with tutors',
      'Some apprentices find online learning isolating',
    ],
  },
  {
    title: 'Virtual Reality Training',
    colour: 'text-cyan-400',
    border: 'border-cyan-500/20',
    desc: 'Immersive simulation environments for hazardous scenario training. Safe practice of high-risk procedures and fault-finding techniques.',
    pros: [
      'Practise dangerous scenarios safely (e.g. fault finding on live systems)',
      'Repeatable — practise until you get it right',
      'Engaging and memorable learning experience',
      'Increasingly used in EPA preparation',
    ],
    cons: [
      'Not yet widely available at all providers',
      'Cannot replace real hands-on practical experience',
      'Equipment costs mean limited access time',
      'Some people experience motion sickness',
    ],
  },
  {
    title: 'Mobile Learning',
    colour: 'text-pink-400',
    border: 'border-pink-500/20',
    desc: 'Smartphone and tablet-based learning platforms. Micro-learning modules for flexible study during paid working time.',
    pros: [
      'Learn anywhere — on the van, in the cabin, at home',
      'Short modules fit around a busy schedule',
      'Quick revision before exams or assessments',
      'Progress tracked automatically by the platform',
    ],
    cons: [
      'Must be during paid hours to count as OJT',
      'Small screen can be limiting for technical diagrams',
      'Distractions from notifications and social media',
      'Not suitable for practical skills development',
    ],
  },
];

const remoteLearningTips = [
  'Set up a dedicated study space — even if it is just a clear desk with good lighting',
  'Turn off phone notifications during study sessions',
  'Use headphones to block background noise',
  'Take handwritten notes — it improves retention compared to just watching',
  'Set a timer for 25 minutes of focused study, then take a 5-minute break (Pomodoro technique)',
  'Test yourself after each module — do not just passively watch videos',
  'Ask questions in online forums or message your tutor if you do not understand something',
  'Log your online learning hours immediately — do not forget to record them',
];

const providerCriteria = [
  {
    title: 'Quality Indicators',
    items: [
      'Ofsted rating (Good or Outstanding)',
      'Industry-experienced instructors with current site experience',
      'Modern facilities and equipment (not outdated wiring systems)',
      'Strong employer partnerships and regular communication',
      'High completion and achievement rates',
      'Good EPA pass rates — ask them for their data',
    ],
  },
  {
    title: 'Practical Considerations',
    items: [
      'Geographic accessibility — how far is the commute?',
      'Flexible scheduling options (block, day, blended)',
      'Digital platform availability and quality',
      'Pastoral support and additional learning needs provision',
      'Assessment methods used — do they offer mock EPAs?',
      'Equipment availability — do they have modern test instruments?',
    ],
  },
  {
    title: 'Cost Factors',
    items: [
      'Government funding eligibility (levy vs co-investment)',
      'Additional resource costs (textbooks, PPE, tools)',
      'Travel and accommodation for block release',
      'Technology requirements (laptop, software)',
      'Examination and certification fees',
      'Whether resit fees are included or extra',
    ],
  },
];

const DeliveryPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Delivery Methods</h1>
      </div>

      {/* Traditional Methods */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Traditional Methods</h2>
        </div>

        {traditionalMethods.map((method) => (
          <Card key={method.title} className={`${method.border} bg-white/5`}>
            <CardContent className="p-4 space-y-3">
              <h3 className={`font-medium text-sm ${method.colour}`}>{method.title}</h3>
              <p className="text-white text-sm">{method.desc}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-green-400 text-xs font-semibold mb-1">Pros</p>
                  <ul className="space-y-1">
                    {method.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-1.5 text-xs text-white">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold mb-1">Cons</p>
                  <ul className="space-y-1">
                    {method.cons.map((con) => (
                      <li key={con} className="flex items-start gap-1.5 text-xs text-white">
                        <AlertCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modern Approaches */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Modern Approaches</h2>
        </div>

        {modernApproaches.map((method) => (
          <Card key={method.title} className={`${method.border} bg-white/5`}>
            <CardContent className="p-4 space-y-3">
              <h3 className={`font-medium text-sm ${method.colour}`}>{method.title}</h3>
              <p className="text-white text-sm">{method.desc}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-green-400 text-xs font-semibold mb-1">Pros</p>
                  <ul className="space-y-1">
                    {method.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-1.5 text-xs text-white">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-semibold mb-1">Cons</p>
                  <ul className="space-y-1">
                    {method.cons.map((con) => (
                      <li key={con} className="flex items-start gap-1.5 text-xs text-white">
                        <AlertCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Remote Learning Tips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">Remote Learning Tips</h2>
        </div>

        <Card className="border-amber-500/20 bg-amber-500/10">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <p className="text-white text-sm font-medium">
                Getting the most from online sessions
              </p>
            </div>
            <ul className="space-y-2">
              {remoteLearningTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-white">
                  <span className="text-amber-400 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Provider Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <h2 className="text-base font-semibold text-white">Provider Selection Criteria</h2>
        </div>

        {providerCriteria.map((section) => (
          <Card key={section.title} className="border-cyan-500/20 bg-white/5">
            <CardContent className="p-4">
              <h3 className="text-elec-yellow font-semibold text-sm mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeliveryPage;
