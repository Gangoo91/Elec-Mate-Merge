import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Home,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Wifi,
  Lightbulb,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Smart Home Automation Course | KNX & IoT Training';
const PAGE_DESCRIPTION =
  'Comprehensive smart home automation training for UK electricians. KNX protocol, IoT devices, lighting control, HVAC integration, security systems, and voice assistant setup. 9 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Smart Home Automation', href: '/training/smart-home-automation' },
];

const tocItems = [
  { id: 'why-smart-home-training', label: 'Why Smart Home Training Matters' },
  { id: 'knx-protocol', label: 'The KNX Protocol' },
  { id: 'iot-fundamentals', label: 'IoT Fundamentals for Electricians' },
  { id: 'lighting-control', label: 'Lighting Control Systems' },
  { id: 'hvac-integration', label: 'HVAC and Climate Control' },
  { id: 'security-access', label: 'Security and Access Control' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "KNX is the world's leading open standard for smart building automation — understanding KNX wiring, programming, and commissioning opens up a premium market for electricians in both residential and commercial sectors.",
  'IoT-based smart home systems (Zigbee, Z-Wave, Matter) require solid network infrastructure including structured cabling, PoE switches, and reliable Wi-Fi coverage to function correctly.',
  'Lighting control is the gateway service for smart home electricians — DALI, DMX, and wireless dimming protocols allow you to deliver sophisticated scenes and schedules that clients value highly.',
  'Smart home installations require careful planning of containment, power supplies, and data cabling during first fix — retrofitting is significantly more expensive and disruptive.',
  'Voice assistant integration (Amazon Alexa, Google Home, Apple HomeKit) is now expected by homeowners — electricians who can configure these platforms alongside hardware installations command higher day rates.',
];

const faqs = [
  {
    question: 'Do I need a separate qualification to install smart home systems?',
    answer:
      'There is no specific legal requirement for a separate qualification to install smart home devices in the UK. However, any electrical work must comply with BS 7671 and Part P of the Building Regulations where applicable. For KNX specifically, becoming a KNX Partner through the KNX Association involves attending a certified basic course and passing an examination. This Elec-Mate course provides the foundational knowledge of smart home systems, protocols, and integration techniques. For KNX Partner certification, you would additionally attend a hands-on course at a KNX-accredited training centre.',
  },
  {
    question: 'What is the difference between KNX and IoT-based smart home systems?',
    answer:
      'KNX is a wired, decentralised bus system designed for professional building automation. It uses a dedicated twisted-pair cable (green cable) running alongside standard mains wiring, and every device on the bus can communicate with every other device without a central controller. KNX is extremely reliable, standardised (EN 50090, ISO/IEC 14543), and is the standard for commercial building management. IoT-based systems (Zigbee, Z-Wave, Matter, Wi-Fi) are typically wireless, often require a central hub, and are more commonly used in residential retrofits. KNX is more expensive to install but offers superior reliability and scalability. Many modern projects use a combination of both.',
  },
  {
    question: 'How much can I earn as a smart home installer?',
    answer:
      'Smart home installation is one of the highest-paying specialisms for electricians in the UK. A KNX-qualified electrician can charge £350 to £500 per day, compared to £200 to £300 for general electrical work. Complete smart home projects for high-end residential properties typically range from £5,000 to £50,000 or more depending on the scope, covering lighting control, HVAC integration, security, audio-visual, and automated blinds. The market is growing rapidly as new-build developers and homeowners increasingly expect smart features as standard.',
  },
  {
    question: 'What tools and equipment do I need for smart home installations?',
    answer:
      'For KNX installations, you need a laptop with ETS (Engineering Tool Software) for programming, a KNX USB interface for connecting to the bus, standard electrical installation tools, and a network cable tester. For IoT installations, you need a good understanding of Wi-Fi network design, a Wi-Fi survey tool (such as NetSpot or Ekahau), a PoE network switch, structured cabling tools (RJ45 crimpers, cable testers, patch panels), and familiarity with the specific hub or controller platform being used (such as Control4, Crestron, Loxone, or Home Assistant).',
  },
  {
    question: 'Is this course suitable for apprentices or only qualified electricians?',
    answer:
      'This course is designed for electricians with at least a Level 2 qualification or equivalent practical experience. You should understand basic electrical installation principles, circuit protection, and BS 7671 wiring regulations before starting. Apprentices in their second or third year who have covered these fundamentals will benefit from the course. The content builds on existing electrical knowledge and teaches the additional skills needed for smart home and building automation work.',
  },
  {
    question: 'What is the Matter protocol and why does it matter?',
    answer:
      'Matter is a new unified connectivity standard developed by Apple, Google, Amazon, and Samsung (among others) through the Connectivity Standards Alliance. It aims to solve the fragmentation problem in smart homes by providing a single protocol that works across all major ecosystems. Matter devices work with HomeKit, Google Home, and Alexa without needing separate hubs or bridges. For electricians, Matter simplifies device selection and customer conversations — you can recommend Matter-certified devices knowing they will work with whatever voice assistant or app the homeowner prefers. Matter runs over Wi-Fi and Thread (a low-power mesh network), so solid network infrastructure is still essential.',
  },
];

const modules = [
  {
    title: 'Introduction to Smart Home Technology',
    description:
      'Overview of the smart home market in the UK, key protocols (KNX, Zigbee, Z-Wave, Matter, Wi-Fi), wired versus wireless approaches, and the business opportunity for electricians.',
  },
  {
    title: 'KNX Fundamentals',
    description:
      'KNX bus topology, twisted-pair cabling, device addressing, actuators, sensors, and the ETS programming software. Hands-on exercises with virtual KNX configurations.',
  },
  {
    title: 'Network Infrastructure for Smart Homes',
    description:
      'Structured cabling (Cat 6/6A), Wi-Fi access point placement, PoE switches, VLANs for IoT device segmentation, and network security best practices.',
  },
  {
    title: 'Lighting Control Systems',
    description:
      'DALI, DMX, and wireless dimming protocols. Scene programming, circadian lighting, occupancy sensing, daylight harvesting, and integration with voice assistants.',
  },
  {
    title: 'HVAC and Climate Control Integration',
    description:
      'Smart thermostats, underfloor heating zone control, heat pump integration, ventilation systems, and building energy management. OpenTherm and Modbus protocols.',
  },
  {
    title: 'Security and Access Control',
    description:
      'IP camera systems, video doorbells, smart locks, alarm panel integration, intercom systems, and remote monitoring. GDPR considerations for CCTV installations.',
  },
  {
    title: 'Audio-Visual and Multiroom Systems',
    description:
      'Multiroom audio distribution, HDMI matrix switching, structured AV cabling, in-ceiling and in-wall speaker installation, and streaming platform integration.',
  },
  {
    title: 'Voice Assistants and App Integration',
    description:
      'Amazon Alexa, Google Home, and Apple HomeKit configuration. Routines, automations, geofencing triggers, and Matter protocol device setup.',
  },
  {
    title: 'Design, Commissioning, and Handover',
    description:
      'Client consultation and scope definition, system design documentation, commissioning procedures, client training, ongoing support contracts, and troubleshooting common issues.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any smart home or KNX question in plain English. Get clear answers on protocols, wiring topologies, programming techniques, and integration methods.',
  },
  {
    icon: Wifi,
    title: 'Video Content',
    description:
      'Step-by-step video demonstrations of KNX programming, lighting scene setup, network configuration, and voice assistant integration.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge after every module with scenario-based questions on protocol selection, network design, device configuration, and commissioning.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course with reminder notifications.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering KNX addressing, protocol comparisons, lighting control standards, and network terminology.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length assessments covering all nine modules. Instant marking with detailed explanations for every answer. Track your readiness score over time.',
  },
];

const sections = [
  {
    id: 'why-smart-home-training',
    heading: 'Why Smart Home Training Matters for Electricians',
    content: (
      <>
        <p>
          The UK smart home market is growing at over 15% per year, with homeowners and developers
          increasingly expecting integrated lighting, heating, security, and entertainment systems
          as standard. For electricians, this represents one of the most lucrative specialisms
          available — smart home projects command significantly higher margins than standard
          electrical installation work.
        </p>
        <p>
          Unlike traditional electrical work where competition is fierce and margins are tight,
          smart home installation requires specialist knowledge that relatively few electricians
          possess. An electrician who can design, install, and commission a complete smart home
          system — including{' '}
          <SEOInternalLink href="/training/ev-charger-installation">
            EV charger integration
          </SEOInternalLink>
          , lighting control, climate management, and security — becomes a one-stop solution for
          high-end residential clients and property developers.
        </p>
        <p>
          Smart home work also provides excellent recurring revenue through maintenance contracts,
          system upgrades, and expansion projects. Once you have installed a smart home system for a
          client, they typically return to you for additions and modifications rather than seeking a
          new contractor.
        </p>
      </>
    ),
  },
  {
    id: 'knx-protocol',
    heading: 'The KNX Protocol: Professional Building Automation',
    content: (
      <>
        <p>
          KNX is the worldwide standard for home and building automation (EN 50090, ISO/IEC 14543).
          Developed from three earlier protocols (EIB, BatiBUS, and EHS), KNX provides a
          manufacturer-independent, decentralised bus system for controlling lighting, blinds, HVAC,
          security, energy management, and audio-visual systems.
        </p>
        <p>
          The most common KNX installation method uses twisted-pair (TP) cabling — a dedicated green
          cable that runs alongside standard mains wiring. Every KNX device connects to this bus
          cable and can communicate with every other device without requiring a central controller.
          This decentralised architecture means the system continues to operate even if the
          visualisation server or gateway fails.
        </p>
        <p>
          Programming KNX devices requires the ETS (Engineering Tool Software) application.
          Electricians use ETS to assign physical addresses to devices, create group addresses for
          linking inputs to outputs, and configure parameters such as dimming curves, time delays,
          and scene values. Understanding ETS is essential for any electrician working with KNX.
        </p>
        <SEOAppBridge
          title="Learn KNX programming with AI-guided tutorials"
          description="Struggling with group addresses and parameter settings? Ask the Elec-Mate AI tutor any KNX question and get step-by-step explanations with practical examples from real installations."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'iot-fundamentals',
    heading: 'IoT Fundamentals for Electricians',
    content: (
      <>
        <p>
          Internet of Things (IoT) smart home systems use wireless protocols — primarily Zigbee,
          Z-Wave, Wi-Fi, Bluetooth, and the newer Matter/Thread standard — to connect devices
          without dedicated bus cabling. These systems are popular for residential retrofits where
          running new cabling would be impractical or too expensive.
        </p>
        <p>
          For electricians, the critical skill is providing the network infrastructure these
          wireless devices depend on. A smart home with 50 or more wireless devices requires
          enterprise-grade Wi-Fi coverage, properly configured{' '}
          <SEOInternalLink href="/training/data-cabling">structured cabling</SEOInternalLink> to
          connect access points and switches, and a network architecture that separates IoT devices
          from the homeowner's personal devices for security.
        </p>
        <p>
          The Matter protocol, backed by Apple, Google, Amazon, and Samsung, is rapidly becoming the
          standard for consumer smart home devices. Matter runs over Wi-Fi and Thread, providing
          local control without cloud dependency and cross-platform compatibility. Electricians
          should understand Matter device setup and Thread border router placement as part of their
          smart home service offering.
        </p>
      </>
    ),
  },
  {
    id: 'lighting-control',
    heading: 'Lighting Control Systems',
    content: (
      <>
        <p>
          Lighting control is typically the first smart home service an electrician offers and often
          the most requested by clients. From simple wireless dimming to sophisticated DALI
          addressable systems with circadian tuning, lighting control spans a wide range of
          complexity and budget.
        </p>
        <p>
          DALI (Digital Addressable Lighting Interface) is the professional standard for addressable
          lighting control. Each luminaire or driver on the DALI bus has a unique address, allowing
          individual control from a central controller or building management system. DALI-2 and the
          wireless D4i extension are increasingly common in commercial projects and high-end
          residential installations.
        </p>
        <p>
          For residential projects, wireless dimming systems from manufacturers such as Lutron,
          Rako, and Philips Hue provide excellent results without dedicated control wiring. Key
          considerations include dimmer compatibility with LED drivers (trailing edge versus leading
          edge), minimum load requirements, and the quality of the wireless mesh network. Scene
          programming — combining lighting levels across multiple rooms into a single preset — is
          the feature clients value most.
        </p>
        <p>
          Circadian lighting, which automatically adjusts colour temperature throughout the day to
          support natural sleep-wake cycles, is a growing market. This requires tuneable white LED
          luminaires and a controller capable of scheduling colour temperature shifts from warm
          (2700K) in the evening to cool (5000K) during the day.
        </p>
      </>
    ),
  },
  {
    id: 'hvac-integration',
    heading: 'HVAC and Climate Control Integration',
    content: (
      <>
        <p>
          Integrating heating, ventilation, and air conditioning into a smart home system gives
          homeowners precise zone-by-zone temperature control and significant energy savings. For
          electricians, HVAC integration is a natural extension of existing skills — you are already
          wiring thermostats, zone valves, and boiler controls.
        </p>
        <p>
          Smart thermostats such as Nest, Hive, and Tado provide basic scheduling and remote control
          via smartphone apps. More advanced systems use{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">
            dedicated wiring
          </SEOInternalLink>{' '}
          to zone controllers that manage individual room temperatures based on occupancy sensors,
          window contact sensors, and weather forecast data. KNX-based climate control provides the
          highest level of integration, allowing heating, cooling, ventilation, and blinds to work
          together as a coordinated system.
        </p>
        <p>
          Heat pump integration is particularly relevant as the UK transitions away from gas
          boilers. Smart controls for heat pumps must account for the slower response time compared
          to gas systems, using weather compensation and predictive heating algorithms to maintain
          comfort while maximising efficiency.
        </p>
        <SEOAppBridge
          title="Study HVAC integration with interactive scenarios"
          description="Practice designing climate control systems for different building types. Configure zone controllers, set schedules, and troubleshoot common integration issues with Elec-Mate's interactive exercises."
          icon={Settings}
        />
      </>
    ),
  },
  {
    id: 'security-access',
    heading: 'Security and Access Control',
    content: (
      <>
        <p>
          Smart security systems combine IP cameras, video doorbells, smart locks, alarm panels, and
          motion sensors into a unified platform that homeowners can monitor and control from their
          smartphone. For electricians, this work involves both electrical installation (power
          supplies, containment, cable routing) and network configuration (IP addressing, PoE,
          remote access).
        </p>
        <p>
          IP camera systems require{' '}
          <SEOInternalLink href="/training/data-cabling">Cat 6 structured cabling</SEOInternalLink>{' '}
          from each camera location back to a PoE switch, typically located in a data cabinet or
          utility cupboard. Camera positioning must consider field of view, IR illumination range,
          weather exposure (IP66 rating for external cameras), and GDPR requirements — cameras must
          not overlook neighbouring properties or public rights of way without appropriate signage
          and justification.
        </p>
        <p>
          Smart lock installation requires careful attention to fire safety regulations. BS 7671 and
          Building Regulations require that final exit doors can be opened from inside without a key
          in an emergency. Smart locks on escape routes must have a manual override or fail-safe
          (unlock on power failure) configuration. Integration with the smart home system allows
          features such as automatic locking at night, temporary access codes for visitors, and
          activity logs.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/data-cabling',
    title: 'Data Cabling Course',
    description:
      'Cat 6 and fibre optic cabling skills essential for smart home network infrastructure.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description: 'EV charger integration is a key component of modern smart home installations.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description: 'The wiring regulations that apply to all smart home electrical installations.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/training/fire-alarm-systems',
    title: 'Fire Alarm Systems Course',
    description: 'Fire alarm integration is an essential part of smart building automation design.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/solar-pv-installation',
    title: 'Solar PV Installation Course',
    description: 'Solar PV and battery storage integration for smart energy management systems.',
    icon: Lightbulb,
    category: 'Training',
  },
  {
    href: '/training/electrical-science-fundamentals',
    title: 'Electrical Science Fundamentals',
    description:
      'The theory foundation that underpins all smart home power supply and circuit design.',
    icon: ShieldCheck,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Smart Home Automation Course — KNX & IoT Training',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT14H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartHomeAutomationCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Smart Home Training"
      badgeIcon={Home}
      heroTitle={
        <>
          Smart Home Automation Course: <span className="text-yellow-400">KNX & IoT Training</span>
        </>
      }
      heroSubtitle="Master smart home automation with comprehensive KNX protocol, IoT device integration, lighting control, HVAC systems, and security installation training. 9 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={14}
      courseDuration="14 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 2 electrical qualification or equivalent practical experience recommended"
      courseModules={9}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians looking to specialise in smart home installation, domestic installers expanding into automation, and apprentices interested in building automation technology"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to specialise in smart home automation?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 9 structured modules, interactive quizzes, video content, and an AI tutor for any KNX or IoT question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/smart-home-automation"
    />
  );
}
