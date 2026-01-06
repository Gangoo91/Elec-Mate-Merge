
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoundSterling, Building, Users, GraduationCap, FileText, Calculator, CheckCircle, AlertCircle, Info, HelpCircle, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";

const ApprenticeshipFunding = () => {
  const fundingModels = [
    {
      title: "Apprenticeship Levy (Large Employers)",
      description: "Employers with annual pay bill over £3 million pay 0.5% into their levy account",
      eligibility: "Large employers (£3m+ payroll)",
      amount: "100% funded from levy account",
      icon: Building,
      color: "blue"
    },
    {
      title: "Government Co-Investment (SMEs)",
      description: "Government pays 95% of training costs, employer pays 5%",
      eligibility: "Small/Medium businesses without levy",
      amount: "95% government funded",
      icon: Users,
      color: "green"
    },
    {
      title: "Levy Transfer",
      description: "Large employers can transfer up to 50% of their levy to other businesses",
      eligibility: "Any employer receiving transfer",
      amount: "100% funded via transfer",
      icon: PoundSterling,
      color: "purple"
    }
  ];

  const additionalPayments = [
    {
      category: "Age-Related Payments",
      payments: [
        { name: "16-18 Year Old Apprentice", amount: "£1,000", recipient: "Employer + Training Provider" },
        { name: "19-24 with EHC Plan or Care Leaver", amount: "£1,000", recipient: "Employer + Training Provider" }
      ]
    },
    {
      category: "CITB Grants (Construction)",
      payments: [
        { name: "First Year Grant", amount: "£2,500", recipient: "Employer" },
        { name: "Second Year Grant", amount: "£2,500", recipient: "Employer" },
        { name: "Third Year Grant", amount: "£2,500", recipient: "Employer" },
        { name: "Fourth Year Grant", amount: "£2,500", recipient: "Employer" },
        { name: "Completion Bonus", amount: "£3,500", recipient: "Employer" }
      ]
    }
  ];

  const faqs = [
    {
      question: "Who pays for my apprenticeship training?",
      answer: "Training costs are covered by either the employer's Apprenticeship Levy (for large companies) or shared between the employer (5%) and government (95%) for smaller businesses. You should not have to pay anything towards your training."
    },
    {
      question: "What does the funding cover?",
      answer: "Apprenticeship funding covers the cost of training and assessment by an approved training provider. It does NOT cover wages, travel costs, work equipment, or additional qualifications outside the apprenticeship standard."
    },
    {
      question: "What is the funding band for electrical apprenticeships?",
      answer: "The Level 3 Installation Electrician/Maintenance Electrician standard has a maximum funding band of £21,000. This is the maximum the government will contribute towards training costs."
    },
    {
      question: "Can my employer claim CITB grants?",
      answer: "If your employer is registered with CITB (Construction Industry Training Board), they may be able to claim grants up to £13,500 over the duration of your apprenticeship (£2,500 per year plus £3,500 completion bonus)."
    },
    {
      question: "What if I'm over 25?",
      answer: "Age doesn't affect eligibility for apprenticeship funding. However, additional incentive payments (£1,000) are only available for apprentices aged 16-18, or 19-24 with an Education Health Care plan or care leaver status."
    },
    {
      question: "Can I be asked to pay for my training?",
      answer: "No. Apprentices should never be asked to contribute towards training costs. If an employer asks you to pay, this is against the funding rules and should be reported to the ESFA."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Apprenticeship Funding Guide</h1>
        <SmartBackButton />
      </div>

      {/* Introduction */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Understanding Apprenticeship Funding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-elec-light">
            Apprenticeship funding in England is managed through the Education and Skills Funding Agency (ESFA).
            Understanding how funding works helps you appreciate your value as an apprentice and ensures your
            employer is meeting their obligations.
          </p>
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-400">Key Point</h4>
                <p className="text-sm text-elec-light">
                  You should <strong>never</strong> be asked to pay for your apprenticeship training.
                  All training costs are covered by funding or your employer.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="models">Funding Models</TabsTrigger>
          <TabsTrigger value="grants">Additional Grants</TabsTrigger>
          <TabsTrigger value="employer">Employer Info</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              {fundingModels.map((model, index) => (
                <Card key={index} className={`border-${model.color}-500/20 bg-${model.color}-500/5`}>
                  <CardHeader>
                    <CardTitle className={`text-lg text-${model.color}-400 flex items-center gap-2`}>
                      <model.icon className="h-5 w-5" />
                      {model.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-elec-light">{model.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Eligibility:</span>
                        <span className="text-white">{model.eligibility}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Funding:</span>
                        <Badge className={`bg-${model.color}-500/20 text-${model.color}-400`}>{model.amount}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  Funding Band: Electrical Installation (Level 3)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-3">Maximum Funding</h3>
                    <div className="text-4xl font-bold text-white mb-2">£21,000</div>
                    <p className="text-sm text-muted-foreground">
                      This is the maximum amount the government will contribute towards your training over the full apprenticeship duration.
                    </p>
                  </div>

                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-3">What It Covers</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Training provider fees
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        End Point Assessment costs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Learning materials from provider
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-muted-foreground">Does NOT cover wages</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grants" className="mt-6">
          <div className="space-y-6">
            {additionalPayments.map((category, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.payments.map((payment, pIndex) => (
                      <div key={pIndex} className="flex items-center justify-between p-3 bg-elec-dark rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">{payment.name}</h4>
                          <p className="text-xs text-muted-foreground">Paid to: {payment.recipient}</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-lg">{payment.amount}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  CITB Grants - Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-elec-light">
                  CITB (Construction Industry Training Board) grants are separate from apprenticeship funding and
                  are available to employers registered with CITB who employ construction apprentices.
                </p>
                <div className="bg-elec-dark p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Total Potential CITB Funding</h4>
                  <div className="text-3xl font-bold text-orange-400">£13,500</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Over a 4-year electrical apprenticeship (£2,500 × 4 years + £3,500 completion bonus)
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-500/20 hover:bg-orange-500/10"
                  onClick={() => window.open('https://www.citb.co.uk/levy-grants-and-funding/grants-fund/', '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit CITB Grants Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employer" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-elec-yellow" />
                  Information for Your Employer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-elec-light">
                  This section provides information you can share with employers who may be unfamiliar with
                  apprenticeship funding. It can help when discussing your apprenticeship with potential or current employers.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-blue-500/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-blue-400">Levy-Paying Employers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-elec-light">For employers with pay bill over £3 million:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Pay 0.5% of payroll into levy account
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Receive 10% government top-up
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Funds expire after 24 months
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Can transfer up to 50% to other businesses
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-green-400">Non-Levy Employers (SMEs)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-elec-light">For employers with pay bill under £3 million:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Pay only 5% of training costs
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Government covers remaining 95%
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      For Level 3 Electrical: max £1,050 employer contribution
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Can receive levy transfers from larger employers
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Making the Business Case
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Cost Breakdown (SME)</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Training costs: £1,050 (5%)</li>
                      <li>Wages: ~£64,000 over 4 years</li>
                      <li>CITB grants: -£13,500</li>
                      <li className="font-medium text-white border-t border-gray-700 pt-1 mt-2">
                        Net cost: ~£51,550
                      </li>
                    </ul>
                  </div>

                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Business Benefits</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Trained to company standards</li>
                      <li>• Addresses skill shortages</li>
                      <li>• Improved staff retention</li>
                      <li>• Fresh perspectives and ideas</li>
                    </ul>
                  </div>

                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">After Qualification</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Fully qualified electrician</li>
                      <li>• No recruitment costs</li>
                      <li>• Immediate productivity</li>
                      <li>• Loyal, trained workforce</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="mt-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MobileAccordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <MobileAccordionItem key={index} value={`faq-${index}`}>
                    <MobileAccordionTrigger className="text-left">
                      {faq.question}
                    </MobileAccordionTrigger>
                    <MobileAccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </MobileAccordionContent>
                  </MobileAccordionItem>
                ))}
              </MobileAccordion>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-red-500/5 mt-6">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Know Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-elec-light">
                If you believe your employer is not meeting their funding obligations or is asking you to
                contribute towards training costs, you can:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Contact your training provider for guidance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Report concerns to ESFA at complaints.esfa@education.gov.uk
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Seek advice from Citizens Advice or ACAS
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Contact the National Apprenticeship Helpline: <a href="tel:08000150400" className="text-elec-yellow underline">0800 015 0400</a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeshipFunding;
