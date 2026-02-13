import { Cable, Plug, Zap, Sun, Car, Waves, Heart, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const cableTypes = [
  { application: "Solar PV DC", cable: "4mm² DC cable", protection: "DC isolators", notes: "UV resistant, fire rated" },
  { application: "EV charging", cable: "6mm² T&E", protection: "32A Type A RCBO", notes: "O-PEN device for PME" },
  { application: "Pool equipment", cable: "2.5mm² SWA", protection: "16A RCBO 30mA", notes: "Zone classification applies" },
  { application: "Bathroom circuits", cable: "2.5mm² T&E", protection: "20A RCBO 30mA", notes: "IP rating per zone" },
  { application: "Agricultural", cable: "4mm² SWA", protection: "20A RCBO 30mA", notes: "Rodent protection essential" },
  { application: "Construction site", cable: "H07RN-F flex", protection: "RCD + 110V CTE", notes: "IP44 minimum" },
  { application: "Sauna circuits", cable: "Silicone/MICC", protection: "16A RCBO 30mA", notes: "Heat resistant cables" },
  { application: "Medical locations", cable: "Per IT design", protection: "IT system + IMD", notes: "Group 2 requirements" },
];

const gridConnectionRequirements = [
  {
    standard: "G98 (less than or equal to 16A per phase)",
    description: "Simplified connection process for small generators",
    requirements: [
      "Notification to DNO required",
      "Loss of mains protection built into inverter",
      "No additional protection required",
      "Applies to most domestic solar PV",
    ],
  },
  {
    standard: "G99 (greater than 16A per phase)",
    description: "Engineering recommendation for larger installations",
    requirements: [
      "Application to DNO required",
      "Additional protection may be needed",
      "Witness testing may be required",
      "Commercial installations typically",
    ],
  },
];

const SpecialistCircuitsPanel = () => (
  <div className="space-y-6">
    {/* Cable Types & Protection */}
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Cable className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-white text-sm font-semibold">
          Specialist Cable Types & Protection
        </h3>
      </div>
      <div className="space-y-3">
        {cableTypes.map((cable, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-3 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-medium text-white text-sm">
                  {cable.application}
                </h4>
                <p className="text-white text-xs">{cable.notes}</p>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="border-elec-yellow text-elec-yellow text-xs"
                >
                  {cable.cable}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-400 text-xs"
                >
                  {cable.protection}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Grid Connection Requirements */}
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Plug className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-white text-sm font-semibold">
          Grid Connection Requirements
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {gridConnectionRequirements.map((req, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-4 rounded-lg"
          >
            <h4 className="font-medium text-white text-sm mb-1">
              {req.standard}
            </h4>
            <p className="text-white text-xs mb-3">{req.description}</p>
            <div className="space-y-1.5">
              {req.requirements.map((r, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 shrink-0" />
                  <span className="text-white text-xs">{r}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Special Circuit Considerations */}
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-white text-sm font-semibold">
          Special Circuit Considerations
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4 text-amber-400" />
            <h4 className="font-medium text-white text-sm">Solar PV DC Circuits</h4>
          </div>
          <ul className="space-y-1 text-xs text-white">
            <li>String voltage can exceed 600V DC</li>
            <li>Arrays generate power whenever illuminated</li>
            <li>DC arc fault detection recommended</li>
            <li>UV resistant cable and glands essential</li>
            <li>Fire safety labelling at entry points</li>
          </ul>
        </div>

        <div className="bg-lime-500/10 p-3 rounded-lg border border-lime-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Car className="h-4 w-4 text-lime-400" />
            <h4 className="font-medium text-white text-sm">EV Charging Circuits</h4>
          </div>
          <ul className="space-y-1 text-xs text-white">
            <li>32A continuous load — cable sizing critical</li>
            <li>Type A RCD for DC leakage detection</li>
            <li>O-PEN protection for PME supplies</li>
            <li>Load management for multiple chargers</li>
            <li>Smart charging Device Regulations compliance</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-4 w-4 text-blue-400" />
            <h4 className="font-medium text-white text-sm">Pool & Spa Circuits</h4>
          </div>
          <ul className="space-y-1 text-xs text-white">
            <li>SELV 12V maximum in Zone 0 and 1</li>
            <li>Supplementary bonding throughout zones</li>
            <li>IPX8 rating for underwater equipment</li>
            <li>Dedicated circuits for pumps and heaters</li>
            <li>Enhanced RCD sensitivity requirements</li>
          </ul>
        </div>

        <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-red-400" />
            <h4 className="font-medium text-white text-sm">Medical IT Systems</h4>
          </div>
          <ul className="space-y-1 text-xs text-white">
            <li>Unearthed IT supply via isolating transformer</li>
            <li>Insulation Monitoring Device (IMD) required</li>
            <li>First fault does not cause disconnection</li>
            <li>Maintains supply to life-critical equipment</li>
            <li>Maximum 10kVA per transformer</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SpecialistCircuitsPanel;
