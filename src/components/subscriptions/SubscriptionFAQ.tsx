
import { Card, CardContent } from "@/components/ui/card";

const SubscriptionFAQ = () => {
  const faqItems = [
    {
      q: "How does the 7-day free trial work?",
      a: "Our 7-day free trial gives you full access to all ElecMate features with no commitment. You can cancel anytime during the trial and won't be charged."
    },
    {
      q: "Can I switch between subscription tiers?",
      a: "Yes, you can upgrade or downgrade your subscription at any time. When upgrading, you'll gain immediate access to new features. When downgrading, changes take effect at the end of your current billing period."
    },
    {
      q: "How does the yearly billing option save me money?",
      a: "Annual subscriptions offer significant savings compared to monthly billing, effectively giving you about 2 months free."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept major credit and debit cards, including Visa, Mastercard, and American Express."
    },
    {
      q: "How can I cancel my subscription?",
      a: "You can cancel your subscription at any time through your account settings. Access to premium features will continue until the end of your current billing period."
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
      
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <div key={i} className="pb-4">
                <h3 className="font-medium text-elec-yellow mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionFAQ;
