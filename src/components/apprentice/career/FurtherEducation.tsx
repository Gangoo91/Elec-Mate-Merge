const educationOptions = [
  {
    id: 1,
    title: 'HNC in Electrical Engineering',
    institution: 'UK Colleges',
    description:
      'Higher National Certificate qualification providing advanced electrical theory and practice.',
    level: 'Level 4',
    duration: '1-2 years (part-time options available)',
    entryRequirements: 'Level 3 qualification or relevant work experience',
    progressionOptions: 'HND, Foundation degree, or employment in technical roles',
    keyTopics: [
      'Electrical principles',
      'Engineering mathematics',
      'Digital electronics',
      'Project management',
    ],
    locations: ['Birmingham', 'Manchester', 'London', 'Glasgow', 'Cardiff'],
  },
  {
    id: 4,
    title: 'HND in Electrical Engineering',
    institution: 'UK Colleges',
    description:
      'Higher National Diploma offering practical and theoretical knowledge in electrical engineering.',
    level: 'Level 5',
    duration: '2 years (full-time), 3 years (part-time)',
    entryRequirements: 'Level 3 qualification or HNC',
    progressionOptions: "Final year entry to bachelor's degree or technical management roles",
    keyTopics: [
      'Power systems',
      'Electronic design',
      'Engineering mathematics',
      'Industrial applications',
    ],
    locations: ['Liverpool', 'Newcastle', 'Nottingham', 'Plymouth', 'Belfast'],
  },
  {
    id: 2,
    title: "Bachelor's Degree",
    institution: 'Universities',
    description: 'BEng or BSc in Electrical Engineering, Building Services, or Energy Management.',
    level: 'Level 6',
    duration: '3-4 years (full-time), 5-6 years (part-time)',
    entryRequirements: 'A-Levels/BTEC Level 3 or HNC/HND',
    progressionOptions: "Master's degree, graduate schemes, or professional engineering roles",
    keyTopics: [
      'Advanced electrical systems',
      'Power engineering',
      'Control systems',
      'Professional practice',
    ],
    locations: ['London', 'Manchester', 'Edinburgh', 'Bristol', 'Sheffield'],
  },
  {
    id: 3,
    title: "Master's Degree",
    institution: 'Universities',
    description:
      'MEng or MSc specialising in power systems, renewable energy, or building services.',
    level: 'Level 7',
    duration: '1 year (full-time), 2-3 years (part-time)',
    entryRequirements: "Bachelor's degree (2:1 or above) in related subject",
    progressionOptions: 'PhD, chartered engineer status, or senior technical positions',
    keyTopics: [
      'Advanced power systems',
      'Renewable technology',
      'Research methods',
      'Energy efficiency',
    ],
    locations: ['London', 'Cambridge', 'Manchester', 'Leeds', 'Southampton'],
  },
];

const FurtherEducation = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Further education
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
          Advancing your qualifications
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed">
          Higher academic qualifications can open doors to senior roles and specialisations in the
          electrical industry. Below are key educational pathways that can enhance your career
          prospects and technical expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationOptions.map((option) => (
          <div
            key={option.id}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {option.institution} · {option.level}
                </span>
                <h3 className="text-[17px] font-semibold text-white leading-tight">
                  {option.title}
                </h3>
              </div>
            </div>

            <p className="text-[14px] text-white/85 leading-relaxed">{option.description}</p>

            <div className="space-y-3 mt-auto">
              <div className="space-y-2 text-[13px]">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Duration
                  </span>
                  <p className="text-white/85 mt-0.5">{option.duration}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Entry requirements
                  </span>
                  <p className="text-white/85 mt-0.5">{option.entryRequirements}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Progression
                  </span>
                  <p className="text-white/85 mt-0.5">{option.progressionOptions}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key topics
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {option.keyTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Example locations
                </span>
                <p className="text-[12px] text-white/70">{option.locations.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Education funding options
        </span>
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-[13px] text-white">Advanced Learner Loan</p>
            <p className="text-[12px] text-white/70">
              Available for Level 3-6 qualifications. You don&apos;t pay back until you earn over
              £25,000 per year.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white">Employer sponsorship</p>
            <p className="text-[12px] text-white/70">
              Many employers will fund further education that benefits their business. Speak to your
              line manager or HR department.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white">Part-time study</p>
            <p className="text-[12px] text-white/70">
              Many courses offer evening and weekend options that allow you to continue working
              while studying.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[13px] text-white">Professional association grants</p>
            <p className="text-[12px] text-white/70">
              Organisations like IET offer grants and scholarships for electrical engineering
              studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurtherEducation;
