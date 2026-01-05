
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const SubscriptionFAQ = () => {
  const faqItems = [
    {
      q: "What is included in Desktop Price?",
      a: "Desktop Price gives you complete access to all learning resources including the Study Centre (AM2, HNC, BS 7671), all electrical calculators, Quote and Invoice Builder, EIC/EICR forms, Installation Planner, live material pricing, fault finding assistant, CV Builder, and regulation search tools."
    },
    {
      q: "What extra features do Employers get?",
      a: "Employers get everything in Desktop Price plus the full Employer Dashboard with team management for up to 5 users, job board and assignments, Finance Hub, Safety Hub (RAMS, Incidents), Talent Pool and Recruitment, Timesheets and Leave Management, and Client Portal access."
    },
    {
      q: "What is Enterprise pricing?",
      a: "Enterprise is designed for businesses with 5+ employees. It includes everything in Employer plus unlimited team members, a dedicated account manager, custom onboarding, volume discounts for your electricians, priority support, API access, and custom integrations. Contact us at info@elec-mate.com for a custom quote."
    },
    {
      q: "Can I switch between plans?",
      a: "Yes, you can upgrade or downgrade your subscription at any time. When upgrading, you will gain immediate access to new features. When downgrading, changes take effect at the end of your current billing period."
    },
    {
      q: "How do team discounts work?",
      a: "When you subscribe to an Employer or Enterprise plan, your team members can access Desktop Price features at a discounted rate. Contact us at info@elec-mate.com to learn more about team pricing options."
    },
    {
      q: "How does annual billing save me money?",
      a: "Annual subscriptions offer up to 17% savings compared to monthly billing. Desktop Price is just 69.99 pounds per year (vs 83.88 if paid monthly), and Employer is 299.99 pounds per year (vs 359.88 if paid monthly)."
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-white/10 rounded-xl px-6 bg-elec-gray/50 backdrop-blur-sm data-[state=open]:border-elec-yellow/30"
          >
            <AccordionTrigger className="text-left text-foreground hover:text-elec-yellow hover:no-underline py-5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 pb-5 leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SubscriptionFAQ;
