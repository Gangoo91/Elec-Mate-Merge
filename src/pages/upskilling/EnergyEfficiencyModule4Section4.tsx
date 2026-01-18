import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  MessageSquare,
  Monitor,
  Award,
  FileText,
  TrendingUp,
  Lightbulb,
  Target,
  Brain,
  Zap,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Megaphone,
  ClipboardCheck,
  Heart,
  Building2,
  LineChart
} from 'lucide-react';

const EnergyEfficiencyModule4Section4: React.FC = () => {
  useSEO({
    title: 'Behavioural Measures and Awareness | Energy Efficiency Module 4 Section 4',
    description: 'Learn about no-cost and low-cost energy savings through behavioural change, awareness campaigns, feedback mechanisms, and sustaining engagement in UK workplaces.',
    keywords: [
      'behavioural energy savings',
      'energy awareness campaigns',
      'green champions',
      'energy feedback displays',
      'workplace energy culture',
      'sustainable behaviour change',
      'energy policy development',
      'UK energy efficiency'
    ]
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'What percentage of energy savings can typically be achieved through behavioural measures alone in commercial buildings?',
      options: ['1-3%', '5-20%', '25-40%', '50-60%'],
      correctIndex: 1,
      explanation: 'Behavioural measures can typically achieve 5-20% energy savings in commercial buildings at no or low cost. This makes them one of the most cost-effective energy management strategies available.'
    },
    {
      id: 'qc2',
      question: 'What is the primary role of a "Green Champion" in an organisation?',
      options: [
        'To manage the building maintenance team',
        'To act as a local energy advocate and peer influencer',
        'To approve capital expenditure on equipment',
        'To conduct formal energy audits'
      ],
      correctIndex: 1,
      explanation: 'Green Champions act as local energy advocates and peer influencers within their departments. They promote energy-efficient behaviours, share best practices, and provide a link between staff and the energy management team.'
    },
    {
      id: 'qc3',
      question: 'Which feedback mechanism has been shown to be most effective for changing energy behaviour?',
      options: [
        'Annual energy reports',
        'Monthly utility bills',
        'Real-time energy displays',
        'Quarterly newsletters'
      ],
      correctIndex: 2,
      explanation: 'Real-time energy displays are most effective because they provide immediate feedback, allowing occupants to see the direct impact of their actions. Studies show real-time feedback can achieve 5-15% savings compared to 0-10% for historical feedback.'
    }
  ];

  const quizQuestions = [
    {
      question: 'According to research, what is the typical payback period for behavioural energy programmes?',
      options: ['3-5 years', '1-2 years', 'Less than 6 months', '5-10 years'],
      correctAnswer: 'Less than 6 months'
    },
    {
      question: 'Which of the following is NOT typically considered a behavioural measure?',
      options: [
        'Switching off lights when leaving',
        'Installing LED lighting',
        'Closing windows when heating is on',
        'Reporting equipment faults promptly'
      ],
      correctAnswer: 'Installing LED lighting'
    },
    {
      question: 'What is the recommended frequency for energy awareness communications to maintain engagement without causing fatigue?',
      options: ['Daily', 'Weekly to fortnightly', 'Monthly', 'Quarterly'],
      correctAnswer: 'Weekly to fortnightly'
    },
    {
      question: 'Which psychological principle suggests that people are more motivated by potential losses than equivalent gains?',
      options: ['Social proof', 'Loss aversion', 'Reciprocity', 'Authority bias'],
      correctAnswer: 'Loss aversion'
    },
    {
      question: 'What percentage of UK commercial building energy is typically wasted through poor occupant behaviour?',
      options: ['5%', '10-15%', '20-30%', '40-50%'],
      correctAnswer: '20-30%'
    },
    {
      question: 'Which metric is most useful for tracking the success of a behavioural change programme?',
      options: [
        'Total energy consumption',
        'Energy intensity (kWh/m2)',
        'Number of employees trained',
        'Cost per kWh'
      ],
      correctAnswer: 'Energy intensity (kWh/m2)'
    },
    {
      question: 'What is the "Hawthorne Effect" in the context of energy behaviour?',
      options: [
        'Energy savings increase when people know they are being observed',
        'Energy consumption rises in winter months',
        'People use more energy at home than at work',
        'Older employees are more energy conscious'
      ],
      correctAnswer: 'Energy savings increase when people know they are being observed'
    },
    {
      question: 'Which approach is most effective for sustaining long-term behavioural change?',
      options: [
        'One-off training sessions',
        'Financial penalties for waste',
        'Continuous engagement with regular reinforcement',
        'Mandatory compliance policies only'
      ],
      correctAnswer: 'Continuous engagement with regular reinforcement'
    },
    {
      question: 'What is the recommended ratio of Green Champions to staff for effective coverage?',
      options: ['1:10', '1:25-50', '1:100', '1:200'],
      correctAnswer: '1:25-50'
    },
    {
      question: 'Which type of energy feedback display has shown the highest engagement rates?',
      options: [
        'Numerical kWh displays',
        'Traffic light systems with comparative data',
        'Cost-only displays',
        'Carbon emission counters'
      ],
      correctAnswer: 'Traffic light systems with comparative data'
    }
  ];

  const faqs = [
    {
      question: 'How do I convince senior management to invest in behavioural programmes?',
      answer: 'Present the business case using ROI data: behavioural programmes typically deliver 5-20% savings with payback periods under 6 months. Highlight that these are often no-cost or low-cost interventions. Include case studies from similar organisations, emphasise co-benefits like improved staff engagement and corporate reputation, and propose a pilot programme to demonstrate results before wider rollout. Frame energy waste as avoidable cost that affects the bottom line.'
    },
    {
      question: 'What should I do if staff are resistant to changing their behaviour?',
      answer: 'Address resistance by understanding the underlying concerns first. Common barriers include perceived inconvenience, scepticism about impact, and lack of awareness. Counter these by making desired behaviours easy and convenient, providing clear evidence of impact through feedback displays, involving staff in solution development, and recognising positive contributions. Avoid blame and focus on collective improvement. Peer influence through Green Champions is often more effective than top-down mandates.'
    },
    {
      question: 'How can I measure the impact of behavioural interventions separately from other factors?',
      answer: 'Use a combination of approaches: establish baseline consumption before intervention, control for weather using degree-day normalisation, track occupancy levels, and where possible run controlled trials comparing similar areas with and without intervention. Sub-metering helps isolate specific end-uses. Track leading indicators like participation rates and reported behaviours alongside energy data. Statistical regression analysis can help separate behavioural impacts from other variables.'
    },
    {
      question: 'How often should energy awareness campaigns be refreshed to maintain interest?',
      answer: 'Campaigns should be refreshed every 3-6 months with new themes, messages, and activities to prevent fatigue. However, maintain consistent underlying messages about key behaviours. Use seasonal themes (summer cooling, winter heating) to keep content relevant. Vary communication channels and formats. Monitor engagement metrics and refresh more frequently if interest drops. Annual events like Energy Awareness Week provide natural refresh points.'
    },
    {
      question: 'What are the most effective incentives for encouraging energy-efficient behaviour?',
      answer: 'Research shows non-financial incentives are often more effective than cash rewards. Recognition programmes, team competitions, and gamification drive engagement through social motivation. If using financial incentives, link rewards to team rather than individual performance to encourage collaboration. Avoid incentives that could be perceived as unfair or that reward normal expected behaviour. Consider charitable donations in the organisations name as an alternative. The most powerful motivator is often simply feedback showing the positive impact of actions.'
    },
    {
      question: 'How do I maintain momentum after the initial enthusiasm wears off?',
      answer: 'Sustaining change requires ongoing effort: embed energy efficiency in standard procedures and job descriptions, maintain regular communication (weekly tips, monthly updates), celebrate and publicise successes, refresh the Green Champion network with new recruits, conduct periodic energy events and competitions, integrate with other business priorities like cost reduction and sustainability goals, and ensure senior leadership continues to demonstrate commitment. Address any backsliding promptly but constructively.'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-4">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-elec-yellow text-xs font-medium">Module 4 - Section 4</p>
            <h1 className="text-base font-semibold truncate">Behavioural Measures and Awareness</h1>
          </div>
          <div className="p-2 bg-elec-yellow/20 rounded-lg">
            <Users className="w-5 h-5 text-elec-yellow" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Summary */}
        <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-4">
          <p className="text-white/90 leading-relaxed">
            Discover how to unlock <span className="text-elec-yellow font-semibold">5-20% energy savings</span> through
            behavioural change - often the most cost-effective energy management strategy available. Learn to build a
            culture of energy awareness that delivers lasting results.
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white/5 border border-elec-yellow/30 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Learning Objectives
          </h2>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Understand the potential and limitations of behavioural energy savings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Design effective energy awareness campaigns and engagement strategies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Implement feedback mechanisms that drive behaviour change</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Establish and support Green Champion networks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Develop policies and procedures that support energy efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Measure, evaluate and sustain behavioural change programmes</span>
            </li>
          </ul>
        </div>

        {/* Section 1: Impact of Behaviour on Energy Consumption */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            <BarChart3 className="w-5 h-5 text-elec-yellow" />
            Impact of Behaviour on Energy Consumption
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Occupant behaviour is one of the most significant yet often overlooked factors in building
              energy consumption. Research consistently shows that <span className="text-elec-yellow font-semibold">
              behavioural measures can achieve 5-20% energy savings</span> in commercial buildings - often
              at zero or minimal cost.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                The Scale of the Opportunity
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Typical Energy Waste</h4>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>Lights left on in unoccupied areas: 10-15% of lighting energy</li>
                    <li>Equipment left on standby: 5-10% of plug load energy</li>
                    <li>Windows open with heating/cooling on: 10-20% HVAC waste</li>
                    <li>Incorrect thermostat settings: 5-15% heating/cooling waste</li>
                    <li>Poor reporting of faults: Variable but significant</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">UK Context</h4>
                  <ul className="space-y-1 text-sm text-white/70">
                    <li>UK commercial buildings waste 20-30% of energy through behaviour</li>
                    <li>Average office PC left on 24/7 costs approximately 50 per year</li>
                    <li>1 degree C setpoint change = 8% heating/cooling cost difference</li>
                    <li>UK businesses spend over 30 billion annually on energy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Understanding Energy Behaviour
              </h3>
              <p className="mb-3 text-white/70">
                Human behaviour around energy use is influenced by multiple factors:
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white/5 rounded p-3">
                  <h4 className="font-semibold text-elec-yellow text-sm mb-2">Knowledge</h4>
                  <p className="text-sm text-white/60">Awareness of energy-efficient practices and their impact</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <h4 className="font-semibold text-elec-yellow text-sm mb-2">Motivation</h4>
                  <p className="text-sm text-white/60">Personal values, social norms, incentives, and perceived benefits</p>
                </div>
                <div className="bg-white/5 rounded p-3">
                  <h4 className="font-semibold text-elec-yellow text-sm mb-2">Opportunity</h4>
                  <p className="text-sm text-white/60">Physical environment, time constraints, and enabling factors</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Key Behavioural Principles
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><strong className="text-white">Make it easy:</strong> Remove barriers to desired behaviour - convenient recycling bins, automatic settings</li>
                <li><strong className="text-white">Make it social:</strong> Use peer influence and social norms - "Most people switch off..."</li>
                <li><strong className="text-white">Make it timely:</strong> Prompt at the point of decision - stickers on switches</li>
                <li><strong className="text-white">Make it attractive:</strong> Frame messages positively, use engaging formats</li>
                <li><strong className="text-white">Loss aversion:</strong> People respond more to potential losses than gains</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Energy Awareness Campaigns */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            <Megaphone className="w-5 h-5 text-elec-yellow" />
            Energy Awareness Campaigns and Engagement
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Effective awareness campaigns go beyond posters on walls. They create genuine engagement,
              make energy visible, and give people the knowledge and motivation to change their behaviour.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Campaign Design Principles</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">1. Know Your Audience</h4>
                  <p className="text-sm text-white/70 mb-2">Different groups respond to different messages:</p>
                  <ul className="text-sm space-y-1 ml-4 text-white/60">
                    <li><strong className="text-white">Senior managers:</strong> Focus on cost savings, corporate reputation, compliance</li>
                    <li><strong className="text-white">Finance teams:</strong> Emphasise ROI and budget impacts</li>
                    <li><strong className="text-white">General staff:</strong> Environmental benefits, easy actions, team involvement</li>
                    <li><strong className="text-white">Technical staff:</strong> Data, efficiency metrics, technical solutions</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">2. Multi-Channel Communication</h4>
                  <ul className="text-sm space-y-1 text-white/60">
                    <li>Digital: Intranet, email newsletters, digital signage, screensavers</li>
                    <li>Physical: Posters, stickers at point of use, display boards</li>
                    <li>Events: Launch days, themed weeks, competitions</li>
                    <li>Personal: Team meetings, one-to-one conversations, Green Champions</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">3. Timing and Frequency</h4>
                  <p className="text-sm text-white/60">Weekly to fortnightly communications maintain engagement without fatigue.
                  Use seasonal themes and link to relevant events (Energy Awareness Week, Earth Day).</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Effective Campaign Elements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">High Impact Actions to Promote</h4>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Switch off monitors and equipment at end of day
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Turn off lights in unoccupied areas
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Report faults and inefficiencies promptly
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Close windows and doors when heating/cooling
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Use stairs instead of lifts for short journeys
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-elec-yellow" />
                      Avoid personal heaters and fans where possible
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Engagement Techniques</h4>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Competitions between teams/floors/buildings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Pledges and public commitments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Gamification and leaderboards
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Energy treasure hunts and audits
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Recognition and reward programmes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Success stories and case studies
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                UK Case Study: Local Authority Energy Campaign
              </h4>
              <p className="text-sm text-white/70">
                A UK local authority implemented a comprehensive behaviour change programme across 50 buildings.
                Key elements included Green Champions in each location, monthly energy newsletters, inter-building
                competitions, and real-time energy displays in reception areas. After 12 months, the programme
                achieved 14% energy reduction, saving approximately 180,000 annually with a programme cost of
                just 25,000.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 3: Feedback Mechanisms */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Monitor className="w-5 h-5 text-elec-yellow" />
            Feedback Mechanisms and Real-Time Displays
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Feedback is essential for behaviour change - people cannot modify what they cannot measure.
              The type, timing, and presentation of feedback significantly affects its impact on behaviour.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Types of Energy Feedback</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-elec-yellow">Feedback Type</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Timing</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Typical Savings</th>
                      <th className="text-left py-2 px-3 text-elec-yellow">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Annual energy bills</td>
                      <td className="py-2 px-3">Yearly</td>
                      <td className="py-2 px-3">0-2%</td>
                      <td className="py-2 px-3">None</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Monthly reports</td>
                      <td className="py-2 px-3">Monthly</td>
                      <td className="py-2 px-3">2-5%</td>
                      <td className="py-2 px-3">Low</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Weekly dashboards</td>
                      <td className="py-2 px-3">Weekly</td>
                      <td className="py-2 px-3">4-8%</td>
                      <td className="py-2 px-3">Low-Medium</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Real-time displays</td>
                      <td className="py-2 px-3">Instant</td>
                      <td className="py-2 px-3">5-15%</td>
                      <td className="py-2 px-3">Medium</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Smart plugs with feedback</td>
                      <td className="py-2 px-3">Instant</td>
                      <td className="py-2 px-3">10-20%</td>
                      <td className="py-2 px-3">Low per unit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Effective Display Design</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Design Principles</h4>
                  <ul className="text-sm space-y-2 text-white/70">
                    <li><strong className="text-elec-yellow">Simplicity:</strong> Avoid information overload - focus on 2-3 key metrics</li>
                    <li><strong className="text-elec-yellow">Context:</strong> Compare to targets, historical data, or similar buildings</li>
                    <li><strong className="text-elec-yellow">Actionable:</strong> Link consumption to behaviours people can control</li>
                    <li><strong className="text-elec-yellow">Visual:</strong> Use colours, gauges, and graphics rather than numbers alone</li>
                    <li><strong className="text-elec-yellow">Location:</strong> Place where people naturally pause - entrances, break areas</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Traffic Light Display Example</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500"></div>
                      <span className="text-sm text-white/70">Green: Below target - excellent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-white/70">Amber: Near target - maintain vigilance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-500"></div>
                      <span className="text-sm text-white/70">Red: Above target - action needed</span>
                    </div>
                  </div>
                  <p className="text-xs mt-3 text-white/50">
                    Studies show traffic light systems with comparative data achieve highest engagement
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                The Hawthorne Effect
              </h4>
              <p className="text-sm text-white/70">
                Be aware of the Hawthorne Effect - energy savings often increase when people know they are
                being monitored. This can inflate initial results but fade over time. To address this:
                establish baselines before announcing programmes, plan for some regression, and use ongoing
                engagement to maintain awareness. The monitoring itself has value, but sustainable change
                requires genuine behaviour modification.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 4: Green Champions */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <Award className="w-5 h-5 text-elec-yellow" />
            Green Champions and Energy Teams
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              Green Champions are volunteer employees who act as local energy advocates within their
              departments. They provide peer influence, which research shows is one of the most powerful
              drivers of behaviour change.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">The Role of Green Champions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Core Responsibilities</h4>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li>Promote energy-efficient behaviours in their area</li>
                    <li>Lead by example in daily practices</li>
                    <li>Share tips and best practices with colleagues</li>
                    <li>Report energy waste and efficiency opportunities</li>
                    <li>Communicate campaign messages locally</li>
                    <li>Provide feedback to the energy team</li>
                    <li>Support energy events and initiatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Why Peer Influence Works</h4>
                  <ul className="text-sm space-y-1 text-white/70">
                    <li>Messages from peers are more trusted than from management</li>
                    <li>Local knowledge of specific issues and opportunities</li>
                    <li>Can tailor messages to team culture</li>
                    <li>More accessible for questions and feedback</li>
                    <li>Creates social norms within teams</li>
                    <li>Demonstrates that "normal people" care about energy</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Establishing a Champion Network</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">1. Recruitment</h4>
                  <ul className="text-sm space-y-1 text-white/60">
                    <li>Target ratio: 1 Champion per 25-50 employees</li>
                    <li>Seek volunteers with enthusiasm and influence</li>
                    <li>Ensure representation across all departments/floors</li>
                    <li>Gain line manager support for time allocation</li>
                    <li>Mix of seniority levels but avoid making it "management only"</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">2. Training and Support</h4>
                  <ul className="text-sm space-y-1 text-white/60">
                    <li>Initial training on energy basics and key messages</li>
                    <li>Regular updates and refresher sessions</li>
                    <li>Provide resources: fact sheets, posters, presentation materials</li>
                    <li>Clear escalation routes for issues identified</li>
                    <li>Recognition for their contributions</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">3. Ongoing Engagement</h4>
                  <ul className="text-sm space-y-1 text-white/60">
                    <li>Monthly Champion meetings (in person or virtual)</li>
                    <li>Share performance data and success stories</li>
                    <li>Rotate responsibilities to maintain interest</li>
                    <li>Annual appreciation event or awards</li>
                    <li>Include Champion role in appraisals/development plans</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 5: Policy Development */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <FileText className="w-5 h-5 text-elec-yellow" />
            Policy Development and Operational Procedures
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              While voluntary behaviour change is powerful, it must be supported by clear policies and
              procedures. These provide the framework within which good behaviour becomes the default,
              and poor behaviour is harder to sustain.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Essential Energy Policies</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Corporate Energy Policy</h4>
                  <p className="text-sm text-white/60 mb-2">A high-level statement of commitment signed by senior leadership:</p>
                  <ul className="text-sm space-y-1 ml-4 text-white/60">
                    <li>Commitment to continuous improvement in energy efficiency</li>
                    <li>Energy performance targets</li>
                    <li>Expectation of staff engagement and responsibility</li>
                    <li>Resource commitment</li>
                    <li>Review and update frequency</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Operational Procedures</h4>
                  <p className="text-sm text-white/60 mb-2">Practical procedures that embed efficiency into daily operations:</p>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    <ul className="text-sm space-y-1 text-white/60">
                      <li>Switch-off procedures for end of day</li>
                      <li>Heating and cooling setpoint policies</li>
                      <li>Equipment purchasing standards</li>
                      <li>Travel and transport policies</li>
                    </ul>
                    <ul className="text-sm space-y-1 text-white/60">
                      <li>Out-of-hours access protocols</li>
                      <li>Fault reporting procedures</li>
                      <li>Seasonal changeover processes</li>
                      <li>Event energy management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Example: End of Day Procedure
              </h3>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Standard Operating Procedure: End of Day Energy Check</h4>
                <div className="text-sm space-y-2 text-white/70">
                  <p><strong className="text-white">Purpose:</strong> Ensure energy-consuming equipment is switched off when not required</p>
                  <p><strong className="text-white">Scope:</strong> All staff, all office areas</p>
                  <p><strong className="text-white">Procedure:</strong></p>
                  <ol className="list-decimal ml-5 space-y-1 text-white/60">
                    <li>Save work and shut down computer (not standby)</li>
                    <li>Switch off monitor at the plug or powerstrip</li>
                    <li>Ensure desk lamp and personal equipment are off</li>
                    <li>Last person in area: check shared equipment (printers, copiers)</li>
                    <li>Check lights in meeting rooms and common areas</li>
                    <li>Report any equipment that cannot be switched off</li>
                  </ol>
                  <p><strong className="text-white">Responsibility:</strong> All staff / Green Champions to remind</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Making Efficiency the Default
              </h4>
              <p className="text-sm text-white/70">
                The most effective policies make energy-efficient behaviour the easiest option. Examples:
                automatic PC power management settings as default, meeting room lights on occupancy sensors,
                print double-sided by default, heating setpoints locked within an efficient range. When the
                efficient choice is also the convenient choice, compliance follows naturally.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Measuring and Sustaining Change */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <LineChart className="w-5 h-5 text-elec-yellow" />
            Measuring and Sustaining Behavioural Change
          </h2>

          <div className="space-y-4 text-white/80">
            <p>
              The challenge with behavioural programmes is not achieving initial savings but sustaining
              them over time. Effective measurement and continuous engagement are essential to prevent
              backsliding.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3">Measuring Programme Success</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Lagging Indicators (Outcomes)</h4>
                  <ul className="text-sm space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-elec-yellow mt-0.5" />
                      <span><strong className="text-white">Energy intensity:</strong> kWh/m2 or kWh/employee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-elec-yellow mt-0.5" />
                      <span><strong className="text-white">Weather-normalised consumption:</strong> Degree-day adjusted</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-elec-yellow mt-0.5" />
                      <span><strong className="text-white">Out-of-hours usage:</strong> Baseload as % of total</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-elec-yellow mt-0.5" />
                      <span><strong className="text-white">Cost per unit output:</strong> Where applicable</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Leading Indicators (Activities)</h4>
                  <ul className="text-sm space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Training completion:</strong> % staff trained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Campaign reach:</strong> Communication engagement metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Champion activity:</strong> Actions taken, issues reported</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Behaviour surveys:</strong> Self-reported behaviour scores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Sustaining Change Long-Term
              </h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Common Reasons for Backsliding</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <ul className="text-sm space-y-1 text-white/60">
                      <li>Initial novelty wears off</li>
                      <li>Staff turnover brings new untrained people</li>
                      <li>Management attention moves elsewhere</li>
                      <li>Champions become fatigued or leave</li>
                    </ul>
                    <ul className="text-sm space-y-1 text-white/60">
                      <li>Competing priorities emerge</li>
                      <li>Feedback systems fall into disrepair</li>
                      <li>Quick wins exhausted, progress slows</li>
                      <li>External events disrupt routines</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Strategies for Sustained Engagement</h4>
                  <ul className="text-sm space-y-2 text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Embed in culture:</strong> Make efficiency "how we do things here"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Continuous communication:</strong> Regular but varied messaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Refresh champions:</strong> Recruit new volunteers, rotate roles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Celebrate success:</strong> Publicise achievements and recognise contributors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Link to purpose:</strong> Connect to broader sustainability and organisational goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                      <span><strong className="text-white">Induction integration:</strong> Train every new starter from day one</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                UK Case Study: NHS Trust Sustained Programme
              </h4>
              <p className="text-sm text-white/70">
                A large NHS Trust achieved 17% energy reduction over three years through a sustained
                behavioural programme. Key success factors included: integration with mandatory staff
                training, visible senior leadership commitment, monthly energy league tables between
                departments, reinvestment of savings into patient care (demonstrating tangible benefits),
                and linking energy to the Trust's public health mission. The programme has now been
                running for seven years with savings maintained.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
          <h2 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Quick Reference Card: Behavioural Energy Management
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3 border-b border-white/20 pb-2">Key Numbers to Remember</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-white/70">Behavioural savings potential:</span>
                  <span className="text-elec-yellow font-semibold">5-20%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Typical payback period:</span>
                  <span className="text-elec-yellow font-semibold">Less than 6 months</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Real-time feedback savings:</span>
                  <span className="text-elec-yellow font-semibold">5-15%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">Champion ratio target:</span>
                  <span className="text-elec-yellow font-semibold">1:25-50</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/70">1 degree C setpoint change:</span>
                  <span className="text-elec-yellow font-semibold">8% cost impact</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 border-b border-white/20 pb-2">Quick Wins Checklist</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">Switch-off reminders at light switches</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">PC power settings optimised</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">Heating setpoints reviewed</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">Green Champions recruited</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">Feedback display installed</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-elec-yellow rounded flex-shrink-0"></div>
                  <span className="text-white/70">End-of-day procedure established</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 border-b border-white/20 pb-2">Campaign Frequency Guide</h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li><strong className="text-elec-yellow">Daily:</strong> Visual reminders (posters, stickers)</li>
                <li><strong className="text-elec-yellow">Weekly:</strong> Energy tips (email, intranet)</li>
                <li><strong className="text-elec-yellow">Monthly:</strong> Performance updates and newsletters</li>
                <li><strong className="text-elec-yellow">Quarterly:</strong> Theme refresh and competitions</li>
                <li><strong className="text-elec-yellow">Annually:</strong> Energy Awareness events</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 border-b border-white/20 pb-2">Behavioural Change Formula</h3>
              <div className="bg-white/10 rounded p-3">
                <p className="text-center text-sm mb-2">
                  <span className="text-elec-yellow font-bold">B = M + A + T</span>
                </p>
                <ul className="text-xs space-y-1 text-white/70">
                  <li><strong className="text-white">B</strong>ehaviour change requires:</li>
                  <li><strong className="text-white">M</strong>otivation (why should I?)</li>
                  <li><strong className="text-white">A</strong>bility (can I do it easily?)</li>
                  <li><strong className="text-white">T</strong>rigger (what reminds me?)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="font-medium text-white">{faq.question}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mt-2">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h2 className="text-xl font-bold text-elec-yellow mb-4">Section Quiz</h2>
          <Quiz
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            asChild
            className="min-h-[44px] touch-manipulation bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-elec-yellow"
          >
            <Link to="../section-3">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Section 3
            </Link>
          </Button>
          <Button
            asChild
            className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Link to="../section-5">
              Next: Section 5
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule4Section4;
