import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    q: "What is included in the Apprentice plan?",
    a: "The Apprentice plan gives you access to 2,000+ practice questions, AM2 exam preparation, Level 2 & 3 apprentice courses, BS 7671 18th Edition guides, 50+ electrical calculators, OJT logbook tracking, flashcards & mock exams, and progress tracking."
  },
  {
    q: "What do I get with the Electrician plan?",
    a: "The Electrician plan includes everything in Apprentice plus 8 AI Specialist Agents, the full Inspection & Testing suite, AI board scanner, Quote & Invoice Builder, live material pricing, RAMS generator, and customer management."
  },
  {
    q: "What extra features do Employers get?",
    a: "The Employer plan includes everything in Electrician plus team GPS & job tracking, team management for up to 5 users, job packs & assignments, timesheets & scheduling, Safety Hub & incidents, Finance Hub & reporting, and talent pool access."
  },
  {
    q: "Can I switch between plans?",
    a: "Yes, you can upgrade or downgrade your subscription at any time. When upgrading, you will gain immediate access to new features. When downgrading, changes take effect at the end of your current billing period."
  },
  {
    q: "How does annual billing save me money?",
    a: "Annual subscriptions offer significant savings compared to monthly billing. Apprentice is just £49.99 per year (vs £59.88 if paid monthly), and Electrician is £99.99 per year (vs £119.88 if paid monthly)."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards including Visa, Mastercard, and American Express. Payments are securely processed through Stripe."
  },
  {
    q: "How can I cancel my subscription?",
    a: "You can cancel your subscription at any time from your account settings or by contacting support. You will continue to have access to premium features until the end of your current billing period."
  }
];

const SubscriptionFAQ = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h2 className="text-lg sm:text-xl font-bold text-foreground">FAQ</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-1.5">
        {faqItems.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className={cn(
              "border border-white/[0.06] rounded-xl px-4 bg-white/[0.02]",
              "data-[state=open]:border-white/[0.12] data-[state=open]:bg-white/[0.03]",
              "transition-all duration-200"
            )}
          >
            <AccordionTrigger className={cn(
              "text-left text-sm text-foreground/90 hover:text-foreground hover:no-underline",
              "py-3.5 min-h-[44px] touch-manipulation"
            )}>
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-white/60 pb-3.5 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SubscriptionFAQ;
