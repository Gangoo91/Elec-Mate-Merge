import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

const Section = ({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {eyebrow}
      </span>
      {description && <p className="text-[13px] text-white/70">{description}</p>}
    </div>
    {children}
  </div>
);

const SalaryProgressionChart = () => {
  const isMobile = useIsMobile();

  const salaryData = [
    { year: 'Year 1', min: 15000, max: 20000, average: 17500, label: 'Y1' },
    { year: 'Year 2', min: 20000, max: 25000, average: 22500, label: 'Y2' },
    { year: 'Year 3', min: 26000, max: 32000, average: 29000, label: 'Y3' },
    { year: 'Year 4', min: 30000, max: 38000, average: 34000, label: 'Y4' },
    { year: 'Qualified', min: 34000, max: 50000, average: 42000, label: 'Qual' },
  ];

  const regionalData = [
    { region: 'London', year1: 19000, year2: 24000, year3: 31000, year4: 38000, qualified: 46000 },
    {
      region: 'Southeast',
      year1: 17500,
      year2: 22500,
      year3: 29500,
      year4: 36000,
      qualified: 44000,
    },
    {
      region: 'Midlands',
      year1: 17000,
      year2: 21500,
      year3: 28500,
      year4: 35000,
      qualified: 42000,
    },
    { region: 'North', year1: 16500, year2: 20500, year3: 27000, year4: 33000, qualified: 40000 },
    {
      region: 'Scotland',
      year1: 16500,
      year2: 20500,
      year3: 27000,
      year4: 32000,
      qualified: 38000,
    },
  ];

  const careerEarnings = [
    { role: 'Employed electrician', salary: '£32k - £42k', growth: 'Steady' },
    { role: 'Self-employed', salary: '£40k - £65k', growth: 'Variable' },
    { role: 'Industrial specialist', salary: '£38k - £52k', growth: 'Strong' },
    { role: 'Renewables specialist', salary: '£35k - £50k', growth: 'Fast' },
    { role: 'Electrical supervisor', salary: '£42k - £55k', growth: 'Good' },
    { role: 'Project manager', salary: '£50k - £70k', growth: 'Excellent' },
  ];

  const benefitsData = [
    {
      title: 'Company van',
      description: 'Many employers provide a van — represents value in personal use.',
      typical: 'Common after Year 2',
    },
    {
      title: 'Tools provided',
      description: 'Power tools, test equipment, and specialist gear.',
      typical: 'Usually from day one',
    },
    {
      title: 'Pension',
      description: 'Employer contributions typically 3-5% of salary.',
      typical: 'Required by law',
    },
    {
      title: 'Overtime',
      description: 'Time-and-a-half to double-time rates for extra hours.',
      typical: 'Variable additional earnings',
    },
    {
      title: 'Training',
      description: 'Continued professional development and certifications paid for.',
      typical: 'Part of total package',
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ color: string; name: string; value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-white/[0.06] bg-elec-gray p-3 shadow-lg">
          <p className="text-[13px] text-white mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center gap-2 text-[12px]">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-white/55">{entry.name}:</span>
              <span className="text-white font-mono">£{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-5">
      <Section
        eyebrow="Apprenticeship salary progression"
        description="Indicative salary ranges throughout a typical 4-year apprenticeship"
      >
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salaryData}>
              <defs>
                <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey={isMobile ? 'label' : 'year'}
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tickFormatter={(value) => `£${value / 1000}k`}
                tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 45 : 60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="max"
                stroke="transparent"
                fill="url(#colorRange)"
                name="Maximum"
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#EF4444"
                strokeWidth={2}
                name="Minimum"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: isMobile ? 3 : 4 }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#10B981"
                strokeWidth={3}
                name="Average"
                dot={{ fill: '#10B981', strokeWidth: 2, r: isMobile ? 4 : 5 }}
              />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Maximum"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: isMobile ? 3 : 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 mt-2 text-[12px] flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-white/85">Minimum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-white/85">Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-white/85">Maximum</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          {[
            { label: 'Year 1 average', value: '£17.5k' },
            { label: 'Qualified average', value: '£42k' },
            { label: '4-year growth', value: 'Significant' },
            { label: 'Top earners', value: '£50k+' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {s.label}
              </span>
              <div className="text-[16px] font-semibold text-white">{s.value}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Regional salary comparison"
        description="How salaries vary across different UK regions"
      >
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalData} barCategoryGap={isMobile ? '15%' : '20%'}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="region"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF', fontSize: isMobile ? 9 : 12 }}
              />
              <YAxis
                stroke="#9CA3AF"
                tickFormatter={(value) => `£${value / 1000}k`}
                tick={{ fill: '#9CA3AF', fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 45 : 60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="year1" fill="#EF4444" name="Year 1" radius={[2, 2, 0, 0]} />
              <Bar dataKey="year2" fill="#F59E0B" name="Year 2" radius={[2, 2, 0, 0]} />
              <Bar dataKey="year3" fill="#10B981" name="Year 3" radius={[2, 2, 0, 0]} />
              <Bar dataKey="year4" fill="#3B82F6" name="Year 4" radius={[2, 2, 0, 0]} />
              <Bar dataKey="qualified" fill="#8B5CF6" name="Qualified" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-3 sm:gap-4 mt-2 text-[12px] flex-wrap">
          {[
            { c: 'bg-red-500', l: 'Y1' },
            { c: 'bg-amber-500', l: 'Y2' },
            { c: 'bg-green-500', l: 'Y3' },
            { c: 'bg-blue-500', l: 'Y4' },
            { c: 'bg-purple-500', l: 'Qualified' },
          ].map((p) => (
            <div key={p.l} className="flex items-center gap-1">
              <div className={`w-2 h-2 ${p.c} rounded`} />
              <span className="text-white/85">{p.l}</span>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-white/70 leading-relaxed pt-2">
          London salaries are typically higher due to cost of living, but other regions can offer
          better value when accounting for housing costs.
        </p>
      </Section>

      <Section
        eyebrow="Career path earnings"
        description="What you could earn after qualifying"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {careerEarnings.map((career, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[14px] text-white">{career.role}</span>
                <span className="text-[10px] text-white/55 font-mono">{career.growth}</span>
              </div>
              <p className="text-[16px] text-white/85 font-semibold">{career.salary}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Benefits beyond salary"
        description="Your total compensation package extends past base pay"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {benefit.title}
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">{benefit.description}</p>
              <p className="text-[12px] text-white/55">{benefit.typical}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Overtime impact example"
        description="How overtime can add to your earnings"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Scenario: qualified electrician
            </span>
            <div className="space-y-1.5 text-[14px] text-white/85">
              <div className="flex justify-between">
                <span className="text-white/55">Base salary</span>
                <span>£35,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">Standard week</span>
                <span>40 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">Overtime rate</span>
                <span>1.5x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">Weekly overtime</span>
                <span>8 hours average</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Potential total earnings
            </span>
            <div className="space-y-1.5 text-[14px] text-white/85">
              <div className="flex justify-between">
                <span className="text-white/55">Base salary</span>
                <span>£35,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/55">Annual overtime</span>
                <span>+£9,700</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                <span>Total annual earnings</span>
                <span className="font-semibold">£44,700</span>
              </div>
            </div>
            <p className="text-[11px] text-white/55 font-mono">
              (£35,000 ÷ 52 ÷ 40) × 1.5 × 8 hours × 48 weeks
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Key salary takeaways">
        <ul className="space-y-1.5">
          {[
            'Your salary more than doubles during your apprenticeship',
            'Specialists and self-employed can earn significantly more',
            'Benefits like van and tools add to total package value',
            'Overtime can add meaningfully to annual earnings',
          ].map((item, idx) => (
            <li
              key={idx}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default SalaryProgressionChart;
