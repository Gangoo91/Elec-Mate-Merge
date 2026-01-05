
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Zap,
  Calculator,
  Shield,
  Ruler,
  Info,
  AlertTriangle,
  Cable,
  Gauge
} from "lucide-react";

const DomesticCircuitGuide = () => {
  const circuitTypes = [
    {
      type: "Ring Final Circuit",
      cable: "2.5mm² T&E",
      protection: "32A RCBO",
      maxFloorArea: "100m²",
      description: "Standard socket outlet circuit for general use",
      advantages: ["Lower voltage drop", "Continuity of supply if cable fault", "Established UK practice"],
      disadvantages: ["Higher cable usage", "More complex testing", "Potential for overloading"]
    },
    {
      type: "Radial Circuit",
      cable: "2.5mm² T&E",
      protection: "20A MCB + RCD",
      maxFloorArea: "50m²",
      description: "Alternative socket circuit for smaller areas",
      advantages: ["Less cable required", "Simpler installation", "Easier fault finding"],
      disadvantages: ["Higher voltage drop", "Limited loading capacity", "No supply redundancy"]
    },
    {
      type: "Lighting Circuit",
      cable: "1.5mm² T&E",
      protection: "6A MCB",
      maxFloorArea: "Unlimited",
      description: "Fixed lighting and switched outlets",
      advantages: ["Low current demand", "Simple installation", "Flexible switching arrangements"],
      disadvantages: ["Limited to lighting loads only", "Requires separate switching"]
    },
    {
      type: "Cooker Circuit",
      cable: "6mm² T&E",
      protection: "32A MCB",
      maxFloorArea: "N/A",
      description: "Dedicated circuit for electric cookers",
      advantages: ["High current capacity", "Dedicated protection", "Meets appliance requirements"],
      disadvantages: ["Single point of failure", "Requires diversity calculation", "High installation cost"]
    }
  ];

  const cableSizingTable = {
    title: "Cable Sizing Reference (BS 7671 Tables 4D1A-4D5A)",
    description: "Current-carrying capacity for common domestic cable sizes installed using Reference Method C (clipped direct)",
    cables: [
      { size: "1.0mm²", method_c: "15A", method_a: "11A", typical_use: "Lighting circuits", vd_per_m: "44mV/A/m" },
      { size: "1.5mm²", method_c: "20A", method_a: "14.5A", typical_use: "Lighting, small radials", vd_per_m: "29mV/A/m" },
      { size: "2.5mm²", method_c: "27A", method_a: "20A", typical_use: "Ring circuits, radial sockets", vd_per_m: "18mV/A/m" },
      { size: "4mm²", method_c: "37A", method_a: "27A", typical_use: "Showers up to 9kW, submains", vd_per_m: "11mV/A/m" },
      { size: "6mm²", method_c: "47A", method_a: "34A", typical_use: "Cookers, large showers, EV", vd_per_m: "7.3mV/A/m" },
      { size: "10mm²", method_c: "65A", method_a: "46A", typical_use: "High power cookers, submains", vd_per_m: "4.4mV/A/m" },
      { size: "16mm²", method_c: "87A", method_a: "62A", typical_use: "Large submains", vd_per_m: "2.8mV/A/m" }
    ],
    installationMethods: [
      { method: "A", description: "Enclosed in conduit in thermally insulating wall" },
      { method: "B", description: "Enclosed in conduit on a wall or in trunking" },
      { method: "C", description: "Clipped direct to a surface (reference method for T&E)" },
      { method: "100", description: "Enclosed in thermal insulation (requires significant derating)" },
      { method: "101", description: "One side in contact with thermal insulation" },
      { method: "102", description: "Cable surrounded by thermal insulation for >0.5m" }
    ]
  };

  const maxCableLengths = {
    title: "Maximum Cable Lengths for Voltage Drop",
    description: "Maximum lengths based on voltage drop limits (3% lighting, 5% power) at full load",
    limits: [
      { circuit: "Ring 32A (2.5mm²)", lighting: "N/A", power: "106m total", notes: "Both legs combined" },
      { circuit: "Radial 20A (2.5mm²)", lighting: "N/A", power: "56m", notes: "Single run from CU" },
      { circuit: "Radial 32A (4mm²)", lighting: "N/A", power: "64m", notes: "For high-load radials" },
      { circuit: "Lighting 6A (1.0mm²)", lighting: "26m", power: "N/A", notes: "Per circuit leg" },
      { circuit: "Lighting 6A (1.5mm²)", lighting: "38m", power: "N/A", notes: "Extended circuits" },
      { circuit: "Shower 40A (6mm²)", lighting: "N/A", power: "18m", notes: "At full load" },
      { circuit: "Shower 40A (10mm²)", lighting: "N/A", power: "30m", notes: "For longer runs" },
      { circuit: "Cooker 32A (6mm²)", lighting: "N/A", power: "23m", notes: "At full rated load" },
      { circuit: "EV Charger 32A (6mm²)", lighting: "N/A", power: "23m", notes: "7kW charger" }
    ],
    formula: "Max Length = (Vd limit x 1000) / (mV/A/m x Ib)",
    notes: [
      "Values assume single-phase 230V supply",
      "Lengths are approximate - always verify calculations",
      "Consider derating factors for grouped cables or thermal insulation",
      "Earth fault loop impedance may be the limiting factor for longer runs"
    ]
  };

  const diversityCalculations = {
    title: "Diversity Calculations for Domestic Premises",
    description: "Standard diversity factors from IET Guidance Note 1 and BS 7671 Appendix 1",
    currentDemand: [
      {
        load: "Lighting",
        factor: "66% of total current demand",
        example: "20 x 100W points = 2000W = 8.7A x 0.66 = 5.7A",
        notes: "Standard diversity for domestic lighting"
      },
      {
        load: "Heating & Power (Ring Circuits)",
        factor: "100% of largest + 40% of 2nd + 10% of remaining",
        example: "3 rings at 32A each = 32 + 12.8 + 3.2 = 48A",
        notes: "Socket outlet circuits"
      },
      {
        load: "Cooker",
        factor: "10A + 30% of remainder over 10A + 5A if socket",
        example: "12kW (52A) cooker = 10 + (42 x 0.3) + 5 = 27.6A",
        notes: "Cooker control unit with socket"
      },
      {
        load: "Immersion Heater",
        factor: "100% (no diversity)",
        example: "3kW heater = 13A",
        notes: "Assume always at full load"
      },
      {
        load: "Electric Shower",
        factor: "100% (no diversity)",
        example: "9.5kW shower = 41A",
        notes: "Instantaneous load, no diversity"
      },
      {
        load: "EV Charger",
        factor: "100% (no diversity) unless smart managed",
        example: "7kW charger = 32A",
        notes: "May use load management to reduce demand"
      },
      {
        load: "Floor/Panel Heaters",
        factor: "100% of total installed capacity",
        example: "4kW underfloor = 17.4A",
        notes: "Electric heating always at full load"
      }
    ],
    exampleCalculation: {
      title: "Example: 4-Bedroom House Maximum Demand",
      loads: [
        { item: "Lighting (25 points)", calculation: "25 x 100W x 0.66 / 230V", result: "7.2A" },
        { item: "Ring 1 (kitchen)", calculation: "32A x 100%", result: "32A" },
        { item: "Ring 2 (ground floor)", calculation: "32A x 40%", result: "12.8A" },
        { item: "Ring 3 (first floor)", calculation: "32A x 10%", result: "3.2A" },
        { item: "Cooker (13kW)", calculation: "10 + (47 x 0.3) + 5", result: "29.1A" },
        { item: "Shower (10.5kW)", calculation: "45.6A x 100%", result: "45.6A" },
        { item: "Immersion (3kW)", calculation: "13A x 100%", result: "13A" },
        { item: "EV Charger (7kW)", calculation: "32A x 100%", result: "32A" }
      ],
      total: "174.9A",
      conclusion: "Exceeds 100A supply - requires load management or supply upgrade"
    }
  };

  const circuitDiagrams = {
    title: "Circuit Configurations",
    diagrams: [
      {
        name: "Ring Final Circuit",
        description: "Standard UK socket outlet circuit configuration",
        layout: [
          "Consumer Unit (32A RCBO)",
          "    |",
          "    +-- L(red/brown) --+",
          "    |                  |",
          "Socket 1 -- Socket 2 -- Socket 3 -- ... -- Socket N",
          "    |                                           |",
          "    +-- N(black/blue) ---------------------------+",
          "    +-- E(green/yellow) -------------------------+"
        ],
        keyPoints: [
          "Both ends of ring terminate at same protective device",
          "Maximum floor area served: 100m²",
          "Unlimited number of socket outlets",
          "Spurs limited to one single or twin socket per spur point",
          "R1+R2 test confirms ring continuity"
        ]
      },
      {
        name: "Radial Circuit",
        description: "Single cable run from consumer unit",
        layout: [
          "Consumer Unit (20A MCB + RCD)",
          "    |",
          "    L(brown) ---- Socket 1 ---- Socket 2 ---- Socket N (end)",
          "    N(blue)  ---- Socket 1 ---- Socket 2 ---- Socket N (end)",
          "    E(g/y)   ---- Socket 1 ---- Socket 2 ---- Socket N (end)"
        ],
        keyPoints: [
          "Single cable run, not looped back",
          "2.5mm² cable with 20A protection: max 50m²",
          "4mm² cable with 32A protection: max 75m²",
          "Simpler fault finding than ring",
          "Often used for dedicated appliance circuits"
        ]
      },
      {
        name: "Lighting Circuit (Loop-in)",
        description: "Most common domestic lighting wiring method",
        layout: [
          "Consumer Unit (6A MCB)",
          "    |",
          "    +---- Ceiling Rose 1 ---- Ceiling Rose 2 ---- ... (to next rose)",
          "              |",
          "         Switch Line",
          "              |",
          "         Light Switch"
        ],
        keyPoints: [
          "Supply loops through each ceiling rose",
          "Switch wire: permanent line and switched line",
          "Maximum 12 lighting points per 6A circuit",
          "Modern: 3-core+E between switch and rose",
          "LED loads require calculation of inrush current"
        ]
      }
    ]
  };

  const voltageDrop = {
    title: "Voltage Drop Calculations",
    formula: "Vd = (mV/A/m x Ib x L) / 1000",
    terms: [
      { term: "Vd", definition: "Voltage drop in volts" },
      { term: "mV/A/m", definition: "Millivolt drop per amp per metre (from tables)" },
      { term: "Ib", definition: "Design current of the circuit in amps" },
      { term: "L", definition: "Length of cable run in metres" }
    ],
    limits: [
      { type: "Lighting circuits", limit: "3%", voltage: "6.9V at 230V" },
      { type: "Other circuits", limit: "5%", voltage: "11.5V at 230V" }
    ],
    examples: [
      {
        scenario: "20A radial socket circuit, 25m run, 2.5mm² cable",
        calculation: "(18 x 20 x 25) / 1000 = 9V",
        result: "9V (3.9%) - Acceptable (under 5%)"
      },
      {
        scenario: "40A shower circuit, 15m run, 6mm² cable",
        calculation: "(7.3 x 40 x 15) / 1000 = 4.38V",
        result: "4.38V (1.9%) - Acceptable"
      },
      {
        scenario: "6A lighting circuit, 40m run, 1.5mm² cable",
        calculation: "(29 x 6 x 40) / 1000 = 6.96V",
        result: "6.96V (3.02%) - Marginal (at 3% limit)"
      }
    ]
  };

  const earthingConsiderations = {
    title: "Earthing & Protective Conductor Sizing",
    description: "Minimum CPC sizes for compliance with BS 7671 Table 54.7",
    cpcSizes: [
      { lineSize: "1.0mm²", cpcMin: "1.0mm²", twinAndEarth: "1.0mm² (in 1.0mm² T&E)" },
      { lineSize: "1.5mm²", cpcMin: "1.0mm²", twinAndEarth: "1.0mm² (in 1.5mm² T&E)" },
      { lineSize: "2.5mm²", cpcMin: "1.5mm²", twinAndEarth: "1.5mm² (in 2.5mm² T&E)" },
      { lineSize: "4mm²", cpcMin: "2.5mm²", twinAndEarth: "1.5mm² (in 4mm² T&E) - check Zs" },
      { lineSize: "6mm²", cpcMin: "2.5mm²", twinAndEarth: "2.5mm² (in 6mm² T&E)" },
      { lineSize: "10mm²", cpcMin: "4mm²", twinAndEarth: "4mm² (in 10mm² T&E)" },
      { lineSize: "16mm²", cpcMin: "6mm²", twinAndEarth: "6mm² (in 16mm² T&E)" }
    ],
    adiabatic: {
      formula: "S = √(I²t) / k",
      description: "Adiabatic equation for verifying CPC adequacy",
      terms: [
        { term: "S", definition: "Minimum cross-sectional area (mm²)" },
        { term: "I", definition: "Fault current in amperes" },
        { term: "t", definition: "Disconnection time in seconds" },
        { term: "k", definition: "Factor depending on conductor material (115 for copper in PVC)" }
      ]
    }
  };

  const designConsiderations = [
    "Maximum demand calculations using diversity factors",
    "Voltage drop calculations for circuit length",
    "Discrimination between protective devices",
    "RCD sensitivity and time delay coordination",
    "Future expansion and modification requirements"
  ];

  return (
    <div className="space-y-6">
      {/* Circuit Types */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Circuit Design Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circuitTypes.map((circuit, index) => (
            <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-elec-yellow/20">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-base mb-1">{circuit.type}</h4>
                  <p className="text-sm text-gray-300">{circuit.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-elec-yellow text-elec-yellow text-xs">
                    {circuit.cable}
                  </Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    {circuit.protection}
                  </Badge>
                  {circuit.maxFloorArea !== "N/A" && circuit.maxFloorArea !== "Unlimited" && (
                    <Badge variant="outline" className="border-blue-500 text-blue-400 text-xs">
                      Max {circuit.maxFloorArea}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                  <h5 className="text-sm font-medium text-green-300 mb-2">Advantages</h5>
                  <ul className="space-y-1">
                    {circuit.advantages.map((advantage, idx) => (
                      <li key={idx} className="text-xs text-green-200 flex items-start gap-2">
                        <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-orange-300 mb-2">Considerations</h5>
                  <ul className="space-y-1">
                    {circuit.disadvantages.map((disadvantage, idx) => (
                      <li key={idx} className="text-xs text-orange-200 flex items-start gap-2">
                        <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Circuit Diagrams */}
      <Card className="border-cyan-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cable className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-300">{circuitDiagrams.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circuitDiagrams.diagrams.map((diagram, index) => (
            <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
              <h4 className="font-medium text-white mb-2">{diagram.name}</h4>
              <p className="text-sm text-cyan-200 mb-3">{diagram.description}</p>

              <div className="bg-cyan-900/30 p-3 rounded font-mono text-xs text-cyan-100 mb-3 overflow-x-auto">
                {diagram.layout.map((line, idx) => (
                  <div key={idx} className="whitespace-pre">{line}</div>
                ))}
              </div>

              <div className="space-y-1">
                <h5 className="text-sm font-medium text-cyan-200">Key Points:</h5>
                <ul className="space-y-1">
                  {diagram.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cable Sizing Reference */}
      <Card className="border-amber-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-amber-300">{cableSizingTable.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-500/50 bg-amber-500/10">
            <Info className="h-4 w-4 text-amber-400" />
            <AlertDescription className="text-amber-200 text-sm">
              {cableSizingTable.description}
            </AlertDescription>
          </Alert>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Current-Carrying Capacity (Twin & Earth)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/30">
                    <th className="text-left py-2 text-amber-200">Cable Size</th>
                    <th className="text-left py-2 text-amber-200">Method C</th>
                    <th className="text-left py-2 text-amber-200">Method A</th>
                    <th className="text-left py-2 text-amber-200">mV/A/m</th>
                    <th className="text-left py-2 text-amber-200">Typical Use</th>
                  </tr>
                </thead>
                <tbody>
                  {cableSizingTable.cables.map((cable, idx) => (
                    <tr key={idx} className="border-b border-amber-500/20">
                      <td className="py-2 text-white font-medium">{cable.size}</td>
                      <td className="py-2 text-amber-300">{cable.method_c}</td>
                      <td className="py-2 text-orange-300">{cable.method_a}</td>
                      <td className="py-2 text-gray-300">{cable.vd_per_m}</td>
                      <td className="py-2 text-gray-300">{cable.typical_use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <h4 className="font-medium text-white mb-3">Installation Methods</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {cableSizingTable.installationMethods.map((method, idx) => (
                <div key={idx} className="text-sm flex items-start gap-2">
                  <Badge variant="outline" className="border-amber-400 text-amber-300 text-xs flex-shrink-0">
                    {method.method}
                  </Badge>
                  <span className="text-gray-300">{method.description}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maximum Cable Lengths */}
      <Card className="border-purple-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Ruler className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-purple-300">{maxCableLengths.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-purple-500/50 bg-purple-500/10">
            <Info className="h-4 w-4 text-purple-400" />
            <AlertDescription className="text-purple-200 text-sm">
              {maxCableLengths.description}
            </AlertDescription>
          </Alert>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left py-2 text-purple-200">Circuit Type</th>
                    <th className="text-left py-2 text-purple-200">Lighting (3%)</th>
                    <th className="text-left py-2 text-purple-200">Power (5%)</th>
                    <th className="text-left py-2 text-purple-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {maxCableLengths.limits.map((limit, idx) => (
                    <tr key={idx} className="border-b border-purple-500/20">
                      <td className="py-2 text-white">{limit.circuit}</td>
                      <td className="py-2 text-purple-300">{limit.lighting}</td>
                      <td className="py-2 text-purple-300">{limit.power}</td>
                      <td className="py-2 text-gray-300">{limit.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-white mb-2">Calculation Formula</h4>
            <p className="text-purple-300 font-mono text-sm mb-3">{maxCableLengths.formula}</p>
            <ul className="space-y-1">
              {maxCableLengths.notes.map((note, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Voltage Drop Calculations */}
      <Card className="border-teal-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-teal-400" />
            <CardTitle className="text-teal-300">{voltageDrop.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
            <h4 className="font-medium text-white mb-2">Formula</h4>
            <p className="text-teal-300 font-mono text-lg mb-3">{voltageDrop.formula}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {voltageDrop.terms.map((term, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-teal-300 font-mono">{term.term}</span>
                  <span className="text-gray-300"> = {term.definition}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
              <h4 className="font-medium text-white mb-3">Permitted Limits</h4>
              {voltageDrop.limits.map((limit, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{limit.type}</span>
                  <span className="text-teal-300">{limit.limit} ({limit.voltage})</span>
                </div>
              ))}
            </div>

            <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
              <h4 className="font-medium text-white mb-3">Worked Examples</h4>
              {voltageDrop.examples.map((example, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <p className="text-sm text-gray-300 mb-1">{example.scenario}</p>
                  <p className="text-xs text-teal-200 font-mono mb-1">{example.calculation}</p>
                  <p className="text-xs text-green-300">{example.result}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diversity Calculations */}
      <Card className="border-rose-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-rose-400" />
            <CardTitle className="text-rose-300">{diversityCalculations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-rose-500/50 bg-rose-500/10">
            <Info className="h-4 w-4 text-rose-400" />
            <AlertDescription className="text-rose-200 text-sm">
              {diversityCalculations.description}
            </AlertDescription>
          </Alert>

          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
            <h4 className="font-medium text-white mb-3">Diversity Factors by Load Type</h4>
            <div className="space-y-3">
              {diversityCalculations.currentDemand.map((item, idx) => (
                <div key={idx} className="bg-rose-600/10 p-3 rounded border border-rose-500/30">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-medium text-rose-200 text-sm">{item.load}</h5>
                  </div>
                  <p className="text-xs text-rose-100 mb-1"><strong>Factor:</strong> {item.factor}</p>
                  <p className="text-xs text-gray-300 mb-1"><strong>Example:</strong> {item.example}</p>
                  <p className="text-xs text-gray-400">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
            <h4 className="font-medium text-white mb-3">{diversityCalculations.exampleCalculation.title}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-rose-500/30">
                    <th className="text-left py-2 text-rose-200">Load Item</th>
                    <th className="text-left py-2 text-rose-200">Calculation</th>
                    <th className="text-left py-2 text-rose-200">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {diversityCalculations.exampleCalculation.loads.map((load, idx) => (
                    <tr key={idx} className="border-b border-rose-500/20">
                      <td className="py-2 text-white">{load.item}</td>
                      <td className="py-2 text-gray-300 font-mono text-xs">{load.calculation}</td>
                      <td className="py-2 text-rose-300">{load.result}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-rose-500/50">
                    <td colSpan={2} className="py-2 text-white font-medium">Total Maximum Demand</td>
                    <td className="py-2 text-rose-300 font-bold">{diversityCalculations.exampleCalculation.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <Alert className="border-red-500/50 bg-red-500/10 mt-3">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200 text-sm">
                {diversityCalculations.exampleCalculation.conclusion}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Earthing & CPC */}
      <Card className="border-green-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-400" />
            <CardTitle className="text-green-300">{earthingConsiderations.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-500/50 bg-green-500/10">
            <Info className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200 text-sm">
              {earthingConsiderations.description}
            </AlertDescription>
          </Alert>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <h4 className="font-medium text-white mb-3">Minimum CPC Sizes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-500/30">
                    <th className="text-left py-2 text-green-200">Line Conductor</th>
                    <th className="text-left py-2 text-green-200">Min CPC (Table 54.7)</th>
                    <th className="text-left py-2 text-green-200">In T&E Cable</th>
                  </tr>
                </thead>
                <tbody>
                  {earthingConsiderations.cpcSizes.map((size, idx) => (
                    <tr key={idx} className="border-b border-green-500/20">
                      <td className="py-2 text-white">{size.lineSize}</td>
                      <td className="py-2 text-green-300">{size.cpcMin}</td>
                      <td className="py-2 text-gray-300">{size.twinAndEarth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <h4 className="font-medium text-white mb-2">Adiabatic Equation</h4>
            <p className="text-green-300 font-mono text-lg mb-2">{earthingConsiderations.adiabatic.formula}</p>
            <p className="text-sm text-gray-300 mb-3">{earthingConsiderations.adiabatic.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {earthingConsiderations.adiabatic.terms.map((term, idx) => (
                <div key={idx} className="text-xs">
                  <span className="text-green-300 font-mono">{term.term}</span>
                  <span className="text-gray-300"> = {term.definition}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Considerations Summary */}
      <Card className="border-blue-500/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-blue-300">Design Considerations Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {designConsiderations.map((consideration, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                {consideration}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomesticCircuitGuide;
