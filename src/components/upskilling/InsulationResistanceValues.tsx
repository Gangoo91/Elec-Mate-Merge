
import { BarChart3, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceValues = () => {
  const interpretationGuide = [
    { range: "≥ 100 MΩ", status: "Excellent", description: "New installation quality—no concerns", color: "green" },
    { range: "10-99 MΩ", status: "Good", description: "Healthy insulation—acceptable for most installations", color: "green" },
    { range: "2-9 MΩ", status: "Acceptable", description: "Meets minimum but monitor for deterioration", color: "yellow" },
    { range: "1-1.9 MΩ", status: "Marginal", description: "Just meets minimum—investigate further", color: "orange" },
    { range: "< 1 MΩ", status: "Fail", description: "Below minimum—fault must be found and corrected", color: "red" }
  ];

  const practicalExamples = [
    {
      scenario: "New domestic installation",
      typical: "50-200+ MΩ",
      notes: "Very high values expected with modern cables and accessories"
    },
    {
      scenario: "Older installation (20+ years)",
      typical: "5-50 MΩ",
      notes: "Still acceptable if above 1 MΩ, but watch for declining trends"
    },
    {
      scenario: "Industrial installation",
      typical: "2-20 MΩ",
      notes: "Lower due to connected equipment and environmental factors"
    },
    {
      scenario: "Outdoor/wet locations",
      typical: "1-10 MΩ",
      notes: "Environmental moisture affects readings—ensure adequate protection"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          Understanding IR Values
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Interpretation Guide */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Reading Interpretation</h3>
          <div className="space-y-3">
            {interpretationGuide.map((item, index) => (
              <div key={index} className={`bg-[#323232] rounded-lg p-4 border-l-4 ${
                item.color === 'green' ? 'border-green-500/50' :
                item.color === 'yellow' ? 'border-yellow-500/50' :
                item.color === 'orange' ? 'border-orange-500/50' :
                'border-red-500/50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground font-medium">{item.range}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.color === 'green' ? 'bg-green-600/20 text-green-200' :
                    item.color === 'yellow' ? 'bg-yellow-600/20 text-yellow-200' :
                    item.color === 'orange' ? 'bg-orange-600/20 text-orange-200' :
                    'bg-red-600/20 text-red-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Examples */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Typical Values in Practice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practicalExamples.map((example, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-2">{example.scenario}</h4>
                <p className="text-elec-yellow font-semibold mb-2">{example.typical}</p>
                <p className="text-foreground text-sm">{example.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factors Affecting Readings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Factors Affecting Readings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Factors That Improve IR
              </h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• New, undamaged insulation</li>
                <li>• Dry conditions</li>
                <li>• Higher temperatures (up to a point)</li>
                <li>• Good workmanship</li>
                <li>• Quality cables and accessories</li>
              </ul>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <h4 className="text-orange-200 font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Factors That Reduce IR
              </h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Moisture and humidity</li>
                <li>• Contamination (dust, grease)</li>
                <li>• Age and degradation</li>
                <li>• Connected equipment leakage</li>
                <li>• Mechanical damage</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recording Requirements */}
        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h4 className="text-yellow-200 font-medium mb-3">Recording Requirements</h4>
          <p className="text-foreground text-sm leading-relaxed mb-3">
            Always record the actual resistance value in MΩ, not just "pass", "satisfactory", or tick marks. 
            This allows for:
          </p>
          <ul className="space-y-1 text-foreground text-sm">
            <li>• Comparison with previous test results</li>
            <li>• Identification of deteriorating trends</li>
            <li>• Proper assessment of installation condition</li>
            <li>• Compliance with BS7671 requirements</li>
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};
