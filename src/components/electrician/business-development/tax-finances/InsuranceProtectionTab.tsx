
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  MobileAccordion, 
  MobileAccordionContent, 
  MobileAccordionItem, 
  MobileAccordionTrigger 
} from "@/components/ui/mobile-accordion";
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Calculator, 
  FileText, 
  Shield,
  TrendingUp,
  PiggyBank,
  BookOpen,
  Target,
  CheckCircle2,
  Briefcase,
  Receipt,
  Building2,
  Users,
  CreditCard,
  Globe,
  GraduationCap,
  Lightbulb,
  Map,
  Network
} from "lucide-react";

const InsuranceProtectionTab = () => {
  const taxMetrics = [
    {
      metric: "Tax Efficiency Threshold",
      data: "£50,000",
      icon: <Calculator className="h-5 w-5 text-purple-400" />,
      detail: "annual profit"
    },
    {
      metric: "Corporation Tax Rates",
      data: "19% to 25%",
      icon: <CreditCard className="h-5 w-5 text-blue-400" />,
      detail: "Based on profit levels from April 2024"
    },
    {
      metric: "Personal Allowance",
      data: "£12,570",
      icon: <Users className="h-5 w-5 text-green-400" />,
      detail: "tax-free"
    },
    {
      metric: "Liability Protection",
      data: "Limited company advantage",
      icon: <Shield className="h-5 w-5 text-orange-400" />,
      detail: "Limited company advantage"
    }
  ];

  const taxSections = [
    {
      title: "Business Structure Analysis",
      icon: <Building2 className="h-5 w-5 text-purple-400" />,
      theme: "purple",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Choose the optimal business structure for your electrical contracting business. Consider liability protection, tax efficiency, administrative burden, and growth plans when selecting between sole trader, partnership, or limited company status."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Clock className="h-4 w-4" />,
          content: "Research options (Month 1), consult accountant and solicitor (Month 2), register new structure (Month 3), transfer business assets and contracts (Month 4), update all business documentation and banking arrangements."
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Limited companies offer liability protection, potential tax savings above £50k profit, enhanced credibility with larger clients, easier access to business finance, and clearer succession planning options."
        },
        {
          title: "Key Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Companies House registration, separate business bank account, director responsibilities compliance, annual accounts filing, corporation tax returns, payroll setup for director salary."
        },
        {
          title: "Tax Considerations",
          color: "yellow",
          icon: <Calculator className="h-4 w-4" />,
          content: "Corporation tax vs income tax rates, salary vs dividend optimization, National Insurance savings, VAT implications, business expense allowances, and timing of income recognition strategies."
        },
        {
          title: "Success Metrics",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Measure annual tax savings achieved, compliance costs vs savings, time efficiency in administration, client perception improvements, and access to new business opportunities."
        }
      ]
    },
    {
      title: "Website Development & SEO",
      icon: <Globe className="h-5 w-5 text-blue-400" />,
      theme: "blue",
      cards: [
        {
          title: "Strategy Overview",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Build a professional, SEO-optimised website that ranks locally and converts visitors to customers."
        },
        {
          title: "Implementation Timeline",
          color: "blue",
          icon: <Clock className="h-4 w-4" />,
          content: "• Week 1-2: Website design & development\n• Week 3: Content creation & SEO optimisation\n• Week 4: Testing & launch\n• Ongoing: Content updates & SEO maintenance"
        },
        {
          title: "Business Benefits",
          color: "green",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Increased online visibility, professional credibility, 24/7 lead generation, competitive advantage, and cost-effective marketing that works while you sleep."
        },
        {
          title: "Key Requirements",
          color: "orange",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Professional web design, mobile-responsive layout, local SEO optimization, Google My Business setup, customer testimonials, and clear contact information."
        },
        {
          title: "Technical Specifications",
          color: "yellow",
          icon: <Globe className="h-4 w-4" />,
          content: "Fast loading times (<3 seconds), SSL certificate, mobile-first design, local search optimization, contact forms, and integration with booking systems."
        },
        {
          title: "Performance Tracking",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Monitor website traffic, local search rankings, lead conversion rates, page loading speeds, and return on marketing investment through analytics tools."
        }
      ]
    },
    {
      title: "Business Fundamentals",
      icon: <BookOpen className="h-5 w-5 text-green-400" />,
      theme: "green",
      cards: [
        {
          title: "Legal Requirements",
          color: "purple",
          icon: <Shield className="h-4 w-4" />,
          content: "Part P compliance, Building Regulations notification, public liability insurance, electrical installation certificates, and professional indemnity cover for design work."
        },
        {
          title: "Qualification Standards",
          color: "blue",
          icon: <GraduationCap className="h-4 w-4" />,
          content: "18th Edition BS7671 qualification, inspection and testing certification, Part P registration with approved scheme, and ongoing CPD requirements for maintaining competency."
        },
        {
          title: "Insurance Essentials",
          color: "green",
          icon: <Shield className="h-4 w-4" />,
          content: "Public liability (£2m minimum), professional indemnity (£250k-£2m), employer liability if staff employed, tool insurance, and business interruption cover."
        },
        {
          title: "Financial Planning",
          color: "orange",
          icon: <Calculator className="h-4 w-4" />,
          content: "Cash flow forecasting, emergency fund (3-6 months expenses), equipment replacement planning, tax planning strategies, and pension contribution optimization."
        },
        {
          title: "Quality Standards",
          color: "yellow",
          icon: <Target className="h-4 w-4" />,
          content: "NICEIC or NAPIT membership, regular inspection and testing procedures, customer satisfaction monitoring, and continuous professional development tracking."
        },
        {
          title: "Growth Planning",
          color: "red",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Market analysis and expansion opportunities, staff recruitment planning, equipment investment strategies, and business structure optimization for tax efficiency."
        }
      ]
    },
    {
      title: "Financial Management",
      icon: <Calculator className="h-5 w-5 text-orange-400" />,
      theme: "orange",
      cards: [
        {
          title: "Cash Flow Control",
          color: "purple",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Implement 30-day payment terms, track outstanding invoices weekly, maintain 3-month operating expense buffer, and plan for seasonal variations in electrical work demand."
        },
        {
          title: "Expense Management",
          color: "blue",
          icon: <Receipt className="h-4 w-4" />,
          content: "Track all business expenses using digital receipts, categorize for tax purposes, monitor tool and equipment depreciation, and plan major purchases for optimal tax relief."
        },
        {
          title: "Pricing Strategy",
          color: "green",
          icon: <Calculator className="h-4 w-4" />,
          content: "Calculate hourly rates including all business costs, factor in profit margins, understand market rates, price different services appropriately, and review pricing annually."
        },
        {
          title: "Tax Optimization",
          color: "orange",
          icon: <FileText className="h-4 w-4" />,
          content: "Maximize business expense claims, plan equipment purchases for tax allowances, consider incorporation timing, optimize salary vs dividend strategy for limited companies."
        },
        {
          title: "Investment Planning",
          color: "yellow",
          icon: <PiggyBank className="h-4 w-4" />,
          content: "Plan for equipment upgrades, invest in efficiency tools, consider electric vehicle benefits, and build reserves for business expansion opportunities."
        },
        {
          title: "Performance Metrics",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Track profit margins by job type, monitor cash flow cycles, analyze customer payment patterns, and measure return on equipment investments."
        }
      ]
    },
    {
      title: "Client Relations",
      icon: <Users className="h-5 w-5 text-yellow-400" />,
      theme: "yellow",
      cards: [
        {
          title: "Customer Acquisition",
          color: "purple",
          icon: <Target className="h-4 w-4" />,
          content: "Develop referral programs, maintain online presence, join local business networks, offer emergency call-out services, and build relationships with property developers."
        },
        {
          title: "Service Excellence",
          color: "blue",
          icon: <Target className="h-4 w-4" />,
          content: "Arrive on time, provide clear quotes, explain work clearly, clean up thoroughly, follow up after completion, and exceed customer expectations consistently."
        },
        {
          title: "Communication Systems",
          color: "green",
          icon: <Globe className="h-4 w-4" />,
          content: "Professional phone manner, prompt email responses, clear written quotes, progress updates during work, and systematic follow-up procedures."
        },
        {
          title: "Complaint Resolution",
          color: "orange",
          icon: <AlertTriangle className="h-4 w-4" />,
          content: "Listen actively to concerns, respond quickly to issues, offer appropriate remedies, document all interactions, and learn from feedback to improve services."
        },
        {
          title: "Repeat Business",
          color: "yellow",
          icon: <TrendingUp className="h-4 w-4" />,
          content: "Maintain customer database, schedule regular maintenance contacts, offer service plans, provide seasonal reminders, and incentivize referrals."
        },
        {
          title: "Customer Feedback",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Request reviews and testimonials, monitor online reputation, respond to feedback professionally, and use insights to improve service delivery."
        }
      ]
    },
    {
      title: "Technical Excellence",
      icon: <Lightbulb className="h-5 w-5 text-red-400" />,
      theme: "red",
      cards: [
        {
          title: "Current Regulations",
          color: "purple",
          icon: <BookOpen className="h-4 w-4" />,
          content: "Stay current with BS7671 18th Edition, understand Building Regulations Part P, follow IET guidance notes, and maintain awareness of upcoming regulation changes."
        },
        {
          title: "Testing Procedures",
          color: "blue",
          icon: <CheckCircle2 className="h-4 w-4" />,
          content: "Proper use of testing equipment, accurate completion of certificates, understanding test results, maintaining calibrated instruments, and following safety procedures."
        },
        {
          title: "Installation Standards",
          color: "green",
          icon: <Lightbulb className="h-4 w-4" />,
          content: "Cable selection and routing, proper earthing systems, RCD protection requirements, consumer unit installation, and compliance with environmental conditions."
        },
        {
          title: "Safety Protocols",
          color: "orange",
          icon: <Shield className="h-4 w-4" />,
          content: "Safe isolation procedures, voltage testing, permit to work systems, personal protective equipment, and emergency response procedures."
        },
        {
          title: "Continuous Learning",
          color: "yellow",
          icon: <GraduationCap className="h-4 w-4" />,
          content: "Attend technical seminars, read industry publications, participate in manufacturer training, network with peers, and maintain competency records."
        },
        {
          title: "Quality Assurance",
          color: "red",
          icon: <Target className="h-4 w-4" />,
          content: "Self-inspection procedures, photograph completed work, maintain detailed records, handle warranty issues promptly, and continuously improve standards."
        }
      ]
    }
  ];


  const getCardClasses = (color: string) => {
    const colors = {
      purple: "border-l-4 border-l-purple-500 bg-purple-500/5",
      blue: "border-l-4 border-l-blue-500 bg-blue-500/5",
      green: "border-l-4 border-l-green-500 bg-green-500/5", 
      orange: "border-l-4 border-l-orange-500 bg-orange-500/5",
      yellow: "border-l-4 border-l-yellow-500 bg-yellow-500/5",
      red: "border-l-4 border-l-red-500 bg-red-500/5"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getCardIconClasses = (color: string) => {
    const colors = {
      purple: "text-purple-400",
      blue: "text-blue-400", 
      green: "text-green-400",
      orange: "text-orange-400",
      yellow: "text-yellow-400",
      red: "text-red-400"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="space-y-6">
      <Alert className="border-purple-400/50 bg-purple-400/10">
        <AlertTriangle className="h-4 w-4 text-purple-400" />
        <AlertDescription className="text-purple-400">
          Understanding business structure and tax implications can save thousands 
          in tax and protect your personal assets. Review annually as your business grows.
        </AlertDescription>
      </Alert>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {taxMetrics.map((item, index) => (
          <Card key={index} className="bg-elec-card/80 border-elec-border">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h3 className="font-medium text-xs md:text-sm text-white leading-tight">{item.metric}</h3>
              </div>
              <div className="space-y-1">
                <p className="text-lg md:text-xl font-bold text-white">{item.data}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-4">
        {taxSections.map((section, index) => (
          <MobileAccordionItem key={index} value={section.title} className="border border-elec-border rounded-lg bg-elec-card/50">
            <MobileAccordionTrigger 
              icon={section.icon}
              className="px-4 py-3 text-white hover:text-white/80"
            >
              <span className="text-base font-medium">{section.title}</span>
            </MobileAccordionTrigger>
            <MobileAccordionContent className="px-4 pb-4">
              <div className="grid gap-4 mt-4">
                {section.cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={`p-4 rounded-lg ${getCardClasses(card.color)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${getCardIconClasses(card.color)}`}>
                        {card.icon}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-medium text-white text-sm">{card.title}</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{card.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </div>
  );
};

export default InsuranceProtectionTab;
