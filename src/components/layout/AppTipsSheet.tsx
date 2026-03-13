import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Rocket,
  ClipboardCheck,
  Sparkles,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppTipsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Tip {
  title: string;
  description: string;
}

interface TipCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  gradientLine: string;
  iconBg: string;
  iconBorder: string;
  iconText: string;
  dotColour: string;
  blobGradient: string;
  tips: Tip[];
}

const categories: TipCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitle: 'Set up once, save time forever',
    icon: Rocket,
    gradient: 'from-amber-500 via-yellow-500 to-amber-500',
    gradientLine: 'from-amber-500 via-yellow-500 to-amber-500',
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconText: 'text-amber-400',
    dotColour: 'bg-amber-400',
    blobGradient: 'from-amber-500 via-yellow-500 to-amber-500',
    tips: [
      {
        title: 'Your Profile',
        description:
          'Settings \u2192 Account. Add your name, job title, specialisation, ECS card type, and years of experience. If you\u2019re an apprentice, set your course level, year, and training provider.',
      },
      {
        title: 'Company Identity',
        description:
          'Settings \u2192 Business \u2192 Company Identity. Add your company name, address, phone, email, logo, and registration/VAT numbers. Your logo appears on every PDF you generate.',
      },
      {
        title: 'Rates & Pricing',
        description:
          'Settings \u2192 Business \u2192 Pricing & Rates. Set your default hourly rate, overhead percentage, and profit margin. Add worker rates for electricians, apprentices, labourers, designers, and owners \u2014 the Cost Engineer uses these for accurate quotes.',
      },
      {
        title: 'Inspector Details',
        description:
          'Settings \u2192 Business \u2192 Inspector Details. Select your qualifications (18th Edition, 2391, AM2, etc.), scheme registration (NICEIC, NAPIT, ELECSA), insurance provider and cover level, and draw your digital signature. All auto-fill into certificates.',
      },
      {
        title: 'Test Instruments',
        description:
          'Settings \u2192 Business \u2192 Testing Instruments. Add your MFT, insulation tester, loop impedance tester, and other instruments with serial numbers and calibration dates. They auto-populate into your certs and flag when calibration is due.',
      },
      {
        title: 'Payment Setup',
        description:
          'Settings \u2192 Business \u2192 Payment & Banking. Add your bank details (account name, sort code, account number) so they appear on invoices. Connect Stripe to accept card payments directly from clients.',
      },
      {
        title: 'Elec-ID',
        description:
          'Your digital trade card. Upload qualifications, track expiry dates, build your work history, and share everything with clients via QR code or link. Also generates a professional CV from your profile.',
      },
    ],
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & Testing',
    subtitle: 'Certs, scanning, and compliance',
    icon: ClipboardCheck,
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    gradientLine: 'from-blue-500 via-blue-400 to-cyan-400',
    iconBg: 'bg-blue-500/10',
    iconBorder: 'border-blue-500/20',
    iconText: 'text-blue-400',
    dotColour: 'bg-blue-400',
    blobGradient: 'from-blue-500 via-blue-400 to-cyan-400',
    tips: [
      {
        title: 'EICR / EIC / Minor Works',
        description:
          'Full cert forms with auto-save every 10 seconds. Saves locally first, then syncs to cloud \u2014 never lose work on site.',
      },
      {
        title: 'Board Scanner',
        description:
          'Snap a photo of a distribution board and AI reads the circuit details. Saves hours of manual entry.',
      },
      {
        title: 'Schedule of Tests',
        description:
          '\u201CFill All\u201D buttons bulk-set RCD results, AFDD results, and BS standards across all circuits in one tap.',
      },
      {
        title: 'Specialist Certs',
        description:
          'Emergency Lighting, Fire Alarm, Solar PV, EV Charging \u2014 all with built-in compliance checks and auto-save.',
      },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    subtitle: 'Design, quote, and plan in seconds',
    icon: Sparkles,
    gradient: 'from-purple-500 via-purple-400 to-violet-400',
    gradientLine: 'from-purple-500 via-purple-400 to-violet-400',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/20',
    iconText: 'text-purple-400',
    dotColour: 'bg-purple-400',
    blobGradient: 'from-purple-500 via-purple-400 to-violet-400',
    tips: [
      {
        title: 'Circuit Designer',
        description:
          'Describe your installation, get cable sizes, protection devices, and volt drop calcs to BS 7671.',
      },
      {
        title: 'Cost Engineer',
        description:
          'AI quotes from real trade pricing data. Generates itemised quotes ready to send to clients.',
      },
      {
        title: 'RAMS Generator',
        description:
          'Describe the job, get a full Risk Assessment & Method Statement in minutes. Ready to print.',
      },
      {
        title: 'Installation Specialist',
        description:
          'Step-by-step installation guidance for any type of electrical work, with reg references.',
      },
    ],
  },
  {
    id: 'business-hub',
    title: 'Business Hub',
    subtitle: 'Run your business from your phone',
    icon: Briefcase,
    gradient: 'from-emerald-500 via-emerald-400 to-green-400',
    gradientLine: 'from-emerald-500 via-emerald-400 to-green-400',
    iconBg: 'bg-emerald-500/10',
    iconBorder: 'border-emerald-500/20',
    iconText: 'text-emerald-400',
    dotColour: 'bg-emerald-400',
    blobGradient: 'from-emerald-500 via-emerald-400 to-green-400',
    tips: [
      {
        title: 'Quotes',
        description:
          'Create itemised quotes with your rates, materials, and labour. Set validity period, deposit percentage, and warranty terms in Settings \u2192 Business \u2192 Quote Settings. Choose from 15+ standard T&Cs or write your own.',
      },
      {
        title: 'Invoices',
        description:
          'Convert quotes to invoices in one tap, or create standalone invoices. Configure late payment interest, preferred payment method, and invoice T&Cs in Settings \u2192 Business \u2192 Invoice Settings. Bank details auto-fill from your payment setup.',
      },
      {
        title: 'Calendar & Scheduling',
        description:
          'Manage jobs, set reminders, plan your week. Syncs with your AI day planner for optimised routing between jobs.',
      },
      {
        title: 'Spark Tasks',
        description:
          'Your job to-do list with project grouping and priority levels. Create tasks from site, assign to projects, and track completion.',
      },
      {
        title: 'Mate (Business AI)',
        description:
          'Your WhatsApp AI assistant. Creates invoices, checks your schedule, logs tasks, runs calcs \u2014 all via chat. Set up from the Mate card in the Electrician Hub.',
      },
    ],
  },
  {
    id: 'study-centre',
    title: 'Study Centre',
    subtitle: 'Learn, revise, and stay current',
    icon: GraduationCap,
    gradient: 'from-cyan-500 via-cyan-400 to-sky-400',
    gradientLine: 'from-cyan-500 via-cyan-400 to-sky-400',
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
    iconText: 'text-cyan-400',
    dotColour: 'bg-cyan-400',
    blobGradient: 'from-cyan-500 via-cyan-400 to-sky-400',
    tips: [
      {
        title: 'Apprentice Courses',
        description:
          'Level 2 & 3 with interactive content, mock exams, and progress tracking. Built for the new apprenticeship standards.',
      },
      {
        title: 'CPD / Upskilling',
        description:
          'Courses for qualified sparkies to stay current with regs and new tech like solar PV and EV charging.',
      },
      {
        title: 'BS 7671 Reference',
        description:
          'Searchable regulation database with practical guidance notes. Find any reg in seconds.',
      },
    ],
  },
  {
    id: 'pro-tips',
    title: 'Pro Tips',
    subtitle: 'Get more from every feature',
    icon: Lightbulb,
    gradient: 'from-orange-500 via-orange-400 to-amber-400',
    gradientLine: 'from-orange-500 via-orange-400 to-amber-400',
    iconBg: 'bg-orange-500/10',
    iconBorder: 'border-orange-500/20',
    iconText: 'text-orange-400',
    dotColour: 'bg-orange-400',
    blobGradient: 'from-orange-500 via-orange-400 to-amber-400',
    tips: [
      {
        title: 'Explore Everything',
        description:
          '50+ tools across inspection, AI, business, and learning. Tap around \u2014 you might find something that saves hours every week.',
      },
      {
        title: 'Offline Ready',
        description:
          'Certs auto-save locally. Lose signal on site? Data\u2019s safe. Syncs automatically when you\u2019re back online.',
      },
      {
        title: 'Brand Your PDFs',
        description:
          'Every cert, quote, and invoice generates a branded PDF. Set your logo, brand colours (primary, secondary, accent), and logo size in Settings \u2192 Business. Connect Xero, QuickBooks, Sage, or FreeAgent to auto-sync invoices.',
      },
      {
        title: 'Quick Search',
        description:
          'Tap the search icon (next to this button!) to jump to any page in the app instantly. Or press Cmd+K on desktop.',
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const CategoryCard = ({ category }: { category: TipCategory }) => {
  const Icon = category.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={cn('group relative overflow-hidden', 'glass-premium rounded-2xl')}
    >
      {/* 2px gradient accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          category.gradientLine,
          'opacity-60'
        )}
      />

      {/* Decorative gradient blob */}
      <div
        className={cn(
          'absolute -top-20 -right-20 w-40 h-40',
          'bg-gradient-to-br',
          category.blobGradient,
          'opacity-[0.04] blur-3xl pointer-events-none'
        )}
      />

      <div className="relative z-10 p-5">
        {/* Header: icon + title + subtitle */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={cn(
              'flex-shrink-0 p-2.5 rounded-xl',
              category.iconBg,
              'border',
              category.iconBorder
            )}
          >
            <Icon className={cn('h-6 w-6', category.iconText)} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white leading-tight">{category.title}</h3>
            <p className="text-sm text-white mt-0.5">{category.subtitle}</p>
          </div>
          <span
            className={cn(
              'flex-shrink-0 text-xs font-medium text-white',
              'px-2 py-1 rounded-md bg-white/[0.04]'
            )}
          >
            {category.tips.length} tips
          </span>
        </div>

        {/* Tips — clean rows, no inner containers */}
        <div className="space-y-0">
          {category.tips.map((tip, i) => (
            <div key={tip.title}>
              {i > 0 && <div className="h-px bg-white/[0.04] mx-1" />}
              <div className="py-3 flex gap-3">
                <div
                  className={cn(
                    'flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]',
                    category.dotColour
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{tip.title}</p>
                  <p className="text-sm text-white leading-relaxed mt-0.5">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AppTipsSheet = ({ open, onOpenChange }: AppTipsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Sticky header */}
          <div className="flex-shrink-0 sticky top-0 z-10 backdrop-blur-xl bg-background/95">
            <div className="h-[2px] bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />
            <div className="px-5 py-4 flex items-center gap-3.5">
              <div className={cn('p-2.5 rounded-xl', 'bg-amber-500/10 border border-amber-500/20')}>
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">Tips & Guidance</h2>
                <p className="text-xs text-white mt-0.5">
                  Get the most out of every feature in Elec-Mate
                </p>
              </div>
            </div>
            <div className="h-px bg-white/[0.06]" />
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-4 py-4">
              <motion.div
                className="space-y-4 pb-8"
                variants={containerVariants}
                initial="hidden"
                animate={open ? 'visible' : 'hidden'}
              >
                {categories.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppTipsSheet;
