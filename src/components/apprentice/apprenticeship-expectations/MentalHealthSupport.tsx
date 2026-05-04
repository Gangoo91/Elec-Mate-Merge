import { Button } from '@/components/ui/button';
import { Phone, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MentalHealthSupport = () => {
  const crisisResources = [
    {
      service: 'Samaritans',
      contact: '116 123',
      description: 'Free 24/7 emotional support',
      availability: '24/7',
    },
    {
      service: 'Campaign Against Living Miserably (CALM)',
      contact: '0800 58 58 58',
      description: 'Support for men aged 15-35',
      availability: '5pm-midnight daily',
    },
    {
      service: 'Mind Info Line',
      contact: '0300 123 3393',
      description: 'Mental health information and support',
      availability: 'Mon-Fri 9am-6pm',
    },
  ];

  const apprenticeStressors = [
    {
      stressor: 'Financial pressure',
      symptoms: ['Worrying about low apprentice wages', 'Struggling to afford tools/transport'],
      solutions: [
        'Create a budget',
        'Look into apprentice grants',
        'Discuss with employer about advance payments',
      ],
    },
    {
      stressor: 'College workload',
      symptoms: ['Feeling overwhelmed by assignments', 'Struggling to balance work and study'],
      solutions: ['Create study schedule', 'Form study groups', 'Ask tutors for extra support'],
    },
    {
      stressor: 'Workplace integration',
      symptoms: ['Feeling like an outsider', 'Imposter syndrome', 'Fear of making mistakes'],
      solutions: [
        'Remember everyone was new once',
        'Ask questions openly',
        'Find a workplace buddy',
      ],
    },
    {
      stressor: 'Future uncertainty',
      symptoms: ['Doubting career choice', 'Worried about job prospects after apprenticeship'],
      solutions: [
        'Talk to qualified electricians',
        'Research career paths',
        'Focus on current learning',
      ],
    },
  ];

  const copingStrategies = [
    {
      strategy: 'Time management',
      techniques: [
        'Use calendar apps to track college and work commitments',
        'Set realistic daily goals',
        'Take regular breaks during study sessions',
        'Prioritise tasks by importance and deadline',
      ],
    },
    {
      strategy: 'Building confidence',
      techniques: [
        'Keep a daily achievement log',
        'Celebrate small wins',
        'Ask for feedback regularly',
        'Practice new skills in a safe environment',
      ],
    },
    {
      strategy: 'Social support',
      techniques: [
        'Connect with other apprentices',
        'Maintain friendships outside work',
        'Join apprentice online communities',
        'Talk to family about your experiences',
      ],
    },
  ];

  const warningSignsData = [
    {
      category: 'Physical signs',
      signs: ['Persistent fatigue', 'Changes in appetite', 'Sleep problems', 'Frequent headaches'],
    },
    {
      category: 'Emotional signs',
      signs: [
        'Feeling hopeless',
        'Increased irritability',
        'Loss of motivation',
        'Anxiety about work/college',
      ],
    },
    {
      category: 'Behavioural signs',
      signs: [
        'Avoiding social situations',
        'Procrastinating on college work',
        'Increased absence',
        'Substance use',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-300 flex-shrink-0" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Crisis support — get help now
          </span>
        </div>
        <p className="text-[14px] text-white/85 leading-relaxed">
          If you&apos;re in crisis, reach out immediately.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {crisisResources.map((resource, index) => (
            <div
              key={index}
              className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{resource.service}</h4>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-red-300 flex-shrink-0" />
                <span className="text-[16px] font-semibold text-white font-mono">
                  {resource.contact}
                </span>
              </div>
              <p className="text-[13px] text-white/85 leading-relaxed">{resource.description}</p>
              <span className="inline-block text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-red-500/30 bg-red-500/[0.04]">
                {resource.availability}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3">
          <p className="text-[13px] text-white text-center">
            <span className="font-semibold">Emergency:</span> If you&apos;re in immediate danger,
            call 999 or go to your nearest A&E.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Common apprentice mental health challenges
        </span>
        <div className="space-y-3">
          {apprenticeStressors.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.stressor}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Common symptoms
                  </span>
                  <ul className="space-y-1">
                    {item.symptoms.map((symptom, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[13px] text-white/85"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Helpful solutions
                  </span>
                  <ul className="space-y-1">
                    {item.solutions.map((solution, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[13px] text-white/85"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-white/55 mt-0.5 flex-shrink-0" />
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Healthy coping strategies
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {copingStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{strategy.strategy}</h4>
              <ul className="space-y-1.5">
                {strategy.techniques.map((technique, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[13px] text-white/85"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{technique}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Warning signs to watch for
        </span>
        <p className="text-[13px] text-white/70 leading-relaxed">
          If you notice these signs in yourself or others, it may be time to seek support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {warningSignsData.map((category, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{category.category}</h4>
              <ul className="space-y-1.5">
                {category.signs.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Additional mental health resources
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Elec-Mate mental health hub</h4>
            <p className="text-[13px] text-white/85 leading-relaxed">
              Access mental health resources designed specifically for electrical apprentices.
            </p>
            <Link to="/apprentice/mental-health">
              <Button className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]">
                Visit mental health hub
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Professional support</h4>
            <ul className="space-y-1.5">
              {[
                'GP referral for counselling services',
                'Employee Assistance Programmes (EAP)',
                'ACAS helpline for workplace issues',
                'Union support and advocacy',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-white/85">
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSupport;
