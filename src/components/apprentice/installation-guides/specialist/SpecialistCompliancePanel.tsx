import { Award, AlertTriangle, Shield } from "lucide-react";

const keyStandards = [
  "BS 7671:2018+A3:2024 Part 7 — Special Installations",
  "IET Guidance Note 7 — Special Locations (6th Edition)",
  "MCS standards for renewable energy systems",
  "IET Code of Practice for EV charging installations",
  "IET Code of Practice for Grid-Connected Solar PV",
  "G98/G99 grid connection requirements",
  "HTM 06-01 for healthcare electrical installations",
  "HSE guidance for construction site electrical safety",
];

const SpecialistCompliancePanel = () => (
  <div className="space-y-6">
    {/* Key Standards */}
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-white text-sm font-semibold">
          Key Standards & Regulations
        </h3>
      </div>
      <div className="space-y-2">
        {keyStandards.map((standard, index) => (
          <div key={index} className="flex items-start gap-2">
            <Award className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
            <span className="text-white text-sm">{standard}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Compliance cards */}
    <div className="grid grid-cols-1 gap-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-elec-yellow" />
          <h4 className="text-white text-sm font-semibold">
            Planning & Approvals
          </h4>
        </div>
        <p className="text-white text-sm">
          Specialist installations often require additional approvals and
          notifications. Check with local building control and DNO requirements
          for grid connections. Plan cable routes considering special
          environmental conditions and access for maintenance.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-elec-yellow" />
          <h4 className="text-white text-sm font-semibold">
            Enhanced Safety Measures
          </h4>
        </div>
        <p className="text-white text-sm">
          Special locations require enhanced safety measures including additional
          RCD protection, bonding requirements, and IP rating considerations.
          Ensure all personnel are trained for the specific installation type and
          environmental hazards present.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-elec-yellow" />
          <h4 className="text-white text-sm font-semibold">
            Certification & Warranties
          </h4>
        </div>
        <p className="text-white text-sm">
          Specialist installations may require additional certification such as
          MCS for solar PV or specific commissioning procedures for EV charging
          points. Ensure all relevant standards are followed and appropriate
          warranties provided to the customer.
        </p>
      </div>
    </div>

    {/* Safety notice */}
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-orange-400" />
        <h3 className="text-white text-sm font-semibold">
          Specialist Installation Safety
        </h3>
      </div>
      <div className="space-y-2 text-sm text-white">
        <p>
          <strong className="text-orange-300">Competency Requirements:</strong>{" "}
          Specialist installations require additional training and certification.
          Ensure you have appropriate qualifications before undertaking
          specialist work.
        </p>
        <p>
          <strong className="text-orange-300">Type A RCD Protection:</strong>{" "}
          Many specialist installations require Type A RCDs due to DC leakage
          currents or electronic equipment.
        </p>
        <p>
          <strong className="text-orange-300">
            Environmental Considerations:
          </strong>{" "}
          Consider IP ratings, UV resistance, and environmental conditions
          specific to each installation type.
        </p>
        <p>
          <strong className="text-orange-300">
            Part 7 Takes Precedence:
          </strong>{" "}
          Where Part 7 requirements conflict with general BS 7671 requirements,
          Part 7 takes precedence for the specific installation type.
        </p>
      </div>
    </div>
  </div>
);

export default SpecialistCompliancePanel;
