import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent,
} from '@/components/ui/mobile-accordion';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Brain,
  Target,
  Award,
  BookOpen,
  Smartphone,
  Briefcase,
  Rocket,
  GraduationCap,
  MapPin,
  BarChart,
  Library,
} from 'lucide-react';

interface Skill {
  skill: string;
  description: string;
  competencyLevel: string;
  learningPath: string;
  assessmentCriteria: string[];
}

interface SkillCategory {
  category: string;
  duration: string;
  skills: Skill[];
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

const SkillsBlock = ({ categories }: { categories: SkillCategory[] }) => (
  <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
    {categories.map((category, index) => (
      <div key={index} className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="text-[16px] text-white">{category.category}</h4>
          <Pill>{category.duration}</Pill>
        </div>
        <div className="space-y-3">
          {category.skills.map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h5 className="text-[14px] text-white">{skill.skill}</h5>
                <Pill>{skill.competencyLevel}</Pill>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{skill.description}</p>
              <div className="space-y-1">
                <Eyebrow>Learning path</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed">{skill.learningPath}</p>
              </div>
              <div className="space-y-1">
                <Eyebrow>Assessment criteria</Eyebrow>
                <Bullets items={skill.assessmentCriteria} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SkillsDevelopmentMatrix = () => {
  const isMobile = useIsMobile();

  const skillsMetrics = [
    { metric: 'Core skills required', data: '12-15 essential competencies' },
    { metric: 'Development time', data: '3-5 years to full competency' },
    { metric: 'Skill progression', data: '6-8 new skills per year typical' },
    { metric: 'Specialisation value', data: 'Premium rates for specialists' },
  ];

  const foundationSkills: SkillCategory[] = [
    {
      category: 'Electrical fundamentals',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Basic circuit theory',
          description: "Understanding Ohm's Law, power calculations, and circuit analysis.",
          competencyLevel: 'Essential',
          learningPath:
            'Level 2 Electrical Installation → practice calculations → apply in real circuits',
          assessmentCriteria: [
            'Calculate voltage, current, and resistance',
            'Analyse series and parallel circuits',
            'Apply power formulas',
          ],
        },
        {
          skill: 'Safe isolation procedures',
          description: 'Lock-off, tag-out, and proving dead procedures for all electrical work.',
          competencyLevel: 'Critical',
          learningPath:
            'Health and safety course → practical demonstrations → supervised practice',
          assessmentCriteria: [
            'Demonstrate safe isolation',
            'Use proving units correctly',
            'Apply lock-off procedures',
          ],
        },
        {
          skill: 'Wiring regulations knowledge',
          description: 'Understanding BS 7671:2018+A4:2026 requirements and applications.',
          competencyLevel: 'Essential',
          learningPath:
            'BS 7671:2018+A4:2026 course → regulation study → practical application',
          assessmentCriteria: [
            'Quote relevant regulations',
            'Apply cable sizing rules',
            'Understand protection requirements',
          ],
        },
      ],
    },
    {
      category: 'Practical installation',
      duration: '12-18 months',
      skills: [
        {
          skill: 'Cable installation techniques',
          description: 'Proper cable routing, support, and protection methods.',
          competencyLevel: 'Essential',
          learningPath: 'Hands-on training → different installation methods → quality standards',
          assessmentCriteria: [
            'Install cables to regulations',
            'Use appropriate fixings and supports',
            'Apply correct protection methods',
          ],
        },
        {
          skill: 'Termination and connections',
          description: 'Making safe and reliable electrical connections.',
          competencyLevel: 'Essential',
          learningPath:
            'Termination training → practice with various conductors → quality assurance',
          assessmentCriteria: [
            'Make secure terminations',
            'Use correct tools and torques',
            'Identify connection types',
          ],
        },
      ],
    },
  ];

  const intermediateSkills: SkillCategory[] = [
    {
      category: 'Testing and inspection',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Initial verification',
          description: 'Testing new installations before energising.',
          competencyLevel: 'Advanced',
          learningPath:
            '2391 Inspection and Testing → practical experience → certification work',
          assessmentCriteria: [
            'Carry out continuity tests',
            'Perform insulation resistance testing',
            'Test RCDs and protective devices',
          ],
        },
        {
          skill: 'Periodic inspection',
          description: 'Conducting EICRs on existing installations.',
          competencyLevel: 'Professional',
          learningPath:
            '2391-52 qualification → portfolio development → independent practice',
          assessmentCriteria: [
            'Identify code C1, C2, and C3 issues',
            'Complete EICR documentation',
            'Make appropriate recommendations',
          ],
        },
      ],
    },
    {
      category: 'Fault finding',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Systematic fault diagnosis',
          description: 'Using logical processes to identify electrical faults.',
          competencyLevel: 'Advanced',
          learningPath:
            'Fault finding training → real-world experience → mentor guidance',
          assessmentCriteria: [
            'Use diagnostic equipment',
            'Apply systematic approaches',
            'Document fault histories',
          ],
        },
      ],
    },
  ];

  const specialistSkills: SkillCategory[] = [
    {
      category: 'Industrial systems',
      duration: '12-24 months',
      skills: [
        {
          skill: 'Three-phase systems',
          description: 'Working with industrial three-phase installations.',
          competencyLevel: 'Advanced',
          learningPath: 'Industrial qualification → site experience → specialist training',
          assessmentCriteria: [
            'Connect three-phase systems',
            'Understand phase rotation',
            'Test industrial installations',
          ],
        },
        {
          skill: 'Motor control',
          description: 'Installing and maintaining motor control systems.',
          competencyLevel: 'Advanced',
          learningPath:
            'Motor control training → manufacturer courses → site experience',
          assessmentCriteria: [
            'Wire motor starters',
            'Programme variable speed drives',
            'Diagnose motor faults',
          ],
        },
      ],
    },
    {
      category: 'Renewable energy',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Solar PV installation',
          description: 'Designing and installing solar PV systems.',
          competencyLevel: 'Emerging',
          learningPath: 'MCS training → manufacturer certification → installation experience',
          assessmentCriteria: [
            'Design PV systems',
            'Install to MCS standards',
            'Commission and test',
          ],
        },
        {
          skill: 'EV charging installation',
          description: 'Installing electric vehicle charging infrastructure.',
          competencyLevel: 'Emerging',
          learningPath:
            'EV charging course → manufacturer certifications → installation practice',
          assessmentCriteria: [
            'Install EV charging units',
            'Understand DC and AC charging',
            'Commission charging networks',
          ],
        },
      ],
    },
  ];

  const digitalTechSkills: SkillCategory[] = [
    {
      category: 'Smart building technology',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Building Management Systems',
          description: 'Programming and commissioning BMS installations.',
          competencyLevel: 'Advanced',
          learningPath: 'BMS courses → protocol training → commissioning experience',
          assessmentCriteria: [
            'Programme BMS systems',
            'Understand BACnet, Modbus, KNX',
            'Commission integrated systems',
          ],
        },
        {
          skill: 'IoT and connected devices',
          description: 'Installing and configuring connected building systems.',
          competencyLevel: 'Emerging',
          learningPath:
            'IoT fundamentals → network technology → building automation',
          assessmentCriteria: [
            'Configure wireless networks',
            'Install sensor networks',
            'Integrate with building systems',
          ],
        },
      ],
    },
  ];

  const businessSoftSkills: SkillCategory[] = [
    {
      category: 'Customer service',
      duration: 'Ongoing',
      skills: [
        {
          skill: 'Communication skills',
          description: 'Effective communication with clients, colleagues, and stakeholders.',
          competencyLevel: 'Essential',
          learningPath:
            'Communication courses → practice → feedback and improvement',
          assessmentCriteria: [
            'Communicate technical concepts clearly',
            'Listen actively to client needs',
            'Manage difficult conversations',
          ],
        },
        {
          skill: 'Project management',
          description: 'Planning, executing, and delivering electrical projects.',
          competencyLevel: 'Advanced',
          learningPath:
            'PRINCE2 or APM training → project experience → continuous learning',
          assessmentCriteria: [
            'Plan and schedule work',
            'Manage budgets and resources',
            'Deliver to time and quality',
          ],
        },
      ],
    },
    {
      category: 'Business skills',
      duration: '12-24 months',
      skills: [
        {
          skill: 'Estimating and pricing',
          description: 'Producing accurate quotes and managing pricing.',
          competencyLevel: 'Professional',
          learningPath:
            'Estimating training → market analysis → pricing strategy',
          assessmentCriteria: [
            'Produce detailed estimates',
            'Calculate true costs',
            'Apply appropriate margins',
          ],
        },
      ],
    },
  ];

  const emergingTechSkills: SkillCategory[] = [
    {
      category: 'Energy storage',
      duration: '6-12 months',
      skills: [
        {
          skill: 'Battery storage systems',
          description: 'Installing and commissioning battery storage installations.',
          competencyLevel: 'Emerging',
          learningPath:
            'Battery safety training → system design courses → practical installations',
          assessmentCriteria: [
            'Install battery systems safely',
            'Commission storage installations',
            'Maintain battery health',
          ],
        },
      ],
    },
  ];

  const professionalFramework: SkillCategory[] = [
    {
      category: 'Continuing professional development',
      duration: 'Ongoing',
      skills: [
        {
          skill: 'CPD planning and recording',
          description: 'Maintaining ongoing professional development records.',
          competencyLevel: 'Essential',
          learningPath:
            'Professional body guidance → CPD planning → reflective practice',
          assessmentCriteria: [
            'Record CPD activities',
            'Plan development goals',
            'Reflect on learning',
          ],
        },
      ],
    },
  ];

  const ResourceList = ({ items }: { items: { label: string; description: string }[] }) => (
    <ul className="space-y-1.5">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
          <span>
            <span className="text-white">{item.label}: </span>
            {item.description}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 flex items-start gap-3">
        <Brain className="h-4 w-4 text-white/55 mt-1 flex-shrink-0" />
        <p className="text-[14px] text-white/85 leading-relaxed">
          Structured skills development supports stronger earning potential and faster career
          progression.
        </p>
      </div>

      <div
        className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}
      >
        {skillsMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="foundation-skills">
          <MobileAccordionTrigger icon={<BookOpen className="h-5 w-5 text-white/55" />}>
            Foundation skills (Years 1-2)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={foundationSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="intermediate-skills">
          <MobileAccordionTrigger icon={<Target className="h-5 w-5 text-white/55" />}>
            Intermediate skills (Years 2-4)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={intermediateSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="specialist-skills">
          <MobileAccordionTrigger icon={<Award className="h-5 w-5 text-white/55" />}>
            Specialist skills (Years 3-5)
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={specialistSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="digital-tech-skills">
          <MobileAccordionTrigger icon={<Smartphone className="h-5 w-5 text-white/55" />}>
            Digital and technology skills
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={digitalTechSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-soft-skills">
          <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-white/55" />}>
            Business and soft skills
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={businessSoftSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="emerging-tech-skills">
          <MobileAccordionTrigger icon={<Rocket className="h-5 w-5 text-white/55" />}>
            Emerging technologies
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={emergingTechSkills} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-framework">
          <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-white/55" />}>
            Professional development framework
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <SkillsBlock categories={professionalFramework} />
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="regional-skills">
          <MobileAccordionTrigger icon={<MapPin className="h-5 w-5 text-white/55" />}>
            Regional skills intelligence
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Eyebrow>High demand regions</Eyebrow>
                  <Bullets
                    items={[
                      'London and South East',
                      'Manchester and North West',
                      'Birmingham and Midlands',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>In-demand skills by region</Eyebrow>
                  <ResourceList
                    items={[
                      { label: 'London', description: 'Smart building tech, data centres' },
                      { label: 'Scotland', description: 'Renewable energy, offshore wind' },
                      { label: 'North', description: 'Industrial automation, manufacturing' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="skills-marketplace">
          <MobileAccordionTrigger icon={<BarChart className="h-5 w-5 text-white/55" />}>
            Skills marketplace analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Eyebrow>High-value skills</Eyebrow>
                  <Bullets
                    items={[
                      'HV switching',
                      'PLC programming',
                      'Solar PV design',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Growth opportunities</Eyebrow>
                  <Bullets
                    items={[
                      'EV charging — strong growth',
                      'Smart buildings — strong growth',
                      'Battery storage — strong growth',
                    ]}
                  />
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="learning-resources">
          <MobileAccordionTrigger icon={<Library className="h-5 w-5 text-white/55" />}>
            Learning resources hub
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="rounded-b-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Eyebrow>Training providers</Eyebrow>
                  <ResourceList
                    items={[
                      {
                        label: 'City and Guilds',
                        description: 'Industry-standard qualifications',
                      },
                      { label: 'EAL', description: 'Awarding organisation for electrical' },
                      { label: 'NICEIC', description: 'Professional development courses' },
                      {
                        label: 'Local colleges',
                        description: 'Part-time and evening courses',
                      },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Online learning</Eyebrow>
                  <ResourceList
                    items={[
                      { label: 'Virtual classrooms', description: 'Interactive online courses' },
                      { label: 'Simulation software', description: 'Practice without risk' },
                      { label: 'Video libraries', description: 'Technique demonstrations' },
                      { label: 'Mobile apps', description: 'Learn on the go' },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Eyebrow>Publications</Eyebrow>
                  <Bullets
                    items={['Electrical Review', 'Professional Electrician', 'Electrical Times']}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Professional bodies</Eyebrow>
                  <Bullets
                    items={[
                      'IET (Institution of Engineering and Technology)',
                      "ECA (Electrical Contractors' Association)",
                      'SELECT (Scottish electrical trade association)',
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Events and networking</Eyebrow>
                  <Bullets
                    items={[
                      'Electrical Safety First conferences',
                      'Regional trade events',
                      'Manufacturer training days',
                    ]}
                  />
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default SkillsDevelopmentMatrix;
