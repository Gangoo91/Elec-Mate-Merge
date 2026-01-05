import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingCaseStudies2_2 = () => {
  const caseStudies = [
    {
      title: "Shopping Centre Food Court",
      type: "Retail",
      icon: Building,
      area: "800m²",
      occupancy: "400 people",
      challenge: "Complex layout with multiple levels, food stalls creating obstructions, and high occupancy density during peak hours. Original design created dark zones between seating areas.",
      solution: "Implemented distributed LED emergency luminaires at 8m centres with additional units around seating clusters. Added low-level wayfinding strips and integrated with fire alarm for instant activation.",
      results: [
        "Achieved uniform 0.7 lux coverage across entire area",
        "Eliminated all dark zones and shadows",
        "Reduced evacuation time from 8 to 4 minutes in drill tests",
        "Passed all regulatory inspections with commendations"
      ],
      lessons: [
        "Multiple levels require individual assessment",
        "Furniture layout changes must trigger lighting review",
        "Integration with other emergency systems improves effectiveness"
      ]
    },
    {
      title: "University Library Study Hall",
      type: "Educational",
      icon: Users,
      area: "1200m²",
      occupancy: "300 students",
      challenge: "24-hour operation with varying occupancy levels. High shelving units created corridors and blind spots. Students often work with headphones, reducing audio alarm effectiveness.",
      solution: "Zoned emergency lighting with occupancy sensors for energy efficiency. Combination of ceiling-mounted and shelf-integrated luminaires. Added visual strobe alerts synchronized with emergency lighting activation.",
      results: [
        "Energy savings of 40% through smart activation",
        "100% coverage including all study nooks and corridors",
        "Improved student awareness through visual alerts",
        "Flexible system adapting to furniture reconfiguration"
      ],
      lessons: [
        "Smart controls can reduce energy costs without compromising safety",
        "Visual alerts complement emergency lighting in noisy environments",
        "Future-proofing for layout changes saves long-term costs"
      ]
    },
    {
      title: "Hospital Emergency Department",
      type: "Healthcare",
      icon: AlertTriangle,
      area: "600m²",
      occupancy: "120 patients + staff",
      challenge: "Critical 24/7 operation with vulnerable occupants including wheelchair users and patients on trolleys. Infection control requirements limiting fixture types. Multiple power supplies needed for redundancy.",
      solution: "Dual-supply emergency lighting with automatic changeover. IP65-rated luminaires for easy cleaning. Lower mounting height (2.8m) for better illumination of mobility aids. Integrated with hospital UPS system.",
      results: [
        "99.9% system availability through redundant supplies",
        "Enhanced safety for mobility-impaired occupants",
        "Meets strict infection control standards",
        "Seamless integration with hospital emergency systems"
      ],
      lessons: [
        "Healthcare environments require higher reliability standards",
        "Vulnerable occupants need enhanced lighting considerations",
        "Integration with building systems improves overall safety"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Detailed Case Studies
        </h2>
        <p className="text-foreground/70">
          Real-world applications demonstrating design challenges and solutions
        </p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study, index) => (
          <Card key={index} className="bg-elec-gray/50 border-elec-yellow/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <study.icon className="h-6 w-6 text-elec-yellow" />
                  <div>
                    <CardTitle className="text-foreground text-xl">{study.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                        {study.type}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {study.area}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                        {study.occupancy}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Challenge
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">{study.challenge}</p>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Solution
                    </h4>
                    <p className="text-foreground text-sm leading-relaxed">{study.solution}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Results Achieved
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-2 text-foreground text-sm">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                    <h4 className="text-elec-yellow font-semibold mb-3">Key Learning Points</h4>
                    <ul className="space-y-2">
                      {study.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-start gap-2 text-foreground text-sm">
                          <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};