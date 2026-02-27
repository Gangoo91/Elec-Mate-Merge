import {
  ArrowLeft,
  Dumbbell,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Moon,
  Apple,
  Droplets,
  Activity,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm4-s1-sleep',
    question:
      'An electrician with a 5am alarm and 1-hour commute goes to bed at midnight. How many hours of sleep are they getting, and how does this compare to the NHS recommendation?',
    options: [
      '6 hours — within the recommended range',
      '5 hours — well below the recommended 7-9 hours',
      '7 hours — at the lower end but acceptable',
      '4 hours — dangerously low but common in construction',
    ],
    correctIndex: 1,
    explanation:
      'With a midnight bedtime and 5am alarm (allowing for time to fall asleep and the alarm going off before they need to leave), they are getting roughly 5 hours of sleep. The NHS and sleep research consistently recommend 7-9 hours for adults. Five hours is significantly below the minimum, leading to cumulative sleep debt that impairs reaction time, decision-making and mood.',
  },
  {
    id: 'rsm4-s1-nutrition',
    question:
      'Why do energy drinks and sugary snacks provide a poor source of sustained energy for construction workers?',
    options: [
      'They contain too many calories for physical work',
      'They cause a rapid blood sugar spike followed by a crash, leading to fatigue and dependency',
      'They are too expensive compared to other options',
      'They contain ingredients that are banned on most construction sites',
    ],
    correctIndex: 1,
    explanation:
      'High-sugar foods and energy drinks cause a rapid spike in blood glucose, which triggers a large insulin response. This leads to a sharp drop in blood sugar (the "crash"), causing fatigue, irritability and cravings for more sugar. Over time, this cycle creates dependency and contributes to weight gain, poor concentration and increased risk of type 2 diabetes.',
  },
  {
    id: 'rsm4-s1-exercise',
    question:
      'Why is structured exercise still important for construction workers, even though their work is physically demanding?',
    options: [
      'Construction work burns more calories than any form of exercise',
      'Physical labour is repetitive and stresses the same muscle groups, whereas structured exercise builds overall fitness and reduces cortisol',
      'Structured exercise is only important for office workers',
      'Construction work already provides the recommended 150 minutes of weekly exercise',
    ],
    correctIndex: 1,
    explanation:
      'Construction work is physically demanding but it is not the same as exercise. Physical labour tends to be repetitive, loading the same joints and muscle groups in the same patterns, which leads to overuse injuries rather than balanced fitness. Structured exercise — such as cardiovascular training, strength work and stretching — builds balanced fitness, reduces the stress hormone cortisol, improves cardiovascular health and helps prevent the musculoskeletal injuries that are common in the trades.',
  },
];

const faqs = [
  {
    question:
      'I work 10-hour days and have a long commute. How can I possibly get 7-9 hours of sleep?',
    answer:
      'This is the most common challenge for construction workers, and it requires honest assessment of your routine. If you leave home at 5:30am and get back at 6:30pm, you have roughly five hours before you need to be asleep by 10pm to get 7.5 hours. The key is protecting those evening hours ruthlessly: eat within an hour of getting home (meal prep helps enormously), limit screen time after 9pm, and establish a consistent wind-down routine. If your commute is genuinely making adequate sleep impossible, consider whether the job is sustainable long-term — chronic sleep deprivation of less than 6 hours per night is associated with significantly increased risk of accidents, cardiovascular disease and mental health problems. Sometimes the highest-paying job is not the best job if it destroys your health.',
  },
  {
    question: 'Is it realistic to meal prep when I am exhausted after work?',
    answer:
      "Absolutely, but you need a system that works with your energy levels, not against them. The most effective approach for tradespeople is batch cooking on Sunday: prepare 4-5 days of lunches in one session of 1-2 hours. Simple options work brilliantly — chilli, curry, pasta bake, stew — anything that reheats well and can go in a food flask or microwave container. Cook double portions of evening meals during the week and use the extra for the next day's lunch. Invest in a decent cool bag and food flasks. The initial effort of setting up a meal prep routine pays for itself within a week: you save money (easily £5-10 per day compared to buying lunch), you eat better, your energy is more stable throughout the day, and you avoid the 2pm sugar crash that comes from a meal deal and energy drink.",
  },
  {
    question: 'I have a few beers most evenings to unwind after work. Is that really a problem?',
    answer:
      'Even moderate alcohol consumption significantly disrupts sleep quality. Research shows that alcohol may help you fall asleep faster (it is a sedative), but it suppresses REM sleep — the restorative stage of sleep that consolidates memory, processes emotions and supports mental health. After alcohol, you spend more time in light sleep and are more likely to wake during the night. The result is that even after 8 hours in bed, you wake feeling unrefreshed. Two to three units of alcohol in the evening (roughly 1-2 pints) reduces sleep quality by up to 24%. Four or more units reduces it by nearly 40%. If you are using alcohol to manage stress, that is a signal worth paying attention to — it suggests the stress needs addressing directly rather than being numbed. Consider alcohol-free alternatives for weekday evenings and keep alcohol for weekends if you choose to drink.',
  },
  {
    question: 'I drink 4-5 cups of coffee a day. Should I cut down?',
    answer:
      'Moderate coffee consumption (3-4 cups per day, up to about 400mg of caffeine) is not harmful for most adults and may even have health benefits. The critical factor is timing, not quantity. Caffeine has a half-life of 5-6 hours, meaning that a coffee at 3pm still has half its caffeine active in your system at 8-9pm. For someone who needs to be asleep by 10pm, any caffeine after about 1-2pm will interfere with sleep onset and reduce sleep quality. The practical rule is simple: enjoy your coffee in the morning and early afternoon, then switch to water or decaffeinated drinks after lunch. If you are relying on afternoon coffee to stay alert, that is usually a sign of inadequate sleep or poor nutrition earlier in the day — address the root cause rather than masking the symptom.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the NHS-recommended amount of sleep per night for adults?',
    options: ['5-6 hours', '6-7 hours', '7-9 hours', '9-10 hours'],
    correctAnswer: 2,
    explanation:
      'The NHS recommends 7-9 hours of sleep per night for adults. Research consistently shows that sleeping less than 7 hours impairs cognitive function, emotional regulation, immune response and physical recovery. Construction workers, who rely on physical coordination and safety-critical decision-making, are particularly vulnerable to the effects of insufficient sleep.',
  },
  {
    id: 2,
    question:
      'Which of the following is the MOST effective sleep hygiene practice for someone with early morning starts?',
    options: [
      'Watching television in bed to relax before sleep',
      'Having an energy drink in the evening to wind down',
      'Maintaining a consistent sleep and wake schedule, even on weekends',
      'Sleeping in on weekends to catch up on lost sleep',
    ],
    correctAnswer: 2,
    explanation:
      'A consistent sleep-wake schedule is the single most important sleep hygiene practice. Your circadian rhythm (internal body clock) functions best with regularity. Going to bed and waking at the same times trains your body to expect sleep at certain hours, making it easier to fall asleep and wake refreshed. Sleeping in on weekends disrupts this rhythm (a phenomenon called "social jet lag") and can make Monday mornings even harder.',
  },
  {
    id: 3,
    question: 'What is the approximate half-life of caffeine in the human body?',
    options: ['1-2 hours', '2-3 hours', '5-6 hours', '10-12 hours'],
    correctAnswer: 2,
    explanation:
      'Caffeine has a half-life of approximately 5-6 hours. This means that a 200mg cup of coffee consumed at 2pm still has roughly 100mg of caffeine active in your system at 7-8pm. This residual caffeine can delay sleep onset and reduce sleep quality even if you do not feel wide awake. This is why sleep experts recommend no caffeine after early afternoon.',
  },
  {
    id: 4,
    question:
      'Why is construction work NOT a substitute for structured exercise, despite being physically demanding?',
    options: [
      'Construction work does not burn enough calories',
      'Physical labour stresses the same muscle groups repetitively without building balanced fitness or reducing cortisol',
      'Construction workers are already too fit to benefit from exercise',
      'Exercise only benefits office workers who are sedentary',
    ],
    correctAnswer: 1,
    explanation:
      'Construction work loads the same joints and muscles in repetitive patterns, leading to overuse injuries rather than balanced fitness. It does not typically include cardiovascular conditioning, flexibility work or balanced strength training. Structured exercise builds overall fitness, reduces the stress hormone cortisol, improves cardiovascular health and helps prevent the musculoskeletal problems that are the leading cause of early retirement in the construction industry.',
  },
  {
    id: 5,
    question: 'How does alcohol affect sleep quality?',
    options: [
      'Alcohol improves sleep quality by helping you relax',
      'Alcohol has no measurable effect on sleep quality',
      'Alcohol helps you fall asleep but suppresses REM sleep, reducing overall sleep quality',
      'Alcohol only affects sleep if consumed within 30 minutes of bedtime',
    ],
    correctAnswer: 2,
    explanation:
      'Alcohol is a sedative that may help you fall asleep faster, but it significantly disrupts sleep architecture. It suppresses REM sleep (the restorative stage critical for memory, emotional processing and mental health), increases night-time awakenings, and leads to lighter, less restorative sleep overall. Even 2-3 units in the evening can reduce sleep quality by up to 24%.',
  },
  {
    id: 6,
    question:
      'An electrician has been buying meal deals and energy drinks on site every day. Which of the following would be the most beneficial change?',
    options: [
      'Switching to a different brand of energy drink',
      'Skipping lunch entirely to save money and lose weight',
      'Batch cooking on Sundays and bringing meals in a cool bag with water',
      'Eating a larger breakfast and skipping lunch',
    ],
    correctAnswer: 2,
    explanation:
      'Batch cooking and bringing prepared meals provides sustained, balanced nutrition at a fraction of the cost of daily meal deals. A prepared lunch with complex carbohydrates, protein and vegetables provides steady energy throughout the afternoon without the blood sugar spikes and crashes caused by high-sugar convenience foods and energy drinks. The savings alone (typically £5-10 per day) are significant over a year.',
  },
  {
    id: 7,
    question:
      'What is the recommended minimum amount of moderate-intensity exercise per week for adults, according to NHS guidelines?',
    options: [
      '30 minutes per week',
      '75 minutes per week',
      '150 minutes per week',
      '300 minutes per week',
    ],
    correctAnswer: 2,
    explanation:
      'The NHS recommends at least 150 minutes of moderate-intensity aerobic activity per week (such as brisk walking, cycling or swimming) along with strength exercises on 2 or more days per week. This can be broken into manageable sessions — for example, 30 minutes on 5 days, or two longer sessions at the weekend combined with shorter weekday sessions.',
  },
  {
    id: 8,
    question:
      'Which of the following best describes the relationship between physical wellbeing and stress resilience?',
    options: [
      'Physical wellbeing has no connection to stress resilience — they are completely separate',
      'Physical wellbeing is a foundation for stress resilience: sleep, nutrition and exercise directly affect your ability to cope with stress',
      'Stress resilience is purely psychological and cannot be affected by physical habits',
      'Only exercise matters for stress resilience — sleep and nutrition are irrelevant',
    ],
    correctAnswer: 1,
    explanation:
      'Physical wellbeing forms the biological foundation of stress resilience. Sleep restores cognitive function and emotional regulation. Proper nutrition provides the brain and body with the fuel needed to manage stress responses. Exercise reduces cortisol (the stress hormone) and increases endorphins. When any of these foundations is compromised, your capacity to cope with stress is significantly diminished — which is why physical wellbeing is the starting point for building daily resilience.',
  },
];

export default function RSMModule4Section1() {
  useSEO({
    title: 'Physical Wellbeing & Recovery | RSM Module 4.1',
    description:
      'Sleep hygiene, nutrition on site, structured exercise, substance awareness, and building the physical foundations of stress resilience for construction workers.',
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
            <Link to="../rsm-module-4">
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
            <Dumbbell className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Physical Wellbeing &amp; Recovery
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Building the biological foundations of resilience through sleep, nutrition, exercise and
            substance awareness
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Sleep:</strong> 7&ndash;9 hours recommended; most construction workers get
                far less
              </li>
              <li>
                <strong>Nutrition:</strong> Meal prep beats meal deals &mdash; sustained energy vs
                sugar crashes
              </li>
              <li>
                <strong>Exercise:</strong> Physical labour is NOT the same as exercise &mdash;
                structured training reduces cortisol
              </li>
              <li>
                <strong>Substances:</strong> Alcohol disrupts sleep; caffeine after 2pm impairs
                recovery
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Sleep-deprived workers have 70% higher accident rates
              </li>
              <li>
                <strong>Resilience:</strong> Physical health is the biological foundation of stress
                resilience
              </li>
              <li>
                <strong>Performance:</strong> Well-rested, well-nourished workers are measurably
                more productive
              </li>
              <li>
                <strong>Longevity:</strong> Good physical habits protect your career and quality of
                life
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain why 7-9 hours of sleep is essential and how sleep deprivation impairs safety and performance',
              'Apply practical sleep hygiene strategies suited to early-start construction schedules',
              'Distinguish between sustained nutrition and sugar-spike eating patterns on site',
              'Explain why structured exercise is necessary even for physically demanding trades',
              'Describe how alcohol, energy drinks and caffeine affect sleep architecture and recovery',
              'Create a realistic personal wellbeing plan that fits around a construction work schedule',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Sleep */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Sleep: The Non-Negotiable Foundation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sleep is not a luxury &mdash; it is a biological necessity. The NHS recommends
                7&ndash;9 hours of sleep per night for adults, and research consistently shows that
                sleeping less than 7 hours impairs cognitive function, emotional regulation, immune
                response and physical recovery. For construction workers, who rely on physical
                coordination, spatial awareness and safety-critical decision-making every single
                day, inadequate sleep is not just a quality-of-life issue &mdash; it is a safety
                issue.
              </p>

              <p>
                Yet the construction industry has some of the worst sleep patterns of any sector in
                the UK. Early starts (often 6am or earlier on site), long commutes, physically
                exhausting days and the culture of &ldquo;grafting through it&rdquo; combine to
                create a workforce that is chronically sleep-deprived. Research by the British
                Safety Council found that construction workers who sleep less than 6 hours per night
                have a 70% higher rate of workplace accidents compared to those who sleep 7 hours or
                more.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Moon className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    What Happens When You Do Not Sleep Enough
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      hours: 'Less than 7 hours',
                      effect:
                        'Impaired reaction time, reduced concentration, increased irritability, weakened immune response. You are measurably less safe on site.',
                    },
                    {
                      hours: 'Less than 6 hours',
                      effect:
                        'Significant cognitive impairment equivalent to a blood alcohol level of 0.05%. Decision-making is compromised. Emotional regulation breaks down — you are more likely to snap at colleagues or clients.',
                    },
                    {
                      hours: 'Less than 5 hours',
                      effect:
                        'Severe impairment. Reaction times comparable to legal intoxication. Risk of microsleeps (brief involuntary episodes of sleep) during monotonous tasks. Significantly increased risk of accidents, errors and injuries.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded">
                      <p className="text-xs font-medium text-rose-400 mb-1">{item.hours}</p>
                      <p className="text-xs text-white">{item.effect}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Reality: The 5am Alarm Problem
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Consider a typical scenario: an electrician has a 5am alarm, a 1-hour commute, and
                  needs to be on site by 6:30am. They finish at 4:30pm, drive home for an hour, eat,
                  shower, spend time with family, and by the time they sit down it is 8pm. They
                  watch television until 11:30pm because this is their only &ldquo;free time&rdquo;,
                  fall asleep around midnight, and the alarm goes off at 5am. That is five hours of
                  sleep &mdash; chronically below the minimum recommended amount.
                </p>
                <p className="text-sm text-white">
                  This pattern is incredibly common in construction, and it has a cumulative effect.
                  Sleep debt builds up over the week: by Friday, after five consecutive nights of 5
                  hours, the electrician has accumulated 10&ndash;20 hours of sleep debt. Their
                  reaction time, judgement and emotional regulation are severely compromised. They
                  are operating on site in a state comparable to mild intoxication &mdash; yet the
                  culture treats this as normal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Sleep Hygiene */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Sleep Hygiene: Practical Strategies for Early Starts
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sleep hygiene refers to the habits and environmental conditions that promote
                consistent, high-quality sleep. For construction workers with early starts, good
                sleep hygiene is not optional &mdash; it is the difference between functioning well
                and functioning dangerously. The following strategies are evidence-based and
                specifically adapted for the demands of construction work.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">1. Consistent Schedule</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Go to bed and wake up at the same time every day, including weekends. Your
                    circadian rhythm (internal body clock) functions best with regularity. If you
                    need to be up at 5am, work backwards: you need to be asleep by 9:30&ndash;10pm
                    to get 7&ndash;7.5 hours. That means starting your wind-down routine by 9pm.
                  </p>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">The weekend trap:</strong> Sleeping in until
                      10am on Saturday and Sunday feels like &ldquo;catching up&rdquo;, but it
                      actually shifts your body clock, making Monday morning even harder. This is
                      called &ldquo;social jet lag&rdquo; and it has the same effect as flying
                      across time zones. Try to keep your weekend wake time within 1 hour of your
                      weekday time.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">2. Dark, Cool, Quiet Room</p>
                  </div>
                  <p className="text-sm text-white">
                    Your bedroom should be dark (blackout curtains or a sleep mask &mdash; essential
                    in summer when it is light until 10pm), cool (16&ndash;18&deg;C is optimal), and
                    quiet (earplugs if you live on a noisy road or have a partner with a different
                    schedule). Your brain associates darkness with sleep through melatonin
                    production &mdash; even small amounts of light from standby LEDs, phone screens
                    or gaps in curtains can suppress melatonin and delay sleep onset.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      3. No Screens 1 Hour Before Bed
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Phone, tablet and laptop screens emit blue light that suppresses melatonin
                    production and stimulates the brain. Scrolling social media or watching intense
                    content also activates the sympathetic nervous system (fight-or-flight), making
                    it harder to wind down. Set a &ldquo;screens off&rdquo; time one hour before
                    bed. This is the single hardest sleep hygiene change for most people &mdash; and
                    often the most impactful. Replace screen time with reading, stretching, a warm
                    shower, or simply talking to your partner or family.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">4. No Caffeine After 2pm</p>
                  </div>
                  <p className="text-sm text-white">
                    Caffeine has a half-life of 5&ndash;6 hours. A coffee at 3pm still has half its
                    caffeine active in your body at 8&ndash;9pm. Even if you feel like you can fall
                    asleep after afternoon caffeine, research shows it reduces the depth and quality
                    of your sleep. Switch to water, herbal tea or decaffeinated coffee after
                    lunchtime.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The 9pm Rule:</strong> If you have a 5am alarm,
                  the single most important habit you can build is a 9pm wind-down. Screens off,
                  lights dimmed, and a consistent routine (shower, read, prepare tomorrow&rsquo;s
                  kit). Within 2&ndash;3 weeks, your body will begin to associate this routine with
                  sleep, and falling asleep will become significantly easier. It sounds simple, but
                  for many construction workers this single change adds 1&ndash;2 hours of sleep per
                  night.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Nutrition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Nutrition: Sustained Energy vs Sugar Spikes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                What you eat directly affects your energy levels, concentration, mood and
                resilience. Construction work burns significant calories &mdash; a physically active
                electrician may need 2,500&ndash;3,500 calories per day depending on the intensity
                of the work. But it is not just about quantity &mdash; the <strong>quality</strong>{' '}
                and <strong>timing</strong> of your nutrition matters enormously.
              </p>

              <p>
                The typical construction site diet &mdash; a greasy spoon breakfast, meal deal
                lunch, energy drinks throughout the day and a takeaway in the evening &mdash; is a
                recipe for energy crashes, weight gain and long-term health problems. It is also
                expensive: the average construction worker spending £8&ndash;12 per day on bought
                food and drinks is spending £2,000&ndash;3,000 per year that could be saved with
                basic meal preparation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Apple className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Blood Sugar Roller Coaster
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">Sugar Spike Pattern</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>6am: Large coffee with sugar + energy drink</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>10am: Chocolate bar + another energy drink</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>12:30: Meal deal (white bread sandwich, crisps, sugary drink)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>2:30pm: Crash &mdash; fatigue, irritability, poor concentration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>3pm: Another energy drink to push through</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Sustained Energy Pattern
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>5:30am: Porridge with banana + coffee (no sugar)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>10am: Apple + handful of nuts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>12:30: Batch-cooked meal (rice, chicken, vegetables) from flask</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>2:30pm: Steady energy, maintained concentration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>3pm: Water + small snack if needed (flapjack, yoghurt)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Van Meals vs Packed Lunches: The Real Numbers
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A sparky buying lunch on site every day typically spends: coffee (£2.50),
                  breakfast roll (£3.50), energy drink (£1.50), meal deal (£4.50), afternoon snack
                  and drink (£3.00) = roughly £15 per day, or £75 per week, or{' '}
                  <strong>£3,750 per year</strong>.
                </p>
                <p className="text-sm text-white">
                  The same sparky batch cooking on Sunday and bringing meals from home: weekly
                  grocery shop for work food costs roughly £25&ndash;30, saving{' '}
                  <strong>£2,250&ndash;£2,500 per year</strong>. The home-prepared food is also
                  nutritionally superior: more protein, more fibre, less sugar, fewer additives, and
                  better energy stability throughout the day.
                </p>
              </div>

              <p>
                <strong>Hydration on site</strong> is particularly important and commonly neglected,
                especially during summer. Dehydration of just 2% body weight reduces cognitive
                performance by up to 20%. On a hot summer day, a construction worker can lose
                1&ndash;2 litres of fluid per hour through sweat. The solution is simple: carry a
                large water bottle (at least 2 litres), drink regularly throughout the day rather
                than waiting until you feel thirsty (thirst indicates you are already dehydrated),
                and monitor the colour of your urine &mdash; pale straw is well-hydrated; dark
                yellow indicates dehydration. Water is the best option. Sports drinks are only
                necessary during intense physical work lasting more than 90 minutes in high
                temperatures.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Exercise */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Exercise: Why Physical Labour Is Not Enough
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common misconceptions in the construction industry is that physical
                work on site counts as exercise. It does not &mdash; at least not in the way your
                body needs. Construction work is physically demanding, but it is fundamentally
                different from structured exercise in several critical ways.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Physical Labour vs Structured Exercise
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Repetitive Loading</p>
                    <p className="text-xs text-white">
                      Construction work loads the same muscle groups in the same patterns day after
                      day. Pulling cables, lifting materials overhead, kneeling to wire sockets
                      &mdash; these repetitive movements create overuse injuries, not balanced
                      fitness. Your shoulders, back, knees and wrists take a hammering while other
                      muscle groups go undeveloped.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      No Cardiovascular Conditioning
                    </p>
                    <p className="text-xs text-white">
                      Most construction work involves bursts of effort with rest periods, not
                      sustained cardiovascular activity. Your heart rate may spike when carrying
                      heavy materials but it does not stay elevated in the way that running, cycling
                      or swimming would keep it. This means construction work does not effectively
                      train your heart and lungs.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">No Cortisol Reduction</p>
                    <p className="text-xs text-white">
                      One of the most important benefits of structured exercise is that it reduces
                      cortisol (the stress hormone) and increases endorphins (natural mood
                      boosters). Physical labour under time pressure and in stressful conditions can
                      actually <em>increase</em> cortisol rather than reduce it. A 30-minute gym
                      session or run after work actively counteracts the stress of the day in a way
                      that the physical demands of the job simply do not.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The NHS recommends at least 150 minutes of moderate-intensity aerobic activity per
                week (such as brisk walking, cycling, swimming or jogging), plus strength exercises
                on 2 or more days per week. For construction workers, this does not need to be an
                intense gym regime. A 30-minute brisk walk, a cycle ride, a bodyweight workout at
                home, or even a kickabout in the park all count. The key is that it is{' '}
                <strong>different</strong> from your work &mdash; balanced, controlled, and focused
                on overall fitness rather than the specific physical demands of your trade.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: The Evening Gym Routine
                  </p>
                </div>
                <p className="text-sm text-white">
                  A sparky named Dave was sceptical about exercise after work &mdash; &ldquo;I have
                  been on my feet all day, the last thing I need is a gym session.&rdquo; He started
                  with a simple routine: three evenings a week, he did a 20-minute bodyweight
                  circuit at home (press-ups, squats, lunges, planks, stretching) and a 30-minute
                  walk on two other evenings. Within a month, he noticed significant changes: his
                  back pain reduced because the exercises were strengthening his core muscles that
                  construction work neglected, he slept better because the exercise helped reduce
                  his cortisol levels, and his mood improved noticeably. Crucially, the exercise
                  also gave him a clear boundary between &ldquo;work Dave&rdquo; and &ldquo;home
                  Dave&rdquo; &mdash; the workout became a transition ritual that helped him switch
                  off from the stresses of the day.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> Exercise is not about losing
                  weight or building muscle (though it may do both). For stress resilience, the most
                  important benefit of exercise is its effect on your nervous system: it reduces
                  cortisol, increases endorphins, improves sleep quality, and builds the
                  physiological capacity to handle stress. Think of exercise as stress inoculation
                  &mdash; it trains your body to manage the stress response more effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Substance Awareness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Substance Awareness: Alcohol, Energy Drinks &amp; Caffeine
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many construction workers use substances &mdash; alcohol, energy drinks, caffeine
                &mdash; to manage their energy levels and stress. These substances are legal, widely
                available and socially accepted. But understanding their effects on sleep, recovery
                and stress resilience is essential for making informed choices about your own
                health.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Alcohol</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Alcohol is the most commonly used substance in UK construction. The culture of
                    &ldquo;a few pints after work&rdquo; is deeply embedded, and for many
                    tradespeople alcohol is the primary way they unwind after a stressful day.
                    However, research is clear on the effects:
                  </p>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Sleep architecture:</strong> Alcohol is a sedative that helps you
                        fall asleep faster, but it suppresses REM sleep &mdash; the restorative
                        stage that consolidates memory, processes emotions and supports mental
                        health. After drinking, you spend more time in light sleep and are more
                        likely to wake during the night.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Quantified impact:</strong> 2&ndash;3 units (roughly 1&ndash;2
                        pints) reduces sleep quality by up to 24%. Four or more units reduces it by
                        nearly 40%. You may spend 8 hours in bed but wake feeling unrefreshed.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Stress management:</strong> If you are using alcohol to manage
                        stress, that is a signal worth paying attention to. Alcohol numbs stress
                        temporarily but does not resolve it &mdash; and the disrupted sleep makes
                        you less resilient the following day, creating a vicious cycle.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Energy Drinks</p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Energy drink consumption is extremely high in UK construction. Many workers
                    drink 2&ndash;4 cans per day, often starting on the drive to site. The appeal is
                    obvious: they provide an immediate boost of alertness and energy. But the cost
                    is significant:
                  </p>
                  <ul className="text-sm text-white space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Caffeine load:</strong> A standard 500ml energy drink contains
                        150&ndash;160mg of caffeine. Two cans is 300&ndash;320mg &mdash; nearly the
                        daily recommended limit of 400mg. Combined with morning coffee, many
                        construction workers consume 500&ndash;700mg of caffeine per day.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Sugar content:</strong> Many energy drinks contain 50&ndash;70g of
                        sugar per can (the NHS recommends no more than 30g per day). This creates
                        the blood sugar roller coaster described in the nutrition section.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Dependency:</strong> Regular energy drink consumption creates
                        tolerance &mdash; you need more to achieve the same effect. Withdrawal
                        symptoms (headaches, fatigue, irritability) reinforce the habit. Many
                        workers report that they cannot function without their morning energy drink
                        &mdash; this is dependency, not preference.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Caffeine: Timing Is Everything
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Caffeine itself is not harmful in moderate amounts (up to 400mg per day for most
                    adults). The critical factor is timing. Caffeine has a half-life of 5&ndash;6
                    hours: a coffee at 3pm means roughly half the caffeine is still in your system
                    at 8&ndash;9pm. Even if you feel like you can fall asleep, that residual
                    caffeine is reducing the depth and quality of your sleep. The practical rule:
                    enjoy coffee in the morning and early afternoon, then switch to water or
                    decaffeinated alternatives. If you are relying on afternoon caffeine to stay
                    alert, the real issue is probably inadequate sleep or poor nutrition &mdash;
                    address the root cause rather than masking the symptom.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">No Judgement, Just Information:</strong> This
                  section is not about telling you what to do or making you feel guilty about your
                  habits. It is about giving you the information to make informed choices. If you
                  choose to have a couple of beers on a Friday night, that is your call. But if you
                  are having several drinks every evening and struggling with sleep, energy and mood
                  &mdash; understanding the connection between alcohol and sleep quality gives you
                  the power to make a different choice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Putting It All Together: Your Physical Wellbeing Plan
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Physical wellbeing is not about achieving perfection &mdash; it is about making
                incremental improvements that build a stronger foundation for stress resilience. You
                do not need to overhaul your entire lifestyle overnight. Research on behaviour
                change consistently shows that small, sustainable changes are far more effective
                than dramatic transformations that collapse within a few weeks.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Start with One Change</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Pick the one area where you know you are most vulnerable and make a single change
                  this week. Here are examples:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Sleep:</strong> Set a 9pm &ldquo;screens off&rdquo; alarm on your
                      phone and stick to it for one week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Nutrition:</strong> Batch cook one meal on Sunday and bring it to site
                      on Monday instead of buying lunch
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Exercise:</strong> Go for a 20-minute walk three evenings this week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Substances:</strong> Switch your afternoon energy drink to water for
                      one week and notice the difference in your sleep
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Hydration:</strong> Carry a 2-litre water bottle to site and aim to
                      finish it by the end of each day
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                These changes are small, but their compound effect is significant. Sleep improves
                nutrition choices (you make better food decisions when rested). Better nutrition
                improves energy and mood. More energy makes exercise easier. Exercise improves
                sleep. Each positive change reinforces the others, creating an upward spiral that
                builds physical resilience over time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: Social Connection &amp; Peer Support
                </p>
                <p className="text-sm text-white">
                  Physical wellbeing is the foundation, but humans are social beings. In Section 2,
                  we explore why social connection is the number one protective factor against
                  stress and mental health problems, and how construction workers can build stronger
                  support networks in a traditionally closed-off industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4-section-2">
              Next: Social Connection &amp; Peer Support
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
