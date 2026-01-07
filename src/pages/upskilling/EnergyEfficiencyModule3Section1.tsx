import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { useSEO } from '@/hooks/useSEO';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Camera,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Eye,
  FileText,
  Shield,
  Bookmark,
  Target,
  Zap,
  Thermometer,
  Clock,
  Users,
  Building,
  Wrench
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnergyEfficiencyModule3Section1: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useSEO({
    title: 'Walkthrough and Inventory Surveys | Energy Efficiency Module 3 Section 1 | Elec-Mate',
    description: 'Learn professional energy audit survey techniques including systematic walkthrough methodology, equipment inventory creation, and documentation best practices compliant with BS EN 16247.',
    keywords: [
      'energy audit',
      'walkthrough survey',
      'equipment inventory',
      'BS EN 16247',
      'site survey',
      'energy assessment',
      'building audit',
      'electrical survey'
    ],
    canonicalUrl: '/upskilling/energy-efficiency/module-3/section-1'
  });

  const quickCheckQuestions = [
    {
      id: 'qc1',
      question: 'Before conducting a walkthrough survey, what document should you review to understand the building\'s electrical infrastructure?',
      options: [
        'The building\'s social media presence',
        'Single-line diagrams and distribution board schedules',
        'Staff holiday rosters',
        'Local council meeting minutes'
      ],
      correctIndex: 1,
      explanation: 'Single-line diagrams and distribution board schedules provide essential information about the electrical infrastructure, circuit allocation, and load distribution. This preparation ensures you can efficiently navigate the site and identify key areas for investigation during the walkthrough.'
    },
    {
      id: 'qc2',
      question: 'According to BS EN 16247, what percentage of a building\'s energy consumption should typically be accounted for in your equipment inventory?',
      options: [
        'At least 50%',
        'At least 70%',
        'At least 90%',
        '100% always'
      ],
      correctIndex: 2,
      explanation: 'BS EN 16247 recommends that the inventory should account for at least 90% of the building\'s total energy consumption. This ensures comprehensive coverage while acknowledging that capturing every minor load may not be cost-effective. The remaining 10% typically comprises miscellaneous small loads.'
    },
    {
      id: 'qc3',
      question: 'When documenting electrical equipment during an audit, which photograph angle provides the most useful information for future reference?',
      options: [
        'Artistic wide-angle shots of the entire room',
        'Close-ups showing nameplate data and installation context',
        'Only photos of damaged equipment',
        'Photos taken from maximum distance'
      ],
      correctIndex: 1,
      explanation: 'Close-up photographs capturing nameplate data (manufacturer, model, ratings, serial number) alongside the installation context provide the most valuable documentation. This combination allows for accurate equipment identification, specification verification, and understanding of how equipment is integrated into the system.'
    }
  ];

  const quizQuestions = [
    {
      question: 'What is the primary purpose of a walkthrough survey in an energy audit?',
      options: [
        'To meet health and safety regulations only',
        'To gather visual and contextual information about energy-using systems',
        'To take photographs for marketing materials',
        'To count the number of employees on site'
      ],
      correctAnswer: 'To gather visual and contextual information about energy-using systems'
    },
    {
      question: 'Which BS EN standard specifically covers energy audit requirements?',
      options: [
        'BS EN 7671',
        'BS EN 16247',
        'BS EN 62305',
        'BS EN 50160'
      ],
      correctAnswer: 'BS EN 16247'
    },
    {
      question: 'What tool is essential for measuring real-time electrical consumption during a survey?',
      options: [
        'Spirit level',
        'Clamp meter or power analyser',
        'Tape measure only',
        'Sound level meter'
      ],
      correctAnswer: 'Clamp meter or power analyser'
    },
    {
      question: 'What is a "quick win" in the context of an energy audit?',
      options: [
        'Completing the audit faster than scheduled',
        'A low-cost measure with rapid payback and immediate implementation potential',
        'Finding major equipment failures',
        'Winning a contract against competitors'
      ],
      correctAnswer: 'A low-cost measure with rapid payback and immediate implementation potential'
    },
    {
      question: 'When should you photograph electrical distribution boards during a survey?',
      options: [
        'Only if they appear damaged',
        'Always, capturing labelling, condition, and thermal patterns if using IR',
        'Never, due to safety concerns',
        'Only with written permission from the CEO'
      ],
      correctAnswer: 'Always, capturing labelling, condition, and thermal patterns if using IR'
    },
    {
      question: 'What percentage of lighting energy can typically be saved by upgrading from T8 fluorescent to LED?',
      options: [
        '10-20%',
        '20-30%',
        '40-60%',
        '90-100%'
      ],
      correctAnswer: '40-60%'
    },
    {
      question: 'What should be recorded for each item in an equipment inventory?',
      options: [
        'Only the manufacturer name',
        'Location, nameplate data, operating hours, condition, and estimated consumption',
        'Just the equipment colour and size',
        'Only equipment that is currently running'
      ],
      correctAnswer: 'Location, nameplate data, operating hours, condition, and estimated consumption'
    },
    {
      question: 'Why is it important to conduct surveys during normal occupied hours?',
      options: [
        'To ensure staff can make refreshments',
        'To observe typical operational patterns and occupancy-related loads',
        'Building access is only available during these times',
        'Energy consumption is always lowest during occupied hours'
      ],
      correctAnswer: 'To observe typical operational patterns and occupancy-related loads'
    },
    {
      question: 'What safety document should you review before conducting a site survey?',
      options: [
        'The company newsletter',
        'Site-specific risk assessment and method statement (RAMS)',
        'Equipment user manuals only',
        'Previous energy bills'
      ],
      correctAnswer: 'Site-specific risk assessment and method statement (RAMS)'
    },
    {
      question: 'Which area is commonly overlooked during energy audits but often contains significant saving opportunities?',
      options: [
        'The main reception area',
        'Plant rooms, risers, and roof-mounted equipment',
        'Executive offices',
        'Car park entrance barriers'
      ],
      correctAnswer: 'Plant rooms, risers, and roof-mounted equipment'
    }
  ];

  const faqs = [
    {
      question: 'How long should a typical walkthrough survey take for a commercial building?',
      answer: 'The duration depends on building size and complexity. As a guide: small offices (under 500m²) typically require 2-4 hours; medium commercial buildings (500-5000m²) need 1-2 days; large industrial sites may require 3-5 days or more. Always allow extra time for unexpected findings, staff interviews, and detailed documentation. It\'s better to schedule adequate time than to rush and miss important details.'
    },
    {
      question: 'What equipment should I bring to a walkthrough survey?',
      answer: 'Essential equipment includes: clamp meter/power analyser, thermal imaging camera (if qualified), digital camera/smartphone, torch, PPE (hard hat, safety boots, hi-vis, safety glasses), clipboard and survey forms, tablet or laptop for digital recording, measuring tape, non-contact voltage tester, and access tools (screwdrivers for panel covers with permission). Also bring business cards, site contact details, and any pre-survey documentation you\'ve gathered.'
    },
    {
      question: 'How do I handle areas I cannot access during the survey?',
      answer: 'Document all inaccessible areas clearly in your report, noting the reason (locked, safety concerns, tenant restrictions, etc.). Request access arrangements for a follow-up visit if these areas are significant energy users. Make reasonable estimates based on similar accessible areas and clearly state assumptions. For BS EN 16247 compliance, you must identify what proportion of consumption these areas represent and acknowledge any limitations in your findings.'
    },
    {
      question: 'Should I conduct surveys during occupied or unoccupied periods?',
      answer: 'Ideally, conduct surveys during both periods. Occupied periods reveal typical operational patterns, occupancy-driven loads, and user behaviours. Unoccupied periods expose baseload consumption, equipment left running unnecessarily, and after-hours waste. A comprehensive audit should include observations from normal working hours, early morning/late evening, and if possible, weekend periods to understand the full consumption profile.'
    },
    {
      question: 'What are the most common quick wins found during walkthrough surveys?',
      answer: 'Common quick wins include: lighting upgrades to LED (especially T8/T12 fluorescent replacements), installing occupancy sensors in intermittently used spaces, adjusting HVAC setpoints and schedules, eliminating equipment left on unnecessarily (monitors, printers, vending machines), repairing compressed air leaks, improving power factor (if penalties apply), and implementing basic controls like timers and photocells. These typically offer paybacks under 2 years.'
    },
    {
      question: 'How detailed should my equipment inventory be?',
      answer: 'The inventory should capture all significant energy-using equipment (typically covering 90%+ of consumption). For each item record: unique identifier/location code, equipment type and description, manufacturer and model, rated power/capacity, estimated operating hours, observed condition, control method, approximate age, and any relevant notes. Use consistent naming conventions and consider using asset management software for larger sites. The level of detail should match the audit scope and client requirements.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-elec-yellow mb-2">
            <ClipboardList className="w-5 h-5" />
            <span className="text-sm font-medium">Module 3 • Section 1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Walkthrough and Inventory Surveys
          </h1>
          <p className="text-gray-400">
            Master professional energy audit survey techniques compliant with BS EN 16247
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-[#2a2a2a] rounded-lg p-6 mb-8 border-l-4 border-elec-yellow">
          <div className="flex items-start gap-4">
            <Eye className="w-8 h-8 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
              <p className="text-gray-300 mb-4">
                The walkthrough survey is the foundation of any energy audit. This section equips you
                with systematic methodologies for conducting professional site surveys, creating
                comprehensive equipment inventories, and identifying energy-saving opportunities
                that deliver real value to clients.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Plan and prepare for professional site surveys
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Apply systematic walkthrough methodology
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Create detailed equipment inventories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Document findings professionally with photography
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 1: Planning and Preparing */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Planning and Preparing for Site Surveys</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Thorough preparation is essential for an efficient and effective energy audit. Arriving
              on site without proper planning wastes time, frustrates clients, and undermines your
              professional credibility. BS EN 16247 emphasises the importance of the preliminary
              contact phase before any site work begins.
            </p>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Pre-Survey Documentation to Request
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">Technical Documents</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Single-line electrical diagrams</li>
                  <li>• Distribution board schedules</li>
                  <li>• Building floor plans/layouts</li>
                  <li>• HVAC schematics and plant schedules</li>
                  <li>• BMS system documentation</li>
                  <li>• Previous audit reports</li>
                  <li>• Maintenance records</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">Energy Data</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• 12-36 months utility bills</li>
                  <li>• Half-hourly consumption data</li>
                  <li>• Sub-meter readings (if available)</li>
                  <li>• Degree day correlations</li>
                  <li>• Occupancy schedules</li>
                  <li>• Production/output data</li>
                  <li>• Display Energy Certificate (DEC)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Stakeholder Engagement
            </h3>

            <p className="text-gray-300 mb-4">
              Identify key personnel before your visit. Arrange meetings with facilities managers,
              maintenance staff, and building users who understand daily operations. Their insights
              often reveal issues that technical data alone cannot show.
            </p>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-elec-yellow/30">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-elec-yellow" />
                Pro Tip: Pre-Survey Checklist
              </h4>
              <p className="text-gray-300 text-sm">
                Create a standardised pre-survey checklist covering access arrangements, PPE requirements,
                contact details, site induction needs, permit requirements, and any known hazards.
                Send this to the client at least one week before your visit to ensure everything is
                ready when you arrive.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Systematic Walkthrough Methodology */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Systematic Walkthrough Methodology</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              A systematic approach ensures comprehensive coverage and consistent quality. Random
              wandering through a building leads to missed areas and incomplete data. Adopt a
              structured methodology that can be replicated across different sites.
            </p>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Building className="w-5 h-5" />
              The Zone-by-Zone Approach
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Step 1: Building Orientation</h4>
                <p className="text-gray-300 text-sm">
                  Start with a brief building tour with your site contact. Understand the overall
                  layout, identify main plant rooms, electrical intake positions, and significant
                  energy-using areas. Note the building's orientation for daylighting considerations.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Step 2: Major Systems First</h4>
                <p className="text-gray-300 text-sm">
                  Survey the primary energy-consuming systems: main electrical distribution, HVAC
                  plant, lighting systems, and any process equipment. These typically account for
                  70-80% of consumption and deserve the most attention.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Step 3: Floor-by-Floor Coverage</h4>
                <p className="text-gray-300 text-sm">
                  Work systematically through each floor, following a consistent pattern (e.g.,
                  clockwise from the lift lobby). Document zone types, occupancy densities,
                  lighting types, and local equipment. Note variations from typical areas.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-elec-yellow mb-2">Step 4: Hidden Spaces</h4>
                <p className="text-gray-300 text-sm">
                  Don't forget risers, ceiling voids, roof areas, basements, and external plant.
                  These often contain equipment running 24/7 that building users never see.
                  Request access to all areas—savings opportunities often hide in overlooked spaces.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              What to Observe
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-400">Equipment Status</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Running or standby?</li>
                  <li>• Load levels</li>
                  <li>• Maintenance condition</li>
                  <li>• Age indicators</li>
                  <li>• Control settings</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-400">Operational Patterns</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Occupancy levels</li>
                  <li>• Usage schedules</li>
                  <li>• User behaviours</li>
                  <li>• Override evidence</li>
                  <li>• Seasonal variations</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-orange-400">Waste Indicators</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Lights on in empty rooms</li>
                  <li>• Heating/cooling conflicts</li>
                  <li>• Equipment idling</li>
                  <li>• Air/steam leaks</li>
                  <li>• Open doors/windows</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Inline Check 1 */}
          <div className="mb-6">
            <InlineCheck
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </section>

        {/* Section 3: Equipment Inventory Creation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Equipment Inventory Creation</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              The equipment inventory forms the quantitative foundation of your energy audit.
              A comprehensive inventory enables accurate consumption calculations, identifies
              replacement opportunities, and supports investment-grade recommendations.
            </p>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              BS EN 16247 Inventory Requirements
            </h3>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3">
                The standard requires inventories to account for at least <span className="text-elec-yellow font-semibold">90%
                of total energy consumption</span>. This means prioritising significant loads while
                acknowledging that capturing every small appliance may not be practical.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Required Data Points</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Equipment identification</li>
                    <li>• Location/zone reference</li>
                    <li>• Rated power/capacity</li>
                    <li>• Estimated operating hours</li>
                    <li>• Observed load factor</li>
                    <li>• Control method</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Recommended Additions</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Manufacturer and model</li>
                    <li>• Serial number</li>
                    <li>• Installation date/age</li>
                    <li>• Maintenance status</li>
                    <li>• Efficiency rating</li>
                    <li>• Replacement priority</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Key Equipment Categories
            </h3>

            <div className="space-y-3 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-yellow-500">
                <h4 className="font-semibold mb-1">Lighting Systems</h4>
                <p className="text-gray-300 text-sm">
                  Record lamp types (LED, fluorescent, HID), fitting counts, wattages, control types
                  (manual, PIR, daylight, DALI), and operating hours. Note emergency lighting separately.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-blue-500">
                <h4 className="font-semibold mb-1">HVAC Equipment</h4>
                <p className="text-gray-300 text-sm">
                  Chillers, boilers, AHUs, FCUs, split systems, VRF/VRV units. Record capacities (kW thermal),
                  efficiency ratings (COP, SEER), refrigerant types, and BMS integration status.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500">
                <h4 className="font-semibold mb-1">Motors and Drives</h4>
                <p className="text-gray-300 text-sm">
                  Pumps, fans, compressors, conveyors. Record motor ratings, efficiency class (IE1-IE5),
                  drive type (DOL, soft starter, VSD), and typical load percentage.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="font-semibold mb-1">IT and Office Equipment</h4>
                <p className="text-gray-300 text-sm">
                  Servers, network equipment, workstations, printers, displays. Note Energy Star ratings,
                  power management settings, and 24/7 vs business hours operation.
                </p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-orange-500">
                <h4 className="font-semibold mb-1">Process Equipment</h4>
                <p className="text-gray-300 text-sm">
                  Production machinery, ovens, furnaces, compressed air systems. Record nameplate data,
                  production schedules, and any metered consumption data available.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-elec-yellow/30">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-elec-yellow" />
                Digital Inventory Tools
              </h4>
              <p className="text-gray-300 text-sm">
                Consider using tablet-based survey apps or spreadsheet templates that auto-calculate
                estimated consumption. Features like barcode scanning for equipment identification and
                GPS/zone tagging improve accuracy and efficiency. Export capabilities should support
                your reporting software.
              </p>
            </div>
          </div>

          {/* Inline Check 2 */}
          <div className="mb-6">
            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </section>

        {/* Section 4: Identifying Quick Wins */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              4
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Identifying Quick Wins During Surveys</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Quick wins are low-cost, fast-payback measures that can often be implemented immediately
              or with minimal investment. Identifying these during your walkthrough adds immediate
              value to clients and builds confidence in your recommendations.
            </p>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Common Quick Win Categories
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <span className="text-lg">💡</span> Lighting Quick Wins
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• LED lamp replacements (40-60% savings)</li>
                  <li>• Occupancy sensors in toilets, stores</li>
                  <li>• Photocell controls for external lighting</li>
                  <li>• Delamping over-lit areas</li>
                  <li>• Timer adjustments for schedules</li>
                  <li>• Cleaning luminaires (up to 20% improvement)</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4" /> HVAC Quick Wins
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Setpoint adjustments (1°C = 8-10% saving)</li>
                  <li>• Schedule optimisation</li>
                  <li>• Dead-band widening</li>
                  <li>• Filter replacement</li>
                  <li>• Sealing ductwork leaks</li>
                  <li>• Disabling unused zones</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Electrical Quick Wins
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Power factor correction</li>
                  <li>• Switching off idle equipment</li>
                  <li>• IT power management activation</li>
                  <li>• Vending machine timers</li>
                  <li>• Water heater schedules</li>
                  <li>• Standby power elimination</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Operational Quick Wins
                </h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Staff awareness training</li>
                  <li>• Switch-off campaigns</li>
                  <li>• Door closer installation</li>
                  <li>• Compressed air leak repairs</li>
                  <li>• Insulation jacket installation</li>
                  <li>• Optimising start/stop times</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Assessing Quick Win Viability</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-2 text-elec-yellow">Criteria</th>
                    <th className="text-left py-2 text-elec-yellow">Quick Win Threshold</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Simple Payback</td>
                    <td className="py-2">&lt; 2 years (often &lt; 1 year)</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Capital Cost</td>
                    <td className="py-2">Low or within maintenance budgets</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Implementation</td>
                    <td className="py-2">Minimal disruption, no major shutdowns</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Technical Risk</td>
                    <td className="py-2">Proven technology, low complexity</td>
                  </tr>
                  <tr>
                    <td className="py-2">Approval Required</td>
                    <td className="py-2">Facilities manager level or below</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Immediate Action Items
              </h4>
              <p className="text-gray-300 text-sm">
                During your survey, maintain a separate "immediate actions" list for issues that
                could be fixed the same day—equipment left running, incorrect settings, manual
                overrides, etc. Share these with your site contact before leaving. This demonstrates
                immediate value and builds client confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Documentation and Photography */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              5
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Documentation and Photography</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Professional documentation distinguishes quality audits from superficial assessments.
              Your photographs and notes must support accurate reporting, client presentations,
              and potentially, funding applications that require evidence of baseline conditions.
            </p>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Photography Best Practices
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">What to Photograph</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Equipment nameplates (readable!)</li>
                  <li>• Control panels and settings</li>
                  <li>• Distribution board labels</li>
                  <li>• Meter readings</li>
                  <li>• Problem areas (leaks, damage)</li>
                  <li>• Thermal images (if using IR)</li>
                  <li>• Context shots showing installation</li>
                  <li>• Before/after potential changes</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">Photography Tips</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Use flash for dark plant rooms</li>
                  <li>• Include scale reference where useful</li>
                  <li>• Capture multiple angles</li>
                  <li>• Enable GPS tagging if possible</li>
                  <li>• Use consistent naming convention</li>
                  <li>• Backup photos daily</li>
                  <li>• Note timestamp/location in log</li>
                  <li>• Request permission for sensitive areas</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Field Notes Structure
            </h3>

            <div className="bg-[#1a1a1a] rounded-lg p-4 mb-6">
              <p className="text-gray-300 mb-3">
                Structure your field notes to support efficient report writing:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-2">Zone Information</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Zone ID/name</li>
                    <li>• Floor/building area</li>
                    <li>• Use type</li>
                    <li>• Approximate area (m²)</li>
                    <li>• Occupancy observed</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-2">Equipment Notes</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Equipment reference</li>
                    <li>• Operating status</li>
                    <li>• Condition assessment</li>
                    <li>• Photo reference numbers</li>
                    <li>• Measurements taken</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow mb-2">Observations</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Issues identified</li>
                    <li>• Opportunities spotted</li>
                    <li>• Questions for follow-up</li>
                    <li>• Staff comments</li>
                    <li>• Access limitations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-elec-yellow/30">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-elec-yellow" />
                Digital Documentation Tools
              </h4>
              <p className="text-gray-300 text-sm">
                Modern audit tools like tablet survey apps, cloud storage, and thermal imaging
                software with automatic report generation significantly improve documentation
                quality and efficiency. Consider apps that allow voice notes, automatic photo
                organisation, and real-time team collaboration for larger survey teams.
              </p>
            </div>
          </div>

          {/* Inline Check 3 */}
          <div className="mb-6">
            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </section>

        {/* Section 6: Safety Considerations */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] flex items-center justify-center font-bold text-lg">
              6
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Safety Considerations During Audits</h2>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Energy auditors work in diverse environments with varying hazards. Your safety and
              that of building occupants must never be compromised for the sake of data collection.
              A thorough risk assessment and appropriate precautions are essential.
            </p>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical Safety Requirements
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Never work alone</strong> in hazardous areas (plant rooms, roof access, confined spaces)</li>
                <li>• <strong>Never bypass safety systems</strong> or remove guards without proper isolation</li>
                <li>• <strong>Always assume equipment is live</strong> until proven otherwise</li>
                <li>• <strong>Stop immediately</strong> if you encounter unexpected hazards</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Pre-Survey Safety Planning
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">Risk Assessment (RAMS)</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Review site-specific hazards</li>
                  <li>• Identify control measures</li>
                  <li>• Confirm PPE requirements</li>
                  <li>• Note emergency procedures</li>
                  <li>• Establish communication plan</li>
                  <li>• Document competency requirements</li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-white">Site Induction</h4>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Complete visitor/contractor sign-in</li>
                  <li>• Attend site safety briefing</li>
                  <li>• Understand emergency evacuation</li>
                  <li>• Identify first aiders/fire wardens</li>
                  <li>• Note assembly point locations</li>
                  <li>• Obtain necessary permits</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Common Audit Hazards</h3>

            <div className="space-y-3 mb-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Electrical</h4>
                  <p className="text-gray-300 text-sm">
                    Live equipment, exposed conductors, arc flash risk. Use appropriate test equipment,
                    maintain safe distances, and never open live panels without proper authorisation
                    and PPE.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-start gap-3">
                <Thermometer className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Thermal</h4>
                  <p className="text-gray-300 text-sm">
                    Hot pipes, steam systems, boiler plant, process equipment. Be aware of surface
                    temperatures and maintain safe distances. Use thermal imaging to identify hot
                    spots before approaching.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-start gap-3">
                <Building className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Physical</h4>
                  <p className="text-gray-300 text-sm">
                    Working at height, confined spaces, trip hazards, moving machinery. Use
                    appropriate fall protection, never enter confined spaces without proper
                    training and permits, and maintain awareness of surroundings.
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">Chemical/Environmental</h4>
                  <p className="text-gray-300 text-sm">
                    Refrigerants, asbestos, hazardous substances, noise. Check for warning signs,
                    request COSHH information, and never disturb suspected asbestos-containing
                    materials.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-green-700">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Essential PPE for Energy Audits
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
                <div>• Safety boots</div>
                <div>• Hi-vis vest</div>
                <div>• Hard hat</div>
                <div>• Safety glasses</div>
                <div>• Gloves (as needed)</div>
                <div>• Hearing protection</div>
                <div>• Torch/headlamp</div>
                <div>• First aid kit</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 rounded-lg p-6 border border-elec-yellow/30">
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="w-6 h-6 text-elec-yellow" />
              <h2 className="text-xl font-bold text-elec-yellow">Quick Reference Card</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Survey Checklist</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Pre-survey: Request documentation, plan access, prepare RAMS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Orientation: Building tour, identify major systems, note layout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Major plant: Survey HVAC, main distribution, large loads first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Zone survey: Systematic floor-by-floor coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Hidden areas: Risers, voids, roof plant, basements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Documentation: Photos, measurements, staff interviews</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Key Numbers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between bg-[#1a1a1a] rounded p-2">
                    <span className="text-gray-300">Inventory coverage target</span>
                    <span className="text-elec-yellow font-semibold">≥90%</span>
                  </div>
                  <div className="flex justify-between bg-[#1a1a1a] rounded p-2">
                    <span className="text-gray-300">LED vs T8 savings</span>
                    <span className="text-elec-yellow font-semibold">40-60%</span>
                  </div>
                  <div className="flex justify-between bg-[#1a1a1a] rounded p-2">
                    <span className="text-gray-300">1°C setpoint change</span>
                    <span className="text-elec-yellow font-semibold">8-10% HVAC</span>
                  </div>
                  <div className="flex justify-between bg-[#1a1a1a] rounded p-2">
                    <span className="text-gray-300">Quick win payback</span>
                    <span className="text-elec-yellow font-semibold">&lt;2 years</span>
                  </div>
                  <div className="flex justify-between bg-[#1a1a1a] rounded p-2">
                    <span className="text-gray-300">Utility data period</span>
                    <span className="text-elec-yellow font-semibold">12-36 months</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-3 mt-4">BS EN 16247 Parts</h3>
                <div className="text-sm text-gray-300 bg-[#1a1a1a] rounded p-3">
                  <p><strong>Part 1:</strong> General requirements</p>
                  <p><strong>Part 2:</strong> Buildings</p>
                  <p><strong>Part 3:</strong> Processes</p>
                  <p><strong>Part 4:</strong> Transport</p>
                  <p><strong>Part 5:</strong> Competence of auditors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-elec-yellow">?</span>
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left min-h-[44px] touch-manipulation"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <div className="bg-[#2a2a2a] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Target className="w-6 h-6 text-elec-yellow" />
              Section Quiz
            </h2>

            {!showQuiz ? (
              <div className="text-center py-6">
                <p className="text-gray-300 mb-6">
                  Test your understanding of walkthrough and inventory survey techniques
                  with this 10-question quiz.
                </p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation px-8"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <Quiz
                questions={quizQuestions}
                onComplete={(score) => {
                  console.log(`Quiz completed with score: ${score}/${quizQuestions.length}`);
                }}
              />
            )}
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={() => navigate('/upskilling/energy-efficiency/module-2')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation border-gray-600 hover:bg-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous: Module 2</span>
          </Button>

          <Button
            onClick={() => navigate('/upskilling/energy-efficiency/module-3/section-2')}
            className="flex items-center justify-center gap-2 min-h-[44px] touch-manipulation bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
          >
            <span>Next: Section 2</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default EnergyEfficiencyModule3Section1;
