import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from '@/components/ui/mobile-accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  TrendingUp,
  Target,
  BookOpen,
  GraduationCap,
  Building,
  Briefcase,
  Sparkles,
  Network,
} from 'lucide-react';

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

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
    {children}
  </div>
);

const EnhancedCareerOverview = () => {
  const isMobile = useIsMobile();

  const careerMetrics = [
    { metric: 'Average progression', data: '3-5 years to senior level' },
    { metric: 'Salary growth', data: 'Significant range available' },
    { metric: 'Job market outlook', data: 'Above-average growth' },
    { metric: 'Career paths', data: '12+ distinct pathways' },
  ];

  const progressionStages = [
    {
      stage: 'Foundation stage',
      duration: '6-18 months',
      level: 'Entry level',
      description: 'Building core electrical knowledge and safety practices.',
      keyMilestones: [
        'Complete Level 2 Electrical Installation course',
        "Understand basic circuit theory and Ohm's Law",
        'Master safe isolation procedures',
        'Learn fundamental wiring techniques',
        'Achieve BS 7671:2018+A4:2026 certification',
      ],
      salaryRange: '£16,000 - £20,000',
      nextSteps: 'Progress to apprenticeship or continue with Level 3 qualification.',
    },
    {
      stage: 'Development stage',
      duration: '2-3 years',
      level: 'Intermediate',
      description: 'Gaining practical experience and advanced installation skills.',
      keyMilestones: [
        'Complete Level 3 Electrical Installation NVQ',
        'Pass AM2 practical assessment',
        'Gain 2+ years post-qualification experience',
        'Complete Inspection and Testing (2391) qualification',
        'Develop fault diagnosis skills',
      ],
      salaryRange: '£22,000 - £32,000',
      nextSteps: 'Choose specialisation path or pursue supervisory roles.',
    },
    {
      stage: 'Specialisation stage',
      duration: '2-4 years',
      level: 'Advanced',
      description: 'Developing expertise in specific electrical disciplines.',
      keyMilestones: [
        'Complete specialist training courses',
        'Gain manufacturer certifications',
        'Build portfolio of complex projects',
        'Develop leadership and mentoring skills',
        'Register with professional scheme (NICEIC / NAPIT)',
      ],
      salaryRange: '£30,000 - £42,000',
      nextSteps: 'Advance to senior specialist, management, or contractor roles.',
    },
    {
      stage: 'Mastery stage',
      duration: '3-5 years',
      level: 'Expert',
      description: 'Leading projects and developing others in the field.',
      keyMilestones: [
        'Achieve senior electrician or supervisor status',
        'Complete management or business qualifications',
        'Mentor apprentices and junior electricians',
        'Lead complex installation projects',
        'Contribute to industry standards development',
      ],
      salaryRange: '£35,000 - £55,000+',
      nextSteps: 'Electrical contractor, project management, or engineering roles.',
    },
  ];

  const industryContext = [
    {
      title: 'Digital transformation',
      description:
        'Smart buildings, IoT systems, and automated controls are reshaping electrical work.',
      impact: 'High demand for tech-savvy electricians.',
    },
    {
      title: 'Sustainability focus',
      description:
        'Net-zero targets driving renewable energy adoption and energy efficiency measures.',
      impact: 'Growing opportunities in green technology.',
    },
    {
      title: 'Infrastructure investment',
      description:
        'Major investment in EV charging networks, grid modernisation, and housing.',
      impact: 'Sustained job creation across sectors.',
    },
  ];

  const qualificationPathways = [
    {
      pathway: 'Traditional apprenticeship route',
      duration: '3-4 years',
      structure: [
        'Level 2 Electrical Installation (18 months)',
        'Level 3 Electrical Installation NVQ (24 months)',
        'AM2 assessment and portfolio completion',
        'End Point Assessment (EPA)',
      ],
      advantages: [
        'Earn while you learn',
        'Comprehensive practical experience',
        'Mentorship from experienced professionals',
        'Direct pathway to employment',
      ],
    },
    {
      pathway: 'Adult career change route',
      duration: '12-24 months',
      structure: [
        'Intensive Level 2 and 3 courses (12 months)',
        'Work experience placement (6 months)',
        'Assessment and certification',
        'Job placement support',
      ],
      advantages: [
        'Accelerated learning for mature learners',
        'Recognition of prior experience',
        'Flexible study options',
        'Career change support services',
      ],
    },
    {
      pathway: 'Higher education route',
      duration: '3-4 years',
      structure: [
        'HNC / HND in Electrical Engineering',
        'Degree apprenticeship options',
        'Professional registration pathway',
        'Management development track',
      ],
      advantages: [
        'Academic depth and breadth',
        'Leadership preparation',
        'Research and innovation exposure',
        'Higher earning potential',
      ],
    },
  ];

  const professionalDevelopment = [
    {
      stage: 'Early career',
      focus: 'Technical competence',
      activities: [
        'Complete mandatory certifications (BS 7671, 2391)',
        'Gain experience across different electrical systems',
        'Develop diagnostic and problem-solving skills',
        'Build professional network through industry events',
      ],
    },
    {
      stage: 'Mid career',
      focus: 'Specialisation and leadership',
      activities: [
        'Choose specialisation area (renewable energy, industrial, etc.)',
        'Pursue advanced certifications and manufacturer training',
        'Develop project management and team leadership skills',
        'Consider business development or contracting',
      ],
    },
    {
      stage: 'Senior career',
      focus: 'Innovation and mentorship',
      activities: [
        'Lead complex projects and initiatives',
        'Mentor next generation of electricians',
        'Contribute to industry standards and best practices',
        'Explore entrepreneurship or consultancy opportunities',
      ],
    },
  ];

  const industrySectors = [
    {
      sector: 'Residential and domestic',
      growth: 'Steady',
      opportunities: [
        'Smart home installations',
        'EV charging points',
        'Solar PV systems',
        'Home automation',
      ],
      salaryRange: '£25K - £40K',
    },
    {
      sector: 'Commercial and office',
      growth: 'Growing',
      opportunities: [
        'Energy management systems',
        'LED lighting upgrades',
        'Emergency lighting compliance',
        'Data centre installations',
      ],
      salaryRange: '£30K - £45K',
    },
    {
      sector: 'Industrial and manufacturing',
      growth: 'High',
      opportunities: [
        'Automation and robotics',
        'Process control systems',
        'Motor control and drives',
        'Predictive maintenance',
      ],
      salaryRange: '£35K - £55K',
    },
    {
      sector: 'Renewable energy',
      growth: 'Very high',
      opportunities: [
        'Solar farm installations',
        'Wind turbine maintenance',
        'Battery storage systems',
        'Grid connection projects',
      ],
      salaryRange: '£32K - £52K',
    },
  ];

  const entrepreneurshipGuide = [
    {
      path: 'Self-employed electrician',
      requirements: [
        'Minimum 3 years post-qualification experience',
        'Comprehensive public liability insurance cover',
        'Professional scheme membership (NICEIC, NAPIT, or equivalent)',
        'Business registration with HMRC and proper accounting systems',
      ],
      earnings: '£30K - £60K+ dependent on client base and workload',
      considerations: [
        'Variable income during initial establishment period',
        'Personal responsibility for client acquisition and retention',
        'Essential business development and marketing capabilities',
        'Significant initial investment in professional equipment and transport',
      ],
    },
    {
      path: 'Electrical contracting business',
      requirements: [
        'Extensive industry experience with proven track record',
        'Business management qualifications or demonstrable skills',
        'Substantial capital investment for equipment, premises, and staff',
        'Established professional network and client relationships',
      ],
      earnings: '£40K - £100K+ scaling with business growth and market position',
      considerations: [
        'Elevated financial risk requiring careful business planning',
        'Full responsibility for staff recruitment, training, and management',
        'Complex regulatory and compliance obligations across multiple areas',
        'Significant potential for expansion but requires strategic planning',
      ],
    },
  ];

  const careerPathHighlights = [
    {
      path: 'Domestic installation specialist',
      growth: 'High demand',
      earning: '£25K - £40K',
      speciality: 'Residential electrical systems, smart home technology',
    },
    {
      path: 'Industrial maintenance engineer',
      growth: 'Very high demand',
      earning: '£35K - £55K',
      speciality: 'Complex machinery, PLC systems, fault diagnosis',
    },
    {
      path: 'Renewable energy technician',
      growth: 'Rapidly growing',
      earning: '£30K - £50K',
      speciality: 'Solar PV, wind systems, battery storage',
    },
    {
      path: 'Electrical design engineer',
      growth: 'Stable growth',
      earning: '£40K - £65K',
      speciality: 'System design, CAD, project engineering',
    },
  ];

  const advancementTips = [
    {
      category: 'Skills development',
      tips: [
        'Continuously update skills through courses and certifications',
        'Consider specialising in growth areas like renewable energy or smart systems',
        'Pursue additional qualifications like inspection and testing certification',
        'Gain experience across different sectors (domestic, commercial, industrial)',
      ],
    },
    {
      category: 'Professional development',
      tips: [
        'Join professional organisations like IET, ECA, or NICEIC',
        'Attend industry events and trade shows for networking',
        'Build relationships with suppliers and manufacturers',
        'Document your work and create a professional portfolio',
      ],
    },
    {
      category: 'Business skills',
      tips: [
        'Develop project management and leadership abilities',
        'Learn business fundamentals if considering self-employment',
        'Build strong communication and customer service skills',
        'Stay informed about industry regulations and standards',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <p className="text-[14px] text-white/85 leading-relaxed">
          The UK electrical industry offers diverse career paths with strong job security,
          competitive salaries, and opportunities for continuous professional growth.
        </p>
      </div>

      <div
        className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}
      >
        {careerMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="career-stages">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-white/55" />}>
            Career progression stages
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {progressionStages.map((stage, index) => (
                <div key={index} className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-[16px] text-white">{stage.stage}</h4>
                    <div className="flex gap-2">
                      <Pill>{stage.duration}</Pill>
                      <Pill>{stage.level}</Pill>
                    </div>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{stage.description}</p>
                  <div className="space-y-2">
                    <Eyebrow>Key milestones</Eyebrow>
                    <Bullets items={stage.keyMilestones} />
                  </div>
                  <div className="text-[14px] text-white/85">
                    <span className="text-white/55">Salary range: </span>
                    {stage.salaryRange}
                  </div>
                  <div className="text-[14px] text-white/85">
                    <span className="text-white/55">Next steps: </span>
                    {stage.nextSteps}
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-2">
                  <Eyebrow>UK compliance and best practice</Eyebrow>
                  <Bullets
                    items={[
                      'Apply BS 7671:2018+A4:2026 selection and erection principles, keeping current with amendments',
                      'Follow safe isolation and live working avoidance (HSE GS38) at all times',
                      'Record EIC / EICR correctly and store certificates securely for at least 6 years',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Typical roles by stage</Eyebrow>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px] text-white/85">
                    <div>Foundation: Electrical Mate, Trainee Installer</div>
                    <div>Development: Improver, Installation Electrician</div>
                    <div>Specialisation: Testing and Inspection, EV Installer, Industrial Maintenance</div>
                    <div>Mastery: Supervisor, Qualified Supervisor (QS), Project Manager</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Eyebrow>Recommended CPD</Eyebrow>
                  <Bullets
                    items={[
                      '10-25 CPD hours per year aligned to IET guidance depending on career stage',
                      'Quarterly manufacturer training and product updates (RCD / AFDD, EV, controls)',
                      'Monthly toolbox talks and site safety refreshers',
                    ]}
                  />
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="career-paths">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-white/55" />}>
            Popular career pathways
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {careerPathHighlights.map((path, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-[16px] text-white">{path.path}</h4>
                  <div className="grid grid-cols-2 gap-3 text-[14px] text-white/85">
                    <div>
                      <span className="text-white/55">Growth: </span>
                      {path.growth}
                    </div>
                    <div>
                      <span className="text-white/55">Earning: </span>
                      {path.earning}
                    </div>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{path.speciality}</p>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-2">
                  <Eyebrow>Typical certifications</Eyebrow>
                  <Bullets
                    items={[
                      'BS 7671:2018+A4:2026, ECS / JIB card, 2391 (Inspection and Testing)',
                      'Domestic Part P (where applicable), EV charging (e.g. C&G 2919)',
                    ]}
                  />
                </div>
                <div className="space-y-1">
                  <Eyebrow>Common employers</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Electrical contractors, facilities management, housebuilders, local authorities,
                    utilities and DNOs.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Salary benchmarks</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Entry £24-28k, experienced £35-45k, specialist £45-60k+ (London weighting
                    typically adds 10-20%).
                  </p>
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="advancement-tips">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-white/55" />}>
            Career advancement tips
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {advancementTips.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-[16px] text-white">{section.category}</h4>
                  <Bullets items={section.tips} />
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-2">
                  <Eyebrow>Quick wins</Eyebrow>
                  <Bullets
                    items={[
                      'Keep a simple CPD log and update it weekly (photos of certs, brief notes)',
                      'Ask for manufacturer toolbox sessions on-site to upskill the team',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Avoid these pitfalls</Eyebrow>
                  <Bullets
                    items={[
                      'Letting qualifications lapse — schedule reminders 3-6 months before expiry',
                      'Ignoring paperwork (EIC / EICR) — build templates and stick to them',
                    ]}
                  />
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-context">
          <MobileAccordionTrigger icon={<Sparkles className="h-5 w-5 text-white/55" />}>
            Industry context and trends
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {industryContext.map((context, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-[16px] text-white">{context.title}</h4>
                  <p className="text-[14px] text-white/85 leading-relaxed">{context.description}</p>
                  <div className="text-[14px] text-white/85">
                    <span className="text-white/55">Impact: </span>
                    {context.impact}
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-2">
                  <Eyebrow>What this means for you</Eyebrow>
                  <Bullets
                    items={[
                      'Prioritise digital skills (smart systems, basic networking, controls)',
                      'Build renewable / energy efficiency competencies to align with net-zero demand',
                    ]}
                  />
                </div>
                <div className="space-y-1">
                  <Eyebrow>Skills to focus on</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Testing and verification, commissioning, data cabling, basic PLC awareness,
                    safe systems of work.
                  </p>
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="qualification-pathways">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-white/55" />}>
            Qualification pathways
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {qualificationPathways.map((pathway, index) => (
                <div key={index} className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-[16px] text-white">{pathway.pathway}</h4>
                    <Pill>Duration: {pathway.duration}</Pill>
                  </div>
                  <div className="space-y-2">
                    <Eyebrow>Structure</Eyebrow>
                    <Bullets items={pathway.structure} />
                  </div>
                  <div className="space-y-2">
                    <Eyebrow>Advantages</Eyebrow>
                    <Bullets items={pathway.advantages} />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-1">
                  <Eyebrow>Entry requirements</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    GCSEs (or equivalent) typically in Maths and English, aptitude for practical
                    work, health and safety awareness.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Assessment methods</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Portfolio evidence, on-site observations, written and practical exams,
                    AM2 / EPA as applicable.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Funding routes</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Employer apprenticeship levy, adult learning loans, regional grants — check
                    local colleges and providers.
                  </p>
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-development">
          <MobileAccordionTrigger icon={<Network className="h-5 w-5 text-white/55" />}>
            Professional development journey
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {professionalDevelopment.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="space-y-2">
                    <h4 className="text-[16px] text-white">{stage.stage}</h4>
                    <Pill>Focus: {stage.focus}</Pill>
                  </div>
                  <div className="space-y-2">
                    <Eyebrow>Key activities</Eyebrow>
                    <Bullets items={stage.activities} />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-1">
                  <Eyebrow>CPD targets</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Early 10-15 hours / year, mid 15-25 hours / year, senior 25+ hours / year (mix
                    of formal, informal, and on-the-job learning).
                  </p>
                </div>
                <div className="space-y-2">
                  <Eyebrow>Simple learning plan</Eyebrow>
                  <Bullets
                    items={[
                      'One certification, one manufacturer course, one soft skill per quarter',
                      'Track evidence with dates, reflections, and outcomes',
                    ]}
                  />
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-sectors">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-white/55" />}>
            Industry sectors and opportunities
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {industrySectors.map((sector, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{sector.sector}</h4>
                    <Pill>{sector.growth}</Pill>
                  </div>
                  <div className="space-y-2">
                    <Eyebrow>Growth opportunities</Eyebrow>
                    <Bullets items={sector.opportunities} />
                  </div>
                  <div className="text-[14px] text-white/85">
                    <span className="text-white/55">Salary range: </span>
                    {sector.salaryRange}
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-1">
                  <Eyebrow>Mandatory certifications</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    BS 7671:2018+A4:2026, ECS / JIB, site inductions; sector-specific may include
                    IPAF, PASMA, confined spaces.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Key risks</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Live work exposure, working at height, isolation errors — mitigate via SSOW,
                    permits, and competency checks.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Essential tools</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Calibrated testers, lock-off kits, voltage indicators (GS38), appropriate PPE
                    per task and environment.
                  </p>
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="entrepreneurship">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-white/55" />}>
            Entrepreneurship and self-employment
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {entrepreneurshipGuide.map((path, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-[16px] text-white">{path.path}</h4>
                  <div className="space-y-2">
                    <Eyebrow>Requirements</Eyebrow>
                    <Bullets items={path.requirements} />
                  </div>
                  <div className="text-[14px] text-white/85">
                    <span className="text-white/55">Potential earnings: </span>
                    {path.earnings}
                  </div>
                  <div className="space-y-2">
                    <Eyebrow>Key considerations</Eyebrow>
                    <Bullets items={path.considerations} />
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-white/[0.06] space-y-3">
                <div className="space-y-1">
                  <Eyebrow>Start-up costs (indicative)</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Insurance, test equipment, van and tools, scheme fees, marketing, accounting
                    software — typically £5k-£15k+ depending on scope.
                  </p>
                </div>
                <div className="space-y-1">
                  <Eyebrow>Day rates and pricing</Eyebrow>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    Typical day rate £180-£350+ depending on region. Price by value with
                    allowances for testing, certification, and warranty.
                  </p>
                </div>
                <div className="space-y-2">
                  <Eyebrow>Compliance checklist</Eyebrow>
                  <Bullets
                    items={[
                      'HMRC registration, public and professional liability insurance, waste carrier (if needed), contracts and T&Cs',
                      'Scheme membership (NICEIC / NAPIT) where required, calibration and document control process',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Useful UK links</Eyebrow>
                  <ul className="space-y-1 text-[14px] text-white/85">
                    <li>
                      <a
                        href="https://www.gov.uk/set-up-business"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-elec-yellow"
                      >
                        GOV.UK — Set up a business
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.niceic.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-elec-yellow"
                      >
                        NICEIC — Certification schemes
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.napit.org.uk/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-elec-yellow"
                      >
                        NAPIT — Competent Person scheme
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.hse.gov.uk/electricity/index.htm"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-elec-yellow"
                      >
                        HSE — Electrical safety
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default EnhancedCareerOverview;
