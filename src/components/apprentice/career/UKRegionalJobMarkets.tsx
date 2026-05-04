import { regionalJobMarkets } from './ukCareerProgressionData';

const UKRegionalJobMarkets = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Regional markets
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          UK regional job markets for electricians
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Regional analysis of job opportunities, pay rates and growth sectors across the UK.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {regionalJobMarkets.map((region) => (
          <div
            key={region.region}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {region.job_availability} demand
                </span>
                <h3 className="text-[17px] font-semibold text-white leading-tight">
                  {region.region}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Daily rates
                </span>
                <div className="text-[13px] text-white">{region.average_rates}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Cost of living
                </span>
                <div className="text-[13px] text-white">{region.cost_of_living}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Job market
                </span>
                <div className="text-[13px] text-white">{region.job_availability}</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Key employment sectors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {region.key_sectors.map((sector, idx) => (
                  <span
                    key={idx}
                    className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                High growth areas
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {region.growth_areas.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-[13px] text-white/85"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Major employers
              </span>
              <div className="space-y-1.5">
                {region.major_employers.slice(0, 4).map((employer, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[13px] text-white/85">
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{employer}</span>
                  </div>
                ))}
                {region.major_employers.length > 4 && (
                  <p className="text-[12px] text-white/55">
                    +{region.major_employers.length - 4} more major employers
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5 text-[13px] text-white/85">
              <div>
                <span className="text-white/55">Transport links: </span>
                <span>{region.transport_links}</span>
              </div>
              <div>
                <span className="text-white/55">Best for: </span>
                <span>
                  {region.job_availability === 'High'
                    ? 'High job security, diverse opportunities'
                    : region.job_availability === 'Good'
                      ? 'Steady work, good prospects'
                      : 'Specialised roles, competitive market'}
                </span>
              </div>
              <div>
                <span className="text-white/55">Career tip: </span>
                <span>
                  {region.cost_of_living === 'Very High'
                    ? 'Consider contractor rates to offset living costs'
                    : region.cost_of_living === 'High'
                      ? 'Good balance of rates and opportunities'
                      : 'Lower costs can mean higher disposable income'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          UK market insights
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Market trends</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Net Zero targets accelerating demand</li>
              <li>Heat pump installations ramping up</li>
              <li>EV charging infrastructure expanding</li>
              <li>Data centres expanding across the UK</li>
              <li>Grid modernisation creating specialist roles</li>
              <li>Building automation becoming standard</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Best regions for</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>New starters: Midlands, North (lower cost)</li>
              <li>High earners: London, South East</li>
              <li>Work-life balance: Scotland, Wales</li>
              <li>Contractors: Major cities, infrastructure</li>
              <li>Specialists: EV/Solar anywhere, data centres</li>
              <li>Nuclear: Cumbria, Suffolk, Somerset</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Outlook</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Skills shortage continues to push rates up</li>
              <li>Green tech creating salary premiums</li>
              <li>Regional levelling up: northern investment</li>
              <li>Continuous upskilling required</li>
              <li>Apprenticeship levy driving training</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UKRegionalJobMarkets;
