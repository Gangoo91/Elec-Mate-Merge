import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HelpArticle {
  title: string;
  badge?: string;
  badgeColor?: string;
  estimatedTime?: string;
  tags: string[];
  content: string;
  steps?: string[];
  tips?: string[];
}

interface HelpCategory {
  category: string;
  items: HelpArticle[];
}

const helpArticles: HelpCategory[] = [
  {
    category: 'Getting Started',
    items: [
      {
        title: 'Setting Up Your Inspector Profile',
        badge: 'Start Here',
        badgeColor: 'bg-blue-500/15 text-blue-400',
        estimatedTime: '5-10 minutes',
        tags: ['profile', 'setup', 'beginner', 'essential'],
        content: 'Your inspector profile is required for professional certificates and legally compliant reports.',
        steps: [
          'Navigate to Settings or Profile section from the main menu',
          'Add personal details: full name, qualifications, certifications',
          'Upload professional photo (optional but recommended)',
          'Complete company details: business name, registration number, address',
          'Upload company logo for branded certificates',
          'Select qualifications (City & Guilds, NVQ, etc.)',
          'Enter registration scheme details (NICEIC, NAPIT, ELECSA, etc.)',
          'Add insurance information including policy number and expiry',
          'Create your digital signature (draw or generate from typed name)',
          'Review completion percentage — aim for 100%',
        ],
        tips: [
          'Profile data auto-populates in all certificates',
          'Digital signature can be drawn on touchscreen or generated from typed name',
          'Keep insurance details current — the system alerts before expiry',
        ],
      },
      {
        title: 'Creating Your Digital Signature',
        badge: 'Required',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        estimatedTime: '2-3 minutes',
        tags: ['signature', 'setup', 'essential'],
        content: 'Legal requirement for certificate validation.',
        steps: [
          'In Inspector Profile, scroll to "Digital Signature" section',
          'Choose between Draw (use finger/stylus) or Generate (type name, choose font)',
          'Preview signature before saving',
          'Click "Save Signature" to store in profile',
          'Multiple signatures can be saved for different purposes',
          'Set a default signature or choose per-certificate',
        ],
        tips: [
          'Draw method works best on tablets with stylus',
          'Generated signatures look professional and consistent',
          'Signature data stored securely offline using IndexedDB',
        ],
      },
      {
        title: 'Navigating the I&T Dashboard',
        badge: 'Overview',
        badgeColor: 'bg-elec-yellow/15 text-elec-yellow',
        tags: ['dashboard', 'navigation', 'overview'],
        content: 'The Inspection & Testing dashboard is your central hub for all certification work.',
        steps: [
          'KPI Strip at the top shows: In Progress, Part P Due, Expiring, and Completed counts',
          'Tap any KPI to jump to the relevant section',
          'New Certificate button opens the certificate type selector',
          'Certificates section has the core 3: EICR, EIC, and Minor Works',
          'Specialist Certificates section: Fire Alarm, Emergency Lighting, EV Charging, Solar PV, PAT Testing',
          'Your Work section shows recent certificates and designed circuits',
          'Compliance section monitors Part P notifications and certificate expiry',
          'Resources section links to I&T Hub, Circuit Designer, Customers, and My Reports',
        ],
      },
    ],
  },
  {
    category: 'Core Certificates',
    items: [
      {
        title: 'EICR — Electrical Installation Condition Report',
        badge: 'BS 7671',
        badgeColor: 'bg-blue-500/15 text-blue-400',
        estimatedTime: '30-90 minutes',
        tags: ['eicr', 'certificate', 'inspection', 'periodic'],
        content: 'The EICR is used for periodic inspection and testing of existing electrical installations.',
        steps: [
          'Select EICR from the Certificates section on the dashboard',
          'Fill in client details: name, address, contact information',
          'Complete supply characteristics: earthing arrangement, Ze, supply type',
          'Work through each section: Details, Supply, Observations, Schedule of Inspections, Schedule of Tests, Inspector',
          'Use AI Board Scanning to auto-detect circuits from photos',
          'Add observations with classifications (C1, C2, C3, or Satisfactory)',
          'Complete all test results in the Schedule of Tests',
          'Add inspector and reviewer signatures',
          'Generate PDF for client delivery',
        ],
        tips: [
          'Auto-save runs every 10 seconds — your work is always protected',
          'Cloud sync with 30-second debounce keeps everything backed up',
          'Use the Scribble to Table feature to parse handwritten notes into circuit data',
          'AI Photo Analysis validates your classification decisions with BS 7671 references',
        ],
      },
      {
        title: 'EIC — Electrical Installation Certificate',
        badge: 'BS 7671',
        badgeColor: 'bg-emerald-500/15 text-emerald-400',
        estimatedTime: '20-60 minutes',
        tags: ['eic', 'certificate', 'installation', 'new'],
        content: 'The EIC certifies that a new electrical installation complies with BS 7671.',
        steps: [
          'Select EIC from the Certificates section',
          'Complete client and installation details',
          'Enter design information: earthing system, protective devices',
          'Fill in supply characteristics and earthing arrangements',
          'Complete the schedule of inspections',
          'Enter all test results: continuity, insulation resistance, Zs, RCD',
          'Add observations and comments',
          'Sign off with designer, installer, and inspector signatures',
          'Generate PDF certificate',
        ],
        tips: [
          'Use Circuit Designer to pre-populate circuit schedules',
          'Designed circuits from the Circuit Designer can be imported directly',
          'N/A fields can be toggled globally or per-field',
          'Position presets simplify the Inspected By / Authorised By sections',
        ],
      },
      {
        title: 'Minor Works Certificate',
        badge: 'BS 7671',
        badgeColor: 'bg-orange-500/15 text-orange-400',
        estimatedTime: '10-20 minutes',
        tags: ['minor-works', 'certificate', 'additions', 'alterations'],
        content: 'For additions and alterations to an existing installation that do not require a full EIC.',
        steps: [
          'Select Minor Works from the Certificates section',
          'Complete Part 1: Description of minor works',
          'Fill in Part 2: Installation details and method of protection',
          'Enter Part 3: Circuit details (conductor sizes, protective devices)',
          'Complete Part 4: Test results',
          'Add Part 5: Declaration with signature',
          'Generate PDF certificate',
        ],
        tips: [
          'Common for socket additions, lighting changes, and consumer unit upgrades',
          'Quicker to complete than a full EIC',
          'Auto-save protects your work throughout',
        ],
      },
    ],
  },
  {
    category: 'Specialist Certificates',
    items: [
      {
        title: 'Fire Alarm Certificate',
        badge: 'BS 5839',
        badgeColor: 'bg-red-500/15 text-red-400',
        estimatedTime: '20-40 minutes',
        tags: ['fire-alarm', 'certificate', 'specialist', 'BS5839'],
        content: 'Certification for fire detection and alarm systems to BS 5839.',
        steps: [
          'Select Fire Alarm from Specialist Certificates',
          'Complete system details: category (L1-L5, M, P1-P2), zones, panel type',
          'Enter installation details: cable types, device positions, circuit information',
          'Fill in system design section: detection coverage, sounder coverage',
          'Complete the test schedule: detector tests, sounder levels, battery backup',
          'Add commissioning data and test results',
          'Complete declarations with installer and commissioner signatures',
          'Generate PDF certificate',
        ],
        tips: [
          'Panel autocomplete helps with common panel makes and models',
          'Pre-fill from previous certificates for the same site',
          'System categories (L1-L5, M, P1-P2) are explained in the form',
        ],
      },
      {
        title: 'Emergency Lighting Certificate',
        badge: 'BS 5266',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        estimatedTime: '15-30 minutes',
        tags: ['emergency-lighting', 'certificate', 'specialist', 'BS5266'],
        content: 'Certification for emergency lighting systems to BS 5266.',
        steps: [
          'Select Emergency Lighting from Specialist Certificates',
          'Enter system details: type (maintained/non-maintained/sustained), duration',
          'Complete luminaire schedule: location, type, rating, battery condition',
          'Fill in test results: functional test, duration test, photometric test',
          'Record battery condition and charge times',
          'Add test dates and next test due dates',
          'Complete declarations with tester signature',
          'Generate PDF certificate',
        ],
        tips: [
          'Monthly functional tests and annual duration tests are required by BS 5266',
          'Record all luminaire positions for consistent re-testing',
          'Status calculation uses tester signature + test date for completion',
        ],
      },
      {
        title: 'EV Charging Certificate',
        badge: 'IET CoP',
        badgeColor: 'bg-emerald-500/15 text-emerald-400',
        estimatedTime: '15-30 minutes',
        tags: ['ev-charging', 'certificate', 'specialist', 'electric-vehicle'],
        content: 'Certification for electric vehicle charging point installations per IET Code of Practice.',
        steps: [
          'Select EV Charging from Specialist Certificates',
          'Enter charge point details: make, model, type (Mode 2/3/4), rated current',
          'Complete supply details: supply type, available capacity, earthing arrangement',
          'Fill in installation details: cable type, route, protection',
          'Enter test results: continuity, insulation resistance, Zs, RCD',
          'Complete declarations with installer signature',
          'Generate PDF certificate',
        ],
        tips: [
          'PME earthing requires special consideration — the form guides you through this',
          'Record DNO notification details where applicable',
          'Test results section mirrors standard electrical test requirements',
        ],
      },
      {
        title: 'Solar PV Certificate',
        badge: 'MCS',
        badgeColor: 'bg-yellow-500/15 text-yellow-400',
        estimatedTime: '20-40 minutes',
        tags: ['solar-pv', 'certificate', 'specialist', 'photovoltaic', 'MCS'],
        content: 'Certification for photovoltaic system installations to MCS standards.',
        steps: [
          'Select Solar PV from Specialist Certificates',
          'Enter system design: panel type, quantity, orientation, tilt angle, kWp',
          'Complete inverter details: make, model, rating, type (string/micro/hybrid)',
          'Fill in grid connection details: G98/G99 notification, export limiting',
          'Enter test results: string Voc, Isc, insulation resistance, earth continuity',
          'Complete AC side test results: Zs, RCD, polarity',
          'Add commissioning data and performance readings',
          'Complete declarations and generate PDF',
        ],
        tips: [
          'Panel and inverter autocomplete helps with common makes and models',
          'Record string configurations for future maintenance reference',
          'Include photos of installation, labels, and meter readings',
        ],
      },
      {
        title: 'PAT Testing Certificate',
        badge: 'IET CoP',
        badgeColor: 'bg-cyan-500/15 text-cyan-400',
        estimatedTime: '10-30 minutes',
        tags: ['pat-testing', 'certificate', 'specialist', 'portable-appliance'],
        content: 'Portable appliance testing records per IET Code of Practice.',
        steps: [
          'Select PAT Testing from Specialist Certificates',
          'Enter site and client details',
          'Add appliances: description, location, class (I/II/III), visual inspection',
          'Record test results per appliance: earth continuity, insulation resistance, leakage',
          'Mark each appliance as Pass or Fail',
          'Add labels/asset numbers for tracking',
          'Complete declaration with tester signature',
          'Generate PDF certificate with full appliance schedule',
        ],
        tips: [
          'Class I appliances require earth continuity testing',
          'Class II appliances (double insulated) — earth test not applicable',
          'Risk-based approach determines re-test intervals',
          'Use AI Appliance Identification to auto-fill description, make, model, and class from a photo',
          'Use the barcode/serial scanner to capture asset numbers via camera OCR',
        ],
      },
    ],
  },
  {
    category: 'AI Features',
    items: [
      {
        title: 'AI Board Scanning',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '2-3 minutes',
        tags: ['AI', 'board', 'scanner', 'circuits', 'consumer-unit'],
        content: 'Automatically detect circuits from consumer unit photos using AI. Supports multi-photo capture and three-phase boards.',
        steps: [
          'Navigate to the Schedule of Tests in your EICR or EIC',
          'Tap "Scan Electrical Board"',
          'Take clear, well-lit photos of the consumer unit from multiple angles',
          'Ensure all MCB/RCBO labels are visible and in focus',
          'AI detects: MCB/RCBO types and ratings, circuit descriptions, manufacturer/model',
          'Real-time progress: uploading, detecting, reading, verifying, complete',
          'Review detected circuits in the AI Results Preview — edit any fields inline',
          'Confidence indicators shown per circuit (high/medium/low)',
          'Reverse circuit order if needed',
          'Confirm and import circuits into your schedule of tests',
        ],
        tips: [
          'Good lighting dramatically improves detection accuracy',
          'Supports three-phase board detection with Way/Phase numbering',
          'Re-scan option available if results are not satisfactory',
          'Board summary shows make, model, main switch, ways, and SPD status',
          'Combine with Scribble to Table for fastest data entry',
        ],
      },
      {
        title: 'AI Photo Analysis & Fault Detection',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '3-5 minutes per defect',
        tags: ['AI', 'photo', 'analysis', 'classification', 'fault'],
        content: 'Validates your decisions, suggests classifications, and provides BS 7671 references.',
        steps: [
          'Take a photo of any defect or installation concern',
          'Upload to an observation in your certificate',
          'Tap "Analyse with AI"',
          'AI provides: suggested classification (C1/C2/C3), safety concern explanation',
          'AI also provides: specific BS 7671 regulation references, recommended remedial actions',
          'Review suggestions — you maintain final decision authority',
          'Accept or modify before saving to your certificate',
        ],
        tips: [
          'AI is a decision-support tool, not a replacement for inspector judgement',
          'Take multiple angles for complex defects',
          'Excellent for training junior inspectors on classification rationale',
        ],
      },
      {
        title: 'Scribble to Table — Circuit Parser',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '2-4 minutes',
        tags: ['AI', 'scribble', 'parser', 'circuits', 'handwriting'],
        content: 'Convert handwritten notes or typed lists into structured circuit data using AI.',
        steps: [
          'Access "Scribble to Table" from the Schedule of Testing page',
          'Write or paste circuit details in any format',
          'Supported: "C1 Kitchen Lights 1.5mm 10A Type B" or "Circuit 2: Downstairs Sockets, 2.5mm, 32A"',
          'Tap "Parse Circuits" to analyse with AI',
          'AI extracts: circuit number, description, cable sizes, device type, rating',
          'Review and edit detected circuits in the preview table',
          'Tap "Add Circuits to Table" to import all at once',
        ],
        tips: [
          'Flexible format recognition — natural language fully supported',
          'Paste directly from spreadsheets, emails, or site notes',
          'Saves 5-10 minutes per certificate vs manual entry',
        ],
      },
      {
        title: 'AI Enhance Observation',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '1-2 minutes',
        tags: ['AI', 'observation', 'enhance', 'EICR', 'classification'],
        content: 'AI-powered enhancement of electrical defect observations in your EICR. Improves descriptions, suggests classifications, and references BS 7671 regulations.',
        steps: [
          'Write an observation in your EICR with a description, location, and classification code',
          'Tap "Enhance with AI" on the observation',
          'AI searches BS 7671 regulations relevant to your observation',
          'AI suggests: improved classification (C1/C2/C3/FI), enhanced description, client-friendly explanation',
          'AI provides: recommended remedial actions with specific regulation references',
          'Confidence scores shown for each suggestion',
          'Review and accept or modify before saving',
        ],
        tips: [
          'Three progress steps: searching regulations, analysing, complete',
          'Regulation references include section numbers for credibility',
          'Use for consistent, professional observation language across all your reports',
        ],
      },
      {
        title: 'AI Remedial Cost Estimator',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '2-3 minutes',
        tags: ['AI', 'estimator', 'cost', 'remedial', 'quote', 'EICR'],
        content: 'Automatically generate remedial work cost estimates from your EICR defect observations.',
        steps: [
          'Complete your EICR observations with classifications and descriptions',
          'Tap "AI Estimator" to generate a remedial cost breakdown',
          'AI analyses all defects and generates: scope of works summary, materials list with prices, labour breakdown',
          'Review the estimate — all quantities and prices are editable',
          'Costs broken down by category for clear presentation',
          'Use as a basis for quoting remedial work to the client',
        ],
        tips: [
          'Progress steps: authenticating, searching pricing data, generating estimate, complete',
          'Pricing data sourced from trade supplier databases',
          'Edit any line item before sending to the client',
        ],
      },
      {
        title: 'AI Photo Analysis & QA',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '1-2 minutes per photo',
        tags: ['AI', 'photo', 'analysis', 'QA', 'classification', 'inspection'],
        content: 'Per-photo AI quality assurance in the inspection photo gallery. Validates your classification decisions with confidence scoring.',
        steps: [
          'Upload photos to an observation in your EICR',
          'In the photo gallery, tap "Scan Photo" on any image',
          'Confirm in the dialog that you want AI analysis (inspector retains final authority)',
          'AI provides: classification agreement/disagreement with your decision',
          'Shows confidence percentage and relevant BS 7671 regulations',
          'Brief feedback summary with expandable full analysis view',
          'Results saved with the photo for reference',
        ],
        tips: [
          'AI acts as a second opinion — you maintain final authority',
          'Take multiple angles for complex defects to improve accuracy',
          'Excellent training tool for junior inspectors',
        ],
      },
      {
        title: 'Test Results Photo Capture (OCR)',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '2-3 minutes',
        tags: ['AI', 'OCR', 'test-results', 'photo', 'handwriting'],
        content: 'Capture photos of handwritten or printed test result sheets and extract data using AI OCR.',
        steps: [
          'In the Schedule of Tests, tap the test results photo capture option',
          'Take up to 3 photos of test result sheets',
          'Images are compressed and sent for AI parsing',
          'AI extracts: circuit information, test values, and readings',
          'Review extracted data in structured format',
          'Accept results to populate the schedule of tests',
        ],
        tips: [
          'Clear, well-lit photos produce the best OCR results',
          'Works with both handwritten and printed test sheets',
          'Combine with Board Scanner for complete automation',
        ],
      },
      {
        title: 'Serial Number / Barcode Scanner',
        badge: 'AI OCR',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '30 seconds',
        tags: ['AI', 'OCR', 'serial', 'barcode', 'scanner', 'fire-alarm', 'PAT'],
        content: 'Camera-based OCR scanning for serial numbers and barcodes. Used in Fire Alarm and PAT Testing certificates.',
        steps: [
          'In Fire Alarm: tap the scan button in Installation Details to scan panel serial numbers',
          'In PAT Testing: tap the barcode icon next to the Asset No. field',
          'Camera opens with a guide overlay — point at the serial number or barcode',
          'Toggle torch/flashlight for low-light conditions',
          'Switch between front and rear cameras if needed',
          'AI extracts the text using Gemini Flash OCR',
          'Confirm the extracted result or retake the photo',
          'Serial/asset number is auto-filled into the form',
        ],
        tips: [
          'Good focus on the label is critical — use torch in dark panels',
          'Works with printed labels, engraved serial numbers, and barcodes',
          'In PAT Testing, the scanned photo is also added to the appliance gallery',
        ],
      },
      {
        title: 'AI Appliance Identification (PAT)',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        estimatedTime: '30 seconds',
        tags: ['AI', 'PAT', 'appliance', 'identification', 'photo'],
        content: 'Take a photo of any portable appliance and AI auto-fills its details in PAT Testing.',
        steps: [
          'In a PAT Test Sheet, tap the AI identify button',
          'Take a photo of the appliance (rating plate or whole appliance)',
          'AI identifies: description, make, model, appliance class (I/II/III), and category',
          'Fields are auto-populated in the form',
          'Photo is added to the appliance gallery',
          'Review and edit any auto-filled values',
        ],
        tips: [
          'Capture the rating plate for best accuracy on make/model',
          'Works for common domestic and commercial appliances',
          'Dramatically speeds up large PAT testing jobs',
        ],
      },
    ],
  },
  {
    category: 'Testing Procedures',
    items: [
      {
        title: 'Understanding Classifications',
        badge: 'Critical',
        badgeColor: 'bg-red-500/15 text-red-400',
        tags: ['classification', 'C1', 'C2', 'C3', 'safety'],
        content: 'BS 7671 defines four classification codes for observations.',
        steps: [
          'C1 (Danger Present): Immediate risk to safety — requires urgent remedial action. Examples: exposed live parts, missing earth connections',
          'C2 (Potentially Dangerous): Not immediately dangerous but requires urgent improvement. Examples: inadequate bonding, loose connections',
          'C3 (Improvement Recommended): Does not meet current standards but not dangerous. Examples: lack of RCD protection, old wiring',
          'Satisfactory: Meets BS 7671 requirements and is in good condition',
          'N/A: Not applicable to this installation',
        ],
        tips: [
          'Always provide detailed observations for C1, C2, and C3',
          'Reference specific BS 7671 regulations in observations',
          'Use AI Photo Analysis to validate your classification decisions',
        ],
      },
      {
        title: 'Insulation Resistance Testing',
        badge: 'BS 7671 612.3',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        tags: ['testing', 'insulation', 'resistance'],
        content: 'Test insulation resistance to BS 7671 Section 612.3.',
        steps: [
          'Test voltage: 500V DC for LV installations (250V for SELV/PELV)',
          'Minimum acceptable: 1.0 MOhm',
          'Test between live conductors and earth',
          'Test between live conductors (line-to-neutral)',
          'Disconnect sensitive equipment before testing',
          'Record all readings on the schedule of test results',
        ],
        tips: [
          'Values below 2 MOhm warrant investigation',
          'Moisture can significantly reduce readings',
          'Ensure all switches and control devices are closed during test',
        ],
      },
      {
        title: 'Earth Fault Loop Impedance (Zs)',
        badge: 'BS 7671 612.6',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        tags: ['testing', 'Zs', 'impedance', 'earth'],
        content: 'Measure and verify Zs values for each circuit.',
        steps: [
          'Measure at the furthest point of each circuit',
          'Compare measured value against maximum Zs for protective device',
          'Apply correction factors for conductor temperature',
          'Zs = Ze + (R1 + R2) for verification',
          'System validates automatically against BS 7671 Table 41.3',
          'Use the Zs Calculator tool for instant compliance checking',
        ],
        tips: [
          'Test at socket outlets using plug-in tester',
          'High Zs values may require circuit investigation or device upgrade',
          'Zs Calculator provides temperature correction and safety margin analysis',
        ],
      },
      {
        title: 'RCD Testing Requirements',
        badge: 'BS 7671 612.13',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        tags: ['testing', 'RCD', 'safety'],
        content: 'Test RCDs to BS 7671 Regulation 612.13.',
        steps: [
          'Test at rated tripping current (I delta n): should trip between 140-280ms at 30mA',
          'Test at 5x rated current: should trip within 40ms',
          'Test at 50% of rated current: should NOT trip',
          'Test both positive and negative half cycles',
          'Record all trip times',
          'Check mechanical operation using test button',
        ],
        tips: [
          'RCDs must trip within specified times or be replaced',
          'Monthly mechanical test button checks are required',
          '30mA RCDs required for socket outlets up to 32A and bathrooms',
        ],
      },
      {
        title: 'Test Methods Explained',
        badge: 'BS 7671 612.3',
        badgeColor: 'bg-amber-500/15 text-amber-400',
        tags: ['testing', 'method', 'BS7671'],
        content: 'BS 7671 defines three test methods for earth fault loop impedance.',
        steps: [
          'Method 1: Tests whole installation with all switches closed. Quickest but limited information',
          'Method 2: Tests by sub-circuit with individual circuit breakers. More detailed per circuit',
          'Method 3: Tests by individual circuit with all others disconnected. Most accurate method',
          'Choose method based on installation size and report requirements',
          'Method 3 recommended for comprehensive EICRs',
        ],
      },
    ],
  },
  {
    category: 'Compliance & Part P',
    items: [
      {
        title: 'Part P Building Regulations',
        badge: 'Legal Requirement',
        badgeColor: 'bg-red-500/15 text-red-400',
        tags: ['part-p', 'building-regulations', 'notification', 'compliance'],
        content: 'Part P of the Building Regulations requires notification of certain electrical work to Building Control.',
        steps: [
          'Notifiable work includes: new circuits, consumer unit changes, work in bathrooms/kitchens (special locations)',
          'Non-notifiable work: like-for-like replacements, adding sockets to existing circuits (outside special locations)',
          'Submit notification within 30 days of completion',
          'Track notification status on the I&T dashboard — the KPI strip shows Part P Due count',
          'Overdue notifications are flagged in red',
          'Manage all notifications in the Part P Notifications section',
        ],
        tips: [
          'Part P applies to England and Wales — Scotland and NI have different requirements',
          'Competent person schemes (NICEIC, NAPIT, etc.) allow self-certification',
          'Keep records of all notifications for at least 6 years',
        ],
      },
      {
        title: 'Certificate Expiry Tracking',
        badge: 'Business Tool',
        badgeColor: 'bg-emerald-500/15 text-emerald-400',
        estimatedTime: '1-2 minutes setup',
        tags: ['expiry', 'reminder', 'business', 'certificate'],
        content: 'Never miss re-inspection opportunities. Track and manage certificate expiries.',
        steps: [
          'Access Certificate Expiry from the dashboard Compliance section or main menu',
          'Colour-coded timeline: Red (Expired), Orange (30-60 days), Yellow (60-90 days), Green (90+ days)',
          'Filter by customer, property, or certificate type',
          'Mark certificates as: Contacted, Booked, or Completed',
          'Dashboard KPI strip shows expiring count at a glance',
          'Tap the Expiring KPI to jump straight to the expiry list',
        ],
        tips: [
          'Dashboard Compliance section shows the compliance score card',
          'Batch update multiple certificates at once',
          'Use expiry tracking to generate recurring revenue from re-inspections',
        ],
      },
      {
        title: 'Compliance Score Card',
        badge: 'Dashboard Feature',
        badgeColor: 'bg-elec-yellow/15 text-elec-yellow',
        tags: ['compliance', 'score', 'dashboard'],
        content: 'The Compliance section on the I&T dashboard shows your overall compliance health.',
        steps: [
          'All Clear (green): No compliance issues — no overdue Part P, no expired certs',
          'Needs Attention (amber): Items due soon — pending Part P or certs expiring within 90 days',
          'Action Required (red): Overdue Part P notifications or expired certificates',
          'Issue chips show specific counts: Part P overdue, Part P pending, expired certs, expiring soon',
          'Part P Notifications and Expiring Certificates cards below show detailed lists',
        ],
      },
    ],
  },
  {
    category: 'Tools & Calculators',
    items: [
      {
        title: 'Zs Calculator',
        badge: 'BS 7671 Validated',
        badgeColor: 'bg-emerald-500/15 text-emerald-400',
        estimatedTime: '2-3 minutes',
        tags: ['calculator', 'Zs', 'compliance', 'tool'],
        content: 'Instant compliance checking with temperature correction and safety margin analysis.',
        steps: [
          'Input: Ze, R1, R2 (or combined R1+R2)',
          'Select device: MCB Type B/C/D, RCBO, Fuse (all BS 7671 ratings)',
          'Automatic calculations: total Zs, temperature-corrected values',
          'Maximum permitted Zs from BS 7671 Table 41.3',
          'Safety margin percentage calculation',
          'Compliance status: Pass/Fail with colour coding',
        ],
        tips: [
          'Save calculations for later reference',
          'Mobile-optimised for on-site use',
          'Temperature correction uses 70 degrees C copper standard',
        ],
      },
      {
        title: 'Cable Capacity Calculator',
        badge: 'Design Tool',
        badgeColor: 'bg-blue-500/15 text-blue-400',
        estimatedTime: '3-5 minutes',
        tags: ['calculator', 'cable', 'design', 'capacity'],
        content: 'Ensure cables are correctly sized for load and voltage drop compliance.',
        steps: [
          'Input circuit parameters: load current (A), circuit length (m)',
          'Select installation method from BS 7671 Table 4D5',
          'Enter ambient temperature and grouping factors',
          'Calculates: minimum cable size, current carrying capacity',
          'Voltage drop (V and %), BS 7671 compliance status',
          'Derating factors applied automatically',
        ],
        tips: [
          'Compare different cable sizes for cost optimisation',
          'Consider future load increases in design',
          'Check voltage drop especially for long cable runs',
        ],
      },
      {
        title: 'Circuit Designer',
        badge: 'AI-Powered',
        badgeColor: 'bg-violet-500/15 text-violet-400',
        tags: ['circuit', 'designer', 'AI', 'design'],
        content: 'AI-powered circuit design that generates schedules and imports into EIC certificates.',
        steps: [
          'Access Circuit Designer from the Resources section on the I&T dashboard',
          'Describe the installation requirements',
          'AI generates circuit schedules with protective devices, cable sizes, and ratings',
          'Review and edit the generated design',
          'Save the design — it appears in the Designed Circuits section on your dashboard',
          'Import directly into an EIC certificate when ready',
        ],
        tips: [
          'Pending designs can be imported into EIC forms at any time',
          'Completed designs are archived with their certificate link',
          'Delete or archive old designs from the dashboard',
        ],
      },
      {
        title: 'I&T Learning Hub',
        badge: 'Knowledge Base',
        badgeColor: 'bg-elec-yellow/15 text-elec-yellow',
        tags: ['learning', 'BS7671', 'training', 'reference'],
        content: 'On-demand training, regulation lookup, and testing procedures.',
        steps: [
          'Access from the Resources section on the I&T dashboard',
          'BS 7671 Regulations: searchable database with explanations',
          'Testing Procedures: continuity, insulation resistance, Zs, RCD, polarity',
          'Fault Finding: diagnostic flowcharts for common issues',
          'Interactive diagrams and visual guides to test methods',
        ],
        tips: [
          'Use AI Regulation Search for natural language queries',
          'Bookmark frequently-referenced regulations',
          'Available offline once loaded',
        ],
      },
    ],
  },
  {
    category: 'Customer Management',
    items: [
      {
        title: 'Customer Records',
        badge: 'Business Tool',
        badgeColor: 'bg-cyan-500/15 text-cyan-400',
        estimatedTime: '2-3 minutes per customer',
        tags: ['customer', 'crm', 'business'],
        content: 'Track clients, properties, and certificate history in one place.',
        steps: [
          'Access Customers from the Resources section on the I&T dashboard',
          'Add new customer: name, email, phone, address',
          'Add property details (multiple per customer)',
          'Link existing certificates or create new ones',
          'View customer history and previous reports',
          'Set up certificate expiry reminders per customer',
        ],
        tips: [
          'Customers auto-populate in certificate forms',
          'Search by name, address, or certificate number',
          'Track certificate status: Draft, In Progress, Completed',
        ],
      },
    ],
  },
  {
    category: 'Data & Storage',
    items: [
      {
        title: 'Auto-Save & Cloud Sync',
        badge: 'Built-In',
        badgeColor: 'bg-emerald-500/15 text-emerald-400',
        tags: ['auto-save', 'sync', 'cloud', 'backup'],
        content: 'Never lose work. Auto-save runs continuously with cloud backup.',
        steps: [
          'Local auto-save with 2-second debounce using localStorage',
          'Cloud sync with network-aware debounce to Supabase (30-second backup interval)',
          'Emergency save on page close (beforeunload)',
          'Draft recovery: unsaved drafts banner appears on dashboard if you have auto-drafts',
          'Tap the banner to see all drafts and choose one to continue',
          'Delete individual drafts or clear all from the drafts sheet',
        ],
        tips: [
          'The dashboard shows "X unsaved drafts" if you have auto-saved work',
          'Each certificate type has separate draft storage',
          'Drafts persist until manually deleted or certificate completed',
        ],
      },
      {
        title: 'Offline Mode',
        tags: ['offline', 'storage'],
        content: 'Work anywhere without internet. All data stored locally.',
        steps: [
          'All form data stored locally using localStorage and IndexedDB',
          'Create certificates, fill forms, add observations — all offline',
          'Data syncs to cloud when connection is restored',
          'Photos stored locally until upload completes',
        ],
        tips: [
          'Check sync status before closing the app on-site',
          'Large photos may take time to sync on slow connections',
        ],
      },
      {
        title: 'My Reports — Certificate Management',
        tags: ['reports', 'certificates', 'management'],
        content: 'View, filter, and manage all your certificates in one place.',
        steps: [
          'Access My Reports from the Resources section or the KPI strip',
          'Filter by certificate type, status, or date range',
          'Search by client name or address',
          'Open any certificate to continue editing',
          'View completion status and sync status',
          'Certificates show: type badge, status badge, client name, address, last updated time',
        ],
      },
    ],
  },
  {
    category: 'Regulations Reference',
    items: [
      {
        title: 'BS 7671 Structure Overview',
        badge: 'Reference',
        badgeColor: 'bg-purple-500/15 text-purple-400',
        tags: ['BS7671', 'regulations', 'reference'],
        content: 'Quick reference to BS 7671 (IET Wiring Regulations) structure.',
        steps: [
          'Part 1: Scope, Object and Fundamental Principles',
          'Part 2: Definitions',
          'Part 3: Assessment of General Characteristics',
          'Part 4: Protection for Safety (earthing, bonding, fault protection)',
          'Part 5: Selection and Erection of Equipment',
          'Part 6: Inspection and Testing — your primary reference for EICRs',
          'Part 7: Special Installations or Locations (bathrooms, swimming pools, etc.)',
        ],
      },
      {
        title: 'Common Regulation References',
        badge: 'Quick Ref',
        badgeColor: 'bg-purple-500/15 text-purple-400',
        tags: ['regulations', 'reference', 'quick'],
        content: 'Frequently used BS 7671 regulations.',
        steps: [
          '411.3.3: RCD protection for socket outlets rated up to 32A',
          '415.2: Supplementary equipotential bonding requirements',
          '531.2: RCD selection and ratings',
          '543.1: Protective conductor sizes',
          '612.3: Insulation resistance test requirements',
          '612.6: Earth fault loop impedance requirements',
          '612.13: RCD testing requirements',
          '701: Bathrooms and shower rooms special requirements',
        ],
      },
    ],
  },
];

const quickReference = [
  { title: 'RCD Trip Times (30mA)', value: '140-280ms at 1x, <40ms at 5x' },
  { title: 'Min. Insulation Resistance', value: '1.0 MOhm at 500V DC' },
  { title: 'Earth Electrode (TT)', value: 'RA x Ia <= 50V (typically <=200 Ohm)' },
  { title: 'Main Bonding Conductor', value: 'Min. 6mm sq (10mm sq for PME)' },
  { title: 'Test Voltages', value: '500V for LV, 250V for SELV/PELV' },
  { title: 'Max Zs Safety Margin', value: '20% or more recommended' },
  { title: 'Auto-save Interval', value: 'Every 10 seconds (localStorage)' },
  { title: 'Cloud Sync', value: '30-second debounce to Supabase' },
  { title: 'Certificate Expiry Warning', value: '90 days before expiration' },
  { title: 'Part P Notification Deadline', value: '30 days after completion' },
];

interface HelpPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const HelpPanel = ({ open, onOpenChange }: HelpPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const toggleArticle = (key: string) => {
    setExpandedArticles((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filteredArticles = helpArticles
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.steps?.some((step) => step.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    }))
    .filter((category) =>
      selectedCategory ? category.category === selectedCategory : category.items.length > 0
    );

  const resultCount = filteredArticles.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          {/* Compact sticky header — title + search only */}
          <div className="flex-shrink-0 border-b border-white/[0.06] px-4 pt-3 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="h-11 w-11 rounded-xl flex items-center justify-center text-white hover:bg-white/10 touch-manipulation active:scale-[0.98] transition-all -ml-1"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-base font-semibold text-white flex-1">Help & Documentation</h2>
            </div>

            {/* Search */}
            <div className="relative mt-2">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              )}
              <Input
                placeholder="Search help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white',
                  'focus:border-elec-yellow focus:ring-elec-yellow',
                  !searchQuery && 'pl-10'
                )}
              />
            </div>

            {/* Search results count */}
            {searchQuery && (
              <p className="text-xs text-white mt-2">
                {resultCount} result{resultCount !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Scrollable content — category filters scroll with content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Category filter pills — inside scroll area */}
            {!searchQuery && (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'h-9 px-3 text-xs font-medium rounded-lg touch-manipulation transition-all whitespace-nowrap flex-shrink-0',
                    selectedCategory === null
                      ? 'bg-elec-yellow/12 text-elec-yellow border border-elec-yellow/20'
                      : 'bg-white/[0.06] text-white border border-white/[0.08]'
                  )}
                >
                  All
                </button>
                {helpArticles.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={cn(
                      'h-9 px-3 text-xs font-medium rounded-lg touch-manipulation transition-all whitespace-nowrap flex-shrink-0',
                      selectedCategory === cat.category
                        ? 'bg-elec-yellow/12 text-elec-yellow border border-elec-yellow/20'
                        : 'bg-white/[0.06] text-white border border-white/[0.08]'
                    )}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((category) => (
                <div key={category.category} className="space-y-3">
                  {/* Category header */}
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                      {category.category}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-white">
                      {category.items.length}
                    </span>
                  </div>

                  {/* Articles */}
                  <div className="space-y-2">
                    {category.items.map((item, idx) => {
                      const key = `${category.category}-${idx}`;
                      const isExpanded = expandedArticles.has(key) || !!searchQuery;

                      return (
                        <div
                          key={key}
                          className="rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-hidden"
                        >
                          {/* Article header — tappable */}
                          <button
                            onClick={() => toggleArticle(key)}
                            className="w-full flex items-center gap-3 p-4 text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="text-sm font-semibold text-white">
                                  {item.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                {item.badge && (
                                  <span
                                    className={cn(
                                      'text-[10px] font-bold px-2 py-0.5 rounded',
                                      item.badgeColor || 'bg-white/[0.06] text-white'
                                    )}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {item.estimatedTime && (
                                  <span className="text-[10px] text-white">
                                    {item.estimatedTime}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-white flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
                            )}
                          </button>

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-3">
                              <p className="text-sm text-white leading-relaxed">
                                {item.content}
                              </p>

                              {item.steps && item.steps.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-[11px] font-medium text-elec-yellow uppercase tracking-wider">
                                    Steps
                                  </p>
                                  <ol className="space-y-1.5">
                                    {item.steps.map((step, stepIdx) => (
                                      <li key={stepIdx} className="flex gap-3 text-sm text-white leading-relaxed">
                                        <span className="text-[11px] font-bold text-elec-yellow flex-shrink-0 w-5 mt-0.5">
                                          {stepIdx + 1}.
                                        </span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {item.tips && item.tips.length > 0 && (
                                <div className="space-y-2 mt-2">
                                  <p className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">
                                    Tips
                                  </p>
                                  <ul className="space-y-1.5">
                                    {item.tips.map((tip, tipIdx) => (
                                      <li key={tipIdx} className="flex gap-2 text-sm text-white leading-relaxed">
                                        <span className="text-amber-400 flex-shrink-0">-</span>
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <p className="text-sm font-medium text-white">No results for "{searchQuery}"</p>
                <p className="text-xs text-white">Try a different search term</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="h-11 px-4 text-sm font-medium text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl touch-manipulation active:scale-[0.98] transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Quick Reference */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Quick Reference Values
                </h3>
              </div>
              <div className="rounded-2xl bg-emerald-500/8 border border-emerald-500/20 p-4">
                <p className="text-xs text-white mb-3">
                  Common BS 7671 test limits and requirements
                </p>
                <div className="space-y-2">
                  {quickReference.map((ref, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 py-2 border-b border-white/[0.04] last:border-0 last:pb-0"
                    >
                      <span className="text-xs text-white flex-shrink-0">{ref.title}</span>
                      <span className="text-xs font-semibold text-emerald-400 text-right">
                        {ref.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
              <p className="text-xs text-white leading-relaxed">
                All tools and features are designed to comply with BS 7671:2018+A2:2022 requirements. For complex scenarios, use the AI Regulation Search or consult the full regulations.
              </p>
            </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpPanel;
