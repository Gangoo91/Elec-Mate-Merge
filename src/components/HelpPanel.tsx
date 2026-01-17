import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Search, Book, ExternalLink, Rocket, Shield, Zap, FileCheck, BookOpen, Lightbulb, AlertTriangle, CheckCircle2, Clock, ListChecks, User, Briefcase, Calendar, Camera, Database, Save, Cable, PenTool, Brain, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const helpArticles = [
  {
    category: 'Getting Started',
    icon: Rocket,
    color: 'from-blue-500/10 to-cyan-500/5',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    items: [
      {
        title: 'Setting Up Your Inspector Profile',
        icon: User,
        badge: 'Essential - Start Here',
        estimatedTime: '5-10 minutes',
        tags: ['profile', 'setup', 'beginner', 'essential'],
        content: 'Your inspector profile is required for professional certificates and legally compliant reports:',
        steps: [
          'Navigate to Settings (gear icon, top right) or Profile section',
          'Add personal details: Full name, qualifications, certifications',
          'Upload professional photo (optional but recommended for credibility)',
          'Complete company details: Business name, registration number, address',
          'Upload company logo for branded certificates',
          'Select your qualifications from checkboxes (City & Guilds, NVQ, etc.)',
          'Enter registration scheme details (NICEIC, NAPIT, ELECSA, etc.)',
          'Add insurance information including policy number and expiry',
          'Create your digital signature (draw or generate)',
          'Review completion percentage - aim for 100%'
        ],
        tips: [
          'Profile data auto-populates in all certificates',
          'Digital signature can be drawn on touchscreen or generated from typed name',
          'Keep insurance details current - system alerts before expiry',
          'Multiple signature profiles supported for different scenarios'
        ]
      },
      {
        title: 'Creating Your Digital Signature',
        icon: PenTool,
        badge: 'Required',
        estimatedTime: '2-3 minutes',
        tags: ['signature', 'setup', 'essential'],
        content: 'Legal requirement for certificate validation:',
        steps: [
          'In Inspector Profile, scroll to "Digital Signature" section',
          'Choose between two methods: Draw (use finger/stylus) or Generate (type name, choose font)',
          'Preview signature before saving',
          'Click "Save Signature" to store in profile',
          'Multiple signatures can be saved for different purposes',
          'Set a default signature or choose per-certificate'
        ],
        tips: [
          'Draw method works best on tablets with stylus',
          'Generated signatures look professional and consistent',
          'Can edit/replace signature anytime without affecting old certificates',
          'Signature data stored securely offline using IndexedDB'
        ]
      },
      {
        title: 'Creating Your First EICR',
        icon: FileCheck,
        badge: 'Essential',
        estimatedTime: '5-10 minutes',
        tags: ['eicr', 'certificate', 'beginner'],
        content: 'Start your electrical installation condition report efficiently:',
        steps: [
          'Navigate to EICR from the home screen',
          'Fill in client details including property address and contact information',
          'Complete supply characteristics (earthing arrangement, Ze, supply type)',
          'Work through each tab sequentially: Details → Schedule → Testing → Inspector',
          'Save regularly using Ctrl+S or the Save button',
          'The system auto-saves every 30 seconds to prevent data loss'
        ],
        tips: [
          'Complete required fields marked with * before moving to the next tab',
          'Use Tab key to navigate quickly between fields',
          'The system validates entries against BS 7671 requirements automatically'
        ]
      },
      {
        title: 'Using AI Board Scanning',
        icon: Brain,
        badge: 'AI-Powered',
        estimatedTime: '2-3 minutes',
        tags: ['AI', 'photo', 'scanner', 'time-saver'],
        content: 'Automatically detect circuits using AI-powered board scanning:',
        steps: [
          'Navigate to the Testing tab',
          'Click "Scan Electrical Board" button',
          'Take clear, well-lit photos of the consumer unit from multiple angles',
          'Ensure all MCB/RCBO labels are visible and in focus',
          'AI detects: MCB/RCBO types and ratings (6A-63A), circuit descriptions, manufacturer/model',
          'AI can detect busbar arrangement, connections, and missing/damaged devices',
          'Review detected circuits and make any necessary corrections',
          'Confirm and import circuits into your EICR'
        ],
        tips: [
          'Take photos in good lighting for best results',
          'Capture close-ups of any unclear labels',
          'Double-check detected ratings match physical installation',
          'Supports both new and older consumer unit layouts',
          'Confidence scores shown for each detection - manual override always available',
          'Combine with Scribble to Table for fastest data entry workflow'
        ]
      }
    ]
  },
  {
    category: 'AI Features',
    icon: Brain,
    color: 'from-violet-500/10 to-purple-500/5',
    borderColor: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    items: [
      {
        title: 'AI Photo Analysis & Fault Detection',
        icon: Camera,
        badge: 'AI-Powered',
        estimatedTime: '3-5 minutes per defect',
        tags: ['AI', 'photo', 'analysis', 'classification', 'fault', 'defect'],
        content: 'Validates inspector decisions, suggests classifications, provides BS7671 references automatically:',
        steps: [
          'Take photo of any defect, fault, or installation concern on site',
          'Upload photo to an observation in your EICR/EIC form',
          'Click "Analyse with AI" button on the uploaded photo',
          'AI provides: Suggested classification (C1/C2/C3), detailed safety concern explanation',
          'AI also provides: Specific BS7671 regulation references, recommended remedial actions',
          'AI gives: Photo quality feedback (lighting, focus, angle)',
          'Review AI suggestions carefully - you maintain final decision authority',
          'Accept or modify suggestions before saving to your certificate',
          'AI explanation can be included in observation notes for client clarity'
        ],
        tips: [
          'AI is a decision-support tool, not a replacement for inspector judgement and experience',
          'Take multiple angles for complex defects to improve analysis accuracy',
          'Good lighting dramatically improves AI detection accuracy',
          'AI learns common installation types and improves over time',
          'Excellent for training junior inspectors on classification rationale and reasoning',
          'Works offline once photos are captured - analysis queued until online',
          'Confidence scores indicate AI certainty - lower scores warrant manual review'
        ]
      },
      {
        title: 'Scribble to Table - Text Circuit Parser',
        icon: PenTool,
        badge: 'AI Time-Saver',
        estimatedTime: '2-4 minutes',
        tags: ['AI', 'scribble', 'text', 'parser', 'time-saver', 'handwriting', 'circuits'],
        content: 'Convert handwritten notes or typed circuit lists into structured test data instantly using AI parsing:',
        steps: [
          'Access "Scribble to Table" from Schedule of Testing page (mobile: menu button, desktop: toolbar)',
          'Write or paste circuit details in natural language or structured format',
          'Supported formats: "C1 Kitchen Lights 1.5mm 10A Type B", "Circuit 2: Downstairs Sockets, 2.5mm², 32A, Type B MCB", or "C3 - Cooker - 6.0/2.5 - 40A - RCBO"',
          'Click "Parse Circuits" button to analyse your text with AI',
          'AI automatically extracts: Circuit number, description, cable sizes (live/CPC), device type, and rating',
          'Review detected circuits in the preview table',
          'Edit any incorrect detections before importing (click cells to edit)',
          'Click "Add X Circuits to Table" to import all circuits at once'
        ],
        tips: [
          'Works with handwritten notes - take photo and paste OCR text',
          'Flexible format recognition - natural language fully supported',
          'Can handle mixed formats in the same input block',
          'Paste directly from spreadsheets, emails, or site notes',
          'Saves 5-10 minutes per certificate vs manual entry',
          'Confidence indicator shows parsing accuracy per field',
          'Perfect for converting existing paper records to digital format',
          'Combine with AI Board Scanner for complete automation workflow'
        ]
      }
    ]
  },
  {
    category: 'Customer Management',
    icon: Users,
    color: 'from-cyan-500/10 to-blue-500/5',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    items: [
      {
        title: 'Customer Management System',
        icon: Briefcase,
        badge: 'Business Tool',
        estimatedTime: '2-3 minutes per customer',
        tags: ['customer', 'crm', 'business'],
        content: 'Track clients, properties, and certificate history in one place:',
        steps: [
          'Navigate to "Customers" from main menu',
          'Click "Add New Customer"',
          'Enter customer details: Name, email, phone, address',
          'Add property details (can be multiple per customer)',
          'Link existing certificates or create new ones',
          'Set up certificate expiry reminders',
          'View customer history and previous reports',
          'Export customer data for invoicing/CRM'
        ],
        tips: [
          'Customers auto-populate in certificate forms',
          'Search by name, address, or certificate number',
          'Track certificate status: Draft, Issued, Expired',
          'Bulk operations supported for reminders'
        ]
      },
      {
        title: 'Certificate Expiry Tracking',
        icon: Calendar,
        badge: 'Recurring Revenue',
        estimatedTime: '1-2 minutes setup',
        tags: ['expiry', 'reminder', 'business', 'certificate'],
        content: 'Never miss re-inspection opportunities, automate follow-ups:',
        steps: [
          'Access "Certificate Expiry" from dashboard or menu',
          'View colour-coded timeline: Red (Expired), Orange (30-60 days), Yellow (60-90 days), Green (>90 days)',
          'Filter by customer, property, or certificate type',
          'Mark certificates as: Contacted, Booked, or Completed',
          'Export expiry lists for mail merge/email campaigns',
          'Set up automatic reminder notifications',
          'Link directly to new certificate creation from expiry list'
        ],
        tips: [
          'Batch update multiple certificates at once',
          'Track response rates to optimise follow-up timing',
          'Dashboard widget shows upcoming expirations'
        ]
      }
    ]
  },
  {
    category: 'Inspection Process',
    icon: Shield,
    color: 'from-green-500/10 to-emerald-500/5',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    items: [
      {
        title: 'Understanding Classifications',
        icon: AlertTriangle,
        badge: 'Critical',
        tags: ['classification', 'C1', 'C2', 'C3', 'safety'],
        content: 'BS 7671 defines four classification codes for observations:',
        steps: [
          'C1 (Danger Present): Immediate risk to safety, requires urgent remedial action. Examples: exposed live parts, missing earth connections',
          'C2 (Potentially Dangerous): Not immediately dangerous but requires urgent improvement. Examples: inadequate bonding, loose connections',
          'C3 (Improvement Recommended): Does not meet current standards but not dangerous. Examples: lack of RCD protection, old wiring',
          'Satisfactory: Meets BS 7671 requirements and is in good condition',
          'N/A: Not applicable to this installation'
        ],
        tips: [
          'Always provide detailed observations for C1, C2, and C3 classifications',
          'Reference specific BS 7671 regulations in observations',
          'Use AI Photo Analysis to validate your classification decisions'
        ]
      },
      {
        title: 'Schedule of Inspections',
        icon: ListChecks,
        badge: 'Essential',
        estimatedTime: '20-40 minutes',
        tags: ['inspection', 'schedule', 'checklist'],
        content: 'Complete the comprehensive inspection checklist:',
        steps: [
          'Work through each inspection item systematically',
          'Mark status as Satisfactory, C1, C2, C3, or N/A',
          'Add observations for any defects or non-compliances',
          'Include photographs where relevant',
          'Reference applicable BS 7671 regulations',
          'Use the search function to quickly find specific items'
        ],
        tips: [
          'Complete all sections - don\'t skip items',
          'Be thorough in observations - they must be clear and actionable',
          'Include location details for each observation'
        ]
      },
      {
        title: 'Adding Observations',
        icon: BookOpen,
        badge: 'Important',
        tags: ['observation', 'defect', 'documentation'],
        content: 'Document defects and non-compliances effectively:',
        steps: [
          'Click "Add Observation" when a defect is found',
          'Select appropriate classification (C1, C2, or C3)',
          'Write clear, concise description of the defect',
          'Include specific location (e.g., "Kitchen ring circuit, socket outlet near sink")',
          'Reference relevant BS 7671 regulation (e.g., "411.3.3 - RCD protection required")',
          'Add recommended remedial action',
          'Attach photos and use AI analysis for validation'
        ],
        tips: [
          'Be specific - avoid vague descriptions',
          'Use technical but understandable language',
          'Always include regulation references for credibility',
          'AI Photo Analysis can suggest classifications and provide regulation references'
        ]
      }
    ]
  },
  {
    category: 'Testing',
    icon: Zap,
    color: 'from-amber-500/10 to-yellow-500/5',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    items: [
      {
        title: 'Test Methods Explained',
        icon: BookOpen,
        badge: 'Essential',
        tags: ['testing', 'method', 'BS7671'],
        content: 'BS 7671 Regulation 612.3 defines three test methods:',
        steps: [
          'Method 1: Tests the whole installation with all main switches closed and all circuit breakers on. Quickest method but limited information.',
          'Method 2: Tests by sub-circuit with individual circuit breakers. Provides more detailed results per circuit.',
          'Method 3: Tests by individual circuit with all others disconnected. Most accurate and detailed method.',
          'Choose method based on installation size and report requirements',
          'Method 3 is recommended for comprehensive EICRs'
        ],
        tips: [
          'Record test method used in your report',
          'Method 3 provides best fault-finding capability',
          'Consider installation size when selecting method'
        ]
      },
      {
        title: 'Insulation Resistance Testing',
        icon: Zap,
        badge: 'Critical',
        tags: ['testing', 'insulation', 'resistance'],
        content: 'Test insulation resistance according to BS 7671 Section 612.3:',
        steps: [
          'Test voltage: 500V DC for LV installations (250V for SELV/PELV)',
          'Minimum acceptable values: 1.0MΩ for SELV/PELV, 1.0MΩ for up to 500V, 1.0MΩ for over 500V',
          'Test between live conductors and earth',
          'Test between live conductors (line-to-neutral)',
          'Disconnect sensitive equipment before testing',
          'Record all readings on the schedule of test results'
        ],
        tips: [
          'Values below 2MΩ warrant investigation',
          'Moisture can significantly reduce readings',
          'Ensure all switches and control devices are closed during test'
        ]
      },
      {
        title: 'Earth Fault Loop Impedance (Zs)',
        icon: Zap,
        badge: 'Critical',
        tags: ['testing', 'Zs', 'impedance', 'earth'],
        content: 'Measure and verify Zs values for each circuit:',
        steps: [
          'Measure at furthest point of each circuit',
          'Compare measured value against maximum Zs for protective device',
          'Apply correction factors for conductor temperature',
          'Zs = Ze + (R1 + R2) for verification',
          'System will automatically validate against BS 7671 Table 41.3',
          'Values exceeding limits indicate inadequate earth fault protection',
          'Use the Zs Calculator tool for instant compliance checking'
        ],
        tips: [
          'Test at socket outlets using plug-in tester',
          'Verify using measured Ze and R1+R2 values',
          'High Zs values may require circuit investigation or device upgrade',
          'Zs Calculator provides temperature correction and safety margin analysis'
        ]
      },
      {
        title: 'RCD Testing Requirements',
        icon: Shield,
        badge: 'Essential',
        tags: ['testing', 'RCD', 'safety'],
        content: 'Test RCDs according to BS 7671 Regulation 612.13:',
        steps: [
          'Test at rated tripping current (IΔn): Should trip between 140-280ms at 30mA',
          'Test at 5× rated current: Should trip within 40ms',
          'Test at 50% of rated current: Should NOT trip',
          'Test both positive and negative half cycles',
          'Record all trip times',
          'Check mechanical operation using test button'
        ],
        tips: [
          'RCDs must trip within specified times or be replaced',
          'Always test mechanical test button monthly',
          '30mA RCDs required for socket outlets and bathrooms'
        ]
      }
    ]
  },
  {
    category: 'Tools & Calculators',
    icon: Zap,
    color: 'from-orange-500/10 to-red-500/5',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    items: [
      {
        title: 'Zs Calculator - Professional Edition',
        icon: Zap,
        badge: 'BS7671 Validated',
        estimatedTime: '2-3 minutes',
        tags: ['calculator', 'Zs', 'compliance', 'tool'],
        content: 'Instant compliance checking, temperature correction, safety margin analysis:',
        steps: [
          'Input: Ze, R1, R2 (or combined R1+R2)',
          'Device Selection: MCB Type B/C/D, RCBO, Fuse (all BS7671 ratings)',
          'Automatic Calculations: Total Zs, temperature-corrected values (70°C copper)',
          'Maximum permitted Zs from BS7671 Table 41.3',
          'Safety margin percentage calculation',
          'Compliance Status: Pass/Fail with colour coding',
          'Regulation References: Direct links to BS7671 clauses',
          'Practical Guidance: Troubleshooting high Zs readings'
        ],
        tips: [
          'Save calculations for later reference',
          'Compare multiple circuits side-by-side',
          'Export results to PDF for client reports',
          'Mobile-optimised for on-site use',
          'Tabs: Calculator, Results, Guidance, Regulations, Settings'
        ]
      },
      {
        title: 'Cable Capacity Calculator',
        icon: Cable,
        badge: 'Design Tool',
        estimatedTime: '3-5 minutes',
        tags: ['calculator', 'cable', 'design', 'capacity'],
        content: 'Ensure cables are correctly sized for load and voltage drop compliance:',
        steps: [
          'Input circuit parameters: Load current (A), circuit length (m)',
          'Select installation method from BS7671 Table 4D5',
          'Enter ambient temperature and grouping factors',
          'Calculates: Minimum cable size (mm²), current carrying capacity',
          'Voltage drop (V and %), BS7671 compliance status',
          'Derating factors applied automatically',
          'Multiple installation methods supported'
        ],
        tips: [
          'Compare different cable sizes for cost optimisation',
          'Consider future load increases in design',
          'Check voltage drop especially for long runs',
          'Export sizing calculations for design documentation',
          'Tabs: Calculator, Analysis, Guide, Compliance, Examples'
        ]
      },
      {
        title: 'Learning Hub & BS7671 Reference',
        icon: BookOpen,
        badge: 'Knowledge Base',
        tags: ['learning', 'BS7671', 'training', 'reference'],
        content: 'On-demand training, regulation lookup, testing procedures:',
        steps: [
          'BS7671 Regulations: Searchable database with explanations',
          'Testing Procedures: Continuity, insulation resistance, Zs, RCD, polarity',
          'Fault Finding: Diagnostic flowcharts for common issues',
          'Quiz Mode: Test your knowledge, track progress',
          'Interactive Diagrams: Visual guides to test methods',
          'Access via main menu "Learning Hub" or tools section'
        ],
        tips: [
          'Bookmark frequently-referenced regulations',
          'Use AI Regulation Search for natural language queries',
          'Complete quizzes to earn CPD tracking (future feature)',
          'Download procedures for offline reference'
        ]
      }
    ]
  },
  {
    category: 'Advanced Features',
    icon: Database,
    color: 'from-slate-500/10 to-gray-500/5',
    borderColor: 'border-slate-500/30',
    iconColor: 'text-slate-400',
    items: [
      {
        title: 'Offline Mode & Data Sync',
        icon: Database,
        badge: 'Pro Feature',
        tags: ['offline', 'sync', 'storage', 'cloud'],
        content: 'Work anywhere without internet, automatic cloud backup:',
        steps: [
          'All data automatically stored locally using IndexedDB (50MB+ capacity)',
          'Create certificates, take photos, add observations - all offline',
          'Data syncs to cloud when connection restored',
          'Conflict resolution handles simultaneous edits',
          'Manual sync trigger available in settings',
          'What\'s stored offline: Form drafts, photos, profiles, signatures, customer database',
          'Also stored: Regulation reference library, calculator history'
        ],
        tips: [
          'Green cloud icon = synced, orange = pending, red = sync failed',
          'Large photos may take time to sync on slow connections',
          'Check sync status before closing app on-site',
          'Manual "Clear All Data" available in settings (use with caution)'
        ]
      },
      {
        title: 'Auto-Save & Data Recovery',
        icon: Save,
        badge: 'Safety Net',
        tags: ['auto-save', 'recovery', 'backup'],
        content: 'Never lose work due to crashes, low battery, or accidental closure:',
        steps: [
          'Auto-save every 30 seconds (configurable in settings)',
          'Draft recovery on app restart',
          'Version history shows previous saves',
          'Manual save: Ctrl+S (or Save button)',
          '"Unsaved changes" warning before navigation',
          'Settings: Enable/disable auto-save, change interval (15s, 30s, 60s, 120s)',
          'View storage usage and clear old drafts'
        ],
        tips: [
          'Yellow indicator shows unsaved changes',
          'Green checkmark confirms save completed',
          'Drafts persist until manually deleted or certificate completed',
          'Each certificate type has separate draft storage'
        ]
      }
    ]
  },
  {
    category: 'Regulations & Reference',
    icon: Book,
    color: 'from-purple-500/10 to-pink-500/5',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    items: [
      {
        title: 'BS 7671 Parts Overview',
        icon: BookOpen,
        badge: 'Reference',
        tags: ['BS7671', 'regulations', 'reference'],
        content: 'Quick reference to BS 7671 (IET Wiring Regulations) structure:',
        steps: [
          'Part 1: Scope, Object and Fundamental Principles',
          'Part 2: Definitions',
          'Part 3: Assessment of General Characteristics',
          'Part 4: Protection for Safety (earthing, bonding, fault protection)',
          'Part 5: Selection and Erection of Equipment',
          'Part 6: Inspection and Testing (your primary reference for EICRs)',
          'Part 7: Special Installations or Locations (bathrooms, swimming pools, etc.)'
        ]
      },
      {
        title: 'Common Regulation References',
        icon: FileCheck,
        badge: 'Quick Ref',
        tags: ['regulations', 'reference', 'quick'],
        content: 'Frequently used BS 7671 regulations:',
        steps: [
          '411.3.3: RCD protection for socket outlets rated up to 20A',
          '415.2: Supplementary equipotential bonding requirements',
          '531.2: RCD selection and ratings',
          '543.1: Protective conductor sizes',
          '612.3: Insulation resistance test requirements',
          '612.6: Earth fault loop impedance requirements',
          '701: Bathrooms and shower rooms special requirements'
        ]
      },
      {
        title: 'Using AI Regulation Search',
        icon: Search,
        badge: 'Tool',
        tags: ['AI', 'search', 'regulations', 'tool'],
        content: 'Find BS 7671 regulations quickly using AI:',
        steps: [
          'Access AI Regulation Search from the Tools menu',
          'Describe your query in plain English',
          'Example: "RCD requirements for bathroom"',
          'AI will find relevant regulations and explain them',
          'Copy regulation references into your observations',
          'Use for quick lookup during inspections'
        ]
      }
    ]
  }
];

const quickReference = [
  { title: 'RCD Trip Times (30mA)', value: '140-280ms at 1×IΔn, <40ms at 5×IΔn' },
  { title: 'Min. Insulation Resistance', value: '≥1.0MΩ at 500V DC' },
  { title: 'Earth Electrode (TT)', value: 'RA × Ia ≤ 50V (typically ≤200Ω)' },
  { title: 'Main Bonding Conductor', value: 'Min. 6mm² (10mm² for PME)' },
  { title: 'Test Voltages', value: '500V for LV, 250V for SELV/PELV' },
  { title: 'Minimum Profile Completion', value: '80% for valid certificates' },
  { title: 'Photo Storage (Offline)', value: 'Up to 50MB per certificate' },
  { title: 'Auto-save Interval', value: 'Every 30 seconds (configurable)' },
  { title: 'Certificate Expiry Warning', value: '90 days before expiration' },
  { title: 'Signature Pad Resolution', value: 'Vector format (SVG), scalable' },
  { title: 'Max Zs Safety Margin', value: '≥20% recommended for reliability' },
];

interface HelpPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const HelpPanel = ({ open, onOpenChange }: HelpPanelProps) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const filteredArticles = helpArticles.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.steps?.some(step => step.toLowerCase().includes(searchQuery.toLowerCase())) ?? false) ||
        ((item as any).tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)
    )
  })).filter(category => selectedCategory ? category.category === selectedCategory : category.items.length > 0);

  const resultCount = filteredArticles.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-gradient-to-b from-neutral-900 to-neutral-950">
        <SheetHeader className={cn("space-y-3", isMobile && "space-y-2")}>
          <SheetTitle className={cn("flex items-center gap-3", isMobile ? "text-lg gap-2" : "text-2xl")}>
            <div className={cn("rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center", isMobile ? "w-8 h-8" : "w-10 h-10")}>
              <Book className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", "text-blue-400")} />
            </div>
            Help & Documentation
          </SheetTitle>
          <SheetDescription className={cn(isMobile ? "text-sm" : "text-base")}>
            Comprehensive guides for BS 7671 compliant electrical inspections
          </SheetDescription>
        </SheetHeader>

        <div className={cn("space-y-6 mt-6", isMobile && "space-y-4")}>
          {/* Search Section */}
          <div className={cn("space-y-3", isMobile && "space-y-2")}>
            <div className="relative">
              {!searchQuery && (
                <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none", isMobile ? "h-3.5 w-3.5" : "h-4 w-4")} />
              )}
              <Input
                placeholder={isMobile ? "Search help..." : "Search help articles or regulations..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("bg-card/50 border-border", isMobile && "h-10 text-sm", !searchQuery && "pl-10")}
              />
            </div>
            {searchQuery && (
              <p className={cn("text-xs text-muted-foreground flex items-center gap-2", isMobile && "text-[10px]")}>
                <CheckCircle2 className={cn(isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
                Found {resultCount} article{resultCount !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            )}
            {!searchQuery && (
              <div className="flex flex-wrap gap-2 overflow-x-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={cn(selectedCategory === null ? 'bg-blue-500/20 border-blue-500/50' : '', isMobile && "min-h-[44px] text-xs whitespace-nowrap")}
                >
                  {isMobile ? "All" : "All Categories"}
                </Button>
                {helpArticles.map((cat) => (
                  <Button
                    key={cat.category}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory(cat.category)}
                    className={cn(selectedCategory === cat.category ? 'bg-blue-500/20 border-blue-500/50' : '', isMobile && "min-h-[44px] text-xs whitespace-nowrap")}
                  >
                    {cat.category}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Help Articles */}
          <div className={cn("space-y-4", isMobile && "space-y-3")}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((category, idx) => (
                <Card key={idx} className={`bg-gradient-to-br ${category.color} ${category.borderColor} border overflow-hidden`}>
                  <CardHeader className={cn("pb-3", isMobile && "p-3 pb-2")}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(`rounded-lg bg-gradient-to-br ${category.color} border ${category.borderColor} flex items-center justify-center`, isMobile ? "w-8 h-8" : "w-10 h-10")}>
                          <category.icon className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", category.iconColor)} />
                        </div>
                        <CardTitle className={cn(isMobile ? "text-base" : "text-lg")}>{category.category}</CardTitle>
                      </div>
                      <Badge variant="secondary" className={cn("text-xs", isMobile && "px-1.5 py-0.5 text-[10px]")}>
                        {category.items.length} article{category.items.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={cn("space-y-4", isMobile && "space-y-3 p-3 pt-0")}>
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={cn("space-y-3 p-4 rounded-lg bg-card/50 border border-border/50", isMobile && "p-3 space-y-2")}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <item.icon className={cn(`${category.iconColor} flex-shrink-0 mt-0.5`, isMobile ? "h-4 w-4" : "h-5 w-5")} />
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className={cn("font-semibold", isMobile ? "text-xs" : "text-sm")}>{item.title}</h4>
                                {item.badge && (
                                  <Badge variant="outline" className={cn("text-xs", isMobile && "px-1.5 py-0.5 text-[10px]")}>
                                    {item.badge}
                                  </Badge>
                                )}
                                {'estimatedTime' in item && (item as any).estimatedTime && (
                                  <span className={cn("text-xs text-muted-foreground flex items-center gap-1", isMobile && "text-[10px]")}>
                                    <Clock className={cn(isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
                                    {(item as any).estimatedTime}
                                  </span>
                                )}
                              </div>
                              <p className={cn("text-sm text-muted-foreground leading-relaxed", isMobile && "text-xs")}>
                                {item.content}
                              </p>
                            </div>
                          </div>
                        </div>
                        {item.steps && (
                          <div className={cn("space-y-2 ml-8", isMobile && "ml-5")}>
                            <p className={cn("text-xs font-medium text-muted-foreground uppercase tracking-wide", isMobile && "text-[10px]")}>Step-by-step:</p>
                            <ol className={cn("space-y-2", isMobile && "space-y-1.5")}>
                              {item.steps.map((step, stepIdx) => (
                                <li key={stepIdx} className={cn("text-sm text-muted-foreground flex gap-3", isMobile && "text-xs gap-2")}>
                                  <span className={cn("text-xs font-bold text-blue-400 flex-shrink-0 w-5", isMobile && "text-[10px] w-4")}>{stepIdx + 1}.</span>
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {'tips' in item && (item as any).tips && (
                          <div className={cn("space-y-2 ml-8", isMobile && "ml-5")}>
                            <p className={cn("text-xs font-medium text-amber-400 uppercase tracking-wide flex items-center gap-1", isMobile && "text-[10px]")}>
                              <Lightbulb className={cn(isMobile ? "h-2.5 w-2.5" : "h-3 w-3")} />
                              Pro Tips:
                            </p>
                            <ul className={cn("space-y-1.5", isMobile && "space-y-1")}>
                              {(item as any).tips.map((tip: string, tipIdx: number) => (
                                <li key={tipIdx} className={cn("text-xs text-muted-foreground flex gap-2 leading-relaxed", isMobile && "text-[10px]")}>
                                  <span className="text-amber-400">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 border-border">
                <CardContent className={cn("text-center py-12 text-muted-foreground space-y-2", isMobile && "py-8")}>
                  <Search className={cn("mx-auto opacity-50", isMobile ? "h-8 w-8" : "h-12 w-12")} />
                  <p className={cn("font-medium", isMobile ? "text-xs" : "text-sm")}>No articles found matching "{searchQuery}"</p>
                  <p className={cn(isMobile ? "text-[10px]" : "text-xs")}>Try a different search term or browse all categories</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                    className={cn("mt-3", isMobile && "min-h-[44px] text-xs")}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator className="bg-muted" />

          {/* Quick Reference */}
          <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/30">
            <CardHeader className={cn(isMobile && "p-3")}>
              <div className="flex items-center gap-3">
                <div className={cn("rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center", isMobile ? "w-8 h-8" : "w-10 h-10")}>
                  <BookOpen className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", "text-emerald-400")} />
                </div>
                <CardTitle className={cn(isMobile ? "text-base" : "text-lg")}>Quick Reference Values</CardTitle>
              </div>
              <CardDescription className={cn(isMobile && "text-xs")}>Common BS 7671 test limits and requirements</CardDescription>
            </CardHeader>
            <CardContent className={cn(isMobile && "p-3 pt-0")}>
              <div className={cn("grid gap-2", isMobile && "grid-cols-1")}>
                {quickReference.map((ref, idx) => (
                  <div key={idx} className={cn("p-3 rounded-lg bg-card/50 border border-border/50", isMobile && "p-2")}>
                    <p className={cn("font-medium text-muted-foreground mb-1", isMobile ? "text-[10px]" : "text-xs")}>{ref.title}</p>
                    <p className={cn("font-semibold text-emerald-400", isMobile ? "text-xs" : "text-sm")}>{ref.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className={cn("bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/30", isMobile && "p-3")}>
            <p className={cn("text-xs text-muted-foreground leading-relaxed", isMobile && "text-[10px]")}>
              <strong className="text-blue-400">Need more help?</strong> All tools and features are designed to comply with BS 7671:2018+A2:2022 requirements. 
              For complex scenarios, use the AI Regulation Search or consult the full regulations.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpPanel;
