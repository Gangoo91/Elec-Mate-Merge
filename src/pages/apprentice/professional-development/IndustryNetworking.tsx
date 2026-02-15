import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle } from 'lucide-react';

const professionalBodies = [
  {
    name: 'IET (Institution of Engineering and Technology)',
    cost: '£200–£400/year',
    members: '150,000+ members',
    description:
      'The leading professional body for electrical and electronic engineers in the UK. Offers EngTech, IEng, and CEng professional registration, CPD tracking, and access to technical resources.',
    benefits: [
      'Professional registration (EngTech/IEng/CEng)',
      'CPD tracking and recording',
      'Technical resources and publications',
      'Local network events across the UK',
    ],
    recommended: true,
  },
  {
    name: 'JIB (Joint Industry Board)',
    cost: 'Via employer (no individual fee)',
    members: 'Industry-wide grading body',
    description:
      'The JIB sets grading, pay rates, and working conditions for the UK electrical contracting industry. Your JIB grade (Apprentice, Electrician, Approved Electrician, Technician) directly determines your minimum pay rate and is recognised by every major contractor.',
    benefits: [
      'Industry-standard grading and pay rates',
      'ECS (Electrotechnical Certification Scheme) card',
      'Recognition across all major contractors',
      'Dispute resolution and welfare benefits',
    ],
    recommended: true,
  },
  {
    name: "ECA (Electrical Contractors' Association)",
    cost: '£300–£800/year',
    members: 'Industry representation',
    description:
      "The UK's leading trade association for electrical contractors. Provides business support, industry representation, and training opportunities for member companies.",
    benefits: [
      'Industry lobbying and representation',
      'Business support and advice',
      'Training course discounts',
      'Contract and legal templates',
    ],
    recommended: false,
  },
  {
    name: 'NICEIC',
    cost: '£500–£1,500/year',
    members: 'Consumer trust brand',
    description:
      'While primarily a competent person scheme, NICEIC membership also provides networking opportunities, technical support, and industry credibility that opens doors.',
    benefits: [
      'Strong consumer brand recognition',
      'Technical helpline support',
      'Industry events and training',
      'Contractor search directory listing',
    ],
    recommended: true,
  },
  {
    name: 'NAPIT',
    cost: '£400–£1,200/year',
    members: 'Multi-trade network',
    description:
      'Multi-trade competent person scheme and professional body. Good for networking across electrical, plumbing, and heating disciplines.',
    benefits: [
      'Cross-trade networking',
      'Certification schemes',
      'Online training resources',
      'Annual conference and events',
    ],
    recommended: false,
  },
  {
    name: 'REA (Renewable Energy Association)',
    cost: '£500–£2,000/year',
    members: 'Green energy sector',
    description:
      'The voice of the UK renewable energy industry. Essential for electricians specialising in solar, wind, battery storage, and EV charging.',
    benefits: [
      'Green energy industry insights',
      'Policy updates and consultations',
      'Sustainability networking events',
      'Market intelligence reports',
    ],
    recommended: false,
  },
];

const industryEvents = [
  {
    name: 'Electrical Industry Awards',
    frequency: 'Annual',
    location: 'London',
    cost: '£100–£500',
    description:
      "The UK's premier electrical industry awards ceremony. Excellent networking with industry leaders, manufacturers, and contractors.",
  },
  {
    name: 'IET Local Networks',
    frequency: 'Monthly',
    location: 'UK-wide',
    cost: 'Free for members',
    description:
      'Regular local technical talks, seminars, and networking events run by IET volunteers across the UK. Great for meeting local professionals.',
  },
  {
    name: 'ElecTech Live',
    frequency: 'Annual',
    location: 'Various',
    cost: '£200–£800',
    description:
      'Major electrical trade exhibition showcasing new products, technologies, and training opportunities. Hands-on demos and CPD sessions.',
  },
  {
    name: 'Renewable Energy Events',
    frequency: 'Annual',
    location: 'Birmingham NEC',
    cost: '£500–£1,500',
    description:
      'Dedicated renewable energy exhibitions covering solar, wind, battery storage, and EV infrastructure. Essential for green energy specialists.',
  },
  {
    name: 'ECA Industry Conference',
    frequency: 'Annual',
    location: 'Various',
    cost: 'Free for ECA members',
    description:
      'Annual conference covering industry trends, regulation changes, and business development. Strong networking with electrical contractors and industry figures.',
  },
];

const onlineCommunities = [
  {
    name: 'LinkedIn',
    members: '150,000+ UK electricians',
    cost: 'Free',
    description:
      'The primary professional networking platform. Join electrical industry groups, follow key companies, and share your work to build your professional profile.',
  },
  {
    name: 'ElectriciansForums.net',
    members: '100,000+ members',
    cost: 'Free',
    description:
      "The largest UK electricians' forum. Technical discussions, career advice, regulation queries, and a supportive community of professionals.",
  },
  {
    name: 'IET Communities',
    members: '20,000+ members',
    cost: 'IET membership',
    description:
      'Online discussion forums run by the IET covering technical topics, career development, and industry news. Moderated by qualified professionals.',
  },
  {
    name: 'Facebook Trade Groups',
    members: 'Variable',
    cost: 'Free',
    description:
      'Informal but active groups like "Electricians UK" and "Spark\'s Corner." Good for quick advice, job leads, and product recommendations.',
  },
];

const linkedInTips = [
  {
    tip: 'Professional Headline',
    detail:
      'Use a clear headline like "Qualified Electrician | 18th Edition | NICEIC Registered" — profiles with good headlines get 3x more views.',
  },
  {
    tip: 'Complete Your Profile',
    detail:
      'Add all qualifications, experience, and a professional photo. Complete profiles receive 40x more opportunities than incomplete ones.',
  },
  {
    tip: 'Share Your Work',
    detail:
      'Post photos of completed projects (with client permission). Visual content gets 10x more engagement and builds your reputation.',
  },
  {
    tip: 'Engage Daily',
    detail:
      'Comment on industry posts, congratulate connections on achievements, and share useful content. Consistent engagement grows your network 5x faster.',
  },
];

const networkingTips = [
  {
    tip: 'Carry Business Cards',
    detail:
      'Even as an apprentice, a simple business card with your name, qualifications, and contact details makes you memorable. Hand them out at every event you attend.',
  },
  {
    tip: 'Ask Questions',
    detail:
      'At events and talks, always ask a question. It shows you are engaged, helps you learn, and gives speakers a reason to remember you. Follow up afterwards.',
  },
  {
    tip: 'Volunteer at Events',
    detail:
      'Offer to help set up at IET local network events or trade shows. You meet organisers and speakers directly — and they remember the people who helped.',
  },
  {
    tip: 'Connect Suppliers',
    detail:
      'Build relationships with electrical wholesaler reps. They know which companies are hiring, which projects are starting, and can introduce you to decision-makers.',
  },
  {
    tip: 'Follow Up Fast',
    detail:
      'Send a LinkedIn connection request or email within 24 hours of meeting someone. Reference something specific from your conversation. Speed shows professionalism.',
  },
];

const mentorshipProgrammes = [
  {
    name: 'IET Mentor Scheme',
    duration: '12 months',
    cost: 'Free for IET members',
    description:
      'Structured mentoring programme matching you with experienced engineers. Covers career planning, professional registration, and technical development.',
  },
  {
    name: 'ECA Apprentice Mentoring',
    duration: 'Flexible',
    cost: 'Free',
    description:
      'Informal mentoring through ECA member companies. Connects apprentices with experienced electricians for guidance and support.',
  },
  {
    name: 'Women in Engineering',
    duration: '6–12 months',
    cost: 'Usually free',
    description:
      'Dedicated mentoring programmes for women in engineering and electrical trades. Run by the IET, WES, and industry partners.',
  },
  {
    name: 'JTL Mentoring Support',
    duration: 'Throughout apprenticeship',
    cost: 'Free',
    description:
      'JTL training officers provide ongoing mentoring and support throughout your apprenticeship. They visit your workplace, check your progress, and help resolve any issues.',
  },
];

const IndustryNetworking = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Industry Networking</h1>
      </div>

      {/* Intro */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            Your network is your net worth in this industry. The connections you make as an
            apprentice can become lifelong professional relationships — opening doors to jobs,
            partnerships, and opportunities you would never find on your own.
          </p>
        </CardContent>
      </Card>

      {/* Professional Bodies */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <h2 className="text-base font-semibold text-white">Professional Bodies</h2>
      </div>

      <div className="space-y-3">
        {professionalBodies.map((body) => (
          <Card key={body.name} className="border-orange-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-orange-400 text-sm">{body.name}</h3>
                {body.recommended && (
                  <span className="text-xs font-medium text-white bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-white text-sm leading-relaxed">{body.description}</p>
              <div className="flex items-center gap-3 text-xs text-white">
                <span>{body.cost}</span>
                <span>·</span>
                <span>{body.members}</span>
              </div>
              <ul className="space-y-1">
                {body.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Events */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Industry Events</h2>
      </div>

      <div className="space-y-3">
        {industryEvents.map((event) => (
          <Card key={event.name} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-blue-400 text-sm">{event.name}</h3>
              <p className="text-white text-sm leading-relaxed">{event.description}</p>
              <div className="flex items-center gap-3 text-xs text-white">
                <span>{event.frequency}</span>
                <span>·</span>
                <span>{event.location}</span>
                <span>·</span>
                <span>{event.cost}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Online Communities */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">Online Communities</h2>
      </div>

      <div className="space-y-3">
        {onlineCommunities.map((community) => (
          <Card key={community.name} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-400 text-sm">{community.name}</h3>
                <span className="text-xs font-medium text-white bg-green-500/20 border border-green-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {community.cost}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{community.description}</p>
              <p className="text-white text-xs">{community.members}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LinkedIn Strategy */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <h2 className="text-base font-semibold text-white">LinkedIn Strategy</h2>
      </div>

      <div className="space-y-3">
        {linkedInTips.map((item) => (
          <Card key={item.tip} className="border-purple-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-purple-400 text-sm">{item.tip}</h3>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actionable Networking Tips */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Networking Tips That Work</h2>
      </div>

      <div className="space-y-3">
        {networkingTips.map((item) => (
          <Card key={item.tip} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-blue-400 text-sm">{item.tip}</h3>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mentorship Programmes */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Mentorship Programmes</h2>
      </div>

      <div className="space-y-3">
        {mentorshipProgrammes.map((programme) => (
          <Card key={programme.name} className="border-yellow-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-yellow-400 text-sm">{programme.name}</h3>
              <p className="text-white text-sm leading-relaxed">{programme.description}</p>
              <div className="flex items-center gap-3 text-xs text-white">
                <span>{programme.duration}</span>
                <span>·</span>
                <span>{programme.cost}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Networking Action Plan */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <h2 className="text-base font-semibold text-white">Networking Action Plan</h2>
      </div>

      <div className="space-y-3">
        {[
          {
            step: 1,
            title: 'Start Online',
            detail:
              'Create or update your LinkedIn profile this week. Join 2–3 electrical industry groups and start engaging with posts. Follow the IET, ECA, and key industry figures.',
          },
          {
            step: 2,
            title: 'Attend an Event',
            detail:
              'Find a local IET talk, trade show, or ECA branch meeting within the next month. Go with the goal of meeting 3 new people and exchanging contact details.',
          },
          {
            step: 3,
            title: 'Build Relationships',
            detail:
              'Follow up with everyone you meet within 48 hours. Connect on LinkedIn, send a brief message, and look for ways to help them. Networking is about giving, not just taking.',
          },
          {
            step: 4,
            title: 'Get Your ECS Card',
            detail:
              'If you do not already have one, apply for your ECS card through the JIB. It is the industry-standard proof of your qualifications and is required on most commercial sites.',
          },
        ].map((item) => (
          <Card key={item.step} className="border-orange-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="font-semibold text-orange-400 text-sm">{item.title}</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ROI Tip */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-orange-400 text-sm">The ROI of Networking</h3>
          <p className="text-white text-sm leading-relaxed">
            Industry surveys consistently show that 60–70% of job opportunities are never advertised
            publicly. They are filled through referrals and personal connections. Investing time in
            networking is not optional — it is one of the most effective career development
            activities you can do. Even 30 minutes a week on LinkedIn can transform your career
            opportunities within a year.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Professional body information based on current UK membership rates and benefits. Costs
            and offerings may change — check directly with each organisation for the latest details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryNetworking;
