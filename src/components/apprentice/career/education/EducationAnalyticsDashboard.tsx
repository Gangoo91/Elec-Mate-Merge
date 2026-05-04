interface EducationAnalytics {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  averageEmploymentRate: number;
  averageStartingSalary: string;
  highDemandPrograms: number;
  fundingOptionsAvailable: number;
  topCategories: Array<{ name: string; count: number }>;
}

const educationAnalytics: EducationAnalytics = {
  totalCourses: 250,
  totalProviders: 85,
  averageRating: 4.7,
  averageEmploymentRate: 94,
  averageStartingSalary: '£28,000 - £35,000',
  highDemandPrograms: 45,
  fundingOptionsAvailable: 12,
  topCategories: [
    { name: "Bachelor's degrees", count: 89 },
    { name: 'HNC / HND', count: 67 },
    { name: "Master's degrees", count: 45 },
    { name: 'Professional certs', count: 32 },
    { name: 'Foundation degrees', count: 17 },
  ],
};

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {label}
    </span>
    <div className="text-[18px] sm:text-[20px] font-semibold text-white">{value}</div>
  </div>
);

const Section = ({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {eyebrow}
    </span>
    <div>{children}</div>
  </div>
);

const EducationAnalyticsDashboard = () => {
  return (
    <Section eyebrow="UK education market insights">
      <div className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Available programmes" value={educationAnalytics.totalCourses} />
          <Stat label="Education providers" value={educationAnalytics.totalProviders} />
          <Stat label="Average rating" value={educationAnalytics.averageRating} />
          <Stat label="Employment rate" value={`${educationAnalytics.averageEmploymentRate}%`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              High demand
            </span>
            <div className="text-[20px] font-semibold text-white">
              {educationAnalytics.highDemandPrograms}
            </div>
            <p className="text-[12px] text-white/55">programmes in high demand</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Funding available
            </span>
            <div className="text-[20px] font-semibold text-white">
              {educationAnalytics.fundingOptionsAvailable}
            </div>
            <p className="text-[12px] text-white/55">different funding options</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Starting salary
            </span>
            <div className="text-[16px] font-semibold text-white">
              {educationAnalytics.averageStartingSalary}
            </div>
            <p className="text-[12px] text-white/55">average graduate salary</p>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Most popular categories
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {educationAnalytics.topCategories.map((category, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span className="text-[14px] text-white/85">{category.name}</span>
                <span className="text-[12px] text-white/55 font-mono">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            UK education trends
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] text-white/85 leading-relaxed">
            <div>
              <h5 className="text-white mb-2">Growth areas</h5>
              <ul className="space-y-1.5">
                <li>Renewable energy programmes</li>
                <li>Digital engineering courses</li>
                <li>Part-time and flexible study</li>
                <li>Work-based learning pathways</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white mb-2">Industry partnerships</h5>
              <ul className="space-y-1.5">
                <li>Most programmes have employer links</li>
                <li>Strong post-graduation employment rates</li>
                <li>Salary uplift typical post-qualification</li>
                <li>Many receive job offers before graduation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EducationAnalyticsDashboard;
