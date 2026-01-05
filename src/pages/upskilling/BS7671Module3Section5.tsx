import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { EarthingProtectionContent } from '@/components/upskilling/bs7671-module3/EarthingProtectionContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module3Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does ADS stand for?",
      options: [
        "Advanced Detection System",
        "Automatic Disconnection of Supply",
        "Arc Detection Safety",
        "Automatic Device Switching"
      ],
      correct: 1,
      explanation: "ADS stands for Automatic Disconnection of Supply - the protective measure that ensures automatic disconnection during earth faults."
    },
    {
      id: 2,
      question: "What protective method is required in TT systems?",
      options: [
        "MCBs only",
        "Fuses only",
        "RCD protection is essential",
        "No special protection needed"
      ],
      correct: 2,
      explanation: "TT systems have high earth fault loop impedance, making RCD protection essential for achieving required disconnection times."
    },
    {
      id: 3,
      question: "Define SELV.",
      options: [
        "Safety Extra Low Voltage - separated supply ≤50V AC",
        "Standard Electrical Low Voltage",
        "Secure Emergency Low Voltage",
        "Single Earth Low Voltage"
      ],
      correct: 0,
      explanation: "SELV is Safety Extra Low Voltage - a separated supply not exceeding 50V AC or 120V DC, with safety isolation from higher voltages."
    },
    {
      id: 4,
      question: "What's the max disconnection time for a socket outlet?",
      options: [
        "5 seconds",
        "0.4 seconds",
        "1 second",
        "0.1 seconds"
      ],
      correct: 1,
      explanation: "Socket outlets require maximum 0.4 second disconnection time due to increased risk of direct contact and portable equipment use."
    },
    {
      id: 5,
      question: "What does a Zs test measure?",
      options: [
        "Cable insulation resistance",
        "Earth fault loop impedance",
        "Load current",
        "Voltage drop"
      ],
      correct: 1,
      explanation: "Zs test measures earth fault loop impedance - the total impedance of the fault path including source, line and earth conductors."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../bs7671-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Earthing Arrangements and Protective Measures Selection
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-white">
                  Matching earthing systems with appropriate protection strategies
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.5
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
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                Protective measures are the cornerstone of electrical safety, ensuring automatic disconnection during fault conditions to prevent electric shock and fire hazards. The selection of appropriate protective measures must be carefully matched to the earthing system type and installation characteristics.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                BS 7671 provides detailed requirements for various protective measures including Automatic Disconnection of Supply (ADS), RCD protection, SELV systems, and more. Understanding how these measures interact with different earthing arrangements is crucial for designing safe, compliant installations.
              </p>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                This section explores the relationship between earthing systems and protective measures, providing practical guidance for selecting and implementing appropriate protection strategies that ensure both safety and regulatory compliance.
              </p>
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
              <p className="text-sm sm:text-base text-white mb-4">
                By the end of this section, you will be able to:
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Evaluate</strong> earthing system characteristics and their impact on protective measure selection</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Design</strong> ADS systems with appropriate disconnection times for different circuit types</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Calculate</strong> earth fault loop impedance (Zs) values and compare with maximum permitted values</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Select</strong> appropriate RCD types and ratings for TT system installations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Apply</strong> SELV and PELV systems where enhanced safety is required</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base"><strong>Assess</strong> protective measure effectiveness through proper testing and verification procedures</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Content */}
          <EarthingProtectionContent />

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
                <h4 className="text-white font-semibold mb-3">TN System Zs Test Failure</h4>
                <p className="text-sm mb-3">
                  A TN system circuit with high impedance fails the Zs test. The installer did not select the correct breaker size—leading to non-compliance.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-white">
                    <strong>Root Cause:</strong> Long cable run increased Zs beyond the protective device's capability. Solution required either larger cable, smaller protective device rating, or RCD protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Every design must meet fault clearance times and protective measure guidelines. BS 7671 provides exact criteria per system type.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Protection strategy must match the earthing system type</li>
                  <li>• ADS is most common but requires low earth fault loop impedance</li>
                  <li>• TT systems rely heavily on RCD protection</li>
                  <li>• Disconnection times are strictly regulated by circuit type</li>
                  <li>• Zs testing verifies protective device coordination</li>
                  <li>• SELV/PELV provide safety through voltage limitation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671EmbeddedQuiz 
            questions={quizQuestions}
            title="Knowledge Check Quiz"
            description="Test your understanding of earthing arrangements and protective measures."
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-3-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-3-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section: Amendment 2 Highlights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module3Section5;