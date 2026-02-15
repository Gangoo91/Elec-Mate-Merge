import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle } from 'lucide-react';

const courseCategories = [
  {
    title: 'HNC/HND Electrical Engineering',
    level: 'Level 4–5',
    duration: '1–3 years part-time',
    cost: '£3,000–£12,000',
    description:
      'Higher National qualifications for career progression into design, management, and engineering roles. Study part-time or via distance learning while working.',
    courses: [
      'Electrical Principles',
      'Mathematics for Engineers',
      'Digital Electronics',
      'Power Systems',
      'Circuit Design',
      'Industrial Control',
    ],
  },
  {
    title: 'Degree Top-Up (BEng/BSc)',
    level: 'Level 6',
    duration: '1–2 years part-time',
    cost: '£9,250/year (loan eligible)',
    description:
      'Top up an HND to a full honours degree in Electrical Engineering or Building Services Engineering. Opens doors to chartered engineer (CEng) registration and senior design roles. Available part-time at many universities.',
    courses: [
      'Advanced Electrical Design',
      'Research Methods',
      'Project Management',
      'Building Services Engineering',
      'Sustainable Energy Systems',
      'Individual Project/Dissertation',
    ],
  },
  {
    title: 'Renewable Energy Courses',
    level: 'Specialist',
    duration: '1–5 days',
    cost: '£300–£1,500',
    description:
      'Short specialist courses covering solar PV, heat pumps, battery storage, and grid connection. High demand with strong salary uplift potential.',
    courses: [
      'Solar PV Installation',
      'Heat Pump Systems',
      'Battery Storage (BESS)',
      'Grid Connection (G99/G100)',
      'MCS Certification',
    ],
  },
  {
    title: 'Smart Home Technology',
    level: 'Emerging',
    duration: '2–5 days',
    cost: '£500–£1,200',
    description:
      'Hands-on training in home automation, IoT integration, smart lighting, and security systems. A growing market with premium service rates.',
    courses: [
      'Home Automation Systems',
      'IoT Integration',
      'Smart Lighting Design',
      'Security Systems',
      'Troubleshooting & Diagnostics',
    ],
  },
  {
    title: 'Electric Vehicle Charging',
    level: 'High Growth',
    duration: '1–3 days',
    cost: '£400–£800',
    description:
      'Practical workshops covering EV charging technologies, installation, testing, and business development. Sector growing rapidly ahead of the 2035 petrol/diesel ban.',
    courses: [
      'EV Technologies Overview',
      'Installation & Commissioning',
      'Safety & Testing',
      'Commercial Installations',
      'Business Development',
    ],
  },
  {
    title: 'Industrial & Automation',
    level: 'Specialist',
    duration: '3–10 days',
    cost: '£800–£3,000',
    description:
      'Training in PLC programming, motor control, building management systems, and industrial maintenance. Higher salary brackets for qualified specialists.',
    courses: [
      'PLC Programming (Siemens/AB)',
      'Motor Control Systems',
      'Building Management Systems',
      'Industrial Maintenance',
    ],
  },
  {
    title: 'Health & Safety',
    level: 'Essential',
    duration: '1–5 days',
    cost: '£200–£800',
    description:
      'Keep your safety qualifications current. Covers SSSTS/SMSTS, first aid, working at height, and asbestos awareness. Required for most commercial and industrial sites.',
    courses: [
      'SSSTS/SMSTS',
      'First Aid at Work',
      'Working at Height',
      'Asbestos Awareness',
      'Manual Handling',
    ],
  },
];

const planningSteps = [
  {
    step: 1,
    title: 'Assess Your Current Skills',
    description:
      'Identify gaps between where you are and where you want to be. Review your qualifications, experience, and the skills your target role requires.',
  },
  {
    step: 2,
    title: 'Research the Market',
    description:
      'Look at job adverts in your target area. What qualifications and skills are employers asking for? Which specialisms are in highest demand locally?',
  },
  {
    step: 3,
    title: 'Plan Your Funding',
    description:
      'Explore all funding options before committing. Advanced Learner Loans, employer sponsorship, professional body grants, and the Apprenticeship Levy can significantly reduce your costs.',
  },
  {
    step: 4,
    title: 'Choose Your Provider',
    description:
      'Compare course content, delivery methods, and pass rates. Check reviews from other electricians. Consider part-time, evening, or distance learning options that fit around work.',
  },
  {
    step: 5,
    title: 'Commit and Complete',
    description:
      'Set a realistic study schedule and stick to it. Tell your employer and family about your plans. Track your progress and celebrate milestones along the way.',
  },
];

const regionalInsights = [
  {
    region: 'London & South East',
    projects: [
      'Old Oak Common HS2 station — major infrastructure build requiring thousands of electrical workers',
      'Thames Tideway Tunnel — ongoing infrastructure with specialist electrical requirements',
      'Residential retrofit programme — energy efficiency upgrades across social housing',
    ],
    outlook:
      'Premium rates but high competition. Strong demand for commercial and infrastructure specialists.',
  },
  {
    region: 'North West',
    projects: [
      'Manchester housing growth — thousands of new homes requiring domestic electricians',
      'Data centre corridor — hyperscale facilities along the M62 corridor',
      'Industrial decarbonisation — factory upgrades across Greater Manchester and Merseyside',
    ],
    outlook: 'Growing demand with competitive salaries. Strong industrial and commercial markets.',
  },
  {
    region: 'Midlands',
    projects: [
      'HS2 Birmingham interchange — major transport infrastructure project',
      'Gigafactory development — electric vehicle battery manufacturing facilities',
      'Smart motorway upgrades — M6, M42, and M1 electrical infrastructure',
    ],
    outlook: 'Diverse opportunities across domestic, commercial, and industrial sectors.',
  },
  {
    region: 'South West',
    projects: [
      "Hinkley Point C — Europe's largest construction site requiring thousands of electrical specialists",
      'Offshore wind connections — Bristol Channel and Celtic Sea wind farm infrastructure',
      'Tourism sector upgrades — hospitality and leisure electrical modernisation',
    ],
    outlook: 'Hinkley Point C driving exceptional demand for nuclear-qualified electricians.',
  },
  {
    region: 'Scotland',
    projects: [
      'ScotWind offshore programme — massive offshore wind development',
      'Edinburgh and Glasgow housing — significant residential growth',
      'Renewable energy hub — hydrogen and BESS development across the Highlands',
    ],
    outlook: 'Renewable energy creating strong specialist demand, especially offshore.',
  },
  {
    region: 'Wales & Northern Ireland',
    projects: [
      'Celtic Freeport development — Port Talbot industrial regeneration',
      'Belfast regeneration — city centre commercial and residential development',
      'Rural electrification — broadband and power upgrades in remote areas',
    ],
    outlook:
      'Emerging opportunities with government investment in infrastructure and renewable energy.',
  },
];

const successStories = [
  {
    name: 'Sarah Mitchell',
    location: 'Bristol',
    role: 'Solar PV Specialist',
    change: '£28k → £39k (+40%)',
    path: 'Completed City & Guilds 2399 PV Design and MCS certification part-time over 6 months while working as a domestic electrician.',
    detail:
      'Now leads a four-person solar installation team for a renewable energy company. Handles system design, installation, and DNO applications.',
    tip: 'Start with one renewable cert — it opens the door to the whole green energy sector.',
  },
  {
    name: 'James Okafor',
    location: 'Manchester',
    role: 'EV Charging Business Owner',
    change: '£32k → £52k + own business',
    path: 'Invested £1,200 in City & Guilds 2919 EV Charging and Smart Charging certifications. Built a client base through local EV owner groups.',
    detail:
      'Started his own EV charging installation company within 2 years. Now employs two electricians and covers the entire North West.',
    tip: 'The EV market is still young enough that you can build a strong local reputation quickly.',
  },
  {
    name: 'Mike Thompson',
    location: 'Birmingham',
    role: 'Automation Engineer',
    change: '£35k → £58k',
    path: 'Completed HND in Electrical Engineering part-time over 2 years at Aston University, then added Siemens PLC programming certification.',
    detail:
      'Transitioned from domestic work to industrial automation at a major car manufacturer. Now programmes robotic welding cells and conveyor systems.',
    tip: 'The HND was hard work alongside a full-time job, but it opened doors I could never have accessed otherwise.',
  },
  {
    name: 'Lisa Chen',
    location: 'London',
    role: 'Training Manager',
    change: '£36k → £45k + benefits',
    path: 'Topped up her HND to a BEng (Hons) via distance learning, then completed a Level 4 Education & Training certificate.',
    detail:
      'Now manages the electrical training programme for a major M&E contractor. Develops curriculum, assesses apprentices, and leads CPD sessions.',
    tip: 'Teaching others deepens your own understanding — and the work-life balance is much better than site work.',
  },
  {
    name: 'David Hughes',
    location: 'Cardiff',
    role: 'Data Centre Specialist',
    change: '£34k → £62k',
    path: 'Gained HV Switching qualification and CDCDP certification after 5 years in commercial electrical work.',
    detail:
      'Works at a hyperscale data centre in South Wales. Specialises in UPS systems, PDU installation, and critical power distribution. Regular overtime pushes total package above £70k.',
    tip: 'Data centres are one of the best-kept secrets in our trade — the pay and conditions are exceptional.',
  },
  {
    name: 'Priya Sharma',
    location: 'Leeds',
    role: 'Electrical Designer (IEng)',
    change: '£30k → £55k',
    path: 'Completed HNC part-time, then topped up to BEng via Open University. Achieved IEng registration through the IET after 3 years of logged experience.',
    detail:
      'Designs electrical systems for new-build commercial projects at a building services consultancy. Works in AutoCAD and Revit, rarely picks up a screwdriver.',
    tip: 'If you enjoy the technical side more than the physical, design is a brilliant career path with excellent earning potential.',
  },
];

const keyTrends = [
  {
    trend: 'Net Zero Transition',
    detail:
      'The UK government target of net zero by 2050 is driving massive investment in renewable energy, EV infrastructure, and energy efficiency. Electricians with green skills will be in highest demand.',
  },
  {
    trend: 'Smart Buildings',
    detail:
      'Building automation, IoT integration, and smart energy management are becoming standard in new-build commercial and high-end residential properties.',
  },
  {
    trend: 'Electrification of Heat',
    detail:
      'The phase-out of gas boilers in new builds from 2025 is creating huge demand for heat pump installation skills. MCS-certified installers are already in short supply.',
  },
  {
    trend: 'Data Centre Growth',
    detail:
      'The UK data centre market is expanding rapidly. These facilities require specialist electrical skills including HV, UPS systems, and precision power distribution.',
  },
];

const ContinuingEducation = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Continuing Education</h1>
      </div>

      {/* Why Continue Learning */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <h2 className="text-base font-semibold text-white">Why Continue Learning?</h2>
      </div>

      <div className="space-y-3">
        {[
          {
            title: 'Stay Current',
            detail:
              'The 18th Edition was last updated in 2022. Technology and regulations evolve constantly — electricians who keep learning stay relevant and employable.',
          },
          {
            title: 'Higher Earnings',
            detail:
              'Specialist training adds £8,000–£15,000 annually. That is a 30–50% salary increase for qualified specialists compared to general electricians.',
          },
          {
            title: 'Future-Proof Your Career',
            detail:
              'The UK needs 1.2 million green jobs by 2030. EV, solar, heat pump, and battery storage skills are in critical demand now and will only grow.',
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

      {/* Course Categories */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Course Categories</h2>
      </div>

      <div className="space-y-3">
        {courseCategories.map((cat) => (
          <Card key={cat.title} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-blue-400 text-sm">{cat.title}</h3>
                <span className="text-xs font-medium text-white bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {cat.level}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{cat.description}</p>
              <div className="flex items-center gap-3 text-xs text-white">
                <span>{cat.duration}</span>
                <span>·</span>
                <span>{cat.cost}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.courses.map((course) => (
                  <span
                    key={course}
                    className="text-xs text-white bg-white/10 border border-white/10 rounded px-2 py-0.5"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Planning Steps */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">5-Step Course Planning</h2>
      </div>

      <div className="space-y-3">
        {planningSteps.map((item) => (
          <Card key={item.step} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="font-semibold text-green-400 text-sm">{item.title}</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funding Overview */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Funding Overview</h2>
      </div>

      <Card className="border-yellow-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <p className="text-white text-sm leading-relaxed">
            Many courses can be partially or fully funded. Understanding your options can save you
            thousands of pounds.
          </p>
          <ul className="space-y-2">
            {[
              'Apprenticeship Levy — up to £23,000 for Level 3 Electrical Installation (funding band). Employers with a pay bill over £3m pay into the levy; smaller employers get 95% government co-investment.',
              'Advanced Learner Loans — cover full course fees for Level 3–6 qualifications including degree top-ups. Repay only when earning over £25,000/year.',
              'Employer sponsorship — many larger contractors fund training as part of staff development. Always ask before paying yourself.',
              'IET Education Grants — £500–£2,000 for IET members pursuing further education.',
              'Skills Bootcamps — free government-funded intensive courses in specific technical areas.',
              'CITB Training Grants — construction industry training board grants for eligible employers and individuals.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Market Trends */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-orange-400" />
        <h2 className="text-base font-semibold text-white">Key Market Trends</h2>
      </div>

      <div className="space-y-3">
        {keyTrends.map((item) => (
          <Card key={item.trend} className="border-orange-500/20 bg-white/5">
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-orange-400 text-sm">{item.trend}</h3>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regional Insights */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Regional Insights</h2>
      </div>

      <div className="space-y-3">
        {regionalInsights.map((region) => (
          <Card key={region.region} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-blue-400 text-sm">{region.region}</h3>
              <div className="space-y-2">
                {region.projects.map((project) => (
                  <div key={project} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    {project}
                  </div>
                ))}
              </div>
              <p className="text-white text-xs leading-relaxed">{region.outlook}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stories */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">Success Stories</h2>
      </div>

      <div className="space-y-3">
        {successStories.map((story) => (
          <Card key={story.name} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-400 text-sm">
                  {story.name} — {story.role}
                </h3>
                <span className="text-xs font-medium text-white bg-green-500/20 border border-green-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {story.change}
                </span>
              </div>
              <p className="text-white text-xs">{story.location}</p>
              <p className="text-white text-sm leading-relaxed">{story.detail}</p>
              <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-white text-xs leading-relaxed">
                  <span className="font-semibold">Education path:</span> {story.path}
                </p>
              </div>
              <p className="text-white text-xs leading-relaxed">
                <span className="font-semibold">Top tip:</span> {story.tip}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Course information and funding details based on ESFA guidance, IET professional
            standards, and current UK electrical industry data. Costs and availability vary by
            provider and region. Check with individual training providers for current pricing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducation;
