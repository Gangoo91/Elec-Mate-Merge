import { CPDActivityTemplate, CPDCategory, ActivityType, EvidenceType } from '@/types/cpd-enhanced';

export const CPD_ACTIVITY_TEMPLATES: CPDActivityTemplate[] = [
  // Regulations & Standards
  {
    id: 'bs7671-update',
    title: 'BS 7671 18th Edition Update Training',
    category: 'regulations-standards',
    type: 'formal-training',
    estimatedHours: 8,
    description: 'Comprehensive training on the latest BS 7671 wiring regulations including amendments and updates.',
    provider: 'IET/NICEIC/ECA',
    learningOutcomes: [
      'Understanding of new EV charging requirements',
      'Energy storage system regulations',
      'Updated inspection and testing procedures',
      'Arc fault detection devices (AFDDs)'
    ],
    evidenceRequired: ['certificate', 'attendance-record'],
    isPopular: true
  },
  {
    id: 'building-regs-part-p',
    title: 'Building Regulations Part P Workshop',
    category: 'regulations-standards',
    type: 'formal-training',
    estimatedHours: 4,
    description: 'Understanding Building Regulations Part P requirements for electrical work in domestic properties.',
    learningOutcomes: [
      'Notifiable vs non-notifiable work',
      'Competent person scheme requirements',
      'Certification procedures'
    ],
    evidenceRequired: ['certificate', 'assessment-results'],
    isPopular: true
  },

  // Technical Skills
  {
    id: 'solar-pv-installation',
    title: 'Solar PV Installation and Commissioning',
    category: 'technical-skills',
    type: 'formal-training',
    estimatedHours: 16,
    description: 'Complete training on solar photovoltaic system design, installation, and commissioning.',
    learningOutcomes: [
      'PV system design principles',
      'Installation techniques and safety',
      'Commissioning and testing procedures',
      'Grid connection requirements'
    ],
    evidenceRequired: ['certificate', 'site-photo', 'assessment-results'],
    isPopular: true
  },
  {
    id: 'ev-charging-installation',
    title: 'Electric Vehicle Charging Point Installation',
    category: 'technical-skills',
    type: 'formal-training',
    estimatedHours: 8,
    description: 'Training on EV charging point installation, including domestic and commercial applications.',
    learningOutcomes: [
      'EV charging standards and regulations',
      'Installation requirements',
      'Load balancing and smart charging',
      'Testing and commissioning'
    ],
    evidenceRequired: ['certificate', 'site-photo'],
    isPopular: true
  },
  {
    id: 'fault-finding-techniques',
    title: 'Advanced Fault Finding Techniques',
    category: 'technical-skills',
    type: 'work-based-learning',
    estimatedHours: 4,
    description: 'Practical application of advanced fault finding methods on live electrical systems.',
    learningOutcomes: [
      'Systematic fault finding approach',
      'Use of advanced test equipment',
      'Safety considerations during testing',
      'Documentation of findings'
    ],
    evidenceRequired: ['reflection-notes', 'site-photo', 'technical-document'],
    isPopular: false
  },

  // Safety & Health
  {
    id: 'working-at-height',
    title: 'Working at Height Safety Training',
    category: 'safety-health',
    type: 'formal-training',
    estimatedHours: 6,
    description: 'Essential training on working safely at height including ladder safety and fall protection.',
    learningOutcomes: [
      'Risk assessment for working at height',
      'Proper use of access equipment',
      'Fall protection systems',
      'Emergency procedures'
    ],
    evidenceRequired: ['certificate', 'attendance-record'],
    isPopular: true
  },
  {
    id: 'electrical-safety-training',
    title: 'Electrical Safety Awareness',
    category: 'safety-health',
    type: 'formal-training',
    estimatedHours: 4,
    description: 'Comprehensive electrical safety training covering hazards, PPE, and safe working practices.',
    learningOutcomes: [
      'Electrical hazard identification',
      'Proper PPE selection and use',
      'Lock out/tag out procedures',
      'Emergency response'
    ],
    evidenceRequired: ['certificate', 'assessment-results'],
    isPopular: true
  },
  {
    id: 'toolbox-talk-delivery',
    title: 'Site Safety Toolbox Talk',
    category: 'safety-health',
    type: 'professional-activities',
    estimatedHours: 1,
    description: 'Delivery of safety briefing to site team on specific electrical hazards.',
    learningOutcomes: [
      'Communication of safety procedures',
      'Team engagement on safety topics',
      'Risk awareness raising'
    ],
    evidenceRequired: ['toolbox-talk', 'reflection-notes'],
    isPopular: false
  },

  // Business & Commercial
  {
    id: 'customer-service-skills',
    title: 'Customer Service Excellence',
    category: 'business-commercial',
    type: 'formal-training',
    estimatedHours: 4,
    description: 'Developing excellent customer service skills for electrical contractors.',
    learningOutcomes: [
      'Effective communication techniques',
      'Managing customer expectations',
      'Complaint resolution',
      'Building customer relationships'
    ],
    evidenceRequired: ['certificate', 'reflection-notes'],
    isPopular: false
  },
  {
    id: 'business-development',
    title: 'Small Business Development',
    category: 'business-commercial',
    type: 'self-directed-study',
    estimatedHours: 8,
    description: 'Self-study course on developing and growing an electrical contracting business.',
    learningOutcomes: [
      'Business planning and strategy',
      'Marketing and customer acquisition',
      'Financial management',
      'Legal requirements'
    ],
    evidenceRequired: ['reflection-notes', 'technical-document'],
    isPopular: false
  },

  // Professional Ethics
  {
    id: 'professional-conduct',
    title: 'Professional Conduct and Ethics',
    category: 'professional-ethics',
    type: 'self-directed-study',
    estimatedHours: 2,
    description: 'Understanding professional responsibilities and ethical conduct in electrical work.',
    learningOutcomes: [
      'Professional codes of conduct',
      'Ethical decision making',
      'Conflict of interest management',
      'Professional integrity'
    ],
    evidenceRequired: ['reflection-notes'],
    isPopular: false
  },

  // Environmental & Sustainability
  {
    id: 'energy-efficiency',
    title: 'Energy Efficiency in Electrical Systems',
    category: 'environmental-sustainability',
    type: 'formal-training',
    estimatedHours: 6,
    description: 'Training on energy efficient electrical systems and sustainable practices.',
    learningOutcomes: [
      'Energy efficiency principles',
      'LED lighting systems',
      'Power factor correction',
      'Environmental impact assessment'
    ],
    evidenceRequired: ['certificate', 'technical-document'],
    isPopular: false
  },

  // Digital Technology
  {
    id: 'smart-home-technology',
    title: 'Smart Home Installation and Setup',
    category: 'digital-technology',
    type: 'formal-training',
    estimatedHours: 8,
    description: 'Installation and configuration of smart home electrical systems.',
    learningOutcomes: [
      'Smart switch and socket installation',
      'Home automation systems',
      'Network configuration',
      'Troubleshooting connectivity issues'
    ],
    evidenceRequired: ['certificate', 'site-photo'],
    isPopular: true
  },
  {
    id: 'digital-testing-equipment',
    title: 'Digital Testing Equipment Training',
    category: 'digital-technology',
    type: 'work-based-learning',
    estimatedHours: 3,
    description: 'Hands-on training with the latest digital electrical testing equipment.',
    learningOutcomes: [
      'Advanced multimeter functions',
      'Digital insulation testers',
      'Power quality analyzers',
      'Data logging and analysis'
    ],
    evidenceRequired: ['reflection-notes', 'site-photo'],
    isPopular: false
  }
];

export const QUICK_ACTIVITY_TEMPLATES = [
  {
    id: 'technical-reading',
    title: 'Technical Publication Reading',
    category: 'self-directed-study' as ActivityType,
    estimatedHours: 1,
    description: 'Reading industry publications, technical journals, or standards documents'
  },
  {
    id: 'online-webinar',
    title: 'Industry Webinar Attendance',
    category: 'conferences-seminars' as ActivityType,
    estimatedHours: 1,
    description: 'Attending online webinars or virtual conferences'
  },
  {
    id: 'peer-discussion',
    title: 'Peer Learning Discussion',
    category: 'professional-activities' as ActivityType,
    estimatedHours: 0.5,
    description: 'Technical discussions with colleagues or peers'
  },
  {
    id: 'manufacturer-training',
    title: 'Manufacturer Product Training',
    category: 'formal-training' as ActivityType,
    estimatedHours: 2,
    description: 'Training sessions provided by equipment manufacturers'
  },
  {
    id: 'site-observation',
    title: 'Site Learning Observation',
    category: 'work-based-learning' as ActivityType,
    estimatedHours: 2,
    description: 'Learning through observation of new techniques or installations'
  }
];

export const POPULAR_PROVIDERS = [
  'NICEIC',
  'ECA (Electrical Contractors Association)',
  'IET (Institution of Engineering and Technology)',
  'SELECT (Scotland)',
  'NAPIT',
  'STROMA',
  'City & Guilds',
  'EAL (Excellence, Achievement & Learning)',
  'Company Internal Training',
  'Manufacturer Training',
  'Online Learning Platform',
  'Professional Conference',
  'Industry Association'
];