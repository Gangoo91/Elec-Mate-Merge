import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Thermometer, Zap, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BS7671Module5Section6Environmental = () => {
  const environmentalCodes = [
    {
      code: "AD",
      title: "Water",
      levels: ["AD1: Negligible", "AD2: Free-falling drops", "AD3: Spraying water", "AD4: Splashing water", "AD5: Water jets", "AD6: Waves", "AD7: Immersion", "AD8: Submersion"]
    },
    {
      code: "AE", 
      title: "Foreign solid objects",
      levels: ["AE1: Negligible", "AE2: Small objects (≥2.5mm)", "AE3: Very small objects (≥1mm)", "AE4: Light dust", "AE5: Moderate dust", "AE6: Heavy dust"]
    },
    {
      code: "AF",
      title: "Corrosive/polluting substances", 
      levels: ["AF1: Negligible", "AF2: Atmospheric", "AF3: Intermittent/accidental", "AF4: Continuous"]
    },
    {
      code: "AG",
      title: "Mechanical impact",
      levels: ["AG1: Low severity", "AG2: Medium severity", "AG3: High severity"]
    },
    {
      code: "AH", 
      title: "Vibration",
      levels: ["AH1: Low severity", "AH2: Medium severity", "AH3: High severity"]
    }
  ];

  const temperatureCodes = [
    { code: "AA1", range: "-60°C to +5°C", description: "Very cold conditions" },
    { code: "AA2", range: "-40°C to +5°C", description: "Cold conditions" },
    { code: "AA3", range: "-25°C to +5°C", description: "Cold conditions" },
    { code: "AA4", range: "-5°C to +40°C", description: "Normal conditions" },
    { code: "AA5", range: "+5°C to +40°C", description: "Normal conditions" },
    { code: "AA6", range: "+5°C to +60°C", description: "Hot conditions" },
    { code: "AA7", range: "+5°C to +80°C", description: "Very hot conditions" },
    { code: "AA8", range: "+5°C to +125°C", description: "Extremely hot conditions" }
  ];

  return (
    <div className="space-y-6">
      {/* Environmental Classification */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Cloud className="h-5 w-5 text-elec-yellow" />
            Environmental Condition Codes (BS7671 Chapter 51)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            BS7671 uses specific codes to classify environmental conditions. Understanding these codes 
            is essential for selecting appropriate equipment and installation methods.
          </p>
          
          <div className="grid gap-4">
            {environmentalCodes.map((env, index) => (
              <div key={index} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-elec-yellow text-elec-dark font-bold">
                    {env.code}
                  </Badge>
                  <h4 className="font-semibold">{env.title}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                  {env.levels.map((level, levelIndex) => (
                    <div key={levelIndex} className="text-gray-300">
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temperature Classification */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-elec-yellow" />
            Temperature Classifications (AA Codes)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-4">
          <p>
            Temperature is a critical environmental factor affecting cable performance, insulation properties, 
            and equipment operation. BS7671 defines specific temperature classifications.
          </p>
          
          <div className="grid gap-3">
            {temperatureCodes.map((temp, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-elec-dark rounded-lg border border-gray-600">
                <Badge variant="outline" className="border-gray-600 text-foreground w-fit">
                  {temp.code}
                </Badge>
                <div className="flex-1">
                  <span className="font-medium">{temp.range}</span>
                  <span className="text-gray-300 ml-2">- {temp.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-950/20 p-4 rounded-lg border border-yellow-800/30 mt-4">
            <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important Note
            </h4>
            <p className="text-gray-300 text-sm">
              Cable current-carrying capacity must be derated for high ambient temperatures. 
              Refer to BS7671 Appendix 4 for derating factors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BS7671Module5Section6Environmental;