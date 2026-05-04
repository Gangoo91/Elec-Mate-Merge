const IndustrialComplianceRequirements = () => {
  const complianceRequirements = [
    {
      standard: 'ATEX Directive 2014/34/EU',
      description: 'Equipment for explosive atmospheres',
      application: 'All equipment in classified zones',
    },
    {
      standard: 'DSEAR Regulations 2002',
      description: 'Dangerous substances and explosive atmospheres',
      application: 'Risk assessment and control measures',
    },
    {
      standard: 'BS EN 60079 Series',
      description: 'Explosive atmospheres protection',
      application: 'Equipment selection and installation',
    },
    {
      standard: 'BS EN 60204-1',
      description: 'Safety of machinery - Electrical equipment',
      application: 'Machine control systems',
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Compliance
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Essential compliance standards
        </h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Mandatory standards for industrial installations.
        </p>
      </div>
      <div className="space-y-2">
        {complianceRequirements.map((req, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5"
          >
            <h4 className="text-[14px] font-medium text-white">{req.standard}</h4>
            <p className="text-[13px] text-white/85 leading-relaxed">{req.description}</p>
            <p className="text-[12px] text-white/55">Application: {req.application}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrialComplianceRequirements;
