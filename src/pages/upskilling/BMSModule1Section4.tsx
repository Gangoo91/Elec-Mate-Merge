import { ArrowLeft, ArrowRight, MapPin, Target, CheckCircle, Building2, Heart, ShoppingCart, Factory, AlertCircle, Lightbulb, DollarSign, Shield, Users, Zap, Activity, Settings, Monitor, Clock, TrendingUp, ThermometerSun, Database, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule1Section4QuizQuestions } from '@/data/upskilling/bmsModule1Section4QuizData';

const BMSModule1Section4 = () => {
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
              <MapPin className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-yellow-400 flex-shrink-0`} />
              <div>
                <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white leading-tight`}>
                  Real-World Environments Using BMS
                </h1>
                <p className={`${isMobile ? 'text-base' : 'text-xl'} text-white/70 mt-1`}>
                  Commercial, Healthcare, and Retail Applications
                </p>
              </div>
            </div>
            <div className={`flex gap-${isMobile ? '2' : '4'} flex-wrap`}>
              <Badge variant="secondary" className={`bg-yellow-400 text-black ${isMobile ? 'text-xs' : ''}`}>
                Module 1
              </Badge>
              <Badge variant="outline" className={`border-gray-600 text-white ${isMobile ? 'text-xs' : ''}`}>
                Section 4
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader className={isMobile ? "px-4 py-4" : ""}>
              <CardTitle className={`text-white flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
                <Building2 className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className={`text-white space-y-4 ${isMobile ? 'px-4 text-sm' : ''}`}>
              <p>
                A Building Management System (BMS) adapts to the needs of different environments. The way a BMS is applied in a commercial office is very different from how it supports a hospital or a retail store. By looking at these real-world examples, electricians gain insight into how BMS works across industries and why the technology is becoming standard in modern buildings.
              </p>
              <p>
                Each sector has unique operational priorities, regulatory requirements, and performance expectations that shape BMS implementation. Understanding these differences enables electricians to specify appropriate solutions, highlight sector-specific benefits, and deliver installations that truly meet client needs whilst ensuring compliance with relevant standards including BS 7671.
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
                  <span className={isMobile ? 'text-sm' : ''}>Identify how BMS is used in commercial, healthcare, and retail environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Explain the specific benefits BMS delivers in each sector and their measurable impacts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Understand the different system priorities depending on the type of building</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Recognise opportunities for electricians to contribute in these environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className={isMobile ? 'text-sm' : ''}>Apply sector-specific knowledge to client discussions and project specifications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Commercial Offices */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-yellow-400" />
                1. Commercial Offices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Commercial office environments prioritise energy efficiency, occupant comfort, and productivity optimisation. Modern office buildings typically achieve 20-35% energy savings through intelligent BMS implementation whilst improving workspace satisfaction scores and reducing operational overhead.
              </p>
              
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Energy Optimisation Strategies
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Occupancy-Based Control:</strong> HVAC and lighting systems respond to actual space utilisation, not fixed schedules</li>
                  <li><strong>Demand Response:</strong> Automatic load shedding during peak tariff periods reduces operational costs by 15-25%</li>
                  <li><strong>Zone Management:</strong> Individual floor or department control optimises comfort whilst minimising energy waste</li>
                  <li><strong>Meeting Room Intelligence:</strong> Spaces pre-condition before bookings and return to setback when vacant</li>
                  <li><strong>Daylight Integration:</strong> Automated blinds and dimming systems maximise natural light utilisation</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Workplace Comfort Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Temperature Zones:</strong> Individual area control for optimal comfort</li>
                    <li><strong>Air Quality Management:</strong> CO₂ monitoring drives fresh air ventilation</li>
                    <li><strong>Lighting Scenes:</strong> Task-specific illumination levels and colour temperature</li>
                    <li><strong>Noise Control:</strong> HVAC operation optimised to minimise acoustic disruption</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Operational Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Remote Monitoring:</strong> 24/7 system oversight reduces site visits by 60%</li>
                    <li><strong>Predictive Maintenance:</strong> Equipment condition monitoring prevents failures</li>
                    <li><strong>Reporting Dashboard:</strong> Energy and comfort metrics support facility management</li>
                    <li><strong>Tenant Satisfaction:</strong> Improved comfort scores and reduced complaints</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-md border border-yellow-400/30">
                <h5 className="text-blue-300 font-medium mb-2">Flexible Workspace Integration</h5>
                <p className="text-sm text-blue-100">
                  Modern office BMS supports hot-desking and flexible working through mobile apps that allow occupants to pre-condition personal workspace areas, book meeting rooms with automatic environmental setup, and provide feedback on comfort conditions for continuous optimisation.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> What is one way BMS helps reduce wasted energy in commercial offices?
                  <em className="block mt-1 text-yellow-200">Consider occupancy scheduling, zone-based control, and demand management.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Healthcare Facilities */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Heart className="h-5 w-5 text-yellow-400" />
                2. Healthcare Facilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Healthcare facilities demand the highest levels of reliability, safety, and environmental control. BMS in hospitals and clinics must comply with HTM 03-01 ventilation standards whilst ensuring critical systems maintain operation during any failure scenario. Patient safety and infection control take absolute priority over energy efficiency.
              </p>
              
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Critical System Monitoring
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Operating Theatre Control:</strong> Positive pressure maintenance, HEPA filtration, and temperature stability ±1°C</li>
                  <li><strong>Isolation Room Management:</strong> Negative pressure monitoring with alarm escalation for infectious disease control</li>
                  <li><strong>Emergency Power Systems:</strong> UPS and generator status with automatic failover testing and verification</li>
                  <li><strong>Medical Gas Systems:</strong> Pipeline pressure monitoring and alarm management for life-critical supplies</li>
                  <li><strong>Nurse Call Integration:</strong> Patient emergency systems linked to BMS for coordinated response</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Air Quality Standards</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>HEPA Filtration:</strong> 99.97% particle removal efficiency monitoring</li>
                    <li><strong>Air Change Rates:</strong> 6-25 ACH depending on clinical area requirements</li>
                    <li><strong>Pressure Differentials:</strong> Continuous monitoring with immediate alarm response</li>
                    <li><strong>Humidity Control:</strong> 45-55% RH for infection control and patient comfort</li>
                    <li><strong>Temperature Stability:</strong> ±0.5°C in critical areas like ICU and theatres</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Reliability Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Redundant Systems:</strong> N+1 configuration for all critical plant</li>
                    <li><strong>Priority Loading:</strong> Automatic load shedding to maintain essential services</li>
                    <li><strong>Alarm Escalation:</strong> Multi-tier notification with engineering response protocols</li>
                    <li><strong>Backup Controls:</strong> Local override capability for all critical functions</li>
                    <li><strong>Performance Logging:</strong> Continuous data recording for compliance verification</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-900/20 p-4 rounded-md border border-red-500/30">
                <h5 className="text-red-300 font-medium mb-2">Infection Control Through Environmental Management</h5>
                <p className="text-sm text-red-100">
                  BMS plays a crucial role in infection prevention through precise control of airflow patterns, surface temperatures, and humidity levels. Studies show that proper environmental control can reduce healthcare-associated infections by up to 30% whilst supporting patient recovery and staff safety.
                </p>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30">
                <h5 className="text-purple-300 font-medium mb-2">Regulatory Compliance</h5>
                <p className="text-sm text-purple-100">
                  Healthcare BMS must comply with HTM 03-01 (ventilation), HTM 06-02 (electrical safety), and CQC regulations. The system provides automated compliance reporting, alarm logs, and performance verification data required for regulatory inspections and accreditation processes.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> Why is air quality control especially important in hospitals?
                  <em className="block mt-1 text-yellow-200">Think about infection control, patient safety, and regulatory requirements.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Retail Environments */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-yellow-400" />
                3. Retail Environments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Retail environments focus on customer experience optimisation whilst maximising operational efficiency and cost control. BMS in retail settings typically reduces energy costs by 25-40% through intelligent scheduling and dynamic environment control that adapts to customer patterns and seasonal requirements.
              </p>
              
              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Customer Experience Optimisation
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Dynamic Lighting Scenes:</strong> Daylight harvesting and accent lighting to highlight products and create ambiance</li>
                  <li><strong>Thermal Comfort Zones:</strong> Different temperature control for customer areas, changing rooms, and storage</li>
                  <li><strong>Seasonal Adaptation:</strong> Automatic adjustment for weather conditions and customer clothing expectations</li>
                  <li><strong>Peak Hour Management:</strong> Enhanced ventilation and cooling during busy periods</li>
                  <li><strong>Security Integration:</strong> Coordinated lighting and CCTV for theft prevention and customer safety</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Operational Scheduling</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Trading Hours:</strong> Automatic environmental startup before opening</li>
                    <li><strong>Stock Management:</strong> Controlled lighting for night-time replenishment</li>
                    <li><strong>Cleaning Cycles:</strong> Enhanced ventilation during deep cleaning periods</li>
                    <li><strong>Seasonal Events:</strong> Pre-programmed settings for sales periods and holidays</li>
                    <li><strong>Multi-Zone Control:</strong> Independent management of shop floor, storage, and office areas</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Cost Management Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Peak Demand Avoidance:</strong> Load shifting to reduce tariff charges by up to 30%</li>
                    <li><strong>Energy Monitoring:</strong> Real-time consumption tracking with benchmarking</li>
                    <li><strong>Equipment Optimisation:</strong> Variable speed drives for HVAC efficiency</li>
                    <li><strong>Occupancy Response:</strong> Reduced conditioning when customer numbers are low</li>
                    <li><strong>Maintenance Optimisation:</strong> Scheduled cleaning and servicing to minimise disruption</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30">
                <h5 className="text-green-300 font-medium mb-2">Security and Safety Integration</h5>
                <p className="text-sm text-green-100">
                  Retail BMS integrates with security systems to provide coordinated emergency response, automatic lighting adjustments for optimal CCTV performance, and panic button integration that can trigger immediate environmental responses such as full lighting activation and public address system connection.
                </p>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-md border border-orange-500/30">
                <h5 className="text-orange-300 font-medium mb-2">Multi-Site Management</h5>
                <p className="text-sm text-orange-100">
                  Chain retailers benefit from centralised BMS management across multiple locations, enabling consistent customer experience, bulk energy purchasing optimisation, and standardised operational procedures whilst allowing local adaptation for climate and customer preferences.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> How can BMS integration help retail stores save money on energy bills?
                  <em className="block mt-1 text-yellow-200">Consider operational scheduling, demand management, and occupancy-based control.</em>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Industrial and Mixed-Use Applications */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Factory className="h-5 w-5 text-yellow-400" />
                4. Industrial and Mixed-Use Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Industrial and mixed-use facilities present unique challenges requiring BMS solutions that balance production requirements, safety protocols, and energy efficiency. These environments often achieve 30-50% energy savings through intelligent load management and process optimisation integration.
              </p>

              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Industrial Applications
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Production Line Integration:</strong> HVAC coordination with manufacturing processes for optimal conditions</li>
                  <li><strong>Energy-Intensive Equipment:</strong> Load scheduling to minimise peak demand charges and manage power factor</li>
                  <li><strong>Process Environment Control:</strong> Temperature and humidity management for quality control requirements</li>
                  <li><strong>Safety System Integration:</strong> Emergency ventilation, gas detection, and evacuation coordination</li>
                  <li><strong>Shift Pattern Adaptation:</strong> Environmental conditioning based on production schedules and staff presence</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Educational Facilities</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Classroom Scheduling:</strong> Automatic conditioning based on timetables</li>
                    <li><strong>Occupancy Optimisation:</strong> Variable air volume based on actual room usage</li>
                    <li><strong>Holiday Setback:</strong> Reduced operation during term breaks</li>
                    <li><strong>Laboratory Safety:</strong> Fume cupboard monitoring and emergency ventilation</li>
                    <li><strong>Sports Facility Control:</strong> Pool heating and gymnasium ventilation management</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Transport Hubs</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Passenger Flow Management:</strong> Dynamic conditioning based on footfall</li>
                    <li><strong>Platform Environmental Control:</strong> Weather protection and comfort systems</li>
                    <li><strong>Multi-Zone Coordination:</strong> Concourses, waiting areas, and operational spaces</li>
                    <li><strong>24/7 Operation Support:</strong> Continuous monitoring with shift-based control</li>
                    <li><strong>Emergency Integration:</strong> Smoke clearance and evacuation system coordination</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mixed-Use Developments</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Zonal Management:</strong> Different control strategies for retail, office, and residential areas</li>
                    <li><strong>Shared Services:</strong> Central plant optimisation across multiple building functions</li>
                    <li><strong>Usage Pattern Analysis:</strong> Adapting to varied operational schedules</li>
                    <li><strong>Energy Apportionment:</strong> Fair distribution of costs across different users</li>
                    <li><strong>Tenant Flexibility:</strong> Individual control whilst maintaining overall efficiency</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-md border border-purple-500/30">
                <h5 className="text-purple-300 font-medium mb-2">Process Integration Benefits</h5>
                <p className="text-sm text-purple-100">
                  Advanced industrial BMS can integrate with production control systems to optimise energy use based on manufacturing schedules, automatically adjust environmental conditions for different production processes, and provide energy usage reporting that supports lean manufacturing and continuous improvement initiatives.
                </p>
              </div>

              <Alert className="border-yellow-400 bg-yellow-900/20">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-white">
                  <strong>In-line Check:</strong> Give one example of a mixed-use facility where BMS can be applied.
                  <em className="block mt-1 text-yellow-200">Consider buildings that combine different functions like retail, office, residential, or transport facilities.</em>
                </AlertDescription>
              </Alert>
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
              <p>
                Successful BMS implementation across different sectors requires electricians to adapt their approach, understand sector-specific requirements, and work effectively within multidisciplinary teams. Each environment presents unique challenges and opportunities.
              </p>

              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Sector-Specific Considerations
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Commercial Offices:</h5>
                    <ul className="space-y-1">
                      <li>• Focus on tenant satisfaction and energy cost reduction</li>
                      <li>• Flexible workspace requirements and hot-desking support</li>
                      <li>• Integration with IT networks for mobile app control</li>
                      <li>• Building Regulations Part L compliance for energy efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Healthcare:</h5>
                    <ul className="space-y-1">
                      <li>• HTM 03-01 ventilation standards and HTM 06-02 electrical safety</li>
                      <li>• Redundancy requirements for critical systems</li>
                      <li>• Infection control through environmental management</li>
                      <li>• 24/7 operation with maintenance scheduling challenges</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Retail:</h5>
                    <ul className="space-y-1">
                      <li>• Customer experience priority over pure efficiency</li>
                      <li>• Security system integration and theft prevention</li>
                      <li>• Seasonal variation management and peak shopping periods</li>
                      <li>• Multi-site standardisation with local adaptation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Industrial:</h5>
                    <ul className="space-y-1">
                      <li>• Process integration and production schedule alignment</li>
                      <li>• Safety system integration and emergency response</li>
                      <li>• High power demand management and load scheduling</li>
                      <li>• Harsh environment equipment specifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-md border border-orange-500/30">
                <h5 className="text-orange-300 font-medium mb-2">Multidisciplinary Team Working</h5>
                <p className="text-sm text-orange-100">
                  Expect to collaborate with HVAC engineers, IT specialists, facility managers, and building services consultants. Clear communication of electrical requirements, cable routing constraints, and power supply implications is essential for successful project delivery and ongoing system reliability.
                </p>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-md border border-yellow-400/30">
                <h5 className="text-blue-300 font-medium mb-2">Client Value Proposition</h5>
                <p className="text-sm text-blue-100">
                  Highlight measurable benefits specific to each sector: energy cost reduction percentages, compliance advantages, operational efficiency improvements, and safety enhancements. Use sector-appropriate language and focus on benefits that matter most to each client type.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Real World Example: Birmingham Hospital Emergency Response
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 p-4 rounded-md border border-red-500/30">
                <h5 className="text-red-300 font-medium mb-2">Crisis Scenario</h5>
                <p className="text-sm text-red-100">
                  During a severe winter storm, Queen Elizabeth Hospital Birmingham experienced a complete mains power failure affecting the entire 1,215-bed facility. The incident occurred during evening visiting hours with approximately 2,000 people on site, including 450 critical care patients.
                </p>
              </div>

              <div className="bg-card p-4 rounded-md border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">BMS Automated Response Sequence</h4>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong>0-5 seconds:</strong> BMS detected mains failure and initiated emergency generator startup sequence whilst maintaining UPS power to critical systems
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-3">
                    <strong>5-15 seconds:</strong> System automatically prioritised power distribution: operating theatres, ICU, emergency department, and life support equipment received priority loading
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-3">
                    <strong>15-30 seconds:</strong> Non-critical systems (general ward lighting, lifts, catering equipment) were automatically shed to maintain generator capacity
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <strong>30+ seconds:</strong> Staff alerting system activated with location-specific announcements and emergency lighting guided evacuation routes activated
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Critical Systems Maintained</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 6 operating theatres with ongoing surgical procedures</li>
                    <li>• Intensive care unit ventilators and monitoring systems</li>
                    <li>• Emergency department trauma bay equipment</li>
                    <li>• Pharmacy refrigeration for critical medications</li>
                    <li>• Fire safety and security systems</li>
                    <li>• Emergency communication systems</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Operational Outcomes</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Zero patient safety incidents during 4-hour outage</li>
                    <li>• All critical procedures continued without interruption</li>
                    <li>• Controlled reduction of non-essential services</li>
                    <li>• Coordinated communication to staff and visitors</li>
                    <li>• Seamless restoration when mains power returned</li>
                    <li>• Full incident logging for regulatory compliance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30">
                <h5 className="text-green-300 font-medium mb-2">Key Success Factors</h5>
                <p className="text-sm text-green-100">
                  The successful emergency response demonstrated the value of integrated BMS design: pre-programmed priority sequences, redundant communication paths, comprehensive staff training, and regular emergency testing. The system's ability to make split-second decisions prevented what could have been a catastrophic situation affecting patient care and safety.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Summary: Sector-Specific BMS Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Building Management Systems deliver measurable value across all building sectors, but the implementation priorities and benefits vary significantly depending on the operational requirements and regulatory environment of each sector.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Primary Focus Areas by Sector</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Commercial Offices:</strong> Energy efficiency (15-30% reduction) and occupant productivity optimisation</li>
                    <li><strong>Healthcare Facilities:</strong> Patient safety, regulatory compliance (HTM standards), and infection control</li>
                    <li><strong>Retail Environments:</strong> Customer experience enhancement and operational cost control (25-40% energy savings)</li>
                    <li><strong>Industrial/Mixed-Use:</strong> Process integration, safety systems, and multi-zone coordination</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-md border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-3">Electrician Opportunities</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Specialisation Development:</strong> Sector-specific expertise in healthcare, retail, or industrial applications</li>
                    <li><strong>Team Leadership:</strong> Coordination between electrical, HVAC, and IT disciplines</li>
                    <li><strong>Value Proposition:</strong> Demonstrating measurable benefits to justify investment</li>
                    <li><strong>Compliance Support:</strong> Understanding regulatory requirements and documentation needs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-md border border-yellow-400/30">
                <h5 className="text-blue-300 font-medium mb-2">Future Considerations</h5>
                <p className="text-sm text-blue-100">
                  As building performance regulations become more stringent and energy costs continue to rise, BMS implementation will become standard across all building types. Electricians who understand sector-specific requirements and can demonstrate measurable benefits will find increasing opportunities in this growing market.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Embedded Quiz */}
          <SingleQuestionQuiz 
            questions={bmsModule1Section4QuizQuestions}
            title="Section 4 Quiz: Real-World BMS Applications"
          />

          {/* Navigation */}
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'justify-between'}`}>
            <Link to="../bms-module-1-section-3" className={isMobile ? 'w-full' : ''}>
              <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full' : ''}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-1-section-5" className={isMobile ? 'w-full' : ''}>
              <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full' : ''}`}>
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

export default BMSModule1Section4;