import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Building2,
  BrainCircuit,
  ChevronDown,
  Cpu,
  GraduationCap,
  BarChart3,
  Thermometer,
  Zap,
  Clock,
  Users,
  Wifi,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is a Building Management System (BMS)?',
    answer:
      "A Building Management System (BMS), also known as a Building Automation System (BAS), is a centralised computer-based control system that monitors and manages a building's mechanical, electrical, and electromechanical services. This includes heating, ventilation, air conditioning (HVAC), lighting, fire systems, and security. A BMS uses sensors, controllers, and actuators connected via communication protocols such as BACnet, Modbus, or KNX to optimise energy usage, maintain occupant comfort, and reduce operating costs.",
  },
  {
    question: 'Do I need electrical qualifications to become a BMS engineer?',
    answer:
      'A strong electrical background is one of the best foundations for a career in BMS engineering. Most BMS engineers have completed an electrical apprenticeship or hold a Level 3 qualification in electrical installation. Your existing knowledge of wiring, control circuits, and BS 7671:2018+A3:2024 gives you a significant advantage. The BMS-specific knowledge — protocols, programming, and system design — is what this course adds on top of your existing skills.',
  },
  {
    question: 'What communication protocols will I learn?',
    answer:
      'This course covers the four most important BMS protocols. BACnet (Building Automation and Control Networks) is the most widely used open protocol in commercial buildings. Modbus RTU and Modbus TCP/IP are used extensively for connecting field devices such as energy meters, variable speed drives, and sensors. KNX is the European standard for building automation, particularly strong in lighting and blind control. You will also learn about DALI (Digital Addressable Lighting Interface) for lighting control integration.',
  },
  {
    question: 'What are BMS engineer day rates in the UK?',
    answer:
      'BMS engineers command premium rates due to the specialised nature of the work and high demand from building owners seeking energy efficiency. Junior BMS engineers typically earn between £150 and £250 per day. Experienced BMS engineers with programming skills earn £250 to £350 per day. Senior BMS engineers and commissioning specialists regularly achieve £350 to £400+ per day. These rates reflect the combination of electrical knowledge, IT skills, and building services expertise that BMS work requires.',
  },
  {
    question: 'How long does the BMS course take to complete?',
    answer:
      'The course contains 7 modules covering fundamentals through to advanced commissioning. Most electricians complete the course in 4 to 8 weeks studying part-time around their working day. Because Elec-Mate is entirely self-paced, you can study during breaks on site, at home in the evening, or whenever suits you. The AI study assistant helps you focus on areas where you need the most practice, making your study time more efficient.',
  },
  {
    question: 'Is there demand for BMS engineers in the UK?',
    answer:
      'Demand for BMS engineers in the UK is exceptionally strong and growing. The push towards net zero carbon emissions by 2050, rising energy costs, and Building Regulations Part L requiring improved energy performance all drive demand. Commercial buildings, hospitals, universities, data centres, and new-build residential developments all require BMS installation and ongoing maintenance. Many experienced BMS engineers are approaching retirement age, creating a significant skills gap that electricians can fill.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any BMS question in plain English. Our AI understands HVAC control loops, protocol specifications, and commissioning procedures, giving you detailed, practical answers.',
  },
  {
    icon: Cpu,
    title: 'Protocol Deep Dives',
    description:
      'Comprehensive coverage of BACnet, Modbus, KNX, and DALI protocols with practical examples of network architecture, addressing, and data point configuration.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Visual dashboards show your strengths and weak areas across all seven modules. Focus your revision where it matters most and track improvement over time.',
  },
  {
    icon: Thermometer,
    title: 'HVAC Controls Training',
    description:
      'Detailed coverage of AHU, FCU, VAV, and chiller plant control strategies including PID loops, cascade control, and optimum start/stop algorithms.',
  },
  {
    icon: Clock,
    title: 'Study Anywhere',
    description:
      'Access all course material on your phone, tablet, or desktop. Study during breaks on site, on the commute, or at home. Your progress syncs across every device automatically.',
  },
  {
    icon: Settings,
    title: 'Commissioning Skills',
    description:
      'Learn systematic BMS commissioning procedures including point-to-point testing, loop checking, trend logging analysis, and performance verification against design intent.',
  },
];

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'BMS Course Online - Building Management Systems Training',
  description:
    'Comprehensive online BMS training for electricians. HVAC controls, BACnet, Modbus, KNX protocols, sensor types, energy management, and commissioning. 7 modules with mock exams.',
  provider: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    url: 'https://elec-mate.com',
    logo: 'https://elec-mate.com/logo.jpg',
  },
  educationalLevel: 'Professional',
  inLanguage: 'en-GB',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT35H',
  },
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/InStock',
    validFrom: '2024-01-01',
    description: '7-day free trial, then from £4.99/month',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function BMSCoursePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'BMS Course Online | Building Management Systems Training',
    description:
      'Study Building Management Systems (BMS) online. HVAC controls, sensors, communication protocols (BACnet, Modbus, KNX), energy management. 7 modules with mock exams.',
    schema: {
      '@type': 'Course',
      name: 'BMS Course Online - Building Management Systems',
      description:
        'BMS training for electricians covering HVAC controls, protocols, and commissioning',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
        url: 'https://elec-mate.com',
      },
      educationalLevel: 'Professional',
    },
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://elec-mate.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Training',
                item: 'https://elec-mate.com/training',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'BMS Course',
                item: 'https://elec-mate.com/training/bms-building-management-systems',
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">High-Demand Upskilling</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            BMS Course Online
            <br />
            <span className="text-yellow-400">Building Management Systems</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Master Building Management Systems with an AI-powered study platform. Learn HVAC
            controls, BACnet, Modbus, KNX protocols, and commissioning techniques. Earn
            £250-£400/day as a BMS engineer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/auth/signup"
              className="h-14 px-10 inline-flex items-center justify-center text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform"
            >
              Start 7-Day Free Trial
            </a>
            <span className="text-white text-sm">From £4.99/mo after trial — cancel anytime</span>
          </div>
        </div>
      </section>

      {/* What Is BMS */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is a Building Management System?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A Building Management System (BMS) is the brain of a modern building. It is a
              centralised, computer-based control system that monitors and manages all of a
              building's mechanical, electrical, and electromechanical services. From the heating
              and ventilation to the lighting, fire detection, and access control, a BMS ties
              everything together into a single, intelligent network that optimises comfort, energy
              efficiency, and safety.
            </p>
            <p>
              The architecture of a typical BMS follows a clear hierarchy. At the field level,
              sensors measure environmental conditions such as temperature, humidity, CO2
              concentration, air pressure, and occupancy. These sensor readings feed into
              controllers — the workhorses of any BMS — which execute pre-programmed control
              strategies. The controllers send commands to actuators that physically change the
              building environment: opening valves, adjusting dampers, switching fans, or dimming
              lights. At the top of the hierarchy sits the user interface, typically a graphical
              front end running on a workstation or accessible via a web browser, where building
              managers can view system status, adjust setpoints, review alarms, and analyse trend
              data.
            </p>
            <p>
              For electricians, BMS represents one of the most lucrative and fastest-growing areas
              of the building services industry. Every new commercial building, hospital,
              university, data centre, and large residential development requires a BMS.
              Retrofitting older buildings with modern controls is also a booming market as building
              owners seek to reduce energy consumption and meet tightening environmental
              regulations. The combination of electrical installation skills, IT networking
              knowledge, and HVAC understanding that BMS work demands means qualified engineers are
              in short supply and command premium day rates.
            </p>
          </div>
        </div>
      </section>

      {/* Communication Protocols */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Communication Protocols You Will Master
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Communication protocols are the language that BMS devices use to talk to each other.
              Understanding these protocols is essential for designing, installing, commissioning,
              and troubleshooting BMS networks. This course covers the four most important protocols
              in detail.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  protocol: 'BACnet',
                  detail:
                    'The most widely adopted open protocol for commercial building automation. Covers BACnet IP, BACnet MS/TP, object types, and device discovery.',
                },
                {
                  protocol: 'Modbus',
                  detail:
                    'Industry-standard serial protocol. Covers Modbus RTU (RS-485) and Modbus TCP/IP for energy meters, VFDs, and field devices.',
                },
                {
                  protocol: 'KNX',
                  detail:
                    'The European standard for home and building automation. Twisted pair wiring, device programming with ETS, and integration with HVAC systems.',
                },
                {
                  protocol: 'DALI',
                  detail:
                    'Digital Addressable Lighting Interface for precise lighting control. Addressing, grouping, scene programming, and emergency lighting integration.',
                },
              ].map((item) => (
                <div
                  key={item.protocol}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 shrink-0">
                    <Wifi className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-400 text-sm">{item.protocol}</p>
                    <p className="text-white text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>
              Each protocol module includes practical exercises covering network design, device
              addressing, data point mapping, and troubleshooting common communication faults. You
              will learn to read protocol analyser traces, identify communication errors, and
              resolve issues that commonly arise during commissioning.
            </p>
          </div>
        </div>
      </section>

      {/* HVAC Controls */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            HVAC Controls and Plant Management
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Heating, ventilation, and air conditioning (HVAC) represents the largest energy
              consumer in most commercial buildings, typically accounting for 40-60% of total energy
              use. Effective BMS control of HVAC plant is therefore critical for both occupant
              comfort and energy efficiency. This course provides detailed coverage of the control
              strategies used for all major HVAC plant types.
            </p>
            <p>
              Air Handling Units (AHUs) are covered in depth, including supply and extract fan
              control, mixed air damper modulation, heating and cooling coil valve control, humidity
              control via steam humidifiers or adiabatic systems, and air quality management using
              CO2 sensors. You will learn how to implement cascade control loops where the room
              temperature controller provides the setpoint for the AHU discharge air temperature
              controller.
            </p>
            <p>
              Fan Coil Units (FCUs) are the most common terminal unit in commercial offices. The
              course covers two-pipe and four-pipe changeover strategies, three-speed and EC
              (electronically commutated) fan control, and occupancy-based setback using PIR sensors
              or window contacts. Variable Air Volume (VAV) systems, including pressure-independent
              VAV boxes with reheat coils, are also covered in detail.
            </p>
            <p>
              Chiller plant control is one of the most complex areas of BMS programming. You will
              learn about chiller sequencing (lead/lag rotation), condenser water temperature
              optimisation, free cooling strategies using dry air coolers or cooling towers, and the
              calculation of coefficient of performance (COP) for monitoring plant efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Sensor Types */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Sensor Types and Selection
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Sensors are the eyes and ears of a BMS. Selecting the right sensor for each
              application and understanding its characteristics is fundamental to reliable building
              automation. This course covers all the sensor types you will encounter in BMS work.
            </p>
            <p>
              Temperature sensors are the most numerous in any BMS. NTC (Negative Temperature
              Coefficient) thermistors are widely used for room, duct, and pipe temperature sensing
              due to their low cost and good accuracy. Pt100 and Pt1000 platinum resistance
              temperature detectors (RTDs) offer superior accuracy and long-term stability, making
              them the preferred choice for critical applications such as chilled water flow and
              return temperature measurement, where a fraction of a degree matters for efficiency
              calculations.
            </p>
            <p>
              Humidity sensors measure relative humidity (RH) using capacitive sensing elements.
              Understanding the difference between room humidity, duct humidity, and outside air
              humidity sensing positions is essential for correct control strategy implementation.
              CO2 sensors, available in NDIR (Non-Dispersive Infrared) technology, enable
              demand-controlled ventilation that can significantly reduce energy consumption by
              adjusting fresh air volumes based on actual occupancy rather than fixed schedules.
            </p>
            <p>
              Pressure sensors cover both air-side (duct static pressure for VAV systems) and
              water-side (differential pressure across pumps and coils) applications. Occupancy
              sensors — PIR, ultrasonic, and microwave types — enable the BMS to reduce heating,
              cooling, and lighting energy in unoccupied areas.
            </p>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What You Will Learn — 7 Course Modules
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            {[
              { module: 'Module 1', title: 'BMS Fundamentals and System Architecture' },
              { module: 'Module 2', title: 'Communication Protocols (BACnet, Modbus, KNX)' },
              { module: 'Module 3', title: 'Sensors, Actuators, and Field Devices' },
              { module: 'Module 4', title: 'HVAC Control Strategies' },
              { module: 'Module 5', title: 'Energy Management and Optimisation' },
              { module: 'Module 6', title: 'BMS Programming and Graphics' },
              { module: 'Module 7', title: 'Commissioning, Testing, and Handover' },
            ].map((item) => (
              <div
                key={item.module}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 shrink-0">
                  <GraduationCap className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-yellow-400 text-sm">{item.module}</p>
                  <p className="text-white text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Each module includes detailed technical content, practical examples drawn from real
              BMS installations, quiz questions to test your understanding, and access to the AI
              study assistant for any questions that arise during your study. Module 7 on
              commissioning is particularly valuable, covering the systematic process from
              point-to-point testing through integrated systems testing to performance verification
              and client handover.
            </p>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Career Opportunities in BMS
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The BMS industry offers electricians a clear pathway to higher earnings and more
              technically interesting work. Entry-level BMS technician roles focus on installation,
              wiring, and basic commissioning — skills that draw directly on your existing
              electrical qualifications. With experience and protocol knowledge, you can progress to
              BMS engineer roles involving system programming, graphics development, and complex
              commissioning.
            </p>
            <p>
              Senior BMS engineers and project managers can earn £350 to £400+ per day. Some
              specialise in energy management, using BMS trend data and analytics to help building
              owners reduce consumption and achieve sustainability targets. Others focus on
              integration, connecting BMS with fire alarm systems, access control, CCTV, and smart
              building platforms. The growing emphasis on smart buildings, IoT connectivity, and net
              zero carbon targets means demand for skilled BMS professionals will continue to
              increase for the foreseeable future.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
            Everything You Need to Upskill
          </h2>
          <p className="text-white text-center mb-8 max-w-2xl mx-auto">
            A complete BMS study toolkit designed for electricians moving into building automation.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left touch-manipulation h-auto min-h-[44px]"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-yellow-400 shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-white leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">430+</p>
              <p className="text-sm text-white">UK Electricians</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">£250-£400</p>
              <p className="text-sm text-white">BMS Engineer Day Rate</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <Building2 className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">7 Modules</p>
              <p className="text-sm text-white">Full BMS Coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Ready to move into BMS?"
        subheading="Join 430+ UK electricians studying smarter with AI. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:hidden" />
    </PublicPageLayout>
  );
}
