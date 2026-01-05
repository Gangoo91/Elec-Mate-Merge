import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Network, Target, CheckCircle, Zap, Cpu, HardDrive, Router, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section5QuizData } from '@/data/upskilling/bmsModule2Section5QuizData';

const BMSModule2Section5 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'I/O Modules and Expansion Devices | BMS Module 2 Section 5';
    document.title = title;
    const desc = 'Learn about I/O modules and expansion devices in Building Management Systems. Understand system expansion, digital/analog modules, and installation requirements.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineAnswer = (checkId: string, answerIndex: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: answerIndex }));
  };

  const InlineCheck = ({ 
    id, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    id: string; 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }) => {
    const selectedAnswer = inlineChecks[id];
    const showFeedback = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineAnswer(id, index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  showFeedback
                    ? index === correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-white'
                    : selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-600/20 text-white'
                    : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showFeedback
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {showFeedback && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Cpu className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  I/O Modules and Expansion Devices
                </h1>
                <p className="text-base text-white mt-2">
                  Expanding BMS controller capacity with additional input/output modules
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                18 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                A Building Management System (BMS) controller can only handle a limited number of inputs and outputs (I/O). 
                To manage larger or more complex systems, additional <strong>I/O modules and expansion devices</strong> are used.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                These devices allow electricians and engineers to connect more sensors, actuators, and control points 
                without replacing the main controller. Understanding when and how to implement expansion modules is 
                essential for scalable BMS installations.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4 text-base sm:text-lg">By the end of this section, you should be able to:</p>
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Explain the purpose of I/O modules and expansion devices in a BMS",
                  "Identify when expansion modules are needed", 
                  "Understand how digital and analog signals are extended",
                  "Recognise the electrician's role in installing and wiring I/O modules"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Purpose of I/O Modules */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Cpu className="h-6 w-6 text-yellow-400" />
                1. Purpose of I/O Modules
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                I/O modules expand the capacity of BMS controllers by providing additional connection points 
                for sensors, actuators, and control devices without requiring expensive controller upgrades.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Functions:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Capacity Extension</h5>
                    <p className="text-sm text-white">Add more connection points when the main controller's I/O capacity is exceeded</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Distributed Architecture</h5>
                    <p className="text-sm text-white">Install modules locally near equipment to reduce cable runs and improve signal quality</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Cost-Effective Expansion</h5>
                    <p className="text-sm text-white">More economical than replacing the main controller with a larger unit</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">System Flexibility</h5>
                    <p className="text-sm text-white">Allow for future expansion and modifications without major system changes</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Installation Locations</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Local Installation</h5>
                    <p className="mb-2">Near equipment being controlled</p>
                    <p className="mb-2">Reduces cable runs and costs</p>
                    <p>Improves signal quality and reliability</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Central Installation</h5>
                    <p className="mb-2">In main control panels</p>
                    <p className="mb-2">Easier maintenance and access</p>
                    <p>Better environmental protection</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">When Expansion is Needed</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Controller Capacity Exceeded</h5>
                    <p>Main controller has insufficient I/O points for project requirements</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Future-Proofing</h5>
                    <p>Anticipating system growth and expansion requirements</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Distributed Control</h5>
                    <p>Equipment located far from main controller requires local I/O</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Retrofit Projects</h5>
                    <p>Adding new sensors and actuators to existing systems</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="Why would an I/O module be added to a BMS?"
                options={[
                  "To replace a faulty main controller",
                  "To provide additional connection points when controller capacity is exceeded",
                  "To convert all signals from analog to digital", 
                  "To reduce the system's power consumption"
                ]}
                correctAnswer={1}
                explanation="I/O modules are added to provide additional connection points for sensors and actuators when the main controller's capacity is exceeded, allowing system expansion without replacing the controller."
              />
            </CardContent>
          </Card>

          {/* Section 2: Types of Expansion Devices */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <HardDrive className="h-6 w-6 text-yellow-400" />
                2. Types of Expansion Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Different types of I/O modules handle specific signal types and control functions. 
                Understanding each type helps in selecting the correct module for specific applications.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Digital Input Modules:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Applications</h5>
                    <p className="text-sm text-white">Door contacts, window switches, pump status, fan status, alarm inputs, emergency stops</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Signal Types</h5>
                    <p className="text-sm text-white">Dry contacts, 24V DC/AC signals, voltage-free contacts</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Typical Capacity</h5>
                    <p className="text-sm text-white">8, 16, or 32 input points per module</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-3">Digital Output Modules:</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Control Functions</h5>
                    <p>Pump starters, fan contactors, lighting circuits, valve on/off control, alarm sounders</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Output Types</h5>
                    <p>Relay outputs (volt-free), transistor outputs (24V DC), triac outputs (240V AC)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Load Ratings</h5>
                    <p>Typically 2A to 10A per channel, depending on output type and voltage</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-3">Analog Input Modules:</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Connected Sensors</h5>
                    <p>Temperature sensors (NTC, RTD), humidity transmitters, CO₂ sensors, pressure transmitters</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Signal Types</h5>
                    <p>0-10V DC, 4-20mA, resistance (RTD, thermistor), thermocouple</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Resolution</h5>
                    <p>12-bit to 16-bit conversion for high accuracy measurements</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-3">Analog Output Modules:</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Control Applications</h5>
                    <p>Modulating valve actuators, damper actuators, variable speed drives, heating element control</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Output Signals</h5>
                    <p>0-10V DC, 4-20mA current loop, adjustable voltage ranges</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Control Range</h5>
                    <p>Typically 0-100% modulation with high resolution control</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="Give one example of a device connected via an analog output module."
                options={[
                  "A door contact switch",
                  "A fire alarm sounder",
                  "A modulating valve actuator", 
                  "A pump status indicator"
                ]}
                correctAnswer={2}
                explanation="Analog output modules connect to devices requiring variable control signals, such as modulating valve actuators that need precise positioning control."
              />
            </CardContent>
          </Card>

          {/* Section 3: Communication and Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Router className="h-6 w-6 text-yellow-400" />
                3. Communication and Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Expansion modules must communicate effectively with the main BMS controller using standardised 
                protocols and proper addressing schemes for reliable system operation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Communication Protocols:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">BACnet</h5>
                    <p className="text-sm text-white">Open standard protocol widely used in commercial buildings. Supports BACnet/IP over Ethernet and BACnet MS/TP over RS-485</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Modbus</h5>
                    <p className="text-sm text-white">Simple, robust protocol for industrial applications. Available as Modbus RTU (serial) and Modbus TCP (Ethernet)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Proprietary Protocols</h5>
                    <p className="text-sm text-white">Manufacturer-specific protocols often optimised for specific systems but may limit interoperability</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">LonWorks</h5>
                    <p className="text-sm text-white">ISO/IEC standard protocol with built-in networking and interoperability features</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Module Addressing and Configuration</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Physical Addressing</h5>
                    <p className="mb-2">DIP switches or rotary switches on module</p>
                    <p className="mb-2">Each module needs unique address</p>
                    <p>Address range defined by protocol</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Software Configuration</h5>
                    <p className="mb-2">Point mapping in BMS software</p>
                    <p className="mb-2">Signal type and range configuration</p>
                    <p>Alarm and trending setup</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Installation Types</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Panel-Mounted Modules</h5>
                    <p>Installed in control panels with environmental protection. Suitable for central locations with multiple cable terminations</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">DIN Rail Modules</h5>
                    <p>Compact modules for standard DIN rail mounting in distribution boards. Easy installation and replacement</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Remote Terminal Units (RTUs)</h5>
                    <p>Weatherproof enclosures for outdoor or harsh environment installations</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Network Considerations</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Cable Requirements</h5>
                    <p>Use appropriate cable for protocol (Cat5e for Ethernet, screened twisted pair for RS-485)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Network Topology</h5>
                    <p>Follow protocol requirements for daisy-chain, star, or ring topologies</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Termination and Bias</h5>
                    <p>Proper line termination essential for reliable serial communication</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="What must be configured so the BMS recognises an expansion module?"
                options={[
                  "The module's power consumption rating",
                  "The module's communication address and point mapping",
                  "The module's physical dimensions", 
                  "The module's colour coding scheme"
                ]}
                correctAnswer={1}
                explanation="Each expansion module must have a unique communication address configured and its input/output points properly mapped in the BMS software so the controller can recognise and communicate with it."
              />
            </CardContent>
          </Card>

          {/* Section 4: Installation and Electrician's Role */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                4. Installation and Electrician's Role
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper installation of I/O modules requires careful attention to power supply, wiring practices, 
                and system integration to ensure reliable operation and ease of maintenance.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Essential Installation Requirements:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Power Supply Verification</h5>
                    <p className="text-sm text-white">Confirm correct voltage (typically 24V DC/AC) and adequate current capacity for all connected modules</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Wiring Segregation</h5>
                    <p className="text-sm text-white">Keep power and signal wiring separate to avoid interference. Use different cable routes and trunking</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Environmental Protection</h5>
                    <p className="text-sm text-white">Ensure appropriate IP rating for installation location. Consider temperature and humidity conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Earthing and Screening</h5>
                    <p className="text-sm text-white">Proper earthing of module chassis and screening of signal cables to prevent interference</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Critical Installation Checks</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Datasheet Compliance</h5>
                    <p>Wire modules exactly according to manufacturer's datasheets. Check pinouts and terminal assignments</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Address Configuration</h5>
                    <p>Set unique communication addresses using DIP switches or software configuration</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Cable Specifications</h5>
                    <p>Use correct cable types and sizes. Signal cables often require screening or specific impedance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Load Verification</h5>
                    <p>Ensure output modules are not overloaded. Check current ratings for all connected devices</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Labelling and Documentation</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Module Identification</h5>
                    <p>Clear labelling of each module with address, function, and location reference</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Terminal Marking</h5>
                    <p>All terminals clearly marked with point numbers and cable references</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Cable Schedules</h5>
                    <p>Comprehensive cable schedules showing connections between modules and field devices</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">As-Built Documentation</h5>
                    <p>Updated drawings and schedules reflecting actual installation for maintenance teams</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Commissioning and Testing</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Communication Testing</h5>
                    <p>Verify all modules are recognised by the main controller and responding correctly</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">I/O Point Testing</h5>
                    <p>Test all input and output points individually to confirm correct operation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Signal Quality Checks</h5>
                    <p>Measure analog signal levels and verify they are within expected ranges</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">System Integration</h5>
                    <p>Work with commissioning engineers to integrate modules into overall control strategy</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="Why is labelling important when installing I/O expansion modules?"
                options={[
                  "To meet fire safety regulations",
                  "For easy identification, maintenance, and troubleshooting",
                  "To improve the system's energy efficiency", 
                  "To reduce electromagnetic interference"
                ]}
                correctAnswer={1}
                explanation="Clear labelling is essential for easy identification, maintenance, and troubleshooting, especially in I/O panels that contain many modules and terminations. It helps technicians quickly locate and work on specific points."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg font-medium text-yellow-400">As an electrician:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Always check if the system design requires extra I/O before starting installation work</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Install expansion modules close to the equipment they serve to reduce cabling runs and costs</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Work closely with commissioning engineers to verify all points are recognised by the BMS</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Keep wiring tidy and well-labelled — I/O panels often contain many terminations, so clarity is vital</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">The Problem</h4>
                <p className="text-red-100 text-sm">
                  On a university campus project, the main BMS controller ran out of analog inputs because 
                  extra CO₂ sensors were added to more classrooms during construction. The existing controller 
                  had no spare capacity for the additional sensors.
                </p>
              </div>
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">The Solution</h4>
                <p className="text-amber-100 text-sm">
                  An analog input expansion module was installed in the plant room panel. The module was 
                  configured with a unique BACnet address and connected to the main controller via the 
                  existing RS-485 network. All new CO₂ sensors were wired to this expansion module.
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">The Result</h4>
                <p className="text-green-100 text-sm">
                  Once properly addressed and tested, the BMS could monitor all classrooms effectively 
                  without replacing the main controller. The expansion module provided 16 additional 
                  analog inputs at a fraction of the cost of a controller upgrade, and the installation 
                  was completed on schedule.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>I/O modules extend the capacity of BMS controllers without requiring expensive upgrades</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Types include digital input/output and analog input/output modules for different signal types</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Expansion devices communicate with the controller using standard protocols like BACnet and Modbus</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Electricians are responsible for proper wiring, addressing, labelling, and commissioning verification</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule2Section5QuizData}
                title="I/O Modules and Expansion Devices Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-2-section-4">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-2-section-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default BMSModule2Section5;