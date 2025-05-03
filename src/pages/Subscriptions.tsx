
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight, Code } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Subscriptions = () => {
  // Get auth context values
  const { isTrialActive, trialEndsAt, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  
  // Calculate days remaining in trial
  const getDaysRemaining = () => {
    if (!trialEndsAt) return 0;
    
    const now = new Date();
    const diffTime = trialEndsAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Mock subscription tiers
  const subscriptions = {
    monthly: [
      {
        id: "apprentice-monthly",
        name: "Apprentice",
        price: "£3.99",
        period: "/month",
        description: "Essential resources for electrical apprentices",
        features: [
          "Complete learning resources",
          "Video lessons library",
          "Study materials",
          "Progress tracking",
          "Basic calculators",
        ],
        notIncluded: [
          "Advanced calculators",
          "Document templates",
          "Project management",
        ],
        popular: false,
        color: "bg-elec-gray",
      },
      {
        id: "electrician-monthly",
        name: "Electrician",
        price: "£5.99",
        period: "/month",
        description: "Enhanced tools for professional electricians",
        features: [
          "All Apprentice features",
          "Full calculator suite",
          "Invoice/estimate templates",
          "Project management tools",
          "Priority support",
        ],
        notIncluded: [
          "Employer dashboard",
        ],
        popular: true,
        color: "bg-elec-gray border-elec-yellow",
      },
      {
        id: "employer-monthly",
        name: "Employer",
        price: "£9.99",
        period: "/month",
        description: "Full suite for electrical business owners",
        features: [
          "All Electrician features",
          "Recruitment dashboard",
          "Job posting tools",
          "Team management",
          "Training oversight",
        ],
        notIncluded: [],
        popular: false,
        color: "bg-elec-gray",
        coming: true,
      },
    ],
    yearly: [
      {
        id: "apprentice-yearly",
        name: "Apprentice",
        price: "£39.99",
        period: "/year",
        description: "Essential resources for electrical apprentices",
        features: [
          "Complete learning resources",
          "Video lessons library",
          "Study materials",
          "Progress tracking",
          "Basic calculators",
        ],
        notIncluded: [
          "Advanced calculators",
          "Document templates",
          "Project management",
        ],
        popular: false,
        color: "bg-elec-gray",
        savings: "Save £7.89 compared to monthly",
      },
      {
        id: "electrician-yearly",
        name: "Electrician",
        price: "£59.99",
        period: "/year",
        description: "Enhanced tools for professional electricians",
        features: [
          "All Apprentice features",
          "Full calculator suite",
          "Invoice/estimate templates",
          "Project management tools",
          "Priority support",
        ],
        notIncluded: [
          "Employer dashboard",
        ],
        popular: true,
        color: "bg-elec-gray border-elec-yellow",
        savings: "Save £11.89 compared to monthly",
      },
      {
        id: "employer-yearly",
        name: "Employer",
        price: "£99.99",
        period: "/year",
        description: "Full suite for electrical business owners",
        features: [
          "All Electrician features",
          "Recruitment dashboard",
          "Job posting tools",
          "Team management",
          "Training oversight",
        ],
        notIncluded: [],
        popular: false,
        color: "bg-elec-gray",
        coming: true,
        savings: "Save £19.89 compared to monthly",
      },
    ],
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <p className="text-muted-foreground">
          Choose the plan that's right for your electrical career stage.
        </p>
      </div>

      {/* Current Subscription Status */}
      <Card className={`border-${isTrialActive ? 'elec-yellow' : 'red-500'}/20 bg-elec-gray`}>
        <CardHeader>
          <CardTitle>Your Current Plan</CardTitle>
          <CardDescription>
            {isTrialActive 
              ? `You're currently in the free trial period, ending in ${getDaysRemaining()} days.`
              : "Your free trial has expired. Please select a subscription plan to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Subscription Status</div>
              <div className="text-lg font-medium">{isTrialActive ? "Free Trial" : "Expired"}</div>
            </div>
            {isTrialActive && (
              <>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Expires In</div>
                  <div className="text-lg font-medium">{getDaysRemaining()} days</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Trial Features</div>
                  <div className="text-lg font-medium">Full Platform Access</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Development Mode Card */}
      <Card className="border-blue-500/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code size={20} />
            Development Mode
          </CardTitle>
          <CardDescription>
            Enable development mode to bypass subscription restrictions while building the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Status</div>
              <div className="text-lg font-medium">
                {isDevelopmentMode ? "Enabled" : "Disabled"}
              </div>
            </div>
            <Button 
              onClick={toggleDevelopmentMode}
              variant={isDevelopmentMode ? "destructive" : "default"}
              className={isDevelopmentMode ? "" : "bg-blue-600 hover:bg-blue-700"}
            >
              {isDevelopmentMode ? "Disable Development Mode" : "Enable Development Mode"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Choose a Plan</h2>
        
        <Tabs defaultValue="monthly" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-elec-gray border border-elec-yellow/20">
              <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
              <TabsTrigger value="yearly">Annual Billing</TabsTrigger>
            </TabsList>
          </div>

          {/* Monthly Plans */}
          <TabsContent value="monthly">
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptions.monthly.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border overflow-hidden relative ${
                    plan.popular ? "border-elec-yellow" : "border-elec-yellow/20"
                  } ${plan.color}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-elec-yellow text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  {plan.coming && (
                    <div className="absolute top-0 right-0 bg-elec-yellow/50 text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                      COMING SOON
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-elec-yellow mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-muted-foreground">
                          <X className="h-4 w-4 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      disabled={plan.coming}
                    >
                      {plan.coming ? "Coming Soon" : (
                        <>
                          Choose Plan
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Annual Plans */}
          <TabsContent value="yearly">
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptions.yearly.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border overflow-hidden relative ${
                    plan.popular ? "border-elec-yellow" : "border-elec-yellow/20"
                  } ${plan.color}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-elec-yellow text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  {plan.coming && (
                    <div className="absolute top-0 right-0 bg-elec-yellow/50 text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
                      COMING SOON
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                      {plan.savings && (
                        <div className="mt-1 text-xs text-elec-yellow">{plan.savings}</div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-elec-yellow mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-muted-foreground">
                          <X className="h-4 w-4 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      disabled={plan.coming}
                    >
                      {plan.coming ? "Coming Soon" : (
                        <>
                          Choose Plan
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
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
              ].map((faq, i) => (
                <div key={i} className="pb-4">
                  <h3 className="font-medium text-elec-yellow mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Our support team is ready to assist you with any questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline">Contact Support</Button>
            <Button variant="outline">View Billing FAQ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
