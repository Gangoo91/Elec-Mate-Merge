import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Shield,
  Package,
  Heart,
  Eye,
  ClipboardList,
  Truck,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fa-kit-bs8599-sizes',
    question:
      'BS 8599-1:2019 defines three sizes of workplace first aid kit. What are the employee ranges for each size?',
    options: [
      'Small (1-10), Medium (11-50), Large (51+)',
      'Small (1-25), Medium (25-100), Large (100+)',
      'Small (1-50), Medium (50-150), Large (150+)',
      'Small (1-15), Medium (15-75), Large (75+)',
    ],
    correctIndex: 1,
    explanation:
      'BS 8599-1:2019 defines three kit sizes based on employee numbers: Small (1-25 employees), Medium (25-100 employees), and Large (100+ employees). The medium kit has increased quantities of all items, and the large kit has further increased quantities. Employers must assess which size is appropriate based on their workforce and the nature of the work.',
  },
  {
    id: 'fa-aed-legal-requirement',
    question:
      'Is an employer legally required to provide an AED (Automated External Defibrillator) in the workplace?',
    options: [
      'Yes, all workplaces must have at least one AED under the Health and Safety at Work Act',
      'Yes, but only on construction sites with more than 50 workers',
      'No, but the HSE strongly recommends AED provision, and it is considered best practice',
      'No, AEDs are only required in public buildings such as airports and train stations',
    ],
    correctIndex: 2,
    explanation:
      'There is no legal requirement for employers to provide an AED. However, the HSE strongly recommends their provision, particularly in workplaces with higher-risk activities or larger numbers of workers. Early defibrillation significantly increases survival rates from cardiac arrest. Many employers choose to provide AEDs as part of their first aid needs assessment.',
  },
  {
    id: 'fa-signage-standard',
    question: 'What is the correct appearance of a first aid sign according to ISO 7010?',
    options: [
      'Red background with a white cross',
      'Blue background with a white cross',
      'Green background with a white cross',
      'Yellow background with a green cross',
    ],
    correctIndex: 2,
    explanation:
      'First aid signs must have a green background with a white cross, conforming to ISO 7010 (reference E003). Green is the designated safe condition colour in safety signage. The signs must be clearly visible and positioned to direct people to first aid equipment, rooms, or personnel.',
  },
];

const faqs = [
  {
    question: 'How often should a workplace first aid kit be checked?',
    answer:
      'There is no set legal frequency, but best practice is to check kits at least weekly and immediately after each use. A designated person should be responsible for checking contents, replacing used or expired items, and maintaining a checklist. Expiry dates should be monitored — sterile dressings, wipes, and burn dressings all have shelf lives. Regular checks ensure the kit is always ready for use when an emergency occurs.',
  },
  {
    question: 'Do I need a first aid room on a construction site?',
    answer:
      'A first aid room is not always required, but it should be provided where the first aid needs assessment identifies the need — typically on larger sites, sites with serious hazards, or where a large number of workers are present. The Construction (Design and Management) Regulations 2015 require adequate first aid arrangements on all construction sites. HSE guidance L74 states that a first aid room should contain an examination couch, blankets, a sink with hot and cold water, soap, paper towels, drinking water, a first aid kit, and record-keeping materials.',
  },
  {
    question: 'What additional items should electricians carry in their vehicle first aid kit?',
    answer:
      'Electricians and other mobile workers should carry a travel first aid kit in their vehicle. In addition to the standard travel kit contents, electricians should consider carrying extra burn dressings (for electrical burns), eye wash (for dust and debris), a foil blanket, and a CPR face shield. The kit should be kept in a clean, dry, accessible location in the vehicle and checked regularly. Some employers also provide tourniquets and haemostatic dressings for high-risk electrical work.',
  },
  {
    question:
      "Can an employer rely on a nearby building's first aid provision instead of their own?",
    answer:
      "Employers in multi-occupied buildings can make shared first aid arrangements, but this must be formally agreed and documented. Each employer remains responsible for ensuring adequate first aid provision for their own employees. Shared arrangements should be reviewed regularly and must account for shift patterns, access during out-of-hours work, and the total number of people in the building. Relying on another organisation's provision without a formal agreement is not acceptable.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which British Standard covers workplace first aid kits in the UK?',
    options: ['BS 7671:2018', 'BS 8599-1:2019', 'BS 5839-1:2017', 'BS EN 166:2002'],
    correctAnswer: 1,
    explanation:
      'BS 8599-1:2019 is the British Standard for workplace first aid kits. It specifies the contents and quantities for three sizes of kit (small, medium, and large) based on the number of employees. BS 7671 covers electrical installations, BS 5839 covers fire detection systems, and BS EN 166 covers eye protection.',
  },
  {
    id: 2,
    question:
      'What item is included in a BS 8599-1:2019 first aid kit that was NOT typically found in older kits?',
    options: [
      'Aspirin tablets',
      'Antiseptic cream',
      'Foil blankets and burn dressings',
      'Bandage scissors',
    ],
    correctAnswer: 2,
    explanation:
      'The 2019 revision of BS 8599-1 introduced foil blankets and burn dressings as standard contents in all three kit sizes. Previous versions and the older 1997 standard did not include these items. Note that medications such as aspirin and antiseptic cream are NOT included in workplace first aid kits — first aiders should not administer medication.',
  },
  {
    id: 3,
    question: 'What type of gloves must be included in a BS 8599-1:2019 first aid kit?',
    options: ['Latex gloves', 'Vinyl gloves', 'Nitrile gloves', 'Cotton gloves'],
    correctAnswer: 2,
    explanation:
      'BS 8599-1:2019 specifies nitrile gloves, not latex. This is because latex allergies are relatively common and can cause serious reactions. Nitrile gloves provide excellent protection against bloodborne pathogens and are suitable for people with latex sensitivity. A small kit contains 6 pairs, a medium kit contains 9 pairs, and a large kit contains 12 pairs.',
  },
  {
    id: 4,
    question:
      'On a high-risk construction site, which additional items might be added to the standard first aid kit?',
    options: [
      'Paracetamol and ibuprofen',
      'Tourniquets, haemostatic dressings, and additional eye wash',
      'Defibrillator pads and oxygen masks',
      'Splints and surgical instruments',
    ],
    correctAnswer: 1,
    explanation:
      'High-risk construction sites often require tourniquets (for catastrophic limb bleeding), haemostatic dressings containing kaolin or chitosan (to promote rapid clotting), additional eye wash bottles (500ml), extra burn dressings, and larger wound dressings. These supplement the standard BS 8599-1:2019 kit. Medications are never included in workplace first aid kits, and surgical instruments are not appropriate for first aid.',
  },
  {
    id: 5,
    question: 'How often should an AED be checked, and what are the key maintenance items?',
    options: [
      'Annually by the manufacturer only',
      'Monthly checks including pad expiry dates, battery life indicator, and visual condition',
      'Only when used on a casualty',
      'Every six months as part of a PAT test',
    ],
    correctAnswer: 1,
    explanation:
      'AEDs should be checked monthly. The key maintenance items are: checking pad expiry dates (pads typically last 2-5 years and must be replaced if expired or after use), checking the battery life indicator (batteries last 2-5 years depending on the model), and visually inspecting the unit for damage. Many AEDs perform daily self-checks and display a status indicator, but manual checks are still required.',
  },
  {
    id: 6,
    question: 'What must a workplace first aid room contain according to HSE guidance L74?',
    options: [
      'A bed, television, and refrigerator',
      'An examination couch, blankets, sink with hot and cold water, soap, paper towels, drinking water, first aid kit, and record-keeping materials',
      'Only a first aid kit and a telephone',
      'A defibrillator, oxygen supply, and stretcher',
    ],
    correctAnswer: 1,
    explanation:
      'HSE Approved Code of Practice L74 states that a first aid room should contain: an examination couch with waterproof protection and clean pillows and blankets, a sink with hot and cold running water, soap and paper towels, drinking water and disposable cups, a first aid kit appropriate to the workplace, record-keeping materials, suitable heating, lighting, and ventilation, and a means of communication (e.g. telephone).',
  },
  {
    id: 7,
    question: 'Which of the following is NOT a factor in a first aid needs assessment?',
    options: [
      'The nature of the work and specific hazards',
      'Shift patterns and lone workers',
      'The colour of the office walls',
      'Remoteness from emergency medical services',
    ],
    correctAnswer: 2,
    explanation:
      'A first aid needs assessment must consider: the nature of the work and specific hazards, the size and spread of the organisation, shift patterns and coverage, lone workers, remoteness from emergency medical services, the history of accidents, special needs (disability, language barriers), non-employees on site (contractors, visitors, the public), and multi-occupied buildings. The colour of the office walls is not a relevant factor.',
  },
  {
    id: 8,
    question: 'What is the correct colour and symbol for first aid signage under ISO 7010?',
    options: [
      'Red square with white cross (reference E003)',
      'Green rectangle or square with white cross (reference E003)',
      'Blue circle with white cross (reference M003)',
      'Yellow triangle with green cross',
    ],
    correctAnswer: 1,
    explanation:
      'First aid signage must conform to ISO 7010 reference E003: a green rectangle or square with a white cross. Green indicates a safe condition in safety signage. Signs must clearly indicate the location of first aid kits, first aid rooms, first aid personnel, and AEDs. They must be positioned so they are visible from all relevant approaches.',
  },
];

export default function FirstAidModule1Section4() {
  useSEO({
    title: 'First Aid Kits, Equipment & Workplace Planning | First Aid Module 1.4',
    description:
      'BS 8599-1:2019 workplace first aid kit contents, high-risk construction additions, AED provision, first aid rooms, signage, needs assessment, vehicle kits and restocking procedures.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FileText className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            First Aid Kits, Equipment &amp; Workplace Planning
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            BS 8599-1:2019 kit contents, high-risk additions, AED provision, first aid rooms,
            signage requirements, needs assessments and restocking procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>BS 8599-1:2019:</strong> Three kit sizes &mdash; small, medium, large
              </li>
              <li>
                <strong>AEDs:</strong> Not legally required but strongly recommended
              </li>
              <li>
                <strong>Signage:</strong> Green background, white cross (ISO 7010)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Always:</strong> Check kit contents regularly and after each use
              </li>
              <li>
                <strong>Monitor:</strong> Expiry dates on sterile dressings and pads
              </li>
              <li>
                <strong>Assess:</strong> Review first aid needs when conditions change
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the three sizes of BS 8599-1:2019 workplace first aid kit and their contents',
              'Identify additional items required for high-risk construction environments',
              'Explain AED provision requirements and maintenance schedules',
              'State the requirements for a workplace first aid room under HSE L74',
              'Recognise correct first aid signage and its placement',
              'Carry out a first aid needs assessment for a workplace',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: BS 8599-1:2019 Workplace First Aid Kits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            BS 8599-1:2019 &mdash; Workplace First Aid Kits
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BS 8599-1:2019 is the British Standard that specifies the contents and quantities
                for workplace first aid kits. It replaced the older 1997 standard and introduced
                several important updates, including the addition of foil blankets, burn dressings,
                and a CPR face shield as standard contents. The standard defines three kit sizes
                based on the number of employees.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Key Change in 2019 Revision
                </p>
                <p className="text-sm text-white/80">
                  The 2019 revision added burn dressings, foil blankets, and a CPR face shield to
                  all kit sizes. It also replaced latex gloves with{' '}
                  <strong className="text-white">nitrile gloves</strong> to avoid allergic
                  reactions, and increased the number of some items across all sizes. Employers
                  should ensure all existing kits are updated to meet the current standard.
                </p>
              </div>

              <p>
                The three kit sizes are based on employee numbers, but employers must also consider
                the nature of the work, the specific hazards present, and the spread of the
                workforce. A small workplace with high-risk activities may need a larger kit or
                supplementary items.
              </p>

              {/* BS 8599-1:2019 Kit Contents Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-rose-500/10 border-b border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">BS 8599-1:2019 Kit Contents</p>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-4 gap-0 border-b border-white/10 text-xs font-semibold">
                  <div className="p-2 sm:p-3 text-white/60">Item</div>
                  <div className="p-2 sm:p-3 text-center text-green-400 border-l border-white/10">
                    Small
                    <br />
                    <span className="text-white/40 font-normal">(1&ndash;25)</span>
                  </div>
                  <div className="p-2 sm:p-3 text-center text-amber-400 border-l border-white/10">
                    Medium
                    <br />
                    <span className="text-white/40 font-normal">(25&ndash;100)</span>
                  </div>
                  <div className="p-2 sm:p-3 text-center text-red-400 border-l border-white/10">
                    Large
                    <br />
                    <span className="text-white/40 font-normal">(100+)</span>
                  </div>
                </div>

                {/* Table Rows */}
                {[
                  { item: 'First aid guidance leaflet', small: '1', medium: '1', large: '1' },
                  { item: 'Individually wrapped wipes', small: '20', medium: '30', large: '40' },
                  { item: 'Assorted plasters', small: '60', medium: '100', large: '150' },
                  { item: 'Eye pads (sterile)', small: '2', medium: '3', large: '4' },
                  { item: 'Finger dressings', small: '3', medium: '4', large: '6' },
                  { item: 'Medium wound dressings (12×12cm)', small: '1', medium: '2', large: '3' },
                  { item: 'Large wound dressings (18×18cm)', small: '2', medium: '3', large: '4' },
                  { item: 'Triangular bandages', small: '1', medium: '2', large: '3' },
                  { item: 'Safety pins', small: '6', medium: '12', large: '24' },
                  { item: 'Conforming bandages', small: '2', medium: '3', large: '4' },
                  { item: 'Microporous tape', small: '1', medium: '1', large: '2' },
                  { item: 'Nitrile gloves (pairs)', small: '6', medium: '9', large: '12' },
                  { item: 'Foil blankets', small: '2', medium: '3', large: '4' },
                  { item: 'Burn dressing (10\u00d710cm)', small: '1', medium: '2', large: '2' },
                  { item: 'Clothing cutters', small: '1', medium: '1', large: '1' },
                  { item: 'Tough cut shears', small: '1', medium: '1', large: '1' },
                  { item: 'CPR face shield', small: '1', medium: '2', large: '2' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 gap-0 text-xs sm:text-sm ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} ${i < 16 ? 'border-b border-white/5' : ''}`}
                  >
                    <div className="p-2 sm:p-3 text-white/80">{row.item}</div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">
                      {row.small}
                    </div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">
                      {row.medium}
                    </div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">
                      {row.large}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Important Notes</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Workplace first aid kits must <strong className="text-white">not</strong>{' '}
                      contain medications (no paracetamol, aspirin, antiseptic cream, or any other
                      medicine)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All sterile items have expiry dates &mdash; these must be monitored and items
                      replaced before they expire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Nitrile gloves are specified instead of latex to avoid allergic reactions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The kit itself should be clearly marked with a white cross on a green
                      background
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: High-Risk Construction Additions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            High-Risk Construction Additions
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites and other high-risk workplaces often require additional first aid
                equipment beyond the standard BS 8599-1:2019 kit. The first aid needs assessment may
                identify hazards that require supplementary items to be available. These additions
                are particularly important for electrical workers, who face risks including burns,
                falls, and catastrophic bleeding from contact with machinery.
              </p>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Tourniquets</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used for catastrophic limb bleeding that cannot be controlled by direct
                        pressure alone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Applied high and tight on the affected limb, proximal to the wound
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Time of application must be noted and reported to ambulance crew</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Training is essential &mdash; incorrect use can cause further harm
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Haemostatic Dressings</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Contain agents such as kaolin or chitosan that promote rapid clotting
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Used for severe bleeding in junctional areas (neck, groin, armpit) where a
                        tourniquet cannot be applied
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Packed firmly into the wound and held with direct pressure for a minimum of
                        3 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Require specific training for correct use</span>
                    </li>
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-blue-400" />
                      <p className="text-sm font-medium text-blue-400">Additional Eye Wash</p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>500ml sterile eye wash bottles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Essential where dust, chemicals, or debris are present</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Check expiry dates monthly &mdash; sterile solution has a limited shelf
                          life once the seal is broken
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-orange-400" />
                      <p className="text-sm font-medium text-orange-400">
                        Additional Burn Dressings
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Larger burn dressings (20&times;20cm or gel-soaked sheets)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Critical for electrical burn injuries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Cool the burn with running water first, then apply the dressing</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-3">Other High-Risk Additions</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Larger wound dressings:</strong> Trauma
                        dressings for major wounds from machinery or falls
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Additional foil blankets:</strong> For
                        treating shock in multiple casualties
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Chest seals:</strong> For penetrating chest
                        injuries (impalement hazards)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Splints (SAM splints):</strong> For suspected
                        fractures from falls at height
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: AED Provision */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            AED (Automated External Defibrillator) Provision
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An Automated External Defibrillator (AED) is a portable device that analyses a
                person&apos;s heart rhythm and delivers an electrical shock (defibrillation) if
                needed. AEDs are designed to be used by anyone, including people with no medical
                training, and they provide voice prompts to guide the user through each step.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Legal Position</p>
                <p className="text-sm text-white/80">
                  There is <strong className="text-white">no legal requirement</strong> for
                  employers to provide an AED. However, the HSE strongly recommends AED provision as
                  part of workplace first aid arrangements. Early defibrillation within the first
                  3&ndash;5 minutes of cardiac arrest can increase survival rates from approximately
                  6% to over 70%. Given that average ambulance response times in the UK are
                  8&ndash;11 minutes, workplace AEDs can be the difference between life and death.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Public Access AEDs</p>
                <p className="text-sm text-white/80 mb-3">
                  Many communities, public buildings, and workplaces now have public access
                  defibrillators (PADs) registered on{' '}
                  <strong className="text-white">The Circuit</strong> &mdash; a national database
                  managed by the British Heart Foundation. When you call 999, the ambulance service
                  can direct you to the nearest registered AED.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      PADs are typically housed in unlocked or code-locked cabinets on external
                      walls
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The access code is provided by the 999 operator when needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Site workers should know the location of the nearest AED as part of their
                      induction
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">AED Maintenance Requirements</p>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  AEDs require regular maintenance to ensure they are ready for use in an emergency:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Monthly visual checks:</strong> Confirm the
                      status indicator shows "ready" (usually a green tick or light), check for any
                      visible damage, and ensure the unit is clean and accessible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pad replacement dates:</strong> Electrode pads
                      have an expiry date (typically 2&ndash;5 years from manufacture). Expired pads
                      may not adhere properly or deliver an effective shock. Record the expiry date
                      and order replacements in advance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Battery life:</strong> Batteries typically last
                      2&ndash;5 years depending on the model. Most AEDs display a battery status
                      indicator. Replace batteries before they are fully depleted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After each use:</strong> Replace pads (single
                      use only), check battery level, clean the unit, and report the use to your
                      employer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Daily self-check:</strong> Most modern AEDs
                      perform an automatic self-test daily and indicate their status via an LED or
                      screen &mdash; but this does not replace manual monthly checks
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Designated AED Guardian</p>
                </div>
                <p className="text-sm text-white/80">
                  Every workplace AED should have a designated &ldquo;AED guardian&rdquo; &mdash; a
                  named person responsible for monthly checks, maintaining the maintenance log,
                  ordering replacement pads and batteries, and ensuring the AED is registered on The
                  Circuit. This role should be documented in the workplace first aid policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: First Aid Room Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            First Aid Room Requirements
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety (First-Aid) Regulations 1981 require employers to provide
                adequate first aid facilities. For workplaces with serious hazards or large numbers
                of workers, this may include a dedicated first aid room. HSE Approved Code of
                Practice L74 provides detailed guidance on when a first aid room is necessary and
                what it must contain.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When Is a First Aid Room Required?
                </p>
                <p className="text-sm text-white/80 mb-3">
                  A first aid room should be provided where the first aid needs assessment
                  identifies the need. This is typically the case in the following situations:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Workplaces with serious or specific hazards (e.g. hazardous chemicals, heavy
                      machinery, work at height)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Large workplaces with many employees on site at any one time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Sites remote from emergency medical services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Construction sites under the CDM Regulations 2015 where the scale or nature of
                      work warrants it
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Required Contents (HSE L74)
                </p>
                <p className="text-sm text-white/60 mb-3">
                  A first aid room must contain the following as a minimum:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>
                      Examination couch with waterproof protection, clean pillows and blankets
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Sink with hot and cold running water</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Soap and paper towels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Drinking water with disposable cups</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Appropriate first aid kit(s)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Record-keeping materials (accident book, first aid log)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>Suitable heating, lighting, and ventilation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                    <span>A telephone or other means of communication</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Additional Considerations</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The room must be clearly signposted with the standard first aid sign (white
                      cross on green background)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>It should be easily accessible to stretchers and wheelchairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      The room should be used only for first aid purposes &mdash; not as a general
                      rest room or storage area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A qualified first aider should be available when the room is in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      On construction sites, the first aid room may be a dedicated area within the
                      site welfare facilities
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Signage */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            First Aid Signage
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Clear and visible signage is essential so that anyone on site can quickly locate
                first aid equipment, rooms, and personnel in an emergency. First aid signs must
                conform to the Health and Safety (Safety Signs and Signals) Regulations 1996 and ISO
                7010.
              </p>

              {/* Signage Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  ISO 7010 E003 &mdash; First Aid Sign
                </p>
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-green-600 rounded-lg flex items-center justify-center border-2 border-green-500/50 shadow-lg shadow-green-500/20">
                    <div className="relative">
                      {/* Vertical bar of the cross */}
                      <div className="w-6 h-20 sm:w-8 sm:h-24 bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      {/* Horizontal bar of the cross */}
                      <div className="w-20 h-6 sm:w-24 sm:h-8 bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/60 text-center">
                  Green background with white cross &mdash; the internationally recognised first aid
                  symbol
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Must Be Signposted?</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">
                      First Aid Kit Location
                    </p>
                    <p className="text-xs text-white/70">
                      Green sign with white cross, positioned above or adjacent to the kit so it is
                      visible from all approaches
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">First Aid Room</p>
                    <p className="text-xs text-white/70">
                      Green sign on or above the door, with directional signs at key decision points
                      throughout the building
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">First Aid Personnel</p>
                    <p className="text-xs text-white/70">
                      Name and location of trained first aiders displayed in a prominent position
                      (notice boards, welfare areas)
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">AED Location</p>
                    <p className="text-xs text-white/70">
                      Green sign with AED/heart symbol, visible from all approaches. Many sites also
                      display the green heart symbol with a lightning bolt
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Signage Rules</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Signs must be large enough to be seen clearly from a reasonable distance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Directional arrows should be used where the first aid provision is not
                      directly visible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Signs must be maintained in a clean and legible condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Photoluminescent signs may be required in areas where lighting may fail (e.g.
                      power outage scenarios)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      On construction sites, signage must be reviewed and updated as the site layout
                      changes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: First Aid Needs Assessment, Vehicle Kits & Restocking */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Needs Assessment, Vehicle Kits &amp; Restocking
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety (First-Aid) Regulations 1981 require every employer to carry
                out a first aid needs assessment. This assessment determines the level of first aid
                provision needed &mdash; including the number and type of first aiders, the
                equipment required, and any additional facilities such as a first aid room. The
                assessment must be reviewed regularly and whenever circumstances change.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    First Aid Needs Assessment Checklist
                  </p>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  The employer must consider the following factors:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nature of the work and hazards:</strong> What
                      are the specific risks? Electrical work, work at height, use of machinery,
                      exposure to chemicals, manual handling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Size and spread of the organisation:</strong>{' '}
                      How many employees? Are they spread across multiple floors, buildings, or
                      sites?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shift patterns and coverage:</strong> Is first
                      aid cover available during all working hours, including nights, weekends, and
                      overtime?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lone workers:</strong> Do any employees work
                      alone? How will they access first aid if injured?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remoteness from emergency services:</strong>{' '}
                      How long would an ambulance take to arrive? Rural or remote sites may need
                      higher levels of provision
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">History of accidents:</strong> What types of
                      injuries have occurred previously? Are there patterns that indicate specific
                      first aid needs?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Special needs:</strong> Employees or visitors
                      with disabilities, language barriers, or specific medical conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Non-employees on site:</strong> Contractors,
                      visitors, members of the public &mdash; the employer has a duty of care to
                      everyone on their premises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Multi-occupied buildings:</strong> Are there
                      shared first aid arrangements with other organisations in the building?
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Vehicle First Aid Kits</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Mobile workers, including electricians, should carry a travel first aid kit in
                  their vehicle. While there is no specific legal requirement for a vehicle first
                  aid kit, it is strongly recommended by the HSE and is considered best practice for
                  anyone who works away from a fixed base.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A travel kit is smaller than a workplace kit but contains essential items for
                      one person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Keep the kit in a clean, dry, accessible location in the vehicle (not buried
                      under tools)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Check contents regularly &mdash; vehicle temperature extremes can degrade
                      sterile items faster
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Consider carrying extra burn dressings and eye wash if you work on live or
                      energised systems
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      BS 8599-1:2019 includes a travel kit specification with reduced quantities
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Checking &amp; Restocking Kits
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Having a well-stocked kit that is never checked is as dangerous as having no kit
                  at all. A systematic approach to checking and restocking is essential:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Designated person:</strong> A named individual
                      must be responsible for checking and restocking each kit. This is typically
                      the appointed person or a first aider
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Regular checklist:</strong> Use a written or
                      digital checklist to record the date of each check, the items present, and any
                      items that need replacing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Expiry dates:</strong> Monitor expiry dates on
                      all sterile items (dressings, wipes, eye wash, burn dressings). Replace items
                      before they expire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">After each use:</strong> Restock immediately
                      after any item is used. Do not wait for the next scheduled check
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Supply chain:</strong> Ensure replacement items
                      are readily available. Keep a stock of commonly used items (plasters, gloves,
                      wipes) so kits can be restocked immediately
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Review Trigger Events</p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The first aid needs assessment must be reviewed and updated whenever:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The nature of the work changes (new hazards introduced)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The workforce size changes significantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A first aider leaves or their certificate expires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The workplace moves to a new location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>A significant incident or near-miss highlights a gap in provision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>New legislation or guidance is published</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../first-aid-module-2">
              Next: Module 2 &mdash; CPR, AED &amp; Choking
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
