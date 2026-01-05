import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Zap, Shield, Settings } from 'lucide-react';

export const EmergencyLightingTechnicalSection2_2 = () => {
  const technicalSpecs = [
    {
      title: "Illuminance Calculations",
      icon: Calculator,
      details: [
        "Minimum maintained illuminance: 0.5 lux at floor level",
        "Calculation grid: 2m x 2m spacing for large areas",
        "Uniformity ratio: 40:1 maximum (highest/lowest reading)",
        "Edge effects: 1.5m maximum distance from walls",
        "Obstruction factor: Additional 25% for furniture/equipment"
      ],
      formula: "Average illuminance = (Σ Luminaire lumens × Utilisation factor × Maintenance factor) / Area"
    },
    {
      title: "Power Supply Systems",
      icon: Zap,
      details: [
        "Self-contained: Individual battery backup per luminaire",
        "Central battery: Single supply serving multiple luminaires",
        "Generator supply: Backup power with <15s changeover",
        "Voltage tolerance: ±10% of rated supply voltage",
        "Cable specification: Fire-resistant where required"
      ],
      formula: "Battery capacity (Ah) = (Load current × Duration hours) / (Discharge factor × Temperature factor)"
    },
    {
      title: "Performance Standards",
      icon: Shield,
      details: [
        "Response time: Full illumination within 5 seconds",
        "Duration options: 1 hour (minimum) or 3 hours (standard)",
        "Temperature range: -10°C to +40°C operation",
        "IP rating: Minimum IP20 (higher for wet areas)",
        "Photometric classification: As per BS EN 60598-2-22"
      ],
      formula: "Light loss factor = Lamp lumen depreciation × Luminaire maintenance factor × Room surface depreciation"
    },
    {
      title: "Installation Requirements",
      icon: Settings,
      details: [
        "Mounting height: Typically 2.5-4m for optimal coverage",
        "Circuit protection: RCBO or MCB + RCD protection",
        "Cable routing: Separate from normal lighting circuits",
        "Earthing: Protective earth to all metallic parts",
        "Commissioning: Full system testing before handover"
      ],
      formula: "Spacing = 4 × Mounting height (for uniform areas with reflective surfaces)"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Technical Specifications & Standards
        </h2>
        <p className="text-foreground/70">
          Detailed technical requirements for anti-panic lighting design and installation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technicalSpecs.map((spec, index) => (
          <Card key={index} className="bg-slate-200/20 border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-elec-yellow/20 rounded-lg">
                  <spec.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow font-semibold">
                  Technical
                </Badge>
              </div>
              <CardTitle className="text-foreground text-lg">
                {spec.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {spec.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-foreground text-sm">
                    <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 mt-4">
                <p className="text-elec-yellow font-semibold text-xs mb-1">Key Formula:</p>
                <p className="text-foreground text-xs font-mono bg-black/20 p-2 rounded">
                  {spec.formula}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Design Process Section */}
      <Card className="bg-gradient-to-br from-elec-gray/30 to-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground">Step-by-Step Design Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-elec-yellow font-semibold">Phase 1: Assessment & Planning</h4>
              <ol className="space-y-2 text-foreground text-sm">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Conduct site survey and risk assessment</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Identify open areas requiring anti-panic lighting</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Determine occupancy levels and evacuation routes</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span>Select appropriate luminaire types and specifications</span>
                </li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-elec-yellow font-semibold">Phase 2: Design & Installation</h4>
              <ol className="space-y-2 text-foreground text-sm">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <span>Calculate illuminance levels and spacing requirements</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
                  <span>Prepare detailed installation drawings</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">7</span>
                  <span>Install luminaires and power supply systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">8</span>
                  <span>Commission system with full testing and documentation</span>
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};