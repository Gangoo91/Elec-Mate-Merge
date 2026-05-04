import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from '@/components/ui/mobile-accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Target,
  Users,
  GraduationCap,
  Network,
  Lightbulb,
  Globe,
  Smartphone,
  Calendar,
  MessageSquare,
  Rocket,
  Heart,
} from 'lucide-react';

interface DevelopmentArea {
  skill: string;
  description: string;
  developmentPath: string;
  businessImpact: string;
}

interface DevelopmentCategory {
  category: string;
  developmentAreas: DevelopmentArea[];
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
    {children}
  </span>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5">
    {items.map((item, idx) => (
      <li
        key={idx}
        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
      >
        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const DevelopmentBlock = ({ categories }: { categories: DevelopmentCategory[] }) => (
  <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
    {categories.map((category, index) => (
      <div key={index} className="space-y-3">
        <h4 className="text-[16px] text-white pb-1 border-b border-white/[0.06]">
          {category.category}
        </h4>
        <div className="space-y-3">
          {category.developmentAreas.map((area, areaIndex) => (
            <div
              key={areaIndex}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h5 className="text-[14px] text-white">{area.skill}</h5>
              <p className="text-[14px] text-white/85 leading-relaxed">{area.description}</p>
              <div className="space-y-1">
                <Eyebrow>Development path</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed">{area.developmentPath}</p>
              </div>
              <div className="space-y-1">
                <Eyebrow>Business impact</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed">{area.businessImpact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ProfessionalDevelopmentStrategy = () => {
  const isMobile = useIsMobile();

  const developmentMetrics = [
    { metric: 'CPD hours', data: '30 hours annually typical' },
    { metric: 'Networking value', data: 'Increases career opportunities' },
    { metric: 'Mentorship', data: 'Strong career goal achievement rate' },
    { metric: 'Leadership premium', data: 'Higher salaries for management' },
  ];

  const continuingEducation = [
    {
      category: 'Professional qualifications',
      timeline: 'Ongoing development',
      description:
        'Advanced qualifications for career progression and professional recognition.',
      programmes: [
        {
          qualification: 'HNC / HND Electrical Engineering',
          provider: 'Universities and FE colleges',
          duration: '2-3 years part-time',
          cost: '£3,000-6,000',
          careerImpact: 'Supervisory and design roles, foundation for degree study.',
          prerequisites: 'Level 3 qualification and relevant experience.',
        },
        {
          qualification: 'BEng / MEng Electrical Engineering',
          provider: 'Universities (full-time and part-time)',
          duration: '3-6 years',
          cost: '£9,000+ per year',
          careerImpact:
            'Engineering roles, chartered engineer pathway, management positions.',
          prerequisites:
            'A-levels or equivalent, HND for direct entry to year 2 / 3.',
        },
        {
          qualification: 'Project management (APM / PRINCE2)',
          provider: 'Professional training organisations',
          duration: '3-6 months',
          cost: '£2,000-4,000',
          careerImpact:
            'Project leadership roles, contractor management, higher responsibility.',
          prerequisites: 'Relevant experience and employer support.',
        },
      ],
    },
    {
      category: 'Professional certifications',
      timeline: 'Annual renewals',
      description:
        'Industry-specific certifications maintaining professional competence.',
      programmes: [
        {
          qualification: 'IET Professional Registration (IEng / CEng)',
          provider: 'Institution of Engineering and Technology',
          duration: 'Application process 6-12 months',
          cost: '£200-500 application + annual fees',
          careerImpact:
            'Professional recognition, chartered status, enhanced credibility.',
          prerequisites: 'Appropriate qualifications and demonstrated competence.',
        },
        {
          qualification: 'Scheme provider assessment (AP / QS)',
          provider: 'NICEIC, NAPIT, STROMA',
          duration: 'Assessment process 3-6 months',
          cost: '£800-2,000 annually',
          careerImpact:
            'Business development, self-certification rights, customer confidence.',
          prerequisites: 'Relevant qualifications and business registration.',
        },
        {
          qualification: 'Specialist manufacturer certifications',
          provider: 'Equipment manufacturers',
          duration: '1-5 days per course',
          cost: '£500-2,000 per certification',
          careerImpact:
            'Specialist installation rights, warranty approvals, premium rates.',
          prerequisites: 'Basic electrical qualifications and experience.',
        },
      ],
    },
  ];

  const networkingStrategy = [
    {
      strategy: 'Professional bodies engagement',
      timeCommitment: '2-4 hours monthly',
      description:
        'Active participation in professional institutions and trade organisations.',
      activities: [
        'Join IET local network and attend monthly meetings',
        'Participate in SELECT or ECA regional events and workshops',
        'Attend annual conferences and exhibition visits',
        'Volunteer for committee roles and working groups',
      ],
      careerBenefits:
        'Industry insights, technical updates, career opportunities, professional credibility.',
      networkingValue:
        'Connect with senior professionals, potential employers, and industry leaders.',
      costs: '£150-400 annual membership plus event costs',
    },
    {
      strategy: 'Industry events and exhibitions',
      timeCommitment: '1-2 days quarterly',
      description:
        'Strategic attendance at key industry events for learning and networking.',
      activities: [
        'Visit Electrical Wholesale Show and regional trade exhibitions',
        'Attend manufacturer product launches and technical seminars',
        'Participate in skills competitions and apprentice showcases',
        'Join trade publication reader events and networking sessions',
      ],
      careerBenefits:
        'Product knowledge, market trends, supplier relationships, business opportunities.',
      networkingValue:
        'Meet potential clients, suppliers, partners, and learn from competitors.',
      costs: '£500-2,000 annually including travel and accommodation',
    },
    {
      strategy: 'Mentorship and knowledge sharing',
      timeCommitment: '1-2 hours weekly',
      description:
        'Structured learning relationships with experienced professionals.',
      activities: [
        'Find experienced mentor through professional bodies or employer',
        'Join or create peer learning groups with other apprentices',
        'Participate in reverse mentoring with senior professionals',
        'Share knowledge through presentations and training sessions',
      ],
      careerBenefits:
        'Accelerated learning, career guidance, skill development, confidence building.',
      networkingValue:
        'Build long-term professional relationships and industry advocacy.',
      costs: 'Time investment, potential training course fees',
    },
  ];

  const leadershipDevelopment: DevelopmentCategory[] = [
    {
      category: 'Team leadership skills',
      developmentAreas: [
        {
          skill: 'Communication and interpersonal skills',
          description: 'Effective communication with teams, clients, and stakeholders.',
          developmentPath:
            'Communication courses → practice in team settings → 360-degree feedback',
          businessImpact:
            'Improved team performance, better client relationships, reduced conflicts.',
        },
        {
          skill: 'Project planning and coordination',
          description: 'Managing electrical projects from inception to completion.',
          developmentPath:
            'Project management training → lead small projects → formal qualification',
          businessImpact:
            'On-time delivery, budget control, quality outcomes, team efficiency.',
        },
        {
          skill: 'Problem solving and decision making',
          description: 'Analytical thinking and decisive action in complex situations.',
          developmentPath:
            'Technical problem solving → case study analysis → leadership scenarios',
          businessImpact:
            'Faster issue resolution, better outcomes, increased team confidence.',
        },
      ],
    },
    {
      category: 'Business management capabilities',
      developmentAreas: [
        {
          skill: 'Financial management and budgeting',
          description: 'Understanding business finances, cost control, and profitability.',
          developmentPath:
            'Finance for non-finance managers → budgeting experience → business planning',
          businessImpact:
            'Better project profitability, cost control, business growth planning.',
        },
        {
          skill: 'Health and safety leadership',
          description: 'Creating and maintaining safe working environments.',
          developmentPath:
            'IOSH Managing Safely → risk assessment training → safety culture development',
          businessImpact:
            'Reduced accidents, legal compliance, insurance benefits, team wellbeing.',
        },
        {
          skill: 'Quality management systems',
          description: 'Implementing and maintaining quality standards and processes.',
          developmentPath:
            'Quality management training → ISO standards awareness → process improvement',
          businessImpact:
            'Consistent quality delivery, customer satisfaction, business efficiency.',
        },
      ],
    },
  ];

  const digitalProfessionalismSkills: DevelopmentCategory[] = [
    {
      category: 'Digital communication and collaboration',
      developmentAreas: [
        {
          skill: 'Virtual team leadership',
          description:
            'Leading and managing teams in hybrid and remote working environments.',
          developmentPath:
            'Remote leadership training → virtual team projects → digital collaboration tools mastery',
          businessImpact:
            'Improved team productivity, better remote project outcomes, team engagement.',
        },
        {
          skill: 'Digital marketing and social presence',
          description:
            'Building professional online presence and marketing electrical services digitally.',
          developmentPath:
            'Social media training → LinkedIn optimisation → content creation → customer engagement',
          businessImpact:
            'Increased brand visibility, more leads, enhanced professional reputation.',
        },
        {
          skill: 'Customer relationship management (CRM)',
          description:
            'Managing client relationships and business processes through digital systems.',
          developmentPath:
            'CRM system training → process mapping → data analysis → customer journey optimisation',
          businessImpact:
            'Better customer retention, increased repeat business, streamlined operations.',
        },
      ],
    },
  ];

  const innovationEntrepreneurship: DevelopmentCategory[] = [
    {
      category: 'Innovation and technology adoption',
      developmentAreas: [
        {
          skill: 'Technology scouting and assessment',
          description:
            'Identifying and evaluating emerging technologies for business applications.',
          developmentPath:
            'Tech trend analysis → pilot project management → ROI assessment → implementation planning',
          businessImpact:
            'Competitive advantage, improved efficiency, new revenue streams, future-proofing.',
        },
        {
          skill: 'Business model innovation',
          description:
            'Developing new approaches to electrical service delivery and value creation.',
          developmentPath:
            'Business model canvas training → market research → pilot testing → business plan development',
          businessImpact:
            'New revenue opportunities, market differentiation, business growth, scalability.',
        },
        {
          skill: 'Intellectual property and patents',
          description:
            'Understanding and protecting intellectual property in electrical innovations.',
          developmentPath:
            'IP law basics → patent searching → innovation documentation → legal consultation',
          businessImpact:
            'Protected innovations, licensing opportunities, competitive barriers, asset value.',
        },
      ],
    },
  ];

  const sustainabilityESG: DevelopmentCategory[] = [
    {
      category: 'Environmental sustainability',
      developmentAreas: [
        {
          skill: 'Carbon footprint assessment',
          description:
            'Measuring and reducing environmental impact of electrical installations.',
          developmentPath:
            'Carbon accounting training → lifecycle assessment → reduction strategies → reporting',
          businessImpact:
            'Compliance with regulations, cost savings, competitive differentiation, client attraction.',
        },
        {
          skill: 'Circular economy principles',
          description:
            'Implementing waste reduction and resource efficiency in electrical work.',
          developmentPath:
            'Circular economy training → waste audit → process redesign → supplier collaboration',
          businessImpact:
            'Reduced material costs, waste minimisation, enhanced reputation, regulatory compliance.',
        },
        {
          skill: 'Green building certification',
          description: 'Understanding BREEAM, LEED and other green building standards.',
          developmentPath:
            'Green building courses → certification processes → sustainable design → performance monitoring',
          businessImpact:
            'Access to premium projects, higher value contracts, future market positioning.',
        },
      ],
    },
  ];

  const wellbeingResilience: DevelopmentCategory[] = [
    {
      category: 'Personal wellbeing and resilience',
      developmentAreas: [
        {
          skill: 'Stress management and work-life balance',
          description:
            'Maintaining physical and mental health in demanding work environments.',
          developmentPath:
            'Stress management training → mindfulness practice → time management → health monitoring',
          businessImpact:
            'Improved performance, reduced sick leave, better decision making, longer career longevity.',
        },
        {
          skill: 'Emotional intelligence and self-awareness',
          description: 'Understanding and managing emotions in professional interactions.',
          developmentPath:
            'EQ assessment → self-reflection practice → feedback sessions → relationship building',
          businessImpact:
            'Better team relationships, improved client communication, effective conflict resolution.',
        },
        {
          skill: 'Continuous learning mindset',
          description:
            'Developing adaptability and openness to ongoing skill development.',
          developmentPath:
            'Learning style assessment → goal setting → reflection practice → knowledge sharing',
          businessImpact:
            'Faster adaptation to change, increased innovation, career advancement, job satisfaction.',
        },
      ],
    },
  ];

  const industryAdvocacy: DevelopmentCategory[] = [
    {
      category: 'Industry leadership and advocacy',
      developmentAreas: [
        {
          skill: 'Policy and regulation engagement',
          description:
            'Understanding and influencing electrical industry policy and standards.',
          developmentPath:
            'Regulatory awareness → consultation responses → committee participation → policy advocacy',
          businessImpact:
            'Industry influence, early insight into changes, reputation enhancement, networking.',
        },
        {
          skill: 'Public speaking and thought leadership',
          description: 'Sharing expertise and representing the industry publicly.',
          developmentPath:
            'Presentation skills → conference speaking → article writing → media training',
          businessImpact:
            'Enhanced reputation, business development, industry recognition, knowledge sharing.',
        },
        {
          skill: 'Diversity and inclusion champions',
          description:
            'Promoting inclusive practices and diversity within the electrical industry.',
          developmentPath:
            'Diversity training → bias awareness → inclusive recruitment → mentoring programmes',
          businessImpact:
            'Broader talent pool, improved team performance, industry modernisation, social impact.',
        },
      ],
    },
  ];

  const internationalOpportunities: DevelopmentCategory[] = [
    {
      category: 'Global professional development',
      developmentAreas: [
        {
          skill: 'International standards and practices',
          description:
            'Understanding electrical standards and practices in different countries.',
          developmentPath:
            'International standards study → overseas projects → cultural awareness → language skills',
          businessImpact:
            'Global market access, international contracts, cultural competence, career mobility.',
        },
        {
          skill: 'Cross-cultural communication',
          description:
            'Effective communication and collaboration across different cultures.',
          developmentPath:
            'Cultural awareness training → language learning → international teamwork → global networking',
          businessImpact:
            'Successful international projects, diverse team leadership, global client relationships.',
        },
        {
          skill: 'Export and international business',
          description:
            'Developing electrical services and products for international markets.',
          developmentPath:
            'Export training → market research → international partnerships → compliance understanding',
          businessImpact:
            'Revenue diversification, business growth, market expansion, risk reduction.',
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3">
        <Target className="h-4 w-4 text-white/55 mt-1 flex-shrink-0" />
        <p className="text-[14px] text-white/85 leading-relaxed">
          Strategic professional development supports faster career progression and stronger
          long-term earning potential.
        </p>
      </div>

      <div
        className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}
      >
        {developmentMetrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
          >
            <Eyebrow>{metric.metric}</Eyebrow>
            <div className="text-[14px] text-white/85">{metric.data}</div>
          </div>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="continuing-education">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-white/55" />}>
            Continuing education and advanced qualifications
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              {continuingEducation.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{category.category}</h4>
                    <Pill>{category.timeline}</Pill>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-3">
                    {category.programmes.map((programme, progIndex) => (
                      <div
                        key={progIndex}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="text-[14px] text-white">{programme.qualification}</h5>
                          <Pill>{programme.cost}</Pill>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px] text-white/85">
                          <div>
                            <span className="text-white/55">Provider: </span>
                            {programme.provider}
                          </div>
                          <div>
                            <span className="text-white/55">Duration: </span>
                            {programme.duration}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Eyebrow>Career impact</Eyebrow>
                          <p className="text-[14px] text-white/85 leading-relaxed">
                            {programme.careerImpact}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <Eyebrow>Prerequisites</Eyebrow>
                          <p className="text-[14px] text-white/85 leading-relaxed">
                            {programme.prerequisites}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="networking-strategy">
          <MobileAccordionTrigger icon={<Network className="h-5 w-5 text-white/55" />}>
            Professional networking and industry engagement
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              {networkingStrategy.map((strategy, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{strategy.strategy}</h4>
                    <Pill>{strategy.timeCommitment}</Pill>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {strategy.description}
                  </p>
                  <div className="space-y-2">
                    <Eyebrow>Key activities</Eyebrow>
                    <Bullets items={strategy.activities} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Eyebrow>Career benefits</Eyebrow>
                      <p className="text-[14px] text-white/85 leading-relaxed">
                        {strategy.careerBenefits}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Eyebrow>Networking value</Eyebrow>
                      <p className="text-[14px] text-white/85 leading-relaxed">
                        {strategy.networkingValue}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Eyebrow>Investment required</Eyebrow>
                    <p className="text-[14px] text-white/85 leading-relaxed">{strategy.costs}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="leadership-development">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-white/55" />}>
            Leadership and management development
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={leadershipDevelopment} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="development-planning">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-white/55" />}>
            Personal development planning
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <h4 className="text-[16px] text-white">Strategic career development framework</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Eyebrow>Annual development planning</Eyebrow>
                  <Bullets
                    items={[
                      'Set specific, measurable career objectives for the next 12 months',
                      'Identify required skills and knowledge gaps for target roles',
                      'Create learning schedule with formal and informal development activities',
                      'Establish mentorship relationships and professional networking goals',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Progress monitoring and review</Eyebrow>
                  <Bullets
                    items={[
                      'Quarterly review sessions with line manager or mentor',
                      'Document learning outcomes and evidence collection',
                      'Track completion of planned development activities',
                      'Adjust plans based on career opportunities and industry changes',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Portfolio development</Eyebrow>
                  <Bullets
                    items={[
                      'Maintain comprehensive CPD portfolio with evidence',
                      'Document project achievements and learning outcomes',
                      'Collect testimonials and feedback from colleagues and clients',
                      'Build professional online presence and thought leadership',
                    ]}
                  />
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="digital-professionalism">
          <MobileAccordionTrigger icon={<Smartphone className="h-5 w-5 text-white/55" />}>
            Digital professionalism and technology
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={digitalProfessionalismSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="innovation-entrepreneurship">
          <MobileAccordionTrigger icon={<Rocket className="h-5 w-5 text-white/55" />}>
            Innovation and entrepreneurship
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={innovationEntrepreneurship} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="sustainability-esg">
          <MobileAccordionTrigger icon={<Lightbulb className="h-5 w-5 text-white/55" />}>
            Sustainability and ESG leadership
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={sustainabilityESG} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="wellbeing-resilience">
          <MobileAccordionTrigger icon={<Heart className="h-5 w-5 text-white/55" />}>
            Wellbeing and personal resilience
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={wellbeingResilience} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-advocacy">
          <MobileAccordionTrigger icon={<MessageSquare className="h-5 w-5 text-white/55" />}>
            Industry leadership and advocacy
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={industryAdvocacy} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="international-opportunities">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-white/55" />}>
            International and global development
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <DevelopmentBlock categories={internationalOpportunities} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="career-planning-toolkit">
          <MobileAccordionTrigger icon={<Calendar className="h-5 w-5 text-white/55" />}>
            Career planning toolkit
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <Eyebrow>5-year career plan template</Eyebrow>
                  <ul className="space-y-1.5 text-[14px] text-white/85 leading-relaxed">
                    <li>
                      <span className="text-white">Year 1-2: </span>
                      Foundation skills mastery and professional qualification completion
                    </li>
                    <li>
                      <span className="text-white">Year 3: </span>
                      Specialisation selection and advanced training commencement
                    </li>
                    <li>
                      <span className="text-white">Year 4: </span>
                      Leadership role development and business skills acquisition
                    </li>
                    <li>
                      <span className="text-white">Year 5: </span>
                      Senior position achievement or business establishment
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <Eyebrow>Personal SWOT analysis</Eyebrow>
                  <div className="grid grid-cols-2 gap-2 text-[13px] text-white/85 leading-relaxed">
                    <div>
                      <div className="text-white">Strengths</div>
                      <div className="text-white/70">
                        Technical skills, work ethic, problem-solving
                      </div>
                    </div>
                    <div>
                      <div className="text-white">Weaknesses</div>
                      <div className="text-white/70">
                        Business skills, networking, experience
                      </div>
                    </div>
                    <div>
                      <div className="text-white">Opportunities</div>
                      <div className="text-white/70">
                        Green energy, smart buildings, EV charging
                      </div>
                    </div>
                    <div>
                      <div className="text-white">Threats</div>
                      <div className="text-white/70">
                        Automation, competition, regulation changes
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                <Eyebrow>Professional development resources</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <h6 className="text-[14px] text-white">Career coaching</h6>
                    <Bullets
                      items={[
                        'Professional career coaching services',
                        'Industry mentor matching programmes',
                        'Peer coaching and support groups',
                      ]}
                    />
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-[14px] text-white">Skills assessment</h6>
                    <Bullets
                      items={[
                        'Professional competency assessments',
                        'Skills gap analysis tools',
                        '360-degree feedback programmes',
                      ]}
                    />
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-[14px] text-white">Planning tools</h6>
                    <Bullets
                      items={[
                        'Career planning software and apps',
                        'Goal setting and tracking systems',
                        'Professional portfolio development',
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProfessionalDevelopmentStrategy;
