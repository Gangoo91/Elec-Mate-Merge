import { ArrowLeft, ArrowRight, Thermometer, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { ExternalInfluencesContent } from '@/components/upskilling/bs7671-module3/ExternalInfluencesContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module3Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does code AE1 refer to?",
      options: [
        "High temperature environment",
        "Presence of water (rain protection not required)",
        "Corrosive environment",
        "High impact risk"
      ],
      correct: 1,
      explanation: "AE1 refers to environmental conditions where rain protection is not required - typically indoor dry locations."
    },
    {
      id: 2,
      question: "Give one example of a mechanical influence.",
      options: [
        "High temperature",
        "Presence of chemicals",
        "Risk of impact or vibration",
        "UV exposure"
      ],
      correct: 2,
      explanation: "Mechanical influences (BE codes) include risks of impact, vibration, or other physical forces that could damage electrical equipment."
    },
    {
      id: 3,
      question: "Why is UV protection important for external cabling?",
      options: [
        "It improves conductivity",
        "UV degrades cable insulation causing brittleness and failure",
        "It reduces installation costs",
        "It's only cosmetic"
      ],
      correct: 1,
      explanation: "UV radiation degrades many cable insulation materials, causing them to become brittle and crack, leading to potential safety hazards."
    },
    {
      id: 4,
      question: "What code relates to corrosion risk?",
      options: [
        "AE (climatic)",
        "BE (mechanical)",
        "AF (chemical)",
        "AD (water)"
      ],
      correct: 2,
      explanation: "AF codes relate to chemical influences including corrosive substances that can damage electrical equipment and cables."
    },
    {
      id: 5,
      question: "What should you check before selecting materials?",
      options: [
        "Only the price",
        "Environmental conditions and influence codes",
        "Installation speed only",
        "Colour preferences"
      ],
      correct: 1,
      explanation: "All environmental conditions and their corresponding influence codes must be assessed to select appropriate materials and installation methods."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Thermometer className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  External Influences and Installation Conditions
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Environmental conditions affecting material selection and installation methods
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                15 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                Introduction: Environmental Conditions and Installation Longevity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  Environmental Assessment: Critical for Safety and Reliability
                </h4>
                <p className="text-base leading-relaxed mb-3">
                  Environmental conditions are often the determining factor between a successful long-term installation and catastrophic failure. Every year, thousands of electrical installations fail prematurely due to inadequate environmental assessment, resulting in equipment replacement costs, safety hazards, and potential fatalities.
                </p>
                <p className="text-base leading-relaxed">
                  BS 7671's systematic environmental classification system provides the framework for making informed material selection and installation method decisions. Understanding these influence codes is essential for preventing costly mistakes and ensuring installations remain safe throughout their design life.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                  <h5 className="text-red-400 font-semibold mb-2">Consequences of Poor Environmental Assessment:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Cable insulation degradation and failure within months</li>
                    <li>• Corrosion of metalwork creating shock hazards</li>
                    <li>• Water ingress causing earth faults and equipment damage</li>
                    <li>• UV damage making cables brittle and dangerous</li>
                    <li>• Chemical exposure compromising safety systems</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                  <h5 className="text-green-400 font-semibold mb-2">Benefits of Comprehensive Assessment:</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Installations lasting full design life (25+ years)</li>
                    <li>• Minimal maintenance and replacement costs</li>
                    <li>• Consistent safety performance</li>
                    <li>• Compliance with warranty requirements</li>
                    <li>• Professional reputation and client confidence</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Real-World Impact
                </h5>
                <p className="text-sm">
                  Environmental assessment skills directly impact project success. Contractors who consistently deliver installations that perform reliably in challenging environments build strong client relationships and command premium pricing. Conversely, repeated environmental failures damage professional reputation and profitability.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30 mb-4">
                <p className="text-sm text-blue-300">
                  Upon completion, you will confidently assess environmental conditions, apply BS 7671 influence codes systematically, and select materials and installation methods that ensure long-term reliability in challenging environments.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Knowledge & Comprehension:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Identify and classify environmental conditions using BS 7671 influence codes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Explain how environmental factors affect material performance and safety</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Describe material properties and suitability for different conditions</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Application & Analysis:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Assess environmental conditions and select appropriate IP ratings and cable types</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Analyse complex environmental combinations and their cumulative effects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compare installation methods and recommend optimal approaches</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Application & Evaluation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">Design Competencies:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Conduct systematic environmental surveys</li>
                      <li>• Justify material selections with technical evidence</li>
                      <li>• Plan for environmental changes over installation life</li>
                      <li>• Design maintenance access for harsh environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-2">Assessment Criteria:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Environmental condition identification accuracy</li>
                      <li>• Appropriate influence code application</li>
                      <li>• Cost-effective material selection reasoning</li>
                      <li>• Long-term performance prediction capability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Content */}
          <ExternalInfluencesContent />

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Food Factory Installation Failure</h4>
                <p className="text-sm mb-3">
                  A contractor installs PVC conduit in a food factory where regular cleaning uses caustic chemicals. Within months, the conduit is brittle and damaged—non-compliant due to poor material selection.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white">Poor environmental assessment leads to premature failure and safety issues.</p>
                </div>
              </div>
              
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-400 font-semibold mb-3">✅ Correct Approach</h4>
                <p className="text-sm">
                  Survey identifies AF2 (chemical exposure). Specification includes chemical-resistant conduit (stainless steel or special polymer). Installation remains compliant and safe for decades.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Check Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Test your understanding of external influences and environmental conditions"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-3-section-2">
              <Button
                variant="outline"
                className="text-foreground border-gray-600 hover:bg-card hover:text-yellow-400 transition-all duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            
            <Link to="../bs7671-module-3-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module3Section3;