import {
  LucideIcon,
  Compass,
  Brain,
  Target,
  BarChart3,
  Clock,
  Award,
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Settings,
  Lightbulb,
  BookOpen,
  Building,
  Globe,
  Heart,
  Rocket,
  Laptop,
  Leaf,
  Star,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

/**
 * A skill row that actually teaches something: the term stays scannable,
 * the detail says what competent looks like in practice. Bare `string[]`
 * rows are still supported for sections that have not been written up yet.
 */
export interface ContentDetail {
  term: string;
  detail: string;
}

export interface ContentSection {
  title: string;
  content: string | string[] | ContentDetail[];
  icon?: LucideIcon;
}

export const isDetailList = (
  content: ContentSection['content']
): content is ContentDetail[] =>
  Array.isArray(content) && content.length > 0 && typeof content[0] === 'object';

export interface Resource {
  title: string;
  url?: string;
  description?: string;
}

export interface ModalContent {
  overview: string;
  sections: ContentSection[];
  resources?: Resource[];
  tips?: string[];
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'outline';
  stats?: { label: string; value: string }[];
  icon?: LucideIcon;
  color?: 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'amber' | 'red';
  content: ModalContent;
}

export interface CareerSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'amber' | 'red';
  previewStat: string;
  statLabel: string;
  items: ContentItem[];
}

// ==========================================
// CAREER OVERVIEW ITEMS
// ==========================================

const careerOverviewItems: ContentItem[] = [
  {
    id: 'progression-stages',
    title: 'Career Progression Stages',
    description: 'From apprentice to industry leader - understand your journey',
    badge: 'Foundation',
    icon: TrendingUp,
    color: 'yellow',
    stats: [
      { label: 'Stages', value: '4' },
      { label: 'Timeline', value: '5-15yrs' },
    ],
    content: {
      overview:
        'The route from apprentice to running your own work is well trodden, but the timings below are typical rather than fixed — people move faster or slower depending on the work they get exposed to. What does not change is the order: you cannot certify independently before you can test, and you cannot lead a team before you can be left on a job alone.',
      sections: [
        {
          title: 'Stage 1 — Apprentice (roughly years 1–4)',
          icon: BookOpen,
          content: [
            {
              term: 'The apprenticeship itself',
              detail:
                'A Level 3 electrical apprenticeship combining college study with paid on-site work. You are employed throughout — this is not a course you pay for and then look for work afterwards.',
            },
            {
              term: 'Learning under supervision',
              detail:
                'Everything you do is checked by someone who carries the responsibility. Use that: it is the only period in your career where getting it wrong is expected and cost-free.',
            },
            {
              term: 'Building the portfolio',
              detail:
                'Your NVQ needs documented evidence of real work. Collecting it as you go is straightforward; reconstructing two years of it near the end is the single most common reason apprentices stall.',
            },
            {
              term: 'The AM2',
              detail:
                'The end-point practical assessment — installation, inspection and testing, fault-finding, all against the clock. It is a test of working methodically under pressure as much as of knowledge.',
            },
            {
              term: 'Off-the-job hours',
              detail:
                'English apprenticeship standards require a set number of off-the-job training hours, recorded as you go. Keep the log current; missing hours can hold up your end-point assessment regardless of how good your work is.',
            },
          ],
        },
        {
          title: 'Stage 2 — Qualified electrician (roughly years 4–8)',
          icon: CheckCircle,
          content: [
            {
              term: 'Getting carded',
              detail:
                'The ECS card scheme evidences your qualification and health-and-safety assessment, and most commercial and industrial sites will not let you through the gate without the right card. Check which card your qualifications actually entitle you to rather than assuming.',
            },
            {
              term: 'Working unsupervised',
              detail:
                'The real shift is being trusted with a job start to finish — planning it, ordering materials, and finishing without someone checking each stage.',
            },
            {
              term: 'Inspection and testing competence',
              detail:
                'Being able to test and certify your own work is the dividing line between an improver and an electrician. It is also the gateway to periodic inspection work, which is some of the steadiest income in the trade.',
            },
            {
              term: 'Choosing a direction',
              detail:
                'Domestic, commercial, industrial and specialist all diverge here. Try more than one before committing — the day-to-day differences are much larger than they look from outside.',
            },
            {
              term: 'Deciding employed or self-employed',
              detail:
                'Self-employment pays more per day and costs you holiday, sick pay, pension and the admin evenings. Neither is better; the mistake is drifting into one without deciding.',
            },
          ],
        },
        {
          title: 'Stage 3 — Experienced / specialist (roughly years 8–15)',
          icon: Star,
          content: [
            {
              term: 'Approved status',
              detail:
                'Grading above electrician generally requires evidence of supervising others and taking responsibility for work beyond your own hands. Start collecting that evidence before you need it.',
            },
            {
              term: 'A genuine specialism',
              detail:
                'Inspection and testing, fire systems, renewables, industrial controls — one field you are properly qualified in rather than five you have touched. Depth is what commands a premium.',
            },
            {
              term: 'Design responsibility',
              detail:
                'Moving from installing someone else\'s design to producing your own. This is where liability rises sharply and where keeping your calculations becomes essential.',
            },
            {
              term: 'Leading people',
              detail:
                'Running a small team, sequencing work and being accountable for other people\'s output. Many excellent electricians dislike this — finding that out early is useful, not a failure.',
            },
            {
              term: 'Keeping current',
              detail:
                'Amendments to BS 7671 change practice, and A4:2026 is the current baseline. Being visibly out of date on the current amendment undermines everything else on your CV.',
            },
          ],
        },
        {
          title: 'Stage 4 — Leadership and ownership (15 years and beyond)',
          icon: Users,
          content: [
            {
              term: 'Management roles',
              detail:
                'Contracts manager, project manager, technical or QS positions. The work becomes commercial and people-based; the electrical knowledge underpins judgement rather than being used daily.',
            },
            {
              term: 'Running a business',
              detail:
                'Employing others changes the job completely — cash flow, insurance, employment obligations and winning work matter more than tools. Plenty of good electricians make poor employers and vice versa.',
            },
            {
              term: 'Teaching and assessing',
              detail:
                'Training, assessing and verifying is a genuine second career, and colleges are consistently short of people with current site experience.',
            },
            {
              term: 'Industry involvement',
              detail:
                'Standards committees, trade bodies and scheme work. Slow, unglamorous, and where the rules everyone else follows actually get decided.',
            },
            {
              term: 'Bringing others through',
              detail:
                'Taking on apprentices is how the trade sustains itself. It is also the clearest evidence of competence at this level and it teaches you what you actually know.',
            },
          ],
        },
      ],
      tips: [
        'Do not rush past testing competence. Electricians who cannot certify their own work stay dependent on someone who can.',
        'Get varied work early. The first few years are the cheapest time to discover which sector suits you.',
        'Keep evidence continuously — portfolio, certificates, CPD, supervision. Every grading step asks for it and none of it is fun to reconstruct.',
      ],
    },
  },
  {
    id: 'career-pathways',
    title: 'Popular Career Pathways',
    description: 'Explore the most in-demand specialisations',
    badge: 'Hot',
    icon: Rocket,
    color: 'yellow',
    stats: [{ label: 'Pathways', value: '8' }],
    content: {
      overview:
        'Most electricians end up in a specialism by accident — whoever employed them did that kind of work. Choosing deliberately is worth doing, because the sectors differ enormously in hours, travel, paperwork and who you deal with day to day. Money matters, but it is rarely what makes people leave a sector.',
      sections: [
        {
          title: 'Growing areas',
          icon: TrendingUp,
          content: [
            {
              term: 'EV charge point installation',
              detail:
                'Notifiable work with specific earthing requirements under Section 722 of BS 7671, and in practice scheme registration to certify. Mostly domestic and short-duration, with commercial and fleet charging a separate and more demanding proposition.',
            },
            {
              term: 'Solar PV and battery storage',
              detail:
                'Driven by energy costs and net-zero commitments. Paid domestic work generally needs MCS certification, which is a business-level registration rather than a single qualification — worth understanding before you commit.',
            },
            {
              term: 'Data centres and critical power',
              detail:
                'UPS, generators, resilient distribution and unforgiving uptime requirements. Well paid, heavily proceduralised, and a lot of night and weekend working inside shutdown windows.',
            },
            {
              term: 'Smart buildings and controls',
              detail:
                'Integration between electrical installation and building controls. Suits people who enjoy commissioning and problem-solving more than repetitive installation.',
            },
          ],
        },
        {
          title: 'Established sectors',
          icon: Building,
          content: [
            {
              term: 'Domestic',
              detail:
                'Steady, local, and dealing directly with householders — so customer skills matter as much as electrical ones. Work in dwellings falls under Part P of the Building Regulations in England and Wales, which is why most domestic electricians join a competent-person scheme rather than notifying every job to building control.',
            },
            {
              term: 'Commercial and industrial',
              detail:
                'Larger installations, three-phase distribution, longer programmes and main-contractor coordination. Generally better paid than domestic, with far more paperwork and less direct customer contact.',
            },
            {
              term: 'Maintenance and testing',
              detail:
                'Periodic inspection, planned maintenance and fault-finding. Some of the most reliable income in the trade because it is driven by legal duties and insurance rather than discretionary spend.',
            },
            {
              term: 'Fire and security systems',
              detail:
                'Fire detection to BS 5839 and related security disciplines, each with their own standards and certification. Recurring maintenance obligations make client relationships long-lived.',
            },
          ],
        },
      ],
      tips: [
        'Try a sector before committing to its qualifications. A week alongside someone doing the work tells you more than any course description.',
        'Look at what is actually being advertised near you — sector demand is regional, and a specialism with no local market is an expensive hobby.',
      ],
    },
  },
  {
    id: 'qualification-routes',
    title: 'Qualification Pathways',
    description: 'Three routes into the electrical industry',
    badge: 'Entry Points',
    icon: GraduationCap,
    color: 'yellow',
    stats: [
      { label: 'Routes', value: '3' },
      { label: 'Duration', value: '2-4yrs' },
    ],
    content: {
      overview:
        'There is more than one way in, but they are not equivalent. The apprenticeship route is the one the industry recognises without argument; the others can work but need more care about what you are actually buying. Whichever route you look at, check what it leads to before you pay for it.',
      sections: [
        {
          title: 'Route 1 — Apprenticeship',
          icon: BookOpen,
          content: [
            {
              term: 'Employed from day one',
              detail:
                'You are an employee earning a wage, not a student paying fees. Apprentice pay is governed by the National Minimum Wage apprentice rate in the first year, moving to the age-related rate afterwards — many employers pay above it, and the rates are set annually so check the current figure.',
            },
            {
              term: 'Typically around four years',
              detail:
                'College study alongside real site work, ending in an end-point assessment. Length varies with the employer and how quickly you gather portfolio evidence.',
            },
            {
              term: 'Training costs are funded',
              detail:
                'Apprenticeship training is funded through the employer rather than charged to you. That funding is also why employers are selective — they are investing in you.',
            },
            {
              term: 'It leads somewhere recognised',
              detail:
                'This route produces the qualification and on-site experience that card schemes and employers accept without needing anything explained. That is its real advantage.',
            },
            {
              term: 'Getting a place is the hard part',
              detail:
                'Places are competitive and employer-led. Apply widely, be willing to travel, and approach local contractors directly rather than only using portals.',
            },
          ],
        },
        {
          title: 'Route 2 — Full-time college',
          icon: GraduationCap,
          content: [
            {
              term: 'Classroom-led diploma',
              detail:
                'Typically two to three years covering the same technical content in a workshop rather than on site. Suits people who cannot find an apprenticeship or are changing career.',
            },
            {
              term: 'The experience gap is real',
              detail:
                'A diploma without site experience is not the same as being a qualified electrician, and employers know it. You will still need workplace evidence to complete the picture.',
            },
            {
              term: 'You need a placement',
              detail:
                'Arrange site experience alongside or immediately after the course. Colleges vary enormously in how much help they give with this — ask before you enrol.',
            },
            {
              term: 'Consider the funding',
              detail:
                'Depending on age and prior qualifications this may be funded or may cost you, and you are not earning while you do it. Work out the total cost including lost income.',
            },
            {
              term: 'Good for career changers',
              detail:
                'If you are older with commitments, full-time study followed by an experienced-worker route can be more realistic than starting on an apprentice wage.',
            },
          ],
        },
        {
          title: 'Route 3 — Experienced worker assessment',
          icon: Zap,
          content: [
            {
              term: 'Who it is for',
              detail:
                'People already doing electrical work without formal qualifications — often long-serving improvers or those from related trades. It recognises what you can already do rather than teaching from scratch.',
            },
            {
              term: 'Assessment, not teaching',
              detail:
                'You are assessed against the same standard through a portfolio of real work and practical assessment. If there are genuine gaps in your knowledge, this route will find them rather than fill them.',
            },
            {
              term: 'You need current employment',
              detail:
                'The evidence has to come from real work you are doing now. This route does not function without an employer or ongoing work to be assessed against.',
            },
            {
              term: 'Faster but you pay for it',
              detail:
                'Shorter than an apprenticeship and usually self-funded. Get the full cost in writing including reassessments before committing.',
            },
            {
              term: 'Check where it actually leads',
              detail:
                'Be specific with any provider about which qualification you finish with and which card it entitles you to. This is the route with the widest gap between what is marketed and what is delivered.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'JTL Apprenticeships',
          url: 'https://www.jtltraining.com',
          description: 'Major electrical apprenticeship provider',
        },
        {
          title: 'ECA Training',
          url: 'https://www.eca.co.uk/training',
          description: 'Industry body training programmes',
        },
      ],
    },
  },
  {
    id: 'industry-sectors',
    title: 'Industry Sectors',
    description: 'Where electricians work across the UK economy',
    badge: 'Sectors',
    icon: Building,
    color: 'yellow',
    stats: [{ label: 'Sectors', value: '4' }],
    content: {
      overview:
        'The same qualification opens doors into working lives that look nothing like each other. Before you chase a rate, look at the hours, the travel, who you answer to and how much of your week is paperwork — those are what people actually leave a sector over.',
      sections: [
        {
          title: 'Construction and infrastructure',
          icon: Building,
          content: [
            {
              term: 'New build and fit-out',
              detail:
                'Programme-driven work where you are one trade among many. Predictable, repetitive, and rewards speed with consistent quality — you will do the same thing across forty plots.',
            },
            {
              term: 'Major infrastructure',
              detail:
                'Rail, power, water and large civils. Strong rates and long contracts, offset by extensive site inductions, rigid procedures, and often significant travel or staying away.',
            },
            {
              term: 'Site cards and inductions',
              detail:
                'Most large sites require a valid competence card before you can work, on top of a site-specific induction. Check what a client requires before turning up — a wasted day is nobody\'s fault but yours.',
            },
            {
              term: 'How the money works',
              detail:
                'Often day rate or price work rather than salary. Higher headline figures, but you carry the risk of weather, delays and gaps between contracts.',
            },
          ],
        },
        {
          title: 'Maintenance and facilities',
          icon: Settings,
          content: [
            {
              term: 'Planned and reactive maintenance',
              detail:
                'Keeping existing buildings running rather than building new ones. Deep familiarity with a small number of sites, and you see the long-term consequences of other people\'s installation decisions.',
            },
            {
              term: 'Stability over headline rate',
              detail:
                'Usually employed with regular hours, holiday and pension. The day rate looks lower than contracting until you count the weeks contractors are not working.',
            },
            {
              term: 'Multi-skilling',
              detail:
                'FM roles frequently expect some plumbing, fabric or HVAC alongside electrical work. Broadening is an advantage here, unlike on site where specialists are preferred.',
            },
            {
              term: 'On-call',
              detail:
                'Many maintenance roles include a call-out rota. It boosts earnings and it takes over your evenings and weekends — understand the pattern before accepting.',
            },
          ],
        },
        {
          title: 'Industrial and manufacturing',
          icon: Zap,
          content: [
            {
              term: 'Plant installation and maintenance',
              detail:
                'Three-phase distribution, motors, drives and control systems. Downtime costs the client serious money, which is precisely why competent fault-finders are valued.',
            },
            {
              term: 'Controls and automation',
              detail:
                'PLCs, drives and instrumentation sit alongside the electrical work. It is the clearest route from hourly rate toward genuine technical specialism.',
            },
            {
              term: 'Shutdown working',
              detail:
                'Much of the heavy work happens during planned shutdowns — nights, weekends and holiday periods, at premium rates, compressed into short intense windows.',
            },
            {
              term: 'Environment matters',
              detail:
                'Dust, heat, noise, hazardous areas and confined spaces are routine. Some sites require additional certification such as hazardous-area competence before you can work at all.',
            },
          ],
        },
        {
          title: 'Renewables and low-carbon',
          icon: Leaf,
          content: [
            {
              term: 'Solar PV and storage',
              detail:
                'Domestic and commercial generation, with MCS certification generally required for paid domestic work. Weather-dependent and physically demanding — much of it is roof work.',
            },
            {
              term: 'Heat pumps',
              detail:
                'Electrical supply assessment for a large new continuous load. Frequently reveals that the existing supply needs upgrading, which is a conversation best had before installation day.',
            },
            {
              term: 'Wind and large-scale generation',
              detail:
                'Rotational working, remote sites and additional safety training such as working at height and rescue. Well paid, and it genuinely does not suit everyone\'s home life.',
            },
            {
              term: 'What to watch',
              detail:
                'This sector moves with government policy and incentives. Build transferable electrical competence alongside the specialism so a scheme change does not take your income with it.',
            },
          ],
        },
      ],
      tips: [
        'Talk to someone doing the work before committing to a sector. Day rate tells you almost nothing about whether you will still want the job in three years.',
      ],
    },
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Guide',
    description: 'Start and grow your own electrical business',
    badge: 'Business',
    icon: Briefcase,
    color: 'yellow',
    // '£50-150k profit' removed — no source, and presenting it as a headline
    // stat implied a typical outcome nobody can evidence.
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'Going out on your own changes the job. The electrical work becomes the easy part, and quoting, chasing payment, insurance and paperwork become the difference between a good year and a bad one. Earnings vary enormously with sector, region and how well the business is run — be sceptical of anyone quoting you a typical figure, including any you read online.',
      sections: [
        {
          title: 'Before you take the first job',
          icon: CheckCircle,
          content: [
            {
              term: 'Notification of domestic work',
              detail:
                'Electrical work in dwellings in England and Wales falls under Part P of the Building Regulations. Joining a competent-person scheme lets you self-certify notifiable work; without one you must notify building control in advance and pay for it each time.',
            },
            {
              term: 'Public liability insurance',
              detail:
                'Covers injury or damage you cause to others. Not legally compulsory in itself, but effectively mandatory — most commercial clients and scheme memberships require it, and many specify a minimum level of cover.',
            },
            {
              term: 'Employers\' liability',
              detail:
                'If you employ anyone, employers\' liability insurance is a legal requirement with a statutory minimum level of cover, and the penalties for not holding it are charged per day. This catches people who take on a first apprentice without checking.',
            },
            {
              term: 'Professional indemnity',
              detail:
                'Covers claims arising from your advice or design rather than physical damage. Increasingly asked for once you are producing designs rather than installing someone else\'s.',
            },
            {
              term: 'Money and records',
              detail:
                'Separate business account, an accountant, and a system for quotes, invoices and certificates from day one. Retrofitting records after your first busy year is far harder than starting with them.',
            },
          ],
        },
        {
          title: 'How to set the business up',
          icon: Building,
          content: [
            {
              term: 'Sole trader',
              detail:
                'Simplest to start and to run. You and the business are the same legal entity, so business debts are your personal debts — the simplicity has a real cost attached.',
            },
            {
              term: 'Limited company',
              detail:
                'Separate legal entity, limited personal liability, and different tax treatment. More administration, filing obligations and director duties. Whether it leaves you better off depends on your numbers — take advice rather than copying what someone in the pub did.',
            },
            {
              term: 'Partnership',
              detail:
                'Shares the load and the decisions. Get a written agreement covering what happens if one of you wants out, becomes ill, or stops pulling their weight — before you need it.',
            },
            {
              term: 'Working through an agency or CIS',
              detail:
                'Construction work often means CIS deductions taken at source. Understand what is being deducted and what you can reclaim, or you will overpay for years without noticing.',
            },
            {
              term: 'VAT',
              detail:
                'Registration becomes compulsory once turnover passes the threshold, and the threshold changes — check the current figure. It affects your pricing to domestic customers in a way it does not for commercial clients.',
            },
          ],
        },
        {
          title: 'Making it last',
          icon: TrendingUp,
          content: [
            {
              term: 'Start before you jump',
              detail:
                'Building a customer base with the security of employment behind you removes most of the risk from the first year. The people who struggle are usually those who left first and looked for work afterwards.',
            },
            {
              term: 'Price on your costs, not theirs',
              detail:
                'Undercutting to win work is the most common way small electrical firms fail. Work out what an hour actually costs you to sell, and hold it.',
            },
            {
              term: 'Get paid on time',
              detail:
                'Clear terms, stage payments on bigger jobs, and chase the day something goes overdue. Profitable businesses still fail when the cash arrives later than the bills.',
            },
            {
              term: 'The first employee',
              detail:
                'Employing someone brings payroll, pension auto-enrolment, employers\' liability and the obligation to keep them busy in quiet weeks. Be certain the work is sustained, not seasonal.',
            },
            {
              term: 'Reputation compounds',
              detail:
                'Reviews, repeat customers and referrals are what make year three easier than year one. Turning up when you said you would does more for that than any advertising spend.',
            },
          ],
        },
      ],
      tips: [
        'Get an accountant before your first tax year ends, not during your first panic.',
        'Know your true cost per chargeable hour before you quote anything.',
        'Put scope, price and exclusions in writing on every job, however small.',
      ],
    },
  },
  {
    id: 'career-advancement',
    title: 'Career Advancement Tips',
    description: 'Accelerate your progression and maximize earnings',
    badge: 'Pro Tips',
    icon: Star,
    color: 'yellow',
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'The electricians who progress fastest are rarely the most naturally gifted. They are the ones who got their testing qualification early, kept evidence of what they did, and were easy to work with. None of that is glamorous and all of it compounds.',
      sections: [
        {
          title: 'Technical standing',
          icon: Zap,
          content: [
            {
              term: 'Get inspection and testing early',
              detail:
                'It is the qualification that changes what you are allowed to sign for, and it unlocks periodic inspection work. Most people who delay it say afterwards that they should not have.',
            },
            {
              term: 'Stay current with amendments',
              detail:
                'BS 7671 changes and A4:2026 is the current baseline. Working to a superseded amendment is visible immediately to anyone reviewing your certificates.',
            },
            {
              term: 'Depth over collection',
              detail:
                'One specialism you are genuinely qualified and insured for beats five you have attended a day course in. Clients buy certainty, not variety.',
            },
            {
              term: 'Manufacturer training',
              detail:
                'Often free, frequently required for warranty validity, and it puts you on approved-installer lists that generate enquiries without advertising.',
            },
            {
              term: 'Keep your evidence',
              detail:
                'Certificates, test results, calculations, photos and CPD records. Every grading step and every dispute asks for evidence, and none of it can be produced retrospectively.',
            },
          ],
        },
        {
          title: 'Professional profile',
          icon: BookOpen,
          content: [
            {
              term: 'Professional bodies',
              detail:
                'Bodies such as the IET and trade associations offer technical guidance, CPD structure and recognised professional registration. Useful when your competence needs to be legible to people who have never seen you work.',
            },
            {
              term: 'Your network is your pipeline',
              detail:
                'Most work and most job moves in this trade come through people who already know you. Other trades, suppliers, wholesalers and former colleagues are the whole network — it is not a LinkedIn exercise.',
            },
            {
              term: 'Be easy to work with',
              detail:
                'Turning up when you said, clearing up after yourself and flagging problems early gets you recommended more reliably than technical brilliance. Main contractors rebook the reliable ones.',
            },
            {
              term: 'Reputation is small-world',
              detail:
                'The trade is more connected than it looks. How you leave an employer or a job site tends to be known before you arrive at the next one.',
            },
            {
              term: 'Give something back',
              detail:
                'Mentoring, assessing or school outreach builds standing, and explaining your work to someone else is how you find the gaps in your own understanding.',
            },
          ],
        },
        {
          title: 'Commercial ability',
          icon: Briefcase,
          content: [
            {
              term: 'Quote accurately',
              detail:
                'Pricing is a skill you can practise: price it, do it, compare, adjust. Electricians who never compare quoted against actual never find out which jobs are losing them money.',
            },
            {
              term: 'Explain things plainly',
              detail:
                'The ability to tell a customer what is wrong and what it will cost, without jargon or drama, is worth more than most technical certificates.',
            },
            {
              term: 'Understand what you signed',
              detail:
                'Payment terms, retention, variations and liability. On commercial work the contract governs whether you get paid at all, however good the installation.',
            },
            {
              term: 'Run the job, not just the work',
              detail:
                'Sequencing, materials arriving on time and coordination with other trades. Being the person who makes a job run smoothly is how you become the person who runs jobs.',
            },
            {
              term: 'Know your number',
              detail:
                'Whether employed or self-employed, know what your time is worth and what comparable people are being paid. You cannot negotiate a position you have not worked out.',
            },
          ],
        },
      ],
      tips: [
        'Get the inspection and testing qualification sooner than feels comfortable — it changes what you are allowed to do.',
        'Keep a running record of jobs, certificates and CPD. Everything above eventually asks you to prove it.',
      ],
    },
  },
  {
    id: 'industry-context',
    title: 'Industry Context & Trends',
    description: 'Understanding the UK electrical industry landscape',
    badge: '2026',
    icon: Globe,
    color: 'yellow',
    // Market-size and headcount figures removed — '£5.8bn', '250k+ electricians'
    // and '15,000 needed annually' had no source behind them.
    stats: [{ label: 'Themes', value: '2' }],
    content: {
      overview:
        'You do not need market statistics to see where this trade is going — you can see it in the jobs you are being asked to quote. Heating, transport and generation are all moving onto the electrical system, and that pushes work toward electricians while making the buildings themselves harder to get right. For current published figures on market size or workforce numbers, go to the trade bodies and government statistics directly rather than trusting a summary.',
      sections: [
        {
          title: 'What is pulling work toward the trade',
          icon: TrendingUp,
          content: [
            {
              term: 'Legally binding decarbonisation',
              detail:
                'The UK\'s net zero by 2050 target is written into law under the Climate Change Act. That is not a political mood — it is a statutory obligation that keeps driving heat, transport and generation onto the electrical system.',
            },
            {
              term: 'Electrification of heat',
              detail:
                'Every gas boiler replaced with a heat pump adds a substantial continuous electrical load to a property that was never designed for it. Supply capacity assessment is becoming routine domestic work rather than a specialist exercise.',
            },
            {
              term: 'Electrification of transport',
              detail:
                'Charging demand is moving beyond single driveways into workplaces, fleets and shared parking, where load management and metering matter as much as the installation.',
            },
            {
              term: 'Retrofit of existing stock',
              detail:
                'The UK has old housing and most of it will still be standing in 2050. Upgrading what already exists is a far larger long-term market than new build.',
            },
            {
              term: 'An ageing workforce',
              detail:
                'Experienced electricians retiring creates openings for those coming through — and it is also why the supervision and mentoring side of your competence is worth developing.',
            },
          ],
        },
        {
          title: 'What is making the work harder',
          icon: Shield,
          content: [
            {
              term: 'Standards keep moving',
              detail:
                'BS 7671 amendments change practice on a rolling basis, with A4:2026 the current baseline. Staying current is now a permanent running cost of being an electrician, not an occasional event.',
            },
            {
              term: 'Compliance overhead',
              detail:
                'Scheme membership, insurance, calibration and CPD all cost money and time before you have done any work. It weighs most heavily on sole traders and smallest firms.',
            },
            {
              term: 'Price pressure from below',
              detail:
                'Multi-skilled operators and unregistered work compete on price in the domestic market. Competing on quality, certification and reliability is the sustainable answer; competing on price is not.',
            },
            {
              term: 'Material costs and lead times',
              detail:
                'Prices and availability move enough that a quote can be underwater by the time it is accepted. Put a validity period on quotes as standard.',
            },
            {
              term: 'More systems, more interfaces',
              detail:
                'Generation, storage, controls and connectivity in ordinary buildings mean more can go wrong and more parties are involved when it does. Commissioning and documentation matter more than they used to.',
            },
          ],
        },
      ],
      tips: [
        'Build transferable electrical competence alongside any specialism. Incentive schemes change; the underlying installation skill does not.',
        'When you need real market figures, cite the source — trade bodies and government statistics publish them, and a number without a source is worth nothing in a business plan.',
      ],
    },
  },
  {
    id: 'professional-journey',
    title: 'Professional Development Journey',
    description: 'From qualified to chartered - the professional pathway',
    badge: 'Professional',
    icon: Target,
    color: 'yellow',
    stats: [
      { label: 'Levels', value: '4' },
      { label: 'Peak', value: 'CEng' },
    ],
    content: {
      overview:
        'This is a separate ladder from trade qualification, and it is optional — plenty of excellent electricians never touch it. It matters if you are moving toward design, consultancy, expert witness work or engineering management, where you need your competence to be legible to people outside the trade.',
      sections: [
        {
          title: 'The registration titles',
          icon: CheckCircle,
          content: [
            {
              term: 'How it works',
              detail:
                'Professional registration is regulated by the Engineering Council and awarded through licensed institutions such as the IET. It is assessed on demonstrated competence against a published standard, not simply on holding a qualification.',
            },
            {
              term: 'EngTech — Engineering Technician',
              detail:
                'The entry registration and the most realistic first step from a trade background. Achievable off the back of an apprenticeship and site experience without needing a degree.',
            },
            {
              term: 'IEng — Incorporated Engineer',
              detail:
                'The next stage, typically underpinned by study at around HNC/HND or degree level alongside substantial responsible experience. Common among people who have moved into design or contracts roles.',
            },
            {
              term: 'CEng — Chartered Engineer',
              detail:
                'The senior registration, normally underpinned by masters-level learning plus significant responsibility. Reached from a trade start through part-time study over years, not through a short course.',
            },
            {
              term: 'Qualifications are the underpinning, not the award',
              detail:
                'Where you do not hold the typical academic qualification, institutions can assess equivalent learning through their own route. It is more work to evidence, and it is a genuine path.',
            },
          ],
        },
        {
          title: 'Whether it is worth it',
          icon: Star,
          content: [
            {
              term: 'Recognition outside the trade',
              detail:
                'Post-nominals mean something to clients, insurers and courts who cannot assess your site competence directly. That is precisely their value.',
            },
            {
              term: 'It opens specific doors',
              detail:
                'Consultancy, expert witness work, senior design and some public-sector roles ask for registration explicitly. If none of those interest you, the case is much weaker.',
            },
            {
              term: 'Portability',
              detail:
                'Registration is recognised internationally in a way that UK trade cards alone are not, which matters if you might work abroad.',
            },
            {
              term: 'Be realistic about the return',
              detail:
                'Registration does not automatically raise your rate as a working electrician. It pays off when it lets you do different work, not the same work with letters after your name.',
            },
            {
              term: 'It has to be maintained',
              detail:
                'Ongoing CPD and institution membership are required to keep it. Treat it as a standing commitment rather than a one-off achievement.',
            },
          ],
        },
        {
          title: 'How to get there from the tools',
          icon: TrendingUp,
          content: [
            {
              term: 'Start with EngTech',
              detail:
                'It is the registration most directly reachable from an apprenticeship and site experience, and it establishes the CPD habit the later stages require.',
            },
            {
              term: 'Study part-time',
              detail:
                'HNC and HND routes are designed around people working full-time. Slow, and the standard route most trade-background engineers actually take.',
            },
            {
              term: 'Build the evidence deliberately',
              detail:
                'Registration is assessed on responsibility and judgement, not years served. Seek work where you make decisions and record what you decided and why.',
            },
            {
              term: 'Get a mentor inside the institution',
              detail:
                'Someone already registered can tell you what the assessors expect and read your application before you submit it. It is the single biggest factor in first-time success.',
            },
            {
              term: 'Log CPD from now',
              detail:
                'Every stage requires evidence of continuing development. Recording it as you go costs minutes; assembling it retrospectively costs weekends.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'IET',
          url: 'https://www.theiet.org',
          description: 'Institution of Engineering and Technology',
        },
        {
          title: 'Engineering Council',
          url: 'https://www.engc.org.uk',
          description: 'UK regulatory body for engineering',
        },
      ],
    },
  },
];

// ==========================================
// SKILLS DEVELOPMENT ITEMS
// ==========================================

const skillsDevelopmentItems: ContentItem[] = [
  {
    id: 'foundation-skills',
    title: 'Foundation Skills',
    description: 'Core competencies for years 1-2 of your career',
    badge: 'Essential',
    icon: BookOpen,
    color: 'blue',
    stats: [
      // Counts the rows actually listed below — the previous '12' did not
      // match the 15 skills on the page.
      { label: 'Skills', value: '15' },
      { label: 'Level', value: 'Basic' },
    ],
    content: {
      overview:
        'These are the skills you are judged on every day for the first two years, and the ones a supervisor will quietly check before leaving you on a job alone. Nothing here is advanced — but doing it right, every time, without being told, is what moves you off improver rates.',
      sections: [
        {
          title: 'Installation Fundamentals',
          icon: Zap,
          content: [
            {
              term: 'Cable selection and sizing',
              detail:
                'A cable is only rated for the conditions it is actually installed in. Start from the tabulated capacity, then apply correction factors for grouping, ambient temperature and insulation before you commit — BS 7671 distinguishes tabulated capacity from capacity under the particular installation conditions for exactly this reason. Getting this wrong is the most common reason a job fails inspection.',
            },
            {
              term: 'Containment: trunking, conduit and tray',
              detail:
                'Cut square, deburr every cut, and support at the spacings the system is designed for. Leave capacity for the circuits that get added later — pulling a full trunking apart in two years is someone else paying for your shortcut today.',
            },
            {
              term: 'Terminations and connections',
              detail:
                'The joint is where installations fail. Strip to the right length with no nicked strands, torque to the manufacturer figure rather than by feel, and give every termination a physical tug before the cover goes on. Loose terminations are the single biggest cause of fire in an otherwise sound installation.',
            },
            {
              term: 'Consumer unit work',
              detail:
                'Know your way around the board before you touch it: main switch, RCDs, RCBOs, and which circuits sit where. Label as you go, not at the end — an unlabelled board is a hazard for whoever opens it next, and it will be marked down on the certificate.',
            },
            {
              term: 'Socket and lighting circuits',
              detail:
                'Note the A4:2026 change: in domestic premises, AC final circuits supplying luminaires now require additional protection by a 30 mA RCD (Reg 411.3.4) — lighting is no longer the exception it used to be. Check whether the board you are working on actually provides it before you extend a lighting circuit.',
            },
          ],
        },
        {
          title: 'Safety & Compliance',
          icon: Shield,
          content: [
            {
              term: 'Safe isolation',
              detail:
                'Prove, test, prove — on an approved voltage indicator to HSE GS38, proved on a known source before and after. Lock off with your own padlock and keep the only key in your pocket. Never rely on a device in a PEN conductor for isolation; Reg 411.4.3 prohibits it outright.',
            },
            {
              term: 'Risk assessment in practice',
              detail:
                'Read the RAMS before you start, not after something goes wrong, and say something if what is written does not match what is in front of you. Being the apprentice who flags a mismatch is a reputation worth having early.',
            },
            {
              term: 'PPE that matches the task',
              detail:
                'Right gloves for the job, eye protection when cutting or drilling, and insulated tools where there is any prospect of live parts. PPE is the last line of defence, never the plan — if you are relying on it to stay safe, the method is wrong.',
            },
            {
              term: 'Working at height',
              detail:
                'Most site injuries in this trade come from short falls, not dramatic ones. Right ladder or tower for the duration, footed or tied, three points of contact, and nothing carried up in your hands. Covered by the Work at Height Regulations 2005, which apply at any height where a fall could injure.',
            },
            {
              term: 'Asbestos awareness',
              detail:
                'Anything built or refurbished before 2000 may contain it. Check the asbestos register before drilling, chasing or lifting boards, and stop immediately if you find something unexpected. Duty holders must manage it under the Control of Asbestos Regulations 2012 — that register should exist and you are entitled to see it.',
            },
          ],
        },
        {
          title: 'Tools & Test Equipment',
          icon: Settings,
          content: [
            {
              term: 'Hand tools and cable preparation',
              detail:
                'Clean stripping without nicking conductors, straight cuts, and the correct screwdriver for the terminal so you do not chew the head. Speed comes from repetition — accuracy first, and the speed follows on its own.',
            },
            {
              term: 'Power tools',
              detail:
                'Check the lead and casing before every use, use dust extraction on masonry, and know where the services are before an SDS goes into a wall. On site, 110 V is the norm for a reason.',
            },
            {
              term: 'Test instruments',
              detail:
                'Learn what each instrument is actually telling you rather than just reading the number. A socket tester indicates obvious faults but proves nothing about earth-fault loop impedance or RCD operation — it is a first look, never evidence of compliance.',
            },
            {
              term: 'Crimping and termination tools',
              detail:
                'Matched die to matched lug, ratchet fully closed, and a pull test on the result. A crimp that looks acceptable but was made with the wrong die will pass visual inspection and fail under load months later.',
            },
            {
              term: 'Calibration and instrument care',
              detail:
                'Test instruments need calibration on a documented interval, and results from an out-of-calibration meter are not defensible if a job is ever challenged. Keep the certificate, check the date before you certify anything.',
            },
          ],
        },
      ],
      tips: [
        'Write down what you did each day while it is fresh — it becomes your NVQ evidence, and reconstructing it a year later is miserable.',
        'When you are told to do something a particular way, ask which regulation drives it. You learn faster and it shows you are thinking rather than copying.',
        'Ask before you guess. Experienced electricians expect questions from an apprentice; what they do not forgive is covering up a mistake.',
      ],
    },
  },
  {
    id: 'intermediate-skills',
    title: 'Intermediate Skills',
    description: 'Building expertise in years 2-4',
    badge: 'Developing',
    icon: TrendingUp,
    color: 'blue',
    stats: [
      { label: 'Skills', value: '15' },
      { label: 'Level', value: 'Mid' },
    ],
    content: {
      overview:
        'This is the stage where you stop being told what to do and start being asked what you think. The technical work gets harder, but the real shift is judgement — knowing when something is not right and being able to say why, in terms someone else can check.',
      sections: [
        {
          title: 'Advanced Installation',
          icon: Zap,
          content: [
            {
              term: 'Three-phase systems',
              detail:
                'Get comfortable with the relationship between line and phase voltages, and balance loads across phases as you add circuits rather than fixing it later. An unbalanced board causes neutral current, nuisance tripping and wasted capacity that someone eventually has to pay to correct.',
            },
            {
              term: 'Industrial connectors and isolation',
              detail:
                'Know your IP ratings and pick the connector for the environment, not the one in the van. Every fixed machine needs a means of isolation that a person working on it can secure themselves — that is the whole point of it being local.',
            },
            {
              term: 'Fire alarm and emergency lighting',
              detail:
                'Fire detection is BS 5839 and emergency lighting is BS 5266 — separate standards from BS 7671 with their own categories, test regimes and certification. Know which category the building needs before you quote; getting this wrong is expensive to put right.',
            },
            {
              term: 'Data and communications cabling',
              detail:
                'Respect the bend radius, do not exceed the pulling tension, and keep separation from power cabling. Data faults from careless installation are invisible until the network is live and miserable to trace afterwards.',
            },
            {
              term: 'Outdoor and wet locations',
              detail:
                'Select for the actual conditions: UV exposure, water ingress, impact, and what happens at −5 °C. Glands and enclosures are only rated if they are installed the way the manufacturer specifies — the right gland fitted badly is the same as the wrong gland.',
            },
          ],
        },
        {
          title: 'Testing Competence',
          icon: CheckCircle,
          content: [
            {
              term: 'The dead tests, in order',
              detail:
                'Continuity of protective conductors, ring final continuity, insulation resistance, then polarity — all before anything is energised. The sequence exists so that each test does not mask a fault the next one would have found.',
            },
            {
              term: 'Insulation resistance',
              detail:
                'For a 230/400 V circuit the test is at 500 V DC. Disconnect or account for anything that will be damaged by the test voltage — electronics, dimmers, surge protection — and record what you disconnected, because the next person needs to know it was excluded.',
            },
            {
              term: 'Continuity and R1+R2',
              detail:
                'R1+R2 gives you the circuit protective conductor path and feeds directly into your Zs calculation. On a ring, all three continuity steps matter — skipping straight to the end reading will not reveal an interconnection or a broken leg.',
            },
            {
              term: 'Reading results, not just recording them',
              detail:
                'A number in the box means nothing until you compare it to what you expected. If a reading looks unusually good, suspect the test before you believe it — a probe on the wrong conductor gives a beautiful result and proves nothing.',
            },
            {
              term: 'Fault-finding method',
              detail:
                'Halve the circuit, test, halve again. Guessing wastes hours and burns the customer relationship. The written method also means you can hand the job over halfway through without the next person starting from zero.',
            },
          ],
        },
        {
          title: 'Certification & Documentation',
          icon: BookOpen,
          content: [
            {
              term: 'Minor Works vs full EIC',
              detail:
                'A Minor Works Certificate covers an addition or alteration to an existing circuit — it does not cover a new circuit. A new circuit needs an Electrical Installation Certificate. Using the wrong form is one of the most common paperwork failures and it invalidates the certification.',
            },
            {
              term: 'Signing means you are liable',
              detail:
                'Your signature says you designed, constructed, inspected and tested it, or the part of it you have named. Never sign for work you did not see. Certificates are legal documents that surface years later in insurance claims and disputes.',
            },
            {
              term: 'Schedule of test results',
              detail:
                'Record the actual measured values, not the values you expected. A schedule with suspiciously identical readings across every circuit is the first thing an assessor or expert witness will notice.',
            },
            {
              term: 'Working from drawings',
              detail:
                'Read the drawing before you start and mark up what actually got installed as you go. As-built information is worth real money to whoever maintains the building — and it is nearly impossible to reconstruct once the ceiling is closed.',
            },
            {
              term: 'RAMS in practice',
              detail:
                'Read it, work to it, and raise it if the site does not match what is written. A method statement that nobody follows is worse than none — it creates a paper record showing you knew the correct method and did something else.',
            },
          ],
        },
      ],
      tips: [
        'Start keeping your own test-result records now, separate from the job paperwork. When you go for JIB grading or an assessment, evidence you can produce beats a claim you cannot.',
        'Learn the certificate forms properly before you need them under pressure. Most rejected paperwork fails on scope and signatures, not on the electrical work.',
      ],
    },
  },
  {
    id: 'specialist-skills',
    title: 'Specialist Skills',
    description: 'Advanced competencies for years 3-5+',
    badge: 'Advanced',
    icon: Star,
    color: 'blue',
    stats: [
      // Matches the rows actually listed below (was '20+').
      { label: 'Skills', value: '15' },
      { label: 'Level', value: 'High' },
    ],
    content: {
      overview:
        'This is where day rates separate. Specialist work pays more because fewer people can sign for it and the consequences of getting it wrong are larger. Most of these routes need a specific qualification or scheme registration on top of your gold card — the skill alone is not what the customer is buying.',
      sections: [
        {
          title: 'Inspection & Testing',
          icon: CheckCircle,
          content: [
            {
              term: 'Live testing',
              detail:
                'Earth fault loop impedance, prospective fault current and RCD timing are done with the installation energised — so the risk assessment and your instrument leads matter as much as the readings. Compare measured Zs against the maximum for that device and disconnection time; a pass you cannot justify against a table is not a pass.',
            },
            {
              term: 'Periodic inspection',
              detail:
                'An EICR is sampling and judgement, not a rerun of initial verification. Agree the extent and any limitations with the client in writing before you start, and record them on the report — an unlimited-scope EICR on an occupied building is not realistic and you will be held to whatever you wrote.',
            },
            {
              term: 'EICR coding',
              detail:
                'C1 is danger present, C2 is potentially dangerous, C3 is improvement recommended, FI means further investigation required. Codes are applied using the Appendix 6 guidance (Reg 653.1). Over-coding to win remedial work is the fastest way to lose your reputation; under-coding a C1 is the fastest way to lose everything else.',
            },
            {
              term: 'Complex fault finding',
              detail:
                'Intermittent and multi-fault problems are where you earn a specialist rate. Work from evidence — thermal imaging, clamp readings under load, insulation resistance over time — and resist replacing parts hopefully.',
            },
            {
              term: 'Power quality and harmonics',
              detail:
                'Non-linear loads — VSDs, LED drivers, IT equipment — produce harmonic currents that overload neutrals and overheat transformers without ever tripping a breaker. In a modern commercial building the neutral can carry more than the line conductors, which surprises people who sized it on old assumptions.',
            },
          ],
        },
        {
          title: 'Specialist Installations',
          icon: Zap,
          content: [
            {
              term: 'EV charge points',
              detail:
                'Covered by Section 722 of BS 7671. The hard part is earthing: on a PME (TN-C-S) supply you must either provide an earth electrode or use a device that disconnects on an open-PEN condition. This is also notifiable work and generally needs scheme registration to certify.',
            },
            {
              term: 'Solar PV and battery storage',
              detail:
                'Section 712 covers PV. DC on a roof behaves nothing like AC in a building — it cannot be switched off by isolating the supply, and it is live whenever there is daylight. Grid connection brings G98/G99 obligations, and paid domestic work generally requires MCS certification.',
            },
            {
              term: 'Heat pump supplies',
              detail:
                'Usually the largest single load added to a domestic property in decades. Check the existing supply capacity and main fuse rating before promising anything — plenty of installations need a DNO upgrade, and finding that out after the heat pump arrives is somebody else scheduling an unpaid return visit.',
            },
            {
              term: 'Fire detection systems',
              detail:
                'BS 5839-1 for commercial, BS 5839-6 for domestic, with defined categories that determine coverage. Design, install, commission and maintain are four separate certificates and you should only sign the ones you actually performed.',
            },
            {
              term: 'Security and low-voltage systems',
              detail:
                'CCTV, access control and door entry bring their own standards plus data-protection obligations once cameras record people. The electrical work is usually the easy part; the compliance around it is what clients get wrong.',
            },
          ],
        },
        {
          title: 'Design & Calculation',
          icon: Target,
          content: [
            {
              term: 'Cable sizing, properly',
              detail:
                'Design current, protective device rating, tabulated capacity, then every correction factor that applies — grouping, ambient, thermal insulation, and the disconnection time you have to achieve. The cable has to satisfy all of them at once, not whichever one you checked last.',
            },
            {
              term: 'Voltage drop',
              detail:
                'Long runs fail on voltage drop well before they fail on current-carrying capacity, and it is the constraint people forget when quoting a distant outbuilding or a car park supply. Check it at design stage, not after the cable is in the ground.',
            },
            {
              term: 'Device selection and coordination',
              detail:
                'The device has to break the prospective fault current safely and disconnect fast enough for the circuit it protects. Breaking capacity is not optional — a device that cannot clear the available fault current is a hazard, not a protection.',
            },
            {
              term: 'Discrimination and selectivity',
              detail:
                'A fault on one final circuit should not take out the whole board. Selectivity is what stops a faulty kettle shutting down a shop floor, and it is what commercial clients notice immediately when it is absent.',
            },
            {
              term: 'Load assessment and diversity',
              detail:
                'Applying diversity is judgement, not a fixed formula, and it is where designs go wrong in both directions — undersize and it trips, oversize and you have quoted a supply upgrade nobody needed.',
            },
          ],
        },
      ],
      tips: [
        'Pick one specialism and get properly qualified in it rather than collecting half-knowledge across five. Depth is what customers pay a premium for.',
        'Before quoting specialist work, check what registration the job legally needs — the qualification, the scheme membership, and who is allowed to sign the certificate.',
        'Keep the calculations you did. When a design is questioned two years later, the working is the difference between a conversation and a claim.',
      ],
    },
  },
  {
    id: 'digital-skills',
    title: 'Digital & Technology Skills',
    description: 'Essential tech skills for modern electricians',
    badge: 'Modern',
    icon: Laptop,
    color: 'blue',
    stats: [
      { label: 'Skills', value: '15' },
      { label: 'Trend', value: 'Growing' },
    ],
    content: {
      overview:
        'Buildings are getting more connected and paperwork is getting less tolerant of guesswork. You do not need to become an IT engineer, but the electricians who can commission a smart system and produce clean digital certification are the ones being asked back.',
      sections: [
        {
          title: 'Digital Working',
          icon: Laptop,
          content: [
            {
              term: 'Digital certification',
              detail:
                'Certify on site while the readings are in front of you, not from scribbled notes three days later. The gains are fewer transcription errors, certificates the client actually receives, and a searchable record when a job is questioned years afterwards.',
            },
            {
              term: 'Design and calculation software',
              detail:
                'Software removes arithmetic errors; it does not remove responsibility. You still have to sanity-check the output, because a tool will happily return a compliant-looking answer from wrong inputs and your name goes on the certificate either way.',
            },
            {
              term: 'Photographic evidence',
              detail:
                'Photograph work before it is covered up — boards before the cover, cable routes before plastering, existing damage before you start. It settles disputes instantly and costs you seconds at the time.',
            },
            {
              term: 'Cloud storage and backup',
              detail:
                'Certificates, test results and job photos need to survive a lost phone or a stolen van. If your only copy of a year of certification is on one device, you are one bad afternoon from a serious problem.',
            },
            {
              term: 'Quoting and job tracking',
              detail:
                'Knowing what a job actually cost — not what you assumed — is what turns guesswork into pricing. Most small firms lose margin on the jobs they never measured.',
            },
          ],
        },
        {
          title: 'Smart and Connected Systems',
          icon: Settings,
          content: [
            {
              term: 'Smart home platforms',
              detail:
                'KNX is an open international standard with proper training and certification behind it; most consumer systems are proprietary and tie the client to one manufacturer. Explain that trade-off before installing, because they will blame you when the app is discontinued.',
            },
            {
              term: 'Building Management Systems',
              detail:
                'On commercial sites your work often terminates into a BMS run by someone else. Understanding what the controls expect — volt-free contacts, sensor types, interlocks — is the difference between a clean handover and a fortnight of blame.',
            },
            {
              term: 'Network fundamentals',
              detail:
                'IP addressing, PoE budgets and switch capability now sit inside ordinary electrical jobs. PoE in particular is electrical work by another name, and its power budgeting is exactly the kind of thing electricians are well placed to get right.',
            },
            {
              term: 'Commissioning and handover',
              detail:
                'A smart system that works on the day but that nobody can operate is a failed job. Hand over credentials, document what is connected to what, and never leave a system tied to a personal account of yours.',
            },
            {
              term: 'Cyber-security basics',
              detail:
                'Change default passwords, keep control systems off the guest network, and think about who can reach the device from outside. Once you connect a building to the internet, physical security includes network security.',
            },
          ],
        },
        {
          title: 'Energy and Emerging Technology',
          icon: Lightbulb,
          content: [
            {
              term: 'Battery storage',
              detail:
                'Storage brings DC, fire considerations and location constraints most domestic electricians have never had to think about. Ventilation, thermal runaway and safe means of isolation are design decisions, not afterthoughts.',
            },
            {
              term: 'Vehicle-to-grid and smart charging',
              detail:
                'Charge points are shifting from dumb loads to grid-responsive assets that shed and export. That changes protection, metering and earthing assumptions — treat V2G as a different job to a standard charge point.',
            },
            {
              term: 'Demand response and time-of-use',
              detail:
                'Customers on time-of-use tariffs care when load runs, not just that it works. Being able to explain shifting heavy loads to cheap periods turns you from an installer into an adviser.',
            },
            {
              term: 'Energy monitoring',
              detail:
                'CT clamps and monitoring make waste visible and give you a genuine reason to return to a customer with a recommendation. It is one of the few low-cost add-ons that reliably produces follow-on work.',
            },
            {
              term: 'AI-assisted diagnostics',
              detail:
                'Useful for narrowing a fault or checking a design assumption, worthless as a substitute for testing. Anything that goes on a certificate still has to be measured and verified by you.',
            },
          ],
        },
      ],
      tips: [
        'Whatever tools you use, keep the certification, photos and test data in one place you control. Tools change; your record has to outlive them.',
        'Learn one smart platform properly rather than dabbling in four. Commissioning competence is what gets you recommended.',
      ],
    },
  },
  {
    id: 'business-skills',
    title: 'Business & Soft Skills',
    description: 'Non-technical skills that drive career success',
    badge: 'Essential',
    icon: Briefcase,
    color: 'blue',
    stats: [
      { label: 'Skills', value: '15' },
      { label: 'Impact', value: 'High' },
    ],
    content: {
      overview:
        'Most electricians who struggle financially are not bad at the electrical work. They are underpricing, not chasing payment, and losing days to problems that a clearer conversation would have prevented. This section is worth more to your income than any technical qualification on the list.',
      sections: [
        {
          title: 'Communication',
          icon: Users,
          content: [
            {
              term: 'Explaining without jargon',
              detail:
                'A customer who understands why the work is needed pays for it without arguing. Say what the risk is, what you would do, and what happens if it is left — three sentences, no regulation numbers unless they ask.',
            },
            {
              term: 'Putting it in writing',
              detail:
                'Confirm scope, price and exclusions in writing before you start. Almost every payment dispute in this trade traces back to something both parties assumed and neither wrote down.',
            },
            {
              term: 'Listening before quoting',
              detail:
                'Let the customer finish describing the problem. The thing they mention last — the light that flickers, the breaker that trips in winter — is frequently the actual fault.',
            },
            {
              term: 'Handling it when it goes wrong',
              detail:
                'Ring them before they ring you. A delay explained in advance is an inconvenience; a delay discovered by the customer is a breach of trust, and that is what generates bad reviews.',
            },
            {
              term: 'Saying no clearly',
              detail:
                'Turning down work that is unsafe, outside your competence, or priced below cost is a professional skill. "That is not something I am registered to certify" is a complete answer.',
            },
          ],
        },
        {
          title: 'Commercial Awareness',
          icon: DollarSign,
          content: [
            {
              term: 'Knowing your real cost per hour',
              detail:
                'Your charge-out rate has to cover van, tools, insurance, scheme fees, calibration, holiday, sick days, pension and unbilled time — not just the hours you are on site. Most self-employed electricians price against what the person down the road charges and never work out their own number.',
            },
            {
              term: 'Quoting rather than guessing',
              detail:
                'Price the materials, the labour, the return visits and the paperwork. Then compare the finished job against the quote. The gap between the two is where your business is actually made or lost.',
            },
            {
              term: 'Getting paid',
              detail:
                'Stage payments on larger work, clear terms on the invoice, and chase the day it goes overdue. Cash flow kills more small electrical firms than lack of work does — being owed money is not the same as having it.',
            },
            {
              term: 'Contracts and variations',
              detail:
                'Anything outside the agreed scope is a variation and needs agreeing in writing before you do it. "While you are here, can you just…" is the most expensive sentence in the trade.',
            },
            {
              term: 'Tax and status',
              detail:
                'CIS deductions, VAT registration thresholds and self-assessment deadlines all carry real penalties. Get an accountant early — the fee is smaller than the mistakes.',
            },
          ],
        },
        {
          title: 'Leadership',
          icon: Star,
          content: [
            {
              term: 'Mentoring an apprentice',
              detail:
                'Explain the why, not just the what, and let them make safe mistakes with you watching. Supervising well is also the clearest evidence for an approved-electrician grading.',
            },
            {
              term: 'Running a small team',
              detail:
                'Sequence the work so nobody is waiting on materials or on another trade. Most lost productivity on site is waiting, not slow working.',
            },
            {
              term: 'Delegating properly',
              detail:
                'Hand over the whole task with the standard you expect and the deadline, then let them do it. Delegating and then hovering costs you both time and gets you neither the work nor the trust.',
            },
            {
              term: 'Deciding under pressure',
              detail:
                'When something is unsafe, stop. The commercial pressure to keep going is real and it is never worth it — you carry the liability personally, and so does whoever signed.',
            },
            {
              term: 'Working with other trades',
              detail:
                'First fix has to coordinate with plumbers, plasterers and kitchen fitters. The electrician who talks to the other trades early gets their runs where they want them; the one who does not gets a joist notched through his cable.',
            },
          ],
        },
      ],
      tips: [
        'Work out your true cost per chargeable hour before your next quote. Most people who do this for the first time discover they are undercharging.',
        'Write scope and exclusions on every quote, however small the job. It is the cheapest legal protection available to you.',
        'Get every variation agreed in writing before you carry it out — even a text message with a price is enough.',
      ],
    },
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Technologies',
    description: 'Where the work is heading next',
    badge: 'Future',
    icon: Rocket,
    color: 'blue',
    // '40%+ Growth' removed — no source for that figure.
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'The common thread in all of this is electrification: heating, transport and generation are all moving onto the electrical system, and that pushes more load into buildings that were never designed for it. You do not need to chase every one of these, but you should understand what is coming toward your work.',
      sections: [
        {
          title: 'Electrification of heat and transport',
          icon: Zap,
          content: [
            {
              term: 'Heat pumps',
              detail:
                'Replacing a gas boiler with a heat pump adds a substantial continuous load to a property. Assess the existing supply, main fuse and consumer unit capacity before anyone commits to a date — supply upgrades take weeks and are the DNO\'s timescale, not yours.',
            },
            {
              term: 'Induction and all-electric kitchens',
              detail:
                'All-electric kitchens concentrate serious load on a single circuit and change diversity assumptions in older properties. Worth checking the existing supply rather than assuming the cooker circuit will cope.',
            },
            {
              term: 'Charging beyond the single driveway',
              detail:
                'Workplace, fleet and shared-parking charging is a different discipline to a domestic charge point — load management, metering, billing and phase balancing all come into play at once.',
            },
            {
              term: 'Grid-edge and flexibility',
              detail:
                'Properties are becoming two-way: generating, storing and exporting. Protection, metering and earthing assumptions built around one-way supply need rethinking when power can flow back.',
            },
            {
              term: 'Demand-side response',
              detail:
                'Loads that shift themselves to cheap or low-carbon periods. Understanding it lets you advise on running costs, which is a conversation customers increasingly want to have.',
            },
          ],
        },
        {
          title: 'Energy storage',
          icon: Shield,
          content: [
            {
              term: 'Battery systems',
              detail:
                'Lithium storage brings thermal runaway risk, siting constraints and fire-service considerations that are unfamiliar to most domestic electricians. Where the battery goes is a safety decision, not a convenience one.',
            },
            {
              term: 'Hybrid inverters',
              detail:
                'One unit handling PV, battery and grid interaction. Commissioning is where these jobs succeed or fail — the physical install is usually the straightforward part.',
            },
            {
              term: 'Grid-tied versus off-grid',
              detail:
                'Fundamentally different design problems. Off-grid has to be sized for the worst week of the year, not the average, and getting that wrong leaves someone without power in January.',
            },
            {
              term: 'Battery management systems',
              detail:
                'The BMS is the safety system. Know what it monitors, what it will shut down for, and how to interpret its faults before you are standing in front of a customer with a fault light on.',
            },
            {
              term: 'Commissioning and handover',
              detail:
                'Storage systems need documented commissioning, and the customer needs to know how to isolate the system safely in an emergency. Leaving that undone is storing up a serious incident.',
            },
          ],
        },
        {
          title: 'Connected infrastructure',
          icon: Building,
          content: [
            {
              term: 'Small cells and distributed comms',
              detail:
                'Network densification puts powered equipment on street furniture and rooftops, which means small, dispersed, awkward-access electrical jobs with strict uptime expectations.',
            },
            {
              term: 'Edge computing and micro data centres',
              detail:
                'Compute is moving closer to where it is used, putting resilient power, cooling and monitoring into ordinary buildings rather than purpose-built halls.',
            },
            {
              term: 'Smart street lighting',
              detail:
                'Columns are becoming platforms carrying sensors, connectivity and sometimes charging. Local authority frameworks make this long-run, repeatable contract work.',
            },
            {
              term: 'Charging networks',
              detail:
                'Public charging is a different business to installation — uptime obligations, remote monitoring and planned maintenance contracts rather than one-off jobs.',
            },
            {
              term: 'Microgrids and local energy',
              detail:
                'Sites that can generate, store and island themselves. Still specialist, but it is the direction campuses, farms and industrial estates are moving in.',
            },
          ],
        },
      ],
      tips: [
        'Pick the one of these closest to work you already do. Adjacent skills convert into paid work far faster than a standing start in something unrelated.',
      ],
    },
  },
  {
    id: 'professional-framework',
    title: 'Professional Development Framework',
    description: 'Structured approach to skill progression',
    badge: 'Framework',
    icon: Target,
    color: 'blue',
    stats: [{ label: 'Stages', value: '3' }],
    content: {
      overview:
        'Most electricians develop by accident — they learn whatever the last job demanded. That works until you want a specific grade, rate or type of work, at which point you need to be deliberate about it. Assess honestly, plan narrowly, then actually do it.',
      sections: [
        {
          title: 'Assess where you actually are',
          icon: CheckCircle,
          content: [
            {
              term: 'Audit against a real standard',
              detail:
                'Compare yourself to the published requirements for the grade or role you want — JIB grading criteria, a scheme\'s competence requirements, a job advert you would like to answer. Measuring against a written standard beats measuring against how you feel.',
            },
            {
              term: 'Find the gap that is actually blocking you',
              detail:
                'There is usually one thing standing between you and the next step, and it is often paperwork or evidence rather than skill. Identify that one item instead of spreading effort across five.',
            },
            {
              term: 'Be honest about strengths',
              detail:
                'Work you are already good at and enjoy is where you will build depth fastest. Chasing a specialism you dislike because it looks lucrative rarely survives the second year.',
            },
            {
              term: 'Get an outside opinion',
              detail:
                'A supervisor, assessor or experienced colleague will see gaps you cannot. Ask what they would want to see before recommending you for the next grade.',
            },
            {
              term: 'Check what evidence you can produce',
              detail:
                'Competence you cannot evidence does not count at assessment. If you cannot show certificates, test records or signed-off work, that is the gap — not the skill.',
            },
          ],
        },
        {
          title: 'Plan narrowly',
          icon: Target,
          content: [
            {
              term: 'One goal for the next year',
              detail:
                'A single qualification, grade or specialism you can realistically finish. A list of six aspirations reliably produces none of them.',
            },
            {
              term: 'Work backwards from the requirement',
              detail:
                'Find the actual entry requirements, cost, duration and assessment method before you commit. Some routes need employer support or logged hours that take longer to arrange than the course itself.',
            },
            {
              term: 'Budget the money and the time',
              detail:
                'Count the course fee, the days not earning, travel and any kit. The lost earnings are usually the larger number and the one people forget.',
            },
            {
              term: 'Check it is recognised',
              detail:
                'Before paying anyone, confirm the qualification is accepted by the scheme, grading body or employer you are targeting. Not every advertised course leads where its marketing implies.',
            },
            {
              term: 'Book it',
              detail:
                'An intention with no date is not a plan. Putting money down and a date in the diary is what converts this from a page you read into something that happened.',
            },
          ],
        },
        {
          title: 'Do it and record it',
          icon: TrendingUp,
          content: [
            {
              term: 'Formal training',
              detail:
                'Classroom and assessed courses for anything requiring certification. Non-negotiable where a signature or scheme registration depends on it.',
            },
            {
              term: 'Learning on the job',
              detail:
                'Ask to be put on the work you want to learn, and say why. Most supervisors will accommodate someone who asks specifically rather than waiting to be picked.',
            },
            {
              term: 'Keeping current',
              detail:
                'BS 7671 amendments change practice — A4:2026 is the current baseline. Update courses exist for exactly this and being out of date on the current amendment is visible immediately to anyone assessing you.',
            },
            {
              term: 'Learning from other people',
              detail:
                'Time alongside someone who already does the work you want is worth more than any course. Ask; most experienced electricians are willing if you are genuinely interested.',
            },
            {
              term: 'Recording CPD as you go',
              detail:
                'Log training, courses and significant work as it happens. Professional bodies and grading assessments ask for evidence, and reconstructing two years of it from memory is both painful and unconvincing.',
            },
          ],
        },
      ],
      tips: [
        'Pick the one thing blocking your next step and finish it before starting anything else.',
        'Check a qualification is recognised by the body you are targeting before you pay for it.',
      ],
    },
  },
  {
    id: 'regional-skills',
    title: 'Regional Skills Intelligence',
    description: 'Skills demand varies by UK region',
    badge: 'Regional',
    icon: MapPin,
    color: 'blue',
    stats: [
      // 'Data: Live' was untrue — this is a hand-maintained overview, not a
      // live feed. Three regional groupings are described below, not ten.
      { label: 'Regions', value: '3' },
    ],
    content: {
      overview:
        'Where you work shapes what is worth learning as much as what you enjoy. This is a general picture of how demand clusters across the UK, not a live feed — check local job listings and talk to agencies in your area before committing to a specialism on the back of it.',
      sections: [
        {
          title: 'London & the South East',
          icon: Building,
          content: [
            {
              term: 'Commercial fit-out and data centres',
              detail:
                'Dense commercial property means constant refurbishment, and the corridor west of London has a long-standing concentration of data centre work. Both reward people who can work to programme, at night, with tight tolerances on documentation.',
            },
            {
              term: 'Building controls and smart buildings',
              detail:
                'Large managed buildings run on BMS and controls integration. Being the electrician who can talk to the controls engineer is worth more here than almost anywhere else.',
            },
            {
              term: 'Retrofit and EV infrastructure',
              detail:
                'Older, denser housing stock plus limited off-street parking makes both domestic retrofit and shared charging infrastructure ongoing work rather than a passing wave.',
            },
          ],
        },
        {
          title: 'The Midlands & the North',
          icon: Building,
          content: [
            {
              term: 'Industrial and manufacturing',
              detail:
                'Manufacturing plant, three-phase distribution and planned maintenance. Steadier and less price-shopped than domestic work, and it rewards fault-finding ability over speed.',
            },
            {
              term: 'Automation and controls',
              detail:
                'PLC-adjacent competence, drives and motor control are consistently in demand around manufacturing centres. It is one of the clearer routes out of hourly domestic pricing.',
            },
            {
              term: 'Logistics and warehousing',
              detail:
                'Large-footprint distribution buildings need high-bay lighting, extensive containment and increasingly fleet charging — big, repeatable packages of work.',
            },
          ],
        },
        {
          title: 'Scotland, Wales & the rural nations',
          icon: Building,
          content: [
            {
              term: 'Renewables and grid',
              detail:
                'Generation and grid reinforcement work concentrates here. It frequently means travel, rotation working and site-specific safety training on top of your electrical competence.',
            },
            {
              term: 'Heat pumps and off-gas properties',
              detail:
                'Properties off the gas network are the natural early market for heat pumps, which makes supply capacity assessment a routinely useful skill rather than an occasional one.',
            },
            {
              term: 'Rural and distributed work',
              detail:
                'Longer distances between jobs change the economics — travel time, stock carried in the van, and getting the job right first time all matter more than they do in a city.',
            },
          ],
        },
      ],
      tips: [
        'Check what local agencies are actually advertising before paying for a specialism — regional demand differs more than national coverage suggests.',
      ],
    },
  },
  {
    id: 'skills-marketplace',
    title: 'Skills Marketplace Analysis',
    description: 'What employers are paying for specific skills',
    badge: 'Market',
    icon: DollarSign,
    color: 'blue',
    stats: [{ label: 'Factors', value: '5' }],
    content: {
      overview:
        'Some work pays more than other work, and it is worth understanding why rather than chasing whichever certificate is fashionable. Rates vary widely by region, sector and client, so treat everything here as the mechanism behind a premium — not a promise of one. Check current advertised rates for your own area before making a decision on the strength of it.',
      sections: [
        {
          title: 'What actually creates a premium',
          icon: Star,
          content: [
            {
              term: 'Restricted permission to sign',
              detail:
                'The biggest uplifts attach to work where fewer people are allowed to certify — scheme registration, MCS, competent-person status. You are being paid for the signature and the liability behind it as much as the labour.',
            },
            {
              term: 'Liability and consequence',
              detail:
                'Fire detection, periodic inspection and anything life-safety carries real professional risk. Rates reflect the exposure you are accepting, which is also why the insurance costs more.',
            },
            {
              term: 'Capital and equipment',
              detail:
                'Specialisms that need calibrated instruments, thermal imaging, access equipment or a second person price higher because the cost base is higher. Factor the kit into the rate before you commit to the specialism.',
            },
            {
              term: 'Disruption and hours',
              detail:
                'Data centres, retail, healthcare and rail pay more partly because the work happens at night, at weekends, or inside a shutdown window. That premium is compensation for your life, not just your skill.',
            },
            {
              term: 'Scarcity that will not last forever',
              detail:
                'Early movers in a new technology earn well until training catches up and supply normalises. Worth entering early, worth not assuming the differential is permanent.',
            },
          ],
        },
        {
          title: 'Where demand is currently concentrated',
          icon: TrendingUp,
          content: [
            {
              term: 'Inspection and testing',
              detail:
                'Periodic inspection is driven by rental and workplace duties that do not disappear in a downturn, which makes it some of the steadiest work available. It is also the competence most often used to justify an approved-electrician grading.',
            },
            {
              term: 'EV charge point installation',
              detail:
                'Notifiable work with specific earthing requirements under Section 722 and, in practice, scheme registration to certify. The barrier to entry is what protects the rate.',
            },
            {
              term: 'Renewables and storage',
              detail:
                'Solar PV, battery storage and heat pump supplies. Paid domestic work here generally requires MCS certification, which is a business-level commitment rather than a single course.',
            },
            {
              term: 'Fire detection and emergency lighting',
              detail:
                'BS 5839 and BS 5266 competence, with design, install, commission and maintain treated separately. Recurring maintenance obligations make this genuinely repeatable income.',
            },
            {
              term: 'Industrial and controls',
              detail:
                'Automation, PLC-adjacent work and planned maintenance in manufacturing. Less visible than domestic work, typically better paid and far less price-shopped.',
            },
          ],
        },
      ],
      tips: [
        'Before paying for a course, check what is actually being advertised in your region and what registration the work requires beyond the certificate itself.',
        'A qualification you never use commercially returns nothing. Pick the one you can put to work within a few months.',
      ],
    },
  },
];

// ==========================================
// PROFESSIONAL DEVELOPMENT ITEMS
// ==========================================

const professionalDevelopmentItems: ContentItem[] = [
  {
    id: 'continuing-education',
    title: 'Continuing Education',
    description: 'Formal qualifications and certifications',
    badge: 'CPD',
    icon: GraduationCap,
    color: 'green',
    // Specific course codes removed — 2391/2919/2399/2377 could not be verified
    // against the qualifications data, and quoting a stale code sends people to
    // buy the wrong thing. Named the competence instead; codes get renumbered.
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'CPD is not a box-ticking exercise once you are certifying your own work — it is what keeps your signature defensible. Always confirm the current unit code and awarding body before paying for a course; the numbers get renumbered and providers keep advertising the old ones.',
      sections: [
        {
          title: 'Competence worth holding',
          icon: CheckCircle,
          content: [
            {
              term: 'Current wiring regulations',
              detail:
                'BS 7671 competence current to the prevailing amendment — A4:2026 is the present baseline. Update courses exist specifically for this, and working to a superseded amendment is visible on every certificate you sign.',
            },
            {
              term: 'Inspection and testing',
              detail:
                'The qualification that changes what you can sign for and opens periodic inspection work. If you take only one thing from this page, take this.',
            },
            {
              term: 'EV charge point installation',
              detail:
                'Section 722 work, where the earthing arrangement is the hard part — on a PME supply you must either provide an earth electrode or use a device that disconnects on an open-PEN condition.',
            },
            {
              term: 'Renewables and storage',
              detail:
                'Solar PV falls under Section 712, with battery storage adding DC, fire and siting considerations. Paid domestic work generally needs MCS, which is a business registration rather than a course.',
            },
            {
              term: 'Arc fault detection',
              detail:
                'Regulation 421.1.7 makes a recommendation directed at AC final circuits, and AFDDs must be positioned to protect the whole final circuit. Worth understanding before a client asks whether they need them.',
            },
          ],
        },
        {
          title: 'What counts as CPD',
          icon: BookOpen,
          content: [
            {
              term: 'Formal assessed training',
              detail:
                'Anything leading to a certificate you rely on. Non-negotiable where a signature or scheme registration depends on it.',
            },
            {
              term: 'Manufacturer training',
              detail:
                'Often free, sometimes required for warranty validity, and it puts you on approved-installer lists that generate enquiries without advertising.',
            },
            {
              term: 'Structured self-study',
              detail:
                'Technical guidance, standards updates and webinars. It counts, provided you record what you learned rather than just that you attended.',
            },
            {
              term: 'Learning from the work',
              detail:
                'A difficult fault or an unfamiliar system is CPD if you write down what it taught you. Most electricians do the learning and skip the recording.',
            },
          ],
        },
        {
          title: 'Recording it',
          icon: Target,
          content: [
            {
              term: 'Keep a running log',
              detail:
                'Date, activity, what you learned, and how you have applied it. Minutes as you go; weekends if you leave it.',
            },
            {
              term: 'Evidence application, not attendance',
              detail:
                'Assessors want to see that learning changed how you work. A certificate proves you sat in a room.',
            },
            {
              term: 'Check what your scheme requires',
              detail:
                'Competent-person schemes and professional bodies set their own CPD expectations, and they differ. Find out what yours asks for rather than guessing at a number of hours.',
            },
            {
              term: 'Review it annually',
              detail:
                'Once a year, look at where you want to be and pick the single thing that gets you closer. That is the whole planning process.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'professional-networking',
    title: 'Professional Networking',
    description: 'Build connections that advance your career',
    badge: 'Networking',
    icon: Users,
    color: 'green',
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'Networking in this trade is not conferences and business cards — it is the wholesaler who tells you who is hiring, the plumber who passes on a rewire, and the electrician you helped out once. Almost every job move and most private work comes through people who already know your work.',
      sections: [
        {
          title: 'Bodies worth knowing',
          icon: Building,
          content: [
            {
              term: 'Professional institutions',
              detail:
                'The IET provides technical guidance, CPD structure and the route to professional registration (EngTech, IEng, CEng). Useful when your competence needs to be legible outside the trade.',
            },
            {
              term: 'Trade associations',
              detail:
                'Bodies such as the ECA, and SELECT in Scotland, represent contractors — offering commercial and employment guidance rather than individual technical certification.',
            },
            {
              term: 'Competent-person schemes',
              detail:
                'The schemes that let you self-certify notifiable domestic work under Part P. Membership is a business decision with an annual cost and an assessment attached — compare what each actually gives you.',
            },
            {
              term: 'The JIB',
              detail:
                'Sets the national wage agreement and the ECS card scheme. Worth knowing even if your employer is not a member, because its rates are the benchmark you negotiate against.',
            },
          ],
        },
        {
          title: 'Where connections actually form',
          icon: Users,
          content: [
            {
              term: 'The wholesaler counter',
              detail:
                'Consistently the most useful network in the trade. Staff know who is busy, who is hiring and who does not pay. Being known there is worth more than any online profile.',
            },
            {
              term: 'Other trades on site',
              detail:
                'Plumbers, joiners, kitchen fitters and builders all meet customers who need an electrician. Reciprocal referral relationships with two or three reliable trades will keep you working.',
            },
            {
              term: 'Trade shows and manufacturer days',
              detail:
                'Product training, free CPD and direct access to technical staff who can answer the questions the datasheet does not.',
            },
            {
              term: 'Online, used properly',
              detail:
                'Trade forums and groups are useful for technical problems and for spotting where the work is moving. Treat confident forum answers with the same scepticism you would apply to anything unsourced.',
            },
          ],
        },
        {
          title: 'What makes it work',
          icon: Heart,
          content: [
            {
              term: 'Be the reliable one',
              detail:
                'Turning up when you said, clearing up, and flagging problems early gets you recommended more than technical brilliance ever will.',
            },
            {
              term: 'Find someone ahead of you',
              detail:
                'An experienced electrician willing to answer questions will save you years. Most will, if you are genuinely interested and not wasting their time.',
            },
            {
              term: 'Pass work on',
              detail:
                'Referring jobs you cannot take — wrong area, wrong specialism, too busy — is what makes other people refer to you. It costs nothing.',
            },
            {
              term: 'Leave well',
              detail:
                'The trade is smaller than it looks. How you exit an employer or a site is usually known before you arrive at the next one.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'leadership-management',
    title: 'Leadership & Management',
    description: 'Skills for supervisory and management roles',
    badge: 'Leadership',
    icon: Star,
    color: 'green',
    // '+30% salary uplift' removed — no source. The JIB's actual published
    // mechanism for supervision is responsibility money (50p–£2/hour).
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'Leading changes what you are paid for — other people\'s output rather than your own. Within the JIB scale, the published mechanism for that is responsibility money of 50p to £2 an hour for an Approved Electrician in charge of work. Above the graded scale, supervisory pay is negotiated individually, so establish the uplift before you accept the title.',
      sections: [
        {
          title: 'Site leadership',
          icon: Shield,
          content: [
            {
              term: 'SSSTS and SMSTS',
              detail:
                'The standard site safety qualifications — supervisor level and manager level respectively. Most principal contractors require them explicitly before you can hold the role.',
            },
            {
              term: 'Health and safety competence',
              detail:
                'IOSH Managing Safely or the NEBOSH General Certificate. Once you supervise, other people\'s safety failures become partly yours.',
            },
            {
              term: 'First aid',
              detail:
                'Commonly required, and often the practical reason a supervisor must be present on a small site.',
            },
            {
              term: 'Knowing when to stop the job',
              detail:
                'The most important supervisory skill and the hardest to use. Commercial pressure to continue is real; the liability for continuing is yours.',
            },
          ],
        },
        {
          title: 'Running work',
          icon: Target,
          content: [
            {
              term: 'Sequencing',
              detail:
                'Most lost productivity on site is waiting — for materials, for another trade, for a decision. Planning the order of work is where a supervisor earns their money.',
            },
            {
              term: 'Delegating properly',
              detail:
                'Hand over the whole task with the standard and the deadline, then leave them to it. Delegating and hovering costs you time and gets you neither the work nor the trust.',
            },
            {
              term: 'Developing people',
              detail:
                'Explaining why, not just what, and letting people make safe mistakes. Supervising well is also the clearest evidence for an approved-electrician grading.',
            },
            {
              term: 'Dealing with underperformance',
              detail:
                'Early, directly and privately. Problems left alone become everyone\'s problem, and the good people leave before the poor ones do.',
            },
            {
              term: 'Keeping the client informed',
              detail:
                'Ring them before they ring you. A delay explained in advance is an inconvenience; one they discover is a breach of trust.',
            },
          ],
        },
        {
          title: 'The commercial side',
          icon: Briefcase,
          content: [
            {
              term: 'Understanding the contract',
              detail:
                'Payment terms, retention, variations and liability. On commercial work the contract decides whether you get paid, however good the installation.',
            },
            {
              term: 'Controlling variations',
              detail:
                'Anything outside agreed scope needs agreeing in writing before it is done. This is the single biggest source of unpaid work in the trade.',
            },
            {
              term: 'Managing a budget',
              detail:
                'Tracking labour and materials against what was priced, while the job is running rather than afterwards when nothing can be done about it.',
            },
            {
              term: 'Winning the next job',
              detail:
                'Repeat clients and referrals cost far less than chasing new enquiries. Delivering well is business development.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'personal-development',
    title: 'Personal Development Planning',
    description: 'Structure your career growth',
    badge: 'Planning',
    icon: Target,
    color: 'green',
    stats: [
      { label: 'Timeframe', value: '1-5yrs' },
      { label: 'Reviews', value: 'Quarterly' },
    ],
    content: {
      overview:
        'A structured Personal Development Plan (PDP) keeps you focused and accountable for career growth.',
      sections: [
        {
          title: 'Work out where you are',
          icon: CheckCircle,
          content: [
            {
              term: 'Measure against something written',
              detail:
                'Compare yourself to a published standard — JIB grading criteria, a scheme\'s competence requirements, or a job advert you would like to answer. Measuring against how you feel tells you nothing useful.',
            },
            {
              term: 'Find the one thing blocking you',
              detail:
                'There is usually a single item between you and the next step, and it is often evidence or paperwork rather than skill. Name it precisely instead of listing five vague ambitions.',
            },
            {
              term: 'Be honest about what you enjoy',
              detail:
                'You will build depth fastest in work you actually like. Chasing a specialism you dislike because it looks lucrative rarely survives the second year.',
            },
            {
              term: 'Ask someone who sees your work',
              detail:
                'A supervisor or experienced colleague will spot gaps you cannot. Ask what they would want to see before recommending you for the next grade.',
            },
            {
              term: 'Check your life fits it',
              detail:
                'Some routes mean nights, travel or staying away. A plan that ignores that gets abandoned, and the abandonment feels like personal failure when it was really a scoping error.',
            },
          ],
        },
        {
          title: 'Set one goal properly',
          icon: Target,
          content: [
            {
              term: 'One thing for the next twelve months',
              detail:
                'A single qualification, grade or specialism you can realistically finish. A list of six produces none of them.',
            },
            {
              term: 'Work backwards from the requirement',
              detail:
                'Find the entry requirements, cost, duration and assessment method before committing. Some routes need employer support or logged hours that take longer to arrange than the course.',
            },
            {
              term: 'Count the real cost',
              detail:
                'Fee, days not earning, travel and kit. Lost earnings are usually the bigger number and the one people forget.',
            },
            {
              term: 'Confirm it is recognised',
              detail:
                'Check the qualification is accepted by the scheme, grading body or employer you are targeting before paying anyone.',
            },
          ],
        },
        {
          title: 'Make it happen',
          icon: TrendingUp,
          content: [
            {
              term: 'Put a date on it',
              detail:
                'An intention with no booking is not a plan. Money down and a date in the diary is what converts this into something that occurred.',
            },
            {
              term: 'Ask for the work',
              detail:
                'Tell your supervisor which work you want exposure to and why. Most will accommodate someone who asks specifically rather than waiting to be chosen.',
            },
            {
              term: 'Record as you go',
              detail:
                'CPD log, certificates, notable jobs. Every grading step asks for evidence and reconstructing it later is both painful and unconvincing.',
            },
            {
              term: 'Review once a year',
              detail:
                'Look at where you wanted to be, be honest about what actually happened, and pick the next single thing. Quarterly reviews sound rigorous and mostly do not survive contact with a busy year.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'digital-professionalism',
    title: 'Digital Professionalism',
    description: 'Online presence and digital reputation',
    badge: 'Digital',
    icon: Laptop,
    color: 'green',
    stats: [
      { label: 'Platforms', value: '5+' },
      { label: 'Impact', value: 'Growing' },
    ],
    content: {
      overview:
        'For a self-employed electrician, what a customer finds when they search your name is now part of the quote. You do not need to become a content creator — you need to be findable, look competent, and have somewhere the good reviews land.',
      sections: [
        {
          title: 'Being findable and credible',
          icon: Users,
          content: [
            {
              term: 'Google Business Profile',
              detail:
                'If you work for yourself, this is the single highest-value thing on the list. It puts you on the map for local searches and it is free. Complete it properly — hours, area covered, photos of real work.',
            },
            {
              term: 'Reviews',
              detail:
                'Ask every satisfied customer, at the moment they are pleased, not a week later. A steady trickle of genuine reviews beats a burst of them, which looks solicited to both customers and search engines.',
            },
            {
              term: 'Responding to criticism',
              detail:
                'Answer a bad review calmly, factually and once. Prospective customers read the response more carefully than the complaint — a measured reply does more good than the review did harm.',
            },
            {
              term: 'A simple website',
              detail:
                'What you do, where you cover, your registrations, and how to contact you. One clear page beats an elaborate site you never update.',
            },
            {
              term: 'Show your registrations',
              detail:
                'Scheme membership, card grade and insurance are exactly what a cautious customer is looking for. Make them easy to find rather than buried.',
            },
          ],
        },
        {
          title: 'Sharing work, sensibly',
          icon: BookOpen,
          content: [
            {
              term: 'Photograph good work',
              detail:
                'A tidy board, a neat containment run — before and after. This is the most persuasive marketing available to an electrician and it costs seconds.',
            },
            {
              term: 'Get permission first',
              detail:
                'Never post the inside of someone\'s home, or anything identifying an address or a client, without asking. It is a trust question before it is a legal one.',
            },
            {
              term: 'Be careful what you criticise',
              detail:
                'Posting another electrician\'s bad work is popular and it is a small trade. Make the point about the practice, not the person.',
            },
            {
              term: 'Answer questions in public',
              detail:
                'Helpful, accurate answers in trade groups and local forums build more reputation than promotion does. People remember who was useful.',
            },
          ],
        },
        {
          title: 'Tools worth having',
          icon: Settings,
          content: [
            {
              term: 'Something that produces certificates properly',
              detail:
                'Certifying on site while the readings are in front of you means fewer transcription errors and a searchable record when a job is questioned years later.',
            },
            {
              term: 'Quoting and invoicing',
              detail:
                'Consistent, professional-looking documents get taken more seriously and get paid faster than a figure sent by text.',
            },
            {
              term: 'Somewhere customer details live',
              detail:
                'Even a simple record of who, what, when and what it cost. It turns one-off jobs into repeat work, because you can actually follow up.',
            },
            {
              term: 'Backup',
              detail:
                'Certificates, photos and test results need to survive a lost phone or a stolen van. One device holding a year of certification is a serious risk.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'innovation-entrepreneurship',
    title: 'Innovation & Entrepreneurship',
    description: 'Create value and build businesses',
    badge: 'Innovation',
    icon: Lightbulb,
    color: 'green',
    // '15%/yr growth' removed — no source.
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'Most electricians who build something beyond day work do it by narrowing, not broadening — finding one thing they do better than the firms around them and becoming the obvious choice for it. The idea is rarely the hard part; getting paid reliably is.',
      sections: [
        {
          title: 'Where the money models are',
          icon: Briefcase,
          content: [
            {
              term: 'Recurring maintenance',
              detail:
                'Periodic inspection, emergency lighting and fire system servicing produce predictable annual income driven by legal duty rather than discretionary spend. Worth more than the same revenue won job by job.',
            },
            {
              term: 'A narrow specialism',
              detail:
                'Being the person locally who does one thing properly — thermal imaging, EV, controls, industrial fault-finding. Depth is what lets you stop competing on price.',
            },
            {
              term: 'Teaching and assessing',
              detail:
                'Training, assessing and verifying is a genuine second income, and providers are consistently short of people with current site experience.',
            },
            {
              term: 'Consultancy and reporting',
              detail:
                'Expert reports, condition surveys and design review pay for judgement rather than hours. It needs demonstrable competence and the insurance to match.',
            },
          ],
        },
        {
          title: 'Ideas worth testing',
          icon: Lightbulb,
          content: [
            {
              term: 'Energy advice attached to installation',
              detail:
                'Monitoring makes waste visible and gives you a real reason to go back to a customer with a recommendation. One of the few low-cost add-ons that reliably produces follow-on work.',
            },
            {
              term: 'Maintenance for systems you installed',
              detail:
                'Whoever commissioned it is best placed to service it. Offer the contract at handover, when the relationship is strongest, not a year later.',
            },
            {
              term: 'Serving other electricians',
              detail:
                'Testing, certification, design or specialist plant hired out to smaller firms who cannot justify it themselves. Business-to-business work with fewer price-shoppers.',
            },
            {
              term: 'Underserved building types',
              detail:
                'Listed buildings, agricultural, marine, hazardous areas. Awkward work with less competition and clients who value someone who understands the constraints.',
            },
          ],
        },
        {
          title: 'Before you commit',
          icon: Rocket,
          content: [
            'Test the demand with real enquiries before spending on qualifications or equipment',
            'Work out your true cost per chargeable hour — most people who do this discover they undercharge',
            'Check what registration and insurance the work legally requires, not just the qualification',
            'Start alongside employment if you can; it removes most of the risk from the first year',
            'Get an accountant before your first tax year ends rather than during your first panic',
          ],
        },
      ],
    },
  },
  {
    id: 'sustainability-leadership',
    title: 'Sustainability & ESG Leadership',
    description: 'Lead the green transition',
    badge: 'Green',
    icon: Leaf,
    color: 'green',
    stats: [
      { label: 'Demand', value: 'Growing' },
    ],
    content: {
      overview:
        'Decarbonisation is not a values position for an electrician — it is a description of where the work is going. Heat, transport and generation are all moving onto the electrical system, which puts you at the centre of it whether or not you find the subject interesting.',
      sections: [
        {
          title: 'What to understand',
          icon: BookOpen,
          content: [
            {
              term: 'Why it keeps happening',
              detail:
                'The UK net zero target is written into law under the Climate Change Act. That is why the direction survives changes of government, and why the work is structural rather than a fashion.',
            },
            {
              term: 'Retrofit as a discipline',
              detail:
                'Upgrading existing buildings is governed by its own standards and assessment process — PAS 2035 sets out a whole-house approach for domestic retrofit. Electrical work sits inside that framework rather than alongside it.',
            },
            {
              term: 'Where the electrical constraint bites',
              detail:
                'Most decarbonisation measures add load. Supply capacity, main fuse rating and consumer unit headroom are what decide whether a scheme is feasible — and you are the person who can say.',
            },
            {
              term: 'Running cost, not just carbon',
              detail:
                'Customers make decisions on bills. Being able to talk about time-of-use tariffs and load shifting is what turns you from installer into adviser.',
            },
          ],
        },
        {
          title: 'What to be able to do',
          icon: Zap,
          content: [
            {
              term: 'Assess a supply properly',
              detail:
                'The single most useful skill here. Establishing what an existing installation can actually carry before anyone commits to a heat pump or charger prevents the most expensive kind of surprise.',
            },
            {
              term: 'Solar PV and storage',
              detail:
                'Section 712 work, with DC behaviour and fire considerations unfamiliar to most domestic electricians. MCS is generally required for paid domestic installation.',
            },
            {
              term: 'Heat pump supplies',
              detail:
                'A large continuous load added to properties never designed for it. Frequently reveals a need for a DNO upgrade — on the DNO\'s timescale, not yours.',
            },
            {
              term: 'Charging beyond the driveway',
              detail:
                'Workplace, fleet and shared parking bring load management, metering and phase balancing into what looks like a simple charger job.',
            },
            {
              term: 'Measure it',
              detail:
                'Monitoring and CT clamps turn claims into evidence. If you can show a customer what changed, you can charge for the advice as well as the install.',
            },
          ],
        },
        {
          title: 'Industry Leadership',
          icon: Star,
          content: [
            'Sustainability ambassador role',
            'Green certification schemes',
            'Industry working groups',
            'Policy engagement',
            'Client education',
          ],
        },
      ],
    },
  },
  {
    id: 'wellbeing-resilience',
    title: 'Wellbeing & Resilience',
    description: 'Maintain mental and physical health',
    badge: 'Wellbeing',
    icon: Heart,
    color: 'green',
    stats: [
      { label: 'Priority', value: 'High' },
      { label: 'Impact', value: 'Career-long' },
    ],
    content: {
      overview:
        'This trade asks a lot of your body and, less visibly, of your head. Self-employment means no sick pay, irregular income and decisions taken alone; site work means noise, dust, kneeling and lifting for decades. Both are manageable if you take them seriously early, and both are expensive to ignore.',
      sections: [
        {
          title: 'Looking after your body',
          icon: Shield,
          content: [
            {
              term: 'Your knees and back',
              detail:
                'Kneeling in lofts and under floors, lifting boards and drums. Knee pads and a second pair of hands cost nothing next to the joint damage that ends careers early — and it does end them early.',
            },
            {
              term: 'Hearing',
              detail:
                'Hearing loss is cumulative and permanent. SDS drills, grinders and chasing all do damage that you will not notice until it is done. Wear the protection every time, not just on the loud jobs.',
            },
            {
              term: 'Dust',
              detail:
                'Silica from chasing and drilling masonry causes irreversible lung disease. On-tool extraction and the correct mask are not optional extras, and a dust mask from the merchant is usually not the correct mask.',
            },
            {
              term: 'Eyes',
              detail:
                'Debris, arc flash and UV. Eye protection is the cheapest insurance available for something you cannot replace.',
            },
            {
              term: 'Get checked',
              detail:
                'Hearing and lung function tests give you a baseline. If damage does occur, having earlier records matters both medically and for any claim.',
            },
          ],
        },
        {
          title: 'Looking after your head',
          icon: Heart,
          content: [
            {
              term: 'The pressures are real',
              detail:
                'Working alone, carrying liability, chasing payment, and quoting against people who cut corners. None of that is a personal weakness — it is the structure of the job.',
            },
            {
              term: 'Money worry',
              detail:
                'Cash flow is the most common source of stress for self-employed electricians. Clear terms, stage payments and chasing promptly relieve more pressure than almost anything else you can do.',
            },
            {
              term: 'Talk to someone in the trade',
              detail:
                'Other electricians understand the specifics in a way that general advice does not. A peer who has had the same bad month is worth a great deal.',
            },
            {
              term: 'Know when it is more than a bad week',
              detail:
                'Persistent sleeplessness, dread before work, drinking more, withdrawing from people. If that is where you are, speak to your GP — it is a medical matter, not a character one.',
            },
            {
              term: 'Get help early',
              detail:
                'Elec-Mate has a wellbeing area with support resources. Using it early is straightforward; leaving it until things are severe makes everything harder.',
            },
          ],
        },
        {
          title: 'Making the career last',
          icon: TrendingUp,
          content: [
            {
              term: 'Plan for no income',
              detail:
                'Self-employment carries no sick pay. A few months of reserve, and thinking properly about income protection, is what stops an injury becoming a crisis.',
            },
            {
              term: 'Pension',
              detail:
                'Easy to postpone when you are busy and painful to start late. Whatever the amount, starting is the decision that matters.',
            },
            {
              term: 'Have a second gear',
              detail:
                'Testing, design, assessing and training are all routes that keep you earning when climbing about in lofts stops being realistic. Build one before you need it.',
            },
            {
              term: 'Take the holiday',
              detail:
                'Working every weekend is not commitment, it is a pricing problem. If you cannot afford time off, your rate is wrong.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'Lighthouse Construction Industry Charity',
          url: 'https://www.lighthouseclub.org',
          description: '24/7 support helpline',
        },
        {
          title: 'Mates in Mind',
          url: 'https://www.matesinmind.org',
          description: 'Mental health in construction',
        },
      ],
    },
  },
  {
    id: 'industry-leadership',
    title: 'Industry Leadership',
    description: 'Shaping the future of the profession',
    badge: 'Leadership',
    icon: Star,
    color: 'green',
    stats: [{ label: 'Routes', value: '3' }],
    content: {
      overview:
        'The rules everyone else works to are written by people who volunteered. It is slow, unglamorous and largely unpaid — and it is how someone with real site experience stops the standards drifting away from what is actually practical on a job.',
      sections: [
        {
          title: 'Shaping the standards',
          icon: Building,
          content: [
            {
              term: 'Committees and working groups',
              detail:
                'Institutions and trade bodies run technical committees that feed into how standards and guidance develop. Site experience is exactly what these rooms are short of.',
            },
            {
              term: 'Consultations',
              detail:
                'Draft standards and regulatory changes go out for comment, and anyone can respond. Most electricians who complain about a regulation never saw the consultation.',
            },
            {
              term: 'Technical writing',
              detail:
                'Guidance, articles and worked examples. Explaining something clearly for other electricians is a genuine contribution and it sharpens your own understanding.',
            },
            {
              term: 'Professional registration',
              detail:
                'EngTech, IEng or CEng through the Engineering Council makes your competence legible outside the trade, which matters when you are representing it.',
            },
          ],
        },
        {
          title: 'Bringing people through',
          icon: GraduationCap,
          content: [
            {
              term: 'Taking on apprentices',
              detail:
                'The trade only continues if experienced people train the next lot. It is also the clearest evidence of competence for a grading assessment.',
            },
            {
              term: 'Assessing and verifying',
              detail:
                'NVQ assessment and internal quality assurance. Colleges and providers are consistently short of people with current site experience.',
            },
            {
              term: 'Teaching',
              detail:
                'A real second career, and one that works well when the physical side of the job becomes harder.',
            },
            {
              term: 'Advising on what gets taught',
              detail:
                'Employer and industry input into course content is how the gap between what is taught and what a site actually needs gets closed.',
            },
          ],
        },
        {
          title: 'Advocacy',
          icon: Users,
          content: [
            'Promoting the profession',
            'STEM Ambassador activities',
            'Diversity and inclusion initiatives',
            'Safety culture leadership',
            'Environmental responsibility',
          ],
        },
      ],
    },
  },
  {
    id: 'international-development',
    title: 'International Development',
    description: 'Global opportunities and recognition',
    badge: 'Global',
    icon: Globe,
    color: 'green',
    stats: [
      { label: 'Opportunity', value: 'Growing' },
    ],
    content: {
      overview:
        'UK electrical training travels reasonably well, but "respected" is not the same as "accepted". Every country decides for itself what it will recognise, and the answer changes — so verify with the destination regulator directly rather than relying on what someone in the trade told you.',
      sections: [
        {
          title: 'How recognition actually works',
          icon: CheckCircle,
          content: [
            {
              term: 'Nobody recognises your card automatically',
              detail:
                'Licensing is national. Your UK qualification is evidence to be assessed, not a permit — assume you will need to apply and be assessed rather than simply arriving.',
            },
            {
              term: 'The standards differ',
              detail:
                'BS 7671 is a UK standard. Other countries use their own — voltages, frequencies, earthing arrangements and protection conventions all vary. Your fundamentals transfer; your regulation knowledge largely does not.',
            },
            {
              term: 'Professional registration travels better',
              detail:
                'Engineering Council registration (EngTech, IEng, CEng) is understood internationally in a way that UK trade cards alone are not. If you are seriously considering working abroad, this is the credential worth holding.',
            },
            {
              term: 'Large projects are the usual route',
              detail:
                'International contracting on major infrastructure and energy projects is how most UK electricians actually work overseas — recruited by a contractor who handles the compliance side.',
            },
            {
              term: 'Check with the regulator',
              detail:
                'Requirements change with immigration policy and skills shortages. Get the current position from the destination country\'s licensing body in writing before making plans.',
            },
          ],
        },
        {
          title: 'What to sort out first',
          icon: BookOpen,
          content: [
            {
              term: 'Right to work',
              detail:
                'Visa and work authorisation before anything else. Many skilled-worker routes require employer sponsorship, which means having the job before you go.',
            },
            {
              term: 'Documented evidence',
              detail:
                'Certificates, transcripts, references and a record of the work you have done. Assessment bodies want paperwork, and originals are far harder to obtain once you have left.',
            },
            {
              term: 'The local standard',
              detail:
                'Expect to learn a different regulatory framework from scratch. Budget time for it rather than assuming experience carries you.',
            },
            {
              term: 'Insurance and tax',
              detail:
                'Cover that works where you are, and understanding of where you are tax resident. Both are easy to get wrong and expensive to correct.',
            },
          ],
        },
        {
          title: 'Opportunities',
          icon: Rocket,
          content: [
            'International contracting projects',
            'Overseas permanent positions',
            'Consultancy and training export',
            'Equipment manufacturer roles',
            'International development projects',
          ],
        },
      ],
    },
  },
  {
    id: 'career-toolkit',
    title: 'Career Planning Toolkit',
    description: 'Resources for career management',
    badge: 'Toolkit',
    icon: Settings,
    color: 'green',
    // Rewritten from a list of templates that do not exist as downloads into
    // guidance on what each document should actually contain — deliverable here,
    // rather than implying files the page cannot provide.
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'None of this needs special software. A notes app and a folder will do — what matters is that the records exist when someone asks you to prove something, because none of it can be produced retrospectively.',
      sections: [
        {
          title: 'Records worth keeping',
          icon: Target,
          content: [
            {
              term: 'A CPD log',
              detail:
                'Date, what you did, what you learned, how you have used it. That last column is the one assessors care about — a certificate proves attendance, not competence.',
            },
            {
              term: 'A job record',
              detail:
                'What the work was, where, when, and anything unusual about it. This becomes your evidence for grading, for assessments, and for the moment a job is questioned two years later.',
            },
            {
              term: 'Your certificates in one place',
              detail:
                'Qualifications, card, scheme membership, insurance, instrument calibration — with expiry dates. Something will lapse at the worst possible moment otherwise.',
            },
            {
              term: 'Calculations for anything you designed',
              detail:
                'If you produced the design, keep the working. When a design is challenged, the calculation is the difference between a conversation and a claim.',
            },
          ],
        },
        {
          title: 'What a good electrician\'s CV contains',
          icon: BookOpen,
          content: [
            {
              term: 'Cards and qualifications at the top',
              detail:
                'Card grade, current BS 7671 amendment, inspection and testing, site tickets. This is the first thing anyone hiring checks, so do not bury it on page two.',
            },
            {
              term: 'Sectors and systems, not just employers',
              detail:
                'Say what you have actually worked on — three-phase distribution, fire systems, EV, industrial controls. Company names mean nothing to someone outside that region.',
            },
            {
              term: 'Scale and responsibility',
              detail:
                '"Ran a team of three on a 40-plot new build" tells a reader more than a list of duties ever will.',
            },
            {
              term: 'Keep it to two pages',
              detail:
                'Whoever is reading has a stack of them and thirty seconds per CV. Relevance beats completeness.',
            },
            {
              term: 'Have photos ready',
              detail:
                'Tidy boards and neat containment runs. For self-employed and small-firm work, showing it is more persuasive than describing it.',
            },
          ],
        },
        {
          title: 'Business Tools',
          icon: Briefcase,
          content: [
            'Quote template',
            'Invoice format',
            'Terms and conditions example',
            'Customer feedback form',
            'Business plan outline',
          ],
        },
      ],
    },
  },
];

// ==========================================
// INDUSTRY INSIGHTS ITEMS
// ==========================================

const industryInsightsItems: ContentItem[] = [
  {
    id: 'market-trends',
    title: 'Market Trends & Growth Areas',
    description: 'Where the industry is heading 2026-2030',
    badge: '2026-2030',
    icon: TrendingUp,
    color: 'purple',
    // Growth percentages ('40% annual growth' etc.), '6.8%' and '£12bn' removed
    // — no source existed for any of them. Replaced with the structural drivers,
    // which are verifiable, plus real earnings data from ONS ASHE 2025.
    stats: [{ label: 'Areas', value: '5' }],
    content: {
      overview:
        'Electrification is the single force behind almost all of this: heat, transport and generation are moving onto the electrical system. That is driven by a statutory net zero target, not a trend, which is why it keeps going regardless of the political weather. Treat any specific growth percentage you see quoted — here or anywhere — as marketing unless it names its source.',
      sections: [
        {
          title: 'Where the work is growing',
          icon: TrendingUp,
          content: [
            'EV charging — notifiable work with specific earthing rules under Section 722, and scheme registration to certify',
            'Solar PV and battery storage — MCS certification generally required for paid domestic work',
            'Heat pumps — large new continuous loads, frequently exposing supply capacity limits',
            'Smart buildings and controls — commissioning competence matters more than installation speed',
            'Data centres and critical power — resilient supplies, strict uptime, mostly out-of-hours working',
          ],
        },
        {
          title: 'Where the established work sits',
          icon: Building,
          content: [
            {
              term: 'Domestic',
              detail:
                'Steadily shifting from new installation toward retrofit — upgrading what already exists. The UK has old housing stock and most of it will still be standing in 2050.',
            },
            {
              term: 'Commercial',
              detail:
                'Fit-out and refurbishment cycles continue independently of new build. Dense commercial property generates work whether or not anything is being constructed.',
            },
            {
              term: 'Industrial',
              detail:
                'Automation and controls are making the work more technical rather than reducing it. Downtime costs mean competent maintenance is protected spend.',
            },
            {
              term: 'Infrastructure',
              detail:
                'Rail, nuclear, water and grid reinforcement run for years and absorb large numbers of electricians — with extensive inductions, rigid procedure and often staying away.',
            },
          ],
        },
        {
          title: 'Skills Demand',
          icon: Users,
          content: [
            'ONS ASHE 2025: median £39,647 gross for full-time electricians and electrical fitters',
            'ONS spread: 10th percentile £24,538, 90th £57,786 — sector and overtime drive the difference',
            'An ageing workforce is creating succession gaps and openings for those coming through',
            'Premium attaches to work fewer people may certify — registration, not just skill',
            'Depth in one specialism beats breadth across several when clients are buying certainty',
          ],
        },
      ],
    },
  },
  {
    id: 'sector-analysis',
    title: 'Sector Analysis & Opportunities',
    description: 'Deep dive into industry sectors',
    badge: 'Analysis',
    icon: BarChart3,
    color: 'purple',
    stats: [
      { label: 'Sectors', value: '8' },
    ],
    content: {
      overview:
        'Understanding sector dynamics helps you position yourself for the best opportunities.',
      sections: [
        {
          title: 'Construction and new build',
          icon: Building,
          content: [
            {
              term: 'What the work is like',
              detail:
                'Programme-driven, repetitive and fast. You will do the same thing across forty plots, which suits people who like rhythm and hate surprises.',
            },
            {
              term: 'Off-site manufacture is changing it',
              detail:
                'More assemblies arrive pre-built, shifting work from first fix on site toward installation and connection of prefabricated units. Worth understanding before you assume the work stays as it is.',
            },
            {
              term: 'The money',
              detail:
                'Often day rate or price work rather than salary. Higher headline figures, and you carry the risk of weather, delay and gaps between contracts.',
            },
            {
              term: 'The catch',
              detail:
                'You are one trade among many, working to someone else\'s programme, and rarely see the finished building. Little client contact and limited variety.',
            },
          ],
        },
        {
          title: 'Maintenance and facilities',
          icon: Settings,
          content: [
            {
              term: 'What the work is like',
              detail:
                'Keeping existing buildings running rather than building new ones. Deep familiarity with a handful of sites, and you live with the consequences of other people\'s installation decisions.',
            },
            {
              term: 'The money',
              detail:
                'Usually employed with holiday, pension and sick pay. The day rate looks lower than contracting until you count the weeks contractors are not working.',
            },
            {
              term: 'Multi-skilling',
              detail:
                'Many FM roles expect some fabric, plumbing or HVAC alongside electrical work. Broadening helps here, unlike on site where specialists are preferred.',
            },
            {
              term: 'The catch',
              detail:
                'On-call rotas. It lifts earnings and it takes your evenings and weekends — understand the pattern before accepting.',
            },
          ],
        },
        {
          title: 'Renewables and low carbon',
          icon: Leaf,
          content: [
            {
              term: 'What the work is like',
              detail:
                'Solar PV, battery storage and heat pump supplies. Physically demanding, weather-dependent, and a lot of it is roof work.',
            },
            {
              term: 'The barrier is registration',
              detail:
                'MCS certification is generally required for paid domestic work — a business-level commitment rather than a single course. That barrier is also what protects the rate.',
            },
            {
              term: 'Technically less familiar',
              detail:
                'DC behaves nothing like AC — it cannot be switched off by isolating the supply, and it is live whenever there is daylight. Storage adds fire and siting considerations most domestic electricians have never handled.',
            },
            {
              term: 'The catch',
              detail:
                'Heavily shaped by government incentives. Keep general electrical competence alongside it so a scheme change does not take your income with it.',
            },
          ],
        },
        {
          title: 'Industrial and specialist',
          icon: Zap,
          content: [
            {
              term: 'What the work is like',
              detail:
                'Three-phase distribution, motors, drives and controls in manufacturing. Downtime costs the client serious money, which is exactly why competent fault-finders are valued.',
            },
            {
              term: 'The money',
              detail:
                'Generally better than domestic and far less price-shopped, because clients are buying reliability rather than the cheapest quote.',
            },
            {
              term: 'Shutdown working',
              detail:
                'The heavy work happens during planned shutdowns — nights, weekends and holidays, at premium rates, compressed into short intense windows.',
            },
            {
              term: 'The catch',
              detail:
                'Dust, heat, noise, hazardous areas and confined spaces are routine, and some sites require additional certification before you can work at all.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'future-skills',
    title: 'Future Skills Demand',
    description: 'What to invest in, and what will still matter either way',
    badge: 'Future',
    icon: Rocket,
    color: 'purple',
    // Removed 'quantum computing infrastructure', 'space-related electrical
    // systems', 'fusion energy' and 'wireless power distribution' — none of
    // that is a decision a working UK electrician can act on.
    stats: [{ label: 'Horizons', value: '3' }],
    content: {
      overview:
        'Nobody can tell you what the trade looks like in ten years, and anyone selling a course on that basis should be treated carefully. What you can do is separate the things already happening from the things that might, and put your money in the first category.',
      sections: [
        {
          title: 'Already happening — safe to invest in',
          icon: CheckCircle,
          content: [
            {
              term: 'Inspection and testing',
              detail:
                'Driven by landlord and workplace duties that exist regardless of technology or economy. The most reliably useful qualification in the trade, and it is not going anywhere.',
            },
            {
              term: 'EV charge point installation',
              detail:
                'Already routine work with its own earthing requirements under Section 722. The barrier to entry — notification and scheme registration — is what protects the rate.',
            },
            {
              term: 'Heat pump supplies',
              detail:
                'Assessing whether an existing supply can carry a large new continuous load is becoming ordinary domestic work rather than a specialism.',
            },
            {
              term: 'Solar PV and battery storage',
              detail:
                'Section 712 work, with MCS generally needed for paid domestic installation. Established rather than emerging.',
            },
            {
              term: 'Commissioning and handover',
              detail:
                'As buildings acquire more systems, the ability to prove a system works and document it for whoever maintains it is worth more than installation speed.',
            },
          ],
        },
        {
          title: 'Plausible — worth watching, not yet worth borrowing for',
          icon: TrendingUp,
          content: [
            {
              term: 'Two-way and grid-responsive systems',
              detail:
                'Vehicle-to-grid and flexible export change protection, metering and earthing assumptions built around one-way supply. Real, but not yet common on ordinary jobs.',
            },
            {
              term: 'Local energy systems',
              detail:
                'Microgrids on campuses, farms and industrial estates. Genuine direction of travel, still specialist.',
            },
            {
              term: 'Diagnostics assistance',
              detail:
                'Useful for narrowing a fault or sense-checking a design. It will not test the installation for you, and anything on a certificate still has to be measured.',
            },
            {
              term: 'Whatever policy incentivises next',
              detail:
                'A large part of this sector moves with government schemes. Build transferable competence alongside any incentive-driven specialism so a policy change does not take your income with it.',
            },
          ],
        },
        {
          title: 'What will still matter regardless',
          icon: Lightbulb,
          content: [
            {
              term: 'Fault-finding',
              detail:
                'Every new technology adds new ways to fail. The person who can work out why something does not work has never been out of demand and will not be.',
            },
            {
              term: 'Being allowed to sign',
              detail:
                'Whatever the technology, the money follows whoever may certify it. Registration and competence to sign is the durable asset, not the product knowledge.',
            },
            {
              term: 'Explaining it to a customer',
              detail:
                'Systems get more complex; customers do not get more technical. The ability to explain plainly keeps increasing in value.',
            },
            {
              term: 'The fundamentals',
              detail:
                'Cable sizing, protection, earthing and testing underpin every technology on this page. They are the reason someone with strong basics can pick up a new specialism in months.',
            },
          ],
        },
      ],
      tips: [
        'Put money into the first list. Watch the second. Do not fund a specialism on the strength of a projection.',
        'Pick the emerging area closest to work you already do — adjacent skills convert into paid work far faster than a standing start.',
      ],
    },
  },
  {
    id: 'industry-outlook',
    title: 'Industry Outlook & Strategy',
    description: 'Strategic view for career planning',
    badge: 'Strategy',
    icon: Target,
    color: 'purple',
    stats: [{ label: 'Areas', value: '3' }],
    content: {
      overview:
        'Strip out the noise and the strategic picture for an electrician is fairly simple: demand is structurally supported, the barriers protecting your rate are regulatory rather than technical, and the main risk to your income is not competition — it is standing still.',
      sections: [
        {
          title: 'What is working in your favour',
          icon: TrendingUp,
          content: [
            {
              term: 'Demand is written into law',
              detail:
                'The net zero target is a statutory obligation under the Climate Change Act, not a policy preference. Heat, transport and generation keep moving onto the electrical system regardless of who is in government.',
            },
            {
              term: 'Regulation protects you',
              detail:
                'Notification requirements, scheme registration and competent-person status limit who can do and certify the work. Electricians sometimes resent the admin — it is also the wall keeping the rate up.',
            },
            {
              term: 'Work that cannot be offshored',
              detail:
                'Someone has to be in the building. Unlike much skilled work, the location requirement is absolute.',
            },
            {
              term: 'The workforce is ageing',
              detail:
                'Experienced electricians retiring creates room for those coming through, and makes supervisory and mentoring competence more valuable than it used to be.',
            },
          ],
        },
        {
          title: 'What genuinely threatens it',
          icon: Shield,
          content: [
            {
              term: 'Falling behind on amendments',
              detail:
                'BS 7671 changes on a rolling basis. Being visibly out of date is the fastest way to lose credibility, and it is entirely self-inflicted.',
            },
            {
              term: 'Compliance costs on small firms',
              detail:
                'Scheme fees, insurance, calibration and CPD are payable before you earn anything. They weigh heaviest on sole traders — price for them rather than absorbing them.',
            },
            {
              term: 'Undercutting in domestic work',
              detail:
                'Unregistered and multi-skilled operators compete on price. Competing back on price is a losing game; competing on certification, reliability and evidence is not.',
            },
            {
              term: 'Policy-dependent specialisms',
              detail:
                'Incentive schemes create booms and end them. Specialise, but keep the general competence that survives a scheme being withdrawn.',
            },
            {
              term: 'Your own body',
              detail:
                'The most common thing that ends an electrician\'s earning early is not market forces — it is knees, back, hearing and lungs. Protect them from year one.',
            },
          ],
        },
        {
          title: 'Strategic Recommendations',
          icon: Target,
          content: [
            'Invest in continuous learning',
            'Build specialist expertise',
            'Develop business/commercial skills',
            'Network actively',
            'Consider business ownership',
            'Plan for sector shifts',
          ],
        },
      ],
    },
  },
];

// ==========================================
// CAREER TIMELINE ITEMS (JIB LEVELS)
// ==========================================

const careerTimelineItems: ContentItem[] = [
  {
    id: 'apprentice',
    title: 'Electrical Apprentice',
    description: 'Foundation level - 0-4 years experience',
    badge: 'JIB Apprentice',
    icon: BookOpen,
    color: 'orange',
    stats: [
      { label: 'Duration', value: '4 years' },
      { label: 'JIB annual', value: '£15.9k–£30.7k' },
    ],
    content: {
      overview:
        'The apprenticeship stage is where you build foundational skills through college study alongside paid site work. JIB apprentice rates rise across four stages as you progress, not automatically by year.',
      sections: [
        {
          title: 'Key Qualifications',
          icon: GraduationCap,
          content: [
            'Level 2/3 NVQ Diploma in Electrical Installation (5357 or 5393)',
            'BS 7671 wiring regulations, current to the A4:2026 amendment',
            'ECS Health & Safety Assessment',
            'AM2/AM2E end-point assessment',
            'Functional Skills (if required)',
          ],
        },
        {
          title: 'Typical Responsibilities',
          icon: Zap,
          content: [
            'Assisting qualified electricians',
            'Basic cable installation and containment',
            'Learning safe isolation procedures',
            'Portfolio evidence collection',
            'College attendance and assignment completion',
          ],
        },
        {
          // Annualised from the published JIB hourly rates at 37½ hours × 52
          // weeks. The previous London/SE/Midlands/North bands were invented —
          // the JIB operates one national rate and one London Zone rate, with
          // no separate regional scale.
          title: 'What it actually pays — JIB rates from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'Stage 1 — £8.16/hr',
              detail:
                'About £15,900 a year at 37½ hours. London Zone £9.14/hr, roughly £17,800.',
            },
            {
              term: 'Stage 2 — £10.60/hr',
              detail: 'About £20,700 a year. London £11.88/hr, roughly £23,200.',
            },
            {
              term: 'Stage 3 — £13.05/hr',
              detail: 'About £25,400 a year. London £14.62/hr, roughly £28,500.',
            },
            {
              term: 'Stage 4 — £14.03/hr',
              detail:
                'About £27,400 a year. London £15.72/hr, roughly £30,700 — approaching the Trainee Electrician grade above.',
            },
            {
              term: 'One rate for all hours',
              detail:
                'The separate lower "At College" rate has been removed for England, Wales and Northern Ireland. You are paid the same for off-the-job learning as for site work — if you are not, query it.',
            },
          ],
        },
      ],
      tips: [
        'Build the portfolio as you go. Reconstructing evidence near the end is the most common reason apprentices stall.',
        'Ask for varied work. The first years are the cheapest time to find out which sector suits you.',
        'Check whether your employer is a JIB member — it determines whether these rates are an entitlement or a benchmark.',
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description: 'Source for all rates on this page.',
        },
      ],
    },
  },
  {
    id: 'improver',
    title: 'Electrical Improver',
    description: 'Developing stage - 2-5 years experience',
    badge: 'JIB Improver',
    icon: TrendingUp,
    color: 'orange',
    stats: [
      { label: 'Duration', value: '1-2 years' },
      { label: 'JIB annual', value: '£28.5k–£34.1k' },
    ],
    content: {
      overview:
        'This is the stage where people get stuck. The qualification is nearly done, you are doing most of the work of an electrician, and the only thing between you and the rate for it is an assessment that keeps getting deferred. Treat finishing as the priority, because nobody else will.',
      sections: [
        {
          title: 'What you need to hold',
          icon: GraduationCap,
          content: [
            {
              term: 'Level 3 and the NVQ',
              detail:
                'Complete or close to it. If portfolio evidence is what is outstanding, that is entirely within your control — chase it.',
            },
            {
              term: 'Current wiring regulations',
              detail:
                'BS 7671 competence up to date at A4:2026. Do not let this lapse while you are focused on the assessment.',
            },
            {
              term: 'The AM2 booked',
              detail:
                'Not "planned" — booked, with a date. This is the single thing standing between the trainee rate and the Electrician rate.',
            },
            {
              term: 'The right card for your stage',
              detail:
                'Your card should reflect the grade your qualifications actually support. Check you are not being carded — or paid — below what you hold.',
            },
          ],
        },
        {
          title: 'What the work looks like',
          icon: Zap,
          content: [
            {
              term: 'Real jobs with light supervision',
              detail:
                'You are given work and left to it, with someone available rather than watching. This is the rehearsal for working alone.',
            },
            {
              term: 'Testing under supervision',
              detail:
                'Learning the dead tests in sequence and what the readings mean, before you are responsible for certifying them.',
            },
            {
              term: 'Checking your own work',
              detail:
                'Developing the habit of verifying before you cover up, rather than relying on someone else to catch it.',
            },
            {
              term: 'Helping the apprentices',
              detail:
                'You are now the person they ask. Explaining things well is how you find out what you actually understand.',
            },
            {
              term: 'Watch for being parked',
              detail:
                'Some employers are content to keep capable people on trainee rates indefinitely. If your assessment keeps slipping with no date, that is a conversation to have — or a reason to move.',
            },
          ],
        },
        {
          title: 'JIB Trainee Electrician rates — from 5 January 2026',
          icon: DollarSign,
          content: [
            'Trainee Stage 1 — £14.60/hr national, about £28,500 a year at 37½ hours',
            'Trainee Stage 2 — £16.54/hr national, about £32,300 a year',
            'Trainee Stage 3 — £17.51/hr national, about £34,100 a year',
            'London Zone — Stage 1 £16.37, Stage 2 £18.52, Stage 3 £19.55 per hour',
            'Passing the AM2 moves you to the Electrician rate of £18.38/hr, about £35,800',
          ],
        },
      ],
      tips: [
        'Focus on AM2 preparation',
        'Gain testing and inspection experience',
        'Start considering specialisation areas',
      ],
    },
  },
  {
    id: 'electrician',
    title: 'Electrician (Gold Card)',
    description: 'Qualified stage - 4-7 years experience',
    badge: 'JIB Electrician',
    icon: Award,
    color: 'orange',
    stats: [
      { label: 'Duration', value: 'Career level' },
      { label: 'JIB annual', value: 'c.£35.8k' },
    ],
    content: {
      overview:
        'This is the stage most electricians stay at, and there is nothing wrong with that — it is a skilled, well-paid trade in its own right. What changes here is that the work becomes yours: you plan it, test it, and put your name on the certificate.',
      sections: [
        {
          title: 'What you need to hold',
          icon: GraduationCap,
          content: [
            {
              term: 'Level 3 and the NVQ',
              detail:
                'The full qualification including the portfolio of assessed workplace evidence — not the classroom diploma on its own.',
            },
            {
              term: 'AM2 passed',
              detail:
                'The practical end-point assessment. This is the line between trainee rates and the Electrician grade.',
            },
            {
              term: 'Current wiring regulations',
              detail:
                'BS 7671 competence current to A4:2026. Update courses exist and being on a superseded amendment is visible on everything you sign.',
            },
            {
              term: 'A valid card',
              detail:
                'ECS cards are renewable, so track the expiry. Turning up to a site with an expired card means being turned away and losing the day.',
            },
          ],
        },
        {
          title: 'What the job actually is now',
          icon: Zap,
          content: [
            {
              term: 'Owning a job end to end',
              detail:
                'Planning it, ordering materials, doing it, testing it and certifying it — without someone checking each stage.',
            },
            {
              term: 'Certifying your own work',
              detail:
                'Your signature says you designed, constructed, inspected and tested it, or the part you have named. Never sign for work you did not see.',
            },
            {
              term: 'Fault-finding under pressure',
              detail:
                'You are now the person called when something does not work. Method beats guesswork, and it is what customers are really paying for.',
            },
            {
              term: 'Bringing others on',
              detail:
                'Apprentices and improvers working alongside you. Doing this well is also the evidence you will need for the Approved grade.',
            },
            {
              term: 'Dealing with the customer',
              detail:
                'Explaining what is wrong and what it costs, without jargon. On domestic work this decides whether you get paid without argument.',
            },
          ],
        },
        {
          title: 'What it pays — verified rates',
          icon: DollarSign,
          content: [
            'JIB Electrician rate — £18.38/hr national, about £35,800 a year at 37½ hours',
            'Own transport £19.54/hr (about £38,100); shop employed £16.95/hr (about £33,100)',
            'London Zone — £20.58/hr, about £40,100 a year',
            'ONS ASHE 2025: median £39,647 gross for full-time electricians and electrical fitters',
            'ONS spread: 10th percentile £24,538, 90th percentile £57,786 — sector and overtime drive the gap',
          ],
        },
      ],
      tips: [
        'Get the inspection and testing qualification — it is the gateway to the Approved grade and to periodic inspection work. Confirm the current unit code with the awarding body rather than trusting a number you saw quoted.',
        'If you want domestic work, join a competent-person scheme so you can self-certify notifiable work under Part P instead of notifying building control each time.',
        'Track your card expiry and your amendment currency. Both lapse quietly and both stop you working.',
      ],
    },
  },
  {
    id: 'approved',
    title: 'Approved Electrician',
    description: 'Senior stage - 5-10 years experience',
    badge: 'JIB Approved',
    icon: CheckCircle,
    color: 'orange',
    stats: [
      { label: 'Duration', value: 'Career level' },
      { label: 'JIB annual', value: 'c.£39.2k' },
    ],
    content: {
      overview:
        'The step up from Electrician is not really about being better with tools — it is about taking responsibility for work beyond your own hands, and being trusted to judge someone else\'s. That is what the grade pays for, and it is what the evidence has to show.',
      sections: [
        {
          title: 'What you need to hold',
          icon: GraduationCap,
          content: [
            {
              term: 'Everything the Electrician grade requires',
              detail:
                'Full Level 3, NVQ, AM2 and a current card, with BS 7671 competence up to date at A4:2026.',
            },
            {
              term: 'Inspection and testing',
              detail:
                'The practical gateway to this grade. Confirm the current unit code with the awarding body rather than trusting a number quoted online — they get renumbered.',
            },
            {
              term: 'Evidence of supervising others',
              detail:
                'This is the distinguishing feature. Note the JIB is explicit that supervising apprentices or trainees does not by itself count for responsibility money — it means other operatives.',
            },
            {
              term: 'Complexity, not just years',
              detail:
                'Assessors look for installations of real difficulty and decisions you took, not time served at the grade below.',
            },
          ],
        },
        {
          title: 'What the work becomes',
          icon: Zap,
          content: [
            {
              term: 'Periodic inspection',
              detail:
                'EICRs are sampling and judgement, not a rerun of initial verification. Agree the extent and any limitations in writing before you start — you will be held to whatever you recorded.',
            },
            {
              term: 'Coding correctly',
              detail:
                'C1 danger present, C2 potentially dangerous, C3 improvement recommended, FI further investigation — applied using the Appendix 6 guidance. Over-coding to win remedial work destroys your reputation; missing a C1 destroys more than that.',
            },
            {
              term: 'Checking other people\'s work',
              detail:
                'Verifying designs and installations you did not carry out. Saying no to something that is not right is the job, and it is the uncomfortable part of it.',
            },
            {
              term: 'Being in charge of work',
              detail:
                'Running a team on site, which is what triggers responsibility money under the JIB agreement — 50p to £2 per hour on top of the rate.',
            },
            {
              term: 'Quality that outlives you',
              detail:
                'Certificates and reports surface years later in insurance claims and disputes. At this grade, your documentation is as much a product as the installation.',
            },
          ],
        },
        {
          title: 'What it pays — verified rates',
          icon: DollarSign,
          content: [
            'JIB Approved Electrician — £20.08/hr national, about £39,200 a year at 37½ hours',
            'Own transport £21.19/hr (about £41,300); shop employed £18.61/hr (about £36,300)',
            'London Zone — £22.48/hr, about £43,800 a year',
            'Responsibility money adds 50p–£2/hr when in charge of work supervising other operatives',
            'That premium is worth roughly £975–£3,900 a year on top, before overtime',
          ],
        },
      ],
      tips: [
        'Consider Qualified Supervisor pathway for NICEIC/NAPIT registration',
        'Develop project management skills (SSSTS / SMSTS)',
        'Explore business ownership — sole trader rates +£280-£380/day',
      ],
    },
  },
  {
    id: 'supervisor',
    title: 'Electrical Supervisor',
    description: 'Leadership stage - 7-12+ years experience',
    badge: 'JIB Supervisor',
    icon: Users,
    color: 'orange',
    stats: [
      { label: 'Duration', value: 'Senior level' },
      { label: 'Outside', value: 'JIB scale' },
    ],
    content: {
      overview:
        'At this point you stop being paid for what you install and start being paid for what your team delivers. Plenty of excellent electricians try this and go back to the tools — that is a legitimate choice, not a failure, and it is better to find out early than after you have restructured your career around it.',
      sections: [
        {
          title: 'What you need to hold',
          icon: GraduationCap,
          content: [
            {
              term: 'Approved or Technician competence',
              detail:
                'Supervising work you could not do yourself is a difficult position to hold in front of a team who can tell.',
            },
            {
              term: 'Site supervision certification',
              detail:
                'SSSTS at supervisor level, SMSTS at manager level. Most principal contractors require these explicitly before you can hold the role at all.',
            },
            {
              term: 'Health and safety qualification',
              detail:
                'IOSH Managing Safely or the NEBOSH General Certificate. Once you supervise, other people\'s safety failures become partly yours.',
            },
            {
              term: 'Study for senior roles',
              detail:
                'HNC or HND becomes relevant if you are heading toward contracts management or design responsibility rather than site supervision.',
            },
          ],
        },
        {
          title: 'What the job actually involves',
          icon: Zap,
          content: [
            {
              term: 'Sequencing the work',
              detail:
                'Most lost productivity on site is waiting — for materials, for another trade, for a decision. Removing that waiting is the bulk of the value you add.',
            },
            {
              term: 'Being accountable for others',
              detail:
                'Their quality, their safety, their timekeeping. You cannot fix any of it by working harder yourself, which is the adjustment most new supervisors find hardest.',
            },
            {
              term: 'Holding the line on safety',
              detail:
                'When something is unsafe, you stop it. The commercial pressure to continue is real, constant, and never worth the consequence.',
            },
            {
              term: 'Managing variations',
              detail:
                'Anything outside agreed scope needs agreeing in writing before it is carried out. This is the biggest source of unpaid work in the trade and it is a supervisor\'s job to catch it.',
            },
            {
              term: 'Being the interface',
              detail:
                'Between your team, the main contractor, other trades and the client. Much of the role is communication, and being poor at it undoes good technical judgement.',
            },
          ],
        },
        {
          title: 'What it pays — verified rates',
          icon: DollarSign,
          content: [
            'Supervisory and management roles sit OUTSIDE the JIB graded-operative scale',
            'The published JIB scale tops out at Technician — £22.70/hr national, about £44,300 a year',
            'London Technician £25.47/hr, about £49,700 a year',
            'ONS ASHE 2025 puts the 90th percentile for the occupation at £57,786 gross full-time',
            'Above that, pay is individually negotiated — no published rate exists to quote',
          ],
        },
      ],
      tips: [
        'Develop business management skills (PRINCE2 / APM)',
        'Build industry network (ECA, IET membership)',
        'Consider contracts management or M&E lead roles',
      ],
    },
  },
];

// ==========================================
// JIB GRADES ITEMS
// ==========================================

const jibGradesItems: ContentItem[] = [
  {
    id: 'apprentice-grade',
    title: 'Apprentice Grade',
    description: 'Entry level with protected minimum wage',
    badge: 'Entry',
    icon: BookOpen,
    color: 'amber',
    // All rates below are quoted directly from the JIB Handbook 2026, Section 2
    // (National Working Rules), effective Monday 5 January 2026. The previous
    // figures on this page (£7.55 / £11.50 / £13.40 / £16.20) were labelled
    // 'JIB-aligned' but matched no published JIB rate.
    stats: [
      { label: 'Stage 1', value: '£8.16' },
      { label: 'Stage 4', value: '£14.03' },
    ],
    content: {
      overview:
        'Apprentice rates are set by the JIB and rise in four stages as you progress, not by calendar year. The figures below are the national rates effective from 5 January 2026; the London rate is higher, and both are well above the apprentice National Minimum Wage — do not confuse the two, because the NMW is only the legal floor.',
      sections: [
        {
          title: 'What the grade requires',
          icon: CheckCircle,
          content: [
            {
              term: 'A registered apprenticeship',
              detail:
                'You must be employed and enrolled on a recognised electrical apprenticeship. JIB rates apply to apprentices on a JIB-registered apprenticeship with a JIB member employer — not every employer is one.',
            },
            {
              term: 'Working toward the qualification',
              detail:
                'The NVQ portfolio and the AM2 end-point assessment. Stage progression is tied to demonstrated progress, so falling behind on portfolio evidence can hold up your pay as well as your qualification.',
            },
            {
              term: 'ECS card and health and safety',
              detail:
                'You need the appropriate ECS card to get on most sites, which requires passing the health and safety assessment.',
            },
            {
              term: 'College or off-the-job learning',
              detail:
                'The JIB removed the separate lower "At College" rate for England, Wales and Northern Ireland — one rate now applies to all hours, including off-the-job learning. If you are being paid less for college days, question it.',
            },
          ],
        },
        {
          title: 'JIB apprentice rates — national, from 5 January 2026',
          icon: DollarSign,
          content: [
            { term: 'Stage 1', detail: '£8.16 per hour.' },
            { term: 'Stage 2', detail: '£10.60 per hour.' },
            { term: 'Stage 3', detail: '£13.05 per hour.' },
            { term: 'Stage 4', detail: '£14.03 per hour.' },
            {
              term: 'London rates',
              detail:
                'Higher for work falling within the JIB London Zone: Stage 1 £9.14, Stage 2 £11.88, Stage 3 £14.62, Stage 4 £15.72 per hour.',
            },
          ],
        },
        {
          title: 'Progression out of the grade',
          icon: TrendingUp,
          content: [
            {
              term: 'Typical duration',
              detail:
                'Around four years, moving through the stages as you progress rather than automatically with time served.',
            },
            {
              term: 'Adults with prior experience',
              detail:
                'Experienced-worker routes can be shorter, but they are assessment-based and generally self-funded rather than paid at apprentice rates.',
            },
            {
              term: 'What comes next',
              detail:
                'Completing the qualification moves you toward the Electrician grade. The JIB also recognises Trainee Electrician stages, which sit above apprentice rates and below Electrician.',
            },
          ],
        },
      ],
      tips: [
        'Check whether your employer is a JIB member. JIB rates are the industry agreement — if your employer is not a member, they are a benchmark to negotiate against rather than an entitlement.',
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description:
            'The published source for every rate on this page, effective 5 January 2026.',
        },
      ],
    },
  },
  {
    id: 'improver-grade',
    title: 'Improver Grade',
    description: 'Post-qualification development level',
    badge: 'Developing',
    icon: TrendingUp,
    color: 'amber',
    // 'Improver' is an informal industry term. The JIB's equivalent graded
    // positions are Trainee Electrician Stages 1-3. Rates from the JIB Handbook
    // 2026 §2, effective 5 Jan 2026. Previous figures (£18-25/hr) were unsourced.
    stats: [
      { label: 'Stage 1', value: '£14.60' },
      { label: 'Stage 3', value: '£17.51' },
    ],
    content: {
      overview:
        '"Improver" is what the industry calls you between finishing the qualification and being treated as a full electrician. The JIB does not use that word — its graded equivalents are Trainee Electrician Stages 1 to 3, which sit above apprentice rates and below the Electrician grade. Rates below are national, effective 5 January 2026.',
      sections: [
        {
          title: 'What the grade covers',
          icon: CheckCircle,
          content: [
            {
              term: 'Qualification largely complete',
              detail:
                'Level 3 and the NVQ done, or close to it, but not yet holding the full card as a qualified electrician.',
            },
            {
              term: 'Working toward the AM2',
              detail:
                'The end-point practical assessment is usually the remaining barrier. Book it as soon as you are ready — drift at this stage is what keeps people on trainee rates for longer than necessary.',
            },
            {
              term: 'Current on BS 7671',
              detail:
                'Competence current to the prevailing amendment, A4:2026 at present.',
            },
            {
              term: 'Valid ECS card',
              detail:
                'Including the health and safety assessment, at the grade your qualifications actually support.',
            },
          ],
        },
        {
          title: 'JIB Trainee Electrician rates — from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'Stage 1 (national)',
              detail:
                '£14.60 transport provided, £15.69 own transport, £13.09 shop employed. The Electrical Labourer grade sits at the same rate.',
            },
            {
              term: 'Stage 2 (national)',
              detail: '£16.54 transport provided, £17.62 own transport, £15.29 shop employed.',
            },
            {
              term: 'Stage 3 (national)',
              detail: '£17.51 transport provided, £18.57 own transport, £16.12 shop employed.',
            },
            {
              term: 'London Zone',
              detail:
                'Stage 1 £16.37, Stage 2 £18.52, Stage 3 £19.55 transport provided, for work under JIB National Working Rule 6.2.',
            },
            {
              term: 'The gap to Electrician',
              detail:
                'Stage 3 at £17.51 against the Electrician rate of £18.38 is under £1 an hour — so the AM2 is worth roughly that, plus everything the full grade unlocks. Finish it.',
            },
          ],
        },
        {
          title: 'Getting out of the grade',
          icon: TrendingUp,
          content: [
            {
              term: 'Typical duration',
              detail:
                'Usually one to two years, though it depends entirely on how quickly you complete assessment rather than on time served.',
            },
            {
              term: 'The milestone that matters',
              detail:
                'Passing the AM2. Everything else at this stage is preparation for it.',
            },
            {
              term: 'Do not settle here',
              detail:
                'Some employers are content to keep capable people on trainee rates indefinitely. If your assessment keeps being deferred, that is a conversation to have — or a reason to move.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description: 'Published source for every rate on this page.',
        },
      ],
    },
  },
  {
    id: 'electrician-grade',
    title: 'Electrician (Gold Card)',
    description: 'Fully qualified with industry-wide recognition',
    badge: 'Qualified',
    icon: Award,
    color: 'amber',
    // Rates quoted from the JIB Handbook 2026, Section 2, effective 5 Jan 2026.
    // Previous figures (£26-35/hr, £240-380/day, '+15-25%' London) were
    // unsourced and did not correspond to any published JIB rate.
    stats: [
      { label: 'JIB national', value: '£18.38' },
      { label: 'JIB London', value: '£20.58' },
    ],
    content: {
      overview:
        'This is the fully qualified grade. The JIB rates below are the published national minimum for employed operatives under the industry agreement, effective 5 January 2026 — they are a floor, not a ceiling. Self-employed, agency and specialist day rates are negotiated and vary widely by region, sector and client, so check what is actually being advertised where you work rather than assuming a figure.',
      sections: [
        {
          title: 'What the grade requires',
          icon: CheckCircle,
          content: [
            {
              term: 'Level 3 qualification and NVQ',
              detail:
                'The full Level 3 qualification including the NVQ portfolio of assessed workplace evidence.',
            },
            {
              term: 'AM2 end-point assessment',
              detail:
                'The practical assessment covering installation, inspection and testing, and fault diagnosis under timed conditions.',
            },
            {
              term: 'Current wiring regulations',
              detail:
                'BS 7671 competence current to the prevailing amendment — A4:2026 is the current baseline. Update courses exist and being out of date is immediately visible on your certificates.',
            },
            {
              term: 'Valid ECS card',
              detail:
                'Including the health and safety assessment. Most commercial and industrial sites will refuse entry without it.',
            },
          ],
        },
        {
          title: 'JIB rates — Electrician grade, from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'National — transport provided',
              detail: '£18.38 per hour.',
            },
            {
              term: 'National — own transport',
              detail:
                '£19.54 per hour, where you provide your own transport to site.',
            },
            {
              term: 'National — shop employed',
              detail: '£16.95 per hour.',
            },
            {
              term: 'London Zone',
              detail:
                '£20.58 transport provided, £21.89 own transport, £19.00 shop employed, for work falling within JIB National Working Rule 6.2.',
            },
            {
              term: 'These are minimums',
              detail:
                'JIB rates bind member employers as a floor. Many pay above them, and self-employed or agency rates are a separate market entirely — treat the JIB figure as your negotiating baseline, not the going rate.',
            },
          ],
        },
        {
          title: 'What the grade opens up',
          icon: Star,
          content: [
            {
              term: 'Working independently',
              detail:
                'Taking a job from start to finish, including testing and certifying your own work.',
            },
            {
              term: 'Site access UK-wide',
              detail:
                'The card scheme is recognised nationally, so you are not tied to one employer or region.',
            },
            {
              term: 'Route to self-employment',
              detail:
                'Qualification plus experience is the entry point to working for yourself, with the insurance and scheme registration that implies.',
            },
            {
              term: 'Domestic notification',
              detail:
                'Joining a competent-person scheme lets you self-certify notifiable domestic work under Part P rather than notifying building control each time.',
            },
            {
              term: 'Toward Approved',
              detail:
                'The next JIB grade requires supervisory responsibility as well as technical competence — start gathering that evidence before you apply.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description: 'Published source for every rate on this page.',
        },
      ],
    },
  },
  {
    id: 'approved-grade',
    title: 'Approved Electrician',
    description: 'Enhanced with inspection & testing competence',
    badge: 'Senior',
    icon: CheckCircle,
    color: 'amber',
    stats: [
      { label: 'JIB national', value: '£20.08' },
      { label: 'JIB London', value: '£22.48' },
    ],
    content: {
      overview:
        'Approved Electrician recognises competence beyond installation — inspection and testing, and taking responsibility for other people\'s work. It is the grade where supervision starts to be part of what you are paid for. Rates below are the published JIB minimums effective 5 January 2026.',
      sections: [
        {
          title: 'What the grade requires',
          icon: CheckCircle,
          content: [
            {
              term: 'Everything the Electrician grade needs',
              detail:
                'Full Level 3 qualification, NVQ, AM2 and a valid ECS card as the baseline.',
            },
            {
              term: 'Inspection and testing competence',
              detail:
                'A recognised inspection and testing qualification is the practical gateway. Check the current unit reference with the awarding body rather than relying on a code you saw quoted — they get renumbered.',
            },
            {
              term: 'Post-qualification experience',
              detail:
                'Time working as a qualified electrician on installations of real complexity, evidenced rather than asserted.',
            },
            {
              term: 'Responsibility for others',
              detail:
                'The distinguishing feature of the grade. Supervising other operatives — and note the JIB is explicit that supervising apprentices or trainees does not by itself count for responsibility money.',
            },
            {
              term: 'Current with amendments',
              detail:
                'BS 7671 competence current to A4:2026, plus ongoing CPD.',
            },
          ],
        },
        {
          title: 'JIB rates — Approved Electrician, from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'National — transport provided',
              detail: '£20.08 per hour.',
            },
            {
              term: 'National — own transport',
              detail: '£21.19 per hour.',
            },
            {
              term: 'National — shop employed',
              detail: '£18.61 per hour.',
            },
            {
              term: 'London Zone',
              detail:
                '£22.48 transport provided, £23.73 own transport, £20.83 shop employed.',
            },
            {
              term: 'Responsibility money on top',
              detail:
                'Approved Electricians in charge of work who supervise other operatives are paid responsibility money in addition to the hourly rate — a band set by the JIB National Board, most recently raised to not less than 50p and not more than £2 per hour. It is enhanced by overtime and shift premiums.',
            },
          ],
        },
        {
          title: 'Where it leads',
          icon: TrendingUp,
          content: [
            {
              term: 'Technician grade',
              detail:
                'The next graded step, carrying the highest published JIB operative rate.',
            },
            {
              term: 'Qualified Supervisor',
              detail:
                'Competent-person schemes require a nominated qualified supervisor. Holding that role is what lets a business self-certify its own work.',
            },
            {
              term: 'Inspection and testing as a specialism',
              detail:
                'Periodic inspection and EICR work is driven by landlord and workplace duties, which makes it some of the most recession-resistant work available.',
            },
            {
              term: 'Management or your own business',
              detail:
                'Supervisory competence at this grade is the usual bridge into contracts management or running your own firm.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description: 'Published source for every rate on this page.',
        },
      ],
    },
  },
  {
    id: 'technician-grade',
    title: 'Technician Electrician',
    description: 'Advanced technical and design competence',
    badge: 'Technical',
    icon: Settings,
    color: 'amber',
    // Rates from JIB Handbook 2026 §2, effective 5 Jan 2026. Previous figures
    // (£32-44/hr, £300-450/day) were unsourced and well above any JIB rate.
    stats: [
      { label: 'JIB national', value: '£22.70' },
      { label: 'JIB London', value: '£25.47' },
    ],
    content: {
      overview:
        'Technician is the highest graded operative position the JIB publishes a rate for. The work moves toward design, commissioning and technical leadership rather than installation, and the responsibility rises accordingly.',
      sections: [
        {
          title: 'What the grade requires',
          icon: CheckCircle,
          content: [
            {
              term: 'Approved Electrician as the baseline',
              detail:
                'You are building on the grade below, including its inspection and testing competence and supervisory responsibility.',
            },
            {
              term: 'Design competence',
              detail:
                'Producing designs rather than installing them — load assessment, cable calculation, protection and discrimination. Often underpinned by HNC/HND-level study or a recognised design qualification.',
            },
            {
              term: 'Commissioning ability',
              detail:
                'Bringing systems into service and proving they perform as designed. This is where the technical grades earn their difference on complex projects.',
            },
            {
              term: 'Substantial experience',
              detail:
                'Years of advanced work, evidenced. Check the current unit references for any design qualification with the awarding body — codes get renumbered and quoting an old one dates you.',
            },
          ],
        },
        {
          title: 'JIB rates — Technician, from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'National — transport provided',
              detail:
                '£22.70 per hour. This grade also covers Mechanical Technician and Cable Installation Supervisor.',
            },
            {
              term: 'National — own transport',
              detail: '£23.87 per hour.',
            },
            {
              term: 'National — shop employed',
              detail: '£21.24 per hour.',
            },
            {
              term: 'London Zone',
              detail:
                '£25.47 transport provided, £26.70 own transport, £23.79 shop employed.',
            },
            {
              term: 'What the market pays above this',
              detail:
                'JIB rates are employed minimums. Contract, agency and specialist commissioning roles are negotiated separately and are not covered by the agreement — check live listings rather than assuming a premium.',
            },
          ],
        },
        {
          title: 'What the role involves',
          icon: Zap,
          content: [
            {
              term: 'Designing installations',
              detail:
                'Taking responsibility for the design itself, which is a materially different liability from installing to someone else\'s drawing. Keep your calculations.',
            },
            {
              term: 'Commissioning complex systems',
              detail:
                'Proving performance, resolving what does not work, and documenting it so the client can operate and maintain the system.',
            },
            {
              term: 'Being the technical escalation',
              detail:
                'The person other electricians come to when the obvious answers have run out.',
            },
            {
              term: 'Dealing with clients and consultants',
              detail:
                'Explaining technical decisions to designers, main contractors and clients — the communication side becomes as important as the engineering.',
            },
          ],
        },
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description: 'Published source for every rate on this page.',
        },
      ],
    },
  },
  {
    id: 'supervisor-grade',
    title: 'Supervisor Grade',
    description: 'Management and leadership responsibilities',
    badge: 'Management',
    icon: Users,
    color: 'amber',
    // The JIB graded-operative scale tops out at Technician; supervisory and
    // management roles sit outside the agreement and are individually
    // negotiated. Previous figures (£38-52/hr, £58-85k salary) were unsourced.
    stats: [{ label: 'Outside', value: 'JIB scale' }],
    content: {
      overview:
        'Supervision is where you stop being paid for your own output and start being paid for other people\'s. Note that the JIB\'s published operative rates stop at Technician — site management and contracts roles sit outside the graded scale and are negotiated individually, so there is no published rate to point at. What follows is the competence, not a price list.',
      sections: [
        {
          title: 'What the role requires',
          icon: CheckCircle,
          content: [
            {
              term: 'Technical grade underneath it',
              detail:
                'Approved or Technician competence. Supervising work you could not do yourself is a difficult position to hold on a site.',
            },
            {
              term: 'Site supervision certification',
              detail:
                'SSSTS for supervisors and SMSTS for managers are the standard site safety qualifications, and most principal contractors require them explicitly before you can hold the role.',
            },
            {
              term: 'Health and safety competence',
              detail:
                'IOSH Managing Safely or NEBOSH General Certificate. Once you supervise, safety failures become your responsibility as well as the operative\'s.',
            },
            {
              term: 'First aid',
              detail:
                'Commonly required, and frequently the practical reason a supervisor is needed on a small site at all.',
            },
            {
              term: 'Evidence of leading people',
              detail:
                'Demonstrated responsibility for others\' work, not just seniority. This is what assessors and employers actually probe.',
            },
          ],
        },
        {
          title: 'How supervisory work is paid',
          icon: DollarSign,
          content: [
            {
              term: 'Not covered by the JIB operative rates',
              detail:
                'The published JIB scale ends at Technician (£22.70 national, £25.47 London). Supervisor and manager positions are staff roles negotiated individually — treat any single quoted figure with suspicion.',
            },
            {
              term: 'Responsibility money is the graded equivalent',
              detail:
                'Within the operative scale, an Approved Electrician in charge of work receives responsibility money of 50p to £2 per hour on top of the rate. That is the JIB\'s mechanism for supervision, and it is worth knowing about before you accept "supervisor" as a title with no uplift.',
            },
            {
              term: 'Where the market sits',
              detail:
                'ONS ASHE 2025 puts the 90th percentile for electricians and electrical fitters at £57,786 gross annual for full-time employees. Senior supervisory roles typically sit in that upper part of the distribution rather than beyond it.',
            },
            {
              term: 'Check what the title actually buys',
              detail:
                'A supervisor title with no rate change and added liability is a demotion in everything but name. Establish the uplift before accepting the responsibility.',
            },
          ],
        },
        {
          title: 'Responsibilities',
          icon: Zap,
          content: [
            'Site safety management',
            'Team coordination and planning',
            'Quality control and reporting',
            'Client communication',
            'Budget oversight',
          ],
        },
      ],
    },
  },
];

// ==========================================
// REGIONAL MARKETS ITEMS
// ==========================================

const regionalMarketsItems: ContentItem[] = [
  {
    id: 'regions-overview',
    title: 'UK Regions Overview',
    description: 'National picture of electrical job markets',
    badge: 'Overview',
    icon: MapPin,
    color: 'red',
    // '250k+ jobs' had no source. ONS ASHE 2025 samples ~97,000 EMPLOYEE jobs
    // in SOC 5241 — that excludes the self-employed, who are a large share of
    // the trade, so it is a floor for employees rather than a workforce total.
    stats: [{ label: 'ONS employees', value: '~97k' }],
    content: {
      overview:
        'Pay and demand vary by region, but less formally than people assume: the JIB operates one national rate and one London Zone rate, with no sliding regional scale. What genuinely differs by region is the mix of work available — and that is what should shape your specialism.',
      sections: [
        {
          // '+25-35%' and '+15-25%' regional premiums removed — invented. The
          // JIB differential is a single London Zone rate, ~12% above national.
          title: 'How pay actually varies',
          icon: DollarSign,
          content: [
            {
              term: 'One London uplift, about 12%',
              detail:
                'The JIB London Zone rate runs roughly 12% above national at every grade — Electrician £20.58 against £18.38. There is no separate South East or major-city scale.',
            },
            {
              term: 'It is a defined zone',
              detail:
                'The London rate applies to work falling within JIB National Working Rule 6.2, not to the South East generally. Outside it, national rates apply regardless of city.',
            },
            {
              term: 'The real variation is the work mix',
              detail:
                'What differs between regions is which sectors are hiring, not a regional pay multiplier. Earnings follow sector, overtime and specialism far more than postcode.',
            },
            {
              term: 'Test it against your costs',
              detail:
                'If living costs are more than about 12% higher where the work is, the London rate leaves you worse off in real terms. Housing is the number that decides it.',
            },
          ],
        },
        {
          title: 'What each part of the UK tends to offer',
          icon: TrendingUp,
          content: [
            {
              term: 'London and the South East',
              detail:
                'Commercial fit-out, building controls and data centres, plus retrofit driven by older, denser housing stock and limited off-street parking.',
            },
            {
              term: 'The Midlands and the North',
              detail:
                'Manufacturing, industrial maintenance, automation and large logistics buildings. Less price-shopped than domestic work and it rewards fault-finding.',
            },
            {
              term: 'Scotland and Wales',
              detail:
                'Generation, grid reinforcement and rural work, with heat pumps a natural fit for properties off the gas network. Often travel or rotational working.',
            },
            {
              term: 'Rural areas anywhere',
              detail:
                'Longer distances change the economics — travel time, van stock and getting it right first time matter more than they do in a city.',
            },
          ],
        },
      ],
      tips: [
        'Check what local agencies are actually advertising before committing to a specialism. A specialism with no local market is an expensive hobby.',
      ],
    },
  },
  {
    id: 'wage-bands',
    title: 'JIB Wage Bands & Allowances',
    description: 'Official rates and regional adjustments',
    badge: 'Pay Rates',
    icon: DollarSign,
    color: 'red',
    // Every figure below is quoted from the JIB Handbook 2026, Section 2
    // (National Working Rules), effective Monday 5 January 2026, plus ONS ASHE
    // 2025 for market earnings. The previous content on this page was labelled
    // 'JIB-aligned' but matched no published rate, and invented percentage
    // 'regional premiums' that the JIB does not operate — there is one London
    // Zone rate, not a tiered regional scale.
    stats: [
      { label: 'Effective', value: '5 Jan 2026' },
      { label: 'Grades', value: '6' },
    ],
    content: {
      overview:
        'These are the published JIB rates, effective 5 January 2026. They are minimums binding on JIB member employers — a floor to negotiate from, not the going rate, and they do not apply if your employer is not a JIB member. Each grade has three rates depending on how you get to site.',
      sections: [
        {
          title: 'National standard rates — hourly, from 5 January 2026',
          icon: DollarSign,
          content: [
            {
              term: 'Technician',
              detail:
                '£22.70 transport provided · £23.87 own transport · £21.24 shop employed. Covers Site/Installation Technician, Mechanical Technician and Cable Installation Supervisor.',
            },
            {
              term: 'Approved Electrician',
              detail:
                '£20.08 · £21.19 · £18.61. Also covers Advanced Craftsperson, Cable Foreman and Approved Jointer.',
            },
            {
              term: 'Electrician',
              detail:
                '£18.38 · £19.54 · £16.95. Includes Domestic Electrician, Craftsperson, Jointer and ECS Experienced Worker cardholders.',
            },
            {
              term: 'Trainee Electrician',
              detail:
                'Stage 3 £17.51 · Stage 2 £16.54 · Stage 1 £14.60 (transport provided). Electrical Labourer and Cable Hand sit at the Stage 1 rate.',
            },
            {
              term: 'Apprentice',
              detail:
                'Stage 1 £8.16 · Stage 2 £10.60 · Stage 3 £13.05 · Stage 4 £14.03. A single rate now covers all hours including off-the-job learning — the separate lower "At College" rate was removed for England, Wales and Northern Ireland.',
            },
          ],
        },
        {
          title: 'London Zone rates — hourly, from 5 January 2026',
          icon: MapPin,
          content: [
            {
              term: 'How it works',
              detail:
                'There is one London rate, applying to work falling within JIB National Working Rule 6.2 — not a sliding regional scale. Outside the London Zone the national rate applies regardless of city.',
            },
            {
              term: 'Technician',
              detail: '£25.47 transport provided · £26.70 own transport · £23.79 shop employed.',
            },
            {
              term: 'Approved Electrician',
              detail: '£22.48 · £23.73 · £20.83.',
            },
            {
              term: 'Electrician',
              detail: '£20.58 · £21.89 · £19.00 — about £2.20 an hour above the national rate.',
            },
            {
              term: 'Trainees and apprentices',
              detail:
                'Trainee Stage 3 £19.55 · Stage 2 £18.52 · Stage 1 £16.37. Apprentice Stage 1 £9.14 · Stage 2 £11.88 · Stage 3 £14.62 · Stage 4 £15.72.',
            },
          ],
        },
        {
          title: 'Allowances and additions',
          icon: Star,
          content: [
            {
              term: 'Responsibility money',
              detail:
                'Paid on top of the hourly rate to Approved Electricians in charge of work who supervise other operatives — not less than 50p and not more than £2 per hour, and enhanced by overtime and shift premiums. Supervising apprentices or trainees does not by itself qualify.',
            },
            {
              term: 'Lodging allowance',
              detail: '£53.09 per night where you are required to stay away.',
            },
            {
              term: 'Holiday retention',
              detail:
                'Up to £17.46 per night, capped at £122.22 per week. Weekend retention is £53.09 per night.',
            },
            {
              term: 'Overtime and shift premiums',
              detail:
                'The first 37½ hours in a pay week are at the normal hourly rate; premium rates apply beyond that and for work before 7.00 am or after 7.00 pm.',
            },
            {
              term: 'Transport category matters',
              detail:
                'The difference between "transport provided" and "own transport" is about £1.15 an hour at Electrician grade — roughly £2,240 a year over a 37½-hour week. Check which category you are actually being paid under.',
            },
          ],
        },
        {
          title: 'What the market actually pays',
          icon: BarChart3,
          content: [
            {
              term: 'ONS median earnings',
              detail:
                'ONS ASHE 2025 (provisional) puts median gross annual pay for electricians and electrical fitters at £39,647 for full-time employees, from a sample of about 91,000 jobs. Mean is £41,190 — higher than median, which tells you the top of the distribution pulls away.',
            },
            {
              term: 'The spread is wide',
              detail:
                'The same ONS data shows the 10th percentile at £24,538 and the 90th at £57,786 for full-time. Where you sit depends far more on sector, region and specialism than on years served.',
            },
            {
              term: 'Why ONS exceeds the JIB rate',
              detail:
                'JIB rates are contractual minimums for a 37½-hour week. Actual earnings include overtime, shift premiums, responsibility money and allowances — which is why the survey median sits above the headline rate.',
            },
            {
              term: 'Self-employed is a different market',
              detail:
                'Day rates for self-employed and agency work are negotiated and fall outside the JIB agreement entirely. Anyone quoting you a single national day rate is guessing.',
            },
          ],
        },
      ],
      tips: [
        'Check whether your employer is a JIB member. If they are, these are entitlements; if not, they are the benchmark you negotiate against.',
        'Confirm which transport category you are paid under — it is worth over £2,000 a year at Electrician grade and it is the easiest thing to get quietly wrong.',
      ],
      resources: [
        {
          title: 'JIB Handbook — Section 2, National Working Rules',
          url: 'https://www.jib.org.uk/handbook/national-working-rules/',
          description:
            'The published source for every JIB rate on this page, effective 5 January 2026.',
        },
        {
          title: 'ONS — Annual Survey of Hours and Earnings',
          url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2025',
          description:
            'Official earnings statistics. Electricians are SOC 5241 in Table 14.',
        },
      ],
    },
  },
  {
    id: 'demand-hotspots',
    title: 'Demand Hotspots & Cities',
    description: 'Where the jobs are concentrated',
    badge: 'Hot Spots',
    icon: TrendingUp,
    color: 'red',
    // '40,000+ electricians in London' and '20+ cities' removed — unsourced.
    stats: [{ label: 'Patterns', value: '3' }],
    content: {
      overview:
        'Work concentrates wherever buildings are going up, being maintained at scale, or being connected to the grid. Rather than a league table of cities that dates quickly, it is more useful to recognise the patterns — then apply them to wherever you are.',
      sections: [
        {
          title: 'What creates concentrated demand',
          icon: Building,
          content: [
            {
              term: 'Dense commercial property',
              detail:
                'Cities with large office and retail stock generate constant refurbishment and fit-out, independent of whether anything new is being built.',
            },
            {
              term: 'Manufacturing and logistics',
              detail:
                'Industrial centres and distribution corridors need installation and ongoing maintenance. Steadier and less price-shopped than domestic work.',
            },
            {
              term: 'Large institutions',
              detail:
                'Universities, hospitals and government estates run continuous maintenance and upgrade programmes, and frequently employ electricians directly.',
            },
            {
              term: 'Grid and generation',
              detail:
                'Where connection capacity and generation projects concentrate, so does electrical infrastructure work — often rural rather than urban.',
            },
          ],
        },
        {
          title: 'Where the newer clusters form',
          icon: TrendingUp,
          content: [
            {
              term: 'Data centre corridors',
              detail:
                'These cluster around power availability and connectivity rather than population, which is why they appear in places with no other obvious draw.',
            },
            {
              term: 'Logistics parks',
              detail:
                'Large-footprint distribution buildings need high-bay lighting, extensive containment and increasingly fleet charging — big, repeatable packages.',
            },
            {
              term: 'Research and science parks',
              detail:
                'Laboratory and clean-room work carries higher specification and tighter tolerances than ordinary commercial fit-out.',
            },
            {
              term: 'Retrofit programmes',
              detail:
                'Social housing and public estate upgrades are awarded as multi-year contracts and are far less exposed to the economic cycle than new build.',
            },
          ],
        },
        {
          title: 'Infrastructure Hotspots',
          icon: Zap,
          content: [
            'HS2 route: West Midlands to London',
            'Nuclear sites: Somerset, Suffolk',
            'Wind farms: North East, Scotland',
            'Data corridors: London to Cambridge',
          ],
        },
      ],
    },
  },
  {
    id: 'apprenticeships-providers',
    title: 'Apprenticeships & Training Providers',
    description: 'Regional training options and providers',
    badge: 'Training',
    icon: GraduationCap,
    color: 'red',
    // Corrected: SELECT was listed as a London body — it is the Scottish trade
    // association. Interserve was named as a current employer programme despite
    // entering administration in 2019. Unsourced counts ('100+', '15k+') removed.
    stats: [{ label: 'Routes', value: '3' }],
    content: {
      overview:
        'The provider matters less than the employer — an apprenticeship is a job with training attached, and you need the job first. Provider names and programmes change, so treat any list as a starting point and confirm what is currently running near you.',
      sections: [
        {
          title: 'Where apprenticeships are delivered',
          icon: GraduationCap,
          content: [
            {
              term: 'Specialist electrical providers',
              detail:
                'JTL is the long-established electrical apprenticeship provider across England and Wales, and is a JIB partner. Specialist providers understand the trade and the end-point assessment in a way general colleges sometimes do not.',
            },
            {
              term: 'Scotland',
              detail:
                'SECTT — the Scottish Electrical Charitable Training Trust — manages electrical apprenticeships in Scotland, which runs on its own framework rather than the English standard.',
            },
            {
              term: 'FE colleges',
              detail:
                'Regional further education colleges deliver the classroom element, and many also run full-time diplomas for people who cannot find an employer. Quality and placement support vary a lot — ask specific questions before enrolling.',
            },
            {
              term: 'Industry body training',
              detail:
                'Trade associations and scheme providers run short courses and updates rather than full apprenticeships. Useful for CPD, not an entry route.',
            },
          ],
        },
        {
          title: 'Getting the place',
          icon: MapPin,
          content: [
            {
              term: 'You need an employer',
              detail:
                'Providers deliver the training; an employer has to take you on. Applying to a provider without an employer is the most common reason people stall before starting.',
            },
            {
              term: 'Approach contractors directly',
              detail:
                'Most small and regional firms never advertise apprenticeships. Turning up with a CV and asking is unfashionable and it works.',
            },
            {
              term: 'Be willing to travel',
              detail:
                'Widening your radius by twenty miles dramatically increases the number of employers you can reach, especially outside cities.',
            },
            {
              term: 'Check what you finish with',
              detail:
                'Confirm the exact qualification, whether the end-point assessment is included, and which card it entitles you to. Ask the provider to put it in writing.',
            },
          ],
        },
        {
          title: 'Employer-run programmes',
          icon: Building,
          content: [
            'Large M&E contractors often run their own academies with structured intakes',
            'Distribution network operators and utilities take on apprentices for their own networks',
            'Manufacturers run technical training, usually for people already in the trade',
            'Public sector estates — councils, NHS trusts, universities — quietly train their own and rarely advertise where trades look',
          ],
        },
      ],
    },
  },
  {
    id: 'cost-of-living',
    title: 'Cost of Living & Travel',
    description: 'Balancing pay with regional costs',
    badge: 'Cost Analysis',
    icon: DollarSign,
    color: 'red',
    // Regional cost percentages ('+40-50%', '-15-20%' etc.) removed — no source.
    // Replaced with the JIB London differential, which is derived from published
    // rates and gives the reader a real threshold to test their own costs against.
    stats: [{ label: 'JIB London uplift', value: '~12%' }],
    content: {
      overview:
        'A higher rate is not a higher income if it costs more to live there. The useful question is not "does London pay more" but "does it pay more than it costs me" — and the JIB rates give you a hard number to test that against.',
      sections: [
        {
          title: 'What the London premium actually is',
          icon: Building,
          content: [
            {
              term: 'About 12% under the JIB',
              detail:
                'The London Zone rate is roughly 12% above national at every grade — Electrician £20.58 against £18.38, Approved £22.48 against £20.08, Technician £25.47 against £22.70. It is remarkably consistent across the scale.',
            },
            {
              term: 'That is your break-even test',
              detail:
                'If rent, travel and everyday costs are more than about 12% higher where the work is, the London rate leaves you worse off in real terms. Work it out with your own numbers rather than assuming.',
            },
            {
              term: 'It is a zone, not a region',
              detail:
                'The London rate applies to work falling within JIB National Working Rule 6.2 — not to the South East generally. Outside that zone the national rate applies regardless of which city you are in.',
            },
            {
              term: 'Housing is the variable that matters',
              detail:
                'For most electricians, rent or mortgage swamps every other regional cost difference. Compare that first; the price of a pint is noise by comparison.',
            },
          ],
        },
        {
          title: 'Counting the real cost of getting there',
          icon: MapPin,
          content: [
            {
              term: 'Transport category is worth real money',
              detail:
                'Own transport pays about £1.15/hour more than transport provided at Electrician grade — roughly £2,240 a year. But you are then funding the vehicle, fuel, insurance and maintenance out of it.',
            },
            {
              term: 'Lodging allowance',
              detail:
                'Where you are required to stay away, the JIB lodging allowance is £53.09 per night, with weekend retention at the same rate and holiday retention up to £17.46 per night (£122.22 weekly). Check what accommodation actually costs before accepting distant work.',
            },
            {
              term: 'Unpaid travel time',
              detail:
                'Two hours a day commuting is ten hours a week you are not paid for. Against a 37½-hour week that is a substantial effective pay cut nobody puts on the offer.',
            },
            {
              term: 'Rural distances',
              detail:
                'Longer gaps between jobs change the economics — travel time, stock carried in the van, and getting it right first time all matter more than they do in a city.',
            },
          ],
        },
        {
          title: 'Travel Considerations',
          icon: TrendingUp,
          content: [
            'Commuting costs can be significant',
            'LOA (lodging allowance) for travel work',
            'Van/fuel costs for self-employed',
            'Time value of commute',
          ],
        },
      ],
    },
  },
  {
    id: 'compliance-practice',
    title: 'Compliance & Best Practice',
    description: 'Regional regulatory considerations',
    badge: 'Compliance',
    icon: Shield,
    color: 'red',
    stats: [{ label: 'Jurisdictions', value: '4' }],
    content: {
      overview:
        'BS 7671 is the technical standard across the whole UK — but how you are permitted to certify and notify work is devolved, and it differs. Electricians who move across a border, or take on work in another nation, are the ones who get caught out.',
      sections: [
        {
          title: 'The standard versus the law',
          icon: CheckCircle,
          content: [
            {
              term: 'BS 7671 applies UK-wide',
              detail:
                'The wiring regulations are the same technical standard everywhere, currently 2018 as amended by A4:2026. What differs is the legal framework that sits on top of it.',
            },
            {
              term: 'England and Wales — Part P',
              detail:
                'Electrical work in dwellings falls under Part P of the Building Regulations. Certain work is notifiable, and joining a competent-person scheme is what lets you self-certify instead of notifying building control in advance and paying each time.',
            },
            {
              term: 'Scotland works differently',
              detail:
                'There is no Part P. Work falls under the Building (Scotland) Regulations, where a building warrant may be required from the local authority before work starts. Assuming your English scheme membership lets you self-certify in Scotland is a common and expensive mistake.',
            },
            {
              term: 'Northern Ireland',
              detail:
                'Has its own Building Regulations and its own notification arrangements. Check them specifically rather than assuming the English position applies.',
            },
            {
              term: 'Non-dwelling work',
              detail:
                'Part P covers dwellings. Commercial and industrial installations are governed by other duties — including the Electricity at Work Regulations 1989, which apply to workplaces across the UK.',
            },
          ],
        },
        {
          title: 'Schemes and bodies',
          icon: Building,
          content: [
            {
              term: 'Competent-person schemes',
              detail:
                'The route to self-certifying notifiable domestic work in England and Wales. Membership costs money annually and requires assessment — compare what each scheme actually gives you before joining.',
            },
            {
              term: 'Certification in Scotland',
              detail:
                'Scotland operates approved certifier of construction arrangements for electrical installations rather than Part P self-certification. Different scheme, different requirements.',
            },
            {
              term: 'The ECS card scheme',
              detail:
                'Administered by the JIB and recognised UK-wide. This is your site access and proof of qualification wherever you work.',
            },
            {
              term: 'Trade associations',
              detail:
                'Bodies such as the ECA, and SELECT in Scotland, represent contractors commercially. Distinct from a competent-person scheme — membership of one is not membership of the other.',
            },
          ],
        },
        {
          title: 'Best Practice',
          icon: Star,
          content: [
            'Join relevant regional association',
            'Understand local authority requirements',
            'Build relationships with building control',
            'Stay current with regional updates',
          ],
        },
      ],
    },
  },
  {
    id: 'key-employers',
    title: 'Key Employers & Projects',
    description: 'Major employers by region',
    badge: 'Employers',
    icon: Building,
    color: 'red',
    // Named-company list removed: it dates quickly, hiring status could not be
    // verified, and it included a stale reference to 'Crossrail completion' —
    // the Elizabeth line has been open since 2022. Reframed around types of
    // employer and how to find current ones, which stays true.
    stats: [{ label: 'Employer types', value: '4' }],
    content: {
      overview:
        'Rather than a list of company names that goes out of date, it is more useful to understand the kinds of employer that exist and how each hires — because they recruit in completely different ways and want different things from you.',
      sections: [
        {
          title: 'Who employs electricians',
          icon: Building,
          content: [
            {
              term: 'Large M&E contractors',
              detail:
                'National building-services firms delivering the electrical package on major projects. Structured, well-paid, heavily proceduralised, and they generally want card grade, site tickets and a clean record before anything else.',
            },
            {
              term: 'Regional and local contractors',
              detail:
                'The bulk of employment. Smaller teams, more varied work, and hiring that happens through word of mouth far more often than through adverts — which is why the wholesaler counter matters.',
            },
            {
              term: 'Facilities management',
              detail:
                'Maintaining buildings under long contracts. Employed roles with regular hours, holiday and pension, usually a lower headline rate than contracting, and often an on-call rota.',
            },
            {
              term: 'End clients directly',
              detail:
                'Hospitals, universities, councils, manufacturers and data centre operators employ their own electricians. Overlooked, frequently the best conditions, and rarely advertised where trades look.',
            },
          ],
        },
        {
          title: 'Where the big work is',
          icon: Zap,
          content: [
            {
              term: 'Infrastructure programmes',
              detail:
                'Rail, nuclear, water and grid reinforcement run for years and take on large numbers of electricians. Expect extensive inductions, strict procedure and often travel or staying away.',
            },
            {
              term: 'Data centres',
              detail:
                'Concentrated in specific corridors rather than spread nationally. Resilient power, critical uptime and a lot of out-of-hours working inside shutdown windows.',
            },
            {
              term: 'Energy generation and storage',
              detail:
                'Solar farms, battery storage and grid connections. Often rural, often rotational, and requiring site-specific safety training on top of your electrical competence.',
            },
            {
              term: 'Retrofit at scale',
              detail:
                'Social housing and public estate upgrade programmes — heating, insulation and rewiring — awarded as multi-year contracts. Steadier than new build and less exposed to the economic cycle.',
            },
          ],
        },
        {
          title: 'How to actually find them',
          icon: TrendingUp,
          content: [
            {
              term: 'Approach directly',
              detail:
                'Most regional contractors never advertise. A phone call or a visit with your card and qualifications works better than any portal, and almost nobody does it.',
            },
            {
              term: 'Follow the projects',
              detail:
                'Planning applications and construction press tell you what is starting near you before the recruitment does. The electrical package is subcontracted months ahead.',
            },
            {
              term: 'Ask the wholesaler',
              detail:
                'Counter staff know which firms are busy, which are hiring and which are slow paying. It is the best-informed and least-used source in the trade.',
            },
            {
              term: 'Check the tier below',
              detail:
                'Named principal contractors rarely employ the electricians directly — the work sits with their M&E subcontractors. Find out who holds the package rather than applying to the household name.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'agencies-job-boards',
    title: 'Agencies & Job Boards',
    description: 'Finding work across UK regions',
    badge: 'Job Search',
    icon: Users,
    color: 'red',
    stats: [
      { label: 'Focus', value: 'Job search' },
    ],
    content: {
      overview:
        'Job boards are where the work that could not be filled by word of mouth ends up. That does not make them useless — but it does mean the best jobs are often gone before they appear, which is why direct approaches matter more in this trade than in most.',
      sections: [
        {
          title: 'Using agencies well',
          icon: Users,
          content: [
            {
              term: 'Specialist beats general',
              detail:
                'An agency that places electrical and building-services people knows the difference between grades and will not send you to something irrelevant. General recruiters frequently cannot tell an improver from an approved electrician.',
            },
            {
              term: 'Ask who the client is',
              detail:
                'Before agreeing to be put forward, ask which company and which site. Being submitted to the same client by two agencies can rule you out of both.',
            },
            {
              term: 'Understand the pay structure',
              detail:
                'PAYE, umbrella and CIS all take different deductions from the same headline rate. Ask for the take-home figure, not the advertised one — they can differ substantially.',
            },
            {
              term: 'Agencies work for the client',
              detail:
                'They are paid by the employer, not you. Useful and worth using, but do not mistake a recruiter for a career adviser.',
            },
          ],
        },
        {
          title: 'Job boards',
          icon: Laptop,
          content: [
            {
              term: 'The big general boards',
              detail:
                'Highest volume, most competition, and a lot of the same role posted by several agencies at once. Fine for scale, poor for signal.',
            },
            {
              term: 'Set up alerts and act fast',
              detail:
                'Good electrical roles fill quickly. An alert that reaches you the day it posts is worth more than checking weekly.',
            },
            {
              term: 'Read for the requirements',
              detail:
                'Card grade, tickets and qualifications tell you whether it is genuinely open to you. Adverts that are vague about those are often agencies fishing for CVs rather than filling a real vacancy.',
            },
            {
              term: 'Watch for repostings',
              detail:
                'A role advertised continuously for months usually signals turnover, difficult conditions or a rate nobody will accept.',
            },
          ],
        },
        {
          title: 'Direct Routes',
          icon: Building,
          content: [
            'Company careers pages',
            'Industry networking',
            'Trade association job boards',
            'Social media (LinkedIn, Facebook groups)',
          ],
        },
      ],
      resources: [
        {
          title: 'JIB Job Board',
          url: 'https://www.jib.org.uk',
          description: 'Industry-specific listings',
        },
        {
          title: 'ECA Members Directory',
          url: 'https://www.eca.co.uk',
          description: 'Find ECA member contractors',
        },
      ],
    },
  },
];

// ==========================================
// SECTION DEFINITIONS
// ==========================================

export const careerSections: CareerSection[] = [
  {
    id: 'career-overview',
    title: 'Career Overview',
    description: 'Explore career pathways, progression routes, and industry opportunities',
    icon: Compass,
    color: 'yellow',
    previewStat: '114',
    statLabel: 'Points',
    items: careerOverviewItems,
  },
  {
    id: 'skills-development',
    title: 'Skills Development',
    description: 'Build technical expertise and professional capabilities',
    icon: Brain,
    color: 'blue',
    previewStat: '124',
    statLabel: 'Skills',
    items: skillsDevelopmentItems,
  },
  {
    id: 'professional-development',
    title: 'Professional Development',
    description: 'Advance your career through qualifications and certifications',
    icon: Target,
    color: 'green',
    previewStat: '121',
    statLabel: 'Points',
    items: professionalDevelopmentItems,
  },
  {
    id: 'industry-insights',
    title: 'Industry Insights',
    description: 'Market trends, growth areas, and future opportunities',
    icon: BarChart3,
    color: 'purple',
    previewStat: '42',
    statLabel: 'Points',
    items: industryInsightsItems,
  },
  {
    id: 'career-timeline',
    title: 'Career Timeline',
    description: 'Visual progression path from apprentice to senior roles',
    icon: Clock,
    color: 'orange',
    previewStat: '5',
    statLabel: 'Stages',
    items: careerTimelineItems,
  },
  {
    id: 'jib-grades',
    title: 'JIB Grades',
    description: 'Official grading scheme with rates and requirements',
    icon: Award,
    color: 'amber',
    previewStat: '£25.47',
    statLabel: 'Top JIB rate/hr',
    items: jibGradesItems,
  },
  {
    id: 'regional-markets',
    title: 'Regional Markets',
    description: 'UK regional job markets, salaries, and opportunities',
    icon: MapPin,
    color: 'red',
    previewStat: '80',
    statLabel: 'Points',
    items: regionalMarketsItems,
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function getSectionById(id: string): CareerSection | undefined {
  return careerSections.find((section) => section.id === id);
}

export function getItemById(sectionId: string, itemId: string): ContentItem | undefined {
  const section = getSectionById(sectionId);
  return section?.items.find((item) => item.id === itemId);
}
