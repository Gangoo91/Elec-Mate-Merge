import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

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
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/professional-development')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Soft skills"
          title="Professional skills"
          description="Technical ability gets you qualified — professional skills decide how far you go. Communication, problem solving, customer handling, business sense — the parts the JIB grade can't measure."
          tone="yellow"
        />
      </motion.div>

      {/* Skill Categories */}
      <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Skill Categories</span></div></div>

      <div className="space-y-2">
        {skillCategories.map((category, index) => (
          <div key={category.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
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
              <div className="px-4 pb-4 pt-0 space-y-2 animate-fade-in">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-start gap-2 text-sm text-white p-2 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Development Activities */}
      <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Development Activities</span></div></div>

      <div className="space-y-3">
        {developmentActivities.map((activity) => (
          <div key={activity.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-blue-400 text-sm">{activity.title}</h3>
              <p className="text-white text-sm leading-relaxed">{activity.description}</p>
            </div></div>
        ))}
      </div>

      {/* Why Professional Skills Matter */}
      <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Why Professional Skills Matter</span></div></div>

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
          <div key={benefit.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-purple-400 text-sm">{benefit.title}</h3>
              <p className="text-white text-sm leading-relaxed">{benefit.detail}</p>
            </div></div>
        ))}
      </div>

      {/* Recommended Resources */}
      <div className="flex items-baseline justify-between gap-3 pb-1"><div className="space-y-1 min-w-0"><span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Recommended Resources</span></div></div>

      <div className="space-y-3">
        {recommendedResources.map((resource) => (
          <div key={resource.title} className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-orange-400 text-sm">{resource.title}</h3>
                <span className="text-xs font-medium text-white bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {resource.type}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{resource.description}</p>
            </div></div>
        ))}
      </div>

      {/* Getting Started This Week */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Getting Started This Week</h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 space-y-3">
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
        </div></div>

      {/* Development Strategy */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-green-400 text-sm">Development Strategy</h3>
          <p className="text-white text-sm leading-relaxed">
            Pick one or two professional skills to focus on each quarter. Set specific, measurable
            goals — for example, "complete one written quote per week without help" or "lead one
            toolbox talk per month." Track your progress and ask for feedback from colleagues and
            clients. Small, consistent improvements add up to significant career growth.
          </p>
        </div></div>

      {/* Footer */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)]">
        <div className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Professional skills guidance based on IET professional standards, ECA industry
            requirements, and current UK employer expectations for electrical professionals.
          </p>
        </div></div>
    </PageFrame>
  );
};

export default ProfessionalSkills;
