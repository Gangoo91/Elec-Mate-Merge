const cableTypes = [
  {
    application: 'Solar PV DC',
    cable: '4mm² DC cable',
    protection: 'DC isolators',
    notes: 'UV resistant, fire rated',
  },
  {
    application: 'EV charging',
    cable: '6mm² T&E',
    protection: '32A Type A RCBO',
    notes: 'O-PEN device for PME',
  },
  {
    application: 'Pool equipment',
    cable: '2.5mm² SWA',
    protection: '16A RCBO 30mA',
    notes: 'Zone classification applies',
  },
  {
    application: 'Bathroom circuits',
    cable: '2.5mm² T&E',
    protection: '20A RCBO 30mA',
    notes: 'IP rating per zone',
  },
  {
    application: 'Agricultural',
    cable: '4mm² SWA',
    protection: '20A RCBO 30mA',
    notes: 'Rodent protection essential',
  },
  {
    application: 'Construction site',
    cable: 'H07RN-F flex',
    protection: 'RCD + 110V CTE',
    notes: 'IP44 minimum',
  },
  {
    application: 'Sauna circuits',
    cable: 'Silicone/MICC',
    protection: '16A RCBO 30mA',
    notes: 'Heat resistant cables',
  },
  {
    application: 'Medical locations',
    cable: 'Per IT design',
    protection: 'IT system + IMD',
    notes: 'Group 2 requirements',
  },
];

const gridConnectionRequirements = [
  {
    standard: 'G98 (less than or equal to 16A per phase)',
    description: 'Simplified connection process for small generators',
    requirements: [
      'Notification to DNO required',
      'Loss of mains protection built into inverter',
      'No additional protection required',
      'Applies to most domestic solar PV',
    ],
  },
  {
    standard: 'G99 (greater than 16A per phase)',
    description: 'Engineering recommendation for larger installations',
    requirements: [
      'Application to DNO required',
      'Additional protection may be needed',
      'Witness testing may be required',
      'Commercial installations typically',
    ],
  },
];

const specialCircuitGroups = [
  {
    title: 'Solar PV DC circuits',
    points: [
      'String voltage can exceed 600V DC',
      'Arrays generate power whenever illuminated',
      'DC arc fault detection recommended',
      'UV resistant cable and glands essential',
      'Fire safety labelling at entry points',
    ],
  },
  {
    title: 'EV charging circuits',
    points: [
      '32A continuous load — cable sizing critical',
      'Type A RCD for DC leakage detection',
      'O-PEN protection for PME supplies',
      'Load management for multiple chargers',
      'Smart charging Device Regulations compliance',
    ],
  },
  {
    title: 'Pool & spa circuits',
    points: [
      'SELV 12V maximum in Zone 0 and 1',
      'Supplementary bonding throughout zones',
      'IPX8 rating for underwater equipment',
      'Dedicated circuits for pumps and heaters',
      'Enhanced RCD sensitivity requirements',
    ],
  },
  {
    title: 'Medical IT systems',
    points: [
      'Unearthed IT supply via isolating transformer',
      'Insulation Monitoring Device (IMD) required',
      'First fault does not cause disconnection',
      'Maintains supply to life-critical equipment',
      'Maximum 10kVA per transformer',
    ],
  },
];

const SpecialistCircuitsPanel = () => (
  <div className="space-y-6">
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Cable types
        </span>
        <h3 className="text-[16px] font-semibold text-white leading-tight">
          Specialist cable types & protection
        </h3>
      </div>
      <div className="space-y-2">
        {cableTypes.map((cable, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1 space-y-0.5">
                <h4 className="text-[14px] font-medium text-white">{cable.application}</h4>
                <p className="text-[12px] text-white/55">{cable.notes}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {cable.cable}
                </span>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {cable.protection}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Grid connection
        </span>
        <h3 className="text-[16px] font-semibold text-white leading-tight">
          Grid connection requirements
        </h3>
      </div>
      <div className="space-y-3">
        {gridConnectionRequirements.map((req, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 space-y-2"
          >
            <h4 className="text-[14px] font-medium text-white">{req.standard}</h4>
            <p className="text-[13px] text-white/85 leading-relaxed">{req.description}</p>
            <ul className="space-y-1">
              {req.requirements.map((r, rIdx) => (
                <li
                  key={rIdx}
                  className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Special considerations
        </span>
        <h3 className="text-[16px] font-semibold text-white leading-tight">
          Special circuit considerations
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {specialCircuitGroups.map((group, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
          >
            <h4 className="text-[14px] font-medium text-white">{group.title}</h4>
            <ul className="space-y-1">
              {group.points.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SpecialistCircuitsPanel;
