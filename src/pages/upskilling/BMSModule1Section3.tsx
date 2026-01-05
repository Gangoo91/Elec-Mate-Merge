import { ArrowLeft, ArrowRight, TrendingUp, Lightbulb, CheckCircle, AlertTriangle, Target, DollarSign, ThermometerSun, Monitor, Shield, Settings, Building, Activity, Clock, Database, FileText, PoundSterling } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule1Section3QuizData } from '@/data/upskilling/bmsModule1Section3QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule1Section3 = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className={`${isMobile ? 'px-4 pt-4 pb-8' : 'px-8 pt-8 pb-12'} max-w-6xl mx-auto module-content`}>
        <Link to="../bms-module-1">
          <Button
            variant="ghost"
            className={`text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 ${
              isMobile ? 'mb-4 px-2 py-2' : 'mb-8 px-4 py-2'
            } rounded-md`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className={`space-y-${isMobile ? '6' : '8'}`}>
          {/* Header Section */}
          <div>
            <div className={`flex items-center gap-${isMobile ? '3' : '4'} mb-4`}>
              <TrendingUp className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-yellow-400 flex-shrink-0`} />
              <div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white leading-tight`}>
                  Benefits of BMS: Efficiency, Comfort, Control
                </h1>
                <p className={`${isMobile ? 'text-base' : 'text-xl'} text-white/70 mt-1`}>
                  Advantages and value proposition
                </p>
              </div>
            </div>
            <div className={`flex gap-${isMobile ? '2' : '4'} flex-wrap`}>
              <Badge variant="secondary" className={`bg-yellow-400 text-black ${isMobile ? 'text-xs' : ''}`}>
                Module 1
              </Badge>
              <Badge variant="outline" className={`border-gray-600 text-white ${isMobile ? 'text-xs' : ''}`}>
                Section 3
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader className={isMobile ? "px-4 py-4" : ""}>
              <CardTitle className={`text-white flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
                <Building className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className={`text-white space-y-4 ${isMobile ? 'px-4 text-sm' : ''}`}>
              <p>
                A Building Management System (BMS) is more than just a central control hub — it delivers real value by improving energy efficiency, occupant comfort, and building control. For building owners, this means reduced operating costs and better compliance; for occupants, it means safer and more comfortable environments.
              </p>
              <p>
                Electricians must understand these benefits to explain the value of BMS to clients and to see how their installations contribute to wider building performance. The three core benefits represent measurable improvements that justify investment and drive adoption across all building types.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader className={isMobile ? "px-4 py-4" : ""}>
              <CardTitle className={`text-white flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
                <Target className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className={`text-white ${isMobile ? 'px-4' : ''}`}>
              <p className={`mb-4 ${isMobile ? 'text-sm' : ''}`}>By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Explain the three main benefits of BMS and their measurable impacts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Describe how BMS reduces energy waste and operating costs through intelligent control</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Recognise how BMS contributes to comfort and productivity in different building types</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Understand how centralised control improves building operations and reliability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Apply knowledge of BMS benefits to client discussions and project justification</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 1: Energy Efficiency and Cost Savings */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-400" />
                1. Energy Efficiency and Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Energy efficiency represents the most quantifiable benefit of BMS implementation. Modern buildings typically achieve 15-30% energy reduction through intelligent system optimisation, translating directly to operational cost savings and improved sustainability credentials.
              </p>
              
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Key Energy Optimisation Strategies
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Demand-Based Control:</strong> HVAC systems operate based on actual occupancy and environmental conditions, not fixed schedules</li>
                  <li><strong>Load Shedding:</strong> Non-critical systems automatically reduce power during peak demand periods to avoid expensive tariff charges</li>
                  <li><strong>Free Cooling Utilisation:</strong> Systems maximise use of outside air when conditions permit, reducing mechanical cooling loads</li>
                  <li><strong>Equipment Optimisation:</strong> Motors, pumps, and fans operate at optimal efficiency points rather than fixed speeds</li>
                  <li><strong>Thermal Mass Management:</strong> Pre-cooling or pre-heating strategies utilise building thermal mass during off-peak periods</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-md border border-yellow-400/30">
                <h5 className="text-blue-300 font-medium mb-2">Energy Reporting and Analytics</h5>
                <p className="text-sm text-blue-100">
                  BMS platforms provide detailed energy consumption reports, benchmark comparisons, and trend analysis. These reports highlight inefficiencies, validate improvements, and support energy management ISO 50001 certification processes.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> How does a BMS help reduce wasted energy in heating or cooling?
                  <em className="block mt-1 text-yellow-200">Consider occupancy scheduling, weather compensation, and zone-based control.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Section 2: Occupant Comfort and Wellbeing */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-yellow-400" />
                2. Occupant Comfort and Wellbeing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Optimal environmental conditions directly impact occupant productivity, health, and satisfaction. Research indicates that proper environmental control can improve cognitive performance by up to 15% and reduce sick building syndrome symptoms significantly.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Environmental Parameters</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Temperature Control:</strong> ±1°C accuracy with zone-based management</li>
                    <li><strong>Humidity Management:</strong> 40-60% RH for optimal comfort and health</li>
                    <li><strong>Air Quality Monitoring:</strong> CO₂, VOCs, and particulate matter tracking</li>
                    <li><strong>Lighting Optimisation:</strong> Daylight harvesting and circadian rhythm support</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Building Type Applications</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Offices:</strong> Productivity optimisation and flexible workspace management</li>
                    <li><strong>Healthcare:</strong> Infection control and patient comfort requirements</li>
                    <li><strong>Education:</strong> Learning environment optimisation and behaviour management</li>
                    <li><strong>Retail:</strong> Customer experience enhancement and seasonal adaptability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30">
                <h5 className="text-green-300 font-medium mb-2">Automated Comfort Responses</h5>
                <p className="text-sm text-green-100">
                  Advanced BMS can predict comfort requirements based on weather forecasts, occupancy patterns, and historical data. Systems adjust proactively rather than reactively, maintaining consistent conditions whilst optimising energy use.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> Give one way BMS improves comfort for building occupants.
                  <em className="block mt-1 text-yellow-200">Think about automatic adjustments based on environmental conditions or occupancy.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Section 3: Centralised Monitoring and Control */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="h-5 w-5 text-yellow-400" />
                3. Centralised Monitoring and Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Centralised control transforms building operations from reactive maintenance to proactive management. Facility managers gain unprecedented visibility into all building systems through integrated dashboards and mobile access capabilities.
              </p>

              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Integrated System Management
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Monitored Systems:</h5>
                    <ul className="space-y-1">
                      <li>• HVAC equipment and zones</li>
                      <li>• Lighting circuits and emergency systems</li>
                      <li>• Fire detection and suppression</li>
                      <li>• Security and access control</li>
                      <li>• Electrical distribution and metering</li>
                      <li>• Water systems and leak detection</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Control Capabilities:</h5>
                    <ul className="space-y-1">
                      <li>• Remote equipment operation</li>
                      <li>• Schedule management and overrides</li>
                      <li>• Alarm acknowledgement and response</li>
                      <li>• Energy demand management</li>
                      <li>• Trend data analysis and reporting</li>
                      <li>• Predictive maintenance scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30">
                <h5 className="text-purple-300 font-medium mb-2">Mobile and Remote Access</h5>
                <p className="text-sm text-purple-100">
                  Modern BMS platforms provide secure mobile access, enabling facility managers to monitor systems, respond to alarms, and make adjustments from anywhere. This capability significantly reduces response times and improves operational efficiency.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> What is one advantage of centralised control through a BMS?
                  <em className="block mt-1 text-yellow-200">Consider visibility, response times, or operational efficiency.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Section 4: Long-Term Value and Compliance */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                4. Long-Term Value and Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Beyond immediate operational benefits, BMS delivers substantial long-term value through compliance support, asset protection, and future-proofing capabilities. These benefits often represent the difference between basic and premium building classifications.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Regulatory Compliance</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>EN 15232:</strong> Building automation impact on energy performance</li>
                    <li><strong>MEES Regulations:</strong> Minimum Energy Efficiency Standards support</li>
                    <li><strong>Building Regulations Part L:</strong> Energy conservation compliance</li>
                    <li><strong>BREEAM/LEED:</strong> Sustainability certification contributions</li>
                    <li><strong>Corporate ESG:</strong> Environmental, Social, Governance reporting</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Asset Protection</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Predictive Maintenance:</strong> Data-driven maintenance scheduling</li>
                    <li><strong>Equipment Optimisation:</strong> Reduced wear through intelligent operation</li>
                    <li><strong>Fault Prevention:</strong> Early detection prevents major failures</li>
                    <li><strong>Performance Benchmarking:</strong> Ongoing efficiency verification</li>
                    <li><strong>Documentation:</strong> Complete operational history maintenance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-md border border-orange-500/30">
                <h5 className="text-orange-300 font-medium mb-2">Investment Protection and ROI</h5>
                <p className="text-sm text-orange-100">
                  Typical BMS installations achieve payback periods of 2-5 years through energy savings alone. Additional benefits include reduced maintenance costs, extended equipment life, improved productivity, and enhanced building value for sale or lease.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> How does BMS contribute to extending the lifespan of equipment?
                  <em className="block mt-1 text-yellow-200">Think about operational optimisation and maintenance strategies.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Section 5: Advanced Value Propositions */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                5. Advanced Value Propositions and Market Drivers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Modern market demands extend BMS value beyond traditional benefits. Smart building technologies, cybersecurity requirements, and ESG reporting drive sophisticated system requirements that position BMS as critical infrastructure.
              </p>

              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Market Differentiators</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Technology Integration:</h5>
                    <ul className="space-y-1">
                      <li>• IoT device management</li>
                      <li>• AI-powered analytics</li>
                      <li>• Cloud platform connectivity</li>
                      <li>• Mobile workforce solutions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Business Intelligence:</h5>
                    <ul className="space-y-1">
                      <li>• Operational KPI dashboards</li>
                      <li>• Energy benchmarking</li>
                      <li>• Cost centre analysis</li>
                      <li>• Sustainability reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Future Readiness:</h5>
                    <ul className="space-y-1">
                      <li>• Smart grid integration</li>
                      <li>• EV charging coordination</li>
                      <li>• Renewable energy optimisation</li>
                      <li>• Cybersecurity frameworks</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-900/20 p-4 rounded-md border border-cyan-500/30">
                <h5 className="text-cyan-300 font-medium mb-2">Competitive Advantage</h5>
                <p className="text-sm text-cyan-100">
                  Buildings with comprehensive BMS achieve premium rental rates, reduced void periods, and enhanced asset values. Tenants increasingly prioritise smart building features for operational efficiency and corporate sustainability commitments.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Implementation Considerations */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                6. Implementation Considerations and ROI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Successful BMS implementation requires careful planning to maximise benefits and ensure sustainable operation. Understanding cost structures, phasing strategies, and performance metrics enables effective project delivery and client satisfaction.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Cost-Benefit Framework</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="font-medium text-white">Initial Investment:</h5>
                      <ul className="text-gray-300 ml-2">
                        <li>• Hardware and software costs</li>
                        <li>• Installation and commissioning</li>
                        <li>• Training and documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Ongoing Costs:</h5>
                      <ul className="text-gray-300 ml-2">
                        <li>• Software licensing and support</li>
                        <li>• Maintenance and updates</li>
                        <li>• Operator training</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Value Realisation</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h5 className="font-medium text-white">Quantifiable Benefits:</h5>
                      <ul className="text-gray-300 ml-2">
                        <li>• Energy cost reductions (15-30%)</li>
                        <li>• Maintenance cost savings (10-20%)</li>
                        <li>• Equipment life extension (20-40%)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-white">Qualitative Benefits:</h5>
                      <ul className="text-gray-300 ml-2">
                        <li>• Improved occupant satisfaction</li>
                        <li>• Enhanced building reputation</li>
                        <li>• Regulatory compliance assurance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30">
                <h5 className="text-green-300 font-medium mb-2">Phased Implementation Strategy</h5>
                <p className="text-sm text-green-100">
                  Large installations benefit from phased approaches starting with high-impact areas (HVAC and lighting), followed by secondary systems. This strategy reduces risk, demonstrates value early, and allows operational experience development before full deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Client Communication</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Highlight energy savings as the primary selling point - it's measurable and immediate</li>
                      <li>• Emphasise comfort improvements for productivity and user satisfaction</li>
                      <li>• Demonstrate centralised control benefits through mobile app examples</li>
                      <li>• Present compliance advantages for future-proofing investments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Installation Excellence</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Ensure accurate sensor placement for optimal environmental monitoring</li>
                      <li>• Maintain proper cable segregation between power and data circuits</li>
                      <li>• Verify all control connections before system commissioning</li>
                      <li>• Document all installations for effective system maintenance</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Value Demonstration</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Provide baseline energy consumption data before installation</li>
                      <li>• Set up monitoring dashboards for ongoing performance visibility</li>
                      <li>• Schedule regular review meetings to demonstrate achieved savings</li>
                      <li>• Maintain system logs for compliance and warranty purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Professional Development</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Stay current with BMS technology developments and standards</li>
                      <li>• Understand integration capabilities with renewable energy systems</li>
                      <li>• Develop familiarity with major BMS platform interfaces</li>
                      <li>• Maintain awareness of relevant building regulations and compliance requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="h-5 w-5 text-yellow-400" />
                Real World Case Study: Retail Chain BMS Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Project Overview</h4>
                <p className="text-sm mb-3">
                  A major UK retail chain implemented comprehensive BMS across 150 stores to address rising energy costs and improve environmental control for customer comfort and product preservation.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Implementation Scope:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• HVAC zone control</li>
                      <li>• LED lighting automation</li>
                      <li>• Refrigeration monitoring</li>
                      <li>• Energy metering</li>
                      <li>• Security integration</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Key Technologies:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• BACnet/IP protocol</li>
                      <li>• Wireless sensor networks</li>
                      <li>• Cloud-based analytics</li>
                      <li>• Mobile management apps</li>
                      <li>• Predictive algorithms</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Results Achieved:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• 18% energy reduction</li>
                      <li>• £400,000 annual savings</li>
                      <li>• 24-month payback period</li>
                      <li>• 95% uptime improvement</li>
                      <li>• 30% maintenance reduction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30">
                <h5 className="text-green-300 font-medium mb-2">Operational Impact</h5>
                <p className="text-sm text-green-100">
                  Staff reported significantly more comfortable working environments with consistent temperatures and lighting levels. The centralised monitoring system enabled immediate response to equipment issues, reducing customer complaints and product spoilage. The system provided comprehensive data for corporate sustainability reporting requirements.
                </p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-md border border-yellow-400/30">
                <h5 className="text-blue-300 font-medium mb-2">Lessons Learned</h5>
                <ul className="text-sm text-blue-100 space-y-1">
                  <li>• Phased rollout reduced implementation risk and enabled learning transfer between sites</li>
                  <li>• Staff training was critical for maximising system benefits and user adoption</li>
                  <li>• Regular performance reviews maintained focus on continuous improvement opportunities</li>
                  <li>• Integration with existing POS and security systems provided additional operational benefits</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Alert className="border-red-500 bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-white">
              <strong>Important Considerations:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• BMS benefits are only realised through proper installation, commissioning, and ongoing management</li>
                <li>• Client expectations must be set realistically with clear performance metrics and timelines</li>
                <li>• Training facility staff is essential for maximising system effectiveness and user acceptance</li>
                <li>• Regular system reviews and optimisation ensure continued performance and identify new opportunities</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Summary */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Key Benefits Delivered:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Energy efficiency and substantial cost reductions (15-30%)</li>
                    <li>• Enhanced occupant comfort and productivity improvements</li>
                    <li>• Centralised control with improved reliability and response times</li>
                    <li>• Long-term asset protection and compliance support</li>
                    <li>• Competitive advantage and future-proofing capabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Professional Application:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Clear value proposition development for client discussions</li>
                    <li>• Installation quality directly impacts benefit realisation</li>
                    <li>• Ongoing system optimisation maintains performance</li>
                    <li>• Professional development in BMS technologies</li>
                    <li>• Understanding of regulatory compliance requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <div className="space-y-6">
            <Card className="bg-card border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-yellow-400" />
                  Knowledge Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <p className="mb-4">
                  Test your understanding of BMS benefits with this comprehensive quiz. Answer each question to progress through the assessment.
                </p>
              </CardContent>
            </Card>
            
            <SingleQuestionQuiz 
              questions={bmsModule1Section3QuizData}
              title="BMS Benefits Assessment"
            />
          </div>

          {/* Navigation */}
          <div className={`${isMobile ? 'flex flex-col gap-3 pt-6' : 'flex justify-between pt-8'}`}>
            <Link to="../bms-module-1-section-2" className={isMobile ? 'w-full' : ''}>
              <Button 
                variant="outline" 
                className={`border-gray-600 text-white hover:bg-card ${
                  isMobile ? 'w-full py-3' : ''
                }`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-1-section-4" className={isMobile ? 'w-full' : ''}>
              <Button 
                className={`bg-yellow-400 text-black hover:bg-yellow-600 ${
                  isMobile ? 'w-full py-3' : ''
                }`}
              >
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

export default BMSModule1Section3;