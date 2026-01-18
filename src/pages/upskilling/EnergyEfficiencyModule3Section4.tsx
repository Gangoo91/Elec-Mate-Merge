import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/apprentice-courses/Quiz';
import InlineCheck from '@/components/apprentice-courses/InlineCheck';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Activity,
  Monitor,
  Smartphone,
  Table,
  Briefcase,
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle,
  PoundSterling,
  Wrench,
  FileSpreadsheet,
  Cloud,
  Download,
  Star,
  BookOpen
} from 'lucide-react';

const EnergyEfficiencyModule3Section4: React.FC = () => {
  useSEO({
    title: 'Tools and Software for Energy Audits | Energy Efficiency Module 3.4 | Elec-Mate',
    description: 'Master energy audit tools including thermal imaging cameras, power quality analysers, audit software platforms, and mobile apps. Build your professional audit toolkit with UK-specific recommendations.',
    keywords: 'energy audit tools, thermal imaging cameras, power quality analyser, energy audit software, FLIR camera, data logger, electrical audit equipment UK'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1-m3s4',
      question: 'What temperature difference in a thermal image typically indicates a potential electrical fault requiring immediate attention?',
      options: [
        '1-5°C above ambient',
        '5-10°C above ambient',
        '15°C or more above ambient',
        'Any temperature difference'
      ],
      correctIndex: 2,
      explanation: 'A temperature rise of 15°C or more above ambient or compared to similar components typically indicates a serious issue requiring immediate attention. This could signify loose connections, overloaded circuits, or failing components that pose fire risks.'
    },
    {
      id: 'qc2-m3s4',
      question: 'Which power quality parameter is most important to measure when investigating unexplained equipment failures?',
      options: [
        'Frequency only',
        'Voltage, current, and harmonics',
        'Temperature only',
        'Light levels'
      ],
      correctIndex: 1,
      explanation: 'When investigating equipment failures, measuring voltage (including sags/swells), current (including imbalance), and harmonics provides comprehensive data. Harmonics from non-linear loads can cause overheating and premature failure of motors, transformers, and capacitors.'
    },
    {
      id: 'qc3-m3s4',
      question: 'What is the minimum recommended data logging period to capture a full operational profile for an energy audit?',
      options: [
        '1 hour',
        '24 hours',
        '7 days minimum, ideally 2-4 weeks',
        '1 year'
      ],
      correctIndex: 2,
      explanation: 'A minimum of 7 days captures weekday/weekend variations, but 2-4 weeks is ideal to account for different operational patterns, seasonal variations, and any anomalies. This provides statistically meaningful data for accurate baseline assessment and identifying optimisation opportunities.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the typical price range for an entry-level professional thermal imaging camera suitable for electrical audits in the UK?',
      options: ['£100-£300', '£500-£1,500', '£3,000-£5,000', '£10,000+'],
      correctAnswer: '£500-£1,500'
    },
    {
      question: 'Which thermal imaging feature is essential for detecting hot spots in electrical panels?',
      options: ['GPS tagging', 'Thermal sensitivity (NETD) of 50mK or better', 'Bluetooth connectivity', 'Voice recording'],
      correctAnswer: 'Thermal sensitivity (NETD) of 50mK or better'
    },
    {
      question: 'What does a power quality analyser measure that a standard multimeter cannot?',
      options: ['Basic voltage', 'Resistance', 'Harmonics, power factor, and transients', 'Continuity'],
      correctAnswer: 'Harmonics, power factor, and transients'
    },
    {
      question: 'Which software platform is commonly used in the UK for professional energy audit reporting?',
      options: ['Microsoft Paint', 'Energy Elephant or ECON Energy', 'Notepad', 'Calculator'],
      correctAnswer: 'Energy Elephant or ECON Energy'
    },
    {
      question: 'What sampling interval is recommended for detailed energy data logging?',
      options: ['Once per day', 'Every hour', 'Every 15 minutes or less', 'Once per week'],
      correctAnswer: 'Every 15 minutes or less'
    },
    {
      question: 'Which mobile app feature is most valuable for field data collection during audits?',
      options: ['Gaming capabilities', 'Photo capture with annotation and GPS tagging', 'Social media sharing', 'Music playback'],
      correctAnswer: 'Photo capture with annotation and GPS tagging'
    },
    {
      question: 'What colour typically represents the hottest areas in a thermal image using the iron palette?',
      options: ['Blue', 'Green', 'White/Yellow', 'Black'],
      correctAnswer: 'White/Yellow'
    },
    {
      question: 'Which Excel function is most useful for calculating energy costs from interval data?',
      options: ['AVERAGE', 'SUMPRODUCT with time-of-use rates', 'COUNT', 'MAX'],
      correctAnswer: 'SUMPRODUCT with time-of-use rates'
    },
    {
      question: 'What is the recommended minimum resolution for a thermal camera used in electrical audits?',
      options: ['80x60 pixels', '160x120 pixels', '320x240 pixels or higher', '640x480 pixels minimum'],
      correctAnswer: '320x240 pixels or higher'
    },
    {
      question: 'Which standard governs the requirements for portable electrical test equipment in the UK?',
      options: ['BS 7671', 'BS EN 61010', 'BS 1363', 'BS 5839'],
      correctAnswer: 'BS EN 61010'
    }
  ];

  const faqs = [
    {
      question: 'Do I need to be certified to use thermal imaging cameras for electrical audits?',
      answer: 'While no legal certification is required in the UK to use thermal cameras, professional certification significantly enhances credibility and competence. The most recognised certifications are from the Infrared Training Center (ITC) or British Institute of Non-Destructive Testing (BINDT). Level 1 Thermography certification covers camera operation, image capture, and basic interpretation. Level 2 adds quantitative analysis and report writing. Many insurance companies and large clients now require certified thermographers for electrical inspections. The investment in certification (typically £1,500-£2,500 for Level 1) quickly pays for itself through enhanced professional reputation and ability to charge premium rates.'
    },
    {
      question: 'What is the best budget option for starting energy audit work?',
      answer: 'For those starting out, a phased investment approach works well. Begin with a good quality clamp meter with data logging (£150-£300) like the Fluke 376 FC, which connects to your smartphone. Add a smartphone thermal camera attachment (£200-£400) like the FLIR ONE Pro, which provides adequate resolution for initial surveys. Use free software like Energy Performance Calculator spreadsheets and mobile apps like iAuditor (free tier available). As your business grows, upgrade to a dedicated thermal camera (£800-£1,500) and consider professional software subscriptions. Total initial investment: £400-£700 can get you started professionally.'
    },
    {
      question: 'How do I interpret thermal images correctly and avoid false readings?',
      answer: 'Correct thermal image interpretation requires understanding several factors. First, ensure consistent emissivity settings - electrical components typically range from 0.85-0.95. Account for reflected temperature from nearby heat sources. Compare similar components under similar loads rather than relying on absolute temperatures. Consider ambient conditions - survey during normal operating loads, not during startup or shutdown. Watch for reflective surfaces that can give false readings. The "delta T" (temperature difference) between similar components is more reliable than absolute readings. Document load conditions during capture. Hot spots alone don\'t confirm faults - patterns matter. A connection running 30°C above an identical connection under same load indicates a problem; 30°C absolute may be normal.'
    },
    {
      question: 'Which power quality parameters should I prioritise measuring during an audit?',
      answer: 'Priority parameters depend on the site and reported issues, but a comprehensive audit should capture: 1) Voltage profile (including sags, swells, and transients) - affects equipment operation and lifespan. 2) Current measurements including imbalance between phases - imbalance above 2% causes motor heating. 3) Power factor - low PF means wasted capacity and potential charges. 4) Harmonics (THD) - values above 5% for voltage or 8% for current indicate issues. 5) Frequency stability - rarely problematic in UK but important for sensitive equipment. 6) kWh consumption profile over time. Start with a minimum 7-day logging period to capture operational variations. Many analysers can be configured to capture all parameters simultaneously.'
    },
    {
      question: 'Are cloud-based energy audit platforms worth the subscription cost?',
      answer: 'Cloud platforms offer significant advantages that often justify monthly costs of £50-£200. Benefits include: automatic data backup and security, collaboration features for team audits, professional report templates that save hours of formatting, benchmarking databases comparing sites to industry standards, automatic calculations for carbon savings and ROI, client portal access for ongoing monitoring, and regular updates without IT overhead. For occasional auditors, free tools may suffice. However, if you conduct more than 5-10 audits annually, platform subscriptions typically save 3-5 hours per audit in reporting time alone. Calculate your hourly rate against time saved. Most platforms offer free trials - test with a real audit before committing.'
    },
    {
      question: 'What should be included in a professional energy audit toolkit?',
      answer: 'A comprehensive professional toolkit includes: Measurement equipment - thermal camera (320x240 minimum), power quality analyser with CT clamps, lux meter, temperature/humidity logger, laser distance measurer. Documentation tools - tablet or ruggedised laptop, digital camera (backup to thermal), voice recorder for notes. Safety equipment - PPE appropriate to voltage levels, lockout/tagout kit, voltage detector, insulated tools. Reference materials - tariff information, equipment specifications, BS 7671 requirements. Software - audit software (cloud or local), spreadsheet templates, report templates, CAD viewer for drawings. Support items - cable ties for logger mounting, labels, clipboard, torch, extension leads. Invest in a quality equipment case - professionals are judged by their presentation. Budget £3,000-£8,000 for a complete professional kit.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="text-white hover:text-elec-yellow hover:bg-transparent p-2">
            <Link to="/electrician/upskilling/energy-efficiency-module-3">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-elec-yellow text-sm font-medium">Module 3 • Section 4</p>
            <h1 className="text-white font-semibold truncate">Tools and Software for Audits</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li>• Thermal cameras detect electrical hot spots</li>
              <li>• Power analysers measure energy quality</li>
              <li>• Cloud software streamlines reporting</li>
              <li>• Mobile apps enable field data capture</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-white/30">
            <p className="text-white/80 text-sm font-medium mb-2">You Will Learn</p>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Select appropriate thermal imaging equipment</li>
              <li>• Use power quality analysers effectively</li>
              <li>• Choose audit software platforms</li>
              <li>• Build a professional audit toolkit</li>
            </ul>
          </div>
        </div>

        {/* Section 1: Thermal Imaging Cameras */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Thermal Imaging Cameras for Electrical Audits
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Thermometer className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Understanding Thermal Imaging Technology</h3>
                <p className="text-white">
                  Thermal cameras detect infrared radiation emitted by objects and convert it to visible
                  images showing temperature variations. For electrical audits, they reveal loose connections,
                  overloaded circuits, failing components, and imbalanced loads before they cause failures
                  or fires.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Key Specifications to Consider</h4>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Resolution:</strong> Minimum 320x240 pixels for professional work; 160x120 for basic surveys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Thermal Sensitivity (NETD):</strong> 50mK or better for detecting subtle temperature differences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Temperature Range:</strong> -20°C to +350°C covers most electrical applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Focus:</strong> Manual focus offers more control; auto-focus faster for surveys</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Recommended Models (UK Pricing)</h4>
                <ul className="text-white text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <PoundSterling size={16} className="text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Entry (£500-£1,500):</strong> FLIR C5, FLIR ONE Pro, Seek Thermal Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PoundSterling size={16} className="text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Professional (£2,000-£5,000):</strong> FLIR E54, Testo 871, Fluke Ti401</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <PoundSterling size={16} className="text-elec-yellow mt-0.5 flex-shrink-0" />
                    <span><strong>Advanced (£5,000+):</strong> FLIR T540, Fluke Ti480 PRO</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Best Value:</strong> FLIR E54 (£3,500) - excellent all-rounder</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-red-400 flex items-center gap-2 mb-2">
                <AlertTriangle size={18} />
                Thermal Interpretation Guidelines
              </h4>
              <div className="text-white text-sm space-y-2">
                <p><strong>Temperature Rise Categories (above ambient or identical components):</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li><span className="text-green-400">1-10°C:</span> Monitor - possible developing issue</li>
                  <li><span className="text-yellow-400">10-25°C:</span> Priority attention - schedule repair soon</li>
                  <li><span className="text-orange-400">25-40°C:</span> Urgent - repair as soon as possible</li>
                  <li><span className="text-red-400">40°C+:</span> Critical - immediate action required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Power Quality Analysers */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Quality Analysers and Data Loggers
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Power Quality Analysis Fundamentals</h3>
                <p className="text-white">
                  Power quality analysers measure electrical parameters beyond basic voltage and current,
                  including harmonics, power factor, transients, sags, swells, and energy consumption patterns.
                  This data is essential for identifying waste, diagnosing equipment issues, and validating
                  improvement measures.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 px-3 text-elec-yellow">Parameter</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">What It Reveals</th>
                    <th className="text-left py-2 px-3 text-elec-yellow">Target Values</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3 font-medium">Voltage (V)</td>
                    <td className="py-2 px-3">Supply stability, sags/swells</td>
                    <td className="py-2 px-3">230V ±10% (UK standard)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3 font-medium">Current (A)</td>
                    <td className="py-2 px-3">Load levels, imbalance</td>
                    <td className="py-2 px-3">Phase imbalance &lt;2%</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3 font-medium">Power Factor</td>
                    <td className="py-2 px-3">Reactive power waste</td>
                    <td className="py-2 px-3">&gt;0.95 (ideally &gt;0.98)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3 font-medium">THD (Voltage)</td>
                    <td className="py-2 px-3">Harmonic distortion</td>
                    <td className="py-2 px-3">&lt;5% per EN 50160</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 px-3 font-medium">THD (Current)</td>
                    <td className="py-2 px-3">Non-linear load effects</td>
                    <td className="py-2 px-3">&lt;8% recommended</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">kWh Profile</td>
                    <td className="py-2 px-3">Consumption patterns</td>
                    <td className="py-2 px-3">Site-specific baseline</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Recommended Analysers</h4>
                <ul className="text-white text-sm space-y-2">
                  <li><strong>Fluke 1770 Series (£4,000-£8,000):</strong> Industry standard, comprehensive PQ analysis</li>
                  <li><strong>Hioki PW3198 (£3,500):</strong> Excellent value, good software</li>
                  <li><strong>Chauvin Arnoux C.A 8336 (£3,000):</strong> Compact, reliable</li>
                  <li><strong>Fluke 1732/1734 (£1,800-£2,500):</strong> Energy logger for basic audits</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Data Logger Options</h4>
                <ul className="text-white text-sm space-y-2">
                  <li><strong>Onset HOBO (£150-£500):</strong> Temperature, humidity, light</li>
                  <li><strong>Tinytag (UK made, £100-£300):</strong> Robust, simple deployment</li>
                  <li><strong>Efergy/OWL (£50-£150):</strong> Basic CT energy monitoring</li>
                  <li><strong>Lascar EL-USB (£50-£200):</strong> USB data loggers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: Energy Audit Software */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Energy Audit Software Platforms
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Cloud className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Cloud-Based vs Desktop Solutions</h3>
                <p className="text-white">
                  Modern energy audit software streamlines data collection, analysis, and reporting.
                  Cloud platforms offer collaboration and automatic updates, while desktop software
                  provides offline capability and one-time purchase options.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3">Professional Cloud Platforms (UK Market)</h4>
                <div className="grid gap-4">
                  <div className="border-l-2 border-elec-yellow pl-3">
                    <p className="font-medium text-white">Energy Elephant</p>
                    <p className="text-white/70 text-sm">From £99/month - UK-developed, excellent for multi-site management, automatic utility bill analysis, carbon reporting, ISO 50001 compliance support.</p>
                  </div>
                  <div className="border-l-2 border-elec-yellow pl-3">
                    <p className="font-medium text-white">ECON Energy</p>
                    <p className="text-white/70 text-sm">From £150/month - Comprehensive energy management, real-time monitoring integration, targeting & reporting, widely used by UK local authorities.</p>
                  </div>
                  <div className="border-l-2 border-elec-yellow pl-3">
                    <p className="font-medium text-white">Stark Group Platform</p>
                    <p className="text-white/70 text-sm">Custom pricing - Enterprise solution, bureau services available, utility procurement integration, suitable for large portfolios.</p>
                  </div>
                  <div className="border-l-2 border-elec-yellow pl-3">
                    <p className="font-medium text-white">eSight Energy</p>
                    <p className="text-white/70 text-sm">From £200/month - Advanced analytics, M&V capabilities, automatic meter reading integration, used by major corporations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-3">Free and Low-Cost Options</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-white">Carbon Trust Tools</p>
                    <p className="text-white/70 text-sm">Free calculators and benchmarking tools for UK businesses</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">CIBSE TM22</p>
                    <p className="text-white/70 text-sm">Energy assessment methodology spreadsheet (member access)</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">Energy Performance Calculator</p>
                    <p className="text-white/70 text-sm">Free Excel-based DEC calculation tools</p>
                  </div>
                  <div>
                    <p className="font-medium text-white">BEIS Energy Tools</p>
                    <p className="text-white/70 text-sm">Government benchmarking data and calculators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Mobile Apps */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Mobile Apps for Field Data Collection
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <p className="text-white">
              Mobile apps transform smartphones and tablets into powerful audit tools, enabling
              efficient data capture, photo documentation, and real-time calculations during
              site surveys.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Download size={18} />
                  Recommended Apps
                </h4>
                <ul className="text-white text-sm space-y-3">
                  <li>
                    <strong className="text-white">iAuditor (SafetyCulture)</strong>
                    <p className="text-white/70">Free tier available. Customisable checklists, photo annotation, automatic reports. Excellent for structured surveys.</p>
                  </li>
                  <li>
                    <strong className="text-white">Fulcrum</strong>
                    <p className="text-white/70">From £15/month. Powerful form builder, GPS tracking, offline capability. Great for custom audit workflows.</p>
                  </li>
                  <li>
                    <strong className="text-white">FLIR Tools Mobile</strong>
                    <p className="text-white/70">Free. Essential for FLIR camera users, image analysis, basic reporting.</p>
                  </li>
                  <li>
                    <strong className="text-white">Fluke Connect</strong>
                    <p className="text-white/70">Free. Connects Fluke meters, trends data, team sharing. Useful for ongoing monitoring.</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                  <Wrench size={18} />
                  Utility Apps for Auditors
                </h4>
                <ul className="text-white text-sm space-y-3">
                  <li>
                    <strong className="text-white">CamScanner/Adobe Scan</strong>
                    <p className="text-white/70">Digitise utility bills, equipment labels, and documents on site.</p>
                  </li>
                  <li>
                    <strong className="text-white">Google Maps/What3Words</strong>
                    <p className="text-white/70">Location documentation, especially useful for external equipment surveys.</p>
                  </li>
                  <li>
                    <strong className="text-white">Lux Meter Apps</strong>
                    <p className="text-white/70">Phone sensor-based light measurement (indicative only, not calibrated).</p>
                  </li>
                  <li>
                    <strong className="text-white">Voice Recorder</strong>
                    <p className="text-white/70">Capture observations quickly, transcribe later. Faster than typing.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Pro Tip: Mobile Audit Workflow</h4>
              <p className="text-white text-sm">
                Create a consistent workflow: Start each room/area with a wide-angle photo, capture
                equipment labels and nameplates, photograph meter readings with timestamps, record
                thermal images with corresponding visual photos, and voice-record observations.
                Use consistent naming conventions (e.g., "Building-Floor-Room-Item") for easy
                organisation during report writing.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 5: Excel Templates */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Excel Templates and Analysis Tools
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">Essential Spreadsheet Skills for Auditors</h3>
                <p className="text-white">
                  Microsoft Excel (or Google Sheets) remains the backbone of energy audit analysis.
                  Mastering key functions and building reusable templates significantly improves
                  audit efficiency and accuracy.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-3">Key Excel Functions for Energy Analysis</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white">Function</th>
                      <th className="text-left py-2 px-3 text-white">Application</th>
                    </tr>
                  </thead>
                  <tbody className="text-white font-mono text-xs">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">SUMPRODUCT()</td>
                      <td className="py-2 px-3">Calculate costs with time-of-use tariffs</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">AVERAGEIF()</td>
                      <td className="py-2 px-3">Average consumption by time period/condition</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">PERCENTILE()</td>
                      <td className="py-2 px-3">Identify baseload (5th percentile) and peak demand</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">VLOOKUP/INDEX-MATCH</td>
                      <td className="py-2 px-3">Link equipment data to tariff rates</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">NPV() / IRR()</td>
                      <td className="py-2 px-3">Financial analysis of efficiency measures</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Pivot Tables</td>
                      <td className="py-2 px-3">Analyse large datasets by multiple dimensions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Essential Templates to Build</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Equipment inventory with power ratings</li>
                  <li>• Utility bill tracker and analyser</li>
                  <li>• Half-hourly data profile analyser</li>
                  <li>• Lighting survey calculator</li>
                  <li>• Simple payback calculator</li>
                  <li>• Carbon emissions calculator</li>
                  <li>• Benchmarking comparison tool</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Chart Types for Reports</h4>
                <ul className="text-white text-sm space-y-1">
                  <li>• Line charts: consumption trends over time</li>
                  <li>• Stacked bar: energy by end-use category</li>
                  <li>• Heatmaps: hourly/daily patterns</li>
                  <li>• Waterfall: breakdown of savings</li>
                  <li>• Scatter plots: correlation analysis</li>
                  <li>• Pie charts: energy split (use sparingly)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Half-Hourly Data Analysis Formula</h4>
              <p className="text-white text-sm mb-2">
                To calculate baseload from half-hourly data (identifies minimum overnight consumption):
              </p>
              <code className="bg-white/5 px-3 py-2 rounded text-green-400 text-sm block overflow-x-auto">
                =PERCENTILE(IF(HOUR(A:A)&gt;=23,B:B,IF(HOUR(A:A)&lt;=5,B:B,"")),0.1)
              </code>
              <p className="text-white/60 text-xs mt-2">
                Array formula (Ctrl+Shift+Enter in older Excel) - finds 10th percentile of 23:00-05:00 readings
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Professional Toolkit */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Creating Professional Audit Toolkits
          </h2>

          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <p className="text-white">
              A well-organised, comprehensive toolkit demonstrates professionalism and ensures you
              can handle any audit situation. Invest progressively as your business grows.
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <PoundSterling size={18} />
                  Starter Kit (£500-£1,500)
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
                  <ul className="space-y-1">
                    <li>• Clamp meter with logging (Fluke 376 FC)</li>
                    <li>• Smartphone thermal attachment (FLIR ONE Pro)</li>
                    <li>• Digital lux meter (basic model)</li>
                    <li>• Laser distance measurer</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• USB temperature loggers x3</li>
                    <li>• Non-contact voltage tester</li>
                    <li>• Basic tool kit (screwdrivers, torch)</li>
                    <li>• Tablet with audit apps installed</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <PoundSterling size={18} />
                  Professional Kit (£3,000-£8,000)
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
                  <ul className="space-y-1">
                    <li>• Dedicated thermal camera (FLIR E54 or similar)</li>
                    <li>• Power quality analyser (Fluke 1732/1734)</li>
                    <li>• Professional lux meter (calibrated)</li>
                    <li>• Multiple CT current loggers</li>
                    <li>• Temperature/humidity loggers x6</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Ruggedised laptop/tablet</li>
                    <li>• Professional software subscription</li>
                    <li>• Insulated tools (1000V rated)</li>
                    <li>• Quality equipment case</li>
                    <li>• Full PPE set for electrical work</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <PoundSterling size={18} />
                  Enterprise Kit (£10,000+)
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
                  <ul className="space-y-1">
                    <li>• High-resolution thermal camera (640x480)</li>
                    <li>• Full power quality analyser (Fluke 1770 series)</li>
                    <li>• Portable energy dashboard</li>
                    <li>• Drone for roof/hard access surveys</li>
                    <li>• Calibrated reference instruments</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Multiple logger kits for parallel deployment</li>
                    <li>• Enterprise software platform</li>
                    <li>• Company vehicle with fitted storage</li>
                    <li>• Backup equipment for all critical items</li>
                    <li>• Calibration service contracts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Equipment Care Tips</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Maintain calibration records - recalibrate annually for critical instruments</li>
                <li>• Store thermal cameras with lens caps on in padded cases</li>
                <li>• Keep batteries charged and carry spares for all devices</li>
                <li>• Create equipment checklists to ensure nothing is left on site</li>
                <li>• Insure all equipment against damage and theft</li>
                <li>• Keep firmware updated on all smart devices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-lg p-6 border border-elec-yellow/30">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <Star size={24} />
            Quick Reference: Audit Equipment Checklist
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Pre-Audit Equipment Check</h4>
              <ul className="text-white text-sm space-y-1">
                <li>□ Thermal camera - battery charged, lens clean</li>
                <li>□ Power analyser - CT clamps, cables, leads</li>
                <li>□ Data loggers - batteries, mounting materials</li>
                <li>□ Tablet/laptop - charged, software ready</li>
                <li>□ Camera - memory cleared, batteries full</li>
                <li>□ Safety PPE - appropriate to site</li>
                <li>□ Documentation - site maps, previous reports</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Thermal Imaging Quick Reference</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Set emissivity: 0.95 for most electrical</li>
                <li>• Capture at minimum 40% load conditions</li>
                <li>• Take matching visual photo for each thermal</li>
                <li>• Note ambient temperature and load conditions</li>
                <li>• Compare similar components, not absolutes</li>
                <li>• Focus carefully - blur affects readings</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Data Logging Deployment</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Verify time sync across all loggers</li>
                <li>• Set 15-minute (or shorter) intervals</li>
                <li>• Label all equipment clearly with contact info</li>
                <li>• Document exact installation location</li>
                <li>• Photograph CT clamp positions</li>
                <li>• Minimum 7 days, ideally 2-4 weeks</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Software Essentials</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Thermal analysis: FLIR Tools / FLIR Ignite</li>
                <li>• Power data: Manufacturer's software</li>
                <li>• Analysis: Excel with custom templates</li>
                <li>• Field data: iAuditor or equivalent</li>
                <li>• Reports: Professional platform or Word</li>
                <li>• Backup: Cloud sync enabled on all devices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-elec-yellow">
            Section Knowledge Check
          </h3>
          <Quiz questions={quizQuestions} />
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <h4 className="font-medium text-white mb-2">{faq.question}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button asChild variant="outline" className="min-h-[44px] touch-manipulation border-white/20 hover:border-elec-yellow hover:text-elec-yellow bg-transparent text-white">
            <Link to="../section-3" className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Previous: Benchmarks and Tariffs
            </Link>
          </Button>

          <Button asChild className="min-h-[44px] touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Link to="../section-5" className="flex items-center gap-2">
              Next: Audit Reports and Cost Breakdown
              <ArrowRight size={20} />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule3Section4;
