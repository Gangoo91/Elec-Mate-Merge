import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from '@/components/ui/mobile-accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import { TrendingUp, BarChart3, Zap, Building, Globe } from 'lucide-react';

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
    {children}
  </div>
);

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

const IndustryInsightsAnalysis = () => {
  const isMobile = useIsMobile();

  const industryMetrics = [
    { metric: 'Market growth', data: 'Above GDP growth annually' },
    { metric: 'Skills shortage', data: 'Significant ongoing demand' },
    { metric: 'Green technology', data: 'Major growth area to 2030' },
    { metric: 'Salary growth', data: 'Outpacing inflation' },
  ];

  const marketTrends = [
    {
      trend: 'Renewable energy integration',
      timeline: '2024-2030 rapid expansion',
      description:
        'Growth in solar PV, battery storage, and EV charging infrastructure across the UK.',
      businessOpportunities: [
        'Solar PV installation and maintenance contracts',
        'EV charging network installation across commercial and domestic sectors',
        'Battery storage system integration for energy independence',
        'Heat pump electrical connections and smart home integration',
      ],
      skillsRequired: [
        'MCS certification for renewable energy installations',
        'DC electrical systems knowledge and safety procedures',
        'Energy management system programming and commissioning',
        'Grid connection procedures and DNO liaison',
      ],
      growthRate: 'Strong',
    },
    {
      trend: 'Smart building technology',
      timeline: '2024-2028 mainstream adoption',
      description: 'Integration of IoT, building automation, and intelligent systems.',
      businessOpportunities: [
        'Building Management System (BMS) installation and programming',
        'IoT sensor networks and wireless infrastructure deployment',
        'Smart lighting control systems with presence detection',
        'Integrated security and access control system installation',
      ],
      skillsRequired: [
        'BMS programming and commissioning expertise',
        'Network infrastructure and wireless technology knowledge',
        'Protocol understanding (BACnet, Modbus, KNX)',
        'Cybersecurity awareness for connected systems',
      ],
      growthRate: 'Steady',
    },
    {
      trend: 'Retrofit and energy efficiency',
      timeline: '2024-2035 government driven',
      description: 'Retrofit programmes for net-zero carbon targets.',
      businessOpportunities: [
        'Social housing retrofit programmes',
        'Public sector building decarbonisation',
        'Domestic energy efficiency upgrades',
        'Heat pump and renewable heating installations',
      ],
      skillsRequired: [
        'Energy assessment and modelling',
        'Heating system electrical integration',
        'Insulation and building fabric understanding',
        'Funding programme awareness',
      ],
      growthRate: 'Long-term',
    },
  ];

  const sectorAnalysis = [
    {
      sector: 'Domestic / residential',
      marketShare: 'Major share',
      averageProjectValue: 'Variable per job',
      growthDrivers: [
        'Housing stock improvements',
        'Smart home adoption',
        'EV charger installation',
        'Renewable energy uptake',
      ],
      challenges: [
        'Price competition from sole traders',
        'Customer acquisition costs',
        'Regulatory compliance burden',
      ],
      opportunities: [
        'Premium service positioning',
        'Smart home specialisation',
        'EV charging market entry',
      ],
      profitMargins: 'Healthy for established firms',
    },
    {
      sector: 'Commercial / industrial',
      marketShare: 'Significant share',
      averageProjectValue: 'Larger contracts',
      growthDrivers: [
        'Office refurbishments',
        'Industrial automation',
        'Energy management',
        'Data centre growth',
      ],
      challenges: [
        'Long sales cycles',
        'Tender complexity',
        '24/7 service demands',
      ],
      opportunities: [
        'Long-term maintenance contracts',
        'Energy management consultancy',
        'Process improvement work',
      ],
      profitMargins: 'Strong for established contractors',
    },
    {
      sector: 'New build construction',
      marketShare: 'Sizeable share',
      averageProjectValue: 'Per-plot pricing',
      growthDrivers: [
        'Government housing targets',
        'Commercial development',
        'Infrastructure projects',
      ],
      challenges: [
        'Highly competitive tenders',
        'Tight margins',
        'Programme-driven schedules',
      ],
      opportunities: [
        'Builder relationships',
        'Off-site construction methods',
        'Design and build packages',
      ],
      profitMargins: 'Variable by project scale',
    },
  ];

  const futureSkillsDemand = [
    {
      category: 'Emerging technologies',
      timeframe: 'Next 2-5 years',
      skills: [
        {
          skill: 'Electric vehicle infrastructure',
          demandLevel: 'Critical',
          description: 'Installation and maintenance of EV charging networks.',
          learningPath:
            'EV charging courses → manufacturer certifications → network installation experience',
        },
        {
          skill: 'Energy storage systems',
          demandLevel: 'High',
          description: 'Battery storage installation, commissioning, and maintenance.',
          learningPath:
            'Battery safety training → system design courses → practical installations',
        },
        {
          skill: 'Smart grid technology',
          demandLevel: 'Emerging',
          description: 'Grid integration, demand response, and distributed energy.',
          learningPath:
            'Grid technology courses → DNO engagement → advanced electrical engineering',
        },
      ],
    },
    {
      category: 'Digital integration',
      timeframe: 'Next 1-3 years',
      skills: [
        {
          skill: 'IoT and sensor networks',
          demandLevel: 'High',
          description: 'Installation and commissioning of connected building systems.',
          learningPath:
            'IoT fundamentals → network technology → building automation systems',
        },
        {
          skill: 'Cybersecurity for electrical systems',
          demandLevel: 'Critical',
          description: 'Securing electrical systems and building networks.',
          learningPath:
            'Cybersecurity awareness → industrial control security → certification programmes',
        },
        {
          skill: 'Data analytics for energy management',
          demandLevel: 'Emerging',
          description: 'Analysing energy consumption and optimising systems.',
          learningPath:
            'Data analysis training → energy management systems → business intelligence tools',
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3">
        <BarChart3 className="h-4 w-4 text-white/55 mt-1 flex-shrink-0" />
        <p className="text-[14px] text-white/85 leading-relaxed">
          Skills shortages across the industry are creating opportunities for faster career
          progression in specialist areas.
        </p>
      </div>

      <div
        className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}
      >
        {industryMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="market-trends">
          <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-white/55" />}>
            Key market trends and growth areas
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {marketTrends.map((trend, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{trend.trend}</h4>
                    <Pill>{trend.growthRate}</Pill>
                  </div>
                  <p className="text-[14px] text-white/85 leading-relaxed">{trend.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Eyebrow>Business opportunities</Eyebrow>
                      <Bullets items={trend.businessOpportunities} />
                    </div>
                    <div className="space-y-2">
                      <Eyebrow>Required skills</Eyebrow>
                      <Bullets items={trend.skillsRequired} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Eyebrow>Timeline</Eyebrow>
                    <p className="text-[14px] text-white/85 leading-relaxed">{trend.timeline}</p>
                  </div>
                </div>
              ))}
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="sector-analysis">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-white/55" />}>
            Sector analysis and market opportunities
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {sectorAnalysis.map((sector, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{sector.sector}</h4>
                    <Pill>{sector.marketShare}</Pill>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px] text-white/85">
                    <div>
                      <span className="text-white/55">Project value: </span>
                      {sector.averageProjectValue}
                    </div>
                    <div>
                      <span className="text-white/55">Profit margins: </span>
                      {sector.profitMargins}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Eyebrow>Growth drivers</Eyebrow>
                    <Bullets items={sector.growthDrivers} />
                  </div>

                  <div className="space-y-2">
                    <Eyebrow>Key challenges</Eyebrow>
                    <Bullets items={sector.challenges} />
                  </div>

                  <div className="space-y-2">
                    <Eyebrow>Strategic opportunities</Eyebrow>
                    <Bullets items={sector.opportunities} />
                  </div>
                </div>
              ))}
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="future-skills">
          <MobileAccordionTrigger icon={<Zap className="h-5 w-5 text-white/55" />}>
            Future skills demand
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              {futureSkillsDemand.map((category, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[16px] text-white">{category.category}</h4>
                    <Pill>{category.timeframe}</Pill>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="text-[14px] text-white">{skill.skill}</h5>
                          <Pill>{skill.demandLevel}</Pill>
                        </div>
                        <p className="text-[14px] text-white/85 leading-relaxed">
                          {skill.description}
                        </p>
                        <div className="pt-2 border-t border-white/[0.06]">
                          <Eyebrow>Learning path</Eyebrow>
                          <p className="mt-1 text-[14px] text-white/85 leading-relaxed">
                            {skill.learningPath}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="industry-outlook">
          <MobileAccordionTrigger icon={<Globe className="h-5 w-5 text-white/55" />}>
            Industry outlook and strategic recommendations
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Section>
              <h4 className="text-[16px] text-white">Strategic career positioning</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Eyebrow>Immediate opportunities</Eyebrow>
                  <Bullets
                    items={[
                      'Focus on EV charging installation to capture demand',
                      'Develop renewable energy skills for solar and battery markets',
                      'Specialise in retrofit work for government-funded programmes',
                      'Build smart home automation expertise',
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <Eyebrow>Medium-term strategy</Eyebrow>
                  <Bullets
                    items={[
                      'Develop digital integration skills as IoT becomes mainstream',
                      'Position for commercial energy management opportunities',
                      'Build expertise in industrial automation and process control',
                      'Consider business ownership or partnership opportunities',
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <Eyebrow>Long-term vision</Eyebrow>
                  <Bullets
                    items={[
                      'Lead on smart grid integration and distributed energy systems',
                      'Specialise in cybersecurity for critical electrical infrastructure',
                      'Develop consultancy services for energy efficiency and sustainability',
                      'Consider executive roles in renewable energy companies',
                    ]}
                  />
                </div>
              </div>
            </Section>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default IndustryInsightsAnalysis;
