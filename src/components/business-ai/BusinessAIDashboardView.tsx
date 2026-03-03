import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Wrench,
  Phone,
  Receipt,
  FileText,
  ListTodo,
  ClipboardCheck,
  BookOpen,
  BellRing,
  MessageSquare,
  Users,
  Send,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  Mail,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { useAgentActivity, AgentAction } from '@/hooks/useAgentActivity';
import { formatDistanceToNow, parseISO } from 'date-fns';

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
  const prefix = phone.slice(0, 3);
  const area = phone.slice(3, 7);
  return `${prefix} ${area} *** ***`;
}

const adminCapabilities = [
  { icon: BellRing, label: 'Daily briefing', desc: 'Tasks, diary & reminders every morning' },
  { icon: Receipt, label: 'Invoice chasing', desc: 'Follows up on unpaid invoices for you' },
  { icon: FileText, label: 'Quote drafting', desc: 'Send job details, get a draft quote back' },
  { icon: ListTodo, label: 'Task management', desc: 'Add, complete & review tasks via text' },
];

const siteCapabilities = [
  { icon: BookOpen, label: 'Regs queries', desc: "BS 7671 answers while you're on site" },
  { icon: ClipboardCheck, label: 'Cert tracking', desc: 'EICR & PAT renewal reminders' },
];

const clientCapabilities = [
  { icon: Users, label: 'Client comms', desc: 'Appointment confirmations & follow-ups' },
  { icon: MessageSquare, label: 'Lead handling', desc: 'New enquiries logged automatically' },
];

// Map action_type to icon + colour
function actionMeta(type: string): { icon: React.ElementType; color: string; bg: string } {
  const t = type?.toLowerCase() ?? '';
  if (t.includes('invoice') || t.includes('payment'))
    return { icon: Receipt, color: 'text-green-400', bg: 'bg-green-500/10' };
  if (t.includes('quote'))
    return { icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' };
  if (t.includes('email') || t.includes('message'))
    return { icon: Mail, color: 'text-purple-400', bg: 'bg-purple-500/10' };
  if (t.includes('cert') || t.includes('expiry') || t.includes('renewal'))
    return { icon: CalendarClock, color: 'text-amber-400', bg: 'bg-amber-500/10' };
  if (t.includes('task'))
    return { icon: ListTodo, color: 'text-amber-400', bg: 'bg-amber-500/10' };
  if (t.includes('revoke') || t.includes('provision'))
    return { icon: Bot, color: 'text-white/50', bg: 'bg-white/[0.05]' };
  return { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' };
}

function ActivityCard({ action }: { action: AgentAction }) {
  const { icon: Icon, color, bg } = actionMeta(action.action_type);
  const success = !action.outcome || action.outcome === 'success';
  const timeAgo = formatDistanceToNow(parseISO(action.created_at), { addSuffix: true });

  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0">
      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`${color}`} style={{ height: 15, width: 15 }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white leading-snug">{action.description}</p>
        {action.customer_name && (
          <p className="text-xs text-white/50 mt-0.5 truncate">{action.customer_name}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <Clock style={{ height: 10, width: 10 }} className="text-white/25" />
          <span className="text-[10px] text-white/30">{timeAgo}</span>
        </div>
      </div>
      {action.outcome && (
        <div className="shrink-0 mt-0.5">
          {success
            ? <CheckCircle2 style={{ height: 14, width: 14 }} className="text-green-400/70" />
            : <XCircle style={{ height: 14, width: 14 }} className="text-red-400/70" />
          }
        </div>
      )}
    </div>
  );
}

export function BusinessAIDashboardView() {
  const { profile, whatsappNumber } = useBusinessAIProfile();
  const { actions, isLoading: activityLoading } = useAgentActivity(12);
  const healthStatus = profile?.agent_health_status ?? 'healthy';
  const firstName = profile?.full_name?.split(' ')[0] || 'there';

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

        {/* Header — warm greeting, not robotic */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-600/5" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/[0.08] blur-3xl rounded-full" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-start justify-between mb-3">
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
                  <Wrench className="h-7 w-7 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp connection card */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="glass-premium rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/10">
                <Phone className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">WhatsApp Connected</div>
                <div className="text-xs font-mono text-white mt-0.5">
                  {whatsappNumber ? maskPhone(whatsappNumber) : 'Not connected'}
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
        </motion.div>

        {/* Message Mate CTA */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600/20 via-green-500/15 to-emerald-600/20 border border-green-500/20">
            <div className="p-5 text-center">
              <Send className="h-6 w-6 text-green-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white mb-1">Message Mate Anytime</h3>
              <p className="text-sm text-white max-w-xs mx-auto">
                Just open WhatsApp and text Mate. Ask about jobs, chase invoices, check regs —
                whatever you need.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="px-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Recent Activity
            </h3>
            {actions.length > 0 && (
              <span className="text-[10px] text-white/30">{actions.length} actions</span>
            )}
          </div>

          <div className="glass-premium rounded-2xl px-4 py-1">
            {activityLoading ? (
              <div className="py-6 flex justify-center">
                <div className="w-5 h-5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              </div>
            ) : actions.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Zap className="h-8 w-8 text-white/10 mx-auto" />
                <p className="text-sm text-white/30">Mate hasn't done anything yet</p>
                <p className="text-xs text-white/20">Send a WhatsApp to get started</p>
              </div>
            ) : (
              actions.map((action) => (
                <ActivityCard key={action.id} action={action} />
              ))
            )}
          </div>
        </motion.div>

        {/* Capabilities — grouped by context */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          {/* Admin */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider px-1">
              Running Your Business
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {adminCapabilities.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-premium rounded-xl p-3">
                  <Icon className="h-4 w-4 text-amber-400 mb-2" />
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="text-xs text-white mt-0.5 leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* On site */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider px-1">
              On Site
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {siteCapabilities.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-premium rounded-xl p-3">
                  <Icon className="h-4 w-4 text-amber-400 mb-2" />
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="text-xs text-white mt-0.5 leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider px-1">
              Your Clients
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {clientCapabilities.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-premium rounded-xl p-3">
                  <Icon className="h-4 w-4 text-amber-400 mb-2" />
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="text-xs text-white mt-0.5 leading-snug">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
