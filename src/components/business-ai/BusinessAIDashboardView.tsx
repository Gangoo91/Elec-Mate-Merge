import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Phone,
  Receipt,
  FileText,
  ListTodo,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  MessageCircle,
  Users,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  Mail,
  Bot,
  ExternalLink,
  Settings,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { useAgentActivity, AgentAction } from '@/hooks/useAgentActivity';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { formatDistanceToNow, parseISO, isAfter, subDays } from 'date-fns';
import { openExternalUrl } from '@/utils/open-external-url';
import { MATE_PHONE_DISPLAY, MATE_WHATSAPP_LINK } from '@/constants/mate';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  // Show prefix + last 2 digits so user can recognise their number
  const clean = phone.replace(/\s/g, '');
  const prefix = clean.slice(0, 7); // e.g. +447507
  const last2 = clean.slice(-2); // e.g. 03
  // Format nicely: +44 7507 ••• •03
  const p1 = prefix.slice(0, 3); // +44
  const p2 = prefix.slice(3, 7); // 7507
  return `${p1} ${p2} \u2022\u2022\u2022 \u2022${last2}`;
}

function whatsAppLink(phone: string | null): string {
  if (!phone) return 'https://wa.me/';
  const clean = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${clean}`;
}

// "What to ask Mate" — grouped by context with real example prompts
const askMateGroups = [
  {
    title: 'Running Your Business',
    cards: [
      {
        icon: Receipt,
        label: 'Invoicing',
        prompts: ['Chase Parker & Sons', "Who hasn't paid?", 'Send a reminder to all overdue'],
      },
      {
        icon: FileText,
        label: 'Quoting',
        prompts: [
          'Draft a quote for a full rewire in Chorlton',
          'Follow up on the Henderson quote',
        ],
      },
      {
        icon: ListTodo,
        label: 'Tasks',
        prompts: ["What's on today?", 'Add task: order MCBs for Friday', 'Mark the Chen EICR done'],
      },
      {
        icon: BarChart3,
        label: 'Analytics',
        prompts: ['How much am I owed?', 'Revenue this month', 'Busiest week this year'],
      },
    ],
  },
  {
    title: 'On Site',
    cards: [
      {
        icon: BookOpen,
        label: 'Regs & Knowledge',
        prompts: [
          'Max Zs for a B32 on TN-C-S?',
          'Cable size for a 9.5kW shower?',
          "What's Reg 411.4.4?",
        ],
      },
      {
        icon: ClipboardCheck,
        label: 'Certs & Compliance',
        prompts: ["File Mrs Chen's EICR", 'Any certs expiring soon?', 'Send the EIC to the client'],
      },
    ],
  },
  {
    title: 'Your Clients',
    cards: [
      {
        icon: Users,
        label: 'Client Comms',
        prompts: [
          "Confirm Thursday's appointment with Walsh",
          "Text the Henderson's I'm running 20 mins late",
        ],
      },
      {
        icon: MessageSquare,
        label: 'Leads & Enquiries',
        prompts: ['Any new leads today?', 'Reply to David Walsh — I can do next Tuesday'],
      },
    ],
  },
];

// Map action_type to icon + colour
function actionMeta(type: string): {
  icon: React.ElementType;
  color: string;
  bg: string;
  label: string;
} {
  const t = type?.toLowerCase() ?? '';
  if (t.includes('invoice') || t.includes('payment'))
    return { icon: Receipt, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Invoice' };
  if (t.includes('quote'))
    return { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Quote' };
  if (t.includes('email') || t.includes('message'))
    return { icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Message' };
  if (t.includes('cert') || t.includes('expiry') || t.includes('renewal'))
    return { icon: CalendarClock, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Cert' };
  if (t.includes('task'))
    return { icon: ListTodo, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Task' };
  if (t.includes('revoke') || t.includes('provision'))
    return { icon: Bot, color: 'text-white', bg: 'bg-white/[0.05]', label: 'System' };
  return { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Action' };
}

function ActivityCard({ action }: { action: AgentAction }) {
  const { icon: Icon, color, bg, label } = actionMeta(action.action_type);
  const success = !action.outcome || action.outcome === 'success';
  const timeAgo = formatDistanceToNow(parseISO(action.created_at), { addSuffix: true });

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0">
      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`${color}`} style={{ height: 15, width: 15 }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[10px] font-semibold ${color} ${bg} px-1.5 py-0.5 rounded`}>
            {label}
          </span>
        </div>
        <p className="text-sm text-white leading-snug">{action.description}</p>
        {action.customer_name && (
          <p className="text-xs text-white mt-0.5 truncate">{action.customer_name}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <Clock style={{ height: 10, width: 10 }} className="text-white" />
          <span className="text-[10px] text-white">{timeAgo}</span>
        </div>
      </div>
      {action.outcome && (
        <div className="shrink-0 mt-0.5">
          {success ? (
            <CheckCircle2 style={{ height: 14, width: 14 }} className="text-green-400/70" />
          ) : (
            <XCircle style={{ height: 14, width: 14 }} className="text-red-400/70" />
          )}
        </div>
      )}
    </div>
  );
}

export function BusinessAIDashboardView() {
  const { profile, whatsappNumber } = useBusinessAIProfile();
  const { actions, isLoading: activityLoading } = useAgentActivity(12);
  const { business, isLoading: dashLoading } = useDashboardData();
  const { counts: taskCounts, isLoading: tasksLoading } = useSparkTasks('all');
  const healthStatus = profile?.agent_health_status ?? 'healthy';
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  // Count actions from the last 7 days
  const weeklyActionCount = useMemo(() => {
    const sevenDaysAgo = subDays(new Date(), 7);
    return actions.filter((a) => isAfter(parseISO(a.created_at), sevenDaysAgo)).length;
  }, [actions]);

  const statsLoading = dashLoading || tasksLoading;

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto pb-24 space-y-5"
      >
        {/* Back button */}
        <motion.div variants={itemVariants} className="px-4 pt-4">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* ── 1. Hero — Agent Status ── */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-600/5" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/[0.08] blur-3xl rounded-full" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-400">
                      {healthStatus === 'healthy' ? 'Online' : healthStatus}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Hey {firstName}</h1>
                  <p className="text-sm text-white mt-1">Mate's got your back today</p>
                </div>
                <div className="p-3 rounded-2xl bg-amber-500/10">
                  <Zap className="h-7 w-7 text-amber-400" />
                </div>
              </div>

              {/* Message Mate — primary CTA */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/[0.08] border border-green-500/20">
                  <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                    <MessageCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white font-medium">Message Mate</div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {MATE_PHONE_DISPLAY}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold touch-manipulation h-9 shrink-0"
                  >
                    WhatsApp
                    <ExternalLink style={{ height: 12, width: 12 }} />
                  </button>
                </div>

                {/* User's connected number — secondary */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <Phone className="h-3.5 w-3.5 text-green-400 shrink-0" />
                  <span className="text-xs text-white">Your number:</span>
                  <span className="text-xs font-mono text-white">
                    {whatsappNumber ? maskPhone(whatsappNumber) : 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. Live Stats Strip ── */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Outstanding invoices */}
            <div
              className="rounded-xl p-3.5 border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl" />
              <div className="flex items-center gap-2 mb-1.5">
                <Receipt className="text-amber-400" style={{ height: 14, width: 14 }} />
                <span className="text-[11px] text-white">Outstanding</span>
              </div>
              {statsLoading ? (
                <div className="h-7 w-16 bg-white/[0.05] rounded animate-pulse" />
              ) : (
                <>
                  <div className="text-xl font-bold text-white">{business.unpaidInvoices}</div>
                  {business.overdueValue > 0 && (
                    <div className="text-[11px] text-amber-400 font-medium mt-0.5">
                      £{business.overdueValue.toLocaleString()} overdue
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Overdue invoices */}
            <div
              className="rounded-xl p-3.5 border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${business.overdueInvoices > 0 ? 'bg-red-500' : 'bg-green-500'}`}
              />
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle
                  className={business.overdueInvoices > 0 ? 'text-red-400' : 'text-green-400'}
                  style={{ height: 14, width: 14 }}
                />
                <span className="text-[11px] text-white">Overdue</span>
              </div>
              {statsLoading ? (
                <div className="h-7 w-10 bg-white/[0.05] rounded animate-pulse" />
              ) : (
                <div
                  className={`text-xl font-bold ${business.overdueInvoices > 0 ? 'text-red-400' : 'text-green-400'}`}
                >
                  {business.overdueInvoices}
                </div>
              )}
            </div>

            {/* Open quotes */}
            <div
              className="rounded-xl p-3.5 border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl" />
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="text-blue-400" style={{ height: 14, width: 14 }} />
                <span className="text-[11px] text-white">Open Quotes</span>
              </div>
              {statsLoading ? (
                <div className="h-7 w-10 bg-white/[0.05] rounded animate-pulse" />
              ) : (
                <>
                  <div className="text-xl font-bold text-white">{business.activeQuotes}</div>
                  {business.quoteValue > 0 && (
                    <div className="text-[11px] text-blue-400 font-medium mt-0.5">
                      {business.formattedQuoteValue} pipeline
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Tasks today */}
            <div
              className="rounded-xl p-3.5 border border-white/[0.06] relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-xl" />
              <div className="flex items-center gap-2 mb-1.5">
                <ListTodo className="text-amber-400" style={{ height: 14, width: 14 }} />
                <span className="text-[11px] text-white">Tasks Today</span>
              </div>
              {statsLoading ? (
                <div className="h-7 w-10 bg-white/[0.05] rounded animate-pulse" />
              ) : (
                <>
                  <div className="text-xl font-bold text-white">{taskCounts.today}</div>
                  {taskCounts.overdue > 0 && (
                    <div className="text-[11px] text-red-400 font-medium mt-0.5">
                      {taskCounts.overdue} overdue
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── 3. Activity Feed ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Recent Activity
            </h3>
            {weeklyActionCount > 0 && (
              <span className="text-[10px] text-white">
                {weeklyActionCount} action{weeklyActionCount !== 1 ? 's' : ''} this week
              </span>
            )}
          </div>

          <div className="glass-premium rounded-2xl px-4 py-1">
            {activityLoading ? (
              <div className="py-6 flex justify-center">
                <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              </div>
            ) : actions.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <Zap className="h-8 w-8 text-amber-400/20 mx-auto" />
                <p className="text-sm text-white">No activity yet — Mate's ready when you are</p>
                <button
                  type="button"
                  onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold touch-manipulation h-9"
                >
                  Send your first message
                  <ExternalLink style={{ height: 12, width: 12 }} />
                </button>
              </div>
            ) : (
              actions.map((action) => <ActivityCard key={action.id} action={action} />)
            )}
          </div>
        </motion.div>

        {/* ── 4. What to Ask Mate ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-5">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider px-1">
            What to ask Mate
          </h3>

          {askMateGroups.map(({ title, cards }) => (
            <div key={title} className="space-y-2.5">
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider px-1">
                {title}
              </div>
              <div className="space-y-2">
                {cards.map(({ icon: Icon, label, prompts }) => (
                  <div key={label} className="glass-premium rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Icon className="text-amber-400" style={{ height: 14, width: 14 }} />
                      </div>
                      <span className="text-sm font-semibold text-white">{label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {prompts.map((prompt) => (
                        <span
                          key={prompt}
                          className="inline-block text-[11px] text-white bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-1 leading-tight"
                        >
                          "{prompt}"
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── 5. Manage Subscription ── */}
        <motion.div variants={itemVariants} className="px-4 pt-2">
          <Link
            to="/electrician/subscriptions"
            className="flex items-center justify-center gap-2 py-3 text-sm text-white touch-manipulation h-11"
          >
            <Settings style={{ height: 14, width: 14 }} />
            Manage subscription
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
