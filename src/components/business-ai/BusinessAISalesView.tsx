import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Receipt,
  FileText,
  ListTodo,
  Users,
  ClipboardCheck,
  BookOpen,
  BellRing,
  Wrench,
  Send,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { stripePrices } from '@/data/stripePrices';

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

// Conversation-style "day in the life" moments
const dayMoments = [
  {
    time: '7:00 AM',
    label: 'Morning briefing',
    message:
      "Morning! You've got 3 jobs today. Mrs Chen's EICR is due, and that quote for the Hendersons is still outstanding. Want me to chase it?",
    icon: BellRing,
  },
  {
    time: '9:30 AM',
    label: 'On site',
    message:
      "What's the max Zs for a B32 RCBO on a TN-C-S system? ... Reg 411.4.4 says 0.27\u03A9. Here's the full table if you need it.",
    icon: BookOpen,
  },
  {
    time: '12:15 PM',
    label: 'New enquiry',
    message:
      "New lead from your website — David Walsh needs a full rewire in Chorlton. I've replied to confirm you'll get back to him today. Want me to draft a quote?",
    icon: MessageSquare,
  },
  {
    time: '3:45 PM',
    label: 'Invoice chasing',
    message:
      "Just a heads up — that £2,400 invoice to Parker & Sons is 14 days overdue. I've sent a polite follow-up. Want me to call them tomorrow if no response?",
    icon: Receipt,
  },
  {
    time: '5:30 PM',
    label: 'End of day',
    message:
      "Jobs logged, timesheets updated. Mrs Chen's EICR has been filed. Tomorrow you've got the Henderson rewire starting at 8. Have a good evening!",
    icon: CheckCircle,
  },
];

const features = [
  {
    icon: BellRing,
    title: 'Daily briefings',
    desc: 'Tasks, appointments & reminders every morning',
  },
  { icon: Receipt, title: 'Invoice chasing', desc: 'Automatic follow-ups on unpaid invoices' },
  { icon: FileText, title: 'Quote drafting', desc: 'Send job details, get a quote drafted' },
  { icon: ListTodo, title: 'Task management', desc: 'Manage your to-do list via text' },
  { icon: Users, title: 'Client comms', desc: 'Confirmations & follow-ups handled' },
  { icon: ClipboardCheck, title: 'Cert tracking', desc: 'EICR & PAT renewal reminders' },
  { icon: BookOpen, title: 'Regs on site', desc: 'BS 7671 answers while you work' },
  { icon: MessageSquare, title: 'Lead handling', desc: 'New enquiries logged & responded to' },
];

export function BusinessAISalesView() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const priceId =
        billing === 'monthly' ? stripePrices.monthly.business_ai : stripePrices.yearly.business_ai;
      const planId = billing === 'monthly' ? 'business-ai-monthly' : 'business-ai-yearly';

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode: 'subscription', planId },
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        toast({
          title: 'Redirecting to checkout',
          description: 'Opening secure Stripe checkout page.',
        });
        const newWindow = window.open(data.url, '_blank');
        if (!newWindow || newWindow.closed) {
          setTimeout(() => {
            window.location.href = data.url;
          }, 1000);
        }
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const message = err instanceof Error ? err.message : 'Please try again.';
      toast({
        title: 'Checkout failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const monthlyPrice = '£29.99';
  const yearlyPrice = '£299.99';
  const yearlySaving = '£59.89';

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto pb-24 space-y-6"
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

        {/* Hero — warm, human, not robotic */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-600/5" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/[0.08] blur-3xl rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-yellow-500/[0.06] blur-3xl rounded-full" />
            <div className="relative p-6 sm:p-8 text-center">
              <div className="inline-flex p-3.5 rounded-2xl bg-amber-500/10 mb-5">
                <Wrench className="h-9 w-9 text-amber-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Stay on the tools.
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Let Mate run the office.
                </span>
              </h1>
              <p className="text-base text-white max-w-sm mx-auto leading-relaxed">
                Mate is your business assistant on WhatsApp. Handles invoicing, scheduling, client
                comms, regs queries and more — so you never have to stop what you're doing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social proof line */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="text-center py-2">
            <p className="text-sm text-white">Built by electricians, for electricians</p>
          </div>
        </motion.div>

        {/* A Day with Mate — conversational timeline */}
        <motion.div variants={itemVariants} className="px-4 space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />A Day with Mate
          </h2>

          <div className="space-y-3">
            {dayMoments.map(({ time, label, message, icon: Icon }, i) => (
              <div key={i} className="glass-premium rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <Clock className="h-3 w-3 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">{time}</span>
                  <span className="text-xs text-white">{label}</span>
                </div>
                <div className="px-4 pb-3">
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-amber-500/10">
                      <Icon className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <p className="text-sm text-white leading-relaxed italic">"{message}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features grid — compact 2-col */}
        <motion.div variants={itemVariants} className="px-4 space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Everything Mate Handles
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-premium rounded-xl p-3">
                <Icon className="h-4 w-4 text-amber-400 mb-2" />
                <div className="text-sm font-medium text-white">{title}</div>
                <div className="text-xs text-white mt-0.5 leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div variants={itemVariants} className="px-4 space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            How It Works
          </h2>
          <div className="space-y-2">
            {[
              { step: '1', text: 'Subscribe to the Business AI plan' },
              { step: '2', text: 'Connect your WhatsApp number' },
              { step: '3', text: "Start texting Mate — that's it" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-center gap-3 glass-premium rounded-xl p-3">
                <div className="h-7 w-7 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-amber-400">{step}</span>
                </div>
                <span className="text-sm font-medium text-white">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing — visible but not purchasable yet */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Pricing
          </h2>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-1 p-1 rounded-xl bg-white/[0.05]">
            <button
              onClick={() => setBilling('monthly')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                billing === 'monthly' ? 'bg-amber-500 text-black' : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                billing === 'yearly' ? 'bg-amber-500 text-black' : 'text-white'
              }`}
            >
              Yearly
            </button>
          </div>

          {/* Price card */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/5" />
            <div className="relative glass-premium rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {billing === 'monthly' ? monthlyPrice : yearlyPrice}
              </div>
              <div className="text-sm text-white">
                {billing === 'monthly' ? 'per month' : 'per year'}
              </div>
              {billing === 'yearly' && (
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                  Save {yearlySaving} vs monthly
                </div>
              )}
              <p className="text-xs text-white mt-3">Includes everything in the Electrician plan</p>
            </div>
          </div>

          {/* Subscribe CTA */}
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full h-12 touch-manipulation bg-amber-500 hover:bg-amber-600 active:bg-amber-700 active:scale-[0.98] text-black font-semibold text-base rounded-xl transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : (
              'Start 7-Day Free Trial'
            )}
          </Button>
          <p className="text-xs text-white text-center">
            Cancel anytime during your trial. No charge until it ends.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
