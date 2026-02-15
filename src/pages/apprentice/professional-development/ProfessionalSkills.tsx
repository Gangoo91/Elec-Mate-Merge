import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const skillCategories = [
  {
    title: 'Communication Skills',
    importance: 'Critical',
    marketValue: '+15% earning potential',
    skills: [
      'Client consultation — explain technical work in plain language',
      'Written communication — clear reports, quotes, and certificates',
      'Active listening — understand what the customer actually needs',
      'Difficult conversations — delivering bad news about costly repairs',
      'Team communication — coordinating with other trades on site',
      'Digital etiquette — professional emails, messages, and social media',
    ],
  },
  {
    title: 'Time Management',
    importance: 'High',
    marketValue: '+10% productivity',
    skills: [
      'Project planning — break jobs into manageable tasks with realistic timelines',
      'Prioritising tasks — deal with urgent safety issues before cosmetic work',
      'Managing expectations — give honest completion estimates to clients',
      'Job sequencing — plan the order of work to minimise wasted time',
      'Buffer time — always allow for unexpected complications',
      'Work-life balance — sustainable working hours prevent burnout',
    ],
  },
  {
    title: 'Problem Solving',
    importance: 'Critical',
    marketValue: '+20% client satisfaction',
    skills: [
      'Systematic fault diagnosis — follow a logical process to find faults',
      'Creative solutions — work within constraints of existing installations',
      'Risk assessment — evaluate options before committing to a repair method',
      'Root cause analysis — fix the underlying problem, not just the symptom',
      'Learning from mistakes — document what went wrong and why',
      'Asking for help — know when to consult a more experienced electrician',
    ],
  },
  {
    title: 'Leadership & Teamwork',
    importance: 'High',
    marketValue: 'Essential for management roles',
    skills: [
      'Mentoring apprentices — share knowledge and support development',
      'Coordinating trades — work effectively with plumbers, builders, and others',
      'Leading site teams — direct work safely and efficiently',
      'Conflict resolution — handle disagreements professionally',
      'Building relationships — earn trust from clients and colleagues',
      "Delegation — assign tasks based on team members' strengths",
    ],
  },
  {
    title: 'Business Acumen',
    importance: 'Medium',
    marketValue: 'Required for self-employment',
    skills: [
      'Job costing — accurately price labour, materials, and overheads',
      'Profit margins — understand what makes a job financially viable',
      'Customer service — build repeat business through excellent service',
      'Marketing basics — attract new clients through referrals and online presence',
      'Financial management — invoicing, tax, VAT, and cash flow',
      'Building a reputation — quality work and reliability are your best advert',
    ],
  },
  {
    title: 'Safety Leadership',
    importance: 'Critical',
    marketValue: 'Legal requirement',
    skills: [
      'Risk assessment — identify hazards before starting any work',
      'Safety briefings — communicate risks clearly to everyone on site',
      'Challenging unsafe practices — speak up even when it is uncomfortable',
      'Incident investigation — understand what went wrong and prevent recurrence',
      'Continuous improvement — always look for ways to work more safely',
      'Mental health awareness — recognise signs of stress in yourself and others',
    ],
  },
  {
    title: 'Digital Skills',
    importance: 'High',
    marketValue: '+25% efficiency',
    skills: [
      'Job management software — track work, schedules, and customer records',
      'Certification and reporting — digital EICR and EIC completion',
      'CAD and design tools — basic electrical layout and circuit design',
      'Social media — professional online presence for business development',
      'Cloud storage — organise documents, photos, and certificates',
      'Smart home configuration — set up and programme smart devices',
    ],
  },
  {
    title: 'Sustainability Knowledge',
    importance: 'Critical',
    marketValue: '+40% market access',
    skills: [
      'Energy efficiency — advise clients on reducing consumption',
      'Renewable systems — understand solar PV, battery storage, and heat pumps',
      'Part L compliance — meet building regulation energy requirements',
      'EV charging — install and commission charging infrastructure',
      'Circular economy — reduce waste and recycle materials on site',
      'Carbon literacy — understand the environmental impact of electrical work',
    ],
  },
  {
    title: 'AI & Automation Awareness',
    importance: 'Medium',
    marketValue: 'Future-proofing your career',
    skills: [
      'Building management systems — understand BMS integration',
      'AI-assisted fault diagnosis — use diagnostic tools effectively',
      'Automated testing equipment — operate modern test instruments',
      'Voice-controlled systems — install and configure smart assistants',
      'PLC basics — understand programmable logic controllers',
      'Predictive maintenance — use data to anticipate equipment failure',
    ],
  },
];

const developmentActivities = [
  {
    title: 'Professional Body Membership',
    description: 'Join the IET or ECA for CPD tracking, networking, and professional recognition.',
  },
  {
    title: 'Industry Events & Exhibitions',
    description: 'Attend trade shows and conferences to learn about new products and techniques.',
  },
  {
    title: 'Mentoring Others',
    description: 'Teaching reinforces your own knowledge and builds leadership skills.',
  },
  {
    title: 'Cross-Trade Collaboration',
    description: 'Work alongside other trades to broaden your understanding of building services.',
  },
  {
    title: 'Online Learning Platforms',
    description:
      'Use platforms like LinkedIn Learning, Coursera, or provider-specific CPD courses.',
  },
  {
    title: 'Soft Skills Workshops',
    description: 'Invest in communication, negotiation, and customer service training.',
  },
];

const recommendedResources = [
  {
    title: 'IET Wiring Matters Magazine',
    type: 'Publication',
    description:
      'Free quarterly magazine from the IET covering regulation updates, technical guidance, and best practice. Essential reading for staying current.',
  },
  {
    title: 'Electricians Podcast (UK)',
    type: 'Podcast',
    description:
      'Weekly episodes covering industry news, career advice, technical discussions, and interviews with experienced professionals. Listen while travelling to site.',
  },
  {
    title: 'Dale Carnegie — How to Win Friends and Influence People',
    type: 'Book',
    description:
      'The classic guide to communication and relationship building. Directly applicable to client interactions, team leadership, and business development.',
  },
  {
    title: 'Electrical Installations NVQ Textbook',
    type: 'Reference',
    description:
      'Keep your NVQ textbook as a reference. Revisiting fundamentals when you encounter unusual situations builds deeper understanding.',
  },
];

const ProfessionalSkills = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Professional Skills</h1>
      </div>

      {/* Intro */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            Technical skills get you qualified — professional skills determine how far you go. The
            best electricians combine strong technical ability with excellent communication, problem
            solving, and business skills. These are the skills that turn a good electrician into a
            successful one.
          </p>
        </CardContent>
      </Card>

      {/* Skill Categories */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">Skill Categories</h2>
      </div>

      <div className="space-y-2">
        {skillCategories.map((category, index) => (
          <Card key={category.title} className="border-green-500/20 bg-white/5">
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full p-4 flex items-center justify-between touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-green-400 text-sm">{category.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-white">{category.importance} importance</span>
                  <span className="text-xs text-white">·</span>
                  <span className="text-xs text-white">{category.marketValue}</span>
                </div>
              </div>
              {expandedIndex === index ? (
                <ChevronUp className="h-4 w-4 text-white flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
              )}
            </button>

            {expandedIndex === index && (
              <CardContent className="px-4 pb-4 pt-0 space-y-2 animate-fade-in">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 text-sm text-white p-2 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {skill}
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Development Activities */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Development Activities</h2>
      </div>

      <div className="space-y-3">
        {developmentActivities.map((activity) => (
          <Card key={activity.title} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-blue-400 text-sm">{activity.title}</h3>
              <p className="text-white text-sm leading-relaxed">{activity.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why Professional Skills Matter */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <h2 className="text-base font-semibold text-white">Why Professional Skills Matter</h2>
      </div>

      <div className="space-y-3">
        {[
          {
            title: 'Higher Earnings',
            detail:
              'Electricians with strong professional skills earn 15–30% more than those with technical skills alone. Clients pay premium rates for professionals who communicate well and deliver reliably.',
          },
          {
            title: 'Career Progression',
            detail:
              'Management, consultancy, and training roles all require strong professional skills. Technical ability gets you in the door — leadership and communication take you further.',
          },
          {
            title: 'Business Success',
            detail:
              'If you want to be self-employed or run your own business, professional skills are not optional. Pricing, marketing, customer service, and financial management are essential.',
          },
        ].map((benefit) => (
          <Card key={benefit.title} className="border-purple-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-purple-400 text-sm">{benefit.title}</h3>
              <p className="text-white text-sm leading-relaxed">{benefit.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended Resources */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <h2 className="text-base font-semibold text-white">Recommended Resources</h2>
      </div>

      <div className="space-y-3">
        {recommendedResources.map((resource) => (
          <Card key={resource.title} className="border-orange-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-orange-400 text-sm">{resource.title}</h3>
                <span className="text-xs font-medium text-white bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {resource.type}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{resource.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Getting Started This Week */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Getting Started This Week</h2>
      </div>

      <Card className="border-yellow-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <p className="text-white text-sm leading-relaxed">
            Professional skills improve with practice, not just reading. Pick one action from this
            list and do it this week:
          </p>
          <ul className="space-y-2">
            {[
              'Write a quote or job description for your current work — practice clear written communication',
              'Explain a technical concept to a non-electrician — practice simplifying complex ideas',
              'Ask your supervisor for feedback on one specific skill you want to improve',
              'Time yourself on a routine task and look for ways to work more efficiently',
              'Introduce yourself to someone from another trade on site — start building your network',
            ].map((action) => (
              <li key={action} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                {action}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Development Strategy */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-green-400 text-sm">Development Strategy</h3>
          <p className="text-white text-sm leading-relaxed">
            Pick one or two professional skills to focus on each quarter. Set specific, measurable
            goals — for example, "complete one written quote per week without help" or "lead one
            toolbox talk per month." Track your progress and ask for feedback from colleagues and
            clients. Small, consistent improvements add up to significant career growth.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Professional skills guidance based on IET professional standards, ECA industry
            requirements, and current UK employer expectations for electrical professionals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalSkills;
