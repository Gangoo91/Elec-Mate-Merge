const keyStandards = [
  'BS 7671:2018+A4:2026 Part 7 — Special Installations',
  'IET Guidance Note 7 — Special Locations (6th Edition)',
  'MCS standards for renewable energy systems',
  'IET Code of Practice for EV charging installations',
  'IET Code of Practice for Grid-Connected Solar PV',
  'G98/G99 grid connection requirements',
  'HTM 06-01 for healthcare electrical installations',
  'HSE guidance for construction site electrical safety',
];

const complianceCards = [
  {
    title: 'Planning & approvals',
    body: 'Specialist installations often require additional approvals and notifications. Check with local building control and DNO requirements for grid connections. Plan cable routes considering special environmental conditions and access for maintenance.',
  },
  {
    title: 'Enhanced safety measures',
    body: 'Special locations require enhanced safety measures including additional RCD protection, bonding requirements, and IP rating considerations. Ensure all personnel are trained for the specific installation type and environmental hazards present.',
  },
  {
    title: 'Certification & warranties',
    body: 'Specialist installations may require additional certification such as MCS for solar PV or specific commissioning procedures for EV charging points. Ensure all relevant standards are followed and appropriate warranties provided to the customer.',
  },
];

const SpecialistCompliancePanel = () => (
  <div className="space-y-6">
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Standards
        </span>
        <h3 className="text-[16px] font-semibold text-white leading-tight">
          Key standards & regulations
        </h3>
      </div>
      <ul className="space-y-1.5">
        {keyStandards.map((standard, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
          >
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>{standard}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="grid grid-cols-1 gap-3">
      {complianceCards.map((card, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
        >
          <h4 className="text-[14px] font-semibold text-white">{card.title}</h4>
          <p className="text-[14px] text-white/85 leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
        Specialist installation safety
      </span>
      <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
        <p>
          <strong>Competency requirements:</strong> Specialist installations require additional
          training and certification. Ensure you have appropriate qualifications before undertaking
          specialist work.
        </p>
        <p>
          <strong>Type A RCD protection:</strong> Many specialist installations require Type A RCDs
          due to DC leakage currents or electronic equipment.
        </p>
        <p>
          <strong>Environmental considerations:</strong> Consider IP ratings, UV resistance, and
          environmental conditions specific to each installation type.
        </p>
        <p>
          <strong>Part 7 takes precedence:</strong> Where Part 7 requirements conflict with general
          BS 7671 requirements, Part 7 takes precedence for the specific installation type.
        </p>
      </div>
    </div>
  </div>
);

export default SpecialistCompliancePanel;
