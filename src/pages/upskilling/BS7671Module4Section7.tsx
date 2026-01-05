import { ArrowLeft, ArrowRight, Target, TrendingUp, Shield, Home, Zap, TestTube, Calendar, AlertCircle, AlertTriangle, Battery, Grid, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module4Section7 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "When did Amendment 3 to BS 7671 become mandatory for new electrical installations?",
      options: [
        "1st January 2024",
        "31st July 2024",
        "1st September 2024",
        "31st December 2024"
      ],
      correct: 1,
      explanation: "Amendment 3 to BS 7671 became mandatory on 31st July 2024. All new installations from this date must comply with the Amendment 3 requirements."
    },
    {
      id: 2,
      question: "Which scenario REQUIRES bidirectional protection devices according to Amendment 3?",
      options: [
        "Standard domestic lighting circuits",
        "Solar PV system with battery storage",
        "Electric shower installation",
        "Garage socket outlets"
      ],
      correct: 1,
      explanation: "Solar PV systems with battery storage require bidirectional protection because energy can flow in both directions - from the grid to charge batteries and from batteries back to the grid during discharge."
    },
    {
      id: 3,
      question: "What is the maximum time allowed for anti-islanding protection to disconnect a system after grid loss detection?",
      options: [
        "1 second",
        "3 seconds", 
        "5 seconds",
        "10 seconds"
      ],
      correct: 2,
      explanation: "Anti-islanding protection must disconnect the system within 5 seconds of detecting grid loss to prevent dangerous islanding conditions where the local generation continues to energise the local grid."
    },
    {
      id: 4,
      question: "Which consumer unit component must remain effective under reverse current conditions according to Amendment 3?",
      options: [
        "Main switch only",
        "MCBs only",
        "RCD protection",
        "Meter tails"
      ],
      correct: 2,
      explanation: "RCD protection must remain effective under reverse current conditions. Standard RCDs may not operate correctly when current flows in the reverse direction, requiring bidirectional RCD protection in renewable energy installations."
    },
    {
      id: 5,
      question: "What must be included when testing bidirectional protection devices during commissioning?",
      options: [
        "Testing in the forward direction only",
        "Visual inspection only",
        "Testing operation in both current directions",
        "Insulation resistance testing only"
      ],
      correct: 2,
      explanation: "Bidirectional protection devices must be tested for operation in both current directions to ensure they provide adequate protection whether current flows from the grid to the installation or from the installation back to the grid."
    },
    {
      id: 6,
      question: "Under Amendment 3, what happens to existing installations when renewable energy is added?",
      options: [
        "No changes required",
        "Full rewiring mandatory",
        "Upgrade requirements may apply",
        "Only visual inspection needed"
      ],
      correct: 2,
      explanation: "When renewable energy systems are added to existing installations, Amendment 3 upgrade requirements may apply, particularly for consumer units and protection devices to ensure bidirectional safety."
    },
    {
      id: 7,
      question: "Which grid code compliance is typically required for larger renewable installations under Amendment 3?",
      options: [
        "G59 only",
        "G83 requirements",
        "G98/G99 compliance",
        "No grid code requirements"
      ],
      correct: 2,
      explanation: "G98/G99 grid code compliance is required for renewable installations to ensure proper grid interaction and safety. G98 covers smaller installations while G99 covers larger commercial systems."
    },
    {
      id: 8,
      question: "What is the primary purpose of anti-islanding protection in bidirectional systems?",
      options: [
        "Reduce energy costs",
        "Prevent dangerous grid energisation during outages",
        "Improve system efficiency",
        "Monitor energy usage"
      ],
      correct: 1,
      explanation: "Anti-islanding protection prevents the renewable energy system from continuing to energise the local grid during power outages, which could create dangerous conditions for utility workers and equipment."
    }
  ];

  const bidirectionalRequirements = [
    {
      scenario: "Solar PV Systems with Battery Storage",
      requirement: "Bidirectional protection mandatory",
      reason: "Energy flows in both directions depending on generation and consumption",
      device: "MCCBs or MCBs with bidirectional capability"
    },
    {
      scenario: "Electric Vehicle Charging with V2G",
      requirement: "Enhanced grid interaction protection",
      reason: "Vehicle-to-grid technology creates reverse current flows",
      device: "Specialist EV protective devices with anti-islanding"
    },
    {
      scenario: "Domestic Solar Installations",
      requirement: "Consumer unit upgrades may be required",
      reason: "Standard MCBs may not provide adequate reverse current protection",
      device: "Type 2 coordination with bidirectional devices"
    },
    {
      scenario: "Commercial Renewable Systems",
      requirement: "Comprehensive grid interaction study",
      reason: "Large-scale generation affects local grid stability",
      device: "G98/G99 compliant protection schemes"
    },
    {
      scenario: "Heat Pump Installations with Solar",
      requirement: "Load balancing and export control",
      reason: "Heat pumps create large loads that must coordinate with generation",
      device: "Smart inverters with export limitation"
    }
  ];

  const consumerUnitRequirements = [
    "RCD protection must remain effective under reverse current conditions",
    "Main switch ratings must accommodate bidirectional current flows",
    "Overcurrent devices must provide protection in both directions",
    "Neutral isolation must be maintained during grid disconnection",
    "Arc fault protection may be required for PV DC circuits",
    "Smart meters must be capable of measuring import and export energy",
    "Type A or Type B RCDs may be required for certain inverter types"
  ];

  const testingProcedures = [
    {
      test: "Bidirectional Continuity",
      method: "Verify protective device operation in both current directions",
      acceptance: "Operation within manufacturer's specifications for both polarities"
    },
    {
      test: "Anti-Islanding Function",
      method: "Simulate grid disconnection during reverse power flow",
      acceptance: "System isolation within 5 seconds of grid loss detection"
    },
    {
      test: "RCD Operation Under Reverse Current",
      method: "Test RCD tripping with current flowing from installation to grid",
      acceptance: "Trip time and sensitivity within BS 7671 limits regardless of current direction"
    },
    {
      test: "Grid Interaction Compliance",
      method: "Verify compliance with G98/G99 grid codes",
      acceptance: "All protection settings and response times within grid code limits"
    },
    {
      test: "Export Limitation Testing",
      method: "Verify maximum export power does not exceed connection agreement",
      acceptance: "Export power limited to agreed maximum under all operating conditions"
    }
  ];

  const learningOutcomes = [
    "Identify when bidirectional protection devices are required in electrical installations",
    "Understand enhanced consumer unit requirements for renewable energy systems", 
    "Apply grid interaction safety measures and anti-islanding protection",
    "Specify appropriate testing and commissioning procedures for bidirectional systems"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../bs7671-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-yellow-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Bidirectional Protection Systems (Amendment 3)
            </h1>
          </div>
          <p className="text-base text-white max-w-3xl">
            Comprehensive protection requirements for electrical installations with renewable energy sources and bidirectional power flow
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">{/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-yellow-400" />
                Amendment 3 Overview & Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white text-lg leading-relaxed">
                Amendment 3 to BS 7671, effective from 31st July 2024, introduces critical requirements for bidirectional protection 
                in electrical installations, particularly focusing on renewable energy systems and grid interaction safety. This amendment 
                fundamentally changes how we approach electrical installations that can both consume and generate electricity.
              </p>
              
              <p className="text-white leading-relaxed">
                The key driver for Amendment 3 is the rapid growth in domestic and commercial renewable energy installations, including 
                solar PV systems, battery storage, electric vehicle charging with Vehicle-to-Grid (V2G) capability, and heat pump 
                installations. These technologies create bidirectional power flows that traditional electrical protection devices 
                were not designed to handle safely.
              </p>

              <p className="text-white leading-relaxed">
                Understanding bidirectional protection is crucial because failure to implement proper protection can result in:
                equipment damage, fire hazards, electric shock risks to maintenance personnel, and potential grid instability. 
                The amendment also addresses the increasing complexity of smart grid integration and the need for installations 
                to communicate with grid management systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-yellow-200 font-medium mb-2">Implementation Timeline</h3>
                      <p className="text-white text-sm leading-relaxed mb-2">
                        Amendment 3 became mandatory on 31st July 2024. All new installations from this date must comply with these requirements, 
                        while existing installations may require upgrades during major alterations or replacements.
                      </p>
                      <p className="text-white text-sm leading-relaxed">
                        The transition period has ended, meaning all electrical contractors must now be fully conversant with these requirements. 
                        Non-compliance can result in non-conforming installations and potential liability issues.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-blue-200 font-medium mb-2">Key Focus Areas</h3>
                      <ul className="space-y-1 text-white text-sm">
                        <li>• <strong>Bidirectional Protection Devices:</strong> Equipment that can isolate fault currents flowing in either direction</li>
                        <li>• <strong>Consumer Unit Enhancements:</strong> Upgraded components suitable for renewable energy integration</li>
                        <li>• <strong>Grid Interaction Safety:</strong> Anti-islanding protection and grid code compliance</li>
                        <li>• <strong>Updated Testing Procedures:</strong> New commissioning tests for bidirectional operation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-200 font-medium mb-2">Critical Compliance Note</h3>
                    <p className="text-white text-sm leading-relaxed mb-2">
                      Non-compliance with Amendment 3 requirements can result in dangerous operating conditions, insurance voidance, 
                      and regulatory enforcement action. Understanding these requirements is essential for current electrical practice.
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      Insurance companies are increasingly scrutinising electrical installations for Amendment 3 compliance, particularly 
                      in claims involving renewable energy systems. Proper documentation and certification are essential.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                By the end of this section, you will be able to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3 text-white">
                    <span className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bidirectional Protection Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-yellow-400" />
                Bidirectional Protection Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white mb-4">
                Amendment 3 mandates bidirectional protection where electrical installations can generate power that flows back into the supply system. 
                This represents a fundamental shift from traditional electrical installations that only consumed power from the grid.
              </p>
              
              <p className="text-white mb-4">
                Bidirectional power flow occurs when renewable energy generation exceeds local consumption, causing excess power to be exported 
                back to the grid. Traditional protection devices, such as standard MCBs and RCDs, may not operate correctly under these reverse 
                current conditions, potentially creating safety hazards.
              </p>

              <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 mb-4">
                <h3 className="text-orange-200 font-medium mb-3">Understanding Power Flow Direction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Traditional Flow (Grid → Installation)</h4>
                    <ul className="space-y-1 text-white text-sm">
                      <li>• Power consumed from electricity supplier</li>
                      <li>• Current flows in one direction only</li>
                      <li>• Standard protection devices designed for this flow</li>
                      <li>• No export concerns or grid interaction issues</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Bidirectional Flow (Installation ↔ Grid)</h4>
                    <ul className="space-y-1 text-white text-sm">
                      <li>• Power flows both to and from the grid</li>
                      <li>• Current direction changes based on generation/load</li>
                      <li>• Special protection devices required</li>
                      <li>• Grid interaction and islanding concerns</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {bidirectionalRequirements.map((req, index) => (
                  <div key={index} className="border border-gray-600/30 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{req.scenario}</h3>
                        <p className="text-yellow-400 text-sm font-medium mb-2">{req.requirement}</p>
                        <p className="text-white text-sm mb-2">{req.reason}</p>
                        <p className="text-yellow-400 text-sm"><strong>Solution:</strong> {req.device}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Consumer Unit Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Home className="h-5 w-5 text-yellow-400" />
                Enhanced Consumer Unit Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white mb-4">
                Consumer units in installations with renewable energy sources must meet enhanced requirements to ensure safety under bidirectional current conditions.
              </p>
              <div className="bg-card/80 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Key Requirements</h3>
                <ul className="space-y-2">
                  {consumerUnitRequirements.map((requirement, index) => (
                    <li key={index} className="text-white text-sm flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Smart Grid Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Grid className="h-5 w-5 text-yellow-400" />
                Smart Grid Integration & V2G Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white mb-4">
                Amendment 3 addresses the growing integration of smart grid technologies and vehicle-to-grid systems, requiring enhanced protection and coordination.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h3 className="text-blue-200 font-medium mb-3 flex items-center gap-2">
                    <Battery className="h-4 w-4" />
                    Vehicle-to-Grid (V2G) Requirements
                  </h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Bidirectional inverters with grid-tie capability</li>
                    <li>• Anti-islanding protection for grid disconnection</li>
                    <li>• Dynamic export limitation control</li>
                    <li>• Smart charging coordination with generation</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h3 className="text-green-200 font-medium mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Smart Grid Communication
                  </h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Real-time grid condition monitoring</li>
                    <li>• Demand response capability</li>
                    <li>• Grid frequency and voltage regulation</li>
                    <li>• Remote control and monitoring systems</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing and Commissioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TestTube className="h-5 w-5 text-yellow-400" />
                Testing and Commissioning Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white mb-4">
                Amendment 3 introduces specific testing requirements to verify bidirectional protection effectiveness and grid interaction safety.
              </p>
              <div className="space-y-4">
                {testingProcedures.map((test, index) => (
                  <div key={index} className="border border-gray-600/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">{test.test}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Test Method:</p>
                        <p className="text-white text-sm">{test.method}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Acceptance Criteria:</p>
                        <p className="text-white text-sm">{test.acceptance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="h-5 w-5 text-yellow-400" />
                Implementation and Compliance Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h3 className="text-green-200 font-medium mb-3">From 31st July 2024</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• All new installations must comply with Amendment 3</li>
                    <li>• New renewable energy systems require bidirectional protection</li>
                    <li>• Consumer unit replacements must meet enhanced requirements</li>
                    <li>• Testing procedures must include bidirectional verification</li>
                    <li>• EV charging installations need V2G compatibility assessment</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <h3 className="text-yellow-200 font-medium mb-3">Existing Installations</h3>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• No immediate requirement to upgrade existing compliant installations</li>
                    <li>• Major alterations must consider Amendment 3 requirements</li>
                    <li>• Addition of renewable energy triggers upgrade requirements</li>
                    <li>• EICR assessments should reference Amendment 3 compliance</li>
                    <li>• Heat pump installations may require consumer unit upgrades</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-200 font-medium mb-2">Non-Compliance Risks</h3>
                    <p className="text-white text-sm leading-relaxed">
                      Failure to implement Amendment 3 requirements can result in dangerous back-feed conditions, 
                      equipment damage, fire risks, and potential liability issues. Insurance coverage may be 
                      affected for non-compliant installations, particularly in renewable energy and EV charging applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Applications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-yellow-400" />
                Real-World Application Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white mb-4">
                Understanding how Amendment 3 applies in practical scenarios helps ensure proper implementation and compliance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h3 className="text-blue-200 font-medium mb-3">Scenario 1: Domestic Solar with Battery Storage</h3>
                  <p className="text-white text-sm mb-2">
                    <strong>Challenge:</strong> 4kW solar PV system with 10kWh battery storage on existing installation.
                  </p>
                  <p className="text-white text-sm mb-2">
                    <strong>Amendment 3 Requirements:</strong> Consumer unit must handle bidirectional current, RCD protection effective in both directions, anti-islanding protection mandatory.
                  </p>
                  <p className="text-white text-sm">
                    <strong>Solution:</strong> Upgrade to Type A RCD, install G98-compliant inverter with anti-islanding, verify all MCBs suitable for reverse current.
                  </p>
                </div>
                
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h3 className="text-green-200 font-medium mb-3">Scenario 2: Commercial EV Charging Hub with V2G</h3>
                  <p className="text-white text-sm mb-2">
                    <strong>Challenge:</strong> 50kW bidirectional EV charging station with grid support functionality.
                  </p>
                  <p className="text-white text-sm mb-2">
                    <strong>Amendment 3 Requirements:</strong> G99 compliance, comprehensive protection coordination, smart grid communication.
                  </p>
                  <p className="text-white text-sm">
                    <strong>Solution:</strong> Install dedicated protection panel with bidirectional devices, implement smart control system, comprehensive testing regime.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Assessment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Knowledge Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of Amendment 3 bidirectional protection requirements with this comprehensive assessment.
              </p>
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Amendment 3 Bidirectional Protection Quiz"
                description="Assess your knowledge of the new requirements"
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Navigation */}
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Link to="../bs7671-module-4-section-6">
              <Button variant="outline" className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: AFDDs
              </Button>
            </Link>
            
            <Link to="../bs7671-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto">
                Complete Module 4
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BS7671Module4Section7;