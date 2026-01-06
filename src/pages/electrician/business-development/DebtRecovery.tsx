import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Shield,
  FileText,
  Scale,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Clock,
  Phone,
  Mail,
  Building,
  Calendar,
  BarChart3,
  Target,
  Banknote,
  Users,
  Gavel,
  FileCheck,
  Receipt,
  Lock,
  MessageSquare,
  Zap,
  ClipboardCheck,
} from "lucide-react";
import { BusinessPageLayout, SectionNav, ContentBlock, DataGrid, InfoList } from "@/components/business-hub";

const DebtRecovery = () => {
  const [activeSection, setActiveSection] = useState("prevention");

  const sections = [
    { id: "prevention", label: "Prevention", icon: Shield },
    { id: "process", label: "Recovery", icon: FileText },
    { id: "legal", label: "Legal Options", icon: Scale },
    { id: "protection", label: "Protection", icon: Lock },
  ];

  const keyStats = [
    { label: "Late Payment Rate", value: "45%", sublabel: "UK SME average" },
    { label: "Recovery Window", value: "90 days", sublabel: "Best success rate" },
    { label: "Small Claims Limit", value: "£10,000", sublabel: "No solicitor needed" },
    { label: "Statutory Interest", value: "8%+", sublabel: "Above BoE base rate" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const canonical = `${window.location.origin}/electrician/business-development/debt-recovery`;

  return (
    <>
      <Helmet>
        <title>Debt Recovery & Non-Payers | Elec-Mate</title>
        <meta
          name="description"
          content="Professional strategies for managing late payments and protecting your business cash flow."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BusinessPageLayout
        title="Debt Recovery"
        subtitle="Strategies for managing late payments and protecting your cash flow"
        icon={CreditCard}
        backUrl="/electrician/business-development"
        accentColor="yellow"
      >
        {/* Key Stats */}
        <DataGrid items={keyStats} columns={4} />

        {/* Section Navigation */}
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content Sections */}
        <div className="space-y-8 mt-8">
          {/* Prevention Section */}
          <ContentBlock
            id="prevention"
            title="Debt Prevention"
            icon={Shield}
            summary={
              <p className="text-white">
                The best debt recovery strategy is prevention. Strong terms, clear communication, and deposit collection
                significantly reduce the risk of non-payment before work begins.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Prevention Strategies */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-400" />
                  Key Prevention Strategies
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Clear Written Quotes", description: "Detailed quotes with scope, pricing, and payment terms. Get customer signature or email confirmation before starting" },
                    { title: "Collect Deposits", description: "Request 25-50% deposits on jobs over £500. This secures commitment and covers your material costs" },
                    { title: "Stage Payments", description: "Break larger projects into milestones with payments due at each stage. Never get too far ahead financially" },
                    { title: "Payment Terms in Writing", description: "State payment terms clearly: 'Payment due within 14 days of completion' or 'Payment on completion'" },
                  ]}
                />
              </div>

              {/* Customer Screening */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Domestic Customers</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Verify address matches property</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Get written confirmation of work</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Request deposit on larger jobs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Take payment on completion</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Commercial Customers</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Check Companies House records</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Run basic credit check for large jobs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Require purchase order numbers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Set credit limits for new clients</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Accept Multiple Payment Methods
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Card payments (immediate settlement)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Bank transfer (same day for FPS)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Direct debit for recurring work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Invoice finance for larger contracts</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Recovery Process Section */}
          <ContentBlock
            id="process"
            title="Recovery Process"
            icon={FileText}
            summary={
              <p className="text-white">
                Act quickly when payments are overdue. The longer a debt ages, the harder it becomes to collect.
                Follow a systematic process that escalates at defined intervals.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Timeline */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  Recovery Timeline
                </h4>
                <InfoList
                  variant="numbered"
                  items={[
                    { title: "Day 1 - Payment Due", description: "Send invoice reminder on due date. Friendly tone: 'Your invoice is now due - please arrange payment'" },
                    { title: "Day 7 - First Follow-up", description: "Phone call and email. Ask if there are any issues with the invoice. Request payment date commitment" },
                    { title: "Day 14 - Second Follow-up", description: "Formal written reminder. State intent to add statutory interest if not paid within 7 days" },
                    { title: "Day 21 - Final Notice", description: "Letter before action. Final opportunity to pay before legal proceedings begin" },
                    { title: "Day 28+ - Legal Action", description: "Small claims court for under £10k, or debt collection agency. Add statutory interest and costs" },
                  ]}
                />
              </div>

              {/* Communication Templates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Phone Follow-up Tips</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Stay calm and professional</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Ask open questions about payment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Get commitment to specific date</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Follow up in writing afterwards</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Email Best Practices</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Clear subject line with invoice number</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Attach original invoice as PDF</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Include bank details for easy payment</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">State clear deadline and consequences</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Plans */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Offering Payment Plans
                </h4>
                <p className="text-sm text-white mb-3">
                  If a customer is struggling but willing to pay, consider a payment plan. Getting something is better than nothing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Get agreement in writing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Set up standing order if possible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Maximum 3-6 month payment term</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Include clause for missed payments</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Legal Options Section */}
          <ContentBlock
            id="legal"
            title="Legal Options"
            icon={Scale}
            summary={
              <p className="text-white">
                When informal recovery fails, legal options are available. Small claims court handles debts up to £10,000
                without needing a solicitor. For larger amounts, consider professional legal advice.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Court Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Gavel className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Small Claims Court</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    For debts up to £10,000. Simple online process, no solicitor needed, low court fees.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">File claim online via Money Claim Online</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Court fees £35-455 depending on amount</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Costs recoverable if you win</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">Up to £10,000</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Scale className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">County Court</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    For debts over £10,000 or complex disputes. Legal representation recommended.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">More formal process with hearings</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Higher costs but larger claims possible</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Consider solicitor for complex cases</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-400/10 text-yellow-400 rounded-lg border border-yellow-400/20">Over £10,000</span>
                  </div>
                </div>
              </div>

              {/* Statutory Rights */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-yellow-400" />
                  Statutory Interest & Costs
                </h4>
                <p className="text-sm text-white mb-4">
                  Under the Late Payment of Commercial Debts Act 1998, you can claim statutory interest and fixed debt recovery costs on overdue B2B invoices.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Statutory Interest</span>
                      <span className="text-xs text-yellow-400">8% + BoE base rate</span>
                    </div>
                    <p className="text-sm text-white/90">Currently 13.25% annually (5.25% base + 8%)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-white">Fixed Recovery Costs</span>
                      <span className="text-xs text-yellow-400">£40-100</span>
                    </div>
                    <p className="text-sm text-white/90">Based on debt value (£40 under £1k, £70 £1k-10k, £100 over £10k)</p>
                  </div>
                </div>
              </div>

              {/* Debt Collection Agencies */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  Debt Collection Agencies
                </h4>
                <p className="text-sm text-white mb-3">
                  Third-party debt collectors can recover debts on your behalf. They typically charge 10-25% commission on amounts recovered.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Use FCA-authorised agencies only</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">No win, no fee common</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Good for older or disputed debts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Professional pressure tactics</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>

          {/* Protection Section */}
          <ContentBlock
            id="protection"
            title="Business Protection"
            icon={Lock}
            summary={
              <p className="text-white">
                Protect your business from bad debts through proper contracts, insurance, and credit management.
                Prevention and diversification are your best defences against cash flow crises.
              </p>
            }
          >
            <div className="space-y-6">
              {/* Contract Essentials */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-yellow-400" />
                  Contract Essentials
                </h4>
                <InfoList
                  variant="checklist"
                  items={[
                    { title: "Written Terms & Conditions", description: "Clear T&Cs covering payment terms, interest on late payments, and dispute resolution" },
                    { title: "Retention of Title Clause", description: "Materials remain your property until paid for. Allows recovery if customer doesn't pay" },
                    { title: "Variation Clause", description: "Clear process for agreeing and pricing additional work beyond original scope" },
                    { title: "Dispute Resolution", description: "Define process for handling disputes before they escalate to legal action" },
                  ]}
                />
              </div>

              {/* Insurance Options */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Trade Credit Insurance</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Protects against customer insolvency or prolonged non-payment. Worth considering for larger commercial contracts.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Covers 80-90% of invoice value</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Access to credit information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Debt collection support included</span>
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <h4 className="text-base font-semibold text-white">Invoice Finance</h4>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Release cash tied up in unpaid invoices. Lender advances 80-90% immediately, rest when customer pays.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Improves cash flow immediately</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">No personal security usually required</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white">Can include credit control services</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cash Reserve */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">3-6 mo</p>
                  <p className="text-xs text-white/90 mt-1">Cash reserve target</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">20%</p>
                  <p className="text-xs text-white/90 mt-1">Max single customer</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">5%</p>
                  <p className="text-xs text-white/90 mt-1">Bad debt provision</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">Weekly</p>
                  <p className="text-xs text-white/90 mt-1">Cash flow review</p>
                </div>
              </div>

              {/* Risk Diversification */}
              <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
                <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Risk Diversification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">No single customer over 20% of revenue</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Mix domestic and commercial work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Multiple revenue streams and services</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Regular review of customer payment history</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBlock>
        </div>

        {/* Legal Considerations Card */}
        <div className="mt-8 p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white mb-2">Legal Considerations</h3>
              <p className="text-sm text-white leading-relaxed mb-3">
                Ensure your debt recovery practices comply with UK law, including the Late Payment of
                Commercial Debts (Interest) Act 1998 and Consumer Credit Act regulations. Seek legal advice
                for debts over £10,000 or complex disputes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  Statutory interest on late payments
                </span>
                <span className="px-2 py-1 text-xs rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  Recovery costs claimable
                </span>
                <span className="px-2 py-1 text-xs rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  Legal advice for £10k+ debts
                </span>
              </div>
            </div>
          </div>
        </div>
      </BusinessPageLayout>
    </>
  );
};

export default DebtRecovery;
