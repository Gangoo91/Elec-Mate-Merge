import { ukCareerLevels } from './ukCareerProgressionData';

const UKCareerProgressionTimeline = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Career timeline
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          UK electrical career progression
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Progression path for UK electricians following the JIB grading scheme with regional
          salary data.
        </p>
      </div>

      <div className="space-y-6">
        {ukCareerLevels.map((level) => (
          <div
            key={level.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {level.jib_grade} · {level.typical_experience}
                </span>
                <h3 className="text-[18px] font-semibold text-white leading-tight">
                  {level.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {level.progression_timeline}
                </span>
                {level.time_to_achieve && (
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {level.time_to_achieve}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Regional salaries (annual)
                </span>
                <div className="space-y-1 text-[13px] text-white/85">
                  <div className="flex justify-between">
                    <span>London</span>
                    <span className="text-white font-mono">{level.salary_ranges.london}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>South East</span>
                    <span className="text-white font-mono">{level.salary_ranges.south_east}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Midlands</span>
                    <span className="text-white font-mono">{level.salary_ranges.midlands}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>North</span>
                    <span className="text-white font-mono">{level.salary_ranges.north}</span>
                  </div>
                </div>
                <p className="text-[11px] text-white/55 pt-1 border-t border-white/[0.06]">
                  Rates vary by experience and specialisation.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Essential qualifications
                </span>
                <div className="space-y-2">
                  {level.key_qualifications.slice(0, 4).map((qual, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between gap-2 text-[13px]"
                    >
                      <div>
                        <span className="text-white/55">{qual.level}</span>
                        <div className="text-white/85">{qual.name}</div>
                      </div>
                      {qual.code && (
                        <span className="text-[11px] text-white/85 px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                          {qual.code}
                        </span>
                      )}
                    </div>
                  ))}
                  {level.key_qualifications.length > 4 && (
                    <div className="text-[12px] text-white/55">
                      +{level.key_qualifications.length - 4} more qualifications
                    </div>
                  )}
                </div>
              </div>

              {(level.prerequisites || level.day_rates || level.cpd) && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Requirements & CPD
                  </span>
                  {level.prerequisites && level.prerequisites.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[12px] text-white/55">Prerequisites</p>
                      <ul className="space-y-1.5">
                        {level.prerequisites.map((p, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[13px] text-white/85"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                            <span>
                              {p.name}
                              {p.code && (
                                <span className="ml-1 text-[11px] text-white/85 px-1.5 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                                  {p.code}
                                </span>
                              )}
                              {p.mandatory ? ' · mandatory' : ' · recommended'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {level.day_rates && (
                    <div className="flex flex-wrap gap-1.5">
                      {level.day_rates.employed && (
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                          Employed: {level.day_rates.employed}
                        </span>
                      )}
                      {level.day_rates.contractor && (
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                          Contractor: {level.day_rates.contractor}
                        </span>
                      )}
                    </div>
                  )}
                  {level.cpd && (
                    <div className="space-y-1">
                      <p className="text-[12px] text-white/55">CPD</p>
                      <p className="text-[13px] text-white/85">{level.cpd.interval}</p>
                      {level.cpd.requirements && (
                        <ul className="space-y-1.5">
                          {level.cpd.requirements.map((r, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-[13px] text-white/85"
                            >
                              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Work opportunities
                </span>
                <div>
                  <p className="text-[12px] text-white/55 mb-1.5">Key sectors</p>
                  <div className="flex flex-wrap gap-1.5">
                    {level.work_sectors.slice(0, 3).map((sector, idx) => (
                      <span
                        key={idx}
                        className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-white/55 mb-1">Career prospects</p>
                  <p className="text-[13px] text-white/85 leading-relaxed">
                    {level.title.includes('Apprentice')
                      ? 'Foundation level with structured learning pathway.'
                      : level.title.includes('Improver')
                        ? 'Developing skills towards full qualification.'
                        : level.title.includes('Electrician')
                          ? 'Fully qualified (Gold Card) with independent working.'
                          : level.title.includes('Approved')
                            ? 'Industry-recognised with testing and certification.'
                            : 'Advanced level with leadership opportunities.'}
                  </p>
                </div>
              </div>

              {(level.branches || level.portfolio_evidence || level.regional_notes) && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Progress options & evidence
                  </span>
                  {level.branches && level.branches.length > 0 && (
                    <div>
                      <p className="text-[12px] text-white/55 mb-1.5">Branching paths</p>
                      <div className="flex flex-wrap gap-1.5">
                        {level.branches.map((b) => (
                          <span
                            key={b.id}
                            className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                          >
                            {b.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {level.portfolio_evidence && level.portfolio_evidence.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[12px] text-white/55">Portfolio evidence</p>
                      <ul className="space-y-1.5">
                        {level.portfolio_evidence.map((e, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-[13px] text-white/85"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {level.regional_notes && (
                    <p className="text-[13px] text-white/70">{level.regional_notes}</p>
                  )}
                </div>
              )}

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2 lg:col-span-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Next steps to progress
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {level.next_steps.slice(0, 6).map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-[13px] text-white/85"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                {level.next_steps.length > 6 && (
                  <p className="text-[12px] text-white/55">
                    +{level.next_steps.length - 6} additional requirements
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Career notes
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Progression timeline</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Apprentice to Improver: 3-4 years (apprenticeship)</li>
              <li>Improver to Electrician: 0.5-2 years (NVQ3 + AM2)</li>
              <li>Electrician to Approved: 1-3 years (with 2391 + experience)</li>
              <li>Approved to Supervisor/Technician: 2-4 years</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-[12px] text-white/55">Salary factors</p>
            <ul className="space-y-1 text-[13px] text-white/85">
              <li>Location significantly affects rates</li>
              <li>Specialisations command premium rates</li>
              <li>Contractor rates typically 20-40% higher</li>
              <li>Industry sector impacts earning potential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UKCareerProgressionTimeline;
