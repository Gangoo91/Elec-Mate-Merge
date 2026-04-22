import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Capacitor } from '@capacitor/core';

const SubscriptionFAQ = () => {
  const isNative = Capacitor.isNativePlatform();
  const platform = Capacitor.getPlatform();
  const storeName = platform === 'ios' ? 'Apple' : 'Google Play';

  const faqItems = [
    {
      q: 'What is included in the Apprentice plan?',
      a: 'Level 2, Level 3, AM2, HNC, MOET and Functional Skills courses · 500+ practice questions · 8 mock exams · 29 flashcard sets · 75 curated training videos · 75 electrical calculators · full BS 7671 A4:2026 study guide with interactive diagrams · OJT logbook with evidence upload and assessor sign-off · portfolio builder · EPA simulator · full study centre access (24 courses including CSCS, IPAF, PASMA, soft skills) · Ask Dave AI mentor · mental health hub.',
    },
    {
      q: 'What do I get with the Electrician plan?',
      a: 'Everything in Apprentice, plus 9 AI specialists (Circuit Designer, Cost Engineer, Installation, Commissioning, Maintenance, Health & Safety, Project Manager, Tutor and Voice AI) · 15 certificate types end-to-end (EICR, EIC, Minor Works, Solar PV, EV, BESS, Fire Alarm and more) · AI board scanner · full CRM and projects dashboard · Quote and Invoice builder with Stripe · time tracker → auto-invoice · expenses with OCR · live material pricing · RAMS generator · 13 upskilling courses · Xero / QuickBooks sync · Apple and Google Wallet cert passes.',
    },
    {
      q: 'What is Mate? (Early access)',
      a: 'Mate is your AI business partner on WhatsApp. You can chat, voice-note or send photos — and Mate talks back to you in voice too, hands-free. Send a photo of a consumer unit and Mate drafts the quote. Forward a customer email and Mate drafts your reply. Say "plan my day" and Mate returns a TSP-optimised route with weather. Morning brief at 7am. Quote follow-ups, invoice chasing, expenses synced to Xero, BS 7671 answers with regulation citations, and a full business-intelligence dashboard on demand.',
    },
    {
      q: 'What extra features do Employers get? (Early access)',
      a: 'Everything in Mate, plus team management with Elec-ID digital credentials · GPS worker tracking · timesheets · team chat · talent pool and job vacancies · Kanban board and Gantt timeline · job packs, progress logs, quality and snags · client portal · fleet and photo gallery · multi-user quotes, invoices and tenders · digital signatures · AI Smart Docs (Design Spec, Method Statement, Briefing Pack) · automations rule engine.',
    },
    {
      q: 'What is the College plan? (Early access)',
      a: 'The full college tutor dashboard for apprenticeship providers. Cohort and student management · tutor and support staff · bulk student invites · lesson plans and teaching resources · attendance registers · grading and portfolio review · Individual Learning Plans (ILPs) · EPA gateway tracking and readiness snapshots · IQA sampling, findings and standardisation meetings · workplace visits · compliance doc tracking · LTI 1.3 SSO for Canvas, Moodle and Blackboard. Pricing on request — tap Get in touch.',
    },
    {
      q: 'Can I switch between plans?',
      a: 'Yes, you can upgrade or downgrade your subscription at any time. When upgrading, you gain immediate access to new features. When downgrading, changes take effect at the end of your current billing period.',
    },
    {
      q: 'How does annual billing save me money?',
      a: 'Annual subscriptions save up to 17% compared to monthly. Apprentice £59.99/yr (vs £71.88 monthly) · Electrician £129.99/yr (vs £155.88 monthly) · Mate £299.99/yr (vs £359.88 monthly) · Employer £499.99/yr (vs £599.88 monthly).',
    },
    {
      q: 'What payment methods do you accept?',
      a: isNative
        ? `Payment is processed securely through ${storeName}. We also accept all major credit and debit cards via Stripe on the web.`
        : 'We accept all major credit and debit cards (Visa, Mastercard, American Express). Payments are securely processed through Stripe.',
    },
    {
      q: 'How can I cancel my subscription?',
      a: isNative
        ? `Manage or cancel your subscription in your ${platform === 'ios' ? 'Apple ID settings' : 'Google Play Store subscriptions'}. You keep access to premium features until the end of your current billing period.`
        : 'Tap "Manage billing" in your subscription card above. You keep access to premium features until the end of your current billing period.',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h2 className="text-lg sm:text-xl font-bold text-white">FAQ</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-1.5">
        {faqItems.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className={cn(
              'border border-white/[0.06] rounded-xl px-4 bg-white/[0.02]',
              'data-[state=open]:border-white/[0.12] data-[state=open]:bg-white/[0.03]',
              'transition-all duration-200'
            )}
          >
            <AccordionTrigger
              className={cn(
                'text-left text-sm text-white hover:text-white hover:no-underline',
                'py-3.5 min-h-[44px] touch-manipulation'
              )}
            >
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-white pb-3.5 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SubscriptionFAQ;
