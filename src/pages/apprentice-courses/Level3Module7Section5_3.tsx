import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quizQuestions = [
  {
    id: 1,
    question: "What is required to register as self-employed with HMRC?",
    options: [
      "Business registration certificate only",
      "Unique Taxpayer Reference (UTR) number",
      "Company house registration",
      "Trade association membership"
    ],
    correctAnswer: 1,
    explanation: "A UTR number is required to register as self-employed with HMRC for tax purposes."
  },
  {
    id: 2,
    question: "Which insurance is legally required for self-employed electricians?",
    options: [
      "Public liability insurance",
      "Professional indemnity insurance", 
      "Equipment insurance",
      "Income protection insurance"
    ],
    correctAnswer: 0,
    explanation: "Public liability insurance is legally required to protect against claims for injury or property damage."
  },
  {
    id: 3,
    question: "When must you register for self-employment with HMRC?",
    options: [
      "Within 6 months of starting work",
      "By 5th October in your business's second tax year",
      "Within 3 months of starting work",
      "Before you start any work"
    ],
    correctAnswer: 1,
    explanation: "You must register by 5th October in your business's second tax year to avoid penalties."
  },
  {
    id: 4,
    question: "What is the minimum recommended public liability insurance cover?",
    options: [
      "£500,000",
      "£1 million",
      "£2 million", 
      "£5 million"
    ],
    correctAnswer: 2,
    explanation: "£2 million public liability cover is the industry standard minimum for electrical contractors."
  }
];

const Level3Module7Section5_3 = () => {
  useSEO(
    "Setting up as a Self-employed Electrician (insurance, UTR, HMRC) - Level 3 Career Awareness & Professional Development",
    "Requirements and procedures for establishing a self-employed electrical business"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          5.3 Setting up as a Self-employed Electrician (insurance, UTR, HMRC)
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Requirements and procedures for establishing a self-employed electrical business
        </p>

        {/* Spot it in 30 Seconds */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-elec-yellow/20">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-elec-yellow dark:text-elec-yellow mb-3 sm:mb-4">
                Spot it in 30 Seconds
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-foreground">
                <p><strong>Before starting work:</strong> Register with HMRC and obtain UTR number</p>
                <p><strong>Essential insurance:</strong> £2M public liability minimum</p>
                <p><strong>Key deadline:</strong> Register by 5th October in second tax year</p>
                <p><strong>Professional setup:</strong> Consider professional indemnity and equipment cover</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">
              Starting as a self-employed electrician requires careful planning and compliance with legal requirements. 
              This section covers the essential steps for setting up your electrical business, including registration 
              with HMRC, obtaining necessary insurance, and understanding your professional obligations.
            </p>
            <p className="text-foreground">
              Proper setup protects both you and your clients while ensuring you operate within the law and 
              industry standards.
            </p>
          </CardContent>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">After completing this section, you will be able to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Understand HMRC registration requirements and deadlines</li>
              <li>Identify essential insurance types and coverage levels</li>
              <li>Navigate the UTR number application process</li>
              <li>Recognise legal obligations for self-employed electricians</li>
              <li>Plan the business setup timeline effectively</li>
            </ul>
          </CardContent>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Content / Learning</h2>

          {/* Section 1: HMRC Registration */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base">HMRC Registration Requirements</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>Unique Taxpayer Reference (UTR):</strong> Essential for all self-employed individuals. 
                      Apply through HMRC's online portal or by phone. Processing typically takes 10-15 working days.
                    </p>
                    <p>
                      <strong>Registration deadline:</strong> Must register by 5th October in your business's second tax year. 
                      Late registration incurs penalties starting at £100.
                    </p>
                    <p>
                      <strong>Required information:</strong> Personal details, National Insurance number, business start date, 
                      estimated annual income, and business activity description.
                    </p>
                    <p>
                      <strong>Self-assessment:</strong> Annual tax returns must be filed by 31st October (paper) or 
                      31st January (online) following the tax year end.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck 
            id="hmrc-registration"
            question="When must you register for self-employment with HMRC?"
            options={[
              "Within 1 month of starting work",
              "By 5th October in your business's second tax year",
              "Within 6 months of earning £1,000",
              "Before starting any paid work"
            ]}
            correctIndex={1}
            explanation="Registration must be completed by 5th October in your business's second tax year to avoid penalties."
          />

          {/* Section 2: Insurance Requirements */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base">Essential Insurance Coverage</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>Public Liability Insurance:</strong> Legally required, minimum £2 million coverage recommended. 
                      Protects against claims for injury or property damage caused by your work.
                    </p>
                    <p>
                      <strong>Professional Indemnity Insurance:</strong> Covers claims arising from professional advice or errors. 
                      Minimum £1 million coverage, though £2 million preferred for larger contracts.
                    </p>
                    <p>
                      <strong>Employers' Liability Insurance:</strong> Required if you employ anyone, including apprentices. 
                      Minimum £5 million coverage mandated by law.
                    </p>
                    <p>
                      <strong>Equipment Insurance:</strong> Protects tools and equipment against theft, damage, or loss. 
                      Consider cover for both owned and hired equipment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck 
            id="insurance-requirements"
            question="What is the minimum recommended public liability insurance coverage?"
            options={[
              "£500,000",
              "£1 million",
              "£2 million",
              "£5 million"
            ]}
            correctIndex={2}
            explanation="£2 million public liability insurance is the industry standard minimum for electrical contractors."
          />

          {/* Section 3: Business Structure */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-amber-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 text-base">Business Structure and Banking</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>Sole Trader vs Limited Company:</strong> Most start as sole traders for simplicity. 
                      Consider limited company structure for tax efficiency as profits increase.
                    </p>
                    <p>
                      <strong>Business Bank Account:</strong> Not legally required as sole trader but highly recommended 
                      for clear separation of personal and business finances.
                    </p>
                    <p>
                      <strong>Record Keeping:</strong> Maintain detailed records of income, expenses, and VAT (if applicable). 
                      Digital tools can simplify bookkeeping and tax calculations.
                    </p>
                    <p>
                      <strong>VAT Registration:</strong> Mandatory if annual turnover exceeds £85,000. 
                      Voluntary registration may be beneficial for reclaiming VAT on equipment purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck 
            id="business-structure"
            question="When is VAT registration mandatory?"
            options={[
              "From the start of business",
              "When annual turnover exceeds £50,000",
              "When annual turnover exceeds £85,000",
              "Only for limited companies"
            ]}
            correctIndex={2}
            explanation="VAT registration becomes mandatory when annual turnover exceeds the current threshold of £85,000."
          />

          {/* Section 4: Professional Obligations */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 bg-card">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base">Professional Memberships and Compliance</h3>
                  <div className="space-y-4 text-xs sm:text-sm text-foreground">
                    <p>
                      <strong>Competent Person Schemes:</strong> Join schemes like NICEIC, ELECSA, or NAPIT for 
                      self-certification of work and enhanced credibility with clients.
                    </p>
                    <p>
                      <strong>Continuing Professional Development:</strong> Maintain skills and knowledge through 
                      regular training, updating qualifications, and staying current with regulations.
                    </p>
                    <p>
                      <strong>Health and Safety Compliance:</strong> Understand your duties under CDM regulations, 
                      risk assessment requirements, and safe working practices.
                    </p>
                    <p>
                      <strong>Data Protection:</strong> Comply with GDPR requirements for handling customer data, 
                      including contact details, site information, and payment records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck 
            id="professional-obligations"
            question="What is the main benefit of joining a Competent Person Scheme?"
            options={[
              "Reduced insurance costs",
              "Self-certification of electrical work",
              "Guaranteed work availability",
              "Exemption from Building Regulations"
            ]}
            correctIndex={1}
            explanation="Competent Person Schemes allow self-certification of electrical work, eliminating the need for separate Building Control approval in many cases."
          />
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Real-World Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Case Study 1 */}
            <div className="rounded-lg p-4 border-l-4 border-l-red-500 bg-card">
              <h4 className="font-semibold text-red-600 dark:text-elec-yellow mb-2">Case Study: Late Registration Penalties</h4>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                An electrician started working in April 2023 but forgot to register with HMRC. 
                By missing the October 2024 deadline, they faced:
              </p>
              <ul className="text-xs sm:text-sm text-foreground list-disc list-inside ml-4 space-y-1">
                <li>£100 initial penalty for late registration</li>
                <li>Additional daily penalties of £10 after 3 months</li>
                <li>Potential investigation and interest on unpaid tax</li>
                <li>Stress and administrative burden of resolving the issue</li>
              </ul>
            </div>

            {/* Case Study 2 */}
            <div className="rounded-lg p-4 border-l-4 border-l-elec-yellow bg-elec-yellow/5">
              <h4 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2">Case Study: Proper Insurance Saves Business</h4>
              <p className="text-xs sm:text-sm text-foreground mb-2">
                A self-employed electrician with comprehensive insurance faced a claim when their work 
                allegedly caused damage to a customer's expensive home automation system:
              </p>
              <ul className="text-xs sm:text-sm text-foreground list-disc list-inside ml-4 space-y-1">
                <li>Professional indemnity insurance covered the £15,000 claim</li>
                <li>Legal costs of £8,000 were also covered</li>
                <li>Business continued operating without financial impact</li>
                <li>Customer relationship maintained through professional handling</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Early Registration:</strong> Register with HMRC promptly and maintain accurate records to avoid penalties and ensure smooth operations.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Comprehensive Insurance:</strong> Invest in proper coverage levels - it's essential business protection, not optional expense.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Professional Development:</strong> Join competent person schemes and maintain ongoing training to enhance credibility and capability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Your Knowledge */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-semibold">Test Your Knowledge</CardTitle>
          </CardHeader>
          <CardContent>
            <Quiz questions={quizQuestions} />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module7Section5_3;