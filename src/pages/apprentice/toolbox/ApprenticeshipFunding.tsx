
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PoundSterling,
  Building,
  Users,
  GraduationCap,
  FileText,
  Calculator,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  Shield,
  Clock,
  Target,
  TrendingUp,
  Briefcase,
  Phone,
  Mail,
  Star,
  Zap,
  Award,
  Calendar,
  Percent,
  Banknote,
  CircleDollarSign,
  HandCoins,
  Landmark
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeshipFunding = () => {
  const [activeTab, setActiveTab] = useState("models");
  const isMobile = useIsMobile();

  const fundingModels = [
    {
      title: "Apprenticeship Levy",
      subtitle: "Large Employers",
      description: "Employers with annual pay bill over £3 million contribute 0.5% into a digital apprenticeship account. These funds can only be used for apprenticeship training.",
      eligibility: "Companies with £3m+ annual payroll",
      amount: "100% funded from levy account",
      icon: Landmark,
      color: "blue",
      keyPoints: [
        "0.5% of payroll contributed monthly",
        "Government adds 10% top-up",
        "Funds expire after 24 months if unused",
        "Can transfer up to 50% to other employers"
      ],
      examples: [
        "Large construction companies",
        "National electrical contractors",
        "Local authorities",
        "NHS Trusts"
      ]
    },
    {
      title: "Government Co-Investment",
      subtitle: "Small & Medium Businesses",
      description: "For employers without a levy account, the government pays 95% of training costs. The employer only contributes 5% - making apprenticeships highly affordable.",
      eligibility: "SMEs with payroll under £3 million",
      amount: "95% government / 5% employer",
      icon: HandCoins,
      color: "green",
      keyPoints: [
        "Only 5% employer contribution required",
        "Maximum £1,050 for Level 3 Electrical",
        "100% funded if apprentice aged 16-21*",
        "Easy monthly payment plans available"
      ],
      examples: [
        "Local electrical contractors",
        "Small family businesses",
        "Sole traders with employees",
        "Start-up companies"
      ]
    },
    {
      title: "Levy Transfer",
      subtitle: "Any Receiving Employer",
      description: "Large employers can transfer their unused levy funds to smaller businesses. This means SMEs can get 100% funded apprenticeships through levy transfers.",
      eligibility: "Any employer receiving transfer",
      amount: "100% funded via transfer",
      icon: CircleDollarSign,
      color: "purple",
      keyPoints: [
        "Transfers are free for receiving employer",
        "No limit on number of transfers",
        "Large employers can build relationships",
        "Growing pool of available transfers"
      ],
      examples: [
        "Supply chain partners",
        "Industry associations",
        "Regional transfer schemes",
        "Training provider networks"
      ]
    }
  ];

  const additionalPayments = [
    {
      category: "Age-Related Incentive Payments",
      description: "Additional payments available for younger apprentices",
      icon: Users,
      color: "blue",
      payments: [
        { name: "16-18 Year Old Apprentice", amount: "£1,000", recipient: "£500 to Employer + £500 to Training Provider", timing: "After 90 days" },
        { name: "19-24 with EHC Plan or Care Leaver", amount: "£1,000", recipient: "£500 to Employer + £500 to Training Provider", timing: "After 90 days" }
      ]
    },
    {
      category: "CITB Grants (Construction Industry)",
      description: "Available to CITB-registered employers in construction",
      icon: Building,
      color: "orange",
      payments: [
        { name: "Year 1 Attendance Grant", amount: "£2,500", recipient: "Employer", timing: "Annually on anniversary" },
        { name: "Year 2 Attendance Grant", amount: "£2,500", recipient: "Employer", timing: "Annually on anniversary" },
        { name: "Year 3 Attendance Grant", amount: "£2,500", recipient: "Employer", timing: "Annually on anniversary" },
        { name: "Year 4 Attendance Grant", amount: "£2,500", recipient: "Employer", timing: "Annually on anniversary" },
        { name: "Completion Achievement Bonus", amount: "£3,500", recipient: "Employer", timing: "On qualification completion" }
      ],
      totalPotential: "£13,500"
    }
  ];

  const otherGrants = [
    { name: "JIB Training Grant", amount: "Up to £500", eligibility: "JIB-registered contractors", link: "jib.org.uk" },
    { name: "ECA Training Support", amount: "Varies", eligibility: "ECA member companies", link: "eca.co.uk" },
    { name: "Local Authority Grants", amount: "Varies by area", eligibility: "Check your local council", link: "gov.uk" },
    { name: "Regional Skills Fund", amount: "Up to £1,000", eligibility: "Certain regions only", link: "Check regional website" }
  ];

  const faqs = [
    {
      question: "Who pays for my apprenticeship training?",
      answer: "Training costs are covered by either the employer's Apprenticeship Levy (for large companies) or shared between the employer (5%) and government (95%) for smaller businesses. You should never have to pay anything towards your training - this is protected by law.",
      category: "Costs"
    },
    {
      question: "What does the funding actually cover?",
      answer: "Apprenticeship funding covers: training provider fees, End Point Assessment costs, and learning materials from your provider. It does NOT cover: your wages, travel expenses, work equipment, uniforms, or additional qualifications outside the apprenticeship standard.",
      category: "Coverage"
    },
    {
      question: "What is the funding band for electrical apprenticeships?",
      answer: "The Level 3 Installation Electrician/Maintenance Electrician standard has a maximum funding band of £21,000. This is the maximum amount the government will contribute towards your training over the full apprenticeship duration. Most training costs fall within this band.",
      category: "Amounts"
    },
    {
      question: "Can my employer claim CITB grants?",
      answer: "If your employer is registered with CITB (Construction Industry Training Board) and pays the CITB levy, they may be able to claim grants up to £13,500 over your apprenticeship (£2,500 per year plus £3,500 completion bonus). Ask your employer if they're CITB registered.",
      category: "Grants"
    },
    {
      question: "What if I'm over 25?",
      answer: "Age doesn't affect your eligibility for apprenticeship funding - you can start an apprenticeship at any age. However, the additional £1,000 incentive payments are only available for apprentices aged 16-18, or 19-24 with an Education Health Care plan or care leaver status.",
      category: "Eligibility"
    },
    {
      question: "Can I be asked to pay for my training?",
      answer: "Absolutely not. Apprentices should NEVER be asked to contribute towards training costs - this is against funding rules and illegal. If an employer asks you to pay, report this immediately to ESFA (complaints.esfa@education.gov.uk) or call the National Apprenticeship Helpline.",
      category: "Rights"
    },
    {
      question: "What happens if I change employers?",
      answer: "Your apprenticeship can continue with a new employer as long as they agree to take over your training. The funding transfers with you. There may be a short gap, but your training provider will help coordinate the handover and ensure continuity.",
      category: "Changes"
    },
    {
      question: "How is the funding paid?",
      answer: "The employer pays the training provider, not you. For levy-payers, funds are drawn from their digital account. For co-investment, the employer pays their 5% and claims 95% back from government. You never see or handle the funding directly.",
      category: "Process"
    },
    {
      question: "What if my employer goes out of business?",
      answer: "If your employer ceases trading, your training provider will help you find a new employer to complete your apprenticeship. The National Apprenticeship Service can also help match you with employers. Your training record and progress are protected.",
      category: "Protection"
    },
    {
      question: "Are there any hidden costs I should know about?",
      answer: "Some things aren't covered by funding: travel to college (though some employers contribute), work boots (some employers provide), textbooks (most are provided), and union memberships (optional). Ask your employer what they provide before starting.",
      category: "Costs"
    }
  ];

  const employerROI = {
    costs: [
      { item: "Training contribution (5%)", amount: "£1,050", note: "One-time over 4 years" },
      { item: "Apprentice wages (4 years)", amount: "~£64,000", note: "Progressive increase" },
      { item: "Supervision time", amount: "Variable", note: "Part of normal work" }
    ],
    returns: [
      { item: "CITB grants", amount: "-£13,500", note: "If registered" },
      { item: "Age incentive (if applicable)", amount: "-£1,000", note: "16-18 year olds" },
      { item: "Productive work", amount: "Significant", note: "From Year 2 onwards" },
      { item: "Qualified electrician", amount: "£40k+ value", note: "No recruitment costs" }
    ]
  };

  const renderFundingModelsTab = () => (
    <div className="space-y-6">
      {/* Funding Overview Banner */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-orange-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-elec-yellow/20 rounded-xl flex-shrink-0">
              <PoundSterling className="h-8 w-8 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Understanding Your Funding</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Apprenticeship funding in England is managed through the Education and Skills Funding Agency (ESFA).
                The type of funding depends on your employer's size. Either way,
                <span className="text-green-400 font-semibold"> you should never pay anything towards your training</span>.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Funding Band", value: "£21,000", sublabel: "Level 3 Electrical" },
              { label: "Your Cost", value: "£0", sublabel: "Always free for you" },
              { label: "Max Duration", value: "4 Years", sublabel: "Fully funded" },
              { label: "CITB Grants", value: "£13,500", sublabel: "If eligible" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
                <div className="text-elec-yellow text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Three Funding Models */}
      <div className="grid gap-6 lg:grid-cols-3">
        {fundingModels.map((model, index) => (
          <Card key={index} className={`border-${model.color}-500/30 bg-${model.color}-500/5 hover:border-${model.color}-500/50 transition-all`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-${model.color}-500/20 rounded-lg`}>
                  <model.icon className={`h-6 w-6 text-${model.color}-400`} />
                </div>
                <div>
                  <CardTitle className={`text-lg text-${model.color}-400`}>{model.title}</CardTitle>
                  <p className="text-white/60 text-xs">{model.subtitle}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/80 text-sm">{model.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/5 border border-white/10 rounded">
                  <span className="text-white/70">Eligibility:</span>
                  <span className="text-white text-xs">{model.eligibility}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 border border-white/10 rounded">
                  <span className="text-white/70">Funding:</span>
                  <Badge className={`bg-${model.color}-500/20 text-${model.color}-400 text-xs`}>{model.amount}</Badge>
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-white text-sm mb-2">Key Points:</h5>
                <ul className="space-y-1">
                  {model.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-3">
                <h5 className="font-semibold text-white/70 text-xs mb-2">Common Examples:</h5>
                <div className="flex flex-wrap gap-1">
                  {model.examples.map((ex, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-white/60 border-white/20">
                      {ex}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Funding Band Detail */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Funding Band: Level 3 Electrical Installation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 p-5 rounded-xl border border-elec-yellow/30">
              <h3 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <PoundSterling className="h-5 w-5" />
                Maximum Funding
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">£21,000</div>
              <p className="text-white/70 text-sm">
                This is the maximum amount the government will contribute towards your training
                over the full 4-year apprenticeship duration.
              </p>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">You pay nothing</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-5 rounded-xl border border-white/15">
              <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                What Funding Covers
              </h3>
              <ul className="space-y-3">
                {[
                  { item: "Training provider fees", covered: true },
                  { item: "End Point Assessment costs", covered: true },
                  { item: "Learning materials from provider", covered: true },
                  { item: "Assessor visits and reviews", covered: true },
                  { item: "Wages & salary", covered: false },
                  { item: "Travel to college", covered: false }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    {item.covered ? (
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    )}
                    <span className={item.covered ? "text-white/90" : "text-white/50 line-through"}>
                      {item.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Which Applies to Me */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Which Funding Model Applies to Me?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-white/80 text-sm">
              You don't need to worry about which funding model applies - your employer and training provider
              handle this. Here's how to find out:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { step: "1", action: "Ask your employer", detail: "They'll know if they pay the levy" },
                { step: "2", action: "Check with training provider", detail: "They manage all funding paperwork" },
                { step: "3", action: "Confirm it's free for you", detail: "You should never pay anything" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm">{item.action}</h5>
                    <p className="text-white/60 text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderGrantsTab = () => (
    <div className="space-y-6">
      {/* Total Potential Funding Banner */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/15 via-green-500/10 to-emerald-500/5">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-white/80 text-sm mb-2">Total Potential Additional Funding</h3>
            <div className="text-5xl sm:text-6xl font-bold text-green-400 mb-2">£14,500+</div>
            <p className="text-white/70 text-sm">
              Available to eligible employers over a 4-year electrical apprenticeship
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { source: "CITB Grants", amount: "£13,500" },
              { source: "Age Incentive", amount: "£1,000" },
              { source: "Other Grants", amount: "Varies" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-xl font-bold text-white">{item.amount}</div>
                <div className="text-white/60 text-xs">{item.source}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grant Categories */}
      {additionalPayments.map((category, index) => (
        <Card key={index} className={`border-${category.color}-500/20 bg-white/5`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-${category.color}-500/20 rounded-lg`}>
                <category.icon className={`h-6 w-6 text-${category.color}-400`} />
              </div>
              <div>
                <CardTitle className={`text-${category.color}-400`}>{category.category}</CardTitle>
                <p className="text-white/60 text-sm">{category.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.payments.map((payment, pIndex) => (
                <div key={pIndex} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{payment.name}</h4>
                    <p className="text-white/60 text-xs">Paid to: {payment.recipient}</p>
                    <p className="text-white/50 text-xs">Timing: {payment.timing}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 text-lg sm:text-xl px-4 py-2 w-fit">
                    {payment.amount}
                  </Badge>
                </div>
              ))}
            </div>

            {category.totalPotential && (
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/20 to-orange-500/5 rounded-lg border border-orange-500/30">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Total Potential CITB Funding:</span>
                  <span className="text-3xl font-bold text-orange-400">{category.totalPotential}</span>
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Over a 4-year apprenticeship (£2,500 × 4 years + £3,500 completion bonus)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* CITB Important Info */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Info className="h-5 w-5" />
            CITB Grants - Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 text-sm">
            CITB grants are separate from apprenticeship funding and only available to employers
            who are registered with CITB and pay the construction industry levy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h5 className="font-semibold text-white mb-2">Eligibility Requirements:</h5>
              <ul className="space-y-1 text-sm">
                {[
                  "Employer registered with CITB",
                  "Paying CITB levy",
                  "Apprentice on approved programme",
                  "Claims submitted on time"
                ].map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h5 className="font-semibold text-white mb-2">How to Claim:</h5>
              <ul className="space-y-1 text-sm">
                {[
                  "Log into CITB website",
                  "Submit grant claim form",
                  "Provide apprentice details",
                  "Payment within 28 days"
                ].map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80">
                    <span className="text-orange-400 font-bold text-xs">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-orange-500/30 hover:bg-orange-500/10 text-orange-400"
            onClick={() => window.open('https://www.citb.co.uk/levy-grants-and-funding/grants-fund/', '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit CITB Grants Portal
          </Button>
        </CardContent>
      </Card>

      {/* Other Grants */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Other Industry Grants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm mb-4">
            Additional grants may be available depending on your employer's memberships and location:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherGrants.map((grant, idx) => (
              <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-semibold text-white text-sm">{grant.name}</h5>
                  <Badge variant="outline" className="text-purple-400 border-purple-400/30 text-xs">
                    {grant.amount}
                  </Badge>
                </div>
                <p className="text-white/60 text-xs">{grant.eligibility}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployerTab = () => (
    <div className="space-y-6">
      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Building className="h-5 w-5 text-elec-yellow" />
            Information for Your Employer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm mb-4">
            This section provides information you can share with employers who may be unfamiliar with
            apprenticeship funding. Use it when discussing your apprenticeship with potential or current employers.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-white/70 border-white/20">
              <FileText className="h-4 w-4 mr-2" />
              Share this page
            </Button>
            <Button variant="outline" size="sm" className="text-white/70 border-white/20">
              <Mail className="h-4 w-4 mr-2" />
              Email summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Levy vs Non-Levy Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              Levy-Paying Employers
            </CardTitle>
            <p className="text-white/60 text-sm">Pay bill over £3 million</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { text: "Pay 0.5% of payroll into levy account", highlight: false },
                { text: "Government adds 10% top-up to funds", highlight: true },
                { text: "Funds expire after 24 months if unused", highlight: false },
                { text: "Can transfer up to 50% to other businesses", highlight: true },
                { text: "Full control over apprenticeship spending", highlight: false }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${item.highlight ? 'text-blue-400' : 'text-green-400'}`} />
                  <span className={`text-sm ${item.highlight ? 'text-blue-400 font-medium' : 'text-white/90'}`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-400 text-sm font-medium">
                💡 Tip: Use levy funds or lose them! Consider transferring to supply chain partners.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <HandCoins className="h-5 w-5" />
              Non-Levy Employers (SMEs)
            </CardTitle>
            <p className="text-white/60 text-sm">Pay bill under £3 million</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { text: "Pay only 5% of training costs", highlight: true },
                { text: "Government covers remaining 95%", highlight: true },
                { text: "For Level 3 Electrical: max £1,050 employer contribution", highlight: false },
                { text: "Can receive levy transfers from larger employers", highlight: false },
                { text: "100% funded for apprentices aged 16-21", highlight: true }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${item.highlight ? 'text-green-400' : 'text-green-400'}`} />
                  <span className={`text-sm ${item.highlight ? 'text-green-400 font-medium' : 'text-white/90'}`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-green-400 text-sm font-medium">
                💡 Tip: Ask about levy transfers - you could get 100% funded apprenticeships!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Case / ROI */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Making the Business Case
          </CardTitle>
          <p className="text-white/60 text-sm">Return on investment for a 4-year electrical apprenticeship</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Banknote className="h-4 w-4 text-red-400" />
                Costs (SME)
              </h4>
              <ul className="space-y-2 text-sm">
                {employerROI.costs.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-white/70">{item.item}</span>
                    <span className="text-white font-medium">{item.amount}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="font-semibold text-white">Gross Cost</span>
                  <span className="font-bold text-white">~£65,050</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-green-400" />
                Returns & Savings
              </h4>
              <ul className="space-y-2 text-sm">
                {employerROI.returns.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="text-white/70">{item.item}</span>
                    <span className="text-green-400 font-medium">{item.amount}</span>
                  </li>
                ))}
                <li className="flex justify-between border-t border-white/10 pt-2 mt-2">
                  <span className="font-semibold text-white">Net Cost</span>
                  <span className="font-bold text-green-400">~£50,550</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-elec-yellow" />
                Business Benefits
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Trained to company standards",
                  "Addresses skill shortages",
                  "Improved staff retention",
                  "Fresh perspectives & ideas",
                  "No recruitment agency fees",
                  "Loyal, trained workforce"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparison with hiring */}
          <div className="mt-6 p-4 bg-gradient-to-r from-elec-yellow/10 to-orange-500/5 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Compare: Hiring a Qualified Electrician</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-white/70">Recruitment fees</span>
                <div className="text-white font-bold">£4,000 - £8,000</div>
              </div>
              <div>
                <span className="text-white/70">Salary (Year 1)</span>
                <div className="text-white font-bold">£35,000 - £42,000</div>
              </div>
              <div>
                <span className="text-white/70">Training to standards</span>
                <div className="text-white font-bold">Time + Cost</div>
              </div>
              <div>
                <span className="text-white/70">Loyalty risk</span>
                <div className="text-white font-bold">Higher turnover</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Statistics */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Industry Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { stat: "25,000+", label: "Electricians needed annually in UK" },
              { stat: "92%", label: "Apprentices stay with employer" },
              { stat: "£21k", label: "Average training savings vs hiring" },
              { stat: "4 years", label: "Fully trained to your standards" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{item.stat}</div>
                <div className="text-white/60 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFAQsTab = () => (
    <div className="space-y-6">
      {/* FAQ Header */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </CardTitle>
          <p className="text-white/70 text-sm">
            Everything you need to know about apprenticeship funding
          </p>
        </CardHeader>
      </Card>

      {/* FAQ Accordion */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="pt-6">
          <MobileAccordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <MobileAccordionItem key={index} value={`faq-${index}`} className="border border-white/10 rounded-lg overflow-hidden">
                <MobileAccordionTrigger className="text-left px-4 py-4 hover:bg-white/10">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="text-xs text-elec-yellow border-elec-yellow/30 flex-shrink-0">
                      {faq.category}
                    </Badge>
                    <span className="text-white font-medium text-sm">{faq.question}</span>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </MobileAccordionContent>
              </MobileAccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Know Your Rights */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Know Your Rights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-white font-medium mb-2">
              You should NEVER be asked to pay for your apprenticeship training.
            </p>
            <p className="text-white/80 text-sm">
              If an employer asks you to contribute towards training costs, this is against
              funding rules and should be reported immediately.
            </p>
          </div>

          <p className="text-white/80 text-sm">
            If you believe your employer is not meeting their funding obligations:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                action: "Contact your training provider",
                detail: "They can intervene on your behalf",
                icon: Users
              },
              {
                action: "Report to ESFA",
                detail: "complaints.esfa@education.gov.uk",
                icon: Mail
              },
              {
                action: "Seek advice from Citizens Advice",
                detail: "Free, independent guidance",
                icon: HelpCircle
              },
              {
                action: "Call National Apprenticeship Helpline",
                detail: "0800 015 0400 (free)",
                icon: Phone
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                  <item.icon className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">{item.action}</h5>
                  <p className="text-white/60 text-xs">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400"
            onClick={() => window.open('tel:08000150400')}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call National Apprenticeship Helpline (Free)
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Useful Links
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "Gov.uk Apprenticeships", url: "gov.uk/apprenticeships-guide" },
              { name: "ESFA Funding Rules", url: "gov.uk/guidance/apprenticeship-funding-rules" },
              { name: "CITB Grants", url: "citb.co.uk/levy-grants-and-funding" },
              { name: "Find an Apprenticeship", url: "findapprenticeship.service.gov.uk" }
            ].map((link, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="justify-between text-white/80 border-white/20 hover:border-blue-500/50"
                onClick={() => window.open(`https://www.${link.url}`, '_blank')}
              >
                {link.name}
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Mobile Accordion Layout
  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="models" className="w-full">
      <MobileAccordionItem value="models">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Funding Models
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderFundingModelsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="grants">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Additional Grants
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderGrantsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="employer">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Employer Info
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderEmployerTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="faqs">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            FAQs
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderFAQsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <PoundSterling className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Apprenticeship Funding Guide
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Everything you need to know about how your apprenticeship training is funded -
          and why you should never pay a penny
        </p>
        <SmartBackButton />
      </div>

      {/* Key Message Banner */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-500/20 to-green-500/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-full flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-green-400">Key Point</h3>
              <p className="text-white/90 text-sm">
                You should <strong>never</strong> be asked to pay for your apprenticeship training.
                All training costs are covered by government funding or your employer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="models" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <PoundSterling className="h-4 w-4" />
              <span className="hidden sm:inline">Funding Models</span>
            </TabsTrigger>
            <TabsTrigger value="grants" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Grants</span>
            </TabsTrigger>
            <TabsTrigger value="employer" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Employer Info</span>
            </TabsTrigger>
            <TabsTrigger value="faqs" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="mt-6">
            {renderFundingModelsTab()}
          </TabsContent>

          <TabsContent value="grants" className="mt-6">
            {renderGrantsTab()}
          </TabsContent>

          <TabsContent value="employer" className="mt-6">
            {renderEmployerTab()}
          </TabsContent>

          <TabsContent value="faqs" className="mt-6">
            {renderFAQsTab()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ApprenticeshipFunding;
