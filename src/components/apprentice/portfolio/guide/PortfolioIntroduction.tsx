const PortfolioIntroduction = () => {
  const portfolioPurpose = [
    'Demonstrate your learning and skill development throughout your apprenticeship',
    'Provide evidence of competency against industry standards and qualifications',
    'Showcase your professional growth and technical abilities to assessors',
    'Create a valuable resource for future career development and job applications',
    'Document your journey from apprentice to qualified electrician',
  ];

  const keyBenefits = [
    {
      title: 'Clear learning objectives',
      description: 'Structured approach to meeting apprenticeship requirements',
    },
    {
      title: 'Professional recognition',
      description: 'Demonstrates competency to employers and industry bodies',
    },
    {
      title: 'Career development',
      description: 'Valuable asset for job applications and career progression',
    },
    {
      title: 'Evidence collection',
      description: 'Systematic documentation of skills and knowledge',
    },
  ];

  const modules = [
    'Module 1: Planning & structure',
    'Module 2: Evidence collection',
    'Module 3: Reflection & analysis',
    'Module 4: Industry standards',
    'Module 5: Assessment preparation',
    'Module 6: Digital portfolio tools',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Welcome to portfolio building
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your apprenticeship portfolio is one of the most important documents you'll create during
          your training. It's not just a collection of evidence — it's a comprehensive record of
          your professional development, skills acquisition, and journey towards becoming a
          qualified electrician.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          What is an apprenticeship portfolio?
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          An apprenticeship portfolio is a structured collection of evidence that demonstrates your
          competency against the standards required for your electrical qualification. It includes:
        </p>
        <ul className="space-y-1.5">
          {portfolioPurpose.map((purpose, index) => (
            <li
              key={index}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{purpose}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyBenefits.map((benefit, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
          >
            <h4 className="text-[14px] font-semibold text-white">{benefit.title}</h4>
            <p className="text-[14px] text-white/85 leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Start early, stay consistent
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          The most successful apprentices start building their portfolio from day one and maintain
          it consistently throughout their training. Don't wait until the end of your apprenticeship
          to begin collecting evidence.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Start from week 1', 'Document everything', 'Review regularly'].map((tag) => (
            <span
              key={tag}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          What you'll learn in this guide
        </span>
        <div className="flex flex-wrap gap-1.5">
          {modules.map((m) => (
            <span
              key={m}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioIntroduction;
