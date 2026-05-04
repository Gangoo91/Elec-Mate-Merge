const CareerProgressionPaths = () => {
  const paths = [
    {
      title: 'Apprentice → Installation Electrician → Approved Electrician → Supervisor',
      description:
        'The traditional progression path focusing on installation work and eventually team management.',
    },
    {
      title: 'Electrician → Specialist → Commissioning Technician → Commissioning Engineer',
      description:
        'Focusing on developing expertise in specialised systems and commissioning increasingly complex installations.',
    },
    {
      title: 'Electrician → HNC/HND/Degree → Electrical Designer → Project Engineer',
      description:
        'Moving from hands-on installation to design and engineering roles through further education.',
    },
    {
      title: 'Electrician → Business Training → Electrical Contractor',
      description:
        'Building business skills to establish and grow your own electrical contracting company.',
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Career progression paths
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed">
        Common progression paths in the UK electrical industry include:
      </p>
      <div className="space-y-3">
        {paths.map((path, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-[13px] text-white">{path.title}</p>
            <p className="text-[12px] text-white/70 leading-relaxed">{path.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProgressionPaths;
