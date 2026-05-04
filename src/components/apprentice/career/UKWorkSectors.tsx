import { ukWorkSectors } from './ukCareerProgressionData';

const UKWorkSectors = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Work sectors
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          UK electrical work sectors
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Overview of electrical work sectors in the UK, including pay rates, growth prospects and
          career opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {ukWorkSectors.map((sector) => (
          <div
            key={sector.name}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {sector.growth_outlook}
              </span>
              <h3 className="text-[17px] font-semibold text-white leading-tight">
                {sector.name}
              </h3>
            </div>

            <p className="text-[14px] text-white/85 leading-relaxed">{sector.description}</p>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Typical daily rates
              </span>
              <div className="text-[16px] font-semibold text-white">{sector.typical_pay}</div>
              <p className="text-[12px] text-white/55">
                {sector.growth_outlook === 'Rapid growth' &&
                  'Premium rates due to high demand'}
                {sector.growth_outlook === 'Strong' &&
                  'Competitive rates with good progression'}
                {sector.growth_outlook === 'Growing' && 'Steady rates with growth potential'}
                {sector.growth_outlook === 'Stable' && 'Consistent rates across the sector'}
                {sector.growth_outlook === 'Cyclical' && 'Rates vary with market conditions'}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Essential skills
              </span>
              <ul className="space-y-1.5">
                {sector.key_skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Career opportunities
              </span>
              <p className="text-[13px] text-white/85 leading-relaxed">
                {sector.name.includes('Renewable')
                  ? 'Emerging field with rapid expansion.'
                  : sector.name.includes('Industrial')
                    ? 'Large-scale projects and maintenance.'
                    : sector.name.includes('Commercial')
                      ? 'Diverse business environments.'
                      : sector.name.includes('Domestic')
                        ? 'Direct customer interaction, flexible work.'
                        : sector.name.includes('Data')
                          ? 'High-tech, precision work environment.'
                          : sector.name.includes('Rail')
                            ? 'Infrastructure projects, strict safety standards.'
                            : sector.name.includes('Emergency')
                              ? 'Critical response, high responsibility.'
                              : 'Specialised technical expertise required.'}
              </p>
              <p className="text-[12px] text-white/55">
                {sector.growth_outlook === 'Rapid growth'
                  ? 'Excellent long-term prospects'
                  : sector.growth_outlook === 'Strong'
                    ? 'Good career advancement opportunities'
                    : sector.growth_outlook === 'Growing'
                      ? 'Steady progression available'
                      : sector.growth_outlook === 'Stable'
                        ? 'Reliable, consistent work'
                        : 'Variable demand cycles'}
              </p>
            </div>

            <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-baseline justify-between">
              <span className="text-[12px] text-white/55">Growth outlook</span>
              <span className="text-[12px] text-white/85">{sector.growth_outlook}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Sector analysis & career guidance
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Highest growth sectors</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Renewable Energy & EV Charging</li>
              <li>Data Centres & Smart Buildings</li>
              <li>Healthcare & Life Sciences</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Best for new electricians</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Domestic — learn customer skills</li>
              <li>Commercial — varied experience</li>
              <li>Maintenance — diagnostic skills</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Specialisation tips</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Choose growth sectors for future-proofing</li>
              <li>Combine sectors for diverse skill set</li>
              <li>Consider regional sector strengths</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UKWorkSectors;
