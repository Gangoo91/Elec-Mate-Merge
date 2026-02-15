import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle } from 'lucide-react';

const careerPaths = [
  {
    title: 'Domestic Electrician',
    salary: '£28,000–£38,000',
    timeframe: '0–2 years post-qualification',
    demand: 'High',
    description:
      'Install, maintain, and repair electrical systems in residential properties. Work includes rewires, consumer unit upgrades, additional circuits, and fault finding.',
    dailyActivities: [
      'Travel between residential properties — typically 2–4 jobs per day',
      'First fix and second fix wiring on new builds and extensions',
      'Consumer unit upgrades and additional circuit installations',
      'Fault finding using test instruments — insulation resistance, continuity, RCD tests',
      'Completing electrical certificates (EIC, Minor Works) and customer handovers',
    ],
    requirements: ['18th Edition', 'AM2', 'Part P registration'],
    progression: 'Self-employment, property development, or specialisation',
  },
  {
    title: 'Commercial Electrician',
    salary: '£35,000–£48,000',
    timeframe: '2–5 years experience',
    demand: 'High',
    description:
      'Work on larger commercial projects including offices, retail, and public buildings. Involves containment systems, three-phase supplies, and fire alarm installations.',
    dailyActivities: [
      'Morning site briefing and toolbox talk with the project team',
      'Installing containment systems — trunking, tray, basket, and conduit runs',
      'Terminating three-phase distribution boards and sub-mains',
      'Fire alarm and emergency lighting installation and testing',
      'Reading and working from architect drawings and electrical schematics',
    ],
    requirements: ['18th Edition', 'AM2', 'CSCS card', 'IPAF (desirable)'],
    progression: 'Site supervisor, contracts manager, or project management',
  },
  {
    title: 'Industrial Electrician',
    salary: '£40,000–£58,000',
    timeframe: '3–7 years experience',
    demand: 'Medium',
    description:
      'Maintain and install electrical systems in factories, processing plants, and industrial facilities. Includes motor control, PLCs, and high-voltage systems.',
    dailyActivities: [
      'Planned preventive maintenance rounds — checking motors, switchgear, and controls',
      'Diagnosing faults on PLC-controlled machinery and production lines',
      'Motor starter and variable speed drive installation and commissioning',
      'Working in hazardous areas with CompEx-rated equipment',
      'Shutdown and maintenance planning with production managers',
    ],
    requirements: ['18th Edition', '2391', 'CompEx (hazardous areas)', 'PLC training'],
    progression: 'Maintenance manager, controls engineer, or consultancy',
  },
  {
    title: 'EV Charging Specialist',
    salary: '£38,000–£55,000',
    timeframe: '1–3 years + specialist certification',
    demand: 'Very High',
    description:
      'Install and commission electric vehicle charging infrastructure for domestic, commercial, and public locations. A rapidly growing sector driven by the 2035 petrol/diesel ban.',
    dailyActivities: [
      'Pre-installation site surveys — assessing supply capacity and cable routes',
      'Installing dedicated EV circuits from consumer units or distribution boards',
      'Mounting and wiring charge points — wall-mounted and pedestal units',
      'Commissioning smart chargers — WiFi setup, load management, OCPP configuration',
      'Completing installation certificates and customer handover documentation',
    ],
    requirements: ['18th Edition', 'City & Guilds 2919', 'EV infrastructure regulations'],
    progression: 'Fleet installations, charging network contracts, or EV consultancy',
  },
  {
    title: 'Battery Storage Specialist',
    salary: '£42,000–£60,000',
    timeframe: '2–4 years + specialist training',
    demand: 'Very High',
    description:
      'Design and install battery energy storage systems for residential and commercial applications. Combines electrical knowledge with renewable energy technology.',
    dailyActivities: [
      'System design reviews — sizing batteries, inverters, and grid connections',
      'DC cable installation and battery module mounting in plant rooms or garages',
      'Hybrid inverter wiring — connecting solar PV, battery, and grid supplies',
      'G99/G100 grid connection applications and DNO liaison',
      'Commissioning and handover — explaining monitoring apps to homeowners',
    ],
    requirements: ['18th Edition', 'MCS certification', 'G99/G100 grid connection'],
    progression: 'Energy consultant, grid-scale storage, or system design',
  },
  {
    title: 'Heat Pump Electrician',
    salary: '£40,000–£55,000',
    timeframe: '2–4 years + specialist certification',
    demand: 'Very High',
    description:
      'Install and commission air and ground source heat pump electrical systems. A key growth area as the UK transitions away from gas boilers.',
    dailyActivities: [
      'Electrical supply assessment — checking capacity for 16A or 32A heat pump circuits',
      'Dedicated circuit installation from consumer unit to outdoor heat pump unit',
      'Control wiring between indoor and outdoor units, buffer tanks, and cylinders',
      'Commissioning — verifying electrical parameters, flow rates, and COP readings',
      'MCS documentation and compliance certification for grant eligibility',
    ],
    requirements: ['18th Edition', 'MCS certification', 'F-Gas handling'],
    progression: 'Renewable energy consultant, MCS assessor, or training',
  },
  {
    title: 'Electrical Designer',
    salary: '£45,000–£70,000',
    timeframe: '5+ years + further education',
    demand: 'Medium',
    description:
      'Design electrical installations for new buildings and major refurbishments. Combines BS 7671 expertise with CAD skills and project coordination.',
    dailyActivities: [
      'Creating electrical layout drawings in AutoCAD or Revit',
      'Performing BS 7671 calculations — cable sizing, voltage drop, fault current',
      'Site visits to survey existing installations and verify as-built conditions',
      'Client and architect meetings — discussing design options and programme',
      'Reviewing contractor submissions and approving equipment specifications',
    ],
    requirements: ['18th Edition', '2391', 'HNC/HND or degree', 'CAD proficiency'],
    progression: 'Principal designer, consultancy director, or IEng/CEng registration',
  },
  {
    title: 'Inspection & Testing Specialist',
    salary: '£38,000–£55,000',
    timeframe: '3–5 years + specialist certification',
    demand: 'High',
    description:
      'Carry out periodic inspections, EICR reports, and testing of electrical installations. Essential for compliance and safety verification.',
    dailyActivities: [
      'Periodic inspection of commercial and domestic electrical installations',
      'Dead testing — continuity, insulation resistance, polarity, and earth fault loop',
      'Live testing — RCD operation times, Zs measurements, and PFC readings',
      'Writing EICR reports — documenting observations, coding defects (C1/C2/C3/FI)',
      'Client consultations — explaining findings and recommending remedial work',
    ],
    requirements: ['18th Edition', '2391', 'Competent person scheme membership'],
    progression: 'Approved inspector, training assessor, or consultancy',
  },
];

const progressionStages = [
  {
    stage: 1,
    title: 'Apprentice',
    duration: '3–4 years',
    salary: '£16,000–£22,000',
    description:
      'Learn the fundamentals through a combination of college study and on-site practical experience. Build core skills in installation, testing, and safe working practices.',
  },
  {
    stage: 2,
    title: 'Newly Qualified Electrician',
    duration: '0–2 years post-qualification',
    salary: '£28,000–£35,000',
    description:
      'Apply your training independently. Focus on building speed, confidence, and a reputation for quality work. Start thinking about specialisation.',
  },
  {
    stage: 3,
    title: 'Experienced Electrician',
    duration: '2–7 years qualified',
    salary: '£35,000–£50,000',
    description:
      'Take on more complex projects, mentor apprentices, and develop specialist skills. Consider further qualifications like the 2391 or specialist certifications.',
  },
  {
    stage: 4,
    title: 'Senior / Specialist',
    duration: '7+ years qualified',
    salary: '£45,000–£80,000+',
    description:
      'Lead teams, run your own business, or become a recognised specialist. Opportunities in management, consultancy, training, and design.',
  },
];

const salaryFactors = [
  {
    factor: 'Location',
    impact: 'High',
    detail:
      'London and the South East pay 15–25% more, but cost of living is higher. Regional hubs like Manchester and Birmingham also offer premium rates.',
  },
  {
    factor: 'Specialisation',
    impact: 'High',
    detail:
      'Specialist skills in EV, battery storage, or heat pumps can add £5,000–£15,000 to base salary. Niche skills command premium day rates.',
  },
  {
    factor: 'Employment Type',
    impact: 'Medium',
    detail:
      'Self-employed electricians can earn significantly more but carry business risk. Day rates of £200–£350 are common for experienced specialists.',
  },
  {
    factor: 'Industry Sector',
    impact: 'Medium',
    detail:
      'Industrial, data centres, and oil & gas sectors typically pay more than domestic work. Nuclear and offshore carry the highest premiums.',
  },
  {
    factor: 'Qualifications',
    impact: 'Medium',
    detail:
      'Additional certifications like 2391, CompEx, or HNC/HND directly increase earning potential and open doors to higher-paid roles.',
  },
];

const CareerPathways = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">Career Pathways</h1>
      </div>

      {/* Intro */}
      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            The UK electrical industry offers diverse career paths with strong earning potential.
            Whether you prefer domestic work, commercial projects, or cutting-edge renewable
            technology, there is a pathway that suits your interests and ambitions.
          </p>
        </CardContent>
      </Card>

      {/* Career Path Cards */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Career Paths</h2>
      </div>

      <div className="space-y-3">
        {careerPaths.map((path) => (
          <Card key={path.title} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-blue-400">{path.title}</h3>
                <span className="text-xs font-medium text-white bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-0.5 flex-shrink-0">
                  {path.demand} demand
                </span>
              </div>

              <p className="text-white text-sm leading-relaxed">{path.description}</p>

              <div>
                <p className="text-white text-xs font-semibold mb-1.5">Typical Day:</p>
                <div className="space-y-1">
                  {path.dailyActivities.map((activity) => (
                    <div key={activity} className="flex items-start gap-2 text-xs text-white">
                      <CheckCircle className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                      {activity}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Salary:</span>
                  <span className="text-white text-xs">{path.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Timeframe:</span>
                  <span className="text-white text-xs">{path.timeframe}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Progression:</span>
                  <span className="text-white text-xs">{path.progression}</span>
                </div>
              </div>

              <div>
                <p className="text-white text-xs font-semibold mb-1">Requirements:</p>
                <div className="flex flex-wrap gap-1">
                  {path.requirements.map((req) => (
                    <span
                      key={req}
                      className="text-xs text-white bg-white/10 border border-white/10 rounded px-2 py-0.5"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Career Progression Timeline */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">Career Progression Timeline</h2>
      </div>

      <div className="space-y-3">
        {progressionStages.map((stage) => (
          <Card key={stage.stage} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-400 font-bold text-sm">{stage.stage}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-green-400 text-sm">{stage.title}</h3>
                  <p className="text-white text-xs">
                    {stage.duration} · {stage.salary}
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed">{stage.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Factors Affecting Salary */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Factors Affecting Salary</h2>
      </div>

      <div className="space-y-3">
        {salaryFactors.map((item) => (
          <Card key={item.factor} className="border-yellow-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-yellow-400 text-sm">{item.factor}</h3>
                <span className="text-xs font-medium text-white bg-yellow-500/20 border border-yellow-500/30 rounded-full px-2 py-0.5">
                  {item.impact} impact
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Planning Your Career */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <h2 className="text-base font-semibold text-white">Planning Your Career</h2>
      </div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <p className="text-white text-sm leading-relaxed">
            Career planning is not a one-off exercise — it is something you should revisit regularly
            as you gain experience and the industry evolves. Consider these key points:
          </p>
          <ul className="space-y-2">
            {[
              'Identify which sectors interest you most and research the qualifications needed',
              'Talk to experienced electricians in your target specialisation',
              'Build a timeline of certifications you want to achieve over the next 3–5 years',
              'Consider whether you want to be employed, self-employed, or run a business',
              'Stay informed about industry trends — EV, renewables, and smart technology are growing fast',
              'Invest in professional skills alongside technical ones — communication and business acumen matter',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-blue-400 text-sm">Start Exploring This Week</h3>
          <p className="text-white text-sm leading-relaxed">
            Ask your supervisor or training officer which career path they started on and how their
            career has evolved. Shadow a colleague in a different specialism for a day if your
            employer allows it. The more exposure you get early on, the better your career decisions
            will be.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Salary data based on current UK electrical industry averages from JIB grade rates,
            recruitment data, and industry surveys. Actual salaries vary by region, employer, and
            individual experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathways;
